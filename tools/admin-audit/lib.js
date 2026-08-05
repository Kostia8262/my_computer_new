'use strict';
/**
 * Ядро тестового харнесса для админки My Computer Academy.
 * Без внешних зависимостей — только Node 26 (глобальный fetch + node:sqlite).
 */

const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const BASE = process.env.TEST_BASE || 'http://localhost:3100';
const SUPER = process.env.TEST_SUPER || 'test_super_token_0123456789abcdef0123456789abcdef';

// Каталог с сайтами — по умолчанию рядом, в корне репозитория.
const SITES_DIR = process.env.SITES_DIR || path.join(__dirname, '..', '..', 'sites');

const results = [];
let currentGroup = 'ungrouped';

function group(name) { currentGroup = name; }

/** Один HTTP-запрос. Никогда не бросает — возвращает {status, json, text, headers}. */
async function req(method, url, { token, body, headers = {}, raw = false, base } = {}) {
  const h = { ...headers };
  if (token) h['x-admin-token'] = token;
  if (body !== undefined && !raw) h['content-type'] = 'application/json';
  let res, text;
  try {
    res = await fetch((base || BASE) + url, {
      method,
      headers: h,
      body: body === undefined ? undefined : (raw ? body : JSON.stringify(body)),
      redirect: 'manual',
    });
    text = await res.text();
  } catch (err) {
    return { status: 0, json: null, text: String(err && err.message || err), headers: new Headers(), networkError: true };
  }
  let json = null;
  try { json = JSON.parse(text); } catch { /* не JSON */ }
  return { status: res.status, json, text, headers: res.headers };
}

const get    = (u, o) => req('GET', u, o);
const post   = (u, b, o) => req('POST', u, { ...o, body: b });
const patch  = (u, b, o) => req('PATCH', u, { ...o, body: b });
const put    = (u, b, o) => req('PUT', u, { ...o, body: b });
const del    = (u, o) => req('DELETE', u, o);

/** Ассерт. severity: blocker | high | medium | low | info */
function check(name, passed, detail = '', severity = 'medium') {
  results.push({ group: currentGroup, name, passed: !!passed, detail: String(detail).slice(0, 2000), severity });
  const mark = passed ? 'PASS' : 'FAIL';
  if (!passed) console.log(`  [${mark}] ${name}${detail ? ' — ' + String(detail).slice(0, 300) : ''}`);
  return !!passed;
}

function eq(name, actual, expected, severity = 'medium') {
  return check(name, actual === expected, `ожидалось ${JSON.stringify(expected)}, получено ${JSON.stringify(actual)}`, severity);
}

/** Прямой доступ к БД сайта — для проверки, что реально записалось. */
function openDb(site = 'main') {
  const file = path.join(SITES_DIR, site, 'data', site + '.db');
  return new DatabaseSync(file, { readOnly: true });
}

function summary(label) {
  const total = results.length;
  const failed = results.filter(r => !r.passed);
  console.log('\n' + '='.repeat(70));
  console.log(`${label}: всего ${total}, провалено ${failed.length}`);
  const bySev = {};
  failed.forEach(f => { bySev[f.severity] = (bySev[f.severity] || 0) + 1; });
  Object.entries(bySev).forEach(([s, n]) => console.log(`  ${s}: ${n}`));
  console.log('='.repeat(70));
  return { total, failed };
}

function saveReport(file) {
  fs.writeFileSync(file, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Отчёт: ${file}`);
}

const uniq = (p = 'T') => `${p}_${Math.random().toString(36).slice(2, 8)}`;

module.exports = { BASE, SUPER, SITES_DIR, req, get, post, patch, put, del, check, eq, group, summary, saveReport, openDb, uniq, results };
