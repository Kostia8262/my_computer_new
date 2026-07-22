/* ══════════════════════════════════════════════════════════
   Академія Мій комп'ютер — 14-18 — app.js
   ══════════════════════════════════════════════════════════ */

let currentLang = localStorage.getItem('academy1418_lang') || 'uk';

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
    starBadge:   '★ Проект',
    loadCode:    '⌨ завантажити код',
    errName:     'Помилка імені: змінна або функція не визначена.',
    errSyntax:   'Синтаксична помилка: перевір дужки, двокрапки та відступи.',
    errIndent:   'Помилка відступу: перевір пробіли на початку рядка.',
    errType:     'Помилка типу: рядок/число несумісні.',
    errIndex:    'Помилка індексу: звертаєшся до елемента поза списком.',
    errKey:      'Помилка ключа: такого ключа немає в словнику.',
    errValue:    'Помилка значення: невірний формат або діапазон.',
    errAttr:     "Помилка атрибуту: у об'єкта немає такого методу чи властивості.",
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
    starBadge:   '★ Проект',
    loadCode:    '⌨ загрузить код',
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

// ── DATA ACCESSORS — підтримка обох форматів (старий titleUk/Ru і новий title:{uk,ru}) ──

function getModuleTitle(mod) {
  if (mod.moduleTitle) return mod.moduleTitle[currentLang] || mod.moduleTitle.uk;
  return currentLang === 'uk' ? (mod.moduleTitleUk || '') : (mod.moduleTitleRu || mod.moduleTitleUk || '');
}

function getLessonTitle(lesson) {
  if (lesson.title) return lesson.title[currentLang] || lesson.title.uk;
  return currentLang === 'uk' ? (lesson.titleUk || '') : (lesson.titleRu || lesson.titleUk || '');
}

function getLessonTheory(lesson) {
  if (lesson.theory && typeof lesson.theory === 'object') return lesson.theory[currentLang] || lesson.theory.uk;
  return (currentLang === 'ru' && lesson.theoryRu) ? lesson.theoryRu : (lesson.theory || '');
}

function getTaskText(t) {
  if (t.text) return t.text[currentLang] || t.text.uk;
  return currentLang === 'uk' ? (t.textUk || '') : (t.textRu || t.textUk || '');
}

function getTaskLevel(t) {
  if (t.level) return t.level;
  const lv = t.levelUk || '';
  if (lv.includes('★')) return 'star';
  if (lv === 'Складно') return 'hard';
  if (lv === 'Середньо') return 'medium';
  return 'easy';
}

function getTaskNum(t) { return t.num !== undefined ? t.num : t.id; }

function getLessonStarterCode(lesson) {
  if (lesson.starterCode) return lesson.starterCode;
  if (lesson.tasks && lesson.tasks[0]) return lesson.tasks[0].starterCode || '';
  return '';
}

// ─────────────────────────────────────────────────────────

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
  localStorage.setItem('academy1418_lang', lang);
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
    modDiv.innerHTML = `<div class="module-title">${mod.moduleIcon} ${getModuleTitle(mod)}</div>`;
    mod.lessons.forEach((lesson, li) => {
      const btn = document.createElement('button');
      btn.className = 'lesson-btn';
      btn.dataset.mi = mi; btn.dataset.li = li;
      btn.innerHTML = `<span class="lesson-num">${lesson.id}</span>${getLessonTitle(lesson)}`;
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

  $('header-lesson-title').textContent = `${mod.moduleIcon} Урок ${lesson.id}: ${getLessonTitle(lesson)}`;
  $('header-lesson-sub').textContent = getModuleTitle(mod);

  $('theory-content').innerHTML = getLessonTheory(lesson);
  renderTasks(lesson.tasks);

  if (editor) {
    editor.setValue(getLessonStarterCode(lesson));
    editor.clearHistory();
    setTimeout(() => editor.refresh(), 50);
  }

  clearOutput();
  setStatus(T('outputHint'), '');
  switchTab('theory');
}

function resetCode() {
  if (editor && currentLesson) editor.setValue(getLessonStarterCode(currentLesson.lesson));
}

function renderTasks(tasks) {
  const lm = { easy: T('easyBadge'), medium: T('mediumBadge'), hard: T('hardBadge'), star: T('starBadge') };
  const ul = document.createElement('ul');
  ul.className = 'tasks-list';

  tasks.forEach(t => {
    const level = getTaskLevel(t);
    const num   = getTaskNum(t);
    const text  = getTaskText(t);
    const code  = t.starterCode || null;

    const li = document.createElement('li');
    li.className = 'task-item' + (code ? ' has-code' : '');
    li.innerHTML = `
      <div class="task-header">
        <div class="task-num ${level}">${num}</div>
        <span class="task-badge ${level}">${lm[level]}</span>
        ${code ? `<span class="task-load-hint">${T('loadCode')}</span>` : ''}
      </div>
      <div class="task-text">${text}</div>
    `;
    if (code) {
      li.addEventListener('click', () => {
        if (editor) { editor.setValue(code); editor.clearHistory(); }
        $$('.task-item').forEach(el => el.classList.remove('active-task'));
        li.classList.add('active-task');
      });
    }
    ul.appendChild(li);
  });

  $('tasks-content').innerHTML = '';
  $('tasks-content').appendChild(ul);
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
