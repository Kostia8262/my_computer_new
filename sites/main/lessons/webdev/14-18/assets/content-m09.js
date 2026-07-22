/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 09 — Проект 1: Gym Tracker · 14–18
   Патчить WEB_LESSONS після завантаження lessons.js

   Фінальний проект обʼєднує все з модулів 1-8: Django+DRF+JWT (як
   чесна fakeDjango JS-симуляція — принцип із модуля 07), React через
   CDN (реальний, без JSX — той самий підхід, що й модулі 03-04),
   Chart.js та QR-генерація через CDN (реальні бібліотеки), sql.js
   для схеми БД (модуль 08), і чесні термінал-симуляції для DevOps-тем
   (Docker Compose, деплой), де немає жодного браузерного рушія.

   type:'python' уроки (09-01,02,03,06,12,13,15) виконуються через
   runPythonDemo (app.js) — new Function('demoRoot','termOut', js).
   type:'web' уроки (09-04,05,07,08,09,10,11,14) виконуються у
   звичайному sandboxed iframe (buildDoc) — тому там МОЖНА вільно
   підключати React/Chart.js/QRCode через <script src> у html-шаблоні.
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

  /* ── Спільні хелпери для python-type уроків (fakeDjango + sql.js) ──
     Передаються як ТЕКСТ, бо код уроку виконується в ІЗОЛЬОВАНОМУ
     контексті через new Function() всередині runPythonDemo (app.js). */
  const FAKE_DJANGO_SRC = `function createRouter() {
  var patterns = [];
  return {
    path: function (route, methods, handler) {
      patterns.push({ route: route, methods: methods, handler: handler });
    },
    resolve: function (method, fullPath, body, headers) {
      var pathOnly = fullPath.split('?')[0];
      for (var i = 0; i < patterns.length; i++) {
        var p = patterns[i];
        if (p.methods.indexOf(method) === -1) continue;
        var params = matchPath(p.route, pathOnly);
        if (!params) continue;
        var result;
        try {
          result = p.handler({ params: params, data: body || {}, headers: headers || {} });
        } catch (e) {
          return { status: 500, data: { detail: String(e.message || e) } };
        }
        return normalize(result);
      }
      return { status: 404, data: { detail: 'Not found.' } };
    }
  };
}

function normalize(result) {
  if (Object.prototype.toString.call(result) === '[object Array]') {
    return { status: result[1] || 200, data: result[0] };
  }
  return { status: 200, data: result };
}

function Response(data, opts) {
  return [data, (opts && opts.status) || 200];
}

function matchPath(pattern, path) {
  var patternParts = pattern.split('/').filter(Boolean);
  var pathParts = path.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  var params = {};
  for (var i = 0; i < patternParts.length; i++) {
    var pp = patternParts[i];
    if (pp.charAt(0) === '<' && pp.charAt(pp.length - 1) === '>') {
      var name = pp.slice(1, -1);
      var idx = name.indexOf(':');
      if (idx !== -1) name = name.slice(idx + 1);
      params[name] = pathParts[i];
    } else if (pp !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

function mkBtn(text, onClick) {
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
  span.textContent = text;
  termOut.appendChild(span);
  termOut.scrollTop = termOut.scrollHeight;
}
`;

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
    if (!res.length) { logLine(termOut, '(запит виконано)', '#4ade80'); return res; }
    res.forEach(function (table) {
      logLine(termOut, table.columns.join(' | '), '#7dd3fc');
      table.values.forEach(function (row) { logLine(termOut, row.join(' | '), '#4ade80'); });
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
  status.textContent = 'Завантаження SQLite (sql.js)...';
  demoRoot.appendChild(status);
  getSqlJs().then(function (SQL) {
    var db = new SQL.Database();
    setupStatements.forEach(function (sql) { db.run(sql); });
    status.textContent = '✓ SQLite готовий (справжній рушій sql.js)';
    status.style.color = '#4ade80';
    onReady(db);
  }).catch(function (err) {
    status.textContent = 'Не вдалося завантажити sql.js: ' + err;
    status.style.color = '#f87171';
  });
}
`;

  /* ─── 09-01: вимоги, User Stories та ER-діаграма ──────────────────── */
  patch('09-01',
    { uk:`<h2>Gym Tracker: вимоги, User Stories та ER-діаграма</h2>
<p>Починаємо фінальний проект курсу — Gym Tracker, застосунок для обліку відвідувань спортзалу. Перш ніж писати код, формулюємо вимоги.</p>
<h3>User Stories</h3>
<ul>
  <li>Як відвідувач, я хочу зареєструватись і увійти, щоб мати особистий кабінет</li>
  <li>Як відвідувач, я хочу бачити свою історію відвідувань і графік за місяць</li>
  <li>Як відвідувач, я хочу відмічати прихід у зал через QR-код</li>
  <li>Як тренер, я хочу бачити розклад і відвідуваність своїх підопічних</li>
  <li>Як адміністратор, я хочу керувати тарифними планами й тренерами</li>
</ul>
<h3>Функціональні модулі проекту (за уроками)</h3>
<ol>
  <li>Django-моделі й API реєстрації/входу (09-02, 09-03)</li>
  <li>React-фронтенд: форми, кабінет, графіки (09-04, 09-05, 09-07)</li>
  <li>CRUD відвідувань та адмінка тренера (09-06, 09-08)</li>
  <li>QR-код, push-сповіщення, адаптивність (09-09, 09-10, 09-11)</li>
  <li>JWT refresh, Docker, CI/CD, деплой (09-12…09-15)</li>
</ol>
<h3>ER-діаграма (з модуля 08-10)</h3>
<p>Схему бази даних ми вже спроєктували й перевірили через справжній SQL у модулі 08-10: чотири сутності — <code>User</code>, <code>MembershipPlan</code>, <code>Trainer</code>, <code>Visit</code>. Нижче — та сама схема, знову виконана через sql.js як стартова точка проекту.</p>`,
      ru:`<h2>Gym Tracker: требования, User Stories и ER-диаграмма</h2>
<p>Начинаем финальный проект курса — Gym Tracker, приложение для учёта посещений спортзала.</p>
<h3>User Stories</h3>
<ul>
  <li>Как посетитель, я хочу зарегистрироваться и войти</li>
  <li>Как посетитель, я хочу видеть историю посещений и график за месяц</li>
  <li>Как посетитель, я хочу отмечать приход через QR-код</li>
  <li>Как тренер, я хочу видеть расписание и посещаемость</li>
  <li>Как администратор, я хочу управлять тарифами и тренерами</li>
</ul>
<h3>Функциональные модули проекта</h3>
<ol>
  <li>Django-модели и API регистрации/входа (09-02, 09-03)</li>
  <li>React-фронтенд (09-04, 09-05, 09-07)</li>
  <li>CRUD посещений и админка тренера (09-06, 09-08)</li>
  <li>QR-код, push-уведомления, адаптивность (09-09, 09-10, 09-11)</li>
  <li>JWT refresh, Docker, CI/CD, деплой (09-12…09-15)</li>
</ol>
<h3>ER-диаграмма (из модуля 08-10)</h3>
<p>Схему базы данных мы уже спроектировали в модуле 08-10: четыре сущности — User, MembershipPlan, Trainer, Visit.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE membership_plans (id INTEGER PRIMARY KEY, name TEXT, price INTEGER)",
  "INSERT INTO membership_plans VALUES (1, 'Базовий', 500), (2, 'Преміум', 1200)",
  "CREATE TABLE trainers (id INTEGER PRIMARY KEY, name TEXT)",
  "INSERT INTO trainers VALUES (1, 'Олег Ковальчук')",
  "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, plan_id INTEGER)",
  "INSERT INTO users VALUES (1, 'Аліна', 2)",
  "CREATE TABLE visits (id INTEGER PRIMARY KEY, user_id INTEGER, trainer_id INTEGER, visit_date TEXT)",
  "INSERT INTO visits VALUES (1, 1, 1, '2026-07-01')"
], function (db) {
  row.appendChild(mkBtn('Проектна схема (4 таблиці)', function () {
    runQuery(db, "SELECT name FROM sqlite_master WHERE type='table'", termOut);
  }));
  row.appendChild(mkBtn('Перший відвідувач + тариф + тренер', function () {
    runQuery(db, 'SELECT users.name, membership_plans.name AS plan, trainers.name AS trainer FROM users JOIN membership_plans ON users.plan_id = membership_plans.id JOIN visits ON visits.user_id = users.id JOIN trainers ON visits.trainer_id = trainers.id', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Виконай обидві кнопки й переконайся, що схема з модуля 08-10 стає СТАРТОВОЮ ТОЧКОЮ цього проекту.', ru:'Выполни обе кнопки и убедись, что схема из модуля 08-10 становится стартовой точкой проекта.' },
      { level:'medium', uk:'Напиши власними словами (у файлі main.py як коментар) ще одну User Story для ролі "адміністратор", якої немає у списку теорії.', ru:'Напиши ещё одну User Story для роли "администратор".' },
      { level:'hard',   uk:'Склади список усіх REST-ендпоінтів (метод + шлях), які знадобляться для реалізації ВСІХ User Stories з теорії — запиши їх коментарем у main.py.', ru:'Составь список всех REST-эндпоинтов, нужных для реализации всех User Stories.' },
    ],
    `# Gym Tracker — план проекту (модуль 09)
#
# User Stories:
# - Як відвідувач, я хочу зареєструватись і увійти
# - Як відвідувач, я хочу бачити історію відвідувань
# - Як відвідувач, я хочу відмічати прихід через QR-код
# - Як тренер, я хочу бачити розклад і відвідуваність
# - Як адміністратор, я хочу керувати тарифами й тренерами
#
# Планові REST-ендпоінти:
# POST   /api/register/
# POST   /api/token/
# POST   /api/token/refresh/
# GET    /api/profile/
# GET    /api/visits/
# POST   /api/visits/
# GET    /api/trainers/<id>/schedule/
`
  );

  /* ─── 09-02: Django моделі ─────────────────────────────────────────── */
  patch('09-02',
    { uk:`<h2>Django моделі: User, MembershipPlan, Visit, Trainer</h2>
<p>Реалізуємо ER-схему з 08-10/09-01 як Django-моделі — застосовуємо все з модуля 07-03.</p>
<h3>Моделі</h3>
<pre>from django.contrib.auth.models import AbstractUser
from django.db import models

class MembershipPlan(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    duration_days = models.IntegerField(default=30)

class User(AbstractUser):
    plan = models.ForeignKey(MembershipPlan, on_delete=models.SET_NULL, null=True, related_name='users')

class Trainer(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100, blank=True)

class Visit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='visits')
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, related_name='visits')
    visit_date = models.DateTimeField(auto_now_add=True)</pre>
<h3>settings.py</h3>
<pre>AUTH_USER_MODEL = 'accounts.User'   # обовʼязково ДО першої міграції</pre>
<h3>Реляційна схема нижче — та сама, виконана через fakeDjango-подібний ORM (принцип з модуля 07)</h3>`,
      ru:`<h2>Django модели: User, MembershipPlan, Visit, Trainer</h2>
<p>Реализуем ER-схему как Django-модели.</p>
<h3>Модели</h3>
<pre>from django.contrib.auth.models import AbstractUser
from django.db import models

class MembershipPlan(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()

class User(AbstractUser):
    plan = models.ForeignKey(MembershipPlan, on_delete=models.SET_NULL, null=True, related_name='users')

class Trainer(models.Model):
    name = models.CharField(max_length=100)

class Visit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='visits')
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, related_name='visits')
    visit_date = models.DateTimeField(auto_now_add=True)</pre>
<h3>settings.py</h3>
<pre>AUTH_USER_MODEL = 'accounts.User'</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var plans = [{ id: 1, name: 'Базовий', price: 500 }, { id: 2, name: 'Преміум', price: 1200 }];
var trainers = [{ id: 1, name: 'Олег Ковальчук' }];
var users = [{ id: 1, username: 'alina', plan_id: 2 }];
var visits = [{ id: 1, user_id: 1, trainer_id: 1, visit_date: '2026-07-01' }];

function send(label, fn) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '>>> ' + label, '#68a063');
  logLine(termOut, JSON.stringify(fn()), '#4ade80');
}

row.appendChild(mkBtn('user.plan (ForeignKey)', function () {
  send('User.objects.get(id=1).plan.name', function () {
    var user = users[0];
    return plans.find(function (p) { return p.id === user.plan_id; }).name;
  });
}));
row.appendChild(mkBtn('plan.users.all() (related_name)', function () {
  send('plan.users.all()', function () {
    var plan = plans[1];
    return users.filter(function (u) { return u.plan_id === plan.id; }).map(function (u) { return u.username; });
  });
}));
row.appendChild(mkBtn('user.visits.all()', function () {
  send('user.visits.all()', function () {
    var user = users[0];
    return visits.filter(function (v) { return v.user_id === user.id; }).map(function (v) { return v.visit_date; });
  });
}));`,
    [
      { level:'easy',   uk:'Спробуй усі три кнопки й подивись, як звʼязки <code>ForeignKey</code>/<code>related_name</code> дозволяють переходити від моделі до моделі в обидва боки.', ru:'Попробуй все три кнопки и посмотри, как связи ForeignKey/related_name позволяют переходить между моделями.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нове поле <code>phone = models.CharField(max_length=20, blank=True)</code> у модель <code>User</code>.', ru:'В main.py добавь поле phone в модель User.' },
      { level:'hard',   uk:'Додай у симуляцію нову перевірку — метод, що рахує СКІЛЬКИ РАЗІВ конкретний тренер (<code>trainer_id=1</code>) проводив тренування, використовуючи масив <code>visits</code>.', ru:'Добавь метод, считающий количество тренировок конкретного тренера.' },
    ],
    `from django.contrib.auth.models import AbstractUser
from django.db import models


class MembershipPlan(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    duration_days = models.IntegerField(default=30)

    def __str__(self):
        return self.name


class User(AbstractUser):
    plan = models.ForeignKey(MembershipPlan, on_delete=models.SET_NULL, null=True, related_name='users')
    phone = models.CharField(max_length=20, blank=True)


class Trainer(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Visit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='visits')
    trainer = models.ForeignKey(Trainer, on_delete=models.SET_NULL, null=True, related_name='visits')
    visit_date = models.DateTimeField(auto_now_add=True)


# settings.py
AUTH_USER_MODEL = 'accounts.User'
`
  );

  /* ─── 09-03: Django API реєстрація/вхід/профіль ───────────────────── */
  patch('09-03',
    { uk:`<h2>Django API: реєстрація, вхід, профіль</h2>
<h3>Serializer для реєстрації</h3>
<pre>from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)</pre>
<h3>Views</h3>
<pre>from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'id': user.id, 'username': user.username}, status=201)
        return Response(serializer.errors, status=400)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'username': request.user.username,
            'plan': request.user.plan.name if request.user.plan else None,
        })</pre>
<h3>Вхід через JWT (simplejwt, як у 07-14)</h3>
<pre>path('api/token/', TokenObtainPairView.as_view()),
path('api/token/refresh/', TokenRefreshView.as_view()),</pre>`,
      ru:`<h2>Django API: регистрация, вход, профиль</h2>
<h3>Serializer для регистрации</h3>
<pre>from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)</pre>
<h3>Views</h3>
<pre>class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'id': user.id}, status=201)
        return Response(serializer.errors, status=400)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'username': request.user.username})</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var users = [];
var currentAccess = null;

function fakeJwt() { return btoa('access:' + Date.now()).slice(0, 20); }

var router = createRouter();
router.path('/api/register/', ['POST'], function (req) {
  if (!req.data.password || req.data.password.length < 8) return Response({ password: 'Мінімум 8 символів' }, { status: 400 });
  var user = { id: users.length + 1, username: req.data.username, plan: null };
  users.push(user);
  return Response({ id: user.id, username: user.username }, { status: 201 });
});
router.path('/api/token/', ['POST'], function (req) {
  var user = users.find(function (u) { return u.username === req.data.username; });
  if (!user) return Response({ detail: 'Невірні дані' }, { status: 401 });
  currentAccess = fakeJwt();
  return { access: currentAccess };
});
router.path('/api/profile/', ['GET'], function (req) {
  if (req.headers.auth !== 'Bearer ' + currentAccess || !currentAccess) return Response({ detail: 'Not authenticated' }, { status: 401 });
  var user = users[users.length - 1];
  return { username: user.username, plan: user.plan };
});

function send(method, path, body, useAuth) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = router.resolve(method, path, body, { auth: useAuth ? 'Bearer ' + currentAccess : undefined });
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('POST /api/register/', function () { send('POST', '/api/register/', { username: 'alina', password: 'secret123' }); }));
row.appendChild(mkBtn('POST /api/token/', function () { send('POST', '/api/token/', { username: 'alina' }); }));
row.appendChild(mkBtn('GET /api/profile/', function () { send('GET', '/api/profile/', {}, true); }));`,
    [
      { level:'easy',   uk:'Виконай усі три кнопки ПОСЛІДОВНО (реєстрація → вхід → профіль) — це типовий потік автентифікації REST API.', ru:'Выполни все три кнопки последовательно — типичный поток аутентификации REST API.' },
      { level:'medium', uk:'Спробуй зареєструватись із закоротким паролем (менше 8 символів) і переконайся, що спрацьовує валідація зі статусом 400.', ru:'Попробуй зарегистрироваться с коротким паролем и убедись, что срабатывает валидация 400.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши перевірку унікальності <code>email</code> у <code>RegisterSerializer</code> (метод <code>validate_email</code>).', ru:'В main.py допиши проверку уникальности email в RegisterSerializer.' },
    ],
    `from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email вже використовується')
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'id': user.id, 'username': user.username}, status=201)
        return Response(serializer.errors, status=400)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'username': request.user.username,
            'plan': request.user.plan.name if request.user.plan else None,
        })
`
  );

  /* ─── 09-04: React форма реєстрації та входу із JWT (web) ─────────── */
  patch('09-04',
    { uk:`<h2>React: форма реєстрації та входу із JWT</h2>
<p>Реальний React (через CDN, без JSX — <code>React.createElement</code>) на боці клієнта, що звертається до API з 09-03. У цьому демо API замінено на локальну функцію в тому самому файлі (у справжньому проекті це буде <code>fetch('/api/token/')</code>).</p>
<h3>Компонент форми (реальний React-код)</h3>
<pre>function LoginForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [token, setToken] = React.useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) { setError('Невірні дані'); return; }
    const data = await res.json();
    setToken(data.access);
  }

  return React.createElement('form', { onSubmit: handleSubmit }, /* ...поля... */);
}</pre>
<h3>Збереження токена</h3>
<p>Access-токен зазвичай тримають у пам'яті (React state), а refresh-токен — у httpOnly cookie (найбезпечніше) або, як спрощений варіант для навчання, у <code>localStorage</code>.</p>`,
      ru:`<h2>React: форма регистрации и входа с JWT</h2>
<p>Реальный React (через CDN, без JSX), обращающийся к API из 09-03.</p>
<h3>Компонент формы (реальный React-код)</h3>
<pre>function LoginForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setToken(data.access);
  }

  return React.createElement('form', { onSubmit: handleSubmit });
}</pre>
<h3>Сохранение токена</h3>
<p>Access-токен обычно хранят в памяти (React state), refresh — в httpOnly cookie.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 20px; }
input { display: block; width: 100%; margin: 6px 0; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; box-sizing: border-box; }
button { background: #22c55e; color: #0f172a; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 8px; }
.error { color: #f87171; font-size: 13px; }
.success { color: #4ade80; font-size: 13px; word-break: break-all; }`,
    `var e = React.createElement;

var FAKE_USERS = [{ username: 'alina', password: 'secret123' }];

function fakeLogin(username, password) {
  var user = FAKE_USERS.filter(function (u) { return u.username === username && u.password === password; })[0];
  if (!user) return null;
  return btoa('access:' + username + ':' + Date.now()).slice(0, 24);
}

function LoginForm() {
  var state = React.useState('');
  var username = state[0], setUsername = state[1];
  var state2 = React.useState('');
  var password = state2[0], setPassword = state2[1];
  var state3 = React.useState('');
  var error = state3[0], setError = state3[1];
  var state4 = React.useState(null);
  var token = state4[0], setToken = state4[1];

  function handleSubmit(ev) {
    ev.preventDefault();
    var access = fakeLogin(username, password);
    if (!access) { setError('Невірні дані (спробуй alina / secret123)'); setToken(null); return; }
    setError('');
    setToken(access);
  }

  return e('form', { onSubmit: handleSubmit },
    e('h2', null, 'Вхід у Gym Tracker'),
    e('input', { placeholder: "Ім'я користувача", value: username, onChange: function (ev) { setUsername(ev.target.value); } }),
    e('input', { type: 'password', placeholder: 'Пароль', value: password, onChange: function (ev) { setPassword(ev.target.value); } }),
    e('button', { type: 'submit' }, 'Увійти'),
    error ? e('p', { className: 'error' }, error) : null,
    token ? e('p', { className: 'success' }, 'access token: ' + token) : null,
    e('p', { style: { fontSize: '11px', color: '#94a3b8' } }, 'Підказка: alina / secret123')
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(LoginForm));`,
    [
      { level:'easy',   uk:'Спробуй увійти з правильними даними (<code>alina</code> / <code>secret123</code>) і з неправильними — подивись різницю в поведінці форми.', ru:'Попробуй войти с правильными данными (alina / secret123) и с неправильными — посмотри разницу.' },
      { level:'medium', uk:'Додай третє поле форми <code>email</code> (для сценарію реєстрації) з власним <code>useState</code>.', ru:'Добавь третье поле формы email со своим useState.' },
      { level:'hard',   uk:'Додай новий стан <code>loading</code>, що вмикається на час "запиту" (симулюй затримку через <code>setTimeout</code> 500мс) і блокує кнопку, поки триває вхід.', ru:'Добавь состояние loading, блокирующее кнопку на время "запроса" (setTimeout 500мс).' },
    ],
    ``
  );

  /* ─── 09-05: React особистий кабінет (web) ────────────────────────── */
  patch('09-05',
    { uk:`<h2>React: особистий кабінет відвідувача</h2>
<p>Компонент, що показує профіль користувача, поточний тариф і історію відвідувань — типовий "dashboard" на реальних React-компонентах.</p>
<h3>Структура компонента</h3>
<pre>function Dashboard({ user, visits }) {
  return React.createElement('div', null,
    React.createElement('h2', null, 'Привіт, ' + user.username),
    React.createElement('p', null, 'Тариф: ' + user.plan),
    React.createElement(VisitsList, { visits })
  );
}

function VisitsList({ visits }) {
  return React.createElement('ul', null,
    visits.map(v => React.createElement('li', { key: v.id }, v.date))
  );
}</pre>
<h3>useMemo для похідних даних</h3>
<pre>const totalVisits = React.useMemo(() => visits.length, [visits]);
const thisMonth = React.useMemo(
  () => visits.filter(v => v.date.startsWith('2026-07')).length,
  [visits]
);</pre>`,
      ru:`<h2>React: личный кабинет посетителя</h2>
<p>Компонент, показывающий профиль, тариф и историю посещений.</p>
<h3>Структура компонента</h3>
<pre>function Dashboard({ user, visits }) {
  return React.createElement('div', null,
    React.createElement('h2', null, 'Привет, ' + user.username),
    React.createElement(VisitsList, { visits })
  );
}</pre>
<h3>useMemo для производных данных</h3>
<pre>const totalVisits = React.useMemo(() => visits.length, [visits]);</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 20px; }
.card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px; margin-bottom: 10px; }
.badge { background: #22c55e; color: #0f172a; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: bold; }
ul { padding-left: 18px; }`,
    `var e = React.createElement;

var USER = { username: 'Аліна', plan: 'Преміум' };
var VISITS = [
  { id: 1, date: '2026-07-01' },
  { id: 2, date: '2026-07-03' },
  { id: 3, date: '2026-06-20' }
];

function VisitsList(props) {
  return e('ul', null, props.visits.map(function (v) {
    return e('li', { key: v.id }, v.date);
  }));
}

function Dashboard() {
  var totalVisits = React.useMemo(function () { return VISITS.length; }, []);
  var thisMonth = React.useMemo(function () {
    return VISITS.filter(function (v) { return v.date.indexOf('2026-07') === 0; }).length;
  }, []);

  return e('div', null,
    e('div', { className: 'card' },
      e('h2', null, 'Привіт, ' + USER.username),
      e('span', { className: 'badge' }, USER.plan)
    ),
    e('div', { className: 'card' },
      e('p', null, 'Усього відвідувань: ' + totalVisits),
      e('p', null, 'Цього місяця: ' + thisMonth)
    ),
    e('div', { className: 'card' },
      e('h3', null, 'Історія відвідувань'),
      e(VisitsList, { visits: VISITS })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(Dashboard));`,
    [
      { level:'easy',   uk:'Подивись, як <code>useMemo</code> рахує <code>totalVisits</code> і <code>thisMonth</code> з одного й того ж масиву <code>VISITS</code>.', ru:'Посмотри, как useMemo считает totalVisits и thisMonth из одного массива VISITS.' },
      { level:'medium', uk:'Додай у масив <code>VISITS</code> ще один запис за липень 2026 і переконайся, що <code>thisMonth</code> збільшився.', ru:'Добавь в VISITS ещё одну запись за июль 2026 и убедись, что thisMonth увеличился.' },
      { level:'hard',   uk:'Додай новий компонент <code>PlanBadge</code>, що показує РІЗНИЙ колір бейджа залежно від тарифу (<code>Преміум</code> — зелений, <code>Базовий</code> — сірий).', ru:'Добавь компонент PlanBadge с разным цветом в зависимости от тарифа.' },
    ],
    ``
  );

  /* ─── 09-06: Django API CRUD відвідувань ───────────────────────────── */
  patch('09-06',
    { uk:`<h2>Django API: CRUD відвідувань</h2>
<pre>from rest_framework import viewsets, permissions
from .models import Visit
from .serializers import VisitSerializer

class VisitViewSet(viewsets.ModelViewSet):
    serializer_class = VisitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Visit.objects.filter(user=self.request.user).order_by('-visit_date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)</pre>
<p><code>get_queryset</code> перевизначено, щоб кожен користувач бачив ЛИШЕ СВОЇ відвідування — важливий патерн безпеки для REST API (інакше будь-хто міг би побачити чужі дані, знаючи лише ID).</p>
<pre># urls.py
router.register('visits', VisitViewSet, basename='visit')</pre>`,
      ru:`<h2>Django API: CRUD посещений</h2>
<pre>from rest_framework import viewsets, permissions
from .models import Visit
from .serializers import VisitSerializer

class VisitViewSet(viewsets.ModelViewSet):
    serializer_class = VisitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Visit.objects.filter(user=self.request.user).order_by('-visit_date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)</pre>
<p>get_queryset переопределён, чтобы каждый пользователь видел только свои посещения.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var currentUserId = 1;
var visits = [
  { id: 1, user_id: 1, visit_date: '2026-07-01' },
  { id: 2, user_id: 2, visit_date: '2026-07-02' }
];

var router = createRouter();
router.path('/api/visits/', ['GET'], function () {
  return visits.filter(function (v) { return v.user_id === currentUserId; });
});
router.path('/api/visits/', ['POST'], function (req) {
  var visit = { id: visits.length + 1, user_id: currentUserId, visit_date: req.data.visit_date || '2026-07-10' };
  visits.push(visit);
  return Response(visit, { status: 201 });
});
router.path('/api/visits/<int:pk>/', ['DELETE'], function (req) {
  var visit = visits.find(function (v) { return v.id === Number(req.params.pk); });
  if (!visit || visit.user_id !== currentUserId) return Response({ detail: 'Not found.' }, { status: 404 });
  visits = visits.filter(function (v) { return v.id !== visit.id; });
  return Response(null, { status: 204 });
});

function send(method, path, body) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path + ' (user_id=' + currentUserId + ')', '#68a063');
  var res = router.resolve(method, path, body);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /api/visits/ (лише свої)', function () { send('GET', '/api/visits/'); }));
row.appendChild(mkBtn('POST /api/visits/', function () { send('POST', '/api/visits/', { visit_date: '2026-07-11' }); }));
row.appendChild(mkBtn('DELETE чужого відвідування (404)', function () { send('DELETE', '/api/visits/2/'); }));
row.appendChild(mkBtn('DELETE свого відвідування', function () { send('DELETE', '/api/visits/1/'); }));`,
    [
      { level:'easy',   uk:'Виконай <code>GET /api/visits/</code> — переконайся, що видно ЛИШЕ відвідування <code>user_id=1</code>, а не всі записи в масиві.', ru:'Выполни GET /api/visits/ — убедись, что видны только посещения user_id=1.' },
      { level:'medium', uk:'Спробуй видалити чуже відвідування (<code>id=2</code>, належить <code>user_id=2</code>) — переконайся, що повертається 404, а НЕ 403 (щоб не розкривати існування чужих записів).', ru:'Попробуй удалить чужое посещение — убедись, что возвращается 404, а не 403.' },
      { level:'hard',   uk:'Додай маршрут <code>PUT /api/visits/&lt;int:pk&gt;/</code>, що дозволяє оновити <code>visit_date</code> ЛИШЕ якщо запис належить поточному користувачу.', ru:'Добавь маршрут PUT /api/visits/<int:pk>/ с той же проверкой владельца.' },
    ],
    `from rest_framework import viewsets, permissions, serializers
from .models import Visit


class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = ['id', 'trainer', 'visit_date']
        read_only_fields = ['id', 'visit_date']


class VisitViewSet(viewsets.ModelViewSet):
    serializer_class = VisitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Visit.objects.filter(user=self.request.user).order_by('-visit_date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# urls.py
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('visits', VisitViewSet, basename='visit')
`
  );

  /* ─── 09-07: Chart.js графік відвідувань (web) ────────────────────── */
  patch('09-07',
    { uk:`<h2>Chart.js: графік відвідувань за місяць</h2>
<p>Chart.js — популярна бібліотека для малюнків на <code>&lt;canvas&gt;</code>. Підключаємо через CDN і будуємо СПРАВЖНІЙ графік із реальними даними.</p>
<h3>Підключення</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/chart.js"&gt;&lt;/script&gt;</pre>
<h3>Створення графіка</h3>
<pre>const ctx = document.getElementById('visitsChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Тиж 1', 'Тиж 2', 'Тиж 3', 'Тиж 4'],
    datasets: [{
      label: 'Відвідування',
      data: [4, 6, 3, 7],
      backgroundColor: '#22c55e',
    }],
  },
  options: { responsive: true },
});</pre>
<h3>Отримання даних із API (у реальному проекті)</h3>
<pre>const res = await fetch('/api/visits/stats/?month=2026-07');
const stats = await res.json();
chart.data.datasets[0].data = stats.perWeek;
chart.update();</pre>`,
      ru:`<h2>Chart.js: график посещений за месяц</h2>
<p>Chart.js — библиотека для рисования на canvas. Подключаем через CDN и строим настоящий график.</p>
<h3>Подключение</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/chart.js"&gt;&lt;/script&gt;</pre>
<h3>Создание графика</h3>
<pre>const ctx = document.getElementById('visitsChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'],
    datasets: [{ label: 'Посещения', data: [4, 6, 3, 7], backgroundColor: '#22c55e' }],
  },
});</pre>
<h3>Получение данных из API</h3>
<pre>const res = await fetch('/api/visits/stats/?month=2026-07');
const stats = await res.json();
chart.data.datasets[0].data = stats.perWeek;
chart.update();</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<canvas id="visitsChart" height="220"></canvas>
<div id="controls"></div>
</body>
</html>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
button { background: #1e293b; border: 1px solid #334155; color: #e2e8f0; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-top: 10px; margin-right: 6px; }`,
    `var ctx = document.getElementById('visitsChart');

var weeklyData = { '2026-06': [3, 5, 4, 6], '2026-07': [4, 6, 3, 7] };
var currentMonth = '2026-07';

var chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Тиж 1', 'Тиж 2', 'Тиж 3', 'Тиж 4'],
    datasets: [{ label: 'Відвідування (' + currentMonth + ')', data: weeklyData[currentMonth], backgroundColor: '#22c55e' }]
  },
  options: { responsive: true, scales: { y: { beginAtZero: true } } }
});

function switchMonth(month) {
  currentMonth = month;
  chart.data.datasets[0].label = 'Відвідування (' + month + ')';
  chart.data.datasets[0].data = weeklyData[month];
  chart.update();
}

var controls = document.getElementById('controls');
var btn1 = document.createElement('button');
btn1.textContent = 'Червень 2026';
btn1.onclick = function () { switchMonth('2026-06'); };
var btn2 = document.createElement('button');
btn2.textContent = 'Липень 2026';
btn2.onclick = function () { switchMonth('2026-07'); };
controls.appendChild(btn1);
controls.appendChild(btn2);`,
    [
      { level:'easy',   uk:'Перемикайся між місяцями й подивись, як графік ОНОВЛЮЄТЬСЯ через <code>chart.update()</code> без перестворення всього графіка.', ru:'Переключайся между месяцами и посмотри, как график обновляется через chart.update().' },
      { level:'medium', uk:'Додай третій місяць <code>2026-05</code> у <code>weeklyData</code> і третю кнопку для нього.', ru:'Добавь третий месяц 2026-05 в weeklyData и третью кнопку.' },
      { level:'hard',   uk:'Зміни <code>type: \'bar\'</code> на <code>type: \'line\'</code> і подивись, як той самий набір даних виглядає лінійним графіком.', ru:'Измени type: \'bar\' на type: \'line\' и посмотри, как выглядит линейный график.' },
    ],
    ``
  );

  /* ─── 09-08: Адмін-панель тренера (web) ────────────────────────────── */
  patch('09-08',
    { uk:`<h2>Адмін-панель тренера: розклад та відвідуваність</h2>
<p>Панель для тренера — таблиця з фільтрацією за датою й підопічним, реалізована на чистому JS/DOM (без React, щоб показати альтернативний підхід).</p>
<h3>Дані розкладу</h3>
<pre>const schedule = [
  { id: 1, user: 'Аліна', date: '2026-07-11', time: '18:00', status: 'заплановано' },
  { id: 2, user: 'Марко', date: '2026-07-11', time: '19:00', status: 'відвідано' },
];</pre>
<h3>Фільтрація й рендер таблиці</h3>
<pre>function renderTable(rows) {
  const tbody = document.querySelector('#schedule tbody');
  tbody.innerHTML = rows.map(r =>
    \`&lt;tr&gt;&lt;td&gt;\${r.user}&lt;/td&gt;&lt;td&gt;\${r.time}&lt;/td&gt;&lt;td&gt;\${r.status}&lt;/td&gt;&lt;/tr&gt;\`
  ).join('');
}

document.querySelector('#filter').addEventListener('change', e => {
  const filtered = e.target.value
    ? schedule.filter(r => r.status === e.target.value)
    : schedule;
  renderTable(filtered);
});</pre>`,
      ru:`<h2>Админ-панель тренера: расписание и посещаемость</h2>
<p>Панель для тренера — таблица с фильтрацией, реализована на чистом JS/DOM.</p>
<h3>Данные расписания</h3>
<pre>const schedule = [
  { id: 1, user: 'Алина', date: '2026-07-11', time: '18:00', status: 'запланировано' },
  { id: 2, user: 'Марк', date: '2026-07-11', time: '19:00', status: 'посещено' },
];</pre>
<h3>Фильтрация и рендер таблицы</h3>
<pre>function renderTable(rows) {
  const tbody = document.querySelector('#schedule tbody');
  tbody.innerHTML = rows.map(r => \`&lt;tr&gt;&lt;td&gt;\${r.user}&lt;/td&gt;&lt;/tr&gt;\`).join('');
}</pre>` },
    `<table id="schedule" style="width:100%;border-collapse:collapse">
  <thead><tr><th>Відвідувач</th><th>Час</th><th>Статус</th></tr></thead>
  <tbody></tbody>
</table>
<select id="filter">
  <option value="">Усі</option>
  <option value="заплановано">Заплановано</option>
  <option value="відвідано">Відвідано</option>
</select>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
table { margin-bottom: 12px; }
th, td { border-bottom: 1px solid #334155; padding: 6px 10px; text-align: left; font-size: 13px; }
select { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 6px; border-radius: 6px; }`,
    `var schedule = [
  { id: 1, user: 'Аліна', time: '18:00', status: 'заплановано' },
  { id: 2, user: 'Марко', time: '19:00', status: 'відвідано' },
  { id: 3, user: 'Ірина', time: '20:00', status: 'заплановано' }
];

function renderTable(rows) {
  var tbody = document.querySelector('#schedule tbody');
  var html = '';
  rows.forEach(function (r) {
    html += '<tr><td>' + r.user + '</td><td>' + r.time + '</td><td>' + r.status + '</td></tr>';
  });
  tbody.innerHTML = html;
}

document.querySelector('#filter').addEventListener('change', function (ev) {
  var value = ev.target.value;
  var filtered = value ? schedule.filter(function (r) { return r.status === value; }) : schedule;
  renderTable(filtered);
});

renderTable(schedule);`,
    [
      { level:'easy',   uk:'Перемикай фільтр і подивись, як таблиця показує лише "заплановано" або лише "відвідано".', ru:'Переключай фильтр и смотри, как таблица показывает только "запланировано" или только "посещено".' },
      { level:'medium', uk:'Додай четвертий запис у <code>schedule</code> зі статусом <code>скасовано</code> і новий пункт фільтра для нього.', ru:'Добавь четвёртую запись со статусом "отменено" и пункт фильтра для неё.' },
      { level:'hard',   uk:'Додай сортування таблиці за іменем відвідувача (кнопка "Сортувати за іменем"), що сортує масив <code>schedule</code> перед рендером.', ru:'Добавь сортировку таблицы по имени посетителя.' },
    ],
    ``
  );

  /* ─── 09-09: QR-код: генерація та сканування (web) ────────────────── */
  patch('09-09',
    { uk:`<h2>QR-код: генерація та сканування для відмітки</h2>
<p>Кожен відвідувач отримує персональний QR-код (посилання з унікальним токеном) — на вході в зал його СКАНУЮТЬ, і відмітка відвідування ставиться автоматично.</p>
<h3>Генерація QR-коду (реальна бібліотека qrcode)</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"&gt;&lt;/script&gt;
&lt;canvas id="qr"&gt;&lt;/canvas&gt;

&lt;script&gt;
QRCode.toCanvas(document.getElementById('qr'), 'checkin:user=1:token=abc123', function (err) {
  if (err) console.error(err);
});
&lt;/script&gt;</pre>
<h3>Django endpoint для перевірки токена</h3>
<pre>@api_view(['POST'])
def checkin(request):
    token = request.data.get('token')
    user = User.objects.filter(checkin_token=token).first()
    if not user:
        return Response({'error': 'Невірний QR-код'}, status=400)
    Visit.objects.create(user=user)
    return Response({'message': f'Відмічено: {user.username}'})</pre>
<h3>Чесно про "сканування" в цій пісочниці</h3>
<p>QR-код нижче генерується СПРАВЖНЬОЮ бібліотекою (не імітація). А от доступ до камери для реального сканування недоступний у цій навчальній пісочниці (iframe без дозволу камери) — тому кнопка "Сканувати" ЧЕСНО симулює розпізнавання того самого токена, який щойно згенеровано, замість реального аналізу зображення з камери.</p>`,
      ru:`<h2>QR-код: генерация и сканирование для отметки</h2>
<p>Каждый посетитель получает персональный QR-код — при входе его сканируют, и отметка посещения ставится автоматически.</p>
<h3>Генерация QR-кода (реальная библиотека qrcode)</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"&gt;&lt;/script&gt;
&lt;canvas id="qr"&gt;&lt;/canvas&gt;

&lt;script&gt;
QRCode.toCanvas(document.getElementById('qr'), 'checkin:user=1:token=abc123', function (err) {});
&lt;/script&gt;</pre>
<h3>Django endpoint для проверки токена</h3>
<pre>@api_view(['POST'])
def checkin(request):
    token = request.data.get('token')
    user = User.objects.filter(checkin_token=token).first()
    if not user:
        return Response({'error': 'Неверный QR-код'}, status=400)
    Visit.objects.create(user=user)
    return Response({'message': f'Отмечено: {user.username}'})</pre>
<h3>Честно о "сканировании" в этой песочнице</h3>
<p>QR-код генерируется настоящей библиотекой. А доступ к камере недоступен в этой учебной песочнице (iframe без разрешения камеры) — поэтому кнопка "Сканировать" честно симулирует распознавание того же токена вместо реального анализа изображения с камеры.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
</head>
<body>
<canvas id="qr"></canvas>
<div id="controls"></div>
<div id="log"></div>
</body>
</html>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
button { background: #1e293b; border: 1px solid #334155; color: #e2e8f0; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-top: 10px; margin-right: 6px; }
#log { margin-top: 10px; font-size: 13px; color: #4ade80; }
.note { color: #facc15; font-size: 11px; }`,
    `var token = 'abc123';
var checkinText = 'checkin:user=1:token=' + token;
var log = document.getElementById('log');

var note = document.createElement('p');
note.className = 'note';
note.textContent = 'QR-код нижче — справжня генерація (бібліотека qrcode). "Сканування" — чесна симуляція без доступу до камери.';
document.body.insertBefore(note, document.getElementById('controls'));

if (window.QRCode) {
  QRCode.toCanvas(document.getElementById('qr'), checkinText, function (err) {
    if (err) log.textContent = 'Помилка генерації QR: ' + err;
  });
} else {
  log.textContent = 'Не вдалося завантажити бібліотеку qrcode';
}

function simulateScan() {
  log.textContent = '';
  var line1 = document.createElement('div');
  line1.textContent = '[камера] розпізнано QR: "' + checkinText + '" (симуляція)';
  var line2 = document.createElement('div');
  line2.textContent = '[POST /api/checkin/] token=' + token + ' -> 200: Відмічено: alina';
  log.appendChild(line1);
  log.appendChild(line2);
}

var controls = document.getElementById('controls');
var btn = document.createElement('button');
btn.textContent = '📷 Сканувати (симуляція)';
btn.onclick = simulateScan;
controls.appendChild(btn);`,
    [
      { level:'easy',   uk:'Подивись на реальний QR-код, згенерований бібліотекою, потім натисни "Сканувати" й подивись на симульований лог перевірки.', ru:'Посмотри на реальный QR-код, затем нажми "Сканировать" и посмотри на симулированный лог проверки.' },
      { level:'medium', uk:'Зміни <code>token</code> на інше значення (наприклад <code>xyz999</code>) і переконайся, що НОВИЙ QR-код відповідає новому токену.', ru:'Измени token на другое значение и убедись, что новый QR-код соответствует новому токену.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши генерацію УНІКАЛЬНОГО токена для кожного користувача при реєстрації (наприклад, через <code>uuid.uuid4()</code>).', ru:'В main.py допиши генерацию уникального токена через uuid.uuid4() при регистрации.' },
    ],
    `import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Visit


# Генерація унікального токена при реєстрації:
# user.checkin_token = str(uuid.uuid4())

@api_view(['POST'])
def checkin(request):
    token = request.data.get('token')
    user = User.objects.filter(checkin_token=token).first()
    if not user:
        return Response({'error': 'Невірний QR-код'}, status=400)
    Visit.objects.create(user=user)
    return Response({'message': f'Відмічено: {user.username}'})
`
  );

  /* ─── 09-10: Push-сповіщення: Notification API (web) ──────────────── */
  patch('09-10',
    { uk:`<h2>Push-сповіщення браузера: Notification API</h2>
<p>Notification API — вбудований у браузер механізм показу системних сповіщень (той самий вигляд, що й у нативних застосунках).</p>
<h3>Запит дозволу і показ сповіщення (реальний код)</h3>
<pre>if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('Gym Tracker', {
        body: 'Твоя тренуванн через 30 хвилин!',
        icon: '/icon.png',
      });
    }
  });
}</pre>
<h3>Push-сповіщення від сервера (Service Worker, коротко)</h3>
<pre>self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, { body: data.body });
});</pre>
<p>Справжні PUSH-сповіщення (коли вкладка навіть закрита) вимагають Service Worker і сервер push-повідомлень (Web Push API) — це виходить за межі одного уроку, але базовий принцип показу локального сповіщення такий самий.</p>
<h3>Чесно про цю пісочницю</h3>
<p>Через обмеження sandboxed iframe (без дозволу top-level browsing context) справжній запит дозволу на сповіщення тут може НЕ спрацювати або бути заблокованим браузером — тому нижче є одразу РЕАЛЬНА спроба через Notification API, і чесний fallback у вигляді власного toast-повідомлення, якщо браузер заблокував запит.</p>`,
      ru:`<h2>Push-уведомления браузера: Notification API</h2>
<p>Notification API — встроенный механизм показа системных уведомлений.</p>
<h3>Запрос разрешения и показ уведомления (реальный код)</h3>
<pre>if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('Gym Tracker', { body: 'Тренировка через 30 минут!' });
    }
  });
}</pre>
<h3>Push-уведомления от сервера (Service Worker, кратко)</h3>
<pre>self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, { body: data.body });
});</pre>
<h3>Честно об этой песочнице</h3>
<p>Из-за ограничений sandboxed iframe реальный запрос разрешения может не сработать — поэтому ниже реальная попытка через Notification API плюс честный fallback в виде toast, если браузер заблокировал запрос.</p>` },
    `<div id="app">
  <button id="ask">🔔 Увімкнути сповіщення</button>
  <button id="send">Надіслати тестове сповіщення</button>
  <div id="toast" class="toast hidden"></div>
  <div id="status"></div>
</div>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
button { background: #1e293b; border: 1px solid #334155; color: #e2e8f0; padding: 8px 14px; border-radius: 6px; cursor: pointer; margin-right: 8px; }
#status { margin-top: 10px; font-size: 13px; color: #94a3b8; }
.toast { position: fixed; bottom: 20px; right: 20px; background: #22c55e; color: #0f172a; padding: 12px 18px; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,.3); }
.toast.hidden { display: none; }`,
    `var statusEl = document.getElementById('status');
var toast = document.getElementById('toast');

function showFallbackToast(title, body) {
  toast.textContent = title + ': ' + body;
  toast.classList.remove('hidden');
  setTimeout(function () { toast.classList.add('hidden'); }, 3000);
}

document.getElementById('ask').addEventListener('click', function () {
  if (!('Notification' in window)) {
    statusEl.textContent = 'Notification API недоступний у цьому браузері/контексті — використано fallback.';
    return;
  }
  Notification.requestPermission().then(function (permission) {
    statusEl.textContent = 'Notification.requestPermission() -> "' + permission + '"';
    if (permission !== 'granted') {
      statusEl.textContent += ' (справжній дозвіл НЕ надано в цій пісочниці — далі використовується власний toast-fallback)';
    }
  }).catch(function (err) {
    statusEl.textContent = 'Помилка запиту дозволу: ' + err + ' (використовується fallback)';
  });
});

document.getElementById('send').addEventListener('click', function () {
  var title = 'Gym Tracker';
  var body = 'Твоя тренування через 30 хвилин!';
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: body });
      statusEl.textContent = 'Показано СПРАВЖНЄ системне сповіщення.';
      return;
    }
  } catch (e) {
    /* sandboxed iframe часто кидає помилку тут — переходимо на fallback */
  }
  showFallbackToast(title, body);
  statusEl.textContent = 'Дозвіл не надано/недоступний у пісочниці — показано власний toast-fallback (не системне сповіщення).';
});`,
    [
      { level:'easy',   uk:'Натисни "Увімкнути сповіщення", а потім "Надіслати тестове сповіщення" — подивись у полі статусу, чи спрацював СПРАВЖНІЙ Notification API, чи система перейшла на toast-fallback.', ru:'Нажми "Включить уведомления", затем "Отправить тестовое уведомление" — посмотри в статусе, сработал ли реальный API или fallback.' },
      { level:'medium', uk:'Зміни текст <code>body</code> у функції "Надіслати" на власне повідомлення про наступне тренування.', ru:'Измени текст body в функции "Отправить" на своё сообщение.' },
      { level:'hard',   uk:'У справжньому коді (main.py) познач коментарями, які ДОДАТКОВІ кроки потрібні для СПРАВЖНІХ push-сповіщень від сервера (Service Worker, VAPID-ключі, підписка).', ru:'В main.py опиши комментариями шаги для настоящих push-уведомлений от сервера.' },
    ],
    `# Push-уведомления от сервера (за пределами одного урока) потребуют:
# 1. Реєстрація Service Worker на клієнті
# 2. Підписка користувача через PushManager.subscribe() + VAPID public key
# 3. Збереження підписки (endpoint, keys) у базі даних на сервері
# 4. Django: бібліотека pywebpush для надсилання push через VAPID private key
#
# from pywebpush import webpush
#
# webpush(
#     subscription_info=user.push_subscription,
#     data=json.dumps({'title': 'Gym Tracker', 'body': 'Тренування через 30 хв!'}),
#     vapid_private_key=VAPID_PRIVATE_KEY,
#     vapid_claims={'sub': 'mailto:admin@gymtracker.com'}
# )
`
  );

  /* ─── 09-11: React адаптивна мобільна версія (web) ────────────────── */
  patch('09-11',
    { uk:`<h2>React: адаптивна мобільна версія</h2>
<p>Адаптивність (responsive design) — та сама розмітка працює й на телефоні, і на десктопі завдяки CSS media queries.</p>
<h3>Медіа-запити</h3>
<pre>.dashboard { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

@media (max-width: 768px) {
  .dashboard { grid-template-columns: 1fr; }
}</pre>
<h3>React-компонент, що реагує на розмір екрана</h3>
<pre>function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

function Nav() {
  const isMobile = useIsMobile();
  return isMobile
    ? React.createElement(BurgerMenu)
    : React.createElement(FullNavBar);
}</pre>
<p>Спробуй змінити розмір вікна прев'ю (або відкрити результат у новій вкладці й змінити розмір вікна браузера) — макет НИЖЧЕ реально перебудовується за допомогою чистого CSS Grid + media queries.</p>`,
      ru:`<h2>React: адаптивная мобильная версия</h2>
<p>Адаптивность — одна и та же разметка работает и на телефоне, и на десктопе благодаря media queries.</p>
<h3>Медиа-запросы</h3>
<pre>.dashboard { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

@media (max-width: 768px) {
  .dashboard { grid-template-columns: 1fr; }
}</pre>
<h3>React-компонент, реагирующий на размер экрана</h3>
<pre>function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}</pre>
<p>Попробуй изменить размер окна превью — макет ниже перестраивается через чистый CSS Grid + media queries.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; margin: 0; }
.dashboard { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px; }
.mode-label { color: #facc15; font-size: 12px; margin-bottom: 8px; }
@media (max-width: 768px) {
  .dashboard { grid-template-columns: 1fr; }
}`,
    `var e = React.createElement;

function useIsMobile() {
  var state = React.useState(window.innerWidth < 768);
  var isMobile = state[0], setIsMobile = state[1];
  React.useEffect(function () {
    function handler() { setIsMobile(window.innerWidth < 768); }
    window.addEventListener('resize', handler);
    return function () { window.removeEventListener('resize', handler); };
  }, []);
  return isMobile;
}

function Dashboard() {
  var isMobile = useIsMobile();
  return e('div', null,
    e('p', { className: 'mode-label' }, isMobile ? '📱 Мобільний режим (ширина < 768px)' : '🖥 Десктопний режим (ширина >= 768px)'),
    e('div', { className: 'dashboard' },
      e('div', { className: 'card' }, 'Профіль'),
      e('div', { className: 'card' }, 'Відвідування'),
      e('div', { className: 'card' }, 'Графік')
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(Dashboard));`,
    [
      { level:'easy',   uk:'Відкрий результат у новій вкладці (кнопка ⤢) і зменш ширину вікна браузера — подивись, як картки переходять з трьох колонок в одну.', ru:'Открой результат в новой вкладке и уменьши ширину окна браузера — посмотри, как карточки переходят из трёх колонок в одну.' },
      { level:'medium', uk:'Зміни поріг у CSS з <code>768px</code> на <code>1024px</code> і подивись, як це впливає на те, коли макет перемикається.', ru:'Измени порог в CSS с 768px на 1024px и посмотри, как это влияет на переключение макета.' },
      { level:'hard',   uk:'Додай четверту картку "Налаштування", яка ПОКАЗУЄТЬСЯ лише в десктопному режимі (<code>{!isMobile && ...}</code>).', ru:'Добавь четвёртую карточку "Настройки", показываемую только в десктопном режиме.' },
    ],
    ``
  );

  /* ─── 09-12: JWT refresh токени та silent refresh ─────────────────── */
  patch('09-12',
    { uk:`<h2>JWT: refresh токени та silent refresh</h2>
<p>Access-токен живе КОРОТКО (наприклад, 15 хвилин) з міркувань безпеки. Щоб не змушувати користувача постійно логінитись, застосунок автоматично оновлює токен У ФОНІ — це і є "silent refresh".</p>
<h3>Клієнтська логіка (React)</h3>
<pre>function useSilentRefresh(refreshToken, onNewAccessToken) {
  React.useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (res.ok) {
        const data = await res.json();
        onNewAccessToken(data.access);
      }
    }, 14 * 60 * 1000);  // за хвилину до закінчення 15-хвилинного access-токена
    return () => clearInterval(interval);
  }, [refreshToken]);
}</pre>
<h3>Django: перевірка й видача нового access-токена</h3>
<pre>path('api/token/refresh/', TokenRefreshView.as_view()),</pre>
<h3>Interceptor для 401 (перехоплення протермінованого токена)</h3>
<pre>async function apiFetch(url, options = {}) {
  let res = await fetch(url, { ...options, headers: { ...options.headers, Authorization: \`Bearer \${accessToken}\` } });
  if (res.status === 401) {
    accessToken = await refreshAccessToken();
    res = await fetch(url, { ...options, headers: { ...options.headers, Authorization: \`Bearer \${accessToken}\` } });
  }
  return res;
}</pre>`,
      ru:`<h2>JWT: refresh токены и silent refresh</h2>
<p>Access-токен живёт недолго. Чтобы не заставлять пользователя постоянно логиниться, приложение автоматически обновляет токен в фоне — это и есть "silent refresh".</p>
<h3>Клиентская логика (React)</h3>
<pre>function useSilentRefresh(refreshToken, onNewAccessToken) {
  React.useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (res.ok) {
        const data = await res.json();
        onNewAccessToken(data.access);
      }
    }, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshToken]);
}</pre>
<h3>Django</h3>
<pre>path('api/token/refresh/', TokenRefreshView.as_view()),</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

function fakeJwt(kind) { return btoa(kind + ':' + Date.now()).slice(0, 20); }

var currentAccess = fakeJwt('access');
var currentRefresh = fakeJwt('refresh');
var refreshCount = 0;

var router = createRouter();
router.path('/api/token/refresh/', ['POST'], function (req) {
  if (req.data.refresh !== currentRefresh) return Response({ detail: 'Invalid refresh token' }, { status: 401 });
  refreshCount++;
  currentAccess = fakeJwt('access');
  return { access: currentAccess };
});
router.path('/api/profile/', ['GET'], function (req) {
  if (req.headers.auth !== 'Bearer ' + currentAccess) return Response({ detail: 'Token expired' }, { status: 401 });
  return { username: 'alina' };
});

function silentRefresh() {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '[silent refresh] POST /api/token/refresh/', '#c4b5fd');
  var res = router.resolve('POST', '/api/token/refresh/', { refresh: currentRefresh });
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), '#4ade80');
  logLine(termOut, '[silent refresh] #' + refreshCount + ' завершено — новий access зберігається непомітно для користувача', '#4ade80');
}

row.appendChild(mkBtn('Симулювати спливання таймера (14 хв)', silentRefresh));
row.appendChild(mkBtn('GET /api/profile/ (поточним access)', function () {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ GET /api/profile/', '#68a063');
  var res = router.resolve('GET', '/api/profile/', {}, { auth: 'Bearer ' + currentAccess });
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}));`,
    [
      { level:'easy',   uk:'Натисни "Симулювати спливання таймера" кілька разів і подивись, як <code>refreshCount</code> зростає — кожен раз генерується НОВИЙ access token.', ru:'Нажми "Симулировать истечение таймера" несколько раз и посмотри, как refreshCount растёт.' },
      { level:'medium', uk:'Виконай <code>GET /api/profile/</code> ПІСЛЯ silent refresh — переконайся, що новий access token справді працює.', ru:'Выполни GET /api/profile/ после silent refresh — убедись, что новый токен работает.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши функцію <code>apiFetch</code>, що автоматично повторює запит із НОВИМ токеном, якщо перша спроба повернула 401.', ru:'В main.py допиши apiFetch, автоматически повторяющую запрос с новым токеном при 401.' },
    ],
    `# React: silent refresh кожні 14 хвилин (access живе 15 хв)
#
# function useSilentRefresh(refreshToken, onNewAccessToken) {
#   React.useEffect(() => {
#     const interval = setInterval(async () => {
#       const res = await fetch('/api/token/refresh/', {
#         method: 'POST',
#         body: JSON.stringify({ refresh: refreshToken }),
#       });
#       if (res.ok) onNewAccessToken((await res.json()).access);
#     }, 14 * 60 * 1000);
#     return () => clearInterval(interval);
#   }, [refreshToken]);
# }

from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path

urlpatterns = [
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
`
  );

  /* ─── 09-13: Docker Compose ─────────────────────────────────────────── */
  patch('09-13',
    { uk:`<h2>Docker Compose: React + Django + PostgreSQL</h2>
<p>Docker Compose дозволяє описати ВЕСЬ стек проекту (фронтенд, бекенд, база даних) в одному YAML-файлі й підняти все ОДНІЄЮ командою.</p>
<h3>docker-compose.yml</h3>
<pre>version: '3.9'

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: gym_tracker
      POSTGRES_USER: gym_admin
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://gym_admin:secret@db:5432/gym_tracker
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  pgdata:</pre>
<h3>Запуск</h3>
<pre>docker-compose up --build
docker-compose down</pre>
<h3>Ця пісочниця: симуляція логів запуску</h3>
<p>Реального Docker-двигуна в браузері немає — нижче чесна термінал-симуляція типової послідовності запуску трьох сервісів.</p>`,
      ru:`<h2>Docker Compose: React + Django + PostgreSQL</h2>
<p>Docker Compose описывает весь стек проекта в одном YAML-файле.</p>
<h3>docker-compose.yml</h3>
<pre>version: '3.9'

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: gym_tracker
      POSTGRES_PASSWORD: secret

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
    depends_on: [db]
    ports: ["8000:8000"]

  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [backend]</pre>
<h3>Запуск</h3>
<pre>docker-compose up --build
docker-compose down</pre>
<h3>Эта песочница: симуляция логов запуска</h3>
<p>Реального Docker-движка в браузере нет — ниже честная терминал-симуляция типичной последовательности запуска трёх сервисов.</p>` },
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

function runComposeUp() {
  logLine('', '');
  logLine('$ docker-compose up --build', '#68a063');
  logLine('[+] Building 3 services...', '#64748b');
  setTimeout(function () { logLine('db          | database system is ready to accept connections', '#4ade80'); }, 300);
  setTimeout(function () { logLine('backend     | Starting gunicorn... Listening at: http://0.0.0.0:8000', '#4ade80'); }, 700);
  setTimeout(function () { logLine('frontend    | webpack compiled successfully, ready at http://0.0.0.0:3000', '#4ade80'); }, 1100);
}

function runComposeDown() {
  logLine('', '');
  logLine('$ docker-compose down', '#68a063');
  logLine('Stopping frontend... done', '#facc15');
  logLine('Stopping backend...  done', '#facc15');
  logLine('Stopping db...       done', '#facc15');
  logLine('Removing network myproject_default', '#94a3b8');
}

row.appendChild(mkBtn('docker-compose up --build', runComposeUp));
row.appendChild(mkBtn('docker-compose down', runComposeDown));`,
    [
      { level:'easy',   uk:'Виконай <code>up --build</code> і подивись, як сервіси стартують у ПРАВИЛЬНОМУ порядку (спочатку db, потім backend, потім frontend) завдяки <code>depends_on</code>.', ru:'Выполни up --build и посмотри, как сервисы стартуют в правильном порядке благодаря depends_on.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши новий сервіс <code>redis</code> у <code>docker-compose.yml</code> (образ <code>redis:7</code>), потрібний для Celery з модуля 07-16.', ru:'В main.py допиши сервис redis (образ redis:7) для Celery из модуля 07-16.' },
      { level:'hard',   uk:'Додай кнопку <code>docker-compose logs backend</code>, що показує лише лог одного сервісу (backend), симулюючи фільтрацію.', ru:'Добавь кнопку docker-compose logs backend, показывающую лог только одного сервиса.' },
    ],
    `version: '3.9'

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: gym_tracker
      POSTGRES_USER: gym_admin
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
    depends_on:
      - db
      - redis
    environment:
      DATABASE_URL: postgres://gym_admin:secret@db:5432/gym_tracker
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  pgdata:
`
  );

  /* ─── 09-14: CI/CD GitHub Actions (web, за замовчуванням) ─────────── */
  patch('09-14',
    { uk:`<h2>CI/CD: GitHub Actions для тестів та лінту</h2>
<p>CI/CD (Continuous Integration/Continuous Deployment) автоматично запускає тести й перевірки коду ПРИ КОЖНОМУ push, ще до того, як код потрапить у продакшн.</p>
<h3>.github/workflows/ci.yml</h3>
<pre>name: CI

on: [push, pull_request]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -r requirements.txt
      - run: pytest

  lint-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint</pre>
<h3>Що показано в демо нижче</h3>
<p>Візуальна симуляція виконання пайплайна: кожен крок "запускається" по черзі й позначається ✓ або ✗ — саме так виглядає інтерфейс GitHub Actions під час реального прогону.</p>`,
      ru:`<h2>CI/CD: GitHub Actions для тестов и линта</h2>
<p>CI/CD автоматически запускает тесты и проверки кода при каждом push.</p>
<h3>.github/workflows/ci.yml</h3>
<pre>name: CI

on: [push, pull_request]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -r requirements.txt
      - run: pytest

  lint-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint</pre>
<h3>Что показано в демо ниже</h3>
<p>Визуальная симуляция выполнения пайплайна: каждый шаг запускается по очереди и помечается ✓ или ✗.</p>` },
    `<div id="pipeline"></div>
<button id="run">▶ Запустити пайплайн</button>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
.step { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 13px; }
.step .icon { width: 18px; }
button { background: #22c55e; color: #0f172a; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }`,
    `var steps = [
  'actions/checkout@v4',
  'setup-python@v5 (3.12)',
  'pip install -r requirements.txt',
  'pytest',
  'setup-node@v4 (20)',
  'npm ci',
  'npm run lint'
];

var pipeline = document.getElementById('pipeline');
var rows = steps.map(function (label) {
  var row = document.createElement('div');
  row.className = 'step';
  row.innerHTML = '<span class="icon">⏳</span><span>' + label + '</span>';
  pipeline.appendChild(row);
  return row;
});

function runPipeline() {
  rows.forEach(function (row, i) {
    setTimeout(function () {
      var icon = row.querySelector('.icon');
      icon.textContent = '✓';
      icon.style.color = '#4ade80';
    }, i * 400);
  });
}

document.getElementById('run').addEventListener('click', runPipeline);`,
    [
      { level:'easy',   uk:'Натисни "Запустити пайплайн" і подивись, як кроки виконуються ПОСЛІДОВНО, один за одним, як у справжньому GitHub Actions.', ru:'Нажми "Запустить пайплайн" и посмотри, как шаги выполняются последовательно.' },
      { level:'medium', uk:'Додай восьмий крок <code>npm run build</code> у масив <code>steps</code>.', ru:'Добавь восьмой шаг npm run build в массив steps.' },
      { level:'hard',   uk:'Зроби так, щоб ОДИН із кроків (наприклад, <code>pytest</code>) "провалювався" — показуй ✗ червоним кольором замість ✓, і зупиняй виконання наступних кроків (як робить реальний CI при падінні тесту).', ru:'Сделай так, чтобы один из шагов "проваливался" — покажи ✗ и останови выполнение следующих шагов.' },
    ],
    ``
  );

  /* ─── 09-15: ФІНАЛ 1 — деплой на VPS ───────────────────────────────── */
  patch('09-15',
    { uk:`<h2>ФІНАЛ 1: Gym Tracker — деплой на VPS</h2>
<p>Останній крок проекту — розгорнути Gym Tracker на реальному сервері (VPS): Nginx як зворотний проксі, Gunicorn як WSGI-сервер для Django, systemd для автозапуску.</p>
<h3>Nginx — конфігурація зворотного проксі</h3>
<pre># /etc/nginx/sites-available/gymtracker
server {
    listen 80;
    server_name gymtracker.com;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
    }

    location / {
        root /var/www/gymtracker/frontend/build;
        try_files $uri /index.html;
    }
}</pre>
<h3>Gunicorn + systemd — автозапуск Django</h3>
<pre># /etc/systemd/system/gymtracker.service
[Unit]
Description=Gym Tracker Django
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/gymtracker/backend
ExecStart=/var/www/gymtracker/backend/venv/bin/gunicorn myproject.wsgi:application --bind 127.0.0.1:8000

[Install]
WantedBy=multi-user.target</pre>
<h3>Команди деплою</h3>
<pre>sudo systemctl enable gymtracker
sudo systemctl start gymtracker
sudo nginx -t && sudo systemctl reload nginx</pre>
<h3>Що зробив цей курс</h3>
<p>За 9 модулів ти пройшов шлях від просунутого JavaScript до повноцінного fullstack-застосунку: React-фронтенд, Flask/Django-бекенди, реальні SQL-бази через sql.js, JWT-автентифікацію, і, нарешті, — деплой на справжній сервер. Попереду ще два фінальні проекти курсу (модулі 10-11) і DevOps (модуль 12).</p>`,
      ru:`<h2>ФИНАЛ 1: Gym Tracker — деплой на VPS</h2>
<p>Последний шаг проекта — развернуть Gym Tracker на реальном сервере: Nginx как обратный прокси, Gunicorn как WSGI-сервер, systemd для автозапуска.</p>
<h3>Nginx</h3>
<pre>server {
    listen 80;
    server_name gymtracker.com;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
    }

    location / {
        root /var/www/gymtracker/frontend/build;
        try_files $uri /index.html;
    }
}</pre>
<h3>Gunicorn + systemd</h3>
<pre>[Unit]
Description=Gym Tracker Django
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/gymtracker/backend
ExecStart=/var/www/gymtracker/backend/venv/bin/gunicorn myproject.wsgi:application --bind 127.0.0.1:8000

[Install]
WantedBy=multi-user.target</pre>
<h3>Команды деплоя</h3>
<pre>sudo systemctl enable gymtracker
sudo systemctl start gymtracker
sudo nginx -t && sudo systemctl reload nginx</pre>
<h3>Что сделал этот курс</h3>
<p>За 9 модулей ты прошёл путь от продвинутого JavaScript до полноценного fullstack-приложения. Впереди ещё два финальных проекта (модули 10-11) и DevOps (модуль 12).</p>` },
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

function runDeploy() {
  var steps = [
    ['$ git pull origin main', '#68a063'],
    ['$ pip install -r requirements.txt', '#68a063'],
    ['$ python manage.py migrate', '#68a063'],
    ['$ python manage.py collectstatic --noinput', '#68a063'],
    ['$ npm run build (frontend)', '#68a063'],
    ['$ sudo systemctl restart gymtracker', '#68a063'],
    ['$ sudo systemctl reload nginx', '#68a063'],
    ['✓ Деплой завершено. Gym Tracker доступний на https://gymtracker.com', '#4ade80']
  ];
  steps.forEach(function (step, i) {
    setTimeout(function () { logLine(step[0], step[1]); }, i * 350);
  });
}

row.appendChild(mkBtn('🚀 Задеплоїти на VPS', runDeploy));`,
    [
      { level:'easy',   uk:'Натисни "Задеплоїти на VPS" і подивись на повну послідовність кроків реального деплою Django-проекту.', ru:'Нажми "Задеплоить на VPS" и посмотри на полную последовательность шагов реального деплоя.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши, які змінні середовища (принаймні 3) обовʼязково мають бути налаштовані на сервері ПЕРЕД деплоєм (наприклад, <code>SECRET_KEY</code>, <code>DATABASE_URL</code>).', ru:'В main.py допиши минимум 3 переменные окружения, обязательные перед деплоем.' },
      { level:'hard',   uk:'Додай у <code>runDeploy</code> новий крок ПЕРЕД перезапуском сервісу — <code>pytest</code> (запуск тестів), і поясни, чому тести варто запускати ПЕРЕД деплоєм, а не після.', ru:'Добавь шаг pytest перед перезапуском сервиса и объясни, почему тесты стоит запускать до деплоя.' },
    ],
    `# Конфігурація сервера (виконується один раз при налаштуванні VPS)

# /etc/nginx/sites-available/gymtracker
# server {
#     listen 80;
#     server_name gymtracker.com;
#     location /api/ { proxy_pass http://127.0.0.1:8000; }
#     location / {
#         root /var/www/gymtracker/frontend/build;
#         try_files $uri /index.html;
#     }
# }

# /etc/systemd/system/gymtracker.service
# [Unit]
# Description=Gym Tracker Django
# After=network.target
#
# [Service]
# User=www-data
# WorkingDirectory=/var/www/gymtracker/backend
# Environment=SECRET_KEY=change-me-in-production
# Environment=DATABASE_URL=postgres://gym_admin:secret@localhost:5432/gym_tracker
# Environment=DEBUG=False
# ExecStart=/var/www/gymtracker/backend/venv/bin/gunicorn myproject.wsgi:application --bind 127.0.0.1:8000
#
# [Install]
# WantedBy=multi-user.target

# Послідовність деплою:
# git pull origin main
# pip install -r requirements.txt
# pytest
# python manage.py migrate
# python manage.py collectstatic --noinput
# npm run build
# sudo systemctl restart gymtracker
# sudo nginx -t && sudo systemctl reload nginx
`
  );

})();
