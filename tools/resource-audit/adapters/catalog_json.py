"""读取普通 JSON 目录（另一个站的 catalog.json）。

为了「每个新项目只写一个很薄的数据适配器」，这个适配器把字段名做成配置项：
只要在 config 里写清 `items` 在哪个键、标题/作者/时长各叫什么，就不用再写代码。

支持的形态：
    [ {...}, {...} ]                      纯数组
    { "items": [ {...} ] }                常见目录
    { "items": { "id": {...} } }          以 ID 为键的字典
"""

from __future__ import annotations

import json
from pathlib import Path

from model import Resource
from textnorm import duration_seconds

from .base import Adapter, AdapterError

DEFAULT_ITEMS_KEY = "items"
_FALLBACK_KEYS = ("items", "resources", "catalog", "videos", "links", "data")
DEFAULT_FIELDS = {
    "id": "id",
    "url": "url",
    "title": "title",
    "author": "author",
    "kind": "kind",
    "platform": "platform",
    "duration": "duration",
    "role": "role",
    "status": "status",
    "verified_at": "verified_at",
    "link_checked_at": "link_checked_at",
    "note": "note",
}


class CatalogJsonAdapter(Adapter):
    name = "catalog_json"

    def __init__(self, root: Path, source: dict):
        super().__init__(root, source)
        self.items_key = source.get("items_key") or ""
        self.fields = dict(DEFAULT_FIELDS)
        self.fields.update(source.get("fields") or {})
        self.stamp_key = source.get("stamp_key") or "link_checked_at"

    # ------------------------------------------------------------ 读取

    def _locate(self, data) -> tuple[str, object]:
        if isinstance(data, list):
            return "", data
        if not isinstance(data, dict):
            raise AdapterError("catalog 既不是数组也不是对象")
        keys = [self.items_key] if self.items_key else list(_FALLBACK_KEYS)
        for key in keys:
            if key and isinstance(data.get(key), (list, dict)):
                return key, data[key]
        raise AdapterError(f"catalog 里找不到资料数组（试过：{', '.join(keys)}）")

    def _get(self, item: dict, field: str):
        key = self.fields.get(field, field)
        return item.get(key) if key else None

    def load(self) -> list[Resource]:
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            raise AdapterError(f"{self.path.name} 解析失败：{e}") from e

        self._items_key, items = self._locate(data)
        pairs: list[tuple[str, dict]] = []
        if isinstance(items, list):
            for idx, item in enumerate(items):
                if isinstance(item, dict):
                    pairs.append((str(self._get(item, "id") or idx), item))
        else:
            for key, item in items.items():
                if isinstance(item, dict):
                    pairs.append((str(key), item))

        out: list[Resource] = []
        for rid, item in pairs:
            out.append(
                Resource(
                    id=rid,
                    url=str(self._get(item, "url") or ""),
                    title=str(self._get(item, "title") or ""),
                    author=str(self._get(item, "author") or ""),
                    kind=str(self._get(item, "kind") or "video"),
                    platform=str(self._get(item, "platform") or ""),
                    duration_sec=duration_seconds(self._get(item, "duration")) or None,
                    role=str(self._get(item, "role") or ""),
                    status=str(self._get(item, "status") or ""),
                    verified_at=self._get(item, "verified_at"),
                    link_checked_at=self._get(item, "link_checked_at"),
                    note=str(self._get(item, "note") or ""),
                )
            )
        out.sort(key=lambda r: r.id)
        return out

    # ------------------------------------------------------------ 写回

    def stamp(self, updates: dict[str, dict]) -> int:
        if not updates:
            return 0
        data = json.loads(self.path.read_text(encoding="utf-8"))
        _key, items = self._locate(data)
        written = 0

        def apply(item: dict, rid: str) -> None:
            nonlocal written
            fields = updates.get(rid)
            if not fields:
                return
            for k, v in fields.items():
                if v is None:
                    continue
                item[self.fields.get(k, k) or k] = v
            written += 1

        if isinstance(items, list):
            for idx, item in enumerate(items):
                if isinstance(item, dict):
                    apply(item, str(self._get(item, "id") or idx))
        else:
            for key, item in items.items():
                if isinstance(item, dict):
                    apply(item, str(key))

        text = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        self.path.write_bytes(text.encode("utf-8"))
        return written
