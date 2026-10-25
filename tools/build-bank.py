#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""用《建策杯Linux_360题_逐项解析与知识补充.md》重建题库的解析字段。

用法：
    python tools/build-bank.py "C:/path/to/建策杯Linux_360题_逐项解析与知识补充.md"

做的事：
  1. 按 `#### A001 多选题` 分块解析出题干、选项、答案、A—D 逐项解析、补充知识、依据来源；
  2. 与现有 assets/js/bank.js 逐题核对（题干、选项、答案、题型、解析项顺序），有差异直接报错；
  3. 把 analysis / notes / source_refs / version / priority 写回 bank.js，删掉旧的 explanation；
  4. 解析文档里出现、但题库 sources 没有的来源键，按文末链接定义补进 sources。

题号（id）必须与题库一致，否则视为解析文档版本不匹配。
"""
import json
import os
import re
import sys

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BANK = os.path.join(SITE, 'assets/js/bank.js')
DEFAULT_MD = '建策杯Linux_360题_逐项解析与知识补充.md'
EXPLAIN_VERSION = '2026-10-23 · 逐项解析版'

ESC = [('\\' + c, c) for c in '_$>*|[]#{}<.()~`']
ESC.append(('\\\\', '\\'))


def unescape(s):
    for a, b in ESC:
        s = s.replace(a, b)
    return s


def parse_sources(line):
    return [{'label': unescape(m.group(1)), 'key': m.group(2)}
            for m in re.finditer(r'\[([^\]]+)\]\[([A-Z0-9_]+)\]', line)]


def parse_md(path):
    text = open(path, encoding='utf-8').read()
    cut = text.find('## 来源与使用说明')
    body, tail = (text[:cut], text[cut:]) if cut > 0 else (text, '')
    defs = dict(re.findall(r'^\[([A-Z0-9_]+)\]:\s*(\S+)\s*$', tail, re.M))

    items, cur = {}, None
    last = None  # ('opt'|'item'|'note', key)

    def flush():
        nonlocal cur
        if cur:
            items[cur['id']] = cur
            cur = None

    for raw in body.split('\n'):
        line = raw.strip()
        if line.startswith('#### '):
            flush()
            m = re.match(r'#### ([A-Z]\d+) (单选题|多选题)', line)
            if not m:
                raise SystemExit('题目标题异常: ' + line)
            cur = {'id': m.group(1), 'type': 'single' if m.group(2) == '单选题' else 'multiple',
                   'stem_lines': [], 'options': {}, 'answer': [], 'analysis': [],
                   'notes': [], 'tech': [], 'origin': [], 'meta': {}}
            last = None
            continue
        if line.startswith('## ') or line.startswith('### '):
            flush()
            continue
        if cur is None or not line:
            continue

        if line.startswith('**答案：'):
            cur['answer'] = [x for x in re.split(r'[、,，]', line[5:].rstrip('*').strip()) if x]
            last = None
        elif line == '**逐项解析**':
            last = None
        elif re.match(r'^\*\*[A-D]\.\*\*', line):
            m = re.match(r'^\*\*([A-D])\.\*\*\s*(.*)$', line)
            cur['options'][m.group(1)] = unescape(m.group(2)).strip()
            last = ('opt', m.group(1))
        elif re.match(r'^\*\*[A-D]｜', line):
            m = re.match(r'^\*\*([A-D])｜([^*]+)\*\*(.*)$', line)
            cur['analysis'].append({'k': m.group(1), 'v': m.group(2).strip(),
                                    't': unescape(m.group(3)).strip()})
            last = ('item', m.group(1))
        elif re.match(r'^\*\*(补充|本题要点)', line):
            m = re.match(r'^\*\*([^*]+?)[：:]\*\*\s*(.*)$', line)
            if not m:
                raise SystemExit('补充行格式异常: ' + line[:40])
            cur['notes'].append({'h': unescape(m.group(1)).strip(), 't': unescape(m.group(2)).strip()})
            last = ('note', len(cur['notes']) - 1)
        elif line.startswith('补充资料'):
            cur['tech'] += parse_sources(line)
            last = None
        elif line.startswith('适用版本'):
            m = re.search(r'适用版本：(.+?)。', line)
            if m:
                cur['meta']['version'] = m.group(1).strip()
            m = re.search(r'学习层次：(.+?)。?$', line)
            if m:
                cur['meta']['level'] = m.group(1).strip()
            last = None
        elif line.startswith('技术依据'):
            cur['tech'] = parse_sources(line) + cur['tech']
            last = None
        elif line.startswith('原题来源'):
            cur['origin'] = parse_sources(line)
            last = None
        else:
            if last is None:
                if not cur['options'] and not cur['answer']:
                    cur['stem_lines'].append(line)
                else:
                    raise SystemExit('无法归属的行: ' + line[:50])
            elif last[0] == 'item':
                for it in cur['analysis']:
                    if it['k'] == last[1]:
                        it['t'] += unescape(line)
            elif last[0] == 'note':
                cur['notes'][last[1]]['t'] += unescape(line)
            elif last[0] == 'opt':
                cur['options'][last[1]] += unescape(line)
    flush()

    for q in items.values():
        q['stem'] = unescape(''.join(q.pop('stem_lines'))).strip()
        seen, tech = set(), []
        for s in q['tech']:
            if s['key'] not in seen:
                seen.add(s['key'])
                tech.append(s)
        q['tech'] = tech
    return items, defs


def load_bank():
    s = open(BANK, encoding='utf-8').read()
    return json.loads(s[len('window.LINUX_BANK='):].rstrip().rstrip(';'))


def main():
    md = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.getcwd(), DEFAULT_MD)
    if not os.path.exists(md):
        raise SystemExit('找不到解析文档: ' + md)

    items, defs = parse_md(md)
    bank = load_bank()
    qs = bank['questions']
    print('解析题数', len(items), '题库题数', len(qs))

    problems = []
    for q in qs:
        it = items.get(q['id'])
        if not it:
            problems.append(('缺解析', q['id']))
            continue
        if it['stem'] != q['stem']:
            problems.append(('题干不一致', q['id']))
        if it['answer'] != q['answer']:
            problems.append(('答案不一致', q['id'], q['answer'], it['answer']))
        if it['type'] != q['type']:
            problems.append(('题型不一致', q['id'], q['type'], it['type']))
        if len(it['analysis']) != len(q['options']):
            problems.append(('解析项数不符', q['id'], len(q['options']), len(it['analysis'])))
        keys = [a['k'] for a in it['analysis']]
        if keys != [o['id'] for o in q['options']]:
            problems.append(('解析项顺序不符', q['id'], keys))
        if not it['meta'].get('version') or not it['meta'].get('level'):
            problems.append(('缺版本/层次', q['id']))
        if not it['tech']:
            problems.append(('缺技术依据', q['id']))
        for s in it['tech'] + it['origin']:
            if s['key'] not in bank['sources'] and s['key'] not in defs:
                problems.append(('未知来源键', q['id'], s['key']))
    if problems:
        print('校验问题:', len(problems))
        for p in problems[:15]:
            print('  ', p)
        raise SystemExit('校验未通过，未写入。请先修正解析文档或题库。')

    added = 0
    for it in items.values():
        for s in it['tech'] + it['origin']:
            k = s['key']
            if k in bank['sources']:
                continue
            url = defs.get(k, '')
            if not url:
                continue
            bank['sources'][k] = {'title': s['label'], 'url': url, 'kind': 'official_or_upstream'}
            added += 1
    print('新增来源条目:', added)

    changed_refs = 0
    for q in qs:
        it = items[q['id']]
        q['analysis'] = it['analysis']
        if it['notes']:
            q['notes'] = it['notes']
        elif 'notes' in q:
            del q['notes']
        new_refs = [s['key'] for s in it['tech']]
        if new_refs != q.get('source_refs'):
            changed_refs += 1
        q['source_refs'] = new_refs
        prov = q.setdefault('provenance', {})
        if it['origin']:
            prov['origin_source_refs'] = [s['key'] for s in it['origin']]
        q.pop('explanation', None)
        if it['meta'].get('version'):
            q['version'] = it['meta']['version']
        if it['meta'].get('level'):
            q['priority'] = it['meta']['level']

    print('依据来源有变化的题:', changed_refs)
    bank['explain_version'] = EXPLAIN_VERSION
    bank['explain_note'] = '解析于 %s 重写为逐项解析（A—D 分项说明 + 补充知识），依据来源同步更新。' % EXPLAIN_VERSION

    s = json.dumps(bank, ensure_ascii=False, separators=(',', ':'))
    open(BANK, 'w', encoding='utf-8').write('window.LINUX_BANK=' + s + ';\n')
    print('写出', BANK, len(s.encode('utf-8')), 'bytes')


if __name__ == '__main__':
    main()
