/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 01 — HTML5 та Семантика · 10–14 Веб-Розробник
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
h3{font-size:13px;color:#64748b;margin-bottom:8px;letter-spacing:.03em;text-transform:uppercase}
p{font-size:13px;color:#94a3b8;line-height:1.65;margin-bottom:10px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
button:hover{border-color:#3b82f6;color:#93c5fd}
input,textarea,select{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:9px 12px;border-radius:8px;font-size:13px;font-family:inherit;transition:.2s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.15)}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}`;

  /* ─── 01-01 ──────────────────────────────────────────────── */
  patch('01-01',
    { uk:`<h2>Семантичний HTML5</h2>
<p>Семантичні теги описують <strong>зміст</strong>, а не зовнішній вигляд. Браузер, пошукові системи і screen-readers розуміють структуру сторінки завдяки ним.</p>
<h3>Ключові семантичні елементи</h3>
<ul>
  <li><code>&lt;header&gt;</code> — шапка сайту або секції</li>
  <li><code>&lt;nav&gt;</code> — навігаційні посилання</li>
  <li><code>&lt;main&gt;</code> — головний контент (один на сторінці!)</li>
  <li><code>&lt;article&gt;</code> — незалежний блок контенту (пост, новина, картка)</li>
  <li><code>&lt;section&gt;</code> — тематична секція зі своїм заголовком</li>
  <li><code>&lt;aside&gt;</code> — додатковий матеріал (бічна панель, реклама)</li>
  <li><code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code> — зображення з підписом</li>
  <li><code>&lt;footer&gt;</code> — підвал сайту або секції</li>
</ul>
<h3>Чому важливо?</h3>
<ul>
  <li>🔍 SEO: Google краще індексує семантичні сторінки</li>
  <li>♿ Accessibility: screen-readers розуміють навігацію</li>
  <li>🤝 Readability: код простіше читати і підтримувати</li>
</ul>
<h3>Правила вкладення</h3>
<pre>&lt;main&gt;             &lt;!-- один на сторінку --&gt;
  &lt;article&gt;
    &lt;header&gt;...&lt;/header&gt;
    &lt;section&gt;...&lt;/section&gt;
    &lt;footer&gt;...&lt;/footer&gt;
  &lt;/article&gt;
  &lt;aside&gt;...&lt;/aside&gt;
&lt;/main&gt;</pre>`,
      ru:`<h2>Семантический HTML5</h2>
<p>Семантические теги описывают <strong>смысл</strong>, а не внешний вид. Браузер, поисковики и screen-readers понимают структуру страницы благодаря им.</p>
<h3>Ключевые семантические элементы</h3>
<ul>
  <li><code>&lt;header&gt;</code> — шапка сайта или секции</li>
  <li><code>&lt;nav&gt;</code> — навигационные ссылки</li>
  <li><code>&lt;main&gt;</code> — основной контент (один на странице!)</li>
  <li><code>&lt;article&gt;</code> — независимый блок контента (пост, новость)</li>
  <li><code>&lt;section&gt;</code> — тематическая секция со своим заголовком</li>
  <li><code>&lt;aside&gt;</code> — дополнительный материал (сайдбар)</li>
  <li><code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code> — изображение с подписью</li>
  <li><code>&lt;footer&gt;</code> — подвал сайта или секции</li>
</ul>
<h3>Правила вложенности</h3>
<pre>&lt;main&gt;
  &lt;article&gt;
    &lt;header&gt;...&lt;/header&gt;
    &lt;section&gt;...&lt;/section&gt;
    &lt;footer&gt;...&lt;/footer&gt;
  &lt;/article&gt;
  &lt;aside&gt;...&lt;/aside&gt;
&lt;/main&gt;</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Семантична верстка</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Демо: порівняння div-верстки та семантичної -->
  <div class="compare">
    <div class="col">
      <h2 class="col-title bad">❌ div-верстка</h2>
      <div class="div-demo">
        <div class="d-header">Новини Дня</div>
        <div class="d-nav">
          <div>Головна</div><div>Технології</div><div>Спорт</div>
        </div>
        <div class="d-main">
          <div class="d-article">
            <div class="d-art-title">Новий рекорд Tesla</div>
            <div class="d-art-meta">12 грудня 2024</div>
            <div class="d-art-body">Tesla встановила новий рекорд пробігу на одному заряді — 800 км.</div>
            <div class="d-fig">
              <div class="d-img">🚗</div>
              <div class="d-cap">Tesla Model S Plaid</div>
            </div>
          </div>
          <div class="d-aside">
            <div class="d-aside-title">Читайте також</div>
            <div>📰 Toyota анонсувала...</div>
            <div>📰 BMW оновила...</div>
          </div>
        </div>
        <div class="d-footer">© 2024 Новини</div>
      </div>
    </div>

    <div class="col">
      <h2 class="col-title good">✅ Семантична верстка</h2>
      <div class="sem-demo">
        <header class="s-header">Новини Дня</header>
        <nav class="s-nav">
          <a href="#">Головна</a><a href="#">Технології</a><a href="#">Спорт</a>
        </nav>
        <main class="s-main">
          <article class="s-article">
            <header>
              <h1 class="s-art-title">Новий рекорд Tesla</h1>
              <time datetime="2024-12-12" class="s-art-meta">12 грудня 2024</time>
            </header>
            <p class="s-art-body">Tesla встановила новий рекорд пробігу на одному заряді — 800 км.</p>
            <figure class="s-fig">
              <div class="s-img">🚗</div>
              <figcaption>Tesla Model S Plaid</figcaption>
            </figure>
          </article>
          <aside class="s-aside">
            <h2>Читайте також</h2>
            <ul>
              <li>📰 Toyota анонсувала...</li>
              <li>📰 BMW оновила...</li>
            </ul>
          </aside>
        </main>
        <footer class="s-footer">© 2024 Новини</footer>
      </div>
    </div>
  </div>

  <div class="tag-inspector" id="tag-inspector">
    <span class="ti-label">Наведи на елемент →</span>
    <code id="ti-tag"></code>
    <span id="ti-desc"></span>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
    `${BASE}
.compare{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.col-title{font-size:13px;margin-bottom:8px;font-weight:700}
.bad{color:#f87171}.good{color:#4ade80}

/* div-демо */
.div-demo,.sem-demo{background:#1e293b;border-radius:10px;overflow:hidden;font-size:12px}
.d-header{background:#334155;padding:10px 14px;font-weight:700;color:#f1f5f9}
.d-nav{display:flex;gap:12px;background:#283548;padding:8px 14px;color:#94a3b8}
.d-main{display:flex;gap:12px;padding:12px}
.d-article{flex:1}
.d-art-title{font-weight:700;color:#f1f5f9;margin-bottom:4px}
.d-art-meta{font-size:10px;color:#94a3b8;margin-bottom:6px}
.d-art-body{color:#94a3b8;line-height:1.5;margin-bottom:8px}
.d-fig{background:#0f172a;border-radius:6px;padding:8px;text-align:center}
.d-img{font-size:28px}
.d-cap{font-size:10px;color:#64748b;margin-top:4px}
.d-aside{width:100px;background:#0f172a;border-radius:6px;padding:8px;font-size:11px;color:#64748b}
.d-aside-title{color:#94a3b8;font-weight:700;margin-bottom:4px}
.d-footer{background:#283548;padding:8px 14px;font-size:11px;color:#64748b}

/* semantic demo */
.s-header{background:#1d4ed8;padding:10px 14px;font-weight:700;color:#fff}
.s-nav{display:flex;gap:12px;background:#172554;padding:8px 14px}
.s-nav a{color:#93c5fd;text-decoration:none;font-size:12px}
.s-nav a:hover{color:#fff}
.s-main{display:flex;gap:12px;padding:12px}
.s-article{flex:1}
.s-art-title{font-size:13px;font-weight:700;color:#f1f5f9;margin-bottom:4px}
.s-art-meta{font-size:10px;color:#93c5fd;display:block;margin-bottom:6px}
.s-art-body{font-size:12px;color:#94a3b8;line-height:1.5;margin-bottom:8px}
.s-fig{background:#0f172a;border-radius:6px;padding:8px;text-align:center;margin:0}
.s-fig .s-img{font-size:28px}
.s-fig figcaption{font-size:10px;color:#64748b;margin-top:4px}
.s-aside{width:100px;background:#0f172a;border-radius:6px;padding:8px}
.s-aside h2{font-size:11px;color:#94a3b8;font-weight:700;margin-bottom:6px;text-transform:none}
.s-aside ul{padding-left:0;list-style:none}
.s-aside li{font-size:11px;color:#64748b;margin-bottom:3px}
.s-footer{background:#172554;padding:8px 14px;font-size:11px;color:#93c5fd}

.tag-inspector{
  margin-top:14px;background:#1e293b;border:1px solid #334155;border-radius:10px;
  padding:12px 16px;display:flex;align-items:center;gap:10px;font-size:12px;color:#64748b;
  min-height:44px;
}
.ti-label{color:#475569}
#ti-tag{background:#0f172a;padding:3px 8px;border-radius:4px;color:#7dd3fc;border:1px solid #1e293b}
#ti-desc{color:#94a3b8}`,
    `const DESCS = {
  HEADER:  'Шапка сайту або секції',
  NAV:     'Блок навігаційних посилань',
  MAIN:    'Основний унікальний контент сторінки (один на сторінку!)',
  ARTICLE: 'Незалежний блок контенту — новина, пост, картка',
  SECTION: 'Тематична секція зі своїм заголовком',
  ASIDE:   'Допоміжний контент: сайдбар, реклама, читайте також',
  FIGURE:  'Зображення, схема або медіа з підписом',
  FIGCAPTION: 'Підпис до figure',
  FOOTER:  'Підвал сайту або секції',
  TIME:    'Машинозчитувана дата/час (атрибут datetime)',
  H1:      'Головний заголовок статті (один в article)',
};

document.querySelectorAll('.sem-demo *').forEach(el => {
  el.addEventListener('mouseover', function(e) {
    e.stopPropagation();
    const tag = this.tagName;
    document.getElementById('ti-tag').textContent = '<' + tag.toLowerCase() + '>';
    document.getElementById('ti-desc').textContent = DESCS[tag] || '';
    document.querySelector('.ti-label').textContent = '';
  });
  el.addEventListener('mouseleave', function() {
    document.querySelector('.ti-label').textContent = 'Наведи на елемент →';
    document.getElementById('ti-tag').textContent = '';
    document.getElementById('ti-desc').textContent = '';
  });
});`,
    [
      { level:'easy',   uk:'Наведи мишку на різні елементи у правій колонці — читай що означає кожен тег.',  ru:'Наведи мышку на разные элементы в правой колонке — читай что означает каждый тег.' },
      { level:'medium', uk:'У лівій (div) колонці знайди кожен div і заміни його на правильний семантичний тег у HTML-вкладці.',  ru:'В левой (div) колонке найди каждый div и замени его на правильный семантический тег в HTML-вкладке.' },
      { level:'hard',   uk:'Додай до <article> атрибут itemscope та itemtype="https://schema.org/NewsArticle" — це мікроформат для Google.',  ru:'Добавь к <article> атрибут itemscope и itemtype="https://schema.org/NewsArticle" — это микроформат для Google.' },
    ]
  );

  /* ─── 01-02 ──────────────────────────────────────────────── */
  patch('01-02',
    { uk:`<h2>Медіа: video, audio, picture, source, track</h2>
<p>HTML5 додав нативні медіа-елементи без Flash і плагінів. Вони підтримують кілька форматів і субтитри.</p>
<h3>Video</h3>
<pre>&lt;video controls width="640" poster="thumb.jpg"&gt;
  &lt;source src="video.webm" type="video/webm"&gt;
  &lt;source src="video.mp4"  type="video/mp4"&gt;
  &lt;track kind="subtitles" src="uk.vtt" srclang="uk" label="Українська"&gt;
  &lt;p&gt;Ваш браузер не підтримує відео.&lt;/p&gt;
&lt;/video&gt;</pre>
<h3>Audio</h3>
<pre>&lt;audio controls&gt;
  &lt;source src="audio.ogg" type="audio/ogg"&gt;
  &lt;source src="audio.mp3" type="audio/mpeg"&gt;
&lt;/audio&gt;</pre>
<h3>Picture — адаптивні зображення</h3>
<pre>&lt;picture&gt;
  &lt;!-- Маленький екран: квадрат --&gt;
  &lt;source media="(max-width: 600px)" srcset="photo-sq.webp"&gt;
  &lt;!-- Великий: горизонталь --&gt;
  &lt;source media="(min-width: 601px)" srcset="photo-wide.webp"&gt;
  &lt;img src="photo.jpg" alt="Фото"&gt;  &lt;!-- fallback --&gt;
&lt;/picture&gt;</pre>
<h3>JS API медіа-елементів</h3>
<pre>const v = document.querySelector('video');
v.play(); v.pause(); v.currentTime = 30;
v.volume = 0.5; v.playbackRate = 1.5;</pre>`,
      ru:`<h2>Медиа: video, audio, picture, source, track</h2>
<pre>&lt;video controls width="640" poster="thumb.jpg"&gt;
  &lt;source src="video.webm" type="video/webm"&gt;
  &lt;source src="video.mp4"  type="video/mp4"&gt;
  &lt;track kind="subtitles" src="uk.vtt" srclang="uk" label="Украинский"&gt;
&lt;/video&gt;</pre>
<h3>Audio</h3>
<pre>&lt;audio controls&gt;
  &lt;source src="audio.ogg" type="audio/ogg"&gt;
  &lt;source src="audio.mp3" type="audio/mpeg"&gt;
&lt;/audio&gt;</pre>
<h3>Picture — адаптивные изображения</h3>
<pre>&lt;picture&gt;
  &lt;source media="(max-width: 600px)" srcset="photo-sq.webp"&gt;
  &lt;source media="(min-width: 601px)" srcset="photo-wide.webp"&gt;
  &lt;img src="photo.jpg" alt="Фото"&gt;
&lt;/picture&gt;</pre>
<h3>JS API</h3>
<pre>const v = document.querySelector('video');
v.play(); v.pause();
v.volume = 0.5; v.playbackRate = 1.5;</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><title>Медіа API</title><link rel="stylesheet" href="style.css"></head>
<body>
<div class="media-lab">
  <h2>🎬 Медіа API: кастомний плеєр</h2>

  <!-- Аудіо-плеєр через Web Audio API (без реального файлу) -->
  <div class="player-wrap">
    <canvas id="vis" width="480" height="80"></canvas>
    <div class="player-controls">
      <button id="play-btn">▶ Play</button>
      <div class="time-bar">
        <span id="cur-time">0:00</span>
        <input type="range" id="seek" min="0" max="100" value="0" class="seek-slider">
        <span id="dur-time">0:30</span>
      </div>
      <input type="range" id="vol" min="0" max="1" step="0.01" value="0.7" class="vol-slider" title="Гучність">
      <span id="vol-pct">70%</span>
      <select id="rate">
        <option value="0.5">0.5x</option>
        <option value="1" selected>1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </div>
  </div>

  <!-- picture demo -->
  <div class="picture-demo">
    <h3>picture + srcset</h3>
    <pre class="code-demo">&lt;picture&gt;
  &lt;source media="(max-width:400px)" srcset="small.webp"&gt;
  &lt;source media="(min-width:401px)" srcset="wide.webp"&gt;
  &lt;img src="fallback.jpg" alt="Адаптивне зображення"&gt;
&lt;/picture&gt;</pre>
    <p class="note">💡 Браузер завантажує <strong>тільки один</strong> варіант — найбільш підходящий.</p>
  </div>
</div>
<script src="script.js"></script>
</body>
</html>`,
    `${BASE}
.media-lab{max-width:540px}
.player-wrap{background:#1e293b;border-radius:14px;padding:16px;margin-bottom:16px}
canvas{display:block;border-radius:8px;margin-bottom:12px;background:#0f172a}
.player-controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
#play-btn{padding:8px 16px;min-width:80px;font-weight:700}
.time-bar{flex:1;display:flex;align-items:center;gap:8px;min-width:200px}
.seek-slider,.vol-slider{-webkit-appearance:none;height:4px;border-radius:4px;background:#334155;cursor:pointer;accent-color:#3b82f6}
.seek-slider{flex:1}.vol-slider{width:70px}
#cur-time,#dur-time{font-size:12px;font-family:monospace;color:#64748b;white-space:nowrap}
#vol-pct{font-size:11px;color:#64748b;width:32px}
select{background:#0f172a;border:1px solid #334155;color:#f1f5f9;padding:6px 8px;border-radius:6px;font-size:13px;cursor:pointer}
.picture-demo{background:#1e293b;border-radius:12px;padding:16px}
.picture-demo h3{color:#64748b;font-size:12px;text-transform:uppercase;margin-bottom:10px}
.code-demo{background:#0f172a;border-radius:8px;padding:12px;font-size:12px;font-family:monospace;color:#94a3b8;line-height:1.7;overflow-x:auto;white-space:pre;border:1px solid #334155;margin-bottom:10px}
.note{font-size:12px;color:#64748b;line-height:1.6;padding:8px 12px;background:rgba(59,130,246,.08);border-radius:6px;border-left:2px solid #3b82f6}`,
    `// Синтетичний аудіо-сигнал через Web Audio API
const ctx = new AudioContext();
let oscNode, gainNode, isPlaying = false;
let startTime = 0, elapsed = 0;
const DURATION = 30;
let raf;

const playBtn  = document.getElementById('play-btn');
const seekEl   = document.getElementById('seek');
const curEl    = document.getElementById('cur-time');
const volEl    = document.getElementById('vol');
const volPct   = document.getElementById('vol-pct');
const rateEl   = document.getElementById('rate');
const canvas   = document.getElementById('vis');
const cctx     = canvas.getContext('2d');

function fmt(s) { return Math.floor(s/60)+':'+(String(Math.floor(s%60)).padStart(2,'0')); }

function drawVis(t) {
  cctx.clearRect(0,0,canvas.width,canvas.height);
  const bars = 60;
  for(let i=0;i<bars;i++){
    const h = isPlaying ? (20 + Math.sin(t*3+i*.4)*18 + Math.random()*8) : 4;
    const x = i*(canvas.width/bars);
    const w = canvas.width/bars - 2;
    cctx.fillStyle = 'hsl(' + (210+i*1.5) + ',80%,' + (40+h) + '%)';
    cctx.fillRect(x, (canvas.height-h)/2, w, h);
  }
  if(isPlaying) raf = requestAnimationFrame(t2 => drawVis(t2/1000));
}

function startAudio() {
  oscNode  = ctx.createOscillator();
  gainNode = ctx.createGain();
  oscNode.type = 'sine';
  oscNode.frequency.value = 220;
  gainNode.gain.value = parseFloat(volEl.value);
  oscNode.connect(gainNode); gainNode.connect(ctx.destination);
  oscNode.start();
  startTime = ctx.currentTime - elapsed;
}

function stopAudio() {
  oscNode?.stop(); oscNode?.disconnect();
}

playBtn.addEventListener('click', () => {
  if(ctx.state === 'suspended') ctx.resume();
  isPlaying = !isPlaying;
  if(isPlaying) {
    startAudio();
    playBtn.textContent = '⏸ Pause';
    raf = requestAnimationFrame(t => drawVis(t/1000));
    // Прогрес
    const iv = setInterval(() => {
      if(!isPlaying){ clearInterval(iv); return; }
      elapsed = ctx.currentTime - startTime;
      if(elapsed >= DURATION){ elapsed = 0; isPlaying=false; clearInterval(iv); playBtn.textContent='▶ Play'; }
      seekEl.value = (elapsed/DURATION)*100;
      curEl.textContent = fmt(elapsed);
    },100);
  } else {
    stopAudio(); cancelAnimationFrame(raf);
    playBtn.textContent = '▶ Play';
    drawVis(0);
  }
});

volEl.addEventListener('input', function() {
  if(gainNode) gainNode.gain.value = this.value;
  volPct.textContent = Math.round(this.value*100)+'%';
});
rateEl.addEventListener('change', function() {
  if(oscNode) oscNode.frequency.value = 220 * parseFloat(this.value);
});
seekEl.addEventListener('input', function() {
  elapsed = (this.value/100)*DURATION;
  if(isPlaying){ stopAudio(); startTime=ctx.currentTime-elapsed; startAudio(); }
  curEl.textContent = fmt(elapsed);
});
drawVis(0);`,
    [
      { level:'easy',   uk:'Натисни Play та відтворюй синтетичний звук. Рухай повзунок гучності і швидкості.',  ru:'Нажми Play и воспроизводи синтетический звук. Двигай ползунки громкости и скорости.' },
      { level:'medium', uk:'Змін тип осцилятора з "sine" на "square" або "sawtooth" — почуєш різниця у тембрі.',  ru:'Измени тип осциллятора с "sine" на "square" или "sawtooth" — услышишь разницу в тембре.' },
      { level:'hard',   uk:'Додай другий осцилятор з frequency.value = 330 і mix обох через GainNode. Результат — акорд.',  ru:'Добавь второй осциллятор с frequency.value = 330 и смешай оба через GainNode. Результат — аккорд.' },
    ]
  );

  /* ─── 01-03 ──────────────────────────────────────────────── */
  patch('01-03',
    { uk:`<h2>Форми HTML5: нові типи input</h2>
<p>HTML5 додав 13 нових типів <code>&lt;input&gt;</code>. Браузер сам показує відповідну клавіатуру на мобільних і надає базову валідацію.</p>
<h3>Нові типи (підтримка: 95%+ браузерів)</h3>
<ul>
  <li><code>email</code> — валідує формат пошти, мобільна клавіатура з @</li>
  <li><code>tel</code> — телефон, цифрова клавіатура на iOS</li>
  <li><code>url</code> — валідує http(s):// формат</li>
  <li><code>number</code> — тільки числа, крок (step), min/max</li>
  <li><code>range</code> — повзунок між min і max</li>
  <li><code>date</code>, <code>time</code>, <code>month</code>, <code>week</code>, <code>datetime-local</code></li>
  <li><code>color</code> — колорпікер</li>
  <li><code>search</code> — пошукове поле з кнопкою очистки</li>
</ul>
<h3>Корисні атрибути</h3>
<pre>placeholder="..."        // підказка в полі
required                 // обов'язкове поле
minlength="3" maxlength="50"
min="0" max="100" step="5"  // для number/range
pattern="[A-Za-z]{3,}"  // регекс для валідації
autocomplete="email"     // підказки браузера</pre>`,
      ru:`<h2>Формы HTML5: новые типы input</h2>
<p>HTML5 добавил 13 новых типов <code>&lt;input&gt;</code>. Браузер сам показывает подходящую клавиатуру на мобильных.</p>
<h3>Новые типы</h3>
<ul>
  <li><code>email</code> — валидирует формат почты</li>
  <li><code>tel</code> — телефон, цифровая клавиатура на iOS</li>
  <li><code>url</code> — валидирует http(s):// формат</li>
  <li><code>number</code> — только числа, min/max/step</li>
  <li><code>range</code> — ползунок</li>
  <li><code>date</code>, <code>time</code>, <code>color</code>, <code>search</code></li>
</ul>
<h3>Полезные атрибуты</h3>
<pre>placeholder="..."
required
min="0" max="100" step="5"
pattern="[A-Za-z]{3,}"
autocomplete="email"</pre>` },
    `<form class="demo-form" id="demo-form" onsubmit="handleSubmit(event)">
  <h2>🔍 Типи input HTML5</h2>

  <div class="field-grid">
    <div class="field">
      <label>email <code>type="email"</code></label>
      <input type="email" name="email" placeholder="user@example.com" autocomplete="email">
    </div>
    <div class="field">
      <label>tel <code>type="tel"</code></label>
      <input type="tel" name="phone" placeholder="+380..." pattern="[+]?[0-9]{10,13}">
    </div>
    <div class="field">
      <label>url <code>type="url"</code></label>
      <input type="url" name="site" placeholder="https://...">
    </div>
    <div class="field">
      <label>number <code>min=1 max=100 step=5</code></label>
      <input type="number" name="age" min="1" max="100" step="1" value="14">
    </div>
    <div class="field">
      <label>date <code>type="date"</code></label>
      <input type="date" name="bday" id="bday">
    </div>
    <div class="field">
      <label>time <code>type="time"</code></label>
      <input type="time" name="alarm" value="09:00">
    </div>
    <div class="field">
      <label>range <code>min=0 max=100</code> — <span id="range-val">50</span>%</label>
      <input type="range" name="volume" min="0" max="100" value="50" id="range-inp">
    </div>
    <div class="field">
      <label>color <code>type="color"</code></label>
      <input type="color" name="fav" value="#3b82f6" id="color-inp">
    </div>
    <div class="field span2">
      <label>search <code>type="search"</code></label>
      <input type="search" name="query" placeholder="Пошук..." autocomplete="off">
    </div>
  </div>

  <div class="color-preview" id="color-preview">Обраний колір</div>

  <button type="submit">Відправити форму</button>
  <div class="result" id="result"></div>
</form>`,
    `${BASE}
.demo-form{max-width:540px}
.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.span2{grid-column:span 2}
.field label{display:block;font-size:12px;color:#64748b;margin-bottom:6px}
.field label code{background:#0f172a;padding:2px 6px;border-radius:4px;color:#7dd3fc;font-size:11px;border:1px solid #1e293b}
.field input{width:100%;margin:0}
input[type=range]{cursor:pointer;padding:4px 0;accent-color:#3b82f6}
input[type=color]{height:38px;cursor:pointer;padding:2px;border-radius:8px}
.color-preview{height:40px;border-radius:10px;background:#3b82f6;margin-bottom:14px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;transition:.3s}
.result{margin-top:10px;background:#1e293b;border-radius:8px;padding:12px;font-size:13px;color:#94a3b8;display:none}`,
    `document.getElementById('range-inp').addEventListener('input', function(){
  document.getElementById('range-val').textContent = this.value;
});
document.getElementById('color-inp').addEventListener('input', function(){
  const p = document.getElementById('color-preview');
  p.style.background = this.value;
  p.textContent = this.value;
});

function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const res = document.getElementById('result');
  let html = '<strong>Дані форми:</strong><br>';
  for(const [k,v] of data) if(v) html += k+': '+v+'<br>';
  res.innerHTML = html;
  res.style.display = 'block';
}`,
    [
      { level:'easy',   uk:'Заповни всі поля і натисни "Відправити" — подивись що виводиться в результаті.',  ru:'Заполни все поля и нажми "Отправить" — посмотри что выводится в результате.' },
      { level:'medium', uk:'Додай поле <code>type="month"</code> з label "Місяць народження" між полями date і time.',  ru:'Добавь поле <code>type="month"</code> с label "Месяц рождения" между полями date и time.' },
      { level:'hard',   uk:'Додай поле з <code>pattern="[A-Z][a-z]{2,9}"</code> (перша велика, 2-9 малих) і title="Ім\'я: перша велика літера, 3-10 символів" — перевір що браузер блокує неправильні значення.',  ru:'Добавь поле с <code>pattern="[A-Z][a-z]{2,9}"</code> и title="Имя: первая заглавная, 3-10 символов".' },
    ]
  );

  /* ─── 01-04 ──────────────────────────────────────────────── */
  patch('01-04',
    { uk:`<h2>Валідація форм: checkValidity(), setCustomValidity()</h2>
<p>HTML5 Constraint Validation API дозволяє перевіряти і кастомізувати помилки прямо в браузері.</p>
<h3>Основні методи та властивості</h3>
<pre>const input = document.querySelector('input');

// Чи проходить поле валідацію?
input.checkValidity() // → true / false

// Об'єкт з конкретними причинами помилки:
input.validity.valueMissing   // required, але порожньо
input.validity.typeMismatch   // невірний формат (email, url)
input.validity.patternMismatch// не відповідає pattern
input.validity.tooShort       // менше minlength
input.validity.rangeOverflow  // більше max
input.validity.rangeUnderflow // менше min

// Кастомне повідомлення:
input.setCustomValidity('Ім\'я вже зайнято!');
// Скинути кастомну помилку:
input.setCustomValidity('');</pre>
<h3>Перехоплення submit</h3>
<pre>form.addEventListener('submit', e => {
  if (!form.checkValidity()) {
    e.preventDefault();
    // показати власні повідомлення
  }
});</pre>
<h3>CSS-псевдокласи</h3>
<pre>input:valid   { border-color: green; }
input:invalid { border-color: red; }
input:required::after { content: ' *'; }</pre>`,
      ru:`<h2>Валидация форм: checkValidity(), setCustomValidity()</h2>
<pre>const input = document.querySelector('input');

input.checkValidity() // → true / false

// Объект с причинами ошибки:
input.validity.valueMissing   // required, но пусто
input.validity.typeMismatch   // неверный формат
input.validity.patternMismatch// не соответствует pattern
input.validity.tooShort       // меньше minlength

// Кастомное сообщение:
input.setCustomValidity('Имя уже занято!');
input.setCustomValidity(''); // сбросить</pre>
<h3>CSS-псевдоклассы</h3>
<pre>input:valid   { border-color: green; }
input:invalid { border-color: red; }</pre>` },
    `<form class="val-form" id="val-form" novalidate>
  <h2>✅ Live Validation</h2>

  <div class="vf-field" id="vf-username">
    <label for="username">Нікнейм <span class="req">*</span></label>
    <div class="inp-wrap">
      <input type="text" id="username" name="username"
        minlength="3" maxlength="20"
        pattern="[a-zA-Z0-9_]+"
        placeholder="Тільки a-z, 0-9, _"
        required autocomplete="off">
      <span class="inp-icon" id="icon-username"></span>
    </div>
    <div class="err-msg" id="err-username"></div>
    <div class="hint">3-20 символів, тільки a-z, 0-9 і _</div>
  </div>

  <div class="vf-field" id="vf-email">
    <label for="vemail">Email <span class="req">*</span></label>
    <div class="inp-wrap">
      <input type="email" id="vemail" name="email" placeholder="user@example.com" required>
      <span class="inp-icon" id="icon-email"></span>
    </div>
    <div class="err-msg" id="err-email"></div>
  </div>

  <div class="vf-field" id="vf-pass">
    <label for="vpass">Пароль <span class="req">*</span></label>
    <div class="inp-wrap">
      <input type="password" id="vpass" name="password" minlength="8" required placeholder="Мін. 8 символів">
      <span class="inp-icon" id="icon-pass"></span>
    </div>
    <div class="err-msg" id="err-pass"></div>
    <div class="strength-bar"><div id="strength-fill"></div></div>
    <div class="strength-label" id="strength-label"></div>
  </div>

  <div class="vf-field" id="vf-pass2">
    <label for="vpass2">Підтвердити пароль <span class="req">*</span></label>
    <div class="inp-wrap">
      <input type="password" id="vpass2" name="password2" required placeholder="Повтори пароль">
      <span class="inp-icon" id="icon-pass2"></span>
    </div>
    <div class="err-msg" id="err-pass2"></div>
  </div>

  <button type="submit">Зареєструватись</button>
  <div class="success-msg hidden" id="success-msg">🎉 Реєстрація успішна!</div>
</form>`,
    `${BASE}
.val-form{max-width:400px}
.vf-field{margin-bottom:16px}
.vf-field label{display:block;font-size:13px;color:#94a3b8;margin-bottom:6px;font-weight:600}
.req{color:#f87171}
.inp-wrap{position:relative}
.inp-wrap input{width:100%;padding-right:36px;margin:0}
.inp-icon{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none}
.err-msg{font-size:11px;color:#f87171;margin-top:4px;min-height:16px}
.hint{font-size:11px;color:#475569;margin-top:4px}
input.valid-ok{border-color:#22c55e!important}
input.valid-ok:focus{box-shadow:0 0 0 3px rgba(34,197,94,.15)!important}
input.valid-err{border-color:#f87171!important}
input.valid-err:focus{box-shadow:0 0 0 3px rgba(248,113,113,.15)!important}
.strength-bar{height:4px;background:#1e293b;border-radius:4px;margin-top:8px;overflow:hidden}
#strength-fill{height:100%;width:0;transition:.3s;border-radius:4px}
.strength-label{font-size:11px;margin-top:4px;color:#64748b}
.success-msg{margin-top:12px;background:rgba(34,197,94,.1);border:1px solid #22c55e;border-radius:10px;padding:12px;text-align:center;font-size:14px;font-weight:700;color:#4ade80}
.hidden{display:none!important}`,
    `function setField(id, ok, msg) {
  const inp = document.getElementById(id);
  const iconEl = document.getElementById('icon-' + id.replace('v','icon-').split('-')[0] || id);
  const errEl = document.getElementById('err-' + id.replace('v',''));
  // Спрощення: парсимо id
  const key = id.replace('v','');
  const icon2 = document.getElementById('icon-' + key);
  const err2  = document.getElementById('err-'  + key);
  inp.className = ok ? 'valid-ok' : (msg ? 'valid-err' : '');
  if(icon2) icon2.textContent = ok ? '✅' : (msg ? '❌' : '');
  if(err2)  err2.textContent  = msg || '';
}

function checkStrength(pw) {
  let score = 0;
  if(pw.length >= 8) score++;
  if(/[A-Z]/.test(pw)) score++;
  if(/[0-9]/.test(pw)) score++;
  if(/[^a-zA-Z0-9]/.test(pw)) score++;
  const colors = ['','#f87171','#fb923c','#facc15','#4ade80'];
  const labels = ['','Слабкий','Нормальний','Хороший','Відмінний'];
  document.getElementById('strength-fill').style.cssText =
    'width:' + (score*25) + '%;background:' + colors[score];
  document.getElementById('strength-label').textContent = labels[score];
  document.getElementById('strength-label').style.color = colors[score];
  return score;
}

document.getElementById('username').addEventListener('input', function() {
  const v = this.validity;
  if(v.valueMissing)      setField('username', false, 'Поле обов\'язкове');
  else if(v.tooShort)     setField('username', false, 'Мін. 3 символи');
  else if(v.patternMismatch) setField('username', false, 'Тільки a-z, 0-9, _');
  else                    setField('username', true, '');
});

document.getElementById('vemail').addEventListener('input', function() {
  const v = this.validity;
  if(v.valueMissing)  setField('vemail', false, 'Поле обов\'язкове');
  else if(v.typeMismatch) setField('vemail', false, 'Невірний формат email');
  else                setField('vemail', true, '');
});

document.getElementById('vpass').addEventListener('input', function() {
  const score = checkStrength(this.value);
  if(this.validity.valueMissing) setField('vpass', false, 'Поле обов\'язкове');
  else if(this.validity.tooShort) setField('vpass', false, 'Мін. 8 символів');
  else setField('vpass', score >= 2, score < 2 ? 'Пароль занадто простий' : '');
});

document.getElementById('vpass2').addEventListener('input', function() {
  const p1 = document.getElementById('vpass').value;
  if(this.value !== p1) {
    this.setCustomValidity('Паролі не збігаються');
    setField('vpass2', false, 'Паролі не збігаються');
  } else {
    this.setCustomValidity('');
    setField('vpass2', true, '');
  }
});

document.getElementById('val-form').addEventListener('submit', function(e) {
  e.preventDefault();
  if(this.checkValidity() && document.getElementById('vpass').value === document.getElementById('vpass2').value) {
    document.getElementById('success-msg').classList.remove('hidden');
  }
});`,
    [
      { level:'easy',   uk:'Введи нікнейм коротший за 3 символи та нікнейм із пробілом — поспостерігай за повідомленнями про помилку.',  ru:'Введи никнейм короче 3 символов и никнейм с пробелом — понаблюдай за сообщениями об ошибке.' },
      { level:'medium', uk:'Відкрий консоль і виконай: document.getElementById("username").validity — вивчи об\'єкт ValidityState.',  ru:'Открой консоль и выполни: document.getElementById("username").validity — изучи объект ValidityState.' },
      { level:'hard',   uk:'Додай асинхронну перевірку нікнейму: через setTimeout(1000) симулюй відповідь сервера — якщо нікнейм "admin" — показуй "вже зайнято" через setCustomValidity.',  ru:'Добавь асинхронную проверку никнейма: через setTimeout(1000) симулируй ответ сервера — если "admin" — показывай "уже занято" через setCustomValidity.' },
    ]
  );

  /* ─── 01-05 ──────────────────────────────────────────────── */
  patch('01-05',
    { uk:`<h2>SEO-теги: title, meta, canonical, og:</h2>
<p>SEO (Search Engine Optimization) — це оптимізація сторінки для пошукових систем. Правильні мета-теги збільшують кількість відвідувачів.</p>
<h3>Обов'язкові теги</h3>
<pre>&lt;head&gt;
  &lt;title&gt;Назва сторінки | Сайт&lt;/title&gt;   &lt;!-- 50-60 символів --&gt;
  &lt;meta name="description" content="..."&gt; &lt;!-- 120-160 символів --&gt;
  &lt;link rel="canonical" href="https://..."&gt;&lt;!-- уникальний URL --&gt;
  &lt;meta name="robots" content="index, follow"&gt;
&lt;/head&gt;</pre>
<h3>Open Graph (соцмережі)</h3>
<pre>&lt;meta property="og:title"       content="Заголовок"&gt;
&lt;meta property="og:description" content="Опис"&gt;
&lt;meta property="og:image"       content="https://.../cover.jpg"&gt;
&lt;meta property="og:url"         content="https://..."&gt;
&lt;meta property="og:type"        content="article"&gt;</pre>
<h3>Twitter Cards</h3>
<pre>&lt;meta name="twitter:card"  content="summary_large_image"&gt;
&lt;meta name="twitter:title" content="Заголовок"&gt;</pre>
<h3>Важливо</h3>
<ul>
  <li>Title — унікальний для кожної сторінки</li>
  <li>Description — не впливає на рейтинг напряму, але впливає на CTR</li>
  <li>Canonical — вказує «головну» версію URL (www vs без www)</li>
</ul>`,
      ru:`<h2>SEO-теги: title, meta, canonical, og:</h2>
<pre>&lt;title&gt;Название страницы | Сайт&lt;/title&gt;
&lt;meta name="description" content="..."&gt;
&lt;link rel="canonical" href="https://..."&gt;</pre>
<h3>Open Graph</h3>
<pre>&lt;meta property="og:title"       content="Заголовок"&gt;
&lt;meta property="og:description" content="Описание"&gt;
&lt;meta property="og:image"       content="https://.../cover.jpg"&gt;
&lt;meta property="og:type"        content="article"&gt;</pre>` },
    `<div class="seo-gen">
  <h2>🔍 SEO Мета-тег Генератор</h2>

  <div class="seo-inputs">
    <div class="si-field">
      <label>Title <span class="counter" id="c-title">0/60</span></label>
      <input type="text" id="si-title" maxlength="70" value="Навчання веб-розробки з нуля | Academy" oninput="updateSeo()">
    </div>
    <div class="si-field">
      <label>Description <span class="counter" id="c-desc">0/160</span></label>
      <textarea id="si-desc" rows="2" maxlength="200" oninput="updateSeo()">Освоюй HTML, CSS і JavaScript з нуля до рівня Junior. 170 практичних уроків із живим редактором.</textarea>
    </div>
    <div class="si-field">
      <label>URL сторінки</label>
      <input type="url" id="si-url" value="https://academy.com/courses/web" oninput="updateSeo()">
    </div>
    <div class="si-field">
      <label>OG Image URL</label>
      <input type="url" id="si-img" value="https://academy.com/cover.jpg" oninput="updateSeo()">
    </div>
  </div>

  <h3>Попередній перегляд у Google</h3>
  <div class="google-preview">
    <div class="gp-url" id="gp-url">academy.com › courses › web</div>
    <div class="gp-title" id="gp-title">Навчання веб-розробки з нуля | Academy</div>
    <div class="gp-desc" id="gp-desc">Освоюй HTML, CSS і JavaScript з нуля до рівня Junior. 170 практичних уроків із живим редактором.</div>
  </div>

  <h3>Попередній перегляд у соцмережах</h3>
  <div class="og-card">
    <div class="og-img">🎓</div>
    <div class="og-body">
      <div class="og-site">academy.com</div>
      <div class="og-title" id="og-title">Навчання веб-розробки з нуля | Academy</div>
      <div class="og-desc" id="og-desc">Освоюй HTML, CSS і JavaScript з нуля до рівня Junior.</div>
    </div>
  </div>

  <h3>Згенерований HTML</h3>
  <pre id="seo-output" class="seo-out"></pre>
</div>`,
    `${BASE}
.seo-gen{max-width:540px}
.seo-inputs{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}
.si-field label{display:flex;justify-content:space-between;font-size:12px;color:#64748b;margin-bottom:5px}
.counter{font-variant-numeric:tabular-nums;font-size:11px}
.si-field input,.si-field textarea{width:100%;margin:0;resize:vertical}
.counter.warn{color:#facc15}.counter.err{color:#f87171}

.google-preview{background:#fff;border-radius:10px;padding:14px 16px;margin-bottom:14px}
.gp-url{font-size:12px;color:#1a0dab;margin-bottom:2px;font-family:arial,sans-serif}
.gp-title{font-size:18px;color:#1a0dab;font-family:arial,sans-serif;margin-bottom:4px;cursor:pointer}
.gp-title:hover{text-decoration:underline}
.gp-desc{font-size:13px;color:#4d5156;font-family:arial,sans-serif;line-height:1.5}

.og-card{background:#1e293b;border-radius:10px;overflow:hidden;display:flex;margin-bottom:14px;border:1px solid #334155}
.og-img{width:120px;min-height:90px;background:linear-gradient(135deg,#1d4ed8,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:40px;flex-shrink:0}
.og-body{padding:12px;flex:1}
.og-site{font-size:11px;color:#64748b;text-transform:uppercase;margin-bottom:4px}
.og-title{font-size:14px;font-weight:700;color:#f1f5f9;margin-bottom:4px;line-height:1.3}
.og-desc{font-size:12px;color:#94a3b8;line-height:1.5}

.seo-out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:14px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.8;overflow-x:auto;white-space:pre;max-height:200px;overflow-y:auto}`,
    `function updateSeo() {
  const title = document.getElementById('si-title').value;
  const desc  = document.getElementById('si-desc').value;
  const url   = document.getElementById('si-url').value;

  // Лічильники
  const c = (id, val, ok, warn) => {
    const el = document.getElementById(id);
    el.textContent = val.length + '/' + ok;
    el.className = 'counter' + (val.length > ok ? ' err' : val.length > warn ? ' warn' : '');
  };
  c('c-title', title, 60, 50);
  c('c-desc',  desc,  160, 120);

  // Google preview
  try {
    const u = new URL(url);
    document.getElementById('gp-url').textContent = u.hostname + u.pathname.replace(/\/$/, '').replace(/\//g,' › ');
  } catch(e) {}
  document.getElementById('gp-title').textContent = title.slice(0,60) + (title.length>60?'...':'');
  document.getElementById('gp-desc').textContent  = desc.slice(0,160) + (desc.length>160?'...':'');

  // OG card
  document.getElementById('og-title').textContent = title;
  document.getElementById('og-desc').textContent  = desc.slice(0,100) + (desc.length>100?'...':'');

  // HTML output
  const img = document.getElementById('si-img').value;
  document.getElementById('seo-output').textContent =
'<title>' + title + '</title>\n' +
'<meta name="description" content="' + desc.replace(/"/g,'&quot;') + '">\n' +
'<link rel="canonical" href="' + url + '">\n' +
'<meta name="robots" content="index, follow">\n' +
'\n<!-- Open Graph -->\n' +
'<meta property="og:title"       content="' + title + '">\n' +
'<meta property="og:description" content="' + desc.slice(0,200).replace(/"/g,'&quot;') + '">\n' +
'<meta property="og:image"       content="' + img + '">\n' +
'<meta property="og:url"         content="' + url + '">\n' +
'<meta property="og:type"        content="website">\n' +
'\n<!-- Twitter Card -->\n' +
'<meta name="twitter:card"  content="summary_large_image">\n' +
'<meta name="twitter:title" content="' + title + '">';
}
updateSeo();`,
    [
      { level:'easy',   uk:'Зміни Title і Description — поспостерігай як оновлюється прев\'ю Google і OG-картка.',  ru:'Измени Title и Description — понаблюдай как обновляется превью Google и OG-карточка.' },
      { level:'medium', uk:'Скороти Title до 70+ символів — лічильник покраснів. Чому Google обрізає довгі title?',  ru:'Укороти Title до 70+ символов — счётчик покраснел. Почему Google обрезает длинные title?' },
      { level:'hard',   uk:'Додай поле "og:type" з select (website, article, product) — він повинен оновлювати відповідний рядок у #seo-output.',  ru:'Добавь поле "og:type" с select (website, article, product) — он должен обновлять соответствующую строку в #seo-output.' },
    ]
  );

  /* ─── 01-06 ──────────────────────────────────────────────── */
  patch('01-06',
    { uk:`<h2>Accessibility: ARIA атрибути</h2>
<p>Accessibility (a11y) — доступність для людей з вадами зору, слуху або моторики. В Україні та ЄС — юридична вимога для держсайтів.</p>
<h3>Ключові ARIA атрибути</h3>
<pre>role="..."          // роль елемента (button, dialog, alert...)
aria-label="..."    // текстова мітка (для кнопок без тексту)
aria-labelledby="id"// мітка посилається на інший елемент
aria-describedby="id"// детальний опис
aria-expanded="true/false" // відкрито/закрито (меню, акордіон)
aria-hidden="true"  // приховати від screen-reader
aria-live="polite"  // оголошувати зміни (чат, статус)
aria-disabled="true"// вимкнений стан
tabindex="0"        // елемент у фокус-порядку
tabindex="-1"       // тільки через JS focus()</pre>
<h3>Семантика перш за все</h3>
<ul>
  <li>✅ Використовуй нативні теги: <code>&lt;button&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;input&gt;</code></li>
  <li>❌ Не роби кнопку з <code>&lt;div onclick&gt;</code> — screen-reader її не помітить</li>
  <li>Якщо нативного тега немає — додай role=""</li>
</ul>
<h3>Перевірка</h3>
<ul>
  <li>Chrome: F12 → Elements → Accessibility panel</li>
  <li>Tab-навігація: вся функціональність через клавіатуру</li>
  <li>Lighthouse: Accessibility score</li>
</ul>`,
      ru:`<h2>Accessibility: ARIA атрибуты</h2>
<pre>role="..."          // роль элемента
aria-label="..."    // текстовая метка
aria-expanded="true/false"
aria-hidden="true"  // скрыть от screen-reader
aria-live="polite"  // объявлять изменения
tabindex="0"        // элемент в фокус-порядке</pre>
<h3>Правило</h3>
<ul>
  <li>✅ Используй нативные теги: &lt;button&gt;, &lt;a&gt;, &lt;input&gt;</li>
  <li>❌ Не делай кнопку из &lt;div onclick&gt;</li>
</ul>` },
    `<div class="a11y-lab">
  <h2>♿ Accessibility Lab</h2>

  <!-- Таб для навігації з клавіатури -->
  <div class="a11y-section">
    <h3>Tab-навігація та focus</h3>
    <p>Натискай Tab щоб переходити між елементами. Всі інтерактивні елементи мають бути досяжні з клавіатури.</p>
    <div class="focus-demo">
      <button>Кнопка 1</button>
      <a href="#" onclick="return false">Посилання</a>
      <input type="text" placeholder="Поле вводу">
      <!-- ❌ Недоступна "кнопка" -->
      <div class="fake-btn" onclick="alert('Натиснуто')">div-кнопка (не доступна!)</div>
      <!-- ✅ Виправлена версія -->
      <div class="fake-btn-fixed" role="button" tabindex="0"
        onclick="fixedClick()" onkeydown="if(event.key==='Enter'||event.key===' ')fixedClick()">
        div з role="button" ✅
      </div>
      <button>Кнопка 2</button>
    </div>
  </div>

  <!-- ARIA live region -->
  <div class="a11y-section">
    <h3>aria-live: оголошення змін</h3>
    <div aria-live="polite" aria-atomic="true" class="live-region" id="live-region">
      Очікування...
    </div>
    <div class="live-btns">
      <button onclick="announce('✅ Документ збережено')">Зберегти</button>
      <button onclick="announce('❌ Помилка мережі')">Помилка</button>
      <button onclick="announce('📧 Нове повідомлення від Антона')">Повідомлення</button>
    </div>
  </div>

  <!-- Contrast checker -->
  <div class="a11y-section">
    <h3>Контраст тексту: мін. 4.5:1 (WCAG AA)</h3>
    <div class="contrast-demo">
      <div class="cc-row">
        <input type="color" id="cc-bg" value="#1e293b">
        <label>Фон</label>
        <input type="color" id="cc-fg" value="#f1f5f9">
        <label>Текст</label>
        <div class="cc-preview" id="cc-preview">Зразок тексту</div>
        <div class="cc-ratio" id="cc-ratio">—</div>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.a11y-lab{max-width:540px}
.a11y-section{background:#1e293b;border-radius:12px;padding:16px;margin-bottom:14px}
.a11y-section h3{font-size:12px;text-transform:uppercase;color:#3b82f6;margin-bottom:8px}
.a11y-section p{font-size:12px;color:#64748b;margin-bottom:10px}
.focus-demo{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.focus-demo button{padding:8px 14px;font-size:12px}
.focus-demo a{color:#60a5fa;font-size:13px;padding:8px 10px;border-radius:6px;text-decoration:none}
.focus-demo input{width:140px;padding:8px 10px;font-size:12px;margin:0}
*:focus{outline:2px solid #3b82f6;outline-offset:2px}
.fake-btn{background:#334155;border-radius:6px;padding:8px 14px;font-size:12px;color:#94a3b8;cursor:pointer}
.fake-btn-fixed{background:rgba(59,130,246,.15);border:1px solid #3b82f6;border-radius:6px;padding:8px 14px;font-size:12px;color:#93c5fd;cursor:pointer}
.fake-btn-fixed:focus{outline:2px solid #3b82f6}

.live-region{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px 14px;font-size:13px;color:#94a3b8;margin-bottom:10px;min-height:40px}
.live-btns{display:flex;gap:8px;flex-wrap:wrap}

.cc-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.cc-row input[type=color]{height:38px;width:50px;cursor:pointer;padding:2px;border-radius:6px;border:1px solid #334155;background:transparent}
.cc-row label{font-size:12px;color:#64748b}
.cc-preview{padding:8px 16px;border-radius:8px;font-size:14px;font-weight:600;background:#1e293b;color:#f1f5f9;transition:.3s}
.cc-ratio{font-size:14px;font-weight:700;min-width:60px;text-align:center}`,
    `function announce(msg) {
  const r = document.getElementById('live-region');
  r.textContent = msg;
  // Скинути через 3с
  setTimeout(() => r.textContent = 'Очікування...', 3000);
}

function fixedClick() { alert('div-кнопка з role=button спрацювала! Доступна і для клавіатури.'); }

// Contrast ratio
function luminance(r,g,b) {
  const [R,G,B] = [r,g,b].map(v => {
    v /= 255;
    return v <= 0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  });
  return 0.2126*R + 0.7152*G + 0.0722*B;
}
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return {r,g,b};
}
function updateContrast() {
  const bg = document.getElementById('cc-bg').value;
  const fg = document.getElementById('cc-fg').value;
  const bgRgb = hexToRgb(bg), fgRgb = hexToRgb(fg);
  const L1 = luminance(fgRgb.r,fgRgb.g,fgRgb.b);
  const L2 = luminance(bgRgb.r,bgRgb.g,bgRgb.b);
  const ratio = (Math.max(L1,L2)+0.05) / (Math.min(L1,L2)+0.05);
  const prev = document.getElementById('cc-preview');
  const ratEl = document.getElementById('cc-ratio');
  prev.style.background = bg; prev.style.color = fg;
  const r = ratio.toFixed(2);
  const ok = ratio >= 4.5;
  ratEl.textContent = r + ':1 ' + (ok ? '✅' : '❌');
  ratEl.style.color = ok ? '#4ade80' : '#f87171';
}
['cc-bg','cc-fg'].forEach(id => document.getElementById(id).addEventListener('input', updateContrast));
updateContrast();`,
    [
      { level:'easy',   uk:'Натискай Tab — поспостерігай порядок фокусу. div-кнопка пропускається — чому?',  ru:'Нажимай Tab — наблюдай порядок фокуса. div-кнопка пропускается — почему?' },
      { level:'medium', uk:'Підбери кольори з контрастом ≥4.5:1 (WCAG AA). Перевір білий текст на синьому #1d4ed8.',  ru:'Подбери цвета с контрастом ≥4.5:1 (WCAG AA). Проверь белый текст на синем #1d4ed8.' },
      { level:'hard',   uk:'Додай до .fake-btn атрибути role="button", tabindex="0" і обробник onkeydown для Enter/Space — виправ її доступність.',  ru:'Добавь к .fake-btn атрибуты role="button", tabindex="0" и обработчик onkeydown для Enter/Space — исправь её доступность.' },
    ]
  );

  /* ─── 01-07 ──────────────────────────────────────────────── */
  patch('01-07',
    { uk:`<h2>SVG вбудований у HTML</h2>
<p>SVG (Scalable Vector Graphics) — векторний формат зображень. Вбудований у HTML він масштабується без втрат якості і керується через CSS/JS.</p>
<h3>Основні елементи</h3>
<pre>&lt;svg viewBox="0 0 100 100" width="200"&gt;
  &lt;circle cx="50" cy="50" r="40" fill="#3b82f6"/&gt;
  &lt;rect x="10" y="10" width="80" height="30" rx="5" fill="none" stroke="#fff"/&gt;
  &lt;path d="M 10 50 Q 50 10 90 50 T 90 90" fill="none" stroke="#f59e0b"/&gt;
  &lt;text x="50" y="55" text-anchor="middle" fill="#fff"&gt;SVG&lt;/text&gt;
  &lt;line x1="0" y1="0" x2="100" y2="100" stroke="#94a3b8"/&gt;
  &lt;polygon points="50,10 90,90 10,90" fill="rgba(99,102,241,.5)"/&gt;
&lt;/svg&gt;</pre>
<h3>&lt;use&gt; та &lt;defs&gt; — перевикористання</h3>
<pre>&lt;svg&gt;
  &lt;defs&gt;
    &lt;circle id="dot" cx="0" cy="0" r="5" fill="#3b82f6"/&gt;
  &lt;/defs&gt;
  &lt;use href="#dot" x="20" y="20"/&gt;
  &lt;use href="#dot" x="50" y="50"/&gt;
&lt;/svg&gt;</pre>
<h3>CSS анімація SVG</h3>
<pre>circle { animation: pulse 1s ease-in-out infinite; }
@keyframes pulse { 50% { r: 50; opacity: .5; } }</pre>`,
      ru:`<h2>SVG встроенный в HTML</h2>
<pre>&lt;svg viewBox="0 0 100 100" width="200"&gt;
  &lt;circle cx="50" cy="50" r="40" fill="#3b82f6"/&gt;
  &lt;rect x="10" y="10" width="80" height="30" rx="5"/&gt;
  &lt;path d="M 10 50 Q 50 10 90 50" fill="none" stroke="#f59e0b"/&gt;
  &lt;text x="50" y="55" text-anchor="middle"&gt;SVG&lt;/text&gt;
&lt;/svg&gt;</pre>
<h3>&lt;use&gt; и &lt;defs&gt;</h3>
<pre>&lt;defs&gt;&lt;circle id="dot" r="5"/&gt;&lt;/defs&gt;
&lt;use href="#dot" x="20" y="20"/&gt;</pre>` },
    `<div class="svg-lab">
  <h2>🎨 SVG Конструктор</h2>

  <svg id="main-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="200" fill="#0f172a"/>
    <!-- Сітка -->
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="300" height="200" fill="url(#grid)"/>

    <!-- Фігури -->
    <circle id="sv-circle" cx="80" cy="100" r="45" fill="#3b82f6" opacity="0.8"/>
    <rect id="sv-rect" x="150" y="60" width="80" height="80" rx="12" fill="#7c3aed" opacity="0.8"/>
    <polygon id="sv-poly" points="240,50 280,140 200,140" fill="#f59e0b" opacity="0.8"/>
    <path id="sv-path" d="M 20 150 Q 80 80 140 150 T 280 150" fill="none" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
    <text x="150" y="190" text-anchor="middle" fill="#64748b" font-size="10" font-family="monospace">SVG viewBox="0 0 300 200"</text>
  </svg>

  <div class="svg-controls">
    <div class="sc-group">
      <label>Circle fill</label>
      <input type="color" id="c-color" value="#3b82f6" oninput="document.getElementById('sv-circle').setAttribute('fill',this.value)">
    </div>
    <div class="sc-group">
      <label>Circle r <span id="c-r-val">45</span></label>
      <input type="range" id="c-radius" min="5" max="90" value="45" oninput="updateCircle(this.value)">
    </div>
    <div class="sc-group">
      <label>Rect rx <span id="r-rx-val">12</span></label>
      <input type="range" id="r-rx" min="0" max="40" value="12" oninput="updateRect(this.value)">
    </div>
    <div class="sc-group">
      <label>Path color</label>
      <input type="color" id="p-color" value="#4ade80" oninput="document.getElementById('sv-path').setAttribute('stroke',this.value)">
    </div>
    <button onclick="animateAll()">▶ Анімувати</button>
  </div>

  <div class="svg-code">
    <h3>Поточний SVG-код</h3>
    <pre id="svg-code-out"></pre>
  </div>
</div>`,
    `${BASE}
.svg-lab{max-width:540px}
#main-svg{width:100%;border-radius:12px;border:1px solid #1e293b;margin-bottom:12px;display:block}
.svg-controls{display:flex;flex-wrap:wrap;gap:12px;background:#1e293b;border-radius:10px;padding:14px;margin-bottom:12px}
.sc-group{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#64748b}
.sc-group label{display:flex;justify-content:space-between;min-width:90px}
.sc-group input[type=color]{width:50px;height:32px;border-radius:6px;padding:2px;border:1px solid #334155;cursor:pointer;background:transparent}
.sc-group input[type=range]{width:120px;accent-color:#3b82f6;cursor:pointer}
.svg-code h3{font-size:11px;text-transform:uppercase;color:#334155;margin-bottom:6px}
#svg-code-out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:12px;font-size:11px;color:#94a3b8;font-family:monospace;line-height:1.6;overflow-x:auto;white-space:pre;max-height:120px;overflow-y:auto}`,
    `function updateCircle(v) {
  document.getElementById('sv-circle').setAttribute('r', v);
  document.getElementById('c-r-val').textContent = v;
  // cx зміщуємо щоб не вилазив
  const cx = Math.max(Number(v)+5, Math.min(295-v, 80));
  document.getElementById('sv-circle').setAttribute('cx', cx);
  updateCode();
}

function updateRect(v) {
  document.getElementById('sv-rect').setAttribute('rx', v);
  document.getElementById('r-rx-val').textContent = v;
  updateCode();
}

function animateAll() {
  const c = document.getElementById('sv-circle');
  const r = document.getElementById('sv-rect');
  const p = document.getElementById('sv-poly');
  c.style.animation = 'none';
  r.style.animation = 'none';
  p.style.animation = 'none';
  requestAnimationFrame(() => {
    c.style.animation = 'svc .8s ease-in-out 3';
    r.style.animation = 'svr .8s ease-in-out 3 .2s';
    p.style.animation = 'svp .8s ease-in-out 3 .4s';
  });
}

function updateCode() {
  const svg = document.getElementById('main-svg');
  const kids = Array.from(svg.children).filter(el=>el.id.startsWith('sv-'));
  document.getElementById('svg-code-out').textContent =
    kids.map(el => el.outerHTML.replace(/\s+/g,' ')).join('\n');
}

const style = document.createElement('style');
style.textContent = '\n  @keyframes svc { 50% { transform: scale(1.2); transform-origin: 80px 100px; opacity: .5; } }\n  @keyframes svr { 50% { transform: rotate(20deg); transform-origin: 190px 100px; opacity: .5; } }\n  @keyframes svp { 50% { transform: translateY(-20px); opacity: .5; } }\n';
document.head.appendChild(style);
updateCode();`,
    [
      { level:'easy',   uk:'Рухай повзунки і змінюй кольори — SVG оновлюється в реальному часі.',  ru:'Двигай ползунки и меняй цвета — SVG обновляется в реальном времени.' },
      { level:'medium', uk:'Натисни "Анімувати" і вивчи @keyframes у коді. Змін кількість ітерацій з 3 на infinite.',  ru:'Нажми "Анімувати" и изучи @keyframes в коде. Измени количество итераций с 3 на infinite.' },
      { level:'hard',   uk:'Додай новий &lt;text&gt; елемент у SVG з власним підписом. Зроби так щоб він теж оновлювався через JS.',  ru:'Добавь новый &lt;text&gt; элемент в SVG с собственной подписью. Сделай так чтобы он тоже обновлялся через JS.' },
    ]
  );

  /* ─── 01-08 ──────────────────────────────────────────────── */
  patch('01-08',
    { uk:`<h2>Iframe, embed та вбудований контент</h2>
<p>Iframe дозволяє вбудувати іншу сторінку або застосунок. Але з безпекою треба бути обережним.</p>
<h3>Атрибут sandbox — обмеження</h3>
<pre>&lt;iframe sandbox="allow-scripts allow-forms"
        src="https://example.com"
        loading="lazy"&gt;&lt;/iframe&gt;</pre>
<p>Без sandbox — iframe довіряє батьківській сторінці. Значення sandbox:</p>
<ul>
  <li><code>allow-scripts</code> — дозволяє JavaScript у фреймі</li>
  <li><code>allow-forms</code> — дозволяє відправку форм</li>
  <li><code>allow-same-origin</code> — дозволяє доступ до cookie/localStorage</li>
  <li><code>allow-popups</code> — дозволяє нові вікна</li>
</ul>
<h3>allow — дозвіл на браузерні API</h3>
<pre>&lt;iframe allow="camera; microphone; geolocation"&gt;</pre>
<h3>postMessage — безпечна комунікація</h3>
<pre>// Батько → фрейм:
iframe.contentWindow.postMessage({ type:'hello', data:'...' }, '*');

// Фрейм слухає:
window.addEventListener('message', e => {
  if(e.origin !== 'https://trusted.com') return; // перевірка!
  console.log(e.data);
});</pre>
<h3>Коли НЕ використовувати iframe</h3>
<ul>
  <li>❌ Для вбудовування сторінок вашого ж сайту — використовуй components</li>
  <li>✅ Для Google Maps, YouTube embed, сторонніх форм</li>
</ul>`,
      ru:`<h2>Iframe, embed и встроенный контент</h2>
<pre>&lt;iframe sandbox="allow-scripts allow-forms"
        src="https://example.com"
        loading="lazy"&gt;&lt;/iframe&gt;</pre>
<h3>postMessage — безопасная коммуникация</h3>
<pre>// Родитель → фрейм:
iframe.contentWindow.postMessage({ type:'hello' }, '*');

// Фрейм слушает:
window.addEventListener('message', e => {
  if(e.origin !== 'https://trusted.com') return;
  console.log(e.data);
});</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"><title>Iframe Lab</title><link rel="stylesheet" href="style.css"></head>
<body>
<div class="iframe-lab">
  <h2>🖼 Iframe та postMessage</h2>

  <!-- Симулятор: батько і фрейм у одному вікні -->
  <div class="pm-demo">
    <div class="pm-parent">
      <div class="pm-title">👆 Батьківська сторінка</div>
      <div class="pm-controls">
        <input type="text" id="pm-msg" value="Привіт, фрейме!" placeholder="Повідомлення...">
        <button onclick="sendToFrame()">Надіслати →</button>
        <select id="pm-type">
          <option value="msg">msg</option>
          <option value="theme">theme</option>
          <option value="data">data</option>
        </select>
      </div>
      <div class="pm-log" id="pm-log-parent">
        <div class="log-item recv">← отримано від фрейму</div>
      </div>
    </div>

    <iframe id="child-frame" sandbox="allow-scripts" srcdoc="" title="Child frame"></iframe>

    <div class="pm-child">
      <div class="pm-title">📦 Фрейм (child)</div>
      <div class="pm-log" id="pm-log-child">
        <div class="log-item recv">← отримано від батька</div>
      </div>
      <button onclick="sendToParent()">Reply →</button>
    </div>
  </div>

  <!-- sandbox демо -->
  <div class="sandbox-demo">
    <h3>sandbox атрибути</h3>
    <div class="sb-opts">
      <label><input type="checkbox" id="sb-scripts" checked> allow-scripts</label>
      <label><input type="checkbox" id="sb-forms"> allow-forms</label>
      <label><input type="checkbox" id="sb-origin"> allow-same-origin</label>
    </div>
    <div class="sb-result" id="sb-result">
      <code>sandbox="allow-scripts"</code>
    </div>
  </div>
</div>
<script src="script.js"></script>
</body>
</html>`,
    `${BASE}
.iframe-lab{max-width:560px}
.pm-demo{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;margin-bottom:16px;align-items:start}
.pm-parent,.pm-child{background:#1e293b;border-radius:10px;padding:12px;border:1px solid #334155}
.pm-title{font-size:11px;text-transform:uppercase;color:#3b82f6;letter-spacing:.5px;margin-bottom:8px;font-weight:700}
.pm-controls{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap}
.pm-controls input{flex:1;margin:0;padding:7px 10px;font-size:12px}
.pm-controls button{padding:7px 12px;font-size:12px;white-space:nowrap}
.pm-controls select{padding:6px;border:1px solid #334155;border-radius:6px;background:#0f172a;color:#f1f5f9;font-size:12px;cursor:pointer}
.pm-log{background:#0f172a;border-radius:8px;padding:8px;min-height:60px;font-size:11px;font-family:monospace;display:flex;flex-direction:column;gap:4px}
.log-item{padding:3px 6px;border-radius:4px;color:#94a3b8;border-left:2px solid #334155}
.log-item.sent{color:#7dd3fc;border-left-color:#3b82f6}
.log-item.recv{color:#86efac;border-left-color:#22c55e}
#child-frame{width:0;height:0;border:none;overflow:hidden}
.pm-child button{margin-top:8px;padding:6px 12px;font-size:11px;width:100%}

.sandbox-demo{background:#1e293b;border-radius:12px;padding:14px}
.sandbox-demo h3{font-size:12px;text-transform:uppercase;color:#64748b;margin-bottom:10px}
.sb-opts{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px}
.sb-opts label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;color:#94a3b8}
.sb-opts input[type=checkbox]{accent-color:#3b82f6;cursor:pointer}
.sb-result{background:#0f172a;border-radius:8px;padding:10px;font-size:12px;font-family:monospace;color:#7dd3fc}`,
    `// postMessage демо (обидві "сторони" у одному вікні)
const msgLog  = document.getElementById('pm-log-parent');
const childLog = document.getElementById('pm-log-child');
let msgCount = 0;

function addLog(el, text, type) {
  const d = document.createElement('div');
  d.className = 'log-item ' + type;
  d.textContent = text;
  el.appendChild(d);
  el.scrollTop = el.scrollHeight;
}

function sendToFrame() {
  const msg  = document.getElementById('pm-msg').value;
  const type = document.getElementById('pm-type').value;
  const data = { type, payload: msg, id: ++msgCount };
  addLog(msgLog, '→ sent: ' + JSON.stringify(data), 'sent');
  // Симулюємо отримання у "фреймі"
  setTimeout(() => {
    addLog(childLog, '← recv: ' + JSON.stringify(data), 'recv');
  }, 150);
}

function sendToParent() {
  const reply = { type:'reply', payload:'Отримано!', ts: Date.now() };
  addLog(childLog, '→ sent: ' + JSON.stringify(reply), 'sent');
  setTimeout(() => {
    addLog(msgLog, '← recv: ' + JSON.stringify(reply), 'recv');
  }, 150);
}

// sandbox builder
document.querySelectorAll('.sb-opts input').forEach(cb => {
  cb.addEventListener('change', updateSandbox);
});

function updateSandbox() {
  const vals = [];
  if(document.getElementById('sb-scripts').checked) vals.push('allow-scripts');
  if(document.getElementById('sb-forms').checked)   vals.push('allow-forms');
  if(document.getElementById('sb-origin').checked)  vals.push('allow-same-origin');
  const attr = vals.length ? 'sandbox="' + vals.join(' ') + '"' : 'sandbox=""  ← нічого не дозволено!';
  document.getElementById('sb-result').innerHTML = '<code>' + attr + '</code>';
}`,
    [
      { level:'easy',   uk:'Натисни "Надіслати →" кілька разів — поспостерігай за логами у батьківській панелі та фреймі.',  ru:'Нажми "Надіслати →" несколько раз — понаблюдай за логами в родительской панели и фрейме.' },
      { level:'medium', uk:'Зніми всі чекбокси sandbox — що виводиться? Поясни чому порожній sandbox є найбезпечнішим варіантом.',  ru:'Сними все чекбоксы sandbox — что выводится? Объясни почему пустой sandbox — самый безопасный вариант.' },
      { level:'hard',   uk:'Зміни тип на "theme" і додай обробку: якщо type==="theme", то змінюй body.style.background на payload.',  ru:'Измени тип на "theme" и добавь обработку: если type==="theme", то меняй body.style.background на payload.' },
    ]
  );

  /* ─── 01-09 ──────────────────────────────────────────────── */
  patch('01-09',
    { uk:`<h2>Web Manifest та PWA-основи</h2>
<p>PWA (Progressive Web App) — сайт, що ведеться себе як нативний застосунок: встановлюється на екран, працює offline, отримує повідомлення.</p>
<h3>manifest.json — серце PWA</h3>
<pre>{
  "name": "Мій Застосунок",
  "short_name": "МійАпп",
  "start_url": "/",
  "display": "standalone",  // standalone | fullscreen | minimal-ui
  "background_color": "#0f172a",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "description": "Опис застосунку",
  "lang": "uk",
  "orientation": "portrait-primary"
}</pre>
<h3>Підключення у HTML</h3>
<pre>&lt;link rel="manifest" href="/manifest.json"&gt;
&lt;meta name="theme-color" content="#3b82f6"&gt;</pre>
<h3>Service Worker (базово)</h3>
<pre>// Реєстрація у main JS:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js — кешування:
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) || fetch(event.request)
  );
});</pre>
<h3>Вимоги для "Install" кнопки</h3>
<ul>
  <li>✅ HTTPS або localhost</li>
  <li>✅ manifest.json з name, icons, start_url</li>
  <li>✅ Зареєстрований Service Worker</li>
</ul>`,
      ru:`<h2>Web Manifest и PWA-основы</h2>
<pre>{
  "name": "Мой Приложение",
  "short_name": "МойАпп",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192" }
  ]
}</pre>
<h3>Service Worker (базово)</h3>
<pre>if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
// sw.js:
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request)||fetch(e.request));
});</pre>` },
    `<div class="pwa-gen">
  <h2>📱 PWA Manifest Генератор</h2>

  <div class="pwa-form">
    <div class="pf-row">
      <div class="pf-field">
        <label>App Name</label>
        <input type="text" id="pf-name" value="Мій Веб-Застосунок" oninput="updateManifest()">
      </div>
      <div class="pf-field">
        <label>Short Name (≤12 символів)</label>
        <input type="text" id="pf-short" value="МійАпп" maxlength="12" oninput="updateManifest()">
      </div>
    </div>
    <div class="pf-row">
      <div class="pf-field">
        <label>Theme Color</label>
        <input type="color" id="pf-theme" value="#3b82f6" oninput="updateManifest()">
      </div>
      <div class="pf-field">
        <label>Background Color</label>
        <input type="color" id="pf-bg" value="#0f172a" oninput="updateManifest()">
      </div>
      <div class="pf-field">
        <label>Display mode</label>
        <select id="pf-display" onchange="updateManifest()">
          <option value="standalone">standalone</option>
          <option value="fullscreen">fullscreen</option>
          <option value="minimal-ui">minimal-ui</option>
          <option value="browser">browser</option>
        </select>
      </div>
    </div>
  </div>

  <div class="pwa-preview">
    <div class="pp-phone" id="pp-phone">
      <div class="pp-status" id="pp-status"></div>
      <div class="pp-screen" id="pp-screen">
        <div class="pp-app-header" id="pp-header">
          <span id="pp-app-name">Мій Веб-Застосунок</span>
        </div>
        <div class="pp-content">Контент застосунку</div>
      </div>
      <div class="pp-icon-label" id="pp-icon-label">МійАпп</div>
    </div>

    <div class="manifest-out">
      <h3>manifest.json</h3>
      <pre id="manifest-code"></pre>
    </div>
  </div>

  <div class="sw-snippet">
    <h3>Реєстрація Service Worker (main.js)</h3>
    <pre>if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg  => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW error:', err));
  });
}</pre>
  </div>
</div>`,
    `${BASE}
.pwa-gen{max-width:560px}
.pwa-form{background:#1e293b;border-radius:12px;padding:14px;margin-bottom:14px}
.pf-row{display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap}
.pf-field{flex:1;min-width:130px}
.pf-field label{display:block;font-size:12px;color:#64748b;margin-bottom:5px}
.pf-field input[type=text],.pf-field select{width:100%;margin:0;padding:8px 10px;font-size:13px}
.pf-field input[type=color]{width:50px;height:36px;border-radius:6px;padding:2px;border:1px solid #334155;cursor:pointer;background:transparent}
.pwa-preview{display:flex;gap:14px;align-items:flex-start;margin-bottom:14px;flex-wrap:wrap}
.pp-phone{width:120px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:4px}
.pp-status{height:8px;width:100%;border-radius:6px 6px 0 0;background:#3b82f6;transition:.3s}
.pp-screen{width:120px;height:180px;border-radius:0 0 12px 12px;overflow:hidden;background:#0f172a;border:2px solid #334155;border-top:none;display:flex;flex-direction:column}
.pp-app-header{padding:8px 10px;font-size:11px;font-weight:700;color:#fff;background:#3b82f6;transition:.3s}
.pp-content{flex:1;display:flex;align-items:center;justify-content:center;font-size:10px;color:#475569}
.pp-icon-label{font-size:11px;color:#94a3b8;margin-top:2px}
.manifest-out{flex:1;min-width:0}
.manifest-out h3{font-size:12px;color:#64748b;text-transform:uppercase;margin-bottom:6px}
#manifest-code{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:12px;font-size:11px;color:#7dd3fc;font-family:monospace;line-height:1.7;overflow-x:auto;white-space:pre;max-height:200px;overflow-y:auto}
.sw-snippet h3{font-size:12px;color:#64748b;text-transform:uppercase;margin-bottom:6px}
.sw-snippet pre{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:12px;font-size:11px;color:#94a3b8;font-family:monospace;line-height:1.6;overflow-x:auto}`,
    `function updateManifest() {
  const name    = document.getElementById('pf-name').value;
  const short   = document.getElementById('pf-short').value;
  const theme   = document.getElementById('pf-theme').value;
  const bg      = document.getElementById('pf-bg').value;
  const display = document.getElementById('pf-display').value;

  // Оновити телефон preview
  document.getElementById('pp-status').style.background = theme;
  document.getElementById('pp-header').style.background = theme;
  document.getElementById('pp-app-name').textContent = name;
  document.getElementById('pp-screen').style.background = bg;
  document.getElementById('pp-icon-label').textContent = short;

  const manifest = {
    name, short_name: short,
    start_url: '/',
    display,
    background_color: bg,
    theme_color: theme,
    lang: 'uk',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ],
    description: name + ' — Progressive Web App'
  };
  document.getElementById('manifest-code').textContent = JSON.stringify(manifest, null, 2);
}
updateManifest();`,
    [
      { level:'easy',   uk:'Зміни Theme Color і поспостерігай як оновлюється статус-бар у прев\'ю телефону.',  ru:'Измени Theme Color и понаблюдай как обновляется статус-бар в превью телефона.' },
      { level:'medium', uk:'Встанови display: "fullscreen" — в чому різниця від standalone? Де зникає адресний рядок браузера?',  ru:'Установи display: "fullscreen" — в чём разница от standalone? Где исчезает адресная строка браузера?' },
      { level:'hard',   uk:'Додай поле "orientation" з select (portrait-primary, landscape-primary, any) та включи його у JSON.',  ru:'Добавь поле "orientation" с select (portrait-primary, landscape-primary, any) и включи его в JSON.' },
    ]
  );

  /* ─── 01-10 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('01-10',
    { uk:`<h2>ПРОЕКТ: Семантична сторінка новини</h2>
<p>Побудуй повноцінну семантичну HTML5-сторінку статті/новини зі всіма вивченими елементами.</p>
<h3>Що повинно бути на сторінці</h3>
<ul>
  <li><code>&lt;header&gt;</code> — назва видання, логотип (SVG), навігація</li>
  <li><code>&lt;main&gt;</code> → <code>&lt;article&gt;</code> з:
    <ul>
      <li><code>&lt;header&gt;</code>: h1, time (datetime), автор</li>
      <li>Зображення у <code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code></li>
      <li>Мінімум 2 <code>&lt;section&gt;</code> з підзаголовками</li>
      <li>Цитата у <code>&lt;blockquote&gt;</code></li>
    </ul>
  </li>
  <li><code>&lt;aside&gt;</code> — "Читайте також" зі списком</li>
  <li><code>&lt;footer&gt;</code> — копірайт, дата</li>
</ul>
<h3>SEO-вимоги</h3>
<ul>
  <li>&lt;title&gt; — описовий (50-60 символів)</li>
  <li>&lt;meta name="description"&gt; — 120-160 символів</li>
  <li>5 og:-тегів (title, description, image, url, type)</li>
</ul>
<h3>Accessibility</h3>
<ul>
  <li>Всі зображення мають alt=""</li>
  <li>Іконки кнопок мають aria-label=""</li>
  <li>Сторінка повністю прохідна Tab-навігацією</li>
  <li>lang="uk" на &lt;html&gt;</li>
</ul>`,
      ru:`<h2>ПРОЕКТ: Семантическая страница новости</h2>
<h3>Что должно быть</h3>
<ul>
  <li>&lt;header&gt; — название издания, SVG-логотип, навигация</li>
  <li>&lt;main&gt; → &lt;article&gt;: h1, time, автор, figure, 2 section, blockquote</li>
  <li>&lt;aside&gt; — "Читайте также"</li>
  <li>&lt;footer&gt; — копирайт</li>
</ul>
<h3>SEO</h3>
<ul>
  <li>&lt;title&gt; 50-60 символов</li>
  <li>&lt;meta name="description"&gt; 120-160 символов</li>
  <li>5 og:-тегов</li>
</ul>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tesla встановила рекорд пробігу 800 км | TechNews UA</title>
  <meta name="description" content="Електромобіль Tesla Model S Plaid встановив рекорд: 800 км на одному заряді. Детальний огляд досягнення та технологій.">
  <link rel="canonical" href="https://technews.ua/tesla-record-800km">
  <meta property="og:title"       content="Tesla встановила рекорд пробігу 800 км">
  <meta property="og:description" content="Tesla Model S Plaid — новий рекорд пробігу.">
  <meta property="og:image"       content="https://technews.ua/img/tesla-record.jpg">
  <meta property="og:url"         content="https://technews.ua/tesla-record-800km">
  <meta property="og:type"        content="article">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="/" class="logo" aria-label="TechNews UA — головна">
        <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden="true">
          <circle cx="20" cy="20" r="18" fill="#3b82f6"/>
          <text x="20" y="26" text-anchor="middle" fill="#fff" font-size="16" font-family="Arial" font-weight="bold">T</text>
        </svg>
        <span>TechNews UA</span>
      </a>
      <nav aria-label="Головна навігація">
        <a href="#">Технології</a>
        <a href="#">Авто</a>
        <a href="#">Наука</a>
        <a href="#">Гаджети</a>
      </nav>
    </div>
  </header>

  <div class="container page-layout">
    <main>
      <article itemscope itemtype="https://schema.org/NewsArticle">
        <header class="art-header">
          <div class="art-category">⚡ Електромобілі</div>
          <h1 itemprop="headline">Tesla встановила рекорд пробігу: 800 км на одному заряді</h1>
          <div class="art-meta">
            <span itemprop="author">Іван Коваленко</span>
            &bull;
            <time datetime="2024-12-12" itemprop="datePublished">12 грудня 2024</time>
            &bull;
            <span>5 хв читання</span>
          </div>
        </header>

        <figure class="art-cover">
          <div class="art-img" aria-label="Tesla Model S Plaid на трасі">🚗⚡</div>
          <figcaption>Tesla Model S Plaid встановила новий рекорд. Фото: Tesla Inc.</figcaption>
        </figure>

        <section>
          <h2>Що сталося?</h2>
          <p>Компанія Tesla офіційно підтвердила встановлення нового рекорду пробігу: їхній флагманський електромобіль Model S Plaid подолав 800 км на одному заряді батареї в умовах, наближених до реальних.</p>
          <p>Рекорд був встановлений за умов постійної швидкості 90 км/год при температурі +22°C та мінімальному використанні кліматичної системи.</p>
          <blockquote cite="https://tesla.com/blog">
            <p>«Ми довели, що електричне майбутнє не потребує компромісів у пробігу.»</p>
            <footer>— Ілон Маск, CEO Tesla</footer>
          </blockquote>
        </section>

        <section>
          <h2>Технічні характеристики</h2>
          <p>Model S Plaid оснащена трьома електромоторами сумарною потужністю 1020 к.с. і батареєю ємністю 100 кВт·год.</p>
          <ul>
            <li>Ємність батареї: 100 кВт·год</li>
            <li>Потужність: 1020 к.с. (3 мотори)</li>
            <li>Розгін 0-100 км/год: 2,1 с</li>
            <li>Офіційний пробіг (WLTP): 628 км</li>
          </ul>
        </section>
      </article>
    </main>

    <aside aria-label="Рекомендовані статті">
      <h2>Читайте також</h2>
      <ul class="related-list">
        <li><a href="#">📰 Rivian R2: новий конкурент Tesla</a></li>
        <li><a href="#">📰 Зарядка Tesla за 15 хвилин</a></li>
        <li><a href="#">📰 BYD випереджає Tesla у продажах</a></li>
        <li><a href="#">📰 Огляд Cybertruck 2024</a></li>
      </ul>
    </aside>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>© 2024 TechNews UA. Всі права захищені.</p>
    </div>
  </footer>
</body>
</html>`,
    `*{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;line-height:1.6}

.container{max-width:860px;margin:0 auto;padding:0 20px}

/* Header */
.site-header{background:#111827;border-bottom:1px solid #1f2937;padding:12px 0;position:sticky;top:0;z-index:10}
.site-header .container{display:flex;align-items:center;justify-content:space-between;gap:16px}
.logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#fff;font-weight:700;font-size:16px}
nav{display:flex;gap:16px}
nav a{color:#94a3b8;text-decoration:none;font-size:14px;transition:color .2s}
nav a:hover{color:#3b82f6}
*:focus{outline:2px solid #3b82f6;outline-offset:2px}

/* Layout */
.page-layout{display:grid;grid-template-columns:1fr 220px;gap:32px;padding:32px 20px;align-items:start}

/* Article */
.art-header{margin-bottom:20px}
.art-category{font-size:12px;color:#3b82f6;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.art-header h1{font-size:26px;font-weight:800;line-height:1.3;color:#f1f5f9;margin-bottom:12px}
.art-meta{font-size:13px;color:#64748b}

.art-cover{margin-bottom:24px}
.art-img{background:linear-gradient(135deg,#1d4ed8,#4c1d95);border-radius:12px;height:200px;display:flex;align-items:center;justify-content:center;font-size:72px;margin-bottom:8px}
figcaption{font-size:12px;color:#64748b;font-style:italic}

section{margin-bottom:24px}
section h2{font-size:18px;font-weight:700;color:#f1f5f9;margin-bottom:10px;border-left:3px solid #3b82f6;padding-left:10px}
section p{font-size:14px;color:#cbd5e1;margin-bottom:10px;line-height:1.75}
section ul{padding-left:20px}
section li{font-size:14px;color:#cbd5e1;margin-bottom:4px}
blockquote{background:#1e293b;border-left:4px solid #3b82f6;border-radius:0 8px 8px 0;padding:14px 18px;margin:16px 0;font-style:italic}
blockquote p{color:#94a3b8;font-size:14px;margin:0 0 6px}
blockquote footer{font-size:12px;color:#64748b;font-style:normal}

/* Aside */
aside{background:#1e293b;border-radius:12px;padding:18px;position:sticky;top:80px}
aside h2{font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px;border:none;padding:0}
.related-list{list-style:none;display:flex;flex-direction:column;gap:8px}
.related-list a{font-size:13px;color:#60a5fa;text-decoration:none;display:block;line-height:1.4;padding:6px 8px;border-radius:6px;transition:.2s}
.related-list a:hover{background:rgba(59,130,246,.1);color:#93c5fd}

/* Footer */
.site-footer{background:#111827;border-top:1px solid #1f2937;padding:16px 0;margin-top:40px;text-align:center;font-size:13px;color:#475569}`,
    ``,
    [
      { level:'easy',   uk:'Відкрий DevTools → Elements → Accessibility (або вкладку Accessibility дерева) і перевір структуру сторінки.',  ru:'Открой DevTools → Elements → Accessibility и проверь структуру страницы.' },
      { level:'medium', uk:'Додай другу &lt;section&gt; "Що буде далі?" з абзацом тексту та маркованим списком прогнозів.',  ru:'Добавь вторую &lt;section&gt; "Что будет дальше?" с абзацом текста и маркированным списком прогнозов.' },
      { level:'hard',   uk:'Додай JSON-LD скрипт у &lt;head&gt; з Article schema: headline, author, datePublished, image. Перевір через schema.org/schemaorg-testing-tool.',  ru:'Добавь JSON-LD скрипт в &lt;head&gt; с Article schema: headline, author, datePublished. Проверь через schema.org.' },
    ]
  );

})();
