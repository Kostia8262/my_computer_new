'use strict';

const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'mono-invoices.json');

if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

function load() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return []; }
}
function save(data) { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8'); }

module.exports = {
  // Called when invoice is created
  create(data) {
    const records = load();
    if (records.find(r => r.invoiceId === data.invoiceId)) return;
    records.unshift({
      invoiceId:   data.invoiceId,
      status:      'created',
      amount:      data.amount,
      finalAmount: null,
      description: data.description || '',
      reference:   '',
      createdAt:   new Date().toISOString(),
      updatedAt:   new Date().toISOString(),
    });
    save(records);
  },

  // Called on webhook — idempotent upsert
  upsert(data) {
    const records = load();
    const idx     = records.findIndex(r => r.invoiceId === data.invoiceId);
    const now     = new Date().toISOString();
    if (idx >= 0) {
      records[idx] = {
        ...records[idx],
        status:      data.status,
        finalAmount: data.finalAmount ?? records[idx].finalAmount,
        reference:   data.reference   || records[idx].reference,
        updatedAt:   now,
      };
      save(records);
      return records[idx];
    }
    const record = {
      invoiceId:   data.invoiceId,
      status:      data.status,
      amount:      data.amount,
      finalAmount: data.finalAmount ?? null,
      description: '',
      reference:   data.reference || '',
      createdAt:   now,
      updatedAt:   now,
    };
    records.unshift(record);
    save(records);
    return record;
  },

  getAll()         { return load(); },
  getByInvoice(id) { return load().find(r => r.invoiceId === id) || null; },
};
