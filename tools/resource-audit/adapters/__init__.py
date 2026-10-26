"""数据适配器注册表。

加一个新站点 = 加一个文件 + 在这里注册一行，检查核心不用动。
"""

from __future__ import annotations

from pathlib import Path

from .base import Adapter, AdapterError
from .catalog_json import CatalogJsonAdapter
from .resources_js import ResourcesJsAdapter

REGISTRY: dict[str, type[Adapter]] = {
    ResourcesJsAdapter.name: ResourcesJsAdapter,
    CatalogJsonAdapter.name: CatalogJsonAdapter,
}


def build(source: dict, root: Path) -> Adapter:
    name = (source or {}).get("adapter") or "resources_js"
    cls = REGISTRY.get(name)
    if not cls:
        raise AdapterError(f"未知适配器 {name!r}，可用：{', '.join(sorted(REGISTRY))}")
    return cls(root, source)


__all__ = ["Adapter", "AdapterError", "REGISTRY", "build"]
