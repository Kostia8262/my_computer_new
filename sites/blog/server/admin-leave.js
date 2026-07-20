'use strict';

const db = require('./db');

function now() { return new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }); }

const TYPES = ['vacation', 'sick'];

const insEntry = db.prepare(`INSERT INTO admin_leave (admin_id, type, start_date, end_date, notes, created_at)
  VALUES (@admin_id, @type, @start_date, @end_date, @notes, @created_at)`);
const selForAdmin = db.prepare('SELECT * FROM admin_leave WHERE admin_id = ? ORDER BY start_date DESC');
const selById     = db.prepare('SELECT * FROM admin_leave WHERE id = ?');
const delEntry    = db.prepare('DELETE FROM admin_leave WHERE id = ? AND admin_id = ?');

function fromRow(row) {
  return {
    id: row.id, adminId: row.admin_id, type: row.type,
    startDate: row.start_date, endDate: row.end_date,
    notes: row.notes, createdAt: row.created_at,
  };
}

// Inclusive day count between two YYYY-MM-DD strings.
function dayCount(startDate, endDate) {
  const start = new Date(startDate + 'T00:00:00');
  const end   = new Date(endDate + 'T00:00:00');
  if (isNaN(start) || isNaN(end) || end < start) return 0;
  return Math.round((end - start) / 86400000) + 1;
}

module.exports = {
  TYPES,

  getForAdmin(adminId) {
    return selForAdmin.all(adminId).map(fromRow);
  },

  create({ adminId, type, startDate, endDate, notes }) {
    const t = TYPES.includes(type) ? type : 'vacation';
    const info = insEntry.run({
      admin_id: adminId, type: t,
      start_date: startDate, end_date: endDate,
      notes: notes ? String(notes).slice(0, 300) : '',
      created_at: now(),
    });
    return fromRow(selById.get(info.lastInsertRowid));
  },

  delete(id, adminId) {
    return delEntry.run(id, adminId).changes > 0;
  },

  dayCount,
};
