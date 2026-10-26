"""报告渲染：终端摘要、JSON、Markdown。"""

from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path

from model import (
    LINK_BLOCKED,
    LINK_DEAD,
    LINK_LABEL,
    LINK_OK,
    LINK_STATUSES,
    LINK_UNKNOWN,
    LINK_WARN,
    MATCH_LABEL,
    MATCH_MAJOR,
    MATCH_MINOR,
    TOOL_VERSION,
)
from textnorm import fmt_duration

_COLOR = {
    LINK_DEAD: "\033[31m",
    LINK_WARN: "\033[33m",
    LINK_BLOCKED: "\033[35m",
    LINK_UNKNOWN: "\033[36m",
    LINK_OK: "\033[32m",
}
_RESET = "\033[0m"
_DIM = "\033[2m"
_BOLD = "\033[1m"

_USE_COLOR = False


def enable_color(flag: bool) -> None:
    global _USE_COLOR
    _USE_COLOR = bool(flag)


def _c(text: str, code: str) -> str:
    if not _USE_COLOR or not code:
        return text
    return f"{code}{text}{_RESET}"


def _tag(status: str) -> str:
    return _c(f"[{LINK_LABEL.get(status, status)}]", _COLOR.get(status, ""))


def counts(results) -> dict:
    by_link = {k: 0 for k in LINK_STATUSES}
    by_kind: dict[str, int] = {}
    title_bad = author_bad = duration_bad = title_minor = 0
    for r in results:
        by_link[r.probe.link_status] = by_link.get(r.probe.link_status, 0) + 1
        by_kind[r.resource.kind] = by_kind.get(r.resource.kind, 0) + 1
        if r.title_match == MATCH_MAJOR:
            title_bad += 1
        elif r.title_match == MATCH_MINOR:
            title_minor += 1
        if r.author_match == MATCH_MAJOR:
            author_bad += 1
        if r.duration_match == MATCH_MAJOR:
            duration_bad += 1
    return {
        "by_link_status": by_link,
        "by_kind": by_kind,
        "title_mismatch": title_bad,
        "title_minor": title_minor,
        "author_mismatch": author_bad,
        "duration_mismatch": duration_bad,
    }


# ---------------------------------------------------------------- 终端


def print_report(results, cfg: dict, meta: dict, verbose: bool = False, quiet: bool = False) -> None:
    site = cfg.get("site") or ""
    stat = counts(results)
    by_link = stat["by_link_status"]
    width = 72

    print("=" * width)
    print(_c(f"资源巡检 · {site}", _BOLD))
    print("=" * width)
    print(f"数据源    {meta['source']}")
    kinds = " · ".join(f"{_kind_label(k)} {v}" for k, v in sorted(stat["by_kind"].items()))
    print(f"规模      {len(results)} 条资料（{kinds}）")
    if meta.get("lessons"):
        print(f"覆盖      {meta['lessons']} 个学习小节")
    print(
        f"检查时间  {meta['started']:%Y-%m-%d %H:%M:%S}　耗时 {meta['elapsed']:.1f}s"
        f"　并发 {cfg['check']['concurrency']}"
    )
    print(
        "结果      "
        + " · ".join(
            _c(f"{LINK_LABEL[k]} {by_link.get(k, 0)}", _COLOR.get(k, "")) for k in LINK_STATUSES
        )
    )

    bad = [r for r in results if r.probe.link_status == LINK_DEAD]
    soft = [r for r in results if r.probe.link_status in (LINK_WARN, LINK_BLOCKED, LINK_UNKNOWN)]

    if quiet:
        print("-" * width)
        print(_conclusion(bad, soft))
        print("=" * width)
        return

    if bad:
        print("-" * width)
        print(_c(f"需要处理 {len(bad)} 条（链接已失效）", _COLOR[LINK_DEAD]))
        for r in bad:
            res, probe = r.resource, r.probe
            print(f"  {_tag(probe.link_status)} {res.id}　{res.author or '—'}")
            print(f"         {res.title}")
            print(f"         {_c(res.url, _DIM)}")
            print(f"         原因：{probe.reason or '—'}")

    if soft:
        print("-" * width)
        print(f"需要复查 {len(soft)} 条（不算失效：风控 / 登录墙 / 账号注销）")
        for r in soft:
            res, probe = r.resource, r.probe
            print(f"  {_tag(probe.link_status)} {res.id}　{res.title}")
            print(f"         {_c(res.url, _DIM)}")
            print(f"         原因：{probe.reason or '—'}")

    major = [r for r in results if MATCH_MAJOR in (r.title_match, r.author_match, r.duration_match)]
    minor = [r for r in results if r not in major and r.title_match == MATCH_MINOR]
    checked_meta = sum(1 for r in results if r.probe.title or r.probe.duration_sec)
    print("-" * width)
    if not checked_meta:
        print("元数据核对：本次没取到线上元数据，未做核对（多为风控或登录墙，可稍后重跑）")
    else:
        print(
            f"元数据核对：不一致 {len(major)} 条（标题 {stat['title_mismatch']} · 作者 "
            f"{stat['author_mismatch']} · 时长 {stat['duration_mismatch']}）"
            f"　轻微差异 {len(minor)} 条"
        )
        for r in major:
            res, probe = r.resource, r.probe
            detail = []
            if r.title_match == MATCH_MAJOR:
                detail.append(f"标题：记录「{res.title}」/ 线上「{probe.title}」")
            if r.author_match == MATCH_MAJOR:
                detail.append(f"作者：记录「{res.author}」/ 线上「{probe.author}」")
            if r.duration_match == MATCH_MAJOR:
                detail.append(
                    f"时长：记录 {fmt_duration(res.duration_sec)} / 线上 {fmt_duration(probe.duration_sec)}"
                )
            print(f"  ~ {res.id}　" + "；".join(detail))
        if minor:
            if verbose:
                for r in minor:
                    print(
                        f"  · {r.resource.id}　标题：记录「{r.resource.title}」/ "
                        f"线上「{r.probe.title}」"
                    )
            else:
                print(
                    "  · 轻微差异多为站名后缀、副标题、空白标点所致，加 --verbose 查看明细"
                )

    verified = sum(1 for r in results if r.resource.status in {"verified", "main"})
    print("-" * width)
    print(f"人工验收（本工具不改动）：verified {verified} / {len(results)}")
    print("-" * width)

    print(_conclusion(bad, soft))
    print("=" * width)


def _conclusion(bad, soft) -> str:
    if bad:
        return _c(
            f"结论：{len(bad)} 条链接已失效。请人工确认替换，"
            "确认后把该条 status 改为 dead（工具不会自己改）。",
            _COLOR[LINK_DEAD],
        )
    blocked = [r for r in soft if r.probe.link_status in (LINK_BLOCKED, LINK_UNKNOWN)]
    warned = [r for r in soft if r.probe.link_status == LINK_WARN]
    if blocked:
        extra = f"，另有 {len(warned)} 条需人工留意" if warned else ""
        return _c(
            f"结论：没有确认失效的链接，{len(blocked)} 条没查清（blocked/unknown）{extra}。"
            "没查清的多为风控或登录墙，建议隔一会儿用 --concurrency 1 重跑这几条。",
            _COLOR[LINK_WARN],
        )
    if warned:
        return _c(
            f"结论：链接全部可达，{len(warned)} 条需人工留意（账号注销等，不影响播放）。",
            _COLOR[LINK_WARN],
        )
    return _c("结论：全部链接可达，元数据无重大出入。", _COLOR[LINK_OK])


def _kind_label(kind: str) -> str:
    return {"video": "视频", "article": "图文"}.get(kind, kind or "其他")


def print_offline_summary(results, cfg: dict, meta: dict) -> None:
    stat = counts(results)
    width = 72
    print("=" * width)
    print(_c(f"资源自检（离线） · {cfg.get('site')}", _BOLD))
    print("=" * width)
    print(f"数据源    {meta['source']}")
    kinds = " · ".join(f"{_kind_label(k)} {v}" for k, v in sorted(stat["by_kind"].items()))
    print(f"规模      {len(results)} 条资料（{kinds}）")
    if meta.get("lessons"):
        print(f"覆盖      {meta['lessons']} 个学习小节")
    print("模式      未访问网络，只校验数据结构、字段与重复链接")
    print("=" * width)


# ---------------------------------------------------------------- JSON


def build_json(results, cfg: dict, meta: dict) -> dict:
    stat = counts(results)
    items = []
    for r in results:
        res, probe = r.resource, r.probe
        items.append(
            {
                "id": res.id,
                "kind": res.kind,
                "platform": res.platform,
                "title": res.title,
                "author": res.author,
                "url": res.url,
                "duration": fmt_duration(res.duration_sec) if res.duration_sec else None,
                "role": res.role,
                "status": res.status,
                "verified_at": res.verified_at,
                "link_checked_at": res.link_checked_at,
                "lessons": res.lessons,
                "link_status": probe.link_status,
                "reason": probe.reason,
                "http_status": probe.http_status,
                "via": probe.via,
                "elapsed_ms": probe.elapsed_ms,
                "attempts": probe.attempts,
                "fetched": {
                    "title": probe.title,
                    "author": probe.author,
                    "duration": fmt_duration(probe.duration_sec) if probe.duration_sec else None,
                    "page_index": probe.page_index,
                    "pages_total": probe.pages_total,
                },
                "match": {
                    "title": r.title_match,
                    "author": r.author_match,
                    "duration": r.duration_match,
                },
            }
        )
    return {
        "schema": "resource-audit/1",
        "tool_version": TOOL_VERSION,
        "site": cfg.get("site"),
        "source": {"adapter": cfg["source"]["adapter"], "path": cfg["source"]["path"]},
        "generated_at": meta["started"].isoformat(timespec="seconds"),
        "elapsed_seconds": round(meta["elapsed"], 1),
        "summary": {
            "total": len(results),
            "by_link_status": stat["by_link_status"],
            "by_kind": stat["by_kind"],
            "title_mismatch": stat["title_mismatch"],
            "title_minor": stat["title_minor"],
            "author_mismatch": stat["author_mismatch"],
            "duration_mismatch": stat["duration_mismatch"],
            "verified": sum(1 for r in results if r.resource.status in {"verified", "main"}),
        },
        "resources": items,
    }


def write_json(path: Path, payload: dict) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


# ---------------------------------------------------------------- Markdown


def write_markdown(path: Path, results, cfg: dict, meta: dict) -> Path:
    stat = counts(results)
    by_link = stat["by_link_status"]
    lines = [
        f"# 资源巡检报告 · {cfg.get('site')}",
        "",
        f"- 生成时间：{meta['started']:%Y-%m-%d %H:%M}",
        f"- 数据源：`{cfg['source']['path']}`（{cfg['source']['adapter']}）",
        f"- 规模：{len(results)} 条资料",
        "- 结果："
        + " · ".join(f"{LINK_LABEL[k]} {by_link.get(k, 0)}" for k in LINK_STATUSES),
        "",
        "> 本表只反映「链接是否可达 + 线上元数据是否对得上」。",
        "> 它不判断内容讲得对不对，也不会改动任何人工验收状态。",
        "",
    ]

    problems = [r for r in results if r.probe.link_status != LINK_OK]
    lines += ["## 需要关注的条目", ""]
    if not problems:
        lines.append("无。全部链接可达。")
    else:
        lines += ["| 资料 | 状态 | 标题 | 链接 | 原因 |", "| --- | --- | --- | --- | --- |"]
        for r in problems:
            res, probe = r.resource, r.probe
            lines.append(
                f"| `{res.id}` | {LINK_LABEL.get(probe.link_status, probe.link_status)} "
                f"| {_md(res.title)} | <{res.url}> | {_md(probe.reason) or '—'} |"
            )

    lines += ["", "## 元数据核对", ""]
    meta_issues = [r for r in results if r.meta_issues]
    if not meta_issues:
        lines.append("标题、作者、时长与线上记录一致。")
    else:
        lines += ["| 资料 | 字段 | 本地记录 | 线上 |", "| --- | --- | --- | --- |"]
        for r in meta_issues:
            res, probe = r.resource, r.probe
            if r.title_match in (MATCH_MAJOR, MATCH_MINOR):
                lines.append(
                    f"| `{res.id}` | 标题（{MATCH_LABEL[r.title_match]}） | {_md(res.title)} | {_md(probe.title)} |"
                )
            if r.author_match == MATCH_MAJOR:
                lines.append(f"| `{res.id}` | 作者 | {_md(res.author)} | {_md(probe.author)} |")
            if r.duration_match == MATCH_MAJOR:
                lines.append(
                    f"| `{res.id}` | 时长 | {fmt_duration(res.duration_sec)} | {fmt_duration(probe.duration_sec)} |"
                )

    lines += [
        "",
        "## 全部条目",
        "",
        "| 资料 | 类型 | 链接状态 | 标题 | 作者 | 时长 | 人工状态 |",
        "| --- | --- | --- | --- | --- | --- | --- |",
    ]
    for r in results:
        res, probe = r.resource, r.probe
        lines.append(
            f"| `{res.id}` | {_kind_label(res.kind)} | {LINK_LABEL.get(probe.link_status, probe.link_status)} "
            f"| {_md(res.title)} | {_md(res.author)} | {fmt_duration(res.duration_sec)} | {res.status or '—'} |"
        )

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def _md(text: str) -> str:
    return (text or "").replace("|", "\\|").replace("\n", " ")
