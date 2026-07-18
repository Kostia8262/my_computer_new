'use strict';

/**
 * MY COMPUTER ACADEMY — leads storage, backed by SQLite (data/digitalart.db).
 */

const db = require('./db');

function now() {
  return new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' });
}

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id, child_name: row.child_name, age: row.age, course: row.course,
    source: row.source, phone: row.phone, email: row.email, status: row.status,
    notes: row.notes, teacher: row.teacher, schedule: row.schedule,
    scheduleDays: JSON.parse(row.schedule_days || '[]'), lessonType: row.lesson_type,
    created_at: row.created_at, updated_at: row.updated_at,
  };
}

const selAll   = db.prepare('SELECT * FROM leads ORDER BY id DESC');
const selById  = db.prepare('SELECT * FROM leads WHERE id = ?');
const selByPhone = db.prepare('SELECT * FROM leads WHERE phone = ?');
const insLead  = db.prepare(`INSERT INTO leads (child_name, age, course, source, phone, email, status, notes, created_at, updated_at)
  VALUES (@child_name, @age, @course, @source, @phone, @email, 'new', NULL, @created_at, @updated_at)`);
const delLead  = db.prepare('DELETE FROM leads WHERE id = ?');

module.exports = {
  insertLead(data) {
    const t = now();
    const info = insLead.run({
      child_name: data.child_name,
      age:        data.age   ?? null,
      course:     data.course ?? null,
      source:     data.source ?? null,
      phone:      data.phone,
      email:      data.email ?? null,
      created_at: t,
      updated_at: t,
    });
    return { id: info.lastInsertRowid, changes: 1 };
  },

  getAllLeads() {
    return selAll.all().map(fromRow);
  },

  getLeadById(id) {
    return id != null ? fromRow(selById.get(id)) : null;
  },

  updateStatus(id, status) {
    const info = db.prepare('UPDATE leads SET status = ?, updated_at = ? WHERE id = ?').run(status, now(), id);
    return { changes: info.changes };
  },

  updateNotes(id, notes) {
    const info = db.prepare('UPDATE leads SET notes = ?, updated_at = ? WHERE id = ?').run(notes, now(), id);
    return { changes: info.changes };
  },

  updateFields(id, fields) {
    const existing = selById.get(id);
    if (!existing) return null;
    const allowed = ['child_name', 'phone', 'age', 'course', 'email', 'teacher', 'schedule', 'schedule_days', 'lesson_type'];
    const sets = ['updated_at = @updated_at'];
    const params = { id, updated_at: now() };
    allowed.forEach(k => {
      if (!(k in fields) || fields[k] === undefined) return;
      sets.push(`${k} = @${k}`);
      params[k] = fields[k];
    });
    db.prepare(`UPDATE leads SET ${sets.join(', ')} WHERE id = @id`).run(params);
    return fromRow(selById.get(id));
  },

  getByPhone(phone) {
    return phone ? fromRow(selByPhone.get(phone)) : null;
  },

  deleteLead(id) {
    const info = delLead.run(id);
    return { changes: info.changes };
  },

  getStats() {
    const leads = selAll.all().map(fromRow);
    const statusMap = {};
    leads.forEach(l => { statusMap[l.status] = (statusMap[l.status] || 0) + 1; });
    return {
      total:    leads.length,
      byStatus: Object.entries(statusMap).map(([status, count]) => ({ status, count })),
    };
  },

  close() {},
};
