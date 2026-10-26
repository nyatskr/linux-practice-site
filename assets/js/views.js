/* views.js — 各页面渲染 */
(function () {
  'use strict';

  const LP = window.LP;
  const V = (LP.views = {});
  const esc = LP.esc;

  const MODE_LABEL = {
    topic: '专题练习',
    lesson: '小节练习',
    cluster: '分组练习',
    kp: '知识点练习',
    exam: '综合练习',
    wrong: '错题练习',
    review: '待复习',
    fav: '收藏练习',
    all: '全部题目',
    single: '单题查看',
  };
  V.MODE_LABEL = MODE_LABEL;

  /* ---------------- 小组件 ---------------- */

  function tag(text, cls) {
    return '<span class="tag ' + (cls || '') + '">' + esc(text) + '</span>';
  }

  function typeTag(q) {
    return q.type === 'single'
      ? '<span class="tag type-single">单选</span>'
      : '<span class="tag type-multi">多选</span>';
  }

  function statusDot(qid) {
    const st = LP.statusOf(qid);
    return '<i class="dot ' + st + '" title="' + LP.STATUS_LABEL[st] + '"></i>';
  }

  function statusTag(qid) {
    const st = LP.statusOf(qid);
    return '<span class="tag st-' + st + '">' + LP.STATUS_LABEL[st] + '</span>';
  }

  function bar(ratio, cls) {
    const w = LP.clamp(Math.round((ratio || 0) * 100), 0, 100);
    return '<div class="bar ' + (cls || '') + '"><i style="width:' + w + '%"></i></div>';
  }

  function optionClass(o, q, selected, reveal) {
    const sel = selected.indexOf(o.id) >= 0;
    const isAns = q.answer.indexOf(o.id) >= 0;
    let cls = 'opt';
    if (sel) cls += ' sel';
    if (reveal && isAns) cls += ' ans';
    if (reveal && sel && !isAns) cls += ' bad';
    return cls;
  }

  function optionMark(o, q, selected, reveal) {
    if (!reveal) return '';
    const sel = selected.indexOf(o.id) >= 0;
    const isAns = q.answer.indexOf(o.id) >= 0;
    if (isAns && sel) return '<span class="omark ok">正确</span>';
    if (isAns) return '<span class="omark ok">应选</span>';
    if (sel) return '<span class="omark no">错选</span>';
    return '';
  }

  function optionList(q, selected, reveal, disabled) {
    return (
      '<div class="opts' + (q.type === 'multiple' ? ' multi' : '') + '">' +
      q.options
        .map((o) => {
          const mono = LP.isCommand(o.text) ? ' mono' : '';
          return (
            '<button type="button" class="' + optionClass(o, q, selected, reveal) + '"' +
            ' data-act="opt" data-id="' + esc(o.id) + '"' + (disabled ? ' disabled' : '') + '>' +
            '<span class="badge">' + esc(o.id) + '</span>' +
            '<span class="otext' + mono + '">' + esc(o.text) + '</span>' +
            optionMark(o, q, selected, reveal) +
            '</button>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function sourceLinks(q) {
    const list = (q.source_refs || [])
      .map((id) => {
        const s = LP.state.sources[id];
        if (!s) return '';
        const label = esc(s.title);
        if (/^https?:\/\//i.test(s.url || '')) {
          return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
        }
        return '<span>' + label + '</span>';
      })
      .filter(Boolean);
    return list.length ? list.join('') : '<span class="muted">未标注</span>';
  }

  /* 解析文本里的 `命令` 用等宽样式显示（先转义，再包 code，避免注入） */
  function richText(s) {
    return esc(s || '').replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  /* ---------------- 配套视频 / 学习小节 ---------------- */

  /* 「不正确 / 不属于 / 除外」类题目单独提示，不改写原题文字 */
  const NEG_PATTERNS = [
    /(不正确|不属于|不包括|除外|不符合|有误)/,
    /(说法|表述|描述|选项|哪项|下列|以下)[^。？！]{0,12}错误/,
    /不能(作为|使用|用于|实现|完成|直接|通过)/,
  ];

  function isNegativeStem(text) {
    const t = String(text || '');
    return NEG_PATTERNS.some((re) => re.test(t));
  }

  const ISSUE_LABEL = {
    missing_question: '漏题',
    duplicate_qid: '重复题号',
    unknown_qid: '无效题号',
    inactive_qid: '停用题号',
    wrong_topic: '题号跨专题',
    unknown_video: '无效资料引用',
    lesson_without_video: '小节无配套资料',
    empty_lesson: '空小节',
    unknown_topic: '小节专题不存在',
    duplicate_lesson: '小节编号重复',
    bad_video_url: '资料链接格式',
    bad_video_duration: '资料时长格式',
    unknown_video_duration: '视频缺时长',
    lesson_without_id: '小节缺编号',
  };

  function issueText(issue) {
    const label = ISSUE_LABEL[issue.kind] || issue.kind;
    const target = issue.qid || issue.video || issue.lesson || issue.topic || '';
    return label + (target ? '（' + target + '）' : '');
  }

  function videoBadge(v) {
    const label = LP.VIDEO_STATUS_LABEL[v.status] || '状态未标注';
    return '<span class="vbadge ' + esc(v.status || 'unknown') + '">' + esc(label) + '</span>';
  }

  function videoCard(item) {
    const role = LP.roleLabel ? LP.roleLabel(item) : (LP.VIDEO_ROLE_LABEL[item.role] || '');
    const kind = LP.kindOf(item);
    const isArticle = kind === 'article';
    const meta = [
      esc(LP.platformOf(item)),
      item.author ? esc(item.author) : '',
      isArticle ? '图文' : esc(item.duration || '时长未知'),
      item.version_note ? esc(item.version_note) : '',
    ]
      .filter(Boolean)
      .join(' · ');

    return (
      '<div class="vcard">' +
        '<div class="vcard-main">' +
          '<div class="vcard-top">' +
            (role ? '<span class="vrole ' + esc(item.role) + '">' + esc(role) + '</span>' : '') +
            '<span class="vkind ' + esc(kind) + '">' + esc(LP.KIND_LABEL[kind] || '资料') + '</span>' +
            '<span class="vtitle">' + esc(item.title) + '</span>' +
            videoBadge(item) +
          '</div>' +
          '<div class="vmeta">' + meta + '</div>' +
          (item.note ? '<div class="vnote">' + esc(item.note) + '</div>' : '') +
        '</div>' +
        '<a class="btn ghost sm vopen" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">' +
          (isArticle ? '阅读原文 ↗' : '打开视频 ↗') +
        '</a>' +
      '</div>'
    );
  }

  function questionVideoLink(item) {
    const kind = LP.kindOf(item);
    const tail = kind === 'article' ? '图文' : item.duration || '视频';
    return (
      '<a class="qv-item" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="qv-dur">' + esc(tail) + '</span>' +
        '<span class="qv-title">' + esc(item.title) + '</span>' +
        '<span class="qv-plat">' + esc(LP.platformOf(item)) + '</span>' +
        (item.status && item.status !== 'verified' && item.status !== 'main'
          ? '<span class="qv-flag">' + esc(LP.VIDEO_STATUS_LABEL[item.status] || '') + '</span>'
          : '') +
      '</a>'
    );
  }

  function lessonCard(l) {
    const s = LP.statsFor(l.qids);
    const videos = l.videos || [];
    const primary = videos.filter((v) => v.role !== 'backup');
    const backup = videos.filter((v) => v.role === 'backup');
    const nVideo = videos.filter((v) => LP.kindOf(v) === 'video').length;
    const nArticle = videos.length - nVideo;
    const seconds = LP.lessonVideoMinutes(l);
    const over = seconds > 20 * 60;

    const cov = l.coverage.length
      ? '<ul class="cov">' + l.coverage.map((c) => '<li>' + esc(c) + '</li>').join('') + '</ul>'
      : '<p class="muted small">未标注覆盖点</p>';

    const qchips = l.qids
      .map((id) => {
        const q = LP.state.qById[id];
        return (
          '<button class="qchip" data-act="peek" data-qid="' + esc(id) + '" title="' + esc(q.stem) + '">' +
            '<i class="dot ' + LP.statusOf(id) + '"></i>' + esc(id) +
          '</button>'
        );
      })
      .join('');

    const videoHtml =
      (primary.length
        ? primary.map(videoCard).join('')
        : '<div class="vempty">这个小节还没有可用资料，先看题解文字。</div>') +
      (backup.length
        ? '<div class="vgroup-label">按需补充</div>' + backup.map(videoCard).join('')
        : '');

    const mustKnow = (l.must_know || []).length
      ? '<div class="mustknow">' +
          '<div class="mk-head">' + (nVideo ? '视频没讲到，但必须记住' : '资料没讲到，但必须记住') + '</div>' +
          '<ul class="mk-list">' + l.must_know.map((t) => '<li>' + richText(t) + '</li>').join('') + '</ul>' +
        '</div>'
      : '';

    return (
      '<div class="lesson" id="lesson-' + esc(l.id) + '" tabindex="-1">' +
        '<div class="lesson-head">' +
          '<span class="lesson-no">' + esc(l.id) + '</span>' +
          '<h3>' + esc(l.title) + '</h3>' +
          '<span class="lesson-meta">' + l.qids.length + ' 题 · 已做 ' + s.done +
            (s.done ? ' · 正确率 ' + LP.pct(s.rate) : '') + '</span>' +
        '</div>' +
        '<div class="lesson-body">' +
          '<div class="lesson-cols">' +
            '<div>' +
              '<div class="lesson-label">本小节要讲清</div>' + cov +
            '</div>' +
            '<div>' +
              '<div class="lesson-label">对应题号（点开看解析）</div>' +
              '<div class="qchips">' + qchips + '</div>' +
            '</div>' +
          '</div>' +
          mustKnow +
          '<div class="lesson-videos">' +
            '<div class="lesson-label">配套资料 ' + videos.length + ' 条（视频 ' + nVideo +
              (nArticle ? ' · 图文 ' + nArticle : '') + '）' +
              (seconds ? ' · 视频合计 ' + LP.fmtVideoTime(seconds) : '') +
              (over ? ' · 超过 20 分钟，建议只看主视频' : '') +
            '</div>' +
            videoHtml +
          '</div>' +
          '<div class="lesson-foot">' +
            '<div class="lf-progress">' + bar(s.coverage, 'tiny') +
              '<span class="muted small">已做 ' + s.done + '/' + l.qids.length + '</span>' +
            '</div>' +
            '<button class="btn primary sm" data-act="start-lesson" data-lesson="' + esc(l.id) + '">' +
              '练这一小节（' + l.qids.length + ' 题）</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* 做题页顶部的紧凑入口：默认收起，点开才显示视频链接 */
  function questionVideos(lesson) {
    if (!lesson || !lesson.videos.length) return '';
    const open = LP.state.session && LP.state.session.videosOpen ? ' open' : '';
    return (
      '<details class="qvideos"' + open + '>' +
        '<summary>本组配套资料 ' + lesson.videos.length + ' 个 · ' + esc(lesson.title) + '</summary>' +
        '<div class="qv-list">' + lesson.videos.map(questionVideoLink).join('') + '</div>' +
      '</details>'
    );
  }

  /* 答错后的「建议回看」 */
  function reviewHint(q) {
    const lesson = LP.lessonOf(q.id);
    if (!lesson) return '';
    const vids = (lesson.videos || []).filter((v) => v.role !== 'backup').slice(0, 2);
    return (
      '<div class="review-hint">' +
        '<div class="rh-head">建议回看 · ' + esc(lesson.title) + '</div>' +
        (vids.length
          ? '<div class="qv-list">' + vids.map(questionVideoLink).join('') + '</div>'
          : '<p class="rh-gap">这个小节还没有可用资料，先看下面的逐项解析。</p>') +
        (lesson.gaps ? '<p class="rh-gap">资料缺口：' + esc(lesson.gaps) + '</p>' : '') +
      '</div>'
    );
  }

  /* 逐项解析：A—D 分项结论 + 补充知识 */
  function analysisBlock(q) {
    const items = q.analysis || [];
    if (!items.length) return '';

    const rows = items
      .map((a) => {
        const ok = q.answer.indexOf(a.k) >= 0;
        return (
          '<li class="ana-row' + (ok ? ' ok' : '') + '">' +
            '<span class="ana-k">' + esc(a.k) + '</span>' +
            '<span class="ana-t">' + richText(a.t) + '</span>' +
            '<span class="ana-v"' + (a.v ? ' title="' + esc(a.v) + '"' : '') + '>' + (ok ? '应选' : '不选') + '</span>' +
          '</li>'
        );
      })
      .join('');

    const notes = (q.notes || [])
      .map((n) => '<div class="ana-note"><b>' + esc(n.h) + '</b>' + richText(n.t) + '</div>')
      .join('');

    return (
      '<div class="analysis">' +
        '<h4>逐项解析</h4>' +
        '<ul class="ana-list">' + rows + '</ul>' +
        notes +
      '</div>'
    );
  }

  V.analysisBlock = analysisBlock;

  function explainBlock(q, selected, correct) {
    const prov = q.provenance || {};
    const provLabel = LP.PROVENANCE_LABEL[prov.kind] || '题源未标注';
    const userNums = (prov.user_material_numbers || []).filter((x) => x !== '' && x != null);
    return (
      '<div class="explain ' + (correct ? 'ok' : 'bad') + '">' +
        '<div class="explain-head">' +
          '<span class="verdict">' + (correct ? '回答正确' : '回答错误') + '</span>' +
          '<span class="ansline">正确答案 <b>' + esc(q.answer.join('、')) + '</b></span>' +
          '<span class="ansline">你的选择 <b>' + (selected.length ? esc(selected.join('、')) : '未作答') + '</b></span>' +
        '</div>' +
        '<div class="explain-body">' +
          analysisBlock(q) +
          (!correct ? reviewHint(q) : '') +
          '<div class="facts">' +
            '<div><span>适用版本</span><b>' + esc(q.version || '未标注') + '</b></div>' +
            '<div><span>难度</span><b>' + esc(q.difficulty || '未标注') + '</b></div>' +
            '<div><span>学习层次</span><b>' + esc(q.priority || '未标注') + '</b></div>' +
            '<div><span>复核</span><b>' + esc(q.review_status === 'content_reviewed' ? '已复核' : q.review_status || '未标注') + '</b></div>' +
          '</div>' +
          '<div class="srcrow"><span>依据来源</span><div class="srcs">' + sourceLinks(q) + '</div></div>' +
          '<div class="provrow">' +
            esc(provLabel) +
            (userNums.length ? ' · 对应原题 ' + esc(userNums.join('、')) : '') +
            (prov.adaptation_note ? ' · ' + esc(prov.adaptation_note) : '') +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ---------------- 首页 ---------------- */

  V.dashboard = () => {
    const s = LP.globalStats();
    const p = LP.progressSummary();
    const active = LP.state.activeQuestions;
    const singleN = active.filter((q) => q.type === 'single').length;
    const multiN = active.length - singleN;
    const sess = LP.state.session;
    const canResume = sess && sess.qids && sess.qids.length && !sess.finished;

    const resumeHtml = canResume
      ? '<div class="resume">' +
          '<div class="resume-ico">▶</div>' +
          '<div class="resume-txt">' +
            '<strong>上次练习未完成</strong>' +
            '<span>' + esc(sess.title) + ' · 第 ' + (sess.index + 1) + '/' + sess.qids.length + ' 题</span>' +
          '</div>' +
          '<div class="resume-act">' +
            '<button class="btn ghost sm" data-act="drop-session">放弃</button>' +
            '<button class="btn primary sm" data-act="resume">继续练习</button>' +
          '</div>' +
        '</div>'
      : '';

    const cards = LP.state.topics
      .map((t) => {        const st = LP.topicStats(t);
        const stateCls = st.done === 0 ? 'idle' : st.rate >= 0.8 ? 'good' : st.rate >= 0.6 ? 'mid' : 'low';
        return (
          '<a class="topic-card" href="#/topic/' + esc(t.id) + '">' +
            '<div class="tc-head">' +
              '<span class="tc-num">' + esc(t.num) + '</span>' +
              '<span class="tc-count">' + t.qids.length + ' 题</span>' +
            '</div>' +
            '<h3>' + esc(t.title) + '</h3>' +
            '<div class="tc-bar">' + bar(st.coverage) + '</div>' +
            '<div class="tc-meta">' +
              '<span>已做 <b>' + st.done + '</b>/' + t.qids.length + '</span>' +
              '<span>掌握 <b>' + st.mastered + '</b></span>' +
              '<span class="' + stateCls + '">' + (st.done ? '正确率 ' + LP.pct(st.rate) : '未开始') + '</span>' +
            '</div>' +
          '</a>'
        );
      })
      .join('');

    return (
      '<section class="hero">' +
        '<div class="hero-main">' +
          '<div class="eyebrow">建策杯 · 红帽 Linux 赛道</div>' +
          '<h1>' + active.length + ' 道客观题，按专题练到掌握</h1>' +
          '<p>' + LP.state.topics.length + ' 个专题 · ' + singleN + ' 道单选 · ' + multiN + ' 道多选 · 题库版本 ' + esc(LP.state.bank.bank_version) + '</p>' +
          '<div class="hero-act">' +
            '<button class="btn primary lg" data-act="goto-exam">开始综合练习</button>' +
            '<a class="btn ghost lg" href="#/wrong/weak">查看错题本</a>' +
          '</div>' +
        '</div>' +
        '<div class="hero-stats">' +
          '<div class="hs"><span>已做</span><b>' + s.done + '<small>/' + s.total + '</small></b></div>' +
          '<div class="hs"><span>正确率</span><b>' + LP.pct(s.rate) + '</b></div>' +
          '<div class="hs"><span>已掌握</span><b>' + s.mastered + '</b></div>' +
          '<div class="hs"><span>待复习</span><b>' + p.review + '</b></div>' +
        '</div>' +
      '</section>' +
      resumeHtml +
      '<div class="section-head"><h2>专题目录</h2><span class="muted">按知识点顺序练习，组内不打乱</span></div>' +
      '<div class="topic-grid">' + cards + '</div>' +
      '<div class="section-head"><h2>题库说明</h2></div>' +
      '<div class="note-card">' +
        '<p>' + esc(LP.state.bank.scope_note) + '</p>' +
        '<p class="muted">本库用于练习，不是建策杯官方真题。多选须完整选中正确集合才得分；正式比赛的分数、时长与部分得分方式以正式通知为准。</p>' +
      '</div>'
    );
  };

  /* ---------------- 专题页 ---------------- */

  V.topic = (topicId) => {
    const t = LP.state.topicById[topicId];
    if (!t) return '<div class="empty">没有找到这个专题。<a href="#/">返回首页</a></div>';
    const st = LP.topicStats(t);
    const weakIds = t.qids.filter((id) => LP.statusOf(id) === 'weak');
    const newIds = t.qids.filter((id) => LP.statusOf(id) === 'new');
    const lessons = t.lessons || [];

    const clusters = t.clusters
      .map((c) => {
        const cs = LP.statsFor(c.qids);
        const kps =
          c.kps.length > 1
            ? '<div class="kps">' +
                '<span class="kps-label">知识点</span>' +
                c.kps
                  .map((k) => {
                    const ks = LP.statsFor(k.qids);
                    const dot = ks.weak ? 'weak' : ks.done === k.qids.length ? 'mastered' : ks.done ? 'shaky' : 'new';
                    return (
                      '<button class="kpchip" data-act="start-kp" data-topic="' + esc(t.id) + '" data-cluster="' + esc(c.name) + '" data-kp="' + esc(k.name) + '">' +
                        '<i class="dot ' + dot + '"></i>' + esc(k.name) +
                        (k.qids.length > 1 ? '<b>' + k.qids.length + '</b>' : '') +
                      '</button>'
                    );
                  })
                  .join('') +
              '</div>'
            : '';

        return (
          '<div class="cluster">' +
            '<div class="cluster-head">' +
              '<div class="ch-main">' +
                '<h3>' + esc(c.name) + '</h3>' +
                '<span class="muted">' + c.qids.length + ' 题 · 已做 ' + cs.done + ' · ' + (cs.done ? '正确率 ' + LP.pct(cs.rate) : '未开始') + '</span>' +
              '</div>' +
              '<div class="ch-right">' +
                bar(cs.coverage, 'tiny') +
                '<button class="btn ghost xs" data-act="start-cluster" data-topic="' + esc(t.id) + '" data-cluster="' + esc(c.name) + '">练这一组</button>' +
              '</div>' +
            '</div>' +
            kps +
          '</div>'
        );
      })
      .join('');

    const lessonHtml = lessons.length
      ? '<div class="section-head"><h2>学习小节</h2>' +
          '<span class="muted">先看视频，再练这一组；小节只影响顺序，题号与进度不变</span></div>' +
        '<div class="lessons">' + lessons.map(lessonCard).join('') + '</div>'
      : '';

    const groupHtml = lessons.length
      ? '<details class="orig-groups">' +
          '<summary>按知识点分组（原结构，便于对照原题资料）</summary>' +
          '<div class="clusters">' + clusters + '</div>' +
        '</details>'
      : '<div class="clusters">' + clusters + '</div>';

    const startHtml = lessons.length
      ? '<button class="btn primary" data-act="start-topic-order" data-topic="' + esc(t.id) + '" data-order="study">' +
          '按学习顺序练习（' + t.qids.length + ' 题）</button>' +
        '<button class="btn ghost" data-act="start-topic-order" data-topic="' + esc(t.id) + '" data-order="original">' +
          '按原题顺序练习</button>'
      : '<button class="btn primary" data-act="start-topic" data-topic="' + esc(t.id) + '">开始本专题（' + t.qids.length + ' 题）</button>';

    return (
      '<div class="crumb"><a href="#/">专题目录</a><span>/</span><b>' + esc(t.num) + ' ' + esc(t.title) + '</b></div>' +
      '<div class="topic-hero">' +
        '<div class="th-left">' +
          '<span class="th-num">' + esc(t.num) + '</span>' +
          '<div>' +
            '<h1>' + esc(t.title) + '</h1>' +
            '<p>' + t.qids.length + ' 题 · 单选 ' + t.singleCount + ' · 多选 ' + t.multipleCount + ' · ' +
              (lessons.length ? lessons.length + ' 个学习小节' : t.clusters.length + ' 个知识点分组') + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="th-stats">' +
          '<div><span>已做</span><b>' + st.done + '/' + t.qids.length + '</b></div>' +
          '<div><span>正确率</span><b>' + LP.pct(st.rate) + '</b></div>' +
          '<div><span>掌握</span><b>' + st.mastered + '</b></div>' +
          '<div><span>薄弱</span><b>' + st.weak + '</b></div>' +
        '</div>' +
      '</div>' +
      '<div class="action-row">' +
        startHtml +
        (newIds.length ? '<button class="btn ghost" data-act="start-topic" data-topic="' + esc(t.id) + '" data-only="new">只练未做（' + newIds.length + '）</button>' : '') +
        (weakIds.length ? '<button class="btn ghost" data-act="start-topic" data-topic="' + esc(t.id) + '" data-only="weak">只练错题（' + weakIds.length + '）</button>' : '') +
        '<a class="btn ghost" href="#/browse/' + esc(t.id) + '">浏览题目</a>' +
      '</div>' +
      lessonHtml +
      groupHtml
    );
  };

  /* ---------------- 练习页 ---------------- */

  function examCard(session) {
    const qid = session.qids[session.index];
    const answered = session.qids.filter((id) => (session.answers[id] || []).length).length;
    return (
      '<div class="cardbox" id="sheetbox">' +
        '<div class="cardbox-head"><h3>答题卡</h3><span class="muted">已答 ' + answered + '/' + session.qids.length + '</span></div>' +
        '<div class="sheet">' +
          session.qids
            .map((id, i) => {
              const done = (session.answers[id] || []).length > 0;
              const cls = 'sheet-cell' + (i === session.index ? ' cur' : '') + (done ? ' done' : '');
              return '<button class="' + cls + '" data-act="goto" data-index="' + i + '">' + (i + 1) + '</button>';
            })
            .join('') +
        '</div>' +
      '</div>'
    );
  }

  V.questionCard = (session) => {
    const qid = session.qids[session.index];
    const q = LP.state.qById[qid];
    if (!q) return '<div class="empty">题目不存在：' + esc(qid) + '</div>';
    const selected = session.answers[qid] || [];
    const isExam = session.mode === 'exam';
    const submitted = !isExam && !!session.submitted[qid];
    const rec = LP.getRecord(qid);
    const fav = rec && rec.favorite;
    const rev = rec && rec.needsReview;
    const correct = submitted ? LP.isCorrect(q, selected) : null;
    const topic = LP.state.topicById[q.topic_id];
    const lesson = LP.lessonOf(qid);

    const footer =
      '<div class="qfoot">' +
        '<div class="qfoot-left">' +
          '<button class="chipbtn' + (fav ? ' on' : '') + '" data-act="fav">' + (fav ? '★ 已收藏' : '☆ 收藏') + '</button>' +
          '<button class="chipbtn' + (rev ? ' on' : '') + '" data-act="review">' + (rev ? '⚑ 已在待复习' : '⚑ 加入待复习') + '</button>' +
        '</div>' +
        '<div class="qfoot-right">' +
          '<button class="btn ghost sm" data-act="prev"' + (session.index === 0 ? ' disabled' : '') + '>上一题</button>' +
          (isExam
            ? '<button class="btn ghost sm" data-act="next"' + (session.index === session.qids.length - 1 ? ' disabled' : '') + '>下一题</button>' +
              '<button class="btn ghost sm" data-act="finish">交卷</button>'
            : submitted
              ? '<button class="btn primary sm" data-act="next">' + (session.index === session.qids.length - 1 ? '完成练习' : '下一题') + '</button>'
              : '<button class="btn primary sm" data-act="submit"' + (selected.length ? '' : ' disabled') + '>提交答案</button>') +
        '</div>' +
      '</div>';

    return (
      '<div class="qcard" id="qcard">' +
        '<div class="qhead">' +
          '<span class="qid">' + esc(q.id) + '</span>' +
          typeTag(q) +
          statusTag(q.id) +
        '</div>' +
        (isNegativeStem(q.stem) ? '<p class="qnote">注意：本题选错误项</p>' : '') +
        '<h2 class="stem" id="stem" tabindex="-1">' + esc(q.stem) + '</h2>' +
        '<div class="qmeta">' +
          '<span class="tag ghost">' + esc(topic ? topic.num + ' ' + topic.title : '') + '</span>' +
          '<span class="tag ghost">' + esc(q.knowledge_point) + '</span>' +
          (lesson ? '<span class="tag ghost">' + esc(lesson.id + ' ' + lesson.title) + '</span>' : '') +
        '</div>' +
        (q.type === 'multiple'
          ? '<p class="hint">多选：完整选中全部正确项才计分' +
            (selected.length && !submitted ? ' · 已选 ' + selected.length + ' 项' : '') + '</p>'
          : '') +
        questionVideos(lesson) +
        optionList(q, selected, submitted, submitted) +
        (submitted ? explainBlock(q, selected, correct) + footer : footer) +
        '<p class="kbd-hint">快捷键：A–D 选择 · Enter 提交/下一题 · ← → 翻页</p>' +
      '</div>'
    );
  };

  V.practice = () => {
    const s = LP.state.session;
    if (!s || !s.qids.length) {
      return '<div class="empty">还没有进行中的练习。<a href="#/">回到首页</a></div>';
    }
    const total = s.qids.length;
    const pct = Math.round(((s.index + 1) / total) * 100);
    const isExam = s.mode === 'exam';
    const timer = s.deadline
      ? '<span class="timer" id="timer">' + LP.fmtClock((s.deadline - Date.now()) / 1000) + '</span>'
      : '';

    return (
      '<div class="ptop">' +
        '<button class="icon-btn" data-act="exit" title="退出练习">←</button>' +
        '<div class="ptop-title">' +
          '<strong>' + esc(s.title) + '</strong>' +
          '<span>' + esc(MODE_LABEL[s.mode] || '练习') + '</span>' +
        '</div>' +
        '<div class="ptop-right">' +
          timer +
          '<span class="counter">' + (s.index + 1) + '<small>/' + total + '</small></span>' +
          (isExam ? '<button class="btn primary sm hide-sm" data-act="finish">交卷</button>' : '') +
        '</div>' +
      '</div>' +
      '<div class="pbar"><i style="width:' + pct + '%"></i></div>' +
      V.questionCard(s) +
      (isExam ? examCard(s) : '')
    );
  };

  /* ---------------- 结果页 ---------------- */

  function lessonResultNavigation(session) {
    if (!session || session.mode !== 'lesson' || !session.qids.length) return null;

    const current = LP.lessonOf(session.qids[0]);
    if (!current) return null;

    const lessons = LP.lessonsForTopic(current.topic_id);
    const index = lessons.findIndex((lesson) => lesson.id === current.id);
    const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null;
    const topicUrl = '#/topic/' + encodeURIComponent(current.topic_id);

    return {
      current,
      next,
      topicUrl,
      nextUrl: next ? topicUrl + '?lesson=' + encodeURIComponent(next.id) : '',
    };
  }

  V.result = () => {
    const s = LP.state.session;
    if (!s || !s.results) return '<div class="empty">没有可查看的结果。<a href="#/">回到首页</a></div>';

    const qids = s.qids;
    const right = qids.filter((id) => s.results[id] && s.results[id].correct).length;
    const wrong = qids.filter((id) => s.results[id] && !s.results[id].correct);
    const rate = qids.length ? right / qids.length : 0;
    const used = (s.finishedAt || Date.now()) - s.startedAt;
    const lessonNav = lessonResultNavigation(s);

    const continueHtml = lessonNav
      ? lessonNav.next
        ? '<a class="btn primary" href="' + esc(lessonNav.nextUrl) + '">下一小节：' + esc(lessonNav.next.id) + '</a>'
        : '<a class="btn primary" href="' + esc(lessonNav.topicUrl) + '">返回 ' + esc(lessonNav.current.topic_id) + ' 专题</a>'
      : '';

    const topicBackHtml = lessonNav && lessonNav.next
      ? '<a class="btn ghost" href="' + esc(lessonNav.topicUrl) + '">返回 ' + esc(lessonNav.current.topic_id) + ' 专题</a>'
      : '';

    const wrongHtml = wrong.length
      ? wrong
          .map((id) => {
            const q = LP.state.qById[id];
            const sel = (s.results[id] && s.results[id].selected) || [];
            return (
              '<div class="review-item">' +
                '<div class="ri-head">' +
                  '<span class="qid">' + esc(q.id) + '</span>' + typeTag(q) +
                  '<span class="tag ghost">' + esc(q.knowledge_point) + '</span>' +
                  '<span class="tag st-weak">错</span>' +
                '</div>' +
                '<h3 class="ri-stem">' + esc(q.stem) + '</h3>' +
                optionList(q, sel, true, true) +
                '<details class="exp-toggle"><summary>查看解析与依据</summary>' + explainBlock(q, sel, false) + '</details>' +
              '</div>'
            );
          })
          .join('')
      : '<div class="allright">全部答对，这一组已经很稳了。继续保持。</div>';

    return (
      '<div class="result-hero">' +
        '<div class="ring" style="--p:' + Math.round(rate * 100) + '"><span>' + LP.pct(rate) + '</span></div>' +
        '<div class="rh-main">' +
          '<h1>练习完成</h1>' +
          '<p>' + esc(s.title) + ' · 共 ' + qids.length + ' 题 · 正确 ' + right + ' · 错误 ' + wrong.length + ' · 用时 ' + LP.fmtDuration(used) + '</p>' +
          '<div class="action-row">' +
            continueHtml +
            (wrong.length ? '<button class="btn ' + (lessonNav ? 'ghost' : 'primary') + '" data-act="redo-wrong">只练这 ' + wrong.length + ' 道错题</button>' : '') +
            topicBackHtml +
            '<a class="btn ghost" href="#/wrong/weak">错题本</a>' +
            '<a class="btn ghost" href="#/">返回首页</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="section-head"><h2>错题回顾</h2><span class="muted">点开每题查看解析、适用版本与依据来源</span></div>' +
      wrongHtml
    );
  };

  /* ---------------- 错题本 ---------------- */

  V.wrong = (tab) => {
    tab = tab || 'weak';
    const weakIds = LP.wrongIds();
    const reviewIds = LP.reviewIds();
    const favIds = LP.favoriteIds();
    const map = { weak: weakIds, review: reviewIds, fav: favIds };
    const ids = map[tab] || weakIds;

    const tabs =
      '<div class="tabs">' +
        '<a class="tab' + (tab === 'weak' ? ' on' : '') + '" href="#/wrong/weak">错题 <b>' + weakIds.length + '</b></a>' +
        '<a class="tab' + (tab === 'review' ? ' on' : '') + '" href="#/wrong/review">待复习 <b>' + reviewIds.length + '</b></a>' +
        '<a class="tab' + (tab === 'fav' ? ' on' : '') + '" href="#/wrong/fav">收藏 <b>' + favIds.length + '</b></a>' +
      '</div>';

    const titleMap = {
      weak: '最近一次答错的题',
      review: '手动标记为待复习的题',
      fav: '收藏的题目',
    };

    const rows = ids
      .map((id) => {
        const q = LP.state.qById[id];
        const rec = LP.getRecord(id) || {};
        const topic = LP.state.topicById[q.topic_id];
        const flagBtn =
          tab === 'review'
            ? '<button class="btn ghost xs" data-act="unflag" data-flag="needsReview" data-qid="' + esc(id) + '">移出</button>'
            : tab === 'fav'
              ? '<button class="btn ghost xs" data-act="unflag" data-flag="favorite" data-qid="' + esc(id) + '">取消收藏</button>'
              : '';
        return (
          '<div class="wrow">' +
            '<div class="wrow-main">' +
              '<div class="wrow-meta">' +
                '<span class="qid">' + esc(q.id) + '</span>' + typeTag(q) +
                '<span class="tag ghost">' + esc(topic ? topic.title : '') + '</span>' +
                '<span class="tag ghost">' + esc(q.knowledge_point) + '</span>' +
                '<span class="muted">累计错 ' + (rec.wrongCount || 0) + ' 次 · ' + LP.fmtDate(rec.answeredAt) + '</span>' +
              '</div>' +
              '<p class="wrow-stem">' + esc(q.stem) + '</p>' +
            '</div>' +
            '<div class="wrow-act">' +
              '<button class="btn ghost xs" data-act="peek" data-qid="' + esc(id) + '">看解析</button>' +
              '<button class="btn xs" data-act="start-single" data-qid="' + esc(id) + '">重做</button>' +
              flagBtn +
            '</div>' +
          '</div>'
        );
      })
      .join('');

    return (
      '<div class="page-head"><h1>错题与待复习</h1><p class="muted">答错的题会自动进入错题；猜对但不理解的题可以手动加入待复习。</p></div>' +
      tabs +
      '<div class="action-row">' +
        (ids.length ? '<button class="btn primary" data-act="start-set" data-set="' + tab + '">练习全部 ' + ids.length + ' 题</button>' : '') +
        '<span class="muted">' + esc(titleMap[tab] || '') + '</span>' +
      '</div>' +
      (ids.length ? '<div class="wlist">' + rows + '</div>' : '<div class="empty">这一类还是空的，去专题里练几道题吧。</div>')
    );
  };

  /* ---------------- 题库浏览 ---------------- */

  /* 浏览页的筛选逻辑单独抽出，供「展开全部」计算当前可见范围 */
  function browseFilter(topicId, st) {
    const kw = (st.q || '').trim().toLowerCase();

    let list = LP.state.activeQuestions;
    if (topicId && topicId !== 'all') list = list.filter((q) => q.topic_id === topicId);
    if (kw) {
      list = list.filter(
        (q) =>
          q.stem.toLowerCase().indexOf(kw) >= 0 ||
          q.knowledge_point.toLowerCase().indexOf(kw) >= 0 ||
          q.cluster.toLowerCase().indexOf(kw) >= 0 ||
          q.id.toLowerCase().indexOf(kw) >= 0 ||
          q.options.some((o) => o.text.toLowerCase().indexOf(kw) >= 0)
      );
    }
    if (st.status && st.status !== 'all') {
      list = list.filter((q) => LP.statusOf(q.id) === st.status);
    }
    return list;
  }

  V.browseList = browseFilter;

  V.browse = (topicId, bstate) => {
    const st = bstate || { topic: 'all', status: 'all', q: '', openSet: new Set() };
    const list = browseFilter(topicId, st);
    const openSet = st.openSet || new Set();
    const visible = list.slice(0, 400);
    const allOpen = visible.length > 0 && visible.every((q) => openSet.has(q.id));

    const topicOpts =
      '<option value="all"' + (st.topic === 'all' ? ' selected' : '') + '>全部专题</option>' +
      LP.state.topics
        .map((t) => '<option value="' + esc(t.id) + '"' + (st.topic === t.id ? ' selected' : '') + '>' + esc(t.num + ' ' + t.title) + '</option>')
        .join('');

    const chips = [
      ['all', '全部'],
      ['new', '未做'],
      ['weak', '薄弱'],
      ['shaky', '待巩固'],
      ['mastered', '已掌握'],
    ]
      .map(([k, label]) => '<button class="chip' + (st.status === k ? ' on' : '') + '" data-act="browse-status" data-status="' + k + '">' + label + '</button>')
      .join('');

    const rows = visible.map((q) => {
      const open = openSet.has(q.id);
      const rec = LP.getRecord(q.id);
      return (
        '<div class="brow' + (open ? ' open' : '') + '">' +
          '<button class="brow-head" data-act="browse-toggle" data-qid="' + esc(q.id) + '">' +
            statusDot(q.id) +
            '<span class="qid">' + esc(q.id) + '</span>' +
            typeTag(q) +
            '<span class="brow-stem">' + esc(q.stem) + '</span>' +
            '<span class="brow-tag">' + esc(q.knowledge_point) + '</span>' +
            '<span class="caret">' + (open ? '▾' : '▸') + '</span>' +
          '</button>' +
          (open
            ? '<div class="brow-body">' +
                optionList(q, rec && rec.attempts ? rec.selected : [], true, true) +
                '<div class="explain ok plain">' +
                  '<div class="explain-head"><span class="ansline">正确答案 <b>' + esc(q.answer.join('、')) + '</b></span>' +
                  '<span class="muted">' + esc(q.version) + ' · ' + esc(q.difficulty) + '</span></div>' +
                  '<div class="explain-body">' + analysisBlock(q) +
                  '<div class="srcrow"><span>依据来源</span><div class="srcs">' + sourceLinks(q) + '</div></div></div>' +
                '</div>' +
                '<div class="brow-act">' +
                  '<button class="btn xs" data-act="start-single" data-qid="' + esc(q.id) + '">练这道题</button>' +
                  '<button class="btn ghost xs" data-act="fav-q" data-qid="' + esc(q.id) + '">' + (rec && rec.favorite ? '取消收藏' : '收藏') + '</button>' +
                  '<button class="btn ghost xs" data-act="review-q" data-qid="' + esc(q.id) + '">' + (rec && rec.needsReview ? '移出待复习' : '加入待复习') + '</button>' +
                '</div>' +
              '</div>'
            : '') +
        '</div>'
      );
    });

    return (
      '<div class="page-head"><h1>题库浏览</h1><p class="muted">共 ' + LP.state.activeQuestions.length + ' 题，当前筛选 ' + list.length + ' 题。展开可看答案与解析。</p></div>' +
      '<div class="filters">' +
        '<select class="select" id="browse-topic">' + topicOpts + '</select>' +
        '<input class="input" id="browse-search" type="search" placeholder="搜索题干、选项、知识点或题号" value="' + esc(st.q) + '">' +
        '<div class="chips">' + chips + '</div>' +
      '</div>' +
      '<div class="browse-bar">' +
        '<span class="muted small">' +
          (visible.length
            ? '当前 ' + visible.length + ' 题，已展开 ' + visible.filter((q) => openSet.has(q.id)).length + ' 题'
            : '没有符合条件的题目') +
        '</span>' +
        '<button class="btn ' + (allOpen ? 'primary' : 'ghost') + ' sm" data-act="browse-expand-all"' +
          (visible.length ? '' : ' disabled') + '>' +
          (allOpen ? '收起全部答案' : '显示全部答案') +
        '</button>' +
      '</div>' +
      '<div class="blist">' + (rows.length ? rows.join('') : '<div class="empty">没有符合条件的题目。</div>') + '</div>' +
      (list.length > 400 ? '<p class="muted center">仅显示前 400 条，请用搜索或筛选缩小范围。</p>' : '') +
      (visible.some((q) => openSet.has(q.id))
        ? '<div class="blist-foot">' +
            '<button class="btn ghost sm" data-act="browse-collapse-all">收起全部答案</button>' +
            '<button class="btn ghost sm" data-act="to-top">回到顶部</button>' +
          '</div>'
        : '')
    );
  };

  /* ---------------- 云同步卡片 ---------------- */

  function cloudTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    const p = (n) => String(n).padStart(2, '0');
    return p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function cloudUserName(user) {
    if (!user) return '';
    const m = user.user_metadata || {};
    return m.user_name || m.preferred_username || m.name || '';
  }

  function cloudUserEmail(user) {
    return user && user.email ? String(user.email) : '';
  }

  /* Supabase 用户 ID 前 8 位：邮箱缺失时也能区分两个账号 */
  function cloudUserShortId(user) {
    const id = user && user.id ? String(user.id) : '';
    return id ? id.slice(0, 8) : '';
  }

  /* 一行账号标识：@用户名 · 邮箱 · ID xxxxxxxx */
  function cloudUserLine(user) {
    if (!user) return '';
    const name = cloudUserName(user);
    const email = cloudUserEmail(user);
    const short = cloudUserShortId(user);
    const parts = [];
    if (name) parts.push('@' + name);
    if (email) parts.push(email);
    else parts.push('未取到邮箱');
    if (short) parts.push('ID ' + short);
    return parts.join(' · ');
  }

  function cloudCard() {
    const c = LP.cloud;
    if (!c) return '';
    const st = c.status();
    const user = st.user;
    const active = LP.recordList().filter((r) => r.attempts > 0 || r.favorite || r.needsReview).length;

    let dot = '';
    let head = '';
    let note = '';
    let acts = '';

    if (st.state === 'off') {
      head = '云同步未启用';
      note = '进度只保存在本机。配置 Supabase 后，可用 GitHub 账号登录并跨设备同步。';
      acts = '<button class="btn ghost sm" data-act="cloud-help">查看配置步骤</button>';
    } else if (!user) {
      head = '未登录';
      note = '当前记录仅保存在本机' + (active ? '（' + active + ' 条）' : '') + '。登录后可在其他设备上接着练。';
      acts = '<button class="btn primary sm" data-act="cloud-login">使用 GitHub 登录并同步</button>';
    } else {
      head = '已登录：' + cloudUserLine(user);
      if (st.state === 'syncing') {
        dot = 'warn';
        note = '正在同步…';
      } else if (st.state === 'offline') {
        dot = 'warn';
        note = '离线，恢复网络后自动同步；本机记录已保存。';
      } else if (st.state === 'error') {
        dot = 'err';
        note = '同步失败：' + st.message + '。本机记录已保存。';
      } else if (st.state === 'synced') {
        dot = 'on';
        note = '云同步：已同步 ' + cloudTime(st.lastSyncAt) + ' · 本机 ' + active + ' 条记录';
      } else {
        dot = 'on';
        note = '云同步：已连接 · 本机 ' + active + ' 条记录';
      }
      acts =
        '<button class="btn sm" data-act="cloud-sync">立即同步</button>' +
        '<button class="btn ghost sm" data-act="cloud-diag">账号核对</button>' +
        '<button class="btn ghost sm" data-act="cloud-logout">退出登录</button>';
    }

    const emailHint =
      user && !cloudUserEmail(user)
        ? '<p class="muted small">这个账号没有返回邮箱，可能是当初登录时没授权邮箱权限。' +
          '退出后重新登录一次即可补上；在那之前请以「ID」区分两个账号。</p>'
        : '';

    const mig = c.migrationInfo();
    const migBlock = mig
      ? '<div class="warnline cloud-mig">检测到本机已有 ' + mig.count + ' 条学习记录，是否合并到当前 GitHub 账号？' +
        '<span class="cloud-acts"><button class="btn xs primary" data-act="cloud-migrate">合并到云端</button>' +
        '<button class="btn xs ghost" data-act="cloud-skip-migrate">不合并</button></span></div>'
      : '';

    return (
      '<div class="section-head"><h2>云同步</h2><span class="muted">登录后本机与云端自动合并，断网仍可答题</span></div>' +
      '<div class="card cloud-card">' +
        '<div class="cloud-row"><i class="cloud-dot ' + dot + '"></i><b>' + esc(head) + '</b></div>' +
        '<p class="muted small">' + esc(note) + '</p>' +
        emailHint +
        '<div class="cloud-acts">' + acts + '</div>' +
      '</div>' +
      migBlock
    );
  }

  /* ---------------- 数据管理 ---------------- */

  V.data = () => {
    const p = LP.progressSummary();
    const s = LP.globalStats();
    const b = LP.state.bank;
    const storageOK = LP.storageTest();
    const staleCount = LP.recordList().filter((r) => r.bankVersion && r.bankVersion !== b.bank_version).length;

    const issues = LP.learningIssues();
    const lessonsTotal = LP.state.topics.reduce((acc, t) => acc + (t.lessons ? t.lessons.length : 0), 0);
    const topicsWithLessons = LP.state.topics.filter((t) => t.lessons && t.lessons.length).length;
    const videoList = Object.keys(LP.state.videoById || {}).map((id) => LP.state.videoById[id]);
    const nVid = videoList.filter((v) => LP.kindOf(v) === 'video').length;
    const nArt = videoList.length - nVid;
    const verifiedVideos = videoList.filter((v) => v.status === 'verified' || v.status === 'main').length;

    const learningBlock = LP.learningEnabled()
      ? '<div class="section-head"><h2>学习小节与配套资料</h2><span class="muted">小节只调整练习顺序，不改题号与进度</span></div>' +
        '<div class="card">' +
          '<div class="facts wide">' +
            '<div><span>学习小节</span><b>' + lessonsTotal + ' 个</b></div>' +
            '<div><span>已建小节专题</span><b>' + topicsWithLessons + ' / ' + LP.state.topics.length + '</b></div>' +
            '<div><span>配套资料</span><b>' + videoList.length + ' 条</b><span class="muted">视频 ' + nVid + ' · 图文 ' + nArt + '</span></div>' +
            '<div><span>已人工验收</span><b>' + verifiedVideos + ' / ' + videoList.length + '</b></div>' +
          '</div>' +
          (issues.length
            ? '<p class="warnline">学习小节数据有 ' + issues.length + ' 处待处理：' +
              esc(issues.slice(0, 4).map(issueText).join('；')) + (issues.length > 4 ? ' 等' : '') + '</p>'
            : '<p class="okline">小节覆盖检查通过：没有漏题、重复题号或无效资料引用。</p>') +
          '<p class="muted small">资料验收状态见 docs/video-map.md；只有「已验收」的资料才可以当作主资料使用。</p>' +
        '</div>'
      : '';

    const signedIn = !!(LP.cloud && LP.cloud.isSignedIn());

    return (
      '<div class="page-head"><h1>进度与数据</h1><p class="muted">进度默认保存在当前浏览器本地。登录后可跨设备同步，也可以用导出/导入手动迁移。</p></div>' +
      '<div class="stat-row">' +
        '<div class="stat"><span>已做</span><b>' + s.done + '</b></div>' +
        '<div class="stat"><span>正确率</span><b>' + LP.pct(s.rate) + '</b></div>' +
        '<div class="stat"><span>已掌握</span><b>' + s.mastered + '</b></div>' +
        '<div class="stat"><span>错题</span><b>' + p.weak + '</b></div>' +
        '<div class="stat"><span>收藏</span><b>' + p.favorites + '</b></div>' +
        '<div class="stat"><span>待复习</span><b>' + p.review + '</b></div>' +
      '</div>' +
      (storageOK
        ? '<div class="okline">本地存储可用，刷新后进度会自动恢复。</div>'
        : '<div class="warnline">当前浏览器禁止写入本地存储（可能是无痕模式或隐私设置）。进度只在本次会话有效，请及时导出。</div>') +
      (staleCount ? '<div class="warnline">有 ' + staleCount + ' 条记录来自旧题库版本（' + esc(b.bank_version) + ' 之前）。题号稳定，记录已保留，建议重新练一遍这些题。</div>' : '') +
      cloudCard() +
      '<div class="section-head"><h2>备份与迁移</h2></div>' +
      '<div class="data-grid">' +
        '<div class="card">' +
          '<h3>导出进度</h3>' +
          '<p class="muted">下载 JSON 文件，包含作答记录、错题次数、收藏与待复习标记。</p>' +
          '<button class="btn primary" data-act="export">导出进度 JSON</button>' +
        '</div>' +
        '<div class="card">' +
          '<h3>导入进度</h3>' +
          '<p class="muted">合并到当前进度，不会清空已有记录。导入前会先预览影响范围。</p>' +
          '<label class="btn ghost file-btn">选择文件<input type="file" id="import-file" accept="application/json,.json"></label>' +
        '</div>' +
        '<div class="card danger">' +
          '<h3>' + (signedIn ? '清空本机缓存' : '清空本机进度') + '</h3>' +
          '<p class="muted">' +
            (signedIn
              ? '只删除当前浏览器里的副本，云端记录保留；清空后会立即从云端重新下载。'
              : '删除当前浏览器中的全部作答记录、收藏与待复习标记，不可撤销。') +
          '</p>' +
          '<button class="btn danger" data-act="clear-local">' + (signedIn ? '清空本机缓存' : '清空全部记录') + '</button>' +
        '</div>' +
        (signedIn
          ? '<div class="card danger">' +
              '<h3>清空云端与本机</h3>' +
              '<p class="muted">删除该账号在云端的全部记录，并清空本机。其他设备下次同步时也会被清空，不可撤销。</p>' +
              '<p class="muted small">当前账号：' + esc(cloudUserLine(LP.cloud.user())) + '</p>' +
              '<button class="btn danger" data-act="clear-cloud">清空云端记录</button>' +
            '</div>'
          : '') +
      '</div>' +
      learningBlock +
      '<div class="section-head"><h2>题库信息</h2></div>' +
      '<div class="card">' +
        '<div class="facts wide">' +
          '<div><span>题库</span><b>' + esc(b.title) + '</b></div>' +
          '<div><span>题库版本</span><b>' + esc(b.bank_version) + '</b></div>' +
          '<div><span>解析版本</span><b>' + esc(b.explain_version || '—') + '</b></div>' +
          '<div><span>结构版本</span><b>' + esc(b.schema_version) + '</b></div>' +
          '<div><span>题量</span><b>' + LP.state.activeQuestions.length + ' 题 / ' + LP.state.topics.length + ' 专题</b></div>' +
          '<div><span>编制模型</span><b>' + esc((b.review_record && b.review_record.work_model) || '—') + '</b></div>' +
          '<div><span>独立复核</span><b>' + esc((b.review_record && b.review_record.review_model) || '—') + '</b></div>' +
        '</div>' +
        '<p class="muted small">' + esc((b.review_record && b.review_record.limitation) || '') + '</p>' +
      '</div>'
    );
  };

  /* ---------------- 解析浮层内容 ---------------- */

  V.peekHtml = (qid) => {
    const q = LP.state.qById[qid];
    if (!q) return '';
    const rec = LP.getRecord(qid);
    const sel = rec && rec.attempts ? rec.selected : [];
    return (
      '<div class="peek-card">' +
        '<div class="qhead"><span class="qid">' + esc(q.id) + '</span>' + typeTag(q) +
          '<span class="tag ghost">' + esc(q.cluster) + '</span>' +
          '<button class="icon-btn right" data-act="close-peek">✕</button></div>' +
        (isNegativeStem(q.stem) ? '<p class="qnote">注意：本题选错误项</p>' : '') +
        '<h2 class="stem">' + esc(q.stem) + '</h2>' +
        optionList(q, sel, true, true) +
        explainBlock(q, sel, rec ? !!rec.correct : true) +
      '</div>'
    );
  };
})();
