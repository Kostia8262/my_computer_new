/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 08 — Бази даних · 14–18
   Патчить WEB_LESSONS після завантаження lessons.js

   На відміну від модулів 06-07 (де Flask/Django виконувались через
   ЧЕСНУ JS-симуляцію, бо реального Python-рушія немає), тут для SQL
   підключено СПРАВЖНІЙ рушій: sql.js — SQLite, скомпільований у
   WebAssembly (https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/).
   Це не імітація: запити РЕАЛЬНО виконуються справжньою СУБД SQLite
   прямо в браузері користувача. Виняток — урок 08-09 (Redis), де
   через відсутність надійного Redis-у-браузері рушія лишається чесна
   JS-симуляція (позначена в теорії явно).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function patch(id, theory, html, css, js, tasks, python) {
    const l = WEB_LESSONS.find(x => x.id === id);
    if (!l) return;
    l.theory = theory;
    l.starterCode.html = html;
    l.starterCode.css  = css;
    l.starterCode.js   = js;
    l.starterCode.python = python;
    l.tasks = tasks;
  }

  /* Спільні хелпери для роботи зі sql.js передаються як ТЕКСТ у кожен
     урок (той самий приём, що й FAKE_FLASK_SRC/FAKE_DJANGO_SRC), бо
     код уроку виконується в ІЗОЛЬОВАНОМУ контексті через new Function()
     всередині runPythonDemo (app.js), без доступу до цієї області файлу. */
  const SQLJS_HELPERS_SRC = `function mkBtn(text, onClick) {
  var b = document.createElement('button');
  b.textContent = text;
  b.style.cssText = 'background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;margin:3px 6px 3px 0';
  b.onclick = onClick;
  return b;
}

function mkRow(root) {
  var row = document.createElement('div');
  row.style.cssText = 'margin-top:8px';
  root.appendChild(row);
  return row;
}

function logLine(termOut, text, color) {
  var span = document.createElement('div');
  span.style.color = color || '#8bc34a';
  span.style.fontFamily = 'Consolas, monospace';
  span.style.whiteSpace = 'pre';
  span.textContent = text;
  termOut.appendChild(span);
  termOut.scrollTop = termOut.scrollHeight;
}

function getSqlJs() {
  if (!window.__sqlJsPromise) {
    var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/';
    window.__sqlJsPromise = initSqlJs({ locateFile: function (f) { return CDN + f; } });
  }
  return window.__sqlJsPromise;
}

function runQuery(db, sql, termOut) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '> ' + sql, '#68a063');
  try {
    var res = db.exec(sql);
    if (!res.length) {
      logLine(termOut, '(запит виконано; рядків для показу немає)', '#4ade80');
      return res;
    }
    res.forEach(function (table) {
      logLine(termOut, table.columns.join(' | '), '#7dd3fc');
      logLine(termOut, table.columns.map(function () { return '---'; }).join('-+-'), '#475569');
      table.values.forEach(function (row) {
        logLine(termOut, row.join(' | '), '#4ade80');
      });
    });
    return res;
  } catch (e) {
    logLine(termOut, 'Помилка SQL: ' + e.message, '#f87171');
    return null;
  }
}

function initDb(demoRoot, termOut, setupStatements, onReady) {
  var status = document.createElement('div');
  status.style.cssText = 'color:#94a3b8;font-size:12px;margin-bottom:6px';
  status.textContent = 'Завантаження SQLite (sql.js, WebAssembly)...';
  demoRoot.appendChild(status);
  getSqlJs().then(function (SQL) {
    var db = new SQL.Database();
    setupStatements.forEach(function (sql) { db.run(sql); });
    status.textContent = '✓ SQLite готовий — це СПРАВЖНІЙ рушій sql.js, а не імітація';
    status.style.color = '#4ade80';
    onReady(db);
  }).catch(function (err) {
    status.textContent = 'Не вдалося завантажити sql.js: ' + err;
    status.style.color = '#f87171';
  });
}
`;

  /* ─── 08-01: SQL DDL та DML ────────────────────────────────────────── */
  patch('08-01',
    { uk:`<h2>SQL DDL та DML: CREATE, INSERT, SELECT, UPDATE, DELETE</h2>
<p>SQL (Structured Query Language) ділиться на дві головні групи команд: DDL (Data Definition Language) — опис структури даних, і DML (Data Manipulation Language) — робота з самими даними.</p>
<h3>DDL — створення таблиці</h3>
<pre>CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    grade INTEGER,
    email TEXT UNIQUE
);</pre>
<h3>DML — вставка, вибірка, оновлення, видалення</h3>
<pre>INSERT INTO students (name, grade, email) VALUES ('Аліна', 10, 'alina@example.com');

SELECT * FROM students;
SELECT name, grade FROM students WHERE grade > 9;

UPDATE students SET grade = 11 WHERE name = 'Аліна';

DELETE FROM students WHERE grade IS NULL;</pre>
<h3>Обмеження (constraints)</h3>
<ul>
  <li><code>PRIMARY KEY</code> — унікальний ідентифікатор рядка</li>
  <li><code>NOT NULL</code> — поле не може бути порожнім</li>
  <li><code>UNIQUE</code> — значення не повинно повторюватись у таблиці</li>
  <li><code>DEFAULT</code> — значення за замовчуванням, якщо не вказано інше</li>
</ul>
<h3>Ця пісочниця виконує СПРАВЖНІЙ SQL</h3>
<p>На відміну від Flask/Django (модулі 06-07), де немає реального Python-рушія й доводиться симулювати логіку на JS, тут підключено <strong>sql.js</strong> — справжню SQLite, скомпільовану у WebAssembly. Запити нижче виконуються РЕАЛЬНОЮ базою даних просто в твоєму браузері.</p>`,
      ru:`<h2>SQL DDL и DML: CREATE, INSERT, SELECT, UPDATE, DELETE</h2>
<p>SQL делится на DDL (Data Definition Language) — описание структуры данных, и DML (Data Manipulation Language) — работа с самими данными.</p>
<h3>DDL — создание таблицы</h3>
<pre>CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    grade INTEGER,
    email TEXT UNIQUE
);</pre>
<h3>DML — вставка, выборка, обновление, удаление</h3>
<pre>INSERT INTO students (name, grade, email) VALUES ('Алина', 10, 'alina@example.com');

SELECT * FROM students;
SELECT name, grade FROM students WHERE grade > 9;

UPDATE students SET grade = 11 WHERE name = 'Алина';

DELETE FROM students WHERE grade IS NULL;</pre>
<h3>Ограничения (constraints)</h3>
<ul>
  <li>PRIMARY KEY — уникальный идентификатор строки</li>
  <li>NOT NULL — поле не может быть пустым</li>
  <li>UNIQUE — значение не должно повторяться</li>
  <li>DEFAULT — значение по умолчанию</li>
</ul>
<h3>Эта песочница выполняет НАСТОЯЩИЙ SQL</h3>
<p>В отличие от Flask/Django, здесь подключён sql.js — настоящая SQLite, скомпилированная в WebAssembly. Запросы ниже выполняются РЕАЛЬНОЙ базой данных в твоём браузере.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, grade INTEGER, email TEXT UNIQUE)",
  "INSERT INTO students (name, grade, email) VALUES ('Аліна', 10, 'alina@example.com')",
  "INSERT INTO students (name, grade, email) VALUES ('Марко', 11, 'marko@example.com')"
], function (db) {
  row.appendChild(mkBtn('SELECT * FROM students', function () { runQuery(db, 'SELECT * FROM students', termOut); }));
  row.appendChild(mkBtn("INSERT нового учня", function () { runQuery(db, "INSERT INTO students (name, grade, email) VALUES ('Ірина', 9, 'irina@example.com')", termOut); }));
  row.appendChild(mkBtn("UPDATE grade Аліни", function () { runQuery(db, "UPDATE students SET grade = 12 WHERE name = 'Аліна'", termOut); }));
  row.appendChild(mkBtn("DELETE Марка", function () { runQuery(db, "DELETE FROM students WHERE name = 'Марко'", termOut); }));
});`,
    [
      { level:'easy',   uk:'Виконай усі чотири кнопки по черзі й подивись, як <code>SELECT</code> після кожної дії показує ЗМІНЕНИЙ стан справжньої таблиці.', ru:'Выполни все четыре кнопки по очереди и посмотри, как SELECT после каждого действия показывает изменённое состояние настоящей таблицы.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши SQL-запит, що додає нову колонку <code>phone TEXT</code> у таблицю <code>students</code> через <code>ALTER TABLE</code>.', ru:'В main.py допиши запрос ALTER TABLE, добавляющий колонку phone TEXT.' },
      { level:'hard',   uk:'Додай нову кнопку, що виконує <code>SELECT * FROM students WHERE grade &gt;= 10 ORDER BY grade DESC</code>, і перевір результат на справжніх даних.', ru:'Добавь кнопку с запросом SELECT * FROM students WHERE grade >= 10 ORDER BY grade DESC.' },
    ],
    `-- Реальний, ідіоматичний SQL (SQLite/PostgreSQL-сумісний діалект)

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    grade INTEGER,
    email TEXT UNIQUE
);

INSERT INTO students (name, grade, email) VALUES ('Аліна', 10, 'alina@example.com');
INSERT INTO students (name, grade, email) VALUES ('Марко', 11, 'marko@example.com');

SELECT * FROM students;
SELECT name, grade FROM students WHERE grade > 9;

UPDATE students SET grade = 12 WHERE name = 'Аліна';

DELETE FROM students WHERE name = 'Марко';

ALTER TABLE students ADD COLUMN phone TEXT;
`
  );

  /* ─── 08-02: JOIN ──────────────────────────────────────────────────── */
  patch('08-02',
    { uk:`<h2>JOIN: INNER, LEFT, RIGHT, FULL OUTER та CROSS</h2>
<p>JOIN обʼєднує рядки з двох (чи більше) таблиць за спільним ключем — базова операція для роботи зі звʼязаними даними.</p>
<h3>INNER JOIN — лише рядки, що співпадають в обох таблицях</h3>
<pre>SELECT visits.id, students.name, visits.visit_date
FROM visits
INNER JOIN students ON visits.student_id = students.id;</pre>
<h3>LEFT JOIN — усі рядки лівої таблиці, навіть без пари справа</h3>
<pre>SELECT students.name, visits.visit_date
FROM students
LEFT JOIN visits ON students.id = visits.student_id;
-- студенти без жодного відвідування отримають NULL у visit_date</pre>
<h3>RIGHT JOIN та FULL OUTER JOIN</h3>
<pre>SELECT students.name, visits.visit_date
FROM students
RIGHT JOIN visits ON students.id = visits.student_id;

SELECT students.name, visits.visit_date
FROM students
FULL OUTER JOIN visits ON students.id = visits.student_id;</pre>
<p><strong>Важливо:</strong> SQLite (і, відповідно, sql.js у цій пісочниці) підтримує <code>RIGHT JOIN</code> і <code>FULL OUTER JOIN</code> лише починаючи з версії 3.39 (2022). MySQL узагалі НЕ підтримує <code>FULL OUTER JOIN</code> напряму — його емулюють через <code>UNION</code> двох <code>LEFT JOIN</code>-ів.</p>
<h3>CROSS JOIN — декартів добуток (усі комбінації)</h3>
<pre>SELECT sizes.label, colors.label
FROM sizes
CROSS JOIN colors;
-- якщо 3 розміри і 4 кольори -> 12 комбінацій</pre>`,
      ru:`<h2>JOIN: INNER, LEFT, RIGHT, FULL OUTER и CROSS</h2>
<p>JOIN объединяет строки из двух таблиц по общему ключу.</p>
<h3>INNER JOIN</h3>
<pre>SELECT visits.id, students.name, visits.visit_date
FROM visits
INNER JOIN students ON visits.student_id = students.id;</pre>
<h3>LEFT JOIN</h3>
<pre>SELECT students.name, visits.visit_date
FROM students
LEFT JOIN visits ON students.id = visits.student_id;</pre>
<h3>RIGHT JOIN и FULL OUTER JOIN</h3>
<pre>SELECT students.name, visits.visit_date
FROM students
FULL OUTER JOIN visits ON students.id = visits.student_id;</pre>
<p><strong>Важно:</strong> SQLite поддерживает RIGHT JOIN и FULL OUTER JOIN только с версии 3.39 (2022). MySQL вообще не поддерживает FULL OUTER JOIN напрямую.</p>
<h3>CROSS JOIN</h3>
<pre>SELECT sizes.label, colors.label
FROM sizes
CROSS JOIN colors;</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT)",
  "INSERT INTO students VALUES (1, 'Аліна'), (2, 'Марко'), (3, 'Ірина')",
  "CREATE TABLE visits (id INTEGER PRIMARY KEY, student_id INTEGER, visit_date TEXT)",
  "INSERT INTO visits VALUES (1, 1, '2026-07-01'), (2, 1, '2026-07-03'), (3, 2, '2026-07-02')"
], function (db) {
  row.appendChild(mkBtn('INNER JOIN', function () {
    runQuery(db, 'SELECT students.name, visits.visit_date FROM visits INNER JOIN students ON visits.student_id = students.id', termOut);
  }));
  row.appendChild(mkBtn('LEFT JOIN', function () {
    runQuery(db, 'SELECT students.name, visits.visit_date FROM students LEFT JOIN visits ON students.id = visits.student_id', termOut);
  }));
  row.appendChild(mkBtn('RIGHT / FULL OUTER JOIN', function () {
    runQuery(db, 'SELECT students.name, visits.visit_date FROM students FULL OUTER JOIN visits ON students.id = visits.student_id', termOut);
  }));
  row.appendChild(mkBtn('CROSS JOIN (2x2)', function () {
    db.run("CREATE TABLE IF NOT EXISTS sizes (label TEXT); DELETE FROM sizes; INSERT INTO sizes VALUES ('S'), ('M')");
    db.run("CREATE TABLE IF NOT EXISTS colors (label TEXT); DELETE FROM colors; INSERT INTO colors VALUES ('чорний'), ('білий')");
    runQuery(db, 'SELECT sizes.label, colors.label FROM sizes CROSS JOIN colors', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Порівняй результати <code>INNER JOIN</code> і <code>LEFT JOIN</code> — зверни увагу, що Ірина (без відвідувань) зʼявляється лише в LEFT JOIN.', ru:'Сравни результаты INNER JOIN и LEFT JOIN — заметь, что Ирина (без посещений) появляется только в LEFT JOIN.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши запит із <code>RIGHT JOIN</code>, що показує ВСІ відвідування, навіть якщо студента випадково видалили.', ru:'В main.py допиши запрос с RIGHT JOIN, показывающий все посещения, даже без студента.' },
      { level:'hard',   uk:'Спробуй кнопку <code>RIGHT / FULL OUTER JOIN</code> — якщо вона видає помилку (версія SQLite застаріла), поясни своїми словами, чому це трапляється, спираючись на текст теорії.', ru:'Попробуй кнопку RIGHT / FULL OUTER JOIN — если ошибка, объясни почему, опираясь на текст теории.' },
    ],
    `-- Реальний SQL: JOIN-и

CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO students VALUES (1, 'Аліна'), (2, 'Марко'), (3, 'Ірина');

CREATE TABLE visits (id INTEGER PRIMARY KEY, student_id INTEGER, visit_date TEXT);
INSERT INTO visits VALUES (1, 1, '2026-07-01'), (2, 1, '2026-07-03'), (3, 2, '2026-07-02');

SELECT students.name, visits.visit_date
FROM visits
INNER JOIN students ON visits.student_id = students.id;

SELECT students.name, visits.visit_date
FROM students
LEFT JOIN visits ON students.id = visits.student_id;

SELECT students.name, visits.visit_date
FROM students
FULL OUTER JOIN visits ON students.id = visits.student_id;

SELECT sizes.label, colors.label
FROM sizes
CROSS JOIN colors;
`
  );

  /* ─── 08-03: Агрегатні функції ─────────────────────────────────────── */
  patch('08-03',
    { uk:`<h2>Агрегатні функції: COUNT, SUM, AVG, GROUP BY, HAVING</h2>
<h3>Базові агрегатні функції</h3>
<pre>SELECT COUNT(*) FROM visits;
SELECT SUM(price) FROM memberships;
SELECT AVG(grade) FROM students;
SELECT MIN(grade), MAX(grade) FROM students;</pre>
<h3>GROUP BY — групування рядків</h3>
<pre>SELECT student_id, COUNT(*) AS visit_count
FROM visits
GROUP BY student_id;</pre>
<h3>HAVING — фільтрація ПІСЛЯ групування</h3>
<pre>SELECT student_id, COUNT(*) AS visit_count
FROM visits
GROUP BY student_id
HAVING COUNT(*) >= 2;
-- WHERE фільтрує рядки ДО групування, HAVING — групи ПІСЛЯ</pre>
<h3>Комбінація з JOIN</h3>
<pre>SELECT students.name, COUNT(visits.id) AS total_visits
FROM students
LEFT JOIN visits ON students.id = visits.student_id
GROUP BY students.id
ORDER BY total_visits DESC;</pre>
<h3>Різниця WHERE vs HAVING</h3>
<p><code>WHERE</code> застосовується до окремих рядків ДО того, як вони згруповані; <code>HAVING</code> застосовується до вже згрупованих результатів (наприклад, "покажи лише студентів, які відвідали залу 5+ разів").</p>`,
      ru:`<h2>Агрегатные функции: COUNT, SUM, AVG, GROUP BY, HAVING</h2>
<h3>Базовые агрегатные функции</h3>
<pre>SELECT COUNT(*) FROM visits;
SELECT SUM(price) FROM memberships;
SELECT AVG(grade) FROM students;</pre>
<h3>GROUP BY</h3>
<pre>SELECT student_id, COUNT(*) AS visit_count
FROM visits
GROUP BY student_id;</pre>
<h3>HAVING</h3>
<pre>SELECT student_id, COUNT(*) AS visit_count
FROM visits
GROUP BY student_id
HAVING COUNT(*) >= 2;</pre>
<h3>Комбинация с JOIN</h3>
<pre>SELECT students.name, COUNT(visits.id) AS total_visits
FROM students
LEFT JOIN visits ON students.id = visits.student_id
GROUP BY students.id
ORDER BY total_visits DESC;</pre>
<h3>Разница WHERE vs HAVING</h3>
<p>WHERE применяется к строкам ДО группировки, HAVING — к группам ПОСЛЕ.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT)",
  "INSERT INTO students VALUES (1, 'Аліна'), (2, 'Марко'), (3, 'Ірина')",
  "CREATE TABLE visits (id INTEGER PRIMARY KEY, student_id INTEGER, visit_date TEXT)",
  "INSERT INTO visits VALUES (1,1,'2026-07-01'), (2,1,'2026-07-03'), (3,1,'2026-07-05'), (4,2,'2026-07-02')"
], function (db) {
  row.appendChild(mkBtn('COUNT(*) FROM visits', function () { runQuery(db, 'SELECT COUNT(*) AS total FROM visits', termOut); }));
  row.appendChild(mkBtn('GROUP BY student_id', function () { runQuery(db, 'SELECT student_id, COUNT(*) AS visit_count FROM visits GROUP BY student_id', termOut); }));
  row.appendChild(mkBtn('HAVING COUNT(*) >= 2', function () { runQuery(db, 'SELECT student_id, COUNT(*) AS visit_count FROM visits GROUP BY student_id HAVING COUNT(*) >= 2', termOut); }));
  row.appendChild(mkBtn('JOIN + GROUP BY + ORDER BY', function () {
    runQuery(db, 'SELECT students.name, COUNT(visits.id) AS total_visits FROM students LEFT JOIN visits ON students.id = visits.student_id GROUP BY students.id ORDER BY total_visits DESC', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Порівняй звичайний <code>GROUP BY</code> і <code>GROUP BY ... HAVING</code> — переконайся, що Марко (з 1 відвідуванням) зникає після HAVING.', ru:'Сравни обычный GROUP BY и GROUP BY ... HAVING — убедись, что Марко (с 1 посещением) исчезает после HAVING.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши запит із <code>AVG</code>, що рахує середню кількість відвідувань на студента.', ru:'В main.py допиши запрос с AVG, считающий среднее количество посещений на студента.' },
      { level:'hard',   uk:'Додай нову кнопку з запитом, що використовує ОДНОЧАСНО <code>WHERE</code> (наприклад, фільтр за датою) і <code>HAVING</code> — поясни, у якому порядку СУБД їх застосовує.', ru:'Добавь кнопку с запросом, использующим одновременно WHERE и HAVING — объясни порядок применения.' },
    ],
    `-- Реальний SQL: агрегатні функції

SELECT COUNT(*) AS total FROM visits;
SELECT AVG(grade) FROM students;

SELECT student_id, COUNT(*) AS visit_count
FROM visits
GROUP BY student_id;

SELECT student_id, COUNT(*) AS visit_count
FROM visits
GROUP BY student_id
HAVING COUNT(*) >= 2;

SELECT students.name, COUNT(visits.id) AS total_visits
FROM students
LEFT JOIN visits ON students.id = visits.student_id
GROUP BY students.id
ORDER BY total_visits DESC;
`
  );

  /* ─── 08-04: Підзапити та WITH (CTE) ───────────────────────────────── */
  patch('08-04',
    { uk:`<h2>Підзапити та WITH (CTE — Common Table Expressions)</h2>
<h3>Підзапит у WHERE</h3>
<pre>SELECT name FROM students
WHERE id IN (SELECT student_id FROM visits WHERE visit_date = '2026-07-01');</pre>
<h3>Підзапит у FROM</h3>
<pre>SELECT avg_visits.avg_count
FROM (
    SELECT student_id, COUNT(*) AS visit_count FROM visits GROUP BY student_id
) AS student_counts,
(SELECT AVG(visit_count) AS avg_count FROM (
    SELECT COUNT(*) AS visit_count FROM visits GROUP BY student_id
)) AS avg_visits;</pre>
<h3>WITH (CTE) — читабельніша альтернатива вкладеним підзапитам</h3>
<pre>WITH visit_counts AS (
    SELECT student_id, COUNT(*) AS total
    FROM visits
    GROUP BY student_id
)
SELECT students.name, visit_counts.total
FROM students
JOIN visit_counts ON students.id = visit_counts.student_id
WHERE visit_counts.total >= 2;</pre>
<h3>Рекурсивний CTE</h3>
<pre>WITH RECURSIVE counter(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM counter WHERE n < 5
)
SELECT * FROM counter;
-- Результат: 1, 2, 3, 4, 5</pre>
<p>CTE (<code>WITH</code>) особливо корисний, коли той самий підзапит потрібен кілька разів у одному запиті — визначаєш його ОДИН раз і посилаєшся на нього за назвою.</p>`,
      ru:`<h2>Подзапросы и WITH (CTE)</h2>
<h3>Подзапрос в WHERE</h3>
<pre>SELECT name FROM students
WHERE id IN (SELECT student_id FROM visits WHERE visit_date = '2026-07-01');</pre>
<h3>Подзапрос в FROM</h3>
<pre>SELECT student_id, COUNT(*) AS visit_count
FROM (SELECT * FROM visits) AS v
GROUP BY student_id;</pre>
<h3>WITH (CTE)</h3>
<pre>WITH visit_counts AS (
    SELECT student_id, COUNT(*) AS total
    FROM visits
    GROUP BY student_id
)
SELECT students.name, visit_counts.total
FROM students
JOIN visit_counts ON students.id = visit_counts.student_id
WHERE visit_counts.total >= 2;</pre>
<h3>Рекурсивный CTE</h3>
<pre>WITH RECURSIVE counter(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM counter WHERE n < 5
)
SELECT * FROM counter;</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT)",
  "INSERT INTO students VALUES (1, 'Аліна'), (2, 'Марко'), (3, 'Ірина')",
  "CREATE TABLE visits (id INTEGER PRIMARY KEY, student_id INTEGER, visit_date TEXT)",
  "INSERT INTO visits VALUES (1,1,'2026-07-01'), (2,1,'2026-07-03'), (3,2,'2026-07-01')"
], function (db) {
  row.appendChild(mkBtn('Підзапит у WHERE', function () {
    runQuery(db, "SELECT name FROM students WHERE id IN (SELECT student_id FROM visits WHERE visit_date = '2026-07-01')", termOut);
  }));
  row.appendChild(mkBtn('WITH (CTE)', function () {
    runQuery(db, 'WITH visit_counts AS (SELECT student_id, COUNT(*) AS total FROM visits GROUP BY student_id) SELECT students.name, visit_counts.total FROM students JOIN visit_counts ON students.id = visit_counts.student_id WHERE visit_counts.total >= 2', termOut);
  }));
  row.appendChild(mkBtn('WITH RECURSIVE (1..5)', function () {
    runQuery(db, 'WITH RECURSIVE counter(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM counter WHERE n < 5) SELECT * FROM counter', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Виконай усі три кнопки й порівняй, як однакову задачу (знайти студентів із 2+ відвідуваннями) можна вирішити ЧЕРЕЗ CTE замість вкладеного підзапиту.', ru:'Выполни все три кнопки и сравни, как одну задачу можно решить через CTE вместо вложенного подзапроса.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши CTE, що рахує СЕРЕДНЮ кількість відвідувань на студента (<code>AVG(total)</code> поверх <code>visit_counts</code>).', ru:'В main.py допиши CTE, считающий среднее количество посещений на студента.' },
      { level:'hard',   uk:'Зміни рекурсивний CTE так, щоб він рахував від 1 до 10 замість 1 до 5 — онови умову <code>WHERE n &lt; 5</code>.', ru:'Измени рекурсивный CTE так, чтобы он считал от 1 до 10 вместо 1 до 5.' },
    ],
    `-- Реальний SQL: підзапити та CTE

SELECT name FROM students
WHERE id IN (SELECT student_id FROM visits WHERE visit_date = '2026-07-01');

WITH visit_counts AS (
    SELECT student_id, COUNT(*) AS total
    FROM visits
    GROUP BY student_id
)
SELECT students.name, visit_counts.total
FROM students
JOIN visit_counts ON students.id = visit_counts.student_id
WHERE visit_counts.total >= 2;

WITH RECURSIVE counter(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM counter WHERE n < 5
)
SELECT * FROM counter;
`
  );

  /* ─── 08-05: Індекси ───────────────────────────────────────────────── */
  patch('08-05',
    { uk:`<h2>Індекси: навіщо, коли і як створювати</h2>
<p>Без індексу СУБД перевіряє КОЖЕН рядок таблиці, щоб знайти потрібні (full table scan) — повільно на великих таблицях. Індекс — це додаткова структура (зазвичай B-Tree), яка дозволяє знаходити рядки набагато швидше.</p>
<h3>Створення індексу</h3>
<pre>CREATE INDEX idx_visits_student_id ON visits(student_id);
CREATE UNIQUE INDEX idx_students_email ON students(email);</pre>
<h3>Перевірка, чи використовується індекс</h3>
<pre>EXPLAIN QUERY PLAN
SELECT * FROM visits WHERE student_id = 1;
-- Без індексу: SCAN visits
-- З індексом:  SEARCH visits USING INDEX idx_visits_student_id (student_id=?)</pre>
<h3>Коли створювати індекс</h3>
<ul>
  <li>Поле часто використовується у <code>WHERE</code>, <code>JOIN ON</code>, <code>ORDER BY</code></li>
  <li>Таблиця велика (тисячі-мільйони рядків) — на маленьких таблицях виграш непомітний</li>
</ul>
<h3>Ціна індексів</h3>
<p>Індекси прискорюють ЧИТАННЯ, але сповільнюють <code>INSERT</code>/<code>UPDATE</code>/<code>DELETE</code> (СУБД повинна оновлювати й індекс теж), і займають додатковий дисковий простір — тому індексувати варто ОБДУМАНО, а не "на все".</p>`,
      ru:`<h2>Индексы: зачем, когда и как создавать</h2>
<p>Без индекса СУБД проверяет каждую строку таблицы (full table scan). Индекс — дополнительная структура (обычно B-Tree), позволяющая находить строки быстрее.</p>
<h3>Создание индекса</h3>
<pre>CREATE INDEX idx_visits_student_id ON visits(student_id);
CREATE UNIQUE INDEX idx_students_email ON students(email);</pre>
<h3>Проверка использования индекса</h3>
<pre>EXPLAIN QUERY PLAN
SELECT * FROM visits WHERE student_id = 1;</pre>
<h3>Когда создавать индекс</h3>
<ul>
  <li>Поле часто используется в WHERE, JOIN ON, ORDER BY</li>
  <li>Таблица большая</li>
</ul>
<h3>Цена индексов</h3>
<p>Индексы ускоряют чтение, но замедляют INSERT/UPDATE/DELETE и занимают место.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE visits (id INTEGER PRIMARY KEY, student_id INTEGER, visit_date TEXT)",
  "INSERT INTO visits (student_id, visit_date) VALUES (1,'2026-07-01'), (2,'2026-07-02'), (1,'2026-07-03')"
], function (db) {
  row.appendChild(mkBtn('EXPLAIN QUERY PLAN (без індексу)', function () {
    runQuery(db, 'EXPLAIN QUERY PLAN SELECT * FROM visits WHERE student_id = 1', termOut);
  }));
  row.appendChild(mkBtn('CREATE INDEX', function () {
    runQuery(db, 'CREATE INDEX idx_visits_student_id ON visits(student_id)', termOut);
  }));
  row.appendChild(mkBtn('EXPLAIN QUERY PLAN (з індексом)', function () {
    runQuery(db, 'EXPLAIN QUERY PLAN SELECT * FROM visits WHERE student_id = 1', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Виконай план запиту ДО і ПІСЛЯ створення індексу — порівняй, як змінюється рядок плану (SCAN → SEARCH USING INDEX).', ru:'Выполни план запроса до и после создания индекса — сравни изменение (SCAN → SEARCH USING INDEX).' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши <code>CREATE UNIQUE INDEX</code> для поля <code>email</code> у таблиці <code>students</code>.', ru:'В main.py допиши CREATE UNIQUE INDEX для поля email в students.' },
      { level:'hard',   uk:'Додай кнопку, що виконує <code>EXPLAIN QUERY PLAN</code> для запиту з <code>ORDER BY visit_date</code>, і подумай, чи допоміг би тут ще один індекс.', ru:'Добавь кнопку с EXPLAIN QUERY PLAN для запроса с ORDER BY visit_date.' },
    ],
    `-- Реальний SQL: індекси

CREATE TABLE visits (id INTEGER PRIMARY KEY, student_id INTEGER, visit_date TEXT);
INSERT INTO visits (student_id, visit_date) VALUES (1,'2026-07-01'), (2,'2026-07-02');

EXPLAIN QUERY PLAN
SELECT * FROM visits WHERE student_id = 1;

CREATE INDEX idx_visits_student_id ON visits(student_id);

EXPLAIN QUERY PLAN
SELECT * FROM visits WHERE student_id = 1;

CREATE UNIQUE INDEX idx_students_email ON students(email);
`
  );

  /* ─── 08-06: Транзакції ────────────────────────────────────────────── */
  patch('08-06',
    { uk:`<h2>Транзакції: ACID, BEGIN, COMMIT, ROLLBACK</h2>
<p>Транзакція — група операцій, що виконується як ОДНЕ ціле: або всі успішні, або жодна не застосовується.</p>
<h3>ACID</h3>
<ul>
  <li><strong>Atomicity</strong> (атомарність) — всі операції транзакції виконуються повністю, або жодна</li>
  <li><strong>Consistency</strong> (узгодженість) — база переходить з одного коректного стану в інший</li>
  <li><strong>Isolation</strong> (ізольованість) — паралельні транзакції не заважають одна одній</li>
  <li><strong>Durability</strong> (тривкість) — після COMMIT дані збережені назавжди, навіть при збої</li>
</ul>
<h3>Приклад: переказ коштів (класичний приклад транзакції)</h3>
<pre>BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- Якщо ДРУГИЙ UPDATE впаде з помилкою — перший теж має відкотитись,
-- інакше гроші "зникнуть" з одного рахунку, не зʼявившись на іншому</pre>
<h3>ROLLBACK — відкат при помилці</h3>
<pre>BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- сталася помилка...
ROLLBACK;
-- стан бази повертається до моменту ПЕРЕД BEGIN</pre>
<h3>У Python (через SQLAlchemy)</h3>
<pre>try:
    with session.begin():
        account1.balance -= 100
        account2.balance += 100
except Exception:
    session.rollback()
    raise</pre>`,
      ru:`<h2>Транзакции: ACID, BEGIN, COMMIT, ROLLBACK</h2>
<p>Транзакция — группа операций, выполняемая как единое целое: либо все успешны, либо ни одна не применяется.</p>
<h3>ACID</h3>
<ul>
  <li>Atomicity — все операции выполняются полностью, или ни одна</li>
  <li>Consistency — база переходит из одного корректного состояния в другое</li>
  <li>Isolation — параллельные транзакции не мешают друг другу</li>
  <li>Durability — после COMMIT данные сохранены навсегда</li>
</ul>
<h3>Пример: перевод средств</h3>
<pre>BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;</pre>
<h3>ROLLBACK</h3>
<pre>BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
ROLLBACK;</pre>
<h3>В Python (через SQLAlchemy)</h3>
<pre>try:
    with session.begin():
        account1.balance -= 100
        account2.balance += 100
except Exception:
    session.rollback()
    raise</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT, balance INTEGER)",
  "INSERT INTO accounts VALUES (1, 'Аліна', 500), (2, 'Марко', 200)"
], function (db) {
  row.appendChild(mkBtn('Баланси зараз', function () { runQuery(db, 'SELECT * FROM accounts', termOut); }));
  row.appendChild(mkBtn('Переказ 100 (COMMIT)', function () {
    db.run('BEGIN TRANSACTION');
    db.run('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
    db.run('UPDATE accounts SET balance = balance + 100 WHERE id = 2');
    db.run('COMMIT');
    runQuery(db, 'SELECT * FROM accounts', termOut);
  }));
  row.appendChild(mkBtn('Переказ 999 (ROLLBACK)', function () {
    db.run('BEGIN TRANSACTION');
    db.run('UPDATE accounts SET balance = balance - 999 WHERE id = 1');
    logLine(termOut, '', '#64748b');
    logLine(termOut, 'Симулюємо помилку після першого UPDATE -> ROLLBACK', '#facc15');
    db.run('ROLLBACK');
    runQuery(db, 'SELECT * FROM accounts', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Виконай "Переказ 100 (COMMIT)" і подивись баланси — переконайся, що сума ЗАГАЛЬНОГО балансу не змінилась (гроші лише перемістились).', ru:'Выполни "Перевод 100 (COMMIT)" и посмотри балансы — убедись, что общая сумма не изменилась.' },
      { level:'medium', uk:'Виконай "Переказ 999 (ROLLBACK)" і переконайся, що баланс Аліни НЕ змінився — <code>ROLLBACK</code> справді скасував зміну.', ru:'Выполни "Перевод 999 (ROLLBACK)" и убедись, что баланс Алины не изменился.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши блок <code>try/except</code> навколо переказу коштів через SQLAlchemy, що робить <code>rollback()</code> при винятку.', ru:'В main.py допиши блок try/except вокруг перевода средств с rollback() при исключении.' },
    ],
    `-- Реальний SQL: транзакції

CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT, balance INTEGER);
INSERT INTO accounts VALUES (1, 'Аліна', 500), (2, 'Марко', 200);

BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- приклад відкату:
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 999 WHERE id = 1;
ROLLBACK;
`
  );

  /* ─── 08-07: PostgreSQL ────────────────────────────────────────────── */
  patch('08-07',
    { uk:`<h2>PostgreSQL: встановлення, psql, pgAdmin</h2>
<p>PostgreSQL — потужна, безкоштовна реляційна СУБД, найпопулярніший вибір для серйозних Django/Flask-проектів у продакшн.</p>
<h3>Встановлення (Ubuntu/Debian)</h3>
<pre>sudo apt install postgresql postgresql-contrib
sudo -u postgres psql</pre>
<h3>psql — командний рядок PostgreSQL</h3>
<pre>\\l              -- список усіх баз даних
\\c mydb         -- підключитись до бази mydb
\\dt             -- список таблиць у поточній базі
\\d students     -- структура (колонки) таблиці students
\\du             -- список користувачів/ролей
\\q              -- вийти</pre>
<h3>Створення бази й користувача</h3>
<pre>CREATE DATABASE gym_tracker;
CREATE USER gym_admin WITH PASSWORD 'секретний_пароль';
GRANT ALL PRIVILEGES ON DATABASE gym_tracker TO gym_admin;</pre>
<h3>pgAdmin — графічний інтерфейс</h3>
<p>pgAdmin — вебзастосунок для керування PostgreSQL мишкою замість команд: перегляд таблиць, редагування даних, побудова запитів через візуальний конструктор.</p>
<h3>Ця пісочниця: SQLite замість PostgreSQL</h3>
<p>sql.js (використаний нижче) — це SQLite, а НЕ PostgreSQL. Синтаксис самих SQL-запитів (<code>SELECT</code>, <code>JOIN</code> тощо) практично ідентичний, але команди на кшталт <code>\\dt</code> — специфічні для psql. Нижче показано, як ОТРИМАТИ ту саму інформацію (список таблиць, структуру таблиці) через стандартний SQL, що працює в обох СУБД.</p>`,
      ru:`<h2>PostgreSQL: установка, psql, pgAdmin</h2>
<p>PostgreSQL — мощная бесплатная реляционная СУБД, популярный выбор для Django/Flask-проектов в продакшене.</p>
<h3>Установка (Ubuntu/Debian)</h3>
<pre>sudo apt install postgresql postgresql-contrib
sudo -u postgres psql</pre>
<h3>psql — командная строка PostgreSQL</h3>
<pre>\\l              -- список баз данных
\\c mydb         -- подключиться к базе mydb
\\dt             -- список таблиц
\\d students     -- структура таблицы
\\du             -- список пользователей
\\q              -- выйти</pre>
<h3>Создание базы и пользователя</h3>
<pre>CREATE DATABASE gym_tracker;
CREATE USER gym_admin WITH PASSWORD 'секретный_пароль';
GRANT ALL PRIVILEGES ON DATABASE gym_tracker TO gym_admin;</pre>
<h3>pgAdmin</h3>
<p>pgAdmin — веб-приложение для управления PostgreSQL мышкой.</p>
<h3>Эта песочница: SQLite вместо PostgreSQL</h3>
<p>sql.js — это SQLite, а не PostgreSQL. Синтаксис самих запросов почти идентичен, но команды вида \\dt специфичны для psql. Ниже показано, как получить ту же информацию через стандартный SQL.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, grade INTEGER)",
  "INSERT INTO students VALUES (1, 'Аліна', 10)"
], function (db) {
  row.appendChild(mkBtn('\\\\dt (список таблиць)', function () {
    runQuery(db, "SELECT name FROM sqlite_master WHERE type='table'", termOut);
  }));
  row.appendChild(mkBtn('\\\\d students (структура)', function () {
    runQuery(db, 'PRAGMA table_info(students)', termOut);
  }));
  row.appendChild(mkBtn('SELECT * FROM students', function () {
    runQuery(db, 'SELECT * FROM students', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Виконай <code>\\\\dt</code>-аналог і <code>\\\\d students</code>-аналог та подивись, як реальна СУБД зберігає метадані про власні таблиці.', ru:'Выполни аналоги \\\\dt и \\\\d students и посмотри, как СУБД хранит метаданные о своих таблицах.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши команду <code>CREATE USER</code> і <code>GRANT</code> для нового користувача <code>readonly_user</code> лише з правом <code>SELECT</code>.', ru:'В main.py допиши CREATE USER и GRANT для readonly_user только с правом SELECT.' },
      { level:'hard',   uk:'Додай нову таблицю <code>trainers</code> у налаштування <code>initDb</code>, потім переконайся, що кнопка <code>\\\\dt</code>-аналог тепер показує ДВІ таблиці.', ru:'Добавь таблицу trainers в initDb, затем убедись, что \\\\dt-аналог показывает две таблицы.' },
    ],
    `-- Реальні команди psql (виконуються в терміналі, не в цій пісочниці):
--
-- \\l
-- \\c gym_tracker
-- \\dt
-- \\d students
-- \\du
-- \\q

CREATE DATABASE gym_tracker;

CREATE USER gym_admin WITH PASSWORD 'секретний_пароль';
GRANT ALL PRIVILEGES ON DATABASE gym_tracker TO gym_admin;

CREATE USER readonly_user WITH PASSWORD 'readonly_pass';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

CREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT, grade INTEGER);
INSERT INTO students (name, grade) VALUES ('Аліна', 10);
`
  );

  /* ─── 08-08: SQLAlchemy Core та ORM ────────────────────────────────── */
  patch('08-08',
    { uk:`<h2>SQLAlchemy: Core та ORM, relationships, eager loading</h2>
<p>SQLAlchemy має ДВА рівні: Core (генерація SQL-виразів через Python-обʼєкти, без класів-моделей) і ORM (класи-моделі, як у Flask-SQLAlchemy з модуля 06-04).</p>
<h3>Core — низькорівневий конструктор SQL</h3>
<pre>from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, select

engine = create_engine('sqlite:///gym.db')
metadata = MetaData()

students = Table('students', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String),
)

query = select(students).where(students.c.grade > 9)
with engine.connect() as conn:
    result = conn.execute(query)</pre>
<h3>ORM — класи-моделі (звичніший підхід)</h3>
<pre>from sqlalchemy.orm import declarative_base, relationship, Session

Base = declarative_base()

class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    visits = relationship('Visit', back_populates='student')

session = Session(engine)
students = session.query(Student).filter(Student.grade > 9).all()</pre>
<h3>Eager loading — уникнення проблеми N+1</h3>
<pre>from sqlalchemy.orm import joinedload

# Без eager loading: 1 запит на студентів + N запитів на visits кожного (N+1 проблема)
students = session.query(Student).options(joinedload(Student.visits)).all()
# Тепер усі visits завантажені ОДНИМ JOIN-запитом</pre>
<h3>Ця пісочниця: справжній SQL за спрощеним Core-подібним синтаксисом</h3>
<p>Демо нижче будує SQL-рядок так, як це робить SQLAlchemy Core, і виконує його через sql.js — тобто ти бачиш РЕАЛЬНИЙ SQL, згенерований high-level викликами.</p>`,
      ru:`<h2>SQLAlchemy: Core и ORM, relationships, eager loading</h2>
<p>У SQLAlchemy два уровня: Core (генерация SQL через Python-объекты) и ORM (классы-модели).</p>
<h3>Core</h3>
<pre>from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, select

engine = create_engine('sqlite:///gym.db')
metadata = MetaData()

students = Table('students', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String),
)

query = select(students).where(students.c.grade > 9)</pre>
<h3>ORM</h3>
<pre>class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    visits = relationship('Visit', back_populates='student')

students = session.query(Student).filter(Student.grade > 9).all()</pre>
<h3>Eager loading — избегание N+1</h3>
<pre>from sqlalchemy.orm import joinedload

students = session.query(Student).options(joinedload(Student.visits)).all()</pre>
<h3>Эта песочница: настоящий SQL по упрощённому Core-подобному синтаксису</h3>
<p>Демо строит SQL так, как это делает SQLAlchemy Core, и выполняет его через sql.js.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

/* Мінімальний Core-подібний конструктор запитів: select(table).where(condition) -> реальний SQL */
function select(table) {
  return {
    table: table,
    conditions: [],
    where: function (cond) { this.conditions.push(cond); return this; },
    toSQL: function () {
      var sql = 'SELECT * FROM ' + this.table;
      if (this.conditions.length) sql += ' WHERE ' + this.conditions.join(' AND ');
      return sql;
    }
  };
}

initDb(demoRoot, termOut, [
  "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, grade INTEGER)",
  "INSERT INTO students VALUES (1, 'Аліна', 10), (2, 'Марко', 8), (3, 'Ірина', 11)"
], function (db) {
  row.appendChild(mkBtn('select(students).where(grade > 9)', function () {
    var query = select('students').where('grade > 9');
    logLine(termOut, '', '#64748b');
    logLine(termOut, '>>> query.toSQL() -> "' + query.toSQL() + '"', '#c4b5fd');
    runQuery(db, query.toSQL(), termOut);
  }));
  row.appendChild(mkBtn('session.query(Student).all()', function () {
    runQuery(db, select('students').toSQL(), termOut);
  }));
  row.appendChild(mkBtn('joinedload-демо (JOIN замість N+1)', function () {
    db.run("CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY, student_id INTEGER, visit_date TEXT)");
    db.run("DELETE FROM visits");
    db.run("INSERT INTO visits VALUES (1,1,'2026-07-01'), (2,1,'2026-07-02')");
    logLine(termOut, '', '#64748b');
    logLine(termOut, 'Без eager loading: 1 запит студентів + N запитів visits (N+1 проблема)', '#facc15');
    logLine(termOut, 'З joinedload: ОДИН запит через JOIN:', '#64748b');
    runQuery(db, 'SELECT students.name, visits.visit_date FROM students LEFT JOIN visits ON students.id = visits.student_id', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Натисни кнопку <code>select().where()</code> і подивись, як виклики Python-подібного API будують РЕАЛЬНИЙ SQL-рядок, який потім виконується.', ru:'Нажми кнопку select().where() и посмотри, как вызовы Python-подобного API строят реальный SQL, который затем выполняется.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши <code>Table</code>-опис для <code>visits</code> у стилі SQLAlchemy Core (з колонками <code>id</code>, <code>student_id</code>, <code>visit_date</code>).', ru:'В main.py допиши Table-описание для visits в стиле SQLAlchemy Core.' },
      { level:'hard',   uk:'Додай у функцію <code>select</code> метод <code>.orderBy(field)</code>, що додає <code>ORDER BY</code> у згенерований SQL, і кнопку, що це демонструє.', ru:'Добавь в select метод .orderBy(field), добавляющий ORDER BY в сгенерированный SQL.' },
    ],
    `from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, select
from sqlalchemy.orm import declarative_base, relationship, Session, joinedload

engine = create_engine('sqlite:///gym.db')
metadata = MetaData()
Base = declarative_base()


class Student(Base):
    __tablename__ = 'students'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    grade = Column(Integer)
    visits = relationship('Visit', back_populates='student')


class Visit(Base):
    __tablename__ = 'visits'
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer)
    visit_date = Column(String)
    student = relationship('Student', back_populates='visits')


session = Session(engine)

# Core-стиль:
query = select(Student.__table__).where(Student.__table__.c.grade > 9)

# ORM-стиль з eager loading (уникає N+1):
students = session.query(Student).options(joinedload(Student.visits)).all()
`
  );

  /* ─── 08-09: Redis ─────────────────────────────────────────────────── */
  patch('08-09',
    { uk:`<h2>Redis: кеш, сесії, pub/sub та sorted sets</h2>
<p><strong>Важливо чесно зазначити:</strong> на відміну від попередніх уроків цього модуля (де sql.js дає СПРАВЖНЄ виконання SQL), для Redis немає надійного WASM-рушія, доступного через CDN для браузера — Redis працює як окремий сервер, а не бібліотека, яку можна "вкомпілювати" в сторінку. Тому демо нижче — чесна JS-симуляція основних команд Redis, а код у вкладці main.py — справжній, робочий Python (бібліотека <code>redis-py</code>).</p>
<h3>Встановлення й підключення</h3>
<pre>pip install redis

import redis
r = redis.Redis(host='localhost', port=6379, decode_responses=True)</pre>
<h3>Кеш і сесії — прості ключ-значення</h3>
<pre>r.set('user:1:name', 'Аліна')
r.get('user:1:name')          # 'Аліна'
r.setex('session:abc123', 3600, 'user_id=1')  # TTL 3600 секунд
r.delete('user:1:name')</pre>
<h3>Pub/Sub — публікація й підписка на канали</h3>
<pre>pubsub = r.pubsub()
pubsub.subscribe('notifications')

r.publish('notifications', 'Новий відвідувач у залі!')

for message in pubsub.listen():
    print(message['data'])</pre>
<h3>Sorted Sets — рейтинги/лідерборди</h3>
<pre>r.zadd('leaderboard', {'Аліна': 120, 'Марко': 95, 'Ірина': 140})
r.zrevrange('leaderboard', 0, 2, withscores=True)
# [('Ірина', 140), ('Аліна', 120), ('Марко', 95)]</pre>
<p>Redis зберігає ВСЕ в оперативній памʼяті — це робить його НАБАГАТО швидшим за PostgreSQL для простих операцій ключ-значення, але менш надійним для складних звʼязаних даних (для цього краще підходить SQL — модулі 08-01…08-08).</p>`,
      ru:`<h2>Redis: кэш, сессии, pub/sub и sorted sets</h2>
<p><strong>Важно честно отметить:</strong> в отличие от предыдущих уроков модуля (где sql.js даёт настоящее выполнение SQL), для Redis нет надёжного WASM-движка, доступного через CDN — Redis работает как отдельный сервер. Поэтому демо ниже — честная JS-симуляция команд Redis, а код в main.py — настоящий, рабочий Python (redis-py).</p>
<h3>Установка и подключение</h3>
<pre>pip install redis

import redis
r = redis.Redis(host='localhost', port=6379, decode_responses=True)</pre>
<h3>Кэш и сессии</h3>
<pre>r.set('user:1:name', 'Алина')
r.get('user:1:name')
r.setex('session:abc123', 3600, 'user_id=1')
r.delete('user:1:name')</pre>
<h3>Pub/Sub</h3>
<pre>pubsub = r.pubsub()
pubsub.subscribe('notifications')
r.publish('notifications', 'Новый посетитель в зале!')</pre>
<h3>Sorted Sets</h3>
<pre>r.zadd('leaderboard', {'Алина': 120, 'Марк': 95, 'Ирина': 140})
r.zrevrange('leaderboard', 0, 2, withscores=True)</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var row = document.createElement('div');
demoRoot.appendChild(row);

function mkBtn(text, onClick) {
  var b = document.createElement('button');
  b.textContent = text;
  b.style.cssText = 'background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;margin:3px 6px 3px 0';
  b.onclick = onClick;
  return b;
}
function logLine(text, color) {
  var span = document.createElement('div');
  span.style.color = color || '#8bc34a';
  span.textContent = text;
  termOut.appendChild(span);
  termOut.scrollTop = termOut.scrollHeight;
}

var note = document.createElement('div');
note.style.cssText = 'color:#facc15;font-size:11px;margin-bottom:6px';
note.textContent = 'Це JS-симуляція Redis (не справжній сервер) — на відміну від SQL-уроків вище, де працює реальний sql.js.';
demoRoot.appendChild(note);

/* Чесна симуляція Redis in-memory сховища */
var store = {};
var sortedSets = {};

function redisSet(key, value) { store[key] = value; }
function redisGet(key) { return store[key] !== undefined ? store[key] : null; }
function redisZadd(setName, members) {
  sortedSets[setName] = sortedSets[setName] || {};
  Object.keys(members).forEach(function (m) { sortedSets[setName][m] = members[m]; });
}
function redisZrevrange(setName) {
  var entries = Object.keys(sortedSets[setName] || {}).map(function (m) { return [m, sortedSets[setName][m]]; });
  entries.sort(function (a, b) { return b[1] - a[1]; });
  return entries;
}

row.appendChild(mkBtn('SET user:1:name "Аліна"', function () {
  redisSet('user:1:name', 'Аліна');
  logLine('', '');
  logLine('> r.set("user:1:name", "Аліна") -> OK', '#68a063');
}));
row.appendChild(mkBtn('GET user:1:name', function () {
  logLine('', '');
  logLine('> r.get("user:1:name") -> ' + JSON.stringify(redisGet('user:1:name')), '#4ade80');
}));
row.appendChild(mkBtn('ZADD leaderboard', function () {
  redisZadd('leaderboard', { 'Аліна': 120, 'Марко': 95, 'Ірина': 140 });
  logLine('', '');
  logLine('> r.zadd("leaderboard", {...}) -> OK', '#68a063');
}));
row.appendChild(mkBtn('ZREVRANGE leaderboard', function () {
  logLine('', '');
  logLine('> r.zrevrange("leaderboard", 0, -1, withscores=True):', '#68a063');
  redisZrevrange('leaderboard').forEach(function (entry, i) {
    logLine('  ' + (i + 1) + '. ' + entry[0] + ' — ' + entry[1], '#4ade80');
  });
}));`,
    [
      { level:'easy',   uk:'Виконай <code>SET</code>/<code>GET</code>, а потім <code>ZADD</code>/<code>ZREVRANGE</code> — подивись, як лідерборд автоматично сортується за очками.', ru:'Выполни SET/GET, затем ZADD/ZREVRANGE — посмотри, как лидерборд автоматически сортируется по очкам.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши виклик <code>r.setex(...)</code> для сесії з TTL 1800 секунд (30 хвилин).', ru:'В main.py допиши r.setex(...) для сессии с TTL 1800 секунд.' },
      { level:'hard',   uk:'Додай у симуляцію нову команду — аналог <code>DEL</code> (видалення ключа) — і кнопку, що видаляє <code>user:1:name</code>, після чого <code>GET</code> повертає <code>null</code>.', ru:'Добавь в симуляцию команду DEL и кнопку, удаляющую user:1:name.' },
    ],
    `import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Кеш і сесії
r.set('user:1:name', 'Аліна')
r.get('user:1:name')
r.setex('session:abc123', 1800, 'user_id=1')
r.delete('user:1:name')

# Pub/Sub
pubsub = r.pubsub()
pubsub.subscribe('notifications')
r.publish('notifications', 'Новий відвідувач у залі!')

# Sorted sets — лідерборд
r.zadd('leaderboard', {'Аліна': 120, 'Марко': 95, 'Ірина': 140})
r.zrevrange('leaderboard', 0, -1, withscores=True)
`
  );

  /* ─── 08-10: ПРОЕКТ — Проектування БД для Gym Tracker ─────────────── */
  patch('08-10',
    { uk:`<h2>ПРОЕКТ: Проектування БД для Gym Tracker (ER-діаграма)</h2>
<p>Фінальний урок модуля — спроєктувати схему бази даних для застосунку Gym Tracker (модуль 09), яку потім реалізуємо через Django-моделі.</p>
<h3>Сутності (Entities)</h3>
<ul>
  <li><strong>User</strong> — відвідувач залу (id, name, email, password_hash)</li>
  <li><strong>MembershipPlan</strong> — тарифний план (id, name, price, duration_days)</li>
  <li><strong>Trainer</strong> — тренер (id, name, specialization)</li>
  <li><strong>Visit</strong> — відвідування (id, user_id, trainer_id, visit_date)</li>
</ul>
<h3>Звʼязки (Relationships)</h3>
<ul>
  <li>User ←1:N→ Visit (один користувач має багато відвідувань)</li>
  <li>Trainer ←1:N→ Visit (один тренер веде багато відвідувань)</li>
  <li>User ←N:1→ MembershipPlan (багато користувачів на одному тарифі)</li>
</ul>
<h3>SQL-реалізація схеми</h3>
<pre>CREATE TABLE membership_plans (
    id INTEGER PRIMARY KEY, name TEXT, price INTEGER, duration_days INTEGER
);
CREATE TABLE users (
    id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE, plan_id INTEGER,
    FOREIGN KEY (plan_id) REFERENCES membership_plans(id)
);
CREATE TABLE trainers (
    id INTEGER PRIMARY KEY, name TEXT, specialization TEXT
);
CREATE TABLE visits (
    id INTEGER PRIMARY KEY, user_id INTEGER, trainer_id INTEGER, visit_date TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (trainer_id) REFERENCES trainers(id)
);</pre>
<p>Ця схема реалізована й виконана нижче через справжній sql.js — саме її ми переведемо на Django-моделі у наступному модулі (09-02).</p>`,
      ru:`<h2>ПРОЕКТ: Проектирование БД для Gym Tracker (ER-диаграмма)</h2>
<p>Финальный урок модуля — спроектировать схему базы данных для Gym Tracker (модуль 09), которую затем реализуем через Django-модели.</p>
<h3>Сущности</h3>
<ul>
  <li>User — посетитель зала</li>
  <li>MembershipPlan — тарифный план</li>
  <li>Trainer — тренер</li>
  <li>Visit — посещение</li>
</ul>
<h3>Связи</h3>
<ul>
  <li>User ←1:N→ Visit</li>
  <li>Trainer ←1:N→ Visit</li>
  <li>User ←N:1→ MembershipPlan</li>
</ul>
<h3>SQL-реализация схемы</h3>
<pre>CREATE TABLE membership_plans (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, plan_id INTEGER);
CREATE TABLE trainers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE visits (id INTEGER PRIMARY KEY, user_id INTEGER, trainer_id INTEGER, visit_date TEXT);</pre>
<p>Эту схему мы переведём на Django-модели в следующем модуле (09-02).</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE membership_plans (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, duration_days INTEGER)",
  "INSERT INTO membership_plans VALUES (1, 'Базовий', 500, 30), (2, 'Преміум', 1200, 30)",
  "CREATE TABLE trainers (id INTEGER PRIMARY KEY, name TEXT, specialization TEXT)",
  "INSERT INTO trainers VALUES (1, 'Олег Ковальчук', 'Силові тренування')",
  "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE, plan_id INTEGER, FOREIGN KEY (plan_id) REFERENCES membership_plans(id))",
  "INSERT INTO users VALUES (1, 'Аліна', 'alina@example.com', 2)",
  "CREATE TABLE visits (id INTEGER PRIMARY KEY, user_id INTEGER, trainer_id INTEGER, visit_date TEXT, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (trainer_id) REFERENCES trainers(id))",
  "INSERT INTO visits VALUES (1, 1, 1, '2026-07-01'), (2, 1, 1, '2026-07-03')"
], function (db) {
  row.appendChild(mkBtn('Усі таблиці схеми (\\\\dt-аналог)', function () {
    runQuery(db, "SELECT name FROM sqlite_master WHERE type='table'", termOut);
  }));
  row.appendChild(mkBtn('Повний профіль відвідування (4 таблиці)', function () {
    runQuery(db, 'SELECT users.name AS user, membership_plans.name AS plan, trainers.name AS trainer, visits.visit_date FROM visits JOIN users ON visits.user_id = users.id JOIN membership_plans ON users.plan_id = membership_plans.id JOIN trainers ON visits.trainer_id = trainers.id', termOut);
  }));
  row.appendChild(mkBtn('Дохід за тарифами (SUM + JOIN + GROUP BY)', function () {
    runQuery(db, 'SELECT membership_plans.name, SUM(membership_plans.price) AS revenue, COUNT(users.id) AS user_count FROM users JOIN membership_plans ON users.plan_id = membership_plans.id GROUP BY membership_plans.id', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Виконай усі три запити й переконайся, що ER-схема (4 звʼязані таблиці) працює як єдине ціле через реальний SQL.', ru:'Выполни все три запроса и убедись, что ER-схема (4 связанные таблицы) работает как единое целое через реальный SQL.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нову таблицю <code>equipment</code> (обладнання залу: id, name, quantity) — вона поки не звʼязана з іншими таблицями.', ru:'В main.py добавь таблицу equipment (id, name, quantity).' },
      { level:'hard',   uk:'Додай кнопку з запитом, що показує КІЛЬКІСТЬ відвідувань КОЖНОГО тренера (JOIN visits + trainers, GROUP BY trainer, ORDER BY за спаданням).', ru:'Добавь кнопку с запросом количества посещений каждого тренера.' },
    ],
    `-- Повна ER-схема Gym Tracker (реалізується в Django-моделях у 09-02)

CREATE TABLE membership_plans (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    duration_days INTEGER NOT NULL
);

CREATE TABLE trainers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    plan_id INTEGER,
    FOREIGN KEY (plan_id) REFERENCES membership_plans(id)
);

CREATE TABLE visits (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    trainer_id INTEGER,
    visit_date TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (trainer_id) REFERENCES trainers(id)
);

CREATE TABLE equipment (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER DEFAULT 0
);
`
  );

})();
