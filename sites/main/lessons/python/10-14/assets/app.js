/* ══════════════════════════════════════════════════════════
   Академія Мій комп'ютер — 10-14 — app.js
   ══════════════════════════════════════════════════════════ */

let currentLang = localStorage.getItem('academy14_lang') || 'uk';

const UI = {
  uk: {
    runBtn:         '▶ Запустити',
    runningBtn:     '⏹ Стоп',
    resetBtn:       '↺ Скинути',
    theoryTab:      '📖 Теорія',
    tasksTab:       '🎯 Завдання',
    editorLabel:    '⌨ Твій код',
    outputLabel:    '▶ Вивід',
    clearBtn:       '✕ Очистити',
    outputHint:     'натисни ▶ Запустити',
    outputHintLong: "Вивід з'явиться тут після натискання ▶ Запустити",
    statusOk:    'Готово ✓',
    statusRun:   'Виконується...',
    statusErr:   'Помилка',
    statusStop:  'Зупинено',
    easyBadge:   'Легко',
    mediumBadge: 'Середньо',
    hardBadge:   'Складно',
    starBadge:   '★ Зірочка',
    errName:     'Помилка імені: змінна або функція не визначена.',
    errSyntax:   'Синтаксична помилка: перевір дужки, двокрапки та відступи.',
    errIndent:   'Помилка відступу: перевір пробіли на початку рядка.',
    errType:     'Помилка типу: рядок/число несумісні.',
    errIndex:    'Помилка індексу: звертаєшся до елемента поза списком.',
    errKey:      'Помилка ключа: такого ключа немає в словнику.',
    errValue:    'Помилка значення: невірний формат або діапазон.',
    errAttr:     'Помилка атрибуту: у об\'єкта немає такого методу чи властивості.',
    errRecurse:  'Занадто багато рекурсії! Перевір умову виходу з функції.',
    errZeroDiv:  'На нуль ділити не можна!',
    errLimit:    'Час вийшов. Перевір умову циклу while.',
    errModule:   'Цей модуль не підтримується в браузері — запускай у VS Code.',
  },
  ru: {
    runBtn:         '▶ Запустить',
    runningBtn:     '⏹ Стоп',
    resetBtn:       '↺ Сбросить',
    theoryTab:      '📖 Теория',
    tasksTab:       '🎯 Задания',
    editorLabel:    '⌨ Твой код',
    outputLabel:    '▶ Вывод',
    clearBtn:       '✕ Очистить',
    outputHint:     'нажми ▶ Запустить',
    outputHintLong: 'Вывод появится здесь после нажатия ▶ Запустить',
    statusOk:    'Готово ✓',
    statusRun:   'Выполняется...',
    statusErr:   'Ошибка',
    statusStop:  'Остановлено',
    easyBadge:   'Легко',
    mediumBadge: 'Средне',
    hardBadge:   'Сложно',
    starBadge:   '★ Звёздочка',
    errName:     'Ошибка имени: переменная или функция не определена.',
    errSyntax:   'Синтаксическая ошибка: проверь скобки, двоеточия и отступы.',
    errIndent:   'Ошибка отступа: проверь пробелы в начале строки.',
    errType:     'Ошибка типа: строка/число несовместимы.',
    errIndex:    'Ошибка индекса: обращаешься к элементу вне списка.',
    errKey:      'Ошибка ключа: такого ключа нет в словаре.',
    errValue:    'Ошибка значения: неверный формат или диапазон.',
    errAttr:     'Ошибка атрибута: у объекта нет такого метода или свойства.',
    errRecurse:  'Слишком много рекурсии! Проверь условие выхода из функции.',
    errZeroDiv:  'Делить на ноль нельзя!',
    errLimit:    'Время вышло. Проверь условие цикла while.',
    errModule:   'Этот модуль не поддерживается в браузере — запускай в VS Code.',
  }
};

function T(k) { return (UI[currentLang] && UI[currentLang][k]) || UI.uk[k] || k; }

const $ = id => document.getElementById(id);
const $$ = s => document.querySelectorAll(s);

let editor = null;
let currentLesson = null;
let running = false;
let _userStopped = false;

document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  buildSidebar();
  initEditor();
  loadLesson(0, 0);
  initTabs();
});

// ── LANGUAGE ─────────────────────────────────────────────
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('academy14_lang', lang);
  applyLang();
  buildSidebar();
  if (currentLesson) loadLesson(currentLesson.mi, currentLesson.li);
  $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
}

function applyLang() {
  const map = {
    'run-btn': 'runBtn', 'reset-btn': 'resetBtn',
    'theory-tab': 'theoryTab', 'tasks-tab': 'tasksTab',
    'editor-label': 'editorLabel', 'output-label': 'outputLabel',
    'clear-output-btn': 'clearBtn',
  };
  for (const [id, key] of Object.entries(map)) {
    const el = $(id); if (el) el.textContent = T(key);
  }
  const out = $('text-output');
  if (out) out.dataset.placeholder = T('outputHintLong');
  $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
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
      btn.dataset.mi = mi; btn.dataset.li = li;
      btn.innerHTML = `<span class="lesson-num">${lesson.id}</span>${lesson.title[currentLang]}`;
      btn.addEventListener('click', () => loadLesson(mi, li));
      modDiv.appendChild(btn);
    });
    nav.appendChild(modDiv);
  });
  if (currentLesson) setActiveBtn(currentLesson.mi, currentLesson.li);
}

function setActiveBtn(mi, li) {
  $$('.lesson-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.lesson-btn[data-mi="${mi}"][data-li="${li}"]`);
  if (btn) { btn.classList.add('active'); btn.scrollIntoView({ block: 'nearest' }); }
}

// ── LOAD LESSON ───────────────────────────────────────────
function loadLesson(mi, li) {
  const mod = LESSONS_DATA[mi];
  const lesson = mod.lessons[li];
  currentLesson = { mi, li, lesson };
  setActiveBtn(mi, li);

  $('header-lesson-title').textContent = `${mod.moduleIcon} Урок ${lesson.id}: ${lesson.title[currentLang]}`;
  $('header-lesson-sub').textContent = mod.moduleTitle[currentLang];

  $('theory-content').innerHTML = lesson.theory[currentLang] || lesson.theory.uk;
  renderTasks(lesson.tasks);

  if (editor) {
    editor.setValue(lesson.starterCode || '');
    editor.clearHistory();
    setTimeout(() => editor.refresh(), 50);
  }

  clearOutput();
  setStatus(T('outputHint'), '');
  switchTab('theory');
}

function renderTasks(tasks) {
  const lm = { easy: T('easyBadge'), medium: T('mediumBadge'), hard: T('hardBadge'), star: T('starBadge') };
  $('tasks-content').innerHTML = `<ul class="tasks-list">${
    tasks.map(t => `
      <li class="task-item">
        <div class="task-header">
          <div class="task-num ${t.level}">${t.num}</div>
          <span class="task-badge ${t.level}">${lm[t.level]}</span>
        </div>
        <div class="task-text">${t.text[currentLang] || t.text.uk}</div>
      </li>`).join('')
  }</ul>`;
}

// ── TABS ──────────────────────────────────────────────────
function initTabs() {
  $$('.tab-btn').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
}
function switchTab(tab) {
  $$('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $$('.tab-content').forEach(c => c.classList.toggle('active', c.id === tab + '-content'));
}

// ── EDITOR ────────────────────────────────────────────────
function initEditor() {
  editor = CodeMirror.fromTextArea($('code-editor'), {
    mode: 'python', theme: 'dracula',
    lineNumbers: true, indentUnit: 4, tabSize: 4, indentWithTabs: false,
    extraKeys: { 'Tab': cm => cm.replaceSelection('    '), 'Ctrl-Enter': runCode, 'F5': runCode },
    autofocus: true, lineWrapping: false,
  });
  editor.setSize('100%', '100%');
}

// ── RUN CODE ──────────────────────────────────────────────
function runCode() {
  if (running) { stopCode(); return; }
  const code = editor.getValue();
  if (!code.trim()) return;

  _userStopped = false;
  if (typeof Sk !== 'undefined') Sk.execLimit = 30000;

  running = true;
  const btn = $('run-btn');
  btn.textContent = T('runningBtn');
  btn.classList.add('running');
  btn.onclick = stopCode;

  setStatus(T('statusRun'), 'running');
  clearOutput();

  Sk.configure({
    output: txt => {
      const out = $('text-output');
      out.classList.remove('has-error');
      out.textContent += txt;
      out.scrollTop = out.scrollHeight;
    },
    read: x => {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
        throw "File not found: '" + x + "'";
      return Sk.builtinFiles['files'][x];
    },
    __future__: Sk.python3,
    execLimit: 30000,
    inputfun: p => window.prompt(p || ''),
  });

  Sk.misceval.asyncToPromise(() =>
    Sk.importMainWithBody('<stdin>', false, code, true)
  ).then(() => {
    if (_userStopped) return;
    setStatus(T('statusOk'), 'ok');
    doneRunning();
  }).catch(err => {
    if (_userStopped) return;
    setStatus(T('statusErr'), 'error');
    const msg = err.toString();
    const out = $('text-output');
    out.classList.add('has-error');
    out.textContent = '⚠ ' + friendlyError(msg);
    doneRunning();
  });
}

function stopCode() {
  _userStopped = true;
  if (typeof Sk !== 'undefined') Sk.execLimit = 1;
  setStatus(T('statusStop'), '');
  doneRunning();
}

function doneRunning() {
  running = false;
  const btn = $('run-btn');
  btn.classList.remove('running');
  btn.textContent = T('runBtn');
  btn.onclick = runCode;
}

function friendlyError(msg) {
  if (msg.includes('NameError'))        return T('errName');
  if (msg.includes('SyntaxError'))      return T('errSyntax');
  if (msg.includes('IndentationError')) return T('errIndent');
  if (msg.includes('TypeError'))        return T('errType');
  if (msg.includes('IndexError'))       return T('errIndex');
  if (msg.includes('KeyError'))         return T('errKey');
  if (msg.includes('ValueError'))       return T('errValue');
  if (msg.includes('AttributeError'))   return T('errAttr');
  if (msg.includes('RecursionError') || msg.includes('maximum recursion')) return T('errRecurse');
  if (msg.includes('ZeroDivision'))     return T('errZeroDiv');
  if (msg.includes('execLimit'))        return T('errLimit');
  if (msg.includes('ImportError') || msg.includes('No module named') || msg.includes('ModuleNotFoundError')) return T('errModule');
  return msg.replace(/^.*Error:\s*/, '');
}

function clearOutput() {
  const out = $('text-output');
  out.classList.remove('has-error');
  out.textContent = '';
}

function setStatus(text, type) {
  const el = $('output-status');
  el.textContent = text;
  el.className = 'output-status ' + type;
}

document.addEventListener('keydown', e => {
  if ((e.ctrlKey && e.key === 'Enter') || e.key === 'F5') { e.preventDefault(); runCode(); }
});
