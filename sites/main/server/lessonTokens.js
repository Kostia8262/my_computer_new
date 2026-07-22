'use strict';

const crypto = require('crypto');
const db = require('./db');

function nowIso() { return new Date().toISOString(); }

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    token: row.token,
    clientId: row.client_id,
    studentName: row.student_name,
    course: row.course,
    ageTier: row.age_tier,
    active: !!row.active,
    createdAt: row.created_at,
    lastUsedAt: row.last_used_at,
  };
}

const selAll     = db.prepare('SELECT * FROM lesson_tokens ORDER BY id DESC');
const selByToken = db.prepare('SELECT * FROM lesson_tokens WHERE token = ?');
const selById    = db.prepare('SELECT * FROM lesson_tokens WHERE id = ?');
const insToken   = db.prepare(`INSERT INTO lesson_tokens
  (token, client_id, student_name, course, age_tier, active, created_at)
  VALUES (@token, @client_id, @student_name, @course, @age_tier, 1, @created_at)`);
const touchToken = db.prepare('UPDATE lesson_tokens SET last_used_at = @now WHERE token = @token');
const setActive  = db.prepare('UPDATE lesson_tokens SET active = @active WHERE id = @id');
const delToken   = db.prepare('DELETE FROM lesson_tokens WHERE id = ?');

module.exports = {
  getAll() { return selAll.all().map(fromRow); },

  getByToken(token) { return token ? fromRow(selByToken.get(token)) : null; },

  // Redeeming a token records last-used-at as a byproduct — this is the
  // "site activity" signal the whole feature was partly built to generate,
  // so touching it on every real use (not just issuance) matters.
  touch(token) { touchToken.run({ token, now: nowIso() }); },

  create({ clientId, studentName, course, ageTier }) {
    const token = crypto.randomBytes(16).toString('hex');
    insToken.run({
      token,
      client_id: clientId ?? null,
      student_name: studentName || '',
      course,
      age_tier: ageTier,
      created_at: nowIso(),
    });
    return fromRow(selByToken.get(token));
  },

  setActive(id, active) {
    setActive.run({ id, active: active ? 1 : 0 });
    return fromRow(selById.get(id));
  },

  delete(id) {
    return delToken.run(id).changes > 0;
  },
};
