/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 06 — Адаптивний дизайн · 10–14 Веб-Розробник
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
h3{font-size:11px;color:#64748b;margin-bottom:8px;letter-spacing:.04em;text-transform:uppercase}
p{font-size:13px;color:#94a3b8;line-height:1.65;margin-bottom:8px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
button:hover{border-color:#3b82f6;color:#93c5fd}
input,select{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:8px 12px;border-radius:8px;font-size:13px;font-family:inherit;transition:.2s}
input:focus,select:focus{outline:none;border-color:#3b82f6}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}
pre.out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:12px;font-family:monospace;color:#94a3b8;min-height:36px;white-space:pre-wrap}`;

  /* ─── 06-01 ──────────────────────────────────────────────── */
  patch('06-01',
    { uk:`<h2>Viewport units: vw, vh, vmin, vmax, dvh, svh</h2>
<pre>/* Класичні viewport units */
1vw  = 1% ширини viewport
1vh  = 1% висоти viewport
1vmin = 1% меншого (vw або vh)
1vmax = 1% більшого

/* Практичне застосування */
.hero { height: 100vh; }      /* на весь екран */
.font { font-size: 5vw; }     /* fluid text */
.square { width: 50vmin; height: 50vmin; } /* завжди квадрат */

/* Динамічні viewport units (для мобільних!) */
100dvh /* dynamic: змінюється при появі/зникненні адресного бару */
100svh /* small: мінімальний viewport (адресний бар видимий) */
100lvh /* large: максимальний viewport (адресний бар прихований) */</pre>
<h3>Проблема 100vh на iOS</h3>
<pre>/* Мобільні браузери мають адресний бар що ховається при скролі.
   100vh = висота без адресного бару (контент обрізається).
   dvh   = реальна видима висота (рекомендовано для hero!) */

.hero {
  height: 100dvh; /* ✅ правильно для мобільних */
}

/* Fallback для старих браузерів */
.hero {
  height: 100vh;
  height: 100dvh; /* перекриє якщо підтримується */
}</pre>`,
      ru:`<h2>Viewport units</h2>
<pre>1vw  = 1% ширины viewport
1vh  = 1% высоты viewport
1vmin = 1% меньшего из (vw, vh)
1vmax = 1% большего

.hero { height: 100vh; }
.font { font-size: 5vw; }

/* Динамические для мобильных: */
100dvh /* меняется при скролле */
100svh /* минимальный (адресбар виден) */
100lvh /* максимальный (адресбар скрыт) */</pre>` },
    `<div class="vp-lab">
  <h2>📐 Viewport Units Lab</h2>

  <!-- Інтерактивна демонстрація -->
  <div class="vp-demo-wrap">
    <h3>Resize window → see values change</h3>
    <div class="vp-values" id="vp-values">
      <div class="vpv-card" id="vpv-vw"><span class="vpv-label">1vw</span><span class="vpv-val" id="v-vw">—</span></div>
      <div class="vpv-card" id="vpv-vh"><span class="vpv-label">1vh</span><span class="vpv-val" id="v-vh">—</span></div>
      <div class="vpv-card" id="vpv-vmin"><span class="vpv-label">1vmin</span><span class="vpv-val" id="v-vmin">—</span></div>
      <div class="vpv-card" id="vpv-vmax"><span class="vpv-label">1vmax</span><span class="vpv-val" id="v-vmax">—</span></div>
    </div>

    <!-- Fluid font demo -->
    <div class="fluid-font-demo">
      <h3>Fluid font-size: <code id="ff-size-label">5vw</code></h3>
      <input type="range" id="ff-range" min="1" max="15" value="5" oninput="updateFluid(this.value)">
      <div class="fluid-text" id="fluid-text">WebCraft</div>
    </div>

    <!-- Sizes visualizer -->
    <div class="vp-sizes">
      <h3>Розміри блоків у viewport units</h3>
      <div class="vps-container" id="vps-container">
        <div class="vps-box b-25vw">25vw</div>
        <div class="vps-box b-50vmin">50vmin</div>
        <div class="vps-box b-10vmax">10vmax</div>
      </div>
    </div>

    <pre class="out" id="vp-out">—</pre>
  </div>
</div>`,
    `${BASE}
.vp-lab{max-width:520px}
.vp-demo-wrap{background:#1e293b;border-radius:12px;padding:14px}
.vp-demo-wrap h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:10px}

.vp-values{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px}
.vpv-card{background:#0f172a;border-radius:8px;padding:10px;text-align:center;border:1px solid #1e293b;display:flex;flex-direction:column;gap:4px}
.vpv-label{font-size:11px;font-family:monospace;color:#64748b}
.vpv-val{font-size:17px;font-weight:900;font-family:monospace;color:#3b82f6}

.fluid-font-demo{margin-bottom:14px}
.fluid-font-demo input[type=range]{width:100%;margin:8px 0;accent-color:#3b82f6;cursor:pointer}
.fluid-text{font-size:5vw;font-weight:900;color:#f1f5f9;text-align:center;min-height:40px;line-height:1.1;transition:.1s}

.vp-sizes{margin-bottom:12px}
.vps-container{background:#0f172a;border-radius:8px;padding:10px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;min-height:60px;border:1px solid #1e293b}
.vps-box{display:flex;align-items:center;justify-content:center;border-radius:6px;font-size:10px;font-family:monospace;font-weight:700;color:#fff;min-height:30px;transition:.2s}
.b-25vw{width:25vw;background:rgba(59,130,246,.4);border:1px solid #3b82f6}
.b-50vmin{width:50vmin;height:50vmin;max-width:100%;background:rgba(139,92,246,.3);border:1px solid #8b5cf6}
.b-10vmax{width:10vmax;height:10vmax;background:rgba(16,185,129,.3);border:1px solid #10b981}`,
    `function update() {
  const vw = window.innerWidth  / 100;
  const vh = window.innerHeight / 100;
  document.getElementById('v-vw').textContent   = vw.toFixed(1) + 'px';
  document.getElementById('v-vh').textContent   = vh.toFixed(1) + 'px';
  document.getElementById('v-vmin').textContent = Math.min(vw,vh).toFixed(1) + 'px';
  document.getElementById('v-vmax').textContent = Math.max(vw,vh).toFixed(1) + 'px';
  document.getElementById('vp-out').textContent =
    \`window.innerWidth  = \${window.innerWidth}px   (1vw = \${vw.toFixed(2)}px)\n\` +
    \`window.innerHeight = \${window.innerHeight}px   (1vh = \${vh.toFixed(2)}px)\n\` +
    \`1vmin = \${Math.min(vw,vh).toFixed(2)}px · 1vmax = \${Math.max(vw,vh).toFixed(2)}px\n\n\` +
    \`Fluid font (5vw) = \${(5*vw).toFixed(1)}px при поточній ширині\`;
}
window.addEventListener('resize', update);
update();

function updateFluid(v) {
  document.getElementById('fluid-text').style.fontSize = v + 'vw';
  document.getElementById('ff-size-label').textContent = v + 'vw';
  update();
}`,
    [
      { level:'easy',   uk:'Змінюй слайдер Fluid Font — поспостерігай як font-size у px змінюється разом з vw значенням.',  ru:'Двигай слайдер Fluid Font — наблюдай как font-size в px меняется вместе с vw.' },
      { level:'medium', uk:'Зміни ширину вікна браузера — що відбувається з блоками .b-25vw та .b-50vmin? Чому vmin завжди квадрат?',  ru:'Измени ширину окна — что происходит с блоками .b-25vw и .b-50vmin? Почему vmin — квадрат?' },
      { level:'hard',   uk:'Напиши clamp-еквівалент через viewport units: шрифт min 14px, max 32px, fluid між ними.',  ru:'Напиши clamp-эквивалент через viewport units: шрифт min 14px, max 32px, fluid между ними.' },
    ]
  );

  /* ─── 06-02 ──────────────────────────────────────────────── */
  patch('06-02',
    { uk:`<h2>Container queries: @container</h2>
<p>Media queries відстежують viewport. Container queries — розмір батьківського контейнера. Ідеально для компонентів що використовуються в різних місцях.</p>
<pre>/* Крок 1: встановити containment */
.card-wrapper {
  container-type: inline-size; /* або size */
  container-name: card;        /* ім'я (опційно) */
}

/* Крок 2: стилі при умові ширини контейнера */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (min-width: 300px) {
  .card-title { font-size: 18px; }
}

/* container-type:
   inline-size — тільки ширина
   size        — ширина і висота */</pre>
<h3>cqw / cqh / cqmin / cqmax</h3>
<pre>/* Container query units (як vw, але від контейнера): */
.title { font-size: 5cqw; } /* 5% ширини контейнера */</pre>`,
      ru:`<h2>Container queries</h2>
<pre>/* 1. Настраиваем containment */
.wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 2. Стили при условии */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (min-width: 300px) {
  .card-title { font-size: 18px; }
}

/* Container units: */
.title { font-size: 5cqw; }</pre>` },
    `<div class="cq-lab">
  <h2>📦 Container Queries</h2>

  <!-- Resizable container demo -->
  <div class="cq-section">
    <h3>Resizable Container (тягни → компонент адаптується)</h3>
    <div class="cq-resizer" id="cq-resizer">
      <div class="cq-wrapper" id="cq-wrapper">
        <div class="cq-card" id="cq-card">
          <div class="cq-thumb">🌐</div>
          <div class="cq-body">
            <div class="cq-tag">Frontend</div>
            <div class="cq-title">Container Queries</div>
            <div class="cq-desc">Компонент адаптується до свого контейнера, а не до viewport</div>
            <div class="cq-footer">
              <button class="cq-btn">Детальніше</button>
              <span class="cq-date">2025-07-11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pre class="out" id="cq-out">Тягни ←→ щоб змінити ширину контейнера</pre>
  </div>

  <!-- Порівняння: media query vs container query -->
  <div class="cq-section">
    <h3>Порівняння: той самий компонент у двох колонках</h3>
    <div class="cq-compare">
      <div class="cqc-narrow">
        <div class="cq-label">Вузький контейнер (200px)</div>
        <div class="cq-wrapper-sm">
          <div class="cq-card-sm">
            <div class="cqs-thumb">🎨</div>
            <div class="cqs-title">CSS Grid</div>
            <div class="cqs-desc">Сітки та розмітка</div>
          </div>
        </div>
      </div>
      <div class="cqc-wide">
        <div class="cq-label">Широкий контейнер (flex:1)</div>
        <div class="cq-wrapper-lg">
          <div class="cq-card-sm">
            <div class="cqs-thumb">🎨</div>
            <div class="cqs-title">CSS Grid</div>
            <div class="cqs-desc">Сітки та розмітка</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.cq-lab{max-width:520px}
.cq-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.cq-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}

.cq-resizer{resize:horizontal;overflow:hidden;min-width:160px;max-width:500px;padding:6px;border:1px dashed #334155;border-radius:8px;margin-bottom:8px}
.cq-wrapper{container-type:inline-size;container-name:card;width:100%}

/* ── Картка за замовчуванням (вузька) ── */
.cq-card{display:flex;flex-direction:column;gap:8px;background:#0f172a;border-radius:10px;padding:12px;border:1px solid #1e293b}
.cq-thumb{font-size:32px;text-align:center;padding:8px;background:#1e293b;border-radius:8px}
.cq-body{display:flex;flex-direction:column;gap:5px}
.cq-tag{display:inline-block;padding:2px 8px;background:rgba(59,130,246,.15);color:#7dd3fc;border-radius:10px;font-size:10px;font-weight:700;text-transform:uppercase;width:fit-content}
.cq-title{font-size:14px;font-weight:700;color:#f1f5f9}
.cq-desc{font-size:12px;color:#64748b;line-height:1.5}
.cq-footer{display:flex;align-items:center;gap:8px;justify-content:space-between}
.cq-btn{padding:5px 12px;font-size:11px;border-radius:6px}
.cq-date{font-size:10px;color:#475569;font-family:monospace}

/* ── Широкий контейнер (>340px) ── */
@container card (min-width: 340px) {
  .cq-card{flex-direction:row;align-items:flex-start}
  .cq-thumb{font-size:40px;min-width:70px}
  .cq-title{font-size:16px}
  .cq-desc{font-size:13px}
}

/* ── Дуже широкий (>460px) ── */
@container card (min-width: 460px) {
  .cq-tag{font-size:11px}
  .cq-title{font-size:20px}
  .cq-btn{padding:7px 16px;font-size:12px}
}

/* Порівняння */
.cq-compare{display:flex;gap:8px}
.cqc-narrow{width:200px;flex-shrink:0}
.cqc-wide{flex:1}
.cq-label{font-size:10px;color:#475569;margin-bottom:5px;font-family:monospace}
.cq-wrapper-sm{container-type:inline-size;container-name:card-sm}
.cq-wrapper-lg{container-type:inline-size;container-name:card-sm}
.cq-card-sm{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:5px}
.cqs-thumb{font-size:24px;text-align:center}
.cqs-title{font-size:12px;font-weight:700;color:#f1f5f9;text-align:center}
.cqs-desc{font-size:11px;color:#64748b;text-align:center}
@container card-sm (min-width: 250px) {
  .cq-card-sm{flex-direction:row;align-items:center;gap:10px}
  .cqs-thumb{font-size:28px}
  .cqs-title,.cqs-desc{text-align:left}
}`,
    `const resizer = document.getElementById('cq-resizer');
const out = document.getElementById('cq-out');
const ro = new ResizeObserver(entries => {
  const w = Math.round(entries[0].contentRect.width);
  let layout = 'column (< 340px)';
  if(w >= 460) layout = 'wide row (≥ 460px)';
  else if(w >= 340) layout = 'row (≥ 340px)';
  out.textContent =
    \`Ширина контейнера: \${w}px\nLayout: \${layout}\n\n@container card (min-width: 340px) → flex-direction: row\n@container card (min-width: 460px) → більший шрифт, кнопки\`;
});
ro.observe(resizer);`,
    [
      { level:'easy',   uk:'Тягни правий край resizable блоку і спостерігай як картка змінює layout (стовпець → рядок → широкий рядок).',  ru:'Тяни правый край resizable блока — наблюдай как карточка меняет layout.' },
      { level:'medium', uk:'Порівняй два однакових компоненти — вузький і широкий контейнери. Це неможливо зробити media queries — поясни чому.',  ru:'Сравни два одинаковых компонента. Это нельзя сделать media queries — объясни почему.' },
      { level:'hard',   uk:'Перепиши картку курсу (title, description, button, image) з container-type та мінімум двома @container breakpoints.',  ru:'Перепиши карточку курса с container-type и минимум двумя @container breakpoints.' },
    ]
  );

  /* ─── 06-03 ──────────────────────────────────────────────── */
  patch('06-03',
    { uk:`<h2>Fluid typography: clamp(), min(), max()</h2>
<pre>/* clamp(min, preferred, max) */
font-size: clamp(14px, 2.5vw, 24px);
/* ↑ мінімум 14px, ідеально 2.5vw, максимум 24px */

/* min() і max() */
width: min(100%, 600px);       /* max-width без медіазапиту */
padding: max(16px, 2vw);       /* мінімум 16px, але може бути більше */

/* Fluid типографіка — формула */
font-size: clamp(
  1rem,                        /* min */
  1rem + 1.5vw,                /* ідеальне значення (fluid) */
  2rem                         /* max */
);

/* Fluid margins / padding */
padding: clamp(16px, 5vw, 40px);
gap: clamp(8px, 2vw, 24px);</pre>
<h3>Перевага clamp</h3>
<pre>/* ❌ Без clamp — 3 breakpoints */
@media (max-width: 480px)  { font-size: 14px; }
@media (max-width: 768px)  { font-size: 18px; }
@media (min-width: 769px)  { font-size: 24px; }

/* ✅ З clamp — нуль breakpoints! */
font-size: clamp(14px, 2.5vw, 24px);</pre>`,
      ru:`<h2>Fluid typography</h2>
<pre>/* clamp(min, preferred, max) */
font-size: clamp(14px, 2.5vw, 24px);

/* min() и max() */
width:   min(100%, 600px);
padding: max(16px, 2vw);

/* Без breakpoints! */
font-size: clamp(1rem, 1rem + 1.5vw, 2rem);
padding:   clamp(16px, 5vw, 40px);</pre>` },
    `<div class="clamp-lab">
  <h2>🔠 Fluid Typography</h2>

  <!-- clamp() конструктор -->
  <div class="cl-section">
    <h3>clamp() конструктор</h3>
    <div class="cl-controls">
      <label>Min: <span id="cl-min-v">14</span>px
        <input type="range" id="cl-min" min="8" max="30" value="14" oninput="updateClamp()"></label>
      <label>Max: <span id="cl-max-v">32</span>px
        <input type="range" id="cl-max" min="16" max="72" value="32" oninput="updateClamp()"></label>
      <label>vw factor: <span id="cl-vw-v">2.5</span>vw
        <input type="range" id="cl-vw" min="0.5" max="8" step="0.5" value="2.5" oninput="updateClamp()"></label>
    </div>
    <div class="cl-formula" id="cl-formula">font-size: clamp(14px, 2.5vw, 32px)</div>
    <div class="cl-preview-text" id="cl-text">Fluid Typography</div>
    <pre class="out" id="cl-out">—</pre>
  </div>

  <!-- Порівняння: з breakpoints vs clamp -->
  <div class="cl-section">
    <h3>Media queries VS clamp()</h3>
    <div class="cl-compare">
      <div class="clc-box">
        <div class="clc-label">❌ breakpoints</div>
        <div class="text-bp">Responsive</div>
        <div class="clc-code">@media(max-width:480px){14px}<br>@media(max-width:768px){18px}<br>@media(min-width:769px){24px}</div>
      </div>
      <div class="clc-box">
        <div class="clc-label">✅ clamp()</div>
        <div class="text-cl">Responsive</div>
        <div class="clc-code">clamp(14px, 2.5vw, 24px)</div>
      </div>
    </div>
  </div>

  <!-- min() / max() демо -->
  <div class="cl-section">
    <h3>min() та max()</h3>
    <div class="mm-demos">
      <div class="mm-box mmd-min">
        <div class="mm-label">width: min(100%, 300px)</div>
        <div class="mm-desc">Ніколи не ширший за 300px, але адаптується до контейнера</div>
      </div>
      <div class="mm-box mmd-max">
        <div class="mm-label">padding: max(16px, 2vw)</div>
        <div class="mm-desc">Мінімум 16px, більше на широких екранах</div>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.clamp-lab{max-width:520px}
.cl-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.cl-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}

.cl-controls{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
.cl-controls label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}
.cl-controls label span{min-width:32px;font-family:monospace;color:#94a3b8}
.cl-controls input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}

.cl-formula{font-family:monospace;font-size:12px;color:#7dd3fc;background:#0f172a;border:1px solid #1e293b;border-radius:6px;padding:8px 12px;margin-bottom:8px}
.cl-preview-text{font-weight:900;color:#f1f5f9;text-align:center;padding:16px 0;transition:font-size .1s}

.cl-compare{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:0}
.clc-box{background:#0f172a;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:6px}
.clc-label{font-size:11px;font-weight:700;color:#64748b}
.text-bp{font-size:14px;font-weight:700;color:#f1f5f9;text-align:center;padding:6px 0}
@media(max-width:480px){.text-bp{font-size:11px}}
@media(min-width:481px) and (max-width:600px){.text-bp{font-size:13px}}
@media(min-width:601px){.text-bp{font-size:16px}}
.text-cl{font-size:clamp(11px,2.5vw,16px);font-weight:700;color:#f1f5f9;text-align:center;padding:6px 0}
.clc-code{font-size:9px;font-family:monospace;color:#475569;background:#0f172a;padding:5px;border-radius:4px;border:1px solid #1e293b;line-height:1.5}

.mm-demos{display:flex;flex-direction:column;gap:8px}
.mm-box{border-radius:8px;padding:10px;border:1px dashed #334155}
.mmd-min{width:min(100%,300px);background:rgba(59,130,246,.08)}
.mmd-max{padding:max(16px,2vw);background:rgba(16,185,129,.08)}
.mm-label{font-size:12px;font-family:monospace;color:#7dd3fc;margin-bottom:4px}
.mm-desc{font-size:11px;color:#64748b}`,
    `function updateClamp() {
  const minV = parseInt(document.getElementById('cl-min').value);
  const maxV = parseInt(document.getElementById('cl-max').value);
  const vwV  = parseFloat(document.getElementById('cl-vw').value);

  document.getElementById('cl-min-v').textContent = minV;
  document.getElementById('cl-max-v').textContent = maxV;
  document.getElementById('cl-vw-v').textContent  = vwV;

  const formula = \`clamp(\${minV}px, \${vwV}vw, \${maxV}px)\`;
  document.getElementById('cl-formula').textContent = 'font-size: ' + formula;
  document.getElementById('cl-text').style.fontSize = formula;

  const current = Math.max(minV, Math.min(maxV, window.innerWidth * vwV / 100));
  document.getElementById('cl-out').textContent =
    \`clamp(\${minV}px, \${vwV}vw, \${maxV}px)\n\nПри viewport \${window.innerWidth}px:\n  preferred = \${(window.innerWidth*vwV/100).toFixed(1)}px\n  результат = \${current.toFixed(1)}px\n\n▸ min \${minV}px  ──────  \${current.toFixed(0)}px  ──────  max \${maxV}px\`;
}

updateClamp();
window.addEventListener('resize', updateClamp);`,
    [
      { level:'easy',   uk:'Налаштуй min=16px, max=48px, vw=4 → що відбувається з текстом? При якій ширині viewport досягає максимуму?',  ru:'Настрой min=16px, max=48px, vw=4 → что происходит с текстом? При какой ширине достигает максимума?' },
      { level:'medium', uk:'Знайди .text-bp і .text-cl. Поясни чому text-cl завжди плавний а text-bp "стрибає" на breakpoints.',  ru:'Найди .text-bp и .text-cl. Объясни почему text-cl всегда плавный, а text-bp "прыгает".' },
      { level:'hard',   uk:'Обчисли формулу для шрифту що: на 320px = 14px, на 1440px = 28px. Виведи через clamp().',  ru:'Вычисли формулу для шрифта: на 320px = 14px, на 1440px = 28px. Выведи через clamp().' },
    ]
  );

  /* ─── 06-04 ──────────────────────────────────────────────── */
  patch('06-04',
    { uk:`<h2>Адаптивні зображення: srcset, sizes, WebP та AVIF</h2>
<h3>srcset — кілька роздільних здатностей</h3>
<pre>&lt;img
  src="img-800.jpg"                  ← fallback
  srcset="
    img-400.jpg 400w,
    img-800.jpg 800w,
    img-1600.jpg 1600w"              ← браузер вибирає
  sizes="
    (max-width: 600px) 100vw,        ← умова ≈ ширина картинки
    (max-width: 900px) 50vw,
    800px"                           ← default
  alt="Опис"
&gt;</pre>
<h3>&lt;picture&gt; — разные формати і crop</h3>
<pre>&lt;picture&gt;
  &lt;source type="image/avif" srcset="img.avif"&gt;
  &lt;source type="image/webp" srcset="img.webp"&gt;
  &lt;source media="(max-width:600px)" srcset="img-mobile.jpg"&gt;
  &lt;img src="img.jpg" alt="..."&gt; ← fallback
&lt;/picture&gt;</pre>
<h3>Порівняння форматів</h3>
<pre>JPEG  — класика, широка підтримка, немає прозорості
PNG   — прозорість, ідеально для ілюстрацій/скрін
WebP  — ~30% менший за JPEG, підтримка 95%+
AVIF  — ~50% менший за JPEG, підтримка 90%+
SVG   — вектор, нескінченно масштабується</pre>`,
      ru:`<h2>Адаптивні зображення</h2>
<pre>&lt;img
  src="img-800.jpg"
  srcset="img-400.jpg 400w, img-800.jpg 800w"
  sizes="(max-width:600px) 100vw, 800px"
  alt="..."
&gt;

&lt;picture&gt;
  &lt;source type="image/avif" srcset="img.avif"&gt;
  &lt;source type="image/webp" srcset="img.webp"&gt;
  &lt;img src="img.jpg" alt="..."&gt;
&lt;/picture&gt;

JPEG → WebP → AVIF (кожен ≈ на 30-50% менший)</pre>` },
    `<div class="img-lab">
  <h2>🖼 Adaptive Images</h2>

  <!-- srcset simulator -->
  <div class="img-section">
    <h3>srcset simulator</h3>
    <div class="srcset-sim">
      <div class="ss-viewport">
        <h4>Viewport width: <span id="ss-vw">800</span>px · DPR: <span id="ss-dpr">1</span>x</h4>
        <input type="range" id="ss-vw-r" min="300" max="1600" value="800" oninput="updateSrcset()">
      </div>
      <div class="ss-sizes-config">
        <div class="ss-label">sizes:</div>
        <div class="ss-rule" data-max="600" data-size="100vw">(max-width: 600px) → 100vw</div>
        <div class="ss-rule" data-max="900" data-size="50vw">(max-width: 900px) → 50vw</div>
        <div class="ss-rule" data-max="9999" data-size="800px">default → 800px</div>
      </div>
      <div class="ss-srcset">
        <div class="ss-label">srcset:</div>
        <div id="ss-options">
          <div class="sso-item" data-w="400">img-400.jpg <span class="ssw">400w</span></div>
          <div class="sso-item" data-w="800">img-800.jpg <span class="ssw">800w</span></div>
          <div class="sso-item" data-w="1200">img-1200.jpg <span class="ssw">1200w</span></div>
          <div class="sso-item" data-w="1600">img-1600.jpg <span class="ssw">1600w</span></div>
        </div>
      </div>
      <pre class="out" id="ss-out">—</pre>
    </div>
  </div>

  <!-- Format comparison -->
  <div class="img-section">
    <h3>Порівняння форматів (симуляція)</h3>
    <div class="fmt-compare" id="fmt-compare">
      <div class="fmt-card" data-fmt="jpeg">
        <div class="fmt-preview jpeg-preview">🏔</div>
        <div class="fmt-name">JPEG</div>
        <div class="fmt-bar"><div class="fmt-fill" style="width:100%"></div></div>
        <div class="fmt-size">100% · 240KB</div>
        <div class="fmt-info">Fallback, no alpha</div>
      </div>
      <div class="fmt-card" data-fmt="webp">
        <div class="fmt-preview webp-preview">🏔</div>
        <div class="fmt-name">WebP</div>
        <div class="fmt-bar"><div class="fmt-fill" style="width:68%"></div></div>
        <div class="fmt-size">68% · 163KB</div>
        <div class="fmt-info">~30% менший, alpha OK</div>
      </div>
      <div class="fmt-card" data-fmt="avif">
        <div class="fmt-preview avif-preview">🏔</div>
        <div class="fmt-name">AVIF</div>
        <div class="fmt-bar"><div class="fmt-fill" style="width:48%"></div></div>
        <div class="fmt-size">48% · 115KB</div>
        <div class="fmt-info">~50% менший, найкращий</div>
      </div>
      <div class="fmt-card" data-fmt="svg">
        <div class="fmt-preview svg-preview">✦</div>
        <div class="fmt-name">SVG</div>
        <div class="fmt-bar"><div class="fmt-fill" style="width:5%"></div></div>
        <div class="fmt-size">1KB · вектор</div>
        <div class="fmt-info">∞ масштаб, тільки вектор</div>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.img-lab{max-width:520px}
.img-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.img-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}

.srcset-sim{display:flex;flex-direction:column;gap:8px}
.ss-viewport h4{font-size:12px;color:#94a3b8;margin-bottom:4px}
.ss-viewport input{width:100%;accent-color:#3b82f6;cursor:pointer}
.ss-label{font-size:10px;text-transform:uppercase;color:#475569;letter-spacing:.06em;margin-bottom:4px}
.ss-sizes-config,.ss-srcset{background:#0f172a;border-radius:8px;padding:8px}
.ss-rule{font-size:11px;font-family:monospace;color:#64748b;padding:4px 0;border-bottom:1px solid #1e293b}
.ss-rule:last-child{border:none}
.ss-rule.active{color:#7dd3fc}
.sso-item{font-size:11px;font-family:monospace;padding:4px 8px;border-radius:4px;color:#64748b;transition:.2s;display:flex;justify-content:space-between}
.sso-item.chosen{background:rgba(59,130,246,.15);color:#7dd3fc;border:1px solid rgba(59,130,246,.3)}
.ssw{color:#475569}

.fmt-compare{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.fmt-card{background:#0f172a;border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:5px;border:1px solid #1e293b}
.fmt-preview{font-size:28px;text-align:center;padding:8px;background:#1e293b;border-radius:6px}
.svg-preview{color:#3b82f6;font-size:32px}
.fmt-name{font-size:11px;font-weight:800;text-align:center;color:#f1f5f9}
.fmt-bar{height:4px;background:#1e293b;border-radius:2px;overflow:hidden}
.fmt-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#7dd3fc);border-radius:2px}
.fmt-size{font-size:10px;font-family:monospace;color:#94a3b8;text-align:center}
.fmt-info{font-size:9px;color:#475569;text-align:center;line-height:1.3}`,
    `const DPR = window.devicePixelRatio || 1;
document.getElementById('ss-dpr').textContent = DPR.toFixed(1);

function updateSrcset() {
  const vw = parseInt(document.getElementById('ss-vw-r').value);
  document.getElementById('ss-vw').textContent = vw;

  // Визначаємо розмір зображення з sizes
  let imgSize;
  let activeRule = null;
  if(vw <= 600)  { imgSize = vw;         activeRule = 0; }
  else if(vw <= 900) { imgSize = vw*0.5; activeRule = 1; }
  else               { imgSize = 800;    activeRule = 2; }

  // Підсвічуємо активний sizes rule
  document.querySelectorAll('.ss-rule').forEach((el,i) => el.classList.toggle('active',i===activeRule));

  // Вибираємо зображення: перше де w >= imgSize * DPR
  const need = imgSize * DPR;
  const options = [400, 800, 1200, 1600];
  let chosen = options.find(w => w >= need) || options[options.length-1];

  document.querySelectorAll('.sso-item').forEach(el => {
    el.classList.toggle('chosen', parseInt(el.dataset.w) === chosen);
  });

  document.getElementById('ss-out').textContent =
    \`Viewport: \${vw}px  ·  DPR: \${DPR.toFixed(1)}x\nSizes rule → image display: \${Math.round(imgSize)}px\nNeed: \${Math.round(imgSize)}px × \${DPR.toFixed(1)} = \${Math.round(need)}px\nБраузерВибирає: img-\${chosen}.jpg\`;
}
updateSrcset();
window.addEventListener('resize', updateSrcset);`,
    [
      { level:'easy',   uk:'Зміни slider viewport на 400px — яке зображення обере браузер? Потім на 1400px — яке?',  ru:'Смени slider на 400px — какое изображение выберет браузер? Потом 1400px — какое?' },
      { level:'medium', uk:'Поясни навіщо потрібно атрибут sizes. Що станеться якщо його не вказати?',  ru:'Объясни зачем нужен атрибут sizes. Что будет если его не указать?' },
      { level:'hard',   uk:'Напиши HTML <picture> що: на мобільних показує квадратний crop jpg, на десктопі — широкий WebP/AVIF з fallback на jpg.',  ru:'Напиши <picture> что: на мобильных — квадратный crop, на десктопе — WebP/AVIF с fallback.' },
    ]
  );

  /* ─── 06-05 ──────────────────────────────────────────────── */
  patch('06-05',
    { uk:`<h2>Dark mode: prefers-color-scheme та data-theme</h2>
<h3>CSS media query</h3>
<pre>/* Автоматично відповідає OS налаштуванням */
@media (prefers-color-scheme: dark) {
  :root {
    --bg:   #0f172a;
    --text: #f1f5f9;
    --card: #1e293b;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    --bg:   #ffffff;
    --text: #0f172a;
    --card: #f8fafc;
  }
}</pre>
<h3>Ручний перемикач (data-theme)</h3>
<pre>/* data-theme перекриває media query */
:root[data-theme="dark"]  { --bg: #0f172a; }
:root[data-theme="light"] { --bg: #ffffff; }

/* JS toggle */
const toggle = () => {
  const next = document.documentElement.dataset.theme === 'dark'
    ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
};

// При завантаженні:
const saved = localStorage.getItem('theme')
  || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.dataset.theme = saved;</pre>`,
      ru:`<h2>Dark mode</h2>
<pre>/* Media query */
@media (prefers-color-scheme: dark) {
  :root { --bg: #0f172a; --text: #f1f5f9; }
}

/* data-theme override */
:root[data-theme="dark"]  { --bg: #0f172a; }
:root[data-theme="light"] { --bg: #fff; }

/* JS toggle */
const next = root.dataset.theme==='dark' ? 'light' : 'dark';
root.dataset.theme = next;
localStorage.setItem('theme', next);</pre>` },
    `<div id="dm-root" class="dm-root light">
  <div class="dm-topbar">
    <span class="dm-brand">🌐 WebCraft</span>
    <button id="dm-toggle" onclick="toggleTheme()" class="dm-toggle">
      <span id="dm-icon">☀️</span>
      <span id="dm-label">Light Mode</span>
    </button>
  </div>

  <div class="dm-content">
    <div class="dm-hero">
      <div class="dm-eyebrow">Dark Mode Demo</div>
      <h2 class="dm-title">Персональна тема</h2>
      <p class="dm-desc">Наша сторінка підтримує темну та світлу теми. Вибір зберігається в localStorage та поважає OS налаштування.</p>
      <button class="dm-cta">Спробуй демо</button>
    </div>

    <div class="dm-cards">
      <div class="dm-card">
        <div class="dm-card-icon">🎨</div>
        <div class="dm-card-title">CSS Variables</div>
        <div class="dm-card-desc">Змінні дозволяють перемикати тему в одному місці</div>
      </div>
      <div class="dm-card">
        <div class="dm-card-icon">💾</div>
        <div class="dm-card-title">localStorage</div>
        <div class="dm-card-desc">Вибір теми зберігається між сесіями</div>
      </div>
      <div class="dm-card">
        <div class="dm-card-icon">🖥</div>
        <div class="dm-card-title">OS Detection</div>
        <div class="dm-card-desc">prefers-color-scheme визначає OS налаштування</div>
      </div>
    </div>
  </div>

  <pre class="dm-out" id="dm-out">—</pre>
</div>`,
    `:root { /* light tokens */
  --dm-bg: #f8fafc;
  --dm-surface: #ffffff;
  --dm-card: #f1f5f9;
  --dm-border: #e2e8f0;
  --dm-text: #0f172a;
  --dm-muted: #64748b;
  --dm-accent: #3b82f6;
  --dm-accent-text: #ffffff;
}

.dm-root.dark {
  --dm-bg: #0f172a;
  --dm-surface: #1e293b;
  --dm-card: #0f172a;
  --dm-border: #334155;
  --dm-text: #f1f5f9;
  --dm-muted: #94a3b8;
}

*{box-sizing:border-box;margin:0;padding:0}
.dm-root{background:var(--dm-bg);color:var(--dm-text);border-radius:12px;overflow:hidden;transition:background .3s,color .3s;border:1px solid var(--dm-border);font-family:'Segoe UI',Arial,sans-serif}

.dm-topbar{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--dm-surface);border-bottom:1px solid var(--dm-border)}
.dm-brand{font-size:15px;font-weight:800;color:var(--dm-text)}
.dm-toggle{display:flex;align-items:center;gap:6px;background:var(--dm-card);border:1px solid var(--dm-border);color:var(--dm-text);padding:6px 12px;border-radius:20px;cursor:pointer;font-size:12px;font-weight:600;transition:.2s}
.dm-toggle:hover{border-color:var(--dm-accent);color:var(--dm-accent)}

.dm-content{padding:16px;display:flex;flex-direction:column;gap:12px}
.dm-hero{background:var(--dm-surface);border-radius:10px;padding:16px;border:1px solid var(--dm-border)}
.dm-eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--dm-accent);margin-bottom:6px}
.dm-title{font-size:20px;font-weight:900;margin-bottom:6px;color:var(--dm-text)}
.dm-desc{font-size:12px;color:var(--dm-muted);line-height:1.6;margin-bottom:10px}
.dm-cta{background:var(--dm-accent);border:none;color:var(--dm-accent-text);padding:8px 18px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:.2s}
.dm-cta:hover{opacity:.85}

.dm-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.dm-card{background:var(--dm-surface);border:1px solid var(--dm-border);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:5px;transition:.3s}
.dm-card-icon{font-size:20px}
.dm-card-title{font-size:12px;font-weight:700;color:var(--dm-text)}
.dm-card-desc{font-size:11px;color:var(--dm-muted);line-height:1.4}

.dm-out{font-size:11px;font-family:monospace;background:var(--dm-card);border-top:1px solid var(--dm-border);padding:8px 14px;color:var(--dm-muted);white-space:pre-wrap}`,
    `function toggleTheme() {
  const root = document.getElementById('dm-root');
  const isDark = root.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  root.classList.remove('dark','light');
  root.classList.add(next);
  document.getElementById('dm-icon').textContent  = next==='dark' ? '🌙' : '☀️';
  document.getElementById('dm-label').textContent = next==='dark' ? 'Dark Mode' : 'Light Mode';
  try { localStorage.setItem('dm-theme', next); } catch(_){}
  document.getElementById('dm-out').textContent =
    \`Активна тема: "\${next}"\nCSS змінні:\n  --dm-bg:      \${getComputedStyle(root).getPropertyValue('--dm-bg').trim()}\n  --dm-surface: \${getComputedStyle(root).getPropertyValue('--dm-surface').trim()}\n  --dm-text:    \${getComputedStyle(root).getPropertyValue('--dm-text').trim()}\n\nprefers-color-scheme: \${matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}\nlocalStorage: "\${next}" збережено\`;
}

// Init
(function(){
  let saved;
  try { saved = localStorage.getItem('dm-theme'); } catch(_){}
  const prefer = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const root = document.getElementById('dm-root');
  root.classList.add(prefer);
  document.getElementById('dm-icon').textContent  = prefer==='dark'?'🌙':'☀️';
  document.getElementById('dm-label').textContent = prefer==='dark'?'Dark Mode':'Light Mode';
})();`,
    [
      { level:'easy',   uk:'Натисни кнопку перемикача теми — спостерігай як CSS Variables змінюють весь вигляд. Зверни увагу на dm-out.',  ru:'Нажми кнопку переключения темы — наблюдай как CSS Variables меняют весь вид.' },
      { level:'medium', uk:'Відкрий DevTools → Rendering → prefers-color-scheme: dark. Що відбувається якщо localStorage вже встановлено?',  ru:'Открой DevTools → Rendering → prefers-color-scheme. Что если localStorage уже установлен?' },
      { level:'hard',   uk:'Додай третю тему "system" яка слідує за OS налаштуванням (не перекриває data-theme). Перемикай: Light → Dark → System.',  ru:'Добавь тему "system" которая следует за OS. Переключай: Light → Dark → System.' },
    ]
  );

  /* ─── 06-06 ──────────────────────────────────────────────── */
  patch('06-06',
    { uk:`<h2>Print styles: @media print</h2>
<pre>@media print {
  /* Приховуємо непотрібне */
  header, footer, nav, .sidebar,
  button, .ad, .cookie-banner {
    display: none !important;
  }

  /* Колір та фон */
  body {
    background: white !important;
    color: black !important;
    font-size: 12pt;
  }

  /* Розмір сторінки */
  @page {
    size: A4 portrait;         /* або A4 landscape, letter */
    margin: 2cm;               /* поля */
  }
  @page :first { margin-top: 3cm; }

  /* Розриви сторінки */
  h2, h3 { page-break-after: avoid; }
  table   { page-break-inside: avoid; }
  .section { page-break-before: always; }

  /* Посилання — показуємо URL */
  a::after { content: " (" attr(href) ")"; }

  /* Сітка → одна колонка */
  .grid { display: block; }
}</pre>`,
      ru:`<h2>Print styles</h2>
<pre>@media print {
  nav, .sidebar, button { display: none; }
  body { background: white; color: black; }

  @page {
    size: A4 portrait;
    margin: 2cm;
  }

  h2 { page-break-after: avoid; }
  .section { page-break-before: always; }

  a::after { content: " (" attr(href) ")"; }
}</pre>` },
    `<div class="print-lab" id="print-lab">
  <div class="pl-controls">
    <h2>🖨 Print Styles Lab</h2>
    <div class="plc-btns">
      <button onclick="showPrint()" id="btn-print">Показати Print Preview</button>
      <button onclick="showScreen()" id="btn-screen">Повернутись до Screen</button>
      <button onclick="window.print()" style="border-color:rgba(59,130,246,.4);color:#7dd3fc">⌘P Друкувати</button>
    </div>
  </div>

  <!-- Content (screen + print) -->
  <div class="pl-content" id="pl-content">
    <!-- Header (ховаємо на print) -->
    <div class="pl-screen-only">
      <div class="pl-topbar">🌐 WebCraft Academy · <span style="color:#64748b">version screen</span></div>
    </div>

    <!-- Article (показуємо на print) -->
    <article class="pl-article">
      <h1 class="pl-title">Адаптивний веб-дизайн</h1>
      <div class="pl-meta">Автор: WebCraft Team · 2025-07-11</div>
      <p>Адаптивний дизайн дозволяє сторінкам виглядати коректно на будь-якому пристрої: телефоні, планшеті чи десктопі. Основні інструменти: Flexbox, Grid, media queries та viewport units.</p>
      <h2>Три підходи</h2>
      <ul class="pl-list">
        <li><b>Mobile First</b> — розробка від малого до великого</li>
        <li><b>Desktop First</b> — від великого до малого (менш популярний)</li>
        <li><b>Content First</b> — breakpoints там де контент "ламається"</li>
      </ul>
      <p>Корисне посилання: <a href="https://web.dev/responsive-web-design-basics">web.dev/responsive</a></p>
    </article>

    <!-- Sidebar (ховаємо на print) -->
    <div class="pl-screen-only pl-sidebar">
      <div class="pls-box">📚 Також дивись:<br><br>• Container Queries<br>• Fluid Typography<br>• Dark Mode</div>
    </div>

    <!-- Footer (ховаємо на print) -->
    <div class="pl-screen-only">
      <div class="pl-footer">© 2025 WebCraft Academy · Всі права захищені</div>
    </div>
  </div>

  <pre class="out" id="print-out">Натисни "Print Preview" щоб побачити print-стилі →</pre>
</div>`,
    `${BASE}
.print-lab{max-width:520px;--screen:1}
.pl-controls{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.pl-controls h2{margin-bottom:8px}
.plc-btns{display:flex;flex-wrap:wrap;gap:6px}
.plc-btns button{padding:6px 12px;font-size:12px}

/* ── Screen layout ── */
.pl-content{display:grid;grid-template-columns:1fr 180px;grid-template-rows:auto auto auto;gap:10px;background:#1e293b;border-radius:10px;padding:12px}
.pl-topbar{background:#0f172a;border-radius:6px;padding:8px 12px;font-size:12px;color:#f1f5f9;grid-column:1/-1}
.pl-article{grid-column:1;background:#0f172a;border-radius:8px;padding:12px}
.pl-sidebar{grid-column:2;grid-row:2}
.pl-footer{grid-column:1/-1;background:#0f172a;border-radius:6px;padding:8px 12px;font-size:11px;color:#475569;text-align:center}
.pl-title{font-size:18px;font-weight:900;color:#f1f5f9;margin-bottom:4px}
.pl-meta{font-size:11px;color:#475569;margin-bottom:10px;font-family:monospace}
.pl-article p{font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:8px}
.pl-article h2{font-size:14px;font-weight:700;color:#f1f5f9;margin:10px 0 6px}
.pl-article a{color:#3b82f6}
.pl-list{padding-left:18px;display:flex;flex-direction:column;gap:4px;margin-bottom:8px}
.pl-list li{font-size:13px;color:#94a3b8}
.pls-box{background:#0f172a;border-radius:8px;padding:10px;font-size:12px;color:#64748b;line-height:1.6;border:1px solid #1e293b}

/* ── Print preview sim (js adds .print-mode) ── */
.print-lab.print-mode .pl-content{display:block;background:white;color:black;padding:20px;border:1px solid #ccc}
.print-lab.print-mode .pl-screen-only{display:none}
.print-lab.print-mode .pl-title{font-size:24px;color:black;margin-bottom:4px}
.print-lab.print-mode .pl-meta{font-size:10px;color:#666;margin-bottom:12px}
.print-lab.print-mode .pl-article{background:white;color:black;padding:0}
.print-lab.print-mode .pl-article p{color:black}
.print-lab.print-mode .pl-article a::after{content:" (" attr(href) ")";font-size:10px;color:#666}
.print-lab.print-mode .pl-article h2{color:black}
.print-lab.print-mode .pl-article li{color:black}

/* ── Реальний @media print ── */
@media print {
  body{background:white!important;color:black!important}
  .print-lab>*:not(.pl-content){display:none!important}
  .pl-screen-only{display:none!important}
  .pl-content{display:block!important;background:white;color:black;padding:0}
  .pl-article{background:white;color:black;padding:0}
  .pl-article a::after{content:" (" attr(href) ")";font-size:10px;color:#555}
  @page{size:A4 portrait;margin:2cm}
  h1,h2{page-break-after:avoid}
}`,
    `function showPrint() {
  document.getElementById('print-lab').classList.add('print-mode');
  document.getElementById('print-out').textContent =
    'Симуляція @media print:\n✓ Приховано: .pl-screen-only (header, sidebar, footer)\n✓ Колір: white/black\n✓ a::after показує URL\n✓ Видно тільки: article\n\nНатисни ⌘P щоб відкрити системний print dialog';
}
function showScreen() {
  document.getElementById('print-lab').classList.remove('print-mode');
  document.getElementById('print-out').textContent = 'Screen режим відновлено.';
}`,
    [
      { level:'easy',   uk:'Натисни "Print Preview" — що зникло? Що залишилось? Знайди клас .pl-screen-only в CSS.',  ru:'Нажми "Print Preview" — что исчезло? Что осталось? Найди .pl-screen-only в CSS.' },
      { level:'medium', uk:'Знайди a::after rule — поясни що content: " (" attr(href) ")" робить при друку.',  ru:'Найди a::after rule — объясни что делает content: " (" attr(href) ")" при печати.' },
      { level:'hard',   uk:'Додай стиль "page-break-before: always" для нового розділу article — перевір у print preview (або ⌘P).',  ru:'Добавь "page-break-before: always" для нового раздела — проверь в print preview.' },
    ]
  );

  /* ─── 06-07 ──────────────────────────────────────────────── */
  patch('06-07',
    { uk:`<h2>Адаптивні таблиці та wide-контент</h2>
<h3>Проблема: таблиці ламають layout</h3>
<pre>/* ❌ Таблиця без адаптивності */
table { width: 100%; } /* переповнює контейнер на мобільних */

/* ✅ Горизонтальний скрол */
.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* iOS */
}

/* ✅ Responsive table (Cards pattern) */
@media (max-width: 600px) {
  table, thead, tbody, tr, th, td {
    display: block;
  }
  thead { display: none; }  /* ховаємо header */
  td::before {
    content: attr(data-label) ": "; /* показуємо label */
    font-weight: bold;
  }
}</pre>
<h3>Wide content взагалі</h3>
<pre>/* Code blocks, images, embeds */
pre, img, iframe, video, svg {
  max-width: 100%;
  overflow-x: auto;  /* якщо широкий code */
}</pre>`,
      ru:`<h2>Адаптивні таблиці</h2>
<pre>/* Горизонтальний скрол */
.table-wrap { overflow-x: auto; }

/* Cards pattern (мобільні) */
@media (max-width: 600px) {
  table, thead, tbody, tr, th, td { display: block; }
  thead { display: none; }
  td::before {
    content: attr(data-label) ": ";
    font-weight: bold;
  }
}

/* Wide content */
pre, img { max-width: 100%; overflow-x: auto; }</pre>` },
    `<div class="tbl-lab">
  <h2>📊 Responsive Tables</h2>

  <!-- Метод 1: scroll -->
  <div class="tbl-section">
    <h3>Метод 1: overflow-x: auto (горизонтальний скрол)</h3>
    <div class="tbl-wrap" id="tbl-wrap">
      <table class="tbl" id="tbl1">
        <thead>
          <tr><th>№</th><th>Назва курсу</th><th>Вік</th><th>Уроків</th><th>Тривалість</th><th>Рівень</th><th>Статус</th></tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="№">1</td>
            <td data-label="Назва">Веб-Старт</td>
            <td data-label="Вік">8–11</td>
            <td data-label="Уроків">150</td>
            <td data-label="Тривалість">6 місяців</td>
            <td data-label="Рівень">Початковий</td>
            <td data-label="Статус"><span class="tbl-badge ok">✅ Готово</span></td>
          </tr>
          <tr>
            <td data-label="№">2</td>
            <td data-label="Назва">Веб-Розробник</td>
            <td data-label="Вік">10–14</td>
            <td data-label="Уроків">170</td>
            <td data-label="Тривалість">7 місяців</td>
            <td data-label="Рівень">Середній</td>
            <td data-label="Статус"><span class="tbl-badge wip">⚡ В роботі</span></td>
          </tr>
          <tr>
            <td data-label="№">3</td>
            <td data-label="Назва">Фулстек-Про</td>
            <td data-label="Вік">14–18</td>
            <td data-label="Уроків">170</td>
            <td data-label="Тривалість">8 місяців</td>
            <td data-label="Рівень">Просунутий</td>
            <td data-label="Статус"><span class="tbl-badge plan">📋 Планується</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Метод 2: cards -->
  <div class="tbl-section">
    <h3>Метод 2: Переключити на Cards layout</h3>
    <div class="tbl-switch">
      <button onclick="switchMode('table')" id="btn-tbl" class="active-mode">🗂 Table</button>
      <button onclick="switchMode('cards')" id="btn-cards">📋 Cards</button>
    </div>
    <div id="tbl-container" class="tbl-mode-table">
      <div class="tbl-wrap">
        <table class="tbl" id="tbl2">
          <thead><tr><th>Модуль</th><th>Тема</th><th>Уроків</th><th>Статус</th></tr></thead>
          <tbody id="tbl2-body"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.tbl-lab{max-width:520px}
.tbl-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.tbl-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}

.tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:8px;border:1px solid #334155;scrollbar-width:thin;scrollbar-color:#334155 transparent}
.tbl{width:100%;border-collapse:collapse;font-size:12px;min-width:500px}
.tbl th{background:#0f172a;padding:8px 12px;text-align:left;font-size:10px;text-transform:uppercase;color:#64748b;letter-spacing:.05em;white-space:nowrap;border-bottom:1px solid #334155}
.tbl td{padding:8px 12px;border-bottom:1px solid #1e293b;color:#94a3b8;vertical-align:middle}
.tbl tr:last-child td{border-bottom:none}
.tbl tr:hover td{background:rgba(59,130,246,.04)}
.tbl-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;white-space:nowrap}
.tbl-badge.ok{background:rgba(16,185,129,.15);color:#6ee7b7}
.tbl-badge.wip{background:rgba(245,158,11,.15);color:#fcd34d}
.tbl-badge.plan{background:rgba(100,116,139,.15);color:#94a3b8}

.tbl-switch{display:flex;gap:5px;margin-bottom:8px}
.tbl-switch button{padding:5px 12px;font-size:11px;border-radius:6px}
.tbl-switch button.active-mode{border-color:#3b82f6;color:#7dd3fc;background:rgba(59,130,246,.1)}

/* Cards mode */
.tbl-mode-cards .tbl-wrap{overflow:visible;border:none}
.tbl-mode-cards .tbl{min-width:0;display:block}
.tbl-mode-cards .tbl thead{display:none}
.tbl-mode-cards .tbl tbody{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.tbl-mode-cards .tbl tr{display:flex;flex-direction:column;gap:5px;background:#0f172a;border-radius:10px;padding:10px;border:1px solid #1e293b}
.tbl-mode-cards .tbl td{display:flex;align-items:center;gap:6px;padding:2px 0;border:none;font-size:12px}
.tbl-mode-cards .tbl td::before{content:attr(data-label) ": ";font-size:10px;color:#475569;font-weight:700;min-width:65px;text-transform:uppercase;letter-spacing:.04em}`,
    `const MODULES = [
  ['01','HTML5 Семантика','10','✅'],
  ['02','CSS3 Майстерність','12','✅'],
  ['03','CSS Анімації','10','✅'],
  ['04','JavaScript Основи','15','✅'],
  ['05','DOM Інтерактивність','12','✅'],
  ['06','Адаптивний дизайн','8','⚡'],
  ['07','Async / API','12','📋'],
  ['08','Node.js Основи','14','📋'],
];

const tbody = document.getElementById('tbl2-body');
MODULES.forEach(([m,t,l,s]) => {
  const tr = document.createElement('tr');
  const statusCls = s==='✅'?'ok':s==='⚡'?'wip':'plan';
  tr.innerHTML = \`<td data-label="Модуль">M\${m}</td><td data-label="Тема">\${t}</td><td data-label="Уроків">\${l}</td><td data-label="Статус"><span class="tbl-badge \${statusCls}">\${s}</span></td>\`;
  tbody.appendChild(tr);
});

function switchMode(mode) {
  const c = document.getElementById('tbl-container');
  c.className = 'tbl-mode-' + mode;
  document.getElementById('btn-tbl').classList.toggle('active-mode', mode==='table');
  document.getElementById('btn-cards').classList.toggle('active-mode', mode==='cards');
}`,
    [
      { level:'easy',   uk:'Зменш вікно до 400px — бачиш горизонтальний скрол у першій таблиці? Переключи на Cards в другій таблиці.',  ru:'Уменьши окно до 400px — горизонтальный скрол в первой таблице? Переключи Cards во второй.' },
      { level:'medium', uk:'Знайди data-label атрибути у HTML і td::before у CSS. Поясни як вони дозволяють показати "мітку" замість thead.',  ru:'Найди data-label и td::before в CSS. Объясни как они показывают "метку" вместо thead.' },
      { level:'hard',   uk:'Додай "sort by click" на th заголовки першої таблиці (клік по заголовку сортує рядки за цією колонкою).',  ru:'Добавь "sort by click" на th заголовки первой таблицы.' },
    ]
  );

  /* ─── 06-08 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('06-08',
    { uk:`<h2>ПРОЕКТ: Повністю адаптивний лендінг</h2>
<p>Побудуй адаптивний лендінг що використовує всі техніки модуля.</p>
<h3>Обов'язковий функціонал</h3>
<ol>
  <li>Hero секція висотою 100dvh з fluid typography (clamp)</li>
  <li>Адаптивна Grid сітка (cards) — 1 → 2 → 3 колонки</li>
  <li>Dark / Light mode перемикач (з localStorage)</li>
  <li>Навігація що ховається на мобільних (hamburger)</li>
  <li>@media breakpoints: 480px, 768px, 1024px</li>
  <li>Адаптивна таблиця або wide-контент</li>
</ol>
<h3>Рекомендований стек</h3>
<ul>
  <li>CSS Custom Properties для тем</li>
  <li>clamp() для типографіки і відступів</li>
  <li>Viewport units для hero</li>
  <li>container-type для карток (бонус)</li>
</ul>`,
      ru:`<h2>ПРОЕКТ: Адаптивний лендінг</h2>
<h3>Обязательный функционал</h3>
<ol>
  <li>Hero секция 100dvh с fluid typography</li>
  <li>Адаптивная сетка: 1 → 2 → 3 колонки</li>
  <li>Dark / Light режим с localStorage</li>
  <li>Гамбургер-навигация для мобильных</li>
  <li>Breakpoints: 480px, 768px, 1024px</li>
  <li>Адаптивная таблица</li>
</ol>` },
    `<!DOCTYPE html>
<html lang="uk" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>WebCraft Academy — Landing</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Header / Nav -->
  <header class="site-header">
    <div class="container">
      <a class="logo" href="#">🌐 WebCraft</a>
      <nav class="site-nav" id="site-nav">
        <a href="#courses">Курси</a>
        <a href="#features">Переваги</a>
        <a href="#pricing">Ціни</a>
        <a href="#contact">Контакт</a>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()">🌙</button>
        <button class="burger" id="burger" onclick="toggleNav()">☰</button>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero" id="hero">
    <div class="container">
      <span class="hero-eyebrow">My Computer Academy</span>
      <h1 class="hero-title">Навчи дітей<br>створювати<br><span class="accent">веб-майбутнє</span></h1>
      <p class="hero-sub">3 вікові групи · 490 уроків · Реальні проекти</p>
      <div class="hero-cta">
        <button class="btn-primary">Розпочати навчання</button>
        <button class="btn-secondary">Дивитись програму</button>
      </div>
    </div>
  </section>

  <!-- Features grid -->
  <section class="section" id="features">
    <div class="container">
      <h2 class="section-title">Чому WebCraft?</h2>
      <div class="features-grid">
        <div class="feat-card"><span class="feat-icon">🎯</span><h3>Структурована програма</h3><p>Від основ до повноцінних проектів за 6–8 місяців</p></div>
        <div class="feat-card"><span class="feat-icon">🖥</span><h3>Інтерактивне середовище</h3><p>Live редактор прямо в браузері, без жодних налаштувань</p></div>
        <div class="feat-card"><span class="feat-icon">📱</span><h3>Адаптивно до пристрою</h3><p>Навчайся з будь-якого пристрою у зручний час</p></div>
        <div class="feat-card"><span class="feat-icon">🏆</span><h3>Реальні проекти</h3><p>Кожен модуль завершується справжнім проектом у портфоліо</p></div>
        <div class="feat-card"><span class="feat-icon">🌐</span><h3>Двомовний контент</h3><p>Всі матеріали доступні українською та російською</p></div>
        <div class="feat-card"><span class="feat-icon">⚡</span><h3>Практичний підхід</h3><p>70% практики, 30% теорії — оптимальне співвідношення</p></div>
      </div>
    </div>
  </section>

  <!-- Courses table -->
  <section class="section" id="courses">
    <div class="container">
      <h2 class="section-title">Програми навчання</h2>
      <div class="table-wrap">
        <table class="courses-table">
          <thead><tr><th>Група</th><th>Вік</th><th>Модулів</th><th>Уроків</th><th>Акцент</th><th>Статус</th></tr></thead>
          <tbody>
            <tr><td data-label="Група">Веб-Старт</td><td data-label="Вік">8–11</td><td data-label="Модулів">12</td><td data-label="Уроків">150</td><td data-label="Акцент">HTML · CSS · JS</td><td data-label="Статус"><span class="badge badge-ok">✅ Готово</span></td></tr>
            <tr><td data-label="Група">Веб-Розробник</td><td data-label="Вік">10–14</td><td data-label="Модулів">14</td><td data-label="Уроків">170</td><td data-label="Акцент">DOM · API · Modules</td><td data-label="Статус"><span class="badge badge-wip">⚡ В роботі</span></td></tr>
            <tr><td data-label="Група">Фулстек-Про</td><td data-label="Вік">14–18</td><td data-label="Модулів">12</td><td data-label="Уроків">170</td><td data-label="Акцент">Node · React · DB</td><td data-label="Статус"><span class="badge badge-plan">📋 Планується</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <span>🌐 WebCraft Academy © 2025</span>
      <span>sosca17@gmail.com</span>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
    `/* ── Tokens ── */
:root {
  --bg:      #0f172a;
  --surface: #1e293b;
  --card:    #0f172a;
  --border:  #334155;
  --text:    #f1f5f9;
  --muted:   #94a3b8;
  --accent:  #3b82f6;
  --accent2: #7dd3fc;
}
[data-theme="light"] {
  --bg: #f8fafc; --surface: #ffffff; --card: #f1f5f9;
  --border: #e2e8f0; --text: #0f172a; --muted: #64748b;
}

*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);transition:background .3s,color .3s;line-height:1.6}
.container{max-width:960px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}

/* ── Header ── */
.site-header{position:sticky;top:0;z-index:100;background:var(--surface);border-bottom:1px solid var(--border);backdrop-filter:blur(10px)}
.site-header .container{display:flex;align-items:center;gap:16px;height:60px}
.logo{font-size:16px;font-weight:900;color:var(--text);text-decoration:none}
.site-nav{display:flex;gap:20px;margin-left:auto}
.site-nav a{color:var(--muted);text-decoration:none;font-size:13px;transition:.2s}
.site-nav a:hover{color:var(--text)}
.header-actions{display:flex;gap:8px;align-items:center}
.theme-toggle{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:6px 10px;cursor:pointer;font-size:14px;transition:.2s}
.burger{display:none;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:6px 10px;cursor:pointer;font-size:14px}

/* ── Hero ── */
.hero{min-height:100dvh;display:flex;align-items:center;background:linear-gradient(135deg,var(--bg),var(--surface))}
.hero-eyebrow{display:block;font-size:clamp(11px,1.5vw,13px);text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:12px}
.hero-title{font-size:clamp(32px,7vw,80px);font-weight:900;line-height:1.05;color:var(--text);margin-bottom:16px}
.accent{color:var(--accent)}
.hero-sub{font-size:clamp(14px,2vw,18px);color:var(--muted);margin-bottom:28px}
.hero-cta{display:flex;gap:10px;flex-wrap:wrap}
.btn-primary{background:var(--accent);border:none;color:#fff;padding:clamp(10px,2vw,14px) clamp(20px,4vw,32px);border-radius:10px;font-size:clamp(13px,1.5vw,15px);font-weight:700;cursor:pointer;transition:.2s}
.btn-primary:hover{opacity:.85}
.btn-secondary{background:transparent;border:1px solid var(--border);color:var(--text);padding:clamp(10px,2vw,14px) clamp(20px,4vw,32px);border-radius:10px;font-size:clamp(13px,1.5vw,15px);font-weight:700;cursor:pointer;transition:.2s}
.btn-secondary:hover{border-color:var(--accent);color:var(--accent)}

/* ── Section ── */
.section{padding:clamp(40px,8vw,80px) 0}
.section-title{font-size:clamp(22px,4vw,36px);font-weight:900;color:var(--text);text-align:center;margin-bottom:clamp(24px,4vw,48px)}

/* ── Features grid ── */
.features-grid{display:grid;grid-template-columns:1fr;gap:clamp(12px,2vw,20px)}
.feat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:clamp(14px,2vw,24px);transition:.2s}
.feat-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.feat-icon{font-size:28px;display:block;margin-bottom:10px}
.feat-card h3{font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px}
.feat-card p{font-size:13px;color:var(--muted);line-height:1.5}

/* ── Table ── */
.table-wrap{overflow-x:auto;border-radius:10px;border:1px solid var(--border);-webkit-overflow-scrolling:touch}
.courses-table{width:100%;border-collapse:collapse;min-width:480px}
.courses-table th{background:var(--card);padding:10px 14px;font-size:11px;text-transform:uppercase;color:var(--muted);text-align:left;border-bottom:1px solid var(--border);letter-spacing:.05em}
.courses-table td{padding:10px 14px;color:var(--muted);border-bottom:1px solid var(--border);font-size:13px}
.courses-table tr:last-child td{border:none}
.courses-table tr:hover td{background:rgba(59,130,246,.04)}
.badge{padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;white-space:nowrap}
.badge-ok{background:rgba(16,185,129,.15);color:#6ee7b7}
.badge-wip{background:rgba(245,158,11,.15);color:#fcd34d}
.badge-plan{background:rgba(100,116,139,.15);color:#94a3b8}

/* ── Footer ── */
.site-footer{border-top:1px solid var(--border);padding:20px 0;background:var(--surface)}
.site-footer .container{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);flex-wrap:wrap;gap:8px}

/* ── Breakpoints ── */
@media(min-width:480px){.features-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:768px){.features-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:680px){
  .site-nav{display:none;position:absolute;top:60px;left:0;right:0;background:var(--surface);border-bottom:1px solid var(--border);padding:16px;flex-direction:column;gap:12px}
  .site-nav.open{display:flex}
  .burger{display:block}
  .courses-table{min-width:0;display:block}
  .courses-table thead{display:none}
  .courses-table tbody,.courses-table tr,.courses-table td{display:block}
  .courses-table tr{padding:12px;border-bottom:1px solid var(--border);background:var(--card)}
  .courses-table td{padding:3px 0;border:none;font-size:12px;display:flex;align-items:center;gap:6px}
  .courses-table td::before{content:attr(data-label)": ";font-weight:700;font-size:10px;text-transform:uppercase;color:var(--muted);min-width:80px}
}

@media print{
  .site-header,.site-footer,.hero-cta,.btn-primary,.btn-secondary,.theme-toggle,.burger{display:none!important}
  body{background:white!important;color:black!important}
  .features-grid{grid-template-columns:repeat(3,1fr)}
  .feat-card{border:1px solid #ccc;break-inside:avoid}
  @page{size:A4;margin:2cm}
}`,
    `function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  document.getElementById('theme-toggle').textContent = next === 'dark' ? '🌙' : '☀️';
  try { localStorage.setItem('wc-theme', next); } catch(_) {}
}

function toggleNav() {
  document.getElementById('site-nav').classList.toggle('open');
}

// Close nav on link click
document.querySelectorAll('.site-nav a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('site-nav').classList.remove('open');
  });
});

// Init theme
(function() {
  let t;
  try { t = localStorage.getItem('wc-theme'); } catch(_) {}
  if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = t;
  document.getElementById('theme-toggle').textContent = t === 'dark' ? '🌙' : '☀️';
})();`,
    [
      { level:'easy',   uk:'Натисни 🌙 — перемикнись між темами. Зменш вікно до 400px — hamburgер-навігація та cards-таблиця.',  ru:'Нажми 🌙 — переключи темы. Уменьши до 400px — гамбургер и карточки в таблице.' },
      { level:'medium', uk:'Знайди у CSS всі clamp() виклики. Поясни кожен — що мінімальне, що максимальне, що fluid.',  ru:'Найди в CSS все clamp(). Объясни каждый — minimum, fluid, maximum.' },
      { level:'hard',   uk:'Додай секцію "Відгуки" з горизонтальним carousel (CSS scroll-snap-type) — адаптивно для мобільних.',  ru:'Добавь секцию "Отзывы" с horizontal carousel (CSS scroll-snap-type) — адаптивно.' },
    ]
  );

})();
