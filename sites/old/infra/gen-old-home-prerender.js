// Homepage prerender generator for old.mycomputer.education.
//
// Unlike gen-old-prerender.js (SEO-text-only stubs for bots on /course/:id),
// this renders the ACTUAL homepage with a headless browser and captures the
// real DOM output, so every visitor — not just crawlers — gets fast,
// pre-painted content instead of waiting for the SPA to boot + fetch
// courses/posts/discounts before anything appears.
//
// The client bundle then hydrates onto this markup (see src/index.js) —
// no visible flash, no duplicate work beyond React's normal reconciliation.
//
// Writes ONLY to <docroot>/client/prerender/home.html via a temp file +
// atomic rename, so a failed/partial run can never serve a broken page.
// Read-only against the public site — no writes to Django/DB.
//
// Usage: node gen-old-home-prerender.js [outputDir]
// Default outputDir: ./prerender  (run from client/ docroot on VPS)

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE = 'https://old.mycomputer.education';
const outDir = process.argv[2] || path.join(__dirname, 'prerender');
const templatePath = path.join(__dirname, '..', 'index.html');

async function run() {
  if (!fs.existsSync(templatePath)) {
    console.error('FATAL: template not found at', templatePath);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let rootHtml;
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 45000 });

    // Data (courses/demo/posts) loads via XHR after networkidle0 typically
    // already resolves it, but give React one more tick to commit the
    // resulting render before we snapshot.
    await page.waitForSelector('#root .header__text h1', { timeout: 15000 });

    rootHtml = await page.$eval('#root', el => el.innerHTML);
  } finally {
    await browser.close();
  }

  if (!rootHtml || rootHtml.length < 500) {
    console.error('FATAL: captured #root content looks too small, aborting:', rootHtml?.length);
    process.exit(1);
  }

  let template = fs.readFileSync(templatePath, 'utf8');

  // Drop the preloader — the snapshot already has real content, a loading
  // spinner would only hide it behind an unnecessary extra step.
  template = template.replace(/<div class="preloader">[\s\S]*?<\/div>/, '');
  template = template.replace(/<script src="\/js\/preloader\.js"><\/script>/, '');

  const output = template.replace(
    '<div id="root"></div>',
    `<div id="root">${rootHtml}</div>`
  );

  fs.mkdirSync(outDir, { recursive: true });
  const finalPath = path.join(outDir, 'home.html');
  const tmpPath = finalPath + '.tmp';
  fs.writeFileSync(tmpPath, output, 'utf8');
  fs.renameSync(tmpPath, finalPath);

  console.log(`Done. Wrote ${output.length} bytes to ${finalPath}`);
}

run().catch(e => {
  console.error('FATAL:', e.message);
  process.exit(1);
});
