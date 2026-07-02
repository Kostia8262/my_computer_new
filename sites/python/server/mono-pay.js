'use strict';

const https  = require('https');
const crypto = require('crypto');

// ── HTTP helpers ──────────────────────────────────────────────────────────────

function monoRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const token = process.env.MONO_TOKEN;
    if (!token) return reject(new Error('MONO_TOKEN not configured'));

    const data    = body ? JSON.stringify(body) : null;
    const headers = { 'X-Token': token };
    if (data) {
      headers['Content-Type']   = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = https.request({ hostname: 'api.monobank.ua', path, method, headers }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          if (res.statusCode >= 400) {
            return reject(new Error(parsed.errText || `Monobank error ${res.statusCode}`));
          }
          resolve(parsed);
        } catch {
          reject(new Error('Invalid response from Monobank'));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// ── Public key cache (for webhook signature verification) ─────────────────────

let _pubKeyPem   = null;
let _pubKeyFetch = 0;
const PUB_KEY_TTL = 24 * 60 * 60 * 1000;

async function getPublicKey() {
  if (_pubKeyPem && Date.now() - _pubKeyFetch < PUB_KEY_TTL) return _pubKeyPem;
  const data   = await monoRequest('GET', '/api/merchant/pubkey', null);
  _pubKeyPem   = `-----BEGIN PUBLIC KEY-----\n${data.key}\n-----END PUBLIC KEY-----`;
  _pubKeyFetch = Date.now();
  return _pubKeyPem;
}

getPublicKey().catch(err => console.warn('[MONO] Could not pre-fetch pubkey:', err.message));

// ── Webhook signature verification ────────────────────────────────────────────

function verifyWebhook(rawBodyBuffer, xSign) {
  if (!_pubKeyPem || !xSign) return false;
  try {
    const verify = crypto.createVerify('SHA256');
    verify.update(rawBodyBuffer);
    return verify.verify(
      { key: _pubKeyPem, dsaEncoding: 'ieee-p1363' },
      Buffer.from(xSign, 'base64')
    );
  } catch {
    return false;
  }
}

// ── Invoice creation ──────────────────────────────────────────────────────────

async function createInvoice({ amountUah, description }) {
  const amount = Math.round(amountUah * 100);
  if (amount < 100)        throw new Error('Мінімальна сума — 1 грн');
  if (amount > 10_000_000) throw new Error('Максимальна сума — 100 000 грн');

  const baseUrl = process.env.SITE_URL || 'https://mycomputer.education';
  const dest    = description || 'Оплата навчання My Computer Academy';

  return monoRequest('POST', '/api/merchant/invoice/create', {
    amount,
    ccy: 980,
    merchantPaymInfo: { destination: dest, comment: dest },
    redirectUrl: `${baseUrl}/payment/success`,
    failUrl:     `${baseUrl}/payment/fail`,
    webHookUrl:  `${baseUrl}/api/payment/webhook`,
    validity: 3600,
  });
}

module.exports = { createInvoice, verifyWebhook, getPublicKey };
