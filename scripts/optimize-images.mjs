// Makes WebP copies of the site's PNG/JPG images (the originals stay, so old WordPress image
// URLs keep working) and, with --rewrite, points the code at the WebP copies.
//
//   node scripts/optimize-images.mjs            # dry run: what would be saved
//   node scripts/optimize-images.mjs --write    # create the .webp files
//   node scripts/optimize-images.mjs --rewrite  # replace references in src/ with the .webp paths
//
// Images wider than MAX_WIDTH are scaled down in the WebP copy (no page shows them wider).
// A WebP copy is only kept when it is at least 10% smaller than the original.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const UPLOADS = path.join(ROOT, 'public', 'wp-content', 'uploads');
const MAX_WIDTH = 1920;
const write = process.argv.includes('--write');
const rewrite = process.argv.includes('--rewrite');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const webPathOf = (file) => '/' + path.relative(path.join(ROOT, 'public'), file).split(path.sep).join('/');
const webpFor = (file) => file.replace(/\.(png|jpe?g)$/i, '.webp');

if (rewrite) {
  // Replace "/wp-content/uploads/....png" with the .webp path wherever a WebP copy exists.
  const srcFiles = walk(path.join(ROOT, 'src')).filter((f) => /\.(tsx?|css)$/.test(f));
  let files = 0;
  let refs = 0;
  for (const f of srcFiles) {
    const text = fs.readFileSync(f, 'utf8');
    const next = text.replace(/\/wp-content\/uploads\/[^"'`()\s]+?\.(?:png|jpe?g)(?=["'`)\s?#])/gi, (ref) => {
      let local;
      try {
        local = path.join(ROOT, 'public', decodeURIComponent(ref));
      } catch {
        return ref;
      }
      const webp = webpFor(local);
      if (!fs.existsSync(webp)) return ref;
      refs += 1;
      return ref.replace(/\.(png|jpe?g)$/i, '.webp');
    });
    if (next !== text) {
      fs.writeFileSync(f, next);
      files += 1;
    }
  }
  console.log(`rewrote ${refs} references in ${files} files`);
  process.exit(0);
}

const images = walk(UPLOADS).filter((f) => /\.(png|jpe?g)$/i.test(f));
const stems = new Map();
for (const f of images) {
  const stem = webpFor(f);
  stems.set(stem, (stems.get(stem) || 0) + 1);
}
let before = 0;
let after = 0;
let kept = 0;
let resized = 0;
let skippedClash = 0;
const rows = [];
for (const file of images) {
  const target = webpFor(file);
  // Two originals with the same name (logo.png and logo.jpg) would share one .webp: skip both.
  if (stems.get(target) > 1) {
    skippedClash += 1;
    continue;
  }
  const original = fs.statSync(file).size;
  const img = sharp(file, { failOn: 'none' });
  const meta = await img.metadata();
  let pipeline = img.rotate();
  if ((meta.width || 0) > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    resized += 1;
  }
  const isPng = /\.png$/i.test(file);
  const buffer = await pipeline
    .webp(isPng ? { quality: 88, alphaQuality: 95, effort: 5, smartSubsample: true } : { quality: 80, effort: 5, smartSubsample: true })
    .toBuffer();
  before += original;
  if (buffer.length <= original * 0.9) {
    after += buffer.length;
    kept += 1;
    if (write) fs.writeFileSync(target, buffer);
  } else {
    after += original;
  }
  rows.push([webPathOf(file), meta.width, meta.height, original, buffer.length]);
}
const mb = (n) => (n / 1e6).toFixed(1);
console.log(`${images.length} PNG/JPG, ${skippedClash} skipped (same name as another file)`);
console.log(`WebP kept for ${kept} (smaller by >=10%), ${resized} scaled down to ${MAX_WIDTH}px wide`);
console.log(`bytes: ${mb(before)} MB -> ${mb(after)} MB (${Math.round((1 - after / before) * 100)}% less)${write ? '' : '  [dry run]'}`);
const big = rows.filter((r) => r[1] > 2000).length;
console.log(`originals wider than 2000px: ${big}; largest: ${rows.sort((a, b) => b[3] - a[3]).slice(0, 5).map((r) => `${r[0]} ${r[1]}x${r[2]} ${mb(r[3])}MB->${mb(r[4])}MB`).join('; ')}`);
