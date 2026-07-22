/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 12 — DevOps та деплой · 14–18 Фулстек Про
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function patch(id, theory, html, css, js, tasks, python) {
    var l = WEB_LESSONS.find(function(x){ return x.id === id; });
    if (!l) return;
    l.theory = theory;
    l.starterCode.html   = html   || '';
    l.starterCode.css    = css    || '';
    l.starterCode.js     = js     || '';
    l.starterCode.python = python || '';
    l.tasks = tasks;
  }

  /* Спільний хелпер для лекцій, що використовують реальний sql.js
     (SQLite, скомпільований у WASM) — той самий підхід, що й у
     модулях 08-11. sql.js вже підключено глобально у index.html,
     тож initSqlJs доступний у будь-якому python-уроці. */
  var SQLJS_HELPERS_SRC = `function mkBtn(text, onClick) {
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

  /* ─── 12-01: Git Pro ─────────────────────────────────────── */
  patch('12-01',
    { uk:`<h2>Git Pro: branching models, rebase, cherry-pick, stash</h2>
<p>Git — не просто "зберегти файли". Для командної роботи важливо розуміти <strong>моделі гілок</strong>, принципи переписування історії і тонкощі роботи з комітами.</p>

<h3>Моделі розгалуження</h3>
<ul>
<li><strong>Git Flow</strong> — класична модель: <code>main</code>, <code>develop</code>, <code>feature/*</code>, <code>release/*</code>, <code>hotfix/*</code>. Підходить для продуктів з релізними циклами.</li>
<li><strong>Trunk-Based Development</strong> — всі розробники щодня пушать в <code>main</code>, використовуючи feature-flags. Основа CI/CD.</li>
<li><strong>GitHub Flow</strong> — спрощений варіант: <code>main</code> + short-lived feature branches + Pull Request.</li>
</ul>

<h3>rebase vs merge</h3>
<pre>git merge feature        # зберігає всю історію, додає merge-коміт
git rebase main          # перепише base feature-гілки — лінійна історія
git rebase -i HEAD~3     # інтерактивний rebase: squash, fixup, reword</pre>
<p><strong>Правило</strong>: ніколи не робіть <code>rebase</code> на публічних гілках — переписуєте SHA і ламаєте колег.</p>

<h3>cherry-pick</h3>
<pre>git cherry-pick a1b2c3d  # переносить конкретний коміт в поточну гілку
git cherry-pick A..B     # діапазон комітів (A не включається)</pre>

<h3>stash</h3>
<pre>git stash                # зберігає незакоміченні зміни
git stash push -m "wip: login form"
git stash list           # список
git stash pop            # відновити + видалити з стека
git stash apply stash@{1}# відновити без видалення</pre>

<h3>Git Hooks</h3>
<p>Хуки — скрипти у <code>.git/hooks/</code>, що запускаються автоматично. Популярні: <code>pre-commit</code> (lint/test), <code>commit-msg</code> (перевірка формату), <code>pre-push</code>.</p>
<pre># .git/hooks/pre-commit (chmod +x)
#!/bin/sh
npm run lint || exit 1</pre>`,
      ru:`<h2>Git Pro: branching models, rebase, cherry-pick, stash</h2>
<p>Git — не просто "сохранить файлы". Для командной работы важно понимать <strong>модели ветвления</strong>, принципы перезаписи истории и тонкости работы с коммитами.</p>

<h3>Модели ветвления</h3>
<ul>
<li><strong>Git Flow</strong> — классическая модель: <code>main</code>, <code>develop</code>, <code>feature/*</code>, <code>release/*</code>, <code>hotfix/*</code>. Подходит для продуктов с релизными циклами.</li>
<li><strong>Trunk-Based Development</strong> — все разработчики ежедневно пушат в <code>main</code>, используя feature-flags. Основа CI/CD.</li>
<li><strong>GitHub Flow</strong> — упрощённый вариант: <code>main</code> + short-lived feature branches + Pull Request.</li>
</ul>

<h3>rebase vs merge</h3>
<pre>git merge feature        # сохраняет всю историю, добавляет merge-коммит
git rebase main          # перепишет base feature-ветки — линейная история
git rebase -i HEAD~3     # интерактивный rebase: squash, fixup, reword</pre>
<p><strong>Правило</strong>: никогда не делайте <code>rebase</code> на публичных ветках — перезаписываете SHA и ломаете коллег.</p>

<h3>cherry-pick</h3>
<pre>git cherry-pick a1b2c3d  # переносит конкретный коммит в текущую ветку
git cherry-pick A..B     # диапазон коммитов (A не включается)</pre>

<h3>stash</h3>
<pre>git stash                # сохраняет незакоммиченные изменения
git stash push -m "wip: login form"
git stash list           # список
git stash pop            # восстановить + удалить из стека
git stash apply stash@{1}# восстановить без удаления</pre>

<h3>Git Hooks</h3>
<p>Хуки — скрипты в <code>.git/hooks/</code>, запускаемые автоматически. Популярные: <code>pre-commit</code> (lint/test), <code>commit-msg</code> (проверка формата), <code>pre-push</code>.</p>
<pre># .git/hooks/pre-commit (chmod +x)
#!/bin/sh
npm run lint || exit 1</pre>` },
    `<div id="git-app">
<h2 style="margin:0 0 12px;color:#7c3aed;font-size:16px">🌿 Git Branching Simulator</h2>
<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
  <button onclick="gitCmd('feature')" class="gb">+ feature branch</button>
  <button onclick="gitCmd('commit')" class="gb">commit</button>
  <button onclick="gitCmd('merge')" class="gb">merge → main</button>
  <button onclick="gitCmd('rebase')" class="gb">rebase</button>
  <button onclick="gitCmd('cherry')" class="gb">cherry-pick</button>
  <button onclick="gitCmd('stash')" class="gb">stash</button>
  <button onclick="gitCmd('reset')" class="gb reset">Reset</button>
</div>
<canvas id="git-canvas" width="680" height="260" style="border:1px solid #334155;border-radius:8px;background:#0f172a;display:block;max-width:100%"></canvas>
<div id="git-log" style="margin-top:10px;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px;font-family:monospace;font-size:12px;color:#94a3b8;max-height:120px;overflow-y:auto"></div>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',sans-serif}
body{background:#0f172a;color:#f1f5f9;padding:14px}
.gb{background:#1e293b;border:1px solid #334155;color:#a5b4fc;padding:5px 10px;border-radius:6px;cursor:pointer;font-size:12px}
.gb:hover{border-color:#7c3aed;color:#c4b5fd}
.gb.reset{color:#f87171;border-color:#450a0a}`,
    `var branches = { main:[{sha:'a1b2',msg:'initial commit',x:60,y:80}] };
var current = 'main'; var featureCount=0; var commits=branches.main.slice();
var log = [];

function sha(){ return Math.random().toString(16).slice(2,6); }
function addLog(msg){ log.unshift(msg); if(log.length>20) log.pop(); document.getElementById('git-log').innerHTML = log.join('<br>'); }

function gitCmd(cmd){
  var s = sha();
  if(cmd==='feature'){
    featureCount++;
    var name='feature/f'+featureCount;
    var last=branches[current][branches[current].length-1];
    branches[name]=[{sha:s,msg:'feat: start '+name,x:last.x+70,y:current==='main'?160:last.y}];
    current=name;
    addLog('<span style="color:#818cf8">$ git checkout -b '+name+'</span>');
  } else if(cmd==='commit'){
    var last=branches[current][branches[current].length-1];
    branches[current].push({sha:s,msg:'feat: change in '+current,x:last.x+70,y:last.y});
    addLog('<span style="color:#4ade80">$ git commit -m "feat: change"</span> → ['+current+' '+s+']');
  } else if(cmd==='merge'){
    if(current!=='main'){
      var last=branches['main'][branches['main'].length-1];
      branches['main'].push({sha:s,msg:'Merge '+current+' → main',x:last.x+70,y:80});
      addLog('<span style="color:#fb923c">$ git merge '+current+'</span> → merge commit '+s);
      current='main';
    }
  } else if(cmd==='rebase'){
    addLog('<span style="color:#f59e0b">$ git rebase -i HEAD~2</span> → rewrote 2 commits (squash)');
  } else if(cmd==='cherry'){
    var last=branches[current][branches[current].length-1];
    branches[current].push({sha:s,msg:'cherry-pick: hotfix',x:last.x+70,y:last.y});
    addLog('<span style="color:#34d399">$ git cherry-pick deadbeef</span> → ['+current+' '+s+']');
  } else if(cmd==='stash'){
    addLog('<span style="color:#94a3b8">$ git stash push -m "wip"</span> → saved 1 stash entry');
  } else if(cmd==='reset'){
    branches={main:[{sha:'a1b2',msg:'initial commit',x:60,y:80}]};
    current='main'; featureCount=0; log=[];
    document.getElementById('git-log').innerHTML='';
  }
  draw();
}

function draw(){
  var c=document.getElementById('git-canvas'), ctx=c.getContext('2d');
  ctx.clearRect(0,0,c.width,c.height);
  var colors={main:'#818cf8','feature/f1':'#4ade80','feature/f2':'#fb923c','feature/f3':'#f59e0b'};
  Object.keys(branches).forEach(function(br){
    var brs=branches[br]; var col=colors[br]||'#7dd3fc';
    ctx.strokeStyle=col; ctx.lineWidth=2;
    ctx.beginPath();
    brs.forEach(function(n,i){ if(i===0) ctx.moveTo(n.x,n.y); else ctx.lineTo(n.x,n.y); });
    ctx.stroke();
    brs.forEach(function(n){
      ctx.fillStyle=col; ctx.beginPath(); ctx.arc(n.x,n.y,6,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#f1f5f9'; ctx.font='10px monospace';
      ctx.fillText(n.sha,n.x-10,n.y-12);
    });
    ctx.fillStyle=col; ctx.font='11px sans-serif';
    ctx.fillText(br, brs[brs.length-1].x+10, brs[brs.length-1].y+4);
  });
}
draw();`,
    [
      { level:'easy',   uk:'Запусти симулятор: створи feature branch, зроби 2 commits, злий у main. Чому в main зявляється merge-commit?', ru:'Запусти симулятор: создай feature branch, сделай 2 commits, смёрджи в main. Почему в main появляется merge-commit?' },
      { level:'easy',   uk:'Дослідь різницю: merge vs rebase у симуляторі. Яка модель дає лінійну git-історію? Яка зберігає повну картину?', ru:'Исследуй разницу: merge vs rebase в симуляторе. Какая модель даёт линейную git-историю? Какая сохраняет полную картину?' },
      { level:'medium', uk:'Реалізуй Git Flow для свого проекту: намалюй (на папері або у Mermaid) діаграму гілок main → develop → feature → release → hotfix.', ru:'Реализуй Git Flow для своего проекта: нарисуй (на бумаге или в Mermaid) диаграмму веток main → develop → feature → release → hotfix.' },
      { level:'medium', uk:'Напиши pre-commit hook (shell-скрипт), що забороняє комітити, якщо у файлах є рядок "TODO: REMOVE". Збережи у .git/hooks/pre-commit.', ru:'Напиши pre-commit hook (shell-скрипт), который запрещает коммитить, если в файлах есть строка "TODO: REMOVE". Сохрани в .git/hooks/pre-commit.' },
      { level:'hard',   uk:'Опиши сценарій: ти зробив 5 комітів на feature-гілці з помилками і тестовим кодом. Як за допомогою rebase -i "очистити" гілку перед PR? Які ризики?', ru:'Опиши сценарий: ты сделал 5 коммитов на feature-ветке с ошибками и тестовым кодом. Как с помощью rebase -i "очистить" ветку перед PR? Какие риски?' },
      { level:'hard',   uk:'Реалізуй commit-msg hook, що перевіряє формат Conventional Commits: `type(scope): description`. Заборони commit, якщо формат неправильний.', ru:'Реализуй commit-msg hook, проверяющий формат Conventional Commits: `type(scope): description`. Запрети commit, если формат неправильный.' },
      { level:'extra',  uk:'Впровади trunk-based development для командного проекту: налаштуй захист main-гілки (branch protection), обовязкові PR review та автоматичні перевірки.', ru:'Внедри trunk-based development для командного проекта: настрой защиту main-ветки (branch protection), обязательные PR review и автоматические проверки.' },
    ],
    '');

  /* ─── 12-02: Docker ──────────────────────────────────────── */
  patch('12-02',
    { uk:`<h2>Docker: Dockerfile, layers та multi-stage build</h2>
<p>Docker дозволяє упакувати додаток разом із залежностями в ізольований контейнер. Контейнер — це процес з власною файловою системою, мережею та простором імен.</p>

<h3>Ключові концепції</h3>
<ul>
<li><strong>Image</strong> — незмінний шаблон. Складається зі стеку шарів (layers).</li>
<li><strong>Container</strong> — запущений екземпляр image. Ізольований процес.</li>
<li><strong>Layer</strong> — кожна інструкція Dockerfile (RUN, COPY) створює новий шар. Шари кешуються.</li>
<li><strong>Registry</strong> — сховище images (Docker Hub, GHCR, ECR).</li>
</ul>

<h3>Dockerfile: основні інструкції</h3>
<pre>FROM python:3.12-slim       # базовий образ
WORKDIR /app                # робоча директорія
COPY requirements.txt .     # спочатку залежності (кеш)
RUN pip install --no-cache-dir -r requirements.txt
COPY . .                    # потім код
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
EXPOSE 8000
CMD ["gunicorn","myapp.wsgi:application","--bind","0.0.0.0:8000"]</pre>

<h3>Порядок шарів важливий!</h3>
<p>Кожна зміна інвалідує кеш для всіх наступних шарів. Тому спочатку копіюємо <code>requirements.txt</code>, встановлюємо залежності, і лише потім копіюємо код — так залежності кешуються і не встановлюються при кожній зміні коду.</p>

<h3>Multi-stage build</h3>
<pre>FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]</pre>
<p>Multi-stage: білдимо у великому образі, але фінальний артефакт копіюємо в мінімальний. Розмір образу зменшується у 10+ разів.</p>

<h3>Корисні команди</h3>
<pre>docker build -t myapp:v1 .
docker run -d -p 8000:8000 --name myapp myapp:v1
docker logs -f myapp
docker exec -it myapp sh
docker images && docker ps
docker system prune -af     # прибрати все невикористане</pre>`,
      ru:`<h2>Docker: Dockerfile, layers и multi-stage build</h2>
<p>Docker позволяет упаковать приложение вместе с зависимостями в изолированный контейнер. Контейнер — это процесс с собственной файловой системой, сетью и пространством имён.</p>

<h3>Ключевые концепции</h3>
<ul>
<li><strong>Image</strong> — неизменяемый шаблон. Состоит из стека слоёв (layers).</li>
<li><strong>Container</strong> — запущенный экземпляр image. Изолированный процесс.</li>
<li><strong>Layer</strong> — каждая инструкция Dockerfile (RUN, COPY) создаёт новый слой. Слои кешируются.</li>
<li><strong>Registry</strong> — хранилище images (Docker Hub, GHCR, ECR).</li>
</ul>

<h3>Dockerfile: основные инструкции</h3>
<pre>FROM python:3.12-slim       # базовый образ
WORKDIR /app                # рабочая директория
COPY requirements.txt .     # сначала зависимости (кеш)
RUN pip install --no-cache-dir -r requirements.txt
COPY . .                    # потом код
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
EXPOSE 8000
CMD ["gunicorn","myapp.wsgi:application","--bind","0.0.0.0:8000"]</pre>

<h3>Порядок слоёв важен!</h3>
<p>Каждое изменение инвалидирует кеш для всех последующих слоёв. Поэтому сначала копируем <code>requirements.txt</code>, устанавливаем зависимости, и только потом копируем код — так зависимости кешируются.</p>

<h3>Multi-stage build</h3>
<pre>FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]</pre>
<p>Multi-stage: билдим в большом образе, но финальный артефакт копируем в минимальный. Размер образа уменьшается в 10+ раз.</p>

<h3>Полезные команды</h3>
<pre>docker build -t myapp:v1 .
docker run -d -p 8000:8000 --name myapp myapp:v1
docker logs -f myapp
docker exec -it myapp sh
docker images && docker ps
docker system prune -af     # убрать всё неиспользуемое</pre>` },
    `<div style="font-family:monospace;font-size:13px;padding:10px;background:#0f172a;color:#e2e8f0;border-radius:8px">
<p style="color:#7dd3fc;margin:0 0 8px">📄 Dockerfile для Django + Gunicorn (редагуй у вкладці Python)</p>
<div id="docker-preview" style="background:#1e293b;padding:12px;border-radius:6px;white-space:pre;overflow-x:auto;font-size:12px;color:#94a3b8">Завантаження...</div>
<div style="margin-top:10px;display:flex;gap:8px">
  <button onclick="analyzeDockerfile()" style="background:#7c3aed;border:none;color:#fff;padding:6px 12px;border-radius:6px;cursor:pointer">Аналіз шарів</button>
  <div id="docker-info" style="font-size:11px;color:#64748b;padding:6px"></div>
</div>
<div id="docker-layers" style="margin-top:10px"></div>
</div>`,
    `*{box-sizing:border-box}body{margin:0;padding:0}`,
    `function analyzeDockerfile(){
  var ta=document.querySelector('textarea[id]')||{value:''};
  var lines=(ta.value||'').split('\n').filter(function(l){return l.trim();});
  var layers=lines.filter(function(l){return /^(FROM|RUN|COPY|ADD)/i.test(l.trim());});
  var el=document.getElementById('docker-layers');
  var info=document.getElementById('docker-info');
  info.textContent='Шарів: '+layers.length+' | Кешуються після змін коду';
  el.innerHTML=layers.map(function(l,i){
    var col=l.startsWith('FROM')?'#818cf8':l.startsWith('RUN')?'#4ade80':l.startsWith('COPY')?'#fb923c':'#f59e0b';
    return '<div style="margin:3px 0;padding:4px 8px;border-left:3px solid '+col+';background:#1e293b;font-size:11px;color:#e2e8f0">Layer '+(i+1)+': '+l+'</div>';
  }).join('');
}
var pv=document.getElementById('docker-preview');
setTimeout(function(){
  if(pv) pv.textContent='Переключись на вкладку Python щоб побачити Dockerfile';
},500);`,
    [
      { level:'easy',   uk:'Поясни різницю між `docker build` та `docker run`. Що таке image та container? Намалюй схему: Registry → Image → Container.', ru:'Объясни разницу между `docker build` и `docker run`. Что такое image и container? Нарисуй схему: Registry → Image → Container.' },
      { level:'easy',   uk:'Подивись на Dockerfile у вкладці Python. Скільки шарів буде створено? Які з них кешуватимуться при зміні коду (не залежностей)?', ru:'Посмотри на Dockerfile во вкладке Python. Сколько слоёв будет создано? Какие из них кешируются при изменении кода (не зависимостей)?' },
      { level:'medium', uk:'Змоделюй проблему: ти поставив COPY . . перед RUN pip install. Що станеться з кешем при кожній зміні `.py`-файлу? Виправ порядок.', ru:'Смоделируй проблему: ты поставил COPY . . перед RUN pip install. Что случится с кешем при каждом изменении `.py`-файла? Исправь порядок.' },
      { level:'medium', uk:'Напиши Dockerfile для Node.js Express-додатку: FROM node:20-alpine, встанови залежності через npm ci, збери TypeScript, запусти node dist/index.js.', ru:'Напиши Dockerfile для Node.js Express-приложения: FROM node:20-alpine, установи зависимости через npm ci, скомпилируй TypeScript, запусти node dist/index.js.' },
      { level:'hard',   uk:'Реалізуй multi-stage build для React SPA: stage 1 — npm run build у node:20, stage 2 — копіюй dist/ в nginx:alpine. Порівняй розміри образів.', ru:'Реализуй multi-stage build для React SPA: stage 1 — npm run build в node:20, stage 2 — скопируй dist/ в nginx:alpine. Сравни размеры образов.' },
      { level:'hard',   uk:'Додай у Dockerfile непривілейованого користувача (RUN adduser) і перемикнись на нього через USER. Чому root у контейнері — це ризик безпеки?', ru:'Добавь в Dockerfile непривилегированного пользователя (RUN adduser) и переключись на него через USER. Почему root в контейнере — это риск безопасности?' },
      { level:'extra',  uk:'Оптимізуй Dockerfile для production: використай --no-install-recommends, видали тимчасові файли в тому ж RUN-шарі, додай HEALTHCHECK. Виміряй розмір до і після.', ru:'Оптимизируй Dockerfile для production: используй --no-install-recommends, удали временные файлы в том же RUN-слое, добавь HEALTHCHECK. Измерь размер до и после.' },
    ],
    `# Dockerfile для Django + Gunicorn
# Зберіг у корені проекту

FROM python:3.12-slim

# Системні залежності
RUN apt-get update && apt-get install -y \\
    postgresql-client \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1) Спочатку залежності — кешуються!
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2) Потім код
COPY . .

# Змінні середовища
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1 \\
    DJANGO_SETTINGS_MODULE=config.settings.production

# Статика
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Непривілейований користувач
RUN adduser --disabled-password --gecos '' appuser
USER appuser

CMD ["gunicorn", "config.wsgi:application", \\
     "--bind", "0.0.0.0:8000", \\
     "--workers", "4", \\
     "--timeout", "30"]
`);

  /* ─── 12-03: docker-compose ──────────────────────────────── */
  patch('12-03',
    { uk:`<h2>docker-compose: сервіси, мережі, volumes та secrets</h2>
<p><code>docker-compose</code> описує мульти-контейнерний застосунок у YAML. Один файл замінює десятки команд docker run.</p>

<h3>Структура docker-compose.yml</h3>
<pre>version: "3.9"
services:
  web:                        # Django/FastAPI
    build: .
    ports: ["8000:8000"]
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
    networks: [backend]

  db:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD","pg_isready","-U","user","-d","mydb"]
      interval: 5s
      retries: 5
    networks: [backend]

  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
    networks: [backend]

  nginx:
    image: nginx:alpine
    ports: ["80:80","443:443"]
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - staticfiles:/static:ro
    depends_on: [web]
    networks: [backend, frontend]

volumes:
  pgdata: {}
  redisdata: {}
  staticfiles: {}

networks:
  backend: {}
  frontend: {}</pre>

<h3>depends_on та healthcheck</h3>
<p><code>depends_on</code> з <code>condition: service_healthy</code> гарантує, що Django стартує лише після того, як PostgreSQL готовий приймати підключення — не просто запущений, а реально ініціалізований.</p>

<h3>Volumes</h3>
<ul>
<li><strong>Named volumes</strong> (<code>pgdata:</code>) — керуються Docker, persist між рестартами.</li>
<li><strong>Bind mounts</strong> (<code>./nginx.conf:/etc/...)</code>) — прив'язка до хост-файлу, зручно для конфігів та розробки.</li>
</ul>

<h3>Secrets (production)</h3>
<pre>secrets:
  db_password:
    file: ./secrets/db_password.txt
services:
  db:
    secrets: [db_password]
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password</pre>

<h3>Команди</h3>
<pre>docker compose up -d           # запустити у фоні
docker compose logs -f web     # логи конкретного сервісу
docker compose exec web python manage.py migrate
docker compose down -v         # зупинити + видалити volumes</pre>`,
      ru:`<h2>docker-compose: сервисы, сети, volumes и secrets</h2>
<p><code>docker-compose</code> описывает мульти-контейнерное приложение в YAML. Один файл заменяет десятки команд docker run.</p>

<h3>Структура docker-compose.yml</h3>
<pre>version: "3.9"
services:
  web:                        # Django/FastAPI
    build: .
    ports: ["8000:8000"]
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
    networks: [backend]

  db:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD","pg_isready","-U","user","-d","mydb"]
      interval: 5s
      retries: 5
    networks: [backend]

  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
    networks: [backend]

  nginx:
    image: nginx:alpine
    ports: ["80:80","443:443"]
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - staticfiles:/static:ro
    depends_on: [web]
    networks: [backend, frontend]

volumes:
  pgdata: {}
  redisdata: {}
  staticfiles: {}

networks:
  backend: {}
  frontend: {}</pre>

<h3>depends_on и healthcheck</h3>
<p><code>depends_on</code> с <code>condition: service_healthy</code> гарантирует, что Django стартует только после того, как PostgreSQL готов принимать подключения.</p>

<h3>Volumes</h3>
<ul>
<li><strong>Named volumes</strong> (<code>pgdata:</code>) — управляются Docker, persist между рестартами.</li>
<li><strong>Bind mounts</strong> (<code>./nginx.conf:/etc/...</code>) — привязка к хост-файлу, удобно для конфигов.</li>
</ul>

<h3>Secrets (production)</h3>
<pre>secrets:
  db_password:
    file: ./secrets/db_password.txt
services:
  db:
    secrets: [db_password]
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password</pre>

<h3>Команды</h3>
<pre>docker compose up -d           # запустить в фоне
docker compose logs -f web     # логи конкретного сервиса
docker compose exec web python manage.py migrate
docker compose down -v         # остановить + удалить volumes</pre>` },
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

/* Справжня функція підстановки healthcheck-залежностей: web чекає, поки db стане healthy */
function simulateComposeUp() {
  logLine('', '');
  logLine('$ docker compose up -d', '#68a063');
  setTimeout(function () { logLine('Creating network "backend"...', '#4ade80'); }, 200);
  setTimeout(function () { logLine('Creating volume "pgdata"...', '#4ade80'); }, 400);
  setTimeout(function () { logLine('db      | database system is starting up...', '#facc15'); }, 700);
  setTimeout(function () { logLine('db      | database system is ready (healthcheck: OK)', '#4ade80'); }, 1300);
  setTimeout(function () { logLine('redis   | Ready to accept connections', '#4ade80'); }, 1500);
  setTimeout(function () { logLine('web     | depends_on: db (condition: service_healthy) -> задоволено, запускаю gunicorn', '#4ade80'); }, 1800);
  setTimeout(function () { logLine('nginx   | proxying :80 -> web:8000', '#4ade80'); }, 2100);
}

function simulateComposeDown() {
  logLine('', '');
  logLine('$ docker compose down -v', '#68a063');
  setTimeout(function () { logLine('Stopping nginx... done', '#f87171'); }, 200);
  setTimeout(function () { logLine('Stopping web... done', '#f87171'); }, 400);
  setTimeout(function () { logLine('Stopping db... done', '#f87171'); }, 600);
  setTimeout(function () { logLine('Removing volumes: pgdata, redisdata (дані видалено!)', '#f87171'); }, 900);
}

row.appendChild(mkBtn('docker compose up -d', simulateComposeUp));
row.appendChild(mkBtn('docker compose down -v', simulateComposeDown));`,
    [
      { level:'easy',   uk:'Відкрий вкладку Python і вивчи docker-compose.yml. Скільки сервісів? Які порти відкриті назовні? Яка мережа з\'єднує web та db?', ru:'Открой вкладку Python и изучи docker-compose.yml. Сколько сервисов? Какие порты открыты наружу? Какая сеть соединяет web и db?' },
      { level:'easy',   uk:'Поясни навіщо потрібен healthcheck для PostgreSQL. Що станеться якщо Django запуститься раніше ніж PostgreSQL готовий приймати підключення?', ru:'Объясни зачем нужен healthcheck для PostgreSQL. Что случится если Django запустится раньше чем PostgreSQL готов принимать подключения?' },
      { level:'medium', uk:'Додай до docker-compose.yml сервіс Celery worker (той самий образ що web, команда: celery -A config worker -l info). Він повинен залежати від redis.', ru:'Добавь в docker-compose.yml сервис Celery worker (тот же образ что web, команда: celery -A config worker -l info). Он должен зависеть от redis.' },
      { level:'medium', uk:'Налаштуй два окремих compose-файли: docker-compose.yml (prod) та docker-compose.dev.yml (dev з volume на ./:/app для hot-reload). Поясни як запустити dev-варіант.', ru:'Настрой два отдельных compose-файла: docker-compose.yml (prod) и docker-compose.dev.yml (dev с volume на ./:/app для hot-reload). Объясни как запустить dev-вариант.' },
      { level:'hard',   uk:'Реалізуй secrets у compose: виніси паролі БД з environment у Docker secrets (файл ./secrets/db_pass.txt). Переконайся що секрети НЕ потрапляють у git (додай у .gitignore).', ru:'Реализуй secrets в compose: вынеси пароли БД из environment в Docker secrets (файл ./secrets/db_pass.txt). Убедись что секреты НЕ попадают в git (добавь в .gitignore).' },
      { level:'hard',   uk:'Напиши скрипт healthcheck для сервісу Django: перевіряє що /health/ endpoint повертає 200. Додай цей healthcheck у compose і налаштуй nginx depends_on з condition: service_healthy.', ru:'Напиши скрипт healthcheck для сервиса Django: проверяет что /health/ endpoint возвращает 200. Добавь этот healthcheck в compose и настрой nginx depends_on с condition: service_healthy.' },
      { level:'extra',  uk:'Додай Flower (моніторинг Celery) як окремий сервіс з Basic Auth через nginx. Сервіс має бути доступний тільки з internal мережі, не напряму з інтернету.', ru:'Добавь Flower (мониторинг Celery) как отдельный сервис с Basic Auth через nginx. Сервис должен быть доступен только из internal сети, не напрямую из интернета.' },
    ],
    `# docker-compose.yml — повний стек: Django + PostgreSQL + Redis + Nginx

version: "3.9"

services:
  # ── Django / Gunicorn ─────────────────────────────────────
  web:
    build:
      context: .
      dockerfile: Dockerfile
    env_file: .env
    volumes:
      - staticfiles:/app/staticfiles
    expose:
      - "8000"
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks: [backend]
    restart: unless-stopped

  # ── PostgreSQL ─────────────────────────────────────────────
  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp_db
      POSTGRES_USER: myapp_user
      POSTGRES_PASSWORD: supersecretpassword
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "myapp_user", "-d", "myapp_db"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks: [backend]
    restart: unless-stopped

  # ── Redis ──────────────────────────────────────────────────
  redis:
    image: redis:7-alpine
    command: redis-server --save 60 1 --loglevel warning
    volumes:
      - redisdata:/data
    networks: [backend]
    restart: unless-stopped

  # ── Nginx (reverse proxy) ──────────────────────────────────
  nginx:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
      - staticfiles:/static:ro
      - ./certbot/conf:/etc/letsencrypt:ro
      - ./certbot/www:/var/www/certbot:ro
    depends_on:
      - web
    networks: [backend, frontend]
    restart: unless-stopped

volumes:
  pgdata: {}
  redisdata: {}
  staticfiles: {}

networks:
  backend:
    driver: bridge
  frontend:
    driver: bridge
`);

  /* ─── 12-04: CI/CD GitHub Actions ───────────────────────── */
  patch('12-04',
    { uk:`<h2>CI/CD: GitHub Actions — test → build → push → deploy</h2>
<p><strong>CI (Continuous Integration)</strong> — автоматичне тестування при кожному push. <strong>CD (Continuous Deployment)</strong> — автоматичний деплой після успішних тестів.</p>

<h3>Структура workflow YAML</h3>
<pre>name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  IMAGE_NAME: ghcr.io/myorg/myapp

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -r requirements.txt
      - run: pytest --tb=short -q
        env:
          DATABASE_URL: postgresql://postgres:testpass@localhost/testdb

  build-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ env.IMAGE_NAME }}:latest,\${{ env.IMAGE_NAME }}:\${{ github.sha }}

  deploy:
    needs: build-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.VPS_HOST }}
          username: deploy
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /srv/myapp
            docker compose pull
            docker compose up -d --remove-orphans</pre>

<h3>Secrets у GitHub Actions</h3>
<p>Secrets зберігаються у Settings → Secrets and Variables → Actions. Доступні як <code>\${{ secrets.MY_SECRET }}</code>. Ніколи не з'являються у логах.</p>

<h3>Matrix builds</h3>
<pre>strategy:
  matrix:
    python-version: ["3.11", "3.12"]
    os: [ubuntu-latest, windows-latest]</pre>`,
      ru:`<h2>CI/CD: GitHub Actions — test → build → push → deploy</h2>
<p><strong>CI (Continuous Integration)</strong> — автоматическое тестирование при каждом push. <strong>CD (Continuous Deployment)</strong> — автоматический деплой после успешных тестов.</p>

<h3>Структура workflow YAML</h3>
<pre>name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  IMAGE_NAME: ghcr.io/myorg/myapp

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -r requirements.txt
      - run: pytest --tb=short -q
        env:
          DATABASE_URL: postgresql://postgres:testpass@localhost/testdb

  build-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ env.IMAGE_NAME }}:latest

  deploy:
    needs: build-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.VPS_HOST }}
          username: deploy
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /srv/myapp
            docker compose pull
            docker compose up -d --remove-orphans</pre>

<h3>Secrets в GitHub Actions</h3>
<p>Secrets хранятся в Settings → Secrets and Variables → Actions. Доступны как <code>\${{ secrets.MY_SECRET }}</code>. Никогда не появляются в логах.</p>

<h3>Matrix builds</h3>
<pre>strategy:
  matrix:
    python-version: ["3.11", "3.12"]</pre>` },
    `<div id="cicd-app" style="font-family:sans-serif;padding:10px;background:#0f172a;color:#f1f5f9;border-radius:8px">
<h2 style="color:#818cf8;font-size:15px;margin:0 0 12px">⚡ CI/CD Pipeline Simulator</h2>
<div style="display:flex;gap:8px;margin-bottom:14px">
  <button onclick="runPipeline()" id="run-btn" style="background:#7c3aed;border:none;color:#fff;padding:7px 14px;border-radius:6px;cursor:pointer;font-weight:600">▶ Run Pipeline</button>
  <button onclick="resetPipeline()" style="background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:7px 14px;border-radius:6px;cursor:pointer">Reset</button>
</div>
<div id="pipeline-stages" style="display:flex;gap:12px;flex-wrap:wrap"></div>
<div id="pipeline-log" style="margin-top:12px;background:#020617;padding:10px;border-radius:6px;font-family:monospace;font-size:11px;color:#4ade80;min-height:80px;max-height:160px;overflow-y:auto"></div>
</div>`,
    `*{box-sizing:border-box}body{margin:0}`,
    `var STAGES=[
  {name:'Checkout',icon:'📥',duration:800,logs:['Cloning repo...','HEAD is at a1b2c3d','Done ✓']},
  {name:'Setup Python',icon:'🐍',duration:1200,logs:['Installing Python 3.12...','pip: 23.3.1','Cache restored ✓']},
  {name:'Install deps',icon:'📦',duration:1500,logs:['pip install -r requirements.txt','Collecting django==5.0...','All packages installed ✓']},
  {name:'Run Tests',icon:'🧪',duration:2000,logs:['pytest --tb=short -q','........................','24 passed in 1.43s ✓']},
  {name:'Docker Build',icon:'🐳',duration:1800,logs:['Building image...','Layer cache: HIT (deps)','Successfully tagged :latest ✓']},
  {name:'Push to GHCR',icon:'📤',duration:1000,logs:['Logging in to ghcr.io...','Pushing layers...','Image pushed ✓']},
  {name:'Deploy VPS',icon:'🚀',duration:1200,logs:['SSH to 203.0.113.42...','docker compose pull','Container restarted ✓']},
];
var running=false;
function renderStages(active){
  var el=document.getElementById('pipeline-stages');
  el.innerHTML=STAGES.map(function(s,i){
    var st=i<active?'done':i===active?'active':'pending';
    var col=st==='done'?'#4ade80':st==='active'?'#818cf8':'#334155';
    var bg=st==='done'?'rgba(74,222,128,.1)':st==='active'?'rgba(129,140,248,.15)':'#1e293b';
    return '<div style="border:1px solid '+col+';background:'+bg+';border-radius:8px;padding:8px 12px;min-width:90px;text-align:center">' +
      '<div style="font-size:20px">'+s.icon+'</div>' +
      '<div style="font-size:11px;color:'+col+';margin-top:4px;font-weight:600">'+s.name+'</div>' +
      '<div style="font-size:10px;color:'+(st==='done'?'#4ade80':st==='active'?'#fbbf24':'#475569')+'">'+
        (st==='done'?'✓ Done':st==='active'?'Running...':'Waiting')+'</div></div>';
  }).join('');
}
function addLog(msg){
  var el=document.getElementById('pipeline-log');
  el.innerHTML+='<div>'+msg+'</div>';
  el.scrollTop=el.scrollHeight;
}
function resetPipeline(){
  running=false; renderStages(-1);
  document.getElementById('pipeline-log').innerHTML='';
  document.getElementById('run-btn').disabled=false;
}
function runPipeline(){
  if(running) return; running=true;
  document.getElementById('run-btn').disabled=true;
  document.getElementById('pipeline-log').innerHTML='';
  addLog('<span style="color:#818cf8">$ git push origin main → triggered CI/CD</span>');
  var i=0;
  function runStage(){
    if(i>=STAGES.length){
      addLog('<span style="color:#4ade80">✅ Pipeline completed successfully!</span>');
      running=false; return;
    }
    renderStages(i);
    STAGES[i].logs.forEach(function(l){ addLog(l); });
    setTimeout(function(){ i++; runStage(); }, STAGES[i-1]?STAGES[i-1].duration:800);
  }
  runStage();
}
renderStages(-1);`,
    [
      { level:'easy',   uk:'Запусти симулятор пайплайну. Які стадії виконуються? Яка умова запускає деплой (подивись у теорії: if: github.ref == ...)?', ru:'Запусти симулятор пайплайна. Какие стадии выполняются? Какое условие запускает деплой (посмотри в теории: if: github.ref == ...)?' },
      { level:'easy',   uk:'Поясни різницю між CI та CD. Що може зупинити пайплайн між стадіями test та deploy? Чому це добре?', ru:'Объясни разницу между CI и CD. Что может остановить пайплайн между стадиями test и deploy? Почему это хорошо?' },
      { level:'medium', uk:'Напиши GitHub Actions workflow для Node.js: 1) install deps, 2) run lint (eslint), 3) run tests (jest), 4) build (npm run build). Triggers: push та PR до main.', ru:'Напиши GitHub Actions workflow для Node.js: 1) install deps, 2) run lint (eslint), 3) run tests (jest), 4) build (npm run build). Triggers: push и PR до main.' },
      { level:'medium', uk:'Додай у workflow кешування pip-залежностей через actions/cache з ключем по хешу requirements.txt. Поясни скільки часу це зекономить на кожному запуску.', ru:'Добавь в workflow кеширование pip-зависимостей через actions/cache с ключом по хешу requirements.txt. Объясни сколько времени это сэкономит на каждом запуске.' },
      { level:'hard',   uk:'Реалізуй matrix build: тестуй на Python 3.11 та 3.12. Як GitHub Actions запустить job? Паралельно чи послідовно? Що таке fail-fast?', ru:'Реализуй matrix build: тестируй на Python 3.11 и 3.12. Как GitHub Actions запустит job? Параллельно или последовательно? Что такое fail-fast?' },
      { level:'hard',   uk:'Налаштуй automated rollback: якщо smoke test після деплою падає (curl /health/ повертає не 200), пайплайн повинен автоматично повернути попередній docker image.', ru:'Настрой automated rollback: если smoke test после деплоя падает (curl /health/ возвращает не 200), пайплайн должен автоматически вернуть предыдущий docker image.' },
      { level:'extra',  uk:'Додай стадію security scanning: використай trivy action для перевірки Docker image на вразливості. Failing job якщо знайдені CRITICAL вразливості.', ru:'Добавь стадию security scanning: используй trivy action для проверки Docker image на уязвимости. Failing job если найдены CRITICAL уязвимости.' },
    ],
    '');

  /* ─── 12-05: Linux VPS ───────────────────────────────────── */
  patch('12-05',
    { uk:`<h2>Linux VPS: налаштування, firewall, UFW, systemd</h2>
<p>VPS (Virtual Private Server) — ваш власний Linux-сервер в хмарі. Після отримання від провайдера (DigitalOcean, Hetzner, Linode) він порожній і незахищений — потрібне первинне налаштування.</p>

<h3>Первинне налаштування (checklist)</h3>
<pre># 1. Підключення як root (перший і останній раз)
ssh root@YOUR_SERVER_IP

# 2. Оновлення системи
apt update && apt upgrade -y

# 3. Новий користувач з sudo
adduser deploy
usermod -aG sudo deploy

# 4. SSH-ключ для нового юзера
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys</pre>

<h3>Захист SSH</h3>
<pre># /etc/ssh/sshd_config
PermitRootLogin no          # ОБОВ'ЯЗКОВО
PasswordAuthentication no   # тільки ключі
PubkeyAuthentication yes
Port 2222                   # нестандартний порт (опційно)

systemctl restart sshd</pre>

<h3>UFW Firewall</h3>
<pre>ufw default deny incoming
ufw default allow outgoing
ufw allow 2222/tcp           # SSH (ваш порт)
ufw allow 80/tcp             # HTTP
ufw allow 443/tcp            # HTTPS
ufw enable
ufw status verbose</pre>

<h3>systemd сервіс для застосунку</h3>
<pre># /etc/systemd/system/myapp.service
[Unit]
Description=MyApp Docker Compose
After=docker.service
Requires=docker.service

[Service]
WorkingDirectory=/srv/myapp
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target

# Активація:
systemctl enable myapp
systemctl start myapp
systemctl status myapp
journalctl -u myapp -f     # логи</pre>

<h3>fail2ban</h3>
<pre>apt install fail2ban -y
# Автоматично блокує IP після N невдалих спроб SSH</pre>`,
      ru:`<h2>Linux VPS: настройка, firewall, UFW, systemd</h2>
<p>VPS (Virtual Private Server) — ваш собственный Linux-сервер в облаке. После получения от провайдера он пустой и незащищённый — нужна первичная настройка.</p>

<h3>Первичная настройка (checklist)</h3>
<pre># 1. Подключение как root (первый и последний раз)
ssh root@YOUR_SERVER_IP

# 2. Обновление системы
apt update && apt upgrade -y

# 3. Новый пользователь с sudo
adduser deploy
usermod -aG sudo deploy

# 4. SSH-ключ для нового юзера
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys</pre>

<h3>Защита SSH</h3>
<pre># /etc/ssh/sshd_config
PermitRootLogin no          # ОБЯЗАТЕЛЬНО
PasswordAuthentication no   # только ключи
PubkeyAuthentication yes
Port 2222                   # нестандартный порт (опционально)

systemctl restart sshd</pre>

<h3>UFW Firewall</h3>
<pre>ufw default deny incoming
ufw default allow outgoing
ufw allow 2222/tcp           # SSH (ваш порт)
ufw allow 80/tcp             # HTTP
ufw allow 443/tcp            # HTTPS
ufw enable
ufw status verbose</pre>

<h3>systemd сервис для приложения</h3>
<pre># /etc/systemd/system/myapp.service
[Unit]
Description=MyApp Docker Compose
After=docker.service
Requires=docker.service

[Service]
WorkingDirectory=/srv/myapp
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
Restart=on-failure

[Install]
WantedBy=multi-user.target

systemctl enable myapp && systemctl start myapp
journalctl -u myapp -f     # логи</pre>

<h3>fail2ban</h3>
<pre>apt install fail2ban -y
# Автоматически блокирует IP после N неудачных попыток SSH</pre>` },
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

var ufwRules = [];

function ufwAllow(rule) {
  ufwRules.push(rule);
  logLine('$ ufw allow ' + rule, '#68a063');
  logLine('Rule added', '#4ade80');
}

function ufwStatus() {
  logLine('', '');
  logLine('$ ufw status verbose', '#68a063');
  if (!ufwRules.length) { logLine('Status: inactive', '#f87171'); return; }
  logLine('Status: active', '#4ade80');
  logLine('Default: deny (incoming), allow (outgoing)', '#94a3b8');
  ufwRules.forEach(function (r) { logLine('  ALLOW   ' + r, '#4ade80'); });
}

function systemctlEnableStart() {
  logLine('', '');
  logLine('$ systemctl enable myapp && systemctl start myapp', '#68a063');
  setTimeout(function () { logLine('Created symlink /etc/systemd/system/multi-user.target.wants/myapp.service', '#facc15'); }, 300);
  setTimeout(function () { logLine('✓ myapp.service: active (running), Restart=on-failure активний', '#4ade80'); }, 700);
}

row.appendChild(mkBtn('ufw allow OpenSSH', function () { ufwAllow('OpenSSH'); }));
row.appendChild(mkBtn('ufw allow 80/tcp', function () { ufwAllow('80/tcp'); }));
row.appendChild(mkBtn('ufw allow 443/tcp', function () { ufwAllow('443/tcp'); }));
row.appendChild(mkBtn('ufw status verbose', ufwStatus));
row.appendChild(mkBtn('systemctl enable && start myapp', systemctlEnableStart));`,
    [
      { level:'easy',   uk:'Склади checklist первинного налаштування VPS (мінімум 8 пунктів). Чому root-логін слід відразу заборонити? Що таке SSH-ключ і чим він кращий за пароль?', ru:'Составь checklist первичной настройки VPS (минимум 8 пунктов). Почему root-логин нужно сразу запретить? Что такое SSH-ключ и чем он лучше пароля?' },
      { level:'easy',   uk:'Поясни UFW-правила з теорії. Чому `ufw default deny incoming` стоїть першим? Що буде якщо забути `ufw allow 2222/tcp` перед `ufw enable`?', ru:'Объясни UFW-правила из теории. Почему `ufw default deny incoming` стоит первым? Что будет если забыть `ufw allow 2222/tcp` перед `ufw enable`?' },
      { level:'medium', uk:'Напиши bash-скрипт initial_setup.sh, що автоматизує: оновлення, створення юзера deploy, копіювання SSH-ключів, налаштування UFW, встановлення Docker.', ru:'Напиши bash-скрипт initial_setup.sh, автоматизирующий: обновление, создание юзера deploy, копирование SSH-ключей, настройку UFW, установку Docker.' },
      { level:'medium', uk:'Створи systemd unit-файл для запуску docker-compose проекту при старті VPS. Переконайся що After=docker.service і налаштуй Restart=on-failure з RestartSec=10.', ru:'Создай systemd unit-файл для запуска docker-compose проекта при старте VPS. Убедись что After=docker.service и настрой Restart=on-failure с RestartSec=10.' },
      { level:'hard',   uk:'Налаштуй fail2ban для захисту SSH: максимум 3 спроби, бан на 1 годину. Напиши /etc/fail2ban/jail.local. Як перевірити що він працює? Як розбанити IP?', ru:'Настрой fail2ban для защиты SSH: максимум 3 попытки, бан на 1 час. Напиши /etc/fail2ban/jail.local. Как проверить что он работает? Как разбанить IP?' },
      { level:'hard',   uk:'Реалізуй автоматичне оновлення системи через unattended-upgrades. Налаштуй щоб оновлювались тільки security-патчі, а не всі пакети. Де зберігаються логи?', ru:'Реализуй автоматическое обновление системы через unattended-upgrades. Настрой чтобы обновлялись только security-патчи, а не все пакеты. Где хранятся логи?' },
      { level:'extra',  uk:'Налаштуй SSH Jump host (bastion server): з\'єднання з prod-сервером тільки через VPN або окремий bastion host. Напиши ~/.ssh/config для зручного підключення.', ru:'Настрой SSH Jump host (bastion server): подключение к prod-серверу только через VPN или отдельный bastion host. Напиши ~/.ssh/config для удобного подключения.' },
    ],
    `#!/bin/bash
# initial_setup.sh — первинне налаштування VPS Ubuntu 22.04
# Запуск: chmod +x initial_setup.sh && sudo ./initial_setup.sh

set -euo pipefail

NEW_USER="deploy"
SSH_PORT=22

echo "=== 1. Оновлення пакетів ==="
apt update && apt upgrade -y

echo "=== 2. Базові утиліти ==="
apt install -y curl wget git htop ufw fail2ban unattended-upgrades

echo "=== 3. Створення юзера $NEW_USER ==="
if ! id "$NEW_USER" &>/dev/null; then
    adduser --disabled-password --gecos "" $NEW_USER
    usermod -aG sudo $NEW_USER
fi

echo "=== 4. Копіювання SSH ключів ==="
mkdir -p /home/$NEW_USER/.ssh
if [ -f /root/.ssh/authorized_keys ]; then
    cp /root/.ssh/authorized_keys /home/$NEW_USER/.ssh/
    chown -R $NEW_USER:$NEW_USER /home/$NEW_USER/.ssh
    chmod 700 /home/$NEW_USER/.ssh
    chmod 600 /home/$NEW_USER/.ssh/authorized_keys
fi

echo "=== 5. Налаштування UFW ==="
ufw default deny incoming
ufw default allow outgoing
ufw allow $SSH_PORT/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "=== 6. Встановлення Docker ==="
curl -fsSL https://get.docker.com | sh
usermod -aG docker $NEW_USER

echo "=== Готово! ==="
echo "Підключайся: ssh $NEW_USER@\$(hostname -I | awk '{print \$1}')"
`);

  /* ─── 12-06: Nginx ───────────────────────────────────────── */
  patch('12-06',
    { uk:`<h2>Nginx: reverse proxy, load balancing та ssl termination</h2>
<p>Nginx — надшвидкий веб-сервер та reverse proxy. В production він стоїть перед вашим Django/Node.js, приймає всі запити та перенаправляє їх у ваш застосунок.</p>

<h3>Чому reverse proxy?</h3>
<ul>
<li>Nginx обробляє статику у 100 разів швидше ніж Django</li>
<li>SSL termination — один сертифікат для всіх сервісів</li>
<li>Rate limiting, кешування, gzip compression</li>
<li>Load balancing між кількома інстансами</li>
</ul>

<h3>Базова конфігурація reverse proxy</h3>
<pre>server {
    listen 80;
    server_name example.com www.example.com;

    # Статика — Nginx сам обслуговує без Django
    location /static/ {
        alias /srv/myapp/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /srv/myapp/media/;
        expires 7d;
    }

    # Всі інші запити — до Gunicorn
    location / {
        proxy_pass http://web:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 30s;
        proxy_connect_timeout 10s;
    }
}</pre>

<h3>Load Balancing</h3>
<pre>upstream backend {
    least_conn;                        # алгоритм: найменше з'єднань
    server web1:8000;
    server web2:8000;
    server web3:8000 weight=2;         # отримує вдвічі більше запитів
    keepalive 32;                      # persistent connections
}

server {
    location / {
        proxy_pass http://backend;
    }
}</pre>

<h3>Rate Limiting</h3>
<pre>http {
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;

    server {
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            limit_req_status 429;
            proxy_pass http://backend;
        }
    }
}</pre>

<h3>Gzip та безпечні заголовки</h3>
<pre>gzip on;
gzip_types text/plain application/json application/javascript text/css;

add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";</pre>`,
      ru:`<h2>Nginx: reverse proxy, load balancing и ssl termination</h2>
<p>Nginx — сверхбыстрый веб-сервер и reverse proxy. В production он стоит перед вашим Django/Node.js, принимает все запросы и перенаправляет их в ваше приложение.</p>

<h3>Зачем reverse proxy?</h3>
<ul>
<li>Nginx обрабатывает статику в 100 раз быстрее чем Django</li>
<li>SSL termination — один сертификат для всех сервисов</li>
<li>Rate limiting, кеширование, gzip compression</li>
<li>Load balancing между несколькими инстансами</li>
</ul>

<h3>Базовая конфигурация reverse proxy</h3>
<pre>server {
    listen 80;
    server_name example.com www.example.com;

    location /static/ {
        alias /srv/myapp/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://web:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 30s;
    }
}</pre>

<h3>Load Balancing</h3>
<pre>upstream backend {
    least_conn;
    server web1:8000;
    server web2:8000;
    server web3:8000 weight=2;
    keepalive 32;
}

server {
    location / { proxy_pass http://backend; }
}</pre>

<h3>Rate Limiting</h3>
<pre>http {
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
    server {
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://backend;
        }
    }
}</pre>` },
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

/* Справжній round-robin алгоритм */
var rrIndex = 0;
var servers = [
  { name: 'web1:8000', activeConnections: 0 },
  { name: 'web2:8000', activeConnections: 0 },
  { name: 'web3:8000 (weight=2)', activeConnections: 0, weight: 2 }
];

function roundRobinNext() {
  var server = servers[rrIndex % servers.length];
  rrIndex++;
  return server;
}

/* Справжній least-connections алгоритм */
function leastConnectionsNext() {
  var best = servers[0];
  servers.forEach(function (s) { if (s.activeConnections < best.activeConnections) best = s; });
  best.activeConnections++;
  return best;
}

function simulateRoundRobin() {
  var lines = ['Round-robin (upstream backend, 9 запитів):'];
  for (var i = 0; i < 9; i++) {
    lines.push('Запит ' + (i + 1) + ' -> ' + roundRobinNext().name);
  }
  out.textContent = lines.join('\\n');
}

function simulateLeastConnections() {
  servers.forEach(function (s) { s.activeConnections = 0; });
  servers[0].activeConnections = 3;
  servers[1].activeConnections = 1;
  var lines = ['Least-connections (стартові навантаження: 3, 1, 0):'];
  for (var i = 0; i < 5; i++) {
    var s = leastConnectionsNext();
    lines.push('Запит ' + (i + 1) + ' -> ' + s.name + ' (тепер активних: ' + s.activeConnections + ')');
  }
  out.textContent = lines.join('\\n');
}

row.appendChild(mkBtn('Round-robin (по черзі)', simulateRoundRobin));
row.appendChild(mkBtn('Least-connections (найменш завантажений)', simulateLeastConnections));`,
    [
      { level:'easy',   uk:'Поясни схему: Client → Nginx → Gunicorn → Django → PostgreSQL. Що обробляє Nginx сам (без Django)? Чому це набагато ефективніше?', ru:'Объясни схему: Client → Nginx → Gunicorn → Django → PostgreSQL. Что обрабатывает Nginx сам (без Django)? Почему это намного эффективнее?' },
      { level:'easy',   uk:'Вивчи nginx.conf з вкладки Python. Знайди: де визначається upstream, який алгоритм балансування, який rate limit для /api/? Що означає burst=20?', ru:'Изучи nginx.conf из вкладки Python. Найди: где определяется upstream, какой алгоритм балансировки, какой rate limit для /api/? Что означает burst=20?' },
      { level:'medium', uk:'Додай у nginx.conf location для WebSocket-з\'єднань (/ws/): налаштуй proxy_http_version 1.1 та Upgrade/Connection заголовки. Чому стандартний proxy_pass не підходить для WS?', ru:'Добавь в nginx.conf location для WebSocket-соединений (/ws/): настрой proxy_http_version 1.1 и Upgrade/Connection заголовки. Почему стандартный proxy_pass не подходит для WS?' },
      { level:'medium', uk:'Налаштуй Nginx для роздачі статики з правильними HTTP-заголовками кешування: статику (js/css/img) на 1 рік з immutable, HTML — no-cache. Поясни різницю.', ru:'Настрой Nginx для раздачи статики с правильными HTTP-заголовками кеширования: статику (js/css/img) на 1 год с immutable, HTML — no-cache. Объясни разницу.' },
      { level:'hard',   uk:'Реалізуй geo-blocking: заблокуй доступ до /admin/ для всіх IP крім твого. Використай allow/deny директиви або ngx_http_geo_module. Напиши конфіг.', ru:'Реализуй geo-blocking: заблокируй доступ к /admin/ для всех IP кроме твоего. Используй allow/deny директивы или ngx_http_geo_module. Напиши конфиг.' },
      { level:'hard',   uk:'Налаштуй Nginx як TCP load balancer (stream module) для PostgreSQL реплік. В чому різниця між stream та http блоками Nginx? Для яких задач кожен?', ru:'Настрой Nginx как TCP load balancer (stream module) для PostgreSQL реплик. В чём разница между stream и http блоками Nginx? Для каких задач каждый?' },
      { level:'extra',  uk:'Налаштуй Nginx micro-caching для API: кешуй відповіді на 1 секунду (proxy_cache_valid 200 1s). Це дозволяє витримати тисячі запитів за секунду. Напиши конфіг та поясни trade-offs.', ru:'Настрой Nginx micro-caching для API: кешируй ответы на 1 секунду (proxy_cache_valid 200 1s). Это позволяет выдержать тысячи запросов в секунду. Напиши конфиг и объясни trade-offs.' },
    ],
    `# /etc/nginx/conf.d/myapp.conf
# Nginx reverse proxy для Django + load balancing + security

# Upstream — кілька Gunicorn-воркерів
upstream django_backend {
    least_conn;
    server web:8000;
    keepalive 32;
}

# Rate limiting
limit_req_zone \$binary_remote_addr zone=api_limit:10m rate=20r/s;
limit_req_zone \$binary_remote_addr zone=login_limit:10m rate=5r/m;

# HTTP → HTTPS redirect
server {
    listen 80;
    server_name example.com www.example.com;

    # Let's Encrypt challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    # SSL сертифікати (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_types text/plain application/json application/javascript text/css image/svg+xml;
    gzip_min_length 1000;

    client_max_body_size 10M;

    # Статика Django
    location /static/ {
        alias /static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location /media/ {
        alias /app/media/;
        expires 7d;
    }

    # API з rate limiting
    location /api/ {
        limit_req zone=api_limit burst=40 nodelay;
        limit_req_status 429;
        proxy_pass http://django_backend;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Login з жорстким rate limit
    location /api/auth/login/ {
        limit_req zone=login_limit burst=3 nodelay;
        proxy_pass http://django_backend;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }

    # Решта запитів
    location / {
        proxy_pass http://django_backend;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 30s;
        proxy_connect_timeout 10s;
    }
}
`);

  /* ─── 12-07: HTTPS + Certbot ─────────────────────────────── */
  patch('12-07',
    { uk:`<h2>HTTPS: Let's Encrypt + Certbot</h2>
<p>HTTPS шифрує трафік між браузером і сервером. Без нього: паролі передаються відкритим текстом, браузер показує "Not Secure", Google знижує рейтинг у пошуку.</p>

<h3>Як працює SSL/TLS</h3>
<ul>
<li><strong>Certificate Authority (CA)</strong> — організація що видає та підписує сертифікати. Браузери їм довіряють.</li>
<li><strong>Let's Encrypt</strong> — безкоштовний CA, автоматизований, сертифікати на 90 днів з авто-поновленням.</li>
<li><strong>TLS Handshake</strong>: клієнт і сервер обмінюються публічними ключами, домовляються про шифрування.</li>
</ul>

<h3>Certbot з Nginx (пряма установка)</h3>
<pre>apt install certbot python3-certbot-nginx -y

# Отримати сертифікат та автоматично змінити nginx.conf
certbot --nginx -d example.com -d www.example.com

# Перевірити авто-поновлення
certbot renew --dry-run</pre>

<h3>Certbot через Docker (рекомендовано)</h3>
<pre># docker-compose.yml (додати сервіс):
certbot:
  image: certbot/certbot
  volumes:
    - ./certbot/conf:/etc/letsencrypt
    - ./certbot/www:/var/www/certbot
  entrypoint: >
    sh -c "trap exit TERM; while :; do
      certbot renew;
      sleep 12h & wait \${!}; done"

# Перший раз — отримати сертифікат:
docker compose run --rm certbot certonly --webroot \\
  -w /var/www/certbot \\
  -d example.com -d www.example.com \\
  --email admin@example.com \\
  --agree-tos --no-eff-email</pre>

<h3>Nginx SSL конфіг</h3>
<pre>ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

# Тільки сучасні протоколи
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

# HSTS — примусово HTTPS на 1 рік
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;</pre>

<h3>Перевірка SSL</h3>
<pre>curl -I https://example.com     # HTTP заголовки
openssl s_client -connect example.com:443 -servername example.com
# Або онлайн: ssllabs.com/ssltest/</pre>`,
      ru:`<h2>HTTPS: Let's Encrypt + Certbot</h2>
<p>HTTPS шифрует трафик между браузером и сервером. Без него: пароли передаются открытым текстом, браузер показывает "Not Secure", Google снижает рейтинг в поиске.</p>

<h3>Как работает SSL/TLS</h3>
<ul>
<li><strong>Certificate Authority (CA)</strong> — организация, выдающая и подписывающая сертификаты. Браузеры им доверяют.</li>
<li><strong>Let's Encrypt</strong> — бесплатный CA, автоматизированный, сертификаты на 90 дней с авто-продлением.</li>
<li><strong>TLS Handshake</strong>: клиент и сервер обмениваются публичными ключами, договариваются о шифровании.</li>
</ul>

<h3>Certbot с Nginx</h3>
<pre>apt install certbot python3-certbot-nginx -y
certbot --nginx -d example.com -d www.example.com
certbot renew --dry-run</pre>

<h3>Certbot через Docker</h3>
<pre>certbot:
  image: certbot/certbot
  volumes:
    - ./certbot/conf:/etc/letsencrypt
    - ./certbot/www:/var/www/certbot
  entrypoint: >
    sh -c "trap exit TERM; while :; do
      certbot renew;
      sleep 12h & wait \${!}; done"

docker compose run --rm certbot certonly --webroot \\
  -w /var/www/certbot \\
  -d example.com \\
  --email admin@example.com \\
  --agree-tos</pre>

<h3>Nginx SSL конфиг</h3>
<pre>ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:...;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;</pre>` },
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

var issuedAt = null;

function issueCert() {
  issuedAt = new Date();
  out.textContent = '$ certbot --nginx -d example.com -d www.example.com\\n\\n' +
    'Успішно! Сертифікат видано: ' + issuedAt.toDateString() + '\\n' +
    "Дійсний 90 днів (стандарт Let's Encrypt).";
}

function checkExpiry() {
  if (!issuedAt) { out.textContent = 'Спочатку видай сертифікат.'; return; }
  var expiresAt = new Date(issuedAt.getTime() + 90 * 24 * 60 * 60 * 1000);
  var renewAt = new Date(expiresAt.getTime() - 30 * 24 * 60 * 60 * 1000);
  var now = new Date();
  var daysLeft = Math.round((expiresAt - now) / (24 * 60 * 60 * 1000));
  out.textContent = 'Видано:            ' + issuedAt.toDateString() + '\\n' +
    'Закінчується:      ' + expiresAt.toDateString() + '\\n' +
    'Автопоновлення:    ' + renewAt.toDateString() + ' (за 30 днів до закінчення)\\n' +
    'Залишилось днів:   ' + daysLeft;
}

row.appendChild(mkBtn('certbot --nginx -d example.com', issueCert));
row.appendChild(mkBtn('Перевірити термін дії', checkExpiry));`,
    [
      { level:'easy',   uk:'Поясни: що таке Certificate Authority і чому браузер показує замок без попереджень тільки якщо CA відомий? Чим Let\'s Encrypt відрізняється від платних CA?', ru:'Объясни: что такое Certificate Authority и почему браузер показывает замок без предупреждений только если CA известен? Чем Let\'s Encrypt отличается от платных CA?' },
      { level:'easy',   uk:'Що таке HSTS? Чому `max-age=31536000` це 1 рік? Який ризик якщо ти встановиш HSTS а потім вирішиш прибрати HTTPS? Як скасувати HSTS?', ru:'Что такое HSTS? Почему `max-age=31536000` это 1 год? Какой риск если ты установишь HSTS а потом решишь убрать HTTPS? Как отменить HSTS?' },
      { level:'medium', uk:'Вивчи docker-compose конфіг Certbot з вкладки Python. Напиши покроковий план: як отримати перший сертифікат і як він буде автоматично поновлюватись?', ru:'Изучи docker-compose конфиг Certbot из вкладки Python. Напиши пошаговый план: как получить первый сертификат и как он будет автоматически продлеваться?' },
      { level:'medium', uk:'Налаштуй OCSP Stapling у nginx.conf (ssl_stapling on). Що це таке і навіщо? Як перевірити що OCSP stapling працює через openssl s_client?', ru:'Настрой OCSP Stapling в nginx.conf (ssl_stapling on). Что это такое и зачем? Как проверить что OCSP stapling работает через openssl s_client?' },
      { level:'hard',   uk:'Реалізуй повний SSL-конфіг nginx що отримує A+ на ssllabs.com: TLS 1.2/1.3 тільки, сучасні cipher suites, HSTS, OCSP stapling, ssl_session_cache. Поясни кожну директиву.', ru:'Реализуй полный SSL-конфиг nginx получающий A+ на ssllabs.com: TLS 1.2/1.3 только, современные cipher suites, HSTS, OCSP stapling, ssl_session_cache. Объясни каждую директиву.' },
      { level:'hard',   uk:'Налаштуй wildcard сертифікат Let\'s Encrypt (*.example.com) через DNS challenge. Чим він відрізняється від HTTP challenge? Для яких сценаріїв потрібен wildcard?', ru:'Настрой wildcard сертификат Let\'s Encrypt (*.example.com) через DNS challenge. Чем он отличается от HTTP challenge? Для каких сценариев нужен wildcard?' },
      { level:'extra',  uk:'Реалізуй certificate pinning для мобільного API: поясни що це, які ризики (certificate rotation), і як правильно впровадити з backup pins. Чи варто це робити для веб-додатків?', ru:'Реализуй certificate pinning для мобильного API: объясни что это, какие риски (certificate rotation), и как правильно внедрить с backup pins. Стоит ли это делать для веб-приложений?' },
    ],
    `# Повний план отримання та налаштування HTTPS з Let's Encrypt

# === КРОК 1: Nginx конфіг для HTTP (ПЕРЕД отриманням сертифікату) ===
cat > /etc/nginx/conf.d/myapp.conf << 'EOF'
server {
    listen 80;
    server_name example.com www.example.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}
EOF

# === КРОК 2: Certbot (через Docker) ===
# Отримати сертифікат (один раз):
docker run --rm \
  -v ./certbot/conf:/etc/letsencrypt \
  -v ./certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot --webroot-path /var/www/certbot \
  -d example.com -d www.example.com \
  --email admin@example.com \
  --agree-tos --no-eff-email

# === КРОК 3: Автопоновлення у docker-compose.yml ===
# certbot:
#   image: certbot/certbot
#   volumes:
#     - ./certbot/conf:/etc/letsencrypt
#     - ./certbot/www:/var/www/certbot
#   entrypoint: /bin/sh -c "trap exit TERM; while :; do certbot renew; sleep 12h; done"

# === КРОК 4: Перевірка ===
certbot renew --dry-run  # симуляція поновлення
openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -dates
`);

  /* ─── 12-08: PostgreSQL у продакшні ─────────────────────── */
  patch('12-08',
    { uk:`<h2>PostgreSQL у продакшні: backup та відновлення</h2>
<p>PostgreSQL у production потребує окремої уваги: регулярні backup, моніторинг продуктивності, connection pooling і план відновлення при збоях.</p>

<h3>Стратегії backup</h3>
<ul>
<li><strong>pg_dump</strong> — логічний backup. Перевагу: портативний, можна відновити в іншу версію PG. Мінус: повний dump великої БД займає час.</li>
<li><strong>pg_basebackup</strong> — фізичний backup кластера. Швидший для відновлення.</li>
<li><strong>WAL (Write-Ahead Log)</strong> — журнал транзакцій. PITR (Point-in-Time Recovery) — відновлення на будь-який момент.</li>
</ul>

<h3>pg_dump / pg_restore</h3>
<pre># Backup у custom format (стискає, підтримує паралельне відновлення)
pg_dump -Fc -U myuser -d mydb -f backup_2024.dump

# Відновлення
pg_restore -Fc -U myuser -d mydb -j 4 backup_2024.dump  # -j 4 = 4 потоки

# Тільки схема
pg_dump -s -U myuser -d mydb > schema_only.sql

# Тільки конкретна таблиця
pg_dump -t users -U myuser -d mydb > users_backup.sql</pre>

<h3>Автоматичний щоденний backup (cron)</h3>
<pre>#!/bin/bash
# /usr/local/bin/pg_backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres"
mkdir -p $BACKUP_DIR

pg_dump -Fc -U myuser -d mydb \\
  | gzip > "$BACKUP_DIR/backup_$DATE.dump.gz"

# Видалити старші 30 днів
find $BACKUP_DIR -name "*.dump.gz" -mtime +30 -delete

# 0 2 * * * /usr/local/bin/pg_backup.sh  (crontab -e)</pre>

<h3>Connection Pooling (PgBouncer)</h3>
<pre># Django підключається до PgBouncer:5432, не до PostgreSQL:5432
# PgBouncer тримає пул з'єднань до PostgreSQL

# pgbouncer.ini
[databases]
mydb = host=db port=5432 dbname=mydb

[pgbouncer]
pool_mode = transaction    # рекомендовано для Django
max_client_conn = 1000
default_pool_size = 20
max_db_connections = 50</pre>

<h3>Важливі PostgreSQL налаштування</h3>
<pre># postgresql.conf
max_connections = 100          # обмежити — PgBouncer замість 1000 з'єднань
shared_buffers = 256MB         # 25% RAM
work_mem = 4MB                 # пам'ять для сортування
maintenance_work_mem = 64MB
wal_compression = on           # зменшити розмір WAL
log_slow_statements = 1000     # логувати запити > 1 сек</pre>`,
      ru:`<h2>PostgreSQL в продакшне: backup и восстановление</h2>
<p>PostgreSQL в production требует отдельного внимания: регулярные backup, мониторинг производительности, connection pooling и план восстановления при сбоях.</p>

<h3>Стратегии backup</h3>
<ul>
<li><strong>pg_dump</strong> — логический backup. Портативный, можно восстановить в другую версию PG.</li>
<li><strong>pg_basebackup</strong> — физический backup кластера. Быстрее для восстановления.</li>
<li><strong>WAL (Write-Ahead Log)</strong> — журнал транзакций. PITR — восстановление на любой момент времени.</li>
</ul>

<h3>pg_dump / pg_restore</h3>
<pre>pg_dump -Fc -U myuser -d mydb -f backup_2024.dump
pg_restore -Fc -U myuser -d mydb -j 4 backup_2024.dump
pg_dump -s -U myuser -d mydb > schema_only.sql</pre>

<h3>Автоматический ежедневный backup</h3>
<pre>#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -Fc -U myuser -d mydb | gzip > "/backups/backup_$DATE.dump.gz"
find /backups -name "*.dump.gz" -mtime +30 -delete
# 0 2 * * * /usr/local/bin/pg_backup.sh</pre>

<h3>Connection Pooling (PgBouncer)</h3>
<pre>[databases]
mydb = host=db port=5432 dbname=mydb

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
max_db_connections = 50</pre>

<h3>Важные настройки PostgreSQL</h3>
<pre>max_connections = 100
shared_buffers = 256MB
work_mem = 4MB
wal_compression = on
log_slow_statements = 1000</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `${SQLJS_HELPERS_SRC}
demoRoot.innerHTML = '';
var row = mkRow(demoRoot);
var dumpText = null;

initDb(demoRoot, termOut, [
  "CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT)",
  "INSERT INTO customers VALUES (1, 'Марко', 'marko@example.com'), (2, 'Ірина', 'irina@example.com')"
], function (db) {

  function generateDump() {
    var res = db.exec('SELECT id, name, email FROM customers');
    var lines = ['CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT);'];
    if (res.length) {
      res[0].values.forEach(function (row) {
        var values = row.map(function (v) { return typeof v === 'string' ? "'" + v.replace(/'/g, "''") + "'" : v; });
        lines.push('INSERT INTO customers VALUES (' + values.join(', ') + ');');
      });
    }
    return lines.join('\\n');
  }

  row.appendChild(mkBtn('pg_dump -Fc mydb > backup.dump', function () {
    dumpText = generateDump();
    logLine(termOut, '', '#64748b');
    logLine(termOut, '$ pg_dump -Fc -U myuser -d mydb -f backup.dump', '#68a063');
    dumpText.split('\\n').forEach(function (line) { logLine(termOut, line, '#4ade80'); });
  }));

  row.appendChild(mkBtn('Видалити всі дані (симуляція збою)', function () {
    db.run('DELETE FROM customers');
    logLine(termOut, '', '#64748b');
    logLine(termOut, '⚠ Дані видалено (симуляція втрати даних)', '#f87171');
  }));

  row.appendChild(mkBtn('pg_restore backup.dump', function () {
    if (!dumpText) { logLine(termOut, 'Спочатку створи backup.dump', '#f87171'); return; }
    logLine(termOut, '', '#64748b');
    logLine(termOut, '$ pg_restore -Fc -U myuser -d mydb -j 4 backup.dump', '#68a063');
    db.run('DELETE FROM customers');
    var statements = dumpText.split(';').map(function (s) { return s.trim(); }).filter(Boolean);
    statements.forEach(function (stmt) { db.run(stmt); });
    logLine(termOut, '✓ Відновлено з backup.dump', '#4ade80');
  }));

  row.appendChild(mkBtn('SELECT * FROM customers', function () {
    runQuery(db, 'SELECT * FROM customers', termOut);
  }));
});`,
    [
      { level:'easy',   uk:'Поясни різницю між pg_dump та pg_basebackup. В якому форматі краще зберігати backup: SQL або custom (-Fc)? Яка перевага -j 4 при відновленні?', ru:'Объясни разницу между pg_dump и pg_basebackup. В каком формате лучше хранить backup: SQL или custom (-Fc)? Какое преимущество -j 4 при восстановлении?' },
      { level:'easy',   uk:'Що таке WAL і PITR? Уяви сценарій: сьогодні о 14:00 розробник випадково виконав DELETE FROM orders WHERE 1=1. Як PITR допомагає відновити дані?', ru:'Что такое WAL и PITR? Представь сценарий: сегодня в 14:00 разработчик случайно выполнил DELETE FROM orders WHERE 1=1. Как PITR помогает восстановить данные?' },
      { level:'medium', uk:'Напиши bash-скрипт pg_backup.sh з вкладки Python. Додай: перевірку що backup-файл > 0 байт, відправку email-повідомлення при успіху/невдачі (через mail або curl до webhook).', ru:'Напиши bash-скрипт pg_backup.sh из вкладки Python. Добавь: проверку что backup-файл > 0 байт, отправку email-уведомления при успехе/неудаче (через mail или curl к webhook).' },
      { level:'medium', uk:'Налаштуй PgBouncer у docker-compose як окремий сервіс між Django та PostgreSQL. Django має підключатись до pgbouncer:6432. Поясни чому pool_mode=transaction підходить для Django.', ru:'Настрой PgBouncer в docker-compose как отдельный сервис между Django и PostgreSQL. Django должен подключаться к pgbouncer:6432. Объясни почему pool_mode=transaction подходит для Django.' },
      { level:'hard',   uk:'Реалізуй streaming replication: основний сервер (primary) + replica. Налаштуй PostgreSQL для WAL shipping. Django повинен читати з replica (read replica routing).', ru:'Реализуй streaming replication: основной сервер (primary) + replica. Настрой PostgreSQL для WAL shipping. Django должен читать с replica (read replica routing).' },
      { level:'hard',   uk:'Оптимізуй повільний SQL-запит: активуй pg_stat_statements, знайди запити > 500мс, проаналізуй EXPLAIN ANALYZE, додай відповідні індекси. Виміряй покращення.', ru:'Оптимизируй медленный SQL-запрос: активируй pg_stat_statements, найди запросы > 500мс, проанализируй EXPLAIN ANALYZE, добавь соответствующие индексы. Измерь улучшение.' },
      { level:'extra',  uk:'Впровади стратегію 3-2-1 для backup PostgreSQL: 3 копії, 2 різних носії, 1 offsite. Автоматично завантажуй backup у S3 (або Backblaze B2). Напиши скрипт та crontab.', ru:'Внедри стратегию 3-2-1 для backup PostgreSQL: 3 копии, 2 разных носителя, 1 offsite. Автоматически загружай backup в S3 (или Backblaze B2). Напиши скрипт и crontab.' },
    ],
    `#!/bin/bash
# pg_backup.sh — повний скрипт резервного копіювання PostgreSQL

set -euo pipefail

# Конфігурація
DB_HOST="\${DB_HOST:-localhost}"
DB_PORT="\${DB_PORT:-5432}"
DB_NAME="\${DB_NAME:-myapp_db}"
DB_USER="\${DB_USER:-myapp_user}"
BACKUP_DIR="/backups/postgres"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_\${DB_NAME}_\${DATE}.dump.gz"
LOG_FILE="/var/log/pg_backup.log"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"; }

mkdir -p "$BACKUP_DIR"
log "Starting backup of $DB_NAME..."

# Виконати backup
if PGPASSWORD="$DB_PASS" pg_dump \
    -h "$DB_HOST" -p "$DB_PORT" \
    -U "$DB_USER" -d "$DB_NAME" \
    -Fc --no-acl --no-owner \
    | gzip > "$BACKUP_FILE"; then

    SIZE=$(du -sh "$BACKUP_FILE" | cut -f1)
    log "Backup SUCCESS: $BACKUP_FILE ($SIZE)"

    # Перевірка цілісності
    if gzip -t "$BACKUP_FILE"; then
        log "Integrity check: OK"
    else
        log "ERROR: Backup file is corrupted!"
        exit 1
    fi
else
    log "ERROR: pg_dump failed!"
    exit 1
fi

# Видалення старих backup
DELETED=$(find "$BACKUP_DIR" -name "*.dump.gz" -mtime "+$RETENTION_DAYS" -delete -print | wc -l)
log "Cleaned up $DELETED old backup(s)"

# Опціонально: завантаження у S3
# aws s3 cp "$BACKUP_FILE" "s3://my-backups/postgres/"

log "Backup completed successfully"

# Crontab: щоденно о 02:00
# 0 2 * * * /usr/local/bin/pg_backup.sh >> /var/log/pg_backup.log 2>&1
`);

  /* ─── 12-09: Redis у продакшні ──────────────────────────── */
  patch('12-09',
    { uk:`<h2>Redis у продакшні: persistence та sentinel</h2>
<p>Redis — in-memory сховище даних. Використовується для: кешування, черг завдань (Celery), сесій, rate limiting, pub/sub. В production важливо правильно налаштувати persistence і high availability.</p>

<h3>Persistence: RDB vs AOF</h3>
<ul>
<li><strong>RDB (Redis Database)</strong> — знімки (snapshots) через певні інтервали. Швидше відновлення, але можлива втрата даних за час між снімками.</li>
<li><strong>AOF (Append-Only File)</strong> — запис кожної операції запису. Більш надійний, але повільніше і файл більший.</li>
<li><strong>AOF + RDB</strong> — рекомендовано для критичних даних.</li>
</ul>

<h3>Конфігурація redis.conf</h3>
<pre># Persistence
save 900 1          # RDB: якщо >= 1 зміна за 15 хв
save 300 10         # якщо >= 10 змін за 5 хв
save 60 10000       # якщо >= 10000 змін за 1 хв

appendonly yes                   # AOF увімкнено
appendfsync everysec             # fsync кожну секунду (компроміс)

# Пам'ять
maxmemory 512mb
maxmemory-policy allkeys-lru     # вигнати найдавніші ключі при переповненні

# Інші
bind 127.0.0.1                   # тільки localhost (не відкривати в мережу!)
requirepass your_strong_password
rename-command FLUSHALL ""       # вимкнути небезпечні команди</pre>

<h3>Maxmemory policies</h3>
<ul>
<li><code>allkeys-lru</code> — видаляти будь-які ключі за LRU (для кешу)</li>
<li><code>volatile-lru</code> — видаляти тільки ключі з TTL</li>
<li><code>noeviction</code> — повертати помилку при переповненні (для черг/сесій)</li>
</ul>

<h3>Redis Sentinel — High Availability</h3>
<pre># sentinel.conf
sentinel monitor mymaster redis-primary 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
sentinel parallel-syncs mymaster 1

# При падінні primary → sentinel автоматично обирає нового primary
# Django через django-redis автоматично підключається до нового primary</pre>

<h3>Python / Django</h3>
<pre># settings.py
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://redis:6379/1",
        "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
        "TIMEOUT": 3600,
    }
}
CELERY_BROKER_URL = "redis://redis:6379/0"
SESSION_ENGINE = "django.contrib.sessions.backends.cache"</pre>`,
      ru:`<h2>Redis в продакшне: persistence и sentinel</h2>
<p>Redis — in-memory хранилище. Используется для: кеширования, очередей задач (Celery), сессий, rate limiting, pub/sub. В production важно правильно настроить persistence и high availability.</p>

<h3>Persistence: RDB vs AOF</h3>
<ul>
<li><strong>RDB</strong> — снимки через определённые интервалы. Быстрее восстановление, но возможна потеря данных.</li>
<li><strong>AOF</strong> — запись каждой операции записи. Надёжнее, но медленнее.</li>
<li><strong>AOF + RDB</strong> — рекомендовано для критических данных.</li>
</ul>

<h3>Конфигурация redis.conf</h3>
<pre>save 900 1
appendonly yes
appendfsync everysec
maxmemory 512mb
maxmemory-policy allkeys-lru
bind 127.0.0.1
requirepass your_strong_password</pre>

<h3>Maxmemory policies</h3>
<ul>
<li><code>allkeys-lru</code> — удалять любые ключи по LRU (для кеша)</li>
<li><code>volatile-lru</code> — удалять только ключи с TTL</li>
<li><code>noeviction</code> — возвращать ошибку при переполнении (для очередей)</li>
</ul>

<h3>Redis Sentinel — High Availability</h3>
<pre>sentinel monitor mymaster redis-primary 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000</pre>

<h3>Python / Django</h3>
<pre>CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://redis:6379/1",
    }
}
CELERY_BROKER_URL = "redis://redis:6379/0"</pre>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var note = document.createElement('div');
note.style.cssText = 'color:#facc15;font-size:11px;margin-bottom:6px';
note.textContent = 'Симуляція: справжній Redis-сервер недоступний через CDN — логіка persistence/sentinel показана чесно позначеною імітацією.';
demoRoot.appendChild(note);
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

var sentinels = [{ name: 'sentinel-1' }, { name: 'sentinel-2' }, { name: 'sentinel-3' }];
var master = 'redis-primary:6379';
var replicas = ['redis-replica-1:6379', 'redis-replica-2:6379'];

function simulateMasterDown() {
  logLine('', '');
  logLine('⚠ master ' + master + ' не відповідає понад 5000мс (down-after-milliseconds)', '#f87171');
  var quorum = 0;
  sentinels.forEach(function (s, i) {
    setTimeout(function () {
      quorum++;
      logLine('  ' + s.name + ': голосує "master недоступний" (кворум ' + quorum + '/2)', '#facc15');
      if (quorum === 2) {
        var newMaster = replicas[0];
        logLine('✓ Кворум досягнуто! Sentinel обирає ' + newMaster + ' новим master (failover)', '#4ade80');
        master = newMaster;
      }
    }, i * 400);
  });
}

function showPersistence() {
  logLine('', '');
  logLine('RDB: знімок памʼяті кожні 900с, якщо змінився 1+ ключ (save 900 1)', '#68a063');
  logLine('AOF: журнал КОЖНОЇ команди запису (appendonly yes, appendfsync everysec)', '#68a063');
  logLine('При збої: AOF відновить дані ТОЧНІШЕ (максимум 1с втрат)', '#4ade80');
}

row.appendChild(mkBtn('Показати RDB/AOF persistence', showPersistence));
row.appendChild(mkBtn('Симулювати падіння master (sentinel failover)', simulateMasterDown));`,
    [
      { level:'easy',   uk:'Поясни різницю між RDB та AOF. Якщо Redis впав і ви втратили 10 секунд даних — яка стратегія persistence використовувалась? Яка дала б меншу втрату?', ru:'Объясни разницу между RDB и AOF. Если Redis упал и вы потеряли 10 секунд данных — какая стратегия persistence использовалась? Какая дала бы меньшую потерю?' },
      { level:'easy',   uk:'Чому `maxmemory-policy allkeys-lru` підходить для кешу, але `noeviction` краще для черг Celery? Що станеться якщо Redis переповниться з noeviction?', ru:'Почему `maxmemory-policy allkeys-lru` подходит для кеша, но `noeviction` лучше для очередей Celery? Что случится если Redis переполнится с noeviction?' },
      { level:'medium', uk:'Напиши Python-скрипт що демонструє: кешування результатів дорогого запиту з TTL 5 хв, cache invalidation при оновленні, та вимірювання hit rate.', ru:'Напиши Python-скрипт, демонстрирующий: кеширование результатов дорогого запроса с TTL 5 мин, cache invalidation при обновлении, и измерение hit rate.' },
      { level:'medium', uk:'Реалізуй sliding window rate limiter на Redis для API: кожен IP може виконати не більше 100 запитів за 1 хвилину. Використай ZADD та ZREMRANGEBYSCORE.', ru:'Реализуй sliding window rate limiter на Redis для API: каждый IP может выполнить не более 100 запросов за 1 минуту. Используй ZADD и ZREMRANGEBYSCORE.' },
      { level:'hard',   uk:'Налаштуй Redis Sentinel у docker-compose: 1 primary + 2 replica + 3 sentinel. Перевір failover: зупини primary, Sentinel повинен автоматично обрати нового.', ru:'Настрой Redis Sentinel в docker-compose: 1 primary + 2 replica + 3 sentinel. Проверь failover: останови primary, Sentinel должен автоматически выбрать нового.' },
      { level:'hard',   uk:'Реалізуй distributed lock на Redis (SET key value NX PX 30000). Покажи сценарій де два Celery-воркери намагаються виконати одне завдання — лише один повинен перемогти.', ru:'Реализуй distributed lock на Redis (SET key value NX PX 30000). Покажи сценарий где два Celery-воркера пытаются выполнить одну задачу — только один должен победить.' },
      { level:'extra',  uk:'Налаштуй Redis Cluster (без Sentinel): мінімум 3 master + 3 replica, sharding даних автоматично. В чому різниця між Cluster та Sentinel? Коли використовувати кожен?', ru:'Настрой Redis Cluster (без Sentinel): минимум 3 master + 3 replica, sharding данных автоматически. В чём разница между Cluster и Sentinel? Когда использовать каждый?' },
    ],
    `# redis_demo.py — демонстрація Redis у Python

import redis
import json
import time
import hashlib

r = redis.Redis(host='localhost', port=6379, db=1, decode_responses=True)

# ── 1. Кешування з TTL ────────────────────────────────────
def get_user_stats(user_id: int) -> dict:
    cache_key = f"user_stats:{user_id}"

    # Спробуємо з кешу
    cached = r.get(cache_key)
    if cached:
        print(f"CACHE HIT for user {user_id}")
        return json.loads(cached)

    # Дорогий запит до БД (симуляція)
    print(f"CACHE MISS — fetching from DB for user {user_id}...")
    time.sleep(0.1)  # симуляція затримки БД
    result = {
        "user_id": user_id,
        "total_orders": 42,
        "revenue": 1337.50,
        "computed_at": time.time()
    }

    # Зберегти у кеш на 5 хвилин
    r.setex(cache_key, 300, json.dumps(result))
    return result

# ── 2. Cache Invalidation ──────────────────────────────────
def update_user(user_id: int, **data):
    # Оновлюємо БД (симуляція)
    print(f"Updating user {user_id}:", data)
    # Інвалідуємо кеш
    r.delete(f"user_stats:{user_id}")
    print(f"Cache invalidated for user {user_id}")

# ── 3. Rate Limiter (sliding window) ──────────────────────
def check_rate_limit(ip: str, limit: int = 10, window: int = 60) -> bool:
    key = f"rate:{ip}"
    now = time.time()
    pipe = r.pipeline()
    pipe.zremrangebyscore(key, 0, now - window)
    pipe.zadd(key, {str(now): now})
    pipe.zcard(key)
    pipe.expire(key, window)
    results = pipe.execute()
    count = results[2]
    return count <= limit

# ── 4. Distributed Lock ───────────────────────────────────
def acquire_lock(resource: str, ttl_ms: int = 30000) -> str | None:
    lock_key = f"lock:{resource}"
    lock_val = hashlib.md5(f"{time.time()}".encode()).hexdigest()
    acquired = r.set(lock_key, lock_val, nx=True, px=ttl_ms)
    return lock_val if acquired else None

def release_lock(resource: str, lock_val: str):
    lock_key = f"lock:{resource}"
    if r.get(lock_key) == lock_val:
        r.delete(lock_key)

# ── Демонстрація ──────────────────────────────────────────
if __name__ == '__main__':
    print("=== Cache Demo ===")
    stats = get_user_stats(1)   # MISS
    stats = get_user_stats(1)   # HIT
    update_user(1, name="New Name")
    stats = get_user_stats(1)   # MISS (invalidated)

    print("\n=== Rate Limit Demo ===")
    ip = "192.168.1.1"
    for i in range(12):
        allowed = check_rate_limit(ip, limit=10, window=60)
        print(f"Request {i+1}: {'OK' if allowed else 'BLOCKED'}")

    print("\n=== Distributed Lock Demo ===")
    lock = acquire_lock("send_email")
    if lock:
        print("Lock acquired! Sending email...")
        time.sleep(0.5)
        release_lock("send_email", lock)
        print("Lock released")
    else:
        print("Already locked by another worker")
`);

  /* ─── 12-10: Моніторинг ──────────────────────────────────── */
  patch('12-10',
    { uk:`<h2>Моніторинг: Sentry, Prometheus + Grafana</h2>
<p>Observability = знати що відбувається у вашому застосунку в production. Три стовпи: <strong>Metrics</strong> (числові показники), <strong>Logs</strong> (події), <strong>Traces</strong> (відстеження запитів).</p>

<h3>Sentry — відстеження помилок</h3>
<pre>pip install sentry-sdk[django]

# settings.py
import sentry_sdk
sentry_sdk.init(
    dsn="https://YOUR_KEY@sentry.io/PROJECT_ID",
    traces_sample_rate=0.1,     # 10% запитів трасуємо
    profiles_sample_rate=0.1,
    send_default_pii=False,     # не відправляти персональні дані
    environment="production",
)

# Тепер будь-який unhandled exception автоматично в Sentry</pre>

<h3>Prometheus — метрики</h3>
<pre>pip install django-prometheus

# Метрики доступні на /metrics (scrape Prometheus)
# Вбудовані: HTTP request duration, DB queries, cache hits

# Кастомна метрика
from prometheus_client import Counter, Histogram, Gauge

orders_total = Counter('orders_created_total', 'Кількість замовлень', ['status'])
request_duration = Histogram('http_request_duration_seconds', 'Тривалість запиту')

# Використання
orders_total.labels(status='completed').inc()

with request_duration.time():
    result = expensive_operation()</pre>

<h3>Grafana Dashboard</h3>
<ul>
<li>Підключи Prometheus як Data Source у Grafana</li>
<li>Готові дашборди для Django: grafana.com/grafana/dashboards/9528</li>
<li>Alerting: відправка в Slack/PagerDuty при перевищенні порогів</li>
</ul>

<h3>Docker Compose для моніторингу</h3>
<pre>prometheus:
  image: prom/prometheus:latest
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports: ["9090:9090"]

grafana:
  image: grafana/grafana:latest
  volumes: [grafana_data:/var/lib/grafana]
  environment:
    GF_SECURITY_ADMIN_PASSWORD: admin123
  ports: ["3000:3000"]</pre>

<h3>Ключові метрики для моніторингу</h3>
<ul>
<li><strong>RED</strong>: Rate (запити/с), Errors (%), Duration (латентність)</li>
<li><strong>USE</strong>: Utilization, Saturation, Errors (для ресурсів)</li>
</ul>`,
      ru:`<h2>Мониторинг: Sentry, Prometheus + Grafana</h2>
<p>Observability = знать что происходит в вашем приложении в production. Три столпа: <strong>Metrics</strong>, <strong>Logs</strong>, <strong>Traces</strong>.</p>

<h3>Sentry — отслеживание ошибок</h3>
<pre>pip install sentry-sdk[django]

import sentry_sdk
sentry_sdk.init(
    dsn="https://YOUR_KEY@sentry.io/PROJECT_ID",
    traces_sample_rate=0.1,
    environment="production",
)</pre>

<h3>Prometheus — метрики</h3>
<pre>pip install django-prometheus

from prometheus_client import Counter, Histogram

orders_total = Counter('orders_created_total', 'Кол-во заказов', ['status'])
request_duration = Histogram('http_request_duration_seconds', 'Длительность запроса')

orders_total.labels(status='completed').inc()
with request_duration.time():
    result = expensive_operation()</pre>

<h3>Docker Compose для мониторинга</h3>
<pre>prometheus:
  image: prom/prometheus:latest
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports: ["9090:9090"]

grafana:
  image: grafana/grafana:latest
  environment:
    GF_SECURITY_ADMIN_PASSWORD: admin123
  ports: ["3000:3000"]</pre>

<h3>Ключевые метрики (RED)</h3>
<ul>
<li><strong>Rate</strong> — запросов/сек</li>
<li><strong>Errors</strong> — % ошибок</li>
<li><strong>Duration</strong> — латентность p50/p95/p99</li>
</ul>` },
    `<h2 id="lesson-h2"></h2>`,
    ``,
    `demoRoot.innerHTML = '';
var note = document.createElement('div');
note.style.cssText = 'color:#facc15;font-size:11px;margin-bottom:6px';
note.textContent = 'Метрики симульовано (random walk), графік намальовано через справжній Canvas API.';
demoRoot.appendChild(note);
var btn = document.createElement('button');
btn.textContent = 'Старт живого моніторингу';
btn.style.cssText = 'background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:6px 12px;border-radius:6px;cursor:pointer;margin-bottom:10px';
demoRoot.appendChild(btn);
var canvas = document.createElement('canvas');
canvas.width = 480;
canvas.height = 180;
canvas.style.cssText = 'background:#fff;border-radius:8px;display:block';
demoRoot.appendChild(canvas);
var ctx = canvas.getContext('2d');

var cpuHistory = [];
var cpuValue = 30;
var running = false;
var intervalId = null;

function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#e2e8f0';
  ctx.beginPath();
  for (var gy = 0; gy <= 100; gy += 25) {
    var y = canvas.height - (gy / 100) * canvas.height;
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }
  ctx.stroke();

  if (cpuHistory.length < 2) return;
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  cpuHistory.forEach(function (val, i) {
    var x = (i / (cpuHistory.length - 1)) * canvas.width;
    var y = canvas.height - (val / 100) * canvas.height;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = '11px Consolas, monospace';
  ctx.fillText('CPU: ' + Math.round(cpuHistory[cpuHistory.length - 1]) + '%', 8, 14);
}

function tick() {
  cpuValue = Math.max(5, Math.min(95, cpuValue + (Math.random() - 0.5) * 20));
  cpuHistory.push(cpuValue);
  if (cpuHistory.length > 30) cpuHistory.shift();
  drawChart();
}

btn.onclick = function () {
  running = !running;
  if (running) {
    btn.textContent = 'Зупинити моніторинг';
    intervalId = setInterval(tick, 500);
  } else {
    btn.textContent = 'Старт живого моніторингу';
    clearInterval(intervalId);
  }
};
drawChart();`,
    [
      { level:'easy',   uk:'Поясни різницю між Sentry та Prometheus. Для чого використовується кожен інструмент? Чому їх потрібно використовувати разом, а не вибирати один?', ru:'Объясни разницу между Sentry и Prometheus. Для чего используется каждый инструмент? Почему их нужно использовать вместе, а не выбирать один?' },
      { level:'easy',   uk:'Що таке RED метрики? Виміряй їх для свого проекту: скільки запитів на секунду обробляє API, який % завершується з помилкою, яка середня latency?', ru:'Что такое RED метрики? Измерь их для своего проекта: сколько запросов в секунду обрабатывает API, какой % завершается с ошибкой, какая средняя latency?' },
      { level:'medium', uk:'Налаштуй Sentry для Django-проекту. Навмисно викинь виняток у view і переконайся що він з\'явився у Sentry з повним стектрейсом, user-info та request-деталями.', ru:'Настрой Sentry для Django-проекта. Намеренно брось исключение во view и убедись что оно появилось в Sentry с полным stacktrace, user-info и request-деталями.' },
      { level:'medium', uk:'Додай кастомні Prometheus-метрики до Django: Counter для замовлень (з лейблами status), Histogram для часу відповіді API. Налаштуй scrape у prometheus.yml.', ru:'Добавь кастомные Prometheus-метрики в Django: Counter для заказов (с лейблами status), Histogram для времени ответа API. Настрой scrape в prometheus.yml.' },
      { level:'hard',   uk:'Налаштуй Grafana alert: якщо кількість 5xx помилок > 10 за 5 хвилин — відправити повідомлення в Slack-канал. Напиши Prometheus query та налаштуй notification channel.', ru:'Настрой Grafana alert: если количество 5xx ошибок > 10 за 5 минут — отправить сообщение в Slack-канал. Напиши Prometheus query и настрой notification channel.' },
      { level:'hard',   uk:'Реалізуй distributed tracing з OpenTelemetry: трасуй Django → Celery → PostgreSQL запит end-to-end. Відправляй traces у Jaeger або Tempo. Знайди де bottleneck.', ru:'Реализуй distributed tracing с OpenTelemetry: трасируй Django → Celery → PostgreSQL запрос end-to-end. Отправляй traces в Jaeger или Tempo. Найди где bottleneck.' },
      { level:'extra',  uk:'Впровади SLO (Service Level Objectives): define SLI для availability (99.9%), latency (p95 < 200ms), error rate (< 0.1%). Налаштуй error budget tracking у Grafana.', ru:'Внедри SLO (Service Level Objectives): define SLI для availability (99.9%), latency (p95 < 200ms), error rate (< 0.1%). Настрой error budget tracking в Grafana.' },
    ],
    `# monitoring_demo.py — Prometheus метрики та health check

from prometheus_client import (
    Counter, Histogram, Gauge, CollectorRegistry, generate_latest, CONTENT_TYPE_LATEST
)
import time
import random

# Реєстр метрик
registry = CollectorRegistry()

# ── Лічильники ────────────────────────────────────────────
http_requests_total = Counter(
    'http_requests_total',
    'Загальна кількість HTTP запитів',
    ['method', 'endpoint', 'status_code'],
    registry=registry
)

orders_created = Counter(
    'orders_created_total',
    'Кількість створених замовлень',
    ['status'],
    registry=registry
)

# ── Гістограми (для latency) ──────────────────────────────
request_duration_seconds = Histogram(
    'request_duration_seconds',
    'Тривалість HTTP запитів',
    ['endpoint'],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0],
    registry=registry
)

db_query_duration_seconds = Histogram(
    'db_query_duration_seconds',
    'Тривалість запитів до БД',
    ['query_type'],
    registry=registry
)

# ── Gauge (поточний стан) ─────────────────────────────────
active_connections = Gauge(
    'active_connections',
    'Активні підключення',
    registry=registry
)

cache_hit_ratio = Gauge(
    'cache_hit_ratio',
    'Відсоток cache hits',
    registry=registry
)

# ── Симуляція роботи застосунку ───────────────────────────
def simulate_requests(iterations=10):
    endpoints = ['/api/products/', '/api/orders/', '/api/users/me/']
    methods = ['GET', 'POST', 'GET']
    status_codes = ['200', '200', '200', '201', '400', '500']

    print("Simulating requests...\n")
    for i in range(iterations):
        endpoint = random.choice(endpoints)
        method = random.choice(methods)
        status = random.choices(status_codes, weights=[50, 30, 30, 10, 5, 2])[0]
        duration = random.uniform(0.01, 0.5)

        with request_duration_seconds.labels(endpoint=endpoint).time():
            time.sleep(duration * 0.01)  # скорочена симуляція

        http_requests_total.labels(
            method=method, endpoint=endpoint, status_code=status
        ).inc()

        if status == '201':
            orders_created.labels(status='completed').inc()

        print(f"  {method} {endpoint} → {status} ({duration:.3f}s)")

    active_connections.set(random.randint(5, 50))
    cache_hit_ratio.set(random.uniform(0.7, 0.95))

simulate_requests()
print("\n=== Prometheus Metrics ===")
print(generate_latest(registry).decode()[:800], "...")
`);

  /* ─── 12-11: Логи ────────────────────────────────────────── */
  patch('12-11',
    { uk:`<h2>Логи: structlog, ELK stack або Loki + Grafana</h2>
<p>Правильне логування — це коли ви можете знайти причину помилки за 5 хвилин, а не за 5 годин. Ключ: <strong>структуровані логи</strong> (JSON) замість простого тексту.</p>

<h3>Проблема звичайних логів</h3>
<pre># Поганий лог (важко парсити):
"ERROR 2024-01-15 14:23:01 User login failed for email=user@example.com"

# Хороший лог (структурований JSON):
{
  "timestamp": "2024-01-15T14:23:01.123Z",
  "level": "error",
  "event": "user_login_failed",
  "email": "user@example.com",
  "ip": "192.168.1.1",
  "attempt": 3,
  "user_agent": "Mozilla/5.0..."
}</pre>

<h3>structlog у Django</h3>
<pre>pip install structlog

import structlog
log = structlog.get_logger()

def login_view(request):
    email = request.data.get('email')
    log.info("login_attempt", email=email, ip=request.META.get('REMOTE_ADDR'))

    if not user:
        log.warning("login_failed", email=email, reason="user_not_found")
        return Response(status=401)

    log.info("login_success", user_id=user.id, email=email)</pre>

<h3>Конфігурація structlog</h3>
<pre>import structlog

structlog.configure(
    processors=[
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.dev.ConsoleRenderer()  # або JSONRenderer для production
    ],
    wrapper_class=structlog.make_filtering_bound_logger(logging.DEBUG),
)</pre>

<h3>ELK Stack (Elasticsearch + Logstash + Kibana)</h3>
<ul>
<li><strong>Elasticsearch</strong> — пошуковий рушій для зберігання логів</li>
<li><strong>Logstash</strong> — збір та трансформація логів</li>
<li><strong>Kibana</strong> — веб-інтерфейс для пошуку та аналізу</li>
</ul>

<h3>Loki + Grafana (легший варіант)</h3>
<pre># promtail збирає логи з Docker containers і відправляє в Loki
# Grafana читає з Loki — той самий UI що і для Prometheus

loki:
  image: grafana/loki:latest
  ports: ["3100:3100"]

promtail:
  image: grafana/promtail:latest
  volumes:
    - /var/log:/var/log:ro
    - /var/lib/docker/containers:/var/lib/docker/containers:ro
    - ./promtail.yml:/etc/promtail/config.yml</pre>

<h3>Що логувати</h3>
<ul>
<li>Кожен HTTP запит (метод, endpoint, статус, час)</li>
<li>Аутентифікація (успіх/невдача, IP)</li>
<li>Бізнес-події (замовлення, оплата)</li>
<li>Помилки з повним контекстом</li>
<li>Повільні запити (> 1 сек)</li>
</ul>`,
      ru:`<h2>Логи: structlog, ELK stack или Loki + Grafana</h2>
<p>Правильное логирование — это когда вы можете найти причину ошибки за 5 минут, а не 5 часов. Ключ: <strong>структурированные логи</strong> (JSON) вместо простого текста.</p>

<h3>Проблема обычных логов</h3>
<pre># Плохой лог (трудно парсить):
"ERROR 2024-01-15 User login failed for email=user@example.com"

# Хороший лог (структурированный JSON):
{
  "timestamp": "2024-01-15T14:23:01.123Z",
  "level": "error",
  "event": "user_login_failed",
  "email": "user@example.com",
  "attempt": 3
}</pre>

<h3>structlog в Django</h3>
<pre>pip install structlog

import structlog
log = structlog.get_logger()

log.info("login_attempt", email=email, ip=request.META.get('REMOTE_ADDR'))
log.warning("login_failed", email=email, reason="user_not_found")
log.info("login_success", user_id=user.id)</pre>

<h3>Loki + Grafana</h3>
<pre>loki:
  image: grafana/loki:latest
  ports: ["3100:3100"]

promtail:
  image: grafana/promtail:latest
  volumes:
    - /var/log:/var/log:ro
    - /var/lib/docker/containers:/var/lib/docker/containers:ro</pre>` },
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

var logs = [];

function structlogInfo(event, fields) {
  var entry = Object.assign({ event: event, level: 'info', timestamp: new Date().toISOString() }, fields);
  logs.push(entry);
  logLine(JSON.stringify(entry), '#4ade80');
}

function emitLoginAttempt() {
  structlogInfo('login_attempt', { email: 'user@test.com', ip: '192.168.1.1' });
}

function emitLoginFailed() {
  var entry = { event: 'login_failed', level: 'warning', email: 'user@test.com', reason: 'user_not_found', timestamp: new Date().toISOString() };
  logs.push(entry);
  logLine(JSON.stringify(entry), '#facc15');
}

function queryLogs() {
  logLine('', '#64748b');
  logLine('LogQL-подібний запит: {event="login_attempt", email="user@test.com"}', '#68a063');
  var filtered = logs.filter(function (l) { return l.event === 'login_attempt' && l.email === 'user@test.com'; });
  logLine('Знайдено ' + filtered.length + ' запис(ів): ' + JSON.stringify(filtered), '#7dd3fc');
}

row.appendChild(mkBtn('log.info("login_attempt", ...)', emitLoginAttempt));
row.appendChild(mkBtn('log.warning("login_failed", ...)', emitLoginFailed));
row.appendChild(mkBtn('Запит: усі login_attempt для user@test.com', queryLogs));`,
    [
      { level:'easy',   uk:'Поясни чому структурований JSON-лог кращий за текстовий. Як зробити пошук у 10 млн рядків: "всі невдалі логіни з IP 192.168.1.100 за останні 24 год"?', ru:'Объясни почему структурированный JSON-лог лучше текстового. Как сделать поиск в 10 млн строк: "все неудачные логины с IP 192.168.1.100 за последние 24 ч"?' },
      { level:'easy',   uk:'Які події обов\'язково логувати у веб-застосунку? Склади список мінімум 8 подій з поясненням чому кожна важлива для безпеки або debugging.', ru:'Какие события обязательно логировать в веб-приложении? Составь список минимум 8 событий с объяснением почему каждое важно для безопасности или debugging.' },
      { level:'medium', uk:'Налаштуй structlog у Django: JSON-формат у production, кольоровий dev-формат у розробці. Додай middleware що логує кожен запит (метод, URL, статус, час відповіді).', ru:'Настрой structlog в Django: JSON-формат в production, цветной dev-формат при разработке. Добавь middleware логирующий каждый запрос (метод, URL, статус, время ответа).' },
      { level:'medium', uk:'Реалізуй correlation ID: при кожному вхідному HTTP запиті генеруй UUID і прокидай його через весь стек (Django → Celery → DB). Це дозволить зібрати всі логи одного запиту.', ru:'Реализуй correlation ID: при каждом входящем HTTP запросе генерируй UUID и пробрасывай его через весь стек (Django → Celery → DB). Это позволит собрать все логи одного запроса.' },
      { level:'hard',   uk:'Налаштуй Loki + Promtail + Grafana у docker-compose. Переконайся що логи Django-контейнера з\'являються у Grafana. Створи dashboard з графіком помилок за годину.', ru:'Настрой Loki + Promtail + Grafana в docker-compose. Убедись что логи Django-контейнера появляются в Grafana. Создай dashboard с графиком ошибок за час.' },
      { level:'hard',   uk:'Реалізуй log sampling: логуй 100% помилок та warnings, але тільки 10% INFO-логів (щоб не перевантажити сховище). Як це зробити через structlog processor?', ru:'Реализуй log sampling: логируй 100% ошибок и warnings, но только 10% INFO-логов (чтобы не перегрузить хранилище). Как это сделать через structlog processor?' },
      { level:'extra',  uk:'Впровади log-based alerting: якщо у Loki за 5 хвилин з\'являється більше 5 логів рівня ERROR з event="payment_failed" — відправляти alert у Slack. Налаштуй через Grafana Alerting.', ru:'Внедри log-based alerting: если в Loki за 5 минут появляется больше 5 логов уровня ERROR с event="payment_failed" — отправлять alert в Slack. Настрой через Grafana Alerting.' },
    ],
    `# structlog_demo.py — структуроване логування у Python/Django

import structlog
import logging
import sys
import uuid
import time
import json

# ── Конфігурація structlog ───────────────────────────────
def configure_logging(environment: str = "production"):
    shared_processors = [
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.StackInfoRenderer(),
        structlog.processors.TimeStamper(fmt="iso", utc=True),
    ]

    if environment == "development":
        processors = shared_processors + [
            structlog.dev.ConsoleRenderer(colors=True)
        ]
    else:
        processors = shared_processors + [
            structlog.processors.dict_tracebacks,
            structlog.processors.JSONRenderer()
        ]

    structlog.configure(
        processors=processors,
        wrapper_class=structlog.make_filtering_bound_logger(logging.DEBUG),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(file=sys.stdout),
    )

configure_logging("development")
log = structlog.get_logger()

# ── Middleware — correlation ID ────────────────────────────
class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        start = time.perf_counter()

        # Прив'язуємо request_id до всіх логів цього запиту
        structlog.contextvars.bind_contextvars(
            request_id=request_id,
            user_id=getattr(getattr(request, 'user', None), 'id', None),
        )

        log.info("request_started",
                 method=request.method,
                 path=request.path,
                 ip=request.META.get("REMOTE_ADDR"))

        response = self.get_response(request)
        duration_ms = (time.perf_counter() - start) * 1000

        log.info("request_finished",
                 method=request.method,
                 path=request.path,
                 status=response.status_code,
                 duration_ms=round(duration_ms, 2))

        structlog.contextvars.clear_contextvars()
        return response

# ── Бізнес-логи ──────────────────────────────────────────
def process_order(user_id: int, items: list, total: float):
    order_log = log.bind(user_id=user_id, order_total=total)
    order_log.info("order_processing_started", item_count=len(items))

    try:
        # Симуляція обробки
        if total > 10000:
            order_log.warning("high_value_order", needs_review=True)

        order_id = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        order_log.info("order_created", order_id=order_id)
        return order_id

    except Exception as e:
        order_log.error("order_failed", error=str(e), exc_info=True)
        raise

# ── Демонстрація ──────────────────────────────────────────
if __name__ == '__main__':
    print("=== structlog Demo ===\n")

    log.info("app_started", version="1.0.0", environment="demo")
    log.warning("login_failed", email="user@test.com", ip="192.168.1.1", attempt=3)

    order = process_order(user_id=42, items=["laptop", "mouse"], total=1299.99)
    print(f"\nOrder created: {order}")

    log.critical("payment_failed",
                 order_id=order,
                 reason="card_declined",
                 amount=1299.99)
`);

  /* ─── 12-12: Безпека ─────────────────────────────────────── */
  patch('12-12',
    { uk:`<h2>Безпека: OWASP Top 10, rate limiting, secrets management</h2>
<p>Безпека — не фіча, яку додають наприкінці. Вона вбудовується в кожен рядок коду. OWASP Top 10 — найпоширеніші вразливості веб-застосунків.</p>

<h3>OWASP Top 10 (2021)</h3>
<ul>
<li><strong>A01 — Broken Access Control</strong>: перевіряти права кожен раз, не лише при логіні</li>
<li><strong>A02 — Cryptographic Failures</strong>: не зберігати паролі у plain text, використовувати bcrypt/Argon2</li>
<li><strong>A03 — Injection</strong>: SQL, NoSQL, Command injection — використовувати ORM та параметризовані запити</li>
<li><strong>A04 — Insecure Design</strong>: загрози потрібно враховувати при проектуванні</li>
<li><strong>A05 — Security Misconfiguration</strong>: DEBUG=True у production, дефолтні паролі</li>
<li><strong>A07 — XSS</strong>: escaping output, CSP-заголовки</li>
<li><strong>A09 — Security Logging Failures</strong>: логувати всі події безпеки</li>
</ul>

<h3>Secrets Management</h3>
<pre># ❌ НІКОЛИ не робіть так:
SECRET_KEY = "my-secret-key"  # у коді!

# ✅ Правильно — через змінні середовища:
import os
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]

# .env файл (НЕ комітити в git!):
DJANGO_SECRET_KEY=your-very-long-random-secret
DATABASE_URL=postgresql://user:pass@db/mydb

# .gitignore:
.env
*.env
secrets/</pre>

<h3>Rate Limiting у Django</h3>
<pre>pip install django-ratelimit

from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m', method='POST', block=True)
def login_view(request):
    ...

@ratelimit(key='user', rate='100/h', block=True)
def api_view(request):
    ...</pre>

<h3>Django Security Checklist</h3>
<pre>DEBUG = False                    # КРИТИЧНО
ALLOWED_HOSTS = ['example.com']
SECRET_KEY = os.environ["SECRET_KEY"]
SECURE_HSTS_SECONDS = 31536000
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"</pre>

<h3>SQL Injection — приклад</h3>
<pre># ❌ Вразливо:
User.objects.raw(f"SELECT * FROM users WHERE email='{email}'")

# ✅ Безпечно (Django ORM):
User.objects.filter(email=email)

# ✅ Параметризований запит:
cursor.execute("SELECT * FROM users WHERE email = %s", [email])</pre>`,
      ru:`<h2>Безопасность: OWASP Top 10, rate limiting, secrets management</h2>
<p>Безопасность — не фича, которую добавляют в конце. Она встраивается в каждую строку кода. OWASP Top 10 — самые распространённые уязвимости веб-приложений.</p>

<h3>OWASP Top 10 (2021)</h3>
<ul>
<li><strong>A01 — Broken Access Control</strong>: проверять права каждый раз</li>
<li><strong>A02 — Cryptographic Failures</strong>: не хранить пароли в plain text, bcrypt/Argon2</li>
<li><strong>A03 — Injection</strong>: SQL, NoSQL, Command — использовать ORM и параметризованные запросы</li>
<li><strong>A05 — Security Misconfiguration</strong>: DEBUG=True в production, дефолтные пароли</li>
<li><strong>A07 — XSS</strong>: escaping output, CSP-заголовки</li>
</ul>

<h3>Secrets Management</h3>
<pre># ❌ Никогда так:
SECRET_KEY = "my-secret-key"  # в коде!

# ✅ Через переменные среды:
import os
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]

# .env файл (НЕ коммитить в git!):
DJANGO_SECRET_KEY=your-very-long-random-secret
# .gitignore: .env *.env secrets/</pre>

<h3>Rate Limiting в Django</h3>
<pre>from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m', method='POST', block=True)
def login_view(request): ...

@ratelimit(key='user', rate='100/h', block=True)
def api_view(request): ...</pre>

<h3>Django Security Checklist</h3>
<pre>DEBUG = False
SECURE_HSTS_SECONDS = 31536000
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = "DENY"</pre>` },
    `<div id="sec-app" style="font-family:sans-serif;padding:12px;background:#0f172a;color:#f1f5f9;border-radius:8px">
<h2 style="color:#f87171;margin:0 0 12px;font-size:15px">🔐 Security Scanner Demo</h2>
<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
  <button onclick="scanSQL()" class="sb">SQL Injection Test</button>
  <button onclick="scanXSS()" class="sb">XSS Test</button>
  <button onclick="scanSecrets()" class="sb">Secrets Leak</button>
  <button onclick="scanHeaders()" class="sb">Security Headers</button>
  <button onclick="clearResults()" class="sb reset">Clear</button>
</div>
<div id="scan-results" style="background:#020617;border-radius:8px;padding:10px;min-height:100px;font-family:monospace;font-size:12px"></div>
</div>`,
    `*{box-sizing:border-box}body{margin:0;padding:0}
.sb{background:#1e293b;border:1px solid #334155;color:#f87171;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px}
.sb:hover{border-color:#f87171}.sb.reset{color:#94a3b8}`,
    `function addResult(html){ document.getElementById('scan-results').innerHTML += html + '<br>'; }
function clearResults(){ document.getElementById('scan-results').innerHTML=''; }

var TESTS = {
  sql: [
    {input:"john@mail.com",safe:true,label:"Normal email"},
    {input:"' OR '1'='1",safe:false,label:"Classic SQLi"},
    {input:"1; DROP TABLE users--",safe:false,label:"DROP TABLE"},
    {input:"' UNION SELECT password FROM users--",safe:false,label:"UNION attack"},
  ],
  xss:[
    {input:"Hello World",safe:true,label:"Normal text"},
    {input:'<script>alert("xss")</script>',safe:false,label:"Script tag"},
    {input:'<img src=x onerror=alert(1)>',safe:false,label:"Img onerror"},
    {input:'javascript:alert(1)',safe:false,label:"JS protocol"},
  ]
};

function scanSQL(){
  addResult('<span style="color:#818cf8;font-weight:600">SQL Injection Scanner</span>');
  TESTS.sql.forEach(function(t){
    var escaped = t.input.replace(/'/g,"''");
    var orm_safe = '?placeholder';
    addResult('  Input: <span style="color:#fbbf24">' + t.input.replace(/</g,'&lt;') + '</span>');
    if(!t.safe) {
      addResult('    Raw SQL: <span style="color:#ef4444">❌ VULNERABLE — WHERE email=\'' + t.input + '\'</span>');
      addResult('    ORM: <span style="color:#4ade80">✅ SAFE — .filter(email=' + orm_safe + ')</span>');
    } else {
      addResult('    <span style="color:#4ade80">✅ Safe input</span>');
    }
  });
}

function scanXSS(){
  addResult('<span style="color:#f59e0b;font-weight:600">XSS Scanner</span>');
  TESTS.xss.forEach(function(t){
    var escaped = t.input.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    addResult('  Input: ' + t.input.replace(/</g,'&lt;'));
    if(!t.safe){
      addResult('    Unescaped: <span style="color:#ef4444">❌ DANGEROUS</span>');
      addResult('    Escaped: <span style="color:#4ade80">✅ ' + escaped + '</span>');
    } else {
      addResult('    <span style="color:#4ade80">✅ Safe</span>');
    }
  });
}

function scanSecrets(){
  var code = 'SECRET_KEY="abc123"\nAPI_KEY="sk-1234567890"\nDATABASE_URL="postgresql://user:pass@db/mydb"\nimport os\nos.environ["SECRET_KEY"]';
  addResult('<span style="color:#f87171;font-weight:600">Secrets Leak Scanner</span>');
  var patterns = [
    {re:/SECRET_KEY\s*=\s*["'][^"']+["']/, label:'Hardcoded SECRET_KEY'},
    {re:/API_KEY\s*=\s*["'][^"']+["']/, label:'Hardcoded API_KEY'},
    {re:/password\s*=\s*["'][^"']+["']/i, label:'Hardcoded password'},
    {re:/postgresql:\/\/[^"']+:[^"']+@/, label:'DB credentials in URL'},
  ];
  patterns.forEach(function(p){
    if(p.re.test(code)){
      addResult('  <span style="color:#ef4444">❌ ' + p.label + ' found in code!</span>');
    }
  });
  addResult('  <span style="color:#4ade80">✅ Use os.environ["KEY"] instead</span>');
}

function scanHeaders(){
  var required = [
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Content-Security-Policy',
    'Referrer-Policy'
  ];
  addResult('<span style="color:#34d399;font-weight:600">Security Headers Checker</span>');
  required.forEach(function(h){
    var present = Math.random() > 0.3;
    addResult('  ' + (present?'<span style="color:#4ade80">✅':'<span style="color:#ef4444">❌ MISSING:') + ' ' + h + '</span>');
  });
}`,
    [
      { level:'easy',   uk:'Запусти Security Scanner. Поясни кожен тип атаки: SQL Injection, XSS, Secrets Leak. Чому `" OR "1"="1"` є класичним SQL injection і як ORM захищає від нього?', ru:'Запусти Security Scanner. Объясни каждый тип атаки: SQL Injection, XSS, Secrets Leak. Почему `" OR "1"="1"` — классический SQL injection и как ORM защищает от него?' },
      { level:'easy',   uk:'Перевір свій проект на "чуттєві дані у git": знайди у git log чи є будь-коли файли .env або рядки з паролями. Як видалити їх з git-історії? (git filter-repo)', ru:'Проверь свой проект на "чувствительные данные в git": найди в git log есть ли когда-либо файлы .env или строки с паролями. Как удалить их из git-истории? (git filter-repo)' },
      { level:'medium', uk:'Застосуй Django security checklist з теорії до свого проекту. Запусти `python manage.py check --deploy` — виправ всі попередження. Що кожне налаштування означає?', ru:'Примени Django security checklist из теории к своему проекту. Запусти `python manage.py check --deploy` — исправь все предупреждения. Что означает каждая настройка?' },
      { level:'medium', uk:'Реалізуй rate limiting для API: /api/auth/login/ — max 5 спроб за хвилину з одного IP, /api/ — max 100 за годину для авторизованого user. Поверни 429 з Retry-After заголовком.', ru:'Реализуй rate limiting для API: /api/auth/login/ — max 5 попыток за минуту с одного IP, /api/ — max 100 за час для авторизованного user. Верни 429 с Retry-After заголовком.' },
      { level:'hard',   uk:'Впровади Content Security Policy (CSP) для frontend: заблокуй inline scripts та завантаження ресурсів зі сторонніх доменів (крім дозволених CDN). Перевір у Chrome DevTools.', ru:'Внедри Content Security Policy (CSP) для frontend: заблокируй inline scripts и загрузку ресурсов со сторонних доменов (кроме разрешённых CDN). Проверь в Chrome DevTools.' },
      { level:'hard',   uk:'Реалізуй OWASP-захист від IDOR (Insecure Direct Object Reference): користувач не повинен мати доступ до `/api/orders/123/` якщо замовлення не його. Напиши тест що перевіряє це.', ru:'Реализуй OWASP-защиту от IDOR (Insecure Direct Object Reference): пользователь не должен иметь доступ к `/api/orders/123/` если заказ не его. Напиши тест проверяющий это.' },
      { level:'extra',  uk:'Проведи повний security audit свого проекту за OWASP Top 10: перевір кожен пункт, задокументуй знахідки, виправ вразливості, напиши звіт з пріоритизацією ризиків.', ru:'Проведи полный security audit своего проекта по OWASP Top 10: проверь каждый пункт, задокументируй находки, исправь уязвимости, напиши отчёт с приоритизацией рисков.' },
    ],
    '');

  /* ─── 12-13: Scaling ─────────────────────────────────────── */
  patch('12-13',
    { uk:`<h2>Scaling: horizontal scaling та load balancer</h2>
<p>Коли один сервер не справляється з навантаженням — потрібно масштабування. <strong>Вертикальне</strong> (більший сервер) — простіше, але обмежено. <strong>Горизонтальне</strong> (більше серверів) — складніше, але необмежено.</p>

<h3>Вертикальне vs Горизонтальне</h3>
<ul>
<li><strong>Vertical</strong>: 2 CPU → 8 CPU, 4GB → 32GB RAM. Просто, але: дорого, single point of failure, є ceiling.</li>
<li><strong>Horizontal</strong>: 1 сервер → 10 серверів. Складніше архітектурно, але: необмежено, fault-tolerant.</li>
</ul>

<h3>Stateless архітектура — ключ до горизонтального scaling</h3>
<pre># ❌ Stateful (не масштабується):
# Сесія зберігається в пам'яті сервера A
# Запит потрапляє на сервер B — сесія не знайдена!

# ✅ Stateless — сесія в Redis:
# settings.py
SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"
CACHES = {"default": {"BACKEND": "django_redis.cache.RedisCache", ...}}</pre>

<h3>Load Balancing алгоритми</h3>
<ul>
<li><strong>Round Robin</strong> — по черзі. Просто, рівномірне при однорідних запитах.</li>
<li><strong>Least Connections</strong> — до сервера з найменшою кількістю активних з'єднань. Краще для різних по тривалості запитів.</li>
<li><strong>IP Hash</strong> — один клієнт завжди на один сервер (sticky session). Потрібно лише якщо є state.</li>
<li><strong>Weighted</strong> — сервери мають різні ваги (наприклад якщо різна потужність).</li>
</ul>

<h3>Docker Compose: 3 інстанси Django</h3>
<pre>services:
  web:
    build: .
    scale: 3           # або: docker compose up --scale web=3
    expose: ["8000"]   # НЕ ports — тільки nginx доступає

  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: [./nginx.conf:/etc/nginx/conf.d/default.conf:ro]
    depends_on: [web]

# nginx.conf
upstream django {
    least_conn;
    server web:8000;
    # Docker DNS резолвить web до всіх 3 контейнерів
}</pre>

<h3>Auto-scaling у хмарі</h3>
<pre># AWS Auto Scaling: метрика CPU > 70% → додати інстанс
# GCP Managed Instance Groups: min 2, max 10
# Kubernetes HPA:
kubectl autoscale deployment myapp --min=2 --max=10 --cpu-percent=70</pre>`,
      ru:`<h2>Scaling: horizontal scaling и load balancer</h2>
<p>Когда один сервер не справляется с нагрузкой — нужно масштабирование. <strong>Вертикальное</strong> (больший сервер) — проще, но ограничено. <strong>Горизонтальное</strong> (больше серверов) — сложнее, но безгранично.</p>

<h3>Вертикальное vs Горизонтальное</h3>
<ul>
<li><strong>Vertical</strong>: 2 CPU → 8 CPU. Просто, но дорого и есть ceiling.</li>
<li><strong>Horizontal</strong>: 1 сервер → 10 серверов. Сложнее, но неограниченно и fault-tolerant.</li>
</ul>

<h3>Stateless архитектура — ключ к horizontal scaling</h3>
<pre># ❌ Stateful (не масштабируется):
# Сессия в памяти сервера A → запрос на B → сессия не найдена!

# ✅ Stateless — сессия в Redis:
SESSION_ENGINE = "django.contrib.sessions.backends.cache"</pre>

<h3>Load Balancing алгоритмы</h3>
<ul>
<li><strong>Round Robin</strong> — по очереди. Просто и равномерно.</li>
<li><strong>Least Connections</strong> — к серверу с наименьшим числом соединений.</li>
<li><strong>IP Hash</strong> — один клиент всегда на один сервер (sticky session).</li>
<li><strong>Weighted</strong> — серверы с разными весами.</li>
</ul>

<h3>Docker Compose: 3 инстанса Django</h3>
<pre>services:
  web:
    build: .
    scale: 3
    expose: ["8000"]

  nginx:
    image: nginx:alpine
    ports: ["80:80"]

# nginx.conf upstream: least_conn + server web:8000</pre>` },
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

var serverCount = 2;
var minServers = 2;
var maxServers = 8;

/* Справжній алгоритм авто-масштабування (реальні обчислення) */
function autoScaleDecision(cpuSamples) {
  var avg = cpuSamples.reduce(function (sum, v) { return sum + v; }, 0) / cpuSamples.length;
  var decision = { avg: Math.round(avg * 10) / 10, action: 'none' };

  if (avg > 75 && serverCount < maxServers) {
    serverCount++;
    decision.action = 'scale-out';
  } else if (avg < 30 && serverCount > minServers) {
    serverCount--;
    decision.action = 'scale-in';
  }
  return decision;
}

function simulateHighLoad() {
  var samples = [82, 88, 91, 85, 79];
  var decision = autoScaleDecision(samples);
  out.textContent = 'CPU-виміри (5 хв): ' + samples.join('%, ') + '%\\n' +
    'Середнє: ' + decision.avg + '%\\n' +
    'Рішення: ' + (decision.action === 'scale-out' ? 'ДОДАТИ сервер (тепер їх ' + serverCount + ')' : 'без змін') + '\\n' +
    'Поточна кількість серверів: ' + serverCount;
}

function simulateLowLoad() {
  var samples = [12, 18, 25, 20, 15];
  var decision = autoScaleDecision(samples);
  out.textContent = 'CPU-виміри (5 хв): ' + samples.join('%, ') + '%\\n' +
    'Середнє: ' + decision.avg + '%\\n' +
    'Рішення: ' + (decision.action === 'scale-in' ? 'ВИДАЛИТИ сервер (тепер їх ' + serverCount + ')' : 'без змін (мінімум ' + minServers + ' серверів)') + '\\n' +
    'Поточна кількість серверів: ' + serverCount;
}

row.appendChild(mkBtn('Симулювати ВИСОКЕ навантаження', simulateHighLoad));
row.appendChild(mkBtn('Симулювати НИЗЬКЕ навантаження', simulateLowLoad));`,
    [
      { level:'easy',   uk:'Поясни чому "stateless" архітектура є обов\'язковою умовою горизонтального масштабування. Що таке "sticky sessions" і коли вони є компромісом?', ru:'Объясни почему "stateless" архитектура является обязательным условием горизонтального масштабирования. Что такое "sticky sessions" и когда они являются компромиссом?' },
      { level:'easy',   uk:'Порівняй алгоритми Round Robin та Least Connections: в якому сценарії Round Robin дасть нерівномірне навантаження? Наведи конкретний приклад.', ru:'Сравни алгоритмы Round Robin и Least Connections: в каком сценарии Round Robin даст неравномерную нагрузку? Приведи конкретный пример.' },
      { level:'medium', uk:'Масштабуй свій Django-проект горизонтально: запусти 3 інстанси через `docker compose up --scale web=3`. Переконайся що сесії зберігаються в Redis і запити між сервісами балансуються.', ru:'Масштабируй свой Django-проект горизонтально: запусти 3 инстанса через `docker compose up --scale web=3`. Убедись что сессии хранятся в Redis и запросы балансируются между сервисами.' },
      { level:'medium', uk:'Виконай load testing за допомогою locust або ab: симулюй 100 одночасних користувачів, 1000 запитів. Порівняй throughput та latency для 1 та 3 інстансів Django.', ru:'Выполни load testing с помощью locust или ab: симулируй 100 одновременных пользователей, 1000 запросов. Сравни throughput и latency для 1 и 3 инстансов Django.' },
      { level:'hard',   uk:'Реалізуй blue-green deployment: є два набори серверів (blue = поточна версія, green = нова). Перемикай трафік в nginx без downtime. Як відкатитись назад при проблемі?', ru:'Реализуй blue-green deployment: есть два набора серверов (blue = текущая версия, green = новая). Переключай трафик в nginx без downtime. Как откатиться назад при проблеме?' },
      { level:'hard',   uk:'Впровади circuit breaker pattern: якщо upstream сервіс повертає 5xx > 50% за 30 секунд — "відкрий" circuit і повертай fallback-відповідь без очікування таймаутів.', ru:'Внедри circuit breaker pattern: если upstream сервис возвращает 5xx > 50% за 30 секунд — "открой" circuit и возвращай fallback-ответ без ожидания таймаутов.' },
      { level:'extra',  uk:'Спроектуй auto-scaling систему: при CPU > 70% автоматично піднімати новий контейнер, при CPU < 20% — зменшувати кількість. Реалізуй через bash-скрипт що моніторить docker stats.', ru:'Спроектируй auto-scaling систему: при CPU > 70% автоматически поднимать новый контейнер, при CPU < 20% — уменьшать количество. Реализуй через bash-скрипт мониторящий docker stats.' },
    ],
    `#!/usr/bin/env python3
# scaling_demo.py — демонстрація load balancing та stateless архітектури

import random
import time
from collections import defaultdict
from typing import Optional

# ── Симуляція Stateless сесій (через Redis-подібний dict) ──
SESSION_STORE: dict = {}  # Спільний між усіма серверами

class Server:
    def __init__(self, server_id: str, cpu_cores: int = 2):
        self.id = server_id
        self.cpu_cores = cpu_cores
        self.active_connections = 0
        self.requests_handled = 0

    def handle_request(self, request_id: str, session_id: Optional[str] = None) -> dict:
        self.active_connections += 1
        self.requests_handled += 1

        # Stateless: читаємо сесію зі спільного store (Redis)
        session = SESSION_STORE.get(session_id, {"visits": 0})
        session["visits"] += 1
        if session_id:
            SESSION_STORE[session_id] = session

        process_time = random.uniform(0.01, 0.05) * (1 / self.cpu_cores)
        time.sleep(process_time)
        self.active_connections -= 1

        return {
            "server": self.id,
            "request_id": request_id,
            "session_visits": session["visits"],
            "processing_time": round(process_time * 1000, 1)
        }

# ── Load Balancer ──────────────────────────────────────────
class LoadBalancer:
    def __init__(self, algorithm: str = "round_robin"):
        self.servers: list[Server] = []
        self.algorithm = algorithm
        self._rr_index = 0

    def add_server(self, server: Server):
        self.servers.append(server)

    def get_server(self) -> Server:
        if not self.servers:
            raise RuntimeError("No servers available")

        if self.algorithm == "round_robin":
            s = self.servers[self._rr_index % len(self.servers)]
            self._rr_index += 1
            return s

        elif self.algorithm == "least_conn":
            return min(self.servers, key=lambda s: s.active_connections)

        elif self.algorithm == "random":
            return random.choice(self.servers)

        return self.servers[0]

    def route(self, request_id: str, session_id: str = None) -> dict:
        server = self.get_server()
        return server.handle_request(request_id, session_id)

# ── Benchmark ─────────────────────────────────────────────
def run_benchmark(lb: LoadBalancer, num_requests: int = 20):
    print(f"\n=== {lb.algorithm.upper()} Benchmark ({num_requests} requests) ===")
    start = time.time()
    results = defaultdict(int)
    session_id = "user-session-123"

    for i in range(num_requests):
        result = lb.route(f"req-{i}", session_id)
        results[result["server"]] += 1

    elapsed = time.time() - start
    print(f"Total time: {elapsed:.3f}s")
    print("Distribution:", dict(results))
    print("Session visits:", SESSION_STORE.get(session_id, {}).get("visits", 0))

if __name__ == "__main__":
    for algorithm in ["round_robin", "least_conn"]:
        lb = LoadBalancer(algorithm=algorithm)
        lb.add_server(Server("web-1", cpu_cores=2))
        lb.add_server(Server("web-2", cpu_cores=2))
        lb.add_server(Server("web-3", cpu_cores=4))
        SESSION_STORE.clear()
        run_benchmark(lb, 15)
`);

  /* ─── 12-14: Kubernetes ──────────────────────────────────── */
  patch('12-14',
    { uk:`<h2>Kubernetes basics: pods, deployments, services</h2>
<p>Kubernetes (K8s) — система оркестрації контейнерів. Автоматично розгортає, масштабує та перезапускає контейнери. Це "операційна система для хмарних застосунків".</p>

<h3>Архітектура K8s</h3>
<ul>
<li><strong>Control Plane</strong>: API Server, Scheduler, Controller Manager, etcd (база стану)</li>
<li><strong>Worker Node</strong>: kubelet (агент), container runtime (Docker/containerd), kube-proxy</li>
</ul>

<h3>Основні об'єкти</h3>
<pre># Pod — найменша одиниця. 1-2 тісно пов'язаних контейнери.
# Deployment — керує ReplicaSet (скільки pod, rolling update)
# Service — стабільний endpoint для pod (ClusterIP, NodePort, LoadBalancer)
# Ingress — HTTP routing правила (доменні імена → Service)
# ConfigMap — конфіги не-секретні
# Secret — секретні дані (base64-encoded)
# Namespace — логічна ізоляція (dev / staging / prod)</pre>

<h3>Deployment + Service</h3>
<pre>apiVersion: apps/v1
kind: Deployment
metadata:
  name: django-web
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: django
  template:
    metadata:
      labels:
        app: django
    spec:
      containers:
      - name: web
        image: ghcr.io/myorg/myapp:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests: { cpu: "250m", memory: "256Mi" }
          limits:   { cpu: "500m", memory: "512Mi" }
        readinessProbe:
          httpGet: { path: /health/, port: 8000 }
          initialDelaySeconds: 10
        livenessProbe:
          httpGet: { path: /health/, port: 8000 }
---
apiVersion: v1
kind: Service
metadata:
  name: django-service
spec:
  selector:
    app: django
  ports:
  - port: 80
    targetPort: 8000</pre>

<h3>kubectl — основні команди</h3>
<pre>kubectl get pods -n production
kubectl logs -f deploy/django-web
kubectl exec -it pod/django-xxx -- python manage.py migrate
kubectl apply -f k8s/               # застосувати всі маніфести
kubectl rollout status deploy/django-web
kubectl rollout undo deploy/django-web  # rollback
kubectl scale deploy/django-web --replicas=5
kubectl top pods                    # CPU/RAM utilization</pre>

<h3>HPA — Horizontal Pod Autoscaler</h3>
<pre>kubectl autoscale deployment django-web --min=2 --max=10 --cpu-percent=70</pre>`,
      ru:`<h2>Kubernetes basics: pods, deployments, services</h2>
<p>Kubernetes (K8s) — система оркестрации контейнеров. Автоматически разворачивает, масштабирует и перезапускает контейнеры.</p>

<h3>Архитектура K8s</h3>
<ul>
<li><strong>Control Plane</strong>: API Server, Scheduler, Controller Manager, etcd</li>
<li><strong>Worker Node</strong>: kubelet, container runtime, kube-proxy</li>
</ul>

<h3>Основные объекты</h3>
<pre>Pod        — наименьшая единица (1-2 контейнера)
Deployment — управляет ReplicaSet (rolling update)
Service    — стабильный endpoint для pods
Ingress    — HTTP routing (домены → Service)
ConfigMap  — не-секретные конфиги
Secret     — секретные данные
Namespace  — логическая изоляция</pre>

<h3>Deployment + Service</h3>
<pre>apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: web
        image: ghcr.io/myorg/myapp:latest
        resources:
          requests: { cpu: "250m", memory: "256Mi" }
          limits:   { cpu: "500m", memory: "512Mi" }
        readinessProbe:
          httpGet: { path: /health/, port: 8000 }</pre>

<h3>kubectl — основные команды</h3>
<pre>kubectl get pods -n production
kubectl logs -f deploy/django-web
kubectl exec -it pod/django-xxx -- python manage.py migrate
kubectl apply -f k8s/
kubectl rollout undo deploy/django-web
kubectl top pods</pre>` },
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

/* Справжній (спрощений) планувальник: обирає НАЙМЕНШ завантажену ноду для pod'а */
var nodes = [{ name: 'node-1', pods: 0 }, { name: 'node-2', pods: 0 }, { name: 'node-3', pods: 0 }];

function scheduleNextPod() {
  var best = nodes[0];
  nodes.forEach(function (n) { if (n.pods < best.pods) best = n; });
  best.pods++;
  return best;
}

function applyDeployment(replicas) {
  logLine('', '');
  logLine('$ kubectl apply -f deployment.yaml (replicas: ' + replicas + ')', '#68a063');
  for (var i = 1; i <= replicas; i++) {
    var node = scheduleNextPod();
    logLine('  pod django-web-' + i + ' -> заплановано на ' + node.name + ' (подів на ноді: ' + node.pods + ')', '#4ade80');
  }
}

function killPod() {
  var busiest = nodes[0];
  nodes.forEach(function (n) { if (n.pods > busiest.pods) busiest = n; });
  if (busiest.pods === 0) { logLine('Немає подів для видалення', '#f87171'); return; }
  busiest.pods--;
  logLine('', '');
  logLine('⚠ pod на ' + busiest.name + ' впав (livenessProbe провалено)', '#f87171');
  var node = scheduleNextPod();
  logLine('✓ Kubernetes АВТОМАТИЧНО перепланував новий pod на ' + node.name + ' (self-healing)', '#4ade80');
}

row.appendChild(mkBtn('kubectl apply --replicas=3', function () { applyDeployment(3); }));
row.appendChild(mkBtn('kubectl scale --replicas=2 (ще)', function () { applyDeployment(2); }));
row.appendChild(mkBtn('Симулювати падіння pod\\'а', killPod));`,
    [
      { level:'easy',   uk:'Поясни різницю між Pod, Deployment та Service у K8s. Чому ми не запускаємо Pod напряму (без Deployment)? Що таке ReplicaSet і як він пов\'язаний з Deployment?', ru:'Объясни разницу между Pod, Deployment и Service в K8s. Почему мы не запускаем Pod напрямую (без Deployment)? Что такое ReplicaSet и как он связан с Deployment?' },
      { level:'easy',   uk:'Вивчи K8s маніфести у вкладці Python. Що означає `readinessProbe` vs `livenessProbe`? Що відбувається якщо readiness probe падає? Якщо liveness probe падає?', ru:'Изучи K8s манифесты во вкладке Python. Что означает `readinessProbe` vs `livenessProbe`? Что происходит если readiness probe падает? Если liveness probe падает?' },
      { level:'medium', uk:'Встанови minikube (локальний K8s). Задеплой свій Django-проект: створи Deployment з 2 репліками, Service типу NodePort, та ConfigMap для Django settings.', ru:'Установи minikube (локальный K8s). Задеплой свой Django-проект: создай Deployment с 2 репликами, Service типа NodePort, и ConfigMap для Django settings.' },
      { level:'medium', uk:'Налаштуй K8s Secret для паролів БД. Чому K8s Secrets більш безпечні ніж ConfigMap? Що таке Sealed Secrets і коли варто їх використовувати?', ru:'Настрой K8s Secret для паролей БД. Почему K8s Secrets более безопасны чем ConfigMap? Что такое Sealed Secrets и когда стоит их использовать?' },
      { level:'hard',   uk:'Реалізуй rolling deployment без downtime: налаштуй minReadySeconds, maxSurge та maxUnavailable. Зроби деплой нової версії і в іншому вікні виконай curl в петлі — жодного 503.', ru:'Реализуй rolling deployment без downtime: настрой minReadySeconds, maxSurge и maxUnavailable. Сделай деплой новой версии и в другом окне выполни curl в петле — ни одного 503.' },
      { level:'hard',   uk:'Налаштуй HPA (Horizontal Pod Autoscaler): min 2, max 10 pod при CPU > 70%. Зроби навантаження через `kubectl run -it load-gen --image=busybox` і спостерігай за авто-масштабуванням.', ru:'Настрой HPA (Horizontal Pod Autoscaler): min 2, max 10 pod при CPU > 70%. Создай нагрузку через `kubectl run -it load-gen --image=busybox` и наблюдай за авто-масштабированием.' },
      { level:'extra',  uk:'Впровади GitOps підхід з ArgoCD: K8s кластер має автоматично синхронізуватись зі станом git-репозиторію. Будь-яка зміна YAML у main → автоматичний деплой до кластера.', ru:'Внедри GitOps подход с ArgoCD: K8s кластер должен автоматически синхронизироваться с состоянием git-репозитория. Любое изменение YAML в main → автоматический деплой в кластер.' },
    ],
    `# k8s/ — Kubernetes маніфести для Django застосунку

# ── Namespace ──────────────────────────────────────────────
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
---

# ── Secret ────────────────────────────────────────────────
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: production
type: Opaque
stringData:
  database-url: "postgresql://user:pass@postgres-service:5432/mydb"
  secret-key: "your-very-long-django-secret-key"
  redis-url: "redis://redis-service:6379/0"
---

# ── ConfigMap ─────────────────────────────────────────────
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  DEBUG: "False"
  ALLOWED_HOSTS: "example.com,www.example.com"
  DJANGO_SETTINGS_MODULE: "config.settings.production"
---

# ── Deployment ────────────────────────────────────────────
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: django-web
  namespace: production
  labels:
    app: django
    version: v1
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0        # zero-downtime!
  minReadySeconds: 10
  selector:
    matchLabels:
      app: django
  template:
    metadata:
      labels:
        app: django
    spec:
      containers:
      - name: web
        image: ghcr.io/myorg/myapp:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 8000
        envFrom:
        - configMapRef:
            name: app-config
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: secret-key
        resources:
          requests:
            cpu: "250m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        readinessProbe:
          httpGet:
            path: /health/
            port: 8000
          initialDelaySeconds: 10
          periodSeconds: 5
          failureThreshold: 3
        livenessProbe:
          httpGet:
            path: /health/
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
          failureThreshold: 3
---

# ── Service ───────────────────────────────────────────────
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: django-service
  namespace: production
spec:
  selector:
    app: django
  ports:
  - name: http
    port: 80
    targetPort: 8000
  type: ClusterIP
---

# ── HPA ───────────────────────────────────────────────────
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: django-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: django-web
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
`);

  /* ─── 12-15: ФІНАЛ ───────────────────────────────────────── */
  patch('12-15',
    { uk:`<h2>ФІНАЛ: Захист портфоліо (3 задеплоєні проекти)</h2>
<p>Фінальний урок курсу. Ти пройшов шлях від HTML/CSS до повноцінного fullstack developer з навичками DevOps. Час показати що ти вмієш.</p>

<h3>Що має бути задеплоєно</h3>
<ul>
<li><strong>Проект 1 (Модуль 09)</strong> — Gym Tracker: Node.js/React + PostgreSQL</li>
<li><strong>Проект 2 (Модуль 10)</strong> — Навчальна платформа: Django + React</li>
<li><strong>Проект 3 (Модуль 11)</strong> — E-commerce: Django DRF + React + Stripe</li>
</ul>

<h3>Deployment Checklist</h3>
<ul>
<li>✅ HTTPS налаштований (Let's Encrypt)</li>
<li>✅ Docker + docker-compose</li>
<li>✅ GitHub Actions CI/CD</li>
<li>✅ Nginx reverse proxy</li>
<li>✅ Змінні середовища (не в коді)</li>
<li>✅ Backup бази даних (cron)</li>
<li>✅ Sentry (відстеження помилок)</li>
<li>✅ Uptime моніторинг (UptimeRobot)</li>
<li>✅ README з описом, скріншотами, посиланнями</li>
<li>✅ Ліцензія та .gitignore</li>
</ul>

<h3>README який вражає</h3>
<pre># ProjectName 🚀

> Коротко: що робить проект і чому він крутий

## Live Demo
🌐 https://project.example.com

## Features
- ✅ JWT аутентифікація
- ✅ Real-time оновлення (WebSocket)
- ✅ Адаптивний дизайн

## Tech Stack
| Frontend | Backend | Database | DevOps |
|----------|---------|----------|--------|
| React 18 | Django 5 | PostgreSQL | Docker |
| TypeScript | DRF | Redis | GitHub Actions |

## Quick Start
\`\`\`bash
git clone ... && cd project
cp .env.example .env  # заповни змінні
docker compose up -d
\`\`\`

## Screenshots
![Main Page](screenshots/main.png)

## Architecture
\`\`\`
[Nginx] → [Django] → [PostgreSQL]
                   → [Redis] ← [Celery]
\`\`\`</pre>

<h3>Як презентувати</h3>
<ul>
<li><strong>1 хв</strong> — що це і для кого</li>
<li><strong>2 хв</strong> — live demo (основний user flow)</li>
<li><strong>1 хв</strong> — технічне рішення (стек, архітектура)</li>
<li><strong>1 хв</strong> — що складно, що ти навчився</li>
<li><strong>Q&A</strong></li>
</ul>`,
      ru:`<h2>ФИНАЛ: Защита портфолио (3 задеплоенных проекта)</h2>
<p>Финальный урок курса. Ты прошёл путь от HTML/CSS до полноценного fullstack developer с навыками DevOps. Время показать что ты умеешь.</p>

<h3>Что должно быть задеплоено</h3>
<ul>
<li><strong>Проект 1 (Модуль 09)</strong> — Gym Tracker</li>
<li><strong>Проект 2 (Модуль 10)</strong> — Учебная платформа</li>
<li><strong>Проект 3 (Модуль 11)</strong> — E-commerce</li>
</ul>

<h3>Deployment Checklist</h3>
<ul>
<li>✅ HTTPS (Let's Encrypt)</li>
<li>✅ Docker + docker-compose</li>
<li>✅ GitHub Actions CI/CD</li>
<li>✅ Nginx reverse proxy</li>
<li>✅ Переменные среды (не в коде)</li>
<li>✅ Backup БД (cron)</li>
<li>✅ Sentry (отслеживание ошибок)</li>
<li>✅ README с описанием, скриншотами, ссылками</li>
<li>✅ .gitignore</li>
</ul>

<h3>README который впечатляет</h3>
<pre># ProjectName 🚀

> Коротко: что делает проект и почему он крутой

## Live Demo
🌐 https://project.example.com

## Tech Stack
| Frontend | Backend  | Database   | DevOps         |
|----------|----------|------------|----------------|
| React 18 | Django 5 | PostgreSQL | Docker         |
| TypeScript| DRF     | Redis      | GitHub Actions |

## Quick Start
git clone ... && cd project
cp .env.example .env
docker compose up -d</pre>

<h3>Как презентовать</h3>
<ul>
<li><strong>1 мин</strong> — что это и для кого</li>
<li><strong>2 мин</strong> — live demo</li>
<li><strong>1 мин</strong> — техническое решение</li>
<li><strong>1 мин</strong> — что сложно, что научился</li>
</ul>` },
    `<div id="final-app" style="font-family:sans-serif;padding:12px;background:#0f172a;color:#f1f5f9;border-radius:8px">
<h2 style="color:#7c3aed;font-size:15px;margin:0 0 12px">🚀 Deployment Readiness Checker</h2>
<div id="checklist" style="display:grid;gap:6px"></div>
<div style="margin-top:14px;background:#1e293b;border-radius:8px;padding:10px">
  <div style="font-size:12px;color:#64748b;margin-bottom:6px">Готовність проекту:</div>
  <div id="progress-bar" style="height:10px;background:#0f172a;border-radius:5px;overflow:hidden">
    <div id="progress-fill" style="height:100%;background:linear-gradient(90deg,#7c3aed,#818cf8);width:0;transition:.4s"></div>
  </div>
  <div id="score-text" style="margin-top:6px;font-size:12px;color:#94a3b8;text-align:center"></div>
</div>
</div>`,
    `*{box-sizing:border-box}body{margin:0}`,
    `var ITEMS = [
  {label:'HTTPS налаштований (Let\'s Encrypt)',      cat:'security'},
  {label:'Docker + docker-compose',                  cat:'infra'},
  {label:'GitHub Actions CI/CD',                     cat:'cicd'},
  {label:'Nginx reverse proxy',                      cat:'infra'},
  {label:'Змінні середовища (не в коді)',           cat:'security'},
  {label:'Автоматичний backup БД',                   cat:'reliability'},
  {label:'Sentry для відстеження помилок',           cat:'monitoring'},
  {label:'Uptime моніторинг (UptimeRobot)',          cat:'monitoring'},
  {label:'Структурований README',                     cat:'quality'},
  {label:'PostgreSQL + Redis в Docker',              cat:'infra'},
  {label:'Rate limiting на API',                     cat:'security'},
  {label:'Логи (structlog або аналог)',              cat:'monitoring'},
];

var COLORS = {security:'#f87171',infra:'#818cf8',cicd:'#4ade80',reliability:'#fb923c',monitoring:'#34d399',quality:'#f59e0b'};
var checked = {};

function render(){
  var el = document.getElementById('checklist');
  el.innerHTML = ITEMS.map(function(item, i){
    var col = COLORS[item.cat];
    var done = !!checked[i];
    return '<div onclick="toggle('+i+')" style="display:flex;align-items:center;gap:10px;padding:7px 10px;background:'+(done?'rgba(124,58,237,.12)':'#1e293b')+';border:1px solid '+(done?'#7c3aed':'#334155')+';border-radius:7px;cursor:pointer">' +
      '<div style="width:20px;height:20px;border-radius:4px;border:2px solid '+(done?'#7c3aed':'#475569')+';background:'+(done?'#7c3aed':'transparent')+';display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
      (done?'<svg width="12" height="12" viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" stroke="#fff" stroke-width="2" fill="none"/></svg>':'') + '</div>' +
      '<span style="font-size:12px;color:'+(done?'#f1f5f9':'#94a3b8')+'">' + item.label + '</span>' +
      '<span style="margin-left:auto;font-size:10px;color:'+col+';font-weight:600">' + item.cat + '</span>' +
      '</div>';
  }).join('');
  updateScore();
}

function toggle(i){ checked[i] = !checked[i]; render(); }

function updateScore(){
  var n = Object.values(checked).filter(Boolean).length;
  var pct = Math.round(n / ITEMS.length * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  var msg = pct < 50 ? '❌ Не готово до деплою' : pct < 80 ? '⚠️ Майже готово' : pct < 100 ? '✅ Добрий рівень!' : '🎉 ПОВНІСТЮ ГОТОВО!';
  document.getElementById('score-text').innerHTML = '<strong style="color:#c4b5fd">' + pct + '%</strong> ' + msg + ' (' + n + '/' + ITEMS.length + ')';
}
render();`,
    [
      { level:'easy',   uk:'Відкрий Deployment Readiness Checker і чесно відмітити що вже реалізовано у твоїх проектах. Який відсоток готовності? Що потребує найбільше роботи?', ru:'Открой Deployment Readiness Checker и честно отметь что уже реализовано в твоих проектах. Какой процент готовности? Что требует наибольшей работы?' },
      { level:'easy',   uk:'Напиши README для одного зі своїх проектів за структурою з теорії: заголовок, опис, live demo, features, tech stack, quick start. Додай скріншоти.', ru:'Напиши README для одного из своих проектов по структуре из теории: заголовок, описание, live demo, features, tech stack, quick start. Добавь скриншоты.' },
      { level:'medium', uk:'Задеплой перший проект (Gym Tracker) на VPS з повним стеком: Docker, Nginx, HTTPS, .env, GitHub Actions. Посилання має відкриватись і працювати для всіх.', ru:'Задеплой первый проект (Gym Tracker) на VPS с полным стеком: Docker, Nginx, HTTPS, .env, GitHub Actions. Ссылка должна открываться и работать для всех.' },
      { level:'medium', uk:'Налаштуй UptimeRobot для всіх 3 проектів: перевірка кожні 5 хвилин, email-сповіщення при падінні. Підготуй публічну status-сторінку.', ru:'Настрой UptimeRobot для всех 3 проектов: проверка каждые 5 минут, email-уведомление при падении. Подготовь публичную status-страницу.' },
      { level:'hard',   uk:'Задеплой другий проект (Навчальна платформа). Переконайся що WebSocket (Django Channels + Redis) працює через Nginx з правильними заголовками Upgrade/Connection.', ru:'Задеплой второй проект (Учебная платформа). Убедись что WebSocket (Django Channels + Redis) работает через Nginx с правильными заголовками Upgrade/Connection.' },
      { level:'hard',   uk:'Задеплой третій проект (E-commerce). Налаштуй Stripe webhooks у production (ngrok для локальної розробки), перевір що платежі проходять. Додай Sentry для всіх 3 проектів.', ru:'Задеплой третий проект (E-commerce). Настрой Stripe webhooks в production, проверь что платежи проходят. Добавь Sentry для всех 3 проектов.' },
      { level:'extra',  uk:'Підготуй 5-хвилинну презентацію для кожного проекту: проблема → рішення → demo → технічний стек → висновки. Зроби запис screen-cast і завантаж на YouTube/Drive.', ru:'Подготовь 5-минутную презентацию для каждого проекта: проблема → решение → demo → технический стек → выводы. Сделай screen-cast и загрузи на YouTube/Drive.' },
      { level:'extra',  uk:'Оптимізуй Core Web Vitals усіх 3 проектів: LCP < 2.5с, FID < 100мс, CLS < 0.1. Використай PageSpeed Insights та Chrome DevTools. Задокументуй покращення до/після.', ru:'Оптимизируй Core Web Vitals всех 3 проектов: LCP < 2.5с, FID < 100мс, CLS < 0.1. Используй PageSpeed Insights и Chrome DevTools. Задокументируй улучшения до/после.' },
    ],
    '');

})();
