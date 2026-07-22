/* ═══════════════════════════════════════════════════════════
   app.js — Minecraft Academy Web Shell
   ═══════════════════════════════════════════════════════════ */

/* ── State ─────────────────────────────────────────────── */
let currentLang    = 'uk';
let currentTrack   = '10-14'; // '8-10' | '10-14'
let currentLesson  = null;
let editor         = null;
window.voxelWorld  = null;

/* ── Helpers ───────────────────────────────────────────── */
function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[currentLang] || obj['uk'] || '';
}

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  buildNav();
  if (currentLesson) renderLesson(currentLesson);
}

function setTrack(track) {
  currentTrack = track;
  document.querySelectorAll('.track-btn').forEach(b => b.classList.toggle('active', b.dataset.track === track));
  buildNav();
  // open first lesson of new track
  const data = track === '8-10' ? LESSONS_STARTER : LESSONS_PYTHON;
  if (data.length) selectLesson(data[0].id);
}

/* ── Navigation ────────────────────────────────────────── */
function buildNav() {
  const nav  = document.getElementById('lesson-nav');
  const data = currentTrack === '8-10' ? LESSONS_STARTER : LESSONS_PYTHON;

  // Group by module (module may be a {uk,ru} object)
  const modules = {};
  data.forEach(l => {
    const m = t(l.module) || 'Загальне';
    if (!modules[m]) modules[m] = [];
    modules[m].push(l);
  });

  nav.innerHTML = Object.entries(modules).map(([modName, lessons]) => `
    <div class="module-group">
      <div class="module-header">
        <span class="mod-icon">${lessons[0].moduleIcon || '📦'}</span>
        <span>${modName}</span>
      </div>
      <div class="module-lessons">
        ${lessons.map(l => `
          <div class="lesson-item" id="nav-${l.id}" data-id="${l.id}" onclick="selectLesson('${l.id}')">
            <span class="lesson-num">${String(l.num).padStart(2,'0')}</span>${t(l.title)}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function selectLesson(id) {
  const data = currentTrack === '8-10' ? LESSONS_STARTER : LESSONS_PYTHON;
  const lesson = data.find(l => l.id === id);
  if (!lesson) return;
  currentLesson = lesson;

  // Update nav highlight
  document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) { navEl.classList.add('active'); navEl.scrollIntoView({ block: 'nearest' }); }

  renderLesson(lesson);
}

function renderLesson(lesson) {
  // Header
  document.getElementById('header-lesson-title').textContent =
    `${currentTrack === '8-10' ? '🟩' : '🐍'} Урок ${lesson.num}`;
  document.getElementById('header-lesson-sub').textContent = t(lesson.title);

  // Theory
  const theory = t(lesson.theory);
  document.getElementById('theory-content').innerHTML = theory || '<p>Теорія відсутня.</p>';

  // Tasks
  const tasks = lesson.tasks || [];
  document.getElementById('tasks-content').innerHTML = tasks.length
    ? tasks.map(task => `
        <div class="task-card">
          <div class="task-header">
            <span class="task-num">#${task.num}</span>
            <span class="task-level level-${task.level}">${levelLabel(task.level)}</span>
            ${task.starterCode ? `<button class="load-btn" onclick="loadTaskCode(${JSON.stringify(task.starterCode).replace(/</g,'&lt;')})">← Завантажити</button>` : ''}
          </div>
          <div class="task-text">${t(task.text)}</div>
        </div>
      `).join('')
    : '<p style="color:var(--text2)">Завдання відсутні.</p>';

  // Starter code in editor
  const code = lesson.starterCode || (currentTrack === '8-10' ? '' : '# Твій код тут\n');
  if (editor) editor.setValue(typeof code === 'object' ? (code[currentLang] || code.uk || '') : code);

  // Show/hide run button for starter track (no code runner)
  const isStarter = currentTrack === '8-10';
  document.getElementById('run-btn').style.display   = isStarter ? 'none' : '';
  document.getElementById('reset-btn').style.display = isStarter ? 'none' : '';
  document.getElementById('editor-wrapper').style.display = isStarter ? 'none' : '';
  document.querySelector('.world-section').style.display  = isStarter ? 'none' : '';
}

function levelLabel(l) {
  const map = { easy:'Легко', medium:'Середнє', hard:'Складно', extra:'★ Бонус' };
  return map[l] || l;
}

function loadTaskCode(code) {
  if (editor) editor.setValue(code);
  switchTab('theory'); // keep theory visible, just load code
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === tab + '-content'));
}

/* ── Skulpt Python runner ──────────────────────────────── */

// Singleton: built once after Skulpt loads, reused across all runs.
// Rebuilding $builtinmodule on each run creates new Skulpt class objects
// that are incompatible with the already-initialised Skulpt runtime.
let _mcpiDict = null;

function runCode() {
  const code = editor ? editor.getValue() : '';
  const out  = document.getElementById('text-output');
  out.innerHTML = '';
  if (window.voxelWorld) window.voxelWorld.clear();

  function addLine(text, cls) {
    const line = document.createElement('div');
    if (cls) line.className = cls;
    line.textContent = text;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  }

  window.mcpiChatCallback = (msg) => addLine('[Чат] ' + msg);

  // Lazy-build once; subsequent runs reuse the same Skulpt class objects
  if (!_mcpiDict) _mcpiDict = $builtinmodule('mcpi.minecraft');

  function injectMcpi() {
    try {
      if (!Sk.sysmodules || typeof Sk.sysmodules.mp$ass_subscript !== 'function') return;
      const m = new Sk.builtin.module();
      m.$d = _mcpiDict;
      // mcpi.block — exposes block constants as integers (block.STONE = 1 etc.)
      const blockMod = new Sk.builtin.module();
      blockMod.$d = _mcpiDict.block;
      const pkg = new Sk.builtin.module();
      pkg.$d = { minecraft: m, block: blockMod, __name__: new Sk.builtin.str('mcpi') };
      Sk.sysmodules.mp$ass_subscript(new Sk.builtin.str('mcpi.minecraft'), m);
      Sk.sysmodules.mp$ass_subscript(new Sk.builtin.str('mcpi.block'), blockMod);
      Sk.sysmodules.mp$ass_subscript(new Sk.builtin.str('mcpi'), pkg);
    } catch(e) {}
  }

  Sk.configure({
    output: (text) => addLine(text),
    read: (x) => {
      // Skulpt 1.x may call read with 'src/lib/' prefix — match by suffix
      if (x.endsWith('mcpi/__init__.py') || x.endsWith('mcpi/minecraft.py') || x.endsWith('mcpi/block.py')) {
        injectMcpi(); // inject whenever Skulpt touches any mcpi submodule
        return '';
      }
      if (Sk.builtinFiles && Sk.builtinFiles.files[x]) return Sk.builtinFiles.files[x];
      throw "File not found: '" + x + "'";
    },
    __future__: Sk.python3,
    execLimit: 15000,
  });

  // Pre-populate sysmodules before importMainWithBody so mcpi is already there.
  // importMainWithBody: Sk.sysmodules = Sk.sysmodules || new dict([]) — keeps our dict.
  if (!Sk.sysmodules || typeof Sk.sysmodules.mp$ass_subscript !== 'function') {
    Sk.sysmodules = new Sk.builtin.dict([]);
  }
  injectMcpi();

  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true))
    .catch(err => addLine('❌ ' + (err.toString ? err.toString() : String(err)), 'err'));
}

function resetCode() {
  if (!currentLesson) return;
  const code = currentLesson.starterCode || '# Твій код тут\n';
  if (editor) editor.setValue(typeof code === 'object' ? (code[currentLang] || code.uk || '') : code);
  if (window.voxelWorld) window.voxelWorld.clear();
  document.getElementById('text-output').innerHTML = '';
}

function clearOutput() {
  document.getElementById('text-output').innerHTML = '';
}

function resetCamera() {
  if (window.voxelWorld) window.voxelWorld.resetCamera();
}

/* ── Init ──────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  // CodeMirror editor
  editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'python', theme: 'dracula', lineNumbers: true,
    indentUnit: 4, tabSize: 4, indentWithTabs: false,
    extraKeys: { 'Ctrl-Enter': runCode, 'Cmd-Enter': runCode },
    lineWrapping: true,
  });

  // 3D Canvas
  const canvas = document.getElementById('voxel-canvas');
  function resizeCanvas() {
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    if (window.voxelWorld) { window.voxelWorld.centerX = canvas.width/2; window.voxelWorld.centerY = canvas.height/2; window.voxelWorld._render(); }
  }
  window.voxelWorld = new VoxelWorld(canvas);
  new ResizeObserver(resizeCanvas).observe(canvas);
  resizeCanvas();

  // Build navigation and open first lesson
  buildNav();
  const data = currentTrack === '8-10' ? LESSONS_STARTER : LESSONS_PYTHON;
  if (data.length) selectLesson(data[0].id);

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.addEventListener('click', () => switchTab(b.dataset.tab));
  });
});
