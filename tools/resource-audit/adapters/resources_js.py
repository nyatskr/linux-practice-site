"""读取「window.XXX = {...};」形式的 JS 数据文件（建策杯站的 resources.js）。

这类文件是「JS 变量 + JSON 字面量」，为的是双击 index.html 也能打开。
写回时间戳时不做 JSON 重新序列化——那样会把人工排版的空行冲掉、制造整文件 diff。
这里按行插入字段，只多出新增的那几行，其余一个字节都不动。
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from model import Resource
from textnorm import duration_seconds

from .base import Adapter, AdapterError

_ASSIGN = re.compile(r"window\.([A-Za-z_$][\w$]*)\s*=\s*\{")


def read_assignment(path: Path, global_name: str) -> tuple[dict, str]:
    """返回 (数据, 原文)。取最后一处赋值——文件头注释里常出现示例写法。

    按字节读、自己解码：文本模式的通用换行会把 CRLF 悄悄换成 LF，
    写回时整文件都会被算成「改过」。
    """
    raw = path.read_bytes().decode("utf-8")
    hits = [m for m in _ASSIGN.finditer(raw) if m.group(1) == global_name]
    if not hits:
        raise AdapterError(f"{path.name} 里找不到 window.{global_name} = {{...}}")
    start = hits[-1].end() - 1
    body = raw[start:].strip()
    if body.endswith(";"):
        body = body[:-1].rstrip()
    try:
        data = json.loads(body)
    except json.JSONDecodeError as e:
        raise AdapterError(f"{path.name} 里的 JSON 解析失败：{e}") from e
    return data, raw


class ResourcesJsAdapter(Adapter):
    name = "resources_js"

    def __init__(self, root: Path, source: dict):
        super().__init__(root, source)
        self.global_name = self.source.get("global") or "LINUX_LEARNING"
        self.items_key = self.source.get("items_key") or "videos"
        self.lessons_key = self.source.get("lessons_key") or "lessons"

    def load(self) -> list[Resource]:
        data, raw = read_assignment(self.path, self.global_name)
        self._raw = raw
        items = data.get(self.items_key) or {}
        if isinstance(items, list):  # 兼容数组写法
            items = {str(i): v for i, v in enumerate(items) if isinstance(v, dict)}

        used_by: dict[str, list[str]] = {}
        for lesson in data.get(self.lessons_key) or []:
            lid = str(lesson.get("id") or "")
            for vid in lesson.get("video_ids") or lesson.get("resource_ids") or []:
                used_by.setdefault(str(vid), []).append(lid)

        out: list[Resource] = []
        for rid, item in items.items():
            if not isinstance(item, dict):
                continue
            kind = item.get("kind") or "video"
            out.append(
                Resource(
                    id=str(rid),
                    url=str(item.get("url") or ""),
                    title=str(item.get("title") or ""),
                    author=str(item.get("author") or ""),
                    kind=kind,
                    platform=str(item.get("platform") or ""),
                    duration_sec=duration_seconds(item.get("duration")) or None,
                    role=str(item.get("role") or ""),
                    status=str(item.get("status") or ""),
                    verified_at=item.get("verified_at"),
                    link_checked_at=item.get("link_checked_at"),
                    note=str(item.get("note") or ""),
                    lessons=used_by.get(str(rid), []),
                )
            )
        out.sort(key=lambda r: r.id)
        return out

    # ------------------------------------------------------------ 写回

    def stamp(self, updates: dict[str, dict]) -> int:
        if not updates:
            return 0
        raw = getattr(self, "_raw", None) or self.path.read_bytes().decode("utf-8")
        newline = "\r\n" if "\r\n" in raw else "\n"

        # 从「最后一处赋值」的 { 开始处理；文件头注释里也有同样的示例写法，不能用行扫描找
        hits = [m for m in _ASSIGN.finditer(raw) if m.group(1) == self.global_name]
        if not hits:
            raise AdapterError(f"找不到 window.{self.global_name} = {{...}}")
        start = hits[-1].end() - 1
        prefix, body = raw[:start], raw[start:]

        out: list[str] = []
        cur_id: str | None = None
        handled: set[str] = set()
        written = 0

        for line in body.split(newline):
            # 一条资料的结束行 → 在这里补字段
            if cur_id and re.match(r"^    \},?\s*$", line):
                fields = {
                    k: v
                    for k, v in (updates.get(cur_id) or {}).items()
                    if v is not None and k not in handled
                }
                if fields:
                    # 原对象最后一个字段没有尾逗号：先补上，新加的最后一行也不能带逗号
                    if out and not out[-1].rstrip().endswith((",", "{")):
                        out[-1] = out[-1].rstrip() + ","
                    items = list(fields.items())
                    for idx, (key, value) in enumerate(items):
                        tail = "," if idx < len(items) - 1 else ""
                        out.append(f'      "{key}": {json.dumps(value, ensure_ascii=False)}{tail}')
                    written += 1
                cur_id = None
                handled = set()
                out.append(line)
                continue

            # 一条资料的开始行（缩进 4 空格的 "id": {）
            m = re.match(r'^    "([^"]+)": \{\s*$', line)
            if m:
                cur_id = m.group(1)
                handled = set()
                out.append(line)
                continue

            # 已存在同名字段 → 原地改值，避免重复键（保持原行的尾逗号状态）
            if cur_id:
                m2 = re.match(r'^      "([^"]+)": (.*?)(,?)\s*$', line)
                if m2 and m2.group(1) in (updates.get(cur_id) or {}):
                    key = m2.group(1)
                    value = updates[cur_id][key]
                    if value is not None:
                        out.append(
                            f'      "{key}": {json.dumps(value, ensure_ascii=False)}{m2.group(3)}'
                        )
                        handled.add(key)
                        continue

            out.append(line)

        text = prefix + newline.join(out)
        self._validate(text)
        self.path.write_bytes(text.encode("utf-8"))
        self._raw = text
        return written

    def _validate(self, text: str) -> None:
        """写盘前先自检：改完还能被 JSON 解析、条目数不变。"""
        hits = [m for m in _ASSIGN.finditer(text) if m.group(1) == self.global_name]
        if not hits:
            raise AdapterError("写回自检失败：赋值语句不见了")
        body = text[hits[-1].end() - 1 :].strip()
        if body.endswith(";"):
            body = body[:-1].rstrip()
        try:
            data = json.loads(body)
        except json.JSONDecodeError as e:
            raise AdapterError(f"写回自检失败，JSON 已损坏：{e}") from e
        before = json.loads(json.dumps(data))  # noqa: F841  仅确认结构可用
        if not isinstance(data.get(self.items_key), (dict, list)):
            raise AdapterError(f"写回自检失败：{self.items_key} 不见了")
