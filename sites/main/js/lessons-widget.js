/* ══════════════════════════════════════════════════════════════════════════
   Header widget — icon next to "Записатись" that opens an inline dropdown:
   token login → course cards → age-program cards → navigate to the app.
   Self-contained, no dependency on the rest of main.js.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  const btn   = document.getElementById('lessonsWidgetBtn');
  const panel = document.getElementById('lessonsWidgetPanel');
  if (!btn || !panel) return;

  let config = null; // fetched once, cached

  function render(html) { panel.innerHTML = html; }

  function renderLoading() {
    render('<div class="lw-loading">Завантаження…</div>');
  }

  function renderLoginForm(error) {
    render(`
      <div class="lw-login">
        <h4>🔒 Уроки для учнів</h4>
        <p>Введи персональний код доступу</p>
        ${error ? '<div class="lw-err">Код не знайдено або він неактивний</div>' : ''}
        <form id="lwLoginForm">
          <input type="text" id="lwTokenInput" placeholder="Код доступу" autofocus required/>
          <button type="submit">Увійти</button>
        </form>
      </div>`);
    document.getElementById('lwLoginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const tokenVal = document.getElementById('lwTokenInput').value.trim();
      if (!tokenVal) return;
      try {
        const res = await fetch('/api/lessons/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenVal }),
        });
        const data = await res.json();
        if (data.success) { await loadConfigAndRenderCourses(); }
        else { renderLoginForm(true); }
      } catch { renderLoginForm(true); }
    });
  }

  function renderCourses() {
    const tiles = config.courses.map(c => c.enabled
      ? `<button class="lw-tile" data-course="${c.id}"><span class="lw-ic">${c.icon}</span><span class="lw-lb">${c.name}</span></button>`
      : `<div class="lw-tile lw-disabled"><span class="lw-ic">${c.icon}</span><span class="lw-lb">${c.name}</span><span class="lw-sub">незабаром</span></div>`
    ).join('');
    render(`
      <div class="lw-head"><h4>🎓 Обери напрямок</h4><button class="lw-logout" id="lwLogout">Вийти</button></div>
      <div class="lw-grid">${tiles}</div>`);
    panel.querySelectorAll('.lw-tile[data-course]').forEach(t =>
      t.addEventListener('click', () => renderAges(t.dataset.course)));
    document.getElementById('lwLogout').addEventListener('click', async () => {
      await fetch('/api/lessons/logout', { method: 'POST' });
      renderLoginForm(false);
    });
  }

  function renderAges(courseId) {
    const course = config.courses.find(c => c.id === courseId);
    if (!course) return;
    const tiles = course.ages.map(a =>
      `<a class="lw-tile" href="/lessons/${courseId}/${a.id}/"><span class="lw-ic">${course.icon}</span><span class="lw-lb">${a.label}</span></a>`
    ).join('');
    render(`
      <div class="lw-head"><button class="lw-back" id="lwBack">← Назад</button></div>
      <h4 class="lw-subtitle">${course.icon} ${course.name} — обери вік</h4>
      <div class="lw-grid">${tiles}</div>`);
    document.getElementById('lwBack').addEventListener('click', renderCourses);
  }

  async function loadConfigAndRenderCourses() {
    if (!config) {
      const res = await fetch('/api/lessons/config');
      config = await res.json();
    }
    renderCourses();
  }

  async function openPanel() {
    panel.hidden = false;
    renderLoading();
    try {
      const res = await fetch('/api/lessons/session');
      const data = await res.json();
      if (data.authenticated) await loadConfigAndRenderCourses();
      else renderLoginForm(false);
    } catch { renderLoginForm(false); }
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panel.hidden) openPanel(); else panel.hidden = true;
  });
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) panel.hidden = true;
  });
})();
