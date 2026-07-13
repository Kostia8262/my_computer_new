'use strict';

const db = require('./db');

// 'pending' = not yet paid | 'paid' = fully paid | 'partial' = partially paid
// 'waived' = exempt from payment | 'completed' = finished course
const STATUS_VALUES = ['pending', 'paid', 'partial', 'waived', 'completed'];

const METHOD_VALUES = ['cash', 'card', 'wayforpay', 'googlepay', 'applepay', 'transfer', 'other'];

function fromRow(row) {
  if (!row) return null;
  return {
    clientId: row.client_id, clientName: row.client_name,
    expectedAmount: row.expected_amount, paidAmount: row.paid_amount,
    status: row.status, paidDate: row.paid_date, method: row.method, note: row.note,
  };
}

const selMonths   = db.prepare('SELECT DISTINCT ym FROM monthly_payments ORDER BY ym ASC');
const selMonth     = db.prepare('SELECT * FROM monthly_payments WHERE ym = ?');
const selRecord     = db.prepare('SELECT * FROM monthly_payments WHERE ym = ? AND client_id = ?');
const insRecord     = db.prepare(`INSERT INTO monthly_payments (ym, client_id, client_name, expected_amount, paid_amount, status, paid_date, method, note)
  VALUES (@ym, @client_id, @client_name, @expected_amount, @paid_amount, @status, @paid_date, @method, @note)`);
const delMonth       = db.prepare('DELETE FROM monthly_payments WHERE ym = ?');
const delRecord      = db.prepare('DELETE FROM monthly_payments WHERE ym = ? AND client_id = ?');

const UPDATE_COLS = { expectedAmount: 'expected_amount', paidAmount: 'paid_amount', status: 'status', paidDate: 'paid_date', method: 'method', note: 'note', clientName: 'client_name' };

module.exports = {
  STATUS_VALUES,
  METHOD_VALUES,

  getAllMonths() {
    return selMonths.all().map(r => r.ym);
  },

  getMonth(ym) {
    const rows = selMonth.all(ym);
    return rows.length ? rows.map(fromRow) : null;
  },

  createMonth(ym, records) {
    const existing = selMonth.all(ym);
    if (existing.length) return { alreadyExists: true, records: existing.map(fromRow) };
    const tx = db.transaction(recs => {
      for (const r of recs) {
        insRecord.run({
          ym, client_id: r.clientId, client_name: r.clientName || '',
          expected_amount: r.expectedAmount ?? 0, paid_amount: r.paidAmount ?? 0,
          status: STATUS_VALUES.includes(r.status) ? r.status : 'pending',
          paid_date: r.paidDate ?? null, method: r.method ?? null, note: r.note ?? '',
        });
      }
    });
    tx(records);
    return { alreadyExists: false, records: selMonth.all(ym).map(fromRow) };
  },

  updateRecord(ym, clientId, patch) {
    const cid = parseInt(clientId);
    const existing = selRecord.get(ym, cid);
    if (!existing) return null;
    const sets = [];
    const params = { ym, client_id: cid };
    Object.keys(UPDATE_COLS).forEach(k => {
      if (!(k in patch)) return;
      const col = UPDATE_COLS[k];
      sets.push(`${col} = @${col}`);
      params[col] = patch[k];
    });
    if (sets.length) db.prepare(`UPDATE monthly_payments SET ${sets.join(', ')} WHERE ym = @ym AND client_id = @client_id`).run(params);
    return fromRow(selRecord.get(ym, cid));
  },

  removeRecord(ym, clientId) {
    return delRecord.run(ym, parseInt(clientId)).changes > 0;
  },

  addRecord(ym, record) {
    if (!selMonth.get(ym)) return false;
    insRecord.run({
      ym, client_id: record.clientId, client_name: record.clientName || '',
      expected_amount: record.expectedAmount ?? 0, paid_amount: record.paidAmount ?? 0,
      status: STATUS_VALUES.includes(record.status) ? record.status : 'pending',
      paid_date: record.paidDate ?? null, method: record.method ?? null, note: record.note ?? '',
    });
    return true;
  },

  syncClientName(clientId, newName) {
    const info = db.prepare('UPDATE monthly_payments SET client_name = ? WHERE client_id = ?').run(newName, clientId);
    return info.changes > 0;
  },

  // Create or update a record (upsert). Used when a "virtual" client row is first edited.
  upsertRecord(ym, clientId, data) {
    if (!selMonth.get(ym)) return null;
    const cid = parseInt(clientId);
    const { _virtual, ...d } = data;
    const existing = selRecord.get(ym, cid);
    if (existing) {
      const sets = [];
      const params = { ym, client_id: cid };
      Object.keys(UPDATE_COLS).forEach(k => {
        if (!(k in d)) return;
        const col = UPDATE_COLS[k];
        sets.push(`${col} = @${col}`);
        params[col] = d[k];
      });
      if (sets.length) db.prepare(`UPDATE monthly_payments SET ${sets.join(', ')} WHERE ym = @ym AND client_id = @client_id`).run(params);
      return fromRow(selRecord.get(ym, cid));
    }
    insRecord.run({
      ym, client_id: cid, client_name: d.clientName || '',
      expected_amount: d.expectedAmount ?? 0, paid_amount: d.paidAmount ?? 0,
      status: STATUS_VALUES.includes(d.status) ? d.status : 'pending',
      paid_date: d.paidDate ?? null, method: METHOD_VALUES.includes(d.method) ? d.method : null, note: d.note ?? '',
    });
    return fromRow(selRecord.get(ym, cid));
  },

  deleteMonth(ym) {
    return delMonth.run(ym).changes > 0;
  },
};
