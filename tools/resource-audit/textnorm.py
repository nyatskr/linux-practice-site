"""文本归一化与元数据比对。

归一化要做的事：
  - 全角/半角、大小写、多余空格、中英文标点一律抹平；
  - 站名后缀（「 - 知乎」「_博客园」）不参与比较，取相似度最高的那一段；
  - 时长允许几秒误差（B 站接口时长按秒取整，人工记录常四舍五入）。
"""

from __future__ import annotations

import re
import unicodedata
from difflib import SequenceMatcher

from model import (
    MATCH_MAJOR,
    MATCH_MINOR,
    MATCH_SAME,
    MATCH_SKIP,
    Resource,
)

# 中英文标点 + 各类空白 + 常见分隔装饰
_PUNCT = (
    r"\s\u3000"
    r"!-/:-@\[-`{-~"
    r"、。，．；：？！…—–－·°※「」『』【】《》〈〉（）〔〕［］｛｝“”‘’"
    r"〜～﹏"
)
_PUNCT_RE = re.compile("[" + _PUNCT + "]+")

# 站名后缀常见的分隔符
_SUFFIX_SPLIT = re.compile(r"\s*[|｜_\-–—·]\s*|\s*[-]{1,2}\s*")


def normalize(text: str) -> str:
    """抹平大小写、全半角、空白与标点，只留下可比较的字符。"""
    if not text:
        return ""
    s = unicodedata.normalize("NFKC", str(text))
    s = s.casefold()
    s = _PUNCT_RE.sub("", s)
    return s


def title_variants(title: str) -> list[str]:
    """网页 <title> 常带站名后缀，拆出若干候选片段。"""
    if not title:
        return []
    out = [title]
    parts = [p.strip() for p in _SUFFIX_SPLIT.split(title) if p and p.strip()]
    if len(parts) > 1:
        out.extend(parts)
        # 「xxx - 站点 - 栏目」这种，最长的一段通常就是正文标题
        out.append(max(parts, key=len))
    return out


def similarity(a: str, b: str) -> float:
    na, nb = normalize(a), normalize(b)
    if not na or not nb:
        return 0.0
    if na == nb:
        return 1.0
    return SequenceMatcher(None, na, nb).ratio()


def compare_title(recorded: str, fetched, threshold: float = 0.85) -> tuple[str, float]:
    """返回 (结论, 相似度)。结论为 same / minor / major。

    `fetched` 可以是字符串或字符串列表：多 P 视频的「分集名」和「整片名」都要试。
    """
    if not recorded:
        return MATCH_SKIP, 0.0
    nr = normalize(recorded)
    if not nr:
        return MATCH_SKIP, 0.0

    cands = fetched if isinstance(fetched, (list, tuple)) else [fetched]
    best = 0.0
    seen_any = False
    for raw in cands:
        for cand in title_variants(str(raw or "")):
            nc = normalize(cand)
            if not nc:
                continue
            seen_any = True
            if nc == nr:
                return MATCH_SAME, 1.0
            score = SequenceMatcher(None, nr, nc).ratio()
            if nr in nc or nc in nr:
                # 记录的是简称，或线上标题多了副标题，算轻微差异
                score = max(score, 0.9)
            best = max(best, score)
    if not seen_any:
        return MATCH_SKIP, 0.0
    if best >= 0.995:
        return MATCH_SAME, best
    if best >= threshold:
        return MATCH_MINOR, best
    return MATCH_MAJOR, best


def compare_author(recorded: str, fetched: str) -> str:
    if not recorded or not fetched:
        return MATCH_SKIP
    nr, nf = normalize(recorded), normalize(fetched)
    if not nr or not nf:
        return MATCH_SKIP
    if nr == nf or nr in nf or nf in nr:
        return MATCH_SAME
    return MATCH_MAJOR


def duration_seconds(text) -> int:
    """'08:20' / '1:02:30' / 125 / '7:8' → 秒。无法解析返回 0。"""
    if text is None or text == "":
        return 0
    if isinstance(text, (int, float)):
        return int(text)
    parts = [p for p in re.findall(r"\d+", str(text))]
    if not parts:
        return 0
    total = 0
    for p in parts:
        total = total * 60 + int(p)
    return total


def fmt_duration(sec: int | None) -> str:
    if not sec:
        return "—"
    sec = int(sec)
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    if h:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def compare_duration(recorded_sec: int | None, fetched_sec: int | None, tolerance: int = 3) -> str:
    if not recorded_sec or not fetched_sec:
        return MATCH_SKIP
    if abs(int(recorded_sec) - int(fetched_sec)) <= tolerance:
        return MATCH_SAME
    return MATCH_MAJOR


def compare_resource(res: Resource, probe, threshold: float = 0.85, tolerance: int = 3):
    """把探测到的线上元数据与本地记录比对，返回 (标题, 作者, 时长) 三项结论。"""
    candidates = [probe.title]
    if getattr(probe, "title_alt", ""):
        candidates.append(probe.title_alt)
    title_match, _score = compare_title(res.title, candidates, threshold)
    author_match = compare_author(res.author, probe.author)
    duration_match = compare_duration(res.duration_sec, probe.duration_sec, tolerance)
    return title_match, author_match, duration_match
