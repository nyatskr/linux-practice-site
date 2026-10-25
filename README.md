# Linux 练习站（建策杯 · 红帽 Linux 赛道）

基于《Linux练习网站_搭建与题库维护方案》与 `建策杯Linux_360题_网站导入题库.json` 实现的个人练习站：
14 个专题、360 道客观题（199 单选 / 161 多选），纯静态、无构建步骤、无外部依赖。

题目解析来自《建策杯Linux_360题_逐项解析与知识补充》，每题按 A—D 逐项给出判定与理由，
其中 97 题另附「补充知识 / 本题要点」。

## 打开方式

- **直接双击 `index.html`** 即可使用（题库已内嵌为 `assets/js/bank.js`，不依赖网络请求）。
- 推荐用本地服务器打开，`localStorage` 的行为更稳定：

```bash
cd linux-practice-site
python -m http.server 8848
# 浏览器访问 http://127.0.0.1:8848/
```

> 进度保存在浏览器本地（`localStorage`）。无痕模式、清除站点数据、换设备或换域名都不会同步，
> 请用「进度与数据 → 导出/导入」迁移。若浏览器禁止写入，页面会提示且进度只在本次会话有效。

## 功能

| 页面 | 已实现 |
| --- | --- |
| 概览 | 总进度、正确率、已掌握、待复习；14 个专题卡（题量 / 已做 / 掌握 / 正确率）；继续上次练习 |
| 专题页 | 按「专题 → 知识点分组 → 知识点」组织；组内保持题库顺序；支持整专题、整组、单个知识点、只练未做、只练错题 |
| 练习页 | 单选圆形按钮、多选方形复选框；提交前隐藏答案与解析；提交后显示对错、正确答案、逐项解析、补充知识、适用版本、难度、层次、依据来源、改编说明 |
| 综合练习 | 自选专题、题量（10/20/30/50/100）、限时（不限时/10/20/30/45 分钟）；随机抽题不重复；答题卡跳转；交卷后统一看答案 |
| 错题与待复习 | 答错自动入错题；可手动把「猜对的题」加入待复习；收藏；支持看解析、重做、整组重练 |
| 题库浏览 | 按专题 / 状态（未做、薄弱、待巩固、已掌握）筛选，支持题干、选项、知识点、题号搜索；**一键显示全部答案**（按当前筛选范围展开，可再一键收起），也可单题展开 |
| 进度与数据 | 导出 JSON、导入前预览（新增/合并/跳过）、合并导入不清空、清空记录、题库版本与复核信息 |

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

## 目录结构

```
linux-practice-site/
├── index.html              应用外壳（侧栏导航 + #app 容器）
├── assets/
│   ├── css/app.css         全部样式（含移动端断点）
│   └── js/
│       ├── bank.js         题库数据（由 JSON 生成，window.LINUX_BANK）
│       ├── core.js         索引构建、进度存储、判分、统计
│       ├── views.js        各页面渲染
│       └── app.js          路由、会话、计时、导入导出、事件
├── tools/build-bank.py     从解析 Markdown 重建 bank.js（带一致性校验）
└── README.md
```

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

## 数据与隐私

- 本地存储键：`lp.progress.v1`（作答记录）、`lp.session.v1`（进行中的练习）、`lp.prefs.v1`（综合练习偏好）。
- 导出的 JSON 结构：`{ kind: 'linux-practice-progress', schemaVersion, bankVersion, exportedAt, records: [...] }`。
- 题库前端可见，因此「隐藏解析」只用于练习节奏，不能作为正式考试的防作弊手段；
  若要用于正式线上考试，判分与考试规则需移到服务端。

题库内容说明见题库文件内的 `scope_note`：本库用于练习，非建策杯官方真题，正式比赛的分数、时长与
部分得分方式以学校通知为准。
