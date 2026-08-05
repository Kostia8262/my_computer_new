'use strict';
/** ФАЗА 4 — связи между вкладками: что подтягивается, что рассинхронизируется, что остаётся сиротой. */

const { get, post, patch, put, del, check, eq, group, summary, saveReport, SUPER, openDb, uniq } = require('./lib');
const T = require('./tokens.json');
const path = require('path');

const ADMIN = T.administrator;
const db = openDb('main');
const row = (sql, ...a) => db.prepare(sql).get(...a);
const all = (sql, ...a) => db.prepare(sql).all(...a);
const YM = '2099-04';

(async () => {
  // ══════════ 4.1 Заявка → Клиент ══════════
  group('4.1 Заявка → Клиент');
  const leadName = 'ТЕСТ Конверсія ' + uniq();
  const lead = await post('/api/leads/admin', {
    child_name: leadName, phone: '0631112233', age: 11, course: 'python', teacher: 'Богдан Коваль',
  }, { token: ADMIN });
  const lid = lead.json?.lead?.id;

  await patch(`/api/leads/${lid}`, { status: 'enrolled' }, { token: ADMIN });
  const born = row('SELECT * FROM clients WHERE source_lead_id=?', lid);
  check('Заявка со статусом «Записаний» создаёт клиента', !!born, '', 'blocker');
  eq('Имя перенесено в клиента', born?.name, leadName, 'high');
  eq('Телефон перенесён', born?.phone, '0631112233', 'high');
  eq('Курс перенесён', born?.course, 'python', 'high');
  eq('Преподаватель перенесён', born?.teacher, 'Богдан Коваль', 'high');
  const cid = born?.id;

  // Повторный перевод в тот же статус не должен плодить дубли
  await patch(`/api/leads/${lid}`, { status: 'contacted' }, { token: ADMIN });
  await patch(`/api/leads/${lid}`, { status: 'enrolled' }, { token: ADMIN });
  const clones = all('SELECT id FROM clients WHERE source_lead_id=?', lid);
  eq('Повторная запись не создаёт второго клиента', clones.length, 1, 'high');

  // ══════════ 4.2 Переименование заявки → клиент ══════════
  group('4.2 Синхронизация заявка ↔ клиент');
  const newName = 'ТЕСТ Перейменовано ' + uniq();
  await patch(`/api/leads/${lid}`, { child_name: newName }, { token: ADMIN });
  eq('Переименование заявки меняет имя клиента', row('SELECT name FROM clients WHERE id=?', cid)?.name, newName, 'high');

  const clientName2 = 'ТЕСТ ЗворотняСинх ' + uniq();
  await patch(`/api/clients/${cid}`, { name: clientName2 }, { token: ADMIN });
  eq('Переименование клиента меняет имя заявки', row('SELECT child_name FROM leads WHERE id=?', lid)?.child_name, clientName2, 'high');

  // ══════════ 4.3 Клиент → месячные оплаты ══════════
  group('4.3 Клиент → Оплаты');
  await post(`/api/monthly-payments/${YM}`, {
    records: [{ clientId: cid, clientName: clientName2, expectedAmount: 3600, paidAmount: 0, status: 'pending' }],
  }, { token: ADMIN });
  const clientName3 = 'ТЕСТ СинхОплат ' + uniq();
  await patch(`/api/clients/${cid}`, { name: clientName3 }, { token: ADMIN });
  eq('Переименование клиента обновляет имя в оплатах',
    row('SELECT client_name FROM monthly_payments WHERE ym=? AND client_id=?', YM, cid)?.client_name, clientName3, 'high');

  // Абонплата клиента → ожидаемая сумма в новом месяце
  await patch(`/api/clients/${cid}`, { monthlyFee: 4500 }, { token: ADMIN });
  const nextYM = '2099-05';
  await post(`/api/monthly-payments/${nextYM}`, { records: [{ clientId: cid, clientName: clientName3 }] }, { token: ADMIN });
  const expected = row('SELECT expected_amount FROM monthly_payments WHERE ym=? AND client_id=?', nextYM, cid)?.expected_amount;
  check('Абонплата клиента подтягивается в ожидаемую сумму месяца', expected === 4500,
    `в карточке клиента 4500, в месяце ${nextYM} записано ${expected} — суммы приходится вбивать вручную`, 'medium');

  // ══════════ 4.4 Платёж → итог по клиенту ══════════
  group('4.4 Платёж → Итог клиента');
  await post('/api/payments', { clientId: cid, amount: 1000, method: 'cash' }, { token: ADMIN });
  await post('/api/payments', { clientId: cid, amount: 500, method: 'card' }, { token: ADMIN });
  eq('Сумма оплат пересчитывается в карточке клиента', row('SELECT total_paid FROM clients WHERE id=?', cid)?.total_paid, 1500, 'high');
  const pays = await get(`/api/payments?clientId=${cid}`, { token: ADMIN });
  eq('Платежи клиента фильтруются по нему', (pays.json?.payments || []).length, 2, 'high');
  const firstPay = pays.json.payments[0].id;
  await del(`/api/payments/${firstPay}`, { token: ADMIN });
  eq('Удаление платежа уменьшает итог', row('SELECT total_paid FROM clients WHERE id=?', cid)?.total_paid, 1000, 'high');

  // ══════════ 4.5 Преподаватель → клиенты, зарплата, календарь ══════════
  group('4.5 Преподаватель ↔ клиенты');
  const tName = 'ТЕСТ Викладач ' + uniq();
  const teacher = await post('/api/admins', { name: tName, role: 'teacher' }, { token: SUPER });
  const tid = teacher.json?.admin?.id;
  await patch(`/api/admins/${tid}/profile`, { hourlyRate: 200, lessonDuration: 60 }, { token: SUPER });

  // Клиент этого преподавателя, 4 занятия в неделю по понедельникам
  const st = await post('/api/clients', {
    name: 'ТЕСТ Учень Викладача', phone: '0509998877', status: 'active', teacher: tName,
    scheduleDays: [{ day: 1, time: '15:00' }],
  }, { token: ADMIN });
  const stid = st.json?.client?.id;

  const teachers = await get('/api/teachers', { token: ADMIN });
  check('Новый преподаватель появляется в списке для выбора',
    (teachers.json?.teachers || []).some(x => x.name === tName), '', 'high');

  // Проводим 3 занятия
  for (const d of ['2099-04-06', '2099-04-13', '2099-04-20']) {
    await post('/api/attendance', { clientId: stid, date: d, status: 'present' }, { token: ADMIN });
  }
  const sal = await get(`/api/admins/${tid}/salary?ym=2099-04`, { token: SUPER });
  eq('Зарплата считает проведённые занятия', sal.json?.totalConducted, 3, 'high');
  eq('Сумма зарплаты = занятия × ставка', sal.json?.totalSalary, 600, 'high');
  check('В расшифровке зарплаты есть ученик',
    (sal.json?.breakdown || []).some(b => b.clientId === stid), JSON.stringify(sal.json?.breakdown), 'medium');

  const cal = await get(`/api/admins/${tid}/attendance-calendar?ym=2099-04`, { token: SUPER });
  check('Календарь преподавателя показывает отмеченные дни',
    Object.keys(cal.json?.days || {}).length === 3, JSON.stringify(cal.json?.days), 'medium');

  // ⚠ Ключевая проверка: переименование преподавателя
  const tNameNew = tName + ' (заміжня)';
  await patch(`/api/admins/${tid}/profile`, { name: tNameNew }, { token: SUPER });
  const stAfter = row('SELECT teacher FROM clients WHERE id=?', stid)?.teacher;
  check('Переименование преподавателя сохраняет связь с учениками',
    stAfter === tNameNew,
    `в карточке сотрудника теперь "${tNameNew}", а у ученика осталось "${stAfter}" — связь ведётся по строке имени`, 'high');
  const salAfter = await get(`/api/admins/${tid}/salary?ym=2099-04`, { token: SUPER });
  check('Зарплата не обнуляется после переименования преподавателя',
    salAfter.json?.totalSalary === 600,
    `до переименования 600 грн, после — ${salAfter.json?.totalSalary} грн`, 'high');

  // Удаление преподавателя
  await del(`/api/admins/${tid}`, { token: SUPER });
  const orphanTeacher = row('SELECT teacher FROM clients WHERE id=?', stid)?.teacher;
  check('Удаление сотрудника не оставляет учеников с несуществующим преподавателем',
    !orphanTeacher,
    `у ученика #${stid} остался преподаватель "${orphanTeacher}", которого больше нет в системе`, 'medium');

  // ══════════ 4.6 Удаление клиента → сироты ══════════
  group('4.6 Сироты после удаления клиента');
  const victim = await post('/api/clients', { name: 'ТЕСТ Сирота ' + uniq(), phone: '0501010101' }, { token: ADMIN });
  const vid = victim.json?.client?.id;
  await post('/api/payments', { clientId: vid, amount: 999, method: 'cash' }, { token: ADMIN });
  await post('/api/attendance', { clientId: vid, date: '2099-04-07', status: 'present' }, { token: ADMIN });
  await post(`/api/monthly-payments/${YM}`, { records: [] }, { token: ADMIN });
  await put(`/api/monthly-payments/${YM}/${vid}`, { expectedAmount: 3600, paidAmount: 3600, status: 'paid' }, { token: ADMIN });
  const lt = await post('/api/lesson-tokens', { clientId: vid, studentName: 'ТЕСТ Сирота' }, { token: ADMIN });

  await del(`/api/clients/${vid}`, { token: SUPER });
  check('Клиент удалён', !row('SELECT 1 FROM clients WHERE id=?', vid), '', 'high');
  check('Токен уроков удалённого ученика отозван',
    !row('SELECT 1 FROM lesson_tokens WHERE client_id=? AND active=1', vid), '', 'high');
  check('Платежи удалённого клиента не остаются сиротами',
    !row('SELECT 1 FROM payments WHERE client_id=?', vid),
    `в таблице payments остались записи клиента #${vid}, которого больше нет — они попадают в сводки по деньгам`, 'high');
  check('Посещаемость удалённого клиента не остаётся сиротой',
    !row('SELECT 1 FROM attendance WHERE client_id=?', vid),
    `в таблице attendance остались отметки клиента #${vid}`, 'medium');
  check('Месячные оплаты удалённого клиента не остаются сиротами',
    !row('SELECT 1 FROM monthly_payments WHERE client_id=?', vid),
    `в monthly_payments осталась запись клиента #${vid} на сумму 3600 — она продолжает считаться в итогах месяца`, 'high');

  // ══════════ 4.7 Курс → клиенты, заявки, сайт ══════════
  group('4.7 Курс ↔ клиенты и сайт');
  const cslug = 'test-link-' + uniq().toLowerCase();
  await post('/api/courses', { id: cslug, name: 'ТЕСТ Зв\'язок', price: 3000, active: true }, { token: ADMIN });
  const cWithCourse = await post('/api/clients', { name: 'ТЕСТ КурсКлієнт', course: cslug, phone: '0502020202' }, { token: ADMIN });
  const ccid = cWithCourse.json?.client?.id;
  const delUsed = await del(`/api/courses/${cslug}`, { token: SUPER });
  check('Курс с закреплёнными учениками не удаляется молча',
    delUsed.status === 409,
    `получен ${delUsed.status}: курс удалён, у клиента #${ccid} остался несуществующий курс "${cslug}"`, 'medium');
  check('Отказ объясняет, сколько учеников мешает удалению',
    (delUsed.json?.usedByClients ?? 0) === 1,
    `в ответе usedByClients=${delUsed.json?.usedByClients}`, 'low');
  // После открепления ученика курс должен удаляться нормально
  await del(`/api/clients/${ccid}`, { token: SUPER });
  const delFree = await del(`/api/courses/${cslug}`, { token: SUPER });
  check('Курс без учеников удаляется', delFree.status === 200, `получен ${delFree.status}`, 'medium');

  // ══════════ 4.8 Оповещения (дашборд) ══════════
  group('4.8 Оповещения и дашборд');
  const alerts = await get('/api/alerts', { token: ADMIN });
  eq('Оповещения отдаются', alerts.status, 200, 'high');
  check('Каждое оповещение указывает вкладку для перехода',
    (alerts.json?.alerts || []).every(a => !a.tab || typeof a.tab === 'string'),
    JSON.stringify(alerts.json?.alerts || []).slice(0, 300), 'low');

  // ══════════ 4.9 Расписание ══════════
  group('4.9 Расписание');
  const schedClient = await post('/api/clients', {
    name: 'ТЕСТ Розклад', phone: '0503030303', status: 'active', teacher: 'Богдан Коваль',
    scheduleDays: [{ day: 2, time: '16:00' }, { day: 4, time: '16:00' }],
  }, { token: ADMIN });
  const scid = schedClient.json?.client?.id;
  const back = await get('/api/clients', { token: ADMIN });
  const fetched = (back.json?.clients || []).find(x => x.id === scid);
  check('Расписание из двух дней читается обратно целиком',
    JSON.stringify(fetched?.scheduleDays) === JSON.stringify([{ day: 2, time: '16:00' }, { day: 4, time: '16:00' }]),
    JSON.stringify(fetched?.scheduleDays), 'high');

  const today = await get('/api/admins/teaching-today', { token: SUPER });
  eq('Сводка «кто ведёт сегодня» отвечает', today.status, 200, 'medium');

  await del(`/api/clients/${scid}`, { token: SUPER });
  await del(`/api/clients/${stid}`, { token: SUPER });
  await del(`/api/clients/${cid}`, { token: SUPER });
  await del(`/api/leads/${lid}`, { token: SUPER });

  summary('ФАЗА 4 — связи между вкладками');
  saveReport(path.join(__dirname, 'report-phase4.json'));
})();
