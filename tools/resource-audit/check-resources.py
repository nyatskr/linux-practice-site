#!/usr/bin/env python3
"""资源巡检 · 通用检查核心（轻量版）。

它只回答三个问题：
  1. 链接还活着吗？
  2. 标题、作者、时长和线上还对得上吗？
  3. 什么时候查的？（写回 link_checked_at，供下次比对）

它不回答「这个视频讲得对不对」——那件事只能人工看。工具永远不会把 candidate
改成 verified，`--stamp` 也只写时间戳。

用法：
    python tools/check-resources.py                    # 全量检查
    python tools/check-resources.py --json reports/resources.json
    python tools/check-resources.py --stamp            # 回写 link_checked_at
    python tools/check-resources.py --offline          # 只查数据结构，不发请求
    python tools/check-resources.py --only v-03-x --limit 5
"""

from __future__ import annotations

import argparse
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
if str(HERE) not in sys.path:
    sys.path.insert(0, str(HERE))

import netcheck  # noqa: E402
import render  # noqa: E402
import settings  # noqa: E402
from adapters import AdapterError, build  # noqa: E402
from model import (  # noqa: E402
    LINK_DEAD,
    LINK_OK,
    LINK_UNKNOWN,
    LINK_WARN,
    MATCH_SKIP,
    TOOL_VERSION,
    Result,
)
from textnorm import compare_resource  # noqa: E402

VALID_STATUS = {"candidate", "verified", "main", "backup", "dead"}
VALID_KIND = {"video", "article"}


def parse_args(argv=None):
    ap = argparse.ArgumentParser(
        prog="check-resources",
        description="链接与元数据巡检（不改内容、不改人工验收状态）",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__.split("用法：")[-1],
    )
    ap.add_argument("--root", help="项目根目录（默认：本脚本上两级）")
    ap.add_argument("--config", help="配置文件（默认找 config.json / config.example.json）")
    ap.add_argument("--adapter", help="覆盖配置里的适配器，如 resources_js / catalog_json")
    ap.add_argument("--source", help="覆盖数据文件路径（相对项目根目录）")
    ap.add_argument("--site", help="报告里显示的站点名")
    ap.add_argument("--json", dest="json_out", nargs="?", const="__config__", help="输出 JSON 报告")
    ap.add_argument("--md", dest="md_out", nargs="?", const="__config__", help="输出 Markdown 报告")
    ap.add_argument("--stamp", action="store_true", help="回写 link_checked_at（只写时间，不碰验收状态）")
    ap.add_argument("--stamp-status", action="store_true", help="额外把本次 link_status 写进数据文件")
    ap.add_argument("--dry-run", action="store_true", help="配合 --stamp：只打印将要写入的内容")
    ap.add_argument("--offline", action="store_true", help="不发网络请求，只做结构与字段自检")
    ap.add_argument("--only", help="只查这些 ID（逗号分隔）")
    ap.add_argument("--kind", help="只查某类：video / article")
    ap.add_argument("--status", help="只查某种人工验收状态：candidate / verified ...")
    ap.add_argument("--limit", type=int, help="最多查多少条（冒烟测试用）")
    ap.add_argument("--concurrency", type=int, help="并发数（默认 3）")
    ap.add_argument("--timeout", type=float, help="单请求超时秒数")
    ap.add_argument("--retries", type=int, help="blocked/unknown 的重试次数")
    ap.add_argument("--strict", action="store_true", help="blocked / unknown 也算失败")
    ap.add_argument("--quiet", action="store_true", help="只打印结论，不打印明细")
    ap.add_argument("--verbose", action="store_true", help="连标题的轻微差异也逐条列出")
    ap.add_argument("--no-color", action="store_true", help="不输出颜色")
    ap.add_argument("--version", action="version", version=f"resource-audit {TOOL_VERSION}")
    return ap.parse_args(argv)


# ---------------------------------------------------------------- 自检


def structural_issues(resources) -> tuple[list[str], list[str]]:
    """不联网也能查出来的问题。返回 (问题, 提示)。

    提示不算错：同一条视频在两个专题里各建一个 ID（role 不同）是允许的，
    但两个 ID 迟早会漂移，所以照样说出来。
    """
    issues: list[str] = []
    hints: list[str] = []
    seen: dict[str, str] = {}
    for res in resources:
        if not res.url.startswith(("http://", "https://")):
            issues.append(f"{res.id}：url 不是 http(s) 链接 → {res.url!r}")
        elif res.url in seen:
            hints.append(f"{res.id}：链接与 {seen[res.url]} 相同（同一资料建了两个 ID）")
        else:
            seen[res.url] = res.id
        if not res.title:
            issues.append(f"{res.id}：没有标题")
        if res.kind not in VALID_KIND:
            issues.append(f"{res.id}：kind={res.kind!r} 只能是 video / article")
        if res.status and res.status not in VALID_STATUS:
            issues.append(f"{res.id}：status={res.status!r} 不在 {sorted(VALID_STATUS)} 里")
        if res.kind == "video" and not res.duration_sec:
            issues.append(f"{res.id}：视频没有可解析的时长")
    return issues, hints


# ---------------------------------------------------------------- 主流程


def run_checks(resources, cfg, args):
    check = cfg["check"]
    delay = float(check.get("delay_seconds") or 0)
    concurrency = max(1, int(check.get("concurrency") or 1))
    threshold = float(check.get("title_similarity_min") or 0.85)
    tolerance = int(check.get("duration_tolerance_seconds") or 3)
    total = len(resources)
    done = 0
    results: dict[str, Result] = {}

    def work(res):
        if delay:
            time.sleep(delay)
        return res, netcheck.probe(res, check)

    with ThreadPoolExecutor(max_workers=concurrency) as pool:
        futures = [pool.submit(work, res) for res in resources]
        for fut in as_completed(futures):
            res, probe = fut.result()
            tm, am, dm = compare_resource(res, probe, threshold, tolerance)
            results[res.id] = Result(
                resource=res,
                probe=probe,
                title_match=tm,
                author_match=am,
                duration_match=dm,
                title_fetched=probe.title,
            )
            done += 1
            if sys.stderr.isatty() and not args.quiet:
                sys.stderr.write(f"\r  已检查 {done}/{total} …")
                sys.stderr.flush()
    if sys.stderr.isatty() and not args.quiet:
        sys.stderr.write("\r" + " " * 30 + "\r")
        sys.stderr.flush()

    return [results[r.id] for r in resources]


def offline_results(resources) -> list[Result]:
    """离线模式：不联网，只把每条资料原样带出来，供结构自检使用。"""
    from model import Probe

    out = []
    for res in resources:
        complete = res.url.startswith(("http://", "https://")) and bool(res.title)
        out.append(
            Result(
                resource=res,
                probe=Probe(
                    link_status=LINK_UNKNOWN,
                    reason="离线模式，未访问网络" if complete else "数据结构不完整",
                    via="offline",
                ),
                title_match=MATCH_SKIP,
                author_match=MATCH_SKIP,
                duration_match=MATCH_SKIP,
            )
        )
    return out


def filter_resources(resources, args):
    if args.only:
        wanted = {x.strip() for x in args.only.split(",") if x.strip()}
        resources = [r for r in resources if r.id in wanted]
    if args.kind:
        resources = [r for r in resources if r.kind == args.kind]
    if args.status:
        resources = [r for r in resources if r.status == args.status]
    if args.limit:
        resources = resources[: args.limit]
    return resources


def main(argv=None) -> int:
    args = parse_args(argv)
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:  # noqa: BLE001
        pass

    root = Path(args.root).expanduser().resolve() if args.root else settings.PROJECT_ROOT
    config_path = settings.find_config(args.config)
    cfg = settings.apply_cli(settings.load(config_path, root), args)

    render.enable_color(not args.no_color and sys.stdout.isatty())

    try:
        adapter = build(cfg["source"], root)
        resources = adapter.load()
    except AdapterError as e:
        print(f"读取数据失败：{e}", file=sys.stderr)
        return 2

    if not resources:
        print("数据源里没有资料，先确认 source.path 与适配器是否匹配。", file=sys.stderr)
        return 2

    issues, hints = structural_issues(resources)
    selected = filter_resources(resources, args)
    if not selected:
        print("按当前过滤条件没有可检查的资料。", file=sys.stderr)
        return 2

    started = datetime.now()
    t0 = time.time()

    if args.offline:
        if args.stamp:
            print("--offline 不能和 --stamp 一起用：没联网就没有「检查时间」可写。", file=sys.stderr)
            return 2
        results = offline_results(selected)
    else:
        results = run_checks(selected, cfg, args)

    elapsed = time.time() - t0

    lessons = len({lid for r in selected for lid in r.lessons})
    meta = {
        "source": adapter.describe(),
        "started": started,
        "elapsed": elapsed,
        "lessons": lessons,
    }

    if args.offline:
        render.print_offline_summary(results, cfg, meta)
    else:
        render.print_report(results, cfg, meta, verbose=args.verbose, quiet=args.quiet)

    if issues:
        print(f"数据自检 {len(issues)} 条：")
        for line in issues[:30]:
            print("  ! " + line)
        if len(issues) > 30:
            print(f"  … 其余 {len(issues) - 30} 条省略")
        print("-" * 72)
    if hints:
        print(f"提示 {len(hints)} 条（不影响发布）：")
        for line in hints[:10]:
            print("  · " + line)
        print("-" * 72)

    # ---- 报告 ----
    json_path = None
    if args.json_out:
        target = cfg["report"].get("json") or "reports/resources.json"
        if args.json_out != "__config__":
            target = args.json_out
        json_path = render.write_json(
            (root / target).resolve(), render.build_json(results, cfg, meta)
        )

    md_path = None
    if args.md_out:
        target = cfg["report"].get("markdown") or "reports/resources.md"
        if args.md_out != "__config__":
            target = args.md_out
        md_path = render.write_markdown((root / target).resolve(), results, cfg, meta)

    if json_path:
        print(f"JSON 报告：{json_path}")
    if md_path:
        print(f"Markdown 报告：{md_path}")

    # ---- 写回 ----
    if args.stamp:
        updates = {}
        today = started.strftime("%Y-%m-%d")
        field = cfg.get("stamp", {}).get("field") or "link_checked_at"
        skipped = 0
        for r in results:
            # 只给「查得到」的条目盖时间戳；dead/blocked/unknown 保留旧日期，
            # 让下一个人一眼看出这条没被确认过。
            if r.probe.link_status not in (LINK_OK, LINK_WARN):
                skipped += 1
                continue
            payload = {field: today}
            if args.stamp_status:
                payload["link_status"] = r.probe.link_status
            updates[r.resource.id] = payload
        if args.dry_run:
            print(f"[dry-run] 将写入 {len(updates)} 条 {field}={today}，跳过 {skipped} 条")
            for rid in list(updates)[:5]:
                print(f"  {rid}: {updates[rid]}")
        else:
            try:
                written = adapter.stamp(updates)
            except AdapterError as e:
                print(f"写回失败：{e}", file=sys.stderr)
                return 2
            print(
                f"已回写 {written} 条 {field}={today}（跳过 {skipped} 条未确认的）；"
                "人工验收状态未改动。"
            )

    # ---- 退出码 ----
    dead = [r for r in results if r.probe.link_status == LINK_DEAD]
    if dead:
        return 1
    if args.strict:
        soft = [r for r in results if r.probe.link_status in (LINK_WARN, LINK_UNKNOWN)]
        if soft:
            return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
