# 视频学习地图

记录「学习小节 → 视频 → 覆盖题号」的对应关系，以及每条视频的验收状态。
页面上展示的数据来自 `assets/js/resources.js`，本文件是人工台账；两者不一致时以 `resources.js` 为准，并请同步更新本表。

- 题库：`assets/js/bank.js`（版本见 `bank_version`）
- 数据：`assets/js/resources.js`
- 校验：`python tools/check-learning-map.py`

## 状态约定

| 状态 | 含义 | 页面表现 |
|---|---|---|
| `candidate` | 机器检索候选，未人工确认 | 显示「候选 · 待验收」 |
| `verified` | 人工打开确认标题、分集、播放器正常 | 显示「已验收」 |
| `main` | 主视频 | 显示「主视频」 |
| `backup` | 备用 / 按需 | 归入「按需补充」，不计入小节总时长 |
| `dead` | 失效待替换 | 显示「失效待替换」 |

角色 `role` 与状态 `status` 分开记录：`role` 决定展示位置，`status` 决定可信度。

## 资料类型

| `kind` | 含义 | 时长 | 页面表现 |
|---|---|---|---|
| `video` | 视频（B 站、YouTube 等） | 必填 | 「视频」标签 + 打开视频 |
| `article` | 图文（知乎、腾讯云、菜鸟教程等） | 可空 | 「图文」标签 + 阅读原文 |

图文不参与「小节 ≤ 20 分钟」的时长核算，但同样要计入覆盖；一个小节可以只有图文（如 03-08 join）。

## 第一专题（01 基础环境与命令帮助）

23 题，9 个学习小节，14 条视频，全部在 2026-10-24 人工打开确认。
核心路线合计约 81 分钟，1.5 倍速约 54 分钟。

| 小节 | 必讲内容 | 主视频（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 01-01 发行版、内核与版本查询 | 发行版≠内核；Red Hat 家族；`uname -r`；`/etc/os-release` | [Linux 的内核版和发行版](https://www.bilibili.com/video/av14184325/?p=9)（7:48）＋[发行版家族树详解](https://www.bilibili.com/video/BV1Apep6xE5B/)（8:51） | 补充：[uname](https://www.bilibili.com/video/BV12L411a7Ne/?p=71)（1:39） | A001、A084、P001、P002 | 通用 / RHEL 9-10 | 2026-10-24 | RHEL 上 `hostnamectl` 输出差异需文字补充 |
| 01-02 开源许可与是否需要自行编译内核 | GNU/GPL；模块加载≠编译内核 | [了解开源文化：GNU 和 GPL](https://www.bilibili.com/video/BV1r4411A7Qk/?p=7)（8:20） | 按需：[lsmod、insmod、modprobe](https://www.bilibili.com/video/BV1NryKYLEuZ/)（14:30） | A068、A018 | 通用 | 2026-10-24 | 内核 GPL-2.0-only + syscall exception 未讲 |
| 01-03 图形界面与桌面环境 | X Window 是协议；KDE/GNOME 是桌面环境 | [X Window 与 KDE、GNOME](https://www.bilibili.com/video/BV1fA411u7fb/?p=4)（9:32） | — | A069 | 通用 | 2026-10-24 | Wayland 只作提及 |
| 01-04 FHS 与目录体系 | 顶层目录用途；`/dev`；`/root`；`cd` 与相对路径 | [FHS 规范及目录结构](https://www.bilibili.com/video/BV1Eq4y1e7so/?p=8)（9:57） | — | A029、A053、P007、P008 | FHS 3.0 | 2026-10-24 | `cd` 无参数、`../` 解析未讲 |
| 01-05 命令帮助、解析与 PATH | `help`/`--help`/`man 5`/`man -k`；`type`/`command -V`；`./runme`；`--` 结束符 | [type、which、help、--help、man、apropos、whatis、alias](https://www.bilibili.com/video/BV1av4y1s7Jn/)（17:15） | 按需：[可执行脚本](https://www.bilibili.com/video/BV1na4y1773c/?p=25)（5:27）、[PATH 环境变量](https://www.bilibili.com/video/BV1na4y1773c/?p=33)（8:50） | A072、A044、P003、P004、P005、P006、P011、P012 | Bash / coreutils | 2026-10-24 | 每条命令只演示一句；ASCII 连字符需题解 |
| 01-06 环境变量与导出 | 赋值≠导出；`export` | [9.2 环境变量](https://www.bilibili.com/video/BV1na4y1773c/?p=30)（5:43） | — | P009 | 通用 | 2026-10-24 | 未演示「赋值不导出」的失败场景 |
| 01-07 退出状态与特殊变量 | `$?`、`$!`、`$$`、`$0` | [特殊符号变量：退出状态码与 Shell PID](https://www.bilibili.com/video/BV17T4y1F7WV/?p=11)（9:47） | — | P010 | Bash | 2026-10-24 | `$0` 与脚本参数需文字补充 |
| 01-08 通用系统与实时系统 | 可预测上限；PREEMPT_RT | [Linux 6.12 PREEMPT_RT](https://www.bilibili.com/video/BV1yJDgYqEEk/)（3:33） | — | A096 | Linux 6.12+ | 2026-10-24 | 新闻式介绍，概念对比靠题解 |
| 01-09 systemd 关机操作 | `poweroff`/`halt`/`reboot`；`shutdown` 定时 | [shutdown、halt、poweroff、reboot](https://www.bilibili.com/video/BV12L411a7Ne/?p=150)（2:18） | — | A031 | systemd | 2026-10-24 | `shutdown -c`、`systemctl poweroff` 未讲 |

### 小节总时长

只有 `role` 为 `main` 或 `supplement` 的视频计入总时长，`backup`（按需）不计。

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 01-01 | 18:18 | 是 |
| 01-02 | 8:20 | 是（按需 14:30 不计） |
| 01-03 | 9:32 | 是 |
| 01-04 | 9:57 | 是 |
| 01-05 | 17:15 | 是（按需 5:27 + 8:50 不计） |
| 01-06 | 5:43 | 是 |
| 01-07 | 9:47 | 是 |
| 01-08 | 3:33 | 是 |
| 01-09 | 2:18 | 是 |

## 第二专题（02 文件目录 链接与归档）

25 题，8 个学习小节，18 条视频。**这些视频是机器按小节检索得到的候选**，只确认了链接、标题与时长可读，
内容覆盖尚未人工观看，`status` 全部为 `candidate`，页面上标「候选 · 待验收」。

| 小节 | 必讲内容 | 主视频（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 02-01 目录与文件的创建、删除 | `mkdir -p`；`rm`/`rm -r`/`rmdir` | [创建和删除目录或文件](https://www.bilibili.com/video/BV1SiaDeAE52/)（4:16） | 补充：[mkdir](https://www.bilibili.com/video/BV1mV4y1q79a/)（4:02）、[rm](https://www.bilibili.com/video/BV1r5411m7ez/)（2:24） | A009、A035、P013 | 通用 coreutils | 待验收 | `rm -i/-f` 交互差异未展开 |
| 02-02 复制、移动与保留元数据 | `cp -r` vs `cp -a`；`mv` 同盘只改名 | [复制、移动、删除](https://www.bilibili.com/video/BV15a411N7Ts/)（10:26） | 补充：[cp 演示](https://www.bilibili.com/video/BV1uz411i7yS/)（4:53） | P014、P028 | 通用 | 待验收 | `mv` 的 inode 层面原因未讲 |
| 02-03 磁盘空间排查 | `df -h`；`du -sh`；`lsblk` 不给目录大小 | [df 与 du](https://www.bilibili.com/video/BV1bndWBpEz5/)（6:20） | 补充：[lsblk](https://www.bilibili.com/video/BV1z6dWBBEWo/)（5:19） | P027 | 通用 | 待验收 | `df`/`du` 不一致的排查未讲 |
| 02-04 ls 长列表与文件类型 | `ls -al`；管道分页；首字符 `- d l c b p s` | [linux 命令之 ls](https://www.bilibili.com/video/BV13r4y1G7H9/)（6:29） | 补充：[Linux 文件类型](https://www.bilibili.com/video/BV15i4y1r7tC/)（3:47） | A058、A054、A025 | 通用 | 待验收 | 首字符对照表靠 `must_know` |
| 02-05 时间戳、touch 与稀疏文件 | `touch`；mtime/ctime；`truncate` 稀疏文件 | 图文：[Linux 时间戳：atime、ctime 和 mtime](https://zhuanlan.zhihu.com/p/715642218)（知乎）＋[`ls` 与 `du` 为何结果不同](https://cloud.tencent.com/developer/news/2622367)（腾讯云） | 补充：[touch 与修改时间戳](https://www.bilibili.com/video/BV1uk4y1t7Mc/)（10:15）；按需：[touch 与 rm](https://www.bilibili.com/video/BV1qe4y177xo/)（11:58） | P025、A041、P026 | 通用 | 待验收 | 没有一条视频同时讲清三者与稀疏文件：ctime 与稀疏文件靠 `must_know` 补；原 YouTube 版因本地网络不可达、无法核验时长，已换成 B 站同主题视频 |
| 02-06 隐藏文件与通配符 | shell 展开；`*` 不匹配点文件 | [glob 模式的通配符](https://www.bilibili.com/video/BV1FT42117R2/)（4:17） | 补充：[通配符详解](https://www.bilibili.com/video/BV1FK4y1m7KJ/)（13:50） | P024 | Bash | 待验收 | 未专门讲「点文件不匹配」 |
| 02-07 硬链接与符号链接 | inode；硬链接生存；`readlink`；相对目标解析 | [硬链接和软连接](https://www.bilibili.com/video/BV1zK4y1R7jr/)（13:00） | 按需：[ln](https://www.bilibili.com/video/BV1G14y1i7WZ/)（11:31）、[5 分钟 ln](https://www.bilibili.com/video/BV1SN1uY8EMJ/)（8:26） | A010、P015、A015、P017、P016、P018、P019 | ext4/xfs | 待验收 | `readlink` 与相对路径解析靠题解 |
| 02-08 tar 归档与 gzip 压缩 | tar 打包 vs gzip 压缩；`-czf`/`-tzf`/`-C` | [10 分钟学会 gzip 和 tar](https://www.bilibili.com/video/BV1dQ4y1R7Lg/)（12:53） | 补充：[每天一个 tar](https://www.bilibili.com/video/BV1xz4y1x7gk/)（3:13）；按需：[`-C`/`--strip-components`](https://www.bilibili.com/video/BV1oh411g73G/)（10:04） | A038、P020、P023、P022、P021 | GNU tar 1.30+ | 待验收 | 主视频未讲 `-C` |

### 小节总时长（第二专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 02-01 | 10:42 | 是 |
| 02-02 | 15:19 | 是 |
| 02-03 | 11:39 | 是 |
| 02-04 | 10:16 | 是 |
| 02-05 | 10:15 | 是（按需 11:58 不计） |
| 02-06 | 18:07 | 是 |
| 02-07 | 13:00 | 是（按需 11:31 + 8:26 不计） |
| 02-08 | 16:06 | 是（按需 10:04 不计） |

## 第三专题（03 文本处理与 Vim）

25 题，10 个学习小节，19 条配套资料（17 条视频 + 2 条图文）。同样全部是机器检索候选，
`status` 为 `candidate`。本专题的检索难点集中在三处：`find -mtime` 的取整语义、`join` 的短视频、`cut` 的独立讲解。

| 小节 | 必讲内容 | 主视频（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 03-01 文本处理总览 | grep 找行 / sed 改行 / awk 取列 | [Linux 命令之三剑客](https://www.bilibili.com/video/BV1yxEz6YEHp/)（7:41） | — | A040、A011 | 通用 | 待验收 | 只做分工演示，awk 的编程能力靠题解 |
| 03-02 grep 常用开关 | `-i`/`-n`/`-v`/`-c`/`-l` | [每天一个 grep](https://www.bilibili.com/video/BV1Bu411G7H3/)（6:31） | 按需：[第 25 课 grep 命令详解](https://www.bilibili.com/video/BV16m411o7zE/)（14:44） | P029、P032 | GNU grep 3.x | 待验收 | 单文件演示，多文件 `-c`/`-h`、`-L` 靠文字补 |
| 03-03 grep 正则 | `.` 转义；`^$`；`-x`；`-E` | [regex 正则表达](https://www.bilibili.com/video/BV125K7ztERk/)（18:32） | — | P031、P030、P033 | BRE / ERE | 待验收 | `-F` 与 `-x` 的等价关系靠题解 |
| 03-04 find 基础 | `-name` 加引号；`-type f/d/l`；`-o` 优先级 | [每天一个 find](https://www.bilibili.com/video/BV1nh4y1r7Zq/)（6:27） | — | P034、R06 | findutils 4.8+ | 待验收 | 括号与 `-o` 优先级无视频，靠 `must_know` |
| 03-05 find 条件 | `-mtime` 24 小时取整；`-size +100M` 单位 | [10 分钟学会搜索文件和查找内容](https://www.bilibili.com/video/BV1fA411G7Xy/)（13:47，本站原课程 idev365） | 补充：图文 [find 命令（-mtime/-size）](https://www.runoob.com/linux/linux-comm-find.html)；按需：[find 由简到深](https://www.bilibili.com/video/BV1mKbHzfEnS/)（29:33） | P036、P035 | findutils 4.8+ | 待验收 | 主视频需确认是否含时间/大小段落；取整规则靠图文 + `must_know` |
| 03-06 sed 替换与输出 | `-n` 与 `p`；`s///g`；不加 `-i` 不改原文件 | [sed 打印与替换](https://www.bilibili.com/video/BV1XU8a69EmG/)（5:23） | 按需：[每天一个 sed](https://www.bilibili.com/video/BV1Zz4y1s7r5/)（15:19） | P037、P038 | GNU sed 4.x | 待验收 | `sed -n "2,5d"` 这类组合差异靠题解 |
| 03-07 awk 字段 | `-F`；`$1`/`$3`；`NR`/`NF` | [10 分钟掌握 awk](https://www.bilibili.com/video/BV1V7NMzrET6/)（13:26） | 按需：[10 分钟入门 awk](https://www.bilibili.com/video/BV1de411D7xQ/)（15:20） | P039、P040 | gawk 5.x | 待验收 | `FNR` 与 `OFS` 靠文字补 |
| 03-08 join 按字段合并 | 连接字段相等；两表须先排序；`-t`/`-1`/`-2` | 图文：[Linux join 命令](https://www.runoob.com/linux/linux-comm-join.html)（菜鸟教程） | — | A042 | coreutils join | 待验收 | B 站无合适短视频，本节以图文为主资料 |
| 03-09 查看与排序 | `cut -d -f`；`tail -n`；`sort -n`；`sort \| uniq -c` | [每天一个 sort](https://www.bilibili.com/video/BV13w411D7Vb/)（8:30） | 补充：[每天一个 cut](https://www.bilibili.com/video/BV1zu411A7JX/)（8:00）；按需：[每天一个 uniq](https://www.bilibili.com/video/BV1ZG41197nf/)（6:16） | P041、P044、P043、P042 | coreutils | 待验收 | `uniq` 必须先排序这一点靠 `must_know` |
| 03-10 Vim | `o`/`O`/`x`；`:wq`；`:%s/^#//` | [VIM 输入、保存](https://www.bilibili.com/video/BV1GN411B7bu/)（3:42） | 补充：[vim 基本命令](https://www.bilibili.com/video/BV12q4y167PB/)（14:28）；按需：[搜索与替换](https://www.bilibili.com/video/BV1mt4y1175F/)（10:19） | A074、A033、A034、P045、P046 | Vim 8/9 | 待验收 | `:%s/^#//` 与 `g` 标志的等价性靠题解 |

### 小节总时长（第三专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 03-01 | 7:41 | 是 |
| 03-02 | 6:31 | 是（按需 14:44 不计） |
| 03-03 | 18:32 | 是 |
| 03-04 | 6:27 | 是 |
| 03-05 | 13:47 | 是（图文不计时长；按需 29:33 不计） |
| 03-06 | 5:23 | 是（按需 15:19 不计） |
| 03-07 | 13:26 | 是（按需 15:20 不计） |
| 03-08 | 0:00 | 是（本节只有图文） |
| 03-09 | 16:30 | 是（按需 6:16 不计） |
| 03-10 | 18:10 | 是（按需 10:19 不计） |

## 第四专题（04 Bash 脚本 重定向与作业）

25 题，9 个学习小节，18 条配套资料（16 条视频 + 2 条图文）。全部为机器检索候选。

本专题的检索特点是：**符号类关键词在 B 站几乎搜不到**（`$(())`、`2>&1`、`$@` 都会被拆成无意义的词），
改走两条路——一是按「命令/概念中文名 + 讲解」搜，二是直接找成体系的课程按分 P 挑章节
（`BV1Eq4y1z7u8` 这套 22 分 P 的 Shell 课就有「运算符」「if case」这类精确章节）。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 04-01 Shell 展开 | `{1..100}`；单双引号；`"$path"` | [自定义变量与单双引号的区别](https://www.bilibili.com/video/BV1Ru411C7UN/)（15:52） | 补充：[花括号扩展](https://www.bilibili.com/video/BV1qv411b7EW/)（1:32） | A075、A101、P047、P048 | Bash 4+ | 待验收 | 花括号只有 1:32，展开顺序靠文字补 |
| 04-02 位置参数与特殊参数 | `$1`/`$#`/`$0`/`$$`；`"$@"` vs `"$*"` | [Bash 变量-位置参数变量](https://www.bilibili.com/video/BV1uG411w7tM/)（19:51） | — | P049、P050 | Bash | 待验收 | 已到 20 分钟上限，`$*` 与 `$@` 靠 `must_know` |
| 04-03 命令替换与算术 | `$( )`；`$(( ))`；结果写回变量 | [Shell 编程之运算符](https://www.bilibili.com/video/BV1Eq4y1z7u8/?p=8)（5:46，分集 p8） | 补充：[反引号和单引号](https://www.bilibili.com/video/BV1ck4y1w7Jf/)（4:19） | P057、P058 | Bash | 待验收 | 反引号嵌套问题未讲 |
| 04-04 条件判断 | `[ ]` 空格；`-gt`；`-f/-d/-z` | [if 条件判断语句](https://www.bilibili.com/video/BV1GB4y1X7cL/)（6:55） | 补充：[分支逻辑 if case](https://www.bilibili.com/video/BV1Eq4y1z7u8/?p=11)（2:49） | P051、P052 | Bash | 待验收 | `[[ ]]` 与 `[ ]` 的差异靠文字补 |
| 04-05 执行方式与短路 | `bash script.sh`；`./`；`source`；`&& \|\|` | [如何执行 Shell 脚本程序](https://www.bilibili.com/video/BV1fQ4y1p7dR/)（13:16） | 补充：[命令的退出状态码](https://www.bilibili.com/video/BV15Z421e79c/)（2:35） | P060、P053 | Bash | 待验收 | `&& \|\|` 没有单独视频，靠退出状态 + `must_know` |
| 04-06 逐行读取与调试 | `IFS= read -r`；`bash -n`/`-x` | [while 和 until 循环](https://www.bilibili.com/video/BV1zF411L7Yz/)（11:03） | 补充：图文 [逐行读取的三个条件](https://www.php.cn/faq/3215057.html)、[bash -n -x 调试](https://www.cnblogs.com/wutou/p/18085281) | P059、P061 | Bash 4+ | 待验收 | `IFS=` 与 `-r` 没有中文短视频，靠图文 |
| 04-07 标准流与重定向 | `>`/`>>`；`2>&1` 顺序；`&>` | [深入理解 Shell 中的重定向](https://www.bilibili.com/video/BV1Hm411m7kP/)（8:06） | 补充：[2>&1 语法详解](https://www.bilibili.com/video/BV1hC32zfEDG/)（6:23） | P055、U21、U02、A055 | Bash | 待验收 | `&>` 与 `&>>` 简写靠文字补 |
| 04-08 管道与退出状态 | 管道只接 stdout；`pipefail` | [深入理解 Shell 中的管道](https://www.bilibili.com/video/BV17p421X7Dx/)（4:46） | 补充：[退出码为什么是 141（SIGPIPE）](https://www.bilibili.com/video/BV13Hn26TEeX/)（6:07） | P054、P056 | Bash | 待验收 | `set -o pipefail` 的开关动作未演示 |
| 04-09 后台作业与子 shell | `&`；`Ctrl+Z`/`bg`/`fg`/`jobs`；`nohup`；`( )` | [进程的后台运行（&、bg、fg、jobs、nohup）](https://www.bilibili.com/video/BV1tM411C7ke/)（10:26） | 补充：[&/jobs/fg/bg/nohup/disown](https://www.bilibili.com/video/BV1jg3n6jE7d/)（3:10） | A046、P065、P063、P064、P062 | Bash | 待验收 | 子 shell 与 `{ }` 的对比靠 `must_know` |

### 小节总时长（第四专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 04-01 | 17:24 | 是 |
| 04-02 | 19:51 | 是（已贴近上限，不加补充） |
| 04-03 | 10:05 | 是 |
| 04-04 | 9:44 | 是 |
| 04-05 | 15:51 | 是 |
| 04-06 | 11:03 | 是（图文不计时长） |
| 04-07 | 14:29 | 是 |
| 04-08 | 10:53 | 是 |
| 04-09 | 13:36 | 是 |

## 第五专题（05 用户组 密码与 sudo）

25 题，8 个学习小节，15 条视频，全部为机器检索候选。

本专题的检索经验：**「系列课」比单条视频好用**。`哈七搭八的小猴子` 的「Linux 用户管理之 N」系列
（1 添加用户、3 用户删除、4 查看用户信息、12 chage）标题规整、时长 4～12 分钟，正好一节一条；
`张仲恩` 的「Linux 系统管理」系列则是 2 分钟速览，适合当补充。

| 小节 | 必讲内容 | 主视频（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 05-01 账户数据库 | passwd 七字段；UID 0；shadow | [查看用户信息](https://www.bilibili.com/video/BV1e64y1778P/)（4:26） | 补充：[Linux 用户管理](https://www.bilibili.com/video/BV1EqSqB4Eid/)（14:42） | P066、A071、A067 | RHEL 9/10 | 待验收 | group 成员列表规则靠 `must_know` |
| 05-02 创建用户 | `-u -d -m -s -G`；`/etc/skel`；`CREATE_HOME` | [添加用户](https://www.bilibili.com/video/BV1kw411H73s/)（10:08） | 补充：[useradd + passwd](https://www.bilibili.com/video/BV1uJ2GYrEqJ/)（6:49） | R03、A094、P069、P070、A005 | useradd | 待验收 | `-G` 与 `-g`、`smbpasswd` 靠文字补 |
| 05-03 删除用户与 UID 复用 | `userdel` vs `-r`；遗留文件 | [用户删除](https://www.bilibili.com/video/BV1PN4y12787/)（10:13） | 补充：[删除用户与用户组](https://www.bilibili.com/video/BV1M1421y7i1/)（2:01） | P074、P075 | userdel | 待验收 | UID 复用的机制靠 `must_know` |
| 05-04 主组与附加组 | `-g`/`-G`/`-aG`；`id`；`getent` | [用户及用户组创建和管理](https://www.bilibili.com/video/BV1tZ4y1e7qa/)（9:18） | 补充：[每天一个 usermod](https://www.bilibili.com/video/BV1o94y1B75P/)（5:07） | U03、P067、P068 | 通用 | 待验收 | `getent` 与 `cat /etc/passwd` 差别靠文字 |
| 05-05 密码与锁定 | `passwd`；`-l/-u/-d/-e` | [Linux 命令之 passwd](https://www.bilibili.com/video/BV1WNdaBvEkH/)（6:48） | 补充：[修改用户密码](https://www.bilibili.com/video/BV1Sw4m1v7iq/)（4:48） | A070、R05 | 通用 | 待验收 | 锁定不封 SSH 密钥靠 `must_know` |
| 05-06 密码老化 | `-m -M -W -I -E -d` | [通过 chage 修改密码信息](https://www.bilibili.com/video/BV1m64y1V7FE/)（11:34） | — | R04、P072、U04、P073、P071 | shadow | 待验收 | 6 个选项一次讲全，不再叠补充 |
| 05-07 登录 shell 与 su | `nologin`；`su -`；wheel | [用户管理 su 与 sudo](https://www.bilibili.com/video/BV1k3411J7cv/)（11:31） | 补充：[su 切换用户](https://www.bilibili.com/video/BV1QT421v7tr/)（2:38） | R13、P078、P079 | 通用 | 待验收 | nologin 的边界靠文字补 |
| 05-08 sudo 与 visudo | `visudo`；重定向执行者 | [sudoers 文件配置](https://www.bilibili.com/video/BV1hP41137Ri/)（5:40） | 补充：[为什么 sudo 不能执行](https://www.bilibili.com/video/BV1nb4y1W7uF/)（6:37） | P076、P077 | sudo 1.9+ | 待验收 | `sudo echo > file` 的原理没有视频，靠 `must_know` |

### 小节总时长（第五专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 05-01 | 19:08 | 是 |
| 05-02 | 16:57 | 是 |
| 05-03 | 12:14 | 是 |
| 05-04 | 14:25 | 是 |
| 05-05 | 11:36 | 是 |
| 05-06 | 11:34 | 是（本节无补充） |
| 05-07 | 14:09 | 是 |
| 05-08 | 12:17 | 是 |

## 第六专题（06 文件权限 ACL 与特殊权限）

28 题，10 个学习小节，19 条配套资料（16 条视频 + 3 条图文）。全部为机器检索候选。

本专题的检索难点是**「ACL」这个词被网络设备的 ACL 占满了**——搜 `linux ACL setfacl` 返回的全是
交换机/防火墙的访问控制列表，必须加「文件」「权限」限定。默认 ACL 继承则完全没有合适的中文短视频，
主资料改用图文。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 06-01 权限位与三类主体 | 十位串；属主/属组/其他；rwx 顺序 | [所有者、所属组、其他人](https://www.bilibili.com/video/BV1FY4y1B7DR/)（6:07） | 补充：[754 是什么意思](https://www.bilibili.com/video/BV1pbHA6iEY1/)（4:25） | A045、A089、A007 | 通用 | 待验收 | 类型位对照靠文字补 |
| 06-02 数字换算与 chmod | 4/2/1；640；符号模式 | [每天一个 chmod](https://www.bilibili.com/video/BV19h4y1k7dg/)（9:23） | 补充：[文件权限与八进制数](https://www.bilibili.com/video/BV1az421b7ub/)（2:11） | P080、A024、P081 | 通用 | 待验收 | 符号模式对特殊位的影响靠题解 |
| 06-03 所有权与硬链接 | `chown`/`chgrp`；inode 共享权限 | [每天一个 chown](https://www.bilibili.com/video/BV19j411i7AM/)（3:04） | 补充：[chown 修改属主属组](https://www.bilibili.com/video/BV1LFtM6WE97/)（7:00） | A039、P096 | 通用 | 待验收 | 硬链接权限联动没有视频，靠 `must_know` |
| 06-04 目录权限与删除 | 目录 r/w/x；删除看父目录 wx | [十位 -rwx 详解](https://www.bilibili.com/video/BV1MV4y1T771/)（17:00） | 补充：图文 [文件与目录的 rwx 差异](https://developer.aliyun.com/article/1267820) | R08、P083、P082 | 通用 | 待验收 | 主视频偏十位串，目录语义靠图文 |
| 06-05 umask | 666/777 基准；027 → 640/750 | [Linux 中的默认权限-umask](https://www.bilibili.com/video/BV18Q4y197WP/)（8:46） | 补充：[umask 权限掩码](https://www.bilibili.com/video/BV1D4421D7Zx/)（2:06） | P084、P085 | 通用 | 待验收 | default ACL 干扰 umask 公式靠文字 |
| 06-06 ACL 与 mask 判定 | `setfacl -m`；mask；判定顺序 | [普通文件 ACL 权限设置](https://www.bilibili.com/video/BV13i421f7GV/)（12:50） | 补充：[六大核心命令](https://www.bilibili.com/video/BV1k3g16ZEsW/)（3:23） | P086、A090、P089、P087、A004、P088 | POSIX ACL | 待验收 | mask 判定顺序靠 `must_know` |
| 06-07 默认 ACL 与继承 | `setfacl -d`；`-b` vs `-k` | 图文：[默认 ACL 继承模板](https://www.php.cn/faq/3240339.html) | 补充：图文 [setfacl 命令详解](https://sukbeta.github.io/setfacl-command/) | P090、P091 | POSIX ACL | 待验收 | 无合适短视频，本节主资料是图文 |
| 06-08 SUID | euid；`s` 与 `S` | [特殊文件权限之 SUID](https://www.bilibili.com/video/BV1rx4y1b7tv/)（3:26） | — | R07、P094 | 通用 | 待验收 | 大写 `S` 的对照靠 `must_know` |
| 06-09 SGID 目录继承组 | 2770；只继承组不补权限 | [特殊权限与粘滞位](https://www.bilibili.com/video/BV1gsp7zzE3D/)（8:16） | 补充：[特殊文件权限之 SGID](https://www.bilibili.com/video/BV1aZ421u7XN/)（1:36） | P093、U05、P095、P097 | 通用 | 待验收 | 「不补组写」靠 `must_know` |
| 06-10 Sticky bit | 1777；谁有删除权 | [SUID SGID SBIT 演示](https://www.bilibili.com/video/BV1xk4y1p7LK/)（3:31） | — | P092 | 通用 | 待验收 | 删除权判定细节靠 `must_know` |

### 小节总时长（第六专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 06-01 | 10:32 | 是 |
| 06-02 | 11:34 | 是 |
| 06-03 | 10:04 | 是 |
| 06-04 | 17:00 | 是（图文不计时长） |
| 06-05 | 10:52 | 是 |
| 06-06 | 16:13 | 是 |
| 06-07 | 0:00 | 是（本节只有图文） |
| 06-08 | 3:26 | 是 |
| 06-09 | 9:52 | 是 |
| 06-10 | 3:31 | 是 |

## 第七专题（07 进程 服务 日志与计划任务）

28 题，10 个学习小节，14 条配套资料（全部视频，无图文）。全部为机器检索候选。

本专题的检索难点是**符号型关键词在 B 站不可用**：`--user-unit`、`_UID=`、`Storage=auto`、
`%` 转义这类写法搜不到任何东西，只能按「中文概念名」搜（「用户服务 常驻」「日志 持久化」
「定时任务 环境变量」），或者顺着系列课的分集列表逐集翻。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 07-01 进程状态与 CPU 瓶颈 | R/S/D/T/Z；Z 是已退出未回收；CPU 饱和看队列 | [进程状态与 D 状态详解](https://www.bilibili.com/video/BV1GPn6zvE5z/)（15:26） | — | A019、A021、P102 | 通用内核 | 待验收 | 负载口径靠 `must_know`；时长 15:26 略超 15 分钟参考上限（超 26 秒），无更短且完整的替代 |
| 07-02 观察工具与 nice 优先级 | `ps -eo`；top/free/uptime 分工；nice 越大优先级越低 | [5 分钟学会 ps](https://www.bilibili.com/video/BV1dN4y1r7y5/)（12:15） | 补充：[5 分钟学会 top](https://www.bilibili.com/video/BV17u4y1J7Ec/)（7:27） | P098、P099、P101 | procps-ng | 待验收 | `comm` 与 `args` 的差别靠 `must_know`；本节合计 19:42，已贴近 20 分钟上限，不再追加 |
| 07-03 信号：Ctrl+C、TERM 与 KILL | SIGINT/SIGTERM 可捕获；SIGKILL 不可；`D` 杀不掉 | [kill、pkill、killall](https://www.bilibili.com/video/BV1bpYp6aETv/)（13:33） | — | A008、P100 | 通用 | 待验收 | Ctrl+C 与终端按键的对应关系无视频，靠 `must_know` |
| 07-04 systemd：active 与 enabled | 两个独立维度；`--now` 方向；mask 机制 | [服务管理 systemctl](https://www.bilibili.com/video/BV1Aa411B7AZ/)（10:41） | — | P103、P104、U15、P105 | systemd（RHEL 7+） | 待验收 | mask 只挡启动不停实例，靠 `must_know` |
| 07-05 单元重载、target 与用户服务 | daemon-reload vs reload；multi-user.target；linger | [systemd 的 target](https://www.bilibili.com/video/BV19i4y1k7Ty/)（9:11） | 补充：[写一个开机启动的 service](https://www.bilibili.com/video/BV1hV41167Mc/)（2:29） | P106、P107、U09 | systemd（RHEL 7+） | 待验收 | linger 没有中文短视频，靠 `must_know` |
| 07-06 journal 日志 | `-u`、`-b`/`-b -1`、`-f`、`--since`；持久化前提 | [系统日志 journalctl](https://www.bilibili.com/video/BV12P4y1u76e/)（11:13） | — | P108、P109、P110 | systemd-journald | 待验收 | `Storage=auto` 与 `/var/log/journal` 目录的前提靠 `must_know` |
| 07-07 cron 五字段与个人任务 | 分 时 日 月 周；`0 23 * * *`；日与周是「或」 | [crontab 详解](https://www.bilibili.com/video/BV1Tv411G7dn/)（16:37） | — | A047、U14、P111 | cronie | 待验收 | 「或」语义靠 `must_know`；时长 16:37 超 15 分钟参考上限（超 1 分 37 秒），保留原因同 07-01 |
| 07-08 cron 环境、系统 crontab 与 at | PATH 精简；多一个用户字段；at 一次性 | [5 分钟学会 crontab](https://www.bilibili.com/video/BV1BLzrYHE6C/)（12:13） | 补充：[定时任务实战配置](https://www.bilibili.com/video/BV1zwcizDE31/)（5:01） | P113、P112、A059 | cronie + at | 待验收 | PATH 排错与 `%` 转义靠 `must_know` |
| 07-09 systemd timer | 同名 service 关联；OnCalendar 等三种触发；Persistent | [systemd 定时任务脚本案例](https://www.bilibili.com/video/BV1CcZ9BeEbL/)（8:26） | — | P114、P115、P116 | systemd（RHEL 8+ 推荐） | 待验收 | Persistent 只补跑一次靠 `must_know` |
| 07-10 chrony 时间同步诊断 | `tracking` 与 `sources` 分工；chronyd 是守护进程 | [时间同步 chrony](https://www.bilibili.com/video/BV17gWSeXEZE/)（7:34） | 补充：[部署 chrony 时间同步](https://www.bilibili.com/video/BV1PZkeYnEn5/)（7:08） | P117 | chrony（RHEL 7+） | 待验收 | 输出字段含义靠 `must_know` |

### 小节总时长（第七专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 07-01 | 15:26 | 是（单条超 15 分钟参考值，见上表备注） |
| 07-02 | 19:42 | 是（贴近上限） |
| 07-03 | 13:33 | 是 |
| 07-04 | 10:41 | 是 |
| 07-05 | 11:40 | 是 |
| 07-06 | 11:13 | 是 |
| 07-07 | 16:37 | 是（单条超 15 分钟参考值，见上表备注） |
| 07-08 | 17:14 | 是 |
| 07-09 | 8:26 | 是 |
| 07-10 | 14:42 | 是 |

## 第八专题（08 软件包 仓库与 Flatpak）

23 题，12 个学习小节，14 条配套资料（11 条视频 + 3 条图文）。全部为机器检索候选。

本专题的检索难点是**「dnf」这个词被《地下城与勇士》彻底占满**：搜 `dnf provides`、`dnf clean all`
返回的全是游戏补丁教程，必须换成「yum」「软件包管理」「红帽 配置仓库」这类词才有效；`rpm` 又被
唱片转速和网球线占用，得加「命令」「包」限定。`--enablerepo`、`-qlp` 这类符号组合在 B 站基本搜不到，
相关小节改用中文图文。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 08-01 从仓库装包：dnf install 与包名 | `dnf install 包名`；httpd / tigervnc-server 包名 | [rocky 8.9 yum 与 dnf 命令](https://www.bilibili.com/video/BV1Kw41177e5/)（12:26） | 补充：[yum/dnf 精讲](https://www.bilibili.com/video/BV1WGgs6qESc/)（3:04） | A076、A078、A081 | dnf（RHEL 8/9） | 待验收 | 具体包名对照靠 `must_know` |
| 08-02 本地 RPM：rpm -ivh 与依赖求解 | `rpm -ivh` 装本地文件；rpm 不补依赖、dnf 补 | [RPM 软件包安装教程](https://www.bilibili.com/video/BV1Q44y1v7jR/)（9:08） | 补充：[yum 与 dnf 包管理器](https://www.bilibili.com/video/BV1VyNX6QEy6/)（2:51） | A063、P118 | rpm 通用 | 待验收 | `--disablerepo` 的临时性靠 `must_know` |
| 08-03 查询四件套 | `-q`/`-qa`/`-qf`/`-ql` 各管一件事 | [rpm 的查询、升级与卸载](https://www.bilibili.com/video/BV1Za4y1a7DK/)（9:34） | — | P119 | rpm 通用 | 待验收 | `-qf` 与 `dnf provides` 的边界靠 `must_know` |
| 08-04 预览未装包与找提供者 | `-qlp`/`-qp` 系列；`dnf provides` 反查 | 图文：[rpm 命令参数详解](https://cloud.tencent.com/developer/article/1473085) | 补充：图文 [Linux 命令之 dnf](https://www.cnblogs.com/diantong/p/18432287) | P120、P121、P128 | rpm 通用 | 待验收 | 无合适短视频，本节全是图文；`-p` 的边界是 P128 的关键 |
| 08-05 升级、清理与校验 | update=upgrade；`clean all` 不卸包；`rpm -V` 九位 | 图文：[Linux 命令之 dnf](https://www.cnblogs.com/diantong/p/18432287) | 补充：图文 [rpm 参数详解](https://cloud.tencent.com/developer/article/1473085) | P124、P125 | dnf + rpm | 待验收 | 本节全是图文，`rpm -V` 的输出位由 `must_know` 逐位说明 |
| 08-06 卸载与依赖影响 | `rpm -e` vs `dnf remove`；看事务摘要 | [rpm 的查询、升级与卸载](https://www.bilibili.com/video/BV1Za4y1a7DK/)（9:34） | 补充：图文 [Linux 命令之 dnf](https://www.cnblogs.com/diantong/p/18432287) | P126 | rpm + dnf | 待验收 | `dnf history undo` 靠 `must_know` |
| 08-07 装完访问不了：分层排查 | status → `ss -lntp` → 防火墙 → SELinux → 客户端 | [httpd 服务器搭建](https://www.bilibili.com/video/BV1zu411z74u/)（13:40） | — | P127 | RHEL/CentOS httpd | 待验收 | SELinux 布尔值与端口标签在第十二专题展开 |
| 08-08 .repo 文件结构与 enabled | 段落=仓库 ID；baseurl 指到 repodata；BaseOS/AppStream 两段 | [红帽配置 dnf 仓库](https://www.bilibili.com/video/BV1Us4y1C7Z6/)（5:58） | 补充：[配置 yum 仓库简易版](https://www.bilibili.com/video/BV1E35PzaEox/)（5:46）＋图文 [dnf 命令常见用法](https://www.cnblogs.com/cxygg/p/18584741) | P122、R12 | dnf + .repo | 待验收 | repodata 层级的报错对照靠 `must_know` |
| 08-09 仓库临时开关 | `repolist --all`；`--enablerepo`/`--disablerepo` 只作用一次 | 图文：[dnf 命令常见用法](https://www.cnblogs.com/cxygg/p/18584741) | — | P123 | dnf（Rocky 9 实测） | 待验收 | 无合适短视频；`config-manager` 永久写法靠 `must_know` |
| 08-10 签名校验与「地址能开却装不上」 | `gpgcheck`+`gpgkey`；repodata/架构/版本 | 图文：[dnf 命令常见用法](https://www.cnblogs.com/cxygg/p/18584741) | 补充：[红帽配置 dnf 仓库](https://www.bilibili.com/video/BV1Us4y1C7Z6/)（5:58） | P129 | dnf + rpm-gpg | 待验收 | 验签报错原文靠 `must_know` |
| 08-11 Flatpak 作用域与卸载 | `--user` / `--system`；用户库按账户隔离 | [FlatHub 在 Ubuntu 24.04 的使用](https://www.bilibili.com/video/BV1b7QaYGEQb/)（4:53） | 补充：[flatpak 安装软件方法](https://www.bilibili.com/video/BV1br4y177sT/)（2:21） | P130、P134、P135 | Flatpak 1.x | 待验收 | 作用域目录靠 `must_know` |
| 08-12 remote、run 与 runtime | `remotes`/`remote-add`/`run`/`list`；runtime 共享 | [为什么要用 Flatpak](https://www.bilibili.com/video/BV1BfGy69EbP/)（12:23） | 补充：[FlatHub 使用](https://www.bilibili.com/video/BV1b7QaYGEQb/)（4:53） | P131、P132、P133 | Flatpak 1.x | 待验收 | 概念片偏原理，命令输出靠 `must_know` |

### 小节总时长（第八专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 08-01 | 15:30 | 是 |
| 08-02 | 11:59 | 是 |
| 08-03 | 9:34 | 是 |
| 08-04 | 0:00 | 是（本节只有图文） |
| 08-05 | 0:00 | 是（本节只有图文） |
| 08-06 | 9:34 | 是（含 1 条图文） |
| 08-07 | 13:40 | 是 |
| 08-08 | 11:44 | 是（含 1 条图文） |
| 08-09 | 0:00 | 是（本节只有图文） |
| 08-10 | 5:58 | 是（含 1 条图文） |
| 08-11 | 7:14 | 是 |
| 08-12 | 17:16 | 是 |

## 第九专题（09 分区 文件系统 挂载与交换空间）

30 题，15 个学习小节，15 条配套资料（12 条视频 + 3 条图文）。全部为机器检索候选。

本专题的检索难点是**命令名被别的领域占用**：`partprobe`、`resize2fs` 搜出来全是游戏和工具软件，
`xfs_growfs` 只出长课（18～31 分钟），`swap` 被金融互换合约和 PLC 指令占满。扩容/缩容两节改用中文图文，
`partprobe` 也没有合适视频。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 09-01 块设备只读探查 | `lsblk -f`；`blkid`；`findmnt`；mkfs 不是探查 | [Linux 命令之 lsblk](https://www.bilibili.com/video/BV1z6dWBBEWo/)（5:19） | 补充：[lsblk/blkid 精讲](https://www.bilibili.com/video/BV1A7MG6fEJ5/)（2:18） | P136、P151 | util-linux | 待验收 | findmnt 的用法在 09-11 展开 |
| 09-02 fdisk 与分区类型码 | `w` 写盘、`q` 不存；82/83/8e | [Linux fdisk 命令](https://www.bilibili.com/video/BV1PabXzVEuf/)（9:42） | — | A064、A065 | fdisk（2.23+ 支持 GPT） | 待验收 | GPT 用 GUID 不用类型码，靠 `must_know` |
| 09-03 写盘与内核视图 | `w` 之后内核可能没重读；`partprobe` | 图文：[partprobe 通知内核重读分区表](https://www.php.cn/faq/3078996.html) | — | P138 | util-linux | 待验收 | 无合适短视频，本节只有图文 |
| 09-04 分区→文件系统→挂载 | 三阶段不可替代；mkfs 前先探查 | [分区\|格式化\|挂载 保姆级](https://www.bilibili.com/video/BV1pD4y1u7Kf/)（13:53） | — | P137、P139 | 通用 | 待验收 | 格式化后 UUID 会变，靠 `must_know` |
| 09-05 容量单位 GB 与 GiB | 10^9 vs 2^30；同一字节数两种口径 | [GB 与 GiB 的真正区别](https://www.bilibili.com/video/BV1A9M96LENn/)（8:57） | — | P150 | 通用 | 待验收 | 中英字幕；`-h` 与 `--si` 对照靠 `must_know` |
| 09-06 UEFI 与 ESP | FAT 格式；挂 `/boot/efi`；与 `/boot` 分工 | [认识 EFI 与 UEFI／ESP 修复](https://www.bilibili.com/video/BV1iJ411A7Ju/)（10:50） | — | R01 | UEFI/GPT | 待验收 | 视频偏 Windows 视角，Linux 侧布局靠 `must_know` |
| 09-07 挂载点与 mount | 挂载点=入口；设备与目录都要绝对路径 | [mount 与 umount](https://www.bilibili.com/video/BV1BhdQBEESE/)（6:47） | 补充：[mount/fstab/loop 精讲](https://www.bilibili.com/video/BV11DNA6YEeU/)（3:02） | A066、A052 | util-linux | 待验收 | 绝对路径这个坑靠 `must_know` |
| 09-08 挂载遮蔽与卸载 | 原目录被遮蔽不删除；umount 后恢复 | [mount 与 umount](https://www.bilibili.com/video/BV1BhdQBEESE/)（6:47） | — | P140 | util-linux | 待验收 | 与 09-07 共用视频；`umount busy` 排查靠 `must_know` |
| 09-09 fstab 六字段与 UUID | 六字段顺序；`UUID=`；fs_passno | [fstab 持久化与 UUID 挂载](https://www.bilibili.com/video/BV1UFp2zEEHK/)（11:10） | 补充：[设置开机自动挂载](https://www.bilibili.com/video/BV1UM4m1m7Gy/)（1:45） | P141、P142、R14 | 通用 | 待验收 | XFS 第六字段写 0 靠 `must_know`（R14 是 ext4 填 2） |
| 09-10 挂载选项语义 | `noauto`、`ro`、`nosuid`、`noexec` | [mount/fstab/loop 精讲](https://www.bilibili.com/video/BV11DNA6YEeU/)（3:02） | — | A006、P143 | util-linux | 待验收 | `defaults` 展开与 noexec 边界靠 `must_know` |
| 09-11 mount -a 边界与验证 | `mount -a` 只验当前；`findmnt --mountpoint` | [fstab 持久化与 UUID 挂载](https://www.bilibili.com/video/BV1UFp2zEEHK/)（11:10） | — | P144、P152、P153、P155 | 通用 | 待验收 | 与 09-09 共用视频；`daemon-reload` 靠 `must_know` |
| 09-12 交换空间 | `mkswap`→`swapon`；fstab 写 `swap`；df 看不到 | [swap 交换分区实战](https://www.bilibili.com/video/BV1ksbA69EXr/)（6:40） | 补充：[SWAP 交换分区](https://www.bilibili.com/video/BV1LipgezEC6/)（4:26） | P145、P146、P154 | 通用 | 待验收 | swap 文件写法靠 `must_know` |
| 09-13 ext4 缩容顺序 | 卸载→`e2fsck -f`→`resize2fs`→`lvreduce` | 图文：[LVM 扩容与缩减详细教程](https://www.php.cn/faq/2480428.html) | — | P148、A002 | LVM + ext4 | 待验收 | 无合适短视频，本节只有图文 |
| 09-14 XFS 只能扩 | `xfs_growfs 挂载点`；扩 LV 后 df 不变 | 图文：[LVM 扩容与缩减详细教程](https://www.php.cn/faq/2480428.html) | — | P147、P149 | LVM + XFS | 待验收 | 与 09-13 共用图文；`xfs_info` 字段靠 `must_know` |
| 09-15 RHEL 7 文件系统 | 默认 XFS；RHEL 6 默认 ext4；ext4/vfat 仍可用 | 图文：[磁盘分区安装 rhel7](https://www.cnblogs.com/tiki/p/10782979.html) | — | A102、A103 | RHEL 7 | 待验收 | 资料只有一句话相关，支持清单靠 `must_know` |

### 小节总时长（第九专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 09-01 | 7:37 | 是 |
| 09-02 | 9:42 | 是 |
| 09-03 | 0:00 | 是（本节只有图文） |
| 09-04 | 13:53 | 是 |
| 09-05 | 8:57 | 是 |
| 09-06 | 10:50 | 是 |
| 09-07 | 9:49 | 是 |
| 09-08 | 6:47 | 是 |
| 09-09 | 12:55 | 是 |
| 09-10 | 3:02 | 是 |
| 09-11 | 11:10 | 是 |
| 09-12 | 11:06 | 是 |
| 09-13 | 0:00 | 是（本节只有图文） |
| 09-14 | 0:00 | 是（本节只有图文） |
| 09-15 | 0:00 | 是（本节只有图文） |

## 第十专题（10 LVM与Stratis）

21 题，11 个学习小节，9 条配套资料（6 条视频 + 3 条图文）。全部为机器检索候选。

本专题的检索难点是**Stratis 在 B 站几乎空白**：搜 `stratis` 只返回 1:31 的版本新闻和 189 分钟的
RHCE 长课，没有可用的中文短视频，10-08～10-11 四节全部改用图文（博客园实操 + Red Hat 官方文档）。
`pvmove`、`thin pool` 同样搜不到中文短视频，前者用图文、后者借用 PVE 语境的厚/薄置备讲解。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 10-01 LVM 三层与定位 | PV/VG/LV；`pvs`/`vgs`/`lvs`；两类 UUID；与标准分区并存 | [PV,VG,LV 的区别，动手练](https://www.bilibili.com/video/BV1dY4y1z74o/)（6:15） | 补充：[什么是 LVM](https://www.bilibili.com/video/BV11dMv6cEPj/)（1:52） | P156、P157、R02、P166、P167 | lvm2 | 待验收 | `df` 与 `lvs` 的口径差异靠 `must_know` |
| 10-02 从空盘到 LV 的顺序 | `pvcreate`→`vgcreate`→`lvcreate`；`-L`/`-n` | [LVM 的制作，重点是扩容](https://www.bilibili.com/video/BV1ZT4y1A7x7/)（17:25） | — | U18 | lvm2 | 待验收 | 时长 17:25 超 15 分钟参考值（超 2 分 25 秒），保留原因见下方例外说明 |
| 10-03 加 PV 与扩容参数 | `vgextend` vs `lvextend`；`-L +1G`；`-l +100%FREE`；PE 计算 | [Linux 给磁盘扩容（LVM）](https://www.bilibili.com/video/BV1xq421F7Ma/)（11:25） | — | P158、P159、P160、P162 | lvm2 | 待验收 | `-L` 与 `-l` 大小写靠 `must_know` |
| 10-04 lvextend -r | `-r` 顺带扩文件系统；VG 要有 VFree | [Linux 给磁盘扩容（LVM）](https://www.bilibili.com/video/BV1xq421F7Ma/)（11:25） | — | P161 | lvm2 | 待验收 | 与 10-03 共用视频；`-r` 对 XFS/ext4 的分派靠 `must_know` |
| 10-05 LVM 快照 | 时点视图；COW 写满失效；不是备份 | [LVM 快照功能](https://www.bilibili.com/video/BV1Pr4y1k7SQ/)（4:30） | — | P163 | lvm2 snapshot | 待验收 | `fsfreeze` 与 COW 满的处置靠 `must_know` |
| 10-06 thin pool | 超售；数据与元数据两块空间 | [厚/精简置备与 Thin Pool](https://www.bilibili.com/video/BV1JgLQ6HE6D/)（5:51） | — | P164 | thin provisioning | 待验收 | 视频是 PVE 语境；元数据耗尽的后果靠 `must_know` |
| 10-07 pvmove 迁走 PV | `pvmove`→`vgreduce`→`pvremove` | 图文：[LVM 坏道硬盘热迁移](https://www.php.cn/faq/2643926.html) | — | P165 | lvm2 | 待验收 | 无合适短视频，本节只有图文 |
| 10-08 Stratis 池与文件系统 | pool / filesystem 两级；对外是 XFS；建完要挂载 | 图文：[RHEL 高级磁盘管理—Stratis](https://www.cnblogs.com/xuanbjut/p/14135317.html) | — | P168、P169 | Stratis（RHEL 8 起） | 待验收 | 无中文短视频；实例基于 RHEL 8，命令在 RHEL 9 一致 |
| 10-09 Stratis 的 fstab 依赖 | `/dev/stratis/池/fs`；`stratis-fstab-setup@池UUID` | 图文：[RHEL 高级磁盘管理—Stratis](https://www.cnblogs.com/xuanbjut/p/14135317.html) | 补充：[RHEL 9 官方文档 第 25 章](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/9/html/managing_file_systems/setting-up-stratis-file-systems_managing-file-systems) | P170、U06 | RHEL 9 | 待验收 | 官方模板需人工核对原文；RHEL 8 与 9 写法不同 |
| 10-10 Stratis 监控与排查 | 逻辑大小≠可用；先池后 fs 再 `findmnt` | 图文：[RHEL 高级磁盘管理—Stratis](https://www.cnblogs.com/xuanbjut/p/14135317.html) | — | P171、P172 | Stratis | 待验收 | 与 10-08 共用图文；`pool list` 字段含义靠 `must_know` |
| 10-11 Stratis 与考试范围 | 功能存在≠考纲要求；查当期 EX200 | 图文：[RHEL 高级磁盘管理—Stratis](https://www.cnblogs.com/xuanbjut/p/14135317.html) | 补充：[RHEL 9 官方文档 第 25 章](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/9/html/managing_file_systems/setting-up-stratis-file-systems_managing-file-systems) | P173 | RHEL 9 | 待验收 | 没有讲考纲的资料，结论靠 `must_know` |

### 小节总时长（第十专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 10-01 | 8:07 | 是 |
| 10-02 | 17:25 | 是（单条超 15 分钟参考值，见例外说明） |
| 10-03 | 11:25 | 是 |
| 10-04 | 11:25 | 是 |
| 10-05 | 4:30 | 是 |
| 10-06 | 5:51 | 是 |
| 10-07 | 0:00 | 是（本节只有图文） |
| 10-08 | 0:00 | 是（本节只有图文） |
| 10-09 | 0:00 | 是（本节只有图文） |
| 10-10 | 0:00 | 是（本节只有图文） |
| 10-11 | 0:00 | 是（本节只有图文） |

## 第十一专题（11 网络 NetworkManager与SSH）

41 题，17 个学习小节，22 条配套资料（21 条视频 + 1 条图文）。全部为机器检索候选。

本专题题量最大，检索难点有两处：

- **概念类关键词太泛**：`路由表`、`子网掩码` 搜出来的多是软考/计算机网络考研课，长且不针对 RHEL。改用
  「最长前缀匹配」「路由表七大要素」「主机地址范围求法」这类具体说法才命中 3～10 分钟的短视频。
- **RHEL 9 的 ifcfg / keyfile 几乎没有中文短视频**：搜「ifcfg」返回的是遥感数据工具 HEG 和
  「gaussian 输入文件」；只能退一步用「Linux实验05 配置网络」这类实验课，边界靠 `must_know` 讲。
  `never-default`、`ignore-auto-dns` 同理，没有单条视频讲，全部写在 `must_know` 里。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 11-01 地址长度与转发 | 32/128 位；DHCP 发 IP；交换机二层、路由器三层 | [IP地址、子网掩码、网络地址、地址块](https://www.bilibili.com/video/BV14kmqBKE1a/)（9:12） | — | A037、A082、A083、A087、A088 | 通用 | 待验收 | 二层/三层设备分工靠 `must_know` |
| 11-02 子网划分 | `/26`→`255.255.255.192`；块大小 64；网络/广播/可用范围 | [网络地址 广播地址 主机地址范围求法](https://www.bilibili.com/video/BV17a411t7Jp/)（5:09） | — | P177 | 通用 | 待验收 | VLSM 借位未覆盖 |
| 11-03 nmcli 静态地址 | device vs connection；`ipv4.method manual`；up 后验收 | [使用nmcli命令配置Linux网络参数](https://www.bilibili.com/video/BV1rmZ3YXETr/)（16:49） | — | P174、P175、P176、P192 | NetworkManager | 待验收 | 16:49 超 15 分钟参考值，见例外说明 |
| 11-04 ip 与 ifconfig | `ip a` 缩写；`ip` 改运行态；`ifconfig` 不管驱动 | [ip addr 命令使用详解](https://www.bilibili.com/video/BV1vaY5zYETm/)（9:42） | 补充：[ip/ifconfig/hostname](https://www.bilibili.com/video/BV1cj3b6LEw8/)（2:55） | A077、P185、A014 | iproute2 | 待验收 | 临时 vs 持久靠 `must_know` |
| 11-05 ifcfg 兼容边界 | 弃用但兼容；keyfile 默认；`BOOTPROTO` 无 `static` | [Linux实验05 配置网络](https://www.bilibili.com/video/BV1Tq421P7GG/)（11:49） | — | P186、A073 | RHEL 9 | 待验收 | 实验课可能不讲弃用边界，靠 `must_know` |
| 11-06 临时路由与字段 | `ip route add 前缀 via 网关`；`default via … dev …` | [如何查看IP路由表和理解字段](https://www.bilibili.com/video/BV1ep4y1T7py/)（3:07） | 补充：[IP路由表七大要素](https://www.bilibili.com/video/BV1bt4y1w77k/)（6:44） | A013、P178 | iproute2 | 待验收 | 策略路由未覆盖 |
| 11-07 持久化静态路由 | `+ipv4.routes`；不带 `+` 会替换；`-` 是删除 | [centos静态路由配置](https://www.bilibili.com/video/BV1ph41167Qh/)（8:14） | — | A012、P181 | CentOS 7 风格 | 待验收 | 标题未提 nmcli，与 RHEL 9 写法有代差 |
| 11-08 最长前缀与 metric | 先比前缀长度；同前缀比 metric；单播只选一条 | [「计算机网络」最长前缀匹配原则](https://www.bilibili.com/video/BV1JK4y1V7iE/)（10:14） | 补充：[最长匹配原则 路由转发](https://www.bilibili.com/video/BV1rg411v7wB/)（1:55） | P179、P180 | 通用 | 待验收 | 通用网络课，Linux 策略路由未覆盖 |
| 11-09 默认路由边界 | 同网段不经网关不要 DNS；`never-default`；只管 IPv4 | [如何查看IP路由表和理解字段](https://www.bilibili.com/video/BV1ep4y1T7py/)（3:07） | — | R15、A016、U07、P191 | NetworkManager | 待验收 | `never-default` 无专门视频，靠 `must_know` |
| 11-10 hosts 与 A 记录 | `地址 名字`；A→IPv4、AAAA→IPv6 | [DNS的常用记录详解](https://www.bilibili.com/video/BV1AT411D7z7/)（4:20） | — | A017、A026 | 通用 | 待验收 | hosts 写法与优先级靠 `must_know` |
| 11-11 DNS 排查 | `getent` 走 NSS、`dig` 直问；`ignore-auto-dns` | 图文：[getent 与 nsswitch.conf 的解析顺序](https://www.cnblogs.com/tiantao36/p/18976674) | — | P182、P183、P184 | glibc NSS | 待验收 | 无合适中文短视频，本节只有图文 |
| 11-12 连通性工具 | `ping -c`；`-t` 是 TTL；traceroute 逐跳；`nmap -sn` | [Linux命令之ping、traceroute、mtr](https://www.bilibili.com/video/BV15UoEBQEdk/)（6:46） | 补充：[traceroute 排障](https://www.bilibili.com/video/BV1dk4y1L7D7/)（6:18）；按需：[nmap 定位存活主机](https://www.bilibili.com/video/BV1qQEF6VE5c/)（12:29） | A023、A032、A085、A086 | iputils / nmap | 待验收 | nmap 那条是渗透视角，只作按需 |
| 11-13 监听与端口 | `-lntp` 各字母；绑 127.0.0.1 vs 0.0.0.0 | [Linux命令之netstat、ss](https://www.bilibili.com/video/BV1ZroEBxEBv/)（6:39） | — | P190 | iproute2 | 待验收 | 绑定地址判断靠 `must_know` |
| 11-14 SSH 端口 | `ssh -p` / `scp -P`；`scp -p` 是保权限；SELinux 端口标签 | [W13.02 修改 ssh 默认端口](https://www.bilibili.com/video/BV1YeVozYEV8/)（15:04） | — | P187 | OpenSSH / RHEL | 待验收 | 15:04 超 15 分钟参考值；SELinux 那步待确认 |
| 11-15 公钥登录 | 私钥留客户端；公钥进 authorized_keys；权限过松被拒 | [SSH免密登录的原理](https://www.bilibili.com/video/BV1y4411q7PW/)（14:23） | 按需：[linux配置ssh免密登录](https://www.bilibili.com/video/BV1BN4y1V7Vg/)（8:30） | P188 | OpenSSH | 待验收 | 两条合计 22:53，故实操那条按「按需」挂出、不计入预算 |
| 11-16 连不上怎么查 | `known_hosts` vs `authorized_keys`；按层查；FCAPS 的 F 是故障管理 | [SSH连接失败的终极排查攻略](https://www.bilibili.com/video/BV1FpDzBBEGe/)（4:46） | — | P189、P193、A030 | OpenSSH | 待验收 | 视频是云主机视角，本机对应 firewalld/sshd |
| 11-17 xrdp 与 RDP | xrdp→RDP；mstsc 可连；3389 | [从Windows远程桌面连接Linux](https://www.bilibili.com/video/BV1qu411P7u7/)（5:06） | — | A080 | xrdp | 待验收 | 只覆盖协议归属 |

### 小节总时长（第十一专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 11-01 | 9:12 | 是 |
| 11-02 | 5:09 | 是 |
| 11-03 | 16:49 | 是（单条超 15 分钟参考值，见例外说明） |
| 11-04 | 12:37 | 是 |
| 11-05 | 11:49 | 是 |
| 11-06 | 9:51 | 是 |
| 11-07 | 8:14 | 是 |
| 11-08 | 12:09 | 是 |
| 11-09 | 3:07 | 是 |
| 11-10 | 4:20 | 是 |
| 11-11 | 0:00 | 是（本节只有图文） |
| 11-12 | 13:04 | 是（nmap 12:29 按需不计入） |
| 11-13 | 6:39 | 是 |
| 11-14 | 15:04 | 是（单条超 15 分钟参考值，见例外说明） |
| 11-15 | 14:23 | 是（8:30 实操那条按需不计入） |
| 11-16 | 4:46 | 是 |
| 11-17 | 5:06 | 是 |

## 第十二专题（12 防火墙 SELinux与Web排障）

27 题，14 个学习小节，13 条配套资料（9 条视频 + 4 条图文）。全部为机器检索候选。

本专题是「B 站视频最少、官方文档最好用」的典型：

- **firewalld 有视频但讲得浅**：命中两条（10:03 概览 + 5:31 开放端口），但 runtime/permanent
  两套视图、`--runtime-to-permanent` 与 `--reload` 的方向差异，视频里往往一句带过，配了一篇阿里云长文。
- **SELinux 几乎全是噪音**：搜「SELinux 模式」「布尔值」「semanage port」返回的是安卓刷机、
  LLM 的「上下文压缩」插件、以及 `chcon` 拼错后的杂项。真正能用的只有 RHCSA/RHCE 课程切片
  （9:30 调试、10:18 调查拒绝）和一条 5:39 的「非标准目录放网页」实操。
- **`semanage fcontext` / `semanage port` / `setsebool -P` 三条命令没有任何中文短视频**，
  全部改用 php.cn 的近期图文（正文已机器读过，覆盖命令与坑点），并在 `must_know` 里写清 `-a` 与 `-m`、
  `-P` 与非 `-P` 的区别。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 12-01 两套配置 | runtime/permanent；`--reload` 方向；`--runtime-to-permanent` | 图文：[firewalld 防火墙使用详解](https://developer.aliyun.com/article/1707560) | 补充：[10分钟掌握Linux防火墙](https://www.bilibili.com/video/BV1EExgz3EEE/)（10:03） | P194、P197、P212 | firewalld | 待验收 | 视频是否讲两套视图待确认 |
| 12-02 服务与端口 | `http` 只含 80；`--add-port`；`--query-port` 两视图 | [Linux中如何开放防火墙端口](https://www.bilibili.com/video/BV1JF411E7H8/)（5:31） | — | P196、P198 | firewalld | 待验收 | service 与 port 边界靠 `must_know` |
| 12-03 区域与接口 | 流量按接口 zone 选规则；`--get-active-zones` | 图文：[firewalld 防火墙使用详解](https://developer.aliyun.com/article/1707560) | — | P195 | firewalld | 待验收 | 本节只有图文 |
| 12-04 httpd 基础 | `/etc/httpd/conf/httpd.conf`；`DocumentRoot` | [Apache 服务器配置及简单网页搭建](https://www.bilibili.com/video/BV1Tb4y1X7Lq/)（14:14） | — | A020、A079 | Apache httpd | 待验收 | 14:14 接近 15 分钟参考值 |
| 12-05 模式与 root | Enforcing/Permissive/Disabled；`sestatus`；root 不豁免 | [一个视频讲透 SELinux](https://www.bilibili.com/video/BV1t3Nt6TEAD/)（2:22） | 补充：[RHCSA 调试 selinux](https://www.bilibili.com/video/BV1224y1k7cz/)（9:30） | P199、P209 | SELinux | 待验收 | 主视频太短，细节靠补充 + `must_know` |
| 12-06 布尔值 | `getsebool -a`；`setsebool` vs `-P` | 图文：[查看和修改 SELinux 布尔值](https://www.php.cn/faq/3267463.html) | — | P203 | SELinux | 待验收 | 无中文短视频，本节只有图文 |
| 12-07 上下文 | 四段格式；`ls -Z`/`ls -Zd`；`ps -eZ` | 图文：[文件上下文标签管理](https://www.php.cn/faq/2625941.html) | — | P200、P207 | SELinux | 待验收 | 进程域那半靠 `must_know` |
| 12-08 fcontext | `semanage fcontext -a/-m` + `restorecon -Rv`；顺序 | 图文：[文件上下文标签管理](https://www.php.cn/faq/2625941.html) | 补充：[非标准目录放网页](https://www.bilibili.com/video/BV1w54y1x7JR/)（5:39） | U24、P201、P208 | SELinux | 待验收 | 视频是 /home/wwwroot 场景 |
| 12-09 只读与可写 | `httpd_sys_content_t` vs `httpd_sys_rw_content_t` | 图文：[文件上下文标签管理](https://www.php.cn/faq/2625941.html) | — | P202 | SELinux | 待验收 | rw 类型与布尔值配合靠 `must_know` |
| 12-10 端口标签 | `semanage port -a` 新增、`-m` 修改；`http_port_t` | 图文：[SELinux 端口标签与服务绑定](https://www.php.cn/faq/2614916.html) | — | P213、U08、P205 | SELinux | 待验收 | 无中文短视频，本节只有图文 |
| 12-11 403 证据链 | `ausearch -m avc`；主体/客体；`dontaudit` | [调查和解决 SELinux 问题](https://www.bilibili.com/video/BV1eR7tzcE7P/)（10:18） | — | P204、P211 | SELinux | 待验收 | httpd 的 `Require` 靠 `must_know` |
| 12-12 三层分工 | 应用 / firewalld / SELinux；超时 vs 403 | 图文：[firewalld 防火墙使用详解](https://developer.aliyun.com/article/1707560) | 补充：[Nginx 403/502/504 定位](https://www.bilibili.com/video/BV1s6a364Ez9/)（2:08） | P206、R09、P210 | 通用 | 待验收 | 视频是 Nginx 视角，只作补充 |
| 12-13 OpenSSL | 密码学库 + 命令行工具 | [什么是 openssl](https://www.bilibili.com/video/BV1XK421C72d/)（4:54） | — | A051 | OpenSSL | 待验收 | 视角偏 C 开发，运维命令靠 `must_know` |
| 12-14 autorelabel | `/.autorelabel` 绝对路径；chroot 后写目标根 | 图文：[文件上下文标签管理](https://www.php.cn/faq/2625941.html) | — | A095 | RHEL 7 救援 | 待验收 | RHEL 7 场景靠 `must_know` |

### 小节总时长（第十二专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 12-01 | 10:03 | 是 |
| 12-02 | 5:31 | 是 |
| 12-03 | 0:00 | 是（本节只有图文） |
| 12-04 | 14:14 | 是 |
| 12-05 | 11:52 | 是 |
| 12-06 | 0:00 | 是（本节只有图文） |
| 12-07 | 0:00 | 是（本节只有图文） |
| 12-08 | 5:39 | 是 |
| 12-09 | 0:00 | 是（本节只有图文） |
| 12-10 | 0:00 | 是（本节只有图文） |
| 12-11 | 10:18 | 是 |
| 12-12 | 2:08 | 是 |
| 12-13 | 4:54 | 是 |
| 12-14 | 0:00 | 是（本节只有图文） |

## 第十三专题（13 NFS autofs与网络服务）

26 题，16 个学习小节，14 条配套资料（11 条视频 + 3 条图文）。全部为机器检索候选。

本专题是「一半能搜到、一半只能靠常识题兜底」的类型：

- **NFS 与 autofs 视频充足**：`NFS 服务端`「autofs 自动挂载」都能命中 4～12 分钟的实操，
  还有一条 RHCSA 的 autofs 实验课和一条专门测 `root_squash` 的 10:19，比前几个专题好找得多。
- **DNS/Samba 只能退一步**：`DNS 区域文件` 搜出来一半是 Windows Server 的课程（`named` 换成
  「DNS 管理器」），`Samba` 搜出来几乎全是 NAS/OpenWrt 的图形界面。最后用一条 Rocky 9 的 DNS 实操
  （与 RHEL 9 兼容）和一条 CentOS 7 的 Samba 搭建顶上。
- **后半段基本是常识题**：端口号、协议职责、B/S 架构、iSCSI 呈现什么、Squid 的 `cache_mem`，
  没有对应短视频，用两篇图文（端口对照表、块/文件存储对比、Squid 配置）加 `must_know` 解决。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 13-01 NFS 是什么 | NFS 全称；`/etc/exports`；`exportfs -ra` | [NFS共享服务配置](https://www.bilibili.com/video/BV1pE411E7yr/)（4:00） | 补充：[RHEL 配置 NFS+NIS](https://www.bilibili.com/video/BV1Pk4y1z7QL/)（8:53） | A028、A061 | NFS | 待验收 | 4:00 太短，RPC 与 v3/v4 端口靠 `must_know` |
| 13-02 服务端准备 | `nfs-utils`；exports；`add-service=nfs` | [nfs服务配置](https://www.bilibili.com/video/BV1bJ4m1G7AB/)（11:01） | — | P215 | nfs-utils | 待验收 | `chmod 777` 不能替代导出，靠 `must_know` |
| 13-03 客户端挂载 | `mount -t nfs server:/path /mnt`；挂载点 | [NFS共享服务配置](https://www.bilibili.com/video/BV1pE411E7yr/)（4:00） | — | P214 | NFS | 待验收 | 与 13-01 共用同一条视频 |
| 13-04 root_squash 与 ro | 映射匿名身份；`ro` 是服务端选项 | [测试 root_squash 的读写限制](https://www.bilibili.com/video/BV1ug4y1B7LE/)（10:19） | — | P217、P216 | CentOS 7 / NFSv3 | 待验收 | 匿名用户从 nfsnobody 变 nobody |
| 13-05 开机自动挂载 | `/etc/fstab` + `_netdev`；启动时序；验收 | [nfs服务配置](https://www.bilibili.com/video/BV1bJ4m1G7AB/)（11:01） | — | P221 | NFS | 待验收 | 无 fstab 时序短视频，靠 `must_know` |
| 13-06 autofs 按需挂载 | 访问触发；空闲卸载；`timeout` | [RHCSA8-autofs自动挂载](https://www.bilibili.com/video/BV1PA411j7hv/)（11:52） | — | P218 | RHEL 8 | 待验收 | timeout 默认值靠 `must_know` |
| 13-07 主映射与两种映射 | `auto.master`；键相对基目录；`/-` 直接映射 | [RHCSA8-autofs自动挂载](https://www.bilibili.com/video/BV1PA411j7hv/)（11:52） | — | P220、P219 | RHEL 8 | 待验收 | 直接映射写法是否讲到待确认 |
| 13-08 DNS 端口与 named | 53 的 UDP+TCP；BIND/named；进程名对照 | [rocky9 linux DNS服务器配置](https://www.bilibili.com/video/BV1V5GJzZEWp/)（16:50） | — | A100、A098 | Rocky 9（≈RHEL 9） | 待验收 | 16:50 超 15 分钟参考值，见例外说明 |
| 13-09 区域文件与 CNAME | CNAME vs A/MX/NS/PTR；SOA 序列号 | [Linux--DNS服务器配置](https://www.bilibili.com/video/BV1rL4y1c7zu/)（12:48） | — | A056 | BIND | 待验收 | 记录辨析靠 `must_know` |
| 13-10 Samba 的守护进程 | `smbd` / `nmbd`；文件共享≠DNS | [linux下samba服务器的搭建](https://www.bilibili.com/video/BV1Bv4y137SZ/)（11:06） | — | A060、A036 | Samba | 待验收 | 是否讲到两个守护进程待确认 |
| 13-11 端口与协议对照 | 80/443；SMTP 25 / POP3 110；Postfix 是 MTA | 图文：[常用端口号汇总](https://www.cnblogs.com/fengdejiyixx/p/12643551.html) | 补充：[电子邮件工作原理](https://www.bilibili.com/video/BV14CXUYpErx/)（3:29） | A049、A057、A097 | 通用 | 待验收 | 邮件视频作者自述可能有讲错处，只作补充 |
| 13-12 FTP | ASCII / binary；21 控制连接；anonymous | [搞懂主动/被动模式，区分 FTP 与 TFTP](https://www.bilibili.com/video/BV1xW8w68EUP/)（8:23） | — | A048、A022、A043 | 通用 | 待验收 | 两种传输类型靠 `must_know` |
| 13-13 SSH/Telnet/SFTP | 加密与否；SFTP 走 SSH；换端口不改协议 | 图文：[常用端口号汇总](https://www.cnblogs.com/fengdejiyixx/p/12643551.html) | — | P222 | 通用 | 待验收 | 本节主要靠 `must_know` |
| 13-14 三种存储与 iSCSI | 块 vs 文件；initiator/target；3260 | 图文：[块存储、iSCSI、NFS 解析](https://cloud.baidu.com/article/3822543) | — | A003 | iSCSI | 待验收 | 无合适中文短视频 |
| 13-15 B/S 与 PHP+MySQL | B/S = Browser/Server；三层结构 | [B/S 与 C/S 架构区别](https://www.bilibili.com/video/BV1rA41167aW/)（11:06） | — | A027、A050 | 通用 | 待验收 | PHP+MySQL 那半靠 `must_know` |
| 13-16 Squid 与 cache_mem | `cache_mem 64 MB`；`cache_dir`；`http_port 3128` | 图文：[Squid 缓存代理完整配置](https://www.cnblogs.com/wayne173/p/3768182.html) | — | A062 | Squid 2.x/3.x | 待验收 | 无合适中文短视频 |

### 小节总时长（第十三专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 13-01 | 12:53 | 是 |
| 13-02 | 11:01 | 是 |
| 13-03 | 4:00 | 是 |
| 13-04 | 10:19 | 是 |
| 13-05 | 11:01 | 是 |
| 13-06 | 11:52 | 是 |
| 13-07 | 11:52 | 是 |
| 13-08 | 16:50 | 是（单条超 15 分钟参考值，见例外说明） |
| 13-09 | 12:48 | 是 |
| 13-10 | 11:06 | 是 |
| 13-11 | 3:29 | 是 |
| 13-12 | 8:23 | 是 |
| 13-13 | 0:00 | 是（本节只有图文） |
| 13-14 | 0:00 | 是（本节只有图文） |
| 13-15 | 11:06 | 是 |
| 13-16 | 0:00 | 是（本节只有图文） |

## 第十四专题（14 容器与历史扩展）

13 题，10 个学习小节，10 条配套资料（9 条视频 + 1 条图文）。全部为机器检索候选。

本专题题量最小，但**两个知识点在 B 站基本没有中文资料**：

- **Podman 本身能搜到**：架构对比（12:55）、8 分钟入门、10 大指令（16:00）、Quadlet 实操（10:58）
  都有，覆盖 rootless/rootful、`ps -a`、`logs`/`exec`/`inspect`、声明式 systemd 集成。
- **卷的 SELinux 标签（`:z` / `:Z`）搜不到**：搜出来的全是安卓刷机与「SELinux 处于宽容模式」，
  最后用一篇 `podman-run(1)` 官方 man 页的中文译文顶上（正好讲清默认不改标签、`:z` 共享、`:Z` 私有）。
- **云平台那三题（IaaS/PaaS/SaaS、OpenStack 组件、Redis）都是常识题**，视频只有 2～4 分钟，
  职责细节全部写进 `must_know`。

| 小节 | 必讲内容 | 主资料（时长） | 补充 / 按需 | 覆盖题号 | 版本 | 验证 | 缺口 |
|---|---|---|---|---|---|---|---|
| 14-01 rootless 与 rootful | 无守护进程；两种跑法；两套存储 | [Podman 对比 Docker 的架构](https://www.bilibili.com/video/BV1jcu6z7ExM/)（12:55） | 补充：[容器三剑客怎么选](https://www.bilibili.com/video/BV1Ts8m64Eej/)（6:46） | P223 | Podman | 待验收 | 合计 19:41，接近 20 分钟上限 |
| 14-02 镜像与容器 | 镜像是模板；`images` vs `ps -a` | [八分钟入门 podman](https://www.bilibili.com/video/BV1s54y1E7YE/)（7:32） | — | P224 | Podman | 待验收 | 作者已注销，链接失效需替换 |
| 14-03 ps 的范围 | 默认只看运行中；`-a`；用户存储分离 | [Podman 10 大入门指令](https://www.bilibili.com/video/BV1P8411f7dp/)（16:00） | — | P225、P228 | Podman | 待验收 | 16:00 超 15 分钟参考值（超 1 分 00 秒）；没有更短且完整覆盖 `ps -a`/`logs`/`inspect` 的中文视频，保留 |
| 14-04 诊断命令 | `logs` / `exec` / `inspect` 各管什么 | [Podman 10 大入门指令](https://www.bilibili.com/video/BV1P8411f7dp/)（16:00） | — | P226 | Podman | 待验收 | 与 14-03 共用同一条视频（不额外增加时长）；单条超时原因同上 |
| 14-05 宿主机目录的标签 | 默认不改标签；`:z` 共享、`:Z` 私有（bind mount） | 图文：[podman -v 的 :Z 详解](https://www.cnblogs.com/zhealks/p/15592989.html) | — | P227 | podman-run(1) | 待验收 | 无中文短视频，本节只有图文 |
| 14-06 Quadlet | `.container`；`daemon-reload`；linger；旧命令曾存在 | [Quadlet 方案入坑](https://www.bilibili.com/video/BV1q1cszQEXa/)（10:58） | — | P229、P230 | Podman 4.4+ | 待验收 | linger 是否讲到待确认 |
| 14-07 -p 与 EXPOSE | `宿主:容器` 顺序；`EXPOSE` 只声明；`sshd -D` | [Docker端口映射](https://www.bilibili.com/video/BV1VC411h7is/)（11:49） | — | R10、R11 | docker run | 待验收 | `EXPOSE` 与 `sshd -D` 靠 `must_know` |
| 14-08 云服务交付模型 | IaaS/PaaS/SaaS；OpenStack 不是模型 | [SaaS、PaaS、IaaS 的区别](https://www.bilibili.com/video/BV1UN4y1F7m5/)（2:11） | — | A091 | 通用 | 待验收 | 2:11 只讲边界 |
| 14-09 OpenStack 组件 | Keystone/Nova/Neutron/Horizon | [OpenStack 9 大核心组件](https://www.bilibili.com/video/BV1ENiUYhE6h/)（3:56） | — | A092 | OpenStack | 待验收 | 只列名单，职责靠 `must_know` |
| 14-10 Redis | 内存键值存储 vs 关系型 | [MySQL 和 Redis 有什么区别](https://www.bilibili.com/video/BV1hnKg6cEJe/)（2:50） | — | A093 | 通用 | 待验收 | 数据结构类型靠 `must_know` |

### 小节总时长（第十四专题）

| 小节 | 主 + 补充 | 是否 ≤ 20 分钟 |
|---|---|---|
| 14-01 | 19:41 | 是（接近上限） |
| 14-02 | 7:32 | 是 |
| 14-03 | 16:00 | 是（单条超 15 分钟参考值，见例外说明） |
| 14-04 | 16:00 | 是（同上，共用视频） |
| 14-05 | 0:00 | 是（本节只有图文） |
| 14-06 | 10:58 | 是 |
| 14-07 | 11:49 | 是 |
| 14-08 | 2:11 | 是 |
| 14-09 | 3:56 | 是 |
| 14-10 | 2:50 | 是 |

## 后续专题的固定流程

不要直接搜「Linux 基础教程」，以学习小节为最小单位：

1. 从该组题干、`knowledge_point` 和解析里提取 3～6 个核心词。
2. 分别搜「概念讲解」和「命令实操」两类视频。
3. 实际打开观看关键片段，不能只看标题和简介。
4. 逐题记录视频是否真的覆盖，写进 `coverage` / `must_know` / `gaps`。
5. 检查版本边界（RHEL 7/9/10、`network-scripts` 与 NetworkManager、CentOS Stream 与旧 CentOS）。
6. 未登录状态重新打开链接，确认不是仅自己可见、下架或需要特殊权限。
7. 填入 `verified_at`，并准备一条备用链接。

### 找不到合适视频时

按顺序降级，不要硬凑一条标题相近的长视频：

1. 换检索词：先搜「命令 + 参数名」（`find -mtime`），再搜「命令 + 场景」（查找 7 天前的文件）。
2. 换平台：B 站 → 抖音 / 小红书（短视频多，但链接稳定性差）→ YouTube（优先中文，如千锋、老男孩；英文也可接受）。
3. 换形态：改用中文图文（知乎、腾讯云开发者社区、菜鸟教程、博客园），`kind` 记为 `article`，`duration` 留空。
4. 仍然没有：把这条知识写进 `must_know`，在 `gaps` 里写明「无资料，靠文字补丁」，不要用无关视频充数。

验收标准：单条 3～15 分钟；小节主视频合计 ≤ 20 分钟；每小节 1 个主视频 + 最多 2 个补充；覆盖不到 70% 的必须标成「按需」或写进 `must_know`，不能冒充完整讲解。
超出 20 分钟的长视频（如 03-05 的 29:33）只能记为 `backup`，并在 `note` 里标出重点时间段。
3～15 分钟是**参考值**：若某小节确实没有更短的完整讲解，可放宽到 18 分钟以内，但必须在上表「缺口」列
写明超了多少、为什么保留（现有例外：06-04 17:00、07-01 15:26、07-07 16:37、10-02 17:25、
11-03 16:49、11-14 15:04、13-08 16:50、14-03/14-04 16:00）。

自动程序只能检查 URL 是否可访问；B 站视频下架时有时仍返回正常网页，所以「真正播放一次」仍是最终验收步骤。
