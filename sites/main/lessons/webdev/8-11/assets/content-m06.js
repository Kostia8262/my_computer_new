/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 6 — CSS Анімації · 8–11 Веб-Старт
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  function patch(id, theory, html, css, tasks) {
    const l = WEB_LESSONS.find(x => x.id === id);
    if (!l) return;
    l.theory = theory;
    l.starterCode.html = html;
    l.starterCode.css  = css;
    l.tasks = tasks;
  }

  /* ─── 06-01 ─────────────────────────────────────────────── */
  patch('06-01',
    {
      uk: `<h2>CSS @keyframes: кадри анімації</h2>
<p>CSS-анімації — це як мультфільм: ти описуєш <strong>ключові кадри</strong>, а браузер домальовує все між ними.</p>
<pre>@keyframes назваАнімації {
  from { /* початковий стан */ }
  to   { /* кінцевий стан */  }
}

/* Або через відсотки: */
@keyframes кольори {
  0%   { background: red;   }
  50%  { background: blue;  }
  100% { background: green; }
}</pre>
<h3>Підключення до елемента</h3>
<pre>.коробка {
  animation-name:     назваАнімації;
  animation-duration: 2s; /* тривалість одного циклу */
}</pre>
<h3>Що можна анімувати</h3>
<ul>
  <li>Кольори: color, background-color, border-color</li>
  <li>Розміри: width, height, font-size</li>
  <li>Трансформації: transform (scale, rotate, translate)</li>
  <li>Прозорість: opacity</li>
</ul>`,
      ru: `<h2>CSS @keyframes: кадры анимации</h2>
<p>CSS-анимации — это как мультфильм: ты описываешь <strong>ключевые кадры</strong>, а браузер дорисовывает всё между ними.</p>
<pre>@keyframes названиеАнимации {
  from { /* начальное состояние */ }
  to   { /* конечное состояние */  }
}

/* Или через проценты: */
@keyframes цвета {
  0%   { background: red;   }
  50%  { background: blue;  }
  100% { background: green; }
}</pre>
<h3>Подключение к элементу</h3>
<pre>.коробка {
  animation-name:     названиеАнимации;
  animation-duration: 2s; /* длительность одного цикла */
}</pre>
<h3>Что можно анимировать</h3>
<ul>
  <li>Цвета: color, background-color, border-color</li>
  <li>Размеры: width, height, font-size</li>
  <li>Трансформации: transform (scale, rotate, translate)</li>
  <li>Прозрачность: opacity</li>
</ul>`
    },
    `<div class="demo">
  <h3>from → to (колір)</h3>
  <div class="box anim-color">Я змінюю колір</div>
</div>

<div class="demo">
  <h3>0% → 50% → 100% (три кадри)</h3>
  <div class="box anim-three">Три кадри</div>
</div>

<div class="demo">
  <h3>from → to (рух)</h3>
  <div class="box anim-move">Я рухаюсь →</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
.demo { background: #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 14px; }
h3 { font-size: 13px; color: #94a3b8; margin: 0 0 12px; font-family: monospace; }

.box {
  background: #3b82f6; color: #fff;
  padding: 16px 20px; border-radius: 10px;
  font-size: 15px; font-weight: bold;
  display: inline-block;
}

/* Анімація 1: колір */
@keyframes colorChange {
  from { background: #3b82f6; }
  to   { background: #ec4899; }
}
.anim-color {
  animation-name: colorChange;
  animation-duration: 2s;
}

/* Анімація 2: три кадри */
@keyframes threeFrames {
  0%   { background: #059669; color: #fff; }
  50%  { background: #f59e0b; color: #000; }
  100% { background: #7c3aed; color: #fff; }
}
.anim-three {
  animation-name: threeFrames;
  animation-duration: 3s;
}

/* Анімація 3: рух */
@keyframes moveRight {
  from { transform: translateX(0); }
  to   { transform: translateX(200px); }
}
.anim-move {
  animation-name: moveRight;
  animation-duration: 2s;
}`,
    [
      { level: 'easy',   uk: 'Зміни animation-duration у .anim-color з 2s на 0.5s — анімація прискориться.',                      ru: 'Измени animation-duration у .anim-color с 2s на 0.5s — анимация ускорится.' },
      { level: 'medium', uk: 'Додай четвертий кадр до @keyframes threeFrames: 75% { background: #dc2626; }',                      ru: 'Добавь четвёртый кадр к @keyframes threeFrames: 75% { background: #dc2626; }' },
      { level: 'hard',   uk: 'Створи нову анімацію @keyframes grow, яка збільшує блок від transform: scale(1) до scale(2). Підключи до нового &lt;div class="box anim-grow"&gt;.', ru: 'Создай новую анимацию @keyframes grow, которая увеличивает блок от transform: scale(1) до scale(2). Подключи к новому &lt;div class="box anim-grow"&gt;.' },
    ]
  );

  /* ─── 06-02 ─────────────────────────────────────────────── */
  patch('06-02',
    {
      uk: `<h2>animation: скорочений запис</h2>
<p>Замість двох окремих властивостей можна записати все в одному рядку через скорочену властивість <code>animation</code>:</p>
<pre>/* Окремо: */
animation-name: slideIn;
animation-duration: 1s;
animation-timing-function: ease-in-out;

/* Скорочено: */
animation: slideIn 1s ease-in-out;</pre>
<h3>Функції плавності (timing-function)</h3>
<ul>
  <li><code>linear</code> — рівномірно, без прискорення</li>
  <li><code>ease</code> — повільно → швидко → повільно (за замовч.)</li>
  <li><code>ease-in</code> — повільний старт, швидкий кінець</li>
  <li><code>ease-out</code> — швидкий старт, повільний кінець</li>
  <li><code>ease-in-out</code> — повільно з обох боків</li>
  <li><code>steps(4)</code> — стрибками (4 кроки)</li>
  <li><code>cubic-bezier(x1,y1,x2,y2)</code> — власна крива</li>
</ul>`,
      ru: `<h2>animation: сокращённая запись</h2>
<p>Вместо двух отдельных свойств можно записать всё в одну строку через сокращённое свойство <code>animation</code>:</p>
<pre>/* Отдельно: */
animation-name: slideIn;
animation-duration: 1s;
animation-timing-function: ease-in-out;

/* Сокращённо: */
animation: slideIn 1s ease-in-out;</pre>
<h3>Функции плавности (timing-function)</h3>
<ul>
  <li><code>linear</code> — равномерно, без ускорения</li>
  <li><code>ease</code> — медленно → быстро → медленно (по умолч.)</li>
  <li><code>ease-in</code> — медленный старт, быстрый конец</li>
  <li><code>ease-out</code> — быстрый старт, медленный конец</li>
  <li><code>ease-in-out</code> — медленно с обеих сторон</li>
  <li><code>steps(4)</code> — прыжками (4 шага)</li>
  <li><code>cubic-bezier(x1,y1,x2,y2)</code> — собственная кривая</li>
</ul>`
    },
    `@keyframes slide {
  from { transform: translateX(-200px); opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}

<div class="demo">
  <h3>linear — рівномірно</h3>
  <div class="bar linear">linear</div>
</div>
<div class="demo">
  <h3>ease — плавно з обох боків</h3>
  <div class="bar ease">ease</div>
</div>
<div class="demo">
  <h3>ease-in — прискорення</h3>
  <div class="bar ease-in">ease-in</div>
</div>
<div class="demo">
  <h3>ease-out — гальмування</h3>
  <div class="bar ease-out">ease-out</div>
</div>
<div class="demo">
  <h3>steps(6) — стрибками</h3>
  <div class="bar steps">steps(6)</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
.demo { background: #1e293b; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; overflow: hidden; }
h3 { font-size: 12px; color: #94a3b8; margin: 0 0 10px; font-family: monospace; }

@keyframes slide {
  from { transform: translateX(-200px); opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}

.bar {
  background: #3b82f6; color: #fff;
  padding: 10px 18px; border-radius: 8px;
  font-size: 13px; font-weight: bold;
  display: inline-block;
  animation-name: slide;
  animation-duration: 2s;
}

.linear   { animation-timing-function: linear;     background: #3b82f6; }
.ease     { animation-timing-function: ease;        background: #7c3aed; }
.ease-in  { animation-timing-function: ease-in;     background: #059669; }
.ease-out { animation-timing-function: ease-out;    background: #dc2626; }
.steps    { animation-timing-function: steps(6);    background: #d97706; }`,
    [
      { level: 'easy',   uk: 'Зміни animation-duration у всіх .bar на 4s — анімація стане вдвічі повільнішою.',                   ru: 'Измени animation-duration у всех .bar на 4s — анимация станет вдвое медленнее.' },
      { level: 'medium', uk: 'Додай новий блок .bar із animation-timing-function: ease-in-out і поспостерігай різницю з ease-in і ease-out.', ru: 'Добавь новый блок .bar с animation-timing-function: ease-in-out и понаблюдай разницу с ease-in и ease-out.' },
      { level: 'hard',   uk: 'Спробуй cubic-bezier: animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) — це «пружинний» ефект.', ru: 'Попробуй cubic-bezier: animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) — это «пружинный» эффект.' },
    ]
  );

  /* ─── 06-03 ─────────────────────────────────────────────── */
  patch('06-03',
    {
      uk: `<h2>animation-delay та animation-iteration-count</h2>
<p>Дві властивості, які роблять анімації набагато виразнішими:</p>
<h3>animation-delay — затримка перед стартом</h3>
<pre>animation-delay: 0s;   /* відразу (за замовч.) */
animation-delay: 1s;   /* через 1 секунду */
animation-delay: -1s;  /* починає з 1-ї секунди (вже «в процесі») */</pre>
<h3>animation-iteration-count — скільки разів</h3>
<pre>animation-iteration-count: 1;        /* один раз (за замовч.) */
animation-iteration-count: 3;        /* три рази */
animation-iteration-count: infinite; /* нескінченно */</pre>
<h3>Ефект «хвилі» через delay</h3>
<p>Якщо задати кільком однаковим елементам однакову анімацію, але різний delay — вийде ефект хвилі (stagger-анімація):</p>
<pre>.item:nth-child(1) { animation-delay: 0s;   }
.item:nth-child(2) { animation-delay: 0.2s; }
.item:nth-child(3) { animation-delay: 0.4s; }</pre>`,
      ru: `<h2>animation-delay и animation-iteration-count</h2>
<p>Два свойства, которые делают анимации намного выразительнее:</p>
<h3>animation-delay — задержка перед стартом</h3>
<pre>animation-delay: 0s;   /* сразу (по умолч.) */
animation-delay: 1s;   /* через 1 секунду */
animation-delay: -1s;  /* начинает с 1-й секунды (уже «в процессе») */</pre>
<h3>animation-iteration-count — сколько раз</h3>
<pre>animation-iteration-count: 1;        /* один раз (по умолч.) */
animation-iteration-count: 3;        /* три раза */
animation-iteration-count: infinite; /* бесконечно */</pre>
<h3>Эффект «волны» через delay</h3>
<p>Если задать нескольким одинаковым элементам одинаковую анимацию, но разный delay — получится эффект волны (stagger-анимация):</p>
<pre>.item:nth-child(1) { animation-delay: 0s;   }
.item:nth-child(2) { animation-delay: 0.2s; }
.item:nth-child(3) { animation-delay: 0.4s; }</pre>`
    },
    `<h2>Затримки: зірки з'являються по черзі</h2>
<div class="stars">
  <div class="star s1">⭐</div>
  <div class="star s2">⭐</div>
  <div class="star s3">⭐</div>
  <div class="star s4">⭐</div>
  <div class="star s5">⭐</div>
</div>

<h2>iteration-count: 3 vs infinite</h2>
<div class="row">
  <div class="box three">3 рази</div>
  <div class="box inf">∞ infinite</div>
</div>

<h2>Хвиля (stagger)</h2>
<div class="wave">
  <div class="dot d1"></div>
  <div class="dot d2"></div>
  <div class="dot d3"></div>
  <div class="dot d4"></div>
  <div class="dot d5"></div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 14px; color: #94a3b8; margin: 20px 0 10px; }

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1);   }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1);    opacity: 1;   }
  50%       { transform: scale(1.4); opacity: 0.6; }
}

.stars { display: flex; gap: 12px; }
.star { font-size: 32px; animation: fadeIn 0.5s ease-out both; }
.s1 { animation-delay: 0s;   }
.s2 { animation-delay: 0.3s; }
.s3 { animation-delay: 0.6s; }
.s4 { animation-delay: 0.9s; }
.s5 { animation-delay: 1.2s; }

.row { display: flex; gap: 16px; margin-bottom: 16px; }
.box {
  background: #3b82f6; color: #fff;
  padding: 14px 24px; border-radius: 10px;
  font-size: 14px; font-weight: bold;
  animation: bounce 1s ease-in-out;
}
.three { animation-iteration-count: 3;        background: #059669; }
.inf   { animation-iteration-count: infinite; background: #7c3aed; }

.wave { display: flex; gap: 10px; align-items: center; }
.dot {
  width: 16px; height: 16px; border-radius: 50%;
  background: #3b82f6;
  animation: pulse 0.8s ease-in-out infinite;
}
.d1 { animation-delay: 0s;    }
.d2 { animation-delay: 0.15s; }
.d3 { animation-delay: 0.3s;  }
.d4 { animation-delay: 0.45s; }
.d5 { animation-delay: 0.6s;  }`,
    [
      { level: 'easy',   uk: 'Збільш animation-delay між зірками до 0.8s (0s, 0.8s, 1.6s, 2.4s, 3.2s) і поспостерігай.',         ru: 'Увеличь animation-delay между звёздами до 0.8s (0s, 0.8s, 1.6s, 2.4s, 3.2s) и понаблюдай.' },
      { level: 'medium', uk: 'Зміни .three на animation-iteration-count: 5 і анімацію bounce замість pulse.',                     ru: 'Измени .three на animation-iteration-count: 5 и анимацию bounce вместо pulse.' },
      { level: 'hard',   uk: 'Додай 3 нові .dot різних кольорів і збільш їхні animation-delay з кроком 0.2s продовжуючи хвилю.', ru: 'Добавь 3 новых .dot разных цветов и увеличь их animation-delay с шагом 0.2s продолжая волну.' },
    ]
  );

  /* ─── 06-04 ─────────────────────────────────────────────── */
  patch('06-04',
    {
      uk: `<h2>animation-fill-mode: forwards та backwards</h2>
<p><code>animation-fill-mode</code> визначає, що відбувається зі стилями елемента <em>до</em> та <em>після</em> анімації.</p>
<pre>animation-fill-mode: none;      /* повертається на початок (за замовч.) */
animation-fill-mode: forwards;  /* залишається на фінальному кадрі */
animation-fill-mode: backwards; /* застосовує 0% вже під час delay */
animation-fill-mode: both;      /* forwards + backwards разом */</pre>
<h3>Найважливіше — forwards</h3>
<p>Без <code>forwards</code> після закінчення анімації елемент «стрибає назад» до свого звичайного стилю. Це виглядає дивно. <code>forwards</code> залишає елемент у фінальному стані:</p>
<pre>@keyframes slideIn {
  from { transform: translateX(-100px); opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}
.item {
  animation: slideIn 1s ease-out forwards; /* залишається видимим */
}</pre>`,
      ru: `<h2>animation-fill-mode: forwards и backwards</h2>
<p><code>animation-fill-mode</code> определяет, что происходит со стилями элемента <em>до</em> и <em>после</em> анимации.</p>
<pre>animation-fill-mode: none;      /* возвращается в начало (по умолч.) */
animation-fill-mode: forwards;  /* остаётся на финальном кадре */
animation-fill-mode: backwards; /* применяет 0% уже во время delay */
animation-fill-mode: both;      /* forwards + backwards вместе */</pre>
<h3>Самое важное — forwards</h3>
<p>Без <code>forwards</code> после окончания анимации элемент «прыгает назад» к своему обычному стилю. Это выглядит странно. <code>forwards</code> оставляет элемент в финальном состоянии:</p>
<pre>@keyframes slideIn {
  from { transform: translateX(-100px); opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}
.item {
  animation: slideIn 1s ease-out forwards; /* остаётся видимым */
}</pre>`
    },
    `<h2>none — повертається на початок (дивіться після завершення)</h2>
<div class="demo">
  <div class="box b-none">none — я зникну після анімації!</div>
</div>

<h2>forwards — залишається у фінальному стані</h2>
<div class="demo">
  <div class="box b-fwd">forwards — я залишаюсь тут!</div>
</div>

<h2>backwards — застосовує 0% під час delay (2s затримка)</h2>
<div class="demo">
  <div class="box b-back">backwards — я прихований під час затримки</div>
</div>

<h2>both — forwards + backwards</h2>
<div class="demo">
  <div class="box b-both">both — найкращий варіант!</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 13px; color: #94a3b8; margin: 16px 0 8px; }
.demo { background: #1e293b; border-radius: 10px; padding: 14px; margin-bottom: 10px; min-height: 54px; }

@keyframes appear {
  from { transform: translateX(-120px); opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}

.box {
  display: inline-block;
  padding: 12px 20px; border-radius: 8px;
  color: #fff; font-size: 14px; font-weight: bold;
  animation: appear 1.5s ease-out;
  animation-delay: 1s;
}

.b-none { background: #dc2626; animation-fill-mode: none;      }
.b-fwd  { background: #059669; animation-fill-mode: forwards;  }
.b-back { background: #7c3aed; animation-fill-mode: backwards; }
.b-both { background: #0369a1; animation-fill-mode: both;      }`,
    [
      { level: 'easy',   uk: 'Зміни animation-delay у всіх блоків з 1s на 0s — тепер backwards і both виглядатимуть однаково. Чому?', ru: 'Измени animation-delay у всех блоков с 1s на 0s — теперь backwards и both будут выглядеть одинаково. Почему?' },
      { level: 'medium', uk: 'Зміни @keyframes appear: кінець має opacity: 0 (зникає). Тепер з forwards блок залишиться невидимим після анімації.',  ru: 'Измени @keyframes appear: конец имеет opacity: 0 (исчезает). Теперь с forwards блок останется невидимым после анимации.' },
      { level: 'hard',   uk: 'Зроби список із 5 елементів, які з\'являються по черзі через delay і залишаються через forwards. Використай :nth-child для delay.', ru: 'Сделай список из 5 элементов, которые появляются по очереди через delay и остаются через forwards. Используй :nth-child для delay.' },
    ]
  );

  /* ─── 06-05 ─────────────────────────────────────────────── */
  patch('06-05',
    {
      uk: `<h2>animation-direction: alternate та reverse</h2>
<p><code>animation-direction</code> визначає, в якому напрямку відтворюються кадри анімації при повторенні.</p>
<pre>animation-direction: normal;            /* → завжди вперед (за замовч.) */
animation-direction: reverse;           /* ← завжди назад */
animation-direction: alternate;         /* → ← → ← (туди-сюди) */
animation-direction: alternate-reverse; /* ← → ← → (навпаки туди-сюди) */</pre>
<h3>alternate — найцінніше значення</h3>
<p>З <code>alternate</code> і <code>infinite</code> елемент безперервно рухається туди-сюди без «стрибків» назад на початок. Ідеально для пульсуючих ефектів та плаваючих елементів:</p>
<pre>.float {
  animation: bounce 2s ease-in-out infinite alternate;
  /* Піднімається, повільно опускається, знову піднімається... */
}</pre>`,
      ru: `<h2>animation-direction: alternate и reverse</h2>
<p><code>animation-direction</code> определяет, в каком направлении воспроизводятся кадры анимации при повторении.</p>
<pre>animation-direction: normal;            /* → всегда вперёд (по умолч.) */
animation-direction: reverse;           /* ← всегда назад */
animation-direction: alternate;         /* → ← → ← (туда-сюда) */
animation-direction: alternate-reverse; /* ← → ← → (наоборот туда-сюда) */</pre>
<h3>alternate — самое ценное значение</h3>
<p>С <code>alternate</code> и <code>infinite</code> элемент непрерывно движется туда-сюда без «прыжков» назад в начало. Идеально для пульсирующих эффектов и плавающих элементов:</p>
<pre>.float {
  animation: bounce 2s ease-in-out infinite alternate;
  /* Поднимается, медленно опускается, снова поднимается... */
}</pre>`
    },
    `<div class="grid">
  <div class="card">
    <div class="label">normal</div>
    <div class="box normal">→→→</div>
  </div>
  <div class="card">
    <div class="label">reverse</div>
    <div class="box rev">←←←</div>
  </div>
  <div class="card">
    <div class="label">alternate</div>
    <div class="box alt">↔</div>
  </div>
  <div class="card">
    <div class="label">alternate-reverse</div>
    <div class="box alt-rev">↔</div>
  </div>
</div>

<h2>Плаваючий елемент через alternate</h2>
<div class="float-demo">
  <div class="balloon">🎈</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 14px; color: #94a3b8; margin: 20px 0 10px; }

.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
.card { background: #1e293b; border-radius: 10px; padding: 14px; overflow: hidden; }
.label { font-size: 11px; font-family: monospace; color: #64748b; margin-bottom: 10px; }

@keyframes moveX {
  from { transform: translateX(0); }
  to   { transform: translateX(140px); }
}
@keyframes floatUp {
  from { transform: translateY(0); }
  to   { transform: translateY(-30px); }
}

.box {
  background: #3b82f6; color: #fff;
  padding: 10px 16px; border-radius: 8px;
  font-size: 14px; font-weight: bold;
  display: inline-block;
  animation: moveX 1.5s infinite;
}

.normal  { animation-direction: normal;            background: #3b82f6; }
.rev     { animation-direction: reverse;           background: #dc2626; }
.alt     { animation-direction: alternate;         background: #059669; }
.alt-rev { animation-direction: alternate-reverse; background: #7c3aed; }

.float-demo { text-align: center; padding: 20px; background: #1e293b; border-radius: 12px; }
.balloon { font-size: 64px; animation: floatUp 2s ease-in-out infinite alternate; display: inline-block; }`,
    [
      { level: 'easy',   uk: 'Зміни animation-direction у .balloon\'s floatUp на normal. Куля зникатиме? Чому?',                   ru: 'Измени animation-direction у .balloon\'s floatUp на normal. Шарик будет исчезать? Почему?' },
      { level: 'medium', uk: 'Додай другий .balloon 🎈 з animation-delay: 0.8s і alternate-reverse — вони рухатимуться у різні боки.', ru: 'Добавь второй .balloon 🎈 с animation-delay: 0.8s и alternate-reverse — они будут двигаться в разные стороны.' },
      { level: 'hard',   uk: 'Зроби «дихаючий» кружечок: @keyframes breathe від transform: scale(1) до scale(1.3), infinite alternate, 2s ease-in-out.', ru: 'Сделай «дышащий» кружочек: @keyframes breathe от transform: scale(1) до scale(1.3), infinite alternate, 2s ease-in-out.' },
    ]
  );

  /* ─── 06-06 ─────────────────────────────────────────────── */
  patch('06-06',
    {
      uk: `<h2>Hover-анімація: кнопки що пожвавлюються</h2>
<p>Комбінація <code>transition</code> (з модуля 3) та <code>animation</code> на hover — потужний інструмент для інтерактивних елементів.</p>
<pre>/* Варіант 1: transition (плавна зміна стилю) */
.btn { transition: transform 0.2s ease; }
.btn:hover { transform: scale(1.1); }

/* Варіант 2: animation при hover (складніші ефекти) */
.btn:hover { animation: shake 0.4s ease; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-5px); }
  75%       { transform: translateX(5px); }
}</pre>
<h3>Коли що використовувати</h3>
<ul>
  <li><strong>transition</strong> — для простих змін (колір, розмір, тінь).</li>
  <li><strong>animation на :hover</strong> — для складних ефектів (тряска, спалах, мерехтіння).</li>
</ul>`,
      ru: `<h2>Hover-анимация: кнопки которые оживают</h2>
<p>Комбинация <code>transition</code> (из модуля 3) и <code>animation</code> на hover — мощный инструмент для интерактивных элементов.</p>
<pre>/* Вариант 1: transition (плавное изменение стиля) */
.btn { transition: transform 0.2s ease; }
.btn:hover { transform: scale(1.1); }

/* Вариант 2: animation при hover (сложные эффекты) */
.btn:hover { animation: shake 0.4s ease; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-5px); }
  75%       { transform: translateX(5px); }
}</pre>
<h3>Когда что использовать</h3>
<ul>
  <li><strong>transition</strong> — для простых изменений (цвет, размер, тень).</li>
  <li><strong>animation на :hover</strong> — для сложных эффектов (тряска, вспышка, мерцание).</li>
</ul>`
    },
    `<div class="buttons">
  <button class="btn btn-scale">🚀 Збільшення</button>
  <button class="btn btn-shake">❌ Тряска</button>
  <button class="btn btn-glow">✨ Сяяння</button>
  <button class="btn btn-bounce">🎯 Стрибок</button>
</div>

<div class="card-demo">
  <div class="anim-card">
    <div class="card-icon">🎨</div>
    <h3>Наведи на мене</h3>
    <p>Картка з анімацією при наведенні</p>
  </div>
  <div class="anim-card">
    <div class="card-icon">⚡</div>
    <h3>Наведи на мене</h3>
    <p>Кожна картка має свій унікальний ефект</p>
  </div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 24px; background: #0f172a; color: #e2e8f0; }

@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%     { transform: translateX(-6px) rotate(-2deg); }
  40%     { transform: translateX(6px) rotate(2deg); }
  60%     { transform: translateX(-4px); }
  80%     { transform: translateX(4px); }
}
@keyframes glow {
  0%,100% { box-shadow: 0 0 5px #3b82f6; }
  50%     { box-shadow: 0 0 25px #3b82f6, 0 0 50px #7c3aed; }
}
@keyframes bounceBtn {
  0%,100% { transform: translateY(0) scale(1); }
  40%     { transform: translateY(-12px) scale(1.05); }
  60%     { transform: translateY(-6px); }
}

.buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.btn {
  padding: 13px 22px;
  border: none; border-radius: 10px;
  font-size: 15px; font-weight: bold;
  cursor: pointer; color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-scale { background: #3b82f6; }
.btn-scale:hover { transform: scale(1.15); box-shadow: 0 8px 24px rgba(59,130,246,.5); }

.btn-shake { background: #dc2626; }
.btn-shake:hover { animation: shake 0.5s ease; }

.btn-glow { background: #7c3aed; }
.btn-glow:hover { animation: glow 1s ease infinite; }

.btn-bounce { background: #059669; }
.btn-bounce:hover { animation: bounceBtn 0.6s ease; }

.card-demo { display: flex; gap: 16px; }
.anim-card {
  flex: 1;
  background: #1e293b;
  border-radius: 14px;
  padding: 24px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.anim-card:hover {
  transform: translateY(-8px) rotate(-1deg);
  box-shadow: 0 20px 40px rgba(0,0,0,.4);
}
.card-icon { font-size: 36px; margin-bottom: 12px; }
.anim-card h3 { margin: 0 0 8px; color: #f8fafc; font-size: 16px; }
.anim-card p  { margin: 0; color: #64748b; font-size: 13px; }`,
    [
      { level: 'easy',   uk: 'Наведи мишку на кожну кнопку і картку. Знайди ту, що найбільше подобається.',                      ru: 'Наведи мышку на каждую кнопку и карточку. Найди ту, что больше всего нравится.' },
      { level: 'medium', uk: 'Додай п\'яту кнопку .btn-spin з анімацією @keyframes spin: transform: rotate(360deg). При hover кнопка має повернутися на 360°.', ru: 'Добавь пятую кнопку .btn-spin с анимацией @keyframes spin: transform: rotate(360deg). При hover кнопка должна повернуться на 360°.' },
      { level: 'hard',   uk: 'Зроби третю .anim-card із іншим ефектом: при hover — transform: scale(1.05) і background стає яскравішим через filter: brightness(1.2).', ru: 'Сделай третью .anim-card с другим эффектом: при hover — transform: scale(1.05) и background становится ярче через filter: brightness(1.2).' },
    ]
  );

  /* ─── 06-07 ─────────────────────────────────────────────── */
  patch('06-07',
    {
      uk: `<h2>Пульсуюча анімація</h2>
<p>«Пульс» — одна з найпоширеніших анімацій у вебдизайні. Використовується для сповіщень, кнопок «живий» та елементів, що привертають увагу.</p>
<pre>@keyframes pulse {
  0%, 100% { transform: scale(1);    opacity: 1;   }
  50%       { transform: scale(1.15); opacity: 0.8; }
}
.notification-dot {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Пульс через box-shadow (тільки тінь) */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70%       { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
}
.live-badge {
  animation: pulseGlow 2s infinite;
}</pre>`,
      ru: `<h2>Пульсирующая анимация</h2>
<p>«Пульс» — одна из самых распространённых анимаций в вебдизайне. Используется для уведомлений, кнопок «живой» и элементов, привлекающих внимание.</p>
<pre>@keyframes pulse {
  0%, 100% { transform: scale(1);    opacity: 1;   }
  50%       { transform: scale(1.15); opacity: 0.8; }
}
.notification-dot {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Пульс через box-shadow (только тень) */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70%       { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
}
.live-badge {
  animation: pulseGlow 2s infinite;
}</pre>`
    },
    `<h2>Значок сповіщення</h2>
<div class="notif-row">
  <div class="icon-wrap">
    🔔
    <span class="dot"></span>
  </div>
  <div class="icon-wrap">
    💬
    <span class="dot dot-green"></span>
  </div>
  <div class="icon-wrap">
    📧
    <span class="dot dot-red"></span>
  </div>
</div>

<h2>LIVE-кнопка</h2>
<button class="live-btn">
  <span class="live-dot"></span>
  🔴 LIVE
</button>

<h2>Серцебиття</h2>
<div class="heart-row">
  <div class="heart">❤️</div>
  <div class="ecg">
    <div class="ecg-bar"></div>
  </div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 24px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 14px; color: #94a3b8; margin: 20px 0 12px; }

/* Пульс розміром */
@keyframes pulse {
  0%,100% { transform: scale(1);    }
  50%     { transform: scale(1.25); }
}
/* Пульс тінню */
@keyframes pulseGlow {
  0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,.7); }
  70%     { box-shadow: 0 0 0 12px rgba(239,68,68,0); }
}
/* Серцебиття */
@keyframes heartbeat {
  0%,100% { transform: scale(1);    }
  15%     { transform: scale(1.35); }
  30%     { transform: scale(1);    }
  45%     { transform: scale(1.2);  }
  60%     { transform: scale(1);    }
}
@keyframes ecgAnim {
  0%   { width: 0%; }
  100% { width: 100%; }
}

.notif-row { display: flex; gap: 28px; margin-bottom: 8px; }
.icon-wrap { position: relative; font-size: 36px; }
.dot {
  position: absolute; top: 0; right: -2px;
  width: 12px; height: 12px; border-radius: 50%;
  background: #3b82f6; border: 2px solid #0f172a;
  animation: pulse 1.5s ease-in-out infinite;
}
.dot-green { background: #059669; }
.dot-red   { background: #dc2626; animation-duration: 0.8s; }

.live-btn {
  display: flex; align-items: center; gap: 8px;
  background: #1e293b; border: 1px solid #334155;
  color: #fff; padding: 10px 20px; border-radius: 20px;
  font-size: 15px; cursor: pointer;
  animation: pulseGlow 2s infinite;
}
.live-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #ef4444;
  animation: pulse 1s infinite alternate;
}

.heart-row { display: flex; align-items: center; gap: 20px; }
.heart { font-size: 52px; animation: heartbeat 1.2s ease-in-out infinite; display: inline-block; }
.ecg { flex: 1; height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden; }
.ecg-bar { height: 100%; background: #ef4444; border-radius: 3px; animation: ecgAnim 1.2s linear infinite; }`,
    [
      { level: 'easy',   uk: 'Зміни animation-duration у .heart на 0.6s — серце б\'ється швидше.',                                ru: 'Измени animation-duration у .heart на 0.6s — сердце бьётся быстрее.' },
      { level: 'medium', uk: 'Зроби кнопку .live-btn мигаючою: додай @keyframes blink з opacity: 1 → opacity: 0 → opacity: 1 і підключи до .live-dot.',   ru: 'Сделай кнопку .live-btn мигающей: добавь @keyframes blink с opacity: 1 → opacity: 0 → opacity: 1 и подключи к .live-dot.' },
      { level: 'hard',   uk: 'Зроби «дихаючу» кнопку підписки: при hover — пульс зупиняється (animation-play-state: paused), текст змінюється на «Підписатись ✓».',  ru: 'Сделай «дышащую» кнопку подписки: при hover — пульс останавливается (animation-play-state: paused), текст меняется на «Подписаться ✓».' },
    ]
  );

  /* ─── 06-08 ─────────────────────────────────────────────── */
  patch('06-08',
    {
      uk: `<h2>Loading-спінер: анімоване обертання</h2>
<p>Спінер завантаження — елемент, що крутиться, поки щось завантажується. Найпростіший спосіб — círculo з border, де один бік пофарбований.</p>
<pre>@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;       /* сіре кільце */
  border-top-color: #3b82f6;        /* синій бік */
  border-radius: 50%;               /* коло */
  animation: spin 1s linear infinite; /* крутиться */
}</pre>
<p>Ключове: <code>linear</code> (рівномірно) і <code>infinite</code> (завжди). <code>ease</code> тут не підходить — спінер «пришвидшувався б» і «гальмував», що виглядає некрасиво.</p>`,
      ru: `<h2>Loading-спиннер: анимированное вращение</h2>
<p>Спиннер загрузки — элемент, который крутится, пока что-то загружается. Самый простой способ — кружок с border, где одна сторона покрашена.</p>
<pre>@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;       /* серое кольцо */
  border-top-color: #3b82f6;        /* синяя сторона */
  border-radius: 50%;               /* круг */
  animation: spin 1s linear infinite; /* крутится */
}</pre>
<p>Ключевое: <code>linear</code> (равномерно) и <code>infinite</code> (всегда). <code>ease</code> здесь не подходит — спиннер «ускорялся бы» и «тормозил», что выглядит некрасиво.</p>`
    },
    `<h2>Базовий спінер</h2>
<div class="spinner-row">
  <div class="spinner s-basic"></div>
  <div class="spinner s-thick"></div>
  <div class="spinner s-fast"></div>
  <div class="spinner s-large"></div>
</div>

<h2>Кольорові спінери</h2>
<div class="spinner-row">
  <div class="spinner s-green"></div>
  <div class="spinner s-purple"></div>
  <div class="spinner s-gradient"></div>
</div>

<h2>Завантаження сторінки</h2>
<div class="loading-card">
  <div class="spinner s-lg"></div>
  <p class="loading-text">Завантажуємо твій сайт...</p>
  <div class="progress-bar">
    <div class="progress-fill"></div>
  </div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 24px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 14px; color: #94a3b8; margin: 20px 0 12px; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes progressAnim {
  from { width: 0%; }
  to   { width: 100%; }
}

.spinner-row { display: flex; align-items: center; gap: 24px; margin-bottom: 8px; }

.spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.s-basic  { width: 36px; height: 36px; border: 4px solid #334155; border-top-color: #3b82f6; }
.s-thick  { width: 36px; height: 36px; border: 8px solid #334155; border-top-color: #7c3aed; }
.s-fast   { width: 36px; height: 36px; border: 4px solid #334155; border-top-color: #ec4899; animation-duration: 0.4s; }
.s-large  { width: 60px; height: 60px; border: 6px solid #334155; border-top-color: #0ea5e9; }

.s-green  { width: 36px; height: 36px; border: 4px solid #d1fae5; border-top-color: #059669; }
.s-purple { width: 36px; height: 36px; border: 4px solid #ede9fe; border-top-color: #7c3aed; animation-direction: reverse; }
.s-gradient {
  width: 36px; height: 36px;
  border: 4px solid transparent;
  border-top-color: #f59e0b;
  border-right-color: #ec4899;
  animation-duration: 0.8s;
}

.loading-card {
  background: #1e293b;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  max-width: 300px;
}
.s-lg { width: 56px; height: 56px; border: 6px solid #334155; border-top-color: #3b82f6; margin: 0 auto 16px; }
.loading-text { color: #94a3b8; font-size: 14px; margin: 0 0 16px; }
.progress-bar { background: #334155; border-radius: 6px; height: 8px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #7c3aed); animation: progressAnim 3s linear infinite; border-radius: 6px; }`,
    [
      { level: 'easy',   uk: 'Зміни border-top-color у .s-basic на #ec4899 — спінер стане рожевим.',                              ru: 'Измени border-top-color у .s-basic на #ec4899 — спиннер станет розовым.' },
      { level: 'medium', uk: 'Зроби спінер з двома фарбованими сторонами: border-top-color: #3b82f6; border-bottom-color: #ec4899;', ru: 'Сделай спиннер с двумя покрашенными сторонами: border-top-color: #3b82f6; border-bottom-color: #ec4899;' },
      { level: 'hard',   uk: 'Зроби вкладені спінери (два кружечки один в одному) що крутяться в різних напрямках — один у reverse.',  ru: 'Сделай вложенные спиннеры (два кружочка один в другом) которые крутятся в разных направлениях — один в reverse.' },
    ]
  );

  /* ─── 06-09 ─────────────────────────────────────────────── */
  patch('06-09',
    {
      uk: `<h2>Slide-in: елемент виїжджає з краю</h2>
<p>«Виїзд з краю» — популярна анімація для:
<ul>
  <li>Заголовків і секцій (з'являються при скролі).</li>
  <li>Сповіщень і тостів (виїжджають знизу або збоку).</li>
  <li>Бокових панелей (виїжджають при кліку).</li>
</ul>
</p>
<pre>@keyframes slideInLeft {
  from { transform: translateX(-100px); opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}
@keyframes slideInRight {
  from { transform: translateX(100px);  opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}
@keyframes slideInUp {
  from { transform: translateY(50px);   opacity: 0; }
  to   { transform: translateY(0);      opacity: 1; }
}

.element {
  animation: slideInLeft 0.6s ease-out both;
}</pre>`,
      ru: `<h2>Slide-in: элемент выезжает с края</h2>
<p>«Выезд с края» — популярная анимация для:
<ul>
  <li>Заголовков и секций (появляются при скролле).</li>
  <li>Уведомлений и тостов (выезжают снизу или сбоку).</li>
  <li>Боковых панелей (выезжают при клике).</li>
</ul>
</p>
<pre>@keyframes slideInLeft {
  from { transform: translateX(-100px); opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}
@keyframes slideInRight {
  from { transform: translateX(100px);  opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}
@keyframes slideInUp {
  from { transform: translateY(50px);   opacity: 0; }
  to   { transform: translateY(0);      opacity: 1; }
}

.element {
  animation: slideInLeft 0.6s ease-out both;
}</pre>`
    },
    `<div class="page">
  <header class="header-slide">🌐 Мій сайт</header>

  <div class="section">
    <h2 class="title-slide">Ласкаво просимо!</h2>
    <p class="text-slide">Цей текст виїхав знизу з затримкою.</p>
  </div>

  <div class="cards-slide">
    <div class="card card-1">🎨 Дизайн</div>
    <div class="card card-2">💻 Код</div>
    <div class="card card-3">🚀 Результат</div>
  </div>

  <div class="toast">
    🔔 Нове повідомлення!
  </div>
</div>`,
    `* { box-sizing: border-box; }
body { font-family: Arial, sans-serif; margin: 0; background: #0f172a; color: #e2e8f0; }

@keyframes slideDown {
  from { transform: translateY(-60px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(60px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes slideLeft {
  from { transform: translateX(-80px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}
@keyframes slideRight {
  from { transform: translateX(80px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes slideToast {
  from { transform: translateX(120%); }
  to   { transform: translateX(0);    }
}

.page { padding: 24px; max-width: 700px; margin: 0 auto; }

.header-slide {
  font-size: 20px; font-weight: bold;
  padding: 16px 0; border-bottom: 1px solid #334155;
  animation: slideDown 0.6s ease-out both;
}

.section { margin: 24px 0; }
.title-slide {
  font-size: 28px; margin: 0 0 10px; color: #f8fafc;
  animation: slideLeft 0.7s ease-out 0.2s both;
}
.text-slide {
  color: #94a3b8; font-size: 15px; margin: 0;
  animation: slideUp 0.7s ease-out 0.4s both;
}

.cards-slide { display: flex; gap: 14px; margin: 20px 0; }
.card {
  flex: 1; background: #1e293b; border-radius: 12px;
  padding: 20px; text-align: center; font-size: 15px;
}
.card-1 { animation: slideUp 0.6s ease-out 0.2s both; }
.card-2 { animation: slideUp 0.6s ease-out 0.4s both; }
.card-3 { animation: slideUp 0.6s ease-out 0.6s both; }

.toast {
  position: fixed; bottom: 24px; right: 24px;
  background: #059669; color: #fff;
  padding: 12px 20px; border-radius: 10px; font-size: 14px;
  animation: slideToast 0.5s ease-out 1s both;
}`,
    [
      { level: 'easy',   uk: 'Зміни animation у .toast: slideToast на slideUp. Тост виїжджатиме знизу.',                          ru: 'Измени animation у .toast: slideToast на slideUp. Тост будет выезжать снизу.' },
      { level: 'medium', uk: 'Зміни .card-2 на slideRight замість slideUp — він виїжджатиме справа.',                             ru: 'Измени .card-2 на slideRight вместо slideUp — он будет выезжать справа.' },
      { level: 'hard',   uk: 'Додай четверту .card-4 із animation-delay: 0.8s і slideLeft — вона виїжджатиме зліва.',             ru: 'Добавь четвёртую .card-4 с animation-delay: 0.8s и slideLeft — она будет выезжать слева.' },
    ]
  );

  /* ─── 06-10 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('06-10',
    {
      uk: `<h2>🎬 Проект: Анімована сторінка привітання</h2>
<p>Час зібрати всі анімації в один ефектний результат! Зроби сторінку-привітання (welcome page), яка «ожива» при відкритті.</p>
<h3>Що має бути на сторінці</h3>
<ul>
  <li><strong>Анімований заголовок</strong> — виїжджає зверху (slideDown).</li>
  <li><strong>Підзаголовок</strong> — з'являється знизу із затримкою (slideUp + delay).</li>
  <li><strong>Кнопка CTA</strong> — з'являється останньою та пульсує (pulse infinite).</li>
  <li><strong>Фонові елементи</strong> — круги або зірки плавають (float + alternate).</li>
  <li><strong>Лічильник або таймер</strong> — цифри збільшуються (scale).</li>
</ul>
<h3>Вимоги</h3>
<ul>
  <li>Мінімум 4 різні @keyframes.</li>
  <li>Використати animation-delay для stagger-ефекту.</li>
  <li>Кнопка — hover-анімація.</li>
  <li>Використати animation-fill-mode: both.</li>
</ul>`,
      ru: `<h2>🎬 Проект: Анимированная страница приветствия</h2>
<p>Время собрать все анимации в один эффектный результат! Сделай страницу-приветствие (welcome page), которая «оживает» при открытии.</p>
<h3>Что должно быть на странице</h3>
<ul>
  <li><strong>Анимированный заголовок</strong> — выезжает сверху (slideDown).</li>
  <li><strong>Подзаголовок</strong> — появляется снизу с задержкой (slideUp + delay).</li>
  <li><strong>Кнопка CTA</strong> — появляется последней и пульсирует (pulse infinite).</li>
  <li><strong>Фоновые элементы</strong> — круги или звёзды плывут (float + alternate).</li>
  <li><strong>Счётчик или таймер</strong> — цифры увеличиваются (scale).</li>
</ul>
<h3>Требования</h3>
<ul>
  <li>Минимум 4 разных @keyframes.</li>
  <li>Использовать animation-delay для stagger-эффекта.</li>
  <li>Кнопка — hover-анимация.</li>
  <li>Использовать animation-fill-mode: both.</li>
</ul>`
    },
    `<div class="welcome-page">
  <!-- Плаваючі фонові кола -->
  <div class="bubble b1"></div>
  <div class="bubble b2"></div>
  <div class="bubble b3"></div>
  <div class="bubble b4"></div>

  <!-- Головний вміст -->
  <div class="content">
    <div class="emoji-anim">🚀</div>
    <h1 class="main-title">Ласкаво просимо до</h1>
    <h2 class="sub-title">Веб-Академії!</h2>
    <p class="tagline">Навчись створювати сайти, які дивують</p>

    <div class="stats">
      <div class="stat stat-1">
        <div class="stat-num">150</div>
        <div class="stat-label">уроків</div>
      </div>
      <div class="stat stat-2">
        <div class="stat-num">12</div>
        <div class="stat-label">модулів</div>
      </div>
      <div class="stat stat-3">
        <div class="stat-num">3</div>
        <div class="stat-label">проекти</div>
      </div>
    </div>

    <button class="cta-btn">Почати навчання →</button>
  </div>
</div>`,
    `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial, sans-serif; background: #0f172a; color: #fff; overflow: hidden; }

/* ═══ @keyframes ═══ */
@keyframes slideDown {
  from { transform: translateY(-60px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes popIn {
  0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
  70%  { transform: scale(1.2) rotate(5deg); }
  100% { transform: scale(1) rotate(0);      opacity: 1; }
}
@keyframes pulse {
  0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(5,150,105,.6); }
  50%     { transform: scale(1.04); box-shadow: 0 0 0 12px rgba(5,150,105,0); }
}
@keyframes float {
  from { transform: translateY(0) rotate(0deg); }
  to   { transform: translateY(-30px) rotate(15deg); }
}
@keyframes countUp {
  from { transform: scale(0.5); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}
@keyframes btnHover {
  0%,100% { transform: translateX(0); }
  50%     { transform: translateX(6px); }
}

/* ═══ Фон ═══ */
.welcome-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, #1e3a5f 0%, #0f172a 70%);
  overflow: hidden;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 4s ease-in-out infinite alternate;
}
.b1 { width: 200px; height: 200px; background: #3b82f6; top: -40px; left: -60px; animation-duration: 5s; }
.b2 { width: 140px; height: 140px; background: #7c3aed; bottom: 20px; right: -30px; animation-duration: 3.5s; animation-delay: 0.5s; }
.b3 { width: 80px;  height: 80px;  background: #059669; top: 40%; left: 10%; animation-duration: 4.5s; animation-delay: 1s; }
.b4 { width: 60px;  height: 60px;  background: #ec4899; top: 20%; right: 15%; animation-duration: 3s; animation-delay: 0.8s; }

/* ═══ Контент ═══ */
.content { text-align: center; z-index: 1; padding: 20px; }

.emoji-anim {
  font-size: 72px;
  display: block;
  animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  margin-bottom: 16px;
}

.main-title {
  font-size: 18px;
  color: #94a3b8;
  font-weight: 400;
  animation: slideDown 0.7s ease-out 0.5s both;
  margin-bottom: 6px;
}

.sub-title {
  font-size: 42px;
  font-weight: 900;
  background: linear-gradient(135deg, #3b82f6, #7c3aed, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: slideDown 0.7s ease-out 0.7s both;
  margin-bottom: 14px;
}

.tagline {
  color: #64748b;
  font-size: 15px;
  animation: slideUp 0.7s ease-out 1s both;
  margin-bottom: 32px;
}

/* ═══ Статистика ═══ */
.stats {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 32px;
}
.stat {
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px;
  padding: 16px 24px;
  animation: countUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.stat-1 { animation-delay: 1.2s; }
.stat-2 { animation-delay: 1.4s; }
.stat-3 { animation-delay: 1.6s; }
.stat-num   { font-size: 32px; font-weight: 900; color: #f8fafc; }
.stat-label { font-size: 12px; color: #64748b; margin-top: 4px; }

/* ═══ CTA ═══ */
.cta-btn {
  background: linear-gradient(135deg, #059669, #0369a1);
  color: #fff;
  border: none;
  padding: 16px 36px;
  border-radius: 50px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  animation: slideUp 0.6s ease-out 1.8s both, pulse 2s ease-in-out 2.4s infinite;
  transition: transform 0.2s;
}
.cta-btn:hover {
  animation: btnHover 0.4s ease infinite, pulse 2s ease-in-out infinite;
  transform: scale(1.05);
}`,
    [
      { level: 'easy',   uk: 'Зміни текст заголовку і підзаголовку на власну назву (своє ім\'я або назву проекту).',              ru: 'Измени текст заголовка и подзаголовка на собственное название (своё имя или название проекта).' },
      { level: 'medium', uk: 'Змін анімацію .emoji-anim — замість 🚀 поклади будь-який emoji і налаштуй власний @keyframes introEmoji.', ru: 'Измени анимацию .emoji-anim — вместо 🚀 положи любой emoji и настрой собственный @keyframes introEmoji.' },
      { level: 'hard',   uk: 'Додай ще один ряд статистики або рядок «фактів» у .stats і анімуй їх появу через stagger (кожен +0.2s delay).', ru: 'Добавь ещё один ряд статистики или строку «фактов» в .stats и анимируй их появление через stagger (каждый +0.2s delay).' },
      { level: 'extra',  uk: 'Зроби ефект набору тексту (typewriter): @keyframes typing з width: 0 → width: 100% та ефектом cursor через ::after.', ru: 'Сделай эффект набора текста (typewriter): @keyframes typing с width: 0 → width: 100% и эффектом cursor через ::after.' },
    ]
  );

})();
