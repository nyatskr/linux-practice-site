/* app.js — 路由、会话、交互 */
(function () {
  'use strict';

  const LP = window.LP;
  const V = LP.views;
  const $ = (sel) => document.querySelector(sel);

  const browseState = { topic: 'all', status: 'all', q: '', openSet: new Set() };
  let timerId = null;
  let lastRouteKey = '';

  /* ---------------- 路由 ---------------- */

  function parseHash() {
    const raw = (location.hash || '#/').replace(/^#/, '');
    const qi = raw.indexOf('?');
    const path = qi >= 0 ? raw.slice(0, qi) : raw;
    const query = new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : '');
    const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
    return { parts, query, key: path };
  }

  function render() {
    const { parts, query, key } = parseHash();
    const app = $('#app');
    if (!app) return;
    const route = parts[0] || 'home';
    const keyChanged = key !== lastRouteKey;
    let html = '';

    if (route === 'home') {
      html = V.dashboard();
    } else if (route === 'topic') {
      html = V.topic(parts[1]);
    } else if (route === 'practice') {
      html = V.practice();
    } else if (route === 'result') {
      html = V.result();
    } else if (route === 'wrong') {
      html = V.wrong(parts[1] || 'weak');
    } else if (route === 'browse') {
      if (keyChanged) {
        browseState.topic = parts[1] && parts[1] !== 'all' ? parts[1] : 'all';
      }
      html = V.browse(browseState.topic, browseState);
    } else if (route === 'data') {
      html = V.data();
    } else {
      html = '<div class="empty">页面不存在。<a href="#/">返回首页</a></div>';
    }

    app.innerHTML = html;

    if (keyChanged) {
      window.scrollTo(0, 0);
      lastRouteKey = key;
    }

    afterRender(route, query);
    updateChrome(route);
  }

  function afterRender(route, query) {
    stopTimer();
    if (route === 'practice') {
      const s = LP.state.session;
      if (s && s.deadline && !s.finished) startTimer();
      const qid = s && s.qids[s.index];
      if (qid) document.title = '第 ' + (s.index + 1) + ' 题 · Linux 练习站';
      else document.title = 'Linux 练习站';
    } else {
      document.title = 'Linux 练习站 · 建策杯红帽 Linux 题库';
    }

    if (route === 'browse') {
      const sel = $('#browse-topic');
      if (sel) {
        sel.addEventListener('change', () => {
          browseState.topic = sel.value;
          render();
        });
      }
      const input = $('#browse-search');
      if (input) {
        let t = null;
        input.addEventListener('input', () => {
          clearTimeout(t);
          const val = input.value;
          t = setTimeout(() => {
            browseState.q = val;
            render();
            const again = $('#browse-search');
            if (again) {
              again.focus();
              again.setSelectionRange(again.value.length, again.value.length);
            }
          }, 220);
        });
      }
    }

    if (route === 'data') {
      const file = $('#import-file');
      if (file) file.addEventListener('change', onImportFile);
    }

    if (route === 'topic') {
      const lessonId = query && query.get('lesson');
      const lessonEl = lessonId ? document.getElementById('lesson-' + lessonId) : null;
      if (lessonEl) {
        requestAnimationFrame(() => {
          const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          lessonEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
          lessonEl.classList.add('lesson-target');
          try {
            lessonEl.focus({ preventScroll: true });
          } catch (e) { /* 旧浏览器不支持 focus 参数，忽略 */ }
          setTimeout(() => lessonEl.classList.remove('lesson-target'), 1800);
        });
      }
    }
  }

  function updateChrome(route) {
    const s = LP.globalStats();
    const done = $('#side-done');
    const total = $('#side-total');
    const bar = $('#side-bar');
    if (done) done.textContent = s.done;
    if (total) total.textContent = s.total;
    if (bar) bar.style.width = Math.round((s.done / Math.max(1, s.total)) * 100) + '%';
    document.querySelectorAll('[data-nav]').forEach((el) => {
      const nav = el.getAttribute('data-nav');
      const on =
        (nav === 'home' && route === 'home') ||
        (nav === 'wrong' && route === 'wrong') ||
        (nav === 'browse' && route === 'browse') ||
        (nav === 'data' && route === 'data');
      el.classList.toggle('on', on);
    });
  }

  /* ---------------- 计时 ---------------- */

  function startTimer() {
    tick();
    timerId = setInterval(tick, 500);
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function tick() {
    const s = LP.state.session;
    const el = $('#timer');
    if (!s || !s.deadline) return;
    const left = (s.deadline - Date.now()) / 1000;
    if (el) {
      el.textContent = LP.fmtClock(left);
      el.classList.toggle('urgent', left <= 60);
    }
    if (left <= 0) {
      stopTimer();
      LP.toast('时间到，已自动交卷', 'warn');
      finishExam(true);
    }
  }

  /* ---------------- 会话 ---------------- */

  function startSession(opts) {
    if (!opts.qids.length) {
      LP.toast('没有符合条件的题目', 'warn');
      return;
    }
    LP.state.session = {
      id: LP.uid(),
      mode: opts.mode,
      title: opts.title,
      qids: opts.qids.slice(),
      index: 0,
      answers: {},
      submitted: {},
      startedAt: Date.now(),
      deadline: opts.deadline || null,
      config: opts.config || null,
      results: null,
      finished: false,
    };
    LP.saveSession();
    go('#/practice');
  }

  function go(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  }

  function currentQid() {
    const s = LP.state.session;
    return s ? s.qids[s.index] : null;
  }

  /* 翻题后统一把视线拉回题干：上一题、下一题、答题卡跳转都走这里 */
  function focusStem() {
    const el = document.getElementById('stem');
    if (!el) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const offset = window.innerWidth <= 860 ? 64 : 24;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    try {
      el.focus({ preventScroll: true });
    } catch (e) { /* 旧浏览器不支持 focus 参数，忽略 */ }
  }

  function refreshCard() {
    const s = LP.state.session;
    const card = $('#qcard');
    if (!s || !card) return;
    const holder = document.createElement('div');
    holder.innerHTML = V.questionCard(s);
    const fresh = holder.firstElementChild;
    if (fresh) card.replaceWith(fresh);
    const sheet = $('#sheetbox');
    if (sheet) {
      const answered = s.qids.filter((id) => (s.answers[id] || []).length).length;
      const meta = sheet.querySelector('.cardbox-head .muted');
      if (meta) meta.textContent = '已答 ' + answered + '/' + s.qids.length;
      sheet.querySelectorAll('.sheet-cell').forEach((cell, i) => {
        const id = s.qids[i];
        cell.classList.toggle('done', (s.answers[id] || []).length > 0);
        cell.classList.toggle('cur', i === s.index);
      });
    }
  }

  function toggleOption(id) {
    const s = LP.state.session;
    if (!s) return;
    const qid = currentQid();
    const q = LP.state.qById[qid];
    if (!q) return;
    if (s.mode !== 'exam' && s.submitted[qid]) return;

    let sel = (s.answers[qid] || []).slice();
    if (q.type === 'single') {
      sel = sel[0] === id ? [] : [id];
    } else if (sel.indexOf(id) >= 0) {
      sel = sel.filter((x) => x !== id);
    } else {
      sel = sel.concat(id).sort();
    }
    s.answers[qid] = sel;
    LP.saveSession();
    refreshCard();
  }

  function submitCurrent() {
    const s = LP.state.session;
    if (!s) return;
    const qid = currentQid();
    const q = LP.state.qById[qid];
    const sel = s.answers[qid] || [];
    if (!q || !sel.length) return;
    const ok = LP.isCorrect(q, sel);
    LP.applyAnswer(qid, sel, ok);
    s.submitted[qid] = true;
    LP.saveSession();
    refreshCard();
    const ex = document.querySelector('.explain');
    if (ex) ex.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function nextQuestion() {
    const s = LP.state.session;
    if (!s) return;
    if (s.index >= s.qids.length - 1) {
      if (s.mode === 'exam') return finishExam();
      return finishPractice();
    }
    s.index += 1;
    LP.saveSession();
    render();
    focusStem();
  }

  function prevQuestion() {
    const s = LP.state.session;
    if (!s || s.index === 0) return;
    s.index -= 1;
    LP.saveSession();
    render();
    focusStem();
  }

  function finishPractice() {
    const s = LP.state.session;
    if (!s) return;
    const results = {};
    s.qids.forEach((id) => {
      if (s.submitted[id]) {
        results[id] = { selected: s.answers[id] || [], correct: LP.isCorrect(LP.state.qById[id], s.answers[id] || []) };
      }
    });
    s.results = results;
    s.finished = true;
    s.finishedAt = Date.now();
    LP.saveSession();
    go('#/result');
  }

  function finishExam(silent) {
    const s = LP.state.session;
    if (!s) return;
    const unanswered = s.qids.filter((id) => !(s.answers[id] || []).length).length;
    if (!silent && unanswered > 0) {
      openModal(
        '<h3>还有 ' + unanswered + ' 题未作答</h3>' +
          '<p class="muted">未作答的题会记为错误。确定现在交卷吗？</p>' +
          '<div class="modal-act"><button class="btn ghost" data-act="close-modal">继续答题</button>' +
          '<button class="btn primary" data-act="confirm-finish">确定交卷</button></div>'
      );
      return;
    }
    const results = {};
    s.qids.forEach((id) => {
      const sel = s.answers[id] || [];
      const ok = LP.isCorrect(LP.state.qById[id], sel);
      results[id] = { selected: sel, correct: ok };
      if (sel.length) LP.applyAnswer(id, sel, ok);
      else {
        const rec = LP.ensureRecord(id);
        rec.selected = [];
        rec.correct = false;
        rec.answeredAt = Date.now();
        rec.attempts = (rec.attempts || 0) + 1;
        rec.wrongCount = (rec.wrongCount || 0) + 1;
      }
    });
    LP.saveProgress();
    s.results = results;
    s.finished = true;
    s.finishedAt = Date.now();
    LP.saveSession();
    closeModal();
    go('#/result');
  }

  /* ---------------- 启动练习的入口 ---------------- */

  function startTopic(topicId, only) {
    const t = LP.state.topicById[topicId];
    if (!t) return;
    let qids = t.qids.slice();
    if (only === 'new') qids = qids.filter((id) => LP.statusOf(id) === 'new');
    if (only === 'weak') qids = qids.filter((id) => LP.statusOf(id) === 'weak');
    startSession({ mode: 'topic', title: t.num + ' ' + t.title + (only === 'new' ? ' · 未做' : only === 'weak' ? ' · 错题' : ''), qids });
  }

  function startFiltered(topicId, cluster, kp) {
    const t = LP.state.topicById[topicId];
    if (!t) return;
    let qids = t.qids.filter((id) => {
      const q = LP.state.qById[id];
      if (cluster && q.cluster !== cluster) return false;
      if (kp && q.knowledge_point !== kp) return false;
      return true;
    });
    startSession({
      mode: kp ? 'kp' : 'cluster',
      title: t.num + ' ' + (kp || cluster),
      qids,
    });
  }

  /* 按学习小节顺序练习（小节只决定顺序，题号与进度不变） */
  function startTopicOrder(topicId, order) {
    const t = LP.state.topicById[topicId];
    if (!t) return;
    const qids = order === 'original' ? t.qids.slice() : LP.studyQids(t.id);
    startSession({
      mode: 'topic',
      title: t.num + ' ' + t.title + (order === 'original' ? ' · 原题顺序' : ' · 学习顺序'),
      qids,
    });
  }

  function startLesson(lessonId) {
    const lesson = LP.state.lessonById[lessonId];
    if (!lesson) return;
    if (!lesson.qids.length) {
      LP.toast('这个小节还没有题目', 'warn');
      return;
    }
    startSession({ mode: 'lesson', title: lesson.id + ' ' + lesson.title, qids: lesson.qids });
  }

  function startSet(kind) {
    const map = { weak: LP.wrongIds(), review: LP.reviewIds(), fav: LP.favoriteIds() };
    const ids = map[kind] || [];
    const label = { weak: '错题练习', review: '待复习', fav: '收藏练习' }[kind] || '练习';
    startSession({ mode: kind === 'weak' ? 'wrong' : kind, title: label, qids: ids });
  }

  function startSingle(qid) {
    startSession({ mode: 'single', title: '单题 · ' + qid, qids: [qid] });
  }

  /* ---------------- 综合练习配置 ---------------- */

  function openExamModal() {
    const prefs = LP.state.prefs;
    const chosen = new Set(prefs.examTopics && prefs.examTopics.length ? prefs.examTopics : LP.state.topics.map((t) => t.id));
    const topicChips = LP.state.topics
      .map(
        (t) =>
          '<button class="chip' + (chosen.has(t.id) ? ' on' : '') + '" data-act="exam-topic" data-topic="' + t.id + '" data-count="' + t.qids.length + '">' +
          t.num + ' ' + LP.esc(t.title) + ' <b>' + t.qids.length + '</b></button>'
      )
      .join('');

    const countOpts = [10, 20, 30, 50, 100].map(
      (n) => '<option value="' + n + '"' + (prefs.examCount === n ? ' selected' : '') + '>' + n + ' 题</option>'
    ).join('');
    const timeOpts = [
      [0, '不限时'],
      [10, '10 分钟'],
      [20, '20 分钟'],
      [30, '30 分钟'],
      [45, '45 分钟'],
    ]
      .map(([v, l]) => '<option value="' + v + '"' + (prefs.examMinutes === v ? ' selected' : '') + '>' + l + '</option>')
      .join('');

    openModal(
      '<h3>综合练习</h3>' +
        '<p class="muted">自选专题与题量，随机抽题且不重复。多选须完整选对才计分。</p>' +
        '<div class="field">' +
          '<label class="row-label"><span>专题范围</span><span class="tools">' +
            '<button class="linkbtn" data-act="exam-all">全选</button>' +
            '<button class="linkbtn" data-act="exam-none">清空</button>' +
          '</span></label>' +
          '<div class="chips" id="exam-topics">' + topicChips + '</div>' +
          '<p class="muted small" id="exam-sum"></p>' +
        '</div>' +
        '<div class="field two">' +
          '<div><label>题量</label><select class="select" id="exam-count">' + countOpts + '</select></div>' +
          '<div><label>时间</label><select class="select" id="exam-time">' + timeOpts + '</select></div>' +
        '</div>' +
        '<div class="modal-act"><button class="btn ghost" data-act="close-modal">取消</button>' +
        '<button class="btn primary" data-act="exam-start">开始答题</button></div>'
    );

    const sum = () => {
      const on = Array.from(document.querySelectorAll('#exam-topics .chip.on'));
      const n = on.reduce((a, c) => a + (parseInt(c.getAttribute('data-count'), 10) || 0), 0);
      const el = $('#exam-sum');
      if (el) el.textContent = '已选 ' + on.length + ' 个专题 · 可抽 ' + n + ' 题';
    };
    const chips = $('#exam-topics');
    if (chips) {
      chips.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act="exam-topic"]');
        if (!b) return;
        b.classList.toggle('on');
        sum();
      });
    }
    const all = $('[data-act="exam-all"]');
    const none = $('[data-act="exam-none"]');
    if (all) all.addEventListener('click', () => {
      document.querySelectorAll('#exam-topics .chip').forEach((c) => c.classList.add('on'));
      sum();
    });
    if (none) none.addEventListener('click', () => {
      document.querySelectorAll('#exam-topics .chip').forEach((c) => c.classList.remove('on'));
      sum();
    });
    sum();
  }

  function beginExam() {
    const chips = Array.from(document.querySelectorAll('#exam-topics .chip.on'));
    const topicIds = chips.map((c) => c.getAttribute('data-topic'));
    if (!topicIds.length) {
      LP.toast('至少选择一个专题', 'warn');
      return;
    }
    const count = parseInt($('#exam-count').value, 10) || 20;
    const minutes = parseInt($('#exam-time').value, 10) || 0;

    let pool = [];
    topicIds.forEach((id) => {
      const t = LP.state.topicById[id];
      if (t) pool = pool.concat(t.qids);
    });
    if (!pool.length) {
      LP.toast('所选专题没有题目', 'warn');
      return;
    }
    const pick = Math.min(count, pool.length);
    const shuffled = pool.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const qids = shuffled.slice(0, pick);

    LP.state.prefs.examCount = count;
    LP.state.prefs.examMinutes = minutes;
    LP.state.prefs.examTopics = topicIds;
    LP.savePrefs();
    closeModal();

    startSession({
      mode: 'exam',
      title: '综合练习 · ' + pick + ' 题' + (minutes ? ' · ' + minutes + ' 分钟' : ''),
      qids,
      deadline: minutes ? Date.now() + minutes * 60000 : null,
      config: { topicIds, count: pick, minutes },
    });
  }

  /* ---------------- 弹层 ---------------- */

  function openModal(html, opts) {
    closeModal();
    const wrap = document.createElement('div');
    wrap.className = 'modal-wrap';
    wrap.id = 'modal';
    wrap.innerHTML = '<div class="modal' + (opts && opts.wide ? ' wide' : '') + '">' + html + '</div>';
    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) closeModal();
    });
    document.body.appendChild(wrap);
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    const el = $('#modal');
    if (el) el.remove();
    document.body.classList.remove('modal-open');
  }

  /* 账号核对面板里的云端条数：单独异步填，免得弹窗卡在网络上 */
  async function fillCloudCount() {
    const el = document.getElementById('diag-cloud-count');
    if (!el) return;
    if (!LP.cloud || !LP.cloud.isSignedIn()) {
      el.textContent = '未登录';
      return;
    }
    el.textContent = '查询中…';
    try {
      const n = await LP.cloud.countCloud();
      el.textContent = n + ' 条';
    } catch (e) {
      el.textContent = '查询失败：' + (e && e.message ? e.message : e);
    }
  }

  /* ---------------- 导入导出 ---------------- */

  function exportProgress() {
    const payload = LP.exportPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    const name = 'linux-progress-' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes()) + '.json';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1000);
    LP.toast('已导出 ' + payload.records.length + ' 条记录');
  }

  function onImportFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let data = null;
      try {
        data = JSON.parse(String(reader.result));
      } catch (err) {
        LP.toast('文件不是有效的 JSON', 'warn');
        return;
      }
      previewImport(data, file.name);
    };
    reader.readAsText(file, 'utf-8');
    e.target.value = '';
  }

  function previewImport(data, fileName) {
    const records = Array.isArray(data) ? data : data && data.records;
    if (!Array.isArray(records)) {
      LP.toast('文件里没有 records 数组，可能不是本网站的进度文件', 'warn');
      return;
    }
    let added = 0, updated = 0, skipped = 0, badOption = 0;
    records.forEach((rec) => {
      if (!rec || !rec.qid || !LP.state.qById[rec.qid]) {
        skipped++;
        return;
      }
      const q = LP.state.qById[rec.qid];
      const valid = new Set(q.options.map((o) => o.id));
      const sel = Array.isArray(rec.selected) ? rec.selected : [];
      if (sel.some((id) => !valid.has(id))) badOption++;
      const cur = LP.state.progress.records[rec.qid];
      if (!cur) added++;
      else if ((rec.answeredAt || 0) > (cur.answeredAt || 0) || !cur.attempts) updated++;
      else updated++;
    });

    openModal(
      '<h3>导入预览</h3>' +
        '<p class="muted">文件：' + LP.esc(fileName) + (data.bankVersion ? ' · 题库版本 ' + LP.esc(data.bankVersion) : '') + '</p>' +
        '<div class="import-stats">' +
          '<div><b>' + added + '</b><span>新增记录</span></div>' +
          '<div><b>' + updated + '</b><span>合并更新</span></div>' +
          '<div><b>' + skipped + '</b><span>跳过（题号不存在）</span></div>' +
        '</div>' +
        (badOption ? '<p class="warnline">有 ' + badOption + ' 条记录的选项 ID 与当前题库不匹配，这些选项会被忽略。</p>' : '') +
        '<p class="muted small">导入只做合并，不会清空现有进度；同一题保留最近一次的作答结果，累计错误次数取较大值。</p>' +
        '<div class="modal-act"><button class="btn ghost" data-act="close-modal">取消</button>' +
        '<button class="btn primary" data-act="confirm-import" data-added="' + added + '" data-updated="' + updated + '" data-skipped="' + skipped + '">确认导入</button></div>',
      { wide: true }
    );
    window.__pendingImport = records;
  }

  function doImport() {
    const records = window.__pendingImport;
    if (!Array.isArray(records)) return closeModal();
    let added = 0, updated = 0, skipped = 0;
    records.forEach((rec) => {
      const q = rec && rec.qid ? LP.state.qById[rec.qid] : null;
      if (!q) {
        skipped++;
        return;
      }
      const valid = new Set(q.options.map((o) => o.id));
      const sel = (Array.isArray(rec.selected) ? rec.selected : []).filter((id) => valid.has(id));
      const incoming = Object.assign({}, rec, { selected: sel });
      const cur = LP.state.progress.records[rec.qid];
      if (!cur) {
        LP.state.progress.records[rec.qid] = LP.normalizeRecord(incoming);
        added++;
      } else {
        LP.mergeInto(cur, incoming);
        updated++;
      }
    });
    LP.saveProgress();
    window.__pendingImport = null;
    closeModal();
    render();
    LP.toast('已导入：新增 ' + added + ' 条，合并 ' + updated + ' 条，跳过 ' + skipped + ' 条');
  }

  /* ---------------- 事件 ---------------- */

  const actions = {
    resume: () => go('#/practice'),
    'drop-session': () => {
      LP.clearSession();
      render();
      LP.toast('已放弃上次练习');
    },
    'goto-exam': () => openExamModal(),
    'exam-start': () => beginExam(),
    'close-modal': () => closeModal(),
    'confirm-finish': () => finishExam(true),
    'confirm-import': () => doImport(),
    export: () => exportProgress(),
    'clear-local': () => {
      const signedIn = !!(LP.cloud && LP.cloud.isSignedIn());
      const n = LP.recordList().length;
      openModal(
        '<h3>' + (signedIn ? '清空本机缓存？' : '清空全部学习记录？') + '</h3>' +
          '<p class="muted">' +
          (signedIn
            ? '将删除本机 ' + n + ' 条记录。云端记录保留，清空后会立即从云端重新下载。'
            : '将删除本机 ' + n + ' 条记录，包括作答、错题、收藏与待复习标记。此操作不可撤销，建议先导出备份。') +
          '</p>' +
          '<div class="modal-act"><button class="btn ghost" data-act="close-modal">取消</button>' +
          '<button class="btn danger" data-act="confirm-clear-local">' + (signedIn ? '清空本机缓存' : '确认清空') + '</button></div>'
      );
    },
    'confirm-clear-local': () => {
      const signedIn = !!(LP.cloud && LP.cloud.isSignedIn());
      LP.resetProgress();
      LP.clearSession();
      closeModal();
      render();
      if (signedIn) {
        LP.toast('本机缓存已清空，正在从云端恢复');
        LP.cloud.syncNow();
      } else {
        LP.toast('已清空本机学习记录');
      }
    },
    'clear-cloud': () => {
      const user = LP.cloud && LP.cloud.user();
      const who = user
        ? (user.user_metadata && (user.user_metadata.user_name || user.user_metadata.preferred_username)) ||
          (user.email || '') || String(user.id).slice(0, 8)
        : '';
      openModal(
        '<h3>清空云端与本机记录？</h3>' +
          '<p class="muted">将删除该账号在云端的全部记录，并清空本机。其他设备下次同步时也会被清空，不可撤销，建议先导出备份。</p>' +
          (user
            ? '<p class="muted small">当前账号：@' + LP.esc(who) + ' · ' + LP.esc(user.email || '未取到邮箱') +
              ' · ID ' + LP.esc(String(user.id).slice(0, 8)) + '</p>'
            : '') +
          '<div class="modal-act"><button class="btn ghost" data-act="close-modal">取消</button>' +
          '<button class="btn danger" data-act="confirm-clear-cloud">确认清空云端</button></div>'
      );
    },
    'confirm-clear-cloud': async () => {
      if (!LP.cloud || !LP.cloud.isSignedIn()) return closeModal();
      try {
        await LP.cloud.clearCloud();
        LP.resetProgress();
        LP.clearSession();
        closeModal();
        render();
        LP.toast('已清空云端与本机记录');
      } catch (e) {
        LP.toast('清空云端失败：' + (e && e.message ? e.message : e), 'warn');
      }
    },
    'cloud-login': async () => {
      if (!LP.cloud) return;
      try {
        await LP.cloud.signIn();
      } catch (e) { /* 已在模块内提示 */ }
    },
    'cloud-sync': async () => {
      if (!LP.cloud || !LP.cloud.isSignedIn()) return;
      await LP.cloud.syncNow();
      const st = LP.cloud.status();
      if (st.state === 'synced') LP.toast('已同步');
      else if (st.state === 'offline') LP.toast('当前离线，联网后会自动同步', 'warn');
      else if (st.state === 'error') LP.toast('同步失败：' + st.message, 'warn');
      render();
    },
    'cloud-logout': async () => {
      if (!LP.cloud) return;
      try {
        await LP.cloud.signOut();
      } catch (e) { /* 已在模块内提示 */ }
    },
    'cloud-migrate': async () => {
      closeModal();
      if (!LP.cloud) return;
      try {
        const n = await LP.cloud.migrate();
        render();
        LP.toast(n ? '已合并 ' + n + ' 条记录到云端' : '本机没有可合并的记录');
      } catch (e) {
        LP.toast('合并失败：' + (e && e.message ? e.message : e), 'warn');
      }
    },
    'cloud-skip-migrate': () => {
      if (LP.cloud) LP.cloud.skipMigration();
      closeModal();
      render();
      LP.toast('本机记录已保留，不会上传');
    },
    'cloud-diag': () => {
      if (!LP.cloud || !LP.cloud.isSignedIn()) return;
      const user = LP.cloud.user();
      const m = (user && user.user_metadata) || {};
      const name = m.user_name || m.preferred_username || m.name || '（GitHub 未提供）';
      const scopes = LP.localScopeSummary();
      const list = scopes.length
        ? scopes
            .map((s) => {
              const label =
                s.scope === 'guest'
                  ? '未登录（guest）'
                  : '账号 ID ' + LP.esc(s.scope.slice(0, 8)) + (s.current ? '（当前登录）' : '');
              return (
                '<li>' + label + '：<b>' + s.active + '</b> 条有效记录' +
                '<span class="muted small">（缓存 ' + s.total + ' 条）</span></li>'
              );
            })
            .join('')
        : '<li class="muted">本机没有缓存任何记录</li>';

      openModal(
        '<h3>账号与记录核对</h3>' +
          '<p class="muted small">先确认这一块：现在用的是哪个 GitHub 账号。</p>' +
          '<ul class="diag-list">' +
            '<li>GitHub 用户名：<b>@' + LP.esc(name) + '</b></li>' +
            '<li>邮箱：<b>' + LP.esc(user.email || '未获取到（重新登录一次可补上）') + '</b></li>' +
            '<li>账号 ID：<code>' + LP.esc(String(user.id)) + '</code></li>' +
            '<li>云端记录：<span id="diag-cloud-count">查询中…</span></li>' +
          '</ul>' +
          '<p class="muted small">本机缓存过的作用域 —— 每登一个账号就多存一份，彼此不会覆盖。</p>' +
          '<ul class="diag-list">' + list + '</ul>' +
          '<p class="muted small">要确认某个 ID 对应哪个账号：退出登录，用那个账号登进来，再打开这里看邮箱。' +
          '本面板只读，不会合并、修改或删除任何记录。</p>' +
          '<div class="modal-act"><button class="btn ghost" data-act="close-modal">关闭</button>' +
          '<button class="btn sm" data-act="cloud-diag-refresh">重新查询云端</button></div>',
        { wide: true }
      );
      fillCloudCount();
    },
    'cloud-diag-refresh': () => {
      fillCloudCount();
    },
    'cloud-help': () => {
      openModal(
        '<h3>如何启用云同步</h3>' +
          '<p class="muted">云同步需要先有一个 Supabase 项目，配置一次即可长期使用。</p>' +
          '<ol class="steps">' +
          '<li>在 Supabase 建项目，执行 <code>docs/cloud-sync.md</code> 里的建表 SQL。</li>' +
          '<li>在 Authentication 里打开 GitHub 登录，填入 GitHub OAuth App 的 Client ID / Secret。</li>' +
          '<li>把 Project URL 和 Publishable key 填进 <code>assets/js/cloud-config.js</code>。</li>' +
          '<li>把正式网址和本地调试网址加进 Redirect URLs，然后刷新本页。</li>' +
          '</ol>' +
          '<p class="muted small">完整步骤、建表 SQL 与常见报错见仓库中的 docs/cloud-sync.md。</p>' +
          '<div class="modal-act"><button class="btn primary" data-act="close-modal">知道了</button></div>',
        { wide: true }
      );
    },
    opt: (el) => toggleOption(el.getAttribute('data-id')),
    submit: () => submitCurrent(),
    next: () => nextQuestion(),
    prev: () => prevQuestion(),
    finish: () => finishExam(false),
    exit: () => {
      const s = LP.state.session;
      if (s && s.mode === 'exam' && !s.finished) {
        openModal(
          '<h3>退出综合练习？</h3><p class="muted">本次作答会保留为未完成状态，可以从首页继续。</p>' +
            '<div class="modal-act"><button class="btn ghost" data-act="close-modal">继续答题</button>' +
            '<a class="btn primary" href="#/">退出</a></div>'
        );
        return;
      }
      go('#/');
    },
    fav: () => {
      const id = currentQid();
      if (!id) return;
      const on = LP.toggleFavorite(id);
      refreshCard();
      LP.toast(on ? '已收藏' : '已取消收藏');
    },
    review: () => {
      const id = currentQid();
      if (!id) return;
      const on = LP.toggleReview(id);
      refreshCard();
      LP.toast(on ? '已加入待复习' : '已移出待复习');
    },
    'start-topic': (el) => startTopic(el.getAttribute('data-topic'), el.getAttribute('data-only')),
    'start-topic-order': (el) => startTopicOrder(el.getAttribute('data-topic'), el.getAttribute('data-order')),
    'start-lesson': (el) => startLesson(el.getAttribute('data-lesson')),
    'start-cluster': (el) => startFiltered(el.getAttribute('data-topic'), el.getAttribute('data-cluster'), null),
    'start-kp': (el) =>
      startFiltered(el.getAttribute('data-topic'), el.getAttribute('data-cluster'), el.getAttribute('data-kp')),
    'start-set': (el) => startSet(el.getAttribute('data-set')),
    'start-single': (el) => startSingle(el.getAttribute('data-qid')),
    'redo-wrong': () => {
      const s = LP.state.session;
      if (!s || !s.results) return;
      const ids = s.qids.filter((id) => s.results[id] && !s.results[id].correct);
      startSession({ mode: 'wrong', title: '重练错题 · ' + ids.length + ' 题', qids: ids });
    },
    'unflag': (el) => {
      const qid = el.getAttribute('data-qid');
      const flag = el.getAttribute('data-flag');
      LP.clearRecordFlag(qid, flag);
      render();
      LP.toast(flag === 'favorite' ? '已取消收藏' : '已移出待复习');
    },
    peek: (el) => {
      const qid = el.getAttribute('data-qid');
      openModal(V.peekHtml(qid), { wide: true });
    },
    'close-peek': () => closeModal(),
    'fav-q': (el) => {
      const on = LP.toggleFavorite(el.getAttribute('data-qid'));
      render();
      LP.toast(on ? '已收藏' : '已取消收藏');
    },
    'review-q': (el) => {
      const on = LP.toggleReview(el.getAttribute('data-qid'));
      render();
      LP.toast(on ? '已加入待复习' : '已移出待复习');
    },
    'browse-status': (el) => {
      browseState.status = el.getAttribute('data-status');
      render();
    },
    'browse-toggle': (el) => {
      const qid = el.getAttribute('data-qid');
      if (browseState.openSet.has(qid)) browseState.openSet.delete(qid);
      else browseState.openSet.add(qid);
      render();
    },
    'browse-expand-all': () => {
      const list = V.browseList(browseState.topic, browseState).slice(0, 400);
      if (!list.length) return;
      if (list.every((q) => browseState.openSet.has(q.id))) {
        browseState.openSet.clear();
      } else {
        list.forEach((q) => browseState.openSet.add(q.id));
      }
      render();
    },
    'browse-collapse-all': () => {
      browseState.openSet.clear();
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    'to-top': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    goto: (el) => {
      const s = LP.state.session;
      if (!s) return;
      s.index = parseInt(el.getAttribute('data-index'), 10) || 0;
      LP.saveSession();
      render();
      focusStem();
    },
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const act = el.getAttribute('data-act');
    if (el.tagName === 'A' && el.getAttribute('href')) return;
    if (actions[act]) {
      e.preventDefault();
      actions[act](el, e);
    }
  });

  /* 记住「本组配套视频」的展开状态，翻题后不会自动收起 */
  document.addEventListener(
    'toggle',
    (e) => {
      const box = e.target;
      if (!box || !box.classList || !box.classList.contains('qvideos')) return;
      const s = LP.state.session;
      if (!s) return;
      s.videosOpen = box.open;
      LP.saveSession();
    },
    true
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    if ($('#modal')) return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    if (parseHash().parts[0] !== 'practice') return;

    const s = LP.state.session;
    if (!s) return;
    const q = LP.state.qById[currentQid()];
    if (!q) return;

    const k = e.key.toUpperCase();
    const letter = /^[A-D]$/.test(k) ? k : /^[1-4]$/.test(k) ? 'ABCD'[parseInt(k, 10) - 1] : null;
    if (letter && q.options.some((o) => o.id === letter)) {
      e.preventDefault();
      toggleOption(letter);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (s.mode === 'exam') return nextQuestion();
      if (s.submitted[currentQid()]) return nextQuestion();
      return submitCurrent();
    }
    if (e.key === 'ArrowRight') return nextQuestion();
    if (e.key === 'ArrowLeft') return prevQuestion();
  });

  /* ---------------- 启动 ---------------- */

  LP.dev = { render, go, startSession };

  /* 登录后第一次进来：询问是否把本机记录并进账号 */
  function maybePromptMigration() {
    if (!LP.cloud || !LP.cloud.isSignedIn()) return;
    if (LP.cloud.migrationDismissed()) return;
    const info = LP.cloud.migrationInfo();
    if (!info) return;
    openModal(
      '<h3>把本机记录合并到账号？</h3>' +
        '<p class="muted">检测到本机已有 <b>' + info.count + '</b> 条学习记录。合并后与云端记录取并集：同一题保留最近一次作答，错误次数取较大值。</p>' +
        '<p class="muted small">选择「不合并」时，本机记录仍留在这台设备上，但不会进入云端。</p>' +
        '<div class="modal-act"><button class="btn ghost" data-act="cloud-skip-migrate">不合并</button>' +
        '<button class="btn primary" data-act="cloud-migrate">合并到云端</button></div>'
    );
  }

  function wireCloud() {
    if (!LP.cloud) return;

    LP.cloud.onChange(() => {
      if (parseHash().parts[0] === 'data') render();
    });

    window.addEventListener('lp:auth-changed', () => {
      render();
      maybePromptMigration();
    });

    window.addEventListener('lp:data-changed', () => {
      const route = parseHash().parts[0] || 'home';
      updateChrome(route);
      if (route === 'data') render();
    });

    LP.cloud.init();
  }

  function boot() {
    if (!window.LINUX_BANK) {
      document.getElementById('app').innerHTML =
        '<div class="empty">题库脚本未加载。请确认 assets/js/bank.js 存在。</div>';
      return;
    }
    LP.init(window.LINUX_BANK);
    if (!LP.storageTest()) LP.warnStorage();
    window.addEventListener('hashchange', render);
    render();
    const ver = document.getElementById('side-ver');
    if (ver) ver.textContent = '题库 ' + window.LINUX_BANK.bank_version;
    wireCloud();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
