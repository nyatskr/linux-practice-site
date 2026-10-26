#!/usr/bin/env python3
"""薄入口：真正的实现在 tools/resource-audit/。

保留这个文件名，是为了让 `python tools/check-resources.py` 这条命令一直好用；
而把 `tools/resource-audit/` 整个目录复制到别的站点，它也能独立运行。
"""

import runpy
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
CORE = HERE / "resource-audit" / "check-resources.py"

if not CORE.exists():
    sys.exit(f"找不到巡检核心：{CORE}")

sys.path.insert(0, str(CORE.parent))
runpy.run_path(str(CORE), run_name="__main__")
