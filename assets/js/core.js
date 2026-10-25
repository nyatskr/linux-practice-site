/* core.js — 题库索引、进度存储、判分与通用工具 */
(function () {
  'use strict';

  const LP = (window.LP = window.LP || {});

  /* ---------------- 基础工具 ---------------- */

  const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  LP.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC_MAP[c]);
  LP.isAscii = (s) => /^[\x20-\x7E]+$/.test(String(s || ''));
  /* 命令/参数/路径才用等宽：纯英文单词（如发行版名）按普通字体显示更好读 */
  LP.isCommand = (s) => {
    const t = String(s || '');
    if (!/^[\x20-\x7E]+$/.test(t)) return false;
    if (t.length >= 16) return true;
    return /[\s/\-=_|>]/.test(t);
  };
  LP.clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  LP.uid = () => 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  LP.pct = (n) => (n == null ? '—' : Math.round(n * 100) + '%');

  LP.fmtClock = (sec) => {
    sec = Math.max(0, Math.round(sec));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ':' + String(s).padStart(2, '0');
  };

  LP.fmtDuration = (ms) => {
    const sec = Math.max(0, Math.round(ms / 1000));
    if (sec < 60) return sec + ' 秒';
    const m = Math.floor(sec / 60);
    if (m < 60) return m + ' 分 ' + (sec % 60) + ' 秒';
    return Math.floor(m / 60) + ' 小时 ' + (m % 60) + ' 分';
  };

  LP.fmtDate = (ts) => {
    if (!ts) return '—';
    const d = new Date(ts);
    const p = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
      ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  };

  /* ---------------- 本地存储（含降级） ---------------- */

  const KEY_PROGRESS = 'lp.progress.v1';
  const KEY_SESSION = 'lp.session.v1';
  const KEY_PREFS = 'lp.prefs.v1';

  const memStore = {};
  let storageOK = true;

  function storageGet(key) {
    try {
      const v = window.localStorage.getItem(key);
      return v == null ? null : v;
    } catch (e) {
      storageOK = false;
      return Object.prototype.hasOwnProperty.call(memStore, key) ? memStore[key] : null;
    }
  }

  function storageSet(key, value) {
    memStore[key] = value;
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (e) {
      storageOK = false;
      return false;
    }
  }

  LP.storageOK = () => storageOK;
  LP.storageTest = () => {
    try {
      const k = '__lp_test__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  };

  /* ---------------- 状态 ---------------- */

  const state = (LP.state = {
    bank: null,
    topics: [],
    topicById: {},
    qById: {},
    sources: {},
    progress: { schema: 1, bankVersion: '', records: {} },
    session: null,
    prefs: { examCount: 20, examMinutes: 20, examTopics: [] },
  });

  /* ---------------- 索引构建 ---------------- */

  function buildIndex(bank) {
    const qById = {};
    bank.questions.forEach((q, i) => {
      q.__order = i;
      qById[q.id] = q;
    });

    // 停用题保留在 qById 中供历史记录使用，但不进入练习与抽题
    const activeQuestions = bank.questions.filter((q) => (q.status || 'active') === 'active');

    const topics = bank.topics.map((t) => {
      const qs = activeQuestions
        .filter((q) => q.topic_id === t.id)
        .slice()
        .sort((a, b) => (a.cluster_order - b.cluster_order) || (a.__order - b.__order));

      const clusters = [];
      const cmap = new Map();
      qs.forEach((q) => {
        let c = cmap.get(q.cluster);
        if (!c) {
          c = { name: q.cluster, order: q.cluster_order, qids: [], kps: [], kmap: new Map() };
          cmap.set(q.cluster, c);
          clusters.push(c);
        }
        c.qids.push(q.id);
        let k = c.kmap.get(q.knowledge_point);
        if (!k) {
          k = { name: q.knowledge_point, qids: [] };
          c.kmap.set(q.knowledge_point, k);
          c.kps.push(k);
        }
        k.qids.push(q.id);
      });

      return {
        id: t.id,
        title: t.title,
        num: t.id,
        questions: qs,
        qids: qs.map((q) => q.id),
        clusters,
        singleCount: qs.filter((q) => q.type === 'single').length,
        multipleCount: qs.filter((q) => q.type === 'multiple').length,
      };
    });

    state.bank = bank;
    state.qById = qById;
    state.activeQuestions = activeQuestions;
    state.sources = bank.sources || {};
    state.topics = topics;
    state.topicById = {};
    topics.forEach((t) => (state.topicById[t.id] = t));
  }

  /* ---------------- 进度记录 ---------------- */

  function emptyRecord(qid) {
    return {
      qid,
      bankVersion: state.bank ? state.bank.bank_version : '',
      selected: [],
      correct: false,
      answeredAt: 0,
      attempts: 0,
      wrongCount: 0,
      favorite: false,
      needsReview: false,
    };
  }

  LP.getRecord = (qid) => state.progress.records[qid] || null;

  LP.ensureRecord = (qid) => {
    if (!state.progress.records[qid]) state.progress.records[qid] = emptyRecord(qid);
    return state.progress.records[qid];
  };

  LP.saveProgress = () => {
    state.progress.bankVersion = state.bank ? state.bank.bank_version : '';
    const ok = storageSet(KEY_PROGRESS, JSON.stringify(state.progress));
    if (!ok) LP.warnStorage();
    return ok;
  };

  LP.applyAnswer = (qid, selected, correct) => {
    const rec = LP.ensureRecord(qid);
    rec.selected = selected.slice();
    rec.correct = !!correct;
    rec.answeredAt = Date.now();
    rec.attempts = (rec.attempts || 0) + 1;
    if (!correct) rec.wrongCount = (rec.wrongCount || 0) + 1;
    rec.bankVersion = state.bank.bank_version;
    LP.saveProgress();
    return rec;
  };

  LP.toggleFavorite = (qid) => {
    const rec = LP.ensureRecord(qid);
    rec.favorite = !rec.favorite;
    LP.saveProgress();
    return rec.favorite;
  };

  LP.toggleReview = (qid) => {
    const rec = LP.ensureRecord(qid);
    rec.needsReview = !rec.needsReview;
    LP.saveProgress();
    return rec.needsReview;
  };

  LP.clearRecordFlag = (qid, flag) => {
    const rec = state.progress.records[qid];
    if (!rec) return;
    rec[flag] = false;
    LP.saveProgress();
  };

  LP.recordList = () => Object.values(state.progress.records);

  LP.wrongIds = () =>
    LP.recordList()
      .filter((r) => r.attempts > 0 && !r.correct)
      .sort((a, b) => b.answeredAt - a.answeredAt)
      .map((r) => r.qid)
      .filter((id) => state.qById[id]);

  LP.reviewIds = () =>
    LP.recordList()
      .filter((r) => r.needsReview)
      .sort((a, b) => (b.answeredAt || 0) - (a.answeredAt || 0))
      .map((r) => r.qid)
      .filter((id) => state.qById[id]);

  LP.favoriteIds = () =>
    LP.recordList()
      .filter((r) => r.favorite)
      .sort((a, b) => (b.answeredAt || 0) - (a.answeredAt || 0))
      .map((r) => r.qid)
      .filter((id) => state.qById[id]);

  /* ---------------- 统计 ---------------- */

  LP.statsFor = (qids) => {
    let done = 0, correct = 0, mastered = 0, weak = 0, wrongTotal = 0;
    qids.forEach((qid) => {
      const r = state.progress.records[qid];
      if (!r || !r.attempts) return;
      done++;
      if (r.correct) {
        correct++;
        if (!r.wrongCount) mastered++;
      } else {
        weak++;
      }
      wrongTotal += r.wrongCount || 0;
    });
    return {
      total: qids.length,
      done,
      correct,
      mastered,
      weak,
      wrongTotal,
      rate: done ? correct / done : null,
      coverage: qids.length ? done / qids.length : 0,
    };
  };

  LP.topicStats = (topic) => LP.statsFor(topic.qids);

  LP.globalStats = () => LP.statsFor(state.activeQuestions.map((q) => q.id));

  /* ---------------- 判分 ---------------- */

  LP.isCorrect = (question, selectedIds) => {
    const selected = new Set(selectedIds || []);
    const valid = new Set(question.options.map((o) => o.id));
    for (const id of selected) if (!valid.has(id)) return false;
    if (question.type === 'single' && selected.size !== 1) return false;
    const expected = new Set(question.answer);
    if (selected.size !== expected.size) return false;
    for (const id of expected) if (!selected.has(id)) return false;
    return true;
  };

  /* ---------------- 文案映射 ---------------- */

  LP.PROVENANCE_LABEL = {
    legacy_adapted: '旧备赛题改编',
    competition_fragment_adapted: '实操片段改编',
    user_material_adapted: '个人材料改编',
    prediction: '新编预测练习',
  };

  LP.SOURCE_KIND_LABEL = {
    official_or_upstream: '官方文档',
    legacy_practice: '旧题资料',
    competition_fragment: '赛题片段',
    third_party: '第三方',
  };

  LP.statusOf = (qid) => {
    const r = state.progress.records[qid];
    if (!r || !r.attempts) return 'new';
    if (r.correct && !r.wrongCount) return 'mastered';
    if (r.correct) return 'shaky';
    return 'weak';
  };

  LP.STATUS_LABEL = { new: '未做', mastered: '已掌握', shaky: '待巩固', weak: '薄弱' };

  /* ---------------- Toast ---------------- */

  let toastTimer = null;
  LP.toast = (msg, kind) => {
    let el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      document.body.appendChild(el);
    }
    el.className = 'toast show' + (kind ? ' ' + kind : '');
    el.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.className = 'toast';
    }, 2600);
  };

  let warned = false;
  LP.warnStorage = () => {
    if (warned) return;
    warned = true;
    LP.toast('浏览器禁止写入本地存储，进度只保存在本次会话中', 'warn');
  };

  /* ---------------- 初始化 / 序列化 ---------------- */

  LP.init = (bank) => {
    buildIndex(bank);

    try {
      const raw = storageGet(KEY_PROGRESS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.records && typeof parsed.records === 'object') {
          state.progress = { schema: 1, bankVersion: parsed.bankVersion || '', records: parsed.records };
        }
      }
    } catch (e) {
      console.warn('进度读取失败', e);
    }

    try {
      const raw = storageGet(KEY_SESSION);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && Array.isArray(s.qids) && s.qids.length) state.session = s;
      }
    } catch (e) {
      console.warn('会话读取失败', e);
    }

    try {
      const raw = storageGet(KEY_PREFS);
      if (raw) Object.assign(state.prefs, JSON.parse(raw));
    } catch (e) { /* 忽略 */ }
  };

  LP.saveSession = () => {
    if (!state.session) {
      try { window.localStorage.removeItem(KEY_SESSION); } catch (e) { /* 忽略 */ }
      return;
    }
    storageSet(KEY_SESSION, JSON.stringify(state.session));
  };

  LP.clearSession = () => {
    state.session = null;
    try { window.localStorage.removeItem(KEY_SESSION); } catch (e) { /* 忽略 */ }
  };

  LP.savePrefs = () => storageSet(KEY_PREFS, JSON.stringify(state.prefs));

  /* 导出结构 */
  LP.exportPayload = () => ({
    kind: 'linux-practice-progress',
    schemaVersion: 1,
    bankVersion: state.bank.bank_version,
    exportedAt: new Date().toISOString(),
    records: LP.recordList().filter((r) => r.attempts > 0 || r.favorite || r.needsReview),
  });

  LP.progressSummary = () => {
    const s = LP.globalStats();
    return {
      done: s.done,
      total: s.total,
      rate: s.rate,
      mastered: s.mastered,
      weak: s.weak,
      favorites: LP.favoriteIds().length,
      review: LP.reviewIds().length,
    };
  };
})();
