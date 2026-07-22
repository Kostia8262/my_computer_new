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
  minecraft: { name: 'Minecraft', icon: '⛏️', ages: [] },   // coming soon — no app yet
  webdev:    { name: 'Веб-розробка', icon: '🌐', ages: [] }, // coming soon — no app yet
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
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;background:#0f1220;color:#e8e8f0;font-family:'Segoe UI',system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;padding:40px 20px}
  h1{font-size:22px;margin:8px 0 28px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;max-width:720px;width:100%}
  a.tile,.tile{display:flex;flex-direction:column;align-items:center;gap:10px;padding:28px 16px;background:#181c30;border:1px solid #2a2f4a;border-radius:14px;text-decoration:none;color:#e8e8f0;transition:.15s}
  a.tile:hover{border-color:#6c47ff;transform:translateY(-2px)}
  .tile.disabled{opacity:.4;cursor:default}
  .tile .ic{font-size:38px}
  .tile .lb{font-weight:700;font-size:15px}
  .tile .sub{font-size:12px;color:#8a8fb0}
  .back{margin-bottom:18px;color:#8a8fb0;text-decoration:none;font-size:13px;align-self:flex-start;max-width:720px;width:100%}
  .gate{max-width:360px;width:100%;background:#181c30;border:1px solid #2a2f4a;border-radius:16px;padding:32px 26px;margin-top:60px}
  .gate h2{margin:0 0 6px;font-size:19px}
  .gate p{color:#8a8fb0;font-size:13px;margin:0 0 18px}
  .gate input{width:100%;padding:12px 14px;border-radius:9px;border:1px solid #2a2f4a;background:#0f1220;color:#e8e8f0;font-size:14px;margin-bottom:12px}
  .gate button{width:100%;padding:12px;border:none;border-radius:9px;background:#6c47ff;color:#fff;font-weight:700;font-size:14px;cursor:pointer}
  .err{color:#f87171;font-size:13px;margin:-6px 0 12px}
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
        <button type="submit">Увійти</button>
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

module.exports = function setupLessons(app, { requireAdmin, escHtml }) {
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
  app.get('/api/lesson-tokens', requireAdmin, (req, res) => {
    res.json({ success: true, tokens: lessonTokensDb.getAll() });
  });

  app.post('/api/lesson-tokens', requireAdmin, (req, res) => {
    const { clientId, studentName, course, ageTier } = req.body || {};
    if (!COURSES[course]) return res.status(400).json({ error: 'Unknown course' });
    if (!course || !ageTier) return res.status(400).json({ error: 'course and ageTier are required' });
    const rec = lessonTokensDb.create({ clientId, studentName: escHtml(studentName || ''), course, ageTier });
    res.json({ success: true, token: rec, link: `${req.protocol}://${req.get('host')}/lessons?token=${rec.token}` });
  });

  app.patch('/api/lesson-tokens/:id', requireAdmin, (req, res) => {
    const rec = lessonTokensDb.setActive(Number(req.params.id), !!(req.body || {}).active);
    if (!rec) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, token: rec });
  });

  app.delete('/api/lesson-tokens/:id', requireAdmin, (req, res) => {
    const ok = lessonTokensDb.delete(Number(req.params.id));
    res.json({ success: ok });
  });
};
