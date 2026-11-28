// Backend end-to-end checks. Runs against a server started with a fresh test database.
//
//   E2E_BASE_URL=http://127.0.0.1:4173 E2E_ADMIN_EMAIL=... E2E_ADMIN_PASSWORD=... node tests/backend.e2e.mjs
//
// The admin account must be the one created from CMS_ADMIN_EMAIL / CMS_ADMIN_PASSWORD.
// The run creates test data (leads, redirects, an editor account), so never point it at production.
// The server is expected to run with DATA_ENCRYPTION_KEY set (lead encryption "on");
// set E2E_EXPECT_LEAD_ENCRYPTION=off to test a server without a key.
import net from 'node:net';

const BASE = (process.env.E2E_BASE_URL || 'http://127.0.0.1:4173').replace(/\/+$/, '');
const ORIGIN = BASE;
const PORT = Number(new URL(BASE).port || 80);
const ADMIN = { CMS_ADMIN_EMAIL: process.env.E2E_ADMIN_EMAIL, CMS_ADMIN_PASSWORD: process.env.E2E_ADMIN_PASSWORD };
if (!ADMIN.CMS_ADMIN_EMAIL || !ADMIN.CMS_ADMIN_PASSWORD) {
  console.error('Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD.');
  process.exit(2);
}
if (/eon8\.com/i.test(BASE)) {
  console.error('Refusing to run against a public eon8.com URL.');
  process.exit(2);
}

let pass = 0;
let fail = 0;
const results = [];
function check(name, cond, detail = '') {
  if (cond) pass += 1;
  else fail += 1;
  results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${!cond && detail ? `  -> ${detail}` : ''}`);
}

class Client {
  cookie = '';
  async req(method, url, body, headers = {}) {
    const h = { Origin: ORIGIN, ...headers };
    if (body !== undefined) h['Content-Type'] = 'application/json';
    if (this.cookie) h.Cookie = this.cookie;
    const res = await fetch(BASE + url, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body), redirect: 'manual' });
    const set = res.headers.get('set-cookie');
    if (set) this.cookie = set.split(';')[0];
    const type = res.headers.get('content-type') || '';
    const data = type.includes('json') ? await res.json() : await res.text();
    return { status: res.status, data, headers: res.headers };
  }
}

function rawRequest(line) {
  return new Promise((resolve) => {
    const s = net.connect(PORT, new URL(BASE).hostname, () => s.write(`${line}\r\nHost: 127.0.0.1\r\nConnection: close\r\n\r\n`));
    let buf = '';
    s.on('data', (d) => (buf += d));
    s.on('end', () => resolve(buf.split('\r\n')[0]));
    s.on('error', (e) => resolve(`ERR ${e.message}`));
  });
}

const admin = new Client();
const anon = new Client();

// --- Server hardening ---------------------------------------------------------
check('malformed URL returns 400 (no crash)', (await rawRequest('GET /%E0%A4%A HTTP/1.1')).includes('400'));
check('server still alive after malformed URL', (await anon.req('GET', '/api/health')).status === 200);
const trav = await rawRequest('GET /..%2f..%2fpackage.json HTTP/1.1');
void trav;
const travBody = await fetch(`${BASE}/..%2fpackage.json`).then((r) => r.text());
check('path traversal body is the app shell, not package.json', !travBody.includes('"dependencies"'));
const home = await fetch(`${BASE}/`, { headers: { 'Accept-Encoding': 'br, gzip' } });
check('security headers present', home.headers.get('x-content-type-options') === 'nosniff' && home.headers.get('x-frame-options') === 'SAMEORIGIN');
check('HTML is compressed', ['br', 'gzip'].includes(home.headers.get('content-encoding')));
const html = await home.text();
const asset = html.match(/\/assets\/[^"]+\.js/)?.[0];
const assetRes = asset ? await fetch(BASE + asset, { headers: { 'Accept-Encoding': 'gzip' } }) : null;
check('hashed assets cached for a year', assetRes?.headers.get('cache-control')?.includes('immutable'), assetRes?.headers.get('cache-control'));
check('missing file with extension returns 404', (await fetch(`${BASE}/nope-file.png`)).status === 404);

// --- Auth ---------------------------------------------------------------------
check('session starts signed out', (await anon.req('GET', '/api/cms/auth/session')).data.authenticated === false);
check('admin API needs auth', (await anon.req('GET', '/api/admin/leads')).status === 401);
check('wrong password rejected', (await anon.req('POST', '/api/cms/auth/login', { email: ADMIN.CMS_ADMIN_EMAIL, password: 'wrong-password-123!' })).status === 401);
const login = await admin.req('POST', '/api/cms/auth/login', { email: ADMIN.CMS_ADMIN_EMAIL, password: ADMIN.CMS_ADMIN_PASSWORD });
check('admin can sign in', login.status === 200 && login.data.admin?.role === 'admin', JSON.stringify(login.data));
check('no token returned in JSON body', login.data.token === undefined);
check('session cookie is HttpOnly', /httponly/i.test(login.headers.get('set-cookie') || ''));
check('cross-site POST is blocked', (await admin.req('POST', '/api/admin/redirects', { sourcePath: '/x', target: '/y' }, { Origin: 'https://evil.example' })).status === 403);

// --- Blog CMS on PostgreSQL -----------------------------------------------------
const postId = Date.now();
const post = await admin.req('POST', '/api/cms/admin/posts', {
  id: postId, slug: 'e2e-test-post', title: 'E2E Test Post', status: 'published', featured: false, category: 'Testing',
  categories: ['Testing'], date: '24 Nov 2026', dateIso: '2026-11-24', readTime: '1 min', author: 'Test', thumbnail: '', excerpt: 'x', blocks: [{ type: 'p', text: 'hello' }],
});
check('create blog post', post.status === 200 && post.data.post?.slug === 'e2e-test-post', JSON.stringify(post.data));
const pub = await anon.req('GET', '/api/cms/public-state');
check('post appears in public state', Boolean(pub.data.upsertedSummaries?.[String(postId)]));
check('public state omits post blocks', pub.data.upsertedSummaries?.[String(postId)]?.blocks === undefined);
check('public post returns blocks', (await anon.req('GET', '/api/cms/public-post/e2e-test-post')).data.post?.blocks?.length === 1);
check('category auto-created', pub.data.customCategories?.some((c) => c.slug === 'testing'));
check('delete blog post', (await admin.req('DELETE', `/api/cms/admin/posts/${postId}?slug=e2e-test-post`)).status === 200);

// --- Revision history -----------------------------------------------------------
const revId = postId + 1;
const basePost = { id: revId, slug: 'e2e-revisions', status: 'published', featured: false, category: 'Testing', categories: ['Testing'], date: '', dateIso: '', readTime: '', author: '', thumbnail: '', excerpt: '', blocks: [] };
await admin.req('POST', '/api/cms/admin/posts', { ...basePost, title: 'Version one' });
await admin.req('POST', '/api/cms/admin/posts', { ...basePost, title: 'Version two' });
await admin.req('POST', '/api/cms/admin/posts', { ...basePost, title: 'Version three' });
const revs = await admin.req('GET', `/api/cms/admin/posts/${revId}/revisions`);
check('two earlier versions kept', revs.data.items?.length === 2, JSON.stringify(revs.data));
const oldest = revs.data.items?.find((r) => r.title === 'Version one');
const restoredRev = await admin.req('POST', `/api/cms/admin/revisions/${oldest?.id}/restore`, {});
check('restore an earlier version', restoredRev.data.post?.title === 'Version one', JSON.stringify(restoredRev.data));
check('restore keeps the replaced version', (await admin.req('GET', `/api/cms/admin/posts/${revId}/revisions`)).data.items?.some((r) => r.title === 'Version three'));
await admin.req('DELETE', `/api/cms/admin/posts/${revId}?slug=e2e-revisions`);

// --- Image upload optimisation ----------------------------------------------------
const { default: sharp } = await import('sharp');
const bigJpeg = await sharp({ create: { width: 3200, height: 1800, channels: 3, background: { r: 30, g: 90, b: 160 } } })
  .composite([{ input: Buffer.from('<svg width="3200" height="1800"><circle cx="1600" cy="900" r="700" fill="#fd5900"/></svg>'), top: 0, left: 0 }])
  .jpeg({ quality: 100 })
  .toBuffer();
const up = await admin.req('POST', '/api/cms/admin/media/upload', { fileName: 'Big Test.jpg', mimeType: 'image/jpeg', base64Data: bigJpeg.toString('base64') });
check('image upload accepted', up.status === 200, JSON.stringify(up.data).slice(0, 200));
const stored = up.data.item ? Buffer.from(await (await fetch(`${BASE}${up.data.item.url}`)).arrayBuffer()) : Buffer.alloc(0);
const storedMeta = stored.length ? await sharp(stored).metadata() : {};
check('large image resized to 2000px wide', storedMeta.width === 2000, String(storedMeta.width));
check('stored image is smaller than the upload', up.data.item?.size < bigJpeg.length, `${up.data.item?.size} vs ${bigJpeg.length}`);
check('fake image rejected', (await admin.req('POST', '/api/cms/admin/media/upload', { fileName: 'x.png', mimeType: 'image/png', base64Data: Buffer.from('<?php echo 1;').toString('base64') })).status === 400);
if (up.data.item) await admin.req('DELETE', `/api/cms/admin/media?url=${encodeURIComponent(up.data.item.url)}`);

// --- Leads --------------------------------------------------------------------
const lead = await anon.req('POST', '/api/leads', { source: 'e2e-form', name: 'Test Lead', email: 'lead@example.com', phone: '+91 98765 43210', message: 'Hi', utm: { utm_source: 'google', evil: 'x' } });
check('public lead saved', lead.status === 201 && lead.data.id > 0, JSON.stringify(lead.data));
check('lead with bad email rejected', (await anon.req('POST', '/api/leads', { source: 'e2e-form', email: 'nope' })).status === 400);
check('lead needs email or phone', (await anon.req('POST', '/api/leads', { source: 'e2e-form', name: 'x' })).status === 400);
const spam = await anon.req('POST', '/api/leads', { source: 'e2e-form', email: 'bot@example.com', hp: 'http://spam' });
const spamFax = await anon.req('POST', '/api/leads', { source: 'e2e-form', email: 'bot2@example.com', companyFax: '555-0100' });
const spamFast = await anon.req('POST', '/api/leads', { source: 'e2e-form', email: 'bot3@example.com', hp: '', elapsedMs: 120 });
const list = await admin.req('GET', '/api/admin/leads');
check('admin sees lead, spam hidden by default', list.data.items?.some((l) => l.id === lead.data.id) && !list.data.items?.some((l) => l.id === spam.data.id));
check('old companyFax spam field and bot-speed forms are filed as spam', spamFax.status === 201 && spamFast.status === 201 && !list.data.items?.some((l) => l.id === spamFax.data.id || l.id === spamFast.data.id));
const saved = list.data.items?.find((l) => l.id === lead.data.id);
check('unknown UTM keys dropped', saved?.utm?.utm_source === 'google' && saved?.utm?.evil === undefined);
await new Promise((r) => setTimeout(r, 500));
const detail = await admin.req('GET', `/api/admin/leads/${lead.data.id}`);
check('email marked skipped without SMTP', detail.data.lead?.emailStatus === 'skipped', detail.data.lead?.emailStatus);
check('update lead status + notes', (await admin.req('PATCH', `/api/admin/leads/${lead.data.id}`, { status: 'contacted', notes: 'called' })).data.lead?.status === 'contacted');
const csv = await admin.req('GET', '/api/admin/leads/export.csv?status=all');
check('CSV export works', csv.status === 200 && String(csv.data).includes('Test Lead'));
check('CSV export has the plain (decrypted) email', String(csv.data).includes('lead@example.com') && !String(csv.data).includes('enc:v1:'));
// Lead details may be encrypted at rest, so search runs on decrypted values in memory.
const byEmail = await admin.req('GET', '/api/admin/leads?q=LEAD@example.com');
check('admin search finds a lead by email (case-insensitive)', byEmail.data.items?.some((l) => l.id === lead.data.id) && byEmail.data.total === byEmail.data.items?.length, JSON.stringify(byEmail.data).slice(0, 300));
const byName = await admin.req('GET', '/api/admin/leads?q=test%20lea');
check('admin search finds a lead by part of the name', byName.data.items?.some((l) => l.id === lead.data.id && l.email === 'lead@example.com'));
const byPhone = await admin.req('GET', '/api/admin/leads?q=98765');
check('admin search finds a lead by phone', byPhone.data.items?.some((l) => l.id === lead.data.id));
const noHit = await admin.req('GET', '/api/admin/leads?q=no-such-lead-xyz');
check('admin search with no match returns an empty page', noHit.status === 200 && noHit.data.total === 0 && noHit.data.items?.length === 0 && typeof noHit.data.counts === 'object');
const searchStatus = await admin.req('GET', '/api/admin/leads?q=example.com&status=contacted');
check('search combines with the status filter', searchStatus.data.items?.length > 0 && searchStatus.data.items.every((l) => l.status === 'contacted'), JSON.stringify(searchStatus.data.items?.map((l) => l.status)));
const spamSearch = await admin.req('GET', '/api/admin/leads?q=bot&status=spam');
check('search finds spam leads when filtering by spam', spamSearch.data.items?.some((l) => l.id === spam.data.id));
const csvSearch = await admin.req('GET', '/api/admin/leads/export.csv?status=all&q=lead@example.com');
check('CSV export applies the search', String(csvSearch.data).includes('lead@example.com') && !String(csvSearch.data).includes('bot@example.com'));
check('lead detail returns plain values', detail.data.lead?.name === 'Test Lead' && detail.data.lead?.phone === '+91 98765 43210' && detail.data.lead?.message === 'Hi');
const notesBack = await admin.req('GET', `/api/admin/leads/${lead.data.id}`);
check('lead notes read back in plain text', notesBack.data.lead?.notes === 'called', notesBack.data.lead?.notes);
const imp = await admin.req('POST', '/api/admin/leads/import', { csv: 'Your Name,Your Email,Your Phone,Your Message,Date\nOld Lead,old@example.com,9999999999,From WP,2025-01-02\nNo contact,,,x,\n' });
check('CSV import of WordPress leads', imp.data.imported === 1 && imp.data.skipped === 1, JSON.stringify(imp.data));

// --- Redirects ----------------------------------------------------------------
const rd = await admin.req('POST', '/api/admin/redirects', { sourcePath: '/Old-Test-Page/', target: '/about-us/', statusCode: 301 });
check('create redirect', rd.status === 201, JSON.stringify(rd.data));
const hop = await fetch(`${BASE}/old-test-page?x=1`, { redirect: 'manual' });
check('redirect serves real 301 (case-insensitive, keeps query)', hop.status === 301 && hop.headers.get('location') === '/about-us/?x=1', `${hop.status} ${hop.headers.get('location')}`);
check('redirect loop rejected', (await admin.req('POST', '/api/admin/redirects', { sourcePath: '/about-us', target: '/old-test-page' })).status === 400);
check('reserved path rejected', (await admin.req('POST', '/api/admin/redirects', { sourcePath: '/api/x', target: '/' })).status === 400);
await admin.req('POST', '/api/admin/redirects', { sourcePath: '/removed-page', statusCode: 410 });
check('410 gone served', (await fetch(`${BASE}/removed-page`, { redirect: 'manual' })).status === 410);
const rimp = await admin.req('POST', '/api/admin/redirects/import', {
  csv: 'id,source,matching,destination,type,status\n1,old-blog-post,exact,https://www.eon8.com/blog/old-blog-post/,301,active\n2,regex-thing,regex,/x,301,active\n3,disabled-one,exact,/y,301,inactive\n',
});
check('Rank Math style import', rimp.data.created === 1 && rimp.data.skippedCount === 2, JSON.stringify(rimp.data));
const imported = await fetch(`${BASE}/old-blog-post/`, { redirect: 'manual' });
check('imported absolute same-site URL becomes path', imported.headers.get('location') === '/blog/old-blog-post/', imported.headers.get('location'));

// --- SEO + tracking injection ----------------------------------------------------
const seo = await admin.req('PUT', '/api/admin/seo', { path: '/about-us/', title: 'About EON8 | Test Title', description: 'Test description', ogImage: '/og.png', noindex: true, schemaJson: '{"@context":"https://schema.org","@type":"Organization","name":"EON8"}' });
check('save SEO override', seo.status === 200, JSON.stringify(seo.data));
check('bad JSON-LD rejected', (await admin.req('PUT', '/api/admin/seo', { path: '/x', schemaJson: '{bad' })).status === 400);
await admin.req('PUT', '/api/admin/settings/tracking', { gtmId: 'GTM-TEST123', googleAdsIds: 'AW-11015847979', googleSiteVerification: 'abcDEF_123', tawkPropertyId: '6346b10737898912e96e3af1', tawkWidgetId: 'default' });
check('invalid GTM id rejected', (await admin.req('PUT', '/api/admin/settings/tracking', { gtmId: '<script>' })).status === 400);
check('invalid Tawk.to id rejected', (await admin.req('PUT', '/api/admin/settings/tracking', { tawkPropertyId: "x');alert(1)//" })).status === 400);
const aboutHtml = await fetch(`${BASE}/about-us/`).then((r) => r.text());
check('title injected into HTML', aboutHtml.includes('<title>About EON8 | Test Title</title>'));
check('description, og:image, noindex injected', aboutHtml.includes('content="Test description"') && aboutHtml.includes('og:image" content="') && aboutHtml.includes('noindex'));
check('JSON-LD injected', aboutHtml.includes('application/ld+json') && aboutHtml.includes('"Organization"'));
check('GTM + Ads + verification injected', aboutHtml.includes("'GTM-TEST123'") && aboutHtml.includes('AW-11015847979') && aboutHtml.includes('google-site-verification'));
check('Tawk.to chat injected when set', aboutHtml.includes('https://embed.tawk.to/6346b10737898912e96e3af1/default'));
const adminHtml = await fetch(`${BASE}/admin-dashboard`).then((r) => r.text());
check('no GTM, Ads or chat on the admin page', !adminHtml.includes('GTM-TEST123') && !adminHtml.includes('AW-11015847979') && !adminHtml.includes('embed.tawk.to'));
check('CSP allows the Tawk.to chat', ((await fetch(`${BASE}/about-us/`)).headers.get('content-security-policy') || '').includes('https://embed.tawk.to'));
const homeHtml = await fetch(`${BASE}/`).then((r) => r.text());
check('override applies to its page only (home keeps its manifest title)', homeHtml.includes('<title>Digital Marketing Agency | AI, SEO &amp; Web3 Services | EON8</title>') && !homeHtml.includes('Test Title'), homeHtml.match(/<title>[^<]*<\/title>/)?.[0]);
check('public SEO lookup', (await anon.req('GET', '/api/seo?path=/about-us')).data.seo?.noindex === true);
check('public settings hide lead recipients', (await anon.req('GET', '/api/settings')).data.settings?.leads === undefined);
await admin.req('PUT', '/api/admin/settings/tracking', { gtmId: '', googleAdsIds: '', googleSiteVerification: '', tawkPropertyId: '', tawkWidgetId: '' });
await admin.req('DELETE', '/api/admin/seo?path=/about-us/');
check('invalid recipient email rejected', (await admin.req('PUT', '/api/admin/settings/leads', { notifyEmails: 'ok@example.com\nnot-an-email' })).status === 400);

// --- Users & roles ----------------------------------------------------------------
const tempPw = 'Temp-Pass-2026!x';
const created = await admin.req('POST', '/api/admin/users', { email: 'editor@eon8.local', name: 'Ed', role: 'editor', password: tempPw });
check('admin creates editor', created.status === 201, JSON.stringify(created.data));
check('weak temp password rejected', (await admin.req('POST', '/api/admin/users', { email: 'x@eon8.local', role: 'editor', password: 'short' })).status === 400);
const editor = new Client();
const elog = await editor.req('POST', '/api/cms/auth/login', { email: 'editor@eon8.local', password: tempPw });
check('editor must change temp password', elog.data.admin?.mustChangePassword === true);
check('blocked until password changed', (await editor.req('GET', '/api/admin/leads')).status === 403);
const changed = await editor.req('POST', '/api/cms/auth/change-password', { currentPassword: tempPw, newEmail: 'editor@eon8.local', newPassword: 'Editor-New-Pass-2026!' });
check('editor changes password', changed.status === 200 && changed.data.admin?.mustChangePassword === false, JSON.stringify(changed.data));
check('editor can read leads', (await editor.req('GET', '/api/admin/leads')).status === 200);
check('editor cannot manage users', (await editor.req('GET', '/api/admin/users')).status === 403);
check('editor cannot change site settings', (await editor.req('PUT', '/api/admin/settings/contact', {})).status === 403);
check('editor cannot export leads', (await editor.req('GET', '/api/admin/leads/export.csv')).status === 403);
const me = login.data.admin.id;
check('admin cannot remove own admin role', (await admin.req('PATCH', `/api/admin/users/${me}`, { role: 'editor' })).status === 400);
check('admin cannot delete self', (await admin.req('DELETE', `/api/admin/users/${me}`)).status === 400);
const eid = created.data.item.id;
await admin.req('PATCH', `/api/admin/users/${eid}`, { isActive: false });
check('disabled user is signed out', (await editor.req('GET', '/api/admin/leads')).status === 401);

// --- Audit + system ----------------------------------------------------------------
const auditLog = await admin.req('GET', '/api/admin/audit?limit=200');
const actions = new Set(auditLog.data.items?.map((a) => `${a.action}:${a.entity}`));
check('audit log records changes', ['create:redirect', 'upsert:page_seo', 'create:admin_user', 'update:lead', 'login_failed:admin_user'].every((a) => actions.has(a)), [...actions].join(' '));
const sys = await admin.req('GET', '/api/admin/system');
check('system status endpoint', sys.data.database === 'connected' && sys.data.mailConfigured === false);
const expectEncryption = process.env.E2E_EXPECT_LEAD_ENCRYPTION || 'on';
check(`system status shows lead encryption ${expectEncryption}`, sys.data.leadEncryption === expectEncryption, sys.data.leadEncryption);
check('audit log holds no lead email or phone', !JSON.stringify(auditLog.data.items?.filter((a) => /lead/.test(a.entity)) ?? []).match(/lead@example\.com|98765/));
check('logout clears session', (await admin.req('POST', '/api/cms/auth/logout', {})).status === 200 && (await admin.req('GET', '/api/admin/leads')).status === 401);

// --- Real 404 status ----------------------------------------------------------------
check('unknown page returns 404', (await fetch(`${BASE}/this-page-does-not-exist-xyz/`)).status === 404);
check('unknown category returns 404', (await fetch(`${BASE}/category/no-such-category-xyz`)).status === 404);
check('unknown blog post returns 404', (await fetch(`${BASE}/blog/no-such-post-xyz/`)).status === 404);
check('404 page still renders the app', (await fetch(`${BASE}/this-page-does-not-exist-xyz/`).then((r) => r.text())).includes('id="root"'));
for (const p of ['/', '/about-us/', '/contact', '/blog/', '/blog/page/2', '/blog/twitter-mindshare/', '/category/search-engine-optimization', '/crptocurrency-marketing-agency/', '/admin-dashboard', '/chatgpt-ads-agency/education/']) {
  check(`known page ${p} returns 200`, (await fetch(`${BASE}${p}`, { redirect: 'manual' })).status === 200, String((await fetch(`${BASE}${p}`, { redirect: 'manual' })).status));
}

// --- Legacy WordPress 301s and server-side SEO (SEO manifest) ----------------------------
for (const [from, to] of [
  ['/twitter-mindshare/', '/blog/twitter-mindshare/'],
  ['/orm', '/online-reputation-management-agency/'],
  ['/chatgpt-ads-agency/education.html', '/chatgpt-ads-agency/education/'],
  ['/feed/', '/blog/'],
  ['/tag/seo/', '/blog/'],
  ['/author/admin/', '/blog/'],
  ['/?p=999999999', '/blog/'],
  // Older permalinks from the live 404 log
  ['/2020/08/28/delete-negative-reviews/', '/blog/delete-negative-reviews/'],
  ['/blog-twitter-mindshare', '/blog/twitter-mindshare/'],
  // Old WordPress / Rank Math sitemaps
  ['/sitemap_index.xml', '/sitemap.xml'],
  ['/post-sitemap.xml', '/sitemap.xml'],
  ['/post-sitemap2.xml', '/sitemap.xml'],
  ['/page-sitemap.xml', '/sitemap.xml'],
  ['/category-sitemap.xml', '/sitemap.xml'],
  ['/post_tag-sitemap.xml', '/sitemap.xml'],
  ['/author-sitemap.xml', '/sitemap.xml'],
  ['/local-sitemap.xml', '/sitemap.xml'],
  ['/wp-sitemap.xml', '/sitemap.xml'],
  ['/wp-sitemap-posts-post-1.xml', '/sitemap.xml'],
  ['/Sitemap_Index.xml', '/sitemap.xml'],
]) {
  const r = await fetch(`${BASE}${from}`, { redirect: 'manual' });
  check(`legacy ${from} -> 301 ${to}`, r.status === 301 && r.headers.get('location') === to, `${r.status} ${r.headers.get('location')}`);
}
const sitemapRes = await fetch(`${BASE}/sitemap.xml`, { redirect: 'manual' });
check('/sitemap.xml itself is served (not redirected)', sitemapRes.status === 200 && (await sitemapRes.text()).includes('<urlset'), String(sitemapRes.status));
check('/robots.txt is still served', (await fetch(`${BASE}/robots.txt`, { redirect: 'manual' })).status === 200);
check('old sitemap stylesheet /main-sitemap.xsl is a plain 404', (await fetch(`${BASE}/main-sitemap.xsl`, { redirect: 'manual' })).status === 404);
check('unknown non-sitemap .xml stays 404', (await fetch(`${BASE}/not-a-sitemap-file.xml`, { redirect: 'manual' })).status === 404);
const seoRes = await fetch(`${BASE}/ai-video-creation/`);
const seoHtml = await seoRes.text();
check('page title comes from the SEO manifest', seoHtml.includes('<title>AI Video Creation Services | AI Video Production Company | EON8</title>'), seoHtml.match(/<title>[^<]*<\/title>/)?.[0]);
check('canonical keeps the trailing slash', /<link rel="canonical" href="[^"]+\/ai-video-creation\/" \/>/.test(seoHtml), seoHtml.match(/<link rel="canonical"[^>]*>/)?.[0]);
check('JSON-LD rendered on the server', seoHtml.includes('id="eon8-jsonld"') && seoHtml.includes('BreadcrumbList'));
check('only one description tag', (seoHtml.match(/<meta name="description"/g) || []).length === 1);
check('HTML pages send a Content-Security-Policy', (seoRes.headers.get('content-security-policy') || '').includes("object-src 'none'"));
const postHtml = await fetch(`${BASE}/blog/twitter-mindshare/`).then((r) => r.text());
check('blog post gets BlogPosting JSON-LD', postHtml.includes('"@type":"BlogPosting"'));
const funnelHtml = await fetch(`${BASE}/seo-services-funnel/`).then((r) => r.text());
check('funnel page is noindex (as on WordPress)', funnelHtml.includes('<meta name="robots" content="noindex, nofollow" />'));
check('404 page is noindex', (await fetch(`${BASE}/this-page-does-not-exist-xyz/`).then((r) => r.text())).includes('noindex'));
check('seo-manifest.json is not public', (await fetch(`${BASE}/seo-manifest.json`)).status === 404);
check('route-manifest.json is not public', (await fetch(`${BASE}/route-manifest.json`)).status === 404);

// --- Regression checks from code review -------------------------------------------------
await admin.req('POST', '/api/cms/auth/login', { email: ADMIN.CMS_ADMIN_EMAIL, password: ADMIN.CMS_ADMIN_PASSWORD });
const renId = postId + 2;
const renBase = { id: renId, status: 'published', featured: false, category: 'Testing', categories: ['Testing'], date: '', dateIso: '', readTime: '', author: '', thumbnail: '', excerpt: '', blocks: [] };
await admin.req('POST', '/api/cms/admin/posts', { ...renBase, slug: 'e2e-slug-a', title: 'Slug A' });
check('new post is reachable immediately (no stale 404)', (await fetch(`${BASE}/blog/e2e-slug-a/`)).status === 200);
await admin.req('POST', '/api/cms/admin/posts', { ...renBase, slug: 'e2e-slug-b', title: 'Slug B', originalSlug: 'e2e-slug-a' });
const renRevs = await admin.req('GET', `/api/cms/admin/posts/${renId}/revisions`);
await admin.req('POST', `/api/cms/admin/revisions/${renRevs.data.items?.[0]?.id}/restore`, {});
const renState = await anon.req('GET', '/api/cms/public-state');
check('restore after rename brings old slug back', (await anon.req('GET', '/api/cms/public-post/e2e-slug-a')).data.post?.title === 'Slug A');
check('restore after rename leaves no redirect loop', !renState.data.slugRedirects?.['e2e-slug-a'] && renState.data.slugRedirects?.['e2e-slug-b'] === 'e2e-slug-a');
await admin.req('DELETE', `/api/cms/admin/posts/${renId}?slug=e2e-slug-a`);

await admin.req('PUT', '/api/admin/seo', { path: '/contact', title: "Price $& and $' test $$5" });
const contactHtml = await fetch(`${BASE}/contact`).then((r) => r.text());
check('"$" in SEO title is kept literally', contactHtml.includes("<title>Price $&amp; and $' test $$5</title>"), contactHtml.match(/<title>[^<]*<\/title>/)?.[0]);
await admin.req('DELETE', '/api/admin/seo?path=/contact');

await admin.req('POST', '/api/admin/redirects', { sourcePath: '/unicode-redirect-test', target: '/ब्लॉग/test page/' });
const uni = await fetch(`${BASE}/unicode-redirect-test`, { redirect: 'manual' });
check('non-Latin redirect target is encoded (no 500)', uni.status === 301 && uni.headers.get('location') === encodeURI('/ब्लॉग/test page/'), `${uni.status} ${uni.headers.get('location')}`);

// --- Editable pages (Admin > Pages) ---------------------------------------------------------
const titleTag = (html) => html.match(/<title>([^<]*)<\/title>/)?.[1];
check('pages: saving needs a login', (await anon.req('PUT', '/api/admin/pages/item', { key: 'service:seo-packages' })).status === 401);
const seoPkgOriginal = titleTag(await fetch(`${BASE}/seo-packages/`).then((r) => r.text()));
const pageEdit = {
  key: 'service:seo-packages', path: '/seo-packages/', kind: 'override', title: 'SEO Packages', status: 'published',
  data: { slug: 'seo-packages', theme: 'brand', title: 'E2E Edited Packages | EON8', metaDesc: 'Edited.', hero: { heading: 'Edited', paragraphs: [['x']], bullets: [], actions: [], layout: 'centered' }, sections: [] },
};
check('pages: edit an existing page', (await admin.req('PUT', '/api/admin/pages/item', pageEdit)).status === 200);
check('pages: edit listed in public index', (await anon.req('GET', '/api/pages/index')).data.pages?.some((p) => p.key === 'service:seo-packages'));
check('pages: <title> follows the edit', titleTag(await fetch(`${BASE}/seo-packages/`).then((r) => r.text())) === 'E2E Edited Packages | EON8');
await admin.req('PUT', '/api/admin/pages/item', { ...pageEdit, data: { ...pageEdit.data, metaDesc: 'Edited again.' } });
check('pages: previous version kept', (await admin.req('GET', '/api/admin/pages/revisions?key=service:seo-packages')).data.items?.length === 1);
check('pages: script links refused', (await admin.req('PUT', '/api/admin/pages/item', { ...pageEdit, data: { ...pageEdit.data, hero: { ...pageEdit.data.hero, actions: [{ label: 'x', href: ' javascript:alert(1)' }] } } })).status === 400);
check('pages: drafts do not change the site', (await admin.req('PUT', '/api/admin/pages/item', { ...pageEdit, status: 'draft' })).status === 200 &&
  titleTag(await fetch(`${BASE}/seo-packages/`).then((r) => r.text())) === seoPkgOriginal);
check('pages: reset to original', (await admin.req('DELETE', '/api/admin/pages/item?key=service:seo-packages')).status === 200 &&
  titleTag(await fetch(`${BASE}/seo-packages/`).then((r) => r.text())) === seoPkgOriginal);

const newPage = { key: 'content:e2e-new-page', kind: 'custom', title: 'E2E page', status: 'draft', data: { title: 'E2E New Page | EON8', metaDesc: 'A page made in the admin.', heroHeading: 'E2E', blocks: [{ type: 'paragraph', content: ['Hello'] }] } };
check('pages: create a new page', (await admin.req('PUT', '/api/admin/pages/item', newPage)).data.item?.path === '/e2e-new-page/');
check('pages: draft new page is 404', (await fetch(`${BASE}/e2e-new-page/`)).status === 404);
await admin.req('PUT', '/api/admin/pages/item', { ...newPage, status: 'published' });
const newPageRes = await fetch(`${BASE}/e2e-new-page/`);
const newPageHtml = await newPageRes.text();
check('pages: published new page is 200 with its own title', newPageRes.status === 200 && titleTag(newPageHtml) === 'E2E New Page | EON8', `${newPageRes.status} ${titleTag(newPageHtml)}`);
check('pages: new page in sitemap', (await fetch(`${BASE}/sitemap.xml`).then((r) => r.text())).includes('/e2e-new-page/'));
for (const [slug, why] of [['seo-packages', 'an existing page'], ['blog', 'a reserved path'], ['delete-negative-reviews', 'a blog post']]) {
  const r = await admin.req('PUT', '/api/admin/pages/item', { ...newPage, key: `content:${slug}` });
  check(`pages: a new page cannot take ${why}`, r.status === 409, `${r.status} ${JSON.stringify(r.data)}`);
}
check('pages: delete new page', (await admin.req('DELETE', '/api/admin/pages/item?key=content:e2e-new-page')).status === 200 &&
  (await fetch(`${BASE}/e2e-new-page/`)).status === 404);

// --- News and newsletter posts ---------------------------------------------------------------
const newsId = Date.now() + 7;
const newsPost = {
  id: newsId, slug: 'e2e-news-item', title: 'E2E News Item', status: 'published', featured: false, category: 'Testing', postType: 'news',
  categories: ['Testing'], date: '27 Nov 2026', dateIso: '2026-11-27', readTime: '1 min', author: 'Test', thumbnail: '', excerpt: 'x', blocks: [],
};
check('news: save a news item', (await admin.req('POST', '/api/cms/admin/posts', newsPost)).data.post?.postType === 'news');
const newsRes = await fetch(`${BASE}/news/e2e-news-item/`);
const newsHtml = await newsRes.text();
check('news: item served at /news/<slug>/', newsRes.status === 200, newsRes.status);
check('news: canonical is /news/<slug>/', /rel="canonical" href="[^"]*\/news\/e2e-news-item\/"/.test(newsHtml), newsHtml.match(/rel="canonical"[^>]*>/)?.[0]);
const newsViaBlog = await fetch(`${BASE}/blog/e2e-news-item/`, { redirect: 'manual' });
check('news: /blog/<slug>/ moves to /news/<slug>/', newsViaBlog.status === 301 && /\/news\/e2e-news-item\/$/.test(newsViaBlog.headers.get('location') || ''), `${newsViaBlog.status} ${newsViaBlog.headers.get('location')}`);
check('news: list page', (await fetch(`${BASE}/news/`)).status === 200);
check('newsletter: list page', (await fetch(`${BASE}/newsletter/`)).status === 200);
const sitemapWithNews = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
check('news: sitemap lists /news/<slug>/ and /news/', sitemapWithNews.includes('/news/e2e-news-item/') && sitemapWithNews.includes('/news/</loc>') && !sitemapWithNews.includes('/blog/e2e-news-item/'));
await admin.req('POST', '/api/cms/admin/posts', { ...newsPost, postType: 'newsletter' });
const issueRedirect = await fetch(`${BASE}/news/e2e-news-item/`, { redirect: 'manual' });
check('newsletter: changing type moves the URL', issueRedirect.status === 301 && /\/newsletter\/e2e-news-item\/$/.test(issueRedirect.headers.get('location') || ''), `${issueRedirect.status} ${issueRedirect.headers.get('location')}`);
await admin.req('DELETE', `/api/cms/admin/posts/${newsId}?slug=e2e-news-item`);

// --- Branding (logos and favicon) -------------------------------------------------------------
const brandingBefore = (await admin.req('GET', '/api/admin/settings')).data.settings?.branding;
check('branding: defaults match the WordPress logos', brandingBefore?.headerLogo === '/wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.webp');
check('branding: rejects non-image paths', (await admin.req('PUT', '/api/admin/settings/branding', { ...brandingBefore, favicon: 'javascript:alert(1)' })).status === 400);
await admin.req('PUT', '/api/admin/settings/branding', { ...brandingBefore, favicon: '/uploads/blog/e2e-icon.png', shareImage: '/uploads/blog/e2e-share.jpg' });
const brandedHtml = await fetch(`${BASE}/about-us/`).then((r) => r.text());
check('branding: favicon from settings', brandedHtml.includes('<link rel="icon" type="image/png" href="/uploads/blog/e2e-icon.png" />'));
check('branding: public settings expose logos', (await anon.req('GET', '/api/settings')).data.settings?.branding?.favicon === '/uploads/blog/e2e-icon.png');
await admin.req('PUT', '/api/admin/settings/branding', brandingBefore);

// --- Rate limit last (it blocks further submissions from this IP) ----------------------
let limited = false;
for (let i = 0; i < 8; i += 1) {
  const r = await anon.req('POST', '/api/leads', { source: 'flood', email: `f${i}@example.com` });
  if (r.status === 429) limited = true;
}
check('lead form rate limited', limited);

console.log(results.join('\n'));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
