'use strict';

/**
 * MY COMPUTER ACADEMY — one-off cleanup of rows left behind by deleted clients.
 *
 * Until the delete handler started clearing them (see clients.js delete()),
 * removing a client left their payments, attendance marks and monthly-payment
 * rows in place. Those rows keep counting towards the month's cash total and
 * show a name that exists nowhere else, so the books read wrong.
 *
 * Usage — report only, changes nothing:
 *     node server/cleanup-orphans.js
 *
 * Usage — actually delete the orphans:
 *     node server/cleanup-orphans.js --apply
 *
 * Take a database backup before running with --apply.
 */

const db = require('./db');

const APPLY = process.argv.includes('--apply');

const TARGETS = [
  {
    table: 'payments',
    label: 'платежі',
    countSql: 'SELECT COUNT(*) AS n, COALESCE(SUM(amount), 0) AS sum FROM payments WHERE client_id NOT IN (SELECT id FROM clients)',
    listSql:  'SELECT id, client_id, amount, date FROM payments WHERE client_id NOT IN (SELECT id FROM clients) ORDER BY client_id LIMIT 20',
    delSql:   'DELETE FROM payments WHERE client_id NOT IN (SELECT id FROM clients)',
    money: true,
  },
  {
    table: 'monthly_payments',
    label: 'місячні оплати',
    countSql: 'SELECT COUNT(*) AS n, COALESCE(SUM(paid_amount), 0) AS sum FROM monthly_payments WHERE client_id NOT IN (SELECT id FROM clients)',
    listSql:  'SELECT ym, client_id, client_name, expected_amount, paid_amount, status FROM monthly_payments WHERE client_id NOT IN (SELECT id FROM clients) ORDER BY ym LIMIT 20',
    delSql:   'DELETE FROM monthly_payments WHERE client_id NOT IN (SELECT id FROM clients)',
    money: true,
  },
  {
    table: 'attendance',
    label: 'відвідування',
    countSql: 'SELECT COUNT(*) AS n, 0 AS sum FROM attendance WHERE client_id NOT IN (SELECT id FROM clients)',
    listSql:  'SELECT client_id, date, status FROM attendance WHERE client_id NOT IN (SELECT id FROM clients) ORDER BY date LIMIT 20',
    delSql:   'DELETE FROM attendance WHERE client_id NOT IN (SELECT id FROM clients)',
  },
  {
    table: 'lesson_tokens',
    label: 'токени уроків',
    countSql: 'SELECT COUNT(*) AS n, 0 AS sum FROM lesson_tokens WHERE client_id IS NOT NULL AND client_id NOT IN (SELECT id FROM clients)',
    listSql:  'SELECT id, client_id, student_name, active FROM lesson_tokens WHERE client_id IS NOT NULL AND client_id NOT IN (SELECT id FROM clients) LIMIT 20',
    delSql:   'DELETE FROM lesson_tokens WHERE client_id IS NOT NULL AND client_id NOT IN (SELECT id FROM clients)',
  },
];

console.log(APPLY ? '\n=== ВИДАЛЕННЯ СИРІТ ===\n' : '\n=== ЗВІТ ПРО СИРІТ (нічого не змінюється) ===\n');

let totalRows = 0;
for (const t of TARGETS) {
  const { n, sum } = db.prepare(t.countSql).get();
  totalRows += n;
  const moneyNote = t.money && sum ? `, на суму ${sum} грн` : '';
  console.log(`${t.label.padEnd(18)} ${String(n).padStart(5)} записів${moneyNote}`);
  if (n > 0) {
    const rows = db.prepare(t.listSql).all();
    rows.forEach(r => console.log('   ', JSON.stringify(r)));
    if (n > rows.length) console.log(`    … і ще ${n - rows.length}`);
  }
}

if (totalRows === 0) {
  console.log('\nСиріт не знайдено — база чиста.\n');
  process.exit(0);
}

if (!APPLY) {
  console.log(`\nВсього ${totalRows} записів-сиріт.`);
  console.log('Щоб видалити їх: спочатку зробіть резервну копію бази, потім запустіть');
  console.log('    node server/cleanup-orphans.js --apply\n');
  process.exit(0);
}

const tx = db.transaction(() => {
  const removed = {};
  for (const t of TARGETS) removed[t.table] = db.prepare(t.delSql).run().changes;
  return removed;
});
const removed = tx();

console.log('\nВидалено:');
Object.entries(removed).forEach(([table, n]) => console.log(`  ${table.padEnd(18)} ${n}`));
console.log('');
