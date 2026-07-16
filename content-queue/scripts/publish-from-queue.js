'use strict';
// Runs ON THE VPS (invoked over SSH by .github/workflows/publish-queued-articles.yml).
// Reads every *.json file in the given directory, calls the site's own articles.js
// create() for each — the exact same code path the admin panel itself uses — and
// prints one result line per file so the calling workflow can tell which succeeded.
//
// Usage: node publish-from-queue.js /tmp/content-queue-incoming

const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node publish-from-queue.js <dir-of-article-json-files>');
  process.exit(1);
}

const articlesDb = require('/var/www/mycomputer-new/sites/main/server/articles.js');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
if (!files.length) {
  console.log('NO_FILES');
  process.exit(0);
}

for (const file of files) {
  const full = path.join(dir, file);
  let article;
  try {
    article = JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (e) {
    console.log(`RESULT ${file} PARSE_ERROR ${e.message}`);
    continue;
  }
  if (!article.slug || !article.title || !article.content || !article.content_ru) {
    console.log(`RESULT ${file} MISSING_FIELDS`);
    continue;
  }
  const existing = articlesDb.getBySlug(article.slug);
  if (existing) {
    console.log(`RESULT ${file} SKIP_EXISTS id=${existing.id}`);
    continue;
  }
  const created = articlesDb.create(article);
  if (!created) {
    console.log(`RESULT ${file} CREATE_FAILED`);
    continue;
  }
  console.log(`RESULT ${file} CREATED id=${created.id} slug=${created.slug}`);
}
