'use strict';

const db = require('./db');

function nowIso() { return new Date().toISOString(); }

const STATUS_VALUES      = ['new', 'trial', 'active', 'paused', 'completed', 'churned'];
const SOURCE_VALUES      = ['website', 'referral', 'social', 'phone', 'walk-in', 'other'];
const LESSON_TYPE_VALUES = ['individual', 'adult', 'group', 'group2'];

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    course: row.course,
    phone: row.phone,
    email: row.email,
    status: row.status,
    source: row.source,
    enrolledDate: row.enrolled_date,
    trialDate: row.trial_date,
    lastContact: row.last_contact,
    nextContact: row.next_contact,
    monthlyFee: row.monthly_fee,
    totalPaid: row.total_paid,
    notes: row.notes,
    manager: row.manager,
    teacher: row.teacher,
    schedule: row.schedule,
    scheduleDays: JSON.parse(row.schedule_days || '[]'),
    lessonType: row.lesson_type,
    city: row.city,
    sourceLeadId: row.source_lead_id,
    certificateNumber: row.certificate_number,
    certificateDate: row.certificate_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const selAll  = db.prepare('SELECT * FROM clients ORDER BY id DESC');
const selById = db.prepare('SELECT * FROM clients WHERE id = ?');
const insClient = db.prepare(`INSERT INTO clients
  (name, age, course, phone, email, status, source, enrolled_date, trial_date, last_contact, next_contact,
   monthly_fee, total_paid, notes, manager, teacher, schedule, schedule_days, lesson_type, city, source_lead_id, created_at, updated_at)
  VALUES (@name, @age, @course, @phone, @email, @status, @source, @enrolled_date, @trial_date, @last_contact, @next_contact,
   @monthly_fee, @total_paid, @notes, @manager, @teacher, @schedule, @schedule_days, @lesson_type, @city, @source_lead_id, @created_at, @updated_at)`);
const delClient = db.prepare('DELETE FROM clients WHERE id = ?');

module.exports = {
  STATUS_VALUES,
  SOURCE_VALUES,
  LESSON_TYPE_VALUES,

  getAll() { return selAll.all().map(fromRow); },

  getById(id) { return id != null ? fromRow(selById.get(id)) : null; },

  create(data) {
    const now = nowIso();
    const info = insClient.run({
      name:         data.name         || '',
      age:          data.age          ?? null,
      course:       data.course       || null,
      phone:        data.phone        || '',
      email:        data.email        || null,
      status:       STATUS_VALUES.includes(data.status) ? data.status : 'new',
      source:       SOURCE_VALUES.includes(data.source) ? data.source : 'website',
      enrolled_date: data.enrolledDate || null,
      trial_date:   data.trialDate    || null,
      last_contact: data.lastContact  || null,
      next_contact: data.nextContact  || null,
      monthly_fee:  data.monthlyFee   ?? null,
      total_paid:   data.totalPaid    ?? null,
      notes:        data.notes        || '',
      manager:      data.manager      || '',
      teacher:      data.teacher      || '',
      schedule:     data.schedule     || '',
      schedule_days: JSON.stringify(Array.isArray(data.scheduleDays) ? data.scheduleDays : []),
      lesson_type:  LESSON_TYPE_VALUES.includes(data.lessonType) ? data.lessonType : 'group',
      city:         data.city         || '',
      source_lead_id: data.sourceLeadId ?? null,
      created_at:   data.createdAt    || now,
      updated_at:   now,
    });
    return fromRow(selById.get(info.lastInsertRowid));
  },

  update(id, data) {
    const existing = selById.get(id);
    if (!existing) return null;
    const colMap = {
      name: 'name', age: 'age', course: 'course', phone: 'phone', email: 'email',
      status: 'status', source: 'source', enrolledDate: 'enrolled_date', trialDate: 'trial_date',
      lastContact: 'last_contact', nextContact: 'next_contact', monthlyFee: 'monthly_fee',
      totalPaid: 'total_paid', notes: 'notes', manager: 'manager', teacher: 'teacher',
      schedule: 'schedule', scheduleDays: 'schedule_days', lessonType: 'lesson_type',
      city: 'city', sourceLeadId: 'source_lead_id',
      certificateNumber: 'certificate_number', certificateDate: 'certificate_date',
    };
    const sets = ['updated_at = @updated_at'];
    const params = { id, updated_at: nowIso() };
    Object.keys(colMap).forEach(k => {
      if (!(k in data)) return;
      let val = data[k];
      if (k === 'status'     && !STATUS_VALUES.includes(val))      return;
      if (k === 'source'     && !SOURCE_VALUES.includes(val))      return;
      if (k === 'lessonType' && !LESSON_TYPE_VALUES.includes(val)) return;
      if (k === 'scheduleDays') val = JSON.stringify(Array.isArray(val) ? val : []);
      const col = colMap[k];
      sets.push(`${col} = @${col}`);
      params[col] = val;
    });
    db.prepare(`UPDATE clients SET ${sets.join(', ')} WHERE id = @id`).run(params);
    return fromRow(selById.get(id));
  },

  delete(id) {
    return delClient.run(id).changes > 0;
  },

  getStats() {
    const clients = selAll.all().map(fromRow);
    const s = { total: clients.length };
    STATUS_VALUES.forEach(v => { s[v] = clients.filter(c => c.status === v).length; });
    return s;
  },
};
