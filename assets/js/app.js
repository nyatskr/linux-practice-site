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
    const { parts, key } = parseHash();
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

    afterRender(route);
    updateChrome(route);
  }

  function afterRender(route) {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function prevQuestion() {
    const s = LP.state.session;
    if (!s || s.index === 0) return;
    s.index -= 1;
    LP.saveSession();
    render();
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
      const cur = LP.state.progress.records[rec.qid];
      if (!cur) {
        LP.state.progress.records[rec.qid] = {
          qid: rec.qid,
          bankVersion: rec.bankVersion || '',
          selected: sel,
          correct: !!rec.correct,
          answeredAt: rec.answeredAt || 0,
          attempts: rec.attempts || (rec.answeredAt ? 1 : 0),
          wrongCount: rec.wrongCount || 0,
          favorite: !!rec.favorite,
          needsReview: !!rec.needsReview,
        };
        added++;
      } else {
        if ((rec.answeredAt || 0) > (cur.answeredAt || 0)) {
          cur.selected = sel;
          cur.correct = !!rec.correct;
          cur.answeredAt = rec.answeredAt || 0;
          cur.bankVersion = rec.bankVersion || cur.bankVersion;
        }
        cur.attempts = Math.max(cur.attempts || 0, rec.attempts || 0);
        cur.wrongCount = Math.max(cur.wrongCount || 0, rec.wrongCount || 0);
        cur.favorite = cur.favorite || !!rec.favorite;
        cur.needsReview = cur.needsReview || !!rec.needsReview;
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
    'clear-all': () => {
      openModal(
        '<h3>清空全部学习记录？</h3><p class="muted">将删除本机 ' + LP.recordList().length + ' 条记录，包括作答、错题、收藏与待复习标记。此操作不可撤销，建议先导出备份。</p>' +
          '<div class="modal-act"><button class="btn ghost" data-act="close-modal">取消</button>' +
          '<button class="btn danger" data-act="confirm-clear">确认清空</button></div>'
      );
    },
    'confirm-clear': () => {
      LP.state.progress = { schema: 1, bankVersion: LP.state.bank.bank_version, records: {} };
      LP.saveProgress();
      LP.clearSession();
      closeModal();
      render();
      LP.toast('已清空本机学习记录');
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
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
