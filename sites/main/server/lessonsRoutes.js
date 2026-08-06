'use strict';

const path = require('path');
const express = require('express');
const lessonTokensDb = require('./lessonTokens');

const COOKIE_NAME = 'lt';
const COOKIE_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000; // 180 days

// Registry of lesson "directions" — course id -> metadata + which age tiers
// have a real app wired up. Adding a new direction later (Minecraft, web-dev)
// is just one more entry here plus its static folder under lessons/<id>/.
const COURSES = {
  python: {
    name: 'Python',
    icon: '🐍',
    ages: [
      { id: '6-10', label: '6–10 років' },
      { id: '10-14', label: '10–14 років' },
      { id: '14-18', label: '14–18 років' },
    ],
  },
  // Minecraft's app has its own internal 8-10/10-14 track switcher built in
  // (one build covers both), so there's a single "all" tier here rather than
  // separate folders per age like the other two directions.
  minecraft: {
    name: 'Minecraft',
    icon: '⛏️',
    ages: [
      { id: 'all', label: '8–14 років' },
    ],
  },
  webdev: {
    name: 'Веб-розробка',
    icon: '🌐',
    ages: [
      { id: '8-11', label: '8–11 років — Веб-Старт' },
      { id: '10-14', label: '10–14 років — Веб-Розробник' },
      { id: '14-18', label: '14–18 років — Фулстек-Про' },
    ],
  },
};

function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) return {};
  const out = {};
  header.split(';').forEach(pair => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    out[decodeURIComponent(pair.slice(0, idx).trim())] = decodeURIComponent(pair.slice(idx + 1).trim());
  });
  return out;
}

function pageShell(title, bodyHtml) {
  return `<!doctype html>
<html lang="uk"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} — My Computer Academy</title>
<meta name="robots" content="noindex, nofollow"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
<style>
  /* Страница отдаётся сервером и css/style.css не подключает. Брендовые токены
     и правила .btn* скопированы из css/style.css — правишь дизайн-систему,
     синхронизируй здесь. Тёмная палитра приложения уроков своя (--lessons-*). */
  :root{
    --color-primary:#6C47FF; --color-primary-dark:#5533EE; --color-primary-rgb:108,71,255;
    --color-white:#FFFFFF;
    --font:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
    --r-md:12px; --r-14:14px; --r-lg:16px; --r-full:9999px;
    --t:.2s ease;
    --fw-semibold:600; --fw-bold:700;
    --fs-12:12px; --fs-13:13px; --fs-14:14px; --fs-15:15px; --fs-22:22px;
    --fs-19:19px;                                 /* нет в style.css: заголовок карточки входа */
    --lessons-bg:#0F1220; --lessons-surface:#181C30; --lessons-border:#2A2F4A;
    --lessons-text:#E8E8F0; --lessons-text-2:#8A8FB0; --lessons-error:#F87171;
  }
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;background:var(--lessons-bg);color:var(--lessons-text);font-family:var(--font);display:flex;flex-direction:column;align-items:center;padding:40px 20px}
  h1{font-size:var(--fs-22);margin:8px 0 28px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;max-width:720px;width:100%}
  a.tile,.tile{display:flex;flex-direction:column;align-items:center;gap:10px;padding:28px 16px;background:var(--lessons-surface);border:1px solid var(--lessons-border);border-radius:var(--r-14);text-decoration:none;color:var(--lessons-text);transition:all var(--t)}
  a.tile:hover{border-color:var(--color-primary);transform:translateY(-2px)}
  .tile.disabled{opacity:.4;cursor:default}
  .tile .ic{font-size:38px}
  .tile .lb{font-weight:var(--fw-bold);font-size:var(--fs-15)}
  .tile .sub{font-size:var(--fs-12);color:var(--lessons-text-2)}
  .back{margin-bottom:18px;color:var(--lessons-text-2);text-decoration:none;font-size:var(--fs-13);align-self:flex-start;max-width:720px;width:100%}
  .gate{max-width:360px;width:100%;background:var(--lessons-surface);border:1px solid var(--lessons-border);border-radius:var(--r-lg);padding:32px 26px;margin-top:60px}
  .gate h2{margin:0 0 6px;font-size:var(--fs-19)}
  .gate p{color:var(--lessons-text-2);font-size:var(--fs-13);margin:0 0 18px}
  .gate input{width:100%;padding:12px 14px;border-radius:var(--r-md);border:1px solid var(--lessons-border);background:var(--lessons-bg);color:var(--lessons-text);font-family:var(--font);font-size:var(--fs-14);margin-bottom:12px}
  /* общая кнопка сайта — .btn / .btn--sm / .btn--full / .btn--primary */
  .btn{display:inline-flex;align-items:center;gap:8px;font-family:var(--font);font-weight:var(--fw-semibold);border:none;cursor:pointer;transition:all var(--t);text-decoration:none;white-space:nowrap;border-radius:var(--r-full)}
  .btn--sm{font-size:var(--fs-14);padding:10px 20px;min-height:44px}
  .btn--full{width:100%;justify-content:center;border-radius:var(--r-md)}
  .btn--primary{background:var(--color-primary);color:var(--color-white);box-shadow:0 4px 14px rgba(var(--color-primary-rgb),.4)}
  .btn--primary:hover{background:var(--color-primary-dark);box-shadow:0 6px 20px rgba(var(--color-primary-rgb),.5);transform:translateY(-1px)}
  .err{color:var(--lessons-error);font-size:var(--fs-13);margin:-6px 0 12px}
</style></head><body>${bodyHtml}</body></html>`;
}

function gatePage(error) {
  return pageShell('Уроки', `
    <div class="gate">
      <h2>🔒 Уроки для учнів</h2>
      <p>Введи персональний код доступу, який отримав від академії.</p>
      ${error ? '<div class="err">Код не знайдено або він неактивний.</div>' : ''}
      <form method="get" action="/lessons">
        <input type="text" name="token" placeholder="Код доступу" autofocus required />
        <button type="submit" class="btn btn--sm btn--full btn--primary">Увійти</button>
      </form>
    </div>`);
}

function directionsPage() {
  const tiles = Object.entries(COURSES).map(([id, c]) => {
    const enabled = c.ages.length > 0;
    return enabled
      ? `<a class="tile" href="/lessons/${id}"><span class="ic">${c.icon}</span><span class="lb">${c.name}</span></a>`
      : `<div class="tile disabled"><span class="ic">${c.icon}</span><span class="lb">${c.name}</span><span class="sub">незабаром</span></div>`;
  }).join('');
  return pageShell('Уроки', `<h1>🎓 Обери напрямок</h1><div class="grid">${tiles}</div>`);
}

function agesPage(courseId, course) {
  const tiles = course.ages.map(a =>
    `<a class="tile" href="/lessons/${courseId}/${a.id}/"><span class="ic">${course.icon}</span><span class="lb">${a.label}</span></a>`
  ).join('');
  return pageShell(course.name, `<a class="back" href="/lessons">← Усі напрямки</a><h1>${course.icon} ${course.name} — обери вік</h1><div class="grid">${tiles}</div>`);
}

module.exports = function setupLessons(app, { requireAdmin, requireNotTeacher, escHtml }) {
  // ── Auth gate — mounted before any /lessons static/page route ───────────
  app.use('/lessons', (req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    const queryToken = typeof req.query.token === 'string' ? req.query.token.trim() : '';
    if (queryToken) {
      const rec = lessonTokensDb.getByToken(queryToken);
      if (rec && rec.active) {
        lessonTokensDb.touch(queryToken);
        res.cookie(COOKIE_NAME, queryToken, {
          httpOnly: true, secure: true, sameSite: 'lax', maxAge: COOKIE_MAX_AGE_MS,
        });
        // req.path is relative to the /lessons mount point (Express strips
        // the mount prefix inside app.use('/lessons', ...)) — req.originalUrl
        // is not, so it's the only reliable source for "the real path the
        // browser asked for" here. Using req.path by mistake redirects to
        // the SITE ROOT instead of back to /lessons — caught via live testing
        // on dev, not by reading the code.
        return res.redirect(302, req.originalUrl.split('?')[0]);
      }
      return res.status(401).send(gatePage(true));
    }

    const cookieToken = parseCookies(req)[COOKIE_NAME];
    const rec = cookieToken ? lessonTokensDb.getByToken(cookieToken) : null;
    if (!rec || !rec.active) return res.status(401).send(gatePage(false));

    lessonTokensDb.touch(cookieToken);
    next();
  });

  // ── Public JSON API for the header widget (AJAX, no full-page nav) ──────
  app.get('/api/lessons/config', (req, res) => {
    res.json({
      courses: Object.entries(COURSES).map(([id, c]) => ({
        id, name: c.name, icon: c.icon, enabled: c.ages.length > 0, ages: c.ages,
      })),
    });
  });

  app.get('/api/lessons/session', (req, res) => {
    const cookieToken = parseCookies(req)[COOKIE_NAME];
    const rec = cookieToken ? lessonTokensDb.getByToken(cookieToken) : null;
    const ok = !!(rec && rec.active);
    res.json({ authenticated: ok, studentName: ok ? rec.studentName : null });
  });

  app.post('/api/lessons/login', (req, res) => {
    const tokenVal = String((req.body || {}).token || '').trim();
    const rec = tokenVal ? lessonTokensDb.getByToken(tokenVal) : null;
    if (!rec || !rec.active) return res.status(401).json({ success: false, error: 'invalid_token' });
    lessonTokensDb.touch(tokenVal);
    res.cookie(COOKIE_NAME, tokenVal, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: COOKIE_MAX_AGE_MS });
    res.json({ success: true });
  });

  app.post('/api/lessons/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.json({ success: true });
  });

  // ── Direction / age pickers (full-page, still reachable via a direct/emailed link) ──
  app.get('/lessons', (req, res) => res.send(directionsPage()));

  app.get('/lessons/:course', (req, res) => {
    const course = COURSES[req.params.course];
    if (!course || course.ages.length === 0) return res.status(404).send(pageShell('Не знайдено', '<h1>Напрямок не знайдено</h1>'));
    res.send(agesPage(req.params.course, course));
  });

  // ── Static app bundles ───────────────────────────────────────────────────
  // maxAge: these bundles (largest ~1.3MB, the full curriculum for one age
  // tier) had no cache headers at all — every lesson click re-validated with
  // the server. A day is enough to skip that during a session without
  // needing any invalidation scheme for content that changes rarely.
  Object.entries(COURSES).forEach(([id, c]) => {
    c.ages.forEach(a => {
      app.use(`/lessons/${id}/${a.id}`, express.static(path.join(__dirname, '..', 'lessons', id, a.id), { maxAge: '1d' }));
    });
  });

  // ── Admin: issue / list / revoke student tokens ──────────────────────────
  // Every route here carries requireNotTeacher of its own — these are
  // registered above the global /api teacher guard, so that guard never runs
  // for them.
  app.get('/api/lesson-tokens', requireAdmin, requireNotTeacher, (req, res) => {
    res.json({ success: true, tokens: lessonTokensDb.getAll() });
  });

  // course/ageTier are no longer asked for at issue time — the token itself
  // never restricted access to a specific one (the gate only checks
  // active/valid, the picker always shows every enabled direction), so
  // requiring an upfront choice was just friction. Kept as internal
  // bookkeeping defaults only, not shown or asked in the admin UI anymore.
  app.post('/api/lesson-tokens', requireAdmin, requireNotTeacher, (req, res) => {
    const { clientId, studentName } = req.body || {};
    if (!studentName || !String(studentName).trim()) return res.status(400).json({ error: 'studentName is required' });
    const rec = lessonTokensDb.create({
      clientId, studentName: escHtml(studentName.trim()),
      course: 'python', ageTier: 'all',
    });
    res.json({ success: true, token: rec, link: `${req.protocol}://${req.get('host')}/lessons?token=${rec.token}` });
  });

  app.patch('/api/lesson-tokens/:id', requireAdmin, requireNotTeacher, (req, res) => {
    const rec = lessonTokensDb.setActive(Number(req.params.id), !!(req.body || {}).active);
    if (!rec) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, token: rec });
  });

  app.delete('/api/lesson-tokens/:id', requireAdmin, requireNotTeacher, (req, res) => {
    const ok = lessonTokensDb.delete(Number(req.params.id));
    res.json({ success: ok });
  });
};
