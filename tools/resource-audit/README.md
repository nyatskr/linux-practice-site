# 资源巡检（resource-audit）

给「带视频/图文资料的静态站点」用的一套**轻量**巡检组件：查链接还活着吗、标题作者时长还对得上吗、上次检查是什么时候。

它不判断内容讲得对不对，也不改任何人工验收状态。

## 该配什么、不该配什么

| 能力 | 建议 | 说明 |
|---|---|---|
| 链接存活检查 | 做 | 核心功能 |
| 标题、作者、时长核对 | 做 | 抓线上元数据与本地区目比对 |
| 账号注销、视频下架预警 | 做 | 账号注销归 `warn`，不下架 |
| 记录检查时间 | 做 | `--stamp` 写 `link_checked_at` |
| Whisper 全量转写 | 不做 | 只在别的工具里留实验入口，本工具不内置 |
| 自动判定内容是否正确 | 不做 | 「链接活着」≠「讲对了」，这条线必须人工守 |

## 目录结构

```text
resource-audit/
├─ check-resources.py       通用检查核心（CLI）
├─ model.py                 数据结构与状态常量
├─ textnorm.py              归一化、时长解析、元数据比对
├─ netcheck.py              HTTP 探测与状态归类
├─ settings.py              配置合并
├─ render.py                终端 / JSON / Markdown 报告
├─ adapters/
│  ├─ resources_js.py       读 window.XXX = {...}; 形式的 JS 数据文件
│  ├─ catalog_json.py       读普通 JSON 目录（字段名可配置）
│  └─ base.py               适配器基类
├─ config.json              本站实际配置
├─ config.example.json      模板配置
├─ examples/                catalog_json 适配器的冒烟样例
└─ README.md
```

整个目录可以直接复制到下一个站点，**只需换 `source` 段**，检查逻辑一行都不用改。

## 用法

```bash
python tools/check-resources.py                       # 全量检查
python tools/check-resources.py --json reports/resources.json
python tools/check-resources.py --md reports/resources.md
python tools/check-resources.py --stamp               # 回写 link_checked_at
python tools/check-resources.py --offline             # 不发请求，只校验数据结构
python tools/check-resources.py --only v-03-x,a-02-y  # 只查几条
python tools/check-resources.py --limit 5 --concurrency 1   # 冒烟测试
```

退出码：`0` 全部可达；`1` 有 `dead`（加 `--strict` 时 `blocked`/`unknown` 也算失败）；`2` 配置或数据读取失败。

## 判定规则

| `link_status` | 含义 | 典型触发 |
|---|---|---|
| `ok` | 链接可达，元数据能取到 | 接口 `code=0`，HTTP 2xx |
| `warn` | 链接可达，但需要人看一眼 | UP 主账号已注销、接口返回异常页 |
| `dead` | **确认**内容没了 | 404 / 410、B 站 `-404`、`62002`（私密或已删）、分集号越界 |
| `blocked` | 这次没查到，不是链接死了 | 412 风控、429 限流、403 登录墙、451 |
| `unknown` | 没查到 | 超时、DNS 失败、TLS 失败、5xx |

原则：**宁可漏报，不可误杀**。只有 `dead` 会阻断，`blocked`/`unknown` 只提示「重跑」。

B 站有两处容易踩坑，已经处理：

- 请求 `api.bilibili.com/x/web-interface/view` 时**不能带 Referer**。带 Referer 但没有配套 cookie 会被风控直接 412。
- 单条响应可能带整季分集（`ugc_season`），能到几百 KB，读响应时 buffer 要放大，否则 JSON 被截断会误判成「接口异常」。

## 元数据核对

| 字段 | 规则 |
|---|---|
| 标题 | NFKC 归一化 + 去空白去标点 + 忽略大小写后比较；网页标题的站名后缀（` - 知乎`、`_博客园`）先拆掉；相似度 ≥ 0.85 记「轻微差异」，否则「不一致」 |
| 作者 | 归一化后相等或互相包含即一致 |
| 时长 | 允许误差，默认 3 秒（接口按秒取整，人工记录常四舍五入） |
| 多 P 视频 | 标题比对的是**分集名**（`pages[p-1].part`），整片名作为备用候选；时长取该分集时长 |

## `--stamp` 的语义

- 只写 `link_checked_at`（日期），**不碰** `status`、`verified_at`。
- 只给 `ok` / `warn` 的条目盖章。`dead` / `blocked` / `unknown` 保留旧日期——这样下次看到旧日期就知道「这条没被确认过」，而不是被新日期掩盖。
- `resources.js` 的写回是按行插入字段，不做 JSON 重新序列化，人工排版的空行不会被冲掉，diff 里只多出新增的那几行。
- 写盘前会自检：改完必须仍能被 `json.loads` 解析、条目数不变，否则报错不落盘。
- `--stamp-status` 额外写 `link_status` 字段（仅作参考，站点不读它）。
- `--dry-run` 配合 `--stamp` 只打印将要写入的内容。

`link_checked_at`（链接检查时间）和 `verified_at`（人工验收时间）是两件事，永远分开记录。

## 接入一个新站点

1. 复制整个 `resource-audit/` 到新项目的 `tools/` 下。
2. 改 `config.json` 的 `source` 段：

   ```json
   { "source": { "adapter": "catalog_json", "path": "data/catalog.json", "items_key": "items" } }
   ```

3. 跑 `python tools/check-resources.py --offline`，确认字段读得出来，再联网跑一次。

字段名不一样就加 `fields` 映射，不用写代码：

```json
{
  "source": {
    "adapter": "catalog_json",
    "path": "data/catalog.json",
    "items_key": "resources",
    "fields": { "title": "name", "author": "uploader", "duration": "length" }
  }
}
```

数据形态比较特殊（比如数据在 Markdown 表格里）时，才需要写一个新适配器：继承 `adapters.base.Adapter`，实现 `load()`，需要写回就再实现 `stamp()`，然后在 `adapters/__init__.py` 的 `REGISTRY` 里加一行。参考 `resources_js.py`，大约 60 行。

## 配置项

| 键 | 默认 | 说明 |
|---|---|---|
| `source.adapter` | `resources_js` | 适配器名 |
| `source.path` | `assets/js/resources.js` | 数据文件，相对项目根目录 |
| `source.global` | `LINUX_LEARNING` | JS 数据文件里的全局变量名 |
| `source.items_key` | `videos` | 资料字典/数组所在的键 |
| `source.lessons_key` | `lessons` | 小节所在的键（只用来统计覆盖，可空） |
| `check.timeout_seconds` | 15 | 单请求超时 |
| `check.retries` | 1 | `blocked`/`unknown` 的重试次数 |
| `check.concurrency` | 3 | 并发数 |
| `check.delay_seconds` | 0.5 | 每个请求前的间隔，防限流 |
| `check.duration_tolerance_seconds` | 3 | 时长容差 |
| `check.title_similarity_min` | 0.85 | 标题相似度阈值 |
| `check.dead_markers` | `[]` | 额外「内容已删除」文案，形如 `{"host": "x.com", "text": "已删除"}` |
| `report.json` | `reports/resources.json` | 默认 JSON 报告路径 |
| `report.markdown` | 空 | 默认 Markdown 报告路径 |
| `stamp.field` | `link_checked_at` | 写回的时间字段名 |

命令行参数（`--concurrency`、`--timeout`、`--adapter`、`--source` 等）会覆盖配置文件。

## 已知限制

- 知乎、部分技术站对非浏览器请求一律 403，会稳定落在 `blocked`。这不是链接失效，但也没法自动核对标题，只能人工抽查。
- 只核对「标题 / 作者 / 时长」，不核对视频里讲了什么。`candidate` 想变 `verified` 只有一条路：人打开看。
- 不抓播放器状态。登录后才能看的试看片段、区域限制内容，接口层面可能仍返回 `ok`。
