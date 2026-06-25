'use strict';

const https  = require('https');
const crypto = require('crypto');

const WFP_URL = 'https://api.wayforpay.com/api';

// HMAC-MD5 signature over fields joined with ';'
function sign(...fields) {
  const str = fields.join(';');
  return crypto.createHmac('md5', process.env.WFP_SECRET || '').update(str).digest('hex');
}

// Create a hosted payment page URL by POSTing to WayForPay and getting back a redirect
// WayForPay "Purchase" flow: server builds signed params, returns them to client,
// client POSTs a hidden form to api.wayforpay.com → hosted checkout page opens.
function buildPurchaseParams({ amountUah, description, orderRef }) {
  const merchant    = process.env.WFP_MERCHANT;
  const secret      = process.env.WFP_SECRET;
  if (!merchant || !secret) throw new Error('WFP_MERCHANT or WFP_SECRET not configured');

  const domain      = (process.env.SITE_URL || 'https://mycomputer.education').replace(/^https?:\/\//, '');
  const orderDate   = Math.floor(Date.now() / 1000);
  const amount      = amountUah.toFixed(2);
  const currency    = 'UAH';
  const productName = description || 'Оплата навчання My Computer Academy';
  const productCount = '1';
  const productPrice = amount;

  const baseUrl = process.env.SITE_URL || 'https://mycomputer.education';

  // Signature string per WayForPay docs
  const signature = sign(
    merchant, domain, orderRef, orderDate, amount, currency,
    productName, productCount, productPrice
  );

  return {
    transactionType:    'CREATE_INVOICE',
    merchantAccount:    merchant,
    merchantDomainName: domain,
    merchantSignature:  signature,
    apiVersion:         '1',
    language:           'UA',
    returnUrl:          `${baseUrl}/payment/success`,
    serviceUrl:         `${baseUrl}/api/payment/wfp-webhook`,
    orderReference:     orderRef,
    orderDate:          String(orderDate),
    amount,
    currency,
    productName:        [productName],
    productCount:       [productCount],
    productPrice:       [productPrice],
  };
}

// Verify WayForPay webhook signature
// Signature fields: merchantAccount;orderReference;amount;currency;authCode;cardPan;transactionStatus;reasonCode
function verifyWebhook(body) {
  const secret = process.env.WFP_SECRET;
  if (!secret) return false;
  try {
    const { merchantAccount, orderReference, amount, currency,
            authCode = '', cardPan = '', transactionStatus, reasonCode,
            merchantSignature } = body;
    const expected = sign(merchantAccount, orderReference, amount, currency,
                          authCode, cardPan, transactionStatus, reasonCode);
    return expected === merchantSignature;
  } catch {
    return false;
  }
}

// Response signature for webhook reply
function buildWebhookResponse(orderRef, status) {
  const time = Math.floor(Date.now() / 1000);
  const sig  = sign(orderRef, status, time);
  return { orderReference: orderRef, status, time, signature: sig };
}

// Server-side invoice creation: POSTs signed params to WayForPay, returns invoiceUrl for client redirect
function createInvoice({ amountUah, description, orderRef }) {
  return new Promise((resolve, reject) => {
    const params = buildPurchaseParams({ amountUah, description, orderRef });
    const body   = JSON.stringify(params);
    const req    = https.request(
      {
        hostname: 'api.wayforpay.com',
        path:     '/api',
        method:   'POST',
        headers:  { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => { data += c; });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.invoiceUrl) resolve({ invoiceUrl: json.invoiceUrl });
            else reject(new Error(json.reason || String(json.reasonCode) || 'WayForPay error'));
          } catch (e) { reject(e); }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

module.exports = { buildPurchaseParams, createInvoice, verifyWebhook, buildWebhookResponse };
