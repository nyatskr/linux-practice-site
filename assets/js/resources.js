/* resources.js — 视频学习小节与配套视频
 * 结构：window.LINUX_LEARNING = { videos, lessons }
 * 说明：
 *   1. 视频单独建 ID，一个小节可引用多条，一条视频也可被多个小节复用。
 *   2. 用 JS 全局变量而不是 JSON + fetch，保证双击 index.html 也能直接打开。
 *   3. status: candidate 候选待验收 / verified 已验收 / main 主视频 / backup 备用 / dead 失效待替换
 *   4. role:   main 主视频 / supplement 补充 / backup 按需（按需视频不计入小节总时长）
 *   5. 第一专题视频由人工在 2026-10-24 逐条打开确认：标题、分集与播放器正常。
 *      未登录时 B 站可能出现试看或登录提示，不属于链接失效。
 */
window.LINUX_LEARNING = {
  "schema_version": 1,
  "updated_at": "2026-10-26",
  "verified_at": "2026-10-24",
  "note": "十四专题全部补齐：01～14 共 159 个学习小节，覆盖题库全部 360 题，216 条配套资料（189 条视频 + 27 条图文）。第一专题 14 条已人工验收；第二～十四专题为机器检索候选，只保证链接可达、题号对得上，内容覆盖仍需人工逐条观看确认。",
  "videos": {
    "v-01-kernel-distro": {
      "platform": "bilibili",
      "title": "09-Linux 的内核版和发行版",
      "author": "黑马程序员",
      "url": "https://www.bilibili.com/video/av14184325/?p=9",
      "duration": "07:48",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "概念讲解，不绑定 RHEL 版本",
      "note": "分集 p9，标题与播放器已确认"
    },
    "v-01-distro-tree": {
      "platform": "bilibili",
      "title": "Linux 发行版家族树详解",
      "author": "必要时我会逐帧学习",
      "url": "https://www.bilibili.com/video/BV1Apep6xE5B/",
      "duration": "08:51",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "家族树含 Debian 系与 Red Hat 系；CentOS 部分按补丁说明看",
      "note": "单集视频，标题与播放器已确认"
    },
    "v-01-uname": {
      "platform": "bilibili",
      "title": "显示系统信息命令：uname",
      "author": "程序员良许",
      "url": "https://www.bilibili.com/video/BV12L411a7Ne/?p=71",
      "duration": "01:39",
      "role": "supplement",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "uname 各选项在 RHEL 9/10 一致",
      "note": "分集 p71，只演示 uname 常用选项"
    },
    "v-01-gnu-gpl": {
      "platform": "bilibili",
      "title": "了解开源文化：GNU 和 GPL",
      "author": "黑马程序员",
      "url": "https://www.bilibili.com/video/BV1r4411A7Qk/?p=7",
      "duration": "08:20",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "GPL 概念，不涉及内核 syscall exception",
      "note": "分集 p7，标题与播放器已确认"
    },
    "v-01-modprobe": {
      "platform": "bilibili",
      "title": "5 分钟的 Linux：lsmod、insmod、modprobe",
      "author": "卿瑜的技术日记",
      "url": "https://www.bilibili.com/video/BV1NryKYLEuZ/",
      "duration": "14:30",
      "role": "backup",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "模块命令通用，示例发行版不限",
      "note": "只在「加载模块是不是等于重新编译内核」有疑问时看"
    },
    "v-01-xwindow": {
      "platform": "bilibili",
      "title": "X Window 与桌面环境 KDE、GNOME 介绍",
      "author": "参见不良聪",
      "url": "https://www.bilibili.com/video/BV1fA411u7fb/?p=4",
      "duration": "09:32",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "以 X Window 为主，Wayland 只作提及",
      "note": "分集 p4，标题与播放器已确认"
    },
    "v-01-fhs": {
      "platform": "bilibili",
      "title": "FHS 规范及 Linux 目录结构",
      "author": "学习资料搬运工",
      "url": "https://www.bilibili.com/video/BV1Eq4y1e7so/?p=8",
      "duration": "09:57",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "FHS 3.0，目录名在 RHEL 9/10 一致",
      "note": "分集 p8，标题与播放器已确认"
    },
    "v-01-help-tools": {
      "platform": "bilibili",
      "title": "type、which、help、--help、man、apropos、whatis、alias",
      "author": "CodeGroker",
      "url": "https://www.bilibili.com/video/BV1av4y1s7Jn/",
      "duration": "17:15",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "Bash + GNU coreutils 通用",
      "note": "单集视频，一条覆盖帮助体系与命令解析，接近小节时长上限"
    },
    "v-01-script-exec": {
      "platform": "bilibili",
      "title": "8.1 可执行脚本",
      "author": "阿发你好",
      "url": "https://www.bilibili.com/video/BV1na4y1773c/?p=25",
      "duration": "05:27",
      "role": "backup",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "Ubuntu 环境，执行权限概念通用",
      "note": "只在「为什么当前目录脚本要写 ./runme」不清楚时看"
    },
    "v-01-path": {
      "platform": "bilibili",
      "title": "9.5 PATH 环境变量",
      "author": "阿发你好",
      "url": "https://www.bilibili.com/video/BV1na4y1773c/?p=33",
      "duration": "08:50",
      "role": "backup",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "Ubuntu 环境，PATH 机制通用",
      "note": "只在 PATH 查找顺序不清楚时看"
    },
    "v-01-env": {
      "platform": "bilibili",
      "title": "9.2 环境变量",
      "author": "阿发你好",
      "url": "https://www.bilibili.com/video/BV1na4y1773c/?p=30",
      "duration": "05:43",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "Bash 变量机制，与发行版无关",
      "note": "分集 p30，未对比「赋值 vs 导出」的失败场景"
    },
    "v-01-exit-status": {
      "platform": "bilibili",
      "title": "特殊符号变量：获取退出状态码和 Shell 进程 ID",
      "author": "黑马Java",
      "url": "https://www.bilibili.com/video/BV17T4y1F7WV/?p=11",
      "duration": "09:47",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "Bash 特殊变量，通用",
      "note": "分集 p11，覆盖 $? 与 $$，$0 与脚本参数需文字补充"
    },
    "v-01-preempt-rt": {
      "platform": "bilibili",
      "title": "Linux 6.12 PREEMPT_RT：实时操作系统的未来已来",
      "author": "OS视界",
      "url": "https://www.bilibili.com/video/BV1yJDgYqEEk/",
      "duration": "03:33",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "Linux 6.12 起 PREEMPT_RT 合入主线",
      "note": "新闻式介绍，分时/实时概念对比需配合题解"
    },
    "v-01-power": {
      "platform": "bilibili",
      "title": "shutdown、halt、poweroff、reboot",
      "author": "程序员良许",
      "url": "https://www.bilibili.com/video/BV12L411a7Ne/?p=150",
      "duration": "02:18",
      "role": "main",
      "status": "verified",
      "verified_at": "2026-10-24",
      "version_note": "systemd 环境下的关机命令",
      "note": "分集 p150，只对比命令，未讲 shutdown -c 与 systemctl 等价写法"
    },
    "v-02-create-del": {
      "platform": "bilibili",
      "title": "Linux 基础（12）：创建和删除目录或文件",
      "author": "佚名运维",
      "url": "https://www.bilibili.com/video/BV1SiaDeAE52/",
      "duration": "04:16",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用 GNU coreutils 行为",
      "note": "机器检索候选，尚未人工观看验收"
    },
    "v-02-mkdir": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - mkdir",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1mV4y1q79a/",
      "duration": "04:02",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "补充 mkdir -p 建多级目录"
    },
    "v-02-rm": {
      "platform": "bilibili",
      "title": "rm 删除文件、文件夹命令",
      "author": "一码界",
      "url": "https://www.bilibili.com/video/BV1r5411m7ez/",
      "duration": "02:24",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "补充 rm 与 rmdir 的差别"
    },
    "v-02-cp-mv": {
      "platform": "bilibili",
      "title": "Linux 常用命令：文件目录的复制、移动、删除",
      "author": "龙九吉",
      "url": "https://www.bilibili.com/video/BV15a411N7Ts/",
      "duration": "10:26",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "机器检索候选，cp -a 是否演示需验收时确认"
    },
    "v-02-cp": {
      "platform": "bilibili",
      "title": "Linux 如何复制文件？cp 命令演示",
      "author": "东方瑞通",
      "url": "https://www.bilibili.com/video/BV1uz411i7yS/",
      "duration": "04:53",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "补充 cp 的常用参数"
    },
    "v-02-df-du": {
      "platform": "bilibili",
      "title": "Linux 命令之 df 与 du",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1bndWBpEz5/",
      "duration": "06:20",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "机器检索候选，尚未人工观看验收"
    },
    "v-02-lsblk": {
      "platform": "bilibili",
      "title": "Linux 命令之 lsblk",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1z6dWBBEWo/",
      "duration": "05:19",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "补充块设备与分区关系，注意 lsblk 不给目录大小"
    },
    "v-02-ls": {
      "platform": "bilibili",
      "title": "linux 命令之 ls：就一个 l 参数还能有这么多内容",
      "author": "盈不足",
      "url": "https://www.bilibili.com/video/BV13r4y1G7H9/",
      "duration": "06:29",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "机器检索候选，尚未人工观看验收"
    },
    "v-02-filetype": {
      "platform": "bilibili",
      "title": "Linux 文件类型",
      "author": "运维开发工程师_Devops",
      "url": "https://www.bilibili.com/video/BV15i4y1r7tC/",
      "duration": "03:47",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用，覆盖七种文件类型",
      "note": "补充 ls -l 权限串首字符的含义"
    },
    "v-02-touch": {
      "platform": "bilibili",
      "title": "创建空文件 touch 与删除文件/文件夹 rm",
      "author": "奇妙の二进制",
      "url": "https://www.bilibili.com/video/BV1qe4y177xo/",
      "duration": "11:58",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "按需补充：只覆盖 touch 与 rm，atime/mtime/ctime 语义未讲，所以不计入小节时长"
    },
    "a-02-timestamps": {
      "kind": "article",
      "platform": "zhihu",
      "title": "Linux 中的时间戳：atime、ctime 和 mtime",
      "author": "知乎专栏",
      "url": "https://zhuanlan.zhihu.com/p/715642218",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用，示例是 CentOS 7 的 stat 输出",
      "note": "已核对正文：三者触发条件、只改权限时 ctime 变而 mtime 不变、ls -lc / ls -lu 查看时间；待你确认采用"
    },
    "v-02-timestamp": {
      "platform": "bilibili",
      "title": "0006-Linux指令 touch 创建空文件和修改时间戳",
      "author": "阿东_A-Dong",
      "url": "https://www.bilibili.com/video/BV1uk4y1t7Mc/",
      "duration": "10:15",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "简介明确写「访问时间和修改时间」，据此推测覆盖 atime/mtime 的查看与修改；ctime 与稀疏文件未讲，待验收"
    },
    "a-02-sparse": {
      "kind": "article",
      "platform": "tencent",
      "title": "Linux 查看文件大小：ls 和 du 为何结果不同",
      "author": "腾讯云开发者社区",
      "url": "https://cloud.tencent.com/developer/news/2622367",
      "duration": null,
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "已核对正文：逻辑大小 vs 物理占用、稀疏文件造洞、lsof 查「已删除但被占用」"
    },
    "v-02-glob": {
      "platform": "bilibili",
      "title": "Shell 其实很简单（20）glob 模式的通配符",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1FT42117R2/",
      "duration": "04:17",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash glob，通用",
      "note": "机器检索候选，尚未人工观看验收"
    },
    "v-02-glob2": {
      "platform": "bilibili",
      "title": "【Linux 视频教程】#14 通配符详解",
      "author": "杜远超官方频道",
      "url": "https://www.bilibili.com/video/BV1FK4y1m7KJ/",
      "duration": "13:50",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "补充 ? [] {} 等通配符写法"
    },
    "v-02-link": {
      "platform": "bilibili",
      "title": "linux 中的硬链接和软连接",
      "author": "刘贝斯",
      "url": "https://www.bilibili.com/video/BV1zK4y1R7jr/",
      "duration": "13:00",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用 ext4/xfs 行为一致",
      "note": "机器检索候选；readlink 与相对软链接解析需验收时确认"
    },
    "v-02-ln": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - ln",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1G14y1i7WZ/",
      "duration": "11:31",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "ln 与 ln -s 语法演示，按需看"
    },
    "v-02-ln5": {
      "platform": "bilibili",
      "title": "5 分钟的 Linux - ln 命令",
      "author": "卿瑜的技术日记",
      "url": "https://www.bilibili.com/video/BV1SN1uY8EMJ/",
      "duration": "08:26",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "较短的 ln 演示，作为备用"
    },
    "v-02-tar": {
      "platform": "bilibili",
      "title": "10 分钟学会 gzip 和 tar 命令",
      "author": "colin3dmax",
      "url": "https://www.bilibili.com/video/BV1dQ4y1R7Lg/",
      "duration": "12:53",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU tar 1.30+，RHEL 9/10 一致",
      "note": "机器检索候选；-t 与 -C 是否演示需验收时确认"
    },
    "v-02-tar-basic": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - tar",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1xz4y1x7gk/",
      "duration": "03:13",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "补充 czf/xzf 的最短写法"
    },
    "v-02-tar-C": {
      "platform": "bilibili",
      "title": "Linux tar 命令：解压到指定目录且不保留顶层目录",
      "author": "深思千年",
      "url": "https://www.bilibili.com/video/BV1oh411g73G/",
      "duration": "10:04",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU tar",
      "note": "只在 -C 与 --strip-components 不清楚时看"
    },

    "v-03-trinity": {
      "platform": "bilibili",
      "title": "Linux 命令之三剑客",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1yxEz6YEHp/",
      "duration": "07:41",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用，示例不绑定发行版",
      "note": "grep 找行 / sed 改行 / awk 取列的分工，7 分钟讲清总览"
    },
    "v-03-grep-basic": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - grep",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1Bu411G7H3/",
      "duration": "06:31",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU grep 3.x，RHEL 9/10 一致",
      "note": "短视频，适合先建立 -i/-n/-v/-c 的直觉"
    },
    "v-03-grep-detail": {
      "platform": "bilibili",
      "title": "第 25 课：grep 命令详解",
      "author": "SecHub 网络安全社区",
      "url": "https://www.bilibili.com/video/BV16m411o7zE/",
      "duration": "14:44",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "14:44，与主视频叠加会超单节 20 分钟，作按需补充"
    },
    "v-03-regex": {
      "platform": "bilibili",
      "title": "regex 正则表达：sed grep awk 强大的真正原因",
      "author": "unixchad",
      "url": "https://www.bilibili.com/video/BV125K7ztERk/",
      "duration": "18:32",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "讲 BRE/ERE 通用规则，与发行版无关",
      "note": "自带章节：04:26 字符匹配、06:01 字符集、09:00 逻辑或、13:51 数量控制"
    },
    "v-03-find-basic": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - find",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1nh4y1r7Zq/",
      "duration": "06:27",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU findutils 4.8+",
      "note": "-name 与 -type 的基础演示"
    },
    "v-03-find-cond": {
      "platform": "bilibili",
      "title": "10 分钟学会在 Linux 里用命令搜索文件和查找文件内容",
      "author": "colin3dmax",
      "url": "https://www.bilibili.com/video/BV1fA411G7Xy/",
      "duration": "13:47",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "对应本站原课程 idev365「定位文件」一节",
      "note": "本站题源同一套课程；需验收是否讲到 -mtime 与 -size 段落"
    },
    "v-03-find-deep": {
      "platform": "bilibili",
      "title": "一天一个命令玩法：find 命令由简到深",
      "author": "Linux 阿泽",
      "url": "https://www.bilibili.com/video/BV1mKbHzfEnS/",
      "duration": "29:33",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU findutils",
      "note": "29:33 超单节上限，作备用；时间与大小谓词最全的一条"
    },
    "a-03-find-time": {
      "kind": "article",
      "platform": "web",
      "title": "Linux find 命令（-mtime 与 -size 用法）",
      "author": "菜鸟教程",
      "url": "https://www.runoob.com/linux/linux-comm-find.html",
      "duration": null,
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用，示例含 -mtime +7 与 -size +1M",
      "note": "图文补充 -mtime 的 +n/-n 与 -size 单位表；取整细节见 must_know"
    },
    "v-03-sed": {
      "platform": "bilibili",
      "title": "sed 打印与替换：-n / s / g 参数用法，不加 -i 不改原文件",
      "author": "虎丘客",
      "url": "https://www.bilibili.com/video/BV1XU8a69EmG/",
      "duration": "05:23",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU sed 4.x",
      "note": "正好覆盖本节两题：-n '2,5p' 与 s///g"
    },
    "v-03-sed-daily": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - sed",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1Zz4y1s7r5/",
      "duration": "15:19",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU sed",
      "note": "更全但更长，与主视频叠加超 20 分钟，作按需"
    },
    "v-03-awk": {
      "platform": "bilibili",
      "title": "10 分钟掌握 Linux 三剑客 awk：按列处理日志的核心工具",
      "author": "释怀爱编程",
      "url": "https://www.bilibili.com/video/BV1V7NMzrET6/",
      "duration": "13:26",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "gawk 5.x，RHEL 9/10 一致",
      "note": "-F 指定分隔符、$1/$3 取列、NR/NF"
    },
    "v-03-awk-intro": {
      "platform": "bilibili",
      "title": "10 分钟入门 awk 命令",
      "author": "卿瑜的技术日记",
      "url": "https://www.bilibili.com/video/BV1de411D7xQ/",
      "duration": "15:20",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "gawk",
      "note": "按需补充，重点看 NR/NF 与 print 逗号输出"
    },
    "a-03-join": {
      "kind": "article",
      "platform": "web",
      "title": "Linux join 命令（按相同栏位合并两个文件）",
      "author": "菜鸟教程",
      "url": "https://www.runoob.com/linux/linux-comm-join.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU coreutils join",
      "note": "中文图文；B 站没有合适的 join 短视频，本节以图文为主资料"
    },
    "v-03-sort": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - sort",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV13w411D7Vb/",
      "duration": "08:30",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU coreutils",
      "note": "-n 数值排序与 -r 逆序"
    },
    "v-03-cut": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - cut",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1zu411A7JX/",
      "duration": "08:00",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU coreutils",
      "note": "-d 分隔符 + -f 字段号，与 awk 的 -F 对照看"
    },
    "v-03-uniq": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - uniq",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1ZG41197nf/",
      "duration": "06:16",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "GNU coreutils",
      "note": "按需看 -c；重点记住 uniq 只处理相邻重复行"
    },
    "v-03-vim-basic": {
      "platform": "bilibili",
      "title": "【不能错过的 VIM 命令】（1）输入、保存",
      "author": "技术杂货铺_",
      "url": "https://www.bilibili.com/video/BV1GN411B7bu/",
      "duration": "03:42",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Vim 8/9 通用，与 vi 兼容模式一致",
      "note": "i/o/a 进插入模式、:wq 保存退出"
    },
    "v-03-vim-cmd": {
      "platform": "bilibili",
      "title": "vim 编辑器配置和基本命令",
      "author": "极速蜗牛-2020",
      "url": "https://www.bilibili.com/video/BV12q4y167PB/",
      "duration": "14:28",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Vim 8+",
      "note": "普通模式移动、删除、撤销的完整演示"
    },
    "v-03-vim-sub": {
      "platform": "bilibili",
      "title": "vim 实用技巧 4：搜索与替换深度揭秘",
      "author": "任性的大头熊",
      "url": "https://www.bilibili.com/video/BV1mt4y1175F/",
      "duration": "10:19",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Vim 8+",
      "note": "只在 :%s/// 的范围与 g 标志不清楚时看"
    },

    "v-04-quote": {
      "platform": "bilibili",
      "title": "[5 分钟学 linux] 38-自定义变量的 3 种赋值方法及单引号、双引号、无引号的区别",
      "author": "搞定 linux",
      "url": "https://www.bilibili.com/video/BV1Ru411C7UN/",
      "duration": "15:52",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash 4+，RHEL 9/10 一致",
      "note": "单引号 / 双引号 / 不加引号三种写法的差别，配变量赋值"
    },
    "v-04-brace": {
      "platform": "bilibili",
      "title": "shell 花括号扩展如何快速生成自定义列表？",
      "author": "bitmyth",
      "url": "https://www.bilibili.com/video/BV1qv411b7EW/",
      "duration": "01:32",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash brace expansion",
      "note": "只有 1 分半，正好补 {1..100} 这一处；不足 3 分钟，只作补充"
    },
    "v-04-args": {
      "platform": "bilibili",
      "title": "10.4.3 Shell 基础-Bash 变量-位置参数变量",
      "author": "镜向洋洋",
      "url": "https://www.bilibili.com/video/BV1uG411w7tM/",
      "duration": "19:51",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "19:51 已接近单节 20 分钟上限，本节不再叠补充视频"
    },
    "v-04-ops": {
      "platform": "bilibili",
      "title": "Linux 08-shell 编程之运算符",
      "author": "乐字节-木糖",
      "url": "https://www.bilibili.com/video/BV1Eq4y1z7u8/?p=8",
      "duration": "05:46",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash 算术展开 $(( ))",
      "note": "分集 p8，讲 $(( )) 与 expr 两种算术写法"
    },
    "v-04-backtick": {
      "platform": "bilibili",
      "title": "精通 bash 系列-看清反引号和单引号",
      "author": "azSysEng",
      "url": "https://www.bilibili.com/video/BV1ck4y1w7Jf/",
      "duration": "04:19",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash 命令替换",
      "note": "反引号与 $() 的等价关系，以及和单引号的区别"
    },
    "v-04-if": {
      "platform": "bilibili",
      "title": "linux shell 脚本 if 条件判断语句简单用法讲解",
      "author": "楓城浪子",
      "url": "https://www.bilibili.com/video/BV1GB4y1X7cL/",
      "duration": "06:55",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash test / [ ]",
      "note": "if 与 [ ] 的写法，含数值比较"
    },
    "v-04-if2": {
      "platform": "bilibili",
      "title": "Linux 11-shell 编程之分支逻辑语句 if case",
      "author": "乐字节-木糖",
      "url": "https://www.bilibili.com/video/BV1Eq4y1z7u8/?p=11",
      "duration": "02:49",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "分集 p11，补 if 的多分支写法"
    },
    "v-04-exec": {
      "platform": "bilibili",
      "title": "144 如何执行 Shell 脚本程序",
      "author": "懶之勇者",
      "url": "https://www.bilibili.com/video/BV1fQ4y1p7dR/",
      "duration": "13:16",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "chmod +x 后 ./script.sh、bash script.sh、source 三种方式的差别"
    },
    "v-04-exitcode": {
      "platform": "bilibili",
      "title": "Shell 其实很简单（15）命令的退出状态码",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV15Z421e79c/",
      "duration": "02:35",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "&& 与 || 的判据就是退出状态，2 分半讲清"
    },
    "v-04-read": {
      "platform": "bilibili",
      "title": "跟着菜鸟学 Shell - 23. while 和 until 循环",
      "author": "龙言飞语",
      "url": "https://www.bilibili.com/video/BV1zF411L7Yz/",
      "duration": "11:03",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "while read 逐行读文件的标准例子；IFS= 与 -r 靠图文补"
    },
    "a-04-read": {
      "kind": "article",
      "platform": "web",
      "title": "Linux 系统中怎么从文件中逐行读取内容并放入循环处理",
      "author": "PHP 中文网",
      "url": "https://www.php.cn/faq/3215057.html",
      "duration": null,
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash 4+",
      "note": "明确列出三个条件：IFS= 紧挨 read、加 -r、用输入重定向避免子 shell"
    },
    "a-04-debug": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "bash -n -x -v -xv 语法检查 进行调试",
      "author": "悟透（博客园）",
      "url": "https://www.cnblogs.com/wutou/p/18085281",
      "duration": null,
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash 4+",
      "note": "-n 只查语法不执行、-x 打印执行跟踪（前缀 +）、-v 输出源码"
    },
    "v-04-redirect": {
      "platform": "bilibili",
      "title": "Shell 其实很简单（11）深入理解 Shell 中的重定向",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1Hm411m7kP/",
      "duration": "08:06",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "从文件描述符讲起，最适合讲清 > 与 2>&1 的先后顺序"
    },
    "v-04-redirect2": {
      "platform": "bilibili",
      "title": "Linux nohup 命令及标准错误重定向语法 2>&1 详解",
      "author": "学亮编程手记",
      "url": "https://www.bilibili.com/video/BV1hC32zfEDG/",
      "duration": "06:23",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "专门讲 2>&1 的位置差异，配合主视频看"
    },
    "v-04-pipe": {
      "platform": "bilibili",
      "title": "Shell 其实很简单（10）深入理解 Shell 中的管道",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV17p421X7Dx/",
      "duration": "04:46",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "管道只接标准输出，标准错误仍走终端"
    },
    "v-04-sigpipe": {
      "platform": "bilibili",
      "title": "【Linux 机制精讲 09】yes | head 之后，退出码为什么是 141？",
      "author": "小电讲电路",
      "url": "https://www.bilibili.com/video/BV13Hn26TEeX/",
      "duration": "06:07",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash / Linux 通用",
      "note": "从管道退出码 141 讲到 SIGPIPE，理解管道状态取谁的值"
    },
    "v-04-jobs": {
      "platform": "bilibili",
      "title": "Linux 教程之进程的后台运行（&、bg、fg、jobs、nohup）",
      "author": "西柚云超算",
      "url": "https://www.bilibili.com/video/BV1tM411C7ke/",
      "duration": "10:26",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash 作业控制",
      "note": "一条视频覆盖 &、jobs、fg、bg、nohup 五个考点"
    },
    "v-04-jobs2": {
      "platform": "bilibili",
      "title": "Linux 命令精讲之 & / jobs / fg / bg / nohup / disown",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1jg3n6jE7d/",
      "duration": "03:10",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Bash",
      "note": "3 分钟速览版，适合考前过一遍"
    },

    "v-05-account-db": {
      "platform": "bilibili",
      "title": "4 Linux 用户管理之查看用户信息",
      "author": "哈七搭八的小猴子",
      "url": "https://www.bilibili.com/video/BV1e64y1778P/",
      "duration": "04:26",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RHEL 9/10 与通用发行版一致",
      "note": "passwd / shadow / group 三个文件与字段含义"
    },
    "v-05-user-mgmt": {
      "platform": "bilibili",
      "title": "【小白的 Linux 教程】- Linux 用户管理",
      "author": "小竹熊",
      "url": "https://www.bilibili.com/video/BV1EqSqB4Eid/",
      "duration": "14:42",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "整体串讲账户体系，配合查看用户信息那条"
    },
    "v-05-useradd": {
      "platform": "bilibili",
      "title": "1 Linux 用户管理之添加用户",
      "author": "哈七搭八的小猴子",
      "url": "https://www.bilibili.com/video/BV1kw411H73s/",
      "duration": "10:08",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "useradd / login.defs",
      "note": "-u -d -m -s -G 各选项与 /etc/skel 模板"
    },
    "v-05-useradd2": {
      "platform": "bilibili",
      "title": "Linux 命令 useradd 创建用户，passwd 修改密码",
      "author": "热爱 IT 行业",
      "url": "https://www.bilibili.com/video/BV1uJ2GYrEqJ/",
      "duration": "06:49",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "实操演示，建用户后立刻设密码"
    },
    "v-05-userdel": {
      "platform": "bilibili",
      "title": "3 Linux 用户管理之用户删除",
      "author": "哈七搭八的小猴子",
      "url": "https://www.bilibili.com/video/BV1PN4y12787/",
      "duration": "10:13",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "userdel",
      "note": "userdel 与 userdel -r 的差别，以及删不干净的部分"
    },
    "v-05-userdel2": {
      "platform": "bilibili",
      "title": "Linux 系统管理：删除用户与用户组",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1M1421y7i1/",
      "duration": "02:01",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "2 分钟速览 userdel / groupdel"
    },
    "v-05-groups": {
      "platform": "bilibili",
      "title": "3-3 Linux 用户及用户组创建和管理",
      "author": "极速蜗牛-2020",
      "url": "https://www.bilibili.com/video/BV1tZ4y1e7qa/",
      "duration": "09:18",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "主组与附加组的关系，组管理命令"
    },
    "v-05-usermod": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - usermod",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV1o94y1B75P/",
      "duration": "05:07",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "-g 与 -G 的区别，-a 追加的用法"
    },
    "v-05-passwd": {
      "platform": "bilibili",
      "title": "Linux 命令之 passwd",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1WNdaBvEkH/",
      "duration": "06:48",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "passwd、-l/-u/-d/-e 各开关"
    },
    "v-05-passwd2": {
      "platform": "bilibili",
      "title": "Linux 系统管理：修改用户密码",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1Sw4m1v7iq/",
      "duration": "04:48",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "root 重置他人密码的场景"
    },
    "v-05-chage": {
      "platform": "bilibili",
      "title": "12 Linux 用户管理之通过 chage 命令修改密码信息",
      "author": "哈七搭八的小猴子",
      "url": "https://www.bilibili.com/video/BV1m64y1V7FE/",
      "duration": "11:34",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "shadow 老化字段",
      "note": "-m -M -W -I -E -d 六个选项一次讲全"
    },
    "v-05-su-sudo": {
      "platform": "bilibili",
      "title": "Linux 学习之路 47_用户管理_su 与 sudo",
      "author": "大飞 1024",
      "url": "https://www.bilibili.com/video/BV1k3411J7cv/",
      "duration": "11:31",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "su 与 su - 的环境差异，sudo 的授权思路"
    },
    "v-05-su": {
      "platform": "bilibili",
      "title": "Linux 系统管理：su 切换用户",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1QT421v7tr/",
      "duration": "02:38",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "su 与 su - 的对比演示"
    },
    "v-05-sudoers": {
      "platform": "bilibili",
      "title": "sudoers 文件配置",
      "author": "DayDayUp 每天向上",
      "url": "https://www.bilibili.com/video/BV1hP41137Ri/",
      "duration": "05:40",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "sudo 1.9+，RHEL 9/10 一致",
      "note": "visudo 编辑、%wheel 授权行、语法检查"
    },
    "v-05-sudo-why": {
      "platform": "bilibili",
      "title": "为什么 sudo 命令不能执行？",
      "author": "MR 大麦",
      "url": "https://www.bilibili.com/video/BV1nb4y1W7uF/",
      "duration": "06:37",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "常见 sudo 报错与 sudoers 的关系"
    },

    "v-06-who": {
      "platform": "bilibili",
      "title": "[5 分钟学 linux] 10-详解文件的所有者、所属组、其他人",
      "author": "搞定 linux",
      "url": "https://www.bilibili.com/video/BV1FY4y1B7DR/",
      "duration": "06:07",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "三类主体与 ls -l 权限串的分组"
    },
    "v-06-perm-str": {
      "platform": "bilibili",
      "title": "Linux 文件权限与 chmod：754 到底是什么意思？",
      "author": "Melon-妈妈",
      "url": "https://www.bilibili.com/video/BV1pbHA6iEY1/",
      "duration": "04:25",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "用一个具体数字串讲权限位"
    },
    "v-06-chmod": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - chmod",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV19h4y1k7dg/",
      "duration": "09:23",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "数字法与符号法两种写法都演示"
    },
    "v-06-octal": {
      "platform": "bilibili",
      "title": "Linux 系统管理：文件权限与八进制数",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1az421b7ub/",
      "duration": "02:11",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "2 分钟把 4/2/1 的加法讲透"
    },
    "v-06-chown": {
      "platform": "bilibili",
      "title": "每天一个 Linux 命令 - chown",
      "author": "Ternurafl",
      "url": "https://www.bilibili.com/video/BV19j411i7AM/",
      "duration": "03:04",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "chown 与 chgrp 的基本用法"
    },
    "v-06-chown2": {
      "platform": "bilibili",
      "title": "65-Linux 用户管理-chown 修改属主属组",
      "author": "旭哥讲运维",
      "url": "https://www.bilibili.com/video/BV1LFtM6WE97/",
      "duration": "07:00",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "属主:属组 写法与 -R 递归"
    },
    "v-06-ten": {
      "platform": "bilibili",
      "title": "Linux 权限，十位 -rwx 详解",
      "author": "A2J 实战训练营",
      "url": "https://www.bilibili.com/video/BV1MV4y1T771/",
      "duration": "17:00",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "逐位拆解十个字符，含目录与文件的语义差别"
    },
    "a-06-dir-perm": {
      "kind": "article",
      "platform": "web",
      "title": "一章让你明白什么是权限（文件与目录的 rwx 差异）",
      "author": "阿里云开发者社区",
      "url": "https://developer.aliyun.com/article/1267820",
      "duration": null,
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "目录 r/w/x 三行对照表，含 umask 与 SUID/SGID/sticky 简表"
    },
    "v-06-umask": {
      "platform": "bilibili",
      "title": "Linux 中的默认权限 - umask",
      "author": "刘贝斯",
      "url": "https://www.bilibili.com/video/BV18Q4y197WP/",
      "duration": "08:46",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "666/777 基准与按位去掉的算法"
    },
    "v-06-umask2": {
      "platform": "bilibili",
      "title": "Linux 系统管理：umask 权限掩码",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1D4421D7Zx/",
      "duration": "02:06",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "2 分钟速览 umask 的作用范围"
    },
    "v-06-acl": {
      "platform": "bilibili",
      "title": "9 Linux 权限管理之普通文件 ACL 权限设置",
      "author": "哈七搭八的小猴子",
      "url": "https://www.bilibili.com/video/BV13i421f7GV/",
      "duration": "12:50",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "POSIX ACL",
      "note": "getfacl / setfacl -m -x -b 与 mask 的完整演示"
    },
    "v-06-acl2": {
      "platform": "bilibili",
      "title": "Linux 权限管理六大核心命令：chmod、chown、sudo、setfacl",
      "author": "星空网络安全",
      "url": "https://www.bilibili.com/video/BV1k3g16ZEsW/",
      "duration": "03:23",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "3 分钟横向对比六个权限命令的分工"
    },
    "a-06-default-acl": {
      "kind": "article",
      "platform": "web",
      "title": "怎么通过 setfacl -d 设置目录的默认 ACL 继承模板",
      "author": "PHP 中文网",
      "url": "https://www.php.cn/faq/3240339.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "POSIX ACL",
      "note": "默认 ACL 只对目录、只影响新建对象；含 -k 与 -b 的区别"
    },
    "a-06-setfacl": {
      "kind": "article",
      "platform": "web",
      "title": "setfacl 命令详解（-m / -x / -b / -k / -d / -R）",
      "author": "舒克贝塔",
      "url": "https://sukbeta.github.io/setfacl-command/",
      "duration": null,
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "POSIX ACL",
      "note": "选项逐个对照，-b 清全部、-k 只清默认"
    },
    "v-06-suid": {
      "platform": "bilibili",
      "title": "特殊文件权限之 SUID",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1rx4y1b7tv/",
      "duration": "03:26",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "用 passwd 讲 euid 提权，3 分钟抓住要点"
    },
    "v-06-special": {
      "platform": "bilibili",
      "title": "Linux：演示 SUID SGID SBIT 用法和效果",
      "author": "_江浸月 ya_",
      "url": "https://www.bilibili.com/video/BV1xk4y1p7LK/",
      "duration": "03:31",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "sticky bit 的实测演示，本节主视频"
    },
    "v-06-special-perm": {
      "platform": "bilibili",
      "title": "17-【理解】Linux 的特殊权限_粘滞位 t",
      "author": "无止之境丨",
      "url": "https://www.bilibili.com/video/BV1gsp7zzE3D/",
      "duration": "08:16",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "从特殊权限整体讲到目录 SGID 的组继承"
    },
    "v-06-sgid": {
      "platform": "bilibili",
      "title": "特殊文件权限之 SGID",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1aZ421u7XN/",
      "duration": "01:36",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "1 分半只讲 SGID 的组继承，短但精准"
    },

    "v-07-proc-state": {
      "platform": "bilibili",
      "title": "136-linux 进程创建-状态查询-僵尸-孤儿-D 状态进程详解",
      "author": "发哥的云计算课堂",
      "url": "https://www.bilibili.com/video/BV1GPn6zvE5z/",
      "duration": "15:26",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用内核行为，不绑定发行版",
      "note": "Z 僵尸、D 不可中断、孤儿进程一次讲全"
    },
    "v-07-ps": {
      "platform": "bilibili",
      "title": "5 分钟学会 Linux 的 ps 命令",
      "author": "卿瑜的技术日记",
      "url": "https://www.bilibili.com/video/BV1dN4y1r7y5/",
      "duration": "12:15",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "procps-ng",
      "note": "ps -ef 与自定义 -o 列"
    },
    "v-07-top": {
      "platform": "bilibili",
      "title": "5 分钟学会 Linux 的 top 命令",
      "author": "卿瑜的技术日记",
      "url": "https://www.bilibili.com/video/BV17u4y1J7Ec/",
      "duration": "07:27",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "procps-ng",
      "note": "负载、CPU、内存三块区域怎么读"
    },
    "v-07-kill": {
      "platform": "bilibili",
      "title": "89-Linux 进程管理-kill、pkill、killall 杀死进程",
      "author": "旭哥讲运维",
      "url": "https://www.bilibili.com/video/BV1bpYp6aETv/",
      "duration": "13:33",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "信号编号、TERM 与 KILL 的差别"
    },
    "v-07-systemctl": {
      "platform": "bilibili",
      "title": "Linux 学习之路 23_服务管理_systemctl 命令",
      "author": "大飞 1024",
      "url": "https://www.bilibili.com/video/BV1Aa411B7AZ/",
      "duration": "10:41",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "systemd 239+，RHEL 9/10 一致",
      "note": "start/stop/enable/disable/status 全套"
    },
    "v-07-target": {
      "platform": "bilibili",
      "title": "管理 service 的 unit——systemd 的 target",
      "author": "奇妙の二进制",
      "url": "https://www.bilibili.com/video/BV19i4y1k7Ty/",
      "duration": "09:11",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "systemd",
      "note": "target 与旧运行级别的对应关系"
    },
    "v-07-unit": {
      "platform": "bilibili",
      "title": "示例如何创建一个开机启动的 systemd 服务",
      "author": "例呢科思",
      "url": "https://www.bilibili.com/video/BV1hV41167Mc/",
      "duration": "02:29",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "systemd",
      "note": "写 unit 文件到 daemon-reload 的最短闭环"
    },
    "v-07-journalctl": {
      "platform": "bilibili",
      "title": "Linux 学习之路 42_Linux 系统日志_journalctl 命令",
      "author": "大飞 1024",
      "url": "https://www.bilibili.com/video/BV12P4y1u76e/",
      "duration": "11:13",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "systemd-journald",
      "note": "-u 按单元、-b 按启动、-f 跟随"
    },
    "v-07-cron": {
      "platform": "bilibili",
      "title": "Linux 定时任务 crontab 详解",
      "author": "LeisureLinux",
      "url": "https://www.bilibili.com/video/BV1Tv411G7dn/",
      "duration": "16:37",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "cronie",
      "note": "五字段含义与常用写法，含 /etc/crontab 对照"
    },
    "v-07-cron-basic": {
      "platform": "bilibili",
      "title": "5 分钟的 Linux-crontab 定时任务",
      "author": "卿瑜的技术日记",
      "url": "https://www.bilibili.com/video/BV1BLzrYHE6C/",
      "duration": "12:13",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "cronie",
      "note": "从写第一条任务讲起，适合先建立直觉"
    },
    "v-07-cron-run": {
      "platform": "bilibili",
      "title": "实战 Linux 下定时任务 crontab 的配置",
      "author": "玩转私有云",
      "url": "https://www.bilibili.com/video/BV1zwcizDE31/",
      "duration": "05:01",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "cronie",
      "note": "实操配置，含日志查看"
    },
    "v-07-timer": {
      "platform": "bilibili",
      "title": "Linux systemd 定时任务（Timer）脚本案例",
      "author": "学亮编程手记",
      "url": "https://www.bilibili.com/video/BV1CcZ9BeEbL/",
      "duration": "08:26",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "systemd timer",
      "note": ".timer + .service 配对、OnCalendar 写法"
    },
    "v-07-chrony": {
      "platform": "bilibili",
      "title": "Linux 基础软件-时间同步 chrony",
      "author": "运维小路",
      "url": "https://www.bilibili.com/video/BV17gWSeXEZE/",
      "duration": "07:34",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "chrony 4.x，RHEL 9/10 默认",
      "note": "chronyd 与 chronyc 的分工"
    },
    "v-07-chrony2": {
      "platform": "bilibili",
      "title": "一分钟学会：部署 chrony 时间同步服务器",
      "author": "林哥讲运维",
      "url": "https://www.bilibili.com/video/BV1PZkeYnEn5/",
      "duration": "07:08",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "chrony",
      "note": "服务端配置视角，补 chronyc sources 的输出"
    },
    "v-08-dnf-install": {
      "platform": "bilibili",
      "title": "linux懒人运维：rocky linux8.9介绍-yum与dnf命令",
      "author": "Linux懒人运维",
      "url": "https://www.bilibili.com/video/BV1Kw41177e5/",
      "duration": "12:26",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "dnf（RHEL 8/9 通用）",
      "note": "标题为 yum 与 dnf 命令串讲，具体覆盖到哪些子命令待观看确认"
    },
    "v-08-yum-dnf": {
      "platform": "bilibili",
      "title": "Linux命令精讲之yum/dnf（RHEL系包管理）",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1WGgs6qESc/",
      "duration": "03:04",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "yum 与 dnf 的关系",
      "note": "两者关系与 Module 差异，命令语法基本一致"
    },
    "v-08-rpm-install": {
      "platform": "bilibili",
      "title": "Linux命令之RPM软件包安装教程",
      "author": "码农小芝士",
      "url": "https://www.bilibili.com/video/BV1Q44y1v7jR/",
      "duration": "09:08",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "rpm 通用",
      "note": "rpm -ivh 装本地包的完整过程"
    },
    "v-08-pkg-mgr": {
      "platform": "bilibili",
      "title": "yum与dnf包管理器",
      "author": "技术阿圆",
      "url": "https://www.bilibili.com/video/BV1VyNX6QEy6/",
      "duration": "02:51",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RPM 系包管理器",
      "note": "RPM 底层 + dnf 上层的关系，两分半讲清"
    },
    "v-08-rpm-query": {
      "platform": "bilibili",
      "title": "笨办法学Linux | rpm的查询、升级与卸载命令",
      "author": "陈涛谈云计算",
      "url": "https://www.bilibili.com/video/BV1Za4y1a7DK/",
      "duration": "09:34",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "rpm 通用",
      "note": "标题含查询、升级、卸载三块，是否逐条演示待观看确认"
    },
    "v-08-httpd": {
      "platform": "bilibili",
      "title": "Linux--httpd服务器搭建",
      "author": "zhuofai",
      "url": "https://www.bilibili.com/video/BV1zu411z74u/",
      "duration": "13:40",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RHEL/CentOS 系 httpd",
      "note": "标题为 httpd 服务器搭建；是否含防火墙放行与客户端验证待确认"
    },
    "v-08-repo": {
      "platform": "bilibili",
      "title": "红帽配置dnf仓库下载软件包",
      "author": "linux郑先生",
      "url": "https://www.bilibili.com/video/BV1Us4y1C7Z6/",
      "duration": "05:58",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "dnf + .repo",
      "note": "标题为红帽配置 dnf 仓库；是否讲到 repodata 层级待确认"
    },
    "v-08-repo-local": {
      "platform": "bilibili",
      "title": "Redhat(红帽)下Linux怎么配置建议Yum仓库(简易版)",
      "author": "AAA张陆仁",
      "url": "https://www.bilibili.com/video/BV1E35PzaEox/",
      "duration": "05:46",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "yum + .repo",
      "note": "file:/// 本地源写法，注意三斜杠"
    },
    "v-08-flatpak-use": {
      "platform": "bilibili",
      "title": "FlatHub 跨平台超级软件仓库 在 Ubuntu 24.04 上的使用",
      "author": "Reaper_6",
      "url": "https://www.bilibili.com/video/BV1b7QaYGEQb/",
      "duration": "04:53",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Flatpak 1.x",
      "note": "标题为 FlatHub 在 Ubuntu 24.04 上的使用；命令覆盖待观看确认"
    },
    "v-08-flatpak-install": {
      "platform": "bilibili",
      "title": "【ubuntu22.04】flatpak安装软件方法总结",
      "author": "软魅知",
      "url": "https://www.bilibili.com/video/BV1br4y177sT/",
      "duration": "02:21",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Flatpak 1.x",
      "note": "搜索 → 安装的最短路径"
    },
    "v-08-flatpak-why": {
      "platform": "bilibili",
      "title": "为什么要用 Flatpak",
      "author": "小明正义化身",
      "url": "https://www.bilibili.com/video/BV1BfGy69EbP/",
      "duration": "12:23",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Flatpak 概念",
      "note": "应用与 runtime 分层、沙箱思路"
    },
    "a-08-dnf-cmd": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "Linux命令之dnf",
      "author": "苦逼运维",
      "url": "https://www.cnblogs.com/diantong/p/18432287",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "dnf（RHEL 8/9）",
      "note": "机器读正文（待人工复核）：写明「dnf update 被重定向到 dnf upgrade」，并列出 clean / remove / provides / upgrade"
    },
    "a-08-dnf-usage": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "dnf命令常见用法",
      "author": "zhangyukun",
      "url": "https://www.cnblogs.com/cxygg/p/18584741",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "dnf（Rocky 9 实测）",
      "note": "机器读正文（待人工复核）：有 .repo 段落字段（baseurl / enabled / gpgcheck / gpgkey）与 --enablerepo/--disablerepo 说明，附 repolist 实测输出"
    },
    "a-08-rpm-query": {
      "kind": "article",
      "platform": "tencent",
      "title": "Linux命令行：rpm 命令参数使用详解",
      "author": "腾讯云开发者社区",
      "url": "https://cloud.tencent.com/developer/article/1473085",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "rpm 通用（例子偏老，命令语义不变）",
      "note": "机器读正文（待人工复核）：-qpl / -qf / -ql / -Va 都有实例；例子偏 Fedora Core 4，命令语义不变"
    },
    "v-09-lsblk": {
      "platform": "bilibili",
      "title": "Linux命令之lsblk",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1z6dWBBEWo/",
      "duration": "05:19",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "util-linux（RHEL 7/9 通用）",
      "note": "据标题推测覆盖树状层级与 -f，待验收"
    },
    "v-09-lsblk-blkid": {
      "platform": "bilibili",
      "title": "Linux命令精讲之lsblk/blkid（磁盘结构）",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1A7MG6fEJ5/",
      "duration": "02:18",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "util-linux",
      "note": "据标题推测为两命令分工，待验收"
    },
    "v-09-fdisk": {
      "platform": "bilibili",
      "title": "Linux fdisk命令 – 管理磁盘分区",
      "author": "学亮编程手记",
      "url": "https://www.bilibili.com/video/BV1PabXzVEuf/",
      "duration": "09:42",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "fdisk（util-linux 2.23+ 支持 GPT）",
      "note": "据标题推测覆盖 n/d/p/w/q，待验收"
    },
    "v-09-disk-full": {
      "platform": "bilibili",
      "title": "Linux硬盘分区|格式化|挂载，保姆级教程！",
      "author": "5997CK",
      "url": "https://www.bilibili.com/video/BV1pD4y1u7Kf/",
      "duration": "13:53",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "据标题推测为分区→格式化→挂载，待验收"
    },
    "v-09-unit": {
      "platform": "bilibili",
      "title": "【中英字幕】存储容量揭秘：GB 与 GiB 的真正区别",
      "author": "爱摸鱼的月萌",
      "url": "https://www.bilibili.com/video/BV1A9M96LENn/",
      "duration": "08:57",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "中英字幕；据标题推测讲 10^9 与 2^30，待验收"
    },
    "v-09-esp": {
      "platform": "bilibili",
      "title": "一起来认识EFI与UEFI～ESP/EFI系统引导如何修复",
      "author": "道源者也",
      "url": "https://www.bilibili.com/video/BV1iJ411A7Ju/",
      "duration": "10:50",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "UEFI/GPT",
      "note": "偏 Windows 视角；Linux 侧 ESP 布局是否讲到待验收"
    },
    "v-09-mount": {
      "platform": "bilibili",
      "title": "Linux命令之mount与umount",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1BhdQBEESE/",
      "duration": "06:47",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "util-linux",
      "note": "据标题推测覆盖 mount/umount 基本用法，待验收"
    },
    "v-09-mount-fstab": {
      "platform": "bilibili",
      "title": "Linux命令精讲之mount/fstab/loop（挂载管理）",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV11DNA6YEeU/",
      "duration": "03:02",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "util-linux",
      "note": "据标题推测为 mount/fstab/loop 速览，待验收"
    },
    "v-09-fstab": {
      "platform": "bilibili",
      "title": "87-linux存储-fstab挂载持久化及UUID挂载",
      "author": "发哥的云计算课堂",
      "url": "https://www.bilibili.com/video/BV1UFp2zEEHK/",
      "duration": "11:10",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "据标题推测覆盖 UUID 挂载与 fstab 持久化，待验收"
    },
    "v-09-automount": {
      "platform": "bilibili",
      "title": "设置开机自动挂载",
      "author": "张仲恩",
      "url": "https://www.bilibili.com/video/BV1UM4m1m7Gy/",
      "duration": "01:45",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "据标题推测为最短写法演示，待验收"
    },
    "v-09-swap": {
      "platform": "bilibili",
      "title": "84-Linux磁盘管理实战-swap交换分区",
      "author": "旭哥讲运维",
      "url": "https://www.bilibili.com/video/BV1ksbA69EXr/",
      "duration": "06:40",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "据标题推测覆盖 swap 分区实战流程，待验收"
    },
    "v-09-swap-basic": {
      "platform": "bilibili",
      "title": "Linux基础（44）--SWAP交换分区",
      "author": "佚名运维",
      "url": "https://www.bilibili.com/video/BV1LipgezEC6/",
      "duration": "04:26",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "通用",
      "note": "据标题推测为 swap 基础概念，待验收"
    },
    "a-09-partprobe": {
      "kind": "article",
      "platform": "web",
      "title": "分区管理中怎么利用partprobe命令通知系统内核重新读取已发生变动的分区信息",
      "author": "PHP 中文网",
      "url": "https://www.php.cn/faq/3078996.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "util-linux partprobe",
      "note": "机器读正文（待人工复核）：partprobe 只刷新内核缓存、不改磁盘；设备忙时怎么办；验证看 /proc/partitions"
    },
    "a-09-resize": {
      "kind": "article",
      "platform": "web",
      "title": "Linux怎么管理LVM逻辑卷 Linux磁盘扩容与缩减详细教程",
      "author": "PHP 中文网",
      "url": "https://www.php.cn/faq/2480428.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "LVM + ext4/XFS（RHEL 7/9）",
      "note": "机器读正文（待人工复核）：XFS 不支持缩容；ext4 必须 卸载→e2fsck -f→resize2fs→lvreduce；xfs_growfs 传挂载点"
    },
    "a-09-rhel7-fs": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "Linux系统介绍 磁盘分区安装rhel7",
      "author": "tiki",
      "url": "https://www.cnblogs.com/tiki/p/10782979.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RHEL 7（对照 RHEL 6）",
      "note": "机器读正文（待人工复核）：一句话给出「RHEL7 默认 XFS、RHEL6 默认 ext4」；其余是装机步骤，文件系统清单靠 must_know"
    },
    "v-10-lvm-basic": {
      "platform": "bilibili",
      "title": "Linux磁盘管理之PV,VG,LV的区别，动手练起来",
      "author": "程序员木易杨",
      "url": "https://www.bilibili.com/video/BV1dY4y1z74o/",
      "duration": "06:15",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "lvm2（RHEL 7/9 通用）",
      "note": "据标题推测边讲三层边动手，待验收"
    },
    "v-10-lvm-what": {
      "platform": "bilibili",
      "title": "什么是LVM？ Linux 逻辑卷管理器",
      "author": "Linux初学者社区",
      "url": "https://www.bilibili.com/video/BV11dMv6cEPj/",
      "duration": "01:52",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "概念",
      "note": "不到两分钟的概念铺垫，待验收"
    },
    "v-10-lvm-create": {
      "platform": "bilibili",
      "title": "7.LVM的制作，重点是扩容操作",
      "author": "TheMythWS",
      "url": "https://www.bilibili.com/video/BV1ZT4y1A7x7/",
      "duration": "17:25",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "lvm2",
      "note": "标题只提「制作与扩容」，具体覆盖到 pv/vg/lv 哪几步待验收；17:25 超 15 分钟参考值，见台账例外说明"
    },
    "v-10-lvm-extend": {
      "platform": "bilibili",
      "title": "Linux给磁盘扩容（LVM）",
      "author": "ziyi程序员",
      "url": "https://www.bilibili.com/video/BV1xq421F7Ma/",
      "duration": "11:25",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "lvm2",
      "note": "据标题推测为 lvextend 实操，待验收"
    },
    "v-10-lvm-snapshot": {
      "platform": "bilibili",
      "title": "怎么折腾也弄不坏的 Linux 系统？- Linux逻辑卷管理（LVM）快照功能",
      "author": "学习日记小店",
      "url": "https://www.bilibili.com/video/BV1Pr4y1k7SQ/",
      "duration": "04:30",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "lvm2 snapshot",
      "note": "据标题推测讲快照的创建与回滚，待验收"
    },
    "v-10-thin": {
      "platform": "bilibili",
      "title": "详解存储池（Pool）、卷（Volume）和精简池（Thin Pool），理解厚/精简置备",
      "author": "领略技术的美",
      "url": "https://www.bilibili.com/video/BV1JgLQ6HE6D/",
      "duration": "05:51",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "thin provisioning 概念",
      "note": "PVE 语境讲厚/薄置备，概念可迁移；待验收"
    },
    "a-10-pvmove": {
      "kind": "article",
      "platform": "web",
      "title": "基于逻辑卷管理器（LVM）对物理坏道硬盘进行热迁移的平滑替换",
      "author": "PHP 中文网",
      "url": "https://www.php.cn/faq/2643926.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "lvm2 pvmove/vgreduce/pvremove",
      "note": "机器读正文（待人工复核）：pvmove → 确认 Alloc PE 归零 → vgreduce → pvremove 的完整顺序与空间检查"
    },
    "a-10-stratis": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "RHEL高级磁盘管理—Stratis",
      "author": "pycod",
      "url": "https://www.cnblogs.com/xuanbjut/p/14135317.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Stratis（RHEL 8 起，RHEL 9 沿用）",
      "note": "机器读正文（待人工复核）：pool create/add-data、filesystem create、/stratis/池/fs 挂载、blkid 取 UUID、snapshot 都有实例"
    },
    "a-10-rh-stratis": {
      "kind": "article",
      "platform": "web",
      "title": "第 25 章 设置 Stratis 文件系统（RHEL 9 官方文档）",
      "author": "Red Hat Documentation",
      "url": "https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/9/html/managing_file_systems/setting-up-stratis-file-systems_managing-file-systems",
      "duration": null,
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RHEL 9",
      "note": "官方依据；机器只读到章节开头，fstab 的 stratis-fstab-setup@UUID 模板需人工核对原文"
    },
    "v-11-ip-basic": {
      "platform": "bilibili",
      "title": "IP地址、子网掩码、网络地址、地址块",
      "author": "晓c老师",
      "url": "https://www.bilibili.com/video/BV14kmqBKE1a/",
      "duration": "09:12",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "IPv4 基础",
      "note": "据标题推测讲 IP 组成与掩码，待验收"
    },
    "v-11-subnet": {
      "platform": "bilibili",
      "title": "网络地址 广播地址 主机地址范围求法",
      "author": "繁童学",
      "url": "https://www.bilibili.com/video/BV17a411t7Jp/",
      "duration": "05:09",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "IPv4 子网计算",
      "note": "据标题推测为网络/广播地址算法，待验收"
    },
    "v-11-nmcli": {
      "platform": "bilibili",
      "title": "使用nmcli命令配置Linux网络参数",
      "author": "legolas蒲公英",
      "url": "https://www.bilibili.com/video/BV1rmZ3YXETr/",
      "duration": "16:49",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "NetworkManager / nmcli",
      "note": "据标题推测为 nmcli 配置实操，待验收；16:49 超 15 分钟参考值，见台账例外说明"
    },
    "v-11-ip-cmd": {
      "platform": "bilibili",
      "title": "Linux 系统 ip addr 命令使用详解",
      "author": "学亮编程手记",
      "url": "https://www.bilibili.com/video/BV1vaY5zYETm/",
      "duration": "09:42",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "iproute2",
      "note": "据标题推测覆盖 ip addr 查看与临时修改，待验收"
    },
    "v-11-ip-ifconfig": {
      "platform": "bilibili",
      "title": "Linux命令精讲之ip/ifconfig/hostname（网络接口）",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1cj3b6LEw8/",
      "duration": "02:55",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "iproute2 + net-tools",
      "note": "据标题推测为两者对照，待验收"
    },
    "v-11-route-table": {
      "platform": "bilibili",
      "title": "如何查看IP路由表和理解路由表的字段",
      "author": "精彩网络技术",
      "url": "https://www.bilibili.com/video/BV1ep4y1T7py/",
      "duration": "03:07",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "路由表基础",
      "note": "据标题推测讲路由表字段，待验收"
    },
    "v-11-route-elements": {
      "platform": "bilibili",
      "title": "5分钟带你了解，IP路由表七大要素",
      "author": "网络工程师俱乐部",
      "url": "https://www.bilibili.com/video/BV1bt4y1w77k/",
      "duration": "06:44",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "路由表基础",
      "note": "据标题推测含默认路由要素，待验收"
    },
    "v-11-longest-prefix": {
      "platform": "bilibili",
      "title": "「计算机网络」最长前缀匹配原则",
      "author": "熊哥保佑你",
      "url": "https://www.bilibili.com/video/BV1JK4y1V7iE/",
      "duration": "10:14",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "选路原则",
      "note": "据标题推测讲最长前缀，待验收"
    },
    "v-11-longest-2": {
      "platform": "bilibili",
      "title": "最长匹配原则 路由转发",
      "author": "我叫dzc",
      "url": "https://www.bilibili.com/video/BV1rg411v7wB/",
      "duration": "01:55",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "选路原则",
      "note": "两分钟速览，待验收"
    },
    "v-11-dns-record": {
      "platform": "bilibili",
      "title": "DNS的常用记录详解",
      "author": "Batteries安全",
      "url": "https://www.bilibili.com/video/BV1AT411D7z7/",
      "duration": "04:20",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "DNS 记录类型",
      "note": "据标题推测覆盖 A/AAAA/CNAME/MX，待验收"
    },
    "v-11-net-tools": {
      "platform": "bilibili",
      "title": "Linux命令之ping、traceroute、mtr",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV15UoEBQEdk/",
      "duration": "06:46",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "iputils / traceroute",
      "note": "据标题推测覆盖三个连通性工具，待验收"
    },
    "v-11-traceroute": {
      "platform": "bilibili",
      "title": "排除网络故障命令-traceroute",
      "author": "tinychar",
      "url": "https://www.bilibili.com/video/BV1dk4y1L7D7/",
      "duration": "06:18",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "traceroute",
      "note": "据标题推测为 traceroute 专题，待验收"
    },
    "v-11-nmap": {
      "platform": "bilibili",
      "title": "内网渗透第一步：用nmap快速定位存活主机",
      "author": "量子菠萝_",
      "url": "https://www.bilibili.com/video/BV1qQEF6VE5c/",
      "duration": "12:29",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "nmap",
      "note": "按需：渗透视角，只用来补 -sn 主机发现；待验收"
    },
    "v-11-ss": {
      "platform": "bilibili",
      "title": "Linux命令之netstat、ss",
      "author": "全栈二把刀",
      "url": "https://www.bilibili.com/video/BV1ZroEBxEBv/",
      "duration": "06:39",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "iproute2 ss",
      "note": "据标题推测覆盖 ss -lntp，待验收"
    },
    "v-11-ssh-key": {
      "platform": "bilibili",
      "title": "【小知识】第6期 SSH免密登录的原理",
      "author": "free-coder",
      "url": "https://www.bilibili.com/video/BV1y4411q7PW/",
      "duration": "14:23",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "OpenSSH",
      "note": "据标题推测讲公钥/私钥与 authorized_keys，待验收"
    },
    "v-11-ssh-key2": {
      "platform": "bilibili",
      "title": "linux配置ssh免密登录",
      "author": "水果是酱紫",
      "url": "https://www.bilibili.com/video/BV1BN4y1V7Vg/",
      "duration": "08:30",
      "role": "backup",
      "status": "candidate",
      "verified_at": null,
      "version_note": "OpenSSH",
      "note": "据标题推测为实操演示，待验收；主视频 14:23 已占满小节预算，这条按备用挂出，需要看手把手操作时再打开"
    },
    "v-11-xrdp": {
      "platform": "bilibili",
      "title": "【配置XRDP】从Windows远程桌面连接Linux",
      "author": "爱学英文的蟹Bro",
      "url": "https://www.bilibili.com/video/BV1qu411P7u7/",
      "duration": "05:06",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "xrdp / RDP",
      "note": "据标题推测为 xrdp 配置与 RDP 连接，待验收"
    },
    "a-11-nsswitch": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "通用名称服务（getent 与 nsswitch.conf 的解析顺序）",
      "author": "小镇-做题家",
      "url": "https://www.cnblogs.com/tiantao36/p/18976674",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "glibc NSS",
      "note": "机器读正文（待人工复核）：hosts: files dns 的顺序、libnss_* 模块、getent 与 dig 为何可能不一致"
    },
    "v-11-ifcfg": {
      "platform": "bilibili",
      "title": "Linux实验05 配置网络",
      "author": "JacksonAI_",
      "url": "https://www.bilibili.com/video/BV1Tq421P7GG/",
      "duration": "11:49",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "ifcfg 与 NetworkManager 兼容",
      "note": "据标题推测为改 ifcfg 文件配网络的实验课，待验收；是否讲到「RHEL 9 里 ifcfg 由 NM 接管」需人工确认"
    },
    "v-11-static-route": {
      "platform": "bilibili",
      "title": "centos静态路由配置",
      "author": "okman312",
      "url": "https://www.bilibili.com/video/BV1ph41167Qh/",
      "duration": "08:14",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "CentOS 7 风格（route / 配置文件）",
      "note": "据标题推测为 CentOS 7 时代的 route 命令 / 配置文件做法（route-eth0 是常见形态），待验收；RHEL 9 应改用 nmcli 的 ipv4.routes"
    },
    "v-11-ssh-port": {
      "platform": "bilibili",
      "title": "W13.02：ssh服务启用root用户登录并且修改ssh默认端口22为其他端口",
      "author": "红帽子黑魔法",
      "url": "https://www.bilibili.com/video/BV1YeVozYEV8/",
      "duration": "15:04",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "sshd_config / SELinux 端口标签",
      "note": "据标题推测为改 sshd_config 的 Port 并放行防火墙，待验收；15:04 超 15 分钟参考值，见台账例外说明"
    },
    "v-11-ssh-trouble": {
      "platform": "bilibili",
      "title": "SSH连接失败的终极排查攻略+自救指南，99%的人都死在这6个坑里！",
      "author": "浪浪云技术栈",
      "url": "https://www.bilibili.com/video/BV1FpDzBBEGe/",
      "duration": "04:46",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "云主机视角的 SSH 排查",
      "note": "简介自述从 IP 检查、网络诊断到系统排查的路径，待验收；视角偏云主机（安全组、被墙），本机环境对应的是防火墙与 sshd 状态"
    },
    "v-12-firewalld-basic": {
      "platform": "bilibili",
      "title": "10分钟带你掌握Linux服务器防火墙",
      "author": "Linux情报站",
      "url": "https://www.bilibili.com/video/BV1EExgz3EEE/",
      "duration": "10:03",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "firewalld（CentOS/RHEL 通用）",
      "note": "据标题推测为 firewalld 概览（zone、service、port），待验收；是否讲到 runtime 与 permanent 两套视图需人工确认"
    },
    "v-12-fw-port": {
      "platform": "bilibili",
      "title": "Linux中如何开放防火墙端口？",
      "author": "编程分享录",
      "url": "https://www.bilibili.com/video/BV1JF411E7H8/",
      "duration": "05:31",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "firewalld --add-port",
      "note": "据标题推测为 --add-port 实操，待验收；是否同时演示 --permanent + --reload 需人工确认"
    },
    "v-12-selinux-intro": {
      "platform": "bilibili",
      "title": "一个视频给你讲透什么是SELinux",
      "author": "Linux初学者社区",
      "url": "https://www.bilibili.com/video/BV1t3Nt6TEAD/",
      "duration": "02:22",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "SELinux 概念",
      "note": "据标题推测为 SELinux 概念科普，待验收；2:22 偏短，模式与 setenforce 的细节预计讲不到"
    },
    "v-12-selinux-debug": {
      "platform": "bilibili",
      "title": "红帽Rhcsa初级认证-④调试selinux",
      "author": "K8S云原生",
      "url": "https://www.bilibili.com/video/BV1224y1k7cz/",
      "duration": "09:30",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RHCSA 实验环境（RHEL 8）",
      "note": "据标题推测为 RHCSA 风格的 SELinux 调试演示，待验收；简介含培训招生内容，不影响观看"
    },
    "v-12-selinux-avc": {
      "platform": "bilibili",
      "title": "05 管理SELinux安全 04 调查和解决SELinux问题讲解和练习",
      "author": "simmons_zzZ",
      "url": "https://www.bilibili.com/video/BV1eR7tzcE7P/",
      "duration": "10:18",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RHCE 课程章节",
      "note": "据标题推测为 AVC 日志调查与解决流程，待验收；是否覆盖 ausearch/sealert 需人工确认"
    },
    "v-12-selinux-www": {
      "platform": "bilibili",
      "title": "16.在/home/wwwroot/下存放网页，有SELINUX域和安全上下文的限制",
      "author": "TheMythWS",
      "url": "https://www.bilibili.com/video/BV1w54y1x7JR/",
      "duration": "05:39",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "LNMP 场景",
      "note": "标题直指「非标准目录放网页受 SELinux 域与上下文限制」，待验收；是否演示 semanage fcontext + restorecon 需人工确认"
    },
    "v-12-httpd": {
      "platform": "bilibili",
      "title": "想搭个自己的网站？Apache服务器配置及简单网页搭建～",
      "author": "喵喵喵mmm-",
      "url": "https://www.bilibili.com/video/BV1Tb4y1X7Lq/",
      "duration": "14:14",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Apache httpd",
      "note": "据标题推测为 httpd 安装与配置实操，待验收；14:14 接近 15 分钟参考值，是否基于 RHEL 需人工确认"
    },
    "v-12-403": {
      "platform": "bilibili",
      "title": "Nginx常见的403，502，504错误快速定位",
      "author": "玩转私有云",
      "url": "https://www.bilibili.com/video/BV1s6a364Ez9/",
      "duration": "02:08",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Nginx 视角",
      "note": "据标题推测为 403/502/504 的定位思路，待验收；讲的是 Nginx，与 httpd 的对应关系需自行迁移"
    },
    "v-12-openssl": {
      "platform": "bilibili",
      "title": "第一集 什么是openssl？马弓手C/C++编程",
      "author": "马弓手C语言编程",
      "url": "https://www.bilibili.com/video/BV1XK421C72d/",
      "duration": "04:54",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "OpenSSL 概念",
      "note": "据标题推测为 OpenSSL 定位与用途介绍，待验收；视角偏 C 语言开发，运维侧的证书命令靠 must_know"
    },
    "a-12-fw-guide": {
      "kind": "article",
      "platform": "aliyun",
      "title": "Linux firewalld防火墙使用详解",
      "author": "阿里云开发者社区",
      "url": "https://developer.aliyun.com/article/1707560",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "firewalld / firewall-cmd",
      "note": "机器读正文（待人工复核）：runtime 与 permanent 两套配置、--runtime-to-permanent、--reload、zone 与接口绑定、--query-port、富规则与策略"
    },
    "a-12-fcontext": {
      "kind": "article",
      "platform": "php.cn",
      "title": "服务器 SELinux 文件上下文标签管理教程",
      "author": "陌辰小哥_3569",
      "url": "https://www.php.cn/faq/2625941.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "SELinux 文件上下文",
      "note": "机器读正文（待人工复核）：ls -Z / ls -Zd、chcon 临时、semanage fcontext + restorecon 持久、restorecon -n 干跑、ausearch -m avc、/.autorelabel"
    },
    "a-12-port": {
      "kind": "article",
      "platform": "php.cn",
      "title": "Linux SELinux 端口标签与服务绑定教程",
      "author": "酷静酱_9239",
      "url": "https://www.php.cn/faq/2614916.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "SELinux 端口标签",
      "note": "机器读正文（待人工复核）：semanage port -l/-C、-a 新增、-m 修改、-d 删除、http_port_t 默认端口、与 firewalld 的分工"
    },
    "a-12-bool": {
      "kind": "article",
      "platform": "php.cn",
      "title": "Linux 中怎么查看和修改 SELinux 的布尔值权限开关",
      "author": "老磊大大_2095",
      "url": "https://www.php.cn/faq/3267463.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "SELinux 布尔值",
      "note": "机器读正文（待人工复核）：getsebool -a、getsebool 单个、setsebool 临时、setsebool -P 写策略库、sesearch -b 查规则"
    },
    "v-13-nfs-basic": {
      "platform": "bilibili",
      "title": "NFS共享服务配置",
      "author": "Ja_Cuity",
      "url": "https://www.bilibili.com/video/BV1pE411E7yr/",
      "duration": "04:00",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "NFS + exports",
      "note": "据标题推测为 exports 与挂载的完整演示，待验收；4:00 短，RPC 与 v3/v4 端口差异预计讲不到"
    },
    "v-13-nfs-setup": {
      "platform": "bilibili",
      "title": "nfs服务配置",
      "author": "Fog服务",
      "url": "https://www.bilibili.com/video/BV1bJ4m1G7AB/",
      "duration": "11:01",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "nfs-utils / exportfs",
      "note": "据标题推测为服务端安装到客户端挂载的全流程，待验收；简介含「请勿转载」声明，不影响观看"
    },
    "v-13-nfs-rhel": {
      "platform": "bilibili",
      "title": "【RHEL Linux】【服务器配置全程实录】配置NFS+NIS",
      "author": "抱風揍雨",
      "url": "https://www.bilibili.com/video/BV1Pk4y1z7QL/",
      "duration": "08:53",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RHEL",
      "note": "标题同时含 NFS 与 NIS，NFS 部分占多少待验收，暂按补充挂出"
    },
    "v-13-root-squash": {
      "platform": "bilibili",
      "title": "CentOS7：设置nfs共享并测试root_squash参数的读写限制",
      "author": "此生就像一盒巧克力",
      "url": "https://www.bilibili.com/video/BV1ug4y1B7LE/",
      "duration": "10:19",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "CentOS 7 / NFSv3",
      "note": "简介自述会用 exportfs -a 检查 exports、并把客户端 root 映射到 nfsnobody，待验收；新版匿名用户是 nobody"
    },
    "v-13-autofs": {
      "platform": "bilibili",
      "title": "红帽认证RHCSA8-autofs自动挂载",
      "author": "扣丁学堂",
      "url": "https://www.bilibili.com/video/BV1PA411j7hv/",
      "duration": "11:52",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "RHCSA 实验环境（RHEL 8）",
      "note": "据标题推测为 RHCSA 考纲内的 autofs 实操（主映射 + 间接映射），待验收；直接映射的 /- 写法是否讲到需确认"
    },
    "v-13-dns": {
      "platform": "bilibili",
      "title": "rocky9 linux DNS服务器配置",
      "author": "行走的氢分子",
      "url": "https://www.bilibili.com/video/BV1V5GJzZEWp/",
      "duration": "16:50",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Rocky Linux 9（与 RHEL 9 兼容）",
      "note": "标题写明 rocky9，与 RHEL 9 同源、配置可参照，待验收；16:50 超 15 分钟参考值，见台账例外说明"
    },
    "v-13-dns-linux": {
      "platform": "bilibili",
      "title": "Linux--DNS服务器配置",
      "author": "zhuofai",
      "url": "https://www.bilibili.com/video/BV1rL4y1c7zu/",
      "duration": "12:48",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "BIND / named",
      "note": "据标题推测为 named.conf 与区域文件演示，待验收；简介提到 DHCP 环境，可能包含前置网络配置"
    },
    "v-13-samba": {
      "platform": "bilibili",
      "title": "linux下samba服务器的搭建",
      "author": "路西兰度当家",
      "url": "https://www.bilibili.com/video/BV1Bv4y137SZ/",
      "duration": "11:06",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Samba / smb.conf",
      "note": "简介自述面向刚学 Linux 的同学，待验收；是否讲到 smbd 与 nmbd 两个守护进程需人工确认"
    },
    "v-13-ftp": {
      "platform": "bilibili",
      "title": "网工必会 FTP：搞懂主动 / 被动模式，区分 FTP 与 TFTP",
      "author": "华为认证大喜姐",
      "url": "https://www.bilibili.com/video/BV1xW8w68EUP/",
      "duration": "08:23",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "网络工程师视角",
      "note": "标题直指主动/被动模式与 FTP/TFTP 辨析，待验收；ASCII 与 binary 两种传输类型是否讲到需确认"
    },
    "v-13-mail": {
      "platform": "bilibili",
      "title": "Email电子邮件工作原理｜SMTP、POP3、IMAP、MIME｜过滤黑名单",
      "author": "小生凡一",
      "url": "https://www.bilibili.com/video/BV14CXUYpErx/",
      "duration": "03:29",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "邮件协议概念",
      "note": "据标题推测为 SMTP/POP3/IMAP 的分工，待验收；作者在简介里自述「会有讲错的地方」，只作补充，以 must_know 为准"
    },
    "v-13-bs": {
      "platform": "bilibili",
      "title": "软件架构模式--B/S架构与C/S架构区别",
      "author": "图难于易",
      "url": "https://www.bilibili.com/video/BV1rA41167aW/",
      "duration": "11:06",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "架构概念",
      "note": "简介已写明 B/S 是浏览器/服务器、C/S 是胖客户端，待验收；PHP+MySQL 那半不在本节范围"
    },
    "a-13-ports": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "windows和linux各类服务常用端口号汇总",
      "author": "记忆流年",
      "url": "https://www.cnblogs.com/fengdejiyixx/p/12643551.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "端口与协议对照",
      "note": "机器读正文（待人工复核）：21 FTP、22 SSH、23 Telnet、25 SMTP、53 DNS、80 HTTP、110 POP3、143 IMAP、443 HTTPS、3306 MySQL 等对照"
    },
    "a-13-storage": {
      "kind": "article",
      "platform": "baidu",
      "title": "深度解析：块存储、iSCSI、文件存储NFS及块存储类型选择",
      "author": "问答酱",
      "url": "https://cloud.baidu.com/article/3822543",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "块存储 / 文件存储",
      "note": "机器读正文（待人工复核）：块存储与文件存储的区别、iSCSI 的 initiator/target 与 3260 端口、NFS 基于 RPC、选型对比"
    },
    "a-13-squid": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "Squid 缓存代理服务器的完整配置",
      "author": "達達尼亞",
      "url": "https://www.cnblogs.com/wayne173/p/3768182.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Squid 2.x/3.x 配置",
      "note": "机器读正文（待人工复核）：http_port 3128、cache_mem 64 MB、maximum_object_size、cache_dir 各参数含义"
    },
    "v-14-podman-intro": {
      "platform": "bilibili",
      "title": "下一代容器管理工具Podman，对比Docker有哪些优势，架构是什么样的？",
      "author": "技术爬爬虾",
      "url": "https://www.bilibili.com/video/BV1jcu6z7ExM/",
      "duration": "12:55",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Podman 架构",
      "note": "简介自述为 Podman 入门 + 实战，含与 Docker 的架构对比，待验收；rootless 与 rootful 两套存储是否讲到需确认"
    },
    "v-14-cmp": {
      "platform": "bilibili",
      "title": "docker | podman | lxc 容器三剑客怎么选",
      "author": "玩转私有云",
      "url": "https://www.bilibili.com/video/BV1Ts8m64Eej/",
      "duration": "06:46",
      "role": "supplement",
      "status": "candidate",
      "verified_at": null,
      "version_note": "容器工具选型",
      "note": "据标题推测偏选型对比，可能不涉及具体命令，待验收"
    },
    "v-14-podman-8min": {
      "platform": "bilibili",
      "title": "八分钟入门docker的继承者podman",
      "author": "账号已注销",
      "url": "https://www.bilibili.com/video/BV1s54y1E7YE/",
      "duration": "07:32",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Podman 入门",
      "note": "据标题推测为镜像/容器基本操作的入门演示，待验收；作者已注销，链接若失效需替换"
    },
    "v-14-podman-cmd": {
      "platform": "bilibili",
      "title": "一定要学的 Podman 10大入门指令",
      "author": "用圖片高效學程式",
      "url": "https://www.bilibili.com/video/BV1P8411f7dp/",
      "duration": "16:00",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Podman CLI",
      "note": "简介写明覆盖 ps / images / logs / exec 等常用指令，待验收；16:00 超 15 分钟参考值，见台账例外说明"
    },
    "v-14-quadlet": {
      "platform": "bilibili",
      "title": "Podman无根模式开机自启太麻烦？Quadlet方案你愿意入坑吗？",
      "author": "程序员暮闲",
      "url": "https://www.bilibili.com/video/BV1q1cszQEXa/",
      "duration": "10:58",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "Quadlet（Podman 4.4+）",
      "note": "简介自述讲 .container 声明式配置与自动生成 systemd 单元，待验收；linger 那步是否讲到需确认"
    },
    "v-14-docker-port": {
      "platform": "bilibili",
      "title": "Docker端口映射",
      "author": "莲城的老李",
      "url": "https://www.bilibili.com/video/BV1VC411h7is/",
      "duration": "11:49",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "docker run -p",
      "note": "简介写明讲端口映射是什么、怎么实现、怎么改，待验收；EXPOSE 与 -p 的区别是否讲到需确认"
    },
    "v-14-cloud": {
      "platform": "bilibili",
      "title": "一个视频讲清楚SaaS、PaaS、IaaS的区别",
      "author": "王壮-先进版",
      "url": "https://www.bilibili.com/video/BV1UN4y1F7m5/",
      "duration": "02:11",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "云服务交付模型",
      "note": "据标题推测为三种交付模型的通俗区分，待验收；2:11 只够讲边界，OpenStack 的定位靠 must_know"
    },
    "v-14-openstack": {
      "platform": "bilibili",
      "title": "OpenStack9大核心组件",
      "author": "guoko",
      "url": "https://www.bilibili.com/video/BV1ENiUYhE6h/",
      "duration": "03:56",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "OpenStack 组件",
      "note": "据标题推测为组件名与职责的快速过一遍，待验收；3:56 只够列名单，细节靠 must_know"
    },
    "v-14-redis": {
      "platform": "bilibili",
      "title": "MySQL和Redis有什么区别",
      "author": "计算机大白话",
      "url": "https://www.bilibili.com/video/BV1hnKg6cEJe/",
      "duration": "02:50",
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "关系型 vs 内存数据库",
      "note": "简介自述对比 MySQL 与 Redis 的底层设计差异（硬盘/内存），待验收；2:50 偏短，数据结构类型靠 must_know"
    },
    "a-14-volume": {
      "kind": "article",
      "platform": "cnblogs",
      "title": "Podman run -v /HOST-DIR:/CONTAINER-DIR:Z详解",
      "author": "zhealks",
      "url": "https://www.cnblogs.com/zhealks/p/15592989.html",
      "duration": null,
      "role": "main",
      "status": "candidate",
      "verified_at": null,
      "version_note": "podman-run(1) 卷选项",
      "note": "机器读正文（待人工复核）：官方 man 页译文，讲 -v 的选项列表、默认不改标签、:z 共享与 :Z 私有、以及不要重标系统目录"
    }
  },

  "lessons": [
    {
      "id": "01-01",
      "topic_id": "01",
      "title": "发行版、内核与版本查询",
      "question_ids": ["A001", "A084", "P001", "P002"],
      "video_ids": ["v-01-kernel-distro", "v-01-distro-tree", "v-01-uname"],
      "coverage": [
        "发行版不等于 Linux 内核",
        "Red Hat 生态：Fedora → CentOS Stream → RHEL",
        "uname -r 看这次启动的内核",
        "/etc/os-release 看发行版身份"
      ],
      "search_terms": ["Linux 发行版 内核 用户空间 区别", "uname -r /etc/os-release 区别"],
      "must_know": [
        "发行版 = 内核 + 用户空间程序 + 软件库/仓库 + 安装与管理机制。Ubuntu、Fedora、Debian 是发行版，Linux 内核源码本身不是完整发行版。",
        "当前生态简化记法：`Fedora → CentOS Stream → RHEL`，Ubuntu 不属于该家族。旧视频若把传统 CentOS Linux 说成 RHEL 的下游重构版，不要直接套到 CentOS Stream。",
        "版本查询要分层：`cat /etc/os-release` 看发行版身份，`uname -r` 看正在运行的内核；装了新内核但未重启，`uname -r` 仍显示旧内核。"
      ],
      "gaps": "视频按各自发行版演示，RHEL 9/10 上 `hostnamectl` 的输出差异需配合题解"
    },
    {
      "id": "01-02",
      "topic_id": "01",
      "title": "开源许可与是否需要自行编译内核",
      "question_ids": ["A068", "A018"],
      "video_ids": ["v-01-gnu-gpl", "v-01-modprobe"],
      "coverage": [
        "GNU 项目与 GPL 许可的基本约定",
        "内核模块的加载与卸载",
        "加载模块不等于重新编译内核",
        "发行版已适配时无需自己编译内核"
      ],
      "search_terms": ["Linux 内核模块 是否需要编译内核", "GNU GPL 开源协议 讲解"],
      "must_know": [
        "Linux 内核整体按 GPL-2.0-only 发布，并有 Linux syscall exception；普通用户空间程序不因调用内核接口就必须采用同一许可证。",
        "`lsmod` 看已加载模块，`modprobe` 加载/卸载模块，这些都在运行中的内核上完成，不需要重新编译内核。"
      ],
      "gaps": "modprobe 视频 14:30，只在「加载模块是不是等于编译内核」有疑问时看"
    },
    {
      "id": "01-03",
      "topic_id": "01",
      "title": "Linux 图形界面与桌面环境",
      "question_ids": ["A069"],
      "video_ids": ["v-01-xwindow"],
      "coverage": [
        "X Window 是显示协议，不是桌面本身",
        "KDE、GNOME 是运行在 X/Wayland 之上的桌面环境",
        "桌面环境属于用户空间，可替换、可不装"
      ],
      "search_terms": ["Linux GNOME KDE X Window 区别"],
      "must_know": [
        "GNOME/KDE 是用户空间的桌面环境，不是内核调度器；服务器完全可以不装、不启动图形桌面。"
      ],
      "gaps": "视频以 X Window 为主，Wayland 只作提及，题目考的是分层关系"
    },
    {
      "id": "01-04",
      "topic_id": "01",
      "title": "FHS 与目录体系",
      "question_ids": ["A029", "A053", "P007", "P008"],
      "video_ids": ["v-01-fhs"],
      "coverage": [
        "FHS 规定的顶层目录及用途",
        "/dev 下是设备节点",
        "root 的家目录是 /root",
        "cd 不带参数回 HOME，相对路径 ../ 的解析"
      ],
      "search_terms": ["Linux 文件系统层次结构 FHS", "Linux /dev 设备文件 讲解"],
      "must_know": [
        "目录速记：`/dev` 设备、`/etc` 配置、`/var` 经常变化的数据、`/proc` 进程与内核虚拟信息、`/run` 本次启动的运行状态；root 用户家目录是 `/root`。"
      ],
      "gaps": "cd 不带参数回 HOME、相对路径 ../ 视频未讲，看题解"
    },
    {
      "id": "01-05",
      "topic_id": "01",
      "title": "命令帮助、解析与 PATH",
      "question_ids": ["A072", "A044", "P003", "P004", "P005", "P006", "P011", "P012"],
      "video_ids": ["v-01-help-tools", "v-01-script-exec", "v-01-path"],
      "coverage": [
        "help 查内建命令，--help 查外部命令",
        "man 的章节编号与 man -k 关键词检索",
        "type、command -V 判断命令如何被解析",
        "PATH 查找顺序与「. 不在 PATH」，当前目录执行脚本要写 ./runme",
        "-- 作为选项结束符，避免文件名被当成选项"
      ],
      "search_terms": ["Linux man 手册 章节 使用", "type which 区别 内建命令", "rm -- 文件名 以横线开头"],
      "must_know": [
        "Bash 内建命令 `cd` 用 `help cd`；外部命令用 `命令 --help`；查 `/etc/passwd` 的格式用 `man 5 passwd`；按关键词找手册用 `man -k calendar` 或 `apropos calendar`。",
        "判断命令究竟是别名、函数、内建还是外部程序：`type cd`、`command -V cd`；`which` 主要查 PATH，不能可靠判断所有别名、函数和内建命令。",
        "删除名为 `-draft` 的文件用 `rm -- -draft` 或 `rm ./-draft`；选项区分大小写，题目里的横线必须是英文 ASCII `-`。",
        "当前目录通常不在 `PATH` 里，所以执行当前目录的脚本要写 `./runme`；把 `.` 加进 `PATH` 虽然能直接跑 `runme`，但会带来同名命令被劫持的风险。"
      ],
      "gaps": "17:15 覆盖很全，但每条命令只演示一句，-- 结束符与 ASCII 连字符要配合题解"
    },
    {
      "id": "01-06",
      "topic_id": "01",
      "title": "环境变量与导出",
      "question_ids": ["P009"],
      "video_ids": ["v-01-env"],
      "coverage": [
        "X=blue 只是当前 Shell 的变量",
        "export 后子进程才能继承",
        "export X=blue 一步完成赋值与导出"
      ],
      "search_terms": ["Linux export 环境变量 子进程", "Shell 变量 与 环境变量 区别"],
      "must_know": [
        "`X=blue` 是普通 Shell 变量；`export X` 或 `export X=blue` 才会传给随后启动的子进程。未开启 `set -a` 时，光赋值不会导出。"
      ],
      "gaps": "视频未演示「赋值不导出 → 子进程读不到」的失败场景"
    },
    {
      "id": "01-07",
      "topic_id": "01",
      "title": "退出状态与特殊变量",
      "question_ids": ["P010"],
      "video_ids": ["v-01-exit-status"],
      "coverage": [
        "$? 是上一条命令的退出状态",
        "$! 是最近后台进程 PID",
        "$$ 是当前 Shell PID"
      ],
      "search_terms": ["Linux 退出状态 $? 讲解", "Shell 特殊变量 $$ $! $0"],
      "must_know": [
        "`$?` 上一条命令退出状态；`$!` 最近后台进程 PID；`$$` 当前 Shell PID；`$0` Shell 或脚本名称。查看 `$?` 前不能再执行其他命令。"
      ],
      "gaps": "视频覆盖 $? 与 $$，$0 与脚本参数需文字补充"
    },
    {
      "id": "01-08",
      "topic_id": "01",
      "title": "通用系统与实时系统",
      "question_ids": ["A096"],
      "video_ids": ["v-01-preempt-rt"],
      "coverage": [
        "通用系统追求吞吐与公平",
        "实时系统的关键是响应时间的可预测上限",
        "PREEMPT_RT 是让 Linux 可抢占的补丁集"
      ],
      "search_terms": ["实时操作系统 通用操作系统 区别", "Linux PREEMPT_RT 实时内核"],
      "must_know": [
        "实时系统不是「更快的通用系统」，考的是最坏响应时间有上限；PREEMPT_RT 是补丁集而不是另一个发行版。"
      ],
      "gaps": "3:33 是新闻式介绍，分时/实时概念对比靠题解"
    },
    {
      "id": "01-09",
      "topic_id": "01",
      "title": "systemd 关机操作",
      "question_ids": ["A031"],
      "video_ids": ["v-01-power"],
      "coverage": [
        "poweroff 关闭电源，reboot 重启",
        "halt 只停 CPU，不一定断电",
        "shutdown 支持定时与取消"
      ],
      "search_terms": ["Linux 关机 命令 poweroff shutdown 区别"],
      "must_know": [
        "题目要「关闭电源」选 `poweroff`；`halt` 只停 CPU；systemd 下 `systemctl poweroff` 等价，`shutdown -c` 取消定时关机。"
      ],
      "gaps": "视频 2:18 只对比命令，未讲 shutdown -c 与 systemctl 等价写法"
    },
    {
      "id": "02-01",
      "topic_id": "02",
      "title": "目录与文件的创建、删除",
      "question_ids": ["A009", "A035", "P013"],
      "video_ids": ["v-02-create-del", "v-02-mkdir", "v-02-rm"],
      "coverage": [
        "mkdir -p 一次创建多级目录",
        "rm 删普通文件，rm -r 删非空目录",
        "rmdir 只删空目录，不会递归"
      ],
      "search_terms": ["Linux mkdir -p 创建多级目录", "rm rmdir 区别 非空目录"],
      "must_know": [
        "`mkdir -p a/b/c` 才能一次建多级目录；不加 `-p` 时父目录不存在会直接报错。",
        "`rmdir` 只能删空目录，对非空目录会报错，不会递归；删非空目录用 `rm -r tree`，而 `rm tree` 会报「Is a directory」。"
      ],
      "gaps": "视频以命令演示为主，rm -i / rm -f 的交互差异未展开"
    },
    {
      "id": "02-02",
      "topic_id": "02",
      "title": "复制、移动与保留元数据",
      "question_ids": ["P014", "P028"],
      "video_ids": ["v-02-cp-mv", "v-02-cp"],
      "coverage": [
        "cp -r 递归复制目录",
        "cp -a 保留权限、时间戳与链接属性",
        "mv 同一文件系统内只是改名"
      ],
      "search_terms": ["Linux cp -a 保留权限 时间戳", "Linux mv 命令 移动 重命名"],
      "must_know": [
        "`cp -a` 相当于 `-dR --preserve=all`，保留权限、时间戳、属主与链接属性；`cp -r` 只保证递归复制。",
        "同一文件系统内 `mv old new` 只改目录项，inode 不变、数据不搬；跨文件系统才是「复制 + 删除」。"
      ],
      "gaps": "视频未讲 mv 同文件系统「只改名」的 inode 层面原因，靠文字补丁"
    },
    {
      "id": "02-03",
      "topic_id": "02",
      "title": "磁盘空间排查：df、du、lsblk",
      "question_ids": ["P027"],
      "video_ids": ["v-02-df-du", "v-02-lsblk", "a-02-sparse"],
      "coverage": [
        "df -h 看已挂载文件系统的容量与使用量",
        "du -sh 估算目录占用",
        "lsblk 看块设备与分区关系，不统计目录大小"
      ],
      "search_terms": ["Linux df du 区别 磁盘空间", "lsblk 命令 磁盘 分区"],
      "must_know": [
        "`df` 是文件系统级用量，`du` 是按目录累加已分配块；两者差很多时先想「有文件被删除但进程还占着」，用 `lsof +L1` 查。",
        "`lsblk` 只列块设备、分区与挂载点，不显示目录大小。"
      ],
      "gaps": "未讲 df 与 du 结果不一致的排查步骤"
    },
    {
      "id": "02-04",
      "topic_id": "02",
      "title": "ls 长列表与文件类型标识",
      "question_ids": ["A058", "A054", "A025"],
      "video_ids": ["v-02-ls", "v-02-filetype"],
      "coverage": [
        "ls -al 看隐藏项、权限、大小、时间",
        "ls -al | more 分页查看",
        "权限串首字符表示文件类型"
      ],
      "search_terms": ["Linux ls -l 文件类型 首字符", "Linux 七种文件类型"],
      "must_know": [
        "首字符：`-` 普通文件、`d` 目录、`l` 符号链接、`c` 字符设备、`b` 块设备、`p` 命名管道、`s` socket。",
        "分页要用管道 `ls -al | more`；`more ls -al` 是把 `ls`、`-al` 当文件名。看隐藏项必须加 `-a`。"
      ],
      "gaps": "视频只讲 ls 参数，文件类型首字符对照表靠 must_know"
    },
    {
      "id": "02-05",
      "topic_id": "02",
      "title": "时间戳、touch 与稀疏文件",
      "question_ids": ["P025", "A041", "P026"],
      "video_ids": ["a-02-timestamps", "v-02-timestamp", "a-02-sparse", "v-02-touch"],
      "coverage": [
        "touch 不存在则建空文件，存在则更新时间戳",
        "mtime 是内容修改时间，ctime 是 inode 状态变更时间",
        "ls -lc / ls -lu 分别看 ctime 与 atime",
        "truncate 生成的稀疏文件：ls 大小大、du 占用小"
      ],
      "search_terms": ["Linux 文件时间戳 atime mtime ctime", "Linux truncate 稀疏文件"],
      "must_know": [
        "只改权限不动内容：mtime 不变、ctime 变；ctime 是 inode change time，不是创建时间（Linux 没有可靠的创建时间）。",
        "`truncate -s 1G sparse` 生成稀疏文件：`ls -l` 显示约 1G，`du` 只统计实际分配的块，空洞读出来是 0。"
      ],
      "gaps": "B 站没有一条视频同时讲清 atime/mtime/ctime 与稀疏文件：主资料是知乎图文，补充视频只覆盖 atime/mtime 的查看与修改，ctime 与稀疏文件靠 must_know 与逐项解析补；touch 演示降为按需补充"
    },
    {
      "id": "02-06",
      "topic_id": "02",
      "title": "隐藏文件与通配符",
      "question_ids": ["P024"],
      "video_ids": ["v-02-glob", "v-02-glob2"],
      "coverage": [
        "通配符由 shell 展开后再传给命令",
        "* 不匹配以点开头的文件",
        "隐藏文件要显式写 .* 或用 ls -a"
      ],
      "search_terms": ["Linux 通配符 隐藏文件 星号", "bash glob 点文件 不匹配"],
      "must_know": [
        "普通 Bash 设置下 `*` 不匹配 `.secret`；要匹配隐藏文件得写 `.*`，而 `.*` 又会把 `.` 和 `..` 带进来。",
        "`printf \"%s\\n\" *` 输出的是 shell 展开后的文件名列表，不是命令自己去读目录。"
      ],
      "gaps": "视频讲 glob 语法，未专门讲「点文件不匹配」这条规则"
    },
    {
      "id": "02-07",
      "topic_id": "02",
      "title": "硬链接与符号链接",
      "question_ids": ["A010", "P015", "A015", "P017", "P016", "P018", "P019"],
      "video_ids": ["v-02-link", "v-02-ln", "v-02-ln5"],
      "coverage": [
        "硬链接与目标共享 inode，删一个名字文件还在",
        "符号链接有独立 inode，保存目标路径",
        "readlink 读链接里保存的路径",
        "相对目标按链接所在目录解析"
      ],
      "search_terms": ["Linux 硬链接 软链接 区别 inode", "ln -s readlink 符号链接"],
      "must_know": [
        "硬链接只能在同一文件系统内，普通用户不能给目录建硬链接；符号链接可跨文件系统、可指向目录，目标消失后悬空。",
        "`readlink link` 看链接里保存的路径，`cat link` 读的是目标内容；`ls -l` 首字符为 `l`。",
        "相对目标按链接所在目录解析：`/srv/app/current` 内容为 `../releases/v2` → `/srv/releases/v2`，与当前工作目录无关。"
      ],
      "gaps": "主视频 13:00 覆盖概念，readlink 与相对软链接解析需配合题解"
    },
    {
      "id": "02-08",
      "topic_id": "02",
      "title": "tar 归档与 gzip 压缩",
      "question_ids": ["A038", "P020", "P023", "P022", "P021"],
      "video_ids": ["v-02-tar", "v-02-tar-basic", "v-02-tar-C"],
      "coverage": [
        "tar 负责打包并保留目录结构，gzip 负责压缩字节流",
        "tar -czf 打包并 gzip",
        "tar -tzf 不解包只列成员",
        "tar -xf a.tar -C /tmp/out 解到指定目录"
      ],
      "search_terms": ["Linux tar 打包 压缩 gzip 命令", "tar -t 查看归档 -C 指定目录"],
      "must_know": [
        "`tar -czf logs.tar.gz logs`：`-c` 建包、`-z` 过 gzip、`-f` 指定文件名；tar 打包，gzip 压缩，两者职责不同。",
        "`tar -tzf` 与 `tar -tf` 都能读 gzip 包的成员列表（GNU tar 会自动识别压缩），`-x` 才是解包。",
        "`-C` 指定目标目录，如 `tar -xf a.tar -C /tmp/out`；`dd` 是块复制、`gzip` 只压缩，都不负责多文件归档，`cpio` 可以。"
      ],
      "gaps": "-C 与 --strip-components 只在按需视频里，主视频未讲"
    },
    {
      "id": "03-01",
      "topic_id": "03",
      "title": "文本处理总览：grep / sed / awk 各管什么",
      "question_ids": ["A040", "A011"],
      "video_ids": ["v-03-trinity"],
      "coverage": [
        "grep 在文件里按模式找「行」",
        "sed 按行做替换、删除、打印",
        "awk 按字段处理，带类 C 表达式",
        "三者常串成管道，各管一段"
      ],
      "search_terms": ["Linux 三剑客 grep sed awk 区别", "grep 找行 sed 改行 awk 取列"],
      "must_know": [
        "一句话分工：`grep` 找行、`sed` 改行、`awk` 取列；实际排查日志时通常 `grep` 先过滤、`awk` 再取字段、`sort | uniq -c` 收尾。",
        "`find` 是按条件找「文件」，不读文件内容；`gzip` 是压缩、`sort` 是排序，都不做模式匹配。题目问「在文本文件内按模式查找匹配行」只能是 `grep`。",
        "`awk` 不是简单的取列工具，它有变量、数组、函数、条件与循环，是完整的文本处理语言；题目问「具备较丰富类 C 表达式能力」选 `awk` 而不是 `sed`。"
      ],
      "gaps": "7:41 只做分工演示，awk 的编程能力靠题解补"
    },
    {
      "id": "03-02",
      "topic_id": "03",
      "title": "grep 常用开关：-i、-n、-v、-c、-l",
      "question_ids": ["P029", "P032"],
      "video_ids": ["v-03-grep-basic", "v-03-grep-detail"],
      "coverage": [
        "-i 忽略大小写",
        "-n 输出行号",
        "-v 反向选择，输出不匹配的行",
        "-c 只输出匹配行数",
        "-l 只输出含匹配的文件名"
      ],
      "search_terms": ["grep -i -n -v -c -l 参数", "grep 反向匹配 -v 统计行数 -c"],
      "must_know": [
        "`-n` 是行号、`-c` 是计数，这两个字母最容易被题目对调；`grep -in error file` 才是「忽略大小写 + 显示行号」。",
        "`-v` 取反后统计的是「不匹配行数」，`grep -vc error file` 有意义；`-l` 只给文件名，`-L` 给「不含匹配」的文件名。",
        "多文件时 `-c` 会按文件分别给计数并带文件名前缀，`-h` 可抑制前缀；`-q` 静默，只用退出状态判断有没有匹配。"
      ],
      "gaps": "主视频是单文件演示，多文件 -c/-h 与 -L 的行为靠文字补充"
    },
    {
      "id": "03-03",
      "topic_id": "03",
      "title": "grep 正则：字面量、整行锚定与扩展正则",
      "question_ids": ["P031", "P030", "P033"],
      "video_ids": ["v-03-regex"],
      "coverage": [
        ". 匹配任意字符，字面点号要转义",
        "^ 与 $ 锚定行首行尾",
        "-x 等价于整行精确匹配",
        "-E 才启用 | + ? () 等扩展正则"
      ],
      "search_terms": ["grep 正则 元字符 点号 转义", "grep -E 扩展正则 或", "grep -x 整行匹配"],
      "must_know": [
        "基本正则（BRE）里 `|` 不是「或」，`grep \"cat|dog\" file` 匹配的是字面竖线；要「或」必须 `grep -E \"cat|dog\"` 或 `grep \"cat\\|dog\"`。",
        "`-F` 把整个模式当固定字符串，所有元字符失效，最适合搜含 `.` `*` `[` 的日志片段；`grep -F \"a.b\"`、`grep \"a\\.b\"`、`grep \"a[.]b\"` 三条都能匹配字面的 `a.b`，而 `grep \"a.b\"` 会连 `axb` 一起匹配。",
        "`grep -x \"root\"` 与 `grep \"^root$\"` 等价；`grep \"^root\"` 会命中 `/etc/passwd` 里 `root:x:0:0:...` 这种「以 root 开头」的行。"
      ],
      "gaps": "18:32 讲元字符与数量控制，-F 与 -x 的等价关系靠题解"
    },
    {
      "id": "03-04",
      "topic_id": "03",
      "title": "find 基础：-name 的引号与 -type 组合",
      "question_ids": ["P034", "R06"],
      "video_ids": ["v-03-find-basic"],
      "coverage": [
        "模式加引号，避免 shell 先展开星号",
        "-type f 普通文件、-type d 目录、-type l 符号链接",
        "多个条件默认是「与」",
        "-o 是「或」，混用要加括号"
      ],
      "search_terms": ["find -name 引号 通配符 shell 展开", "find -type f -o -type l 括号"],
      "must_know": [
        "`find /srv -name *.conf` 里星号会被当前 shell 先展开：目录下没有匹配时星号原样传下去「碰巧能用」，一旦有匹配就变成多个 -name 参数而报错。正确写法始终加引号 `find /srv -name \"*.conf\"`。",
        "`-a` 的优先级高于 `-o`：`find /etc -name '*.conf' -type f -o -type l` 实际是 `(-name ... -type f) -o (-type l)`，会把所有符号链接都带出来，与名字无关。",
        "正确写法是 `find /etc -name '*.conf' \\( -type f -o -type l \\)`；括号在 shell 里有特殊含义，必须转义成 `\\( \\)` 或用引号包住。"
      ],
      "gaps": "-o 的优先级与括号没有短视频讲，全靠 must_know"
    },
    {
      "id": "03-05",
      "topic_id": "03",
      "title": "find 条件：-mtime 的取整与 -size 的单位",
      "question_ids": ["P036", "P035"],
      "video_ids": ["v-03-find-cond", "a-03-find-time", "v-03-find-deep"],
      "coverage": [
        "-mtime 以 24 小时为一天向下取整",
        "+n 表示「超过 n 天」，即已满 n+1 个整天",
        "-size 的 + 表示大于",
        "-size 单位 c/k/M/G 的差别"
      ],
      "search_terms": ["find -mtime +7 含义 24小时 取整", "find -size +100M 单位 c k M G"],
      "must_know": [
        "GNU find 先算 `(now - mtime) / 86400` 并截断取整，再比较：`-mtime 7` 是「第 7 个整天」，`-mtime +7` 是「取整后 > 7」，也就是已满约 8 个完整 24 小时。",
        "`-mtime` 单位是天，要精确到分钟用 `-mmin`（`-mmin -60` 是最近一小时）；`-atime`/`-amin` 看访问时间，`-ctime`/`-cmin` 看 inode 状态变更时间。",
        "`-size +100M` 是严格大于 100 MiB；`-size 100M` 是「按 MiB 向上取整后正好等于 100」，也就是落在 (99M, 100M] 这一档；`c` 是字节，`+100c` 只筛出大于 100 字节的文件。"
      ],
      "gaps": "B 站缺讲 -mtime 取整与 -size 档位的短视频；主视频需验收是否含该段落，规则由图文 + must_know 兜底"
    },
    {
      "id": "03-06",
      "topic_id": "03",
      "title": "sed：替换与按行输出",
      "question_ids": ["P037", "P038"],
      "video_ids": ["v-03-sed", "v-03-sed-daily"],
      "coverage": [
        "s/old/new/ 只替换每行第一处",
        "g 标志替换行内全部出现",
        "不加 -i 只输出到屏幕，原文件不变",
        "-n 抑制默认输出，配合 p 只打印指定行"
      ],
      "search_terms": ["sed -n p 打印指定行", "sed s///g 全局替换 -i 不改原文件"],
      "must_know": [
        "`sed \"2,5p\" file` 不加 `-n` 时，每行先被默认打印一次、2~5 行再被 `p` 打一遍，结果是这几行出现两次；只打印一次必须 `sed -n \"2,5p\"`。",
        "`sed -n \"2,5d\"` 什么都不输出：`-n` 关掉了默认输出，`d` 又把这些行删掉。`-n` 与 `p`/`d` 的组合要成对理解。",
        "`g` 是「每行内全部替换」，不是「所有行」——所有行本来就默认处理；要改原文件加 `-i`（`-i.bak` 顺手留备份）。"
      ],
      "gaps": "主视频 5:23 覆盖 -n 与 g，2,5d 这类组合差异靠题解"
    },
    {
      "id": "03-07",
      "topic_id": "03",
      "title": "awk：字段、分隔符与 NR/NF",
      "question_ids": ["P039", "P040"],
      "video_ids": ["v-03-awk", "v-03-awk-intro"],
      "coverage": [
        "-F 指定字段分隔符，默认按空白切分",
        "$1 $3 取第 1、3 个字段，$0 是整行",
        "NR 是到当前为止的记录总数",
        "NF 是当前记录的字段数"
      ],
      "search_terms": ["awk -F 分隔符 $1 NR NF", "awk print 逗号 OFS 输出"],
      "must_know": [
        "awk 脚本必须用单引号包住：`awk -F: \"{print $1,$3}\"` 里的 `$1` 会先被 shell 展开成空，这是最常见的报错来源。",
        "`NR` 累计已读记录数（行号），`FNR` 是当前文件内的行号，处理多文件时两者不同；`NF` 是当前行字段数，`$NF` 是最后一个字段。",
        "`print $1,$3` 的逗号输出 OFS（默认空格）；写成 `print $1$3` 会直接粘在一起。`awk -F: '{print $1,$3}' /etc/passwd` 与 `cut -d: -f1,3` 结果相近，但 awk 还能加条件与计算。"
      ],
      "gaps": "主视频讲 -F 与 $n，FNR 与 OFS 靠文字补充"
    },
    {
      "id": "03-08",
      "topic_id": "03",
      "title": "join：按相同字段合并两个文件",
      "question_ids": ["A042"],
      "video_ids": ["a-03-join"],
      "coverage": [
        "join 以「连接字段相等」为条件合并两文件的行",
        "默认用第一字段、空白作分隔",
        "两个输入都必须已按连接字段排好序",
        "-t 指定分隔符，-1/-2 指定各自的连接字段"
      ],
      "search_terms": ["Linux join 命令 用法 排序", "join -t -1 -2 -a 左连接"],
      "must_know": [
        "`join` 的合并依据是连接字段的内容相等，与 inode 号、修改时间、执行权限都无关。",
        "两个文件必须提前按同一个规则排好序（如 `sort -k1,1`），否则 join 会静默漏配——这是 join 最容易踩的坑。",
        "默认分隔符是空白，冒号分隔要加 `-t:`；连接字段不在第一列时用 `-1` `-2` 指定；`-a1` 保留左表未匹配行，相当于左连接。"
      ],
      "gaps": "B 站没有合适的 join 短视频，本节主资料是中文图文（菜鸟教程）"
    },
    {
      "id": "03-09",
      "topic_id": "03",
      "title": "查看与排序：cut / tail / sort / uniq",
      "question_ids": ["P041", "P044", "P043", "P042"],
      "video_ids": ["v-03-sort", "v-03-cut", "v-03-uniq"],
      "coverage": [
        "cut -d: -f1 按分隔符取字段",
        "tail -n 20 看末尾 20 行，head 看开头",
        "sort 默认字典序，-n 才是数值序",
        "uniq -c 只统计相邻重复行，通常先 sort"
      ],
      "search_terms": ["sort -n 数值排序 字典序", "sort uniq -c 统计重复行", "cut -d -f 与 awk -F 区别"],
      "must_know": [
        "`sort` 默认按字符比较，`2 10 100` 会排成 `10 100 2`；按数值必须 `sort -n`，按可读单位用 `-h`，按列用 `-k`。",
        "`uniq` 只合并相邻的重复行，输入没排序就会漏计；统计每个完整行出现次数的标准写法是 `sort names | uniq -c`。",
        "`tail -20` 是 `tail -n 20` 的老式写法，两者等价；`head -n 20` 是前 20 行；`sed -n \"20p\"` 只打印第 20 行，不是 20 行。",
        "`cut -c1` 按字符位置切而不是按字段；`cut` 不能把「多个连续空格」当一个分隔符，那种场景用 `awk '{print $1}'`。"
      ],
      "gaps": "sort 与 cut 各有短视频，uniq 必须先排序这一点靠 must_know"
    },
    {
      "id": "03-10",
      "topic_id": "03",
      "title": "Vim：模式切换与批量去掉行首注释",
      "question_ids": ["A074", "A033", "A034", "P045", "P046"],
      "video_ids": ["v-03-vim-basic", "v-03-vim-cmd", "v-03-vim-sub"],
      "coverage": [
        "vim 是终端里的交互式编辑器，cat 只输出、grep 只找",
        "普通模式 o 下方新行并进插入模式，O 在上方",
        "x 删除光标处字符，dd 删整行",
        ":wq 保存退出，:q! 不保存退出",
        ":%s/^#// 去掉所有行行首的 #"
      ],
      "search_terms": ["vim o O a A i 插入模式 区别", "vim :%s 行首 注释 替换"],
      "must_know": [
        "普通模式下 `o` 在下方新行、`O` 在上方新行、`i` 光标前插入、`a` 光标后插入、`A` 行尾插入；题目问「下方新开一行」是 `o`。",
        "`:%s/^#//` 里 `%` 是全文件范围、`^#` 只匹配行首的 `#`；`g` 管的是「一行内多处」，而 `^` 每行最多匹配一次，所以 `:%s/^#//g` 结果完全一样。",
        "`#` 在正则里不是元字符，不用转义；`:%s/#//g` 会删掉行内所有 `#`，`:%s/#$//` 删的是行尾的 `#`，都不是「行首一个」。",
        "写盘退出的 Ex 命令是 `:wq`，`:q!` 是不保存强退；写成 `/wq` 是向下搜索 `wq`。改完 `:%s///` 还要 `:wq` 才落盘。"
      ],
      "gaps": "视频讲模式切换，:%s/^#// 与 g 标志的等价性靠题解"
    },
    {
      "id": "04-01",
      "topic_id": "04",
      "title": "Shell 展开：花括号、引号与变量",
      "question_ids": ["A075", "A101", "P047", "P048"],
      "video_ids": ["v-04-quote", "v-04-brace"],
      "coverage": [
        "{1..100} 花括号展开生成序列",
        "单引号内不做任何展开",
        "双引号内做变量展开但不分词",
        "变量含空格时必须加双引号"
      ],
      "search_terms": ["shell 花括号扩展 {1..100}", "shell 单引号 双引号 区别 变量展开"],
      "must_know": [
        "`touch aaa{1..100}` 是 Bash 先把花括号展开成 100 个文件名再交给 touch；`aaa(1..100)` 是语法错误，`aaa[1..100]` 是 glob 字符集匹配，`aaa{1.100}` 用点号不构成序列，会原样传下去。",
        "单引号里一切原样：`echo '$X'` 输出 `$X`；双引号里 `$X` 会展开，但 `*` 不再被 glob 展开。双引号不是「禁止展开」，而是禁止分词与通配。",
        "`path=\"/tmp/a b\"` 时 `cat $path` 会被拆成两个参数而报「No such file」，必须写 `cat \"$path\"`；`cat \"$\"path` 只引用了 `$`，不是正确写法。",
        "`touch {1..20}` 建 20 个文件后，`ls | grep 1 | wc -l` 得 11：`1`、`10`~`19` 都含字符 `1`，grep 是子串匹配而不是整词匹配。"
      ],
      "gaps": "引号部分有 15:52 的视频，花括号只有 1:32 的短视频，展开顺序靠文字补充"
    },
    {
      "id": "04-02",
      "topic_id": "04",
      "title": "位置参数与特殊参数",
      "question_ids": ["P049", "P050"],
      "video_ids": ["v-04-args"],
      "coverage": [
        "$1..$9 是位置参数，$0 是脚本名",
        "$# 是参数个数",
        "\"$@\" 每个参数一个词",
        "\"$*\" 合并成一个词",
        "$$ 是当前 Shell 的 PID"
      ],
      "search_terms": ["shell 位置参数 $@ $* 区别", "shell $# $0 $$ 特殊变量"],
      "must_know": [
        "`\"$@\"` 展开成 N 个独立参数，保留每个参数里的空格；`\"$*\"` 用 IFS 第一个字符（默认空格）拼成一个参数。不加引号时两者都会再分词，差别就消失了。",
        "脚本以 `\"a b\"` 和 `c` 运行时，`\"$@\"` 是 2 个参数，`\"$*\"` 是 1 个参数 `a b c`。这就是题目里 A 对、B 错的判据。",
        "`$0` 是脚本或 Shell 名而不是参数；`$$` 是当前进程 PID；`$#` 是参数个数；`$?` 是上一条命令的退出状态。取第 10 个参数要写 `${10}`。",
        "`shift` 丢掉 $1 并把后面的往前挪，$# 随之减一。"
      ],
      "gaps": "主视频 19:51 已接近 20 分钟上限，$* 与 $@ 的引号差异靠 must_know"
    },
    {
      "id": "04-03",
      "topic_id": "04",
      "title": "命令替换与算术运算",
      "question_ids": ["P057", "P058"],
      "video_ids": ["v-04-ops", "v-04-backtick"],
      "coverage": [
        "$( ) 做命令替换，取命令输出",
        "反引号是旧写法，不能嵌套",
        "$(( )) 做整数算术",
        "算术结果要写回变量"
      ],
      "search_terms": ["shell 命令替换 $( ) 反引号", "shell 算术运算 $(( ))"],
      "must_know": [
        "`year=$(date +%Y)` 才是命令替换；`year=(date +%Y)` 是数组赋值，`year=date +%Y` 是把字符串 `date` 赋给 year 然后执行 `+%Y`。",
        "`n=$((n+1))` 把结果写回 n；`n=\"$n+1\"` 得到字符串 `4+1`，`n=+1` 是把 `+1` 赋给 n，都不做运算。",
        "`$(( ))` 只做整数运算，`$((5/2))` 得 2；要小数用 `bc` 或 awk。`let n++` 与 `((n++))` 是等价写法。",
        "反引号 `` `date` `` 与 `$(date)` 等价，但反引号不能嵌套、转义麻烦，新脚本统一用 `$( )`。"
      ],
      "gaps": "运算符视频讲 $(( )) 与 expr，命令替换由反引号那条补"
    },
    {
      "id": "04-04",
      "topic_id": "04",
      "title": "条件判断：test 与文件测试",
      "question_ids": ["P051", "P052"],
      "video_ids": ["v-04-if", "v-04-if2"],
      "coverage": [
        "[ ] 是 test 的同义词，两侧必须有空格",
        "数值比较用 -gt/-lt/-eq",
        "-f 普通文件、-d 目录、-z 空字符串",
        "[[ ]] 是 Bash 关键字，更安全"
      ],
      "search_terms": ["shell 条件判断 [ ] -f -d -z", "shell 数值比较 -gt -lt"],
      "must_know": [
        "`[ \"$n\" -gt 9 ]` 才是数值比较；`[ \"$n\" > 9 ]` 在 test 里是字符串比较，而且 `>` 会被 shell 当成重定向，实际会在当前目录建一个名为 `9` 的文件。",
        "`[-f /tmp/log]` 缺空格会被当成命令 `[-f`，报 command not found——`[` 本身就是一个命令（`/usr/bin/[`），必须写 `[ -f /tmp/log ]`。",
        "`-f` 普通文件、`-d` 目录、`-e` 存在即可、`-z` 字符串为空、`-n` 非空；`[[ ]]` 支持 `&&`、`=~` 且不做分词，比 `[ ]` 安全。"
      ],
      "gaps": "视频讲 if 与 [ ]，[[ ]] 的差异靠文字补充"
    },
    {
      "id": "04-05",
      "topic_id": "04",
      "title": "脚本执行方式与短路执行",
      "question_ids": ["P060", "P053"],
      "video_ids": ["v-04-exec", "v-04-exitcode"],
      "coverage": [
        "bash script.sh 只要求可读",
        "./script.sh 需要执行位",
        "source 在当前 shell 执行",
        "A && B || C 按退出状态短路"
      ],
      "search_terms": ["shell 脚本 执行方式 bash ./ source 区别", "shell && || 短路 退出状态"],
      "must_know": [
        "`bash script.sh` 是把脚本当参数交给 bash 去读，只要求文件可读；`./script.sh` 需要 `chmod +x` 且有正确的 shebang，否则报 Permission denied。",
        "`A && B || C`：A 成功才执行 B，B 失败再执行 C。所以 A 成功、B 失败时 A、B、C 三条都会跑。它不能当 if-else 用——A 失败时 C 也会执行。",
        "`source script.sh`（或 `. script.sh`）在当前 shell 执行，脚本里的 `cd`、变量赋值会影响当前会话；`bash script.sh` 开子 shell，跑完不影响父 shell。"
      ],
      "gaps": "&& 与 || 没有单独的视频，靠退出状态那条 + must_know"
    },
    {
      "id": "04-06",
      "topic_id": "04",
      "title": "逐行读取与脚本调试",
      "question_ids": ["P059", "P061"],
      "video_ids": ["v-04-read", "a-04-read", "a-04-debug"],
      "coverage": [
        "while IFS= read -r line 原样保留一行",
        "IFS= 要紧挨 read，-r 关闭反斜杠转义",
        "用输入重定向而不是 cat | while",
        "bash -n 只查语法不执行",
        "bash -x 打印执行跟踪"
      ],
      "search_terms": ["shell while read -r IFS 逐行读取", "bash -n -x 调试 语法检查"],
      "must_know": [
        "三个条件缺一不可：`IFS=` 清空字段分隔符以保留首尾空白、`-r` 让反斜杠不被解释、用输入重定向而不是 `cat file | while`（后者让循环在子 shell 里跑，循环内改的变量外面看不到）。",
        "文件最后一行没有换行符时 `read` 返回非零会漏掉，标准写法是 `while IFS= read -r line || [ -n \"$line\" ]`。",
        "`bash -n` 只读不执行，能查出引号不配对这类语法错误，但证明不了逻辑正确；`bash -x` 边跑边打印每条命令（前缀 `+`），会真的执行，所以不保证不改文件。"
      ],
      "gaps": "read 的 IFS= 与 -r 没有合适的中文短视频，主资料是图文；调试也用图文"
    },
    {
      "id": "04-07",
      "topic_id": "04",
      "title": "标准流与重定向顺序",
      "question_ids": ["P055", "U21", "U02", "A055"],
      "video_ids": ["v-04-redirect", "v-04-redirect2"],
      "coverage": [
        "> 覆盖、>> 追加",
        "2>&1 把标准错误指向标准输出当前的目标",
        "重定向从左到右生效，顺序决定结果",
        "&> 与 &>> 是 Bash 简写"
      ],
      "search_terms": ["shell 重定向 2>&1 顺序", "shell &> 与 >> 追加"],
      "must_know": [
        "重定向从左到右生效：`cmd >log 2>&1` 先把 fd1 指向 log，再把 fd2 复制 fd1 的目标，两个流都进 log；`cmd 2>&1 >log` 先把 fd2 指向终端（fd1 当时的目标），再把 fd1 指向 log，结果错误还留在屏幕上。",
        "`cmd &>log` 等价于 `cmd >log 2>&1`；追加版是 `cmd &>>log` 或 `cmd >>log 2>&1`。`cmd >out 2>err` 是两个不同文件，不满足「写入同一个文件」。",
        "`cat file >file.copy &`：`>` 覆盖旧内容、末尾 `&` 放后台；`<` 是输入重定向，`cat file file.copy` 是把两个文件内容都输出到终端。"
      ],
      "gaps": "顺序问题两视频都讲到，但 &> 与 &>> 的简写靠文字补充"
    },
    {
      "id": "04-08",
      "topic_id": "04",
      "title": "管道与退出状态",
      "question_ids": ["P054", "P056"],
      "video_ids": ["v-04-pipe", "v-04-sigpipe"],
      "coverage": [
        "管道只把标准输出接到下一个命令",
        "标准错误不经过管道",
        "默认管道退出状态取最后一个命令",
        "set -o pipefail 让管道返回首个失败命令的状态"
      ],
      "search_terms": ["shell 管道 标准错误 不经过", "set -o pipefail 管道退出状态"],
      "must_know": [
        "`job | wc -l` 里 job 只往 stderr 写，stderr 不经过管道，所以 wc 收到 0 行；要让错误进管道得写 `job 2>&1 | wc -l`。",
        "默认 `$?` 取管道最后一个命令的状态：`false | true` 得 0。开了 `set -o pipefail` 后取最右边那个失败命令的状态，`false | true` 得 1。",
        "pipefail 不改变任何命令本身的实现，只改变管道整体的状态怎么算。管道被 SIGPIPE 杀掉时状态是 128+13=141。"
      ],
      "gaps": "pipefail 的开关动作没有短视频，靠 SIGPIPE 那条 + must_know"
    },
    {
      "id": "04-09",
      "topic_id": "04",
      "title": "后台作业与子 shell",
      "question_ids": ["A046", "P065", "P063", "P064", "P062"],
      "video_ids": ["v-04-jobs", "v-04-jobs2"],
      "coverage": [
        "命令末尾 & 放后台",
        "Ctrl+Z 暂停（SIGTSTP），bg 转后台，fg 回前台",
        "jobs 看当前 shell 的作业",
        "nohup 忽略挂断信号",
        "( ) 在子 shell 执行，不改父 shell 目录"
      ],
      "search_terms": ["linux 作业控制 jobs fg bg ctrl+z", "nohup 后台运行 区别"],
      "must_know": [
        "`&` 只是把作业放到后台，输出仍写当前终端；`nohup` 让进程忽略 SIGHUP，退出登录后继续跑。两者职责不同，所以常写成 `nohup cmd >out 2>&1 &`。",
        "`Ctrl+Z` 发 SIGTSTP 暂停作业，`bg` 让暂停的作业在后台继续，`fg` 拉回前台；`jobs` 只列当前 shell 的作业，`jobs -p` 只输出 PID。",
        "`nohup` 不会「自动把所有输出永久保存」，只是默认把输出重定向到 nohup.out；它也不等于 systemd 托管，进程崩了不会自动拉起。",
        "`( cd /tmp )` 在子 shell 里改目录，父 shell 仍在 /home/me；要改当前目录用 `cd /tmp`，或用不启子 shell 的 `{ cd /tmp; }`（花括号内结尾必须是 `;` 或换行）。"
      ],
      "gaps": "子 shell 与花括号的对比视频未覆盖，靠 must_know"
    },
    {
      "id": "05-01",
      "topic_id": "05",
      "title": "账户数据库：passwd、shadow 与 group",
      "question_ids": ["P066", "A071", "A067"],
      "video_ids": ["v-05-account-db", "v-05-user-mgmt"],
      "coverage": [
        "/etc/passwd 七个字段的含义",
        "第 3 字段 UID、第 4 字段主组 GID",
        "root 的 UID 是 0",
        "密码散列与老化在 /etc/shadow",
        "/etc/group 存组与成员"
      ],
      "search_terms": ["linux /etc/passwd 字段 详解", "etc shadow 密码散列 老化"],
      "must_know": [
        "`/etc/passwd` 七段：1 用户名、2 密码占位（一般是 `x`）、3 UID、4 主组 GID、5 描述 GECOS、6 家目录、7 登录 shell。`lin:x:1001:1002:Lin:/home/lin:/bin/bash` 的第 4 字段 1002 是主组 GID。",
        "root 的 UID 固定为 0；普通用户从 1000 起（RHEL 默认 1000，部分发行版 500 起）；65534 是 nobody。UID 0 才是特权来源，用户名可以随便改。",
        "密码散列、上次改密日期、最短/最长有效期、警告天数、失效日期都在 `/etc/shadow`，只有 root 可读；`/etc/passwd` 里那一列只剩占位符。",
        "`/etc/group` 一行四段：组名:密码占位:GID:成员列表。用户的主组不会出现在成员列表里，只有附加组才写进去。"
      ],
      "gaps": "视频讲字段含义，group 的成员列表规则靠 must_know"
    },
    {
      "id": "05-02",
      "topic_id": "05",
      "title": "创建用户：useradd 选项与 /etc/skel",
      "question_ids": ["R03", "A094", "P069", "P070", "A005"],
      "video_ids": ["v-05-useradd", "v-05-useradd2"],
      "coverage": [
        "useradd -u 指定 UID",
        "-d 指定家目录、-m 真正创建",
        "-s 指定 shell、-G 追加附加组",
        "/etc/skel 是家目录模板",
        "CREATE_HOME 决定默认是否建家目录"
      ],
      "search_terms": ["linux useradd 参数 -u -d -m -s -G", "etc/skel 家目录 模板"],
      "must_know": [
        "`useradd -u 1600 -m -d /opt/lucy lucy`：`-u` 定 UID、`-d` 定路径、`-m` 才真正建目录。只写 `-d` 时是否建目录取决于 `/etc/login.defs` 的 `CREATE_HOME`，题目要求「不依赖默认值」就必须显式 `-m`。",
        "选项对照：`-u` UID、`-g` 主组、`-G` 附加组、`-d` 家目录、`-s` shell、`-m` 建家目录、`-c` 注释。所以「家目录 / shell / 附加组」是 `-d -s -G`；`-h` 不是 useradd 的选项。",
        "新家目录的内容从 `/etc/skel` 复制（`.bashrc`、`.bash_profile` 等）；默认 shell、UID 范围、是否建家目录由 `/etc/default/useradd` 与 `/etc/login.defs` 决定。",
        "`smbpasswd -a alice` 只是给已存在的 Unix 账户加 Samba 密码，不会自动建 Linux 账户，也不会建家目录。"
      ],
      "gaps": "视频覆盖主要选项，-G 与 -g 的区别、smbpasswd 靠文字补"
    },
    {
      "id": "05-03",
      "topic_id": "05",
      "title": "删除用户与 UID 复用",
      "question_ids": ["P074", "P075"],
      "video_ids": ["v-05-userdel", "v-05-userdel2"],
      "coverage": [
        "userdel 删账户记录",
        "-r 才删家目录与邮件池",
        "别处的文件不会被清",
        "删除后 UID 可能被新用户复用"
      ],
      "search_terms": ["linux userdel -r 删除用户 家目录", "删除用户 UID 复用 遗留文件"],
      "must_know": [
        "`userdel lin` 只删 `/etc/passwd`、`/etc/shadow`、`/etc/group` 里的记录，家目录和散落各处的文件都还在；`userdel -r lin` 才顺带删家目录与邮件池（`/var/spool/mail/lin`）。",
        "即使加了 `-r`，也只处理家目录和邮件池，`/data` 这类其他位置的文件不会被扫描删除。",
        "文件属主存的是数值 UID 而不是用户名。删掉 lin 后 `/data` 里 UID 1001 的文件成了「孤儿」；新用户如果又分到 1001，就直接成为这些文件的属主。所以删用户前要先处理遗留文件，或保留该 UID 不再分配。",
        "想「停用」而不是删除，用 `usermod -L` 锁密码或 `chage -E 0` 立即过期，不要删账户。"
      ],
      "gaps": "UID 复用的内核层面原因没有视频，靠 must_know"
    },
    {
      "id": "05-04",
      "topic_id": "05",
      "title": "主组、附加组与身份查询",
      "question_ids": ["U03", "P067", "P068"],
      "video_ids": ["v-05-groups", "v-05-usermod"],
      "coverage": [
        "主组是 passwd 里的 GID，只有一个",
        "附加组可以有多个，记在 /etc/group",
        "usermod -aG 追加、-G 覆盖、-g 改主组",
        "id 与 getent 查身份"
      ],
      "search_terms": ["linux 主组 附加组 usermod -aG", "id getent passwd 查询用户"],
      "must_know": [
        "`usermod -G engineering alice` 是**覆盖**全部附加组，只留 engineering；要保留原有组必须写 `-aG`（append）。这是本节最容易错的一处。",
        "`-g` 改主组（单个值），`-G` 改附加组（逗号分隔的列表），`-aG` 追加附加组；`groupdel` 是删组，与用户无关。",
        "`id lin` 一次看 UID、主组 GID、所属全部组；`getent passwd lin` 查账户库（会走 NSS，LDAP/SSSD 用户也能查到，比直接 `cat /etc/passwd` 可靠）；`getent group 组名` 查组成员。`hostname lin` 是改主机名，与账户无关。"
      ],
      "gaps": "getent 与 cat /etc/passwd 的区别靠文字补充"
    },
    {
      "id": "05-05",
      "topic_id": "05",
      "title": "密码设置与锁定",
      "question_ids": ["A070", "R05"],
      "video_ids": ["v-05-passwd", "v-05-passwd2"],
      "coverage": [
        "passwd 改自己的密码",
        "root 可重置他人密码",
        "passwd -l 锁定密码认证",
        "锁密码不等于封所有认证方式"
      ],
      "search_terms": ["linux passwd -l 锁定用户", "passwd 修改密码 root 重置"],
      "must_know": [
        "`passwd` 改当前账户密码；root 执行 `passwd alice` 可重置别人密码且不校验旧密码。`pwd` 是打印当前目录，不是改密码。",
        "`passwd -l lily` 是在 shadow 的散列前加 `!`，让密码认证失败；`-u` 解锁，`-d` 清空密码（很危险）。",
        "锁定只挡「密码」这一条路：SSH 公钥、已建立的会话、sudo 免密、其他 PAM 认证都可能照旧。要彻底停用账户得配合 `usermod -L`、`chage -E 0`，必要时再清会话。",
        "`passwd -e lin` 把密码设为立即过期、强制下次登录改密，与 `chage -d 0 lin` 等价。"
      ],
      "gaps": "锁定不封 SSH 密钥这一点视频未讲，靠 must_know"
    },
    {
      "id": "05-06",
      "topic_id": "05",
      "title": "密码老化：chage 六个选项",
      "question_ids": ["R04", "P072", "U04", "P073", "P071"],
      "video_ids": ["v-05-chage"],
      "coverage": [
        "-m 最短使用天数、-M 最长有效天数",
        "-W 过期前警告天数",
        "-I 密码过期后停用天数",
        "-E 账户过期日期",
        "-d 0 强制下次改密"
      ],
      "search_terms": ["linux chage 密码老化 -m -M -W -I -E", "chage -d 0 强制改密"],
      "must_know": [
        "四个最常混的选项：`-m` 两次改密的最小间隔、`-M` 密码最长有效天数、`-W` 过期前警告天数、`-I` 密码过期后还能登录的宽限天数。题目问「过期 3 天后停用」是 `-I 3`。",
        "`-E` 是**账户**过期日期（`YYYY-MM-DD` 或天数），`-I` 是密码过期后的宽限天数；两者都会导致不能登录，但 `-E 2026-12-31` 是到那天账户整体失效。",
        "`chage -d 0 lin` 把「上次改密日期」设为 0，效果是下次登录必须改密；`passwd -e lin` 等价。`chage -l lin` 只是查看。",
        "`chage -m 2 -M 90 -W 5 alice` 顺序是最小 / 最长 / 警告；写成 `-M 2 -m 90` 会直接报错，因为最短间隔不能大于最长有效期。"
      ],
      "gaps": "主视频 11:34 覆盖全部选项，本节不再叠补充视频"
    },
    {
      "id": "05-07",
      "topic_id": "05",
      "title": "登录 shell 与 su 环境",
      "question_ids": ["R13", "P078", "P079"],
      "video_ids": ["v-05-su-sudo", "v-05-su"],
      "coverage": [
        "/sbin/nologin 只挡交互式登录",
        "su lin 保留当前环境",
        "su - lin 走完整登录",
        "wheel 组不等于已授权 sudo"
      ],
      "search_terms": ["linux su - 区别 登录环境", "sbin/nologin 禁止登录 wheel"],
      "must_know": [
        "`useradd -s /sbin/nologin sarah` 让 sarah 无法用交互式 shell 登录（FTP、邮件等仍可用），但不会删凭据，也不会禁用该身份在所有应用里的权限。",
        "`su lin` 只切用户，保留当前环境变量与工作目录；`su - lin`（等价 `su -l`）模拟完整登录，重置环境、切到家目录、执行登录脚本。",
        "wheel 只是很多发行版 sudoers 里预设的组名，能不能 sudo 取决于 `/etc/sudoers` 里有没有 `%wheel ALL=(ALL) ALL`；光加组不等于授权。",
        "用户被加进新组后，已登录会话的组列表不会自动刷新（进程启动时就确定了），要重新登录或 `newgrp` 才生效。"
      ],
      "gaps": "nologin 的边界（不影响 FTP 等）靠文字补充"
    },
    {
      "id": "05-08",
      "topic_id": "05",
      "title": "sudo 与 visudo",
      "question_ids": ["P076", "P077"],
      "video_ids": ["v-05-sudoers", "v-05-sudo-why"],
      "coverage": [
        "visudo 编辑 sudoers 并检查语法",
        "sudo 只提升命令本身",
        "重定向由原 shell 完成",
        "写文件用 sudo tee 或 sudo sh -c"
      ],
      "search_terms": ["visudo sudoers 配置 语法检查", "sudo 重定向 权限不足 tee"],
      "must_know": [
        "`visudo` 会在保存时做语法检查并加锁，避免把 sudoers 改坏导致所有人都不能 sudo；直接 `vim /etc/sudoers` 一旦语法错，sudo 就废了。",
        "`sudo echo ok > /root/out` 里，`>` 是**当前 shell** 在启动 sudo 之前就打开的，那时还是普通用户身份，所以报权限不足——sudo 只提升了 echo。",
        "正确写法：`echo ok | sudo tee /root/out`，或 `sudo sh -c 'echo ok > /root/out'`，让重定向在 root 的 shell 里做。"
      ],
      "gaps": "重定向执行者这一条没有视频讲，靠 must_know"
    },
    {
      "id": "06-01",
      "topic_id": "06",
      "title": "权限位：三类主体与 rwx 顺序",
      "question_ids": ["A045", "A089", "A007"],
      "video_ids": ["v-06-who", "v-06-perm-str"],
      "coverage": [
        "权限串十位 = 1 位类型 + 3 组权限",
        "依次是属主、属组、其他",
        "rwx 顺序固定，缺位用 - 占位"
      ],
      "search_terms": ["linux ls -l 权限串 九位 含义", "文件权限 属主 属组 其他人"],
      "must_know": [
        "`ls -l` 权限串十位：第 1 位是类型（`-` 普通文件、`d` 目录、`l` 链接、`c` 字符设备、`b` 块设备、`p` 管道、`s` socket），后面每 3 位一组，依次是属主、属组、其他。",
        "每组内 rwx 顺序固定，缺哪个就用 `-` 占位，所以 `rw-r-----` 的组和其他仍然是三位（`r--`、`---`）。",
        "三类主体只有属主（u）、所属组（g）、其他用户（o），没有「进程号」这种主体；`a` 或 `ugo` 表示三类一起操作。"
      ],
      "gaps": "视频讲三类主体，十位串的类型位靠文字补"
    },
    {
      "id": "06-02",
      "topic_id": "06",
      "title": "数字换算与 chmod",
      "question_ids": ["P080", "A024", "P081"],
      "video_ids": ["v-06-chmod", "v-06-octal"],
      "coverage": [
        "r=4 w=2 x=1，三位相加",
        "640 换算成 rw-r-----",
        "符号模式 + - = 与 u/g/o/a",
        "chmod g+w 只在组位加写"
      ],
      "search_terms": ["linux chmod 数字 权限 换算", "chmod 符号模式 u+x g-w"],
      "must_know": [
        "数字法：r=4、w=2、x=1，每组三位相加。640 = 6(rw-) 4(r--) 0(---) → `rw-r-----`；551 = 5(r-x) 5(r-x) 1(--x) → `-r-xr-x--x`。",
        "符号法 `chmod g+w file` 只在组位上「加」写权限，其他位不动：640（`rw-r-----`）→ 660（`rw-rw----`）。",
        "`=` 是覆盖该组全部位，`+`/`-` 是增删；`chmod a+x` 等价 `chmod +x`，`chmod u=rwx,g=rx,o=` 一次设完三组。",
        "目录上 `x` 表示可进入，所以 `chmod -R 644 dir` 会让目录进不去，是常见误操作。"
      ],
      "gaps": "两种写法都有视频，符号模式对特殊位的影响靠题解"
    },
    {
      "id": "06-03",
      "topic_id": "06",
      "title": "所有权与硬链接权限联动",
      "question_ids": ["A039", "P096"],
      "video_ids": ["v-06-chown", "v-06-chown2"],
      "coverage": [
        "chown 改属主，chgrp 改属组",
        "只有 root 能把文件给别的用户",
        "硬链接共享 inode，权限也共享"
      ],
      "search_terms": ["linux chown chgrp 属主 属组", "硬链接 chmod 权限 同步 inode"],
      "must_know": [
        "`chown lin file` 改属主，`chown lin:dev file` 同时改属主与属组，`chgrp` 只改属组；`chmod` 只改权限位，不改归属。",
        "普通用户只能把属组改成自己所属的组，改属主必须 root（或具备 CAP_CHOWN）。",
        "权限位存在 inode 里，`a` 与 `b` 是同一 inode 的两个硬链接，对 `a` 执行 `chmod 600` 后 `b` 也是 600——不是「同步」，而是同一个对象。",
        "符号链接自己的权限位在 Linux 上恒为 777 且无意义，真正生效的是目标文件的权限。"
      ],
      "gaps": "硬链接共享 inode 导致权限联动这一条没有视频，靠 must_know"
    },
    {
      "id": "06-04",
      "topic_id": "06",
      "title": "目录权限：r/w/x 与删除文件",
      "question_ids": ["R08", "P083", "P082"],
      "video_ids": ["v-06-ten", "a-06-dir-perm"],
      "coverage": [
        "目录 r 列名字、w 改目录项、x 进入穿越",
        "删除文件看父目录 w+x",
        "只有 r 没有 x 时进不去"
      ],
      "search_terms": ["linux 目录权限 rwx 含义", "删除文件 需要父目录写权限"],
      "must_know": [
        "目录的 r=列出条目名、w=增删改名条目、x=进入与按名访问，三者独立。774 的 other 位是 4（只有 r），能 `ls` 看到名字，但没有 x 就无法 `cd` 进去、也读不到内部文件内容。",
        "删除或改名一个文件，取决于**父目录**的 w+x，与文件本身的权限无关（只读文件照样能被删）。这就是「目录写权限比文件写权限更危险」的原因。",
        "只有 x 没有 r 时，知道确切文件名仍能访问（`cat dir/known.txt`），但不能列目录。",
        "目录的 x 不是「执行目录文件」，而是「穿越 / 查找」权限。"
      ],
      "gaps": "主视频 17:00 讲十位串，目录语义靠图文 + must_know 补"
    },
    {
      "id": "06-05",
      "topic_id": "06",
      "title": "umask 与新建对象的默认权限",
      "question_ids": ["P084", "P085"],
      "video_ids": ["v-06-umask", "v-06-umask2"],
      "coverage": [
        "umask 是「掩掉」的位，不是减法",
        "文件基准 666、目录基准 777",
        "umask 027 → 文件 640、目录 750",
        "只影响之后新建的对象"
      ],
      "search_terms": ["linux umask 默认权限 计算", "umask 027 文件 640 目录 750"],
      "must_know": [
        "计算是按位「去掉」而不是直接减：文件 666 & ~027 = 640；目录 777 & ~027 = 750。",
        "文件基准永远是 666（新建文件默认不给 x），目录基准是 777，这是 umask 公式里最容易记错的前提。",
        "umask 只影响之后创建的对象，改 umask 不会回头 chmod 已有文件；父目录有 default ACL 时，新对象权限还要和 ACL 一起算，不能只用 umask 公式断定。",
        "`umask` 不带参数显示当前值（0022），`umask -S` 用符号显示；写进 `~/.bashrc` 或 `/etc/profile` 才持久。"
      ],
      "gaps": "按位取反的算法视频有讲，default ACL 干扰 umask 公式靠 must_know"
    },
    {
      "id": "06-06",
      "topic_id": "06",
      "title": "ACL：getfacl、setfacl 与 mask 判定",
      "question_ids": ["P086", "A090", "P089", "P087", "A004", "P088"],
      "video_ids": ["v-06-acl", "v-06-acl2"],
      "coverage": [
        "setfacl -m u:lin:rw 给指定用户加权限",
        "getfacl 看条目与 mask",
        "mask 是命名用户与命名组的上限",
        "ls -l 组位显示 mask，末尾带 +",
        "属主项匹配后不回退 other"
      ],
      "search_terms": ["linux ACL setfacl -m u: 命名用户", "ACL mask 权限判定 顺序"],
      "must_know": [
        "`setfacl -m u:lin:rw file`：`-m` 修改、`u:` 命名用户、`rw` 权限；`-x` 删指定条目，`-b` 清全部 ACL，`-k` 只清默认 ACL。",
        "判定顺序：属主 → 命名用户 → 组（含命名组）→ other，命中即停、不再往下回退。所以属主项是 `---` 时，即使 other 是 `r--`，属主也读不了。",
        "mask 是命名用户、命名组、属组三类条目的权限上限，实际权限 = 条目权限 & mask。`user:lin:rw-` 遇到 `mask::r--` 实际只剩 `r--`；属主项 `user::` 不受 mask 限制。",
        "有扩展 ACL 时 `ls -l` 的组位显示的是 mask 而不是属组权限，权限串末尾多一个 `+`；要看真实条目必须 `getfacl`。"
      ],
      "gaps": "mask 的判定顺序视频提到但未展开，靠 must_know 兜底"
    },
    {
      "id": "06-07",
      "topic_id": "06",
      "title": "默认 ACL 与继承",
      "question_ids": ["P090", "P091"],
      "video_ids": ["a-06-default-acl", "a-06-setfacl"],
      "coverage": [
        "setfacl -d 设默认 ACL，只对目录有效",
        "只影响之后新建的对象",
        "-b 清全部、-k 只清默认",
        "创建时的 mode 仍限制结果"
      ],
      "search_terms": ["setfacl -d 默认ACL 继承", "setfacl -b 与 -k 区别"],
      "must_know": [
        "`setfacl -d -m g:dev:rwx /shared` 给目录设默认 ACL；`-d` 只能用在目录上，对普通文件会报错。",
        "默认 ACL 只对**之后新建**的子项生效，已有文件不会被追溯；新建的子目录会同时继承一份属于自己的 default 条目。",
        "`setfacl -k dir` 只删默认 ACL、保留访问 ACL；`setfacl -b dir` 把访问 ACL 和默认 ACL 全清掉；两者都不会删目录内容。",
        "继承不是无条件的：创建时请求的 mode 与 umask 仍参与，最终权限取「继承项」与「mode 允许位」的交集，所以常要配合 `umask 002`。"
      ],
      "gaps": "B 站没有讲默认 ACL 继承的合适短视频，本节主资料是中文图文"
    },
    {
      "id": "06-08",
      "topic_id": "06",
      "title": "SUID 与有效 UID",
      "question_ids": ["R07", "P094"],
      "video_ids": ["v-06-suid"],
      "coverage": [
        "SUID 让进程 euid 变成文件属主",
        "只对可执行文件有意义",
        "小写 s 表示执行位也在，大写 S 表示缺执行位"
      ],
      "search_terms": ["linux SUID 有效用户 ID euid", "ls -l 大写 S 小写 s 区别"],
      "must_know": [
        "SUID 位让程序运行时的 euid 变成**文件属主**的 UID。`/usr/bin/passwd` 属主是 root，普通用户运行它时 euid=0，才能写 `/etc/shadow`。",
        "SUID 只对可执行文件有意义；对目录设 SUID 在 Linux 上会被忽略（有目录语义的是 SGID）。",
        "显示规则：`s` 表示「执行位 + 特殊位」都在，`S` 表示设了特殊位但执行位没设（此时特殊位不生效）。`rws` 是 SUID 且可执行，`rwS` 是 SUID 但不可执行。",
        "挂载了 `nosuid` 的文件系统上 SUID 不生效；脚本的 SUID 位被内核忽略。"
      ],
      "gaps": "大写 S 小写 s 的对照靠 must_know，视频只演示 s"
    },
    {
      "id": "06-09",
      "topic_id": "06",
      "title": "SGID：目录继承属组",
      "question_ids": ["P093", "U05", "P095", "P097"],
      "video_ids": ["v-06-special-perm", "v-06-sgid"],
      "coverage": [
        "目录 SGID 让新建文件继承目录属组",
        "只管属组，不补权限位",
        "drwxrws--- 的 s 在组位"
      ],
      "search_terms": ["linux SGID 目录 继承属组 2770", "drwxrws 组权限 s 含义"],
      "must_know": [
        "目录设 SGID（2770）后，里面新建的文件和子目录的属组自动变成目录的属组，而不是创建者的主组——这是团队共享目录的标准做法。",
        "SGID **只管属组继承，不会补权限位**：umask 没给组写，新文件仍然没有组写权限。要协作还得配 `chmod g+w` 或 default ACL。",
        "`drwxrws---` 里组位的 `s` 就是 SGID：组有 rwx 且设了 SGID 显示 `s`，组没有 x 时显示 `S`。",
        "对**文件**设 SGID 是另一回事：程序运行时 egid 变成文件属组。只有对目录才是「继承组」。"
      ],
      "gaps": "SGID 不补组写这一点视频未强调，靠 must_know"
    },
    {
      "id": "06-10",
      "topic_id": "06",
      "title": "Sticky bit：共享目录防误删",
      "question_ids": ["P092"],
      "video_ids": ["v-06-special"],
      "coverage": [
        "sticky 限制删除/改名他人文件",
        "典型例子 /tmp 的 1777",
        "只对目录有效"
      ],
      "search_terms": ["linux sticky bit 粘滞位 1777", "/tmp 为什么是 1777"],
      "must_know": [
        "sticky bit（目录 1777，如 `/tmp`）让目录里的文件只有**文件属主、目录属主或 root** 能删除或改名，其他人即使有目录写权限也不行。",
        "它只限制「删除与改名」，不限制创建和读取；`drwxrwxrwt` 末尾的 `t` 就是 sticky（没有 x 时显示 `T`）。",
        "sticky 对普通文件在 Linux 上没有定义语义（历史上曾表示「驻留交换区」），只对目录有意义。"
      ],
      "gaps": "3:31 的演示视频覆盖用法，谁有删除权的判定细节靠 must_know"
    },
    {
      "id": "07-01",
      "topic_id": "07",
      "title": "进程状态与 CPU 瓶颈",
      "question_ids": ["A019", "A021", "P102"],
      "video_ids": ["v-07-proc-state"],
      "coverage": [
        "状态码 R/S/D/T/Z 的含义",
        "Z 僵尸 = 已退出但父进程未回收",
        "CPU 饱和看持续满载与运行队列积压",
        "用途分类与调度状态是两个维度"
      ],
      "search_terms": ["linux 进程状态 Z 僵尸 D 不可中断", "CPU 瓶颈 运行队列 负载"],
      "must_know": [
        "状态码：`R` 运行/就绪、`S` 可中断睡眠、`D` 不可中断睡眠（多在等 I/O）、`T` 暂停、`Z` 僵尸。题目里 `Z` 是「已退出、父进程还没读退出状态」，不是「正在后台运行」。",
        "「交互 / 批处理 / 守护」是按用途分类，与「就绪 / 运行 / 阻塞」这种调度状态不是一个维度；问「更像调度状态」应选就绪。",
        "CPU 是否饱和要看**持续满载 + 运行队列积压**（`top` 里 `%us`+`%sy` 长期很高、`vmstat` 的 `r` 列持续大于核数）。load average 也统计 `D` 状态，单看它会把 I/O 阻塞误判成 CPU 瓶颈；某一分钟 50%、偶发 30% 更不能说明问题。"
      ],
      "gaps": "15:26 那条待验收，预计覆盖 Z 与 D 状态；负载判断口径靠 must_know"
    },
    {
      "id": "07-02",
      "topic_id": "07",
      "title": "观察工具与 nice 优先级",
      "question_ids": ["P098", "P099", "P101"],
      "video_ids": ["v-07-ps", "v-07-top"],
      "coverage": [
        "ps -eo 自定义输出列",
        "top 交互、free 内存、uptime 负载",
        "nice 值越大优先级越低"
      ],
      "search_terms": ["linux ps -eo pid,ppid,comm", "linux nice 值 优先级 含义"],
      "must_know": [
        "`ps -eo pid,ppid,comm`：`-e` 所有进程、`-o` 自定义列；`ps -p` 是按 PID 选进程，不接受列名。`jobs` 看 shell 作业、`free` 看内存，都不带 `-eo`。",
        "`comm` 只给可执行文件名（超长会截断），要看完整命令行用 `args`（即 `cmd`），如 `ps -eo pid,args`。",
        "`top` 交互看进程与负载、`free -h` 看内存概要、`uptime` 看运行时间与 1/5/15 分钟负载；`df -h` 是磁盘用量，不显示进程 CPU。",
        "nice 值范围 -20～19，**值越大优先级越低**。普通用户只能调高（降低优先级），要调低必须 root；`nice -n 10 cmd` 启动时设置，`renice` 改运行中的进程。"
      ],
      "gaps": "ps、top 各有一条候选视频待验收；nice 与 free/uptime 的对照靠 must_know"
    },
    {
      "id": "07-03",
      "topic_id": "07",
      "title": "信号：Ctrl+C、TERM 与 KILL",
      "question_ids": ["A008", "P100"],
      "video_ids": ["v-07-kill"],
      "coverage": [
        "Ctrl+C 发 SIGINT",
        "SIGTERM 可被捕获，留善后机会",
        "SIGKILL 不可捕获、不可忽略",
        "D 状态进程连 KILL 也杀不掉"
      ],
      "search_terms": ["linux SIGTERM SIGKILL 区别", "ctrl+c 发送什么信号"],
      "must_know": [
        "终端里 `Ctrl+C` 向前台进程组发 SIGINT（2），`Ctrl+Z` 发 SIGTSTP（20）暂停，`Ctrl+\\` 发 SIGQUIT。",
        "SIGTERM（15）是「请求退出」，程序可以捕获并善后；SIGKILL（9）由内核直接终止，不能被捕获或忽略。",
        "处于不可中断睡眠（`D`）的进程连 SIGKILL 也杀不掉，只能等它从内核态返回或重启——这就是「SIGKILL 保证 D 状态进程立即退出」错在哪。",
        "`kill -l` 列信号编号；`kill -9 PID` 与 `kill -KILL PID` 等价。"
      ],
      "gaps": "Ctrl+C/SIGINT 没有搜到合适的中文短视频，终端按键与信号的对应关系靠 must_know；SIGKILL 与 D 状态的边界由 13:33 那条带（待验收）"
    },
    {
      "id": "07-04",
      "topic_id": "07",
      "title": "systemd 服务：active 与 enabled",
      "question_ids": ["P103", "P104", "U15", "P105"],
      "video_ids": ["v-07-systemctl"],
      "coverage": [
        "active 是当前运行状态",
        "enabled 是开机启用关系",
        "两者独立，互不证明",
        "disable --now 与 enable --now",
        "mask 阻止启动但不自动停止"
      ],
      "search_terms": ["systemctl enable --now 区别", "systemctl mask 作用"],
      "must_know": [
        "`active`（运行中）与 `enabled`（开机自启）是两个独立维度：可以 active 但 disabled，也可以 enabled 但已停止。凡是说「必然证明」另一方的都错。",
        "`systemctl disable --now demo` = disable + stop；`enable --now` = enable + start。两个 `--now` 方向相反，最容易记混。",
        "`systemctl mask demo` 把单元链到 `/dev/null`，阻止任何常规启动（包括被依赖拉起），但**不会**停掉已运行的实例，要停还得 `stop`；`unmask` 解除。"
      ],
      "gaps": "mask 的机制待验收，靠 must_know 兜底"
    },
    {
      "id": "07-05",
      "topic_id": "07",
      "title": "单元重载、target 与用户服务",
      "question_ids": ["P106", "P107", "U09"],
      "video_ids": ["v-07-target", "v-07-unit"],
      "coverage": [
        "daemon-reload 重读单元文件",
        "reload 让服务自己重载应用配置",
        "multi-user.target 是多用户文本环境目标",
        "linger 让用户管理器未登录也运行"
      ],
      "search_terms": ["systemctl daemon-reload 与 reload 区别", "loginctl enable-linger 用户服务"],
      "must_know": [
        "改了 `.service` 文件本身（ExecStart、依赖等）必须 `systemctl daemon-reload`；它只让管理器重读单元，**不重启进程**，新配置也不会自动作用到已运行实例。",
        "`systemctl reload demo` 是让服务按自己的规则重载应用配置（如 nginx 的 reload），服务不支持会报错；它读的是服务的配置文件，不是单元文件，所以替代不了 daemon-reload。",
        "`multi-user.target` 聚合多用户文本环境所需单元，相当于旧运行级别 3；`graphical.target` 对应 5。",
        "普通用户的 `systemctl --user` 单元默认只在登录期间运行；`loginctl enable-linger 用户名` 让用户管理器在未登录时也启动，用户单元才能常驻。"
      ],
      "gaps": "linger 没有中文短视频，靠 must_know"
    },
    {
      "id": "07-06",
      "topic_id": "07",
      "title": "journal 日志：按单元、按启动、按时间",
      "question_ids": ["P108", "P109", "P110"],
      "video_ids": ["v-07-journalctl"],
      "coverage": [
        "journalctl -u 按单元过滤",
        "-b 本次启动、-b -1 上次启动",
        "-f 跟随、--since 按时间",
        "默认不持久化，重启即丢"
      ],
      "search_terms": ["journalctl -u -b 用法", "journald 持久化 /var/log/journal"],
      "must_know": [
        "`journalctl -b -u demo.service`：`-b` 限本次启动、`-u` 限该单元；`-f` 是跟随（类似 `tail -f`），不是过滤条件。",
        "`-b -1` 取上一次启动的日志，前提是那次记录还在；`--since \"2026-10-21 00:00:00\"` 按起始时间过滤。",
        "journald 默认 `Storage=auto`：只有 `/var/log/journal` 目录存在时才落盘持久化，否则写 `/run/log/journal`（内存），重启即丢；要跨重启保留就 `mkdir /var/log/journal` 或设 `Storage=persistent`——这正是 `-b -1` 查不到记录时的首要排查方向。",
        "`-u` 是 unit 不是 UID；按用户 UID 过滤用 `_UID=`，按「用户级单元」过滤用 `--user-unit=`（不是按用户名查）。"
      ],
      "gaps": "持久化配置待验收，靠 must_know 兜底"
    },
    {
      "id": "07-07",
      "topic_id": "07",
      "title": "cron 五字段与个人任务",
      "question_ids": ["A047", "U14", "P111"],
      "video_ids": ["v-07-cron"],
      "coverage": [
        "五字段：分 时 日 月 周",
        "每天 23:00 写作 0 23 * * *",
        "日与周同时受限时是「或」关系"
      ],
      "search_terms": ["crontab 五个字段 顺序", "cron 日 星期 同时限制 或"],
      "must_know": [
        "个人 crontab 五字段顺序：分钟 小时 日 月 星期（0 和 7 都是周日），后面直接跟命令，**没有用户名、没有年份、没有秒**。",
        "每天 23:00 是 `0 23 * * *`；写成 `23 0 * * *` 就成了每天 00:23。`/etc/crontab` 那种系统级写法才多一个用户名字段。",
        "「日」和「星期」两个字段都受限（都不是 `*`）时，cron 是**或**关系：任一满足就触发。",
        "`*/5` 每 5 个单位、`1-5` 范围、`1,15` 枚举；`@daily`、`@reboot` 是宏。"
      ],
      "gaps": "日与周的「或」语义待验收，靠 must_know 兜底"
    },
    {
      "id": "07-08",
      "topic_id": "07",
      "title": "cron 环境、系统级 crontab 与 at",
      "question_ids": ["P113", "P112", "A059"],
      "video_ids": ["v-07-cron-basic", "v-07-cron-run"],
      "coverage": [
        "cron 环境精简，PATH 很短",
        "用绝对路径或自己设 PATH",
        "系统 crontab 多一个用户字段",
        "at 一次性、cron 周期性"
      ],
      "search_terms": ["cron 找不到命令 PATH 环境变量", "/etc/crontab 用户字段"],
      "must_know": [
        "cron 不继承交互 shell 的环境：PATH 通常只有 `/usr/bin:/bin`，`~/.bashrc` 也不会被读。手动能跑、cron 报 command not found，先查 PATH——脚本里写绝对路径或开头 `PATH=/usr/local/bin:/usr/bin:/bin`。",
        "`/etc/crontab` 与 `/etc/cron.d/*` 在时间字段后多一个**执行用户**字段；`crontab -e` 的个人任务没有这个字段。",
        "`at` 是一次性任务（`at now +1 hour`、`atq` 查、`atrm` 删），cron 是周期性任务；`at` 需要 atd 服务在跑。",
        "cron 命令里的 `%` 有特殊含义（表示换行），要写成 `\\%`。"
      ],
      "gaps": "PATH 问题待验收，靠 must_know 兜底"
    },
    {
      "id": "07-09",
      "topic_id": "07",
      "title": "systemd timer 定时器",
      "question_ids": ["P114", "P115", "P116"],
      "video_ids": ["v-07-timer"],
      "coverage": [
        "timer 与同名 service 自动关联",
        "OnCalendar / OnBootSec / OnUnitActiveSec",
        "Persistent 补跑错过的任务"
      ],
      "search_terms": ["systemd timer OnCalendar Persistent", "timer 默认关联 同名 service"],
      "must_know": [
        "`backup.timer` 没写 `Unit=` 时默认激活同名的 `backup.service`，不是 target 也不是 cron。",
        "`OnCalendar=` 用墙上日历时间（如 `*-*-* 03:00:00`），`OnBootSec=` 是相对系统启动的单调时间，`OnUnitActiveSec=` 是相对该单元上次激活的时间；`OnCalendar` 不是「自启动以来的秒数」。",
        "`Persistent=true` 在恢复后补触发**一次**错过的日历任务，不逐次重放；补跑时间记在 `/var/lib/systemd/timers/`。",
        "`systemctl list-timers` 看下次触发时间；`enable --now backup.timer` 才真正启用。"
      ],
      "gaps": "Persistent 的补跑行为待验收，靠 must_know 兜底"
    },
    {
      "id": "07-10",
      "topic_id": "07",
      "title": "chrony 时间同步诊断",
      "question_ids": ["P117"],
      "video_ids": ["v-07-chrony", "v-07-chrony2"],
      "coverage": [
        "chronyc tracking 看同步概况与偏移",
        "chronyc sources 看时间源与选择状态",
        "chronyd 是守护进程"
      ],
      "search_terms": ["chronyc tracking sources 区别", "chrony 时间同步 配置"],
      "must_know": [
        "`chronyc tracking` 看本机当前跟踪的时间源、偏移、频率偏差等概况；`chronyc sources -v` 看所有配置的时间源及 `^*`（当前选中）等状态标记。",
        "`chronyc` 是查询/控制客户端，`chronyd` 才是后台守护进程，配置在 `/etc/chrony.conf`。",
        "`timedatectl` 看时区与 NTP 开关，`timedatectl set-ntp true` 启用同步；改时区是 `timedatectl set-timezone`。",
        "这两个 chronyc 子命令都不改时区、不删时间源。"
      ],
      "gaps": "tracking 与 sources 的输出字段待验收，靠 must_know 兜底"
    },
    {
      "id": "08-01",
      "topic_id": "08",
      "title": "从仓库装包：dnf install 与包名",
      "question_ids": ["A076", "A078", "A081"],
      "video_ids": ["v-08-dnf-install", "v-08-yum-dnf"],
      "coverage": [
        "dnf install 包名 = 从启用仓库装",
        "httpd 是 Apache 的包名",
        "tigervnc-server 是 VNC 服务端包名",
        "dnf 从仓库解析并补齐依赖"
      ],
      "search_terms": ["dnf install 软件包 命令", "RHEL9 httpd 包名", "tigervnc-server 包名"],
      "must_know": [
        "`dnf install 包名` 才会走仓库、解析依赖；`rpm -q` 只查已装、`rpm -ivh` 只装本地文件，都不从仓库取包。",
        "RHEL 系包名要记准：Apache 是 `httpd`（不是 apache2，那是 Debian 系）、DNS 是 `bind`/服务名 `named`、VNC 服务端是 `tigervnc-server`。",
        "`dnf search 关键词` 按描述找包，`dnf info 包名` 看版本与来源；不确定包名时先 search，不要猜。",
        "装完不等于能用：`dnf install httpd` 成功只代表包装上了，服务是否启动、端口是否放行要另查。"
      ],
      "gaps": "两条视频均待验收；包名对照（httpd / tigervnc-server）靠 must_know 记"
    },
    {
      "id": "08-02",
      "topic_id": "08",
      "title": "本地 RPM：rpm -ivh 与依赖求解",
      "question_ids": ["A063", "P118"],
      "video_ids": ["v-08-rpm-install", "v-08-pkg-mgr"],
      "coverage": [
        "rpm -ivh 装本地 .rpm 文件",
        "-i 安装、-v 详细、-h 进度",
        "rpm 不自动解依赖，dnf 会",
        "dnf install ./pkg.rpm 可借仓库补依赖"
      ],
      "search_terms": ["rpm -ivh 安装本地包", "dnf install 本地rpm 依赖"],
      "must_know": [
        "`rpm -ivh pkg.rpm`：`-i` 安装、`-v` 详细输出、`-h` 打印 `#` 进度；参数是**文件路径**，不是包名。",
        "`rpm -i` 不会去仓库找依赖，缺依赖直接报错；`dnf install ./pkg.rpm` 会把本地包纳入事务并从启用仓库补齐依赖——这是两者最关键的差别。",
        "`--disablerepo=仓库名` / `--enablerepo=仓库名` 只影响本次命令的仓库范围，不改 `.repo` 文件。",
        "本地包来源不可信时别急着装：`rpm -K pkg.rpm` 或 `rpm --checksig` 先验签名。"
      ],
      "gaps": "视频待验收；`--disablerepo` 的临时性见 08-09，P118 的 D 选项（装成功≠服务可用）在 08-01 与 08-05 讲"
    },
    {
      "id": "08-03",
      "topic_id": "08",
      "title": "查询四件套：-q、-qa、-qf、-ql",
      "question_ids": ["P119"],
      "video_ids": ["v-08-rpm-query"],
      "coverage": [
        "rpm -q 按包名查是否安装",
        "rpm -qa 列出全部已装包",
        "rpm -qf 由文件反查所属包",
        "rpm -ql 列出包安装的文件"
      ],
      "search_terms": ["rpm -qa -qf -ql 区别", "rpm 查询 已安装 包"],
      "must_know": [
        "四个查询各管一件事：`-q 包名` 查是否装了、`-qa` 列全部已装、`-qf /路径` 由文件反查包、`-ql 包名` 列该包的文件清单。",
        "`-qf` 必须给**已存在的绝对路径**；文件被删了就查不到，这时用 `dnf provides` 反而能查到（它查的是仓库元数据）。",
        "`-qa` 后面跟包名不会变成「查这个包」，只是列出全部；要过滤得 `rpm -qa | grep 关键词`。",
        "这些查询都不需要 root，也不改变系统状态。"
      ],
      "gaps": "单条视频待验收；-qf 与 dnf provides 的边界靠 must_know"
    },
    {
      "id": "08-04",
      "topic_id": "08",
      "title": "预览未安装包与找命令提供者",
      "question_ids": ["P120", "P121", "P128"],
      "video_ids": ["a-08-rpm-query", "a-08-dnf-cmd"],
      "coverage": [
        "-qlp 看未安装包会装哪些文件",
        "-qp 系列 = 针对包文件而非已装包",
        "dnf provides 反查文件/命令属于哪个包",
        "查不到命令时先找提供者再安装"
      ],
      "search_terms": ["rpm -qlp 未安装包 文件清单", "dnf provides 命令 属于哪个包"],
      "must_know": [
        "`-p` 是关键：`rpm -qlp ./x.rpm` 把后面的参数当**包文件**处理，`rpm -ql x.rpm` 会当成已装包名而查不到。同理 `-qpi` 看描述、`-qpR` 看依赖。",
        "`semanage` 这类命令找不到时，用 `dnf provides \"*/semanage\"` 反查提供者（provides 按**文件路径**匹配，裸命令名往往查不到，必须带 `*/`），装完再 `command -v semanage` 验证。",
        "`dnf provides` 查的是**仓库元数据**（含未安装的包），`rpm -qf` 查的是**本机已装数据库**；一个文件还没装上时只有前者能回答。",
        "顺序是「查提供者 → 装包 → 验证命令存在」，不要先假定路径再查。"
      ],
      "gaps": "没有合适短视频，本节主资料是图文；-qp 系列的组合用法靠 must_know"
    },
    {
      "id": "08-05",
      "topic_id": "08",
      "title": "升级、清理缓存与 rpm -V 校验",
      "question_ids": ["P124", "P125"],
      "video_ids": ["a-08-dnf-cmd", "a-08-rpm-query"],
      "coverage": [
        "dnf update 是 upgrade 的别名",
        "dnf clean all 只清缓存不卸包",
        "rpm -V 比对文件属性与数据库记录",
        "包已装 / 服务在跑 / 端口可达 / 业务正常 是四层"
      ],
      "search_terms": ["dnf update upgrade 区别", "dnf clean all 作用", "rpm -V 校验"],
      "must_know": [
        "`dnf update` 与 `dnf upgrade` 是**同一个操作的两个名字**（update 是 upgrade 的别名），参数、行为完全一致，不存在「只有某一个被支持」。",
        "`dnf clean all` 清的是 `/var/cache/dnf` 里的元数据与包缓存，**不会卸载任何已装包**；清完下一次操作会重新下载元数据。",
        "`rpm -V 包名` 拿文件的实际属性与 RPM 数据库记录比对，9 个位置依次是 `S` 大小、`M` 类型与权限、`5` 摘要（MD5）、`D` 设备号、`L` 链接路径、`U` 属主、`G` 属组、`T` 修改时间、`P` 能力位；正常的位显示 `.`。无输出只说明这些**属性**没变，不能证明程序逻辑或运行时依赖正常。",
        "「包已安装 → 服务已启动 → 端口可访问 → 业务正常」是四层，前一层通过不能推出后一层。"
      ],
      "gaps": "没有合适短视频，本节主资料是图文；rpm -V 的输出位含义靠 must_know"
    },
    {
      "id": "08-06",
      "topic_id": "08",
      "title": "卸载与依赖影响",
      "question_ids": ["P126"],
      "video_ids": ["v-08-rpm-query", "a-08-dnf-cmd"],
      "coverage": [
        "rpm -e 是 RPM 层卸载",
        "dnf remove 会算依赖事务",
        "执行前看事务摘要",
        "rpm -qa 不是卸载命令"
      ],
      "search_terms": ["rpm -e 卸载 依赖", "dnf remove 事务 摘要"],
      "must_know": [
        "`rpm -e 包名` 只删这个包，遇到被依赖会直接报错拒绝；`dnf remove 包名` 会计算连带影响，可能把依赖它的包一起删掉。",
        "执行 `dnf remove` 前一定看它列出的 `Removing:` 清单和 `Transaction Summary`，确认没牵连到系统关键包再按 `y`。",
        "`rpm -qa 包名` 只是列出已装包，不会卸载；`dnf history` 可以回看并 `undo` 最近一次事务。",
        "卸载不会自动清理 `/etc` 下改过的配置文件（标记为 config 的文件通常保留为 `.rpmsave`）。"
      ],
      "gaps": "视频与图文均待验收；dnf history undo 靠 must_know"
    },
    {
      "id": "08-07",
      "topic_id": "08",
      "title": "装完访问不了：包、服务、端口、策略",
      "question_ids": ["P127"],
      "video_ids": ["v-08-httpd"],
      "coverage": [
        "systemctl status 看服务",
        "ss -lntp 看监听地址与端口",
        "firewalld 放行与 SELinux 上下文",
        "客户端到服务器的网络路径"
      ],
      "search_terms": ["httpd 安装后 访问不了 排查", "ss -lntp 查看监听"],
      "must_know": [
        "排查顺序：`systemctl status httpd`（进程在不在）→ `ss -lntp | grep :80`（有没有监听、监听在哪个地址）→ `firewall-cmd --list-all`（策略放没放）→ `getenforce` / `ausearch -m avc`（SELinux 拦没拦）→ 客户端 `curl -v`（路径通不通）。",
        "监听在 `127.0.0.1:80` 时本机 curl 通、外部不通，这是 `Listen` 配置问题而不是防火墙问题；两者要用 `ss` 的输出区分。",
        "RHEL 上还有 SELinux：非标准端口要 `semanage port -a`，非标准目录要改 `httpd_sys_content_t`，`getenforce` 看模式、`ausearch -m avc` 看拒绝记录。",
        "`rpm -q httpd` 成功只证明包装上了，对「为什么打不开」几乎不提供信息。"
      ],
      "gaps": "视频待验收；SELinux 布尔值与端口标签靠 must_know，细节在第十二专题展开"
    },
    {
      "id": "08-08",
      "topic_id": "08",
      "title": ".repo 文件结构与 enabled",
      "question_ids": ["P122", "R12"],
      "video_ids": ["v-08-repo", "v-08-repo-local", "a-08-dnf-usage"],
      "coverage": [
        "段落名就是仓库 ID",
        "baseurl 要指向含 repodata 的根",
        ".repo 放 /etc/yum.repos.d/",
        "enabled 决定是否参与求解",
        "BaseOS 与 AppStream 是两个仓库"
      ],
      "search_terms": ["yum.repos.d repo 文件 格式 baseurl", "BaseOS AppStream 仓库配置"],
      "must_know": [
        "一个 `.repo` 里可以有多个 `[仓库ID]` 段落；段落名就是 ID，重复会被覆盖，`dnf --enablerepo=ID` 引用的也是它。",
        "`baseurl` 必须指到**含 `repodata/` 的那层目录**；指到上一级或空目录时，浏览器能打开但 dnf 报「Cannot download repomd.xml」。",
        "RHEL 9 安装介质里 BaseOS 和 AppStream 是两个独立仓库，要写两段、两个不同 ID、两个各自的 `baseurl`；`file:///` 是三个斜杠。",
        "`enabled=0` 只是默认不参与求解，`dnf --enablerepo=ID` 仍可临时用；`gpgcheck=1` 要配合 `gpgkey=` 指向公钥。"
      ],
      "gaps": "两条视频与图文均待验收；repodata 目录层级的报错对照靠 must_know"
    },
    {
      "id": "08-09",
      "topic_id": "08",
      "title": "仓库临时开关：--enablerepo 与 --disablerepo",
      "question_ids": ["P123"],
      "video_ids": ["a-08-dnf-usage"],
      "coverage": [
        "dnf repolist 看启用状态，--all 看全部",
        "--disablerepo / --enablerepo 只作用于本次",
        "不改 .repo 文件",
        "clean all 不删仓库定义"
      ],
      "search_terms": ["dnf repolist --all", "dnf --disablerepo --enablerepo 一次安装"],
      "must_know": [
        "`dnf repolist` 只列**已启用**的仓库，`dnf repolist --all` 才把 `enabled=0` 的也列出来，排查「仓库明明配了却不生效」先看这个。",
        "`dnf --disablerepo=repoA --enablerepo=repoB install pkg` 的开关只对**这一条命令**生效，命令结束即恢复，`.repo` 文件一个字节都没改。",
        "要永久改状态用 `dnf config-manager --set-disabled repoA`（会写回 `.repo`），和上面的临时开关是两回事。",
        "`dnf clean all` 清缓存，既不删 `.repo` 定义也不改变 enabled 状态。"
      ],
      "gaps": "没有合适短视频，本节主资料是图文；config-manager 的永久写法靠 must_know"
    },
    {
      "id": "08-10",
      "topic_id": "08",
      "title": "签名校验与「地址能打开却装不上」",
      "question_ids": ["P129"],
      "video_ids": ["a-08-dnf-usage", "v-08-repo"],
      "coverage": [
        "gpgcheck=1 要配 gpgkey 才能验签",
        "地址可达 ≠ 包存在",
        "repodata 与依赖元数据要可用",
        "签名通过不等于没有漏洞"
      ],
      "search_terms": ["gpgcheck gpgkey 导入 公钥", "dnf 安装失败 repomd.xml 报错"],
      "must_know": [
        "`gpgcheck=1` 但 `gpgkey` 没配或公钥没导入时，装包会卡在签名验证：`Public key for xxx.rpm is not installed`，此时 `rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-*` 再试。",
        "`baseurl` 能打开只说明 HTTP 通；包不在这个仓库、架构不匹配（`$basearch`）、版本不匹配（`$releasever`）都会失败，报错是 `No match for argument` 或 `nothing provides`。",
        "`repodata/repomd.xml` 缺失或过期会直接报 `Cannot download repomd.xml`，先 `dnf clean all` 再 `dnf makecache`。",
        "签名校验只回答「这个包确实来自该来源且没被篡改」，不回答「这个包有没有漏洞」。"
      ],
      "gaps": "没有合适短视频，主资料是图文 + 仓库配置视频；验签报错原文靠 must_know"
    },
    {
      "id": "08-11",
      "topic_id": "08",
      "title": "Flatpak 作用域：--user 与 --system",
      "question_ids": ["P130", "P134", "P135"],
      "video_ids": ["v-08-flatpak-use", "v-08-flatpak-install"],
      "coverage": [
        "flatpak --user install 装到当前用户",
        "--system 装到全系统",
        "两个作用域的清单互相独立",
        "卸载要指明作用域"
      ],
      "search_terms": ["flatpak --user --system 区别", "flatpak 安装 应用 remote"],
      "must_know": [
        "`flatpak --user install flathub org.example.App` 装进当前用户的库（`~/.local/share/flatpak`），`--system` 装进 `/var/lib/flatpak`；两个库各有一份清单。",
        "`flatpak list` 默认会列出**所有** installation 并在结果里带 `Installation` 列，`--user` / `--system` 才是限定单一作用域。所以「管理员说装了、普通用户 `flatpak list` 看不到」的真正原因是**装在了另一个账户的 `--user` 库里**——用户库按账户隔离，`flatpak list` 只能看到本账户的 user 库加系统库。",
        "卸载必须带同样的作用域：`flatpak --user uninstall org.example.App` 只删自己那份，不影响系统级安装。",
        "`flatpak` 与 RPM 是两套体系：`rpm -qa` 永远列不出 Flatpak 应用，`dnf remove` 也删不掉它。"
      ],
      "gaps": "两条视频待验收（均在 Ubuntu 上演示，命令与 RHEL 一致）；作用域目录靠 must_know"
    },
    {
      "id": "08-12",
      "topic_id": "08",
      "title": "remote、run 与 runtime 依赖",
      "question_ids": ["P131", "P132", "P133"],
      "video_ids": ["v-08-flatpak-why", "v-08-flatpak-use"],
      "coverage": [
        "flatpak remotes 看已配置来源",
        "flatpak run 按应用 ID 启动",
        "runtime 与应用是两个安装对象",
        "卸载应用不会自动删 runtime"
      ],
      "search_terms": ["flatpak remotes run list 用法", "flatpak runtime 是什么"],
      "must_know": [
        "命令分工：`flatpak remotes` 看来源、`flatpak remote-add` 加来源、`flatpak search` 搜应用、`flatpak run 应用ID` 启动、`flatpak list` 看已装。",
        "应用 ID 形如 `org.example.App`（反写域名），启动和卸载都用这个 ID，不是包名也不是可执行文件名。",
        "应用依赖 runtime（如 `org.freedesktop.Platform`），runtime 是共享的基础环境，可以同时被多个应用使用；`flatpak list --runtime` 单独看。",
        "`flatpak uninstall --unused` 才会清掉没人用的 runtime；直接卸应用不会顺手删 runtime。"
      ],
      "gaps": "视频待验收；remotes/run 的具体输出靠 must_know，概念片偏原理、实操片偏安装；P131 的 C 选项（作用域核对）见 08-11"
    },
    {
      "id": "09-01",
      "topic_id": "09",
      "title": "块设备只读探查：lsblk 与 blkid",
      "question_ids": ["P136", "P151"],
      "video_ids": ["v-09-lsblk", "v-09-lsblk-blkid"],
      "coverage": [
        "lsblk 树状层级与 -f",
        "blkid 读文件系统签名与 UUID",
        "findmnt 查挂载点",
        "mkfs 会写元数据，不是探查"
      ],
      "search_terms": ["lsblk -f 查看文件系统", "blkid 查看 UUID"],
      "must_know": [
        "`lsblk -f` 只读展示「磁盘 → 分区 → 文件系统 / UUID / 挂载点」的层级，是挂载前最省事的一次性核对。",
        "`blkid` 读的是设备上的**文件系统签名**（TYPE、UUID），设备没格式化时没有输出；`blkid` 不带参数列全部，带 `/dev/sdb1` 只查一个。",
        "`findmnt --mountpoint /data` 查挂载表，回答「这个路径是不是挂载点」；`lsblk` 回答「这块盘是什么结构」，两者问的不是同一件事。",
        "`mkfs.ext4` 会写新的文件系统元数据、可能覆盖旧数据，它属于**破坏性操作**，永远不能算「先行检查」。"
      ],
      "gaps": "两条视频待验收；findmnt 的细节在 09-11 展开，本节先由 must_know 给出结论"
    },
    {
      "id": "09-02",
      "topic_id": "09",
      "title": "fdisk 交互与分区类型码",
      "question_ids": ["A064", "A065"],
      "video_ids": ["v-09-fdisk"],
      "coverage": [
        "n 新建、d 删除、p 打印、w 写盘、q 不保存退出",
        "MBR 类型码 82 = Linux swap",
        "83 = Linux 文件系统",
        "类型码只是标识，仍需 mkswap/mkfs"
      ],
      "search_terms": ["fdisk w q 区别", "MBR 分区类型 82 83"],
      "must_know": [
        "`w` 才是写盘并退出，`q` 是不保存退出；`d` 只删内存里的分区条目，不按 `w` 就等于没删。提交前先 `p` 看一眼布局。",
        "DOS/MBR 类型码：`82` = Linux swap、`83` = Linux 文件系统、`8e` = Linux LVM、`0b`/`0c` = FAT32、`07` = NTFS/exFAT。",
        "类型码只是**分区表里的一个字节**，不等于已经格式化：标成 82 还要 `mkswap`，标成 83 还要 `mkfs`。",
        "GPT 没有这种单字节类型码，用的是分区 GUID（如 Linux filesystem data、Linux swap）。"
      ],
      "gaps": "视频待验收；GPT 与 MBR 的类型表示差异靠 must_know"
    },
    {
      "id": "09-03",
      "topic_id": "09",
      "title": "写盘与内核视图：partprobe 那一步",
      "question_ids": ["P138"],
      "video_ids": ["a-09-partprobe"],
      "coverage": [
        "分区表写盘与内核识别是两个阶段",
        "partprobe 通知内核重读分区表",
        "设备忙时先停用使用者",
        "现代 fdisk 能处理 GPT"
      ],
      "search_terms": ["partprobe 重新读取分区表", "fdisk w 之后 分区不显示"],
      "must_know": [
        "`w` 只把分区表写进磁盘，内核可能仍在用旧布局，所以 `/dev/sdb2` 不出现；`partprobe /dev/sdb` 让它重读，不用重启。",
        "验证看 `lsblk` 或 `cat /proc/partitions`；报 `Device or resource busy` 说明分区还在被占用（已挂载、被 LVM 用着），要先 `umount` 或停用。",
        "`fdisk` 从 util-linux 2.23 起就支持 GPT，`gdisk`/`parted` 不是唯一选择；「fdisk 只支持 MBR」是过时结论。",
        "`mkfs` 在整盘上跑会覆盖原有结构，它不是「刷新分区表」的办法。`partprobe` 对 NVMe 盘有时无效，可改用 `partx -u /dev/nvme0n1` 或 `echo 1 > /sys/block/nvme0n1/device/rescan`，再不行只能重启。"
      ],
      "gaps": "没有合适短视频，本节主资料是图文；NVMe 设备上 partprobe 可能无效，靠 must_know 提一句"
    },
    {
      "id": "09-04",
      "topic_id": "09",
      "title": "分区 → 文件系统 → 挂载：三个阶段",
      "question_ids": ["P137", "P139"],
      "video_ids": ["v-09-disk-full"],
      "coverage": [
        "分区划定块设备范围",
        "mkfs 建文件系统",
        "mount 接入目录树",
        "mkdir 只是建挂载点目录"
      ],
      "search_terms": ["Linux 新硬盘 分区 格式化 挂载", "mkfs.ext4 挂载 流程"],
      "must_know": [
        "三个阶段不能互相替代：分区（划定 `/dev/sdb1` 的范围）→ `mkfs.ext4`（建文件系统）→ `mount`（接入目录树）；`mkdir /data` 只是准备挂载点。",
        "`mkfs.ext4 /dev/sdb1` 之前先 `lsblk -f` / `blkid` 确认目标，数据状态不明时先备份——格式化会覆盖旧文件系统。",
        "`mount` 不会自动建文件系统；对没有文件系统的分区挂载会报 `wrong fs type, bad option, bad superblock on /dev/sdb1`——`bad superblock` 就是「这里没有文件系统」的信号。",
        "格式化后的 UUID 会变，fstab 里若按 UUID 挂载要同步更新。"
      ],
      "gaps": "视频待验收；格式化后 UUID 变化这一点靠 must_know"
    },
    {
      "id": "09-05",
      "topic_id": "09",
      "title": "容量单位：GB 与 GiB 差在哪",
      "question_ids": ["P150"],
      "video_ids": ["v-09-unit"],
      "coverage": [
        "GB = 10^9 字节",
        "GiB = 2^30 字节",
        "同一字节数两种单位数值不同",
        "显示差异常来自单位基数"
      ],
      "search_terms": ["GB 与 GiB 区别", "df -h 容量单位"],
      "must_know": [
        "`1 GB = 10^9` 字节，`1 GiB = 2^30 = 1073741824` 字节；`100 GiB ≈ 107.4 GB`，两者绝不相等。",
        "`lsblk` 默认按 1024 进制（GiB 口径），`lsblk --si` 才用 1000 进制；`df -h` 用 1024，`df -H` 用 1000。",
        "买盘标称 1 TB 而系统显示约 931 GiB，是单位基数不同，不是「少了容量」。",
        "换算时先统一到字节再比，题目里凡是说「相等」的选项基本都错。"
      ],
      "gaps": "视频为中英字幕，待验收；lsblk/df 的 -h 与 --si/-H 对照靠 must_know"
    },
    {
      "id": "09-06",
      "topic_id": "09",
      "title": "UEFI 与 ESP（EFI 系统分区）",
      "question_ids": ["R01"],
      "video_ids": ["v-09-esp"],
      "coverage": [
        "ESP 通常是 FAT 格式",
        "ESP 挂载在 /boot/efi",
        "/boot 与 ESP 角色不同",
        "是否需要 ESP 由启动模式决定"
      ],
      "search_terms": ["EFI 系统分区 ESP 作用", "UEFI 安装 Linux /boot/efi"],
      "must_know": [
        "UEFI 启动需要 ESP：FAT32 格式、约 200～512 MiB（RHEL 安装器默认 200 MiB）、挂载在 `/boot/efi`，里面放固件能直接读的 `.efi` 引导文件。",
        "`/boot` 放内核与 initramfs（ext4/XFS 都行），ESP 放引导器；有 `/boot` 也不能省掉 ESP。",
        "要不要 ESP 只取决于**固件以 UEFI 还是 Legacy BIOS 模式启动**，跟虚拟机软件版本无关。GPT 只是常见搭配：GPT + Legacy 可以用 bios_grub 分区引导而不需要 ESP，UEFI + MBR 也能引导，所以磁盘分区表格式不是判据。",
        "`fdisk` 里 ESP 的 GPT 类型是 `EFI System`（GUID 以 C12A7328 开头），不是普通 Linux filesystem。"
      ],
      "gaps": "视频偏 Windows 视角，待验收；Linux 侧的 /boot/efi 布局靠 must_know"
    },
    {
      "id": "09-07",
      "topic_id": "09",
      "title": "挂载点与 mount 命令",
      "question_ids": ["A066", "A052"],
      "video_ids": ["v-09-mount", "v-09-mount-fstab"],
      "coverage": [
        "挂载点是文件系统的访问入口",
        "mount 设备 挂载点",
        "设备与挂载点都用绝对路径",
        "mount 不带参数看当前挂载"
      ],
      "search_terms": ["mount 命令 挂载点 绝对路径", "Linux 挂载点 是什么"],
      "must_know": [
        "挂载点就是「作为访问入口的那个目录」；挂上之后，通过这个路径看到的是新文件系统，不是原目录内容。",
        "`mount /dev/sda1 /winsys` 两个参数都要绝对路径；写成 `dev/sda1` 或 `winsys` 会按当前工作目录解析，含义完全不同。",
        "挂载点目录必须事先存在（`mkdir`），否则 `mount` 报 `mount point does not exist`。",
        "`mount` 不带参数列出当前所有挂载；`findmnt` 用树形展示，更好读。"
      ],
      "gaps": "两条视频待验收；绝对路径这个坑靠 must_know 强调"
    },
    {
      "id": "09-08",
      "topic_id": "09",
      "title": "挂载遮蔽与卸载",
      "question_ids": ["P140"],
      "video_ids": ["v-09-mount"],
      "coverage": [
        "挂载后原目录内容被遮蔽",
        "新写入落到新文件系统",
        "挂载不删除旧文件",
        "卸载后原内容重新可见"
      ],
      "search_terms": ["挂载 覆盖 原目录 内容 看不到", "umount 后 文件 恢复"],
      "must_know": [
        "把文件系统挂到已有内容的 `/data` 上，原目录被**遮蔽**（不是删除）：新写入落到新文件系统，旧文件仍在底层目录里。",
        "`umount /data` 之后遮蔽解除，原目录内容重新可见——这也是「卸载前先确认没有进程占用」的原因。",
        "`umount` 报 `target is busy` 时用 `lsof +D /data` 或 `fuser -vm /data` 找出占用进程，别用 `-l` 强行 lazy 卸载了事。",
        "挂载点被占用时也可以先挂到临时目录检查内容，再决定是否覆盖挂载。"
      ],
      "gaps": "复用 09-07 的视频，待验收；umount busy 的排查靠 must_know"
    },
    {
      "id": "09-09",
      "topic_id": "09",
      "title": "fstab 六字段与 UUID",
      "question_ids": ["P141", "P142", "R14"],
      "video_ids": ["v-09-fstab", "v-09-automount"],
      "coverage": [
        "六字段：设备、挂载点、类型、选项、dump、fsck 顺序",
        "用 UUID= 避免 /dev/sdX 漂移",
        "blkid 查 UUID",
        "非根 ext4 的 fs_passno 是 2"
      ],
      "search_terms": ["fstab 六个字段 含义", "fstab UUID 挂载"],
      "must_know": [
        "六字段顺序：`设备/UUID` `挂载点` `文件系统类型` `挂载选项` `dump 标志` `fsck 顺序`；`dump` 现在基本都写 `0`。",
        "第六字段：根文件系统写 `1`，其他需要开机检查的 ext 系列写 `2`，不检查（XFS、swap、btrfs）写 `0`。XFS 不用 fsck，所以 XFS 数据盘写 `0`。",
        "用 `UUID=<blkid 查到的值>` 而不是 `/dev/sdb1`：设备名会随插拔顺序变化，UUID 跟着文件系统走。",
        "改完 fstab 的顺序是：先 `systemctl daemon-reload` 让 systemd 按新 fstab 重新生成 `.mount` 单元，再 `mount -a` 验证；写错 fstab 可能导致开不了机，改前先备份。"
      ],
      "gaps": "两条视频待验收；XFS 第六字段写 0 这点靠 must_know（R14 是 ext4 所以填 2）"
    },
    {
      "id": "09-10",
      "topic_id": "09",
      "title": "挂载选项：ro、noexec、nosuid、noauto",
      "question_ids": ["A006", "P143"],
      "video_ids": ["v-09-mount-fstab"],
      "coverage": [
        "noauto 让 mount -a 跳过该条",
        "ro 只读挂载",
        "nosuid 屏蔽 setuid 效果",
        "noexec 只挡直接执行，不挡解释器读"
      ],
      "search_terms": ["fstab 挂载选项 noauto ro nosuid", "mount -o noexec 作用"],
      "must_know": [
        "`noauto` 只影响 `mount -a` 与开机自动挂载，条目仍可用 `mount /data` 手动挂——可移动介质常用它。",
        "`ro` 只读、`rw` 读写；`defaults` 等于 `rw,suid,dev,exec,auto,nouser,async`，**不含** `noauto`。",
        "`nosuid` 让该挂载上的 setuid/setgid 位失效；`noexec` 禁止从该文件系统直接执行二进制，但 `bash script.sh` 这种让解释器去读的方式仍可能成功。",
        "`nodev` 不解释块/字符设备文件，`noatime` 不更新访问时间——都是挂载级开关，不是文件权限。"
      ],
      "gaps": "单条视频待验收；`defaults` 的展开与 noexec 的边界靠 must_know"
    },
    {
      "id": "09-11",
      "topic_id": "09",
      "title": "mount -a 的边界、findmnt 验证与排错",
      "question_ids": ["P144", "P152", "P153", "P155"],
      "video_ids": ["v-09-fstab"],
      "coverage": [
        "mount -a 成功只证明当前环境能挂",
        "findmnt --mountpoint 验证挂载点",
        "fstab 报错按 UUID/类型/选项/目录排查",
        "改完要 daemon-reload"
      ],
      "search_terms": ["mount -a 报错 排查", "findmnt --mountpoint 验证"],
      "must_know": [
        "`mount -a` 只按**当前**环境把 fstab 里 `auto` 的条目挂一遍，成功不代表下次开机的设备时序、依赖、UUID 都还对。",
        "验证挂载点用 `findmnt --mountpoint /data`（精确到该路径）或 `findmnt /data`；`ls /data` 分不清「挂上了」还是「本来就有文件」。",
        "fstab 报错按四样对：UUID 是否与 `blkid` 一致、类型是否写对、选项是否被支持、挂载点目录是否存在。",
        "改完 fstab 要 `systemctl daemon-reload`，因为 systemd 会从 fstab 生成 `.mount` 单元；只看 `mount -a` 的退出码不够。评估「开机能不能挂上」时还要先看这条有没有被写成 `noauto`——写了就永远不会自动挂。"
      ],
      "gaps": "复用 09-09 的视频，待验收；findmnt 与 daemon-reload 的细节靠 must_know"
    },
    {
      "id": "09-12",
      "topic_id": "09",
      "title": "交换空间：mkswap、swapon 与持久化",
      "question_ids": ["P145", "P146", "P154"],
      "video_ids": ["v-09-swap", "v-09-swap-basic"],
      "coverage": [
        "mkswap 写交换签名",
        "swapon / swapoff 启停",
        "swapon --show 与 free -h 查看",
        "fstab 写 swap 条目持久化",
        "df 看不到 swap 是正常的"
      ],
      "search_terms": ["mkswap swapon 创建 swap 分区", "fstab swap 持久化"],
      "must_know": [
        "顺序是 `mkswap /dev/sdc2`（写交换签名）→ `swapon /dev/sdc2`（启用）；只 `mkswap` 不 `swapon`，`swapon --show` 里不会有它。",
        "持久化要写 fstab：`UUID=<交换分区 UUID>  none  swap  defaults  0 0`——第二字段是 `none` 或 `swap`，不是目录；只 `swapon` 一次重启就没了。",
        "`df -h` 统计的是**已挂载文件系统**，swap 不挂载，所以看不到属正常；看 swap 用 `free -h` 或 `swapon --show`。",
        "swap 分区要先 `mkswap`，绝不能先 `mkfs.ext4`——格式化会覆盖交换签名。换空间也可以用 swap 文件，但有前提：**XFS 不支持 swap 文件**（RHEL 默认根是 XFS，只能用分区或 LV），ext4 上建文件要用 `dd` 而不是 `fallocate`，否则 `swapon` 常报 `Invalid argument`。"
      ],
      "gaps": "两条视频待验收；swap 文件的写法靠 must_know"
    },
    {
      "id": "09-13",
      "topic_id": "09",
      "title": "ext4 缩容的顺序不能颠倒",
      "question_ids": ["P148", "A002"],
      "video_ids": ["a-09-resize"],
      "coverage": [
        "先备份、卸载、e2fsck -f",
        "先缩文件系统再缩 LV",
        "先 lvreduce 会截断数据",
        "resize2fs 指定目标大小"
      ],
      "search_terms": ["ext4 缩容 resize2fs lvreduce 顺序", "e2fsck -f 缩容前"],
      "must_know": [
        "ext4 缩容固定顺序：备份 → `umount` → `e2fsck -f /dev/vg0/lv` → `resize2fs /dev/vg0/lv 8G` → `lvreduce -L 8G /dev/vg0/lv` → 重新挂载验证。",
        "`resize2fs` 后面跟的是**目标大小**（如 `8G`），不是要减掉的量；漏写大小则默认撑满。",
        "先 `lvreduce` 会把 LV 边界切到文件系统仍然认为存在的块上，直接损坏数据——这是最典型的错误顺序。",
        "缩容必须离线（卸载），扩容量可以在线；`lvreduce` 给的大小必须 ≤ 上一步缩完的文件系统大小。"
      ],
      "gaps": "没有合适短视频，本节主资料是图文；e2fsck 的具体报错处理靠 must_know"
    },
    {
      "id": "09-14",
      "topic_id": "09",
      "title": "XFS 只能扩不能缩",
      "question_ids": ["P147", "P149"],
      "video_ids": ["a-09-resize"],
      "coverage": [
        "xfs_growfs 只能扩",
        "xfs_growfs 传挂载点",
        "扩 LV 后 df 仍显示旧容量",
        "要变小只能备份重建恢复"
      ],
      "search_terms": ["xfs_growfs 扩容 挂载点", "XFS 不支持缩容 RHEL"],
      "must_know": [
        "XFS 在 RHEL 上**不支持缩小**（`xfs_growfs` 没有缩容能力，`resize2fs` 对 XFS 直接报错）；要变小只能备份 → 建更小的文件系统 → 恢复 → 验证。",
        "`xfs_growfs` 的参数是**挂载点**（`xfs_growfs /data`），不是设备路径；对未挂载的 XFS 要先挂上。",
        "`lvextend` 只扩大块设备，文件系统不会自动跟着长——`df -h` 仍显示旧容量是典型现象，还要跑一次 `xfs_growfs`。",
        "XFS 扩容可以在线做；`xfs_info /data` 看块大小与 AG 数量，`df -hT` 先确认文件系统类型再选工具。"
      ],
      "gaps": "没有合适短视频，与 09-13 共用同一篇图文；xfs_info 的字段靠 must_know"
    },
    {
      "id": "09-15",
      "topic_id": "09",
      "title": "RHEL 7 的文件系统：默认 XFS、ext4 仍可用",
      "question_ids": ["A102", "A103"],
      "video_ids": ["a-09-rhel7-fs"],
      "coverage": [
        "RHEL 7 默认根文件系统是 XFS",
        "RHEL 6 默认是 ext4",
        "ext4 仍被支持，只是不是默认",
        "vfat 可识别 FAT32",
        "NTFS 不是自带默认可读写"
      ],
      "search_terms": ["RHEL7 默认文件系统 XFS", "RHEL 支持 ext4 vfat"],
      "must_know": [
        "RHEL 7 安装器默认把根做成 **XFS**，RHEL 6 默认是 ext4；「默认」不等于「唯一支持」，ext4 在 RHEL 7 上照样能用。",
        "RHEL 7 自带可用的还有 vfat（FAT32）、ext2/ext3/ext4、btrfs（技术预览）、swap；`lsblk -f` 里 TYPE 列就是这些名字。",
        "NTFS 不是 RHEL 自带的默认可读写文件系统，要装 `ntfs-3g` 之类的额外包，题目里凡是把它当默认的都错。",
        "RHEL 8/9 起根仍然默认 XFS，但 btrfs 不再是受支持选项。"
      ],
      "gaps": "没有合适短视频，资料是装机教程里的一句话；支持清单靠 must_know"
    },
    {
      "id": "10-01",
      "topic_id": "10",
      "title": "LVM 三层：PV、VG、LV 与定位",
      "question_ids": ["P156", "P157", "R02", "P166", "P167"],
      "video_ids": ["v-10-lvm-basic", "v-10-lvm-what"],
      "coverage": [
        "PV 是初始化过的块设备，VG 汇集 PV",
        "LV 从 VG 的 extent 中分配",
        "pvs / vgs / lvs 三层查询",
        "lsblk + lvs + swapon --show 三层验收",
        "PV UUID 与文件系统 UUID 属于不同层",
        "LVM 是可选布局，不排斥标准分区"
      ],
      "search_terms": ["LVM PV VG LV 区别", "pvs vgs lvs 命令"],
      "must_know": [
        "三层：**PV**（`pvcreate` 初始化过的磁盘/分区）→ **VG**（把多个 PV 汇成一个容量池）→ **LV**（从 VG 的 extent 里切出来的逻辑块设备）。",
        "查询各一层：`pvs` 看 PV、`vgs` 看 VG（含 `VFree` 剩余）、`lvs` 看 LV；`pvdisplay`/`vgdisplay`/`lvdisplay` 给详细字段。",
        "三层验收一条线：`lsblk`（磁盘与分区）→ `lvs`（逻辑卷）→ `swapon --show`（交换）。`df -h` 只看**已挂载文件系统**，不能代替前三者。",
        "`PV UUID` 属于 LVM 元数据层（`blkid /dev/sdb` 会显示 `TYPE=LVM2_member` 和一个 PV UUID），文件系统 UUID 属于 LV 上那一层；fstab 首字段可以写 `/dev/vg/lv`，用 `UUID=` 时填的必须是**已格式化 LV 的文件系统 UUID**，两者不能互换。",
        "LV 本身只是块设备，用之前还要 `mkfs` + `mount`；LVM 是可选布局，标准分区照样能用，也不必把已有文件系统都迁过来。"
      ],
      "gaps": "两条视频待验收；`df` 与 `lvs` 的口径差异靠 must_know"
    },
    {
      "id": "10-02",
      "topic_id": "10",
      "title": "从空盘到 LV 的顺序",
      "question_ids": ["U18"],
      "video_ids": ["v-10-lvm-create"],
      "coverage": [
        "pvcreate → vgcreate → lvcreate",
        "lvcreate -L 2G -n 名字 VG",
        "顺序颠倒没有容量来源",
        "LV 建好还要 mkfs"
      ],
      "search_terms": ["pvcreate vgcreate lvcreate 顺序", "lvcreate -L -n 用法"],
      "must_know": [
        "标准顺序：`pvcreate /dev/sdb` → `vgcreate vgdata /dev/sdb` → `lvcreate -L 2G -n lvdata vgdata`；再 `mkfs.xfs /dev/vgdata/lvdata` 与挂载。",
        "`lvcreate` 的 `-L` 是容量（`2G`），`-l` 是 extent 数量或百分比；`-n` 给 LV 名字，最后一个是 VG 名。",
        "把文件系统直接建在 `/dev/sdb` 上（`mkfs.xfs /dev/sdb`）跟 LVM 是两条路，做了就不再是 PV。",
        "删除顺序正好相反：`lvremove` → `vgremove` → `pvremove`。"
      ],
      "gaps": "单条视频 17:25，超 15 分钟参考值（见台账例外说明），待验收"
    },
    {
      "id": "10-03",
      "topic_id": "10",
      "title": "加 PV、扩容参数与 PE 计算",
      "question_ids": ["P158", "P159", "P160", "P162"],
      "video_ids": ["v-10-lvm-extend"],
      "coverage": [
        "vgextend 把 PV 加进 VG",
        "lvextend -L +1G 是增量",
        "lvextend -l +100%FREE 用剩余 extent",
        "-L 容量 / -l extent 两套语法",
        "100 个 4 MiB 的 PE = 400 MiB"
      ],
      "search_terms": ["vgextend lvextend 区别", "lvextend -l +100%FREE"],
      "must_know": [
        "`vgextend vgdata /dev/sdc1` 是把**新 PV 加进 VG**；`lvextend` 才是扩 LV。方向搞反是最常见的错。",
        "`-L` 后面带 `+` 是**增量**（`-L +1G` 表示再加 1 GiB），不带 `+` 是**目标总量**（`-L 1G` 表示最后就 1 GiB）。",
        "`-l`（小写）用 extent 数量或百分比：`-l +100%FREE` 把 VG 剩余全部给这个 LV；`-l 100` 是 100 个 PE。",
        "PE 大小决定粒度：`vgs -o vg_name,vg_extent_size` 看 PE 大小，容量 = PE 数 × PE 大小，所以 100 × 4 MiB = 400 MiB。"
      ],
      "gaps": "单条视频待验收；`-L` 与 `-l` 的大小写区别靠 must_know 强调"
    },
    {
      "id": "10-04",
      "topic_id": "10",
      "title": "lvextend -r 与文件系统同步",
      "question_ids": ["P161"],
      "video_ids": ["v-10-lvm-extend"],
      "coverage": [
        "-r 顺带调整文件系统",
        "VG 必须有可分配空间",
        "扩完要核对 df",
        "-r 不会让 XFS 能缩容"
      ],
      "search_terms": ["lvextend -r 作用", "lvextend 后 df 没变"],
      "must_know": [
        "`lvextend -r -L +1G /dev/vg/lv` 里的 `-r`（`--resizefs`）会调用对应工具把文件系统一起扩大，省掉单独跑 `xfs_growfs`/`resize2fs`。",
        "不加 `-r` 就只扩大了块设备，`df -h` 仍是旧容量——这是「扩了没生效」的第一大原因。",
        "扩容的前提是 VG 有 `VFree`；`vgs` 看到 0 就得先 `vgextend` 加盘。",
        "`-r` 只解决「跟着扩」，不改变 XFS 不支持缩容的事实。"
      ],
      "gaps": "复用 10-03 的视频，待验收；`-r` 对 XFS 调 `xfs_growfs`、对 ext4 调 `resize2fs`，这层分派靠 must_know"
    },
    {
      "id": "10-05",
      "topic_id": "10",
      "title": "LVM 快照：时点视图不是备份",
      "question_ids": ["P163"],
      "video_ids": ["v-10-lvm-snapshot"],
      "coverage": [
        "快照是某时点的卷视图",
        "应用一致性要冻结或协调写入",
        "快照不能替代独立备份",
        "快照与源卷共享故障域"
      ],
      "search_terms": ["LVM 快照 原理", "lvcreate -s 快照"],
      "must_know": [
        "`lvcreate -s -L 1G -n snap /dev/vg/lv` 建快照，快照记录的是**创建那一刻**的卷视图；写时复制，源卷后续改动会占快照空间。",
        "快照空间写满（`COW` 满）后快照失效，所以大小要按「预计改动量 × 保留时长」估算，并监控 `lvs` 的 `Data%`。",
        "数据库这类应用，快照只保证块级一致；要事务一致得先 `FLUSH TABLES WITH READ LOCK`、`fsfreeze` 或走应用自己的备份接口。",
        "快照和源卷通常在同一 PV/VG 上，盘坏了两个一起没；它只是回滚手段，不能替代异地备份。"
      ],
      "gaps": "单条视频待验收；`fsfreeze` 与 COW 满的处置靠 must_know"
    },
    {
      "id": "10-06",
      "topic_id": "10",
      "title": "thin pool：超售与真实容量",
      "question_ids": ["P164"],
      "video_ids": ["v-10-thin"],
      "coverage": [
        "薄置备允许名义容量超售",
        "真实写入受池容量限制",
        "要监控数据与元数据两块空间",
        "超售不保证能同时写满"
      ],
      "search_terms": ["thin pool 超售 原理", "lvs thin data% meta%"],
      "must_know": [
        "thin pool 只在实际写入时才分配物理块，所以多个 thin LV 的**名义**容量之和可以超过池的真实容量——这就是超售。",
        "池里有两块空间要盯：数据（`Data%`）和元数据（`Meta%`）。元数据先满会让整个池只读甚至损坏，比数据满更危险。",
        "`lvs -a -o name,data_percent,metadata_percent` 看占用；`lvextend --poolmetadatasize +... ` 扩元数据，`lvextend -L +... ` 扩数据。",
        "超售不创造容量：所有 thin LV 同时写满标称大小时仍然会耗尽，只是把风险推后。"
      ],
      "gaps": "视频是 PVE 语境，待验收；元数据耗尽的后果靠 must_know"
    },
    {
      "id": "10-07",
      "topic_id": "10",
      "title": "pvmove：把 PV 上的数据迁走",
      "question_ids": ["P165"],
      "video_ids": ["a-10-pvmove"],
      "coverage": [
        "pvmove 迁移已分配 extent",
        "目标 PV 要有足够空间",
        "迁移完成再 vgreduce",
        "最后 pvremove 清元数据"
      ],
      "search_terms": ["pvmove 迁移 物理卷", "vgreduce 移除 PV 步骤"],
      "must_know": [
        "PV 上还有数据时**不能**直接 `vgreduce`，顺序是 `pvmove /dev/sdb1` → 确认该 PV 的 `Alloc PE` 归零 → `vgreduce vg名 /dev/sdb1` → `pvremove /dev/sdb1`。",
        "`pvmove /dev/sdb1 /dev/sdc1` 可指定目标盘；不指定就让 LVM 在 VG 内自己找位置。目标必须有足够空闲 extent。",
        "迁移期间 `pvs -o +pv_used` 观察 Used 列下降；中途 `Ctrl+C` 只是停下迁移，已迁的 extent 不会回滚也不会损坏，但**没迁完之前不能 `vgreduce`**。",
        "直接拔盘不会让 VG 自动恢复：上面有 LV 的 extent，拔了就是数据不可访问，`vgreduce --force` 只会让情况更糟。"
      ],
      "gaps": "没有合适短视频，本节主资料是图文；`pvmove` 中断后的续跑靠 must_know"
    },
    {
      "id": "10-08",
      "topic_id": "10",
      "title": "Stratis：池与文件系统",
      "question_ids": ["P168", "P169"],
      "video_ids": ["a-10-stratis"],
      "coverage": [
        "pool 是块存储池，不是包仓库",
        "对外提供基于 XFS 的文件系统",
        "底层用 device-mapper 等组件",
        "先建 pool 再建 filesystem",
        "建完仍要挂载"
      ],
      "search_terms": ["stratis pool create filesystem create", "stratis 是什么 RHEL9"],
      "must_know": [
        "Stratis 是 RHEL 的本地存储管理层：`stratisd` 守护进程 + `stratis-cli`；对象只有两级——**pool**（块设备池）与 **filesystem**（池里的文件系统）。",
        "`stratis pool create pool1 /dev/sdb` 建池（设备要先 `wipefs -a` 清签名），`stratis filesystem create pool1 fs1` 建文件系统；建完**还要 mount** 才能用。",
        "对外它就是 XFS：`mount /dev/stratis/pool1/fs1 /mnt` 后 `df -T` 显示 xfs；不需要自己 `mkfs`。",
        "`stratis pool list`、`stratis filesystem list`、`stratis blockdev list 池名` 分别看池、文件系统、池里的设备。",
        "底层不是单一分区：Stratis 用 device-mapper 在池上搭 thin pool，所以 `lsblk` 里能看到 `stratis-1-private-...-thinpool-pool` 这类 dm 设备，`/dev/stratis/池/fs` 只是给用户看的稳定路径。"
      ],
      "gaps": "没有合适中文短视频，主资料是图文（RHEL 8 实例，命令在 RHEL 9 一致）；待验收"
    },
    {
      "id": "10-09",
      "topic_id": "10",
      "title": "Stratis 的 fstab 依赖与启动竞态",
      "question_ids": ["P170", "U06"],
      "video_ids": ["a-10-stratis", "a-10-rh-stratis"],
      "coverage": [
        "mount -a 成功不代表开机能挂",
        "stratis-fstab-setup@池UUID.service 依赖",
        "挂载源可用 /dev/stratis/池/文件系统",
        "池 UUID 必须与文件系统所属池一致"
      ],
      "search_terms": ["stratis fstab x-systemd.requires", "stratis-fstab-setup 服务"],
      "must_know": [
        "Stratis 文件系统在 fstab 里的**首字段二选一**：写路径 `/dev/stratis/池名/文件系统名`，或写 `UUID=<blkid /dev/stratis/池/fs 查到的文件系统 UUID>`；第二字段挂载点，第三字段写 `xfs`。两者不能并列在一行。",
        "RHEL 9 要加两个依赖：`x-systemd.requires=stratis-fstab-setup@<池UUID>.service` 与 `x-systemd.after=stratis-fstab-setup@<池UUID>.service`；`requires` 本身已隐含 After，官方模板仍把两行都列出来（此模板以官方原文为准，待人工核对）。",
        "`<池UUID>` 是 **pool 的 UUID**，取自 `stratis pool list` 的 `UUID` 列（`blkid` 给的是文件系统 UUID，不是它）；填错会指向错误的准备服务。",
        "只写 `After=stratisd.service` 不够：它只保证守护进程起来了，不保证**这个池**已经就绪；`mount -a` 当下成功也复现不了开机时序。"
      ],
      "gaps": "官方模板细节需人工核对原文（机器只读到章节开头）；RHEL 8 与 RHEL 9 写法不同，别照旧博客抄"
    },
    {
      "id": "10-10",
      "topic_id": "10",
      "title": "Stratis 的空间监控与挂载排查",
      "question_ids": ["P171", "P172"],
      "video_ids": ["a-10-stratis"],
      "coverage": [
        "逻辑大小不等于可用空间",
        "监控 pool 实际已用与可用",
        "排查先看池再看文件系统",
        "最后用 findmnt 核对挂载点"
      ],
      "search_terms": ["stratis pool list 容量", "stratis 挂载失败 排查"],
      "must_know": [
        "Stratis 文件系统显示的逻辑大小是**上限**，不是已分配空间；真实容量看 `stratis pool list`（Stratis 3.x 的列是 `Total / Used / Free`，2.x 是 `Total Physical Size / Total Physical Used`）。",
        "排查顺序：`stratis pool list`（池在不在、状态正常）→ `stratis filesystem list`（目标 fs 是否属于这个池）→ `findmnt --mountpoint /挂载点`（真的挂上了没）。",
        "目录存在不能证明挂载成功；`ls` 有内容也可能是底层目录，只有 `findmnt` 能看到实际来源。",
        "扩容前确认设备在 Stratis 支持列表内、`wipefs -a` 清过签名，再 `stratis pool add-data 池名 /dev/sdX`。"
      ],
      "gaps": "复用 10-08 的图文，待验收；`stratis pool list` 的字段含义靠 must_know"
    },
    {
      "id": "10-11",
      "topic_id": "10",
      "title": "Stratis 与考试范围：别拿旧博客当大纲",
      "question_ids": ["P173"],
      "video_ids": ["a-10-stratis", "a-10-rh-stratis"],
      "coverage": [
        "不在考试目标 ≠ 产品没有该功能",
        "博客不能替代官方考试目标",
        "旧教程与最新目标不等价",
        "查当期 EX200 目标再下结论"
      ],
      "search_terms": ["EX200 考试目标 Stratis", "RHEL9 Stratis 是否必考"],
      "must_know": [
        "「RHEL 9 有 Stratis」和「EX200 必考 Stratis」是两个判断：前者看产品文档，后者只看当期官方考试目标。本库核验的当期 EX200 已基于 RHEL 10，清单里有 Flatpak 与 systemd timer，**没有** Stratis，所以按「RHEL 9 兼容拓展、不写必考」处理。",
        "官方文档里有 = 功能存在；不等于考纲要求。旧博客往往基于旧版考试或旧版 RHEL，不能当大纲用。",
        "答题时凡出现「必然考」「必然不存在」「旧教程等同最新目标」这类绝对化表述，基本都是错的。",
        "练习价值与考试范围要分开看：Stratis 作为 RHEL 9 的存储拓展值得动手，但不必据此推断考不考。"
      ],
      "gaps": "没有专门讲考纲的资料，靠 must_know；考试目标以 Red Hat 官网当期页面为准"
    },
    {
      "id": "11-01",
      "topic_id": "11",
      "title": "地址长度、二层与三层转发",
      "question_ids": ["A037", "A082", "A083", "A087", "A088"],
      "video_ids": ["v-11-ip-basic"],
      "coverage": [
        "IPv4 32 位、IPv6 128 位",
        "DHCP 分配的是 IP 地址",
        "交换机按 MAC 转发以太网帧（二层）",
        "路由器按目标 IP 选路（三层）"
      ],
      "search_terms": ["IP地址 子网掩码 网络地址 广播地址", "交换机 路由器 二层 三层 区别"],
      "must_know": [
        "IPv4 是 32 位、IPv6 是 128 位；`/24` 是前缀长度，不是地址长度，别把这两个数搞混。",
        "DHCP 分配的是 IP 地址（同时可下发掩码、网关、DNS）。MAC 是网卡出厂标识，DHCP 靠它识别客户端，但不会把 MAC 当租约地址发出去。",
        "同网段通信靠交换机：按以太网帧的目的 MAC 转发，目的 MAC 由 ARP 查出来。",
        "跨网段通信靠路由器：按目标 IP 查路由表选下一跳。交换机不看 IP 路由表，路由器不做二层帧交换——题目里把两者职责对调的说法都是错的。"
      ],
      "gaps": "据标题推测视频只讲地址与掩码，二层/三层设备分工靠 must_know；待验收"
    },
    {
      "id": "11-02",
      "topic_id": "11",
      "title": "子网划分：网络地址、广播地址与可用范围",
      "question_ids": ["P177"],
      "video_ids": ["v-11-subnet"],
      "coverage": [
        "/26 对应 255.255.255.192",
        "末字节块大小 64",
        "网络地址 .64、广播地址 .127",
        "可用主机 .65～.126"
      ],
      "search_terms": ["网络地址 广播地址 主机地址范围 求法", "子网掩码 块大小 计算"],
      "must_know": [
        "`/26` = 前 26 位是网络位，掩码 `255.255.255.192`，末字节块大小 = 256 − 192 = 64。",
        "块起点是 `.0`、`.64`、`.128`、`.192`。`192.168.50.70` 落在 `.64–.127` 这一段，所以网络地址 `.64`、广播地址 `.127`、可用主机 `.65–.126`。",
        "判断两个地址是否同网段：各自与掩码相与得到网络地址，相同才同网段。`.60/26` → `.0`，`.70/26` → `.64`，不是同一段。",
        "可用主机数 = 2^(32 − 前缀) − 2（去掉网络地址和广播地址）。"
      ],
      "gaps": "只覆盖等长掩码的单段计算，VLSM 借位/合并没有专门资料"
    },
    {
      "id": "11-03",
      "topic_id": "11",
      "title": "nmcli 静态地址：设备、连接与验收",
      "question_ids": ["P174", "P175", "P176", "P192"],
      "video_ids": ["v-11-nmcli"],
      "coverage": [
        "device 与 connection 是两层对象",
        "nmcli device status / connection show --active",
        "ipv4.method manual 才是关掉 DHCP",
        "保存 profile ≠ 已生效，要 up 后核验"
      ],
      "search_terms": ["nmcli 配置静态IP", "nmcli device connection 区别"],
      "must_know": [
        "设备（device）是真实或虚拟接口；连接（connection，题干里也叫「连接配置档」、`nmcli` 里叫 profile）是保存下来的配置。两者相关但不是一回事，profile 名也不必等于接口名。",
        "查状态三条：`nmcli device status` 看接口与关联连接，`nmcli connection show` 看全部 profile，`nmcli connection show --active` 只看已激活的——用来区分「已保存」和「正在用」。",
        "静态地址三件套：`ipv4.method manual` + `ipv4.addresses 192.168.50.70/26` + 需要时 `ipv4.gateway`。`ipv4.method auto` 仍会去要 DHCP，它不是「停止自动获取」的开关。",
        "保存 profile 不等于内核已改：要 `nmcli connection up NAME`（或 `nmcli device reapply`），再用 `ip addr`、`ip route`、`getent hosts`（系统解析路径，详见 11-11）三处验收。只看配置文件文本不能证明生效。"
      ],
      "gaps": "主视频 16:49 超 15 分钟参考值，见台账例外说明；待验收"
    },
    {
      "id": "11-04",
      "topic_id": "11",
      "title": "ip 命令、缩写与 ifconfig 的分工",
      "question_ids": ["A077", "P185", "A014"],
      "video_ids": ["v-11-ip-cmd", "v-11-ip-ifconfig"],
      "coverage": [
        "ip a / ip addr / ip address 等价",
        "ipconfig 是别的系统的命令",
        "ip 命令改运行态，不写回 profile",
        "ifconfig 不负责加载驱动模块"
      ],
      "search_terms": ["ip addr 命令详解", "ip 与 ifconfig 区别"],
      "must_know": [
        "`ip a`、`ip addr`、`ip address` 是同一条命令的缩写关系（`ip a s` = `ip address show`）。`ipconfig` 是 Windows 的命令，不是 iproute2 的。",
        "`ip` 系列改的是当前内核状态，不会写回 NetworkManager 的 profile；重连或重启后 NM 会按保存的配置重置，所以 `ip addr add` 的地址会消失。",
        "要持久就在 profile 里配地址，然后 up/apply 再核验。",
        "`ifconfig` 能配地址、启停接口，但不加载网卡驱动模块（那是 `modprobe` / 内核的事），也不管持久化。"
      ],
      "gaps": "临时与持久的边界是本节重点，两条视频各偏一半，靠 must_know 串起来"
    },
    {
      "id": "11-05",
      "topic_id": "11",
      "title": "ifcfg 兼容：哪些写法还有效",
      "question_ids": ["P186", "A073"],
      "video_ids": ["v-11-ifcfg"],
      "coverage": [
        "RHEL 9 的 ifcfg 是弃用但兼容",
        "keyfile 是新连接的默认格式",
        "BOOTPROTO 没有 static 这个值",
        "gpgcheck 属于 DNF 仓库"
      ],
      "search_terms": ["RHEL9 ifcfg 弃用 keyfile", "ifcfg 文件 字段 详解"],
      "must_know": [
        "RHEL 9 里 ifcfg 格式「已弃用但保留兼容」，不是「一律读不了」；新连接默认写成 keyfile（`/etc/NetworkManager/system-connections/*.nmconnection`）。",
        "官方文档里 `BOOTPROTO` 的取值只列 `none` / `bootp` / `dhcp`。老教程常写 `static`，NM 会把它当 `none` 处理，但不属于文档取值，别依赖。静态地址靠 `IPADDR` + `PREFIX`（或 `NETMASK`）+ `GATEWAY` + `DNS1`。",
        "`255.255.25.0` 这种掩码二进制位不连续，不是合法掩码。",
        "`gpgcheck`、`baseurl`、`enabled` 是 DNF 仓库文件的字段，跟 ifcfg 不是一个领域。"
      ],
      "gaps": "候选视频标题为「Linux实验05 配置网络」，未提 ifcfg；是否真的编辑 ifcfg、是否讲到 RHEL 9 的弃用边界都待验收，靠 must_know 兜底"
    },
    {
      "id": "11-06",
      "topic_id": "11",
      "title": "临时路由与路由表字段",
      "question_ids": ["A013", "P178"],
      "video_ids": ["v-11-route-table", "v-11-route-elements"],
      "coverage": [
        "ip route add 目的前缀 via 下一跳",
        "目的写远端网段，网关写本链路可达的地址",
        "有去程路由 ≠ 双向通",
        "default via ... dev ... 的含义"
      ],
      "search_terms": ["Linux 路由表 字段 详解", "ip route add 静态路由"],
      "must_know": [
        "语法：`ip route add <目的前缀> via <下一跳> [dev <接口>]`。目的写要去的网段（如 `172.16.1.0/24`），via 写本机链路上能直接到达的网关（如 `192.168.1.1`）。",
        "网关必须在本机直连链路上。把远端网段里的地址（如 `172.16.1.1`）直接当下一跳，本机 ARP 不到它，报文发不出去。",
        "`ip route` 输出里 `default via 192.168.1.1 dev eth0 proto dhcp metric 100`：`default` 是默认路由，`via` 下一跳，`dev` 出接口，`proto` 来源，`metric` 优先级数值。",
        "本机有去程路由只说明请求能发出去；远端要有回程路由、沿途和远端防火墙要放行，双向通才算通。"
      ],
      "gaps": "两条视频都是通用路由表讲解，Linux 的 `ip rule` / 多路由表未覆盖"
    },
    {
      "id": "11-07",
      "topic_id": "11",
      "title": "持久化静态路由：nmcli 属性怎么写",
      "question_ids": ["A012", "P181"],
      "video_ids": ["v-11-static-route"],
      "coverage": [
        "nmcli con mod NAME +ipv4.routes \"前缀 下一跳\"",
        "不带 + 会整体替换列表",
        "-ipv4.routes 是删除",
        "ip route add 不写回 profile"
      ],
      "search_terms": ["nmcli 添加静态路由 永久", "Linux 静态路由 持久化"],
      "must_know": [
        "持久写法：`nmcli connection modify NAME +ipv4.routes \"10.20.0.0/16 192.168.50.65\"`，再 `nmcli connection up NAME` 才生效。",
        "`ipv4.routes` 是列表属性：不带 `+` 直接赋值会**整体替换**，把 profile 里原有的静态路由冲掉；`+` 追加，`-` 删除匹配项。",
        "`ip route add` 只改运行态路由表，不写回 profile；`/etc/hosts`、`/etc/resolv.conf` 与路由无关，`/etc/gateways` 也不是 NM 的必选项。",
        "下一跳必须能从本机某条直连链路到达（上一节已练过），否则路由加了也不通；特殊情况要显式 `onlink`。"
      ],
      "gaps": "候选视频标题为「centos静态路由配置」，未提 nmcli；据标题推测是 CentOS 7 时代的 route / 配置文件做法，与 RHEL 9 的写法有代差，靠 must_know 补齐"
    },
    {
      "id": "11-08",
      "topic_id": "11",
      "title": "路由选择：最长前缀与 metric",
      "question_ids": ["P179", "P180"],
      "video_ids": ["v-11-longest-prefix", "v-11-longest-2"],
      "coverage": [
        "先比前缀长度，更长者优先",
        "同前缀再比 metric，小者优先",
        "metric 只在候选可比时才有意义",
        "单播只选一条路由，不会复制报文"
      ],
      "search_terms": ["最长前缀匹配 路由", "路由 metric 优先级"],
      "must_know": [
        "选路顺序：先看前缀长度——更长=更具体=优先；前缀相同再比 metric（数值小者优先）；再相同才轮到其它规则。",
        "`10.1.2.9` 同时命中 `10.0.0.0/8` 和 `10.1.2.0/24`，选 `/24`，因为 `/24` 更长，跟 metric 谁小无关。",
        "metric 只有候选「可比」时才有意义：同前缀、同表、同规则。前缀长度不同时先执行最长前缀匹配，不能让短前缀靠低 metric 抢先。",
        "普通单播只选一条最优路由，不会因为两条都匹配就各发一份报文。"
      ],
      "gaps": "视频是通用计算机网络课，Linux 特有的策略路由没覆盖"
    },
    {
      "id": "11-09",
      "topic_id": "11",
      "title": "默认路由：谁需要它、谁不该发它",
      "question_ids": ["R15", "A016", "U07", "P191"],
      "video_ids": ["v-11-route-table"],
      "coverage": [
        "同网段直连不经网关、不需要 DNS",
        "上公网先查默认路由与网关",
        "ipv4.never-default yes 的作用",
        "它只约束 IPv4，不影响 IPv6"
      ],
      "search_terms": ["默认网关 作用", "NetworkManager never-default"],
      "must_know": [
        "同网段直连：目标落在自己网段内，直接 ARP 找对方 MAC，**不经默认网关**；用数字 IP 访问也**不需要 DNS**。所以「同网段互 ping」这两项都不参与。",
        "能 ping 通同网段、ping 公网 IP 不通 → 先查默认路由是否存在、网关是否可达。这时候查 `/etc/hosts`、域名后缀、浏览器设置都不解决问题。",
        "`ipv4.never-default yes` 让这个连接不装 IPv4 默认路由；它前缀是 `ipv4`，只约束 IPv4，IPv6 要看 `ipv6.never-default`。",
        "不用默认路由不等于不能访问：还可以配具体静态路由。`ip route del default` 只删运行态那条，连接重激活后会回来；`ipv4.method disabled` 会连地址都不配，属于过度操作。"
      ],
      "gaps": "没有专门讲 never-default 的视频，靠 must_know"
    },
    {
      "id": "11-10",
      "topic_id": "11",
      "title": "本地解析：/etc/hosts 与 A 记录",
      "question_ids": ["A017", "A026"],
      "video_ids": ["v-11-dns-record"],
      "coverage": [
        "/etc/hosts 写「地址 名字」",
        "A 记录 → IPv4，AAAA → IPv6",
        "hostname / resolv.conf 不管映射",
        "hosts 会盖住 DNS 结果"
      ],
      "search_terms": ["DNS A记录 AAAA记录 区别", "/etc/hosts 写法"],
      "must_know": [
        "`/etc/hosts` 一行写 `地址 主机名 [别名...]`，是最直接的本地静态映射。`/etc/hostname` 只存本机名，`/etc/resolv.conf` 放 DNS 服务器（`nameserver`）、搜索域（`search`）和解析选项（`options`），`/etc/networks` 是网络名映射。",
        "A 记录 → IPv4 地址，AAAA 记录 → IPv6 地址。MAC 是链路层的东西，靠 ARP / `ip neigh` 查，不在 DNS 里。",
        "端口不在 DNS 记录里：A 记录只给地址，端口由协议默认值或 URL 指定。",
        "`nsswitch.conf` 里 `hosts: files dns` 时 `files` 在前，`/etc/hosts` 会盖住 DNS 结果——这就是下一节 `dig` 与 `getent` 不一致的根子。"
      ],
      "gaps": "据标题推测视频只讲 DNS 记录类型，hosts 的写法与优先级靠 must_know；待验收"
    },
    {
      "id": "11-11",
      "topic_id": "11",
      "title": "DNS 排查：nsswitch、DHCP 下发 DNS 与域名故障",
      "question_ids": ["P182", "P183", "P184"],
      "video_ids": ["a-11-nsswitch"],
      "coverage": [
        "getent 走 NSS，dig 直接问 DNS",
        "nsswitch.conf 决定来源与顺序",
        "ipv4.dns + ignore-auto-dns",
        "数字 IP 通、域名不通先查解析"
      ],
      "search_terms": ["nsswitch.conf hosts 顺序", "getent hosts dig 区别"],
      "must_know": [
        "`getent hosts 域名` 走系统 NSS 路径（默认 `files dns`），会先看 `/etc/hosts`；`dig` 直接问 DNS 服务器，不读 hosts。两者结果不一致是正常的。",
        "`/etc/nsswitch.conf` 的 `hosts:` 决定来源与顺序，RHEL 9 默认是 `hosts: files dns myhostname`。把 `files` 去掉，`/etc/hosts` 就不再生效；去掉 `myhostname`，本机名也不一定解析得出来。",
        "想保留 DHCP 地址、只用自己指定的 DNS：`ipv4.method auto`（继续要地址）+ `ipv4.dns \"223.5.5.5\"` + `ipv4.ignore-auto-dns yes`（丢掉 DHCP 下发的 DNS）。",
        "数字 IP 通、域名不通 → 按「DNS 服务器配置 → nsswitch 顺序 → hosts 覆盖条目」查；不要一上来就改默认路由。",
        "RHEL 9 的 `/etc/resolv.conf` 通常由 NetworkManager 生成，手改可能被下次激活覆盖。"
      ],
      "gaps": "只有一篇图文，没有找到合适的中文短视频；getent 与 dig 的差异靠图文 + must_know"
    },
    {
      "id": "11-12",
      "topic_id": "11",
      "title": "连通性工具：ping、traceroute、arp、nmap",
      "question_ids": ["A023", "A032", "A085", "A086"],
      "video_ids": ["v-11-net-tools", "v-11-traceroute", "v-11-nmap"],
      "coverage": [
        "ping -c 3 限定次数",
        "Linux 的 ping -t 是 TTL",
        "traceroute 靠递增 TTL 逐跳",
        "arp / ip neigh 看邻居缓存",
        "nmap -sn 只做主机发现"
      ],
      "search_terms": ["ping traceroute mtr 用法", "arp 命令 邻居缓存", "nmap 主机发现 -sn"],
      "must_know": [
        "`ping -c 3 192.0.2.10` 发 3 个 ICMP Echo 后自动退出。Linux 的 `-t` 是 TTL、`-W` 是超时，不是次数——别把 Windows 的 `-n` / `-t` 习惯套过来。",
        "`traceroute` 靠逐步递增 TTL，让沿途路由器回 ICMP 超时，从而暴露路径。中间出现 `* * *` 表示那跳没回包，不等于链路断。",
        "`arp -n`（新系统用 `ip neigh`）看 IPv4 到 MAC 的邻居缓存，同网段通信靠它。`FAILED` 表示 ARP 无人应答；表为空只说明近期没通信，不能直接判二层断。",
        "`nmap -sn 192.0.2.0/24` 只做主机发现、跳过端口扫描；`-sV` 会探端口和服务版本，属于题目明确排除的范围。扫描只在自己有授权的网段做。"
      ],
      "gaps": "nmap 那条是内网渗透视角，只作备用；`arp` 已被 `ip neigh` 取代，靠 must_know 补一句"
    },
    {
      "id": "11-13",
      "topic_id": "11",
      "title": "监听与端口：ss -lntp 能确认什么",
      "question_ids": ["P190"],
      "video_ids": ["v-11-ss"],
      "coverage": [
        "-l 监听 -n 数字 -t TCP -p 进程",
        "绑定 127.0.0.1 与 0.0.0.0 的区别",
        "进程信息受权限限制",
        "ss 看不到对端防火墙"
      ],
      "search_terms": ["ss -lntp 用法", "netstat ss 区别 监听端口"],
      "must_know": [
        "`ss -lntp` 四个字母各管一件事：`-l` 只看监听、`-n` 不做名称解析、`-t` 只 TCP、`-p` 显示进程（非 root 只能看到自己的进程）。",
        "看 Listen 列：绑 `127.0.0.1:80` 只有本机能连；绑 `0.0.0.0:80` 或 `[::]:80` 才对所有地址开放。「服务起来了但外面连不上」头号原因就是绑了回环。",
        "`ss` 只看本机套接字，证明不了对端或中间防火墙放行，也证明不了应用层正常。",
        "要形成证据链：`ss -lntp`（本机在听）+ `firewall-cmd --list-all`（放行了）+ 客户端 `nc -vz`（能握手）。"
      ],
      "gaps": "只有一条通用 netstat/ss 视频，绑定地址的判断靠 must_know"
    },
    {
      "id": "11-14",
      "topic_id": "11",
      "title": "SSH 端口：服务端改、客户端指定",
      "question_ids": ["P187"],
      "video_ids": ["v-11-ssh-port"],
      "coverage": [
        "ssh -p 2222（小写）",
        "scp -P 2222（大写）",
        "scp -p 是保留时间戳权限",
        "改端口要同时处理 SELinux 与防火墙"
      ],
      "search_terms": ["ssh 修改默认端口", "scp 指定端口 -P"],
      "must_know": [
        "客户端指定端口：`ssh -p 2222 user@host`（小写 p），`scp -P 2222 file user@host:/path`（大写 P）。两个工具大小写不同，混用会报错或行为不符预期。",
        "`scp -p` 是「保留修改时间、访问时间和权限」，不是端口。这是最常见的混淆点。",
        "服务端改端口要做三件事：`/etc/ssh/sshd_config` 里的 `Port`、SELinux 给新端口打标签（`semanage port -a -t ssh_port_t -p tcp 2222`）、firewalld 放行该端口。",
        "只改 sshd_config 不管 SELinux，sshd 可能绑不上或起不来——这是 RHEL 上改端口最常踩的坑。"
      ],
      "gaps": "15:04 超 15 分钟参考值（见台账例外）；SELinux 端口标签那步是否讲到待验收"
    },
    {
      "id": "11-15",
      "topic_id": "11",
      "title": "公钥登录：谁把钥匙放哪儿",
      "question_ids": ["P188"],
      "video_ids": ["v-11-ssh-key", "v-11-ssh-key2"],
      "coverage": [
        "私钥只在客户端，权限 600",
        "公钥进目标用户的 authorized_keys",
        "目录与文件权限过松会被拒",
        "放错账户等于没配"
      ],
      "search_terms": ["SSH 免密登录 原理", "authorized_keys 权限"],
      "must_know": [
        "私钥永远留在客户端，权限 `600`，不外传；公钥可以随便给，服务端放进**目标用户**的 `~/.ssh/authorized_keys`。",
        "放错账户就等于没配：放到 root 的 authorized_keys 只能登 root，放到别的用户只能登那个用户。",
        "权限太松 sshd 会直接拒绝：`~/.ssh` 700、`authorized_keys` 600、家目录不能被组或其他用户写。排障时先看 `/var/log/secure` 里的 `Authentication refused: bad ownership or modes`。",
        "顺序别反：先确认公钥能登，再把 `PasswordAuthentication` 改成 `no`，否则容易把自己锁在外面。"
      ],
      "gaps": "主视频 14:23 讲原理，另一条 8:30 作备用实操；两条合计超 20 分钟上限，故备用不计入"
    },
    {
      "id": "11-16",
      "topic_id": "11",
      "title": "连不上怎么查：主机密钥、分层排查与 FCAPS",
      "question_ids": ["P189", "P193", "A030"],
      "video_ids": ["v-11-ssh-trouble"],
      "coverage": [
        "known_hosts 记服务端身份",
        "authorized_keys 记客户端用户公钥",
        "指纹变化要先查原因",
        "ping 通 ≠ SSH 通，按层查",
        "FCAPS 的 F 是故障管理"
      ],
      "search_terms": ["SSH 连接失败 排查", "known_hosts 主机密钥 指纹"],
      "must_know": [
        "两本账别记混：客户端的 `known_hosts` 记的是**服务端**主机密钥（验证服务器是谁）；服务端的 `authorized_keys` 记的是**客户端用户**公钥（允许谁登录）。",
        "首次连接弹指纹，要通过可信渠道核对后再接受。指纹突然变了先查原因（重装、轮换密钥、还是有人冒充），别直接用 `StrictHostKeyChecking=no` 糊过去。",
        "ping 通只说明 ICMP 可达。SSH 不通要继续按层查：sshd 是否在跑 → 监听哪个地址和端口（`ss -lntp`）→ 防火墙是否放行 → 认证与密钥 → 主机密钥信任。",
        "FCAPS 五个域：Fault 故障管理、Configuration 配置管理、Accounting 计费、Performance 性能、Security 安全。本节「查连不上」属于 F，前面几节「改 profile」属于 C——这一专题做的正是这两件事，所以这道题放在这里。"
      ],
      "gaps": "视频是云主机视角（安全组、被墙），本机环境对应的是 firewalld 与 sshd 状态，靠 must_know 对齐"
    },
    {
      "id": "11-17",
      "topic_id": "11",
      "title": "xrdp 与 RDP：图形远程桌面",
      "question_ids": ["A080"],
      "video_ids": ["v-11-xrdp"],
      "coverage": [
        "xrdp 提供 RDP 服务",
        "Windows 自带 mstsc 就能连",
        "NFS / SNMP / SMTP 都不是远程桌面",
        "默认端口 3389"
      ],
      "search_terms": ["xrdp Windows 远程桌面 Linux", "RDP 3389"],
      "must_know": [
        "`xrdp` 在 Linux 上提供 **RDP** 服务，Windows 自带的「远程桌面连接」（mstsc）就能连，默认端口 3389。",
        "别和 VNC 混：xrdp 说的是 RDP 协议，VNC 是另一套协议和另一个端口。",
        "干扰项辨析：NFS 是文件共享、SNMP 是监控管理、SMTP 是邮件传输，都不提供远程桌面。",
        "装完还要启服务、放行防火墙端口；它通常把会话转给本机已有的桌面环境（Xorg 或 Xvnc 后端）。"
      ],
      "gaps": "只覆盖协议归属，xrdp 配置细节不在本题范围"
    },
    {
      "id": "12-01",
      "topic_id": "12",
      "title": "firewalld 的两套配置：runtime 与 permanent",
      "question_ids": ["P194", "P197", "P212"],
      "video_ids": ["a-12-fw-guide", "v-12-firewalld-basic"],
      "coverage": [
        "runtime 在内存、permanent 在磁盘",
        "--add-port 不带 --permanent 只改运行",
        "--reload 用永久覆盖运行",
        "--runtime-to-permanent 反向保存",
        "两个视图可以不一致"
      ],
      "search_terms": ["firewalld 永久生效", "firewall-cmd reload permanent 区别"],
      "must_know": [
        "firewalld 有两套配置：runtime（内存里、立刻生效、reload 或重启就没了）和 permanent（写在 `/etc/firewalld/`，不 reload 不生效）。",
        "`firewall-cmd --add-port=8080/tcp` 只改 runtime；`--permanent --add-port=8080/tcp` 只写永久、**当前不生效**，要 `firewall-cmd --reload` 才加载进运行态。",
        "反方向是 `firewall-cmd --runtime-to-permanent`：把调好并验证过的运行规则存成永久。`--reload` 干的是相反的事——用永久覆盖运行，没存盘的临时改动会丢。",
        "所以「加了永久规则、查运行视图还是 no」是正常现象，不代表没写进去。查两遍：`--zone=<活动zone> --query-port=9000/tcp` 与 `--zone=<活动zone> --permanent --query-port=9000/tcp`。",
        "永久视图 yes 也不等于客户端已通：还要看活动 zone、服务是否真的在听。"
      ],
      "gaps": "候选视频是否讲到 runtime/permanent 两套视图待验收；图文有完整命令，靠它兜底"
    },
    {
      "id": "12-02",
      "topic_id": "12",
      "title": "服务与端口：放行对象要对",
      "question_ids": ["P196", "P198"],
      "video_ids": ["v-12-fw-port"],
      "coverage": [
        "service 是预定义端口的别名",
        "http 只含 80/tcp",
        "自定义端口用 --add-port",
        "--query-port 查两套视图"
      ],
      "search_terms": ["firewall-cmd 开放端口", "firewalld service port 区别"],
      "must_know": [
        "service 是一组预定义端口的别名：`http` 只含 80/tcp，`https` 是 443/tcp。把 httpd 改到 8088 后，`--add-service=http` 不会跟着放行 8088。",
        "自定义端口用 `--add-port=8088/tcp`；协议写错（该 tcp 写成 udp）等于没放行，同一数字端口的 tcp 与 udp 是两条规则。",
        "`--zone=<活动zone> --query-port=8443/tcp` 查运行视图，再加 `--permanent` 查永久视图；两套视图可以暂时不一致。",
        "运行视图 yes 只证明当前放行，既不能证明重启后还在，也不能证明客户端连得上。"
      ],
      "gaps": "视频是开放端口的实操，service 与 port 的边界靠 must_know"
    },
    {
      "id": "12-03",
      "topic_id": "12",
      "title": "区域与接口：规则加在哪个 zone",
      "question_ids": ["P195"],
      "video_ids": ["a-12-fw-guide"],
      "coverage": [
        "zone 按接口或来源分流",
        "public 的规则不影响别的 zone",
        "--get-active-zones 看接口归属",
        "查规则要在生效的 zone 里查"
      ],
      "search_terms": ["firewalld zone 区域 接口 绑定", "firewall-cmd get-active-zones"],
      "must_know": [
        "入站流量按「接口所在的 zone」或「来源地址匹配的 zone」选规则集，不是全局生效。",
        "规则加到 public、但网卡绑在 work/internal 等别的 zone，客户端照样被拦。先 `firewall-cmd --get-active-zones` 看接口到底在哪个 zone。",
        "查规则要在真正生效的 zone 里查：`firewall-cmd --zone=work --list-all`，而不是只看默认 zone。",
        "预定义 zone 按信任度由低到高大致是 drop < block < public < external < dmz < work < home < internal < trusted；`trusted` 等于全放行，`drop` 连拒绝回包都不给。"
      ],
      "gaps": "本节只有图文（firewalld 概览视频在 12-01）；zone 与接口的对应关系靠图文 + must_know"
    },
    {
      "id": "12-04",
      "topic_id": "12",
      "title": "RHEL 的 httpd：配置与文档根",
      "question_ids": ["A020", "A079"],
      "video_ids": ["v-12-httpd"],
      "coverage": [
        "包名 httpd，主配置 /etc/httpd/conf/httpd.conf",
        "附加片段在 conf.d",
        "默认 DocumentRoot 是 /var/www/html",
        "改完要重启并确认监听"
      ],
      "search_terms": ["RHEL httpd 配置文件", "Apache DocumentRoot 默认"],
      "must_know": [
        "RHEL 上 Apache 的包叫 `httpd`，主配置 `/etc/httpd/conf/httpd.conf`，附加片段放 `/etc/httpd/conf.d/*.conf`。",
        "默认 `DocumentRoot` 是 `/var/www/html`，没改配置就从这里出页面。",
        "干扰项都是别的服务的配置：`/etc/named.conf`（BIND DNS）、`/etc/ssh/sshd_config`（SSH）、`/etc/samba/smb.conf`（Samba）。",
        "改了 `Listen` 或 `DocumentRoot` 要 `systemctl reload httpd`（拿不准就 restart），再用 `ss -lntp` 确认真的在听，光看配置不算数。"
      ],
      "gaps": "视频是通用 Apache 搭建，可能基于 CentOS，路径与 RHEL 一致；待验收"
    },
    {
      "id": "12-05",
      "topic_id": "12",
      "title": "SELinux 是什么：模式与 root 也拦",
      "question_ids": ["P199", "P209"],
      "video_ids": ["v-12-selinux-intro", "v-12-selinux-debug"],
      "coverage": [
        "Enforcing / Permissive / Disabled",
        "getenforce 与 sestatus",
        "setenforce 0 只是临时",
        "root 不豁免，chmod 777 不管用"
      ],
      "search_terms": ["SELinux 三种模式", "getenforce setenforce sestatus"],
      "must_know": [
        "三种模式：Enforcing（拦截并记录 AVC）、Permissive（只记录不拦）、Disabled（策略不加载，必须重启才生效）。`getenforce` 看当前模式，`sestatus` 看更全（当前模式、配置文件里的模式、策略名、加载状态）。",
        "`setenforce 0` 只是临时切 Permissive，重启回到配置文件里的模式（通常是 Enforcing）；永久改要动 `/etc/selinux/config` 的 `SELINUX=`，而且 Disabled 必须重启。",
        "root 不豁免：SELinux 是强制访问控制，判断依据是进程域和文件类型，不是 UID。root 进程照样可能吃到 AVC。",
        "`chmod 777` 改的是 DAC mode 位，改不动 SELinux 判断；AVC 也不代表文件不存在。",
        "Permissive 下「能访问」不代表策略允许，只代表没拦——所以切 Permissive 只能用来确认「是不是 SELinux 拦的」。"
      ],
      "gaps": "主视频只有 2:22，细节以 9:30 的 RHCSA 补充 + must_know 兜底；待验收"
    },
    {
      "id": "12-06",
      "topic_id": "12",
      "title": "布尔值：改行为要带 -P",
      "question_ids": ["P203"],
      "video_ids": ["a-12-bool"],
      "coverage": [
        "getsebool -a 列出开关",
        "setsebool 只改运行值",
        "setsebool -P 写进策略库",
        "先确认这个布尔值管什么"
      ],
      "search_terms": ["SELinux 布尔值 setsebool -P", "getsebool httpd"],
      "must_know": [
        "布尔值是策略里的开关：`getsebool -a | grep httpd` 列出来，`getsebool httpd_can_network_connect` 看单个（输出 `--> off`）。",
        "`setsebool X on` 只改当前运行值，重启或重载策略后回原样；`setsebool -P X on` 才写进策略库，重启后保留。",
        "改之前先确认这个布尔值真的管你要的行为——名字相近的很多：`httpd_can_network_connect` 管 httpd 主动外连，`httpd_read_user_content` 管读家目录，都不是「允许绑定任意端口」。",
        "别和别的命令混：`chcon` 改文件上下文、`getenforce` 看模式、`semanage port` 改端口标签，都不是布尔值操作。",
        "`-P` 会触发策略重编译，常要等十几秒，还可能打印 libsemanage 提示，属正常。"
      ],
      "gaps": "没有中文短视频，只有一篇图文；本节靠图文 + must_know"
    },
    {
      "id": "12-07",
      "topic_id": "12",
      "title": "上下文长什么样：ls -Z 与 ps -Z",
      "question_ids": ["P200", "P207"],
      "video_ids": ["a-12-fcontext"],
      "coverage": [
        "四段格式 user:role:type:level",
        "ls -Z 看文件、ls -Zd 看目录自身",
        "ps -eZ 看进程域",
        "标签 ≠ DAC 权限 ≠ ACL"
      ],
      "search_terms": ["SELinux 上下文 ls -Z", "ps -eZ 进程域"],
      "must_know": [
        "上下文四段：`用户:角色:类型:级别`，例如 `system_u:object_r:httpd_sys_content_t:s0`。能不能访问主要看**第三段 type**。",
        "看文件：`ls -Z 文件`；看目录自身的标签用 `ls -Zd 目录`（不加 `d` 看的是目录里的条目）。看进程：`ps -eZ | grep httpd`，LABEL 列同样是四段，第三段才是域，httpd 正常是 `httpd_t`。",
        "`getfacl` 显示的是 DAC 的 ACL 条目，不会给你进程的 SELinux 类型。",
        "mode 位、ACL、SELinux 标签是三套独立检查，必须都通过；改一个不能替代另一个。"
      ],
      "gaps": "图文以文件上下文为主，进程域那半靠 must_know"
    },
    {
      "id": "12-08",
      "topic_id": "12",
      "title": "自定义文档根：fcontext + restorecon",
      "question_ids": ["U24", "P201", "P208"],
      "video_ids": ["a-12-fcontext", "v-12-selinux-www"],
      "coverage": [
        "semanage fcontext -a 建持久映射",
        "restorecon -Rv 落到文件",
        "两步顺序不能反",
        "标准路径直接 restorecon"
      ],
      "search_terms": ["semanage fcontext restorecon", "SELinux 非标准目录 网页"],
      "must_know": [
        "永久改标签两步走：先 `semanage fcontext -a -t httpd_sys_content_t '/srv/site(/.*)?'` 建规则，再 `restorecon -Rv /srv/site` 把规则落到文件上。只做第一步文件标签不变，只做第二步没有规则可依。",
        "`(/.*)?` 是正则，表示该目录及其下所有内容；漏了它只匹配目录本身。",
        "已经给某路径建过规则、要改类型时用 `semanage fcontext -m -t 新类型 '路径(/.*)?'`；直接再 `-a` 会报 already defined。\n`chcon` 改的是当前 inode，`restorecon` 或重新创建文件就会被覆盖，只适合临时验证。",
        "标准路径（`/var/www/html`）本来就有默认规则，被 `chcon` 改错了直接 `restorecon -Rv /var/www/html` 恢复，不必再 `semanage fcontext -a`。",
        "动手前先 `restorecon -Rvn /path` 干跑一遍，看会改哪些文件。"
      ],
      "gaps": "视频基于 /home/wwwroot 场景；`semanage fcontext` 的 `-a` 与 `-m` 区别靠图文与 must_know"
    },
    {
      "id": "12-09",
      "topic_id": "12",
      "title": "只读与可写：两种 httpd 内容类型",
      "question_ids": ["P202"],
      "video_ids": ["a-12-fcontext"],
      "coverage": [
        "httpd_sys_content_t 只读",
        "httpd_sys_rw_content_t 可写",
        "上传目录单独标",
        "别把整站标成可写"
      ],
      "search_terms": ["httpd_sys_rw_content_t 上传目录", "SELinux 网页 写入权限"],
      "must_know": [
        "静态内容标 `httpd_sys_content_t`（httpd 只读）；需要 Web 进程写入的目录（上传、缓存、session）标 `httpd_sys_rw_content_t`，两者分开。",
        "把整站一律标成可写类型，等于给 httpd 扩大写范围，一旦被利用影响面更大——这是放宽，不是省事。",
        "DAC 有写权限不代表 SELinux 允许写，两层都要过。",
        "httpd 要连数据库或主动外连时还要动布尔值（如 `httpd_can_network_connect`），和文件类型是两回事。"
      ],
      "gaps": "图文只重点讲 content 类型，rw 类型与布尔值的配合靠 must_know"
    },
    {
      "id": "12-10",
      "topic_id": "12",
      "title": "端口标签：semanage port 的 -a 与 -m",
      "question_ids": ["P213", "U08", "P205"],
      "video_ids": ["a-12-port"],
      "coverage": [
        "httpd 只能绑 http_port_t 端口",
        "无定义用 -a 新增",
        "已定义用 -m 修改",
        "firewalld 不能替代端口标签"
      ],
      "search_terms": ["semanage port http_port_t", "SELinux 端口 绑定 失败"],
      "must_know": [
        "httpd 默认只允许绑 `http_port_t` 的端口（80、81、443、488、8008、8009、8443、9000），另外还有 `http_cache_port_t`（8080 一类缓存端口）等少数类型。换到 7788 这类哪张表都没有的端口，绑定就被 `name_bind` 拒绝。",
        "端口没定义过 → `semanage port -a -t http_port_t -p tcp 7788`（add）。端口已被别的类型占用 → 先 `semanage port -l | grep 8088` 查清是谁在用，确认可以改之后用 `-m`（modify）。",
        "`-a` 报 already defined 就是这个坑：不要硬改别人的映射，先查用途，否则会连带弄坏依赖该端口的服务。",
        "firewalld 放行管的是客户端流量，管不了本机进程绑定端口——`name_bind` 被拒只能靠 SELinux 端口标签解决。",
        "`semanage` 在 RHEL 9 由 `policycoreutils-python-utils` 提供，没装会 command not found。"
      ],
      "gaps": "无中文短视频，靠图文 + must_know"
    },
    {
      "id": "12-11",
      "topic_id": "12",
      "title": "403 的证据链：AVC 怎么读",
      "question_ids": ["P204", "P211"],
      "video_ids": ["v-12-selinux-avc"],
      "coverage": [
        "ausearch -m avc 查拒绝",
        "AVC 里主体客体与被拒操作",
        "403 不一定来自 SELinux",
        "标签对了也可能 403"
      ],
      "search_terms": ["ausearch avc 排查", "SELinux 403 拒绝"],
      "must_know": [
        "先看有没有 AVC：`ausearch -m avc -ts recent`，或 `sealert -a /var/log/audit/audit.log`。AVC 里 `scontext` 是进程（主体）、`tcontext` 是文件（客体）、`tclass` 与 `denied` 是被拒的操作。",
        "没有 AVC 就不要往 SELinux 上赖。403 更常见的来源是 DAC（父目录缺 x 位）、Apache 的 `Directory` / `Require` 授权、以及请求路径指向了别的 `DocumentRoot`。",
        "标签正确只是必要条件之一，不保证返回 200。",
        "`dontaudit` 规则会把某些拒绝藏起来，怀疑有拒绝却查不到 AVC 时，先 `semodule -DB` 打开全部审计再复现，查完用 `semodule -B` 恢复。",
        "排查顺序：路径对不对 → DAC → Apache 授权 → SELinux 标签与 AVC，逐层排除，别一上来就 `setenforce 0`。"
      ],
      "gaps": "视频讲 SELinux 调查流程，httpd 的 Require 配置靠 must_know"
    },
    {
      "id": "12-12",
      "topic_id": "12",
      "title": "三层分工：应用、防火墙、SELinux",
      "question_ids": ["P206", "R09", "P210"],
      "video_ids": ["v-12-403", "a-12-fw-guide"],
      "coverage": [
        "监听 / 防火墙 / SELinux 三层都要过",
        "本机通远端超时先看绑定地址",
        "超时是连接层、403 是应用层",
        "关防护只能证明，不能修复"
      ],
      "search_terms": ["本机可以 远程访问不了 端口", "http 403 排查 顺序"],
      "must_know": [
        "一个端口对外可用要三层都过：应用层（进程真的在听 `ss -lntp`、绑的是对外地址而不是只绑 `127.0.0.1`）、防火墙（活动 zone 放行了该 tcp 端口）、SELinux（允许绑定该端口类型）。",
        "本机 `curl http://127.0.0.1:8088` 成功、远端超时：先看 `ss -lntp` 的监听地址是不是 `127.0.0.1:8088`，再查 zone 与网络路径。超时属于连接层，先别怀疑文件标签。",
        "超时和 403 是两码事：超时说明 TCP 没握上手（监听/防火墙/路由），403 说明连接通了但被应用层拒绝（路径/DAC/Require/SELinux）。",
        "新文档根 403 的检查顺序：各级父目录的 x 位与文件 r 位 → httpd 的 `Directory` / `Require` → SELinux 上下文与 AVC。",
        "关闭防火墙或 `setenforce 0` 只能用来确认「是不是它拦的」，不能当修复方案。"
      ],
      "gaps": "403 那条视频是 Nginx 视角，只作补充；三层清单靠 must_know"
    },
    {
      "id": "12-13",
      "topic_id": "12",
      "title": "OpenSSL：是库和工具，不是服务",
      "question_ids": ["A051"],
      "video_ids": ["v-12-openssl"],
      "coverage": [
        "密码学库 + 命令行工具",
        "不是邮件服务器 / 数据库 / 模板语言",
        "证书与密钥操作",
        "Web 的 TLS 依赖它"
      ],
      "search_terms": ["OpenSSL 是什么", "openssl 命令 证书"],
      "must_know": [
        "OpenSSL 是密码学库加一套命令行工具：生成密钥、签发与查看证书、算摘要、加解密、测 TLS 连接（`openssl s_client -connect host:443`）。",
        "它不是邮件服务器（MTA）、不是关系数据库、也不是模板语言。Web 服务可以依赖它做 TLS，但它是被依赖的库。",
        "常用两条：`openssl x509 -in cert.pem -text -noout` 看证书内容，`openssl req -new -key key.pem -out req.csr` 生成 CSR。",
        "同名容易混：`openssl` 是工具/库，`openssl-libs` 是运行库包，`openssh` 是完全不同的 SSH 实现。"
      ],
      "gaps": "视频只讲「是什么」，命令实操不在本题范围"
    },
    {
      "id": "12-14",
      "topic_id": "12",
      "title": "RHEL 7 救援时的 autorelabel",
      "question_ids": ["A095"],
      "video_ids": ["a-12-fcontext"],
      "coverage": [
        "/.autorelabel 是根目录下的标记文件",
        "必须写绝对路径",
        "chroot 后写的是目标系统",
        "重启触发全盘重标"
      ],
      "search_terms": ["autorelabel 重新标记 SELinux", "chroot 救援 重标"],
      "must_know": [
        "触发下次启动全盘重标：在**目标系统根目录**建 `/.autorelabel`，然后重启。文件名开头的点是文件名的一部分（隐藏文件），不是路径分隔符。",
        "必须绝对路径。chroot 到目标根之后，`touch /.autorelabel` 写的就是目标系统；`touch .autorelabel` 名字对但落在当前工作目录；`touch autorelabel` 既在当前目录、又少了前导点。",
        "全盘重标很慢（几分钟到几十分钟），只适合标签大面积错乱、或从 disabled 切回 enforcing 的场景；单点问题优先 `restorecon`。",
        "如果连登录都进不去，可在内核命令行加 `autorelabel=1` 触发重标，或加 `enforcing=0` 临时切 Permissive（对 Disabled 的系统无效）。"
      ],
      "gaps": "只有图文里提到 /.autorelabel，RHEL 7 救援场景靠 must_know"
    },
    {
      "id": "13-01",
      "topic_id": "13",
      "title": "NFS 是什么：exports 与服务端角色",
      "question_ids": ["A028", "A061"],
      "video_ids": ["v-13-nfs-basic", "v-13-nfs-rhel"],
      "coverage": [
        "NFS = Network File System",
        "/etc/exports 是导出规则文件",
        "「目录 客户端(选项)」的行格式",
        "exportfs -ra 让改动生效"
      ],
      "search_terms": ["NFS 是什么 exports 配置", "NFS 服务端 导出"],
      "must_know": [
        "NFS = Network File System，网络文件系统：客户端把远端导出的目录挂到本地，用起来像本地目录。",
        "服务端的导出规则全在 `/etc/exports`，一行「目录 客户端(选项)」，例如 `/srv/share 192.168.50.0/24(rw,sync)`；也可以把片段放 `/etc/exports.d/*.exports`。",
        "改完 exports 不必重启服务：`exportfs -ra` 重新导出全部条目，`exportfs -v` 看当前生效的导出。",
        "NFS 依赖 RPC：v4 只用 2049/tcp；v3 还要 `rpcbind`（111）和 mountd 等端口，防火墙策略不同。",
        "干扰项 `/etc/rc.d/rc.*` 是旧式启动脚本，与导出规则无关。"
      ],
      "gaps": "候选视频偏操作，RPC 与 v3/v4 的端口差异靠 must_know"
    },
    {
      "id": "13-02",
      "topic_id": "13",
      "title": "服务端准备：包、目录、导出、防火墙",
      "question_ids": ["P215"],
      "video_ids": ["v-13-nfs-setup"],
      "coverage": [
        "安装 nfs-utils",
        "建目录、写 exports",
        "启动 nfs-server 服务",
        "firewalld 放行 nfs"
      ],
      "search_terms": ["RHEL9 配置 NFS 服务端", "nfs-utils firewall-cmd add-service=nfs"],
      "must_know": [
        "四步：装 `nfs-utils` → 建目录并设权限 → 写 `/etc/exports` → `systemctl enable --now nfs-server`，再 `exportfs -ra`。",
        "防火墙：`firewall-cmd --permanent --add-service=nfs` 再 `--reload`；NFSv4 只需 2049/tcp，用 v3 还要 `mountd`、`rpc-bind` 两个 service。",
        "`chmod 777` 只改目录的 DAC 权限，既不导出目录也不启动服务，更不能替代防火墙规则。",
        "验证必须在客户端做：`showmount -e server` 看导出列表，再实际挂载并读写一次。"
      ],
      "gaps": "视频的发行版与服务名待验收；按 RHEL 9 的 nfs-server 与 nfs-utils 核对"
    },
    {
      "id": "13-03",
      "topic_id": "13",
      "title": "客户端挂载：语法与本地挂载点",
      "question_ids": ["P214"],
      "video_ids": ["v-13-nfs-basic"],
      "coverage": [
        "mount -t nfs server:/path /mnt",
        "来源写「服务器:远端路径」",
        "本地挂载点要先存在",
        "挂载成功要有证据"
      ],
      "search_terms": ["mount -t nfs 挂载", "showmount -e 查看导出"],
      "must_know": [
        "语法：`mount -t nfs server:/srv/share /mnt/share`。`server:/srv/share` 是「服务器:远端导出路径」，`/mnt/share` 是本机挂载点。",
        "挂载点目录要先 `mkdir -p`，但目录存在不等于挂上了——`findmnt /mnt/share` 或 `mount | grep share` 才算证据。",
        "前提四件事：网络可达、服务端已导出、本客户端在允许范围内、防火墙放行。",
        "卸载 `umount /mnt/share`；提示 busy 先用 `lsof +f -- /mnt/share` 找占用进程。"
      ],
      "gaps": "与 13-01 共用同一条 4:00 视频，挂载部分占比待验收；RHEL 实录那条只在 13-01 作补充"
    },
    {
      "id": "13-04",
      "topic_id": "13",
      "title": "root_squash 与 ro：权限谁说了算",
      "question_ids": ["P217", "P216"],
      "video_ids": ["v-13-root-squash"],
      "coverage": [
        "root_squash 把客户端 root 映射为匿名",
        "它不提升普通用户",
        "ro 是服务端导出选项",
        "chmod 777 绕不过 ro"
      ],
      "search_terms": ["NFS root_squash 权限", "NFS ro 只读 写入失败"],
      "must_know": [
        "`root_squash`（默认开）把客户端 UID 0 的请求映射成服务端的匿名身份（老系统是 `nfsnobody`，新系统是 `nobody`）。它降低远程 root 的特权，不会把普通用户提升成 root。",
        "映射之后能不能写，还要看导出选项（`rw`/`ro`）、目录属主和 DAC 权限——映射成 nobody 之后，目录对 nobody 没有写权限照样写不进去。",
        "`ro` 是**服务端**导出选项，客户端 `chmod 777`、重建挂载点、用 root 都绕不过去；要写只能在服务端把该导出改成 `rw` 并 `exportfs -ra`。",
        "反过来 `no_root_squash` 让客户端 root 保留 root 身份，风险高，只在完全受控的场景用。"
      ],
      "gaps": "视频基于 CentOS 7，匿名用户名从 nfsnobody 改成 nobody 这点靠 must_know"
    },
    {
      "id": "13-05",
      "topic_id": "13",
      "title": "开机自动挂载与验收",
      "question_ids": ["P221"],
      "video_ids": ["v-13-nfs-setup"],
      "coverage": [
        "写 /etc/fstab 实现持久挂载",
        "_netdev 等网络就绪",
        "启动时序会决定成败",
        "验收要有来源和目标的证据"
      ],
      "search_terms": ["NFS 开机自动挂载 fstab", "fstab _netdev nfs"],
      "must_know": [
        "持久化最常见的一条路是写 `/etc/fstab`：`server:/srv/share /mnt/share nfs defaults,_netdev 0 0`。（按需挂载的方案见下一节 autofs。）",
        "`_netdev` 告诉系统这是网络设备，等网络就绪再挂；没有它，开机时网络还没起来会挂载失败，甚至拖慢启动。",
        "验收顺序：`mount -a` 不报错 → `findmnt` 看到来源和目标都对 → 实际读写一次。目录存在不能当证据。",
        "服务端没起来时客户端会卡住或超时；把挂载从启动关键路径上挪开（例如 `x-systemd.automount`）能缓解，具体做法见下一节 autofs。"
      ],
      "gaps": "没有专门讲 fstab 与启动时序的中文短视频，靠 must_know"
    },
    {
      "id": "13-06",
      "topic_id": "13",
      "title": "autofs 按需挂载",
      "question_ids": ["P218"],
      "video_ids": ["v-13-autofs"],
      "coverage": [
        "访问时才挂载",
        "空闲后自动卸载",
        "只装包不配映射没用",
        "超时由 timeout 决定"
      ],
      "search_terms": ["autofs 按需挂载", "autofs timeout 自动卸载"],
      "must_know": [
        "autofs 按需：访问匹配路径时才挂载，空闲一段时间后自动卸载（`timeout` 控制；`autofs.conf` 里默认写 300 秒，程序内部默认 600 秒）。",
        "只装 `autofs` 包不够，必须写映射文件并启动 `autofs` 服务；没映射它不知道服务器、键和目录。",
        "好处是几十上百个 NFS 家目录不必开机全挂，也不会因为某台服务端没起来拖慢启动。",
        "空闲卸载取决于超时设置和是否仍被占用，不是「一关窗口就卸」。"
      ],
      "gaps": "视频是 RHCSA 实验，timeout 默认值与卸载时机靠 must_know"
    },
    {
      "id": "13-07",
      "topic_id": "13",
      "title": "主映射与直接 / 间接映射",
      "question_ids": ["P220", "P219"],
      "video_ids": ["v-13-autofs"],
      "coverage": [
        "/etc/auto.master 一行一个基目录",
        "间接映射的键相对基目录",
        "直接映射用 /- 作挂载点",
        "访问路径触发挂载"
      ],
      "search_terms": ["auto.master 直接映射 间接映射", "autofs /- 写法"],
      "must_know": [
        "主映射 `/etc/auto.master` 一行「基目录 映射文件」，如 `/home/remote /etc/auto.home`。",
        "间接映射：键相对基目录。键写 `alice`，对应路径就是 `/home/remote/alice`，访问它才触发挂载。",
        "直接映射：主映射的挂载点写 `/-`，映射文件里每条写完整本地路径，如 `/opt/data -rw server:/srv/data`。",
        "改完映射 `systemctl reload autofs`；排查看 `/var/log/messages` 里的 automount 记录，日志不够细时先在 `autofs.conf` 打开 `logging = debug`。"
      ],
      "gaps": "视频是 RHCSA 实验，直接映射的 /- 写法是否讲到待验收"
    },
    {
      "id": "13-08",
      "topic_id": "13",
      "title": "DNS 的端口与 BIND / named",
      "question_ids": ["A100", "A098"],
      "video_ids": ["v-13-dns"],
      "coverage": [
        "53 端口同时用 UDP 与 TCP",
        "BIND 的守护进程是 named",
        "其它服务的进程名别混",
        "主配置与区域文件位置"
      ],
      "search_terms": ["DNS 53 端口 UDP TCP", "BIND named 配置"],
      "must_know": [
        "DNS 用 53 端口，UDP 和 TCP 都用：UDP 承载常规查询（传统上限 512 字节，EDNS0 之后约 4096）；响应超出承载能力、或做区域传送时改用 TCP。",
        "Linux 上最常见的是 BIND，软件包 `bind`，守护进程 `named`，主配置 `/etc/named.conf`，区域文件在 `/var/named/`。",
        "配对别混：`dhcpd` 是 DHCP、`chronyd` 是时间同步、`httpd` 是 Web、`smbd`/`nmbd` 是 Samba、`postfix` 是邮件。",
        "RHEL 9 的 `named` 以 `named` 用户运行，区域文件属主或权限不对会直接起不来，日志里看 `zone ... loading failed`。"
      ],
      "gaps": "主视频 16:50 超 15 分钟参考值（见台账例外），待验收"
    },
    {
      "id": "13-09",
      "topic_id": "13",
      "title": "区域文件与 CNAME",
      "question_ids": ["A056"],
      "video_ids": ["v-13-dns-linux"],
      "coverage": [
        "CNAME 是别名指向规范名",
        "A / AAAA / MX / NS / PTR 各自职责",
        "CNAME 不能与其它记录共存",
        "改完要递增 SOA 序列号"
      ],
      "search_terms": ["DNS 记录类型 CNAME MX NS PTR", "区域文件 SOA 序列号"],
      "must_know": [
        "CNAME 记录把一个别名指向规范名称，如 `www IN CNAME web1`。A → IPv4，AAAA → IPv6，MX → 邮件交换，NS → 权威服务器，PTR → 反向解析。",
        "同一个名字只能有一条 CNAME，而且不能再挂 A、MX 等其它记录；区顶点（`@`）也不能是 CNAME。",
        "区域文件改完要递增 SOA 的序列号，`named-checkzone 区名 文件名` 校验语法，再 `rndc reload` 重载。",
        "从服务器靠序列号判断要不要做区域传送，忘了加序号会出现「主从数据不一致」。"
      ],
      "gaps": "视频以搭建为主，CNAME 与其它记录的辨析靠 must_know"
    },
    {
      "id": "13-10",
      "topic_id": "13",
      "title": "Samba 的 smbd / nmbd 与角色",
      "question_ids": ["A060", "A036"],
      "video_ids": ["v-13-samba"],
      "coverage": [
        "smbd 管 SMB 文件与打印",
        "nmbd 管 NetBIOS 名称",
        "Samba 是文件共享不是 DNS",
        "权威 / 递归解析器都是 DNS 角色"
      ],
      "search_terms": ["Samba smbd nmbd 区别", "samba smb.conf 配置"],
      "must_know": [
        "传统独立 Samba 部署两个守护进程：`smbd` 提供 SMB 文件与打印共享并负责认证（445/tcp，兼容老客户端时也走 139/tcp 的 NetBIOS 会话）；`nmbd` 提供 NetBIOS 名称解析与网络浏览（137/udp、138/udp）。",
        "现代纯 SMB2/3 环境可以只跑 `smbd`；`nmbd` 主要是给老式 Windows「网络邻居」用的。",
        "在「独立文件服务器」这个场景里，Samba 是文件共享服务、不是 DNS 服务器（Samba 4 当 AD DC 时自带 DNS，那是另一回事）。权威主/从服务器、递归缓存解析器都是 DNS 的角色。",
        "配置在 `/etc/samba/smb.conf`；SMB 用户要 `smbpasswd -a 用户` 单独设密码，和系统密码是两套。"
      ],
      "gaps": "视频版本未知，待验收；是否讲到 smbd / nmbd 两个进程需人工确认，nmbd 在现代环境要不要跑靠 must_know"
    },
    {
      "id": "13-11",
      "topic_id": "13",
      "title": "端口与协议对照：HTTP、SMTP、POP3",
      "question_ids": ["A049", "A057", "A097"],
      "video_ids": ["a-13-ports", "v-13-mail"],
      "coverage": [
        "http 默认 80、https 默认 443",
        "SMTP 提交与传输、POP3 取信",
        "Postfix 是 MTA",
        "方向别搞反"
      ],
      "search_terms": ["常用端口 80 25 110 143", "SMTP POP3 区别"],
      "must_know": [
        "`http://` 不写端口就是 80/tcp，`https://` 是 443/tcp；自定义端口要在 URL 里显式写。",
        "SMTP 25 主要用于 MTA 之间传输（传统上也接受客户端提交）；587 是标准提交端口（STARTTLS），465 是隐式 TLS 提交。POP3(110) 管客户端取信，IMAP(143) 管在线同步。",
        "Postfix 是 MTA（邮件传输代理），负责接收、路由、投递；取信是 Dovecot 这类 IMAP/POP3 服务的事。",
        "方向别搞反：POP3 不负责发信，SMTP 也不只是「用来解析 DNS」——投递时可能查 DNS 的 MX 记录，但那是借用。"
      ],
      "gaps": "只有端口对照图文；邮件视频作者自述可能有讲错处，只作补充"
    },
    {
      "id": "13-12",
      "topic_id": "13",
      "title": "FTP：ASCII / binary 与匿名",
      "question_ids": ["A048", "A022", "A043"],
      "video_ids": ["v-13-ftp"],
      "coverage": [
        "ASCII 与 binary 两种类型",
        "FTP 是专用 C/S 文件传输协议",
        "匿名用户名 anonymous",
        "控制连接 21，数据连接另开"
      ],
      "search_terms": ["FTP ASCII binary 传输模式", "FTP 匿名登录 anonymous"],
      "must_know": [
        "两种数据表示：ASCII（文本，会做换行转换）和 binary / image（按原始字节）。传压缩包、镜像、可执行文件必须用 binary，用 ASCII 会损坏文件。",
        "FTP 是传统专用的客户端/服务器文件传输协议：控制连接 21/tcp，数据连接另开（主动 PORT / 被动 PASV）。",
        "匿名登录的用户名是 `anonymous`（密码习惯填邮箱），实际能访问什么由服务端配置决定，跟用户名无关。",
        "FTP 明文传密码，不安全；现在多用 SFTP（走 SSH）或 FTPS。"
      ],
      "gaps": "视频讲主动/被动模式，ASCII 与 binary 靠 must_know"
    },
    {
      "id": "13-13",
      "topic_id": "13",
      "title": "SSH / Telnet / SFTP 对比",
      "question_ids": ["P222"],
      "video_ids": ["a-13-ports"],
      "coverage": [
        "SSH 加密远程登录",
        "SFTP 走 SSH 通道",
        "Telnet 明文",
        "换端口不改协议"
      ],
      "search_terms": ["SSH Telnet 区别", "SFTP 与 FTP 区别"],
      "must_know": [
        "SSH（22/tcp）提供加密的远程登录与文件传输通道；Telnet（23/tcp）是明文，密码在网络上裸奔，只该出现在实验环境。",
        "SFTP 是跑在 SSH 通道里的文件传输协议，和传统 FTP 不是一回事：单端口、全程加密、不用另开数据连接。",
        "把 Telnet 改到别的端口还是 Telnet，换端口不改变协议的安全属性；判断安全与否看协议本身有没有加密与认证。",
        "常见混淆：OpenSSH 自带 `sftp` 客户端，服务端由 `sshd` 的 sftp 子系统提供；`vsftpd` 是 FTP 服务，两者无关。"
      ],
      "gaps": "只有端口对照图文，本节主要靠 must_know"
    },
    {
      "id": "13-14",
      "topic_id": "13",
      "title": "三种存储与 iSCSI",
      "question_ids": ["A003"],
      "video_ids": ["a-13-storage"],
      "coverage": [
        "iSCSI 给客户端的是块设备",
        "NFS / SMB 是文件级",
        "initiator 与 target、3260",
        "块设备一般只能单机挂"
      ],
      "search_terms": ["iSCSI 块存储 原理", "块存储 文件存储 区别"],
      "must_know": [
        "iSCSI 把远端 LUN 以**块设备**形式交给客户端（`/dev/sdb` 这种），客户端自己分区、建文件系统；NFS/SMB 交的是目录树，属于文件级。",
        "两个角色：initiator（客户端，`iscsi-initiator-utils`）和 target（服务端），默认 3260/tcp。",
        "块设备一般只能被一台主机挂载（除非用集群文件系统），文件级共享才能多机同时读写。",
        "选型直觉：块存储延迟低适合数据库；文件存储共享方便；对象存储适合海量非结构化数据。"
      ],
      "gaps": "只有图文，没有合适的中文短视频"
    },
    {
      "id": "13-15",
      "topic_id": "13",
      "title": "B/S 架构与 PHP + MySQL",
      "question_ids": ["A027", "A050"],
      "video_ids": ["v-13-bs"],
      "coverage": [
        "B/S = Browser/Server",
        "与 C/S 的区别",
        "PHP 在服务端连 MySQL 读写",
        "浏览器 → Web → 数据库 三层"
      ],
      "search_terms": ["B/S C/S 架构区别", "PHP MySQL Web 工作原理"],
      "must_know": [
        "B/S = Browser/Server：页面与业务逻辑由服务端生成，浏览器负责渲染和交互，客户端零安装；C/S 是胖客户端，要装程序。",
        "PHP 跑在 Web 服务器侧，通过 MySQL 客户端库连数据库，执行查询或更新，把结果渲染成 HTML 返回给浏览器。",
        "典型三层：浏览器 → Web 服务器（httpd/nginx + PHP）→ 数据库（MySQL）。PHP 不替代操作系统的文件权限模型。",
        "干扰项：SCSI、RAID、LVM 都是存储术语，跟 Web 架构无关。"
      ],
      "gaps": "视频只讲 B/S 与 C/S，PHP+MySQL 那半靠 must_know"
    },
    {
      "id": "13-16",
      "topic_id": "13",
      "title": "Squid 与 cache_mem",
      "question_ids": ["A062"],
      "video_ids": ["a-13-squid"],
      "coverage": [
        "cache_mem 设内存缓存",
        "cache_dir 设磁盘缓存",
        "http_port 3128",
        "单位要带 MB"
      ],
      "search_terms": ["squid cache_mem 配置", "squid.conf 常用参数"],
      "must_know": [
        "`cache_mem 64 MB` 设内存里放热点对象的容量；`cache_dir ufs /var/spool/squid 2000 16 256` 设磁盘缓存目录与规模（MB / 一级目录数 / 二级目录数）。",
        "`http_port 3128` 是默认监听端口；`maximum_object_size` 限制单个对象能否进缓存。",
        "单位要写全：`64 MB`；只写 `64` 会被当成字节，等于没开缓存。",
        "别和 `memory_limit`、`cache` 混——旧教材里这几个名字很像，只有 `cache_mem` 是内存对象缓存。"
      ],
      "gaps": "只有图文，没有合适的中文短视频"
    },
    {
      "id": "14-01",
      "topic_id": "14",
      "title": "Podman 是什么：rootless 与 rootful",
      "question_ids": ["P223"],
      "video_ids": ["v-14-podman-intro", "v-14-cmp"],
      "coverage": [
        "无守护进程，命令与 docker 相似",
        "普通用户跑 rootless、sudo 跑 rootful",
        "两套存储互相看不见",
        "sudo podman 不是唯一正确用法"
      ],
      "search_terms": ["Podman rootless rootful 区别", "Podman 与 Docker 区别"],
      "must_know": [
        "Podman 是 RHEL 上的容器引擎，默认**无守护进程**（daemonless），命令与 docker 高度相似，但不需要常驻的 dockerd。",
        "两种跑法都合法：普通用户直接 `podman run` 是 rootless（在用户命名空间里映射 UID）；`sudo podman run` 是 rootful，能拿到系统级权限。用哪种看场景，不存在「只有 sudo 才对」。",
        "两套存储分开：rootless 默认在 `~/.local/share/containers/storage`（受 `$XDG_DATA_HOME` 影响），rootful 在 `/var/lib/containers/storage`，所以在一边 `podman ps -a` 看不到另一边的容器。",
        "Red Hat 推荐 rootless，非 root 用户直接 `podman run` 就是 rootless。真正需要 rootful 的是「把容器端口发布到宿主 1024 以下」（如 `-p 80:80`）、读系统设备这类操作——容器**内部**监听 22 之类的低端口在 rootless 下没问题。"
      ],
      "gaps": "候选视频偏概念，存储路径与用户命名空间的细节靠 must_know"
    },
    {
      "id": "14-02",
      "topic_id": "14",
      "title": "镜像与容器：两套对象别混",
      "question_ids": ["P224"],
      "video_ids": ["v-14-podman-8min"],
      "coverage": [
        "镜像是只读模板",
        "容器是运行或已创建的实例",
        "podman images 与 podman ps -a 对象不同",
        "删镜像受容器引用影响"
      ],
      "search_terms": ["Podman 镜像 容器 区别", "podman images ps -a"],
      "must_know": [
        "镜像是只读模板，容器是由它创建的实例（可以运行，也可以已停止）。一个镜像能起多个容器。",
        "`podman images` 列本地镜像；`podman ps` 列运行中的容器，`podman ps -a` 连已停止的一起列。两者查的是不同对象。",
        "删镜像：`podman rmi` 在还有容器引用时会失败（提示 image is in use by a container）。`-f` 会**先把使用它的容器删掉**再删镜像——这点和 Docker 的 `-f` 正好相反，别记混。",
        "`podman rmi -a` 遇到被引用的镜像同样会报错；要连容器一起清是 `podman rmi -a -f`。"
      ],
      "gaps": "视频是入门操作演示，镜像与容器的引用关系靠 must_know"
    },
    {
      "id": "14-03",
      "topic_id": "14",
      "title": "podman ps 的范围：-a 与用户上下文",
      "question_ids": ["P225", "P228"],
      "video_ids": ["v-14-podman-cmd"],
      "coverage": [
        "ps 默认只看运行中",
        "-a 含已停止容器",
        "rootless 与 rootful 两套存储",
        "用创建者身份查才对"
      ],
      "search_terms": ["podman ps -a 已退出容器", "sudo podman ps 看不到"],
      "must_know": [
        "`podman ps` 默认只列**运行中**的容器；容器退出后必须 `podman ps -a` 才看得到。",
        "rootless 与 rootful 是两套存储：alice 的 rootless 容器，`sudo podman ps -a` 看不到；要用 alice 身份查（`sudo -iu alice podman ps -a`，或 `machinectl shell alice@`；前者可能因 `XDG_RUNTIME_DIR` 缺失告警，不影响查询）。",
        "看不到不等于不存在。先确认三件事：用没用 `-a`、当前是哪个用户、容器是不是在另一个存储范围。",
        "同理 `podman images`、`podman volume ls` 也分用户范围，跨用户排查最稳的是切到对应用户。"
      ],
      "gaps": "主视频 16:00 超 15 分钟参考值，见台账例外说明"
    },
    {
      "id": "14-04",
      "topic_id": "14",
      "title": "诊断命令配对：logs、exec、inspect",
      "question_ids": ["P226"],
      "video_ids": ["v-14-podman-cmd"],
      "coverage": [
        "logs 看主进程输出",
        "exec 进运行中的容器",
        "inspect 看配置与状态",
        "images 不是进程列表"
      ],
      "search_terms": ["podman logs exec inspect", "容器启动失败 排查"],
      "must_know": [
        "`podman logs NAME` 看容器主进程的输出，加 `-f` 跟踪；「起来就退出」先看它。",
        "`podman exec -it NAME /bin/sh` 进**运行中**的容器里查；容器已退出时 exec 会失败，要先 `podman start`，或 `podman run --rm -it 镜像 sh` 另起一个。",
        "`podman inspect NAME` 输出 JSON，看挂载、网络、环境变量和退出码（`.State.ExitCode`）。",
        "`podman images` 列的是镜像，不是容器进程；要看容器里的进程用 `podman top NAME` 或宿主机 `ps`。"
      ],
      "gaps": "与 14-03 共用同一条 16:00 视频"
    },
    {
      "id": "14-05",
      "topic_id": "14",
      "title": "宿主机目录挂载的 SELinux 标签：:z 与 :Z",
      "question_ids": ["P227"],
      "video_ids": ["a-14-volume"],
      "coverage": [
        "默认不改宿主机标签",
        ":z 共享标签",
        ":Z 私有标签",
        "别给系统目录递归打标签"
      ],
      "search_terms": ["podman -v :z :Z 区别", "容器 挂载 SELinux 权限"],
      "must_know": [
        "这里说的是 bind mount（`-v 宿主目录:容器目录`），不是命名数据卷。挂载宿主机目录时 SELinux 可能挡住容器进程：`podman run -v /host:/data ...` 默认**不改**宿主机文件的标签。",
        "`:z` 把目录递归标成共享标签，多个容器都能读写；`:Z` 标成私有，只给这一个容器用。",
        "同一个目录要给多个容器共享，就别用 `:Z`——它改成私有标签后，别的容器会因为标签不匹配进不去。",
        "别对 `/`、`/home`、`/var/log` 这类系统目录递归打标签，会影响宿主机上其它受限服务；这种场景应该关掉该容器的 SELinux 分离（`--security-opt label=disable`）。"
      ],
      "gaps": "没有中文短视频，只有一篇 man 页译文图文"
    },
    {
      "id": "14-06",
      "topic_id": "14",
      "title": "Quadlet：声明式的 systemd 集成",
      "question_ids": ["P229", "P230"],
      "video_ids": ["v-14-quadlet"],
      "coverage": [
        ".container 文件放哪儿",
        "改完要 daemon-reload",
        "注销后运行要 linger",
        "Quadlet 是新推荐，旧命令也真存在过"
      ],
      "search_terms": ["Quadlet .container 配置", "podman generate systemd 弃用"],
      "must_know": [
        "Quadlet 是声明式做法：写一个 `.container` 文件，systemd 生成器把它变成 service。用户级放 `~/.config/containers/systemd/`，系统级放 `/etc/containers/systemd/`。",
        "写完要 `systemctl --user daemon-reload`（系统级 Quadlet 则是不带 `--user` 的 `systemctl daemon-reload`），生成器才会读到新文件；再 `systemctl --user start 名字.service`。",
        "只创建文件不保证注销后还在跑：要 `loginctl enable-linger 用户`，用户管理器才会在没有登录会话时继续运行。",
        "Quadlet 是当前版本的推荐方式，但 `podman generate systemd` 确实存在过（Podman 4.4 起标记弃用）。「推荐变了」不等于「历史上没有」。",
        "「旧教程提过容器，所以现在 EX200 必考容器」这类推断不成立，考试范围只看当期官方目标。"
      ],
      "gaps": "候选视频是否讲到 linger 待验收；`generate systemd` 的历史沿革靠 must_know"
    },
    {
      "id": "14-07",
      "topic_id": "14",
      "title": "docker run -p 与 EXPOSE 的分工",
      "question_ids": ["R10", "R11"],
      "video_ids": ["v-14-docker-port"],
      "coverage": [
        "-p 宿主:容器 的顺序",
        "--expose 与 EXPOSE 只声明",
        "sshd -D 让主进程留在前台",
        "--network none 与映射无关"
      ],
      "search_terms": ["docker run -p 端口映射", "Dockerfile EXPOSE 作用"],
      "must_know": [
        "`-p 宿主端口:容器端口`：`docker run -p 12345:22` 把宿主 12345 转到容器 22。写反成 `-p 22:12345` 就成了「宿主 22 → 容器 12345」。",
        "Dockerfile 的 `EXPOSE` 把端口写进镜像元数据，`--expose` 只在运行时给本次容器加声明，两者都**不发布**到宿主。发布要 `-p 宿主:容器`；`-P` 是把所有已声明的端口映射到宿主的随机端口。",
        "`sshd -D` 里的 `D` 是 no-detach：让 sshd 不转后台、保持前台，容器主进程才不会一启动就退出。它不改变监听端口。",
        "`--network none` 直接断网，跟端口映射是两回事。"
      ],
      "gaps": "视频讲端口映射，EXPOSE 与 sshd -D 靠 must_know"
    },
    {
      "id": "14-08",
      "topic_id": "14",
      "title": "云服务交付模型：IaaS / PaaS / SaaS",
      "question_ids": ["A091"],
      "video_ids": ["v-14-cloud"],
      "coverage": [
        "三个交付模型各自交付什么",
        "OpenStack 不是交付模型",
        "边界记忆法"
      ],
      "search_terms": ["IaaS PaaS SaaS 区别", "云服务模型"],
      "must_know": [
        "三个交付模型：IaaS 交付基础设施（虚机、存储、网络）、PaaS 交付运行平台（中间件、数据库服务）、SaaS 交付现成软件。",
        "OpenStack 是**构建云的开源项目集合**，不是与 IaaS/PaaS/SaaS 并列的交付模型——它更像是「自己搭一个 IaaS」的工具箱。",
        "记忆锚点：IaaS 你还要管系统和应用，PaaS 你只管应用，SaaS 你只管用。",
        "同类干扰项还有「公有云/私有云/混合云」——那是部署形态，不是交付模型。"
      ],
      "gaps": "视频 2:11 只做概念区分，OpenStack 的定位靠 must_know"
    },
    {
      "id": "14-09",
      "topic_id": "14",
      "title": "OpenStack 的核心组件",
      "question_ids": ["A092"],
      "video_ids": ["v-14-openstack"],
      "coverage": [
        "Keystone 认证、Nova 计算",
        "Neutron 网络、Horizon 面板",
        "Glance / Cinder / Swift 等",
        "Horizon 不是认证后端"
      ],
      "search_terms": ["OpenStack 组件 Keystone Nova Neutron", "OpenStack 架构"],
      "must_know": [
        "四个最核心的组件：Keystone（身份认证）、Nova（计算/虚机）、Neutron（网络）、Horizon（Web 控制台）。",
        "顺带记住：Glance（镜像）、Cinder（块存储）、Swift（对象存储）、Heat（编排）、Ceilometer（计量）。",
        "别把 Horizon 当认证后端——认证是 Keystone 的事，Horizon 只是界面。",
        "OpenStack 是 IaaS 平台的实现，组件名都是项目代号，不是交付模型。"
      ],
      "gaps": "视频 3:56 只够列组件名，各组件职责靠 must_know"
    },
    {
      "id": "14-10",
      "topic_id": "14",
      "title": "Redis 与关系型数据库",
      "question_ids": ["A093"],
      "video_ids": ["v-14-redis"],
      "coverage": [
        "Redis 是内存键值 / 数据结构存储",
        "MySQL / PostgreSQL / Oracle 是关系型",
        "用途差异与常见组合"
      ],
      "search_terms": ["Redis 是什么 内存数据库", "关系型 非关系型 区别"],
      "must_know": [
        "Redis 主要是内存里的键值与数据结构存储（字符串、哈希、列表、集合、有序集合），不是关系型数据库：没有表、没有 SQL、没有外键。",
        "MySQL、PostgreSQL、Oracle 都是关系型数据库，以表 + SQL 为核心。",
        "常见组合：MySQL 存业务数据，Redis 做缓存、会话、排行榜。",
        "Redis 可以持久化（RDB 快照 / AOF 日志），但定位仍是内存存储，重启丢数据的风险要按配置评估。"
      ],
      "gaps": "视频 2:50 只对比 MySQL 与 Redis，数据结构类型靠 must_know"
    }
  ]
};