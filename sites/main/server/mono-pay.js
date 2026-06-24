'use strict';

const https = require('https');

function monoRequest(path, body) {
  return new Promise((resolve, reject) => {
    const token = process.env.MONO_TOKEN;
    if (!token) return reject(new Error('MONO_TOKEN not configured'));

    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.monobank.ua',
      path,
      method: 'POST',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, (res) => {
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
    req.write(data);
    req.end();
  });
}

// amountUah — сума в гривнях, повертає { invoiceId, pageUrl }
async function createInvoice({ amountUah, description }) {
  const amount = Math.round(amountUah * 100);
  if (amount < 100) throw new Error('Мінімальна сума — 1 грн');
  if (amount > 10_000_000) throw new Error('Максимальна сума — 100 000 грн');

  const baseUrl = process.env.SITE_URL || 'https://mycomputer.education';
  const dest    = description || 'Оплата навчання My Computer Academy';

  return monoRequest('/api/merchant/invoice/create', {
    amount,
    ccy: 980,
    merchantPaymInfo: {
      destination: dest,
      comment: dest,
    },
    redirectUrl: `${baseUrl}/payment/success`,
    failUrl:     `${baseUrl}/payment/fail`,
    webHookUrl:  `${baseUrl}/api/payment/webhook`,
    validity: 3600,
  });
}

module.exports = { createInvoice };
