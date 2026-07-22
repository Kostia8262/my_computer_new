/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 02 — CSS3 Майстерність · 10–14 Веб-Розробник
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function patch(id, theory, html, css, js, tasks) {
    const l = WEB_LESSONS.find(x => x.id === id);
    if (!l) return;
    l.theory = theory;
    l.starterCode.html = html;
    l.starterCode.css  = css;
    l.starterCode.js   = js;
    l.tasks = tasks;
  }

  const BASE = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f1f5f9;padding:20px}
h2{font-size:18px;font-weight:700;margin-bottom:12px;color:#fff}
h3{font-size:12px;color:#64748b;margin-bottom:8px;letter-spacing:.03em;text-transform:uppercase}
p{font-size:13px;color:#94a3b8;line-height:1.65;margin-bottom:10px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
button:hover{border-color:#3b82f6;color:#93c5fd}
input,textarea,select{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:9px 12px;border-radius:8px;font-size:13px;font-family:inherit;transition:.2s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.15)}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}`;

  /* ─── 02-01 ──────────────────────────────────────────────── */
  patch('02-01',
    { uk:`<h2>Специфічність і каскад CSS</h2>
<p>Каскад — алгоритм, за яким браузер вирішує яке правило виграє при конфлікті. Три чинники по порядку важливості:</p>
<ol>
  <li><strong>!important</strong> — ядерна зброя (майже ніколи)</li>
  <li><strong>Специфічність</strong> — вага селектора</li>
  <li><strong>Порядок</strong> — останнє правило перемагає при рівній вазі</li>
</ol>
<h3>Розрахунок специфічності: (A, B, C)</h3>
<pre>A = кількість #id
B = кількість .class, [attr], :псевдокласів
C = кількість тегів і ::псевдоелементів

#header .nav a:hover
  A=1    B=2   C=1  → (1,2,1)</pre>
<h3>Вага у числах</h3>
<pre>style=""          → 1000
#id               →  100
.class / [attr]   →   10
tag / ::element   →    1
* (universal)     →    0</pre>
<h3>Що перемагає?</h3>
<pre>p { color: red; }         /* (0,0,1) */
.text { color: blue; }    /* (0,1,0) ← виграє */
#main p { color: green; } /* (1,0,1) ← виграє */</pre>
<h3>Поради</h3>
<ul>
  <li>❌ Уникай !important — ламає каскад</li>
  <li>❌ Не пиши #id у CSS — нескасовна висока специфічність</li>
  <li>✅ BEM і класи — всі правила рівної ваги, каскад передбачуваний</li>
</ul>`,
      ru:`<h2>Специфичность и каскад CSS</h2>
<pre>A = количество #id
B = количество .class, [attr], :псевдоклассов
C = количество тегов и ::псевдоэлементов

#header .nav a:hover → (1,2,1)</pre>
<h3>Вес в числах</h3>
<pre>style=""     → 1000
#id          →  100
.class/[attr]→   10
tag          →    1</pre>
<h3>Что выигрывает?</h3>
<pre>p { color: red; }         /* (0,0,1) */
.text { color: blue; }    /* (0,1,0) ← выигрывает */
#main p { color: green; } /* (1,0,1) ← выигрывает */</pre>` },
    `<div class="spec-lab">
  <h2>⚡ Specificity Wars</h2>

  <div class="battles">
    <!-- Раунд 1 -->
    <div class="battle">
      <div class="battle-title">Раунд 1</div>
      <div class="battle-arena">
        <div class="fighter">
          <code>p</code>
          <div class="spec-badge">(0,0,1)</div>
          <div class="spec-score">1</div>
        </div>
        <div class="vs">VS</div>
        <div class="fighter">
          <code>.text</code>
          <div class="spec-badge">(0,1,0)</div>
          <div class="spec-score">10</div>
        </div>
      </div>
      <div class="battle-result">
        <div class="result-box r1">Я синій (.text виграє)</div>
      </div>
    </div>

    <!-- Раунд 2 -->
    <div class="battle">
      <div class="battle-title">Раунд 2</div>
      <div class="battle-arena">
        <div class="fighter">
          <code>.a .b .c</code>
          <div class="spec-badge">(0,3,0)</div>
          <div class="spec-score">30</div>
        </div>
        <div class="vs">VS</div>
        <div class="fighter">
          <code>#main</code>
          <div class="spec-badge">(1,0,0)</div>
          <div class="spec-score">100</div>
        </div>
      </div>
      <div class="battle-result">
        <div class="result-box r2">Я зелений (#main виграє)</div>
      </div>
    </div>
  </div>

  <!-- Калькулятор специфічності -->
  <div class="calc-wrap">
    <h3>Калькулятор специфічності</h3>
    <div class="calc-input">
      <input type="text" id="sel-input" value="#header .nav > a:hover" placeholder="Введи CSS-селектор...">
      <button onclick="calcSpec()">Розрахувати</button>
    </div>
    <div class="calc-result" id="calc-result">
      <div class="cr-tuple" id="cr-tuple">(?,?,?)</div>
      <div class="cr-score" id="cr-score">?</div>
      <div class="cr-breakdown" id="cr-breakdown"></div>
    </div>
  </div>
</div>`,
    `${BASE}
.spec-lab{max-width:560px}
.battles{display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.battle{flex:1;min-width:220px;background:#1e293b;border-radius:12px;padding:14px}
.battle-title{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:10px;font-weight:700}
.battle-arena{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.fighter{display:flex;flex-direction:column;align-items:center;gap:4px}
.fighter code{font-size:12px;background:#0f172a;padding:4px 8px;border-radius:6px;border:1px solid #334155;color:#7dd3fc}
.spec-badge{font-size:10px;color:#64748b}
.spec-score{font-size:20px;font-weight:900;color:#f1f5f9}
.vs{font-size:12px;font-weight:700;color:#475569}
.battle-result{text-align:center}
.result-box{display:inline-block;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600}
.r1{background:#1d4ed8;color:#fff}
.r2{background:#166534;color:#fff}

.calc-wrap{background:#1e293b;border-radius:12px;padding:14px}
.calc-input{display:flex;gap:8px;margin-bottom:12px}
.calc-input input{flex:1;margin:0;padding:8px 12px;font-family:monospace;font-size:13px}
.calc-result{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.cr-tuple{font-size:22px;font-weight:900;font-family:monospace;color:#3b82f6}
.cr-score{font-size:14px;color:#64748b;font-variant-numeric:tabular-nums}
.cr-breakdown{font-size:12px;color:#94a3b8;flex:1;line-height:1.7}`,
    `function calcSpec() {
  const sel = document.getElementById('sel-input').value.trim();
  let A = 0, B = 0, C = 0;
  const breakdown = [];

  // Видаляємо рядки у лапках та контент псевдоелементів
  let s = sel.replace(/::(before|after|first-line|first-letter|selection|placeholder)/g, m => { C++; breakdown.push(m + ' → +C'); return ''; });

  // IDs
  const ids = (s.match(/#[\\w-]+/g)||[]);
  ids.forEach(m => { A++; breakdown.push(m + ' → +A(100)'); });
  s = s.replace(/#[\\w-]+/g, '');

  // Classes, attrs, pseudo-classes (крім :not, :is, :where, :has)
  const complexPseudo = s.match(/:(not|is|has|where)\\([^)]*\\)/g)||[];
  complexPseudo.forEach(m => {
    const inner = m.replace(/^:(not|is|has|where)\\(|\\)$/g,'');
    breakdown.push(m + ' → (inner specificity of "' + inner + '")');
  });
  s = s.replace(/:(not|is|has|where)\\([^)]*\\)/g, '');

  const classes = (s.match(/\\.[\w-]+|\\[\\w[^\\]]*\\]|:[\\w-]+/g)||[]);
  classes.forEach(m => { B++; breakdown.push(m + ' → +B(10)'); });
  s = s.replace(/\\.[\w-]+|\\[\\w[^\\]]*\\]|:[\\w-]+/g,'');

  // Tags (залишились після видалення вище)
  const tags = (s.match(/[a-zA-Z][\\w-]*/g)||[]);
  tags.forEach(m => { if(m && m!=='*') { C++; breakdown.push(m + ' → +C(1)'); } });

  const score = A*100 + B*10 + C;
  document.getElementById('cr-tuple').textContent = '(' + A + ',' + B + ',' + C + ')';
  document.getElementById('cr-score').textContent = 'Числове значення: ' + score;
  document.getElementById('cr-breakdown').innerHTML = breakdown.map(b => '• ' + b).join('<br>') || '• (порожній селектор)';
}
calcSpec();`,
    [
      { level:'easy',   uk:'Розрахуй специфічність: ul.menu > li:first-child a. Що таке (A,B,C)?',  ru:'Рассчитай специфичность: ul.menu > li:first-child a. Что такое (A,B,C)?' },
      { level:'medium', uk:'Спробуй ввести [data-theme="dark"] .card + p::before — поясни кожну частину.',  ru:'Попробуй ввести [data-theme="dark"] .card + p::before — объясни каждую часть.' },
      { level:'hard',   uk:'Введи :is(h1, h2, h3).title — чому :is() бере специфічність найважчого аргументу? Що буде з :where()?',  ru:'Введи :is(h1, h2, h3).title — почему :is() берёт специфичность наибольшего аргумента? Что будет с :where()?' },
    ]
  );

  /* ─── 02-02 ──────────────────────────────────────────────── */
  patch('02-02',
    { uk:`<h2>box-shadow та filter: складні тіні та ефекти</h2>
<h3>box-shadow — синтаксис</h3>
<pre>box-shadow: [inset] X Y Blur Spread Color;

/* Кілька тіней через кому: */
box-shadow:
  0 4px 6px rgba(0,0,0,.3),
  0 10px 30px rgba(0,0,0,.2),
  inset 0 1px 0 rgba(255,255,255,.1);</pre>
<ul>
  <li><code>inset</code> — тінь всередину</li>
  <li><code>X, Y</code> — зміщення</li>
  <li><code>Blur</code> — розмиття</li>
  <li><code>Spread</code> — розширення (від'ємне = стискання)</li>
</ul>
<h3>filter — CSS-фільтри</h3>
<pre>filter: blur(4px);
filter: brightness(1.2);
filter: contrast(1.5);
filter: grayscale(1);
filter: hue-rotate(90deg);
filter: saturate(2);
filter: drop-shadow(2px 4px 8px #000);
filter: blur(2px) brightness(.8); /* комбінація */</pre>
<h3>backdrop-filter</h3>
<pre>/* Матове скло: */
backdrop-filter: blur(12px) saturate(1.5);
background: rgba(255,255,255,.1);
border: 1px solid rgba(255,255,255,.2);</pre>`,
      ru:`<h2>box-shadow и filter</h2>
<pre>box-shadow: [inset] X Y Blur Spread Color;

box-shadow:
  0 4px 6px rgba(0,0,0,.3),
  0 10px 30px rgba(0,0,0,.2);</pre>
<h3>filter</h3>
<pre>filter: blur(4px);
filter: brightness(1.2);
filter: grayscale(1);
filter: hue-rotate(90deg);
filter: drop-shadow(2px 4px 8px #000);</pre>
<h3>backdrop-filter (матовое стекло)</h3>
<pre>backdrop-filter: blur(12px) saturate(1.5);
background: rgba(255,255,255,.1);</pre>` },
    `<div class="fx-lab">
  <h2>✨ Shadows & Filters Lab</h2>

  <div class="demo-grid">
    <!-- Box-shadow живий редактор -->
    <div class="panel">
      <h3>box-shadow</h3>
      <div class="shadow-preview" id="shadow-preview">
        <div class="shadow-box" id="shadow-box">Hover me</div>
      </div>
      <div class="controls">
        <label>X <span id="sx-val">0</span>px <input type="range" id="sx" min="-40" max="40" value="0"></label>
        <label>Y <span id="sy-val">6</span>px <input type="range" id="sy" min="-40" max="40" value="6"></label>
        <label>Blur <span id="sbl-val">20</span>px <input type="range" id="sbl" min="0" max="80" value="20"></label>
        <label>Spread <span id="ssp-val">0</span>px <input type="range" id="ssp" min="-20" max="20" value="0"></label>
        <label>Color <input type="color" id="sc" value="#3b82f6"></label>
        <label>Alpha <span id="sa-val">50</span>% <input type="range" id="sa" min="0" max="100" value="50"></label>
        <label><input type="checkbox" id="sinset"> inset</label>
      </div>
      <pre class="output" id="shadow-out"></pre>
    </div>

    <!-- Filter живий редактор -->
    <div class="panel">
      <h3>filter</h3>
      <div class="filter-preview">
        <div class="filter-target" id="filter-target">🌆 🎨 🌊</div>
      </div>
      <div class="controls">
        <label>blur <span id="f-blur-v">0</span>px <input type="range" id="f-blur" min="0" max="20" value="0"></label>
        <label>brightness <span id="f-br-v">1.0</span> <input type="range" id="f-br" min="0" max="3" step=".1" value="1"></label>
        <label>contrast <span id="f-co-v">1.0</span> <input type="range" id="f-co" min="0" max="3" step=".1" value="1"></label>
        <label>saturate <span id="f-sa-v">1.0</span> <input type="range" id="f-sa" min="0" max="4" step=".1" value="1"></label>
        <label>hue-rotate <span id="f-hr-v">0</span>° <input type="range" id="f-hr" min="0" max="360" value="0"></label>
        <label>grayscale <span id="f-gs-v">0</span>% <input type="range" id="f-gs" min="0" max="100" value="0"></label>
      </div>
      <pre class="output" id="filter-out"></pre>
    </div>
  </div>

  <!-- Glassmorphism demo -->
  <div class="glass-demo">
    <div class="glass-bg">🏔️ 🌊 🌸 🏙️</div>
    <div class="glass-card" id="glass-card">
      <div class="gc-title">Glassmorphism</div>
      <div class="gc-sub">backdrop-filter: blur(12px)</div>
      <label>Blur <input type="range" id="g-blur" min="0" max="30" value="12" oninput="updateGlass(this.value)"></label>
    </div>
  </div>
</div>`,
    `${BASE}
.fx-lab{max-width:580px}
.demo-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.panel{background:#1e293b;border-radius:12px;padding:14px}
.panel h3{font-size:11px;text-transform:uppercase;color:#3b82f6;margin-bottom:10px;letter-spacing:.5px}
.shadow-preview{height:100px;background:#0f172a;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
.shadow-box{width:80px;height:60px;background:#334155;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#94a3b8;cursor:pointer;transition:.3s}
.filter-preview{height:100px;background:#0f172a;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:10px;overflow:hidden}
.filter-target{font-size:40px;transition:.1s;user-select:none}
.controls{display:flex;flex-direction:column;gap:5px;margin-bottom:8px}
.controls label{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b;cursor:pointer}
.controls label span{min-width:34px;font-family:monospace;color:#94a3b8;font-variant-numeric:tabular-nums}
.controls input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}
.controls input[type=color]{width:38px;height:28px;border-radius:4px;cursor:pointer;padding:1px;border:1px solid #334155;background:transparent}
.controls input[type=checkbox]{accent-color:#3b82f6;cursor:pointer}
.output{background:#0f172a;border-radius:6px;padding:8px;font-size:11px;color:#7dd3fc;font-family:monospace;overflow-x:auto;white-space:pre;border:1px solid #1e293b}

.glass-demo{position:relative;border-radius:14px;overflow:hidden;height:100px}
.glass-bg{width:100%;height:100%;background:linear-gradient(135deg,#1d4ed8,#7c3aed,#db2777);display:flex;align-items:center;justify-content:center;font-size:36px;gap:8px;letter-spacing:4px}
.glass-card{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.2);border-radius:14px;padding:14px 20px;text-align:center;min-width:200px}
.gc-title{font-size:15px;font-weight:700;color:#fff;margin-bottom:2px}
.gc-sub{font-size:11px;color:rgba(255,255,255,.6);margin-bottom:8px}
.glass-card label{font-size:11px;color:rgba(255,255,255,.5);display:flex;align-items:center;gap:8px}
.glass-card input[type=range]{flex:1;accent-color:#fff;cursor:pointer}`,
    `// box-shadow редактор
function updateShadow() {
  const x   = document.getElementById('sx').value;
  const y   = document.getElementById('sy').value;
  const bl  = document.getElementById('sbl').value;
  const sp  = document.getElementById('ssp').value;
  const c   = document.getElementById('sc').value;
  const a   = document.getElementById('sa').value;
  const ins = document.getElementById('sinset').checked ? 'inset ' : '';

  ['sx','sy','sbl','ssp','sa'].forEach(id => {
    const el = document.getElementById(id);
    document.getElementById(id.replace('s','s')+'-val') ;
  });
  document.getElementById('sx-val').textContent  = x;
  document.getElementById('sy-val').textContent  = y;
  document.getElementById('sbl-val').textContent = bl;
  document.getElementById('ssp-val').textContent = sp;
  document.getElementById('sa-val').textContent  = a;

  const hex2rgb = h => [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
  const [r,g,b] = hex2rgb(c);
  const alpha = Math.round(a)/100;
  const val = ins + x + 'px ' + y + 'px ' + bl + 'px ' + sp + 'px rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  document.getElementById('shadow-box').style.boxShadow = val;
  document.getElementById('shadow-out').textContent = 'box-shadow: ' + val + ';';
}

['sx','sy','sbl','ssp','sc','sa','sinset'].forEach(id =>
  document.getElementById(id).addEventListener('input', updateShadow));
updateShadow();

// filter редактор
function updateFilter() {
  const blur = document.getElementById('f-blur').value;
  const br   = document.getElementById('f-br').value;
  const co   = document.getElementById('f-co').value;
  const sa   = document.getElementById('f-sa').value;
  const hr   = document.getElementById('f-hr').value;
  const gs   = document.getElementById('f-gs').value;

  document.getElementById('f-blur-v').textContent = blur;
  document.getElementById('f-br-v').textContent   = parseFloat(br).toFixed(1);
  document.getElementById('f-co-v').textContent   = parseFloat(co).toFixed(1);
  document.getElementById('f-sa-v').textContent   = parseFloat(sa).toFixed(1);
  document.getElementById('f-hr-v').textContent   = hr;
  document.getElementById('f-gs-v').textContent   = gs;

  const parts = [];
  if(blur>0)   parts.push('blur('+blur+'px)');
  if(br!=1)    parts.push('brightness('+br+')');
  if(co!=1)    parts.push('contrast('+co+')');
  if(sa!=1)    parts.push('saturate('+sa+')');
  if(hr>0)     parts.push('hue-rotate('+hr+'deg)');
  if(gs>0)     parts.push('grayscale('+gs+'%)');
  const val = parts.length ? parts.join(' ') : 'none';
  document.getElementById('filter-target').style.filter = val;
  document.getElementById('filter-out').textContent = 'filter: ' + val + ';';
}

['f-blur','f-br','f-co','f-sa','f-hr','f-gs'].forEach(id =>
  document.getElementById(id).addEventListener('input', updateFilter));
updateFilter();

// glass blur
function updateGlass(v) {
  document.getElementById('glass-card').style.backdropFilter = 'blur(' + v + 'px)';
}`,
    [
      { level:'easy',   uk:'Встанови box-shadow з великим blur (40px) і нульовим spread — який ефект виходить? Тепер inset.',  ru:'Установи box-shadow с большим blur (40px) и нулевым spread — какой эффект получается? Теперь inset.' },
      { level:'medium', uk:'Комбінуй filter: zроби ефект вінтажного фото (насиченість -50%, контраст +20%, sepia через hue-rotate).',  ru:'Комбинируй filter: сделай эффект винтажного фото (насыщенность -50%, контраст +20%).' },
      { level:'hard',   uk:'Додай другий .shadow-box з drop-shadow (filter) замість box-shadow — поясни різницю: drop-shadow враховує прозорість, box-shadow — ні.',  ru:'Добавь второй .shadow-box с drop-shadow (filter) вместо box-shadow — объясни разницу: drop-shadow учитывает прозрачность.' },
    ]
  );

  /* ─── 02-03 ──────────────────────────────────────────────── */
  patch('02-03',
    { uk:`<h2>clip-path та mask: нестандартні форми</h2>
<h3>clip-path — відрізання за формою</h3>
<pre>/* Геометрія */
clip-path: circle(50%);
clip-path: ellipse(60% 40% at 50% 50%);
clip-path: polygon(50% 0%, 100% 100%, 0% 100%); /* трикутник */

/* Складний полігон (clip-path.io допомагає) */
clip-path: polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%);

/* SVG shape */
clip-path: url(#my-clip);</pre>
<h3>Анімація clip-path</h3>
<pre>/* Розкриття знизу */
@keyframes reveal {
  from { clip-path: inset(100% 0 0 0); }
  to   { clip-path: inset(0% 0 0 0); }
}</pre>
<h3>mask — маска з градієнтом</h3>
<pre>/* Поступове зникання знизу */
mask-image: linear-gradient(to bottom, black 60%, transparent 100%);

/* PNG-маска */
mask-image: url(mask.png);
mask-size: cover;</pre>
<h3>Різниця</h3>
<ul>
  <li><code>clip-path</code> — геометричний контур, рівні краї</li>
  <li><code>mask</code> — маска з альфа-каналом, м'які краї</li>
</ul>`,
      ru:`<h2>clip-path и mask</h2>
<pre>clip-path: circle(50%);
clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
clip-path: inset(10px 20px 30px 40px round 8px);</pre>
<h3>Анимация</h3>
<pre>@keyframes reveal {
  from { clip-path: inset(100% 0 0 0); }
  to   { clip-path: inset(0% 0 0 0); }
}</pre>
<h3>mask</h3>
<pre>mask-image: linear-gradient(to bottom, black 60%, transparent);
mask-image: url(mask.png);</pre>` },
    `<div class="clip-lab">
  <h2>✂️ Clip-path & Mask</h2>

  <div class="panels">
    <!-- clip-path редактор -->
    <div class="panel">
      <h3>clip-path</h3>
      <div class="cp-preview">
        <div class="cp-box" id="cp-box">✂️</div>
      </div>
      <div class="shape-btns">
        <button onclick="setShape('circle')">circle</button>
        <button onclick="setShape('ellipse')">ellipse</button>
        <button onclick="setShape('triangle')">triangle</button>
        <button onclick="setShape('hexagon')">hexagon</button>
        <button onclick="setShape('arrow')">arrow</button>
        <button onclick="setShape('star')">star</button>
        <button onclick="setShape('reveal')">▶ reveal</button>
      </div>
      <pre class="cp-out" id="cp-out">Обери форму →</pre>
    </div>

    <!-- mask -->
    <div class="panel">
      <h3>mask-image</h3>
      <div class="mask-demo">
        <div class="mask-target" id="mask-target">
          🌊 Океан<br>🏔️ Гори<br>🌸 Поля<br>🌙 Місяць<br>⭐ Зірки<br>🌌 Всесвіт
        </div>
      </div>
      <div class="mask-controls">
        <label>Fade від <span id="m-start-v">60</span>%
          <input type="range" id="m-start" min="0" max="100" value="60" oninput="updateMask()">
        </label>
        <div class="mask-type">
          <button onclick="setMask('bottom')">↓ знизу</button>
          <button onclick="setMask('radial')">○ радіальна</button>
          <button onclick="setMask('diagonal')">↗ діагональ</button>
        </div>
      </div>
      <pre class="cp-out" id="mask-out"></pre>
    </div>
  </div>

  <!-- clip-path полігон редактор -->
  <div class="poly-editor">
    <h3>Polygon Editor</h3>
    <div class="poly-wrap">
      <canvas id="poly-canvas" width="200" height="160"></canvas>
      <div class="poly-info">
        <p>Клікай на canvas щоб додавати точки.<br>Shift+клік — видалити останню.</p>
        <pre id="poly-out" class="cp-out">clip-path: polygon()</pre>
        <button onclick="clearPoly()">Очистити</button>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.clip-lab{max-width:560px}
.panels{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.panel{background:#1e293b;border-radius:12px;padding:14px}
.panel h3{font-size:11px;text-transform:uppercase;color:#3b82f6;margin-bottom:10px}
.cp-preview{height:110px;background:#0f172a;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:8px;overflow:hidden}
.cp-box{width:90px;height:90px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);font-size:28px;display:flex;align-items:center;justify-content:center;transition:clip-path .5s ease}
.shape-btns{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.shape-btns button{padding:4px 8px;font-size:11px}
.cp-out{background:#0f172a;border:1px solid #1e293b;border-radius:6px;padding:8px;font-size:11px;color:#7dd3fc;font-family:monospace;overflow-x:auto;white-space:pre}

.mask-demo{height:110px;background:#0f172a;border-radius:8px;overflow:hidden;margin-bottom:8px;display:flex;align-items:center;justify-content:center}
.mask-target{font-size:13px;line-height:1.8;color:#94a3b8;text-align:center;mask-image:linear-gradient(to bottom,black 60%,transparent);transition:.3s}
.mask-controls label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b;margin-bottom:6px}
.mask-controls label span{min-width:28px;font-family:monospace;color:#94a3b8}
.mask-controls input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}
.mask-type{display:flex;gap:4px;flex-wrap:wrap}
.mask-type button{padding:4px 8px;font-size:11px}

.poly-editor{background:#1e293b;border-radius:12px;padding:14px}
.poly-editor h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:10px}
.poly-wrap{display:flex;gap:14px;flex-wrap:wrap}
#poly-canvas{border-radius:8px;border:1px solid #334155;cursor:crosshair;background:#0f172a}
.poly-info{flex:1;min-width:150px;display:flex;flex-direction:column;gap:8px;font-size:12px;color:#64748b}`,
    `const SHAPES = {
  circle:   'circle(50%)',
  ellipse:  'ellipse(70% 45% at 50% 50%)',
  triangle: 'polygon(50% 0%, 100% 100%, 0% 100%)',
  hexagon:  'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
  arrow:    'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
  star:     'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
};

function setShape(name) {
  const el = document.getElementById('cp-box');
  if(name === 'reveal') {
    el.style.clipPath = 'inset(100% 0 0 0)';
    el.style.transition = 'clip-path .6s ease';
    setTimeout(() => el.style.clipPath = 'inset(0% 0 0 0)', 50);
    document.getElementById('cp-out').textContent =
      '@keyframes reveal {\n  from { clip-path: inset(100% 0 0 0); }\n  to   { clip-path: inset(0% 0 0 0); }\n}';
    return;
  }
  el.style.transition = 'clip-path .4s ease';
  el.style.clipPath = SHAPES[name];
  document.getElementById('cp-out').textContent = 'clip-path: ' + SHAPES[name] + ';';
}

let maskDir = 'bottom';
function setMask(d) { maskDir = d; updateMask(); }

function updateMask() {
  const v   = document.getElementById('m-start').value;
  document.getElementById('m-start-v').textContent = v;
  const t   = document.getElementById('mask-target');
  let val;
  if(maskDir === 'bottom')    val = 'linear-gradient(to bottom, black ' + v + '%, transparent 100%)';
  else if(maskDir === 'radial') val = 'radial-gradient(ellipse at center, black ' + v + '%, transparent 100%)';
  else                          val = 'linear-gradient(to bottom right, black ' + v + '%, transparent 100%)';
  t.style.webkitMaskImage = val;
  t.style.maskImage = val;
  document.getElementById('mask-out').textContent = 'mask-image: ' + val + ';';
}
updateMask();

// Polygon editor
const canvas = document.getElementById('poly-canvas');
const pctx   = canvas.getContext('2d');
let points   = [];

function drawPoly() {
  pctx.clearRect(0,0,canvas.width,canvas.height);
  pctx.fillStyle = 'rgba(59,130,246,.15)';
  pctx.strokeStyle = '#3b82f6';
  pctx.lineWidth = 1.5;
  if(points.length > 2) {
    pctx.beginPath();
    pctx.moveTo(points[0].x,points[0].y);
    points.forEach(p => pctx.lineTo(p.x,p.y));
    pctx.closePath(); pctx.fill(); pctx.stroke();
  }
  points.forEach((p,i) => {
    pctx.beginPath(); pctx.arc(p.x,p.y,4,0,Math.PI*2);
    pctx.fillStyle = '#f59e0b'; pctx.fill();
    pctx.fillStyle = '#f1f5f9'; pctx.font = '10px monospace';
    pctx.fillText(i+1,p.x+6,p.y-4);
  });
  if(points.length) {
    const pStr = points.map(p =>
      Math.round(p.x/canvas.width*100)+'% ' +
      Math.round(p.y/canvas.height*100)+'%').join(', ');
    document.getElementById('poly-out').textContent = 'clip-path: polygon(' + pStr + ');';
  }
}

canvas.addEventListener('click', e => {
  if(e.shiftKey) { points.pop(); }
  else {
    const r = canvas.getBoundingClientRect();
    points.push({ x: e.clientX-r.left, y: e.clientY-r.top });
  }
  drawPoly();
});

function clearPoly() { points = []; drawPoly(); document.getElementById('poly-out').textContent = 'clip-path: polygon()'; }
drawPoly();`,
    [
      { level:'easy',   uk:'Натисни кожну форму — спостерігай за анімацією переходу clip-path між ними.',  ru:'Нажми каждую форму — наблюдай за анимацией перехода clip-path между ними.' },
      { level:'medium', uk:'У polygon editor намалюй трикутник (3 кліки) — скопіюй отриманий clip-path і застосуй до .cp-box.',  ru:'В polygon editor нарисуй треугольник (3 клика) — скопируй полученный clip-path и примени к .cp-box.' },
      { level:'hard',   uk:'Додай кнопку "Animate" що через CSS transition анімує .cp-box від circle(0%) до circle(50%) за 0.5s.',  ru:'Добавь кнопку "Animate" которая через CSS transition анимирует .cp-box от circle(0%) до circle(50%) за 0.5s.' },
    ]
  );

  /* ─── 02-04 ──────────────────────────────────────────────── */
  patch('02-04',
    { uk:`<h2>CSS Custom Properties: теми та токени</h2>
<p>CSS-змінні (Custom Properties) — потужний інструмент для тем, дизайн-систем і динамічних стилів.</p>
<h3>Синтаксис</h3>
<pre>/* Оголошення у :root (глобально): */
:root {
  --color-primary: #3b82f6;
  --space-md: 16px;
  --radius: 8px;
}

/* Використання: */
button {
  background: var(--color-primary);
  padding: var(--space-md);
  border-radius: var(--radius, 4px); /* fallback! */
}

/* Перевизначення у компоненті: */
.card {
  --color-primary: #7c3aed; /* локально */
}</pre>
<h3>Dark/Light теми</h3>
<pre>:root { --bg: #ffffff; --text: #1f2937; }

:root[data-theme="dark"] {
  --bg: #0f172a; --text: #f1f5f9;
}

@media (prefers-color-scheme: dark) {
  :root { --bg: #0f172a; --text: #f1f5f9; }
}</pre>
<h3>JS + Custom Properties</h3>
<pre>// Читати:
getComputedStyle(el).getPropertyValue('--color-primary')

// Встановити:
document.documentElement.style.setProperty('--color-primary', '#f59e0b');</pre>`,
      ru:`<h2>CSS Custom Properties: темы и токены</h2>
<pre>:root {
  --color-primary: #3b82f6;
  --space-md: 16px;
}
button {
  background: var(--color-primary);
  padding: var(--space-md);
  border-radius: var(--radius, 4px); /* fallback */
}</pre>
<h3>Темы через data-attribute</h3>
<pre>:root { --bg: #fff; --text: #111; }
:root[data-theme="dark"] {
  --bg: #0f172a; --text: #f1f5f9;
}</pre>
<h3>JS</h3>
<pre>document.documentElement.style.setProperty('--color-primary', '#f59e0b');</pre>` },
    `<!DOCTYPE html>
<html data-theme="dark">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="theme-editor">
  <div class="te-header">
    <h2>🎨 Дизайн-система з CSS-змінними</h2>
    <button id="theme-toggle" onclick="toggleTheme()">☀️ Light mode</button>
  </div>

  <div class="token-editor">
    <h3>Токени (CSS Custom Properties)</h3>
    <div class="token-grid">
      <div class="token-row">
        <label>--color-primary</label>
        <input type="color" id="t-primary" value="#3b82f6" oninput="setToken('--color-primary',this.value)">
        <code id="v-primary">#3b82f6</code>
      </div>
      <div class="token-row">
        <label>--color-accent</label>
        <input type="color" id="t-accent" value="#8b5cf6" oninput="setToken('--color-accent',this.value)">
        <code id="v-accent">#8b5cf6</code>
      </div>
      <div class="token-row">
        <label>--radius</label>
        <input type="range" id="t-radius" min="0" max="24" value="8" oninput="setTokenPx('--radius',this.value,'t-radius-v')">
        <code id="t-radius-v">8px</code>
      </div>
      <div class="token-row">
        <label>--space-md</label>
        <input type="range" id="t-space" min="8" max="32" value="16" oninput="setTokenPx('--space-md',this.value,'t-space-v')">
        <code id="t-space-v">16px</code>
      </div>
    </div>
  </div>

  <!-- Компоненти що використовують токени -->
  <div class="demo-components">
    <button class="demo-btn primary">Primary Button</button>
    <button class="demo-btn accent">Accent Button</button>
    <div class="demo-card">
      <div class="demo-card-icon">🚀</div>
      <div class="demo-card-body">
        <div class="demo-card-title">Картка компонент</div>
        <div class="demo-card-text">Всі розміри та кольори через CSS-змінні</div>
      </div>
    </div>
    <div class="demo-badge">Badge</div>
  </div>

  <div class="css-output">
    <h3>Generated :root { ... }</h3>
    <pre id="css-out"></pre>
  </div>
</div>
<script src="script.js"></script>
</body>
</html>`,
    `*{box-sizing:border-box;margin:0;padding:0}
:root {
  --color-primary: #3b82f6;
  --color-accent:  #8b5cf6;
  --radius:   8px;
  --space-md: 16px;
  --bg:       #0f172a;
  --bg2:      #1e293b;
  --border:   #334155;
  --text:     #f1f5f9;
  --muted:    #64748b;
}
:root[data-theme="light"] {
  --bg:     #f8fafc;
  --bg2:    #fff;
  --border: #e2e8f0;
  --text:   #0f172a;
  --muted:  #64748b;
}
body{font-family:'Segoe UI',sans-serif;background:var(--bg);color:var(--text);padding:20px;transition:background .3s,color .3s}
h2{font-size:16px;font-weight:700;color:var(--text)}
h3{font-size:11px;text-transform:uppercase;color:var(--muted);margin-bottom:10px;letter-spacing:.05em}
code{background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-family:monospace;font-size:12px;color:var(--color-primary)}
input[type=color]{width:40px;height:32px;border-radius:4px;cursor:pointer;padding:1px;border:1px solid var(--border);background:transparent}
input[type=range]{accent-color:var(--color-primary);cursor:pointer;flex:1}

.theme-editor{max-width:500px}
.te-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
#theme-toggle{background:var(--bg2);border:1px solid var(--border);color:var(--text);padding:7px 14px;border-radius:var(--radius);cursor:pointer;font-size:12px;transition:.2s}
#theme-toggle:hover{border-color:var(--color-primary)}

.token-editor{background:var(--bg2);border-radius:12px;padding:14px;margin-bottom:14px;border:1px solid var(--border)}
.token-grid{display:flex;flex-direction:column;gap:8px}
.token-row{display:flex;align-items:center;gap:10px}
.token-row label{min-width:140px;font-size:12px;color:var(--muted);font-family:monospace}

.demo-components{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:var(--space-md);background:var(--bg2);border-radius:12px;border:1px solid var(--border);margin-bottom:14px}
.demo-btn{padding:9px 18px;border-radius:var(--radius);border:none;cursor:pointer;font-size:13px;font-weight:600;transition:.2s}
.demo-btn.primary{background:var(--color-primary);color:#fff}
.demo-btn.primary:hover{opacity:.85}
.demo-btn.accent{background:var(--color-accent);color:#fff}
.demo-btn.accent:hover{opacity:.85}
.demo-card{display:flex;gap:10px;align-items:center;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:var(--space-md);flex:1;min-width:180px}
.demo-card-icon{font-size:22px}
.demo-card-title{font-size:13px;font-weight:700;color:var(--text)}
.demo-card-text{font-size:11px;color:var(--muted);margin-top:2px}
.demo-badge{background:var(--color-accent);color:#fff;border-radius:calc(var(--radius)/2);padding:4px 10px;font-size:11px;font-weight:700}

.css-output{background:var(--bg2);border-radius:12px;padding:14px;border:1px solid var(--border)}
#css-out{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:11px;color:var(--color-primary);font-family:monospace;line-height:1.7;overflow-x:auto;white-space:pre}`,
    `let tokens = { '--color-primary':'#3b82f6', '--color-accent':'#8b5cf6', '--radius':'8px', '--space-md':'16px' };

function setToken(name, val) {
  document.documentElement.style.setProperty(name, val);
  tokens[name] = val;
  const key = name.replace('--color-','v-');
  const el = document.getElementById(key);
  if(el) el.textContent = val;
  updateOut();
}

function setTokenPx(name, val, labelId) {
  const px = val + 'px';
  document.documentElement.style.setProperty(name, px);
  tokens[name] = px;
  document.getElementById(labelId).textContent = px;
  updateOut();
}

function updateOut() {
  document.getElementById('css-out').textContent =
    ':root {\n' + Object.entries(tokens).map(([k,v]) => '  ' + k + ': ' + v + ';').join('\n') + '\n}';
}

function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  document.getElementById('theme-toggle').textContent = isLight ? '☀️ Light mode' : '🌙 Dark mode';
}

updateOut();`,
    [
      { level:'easy',   uk:'Зміни --color-primary і --color-accent — спостерігай як одночасно оновлюються кнопки, картка і badge.',  ru:'Измени --color-primary и --color-accent — наблюдай как одновременно обновляются кнопки, карточка и badge.' },
      { level:'medium', uk:'Натисни "Light mode" — що змінюється? Знайди у CSS де визначені значення для light-теми.',  ru:'Нажми "Light mode" — что изменяется? Найди в CSS где определены значения для light-темы.' },
      { level:'hard',   uk:'Відкрий консоль і виконай: getComputedStyle(document.documentElement).getPropertyValue("--color-primary") — що повертає? Тепер змін через setProperty.',  ru:'Открой консоль и выполни: getComputedStyle(document.documentElement).getPropertyValue("--color-primary") — что возвращает?' },
    ]
  );

  /* ─── 02-05 ──────────────────────────────────────────────── */
  patch('02-05',
    { uk:`<h2>Псевдоелементи ::before / ::after</h2>
<p>Псевдоелементи додають контент до/після елемента без зміни HTML. Вони є повноцінними блоками, якими можна стилізувати.</p>
<h3>Базовий синтаксис</h3>
<pre>.el::before {
  content: "★ ";  /* Обов'язково! */
  color: gold;
  font-size: 1.2em;
}
.el::after {
  content: "";         /* Порожньо (для декору) */
  display: block;      /* Або inline-block */
  width: 100px;
  height: 2px;
  background: blue;
}</pre>
<h3>Трюки верстки</h3>
<pre>/* Декоративна лінія після заголовку */
h2::after { content:''; display:block; height:2px; background:var(--accent); margin-top:6px; }

/* Лічильник (CSS counter) */
li { counter-increment: steps; }
li::before { content: counter(steps) '. '; font-weight:bold; }

/* Іконки через content (Unicode) */
a[href^="https"]::before { content: '🔒 '; }

/* Оверлей поверх картинки */
.card::after { content:''; position:absolute; inset:0; background:rgba(0,0,0,.5); }</pre>`,
      ru:`<h2>Псевдоэлементы ::before / ::after</h2>
<pre>.el::before {
  content: "★ ";
  color: gold;
}
.el::after {
  content: "";
  display: block;
  width: 100px;
  height: 2px;
  background: blue;
}</pre>
<h3>Трюки</h3>
<pre>/* Счётчик */
li { counter-increment: steps; }
li::before { content: counter(steps) '. '; }

/* Оверлей */
.card::after { content:''; position:absolute; inset:0; background:rgba(0,0,0,.5); }</pre>` },
    `<div class="pseudo-lab">
  <h2>🎭 ::before / ::after Трюки</h2>

  <div class="tricks-grid">
    <!-- Trick 1: Tooltip -->
    <div class="trick-card">
      <h3>Tooltip via ::after</h3>
      <div class="tooltip-demo">
        <button class="tip-btn" data-tip="Це підказка через CSS!">Hover me</button>
        <button class="tip-btn" data-tip="content: attr(data-tip)">Я теж</button>
      </div>
      <pre class="trick-code">[data-tip]::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 8px);
}</pre>
    </div>

    <!-- Trick 2: Decorative lines -->
    <div class="trick-card">
      <h3>Decorative lines</h3>
      <div class="deco-demo">
        <h2 class="deco-h">Заголовок</h2>
        <h2 class="deco-h2">Секція</h2>
        <div class="deco-divider">або</div>
      </div>
    </div>

    <!-- Trick 3: CSS Counter -->
    <div class="trick-card">
      <h3>CSS Counter</h3>
      <ol class="css-counter" id="counter-list">
        <li>HTML5 Семантика</li>
        <li>CSS3 Майстерність</li>
        <li>JavaScript DOM</li>
      </ol>
      <button onclick="addItem()" style="margin-top:8px;padding:4px 10px;font-size:11px">+ Додати</button>
    </div>

    <!-- Trick 4: Loading spinner -->
    <div class="trick-card">
      <h3>Spinner без JS</h3>
      <div class="spinner-wrap">
        <div class="css-spinner"></div>
      </div>
      <pre class="trick-code">.spinner::after {
  content: '';
  border: 3px solid rgba(59,130,246,.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}</pre>
    </div>
  </div>
</div>`,
    `${BASE}
.pseudo-lab{max-width:560px}
.tricks-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.trick-card{background:#1e293b;border-radius:12px;padding:14px}
.trick-card h3{font-size:11px;text-transform:uppercase;color:#3b82f6;margin-bottom:10px}
.trick-code{background:#0f172a;border:1px solid #1e293b;border-radius:6px;padding:8px;font-size:10px;color:#7dd3fc;font-family:monospace;line-height:1.6;overflow-x:auto;white-space:pre;margin-top:8px}

/* Tooltip trick */
.tooltip-demo{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;padding-top:32px}
[data-tip]{position:relative}
[data-tip]::after{
  content: attr(data-tip);
  position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);
  background:#0f172a;color:#93c5fd;font-size:11px;padding:5px 10px;border-radius:6px;
  white-space:nowrap;border:1px solid #334155;pointer-events:none;opacity:0;transition:.2s;
  font-family:'Segoe UI',sans-serif;
}
[data-tip]::before{
  content:'';position:absolute;bottom:calc(100% + 3px);left:50%;transform:translateX(-50%);
  border:4px solid transparent;border-top-color:#334155;pointer-events:none;opacity:0;transition:.2s;
}
[data-tip]:hover::after,[data-tip]:hover::before{opacity:1}
.tip-btn{padding:7px 14px;font-size:12px}

/* Deco lines */
.deco-demo{display:flex;flex-direction:column;gap:12px;margin-bottom:8px}
.deco-h{font-size:15px;font-weight:700;color:#f1f5f9;position:relative;padding-bottom:6px}
.deco-h::after{content:'';display:block;height:2px;background:linear-gradient(90deg,#3b82f6,transparent);margin-top:6px}
.deco-h2{font-size:15px;font-weight:700;color:#f1f5f9;display:flex;align-items:center;gap:10px}
.deco-h2::before,.deco-h2::after{content:'';flex:1;height:1px;background:#334155}
.deco-divider{text-align:center;position:relative;font-size:12px;color:#64748b;padding:0 16px}
.deco-divider::before,.deco-divider::after{content:'';position:absolute;top:50%;width:30%;height:1px;background:#334155}
.deco-divider::before{left:0}.deco-divider::after{right:0}

/* CSS counter */
.css-counter{counter-reset:my-counter;list-style:none;display:flex;flex-direction:column;gap:6px}
.css-counter li{counter-increment:my-counter;font-size:13px;color:#94a3b8;padding:6px 10px;background:#0f172a;border-radius:6px;display:flex;align-items:center;gap:8px}
.css-counter li::before{content:counter(my-counter,'decimal-leading-zero');font-weight:700;color:#3b82f6;font-family:monospace;font-size:14px;min-width:22px}

/* Spinner */
.spinner-wrap{display:flex;justify-content:center;margin-bottom:8px}
.css-spinner{width:40px;height:40px;position:relative}
.css-spinner::after{content:'';position:absolute;inset:0;border:3px solid rgba(59,130,246,.15);border-top-color:#3b82f6;border-radius:50%;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}`,
    `let itemCount = 4;
function addItem() {
  const li = document.createElement('li');
  li.textContent = 'Новий урок ' + itemCount++;
  document.getElementById('counter-list').appendChild(li);
}`,
    [
      { level:'easy',   uk:'Наведи на кнопки у секції "Tooltip via ::after" — прочитай підказки.',  ru:'Наведи на кнопки в секции "Tooltip via ::after" — прочитай подсказки.' },
      { level:'medium', uk:'Додай новий елемент у .css-counter і поспостерігай як лічильник оновлюється автоматично через CSS.',  ru:'Добавь новый элемент в .css-counter и понаблюдай как счётчик обновляется автоматически через CSS.' },
      { level:'hard',   uk:'Зроби loading overlay: поверх .trick-card додай ::after з position:absolute, inset:0, background rgba(), cursor:wait — натисни кнопку щоб активувати клас.',  ru:'Сделай loading overlay: поверх .trick-card добавь ::after с position:absolute, inset:0, background rgba() — при добавлении класса .loading.' },
    ]
  );

  /* ─── 02-06 ──────────────────────────────────────────────── */
  patch('02-06',
    { uk:`<h2>Складні CSS-селектори: :not(), :has(), :is(), :where()</h2>
<p>Нові функціональні псевдокласи дозволяють писати складну логіку безпосередньо у CSS.</p>
<h3>:not() — виключення</h3>
<pre>/* Всі кнопки, крім disabled */
button:not(:disabled) { cursor: pointer; }

/* Всі параграфи, крім першого */
p:not(:first-child) { margin-top: 12px; }

/* :not() приймає список */
:not(h1, h2, h3) { color: #94a3b8; }</pre>
<h3>:is() — групування (зі специфічністю)</h3>
<pre>/* Замість: h1 a, h2 a, h3 a */
:is(h1, h2, h3) a { color: blue; }

/* Специфічність = найвища у списку */</pre>
<h3>:where() — нульова специфічність</h3>
<pre>:where(h1, h2, h3) a { color: blue; }
/* Специфічність: (0,0,0) → легко переперевизначити */</pre>
<h3>:has() — батько залежно від дочірнього</h3>
<pre>/* Картка що має img */
.card:has(img) { padding: 0; }

/* Форма з помилкою */
form:has(input:invalid) .submit { opacity: .5; }

/* h2 перед яким немає p */
h2:not(:has(+ p)) { margin-bottom: 24px; }</pre>`,
      ru:`<h2>Сложные CSS-селекторы</h2>
<pre>/* :not() — исключение */
button:not(:disabled) { cursor: pointer; }
p:not(:first-child) { margin-top: 12px; }

/* :is() — группировка */
:is(h1, h2, h3) a { color: blue; }

/* :where() — нулевая специфичность */
:where(h1, h2, h3) a { color: blue; }

/* :has() — родитель через дочерний */
.card:has(img) { padding: 0; }
form:has(input:invalid) .submit { opacity: .5; }</pre>` },
    `<div class="selectors-lab">
  <h2>🔍 Selector Playground</h2>

  <!-- :not() демо -->
  <div class="demo-section">
    <h3>:not() — виключення</h3>
    <div class="not-demo">
      <button>Кнопка 1</button>
      <button disabled>Disabled</button>
      <button class="primary-btn">Primary</button>
      <button>Кнопка 4</button>
    </div>
    <pre class="sel-code">button:not(:disabled):not(.primary-btn) {
  border: 1px solid #3b82f6;
}</pre>
  </div>

  <!-- :has() демо — батько реагує на дочірній -->
  <div class="demo-section">
    <h3>:has() — розумний батько</h3>
    <div class="has-demo">
      <div class="has-card">
        <div class="hc-title">Без фото</div>
        <div class="hc-text">Звичайна картка</div>
      </div>
      <div class="has-card">
        <div class="hc-img">🖼️</div>
        <div class="hc-title">З фото</div>
        <div class="hc-text">.has-card:has(.hc-img) — автоматично інший стиль!</div>
      </div>
      <div class="has-card">
        <div class="hc-title">З бейджем</div>
        <span class="hc-badge">NEW</span>
        <div class="hc-text">.has-card:has(.hc-badge) — жовта рамка</div>
      </div>
    </div>
  </div>

  <!-- :is() / :where() live demo -->
  <div class="demo-section">
    <h3>:is() та :where() — різниця специфічності</h3>
    <div class="is-where-demo">
      <p class="iw-text" id="iw-text">Я параграф у демо</p>
      <button onclick="toggleClass()">Перемкнути .highlight</button>
    </div>
    <pre class="sel-code" id="is-where-code">/* :is() — специфічність = max аргументу */
:is(#demo, .highlight) p { color: #f59e0b; }

/* :where() — специфічність = 0 */
:where(#demo, .highlight) p { color: #f59e0b; }
/* Легше перевизначити пізніше! */</pre>
  </div>

  <!-- Selector tester -->
  <div class="demo-section">
    <h3>Тестер селекторів</h3>
    <div class="sel-tester">
      <input type="text" id="sel-input" placeholder="Введи CSS-селектор..." value="button:not(:disabled)">
      <button onclick="testSel()">Знайти елементи</button>
    </div>
    <div class="sel-results" id="sel-results"></div>
  </div>
</div>`,
    `${BASE}
.selectors-lab{max-width:540px}
.demo-section{background:#1e293b;border-radius:12px;padding:14px;margin-bottom:12px}
.demo-section h3{font-size:11px;text-transform:uppercase;color:#3b82f6;margin-bottom:10px}
.sel-code{background:#0f172a;border-radius:6px;padding:8px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.6;overflow-x:auto;white-space:pre;margin-top:8px;border:1px solid #1e293b}

/* :not() демо */
.not-demo{display:flex;gap:6px;flex-wrap:wrap}
.not-demo button{padding:8px 14px;font-size:12px}
.not-demo button:not(:disabled):not(.primary-btn){border-color:#3b82f6;color:#93c5fd}
.not-demo button:disabled{opacity:.4;cursor:not-allowed}
.not-demo button.primary-btn{background:#3b82f6;border-color:#3b82f6;color:#fff}

/* :has() демо */
.has-demo{display:flex;gap:8px;flex-wrap:wrap}
.has-card{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:12px;flex:1;min-width:130px;transition:.2s}
.has-card:has(.hc-img){padding:0;overflow:hidden}
.has-card:has(.hc-img) .hc-title{padding:8px 12px 0}
.has-card:has(.hc-img) .hc-text{padding:4px 12px 10px}
.has-card:has(.hc-badge){border-color:#f59e0b}
.hc-img{font-size:32px;background:linear-gradient(135deg,#1d4ed8,#7c3aed);text-align:center;padding:14px;margin-bottom:0}
.hc-title{font-size:13px;font-weight:700;color:#f1f5f9;margin-bottom:4px}
.hc-text{font-size:11px;color:#64748b;line-height:1.4}
.hc-badge{display:inline-block;background:#f59e0b;color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;margin-bottom:6px}

/* :is() / :where() */
.is-where-demo{display:flex;gap:10px;align-items:center}
.iw-text{font-size:14px;color:#94a3b8;flex:1;transition:color .2s}
.iw-text.highlight{color:#f59e0b}

.sel-tester{display:flex;gap:8px;margin-bottom:8px}
.sel-tester input{flex:1;margin:0}
.sel-results{font-size:12px;color:#94a3b8;min-height:24px;padding:6px;border-radius:6px;background:#0f172a;border:1px solid #1e293b}`,
    `function toggleClass() {
  document.getElementById('iw-text').classList.toggle('highlight');
}

function testSel() {
  const sel = document.getElementById('sel-input').value.trim();
  const res = document.getElementById('sel-results');
  try {
    const matches = document.querySelectorAll(sel);
    if(!matches.length) { res.textContent = 'Не знайдено елементів'; return; }
    res.innerHTML = 'Знайдено ' + matches.length + ' елемент(ів):<br>' +
      Array.from(matches).map(el =>
        '<code style="margin-right:4px">' +
        el.tagName.toLowerCase() +
        (el.id ? '#'+el.id : '') +
        (el.className ? '.'+[...el.classList].join('.') : '') +
        '</code>'
      ).join(' ');
    matches.forEach(el => {
      el.style.outline = '2px solid #f59e0b';
      setTimeout(() => el.style.outline = '', 1500);
    });
  } catch(e) {
    res.textContent = '❌ Помилка: ' + e.message;
    res.style.color = '#f87171';
  }
}`,
    [
      { level:'easy',   uk:'Введи у тестер "button:not(:disabled)" — скільки кнопок підсвічується? А "button:not(.primary-btn):not(:disabled)"?',  ru:'Введи в тестер "button:not(:disabled)" — сколько кнопок подсвечивается? А "button:not(.primary-btn):not(:disabled)"?' },
      { level:'medium', uk:'Спробуй .has-card:has(.hc-badge) у тестері. Знайшло? Поясни чому :has() іноді ще не підтримується в старих браузерах.',  ru:'Попробуй .has-card:has(.hc-badge) в тестере. Нашло? Объясни почему :has() не поддерживался в старых браузерах.' },
      { level:'hard',   uk:'Напиши CSS-правило що стилізує .demo-section тільки якщо в ньому є pre.sel-code — використай :has().',  ru:'Напиши CSS-правило которое стилизует .demo-section только если в нём есть pre.sel-code — используй :has().' },
    ]
  );

  /* ─── 02-07 ──────────────────────────────────────────────── */
  patch('02-07',
    { uk:`<h2>CSS Grid: subgrid та вкладені grid-контейнери</h2>
<p>CSS Grid Level 2 додав <code>subgrid</code> — дочірній grid може успадковувати треки батька.</p>
<h3>Базовий Grid (нагадування)</h3>
<pre>display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: auto;
gap: 16px;</pre>
<h3>Subgrid</h3>
<pre>.parent {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 16px;
}
.child {
  grid-column: 1 / -1;   /* span всю ширину */
  display: grid;
  grid-template-columns: subgrid; /* Успадковуємо треки батька! */
}</pre>
<h3>Вкладені grid-контейнери</h3>
<pre>.outer {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
}
/* Будь-який child може сам бути grid */
.inner {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}</pre>
<h3>Корисні властивості</h3>
<pre>grid-column: 2 / span 2;   /* Починаємо з 2, займаємо 2 треки */
grid-row: 1 / 3;
grid-area: header;          /* Іменована область */
align-items: start | center | end | stretch;
place-items: center;        /* align + justify разом */</pre>`,
      ru:`<h2>CSS Grid: subgrid и вложенные контейнеры</h2>
<pre>.parent {
  display: grid;
  grid-template-columns: 120px 1fr auto;
}
.child {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid; /* наследуем треки */
}</pre>
<h3>Вложенные grid</h3>
<pre>.outer { display:grid; grid-template-columns: 200px 1fr; }
.inner { display:grid; grid-template-columns: repeat(2,1fr); }</pre>` },
    `<div class="grid-lab">
  <h2>🔲 Grid Конструктор</h2>

  <div class="controls-row">
    <label>Колонки
      <select id="g-cols" onchange="buildGrid()">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="repeat(2,120px) 1fr">2col + fluid</option>
        <option value="1fr 2fr 1fr">1:2:1</option>
      </select>
    </label>
    <label>Gap <span id="g-gap-v">16</span>px
      <input type="range" id="g-gap" min="0" max="32" value="16" oninput="buildGrid()">
    </label>
    <label>Рядків
      <select id="g-rows" onchange="buildGrid()">
        <option value="auto">auto</option>
        <option value="repeat(2,80px)">2 x 80px</option>
        <option value="100px 1fr">100px + fluid</option>
      </select>
    </label>
    <button onclick="addCell()">+ Комірка</button>
    <button onclick="removeCell()">− Комірка</button>
  </div>

  <div class="grid-demo" id="grid-demo"></div>

  <div class="grid-info">
    <pre id="grid-css-out" class="grid-code"></pre>
    <div class="span-controls">
      <h3>Вибрана комірка: span</h3>
      <label>col-span <input type="number" id="sel-col-span" min="1" max="4" value="1" oninput="applySpan()"></label>
      <label>row-span <input type="number" id="sel-row-span" min="1" max="3" value="1" oninput="applySpan()"></label>
      <span id="span-hint" style="font-size:11px;color:#64748b">Клікни на комірку</span>
    </div>
  </div>
</div>`,
    `${BASE}
.grid-lab{max-width:560px}
.controls-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:#1e293b;border-radius:10px;padding:12px;margin-bottom:12px}
.controls-row label{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b}
.controls-row label span{min-width:20px;font-family:monospace;color:#94a3b8}
.controls-row select{background:#0f172a;border:1px solid #334155;color:#f1f5f9;padding:5px 8px;border-radius:6px;font-size:12px;cursor:pointer}
.controls-row input[type=range]{width:80px;accent-color:#3b82f6;cursor:pointer}

.grid-demo{background:#0f172a;border-radius:10px;padding:12px;min-height:180px;margin-bottom:12px;border:1px solid #1e293b;transition:.3s}
.g-cell{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px;font-size:11px;color:#64748b;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;min-height:60px;transition:.2s;user-select:none}
.g-cell:hover{border-color:#3b82f6}
.g-cell.selected{border-color:#f59e0b;background:rgba(245,158,11,.08)}
.g-cell .cell-num{font-size:16px;font-weight:700;color:#3b82f6}

.grid-info{display:flex;gap:12px;flex-wrap:wrap}
.grid-code{flex:1;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:12px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.7;overflow-x:auto;white-space:pre;min-width:200px}
.span-controls{background:#1e293b;border-radius:8px;padding:12px;min-width:160px}
.span-controls h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.span-controls label{display:flex;align-items:center;gap:8px;font-size:12px;color:#94a3b8;margin-bottom:6px}
.span-controls input[type=number]{width:50px;padding:4px 8px;text-align:center;margin:0}`,
    `let cellCount = 6;
let selectedCell = null;
const spans = {};

function buildGrid() {
  const cols   = document.getElementById('g-cols').value;
  const gap    = document.getElementById('g-gap').value;
  const rows   = document.getElementById('g-rows').value;
  document.getElementById('g-gap-v').textContent = gap;
  const demo = document.getElementById('grid-demo');
  demo.style.display        = 'grid';
  demo.style.gridTemplateColumns = cols;
  demo.style.gridTemplateRows   = rows;
  demo.style.gap            = gap + 'px';

  demo.innerHTML = '';
  for(let i = 1; i <= cellCount; i++) {
    const d = document.createElement('div');
    d.className = 'g-cell' + (selectedCell===i?' selected':'');
    d.innerHTML = '<span class="cell-num">'+i+'</span><span>cell '+ i +'</span>';
    if(spans[i]) {
      if(spans[i].col > 1) d.style.gridColumn = 'span ' + spans[i].col;
      if(spans[i].row > 1) d.style.gridRow    = 'span ' + spans[i].row;
      d.innerHTML = '<span class="cell-num">'+i+'</span>' +
        '<span style="font-size:10px;color:#f59e0b">col×'+spans[i].col+' row×'+spans[i].row+'</span>';
    }
    d.addEventListener('click', () => { selectedCell = i; buildGrid(); updateSpanUI(i); });
    demo.appendChild(d);
  }

  document.getElementById('grid-css-out').textContent =
'.grid {\n  display: grid;\n  grid-template-columns: ' + cols + ';\n  grid-template-rows: ' + rows + ';\n  gap: ' + gap + 'px;\n}';
}

function updateSpanUI(i) {
  const sp = spans[i] || {col:1,row:1};
  document.getElementById('sel-col-span').value = sp.col;
  document.getElementById('sel-row-span').value = sp.row;
  document.getElementById('span-hint').textContent = 'Комірка ' + i;
}

function applySpan() {
  if(!selectedCell) return;
  const col = parseInt(document.getElementById('sel-col-span').value);
  const row = parseInt(document.getElementById('sel-row-span').value);
  spans[selectedCell] = { col, row };
  buildGrid();
}

function addCell()    { cellCount = Math.min(cellCount+1, 12); buildGrid(); }
function removeCell() { cellCount = Math.max(cellCount-1, 1);  buildGrid(); }

buildGrid();`,
    [
      { level:'easy',   uk:'Зміни кількість колонок та gap — спостерігай як grid автоматично перерозподіляє комірки.',  ru:'Измени количество колонок и gap — наблюдай как grid автоматически перераспределяет ячейки.' },
      { level:'medium', uk:'Клікни на комірку 1 і встанови col-span=2, row-span=2 — що відбувається? Чому інші комірки зміщуються?',  ru:'Кликни на ячейку 1 и установи col-span=2, row-span=2 — что происходит? Почему другие ячейки смещаются?' },
      { level:'hard',   uk:'Зроби layout: перша комірка займає 2 рядки (col 1, row-span 2), друга і третя — у col 2-3 ряд 1, четверта — col 2-3 ряд 2. Це класичний "magazine layout".',  ru:'Сделай layout: первая ячейка занимает 2 строки, вторая и третья — в col 2-3 ряд 1, четвёртая — col 2-3 ряд 2. Это "magazine layout".' },
    ]
  );

  /* ─── 02-08 ──────────────────────────────────────────────── */
  patch('02-08',
    { uk:`<h2>Flexbox: практичні сценарії та антипатерни</h2>
<p>Flexbox ідеальний для одновимірних layouts: рядків або стовпців. Знати коли його використовувати, а коли Grid — ключовий скілл.</p>
<h3>Flexbox vs Grid</h3>
<ul>
  <li><strong>Flexbox</strong> — коли розмір елементів визначається контентом (nav, toolbar, card row)</li>
  <li><strong>Grid</strong> — коли потрібна двовимірна сітка (layout сторінки, gallery)</li>
</ul>
<h3>Поширені сценарії</h3>
<pre>/* Горизонтальне меню */
nav { display:flex; gap:16px; align-items:center; }

/* Картка: іконка + текст */
.card { display:flex; gap:12px; align-items:flex-start; }

/* Sticky footer */
body { display:flex; flex-direction:column; min-height:100vh; }
main { flex:1; }  /* Займає весь вільний простір */

/* Центрування */
.center { display:flex; align-items:center; justify-content:center; }

/* Space-between навігація */
.header { display:flex; justify-content:space-between; align-items:center; }</pre>
<h3>Антипатерни</h3>
<ul>
  <li>❌ <code>flex: 0 0 auto</code> + фіксована ширина — краще просто задати width</li>
  <li>❌ Flexbox для складних 2D layouts — використовуй Grid</li>
  <li>❌ Вкладені flex + margin: auto — непередбачувано, краще gap</li>
  <li>❌ order: -1 — змінює порядок DOM, ламає accessibility</li>
</ul>`,
      ru:`<h2>Flexbox: практические сценарии</h2>
<pre>/* Горизонтальное меню */
nav { display:flex; gap:16px; align-items:center; }

/* Sticky footer */
body { display:flex; flex-direction:column; min-height:100vh; }
main { flex:1; }

/* Центрирование */
.center { display:flex; align-items:center; justify-content:center; }</pre>
<h3>Антипаттерны</h3>
<ul>
  <li>❌ Flexbox для сложных 2D layouts — используй Grid</li>
  <li>❌ order: -1 — ломает accessibility</li>
</ul>` },
    `<div class="flex-lab">
  <h2>💪 Flexbox Сценарії</h2>

  <!-- Живий редактор flex-контейнера -->
  <div class="flex-controls">
    <label>direction
      <select id="f-dir" onchange="updateFlex()">
        <option value="row">row</option>
        <option value="row-reverse">row-reverse</option>
        <option value="column">column</option>
        <option value="column-reverse">column-reverse</option>
      </select>
    </label>
    <label>justify-content
      <select id="f-jc" onchange="updateFlex()">
        <option value="flex-start">flex-start</option>
        <option value="flex-end">flex-end</option>
        <option value="center">center</option>
        <option value="space-between" selected>space-between</option>
        <option value="space-around">space-around</option>
        <option value="space-evenly">space-evenly</option>
      </select>
    </label>
    <label>align-items
      <select id="f-ai" onchange="updateFlex()">
        <option value="stretch" selected>stretch</option>
        <option value="flex-start">flex-start</option>
        <option value="center">center</option>
        <option value="flex-end">flex-end</option>
        <option value="baseline">baseline</option>
      </select>
    </label>
    <label>wrap
      <select id="f-wrap" onchange="updateFlex()">
        <option value="nowrap">nowrap</option>
        <option value="wrap" selected>wrap</option>
        <option value="wrap-reverse">wrap-reverse</option>
      </select>
    </label>
    <label>gap <span id="f-gap-v">16</span>px
      <input type="range" id="f-gap" min="0" max="32" value="16" oninput="updateFlex()">
    </label>
  </div>

  <div class="flex-container" id="flex-container">
    <div class="flex-item fi-1">A<br><small>flex: 1</small></div>
    <div class="flex-item fi-2">B<br><small>flex: 2</small></div>
    <div class="flex-item fi-3">C<br><small>auto</small></div>
    <div class="flex-item fi-4">D</div>
    <div class="flex-item fi-5">E</div>
  </div>
  <pre class="flex-out" id="flex-out"></pre>

  <!-- Реальні сценарії -->
  <div class="scenarios">
    <h3>Реальні сценарії</h3>
    <nav class="sc-nav">
      <span class="sc-logo">🌐 Brand</span>
      <div class="sc-links">
        <a href="#">Home</a><a href="#">About</a><a href="#">Work</a>
      </div>
      <button class="sc-cta">Contact</button>
    </nav>
    <div class="sc-cards">
      <div class="sc-card">
        <div class="sc-icon">🚀</div>
        <div class="sc-body">
          <strong>Швидкість</strong>
          <p>Іконка + текст поруч через flex</p>
        </div>
      </div>
      <div class="sc-card sc-card-end">
        <div class="sc-body"><strong>Ціна</strong><p>$99</p></div>
        <button class="sc-buy">Buy</button>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.flex-lab{max-width:560px}
.flex-controls{display:flex;flex-wrap:wrap;gap:8px;background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.flex-controls label{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b}
.flex-controls label span{min-width:20px;font-family:monospace;color:#94a3b8}
.flex-controls select{background:#0f172a;border:1px solid #334155;color:#f1f5f9;padding:5px 8px;border-radius:6px;font-size:12px;cursor:pointer}
.flex-controls input[type=range]{width:80px;accent-color:#3b82f6;cursor:pointer}

.flex-container{display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:stretch;background:#0f172a;border-radius:10px;padding:14px;min-height:80px;margin-bottom:8px;border:1px solid #1e293b;transition:.3s}
.flex-item{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px 16px;font-size:12px;font-weight:700;color:#f1f5f9;text-align:center;min-width:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;transition:.2s}
.flex-item small{font-weight:400;font-size:10px;color:#64748b}
.fi-1{flex:1;border-color:#3b82f6}.fi-2{flex:2;border-color:#8b5cf6}.fi-3{border-color:#10b981}

.flex-out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.7;overflow-x:auto;white-space:pre;margin-bottom:12px}

.scenarios h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:10px}
.sc-nav{display:flex;align-items:center;justify-content:space-between;background:#1e293b;border-radius:10px;padding:10px 16px;margin-bottom:8px}
.sc-logo{font-size:13px;font-weight:700;color:#f1f5f9}
.sc-links{display:flex;gap:14px}.sc-links a{color:#94a3b8;text-decoration:none;font-size:12px}
.sc-links a:hover{color:#3b82f6}
.sc-cta{padding:6px 14px;font-size:12px;background:#3b82f6;border:none;color:#fff;border-radius:6px;cursor:pointer}

.sc-cards{display:flex;gap:8px;flex-wrap:wrap}
.sc-card{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:12px;display:flex;align-items:flex-start;gap:10px;flex:1;min-width:200px}
.sc-card-end{justify-content:space-between;align-items:center}
.sc-icon{font-size:24px}
.sc-body strong{font-size:13px;color:#f1f5f9;display:block;margin-bottom:2px}
.sc-body p{font-size:11px;color:#64748b;margin:0}
.sc-buy{background:#3b82f6;border:none;color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px}`,
    `function updateFlex() {
  const dir  = document.getElementById('f-dir').value;
  const jc   = document.getElementById('f-jc').value;
  const ai   = document.getElementById('f-ai').value;
  const wrap = document.getElementById('f-wrap').value;
  const gap  = document.getElementById('f-gap').value;
  document.getElementById('f-gap-v').textContent = gap;
  const c = document.getElementById('flex-container');
  c.style.flexDirection    = dir;
  c.style.justifyContent   = jc;
  c.style.alignItems       = ai;
  c.style.flexWrap         = wrap;
  c.style.gap              = gap + 'px';
  document.getElementById('flex-out').textContent =
\`.container {
  display: flex;
  flex-direction: \${dir};
  justify-content: \${jc};
  align-items: \${ai};
  flex-wrap: \${wrap};
  gap: \${gap}px;
}\`;
}
updateFlex();`,
    [
      { level:'easy',   uk:'Встанови direction=column, justify-content=center — що стало? Чому вісь justify тепер вертикальна?',  ru:'Установи direction=column, justify-content=center — что стало? Почему ось justify теперь вертикальна?' },
      { level:'medium', uk:'Зроби "sticky footer": поміняй .flex-container на flex-direction:column, min-height:200px та додай flex:1 до .fi-3.',  ru:'Сделай "sticky footer": измени flex-direction:column, min-height:200px и добавь flex:1 к .fi-3.' },
      { level:'hard',   uk:'justify-content: space-between + gap = баги. Відкрий DevTools і поясни чому gap і space-between разом дають подвійні відступи між елементами.',  ru:'justify-content: space-between + gap — объясни почему они дают двойные отступы между элементами.' },
    ]
  );

  /* ─── 02-09 ──────────────────────────────────────────────── */
  patch('02-09',
    { uk:`<h2>CSS Scroll Snap: плавна прокрутка</h2>
<p>Scroll Snap — нативний CSS-механізм для "примагнічування" прокрутки до позицій без JavaScript.</p>
<h3>Контейнер</h3>
<pre>.scroll-container {
  overflow-x: scroll; /* або -y */
  scroll-snap-type: x mandatory;
  /* mandatory — обов'язково прилипати */
  /* proximity — прилипати якщо близько */
}</pre>
<h3>Дочірні елементи</h3>
<pre>.slide {
  scroll-snap-align: start; /* start | center | end */
  scroll-snap-stop: always; /* не пропускати слайди */
}</pre>
<h3>Vertical snap</h3>
<pre>.sections {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.section {
  height: 100vh;
  scroll-snap-align: start;
}</pre>
<h3>JS + Scroll Snap</h3>
<pre>// Програмний скрол до слайду:
element.scrollIntoView({ behavior: 'smooth', block: 'start' });

// Або:
container.scrollTo({ left: slideWidth * index, behavior: 'smooth' });</pre>`,
      ru:`<h2>CSS Scroll Snap</h2>
<pre>.container {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
.slide {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}</pre>
<h3>Вертикальный snap</h3>
<pre>.sections {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.section { height: 100vh; scroll-snap-align: start; }</pre>` },
    `<div class="snap-lab">
  <h2>📜 Scroll Snap</h2>

  <!-- Горизонтальний слайдер -->
  <div class="slider-wrap">
    <div class="snap-slider" id="snap-slider">
      <div class="snap-slide s1">
        <div class="sl-num">01</div>
        <div class="sl-title">HTML5 Семантика</div>
        <div class="sl-sub">article, section, aside, figure</div>
      </div>
      <div class="snap-slide s2">
        <div class="sl-num">02</div>
        <div class="sl-title">CSS3 Майстерність</div>
        <div class="sl-sub">clip-path, filters, custom properties</div>
      </div>
      <div class="snap-slide s3">
        <div class="sl-num">03</div>
        <div class="sl-title">JavaScript DOM</div>
        <div class="sl-sub">Events, Selectors, Manipulation</div>
      </div>
      <div class="snap-slide s4">
        <div class="sl-num">04</div>
        <div class="sl-title">API & Fetch</div>
        <div class="sl-sub">REST, JSON, async/await</div>
      </div>
      <div class="snap-slide s5">
        <div class="sl-num">05</div>
        <div class="sl-title">Фінальний проект</div>
        <div class="sl-sub">Повноцінний вебзастосунок</div>
      </div>
    </div>
    <!-- Навігація -->
    <div class="slider-nav">
      <button onclick="slideTo(-1)">←</button>
      <div class="slider-dots" id="slider-dots"></div>
      <button onclick="slideTo(1)">→</button>
    </div>
  </div>

  <!-- Налаштування -->
  <div class="snap-controls">
    <label>scroll-snap-type
      <select id="sn-type" onchange="updateSnap()">
        <option value="x mandatory" selected>x mandatory</option>
        <option value="x proximity">x proximity</option>
        <option value="none">none (вимкнено)</option>
      </select>
    </label>
    <label>scroll-snap-align
      <select id="sn-align" onchange="updateSnap()">
        <option value="start" selected>start</option>
        <option value="center">center</option>
        <option value="end">end</option>
      </select>
    </label>
    <label><input type="checkbox" id="sn-stop" checked onchange="updateSnap()"> scroll-snap-stop: always</label>
  </div>
  <pre id="snap-out" class="snap-code"></pre>
</div>`,
    `${BASE}
.snap-lab{max-width:540px}
.slider-wrap{margin-bottom:12px}
.snap-slider{
  display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;
  gap:0;border-radius:12px;scrollbar-width:none;
  scroll-behavior:smooth;
}
.snap-slider::-webkit-scrollbar{display:none}
.snap-slide{
  min-width:100%;height:160px;scroll-snap-align:start;scroll-snap-stop:always;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  border-radius:12px;flex-shrink:0;gap:6px;
}
.s1{background:linear-gradient(135deg,#1d4ed8,#7c3aed)}
.s2{background:linear-gradient(135deg,#0d9488,#1d4ed8)}
.s3{background:linear-gradient(135deg,#d97706,#dc2626)}
.s4{background:linear-gradient(135deg,#7c3aed,#db2777)}
.s5{background:linear-gradient(135deg,#059669,#3b82f6)}
.sl-num{font-size:36px;font-weight:900;opacity:.3;line-height:1}
.sl-title{font-size:18px;font-weight:700;color:#fff}
.sl-sub{font-size:12px;color:rgba(255,255,255,.7)}

.slider-nav{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:8px}
.slider-nav button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}
.slider-nav button:hover{border-color:#3b82f6}
.slider-dots{display:flex;gap:6px}
.dot{width:8px;height:8px;border-radius:50%;background:#334155;cursor:pointer;transition:.2s}
.dot.active{background:#3b82f6;width:20px;border-radius:4px}

.snap-controls{display:flex;flex-wrap:wrap;gap:10px;background:#1e293b;border-radius:10px;padding:12px;margin-bottom:8px}
.snap-controls label{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b;cursor:pointer}
.snap-controls select{background:#0f172a;border:1px solid #334155;color:#f1f5f9;padding:5px 8px;border-radius:6px;font-size:12px;cursor:pointer}
.snap-controls input[type=checkbox]{accent-color:#3b82f6}
.snap-code{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.7;overflow-x:auto;white-space:pre}`,
    `const slider = document.getElementById('snap-slider');
const slides = slider.querySelectorAll('.snap-slide');
let currentSlide = 0;

// Dots
const dotsEl = document.getElementById('slider-dots');
slides.forEach((_,i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i===0?' active':'');
  d.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(d);
});

function goTo(idx) {
  currentSlide = Math.max(0, Math.min(idx, slides.length-1));
  slider.scrollTo({ left: currentSlide * slider.clientWidth, behavior: 'smooth' });
  dotsEl.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('active', i===currentSlide));
}

function slideTo(delta) { goTo(currentSlide + delta); }

slider.addEventListener('scroll', () => {
  const idx = Math.round(slider.scrollLeft / slider.clientWidth);
  if(idx !== currentSlide) { currentSlide = idx; dotsEl.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('active', i===idx)); }
});

function updateSnap() {
  const type  = document.getElementById('sn-type').value;
  const align = document.getElementById('sn-align').value;
  const stop  = document.getElementById('sn-stop').checked;
  slider.style.scrollSnapType = type;
  slides.forEach(s => {
    s.style.scrollSnapAlign = align;
    s.style.scrollSnapStop  = stop ? 'always' : 'normal';
  });
  document.getElementById('snap-out').textContent =
\`.slider {
  overflow-x: scroll;
  scroll-snap-type: \${type};
}
.slide {
  scroll-snap-align: \${align};
  scroll-snap-stop: \${stop ? 'always' : 'normal'};
}\`;
}
updateSnap();`,
    [
      { level:'easy',   uk:'Тягни слайдер пальцем/мишею — відчуй магніт. Натисни стрілки і точки.',  ru:'Тащи слайдер мышью — почувствуй магнит. Нажимай стрелки и точки.' },
      { level:'medium', uk:'Переключи scroll-snap-type на "x proximity" — відчуй різницю: тепер snap спрацьовує тільки якщо ти близько до межі слайду.',  ru:'Переключи scroll-snap-type на "x proximity" — почувствуй разницу: snap срабатывает только если ты близко к границе.' },
      { level:'hard',   uk:'Додай 6-й слайд "Deployment & CI/CD" з класом s6 і новим градієнтом — переконайся що dots та навігація автоматично включили його.',  ru:'Добавь 6-й слайд "Deployment & CI/CD" с классом s6 и новым градиентом — убедись что dots и навигация автоматически включили его.' },
    ]
  );

  /* ─── 02-10 ──────────────────────────────────────────────── */
  patch('02-10',
    { uk:`<h2>Container Queries: @container</h2>
<p>Container Queries — революція у адаптивному дизайні. Компонент реагує на розмір <strong>свого контейнера</strong>, а не вікна браузера.</p>
<h3>Чому це краще ніж @media?</h3>
<ul>
  <li>@media залежить від ширини вікна (viewport)</li>
  <li>@container залежить від ширини батьківського елемента</li>
  <li>Компонент стає по-справжньому повторно використовуваним</li>
</ul>
<h3>Синтаксис</h3>
<pre>/* 1. Оголосити контейнер */
.card-wrapper {
  container-type: inline-size; /* або size */
  container-name: card;  /* необов'язково */
}

/* 2. Писати правила */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (min-width: 300px) {
  .card-title { font-size: 20px; }
}</pre>
<h3>Підтримка</h3>
<ul>
  <li>Chrome 105+, Firefox 110+, Safari 16+ (> 92% браузерів)</li>
  <li>Поліфіл: container-query-polyfill від Google</li>
</ul>`,
      ru:`<h2>Container Queries: @container</h2>
<p>Компонент реагирует на размер <strong>своего контейнера</strong>, а не окна браузера.</p>
<pre>/* 1. Объявить контейнер */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 2. Писать правила */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (min-width: 300px) {
  .card-title { font-size: 20px; }
}</pre>` },
    `<div class="cq-lab">
  <h2>📦 Container Queries</h2>

  <div class="resize-demo">
    <div class="resize-header">
      <span>Тягни правий край щоб змінити ширину контейнера →</span>
      <span id="cq-width-label">— px</span>
    </div>
    <div class="cq-wrapper" id="cq-wrapper">
      <div class="cq-card">
        <div class="cq-img">🚀</div>
        <div class="cq-body">
          <div class="cq-badge">CSS Module</div>
          <div class="cq-title">Container Queries</div>
          <div class="cq-desc">Цей компонент змінює layout залежно від ширини свого контейнера, а не viewport!</div>
          <div class="cq-actions">
            <button>Детальніше</button>
            <button class="cq-sec">Поділитись</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cq-breakpoints">
      <span class="bp" id="bp-xs">XS &lt;200</span>
      <span class="bp" id="bp-sm">SM &lt;360</span>
      <span class="bp" id="bp-md">MD &lt;480</span>
      <span class="bp active" id="bp-lg">LG 480+</span>
    </div>
  </div>

  <div class="cq-code">
    <h3>CSS Container Query</h3>
    <pre class="cq-pre">.cq-wrapper {
  container-type: inline-size;
  container-name: card-cq;
}

/* XS: тільки текст */
@container card-cq (max-width: 199px) {
  .cq-img, .cq-actions { display: none; }
  .cq-title { font-size: 13px; }
}

/* SM: вертикально */
@container card-cq (max-width: 359px) {
  .cq-card { flex-direction: column; }
}

/* MD+: горизонтально */
@container card-cq (min-width: 360px) {
  .cq-card { flex-direction: row; }
}

/* LG: великий шрифт */
@container card-cq (min-width: 480px) {
  .cq-title { font-size: 22px; }
  .cq-img { font-size: 48px; }
}</pre>
  </div>
</div>`,
    `${BASE}
.cq-lab{max-width:540px}
.resize-demo{margin-bottom:14px}
.resize-header{display:flex;justify-content:space-between;font-size:12px;color:#64748b;margin-bottom:8px}
#cq-width-label{font-family:monospace;color:#3b82f6;font-weight:700}

.cq-wrapper{
  container-type:inline-size;container-name:card-cq;
  resize:horizontal;overflow:hidden;
  background:#0f172a;border-radius:12px;border:2px dashed #334155;
  padding:12px;max-width:100%;min-width:160px;
}
.cq-card{
  display:flex;gap:12px;background:#1e293b;border-radius:10px;padding:14px;
  align-items:flex-start;transition:.3s;
}
.cq-img{font-size:28px;flex-shrink:0;transition:.3s}
.cq-body{flex:1;min-width:0}
.cq-badge{font-size:10px;background:rgba(59,130,246,.15);color:#3b82f6;border:1px solid rgba(59,130,246,.3);border-radius:4px;padding:2px 6px;display:inline-block;margin-bottom:4px}
.cq-title{font-size:15px;font-weight:700;color:#f1f5f9;margin-bottom:4px;transition:.3s}
.cq-desc{font-size:12px;color:#64748b;line-height:1.5;margin-bottom:8px}
.cq-actions{display:flex;gap:6px;flex-wrap:wrap}
.cq-actions button{padding:5px 12px;font-size:11px}
.cq-sec{background:transparent;color:#3b82f6;border-color:#3b82f6}

/* Container Queries */
@container card-cq (max-width: 199px) {
  .cq-img,.cq-actions,.cq-badge,.cq-desc{display:none}
  .cq-title{font-size:13px}
  .cq-card{padding:10px}
}
@container card-cq (min-width:200px) and (max-width:359px) {
  .cq-card{flex-direction:column}
  .cq-title{font-size:15px}
}
@container card-cq (min-width:360px) {
  .cq-card{flex-direction:row}
}
@container card-cq (min-width:480px) {
  .cq-title{font-size:22px}
  .cq-img{font-size:48px}
}

.cq-breakpoints{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.bp{font-size:11px;padding:3px 8px;border-radius:4px;background:#1e293b;border:1px solid #334155;color:#64748b;transition:.2s}
.bp.active{background:rgba(59,130,246,.15);border-color:#3b82f6;color:#93c5fd}

.cq-code h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:6px}
.cq-pre{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:12px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.7;overflow-x:auto;white-space:pre;max-height:200px;overflow-y:auto}`,
    `const wrapper = document.getElementById('cq-wrapper');
const label   = document.getElementById('cq-width-label');
const bps     = { xs: document.getElementById('bp-xs'), sm: document.getElementById('bp-sm'), md: document.getElementById('bp-md'), lg: document.getElementById('bp-lg') };

const ro = new ResizeObserver(entries => {
  for(const e of entries) {
    const w = Math.round(e.contentRect.width);
    label.textContent = w + 'px';
    Object.values(bps).forEach(b => b.classList.remove('active'));
    if(w < 200)      bps.xs.classList.add('active');
    else if(w < 360) bps.sm.classList.add('active');
    else if(w < 480) bps.md.classList.add('active');
    else             bps.lg.classList.add('active');
  }
});
ro.observe(wrapper);`,
    [
      { level:'easy',   uk:'Тягни правий край контейнера ліворуч — поспостерігай як картка змінює layout: XS→SM→MD→LG.',  ru:'Тащи правый край контейнера влево — наблюдай как карточка меняет layout: XS→SM→MD→LG.' },
      { level:'medium', uk:'Поясни різницю: якщо б це було @media (max-width:360px) замість @container — як би поводився компонент у сайдбарі 250px?',  ru:'Объясни разницу: если бы это было @media (max-width:360px) вместо @container — как бы компонент вёл себя в сайдбаре 250px?' },
      { level:'hard',   uk:'Додай ще одну breakpoint: @container card-cq (min-width:600px) де .cq-img отримує font-size:64px і власний рядок flex-direction:column.',  ru:'Добавь breakpoint: @container card-cq (min-width:600px) где .cq-img получает font-size:64px.' },
    ]
  );

  /* ─── 02-11 ──────────────────────────────────────────────── */
  patch('02-11',
    { uk:`<h2>CSS Логічні властивості</h2>
<p>Логічні властивості (Logical Properties) замінюють фізичні (left/right/top/bottom) на логічні (start/end/inline/block), що автоматично адаптуються до напрямку тексту (LTR/RTL) та режиму запису (горизонтальний/вертикальний).</p>
<h3>Маппінг LTR (зліва направо)</h3>
<pre>margin-left    → margin-inline-start
margin-right   → margin-inline-end
margin-top     → margin-block-start
margin-bottom  → margin-block-end

padding-left   → padding-inline-start
border-left    → border-inline-start

width          → inline-size
height         → block-size

top / bottom   → inset-block-start / inset-block-end
left / right   → inset-inline-start / inset-inline-end</pre>
<h3>Скорочення</h3>
<pre>margin-inline: 16px;           /* = margin-left + margin-right */
margin-block: 8px 24px;        /* = margin-top + margin-bottom */
padding-inline: 12px 20px;     /* start end */
inset: 0;                      /* = top+right+bottom+left */
inset-inline: 0;               /* = left + right */</pre>
<h3>Коли використовувати?</h3>
<ul>
  <li>Мультимовні сайти (uk/ar/he — RTL-мови)</li>
  <li>Вертикальні режими запису (японська, китайська)</li>
  <li>Бібліотеки компонентів (широке поширення)</li>
</ul>`,
      ru:`<h2>CSS Логические свойства</h2>
<pre>margin-left    → margin-inline-start
margin-right   → margin-inline-end
margin-top     → margin-block-start
margin-bottom  → margin-block-end

width          → inline-size
height         → block-size

inset: 0;          /* = top+right+bottom+left */
margin-inline: 16px; /* left + right */
padding-block: 8px;  /* top + bottom */</pre>` },
    `<div class="logic-lab">
  <h2>↔️ Логічні властивості CSS</h2>

  <!-- LTR / RTL демо -->
  <div class="dir-demo">
    <div class="dir-controls">
      <button onclick="setDir('ltr')" id="btn-ltr" class="active">← LTR (英/UA)</button>
      <button onclick="setDir('rtl')" id="btn-rtl">RTL (عربي) →</button>
    </div>

    <div class="dir-container" id="dir-container" dir="ltr">
      <nav class="logic-nav">
        <span class="ln-logo">🌐 Brand</span>
        <div class="ln-links">
          <a href="#">Home</a>
          <a href="#">About</a>
        </div>
        <button class="ln-btn">Contact</button>
      </nav>
      <div class="logic-card">
        <div class="lc-icon">📰</div>
        <div class="lc-body">
          <div class="lc-title">Стаття про CSS</div>
          <div class="lc-text">Цей текст і відступи автоматично перевертаються для RTL мов через логічні властивості CSS.</div>
        </div>
      </div>
      <div class="logic-form">
        <label>Пошук</label>
        <div class="lf-wrap">
          <input type="search" placeholder="Введіть запит...">
          <button>🔍</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Компаратор фізичних vs логічних -->
  <div class="comparator">
    <h3>Порівняння: фізичні vs логічні</h3>
    <div class="comp-grid">
      <div class="comp-col">
        <div class="comp-head bad">❌ Фізичні</div>
        <pre class="comp-code">margin-left: 16px;
padding-right: 12px;
border-left: 3px solid;
text-align: left;
width: 200px;
left: 0;</pre>
      </div>
      <div class="comp-col">
        <div class="comp-head good">✅ Логічні</div>
        <pre class="comp-code">margin-inline-start: 16px;
padding-inline-end: 12px;
border-inline-start: 3px solid;
text-align: start;
inline-size: 200px;
inset-inline-start: 0;</pre>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.logic-lab{max-width:540px}
.dir-demo{background:#1e293b;border-radius:12px;padding:14px;margin-bottom:12px}
.dir-controls{display:flex;gap:8px;margin-bottom:12px}
.dir-controls button{flex:1;padding:7px}
.dir-controls button.active{background:#1d4ed8;border-color:#3b82f6;color:#fff}

.dir-container{display:flex;flex-direction:column;gap:10px;transition:.3s}

.logic-nav{display:flex;align-items:center;background:#0f172a;border-radius:8px;padding:10px 14px;gap:auto}
.ln-logo{font-size:13px;font-weight:700;color:#f1f5f9;margin-inline-end:auto}
.ln-links{display:flex;gap:12px;margin-inline-end:12px}
.ln-links a{color:#94a3b8;text-decoration:none;font-size:12px}
.ln-btn{padding:5px 12px;font-size:12px;background:#3b82f6;border:none;color:#fff;border-radius:6px;cursor:pointer}

.logic-card{display:flex;gap:12px;background:#0f172a;border-radius:8px;padding:12px;border-inline-start:3px solid #3b82f6}
.lc-icon{font-size:24px;flex-shrink:0}
.lc-title{font-size:14px;font-weight:700;color:#f1f5f9;margin-block-end:4px}
.lc-text{font-size:12px;color:#64748b;line-height:1.5}

.logic-form label{display:block;font-size:12px;color:#64748b;margin-block-end:6px}
.lf-wrap{display:flex;gap:6px}
.lf-wrap input{flex:1;margin:0;padding-inline:12px;font-size:12px}
.lf-wrap button{padding:8px 12px;font-size:14px;background:#1e293b;border:1px solid #334155;border-radius:8px;cursor:pointer;color:#f1f5f9}

.comparator{background:#1e293b;border-radius:12px;padding:14px}
.comparator h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:10px}
.comp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.comp-head{font-size:11px;font-weight:700;padding:4px 8px;border-radius:4px;margin-bottom:6px}
.comp-head.bad{background:rgba(248,113,113,.1);color:#f87171}
.comp-head.good{background:rgba(34,197,94,.1);color:#4ade80}
.comp-code{background:#0f172a;border-radius:6px;padding:8px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.7;overflow-x:auto;white-space:pre;border:1px solid #1e293b}`,
    `function setDir(d) {
  document.getElementById('dir-container').setAttribute('dir', d);
  document.getElementById('btn-ltr').classList.toggle('active', d==='ltr');
  document.getElementById('btn-rtl').classList.toggle('active', d==='rtl');
}`,
    [
      { level:'easy',   uk:'Натисни "RTL (عربي)" — поспостерігай як навігація, картка і форма перевертаються.',  ru:'Нажми "RTL (عربي)" — наблюдай как навигация, карточка и форма переворачиваются.' },
      { level:'medium', uk:'У секції логічних властивостей знайди border-inline-start у CSS і поясни чому вона стає border-inline-end при RTL.',  ru:'Найди border-inline-start в CSS и объясни почему она становится border-inline-end при RTL.' },
      { level:'hard',   uk:'Додай третю кнопку "Vertical (日本語)" що встановлює writing-mode: vertical-rl на .dir-container — подивись що відбувається з block/inline осями.',  ru:'Добавь кнопку "Vertical" с writing-mode: vertical-rl на .dir-container — посмотри что происходит с block/inline осями.' },
    ]
  );

  /* ─── 02-12 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('02-12',
    { uk:`<h2>ПРОЕКТ: Дизайн-система з Custom Properties та темами</h2>
<p>Побудуй повноцінну міні-дизайн-систему: токени, компоненти, темна/світла теми.</p>
<h3>Що повинно бути</h3>
<ul>
  <li><strong>:root токени</strong> — мінімум 8 CSS змінних (colors, spacing, radii, shadows)</li>
  <li><strong>2 теми</strong> — dark (за замовчуванням) + light (через [data-theme="light"])</li>
  <li><strong>Компоненти</strong> — кнопка (3 варіанти: primary/secondary/ghost), картка, badge, input, avatar</li>
  <li><strong>Container Query</strong> — картка змінює layout залежно від контейнера</li>
  <li><strong>Логічні властивості</strong> — margin-inline, padding-block, border-inline-start</li>
  <li><strong>Перемикач теми</strong> — кнопка що toggles data-theme</li>
</ul>
<h3>Вимоги до CSS</h3>
<ul>
  <li>Специфічність &lt; (0,2,0) скрізь — не використовуй ID у CSS</li>
  <li>Мінімум 2 псевдоелементи ::before / ::after</li>
  <li>Мінімум 1 складний селектор :has() або :not()</li>
  <li>box-shadow через токен: --shadow-md</li>
</ul>`,
      ru:`<h2>ПРОЕКТ: Дизайн-система</h2>
<h3>Требования</h3>
<ul>
  <li>:root токены — минимум 8 переменных (colors, spacing, radius, shadows)</li>
  <li>2 темы — dark + light через [data-theme="light"]</li>
  <li>Компоненты — кнопка (3 варианта), карточка, badge, input, avatar</li>
  <li>Container Query — карточка меняет layout по контейнеру</li>
  <li>Логические свойства — margin-inline, padding-block</li>
  <li>Переключатель темы</li>
</ul>` },
    `<!DOCTYPE html>
<html lang="uk" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Дизайн-система</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="ds-header">
    <div class="ds-logo">
      <span class="ds-logo-icon">⬡</span>
      <span class="ds-logo-text">DesignSystem</span>
      <span class="ds-version">v1.0</span>
    </div>
    <button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()" aria-label="Змінити тему">
      <span class="tt-icon">🌙</span>
      <span class="tt-label">Dark</span>
    </button>
  </div>

  <!-- Токени -->
  <section class="ds-section">
    <h2 class="ds-section-title">Кольорові токени</h2>
    <div class="token-swatches">
      <div class="swatch" style="--sw-color:var(--color-primary)">primary</div>
      <div class="swatch" style="--sw-color:var(--color-accent)">accent</div>
      <div class="swatch" style="--sw-color:var(--color-success)">success</div>
      <div class="swatch" style="--sw-color:var(--color-warn)">warning</div>
      <div class="swatch" style="--sw-color:var(--color-danger)">danger</div>
      <div class="swatch" style="--sw-color:var(--bg2)">surface</div>
    </div>
  </section>

  <!-- Кнопки -->
  <section class="ds-section">
    <h2 class="ds-section-title">Кнопки</h2>
    <div class="ds-row">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-ghost">Ghost</button>
      <button class="btn btn-primary btn-sm">Small</button>
      <button class="btn btn-primary" disabled>Disabled</button>
    </div>
  </section>

  <!-- Badges -->
  <section class="ds-section">
    <h2 class="ds-section-title">Badges</h2>
    <div class="ds-row">
      <span class="badge badge-primary">New</span>
      <span class="badge badge-success">Active</span>
      <span class="badge badge-warn">Beta</span>
      <span class="badge badge-danger">Deprecated</span>
    </div>
  </section>

  <!-- Картки з Container Query -->
  <section class="ds-section">
    <h2 class="ds-section-title">Картки (Container Query)</h2>
    <p class="ds-hint">Ширина першої картки обмежена 220px, другої — необмежена</p>
    <div class="cards-demo">
      <div class="card-cq-wrap narrow">
        <div class="cq-card">
          <div class="cq-card-img">🎨</div>
          <div class="cq-card-body">
            <div class="cq-card-title">Вузька картка</div>
            <div class="cq-card-text">Вертикальний layout ≤340px</div>
            <span class="badge badge-primary">CSS</span>
          </div>
        </div>
      </div>
      <div class="card-cq-wrap">
        <div class="cq-card">
          <div class="cq-card-img">🚀</div>
          <div class="cq-card-body">
            <div class="cq-card-title">Широка картка</div>
            <div class="cq-card-text">Горизонтальний layout >340px</div>
            <span class="badge badge-success">Grid</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Форма -->
  <section class="ds-section">
    <h2 class="ds-section-title">Форма</h2>
    <form class="ds-form" onsubmit="return false">
      <div class="form-group">
        <label class="form-label" for="ds-name">Ім'я</label>
        <input class="form-input" id="ds-name" type="text" placeholder="Іван Коваленко" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="ds-email">Email</label>
        <input class="form-input" id="ds-email" type="email" placeholder="user@example.com" required>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Зберегти</button>
        <button class="btn btn-ghost" type="reset">Скинути</button>
      </div>
    </form>
  </section>
  <script src="script.js"></script>
</body>
</html>`,
    `/* ─── Токени ─────────────────────────────────────────────── */
*{box-sizing:border-box;margin:0;padding:0}
:root {
  --color-primary:  #3b82f6;
  --color-accent:   #8b5cf6;
  --color-success:  #10b981;
  --color-warn:     #f59e0b;
  --color-danger:   #ef4444;

  --bg:    #0f172a;
  --bg2:   #1e293b;
  --bg3:   #283a51;
  --border:#334155;
  --text:  #f1f5f9;
  --muted: #64748b;

  --radius-sm:  6px;
  --radius-md:  10px;
  --radius-lg:  16px;
  --space-xs:   6px;
  --space-sm:   10px;
  --space-md:   16px;
  --space-lg:   24px;

  --shadow-sm: 0 2px 4px rgba(0,0,0,.3);
  --shadow-md: 0 4px 20px rgba(0,0,0,.4);
}

:root[data-theme="light"] {
  --bg:    #f8fafc;
  --bg2:   #ffffff;
  --bg3:   #f1f5f9;
  --border:#e2e8f0;
  --text:  #0f172a;
  --muted: #94a3b8;
  --shadow-md: 0 4px 20px rgba(0,0,0,.12);
}

/* ─── Base ──────────────────────────────────────────────────── */
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);padding:var(--space-md);transition:background .3s,color .3s;max-width:600px}
*:focus{outline:2px solid var(--color-primary);outline-offset:2px}

/* ─── Header ────────────────────────────────────────────────── */
.ds-header{display:flex;align-items:center;justify-content:space-between;padding-block:var(--space-sm);border-block-end:1px solid var(--border);margin-block-end:var(--space-lg)}
.ds-logo{display:flex;align-items:center;gap:8px}
.ds-logo-icon{font-size:20px;color:var(--color-primary)}
.ds-logo-text{font-size:15px;font-weight:700;color:var(--text)}
.ds-version{font-size:10px;color:var(--muted);background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:2px 6px}

.theme-toggle{display:flex;align-items:center;gap:6px;padding:7px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-md);color:var(--text);cursor:pointer;font-size:13px;font-family:inherit;transition:.2s}
.theme-toggle:hover{border-color:var(--color-primary)}

/* ─── Sections ─────────────────────────────────────────────── */
.ds-section{margin-block-end:var(--space-lg)}
.ds-section-title{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-block-end:var(--space-sm);display:flex;align-items:center;gap:8px}
.ds-section-title::before{content:'';display:block;inline-size:3px;block-size:14px;background:var(--color-primary);border-radius:2px}
.ds-hint{font-size:12px;color:var(--muted);margin-block-end:10px}
.ds-row{display:flex;gap:var(--space-sm);flex-wrap:wrap;align-items:center}

/* ─── Swatches ─────────────────────────────────────────────── */
.token-swatches{display:flex;gap:8px;flex-wrap:wrap}
.swatch{inline-size:70px;block-size:50px;border-radius:var(--radius-md);background:var(--sw-color);display:flex;align-items:flex-end;justify-content:center;padding-block-end:4px;font-size:10px;color:rgba(255,255,255,.8);font-weight:600;position:relative;overflow:hidden;box-shadow:var(--shadow-sm)}
.swatch::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.3))}

/* ─── Buttons ──────────────────────────────────────────────── */
.btn{padding:9px 18px;border-radius:var(--radius-md);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:.2s;border:none;position:relative;overflow:hidden}
.btn::after{content:'';position:absolute;inset:0;opacity:0;background:rgba(255,255,255,.15);transition:.2s}
.btn:hover:not(:disabled)::after{opacity:1}
.btn:disabled{opacity:.4;cursor:not-allowed}
.btn.btn-sm{padding:5px 12px;font-size:12px}

.btn-primary{background:var(--color-primary);color:#fff;box-shadow:var(--shadow-sm)}
.btn-secondary{background:var(--bg2);color:var(--text);border:1px solid var(--border)}
.btn-secondary:hover:not(:disabled){border-color:var(--color-primary)}
.btn-ghost{background:transparent;color:var(--color-primary);border:1px solid var(--color-primary)}

/* ─── Badges ──────────────────────────────────────────────── */
.badge{display:inline-flex;align-items:center;padding:3px 8px;border-radius:var(--radius-sm);font-size:11px;font-weight:700;letter-spacing:.02em}
.badge-primary{background:rgba(59,130,246,.12);color:var(--color-primary);border:1px solid rgba(59,130,246,.25)}
.badge-success{background:rgba(16,185,129,.12);color:var(--color-success);border:1px solid rgba(16,185,129,.25)}
.badge-warn{background:rgba(245,158,11,.12);color:var(--color-warn);border:1px solid rgba(245,158,11,.25)}
.badge-danger{background:rgba(239,68,68,.12);color:var(--color-danger);border:1px solid rgba(239,68,68,.25)}

/* ─── Cards (Container Query) ─────────────────────────────── */
.cards-demo{display:flex;gap:12px;flex-wrap:wrap}
.card-cq-wrap{flex:1;min-width:0;container-type:inline-size;container-name:ds-card}
.card-cq-wrap.narrow{max-inline-size:240px}
.cq-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:var(--space-md);display:flex;gap:12px;flex-direction:column;box-shadow:var(--shadow-md);transition:.3s;border-inline-start:3px solid var(--color-primary)}
.cq-card-img{font-size:28px}
.cq-card-title{font-size:14px;font-weight:700;color:var(--text);margin-block-end:4px}
.cq-card-text{font-size:12px;color:var(--muted);margin-block-end:8px;line-height:1.5}

@container ds-card (min-width: 341px) {
  .cq-card{flex-direction:row;align-items:flex-start}
  .cq-card-img{font-size:36px;flex-shrink:0}
}

/* ─── Form ─────────────────────────────────────────────────── */
.ds-form{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:var(--space-md);max-inline-size:380px;box-shadow:var(--shadow-md)}
.form-group{margin-block-end:var(--space-sm)}
.form-label{display:block;font-size:12px;font-weight:600;color:var(--muted);margin-block-end:5px}
.form-input{inline-size:100%;background:var(--bg);border:1px solid var(--border);color:var(--text);padding:9px 12px;border-radius:var(--radius-md);font-size:13px;font-family:inherit;transition:.2s}
.form-input:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px rgba(59,130,246,.15)}
.form-input:invalid:not(:placeholder-shown){border-color:var(--color-danger)}
.ds-form:has(input:invalid) .form-actions .btn-primary{opacity:.6;pointer-events:none}
.form-actions{display:flex;gap:var(--space-xs);margin-block-start:var(--space-md)}`,
    `function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  document.querySelector('.tt-icon').textContent = isLight ? '🌙' : '☀️';
  document.querySelector('.tt-label').textContent = isLight ? 'Dark' : 'Light';
}`,
    [
      { level:'easy',   uk:'Натисни "Dark/Light" — спостерігай як всі токени перемикаються одночасно. Порахуй скільки CSS-змінних змінюється.',  ru:'Нажми "Dark/Light" — наблюдай как все токены переключаются одновременно. Посчитай сколько CSS-переменных меняется.' },
      { level:'medium', uk:'Знайди правило ds-form:has(input:invalid) у CSS — поясни що воно робить. Введи невалідний email і перевір.',  ru:'Найди правило ds-form:has(input:invalid) в CSS — объясни что оно делает. Введи невалидный email и проверь.' },
      { level:'hard',   uk:'Додай 4-й варіант кнопки btn-danger (фон --color-danger) і компонент Avatar (ініціали у круглому div з --color-accent фоном).',  ru:'Добавь 4-й вариант кнопки btn-danger и компонент Avatar (инициалы в круглом div с --color-accent фоном).' },
    ]
  );

})();
