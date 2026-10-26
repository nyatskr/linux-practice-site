"""网络探测与状态归类。

判定原则（和 README「资源巡检」一节一致）：

  ok       链接可达，元数据能取到
  warn     链接可达，但需要人看一眼（UP 主账号已注销、页面被限制为登录可见等）
  dead     只有「明确删除 / 私密 / 不存在」才判 dead
  blocked  412 风控、429 限流、403 权限 —— 是「这次没查到」，不是「链接死了」
  unknown  超时、DNS 失败、5xx —— 同样是没查到

宁可漏报，不可误杀：blocked / unknown 都不会阻断发布，只提示重跑。
"""

from __future__ import annotations

import html as html_lib
import json
import re
import socket
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request

from model import (
    LINK_BLOCKED,
    LINK_DEAD,
    LINK_OK,
    LINK_UNKNOWN,
    LINK_WARN,
    Probe,
    Resource,
)

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
)
BILI_API = "https://api.bilibili.com/x/web-interface/view"
BILI_HOSTS = {"www.bilibili.com", "bilibili.com", "m.bilibili.com", "b23.tv", "bili2233.cn"}

# B 站接口 code → 判定
BILI_CODE = {
    0: (LINK_OK, ""),
    -404: (LINK_DEAD, "视频不存在或已被删除"),
    62002: (LINK_DEAD, "稿件不可见（已删除或设为私密）"),
    62012: (LINK_DEAD, "稿件仅自己可见"),
    -403: (LINK_BLOCKED, "接口返回权限不足，可能需要登录或大会员"),
    87007: (LINK_BLOCKED, "充电专属内容"),
    87008: (LINK_BLOCKED, "充电专属内容"),
    -412: (LINK_BLOCKED, "触发风控（412），请稍后重跑"),
    -352: (LINK_BLOCKED, "风控校验失败，请稍后重跑"),
    -509: (LINK_BLOCKED, "请求过于频繁（429），请降低并发后重跑"),
    -400: (LINK_UNKNOWN, "接口返回请求参数错误"),
    -500: (LINK_UNKNOWN, "接口内部错误"),
    62004: (LINK_UNKNOWN, "稿件审核中"),
}

# 网页正文里出现这些字样，基本可以确定内容没了
DEFAULT_DEAD_MARKERS = [
    ("zhuanlan.zhihu.com", "没有知识存在的荒原"),
    ("www.cnblogs.com", "您要找的资源已被删除"),
    ("www.cnblogs.com", "该博客不存在"),
]

_DELETED_AUTHOR = re.compile(r"(账号已注销|用户已注销|账户已注销|已注销)")


class FetchError(Exception):
    def __init__(self, status, reason):
        super().__init__(reason)
        self.status = status
        self.reason = reason


# ---------------------------------------------------------------- 基础请求


def _open(url: str, timeout: float, referer: str | None = None, max_bytes: int = 256 * 1024):
    headers = {
        "User-Agent": UA,
        "Accept": "text/html,application/json;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.6",
        "Accept-Encoding": "identity",
    }
    if referer:
        headers["Referer"] = referer
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        raw = resp.read(max_bytes)
        return resp.status, resp.geturl(), resp.headers.get("Content-Type", "") or "", raw


def _decode(raw: bytes, ctype: str) -> str:
    encs = []
    m = re.search(r"charset=([\w\-]+)", ctype or "", re.I)
    if m:
        encs.append(m.group(1))
    encs += ["utf-8", "gb18030"]
    for enc in encs:
        try:
            return raw.decode(enc)
        except (LookupError, UnicodeDecodeError):
            continue
    return raw.decode("utf-8", errors="replace")


def _title_of(html: str) -> str:
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    if not m:
        return ""
    return re.sub(r"\s+", " ", html_lib.unescape(m.group(1))).strip()


def _classify_http_status(code: int) -> tuple[str, str]:
    if 200 <= code < 400:
        return LINK_OK, ""
    if code in (404, 410):
        return LINK_DEAD, f"HTTP {code}，页面不存在"
    if code in (401, 403, 412, 429, 451):
        return LINK_BLOCKED, f"HTTP {code}，被站点拦截或需要登录"
    if code >= 500:
        return LINK_UNKNOWN, f"HTTP {code}，服务端异常"
    return LINK_UNKNOWN, f"HTTP {code}"


# ---------------------------------------------------------------- B 站


def parse_bilibili_url(url: str) -> tuple[str | None, str | None, int]:
    """返回 (bvid, aid, 分集序号)。"""
    u = urllib.parse.urlparse(url or "")
    bvid = None
    aid = None
    m = re.search(r"/video/(BV[0-9A-Za-z]{10})", u.path)
    if m:
        bvid = m.group(1)
    else:
        m = re.search(r"/video/av(\d+)", u.path, re.I)
        if m:
            aid = m.group(1)
    p = 1
    qs = urllib.parse.parse_qs(u.query)
    if "p" in qs:
        try:
            p = max(1, int(qs["p"][0]))
        except (TypeError, ValueError):
            p = 1
    return bvid, aid, p


def _probe_bilibili(res: Resource, cfg: dict) -> Probe:
    timeout = cfg["timeout_seconds"]
    bvid, aid, page = parse_bilibili_url(res.url)

    if not bvid and not aid:
        # b23.tv 短链或非常规写法：先跟一次跳转拿到真实地址
        try:
            status, final, _ctype, _raw = _open(res.url, timeout, referer="https://www.bilibili.com/")
        except urllib.error.HTTPError as e:
            st, reason = _classify_http_status(e.code)
            return Probe(link_status=st, reason=reason, http_status=e.code, via="html")
        except Exception as e:  # noqa: BLE001
            return Probe(link_status=LINK_UNKNOWN, reason=f"打不开链接：{_brief(e)}", via="html")
        bvid, aid, page = parse_bilibili_url(final)
        if not bvid and not aid:
            return Probe(
                link_status=LINK_UNKNOWN,
                reason="链接里没有 BV/av 号，无法核对元数据",
                http_status=status,
                via="html",
            )

    params = {"bvid": bvid} if bvid else {"aid": aid}
    api = BILI_API + "?" + urllib.parse.urlencode(params)
    try:
        # 不带 Referer：B 站风控对「有 Referer 但没有配套 cookie」的请求直接 412
        # 响应里可能带整季分集（ugc_season），单条能到几百 KB，别用小 buffer
        status, _final, _ctype, raw = _open(api, timeout, max_bytes=8 * 1024 * 1024)
    except urllib.error.HTTPError as e:
        if e.code in (412, 429, 403):
            return Probe(link_status=LINK_BLOCKED, reason=f"接口 HTTP {e.code}，风控或限流", http_status=e.code, via="api")
        return _probe_bilibili_html(res, cfg, hint=f"接口 HTTP {e.code}")
    except Exception as e:  # noqa: BLE001
        return _probe_bilibili_html(res, cfg, hint=f"接口打不开：{_brief(e)}")

    try:
        payload = json.loads(raw.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        return _probe_bilibili_html(res, cfg, hint="接口返回不是 JSON")

    code = payload.get("code")
    if code not in BILI_CODE:
        return Probe(
            link_status=LINK_UNKNOWN,
            reason=f"接口返回未知 code={code} {payload.get('message') or ''}".strip(),
            http_status=status,
            via="api",
        )

    link_status, reason = BILI_CODE[code]
    if link_status == LINK_OK:
        data = payload.get("data") or {}
        owner = (data.get("owner") or {}).get("name") or ""
        pages = data.get("pages") or []
        total = len(pages) or 1
        if page > total:
            return Probe(
                link_status=LINK_DEAD,
                reason=f"分集 p={page} 超出总集数 {total}",
                http_status=status,
                page_index=page,
                pages_total=total,
                via="api",
            )
        duration = None
        part_title = ""
        if pages and page <= len(pages):
            duration = pages[page - 1].get("duration")
            part_title = pages[page - 1].get("part") or ""
        if not duration:
            duration = data.get("duration")
        probe = Probe(
            link_status=LINK_OK,
            reason="" if total == 1 else f"分集 p={page}/{total}",
            http_status=status,
            # 多 P 视频里，小节引用的是某一集，标题要对的是这一集的名字
            title=(part_title or data.get("title") or ""),
            title_alt=(data.get("title") or ""),
            author=owner,
            duration_sec=int(duration) if duration else None,
            page_index=page,
            pages_total=total,
            via="api",
        )
        if owner and _DELETED_AUTHOR.search(owner):
            probe.link_status = LINK_WARN
            probe.reason = "UP 主账号已注销，视频还在但作者信息失效"
        return probe

    return Probe(link_status=link_status, reason=reason, http_status=status, page_index=page, via="api")


def _probe_bilibili_html(res: Resource, cfg: dict, hint: str = "") -> Probe:
    """接口不可用时退回抓页面，只做粗判，绝不当成元数据来源。"""
    try:
        status, final, ctype, raw = _open(res.url, cfg["timeout_seconds"], referer="https://www.bilibili.com/")
    except urllib.error.HTTPError as e:
        st, reason = _classify_http_status(e.code)
        return Probe(link_status=st, reason=_join(hint, reason), http_status=e.code, via="html")
    except Exception as e:  # noqa: BLE001
        return Probe(link_status=LINK_UNKNOWN, reason=_join(hint, f"页面也打不开：{_brief(e)}"), via="html")

    text = _decode(raw, ctype)
    if "啊叻？视频不见了" in text or "视频去哪了呢" in text or "稿件不可见" in text:
        return Probe(link_status=LINK_DEAD, reason="页面提示视频不存在", http_status=status, via="html")
    if "账号已注销" in text:
        return Probe(
            link_status=LINK_WARN,
            reason=_join(hint, "页面显示 UP 主账号已注销"),
            http_status=status,
            title=_title_of(text),
            via="html",
        )
    return Probe(
        link_status=LINK_UNKNOWN,
        reason=_join(hint, "接口没返回，只能确认页面可打开"),
        http_status=status,
        title=_title_of(text),
        via="html",
    )


# ---------------------------------------------------------------- 普通网页


def _probe_web(res: Resource, cfg: dict) -> Probe:
    markers = list(DEFAULT_DEAD_MARKERS) + [
        (str(m.get("host", "")).lower(), str(m.get("text", ""))) for m in cfg.get("dead_markers") or []
    ]
    try:
        status, final, ctype, raw = _open(res.url, cfg["timeout_seconds"])
    except urllib.error.HTTPError as e:
        st, reason = _classify_http_status(e.code)
        return Probe(link_status=st, reason=reason, http_status=e.code, via="html")
    except (socket.timeout, TimeoutError):
        return Probe(link_status=LINK_UNKNOWN, reason="请求超时", via="html")
    except ssl.SSLError as e:
        return Probe(link_status=LINK_UNKNOWN, reason=f"TLS 握手失败：{_brief(e)}", via="html")
    except urllib.error.URLError as e:
        return Probe(link_status=LINK_UNKNOWN, reason=f"连不上：{_brief(e.reason)}", via="html")
    except Exception as e:  # noqa: BLE001
        return Probe(link_status=LINK_UNKNOWN, reason=f"连不上：{_brief(e)}", via="html")

    host = urllib.parse.urlparse(final or res.url).netloc.lower()
    text = _decode(raw, ctype)
    title = _title_of(text)

    for mhost, marker in markers:
        if not marker:
            continue
        if mhost and mhost not in host:
            continue
        if marker in text:
            return Probe(
                link_status=LINK_DEAD,
                reason=f"页面提示内容已删除（命中「{marker}」）",
                http_status=status,
                title=title,
                via="html",
            )

    return Probe(link_status=LINK_OK, reason="", http_status=status, title=title, via="html")


# ---------------------------------------------------------------- 对外


def _brief(err) -> str:
    text = str(err) or err.__class__.__name__
    return text.split("\n")[0][:120]


def _join(*parts) -> str:
    return "；".join(p for p in parts if p)


def _probe_once(res: Resource, cfg: dict) -> Probe:
    started = time.time()
    if res.platform == "bilibili" or urllib.parse.urlparse(res.url).netloc.lower() in BILI_HOSTS:
        probe = _probe_bilibili(res, cfg)
    else:
        probe = _probe_web(res, cfg)
    probe.elapsed_ms = int((time.time() - started) * 1000)
    return probe


def probe(res: Resource, cfg: dict) -> Probe:
    """带重试的探测。只对 blocked / unknown 重试——dead 不重试，省时间。"""
    retries = int(cfg.get("retries", 1))
    last = None
    for attempt in range(1, retries + 2):
        last = _probe_once(res, cfg)
        last.attempts = attempt
        if last.link_status not in (LINK_BLOCKED, LINK_UNKNOWN):
            return last
        if attempt <= retries:
            time.sleep(min(8, 1.5 * attempt))
    return last
