#!/usr/bin/env python3
"""检查视频学习小节映射（assets/js/resources.js）与题库（assets/js/bank.js）是否一致。

检查项：
  1. 每个已建小节的专题，是否每道在用题都被某个小节覆盖（漏题）
  2. 同一题号是否被两个小节重复收录（重题）
  3. 是否引用了不存在的题号 / 停用题号 / 属于其他专题的题号
  4. 小节引用的视频是否存在，视频链接、时长、状态是否合规
  5. 每个小节「主视频 + 补充」总时长是否超过上限（默认 20 分钟）
  6. 状态为已验收/主视频/备用的视频是否填了 verified_at

用法：
  python tools/check-learning-map.py
  python tools/check-learning-map.py --max-minutes 20 --quiet
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BANK = ROOT / "assets" / "js" / "bank.js"
RESOURCES = ROOT / "assets" / "js" / "resources.js"

VIDEO_STATUS = {"candidate", "verified", "main", "backup", "dead"}
VIDEO_ROLE = {"main", "supplement", "backup"}


def load_assignment(path: Path, marker: str) -> dict:
    """从 `window.XXX = {...};` 里取出 JSON 部分。

    注意：文件头注释里也会出现 `window.XXX = {...}` 的示例写法，
    所以取「最后一处」赋值；也不能整体删块注释——题库里有 `/*` 字面量。
    """
    raw = path.read_text(encoding="utf-8")
    pattern = re.compile(r"window\." + re.escape(marker) + r"\s*=\s*\{")
    hits = list(pattern.finditer(raw))
    if not hits:
        raise SystemExit(f"{path.name} 里找不到 window.{marker} = {{...}}")
    start = hits[-1].end() - 1
    body = raw[start:].strip()
    if body.endswith(";"):
        body = body[:-1].rstrip()
    return json.loads(body)


def duration_seconds(text: str) -> int:
    parts = [int(x) for x in re.findall(r"\d+", str(text or ""))]
    if not parts:
        return 0
    total = 0
    for p in parts:
        total = total * 60 + p
    return total


def fmt(sec: int) -> str:
    return f"{sec // 60}:{sec % 60:02d}"


def main() -> int:
    ap = argparse.ArgumentParser(description="检查学习小节与题库的一致性")
    ap.add_argument("--max-minutes", type=int, default=20, help="单小节主视频+补充总时长上限，默认 20")
    ap.add_argument("--quiet", action="store_true", help="只输出问题与汇总")
    args = ap.parse_args()

    if not RESOURCES.exists():
        print(f"跳过：没有找到 {RESOURCES.relative_to(ROOT)}（站点会按原题库结构运行）")
        return 0

    bank = load_assignment(BANK, "LINUX_BANK")
    learning = load_assignment(RESOURCES, "LINUX_LEARNING")

    topics = {t["id"]: t for t in bank.get("topics", [])}
    questions = {q["id"]: q for q in bank.get("questions", [])}
    active = {qid: q for qid, q in questions.items() if (q.get("status") or "active") == "active"}

    videos = learning.get("videos", {}) or {}
    lessons = learning.get("lessons", []) or []

    errors: list[str] = []
    warnings: list[str] = []

    # ---------- 视频 / 图文自身 ----------
    for vid, v in videos.items():
        kind = v.get("kind") or "video"
        if kind not in {"video", "article"}:
            errors.append(f"资料 {vid}：kind={kind!r} 只能是 video 或 article")
        if not v.get("platform"):
            errors.append(f"资料 {vid}：缺少 platform")
        if not re.match(r"^https?://", str(v.get("url") or "")):
            errors.append(f"资料 {vid}：url 不是 http(s) 链接")
        if v.get("duration") and duration_seconds(v.get("duration")) <= 0:
            errors.append(f"资料 {vid}：duration 无法解析（应为 08:20 或 1:02:30）")
        if kind == "video" and duration_seconds(v.get("duration")) <= 0:
            warnings.append(f"视频 {vid}：没有时长，不计入小节总时长")
        if v.get("status") not in VIDEO_STATUS:
            errors.append(f"资料 {vid}：status={v.get('status')!r} 不在 {sorted(VIDEO_STATUS)} 里")
        if v.get("role") and v["role"] not in VIDEO_ROLE:
            errors.append(f"资料 {vid}：role={v.get('role')!r} 不在 {sorted(VIDEO_ROLE)} 里")
        if v.get("status") in {"verified", "main", "backup"} and not v.get("verified_at"):
            warnings.append(f"资料 {vid}：状态为 {v['status']} 但没有 verified_at")

    # ---------- 小节 ----------
    covered: dict[str, str] = {}
    by_topic: dict[str, list] = {}

    for lesson in lessons:
        lid = str(lesson.get("id") or "")
        topic_id = str(lesson.get("topic_id") or "")
        title = lesson.get("title") or lid

        if not lid:
            errors.append("有学习小节缺少 id")
            continue
        if topic_id not in topics:
            errors.append(f"小节 {lid}：topic_id={topic_id!r} 不存在")
            continue

        by_topic.setdefault(topic_id, []).append(lesson)
        qids = lesson.get("question_ids") or []
        if not qids:
            errors.append(f"小节 {lid}：没有题目")

        for qid in qids:
            q = questions.get(qid)
            if not q:
                errors.append(f"小节 {lid}：题号 {qid} 不存在")
                continue
            if (q.get("status") or "active") != "active":
                errors.append(f"小节 {lid}：题号 {qid} 已停用")
            if q.get("topic_id") != topic_id:
                errors.append(f"小节 {lid}：题号 {qid} 属于专题 {q.get('topic_id')}，不在 {topic_id}")
            if qid in covered:
                errors.append(f"小节 {lid}：题号 {qid} 已在 {covered[qid]} 出现过")
            else:
                covered[qid] = lid

        vids = lesson.get("video_ids") or []
        if not vids:
            warnings.append(f"小节 {lid}（{title}）：没有配套视频")
        total = 0
        for vid in vids:
            if vid not in videos:
                errors.append(f"小节 {lid}：引用了不存在的视频 {vid}")
                continue
            if videos[vid].get("role") != "backup":
                total += duration_seconds(videos[vid].get("duration"))
        if vids and total > args.max_minutes * 60:
            warnings.append(
                f"小节 {lid}（{title}）：主视频+补充共 {fmt(total)}，超过 {args.max_minutes} 分钟上限"
            )

    # ---------- 漏题 ----------
    missing_by_topic: dict[str, list[str]] = {}
    for topic_id, lesson_list in by_topic.items():
        tqids = [qid for qid, q in active.items() if q.get("topic_id") == topic_id]
        missing = [qid for qid in tqids if qid not in covered]
        if missing:
            missing_by_topic[topic_id] = missing
            errors.append(
                f"专题 {topic_id}（{topics[topic_id]['title']}）：{len(missing)} 题没有归入任何小节 → "
                + "、".join(missing)
            )

    # ---------- 报告 ----------
    print("=" * 66)
    print("学习小节映射检查")
    print("=" * 66)
    n_video = sum(1 for v in videos.values() if (v.get("kind") or "video") == "video")
    n_article = len(videos) - n_video
    print(f"题库版本：{bank.get('bank_version')}　专题 {len(topics)} 个　在用题 {len(active)} 道")
    print(
        f"学习小节：{len(lessons)} 个　配套资料：{len(videos)} 条"
        f"（视频 {n_video} · 图文 {n_article}）　覆盖专题 {len(by_topic)} 个"
    )

    if not args.quiet:
        print("-" * 66)
        print(f"{'小节':<8}{'题数':>4}  {'资料':>4}  {'视频时长':>9}  标题")
        for lesson in sorted(lessons, key=lambda x: str(x.get("id"))):
            vids = [videos.get(v, {}) for v in lesson.get("video_ids") or []]
            total = sum(
                duration_seconds(v.get("duration")) for v in vids if v.get("role") != "backup"
            )
            print(
                f"{str(lesson.get('id')):<8}{len(lesson.get('question_ids') or []):>4}  "
                f"{len(vids):>4}  {fmt(total):>9}  {lesson.get('title')}"
            )

        print("-" * 66)
        print("专题覆盖：")
        for tid, t in topics.items():
            tqids = [qid for qid, q in active.items() if q.get("topic_id") == tid]
            done = len([q for q in tqids if q in covered])
            if tid in by_topic:
                flag = "OK" if done == len(tqids) else "漏题"
                print(f"  {tid} {t['title']}：{done}/{len(tqids)} 题  [{flag}]")
        pending = [tid for tid in topics if tid not in by_topic]
        if pending:
            print(f"  尚未建立小节：{'、'.join(pending)}（共 {len(pending)} 个专题，按计划后续补齐）")

    verified = [v for v in videos.values() if v.get("status") in {"verified", "main"}]
    print("-" * 66)
    print(f"已人工验收：{len(verified)} / {len(videos)} 条")
    if len(verified) < len(videos):
        print("  提示：候选资料只保证链接可用，内容覆盖仍需人工确认（见 docs/video-map.md）")

    if warnings:
        print("-" * 66)
        print(f"警告 {len(warnings)} 条：")
        for w in warnings:
            print("  ! " + w)

    print("-" * 66)
    if errors:
        print(f"错误 {len(errors)} 条：")
        for e in errors:
            print("  x " + e)
        print("=" * 66)
        print("结果：不通过")
        return 1

    print("结果：通过，没有漏题、重题或无效引用")
    print("=" * 66)
    return 0


if __name__ == "__main__":
    sys.exit(main())
