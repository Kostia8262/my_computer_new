/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 07 — Django + DRF · 14–18
   Патчить WEB_LESSONS після завантаження lessons.js

   Той самий підхід, що й у модулі 06 (Flask): starterCode.python —
   справжній, ідіоматичний Django/DRF-код; starterCode.js — чесна
   JS-симуляція (fakeDjango) тієї самої логіки роутингу/серіалізації,
   яка РЕАЛЬНО виконується в браузері через runPythonDemo() з app.js.
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

  /* Джерело fakeDjango передається як ТЕКСТ у кожен урок, бо код уроку
     виконується в ІЗОЛЬОВАНОМУ контексті через new Function() всередині
     runPythonDemo (app.js), без доступу до зовнішньої області цього файлу. */
  const FAKE_DJANGO_SRC = `function createRouter() {
  var patterns = [];
  return {
    path: function (route, methods, handler) {
      patterns.push({ route: route, methods: methods, handler: handler });
    },
    resolve: function (method, fullPath, body, headers) {
      var pathOnly = fullPath.split('?')[0];
      var query = parseQueryString(fullPath);
      for (var i = 0; i < patterns.length; i++) {
        var p = patterns[i];
        if (p.methods.indexOf(method) === -1) continue;
        var params = matchPath(p.route, pathOnly);
        if (!params) continue;
        var result;
        try {
          result = p.handler({ params: params, query: query, data: body || {}, headers: headers || {} });
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

function parseQueryString(fullPath) {
  var q = {};
  var idx = fullPath.indexOf('?');
  if (idx === -1) return q;
  fullPath.slice(idx + 1).split('&').forEach(function (pair) {
    var parts = pair.split('=');
    q[parts[0]] = decodeURIComponent(parts[1] || '');
  });
  return q;
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

  /* ─── 07-01: Django — структура, startproject, startapp, settings ─── */
  patch('07-01',
    { uk:`<h2>Django: структура, startproject, startapp, settings</h2>
<p>Django — "batteries included" фреймворк: на відміну від Flask (модуль 06), він одразу дає ORM, адмін-панель, систему автентифікації й багато іншого "з коробки", але вимагає дотримання певної структури проекту.</p>
<h3>Встановлення й створення проекту</h3>
<pre>pip install django
django-admin startproject myproject
cd myproject
python manage.py startapp blog</pre>
<h3>Структура згенерованого проекту</h3>
<pre>myproject/
├── manage.py
├── myproject/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── blog/
    ├── models.py
    ├── views.py
    ├── admin.py
    ├── apps.py
    └── migrations/</pre>
<h3>Реєстрація застосунку в settings.py</h3>
<pre>INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'blog',   # ← наш новий застосунок
]</pre>
<h3>Запуск сервера розробки</h3>
<pre>python manage.py runserver
# Starting development server at http://127.0.0.1:8000/</pre>
<h3>Проект vs застосунок (app)</h3>
<p>Проект (project) — це весь сайт, а застосунок (app) — окремий функціональний модуль (blog, users, shop). Один проект може містити багато застосунків, і застосунок теоретично можна перевикористати в іншому проекті.</p>`,
      ru:`<h2>Django: структура, startproject, startapp, settings</h2>
<p>Django — "batteries included" фреймворк: сразу даёт ORM, админ-панель, систему аутентификации, но требует определённой структуры проекта.</p>
<h3>Установка и создание проекта</h3>
<pre>pip install django
django-admin startproject myproject
cd myproject
python manage.py startapp blog</pre>
<h3>Структура сгенерированного проекта</h3>
<pre>myproject/
├── manage.py
├── myproject/settings.py, urls.py, wsgi.py
└── blog/models.py, views.py, admin.py, migrations/</pre>
<h3>Регистрация приложения в settings.py</h3>
<pre>INSTALLED_APPS = [
    'django.contrib.admin',
    'blog',
]</pre>
<h3>Запуск сервера разработки</h3>
<pre>python manage.py runserver</pre>
<h3>Проект vs приложение (app)</h3>
<p>Проект — весь сайт, приложение — отдельный функциональный модуль.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var row = document.createElement('div');
demoRoot.appendChild(row);
var tree = document.createElement('pre');
tree.style.cssText = 'background:#fff;color:#0f172a;padding:12px;border-radius:8px;margin-top:8px;font-family:Consolas,monospace;font-size:12px;white-space:pre-wrap';
demoRoot.appendChild(tree);

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

function runStartProject() {
  logLine('', '');
  logLine('$ django-admin startproject myproject', '#68a063');
  tree.textContent = 'myproject/\\n  manage.py\\n  myproject/\\n    settings.py\\n    urls.py\\n    wsgi.py\\n    asgi.py';
  logLine('Створено базову структуру проекту', '#4ade80');
}

function runStartApp() {
  logLine('', '');
  logLine('$ python manage.py startapp blog', '#68a063');
  tree.textContent = 'myproject/\\n  manage.py\\n  myproject/settings.py, urls.py\\n  blog/\\n    models.py\\n    views.py\\n    admin.py\\n    apps.py\\n    migrations/';
  logLine('Створено застосунок blog/, зареєструй його в INSTALLED_APPS', '#4ade80');
}

function runServer() {
  logLine('', '');
  logLine('$ python manage.py runserver', '#68a063');
  logLine('Watching for file changes with StatReloader', '#64748b');
  logLine('Starting development server at http://127.0.0.1:8000/', '#4ade80');
}

row.appendChild(mkBtn('startproject myproject', runStartProject));
row.appendChild(mkBtn('startapp blog', runStartApp));
row.appendChild(mkBtn('runserver', runServer));`,
    [
      { level:'easy',   uk:'Виконай усі три команди по черзі й подивись, як змінюється дерево файлів проекту.', ru:'Выполни все три команды по очереди и посмотри, как меняется дерево файлов проекта.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши, який рядок треба додати в <code>INSTALLED_APPS</code>, щоб зареєструвати застосунок <code>blog</code>.', ru:'В main.py допиши, какую строку нужно добавить в INSTALLED_APPS для регистрации blog.' },
      { level:'hard',   uk:'Додай четверту кнопку <code>startapp users</code>, що показує дерево з ДВОМА застосунками одночасно (blog і users).', ru:'Добавь кнопку startapp users, показывающую дерево с двумя приложениями одновременно.' },
    ],
    `# Термінал (реальні команди, виконуються поза пісочницею):
#
# pip install django
# django-admin startproject myproject
# cd myproject
# python manage.py startapp blog
# python manage.py runserver

# myproject/settings.py (фрагмент):
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog',
]
`
  );

  /* ─── 07-02: Settings — модульна конфігурація, env vars ──────────── */
  patch('07-02',
    { uk:`<h2>Settings: модульна конфігурація та змінні середовища</h2>
<p>Жорстко "зашивати" секретні ключі й паролі в <code>settings.py</code> — погана й небезпечна практика. Реальні проекти читають конфігурацію зі змінних середовища.</p>
<h3>python-dotenv + os.environ</h3>
<pre>pip install python-dotenv

# .env (НЕ комітиться в git!)
SECRET_KEY=справжній-секретний-ключ
DEBUG=False
DATABASE_URL=postgres://user:pass@localhost/mydb</pre>
<pre># settings.py
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'</pre>
<h3>Розділення налаштувань за середовищем</h3>
<pre>myproject/settings/
├── __init__.py
├── base.py       # спільні налаштування
├── development.py
└── production.py</pre>
<pre># development.py
from .base import *
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# production.py
from .base import *
DEBUG = False
ALLOWED_HOSTS = ['myapp.com']</pre>
<h3>Запуск із конкретними налаштуваннями</h3>
<pre>python manage.py runserver --settings=myproject.settings.production</pre>
<h3>Чому це важливо</h3>
<p>Секрети (ключі API, паролі бази даних) НІКОЛИ не повинні потрапляти в git-репозиторій — файл <code>.env</code> завжди додається в <code>.gitignore</code>.</p>`,
      ru:`<h2>Settings: модульная конфигурация и переменные окружения</h2>
<p>Хардкодить секретные ключи в settings.py — плохая и опасная практика. Реальные проекты читают конфигурацию из переменных окружения.</p>
<h3>python-dotenv + os.environ</h3>
<pre>pip install python-dotenv

# .env (НЕ коммитится в git!)
SECRET_KEY=настоящий-секретный-ключ
DEBUG=False</pre>
<pre># settings.py
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'</pre>
<h3>Разделение настроек по окружению</h3>
<pre>myproject/settings/base.py, development.py, production.py</pre>
<h3>Запуск с конкретными настройками</h3>
<pre>python manage.py runserver --settings=myproject.settings.production</pre>
<h3>Почему это важно</h3>
<p>Секреты никогда не должны попадать в git — .env всегда добавляется в .gitignore.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var row = document.createElement('div');
demoRoot.appendChild(row);
var out = document.createElement('pre');
out.style.cssText = 'background:#fff;color:#0f172a;padding:12px;border-radius:8px;margin-top:8px;font-family:Consolas,monospace;font-size:12px;white-space:pre-wrap';
demoRoot.appendChild(out);

function mkBtn(text, onClick) {
  var b = document.createElement('button');
  b.textContent = text;
  b.style.cssText = 'background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;margin:3px 6px 3px 0';
  b.onclick = onClick;
  return b;
}

var envVars = { SECRET_KEY: '(схований у .env)', DEBUG: 'False', ALLOWED_HOSTS: 'myapp.com' };
var devVars = { SECRET_KEY: 'dev-insecure-key', DEBUG: 'True', ALLOWED_HOSTS: 'localhost,127.0.0.1' };

function showSettings(env, vars) {
  out.textContent = '# manage.py runserver --settings=myproject.settings.' + env + '\\n\\n' +
    'SECRET_KEY = "' + vars.SECRET_KEY + '"\\n' +
    'DEBUG = ' + vars.DEBUG + '\\n' +
    'ALLOWED_HOSTS = [' + vars.ALLOWED_HOSTS.split(',').map(function (h) { return '"' + h + '"'; }).join(', ') + ']';
}

row.appendChild(mkBtn('settings.development', function () { showSettings('development', devVars); }));
row.appendChild(mkBtn('settings.production', function () { showSettings('production', envVars); }));
showSettings('development', devVars);`,
    [
      { level:'easy',   uk:'Перемикайся між <code>development</code> і <code>production</code> й подивись, як <code>DEBUG</code> і <code>ALLOWED_HOSTS</code> відрізняються.', ru:'Переключайся между development и production и посмотри, как отличаются DEBUG и ALLOWED_HOSTS.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши файл <code>.env</code> із трьома змінними: <code>SECRET_KEY</code>, <code>DEBUG</code>, <code>DATABASE_URL</code>.', ru:'В main.py допиши файл .env с тремя переменными.' },
      { level:'hard',   uk:'Додай третій обʼєкт налаштувань <code>stagingVars</code> і кнопку <code>settings.staging</code> із проміжними значеннями (DEBUG=True, але з реальним доменом замість localhost).', ru:'Добавь третий объект настроек stagingVars и кнопку settings.staging.' },
    ],
    `# .env (не комітиться в git!)
# SECRET_KEY=справжній-секретний-ключ
# DEBUG=False
# DATABASE_URL=postgres://user:pass@localhost/mydb

# myproject/settings/base.py
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get('SECRET_KEY')


# myproject/settings/development.py
from .base import *
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']


# myproject/settings/production.py
from .base import *
DEBUG = False
ALLOWED_HOSTS = ['myapp.com']
`
  );

  /* ─── 07-03: Моделі — поля, типи, ForeignKey, ManyToMany, OneToOne ── */
  patch('07-03',
    { uk:`<h2>Моделі: поля, типи, ForeignKey, ManyToMany, OneToOne</h2>
<h3>Базова модель</h3>
<pre>from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name</pre>
<h3>ForeignKey — "один до багатьох"</h3>
<pre>class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)</pre>
<h3>ManyToMany — "багато до багатьох"</h3>
<pre>class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

class Post(models.Model):
    # ...
    tags = models.ManyToManyField(Tag, related_name='posts')</pre>
<h3>OneToOne — "один до одного"</h3>
<pre>class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', blank=True)</pre>
<h3>on_delete — що робити при видаленні звʼязаного обʼєкта</h3>
<ul>
  <li><code>CASCADE</code> — видалити разом (видалили автора → видалились і його пости)</li>
  <li><code>SET_NULL</code> — обнулити посилання (потребує <code>null=True</code>)</li>
  <li><code>PROTECT</code> — заборонити видалення, поки є звʼязані обʼєкти</li>
</ul>`,
      ru:`<h2>Модели: поля, типы, ForeignKey, ManyToMany, OneToOne</h2>
<h3>Базовая модель</h3>
<pre>from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name</pre>
<h3>ForeignKey — "один ко многим"</h3>
<pre>class Post(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='posts')</pre>
<h3>ManyToMany — "многие ко многим"</h3>
<pre>class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

class Post(models.Model):
    tags = models.ManyToManyField(Tag, related_name='posts')</pre>
<h3>OneToOne — "один к одному"</h3>
<pre>class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)</pre>
<h3>on_delete</h3>
<ul>
  <li>CASCADE — удалить вместе</li>
  <li>SET_NULL — обнулить ссылку</li>
  <li>PROTECT — запретить удаление</li>
</ul>` },
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

var authors = [{ id: 1, name: 'Іван Франко' }];
var tags = [{ id: 1, name: 'python' }, { id: 2, name: 'web' }];
var posts = [{ id: 1, title: 'Перший пост', author_id: 1, tag_ids: [1, 2] }];

function send(label, fn) {
  logLine('', '#64748b');
  logLine('>>> ' + label, '#68a063');
  logLine(JSON.stringify(fn()), '#4ade80');
}

row.appendChild(mkBtn('post.author (ForeignKey)', function () {
  send('Post.objects.get(id=1).author.name', function () {
    var post = posts[0];
    var author = authors.find(function (a) { return a.id === post.author_id; });
    return author.name;
  });
}));
row.appendChild(mkBtn('author.posts (related_name)', function () {
  send('author.posts.all()', function () {
    var author = authors[0];
    return posts.filter(function (p) { return p.author_id === author.id; }).map(function (p) { return p.title; });
  });
}));
row.appendChild(mkBtn('post.tags.all() (ManyToMany)', function () {
  send('post.tags.all()', function () {
    var post = posts[0];
    return post.tag_ids.map(function (tid) { return tags.find(function (t) { return t.id === tid; }).name; });
  });
}));`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки й побач, як ForeignKey і ManyToMany реалізуються через простий пошук по масивах (спрощена модель реальних SQL JOIN-ів).', ru:'Нажми все три кнопки и посмотри, как ForeignKey и ManyToMany реализуются через поиск по массивам.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нову модель <code>Comment</code> з <code>ForeignKey</code> на <code>Post</code> (<code>on_delete=models.CASCADE</code>).', ru:'В main.py добавь модель Comment с ForeignKey на Post.' },
      { level:'hard',   uk:'Додай у симуляцію новий масив <code>comments</code> і кнопку, що показує всі коментарі конкретного поста (аналог <code>post.comments.all()</code>).', ru:'Добавь массив comments и кнопку, показывающую все комментарии конкретного поста.' },
    ],
    `from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='posts')
    tags = models.ManyToManyField(Tag, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
`
  );

  /* ─── 07-04: Migrations ───────────────────────────────────────────── */
  patch('07-04',
    { uk:`<h2>Міграції: makemigrations, migrate, squashmigrations</h2>
<h3>Створення міграції після зміни моделі</h3>
<pre>python manage.py makemigrations
# Migrations for 'blog':
#   blog/migrations/0002_post_tags.py
#     - Add field tags to post</pre>
<h3>Перегляд SQL, який буде виконано</h3>
<pre>python manage.py sqlmigrate blog 0002</pre>
<h3>Застосування міграцій</h3>
<pre>python manage.py migrate
# Operations to perform:
#   Apply all migrations: admin, auth, blog, contenttypes, sessions
# Running migrations:
#   Applying blog.0002_post_tags... OK</pre>
<h3>Перегляд статусу міграцій</h3>
<pre>python manage.py showmigrations</pre>
<h3>squashmigrations — обʼєднання багатьох міграцій в одну</h3>
<pre>python manage.py squashmigrations blog 0001 0015
# Корисно, коли проект має десятки дрібних міграцій, що уповільнюють деплой</pre>
<h3>Відкат міграції</h3>
<pre>python manage.py migrate blog 0001   # відкотитись до конкретної міграції</pre>`,
      ru:`<h2>Миграции: makemigrations, migrate, squashmigrations</h2>
<h3>Создание миграции после изменения модели</h3>
<pre>python manage.py makemigrations</pre>
<h3>Просмотр SQL</h3>
<pre>python manage.py sqlmigrate blog 0002</pre>
<h3>Применение миграций</h3>
<pre>python manage.py migrate</pre>
<h3>Просмотр статуса миграций</h3>
<pre>python manage.py showmigrations</pre>
<h3>squashmigrations — объединение миграций</h3>
<pre>python manage.py squashmigrations blog 0001 0015</pre>
<h3>Откат миграции</h3>
<pre>python manage.py migrate blog 0001</pre>` },
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

var migrations = [];

function runMakeMigrations() {
  migrations.push('000' + (migrations.length + 1) + '_auto');
  logLine('', '');
  logLine('$ python manage.py makemigrations', '#68a063');
  logLine('Migrations for "blog":', '#64748b');
  logLine('  blog/migrations/' + migrations[migrations.length - 1] + '.py', '#4ade80');
}

function runMigrate() {
  logLine('', '');
  logLine('$ python manage.py migrate', '#68a063');
  if (migrations.length === 0) {
    logLine('No migrations to apply.', '#facc15');
  } else {
    logLine('Running migrations:', '#64748b');
    migrations.forEach(function (m) { logLine('  Applying blog.' + m + '... OK', '#4ade80'); });
    migrations = [];
  }
}

function runShowMigrations() {
  logLine('', '');
  logLine('$ python manage.py showmigrations', '#68a063');
  if (migrations.length === 0) logLine('[X] усі міграції застосовано', '#4ade80');
  else migrations.forEach(function (m) { logLine('[ ] blog.' + m + ' (не застосовано)', '#facc15'); });
}

row.appendChild(mkBtn('makemigrations', runMakeMigrations));
row.appendChild(mkBtn('migrate', runMigrate));
row.appendChild(mkBtn('showmigrations', runShowMigrations));`,
    [
      { level:'easy',   uk:'Виконай <code>makemigrations</code> двічі, потім <code>showmigrations</code> — переконайся, що обидві міграції позначено як незастосовані.', ru:'Выполни makemigrations дважды, затем showmigrations — убедись, что обе миграции не применены.' },
      { level:'medium', uk:'Виконай <code>migrate</code>, а потім знову <code>showmigrations</code> — переконайся, що всі міграції тепер застосовані.', ru:'Выполни migrate, затем снова showmigrations — убедись, что миграции применены.' },
      { level:'hard',   uk:'У справжньому коді (main.py) опиши командою-коментарем, як виглядав би виклик <code>python manage.py sqlmigrate blog 0001</code> і що він мав би вивести (SQL CREATE TABLE).', ru:'Опиши в main.py, как выглядел бы sqlmigrate blog 0001 и что он должен вывести.' },
    ],
    `# python manage.py makemigrations
# python manage.py migrate
# python manage.py showmigrations
# python manage.py sqlmigrate blog 0001
# python manage.py squashmigrations blog 0001 0015

# Приклад згенерованого файлу міграції:
# blog/migrations/0002_post_tags.py

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(related_name='posts', to='blog.tag'),
        ),
    ]
`
  );

  /* ─── 07-05: Admin панель ─────────────────────────────────────────── */
  patch('07-05',
    { uk:`<h2>Admin панель: ModelAdmin, list_display, list_filter, search_fields</h2>
<p>Django генерує повноцінну адмін-панель для керування даними ЛИШЕ з опису моделей — це одна з найпотужніших "з коробки" фіч фреймворку.</p>
<h3>Базова реєстрація</h3>
<pre># blog/admin.py
from django.contrib import admin
from .models import Post, Author

admin.site.register(Author)</pre>
<h3>Кастомізація через ModelAdmin</h3>
<pre>@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    list_filter = ('author', 'created_at')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-created_at',)</pre>
<h3>Створення суперкористувача</h3>
<pre>python manage.py createsuperuser</pre>
<h3>list_display — які колонки показувати в таблиці</h3>
<h3>list_filter — бокова панель фільтрів справа</h3>
<h3>search_fields — поле пошуку зверху таблиці</h3>
<h3>Inline-редагування звʼязаних обʼєктів</h3>
<pre>class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [CommentInline]   # редагувати коментарі прямо на сторінці поста</pre>`,
      ru:`<h2>Admin панель: ModelAdmin, list_display, list_filter, search_fields</h2>
<p>Django генерирует полноценную админ-панель только из описания моделей.</p>
<h3>Базовая регистрация</h3>
<pre>from django.contrib import admin
from .models import Post, Author

admin.site.register(Author)</pre>
<h3>Кастомизация через ModelAdmin</h3>
<pre>@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    list_filter = ('author', 'created_at')
    search_fields = ('title', 'content')</pre>
<h3>Создание суперпользователя</h3>
<pre>python manage.py createsuperuser</pre>
<h3>Inline-редактирование связанных объектов</h3>
<pre>class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var row = document.createElement('div');
demoRoot.appendChild(row);
var table = document.createElement('div');
table.style.cssText = 'margin-top:10px';
demoRoot.appendChild(table);

function mkBtn(text, onClick) {
  var b = document.createElement('button');
  b.textContent = text;
  b.style.cssText = 'background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;margin:3px 6px 3px 0';
  b.onclick = onClick;
  return b;
}

var allPosts = [
  { title: 'Django для початківців', author: 'Іван', created: '2026-01-10' },
  { title: 'DRF і серіалізатори', author: 'Марія', created: '2026-02-05' },
  { title: 'Розгортання на сервері', author: 'Іван', created: '2026-03-01' }
];

function renderTable(rows) {
  var html = '<table style="width:100%;border-collapse:collapse;font-size:12px;color:#0f172a;background:#fff;border-radius:8px;overflow:hidden">';
  html += '<tr style="background:#e2e8f0"><th style="padding:6px;text-align:left">title</th><th style="padding:6px;text-align:left">author</th><th style="padding:6px;text-align:left">created_at</th></tr>';
  rows.forEach(function (r) {
    html += '<tr><td style="padding:6px;border-top:1px solid #e2e8f0">' + r.title + '</td><td style="padding:6px;border-top:1px solid #e2e8f0">' + r.author + '</td><td style="padding:6px;border-top:1px solid #e2e8f0">' + r.created + '</td></tr>';
  });
  html += '</table>';
  table.innerHTML = html;
}

renderTable(allPosts);

row.appendChild(mkBtn('list_filter: author=Іван', function () {
  renderTable(allPosts.filter(function (p) { return p.author === 'Іван'; }));
}));
row.appendChild(mkBtn('search_fields: "DRF"', function () {
  renderTable(allPosts.filter(function (p) { return p.title.indexOf('DRF') !== -1; }));
}));
row.appendChild(mkBtn('Скинути', function () { renderTable(allPosts); }));`,
    [
      { level:'easy',   uk:'Спробуй фільтр і пошук — це та сама поведінка, яку <code>list_filter</code>/<code>search_fields</code> дають безкоштовно в справжній адмінці.', ru:'Попробуй фильтр и поиск — та же логика, которую list_filter/search_fields дают бесплатно в реальной админке.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай <code>ordering = (\'-created_at\',)</code> у <code>PostAdmin</code>, щоб пости сортувались від найновіших.', ru:'В main.py добавь ordering = (\'-created_at\',) в PostAdmin.' },
      { level:'hard',   uk:'Додай нову кнопку "Сортувати за датою" в симуляції, що сортує <code>allPosts</code> за полем <code>created</code> у зворотньому порядку перед рендером таблиці.', ru:'Добавь кнопку "Сортировать по дате", сортирующую allPosts по created в обратном порядке.' },
    ],
    `from django.contrib import admin
from .models import Post, Author, Comment


admin.site.register(Author)


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    list_filter = ('author', 'created_at')
    search_fields = ('title', 'content')
    ordering = ('-created_at',)
    inlines = [CommentInline]
`
  );

  /* ─── 07-06: Views — FBV та CBV ───────────────────────────────────── */
  patch('07-06',
    { uk:`<h2>Views: функціональні (FBV) та класові (CBV) уявлення</h2>
<h3>Function-Based View (FBV)</h3>
<pre>from django.shortcuts import render, get_object_or_404
from .models import Post

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'blog/post_list.html', {'posts': posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})</pre>
<h3>Class-Based View (CBV) — той самий функціонал стисліше</h3>
<pre>from django.views.generic import ListView, DetailView, CreateView

class PostListView(ListView):
    model = Post
    template_name = 'blog/post_list.html'
    context_object_name = 'posts'
    paginate_by = 10

class PostDetailView(DetailView):
    model = Post

class PostCreateView(CreateView):
    model = Post
    fields = ['title', 'content', 'author']
    success_url = '/posts/'</pre>
<h3>Коли обирати FBV, а коли CBV</h3>
<p>FBV простіші для читання й гнучкіші для нестандартної логіки; CBV коротші для типових CRUD-операцій завдяки готовим базовим класам (<code>ListView</code>, <code>DetailView</code>, <code>UpdateView</code>, <code>DeleteView</code>).</p>`,
      ru:`<h2>Views: функциональные (FBV) и классовые (CBV) представления</h2>
<h3>Function-Based View (FBV)</h3>
<pre>from django.shortcuts import render, get_object_or_404
from .models import Post

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'blog/post_list.html', {'posts': posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})</pre>
<h3>Class-Based View (CBV)</h3>
<pre>from django.views.generic import ListView, DetailView

class PostListView(ListView):
    model = Post
    paginate_by = 10

class PostDetailView(DetailView):
    model = Post</pre>
<h3>Когда выбирать FBV, а когда CBV</h3>
<p>FBV проще для нестандартной логики, CBV короче для типовых CRUD-операций.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var posts = [{ id: 1, title: 'Перший пост' }, { id: 2, title: 'Другий пост' }];
var router = createRouter();
router.path('/posts', ['GET'], function (req) { return posts; });
router.path('/posts/<int:pk>', ['GET'], function (req) {
  var post = posts.find(function (p) { return p.id === Number(req.params.pk); });
  if (!post) return Response({ detail: 'Не знайдено' }, { status: 404 });
  return post;
});

function send(method, path) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = router.resolve(method, path);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /posts (ListView)', function () { send('GET', '/posts'); }));
row.appendChild(mkBtn('GET /posts/1 (DetailView)', function () { send('GET', '/posts/1'); }));
row.appendChild(mkBtn('GET /posts/99 (404)', function () { send('GET', '/posts/99'); }));`,
    [
      { level:'easy',   uk:'Спробуй усі три кнопки й подивись, як <code>ListView</code>-подібний і <code>DetailView</code>-подібний маршрути повертають різні дані.', ru:'Попробуй все три кнопки и посмотри, как ListView-подобный и DetailView-подобный маршруты возвращают разные данные.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши <code>PostCreateView</code> для створення нового поста через форму.', ru:'В main.py допиши PostCreateView для создания нового поста через форму.' },
      { level:'hard',   uk:'Додай у симуляцію новий маршрут <code>DELETE /posts/&lt;int:pk&gt;</code> (аналог <code>DeleteView</code>), що видаляє пост із масиву <code>posts</code>.', ru:'Добавь маршрут DELETE /posts/<int:pk> (аналог DeleteView).' },
    ],
    `from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView, CreateView
from .models import Post


class PostListView(ListView):
    model = Post
    template_name = 'blog/post_list.html'
    context_object_name = 'posts'
    paginate_by = 10


class PostDetailView(DetailView):
    model = Post
    template_name = 'blog/post_detail.html'


class PostCreateView(CreateView):
    model = Post
    fields = ['title', 'content', 'author']
    success_url = '/posts/'


# Еквівалент через FBV:
def post_list(request):
    posts = Post.objects.all()
    return render(request, 'blog/post_list.html', {'posts': posts})


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})
`
  );

  /* ─── 07-07: URL patterns ─────────────────────────────────────────── */
  patch('07-07',
    { uk:`<h2>URL patterns: path(), re_path(), include(), namespace</h2>
<h3>Базові маршрути</h3>
<pre># blog/urls.py
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.PostListView.as_view(), name='list'),
    path('&lt;int:pk&gt;/', views.PostDetailView.as_view(), name='detail'),
    path('create/', views.PostCreateView.as_view(), name='create'),
]</pre>
<h3>Підключення застосунку в головному urls.py через include()</h3>
<pre># myproject/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('posts/', include('blog.urls', namespace='blog')),
    path('api/', include('blog.api_urls')),
]</pre>
<h3>re_path() — коли потрібен точний регулярний вираз</h3>
<pre>from django.urls import re_path

urlpatterns = [
    re_path(r'^archive/(?P&lt;year&gt;[0-9]{4})/$', views.archive, name='archive'),
]</pre>
<h3>Іменовані маршрути й reverse()</h3>
<pre># у шаблоні:
&lt;a href="{% url 'blog:detail' post.pk %}"&gt;{{ post.title }}&lt;/a&gt;

# у Python-коді:
from django.urls import reverse
url = reverse('blog:detail', kwargs={'pk': 1})</pre>
<p>Іменовані маршрути (<code>name='detail'</code>) дозволяють посилатись на URL за назвою, а не хардкодити рядок — якщо шлях зміниться, посилання в шаблонах не зламаються.</p>`,
      ru:`<h2>URL patterns: path(), re_path(), include(), namespace</h2>
<h3>Базовые маршруты</h3>
<pre># blog/urls.py
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.PostListView.as_view(), name='list'),
    path('&lt;int:pk&gt;/', views.PostDetailView.as_view(), name='detail'),
]</pre>
<h3>Подключение приложения через include()</h3>
<pre># myproject/urls.py
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('posts/', include('blog.urls', namespace='blog')),
]</pre>
<h3>re_path() — регулярные выражения</h3>
<pre>from django.urls import re_path

urlpatterns = [
    re_path(r'^archive/(?P&lt;year&gt;[0-9]{4})/$', views.archive),
]</pre>
<h3>Именованные маршруты и reverse()</h3>
<pre>&lt;a href="{% url 'blog:detail' post.pk %}"&gt;{{ post.title }}&lt;/a&gt;</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var posts = [{ id: 1, title: 'Перший пост' }];
var router = createRouter();
router.path('/posts/', ['GET'], function () { return posts; });
router.path('/posts/<int:pk>/', ['GET'], function (req) {
  var post = posts.find(function (p) { return p.id === Number(req.params.pk); });
  return post || Response({ detail: 'Не знайдено' }, { status: 404 });
});
router.path('/api/posts/', ['GET'], function () { return { source: 'api namespace', count: posts.length }; });

function reverse(name, pk) {
  var map = { 'blog:list': '/posts/', 'blog:detail': '/posts/' + pk + '/' };
  return map[name] || '#';
}

function send(method, path) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = router.resolve(method, path);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /posts/', function () { send('GET', '/posts/'); }));
row.appendChild(mkBtn('GET /posts/1/', function () { send('GET', '/posts/1/'); }));
row.appendChild(mkBtn('GET /api/posts/ (namespace)', function () { send('GET', '/api/posts/'); }));
row.appendChild(mkBtn('reverse("blog:detail", pk=1)', function () {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '>>> reverse("blog:detail", kwargs={"pk": 1})', '#68a063');
  logLine(termOut, '"' + reverse('blog:detail', 1) + '"', '#4ade80');
}));`,
    [
      { level:'easy',   uk:'Спробуй усі чотири кнопки — особливо останню, що показує, як <code>reverse()</code> перетворює назву маршруту на реальний URL.', ru:'Попробуй все четыре кнопки — особенно последнюю, показывающую, как reverse() превращает имя маршрута в реальный URL.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай новий маршрут <code>path(\'&lt;int:pk&gt;/edit/\', ..., name=\'edit\')</code> у <code>blog/urls.py</code>.', ru:'В main.py добавь маршрут path(\'<int:pk>/edit/\', ..., name=\'edit\') в blog/urls.py.' },
      { level:'hard',   uk:'Додай у функцію <code>reverse</code> підтримку нового маршруту <code>blog:create</code> → <code>/posts/create/</code>, і кнопку, що це демонструє.', ru:'Добавь в reverse поддержку маршрута blog:create → /posts/create/.' },
    ],
    `# blog/urls.py
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.PostListView.as_view(), name='list'),
    path('<int:pk>/', views.PostDetailView.as_view(), name='detail'),
    path('create/', views.PostCreateView.as_view(), name='create'),
]


# myproject/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('posts/', include('blog.urls', namespace='blog')),
    path('api/', include('blog.api_urls')),
]
`
  );

  /* ─── 07-08: Шаблони Django ───────────────────────────────────────── */
  patch('07-08',
    { uk:`<h2>Шаблони Django: extends, include, теги, фільтри</h2>
<p>Django Template Language (DTL) дуже схожий на Jinja2 (модуль 06-02) — обидва походять зі спільної ідеї, і Jinja2 можна навіть підключити ЗАМІСТЬ стандартного DTL.</p>
<h3>Базовий шаблон</h3>
<pre># base.html
&lt;html&gt;&lt;body&gt;
  {% block content %}{% endblock %}
&lt;/body&gt;&lt;/html&gt;

# post_list.html
{% extends 'base.html' %}
{% block content %}
  {% for post in posts %}
    &lt;h2&gt;{{ post.title }}&lt;/h2&gt;
    &lt;p&gt;{{ post.content|truncatewords:20 }}&lt;/p&gt;
  {% endfor %}
{% endblock %}</pre>
<h3>include() — вставка частини шаблону</h3>
<pre>{% include 'blog/_navbar.html' %}</pre>
<h3>Корисні фільтри</h3>
<pre>{{ post.title|upper }}
{{ post.created_at|date:"d.m.Y" }}
{{ post.content|truncatewords:30 }}
{{ post.tags.all|length }}
{{ value|default:"немає даних" }}</pre>
<h3>Теги для логіки</h3>
<pre>{% if user.is_authenticated %}
  &lt;p&gt;Привіт, {{ user.username }}&lt;/p&gt;
{% else %}
  &lt;a href="{% url 'login' %}"&gt;Увійти&lt;/a&gt;
{% endif %}</pre>`,
      ru:`<h2>Шаблоны Django: extends, include, теги, фильтры</h2>
<p>Django Template Language (DTL) очень похож на Jinja2 (модуль 06-02).</p>
<h3>Базовый шаблон</h3>
<pre>{% extends 'base.html' %}
{% block content %}
  {% for post in posts %}
    &lt;h2&gt;{{ post.title }}&lt;/h2&gt;
  {% endfor %}
{% endblock %}</pre>
<h3>include()</h3>
<pre>{% include 'blog/_navbar.html' %}</pre>
<h3>Полезные фильтры</h3>
<pre>{{ post.title|upper }}
{{ post.created_at|date:"d.m.Y" }}
{{ value|default:"нет данных" }}</pre>
<h3>Теги для логики</h3>
<pre>{% if user.is_authenticated %}
  &lt;p&gt;Привет, {{ user.username }}&lt;/p&gt;
{% else %}
  &lt;a href="{% url 'login' %}"&gt;Войти&lt;/a&gt;
{% endif %}</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var row = document.createElement('div');
demoRoot.appendChild(row);
var preview = document.createElement('pre');
preview.style.cssText = 'background:#fff;color:#0f172a;padding:12px;border-radius:8px;margin-top:8px;font-family:Consolas,monospace;font-size:12px;white-space:pre-wrap';
demoRoot.appendChild(preview);

function mkBtn(text, onClick) {
  var b = document.createElement('button');
  b.textContent = text;
  b.style.cssText = 'background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;margin:3px 6px 3px 0';
  b.onclick = onClick;
  return b;
}

/* Міні-DTL: {{ var }}, {% if %}/{% else %}/{% endif %} */
function renderTemplate(template, ctx) {
  var out = template;
  out = out.replace(/\\{%\\s*if\\s+(\\w+)\\s*%\\}([\\s\\S]*?)\\{%\\s*else\\s*%\\}([\\s\\S]*?)\\{%\\s*endif\\s*%\\}/g, function (m, cond, ifBody, elseBody) {
    return ctx[cond] ? ifBody : elseBody;
  });
  Object.keys(ctx).forEach(function (key) {
    if (typeof ctx[key] === 'string') out = out.split('{{ ' + key + ' }}').join(ctx[key]);
  });
  return out;
}

var template = '{% if is_authenticated %}\\n<p>Привіт, {{ username }}</p>\\n{% else %}\\n<a href="/login">Увійти</a>\\n{% endif %}';

function render(isAuth) {
  preview.textContent = renderTemplate(template, { is_authenticated: isAuth, username: 'Аліна' });
}

row.appendChild(mkBtn('user.is_authenticated = True', function () { render(true); }));
row.appendChild(mkBtn('user.is_authenticated = False', function () { render(false); }));
render(false);`,
    [
      { level:'easy',   uk:'Перемикай стан автентифікації й подивись, як <code>{% if %}/{% else %}</code> змінює вивід шаблону.', ru:'Переключай состояние аутентификации и смотри, как {% if %}/{% else %} меняет вывод шаблона.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши шаблон <code>post_list.html</code>, що використовує фільтр <code>truncatewords:20</code> для змісту поста.', ru:'В main.py допиши шаблон post_list.html с фильтром truncatewords:20.' },
      { level:'hard',   uk:'Розшир <code>renderTemplate</code>, щоб підтримувати фільтр <code>{{ username|upper }}</code> — опиши потрібну зміну в регулярному виразі.', ru:'Расширь renderTemplate для поддержки фильтра {{ username|upper }}.' },
    ],
    `<!-- blog/templates/blog/post_list.html -->
{% extends 'base.html' %}

{% block content %}
  {% include 'blog/_navbar.html' %}

  {% for post in posts %}
    <article>
      <h2>{{ post.title }}</h2>
      <p>{{ post.content|truncatewords:20 }}</p>
      <span>{{ post.created_at|date:"d.m.Y" }}</span>
    </article>
  {% endfor %}

  {% if user.is_authenticated %}
    <p>Привіт, {{ user.username }}</p>
  {% else %}
    <a href="{% url 'login' %}">Увійти</a>
  {% endif %}
{% endblock %}
`
  );

  /* ─── 07-09: Forms + ModelForm ────────────────────────────────────── */
  patch('07-09',
    { uk:`<h2>Форми та ModelForm: clean(), save(), валідація</h2>
<h3>ModelForm — форма, згенерована з моделі</h3>
<pre>from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'author']

    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 5:
            raise forms.ValidationError('Заголовок має бути мінімум 5 символів')
        return title</pre>
<h3>Обробка форми у view</h3>
<pre>def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save()
            return redirect('blog:detail', pk=post.pk)
    else:
        form = PostForm()
    return render(request, 'blog/post_form.html', {'form': form})</pre>
<h3>save(commit=False) — доробити обʼєкт перед збереженням</h3>
<pre>def post_create(request):
    form = PostForm(request.POST)
    if form.is_valid():
        post = form.save(commit=False)
        post.author = request.user   # додаємо поле, якого немає у формі
        post.save()
        form.save_m2m()               # обовʼязково для ManyToMany-полів!</pre>
<h3>Валідація на рівні всієї форми</h3>
<pre>def clean(self):
    cleaned_data = super().clean()
    title = cleaned_data.get('title')
    content = cleaned_data.get('content')
    if title and content and title in content:
        raise forms.ValidationError('Заголовок не повинен повторюватись у тексті')
    return cleaned_data</pre>`,
      ru:`<h2>Формы и ModelForm: clean(), save(), валидация</h2>
<h3>ModelForm</h3>
<pre>from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'author']

    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 5:
            raise forms.ValidationError('Заголовок минимум 5 символов')
        return title</pre>
<h3>Обработка формы в view</h3>
<pre>def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save()
            return redirect('blog:detail', pk=post.pk)
    else:
        form = PostForm()
    return render(request, 'blog/post_form.html', {'form': form})</pre>
<h3>save(commit=False)</h3>
<pre>post = form.save(commit=False)
post.author = request.user
post.save()
form.save_m2m()</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

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

function cleanTitle(title) {
  if (!title || title.length < 5) throw new Error('Заголовок має бути мінімум 5 символів');
  return title;
}

function cleanForm(data) {
  var errors = {};
  try { data.title = cleanTitle(data.title); } catch (e) { errors.title = e.message; }
  if (data.title && data.content && data.content.indexOf(data.title) !== -1) {
    errors.__all__ = 'Заголовок не повинен повторюватись у тексті';
  }
  return errors;
}

function submitForm(data) {
  logLine('', '');
  logLine('>>> form = PostForm(' + JSON.stringify(data) + ')', '#68a063');
  var errors = cleanForm(data);
  if (Object.keys(errors).length) {
    logLine('form.is_valid() -> False: ' + JSON.stringify(errors), '#f87171');
  } else {
    logLine('form.is_valid() -> True', '#4ade80');
    logLine('post = form.save() -> Post(title="' + data.title + '")', '#4ade80');
  }
}

row.appendChild(mkBtn('Валідна форма', function () { submitForm({ title: 'Django Форми', content: 'Опис уроку про форми' }); }));
row.appendChild(mkBtn('Закороткий заголовок', function () { submitForm({ title: 'Django', content: 'текст' }); }));
row.appendChild(mkBtn('Заголовок повторюється в тексті', function () { submitForm({ title: 'Django Форми', content: 'У цьому тексті є Django Форми знову' }); }));`,
    [
      { level:'easy',   uk:'Спробуй усі три кнопки й подивись, як <code>clean_title</code> і <code>clean</code> (валідація всієї форми) працюють РАЗОМ.', ru:'Попробуй все три кнопки и посмотри, как clean_title и clean работают вместе.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай метод <code>clean_content</code>, що вимагає МІНІМУМ 20 символів у полі <code>content</code>.', ru:'В main.py добавь метод clean_content, требующий минимум 20 символов в content.' },
      { level:'hard',   uk:'Додай у <code>cleanForm</code> нову перевірку: <code>content</code> обовʼязкове поле (не може бути порожнім) — онови й повідомлення про помилку.', ru:'Добавь в cleanForm проверку, что content обязателен.' },
    ],
    `from django import forms
from .models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'author']

    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 5:
            raise forms.ValidationError('Заголовок має бути мінімум 5 символів')
        return title

    def clean(self):
        cleaned_data = super().clean()
        title = cleaned_data.get('title')
        content = cleaned_data.get('content')
        if title and content and title in content:
            raise forms.ValidationError('Заголовок не повинен повторюватись у тексті')
        return cleaned_data
`
  );

  /* ─── 07-10: Автентифікація ───────────────────────────────────────── */
  patch('07-10',
    { uk:`<h2>Автентифікація: AbstractUser, login/logout, permissions</h2>
<h3>Розширення стандартної моделі User</h3>
<pre># users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)</pre>
<pre># settings.py
AUTH_USER_MODEL = 'users.CustomUser'   # ОБОВʼЯЗКОВО задати ДО першої міграції!</pre>
<h3>Логін і логаут</h3>
<pre>from django.contrib.auth import authenticate, login, logout

def login_view(request):
    if request.method == 'POST':
        user = authenticate(
            request,
            username=request.POST['username'],
            password=request.POST['password']
        )
        if user is not None:
            login(request, user)
            return redirect('home')
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('home')</pre>
<h3>Захист view декоратором</h3>
<pre>from django.contrib.auth.decorators import login_required, permission_required

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')

@permission_required('blog.add_post')
def post_create(request):
    ...</pre>
<h3>Перевірка прав у шаблоні</h3>
<pre>{% if perms.blog.delete_post %}
  &lt;button&gt;Видалити&lt;/button&gt;
{% endif %}</pre>`,
      ru:`<h2>Аутентификация: AbstractUser, login/logout, permissions</h2>
<h3>Расширение стандартной модели User</h3>
<pre>from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True)</pre>
<pre># settings.py
AUTH_USER_MODEL = 'users.CustomUser'</pre>
<h3>Логин и логаут</h3>
<pre>from django.contrib.auth import authenticate, login, logout

def login_view(request):
    if request.method == 'POST':
        user = authenticate(request, username=..., password=...)
        if user is not None:
            login(request, user)
            return redirect('home')
    return render(request, 'login.html')</pre>
<h3>Защита view декоратором</h3>
<pre>@login_required
def dashboard(request):
    return render(request, 'dashboard.html')</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var users = [{ username: 'alina', password: 'secret123', permissions: ['blog.add_post'] }];
var session = { user: null };

var router = createRouter();
router.path('/login', ['POST'], function (req) {
  var user = users.find(function (u) { return u.username === req.data.username; });
  if (!user || user.password !== req.data.password) return Response({ detail: 'Невірні дані' }, { status: 401 });
  session.user = user;
  return { message: 'Вхід виконано' };
});
router.path('/dashboard', ['GET'], function () {
  if (!session.user) return Response({ detail: 'login_required' }, { status: 401 });
  return { message: 'Привіт, ' + session.user.username };
});
router.path('/posts/create', ['POST'], function () {
  if (!session.user) return Response({ detail: 'login_required' }, { status: 401 });
  if (session.user.permissions.indexOf('blog.add_post') === -1) return Response({ detail: 'permission_required: blog.add_post' }, { status: 403 });
  return Response({ message: 'Пост створено' }, { status: 201 });
});

function send(method, path, body) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = router.resolve(method, path, body);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /dashboard (без входу)', function () { send('GET', '/dashboard'); }));
row.appendChild(mkBtn('POST /login', function () { send('POST', '/login', { username: 'alina', password: 'secret123' }); }));
row.appendChild(mkBtn('GET /dashboard (з сесією)', function () { send('GET', '/dashboard'); }));
row.appendChild(mkBtn('POST /posts/create (permission)', function () { send('POST', '/posts/create'); }));`,
    [
      { level:'easy',   uk:'Спробуй зайти на <code>/dashboard</code> до й після <code>/login</code> — переконайся, що <code>@login_required</code> реально блокує доступ.', ru:'Попробуй зайти на /dashboard до и после /login — убедись, что @login_required блокирует доступ.' },
      { level:'medium', uk:'Виконай <code>/posts/create</code> ПІСЛЯ логіну — переконайся, що <code>permission_required(\'blog.add_post\')</code> пропускає, оскільки в користувача є цей дозвіл.', ru:'Выполни /posts/create после логина — убедись, что permission_required пропускает.' },
      { level:'hard',   uk:'Додай другого користувача БЕЗ дозволу <code>blog.add_post</code>, кнопку логіну під ним, і переконайся, що спроба створити пост повертає 403.', ru:'Добавь второго пользователя без разрешения blog.add_post и убедись, что попытка создать пост даёт 403.' },
    ],
    `# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    bio = models.TextField(blank=True)


# settings.py
AUTH_USER_MODEL = 'users.CustomUser'


# views.py
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.shortcuts import render, redirect


def login_view(request):
    if request.method == 'POST':
        user = authenticate(
            request,
            username=request.POST['username'],
            password=request.POST['password']
        )
        if user is not None:
            login(request, user)
            return redirect('dashboard')
    return render(request, 'login.html')


@login_required
def dashboard(request):
    return render(request, 'dashboard.html')


@permission_required('blog.add_post')
def post_create(request):
    ...
`
  );

  /* ─── 07-11: DRF Serializer + ModelSerializer ─────────────────────── */
  patch('07-11',
    { uk:`<h2>DRF: Serializer та ModelSerializer</h2>
<p>Django REST Framework (DRF) — офіційна бібліотека для побудови REST API на Django. Serializer перетворює Python-обʼєкти (моделі) у JSON і навпаки — та сама роль, що й <code>jsonify</code>/Zod у попередніх модулях, але глибше інтегрована з ORM.</p>
<h3>Встановлення</h3>
<pre>pip install djangorestframework
# settings.py: INSTALLED_APPS += ['rest_framework']</pre>
<h3>ModelSerializer — автогенерація полів із моделі</h3>
<pre>from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at']
        read_only_fields = ['id', 'created_at']</pre>
<h3>Кастомна валідація</h3>
<pre>class PostSerializer(serializers.ModelSerializer):
    def validate_title(self, value):
        if len(value) < 5:
            raise serializers.ValidationError('Мінімум 5 символів')
        return value

    def validate(self, data):
        if data['title'] in data.get('content', ''):
            raise serializers.ValidationError('Заголовок не повинен повторюватись у тексті')
        return data</pre>
<h3>Використання в APIView</h3>
<pre>from rest_framework.views import APIView
from rest_framework.response import Response

class PostListAPIView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)</pre>`,
      ru:`<h2>DRF: Serializer и ModelSerializer</h2>
<p>Django REST Framework (DRF) — библиотека для REST API на Django. Serializer превращает Python-объекты в JSON и обратно.</p>
<h3>Установка</h3>
<pre>pip install djangorestframework</pre>
<h3>ModelSerializer</h3>
<pre>from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at']
        read_only_fields = ['id', 'created_at']</pre>
<h3>Кастомная валидация</h3>
<pre>def validate_title(self, value):
    if len(value) < 5:
        raise serializers.ValidationError('Минимум 5 символов')
    return value</pre>
<h3>Использование в APIView</h3>
<pre>class PostListAPIView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var posts = [{ id: 1, title: 'Перший пост', content: 'Зміст першого поста' }];

function serialize(post) {
  return { id: post.id, title: post.title, content: post.content };
}

function validateData(data) {
  var errors = {};
  if (!data.title || data.title.length < 5) errors.title = 'Мінімум 5 символів';
  if (data.title && data.content && data.content.indexOf(data.title) !== -1) errors.non_field_errors = ['Заголовок не повинен повторюватись у тексті'];
  return errors;
}

var router = createRouter();
router.path('/api/posts', ['GET'], function () { return posts.map(serialize); });
router.path('/api/posts', ['POST'], function (req) {
  var errors = validateData(req.data);
  if (Object.keys(errors).length) return Response(errors, { status: 400 });
  var post = { id: posts.length + 1, title: req.data.title, content: req.data.content };
  posts.push(post);
  return Response(serialize(post), { status: 201 });
});

function send(method, path, body) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path + (body ? ' ' + JSON.stringify(body) : ''), '#68a063');
  var res = router.resolve(method, path, body);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /api/posts', function () { send('GET', '/api/posts'); }));
row.appendChild(mkBtn('POST валідний', function () { send('POST', '/api/posts', { title: 'Другий пост', content: 'Ще один текст' }); }));
row.appendChild(mkBtn('POST невалідний (короткий title)', function () { send('POST', '/api/posts', { title: 'Пост', content: 'текст' }); }));`,
    [
      { level:'easy',   uk:'Спробуй усі три кнопки й подивись, як <code>serializer.is_valid()</code> (симуляція через <code>validateData</code>) блокує некоректні дані.', ru:'Попробуй все три кнопки и посмотри, как serializer.is_valid() блокирует некорректные данные.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай поле <code>author</code> у <code>PostSerializer</code> і познач його <code>read_only_fields</code>.', ru:'В main.py добавь поле author в PostSerializer и отметь его read_only_fields.' },
      { level:'hard',   uk:'Додай у <code>validateData</code> нову перевірку заголовку на дублікат серед уже існуючих постів (<code>posts</code>) — заголовок не може повторюватись.', ru:'Добавь в validateData проверку заголовка на дубликат среди существующих постов.' },
    ],
    `from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_title(self, value):
        if len(value) < 5:
            raise serializers.ValidationError('Мінімум 5 символів')
        return value

    def validate(self, data):
        if data['title'] in data.get('content', ''):
            raise serializers.ValidationError('Заголовок не повинен повторюватись у тексті')
        return data


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer


class PostListAPIView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        return Response(PostSerializer(posts, many=True).data)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
`
  );

  /* ─── 07-12: DRF ViewSet + Router ─────────────────────────────────── */
  patch('07-12',
    { uk:`<h2>DRF: ViewSet, Router, ModelViewSet</h2>
<p>ViewSet групує ВСІ CRUD-дії (list, retrieve, create, update, destroy) в один клас, а Router автоматично генерує для них URL — це різко скорочує кількість шаблонного коду порівняно з окремими <code>APIView</code> на кожну дію.</p>
<h3>ModelViewSet — усі CRUD-дії одразу</h3>
<pre>from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer</pre>
<h3>Реєстрація через Router</h3>
<pre># urls.py
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

router = DefaultRouter()
router.register('posts', PostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
# Автоматично створює:
# GET    /api/posts/       -> list
# POST   /api/posts/       -> create
# GET    /api/posts/{id}/  -> retrieve
# PUT    /api/posts/{id}/  -> update
# DELETE /api/posts/{id}/  -> destroy</pre>
<h3>Кастомна дія через @action</h3>
<pre>from rest_framework.decorators import action
from rest_framework.response import Response

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        post = self.get_object()
        post.is_published = True
        post.save()
        return Response({'status': 'published'})
    # Доступно за адресою POST /api/posts/{id}/publish/</pre>`,
      ru:`<h2>DRF: ViewSet, Router, ModelViewSet</h2>
<p>ViewSet группирует все CRUD-действия в один класс, а Router автоматически генерирует для них URL.</p>
<h3>ModelViewSet</h3>
<pre>from rest_framework import viewsets

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer</pre>
<h3>Регистрация через Router</h3>
<pre>from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('posts', PostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]</pre>
<h3>Кастомное действие через @action</h3>
<pre>@action(detail=True, methods=['post'])
def publish(self, request, pk=None):
    post = self.get_object()
    post.is_published = True
    post.save()
    return Response({'status': 'published'})</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var posts = [{ id: 1, title: 'Перший пост', is_published: false }];

var router = createRouter();
router.path('/api/posts/', ['GET'], function () { return posts; });
router.path('/api/posts/', ['POST'], function (req) {
  var post = { id: posts.length + 1, title: req.data.title, is_published: false };
  posts.push(post);
  return Response(post, { status: 201 });
});
router.path('/api/posts/<int:pk>/', ['GET'], function (req) {
  var post = posts.find(function (p) { return p.id === Number(req.params.pk); });
  return post || Response({ detail: 'Не знайдено' }, { status: 404 });
});
router.path('/api/posts/<int:pk>/', ['DELETE'], function (req) {
  posts = posts.filter(function (p) { return p.id !== Number(req.params.pk); });
  return Response(null, { status: 204 });
});
router.path('/api/posts/<int:pk>/publish/', ['POST'], function (req) {
  var post = posts.find(function (p) { return p.id === Number(req.params.pk); });
  if (!post) return Response({ detail: 'Не знайдено' }, { status: 404 });
  post.is_published = true;
  return { status: 'published' };
});

function send(method, path, body) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = router.resolve(method, path, body);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /api/posts/ (list)', function () { send('GET', '/api/posts/'); }));
row.appendChild(mkBtn('POST /api/posts/ (create)', function () { send('POST', '/api/posts/', { title: 'Новий пост' }); }));
row.appendChild(mkBtn('POST /api/posts/1/publish/ (@action)', function () { send('POST', '/api/posts/1/publish/'); }));
row.appendChild(mkBtn('DELETE /api/posts/1/ (destroy)', function () { send('DELETE', '/api/posts/1/'); }));`,
    [
      { level:'easy',   uk:'Спробуй усі чотири кнопки й переконайся, що ОДИН <code>PostViewSet</code> обробляє всі ці дії (list, create, кастомна дія, destroy).', ru:'Попробуй все четыре кнопки и убедись, что один PostViewSet обрабатывает все эти действия.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нову кастомну дію <code>@action(detail=True, methods=[\'post\'])</code> з назвою <code>unpublish</code>.', ru:'В main.py добавь кастомное действие unpublish.' },
      { level:'hard',   uk:'Додай у симуляцію маршрут <code>PUT /api/posts/&lt;int:pk&gt;/</code> (аналог <code>update</code>), що оновлює <code>title</code> існуючого поста.', ru:'Добавь маршрут PUT /api/posts/<int:pk>/ (аналог update).' },
    ],
    `from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        post = self.get_object()
        post.is_published = True
        post.save()
        return Response({'status': 'published'})

    @action(detail=True, methods=['post'])
    def unpublish(self, request, pk=None):
        post = self.get_object()
        post.is_published = False
        post.save()
        return Response({'status': 'unpublished'})


# urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PostViewSet

router = DefaultRouter()
router.register('posts', PostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
`
  );

  /* ─── 07-13: DRF permissions, throttling, filtering, pagination ──── */
  patch('07-13',
    { uk:`<h2>DRF: permissions, throttling, filtering, pagination</h2>
<h3>Permissions — хто має доступ</h3>
<pre>from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]</pre>
<h3>Throttling — обмеження частоти запитів</h3>
<pre># settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': ['rest_framework.throttling.UserRateThrottle'],
    'DEFAULT_THROTTLE_RATES': {'user': '100/hour', 'anon': '20/hour'}
}</pre>
<h3>Filtering — фільтрація за query-параметрами</h3>
<pre>pip install django-filter

class PostViewSet(viewsets.ModelViewSet):
    filterset_fields = ['author', 'is_published']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'title']
# GET /api/posts/?author=1&ordering=-created_at</pre>
<h3>Pagination — розбиття на сторінки</h3>
<pre># settings.py
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}
# GET /api/posts/?page=2</pre>`,
      ru:`<h2>DRF: permissions, throttling, filtering, pagination</h2>
<h3>Permissions</h3>
<pre>from rest_framework.permissions import IsAuthenticated, AllowAny

class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]</pre>
<h3>Throttling</h3>
<pre>REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_RATES': {'user': '100/hour', 'anon': '20/hour'}
}</pre>
<h3>Filtering</h3>
<pre>class PostViewSet(viewsets.ModelViewSet):
    filterset_fields = ['author', 'is_published']
    search_fields = ['title', 'content']</pre>
<h3>Pagination</h3>
<pre>REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var allPosts = [];
for (var i = 1; i <= 25; i++) allPosts.push({ id: i, title: 'Пост #' + i, is_published: i % 2 === 0 });

var requestCounts = {};
var THROTTLE_LIMIT = 5;

function paginate(items, page, pageSize) {
  var start = (page - 1) * pageSize;
  return { count: items.length, page: page, results: items.slice(start, start + pageSize) };
}

var router = createRouter();
router.path('/api/posts/', ['GET'], function (req) {
  var ip = 'anon';
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;
  if (requestCounts[ip] > THROTTLE_LIMIT) return Response({ detail: 'Request was throttled.' }, { status: 429 });

  var items = allPosts;
  if (req.query.is_published !== undefined) {
    var want = req.query.is_published === 'true';
    items = items.filter(function (p) { return p.is_published === want; });
  }
  var page = Number(req.query.page) || 1;
  return paginate(items, page, 10);
});

function send(query) {
  var path = '/api/posts/' + (query ? '?' + query : '');
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ GET ' + path, '#68a063');
  var res = router.resolve('GET', path);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET (page 1)', function () { send('page=1'); }));
row.appendChild(mkBtn('GET (page 2)', function () { send('page=2'); }));
row.appendChild(mkBtn('GET ?is_published=true', function () { send('is_published=true'); }));
row.appendChild(mkBtn('Симулювати 429 (6 запитів)', function () {
  requestCounts.anon = THROTTLE_LIMIT;
  send('page=1');
}));`,
    [
      { level:'easy',   uk:'Спробуй сторінкування (page=1, page=2) і фільтрацію за <code>is_published</code> — це реальна логіка <code>PageNumberPagination</code> й <code>filterset_fields</code>.', ru:'Попробуй пагинацию и фильтрацию по is_published — это реальная логика PageNumberPagination и filterset_fields.' },
      { level:'medium', uk:'Натисни кнопку "Симулювати 429" і подивись, як спрацьовує обмеження частоти запитів (throttling).', ru:'Нажми кнопку "Симулировать 429" и посмотри, как срабатывает ограничение частоты запросов.' },
      { level:'hard',   uk:'Додай у симуляцію підтримку <code>?ordering=-title</code> — сортування результатів за назвою у зворотньому алфавітному порядку.', ru:'Добавь поддержку ?ordering=-title — сортировку результатов по названию в обратном порядке.' },
    ],
    `from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['author', 'is_published']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'title']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]


# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': ['rest_framework.throttling.AnonRateThrottle'],
    'DEFAULT_THROTTLE_RATES': {'anon': '20/hour', 'user': '100/hour'},
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}
`
  );

  /* ─── 07-14: DRF JWT via simplejwt ────────────────────────────────── */
  patch('07-14',
    { uk:`<h2>DRF JWT: авторизація через django-rest-framework-simplejwt</h2>
<h3>Встановлення й налаштування</h3>
<pre>pip install djangorestframework-simplejwt

# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}</pre>
<h3>Готові маршрути для отримання/оновлення токенів</h3>
<pre># urls.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]</pre>
<h3>Запит токена</h3>
<pre>POST /api/token/
{"username": "alina", "password": "secret123"}

# Відповідь:
{"access": "eyJ...", "refresh": "eyJ..."}</pre>
<h3>Захищений запит із токеном</h3>
<pre>GET /api/posts/
Authorization: Bearer eyJ...</pre>
<h3>Захист view</h3>
<pre>from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'username': request.user.username})</pre>`,
      ru:`<h2>DRF JWT: авторизация через django-rest-framework-simplejwt</h2>
<h3>Установка и настройка</h3>
<pre>pip install djangorestframework-simplejwt

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}</pre>
<h3>Готовые маршруты</h3>
<pre>from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
]</pre>
<h3>Запрос токена</h3>
<pre>POST /api/token/
{"username": "alina", "password": "secret123"}</pre>
<h3>Защищённый запрос</h3>
<pre>GET /api/posts/
Authorization: Bearer eyJ...</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

function fakeJwt(kind) { return btoa(kind + ':' + Date.now()).slice(0, 24); }

var validUser = { username: 'alina', password: 'secret123' };
var currentAccess = null, currentRefresh = null;

var router = createRouter();
router.path('/api/token/', ['POST'], function (req) {
  if (req.data.username !== validUser.username || req.data.password !== validUser.password) {
    return Response({ detail: 'No active account found with the given credentials' }, { status: 401 });
  }
  currentAccess = fakeJwt('access');
  currentRefresh = fakeJwt('refresh');
  return { access: currentAccess, refresh: currentRefresh };
});
router.path('/api/token/refresh/', ['POST'], function (req) {
  if (req.data.refresh !== currentRefresh || !currentRefresh) return Response({ detail: 'Token is invalid' }, { status: 401 });
  currentAccess = fakeJwt('access');
  return { access: currentAccess };
});
router.path('/api/profile/', ['GET'], function (req) {
  if (req.headers.auth !== 'Bearer ' + currentAccess || !currentAccess) return Response({ detail: 'Authentication credentials were not provided.' }, { status: 401 });
  return { username: validUser.username };
});

function send(method, path, body, useAuth) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = router.resolve(method, path, body, { auth: useAuth ? 'Bearer ' + currentAccess : undefined });
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('POST /api/token/', function () { send('POST', '/api/token/', { username: 'alina', password: 'secret123' }); }));
row.appendChild(mkBtn('GET /api/profile/ (з токеном)', function () { send('GET', '/api/profile/', {}, true); }));
row.appendChild(mkBtn('GET /api/profile/ (без токена)', function () { send('GET', '/api/profile/', {}, false); }));
row.appendChild(mkBtn('POST /api/token/refresh/', function () { send('POST', '/api/token/refresh/', { refresh: currentRefresh }); }));`,
    [
      { level:'easy',   uk:'Спочатку отримай токен, потім спробуй <code>/api/profile/</code> з ним і без нього — порівняй результати.', ru:'Сначала получи токен, затем попробуй /api/profile/ с ним и без него — сравни результаты.' },
      { level:'medium', uk:'Виконай <code>/api/token/refresh/</code> і подивись, що видається новий access token.', ru:'Выполни /api/token/refresh/ и посмотри, что выдаётся новый access token.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши, як налаштувати <code>ACCESS_TOKEN_LIFETIME</code> й <code>REFRESH_TOKEN_LIFETIME</code> через <code>SIMPLE_JWT</code> у settings.py.', ru:'В main.py допиши, как настроить ACCESS_TOKEN_LIFETIME и REFRESH_TOKEN_LIFETIME через SIMPLE_JWT.' },
    ],
    `# settings.py
from datetime import timedelta

INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework_simplejwt',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}


# urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


# views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'username': request.user.username})
`
  );

  /* ─── 07-15: Django Channels — WebSockets ─────────────────────────── */
  patch('07-15',
    { uk:`<h2>Django Channels: WebSockets у реальному часі</h2>
<p>Звичайний Django обробляє лише HTTP-запити (запит → відповідь → зʼєднання закрито). Channels додає підтримку WebSocket — довготривалого двостороннього зʼєднання, потрібного для чатів, сповіщень у реальному часі, live-оновлень.</p>
<h3>Встановлення</h3>
<pre>pip install channels channels-redis</pre>
<h3>Consumer — аналог view, але для WebSocket</h3>
<pre># chat/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'chat_message', 'message': data['message']}
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({'message': event['message']}))</pre>
<h3>Маршрутизація WebSocket</h3>
<pre># chat/routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P&lt;room_name&gt;\\w+)/$', consumers.ChatConsumer.as_asgi()),
]</pre>`,
      ru:`<h2>Django Channels: WebSockets в реальном времени</h2>
<p>Обычный Django обрабатывает только HTTP. Channels добавляет поддержку WebSocket для чатов и live-обновлений.</p>
<h3>Установка</h3>
<pre>pip install channels channels-redis</pre>
<h3>Consumer</h3>
<pre>from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'chat_message', 'message': data['message']}
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({'message': event['message']}))</pre>
<h3>Маршрутизация WebSocket</h3>
<pre>websocket_urlpatterns = [
    re_path(r'ws/chat/(?P&lt;room_name&gt;\\w+)/$', consumers.ChatConsumer.as_asgi()),
]</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var row = document.createElement('div');
demoRoot.appendChild(row);
var chatLog = document.createElement('div');
chatLog.style.cssText = 'background:#fff;color:#0f172a;padding:10px;border-radius:8px;margin-top:8px;font-family:Consolas,monospace;font-size:12px;min-height:60px';
demoRoot.appendChild(chatLog);

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

/* Симуляція групи каналів: кожен "consumer" (вкладка) підписаний на групу kімнати */
var connectedConsumers = [];

function connect(username) {
  connectedConsumers.push(username);
  logLine('', '');
  logLine('[WS] ' + username + ' connect() -> group_add("chat_general", channel)', '#68a063');
  logLine('[WS] ' + username + ': accept()', '#4ade80');
}

function sendMessage(username, message) {
  if (connectedConsumers.indexOf(username) === -1) {
    logLine('[WS] ' + username + ' не підключений — спочатку connect()', '#f87171');
    return;
  }
  logLine('', '');
  logLine('[WS] ' + username + ' receive(): group_send("chat_general", {message: "' + message + '"})', '#68a063');
  connectedConsumers.forEach(function (user) {
    logLine('[WS] ' + user + ' <- chat_message: "' + message + '"', '#4ade80');
  });
  var p = document.createElement('div');
  p.textContent = username + ': ' + message;
  chatLog.appendChild(p);
}

row.appendChild(mkBtn('connect(alina)', function () { connect('alina'); }));
row.appendChild(mkBtn('connect(marko)', function () { connect('marko'); }));
row.appendChild(mkBtn('alina: "Привіт усім!"', function () { sendMessage('alina', 'Привіт усім!'); }));
row.appendChild(mkBtn('marko: "Привіт, Аліно!"', function () { sendMessage('marko', 'Привіт, Аліно!'); }));`,
    [
      { level:'easy',   uk:'Підключи ОБОХ користувачів, потім надішли повідомлення від кожного — переконайся, що ОБИДВА отримують кожне повідомлення (group_send розсилає всім у групі).', ru:'Подключи обоих пользователей, затем отправь сообщение от каждого — убедись, что оба получают каждое сообщение.' },
      { level:'medium', uk:'Спробуй надіслати повідомлення від імені користувача, який ще НЕ підключився — переконайся, що симуляція коректно про це повідомляє.', ru:'Попробуй отправить сообщение от имени неподключённого пользователя — убедись, что симуляция сообщает об этом.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши метод <code>disconnect</code>, що видаляє користувача з групи через <code>group_discard</code>.', ru:'В main.py допиши метод disconnect, удаляющий пользователя из группы через group_discard.' },
    ],
    `# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'chat_general'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'chat_message', 'message': data['message']}
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({'message': event['message']}))


# chat/routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/general/$', consumers.ChatConsumer.as_asgi()),
]
`
  );

  /* ─── 07-16: Celery з Django ──────────────────────────────────────── */
  patch('07-16',
    { uk:`<h2>Celery з Django: фонові задачі та планування</h2>
<p>Той самий принцип, що й у Flask (06-10), тепер інтегрований із Django через <code>celery.py</code> у корені проекту.</p>
<h3>Налаштування</h3>
<pre># myproject/celery.py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()</pre>
<h3>Задача в застосунку</h3>
<pre># blog/tasks.py
from celery import shared_task
from .models import Post

@shared_task
def notify_subscribers(post_id):
    post = Post.objects.get(id=post_id)
    # ... надсилання email усім підписникам
    return f'Сповіщено про {post.title}'</pre>
<h3>Виклик задачі з view</h3>
<pre>def post_create(request):
    form = PostForm(request.POST)
    if form.is_valid():
        post = form.save()
        notify_subscribers.delay(post.id)
        return redirect('blog:detail', pk=post.pk)</pre>
<h3>Планування через Celery Beat</h3>
<pre># settings.py
CELERY_BEAT_SCHEDULE = {
    'cleanup-old-drafts': {
        'task': 'blog.tasks.cleanup_old_drafts',
        'schedule': 3600.0,   # раз на годину
    },
}</pre>`,
      ru:`<h2>Celery с Django: фоновые задачи и планирование</h2>
<p>Тот же принцип, что и во Flask (06-10), теперь интегрирован с Django через celery.py.</p>
<h3>Настройка</h3>
<pre># myproject/celery.py
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()</pre>
<h3>Задача в приложении</h3>
<pre># blog/tasks.py
from celery import shared_task

@shared_task
def notify_subscribers(post_id):
    post = Post.objects.get(id=post_id)
    return f'Уведомлено о {post.title}'</pre>
<h3>Планирование через Celery Beat</h3>
<pre>CELERY_BEAT_SCHEDULE = {
    'cleanup-old-drafts': {
        'task': 'blog.tasks.cleanup_old_drafts',
        'schedule': 3600.0,
    },
}</pre>` },
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

var taskCounter = 0;

function createPost(title) {
  taskCounter++;
  var taskId = 'task-' + taskCounter;
  logLine('', '');
  logLine('POST /posts/create/ title="' + title + '"', '#68a063');
  logLine('post = form.save() -> Post(id=' + taskCounter + ')', '#4ade80');
  logLine('notify_subscribers.delay(' + taskCounter + ') -> ' + taskId + ' queued', '#64748b');
  setTimeout(function () {
    logLine('[celery worker] ' + taskId + ': notify_subscribers виконується...', '#facc15');
  }, 500);
  setTimeout(function () {
    logLine('[celery worker] ' + taskId + ' завершена: Сповіщено про "' + title + '"', '#4ade80');
  }, 1500);
}

function runBeatTick() {
  logLine('', '');
  logLine('[celery beat] тік розкладу: cleanup-old-drafts (кожні 3600с)', '#c4b5fd');
  logLine('[celery worker] cleanup_old_drafts виконано, видалено 0 чернеток', '#4ade80');
}

row.appendChild(mkBtn('Створити пост "Нове оновлення"', function () { createPost('Нове оновлення'); }));
row.appendChild(mkBtn('Симулювати тік Celery Beat', runBeatTick));`,
    [
      { level:'easy',   uk:'Створи пост і подивись, як відповідь <code>view</code> надходить одразу, а <code>notify_subscribers</code> виконується у фоні із затримкою.', ru:'Создай пост и посмотри, как ответ view приходит сразу, а notify_subscribers выполняется в фоне с задержкой.' },
      { level:'medium', uk:'Натисни "Симулювати тік Celery Beat" кілька разів — це показує, як періодична задача виконується за розкладом незалежно від запитів користувачів.', ru:'Нажми "Симулировать тик Celery Beat" несколько раз — периодическая задача выполняется независимо от запросов.' },
      { level:'hard',   uk:'У справжньому коді (main.py) додай нову задачу <code>cleanup_old_drafts</code> і зареєструй її в <code>CELERY_BEAT_SCHEDULE</code> з розкладом раз на добу (86400 секунд).', ru:'В main.py добавь задачу cleanup_old_drafts и зарегистрируй её в CELERY_BEAT_SCHEDULE раз в сутки.' },
    ],
    `# myproject/celery.py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


# blog/tasks.py
from celery import shared_task
from .models import Post


@shared_task
def notify_subscribers(post_id):
    post = Post.objects.get(id=post_id)
    return f'Сповіщено про {post.title}'


@shared_task
def cleanup_old_drafts():
    Post.objects.filter(is_published=False).delete()
    return 'Чернетки очищено'


# settings.py
CELERY_BEAT_SCHEDULE = {
    'cleanup-old-drafts': {
        'task': 'blog.tasks.cleanup_old_drafts',
        'schedule': 86400.0,
    },
}
`
  );

  /* ─── 07-17: Тестування Django ────────────────────────────────────── */
  patch('07-17',
    { uk:`<h2>Тестування Django: pytest-django та factory-boy</h2>
<h3>Налаштування</h3>
<pre>pip install pytest-django factory-boy

# pytest.ini
[pytest]
DJANGO_SETTINGS_MODULE = myproject.settings
python_files = tests.py test_*.py</pre>
<h3>factory-boy — генерація тестових даних</h3>
<pre># blog/factories.py
import factory
from .models import Post, Author

class AuthorFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Author
    name = factory.Faker('name')

class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post
    title = factory.Faker('sentence')
    author = factory.SubFactory(AuthorFactory)</pre>
<h3>Тести з pytest.mark.django_db</h3>
<pre>import pytest
from .factories import PostFactory

@pytest.mark.django_db
def test_post_creation():
    post = PostFactory(title='Тестовий пост')
    assert post.title == 'Тестовий пост'
    assert post.author is not None

@pytest.mark.django_db
def test_post_list_api(client):
    PostFactory.create_batch(3)
    response = client.get('/api/posts/')
    assert response.status_code == 200
    assert len(response.json()) == 3</pre>
<h3>Запуск тестів</h3>
<pre>pytest -v
pytest --cov=blog --cov-report=html</pre>`,
      ru:`<h2>Тестирование Django: pytest-django и factory-boy</h2>
<h3>Настройка</h3>
<pre>pip install pytest-django factory-boy

[pytest]
DJANGO_SETTINGS_MODULE = myproject.settings</pre>
<h3>factory-boy</h3>
<pre>import factory
from .models import Post, Author

class AuthorFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Author
    name = factory.Faker('name')

class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post
    title = factory.Faker('sentence')
    author = factory.SubFactory(AuthorFactory)</pre>
<h3>Тесты с pytest.mark.django_db</h3>
<pre>import pytest
from .factories import PostFactory

@pytest.mark.django_db
def test_post_creation():
    post = PostFactory(title='Тестовый пост')
    assert post.title == 'Тестовый пост'</pre>
<h3>Запуск тестов</h3>
<pre>pytest -v</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var posts = [];
var idCounter = 0;

function PostFactory(overrides) {
  idCounter++;
  return Object.assign({ id: idCounter, title: 'Тестовий пост #' + idCounter, author: 'Автор ' + idCounter }, overrides || {});
}

var router = createRouter();
router.path('/api/posts/', ['GET'], function () { return posts; });

var passed = 0, failed = 0;
function assertEqual(actual, expected, label) {
  var ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { passed++; logLine(termOut, '  ✓ ' + label, '#4ade80'); }
  else { failed++; logLine(termOut, '  ✕ ' + label + ' (очікували ' + JSON.stringify(expected) + ', отримали ' + JSON.stringify(actual) + ')', '#f87171'); }
}

function runTests() {
  posts = []; idCounter = 0; passed = 0; failed = 0;
  logLine(termOut, '', '');
  logLine(termOut, '$ pytest -v', '#68a063');

  logLine(termOut, 'test_post_creation:', '#64748b');
  var post = PostFactory({ title: 'Тестовий пост' });
  assertEqual(post.title, 'Тестовий пост', 'post.title == "Тестовий пост"');

  logLine(termOut, 'test_post_list_api:', '#64748b');
  posts.push(PostFactory(), PostFactory(), PostFactory());
  var res = router.resolve('GET', '/api/posts/');
  assertEqual(res.status, 200, 'response.status_code == 200');
  assertEqual(res.data.length, 3, 'len(response.json()) == 3');

  logLine(termOut, '', '');
  logLine(termOut, passed + ' passed, ' + failed + ' failed', failed ? '#f87171' : '#4ade80');
}

row.appendChild(mkBtn('▶ pytest -v', runTests));`,
    [
      { level:'easy',   uk:'Натисни кнопку й подивись, як <code>PostFactory</code> (симуляція factory-boy) генерує тестові дані без ручного заповнення кожного поля.', ru:'Нажми кнопку и посмотри, как PostFactory генерирует тестовые данные без ручного заполнения каждого поля.' },
      { level:'medium', uk:'Додай новий тест <code>test_post_factory_batch</code>, що створює РІВНО 5 постів через цикл і перевіряє довжину масиву.', ru:'Добавь тест test_post_factory_batch, создающий ровно 5 постов и проверяющий длину массива.' },
      { level:'hard',   uk:'Зроби так, щоб один тест НАВМИСНО провалився (наприклад, очікуй <code>len == 99</code>) — переконайся, що звіт коректно показує 1 passed, 1 failed.', ru:'Сделай так, чтобы один тест нарочно провалился — убедись, что отчёт показывает верные цифры.' },
    ],
    `# blog/factories.py
import factory
from .models import Post, Author


class AuthorFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Author
    name = factory.Faker('name')


class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post
    title = factory.Faker('sentence')
    author = factory.SubFactory(AuthorFactory)


# blog/tests/test_posts.py
import pytest
from ..factories import PostFactory


@pytest.mark.django_db
def test_post_creation():
    post = PostFactory(title='Тестовий пост')
    assert post.title == 'Тестовий пост'
    assert post.author is not None


@pytest.mark.django_db
def test_post_list_api(client):
    PostFactory.create_batch(3)
    response = client.get('/api/posts/')
    assert response.status_code == 200
    assert len(response.json()) == 3
`
  );

  /* ─── 07-18: ФІНАЛ — Django-блог з DRF API та JWT ─────────────────── */
  patch('07-18',
    { uk:`<h2>ПРОЕКТ: Django-блог з DRF API та JWT</h2>
<p>Фінальний проект модуля обʼєднує все вивчене: модель <code>Post</code>, DRF ViewSet, JWT-авторизацію через <code>simplejwt</code>, і Router — повноцінний REST API для блогу.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ <code>POST /api/token/</code> — отримання access + refresh токенів</li>
  <li>✅ <code>ModelViewSet</code> для <code>/api/posts/</code> — усі CRUD-дії одразу</li>
  <li>✅ Захист створення/видалення постів через <code>IsAuthenticated</code></li>
  <li>✅ Кастомна дія <code>@action</code> — <code>publish</code></li>
</ul>
<p>Відкрий вкладку main.py — там повний, ідіоматичний Django + DRF-код, готовий до запуску на реальному комп'ютері.</p>`,
      ru:`<h2>ПРОЕКТ: Django-блог с DRF API и JWT</h2>
<p>Финальный проект объединяет модель Post, DRF ViewSet, JWT-авторизацию и Router — полноценный REST API для блога.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ POST /api/token/ — получение access + refresh токенов</li>
  <li>✅ ModelViewSet для /api/posts/ — все CRUD-действия сразу</li>
  <li>✅ Защита создания/удаления постов через IsAuthenticated</li>
  <li>✅ Кастомное действие publish</li>
</ul>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var posts = [{ id: 1, title: 'Перший пост', is_published: false }];
var validUser = { username: 'alina', password: 'secret123' };
var currentAccess = null;

function fakeJwt() { return btoa('access:' + Date.now()).slice(0, 24); }
function requireAuth(req) { return req.headers.auth === 'Bearer ' + currentAccess && currentAccess; }

var router = createRouter();
router.path('/api/token/', ['POST'], function (req) {
  if (req.data.username !== validUser.username || req.data.password !== validUser.password) return Response({ detail: 'Невірні дані' }, { status: 401 });
  currentAccess = fakeJwt();
  return { access: currentAccess };
});
router.path('/api/posts/', ['GET'], function () { return posts; });
router.path('/api/posts/', ['POST'], function (req) {
  if (!requireAuth(req)) return Response({ detail: 'Authentication credentials were not provided.' }, { status: 401 });
  if (!req.data.title || req.data.title.length < 5) return Response({ title: 'Мінімум 5 символів' }, { status: 400 });
  var post = { id: posts.length + 1, title: req.data.title, is_published: false };
  posts.push(post);
  return Response(post, { status: 201 });
});
router.path('/api/posts/<int:pk>/publish/', ['POST'], function (req) {
  if (!requireAuth(req)) return Response({ detail: 'Authentication credentials were not provided.' }, { status: 401 });
  var post = posts.find(function (p) { return p.id === Number(req.params.pk); });
  if (!post) return Response({ detail: 'Не знайдено' }, { status: 404 });
  post.is_published = true;
  return { status: 'published' };
});
router.path('/api/posts/<int:pk>/', ['DELETE'], function (req) {
  if (!requireAuth(req)) return Response({ detail: 'Authentication credentials were not provided.' }, { status: 401 });
  posts = posts.filter(function (p) { return p.id !== Number(req.params.pk); });
  return Response(null, { status: 204 });
});

function send(method, path, body, useAuth) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = router.resolve(method, path, body, { auth: useAuth ? 'Bearer ' + currentAccess : undefined });
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('POST /api/token/', function () { send('POST', '/api/token/', { username: 'alina', password: 'secret123' }); }));
row.appendChild(mkBtn('GET /api/posts/', function () { send('GET', '/api/posts/'); }));
row.appendChild(mkBtn('POST /api/posts/ (з токеном)', function () { send('POST', '/api/posts/', { title: 'Новий пост про Django' }, true); }));
row.appendChild(mkBtn('POST /api/posts/ (без токена)', function () { send('POST', '/api/posts/', { title: 'Спроба без токена' }, false); }));
row.appendChild(mkBtn('POST /api/posts/1/publish/', function () { send('POST', '/api/posts/1/publish/', {}, true); }));`,
    [
      { level:'easy',   uk:'Спочатку отримай токен, потім спробуй створити пост з ним і без нього — порівняй результати.', ru:'Сначала получи токен, затем попробуй создать пост с ним и без него — сравни результаты.' },
      { level:'medium', uk:'Спробуй створити пост із закоротким <code>title</code> (онови тіло запиту в коді) і переконайся, що спрацьовує валідація зі статусом 400.', ru:'Попробуй создать пост со слишком коротким title и убедись, что срабатывает валидация 400.' },
      { level:'hard',   uk:'Додай новий захищений маршрут <code>DELETE /api/posts/&lt;int:pk&gt;/comments/</code> (вигаданий, для практики) і кнопку для нього, з перевіркою автентифікації так само, як в інших захищених маршрутах.', ru:'Добавь новый защищённый маршрут и кнопку для него с той же проверкой аутентификации.' },
    ],
    `from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        post = self.get_object()
        post.is_published = True
        post.save()
        return Response({'status': 'published'})


# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import PostViewSet

router = DefaultRouter()
router.register('posts', PostViewSet)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
]
`
  );

})();
