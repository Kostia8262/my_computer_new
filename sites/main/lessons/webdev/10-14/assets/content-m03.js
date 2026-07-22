/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 03 — CSS Анімації та ефекти · 10–14 Веб-Розробник
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
input,select{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:8px 12px;border-radius:8px;font-size:13px;font-family:inherit;transition:.2s}
input:focus,select:focus{outline:none;border-color:#3b82f6}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}`;

  /* ─── 03-01 ──────────────────────────────────────────────── */
  patch('03-01',
    { uk:`<h2>Transitions: cubic-bezier та easing-функції</h2>
<p>CSS transition анімує зміну властивості між двома станами. <code>transition-timing-function</code> визначає як рухається анімація у часі.</p>
<h3>Синтаксис</h3>
<pre>transition: property duration timing-function delay;

button {
  transition: background .3s ease-out,
              transform  .2s cubic-bezier(.34,1.56,.64,1);
}</pre>
<h3>Стандартні функції</h3>
<ul>
  <li><code>linear</code> — рівномірно</li>
  <li><code>ease</code> — повільно-швидко-повільно (default)</li>
  <li><code>ease-in</code> — прискорення на початку</li>
  <li><code>ease-out</code> — гальмування в кінці</li>
  <li><code>ease-in-out</code> — обидва</li>
</ul>
<h3>cubic-bezier(x1, y1, x2, y2)</h3>
<pre>/* Пружний overshoot: */
cubic-bezier(.34, 1.56, .64, 1)
/* Повільний старт, швидкий кінець: */
cubic-bezier(.4, 0, .2, 1)   /* Material Design */
/* Різкий старт: */
cubic-bezier(.9, 0, .1, 1)</pre>
<h3>steps()</h3>
<pre>/* Покадрова анімація (sprite): */
transition: background-position .8s steps(8);</pre>`,
      ru:`<h2>Transitions: cubic-bezier</h2>
<pre>transition: property duration timing-function delay;

button {
  transition: background .3s ease-out,
              transform .2s cubic-bezier(.34,1.56,.64,1);
}</pre>
<h3>Стандартные функции</h3>
<ul>
  <li><code>linear</code> — равномерно</li>
  <li><code>ease</code> — медленно-быстро-медленно</li>
  <li><code>ease-out</code> — торможение в конце</li>
</ul>
<h3>cubic-bezier(x1, y1, x2, y2)</h3>
<pre>/* Пружинный overshoot: */
cubic-bezier(.34, 1.56, .64, 1)
/* Material Design: */
cubic-bezier(.4, 0, .2, 1)</pre>` },
    `<div class="cb-lab">
  <h2>🎯 cubic-bezier редактор</h2>

  <div class="cb-layout">
    <div class="cb-left">
      <!-- Графік кривої -->
      <canvas id="cb-canvas" width="200" height="200"></canvas>
      <div class="cb-points">
        <div class="cp-row">P1: x<input type="number" id="x1" min="-1" max="2" step=".01" value=".34"> y<input type="number" id="y1" min="-1" max="2" step=".01" value="1.56"></div>
        <div class="cp-row">P2: x<input type="number" id="x2" min="-1" max="2" step=".01" value=".64"> y<input type="number" id="y2" min="-1" max="2" step=".01" value="1"></div>
      </div>
      <pre class="cb-out" id="cb-out">cubic-bezier(.34,1.56,.64,1)</pre>
    </div>
    <div class="cb-right">
      <h3>Presets</h3>
      <div class="preset-btns">
        <button onclick="setPreset(.34,1.56,.64,1)">🌊 Bounce</button>
        <button onclick="setPreset(.4,0,.2,1)">⚡ Material</button>
        <button onclick="setPreset(.9,0,.1,1)">🔥 Sharp</button>
        <button onclick="setPreset(0,0,1,1)">➖ Linear</button>
        <button onclick="setPreset(.25,.1,.25,1)">〰️ Ease</button>
        <button onclick="setPreset(.42,0,1,1)">→ Ease-in</button>
        <button onclick="setPreset(0,0,.58,1)">← Ease-out</button>
      </div>
      <h3 style="margin-top:12px">Демо</h3>
      <button class="play-btn" onclick="runDemo()">▶ Run Demo</button>
      <div class="demo-track">
        <div class="demo-ball" id="demo-ball">●</div>
      </div>
      <div class="duration-row">
        <label>Duration <span id="dur-v">600</span>ms
          <input type="range" id="dur-range" min="100" max="2000" value="600" oninput="document.getElementById('dur-v').textContent=this.value">
        </label>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.cb-lab{max-width:520px}
.cb-layout{display:flex;gap:16px;flex-wrap:wrap}
.cb-left{display:flex;flex-direction:column;gap:8px}
#cb-canvas{background:#1e293b;border-radius:10px;border:1px solid #334155;cursor:crosshair}
.cb-points{display:flex;flex-direction:column;gap:6px}
.cp-row{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b}
.cp-row input{width:58px;padding:5px 8px;font-size:12px;text-align:center;margin:0}
.cb-out{background:#0f172a;border:1px solid #1e293b;border-radius:6px;padding:8px;font-size:11px;color:#7dd3fc;font-family:monospace}
.cb-right{flex:1;min-width:200px}
.preset-btns{display:flex;flex-wrap:wrap;gap:5px}
.preset-btns button{padding:5px 10px;font-size:11px}
.play-btn{width:100%;margin-bottom:10px;background:#1d4ed8;border-color:#3b82f6;color:#fff;font-weight:700}
.demo-track{position:relative;background:#1e293b;border-radius:8px;height:44px;overflow:hidden;margin-bottom:8px}
.demo-ball{position:absolute;left:4px;top:50%;transform:translateY(-50%);font-size:20px;transition:left .6s cubic-bezier(.34,1.56,.64,1)}
.duration-row label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}
.duration-row label span{min-width:32px;font-family:monospace;color:#94a3b8}
.duration-row input{flex:1;accent-color:#3b82f6;cursor:pointer}`,
    `const canvas = document.getElementById('cb-canvas');
const ctx    = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

function getVals() {
  return [
    parseFloat(document.getElementById('x1').value),
    parseFloat(document.getElementById('y1').value),
    parseFloat(document.getElementById('x2').value),
    parseFloat(document.getElementById('y2').value),
  ];
}

function drawCurve() {
  const [x1,y1,x2,y2] = getVals();
  ctx.clearRect(0,0,W,H);
  const pad = 24;
  const iW = W - pad*2, iH = H - pad*2;
  const px = v => pad + v * iW;
  const py = v => H - pad - v * iH;

  // Grid
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1;
  for(let i=0;i<=4;i++){
    ctx.beginPath(); ctx.moveTo(pad,pad+i*iH/4); ctx.lineTo(W-pad,pad+i*iH/4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad+i*iW/4,pad); ctx.lineTo(pad+i*iW/4,H-pad); ctx.stroke();
  }

  // Diagonal
  ctx.strokeStyle='#334155'; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.moveTo(px(0),py(0)); ctx.lineTo(px(1),py(1)); ctx.stroke();
  ctx.setLineDash([]);

  // Handle lines
  ctx.strokeStyle='#334155'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(px(0),py(0)); ctx.lineTo(px(x1),py(y1)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(px(1),py(1)); ctx.lineTo(px(x2),py(y2)); ctx.stroke();

  // Curve (cubic bezier approximation)
  ctx.strokeStyle='#3b82f6'; ctx.lineWidth=2.5;
  ctx.beginPath();
  ctx.moveTo(px(0),py(0));
  ctx.bezierCurveTo(px(x1),py(y1),px(x2),py(y2),px(1),py(1));
  ctx.stroke();

  // Control points
  [[x1,y1,'#f59e0b'],[x2,y2,'#10b981']].forEach(([x,y,c]) => {
    ctx.beginPath(); ctx.arc(px(x),py(y),5,0,Math.PI*2);
    ctx.fillStyle=c; ctx.fill();
    ctx.strokeStyle='#fff'; ctx.lineWidth=1; ctx.stroke();
  });
  // Start/end
  [[0,0],[1,1]].forEach(([x,y])=>{
    ctx.beginPath(); ctx.arc(px(x),py(y),4,0,Math.PI*2);
    ctx.fillStyle='#94a3b8'; ctx.fill();
  });

  const [a,b,c,d] = getVals().map(v=>Math.round(v*100)/100);
  document.getElementById('cb-out').textContent = 'cubic-bezier(' + a + ',' + b + ',' + c + ',' + d + ')';
  // Update demo ball transition
  document.getElementById('demo-ball').style.transition =
    'left ' + document.getElementById('dur-range').value + 'ms cubic-bezier(' + a + ',' + b + ',' + c + ',' + d + ')';
}

['x1','y1','x2','y2'].forEach(id => document.getElementById(id).addEventListener('input', drawCurve));

// Drag control points on canvas
let dragging = null;
canvas.addEventListener('mousedown', e => {
  const pad = 24, iW = W-pad*2, iH = H-pad*2;
  const [x1,y1,x2,y2] = getVals();
  const mx = (e.offsetX-pad)/iW, my = 1-(e.offsetY-pad)/iH;
  const d1 = Math.hypot(mx-x1,my-y1), d2 = Math.hypot(mx-x2,my-y2);
  if(d1<.1) dragging='1'; else if(d2<.1) dragging='2';
});
canvas.addEventListener('mousemove', e => {
  if(!dragging) return;
  const pad=24, iW=W-pad*2, iH=H-pad*2;
  const mx = Math.max(-1,Math.min(2,(e.offsetX-pad)/iW));
  const my = Math.max(-1,Math.min(2,1-(e.offsetY-pad)/iH));
  document.getElementById('x'+dragging).value = Math.round(mx*100)/100;
  document.getElementById('y'+dragging).value = Math.round(my*100)/100;
  drawCurve();
});
canvas.addEventListener('mouseup', () => dragging = null);

function setPreset(a,b,c,d) {
  document.getElementById('x1').value=a; document.getElementById('y1').value=b;
  document.getElementById('x2').value=c; document.getElementById('y2').value=d;
  drawCurve();
}

let ballRight = false;
function runDemo() {
  const ball = document.getElementById('demo-ball');
  const track = ball.parentElement;
  ballRight = !ballRight;
  ball.style.left = ballRight ? (track.clientWidth - 34) + 'px' : '4px';
}

drawCurve();`,
    [
      { level:'easy',   uk:'Натисни кожен preset і запусти Demo — відчуй різницю між Bounce і Linear.',  ru:'Нажми каждый preset и запусти Demo — почувствуй разницу между Bounce и Linear.' },
      { level:'medium', uk:'Потягни жовту точку P1 вище лінії y=1 (overshoot) — що відбувається з анімацією? Чому кулька "вистрибує" за межу?',  ru:'Потяни жёлтую точку P1 выше линии y=1 — что происходит с анимацией? Почему шарик "выпрыгивает"?' },
      { level:'hard',   uk:'Відтвори cubic-bezier для Material Design "standard easing": повільний старт, швидка середина, повільне закінчення. Знайди точні значення на material.io.',  ru:'Воспроизведи cubic-bezier для Material Design "standard easing". Найди точные значения на material.io.' },
    ]
  );

  /* ─── 03-02 ──────────────────────────────────────────────── */
  patch('03-02',
    { uk:`<h2>Transform 3D: perspective, rotateX, rotateY, rotateZ</h2>
<h3>Perspective — глибина сцени</h3>
<pre>/* На батьківському елементі: */
.scene { perspective: 600px; }

/* Або безпосередньо у transform: */
.card { transform: perspective(600px) rotateY(45deg); }</pre>
<h3>3D трансформації</h3>
<pre>transform: rotateX(45deg);   /* нахил по горизонтальній осі */
transform: rotateY(45deg);   /* поворот по вертикальній осі */
transform: rotateZ(45deg);   /* = rotate(45deg) */
transform: rotate3d(1,1,0,45deg); /* довільна вісь */
transform: translateZ(100px);     /* вперед / назад */
transform: scale3d(1.2,1.2,1);
transform-style: preserve-3d;     /* зберегти 3D для дочірніх */</pre>
<h3>3D Card Flip</h3>
<pre>.scene { perspective: 800px; }
.card  { transform-style: preserve-3d; transition: transform .6s; }
.card.flipped { transform: rotateY(180deg); }
.front, .back { backface-visibility: hidden; }
.back { transform: rotateY(180deg); }</pre>`,
      ru:`<h2>Transform 3D</h2>
<pre>.scene { perspective: 600px; }
.card  { transform: perspective(600px) rotateY(45deg); }</pre>
<h3>3D трансформации</h3>
<pre>rotateX(45deg)
rotateY(45deg)
translateZ(100px)
transform-style: preserve-3d;
backface-visibility: hidden;</pre>
<h3>Card Flip</h3>
<pre>.card { transform-style:preserve-3d; transition:transform .6s; }
.card.flipped { transform: rotateY(180deg); }
.back { transform: rotateY(180deg); }</pre>` },
    `<div class="t3d-lab">
  <h2>🎲 3D Transform Lab</h2>

  <!-- Контролери -->
  <div class="t3d-controls">
    <label>perspective <span id="persp-v">600</span>px
      <input type="range" id="persp" min="100" max="2000" value="600" oninput="update3d()">
    </label>
    <label>rotateX <span id="rx-v">0</span>°
      <input type="range" id="rx" min="-180" max="180" value="0" oninput="update3d()">
    </label>
    <label>rotateY <span id="ry-v">25</span>°
      <input type="range" id="ry" min="-180" max="180" value="25" oninput="update3d()">
    </label>
    <label>rotateZ <span id="rz-v">0</span>°
      <input type="range" id="rz" min="-180" max="180" value="0" oninput="update3d()">
    </label>
    <label>translateZ <span id="tz-v">0</span>px
      <input type="range" id="tz" min="-300" max="300" value="0" oninput="update3d()">
    </label>
    <label>scale <span id="sc3-v">1.0</span>
      <input type="range" id="sc3" min="0.2" max="2" step=".05" value="1" oninput="update3d()">
    </label>
  </div>

  <div class="t3d-scene" id="t3d-scene">
    <div class="t3d-box" id="t3d-box">
      <div class="t3d-face f-front">Front</div>
      <div class="t3d-face f-back">Back</div>
      <div class="t3d-face f-left">Left</div>
      <div class="t3d-face f-right">Right</div>
      <div class="t3d-face f-top">Top</div>
      <div class="t3d-face f-bottom">Bottom</div>
    </div>
  </div>

  <pre class="t3d-out" id="t3d-out"></pre>

  <!-- Flip card demo -->
  <div class="flip-demo">
    <h3>Card Flip</h3>
    <div class="flip-scene">
      <div class="flip-card" id="flip-card" onclick="this.classList.toggle('flipped')">
        <div class="flip-front">
          <div class="ff-icon">🎨</div>
          <div class="ff-title">CSS Magic</div>
          <div class="ff-hint">Клікни щоб перевернути →</div>
        </div>
        <div class="flip-back">
          <div class="fb-icon">✅</div>
          <div class="fb-title">backface-visibility: hidden</div>
          <div class="fb-code">transform: rotateY(180deg)</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.t3d-lab{max-width:520px}
.t3d-controls{display:flex;flex-direction:column;gap:6px;background:#1e293b;border-radius:10px;padding:14px;margin-bottom:12px}
.t3d-controls label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}
.t3d-controls label span{min-width:38px;font-family:monospace;color:#94a3b8;text-align:right}
.t3d-controls input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}
.t3d-scene{height:160px;display:flex;align-items:center;justify-content:center;perspective:600px;margin-bottom:8px;background:#0f172a;border-radius:10px;border:1px solid #1e293b}
.t3d-box{width:80px;height:80px;transform-style:preserve-3d;position:relative;transition:.1s}
.t3d-face{position:absolute;width:80px;height:80px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:1px solid rgba(59,130,246,.4)}
.f-front {background:rgba(59,130,246,.25);transform:translateZ(40px)}
.f-back  {background:rgba(139,92,246,.25);transform:rotateY(180deg) translateZ(40px)}
.f-left  {background:rgba(16,185,129,.15);transform:rotateY(-90deg) translateZ(40px)}
.f-right {background:rgba(245,158,11,.15);transform:rotateY(90deg)  translateZ(40px)}
.f-top   {background:rgba(239,68,68,.15); transform:rotateX(90deg)  translateZ(40px)}
.f-bottom{background:rgba(100,116,139,.15);transform:rotateX(-90deg) translateZ(40px)}
.t3d-out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:11px;color:#7dd3fc;font-family:monospace;overflow-x:auto;white-space:pre;margin-bottom:12px}

.flip-demo h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:10px}
.flip-scene{perspective:800px;display:flex;justify-content:center}
.flip-card{width:200px;height:130px;position:relative;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.4,0,.2,1);cursor:pointer}
.flip-card.flipped{transform:rotateY(180deg)}
.flip-front,.flip-back{position:absolute;inset:0;border-radius:12px;backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
.flip-front{background:linear-gradient(135deg,#1d4ed8,#7c3aed)}
.flip-back{background:linear-gradient(135deg,#059669,#0d9488);transform:rotateY(180deg)}
.ff-icon,.fb-icon{font-size:28px}
.ff-title,.fb-title{font-size:14px;font-weight:700;color:#fff}
.ff-hint{font-size:11px;color:rgba(255,255,255,.6)}
.fb-code{font-size:10px;color:rgba(255,255,255,.7);font-family:monospace}`,
    `function update3d() {
  const p  = document.getElementById('persp').value;
  const rx = document.getElementById('rx').value;
  const ry = document.getElementById('ry').value;
  const rz = document.getElementById('rz').value;
  const tz = document.getElementById('tz').value;
  const sc = document.getElementById('sc3').value;
  document.getElementById('persp-v').textContent = p;
  document.getElementById('rx-v').textContent    = rx;
  document.getElementById('ry-v').textContent    = ry;
  document.getElementById('rz-v').textContent    = rz;
  document.getElementById('tz-v').textContent    = tz;
  document.getElementById('sc3-v').textContent   = parseFloat(sc).toFixed(2);
  document.getElementById('t3d-scene').style.perspective = p + 'px';
  const t = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg) translateZ(' + tz + 'px) scale(' + sc + ')';
  document.getElementById('t3d-box').style.transform = t;
  document.getElementById('t3d-out').textContent = '.scene { perspective: ' + p + 'px; }\n.box   { transform: ' + t + '; }';
}
update3d();`,
    [
      { level:'easy',   uk:'Клікни на Flip Card — поспостерігай за анімацією повороту. Де в CSS знаходиться backface-visibility?',  ru:'Кликни на Flip Card — наблюдай за анимацией поворота. Где в CSS находится backface-visibility?' },
      { level:'medium', uk:'Встанови perspective на 100px (мала глибина) і 2000px (велика). Як змінюється відчуття 3D? Що відбувається при малому значенні?',  ru:'Установи perspective 100px и 2000px. Как меняется ощущение 3D? Что происходит при малом значении?' },
      { level:'hard',   uk:'Зроби куб який крутиться автоматично: @keyframes spin { from{transform:rotateY(0)} to{transform:rotateY(360deg)} } animation: spin 3s linear infinite.',  ru:'Сделай куб который крутится автоматически: @keyframes spin { from{transform:rotateY(0)} to{transform:rotateY(360deg)} }' },
    ]
  );

  /* ─── 03-03 ──────────────────────────────────────────────── */
  patch('03-03',
    { uk:`<h2>@keyframes: складні багатокрокові анімації</h2>
<pre>@keyframes pulse {
  0%   { transform: scale(1);    box-shadow: 0 0 0 0 rgba(59,130,246,.7); }
  70%  { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(59,130,246,0); }
  100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(59,130,246,0); }
}

element {
  animation: name duration timing-function delay
             iteration-count direction fill-mode play-state;
  animation: pulse 2s ease-in-out infinite;
}</pre>
<h3>Властивості animation</h3>
<ul>
  <li><code>iteration-count</code>: число або <code>infinite</code></li>
  <li><code>direction</code>: <code>normal</code>, <code>reverse</code>, <code>alternate</code>, <code>alternate-reverse</code></li>
  <li><code>fill-mode</code>: <code>forwards</code> (залишитись у кінцевому стані), <code>backwards</code>, <code>both</code></li>
  <li><code>play-state</code>: <code>running</code> | <code>paused</code></li>
</ul>
<h3>Кілька анімацій</h3>
<pre>animation: slideIn .5s ease,
           fadeIn  .3s ease,
           pulse   2s ease 1s infinite;</pre>`,
      ru:`<h2>@keyframes</h2>
<pre>@keyframes pulse {
  0%   { transform: scale(1); }
  70%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}
element {
  animation: pulse 2s ease-in-out infinite;
}</pre>
<h3>Свойства animation</h3>
<ul>
  <li><code>iteration-count</code>: число или <code>infinite</code></li>
  <li><code>direction</code>: alternate, reverse</li>
  <li><code>fill-mode</code>: forwards, backwards, both</li>
  <li><code>play-state</code>: running | paused</li>
</ul>` },
    `<div class="kf-lab">
  <h2>🎬 @keyframes конструктор</h2>

  <div class="kf-editor">
    <div class="kf-stage">
      <div class="kf-target" id="kf-target">🚀</div>
    </div>
    <div class="kf-controls">
      <label>Duration <span id="kf-dur-v">1.0</span>s
        <input type="range" id="kf-dur" min=".1" max="4" step=".1" value="1" oninput="updateAnim()">
      </label>
      <label>Iteration
        <select id="kf-iter" onchange="updateAnim()">
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="infinite" selected>infinite</option>
        </select>
      </label>
      <label>Direction
        <select id="kf-dir" onchange="updateAnim()">
          <option value="normal" selected>normal</option>
          <option value="alternate">alternate</option>
          <option value="reverse">reverse</option>
          <option value="alternate-reverse">alt-reverse</option>
        </select>
      </label>
      <label>Fill mode
        <select id="kf-fill" onchange="updateAnim()">
          <option value="none">none</option>
          <option value="forwards" selected>forwards</option>
          <option value="both">both</option>
        </select>
      </label>
      <button onclick="togglePause()" id="pause-btn">⏸ Pause</button>
    </div>
  </div>

  <!-- Вибір ефекту -->
  <div class="kf-presets">
    <h3>Ефекти</h3>
    <div class="kf-preset-btns">
      <button onclick="applyEffect('pulse')">💓 Pulse</button>
      <button onclick="applyEffect('slideIn')">→ Slide In</button>
      <button onclick="applyEffect('bounce')">🏀 Bounce</button>
      <button onclick="applyEffect('spin')">🌀 Spin</button>
      <button onclick="applyEffect('shake')">📳 Shake</button>
      <button onclick="applyEffect('flip3d')">🔄 Flip 3D</button>
      <button onclick="applyEffect('typing')">⌨️ Typing</button>
    </div>
  </div>

  <pre class="kf-out" id="kf-out"></pre>
</div>`,
    `${BASE}
.kf-lab{max-width:520px}
.kf-editor{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.kf-stage{flex:0 0 180px;height:130px;background:#1e293b;border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.kf-target{font-size:48px;display:inline-block}
.kf-controls{flex:1;min-width:180px;display:flex;flex-direction:column;gap:7px}
.kf-controls label{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b}
.kf-controls label span{min-width:28px;font-family:monospace;color:#94a3b8}
.kf-controls input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}
.kf-controls select{flex:1;padding:5px 8px;font-size:12px}
#pause-btn{margin-top:4px}

.kf-presets h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.kf-preset-btns{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px}
.kf-preset-btns button{padding:5px 10px;font-size:11px}
.kf-out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:12px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.7;overflow-x:auto;white-space:pre;max-height:180px;overflow-y:auto}

@keyframes pulse{0%{transform:scale(1);opacity:1}50%{transform:scale(1.2);opacity:.8}100%{transform:scale(1);opacity:1}}
@keyframes slideIn{0%{transform:translateX(-80px);opacity:0}100%{transform:translateX(0);opacity:1}}
@keyframes bounce{0%,100%{transform:translateY(0)}30%{transform:translateY(-30px)}60%{transform:translateY(-12px)}}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
@keyframes flip3d{0%{transform:perspective(400px) rotateY(0)}100%{transform:perspective(400px) rotateY(360deg)}}
@keyframes typing{0%{width:0;opacity:1}100%{width:100%;opacity:1}}`,
    `const EFFECTS = {
  pulse:  '@keyframes pulse {\n  0%   { transform: scale(1); opacity:1; }\n  50%  { transform: scale(1.2); opacity:.8; }\n  100% { transform: scale(1); opacity:1; }\n}',
  slideIn:'@keyframes slideIn {\n  0%   { transform: translateX(-80px); opacity:0; }\n  100% { transform: translateX(0); opacity:1; }\n}',
  bounce: '@keyframes bounce {\n  0%,100% { transform: translateY(0); }\n  30%  { transform: translateY(-30px); }\n  60%  { transform: translateY(-12px); }\n}',
  spin:   '@keyframes spin {\n  0%   { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}',
  shake:  '@keyframes shake {\n  0%,100% { transform: translateX(0); }\n  20% { transform: translateX(-8px); }\n  40% { transform: translateX(8px); }\n  60% { transform: translateX(-5px); }\n  80% { transform: translateX(5px); }\n}',
  flip3d: '@keyframes flip3d {\n  0%   { transform: perspective(400px) rotateY(0deg); }\n  100% { transform: perspective(400px) rotateY(360deg); }\n}',
  typing: '@keyframes typing {\n  0%   { width: 0; }\n  100% { width: 100%; }\n}',
};
let curEffect = 'pulse';

function applyEffect(name) {
  curEffect = name;
  updateAnim();
}

function updateAnim() {
  const dur  = document.getElementById('kf-dur').value;
  const iter = document.getElementById('kf-iter').value;
  const dir  = document.getElementById('kf-dir').value;
  const fill = document.getElementById('kf-fill').value;
  document.getElementById('kf-dur-v').textContent = parseFloat(dur).toFixed(1);
  const el = document.getElementById('kf-target');
  // re-trigger
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = curEffect + ' ' + dur + 's ease-in-out ' + iter + ' ' + dir + ' ' + fill;
  document.getElementById('kf-out').textContent =
    EFFECTS[curEffect] + '\n\n.element {\n  animation: ' + curEffect + ' ' + dur + 's ease-in-out ' + iter + ' ' + dir + ' ' + fill + ';\n}';
}

function togglePause() {
  const el = document.getElementById('kf-target');
  const btn = document.getElementById('pause-btn');
  const isPaused = el.style.animationPlayState === 'paused';
  el.style.animationPlayState = isPaused ? 'running' : 'paused';
  btn.textContent = isPaused ? '⏸ Pause' : '▶ Resume';
}

applyEffect('pulse');`,
    [
      { level:'easy',   uk:'Спробуй кожен ефект — натисни "⏸ Pause" щоб зупинити і "▶ Resume" щоб відновити.',  ru:'Попробуй каждый эффект — нажми "⏸ Pause" чтобы остановить и "▶ Resume" чтобы возобновить.' },
      { level:'medium', uk:'Встанови direction: alternate і iteration: infinite для Bounce — що змінилось? Тепер fill-mode: forwards — куди "залипає" елемент?',  ru:'Установи direction: alternate и iteration: infinite для Bounce. Теперь fill-mode: forwards — куда "залипает" элемент?' },
      { level:'hard',   uk:'Напиши власний @keyframes "neon" що змінює text-shadow від 0 до glowing blue color через 4 кроки — застосуй до .kf-target.',  ru:'Напиши собственный @keyframes "neon" который меняет text-shadow от 0 до glowing blue через 4 шага.' },
    ]
  );

  /* ─── 03-04 ──────────────────────────────────────────────── */
  patch('03-04',
    { uk:`<h2>Web Animations API: element.animate()</h2>
<p>WAAPI — JavaScript-інтерфейс для анімацій. Більш гнучкий за CSS: можна керувати, ставити на паузу, змінювати швидкість.</p>
<h3>Базовий синтаксис</h3>
<pre>const anim = el.animate(
  [ // keyframes (масив або об'єкт)
    { transform: 'translateY(0)', opacity: 1 },
    { transform: 'translateY(-20px)', opacity: 0.5, offset: 0.7 },
    { transform: 'translateY(0)', opacity: 1 },
  ],
  { // options
    duration: 1000,        // ms
    easing: 'ease-in-out',
    iterations: Infinity,
    direction: 'alternate',
    fill: 'forwards',
    delay: 500,
  }
);</pre>
<h3>Управління</h3>
<pre>anim.pause();
anim.play();
anim.reverse();
anim.cancel();
anim.finish();
anim.playbackRate = 2;    // прискорити
anim.currentTime = 500;   // перемотати (ms)</pre>
<h3>Події</h3>
<pre>anim.onfinish = () => console.log('Finished!');
anim.addEventListener('finish', handler);</pre>
<h3>Переваги над CSS</h3>
<ul>
  <li>Динамічні значення (обчислені в JS)</li>
  <li>Повний програмний контроль</li>
  <li>Зворотній зв'язок через Promise</li>
</ul>`,
      ru:`<h2>Web Animations API: element.animate()</h2>
<pre>const anim = el.animate(
  [
    { transform: 'translateY(0)', opacity: 1 },
    { transform: 'translateY(-20px)', opacity: 0.5 },
    { transform: 'translateY(0)', opacity: 1 },
  ],
  { duration: 1000, easing: 'ease-in-out', iterations: Infinity }
);</pre>
<h3>Управление</h3>
<pre>anim.pause(); anim.play(); anim.reverse();
anim.playbackRate = 2;
anim.currentTime = 500;</pre>` },
    `<div class="waapi-lab">
  <h2>🎮 Web Animations API</h2>

  <div class="waapi-stage" id="waapi-stage">
    <div class="waapi-el" id="waapi-el">🌟</div>
  </div>

  <!-- Keyframes builder -->
  <div class="kf-builder">
    <h3>Keyframes (0% → 100%)</h3>
    <div class="kf-frames" id="kf-frames">
      <div class="kf-frame">
        <span class="kf-f-label">0%</span>
        <input class="kf-f-css" value="translateY(0px) scale(1)" placeholder="transform value">
        <input class="kf-f-op" type="number" min="0" max="1" step=".1" value="1" title="opacity">
      </div>
      <div class="kf-frame">
        <span class="kf-f-label">50%</span>
        <input class="kf-f-css" value="translateY(-40px) scale(1.2)" placeholder="transform value">
        <input class="kf-f-op" type="number" min="0" max="1" step=".1" value="0.7" title="opacity">
      </div>
      <div class="kf-frame">
        <span class="kf-f-label">100%</span>
        <input class="kf-f-css" value="translateY(0px) scale(1)" placeholder="transform value">
        <input class="kf-f-op" type="number" min="0" max="1" step=".1" value="1" title="opacity">
      </div>
    </div>
  </div>

  <!-- Options -->
  <div class="waapi-opts">
    <label>Duration <span id="wa-dur-v">1000</span>ms
      <input type="range" id="wa-dur" min="100" max="5000" step="100" value="1000" oninput="document.getElementById('wa-dur-v').textContent=this.value">
    </label>
    <label>Rate <span id="wa-rate-v">1.0</span>x
      <input type="range" id="wa-rate" min="0.1" max="4" step=".1" value="1" oninput="setRate(this.value)">
    </label>
    <label>Easing
      <select id="wa-ease">
        <option value="ease-in-out" selected>ease-in-out</option>
        <option value="linear">linear</option>
        <option value="ease-out">ease-out</option>
        <option value="cubic-bezier(.34,1.56,.64,1)">bounce</option>
      </select>
    </label>
    <label>Iterations
      <select id="wa-iter">
        <option value="1">1</option>
        <option value="Infinity" selected>∞</option>
      </select>
    </label>
  </div>

  <!-- Кнопки управління -->
  <div class="waapi-btns">
    <button onclick="runWaapi()">▶ Play</button>
    <button onclick="currentAnim&&currentAnim.pause()">⏸ Pause</button>
    <button onclick="currentAnim&&currentAnim.play()">▶ Resume</button>
    <button onclick="currentAnim&&currentAnim.reverse()">⏪ Reverse</button>
    <button onclick="currentAnim&&currentAnim.cancel()">⏹ Cancel</button>
  </div>

  <div class="wa-status" id="wa-status">Готово</div>
</div>`,
    `${BASE}
.waapi-lab{max-width:520px}
.waapi-stage{height:120px;background:#1e293b;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;overflow:hidden;position:relative}
.waapi-el{font-size:48px;display:inline-block}

.kf-builder h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.kf-frames{display:flex;flex-direction:column;gap:6px;background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.kf-frame{display:flex;align-items:center;gap:8px}
.kf-f-label{min-width:30px;font-size:11px;color:#64748b;font-family:monospace}
.kf-f-css{flex:1;margin:0;padding:6px 10px;font-size:12px;font-family:monospace}
.kf-f-op{width:52px;margin:0;padding:6px 8px;font-size:12px;text-align:center}

.waapi-opts{display:flex;flex-direction:column;gap:6px;background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.waapi-opts label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}
.waapi-opts label span{min-width:36px;font-family:monospace;color:#94a3b8}
.waapi-opts input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}
.waapi-opts select{flex:1;padding:5px;font-size:12px}

.waapi-btns{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.waapi-btns button{padding:6px 12px;font-size:12px}
.wa-status{font-size:12px;color:#64748b;font-family:monospace;padding:6px 10px;background:#0f172a;border-radius:6px;border:1px solid #1e293b}`,
    `let currentAnim = null;

function runWaapi() {
  const el = document.getElementById('waapi-el');
  const frames = Array.from(document.querySelectorAll('.kf-frame')).map(row => ({
    transform: row.querySelector('.kf-f-css').value,
    opacity:   parseFloat(row.querySelector('.kf-f-op').value),
  }));
  const dur   = parseInt(document.getElementById('wa-dur').value);
  const ease  = document.getElementById('wa-ease').value;
  const iters = document.getElementById('wa-iter').value;
  const rate  = parseFloat(document.getElementById('wa-rate').value);

  if(currentAnim) currentAnim.cancel();

  currentAnim = el.animate(frames, {
    duration: dur,
    easing: ease,
    iterations: iters === 'Infinity' ? Infinity : parseInt(iters),
    fill: 'both',
  });
  currentAnim.playbackRate = rate;

  currentAnim.onfinish = () => setStatus('✅ Finished');
  currentAnim.oncancel = () => setStatus('⏹ Cancelled');
  setStatus('▶ Running... rate=' + rate + 'x');
}

function setRate(v) {
  document.getElementById('wa-rate-v').textContent = parseFloat(v).toFixed(1);
  if(currentAnim) currentAnim.playbackRate = parseFloat(v);
}

function setStatus(s) { document.getElementById('wa-status').textContent = s; }`,
    [
      { level:'easy',   uk:'Натисни Play, потім Pause, потім Resume. Спостерігай playbackRate: zmeni на 3x — анімація прискориться.',  ru:'Нажми Play, затем Pause, Resume. Измени playbackRate на 3x — анимация ускорится.' },
      { level:'medium', uk:'Зміни keyframe 50% на translateX(80px) rotate(180deg) — що отримаєш? Поєднай translate + rotate в одному кроці.',  ru:'Измени keyframe 50% на translateX(80px) rotate(180deg) — что получишь? Объедини translate + rotate в одном шаге.' },
      { level:'hard',   uk:'Використай Promise: currentAnim.finished.then(() => alert("Done!")) — запусти 1 ітерацію і отримай алерт після завершення.',  ru:'Используй Promise: currentAnim.finished.then(() => alert("Done!")) — запусти 1 итерацию и получи алерт после завершения.' },
    ]
  );

  /* ─── 03-05 ──────────────────────────────────────────────── */
  patch('03-05',
    { uk:`<h2>Intersection Observer: анімація при прокрутці</h2>
<p>IntersectionObserver відстежує коли елемент входить або виходить з viewport — без scroll-обробників, ефективно.</p>
<h3>Базовий синтаксис</h3>
<pre>const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // одноразово
      }
    });
  },
  {
    threshold: 0.3,    // 30% елементу видимо
    rootMargin: '0px 0px -50px 0px', // зсув зони спрацювання
    root: null,        // null = viewport
  }
);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});</pre>
<h3>threshold</h3>
<ul>
  <li><code>0</code> — елемент щойно з'явився</li>
  <li><code>0.5</code> — половина видима</li>
  <li><code>1</code> — весь елемент видимий</li>
  <li><code>[0, 0.25, 0.5, 0.75, 1]</code> — масив для progressbar</li>
</ul>`,
      ru:`<h2>Intersection Observer</h2>
<pre>const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.classList.add('visible');
    });
  },
  { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.animate-on-scroll')
  .forEach(el => observer.observe(el));</pre>` },
    `<div class="io-lab">
  <h2>👁 Intersection Observer</h2>

  <!-- Налаштування -->
  <div class="io-settings">
    <label>threshold <span id="io-thr-v">0.30</span>
      <input type="range" id="io-thr" min="0" max="1" step=".05" value=".3" oninput="rebuildIO()">
    </label>
    <label>rootMargin bottom <span id="io-rm-v">0</span>px
      <input type="range" id="io-rm" min="-200" max="0" value="0" oninput="rebuildIO()">
    </label>
    <label>Animation
      <select id="io-anim" onchange="resetCards()">
        <option value="fade-up">fade-up</option>
        <option value="fade-left">fade-left</option>
        <option value="zoom-in">zoom-in</option>
        <option value="flip">flip</option>
      </select>
    </label>
    <button onclick="resetCards()">↺ Reset</button>
  </div>

  <!-- Зона скролу -->
  <div class="io-scroll-area" id="io-scroll-area">
    <div class="io-top-hint">↓ Скролюй вниз ↓</div>
    <div class="io-cards" id="io-cards"></div>
    <div class="io-progress">
      <div class="io-progress-bar" id="io-bar"></div>
    </div>
  </div>

  <div class="io-stats" id="io-stats">Видимо: 0 / 6</div>
</div>`,
    `${BASE}
.io-lab{max-width:520px}
.io-settings{display:flex;flex-direction:column;gap:6px;background:#1e293b;border-radius:10px;padding:12px;margin-bottom:12px}
.io-settings label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}
.io-settings label span{min-width:40px;font-family:monospace;color:#94a3b8}
.io-settings input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}
.io-settings select{flex:1;padding:5px;font-size:12px}

.io-scroll-area{height:280px;overflow-y:auto;background:#0f172a;border-radius:10px;border:1px solid #1e293b;scrollbar-width:thin;scrollbar-color:#334155 transparent;position:relative}
.io-top-hint{text-align:center;padding:16px;font-size:12px;color:#475569}
.io-cards{display:flex;flex-direction:column;gap:10px;padding:0 12px 12px}

/* Стани анімацій */
.io-card{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;display:flex;align-items:center;gap:10px;transition:transform .5s ease,opacity .5s ease;will-change:transform,opacity}

.fade-up .io-card{transform:translateY(30px);opacity:0}
.fade-left .io-card{transform:translateX(-40px);opacity:0}
.zoom-in .io-card{transform:scale(.85);opacity:0}
.flip .io-card{transform:rotateX(-45deg);opacity:0;transform-origin:top}

.io-card.visible{transform:none!important;opacity:1!important}

.io-card-icon{font-size:24px;flex-shrink:0}
.io-card-title{font-size:13px;font-weight:700;color:#f1f5f9}
.io-card-sub{font-size:11px;color:#64748b;margin-top:2px}
.io-progress{height:3px;background:#1e293b;position:sticky;bottom:0}
.io-progress-bar{height:100%;background:#3b82f6;width:0;transition:.3s}
.io-stats{font-size:12px;color:#64748b;margin-top:8px;font-family:monospace}`,
    `const CARDS_DATA = [
  {icon:'🌐',title:'HTML5 Семантика',sub:'01-01 → 01-10'},
  {icon:'🎨',title:'CSS3 Майстерність',sub:'02-01 → 02-12'},
  {icon:'🎬',title:'CSS Анімації',sub:'03-01 → 03-10'},
  {icon:'⚡',title:'JavaScript Основи',sub:'04-01 → 04-15'},
  {icon:'🖱️',title:'DOM Інтерактивність',sub:'05-01 → 05-12'},
  {icon:'🚀',title:'JavaScript ES6+',sub:'07-01 → 07-12'},
];

let io;
let visCount = 0;

function buildCards() {
  const anim = document.getElementById('io-anim').value;
  const list = document.getElementById('io-cards');
  list.className = 'io-cards ' + anim;
  list.innerHTML = '';
  CARDS_DATA.forEach((c,i) => {
    const d = document.createElement('div');
    d.className = 'io-card';
    d.style.transitionDelay = (i * 60) + 'ms';
    d.innerHTML = '<div class="io-card-icon">' + c.icon + '</div><div><div class="io-card-title">' + c.title + '</div><div class="io-card-sub">' + c.sub + '</div></div>';
    list.appendChild(d);
  });
}

function rebuildIO() {
  const thr = parseFloat(document.getElementById('io-thr').value);
  const rm  = document.getElementById('io-rm').value;
  document.getElementById('io-thr-v').textContent = thr.toFixed(2);
  document.getElementById('io-rm-v').textContent  = rm;
  if(io) io.disconnect();
  visCount = 0;
  document.querySelectorAll('.io-card').forEach(c => c.classList.remove('visible'));
  document.getElementById('io-stats').textContent = 'Видимо: 0 / 6';

  io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('visible');
        visCount++;
        updateStats();
      }
    });
  }, {
    root: document.getElementById('io-scroll-area'),
    threshold: thr,
    rootMargin: '0px 0px ' + rm + 'px 0px',
  });

  document.querySelectorAll('.io-card').forEach(c => io.observe(c));

  // Progress bar
  const area = document.getElementById('io-scroll-area');
  area.onscroll = () => {
    const pct = area.scrollTop / (area.scrollHeight - area.clientHeight) * 100;
    document.getElementById('io-bar').style.width = pct + '%';
  };
}

function updateStats() {
  document.getElementById('io-stats').textContent = 'Видимо: ' + visCount + ' / 6';
}

function resetCards() { buildCards(); rebuildIO(); }

buildCards(); rebuildIO();`,
    [
      { level:'easy',   uk:'Проскролюй до низу повільно — поспостерігай за появою карток. Натисни Reset щоб скинути.',  ru:'Проскролюй до низу медленно — наблюдай за появлением карточек. Нажми Reset чтобы сбросить.' },
      { level:'medium', uk:'Встанови threshold на 0.9 — що змінилось? При якому threshold картка з\'являється майже повністю, а не з першого пікселя?',  ru:'Установи threshold 0.9 — что изменилось? При каком threshold карточка появляется почти полностью?' },
      { level:'hard',   uk:'Додай 7-й елемент у CARDS_DATA і переконайся що IO автоматично його спостерігає — перевір `io.observe(newEl)` у коді.',  ru:'Добавь 7-й элемент в CARDS_DATA и убедись что IO автоматически его наблюдает.' },
    ]
  );

  /* ─── 03-06 ──────────────────────────────────────────────── */
  patch('03-06',
    { uk:`<h2>Parallax ефект на чистому CSS</h2>
<p>Parallax — різна швидкість прокрутки переднього і заднього планів — створює ілюзію глибини.</p>
<h3>CSS Parallax (perspective)</h3>
<pre>/* Метод 1: perspective + translateZ */
.parallax-section {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  perspective: 1px;   /* головне! */
}
.parallax-bg {
  transform: translateZ(-2px) scale(3);
  /* translateZ(-2px) = рухається вдвічі повільніше */
  /* scale(3) — компенсуємо зменшення від translateZ */
}
.parallax-fg {
  transform: translateZ(0);  /* нормальна швидкість */
}</pre>
<h3>JavaScript Parallax</h3>
<pre>window.addEventListener('scroll', () => {
  const y = window.scrollY;
  hero.style.transform = \`translateY(\${y * 0.4}px)\`;
  // 0.4 = коефіцієнт паралаксу (0-1)
});</pre>
<h3>Оптимізація</h3>
<pre>/* Завжди на GPU-шарі: */
.parallax { will-change: transform; }
/* Або через requestAnimationFrame */</pre>`,
      ru:`<h2>Parallax эффект</h2>
<pre>/* CSS Parallax через perspective: */
.section {
  overflow-y: scroll;
  perspective: 1px;
}
.bg {
  transform: translateZ(-2px) scale(3);
}

/* JavaScript Parallax: */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  el.style.transform = \`translateY(\${y * 0.4}px)\`;
});</pre>` },
    `<div class="px-lab">
  <h2>🏔 Parallax Lab</h2>

  <div class="px-controls">
    <label>JS коефіцієнт фону <span id="px-bg-v">0.3</span>
      <input type="range" id="px-bg" min="0" max="1" step=".05" value=".3" oninput="updateRates()">
    </label>
    <label>JS коефіцієнт об'єктів <span id="px-obj-v">0.6</span>
      <input type="range" id="px-obj" min="0" max="1" step=".05" value=".6" oninput="updateRates()">
    </label>
  </div>

  <div class="px-scene-wrap">
    <div class="px-scroll-area" id="px-scroll">
      <!-- Layer 0: зірки (найповільніший) -->
      <div class="px-layer px-stars" id="px-stars">✦ ✧ ✦ ✦ ✧ ✦ ✧ ✦ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✦</div>
      <!-- Layer 1: гори -->
      <div class="px-layer px-mountains" id="px-mountains">
        <svg viewBox="0 0 400 120" width="100%">
          <polygon points="0,120 80,20 160,80 240,10 320,70 400,120" fill="#1e3a5f" opacity=".8"/>
          <polygon points="0,120 60,50 140,90 220,30 300,80 400,120" fill="#1d4ed8" opacity=".5"/>
        </svg>
      </div>
      <!-- Layer 2: ліс -->
      <div class="px-layer px-trees" id="px-trees">🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲</div>
      <!-- Контент -->
      <div class="px-content">
        <div class="px-hero">
          <h2>CSS Parallax</h2>
          <p>Скролюй щоб побачити ефект</p>
        </div>
        <div class="px-spacer"></div>
        <div class="px-card">🏔 Гори рухаються повільніше ніж ліс</div>
        <div class="px-spacer"></div>
        <div class="px-card">⭐ Зірки рухаються найповільніше</div>
        <div class="px-spacer"></div>
      </div>
    </div>
  </div>

  <pre class="px-out" id="px-out">bg rate: 0.3 | obj rate: 0.6</pre>
</div>`,
    `${BASE}
.px-lab{max-width:520px}
.px-controls{display:flex;flex-direction:column;gap:6px;background:#1e293b;border-radius:10px;padding:12px;margin-bottom:12px}
.px-controls label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}
.px-controls label span{min-width:32px;font-family:monospace;color:#94a3b8}
.px-controls input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}

.px-scene-wrap{border-radius:12px;overflow:hidden;border:1px solid #1e293b;margin-bottom:10px}
.px-scroll-area{position:relative;height:280px;overflow-y:scroll;overflow-x:hidden;background:linear-gradient(180deg,#050b1a 0%,#0f172a 100%);scrollbar-width:thin;scrollbar-color:#1e293b transparent}
.px-layer{position:absolute;width:100%;pointer-events:none;will-change:transform}
.px-stars{top:10px;font-size:14px;color:rgba(255,255,255,.3);letter-spacing:14px;line-height:2;text-align:center;word-break:break-all}
.px-mountains{top:60px;left:0;right:0}
.px-trees{bottom:0;font-size:22px;text-align:center;letter-spacing:4px;white-space:nowrap;overflow:hidden}
.px-content{position:relative;z-index:2;padding:0 16px}
.px-hero{text-align:center;padding:30px 0 16px;color:#f1f5f9}
.px-hero h2{font-size:22px;font-weight:800;color:#fff;margin-bottom:6px}
.px-hero p{font-size:12px;color:#64748b}
.px-spacer{height:60px}
.px-card{background:rgba(30,41,59,.8);border:1px solid #334155;border-radius:10px;padding:14px;font-size:13px;color:#94a3b8;backdrop-filter:blur(4px);margin-bottom:10px}
.px-out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:11px;color:#7dd3fc;font-family:monospace}`,
    `let bgRate = 0.3, objRate = 0.6;

function updateRates() {
  bgRate  = parseFloat(document.getElementById('px-bg').value);
  objRate = parseFloat(document.getElementById('px-obj').value);
  document.getElementById('px-bg-v').textContent  = bgRate.toFixed(2);
  document.getElementById('px-obj-v').textContent = objRate.toFixed(2);
  document.getElementById('px-out').textContent =
    'bg rate: ' + bgRate + ' | obj rate: ' + objRate + '\n\n' +
    '.parallax-bg  { transform: translateY(${scrollY * ' + bgRate + '}px); }\n' +
    '.parallax-obj { transform: translateY(${scrollY * ' + objRate + '}px); }';
}

const scrollArea = document.getElementById('px-scroll');
const stars    = document.getElementById('px-stars');
const mountains= document.getElementById('px-mountains');
const trees    = document.getElementById('px-trees');

let ticking = false;
scrollArea.addEventListener('scroll', () => {
  if(!ticking) {
    requestAnimationFrame(() => {
      const s = scrollArea.scrollTop;
      stars.style.transform     = 'translateY(' + (s * bgRate * 0.5) + 'px)';
      mountains.style.transform = 'translateY(' + (s * bgRate) + 'px)';
      trees.style.transform     = 'translateY(' + (-s * objRate * 0.2) + 'px)';
      ticking = false;
    });
    ticking = true;
  }
});

updateRates();`,
    [
      { level:'easy',   uk:'Проскролюй сцену — поспостерігай що зірки, гори і дерева рухаються з різною швидкістю.',  ru:'Проскролюй сцену — наблюдай как звёзды, горы и деревья двигаются с разной скоростью.' },
      { level:'medium', uk:'Встанови bgRate = objRate = 1.0 — parallax зникне. Чому? Тепер bgRate = 0, objRate = 1.0 — що відбудеться?',  ru:'Установи bgRate = objRate = 1.0 — parallax исчезнет. Почему? Теперь bgRate=0, objRate=1.0?' },
      { level:'hard',   uk:'Додай четвертий шар px-clouds (☁️ ☁️ ☁️) між зірками і горами з rate = bgRate * 0.7 — проміжна швидкість.',  ru:'Добавь четвёртый слой px-clouds (☁️) между звёздами и горами с rate = bgRate * 0.7.' },
    ]
  );

  /* ─── 03-07 ──────────────────────────────────────────────── */
  patch('03-07',
    { uk:`<h2>Scroll-driven animations (CSS @scroll-timeline)</h2>
<p>Scroll-driven animations — нова нативна CSS можливість: анімація прогресує разом зі скролом.</p>
<h3>animation-timeline: scroll()</h3>
<pre>@keyframes progress {
  from { width: 0%; }
  to   { width: 100%; }
}

.progress-bar {
  animation: progress linear both;
  animation-timeline: scroll(root block);
  /* root  = прокрутка document
     block = вертикально */
}</pre>
<h3>view() — анімація на основі видимості елементу</h3>
<pre>@keyframes fadeIn {
  entry 0%  { opacity: 0; transform: translateY(20px); }
  entry 100%{ opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}</pre>
<h3>animation-range</h3>
<pre>animation-range: entry 0% exit 100%;   /* весь шлях */
animation-range: entry 0% entry 50%;   /* тільки вхід */
animation-range: exit 50% exit 100%;   /* тільки вихід */</pre>
<h3>Підтримка</h3>
<p>Chrome 115+, Edge 115+. Firefox та Safari — поліфіл: @scroll-timeline polyfill.</p>`,
      ru:`<h2>Scroll-driven animations</h2>
<pre>/* Прогресс-бар прокрутки: */
@keyframes progress {
  from { width: 0%; }
  to   { width: 100%; }
}
.progress-bar {
  animation: progress linear both;
  animation-timeline: scroll(root block);
}

/* Появление при прокрутке: */
.card {
  animation: fadeIn linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><link rel="stylesheet" href="style.css"></head>
<body>
  <!-- Глобальний прогрес-бар скролу -->
  <div class="scroll-bar" id="scroll-bar"></div>

  <div class="sda-lab">
    <h2>📜 Scroll-driven Animations</h2>

    <div class="support-badge" id="support-badge">Перевіряємо підтримку...</div>

    <div class="sda-scroll-area" id="sda-scroll">
      <div class="sda-intro">
        <p>↓ Скролюй щоб побачити scroll-driven animations ↓</p>
      </div>

      <div class="sda-cards-wrap">
        <div class="sda-card sda-c1">
          <div class="sda-card-icon">🎨</div>
          <div class="sda-card-title">CSS Custom Properties</div>
          <div class="sda-card-text">Fade in при scroll — animation-timeline: view()</div>
        </div>
        <div class="sda-card sda-c2">
          <div class="sda-card-icon">🎬</div>
          <div class="sda-card-title">CSS Animations</div>
          <div class="sda-card-text">Slide from left — animation-range: entry</div>
        </div>
        <div class="sda-card sda-c3">
          <div class="sda-card-icon">⚡</div>
          <div class="sda-card-title">JavaScript Основи</div>
          <div class="sda-card-text">Scale up — animation-timeline: view()</div>
        </div>
        <div class="sda-card sda-c4">
          <div class="sda-card-icon">🚀</div>
          <div class="sda-card-title">ES6+ Сучасний JS</div>
          <div class="sda-card-text">Rotate + fade — поєднання ефектів</div>
        </div>
      </div>

      <div class="sda-spacer"></div>
    </div>

    <!-- JS Fallback прогрес -->
    <div class="js-progress-wrap">
      <div class="jp-label">JS-прогрес (Fallback): <span id="jp-pct">0%</span></div>
      <div class="jp-bar-bg"><div class="jp-bar" id="jp-bar"></div></div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
    `${BASE}
/* Scroll-driven: progress bar */
@keyframes sd-progress { from{width:0%} to{width:100%} }
@keyframes sd-fade-up  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
@keyframes sd-slide-l  { from{opacity:0;transform:translateX(-50px)} to{opacity:1;transform:none} }
@keyframes sd-scale    { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
@keyframes sd-rotate   { from{opacity:0;transform:rotate(-10deg) scale(.9)} to{opacity:1;transform:none} }

.scroll-bar{
  position:sticky;top:0;left:0;height:3px;background:#3b82f6;z-index:99;
  animation:sd-progress linear both;
  animation-timeline:scroll(self block);
  width:0;
}

.sda-lab{max-width:520px}
.support-badge{display:inline-block;padding:5px 12px;border-radius:6px;font-size:12px;font-weight:700;margin-bottom:12px}
.support-badge.yes{background:rgba(16,185,129,.15);color:#10b981;border:1px solid rgba(16,185,129,.3)}
.support-badge.no{background:rgba(239,68,68,.1);color:#ef4444;border:1px solid rgba(239,68,68,.2)}

.sda-scroll-area{height:320px;overflow-y:auto;background:#0f172a;border-radius:12px;border:1px solid #1e293b;padding:12px;scrollbar-width:thin;scrollbar-color:#334155 transparent;margin-bottom:12px;position:relative}
.sda-intro{text-align:center;padding:20px 0;font-size:13px;color:#475569}
.sda-cards-wrap{display:flex;flex-direction:column;gap:10px;padding-bottom:80px}

.sda-card{
  background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;
  display:flex;gap:10px;align-items:center;
  animation-timeline:view(self);
  animation-range:entry 0% entry 80%;
  animation-fill-mode:both;
  animation-timing-function:ease-out;
  animation-duration:.001s; /* необхідний fallback */
}
.sda-c1{animation-name:sd-fade-up}
.sda-c2{animation-name:sd-slide-l}
.sda-c3{animation-name:sd-scale}
.sda-c4{animation-name:sd-rotate}
.sda-card-icon{font-size:24px;flex-shrink:0}
.sda-card-title{font-size:13px;font-weight:700;color:#f1f5f9;margin-bottom:2px}
.sda-card-text{font-size:11px;color:#64748b}
.sda-spacer{height:40px}

.js-progress-wrap{background:#1e293b;border-radius:10px;padding:12px}
.jp-label{font-size:12px;color:#64748b;margin-bottom:6px}
.jp-label span{color:#3b82f6;font-family:monospace;font-weight:700}
.jp-bar-bg{height:6px;background:#0f172a;border-radius:6px;overflow:hidden}
.jp-bar{height:100%;background:#3b82f6;width:0;transition:.2s}`,
    `// Перевірка підтримки
const supported = CSS.supports('animation-timeline', 'scroll()');
const badge = document.getElementById('support-badge');
badge.textContent = supported ? '✅ Scroll-driven animations підтримується!' : '⚠️ Не підтримується — використовуй JS fallback';
badge.className = 'support-badge ' + (supported ? 'yes' : 'no');

// JS fallback progress
const scrollEl = document.getElementById('sda-scroll');
scrollEl.addEventListener('scroll', () => {
  const pct = Math.round(scrollEl.scrollTop / (scrollEl.scrollHeight - scrollEl.clientHeight) * 100);
  document.getElementById('jp-pct').textContent = pct + '%';
  document.getElementById('jp-bar').style.width  = pct + '%';
});

// JS fallback для карток якщо scroll-driven не підтримується
if(!supported) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { root: scrollEl, threshold: .2 });
  document.querySelectorAll('.sda-card').forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(20px)';
    c.style.transition = 'opacity .5s,transform .5s';
    io.observe(c);
  });
}`,
    [
      { level:'easy',   uk:'Проскролюй контейнер — картки з\'являються. Зверни увагу на CSS клас sda-c1..c4 — кожен має свій @keyframes.',  ru:'Проскролюй контейнер — карточки появляются. Обрати внимание на CSS классы sda-c1..c4 — у каждого свой @keyframes.' },
      { level:'medium', uk:'Якщо браузер підтримує scroll-driven — відкрий DevTools → Animations — знайди scroll-driven timeline. Якщо ні — поясни чому JS fallback використовує IntersectionObserver.',  ru:'Если браузер поддерживает — открой DevTools → Animations — найди scroll-driven timeline. Если нет — объясни JS fallback.' },
      { level:'hard',   uk:'Зміни animation-range з "entry 0% entry 80%" на "entry 0% exit 100%" для .sda-c1 — що буде при виходженні елементу з viewport?',  ru:'Измени animation-range с "entry 0% entry 80%" на "entry 0% exit 100%" для .sda-c1 — что будет при выходе из viewport?' },
    ]
  );

  /* ─── 03-08 ──────────────────────────────────────────────── */
  patch('03-08',
    { uk:`<h2>SVG-анімації: CSS та WAAPI</h2>
<p>SVG-елементи анімуються через CSS або JS так само як HTML-елементи — але мають спеціальні SVG-атрибути.</p>
<h3>CSS анімація SVG</h3>
<pre>/* Аніміємо SVG-атрибути через CSS: */
circle { fill: #3b82f6; animation: pulse 2s infinite; }
@keyframes pulse {
  50% { r: 30; fill: #8b5cf6; }  /* SVG-атрибут r! */
}

/* stroke-dasharray / stroke-dashoffset — ефект малювання: */
path {
  stroke-dasharray: 500;  /* загальна довжина */
  stroke-dashoffset: 500; /* зміщення (пункт початку) */
  animation: draw 2s ease forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }</pre>
<h3>JS анімація через element.animate()</h3>
<pre>path.animate(
  [{ strokeDashoffset: 500 }, { strokeDashoffset: 0 }],
  { duration: 2000, fill: 'forwards' }
);</pre>
<h3>SMIL (застаріло)</h3>
<pre>&lt;animate attributeName="r" from="10" to="50" dur="2s"/&gt;
/* Підтримка обмежена — краще CSS/WAAPI */</pre>`,
      ru:`<h2>SVG-анимации</h2>
<pre>/* Эффект рисования: */
path {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: draw 2s ease forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }

/* JS через WAAPI: */
path.animate(
  [{ strokeDashoffset: 500 }, { strokeDashoffset: 0 }],
  { duration: 2000, fill: 'forwards' }
);</pre>` },
    `<div class="svg-anim-lab">
  <h2>🎨 SVG Animations</h2>

  <!-- Drawing effect -->
  <div class="demo-section">
    <h3>Draw effect (stroke-dashoffset)</h3>
    <svg id="draw-svg" viewBox="0 0 300 120" width="100%">
      <!-- Текст як path через stroke -->
      <path id="draw-path"
        d="M20,60 C20,60 60,20 100,60 C140,100 140,20 180,60 C220,100 260,20 280,60"
        fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
      <!-- Серце -->
      <path id="heart-path"
        d="M150,90 C150,90 110,65 110,45 C110,30 125,22 137,30 C143,34 150,43 150,43 C150,43 157,34 163,30 C175,22 190,30 190,45 C190,65 150,90 150,90 Z"
        fill="none" stroke="#ec4899" stroke-width="2.5"/>
      <!-- Коло -->
      <circle id="draw-circle" cx="250" cy="60" r="35"
        fill="none" stroke="#10b981" stroke-width="2.5"/>
    </svg>
    <div class="draw-btns">
      <button onclick="animateDraw()">▶ Draw All</button>
      <button onclick="resetDraw()">↺ Reset</button>
      <label>Duration <span id="draw-dur-v">1.5</span>s
        <input type="range" id="draw-dur" min=".3" max="4" step=".1" value="1.5"
          oninput="document.getElementById('draw-dur-v').textContent=parseFloat(this.value).toFixed(1)">
      </label>
    </div>
  </div>

  <!-- Інтерактивне SVG -->
  <div class="demo-section">
    <h3>Інтерактивна SVG-анімація</h3>
    <svg id="anim-svg" viewBox="0 0 300 150" width="100%">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="300" height="150" fill="#050b1a"/>
      <!-- Орбіта -->
      <circle cx="150" cy="75" r="55" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4"/>
      <!-- Сонце -->
      <circle id="sun" cx="150" cy="75" r="20" fill="#f59e0b" filter="url(#glow)"/>
      <!-- Планети -->
      <g id="orbit1"><circle cx="205" cy="75" r="8" fill="#3b82f6"/></g>
      <g id="orbit2"><circle cx="95"  cy="75" r="6" fill="#10b981"/></g>
      <g id="orbit3"><circle cx="150" cy="20" r="5" fill="#8b5cf6"/></g>
      <!-- Зірки -->
      <g id="stars"></g>
    </svg>
    <button onclick="toggleOrbit()" id="orbit-btn">▶ Start Orbit</button>
  </div>
</div>`,
    `${BASE}
.svg-anim-lab{max-width:520px}
.demo-section{background:#1e293b;border-radius:12px;padding:14px;margin-bottom:12px}
.demo-section h3{font-size:11px;text-transform:uppercase;color:#3b82f6;margin-bottom:10px}
#draw-svg,#anim-svg{border-radius:8px;background:#0f172a;display:block;border:1px solid #1e293b;margin-bottom:10px}
.draw-btns{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.draw-btns button{padding:6px 12px;font-size:12px}
.draw-btns label{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b;flex:1}
.draw-btns label span{min-width:28px;font-family:monospace;color:#94a3b8}
.draw-btns input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}
#orbit-btn{width:100%;margin-top:4px}`,
    `// === Draw Effect ===
const paths = [
  document.getElementById('draw-path'),
  document.getElementById('heart-path'),
];
const circleEl = document.getElementById('draw-circle');

function getLen(el) {
  try { return el.getTotalLength(); } catch(e) { return 220; }
}

function resetDraw() {
  [...paths, circleEl].forEach(el => {
    const len = getLen(el);
    el.style.strokeDasharray  = len;
    el.style.strokeDashoffset = len;
    el.style.transition = 'none';
  });
}

function animateDraw() {
  const dur = parseFloat(document.getElementById('draw-dur').value);
  [...paths, circleEl].forEach((el, i) => {
    const len = getLen(el);
    el.style.strokeDasharray  = len;
    el.style.strokeDashoffset = len;
    el.style.transition = 'none';
    void el.getBoundingClientRect();
    setTimeout(() => {
      el.style.transition = 'stroke-dashoffset ' + dur + 's ease ' + (i * dur * 0.3) + 's';
      el.style.strokeDashoffset = '0';
    }, 16);
  });
}
resetDraw();

// === Orbit ===
let orbitAnims = [], orbitRunning = false;
const ORBIT_DATA = [
  { el: document.getElementById('orbit1'), radius:55, speed: 3000, startAngle: 0    },
  { el: document.getElementById('orbit2'), radius:55, speed: 5000, startAngle: Math.PI },
  { el: document.getElementById('orbit3'), radius:55, speed: 7000, startAngle: Math.PI/2 },
];

// Stars
const starsG = document.getElementById('stars');
for(let i=0;i<20;i++){
  const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
  c.setAttribute('cx', Math.random()*300);
  c.setAttribute('cy', Math.random()*150);
  c.setAttribute('r', Math.random()*1.5+.5);
  c.setAttribute('fill', 'rgba(255,255,255,'+(Math.random()*.5+.2)+')');
  starsG.appendChild(c);
}

// Sun pulse
document.getElementById('sun').animate(
  [{r:'20',opacity:1},{r:'22',opacity:.85},{r:'20',opacity:1}],
  {duration:2000,iterations:Infinity,easing:'ease-in-out'}
);

function startOrbits() {
  ORBIT_DATA.forEach(d => {
    let start = null;
    function frame(ts) {
      if(!orbitRunning) return;
      if(!start) start = ts;
      const angle = d.startAngle + ((ts - start) / d.speed) * Math.PI * 2;
      const cx = 150 + d.radius * Math.cos(angle);
      const cy = 75  + d.radius * Math.sin(angle);
      d.el.setAttribute('transform', 'translate(' + (cx-['205','95','150'][ORBIT_DATA.indexOf(d)]) + ',' + (cy-75) + ')');
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}

function toggleOrbit() {
  orbitRunning = !orbitRunning;
  document.getElementById('orbit-btn').textContent = orbitRunning ? '⏸ Pause Orbit' : '▶ Start Orbit';
  if(orbitRunning) startOrbits();
}`,
    [
      { level:'easy',   uk:'Натисни "Draw All" — спостерігай ефект малювання ліній. Зміни Duration на 3s — стає повільніше.',  ru:'Нажми "Draw All" — наблюдай эффект рисования линий. Измени Duration на 3s.' },
      { level:'medium', uk:'Натисни "Start Orbit" і поспостерігай за планетами. Знайди в коді де розраховується cx, cy через тригонометрію.',  ru:'Нажми "Start Orbit" и наблюдай за планетами. Найди в коде где вычисляется cx, cy через тригонометрию.' },
      { level:'hard',   uk:'Додай четверту планету (червону, radius=40, speed=9000) у ORBIT_DATA та відповідний <g> у SVG.',  ru:'Добавь четвёртую планету (красную, radius=40, speed=9000) в ORBIT_DATA и соответствующий <g> в SVG.' },
    ]
  );

  /* ─── 03-09 ──────────────────────────────────────────────── */
  patch('03-09',
    { uk:`<h2>Оптимізація анімацій: will-change, GPU compositing</h2>
<p>Погані анімації викликають janks (стрибки) і vitals warnings. Правило: аніміруй тільки transform і opacity.</p>
<h3>Що аніміювати — і що ні</h3>
<pre>/* ✅ GPU compositing (60fps): */
transform: translateX(px) scale() rotate()
opacity:   0..1

/* ❌ Reflow (повільно): */
width, height, margin, padding, top, left
/* Кожна зміна перераховує весь layout! */

/* ❌ Repaint (середньо): */
background-color, border-color, box-shadow</pre>
<h3>will-change — підказка браузеру</h3>
<pre>/* Заздалегідь на GPU-шар: */
.animated { will-change: transform, opacity; }

/* Тільки для активних анімацій! */
el.addEventListener('mouseenter', () => {
  el.style.willChange = 'transform';
});
el.addEventListener('animationend', () => {
  el.style.willChange = 'auto'; /* звільнити ресурси */
});</pre>
<h3>requestAnimationFrame — правильний JS loop</h3>
<pre>function animate(ts) {
  // ts — DOMHighResTimeStamp
  el.style.transform = \`translateX(\${Math.sin(ts/1000)*100}px)\`;
  requestAnimationFrame(animate);
}</pre>`,
      ru:`<h2>Оптимизация анимаций</h2>
<pre>/* ✅ GPU compositing (60fps): */
transform: translateX() scale() rotate()
opacity:   0..1

/* ❌ Reflow (медленно): */
width, height, margin, padding, top, left

/* will-change — подсказка браузеру: */
.animated { will-change: transform; }

/* requestAnimationFrame: */
function animate(ts) {
  el.style.transform = \`translateX(\${Math.sin(ts/1000)*100}px)\`;
  requestAnimationFrame(animate);
}</pre>` },
    `<div class="perf-lab">
  <h2>⚡ Performance Lab</h2>

  <!-- Порівняння: погана vs гарна анімація -->
  <div class="perf-compare">
    <div class="pc-col">
      <div class="pc-label bad">❌ Reflow (left/top)</div>
      <div class="pc-stage">
        <div class="bad-ball" id="bad-ball">●</div>
      </div>
      <div class="pc-fps" id="bad-fps">— fps</div>
    </div>
    <div class="pc-col">
      <div class="pc-label good">✅ GPU (transform)</div>
      <div class="pc-stage">
        <div class="good-ball" id="good-ball">●</div>
      </div>
      <div class="pc-fps" id="good-fps">— fps</div>
    </div>
  </div>

  <div class="perf-btns">
    <button onclick="startPerf()">▶ Start Both</button>
    <button onclick="stopPerf()">⏹ Stop</button>
  </div>

  <!-- Тест will-change -->
  <div class="wc-demo">
    <h3>will-change demo</h3>
    <div class="wc-cards">
      <div class="wc-card" id="wc-on" style="will-change:transform">
        <span>will-change: transform</span>
        <span class="wc-tag">GPU шар</span>
      </div>
      <div class="wc-card" id="wc-off">
        <span>will-change: auto</span>
        <span class="wc-tag">Без підказки</span>
      </div>
    </div>
    <label>
      <input type="checkbox" id="wc-toggle" onchange="toggleWillChange()"> Ввімкнути will-change для обох
    </label>
  </div>

  <!-- RAF vs setInterval -->
  <div class="raf-demo">
    <h3>requestAnimationFrame vs setInterval</h3>
    <div class="raf-stage">
      <div class="raf-el" id="raf-el">RAF ⚡</div>
      <div class="raf-el si-el" id="si-el">setInterval</div>
    </div>
    <div class="raf-btns">
      <button onclick="startRAF()">▶ RAF</button>
      <button onclick="startSI()">▶ setInterval(16)</button>
      <button onclick="stopBoth()">⏹ Stop</button>
    </div>
  </div>
</div>`,
    `${BASE}
.perf-lab{max-width:520px}
.perf-compare{display:flex;gap:10px;margin-bottom:10px}
.pc-col{flex:1;background:#1e293b;border-radius:10px;padding:12px}
.pc-label{font-size:11px;font-weight:700;margin-bottom:8px;padding:3px 8px;border-radius:4px;display:inline-block}
.pc-label.bad{background:rgba(239,68,68,.1);color:#ef4444}
.pc-label.good{background:rgba(16,185,129,.1);color:#10b981}
.pc-stage{height:80px;background:#0f172a;border-radius:8px;position:relative;overflow:hidden;margin-bottom:6px}
.bad-ball,.good-ball{position:absolute;font-size:20px;top:50%;transform:translateY(-50%)}
.bad-ball{left:0}
.good-ball{left:0}
.pc-fps{font-size:12px;font-family:monospace;color:#64748b}

.perf-btns{display:flex;gap:6px;margin-bottom:12px}

.wc-demo{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:12px}
.wc-demo h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.wc-cards{display:flex;gap:8px;margin-bottom:8px}
.wc-card{flex:1;background:#0f172a;border-radius:8px;padding:10px;font-size:11px;color:#94a3b8;display:flex;flex-direction:column;gap:4px;align-items:center;text-align:center;transition:transform .3s;cursor:pointer}
.wc-card:hover{transform:scale(1.04)}
.wc-tag{background:#334155;border-radius:4px;padding:2px 6px;font-size:10px;color:#64748b}
.wc-demo label{font-size:12px;color:#64748b;display:flex;align-items:center;gap:6px;cursor:pointer}
.wc-demo input[type=checkbox]{accent-color:#3b82f6}

.raf-demo{background:#1e293b;border-radius:10px;padding:12px}
.raf-demo h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.raf-stage{height:80px;background:#0f172a;border-radius:8px;position:relative;overflow:hidden;margin-bottom:8px}
.raf-el{position:absolute;font-size:13px;font-weight:700;color:#fff;top:25%;transform:translateX(0)}
.si-el{top:55%;color:#f59e0b}
.raf-btns{display:flex;gap:6px}
.raf-btns button{padding:6px 10px;font-size:11px}`,
    `// === Порівняння reflow vs GPU ===
let perfRunning = false;
let perfId;

function startPerf() {
  stopPerf();
  perfRunning = true;
  const badBall  = document.getElementById('bad-ball');
  const goodBall = document.getElementById('good-ball');
  let pos = 0, dir = 1;
  let lastTs = 0, badFrames = 0, goodFrames = 0;
  const stageW = badBall.parentElement.clientWidth - 28;

  function loop(ts) {
    if(!perfRunning) return;
    const delta = ts - lastTs;
    if(delta > 0) {
      badFrames++; goodFrames++;
      const fps = Math.round(1000 / delta);
      if(badFrames % 30 === 0) document.getElementById('bad-fps').textContent = fps + ' fps';
      if(goodFrames % 30 === 0) document.getElementById('good-fps').textContent = fps + ' fps (composited)';
    }
    lastTs = ts;
    pos += dir * 2;
    if(pos > stageW || pos < 0) dir *= -1;
    // BAD: left (reflow)
    badBall.style.left = pos + 'px';
    // GOOD: transform (GPU)
    goodBall.style.transform = 'translateY(-50%) translateX(' + pos + 'px)';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

function stopPerf() {
  perfRunning = false;
}

function toggleWillChange() {
  const on = document.getElementById('wc-toggle').checked;
  document.getElementById('wc-off').style.willChange = on ? 'transform' : 'auto';
  document.getElementById('wc-off').querySelector('.wc-tag').textContent = on ? 'GPU шар' : 'Без підказки';
}

// === RAF vs setInterval ===
let rafId, siId;
let rafPos = 0, siPos = 0, rafDir = 1, siDir = 1;

function startRAF() {
  cancelAnimationFrame(rafId);
  const el = document.getElementById('raf-el');
  const w  = el.parentElement.clientWidth - 80;
  function loop() {
    rafPos += rafDir * 2;
    if(rafPos > w || rafPos < 0) rafDir *= -1;
    el.style.transform = 'translateX(' + rafPos + 'px)';
    rafId = requestAnimationFrame(loop);
  }
  loop();
}

function startSI() {
  clearInterval(siId);
  const el = document.getElementById('si-el');
  const w  = el.parentElement.clientWidth - 100;
  siId = setInterval(() => {
    siPos += siDir * 2;
    if(siPos > w || siPos < 0) siDir *= -1;
    el.style.transform = 'translateX(' + siPos + 'px)';
  }, 16);
}

function stopBoth() {
  cancelAnimationFrame(rafId);
  clearInterval(siId);
}`,
    [
      { level:'easy',   uk:'Натисни "Start Both" — спостерігай за обома кульками. В DevTools → Performance → запиши 3с і знайди rendering tasks.',  ru:'Нажми "Start Both" — наблюдай за обоими шарами. В DevTools → Performance → запиши 3с.' },
      { level:'medium', uk:'Поясни чому left/top викликають reflow, а transform — ні. Де в render pipeline знаходяться Layout, Paint, Composite?',  ru:'Объясни почему left/top вызывают reflow, а transform — нет. Где в pipeline: Layout, Paint, Composite?' },
      { level:'hard',   uk:'Відкрий DevTools → Layers panel і знайди GPU-шар (compositing layer) для .good-ball після запуску. Чому will-change: transform його створює заздалегідь?',  ru:'Открой DevTools → Layers и найди GPU-слой для .good-ball. Почему will-change: transform создаёт его заранее?' },
    ]
  );

  /* ─── 03-10 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('03-10',
    { uk:`<h2>ПРОЕКТ: Animated Landing Page</h2>
<p>Побудуй анімований лендінг з 5 різними анімаційними ефектами на основі всього вивченого у модулі.</p>
<h3>Обов'язкові 5 ефектів</h3>
<ol>
  <li><strong>Hero section</strong> — @keyframes: typewriter або fade-in-up при завантаженні</li>
  <li><strong>Кнопка CTA</strong> — cubic-bezier hover: scale + shadow з overshoot</li>
  <li><strong>Features section</strong> — IntersectionObserver: картки з'являються при прокрутці (staggered delay)</li>
  <li><strong>Counter або числа</strong> — анімація від 0 до значення (requestAnimationFrame або CSS @counter)</li>
  <li><strong>3D Card flip</strong> або SVG draw effect або parallax</li>
</ol>
<h3>Технічні вимоги</h3>
<ul>
  <li>Всі анімації через transform/opacity (GPU-safe)</li>
  <li>prefers-reduced-motion: reduce — вимикати анімації</li>
  <li>will-change тільки де потрібно</li>
  <li>Без jQuery і зовнішніх бібліотек</li>
</ul>`,
      ru:`<h2>ПРОЕКТ: Animated Landing Page</h2>
<h3>Обязательные 5 эффектов</h3>
<ol>
  <li>Hero — @keyframes при загрузке</li>
  <li>Кнопка CTA — cubic-bezier hover</li>
  <li>Features — IntersectionObserver staggered</li>
  <li>Counter — RAF от 0 до значения</li>
  <li>3D Card flip или SVG draw или parallax</li>
</ol>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebCraft Academy</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- 1. Hero — @keyframes fade-in-up + typewriter -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <span class="hero-pill">🚀 Новий набір 2025</span>
      <h1 class="hero-title">Стань <span class="type-wrap"><span class="typewriter" id="typewriter"></span><span class="cursor">|</span></span></h1>
      <p class="hero-sub">Від нуля до Junior Developer за 6 місяців. 170 практичних уроків.</p>
      <!-- 2. CTA кнопка з cubic-bezier -->
      <div class="hero-btns">
        <button class="cta-btn cta-primary">Почати навчання</button>
        <button class="cta-btn cta-ghost">Дивитись програму</button>
      </div>
    </div>
  </section>

  <!-- 4. Counter секція -->
  <section class="stats">
    <div class="stat-item"><div class="stat-num" data-target="170">0</div><div class="stat-label">Уроків</div></div>
    <div class="stat-item"><div class="stat-num" data-target="14">0</div><div class="stat-label">Модулів</div></div>
    <div class="stat-item"><div class="stat-num" data-target="2400">0</div><div class="stat-label">Студентів</div></div>
    <div class="stat-item"><div class="stat-num" data-target="98">0</div><div class="stat-label">% задоволені</div></div>
  </section>

  <!-- 3. Features — IntersectionObserver staggered -->
  <section class="features">
    <h2 class="section-title">Що ти вивчиш</h2>
    <div class="features-grid">
      <div class="feature-card anim-card"><div class="fc-icon">🌐</div><h3>HTML5 Семантика</h3><p>SEO, Accessibility, SVG, PWA</p></div>
      <div class="feature-card anim-card"><div class="fc-icon">🎨</div><h3>CSS3 Майстерність</h3><p>Grid, Flexbox, Animations, Container Queries</p></div>
      <div class="feature-card anim-card"><div class="fc-icon">⚡</div><h3>JavaScript ES6+</h3><p>Closures, Promises, async/await, Modules</p></div>
      <div class="feature-card anim-card"><div class="fc-icon">🚀</div><h3>Реальні проекти</h3><p>Квіз-гра, Портфоліо, Weather App, Блог</p></div>
    </div>
  </section>

  <!-- 5. 3D Card flip -->
  <section class="flip-section">
    <h2 class="section-title">Наші курси</h2>
    <div class="flip-cards">
      <div class="flip-wrap">
        <div class="flip-c" onclick="this.classList.toggle('flipped')">
          <div class="flip-f"><div class="fc-num">01</div><h3>HTML & CSS</h3><p>6 тижнів</p><span class="flip-hint">Клікни →</span></div>
          <div class="flip-b"><h3>Що навчишся</h3><ul><li>Семантична верстка</li><li>Flexbox та Grid</li><li>Адаптивний дизайн</li><li>CSS Animations</li></ul></div>
        </div>
      </div>
      <div class="flip-wrap">
        <div class="flip-c" onclick="this.classList.toggle('flipped')">
          <div class="flip-f"><div class="fc-num">02</div><h3>JavaScript</h3><p>8 тижнів</p><span class="flip-hint">Клікни →</span></div>
          <div class="flip-b"><h3>Що навчишся</h3><ul><li>ES6+ синтаксис</li><li>DOM та Events</li><li>Fetch API</li><li>async/await</li></ul></div>
        </div>
      </div>
      <div class="flip-wrap">
        <div class="flip-c" onclick="this.classList.toggle('flipped')">
          <div class="flip-f"><div class="fc-num">03</div><h3>Проекти</h3><p>4 тижні</p><span class="flip-hint">Клікни →</span></div>
          <div class="flip-b"><h3>4 проекти</h3><ul><li>🎮 Квіз-гра</li><li>💼 Портфоліо</li><li>🌦️ Weather App</li><li>📝 Блог</li></ul></div>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>© 2025 WebCraft Academy · Made with ❤️ and CSS Animations</p>
  </footer>
  <script src="script.js"></script>
</body>
</html>`,
    `/* ─── Tokens ──────────────────────────────────────────────── */
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --accent:#3b82f6;--accent2:#8b5cf6;
  --bg:#0f172a;--bg2:#1e293b;--border:#334155;--text:#f1f5f9;--muted:#64748b;
  --shadow-lg:0 20px 60px rgba(0,0,0,.5);
}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}

/* ─── Hero ──────────────────────────────────────────────────── */
@keyframes heroFade{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
.hero{position:relative;min-height:300px;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:40px 20px}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 60% 40%,rgba(59,130,246,.2),transparent 60%),linear-gradient(135deg,#050b1a,#0f172a);z-index:0}
.hero-content{position:relative;z-index:1;text-align:center;max-width:560px;animation:heroFade .8s ease both}
.hero-pill{display:inline-block;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.3);color:#93c5fd;font-size:12px;padding:4px 14px;border-radius:20px;margin-bottom:16px;animation:heroFade .8s ease .2s both}
.hero-title{font-size:32px;font-weight:900;color:#fff;margin-bottom:12px;line-height:1.2;animation:heroFade .8s ease .3s both}
.type-wrap{display:inline-block;color:var(--accent)}
.cursor{animation:blink .7s steps(2) infinite;margin-left:2px}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.hero-sub{font-size:14px;color:var(--muted);margin-bottom:20px;animation:heroFade .8s ease .5s both}
.hero-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;animation:heroFade .8s ease .7s both}

/* ─── CTA Button (cubic-bezier overshoot) ──────────────────── */
.cta-btn{padding:11px 24px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease;border:none;will-change:transform}
.cta-primary{background:var(--accent);color:#fff}
.cta-primary:hover{transform:scale(1.06) translateY(-2px);box-shadow:0 8px 30px rgba(59,130,246,.5)}
.cta-ghost{background:transparent;border:1px solid var(--border);color:var(--text)}
.cta-ghost:hover{transform:scale(1.04);border-color:var(--accent);color:#93c5fd}

/* ─── Stats / Counter ───────────────────────────────────────── */
.stats{display:flex;justify-content:center;gap:0;flex-wrap:wrap;background:var(--bg2);border-block:1px solid var(--border)}
.stat-item{flex:1;min-width:100px;text-align:center;padding:20px 10px;position:relative}
.stat-item+.stat-item::before{content:'';position:absolute;inset-block:20%;inset-inline-start:0;width:1px;background:var(--border)}
.stat-num{font-size:32px;font-weight:900;color:var(--accent);font-variant-numeric:tabular-nums;line-height:1}
.stat-label{font-size:12px;color:var(--muted);margin-top:4px}

/* ─── Features ──────────────────────────────────────────────── */
.features{padding:32px 20px;max-width:600px;margin:0 auto}
.section-title{font-size:22px;font-weight:800;color:#fff;text-align:center;margin-bottom:20px}
.features-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.feature-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px;opacity:0;transform:translateY(24px);transition:opacity .5s ease,transform .5s ease,border-color .2s}
.feature-card.visible{opacity:1;transform:none}
.feature-card:hover{border-color:var(--accent)}
.fc-icon{font-size:26px;margin-bottom:8px}
.feature-card h3{font-size:14px;font-weight:700;color:#fff;margin-bottom:4px}
.feature-card p{font-size:12px;color:var(--muted);line-height:1.5}

/* ─── Flip cards ────────────────────────────────────────────── */
.flip-section{padding:32px 20px;max-width:600px;margin:0 auto}
.flip-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.flip-wrap{perspective:800px}
.flip-c{height:160px;position:relative;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.4,0,.2,1);cursor:pointer}
.flip-c.flipped{transform:rotateY(180deg)}
.flip-f,.flip-b{position:absolute;inset:0;border-radius:12px;backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:14px;text-align:center}
.flip-f{background:linear-gradient(135deg,var(--bg2),#283a51);border:1px solid var(--border)}
.flip-b{background:linear-gradient(135deg,#1d4ed8,#7c3aed);transform:rotateY(180deg)}
.fc-num{font-size:28px;font-weight:900;color:var(--accent);line-height:1}
.flip-f h3,.flip-b h3{font-size:13px;font-weight:700;color:#fff}
.flip-f p{font-size:11px;color:var(--muted)}
.flip-b ul{list-style:none;font-size:11px;color:rgba(255,255,255,.8);text-align:left}
.flip-b li::before{content:'✓ ';color:#7dd3fc}
.flip-hint{font-size:10px;color:var(--muted);margin-top:4px}

/* ─── Footer ────────────────────────────────────────────────── */
.footer{text-align:center;padding:20px;font-size:12px;color:var(--muted);border-top:1px solid var(--border);margin-top:20px}`,
    `// 1. Typewriter
const WORDS = ['Веб-Розробником', 'Junior Dev', 'CSS-майстром', 'JS-розробником'];
let wi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = WORDS[wi];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if(!deleting && ci > word.length) { deleting=true; setTimeout(type, 1200); return; }
  if(deleting && ci < 0) { deleting=false; wi=(wi+1)%WORDS.length; ci=0; }
  setTimeout(type, deleting ? 60 : 120);
}
type();

// 3. IntersectionObserver staggered
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.anim-card').forEach((el,i) => {
  el.style.transitionDelay = (i * 100) + 'ms';
  io.observe(el);
});

// 4. Counter animation (requestAnimationFrame)
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  let start = null;
  function step(ts) {
    if(!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsIO.unobserve(e.target);
    }
  });
}, { threshold: .5 });
statsIO.observe(document.querySelector('.stats'));`,
    [
      { level:'easy',   uk:'Проскролюй сторінку — поспостерігай за всіма 5 анімаційними ефектами. Наведи на CTA кнопку — відчуй overshoot.',  ru:'Проскролюй страницу — наблюдай за всеми 5 анимационными эффектами. Наведи на CTA кнопку.' },
      { level:'medium', uk:'Знайди у CSS правило @media(prefers-reduced-motion:reduce) — поясни навіщо воно. Як протестувати його в DevTools?',  ru:'Найди в CSS @media(prefers-reduced-motion:reduce) — объясни зачем. Как тестировать в DevTools?' },
      { level:'hard',   uk:'Додай п\'ятий flip-card "04 — Проекти" та шосту feature-card "🌦️ API інтеграція". Переконайся що анімації IntersectionObserver автоматично підхопили нові карточки.',  ru:'Добавь пятый flip-card "04 — Проекты" и шестую feature-card. Убедись что IntersectionObserver автоматически подхватил новые.' },
    ]
  );

})();
