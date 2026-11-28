// Measures how pages look (fonts, sizes, weights, alignment, colours, logo, favicon and
// animations) on any site, so the new build can be compared with the live WordPress site.
//
//   node tests/style-audit.mjs capture <baseUrl> <out.json> [--slow] [--only=home,about]
//   node tests/style-audit.mjs compare <live.json> <new.json> [out.csv]
//
// --slow: one page at a time with a pause between pages (use it for the live site: its host
// allows only 20 processes). Read-only: it only opens pages, like a visitor.
// Uses the Chrome or Edge installed on this computer (playwright-core).
import fs from 'node:fs';
import { chromium } from 'playwright-core';

export const AUDIT_PAGES = [
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
  // The live site serves posts at /<slug>/; the new site at /blog/<slug>/ (old URL redirects).
  ['blog-post', '/blog/delete-negative-reviews/', '/delete-negative-reviews/'],
  ['policy', '/privacy-policy-2/'],
  ['ieo-listing', '/ieo-listing-services/'],
  ['instagram-influencer', '/instagram-influencer-marketing-agency/'],
  ['twitter-influencer', '/twitter-influencer-marketing/'],
  ['creator-platform', '/tiktok-influencer-marketing/'],
  ['ai-video', '/ai-video-creation/'],
  ['case-study', '/case-study-poorvika/'],
  ['chatgpt-sub', '/chatgpt-ads-agency/blog/', '/chatgpt-ads-agency/blog.html'],
  ['category', '/category/digital-marketing/'],
];
export const AUDIT_WIDTHS = [375, 768, 1440];

function browserPath() {
  return [
    process.env.VISUAL_CHROME,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
  ].find((p) => p && fs.existsSync(p));
}

/** Runs inside the page: collects what a visitor sees. */
function measure() {
  const vw = window.innerWidth;
  const visible = (e) => {
    const r = e.getBoundingClientRect();
    const s = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05;
  };
  const text = (e) => (e.innerText || e.textContent || '').trim().replace(/\s+/g, ' ');
  const style = (e) => {
    const s = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    return {
      text: text(e).slice(0, 60),
      font: s.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
      size: Math.round(parseFloat(s.fontSize) * 10) / 10,
      weight: Number(s.fontWeight),
      lineHeight: s.lineHeight === 'normal' ? 'normal' : Math.round(parseFloat(s.lineHeight) * 10) / 10,
      letterSpacing: s.letterSpacing,
      transform: s.textTransform,
      align: s.textAlign,
      color: s.color,
      left: Math.round(r.left),
      width: Math.round(r.width),
    };
  };
  const pick = (selector, max) =>
    [...document.querySelectorAll(selector)]
      .filter((e) => visible(e) && text(e).length > 1 && !e.closest('header, nav, footer, [role=dialog]'))
      .slice(0, max)
      .map(style);

  const header = document.querySelector('header, .elementor-location-header, #masthead, nav');
  const headerLinks = header
    ? [...header.querySelectorAll('a, button, span')].filter((e) => visible(e) && e.children.length === 0 && text(e).length > 2 && e.getBoundingClientRect().top < 140).slice(0, 12).map(style)
    : [];
  const footer = document.querySelector('footer, .elementor-location-footer');
  const footerHeadings = footer ? [...footer.querySelectorAll('h2, h3, h4, h5, h6, .elementor-heading-title')].filter(visible).slice(0, 6).map(style) : [];
  const footerLinks = footer ? [...footer.querySelectorAll('a')].filter((e) => visible(e) && text(e).length > 2).slice(0, 6).map(style) : [];
  const buttons = [...document.querySelectorAll('a, button')]
    .filter((e) => {
      if (!visible(e) || text(e).length < 2 || e.closest('header, nav, footer')) return false;
      const bg = getComputedStyle(e).backgroundColor;
      return bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
    })
    .slice(0, 6)
    .map((e) => ({ ...style(e), background: getComputedStyle(e).backgroundColor, radius: getComputedStyle(e).borderRadius, height: Math.round(e.getBoundingClientRect().height) }));

  const logo = [...document.querySelectorAll('header img, nav img, .elementor-location-header img, a img')]
    .filter(visible)
    .find((i) => /logo|eon/i.test(`${i.src} ${i.alt} ${i.className}`));
  const lr = logo?.getBoundingClientRect();

  const entrance = {};
  for (const e of document.querySelectorAll('[data-settings]')) {
    try {
      const s = JSON.parse(e.getAttribute('data-settings'));
      for (const k of ['_animation', 'animation']) if (s[k] && s[k] !== 'none') entrance[s[k]] = (entrance[s[k]] || 0) + 1;
    } catch {
      /* not JSON */
    }
  }
  const cssAnimations = {};
  let i = 0;
  for (const e of document.querySelectorAll('body *')) {
    if (i++ > 6000) break;
    const name = getComputedStyle(e).animationName;
    if (name && name !== 'none') for (const n of name.split(',')) cssAnimations[n.trim()] = (cssAnimations[n.trim()] || 0) + 1;
  }

  return {
    viewport: vw,
    pageWidth: document.documentElement.scrollWidth,
    pageHeight: document.documentElement.scrollHeight,
    title: document.title,
    favicon: [...document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]')].map((l) => `${l.rel}:${l.getAttribute('href')}`),
    logo: logo ? { src: logo.getAttribute('src'), width: Math.round(lr.width), height: Math.round(lr.height) } : null,
    h1: pick('h1', 3),
    h2: pick('h2', 12),
    h3: pick('h3', 12),
    h4: pick('h4', 8),
    p: pick('p', 12),
    li: pick('li', 6),
    buttons,
    headerLinks,
    footerHeadings,
    footerLinks,
    animations: {
      entrance,
      css: cssAnimations,
      sliders: document.querySelectorAll('.swiper, .swiper-container, .slick-slider, .owl-carousel, [class*="marquee"]').length,
      counters: document.querySelectorAll('.elementor-counter-number, [data-to-value], [data-count]').length,
      videos: document.querySelectorAll('video').length,
      lottie: document.querySelectorAll('lottie-player, dotlottie-player').length,
      typing: document.querySelectorAll('.elementor-headline, [class*="typed"], [class*="typewriter"]').length,
    },
  };
}

async function capture(base, out, slow, only) {
  if (!browserPath()) throw new Error('No Chrome/Edge found (set VISUAL_CHROME).');
  const isLive = /(^|\.)eon8\.com/i.test(new URL(base).hostname) && !/stage\./i.test(base);
  const browser = await chromium.launch({ executablePath: browserPath(), headless: true });
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();
  // With --only, earlier results in the same file are kept and the listed pages added/replaced.
  const result = only.length && fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : { base, capturedAt: new Date().toISOString(), pages: {} };
  for (const [label, path, livePath] of AUDIT_PAGES.filter(([l]) => only.length === 0 || only.includes(l))) {
    const url = base.replace(/\/+$/, '') + (isLive && livePath ? livePath : path);
    result.pages[label] = { url, widths: {} };
    for (const width of AUDIT_WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      try {
        const res = await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
        // Let entrance animations and late scripts run, then scroll so on-scroll content appears.
        await page.waitForTimeout(slow ? 2500 : 800);
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 150));
          }
          window.scrollTo(0, 0);
          await document.fonts.ready;
        });
        await page.waitForTimeout(slow ? 1500 : 300);
        result.pages[label].widths[width] = { status: res?.status() ?? 0, ...(await page.evaluate(measure)) };
        console.log(`ok     ${label}@${width}`);
      } catch (err) {
        result.pages[label].widths[width] = { error: err.message.split('\n')[0] };
        console.log(`error  ${label}@${width}  ${err.message.split('\n')[0]}`);
      }
      if (slow) await page.waitForTimeout(4000);
    }
  }
  await browser.close();
  fs.writeFileSync(out, JSON.stringify(result, null, 1));
  console.log(`saved ${out}`);
}

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function compareFiles(liveFile, newFile, csvOut) {
  const live = JSON.parse(fs.readFileSync(liveFile, 'utf8'));
  const next = JSON.parse(fs.readFileSync(newFile, 'utf8'));
  const rows = [['page', 'width', 'element', 'text', 'property', 'live', 'new']];
  const props = ['font', 'size', 'weight', 'lineHeight', 'letterSpacing', 'transform', 'align', 'color'];
  for (const [label] of AUDIT_PAGES) {
    for (const width of AUDIT_WIDTHS) {
      const a = live.pages[label]?.widths?.[width];
      const b = next.pages[label]?.widths?.[width];
      if (!a || !b || a.error || b.error) {
        rows.push([label, width, 'page', '', 'error', a?.error || '', b?.error || '']);
        continue;
      }
      for (const kind of ['h1', 'h2', 'h3', 'h4', 'p', 'li', 'buttons', 'headerLinks', 'footerHeadings', 'footerLinks']) {
        const used = new Set();
        for (const x of a[kind] || []) {
          // Same element = same text (first 30 characters).
          const key = norm(x.text).slice(0, 30);
          const y = (b[kind] || []).find((c, idx) => !used.has(idx) && norm(c.text).slice(0, 30) === key && used.add(idx));
          if (!y) {
            rows.push([label, width, kind, x.text, 'missing on new', 'present', '']);
            continue;
          }
          for (const p of props) {
            const av = String(x[p]);
            const bv = String(y[p]);
            const same = p === 'size' || p === 'lineHeight' ? Math.abs(Number(av) - Number(bv)) <= 1 || av === bv : av.toLowerCase() === bv.toLowerCase();
            if (!same) rows.push([label, width, kind, x.text, p, av, bv]);
          }
        }
      }
      if (a.logo && b.logo && (Math.abs(a.logo.height - b.logo.height) > 2 || Math.abs(a.logo.width - b.logo.width) > 4)) {
        rows.push([label, width, 'logo', '', 'size', `${a.logo.width}x${a.logo.height}`, `${b.logo.width}x${b.logo.height}`]);
      }
      if (a.pageWidth > width || b.pageWidth > width) rows.push([label, width, 'page', '', 'sideways scroll width', a.pageWidth, b.pageWidth]);
      const ea = JSON.stringify(a.animations?.entrance || {});
      if (ea !== '{}') rows.push([label, width, 'animations', '', 'live entrance animations', ea, JSON.stringify(b.animations?.css || {}).slice(0, 120)]);
    }
  }
  const csv = rows.map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  if (csvOut) fs.writeFileSync(csvOut, csv);
  const diffs = rows.length - 1;
  const byKind = {};
  for (const r of rows.slice(1)) byKind[r[4]] = (byKind[r[4]] || 0) + 1;
  console.log(`${diffs} differences`, byKind);
}

const [mode, a1, a2, a3] = process.argv.slice(2);
const onlyArg = process.argv.find((x) => x.startsWith('--only='));
const only = onlyArg ? onlyArg.slice(7).split(',').filter(Boolean) : [];
if (mode === 'capture' && a1 && a2) await capture(a1, a2, process.argv.includes('--slow'), only);
else if (mode === 'compare' && a1 && a2) compareFiles(a1, a2, a3);
else {
  console.error('Usage: node tests/style-audit.mjs capture <baseUrl> <out.json> [--slow] | compare <live.json> <new.json> [out.csv]');
  process.exit(2);
}
