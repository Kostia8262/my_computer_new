/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 13 — Проект 3: Погода + API · 10–14
   Патчить WEB_LESSONS після завантаження lessons.js
   Використовує реальний безкоштовний Open-Meteo API (без ключа)
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
input{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:9px 12px;border-radius:8px;font-size:13px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
button:hover{border-color:#38bdf8;color:#7dd3fc}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.weather-card{max-width:340px;background:#1e293b;border:1px solid #334155;border-radius:16px;padding:20px}
.err{color:#f87171;font-size:12.5px;margin-top:8px}`;

  /* Спільна таблиця WMO weather code -> emoji/опис (використовується у кількох уроках) */
  const WCODE_NOTE = `<h3>Коди погоди WMO (weathercode)</h3>
<pre>0        — Ясно
1, 2, 3  — Переважно ясно / мінлива хмарність / хмарно
45, 48   — Туман
51-55    — Мряка
61-65    — Дощ (легкий/помірний/сильний)
71-75    — Сніг
80-82    — Зливи
95       — Гроза</pre>`;

  /* ─── 13-01: Планування погодного застосунку ─────────────────── */
  patch('13-01',
    { uk:`<h2>Планування погодного застосунку</h2>
<p>Третій великий проект курсу — застосунок погоди з <strong>реальними даними з інтернету</strong>. На відміну від квізу й портфоліо, тут дані беруться не з масиву в коді, а з живого API.</p>
<h3>Вимоги до проекту</h3>
<ul>
  <li>Пошук міста → показ поточної погоди (температура, іконка, опис)</li>
  <li>Прогноз на 5 днів наперед</li>
  <li>Кнопка "Моя геолокація" — погода за поточним місцем</li>
  <li>Збережений список улюблених міст (localStorage)</li>
  <li>Перемикач Цельсій / Фаренгейт</li>
  <li>Адаптивний дизайн і обробка помилок (місто не знайдено, немає інтернету)</li>
</ul>
<h3>Звідки беремо дані</h3>
<p>Використаємо <strong>Open-Meteo</strong> — безкоштовний погодний API, який не потребує реєстрації чи ключа доступу. Ідеально підходить для навчального проекту.</p>
<h3>Wireframe</h3>
<pre>┌───────────────────────┐
│ 🔍 [ Київ         ][x] │
│                        │
│   ☀️  Київ             │
│      +18°C             │
│   Ясно                 │
│                        │
│  Пн  Вт  Ср  Чт  Пт    │
│  20  19  17  21  22    │
└───────────────────────┘</pre>`,
      ru:`<h2>Планирование погодного приложения</h2>
<p>Третий большой проект курса — приложение погоды с <strong>реальными данными из интернета</strong>. В отличие от квиза и портфолио, данные берутся не из массива в коде, а из живого API.</p>
<h3>Требования к проекту</h3>
<ul>
  <li>Поиск города → показ текущей погоды</li>
  <li>Прогноз на 5 дней вперёд</li>
  <li>Кнопка "Моя геолокация"</li>
  <li>Сохранённый список избранных городов (localStorage)</li>
  <li>Переключатель Цельсий / Фаренгейт</li>
  <li>Адаптивный дизайн и обработка ошибок</li>
</ul>
<h3>Откуда берём данные</h3>
<p>Используем <strong>Open-Meteo</strong> — бесплатный погодный API без регистрации и ключа доступа.</p>
<h3>Wireframe</h3>
<pre>┌───────────────────────┐
│ 🔍 [ Киев         ][x] │
│                        │
│   ☀️  Киев             │
│      +18°C             │
│   Ясно                 │
│                        │
│  Пн  Вт  Ср  Чт  Пт    │
│  20  19  17  21  22    │
└───────────────────────┘</pre>` },
    `<div class="wf">
  <div class="wf-row">🔍 Пошук міста + кнопка геолокації</div>
  <div class="wf-row wf-big">☀️ Поточна погода (іконка + температура)</div>
  <div class="wf-row">📅 Прогноз на 5 днів</div>
  <div class="wf-row">⭐ Улюблені міста</div>
  <div class="wf-row">🌡️ Перемикач °C / °F</div>
</div>`,
    `${BASE}
.wf{max-width:360px;display:flex;flex-direction:column;gap:8px}
.wf-row{border:2px dashed #475569;border-radius:10px;padding:14px;color:#94a3b8;font-size:13px}
.wf-big{padding:26px;color:#cbd5e1;font-weight:600}`,
    ``,
    [
      { level:'easy',   uk:'Перелічи вголос усі 5 частин wireframe і поясни, що робить кожна.', ru:'Перечисли вслух все 5 частей wireframe и объясни, что делает каждая.' },
      { level:'medium', uk:'Додай у wireframe рядок "⚠️ Повідомлення про помилку (місто не знайдено)" в самий низ.', ru:'Добавь в wireframe строку "⚠️ Сообщение об ошибке" в самый низ.' },
      { level:'hard',   uk:'Познач у теорії, яка з вимог, на твою думку, найскладніша технічно, і поясни чому (наприклад, чому геолокація складніша за просте введення міста).', ru:'Отметь, какое из требований самое сложное технически, и объясни почему.' },
    ]
  );

  /* ─── 13-02: Реєстрація та ключ API ──────────────────────────── */
  patch('13-02',
    { uk:`<h2>Реєстрація та ключ API</h2>
<p>Більшість погодних сервісів (наприклад OpenWeatherMap) вимагають реєстрації: ти створюєш акаунт, отримуєш <strong>API-ключ</strong> (довгий унікальний рядок) і додаєш його до кожного запиту, щоб сервіс знав, хто звертається.</p>
<h3>Типовий запит із ключем</h3>
<pre>fetch('https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=ТВІЙ_КЛЮЧ')</pre>
<p>Ключ — секрет: якщо покажеш його стороннім, вони зможуть використовувати твій ліміт запитів.</p>
<h3>Open-Meteo: без ключа</h3>
<p>Для цього курсу ми обрали <strong>Open-Meteo</strong> — API, який спеціально зроблено відкритим і безкоштовним для некомерційного використання, <strong>без реєстрації й без ключа</strong>. Це ідеально для навчального проекту: можна одразу писати <code>fetch()</code> і отримувати дані.</p>
<pre>fetch('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current_weather=true')
  .then(res => res.json())
  .then(data => console.log(data));</pre>
<h3>Два кроки для пошуку за назвою міста</h3>
<p>Open-Meteo окремо надає <strong>Geocoding API</strong> — перетворює назву міста на координати (широта/довгота), які потім передаються у forecast-запит. Це побачимо в наступному уроці.</p>`,
      ru:`<h2>Регистрация и ключ API</h2>
<p>Большинство погодных сервисов (например OpenWeatherMap) требуют регистрации: создаёшь аккаунт, получаешь <strong>API-ключ</strong> и добавляешь его к каждому запросу.</p>
<h3>Типичный запрос с ключом</h3>
<pre>fetch('https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=ТВОЙ_КЛЮЧ')</pre>
<p>Ключ — секрет: если покажешь его посторонним, они смогут использовать твой лимит запросов.</p>
<h3>Open-Meteo: без ключа</h3>
<p>Для этого курса мы выбрали <strong>Open-Meteo</strong> — API, специально сделанный открытым и бесплатным для некоммерческого использования, <strong>без регистрации и без ключа</strong>.</p>
<pre>fetch('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current_weather=true')
  .then(res => res.json())
  .then(data => console.log(data));</pre>
<h3>Два шага для поиска по названию города</h3>
<p>Open-Meteo отдельно предоставляет <strong>Geocoding API</strong> — превращает название города в координаты, которые потом передаются в forecast-запрос.</p>` },
    `<h2>Перший запит без ключа</h2>
<p>Натисни кнопку — зробимо реальний fetch-запит до Open-Meteo для координат Києва (без жодного ключа доступу):</p>
<button onclick="testFetch()">▶ fetch() до Open-Meteo</button>
<pre id="out" style="margin-top:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:12px;white-space:pre-wrap;color:#94a3b8;min-height:60px"></pre>`,
    `${BASE}`,
    `function testFetch() {
  var out = document.getElementById('out');
  out.textContent = 'Завантаження...';
  fetch('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current_weather=true')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      out.textContent = 'Успіх! Дані без жодного API-ключа:\\n\\n' + JSON.stringify(data.current_weather, null, 2);
    })
    .catch(function (err) {
      out.textContent = '⚠ Не вдалося завантажити (можливо, немає інтернету в цій пісочниці): ' + err.message;
    });
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись на реальну відповідь від Open-Meteo — знайди там температуру (temperature).', ru:'Нажми кнопку и посмотри на реальный ответ от Open-Meteo — найди там температуру.' },
      { level:'medium', uk:'Зміни координати в URL на широту/довготу свого міста (пошукай в інтернеті "координати [твоє місто]") і перевір результат.', ru:'Измени координаты в URL на координаты своего города и проверь результат.' },
      { level:'hard',   uk:'Додай у URL параметр <code>&timezone=auto</code> в кінці рядка запиту — подивись, як зміниться поле <code>time</code> у відповіді.', ru:'Добавь в URL параметр &timezone=auto — посмотри, как изменится поле time в ответе.' },
    ]
  );

  /* ─── 13-03: Fetch поточної погоди за назвою міста ─────────────── */
  patch('13-03',
    { uk:`<h2>Fetch поточної погоди за назвою міста</h2>
<p>Користувач вводить назву міста текстом, а Open-Meteo forecast API розуміє лише координати. Тому потрібні <strong>два послідовні fetch-запити</strong>.</p>
<h3>Крок 1: Geocoding — назва → координати</h3>
<pre>const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' +
  encodeURIComponent(cityName) + '&count=1&language=uk';
const geoData = await (await fetch(geoUrl)).json();
const { latitude, longitude, name } = geoData.results[0];</pre>
<h3>Крок 2: Forecast — координати → погода</h3>
<pre>const wUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude +
  '&longitude=' + longitude + '&current_weather=true';
const weather = await (await fetch(wUrl)).json();</pre>
<h3>encodeURIComponent — навіщо?</h3>
<p>Назви міст можуть містити пробіли й особливі символи ("Нью-Йорк", "Івано-Франківськ"). <code>encodeURIComponent()</code> перетворює їх у безпечний для URL формат.</p>`,
      ru:`<h2>Fetch текущей погоды по названию города</h2>
<p>Пользователь вводит название города текстом, а Open-Meteo forecast API понимает только координаты. Поэтому нужны <strong>два последовательных fetch-запроса</strong>.</p>
<h3>Шаг 1: Geocoding — название → координаты</h3>
<pre>const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' +
  encodeURIComponent(cityName) + '&count=1&language=ru';
const geoData = await (await fetch(geoUrl)).json();
const { latitude, longitude, name } = geoData.results[0];</pre>
<h3>Шаг 2: Forecast — координаты → погода</h3>
<pre>const wUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude +
  '&longitude=' + longitude + '&current_weather=true';
const weather = await (await fetch(wUrl)).json();</pre>
<h3>encodeURIComponent — зачем?</h3>
<p>Названия городов могут содержать пробелы и спецсимволы. encodeURIComponent() превращает их в безопасный для URL формат.</p>` },
    `<input type="text" id="city-input" placeholder="Введи назву міста..." value="Київ">
<button onclick="searchCity()">🔍 Знайти</button>
<pre id="result" style="margin-top:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:12.5px;white-space:pre-wrap;color:#94a3b8;min-height:80px"></pre>`,
    `${BASE}`,
    `async function searchCity() {
  var city = document.getElementById('city-input').value.trim();
  var out = document.getElementById('result');
  if (!city) return;
  out.textContent = 'Шукаємо місто...';

  try {
    var geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1&language=uk';
    var geoRes = await fetch(geoUrl);
    var geoData = await geoRes.json();

    if (!geoData.results || !geoData.results.length) {
      out.textContent = '❌ Місто "' + city + '" не знайдено.';
      return;
    }

    var place = geoData.results[0];
    out.textContent = 'Знайдено: ' + place.name + ' (' + place.latitude + ', ' + place.longitude + ')\\nЗавантажуємо погоду...';

    var wUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + place.latitude + '&longitude=' + place.longitude + '&current_weather=true';
    var wRes = await fetch(wUrl);
    var wData = await wRes.json();

    out.textContent = place.name + ': ' + wData.current_weather.temperature + '°C, вітер ' + wData.current_weather.windspeed + ' км/год';
  } catch (err) {
    out.textContent = '⚠ Помилка мережі: ' + err.message;
  }
}`,
    [
      { level:'easy',   uk:'Знайди погоду для Києва, потім зміни поле на "Лондон" і знайди ще раз.', ru:'Найди погоду для Киева, потом измени поле на "Лондон" и найди снова.' },
      { level:'medium', uk:'Введи неіснуюче місто (наприклад "Асдфасдф") — переконайся, що бачиш повідомлення "не знайдено", а не помилку JS.', ru:'Введи несуществующий город — убедись, что видишь сообщение "не найдено", а не ошибку JS.' },
      { level:'hard',   uk:'Додай у вивід ще й <code>wData.current_weather.winddirection</code> (напрямок вітру в градусах) окремим рядком.', ru:'Добавь в вывод winddirection (направление ветра) отдельной строкой.' },
    ]
  );

  /* ─── 13-04: Рендеринг поточної погоди — іконка, температура ───── */
  patch('13-04',
    { uk:`<h2>Рендеринг поточної погоди: іконка, температура</h2>
<p>Open-Meteo повертає погоду як число <strong>weathercode</strong> (стандарт WMO), а не текст чи emoji. Потрібна власна таблиця відповідності "код → іконка + опис".</p>
${WCODE_NOTE}
<h3>Функція-перекладач коду</h3>
<pre>function getWeatherInfo(code) {
  if (code === 0) return { emoji: '☀️', text: 'Ясно' };
  if (code <= 3)  return { emoji: '⛅', text: 'Хмарно' };
  if (code <= 48) return { emoji: '🌫️', text: 'Туман' };
  if (code <= 55) return { emoji: '🌦️', text: 'Мряка' };
  if (code <= 65) return { emoji: '🌧️', text: 'Дощ' };
  if (code <= 75) return { emoji: '❄️', text: 'Сніг' };
  if (code <= 82) return { emoji: '🌧️', text: 'Зливи' };
  return { emoji: '⛈️', text: 'Гроза' };
}</pre>
<p>Порядок перевірок важливий: <code>if</code> зверху вниз, тому спочатку перевіряємо найменші коди.</p>`,
      ru:`<h2>Рендеринг текущей погоды: иконка, температура</h2>
<p>Open-Meteo возвращает погоду как число <strong>weathercode</strong> (стандарт WMO), а не текст или emoji.</p>
${WCODE_NOTE}
<h3>Функция-переводчик кода</h3>
<pre>function getWeatherInfo(code) {
  if (code === 0) return { emoji: '☀️', text: 'Ясно' };
  if (code <= 3)  return { emoji: '⛅', text: 'Облачно' };
  if (code <= 48) return { emoji: '🌫️', text: 'Туман' };
  if (code <= 55) return { emoji: '🌦️', text: 'Морось' };
  if (code <= 65) return { emoji: '🌧️', text: 'Дождь' };
  if (code <= 75) return { emoji: '❄️', text: 'Снег' };
  if (code <= 82) return { emoji: '🌧️', text: 'Ливни' };
  return { emoji: '⛈️', text: 'Гроза' };
}</pre>` },
    `<div class="weather-card">
  <div id="w-city" style="font-size:14px;color:#94a3b8">Київ</div>
  <div id="w-emoji" style="font-size:52px;margin:10px 0">☀️</div>
  <div id="w-temp" style="font-size:32px;font-weight:900">—</div>
  <div id="w-text" style="font-size:13px;color:#94a3b8">—</div>
</div>
<button onclick="loadWeather()" style="margin-top:12px">🔄 Завантажити погоду Києва</button>`,
    `${BASE}`,
    `function getWeatherInfo(code) {
  if (code === 0) return { emoji: '☀️', text: 'Ясно' };
  if (code <= 3)  return { emoji: '⛅', text: 'Хмарно' };
  if (code <= 48) return { emoji: '🌫️', text: 'Туман' };
  if (code <= 55) return { emoji: '🌦️', text: 'Мряка' };
  if (code <= 65) return { emoji: '🌧️', text: 'Дощ' };
  if (code <= 75) return { emoji: '❄️', text: 'Сніг' };
  if (code <= 82) return { emoji: '🌧️', text: 'Зливи' };
  return { emoji: '⛈️', text: 'Гроза' };
}

async function loadWeather() {
  try {
    var res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current_weather=true');
    var data = await res.json();
    var info = getWeatherInfo(data.current_weather.weathercode);
    document.getElementById('w-emoji').textContent = info.emoji;
    document.getElementById('w-temp').textContent = Math.round(data.current_weather.temperature) + '°C';
    document.getElementById('w-text').textContent = info.text;
  } catch (err) {
    document.getElementById('w-text').textContent = '⚠ Немає з\\'єднання';
  }
}
loadWeather();`,
    [
      { level:'easy',   uk:'Дочекайся завантаження і подивись реальну погоду Києва просто зараз.', ru:'Дождись загрузки и посмотри реальную погоду Киева прямо сейчас.' },
      { level:'medium', uk:'Зміни координати на координати свого міста і перезапусти прев\'ю.', ru:'Измени координаты на координаты своего города и перезапусти превью.' },
      { level:'hard',   uk:'Додай у <code>getWeatherInfo()</code> окремий випадок для <code>code === 45 || code === 48</code> з іншим текстом "Дуже туманно" (постав перевірку ПЕРЕД загальною <code>code <= 48</code>).', ru:'Добавь в getWeatherInfo() отдельный случай для тумана с текстом "Очень туманно".' },
    ]
  );

  /* ─── 13-05: Прогноз на 5 днів — groupBy, map, render ──────────── */
  patch('13-05',
    { uk:`<h2>Прогноз на 5 днів: groupBy, map, render</h2>
<p>Для прогнозу запитуємо <strong>daily</strong>-дані Open-Meteo — вони приходять як паралельні масиви: масив дат, масив макс. температур, масив мін. температур.</p>
<h3>Запит daily-прогнозу</h3>
<pre>fetch(
  'https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52' +
  '&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto'
)</pre>
<h3>Форма відповіді</h3>
<pre>{
  daily: {
    time: ['2026-07-11', '2026-07-12', ...],
    temperature_2m_max: [24, 22, 21, 25, 23],
    temperature_2m_min: [16, 15, 14, 17, 16],
    weathercode: [0, 2, 61, 0, 3]
  }
}</pre>
<h3>Перетворення в масив об'єктів (map)</h3>
<pre>const days = daily.time.map((date, i) => ({
  date,
  max: daily.temperature_2m_max[i],
  min: daily.temperature_2m_min[i],
  code: daily.weathercode[i]
}));</pre>
<p>Такий підхід — "трьох паралельних масивів в один масив об'єктів" — типовий прийом при роботі з даними з API.</p>`,
      ru:`<h2>Прогноз на 5 дней: groupBy, map, render</h2>
<p>Для прогноза запрашиваем <strong>daily</strong>-данные Open-Meteo — они приходят как параллельные массивы.</p>
<h3>Запрос daily-прогноза</h3>
<pre>fetch(
  'https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52' +
  '&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto'
)</pre>
<h3>Форма ответа</h3>
<pre>{
  daily: {
    time: ['2026-07-11', '2026-07-12', ...],
    temperature_2m_max: [24, 22, 21, 25, 23],
    temperature_2m_min: [16, 15, 14, 17, 16],
    weathercode: [0, 2, 61, 0, 3]
  }
}</pre>
<h3>Превращение в массив объектов (map)</h3>
<pre>const days = daily.time.map((date, i) => ({
  date,
  max: daily.temperature_2m_max[i],
  min: daily.temperature_2m_min[i],
  code: daily.weathercode[i]
}));</pre>` },
    `<div id="forecast" class="forecast-row">Завантаження прогнозу...</div>`,
    `${BASE}
.forecast-row{display:flex;gap:10px;flex-wrap:wrap}
.day-card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px;text-align:center;flex:1;min-width:70px}
.day-name{font-size:11px;color:#64748b;margin-bottom:6px}
.day-emoji{font-size:22px;margin-bottom:4px}
.day-max{font-size:14px;font-weight:700}
.day-min{font-size:12px;color:#64748b}`,
    `function getWeatherEmoji(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 48) return '🌫️';
  if (code <= 65) return '🌧️';
  if (code <= 75) return '❄️';
  return '⛈️';
}

async function loadForecast() {
  var box = document.getElementById('forecast');
  try {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto';
    var res = await fetch(url);
    var data = await res.json();
    var daily = data.daily;

    var days = daily.time.map(function (date, i) {
      return { date: date, max: daily.temperature_2m_max[i], min: daily.temperature_2m_min[i], code: daily.weathercode[i] };
    });

    var dayNames = ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'];
    box.innerHTML = days.map(function (d) {
      var dow = dayNames[new Date(d.date).getDay()];
      return '<div class="day-card"><div class="day-name">' + dow + '</div><div class="day-emoji">' + getWeatherEmoji(d.code) +
        '</div><div class="day-max">' + Math.round(d.max) + '°</div><div class="day-min">' + Math.round(d.min) + '°</div></div>';
    }).join('');
  } catch (err) {
    box.textContent = '⚠ Не вдалося завантажити прогноз: ' + err.message;
  }
}
loadForecast();`,
    [
      { level:'easy',   uk:'Дочекайся завантаження і порахуй, скільки карток днів з\'явилось (має бути 5).', ru:'Дождись загрузки и посчитай, сколько карточек дней появилось (должно быть 5).' },
      { level:'medium', uk:'Зміни <code>forecast_days=5</code> на <code>forecast_days=7</code> у URL і в масиві dayNames переконайся, що все ще правильно показує дні тижня.', ru:'Измени forecast_days=5 на forecast_days=7 в URL.' },
      { level:'hard',   uk:'Додай під кожною карткою третій рядок — різницю max-min (<code>Math.round(d.max - d.min)</code>) з підписом "amplitude".', ru:'Добавь под каждой карточкой третью строку — разницу max-min с подписью "amplitude".' },
    ]
  );

  /* ─── 13-06: Геолокація — navigator.geolocation ────────────────── */
  patch('13-06',
    { uk:`<h2>Геолокація: navigator.geolocation</h2>
<p>Браузер уміє (за дозволом користувача) визначати приблизне місцезнаходження — і одразу отримувати координати, без geocoding-запиту за назвою міста.</p>
<h3>Отримання координат</h3>
<pre>navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    loadWeatherByCoords(latitude, longitude);
  },
  error => {
    console.error('Не вдалося отримати геолокацію:', error.message);
  }
);</pre>
<h3>Чому це асинхронно (callback, а не return)?</h3>
<p>Браузер спочатку питає дозвіл у користувача ("Дозволити цьому сайту знати ваше місцезнаходження?") — це займає час, тому результат приходить пізніше через callback-функцію, а не одразу.</p>
<h3>Обробка відмови</h3>
<p>Якщо користувач натисне "Заборонити", спрацює другий callback (error) — важливо показати зрозуміле повідомлення, а не залишати застосунок "у підвішеному стані".</p>`,
      ru:`<h2>Геолокация: navigator.geolocation</h2>
<p>Браузер умеет (с разрешения пользователя) определять примерное местоположение.</p>
<h3>Получение координат</h3>
<pre>navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    loadWeatherByCoords(latitude, longitude);
  },
  error => {
    console.error('Не удалось получить геолокацию:', error.message);
  }
);</pre>
<h3>Почему это асинхронно?</h3>
<p>Браузер сначала спрашивает разрешение у пользователя — это занимает время, поэтому результат приходит позже через callback-функцию.</p>
<h3>Обработка отказа</h3>
<p>Если пользователь нажмёт "Запретить", сработает второй callback (error).</p>` },
    `<button onclick="useMyLocation()">📍 Погода за моєю геолокацією</button>
<div class="weather-card" style="margin-top:12px">
  <div id="geo-status" style="font-size:13px;color:#94a3b8">Натисни кнопку і дозволь доступ до геолокації</div>
</div>`,
    `${BASE}`,
    `function useMyLocation() {
  var status = document.getElementById('geo-status');
  if (!navigator.geolocation) {
    status.textContent = '❌ Геолокація не підтримується цим браузером';
    return;
  }
  status.textContent = '📡 Визначаємо місцезнаходження...';

  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude.toFixed(2);
      var lon = position.coords.longitude.toFixed(2);
      status.textContent = 'Координати отримано: ' + lat + ', ' + lon + '. Завантажуємо погоду...';

      fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          status.textContent = 'Твоя погода: ' + data.current_weather.temperature + '°C';
        })
        .catch(function (err) {
          status.textContent = '⚠ Помилка завантаження погоди: ' + err.message;
        });
    },
    function (error) {
      status.textContent = '❌ Доступ до геолокації відхилено або недоступний: ' + error.message;
    }
  );
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і дозволь доступ до геолокації в браузері — подивись на свою реальну погоду.', ru:'Нажми кнопку и разреши доступ к геолокации — посмотри на свою реальную погоду.' },
      { level:'medium', uk:'Заборони доступ до геолокації (натисни "Block"/"Заборонити") — переконайся, що бачиш зрозуміле повідомлення про помилку, а не мовчання.', ru:'Запрети доступ к геолокации — убедись, что видишь понятное сообщение об ошибке.' },
      { level:'hard',   uk:'Додай третій аргумент у <code>getCurrentPosition</code> — об\'єкт <code>{ timeout: 5000 }</code>, щоб запит переставав чекати через 5 секунд.', ru:'Добавь третий аргумент в getCurrentPosition — объект { timeout: 5000 }.' },
    ]
  );

  /* ─── 13-07: Збереження міст у localStorage ────────────────────── */
  patch('13-07',
    { uk:`<h2>Збереження міст у localStorage</h2>
<p>Щоб не вводити назву міста щоразу, зробимо список "улюблених міст", який зберігається між сеансами через <code>localStorage</code>.</p>
<h3>Робота зі списком через JSON</h3>
<pre>function getSavedCities() {
  return JSON.parse(localStorage.getItem('weather-cities') || '[]');
}

function addCity(name) {
  const cities = getSavedCities();
  if (!cities.includes(name)) {
    cities.push(name);
    localStorage.setItem('weather-cities', JSON.stringify(cities));
  }
}

function removeCity(name) {
  const cities = getSavedCities().filter(c => c !== name);
  localStorage.setItem('weather-cities', JSON.stringify(cities));
}</pre>
<p>Перевірка <code>!cities.includes(name)</code> запобігає дублюванню одного міста в списку.</p>`,
      ru:`<h2>Сохранение городов в localStorage</h2>
<p>Чтобы не вводить название города каждый раз, сделаем список "избранных городов".</p>
<h3>Работа со списком через JSON</h3>
<pre>function getSavedCities() {
  return JSON.parse(localStorage.getItem('weather-cities') || '[]');
}

function addCity(name) {
  const cities = getSavedCities();
  if (!cities.includes(name)) {
    cities.push(name);
    localStorage.setItem('weather-cities', JSON.stringify(cities));
  }
}

function removeCity(name) {
  const cities = getSavedCities().filter(c => c !== name);
  localStorage.setItem('weather-cities', JSON.stringify(cities));
}</pre>` },
    `<input type="text" id="new-city" placeholder="Назва міста">
<button onclick="addCityBtn()">⭐ Додати в улюблені</button>
<ul id="cities-list" style="margin-top:12px;list-style:none;padding:0;display:flex;flex-direction:column;gap:6px"></ul>`,
    `${BASE}
.city-item{display:flex;justify-content:space-between;align-items:center;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px 14px;font-size:13px}
.city-item button{padding:4px 10px;font-size:11px}`,
    `function getSavedCities() {
  return JSON.parse(localStorage.getItem('weather-cities') || '[]');
}
function addCity(name) {
  var cities = getSavedCities();
  if (!cities.includes(name)) {
    cities.push(name);
    localStorage.setItem('weather-cities', JSON.stringify(cities));
  }
}
function removeCity(name) {
  var cities = getSavedCities().filter(function (c) { return c !== name; });
  localStorage.setItem('weather-cities', JSON.stringify(cities));
  renderCities();
}

function renderCities() {
  var list = document.getElementById('cities-list');
  var cities = getSavedCities();
  if (!cities.length) {
    list.innerHTML = '<li style="color:#64748b;font-size:12.5px">Поки немає улюблених міст</li>';
    return;
  }
  list.innerHTML = cities.map(function (c) {
    return '<li class="city-item"><span>📍 ' + c + '</span><button onclick="removeCity(\\'' + c + '\\')">✕ Видалити</button></li>';
  }).join('');
}

function addCityBtn() {
  var input = document.getElementById('new-city');
  var name = input.value.trim();
  if (!name) return;
  addCity(name);
  input.value = '';
  renderCities();
}

renderCities();`,
    [
      { level:'easy',   uk:'Додай 2-3 міста в список і переконайся, що дублікати не додаються (спробуй додати те саме місто двічі).', ru:'Добавь 2-3 города в список и убедись, что дубликаты не добавляются.' },
      { level:'medium', uk:'Видали одне місто кнопкою "✕ Видалити" — переконайся, що воно зникло і з localStorage (перезапусти прев\'ю і перевір).', ru:'Удали один город кнопкой "✕ Удалить" — убедись, что он исчез и из localStorage.' },
      { level:'hard',   uk:'Додай кнопку "Очистити все", яка викликає <code>localStorage.removeItem(\'weather-cities\')</code> і <code>renderCities()</code>.', ru:'Добавь кнопку "Очистить всё", вызывающую localStorage.removeItem.' },
    ]
  );

  /* ─── 13-08: Анімований фон залежно від погоди ─────────────────── */
  patch('13-08',
    { uk:`<h2>Анімований фон залежно від погоди</h2>
<p>Фон застосунку може підлаштовуватись під погоду — сонячний градієнт для ясної погоди, сірий для хмарної, синій з "краплями" для дощу.</p>
<h3>Клас на body/контейнер залежно від коду</h3>
<pre>function applyWeatherTheme(code) {
  const container = document.querySelector('.app');
  container.className = 'app'; // скидання попередніх класів
  if (code === 0) container.classList.add('theme-sunny');
  else if (code <= 3) container.classList.add('theme-cloudy');
  else if (code <= 65) container.classList.add('theme-rainy');
  else container.classList.add('theme-snowy');
}</pre>
<h3>CSS-градієнти для кожної теми</h3>
<pre>.theme-sunny  { background: linear-gradient(160deg, #fbbf24, #f97316); }
.theme-cloudy { background: linear-gradient(160deg, #64748b, #334155); }
.theme-rainy  { background: linear-gradient(160deg, #1e3a5f, #0f172a); }
.theme-snowy  { background: linear-gradient(160deg, #94a3b8, #e2e8f0); }</pre>`,
      ru:`<h2>Анимированный фон в зависимости от погоды</h2>
<p>Фон приложения может подстраиваться под погоду — солнечный градиент для ясной погоды, серый для облачной, синий для дождя.</p>
<h3>Класс на контейнер в зависимости от кода</h3>
<pre>function applyWeatherTheme(code) {
  const container = document.querySelector('.app');
  container.className = 'app';
  if (code === 0) container.classList.add('theme-sunny');
  else if (code <= 3) container.classList.add('theme-cloudy');
  else if (code <= 65) container.classList.add('theme-rainy');
  else container.classList.add('theme-snowy');
}</pre>
<h3>CSS-градиенты для каждой темы</h3>
<pre>.theme-sunny  { background: linear-gradient(160deg, #fbbf24, #f97316); }
.theme-cloudy { background: linear-gradient(160deg, #64748b, #334155); }
.theme-rainy  { background: linear-gradient(160deg, #1e3a5f, #0f172a); }
.theme-snowy  { background: linear-gradient(160deg, #94a3b8, #e2e8f0); }</pre>` },
    `<div class="app theme-sunny" id="app">
  <div style="font-size:44px">☀️</div>
  <div style="font-size:15px;margin-top:6px">Ясно</div>
</div>
<div class="btn-row">
  <button onclick="setTheme('sunny')">☀️ Ясно</button>
  <button onclick="setTheme('cloudy')">⛅ Хмарно</button>
  <button onclick="setTheme('rainy')">🌧️ Дощ</button>
  <button onclick="setTheme('snowy')">❄️ Сніг</button>
</div>`,
    `${BASE}
.app{max-width:280px;padding:40px 20px;border-radius:16px;text-align:center;color:#fff;transition:background 1s ease}
.theme-sunny{background:linear-gradient(160deg,#fbbf24,#f97316)}
.theme-cloudy{background:linear-gradient(160deg,#64748b,#334155)}
.theme-rainy{background:linear-gradient(160deg,#1e3a5f,#0f172a)}
.theme-snowy{background:linear-gradient(160deg,#94a3b8,#475569)}`,
    `var THEMES = {
  sunny:  { emoji: '☀️', text: 'Ясно' },
  cloudy: { emoji: '⛅', text: 'Хмарно' },
  rainy:  { emoji: '🌧️', text: 'Дощ' },
  snowy:  { emoji: '❄️', text: 'Сніг' }
};

function setTheme(key) {
  var app = document.getElementById('app');
  app.className = 'app theme-' + key;
  var t = THEMES[key];
  app.innerHTML = '<div style="font-size:44px">' + t.emoji + '</div><div style="font-size:15px;margin-top:6px">' + t.text + '</div>';
}`,
    [
      { level:'easy',   uk:'Натисни всі 4 кнопки по черзі і подивись на зміну фону і тексту.', ru:'Нажми все 4 кнопки по очереди и посмотри на изменение фона и текста.' },
      { level:'medium', uk:'Зміни кольори градієнта <code>.theme-rainy</code> на щось більш "дощове" (наприклад #0c4a6e → #082f49).', ru:'Измени цвета градиента .theme-rainy на что-то более "дождевое".' },
      { level:'hard',   uk:'Додай п\'яту тему "storm" (гроза) з градієнтом <code>linear-gradient(160deg,#312e81,#0f172a)</code> і кнопку для неї.', ru:'Добавь пятую тему "storm" (гроза) с фиолетовым градиентом и кнопку для неё.' },
    ]
  );

  /* ─── 13-09: Шкала Цельсій / Фаренгейт ──────────────────────────── */
  patch('13-09',
    { uk:`<h2>Шкала: Цельсій / Фаренгейт</h2>
<p>США та кілька інших країн використовують Фаренгейт замість Цельсія. Додамо перемикач одиниць виміру.</p>
<h3>Формула перерахунку</h3>
<pre>function celsiusToFahrenheit(c) {
  return c * 9 / 5 + 32;
}
function fahrenheitToCelsius(f) {
  return (f - 32) * 5 / 9;
}</pre>
<h3>Зберігаємо оригінал, конвертуємо лише для показу</h3>
<p>Важливо тримати температуру в <strong>одній</strong> "справжній" одиниці (наприклад, завжди в Цельсії з API) і конвертувати лише в момент відображення — так не накопичується похибка округлення.</p>
<pre>let currentTempC = 21; // завжди зберігаємо в Цельсії
let unit = 'C';

function render() {
  const value = unit === 'C' ? currentTempC : celsiusToFahrenheit(currentTempC);
  tempEl.textContent = Math.round(value) + '°' + unit;
}</pre>`,
      ru:`<h2>Шкала: Цельсий / Фаренгейт</h2>
<p>США и несколько других стран используют Фаренгейт вместо Цельсия.</p>
<h3>Формула пересчёта</h3>
<pre>function celsiusToFahrenheit(c) {
  return c * 9 / 5 + 32;
}
function fahrenheitToCelsius(f) {
  return (f - 32) * 5 / 9;
}</pre>
<h3>Храним оригинал, конвертируем только для показа</h3>
<p>Важно держать температуру в <strong>одной</strong> "настоящей" единице и конвертировать только в момент отображения.</p>
<pre>let currentTempC = 21;
let unit = 'C';

function render() {
  const value = unit === 'C' ? currentTempC : celsiusToFahrenheit(currentTempC);
  tempEl.textContent = Math.round(value) + '°' + unit;
}</pre>` },
    `<div class="weather-card" style="text-align:center">
  <div id="temp-display" style="font-size:38px;font-weight:900">21°C</div>
  <button onclick="toggleUnit()" style="margin-top:10px">🔄 Переключити на °F</button>
</div>`,
    `${BASE}`,
    `var currentTempC = 21;
var unit = 'C';

function celsiusToFahrenheit(c) { return c * 9 / 5 + 32; }

function render() {
  var value = unit === 'C' ? currentTempC : celsiusToFahrenheit(currentTempC);
  document.getElementById('temp-display').textContent = Math.round(value) + '°' + unit;
}

function toggleUnit() {
  unit = unit === 'C' ? 'F' : 'C';
  document.querySelector('button').textContent = '🔄 Переключити на °' + (unit === 'C' ? 'F' : 'C');
  render();
}

render();`,
    [
      { level:'easy',   uk:'Натисни кнопку кілька разів і переконайся, що 21°C правильно перетворюється в 69.8°F (округлено до 70°F).', ru:'Нажми кнопку несколько раз и убедись, что 21°C правильно превращается в 70°F.' },
      { level:'medium', uk:'Зміни <code>currentTempC</code> з 21 на -5 — перевір, як від\'ємна температура виглядає у Фаренгейтах.', ru:'Измени currentTempC с 21 на -5 — проверь, как отрицательная температура выглядит в Фаренгейтах.' },
      { level:'hard',   uk:'Додай функцію <code>fahrenheitToCelsius(f)</code> і невеликий тест: <code>console.log(fahrenheitToCelsius(celsiusToFahrenheit(21)))</code> — має вивести 21 (або дуже близько через округлення).', ru:'Добавь функцию fahrenheitToCelsius(f) и небольшой тест конвертации туда-обратно.' },
    ]
  );

  /* ─── 13-10: Пошук із автодоповненням ────────────────────────────── */
  patch('13-10',
    { uk:`<h2>Пошук із автодоповненням</h2>
<p>Замість "введи назву → натисни Знайти", зробимо список підказок, що з'являється під час набору тексту — Geocoding API вміє повертати одразу кілька збігів.</p>
<h3>count=5 замість count=1</h3>
<pre>fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + query + '&count=5&language=uk')</pre>
<h3>Debounce — не питати сервер після кожної літери</h3>
<pre>let debounceTimer;
input.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => fetchSuggestions(input.value), 350);
});</pre>
<p><strong>Debounce</strong> — почекати трохи (350мс) після того, як користувач перестав друкувати, перш ніж робити запит. Без цього при швидкому наборі "Ки-ї-в" пішло б 3 окремі непотрібні запити.</p>`,
      ru:`<h2>Поиск с автодополнением</h2>
<p>Вместо "введи название → нажми Найти" сделаем список подсказок во время набора текста.</p>
<h3>count=5 вместо count=1</h3>
<pre>fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + query + '&count=5&language=ru')</pre>
<h3>Debounce — не спрашивать сервер после каждой буквы</h3>
<pre>let debounceTimer;
input.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => fetchSuggestions(input.value), 350);
});</pre>
<p><strong>Debounce</strong> — подождать немного после того, как пользователь перестал печатать, прежде чем делать запрос.</p>` },
    `<input type="text" id="search-input" placeholder="Почни вводити назву міста..." autocomplete="off">
<div id="suggestions" class="suggestions"></div>`,
    `${BASE}
.suggestions{margin-top:8px;display:flex;flex-direction:column;gap:4px}
.sugg-item{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:9px 14px;font-size:13px;cursor:pointer}
.sugg-item:hover{border-color:#38bdf8}`,
    `var debounceTimer;

document.getElementById('search-input').addEventListener('input', function (e) {
  clearTimeout(debounceTimer);
  var query = e.target.value.trim();
  if (query.length < 2) { document.getElementById('suggestions').innerHTML = ''; return; }
  debounceTimer = setTimeout(function () { fetchSuggestions(query); }, 350);
});

async function fetchSuggestions(query) {
  var box = document.getElementById('suggestions');
  box.innerHTML = '<div style="font-size:12px;color:#64748b">Шукаємо...</div>';
  try {
    var url = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(query) + '&count=5&language=uk';
    var res = await fetch(url);
    var data = await res.json();
    if (!data.results || !data.results.length) {
      box.innerHTML = '<div style="font-size:12px;color:#64748b">Нічого не знайдено</div>';
      return;
    }
    box.innerHTML = data.results.map(function (r) {
      return '<div class="sugg-item">📍 ' + r.name + (r.country ? ', ' + r.country : '') + '</div>';
    }).join('');
  } catch (err) {
    box.innerHTML = '<div class="err">⚠ Помилка мережі</div>';
  }
}`,
    [
      { level:'easy',   uk:'Почни вводити назву якогось міста (наприклад "Лон") і подивись на список підказок.', ru:'Начни вводить название какого-то города (например "Лон") и посмотри на список подсказок.' },
      { level:'medium', uk:'Зміни затримку debounce з 350 на 600 мс — підказки з\'являтимуться повільніше після зупинки набору.', ru:'Измени задержку debounce с 350 на 600 мс.' },
      { level:'hard',   uk:'Додай клік по підказці: <code>onclick</code>, який ставить обране місто в <code>#search-input</code> і очищує список підказок.', ru:'Добавь клик по подсказке: ставит выбранный город в поле поиска и очищает список.' },
    ]
  );

  /* ─── 13-11: Графік температури — Chart.js ──────────────────────── */
  patch('13-11',
    { uk:`<h2>Графік температури: Chart.js</h2>
<p><strong>Chart.js</strong> — популярна бібліотека для малювання графіків на <code>&lt;canvas&gt;</code>. Покажемо погодинну температуру на день у вигляді лінійного графіка.</p>
<h3>Підключення через CDN</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/chart.js"&gt;&lt;/script&gt;</pre>
<h3>Мінімальний лінійний графік</h3>
<pre>new Chart(document.getElementById('chart'), {
  type: 'line',
  data: {
    labels: ['9:00', '12:00', '15:00', '18:00'],
    datasets: [{ label: '°C', data: [18, 22, 24, 20], borderColor: '#38bdf8' }]
  }
});</pre>
<h3>hourly-дані з Open-Meteo</h3>
<pre>&hourly=temperature_2m&forecast_days=1</pre>
<p>Повертає масив із 24 значеннями температури — по одному на кожну годину доби.</p>`,
      ru:`<h2>График температуры: Chart.js</h2>
<p><strong>Chart.js</strong> — популярная библиотека для рисования графиков на canvas.</p>
<h3>Подключение через CDN</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/chart.js"&gt;&lt;/script&gt;</pre>
<h3>Минимальный линейный график</h3>
<pre>new Chart(document.getElementById('chart'), {
  type: 'line',
  data: {
    labels: ['9:00', '12:00', '15:00', '18:00'],
    datasets: [{ label: '°C', data: [18, 22, 24, 20], borderColor: '#38bdf8' }]
  }
});</pre>
<h3>hourly-данные из Open-Meteo</h3>
<pre>&hourly=temperature_2m&forecast_days=1</pre>
<p>Возвращает массив из 24 значений температуры.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f1f5f9;padding:20px}
#wrap{max-width:480px}
</style>
</head>
<body>
<div id="wrap">
  <h2 style="margin-bottom:10px">Погодинна температура (Київ)</h2>
  <canvas id="chart" height="220"></canvas>
</div>
<script>
fetch('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&hourly=temperature_2m&forecast_days=1&timezone=auto')
  .then(function (res) { return res.json(); })
  .then(function (data) {
    var labels = data.hourly.time.map(function (t) { return t.slice(11, 16); });
    new Chart(document.getElementById('chart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Температура, °C',
          data: data.hourly.temperature_2m,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56,189,248,.15)',
          fill: true,
          tension: 0.35
        }]
      },
      options: {
        scales: {
          x: { ticks: { color: '#94a3b8' } },
          y: { ticks: { color: '#94a3b8' } }
        },
        plugins: { legend: { labels: { color: '#f1f5f9' } } }
      }
    });
  })
  .catch(function (err) {
    document.getElementById('wrap').innerHTML += '<p style="color:#f87171">⚠ Не вдалося завантажити графік: ' + err.message + '</p>';
  });
<\/script>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Дочекайся побудови графіка і подивись, як температура змінюється протягом доби.', ru:'Дождись построения графика и посмотри, как температура меняется в течение суток.' },
      { level:'medium', uk:'Зміни колір лінії <code>borderColor</code> з "#38bdf8" на "#f59e0b".', ru:'Измени цвет линии borderColor с "#38bdf8" на "#f59e0b".' },
      { level:'hard',   uk:'Додай другий datasets-об\'єкт для <code>relative_humidity_2m</code> (додай його в <code>&hourly=</code>) — тепер графік покаже і температуру, і вологість.', ru:'Добавь второй datasets-объект для relative_humidity_2m — график покажет и температуру, и влажность.' },
    ]
  );

  /* ─── 13-12: PWA — manifest.json та Service Worker ─────────────── */
  patch('13-12',
    { uk:`<h2>PWA: manifest.json та Service Worker</h2>
<p><strong>PWA</strong> (Progressive Web App) дозволяє "встановити" сайт як застосунок на телефон чи комп'ютер і навіть частково працювати офлайн.</p>
<h3>manifest.json</h3>
<pre>{
  "name": "Погода",
  "short_name": "Погода",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#38bdf8",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" }
  ]
}</pre>
<pre>&lt;link rel="manifest" href="manifest.json"&gt;</pre>
<h3>Service Worker — офлайн-кешування</h3>
<pre>// sw.js
self.addEventListener('install', e => {
  e.waitUntil(caches.open('v1').then(cache => cache.addAll(['/', '/style.css'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});</pre>
<pre>navigator.serviceWorker.register('/sw.js');</pre>
<p><strong>Важливо:</strong> Service Worker працює лише на реальному сайті через HTTPS (або localhost) — у навчальній пісочниці його не можна зареєструвати по-справжньому, тому нижче — лише симуляція процесу.</p>`,
      ru:`<h2>PWA: manifest.json и Service Worker</h2>
<p><strong>PWA</strong> позволяет "установить" сайт как приложение на телефон или компьютер и даже частично работать оффлайн.</p>
<h3>manifest.json</h3>
<pre>{
  "name": "Погода",
  "short_name": "Погода",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#38bdf8",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" }
  ]
}</pre>
<pre>&lt;link rel="manifest" href="manifest.json"&gt;</pre>
<h3>Service Worker — оффлайн-кеширование</h3>
<pre>self.addEventListener('install', e => {
  e.waitUntil(caches.open('v1').then(cache => cache.addAll(['/', '/style.css'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});</pre>
<pre>navigator.serviceWorker.register('/sw.js');</pre>
<p><strong>Важно:</strong> Service Worker работает только на реальном сайте через HTTPS — в учебной песочнице зарегистрировать его по-настоящему нельзя, поэтому ниже только симуляция процесса.</p>` },
    `<h2>Симуляція встановлення PWA</h2>
<div class="term" id="t12">$ manifest.json готовий, sw.js готовий</div>
<button onclick="registerSW()" style="margin-top:10px">▶ navigator.serviceWorker.register()</button>`,
    `${BASE}
.term{background:#000;border:1px solid #334155;border-radius:10px;padding:14px;font-family:Consolas,monospace;font-size:12.5px;color:#a3e635;min-height:80px;white-space:pre-wrap}
.term-ok{color:#4ade80}`,
    `function log(text, cls) {
  var t = document.getElementById('t12');
  t.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
}

function registerSW() {
  log('$ navigator.serviceWorker.register(\\'/sw.js\\')');
  setTimeout(function () {
    log('Service Worker: install event', 'term-ok');
  }, 300);
  setTimeout(function () {
    log('Service Worker: activate event', 'term-ok');
  }, 700);
  setTimeout(function () {
    log('✔ PWA готова до офлайн-роботи (симуляція — реальна реєстрація потребує HTTPS-хостингу)', 'term-ok');
  }, 1100);
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись, як послідовно з\'являються кроки install → activate → готово.', ru:'Нажми кнопку и посмотри, как последовательно появляются шаги install → activate → готово.' },
      { level:'medium', uk:'Зміни назву застосунку в теоретичному прикладі manifest.json з "Погода" на власну назву застосунку.', ru:'Измени название приложения в примере manifest.json на своё.' },
      { level:'hard',   uk:'Додай у симуляцію четвертий крок через 1500мс: "📦 Кешовано 8 файлів для офлайн-доступу".', ru:'Добавь в симуляцию четвёртый шаг через 1500мс: "📦 Закешировано 8 файлов для оффлайн-доступа".' },
    ]
  );

  /* ─── 13-13: Адаптивний дизайн (mobile-first) ──────────────────── */
  patch('13-13',
    { uk:`<h2>Адаптивний дизайн (mobile-first)</h2>
<p>Погодний застосунок часто відкривають саме з телефону "на бігу" — тому дизайн варто спочатку проектувати для маленького екрана, а вже потім розширювати для десктопу.</p>
<h3>Mobile-first медіа-запити</h3>
<pre>/* базові стилі — вже для мобільного */
.weather-card { width: 100%; padding: 16px; }
.forecast-row { flex-direction: column; }

/* розширення для великих екранів */
@media (min-width: 600px) {
  .weather-card { width: 340px; }
  .forecast-row { flex-direction: row; }
}</pre>
<h3>Чому "mobile-first", а не навпаки?</h3>
<p>Простіше додавати складність (більше колонок, більше простору) для великого екрана, ніж прибирати її для маленького. Це також змушує спочатку думати про найважливіший контент.</p>`,
      ru:`<h2>Адаптивный дизайн (mobile-first)</h2>
<p>Погодное приложение часто открывают именно с телефона — поэтому дизайн стоит сначала проектировать для маленького экрана.</p>
<h3>Mobile-first медиа-запросы</h3>
<pre>.weather-card { width: 100%; padding: 16px; }
.forecast-row { flex-direction: column; }

@media (min-width: 600px) {
  .weather-card { width: 340px; }
  .forecast-row { flex-direction: row; }
}</pre>
<h3>Почему "mobile-first"?</h3>
<p>Проще добавлять сложность для большого экрана, чем убирать её для маленького.</p>` },
    `<button onclick="toggleSize()" style="margin-bottom:10px">📱 Перемкнути мобільний / десктоп</button>
<div id="frame" class="frame">
  <div class="weather-card">
    <div style="font-size:32px">☀️</div>
    <div style="font-size:24px;font-weight:900">21°C</div>
  </div>
  <div class="forecast-row">
    <div class="day">Пн 20°</div>
    <div class="day">Вт 19°</div>
    <div class="day">Ср 22°</div>
  </div>
</div>`,
    `${BASE}
.frame{transition:max-width .3s ease;max-width:100%;border:2px solid #334155;border-radius:12px;padding:16px}
.weather-card{width:100%;padding:16px;margin-bottom:12px}
.forecast-row{display:flex;flex-direction:column;gap:8px}
.day{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px;text-align:center;font-size:13px}
@media (min-width:400px){
  .forecast-row{flex-direction:row}
  .day{flex:1}
}`,
    `var narrow = true;
function toggleSize() {
  narrow = !narrow;
  document.getElementById('frame').style.maxWidth = narrow ? '260px' : '480px';
}
toggleSize();`,
    [
      { level:'easy',   uk:'Перемкни розмір кілька разів — подивись, як картки прогнозу переходять з колонки в рядок.', ru:'Переключи размер несколько раз — посмотри, как карточки прогноза переходят из колонки в строку.' },
      { level:'medium', uk:'Зміни точку перелому @media з 400px на 500px.', ru:'Измени точку перелома @media с 400px на 500px.' },
      { level:'hard',   uk:'Додай другий брейкпоінт <code>@media (min-width:700px)</code>, де <code>.weather-card</code> отримує <code>width:360px</code> і центрується (<code>margin:0 auto</code>).', ru:'Добавь второй брейкпоинт для очень широких экранов.' },
    ]
  );

  /* ─── 13-14: Loading states та error handling ──────────────────── */
  patch('13-14',
    { uk:`<h2>Loading states та error handling</h2>
<p>Мережеві запити можуть тривати секунди, а можуть і зовсім не спрацювати. Хороший застосунок завжди показує <strong>3 стани</strong>: завантаження, успіх, помилка.</p>
<h3>Скелетон замість порожнього екрана</h3>
<pre>&lt;div class="skeleton"&gt;&lt;/div&gt;</pre>
<pre>.skeleton {
  height: 60px; border-radius: 8px;
  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }</pre>
<h3>Три стани в JS</h3>
<pre>async function loadWeather(city) {
  showLoading();
  try {
    const data = await fetchWeather(city);
    showResult(data);
  } catch (err) {
    showError('Не вдалося завантажити погоду: ' + err.message);
  }
}</pre>
<p>Ніколи не залишай застосунок у стані "нічого не відбувається" — користувач має завжди розуміти, що відбувається: чекаємо, все добре, чи щось пішло не так.</p>`,
      ru:`<h2>Loading states и error handling</h2>
<p>Сетевые запросы могут длиться секунды, а могут и вовсе не сработать. Хорошее приложение всегда показывает <strong>3 состояния</strong>: загрузка, успех, ошибка.</p>
<h3>Скелетон вместо пустого экрана</h3>
<pre>.skeleton {
  height: 60px; border-radius: 8px;
  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }</pre>
<h3>Три состояния в JS</h3>
<pre>async function loadWeather(city) {
  showLoading();
  try {
    const data = await fetchWeather(city);
    showResult(data);
  } catch (err) {
    showError('Не удалось загрузить погоду: ' + err.message);
  }
}</pre>` },
    `<input type="text" id="city-input" placeholder="Введи місто (або 'error' для тесту помилки)" value="Париж">
<button onclick="loadDemo()">Завантажити</button>
<div id="result" style="margin-top:12px"></div>`,
    `${BASE}
.skeleton{height:60px;border-radius:8px;background:linear-gradient(90deg,#1e293b 25%,#334155 50%,#1e293b 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}
@keyframes shimmer{from{background-position:200% 0}to{background-position:-200% 0}}`,
    `function showLoading() {
  document.getElementById('result').innerHTML = '<div class="skeleton"></div>';
}
function showError(msg) {
  document.getElementById('result').innerHTML = '<div class="err">❌ ' + msg + '</div>';
}
function showResult(text) {
  document.getElementById('result').innerHTML = '<div style="color:#4ade80">✅ ' + text + '</div>';
}

async function loadDemo() {
  var city = document.getElementById('city-input').value.trim();
  showLoading();

  try {
    if (city.toLowerCase() === 'error') {
      throw new Error('навмисна тестова помилка');
    }
    var geoRes = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1&language=uk');
    var geoData = await geoRes.json();
    if (!geoData.results || !geoData.results.length) throw new Error('місто "' + city + '" не знайдено');

    var place = geoData.results[0];
    var wRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + place.latitude + '&longitude=' + place.longitude + '&current_weather=true');
    var wData = await wRes.json();
    showResult(place.name + ': ' + wData.current_weather.temperature + '°C');
  } catch (err) {
    showError(err.message);
  }
}`,
    [
      { level:'easy',   uk:'Завантаж погоду для реального міста — подивись на короткий "мерехтливий" skeleton перед результатом.', ru:'Загрузи погоду для реального города — посмотри на короткий "мерцающий" skeleton перед результатом.' },
      { level:'medium', uk:'Введи слово "error" в поле і натисни кнопку — переконайся, що бачиш саме червоне повідомлення про тестову помилку.', ru:'Введи слово "error" в поле и нажми кнопку — убедись, что видишь красное сообщение об ошибке.' },
      { level:'hard',   uk:'Введи неіснуюче місто (наприклад "Асдфгш") — переконайся, що показується "не знайдено", а не технічна помилка JS.', ru:'Введи несуществующий город — убедись, что показывается "не найдено", а не техническая ошибка JS.' },
    ]
  );

  /* ─── 13-15: ФІНАЛ 3 — Погодний застосунок ──────────────────────── */
  patch('13-15',
    { uk:`<h2>ФІНАЛ 3: Погодний застосунок</h2>
<p>Фінальний проект модуля — повний застосунок погоди на реальному Open-Meteo API: пошук міста, поточна погода, прогноз на 5 днів, геолокація, улюблені міста і перемикач °C/°F.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ Geocoding + Forecast API (реальні дані, без ключа)</li>
  <li>✅ Іконки погоди за weathercode</li>
  <li>✅ Прогноз на 5 днів</li>
  <li>✅ Геолокація одним кліком</li>
  <li>✅ Улюблені міста в localStorage</li>
  <li>✅ Перемикач Цельсій / Фаренгейт</li>
  <li>✅ Loading/error-стани для всіх запитів</li>
</ul>
<p>Відкрий вкладку JS і подивись повний код — саме так виглядає невеликий, але справжній застосунок, що працює з живим API.</p>`,
      ru:`<h2>ФИНАЛ 3: Погодное приложение</h2>
<p>Финальный проект модуля — полное приложение погоды на реальном Open-Meteo API: поиск города, текущая погода, прогноз на 5 дней, геолокация, избранные города и переключатель °C/°F.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ Geocoding + Forecast API (реальные данные, без ключа)</li>
  <li>✅ Иконки погоды по weathercode</li>
  <li>✅ Прогноз на 5 дней</li>
  <li>✅ Геолокация одним кликом</li>
  <li>✅ Избранные города в localStorage</li>
  <li>✅ Переключатель Цельсий / Фаренгейт</li>
  <li>✅ Loading/error-состояния для всех запросов</li>
</ul>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f1f5f9;padding:20px}
.wrap{max-width:420px;margin:0 auto}
.search-row{display:flex;gap:8px;margin-bottom:14px}
.search-row input{flex:1;background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:10px 12px;border-radius:8px;font-size:13px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:9px 14px;border-radius:8px;cursor:pointer;font-size:13px}
button:hover{border-color:#38bdf8}
.card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:20px;text-align:center;margin-bottom:14px;transition:background 1s ease}
.emoji{font-size:48px;margin:6px 0}
.temp{font-size:34px;font-weight:900}
.unit-btn{margin-top:10px}
.forecast{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.day{flex:1;min-width:60px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:10px;text-align:center;font-size:12px}
.favs{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
.fav-item{display:flex;justify-content:space-between;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:8px 12px;font-size:12.5px;cursor:pointer}
.skeleton{height:120px;border-radius:14px;background:linear-gradient(90deg,#1e293b 25%,#334155 50%,#1e293b 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;margin-bottom:14px}
@keyframes shimmer{from{background-position:200% 0}to{background-position:-200% 0}}
.err{color:#f87171;font-size:13px;text-align:center;margin-bottom:10px}
</style>
</head>
<body>
<div class="wrap">
  <div class="search-row">
    <input type="text" id="city-input" placeholder="Назва міста..." value="Київ">
    <button onclick="searchWeather()">🔍</button>
    <button onclick="useGeo()">📍</button>
  </div>

  <div id="error-box"></div>
  <div id="card-box"></div>
  <div id="forecast-box" class="forecast"></div>

  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
    <strong style="font-size:13px">⭐ Улюблені</strong>
    <button onclick="addFavorite()">+ Додати поточне</button>
  </div>
  <div id="favs-box" class="favs"></div>
</div>

<script>
var currentTempC = null;
var currentPlace = null;
var unit = 'C';

function getWeatherInfo(code) {
  if (code === 0) return { emoji: '☀️', text: 'Ясно' };
  if (code <= 3) return { emoji: '⛅', text: 'Хмарно' };
  if (code <= 48) return { emoji: '🌫️', text: 'Туман' };
  if (code <= 55) return { emoji: '🌦️', text: 'Мряка' };
  if (code <= 65) return { emoji: '🌧️', text: 'Дощ' };
  if (code <= 75) return { emoji: '❄️', text: 'Сніг' };
  if (code <= 82) return { emoji: '🌧️', text: 'Зливи' };
  return { emoji: '⛈️', text: 'Гроза' };
}
function c2f(c) { return c * 9 / 5 + 32; }

function showLoading() {
  document.getElementById('error-box').innerHTML = '';
  document.getElementById('card-box').innerHTML = '<div class="skeleton"></div>';
  document.getElementById('forecast-box').innerHTML = '';
}
function showError(msg) {
  document.getElementById('error-box').innerHTML = '<div class="err">❌ ' + msg + '</div>';
  document.getElementById('card-box').innerHTML = '';
}

function renderCard(place, weather) {
  currentPlace = place;
  currentTempC = weather.current_weather.temperature;
  var info = getWeatherInfo(weather.current_weather.weathercode);
  var value = unit === 'C' ? currentTempC : c2f(currentTempC);
  document.getElementById('card-box').innerHTML =
    '<div class="card"><div style="font-size:13px;color:#94a3b8">' + place.name + '</div>' +
    '<div class="emoji">' + info.emoji + '</div>' +
    '<div class="temp">' + Math.round(value) + '°' + unit + '</div>' +
    '<div style="font-size:13px;color:#94a3b8">' + info.text + '</div>' +
    '<button class="unit-btn" onclick="toggleUnit()">🔄 °C / °F</button></div>';
}

function toggleUnit() {
  unit = unit === 'C' ? 'F' : 'C';
  if (currentPlace) {
    var value = unit === 'C' ? currentTempC : c2f(currentTempC);
    document.querySelector('.temp').textContent = Math.round(value) + '°' + unit;
  }
}

function renderForecast(daily) {
  var dayNames = ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'];
  var box = document.getElementById('forecast-box');
  box.innerHTML = daily.time.map(function (date, i) {
    var dow = dayNames[new Date(date).getDay()];
    var info = getWeatherInfo(daily.weathercode[i]);
    return '<div class="day">' + dow + '<br>' + info.emoji + '<br>' + Math.round(daily.temperature_2m_max[i]) + '°/' + Math.round(daily.temperature_2m_min[i]) + '°</div>';
  }).join('');
}

async function loadByCoords(place) {
  showLoading();
  try {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + place.latitude + '&longitude=' + place.longitude +
      '&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=auto';
    var res = await fetch(url);
    var data = await res.json();
    renderCard(place, data);
    renderForecast(data.daily);
  } catch (err) {
    showError('Не вдалося завантажити погоду: ' + err.message);
  }
}

async function searchWeather() {
  var city = document.getElementById('city-input').value.trim();
  if (!city) return;
  showLoading();
  try {
    var geoRes = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1&language=uk');
    var geoData = await geoRes.json();
    if (!geoData.results || !geoData.results.length) { showError('Місто "' + city + '" не знайдено'); return; }
    await loadByCoords(geoData.results[0]);
  } catch (err) {
    showError('Помилка мережі: ' + err.message);
  }
}

function useGeo() {
  if (!navigator.geolocation) { showError('Геолокація не підтримується'); return; }
  showLoading();
  navigator.geolocation.getCurrentPosition(function (pos) {
    loadByCoords({ name: 'Моє місцезнаходження', latitude: pos.coords.latitude, longitude: pos.coords.longitude });
  }, function (err) {
    showError('Доступ до геолокації відхилено: ' + err.message);
  });
}

function getFavorites() { return JSON.parse(localStorage.getItem('weather-favs') || '[]'); }
function renderFavs() {
  var favs = getFavorites();
  var box = document.getElementById('favs-box');
  if (!favs.length) { box.innerHTML = '<div style="font-size:12px;color:#64748b">Поки порожньо</div>'; return; }
  box.innerHTML = favs.map(function (f, i) {
    return '<div class="fav-item"><span onclick="loadFavorite(' + i + ')">📍 ' + f.name + '</span><button onclick="removeFavorite(' + i + ')">✕</button></div>';
  }).join('');
}
function addFavorite() {
  if (!currentPlace) return;
  var favs = getFavorites();
  if (!favs.some(function (f) { return f.name === currentPlace.name; })) {
    favs.push(currentPlace);
    localStorage.setItem('weather-favs', JSON.stringify(favs));
    renderFavs();
  }
}
function removeFavorite(i) {
  var favs = getFavorites();
  favs.splice(i, 1);
  localStorage.setItem('weather-favs', JSON.stringify(favs));
  renderFavs();
}
function loadFavorite(i) {
  var favs = getFavorites();
  loadByCoords(favs[i]);
}

renderFavs();
searchWeather();
<\/script>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Дочекайся завантаження погоди Києва, потім знайди своє місто через пошук.', ru:'Дождись загрузки погоды Киева, потом найди свой город через поиск.' },
      { level:'medium', uk:'Натисни 📍 (геолокація), дозволь доступ, потім додай знайдене місце в улюблені кнопкою "+ Додати поточне".', ru:'Нажми 📍 (геолокация), разреши доступ, потом добавь найденное место в избранное.' },
      { level:'hard',   uk:'Введи неіснуюче місто і переконайся, що з\'являється акуратне повідомлення про помилку, а не поламаний інтерфейс.', ru:'Введи несуществующий город и убедись, что появляется аккуратное сообщение об ошибке.' },
      { level:'extra',  uk:'Додай кнопку "Очистити улюблені", яка викликає <code>localStorage.removeItem(\'weather-favs\')</code> і <code>renderFavs()</code>.', ru:'Добавь кнопку "Очистить избранное", вызывающую localStorage.removeItem и renderFavs().' },
    ]
  );

})();
