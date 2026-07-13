'use strict';

// One-time import: copies existing data/*.json files into the SQLite tables.
// Runs automatically on startup, but only once — guarded by migration_meta.
// Safe to leave in place permanently; on every later boot it's a no-op.

const fs   = require('fs');
const path = require('path');
const db   = require('./db');

const DATA_DIR = path.join(__dirname, '..', 'data');

function readJson(name, fallback) {
  const file = path.join(DATA_DIR, name);
  if (!fs.existsSync(file)) return fallback;
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) {
    console.error(`[migrate] ${name} exists but failed to parse — skipping import for this file:`, e.message);
    return fallback;
  }
}

function alreadyMigrated() {
  const row = db.prepare('SELECT value FROM migration_meta WHERE key = ?').get('json_import_done');
  return !!row;
}

function markMigrated() {
  db.prepare('INSERT INTO migration_meta (key, value) VALUES (?, ?)').run('json_import_done', new Date().toISOString());
}

function run() {
  if (alreadyMigrated()) return;

  const tx = db.transaction(() => {
    // ── admins ──────────────────────────────────────────────────────────────
    const admins = readJson('admins.json', []);
    const insAdmin = db.prepare(`INSERT INTO admins
      (id, name, role, token, active, hourly_rate, lesson_duration, notes, phone, payment_type, monthly_rate, created_at, updated_at)
      VALUES (@id, @name, @role, @token, @active, @hourly_rate, @lesson_duration, @notes, @phone, @payment_type, @monthly_rate, @created_at, @updated_at)`);
    for (const a of admins) {
      insAdmin.run({
        id: a.id, name: a.name || '', role: a.role || 'administrator', token: a.token,
        active: a.active === false ? 0 : 1,
        hourly_rate: a.hourlyRate ?? null, lesson_duration: a.lessonDuration ?? null,
        notes: a.notes ?? null, phone: a.phone ?? null,
        payment_type: a.paymentType ?? null, monthly_rate: a.monthlyRate ?? null,
        created_at: a.createdAt || new Date().toISOString(), updated_at: a.updatedAt ?? null,
      });
    }

    // ── articles ────────────────────────────────────────────────────────────
    const articles = readJson('articles.json', []);
    const insArticle = db.prepare(`INSERT INTO articles
      (slug, title, title_ru, excerpt, excerpt_ru, content, content_ru, category, cover_emoji, author, published_at, active, sort_order)
      VALUES (@slug, @title, @title_ru, @excerpt, @excerpt_ru, @content, @content_ru, @category, @cover_emoji, @author, @published_at, @active, @sort_order)`);
    articles.forEach((a, i) => {
      insArticle.run({
        slug: a.slug, title: a.title || '', title_ru: a.title_ru || '',
        excerpt: a.excerpt || '', excerpt_ru: a.excerpt_ru || '',
        content: a.content || '', content_ru: a.content_ru || '',
        category: a.category || 'навчання', cover_emoji: a.coverEmoji || '📄',
        author: a.author || 'My Computer Academy',
        published_at: a.publishedAt || new Date().toISOString().slice(0, 10),
        active: a.active === false ? 0 : 1, sort_order: i,
      });
    });

    // ── courses ─────────────────────────────────────────────────────────────
    const courses = readJson('courses.json', []);
    const insCourse = db.prepare(`INSERT INTO courses
      (id, name, name_ru, emoji, age, age_group, duration, lessons_count, group_size, price, description, description_ru, features, popular, color, active, curriculum, sort_order)
      VALUES (@id, @name, @name_ru, @emoji, @age, @age_group, @duration, @lessons_count, @group_size, @price, @description, @description_ru, @features, @popular, @color, @active, @curriculum, @sort_order)`);
    courses.forEach((c, i) => {
      insCourse.run({
        id: c.id, name: c.name || '', name_ru: c.name_ru || '', emoji: c.emoji || '📚',
        age: c.age || '', age_group: c.age_group || '', duration: c.duration || '',
        lessons_count: c.lessonsCount || 0, group_size: c.groupSize || 0, price: c.price || 0,
        description: c.description || '', description_ru: c.description_ru || '',
        features: JSON.stringify(c.features || []), popular: c.popular ? 1 : 0,
        color: c.color || '#E2604A', active: c.active === false ? 0 : 1,
        curriculum: JSON.stringify(c.curriculum || []), sort_order: i,
      });
    });

    // ── clients ─────────────────────────────────────────────────────────────
    const clients = readJson('clients.json', []);
    const insClient = db.prepare(`INSERT INTO clients
      (id, name, age, course, phone, email, status, source, enrolled_date, trial_date, last_contact, next_contact,
       monthly_fee, total_paid, notes, manager, teacher, schedule, schedule_days, lesson_type, city, source_lead_id, created_at, updated_at)
      VALUES (@id, @name, @age, @course, @phone, @email, @status, @source, @enrolled_date, @trial_date, @last_contact, @next_contact,
       @monthly_fee, @total_paid, @notes, @manager, @teacher, @schedule, @schedule_days, @lesson_type, @city, @source_lead_id, @created_at, @updated_at)`);
    for (const c of clients) {
      insClient.run({
        id: c.id, name: c.name || '', age: c.age ?? null, course: c.course ?? null,
        phone: c.phone || '', email: c.email ?? null, status: c.status || 'new', source: c.source || 'website',
        enrolled_date: c.enrolledDate ?? null, trial_date: c.trialDate ?? null,
        last_contact: c.lastContact ?? null, next_contact: c.nextContact ?? null,
        monthly_fee: c.monthlyFee ?? null, total_paid: c.totalPaid ?? null,
        notes: c.notes || '', manager: c.manager || '', teacher: c.teacher || '',
        schedule: c.schedule || '', schedule_days: JSON.stringify(c.scheduleDays || []),
        lesson_type: c.lessonType || 'group', city: c.city || '', source_lead_id: c.sourceLeadId ?? null,
        created_at: c.createdAt || new Date().toISOString(), updated_at: c.updatedAt || new Date().toISOString(),
      });
    }

    // ── attendance ──────────────────────────────────────────────────────────
    const attendance = readJson('attendance.json', {});
    const insAtt = db.prepare('INSERT INTO attendance (client_id, date, status) VALUES (?, ?, ?)');
    for (const clientId of Object.keys(attendance)) {
      for (const date of Object.keys(attendance[clientId])) {
        insAtt.run(parseInt(clientId), date, attendance[clientId][date]);
      }
    }

    // ── leads ───────────────────────────────────────────────────────────────
    const leads = readJson('leads.json', []);
    const insLead = db.prepare(`INSERT INTO leads
      (id, child_name, age, course, source, phone, email, status, notes, teacher, schedule, created_at, updated_at)
      VALUES (@id, @child_name, @age, @course, @source, @phone, @email, @status, @notes, @teacher, @schedule, @created_at, @updated_at)`);
    for (const l of leads) {
      insLead.run({
        id: l.id, child_name: l.child_name || '', age: l.age ?? null, course: l.course ?? null,
        source: l.source ?? null, phone: l.phone || '', email: l.email ?? null,
        status: l.status || 'new', notes: l.notes ?? null, teacher: l.teacher ?? null, schedule: l.schedule ?? null,
        created_at: l.created_at || new Date().toISOString(), updated_at: l.updated_at || new Date().toISOString(),
      });
    }

    // ── payments ────────────────────────────────────────────────────────────
    const payments = readJson('payments.json', []);
    const insPayment = db.prepare(`INSERT INTO payments (id, client_id, amount, date, method, note, created_at)
      VALUES (@id, @client_id, @amount, @date, @method, @note, @created_at)`);
    for (const p of payments) {
      insPayment.run({
        id: p.id, client_id: p.clientId, amount: p.amount || 0,
        date: p.date || new Date().toISOString().slice(0, 10),
        method: p.method || 'other', note: p.note || '',
        created_at: p.createdAt || new Date().toISOString(),
      });
    }

    // ── mono_invoices ───────────────────────────────────────────────────────
    const monoInvoices = readJson('mono-invoices.json', []);
    const insMono = db.prepare(`INSERT INTO mono_invoices
      (invoice_id, status, amount, final_amount, description, reference, created_at, updated_at)
      VALUES (@invoice_id, @status, @amount, @final_amount, @description, @reference, @created_at, @updated_at)`);
    for (const m of monoInvoices) {
      insMono.run({
        invoice_id: m.invoiceId, status: m.status || 'created', amount: m.amount ?? null,
        final_amount: m.finalAmount ?? null, description: m.description || '', reference: m.reference || '',
        created_at: m.createdAt || new Date().toISOString(), updated_at: m.updatedAt || new Date().toISOString(),
      });
    }

    // ── monthly_payments ────────────────────────────────────────────────────
    const monthlyPayments = readJson('monthly-payments.json', {});
    const insMp = db.prepare(`INSERT INTO monthly_payments
      (ym, client_id, client_name, expected_amount, paid_amount, status, paid_date, method, note)
      VALUES (@ym, @client_id, @client_name, @expected_amount, @paid_amount, @status, @paid_date, @method, @note)`);
    for (const ym of Object.keys(monthlyPayments)) {
      for (const r of monthlyPayments[ym]) {
        insMp.run({
          ym, client_id: r.clientId, client_name: r.clientName || '',
          expected_amount: r.expectedAmount ?? 0, paid_amount: r.paidAmount ?? 0,
          status: r.status || 'pending', paid_date: r.paidDate ?? null,
          method: r.method ?? null, note: r.note ?? '',
        });
      }
    }

    // ── reviews ─────────────────────────────────────────────────────────────
    const reviews = readJson('reviews.json', []);
    const insReview = db.prepare(`INSERT INTO reviews (id, name, initials, role, text, rating, active, created_at, updated_at)
      VALUES (@id, @name, @initials, @role, @text, @rating, @active, @created_at, @updated_at)`);
    for (const r of reviews) {
      insReview.run({
        id: r.id, name: r.name || '', initials: r.initials || '', role: r.role || '',
        text: r.text || '', rating: r.rating || 5, active: r.active === false ? 0 : 1,
        created_at: r.createdAt || new Date().toISOString(), updated_at: r.updatedAt ?? null,
      });
    }

    // ── content_kv (misc CMS/SEO blob) ─────────────────────────────────────
    const content = readJson('content.json', null);
    if (content) {
      db.prepare('INSERT INTO content_kv (id, data) VALUES (1, ?)').run(JSON.stringify(content));
    }

    markMigrated();
  });

  tx();
  console.log('[migrate] JSON → SQLite import complete.');
}

module.exports = { run };
