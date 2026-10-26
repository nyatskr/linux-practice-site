"""巡检用数据结构与状态常量。

状态命名和站点里的人工验收状态（candidate / verified / main / backup / dead）刻意分开：
本工具只产出 `link_status`，永远不写人工验收状态。
"""

from __future__ import annotations

from dataclasses import dataclass, field

TOOL_VERSION = "1.0.0"

# ---------- 链接状态（工具产出） ----------
LINK_OK = "ok"
LINK_WARN = "warn"
LINK_DEAD = "dead"
LINK_BLOCKED = "blocked"
LINK_UNKNOWN = "unknown"

LINK_STATUSES = (LINK_OK, LINK_WARN, LINK_DEAD, LINK_BLOCKED, LINK_UNKNOWN)

LINK_LABEL = {
    LINK_OK: "正常",
    LINK_WARN: "需注意",
    LINK_DEAD: "失效",
    LINK_BLOCKED: "被拦截",
    LINK_UNKNOWN: "未知",
}

# ---------- 元数据比对结果 ----------
MATCH_SAME = "same"
MATCH_MINOR = "minor"
MATCH_MAJOR = "major"
MATCH_SKIP = ""

MATCH_LABEL = {
    MATCH_SAME: "一致",
    MATCH_MINOR: "轻微差异",
    MATCH_MAJOR: "不一致",
}


@dataclass
class Resource:
    """一条待巡检的资料，字段与站点数据无关，由适配器负责映射。"""

    id: str
    url: str
    title: str = ""
    author: str = ""
    kind: str = "video"          # video / article
    platform: str = ""
    duration_sec: int | None = None
    role: str = ""
    status: str = ""             # 人工验收状态，只读
    verified_at: str | None = None
    link_checked_at: str | None = None
    note: str = ""
    lessons: list[str] = field(default_factory=list)

    @property
    def label(self) -> str:
        return self.title or self.id


@dataclass
class Probe:
    """一次探测的结果。"""

    link_status: str
    reason: str = ""
    http_status: int | None = None
    title: str = ""
    title_alt: str = ""          # 多 P 视频的整片标题，标题核对时一并比对
    author: str = ""
    duration_sec: int | None = None
    page_index: int | None = None
    pages_total: int | None = None
    via: str = ""                # api / html / json
    elapsed_ms: int = 0
    attempts: int = 1


@dataclass
class Result:
    resource: Resource
    probe: Probe
    title_match: str = MATCH_SKIP
    author_match: str = MATCH_SKIP
    duration_match: str = MATCH_SKIP
    title_fetched: str = ""
    notes: list[str] = field(default_factory=list)

    @property
    def meta_issues(self) -> list[str]:
        out = []
        if self.title_match == MATCH_MAJOR:
            out.append("标题")
        elif self.title_match == MATCH_MINOR:
            out.append("标题(轻微)")
        if self.author_match == MATCH_MAJOR:
            out.append("作者")
        if self.duration_match == MATCH_MAJOR:
            out.append("时长")
        return out
