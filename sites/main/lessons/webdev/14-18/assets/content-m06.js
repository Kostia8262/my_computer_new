/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 06 — Python Flask · 14–18
   Патчить WEB_LESSONS після завантаження lessons.js

   ВАЖЛИВО: реального виконання Python у цій оболонці немає (ні Skulpt,
   ні Pyodide). Тому в кожному уроці:
   - starterCode.python — СПРАВЖНІЙ, ідіоматичний Flask-код, який можна
     скопіювати й запустити на своєму комп'ютері з встановленим Flask;
   - starterCode.js — чесна JS-симуляція (fakeFlask) тієї самої логіки
     роутингу/серіалізації/ORM, яка РЕАЛЬНО виконується в браузері й
     виводить результат як лог запит→відповідь у термінальній панелі
     (та сама техніка, що й fakeExpress у модулі 05).
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

  /* Джерело fakeFlask передається в кожен урок ЯК ТЕКСТ (рядок), бо
     код кожного уроку виконується в ІЗОЛЬОВАНОМУ контексті через new Function()
     всередині app.js (runPythonDemo), а не в цьому файлі. */
  const FAKE_FLASK_SRC = `function createApp() {
  var routes = [];
  return {
    route: function (path, methods, handler) {
      routes.push({ path: path, methods: methods, handler: handler });
    },
    handle: function (method, fullPath, body, headers) {
      var pathOnly = fullPath.split('?')[0];
      var query = parseQueryString(fullPath);
      for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        if (route.methods.indexOf(method) === -1) continue;
        var params = matchRoute(route.path, pathOnly);
        if (!params) continue;
        var result;
        try {
          result = route.handler({ params: params, query: query, json: body || {}, headers: headers || {} });
        } catch (e) {
          return { status: 500, body: { error: String(e.message || e) } };
        }
        return normalizeResult(result);
      }
      return { status: 404, body: { error: 'Not Found' } };
    }
  };
}

function normalizeResult(result) {
  if (Object.prototype.toString.call(result) === '[object Array]') {
    return { status: result[1] || 200, body: result[0] };
  }
  return { status: 200, body: result };
}

function jsonify(obj) { return obj; }

function matchRoute(pattern, path) {
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

  /* ─── 06-01: Flask — встановлення, перший сервер, роути ──────────── */
  patch('06-01',
    { uk:`<h2>Flask: встановлення, перший сервер, роути</h2>
<p>Flask — мінімалістичний Python-фреймворк для веброзробки: на відміну від Django (модуль 07), він не нав'язує структуру проекту й дає лише необхідний мінімум "з коробки".</p>
<h3>Встановлення</h3>
<pre>pip install flask</pre>
<h3>Перший сервер</h3>
<pre>from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Привіт зі Flask!'

@app.route('/about')
def about():
    return 'Сторінка про нас'

if __name__ == '__main__':
    app.run(debug=True)</pre>
<h3>Декоратор @app.route — реєстрація маршруту</h3>
<p>Кожна функція, позначена <code>@app.route(path)</code>, стає "обробником" запитів на цей шлях. За замовчуванням обробляється лише GET — інші методи задаються явно (<code>methods=['POST']</code>).</p>
<h3>Запуск сервера</h3>
<pre>python app.py
# * Running on http://127.0.0.1:5000/
# * Debug mode: on</pre>
<h3>Цей урок у пісочниці</h3>
<p>Немає реального Python-виконання — вкладка <code>main.py</code> містить справжній Flask-код для читання й копіювання, а натискання "Запустити" виконує чесну JS-симуляцію тієї самої логіки роутингу нижче в терміналі.</p>`,
      ru:`<h2>Flask: установка, первый сервер, роуты</h2>
<p>Flask — минималистичный Python-фреймворк для веб-разработки: в отличие от Django, он не навязывает структуру проекта.</p>
<h3>Установка</h3>
<pre>pip install flask</pre>
<h3>Первый сервер</h3>
<pre>from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Привет из Flask!'

@app.route('/about')
def about():
    return 'Страница о нас'

if __name__ == '__main__':
    app.run(debug=True)</pre>
<h3>Декоратор @app.route — регистрация маршрута</h3>
<p>Каждая функция с @app.route(path) становится обработчиком запросов на этот путь.</p>
<h3>Запуск сервера</h3>
<pre>python app.py
# * Running on http://127.0.0.1:5000/</pre>
<h3>Этот урок в песочнице</h3>
<p>Реального выполнения Python нет — вкладка main.py содержит настоящий Flask-код, а "Запустить" выполняет честную JS-симуляцию той же логики роутинга.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var app = createApp();
app.route('/', ['GET'], function (req) { return 'Привіт зі Flask!'; });
app.route('/about', ['GET'], function (req) { return 'Сторінка про нас'; });

function send(method, path) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = app.handle(method, path);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.body), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /', function () { send('GET', '/'); }));
row.appendChild(mkBtn('GET /about', function () { send('GET', '/about'); }));
row.appendChild(mkBtn('GET /missing (404)', function () { send('GET', '/missing'); }));`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки й подивись, як симуляція fakeFlask обробляє наявні маршрути й повертає 404 для невідомого шляху.', ru:'Нажми все три кнопки и посмотри, как симуляция fakeFlask обрабатывает маршруты и возвращает 404 для неизвестного пути.' },
      { level:'medium', uk:'У вкладці <code>main.py</code> додай третій справжній маршрут <code>@app.route(\'/contact\')</code>, що повертає рядок "Звʼязок з нами" (це реальний Python-код для читання/копіювання, він не виконується в пісочниці — але подумай, як він мав би виглядати).', ru:'В main.py добавь третий маршрут /contact, возвращающий "Связь с нами".' },
      { level:'hard',   uk:'У блоці JS-симуляції (можна редагувати логіку подумки/на папері, оскільки поле лише для читання в цій вправі) розроби, який саме виклик <code>app.route(\'/contact\', [\'GET\'], ...)</code> і кнопку треба додати, щоб симуляція теж підтримувала цей шлях — опиши код у коментарі.', ru:'Опиши, какой app.route(\'/contact\', [\'GET\'], ...) нужно добавить в симуляцию.' },
    ],
    `from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Привіт зі Flask!'

@app.route('/about')
def about():
    return 'Сторінка про нас'

if __name__ == '__main__':
    app.run(debug=True)
`
  );

  /* ─── 06-02: Jinja2 ──────────────────────────────────────────────── */
  patch('06-02',
    { uk:`<h2>Шаблони Jinja2: extends, blocks, фільтри, макроси</h2>
<p>Jinja2 — шаблонізатор Flask, що дозволяє вставляти Python-подібну логіку (змінні, цикли, умови) прямо в HTML.</p>
<h3>Базовий синтаксис</h3>
<pre># templates/index.html
&lt;h1&gt;Привіт, {{ name }}!&lt;/h1&gt;
{% if is_admin %}
  &lt;p&gt;Ти адміністратор&lt;/p&gt;
{% endif %}
&lt;ul&gt;
{% for item in items %}
  &lt;li&gt;{{ item }}&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;</pre>
<h3>Рендеринг шаблону з Flask</h3>
<pre>from flask import render_template

@app.route('/profile/&lt;name&gt;')
def profile(name):
    return render_template('profile.html', name=name, is_admin=False, items=['A', 'B'])</pre>
<h3>Наслідування шаблонів (extends/block)</h3>
<pre># base.html
&lt;html&gt;&lt;body&gt;
  {% block content %}{% endblock %}
&lt;/body&gt;&lt;/html&gt;

# child.html
{% extends 'base.html' %}
{% block content %}
  &lt;p&gt;Вміст конкретної сторінки&lt;/p&gt;
{% endblock %}</pre>
<h3>Фільтри — трансформація значень у шаблоні</h3>
<pre>{{ name|upper }}         {# ВЕЛИКИМИ ЛІТЕРАМИ #}
{{ price|round(2) }}     {# округлення #}
{{ items|length }}       {# кількість елементів #}</pre>`,
      ru:`<h2>Шаблоны Jinja2: extends, blocks, фильтры, макросы</h2>
<p>Jinja2 — шаблонизатор Flask, позволяющий вставлять Python-подобную логику прямо в HTML.</p>
<h3>Базовый синтаксис</h3>
<pre>&lt;h1&gt;Привет, {{ name }}!&lt;/h1&gt;
{% if is_admin %}
  &lt;p&gt;Ты администратор&lt;/p&gt;
{% endif %}
&lt;ul&gt;
{% for item in items %}
  &lt;li&gt;{{ item }}&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;</pre>
<h3>Рендеринг шаблона с Flask</h3>
<pre>from flask import render_template

@app.route('/profile/&lt;name&gt;')
def profile(name):
    return render_template('profile.html', name=name, is_admin=False, items=['A', 'B'])</pre>
<h3>Наследование шаблонов (extends/block)</h3>
<pre># base.html
{% block content %}{% endblock %}

# child.html
{% extends 'base.html' %}
{% block content %}
  &lt;p&gt;Содержимое конкретной страницы&lt;/p&gt;
{% endblock %}</pre>
<h3>Фильтры</h3>
<pre>{{ name|upper }}
{{ price|round(2) }}
{{ items|length }}</pre>` },
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

/* Міні-Jinja2: підтримує {{ var }}, {% if %}/{% endif %}, {% for %}/{% endfor %} */
function renderTemplate(template, ctx) {
  var out = template;
  out = out.replace(/\\{%\\s*for\\s+(\\w+)\\s+in\\s+(\\w+)\\s*%\\}([\\s\\S]*?)\\{%\\s*endfor\\s*%\\}/g, function (m, varName, listName, body) {
    var list = ctx[listName] || [];
    return list.map(function (item) { return body.split('{{ ' + varName + ' }}').join(item); }).join('');
  });
  out = out.replace(/\\{%\\s*if\\s+(\\w+)\\s*%\\}([\\s\\S]*?)\\{%\\s*endif\\s*%\\}/g, function (m, condName, body) {
    return ctx[condName] ? body : '';
  });
  Object.keys(ctx).forEach(function (key) {
    if (typeof ctx[key] === 'string' || typeof ctx[key] === 'number') {
      out = out.split('{{ ' + key + ' }}').join(ctx[key]);
    }
  });
  return out;
}

var template = '<h1>Привіт, {{ name }}!</h1>\\n{% if is_admin %}\\n<p>Ти адміністратор</p>\\n{% endif %}\\n<ul>\\n{% for item in items %}\\n<li>{{ item }}</li>\\n{% endfor %}\\n</ul>';

function renderAs(isAdmin) {
  var html = renderTemplate(template, { name: 'Аліна', is_admin: isAdmin, items: ['Перший пункт', 'Другий пункт'] });
  preview.textContent = html;
}

row.appendChild(mkBtn('render_template(is_admin=False)', function () { renderAs(false); }));
row.appendChild(mkBtn('render_template(is_admin=True)', function () { renderAs(true); }));
renderAs(false);`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки й подивись, як умова <code>{% if is_admin %}</code> змінює згенерований HTML залежно від переданого значення.', ru:'Нажми обе кнопки и посмотри, как условие {% if is_admin %} меняет сгенерированный HTML.' },
      { level:'medium', uk:'У справжньому Python-коді (вкладка main.py) додай маршрут, що передає <code>items</code> з ТРЬОМА елементами замість двох.', ru:'В main.py добавь маршрут, передающий items с тремя элементами вместо двух.' },
      { level:'hard',   uk:'Розшир міні-Jinja2 у симуляції (опиши, що саме треба додати в <code>renderTemplate</code>) для підтримки фільтра <code>{{ name|upper }}</code> — тобто розпізнавання символу <code>|upper</code> після імені змінної й застосування <code>.toUpperCase()</code>.', ru:'Опиши, что нужно добавить в renderTemplate для поддержки фильтра {{ name|upper }}.' },
    ],
    `from flask import Flask, render_template

app = Flask(__name__)

@app.route('/profile/<name>')
def profile(name):
    return render_template(
        'profile.html',
        name=name,
        is_admin=False,
        items=['Перший пункт', 'Другий пункт']
    )

# templates/profile.html:
# <h1>Привіт, {{ name }}!</h1>
# {% if is_admin %}
#   <p>Ти адміністратор</p>
# {% endif %}
# <ul>
# {% for item in items %}
#   <li>{{ item }}</li>
# {% endfor %}
# </ul>

if __name__ == '__main__':
    app.run(debug=True)
`
  );

  /* ─── 06-03: Forms і WTForms ──────────────────────────────────────── */
  patch('06-03',
    { uk:`<h2>Форми і WTForms: валідація та CSRF-захист</h2>
<p>Flask-WTF (обгортка над WTForms) описує форми як Python-класи з декларативними полями й валідаторами — так само, як Zod/Joi робили це на JS-стороні (модуль 04-09, 05-09).</p>
<h3>Опис форми</h3>
<pre>from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, NumberRange

class SignupForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    age = IntegerField('Вік', validators=[DataRequired(), NumberRange(min=14, max=120)])</pre>
<h3>Обробка форми в маршруті</h3>
<pre>@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        email = form.email.data
        age = form.age.data
        return f'Реєстрація успішна: {email}'
    return render_template('signup.html', form=form)</pre>
<h3>CSRF-захист — вбудований за замовчуванням</h3>
<pre>&lt;form method="POST"&gt;
  {{ form.csrf_token }}   {# прихований токен, що захищає від Cross-Site Request Forgery #}
  {{ form.email() }}
  {{ form.age() }}
  &lt;button type="submit"&gt;Відправити&lt;/button&gt;
&lt;/form&gt;</pre>
<h3>Навіщо CSRF-токен</h3>
<p>Без нього зловмисний сайт міг би змусити браузер користувача (який вже залогінений) надіслати запит на твій сервер від його імені. Токен, унікальний для сесії, унеможливлює це — сторонній сайт не знає його значення.</p>`,
      ru:`<h2>Формы и WTForms: валидация и CSRF-защита</h2>
<p>Flask-WTF описывает формы как Python-классы с декларативными полями и валидаторами.</p>
<h3>Описание формы</h3>
<pre>from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, NumberRange

class SignupForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    age = IntegerField('Возраст', validators=[DataRequired(), NumberRange(min=14, max=120)])</pre>
<h3>Обработка формы в маршруте</h3>
<pre>@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        email = form.email.data
        return f'Регистрация успешна: {email}'
    return render_template('signup.html', form=form)</pre>
<h3>CSRF-защита — встроена по умолчанию</h3>
<pre>&lt;form method="POST"&gt;
  {{ form.csrf_token }}
  {{ form.email() }}
  &lt;button type="submit"&gt;Отправить&lt;/button&gt;
&lt;/form&gt;</pre>
<h3>Зачем CSRF-токен</h3>
<p>Без него злоумышленный сайт мог бы заставить браузер отправить запрос от имени залогиненного пользователя.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

function validateSignup(data) {
  var errors = {};
  if (!data.email || data.email.indexOf('@') === -1) errors.email = 'Некоректний email';
  var age = Number(data.age);
  if (!data.age || isNaN(age) || age < 14 || age > 120) errors.age = 'Вік має бути від 14 до 120';
  return errors;
}

var app = createApp();
app.route('/signup', ['POST'], function (req) {
  var errors = validateSignup(req.json);
  if (Object.keys(errors).length) return [{ errors: errors }, 400];
  return [{ message: 'Реєстрація успішна: ' + req.json.email }, 201];
});

function send(body) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ POST /signup json=' + JSON.stringify(body), '#68a063');
  var res = app.handle('POST', '/signup', body);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.body), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('Валідні дані', function () { send({ email: 'a@x.com', age: 16 }); }));
row.appendChild(mkBtn('Некоректний email', function () { send({ email: 'без-собаки', age: 16 }); }));
row.appendChild(mkBtn('Занадто малий вік', function () { send({ email: 'a@x.com', age: 5 }); }));`,
    [
      { level:'easy',   uk:'Спробуй усі три кнопки й подивись, як валідація (принцип WTForms-валідаторів) блокує некоректні дані ще до "збереження".', ru:'Попробуй все три кнопки и посмотри, как валидация блокирует некорректные данные.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нове поле форми <code>name = StringField(\'Ім\'я\', validators=[DataRequired()])</code>.', ru:'В main.py добавь новое поле формы name = StringField(\'Имя\', validators=[DataRequired()]).' },
      { level:'hard',   uk:'Розшир <code>validateSignup</code> у симуляції новою перевіркою поля <code>name</code> (мінімум 2 символи) — онови також кнопки, щоб тестувати цей випадок.', ru:'Расширь validateSignup новой проверкой поля name (минимум 2 символа).' },
    ],
    `from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, NumberRange

app = Flask(__name__)
app.config['SECRET_KEY'] = 'change-me-in-production'


class SignupForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    age = IntegerField('Вік', validators=[DataRequired(), NumberRange(min=14, max=120)])


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        return f'Реєстрація успішна: {form.email.data}'
    return render_template('signup.html', form=form)


if __name__ == '__main__':
    app.run(debug=True)
`
  );

  /* ─── 06-04: Flask-SQLAlchemy ─────────────────────────────────────── */
  patch('06-04',
    { uk:`<h2>Flask-SQLAlchemy: моделі, відносини та запити</h2>
<p>SQLAlchemy — ORM (Object-Relational Mapping): описуєш дані як Python-класи, а бібліотека сама генерує SQL-запити.</p>
<h3>Опис моделі</h3>
<pre>from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship('User', backref='posts')</pre>
<h3>Запити</h3>
<pre>User.query.all()                          # усі користувачі
User.query.get(1)                         # за первинним ключем
User.query.filter_by(email='a@x.com').first()
User.query.filter(User.name.like('%Аліна%')).all()

new_user = User(name='Марко', email='m@x.com')
db.session.add(new_user)
db.session.commit()</pre>
<h3>Використання відносин (relationship)</h3>
<pre>user = User.query.get(1)
for post in user.posts:          # завдяки backref='posts'
    print(post.title)</pre>`,
      ru:`<h2>Flask-SQLAlchemy: модели, отношения и запросы</h2>
<p>SQLAlchemy — ORM: описываешь данные как Python-классы, библиотека генерирует SQL.</p>
<h3>Описание модели</h3>
<pre>from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship('User', backref='posts')</pre>
<h3>Запросы</h3>
<pre>User.query.all()
User.query.get(1)
User.query.filter_by(email='a@x.com').first()

new_user = User(name='Марк', email='m@x.com')
db.session.add(new_user)
db.session.commit()</pre>
<h3>Использование отношений (relationship)</h3>
<pre>user = User.query.get(1)
for post in user.posts:
    print(post.title)</pre>` },
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

/* Мінімальна fake-ORM: query.all/get/filter_by + relationship через backref */
var users = [{ id: 1, name: 'Аліна', email: 'a@x.com' }, { id: 2, name: 'Марко', email: 'm@x.com' }];
var posts = [{ id: 1, title: 'Перший пост', user_id: 1 }, { id: 2, title: 'Другий пост', user_id: 1 }];

var UserQuery = {
  all: function () { return users; },
  get: function (id) { return users.find(function (u) { return u.id === id; }) || null; },
  filter_by: function (criteria) {
    var key = Object.keys(criteria)[0];
    return { first: function () { return users.find(function (u) { return u[key] === criteria[key]; }) || null; } };
  }
};

function send(label, fn) {
  logLine('', '#64748b');
  logLine('>>> ' + label, '#68a063');
  logLine(JSON.stringify(fn()), '#4ade80');
}

row.appendChild(mkBtn('User.query.all()', function () { send('User.query.all()', UserQuery.all); }));
row.appendChild(mkBtn('User.query.get(1)', function () { send('User.query.get(1)', function () { return UserQuery.get(1); }); }));
row.appendChild(mkBtn('filter_by(email=...)', function () { send('User.query.filter_by(email="m@x.com").first()', function () { return UserQuery.filter_by({ email: 'm@x.com' }).first(); }); }));
row.appendChild(mkBtn('user.posts (relationship)', function () {
  var user = UserQuery.get(1);
  var userPosts = posts.filter(function (p) { return p.user_id === user.id; });
  send('for post in user.posts: print(post.title)', function () { return userPosts.map(function (p) { return p.title; }); });
}));`,
    [
      { level:'easy',   uk:'Спробуй усі чотири кнопки й подивись на різні ORM-подібні запити (<code>.all()</code>, <code>.get()</code>, <code>.filter_by()</code>, relationship).', ru:'Попробуй все четыре кнопки и посмотри на разные ORM-подобные запросы.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нове поле в модель <code>Post</code> — <code>published = db.Column(db.Boolean, default=False)</code>.', ru:'В main.py добавь новое поле published = db.Column(db.Boolean, default=False) в модель Post.' },
      { level:'hard',   uk:'Додай у симуляцію новий запит — аналог <code>Post.query.filter_by(user_id=1).all()</code>, що повертає всі пости конкретного користувача (окрема кнопка).', ru:'Добавь запрос — аналог Post.query.filter_by(user_id=1).all().' },
    ],
    `from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship('User', backref='posts')


@app.route('/users')
def list_users():
    users = User.query.all()
    return {'data': [{'id': u.id, 'name': u.name} for u in users]}


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
`
  );

  /* ─── 06-05: Migrations ──────────────────────────────────────────── */
  patch('06-05',
    { uk:`<h2>Міграції: Flask-Migrate + Alembic</h2>
<p>Коли модель даних змінюється (додано поле, нова таблиця), базу даних потрібно синхронізувати зі змінами в коді — для цього використовуються міграції (Alembic, обгорнутий у Flask-Migrate).</p>
<h3>Встановлення й ініціалізація</h3>
<pre>pip install flask-migrate
flask db init          # створює папку migrations/</pre>
<h3>Створення міграції після зміни моделі</h3>
<pre>flask db migrate -m "Додано поле age до User"
# Alembic автоматично порівнює поточні моделі з базою й генерує файл-міграцію:
# migrations/versions/a1b2c3d4_added_age_to_user.py</pre>
<h3>Застосування міграції</h3>
<pre>flask db upgrade        # застосовує всі неприменені міграції до бази
flask db downgrade      # відкочує останню міграцію</pre>
<h3>Приклад згенерованого файлу міграції</h3>
<pre>def upgrade():
    op.add_column('user', sa.Column('age', sa.Integer(), nullable=True))

def downgrade():
    op.drop_column('user', 'age')</pre>
<h3>Чому це важливо в команді</h3>
<p>Міграції — це "версійний контроль" для схеми бази даних: кожен розробник, підтягнувши код через git, виконує <code>flask db upgrade</code> й отримує ідентичну структуру бази, без ручного редагування SQL.</p>`,
      ru:`<h2>Миграции: Flask-Migrate + Alembic</h2>
<p>Когда модель данных меняется, базу нужно синхронизировать через миграции (Alembic + Flask-Migrate).</p>
<h3>Установка и инициализация</h3>
<pre>pip install flask-migrate
flask db init</pre>
<h3>Создание миграции</h3>
<pre>flask db migrate -m "Добавлено поле age к User"</pre>
<h3>Применение миграции</h3>
<pre>flask db upgrade
flask db downgrade</pre>
<h3>Пример сгенерированного файла миграции</h3>
<pre>def upgrade():
    op.add_column('user', sa.Column('age', sa.Integer(), nullable=True))

def downgrade():
    op.drop_column('user', 'age')</pre>
<h3>Почему это важно в команде</h3>
<p>Миграции — "версионный контроль" для схемы базы данных.</p>` },
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

var migrationCount = 0;

function runInit() {
  logLine('', '');
  logLine('$ flask db init', '#68a063');
  logLine('Створено папку migrations/ з конфігурацією Alembic', '#4ade80');
}

function runMigrate() {
  migrationCount++;
  logLine('', '');
  logLine('$ flask db migrate -m "Додано поле age до User"', '#68a063');
  logLine('Порівнюю моделі з поточною схемою бази...', '#64748b');
  logLine('Згенеровано migrations/versions/000' + migrationCount + '_added_age.py', '#4ade80');
}

function runUpgrade() {
  logLine('', '');
  logLine('$ flask db upgrade', '#68a063');
  if (migrationCount === 0) {
    logLine('Немає нових міграцій для застосування', '#facc15');
  } else {
    logLine('Застосовано ' + migrationCount + ' міграцію(й). База синхронізована.', '#4ade80');
  }
}

row.appendChild(mkBtn('flask db init', runInit));
row.appendChild(mkBtn('flask db migrate', runMigrate));
row.appendChild(mkBtn('flask db upgrade', runUpgrade));`,
    [
      { level:'easy',   uk:'Виконай команди по черзі: <code>init</code> → <code>migrate</code> → <code>upgrade</code>, і подивись, як симуляція відображає типовий робочий процес міграцій.', ru:'Выполни команды по очереди: init → migrate → upgrade.' },
      { level:'medium', uk:'Натисни <code>flask db upgrade</code> ще раз, НЕ створюючи нову міграцію — подивись повідомлення "Немає нових міграцій".', ru:'Нажми flask db upgrade ещё раз без новой миграции — посмотри на сообщение.' },
      { level:'hard',   uk:'Додай кнопку <code>flask db downgrade</code>, що зменшує <code>migrationCount</code> на 1 (з перевіркою, що не йде у відʼємні числа) і логує "Відкочено останню міграцію".', ru:'Добавь кнопку flask db downgrade, уменьшающую migrationCount на 1.' },
    ],
    `# Термінальні команди (реальні, виконуються поза пісочницею):
#
# pip install flask-migrate
# flask db init
# flask db migrate -m "Додано поле age до User"
# flask db upgrade

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, nullable=True)  # нове поле, додане в міграції


if __name__ == '__main__':
    app.run(debug=True)
`
  );

  /* ─── 06-06: REST API jsonify, статус-коди, Blueprint ────────────── */
  patch('06-06',
    { uk:`<h2>REST API: jsonify, статус-коди, Blueprint</h2>
<h3>jsonify — коректна JSON-відповідь</h3>
<pre>from flask import jsonify

@app.route('/users')
def list_users():
    users = [{'id': 1, 'name': 'Аліна'}]
    return jsonify(users)   # автоматично встановлює Content-Type: application/json</pre>
<h3>Явний статус-код</h3>
<pre>@app.route('/users', methods=['POST'])
def create_user():
    return jsonify({'id': 2, 'name': 'Марко'}), 201  # кортеж (тіло, статус)

@app.route('/users/&lt;int:id&gt;')
def get_user(id):
    user = find_user(id)
    if not user:
        return jsonify({'error': 'Не знайдено'}), 404
    return jsonify(user)</pre>
<h3>Blueprint — розбиття маршрутів на модулі</h3>
<pre># users/routes.py
from flask import Blueprint

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/')
def list_users():
    return jsonify([...])

# app.py
from users.routes import users_bp
app.register_blueprint(users_bp)</pre>
<p>Blueprint дозволяє групувати повʼязані маршрути (наприклад, усі <code>/api/users/*</code>) в окремий файл/модуль замість одного величезного <code>app.py</code>.</p>`,
      ru:`<h2>REST API: jsonify, статус-коды, Blueprint</h2>
<h3>jsonify — корректный JSON-ответ</h3>
<pre>from flask import jsonify

@app.route('/users')
def list_users():
    users = [{'id': 1, 'name': 'Алина'}]
    return jsonify(users)</pre>
<h3>Явный статус-код</h3>
<pre>@app.route('/users', methods=['POST'])
def create_user():
    return jsonify({'id': 2, 'name': 'Марк'}), 201

@app.route('/users/&lt;int:id&gt;')
def get_user(id):
    user = find_user(id)
    if not user:
        return jsonify({'error': 'Не найден'}), 404
    return jsonify(user)</pre>
<h3>Blueprint — разбиение маршрутов на модули</h3>
<pre>users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/')
def list_users():
    return jsonify([...])

app.register_blueprint(users_bp)</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var users = [{ id: 1, name: 'Аліна' }, { id: 2, name: 'Марко' }];
var app = createApp();

app.route('/api/users', ['GET'], function (req) { return jsonify(users); });
app.route('/api/users', ['POST'], function (req) {
  var newUser = { id: users.length + 1, name: req.json.name || 'Без імені' };
  users.push(newUser);
  return [newUser, 201];
});
app.route('/api/users/<int:id>', ['GET'], function (req) {
  var user = users.find(function (u) { return u.id === Number(req.params.id); });
  if (!user) return [{ error: 'Не знайдено' }, 404];
  return jsonify(user);
});

function send(method, path, body) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = app.handle(method, path, body);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.body), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /api/users', function () { send('GET', '/api/users'); }));
row.appendChild(mkBtn('GET /api/users/1', function () { send('GET', '/api/users/1'); }));
row.appendChild(mkBtn('GET /api/users/99 (404)', function () { send('GET', '/api/users/99'); }));
row.appendChild(mkBtn('POST /api/users', function () { send('POST', '/api/users', { name: 'Кіра' }); }));`,
    [
      { level:'easy',   uk:'Спробуй усі чотири кнопки й подивись на правильні статус-коди (200, 201, 404) для кожної дії.', ru:'Попробуй все четыре кнопки и посмотри на правильные статус-коды.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай маршрут <code>DELETE /api/users/&lt;int:id&gt;</code>, що видаляє користувача.', ru:'В main.py добавь маршрут DELETE /api/users/<int:id>.' },
      { level:'hard',   uk:'Додай у симуляцію Blueprint-подібну структуру — окремий обʼєкт <code>usersBlueprint</code> із власними маршрутами, який потім "реєструється" в <code>app</code> через цикл (імітація <code>register_blueprint</code>).', ru:'Добавь Blueprint-подобную структуру usersBlueprint с регистрацией через цикл.' },
    ],
    `from flask import Flask, jsonify, request

app = Flask(__name__)
users = [{'id': 1, 'name': 'Аліна'}, {'id': 2, 'name': 'Марко'}]


@app.route('/api/users')
def list_users():
    return jsonify(users)


@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = {'id': len(users) + 1, 'name': data.get('name', 'Без імені')}
    users.append(new_user)
    return jsonify(new_user), 201


@app.route('/api/users/<int:id>')
def get_user(id):
    user = next((u for u in users if u['id'] == id), None)
    if not user:
        return jsonify({'error': 'Не знайдено'}), 404
    return jsonify(user)


if __name__ == '__main__':
    app.run(debug=True)
`
  );

  /* ─── 06-07: Flask-Login ──────────────────────────────────────────── */
  patch('06-07',
    { uk:`<h2>Flask-Login: авторизація, сесії та захист маршрутів</h2>
<p>Flask-Login керує "хто зараз залогінений" через сесії (cookie на боці клієнта + дані на боці сервера) — на відміну від JWT (наступний урок), де стан клієнта закодований у самому токені.</p>
<h3>Налаштування</h3>
<pre>from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))</pre>
<h3>Логін і логаут</h3>
<pre>@app.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(username=request.form['username']).first()
    if user and check_password(user, request.form['password']):
        login_user(user)          # створює сесію
        return 'Успішний вхід'
    return 'Невірні дані', 401

@app.route('/logout')
def logout():
    logout_user()
    return 'Вихід виконано'</pre>
<h3>Захист маршрутів</h3>
<pre>@app.route('/dashboard')
@login_required
def dashboard():
    return f'Привіт, {current_user.username}'
# Незалогінений користувач автоматично перенаправляється на сторінку логіну</pre>`,
      ru:`<h2>Flask-Login: авторизация, сессии и защита маршрутов</h2>
<p>Flask-Login управляет "кто сейчас залогинен" через сессии.</p>
<h3>Настройка</h3>
<pre>from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))</pre>
<h3>Логин и логаут</h3>
<pre>@app.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(username=request.form['username']).first()
    if user and check_password(user, request.form['password']):
        login_user(user)
        return 'Успешный вход'
    return 'Неверные данные', 401</pre>
<h3>Защита маршрутов</h3>
<pre>@app.route('/dashboard')
@login_required
def dashboard():
    return f'Привет, {current_user.username}'</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var registeredUsers = [{ id: 1, username: 'alina', password: 'secret123' }];
var session = { userId: null };

var app = createApp();
app.route('/login', ['POST'], function (req) {
  var user = registeredUsers.find(function (u) { return u.username === req.json.username; });
  if (!user || user.password !== req.json.password) return [{ error: 'Невірні дані' }, 401];
  session.userId = user.id;
  return { message: 'Успішний вхід (сесію створено)' };
});
app.route('/logout', ['GET'], function (req) {
  session.userId = null;
  return { message: 'Вихід виконано' };
});
app.route('/dashboard', ['GET'], function (req) {
  if (!session.userId) return [{ error: 'Потрібен вхід (login_required)' }, 401];
  var user = registeredUsers.find(function (u) { return u.id === session.userId; });
  return { message: 'Привіт, ' + user.username };
});

function send(method, path, body) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path + (body ? ' ' + JSON.stringify(body) : ''), '#68a063');
  var res = app.handle(method, path, body);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.body), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /dashboard (без входу)', function () { send('GET', '/dashboard'); }));
row.appendChild(mkBtn('POST /login', function () { send('POST', '/login', { username: 'alina', password: 'secret123' }); }));
row.appendChild(mkBtn('GET /dashboard (з сесією)', function () { send('GET', '/dashboard'); }));
row.appendChild(mkBtn('GET /logout', function () { send('GET', '/logout'); }));`,
    [
      { level:'easy',   uk:'Спробуй зайти на /dashboard ДО й ПІСЛЯ логіну — переконайся, що <code>@login_required</code> реально блокує доступ без сесії.', ru:'Попробуй зайти на /dashboard до и после логина — убедись, что @login_required блокирует доступ.' },
      { level:'medium', uk:'Виконай <code>logout</code>, потім знову спробуй <code>/dashboard</code> — переконайся, що доступ знову заблоковано.', ru:'Выполни logout, затем снова попробуй /dashboard — убедись, что доступ снова заблокирован.' },
      { level:'hard',   uk:'Додай другого зареєстрованого користувача в <code>registeredUsers</code> і кнопку логіну під ним — переконайся, що <code>current_user</code> (симуляція через <code>session.userId</code>) коректно показує ІМЕННО того користувача, який залогінився.', ru:'Добавь второго пользователя и кнопку логина под ним — убедись в корректности current_user.' },
    ],
    `from flask import Flask, request
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'change-me'

login_manager = LoginManager()
login_manager.init_app(app)


class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password


users_db = {1: User(1, 'alina', 'secret123')}


@login_manager.user_loader
def load_user(user_id):
    return users_db.get(int(user_id))


@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = next((u for u in users_db.values() if u.username == username), None)
    if user and user.password == password:
        login_user(user)
        return 'Успішний вхід'
    return 'Невірні дані', 401


@app.route('/dashboard')
@login_required
def dashboard():
    return f'Привіт, {current_user.username}'


if __name__ == '__main__':
    app.run(debug=True)
`
  );

  /* ─── 06-08: Flask-JWT-Extended ───────────────────────────────────── */
  patch('06-08',
    { uk:`<h2>Flask-JWT-Extended: access та refresh токени</h2>
<p>Той самий принцип JWT, що вивчався на JS-стороні (модуль 05-07), тепер із боку Python-сервера через бібліотеку <code>flask-jwt-extended</code>.</p>
<h3>Налаштування</h3>
<pre>from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity

app.config['JWT_SECRET_KEY'] = 'секретний-ключ'
jwt = JWTManager(app)</pre>
<h3>Видача токенів при логіні</h3>
<pre>@app.route('/login', methods=['POST'])
def login():
    user = authenticate(request.json['username'], request.json['password'])
    if not user:
        return jsonify({'error': 'Невірні дані'}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=15))
    refresh_token = create_refresh_token(identity=user.id, expires_delta=timedelta(days=7))
    return jsonify(access_token=access_token, refresh_token=refresh_token)</pre>
<h3>Захищений маршрут</h3>
<pre>@app.route('/profile')
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    return jsonify({'user_id': user_id})</pre>
<h3>Оновлення access token через refresh token</h3>
<pre>@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id)
    return jsonify(access_token=new_access_token)</pre>`,
      ru:`<h2>Flask-JWT-Extended: access и refresh токены</h2>
<p>Тот же принцип JWT, что и на JS-стороне (модуль 05-07), теперь на Python-сервере.</p>
<h3>Настройка</h3>
<pre>from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity

app.config['JWT_SECRET_KEY'] = 'секретный-ключ'
jwt = JWTManager(app)</pre>
<h3>Выдача токенов при логине</h3>
<pre>@app.route('/login', methods=['POST'])
def login():
    user = authenticate(request.json['username'], request.json['password'])
    if not user:
        return jsonify({'error': 'Неверные данные'}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=15))
    refresh_token = create_refresh_token(identity=user.id, expires_delta=timedelta(days=7))
    return jsonify(access_token=access_token, refresh_token=refresh_token)</pre>
<h3>Защищённый маршрут</h3>
<pre>@app.route('/profile')
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    return jsonify({'user_id': user_id})</pre>
<h3>Обновление access token через refresh</h3>
<pre>@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    return jsonify(access_token=create_access_token(identity=user_id))</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

function fakeToken(identity, kind) {
  return btoa(JSON.stringify({ identity: identity, kind: kind, exp: Date.now() + 900000 })).slice(0, 24) + '.' + kind;
}

var currentAccess = null;
var currentRefresh = null;

var app = createApp();
app.route('/login', ['POST'], function (req) {
  currentAccess = fakeToken(1, 'access');
  currentRefresh = fakeToken(1, 'refresh');
  return { access_token: currentAccess, refresh_token: currentRefresh };
});
app.route('/profile', ['GET'], function (req) {
  if (req.headers.token !== currentAccess || !currentAccess) return [{ error: 'Токен відсутній або невалідний' }, 401];
  return { user_id: 1 };
});
app.route('/refresh', ['POST'], function (req) {
  if (req.headers.token !== currentRefresh || !currentRefresh) return [{ error: 'Потрібен валідний refresh token' }, 401];
  currentAccess = fakeToken(1, 'access');
  return { access_token: currentAccess };
});

function send(method, path, useToken) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = app.handle(method, path, {}, { token: useToken });
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.body), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('POST /login', function () { send('POST', '/login'); }));
row.appendChild(mkBtn('GET /profile (з access)', function () { send('GET', '/profile', currentAccess); }));
row.appendChild(mkBtn('POST /refresh', function () { send('POST', '/refresh', currentRefresh); }));`,
    [
      { level:'easy',   uk:'Виконай <code>/login</code>, потім <code>/profile</code> з отриманим токеном — переконайся, що <code>@jwt_required()</code> пропускає валідний запит.', ru:'Выполни /login, затем /profile с полученным токеном — убедись, что @jwt_required() пропускает валидный запрос.' },
      { level:'medium', uk:'Виконай <code>/refresh</code> і подивись, що видається НОВИЙ access token, відмінний від початкового.', ru:'Выполни /refresh и посмотри, что выдаётся новый access token.' },
      { level:'hard',   uk:'Спробуй викликати <code>/profile</code> ще раз БЕЗ попереднього <code>/login</code> (онови сторінку логічно, тобто уяви <code>currentAccess = null</code>) — переконайся, що спрацьовує 401. Опиши, як саме симуляція це перевіряє.', ru:'Опиши, как симуляция проверяет 401 при отсутствии токена.' },
    ],
    `from datetime import timedelta
from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity
)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'change-me-in-production'
jwt = JWTManager(app)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data.get('username') != 'alina' or data.get('password') != 'secret123':
        return jsonify({'error': 'Невірні дані'}), 401
    access_token = create_access_token(identity=1, expires_delta=timedelta(minutes=15))
    refresh_token = create_refresh_token(identity=1, expires_delta=timedelta(days=7))
    return jsonify(access_token=access_token, refresh_token=refresh_token)


@app.route('/profile')
@jwt_required()
def profile():
    return jsonify({'user_id': get_jwt_identity()})


@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    return jsonify(access_token=create_access_token(identity=get_jwt_identity()))


if __name__ == '__main__':
    app.run(debug=True)
`
  );

  /* ─── 06-09: Blueprint ────────────────────────────────────────────── */
  patch('06-09',
    { uk:`<h2>Blueprint: розбиття великого проекту на модулі</h2>
<p>Коли застосунок зростає, тримати ВСІ маршрути в одному <code>app.py</code> стає незручно. Blueprint дозволяє розбити проект на незалежні модулі за темою (users, posts, auth).</p>
<h3>Структура проекту з Blueprint</h3>
<pre>myapp/
├── app.py
├── users/
│   ├── __init__.py
│   └── routes.py
├── posts/
│   ├── __init__.py
│   └── routes.py
└── auth/
    ├── __init__.py
    └── routes.py</pre>
<h3>Оголошення Blueprint у модулі</h3>
<pre># users/routes.py
from flask import Blueprint, jsonify

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/')
def list_users():
    return jsonify([...])

@users_bp.route('/<int:id>')
def get_user(id):
    return jsonify({...})</pre>
<h3>Реєстрація всіх Blueprint у головному файлі</h3>
<pre># app.py
from flask import Flask
from users.routes import users_bp
from posts.routes import posts_bp
from auth.routes import auth_bp

app = Flask(__name__)
app.register_blueprint(users_bp)
app.register_blueprint(posts_bp)
app.register_blueprint(auth_bp)</pre>
<h3>Переваги</h3>
<p>Кожна команда може працювати над своїм Blueprint незалежно, маршрути логічно згруповані, і <code>app.py</code> лишається коротким "точкою збору" всіх модулів.</p>`,
      ru:`<h2>Blueprint: разбиение большого проекта на модули</h2>
<p>Когда приложение растёт, держать все маршруты в одном app.py неудобно. Blueprint разбивает проект на независимые модули по теме.</p>
<h3>Структура проекта с Blueprint</h3>
<pre>myapp/
├── app.py
├── users/routes.py
├── posts/routes.py
└── auth/routes.py</pre>
<h3>Объявление Blueprint в модуле</h3>
<pre># users/routes.py
from flask import Blueprint, jsonify

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/')
def list_users():
    return jsonify([...])</pre>
<h3>Регистрация всех Blueprint в главном файле</h3>
<pre># app.py
from users.routes import users_bp
from posts.routes import posts_bp

app = Flask(__name__)
app.register_blueprint(users_bp)
app.register_blueprint(posts_bp)</pre>
<h3>Преимущества</h3>
<p>Каждая команда работает над своим Blueprint независимо.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

function createBlueprint(prefix) {
  var localRoutes = [];
  return {
    route: function (path, methods, handler) {
      localRoutes.push({ path: prefix + path, methods: methods, handler: handler });
    },
    getRoutes: function () { return localRoutes; }
  };
}

var usersBp = createBlueprint('/api/users');
usersBp.route('/', ['GET'], function () { return [{ id: 1, name: 'Аліна' }, { id: 2, name: 'Марко' }]; });

var postsBp = createBlueprint('/api/posts');
postsBp.route('/', ['GET'], function () { return [{ id: 1, title: 'Перший пост' }]; });

var app = createApp();
function registerBlueprint(bp) {
  bp.getRoutes().forEach(function (r) { app.route(r.path, r.methods, r.handler); });
  logLine(termOut, 'app.register_blueprint(...) — зареєстровано ' + bp.getRoutes().length + ' маршрут(ів) з префіксом', '#c4b5fd');
}
registerBlueprint(usersBp);
registerBlueprint(postsBp);

function send(method, path) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = app.handle(method, path);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.body), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /api/users/', function () { send('GET', '/api/users/'); }));
row.appendChild(mkBtn('GET /api/posts/', function () { send('GET', '/api/posts/'); }));`,
    [
      { level:'easy',   uk:'Подивись, як два ОКРЕМІ Blueprint (users, posts) реєструються в одному <code>app</code> і кожен відповідає лише за свій префікс.', ru:'Посмотри, как два отдельных Blueprint регистрируются в одном app и отвечают каждый за свой префикс.' },
      { level:'medium', uk:'Створи третій Blueprint <code>authBp</code> з префіксом <code>/api/auth</code> і маршрутом <code>/status</code>, що повертає <code>{ loggedIn: false }</code>.', ru:'Создай третий Blueprint authBp с префиксом /api/auth и маршрутом /status.' },
      { level:'hard',   uk:'У справжньому коді (main.py) розпиши, як мала б виглядати структура файлів для ЦЬОГО прикладу (users/routes.py, posts/routes.py, app.py) — опиши це коментарями у файлі.', ru:'Опиши в комментариях структуру файлов для этого примера (users/routes.py, posts/routes.py, app.py).' },
    ],
    `# app.py
from flask import Flask
from users.routes import users_bp
from posts.routes import posts_bp

app = Flask(__name__)
app.register_blueprint(users_bp)
app.register_blueprint(posts_bp)

if __name__ == '__main__':
    app.run(debug=True)


# users/routes.py
from flask import Blueprint, jsonify

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/')
def list_users():
    return jsonify([{'id': 1, 'name': 'Аліна'}, {'id': 2, 'name': 'Марко'}])


# posts/routes.py
from flask import Blueprint, jsonify

posts_bp = Blueprint('posts', __name__, url_prefix='/api/posts')

@posts_bp.route('/')
def list_posts():
    return jsonify([{'id': 1, 'title': 'Перший пост'}])
`
  );

  /* ─── 06-10: Celery + Redis ───────────────────────────────────────── */
  patch('06-10',
    { uk:`<h2>Celery + Redis: фонові задачі та черги</h2>
<p>Деякі операції (надсилання email, обробка зображень, генерація звітів) занадто повільні, щоб виконувати їх ПІД ЧАС запиту — Celery дозволяє винести їх у чергу фонових задач, які виконує окремий "воркер"-процес.</p>
<h3>Налаштування</h3>
<pre>pip install celery redis

from celery import Celery

celery = Celery('myapp', broker='redis://localhost:6379/0')</pre>
<h3>Оголошення фонової задачі</h3>
<pre>@celery.task
def send_welcome_email(user_email):
    time.sleep(5)  # імітація повільної операції
    print(f'Email надіслано на {user_email}')
    return 'sent'</pre>
<h3>Виклик задачі з маршруту (не блокує відповідь!)</h3>
<pre>@app.route('/signup', methods=['POST'])
def signup():
    user = create_user(request.json)
    send_welcome_email.delay(user.email)  # запускається у фоні, відповідь надсилається одразу
    return jsonify({'message': 'Реєстрація прийнята'}), 202</pre>
<h3>Запуск воркера (окремий процес)</h3>
<pre>celery -A myapp worker --loglevel=info</pre>
<h3>Статус 202 Accepted — важлива деталь</h3>
<p>Для фонових задач часто повертають <code>202 Accepted</code> замість <code>200 OK</code> — це означає "запит прийнято до обробки", а не "обробку завершено".</p>`,
      ru:`<h2>Celery + Redis: фоновые задачи и очереди</h2>
<p>Некоторые операции слишком медленные для выполнения во время запроса — Celery выносит их в очередь фоновых задач.</p>
<h3>Настройка</h3>
<pre>pip install celery redis

from celery import Celery

celery = Celery('myapp', broker='redis://localhost:6379/0')</pre>
<h3>Объявление фоновой задачи</h3>
<pre>@celery.task
def send_welcome_email(user_email):
    time.sleep(5)
    print(f'Email отправлен на {user_email}')
    return 'sent'</pre>
<h3>Вызов задачи из маршрута (не блокирует ответ!)</h3>
<pre>@app.route('/signup', methods=['POST'])
def signup():
    user = create_user(request.json)
    send_welcome_email.delay(user.email)
    return jsonify({'message': 'Регистрация принята'}), 202</pre>
<h3>Запуск воркера</h3>
<pre>celery -A myapp worker --loglevel=info</pre>
<h3>Статус 202 Accepted</h3>
<p>Для фоновых задач часто возвращают 202 Accepted вместо 200 OK.</p>` },
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

var taskId = 0;

function sendWelcomeEmail(email) {
  taskId++;
  var id = 'task-' + taskId;
  logLine('', '');
  logLine('POST /signup → send_welcome_email.delay("' + email + '")', '#68a063');
  logLine('← [202]: {"message":"Реєстрація прийнята","task_id":"' + id + '"}', '#4ade80');
  logLine('  [celery worker] задача ' + id + ' у черзі...', '#64748b');
  setTimeout(function () {
    logLine('  [celery worker] задача ' + id + ' виконується (імітація time.sleep(5))...', '#facc15');
  }, 600);
  setTimeout(function () {
    logLine('  [celery worker] задача ' + id + ' завершена: email надіслано на ' + email, '#4ade80');
  }, 1800);
}

row.appendChild(mkBtn('POST /signup (email: a@x.com)', function () { sendWelcomeEmail('a@x.com'); }));
row.appendChild(mkBtn('POST /signup (email: m@x.com)', function () { sendWelcomeEmail('m@x.com'); }));`,
    [
      { level:'easy',   uk:'Натисни кнопку й подивись, як відповідь <code>202</code> приходить МИТТЄВО, а фонова задача (симуляція <code>time.sleep(5)</code>) завершується пізніше окремим логом.', ru:'Нажми кнопку и посмотри, как ответ 202 приходит мгновенно, а фоновая задача завершается позже.' },
      { level:'medium', uk:'Натисни ОБИДВІ кнопки одна за одною швидко — переконайся, що ДВІ задачі можуть виконуватись "паралельно" (черга).', ru:'Нажми обе кнопки быстро друг за другом — убедись, что две задачи выполняются "параллельно".' },
      { level:'hard',   uk:'Додай нову фонову задачу <code>generate_report()</code> із довшою затримкою (наприклад, 3000мс) і кнопку для неї, що логує окремі етапи "у черзі" → "виконується" → "завершено".', ru:'Добавь задачу generate_report() с более долгой задержкой (например, 3000мс) и кнопку для неё.' },
    ],
    `import time
from celery import Celery
from flask import Flask, request, jsonify

app = Flask(__name__)
celery = Celery(app.name, broker='redis://localhost:6379/0')


@celery.task
def send_welcome_email(user_email):
    time.sleep(5)
    print(f'Email надіслано на {user_email}')
    return 'sent'


@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    send_welcome_email.delay(email)
    return jsonify({'message': 'Реєстрація прийнята'}), 202


if __name__ == '__main__':
    app.run(debug=True)

# Запуск воркера окремим процесом:
# celery -A app.celery worker --loglevel=info
`
  );

  /* ─── 06-11: Flask-Mail ──────────────────────────────────────────── */
  patch('06-11',
    { uk:`<h2>Flask-Mail: відправка email</h2>
<p>Flask-Mail — обгортка над SMTP для надсилання листів прямо з Flask-застосунку (підтвердження реєстрації, скидання пароля, сповіщення).</p>
<h3>Налаштування</h3>
<pre>from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'app-password'  # НІКОЛИ не хардкодь — лише через .env!

mail = Mail(app)</pre>
<h3>Надсилання листа</h3>
<pre>@app.route('/send-confirmation', methods=['POST'])
def send_confirmation():
    email = request.json['email']
    msg = Message(
        subject='Підтвердіть реєстрацію',
        sender='noreply@myapp.com',
        recipients=[email],
        body='Натисніть посилання для підтвердження: https://myapp.com/confirm/abc123'
    )
    mail.send(msg)
    return jsonify({'message': 'Лист надіслано'})</pre>
<h3>HTML-листи</h3>
<pre>msg.html = render_template('email/confirmation.html', confirm_url=url)</pre>
<h3>Чому це варто робити через Celery (модуль 06-10)</h3>
<p>Реальна відправка email через SMTP може тривати секунди — виконувати це синхронно, блокуючи відповідь користувачу, погана практика. У реальних проектах <code>mail.send(msg)</code> зазвичай обгортають у Celery-задачу.</p>`,
      ru:`<h2>Flask-Mail: отправка email</h2>
<p>Flask-Mail — обёртка над SMTP для отправки писем прямо из Flask-приложения.</p>
<h3>Настройка</h3>
<pre>from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'app-password'  # никогда не хардкодь!

mail = Mail(app)</pre>
<h3>Отправка письма</h3>
<pre>@app.route('/send-confirmation', methods=['POST'])
def send_confirmation():
    email = request.json['email']
    msg = Message(
        subject='Подтвердите регистрацию',
        sender='noreply@myapp.com',
        recipients=[email],
        body='Перейдите по ссылке: https://myapp.com/confirm/abc123'
    )
    mail.send(msg)
    return jsonify({'message': 'Письмо отправлено'})</pre>
<h3>HTML-письма</h3>
<pre>msg.html = render_template('email/confirmation.html', confirm_url=url)</pre>
<h3>Почему это стоит делать через Celery</h3>
<p>Реальная отправка email через SMTP может занимать секунды — лучше оборачивать в Celery-задачу.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var row = document.createElement('div');
demoRoot.appendChild(row);
var inbox = document.createElement('pre');
inbox.style.cssText = 'background:#fff;color:#0f172a;padding:12px;border-radius:8px;margin-top:8px;font-family:Consolas,monospace;font-size:12px;white-space:pre-wrap;min-height:40px';
inbox.textContent = '(поштова скринька порожня)';
demoRoot.appendChild(inbox);

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

function sendConfirmation(email) {
  logLine('', '');
  logLine('POST /send-confirmation email=' + email, '#68a063');
  var msg = 'Subject: Підтвердіть реєстрацію\\nFrom: noreply@myapp.com\\nTo: ' + email + '\\n\\nНатисніть посилання: https://myapp.com/confirm/abc123';
  inbox.textContent = msg;
  logLine('← [200]: {"message":"Лист надіслано"} (симуляція SMTP)', '#4ade80');
}

row.appendChild(mkBtn('Надіслати лист на a@x.com', function () { sendConfirmation('a@x.com'); }));
row.appendChild(mkBtn('Надіслати лист на m@x.com', function () { sendConfirmation('m@x.com'); }));`,
    [
      { level:'easy',   uk:'Надішли лист на обидві адреси й подивись на "вміст поштової скриньки", що симулює реальний SMTP-лист.', ru:'Отправь письмо на оба адреса и посмотри на "содержимое почтового ящика".' },
      { level:'medium', uk:'Додай у <code>msg</code> другий рядок теми листа для скидання пароля (окрема кнопка й окремий текст листа).', ru:'Добавь второй тип письма — сброс пароля — с отдельной кнопкой и текстом.' },
      { level:'hard',   uk:'Онови main.py: покажи, як <code>mail.send(msg)</code> варто обгорнути в Celery-задачу <code>send_confirmation_email.delay(email)</code> за зразком уроку 06-10 (опиши код, не обовʼязково виконувати в симуляції).', ru:'Покажи в main.py, как mail.send(msg) стоит обернуть в Celery-задачу по образцу урока 06-10.' },
    ],
    `from flask import Flask, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'app-password'
mail = Mail(app)


@app.route('/send-confirmation', methods=['POST'])
def send_confirmation():
    email = request.json['email']
    msg = Message(
        subject='Підтвердіть реєстрацію',
        sender='noreply@myapp.com',
        recipients=[email],
        body='Натисніть посилання: https://myapp.com/confirm/abc123'
    )
    mail.send(msg)
    return jsonify({'message': 'Лист надіслано'})


if __name__ == '__main__':
    app.run(debug=True)
`
  );

  /* ─── 06-12: Тестування Flask ─────────────────────────────────────── */
  patch('06-12',
    { uk:`<h2>Тестування Flask: pytest та fixtures</h2>
<p>pytest — стандартний фреймворк для тестування Python-коду. Flask надає тестовий клієнт, що симулює HTTP-запити БЕЗ реального запуску сервера.</p>
<h3>Тестовий клієнт</h3>
<pre>import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Привіт' in response.data</pre>
<h3>Тестування REST API</h3>
<pre>def test_create_user(client):
    response = client.post('/api/users', json={'name': 'Тест'})
    assert response.status_code == 201
    data = response.get_json()
    assert data['name'] == 'Тест'</pre>
<h3>Fixtures для повторюваного налаштування</h3>
<pre>@pytest.fixture
def sample_user(client):
    response = client.post('/api/users', json={'name': 'Аліна'})
    return response.get_json()

def test_get_user(client, sample_user):
    response = client.get(f'/api/users/{sample_user["id"]}')
    assert response.status_code == 200</pre>
<h3>Запуск тестів</h3>
<pre>pytest -v
pytest --cov=app  # з покриттям коду тестами</pre>`,
      ru:`<h2>Тестирование Flask: pytest и fixtures</h2>
<p>pytest — стандартный фреймворк для тестирования Python. Flask даёт тестовый клиент для симуляции HTTP-запросов без запуска сервера.</p>
<h3>Тестовый клиент</h3>
<pre>import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200</pre>
<h3>Тестирование REST API</h3>
<pre>def test_create_user(client):
    response = client.post('/api/users', json={'name': 'Тест'})
    assert response.status_code == 201</pre>
<h3>Fixtures для повторяющейся настройки</h3>
<pre>@pytest.fixture
def sample_user(client):
    response = client.post('/api/users', json={'name': 'Алина'})
    return response.get_json()</pre>
<h3>Запуск тестов</h3>
<pre>pytest -v
pytest --cov=app</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var testUsers = [];
var app = createApp();
app.route('/api/users', ['POST'], function (req) {
  var user = { id: testUsers.length + 1, name: req.json.name };
  testUsers.push(user);
  return [user, 201];
});
app.route('/api/users/<int:id>', ['GET'], function (req) {
  var user = testUsers.find(function (u) { return u.id === Number(req.params.id); });
  if (!user) return [{ error: 'Not found' }, 404];
  return user;
});

var passed = 0, failed = 0;
function assertEqual(actual, expected, label) {
  var ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { passed++; logLine(termOut, '  ✓ ' + label, '#4ade80'); }
  else { failed++; logLine(termOut, '  ✕ ' + label + ' (очікували ' + JSON.stringify(expected) + ', отримали ' + JSON.stringify(actual) + ')', '#f87171'); }
}

function runTests() {
  testUsers = [];
  passed = 0; failed = 0;
  logLine(termOut, '', '');
  logLine(termOut, '$ pytest -v', '#68a063');

  logLine(termOut, 'test_create_user:', '#64748b');
  var res1 = app.handle('POST', '/api/users', { name: 'Тест' });
  assertEqual(res1.status, 201, 'response.status_code == 201');
  assertEqual(res1.body.name, 'Тест', 'response.get_json()["name"] == "Тест"');

  logLine(termOut, 'test_get_user:', '#64748b');
  var res2 = app.handle('GET', '/api/users/1');
  assertEqual(res2.status, 200, 'response.status_code == 200');

  logLine(termOut, 'test_get_missing_user:', '#64748b');
  var res3 = app.handle('GET', '/api/users/999');
  assertEqual(res3.status, 404, 'response.status_code == 404');

  logLine(termOut, '', '');
  logLine(termOut, passed + ' passed, ' + failed + ' failed', failed ? '#f87171' : '#4ade80');
}

row.appendChild(mkBtn('▶ pytest -v', runTests));`,
    [
      { level:'easy',   uk:'Натисни кнопку й подивись, як усі тести проходять (passed) — це симуляція <code>client.post</code>/<code>client.get</code> без реального сервера.', ru:'Нажми кнопку и посмотри, как все тесты проходят (passed).' },
      { level:'medium', uk:'Додай новий тест <code>test_create_second_user</code>, що створює ще одного користувача й перевіряє <code>id == 2</code>.', ru:'Добавь тест test_create_second_user, проверяющий id == 2.' },
      { level:'hard',   uk:'Зроби так, щоб один тест НАВМИСНО провалився (наприклад, очікуй <code>status_code == 999</code>) — переконайся, що лічильник <code>failed</code> збільшився і повідомлення показує очікуване й реальне значення.', ru:'Сделай так, чтобы один тест НАРОЧНО провалился — убедись, что failed увеличился.' },
    ],
    `import pytest
from app import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_create_user(client):
    response = client.post('/api/users', json={'name': 'Тест'})
    assert response.status_code == 201
    assert response.get_json()['name'] == 'Тест'


def test_get_user(client):
    client.post('/api/users', json={'name': 'Аліна'})
    response = client.get('/api/users/1')
    assert response.status_code == 200


def test_get_missing_user(client):
    response = client.get('/api/users/999')
    assert response.status_code == 404
`
  );

  /* ─── 06-13: Swagger / OpenAPI ────────────────────────────────────── */
  patch('06-13',
    { uk:`<h2>Документування API: Swagger / OpenAPI</h2>
<p>OpenAPI (раніше Swagger) — стандарт опису REST API у YAML/JSON, що дозволяє автоматично генерувати інтерактивну документацію ("Swagger UI"), де можна одразу тестувати запити прямо з браузера.</p>
<h3>Встановлення (flasgger)</h3>
<pre>pip install flasgger

from flasgger import Swagger
swagger = Swagger(app)</pre>
<h3>Опис маршруту через docstring</h3>
<pre>@app.route('/api/users/&lt;int:id&gt;')
def get_user(id):
    """
    Отримати користувача за id
    ---
    parameters:
      - name: id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: Дані користувача
      404:
        description: Користувача не знайдено
    """
    ...</pre>
<h3>Результат — інтерактивна документація</h3>
<p>Після запуску сервера документація доступна за адресою <code>/apidocs</code> — там видно всі маршрути, параметри, можливі відповіді, і є кнопка "Try it out" для реального тестового запиту прямо з браузера.</p>
<h3>Демо нижче — спрощена галерея ендпоінтів</h3>
<p>Симулює основну ідею Swagger UI: список маршрутів із можливістю одразу "спробувати" запит і побачити відповідь.</p>`,
      ru:`<h2>Документирование API: Swagger / OpenAPI</h2>
<p>OpenAPI (ранее Swagger) — стандарт описания REST API, позволяющий генерировать интерактивную документацию (Swagger UI).</p>
<h3>Установка (flasgger)</h3>
<pre>pip install flasgger

from flasgger import Swagger
swagger = Swagger(app)</pre>
<h3>Описание маршрута через docstring</h3>
<pre>@app.route('/api/users/&lt;int:id&gt;')
def get_user(id):
    """
    Получить пользователя по id
    ---
    parameters:
      - name: id
        in: path
        type: integer
    responses:
      200:
        description: Данные пользователя
      404:
        description: Не найден
    """
    ...</pre>
<h3>Результат — интерактивная документация</h3>
<p>Документация доступна по адресу /apidocs с кнопкой "Try it out".</p>
<h3>Демо ниже — упрощённая галерея эндпоинтов</h3>
<p>Симулирует основную идею Swagger UI.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';

var users = [{ id: 1, name: 'Аліна' }];
var app = createApp();
app.route('/api/users/<int:id>', ['GET'], function (req) {
  var user = users.find(function (u) { return u.id === Number(req.params.id); });
  if (!user) return [{ error: 'Не знайдено' }, 404];
  return user;
});

var endpoints = [
  { method: 'GET', path: '/api/users/1', desc: 'Отримати користувача #1' },
  { method: 'GET', path: '/api/users/99', desc: 'Отримати неіснуючого користувача' }
];

endpoints.forEach(function (ep) {
  var card = document.createElement('div');
  card.style.cssText = 'border:1px solid #334155;border-radius:8px;padding:10px;margin-bottom:8px;background:#0f172a';
  var title = document.createElement('div');
  title.style.cssText = 'color:#7dd3fc;font-family:Consolas,monospace;font-size:12px;margin-bottom:4px';
  title.textContent = ep.method + ' ' + ep.path;
  var desc = document.createElement('div');
  desc.style.cssText = 'color:#94a3b8;font-size:12px;margin-bottom:6px';
  desc.textContent = ep.desc;
  var btn = mkBtn('▶ Try it out', function () {
    logLine(termOut, '', '#64748b');
    logLine(termOut, '→ ' + ep.method + ' ' + ep.path, '#68a063');
    var res = app.handle(ep.method, ep.path);
    logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.body), res.status < 400 ? '#4ade80' : '#f87171');
  });
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(btn);
  demoRoot.appendChild(card);
});`,
    [
      { level:'easy',   uk:'Натисни "Try it out" на обох картках — це та сама ідея, що й у справжньому Swagger UI на <code>/apidocs</code>.', ru:'Нажми "Try it out" на обеих карточках — та же идея, что и в настоящем Swagger UI.' },
      { level:'medium', uk:'Додай третій endpoint-об\'єкт у масив <code>endpoints</code> для маршруту <code>POST /api/users</code> (можеш просто описати картку, не додаючи реальний маршрут в <code>app</code>).', ru:'Добавь третий объект endpoint для маршрута POST /api/users.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши docstring для другого маршруту (наприклад, <code>list_users</code>) за зразком із теорії, включно з описом параметрів і можливих відповідей.', ru:'В main.py допиши docstring для второго маршрута по образцу из теории.' },
    ],
    `from flask import Flask, jsonify
from flasgger import Swagger

app = Flask(__name__)
swagger = Swagger(app)

users = [{'id': 1, 'name': 'Аліна'}]


@app.route('/api/users/<int:id>')
def get_user(id):
    """
    Отримати користувача за id
    ---
    parameters:
      - name: id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: Дані користувача
      404:
        description: Користувача не знайдено
    """
    user = next((u for u in users if u['id'] == id), None)
    if not user:
        return jsonify({'error': 'Не знайдено'}), 404
    return jsonify(user)


if __name__ == '__main__':
    app.run(debug=True)

# Документація доступна на http://127.0.0.1:5000/apidocs
`
  );

  /* ─── 06-14: ФІНАЛ — Flask REST API з JWT та документацією ───────── */
  patch('06-14',
    { uk:`<h2>ПРОЕКТ: Flask REST API із JWT та документацією</h2>
<p>Фінальний проект модуля — REST API для нотаток (notes) з авторизацією через JWT, поєднує все вивчене: маршрутизацію, ORM-подібні запити, валідацію, JWT access/refresh, і документацію.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ <code>POST /login</code> — видає access + refresh токени</li>
  <li>✅ Захищені <code>GET/POST/DELETE /notes</code> — доступні лише з валідним токеном</li>
  <li>✅ Валідація тіла запиту (принцип WTForms з 06-03)</li>
  <li>✅ ORM-подібне сховище нотаток у пам'яті (принцип SQLAlchemy з 06-04)</li>
</ul>
<p>Відкрий вкладку main.py — там повний, ідіоматичний Flask-код, готовий до запуску на реальному комп'ютері з встановленим Flask.</p>`,
      ru:`<h2>ПРОЕКТ: Flask REST API с JWT и документацией</h2>
<p>Финальный проект модуля — REST API для заметок с авторизацией через JWT.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ POST /login — выдаёт access + refresh токены</li>
  <li>✅ Защищённые GET/POST/DELETE /notes</li>
  <li>✅ Валидация тела запроса</li>
  <li>✅ ORM-подобное хранилище заметок в памяти</li>
</ul>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_FLASK_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var notes = [{ id: 1, title: 'Перша нотатка', content: 'Привіт!' }];
var currentAccess = null;

function fakeToken(kind) { return btoa(kind + Date.now()).slice(0, 20); }

function requireAuth(req) {
  return req.headers.token === currentAccess && currentAccess;
}

var app = createApp();
app.route('/login', ['POST'], function (req) {
  currentAccess = fakeToken('access');
  return { access_token: currentAccess };
});
app.route('/notes', ['GET'], function (req) {
  if (!requireAuth(req)) return [{ error: 'Потрібен jwt_required()' }, 401];
  return notes;
});
app.route('/notes', ['POST'], function (req) {
  if (!requireAuth(req)) return [{ error: 'Потрібен jwt_required()' }, 401];
  if (!req.json.title || req.json.title.length < 2) return [{ error: 'title обовʼязковий, мінімум 2 символи' }, 400];
  var note = { id: notes.length + 1, title: req.json.title, content: req.json.content || '' };
  notes.push(note);
  return [note, 201];
});
app.route('/notes/<int:id>', ['DELETE'], function (req) {
  if (!requireAuth(req)) return [{ error: 'Потрібен jwt_required()' }, 401];
  notes = notes.filter(function (n) { return n.id !== Number(req.params.id); });
  return ['', 204];
});

function send(method, path, body, useToken) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path + (useToken === false ? ' (без токена)' : ''), '#68a063');
  var res = app.handle(method, path, body || {}, { token: useToken === false ? null : currentAccess });
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.body), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('POST /login', function () { send('POST', '/login'); }));
row.appendChild(mkBtn('GET /notes (з токеном)', function () { send('GET', '/notes'); }));
row.appendChild(mkBtn('GET /notes (без токена)', function () { send('GET', '/notes', null, false); }));
row.appendChild(mkBtn('POST /notes', function () { send('POST', '/notes', { title: 'Нова нотатка', content: 'Текст' }); }));
row.appendChild(mkBtn('DELETE /notes/1', function () { send('DELETE', '/notes/1'); }));`,
    [
      { level:'easy',   uk:'Спочатку виконай <code>/login</code>, потім спробуй <code>/notes</code> з токеном і без — порівняй результати.', ru:'Сначала выполни /login, затем попробуй /notes с токеном и без — сравни результаты.' },
      { level:'medium', uk:'Спробуй <code>POST /notes</code> з надто коротким <code>title</code> (онови тіло запиту в коді) і переконайся, що спрацьовує валідація зі статусом 400.', ru:'Попробуй POST /notes со слишком коротким title и убедись, что срабатывает валидация 400.' },
      { level:'hard',   uk:'Додай новий захищений маршрут <code>PUT /notes/&lt;int:id&gt;</code>, що оновлює <code>content</code> існуючої нотатки, і кнопку для нього.', ru:'Добавь маршрут PUT /notes/<int:id>, обновляющий content существующей заметки.' },
    ],
    `from datetime import timedelta
from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'change-me-in-production'
jwt = JWTManager(app)

notes = [{'id': 1, 'title': 'Перша нотатка', 'content': 'Привіт!'}]


@app.route('/login', methods=['POST'])
def login():
    access_token = create_access_token(identity=1, expires_delta=timedelta(minutes=15))
    return jsonify(access_token=access_token)


@app.route('/notes', methods=['GET'])
@jwt_required()
def list_notes():
    return jsonify(notes)


@app.route('/notes', methods=['POST'])
@jwt_required()
def create_note():
    data = request.get_json()
    title = data.get('title', '')
    if len(title) < 2:
        return jsonify({'error': 'title обовʼязковий, мінімум 2 символи'}), 400
    note = {'id': len(notes) + 1, 'title': title, 'content': data.get('content', '')}
    notes.append(note)
    return jsonify(note), 201


@app.route('/notes/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_note(id):
    global notes
    notes = [n for n in notes if n['id'] != id]
    return '', 204


if __name__ == '__main__':
    app.run(debug=True)
`
  );

})();
