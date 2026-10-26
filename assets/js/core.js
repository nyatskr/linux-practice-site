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

  /* 进度按「作用域」分键：未登录用 .guest，登录后按 Supabase 用户 ID 分开。
     同一台电脑换账号时，A 的记录不会被合并进 B。 */
  const KEY_PROGRESS = 'lp.progress.v1';
  const KEY_SESSION = 'lp.session.v1';
  const KEY_PREFS = 'lp.prefs.v1';

  let progressScope = 'guest';

  const progressKey = (scope) =>
    scope && scope !== 'guest' ? KEY_PROGRESS + '.user.' + scope : KEY_PROGRESS + '.guest';

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

    buildLearning();
  }

  /* ---------------- 学习小节与配套视频 ----------------
   * 数据来自 assets/js/resources.js（可选）。没有这个文件时，站点按原题库结构工作。
   * 小节只负责「排序」和「配套视频」，不改题号、不改 bank.js，进度记录因此不受影响。
   */

  const VIDEO_STATUS_LABEL = {
    candidate: '候选 · 待验收',
    verified: '已验收',
    main: '主视频',
    backup: '备用',
    dead: '失效待替换',
  };
  LP.VIDEO_STATUS_LABEL = VIDEO_STATUS_LABEL;

  const VIDEO_ROLE_LABEL = { main: '主视频', supplement: '补充', backup: '按需' };
  LP.VIDEO_ROLE_LABEL = VIDEO_ROLE_LABEL;

  /* 配套资料：视频（B 站 / YouTube / 抖音 / 小红书）+ 图文（知乎 / 博客 / 文档） */
  LP.KIND_LABEL = { video: '视频', article: '图文' };

  const PLATFORM_LABEL = {
    bilibili: 'B 站',
    youtube: 'YouTube',
    douyin: '抖音',
    xiaohongshu: '小红书',
    zhihu: '知乎',
    tencent: '腾讯云',
    csdn: 'CSDN',
    cnblogs: '博客园',
    web: '网页',
  };
  LP.PLATFORM_LABEL = PLATFORM_LABEL;
  LP.platformOf = (item) => PLATFORM_LABEL[item && item.platform] || (item && item.platform) || '网页';
  LP.kindOf = (item) => ((item && item.kind) || 'video');

  /* 角色标签按资料类型换词：图文不叫「主视频」 */
  LP.roleLabel = (item) => {
    const role = item && item.role;
    if (LP.kindOf(item) === 'article') {
      return { main: '主图文', supplement: '补充图文', backup: '按需' }[role] || '';
    }
    return VIDEO_ROLE_LABEL[role] || '';
  };

  LP.durationSec = (text) => {
    const parts = String(text || '').match(/\d+/g);
    if (!parts) return 0;
    return parts.reduce((acc, n) => acc * 60 + parseInt(n, 10), 0);
  };

  LP.fmtVideoTime = (sec) => {
    const s = Math.max(0, Math.round(sec || 0));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  };

  function buildLearning() {
    const src = window.LINUX_LEARNING;

    state.learning = null;
    state.lessonById = {};
    state.lessonsByTopic = {};
    state.lessonOfQid = {};
    state.videoById = {};
    state.learningIssues = [];

    state.topics.forEach((t) => {
      t.lessons = [];
      t.lessonCount = 0;
      t.studyQids = t.qids.slice();
    });

    if (!src || !Array.isArray(src.lessons) || !src.lessons.length) return;

    const issues = state.learningIssues;
    const videos = {};

    Object.keys(src.videos || {}).forEach((id) => {
      const v = Object.assign({ kind: 'video' }, src.videos[id] || {});
      videos[id] = Object.assign({ id }, v);
      if (!/^https?:\/\//i.test(v.url || '')) {
        issues.push({ kind: 'bad_video_url', video: id });
      }
      if (v.duration && !LP.durationSec(v.duration)) {
        issues.push({ kind: 'bad_video_duration', video: id });
      }
      if (v.kind !== 'article' && !LP.durationSec(v.duration)) {
        issues.push({ kind: 'unknown_video_duration', video: id });
      }
    });
    state.videoById = videos;

    const lessons = src.lessons
      .slice()
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));

    lessons.forEach((raw, i) => {
      const lid = String(raw.id || '');
      if (!lid) {
        issues.push({ kind: 'lesson_without_id' });
        return;
      }
      if (state.lessonById[lid]) {
        issues.push({ kind: 'duplicate_lesson', lesson: lid });
        return;
      }

      const topicId = String(raw.topic_id || '');
      const topic = state.topicById[topicId];
      if (!topic) issues.push({ kind: 'unknown_topic', lesson: lid, topic: topicId });

      const qids = [];
      (raw.question_ids || []).forEach((qid) => {
        const q = state.qById[qid];
        if (!q) {
          issues.push({ kind: 'unknown_qid', lesson: lid, qid });
          return;
        }
        if ((q.status || 'active') !== 'active') {
          issues.push({ kind: 'inactive_qid', lesson: lid, qid });
          return;
        }
        if (q.topic_id !== topicId) {
          issues.push({ kind: 'wrong_topic', lesson: lid, qid, actual: q.topic_id });
        }
        if (state.lessonOfQid[qid]) {
          issues.push({ kind: 'duplicate_qid', lesson: lid, qid, first: state.lessonOfQid[qid] });
          return;
        }
        qids.push(qid);
        state.lessonOfQid[qid] = lid;
      });

      if (!qids.length) issues.push({ kind: 'empty_lesson', lesson: lid });

      const videoIds = (raw.video_ids || []).filter((vid) => {
        if (!videos[vid]) {
          issues.push({ kind: 'unknown_video', lesson: lid, video: vid });
          return false;
        }
        return true;
      });
      if (!videoIds.length) issues.push({ kind: 'lesson_without_video', lesson: lid });

      const lesson = {
        id: lid,
        topic_id: topicId,
        title: raw.title || lid,
        qids,
        videos: videoIds.map((vid) => videos[vid]),
        coverage: raw.coverage || [],
        must_know: raw.must_know || [],
        search_terms: raw.search_terms || [],
        gaps: raw.gaps || '',
        order: i,
      };

      state.lessonById[lid] = lesson;
      if (!state.lessonsByTopic[topicId]) state.lessonsByTopic[topicId] = [];
      state.lessonsByTopic[topicId].push(lesson);
    });

    // 每个专题检查漏题，并生成「按学习顺序」的题号序列
    state.topics.forEach((t) => {
      const list = state.lessonsByTopic[t.id] || [];
      t.lessons = list;
      t.lessonCount = list.length;
      if (!list.length) return;

      const covered = [];
      list.forEach((l) => l.qids.forEach((qid) => covered.push(qid)));
      const missing = t.qids.filter((qid) => covered.indexOf(qid) < 0);
      missing.forEach((qid) => issues.push({ kind: 'missing_question', topic: t.id, qid }));
      t.studyQids = covered.concat(missing);
    });

    state.learning = src;
  }

  LP.learningEnabled = () => !!state.learning;
  LP.lessonOf = (qid) => (state.lessonOfQid[qid] ? state.lessonById[state.lessonOfQid[qid]] : null);
  LP.lessonsForTopic = (topicId) => state.lessonsByTopic[topicId] || [];
  LP.lessonStats = (lesson) => LP.statsFor(lesson.qids);
  LP.studyQids = (topicId) => {
    const t = state.topicById[topicId];
    return t ? t.studyQids.slice() : [];
  };
  LP.learningIssues = () => state.learningIssues;
  LP.lessonVideoMinutes = (lesson) =>
    (lesson.videos || [])
      .filter((v) => v.role !== 'backup')
      .reduce((acc, v) => acc + LP.durationSec(v.duration), 0);

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
      favoriteUpdatedAt: 0,
      needsReview: false,
      reviewUpdatedAt: 0,
    };
  }

  /* 把外部来源（导入文件 / 云端行）的记录补成完整形状，避免缺字段导致合并判错 */
  LP.normalizeRecord = (src) => {
    const rec = emptyRecord(src && src.qid ? String(src.qid) : '');
    if (!src) return rec;
    rec.bankVersion = src.bankVersion || rec.bankVersion;
    rec.selected = Array.isArray(src.selected) ? src.selected.slice() : [];
    rec.correct = !!src.correct;
    rec.answeredAt = Math.max(0, Number(src.answeredAt) || 0);
    rec.attempts = Math.max(0, Number(src.attempts) || 0);
    if (!rec.attempts && rec.answeredAt) rec.attempts = 1;
    rec.wrongCount = Math.max(0, Number(src.wrongCount) || 0);
    rec.favorite = !!src.favorite;
    rec.favoriteUpdatedAt = Math.max(0, Number(src.favoriteUpdatedAt) || 0);
    rec.needsReview = !!src.needsReview;
    rec.reviewUpdatedAt = Math.max(0, Number(src.reviewUpdatedAt) || 0);
    return rec;
  };

  /* 合并规则（导入与云同步共用）：
     作答取时间较新的一次；次数类取较大值；收藏 / 待复习取「最后修改时间」较新的一边。
     旧数据没有修改时间时退化为「只要有一边为真就保留」，与升级前的行为一致。 */
  LP.mergeInto = (cur, src) => {
    const rec = LP.normalizeRecord(src);
    if (rec.answeredAt > (cur.answeredAt || 0)) {
      cur.selected = rec.selected.slice();
      cur.correct = rec.correct;
      cur.answeredAt = rec.answeredAt;
      if (rec.bankVersion) cur.bankVersion = rec.bankVersion;
    }
    cur.attempts = Math.max(cur.attempts || 0, rec.attempts);
    cur.wrongCount = Math.max(cur.wrongCount || 0, rec.wrongCount);

    const fu = rec.favoriteUpdatedAt;
    const cu = cur.favoriteUpdatedAt || 0;
    if (fu > cu) {
      cur.favorite = rec.favorite;
      cur.favoriteUpdatedAt = fu;
    } else if (!fu && !cu && rec.favorite) {
      cur.favorite = true;
    }

    const ru = rec.reviewUpdatedAt;
    const cr = cur.reviewUpdatedAt || 0;
    if (ru > cr) {
      cur.needsReview = rec.needsReview;
      cur.reviewUpdatedAt = ru;
    } else if (!ru && !cr && rec.needsReview) {
      cur.needsReview = true;
    }

    return cur;
  };

  LP.getRecord = (qid) => state.progress.records[qid] || null;

  LP.ensureRecord = (qid) => {
    if (!state.progress.records[qid]) state.progress.records[qid] = emptyRecord(qid);
    return state.progress.records[qid];
  };

  LP.saveProgress = () => {
    state.progress.bankVersion = state.bank ? state.bank.bank_version : '';
    const ok = storageSet(progressKey(progressScope), JSON.stringify(state.progress));
    if (!ok) LP.warnStorage();
    /* 云同步是可选模块：没加载 cloud.js 时这个钩子什么也不做 */
    if (LP.cloud && typeof LP.cloud.queueSync === 'function') LP.cloud.queueSync();
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
    rec.favoriteUpdatedAt = Date.now();
    LP.saveProgress();
    return rec.favorite;
  };

  LP.toggleReview = (qid) => {
    const rec = LP.ensureRecord(qid);
    rec.needsReview = !rec.needsReview;
    rec.reviewUpdatedAt = Date.now();
    LP.saveProgress();
    return rec.needsReview;
  };

  const FLAG_STAMP = { favorite: 'favoriteUpdatedAt', needsReview: 'reviewUpdatedAt' };

  LP.clearRecordFlag = (qid, flag) => {
    const rec = state.progress.records[qid];
    if (!rec) return;
    rec[flag] = false;
    if (FLAG_STAMP[flag]) rec[FLAG_STAMP[flag]] = Date.now();
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

  /* 读取某个作用域的进度，不改变当前状态；读不到返回 null */
  function readProgressFor(scope) {
    const key = progressKey(scope);
    let raw = storageGet(key);
    if (raw == null && scope === 'guest') {
      /* 兼容升级前的单一存储键：旧记录原样当作本机（未登录）记录，旧键保留不删 */
      raw = storageGet(KEY_PROGRESS);
      if (raw != null) storageSet(key, raw);
    }
    if (raw == null) return null;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.records || typeof parsed.records !== 'object') return null;
      return { schema: 1, bankVersion: parsed.bankVersion || '', records: parsed.records };
    } catch (e) {
      console.warn('进度读取失败', e);
      return null;
    }
  }

  LP.readProgressFor = readProgressFor;
  LP.getProgressScope = () => progressScope;
  LP.progressKeyFor = progressKey;

  /* 列出本机缓存过的所有作用域（guest + 每个登录过的账号）及记录数。
     排查「同一台电脑登过两个账号」时用：每个账号的记录是分开存的，
     这里能直接看出哪一份有记录、各有多少条。 */
  LP.localScopeSummary = () => {
    const out = [];
    const count = (p) => {
      let active = 0;
      let total = 0;
      Object.keys(p.records).forEach((qid) => {
        const r = p.records[qid] || {};
        total++;
        if ((r.attempts || 0) > 0 || r.favorite || r.needsReview) active++;
      });
      return { active, total };
    };
    const add = (scope) => {
      const p = readProgressFor(scope);
      if (!p) return;
      const n = count(p);
      if (!n.total) return;
      out.push({
        scope,
        key: progressKey(scope),
        active: n.active,
        total: n.total,
        current: scope === progressScope,
      });
    };

    add('guest');
    const prefix = KEY_PROGRESS + '.user.';
    try {
      const keys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.indexOf(prefix) === 0) keys.push(k);
      }
      keys.sort().forEach((k) => add(k.slice(prefix.length)));
    } catch (e) {
      /* 隐私模式下枚举可能失败，只返回 guest */
    }
    return out;
  };

  /* 切换作用域（登录 / 退出时调用）。返回是否真的切换了。 */
  LP.setProgressScope = (scope) => {
    const next = scope && scope !== 'guest' ? String(scope) : 'guest';
    if (next === progressScope) return false;
    progressScope = next;
    state.progress = readProgressFor(next) || {
      schema: 1,
      bankVersion: state.bank ? state.bank.bank_version : '',
      records: {},
    };
    return true;
  };

  /* 只清当前作用域的本机记录；云端由 cloud.js 负责 */
  LP.resetProgress = () => {
    state.progress = {
      schema: 1,
      bankVersion: state.bank ? state.bank.bank_version : '',
      records: {},
    };
    LP.saveProgress();
  };

  LP.init = (bank) => {
    buildIndex(bank);

    progressScope = 'guest';
    state.progress = readProgressFor('guest') || {
      schema: 1,
      bankVersion: bank.bank_version,
      records: {},
    };

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
    schemaVersion: 2,
    bankVersion: state.bank.bank_version,
    exportedAt: new Date().toISOString(),
    records: LP.recordList().filter(
      (r) => r.attempts > 0 || r.favorite || r.needsReview || r.favoriteUpdatedAt > 0 || r.reviewUpdatedAt > 0
    ),
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
