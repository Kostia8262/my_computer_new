'use strict';

const db = require('./db');

function now() { return new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }); }

const insEntry = db.prepare(`INSERT INTO admin_rate_history (admin_id, field, old_value, new_value, changed_at)
  VALUES (@admin_id, @field, @old_value, @new_value, @changed_at)`);
const selForAdmin = db.prepare('SELECT * FROM admin_rate_history WHERE admin_id = ? ORDER BY id DESC LIMIT 30');

function fromRow(row) {
  return {
    id: row.id, field: row.field,
    oldValue: row.old_value, newValue: row.new_value,
    changedAt: row.changed_at,
  };
}

module.exports = {
  // Records a change only when the value actually differs — call once per
  // field being compared, no-op on equal old/new.
  logChange(adminId, field, oldValue, newValue) {
    const oldStr = oldValue == null ? null : String(oldValue);
    const newStr = newValue == null ? null : String(newValue);
    if (oldStr === newStr) return;
    insEntry.run({ admin_id: adminId, field, old_value: oldStr, new_value: newStr, changed_at: now() });
  },

  getForAdmin(adminId) {
    return selForAdmin.all(adminId).map(fromRow);
  },
};
