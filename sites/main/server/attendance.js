'use strict';

const db = require('./db');

// status: 'present' | 'absent' | 'makeup' | 'cancelled' | '' (remove)
const STATUS_VALUES = ['present', 'absent', 'makeup', 'cancelled'];

const selMonth = db.prepare('SELECT client_id, date, status FROM attendance WHERE date LIKE ?');
const selAll   = db.prepare('SELECT client_id, date, status FROM attendance');
const upsert   = db.prepare(`INSERT INTO attendance (client_id, date, status) VALUES (?, ?, ?)
  ON CONFLICT(client_id, date) DO UPDATE SET status = excluded.status`);
const del      = db.prepare('DELETE FROM attendance WHERE client_id = ? AND date = ?');

function toNestedMap(rows) {
  const result = {};
  for (const r of rows) {
    const cId = String(r.client_id);
    if (!result[cId]) result[cId] = {};
    result[cId][r.date] = r.status;
  }
  return result;
}

module.exports = {
  STATUS_VALUES,

  // Get all attendance records for a specific month
  getMonth(year, month) {
    const prefix = `${year}-${String(month).padStart(2, '0')}%`;
    return toNestedMap(selMonth.all(prefix));
  },

  setRecord(clientId, date, status) {
    const cId = parseInt(clientId);
    if (!status || status === '') {
      del.run(cId, date);
    } else {
      if (!STATUS_VALUES.includes(status)) return false;
      upsert.run(cId, date, status);
    }
    return true;
  },

  getAll() { return toNestedMap(selAll.all()); },
};
