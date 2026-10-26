# Linux 练习站（建策杯 · 红帽 Linux 赛道）

基于《Linux练习网站_搭建与题库维护方案》与 `建策杯Linux_360题_网站导入题库.json` 实现的个人练习站：
14 个专题、360 道客观题（199 单选 / 161 多选），纯静态、无构建步骤；
除可选的云同步（Supabase）外没有外部依赖。

题目解析来自《建策杯Linux_360题_逐项解析与知识补充》，每题按 A—D 逐项给出判定与理由，
其中 97 题另附「补充知识 / 本题要点」。

## 打开方式

- **在线版（推荐）**：https://nyatskr.github.io/linux-practice-site/ —— 手机、平板直接打开即可练，进度存在各自浏览器的本地存储里。
- **直接双击 `index.html`** 即可使用（题库已内嵌为 `assets/js/bank.js`，不依赖网络请求）。
- 推荐用本地服务器打开，`localStorage` 的行为更稳定：

```bash
cd linux-practice-site
python -m http.server 8848
# 浏览器访问 http://127.0.0.1:8848/
```

> 进度默认保存在浏览器本地（`localStorage`）。无痕模式、清除站点数据、换设备或换域名都不会同步，
> 请用「进度与数据 → 导出/导入」迁移，或按 [docs/cloud-sync.md](docs/cloud-sync.md) 配置 Supabase 后用 GitHub 账号登录同步。
> 若浏览器禁止写入，页面会提示且进度只在本次会话有效。

## 功能

| 页面 | 已实现 |
| --- | --- |
| 概览 | 总进度、正确率、已掌握、待复习；14 个专题卡（题量 / 已做 / 掌握 / 正确率）；继续上次练习 |
| 专题页 | 有学习小节的专题按「专题 → 学习小节 → 配套视频 → 题目」组织，提供「按学习顺序练习」和「按原题顺序练习」两个入口；原「知识点分组」折叠在底部；支持整专题、整组、单个知识点、只练未做、只练错题 |
| 练习页 | 题干独立色块、题号与题型在上、专题与知识点移到题干下方；顶部可展开「本组配套视频」；答错后显示「建议回看」；单选圆形按钮、多选方形复选框；提交前隐藏答案与解析；提交后显示对错、正确答案、逐项解析、补充知识、适用版本、难度、层次、依据来源、改编说明 |
| 综合练习 | 自选专题、题量（10/20/30/50/100）、限时（不限时/10/20/30/45 分钟）；随机抽题不重复；答题卡跳转；交卷后统一看答案 |
| 错题与待复习 | 答错自动入错题；可手动把「猜对的题」加入待复习；收藏；支持看解析、重做、整组重练 |
| 题库浏览 | 按专题 / 状态（未做、薄弱、待巩固、已掌握）筛选，支持题干、选项、知识点、题号搜索；**一键显示全部答案**（按当前筛选范围展开，可再一键收起），也可单题展开 |
| 进度与数据 | 云同步（GitHub 登录 / 立即同步 / 退出）、导出 JSON、导入前预览（新增/合并/跳过）、合并导入不清空、清空本机缓存、清空云端、题库版本与复核信息 |

其他细节：

- 判分按集合比较，与点击顺序无关；多选漏选、多选均算错（与题库规则一致）。
- 解析为**逐项解析**：A—D 每个选项一行，正确项高亮并标「应选」，其余标「不选」，
  正文说明该选项对/错的理由；反引号包裹的命令用等宽字体显示，便于和中文区分。
- 题库字段 `analysis` 为 `[{ k: 'A', v: '判定词', t: '理由' }]`，`notes` 为 `[{ h: '标题', t: '正文' }]`；
  原 `explanation` 整段解析已由 `analysis` 取代。
- 每题记录最近一次结果、累计错误次数、收藏、待复习标记，因此「做过一次答对」不等于「已掌握」：
  最近一次答对且从未答错才计入「已掌握」，答对但曾错过的显示「待巩固」。
- 题目文本全部按纯文本节点渲染，`<`、`>`、`&`、反斜杠与 Shell 语法不会被当作 HTML。
- 选项字母固定 A—D，不随机重排（解析中存在字母引用）。
- 快捷键：`A–D` 选择，`Enter` 提交/下一题，`←/→` 翻页，`Esc` 关闭弹层。
- 「题库浏览」的「显示全部答案」只展开**当前筛选结果**（先选专题或搜索，再一键展开），
  展开状态在切换筛选后保留；列表底部也有「收起全部答案 / 回到顶部」，360 题全展开时不用滚回顶部。
- 移动端自适应，长命令换行、触屏选择正常。

## 云同步（可选）

默认不启用：`assets/js/cloud-config.js` 里的 `url` 与 `publishableKey` 留空时，站点就是纯本地版本，
「进度与数据」里的云同步卡片显示「未启用」。

启用后结构是：

```text
GitHub Pages（纯静态托管）
        ↓
Supabase Auth（GitHub 账号登录）
        ↓
Supabase 数据库（每个账号一份记录）
        ↕
浏览器 localStorage（离线缓存）
```

- 未登录：记录只在本机；第一次登录时会询问是否把本机已有记录合并到账号。
- 已登录：每次答题先写本机，延迟约 1 秒自动上传；断网照常答题，恢复网络后补同步。
- 换设备：登录同一 GitHub 账号后自动下载并合并。
- 正在进行的练习（`lp.session.v1`）只在本机，不跨设备同步。
- 云端只存作答、错题次数、收藏、待复习；JSON 导出/导入继续保留作为人工备份。
- 账号标识显示为「@GitHub 用户名 · 邮箱 · ID 前 8 位」。同一台电脑登过两个账号时，
  本机与云端都按账号 ID 分开存，互不覆盖；卡片上的「账号核对」可查看当前账号与各作用域记录数。

配置步骤（建表 SQL、GitHub OAuth、Redirect URLs、排错）见 **[docs/cloud-sync.md](docs/cloud-sync.md)**。
数据安全依赖数据库 RLS：未登录无法访问，登录用户只能读写自己的行，网页里只出现 Publishable key。

## 目录结构

```
linux-practice-site/
├── index.html              应用外壳（侧栏导航 + #app 容器）
├── assets/
│   ├── css/app.css         全部样式（含移动端断点）
│   └── js/
│       ├── bank.js         题库数据（由 JSON 生成，window.LINUX_BANK）
│       ├── resources.js    学习小节与配套资料（window.LINUX_LEARNING，可选）
│       ├── core.js         索引构建、小节索引、进度存储、合并规则、判分、统计
│       ├── views.js        各页面渲染
│       ├── cloud-config.js Supabase 项目地址与公钥（留空＝不启用云同步）
│       ├── cloud.js        登录、拉取合并上传、同步状态、离线重试、清空云端
│       └── app.js          路由、会话、计时、导入导出、事件
├── docs/video-map.md       资料检索与验收台账
├── docs/resource-audit.md  巡检记录（每次跑完记一行）
├── docs/cloud-sync.md      云同步配置步骤与排错
├── tools/build-bank.py     从解析 Markdown 重建 bank.js（带一致性校验）
├── tools/check-learning-map.py  校验小节是否漏题、重题、引用无效资料
├── tools/bili-search.py    B 站按关键词检索候选视频（辅助补资料，非必需）
├── tools/check-resources.py     资源巡检入口（薄壳，实现见下一行）
├── tools/resource-audit/   链接与元数据巡检组件（可整目录复制到别的站点）
└── README.md
```

## 视频学习小节

`assets/js/resources.js` 在题库之上加了一层「学习小节」，只负责**排序**和**配套资料**，
不改 `bank.js`、不改题号。进度按 `qid` 保存，所以重排不会丢学习记录。

```text
专题 → 学习小节 → 配套资料 → 题目
```

- 每个小节有 `question_ids`（覆盖的题号）、`video_ids`（引用的资料，视频和图文都放这里）、
  `coverage`（要讲清的点）、`must_know`（资料没讲到但题目要考的点）、`gaps`（已知缺口）、
  `search_terms`（检索词）。
- 资料单独建 ID 并记录 `kind`（`video` / `article`）、`role`（`main` / `supplement` / `backup`）
  和 `status`（`candidate` / `verified` / `main` / `backup` / `dead`）；一条资料可被多个小节复用，下架只改一处。
- 只有 `main` + `supplement` 计入小节时长；`backup` 归入「按需补充」，不计入 20 分钟上限。
  图文（`kind: article`）没有时长，不参与时长核算，但同样计入覆盖。
- 专题页同时给两个入口：「按学习顺序练习」按小节顺序，「按原题顺序练习」保持题库原顺序；
  综合练习仍然是随机抽题，不受影响。
- 做题页顶部可展开「本组配套资料」，答错后在解析区显示「建议回看」。
- 没有 `resources.js` 或某个专题还没建小节时，站点完全按原来的题库结构工作。

当前进度：专题 01～14 全部补齐，共 159 个小节、覆盖题库全部 360 题、216 条配套资料
（189 视频 + 27 图文）。其中第一专题 14 条已人工验收，其余为机器检索候选——只保证链接可达、
题号对得上，内容覆盖仍需人工逐条观看确认。

新增一个小节：

```js
// assets/js/resources.js
{
  id: '02-01', topic_id: '02',
  title: '小节标题',
  question_ids: ['A002', 'P013'],
  video_ids: ['v-02-ln'],
  coverage: ['…'],
  must_know: ['…'],
  search_terms: ['…'],
  gaps: '…'
}
```

改完跑一次校验（漏题、重题、无效题号、视频状态与时长上限）：

```bash
python tools/check-learning-map.py
```

视频的检索、观看与验收记录写在 `docs/video-map.md`；`status` 不是 `verified` 的视频，
页面会标成「候选 · 待验收」，不能当作完整讲解使用。

## 资源巡检（维护期）

视频找完、站点进入维护阶段后，最容易出问题的是「半年后这些链接还在不在」。
巡检工具放在 `tools/` 里，**不参与网页运行**，发布前或每月手动跑一次即可：

```bash
python tools/check-resources.py                 # 查一遍，打印摘要
python tools/check-resources.py --json reports/resources.json --md reports/resources.md
python tools/check-resources.py --stamp         # 回写 link_checked_at
```

它只回答三个问题：链接还活着吗、标题/作者/时长和线上对得上吗、上次什么时候查的。

| `link_status` | 含义 | 会不会算失败 |
|---|---|---|
| `ok` | 链接可达，元数据能取到 | 否 |
| `warn` | 可达但需留意（如 UP 主账号已注销） | 否 |
| `dead` | 确认删除 / 私密 / 不存在 | **是** |
| `blocked` | 412 风控、429 限流、403 登录墙 | 否，只提示重跑 |
| `unknown` | 超时、DNS/TLS 失败、5xx | 否，只提示重跑 |

只有 `dead` 会阻断；`blocked`/`unknown` 是「这次没查到」，不会把链接误判成失效。

`--stamp` **只写 `link_checked_at`**，不碰 `status` / `verified_at`：链接活着不等于内容讲对了，
`candidate` 想变 `verified` 只有人工看这一条路。`link_checked_at`（机器查链接）与
`verified_at`（人看内容）分开记录，互不覆盖。写回 `resources.js` 时按行插入字段，
不重新序列化整个文件，人工排版的空行不会被动，diff 里只多出新增的那几行。

跑完在 [docs/resource-audit.md](docs/resource-audit.md) 记一行；机器报告写进 `reports/`（不入库）。
工具本体是可复制的模板，换站点只需改 `source` 段或写一个几十行的适配器，
详见 [tools/resource-audit/README.md](tools/resource-audit/README.md)。

## 更新题库

题库只在一处：`assets/js/bank.js`。

**只换解析**时，用 `tools/build-bank.py` 一条命令重建（会逐题校验题干、选项、答案、解析项顺序，
有任何不一致直接报错、不写入）：

```bash
python tools/build-bank.py "path/to/建策杯Linux_360题_逐项解析与知识补充.md"
```

**换整份题库 JSON** 时，按下式重新生成（题号 `id` 必须稳定），再跑一次上面的脚本补解析：

```bash
python - <<'PY'
import json
d = json.load(open('建策杯Linux_360题_网站导入题库.json', encoding='utf-8'))
keep = ['id','topic_id','cluster','knowledge_point','type','stem','options','answer','analysis','notes',
        'priority','version','difficulty','provenance','source_refs','cluster_order','status','review_status']
bank = {k: d[k] for k in ['schema_version','bank_version','explain_version','title','scope_note',
                          'display_policy','topics','sources','user_material_map','review_record']}
bank['questions'] = [{k: q[k] for k in keep if k in q} for q in d['questions']]
open('assets/js/bank.js','w',encoding='utf-8').write(
    'window.LINUX_BANK=' + json.dumps(bank, ensure_ascii=False, separators=(',',':')) + ';\n')
PY
```

解析更新时：把《逐项解析与知识补充》按 `#### A001 多选题` 分块解析为 `analysis` / `notes`，
写入每道题的对应字段即可；`bank.js` 里的题面、选项、答案与解析文档必须逐项一致
（选项文本、答案集合都会被校验），否则会出现「解析说的和选项对不上」。

进度按稳定题号关联：题号不变则记录保留；`bank_version` 变化后，旧版本记录会在「进度与数据」里提示，
可重新练习覆盖。停用题（`status` 非 `active`）仍保留历史记录，但不会出现在练习与抽题中。

## 部署

纯静态站点，`dist` 也不需要构建，直接把整个目录上传到任意静态托管即可
（GitHub Pages、Netlify、Vercel、对象存储、Nginx 均可）。子目录部署时无需改路径，
所有引用均为相对路径。

本仓库已开启 GitHub Pages：`main` 分支根目录 → https://nyatskr.github.io/linux-practice-site/
推送后约 1 分钟自动重建，无需额外配置。

## 数据与隐私

- 本地存储键：`lp.progress.v1.guest`（未登录记录）、`lp.progress.v1.user.<uuid>`（登录后该账号的记录）、
  `lp.session.v1`（进行中的练习）、`lp.prefs.v1`（综合练习偏好）、`lp.migrated.<uuid>`（已处理合并提示）。
  升级前的旧键 `lp.progress.v1` 会在首次加载时自动复制到 `.guest`，原键保留不删。
- 导出的 JSON 结构：`{ kind: 'linux-practice-progress', schemaVersion: 2, bankVersion, exportedAt, records: [...] }`，
  每条记录含 `favoriteUpdatedAt` / `reviewUpdatedAt`（收藏与待复习的最后修改时间，用于跨设备合并）。
- 启用云同步后，作答记录会存到你自己创建的 Supabase 项目，账号体系由 GitHub OAuth 提供；
  本仓库不经过任何第三方统计服务。
- 题库前端可见，因此「隐藏解析」只用于练习节奏，不能作为正式考试的防作弊手段；
  若要用于正式线上考试，判分与考试规则需移到服务端。

题库内容说明见题库文件内的 `scope_note`：本库用于练习，非建策杯官方真题，正式比赛的分数、时长与
部分得分方式以学校通知为准。
