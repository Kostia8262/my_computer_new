/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 10 — Проект 2: Навчальна платформа · 14–18
   Патчить WEB_LESSONS після завантаження lessons.js

   Той самий підхід, що й у модулі 09 (Gym Tracker): sql.js (реальний
   SQLite/WASM) для схеми даних, fakeDjango JS-симуляція для бекенду
   (type:'python' уроки виконуються через runPythonDemo/new Function),
   справжній React через CDN для фронтенду (type:'web' уроки в
   sandboxed iframe), і чесні термінал-симуляції там, де жодного
   браузерного рушія для теми не існує (Docker, деплой).
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

  /* ─── 10-01: архітектура та ролі ───────────────────────────────────── */
  patch('10-01',
    { uk:`<h2>Платформа навчального центру: архітектура та ролі</h2>
<p>Другий фінальний проект курсу — платформа для онлайн-навчання з трьома ролями: студент, викладач і адміністратор.</p>
<h3>Основні сутності</h3>
<ul>
  <li><strong>Teacher</strong> / <strong>Student</strong> — розширення користувача з роллю</li>
  <li><strong>Course</strong> — курс, що веде викладач</li>
  <li><strong>Lesson</strong> — урок усередині курсу</li>
  <li><strong>Assignment</strong> — домашнє завдання до уроку</li>
</ul>
<h3>Звʼязки</h3>
<ul>
  <li>Teacher ←1:N→ Course (один викладач веде багато курсів)</li>
  <li>Course ←1:N→ Lesson (курс складається з уроків)</li>
  <li>Lesson ←1:N→ Assignment (урок може мати завдання)</li>
  <li>Student ←N:N→ Course (студент записаний на кілька курсів)</li>
</ul>
<h3>SQL-реалізація схеми</h3>
<pre>CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT, teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id));
CREATE TABLE lessons (id INTEGER PRIMARY KEY, course_id INTEGER, title TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id));
CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id));</pre>
<p>Нижче ця схема виконується через справжній sql.js — вона стане основою для Django-моделей у наступному уроці.</p>`,
      ru:`<h2>Платформа учебного центра: архитектура и роли</h2>
<p>Второй финальный проект курса — платформа онлайн-обучения с тремя ролями: студент, преподаватель, администратор.</p>
<h3>Основные сущности</h3>
<ul>
  <li>Teacher / Student — расширение пользователя с ролью</li>
  <li>Course — курс, который ведёт преподаватель</li>
  <li>Lesson — урок внутри курса</li>
  <li>Assignment — домашнее задание к уроку</li>
</ul>
<h3>Связи</h3>
<ul>
  <li>Teacher ←1:N→ Course</li>
  <li>Course ←1:N→ Lesson</li>
  <li>Lesson ←1:N→ Assignment</li>
  <li>Student ←N:N→ Course</li>
</ul>
<h3>SQL-реализация схемы</h3>
<pre>CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT, teacher_id INTEGER);
CREATE TABLE lessons (id INTEGER PRIMARY KEY, course_id INTEGER, title TEXT);
CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER);</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT)",
  "INSERT INTO teachers VALUES (1, 'Ганна Петренко')",
  "CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT, teacher_id INTEGER, FOREIGN KEY (teacher_id) REFERENCES teachers(id))",
  "INSERT INTO courses VALUES (1, 'Основи Python', 1)",
  "CREATE TABLE lessons (id INTEGER PRIMARY KEY, course_id INTEGER, title TEXT, FOREIGN KEY (course_id) REFERENCES courses(id))",
  "INSERT INTO lessons VALUES (1, 1, 'Змінні та типи даних'), (2, 1, 'Цикли')",
  "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT)",
  "INSERT INTO students VALUES (1, 'Марко')",
  "CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER)",
  "INSERT INTO enrollments VALUES (1, 1)"
], function (db) {
  row.appendChild(mkBtn('Усі таблиці схеми', function () {
    runQuery(db, "SELECT name FROM sqlite_master WHERE type='table'", termOut);
  }));
  row.appendChild(mkBtn('Курси викладача + уроки (JOIN)', function () {
    runQuery(db, 'SELECT courses.title AS course, lessons.title AS lesson FROM courses JOIN lessons ON lessons.course_id = courses.id', termOut);
  }));
  row.appendChild(mkBtn('Студент і курси, на які записаний', function () {
    runQuery(db, 'SELECT students.name, courses.title FROM students JOIN enrollments ON enrollments.student_id = students.id JOIN courses ON courses.id = enrollments.course_id', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Виконай усі три запити й переконайся, що схема з чотирьох сутностей коректно відображає звʼязки "викладач → курс → урок" і "студент ↔ курс".', ru:'Выполни все три запроса и убедись, что схема отражает связи "преподаватель → курс → урок" и "студент ↔ курс".' },
      { level:'medium', uk:'У справжньому коді (main.py) додай таблицю <code>assignments</code> зі звʼязком на <code>lessons</code>.', ru:'В main.py добавь таблицу assignments со связью на lessons.' },
      { level:'hard',   uk:'Додай кнопку, що показує КІЛЬКІСТЬ студентів на кожному курсі (JOIN + GROUP BY + COUNT).', ru:'Добавь кнопку, показывающую количество студентов на каждом курсе.' },
    ],
    `-- Повна ER-схема Навчальної платформи

CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE lessons (
    id INTEGER PRIMARY KEY,
    course_id INTEGER,
    title TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE assignments (
    id INTEGER PRIMARY KEY,
    lesson_id INTEGER,
    title TEXT NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE enrollments (
    student_id INTEGER,
    course_id INTEGER,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
`
  );

  /* ─── 10-02: Django моделі ─────────────────────────────────────────── */
  patch('10-02',
    { uk:`<h2>Django моделі: Student, Teacher, Course, Lesson, Assignment</h2>
<pre>from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [('student', 'Студент'), ('teacher', 'Викладач')]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

class Course(models.Model):
    title = models.CharField(max_length=200)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    students = models.ManyToManyField(User, related_name='enrolled_courses', blank=True)

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    order = models.IntegerField(default=0)

class Assignment(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    due_date = models.DateField(null=True, blank=True)</pre>
<p><code>role</code> — простий спосіб розрізняти студентів і викладачів БЕЗ окремих таблиць (детальніше про permissions — у наступному уроці).</p>`,
      ru:`<h2>Django модели: Student, Teacher, Course, Lesson, Assignment</h2>
<pre>from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [('student', 'Студент'), ('teacher', 'Преподаватель')]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

class Course(models.Model):
    title = models.CharField(max_length=200)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    students = models.ManyToManyField(User, related_name='enrolled_courses', blank=True)

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)

class Assignment(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var teachers = [{ id: 1, username: 'hanna', role: 'teacher' }];
var courses = [{ id: 1, title: 'Основи Python', teacher_id: 1, student_ids: [2] }];
var lessons = [{ id: 1, course_id: 1, title: 'Змінні та типи даних' }];
var students = [{ id: 2, username: 'marko', role: 'student' }];

function send(label, fn) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '>>> ' + label, '#68a063');
  logLine(termOut, JSON.stringify(fn()), '#4ade80');
}

row.appendChild(mkBtn('course.teacher (ForeignKey)', function () {
  send('Course.objects.get(id=1).teacher.username', function () {
    var course = courses[0];
    return teachers.find(function (t) { return t.id === course.teacher_id; }).username;
  });
}));
row.appendChild(mkBtn('teacher.courses.all()', function () {
  send('teacher.courses.all()', function () {
    return courses.filter(function (c) { return c.teacher_id === 1; }).map(function (c) { return c.title; });
  });
}));
row.appendChild(mkBtn('course.students.all() (ManyToMany)', function () {
  send('course.students.all()', function () {
    var course = courses[0];
    return course.student_ids.map(function (id) { return students.find(function (s) { return s.id === id; }).username; });
  });
}));
row.appendChild(mkBtn('course.lessons.all()', function () {
  send('course.lessons.all()', function () {
    return lessons.filter(function (l) { return l.course_id === 1; }).map(function (l) { return l.title; });
  });
}));`,
    [
      { level:'easy',   uk:'Спробуй усі чотири кнопки й подивись, як ForeignKey і ManyToMany дозволяють переходити між моделями User/Course/Lesson.', ru:'Попробуй все четыре кнопки и посмотри, как ForeignKey и ManyToMany позволяют переходить между моделями.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай поле <code>order = models.IntegerField(default=0)</code> у модель <code>Lesson</code>, якщо його ще немає, і поясни навіщо воно потрібне.', ru:'В main.py добавь поле order в модель Lesson и объясни, зачем оно нужно.' },
      { level:'hard',   uk:'Додай у симуляцію новий обʼєкт <code>assignments</code> і кнопку, що показує всі завдання конкретного уроку.', ru:'Добавь объект assignments и кнопку, показывающую все задания конкретного урока.' },
    ],
    `from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [('student', 'Студент'), ('teacher', 'Викладач')]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)


class Course(models.Model):
    title = models.CharField(max_length=200)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    students = models.ManyToManyField(User, related_name='enrolled_courses', blank=True)


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']


class Assignment(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    due_date = models.DateField(null=True, blank=True)
`
  );

  /* ─── 10-03: Ролі та permissions ───────────────────────────────────── */
  patch('10-03',
    { uk:`<h2>Ролі та permissions: Teacher vs Student</h2>
<h3>Кастомний permission-клас DRF</h3>
<pre>from rest_framework.permissions import BasePermission

class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'teacher'

class IsCourseTeacherOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        return obj.teacher_id == request.user.id</pre>
<h3>Використання у ViewSet</h3>
<pre>class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated, IsCourseTeacherOrReadOnly]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return Lesson.objects.filter(course__teacher=self.request.user)
        return Lesson.objects.filter(course__students=self.request.user)</pre>
<p>Студент бачить ЛИШЕ уроки курсів, на які записаний; викладач бачить ЛИШЕ уроки СВОЇХ курсів і може їх редагувати — розділення відповідальності на рівні запиту, а не лише інтерфейсу.</p>`,
      ru:`<h2>Роли и permissions: Teacher vs Student</h2>
<h3>Кастомный permission-класс DRF</h3>
<pre>from rest_framework.permissions import BasePermission

class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'teacher'

class IsCourseTeacherOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        return obj.teacher_id == request.user.id</pre>
<h3>Использование в ViewSet</h3>
<pre>class LessonViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsCourseTeacherOrReadOnly]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return Lesson.objects.filter(course__teacher=self.request.user)
        return Lesson.objects.filter(course__students=self.request.user)</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var currentUser = { id: 1, username: 'hanna', role: 'teacher' };
var lessons = [
  { id: 1, title: 'Змінні', course_teacher_id: 1 },
  { id: 2, title: 'Цикли', course_teacher_id: 2 }
];

function isTeacher(user) { return user.role === 'teacher'; }
function canEdit(user, lesson) { return lesson.course_teacher_id === user.id; }

var router = createRouter();
router.path('/api/lessons/1/', ['PUT'], function () {
  if (!isTeacher(currentUser)) return Response({ detail: 'IsTeacher permission failed' }, { status: 403 });
  if (!canEdit(currentUser, lessons[0])) return Response({ detail: 'Not your course' }, { status: 403 });
  return { message: 'Урок оновлено' };
});
router.path('/api/lessons/2/', ['PUT'], function () {
  if (!isTeacher(currentUser)) return Response({ detail: 'IsTeacher permission failed' }, { status: 403 });
  if (!canEdit(currentUser, lessons[1])) return Response({ detail: 'Not your course' }, { status: 403 });
  return { message: 'Урок оновлено' };
});

function send(path) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ PUT ' + path + ' (user=' + currentUser.username + ', role=' + currentUser.role + ')', '#68a063');
  var res = router.resolve('PUT', path, {});
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('PUT /api/lessons/1/ (свій курс)', function () { send('/api/lessons/1/'); }));
row.appendChild(mkBtn('PUT /api/lessons/2/ (чужий курс)', function () { send('/api/lessons/2/'); }));
row.appendChild(mkBtn('Перемкнутись на роль student', function () {
  currentUser = { id: 3, username: 'marko', role: 'student' };
  logLine(termOut, '', '#64748b');
  logLine(termOut, 'Тепер currentUser = marko (role=student)', '#facc15');
}));`,
    [
      { level:'easy',   uk:'Спробуй редагувати СВІЙ і ЧУЖИЙ урок як викладач — переконайся, що <code>IsCourseTeacherOrReadOnly</code> блокує чужі курси.', ru:'Попробуй отредактировать свой и чужой урок как преподаватель — убедись, что блокируются чужие курсы.' },
      { level:'medium', uk:'Перемкнись на роль <code>student</code> і спробуй виконати ту саму дію — переконайся, що спрацьовує <code>IsTeacher</code> (403).', ru:'Переключись на роль student и попробуй то же действие — убедись, что срабатывает IsTeacher (403).' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши permission-клас <code>IsEnrolledStudent</code>, що дозволяє студенту переглядати урок ЛИШЕ якщо він записаний на курс.', ru:'В main.py допиши permission-класс IsEnrolledStudent для студентов, записанных на курс.' },
    ],
    `from rest_framework.permissions import BasePermission
from rest_framework import viewsets, permissions
from .models import Lesson
from .serializers import LessonSerializer


class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'teacher'


class IsCourseTeacherOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        return obj.course.teacher_id == request.user.id


class IsEnrolledStudent(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.course.students.all()


class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated, IsCourseTeacherOrReadOnly]

    def get_queryset(self):
        if self.request.user.role == 'teacher':
            return Lesson.objects.filter(course__teacher=self.request.user)
        return Lesson.objects.filter(course__students=self.request.user)
`
  );

  /* ─── 10-04: Розклад курсів: Calendar та iCal ─────────────────────── */
  patch('10-04',
    { uk:`<h2>Розклад курсів: Calendar та iCal-формат</h2>
<p>iCal (формат <code>.ics</code>, стандарт RFC 5545) дозволяє додати подію в БУДЬ-ЯКИЙ календар (Google Calendar, Apple Calendar, Outlook) одним файлом.</p>
<h3>Django: генерація .ics</h3>
<pre>from icalendar import Calendar, Event
from datetime import datetime

def generate_ics(lesson):
    cal = Calendar()
    event = Event()
    event.add('summary', lesson.title)
    event.add('dtstart', lesson.start_time)
    event.add('dtend', lesson.end_time)
    cal.add_component(event)
    return cal.to_ical()</pre>
<h3>Сирий формат VEVENT (те, що реально всередині .ics файлу)</h3>
<pre>BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Змінні та типи даних
DTSTART:20260715T180000Z
DTEND:20260715T193000Z
END:VEVENT
END:VCALENDAR</pre>
<h3>Ця пісочниця: справжня генерація .ics-тексту</h3>
<p>Демо нижче будує ПРАВИЛЬНИЙ, валідний iCal-текст за реальним алгоритмом форматування дат RFC 5545 (не імітація) — цей текст справді можна зберегти як <code>.ics</code> файл і відкрити в календарі.</p>`,
      ru:`<h2>Расписание курсов: Calendar и iCal-формат</h2>
<p>iCal (.ics, RFC 5545) позволяет добавить событие в любой календарь одним файлом.</p>
<h3>Django: генерация .ics</h3>
<pre>from icalendar import Calendar, Event

def generate_ics(lesson):
    cal = Calendar()
    event = Event()
    event.add('summary', lesson.title)
    event.add('dtstart', lesson.start_time)
    cal.add_component(event)
    return cal.to_ical()</pre>
<h3>Сырой формат VEVENT</h3>
<pre>BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Переменные и типы данных
DTSTART:20260715T180000Z
END:VEVENT
END:VCALENDAR</pre>
<h3>Эта песочница: настоящая генерация .ics-текста</h3>
<p>Демо строит корректный iCal-текст по реальному алгоритму форматирования дат RFC 5545.</p>` },
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

/* Реальне форматування дати за RFC 5545: YYYYMMDDTHHMMSSZ */
function formatIcsDate(date) {
  function pad(n) { return String(n).padStart(2, '0'); }
  return date.getUTCFullYear() + pad(date.getUTCMonth() + 1) + pad(date.getUTCDate()) +
    'T' + pad(date.getUTCHours()) + pad(date.getUTCMinutes()) + pad(date.getUTCSeconds()) + 'Z';
}

function buildIcs(lessons) {
  var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Gym Tracker Edu//UA'];
  lessons.forEach(function (lesson) {
    lines.push('BEGIN:VEVENT');
    lines.push('SUMMARY:' + lesson.title);
    lines.push('DTSTART:' + formatIcsDate(lesson.start));
    lines.push('DTEND:' + formatIcsDate(lesson.end));
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.join('\\n');
}

var lessons = [
  { title: 'Змінні та типи даних', start: new Date('2026-07-15T18:00:00Z'), end: new Date('2026-07-15T19:30:00Z') },
  { title: 'Цикли', start: new Date('2026-07-17T18:00:00Z'), end: new Date('2026-07-17T19:30:00Z') }
];

row.appendChild(mkBtn('Згенерувати .ics для розкладу', function () {
  out.textContent = buildIcs(lessons);
}));
row.appendChild(mkBtn('Завантажити course.ics', function () {
  var blob = new Blob([buildIcs(lessons)], { type: 'text/calendar' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'course.ics';
  a.click();
}));`,
    [
      { level:'easy',   uk:'Згенеруй .ics-текст і переконайся, що дати відповідають формату <code>YYYYMMDDTHHMMSSZ</code> з теорії.', ru:'Сгенерируй .ics-текст и убедись, что даты соответствуют формату YYYYMMDDTHHMMSSZ.' },
      { level:'medium', uk:'Натисни "Завантажити course.ics" — перевір, що файл справді завантажується (це РЕАЛЬНИЙ Blob, не імітація).', ru:'Нажми "Скачать course.ics" — проверь, что файл реально скачивается.' },
      { level:'hard',   uk:'Додай третій урок у масив <code>lessons</code> і переконайся, що згенерований .ics містить ТРИ <code>VEVENT</code>-блоки.', ru:'Добавь третий урок в массив lessons и убедись, что .ics содержит три VEVENT-блока.' },
    ],
    `# pip install icalendar
from icalendar import Calendar, Event
from datetime import datetime


def generate_ics(lessons):
    cal = Calendar()
    cal.add('prodid', '-//Навчальна платформа//UA')
    cal.add('version', '2.0')
    for lesson in lessons:
        event = Event()
        event.add('summary', lesson.title)
        event.add('dtstart', lesson.start_time)
        event.add('dtend', lesson.end_time)
        cal.add_component(event)
    return cal.to_ical()


# views.py
from django.http import HttpResponse

def course_calendar(request, course_id):
    lessons = Lesson.objects.filter(course_id=course_id)
    ics_content = generate_ics(lessons)
    response = HttpResponse(ics_content, content_type='text/calendar')
    response['Content-Disposition'] = 'attachment; filename="course.ics"'
    return response
`
  );

  /* ─── 10-05: React кабінет студента (web) ─────────────────────────── */
  patch('10-05',
    { uk:`<h2>React: кабінет студента — курси та завдання</h2>
<pre>function StudentDashboard({ courses, assignments }) {
  return React.createElement('div', null,
    courses.map(c => React.createElement(CourseCard, { key: c.id, course: c })),
    React.createElement(AssignmentsList, { assignments })
  );
}

function AssignmentsList({ assignments }) {
  const pending = assignments.filter(a => !a.completed);
  return React.createElement('div', null,
    React.createElement('h3', null, \`Завдання (\${pending.length} незавершено)\`),
    pending.map(a => React.createElement('li', { key: a.id }, a.title))
  );
}</pre>
<p>Компонент фільтрує завдання на <code>pending</code> через <code>Array.filter</code> — звичайна React-практика "похідного стану" замість зберігання окремого списку.</p>`,
      ru:`<h2>React: кабинет студента — курсы и задания</h2>
<pre>function StudentDashboard({ courses, assignments }) {
  return React.createElement('div', null,
    courses.map(c => React.createElement(CourseCard, { key: c.id, course: c })),
    React.createElement(AssignmentsList, { assignments })
  );
}

function AssignmentsList({ assignments }) {
  const pending = assignments.filter(a => !a.completed);
  return React.createElement('div', null,
    React.createElement('h3', null, \`Задания (\${pending.length} не завершено)\`)
  );
}</pre>` },
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
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 20px; margin: 0; }
.card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
.done { text-decoration: line-through; color: #64748b; }
button { background: #22c55e; color: #0f172a; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; }`,
    `var e = React.createElement;

var COURSES = [{ id: 1, title: 'Основи Python' }, { id: 2, title: 'React для початківців' }];

function CourseCard(props) {
  return e('div', { className: 'card' }, props.course.title);
}

function AssignmentsList(props) {
  var state = React.useState(props.assignments);
  var assignments = state[0], setAssignments = state[1];

  function toggle(id) {
    setAssignments(assignments.map(function (a) {
      return a.id === id ? Object.assign({}, a, { completed: !a.completed }) : a;
    }));
  }

  var pending = assignments.filter(function (a) { return !a.completed; }).length;

  return e('div', { className: 'card' },
    e('h3', null, 'Завдання (' + pending + ' незавершено)'),
    e('ul', null, assignments.map(function (a) {
      return e('li', { key: a.id, className: a.completed ? 'done' : '' },
        a.title + ' ',
        e('button', { onClick: function () { toggle(a.id); } }, a.completed ? 'Скасувати' : 'Готово')
      );
    }))
  );
}

function StudentDashboard() {
  return e('div', null,
    COURSES.map(function (c) { return e(CourseCard, { key: c.id, course: c }); }),
    e(AssignmentsList, { assignments: [
      { id: 1, title: 'Написати функцію суми', completed: false },
      { id: 2, title: 'Розвʼязати 5 задач на цикли', completed: true }
    ] })
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(StudentDashboard));`,
    [
      { level:'easy',   uk:'Натисни "Готово"/"Скасувати" на завданнях і подивись, як лічильник "незавершено" оновлюється в реальному часі.', ru:'Нажми "Готово"/"Отменить" на заданиях и посмотри, как счётчик обновляется в реальном времени.' },
      { level:'medium', uk:'Додай третій курс у масив <code>COURSES</code>.', ru:'Добавь третий курс в массив COURSES.' },
      { level:'hard',   uk:'Додай нове завдання через кнопку "Додати завдання", що додає новий обʼєкт у стан <code>assignments</code> із унікальним <code>id</code>.', ru:'Добавь кнопку "Добавить задание", добавляющую новый объект в assignments.' },
    ],
    ``
  );

  /* ─── 10-06: React кабінет викладача (web) ────────────────────────── */
  patch('10-06',
    { uk:`<h2>React: кабінет викладача — групи та оцінки</h2>
<pre>function TeacherDashboard({ students }) {
  const [grades, setGrades] = React.useState({});

  function setGrade(studentId, value) {
    setGrades(prev => ({ ...prev, [studentId]: value }));
  }

  return React.createElement('table', null,
    students.map(s => React.createElement('tr', { key: s.id },
      React.createElement('td', null, s.name),
      React.createElement('input', {
        type: 'number', min: 0, max: 100,
        value: grades[s.id] || '',
        onChange: e => setGrade(s.id, e.target.value),
      })
    ))
  );
}</pre>
<p>Обʼєкт <code>grades</code> зберігає оцінки за ключем <code>studentId</code> — типовий патерн "мапи станів" замість окремого <code>useState</code> на кожного студента.</p>`,
      ru:`<h2>React: кабинет преподавателя — группы и оценки</h2>
<pre>function TeacherDashboard({ students }) {
  const [grades, setGrades] = React.useState({});

  function setGrade(studentId, value) {
    setGrades(prev => ({ ...prev, [studentId]: value }));
  }

  return React.createElement('table', null,
    students.map(s => React.createElement('tr', { key: s.id },
      React.createElement('td', null, s.name)
    ))
  );
}</pre>` },
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
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 20px; margin: 0; }
table { border-collapse: collapse; width: 100%; }
td { padding: 6px 10px; border-bottom: 1px solid #334155; }
input { width: 60px; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 4px; padding: 4px; }
.avg { margin-top: 10px; color: #4ade80; font-weight: bold; }`,
    `var e = React.createElement;

var STUDENTS = [{ id: 1, name: 'Марко' }, { id: 2, name: 'Ірина' }, { id: 3, name: 'Аліна' }];

function TeacherDashboard() {
  var state = React.useState({});
  var grades = state[0], setGrades = state[1];

  function setGrade(studentId, value) {
    var next = Object.assign({}, grades);
    next[studentId] = value;
    setGrades(next);
  }

  var values = Object.keys(grades).map(function (k) { return Number(grades[k]); }).filter(function (v) { return !isNaN(v); });
  var avg = values.length ? (values.reduce(function (a, b) { return a + b; }, 0) / values.length).toFixed(1) : '—';

  return e('div', null,
    e('table', null, STUDENTS.map(function (s) {
      return e('tr', { key: s.id },
        e('td', null, s.name),
        e('td', null, e('input', {
          type: 'number', min: 0, max: 100,
          value: grades[s.id] || '',
          onChange: function (ev) { setGrade(s.id, ev.target.value); }
        }))
      );
    })),
    e('p', { className: 'avg' }, 'Середній бал групи: ' + avg)
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(TeacherDashboard));`,
    [
      { level:'easy',   uk:'Постав оцінки всім трьом студентам і подивись, як "Середній бал групи" перераховується автоматично.', ru:'Поставь оценки всем трём студентам и посмотри, как автоматически пересчитывается средний балл группы.' },
      { level:'medium', uk:'Додай четвертого студента в масив <code>STUDENTS</code>.', ru:'Добавь четвёртого студента в массив STUDENTS.' },
      { level:'hard',   uk:'Додай валідацію: якщо оцінка більша за 100 або менша за 0, підсвічуй поле червоним (через умовний <code>style</code>).', ru:'Добавь валидацию: если оценка вне диапазона 0-100, подсвечивай поле красным.' },
    ],
    ``
  );

  /* ─── 10-07: Домашні завдання: завантаження та перевірка ──────────── */
  patch('10-07',
    { uk:`<h2>Домашні завдання: завантаження та перевірка</h2>
<h3>Django: модель здачі завдання</h3>
<pre>class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='submissions/%Y/%m/')
    submitted_at = models.DateTimeField(auto_now_add=True)
    grade = models.IntegerField(null=True, blank=True)
    feedback = models.TextField(blank=True)</pre>
<h3>API здачі роботи</h3>
<pre>class SubmissionView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(status=201)
        return Response(serializer.errors, status=400)</pre>
<h3>Ця пісочниця: справжній File API браузера</h3>
<p>Поле вибору файлу нижче — СПРАВЖНІЙ <code>&lt;input type="file"&gt;</code>, і метадані (імʼя, розмір, тип) читаються реальним <code>File</code>-обʼєктом браузера. Сам "сервер прийому" — чесна fakeDjango-симуляція.</p>`,
      ru:`<h2>Домашние задания: загрузка и проверка</h2>
<h3>Django: модель сдачи задания</h3>
<pre>class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='submissions/%Y/%m/')
    grade = models.IntegerField(null=True, blank=True)
    feedback = models.TextField(blank=True)</pre>
<h3>API сдачи работы</h3>
<pre>class SubmissionView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(status=201)
        return Response(serializer.errors, status=400)</pre>
<h3>Эта песочница: настоящий File API браузера</h3>
<p>Поле выбора файла — настоящий input type="file", метаданные читаются реальным объектом File. "Сервер приёма" — честная fakeDjango-симуляция.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var submissions = [];
var router = createRouter();
router.path('/api/submissions/', ['POST'], function (req) {
  var sub = { id: submissions.length + 1, filename: req.data.filename, size: req.data.size };
  submissions.push(sub);
  return Response(sub, { status: 201 });
});

var input = document.createElement('input');
input.type = 'file';
row.appendChild(input);

var sendBtn = mkBtn('Здати роботу (POST /api/submissions/)', function () {
  if (!input.files || !input.files[0]) {
    logLine(termOut, '', '#64748b');
    logLine(termOut, 'Спочатку обери файл (це справжній input type="file")', '#facc15');
    return;
  }
  var file = input.files[0];
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ POST /api/submissions/ (реальні метадані File API: name=' + file.name + ', size=' + file.size + ' байт, type=' + (file.type || 'невідомо') + ')', '#68a063');
  var res = router.resolve('POST', '/api/submissions/', { filename: file.name, size: file.size });
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), '#4ade80');
});
row.appendChild(sendBtn);

row.appendChild(mkBtn('GET усі здані роботи', function () {
  logLine(termOut, '', '#64748b');
  logLine(termOut, 'submissions: ' + JSON.stringify(submissions), '#4ade80');
}));`,
    [
      { level:'easy',   uk:'Обери будь-який файл на своєму компʼютері й натисни "Здати роботу" — подивись, що метадані (імʼя, розмір) РЕАЛЬНІ, зчитані з твого файлу.', ru:'Выбери любой файл на компьютере и нажми "Сдать работу" — посмотри, что метаданные реальные.' },
      { level:'medium', uk:'Здай ДРУГИЙ файл, потім натисни "GET усі здані роботи" — переконайся, що обидва записи збереглися.', ru:'Сдай второй файл, затем нажми "GET все сданные работы" — убедись, что оба сохранились.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши перевірку розміру файлу — заборони здачу файлів БІЛЬШЕ 10 МБ, повертаючи помилку валідації.', ru:'В main.py допиши проверку размера файла — запрети файлы больше 10 МБ.' },
    ],
    `from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from .models import Submission


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'assignment', 'file', 'submitted_at']

    def validate_file(self, value):
        max_size = 10 * 1024 * 1024
        if value.size > max_size:
            raise serializers.ValidationError('Файл занадто великий (максимум 10 МБ)')
        return value


class SubmissionView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
`
  );

  /* ─── 10-08: Журнал оцінок (web) ───────────────────────────────────── */
  patch('10-08',
    { uk:`<h2>Журнал оцінок: таблиця, статистика та прогрес</h2>
<p>Реальний Chart.js для візуалізації прогресу студента за курсом (та сама бібліотека, що й у 09-07).</p>
<h3>Обчислення статистики</h3>
<pre>function computeStats(grades) {
  const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
  const trend = grades[grades.length - 1] - grades[0];
  return { avg: avg.toFixed(1), trend };
}</pre>
<h3>Графік прогресу</h3>
<pre>new Chart(ctx, {
  type: 'line',
  data: {
    labels: assignments.map(a => a.title),
    datasets: [{ label: 'Оцінка', data: grades, borderColor: '#22c55e' }],
  },
});</pre>`,
      ru:`<h2>Журнал оценок: таблица, статистика и прогресс</h2>
<p>Реальный Chart.js для визуализации прогресса студента (та же библиотека, что и в 09-07).</p>
<h3>Вычисление статистики</h3>
<pre>function computeStats(grades) {
  const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
  const trend = grades[grades.length - 1] - grades[0];
  return { avg: avg.toFixed(1), trend };
}</pre>
<h3>График прогресса</h3>
<pre>new Chart(ctx, {
  type: 'line',
  data: { labels: assignments.map(a => a.title), datasets: [{ data: grades }] },
});</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<div id="stats"></div>
<canvas id="progressChart" height="200"></canvas>
</body>
</html>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
#stats { margin-bottom: 12px; font-size: 14px; }
.up { color: #4ade80; } .down { color: #f87171; }`,
    `var assignments = ['ДЗ 1', 'ДЗ 2', 'ДЗ 3', 'ДЗ 4', 'Контрольна'];
var grades = [72, 78, 81, 85, 90];

function computeStats(values) {
  var avg = values.reduce(function (a, b) { return a + b; }, 0) / values.length;
  var trend = values[values.length - 1] - values[0];
  return { avg: avg.toFixed(1), trend: trend };
}

var stats = computeStats(grades);
var statsEl = document.getElementById('stats');
statsEl.innerHTML = 'Середній бал: <strong>' + stats.avg + '</strong> · Динаміка: ' +
  '<span class="' + (stats.trend >= 0 ? 'up' : 'down') + '">' + (stats.trend >= 0 ? '+' : '') + stats.trend + '</span>';

var ctx = document.getElementById('progressChart');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: assignments,
    datasets: [{ label: 'Оцінка', data: grades, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,.2)', tension: 0.3 }]
  },
  options: { scales: { y: { min: 0, max: 100 } } }
});`,
    [
      { level:'easy',   uk:'Подивись на графік прогресу й на обчислену статистику — переконайся, що "Динаміка" правильно показує різницю між першою й останньою оцінкою.', ru:'Посмотри на график прогресса и статистику — убедись, что "Динамика" верно показывает разницу между первой и последней оценкой.' },
      { level:'medium', uk:'Зміни масив <code>grades</code> так, щоб останні оцінки були НИЖЧЕ перших, і переконайся, що "Динаміка" стає ВІДʼЄМНОЮ (червоний колір).', ru:'Измени grades так, чтобы последние оценки были ниже первых — убедись, что "Динамика" становится отрицательной.' },
      { level:'hard',   uk:'Додай у <code>computeStats</code> обчислення МЕДІАНИ оцінок (не лише середнього) і виведи її поруч зі статистикою.', ru:'Добавь в computeStats вычисление медианы оценок.' },
    ],
    ``
  );

  /* ─── 10-09: Email-сповіщення: Celery + SMTP ──────────────────────── */
  patch('10-09',
    { uk:`<h2>Email-сповіщення: Celery + SMTP</h2>
<p>Той самий принцип фонових задач, що й у 06-10/06-11, тепер для сповіщень про нові домашні завдання й оцінки.</p>
<pre>from celery import shared_task
from django.core.mail import send_mail

@shared_task
def notify_new_assignment(student_email, assignment_title):
    send_mail(
        subject='Нове домашнє завдання',
        message=f'Додано нове завдання: {assignment_title}',
        from_email='noreply@edu-platform.com',
        recipient_list=[student_email],
    )

@shared_task
def notify_grade(student_email, assignment_title, grade):
    send_mail(
        subject='Оцінка за завдання',
        message=f'Твоя оцінка за "{assignment_title}": {grade}/100',
        from_email='noreply@edu-platform.com',
        recipient_list=[student_email],
    )</pre>
<h3>Виклик із view</h3>
<pre>def grade_submission(request, submission_id):
    submission = get_object_or_404(Submission, id=submission_id)
    submission.grade = request.data['grade']
    submission.save()
    notify_grade.delay(submission.student.email, submission.assignment.title, submission.grade)
    return Response({'message': 'Оцінку виставлено'})</pre>`,
      ru:`<h2>Email-уведомления: Celery + SMTP</h2>
<p>Тот же принцип фоновых задач, что и в 06-10/06-11, теперь для уведомлений о новых заданиях и оценках.</p>
<pre>from celery import shared_task
from django.core.mail import send_mail

@shared_task
def notify_grade(student_email, assignment_title, grade):
    send_mail(
        subject='Оценка за задание',
        message=f'Твоя оценка за "{assignment_title}": {grade}/100',
        from_email='noreply@edu-platform.com',
        recipient_list=[student_email],
    )</pre>
<h3>Вызов из view</h3>
<pre>def grade_submission(request, submission_id):
    submission = get_object_or_404(Submission, id=submission_id)
    submission.grade = request.data['grade']
    submission.save()
    notify_grade.delay(submission.student.email, submission.assignment.title, submission.grade)
    return Response({'message': 'Оценка выставлена'})</pre>` },
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

function notifyGrade(student, title, grade) {
  taskId++;
  var id = 'task-' + taskId;
  logLine('', '');
  logLine('POST /api/submissions/1/grade/ grade=' + grade + ' -> notify_grade.delay(...) [' + id + ']', '#68a063');
  logLine('← [200]: {"message":"Оцінку виставлено"}', '#4ade80');
  setTimeout(function () { logLine('  [celery worker] ' + id + ': send_mail(...) виконується...', '#facc15'); }, 500);
  setTimeout(function () {
    logLine('  [celery worker] ' + id + ' завершено: лист "Оцінка за \\'' + title + '\\': ' + grade + '/100" надіслано на ' + student, '#4ade80');
  }, 1400);
}

row.appendChild(mkBtn('Виставити оцінку 92/100', function () { notifyGrade('marko@example.com', 'Контрольна', 92); }));
row.appendChild(mkBtn('Виставити оцінку 68/100', function () { notifyGrade('irina@example.com', 'ДЗ 3', 68); }));`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки й подивись, як відповідь API приходить одразу (202-подібно), а email "надсилається" у фоні із затримкою.', ru:'Нажми обе кнопки и посмотри, как ответ API приходит сразу, а email отправляется в фоне с задержкой.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нову задачу <code>notify_new_assignment</code>, що сповіщає ВСІХ студентів курсу про нове завдання (цикл по <code>course.students.all()</code>).', ru:'В main.py добавь задачу notify_new_assignment, уведомляющую всех студентов курса.' },
      { level:'hard',   uk:'Додай третю кнопку, що викликає <code>notifyGrade</code> ОДРАЗУ для трьох різних студентів підряд, і подивись, чи всі три фонові задачі завершуються незалежно.', ru:'Добавь кнопку, вызывающую notifyGrade сразу для трёх студентов подряд.' },
    ],
    `from celery import shared_task
from django.core.mail import send_mail


@shared_task
def notify_new_assignment(course_id, assignment_title):
    from .models import Course
    course = Course.objects.get(id=course_id)
    emails = [s.email for s in course.students.all()]
    send_mail(
        subject='Нове домашнє завдання',
        message=f'Додано нове завдання: {assignment_title}',
        from_email='noreply@edu-platform.com',
        recipient_list=emails,
    )


@shared_task
def notify_grade(student_email, assignment_title, grade):
    send_mail(
        subject='Оцінка за завдання',
        message=f'Твоя оцінка за "{assignment_title}": {grade}/100',
        from_email='noreply@edu-platform.com',
        recipient_list=[student_email],
    )
`
  );

  /* ─── 10-10: Чат (Django Channels) ─────────────────────────────────── */
  patch('10-10',
    { uk:`<h2>Чат між студентом і викладачем (Django Channels)</h2>
<p>Той самий принцип WebSocket-груп, що й у 07-15, тепер для приватного чату 1:1 замість загальної кімнати.</p>
<pre>class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = f'chat_{min(self.user_id, self.other_id)}_{max(self.user_id, self.other_id)}'
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(self.room_name, {
            'type': 'chat_message',
            'message': data['message'],
            'sender': self.scope['user'].username,
        })

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
        }))</pre>
<p>Назва кімнати будується з <code>min/max</code> двох ID користувачів — так вона ЗАВЖДИ однакова для конкретної пари, незалежно від того, хто ініціює зʼєднання першим.</p>`,
      ru:`<h2>Чат между студентом и преподавателем (Django Channels)</h2>
<p>Тот же принцип WebSocket-групп, что и в 07-15, теперь для приватного чата 1:1.</p>
<pre>class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = f'chat_{min(self.user_id, self.other_id)}_{max(self.user_id, self.other_id)}'
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(self.room_name, {
            'type': 'chat_message',
            'message': data['message'],
            'sender': self.scope['user'].username,
        })</pre>` },
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

var connected = [];
var roomName = 'chat_1_2';

function connect(username) {
  connected.push(username);
  logLine('', '');
  logLine('[WS ' + roomName + '] ' + username + ': connect() -> group_add()', '#68a063');
}

function sendMessage(sender, message) {
  if (connected.indexOf(sender) === -1) {
    logLine('[WS] ' + sender + ' ще не підключений', '#f87171');
    return;
  }
  logLine('', '');
  logLine('[WS ' + roomName + '] ' + sender + ' -> group_send(chat_message)', '#68a063');
  connected.forEach(function (user) {
    logLine('[WS] ' + user + ' <- "' + message + '" (від ' + sender + ')', '#4ade80');
  });
  var p = document.createElement('div');
  p.textContent = sender + ': ' + message;
  chatLog.appendChild(p);
}

row.appendChild(mkBtn('connect(Марко — студент)', function () { connect('Марко'); }));
row.appendChild(mkBtn('connect(Ганна — викладач)', function () { connect('Ганна'); }));
row.appendChild(mkBtn('Марко: "Можна питання по ДЗ?"', function () { sendMessage('Марко', 'Можна питання по ДЗ?'); }));
row.appendChild(mkBtn('Ганна: "Так, звичайно!"', function () { sendMessage('Ганна', 'Так, звичайно!'); }));`,
    [
      { level:'easy',   uk:'Підключи ОБОХ учасників, потім обміняйтесь повідомленнями — переконайся, що <code>group_send</code> доставляє повідомлення ОБОМ підключеним.', ru:'Подключи обоих участников, затем обменяйтесь сообщениями — убедись, что group_send доставляет обоим.' },
      { level:'medium', uk:'Спробуй надіслати повідомлення від імені НЕ підключеного учасника — переконайся, що симуляція про це повідомляє.', ru:'Попробуй отправить сообщение от неподключённого участника — убедись, что симуляция сообщает об этом.' },
      { level:'hard',   uk:'У справжньому коді (main.py) поясни коментарем, чому назва кімнати будується саме через <code>min(id1, id2)</code>/<code>max(id1, id2)</code>, а не просто <code>f"chat_{id1}_{id2}"</code>.', ru:'В main.py объясни комментарием, почему имя комнаты строится через min/max, а не просто через порядок ID.' },
    ],
    `import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user_id = self.scope['user'].id
        other_id = int(self.scope['url_route']['kwargs']['other_id'])
        # min/max гарантує ОДНАКОВУ назву кімнати незалежно від того,
        # хто з двох учасників підключається першим
        self.room_name = f'chat_{min(user_id, other_id)}_{max(user_id, other_id)}'
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(self.room_name, {
            'type': 'chat_message',
            'message': data['message'],
            'sender': self.scope['user'].username,
        })

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
        }))
`
  );

  /* ─── 10-11: React адаптивна мобільна версія (web) ─────────────────── */
  patch('10-11',
    { uk:`<h2>React: адаптивна мобільна версія</h2>
<p>Той самий принцип, що й у 09-11, застосований до інтерфейсу навчальної платформи: сітка курсів перетворюється на одну колонку на малих екранах.</p>
<pre>.courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

@media (max-width: 768px) {
  .courses-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .course-card { padding: 8px; font-size: 13px; }
}</pre>
<p>Кілька медіа-запитів (не лише один) дозволяють тонше налаштувати вигляд для РІЗНИХ розмірів екранів — телефон, планшет, десктоп.</p>`,
      ru:`<h2>React: адаптивная мобильная версия</h2>
<p>Тот же принцип, что и в 09-11, применён к интерфейсу учебной платформы.</p>
<pre>.courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

@media (max-width: 768px) {
  .courses-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .course-card { padding: 8px; font-size: 13px; }
}</pre>` },
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
.courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.course-card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 14px; }
.hint { color: #facc15; font-size: 12px; margin-bottom: 10px; }
@media (max-width: 768px) {
  .courses-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .course-card { padding: 8px; font-size: 13px; }
}`,
    `var e = React.createElement;

var COURSES = ['Основи Python', 'React для початківців', 'Django REST API', 'Основи SQL'];

function CoursesGrid() {
  return e('div', null,
    e('p', { className: 'hint' }, 'Зменш вікно (⤢ у новій вкладці), щоб побачити перехід 3 → 1 колонка.'),
    e('div', { className: 'courses-grid' }, COURSES.map(function (title, i) {
      return e('div', { className: 'course-card', key: i }, title);
    }))
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(CoursesGrid));`,
    [
      { level:'easy',   uk:'Відкрий у новій вкладці й зменш ширину вікна — подивись на два пороги адаптивності (768px і 480px).', ru:'Открой в новой вкладке и уменьши ширину окна — посмотри на два порога адаптивности (768px и 480px).' },
      { level:'medium', uk:'Додай пʼятий курс у масив <code>COURSES</code>.', ru:'Добавь пятый курс в массив COURSES.' },
      { level:'hard',   uk:'Додай третій медіа-запит для екранів ширше <code>1200px</code>, де сітка стає 4-колонковою.', ru:'Добавь третий медиа-запрос для экранов шире 1200px, где сетка становится 4-колоночной.' },
    ],
    ``
  );

  /* ─── 10-12: i18n у React (react-i18next) (web) ───────────────────── */
  patch('10-12',
    { uk:`<h2>Internationalization: i18n у React (react-i18next)</h2>
<p>react-i18next — стандартна бібліотека локалізації React-застосунків (та сама ідея, що й у самій цій платформі — перемикач UA/RU!).</p>
<h3>Налаштування (реальний код)</h3>
<pre>import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: { welcome: 'Привіт, {{name}}!', courses: 'Курси' } },
    en: { translation: { welcome: 'Hello, {{name}}!', courses: 'Courses' } },
  },
  lng: 'uk',
  fallbackLng: 'uk',
});

function Header() {
  const { t, i18n } = useTranslation();
  return React.createElement('div', null,
    React.createElement('h1', null, t('welcome', { name: 'Марко' })),
    React.createElement('button', { onClick: () => i18n.changeLanguage('en') }, 'EN')
  );
}</pre>
<h3>Ця пісочниця: спрощений, але СПРАВЖНІЙ i18n-рушій</h3>
<p>Демо нижче не підключає саму бібліотеку react-i18next через CDN (вона розрахована на збірку через бандлер), але реалізує ідентичну ідею — функцію <code>t(key)</code> зі словником і підстановкою змінних — яка РЕАЛЬНО працює в React-стані нижче.</p>`,
      ru:`<h2>Internationalization: i18n в React (react-i18next)</h2>
<p>react-i18next — стандартная библиотека локализации React (та же идея, что и в этой платформе — переключатель UA/RU!).</p>
<h3>Настройка (реальный код)</h3>
<pre>import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: { welcome: 'Привет, {{name}}!' } },
    en: { translation: { welcome: 'Hello, {{name}}!' } },
  },
  lng: 'ru',
});

function Header() {
  const { t, i18n } = useTranslation();
  return React.createElement('h1', null, t('welcome', { name: 'Марк' }));
}</pre>
<h3>Эта песочница: упрощённый, но настоящий i18n-движок</h3>
<p>Демо реализует ту же идею — функцию t(key) со словарём и подстановкой переменных, — которая реально работает в React-состоянии ниже.</p>` },
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
button { background: #1e293b; border: 1px solid #334155; color: #e2e8f0; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-right: 6px; }
button.active { background: #22c55e; color: #0f172a; }`,
    `var e = React.createElement;

var RESOURCES = {
  uk: { welcome: 'Привіт, {{name}}!', courses: 'Курси', assignments: 'Завдання' },
  en: { welcome: 'Hello, {{name}}!', courses: 'Courses', assignments: 'Assignments' },
  ru: { welcome: 'Привет, {{name}}!', courses: 'Курсы', assignments: 'Задания' }
};

/* Справжня, хоч і спрощена, реалізація t(key, vars) з підстановкою {{var}} */
function translate(lang, key, vars) {
  var template = (RESOURCES[lang] && RESOURCES[lang][key]) || key;
  var result = template;
  if (vars) {
    Object.keys(vars).forEach(function (v) {
      result = result.split('{{' + v + '}}').join(vars[v]);
    });
  }
  return result;
}

function App() {
  var state = React.useState('uk');
  var lang = state[0], setLang = state[1];

  function t(key, vars) { return translate(lang, key, vars); }

  return e('div', null,
    e('h1', null, t('welcome', { name: 'Марко' })),
    e('p', null, t('courses') + ' / ' + t('assignments')),
    e('div', null,
      ['uk', 'en', 'ru'].map(function (code) {
        return e('button', {
          key: code,
          className: lang === code ? 'active' : '',
          onClick: function () { setLang(code); }
        }, code.toUpperCase());
      })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(App));`,
    [
      { level:'easy',   uk:'Перемикай мову між UA/EN/RU і подивись, як текст <code>t(\'welcome\')</code> і <code>t(\'courses\')</code> реально змінюється — це справжня, а не імітована логіка.', ru:'Переключай язык между UA/EN/RU и посмотри, как текст реально меняется.' },
      { level:'medium', uk:'Додай новий ключ <code>logout</code> у ВСІ три мови в <code>RESOURCES</code> і виведи його на екран.', ru:'Добавь ключ logout во все три языка в RESOURCES и выведи его на экран.' },
      { level:'hard',   uk:'Додай підтримку множини — новий ключ <code>coursesCount</code> зі значеннями типу <code>"{{count}} курс(ів)"</code>, і виведи його з реальним числом курсів.', ru:'Добавь ключ coursesCount с подстановкой количества курсов.' },
    ],
    ``
  );

  /* ─── 10-13: Тестування (web, за замовчуванням) ───────────────────── */
  patch('10-13',
    { uk:`<h2>Тестування: pytest-django + React Testing Library</h2>
<h3>pytest-django (бекенд)</h3>
<pre>import pytest
from .factories import CourseFactory

@pytest.mark.django_db
def test_course_creation():
    course = CourseFactory(title='Тестовий курс')
    assert course.title == 'Тестовий курс'</pre>
<h3>React Testing Library (фронтенд)</h3>
<pre>import { render, screen, fireEvent } from '@testing-library/react';

test('toggle assignment marks it done', () => {
  render(&lt;AssignmentItem title="ДЗ 1" /&gt;);
  fireEvent.click(screen.getByText('Готово'));
  expect(screen.getByText('ДЗ 1')).toHaveClass('done');
});</pre>
<h3>Ця пісочниця: справжні перевірки на РЕАЛЬНОМУ DOM</h3>
<p>Демо нижче рендерить справжній React-компонент, а тести виконують РЕАЛЬНІ DOM-запити (<code>document.querySelector</code>) й перевірки — так само, як RTL, лише без окремого пакета.</p>`,
      ru:`<h2>Тестирование: pytest-django + React Testing Library</h2>
<h3>pytest-django (бекенд)</h3>
<pre>import pytest
from .factories import CourseFactory

@pytest.mark.django_db
def test_course_creation():
    course = CourseFactory(title='Тестовый курс')
    assert course.title == 'Тестовый курс'</pre>
<h3>React Testing Library (фронтенд)</h3>
<pre>import { render, screen, fireEvent } from '@testing-library/react';

test('toggle assignment marks it done', () => {
  render(&lt;AssignmentItem title="ДЗ 1" /&gt;);
  fireEvent.click(screen.getByText('Готово'));
  expect(screen.getByText('ДЗ 1')).toHaveClass('done');
});</pre>
<h3>Эта песочница: настоящие проверки на реальном DOM</h3>
<p>Демо рендерит настоящий React-компонент, а тесты выполняют реальные DOM-запросы и проверки.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
<div id="root"></div>
<div id="test-results"></div>
<button id="run-tests">▶ pytest / RTL</button>
</body>
</html>`,
    `body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 16px; }
#test-results { margin-top: 12px; font-family: Consolas, monospace; font-size: 13px; }
#run-tests { background: #22c55e; color: #0f172a; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-top: 10px; }
.done { text-decoration: line-through; color: #64748b; }`,
    `var e = React.createElement;

function AssignmentItem(props) {
  var state = React.useState(false);
  var done = state[0], setDone = state[1];
  return e('li', { id: 'assignment-item', className: done ? 'done' : '' },
    props.title + ' ',
    e('button', { id: 'toggle-btn', onClick: function () { setDone(!done); } }, 'Готово')
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(AssignmentItem, { title: 'ДЗ 1' }));

var resultsEl = document.getElementById('test-results');
var passed = 0, failed = 0;

function assertTrue(cond, label) {
  if (cond) { passed++; resultsEl.innerHTML += '<div style="color:#4ade80">✓ ' + label + '</div>'; }
  else { failed++; resultsEl.innerHTML += '<div style="color:#f87171">✕ ' + label + '</div>'; }
}

function runTests() {
  resultsEl.innerHTML = '';
  passed = 0; failed = 0;

  var item = document.getElementById('assignment-item');
  assertTrue(item.textContent.indexOf('ДЗ 1') !== -1, 'screen.getByText("ДЗ 1") знайдено');
  assertTrue(!item.className.includes('done'), 'спочатку завдання НЕ позначено як done');

  document.getElementById('toggle-btn').click();

  setTimeout(function () {
    var itemAfter = document.getElementById('assignment-item');
    assertTrue(itemAfter.className.indexOf('done') !== -1, 'після fireEvent.click(toggle) клас "done" зʼявився');
    resultsEl.innerHTML += '<div style="margin-top:6px">' + passed + ' passed, ' + failed + ' failed</div>';
  }, 50);
}

document.getElementById('run-tests').addEventListener('click', runTests);`,
    [
      { level:'easy',   uk:'Натисни "pytest / RTL" і подивись, як тест реально клікає на кнопку РЕНДЕРЕНОГО React-компонента й перевіряє зміну класу.', ru:'Нажми "pytest / RTL" и посмотри, как тест реально кликает на кнопку и проверяет изменение класса.' },
      { level:'medium', uk:'Додай новий тест, що перевіряє ТЕКСТ кнопки (<code>"Готово"</code>) через <code>querySelector(\'#toggle-btn\').textContent</code>.', ru:'Добавь тест, проверяющий текст кнопки через querySelector.' },
      { level:'hard',   uk:'Зроби так, щоб ОДИН тест НАВМИСНЕ провалився (наприклад, очікуй текст "Помилка"), і переконайся, що звіт коректно показує <code>passed</code>/<code>failed</code>.', ru:'Сделай так, чтобы один тест нарочно провалился — убедись, что отчёт корректен.' },
    ],
    ``
  );

  /* ─── 10-14: Docker + Nginx для продакшну ─────────────────────────── */
  patch('10-14',
    { uk:`<h2>Docker + Nginx конфігурація для продакшну</h2>
<pre>version: '3.9'

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: edu_platform

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
    depends_on: [db]

  frontend:
    build: ./frontend

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    ports:
      - "80:80"
    depends_on: [backend, frontend]</pre>
<h3>nginx.conf</h3>
<pre>server {
    listen 80;
    location /api/ { proxy_pass http://backend:8000; }
    location / { proxy_pass http://frontend:3000; }
}</pre>`,
      ru:`<h2>Docker + Nginx конфигурация для продакшна</h2>
<pre>version: '3.9'

services:
  db:
    image: postgres:16

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
    depends_on: [db]

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    ports: ["80:80"]
    depends_on: [backend, frontend]</pre>
<h3>nginx.conf</h3>
<pre>server {
    listen 80;
    location /api/ { proxy_pass http://backend:8000; }
    location / { proxy_pass http://frontend:3000; }
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

function runUp() {
  logLine('', '');
  logLine('$ docker-compose up --build', '#68a063');
  setTimeout(function () { logLine('db       | ready to accept connections', '#4ade80'); }, 300);
  setTimeout(function () { logLine('backend  | gunicorn listening at :8000', '#4ade80'); }, 700);
  setTimeout(function () { logLine('frontend | build compiled', '#4ade80'); }, 1000);
  setTimeout(function () { logLine('nginx    | proxying /api/ -> backend:8000, / -> frontend:3000', '#4ade80'); }, 1300);
}

row.appendChild(mkBtn('docker-compose up --build', runUp));`,
    [
      { level:'easy',   uk:'Виконай <code>up --build</code> і подивись, як <code>nginx</code> стартує ОСТАННІМ (він залежить від <code>backend</code> і <code>frontend</code>).', ru:'Выполни up --build и посмотри, как nginx стартует последним.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши <code>nginx.conf</code>-правило для роздачі СТАТИЧНИХ файлів (<code>/static/</code>) напряму, без проксі на Django.', ru:'В main.py допиши правило nginx.conf для отдачи статики напрямую.' },
      { level:'hard',   uk:'Додай сервіс <code>redis</code> у docker-compose (потрібен для Celery з 10-09) і онови <code>depends_on</code> у <code>backend</code>.', ru:'Добавь сервис redis в docker-compose и обнови depends_on у backend.' },
    ],
    `version: '3.9'

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: edu_platform
      POSTGRES_PASSWORD: secret

  redis:
    image: redis:7

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000
    depends_on:
      - db
      - redis

  frontend:
    build: ./frontend

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./static:/static
    ports:
      - "80:80"
    depends_on:
      - backend
      - frontend

# nginx.conf:
# server {
#     listen 80;
#     location /static/ { alias /static/; }
#     location /api/ { proxy_pass http://backend:8000; }
#     location / { proxy_pass http://frontend:3000; }
# }
`
  );

  /* ─── 10-15: ФІНАЛ 2 — деплой ───────────────────────────────────────── */
  patch('10-15',
    { uk:`<h2>ФІНАЛ 2: Навчальна платформа — деплой</h2>
<p>Другий фінальний проект курсу завершено: платформа з ролями студент/викладач, курсами, домашніми завданнями, чатом і сповіщеннями розгортається на сервер.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ Django-моделі з ролями (Teacher/Student) і permissions</li>
  <li>✅ React-кабінети студента й викладача</li>
  <li>✅ Домашні завдання з реальним File API</li>
  <li>✅ Чат у реальному часі (Django Channels), Celery-сповіщення</li>
  <li>✅ i18n, адаптивність, тестування</li>
</ul>
<h3>Деплой</h3>
<pre>git pull origin main
docker-compose up -d --build
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py collectstatic --noinput</pre>`,
      ru:`<h2>ФИНАЛ 2: Учебная платформа — деплой</h2>
<p>Второй финальный проект курса завершён: платформа с ролями студент/преподаватель, курсами, домашними заданиями, чатом и уведомлениями разворачивается на сервер.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ Django-модели с ролями и permissions</li>
  <li>✅ React-кабинеты студента и преподавателя</li>
  <li>✅ Домашние задания с реальным File API</li>
  <li>✅ Чат в реальном времени, Celery-уведомления</li>
  <li>✅ i18n, адаптивность, тестирование</li>
</ul>
<h3>Деплой</h3>
<pre>git pull origin main
docker-compose up -d --build
docker-compose exec backend python manage.py migrate</pre>` },
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
    ['$ docker-compose up -d --build', '#68a063'],
    ['$ docker-compose exec backend python manage.py migrate', '#68a063'],
    ['$ docker-compose exec backend python manage.py collectstatic --noinput', '#68a063'],
    ['$ docker-compose exec backend python manage.py createsuperuser --noinput', '#68a063'],
    ['✓ Деплой завершено. Навчальна платформа доступна на https://edu-platform.com', '#4ade80']
  ];
  steps.forEach(function (step, i) {
    setTimeout(function () { logLine(step[0], step[1]); }, i * 350);
  });
}

row.appendChild(mkBtn('🚀 Задеплоїти на VPS', runDeploy));`,
    [
      { level:'easy',   uk:'Натисни "Задеплоїти на VPS" і подивись на повну послідовність кроків реального деплою Django+React-проекту через Docker Compose.', ru:'Нажми "Задеплоить на VPS" и посмотри на полную последовательность шагов реального деплоя.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши, яку команду треба виконати, щоб застосувати НОВУ міграцію ПІСЛЯ зміни моделі <code>Course</code> вже НА сервері (без повного передеплою).', ru:'В main.py допиши команду применения новой миграции на сервере без полного передеплоя.' },
      { level:'hard',   uk:'Додай у <code>runDeploy</code> крок <code>pytest</code> ПЕРЕД <code>docker-compose up</code>, і поясни коментарем, чому тести варто ганяти локально/у CI ДО деплою, а не після.', ru:'Добавь шаг pytest перед docker-compose up и объясни, почему тесты стоит гонять до деплоя.' },
    ],
    `# Послідовність деплою Навчальної платформи

# 1. Тести ДО деплою (локально або в CI — модуль 10-13)
# pytest

# 2. Оновлення коду на сервері
# git pull origin main

# 3. Перезбірка й перезапуск контейнерів
# docker-compose up -d --build

# 4. Застосування міграцій (в тому числі окремо, без повного передеплою)
# docker-compose exec backend python manage.py migrate

# 5. Статичні файли
# docker-compose exec backend python manage.py collectstatic --noinput

# Готово: Навчальна платформа — другий фінальний проект курсу — розгорнута.
`
  );

})();
