// Checks every URL of the old WordPress site against a running server (read-only GET requests):
// final status after redirects, redirect chains, generic titles, missing canonical / JSON-LD.
//
//   node tests/url-check.mjs https://stage.eon8.com
//   node tests/url-check.mjs http://127.0.0.1:4173 tests/live-urls.txt
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const BASE = (process.argv[2] || 'http://127.0.0.1:4173').replace(/\/+$/, '');
const LIST = process.argv[3] || path.join(here, 'live-urls.txt');
const GENERIC_TITLE = 'Eon8 | Digital Marketing Agency, AI Agents';
const paths = [...new Set(fs.readFileSync(LIST, 'utf-8').split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith('#')))];

async function check(p) {
  let url = p;
  const hops = [];
  let res;
  for (let i = 0; i < 5; i += 1) {
    res = await fetch(BASE + url, { redirect: 'manual' });
    if (res.status < 300 || res.status >= 400) break;
    const loc = res.headers.get('location') || '';
    hops.push(`${res.status} ${loc}`);
    url = loc.startsWith('http') ? new URL(loc).pathname + new URL(loc).search : loc;
  }
  const html = res.status === 200 ? await res.text() : '';
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  return {
    path: p,
    status: res.status,
    hops,
    genericTitle: res.status === 200 && title.startsWith(GENERIC_TITLE),
    noCanonical: res.status === 200 && !/<link rel="canonical"/.test(html),
    noJsonLd: res.status === 200 && !html.includes('content="noindex') && !html.includes('id="eon8-jsonld"'),
  };
}

const rows = [];
const queue = [...paths];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) rows.push(await check(queue.shift()));
}));

const bad = (f, label) => {
  const list = rows.filter(f);
  console.log(`${list.length ? 'FAIL' : 'PASS'}  ${label}: ${list.length}`);
  for (const r of list.slice(0, 20)) console.log(`        ${r.path}  ${r.status}  ${r.hops.join(' -> ')}`);
  return list.length;
};
console.log(`Checked ${rows.length} URLs on ${BASE}`);
console.log(`      200 directly: ${rows.filter((r) => r.status === 200 && !r.hops.length).length}, 200 after one redirect: ${rows.filter((r) => r.status === 200 && r.hops.length === 1).length}`);
let failed = 0;
failed += bad((r) => r.status !== 200, 'not ending in 200');
failed += bad((r) => r.hops.length > 1, 'redirect chains');
failed += bad((r) => r.genericTitle, 'generic title');
failed += bad((r) => r.noCanonical, 'no canonical');
failed += bad((r) => r.noJsonLd, 'no JSON-LD (indexable pages)');
process.exit(failed ? 1 : 0);
