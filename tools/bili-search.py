#!/usr/bin/env python3
"""B 站检索小工具：按关键词列出候选视频（标题 / 时长 / UP 主 / BV 号）。

用法：
    python tools/bili-search.py "dnf install 软件包"
    python tools/bili-search.py "关键词1" "关键词2" --n 8

只做检索，不写入任何数据文件；结果需要人工打开确认后才能进 resources.js。
"""
import argparse
import json
import sys
import urllib.parse
import urllib.request

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0 Safari/537.36"
)
SEARCH = "https://api.bilibili.com/x/web-interface/wbi/search/type"


def dur_text(v):
    """search/type 返回的时长形如 "7:8" 或 "1:02:03"。"""
    if isinstance(v, int):
        return f"{v // 60:02d}:{v % 60:02d}"
    return str(v or "")


def dur_sec(v):
    if isinstance(v, int):
        return v
    total = 0
    for part in str(v or "").split(":"):
        if part.isdigit():
            total = total * 60 + int(part)
    return total


def search(keyword, n=8):
    q = urllib.parse.urlencode(
        {"search_type": "video", "keyword": keyword, "page": 1}
    )
    req = urllib.request.Request(
        SEARCH + "?" + q,
        headers={"User-Agent": UA, "Referer": "https://www.bilibili.com/"},
    )
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read().decode("utf-8"))
    if data.get("code") != 0:
        print(f"  !! 接口返回 code={data.get('code')} {data.get('message')}")
        return []
    items = ((data.get("data") or {}).get("result") or [])
    out = []
    for it in items[:n]:
        title = (it.get("title") or "").replace('<em class="keyword">', "").replace("</em>", "")
        out.append(
            {
                "title": title,
                "author": it.get("author"),
                "bvid": it.get("bvid"),
                "duration": dur_text(it.get("duration")),
                "sec": dur_sec(it.get("duration")),
                "play": it.get("play"),
            }
        )
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("keywords", nargs="+")
    ap.add_argument("--n", type=int, default=8)
    args = ap.parse_args()
    for kw in args.keywords:
        print(f"\n=== {kw}")
        try:
            rows = search(kw, args.n)
        except Exception as e:  # noqa: BLE001
            print(f"  !! 检索失败：{e}")
            continue
        for r in rows:
            print(
                f"  {r['duration']:>8}  {r['bvid']}  {r['author']}  |  {r['title']}"
            )
    return 0


if __name__ == "__main__":
    sys.exit(main())
