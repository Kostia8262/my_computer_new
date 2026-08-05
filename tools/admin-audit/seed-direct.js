'use strict';
/** Наполнение базы напрямую — обходит ограничение частоты, чтобы замерить работу на объёме. */

const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('d:/Проекты/my_computer_new/sites/main/data/main.db');

const N_CLIENTS = 300, N_LEADS = 500;
const now = new Date().toISOString();
const ukNow = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' });

db.exec('BEGIN');
const insC = db.prepare(`INSERT INTO clients
 (name, age, course, phone, email, status, source, enrolled_date, monthly_fee, total_paid, notes, manager, teacher, schedule, schedule_days, lesson_type, city, created_at, updated_at)
 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
const clientIds = [];
for (let i = 0; i < N_CLIENTS; i++) {
  const r = insC.run(
    `НАГРУЗКА Учень ${i}`, 8 + (i % 10), ['python', 'scratch', 'roblox', 'web'][i % 4],
    `05${String(10000000 + i)}`, `load${i}@test.ua`, 'active', 'website', '2099-06-01',
    3600, 0, '', '', i % 2 ? 'Богдан Коваль' : 'Аліна Петренко', '',
    JSON.stringify([{ day: (i % 5) + 1, time: '15:00' }]), 'group', 'Дніпро', now, now);
  clientIds.push(Number(r.lastInsertRowid));
}
const insL = db.prepare(`INSERT INTO leads (child_name, age, course, source, phone, email, status, notes, created_at, updated_at)
 VALUES (?,?,?,?,?,?,?,?,?,?)`);
for (let i = 0; i < N_LEADS; i++) {
  insL.run(`НАГРУЗКА Заявка ${i}`, 8 + (i % 10), ['python', 'scratch', 'roblox'][i % 3],
    'mycomputer.education', `06${String(10000000 + i)}`, null,
    ['new', 'contacted', 'trial_scheduled', 'enrolled', 'rejected'][i % 5], '', ukNow, ukNow);
}
const insA = db.prepare('INSERT OR REPLACE INTO attendance (client_id, date, status) VALUES (?,?,?)');
let att = 0;
for (const cid of clientIds.slice(0, 120)) {
  for (const d of ['01', '03', '08', '10', '15', '17', '22', '24', '29']) {
    insA.run(cid, `2099-06-${d}`, 'present'); att++;
  }
}
const insM = db.prepare(`INSERT OR REPLACE INTO monthly_payments (ym, client_id, client_name, expected_amount, paid_amount, status, paid_date, method, note)
 VALUES (?,?,?,?,?,?,?,?,?)`);
for (const cid of clientIds) {
  insM.run('2099-06', cid, `НАГРУЗКА Учень ${cid}`, 3600, 3600, 'paid', '2099-06-05', 'card', '');
}
db.exec('COMMIT');

console.log(`клиентов: ${db.prepare('SELECT COUNT(*) n FROM clients').get().n}`);
console.log(`заявок:   ${db.prepare('SELECT COUNT(*) n FROM leads').get().n}`);
console.log(`посещений:${db.prepare('SELECT COUNT(*) n FROM attendance').get().n} (добавлено ${att})`);
console.log(`оплат:    ${db.prepare('SELECT COUNT(*) n FROM monthly_payments').get().n}`);
