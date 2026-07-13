'use strict';

const db = require('./db');

function fromRow(row) {
  if (!row) return null;
  return {
    invoiceId: row.invoice_id, status: row.status, amount: row.amount,
    finalAmount: row.final_amount, description: row.description, reference: row.reference,
    createdAt: row.created_at, updatedAt: row.updated_at,
  };
}

const selAll  = db.prepare('SELECT * FROM mono_invoices ORDER BY created_at DESC');
const selById = db.prepare('SELECT * FROM mono_invoices WHERE invoice_id = ?');
const insInv  = db.prepare(`INSERT INTO mono_invoices (invoice_id, status, amount, final_amount, description, reference, created_at, updated_at)
  VALUES (@invoice_id, 'created', @amount, NULL, @description, '', @created_at, @updated_at)`);

module.exports = {
  // Called when invoice is created
  create(data) {
    if (selById.get(data.invoiceId)) return;
    const now = new Date().toISOString();
    insInv.run({
      invoice_id: data.invoiceId,
      amount: data.amount,
      description: data.description || '',
      created_at: now,
      updated_at: now,
    });
  },

  // Called on webhook — idempotent upsert
  upsert(data) {
    const existing = selById.get(data.invoiceId);
    const now = new Date().toISOString();
    if (existing) {
      db.prepare(`UPDATE mono_invoices SET status = ?, final_amount = COALESCE(?, final_amount), reference = COALESCE(NULLIF(?, ''), reference), updated_at = ? WHERE invoice_id = ?`)
        .run(data.status, data.finalAmount ?? null, data.reference || '', now, data.invoiceId);
      return fromRow(selById.get(data.invoiceId));
    }
    db.prepare(`INSERT INTO mono_invoices (invoice_id, status, amount, final_amount, description, reference, created_at, updated_at)
      VALUES (?, ?, ?, ?, '', ?, ?, ?)`)
      .run(data.invoiceId, data.status, data.amount, data.finalAmount ?? null, data.reference || '', now, now);
    return fromRow(selById.get(data.invoiceId));
  },

  getAll()         { return selAll.all().map(fromRow); },
  getByInvoice(id) { return id ? fromRow(selById.get(id)) : null; },
};
