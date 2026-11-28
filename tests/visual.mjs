// Visual regression check: full-page screenshots of one page per page type at four widths,
// compared with a saved baseline, so a change to one page or component cannot silently
// change another.
//
//   VISUAL_BASE_URL=http://127.0.0.1:4180 node tests/visual.mjs baseline   # save the reference set
//   VISUAL_BASE_URL=http://127.0.0.1:4180 node tests/visual.mjs compare    # compare with it
//   ... node tests/visual.mjs compare packages blog-post                   # only some pages (label or path)
//
// Uses the Chrome (or Edge) installed on this computer through playwright-core; no browser
// download. Screenshots live in .visual/ (gitignored): baseline/, current/ and diff/.
// Animations and transitions are switched off and lazy content is loaded first, so the same
// build gives the same pixels. Run it against a local or staging server, never production.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export const VISUAL_PAGES = [
  ['home', '/'],
  ['about', '/about-us/'],
  ['contact', '/contact/'],
  ['service', '/digital-marketing-agency-in-chennai/'],
  ['packages', '/seo-packages/'],
  ['crypto-agency', '/crypto-marketing-agency/'],
  ['crypto-service', '/crypto-pr-services/'],
  ['nft-service', '/nft-marketing-services/'],
  ['nft-community', '/discord-community-building-services/'],
  ['influencer', '/influencer-marketing-agency/'],
  ['ai-agent', '/ai-agent-development-services/'],
  ['chatgpt-ads', '/chatgpt-ads-agency/'],
  ['works', '/works/'],
  ['blog-list', '/blog/'],
  ['blog-post', '/blog/delete-negative-reviews/'],
  ['policy', '/privacy-policy-2/'],
  ['ieo-listing', '/ieo-listing-services/'],
  ['instagram-influencer', '/instagram-influencer-marketing-agency/'],
  ['twitter-influencer', '/twitter-influencer-marketing/'],
  ['creator-platform', '/tiktok-influencer-marketing/'],
  ['ai-video', '/ai-video-creation/'],
  ['case-study', '/case-study-poorvika/'],
  ['chatgpt-sub', '/chatgpt-ads-agency/blog/'],
  ['category', '/category/digital-marketing/'],
  ['thank-you', '/thank-you/'],
];
export const VISUAL_WIDTHS = [375, 768, 1024, 1440];

const mode = process.argv[2] || 'compare';
const only = process.argv.slice(3);
const BASE = (process.env.VISUAL_BASE_URL || 'http://127.0.0.1:4180').replace(/\/+$/, '');
if (/eon8\.com/i.test(BASE) && !/stage\.eon8\.com/i.test(BASE)) {
  console.error('Refusing to run against the public eon8.com site.');
  process.exit(2);
}
if (!['baseline', 'compare'].includes(mode)) {
  console.error('Usage: node tests/visual.mjs baseline|compare [paths...]');
  process.exit(2);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, '.visual');
const dirFor = (kind) => path.join(DIR, kind);
for (const kind of ['baseline', 'current', 'diff']) fs.mkdirSync(dirFor(kind), { recursive: true });

// Share of pixels that may differ before a page counts as changed. The same build gives
// identical pixels, so this only absorbs rare anti-aliasing noise: a letter-spacing change
// in the footer alone is about 0.03%, which must count as a change.
const TOLERANCE = Number(process.env.VISUAL_TOLERANCE || 0.0001);

const STILL_CSS = `
  *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
  html { scroll-behavior: auto !important; }
`;

function browserPath() {
  const candidates = [
    process.env.VISUAL_CHROME,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) throw new Error('No Chrome/Edge found. Set VISUAL_CHROME to the browser executable.');
  return found;
}

async function capture(browser, url, width) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    isMobile: width < 768,
    hasTouch: width < 1024,
  });
  const page = await context.newPage();
  await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.addStyleTag({ content: STILL_CSS });
  // Scroll through the page so lazy images and on-scroll content load, then back to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const v of document.querySelectorAll('video')) {
      v.pause();
      try {
        v.currentTime = 0;
      } catch {
        /* not loaded */
      }
    }
    await Promise.all(
      [...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; }))
    );
  });
  await page.waitForTimeout(400);
  const buffer = await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide' });
  await context.close();
  return buffer;
}

/** True when two captures count as the same picture (used while saving a baseline). */
function same(name, aBuf, bBuf) {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  if (a.width !== b.width || a.height !== b.height) return false;
  return pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: 0.1 }) / (a.width * a.height) <= TOLERANCE;
}

function compare(name, aBuf, bBuf) {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  const crop = (img) => {
    if (img.width === width && img.height === height) return img;
    const out = new PNG({ width, height });
    PNG.bitblt(img, out, 0, 0, width, height, 0, 0);
    return out;
  };
  const ca = crop(a);
  const cb = crop(b);
  const diff = new PNG({ width, height });
  const changed = pixelmatch(ca.data, cb.data, diff.data, width, height, { threshold: 0.1 });
  const share = changed / (width * height);
  const heightDelta = b.height - a.height;
  if (share > TOLERANCE || heightDelta !== 0) fs.writeFileSync(path.join(dirFor('diff'), `${name}.png`), PNG.sync.write(diff));
  return { share, heightDelta };
}

// Software rendering, fixed colour profile and no sub-pixel text: the same page then gives
// the same pixels on every run (GPU raster of gradients and blur varies slightly).
const browser = await chromium.launch({
  executablePath: browserPath(),
  headless: true,
  args: ['--disable-gpu', '--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none', '--disable-partial-raster'],
});
// Filter by label (home, packages, blog-post...) or by path.
const pages = VISUAL_PAGES.filter(([label, url]) => only.length === 0 || only.includes(label) || only.includes(url));
const jobs = pages.flatMap(([label, url]) => VISUAL_WIDTHS.map((width) => ({ label, url, width, name: `${label}@${width}` })));
const results = new Map();
// A few screenshots at a time keeps a full run short without straining the server.
const CONCURRENCY = Number(process.env.VISUAL_CONCURRENCY || 4);
let next = 0;
async function worker() {
  while (next < jobs.length) {
    const job = jobs[next++];
    try {
      let shot = await capture(browser, job.url, job.width);
      if (mode === 'baseline') {
        // A few pages occasionally render text a few pixels differently (layer/font timing).
        // Keep the version that two of three captures agree on, so the baseline is the usual one.
        const second = await capture(browser, job.url, job.width);
        if (!same(job.name, shot, second)) {
          const third = await capture(browser, job.url, job.width);
          if (same(job.name, second, third)) shot = second;
          else if (!same(job.name, shot, third)) console.log(`UNSTABLE ${job.name}: three captures all differ`);
        }
      }
      results.set(job.name, { shot });
    } catch (err) {
      results.set(job.name, { error: err.message.split('\n')[0] });
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

let changed = 0;
let missing = 0;
const total = jobs.length;
for (const { name, url } of jobs) {
  const { shot, error } = results.get(name);
  if (error) {
    changed += 1;
    console.log(`ERROR  ${name}  ${url}  ${error}`);
    continue;
  }
  if (mode === 'baseline') {
    fs.writeFileSync(path.join(dirFor('baseline'), `${name}.png`), shot);
    console.log(`saved  ${name}`);
    continue;
  }
  fs.writeFileSync(path.join(dirFor('current'), `${name}.png`), shot);
  const basePath = path.join(dirFor('baseline'), `${name}.png`);
  if (!fs.existsSync(basePath)) {
    missing += 1;
    console.log(`NEW    ${name}  (no baseline yet)`);
    continue;
  }
  const baseline = fs.readFileSync(basePath);
  let { share, heightDelta } = compare(name, baseline, shot);
  let isChanged = share > TOLERANCE || heightDelta !== 0;
  let note = '';
  // Up to two retakes: a real change shows every time, an occasional rendering hiccup does not.
  for (let attempt = 0; isChanged && attempt < 2; attempt += 1) {
    const retake = await capture(browser, url, Number(name.split('@')[1]));
    const again = compare(name, baseline, retake);
    if (again.share <= TOLERANCE && again.heightDelta === 0) {
      ({ share, heightDelta } = again);
      isChanged = false;
      note = ' (retake)';
      fs.writeFileSync(path.join(dirFor('current'), `${name}.png`), retake);
      fs.rmSync(path.join(dirFor('diff'), `${name}.png`), { force: true });
    }
  }
  if (isChanged) changed += 1;
  console.log(
    `${isChanged ? 'CHANGED' : 'same  '} ${name}  ${(share * 100).toFixed(2)}% pixels${heightDelta ? `, height ${heightDelta > 0 ? '+' : ''}${heightDelta}px` : ''}${note}`
  );
}
await browser.close();
if (mode === 'baseline') {
  console.log(`\nBaseline saved: ${total} screenshots in .visual/baseline`);
} else {
  console.log(`\n${total - changed - missing} same, ${changed} changed, ${missing} without baseline (diff images in .visual/diff)`);
}
process.exit(mode === 'compare' && changed > 0 ? 1 : 0);
