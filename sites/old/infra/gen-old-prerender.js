// Full prerender generator for old.mycomputer.education — homepage AND
// every course page. Renders the ACTUAL pages with a headless browser and
// captures the real DOM output, so every visitor — not just crawlers —
// gets fast, pre-painted content instead of waiting for the SPA to boot +
// fetch its data before anything appears.
//
// Supersedes the old bot-only text-stub course generator: that one only
// wrote SEO metadata (title/h1/specs) for crawler user-agents, while real
// visitors still hit the empty CSR shell. This writes the same real markup
// real users get, and vhconf.conf now serves it to everyone.
//
// The client bundle then hydrates onto this markup (see src/index.js) —
// no visible flash, no duplicate work beyond React's normal reconciliation.
//
// Writes ONLY under <clientDir>/prerender/, one page at a time via a temp
// file + atomic rename, so a failed/partial run can never serve a broken
// page and a single bad course page can't take down the others (or home).
// Read-only against the public site — no writes to Django/DB.
//
// Usage: node gen-old-prerender.js <clientDir>
// clientDir is the deployed client docroot, e.g.
// /usr/local/lsws/old.mycomputer.education/html/client

const fs = require('fs');
const path = require('path');
const https = require('https');
const puppeteer = require('puppeteer');

const BASE = 'https://old.mycomputer.education';
const clientDir = process.argv[2];
if (!clientDir) {
  console.error('FATAL: usage: node gen-old-prerender.js <clientDir>');
  process.exit(1);
}
const templatePath = path.join(clientDir, 'index.html');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { timeout: 15000 }, res => {
      if (res.statusCode !== 200) { res.resume(); return resolve(null); }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null)).on('timeout', function () { this.destroy(); resolve(null); });
  });
}

function stripPreloaderDiv(html) {
  const openTag = '<div class="preloader">';
  const start = html.indexOf(openTag);
  if (start === -1) return html;

  // The preloader div nests two child divs (icon A / icon B), so a
  // non-greedy `[\s\S]*?<\/div>` regex stops at the FIRST closing tag
  // (icon A's) and leaves icon B's div plus the outer closing </div>
  // behind as orphaned markup — that stray, unstyled "ACADEMY" text is
  // exactly what real visitors were seeing on every page. Track nesting
  // depth instead so the whole block, however it's nested, is removed.
  const tagRe = /<div\b[^>]*>|<\/div>/g;
  tagRe.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tagRe.exec(html))) {
    if (match[0] === '</div>') {
      depth--;
    } else {
      depth++;
    }
    if (depth === 0) {
      return html.slice(0, start) + html.slice(tagRe.lastIndex);
    }
  }
  return html; // unbalanced markup — leave untouched rather than corrupt it
}

function writeSnapshot(outPath, rootHtml, template) {
  let doc = template;
  // Drop the preloader — the snapshot already has real content, a loading
  // spinner would only hide it behind an unnecessary extra step.
  doc = stripPreloaderDiv(doc);
  doc = doc.replace(/<script src="\/js\/preloader\.js"><\/script>/, '');
  doc = doc.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const tmpPath = outPath + '.tmp';
  fs.writeFileSync(tmpPath, doc, 'utf8');
  fs.renameSync(tmpPath, outPath);
  return doc.length;
}

async function snapshotPage(page, url, waitSelector) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
  await page.waitForSelector(waitSelector, { timeout: 15000 });
  const html = await page.$eval('#root', el => el.innerHTML);
  if (!html || html.length < 500) {
    throw new Error(`captured #root content looks too small (${html?.length ?? 0} bytes)`);
  }
  return html;
}

async function run() {
  if (!fs.existsSync(templatePath)) {
    console.error('FATAL: template not found at', templatePath);
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf8');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let homeOk = false;
  let written = 0, failed = 0;

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // --- Homepage ---
    try {
      const html = await snapshotPage(page, BASE + '/', '#root .header__text h1');
      const bytes = writeSnapshot(path.join(clientDir, 'prerender', 'home.html'), html, template);
      console.log(`home: wrote ${bytes} bytes`);
      homeOk = true;
    } catch (e) {
      console.error('home: FAILED —', e.message);
    }

    // --- Course pages ---
    const list = await fetchJson(`${BASE}/api/`);
    if (!list) {
      console.error('course list: FATAL — could not fetch', `${BASE}/api/`);
    } else {
      console.log(`course list: ${list.length} active courses`);
      for (const c of list) {
        if (!c.id) continue;
        const url = `${BASE}/course/${c.id}/`;
        try {
          const html = await snapshotPage(page, url, '#root .header__text h1');
          const bytes = writeSnapshot(
            path.join(clientDir, 'prerender', 'course', `${c.id}.html`),
            html,
            template
          );
          console.log(`course/${c.id}: wrote ${bytes} bytes`);
          written++;
        } catch (e) {
          console.error(`course/${c.id}: FAILED —`, e.message);
          failed++;
        }
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`Done. home: ${homeOk ? 'ok' : 'FAILED'}, courses written: ${written}, failed: ${failed}`);
  if (!homeOk && failed > 0 && written === 0) process.exit(1);
}

run().catch(e => {
  console.error('FATAL:', e.message);
  process.exit(1);
});
