'use strict';
/**
 * ФАЗА 9 — доставка заявок с лендингов в общую CRM.
 * Шлём в главную панель ровно тот запрос, который формирует каждый лендинг,
 * и проверяем, что заявка появляется с правильной пометкой источника.
 * Все тестовые заявки удаляются в конце.
 */

const { get, post, del, check, eq, group, summary, saveReport, SUPER, openDb, uniq, SITES_DIR } = require('./lib');
const path = require('path');

// Ровно то, что каждый лендинг кладёт в тело запроса (см. его server.js)
const LANDINGS = [
  ['mycomputer.school',               'Дизайн (лендинг)'],
  ['webdesign.mycomputer.education',  'Веб-дизайн (лендинг)'],
  ['python.mycomputer.education',     'Python (лендинг)'],
  ['minecraft.mycomputer.education',  'Minecraft (лендинг)'],
  ['roblox.mycomputer.education',     'Roblox (лендинг)'],
  ['frontend.mycomputer.education',   'Frontend (лендинг)'],
  ['construct.mycomputer.education',  'Construct (лендинг)'],
  ['scratch.mycomputer.education',    'Scratch (лендинг)'],
  ['blog.mycomputer.school',          'Блог (лендинг)'],
  ['digitalart.mycomputer.school',    'Digital Art (лендинг)'],
  ['branding.mycomputer.school',      'Брендинг (лендинг)'],
  ['animation.mycomputer.school',     'Анімація (лендинг)'],
  ['blender.mycomputer.school',       'Blender (лендинг)'],
  ['3dsmax.mycomputer.school',        '3ds Max (лендинг)'],
  ['ai-design.mycomputer.school',     'AI-дизайн (лендинг)'],
];

const db = openDb('main');
const created = [];

(async () => {
  group('9.1 Заявка с каждого лендинга доходит до CRM');
  let i = 0;
  for (const [domain, courseLabel] of LANDINGS) {
    i++;
    const name = `ТЕСТ ДОСТАВКИ ${domain}`;
    const phone = `+38050${String(9000000 + i)}`;

    // Тело запроса — копия того, что шлёт лендинг
    const r = await post('/api/leads/admin', {
      child_name: name,
      age: 10,
      course: courseLabel,
      phone,
      email: null,
      source: domain,
      notes: `Заявка з ${domain}`,
    }, { token: SUPER });

    const id = r.json?.lead?.id;
    if (id) created.push(id);

    check(`[${domain}] заявка принята CRM`, r.status === 201, `ответ ${r.status}: ${r.text.slice(0, 120)}`, 'blocker');
    if (!id) continue;

    const row = db.prepare('SELECT child_name, phone, source, notes, course FROM leads WHERE id=?').get(id);
    eq(`[${domain}] источник сохранён как домен`, row?.source, domain, 'blocker');
    check(`[${domain}] в заметке указан лендинг`, String(row?.notes || '').includes(domain),
      `в базе: "${row?.notes}"`, 'high');
    eq(`[${domain}] телефон сохранён`, row?.phone, phone, 'high');
    check(`[${domain}] курс сохранён`, !!row?.course, `курс: "${row?.course}"`, 'medium');
  }

  group('9.2 Заявки видны в общем списке');
  const list = await get('/api/leads', { token: SUPER });
  for (const [domain] of LANDINGS) {
    const found = (list.json?.leads || []).find(l => l.source === domain && String(l.child_name).startsWith('ТЕСТ ДОСТАВКИ'));
    check(`[${domain}] видна в списке заявок с источником`, !!found, 'в выдаче /api/leads не найдена', 'blocker');
  }

  group('9.3 Источник различим для администратора');
  const fs = require('fs');
  const adminHtml = fs.readFileSync(path.join(SITES_DIR, 'main', 'admin.html'), 'utf8');
  const labelsBlock = (adminHtml.match(/const SOURCE_LABELS = \{[\s\S]*?\};/) || [''])[0];
  for (const [domain] of LANDINGS) {
    check(`[${domain}] есть человекочитаемая подпись в панели`, labelsBlock.includes(domain),
      'домен не описан в SOURCE_LABELS — администратору покажется сырой адрес', 'medium');
  }

  group('9.4 Уборка');
  let removed = 0;
  for (const id of created) {
    const r = await del(`/api/leads/${id}`, { token: SUPER });
    if (r.status === 200) removed++;
  }
  eq('Все тестовые заявки удалены', removed, created.length, 'high');
  const left = db.prepare("SELECT COUNT(*) n FROM leads WHERE child_name LIKE 'ТЕСТ ДОСТАВКИ%'").get().n;
  eq('В базе не осталось тестовых заявок', left, 0, 'high');

  summary('ФАЗА 9 — доставка заявок с лендингов');
  saveReport(path.join(__dirname, 'report-phase9.json'));
})();
