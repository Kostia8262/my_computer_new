'use strict';

const crypto = require('crypto');
const db = require('./db');

function now()      { return new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }); }
function genToken() { return crypto.randomBytes(24).toString('hex'); }

const ALLOWED_ROLES = ['administrator', 'manager', 'teacher'];

function fromRow(row) {
  if (!row) return null;
  const a = {
    id: row.id, name: row.name, role: row.role, token: row.token,
    active: !!row.active, createdAt: row.created_at,
  };
  if (row.hourly_rate     !== null) a.hourlyRate     = row.hourly_rate;
  if (row.lesson_duration !== null) a.lessonDuration = row.lesson_duration;
  if (row.notes           !== null) a.notes          = row.notes;
  if (row.phone           !== null) a.phone          = row.phone;
  if (row.payment_type    !== null) a.paymentType    = row.payment_type;
  if (row.monthly_rate    !== null) a.monthlyRate    = row.monthly_rate;
  if (row.full_name       !== null) a.fullName       = row.full_name;
  if (row.city            !== null) a.city           = row.city;
  if (row.job_title       !== null) a.jobTitle       = row.job_title;
  if (row.hire_date       !== null) a.hireDate       = row.hire_date;
  if (row.birthday        !== null) a.birthday       = row.birthday;
  if (row.updated_at      !== null) a.updatedAt      = row.updated_at;
  return a;
}

const selAll   = db.prepare('SELECT * FROM admins ORDER BY id ASC');
const selById  = db.prepare('SELECT * FROM admins WHERE id = ?');
const selByToken = db.prepare('SELECT * FROM admins WHERE token = ? AND active = 1');
const insAdmin = db.prepare(`INSERT INTO admins (name, role, token, active, hourly_rate, lesson_duration, notes, phone, created_at)
  VALUES (@name, @role, @token, 1, @hourly_rate, @lesson_duration, @notes, @phone, @created_at)`);
const delAdmin = db.prepare('DELETE FROM admins WHERE id = ?');

module.exports = {
  ALLOWED_ROLES,
  getAll()        { return selAll.all().map(fromRow); },
  getById(id)     { return id != null ? fromRow(selById.get(id)) : null; },
  findByToken(t)  { return t ? fromRow(selByToken.get(t)) : null; },

  create(name, role, extra = {}) {
    const r = ALLOWED_ROLES.includes(role) ? role : 'administrator';
    const info = insAdmin.run({
      name: String(name).trim(), role: r, token: genToken(), created_at: now(),
      hourly_rate: extra.hourlyRate !== undefined ? (parseFloat(extra.hourlyRate) || 0) : null,
      lesson_duration: extra.lessonDuration !== undefined ? (parseInt(extra.lessonDuration) || 60) : null,
      notes: extra.notes !== undefined ? String(extra.notes).slice(0, 500) : null,
      phone: extra.phone !== undefined ? String(extra.phone).slice(0, 30) : null,
    });
    return fromRow(selById.get(info.lastInsertRowid));
  },

  update(id, patch) {
    const existing = selById.get(id);
    if (!existing) return null;
    const sets = ['updated_at = @updated_at'];
    const params = { id, updated_at: now() };
    ['name', 'hourlyRate', 'lessonDuration', 'notes', 'phone', 'paymentType', 'monthlyRate', 'fullName', 'city', 'jobTitle', 'hireDate', 'birthday'].forEach(k => {
      if (!(k in patch)) return;
      if (k === 'hourlyRate')       { sets.push('hourly_rate = @hourly_rate'); params.hourly_rate = parseFloat(patch[k]) || 0; }
      else if (k === 'monthlyRate') { sets.push('monthly_rate = @monthly_rate'); params.monthly_rate = parseFloat(patch[k]) || 0; }
      else if (k === 'lessonDuration') { sets.push('lesson_duration = @lesson_duration'); params.lesson_duration = parseInt(patch[k]) || 60; }
      else if (k === 'paymentType') { sets.push('payment_type = @payment_type'); params.payment_type = String(patch[k]).slice(0, 20); }
      else if (k === 'name')        { sets.push('name = @name'); params.name = String(patch[k]).slice(0, 500); }
      else if (k === 'notes')       { sets.push('notes = @notes'); params.notes = String(patch[k]).slice(0, 500); }
      else if (k === 'phone')       { sets.push('phone = @phone'); params.phone = String(patch[k]).slice(0, 500); }
      else if (k === 'fullName')    { sets.push('full_name = @full_name'); params.full_name = String(patch[k]).slice(0, 500); }
      else if (k === 'city')        { sets.push('city = @city'); params.city = String(patch[k]).slice(0, 200); }
      else if (k === 'jobTitle')    { sets.push('job_title = @job_title'); params.job_title = String(patch[k]).slice(0, 200); }
      else if (k === 'hireDate')    { sets.push('hire_date = @hire_date'); params.hire_date = String(patch[k]).slice(0, 20); }
      else if (k === 'birthday')    { sets.push('birthday = @birthday'); params.birthday = String(patch[k]).slice(0, 20); }
    });
    db.prepare(`UPDATE admins SET ${sets.join(', ')} WHERE id = @id`).run(params);
    return fromRow(selById.get(id));
  },

  regenerateToken(id) {
    const existing = selById.get(id);
    if (!existing) return null;
    db.prepare('UPDATE admins SET token = ?, active = 1, updated_at = ? WHERE id = ?').run(genToken(), now(), id);
    return fromRow(selById.get(id));
  },

  revoke(id) {
    const existing = selById.get(id);
    if (!existing) return null;
    db.prepare('UPDATE admins SET active = 0 WHERE id = ?').run(id);
    return fromRow(selById.get(id));
  },

  delete(id) {
    return delAdmin.run(id).changes > 0;
  },
};
