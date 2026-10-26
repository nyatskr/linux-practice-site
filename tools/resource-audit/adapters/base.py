"""适配器基类。

一个适配器只做两件事：
  1. 把某个站点的数据文件读成统一的 Resource 列表；
  2. 把「链接检查时间」写回原文件（只写时间戳，绝不碰人工验收状态）。

新站点接入时，照 `resources_js.py` 抄一个 60 行的适配器即可，检查逻辑一行都不用改。
"""

from __future__ import annotations

from pathlib import Path

from model import Resource


class AdapterError(Exception):
    pass


class Adapter:
    name = "base"

    def __init__(self, root: Path, source: dict):
        self.root = Path(root)
        self.source = source or {}
        rel = self.source.get("path") or ""
        if not rel:
            raise AdapterError("配置里缺少 source.path")
        self.path = (self.root / rel).resolve()
        if not self.path.exists():
            raise AdapterError(f"找不到数据文件：{self.path}")

    # -- 读取 --
    def load(self) -> list[Resource]:
        raise NotImplementedError

    # -- 回写（可选） --
    def stamp(self, updates: dict[str, dict]) -> int:
        """updates: {resource_id: {"link_checked_at": "2026-10-26"}}，返回写入条数。"""
        raise AdapterError(f"{self.name} 适配器不支持写回时间戳")

    # -- 展示 --
    def describe(self) -> str:
        try:
            rel = self.path.relative_to(self.root)
        except ValueError:
            rel = self.path
        return f"{rel}（{self.name}）"
