'use strict';

const fs   = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE  = path.join(DATA_DIR, 'roblox.db');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(DB_FILE);

// WAL mode: writes go to a separate log first, so a crash mid-write can never
// leave the main database file truncated/corrupted — SQLite replays or
// discards the incomplete entry automatically on next open.
// node:sqlite has no .pragma() convenience method (unlike better-sqlite3) —
// PRAGMA statements go through plain .exec() instead.
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA synchronous = NORMAL');
db.exec('PRAGMA foreign_keys = ON');

// node:sqlite has no .transaction() helper (unlike better-sqlite3) — this
// shim restores the same API (`db.transaction(fn)` returns a callable that
// runs fn wrapped in BEGIN/COMMIT/ROLLBACK) so migrate-json-to-sqlite.js and
// monthly-payments.js don't need to change at all.
db.transaction = function (fn) {
  return function (...args) {
    db.exec('BEGIN');
    try {
      const result = fn(...args);
      db.exec('COMMIT');
      return result;
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
  };
};

db.exec(`
CREATE TABLE IF NOT EXISTS admins (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT NOT NULL,
  role            TEXT NOT NULL,
  token           TEXT UNIQUE NOT NULL,
  active          INTEGER NOT NULL DEFAULT 1,
  hourly_rate     REAL,
  lesson_duration INTEGER,
  notes           TEXT,
  phone           TEXT,
  payment_type    TEXT,
  monthly_rate    REAL,
  created_at      TEXT NOT NULL,
  updated_at      TEXT
);
CREATE INDEX IF NOT EXISTS idx_admins_token ON admins(token);

CREATE TABLE IF NOT EXISTS articles (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL DEFAULT '',
  excerpt      TEXT NOT NULL DEFAULT '',
  content      TEXT NOT NULL DEFAULT '',
  category     TEXT NOT NULL DEFAULT 'навчання',
  cover_emoji  TEXT NOT NULL DEFAULT '📄',
  author       TEXT NOT NULL DEFAULT 'My Computer Academy',
  published_at TEXT NOT NULL,
  active       INTEGER NOT NULL DEFAULT 1,
  sort_order   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Leaner than main/design's courses table — no name_ru/age_group/description_ru/
-- features/popular, matching this landing's actual courses.js field set.
CREATE TABLE IF NOT EXISTS courses (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL DEFAULT '',
  emoji           TEXT NOT NULL DEFAULT '📚',
  age             TEXT NOT NULL DEFAULT '',
  duration        TEXT NOT NULL DEFAULT '',
  lessons_count   INTEGER NOT NULL DEFAULT 0,
  group_size      INTEGER NOT NULL DEFAULT 0,
  price           REAL NOT NULL DEFAULT 0,
  description     TEXT NOT NULL DEFAULT '',
  color           TEXT NOT NULL DEFAULT '#6C47FF',
  active          INTEGER NOT NULL DEFAULT 1,
  curriculum      TEXT NOT NULL DEFAULT '[]',
  sort_order      INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS clients (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL DEFAULT '',
  age            INTEGER,
  course         TEXT,
  phone          TEXT NOT NULL DEFAULT '',
  email          TEXT,
  status         TEXT NOT NULL DEFAULT 'new',
  source         TEXT NOT NULL DEFAULT 'website',
  enrolled_date  TEXT,
  trial_date     TEXT,
  last_contact   TEXT,
  next_contact   TEXT,
  monthly_fee    REAL,
  total_paid     REAL,
  notes          TEXT NOT NULL DEFAULT '',
  manager        TEXT NOT NULL DEFAULT '',
  teacher        TEXT NOT NULL DEFAULT '',
  schedule       TEXT NOT NULL DEFAULT '',
  schedule_days  TEXT NOT NULL DEFAULT '[]',
  lesson_type    TEXT NOT NULL DEFAULT 'group',
  city           TEXT NOT NULL DEFAULT '',
  source_lead_id INTEGER,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance (
  client_id INTEGER NOT NULL,
  date      TEXT NOT NULL,
  status    TEXT NOT NULL,
  PRIMARY KEY (client_id, date)
);

CREATE TABLE IF NOT EXISTS leads (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  child_name TEXT NOT NULL,
  age        INTEGER,
  course     TEXT,
  source     TEXT,
  phone      TEXT NOT NULL,
  email      TEXT,
  status     TEXT NOT NULL DEFAULT 'new',
  notes      TEXT,
  teacher    TEXT,
  schedule   TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);

CREATE TABLE IF NOT EXISTS payments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id  INTEGER NOT NULL,
  amount     REAL NOT NULL DEFAULT 0,
  date       TEXT NOT NULL,
  method     TEXT NOT NULL DEFAULT 'other',
  note       TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_payments_client ON payments(client_id);

CREATE TABLE IF NOT EXISTS monthly_payments (
  ym              TEXT NOT NULL,
  client_id       INTEGER NOT NULL,
  client_name     TEXT NOT NULL DEFAULT '',
  expected_amount REAL NOT NULL DEFAULT 0,
  paid_amount     REAL NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'pending',
  paid_date       TEXT,
  method          TEXT,
  note            TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (ym, client_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL DEFAULT '',
  initials   TEXT NOT NULL DEFAULT '',
  role       TEXT NOT NULL DEFAULT '',
  text       TEXT NOT NULL DEFAULT '',
  rating     INTEGER NOT NULL DEFAULT 5,
  active     INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT
);

-- Free-form CMS/SEO overrides blob (loadContent/saveContent in server.js) —
-- genuinely unstructured, kept as JSON.
CREATE TABLE IF NOT EXISTS content_kv (
  id   INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL
);

-- Tracks whether the one-time JSON import has already run, so it's never repeated.
CREATE TABLE IF NOT EXISTS migration_meta (
  key   TEXT PRIMARY KEY,
  value TEXT
);
`);

// Adds RU translation columns to an already-existing articles table (this
// site was single-language at first migration time). SQLite has no
// "ADD COLUMN IF NOT EXISTS", so each ALTER is wrapped and duplicate-column
// errors are swallowed — safe to run on every boot.
for (const col of ['title_ru', 'excerpt_ru', 'content_ru']) {
  try {
    db.exec(`ALTER TABLE articles ADD COLUMN ${col} TEXT NOT NULL DEFAULT ''`);
  } catch (e) {
    if (!/duplicate column/i.test(e.message)) throw e;
  }
}

module.exports = db;
