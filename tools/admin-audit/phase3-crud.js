'use strict';
/** ФАЗА 3 — CRUD и валидация по каждой сущности. Проверяет и ответ API, и запись в БД. */

const { get, post, patch, put, del, check, eq, group, summary, saveReport, SUPER, openDb, uniq } = require('./lib');
const T = require('./tokens.json');
const path = require('path');

const ADMIN = T.administrator;
const db = openDb('main');
const row = (sql, ...a) => db.prepare(sql).get(...a);
const YM = '2099-03';

(async () => {
  // ══════════ КЛИЕНТЫ ══════════
  group('3.1 Клиенты');
  const cName = 'ТЕСТ Клієнт ' + uniq();
  const c = await post('/api/clients', {
    name: cName, age: 12, course: 'python', phone: '0501112233', email: 'a@b.ua',
    status: 'active', source: 'referral', monthlyFee: 3600, city: 'Дніпро',
    scheduleDays: [{ day: 1, time: '15:00' }], lessonType: 'individual',
  }, { token: ADMIN });
  const cid = c.json?.client?.id;
  eq('Клиент создаётся', c.status, 201, 'blocker');
  check('Клиент попал в БД', !!row('SELECT 1 FROM clients WHERE id=?', cid), '', 'blocker');
  eq('Статус сохранён', c.json?.client?.status, 'active', 'high');
  eq('Тип занятия сохранён', c.json?.client?.lessonType, 'individual', 'high');
  check('Дни расписания сохранены', JSON.stringify(c.json?.client?.scheduleDays) === JSON.stringify([{ day: 1, time: '15:00' }]),
    JSON.stringify(c.json?.client?.scheduleDays), 'high');

  const cList = await get('/api/clients', { token: ADMIN });
  check('Клиент виден в списке', (cList.json?.clients || []).some(x => x.id === cid), '', 'blocker');

  const cUpd = await patch(`/api/clients/${cid}`, { notes: 'оновлено', monthlyFee: 4200 }, { token: ADMIN });
  eq('Клиент обновляется', cUpd.status, 200, 'blocker');
  eq('Заметка сохранена в БД', row('SELECT notes FROM clients WHERE id=?', cid)?.notes, 'оновлено', 'blocker');
  eq('Частичный PATCH не затёр имя', row('SELECT name FROM clients WHERE id=?', cid)?.name, cName, 'blocker');

  // Невалидный статус — API отвечает 200, но значение молча не меняется
  const badStatus = await patch(`/api/clients/${cid}`, { status: 'НЕСУЩЕСТВУЮЩИЙ' }, { token: ADMIN });
  const afterBad = row('SELECT status FROM clients WHERE id=?', cid)?.status;
  check('Невалидный статус клиента отклоняется явной ошибкой',
    badStatus.status === 400,
    `API вернул ${badStatus.status}, в БД осталось "${afterBad}" — интерфейс считает, что сохранилось`, 'medium');

  // Длинный текст: заметка в пределах лимита сохраняется целиком,
  // а превышение отклоняется явной ошибкой, а не режется молча.
  const longNote = 'я'.repeat(900);
  await patch(`/api/clients/${cid}`, { notes: longNote }, { token: ADMIN });
  const savedNote = row('SELECT notes FROM clients WHERE id=?', cid)?.notes || '';
  check('Длинная заметка клиента не обрезается молча',
    savedNote.length === 900,
    `отправлено 900 символов, сохранено ${savedNote.length} — остальное потеряно без предупреждения`, 'high');

  const hugeNote = 'я'.repeat(6000);
  const hugeRes = await patch(`/api/clients/${cid}`, { notes: hugeNote }, { token: ADMIN });
  const afterHuge = row('SELECT notes FROM clients WHERE id=?', cid)?.notes || '';
  check('Заметка сверх лимита отклоняется, а не режется',
    hugeRes.status === 400 && afterHuge.length === 900,
    `ответ ${hugeRes.status}, в БД теперь ${afterHuge.length} символов`, 'high');

  const leadLong = await post('/api/leads/admin', {
    child_name: 'ТЕСТ Довга нотатка', phone: '0671119999', notes: 'я'.repeat(6000),
  }, { token: ADMIN });
  check('Слишком длинная заметка заявки отклоняется', leadLong.status === 400,
    `получен ${leadLong.status}`, 'high');
  if (leadLong.json?.lead?.id) await del(`/api/leads/${leadLong.json.lead.id}`, { token: SUPER });

  // Обязательные поля
  const noName = await post('/api/clients', { name: '' }, { token: ADMIN });
  eq('Клиент без имени отклонён', noName.status, 400, 'high');
  const shortName = await post('/api/clients', { name: 'Я' }, { token: ADMIN });
  eq('Клиент с однобуквенным именем отклонён', shortName.status, 400, 'medium');

  // Телефон не проверяется вообще
  const badPhone = await post('/api/clients', { name: 'ТЕСТ Телефон', phone: 'не телефон' }, { token: ADMIN });
  check('Некорректный телефон клиента отклоняется', badPhone.status === 400,
    `создан клиент с телефоном "не телефон" (id=${badPhone.json?.client?.id})`, 'medium');
  if (badPhone.json?.client?.id) await del(`/api/clients/${badPhone.json.client.id}`, { token: SUPER });

  // Отрицательная сумма
  const negFee = await post('/api/clients', { name: 'ТЕСТ Мінус', monthlyFee: -5000 }, { token: ADMIN });
  check('Отрицательная абонплата отклоняется',
    negFee.status === 400 || negFee.json?.client?.monthlyFee >= 0,
    `сохранено monthlyFee=${negFee.json?.client?.monthlyFee}`, 'medium');
  if (negFee.json?.client?.id) await del(`/api/clients/${negFee.json.client.id}`, { token: SUPER });

  // ══════════ ЗАЯВКИ ══════════
  group('3.2 Заявки');
  const lName = 'ТЕСТ Заявка ' + uniq();
  const l = await post('/api/leads/admin', { child_name: lName, phone: '0671112233', age: 10, course: 'scratch' }, { token: ADMIN });
  const lid = l.json?.lead?.id;
  eq('Заявка создаётся', l.status, 201, 'blocker');
  check('Заявка в БД', !!row('SELECT 1 FROM leads WHERE id=?', lid), '', 'blocker');

  const lPatch = await patch(`/api/leads/${lid}`, { status: 'contacted', notes: 'передзвонили' }, { token: ADMIN });
  eq('Статус заявки меняется', lPatch.json?.lead?.status, 'contacted', 'blocker');
  eq('Заметка заявки в БД', row('SELECT notes FROM leads WHERE id=?', lid)?.notes, 'передзвонили', 'high');

  const lBadStatus = await patch(`/api/leads/${lid}`, { status: 'выдуманный' }, { token: ADMIN });
  eq('Невалидный статус заявки отклонён', lBadStatus.status, 400, 'medium');

  const noPhone = await post('/api/leads/admin', { child_name: 'ТЕСТ', phone: '123' }, { token: ADMIN });
  eq('Заявка с коротким телефоном отклонена', noPhone.status, 400, 'high');

  // Публичная форма — валидация возраста
  const badAge = await post('/api/leads', { child_name: 'ТЕСТ Вік', phone: '0501234567', age: 99 });
  check('Публичная форма отклоняет возраст вне 5–18', badAge.status === 400 || badAge.status === 429,
    `получен ${badAge.status}`, 'medium');

  // Заявка на несуществующий id
  const ghost = await patch('/api/leads/99999999', { notes: 'x' }, { token: ADMIN });
  check('PATCH несуществующей заявки возвращает 404', ghost.status === 404,
    `получен ${ghost.status} — молчаливый успех при отсутствующей записи`, 'medium');

  // ══════════ КУРСЫ ══════════
  group('3.3 Курсы');
  const courseId = 'test-course-' + uniq().toLowerCase();
  const crs = await post('/api/courses', {
    id: courseId, name: 'ТЕСТ Курс', price: 3600, lessonsCount: 32, groupSize: 6,
    age: '10-14', features: ['a', 'b'], active: true,
  }, { token: ADMIN });
  eq('Курс создаётся', crs.status, 201, 'blocker');
  check('Курс в БД', !!row('SELECT 1 FROM courses WHERE id=?', courseId), '', 'blocker');
  eq('Цена курса сохранена', row('SELECT price FROM courses WHERE id=?', courseId)?.price, 3600, 'high');

  const dupe = await post('/api/courses', { id: courseId, name: 'Дубль' }, { token: ADMIN });
  check('Дублирующий id курса отклонён', dupe.status >= 400, `получен ${dupe.status}`, 'high');

  const crsUpd = await patch(`/api/courses/${courseId}`, { price: 4000, name: 'ТЕСТ Курс 2' }, { token: ADMIN });
  eq('Курс обновляется', crsUpd.status, 200, 'blocker');
  eq('Новая цена в БД', row('SELECT price FROM courses WHERE id=?', courseId)?.price, 4000, 'blocker');

  const crsNeg = await patch(`/api/courses/${courseId}`, { price: -100 }, { token: ADMIN });
  check('Отрицательная цена курса отклоняется',
    crsNeg.status === 400 || row('SELECT price FROM courses WHERE id=?', courseId)?.price >= 0,
    `в БД price=${row('SELECT price FROM courses WHERE id=?', courseId)?.price}`, 'medium');

  // Публичный список отдаёт только активные
  await patch(`/api/courses/${courseId}`, { active: false }, { token: ADMIN });
  const pub = await get('/api/courses');
  check('Отключённый курс скрыт из публичного списка',
    !(pub.json?.courses || []).some(x => x.id === courseId), '', 'high');
  const all = await get('/api/courses?all=1', { token: ADMIN });
  check('Отключённый курс виден в админском списке',
    (all.json?.courses || []).some(x => x.id === courseId), '', 'high');

  // ══════════ СТАТЬИ ══════════
  group('3.4 Статьи');
  const slug = 'test-article-' + uniq().toLowerCase();
  const art = await post('/api/articles', { slug, title: 'ТЕСТ Стаття', content: '<p>текст</p>', category: 'навчання' }, { token: ADMIN });
  const aid = art.json?.article?.id;
  eq('Статья создаётся', art.status, 201, 'blocker');
  check('Статья в БД', !!row('SELECT 1 FROM articles WHERE id=?', aid), '', 'blocker');
  const artDupe = await post('/api/articles', { slug, title: 'Дубль' }, { token: ADMIN });
  check('Дублирующий slug статьи отклонён понятной ошибкой',
    artDupe.status === 400 || artDupe.status === 409,
    `получен ${artDupe.status}: ${artDupe.text.slice(0, 150)}`, 'medium');
  const artUpd = await patch(`/api/articles/${aid}`, { title: 'ТЕСТ Оновлено' }, { token: ADMIN });
  eq('Статья обновляется', artUpd.status, 200, 'high');
  eq('Заголовок в БД', row('SELECT title FROM articles WHERE id=?', aid)?.title, 'ТЕСТ Оновлено', 'high');
  check('HTML статьи сохраняется без потерь',
    row('SELECT content FROM articles WHERE id=?', aid)?.content === '<p>текст</p>',
    `в БД: ${row('SELECT content FROM articles WHERE id=?', aid)?.content}`, 'high');

  // ══════════ ОТЗЫВЫ ══════════
  group('3.5 Отзывы');
  const rev = await post('/api/reviews', { name: 'ТЕСТ Відгук', text: 'Чудово', rating: 5, role: 'мама' }, { token: ADMIN });
  const rid = rev.json?.review?.id;
  eq('Отзыв создаётся', rev.status, 201, 'blocker');
  check('Отзыв в БД', !!row('SELECT 1 FROM reviews WHERE id=?', rid), '', 'blocker');
  const revBad = await post('/api/reviews', { name: 'ТЕСТ', text: 'x', rating: 99 }, { token: ADMIN });
  check('Оценка вне диапазона 1–5 отклоняется',
    revBad.status === 400 || (revBad.json?.review?.rating >= 1 && revBad.json?.review?.rating <= 5),
    `сохранён rating=${revBad.json?.review?.rating}`, 'medium');
  if (revBad.json?.review?.id) await del(`/api/reviews/${revBad.json.review.id}`, { token: SUPER });
  const revUpd = await patch(`/api/reviews/${rid}`, { text: 'Оновлено' }, { token: ADMIN });
  eq('Отзыв обновляется', revUpd.status, 200, 'high');

  // ══════════ ПЛАТЕЖИ ══════════
  group('3.6 Платежи');
  const pay = await post('/api/payments', { clientId: cid, amount: 3600, method: 'card', note: 'тест' }, { token: ADMIN });
  const pid = pay.json?.payment?.id;
  eq('Платёж создаётся', pay.status, 201, 'blocker');
  check('Платёж в БД', !!row('SELECT 1 FROM payments WHERE id=?', pid), '', 'blocker');
  const payGhost = await post('/api/payments', { clientId: 99999999, amount: 100 }, { token: ADMIN });
  check('Платёж несуществующему клиенту отклоняется', payGhost.status >= 400,
    `создан платёж id=${payGhost.json?.payment?.id} на клиента, которого нет`, 'high');
  const payNeg = await post('/api/payments', { clientId: cid, amount: -1000 }, { token: ADMIN });
  check('Отрицательная сумма платежа отклоняется',
    payNeg.status >= 400 || (payNeg.json?.payment?.amount ?? 0) >= 0,
    `сохранена сумма ${payNeg.json?.payment?.amount}`, 'high');
  const payNaN = await post('/api/payments', { clientId: 'абв', amount: 'много' }, { token: ADMIN });
  check('Нечисловые данные платежа отклоняются', payNaN.status >= 400,
    `получен ${payNaN.status}: ${payNaN.text.slice(0, 150)}`, 'medium');

  // ══════════ МЕСЯЧНЫЕ ОПЛАТЫ ══════════
  group('3.7 Месячные оплаты');
  const mCreate = await post(`/api/monthly-payments/${YM}`, {
    records: [{ clientId: cid, clientName: cName, expectedAmount: 3600, paidAmount: 0, status: 'pending' }],
  }, { token: ADMIN });
  check('Месяц оплат создаётся', mCreate.status === 200 || mCreate.status === 201, `получен ${mCreate.status}`, 'blocker');
  // Месяц мог остаться от прошлого прогона — тогда createMonth не добавляет
  // новые записи, поэтому строку клиента дописываем upsert-ом.
  await put(`/api/monthly-payments/${YM}/${cid}`, {
    clientName: cName, expectedAmount: 3600, paidAmount: 0, status: 'pending',
  }, { token: ADMIN });
  check('Запись месяца в БД', !!row('SELECT 1 FROM monthly_payments WHERE ym=? AND client_id=?', YM, cid), '', 'blocker');

  const mPatch = await patch(`/api/monthly-payments/${YM}/${cid}`, { status: 'paid', paidAmount: 3600, method: 'cash' }, { token: ADMIN });
  eq('Оплата отмечается', mPatch.status, 200, 'blocker');
  eq('Статус оплаты в БД', row('SELECT status FROM monthly_payments WHERE ym=? AND client_id=?', YM, cid)?.status, 'paid', 'blocker');

  const mBad = await patch(`/api/monthly-payments/${YM}/${cid}`, { status: 'вигаданий', method: 'биткоин' }, { token: ADMIN });
  const mAfter = row('SELECT status, method FROM monthly_payments WHERE ym=? AND client_id=?', YM, cid);
  check('Невалидный статус/метод оплаты не попадает в БД',
    mBad.status === 400 || (mAfter?.status !== 'вигаданий' && mAfter?.method !== 'биткоин'),
    `в БД записано status="${mAfter?.status}", method="${mAfter?.method}" — минуя список допустимых значений`, 'high');

  const mYmBad = await post('/api/monthly-payments/не-месяц', { records: [] }, { token: ADMIN });
  check('Некорректный формат месяца отклоняется', mYmBad.status >= 400,
    `получен ${mYmBad.status} — создан месяц с ключом "не-месяц"`, 'medium');

  // ══════════ ПОСЕЩАЕМОСТЬ ══════════
  group('3.8 Посещаемость');
  const att = await post('/api/attendance', { clientId: cid, date: '2099-03-05', status: 'present' }, { token: ADMIN });
  eq('Посещаемость записывается', att.status, 200, 'blocker');
  eq('Отметка в БД', row('SELECT status FROM attendance WHERE client_id=? AND date=?', cid, '2099-03-05')?.status, 'present', 'blocker');
  const attUpd = await post('/api/attendance', { clientId: cid, date: '2099-03-05', status: 'absent' }, { token: ADMIN });
  eq('Повторная отметка перезаписывает', row('SELECT status FROM attendance WHERE client_id=? AND date=?', cid, '2099-03-05')?.status, 'absent', 'high');
  const attBad = await post('/api/attendance', { clientId: cid, date: '2099-03-06', status: 'вигаданий' }, { token: ADMIN });
  const attBadRow = row('SELECT status FROM attendance WHERE client_id=? AND date=?', cid, '2099-03-06');
  check('Невалидный статус посещаемости отклоняется',
    attBad.status >= 400 || !attBadRow,
    `в БД записано "${attBadRow?.status}"`, 'medium');
  const attBadDate = await post('/api/attendance', { clientId: cid, date: 'не-дата', status: 'present' }, { token: ADMIN });
  check('Некорректная дата посещаемости отклоняется', attBadDate.status >= 400,
    `получен ${attBadDate.status} — в БД дата "не-дата"`, 'medium');
  const attGhost = await post('/api/attendance', { clientId: 99999999, date: '2099-03-07', status: 'present' }, { token: ADMIN });
  check('Отметка несуществующему клиенту отклоняется', attGhost.status >= 400,
    `получен ${attGhost.status}`, 'medium');

  // ══════════ ТОКЕНЫ УРОКОВ ══════════
  group('3.9 Токены уроков');
  const lt = await post('/api/lesson-tokens', { clientId: cid, studentName: 'ТЕСТ Учень' }, { token: ADMIN });
  const ltid = lt.json?.token?.id;
  check('Токен урока выдаётся', lt.status === 200 && !!ltid, `получен ${lt.status}`, 'high');
  check('Токен в БД', !!row('SELECT 1 FROM lesson_tokens WHERE id=?', ltid), '', 'high');
  const ltOff = await patch(`/api/lesson-tokens/${ltid}`, { active: false }, { token: ADMIN });
  eq('Токен отключается', row('SELECT active FROM lesson_tokens WHERE id=?', ltid)?.active, 0, 'high');

  // ══════════ КОНТЕНТ (CMS) ══════════
  group('3.10 Контент CMS');
  const cmsPut = await put('/api/content/pricing', { data: { probe: 'значення-тесту' } }, { token: ADMIN });
  eq('Раздел CMS сохраняется', cmsPut.status, 200, 'blocker');
  const cmsGet = await get('/api/content');
  check('Раздел CMS читается обратно',
    JSON.stringify(cmsGet.json?.content?.pricing || cmsGet.json?.pricing || {}).includes('значення-тесту'),
    JSON.stringify(cmsGet.json).slice(0, 300), 'blocker');

  // ══════════ УДАЛЕНИЕ ══════════
  group('3.11 Удаление');
  eq('Удаление курса', (await del(`/api/courses/${courseId}`, { token: SUPER })).status, 200, 'high');
  check('Курс исчез из БД', !row('SELECT 1 FROM courses WHERE id=?', courseId), '', 'high');
  eq('Удаление статьи', (await del(`/api/articles/${aid}`, { token: SUPER })).status, 200, 'high');
  check('Статья исчезла из БД', !row('SELECT 1 FROM articles WHERE id=?', aid), '', 'high');
  eq('Удаление отзыва', (await del(`/api/reviews/${rid}`, { token: SUPER })).status, 200, 'high');
  eq('Удаление платежа', (await del(`/api/payments/${pid}`, { token: ADMIN })).status, 200, 'high');
  eq('Удаление заявки', (await del(`/api/leads/${lid}`, { token: SUPER })).status, 200, 'high');
  eq('Удаление токена урока', (await del(`/api/lesson-tokens/${ltid}`, { token: ADMIN })).status, 200, 'high');
  eq('Повторное удаление заявки даёт 404', (await del(`/api/leads/${lid}`, { token: SUPER })).status, 404, 'low');

  // Клиента удаляем последним — фаза 4 проверит сирот, поэтому здесь оставляем id
  require('fs').writeFileSync(path.join(__dirname, 'phase3-state.json'), JSON.stringify({ cid, YM, cName }));

  summary('ФАЗА 3 — CRUD');
  saveReport(path.join(__dirname, 'report-phase3.json'));
})();
