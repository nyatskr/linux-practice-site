"""配置加载：默认值 → config.json → 命令行参数，后者覆盖前者。"""

from __future__ import annotations

import json
from copy import deepcopy
from pathlib import Path

HERE = Path(__file__).resolve().parent
PROJECT_ROOT = HERE.parents[1]

DEFAULTS = {
    "site": "",
    "source": {
        "adapter": "resources_js",
        "path": "assets/js/resources.js",
        "global": "LINUX_LEARNING",
        "items_key": "videos",
        "lessons_key": "lessons",
    },
    "check": {
        "timeout_seconds": 15,
        "retries": 1,
        "concurrency": 3,
        "delay_seconds": 0.5,
        "duration_tolerance_seconds": 3,
        "title_similarity_min": 0.85,
        "skip_status": [],
        "dead_markers": [],
    },
    "report": {
        "json": "reports/resources.json",
        "markdown": "",
    },
    "stamp": {
        "field": "link_checked_at",
    },
}


def _deep_merge(base: dict, patch: dict) -> dict:
    out = deepcopy(base)
    for key, value in (patch or {}).items():
        if isinstance(value, dict) and isinstance(out.get(key), dict):
            out[key] = _deep_merge(out[key], value)
        else:
            out[key] = value
    return out


def find_config(explicit: str | None) -> Path | None:
    if explicit:
        path = Path(explicit).expanduser()
        if not path.is_absolute():
            path = (PROJECT_ROOT / path).resolve()
        if not path.exists():
            raise SystemExit(f"找不到配置文件：{path}")
        return path
    for name in ("config.json", "config.example.json"):
        cand = HERE / name
        if cand.exists():
            return cand
    return None


def load(config_path: Path | None, root: Path) -> dict:
    cfg = deepcopy(DEFAULTS)
    if config_path:
        try:
            patch = json.loads(config_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            raise SystemExit(f"配置文件不是合法 JSON：{config_path}\n  {e}")
        cfg = _deep_merge(cfg, patch)
        cfg["_config_path"] = str(config_path)
    cfg["_root"] = str(root)
    if not cfg.get("site"):
        cfg["site"] = root.name
    return cfg


def apply_cli(cfg: dict, args) -> dict:
    check = cfg.setdefault("check", {})
    if getattr(args, "concurrency", None):
        check["concurrency"] = args.concurrency
    if getattr(args, "timeout", None):
        check["timeout_seconds"] = args.timeout
    if getattr(args, "retries", None) is not None:
        check["retries"] = args.retries
    if getattr(args, "adapter", None):
        cfg.setdefault("source", {})["adapter"] = args.adapter
    if getattr(args, "source", None):
        cfg.setdefault("source", {})["path"] = args.source
    if getattr(args, "site", None):
        cfg["site"] = args.site
    return cfg
