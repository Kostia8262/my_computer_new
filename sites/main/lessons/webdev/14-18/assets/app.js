/* ═══════════════════════════════════════════════════════════
   Web Academy — app.js  (спільний для всіх трьох оболонок)
   Очікує WEB_LESSONS[] та WEB_META{} з файлу lessons.js
   ═══════════════════════════════════════════════════════════ */
'use strict';

let currentIdx  = 0;
let currentLang = 'uk';
let cmHtml, cmCss, cmJs, cmPython;
let refreshTimer;

/* ── CodeMirror ──────────────────────────────────────────── */
function initEditors() {
  const base = { theme:'one-dark', lineNumbers:true, autoCloseBrackets:true,
                 matchBrackets:true, lineWrapping:true, tabSize:2 };
  cmHtml   = CodeMirror.fromTextArea(document.getElementById('cm-html'),
               { ...base, mode:'htmlmixed', autoCloseTags:true });
  cmCss    = CodeMirror.fromTextArea(document.getElementById('cm-css'),
               { ...base, mode:'css' });
  cmJs     = CodeMirror.fromTextArea(document.getElementById('cm-js'),
               { ...base, mode:'javascript' });
  cmPython = CodeMirror.fromTextArea(document.getElementById('cm-python'),
               { ...base, mode:'python' });
  [cmHtml, cmCss, cmJs].forEach(cm => cm.on('change', scheduleRefresh));
}

/* ── Preview ─────────────────────────────────────────────── */
function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(refreshPreview, 700);
}
function runCode() {
  clearTimeout(refreshTimer);
  const l = WEB_LESSONS[currentIdx];
  if (l && l.type === 'python') { runPythonDemo(l); showToast('▶ Запущено!'); return; }
  refreshPreview();
  showToast('▶ Запущено!');
}

function refreshPreview() {
  const l = WEB_LESSONS[currentIdx];
  if (l && l.type === 'python') return;
  document.getElementById('preview-frame').srcdoc =
    buildDoc(cmHtml.getValue(), cmCss.getValue(), cmJs.getValue());
}

/* Немає реального виконання Python (ні Skulpt, ні Pyodide) — main.py лишається
   текстом для читання й копіювання на свій комп'ютер. Якщо в уроці заданий
   starterCode.js, це чесна JS-симуляція (fakeFlask/fakeDjango): та сама логіка
   роутингу/серіалізації, виконана в браузері, з кнопками й логом у terminal-mock. */
function runPythonDemo(l) {
  const out = document.getElementById('terminal-out');
  out.textContent = l.terminalOutput || '$ python main.py\n * Running on http://127.0.0.1:5000/';
  const oldWrap = document.getElementById('python-demo-wrap');
  if (oldWrap) oldWrap.remove();
  if (l.starterCode && l.starterCode.js) {
    const wrap = document.createElement('div');
    wrap.id = 'python-demo-wrap';
    document.getElementById('terminal-mock').appendChild(wrap);
    try {
      const runDemo = new Function('demoRoot', 'termOut', l.starterCode.js);
      runDemo(wrap, out);
    } catch (e) {
      console.error('Python demo error:', e);
    }
  }
}

function buildDoc(html, css, js) {
  if (/<!doctype\s+html/i.test(html)) {
    let d = html;
    if (css) d = d.replace('</head>', `<style>${css}</style>\n</head>`);
    if (js)  d = d.replace('</body>', `<script>${js}<\/script>\n</body>`);
    return d;
  }
  return `<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:'Segoe UI',system-ui,sans-serif;margin:0;padding:16px}${css}</style>
</head><body>${html}<script>${js}<\/script></body></html>`;
}

function openNewTab() {
  const blob = new Blob(
    [buildDoc(cmHtml.getValue(), cmCss.getValue(), cmJs.getValue())],
    { type:'text/html' });
  window.open(URL.createObjectURL(blob));
}

function resetCode() {
  const l = WEB_LESSONS[currentIdx];
  if (!l) return;
  if (l.type === 'python') { cmPython.setValue(l.starterCode.python || ''); }
  else {
    cmHtml.setValue(l.starterCode.html || '');
    cmCss.setValue(l.starterCode.css   || '');
    cmJs.setValue(l.starterCode.js     || '');
    refreshPreview();
  }
  showToast('↺ Код скинуто');
}

/* ── Lesson ──────────────────────────────────────────────── */
function loadLesson(idx) {
  if (idx < 0 || idx >= WEB_LESSONS.length) return;
  currentIdx = idx;
  const l = WEB_LESSONS[idx];

  document.getElementById('lesson-num-badge').textContent = String(l.num).padStart(2,'0');
  document.getElementById('lesson-module-label').textContent = l.moduleLabel[currentLang];
  document.getElementById('lesson-title').textContent = l.title[currentLang];
  document.getElementById('lesson-counter').textContent = `Урок ${l.num} / ${WEB_LESSONS.length}`;

  const theoryHtml = l.theory && l.theory[currentLang];
  document.getElementById('panel-theory').innerHTML = theoryHtml
    ? theoryHtml
    : '<p style="color:#94a3b8;font-style:italic;font-size:13px">Теорію буде додано.</p>';
  if (l.quiz) {
    document.getElementById('panel-theory').innerHTML += buildQuizHtml(l.quiz[currentLang] || l.quiz.uk, currentLang);
  }

  const LEVEL = { easy:'Легко', medium:'Середньо', hard:'Складно', extra:'Бонус' };
  document.getElementById('panel-tasks').innerHTML = l.tasks && l.tasks.length
    ? `<div class="tasks-list">${l.tasks.map((t,i) => `
        <div class="task-card">
          <div class="task-num">${i+1}</div>
          <div class="task-body">
            <span class="task-level ${t.level}">${LEVEL[t.level]||t.level}</span>
            <div class="task-text">${t[currentLang]}</div>
          </div>
        </div>`).join('')}</div>`
    : '<p style="color:#94a3b8;font-style:italic;font-size:13px">Завдання буде додано.</p>';

  if (l.type === 'welcome') { activateWelcomeMode(); }
  else { deactivateWelcomeMode(); if (l.type === 'python') activatePythonMode(l); else activateWebMode(l); }

  document.querySelectorAll('.nav-lesson').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.idx) === idx);
  });
  const act = document.querySelector('.nav-lesson.active');
  if (act) act.scrollIntoView({ block:'nearest', behavior:'smooth' });

  document.getElementById('prev-btn').disabled = idx === 0;
  document.getElementById('next-btn').textContent =
    idx === WEB_LESSONS.length - 1 ? 'Завершити ✓' : 'Наступний →';
}

function activateWebMode(l) {
  ['html','css','js'].forEach(f => document.querySelector(`[data-file="${f}"]`).classList.remove('hidden'));
  document.querySelector('[data-file="python"]').classList.add('hidden');
  cmHtml.setValue(l.starterCode.html || '');
  cmCss.setValue(l.starterCode.css   || '');
  cmJs.setValue(l.starterCode.js     || '');
  switchFileTab('html');
  document.getElementById('preview-frame').classList.remove('hidden');
  document.getElementById('terminal-mock').classList.add('hidden');
  refreshPreview();
}

function activateWelcomeMode() {
  document.querySelector('.app-layout').classList.add('welcome-mode');
  document.querySelector('[data-panel="tasks"]').classList.add('hidden');
  document.getElementById('lesson-num-badge').textContent = '★';
  document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel-inner').forEach(p => p.classList.remove('active'));
  document.querySelector('[data-panel="theory"]').classList.add('active');
  document.getElementById('panel-theory').classList.add('active');
}

function deactivateWelcomeMode() {
  document.querySelector('.app-layout').classList.remove('welcome-mode');
  document.querySelector('[data-panel="tasks"]').classList.remove('hidden');
}

function activatePythonMode(l) {
  ['html','css','js'].forEach(f => document.querySelector(`[data-file="${f}"]`).classList.add('hidden'));
  document.querySelector('[data-file="python"]').classList.remove('hidden');
  cmPython.setValue(l.starterCode.python || '# код тут');
  switchFileTab('python');
  document.getElementById('preview-frame').classList.add('hidden');
  document.getElementById('terminal-mock').classList.remove('hidden');
  runPythonDemo(l);
}

function switchFileTab(file) {
  document.querySelectorAll('.file-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.file === file));
  document.querySelectorAll('.editor-pane').forEach(p =>
    p.classList.toggle('active', p.id === `pane-${file}`));
  const cm = { html:cmHtml, css:cmCss, js:cmJs, python:cmPython }[file];
  if (cm) setTimeout(() => cm.refresh(), 10);
}

/* ── Navigation ──────────────────────────────────────────── */
function goLesson(delta) {
  const next = currentIdx + delta;
  if (next >= 0 && next < WEB_LESSONS.length) loadLesson(next);
}

/* ── Sidebar ─────────────────────────────────────────────── */
function buildNav() {
  const nav = document.getElementById('lesson-nav');
  nav.innerHTML = '';
  let lastMod = null, wrap = null;

  WEB_LESSONS.forEach((l, idx) => {
    if (l.module !== lastMod) {
      lastMod = l.module;
      const grp  = document.createElement('div');
      grp.className = 'nav-module';
      const head = document.createElement('div');
      head.className = 'nav-module-header';
      head.innerHTML = `<span class="mod-icon">${l.moduleIcon}</span>
        <span>${l.moduleLabel[currentLang]}</span>
        <span class="mod-chevron">▼</span>`;
      wrap = document.createElement('div');
      wrap.className = 'nav-module-lessons';
      head.addEventListener('click', () => {
        head.nextElementSibling.classList.toggle('hidden');
        head.classList.toggle('collapsed');
      });
      grp.appendChild(head); grp.appendChild(wrap); nav.appendChild(grp);
    }
    const item = document.createElement('div');
    item.className = 'nav-lesson' + (l.isProject ? ' is-project' : '');
    item.dataset.idx = idx;
    item.innerHTML = `<span class="nav-lesson-num">${String(l.num).padStart(2,'0')}</span>
      <span class="nav-lesson-text">${l.title[currentLang]}</span>`;
    item.addEventListener('click', () => loadLesson(idx));
    wrap.appendChild(item);
  });
}

/* ── Language ────────────────────────────────────────────── */
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang));
  document.getElementById('sidebar-track-name').textContent =
    `${WEB_META.name[lang]} · ${WEB_META.age}`;
  buildNav(); loadLesson(currentIdx);
}

/* ── Quiz ────────────────────────────────────────────────── */
function buildQuizHtml(questions, lang) {
  if (!questions || !questions.length) return '';
  var title = lang === 'ru' ? '🧠 Проверь себя!' : '🧠 Перевір себе!';
  var html = '<div class="quiz-wrap"><div class="quiz-title">' + title + '</div><div class="quiz-list">';
  questions.forEach(function(item, i) {
    html += '<div class="quiz-item">';
    html += '<button class="quiz-q" onclick="var a=this.nextElementSibling;this.classList.toggle(\'open\');a.classList.toggle(\'quiz-a--open\')">';
    html += '<span class="quiz-num">' + (i + 1) + '</span>';
    html += '<span class="quiz-qtext">' + item.q + '</span>';
    html += '<span class="quiz-arr">▼</span>';
    html += '</button>';
    html += '<div class="quiz-a">' + item.a + '</div>';
    html += '</div>';
  });
  html += '</div></div>';
  return html;
}

/* ── Helpers ─────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.add('hidden'), 2000);
}

/* ── Bootstrap ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initEditors();

  document.querySelectorAll('.lang-btn').forEach(b =>
    b.addEventListener('click', () => setLang(b.dataset.lang)));

  document.querySelectorAll('.content-tab').forEach(tab =>
    tab.addEventListener('click', () => {
      document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.panel-inner').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel-${tab.dataset.panel}`).classList.add('active');
    }));

  document.getElementById('file-tabs').addEventListener('click', e => {
    const btn = e.target.closest('.file-tab');
    if (btn && !btn.classList.contains('hidden')) switchFileTab(btn.dataset.file);
  });

  document.getElementById('sidebar-track-name').textContent =
    `${WEB_META.name[currentLang]} · ${WEB_META.age}`;

  buildNav();
  loadLesson(0);
});
