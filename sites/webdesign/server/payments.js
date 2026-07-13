'use strict';

const db = require('./db');

const METHOD_VALUES = ['cash', 'card', 'wayforpay', 'googlepay', 'applepay', 'transfer', 'other'];

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id, clientId: row.client_id, amount: row.amount, date: row.date,
    method: row.method, note: row.note, createdAt: row.created_at,
  };
}

const selAll        = db.prepare('SELECT * FROM payments ORDER BY id DESC');
const selByClient    = db.prepare('SELECT * FROM payments WHERE client_id = ? ORDER BY id DESC');
const selById        = db.prepare('SELECT * FROM payments WHERE id = ?');
const sumByClient     = db.prepare('SELECT COALESCE(SUM(amount), 0) AS total FROM payments WHERE client_id = ?');
const insPayment     = db.prepare(`INSERT INTO payments (client_id, amount, date, method, note, created_at)
  VALUES (@client_id, @amount, @date, @method, @note, @created_at)`);
const delPayment     = db.prepare('DELETE FROM payments WHERE id = ?');

module.exports = {
  METHOD_VALUES,

  getAll(clientId) {
    const rows = clientId ? selByClient.all(parseInt(clientId)) : selAll.all();
    return rows.map(fromRow);
  },

  create(data) {
    const info = insPayment.run({
      client_id: parseInt(data.clientId),
      amount:    parseFloat(data.amount) || 0,
      date:      data.date || new Date().toISOString().slice(0, 10),
      method:    METHOD_VALUES.includes(data.method) ? data.method : 'other',
      note:      data.note || '',
      created_at: new Date().toISOString(),
    });
    return fromRow(selById.get(info.lastInsertRowid));
  },

  delete(id) {
    return delPayment.run(id).changes > 0;
  },

  getTotalForClient(clientId) {
    const cid = parseInt(clientId);
    return Number.isNaN(cid) ? 0 : sumByClient.get(cid).total;
  },

  getById(id) {
    return id != null ? fromRow(selById.get(id)) : null;
  },
};
