/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 11 — Проект 3: E-commerce · 14–18
   Патчить WEB_LESSONS після завантаження lessons.js

   Той самий підхід, що й у модулях 09-10: sql.js (реальний
   SQLite/WASM) для схеми даних, fakeDjango JS-симуляція для бекенду,
   справжній React через CDN для фронтенду, реальні алгоритми/формати
   там, де це можливо (similarity-алгоритм, sitemap.xml/robots.txt),
   і чесно позначена симуляція там, де реальний зовнішній сервіс
   підключити неможливо без справжніх API-ключів (Stripe).
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

  /* ─── 11-01: архітектура, MVP та компоненти ───────────────────────── */
  patch('11-01',
    { uk:`<h2>E-commerce: архітектура, MVP та компоненти</h2>
<p>Третій фінальний проект курсу — інтернет-магазин. MVP (Minimum Viable Product) охоплює: каталог, кошик, оформлення замовлення, оплату.</p>
<h3>Основні сутності</h3>
<ul>
  <li><strong>Category</strong> — категорія товарів</li>
  <li><strong>Product</strong> — товар (назва, ціна, категорія, залишок)</li>
  <li><strong>Cart</strong> / <strong>CartItem</strong> — кошик користувача</li>
  <li><strong>Order</strong> / <strong>OrderItem</strong> — оформлене замовлення</li>
  <li><strong>Payment</strong> — платіж, привʼязаний до замовлення</li>
</ul>
<h3>Звʼязки</h3>
<ul>
  <li>Category ←1:N→ Product</li>
  <li>Product ←N:N→ Cart (через CartItem, з кількістю)</li>
  <li>Order ←1:1→ Payment</li>
</ul>
<h3>SQL-реалізація базової схеми</h3>
<pre>CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id));
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_name TEXT, total INTEGER, status TEXT);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id));</pre>`,
      ru:`<h2>E-commerce: архитектура, MVP и компоненты</h2>
<p>Третий финальный проект курса — интернет-магазин. MVP включает: каталог, корзину, оформление заказа, оплату.</p>
<h3>Основные сущности</h3>
<ul>
  <li>Category — категория товаров</li>
  <li>Product — товар</li>
  <li>Cart / CartItem — корзина пользователя</li>
  <li>Order / OrderItem — оформленный заказ</li>
  <li>Payment — платёж, привязанный к заказу</li>
</ul>
<h3>Связи</h3>
<ul>
  <li>Category ←1:N→ Product</li>
  <li>Product ←N:N→ Cart (через CartItem)</li>
  <li>Order ←1:1→ Payment</li>
</ul>
<h3>SQL-реализация базовой схемы</h3>
<pre>CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category_id INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_name TEXT, total INTEGER, status TEXT);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER);</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

initDb(demoRoot, termOut, [
  "CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT)",
  "INSERT INTO categories VALUES (1, 'Електроніка'), (2, 'Одяг')",
  "CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES categories(id))",
  "INSERT INTO products VALUES (1, 'Навушники', 899, 1), (2, 'Футболка', 299, 2)",
  "CREATE TABLE orders (id INTEGER PRIMARY KEY, user_name TEXT, total INTEGER, status TEXT)",
  "INSERT INTO orders VALUES (1, 'Марко', 899, 'paid')",
  "CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER)",
  "INSERT INTO order_items VALUES (1, 1, 1)"
], function (db) {
  row.appendChild(mkBtn('Усі таблиці схеми', function () {
    runQuery(db, "SELECT name FROM sqlite_master WHERE type='table'", termOut);
  }));
  row.appendChild(mkBtn('Товари з категоріями (JOIN)', function () {
    runQuery(db, 'SELECT products.name, products.price, categories.name AS category FROM products JOIN categories ON products.category_id = categories.id', termOut);
  }));
  row.appendChild(mkBtn('Склад замовлення #1', function () {
    runQuery(db, 'SELECT orders.user_name, products.name, order_items.quantity FROM order_items JOIN orders ON order_items.order_id = orders.id JOIN products ON order_items.product_id = products.id', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Виконай усі три запити й переконайся, що схема повʼязує категорії, товари й замовлення через реальні JOIN.', ru:'Выполни все три запроса и убедись, что схема связывает категории, товары и заказы через реальные JOIN.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай таблицю <code>payments</code> зі звʼязком <code>1:1</code> на <code>orders</code>.', ru:'В main.py добавь таблицу payments со связью 1:1 на orders.' },
      { level:'hard',   uk:'Додай кнопку, що показує ЗАГАЛЬНУ суму продажів по КОЖНІЙ категорії (JOIN трьох таблиць + GROUP BY + SUM).', ru:'Добавь кнопку с общей суммой продаж по каждой категории.' },
    ],
    `-- Повна ER-схема E-commerce MVP

CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER DEFAULT 0,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_name TEXT NOT NULL,
    total INTEGER NOT NULL,
    status TEXT DEFAULT 'pending'
);

CREATE TABLE order_items (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE payments (
    id INTEGER PRIMARY KEY,
    order_id INTEGER UNIQUE,
    amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
`
  );

  /* ─── 11-02: Django моделі ─────────────────────────────────────────── */
  patch('11-02',
    { uk:`<h2>Django моделі: Product, Category, Cart, Order, Payment</h2>
<pre>from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')

class Order(models.Model):
    STATUS_CHOICES = [('pending', 'Очікує'), ('paid', 'Оплачено'), ('shipped', 'Відправлено')]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')</pre>
<p><code>price_at_purchase</code> — ВАЖЛИВЕ поле: ціна на момент купівлі зберігається окремо від поточної ціни товару, щоб історичні замовлення НЕ змінювались, якщо товар подешевшає/подорожчає пізніше.</p>`,
      ru:`<h2>Django модели: Product, Category, Cart, Order, Payment</h2>
<pre>from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')

class Order(models.Model):
    STATUS_CHOICES = [('pending', 'Ожидает'), ('paid', 'Оплачено')]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)</pre>
<p>price_at_purchase хранит цену на момент покупки отдельно от текущей цены товара.</p>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var categories = [{ id: 1, name: 'Електроніка' }];
var products = [{ id: 1, name: 'Навушники', price: 899, category_id: 1 }];
var orders = [{ id: 1, user: 'Марко', status: 'paid' }];
var orderItems = [{ order_id: 1, product_id: 1, quantity: 1, price_at_purchase: 899 }];

function send(label, fn) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '>>> ' + label, '#68a063');
  logLine(termOut, JSON.stringify(fn()), '#4ade80');
}

row.appendChild(mkBtn('product.category (ForeignKey)', function () {
  send('Product.objects.get(id=1).category.name', function () {
    var product = products[0];
    return categories.find(function (c) { return c.id === product.category_id; }).name;
  });
}));
row.appendChild(mkBtn('order.items.all() (related_name)', function () {
  send('order.items.all()', function () {
    return orderItems.filter(function (i) { return i.order_id === 1; });
  });
}));
row.appendChild(mkBtn('Сума замовлення (price_at_purchase)', function () {
  send('sum(item.price_at_purchase * item.quantity for item in order.items.all())', function () {
    return orderItems.filter(function (i) { return i.order_id === 1; })
      .reduce(function (sum, i) { return sum + i.price_at_purchase * i.quantity; }, 0);
  });
}));`,
    [
      { level:'easy',   uk:'Спробуй усі три кнопки й подивись, як <code>price_at_purchase</code> зберігає ціну ОКРЕМО від поточної ціни товару.', ru:'Попробуй все три кнопки и посмотри, как price_at_purchase хранит цену отдельно от текущей цены товара.' },
      { level:'medium', uk:'У справжньому коді (main.py) поясни коментарем, ЩО СТАЛОСЯ Б зі старими замовленнями, якби ми зберігали ЛИШЕ <code>product.price</code> без окремого <code>price_at_purchase</code>.', ru:'В main.py объясни, что случилось бы со старыми заказами без отдельного price_at_purchase.' },
      { level:'hard',   uk:'Додай у симуляцію новий товар зі ЗМІНЕНОЮ ціною (наприклад, <code>products[0].price = 999</code>) і переконайся, що сума ЗАМОВЛЕННЯ #1 НЕ змінюється (бо рахується через <code>price_at_purchase</code>).', ru:'Измени цену товара и убедись, что сумма заказа #1 не меняется.' },
    ],
    `from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=100)


class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')


class Order(models.Model):
    STATUS_CHOICES = [('pending', 'Очікує'), ('paid', 'Оплачено'), ('shipped', 'Відправлено')]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)


class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')
`
  );

  /* ─── 11-03: Catalog API ───────────────────────────────────────────── */
  patch('11-03',
    { uk:`<h2>Catalog API: список, фільтрація, пошук та pagination</h2>
<pre>from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'in_stock']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'name']</pre>
<pre>GET /api/products/?category=1&ordering=price&search=навушники&page=2</pre>
<p>Той самий принцип фільтрації/пагінації, що й у модулі 08-13 — застосований до товарів каталогу.</p>`,
      ru:`<h2>Catalog API: список, фильтрация, поиск и pagination</h2>
<pre>from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'in_stock']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'name']</pre>
<pre>GET /api/products/?category=1&ordering=price&search=наушники&page=2</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var allProducts = [
  { id: 1, name: 'Навушники', price: 899, category: 1 },
  { id: 2, name: 'Клавіатура', price: 1299, category: 1 },
  { id: 3, name: 'Футболка', price: 299, category: 2 },
  { id: 4, name: 'Джинси', price: 899, category: 2 }
];

var router = createRouter();
router.path('/api/products/', ['GET'], function (req) {
  var items = allProducts;
  if (req.query.category) items = items.filter(function (p) { return p.category === Number(req.query.category); });
  if (req.query.search) {
    var q = req.query.search.toLowerCase();
    items = items.filter(function (p) { return p.name.toLowerCase().indexOf(q) !== -1; });
  }
  if (req.query.ordering === 'price') items = items.slice().sort(function (a, b) { return a.price - b.price; });
  if (req.query.ordering === '-price') items = items.slice().sort(function (a, b) { return b.price - a.price; });
  return { count: items.length, results: items };
});

function send(query) {
  var path = '/api/products/' + (query ? '?' + query : '');
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ GET ' + path, '#68a063');
  var res = router.resolve('GET', path);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), '#4ade80');
}

row.appendChild(mkBtn('Усі товари', function () { send(''); }));
row.appendChild(mkBtn('category=1 (Електроніка)', function () { send('category=1'); }));
row.appendChild(mkBtn('search=джин', function () { send('search=джин'); }));
row.appendChild(mkBtn('ordering=price (дешевші спочатку)', function () { send('ordering=price'); }));`,
    [
      { level:'easy',   uk:'Спробуй усі чотири кнопки й подивись, як фільтрація, пошук і сортування працюють НЕЗАЛЕЖНО одне від одного.', ru:'Попробуй все четыре кнопки и посмотри, как фильтрация, поиск и сортировка работают независимо друг от друга.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нове поле фільтра <code>min_price</code> у <code>filterset_fields</code> (через <code>django_filters.NumberFilter</code>).', ru:'В main.py добавь фильтр min_price через django_filters.NumberFilter.' },
      { level:'hard',   uk:'Додай у симуляцію підтримку query-параметра <code>ordering=-price</code> ОДНОЧАСНО з <code>category</code> — переконайся, що фільтр і сортування комбінуються (додай кнопку).', ru:'Добавь поддержку одновременной фильтрации по category и сортировки по -price.' },
    ],
    `from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Product
from .serializers import ProductSerializer


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'name']
`
  );

  /* ─── 11-04: React каталог (web) ──────────────────────────────────── */
  patch('11-04',
    { uk:`<h2>React: каталог із фільтрами та сортуванням</h2>
<pre>function Catalog({ products }) {
  const [category, setCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('name');

  const filtered = React.useMemo(() => {
    let result = category === 'all' ? products : products.filter(p => p.category === category);
    return [...result].sort((a, b) => sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name));
  }, [products, category, sortBy]);

  return React.createElement('div', null, /* ...фільтри + список... */);
}</pre>
<p><code>useMemo</code> перераховує відфільтрований/відсортований список ЛИШЕ коли змінюється <code>products</code>, <code>category</code> або <code>sortBy</code> — а не при КОЖНОМУ рендері компонента.</p>`,
      ru:`<h2>React: каталог с фильтрами и сортировкой</h2>
<pre>function Catalog({ products }) {
  const [category, setCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('name');

  const filtered = React.useMemo(() => {
    let result = category === 'all' ? products : products.filter(p => p.category === category);
    return [...result].sort((a, b) => sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name));
  }, [products, category, sortBy]);

  return React.createElement('div', null);
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
select { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 6px; border-radius: 6px; margin-right: 10px; }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 12px; }
.card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 12px; }
.price { color: #4ade80; font-weight: bold; }`,
    `var e = React.createElement;

var PRODUCTS = [
  { id: 1, name: 'Навушники', price: 899, category: 'electronics' },
  { id: 2, name: 'Клавіатура', price: 1299, category: 'electronics' },
  { id: 3, name: 'Футболка', price: 299, category: 'clothes' },
  { id: 4, name: 'Джинси', price: 899, category: 'clothes' }
];

function Catalog() {
  var stateC = React.useState('all');
  var category = stateC[0], setCategory = stateC[1];
  var stateS = React.useState('name');
  var sortBy = stateS[0], setSortBy = stateS[1];

  var filtered = React.useMemo(function () {
    var result = category === 'all' ? PRODUCTS : PRODUCTS.filter(function (p) { return p.category === category; });
    var copy = result.slice();
    copy.sort(function (a, b) {
      return sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name);
    });
    return copy;
  }, [category, sortBy]);

  return e('div', null,
    e('select', { value: category, onChange: function (ev) { setCategory(ev.target.value); } },
      e('option', { value: 'all' }, 'Усі категорії'),
      e('option', { value: 'electronics' }, 'Електроніка'),
      e('option', { value: 'clothes' }, 'Одяг')
    ),
    e('select', { value: sortBy, onChange: function (ev) { setSortBy(ev.target.value); } },
      e('option', { value: 'name' }, 'За назвою'),
      e('option', { value: 'price' }, 'За ціною')
    ),
    e('div', { className: 'grid' }, filtered.map(function (p) {
      return e('div', { className: 'card', key: p.id },
        e('div', null, p.name),
        e('div', { className: 'price' }, p.price + ' грн')
      );
    }))
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(Catalog));`,
    [
      { level:'easy',   uk:'Перемикай категорію й сортування та подивись, як список товарів РЕАЛЬНО перебудовується.', ru:'Переключай категорию и сортировку и посмотри, как реально перестраивается список товаров.' },
      { level:'medium', uk:'Додай пʼятий товар у масив <code>PRODUCTS</code> у новій категорії <code>books</code> і новий пункт <code>&lt;option&gt;</code> для неї.', ru:'Добавь пятый товар в новую категорию books и пункт option для неё.' },
      { level:'hard',   uk:'Додай третій варіант сортування — "За спаданням ціни" (<code>-price</code>) — і онови логіку <code>sort</code> для його підтримки.', ru:'Добавь сортировку "по убыванию цены" и обнови логику sort.' },
    ],
    ``
  );

  /* ─── 11-05: React сторінка товару з галереєю (web) ───────────────── */
  patch('11-05',
    { uk:`<h2>React: сторінка товару із галереєю</h2>
<pre>function ProductGallery({ images }) {
  const [active, setActive] = React.useState(0);
  return React.createElement('div', null,
    React.createElement('img', { src: images[active], className: 'main-image' }),
    React.createElement('div', { className: 'thumbs' },
      images.map((img, i) => React.createElement('img', {
        key: i, src: img,
        className: i === active ? 'thumb active' : 'thumb',
        onClick: () => setActive(i),
      }))
    )
  );
}</pre>
<p>Клік по мініатюрі змінює <code>active</code>, а головне зображення й підсвітка активної мініатюри реагують автоматично — типовий React-патерн "один стан, кілька залежних елементів".</p>`,
      ru:`<h2>React: страница товара с галереей</h2>
<pre>function ProductGallery({ images }) {
  const [active, setActive] = React.useState(0);
  return React.createElement('div', null,
    React.createElement('img', { src: images[active], className: 'main-image' }),
    React.createElement('div', { className: 'thumbs' },
      images.map((img, i) => React.createElement('img', {
        key: i, src: img,
        className: i === active ? 'thumb active' : 'thumb',
        onClick: () => setActive(i),
      }))
    )
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
.main-image { width: 100%; height: 220px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 48px; }
.thumbs { display: flex; gap: 8px; margin-top: 10px; }
.thumb { width: 50px; height: 50px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; border: 2px solid transparent; opacity: .6; }
.thumb.active { border-color: #22c55e; opacity: 1; }`,
    `var e = React.createElement;

var COLORS = ['#1e293b', '#334155', '#475569', '#0f172a'];
var EMOJIS = ['🎧', '🎧', '🎧', '🎧'];

function ProductGallery() {
  var state = React.useState(0);
  var active = state[0], setActive = state[1];

  return e('div', null,
    e('div', { className: 'main-image', style: { background: COLORS[active] } }, EMOJIS[active]),
    e('div', { className: 'thumbs' }, COLORS.map(function (color, i) {
      return e('div', {
        key: i,
        className: i === active ? 'thumb active' : 'thumb',
        style: { background: color },
        onClick: function () { setActive(i); }
      }, EMOJIS[i]);
    })),
    e('h2', null, 'Навушники Pro'),
    e('p', { style: { color: '#4ade80', fontWeight: 'bold' } }, '899 грн')
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(ProductGallery));`,
    [
      { level:'easy',   uk:'Клацай по мініатюрах і подивись, як головне зображення й підсвітка активної мініатюри синхронно змінюються від ОДНОГО стану <code>active</code>.', ru:'Кликай по миниатюрам и посмотри, как главное изображение и подсветка меняются синхронно от одного состояния active.' },
      { level:'medium', uk:'Додай пʼяте зображення в масиви <code>COLORS</code>/<code>EMOJIS</code>.', ru:'Добавь пятое изображение в массивы COLORS/EMOJIS.' },
      { level:'hard',   uk:'Додай кнопки "← Попереднє" / "Наступне →", що змінюють <code>active</code> по колу (з останнього на перше зображення й навпаки).', ru:'Добавь кнопки "← Предыдущее" / "Следующее →", меняющие active по кругу.' },
    ],
    ``
  );

  /* ─── 11-06: Cart (web) ────────────────────────────────────────────── */
  patch('11-06',
    { uk:`<h2>Cart: додавання, кількість та підсумок</h2>
<pre>function useCart() {
  const [items, setItems] = React.useState([]);

  function addItem(product) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function setQty(id, qty) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return { items, addItem, setQty, total };
}</pre>
<p>Ключова логіка кошика: якщо товар УЖЕ в кошику — збільшуємо <code>qty</code>, інакше — додаємо новий запис. <code>total</code> обчислюється як похідне значення, а не зберігається окремо.</p>`,
      ru:`<h2>Cart: добавление, количество и итог</h2>
<pre>function useCart() {
  const [items, setItems] = React.useState([]);

  function addItem(product) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return { items, addItem, total };
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
button { background: #1e293b; border: 1px solid #334155; color: #e2e8f0; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin: 3px; }
.cart-item { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #334155; }
.total { margin-top: 10px; font-size: 16px; font-weight: bold; color: #4ade80; }`,
    `var e = React.createElement;

var CATALOG = [
  { id: 1, name: 'Навушники', price: 899 },
  { id: 2, name: 'Клавіатура', price: 1299 }
];

function useCart() {
  var state = React.useState([]);
  var items = state[0], setItems = state[1];

  function addItem(product) {
    var existing = items.find(function (i) { return i.id === product.id; });
    if (existing) {
      setItems(items.map(function (i) { return i.id === product.id ? Object.assign({}, i, { qty: i.qty + 1 }) : i; }));
    } else {
      setItems(items.concat([Object.assign({}, product, { qty: 1 })]));
    }
  }

  function setQty(id, qty) {
    setItems(items.map(function (i) { return i.id === id ? Object.assign({}, i, { qty: Math.max(1, qty) }) : i; }));
  }

  var total = items.reduce(function (sum, i) { return sum + i.price * i.qty; }, 0);
  return { items: items, addItem: addItem, setQty: setQty, total: total };
}

function CartPage() {
  var cart = useCart();

  return e('div', null,
    e('h3', null, 'Каталог'),
    CATALOG.map(function (p) {
      return e('button', { key: p.id, onClick: function () { cart.addItem(p); } }, '+ ' + p.name + ' (' + p.price + ' грн)');
    }),
    e('h3', null, 'Кошик'),
    cart.items.map(function (i) {
      return e('div', { className: 'cart-item', key: i.id },
        e('span', null, i.name + ' × ' + i.qty),
        e('span', null,
          e('button', { onClick: function () { cart.setQty(i.id, i.qty - 1); } }, '-'),
          ' ' + i.qty + ' ',
          e('button', { onClick: function () { cart.setQty(i.id, i.qty + 1); } }, '+')
        )
      );
    }),
    e('p', { className: 'total' }, 'Разом: ' + cart.total + ' грн')
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(CartPage));`,
    [
      { level:'easy',   uk:'Додай обидва товари в кошик, а потім змінюй кількість кнопками +/- — подивись, як "Разом" перераховується щоразу.', ru:'Добавь оба товара в корзину, затем меняй количество кнопками +/- — посмотри, как пересчитывается "Итого".' },
      { level:'medium', uk:'Натисни кнопку "+ Навушники" ДВІЧІ ПОСПІЛЬ і переконайся, що кількість збільшується до 2, а НЕ додається другий окремий рядок.', ru:'Нажми "+ Наушники" дважды подряд и убедись, что количество увеличивается до 2, а не добавляется вторая строка.' },
      { level:'hard',   uk:'Додай кнопку "Видалити" для кожного товару в кошику, що прибирає його зі списку <code>items</code> повністю.', ru:'Добавь кнопку "Удалить" для каждого товара в корзине.' },
    ],
    ``
  );

  /* ─── 11-07: Checkout (web) ────────────────────────────────────────── */
  patch('11-07',
    { uk:`<h2>Checkout: форма замовлення та адреса доставки</h2>
<pre>function CheckoutForm({ onSubmit }) {
  const [form, setForm] = React.useState({ name: '', address: '', city: '', phone: '' });
  const [errors, setErrors] = React.useState({});

  function validate() {
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Мінімум 2 символи';
    if (form.address.trim().length < 5) errs.address = 'Занадто коротка адреса';
    if (!/^\\+?\\d{9,13}$/.test(form.phone)) errs.phone = 'Некоректний телефон';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(form);
  }

  return React.createElement('form', { onSubmit: handleSubmit }, /* ...поля... */);
}</pre>`,
      ru:`<h2>Checkout: форма заказа и адрес доставки</h2>
<pre>function CheckoutForm({ onSubmit }) {
  const [form, setForm] = React.useState({ name: '', address: '', city: '', phone: '' });
  const [errors, setErrors] = React.useState({});

  function validate() {
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Минимум 2 символа';
    if (!/^\\+?\\d{9,13}$/.test(form.phone)) errs.phone = 'Некорректный телефон';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(form);
  }

  return React.createElement('form', { onSubmit: handleSubmit });
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
input { display: block; width: 100%; max-width: 300px; margin: 6px 0; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; box-sizing: border-box; }
.error { color: #f87171; font-size: 12px; margin: -4px 0 6px; }
button { background: #22c55e; color: #0f172a; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 8px; }
.success { color: #4ade80; margin-top: 10px; }`,
    `var e = React.createElement;

function validate(form) {
  var errs = {};
  if (form.name.trim().length < 2) errs.name = 'Мінімум 2 символи';
  if (form.address.trim().length < 5) errs.address = 'Занадто коротка адреса';
  if (!/^\\+?\\d{9,13}$/.test(form.phone)) errs.phone = 'Некоректний телефон (9-13 цифр)';
  return errs;
}

function CheckoutForm() {
  var state = React.useState({ name: '', address: '', phone: '' });
  var form = state[0], setForm = state[1];
  var errState = React.useState({});
  var errors = errState[0], setErrors = errState[1];
  var doneState = React.useState(false);
  var done = doneState[0], setDone = doneState[1];

  function update(field, value) {
    var next = Object.assign({}, form);
    next[field] = value;
    setForm(next);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    var errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  }

  if (done) return e('p', { className: 'success' }, '✓ Замовлення оформлено на ' + form.address);

  return e('form', { onSubmit: handleSubmit },
    e('input', { placeholder: "Ім'я одержувача", value: form.name, onChange: function (ev) { update('name', ev.target.value); } }),
    errors.name ? e('p', { className: 'error' }, errors.name) : null,
    e('input', { placeholder: 'Адреса доставки', value: form.address, onChange: function (ev) { update('address', ev.target.value); } }),
    errors.address ? e('p', { className: 'error' }, errors.address) : null,
    e('input', { placeholder: 'Телефон', value: form.phone, onChange: function (ev) { update('phone', ev.target.value); } }),
    errors.phone ? e('p', { className: 'error' }, errors.phone) : null,
    e('button', { type: 'submit' }, 'Оформити замовлення')
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(CheckoutForm));`,
    [
      { level:'easy',   uk:'Спробуй відправити форму порожньою, потім заповни коректно — подивись на реальну валідацію полів.', ru:'Попробуй отправить пустую форму, затем заполни корректно — посмотри на реальную валидацию полей.' },
      { level:'medium', uk:'Додай нове поле <code>city</code> (місто) з власною валідацією (мінімум 2 символи).', ru:'Добавь поле city с валидацией минимум 2 символа.' },
      { level:'hard',   uk:'Додай поле <code>postalCode</code> (індекс) із валідацією через регулярний вираз (наприклад, рівно 5 цифр).', ru:'Добавь поле postalCode с валидацией через регулярное выражение (ровно 5 цифр).' },
    ],
    ``
  );

  /* ─── 11-08: Stripe інтеграція (sandbox) ──────────────────────────── */
  patch('11-08',
    { uk:`<h2>Stripe: інтеграція платіжного шлюзу (sandbox)</h2>
<h3>Django: створення Payment Intent</h3>
<pre>import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
def create_payment_intent(request):
    order = Order.objects.get(id=request.data['order_id'])
    intent = stripe.PaymentIntent.create(
        amount=int(order.total * 100),  # у центах
        currency='uah',
        metadata={'order_id': order.id},
    )
    return Response({'client_secret': intent.client_secret})</pre>
<h3>React: Stripe Elements (реальний код)</h3>
<pre>import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');

function CheckoutButton({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  async function handlePay() {
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });
    if (result.error) console.error(result.error.message);
    else console.log('Оплата успішна!');
  }

  return React.createElement('button', { onClick: handlePay }, 'Оплатити');
}</pre>
<h3>Чесно про цю пісочницю</h3>
<p>Stripe.js вимагає РЕАЛЬНИЙ publishable-ключ акаунта Stripe (навіть у тестовому режимі) — без нього підключення бібліотеки нічого не продемонструє. Тому нижче — чесна fakeStripe JS-симуляція ТОЧНОГО потоку (створення intent → підтвердження картки → результат), яка явно позначена як навчальна імітація, а не спроба обробити справжній платіж.</p>`,
      ru:`<h2>Stripe: интеграция платёжного шлюза (sandbox)</h2>
<h3>Django: создание Payment Intent</h3>
<pre>import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
def create_payment_intent(request):
    order = Order.objects.get(id=request.data['order_id'])
    intent = stripe.PaymentIntent.create(
        amount=int(order.total * 100),
        currency='uah',
        metadata={'order_id': order.id},
    )
    return Response({'client_secret': intent.client_secret})</pre>
<h3>React: Stripe Elements (реальный код)</h3>
<pre>import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...');

function CheckoutButton({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  async function handlePay() {
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });
  }

  return React.createElement('button', { onClick: handlePay }, 'Оплатить');
}</pre>
<h3>Честно об этой песочнице</h3>
<p>Stripe.js требует настоящий publishable-ключ аккаунта Stripe. Поэтому ниже — честная fakeStripe JS-симуляция точного потока (создание intent → подтверждение карты → результат), явно помеченная как учебная имитация.</p>` },
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
note.textContent = 'fakeStripe: чесна симуляція потоку оплати (без реального Stripe-акаунта справжню оплату показати неможливо).';
demoRoot.appendChild(note);

var clientSecret = null;

function createPaymentIntent(amount) {
  clientSecret = 'pi_fake_' + Date.now() + '_secret';
  logLine('', '');
  logLine('POST /api/create-payment-intent/ amount=' + amount + ' -> stripe.PaymentIntent.create(...)', '#68a063');
  logLine('← {"client_secret": "' + clientSecret + '"}', '#4ade80');
}

function confirmCardPayment(cardNumber) {
  if (!clientSecret) {
    logLine('', '');
    logLine('Спочатку створи Payment Intent', '#f87171');
    return;
  }
  logLine('', '');
  logLine('stripe.confirmCardPayment("' + clientSecret + '", { card: "' + cardNumber + '" })', '#68a063');
  if (cardNumber === '4242424242424242') {
    logLine('← { status: "succeeded" } — Оплата успішна!', '#4ade80');
  } else {
    logLine('← { error: { message: "Your card was declined." } }', '#f87171');
  }
}

row.appendChild(mkBtn('Створити Payment Intent (899 грн)', function () { createPaymentIntent(899); }));
row.appendChild(mkBtn('Оплатити тестовою карткою 4242...', function () { confirmCardPayment('4242424242424242'); }));
row.appendChild(mkBtn('Оплатити карткою, що відхиляється', function () { confirmCardPayment('4000000000000002'); }));`,
    [
      { level:'easy',   uk:'Створи Payment Intent, потім спробуй ОБИДВІ тестові картки — подивись на різницю між успішною оплатою й відхиленою.', ru:'Создай Payment Intent, затем попробуй обе тестовые карты — посмотри на разницу между успешной оплатой и отклонённой.' },
      { level:'medium', uk:'Спробуй "оплатити" БЕЗ попереднього створення Payment Intent — переконайся, що симуляція про це попереджає.', ru:'Попробуй "оплатить" без предварительного создания Payment Intent — убедись, что симуляция предупреждает об этом.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши webhook-обробник <code>stripe.Webhook.construct_event</code>, що оновлює статус замовлення на "paid" ПІСЛЯ підтвердження оплати від Stripe.', ru:'В main.py допиши webhook-обработчик, обновляющий статус заказа на "paid" после подтверждения оплаты.' },
    ],
    `import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['POST'])
def create_payment_intent(request):
    order = Order.objects.get(id=request.data['order_id'])
    intent = stripe.PaymentIntent.create(
        amount=int(order.total * 100),
        currency='uah',
        metadata={'order_id': order.id},
    )
    return Response({'client_secret': intent.client_secret})


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)

    if event['type'] == 'payment_intent.succeeded':
        intent = event['data']['object']
        order_id = intent['metadata']['order_id']
        order = Order.objects.get(id=order_id)
        order.status = 'paid'
        order.save()

    return Response(status=200)
`
  );

  /* ─── 11-09: Email-підтвердження замовлення ───────────────────────── */
  patch('11-09',
    { uk:`<h2>Email-підтвердження замовлення</h2>
<pre>from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string

@shared_task
def send_order_confirmation(order_id):
    order = Order.objects.get(id=order_id)
    html_body = render_to_string('emails/order_confirmation.html', {'order': order})
    send_mail(
        subject=f'Замовлення #{order.id} підтверджено',
        message=f'Дякуємо за замовлення на суму {order.total} грн',
        html_message=html_body,
        from_email='shop@myecommerce.com',
        recipient_list=[order.user.email],
    )</pre>
<h3>Виклик після успішної оплати</h3>
<pre>def stripe_webhook(request):
    ...
    if event['type'] == 'payment_intent.succeeded':
        order.status = 'paid'
        order.save()
        send_order_confirmation.delay(order.id)</pre>`,
      ru:`<h2>Email-подтверждение заказа</h2>
<pre>from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_order_confirmation(order_id):
    order = Order.objects.get(id=order_id)
    send_mail(
        subject=f'Заказ #{order.id} подтверждён',
        message=f'Спасибо за заказ на сумму {order.total} грн',
        from_email='shop@myecommerce.com',
        recipient_list=[order.user.email],
    )</pre>
<h3>Вызов после успешной оплаты</h3>
<pre>def stripe_webhook(request):
    if event['type'] == 'payment_intent.succeeded':
        order.status = 'paid'
        order.save()
        send_order_confirmation.delay(order.id)</pre>` },
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

function payAndNotify(orderId, total, email) {
  taskId++;
  var id = 'task-' + taskId;
  logLine('', '');
  logLine('[stripe webhook] payment_intent.succeeded -> order.status = "paid"', '#68a063');
  logLine('send_order_confirmation.delay(' + orderId + ') [' + id + ']', '#68a063');
  setTimeout(function () { logLine('  [celery worker] ' + id + ': рендер шаблону + send_mail...', '#facc15'); }, 500);
  setTimeout(function () {
    logLine('  [celery worker] ' + id + ' завершено: "Замовлення #' + orderId + ' підтверджено" надіслано на ' + email, '#4ade80');
  }, 1400);
}

row.appendChild(mkBtn('Підтвердити оплату замовлення #1', function () { payAndNotify(1, 899, 'marko@example.com'); }));`,
    [
      { level:'easy',   uk:'Натисни кнопку й подивись, як email надсилається у ФОНІ через Celery, а НЕ блокує сам webhook-обробник.', ru:'Нажми кнопку и посмотри, как email отправляется в фоне через Celery, не блокируя webhook.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши HTML-шаблон <code>order_confirmation.html</code> зі списком товарів замовлення.', ru:'В main.py допиши HTML-шаблон order_confirmation.html со списком товаров заказа.' },
      { level:'hard',   uk:'Додай другу задачу <code>notify_admin_new_order</code>, що надсилає сповіщення АДМІНІСТРАТОРУ магазину про кожне нове оплачене замовлення.', ru:'Добавь задачу notify_admin_new_order, уведомляющую администратора о новом заказе.' },
    ],
    `from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string


@shared_task
def send_order_confirmation(order_id):
    order = Order.objects.get(id=order_id)
    html_body = render_to_string('emails/order_confirmation.html', {'order': order})
    send_mail(
        subject=f'Замовлення #{order.id} підтверджено',
        message=f'Дякуємо за замовлення на суму {order.total} грн',
        html_message=html_body,
        from_email='shop@myecommerce.com',
        recipient_list=[order.user.email],
    )


@shared_task
def notify_admin_new_order(order_id):
    order = Order.objects.get(id=order_id)
    send_mail(
        subject=f'Нове замовлення #{order.id}',
        message=f'Сума: {order.total} грн, клієнт: {order.user.email}',
        from_email='shop@myecommerce.com',
        recipient_list=['admin@myecommerce.com'],
    )
`
  );

  /* ─── 11-10: Admin: управління товарами та замовленнями ───────────── */
  patch('11-10',
    { uk:`<h2>Admin: управління товарами та замовленнями</h2>
<pre>@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')
    list_filter = ('category',)
    search_fields = ('name',)
    list_editable = ('price', 'stock')

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at')
    list_filter = ('status',)
    inlines = [OrderItemInline]
    actions = ['mark_as_shipped']

    def mark_as_shipped(self, request, queryset):
        queryset.update(status='shipped')
    mark_as_shipped.short_description = 'Позначити як відправлені'</pre>
<p><code>list_editable</code> дозволяє редагувати ціну й залишок ПРЯМО в таблиці списку, без відкриття кожного товару окремо; <code>actions</code> — масові дії над вибраними записами.</p>`,
      ru:`<h2>Admin: управление товарами и заказами</h2>
<pre>@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')
    list_filter = ('category',)
    search_fields = ('name',)
    list_editable = ('price', 'stock')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at')
    list_filter = ('status',)
    actions = ['mark_as_shipped']

    def mark_as_shipped(self, request, queryset):
        queryset.update(status='shipped')</pre>` },
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

var orders = [
  { id: 1, user: 'Марко', status: 'paid' },
  { id: 2, user: 'Ірина', status: 'pending' },
  { id: 3, user: 'Аліна', status: 'paid' }
];

function renderTable() {
  var html = '<table style="width:100%;border-collapse:collapse;font-size:12px;color:#0f172a;background:#fff;border-radius:8px;overflow:hidden">';
  html += '<tr style="background:#e2e8f0"><th style="padding:6px;text-align:left">id</th><th style="padding:6px;text-align:left">user</th><th style="padding:6px;text-align:left">status</th></tr>';
  orders.forEach(function (o) {
    html += '<tr><td style="padding:6px;border-top:1px solid #e2e8f0">' + o.id + '</td><td style="padding:6px;border-top:1px solid #e2e8f0">' + o.user + '</td><td style="padding:6px;border-top:1px solid #e2e8f0">' + o.status + '</td></tr>';
  });
  html += '</table>';
  table.innerHTML = html;
}
renderTable();

row.appendChild(mkBtn('list_filter: status=paid', function () {
  var filtered = orders.filter(function (o) { return o.status === 'paid'; });
  table.innerHTML = '';
  var origOrders = orders;
  orders = filtered;
  renderTable();
  orders = origOrders;
}));
row.appendChild(mkBtn('action: mark_as_shipped (усі paid)', function () {
  orders = orders.map(function (o) { return o.status === 'paid' ? Object.assign({}, o, { status: 'shipped' }) : o; });
  renderTable();
}));
row.appendChild(mkBtn('Скинути', function () {
  orders = [{ id: 1, user: 'Марко', status: 'paid' }, { id: 2, user: 'Ірина', status: 'pending' }, { id: 3, user: 'Аліна', status: 'paid' }];
  renderTable();
}));`,
    [
      { level:'easy',   uk:'Спробуй фільтр і масову дію "mark_as_shipped" — переконайся, що ВСІ оплачені замовлення переходять у статус "shipped" ОДНИМ кліком.', ru:'Попробуй фильтр и массовое действие "mark_as_shipped" — убедись, что все оплаченные заказы переходят в "shipped" одним кликом.' },
      { level:'medium', uk:'У справжньому коді (main.py) додай нову масову дію <code>mark_as_cancelled</code>.', ru:'В main.py добавь массовое действие mark_as_cancelled.' },
      { level:'hard',   uk:'Додай кнопку "action: cancel усі pending" у симуляції, що переводить ЛИШЕ замовлення зі статусом <code>pending</code> у <code>cancelled</code>.', ru:'Добавь кнопку "action: cancel все pending" в симуляции.' },
    ],
    `from django.contrib import admin
from .models import Product, Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')
    list_filter = ('category',)
    search_fields = ('name',)
    list_editable = ('price', 'stock')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at')
    list_filter = ('status',)
    inlines = [OrderItemInline]
    actions = ['mark_as_shipped', 'mark_as_cancelled']

    def mark_as_shipped(self, request, queryset):
        queryset.filter(status='paid').update(status='shipped')
    mark_as_shipped.short_description = 'Позначити як відправлені'

    def mark_as_cancelled(self, request, queryset):
        queryset.filter(status='pending').update(status='cancelled')
    mark_as_cancelled.short_description = 'Скасувати замовлення'
`
  );

  /* ─── 11-11: Відгуки та рейтинги ───────────────────────────────────── */
  patch('11-11',
    { uk:`<h2>Відгуки та рейтинги: модель та API</h2>
<pre>class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('product', 'user')  # один відгук на товар від користувача</pre>
<h3>Обчислення середнього рейтингу</h3>
<pre>from django.db.models import Avg, Count

class ProductViewSet(viewsets.ModelViewSet):
    def retrieve(self, request, pk=None):
        product = self.get_object()
        stats = product.reviews.aggregate(avg_rating=Avg('rating'), count=Count('id'))
        data = ProductSerializer(product).data
        data['avg_rating'] = round(stats['avg_rating'] or 0, 1)
        data['review_count'] = stats['count']
        return Response(data)</pre>
<p><code>unique_together</code> гарантує, що один користувач НЕ МОЖЕ залишити два відгуки на той самий товар.</p>`,
      ru:`<h2>Отзывы и рейтинги: модель и API</h2>
<pre>class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)

    class Meta:
        unique_together = ('product', 'user')</pre>
<h3>Вычисление среднего рейтинга</h3>
<pre>from django.db.models import Avg, Count

stats = product.reviews.aggregate(avg_rating=Avg('rating'), count=Count('id'))</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${FAKE_DJANGO_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);

var reviews = [
  { id: 1, product_id: 1, user: 'marko', rating: 5, comment: 'Чудові навушники!' },
  { id: 2, product_id: 1, user: 'irina', rating: 4, comment: 'Добре, але дорого' }
];

function avgRating(productId) {
  var productReviews = reviews.filter(function (r) { return r.product_id === productId; });
  if (!productReviews.length) return { avg: 0, count: 0 };
  var sum = productReviews.reduce(function (s, r) { return s + r.rating; }, 0);
  return { avg: Math.round((sum / productReviews.length) * 10) / 10, count: productReviews.length };
}

var router = createRouter();
router.path('/api/products/1/', ['GET'], function () {
  var stats = avgRating(1);
  return { id: 1, name: 'Навушники', avg_rating: stats.avg, review_count: stats.count };
});
router.path('/api/products/1/reviews/', ['POST'], function (req) {
  var existing = reviews.find(function (r) { return r.product_id === 1 && r.user === req.data.user; });
  if (existing) return Response({ detail: 'unique_together: цей користувач вже залишив відгук' }, { status: 400 });
  var review = { id: reviews.length + 1, product_id: 1, user: req.data.user, rating: req.data.rating, comment: req.data.comment || '' };
  reviews.push(review);
  return Response(review, { status: 201 });
});

function send(method, path, body) {
  logLine(termOut, '', '#64748b');
  logLine(termOut, '→ ' + method + ' ' + path, '#68a063');
  var res = router.resolve(method, path, body);
  logLine(termOut, '← [' + res.status + ']: ' + JSON.stringify(res.data), res.status < 400 ? '#4ade80' : '#f87171');
}

row.appendChild(mkBtn('GET /api/products/1/ (з avg_rating)', function () { send('GET', '/api/products/1/'); }));
row.appendChild(mkBtn('Новий відгук (alina, 5)', function () { send('POST', '/api/products/1/reviews/', { user: 'alina', rating: 5, comment: 'Супер!' }); }));
row.appendChild(mkBtn('Повторний відгук (marko знову)', function () { send('POST', '/api/products/1/reviews/', { user: 'marko', rating: 3 }); }));`,
    [
      { level:'easy',   uk:'Подивись на <code>avg_rating</code> ДО й ПІСЛЯ додавання нового відгуку — переконайся, що середнє РЕАЛЬНО перераховується.', ru:'Посмотри на avg_rating до и после добавления отзыва — убедись, что среднее реально пересчитывается.' },
      { level:'medium', uk:'Спробуй залишити ДРУГИЙ відгук від <code>marko</code> — переконайся, що спрацьовує обмеження <code>unique_together</code>.', ru:'Попробуй оставить второй отзыв от marko — убедись, что срабатывает unique_together.' },
      { level:'hard',   uk:'У справжньому коді (main.py) допиши <code>validate_rating</code>, що дозволяє лише цілі числа від 1 до 5.', ru:'В main.py допиши validate_rating, разрешающий только целые числа от 1 до 5.' },
    ],
    `from django.db import models
from django.db.models import Avg, Count
from django.contrib.auth import get_user_model

User = get_user_model()


class Review(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('product', 'user')


# serializers.py
from rest_framework import serializers

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment']

    def validate_rating(self, value):
        if not (1 <= value <= 5):
            raise serializers.ValidationError('Рейтинг має бути від 1 до 5')
        return value
`
  );

  /* ─── 11-12: Рекомендовані товари ──────────────────────────────────── */
  patch('11-12',
    { uk:`<h2>Рекомендовані товари: алгоритм подібності</h2>
<p>Простий, але РЕАЛЬНИЙ алгоритм рекомендацій — content-based filtering через коефіцієнт Жаккара (Jaccard similarity) на основі спільних тегів товарів.</p>
<h3>Формула коефіцієнта Жаккара</h3>
<pre>J(A, B) = |A ∩ B| / |A ∪ B|

# Приклад: навушники мають теги {звук, бездротовий, електроніка}
#          колонка має теги {звук, бездротовий, портативна}
# Спільні: {звук, бездротовий} = 2
# Обʼєднання: {звук, бездротовий, електроніка, портативна} = 4
# J = 2/4 = 0.5</pre>
<h3>Django-реалізація</h3>
<pre>def jaccard_similarity(tags_a, tags_b):
    set_a, set_b = set(tags_a), set(tags_b)
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    return intersection / union if union else 0

def get_recommendations(product, all_products, top_n=3):
    scored = [
        (p, jaccard_similarity(product.tags, p.tags))
        for p in all_products if p.id != product.id
    ]
    scored.sort(key=lambda x: x[1], reverse=True)
    return [p for p, score in scored[:top_n] if score > 0]</pre>
<h3>Ця пісочниця: справжній алгоритм, реальні обчислення</h3>
<p>Демо нижче виконує СПРАВЖНІЙ розрахунок коефіцієнта Жаккара для кожної пари товарів — не імітація, а той самий математичний алгоритм, що й у реальній рекомендаційній системі.</p>`,
      ru:`<h2>Рекомендуемые товары: алгоритм схожести</h2>
<p>Простой, но настоящий алгоритм рекомендаций — content-based filtering через коэффициент Жаккара по общим тегам товаров.</p>
<h3>Формула коэффициента Жаккара</h3>
<pre>J(A, B) = |A ∩ B| / |A ∪ B|</pre>
<h3>Django-реализация</h3>
<pre>def jaccard_similarity(tags_a, tags_b):
    set_a, set_b = set(tags_a), set(tags_b)
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    return intersection / union if union else 0

def get_recommendations(product, all_products, top_n=3):
    scored = [(p, jaccard_similarity(product.tags, p.tags)) for p in all_products if p.id != product.id]
    scored.sort(key=lambda x: x[1], reverse=True)
    return [p for p, score in scored[:top_n] if score > 0]</pre>
<h3>Эта песочница: настоящий алгоритм, реальные вычисления</h3>
<p>Демо выполняет настоящий расчёт коэффициента Жаккара для каждой пары товаров.</p>` },
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

/* Справжня реалізація коефіцієнта Жаккара — те саме, що й у main.py */
function jaccardSimilarity(tagsA, tagsB) {
  var setA = new Set(tagsA);
  var setB = new Set(tagsB);
  var intersection = 0;
  setA.forEach(function (tag) { if (setB.has(tag)) intersection++; });
  var union = new Set(tagsA.concat(tagsB)).size;
  return union ? intersection / union : 0;
}

var products = [
  { id: 1, name: 'Навушники', tags: ['звук', 'бездротовий', 'електроніка'] },
  { id: 2, name: 'Колонка', tags: ['звук', 'бездротовий', 'портативна'] },
  { id: 3, name: 'Футболка', tags: ['одяг', 'бавовна'] },
  { id: 4, name: 'Мікрофон', tags: ['звук', 'електроніка', 'студія'] }
];

function getRecommendations(product) {
  var scored = products.filter(function (p) { return p.id !== product.id; })
    .map(function (p) { return { product: p, score: jaccardSimilarity(product.tags, p.tags) }; });
  scored.sort(function (a, b) { return b.score - a.score; });
  return scored;
}

row.appendChild(mkBtn('Рекомендації для "Навушники"', function () {
  var results = getRecommendations(products[0]);
  var text = 'Товар: Навушники [' + products[0].tags.join(', ') + ']\\n\\n';
  results.forEach(function (r) {
    text += r.product.name + ' [' + r.product.tags.join(', ') + '] — J = ' + r.score.toFixed(2) + '\\n';
  });
  out.textContent = text;
}));
row.appendChild(mkBtn('Рекомендації для "Мікрофон"', function () {
  var results = getRecommendations(products[3]);
  var text = 'Товар: Мікрофон [' + products[3].tags.join(', ') + ']\\n\\n';
  results.forEach(function (r) {
    text += r.product.name + ' [' + r.product.tags.join(', ') + '] — J = ' + r.score.toFixed(2) + '\\n';
  });
  out.textContent = text;
}));`,
    [
      { level:'easy',   uk:'Порахуй рекомендації для обох товарів і переконайся, що товари зі СПІЛЬНИМИ тегами (наприклад, "звук") отримують ВИЩИЙ коефіцієнт Жаккара.', ru:'Посчитай рекомендации для обоих товаров и убедись, что товары с общими тегами получают более высокий коэффициент Жаккара.' },
      { level:'medium', uk:'Порахуй ВРУЧНУ (на папері) коефіцієнт Жаккара для "Футболка" і "Навушники" — переконайся, що результат <code>0</code> (немає спільних тегів), і перевір це кнопкою.', ru:'Посчитай вручную коэффициент Жаккара для "Футболка" и "Навушники" — убедись, что результат 0.' },
      { level:'hard',   uk:'Додай пʼятий товар із тегами, що частково перетинаються з "Навушники" і "Мікрофон" ОДНОЧАСНО, і подивись, як він ранжується для обох.', ru:'Добавь пятый товар с тегами, частично пересекающимися с обоими товарами.' },
    ],
    `def jaccard_similarity(tags_a, tags_b):
    """
    Коефіцієнт Жаккара: |A ∩ B| / |A ∪ B|
    Показує, наскільки схожі два набори тегів (від 0 до 1).
    """
    set_a, set_b = set(tags_a), set(tags_b)
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    return intersection / union if union else 0


def get_recommendations(product, all_products, top_n=3):
    scored = [
        (p, jaccard_similarity(product.tags, p.tags))
        for p in all_products if p.id != product.id
    ]
    scored.sort(key=lambda x: x[1], reverse=True)
    return [p for p, score in scored[:top_n] if score > 0]


# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def product_recommendations(request, pk):
    product = Product.objects.get(id=pk)
    all_products = Product.objects.exclude(id=pk)
    recommendations = get_recommendations(product, all_products)
    return Response(ProductSerializer(recommendations, many=True).data)
`
  );

  /* ─── 11-13: SEO ────────────────────────────────────────────────────── */
  patch('11-13',
    { uk:`<h2>SEO: метатеги, Sitemaps та robots.txt</h2>
<h3>Метатеги (React Helmet / Django-шаблони)</h3>
<pre>&lt;title&gt;Навушники Pro — 899 грн | MyShop&lt;/title&gt;
&lt;meta name="description" content="Навушники Pro з бездротовим звʼязком..."&gt;
&lt;meta property="og:title" content="Навушники Pro"&gt;
&lt;meta property="og:image" content="https://myshop.com/media/headphones.jpg"&gt;</pre>
<h3>Django: генерація sitemap.xml</h3>
<pre>from django.contrib.sitemaps import Sitemap

class ProductSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.8

    def items(self):
        return Product.objects.all()

    def location(self, product):
        return f'/products/{product.id}/'</pre>
<h3>robots.txt</h3>
<pre>User-agent: *
Disallow: /admin/
Disallow: /cart/
Allow: /

Sitemap: https://myshop.com/sitemap.xml</pre>
<h3>Ця пісочниця: справжня генерація валідного XML/тексту</h3>
<p>Демо нижче будує СПРАВЖНІЙ, валідний <code>sitemap.xml</code> і <code>robots.txt</code> за реальними даними каталогу — цей текст можна буквально скопіювати у файл проекту.</p>`,
      ru:`<h2>SEO: метатеги, Sitemaps и robots.txt</h2>
<h3>Метатеги</h3>
<pre>&lt;title&gt;Наушники Pro — 899 грн | MyShop&lt;/title&gt;
&lt;meta name="description" content="Наушники Pro с беспроводной связью..."&gt;
&lt;meta property="og:title" content="Наушники Pro"&gt;</pre>
<h3>Django: генерация sitemap.xml</h3>
<pre>from django.contrib.sitemaps import Sitemap

class ProductSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.8

    def items(self):
        return Product.objects.all()

    def location(self, product):
        return f'/products/{product.id}/'</pre>
<h3>robots.txt</h3>
<pre>User-agent: *
Disallow: /admin/
Allow: /

Sitemap: https://myshop.com/sitemap.xml</pre>
<h3>Эта песочница: настоящая генерация валидного XML/текста</h3>
<p>Демо строит настоящий, валидный sitemap.xml и robots.txt по реальным данным каталога.</p>` },
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

var products = [
  { id: 1, name: 'Навушники' },
  { id: 2, name: 'Клавіатура' },
  { id: 3, name: 'Футболка' }
];
var siteUrl = 'https://myshop.com';

function buildSitemap() {
  var lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  lines.push('  <url><loc>' + siteUrl + '/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>');
  products.forEach(function (p) {
    lines.push('  <url>');
    lines.push('    <loc>' + siteUrl + '/products/' + p.id + '/</loc>');
    lines.push('    <changefreq>weekly</changefreq>');
    lines.push('    <priority>0.8</priority>');
    lines.push('  </url>');
  });
  lines.push('</urlset>');
  return lines.join('\\n');
}

function buildRobotsTxt() {
  return ['User-agent: *', 'Disallow: /admin/', 'Disallow: /cart/', 'Allow: /', '', 'Sitemap: ' + siteUrl + '/sitemap.xml'].join('\\n');
}

row.appendChild(mkBtn('Згенерувати sitemap.xml', function () { out.textContent = buildSitemap(); }));
row.appendChild(mkBtn('Згенерувати robots.txt', function () { out.textContent = buildRobotsTxt(); }));`,
    [
      { level:'easy',   uk:'Згенеруй ОБИДВА файли й переконайся, що <code>sitemap.xml</code> — валідний XML, а <code>robots.txt</code> посилається на нього в кінці.', ru:'Сгенерируй оба файла и убедись, что sitemap.xml — валидный XML, а robots.txt ссылается на него в конце.' },
      { level:'medium', uk:'Додай четвертий товар у масив <code>products</code> і переконайся, що <code>sitemap.xml</code> тепер містить ЧОТИРИ <code>&lt;url&gt;</code>-блоки товарів.', ru:'Добавь четвёртый товар в products и убедись, что sitemap.xml содержит четыре url-блока товаров.' },
      { level:'hard',   uk:'Додай у <code>buildSitemap</code> окремий розділ для категорій (новий масив <code>categories</code>) із власним <code>changefreq</code> і <code>priority</code>.', ru:'Добавь в buildSitemap отдельный раздел для категорий.' },
    ],
    `from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps.views import sitemap
from django.urls import path
from .models import Product


class ProductSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.8

    def items(self):
        return Product.objects.all()

    def location(self, product):
        return f'/products/{product.id}/'

    def lastmod(self, product):
        return product.updated_at


sitemaps = {'products': ProductSitemap}

urlpatterns = [
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]

# robots.txt (статичний файл або view):
# User-agent: *
# Disallow: /admin/
# Disallow: /cart/
# Allow: /
#
# Sitemap: https://myshop.com/sitemap.xml
`
  );

  /* ─── 11-14: Docker + Nginx + PostgreSQL ──────────────────────────── */
  patch('11-14',
    { uk:`<h2>Docker + Nginx + PostgreSQL для продакшну</h2>
<pre>version: '3.9'

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000 --workers 4
    depends_on: [db, redis]

  celery:
    build: ./backend
    command: celery -A myproject worker --loglevel=info
    depends_on: [redis, db]

  frontend:
    build: ./frontend

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    ports: ["80:80", "443:443"]
    depends_on: [backend, frontend]

volumes:
  pgdata:</pre>
<p>Окремий сервіс <code>celery</code> — це ТОЙ САМИЙ код бекенду, але запущений з іншою командою (воркер, а не веб-сервер); обидва контейнери використовують спільну базу й Redis.</p>`,
      ru:`<h2>Docker + Nginx + PostgreSQL для продакшна</h2>
<pre>version: '3.9'

services:
  db:
    image: postgres:16

  redis:
    image: redis:7

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000 --workers 4
    depends_on: [db, redis]

  celery:
    build: ./backend
    command: celery -A myproject worker --loglevel=info
    depends_on: [redis, db]

  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    depends_on: [backend, frontend]</pre>
<p>Отдельный сервис celery — тот же код бэкенда, но с другой командой (воркер, а не веб-сервер).</p>` },
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
  setTimeout(function () { logLine('db       | ready to accept connections', '#4ade80'); }, 250);
  setTimeout(function () { logLine('redis    | Ready to accept connections', '#4ade80'); }, 500);
  setTimeout(function () { logLine('backend  | gunicorn (4 workers) listening at :8000', '#4ade80'); }, 800);
  setTimeout(function () { logLine('celery   | worker ready, waiting for tasks', '#4ade80'); }, 1100);
  setTimeout(function () { logLine('frontend | build compiled', '#4ade80'); }, 1350);
  setTimeout(function () { logLine('nginx    | proxying :80/:443 -> backend/frontend', '#4ade80'); }, 1600);
}

row.appendChild(mkBtn('docker-compose up --build (6 сервісів)', runUp));`,
    [
      { level:'easy',   uk:'Виконай <code>up --build</code> і подивись, як ВСІ 6 сервісів (db, redis, backend, celery, frontend, nginx) стартують у логічному порядку.', ru:'Выполни up --build и посмотри, как все 6 сервисов стартуют в логичном порядке.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши сервіс <code>celery-beat</code> для періодичних задач (окремо від звичайного <code>celery</code>-воркера).', ru:'В main.py допиши сервис celery-beat для периодических задач.' },
      { level:'hard',   uk:'Додай у <code>nginx.conf</code> (як коментар у main.py) правило для HTTPS-редиректу з порту 80 на 443.', ru:'Добавь в nginx.conf правило для HTTPS-редиректа с порта 80 на 443.' },
    ],
    `version: '3.9'

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7

  backend:
    build: ./backend
    command: gunicorn myproject.wsgi:application --bind 0.0.0.0:8000 --workers 4
    depends_on:
      - db
      - redis

  celery:
    build: ./backend
    command: celery -A myproject worker --loglevel=info
    depends_on:
      - redis
      - db

  celery-beat:
    build: ./backend
    command: celery -A myproject beat --loglevel=info
    depends_on:
      - redis
      - db

  frontend:
    build: ./frontend

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
      - frontend

volumes:
  pgdata:

# nginx.conf (HTTPS-редирект):
# server {
#     listen 80;
#     return 301 https://$host$request_uri;
# }
`
  );

  /* ─── 11-15: ФІНАЛ 3 — деплой ───────────────────────────────────────── */
  patch('11-15',
    { uk:`<h2>ФІНАЛ 3: E-commerce MVP — деплой</h2>
<p>Третій і останній фінальний проект курсу завершено: інтернет-магазин з каталогом, кошиком, оплатою через Stripe, відгуками й рекомендаціями.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ Django-моделі: Product, Category, Order, Payment, Review</li>
  <li>✅ React: каталог, галерея товару, кошик, checkout</li>
  <li>✅ Stripe-інтеграція (принцип), Celery-сповіщення</li>
  <li>✅ Рекомендації через коефіцієнт Жаккара, SEO (sitemap/robots.txt)</li>
</ul>
<h3>Деплой</h3>
<pre>git pull origin main
docker-compose up -d --build
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py collectstatic --noinput</pre>
<h3>Що далі</h3>
<p>Курс "Фулстек-Про 14-18" завершується модулем 12 (DevOps та деплой) — узагальненням усього пройденого шляху: від JavaScript Pro (модуль 1) до трьох повноцінних fullstack-проектів.</p>`,
      ru:`<h2>ФИНАЛ 3: E-commerce MVP — деплой</h2>
<p>Третий и последний финальный проект курса завершён: интернет-магазин с каталогом, корзиной, оплатой через Stripe, отзывами и рекомендациями.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ Django-модели: Product, Category, Order, Payment, Review</li>
  <li>✅ React: каталог, галерея товара, корзина, checkout</li>
  <li>✅ Stripe-интеграция (принцип), Celery-уведомления</li>
  <li>✅ Рекомендации через коэффициент Жаккара, SEO</li>
</ul>
<h3>Деплой</h3>
<pre>git pull origin main
docker-compose up -d --build
docker-compose exec backend python manage.py migrate</pre>
<h3>Что дальше</h3>
<p>Курс завершается модулем 12 (DevOps и деплой).</p>` },
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
    ['$ pytest', '#68a063'],
    ['$ git pull origin main', '#68a063'],
    ['$ docker-compose up -d --build', '#68a063'],
    ['$ docker-compose exec backend python manage.py migrate', '#68a063'],
    ['$ docker-compose exec backend python manage.py collectstatic --noinput', '#68a063'],
    ['$ curl -f https://myshop.com/api/products/ (health check)', '#68a063'],
    ['✓ Деплой завершено. E-commerce MVP доступний на https://myshop.com', '#4ade80']
  ];
  steps.forEach(function (step, i) {
    setTimeout(function () { logLine(step[0], step[1]); }, i * 350);
  });
}

row.appendChild(mkBtn('🚀 Задеплоїти на VPS', runDeploy));`,
    [
      { level:'easy',   uk:'Натисни "Задеплоїти на VPS" і подивись на повну послідовність кроків, включно з фінальною перевіркою (health check) через curl.', ru:'Нажми "Задеплоить на VPS" и посмотри на полную последовательность шагов, включая health check через curl.' },
      { level:'medium', uk:'У справжньому коді (main.py) допиши, які змінні середовища ОБОВʼЯЗКОВІ для Stripe у продакшні (мінімум 2).', ru:'В main.py допиши обязательные переменные окружения для Stripe в продакшене.' },
      { level:'hard',   uk:'Підсумуй КОРОТКИМ списком (коментарем у main.py) усі три фінальні проекти курсу (Gym Tracker, Навчальна платформа, E-commerce) і по ОДНІЙ ключовій технології, унікальній для кожного.', ru:'Подведи итог по всем трём финальным проектам курса и по одной ключевой технологии для каждого.' },
    ],
    `# Послідовність деплою E-commerce MVP

# 1. Тести
# pytest

# 2. Оновлення й перезбірка
# git pull origin main
# docker-compose up -d --build

# 3. Міграції та статика
# docker-compose exec backend python manage.py migrate
# docker-compose exec backend python manage.py collectstatic --noinput

# 4. Обовʼязкові змінні середовища для Stripe у продакшні:
# STRIPE_SECRET_KEY=sk_live_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# 5. Перевірка працездатності
# curl -f https://myshop.com/api/products/

# Підсумок трьох фінальних проектів курсу:
# - Gym Tracker (09)         -> ключова технологія: JWT-автентифікація + sql.js-схема
# - Навчальна платформа (10) -> ключова технологія: Django Channels (чат у реальному часі)
# - E-commerce MVP (11)      -> ключова технологія: Stripe-інтеграція + алгоритм рекомендацій
`
  );

})();
