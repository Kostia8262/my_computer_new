/* ══════════════════════════════════════════════════════════
   Академія Мій комп'ютер — app.js
   ══════════════════════════════════════════════════════════ */

// ── Мова / Language ───────────────────────────────────────
let currentLang = localStorage.getItem('academy_lang') || 'uk';

const UI = {
  uk: {
    lessonWord:    'Урок',
    runBtn:        '✅ Перевірити код',
    runningBtn:    '⏹ Стоп',
    resetBtn:      '↺ Скинути',
    clearBtn:      '🗑 Очистити',
    theoryTab:     '📖 Теорія',
    tasksTab:      '🎯 Завдання',
    editorLabel:   '⌨ Твій код',
    canvasLabel:   '💻 Візуалізація коду',
    canvasHint:    'натисни ✅ Перевірити код',
    placeholderT:  'Тут з\'явиться результат',
    placeholderS:  'коли ти натиснеш <strong>✅ Перевірити код</strong>',
    statusOk:      'Готово ✓',
    statusRun:     'Виконується...',
    statusErr:     'Помилка',
    statusStop:    'Зупинено',
    loading:       'завантажується...',
    easyBadge:     'Легко',
    mediumBadge:   'Середньо',
    hardBadge:     'Складно',
    starBadge:     '★ Зірочка',
    errName:       'Помилка імені: змінна або функція не визначена.',
    errSyntax:     'Синтаксична помилка: перевір дужки, двокрапки та відступи.',
    errIndent:     'Помилка відступу: перевір пробіли на початку рядка.',
    errType:       'Помилка типу: ти передаєш рядок туди де потрібне число (або навпаки).',
    errIndex:      'Помилка індексу: ти звертаєшся до елемента, якого немає у списку.',
    errZeroDiv:    'На нуль ділити не можна!',
    errLimit:      'Час вийшов. Можливо у тебе нескінченний цикл — перевір умову while.',
  },
  ru: {
    lessonWord:    'Урок',
    runBtn:        '✅ Проверить код',
    runningBtn:    '⏹ Стоп',
    resetBtn:      '↺ Сбросить',
    clearBtn:      '🗑 Очистить',
    theoryTab:     '📖 Теория',
    tasksTab:      '🎯 Задания',
    editorLabel:   '⌨ Твой код',
    canvasLabel:   '💻 Визуализация кода',
    canvasHint:    'нажми ✅ Проверить код',
    placeholderT:  'Здесь появится результат',
    placeholderS:  'когда ты нажмёшь <strong>✅ Проверить код</strong>',
    statusOk:      'Готово ✓',
    statusRun:     'Выполняется...',
    statusErr:     'Ошибка',
    statusStop:    'Остановлено',
    loading:       'загружается...',
    easyBadge:     'Легко',
    mediumBadge:   'Средне',
    hardBadge:     'Сложно',
    starBadge:     '★ Звёздочка',
    errName:       'Ошибка имени: переменная или функция не определена.',
    errSyntax:     'Синтаксическая ошибка: проверь скобки, двоеточия и отступы.',
    errIndent:     'Ошибка отступа: проверь пробелы в начале строки.',
    errType:       'Ошибка типа: ты передаёшь строку туда, где нужно число (или наоборот).',
    errIndex:      'Ошибка индекса: ты обращаешься к элементу, которого нет в списке.',
    errZeroDiv:    'Делить на ноль нельзя!',
    errLimit:      'Время вышло. Возможно у тебя бесконечный цикл — проверь условие while.',
  }
};

function T(key) {
  return (UI[currentLang] && UI[currentLang][key]) || UI.uk[key] || key;
}

// ── DOM refs ──────────────────────────────────────────────
const $  = (id)  => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

// ── State ─────────────────────────────────────────────────
let editor             = null;
let currentLesson      = null;
let skulptReady        = false;
let activeTab          = 'theory';
let _runStartTimeoutId = 0;   // baseline setTimeout ID for this run
let _userStopped       = false;
let _pendingResetTimer = null; // setTimeout ID for delayed canvas reset

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  initLoader();
  buildSidebar();
  initEditor();
  loadLesson(0, 0);
  initSplitter();
  initTabs();
});

// ── LANGUAGE ──────────────────────────────────────────────
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('academy_lang', lang);
  applyLang();
  buildSidebar();
  if (currentLesson) loadLesson(currentLesson.mi, currentLesson.li);
  updateLangButtons();
}

function applyLang() {
  // Static UI strings
  const map = {
    'run-btn':       'runBtn',
    'reset-btn':     'resetBtn',
    'clear-btn':     'clearBtn',
    'theory-tab':    'theoryTab',
    'tasks-tab':     'tasksTab',
    'editor-label':  'editorLabel',
    'canvas-label-text': 'canvasLabel',
  };
  for (const [id, key] of Object.entries(map)) {
    const el = $(id);
    if (el) el.textContent = T(key);
  }
  const hint = $('canvas-status');
  if (hint && (hint.textContent === UI.uk.canvasHint || hint.textContent === UI.ru.canvasHint)) {
    hint.textContent = T('canvasHint');
  }
  const phT = $('ph-title');
  const phS = $('ph-sub');
  if (phT) phT.textContent = T('placeholderT');
  if (phS) phS.innerHTML  = T('placeholderS');

  const loaderText = $('loader-text');
  if (loaderText) loaderText.textContent = T('loading');

  updateLangButtons();
}

function updateLangButtons() {
  $$('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

// ── LOADER ────────────────────────────────────────────────
function initLoader() {
  // Check immediately if Skulpt is already available (local files load fast)
  const delay = (typeof Sk !== 'undefined') ? 300 : 1500;
  setTimeout(() => {
    const loader = $('skulpt-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.4s';
      setTimeout(() => loader.remove(), 400);
    }
    skulptReady = (typeof Sk !== 'undefined');
    if (!skulptReady) {
      console.error('Skulpt not loaded!');
    }
  }, delay);
}

// ── SIDEBAR ───────────────────────────────────────────────
function buildSidebar() {
  const nav = $('lesson-nav');
  nav.innerHTML = '';

  LESSONS_DATA.forEach((mod, mi) => {
    const modDiv = document.createElement('div');
    modDiv.className = 'sidebar-module';
    modDiv.innerHTML = `<div class="module-title">${mod.moduleIcon} ${mod.moduleTitle[currentLang]}</div>`;

    mod.lessons.forEach((lesson, li) => {
      const btn = document.createElement('button');
      btn.className = 'lesson-btn';
      btn.dataset.mi = mi;
      btn.dataset.li = li;
      btn.innerHTML = `<span class="lesson-num">${lesson.id}</span>${lesson.title[currentLang]}`;
      btn.addEventListener('click', () => loadLesson(mi, li));
      modDiv.appendChild(btn);
    });

    nav.appendChild(modDiv);
  });

  if (currentLesson) setActiveNavBtn(currentLesson.mi, currentLesson.li);
}

function setActiveNavBtn(mi, li) {
  $$('.lesson-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.lesson-btn[data-mi="${mi}"][data-li="${li}"]`);
  if (btn) btn.classList.add('active');
}

// ── LESSON LOAD ───────────────────────────────────────────
function loadLesson(mi, li) {
  const mod    = LESSONS_DATA[mi];
  const lesson = mod.lessons[li];
  currentLesson = { mi, li, lesson };

  setActiveNavBtn(mi, li);

  // Header
  $('header-lesson-title').textContent = `${mod.moduleIcon} ${T('lessonWord') || 'Урок'} ${lesson.id}: ${lesson.title[currentLang]}`;
  $('header-lesson-sub').textContent   = mod.moduleTitle[currentLang];

  // Theory + tasks
  $('theory-content').innerHTML = lesson.theory[currentLang] || lesson.theory.uk;
  renderTasks(lesson.tasks);

  // Canvas panel visibility
  const canvasPanel      = $('canvas-panel');
  const splitter         = $('splitter');
  const turtleContainer  = $('turtle-output-container');
  const canvasToolbar    = canvasPanel.querySelector('.canvas-toolbar');
  if (lesson.canvasMode) {
    canvasPanel.style.display     = '';
    canvasPanel.style.height      = '390px';
    splitter.style.display        = '';
    turtleContainer.style.display = '';
    if (canvasToolbar) canvasToolbar.style.display = '';
    $('editor-wrapper').style.height = '220px';
    $('text-output').style.display = 'none';
  } else {
    // Show output area (for print/errors) but hide the turtle canvas
    canvasPanel.style.display     = '';
    canvasPanel.style.height      = 'auto';
    splitter.style.display        = 'none';
    turtleContainer.style.display = 'none';
    if (canvasToolbar) canvasToolbar.style.display = 'none';
    $('editor-wrapper').style.height = '75%';
    $('text-output').style.display = '';
  }

  // Editor
  if (editor) {
    editor.setValue(lesson.starterCode);
    editor.clearHistory();
    setTimeout(() => editor.refresh(), 50);
  }

  resetCanvas();
  clearOutput();
  setStatus(T('canvasHint'), '');
  switchTab('theory');
}

function renderTasks(tasks) {
  const labelMap = {
    easy:   T('easyBadge'),
    medium: T('mediumBadge'),
    hard:   T('hardBadge'),
    star:   T('starBadge'),
  };

  $('tasks-content').innerHTML = `<ul class="tasks-list">${
    tasks.map(task => `
      <li class="task-item">
        <div class="task-header">
          <div class="task-num ${task.level}">${task.num}</div>
          <span class="task-badge ${task.level}">${labelMap[task.level]}</span>
        </div>
        <div class="task-text">${task.text[currentLang] || task.text.uk}</div>
      </li>
    `).join('')
  }</ul>`;
}

// ── TABS ──────────────────────────────────────────────────
function initTabs() {
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tabName) {
  activeTab = tabName;
  $$('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
  $$('.tab-content').forEach(c => c.classList.toggle('active', c.id === tabName + '-content'));
}

// ── CODEMIRROR EDITOR ─────────────────────────────────────
function initEditor() {
  editor = CodeMirror.fromTextArea($('code-editor'), {
    mode:           'python',
    theme:          'dracula',
    lineNumbers:    true,
    indentUnit:     4,
    tabSize:        4,
    indentWithTabs: false,
    extraKeys: {
      'Tab':        (cm) => cm.replaceSelection('    '),
      'Ctrl-Enter': runCode,
      'F5':         runCode,
    },
    autofocus:    true,
    lineWrapping: false,
  });
  editor.setSize('100%', '100%');
}

// ── RUN CODE ──────────────────────────────────────────────
function runCode() {
  if (!skulptReady) { setStatus(T('statusRun'), 'running'); return; }

  const code = editor.getValue();
  if (!code.trim()) return;

  // Cancel any delayed canvas reset from a previous Stop/Clear call.
  // Without this, the timer fires mid-run and destroys the new canvas.
  if (_pendingResetTimer !== null) {
    clearTimeout(_pendingResetTimer);
    _pendingResetTimer = null;
  }

  // Always restore execution state before a new run.
  _userStopped = false;
  if (typeof Sk !== 'undefined') Sk.execLimit = 30000;

  const runBtn = $('run-btn');
  runBtn.textContent = T('runningBtn');
  runBtn.classList.add('running');
  runBtn.onclick = stopCode;

  setStatus(T('statusRun'), 'running');
  clearOutput();
  resetCanvas(false);

  Sk.configure({
    output:     handleOutput,
    read:       skReadFile,
    __future__: Sk.python3,
    execLimit:  30000,
    inputfun:   (prompt) => window.prompt(prompt || ''),
  });

  const canvasContainer = $('turtle-output-container');
  $('turtle-placeholder').style.display = 'none';
  Sk.TurtleGraphics = { target: canvasContainer, width: 540, height: 320, mode: 'standard' };

  // Record baseline setTimeout ID. stopCode cancels all IDs above this.
  _runStartTimeoutId = setTimeout(() => {}, 0);
  clearTimeout(_runStartTimeoutId);

  Sk.misceval.asyncToPromise(() =>
    Sk.importMainWithBody('<stdin>', false, code, true)
  ).then(() => {
    if (_userStopped) return;
    setStatus(T('statusOk'), 'ok');
    doneRunning();
  }).catch((err) => {
    if (_userStopped) return;
    const msg = err ? err.toString() : '';
    setStatus(T('statusErr'), 'error');
    showError(friendlyError(msg));
    doneRunning();
  });
}

function cancelTurtleTimers() {
  _userStopped = true;
  // Cancel all setTimeout callbacks created since the run started.
  // This kills turtle.ontimer game loops.
  const currentId = setTimeout(() => {}, 0);
  clearTimeout(currentId);
  for (let i = _runStartTimeoutId; i <= currentId; i++) {
    clearTimeout(i);
  }
  if (typeof Sk !== 'undefined') {
    // Force Skulpt to fail fast if it wakes via a Promise microtask.
    Sk.execLimit = 1;
    // Redirect Skulpt's turtle target to an invisible detached div.
    // Without this, Skulpt keeps its canvas reference and re-appends it after
    // we call resetCanvas(), which is why a second Clear was needed.
    Sk.TurtleGraphics = { target: document.createElement('div'), width: 1, height: 1 };
  }
}

function scheduleCanvasReset(showPlaceholder) {
  // Create the timer AFTER cancelTurtleTimers() runs, so its ID is above
  // the cancelled range and won't be swept up on next cancelTurtleTimers().
  // runCode() cancels this via _pendingResetTimer before starting a new run.
  if (_pendingResetTimer !== null) { clearTimeout(_pendingResetTimer); _pendingResetTimer = null; }
  _pendingResetTimer = setTimeout(() => {
    _pendingResetTimer = null;
    resetCanvas(showPlaceholder);
  }, 0);
}

function stopCode() {
  cancelTurtleTimers();
  scheduleCanvasReset(false); // deferred so Skulpt microtasks finish first
  clearOutput();
  setStatus(T('statusStop'), '');
  doneRunning();
}

function doneRunning() {
  const runBtn = $('run-btn');
  runBtn.classList.remove('running');
  runBtn.textContent = T('runBtn');
  runBtn.onclick = runCode;
}

function handleOutput(text) {
  const out = $('text-output');
  out.classList.remove('has-error');
  out.textContent += text;
  out.scrollTop = out.scrollHeight;
}

function showError(msg) {
  const out = $('text-output');
  out.classList.add('has-error');
  out.textContent = '⚠ ' + msg;
}

function clearOutput() {
  const out = $('text-output');
  out.classList.remove('has-error');
  out.textContent = '';
}

function skReadFile(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles['files'][x];
}

function friendlyError(msg) {
  if (msg.includes('NameError'))       return T('errName');
  if (msg.includes('SyntaxError'))     return T('errSyntax');
  if (msg.includes('IndentationError'))return T('errIndent');
  if (msg.includes('TypeError'))       return T('errType');
  if (msg.includes('IndexError'))      return T('errIndex');
  if (msg.includes('ZeroDivision'))    return T('errZeroDiv');
  if (msg.includes('execLimit'))       return T('errLimit');
  return msg.replace(/^.*Error:\s*/, '');
}

// ── CANVAS HELPERS ────────────────────────────────────────
function resetCanvas(showPh = true) {
  const container = $('turtle-output-container');
  const old = container.querySelector('canvas');
  if (old) old.remove();
  $('turtle-placeholder').style.display = showPh ? 'flex' : 'none';
}

function clearCanvas() {
  cancelTurtleTimers();
  // Cancel any pending deferred reset and do it immediately for instant response
  if (_pendingResetTimer !== null) { clearTimeout(_pendingResetTimer); _pendingResetTimer = null; }
  resetCanvas(true);
  clearOutput();
  setStatus(T('canvasHint'), '');
  doneRunning();
}

function setStatus(text, type) {
  const el = $('canvas-status');
  el.textContent = text;
  el.className   = 'canvas-status ' + type;
}

// ── SPLITTER ──────────────────────────────────────────────
function initSplitter() {
  const splitter   = $('splitter');
  const editorWrap = $('editor-wrapper');
  const canvasPan  = $('canvas-panel');

  let dragging = false, startY, startEH, startCH;

  splitter.addEventListener('mousedown', e => {
    dragging  = true;
    startY    = e.clientY;
    startEH   = editorWrap.offsetHeight;
    startCH   = canvasPan.offsetHeight;
    document.body.style.cursor     = 'ns-resize';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dy = e.clientY - startY;
    editorWrap.style.height = Math.max(100, startEH + dy) + 'px';
    canvasPan.style.height  = Math.max(100, startCH - dy) + 'px';
    editor.refresh();
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor     = '';
    document.body.style.userSelect = '';
  });
}

// ── KEYBOARD ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if ((e.ctrlKey && e.key === 'Enter') || e.key === 'F5') {
    e.preventDefault();
    runCode();
  }
});
