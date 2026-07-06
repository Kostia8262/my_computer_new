'use strict';

/**
 * Email notifications for new leads.
 * Requires nodemailer + Gmail App Password in .env.
 *
 * Gmail setup:
 *   1. Enable 2-Step Verification on Google account
 *   2. Go to myaccount.google.com → Security → App passwords
 *   3. Create App Password → copy 16-char code → paste as SMTP_PASS in .env
 */

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const nodemailer = require('nodemailer');

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

const COURSE_NAMES = {
  pc:            'Базовий ПК (6–10 років)',
  graphic:       'Графіка та ілюстрація (6–12 років)',
  blog:          'Блог та сайт (12–17 років)',
  'ui-ux':       'UI/UX дизайн (12–18 років)',
  animation:     'Анімація (8–14 років)',
  '3d-interior': "3D-інтер'єри (12–18 років)",
  '3d-blender':  '3D у Blender (10–16 років)',
  drawing:       'Цифровий рисунок (6–12 років)',
  branding:      'Брендинг (12–18 років)',
  'ai-design':   'AI-дизайн (12–18 років)',
  help:          'Допоможіть обрати',
};

/**
 * Send notification email for a new lead.
 * Fails silently — lead is already saved to DB regardless.
 */
async function sendLeadNotification(lead) {
  const t = getTransporter();
  if (!t) return;

  const to   = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  const from = `"My Computer Academy" <${process.env.SMTP_USER}>`;

  const courseName = COURSE_NAMES[lead.course] || lead.course || '—';
  const time       = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' });

  const html = `
<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">
    <div style="background:#6C47FF;padding:20px 28px">
      <h2 style="color:#fff;margin:0;font-size:18px">🎓 Нова заявка — My Computer Academy</h2>
    </div>
    <div style="padding:24px 28px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#888;width:140px">Ім'я дитини</td><td style="padding:8px 0;font-weight:600">${lead.child_name}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Вік</td><td style="padding:8px 0">${lead.age || '—'} років</td></tr>
        <tr><td style="padding:8px 0;color:#888">Курс</td><td style="padding:8px 0">${courseName}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Телефон</td><td style="padding:8px 0"><strong><a href="tel:${lead.phone}" style="color:#6C47FF;text-decoration:none">${lead.phone}</a></strong></td></tr>
        <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0">${lead.email ? `<a href="mailto:${lead.email}" style="color:#6C47FF">${lead.email}</a>` : '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Заявка №</td><td style="padding:8px 0">#${lead.id}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Час</td><td style="padding:8px 0">${time}</td></tr>
      </table>
    </div>
    <div style="background:#f9f7ff;padding:16px 28px;border-top:1px solid #eee">
      <p style="margin:0;color:#888;font-size:13px">Передзвоніть протягом 30 хвилин 📞</p>
    </div>
  </div>
</body>
</html>`;

  const text = `Нова заявка #${lead.id}
Дитина: ${lead.child_name}, ${lead.age || '—'} років
Курс: ${courseName}
Телефон: ${lead.phone}
Email: ${lead.email || '—'}
Час: ${time}`;

  try {
    await t.sendMail({
      from,
      to,
      subject: `📩 Нова заявка: ${lead.child_name} — ${courseName}`,
      text,
      html,
    });
    console.log(`[MAIL] Notification sent to ${to} for lead #${lead.id}`);
  } catch (err) {
    console.error(`[MAIL ERROR] Failed to send notification:`, err.message);
  }
}

async function sendPaymentNotification({ provider, amount, description, orderId, status }) {
  const t = getTransporter();
  if (!t) return;

  const to   = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  const from = `"My Computer Academy" <${process.env.SMTP_USER}>`;
  const time = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' });
  const providerLabel = provider === 'mono' ? 'Monobank (plata)' : 'WayForPay';
  const amountStr = amount ? `${(amount / (provider === 'mono' ? 100 : 1)).toFixed(2)} грн` : '—';

  const html = `
<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">
    <div style="background:#00b14f;padding:20px 28px">
      <h2 style="color:#fff;margin:0;font-size:18px">💳 Нова оплата — My Computer Academy</h2>
    </div>
    <div style="padding:24px 28px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#888;width:140px">Сума</td><td style="padding:8px 0;font-weight:600;font-size:18px">${amountStr}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Призначення</td><td style="padding:8px 0">${description || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Платіжна система</td><td style="padding:8px 0">${providerLabel}</td></tr>
        <tr><td style="padding:8px 0;color:#888">ID замовлення</td><td style="padding:8px 0;font-size:12px;color:#888">${orderId || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Час</td><td style="padding:8px 0">${time}</td></tr>
      </table>
    </div>
  </div>
</body>
</html>`;

  const text = `Нова оплата: ${amountStr}\nПризначення: ${description || '—'}\nСистема: ${providerLabel}\nID: ${orderId || '—'}\nЧас: ${time}`;

  try {
    await t.sendMail({
      from, to,
      subject: `💳 Оплата ${amountStr} — ${description || 'My Computer Academy'}`,
      text, html,
    });
    console.log(`[MAIL] Payment notification sent to ${to} — ${amountStr} via ${providerLabel}`);
  } catch (err) {
    console.error(`[MAIL ERROR] Payment notification failed:`, err.message);
  }
}

module.exports = { sendLeadNotification, sendPaymentNotification };
