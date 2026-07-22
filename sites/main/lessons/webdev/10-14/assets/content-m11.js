/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 11 — Проект 1: Квіз-гра · 10–14
   Патчить WEB_LESSONS після завантаження lessons.js
   ═══════════════════════════════════════════════════════════════ */
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
p{font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:8px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
button:hover{border-color:#7c3aed;color:#c4b5fd}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}
.quiz-box{max-width:420px;background:#1e293b;border:1px solid #334155;border-radius:16px;padding:20px}
.q-title{font-size:15px;font-weight:700;margin-bottom:14px;color:#fff}
.q-ans{display:block;width:100%;text-align:left;margin-bottom:8px;padding:11px 14px}
.q-ans.correct{background:rgba(74,222,128,.15);border-color:#4ade80;color:#4ade80}
.q-ans.wrong{background:rgba(248,113,113,.15);border-color:#f87171;color:#f87171}`;

  /* ─── 11-01: Планування квізу — вимоги та wireframe ─────────── */
  patch('11-01',
    { uk:`<h2>Планування квізу: вимоги та wireframe</h2>
<p>Перш ніж писати код, добрий розробник планує проект. Модуль 11 — це один великий проект, який ти зберешся крок за кроком: <strong>Квіз-гра</strong> на JavaScript.</p>
<h3>Вимоги до проекту (що має вміти квіз)</h3>
<ul>
  <li>Показувати питання одне за одним із варіантами відповідей</li>
  <li>Рахувати правильні відповіді</li>
  <li>Показувати прогрес (питання 3 з 10) і таймер</li>
  <li>У кінці — екран результату з відсотком</li>
  <li>Зберігати найкращий результат і топ рекордів у <code>localStorage</code></li>
</ul>
<h3>Wireframe — схематичний макет</h3>
<p>Wireframe — це "скелет" інтерфейсу без кольорів і шрифтів, лише блоки й розташування. Він допомагає домовитись про структуру ДО того, як писати CSS.</p>
<pre>┌─────────────────────────┐
│ Питання 3 / 10   ⏱ 0:12 │
│ ▓▓▓▓▓▓░░░░ (progress)   │
├─────────────────────────┤
│ Столиця Франції?         │
│ [ Лондон ]                │
│ [ Париж  ]                │
│ [ Берлін ]                │
└─────────────────────────┘</pre>
<h3>З чого починаємо</h3>
<p>У наступному уроці — структура даних: масив об'єктів "питання-відповіді", який керуватиме всім квізом.</p>`,
      ru:`<h2>Планирование квиза: требования и wireframe</h2>
<p>Прежде чем писать код, хороший разработчик планирует проект. Модуль 11 — это один большой проект, который ты соберёшь шаг за шагом: <strong>Квиз-игра</strong> на JavaScript.</p>
<h3>Требования к проекту</h3>
<ul>
  <li>Показывать вопросы один за другим с вариантами ответов</li>
  <li>Считать правильные ответы</li>
  <li>Показывать прогресс (вопрос 3 из 10) и таймер</li>
  <li>В конце — экран результата с процентом</li>
  <li>Сохранять лучший результат и топ рекордов в <code>localStorage</code></li>
</ul>
<h3>Wireframe — схематичный макет</h3>
<p>Wireframe — это "скелет" интерфейса без цветов и шрифтов, только блоки и расположение.</p>
<pre>┌─────────────────────────┐
│ Вопрос 3 / 10    ⏱ 0:12 │
│ ▓▓▓▓▓▓░░░░ (progress)   │
├─────────────────────────┤
│ Столица Франции?          │
│ [ Лондон ]                │
│ [ Париж  ]                │
│ [ Берлин ]                │
└─────────────────────────┘</pre>
<h3>С чего начинаем</h3>
<p>В следующем уроке — структура данных: массив объектов "вопрос-ответы", который будет управлять всем квизом.</p>` },
    `<h2>Wireframe квізу (макет без стилів)</h2>
<div class="wf">
  <div class="wf-row wf-header">
    <span>Питання 3 / 10</span>
    <span>⏱ 0:12</span>
  </div>
  <div class="wf-progress"><div class="wf-progress-fill"></div></div>
  <div class="wf-question">Столиця Франції?</div>
  <div class="wf-ans">Лондон</div>
  <div class="wf-ans">Париж</div>
  <div class="wf-ans">Берлін</div>
</div>`,
    `${BASE}
.wf{max-width:360px;border:2px dashed #475569;border-radius:12px;padding:16px}
.wf-row{display:flex;justify-content:space-between;font-size:12px;color:#64748b;margin-bottom:8px}
.wf-progress{height:8px;background:#334155;border-radius:4px;margin-bottom:16px;overflow:hidden}
.wf-progress-fill{width:30%;height:100%;background:#94a3b8}
.wf-question{border:1px dashed #475569;padding:12px;text-align:center;color:#cbd5e1;margin-bottom:10px}
.wf-ans{border:1px dashed #475569;padding:10px;text-align:center;color:#94a3b8;margin-bottom:6px}`,
    ``,
    [
      { level:'easy',   uk:'Подивись на wireframe і порівняй з описом ASCII-макета в теорії — знайди всі 4 частини (заголовок, прогрес, питання, відповіді).', ru:'Посмотри на wireframe и сравни с ASCII-макетом в теории — найди все 4 части.' },
      { level:'medium', uk:'Додай у заголовок wf-row третій елемент <span>💯 Рахунок: 2</span> між лічильником питань і таймером.', ru:'Добавь в заголовок wf-row третий элемент <span>💯 Счёт: 2</span> между счётчиком вопросов и таймером.' },
      { level:'hard',   uk:'Домалюй четвертий варіант відповіді <code>.wf-ans</code> "Рим" — тепер маєш повний макет питання з 4 варіантами.', ru:'Дорисуй четвёртый вариант ответа "Рим" — теперь у тебя полный макет с 4 вариантами.' },
    ]
  );

  /* ─── 11-02: Структура даних — масив питань і відповідей ────── */
  patch('11-02',
    { uk:`<h2>Структура даних: масив питань і відповідей</h2>
<p>Квіз керується одним масивом об'єктів. Кожен об'єкт — одне питання з варіантами і індексом правильної відповіді.</p>
<h3>Форма даних</h3>
<pre>const QUESTIONS = [
  {
    q: 'Столиця Франції?',
    options: ['Лондон', 'Париж', 'Берлін', 'Рим'],
    correct: 1   // індекс правильної відповіді (Париж)
  },
  { q: '2 + 2 * 2 = ?', options: ['8', '6', '4', '2'], correct: 1 },
];</pre>
<h3>Чому саме так?</h3>
<p>Зберігаючи <code>correct</code> як <strong>індекс</strong> (число), а не текст відповіді, легко перевірити відповідь: <code>options[correct] === обраний варіант</code>. Це також дозволяє легко перемішувати варіанти без втрати правильної відповіді.</p>
<h3>console.table для перевірки даних</h3>
<p>Перш ніж рендерити щось у HTML, корисно вивести масив у <code>console.table(QUESTIONS)</code> — так одразу видно, чи всі питання мають правильну структуру.</p>`,
      ru:`<h2>Структура данных: массив вопросов и ответов</h2>
<p>Квиз управляется одним массивом объектов. Каждый объект — один вопрос с вариантами и индексом правильного ответа.</p>
<h3>Форма данных</h3>
<pre>const QUESTIONS = [
  {
    q: 'Столица Франции?',
    options: ['Лондон', 'Париж', 'Берлин', 'Рим'],
    correct: 1
  },
  { q: '2 + 2 * 2 = ?', options: ['8', '6', '4', '2'], correct: 1 },
];</pre>
<h3>Почему именно так?</h3>
<p>Храня <code>correct</code> как <strong>индекс</strong>, легко проверить ответ: <code>options[correct] === выбранный вариант</code>. Это также позволяет легко перемешивать варианты без потери правильного ответа.</p>
<h3>console.table для проверки данных</h3>
<p>Перед рендерингом полезно вывести массив в <code>console.table(QUESTIONS)</code> — сразу видно, все ли вопросы имеют правильную структуру.</p>` },
    `<h2>Дані квізу</h2>
<p>Натисни кнопку і подивись структуру масиву питань нижче:</p>
<button onclick="showData()">Показати QUESTIONS</button>
<pre id="data-out" style="margin-top:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:12px;white-space:pre-wrap;color:#94a3b8"></pre>`,
    `${BASE}`,
    `const QUESTIONS = [
  { q: 'Столиця Франції?', options: ['Лондон', 'Париж', 'Берлін', 'Рим'], correct: 1 },
  { q: '2 + 2 \\u00d7 2 = ?', options: ['8', '6', '4', '2'], correct: 1 },
  { q: 'Яка планета найбільша?', options: ['Марс', 'Юпітер', 'Земля', 'Венера'], correct: 1 },
];

function showData() {
  const out = document.getElementById('data-out');
  out.textContent = QUESTIONS.map((item, i) =>
    (i + 1) + '. ' + item.q + '\\n   Варіанти: ' + item.options.join(', ') +
    '\\n   Правильна: ' + item.options[item.correct]
  ).join('\\n\\n');
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і переконайся, що для кожного питання правильно показана правильна відповідь.', ru:'Нажми кнопку и убедись, что для каждого вопроса правильно показан верный ответ.' },
      { level:'medium', uk:'Додай четверте питання в масив QUESTIONS: { q: "Скільки днів у році?", options: ["360","365","300","400"], correct: 1 }.', ru:'Добавь четвёртый вопрос в массив QUESTIONS: { q: "Сколько дней в году?", options: ["360","365","300","400"], correct: 1 }.' },
      { level:'hard',   uk:'Додай до кожного об\'єкта питання нове поле <code>category</code> (наприклад "Географія", "Математика") і виведи його теж у <code>showData()</code>.', ru:'Добавь к каждому вопросу новое поле <code>category</code> и выведи его тоже в <code>showData()</code>.' },
    ]
  );

  /* ─── 11-03: Рендеринг питання у DOM ─────────────────────────── */
  patch('11-03',
    { uk:`<h2>Рендеринг питання у DOM</h2>
<p>Тепер перетворимо дані з масиву на реальний HTML — покажемо перше питання і його варіанти відповідей на екрані.</p>
<h3>Підхід: одна функція render()</h3>
<p>Замість того, щоб писати HTML вручну для кожного питання, пишемо <strong>одну</strong> функцію, яка бере поточне питання з масиву за індексом і будує розмітку через <code>createElement</code> або <code>innerHTML</code>.</p>
<pre>function renderQuestion(index) {
  const item = QUESTIONS[index];
  title.textContent = item.q;
  answersBox.innerHTML = '';
  item.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    answersBox.appendChild(btn);
  });
}</pre>
<h3>Чому це важливо</h3>
<p>Одна функція для рендеру + масив даних = можна показати 3 питання чи 300 питань <strong>без зміни коду</strong>, лише додаючи елементи в масив.</p>`,
      ru:`<h2>Рендеринг вопроса в DOM</h2>
<p>Теперь превратим данные из массива в реальный HTML — покажем первый вопрос и варианты ответов на экране.</p>
<h3>Подход: одна функция render()</h3>
<p>Вместо ручного HTML для каждого вопроса пишем <strong>одну</strong> функцию, которая берёт текущий вопрос из массива по индексу и строит разметку.</p>
<pre>function renderQuestion(index) {
  const item = QUESTIONS[index];
  title.textContent = item.q;
  answersBox.innerHTML = '';
  item.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    answersBox.appendChild(btn);
  });
}</pre>
<h3>Почему это важно</h3>
<p>Одна функция рендера + массив данных = можно показать 3 вопроса или 300 вопросов <strong>без изменения кода</strong>.</p>` },
    `<div class="quiz-box">
  <div class="q-title" id="q-title">Завантаження...</div>
  <div id="q-answers"></div>
</div>`,
    `${BASE}`,
    `const QUESTIONS = [
  { q: 'Столиця Франції?', options: ['Лондон', 'Париж', 'Берлін', 'Рим'], correct: 1 },
  { q: 'Яка планета найбільша?', options: ['Марс', 'Юпітер', 'Земля', 'Венера'], correct: 1 },
];

function renderQuestion(index) {
  const item = QUESTIONS[index];
  document.getElementById('q-title').textContent = item.q;
  const box = document.getElementById('q-answers');
  box.innerHTML = '';
  item.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    box.appendChild(btn);
  });
}

renderQuestion(0);`,
    [
      { level:'easy',   uk:'Заміни <code>renderQuestion(0)</code> на <code>renderQuestion(1)</code> внизу і переконайся, що показується друге питання.', ru:'Замени <code>renderQuestion(0)</code> на <code>renderQuestion(1)</code> и убедись, что показывается второй вопрос.' },
      { level:'medium', uk:'Додай третє питання в масив QUESTIONS і перевір <code>renderQuestion(2)</code>.', ru:'Добавь третий вопрос в массив QUESTIONS и проверь <code>renderQuestion(2)</code>.' },
      { level:'hard',   uk:'Додай у renderQuestion() виведення номера питання: додай в HTML елемент <code>&lt;div id="q-num"&gt;&lt;/div&gt;</code> над q-title і встав туди "Питання " + (index+1).', ru:'Добавь в renderQuestion() вывод номера вопроса: элемент <code>&lt;div id="q-num"&gt;&lt;/div&gt;</code> над q-title.' },
    ]
  );

  /* ─── 11-04: Обробка вибору відповіді і підрахунок балів ─────── */
  patch('11-04',
    { uk:`<h2>Обробка вибору відповіді і підрахунок балів</h2>
<p>Тепер додамо логіку: клік по варіанту перевіряє, чи він правильний, підсвічує кнопки кольором і переходить до наступного питання.</p>
<h3>Алгоритм</h3>
<pre>1. Користувач клікає кнопку-відповідь
2. Порівнюємо: obраний_індекс === item.correct?
3. Підсвічуємо правильну відповідь зеленим
   (і, якщо обрали неправильну — її червоним)
4. Через паузу — наступне питання (index++)
5. Якщо питань більше нема — показати результат</pre>
<h3>event.target у дії</h3>
<p>Кожна кнопка отримує <code>data-index</code> з номером варіанту. У обробнику клацання дістаємо цей номер через <code>e.target.dataset.index</code> і порівнюємо з правильною відповіддю.</p>`,
      ru:`<h2>Обработка выбора ответа и подсчёт баллов</h2>
<p>Теперь добавим логику: клик по варианту проверяет, правильный ли он, подсвечивает кнопки цветом и переходит к следующему вопросу.</p>
<h3>Алгоритм</h3>
<pre>1. Пользователь кликает кнопку-ответ
2. Сравниваем: выбранный_индекс === item.correct?
3. Подсвечиваем правильный ответ зелёным
   (и, если выбрали неправильный — его красным)
4. Через паузу — следующий вопрос (index++)
5. Если вопросов больше нет — показать результат</pre>
<h3>event.target в действии</h3>
<p>Каждая кнопка получает <code>data-index</code> с номером варианта. В обработчике клика достаём этот номер через <code>e.target.dataset.index</code>.</p>` },
    `<div class="quiz-box">
  <div class="q-title" id="q-title">—</div>
  <div id="q-answers"></div>
  <p id="score-line" style="margin-top:10px">Рахунок: 0 / 0</p>
</div>`,
    `${BASE}`,
    `const QUESTIONS = [
  { q: 'Столиця Франції?', options: ['Лондон', 'Париж', 'Берлін', 'Рим'], correct: 1 },
  { q: 'Яка планета найбільша?', options: ['Марс', 'Юпітер', 'Земля', 'Венера'], correct: 1 },
  { q: '5 \\u00d7 5 = ?', options: ['20', '25', '30', '15'], correct: 1 },
];
let current = 0;
let score = 0;
let answered = false;

function renderQuestion(index) {
  answered = false;
  const item = QUESTIONS[index];
  document.getElementById('q-title').textContent = item.q;
  const box = document.getElementById('q-answers');
  box.innerHTML = '';
  item.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    btn.dataset.index = i;
    btn.addEventListener('click', onAnswer);
    box.appendChild(btn);
  });
}

function onAnswer(e) {
  if (answered) return;
  answered = true;
  const item = QUESTIONS[current];
  const chosen = Number(e.target.dataset.index);
  const buttons = document.querySelectorAll('.q-ans');

  buttons[item.correct].classList.add('correct');
  if (chosen !== item.correct) buttons[chosen].classList.add('wrong');
  if (chosen === item.correct) score++;

  document.getElementById('score-line').textContent = 'Рахунок: ' + score + ' / ' + QUESTIONS.length;

  setTimeout(() => {
    current++;
    if (current < QUESTIONS.length) renderQuestion(current);
    else document.getElementById('q-title').textContent = 'Квіз завершено! Рахунок: ' + score;
  }, 900);
}

renderQuestion(current);`,
    [
      { level:'easy',   uk:'Пройди весь квіз із 3 питань і подивись, як змінюється рахунок унизу.', ru:'Пройди весь квиз из 3 вопросов и посмотри, как меняется счёт внизу.' },
      { level:'medium', uk:'Зміни затримку <code>setTimeout</code> з 900 на 1500 мс — щоб було більше часу побачити підсвічену відповідь.', ru:'Измени задержку <code>setTimeout</code> с 900 на 1500 мс.' },
      { level:'hard',   uk:'Додай четверте питання в масив QUESTIONS і переконайся, що після нього коректно показується фінальний рахунок.', ru:'Добавь четвёртый вопрос в массив QUESTIONS и убедись, что после него корректно показывается финальный счёт.' },
    ]
  );

  /* ─── 11-05: Progress bar та лічильник питань ────────────────── */
  patch('11-05',
    { uk:`<h2>Progress bar та лічильник питань</h2>
<p>Гравець має бачити, скільки питань залишилось. Для цього додаємо два елементи: текстовий лічильник ("Питання 3 з 10") і смужку прогресу.</p>
<h3>Формула прогресу</h3>
<pre>const percent = ((index + 1) / QUESTIONS.length) * 100;
progressFill.style.width = percent + '%';</pre>
<h3>CSS transition для плавності</h3>
<pre>.progress-fill {
  transition: width .3s ease;
}</pre>
<p>Достатньо змінити <code>width</code> у JS — сам перехід анімує CSS завдяки <code>transition</code>.</p>`,
      ru:`<h2>Progress bar и счётчик вопросов</h2>
<p>Игрок должен видеть, сколько вопросов осталось. Добавляем текстовый счётчик и полосу прогресса.</p>
<h3>Формула прогресса</h3>
<pre>const percent = ((index + 1) / QUESTIONS.length) * 100;
progressFill.style.width = percent + '%';</pre>
<h3>CSS transition для плавности</h3>
<pre>.progress-fill {
  transition: width .3s ease;
}</pre>
<p>Достаточно изменить <code>width</code> в JS — переход анимирует CSS благодаря <code>transition</code>.</p>` },
    `<div class="quiz-box">
  <div class="q-meta">
    <span id="q-counter">Питання 1 / 3</span>
  </div>
  <div class="progress"><div class="progress-fill" id="progress-fill"></div></div>
  <div class="q-title" id="q-title" style="margin-top:14px">—</div>
  <div id="q-answers"></div>
</div>`,
    `${BASE}
.q-meta{font-size:12px;color:#64748b;margin-bottom:8px}
.progress{height:8px;background:#334155;border-radius:4px;overflow:hidden}
.progress-fill{width:0;height:100%;background:linear-gradient(90deg,#7c3aed,#a78bfa);transition:width .3s ease}`,
    `const QUESTIONS = [
  { q: 'Столиця Франції?', options: ['Лондон', 'Париж', 'Берлін'], correct: 1 },
  { q: 'Яка планета найбільша?', options: ['Марс', 'Юпітер', 'Земля'], correct: 1 },
  { q: '5 \\u00d7 5 = ?', options: ['20', '25', '30'], correct: 1 },
];
let current = 0;

function renderQuestion(index) {
  const item = QUESTIONS[index];
  document.getElementById('q-counter').textContent = 'Питання ' + (index + 1) + ' / ' + QUESTIONS.length;
  document.getElementById('progress-fill').style.width = ((index + 1) / QUESTIONS.length * 100) + '%';
  document.getElementById('q-title').textContent = item.q;
  const box = document.getElementById('q-answers');
  box.innerHTML = '';
  item.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      current++;
      if (current < QUESTIONS.length) renderQuestion(current);
      else document.getElementById('q-title').textContent = 'Готово!';
    });
    box.appendChild(btn);
  });
}

renderQuestion(current);`,
    [
      { level:'easy',   uk:'Пройди квіз і подивись, як заповнюється смужка прогресу з кожним питанням.', ru:'Пройди квиз и посмотри, как заполняется полоса прогресса с каждым вопросом.' },
      { level:'medium', uk:'Зміни колір градієнта <code>.progress-fill</code> на зелений (<code>linear-gradient(90deg,#059669,#4ade80)</code>).', ru:'Измени цвет градиента <code>.progress-fill</code> на зелёный.' },
      { level:'hard',   uk:'Додай праворуч від лічильника питань відсоток проходження: <code>&lt;span id="q-percent"&gt;&lt;/span&gt;</code>, який показує те саме число, що йде у width прогрес-бару, тільки текстом ("33%").', ru:'Добавь справа от счётчика вопросов процент прохождения текстом ("33%").' },
    ]
  );

  /* ─── 11-06: Таймер на кожне питання ──────────────────────────── */
  patch('11-06',
    { uk:`<h2>Таймер на кожне питання</h2>
<p>Щоб додати драйву, дамо гравцю обмежений час на відповідь — наприклад, 10 секунд. Якщо час вийшов — питання зараховується як неправильне.</p>
<h3>setInterval для зворотного відліку</h3>
<pre>let timeLeft = 10;
const timerId = setInterval(() => {
  timeLeft--;
  timerEl.textContent = '⏱ ' + timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerId);
    onTimeUp();
  }
}, 1000);</pre>
<h3>Важливо: очищати таймер</h3>
<p>Коли гравець відповідає ДО закінчення часу, обов'язково викликаємо <code>clearInterval(timerId)</code> — інакше старий таймер "проб'ється" крізь наступне питання.</p>`,
      ru:`<h2>Таймер на каждый вопрос</h2>
<p>Чтобы добавить драйва, дадим игроку ограниченное время на ответ — например, 10 секунд. Если время вышло — вопрос засчитывается как неправильный.</p>
<h3>setInterval для обратного отсчёта</h3>
<pre>let timeLeft = 10;
const timerId = setInterval(() => {
  timeLeft--;
  timerEl.textContent = '⏱ ' + timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerId);
    onTimeUp();
  }
}, 1000);</pre>
<h3>Важно: очищать таймер</h3>
<p>Когда игрок отвечает ДО окончания времени, обязательно вызываем <code>clearInterval(timerId)</code> — иначе старый таймер "пробьётся" сквозь следующий вопрос.</p>` },
    `<div class="quiz-box">
  <div class="q-meta">
    <span id="q-counter">Питання 1 / 2</span>
    <span id="timer" style="float:right;color:#fbbf24">⏱ 10</span>
  </div>
  <div class="q-title" id="q-title" style="margin-top:14px">—</div>
  <div id="q-answers"></div>
</div>`,
    `${BASE}`,
    `const QUESTIONS = [
  { q: 'Столиця Франції?', options: ['Лондон', 'Париж', 'Берлін'], correct: 1 },
  { q: 'Яка планета найбільша?', options: ['Марс', 'Юпітер', 'Земля'], correct: 1 },
];
let current = 0;
let timerId = null;

function startTimer() {
  let timeLeft = 10;
  const timerEl = document.getElementById('timer');
  timerEl.textContent = '⏱ ' + timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = '⏱ ' + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timerId);
  current++;
  if (current < QUESTIONS.length) renderQuestion(current);
  else document.getElementById('q-title').textContent = 'Час вийшов або квіз завершено!';
}

function renderQuestion(index) {
  const item = QUESTIONS[index];
  document.getElementById('q-counter').textContent = 'Питання ' + (index + 1) + ' / ' + QUESTIONS.length;
  document.getElementById('q-title').textContent = item.q;
  const box = document.getElementById('q-answers');
  box.innerHTML = '';
  item.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    btn.addEventListener('click', nextQuestion);
    box.appendChild(btn);
  });
  startTimer();
}

renderQuestion(current);`,
    [
      { level:'easy',   uk:'Почекай, поки таймер дійде до нуля сам, не клікаючи — переконайся, що квіз переходить далі автоматично.', ru:'Подожди, пока таймер дойдёт до нуля сам — убедись, что квиз переходит дальше автоматически.' },
      { level:'medium', uk:'Зміни початковий час з 10 на 15 секунд.', ru:'Измени начальное время с 10 на 15 секунд.' },
      { level:'hard',   uk:'Зроби так, щоб коли лишається 3 секунди чи менше, колір таймера ставав червоним (<code>timerEl.style.color = \'#f87171\'</code>).', ru:'Сделай так, чтобы когда остаётся 3 секунды или меньше, цвет таймера становился красным.' },
    ]
  );

  /* ─── 11-07: Екран результатів із відсотком і похвалою ───────── */
  patch('11-07',
    { uk:`<h2>Екран результатів із відсотком і похвалою</h2>
<p>Коли питання закінчились, показуємо окремий екран: скільки правильних відповідей, відсоток і мотиваційне повідомлення залежно від результату.</p>
<h3>Логіка похвали</h3>
<pre>function getMessage(percent) {
  if (percent === 100) return '🏆 Ідеально! Жодної помилки!';
  if (percent >= 70)   return '🎉 Чудовий результат!';
  if (percent >= 40)   return '👍 Непогано, спробуй ще раз!';
  return '💪 Тренуйся — наступного разу буде краще!';
}</pre>
<h3>Заміна вмісту сторінки</h3>
<p>Простий спосіб показати "інший екран" — сховати блок питань (<code>display:none</code>) і показати блок результату, який до того був прихований.</p>`,
      ru:`<h2>Экран результатов с процентом и похвалой</h2>
<p>Когда вопросы закончились, показываем отдельный экран: сколько правильных ответов, процент и мотивационное сообщение в зависимости от результата.</p>
<h3>Логика похвалы</h3>
<pre>function getMessage(percent) {
  if (percent === 100) return '🏆 Идеально! Ни одной ошибки!';
  if (percent >= 70)   return '🎉 Отличный результат!';
  if (percent >= 40)   return '👍 Неплохо, попробуй ещё раз!';
  return '💪 Тренируйся — в следующий раз будет лучше!';
}</pre>
<h3>Замена содержимого страницы</h3>
<p>Простой способ показать "другой экран" — скрыть блок вопросов и показать блок результата.</p>` },
    `<div class="quiz-box" id="quiz-screen">
  <div class="q-title" id="q-title">—</div>
  <div id="q-answers"></div>
</div>
<div class="quiz-box" id="result-screen" style="display:none;text-align:center">
  <div style="font-size:38px;margin-bottom:8px" id="result-emoji">🎉</div>
  <div style="font-size:22px;font-weight:900" id="result-percent">0%</div>
  <p id="result-msg" style="margin-top:8px">—</p>
</div>`,
    `${BASE}`,
    `const QUESTIONS = [
  { q: 'Столиця Франції?', options: ['Лондон', 'Париж', 'Берлін'], correct: 1 },
  { q: 'Яка планета найбільша?', options: ['Марс', 'Юпітер', 'Земля'], correct: 1 },
  { q: '5 \\u00d7 5 = ?', options: ['20', '25', '30'], correct: 1 },
];
let current = 0;
let score = 0;

function getMessage(percent) {
  if (percent === 100) return '🏆 Ідеально! Жодної помилки!';
  if (percent >= 70)   return '🎉 Чудовий результат!';
  if (percent >= 40)   return '👍 Непогано, спробуй ще раз!';
  return '💪 Тренуйся — наступного разу буде краще!';
}

function showResult() {
  document.getElementById('quiz-screen').style.display = 'none';
  const percent = Math.round((score / QUESTIONS.length) * 100);
  document.getElementById('result-screen').style.display = 'block';
  document.getElementById('result-percent').textContent = percent + '% (' + score + ' / ' + QUESTIONS.length + ')';
  document.getElementById('result-msg').textContent = getMessage(percent);
  document.getElementById('result-emoji').textContent = percent === 100 ? '🏆' : (percent >= 70 ? '🎉' : (percent >= 40 ? '👍' : '💪'));
}

function renderQuestion(index) {
  const item = QUESTIONS[index];
  document.getElementById('q-title').textContent = item.q;
  const box = document.getElementById('q-answers');
  box.innerHTML = '';
  item.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      if (i === item.correct) score++;
      current++;
      if (current < QUESTIONS.length) renderQuestion(current);
      else showResult();
    });
    box.appendChild(btn);
  });
}

renderQuestion(current);`,
    [
      { level:'easy',   uk:'Пройди квіз, навмисно відповівши на все правильно — переконайся, що бачиш повідомлення "🏆 Ідеально!".', ru:'Пройди квиз, ответив на всё правильно — убедись, что видишь сообщение "🏆 Идеально!".' },
      { level:'medium', uk:'Пройди ще раз, навмисно помилившись у всіх питаннях — перевір повідомлення для найнижчого результату.', ru:'Пройди ещё раз, ошибившись во всех вопросах — проверь сообщение для самого низкого результата.' },
      { level:'hard',   uk:'Додай на екран результату кнопку "Пройти ще раз", яка обнуляє <code>current = 0; score = 0;</code>, ховає result-screen і викликає <code>renderQuestion(0)</code> знову.', ru:'Добавь на экран результата кнопку "Пройти ещё раз", которая обнуляет счётчики и запускает квиз заново.' },
    ]
  );

  /* ─── 11-08: Анімації між питаннями — slide та fade ──────────── */
  patch('11-08',
    { uk:`<h2>Анімації між питаннями: slide та fade</h2>
<p>Різка зміна питання виглядає "сухо". Додамо плавний перехід: старе питання зникає вправо, нове — з'являється зліва.</p>
<h3>Технологія: клас + CSS keyframes</h3>
<pre>@keyframes slideOut { to { transform: translateX(-30px); opacity: 0; } }
@keyframes slideIn  { from { transform: translateX(30px); opacity: 0; } }

.leaving  { animation: slideOut .25s ease forwards; }
.entering { animation: slideIn   .25s ease forwards; }</pre>
<h3>Послідовність у JS</h3>
<pre>box.classList.add('leaving');
setTimeout(() => {
  renderQuestion(nextIndex);          // міняємо вміст
  box.classList.remove('leaving');
  box.classList.add('entering');
}, 250);</pre>
<p>Ключова ідея: анімація виходу відбувається <strong>ДО</strong> зміни вмісту, анімація входу — <strong>ПІСЛЯ</strong>.</p>`,
      ru:`<h2>Анимации между вопросами: slide и fade</h2>
<p>Резкая смена вопроса выглядит "сухо". Добавим плавный переход: старый вопрос исчезает вправо, новый — появляется слева.</p>
<h3>Технология: класс + CSS keyframes</h3>
<pre>@keyframes slideOut { to { transform: translateX(-30px); opacity: 0; } }
@keyframes slideIn  { from { transform: translateX(30px); opacity: 0; } }

.leaving  { animation: slideOut .25s ease forwards; }
.entering { animation: slideIn   .25s ease forwards; }</pre>
<h3>Последовательность в JS</h3>
<pre>box.classList.add('leaving');
setTimeout(() => {
  renderQuestion(nextIndex);
  box.classList.remove('leaving');
  box.classList.add('entering');
}, 250);</pre>
<p>Ключевая идея: анимация выхода — <strong>ДО</strong> смены содержимого, анимация входа — <strong>ПОСЛЕ</strong>.</p>` },
    `<div class="quiz-box" id="quiz-box">
  <div class="q-title" id="q-title">—</div>
  <div id="q-answers"></div>
</div>`,
    `${BASE}
@keyframes slideOut{to{transform:translateX(-30px);opacity:0}}
@keyframes slideIn{from{transform:translateX(30px);opacity:0}}
.leaving{animation:slideOut .25s ease forwards}
.entering{animation:slideIn .25s ease forwards}`,
    `const QUESTIONS = [
  { q: 'Столиця Франції?', options: ['Лондон', 'Париж', 'Берлін'], correct: 1 },
  { q: 'Яка планета найбільша?', options: ['Марс', 'Юпітер', 'Земля'], correct: 1 },
  { q: '5 \\u00d7 5 = ?', options: ['20', '25', '30'], correct: 1 },
];
let current = 0;

function renderQuestion(index) {
  const item = QUESTIONS[index];
  document.getElementById('q-title').textContent = item.q;
  const box = document.getElementById('q-answers');
  box.innerHTML = '';
  item.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    btn.addEventListener('click', goNext);
    box.appendChild(btn);
  });
}

function goNext() {
  const quizBox = document.getElementById('quiz-box');
  quizBox.classList.add('leaving');
  setTimeout(() => {
    current++;
    if (current < QUESTIONS.length) renderQuestion(current);
    else document.getElementById('q-title').textContent = 'Готово! 🎉';
    quizBox.classList.remove('leaving');
    quizBox.classList.add('entering');
    setTimeout(() => quizBox.classList.remove('entering'), 260);
  }, 250);
}

renderQuestion(current);`,
    [
      { level:'easy',   uk:'Пройди квіз і подивись на плавний перехід між питаннями.', ru:'Пройди квиз и посмотри на плавный переход между вопросами.' },
      { level:'medium', uk:'Зміни тривалість анімації з .25s на .5s в обох @keyframes-класах — перехід стане повільнішим.', ru:'Измени длительность анимации с .25s на .5s — переход станет медленнее.' },
      { level:'hard',   uk:'Зроби другий варіант анімації через <code>opacity</code>-fade без зсуву (прибери <code>translateX</code>, залиш лише <code>opacity:0</code> у обох keyframes) і порівняй відчуття.', ru:'Сделай второй вариант анимации через opacity-fade без сдвига и сравни ощущения.' },
    ]
  );

  /* ─── 11-09: localStorage — найкращий результат ──────────────── */
  patch('11-09',
    { uk:`<h2>localStorage: найкращий результат</h2>
<p>Щоб гравець бачив свій рекорд навіть після закриття вкладки, зберігаємо найкращий результат у <code>localStorage</code>.</p>
<h3>Зберегти, лише якщо новий результат кращий</h3>
<pre>function saveBestScore(score) {
  const best = Number(localStorage.getItem('quiz-best') || 0);
  if (score > best) {
    localStorage.setItem('quiz-best', score);
    return true; // новий рекорд!
  }
  return false;
}</pre>
<h3>Показ рекорду на екрані результату</h3>
<pre>const best = localStorage.getItem('quiz-best') || 0;
bestLine.textContent = 'Найкращий результат: ' + best;</pre>
<p>localStorage зберігає лише <strong>рядки</strong> — числа автоматично перетворюються, тому при читанні варто явно робити <code>Number(...)</code>.</p>`,
      ru:`<h2>localStorage: лучший результат</h2>
<p>Чтобы игрок видел свой рекорд даже после закрытия вкладки, сохраняем лучший результат в <code>localStorage</code>.</p>
<h3>Сохранить, только если новый результат лучше</h3>
<pre>function saveBestScore(score) {
  const best = Number(localStorage.getItem('quiz-best') || 0);
  if (score > best) {
    localStorage.setItem('quiz-best', score);
    return true;
  }
  return false;
}</pre>
<h3>Показ рекорда на экране результата</h3>
<pre>const best = localStorage.getItem('quiz-best') || 0;
bestLine.textContent = 'Лучший результат: ' + best;</pre>
<p>localStorage хранит только <strong>строки</strong> — при чтении стоит явно делать <code>Number(...)</code>.</p>` },
    `<div class="quiz-box" style="text-align:center">
  <p id="best-line">Найкращий результат: 0</p>
  <div class="btn-row" style="display:flex;gap:8px;justify-content:center;margin-top:10px">
    <button onclick="simulateScore(2)">Отримати 2 бали</button>
    <button onclick="simulateScore(5)">Отримати 5 балів</button>
  </div>
</div>`,
    `${BASE}`,
    `function updateBestLine() {
  const best = Number(localStorage.getItem('quiz-best') || 0);
  document.getElementById('best-line').textContent = 'Найкращий результат: ' + best;
}

function saveBestScore(score) {
  const best = Number(localStorage.getItem('quiz-best') || 0);
  if (score > best) {
    localStorage.setItem('quiz-best', score);
    return true;
  }
  return false;
}

function simulateScore(score) {
  const isRecord = saveBestScore(score);
  updateBestLine();
  if (isRecord) alert('🏆 Новий рекорд: ' + score + '!');
}

updateBestLine();`,
    [
      { level:'easy',   uk:'Натисни "Отримати 2 бали", потім "Отримати 5 балів" — переконайся, що рекорд оновився лише до більшого числа.', ru:'Нажми "Получить 2 балла", потом "Получить 5 баллов" — убедись, что рекорд обновился только до большего числа.' },
      { level:'medium', uk:'Додай кнопку "Скинути рекорд", яка викликає <code>localStorage.removeItem(\'quiz-best\')</code> і оновлює рядок.', ru:'Добавь кнопку "Сбросить рекорд", вызывающую <code>localStorage.removeItem(\'quiz-best\')</code>.' },
      { level:'hard',   uk:'Перезавантаж прев\'ю (кнопка ⟳ у панелі) — переконайся, що рекорд залишився в localStorage навіть після перезавантаження.', ru:'Перезагрузи превью (кнопка ⟳) — убедись, что рекорд остался в localStorage даже после перезагрузки.' },
    ]
  );

  /* ─── 11-10: Адаптивний дизайн квізу ──────────────────────────── */
  patch('11-10',
    { uk:`<h2>Адаптивний дизайн квізу</h2>
<p>На телефоні квіз має бути на всю ширину екрана, кнопки — великі й зручні для пальця. Адаптуємо <code>.quiz-box</code> через медіа-запит.</p>
<h3>Mobile-first підхід</h3>
<pre>.quiz-box {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

@media (max-width: 480px) {
  .quiz-box   { padding: 14px; border-radius: 12px; }
  .q-ans      { padding: 14px; font-size: 15px; } /* більша ціль для пальця */
  .q-title    { font-size: 16px; }
}</pre>
<h3>Мінімальний розмір цілі для дотику</h3>
<p>Apple і Google рекомендують мінімум <strong>44×44px</strong> для будь-якої клікабельної області на мобільному — інакше важко влучити пальцем.</p>`,
      ru:`<h2>Адаптивный дизайн квиза</h2>
<p>На телефоне квиз должен быть на всю ширину экрана, кнопки — большие и удобные для пальца.</p>
<h3>Mobile-first подход</h3>
<pre>.quiz-box {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

@media (max-width: 480px) {
  .quiz-box   { padding: 14px; border-radius: 12px; }
  .q-ans      { padding: 14px; font-size: 15px; }
  .q-title    { font-size: 16px; }
}</pre>
<h3>Минимальный размер цели для касания</h3>
<p>Apple и Google рекомендуют минимум <strong>44×44px</strong> для любой кликабельной области на мобильном.</p>` },
    `<button onclick="toggleWidth()" style="margin-bottom:10px">📱 Перемкнути ширину (телефон / десктоп)</button>
<div class="quiz-box" id="quiz-box">
  <div class="q-title">Столиця Франції?</div>
  <button class="q-ans">Лондон</button>
  <button class="q-ans">Париж</button>
  <button class="q-ans">Берлін</button>
</div>`,
    `${BASE}
#quiz-box{transition:max-width .3s ease}
@media (max-width:480px){
  .quiz-box{padding:14px;border-radius:12px}
  .q-ans{padding:14px;font-size:15px}
  .q-title{font-size:16px}
}`,
    `let narrow = false;
function toggleWidth() {
  narrow = !narrow;
  const box = document.getElementById('quiz-box');
  box.style.maxWidth = narrow ? '280px' : '420px';
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись, як квіз стискається до вузького екрану — кнопки-відповіді мають лишатись зручними для кліку.', ru:'Нажми кнопку и посмотри, как квиз сжимается до узкого экрана.' },
      { level:'medium', uk:'Зміни у медіа-запиті @media розмір з 480px на 600px — перевір коли саме спрацьовує адаптація.', ru:'Измени в медиа-запросе размер с 480px на 600px.' },
      { level:'hard',   uk:'Додай ще один брейкпоінт <code>@media (max-width:320px)</code>, де <code>.q-title</code> зменшується до 14px — для дуже вузьких старих телефонів.', ru:'Добавь ещё один брейкпоинт <code>@media (max-width:320px)</code>, где <code>.q-title</code> уменьшается до 14px.' },
    ]
  );

  /* ─── 11-11: Темна тема з перемикачем ─────────────────────────── */
  patch('11-11',
    { uk:`<h2>Темна тема з перемикачем</h2>
<p>Квіз уже темний за замовчуванням — додамо перемикач на <strong>світлу</strong> тему через CSS Custom Properties і <code>data-theme</code>.</p>
<h3>Змінні для двох тем</h3>
<pre>:root {
  --bg: #0f172a; --card: #1e293b; --text: #f1f5f9;
}
[data-theme="light"] {
  --bg: #f8fafc; --card: #ffffff; --text: #0f172a;
}
body { background: var(--bg); color: var(--text); }
.quiz-box { background: var(--card); }</pre>
<h3>Перемикач у JS</h3>
<pre>function toggleTheme() {
  const isLight = document.body.dataset.theme === 'light';
  document.body.dataset.theme = isLight ? 'dark' : 'light';
  localStorage.setItem('quiz-theme', document.body.dataset.theme);
}</pre>`,
      ru:`<h2>Тёмная тема с переключателем</h2>
<p>Квиз уже тёмный по умолчанию — добавим переключатель на <strong>светлую</strong> тему через CSS Custom Properties.</p>
<h3>Переменные для двух тем</h3>
<pre>:root {
  --bg: #0f172a; --card: #1e293b; --text: #f1f5f9;
}
[data-theme="light"] {
  --bg: #f8fafc; --card: #ffffff; --text: #0f172a;
}
body { background: var(--bg); color: var(--text); }
.quiz-box { background: var(--card); }</pre>
<h3>Переключатель в JS</h3>
<pre>function toggleTheme() {
  const isLight = document.body.dataset.theme === 'light';
  document.body.dataset.theme = isLight ? 'dark' : 'light';
  localStorage.setItem('quiz-theme', document.body.dataset.theme);
}</pre>` },
    `<button onclick="toggleTheme()" id="theme-btn">🌙 Темна тема</button>
<div class="quiz-box" style="margin-top:12px">
  <div class="q-title">Столиця Франції?</div>
  <button class="q-ans">Лондон</button>
  <button class="q-ans">Париж</button>
</div>`,
    `:root{ --bg:#0f172a; --card:#1e293b; --text:#f1f5f9; --border:#334155; }
[data-theme="light"]{ --bg:#f8fafc; --card:#ffffff; --text:#0f172a; --border:#e2e8f0; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);padding:20px;transition:.3s}
.quiz-box{max-width:380px;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;transition:.3s}
.q-title{font-size:15px;font-weight:700;margin-bottom:14px}
.q-ans{display:block;width:100%;text-align:left;margin-bottom:8px;padding:11px 14px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:8px;cursor:pointer}
#theme-btn{background:var(--card);border:1px solid var(--border);color:var(--text);padding:8px 16px;border-radius:8px;cursor:pointer}`,
    `function toggleTheme() {
  const isLight = document.body.dataset.theme === 'light';
  document.body.dataset.theme = isLight ? 'dark' : 'light';
  document.getElementById('theme-btn').textContent = isLight ? '🌙 Темна тема' : '☀️ Світла тема';
}`,
    [
      { level:'easy',   uk:'Натисни кнопку кілька разів і подивись, як перемикається тема квізу.', ru:'Нажми кнопку несколько раз и посмотри, как переключается тема квиза.' },
      { level:'medium', uk:'Додай третю CSS-змінну <code>--accent</code> (наприклад #7c3aed для темної, #0ea5e9 для світлої) і застосуй її до рамки .q-ans при :hover.', ru:'Добавь третью CSS-переменную <code>--accent</code> и примени её к рамке .q-ans при :hover.' },
      { level:'hard',   uk:'Збережи вибрану тему в <code>localStorage.setItem(\'quiz-theme\', ...)</code> і при завантаженні сторінки зчитай її, щоб тема не скидалась.', ru:'Сохрани выбранную тему в localStorage и при загрузке страницы считай её, чтобы тема не сбрасывалась.' },
    ]
  );

  /* ─── 11-12: Звукові ефекти — правильно / неправильно ────────── */
  patch('11-12',
    { uk:`<h2>Звукові ефекти: правильно / неправильно</h2>
<p>Замість аудіофайлів (які треба десь хостити) використаємо <strong>Web Audio API</strong> — він генерує звук прямо в браузері, без жодних файлів.</p>
<h3>Простий "біп" через осцилятор</h3>
<pre>function beep(freq, duration) {
  const ctx = new AudioContext();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;      // висота звуку в Гц
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

beep(880, 0.15); // правильно — високий короткий звук
beep(220, 0.3);  // неправильно — низький звук</pre>
<p>Вищі частоти (Гц) звучать "радісніше", нижчі — "сумніше". Це проста психоакустика, яку використовують в іграх.</p>`,
      ru:`<h2>Звуковые эффекты: правильно / неправильно</h2>
<p>Вместо аудиофайлов используем <strong>Web Audio API</strong> — он генерирует звук прямо в браузере, без файлов.</p>
<h3>Простой "бип" через осциллятор</h3>
<pre>function beep(freq, duration) {
  const ctx = new AudioContext();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

beep(880, 0.15); // правильно
beep(220, 0.3);  // неправильно</pre>
<p>Более высокие частоты звучат "радостнее", более низкие — "грустнее".</p>` },
    `<div class="quiz-box" style="text-align:center">
  <p>Натисни, щоб почути звук ефекту:</p>
  <div class="btn-row" style="display:flex;gap:8px;justify-content:center;margin-top:10px">
    <button onclick="playCorrect()">✅ Правильно</button>
    <button onclick="playWrong()">❌ Неправильно</button>
  </div>
</div>`,
    `${BASE}`,
    `function beep(freq, duration) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playCorrect() { beep(880, 0.15); }
function playWrong()   { beep(220, 0.3); }`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і порівняй звук правильної і неправильної відповіді.', ru:'Нажми обе кнопки и сравни звук правильного и неправильного ответа.' },
      { level:'medium', uk:'Зміни частоту playCorrect() з 880 на 1200 — звук стане ще вищим.', ru:'Измени частоту playCorrect() с 880 на 1200 — звук станет ещё выше.' },
      { level:'hard',   uk:'Додай функцію <code>playCorrect()</code> версію з двома нотами поспіль (виклич <code>beep(880,0.1)</code>, а через <code>setTimeout(() => beep(1200,0.15), 100)</code>) — вийде "тада!"-ефект.', ru:'Сделай двухнотную версию playCorrect() (beep(880,0.1), затем через setTimeout beep(1200,0.15)) — получится эффект "тада!".' },
    ]
  );

  /* ─── 11-13: Хіт-таблиця рекордів із localStorage ────────────── */
  patch('11-13',
    { uk:`<h2>Хіт-таблиця рекордів із localStorage</h2>
<p>Одного найкращого результату мало — зробимо справжню таблицю лідерів: топ-5 найкращих спроб з іменем гравця.</p>
<h3>Зберігаємо масив об'єктів через JSON</h3>
<pre>function addToLeaderboard(name, score) {
  const board = JSON.parse(localStorage.getItem('quiz-board') || '[]');
  board.push({ name, score, date: new Date().toLocaleDateString('uk') });
  board.sort((a, b) => b.score - a.score);   // за спаданням
  const top5 = board.slice(0, 5);
  localStorage.setItem('quiz-board', JSON.stringify(top5));
  return top5;
}</pre>
<h3>Чому JSON.stringify / parse</h3>
<p>localStorage вміє зберігати лише текст. <code>JSON.stringify</code> перетворює масив об'єктів у текст для збереження, <code>JSON.parse</code> — повертає його назад у масив при читанні.</p>`,
      ru:`<h2>Хит-таблица рекордов с localStorage</h2>
<p>Одного лучшего результата мало — сделаем настоящую таблицу лидеров: топ-5 лучших попыток с именем игрока.</p>
<h3>Сохраняем массив объектов через JSON</h3>
<pre>function addToLeaderboard(name, score) {
  const board = JSON.parse(localStorage.getItem('quiz-board') || '[]');
  board.push({ name, score, date: new Date().toLocaleDateString('ru') });
  board.sort((a, b) => b.score - a.score);
  const top5 = board.slice(0, 5);
  localStorage.setItem('quiz-board', JSON.stringify(top5));
  return top5;
}</pre>
<h3>Почему JSON.stringify / parse</h3>
<p>localStorage хранит только текст. <code>JSON.stringify</code> превращает массив объектов в текст, <code>JSON.parse</code> — возвращает обратно в массив при чтении.</p>` },
    `<div class="quiz-box">
  <h3>Додати результат</h3>
  <input type="text" id="name-input" placeholder="Твоє ім'я" style="width:100%;padding:9px;margin-bottom:8px;background:#0f172a;border:1px solid #334155;color:#f1f5f9;border-radius:8px">
  <input type="number" id="score-input" placeholder="Рахунок (0-10)" style="width:100%;padding:9px;margin-bottom:10px;background:#0f172a;border:1px solid #334155;color:#f1f5f9;border-radius:8px">
  <button onclick="addScore()">➕ Додати в таблицю</button>
  <h3 style="margin-top:16px">🏆 Топ-5</h3>
  <ol id="board-list" style="padding-left:20px;font-size:13px;color:#cbd5e1;line-height:1.9"></ol>
</div>`,
    `${BASE}`,
    `function renderBoard() {
  const board = JSON.parse(localStorage.getItem('quiz-board') || '[]');
  document.getElementById('board-list').innerHTML = board.map(item =>
    '<li>' + item.name + ' — <strong>' + item.score + '</strong> (' + item.date + ')</li>'
  ).join('');
}

function addToLeaderboard(name, score) {
  const board = JSON.parse(localStorage.getItem('quiz-board') || '[]');
  board.push({ name: name, score: score, date: new Date().toLocaleDateString() });
  board.sort((a, b) => b.score - a.score);
  const top5 = board.slice(0, 5);
  localStorage.setItem('quiz-board', JSON.stringify(top5));
  return top5;
}

function addScore() {
  const name = document.getElementById('name-input').value.trim() || 'Гравець';
  const score = Number(document.getElementById('score-input').value) || 0;
  addToLeaderboard(name, score);
  renderBoard();
  document.getElementById('name-input').value = '';
  document.getElementById('score-input').value = '';
}

renderBoard();`,
    [
      { level:'easy',   uk:'Додай 3-4 результати з різними іменами і рахунками — переконайся, що таблиця сортується за спаданням.', ru:'Добавь 3-4 результата с разными именами и счётом — убедись, что таблица сортируется по убыванию.' },
      { level:'medium', uk:'Додай кнопку "Очистити таблицю" яка викликає <code>localStorage.removeItem(\'quiz-board\')</code> і <code>renderBoard()</code>.', ru:'Добавь кнопку "Очистить таблицу", вызывающую <code>localStorage.removeItem(\'quiz-board\')</code>.' },
      { level:'hard',   uk:'Зроби так, щоб у списку топ-3 позиції мали медальки: 1 місце — 🥇, 2 — 🥈, 3 — 🥉 замість номера (використай <code>board.map((item, i) => ...)</code>).', ru:'Сделай так, чтобы у топ-3 позиций были медали: 1 место — 🥇, 2 — 🥈, 3 — 🥉.' },
    ]
  );

  /* ─── 11-14: Документування коду — JSDoc-коментарі ───────────── */
  patch('11-14',
    { uk:`<h2>Документування коду: JSDoc-коментарі</h2>
<p><strong>JSDoc</strong> — стандартний формат коментарів, що описує, що робить функція, які параметри приймає і що повертає. Редактори коду (VS Code) читають JSDoc і підказують типи прямо під час набору коду.</p>
<h3>Синтаксис</h3>
<pre>/**
 * Перевіряє відповідь гравця і повертає, чи вона правильна.
 * @param {number} chosenIndex - індекс обраного варіанту
 * @param {number} correctIndex - індекс правильної відповіді
 * @returns {boolean} true, якщо відповідь правильна
 */
function checkAnswer(chosenIndex, correctIndex) {
  return chosenIndex === correctIndex;
}</pre>
<h3>Навіщо це в невеликому проекті?</h3>
<p>Навіть у соло-проекті через місяць ти забудеш, що саме робить функція <code>calcPercent(a,b)</code>. JSDoc — це "нотатка собі з майбутнього", яка економить час.</p>
<h3>Основні теги</h3>
<pre>@param {тип} назва - опис
@returns {тип} опис
@example  - приклад використання
@throws  - коли функція кидає помилку</pre>`,
      ru:`<h2>Документирование кода: JSDoc-комментарии</h2>
<p><strong>JSDoc</strong> — стандартный формат комментариев, описывающий, что делает функция, какие параметры принимает и что возвращает. Редакторы кода (VS Code) читают JSDoc и подсказывают типы.</p>
<h3>Синтаксис</h3>
<pre>/**
 * Проверяет ответ игрока и возвращает, правильный ли он.
 * @param {number} chosenIndex - индекс выбранного варианта
 * @param {number} correctIndex - индекс правильного ответа
 * @returns {boolean} true, если ответ правильный
 */
function checkAnswer(chosenIndex, correctIndex) {
  return chosenIndex === correctIndex;
}</pre>
<h3>Зачем это в небольшом проекте?</h3>
<p>Даже в соло-проекте через месяц ты забудешь, что делает функция <code>calcPercent(a,b)</code>. JSDoc экономит время.</p>
<h3>Основные теги</h3>
<pre>@param {тип} название - описание
@returns {тип} описание
@example  - пример использования
@throws  - когда функция кидает ошибку</pre>` },
    `<h2>Документована функція квізу</h2>
<p>Натисни кнопку — виконається задокументована функція <code>calcPercent()</code>, а її JSDoc-опис покажеться нижче.</p>
<button onclick="runDemo()">▶ Викликати calcPercent(7, 10)</button>
<pre id="doc-out" style="margin-top:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:12px;white-space:pre-wrap;color:#94a3b8"></pre>`,
    `${BASE}`,
    `/**
 * Обчислює відсоток правильних відповідей.
 * @param {number} score - кількість правильних відповідей
 * @param {number} total - загальна кількість питань
 * @returns {number} відсоток, округлений до цілого числа
 * @example
 * calcPercent(7, 10); // 70
 */
function calcPercent(score, total) {
  return Math.round((score / total) * 100);
}

function runDemo() {
  const result = calcPercent(7, 10);
  document.getElementById('doc-out').textContent =
    'calcPercent(7, 10) виконано.\\n' +
    'Результат: ' + result + '%\\n\\n' +
    'JSDoc функції:\\n' +
    '@param {number} score - кількість правильних відповідей\\n' +
    '@param {number} total - загальна кількість питань\\n' +
    '@returns {number} відсоток, округлений до цілого числа';
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись і на результат, і на JSDoc-опис функції.', ru:'Нажми кнопку и посмотри и на результат, и на JSDoc-описание функции.' },
      { level:'medium', uk:'Напиши свій JSDoc-коментар (за зразком) для нової функції <code>function getGrade(percent) { return percent >= 90 ? "A" : "B"; }</code> — додай @param і @returns.', ru:'Напиши свой JSDoc-комментарий для новой функции getGrade(percent) — добавь @param и @returns.' },
      { level:'hard',   uk:'Додай до JSDoc функції calcPercent() тег <code>@throws {Error} якщо total дорівнює 0</code> і додай реальну перевірку в тілі функції: <code>if (total === 0) throw new Error(\'total не може бути 0\');</code>.', ru:'Добавь в JSDoc тег @throws и реальную проверку в теле функции на total === 0.' },
    ]
  );

  /* ─── 11-15: ФІНАЛ — Квіз-гра (повний проект) ────────────────── */
  patch('11-15',
    { uk:`<h2>ФІНАЛ 1: Квіз-гра</h2>
<p>Фінальний проект модуля — повністю робочий квіз, що поєднує все вивчене: рендеринг питань, підрахунок балів, прогрес-бар, таймер, екран результату, анімації, темну тему і найкращий результат у <code>localStorage</code>.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ Масив питань і рендеринг у DOM</li>
  <li>✅ Обробка відповіді + підрахунок балів</li>
  <li>✅ Progress bar і лічильник питань</li>
  <li>✅ Таймер 15 секунд на питання</li>
  <li>✅ Екран результату з похвалою</li>
  <li>✅ Найкращий результат у localStorage</li>
  <li>✅ Перемикач теми</li>
</ul>
<p>Відкрий вкладку JS у редакторі й вивчи повний код — саме так виглядає невеликий, але завершений JS-проект.</p>`,
      ru:`<h2>ФИНАЛ 1: Квиз-игра</h2>
<p>Финальный проект модуля — полностью рабочий квиз, объединяющий всё изученное: рендеринг вопросов, подсчёт баллов, progress bar, таймер, экран результата, анимации, тёмную тему и лучший результат в localStorage.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ Массив вопросов и рендеринг в DOM</li>
  <li>✅ Обработка ответа + подсчёт баллов</li>
  <li>✅ Progress bar и счётчик вопросов</li>
  <li>✅ Таймер 15 секунд на вопрос</li>
  <li>✅ Экран результата с похвалой</li>
  <li>✅ Лучший результат в localStorage</li>
  <li>✅ Переключатель темы</li>
</ul>
<p>Открой вкладку JS в редакторе и изучи полный код.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<style>
:root{ --bg:#0f172a; --card:#1e293b; --text:#f1f5f9; --border:#334155; --accent:#7c3aed; }
[data-theme="light"]{ --bg:#f1f5f9; --card:#ffffff; --text:#0f172a; --border:#e2e8f0; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);padding:24px;display:flex;justify-content:center;transition:.3s}
.wrap{width:100%;max-width:420px}
.top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:12px;color:#94a3b8}
.progress{height:8px;background:var(--border);border-radius:4px;overflow:hidden;margin-bottom:16px}
.progress-fill{width:0;height:100%;background:linear-gradient(90deg,#7c3aed,#a78bfa);transition:width .3s ease}
.card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;transition:.3s}
.q-title{font-size:16px;font-weight:700;margin-bottom:16px}
.q-ans{display:block;width:100%;text-align:left;margin-bottom:8px;padding:12px 14px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:10px;cursor:pointer;font-size:14px;transition:.15s}
.q-ans:hover{border-color:var(--accent)}
.q-ans.correct{background:rgba(74,222,128,.15);border-color:#4ade80;color:#4ade80}
.q-ans.wrong{background:rgba(248,113,113,.15);border-color:#f87171;color:#f87171}
.result{text-align:center;display:none}
.result-emoji{font-size:42px;margin-bottom:8px}
.result-percent{font-size:26px;font-weight:900}
.result-msg{font-size:13px;color:#94a3b8;margin-top:8px}
.best-line{font-size:12px;color:#64748b;margin-top:14px;text-align:center}
button.theme-btn{margin-top:14px;width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:9px;border-radius:8px;cursor:pointer;font-size:13px}
button.retry-btn{margin-top:14px;width:100%;background:var(--accent);border:none;color:#fff;padding:11px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700}
@keyframes slideOut{to{transform:translateX(-24px);opacity:0}}
@keyframes slideIn{from{transform:translateX(24px);opacity:0}}
.leaving{animation:slideOut .2s ease forwards}
.entering{animation:slideIn .2s ease forwards}
</style>
</head>
<body>
<div class="wrap">
  <div class="top-bar">
    <span id="q-counter">Питання 1 / 5</span>
    <span id="timer">⏱ 15</span>
  </div>
  <div class="progress"><div class="progress-fill" id="progress-fill"></div></div>

  <div class="card" id="quiz-card">
    <div class="q-title" id="q-title">—</div>
    <div id="q-answers"></div>
  </div>

  <div class="card result" id="result-card">
    <div class="result-emoji" id="result-emoji">🎉</div>
    <div class="result-percent" id="result-percent">0%</div>
    <div class="result-msg" id="result-msg">—</div>
    <button class="retry-btn" onclick="restartQuiz()">🔄 Пройти ще раз</button>
  </div>

  <div class="best-line" id="best-line">Найкращий результат: 0</div>
  <button class="theme-btn" onclick="toggleTheme()" id="theme-btn">🌙 Темна тема</button>
</div>

<script>
var QUESTIONS = [
  { q: 'Столиця Франції?', options: ['Лондон', 'Париж', 'Берлін', 'Рим'], correct: 1 },
  { q: 'Яка планета найбільша в Сонячній системі?', options: ['Марс', 'Юпітер', 'Земля', 'Венера'], correct: 1 },
  { q: '5 x 5 = ?', options: ['20', '25', '30', '15'], correct: 1 },
  { q: 'Скільки днів у році?', options: ['360', '365', '300', '400'], correct: 1 },
  { q: 'Хто написав "Кобзар"?', options: ['Франко', 'Шевченко', 'Леся Українка', 'Пушкін'], correct: 1 }
];
var current = 0;
var score = 0;
var timerId = null;
var answered = false;

function beep(freq, duration) {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) { /* Web Audio недоступний — тихо ігноруємо */ }
}

function startTimer() {
  clearInterval(timerId);
  var timeLeft = 15;
  var el = document.getElementById('timer');
  el.textContent = '⏱ ' + timeLeft;
  el.style.color = '#94a3b8';
  timerId = setInterval(function () {
    timeLeft--;
    el.textContent = '⏱ ' + timeLeft;
    el.style.color = timeLeft <= 3 ? '#f87171' : '#94a3b8';
    if (timeLeft <= 0) { clearInterval(timerId); onAnswer(-1); }
  }, 1000);
}

function renderQuestion(index) {
  answered = false;
  var item = QUESTIONS[index];
  document.getElementById('q-counter').textContent = 'Питання ' + (index + 1) + ' / ' + QUESTIONS.length;
  document.getElementById('progress-fill').style.width = ((index + 1) / QUESTIONS.length * 100) + '%';
  document.getElementById('q-title').textContent = item.q;
  var box = document.getElementById('q-answers');
  box.innerHTML = '';
  item.options.forEach(function (opt, i) {
    var btn = document.createElement('button');
    btn.className = 'q-ans';
    btn.textContent = opt;
    btn.dataset.index = i;
    btn.addEventListener('click', function () { onAnswer(i); });
    box.appendChild(btn);
  });
  startTimer();
}

function onAnswer(chosen) {
  if (answered) return;
  answered = true;
  clearInterval(timerId);
  var item = QUESTIONS[current];
  var buttons = document.querySelectorAll('.q-ans');
  buttons[item.correct].classList.add('correct');
  if (chosen !== item.correct && chosen >= 0) buttons[chosen].classList.add('wrong');
  if (chosen === item.correct) { score++; beep(880, 0.15); } else { beep(220, 0.3); }

  setTimeout(function () {
    var card = document.getElementById('quiz-card');
    card.classList.add('leaving');
    setTimeout(function () {
      current++;
      card.classList.remove('leaving');
      card.classList.add('entering');
      setTimeout(function () { card.classList.remove('entering'); }, 210);
      if (current < QUESTIONS.length) renderQuestion(current);
      else showResult();
    }, 200);
  }, 700);
}

function getMessage(percent) {
  if (percent === 100) return '🏆 Ідеально! Жодної помилки!';
  if (percent >= 70) return '🎉 Чудовий результат!';
  if (percent >= 40) return '👍 Непогано, спробуй ще раз!';
  return '💪 Тренуйся — наступного разу буде краще!';
}

function updateBestLine() {
  var best = Number(localStorage.getItem('quiz-best') || 0);
  document.getElementById('best-line').textContent = 'Найкращий результат: ' + best + ' / ' + QUESTIONS.length;
}

function saveBestScore(s) {
  var best = Number(localStorage.getItem('quiz-best') || 0);
  if (s > best) { localStorage.setItem('quiz-best', s); return true; }
  return false;
}

function showResult() {
  clearInterval(timerId);
  document.getElementById('quiz-card').style.display = 'none';
  var percent = Math.round((score / QUESTIONS.length) * 100);
  var isRecord = saveBestScore(score);
  document.getElementById('result-card').style.display = 'block';
  document.getElementById('result-percent').textContent = percent + '% (' + score + ' / ' + QUESTIONS.length + ')';
  document.getElementById('result-msg').textContent = getMessage(percent) + (isRecord ? ' 🏆 Новий рекорд!' : '');
  document.getElementById('result-emoji').textContent = percent === 100 ? '🏆' : (percent >= 70 ? '🎉' : (percent >= 40 ? '👍' : '💪'));
  updateBestLine();
}

function restartQuiz() {
  current = 0; score = 0;
  document.getElementById('result-card').style.display = 'none';
  document.getElementById('quiz-card').style.display = 'block';
  renderQuestion(0);
}

function toggleTheme() {
  var isLight = document.body.dataset.theme === 'light';
  document.body.dataset.theme = isLight ? 'dark' : 'light';
  document.getElementById('theme-btn').textContent = isLight ? '🌙 Темна тема' : '☀️ Світла тема';
}

updateBestLine();
renderQuestion(current);
<\/script>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Пройди квіз повністю — перевір, що прогрес-бар, таймер, підрахунок балів і фінальний екран працюють разом.', ru:'Пройди квиз полностью — проверь, что progress bar, таймер, подсчёт баллов и финальный экран работают вместе.' },
      { level:'medium', uk:'Додай у масив QUESTIONS ще одне (шосте) питання зі своєю темою — переконайся, що прогрес-бар і лічильник враховують нову довжину масиву автоматично.', ru:'Добавь в массив QUESTIONS ещё один (шестой) вопрос на свою тему.' },
      { level:'hard',   uk:'Дай кожному питанню власний ліміт часу: додай поле <code>time</code> у кожен об\'єкт питання і використай <code>QUESTIONS[current].time</code> замість фіксованих 15 секунд у <code>startTimer()</code>.', ru:'Дай каждому вопросу свой лимит времени: добавь поле time в каждый объект вопроса и используй его в startTimer().' },
      { level:'extra',  uk:'Перетвори localStorage-рекорд на повноцінну хіт-таблицю топ-5 (як у уроці 11-13): проси ім\'я гравця перед стартом квізу через <code>prompt()</code> і зберігай результат у масив об\'єктів у localStorage.', ru:'Преврати рекорд localStorage в полноценную таблицу топ-5 (как в уроке 11-13): проси имя игрока через prompt() перед стартом.' },
    ]
  );

})();
