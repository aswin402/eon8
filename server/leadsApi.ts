import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { audit, requireUser } from './lib/auth.ts';
import { query } from './lib/db.ts';
import { env } from './lib/env.ts';
import { HttpError, clientIp, createRateLimiter, parseCsv, readJsonBody, sendJson, toCsv } from './lib/http.ts';
import { sendMail } from './lib/mailer.ts';
import { getSetting } from './settingsApi.ts';

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'] as const;
type LeadStatus = (typeof STATUSES)[number];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

const submitLimiter = createRateLimiter(6, 10 * 60 * 1000);

interface LeadRow {
  id: string;
  source: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  website: string | null;
  message: string | null;
  preferred_slot: string | null;
  page_url: string | null;
  referrer: string | null;
  utm: Record<string, string> | null;
  extra: Record<string, unknown> | null;
  status: LeadStatus;
  notes: string | null;
  email_status: string;
  email_error: string | null;
  created_at: Date;
  updated_at: Date;
}

function toLead(r: LeadRow) {
  return {
    id: Number(r.id),
    source: r.source,
    name: r.name,
    email: r.email,
    phone: r.phone,
    country: r.country,
    website: r.website,
    message: r.message,
    preferredSlot: r.preferred_slot,
    pageUrl: r.page_url,
    referrer: r.referrer,
    utm: r.utm,
    extra: r.extra,
    status: r.status,
    notes: r.notes,
    emailStatus: r.email_status,
    emailError: r.email_error,
    createdAt: r.created_at.toISOString(),
    updatedAt: r.updated_at.toISOString(),
  };
}

const clip = (v: unknown, max: number): string | null => {
  const s = String(v ?? '').split(String.fromCharCode(0)).join('').trim();
  return s ? s.slice(0, max) : null;
};

const ipHash = (ip: string) =>
  crypto.createHash('sha256').update(`${env('LEAD_IP_SALT', 'eon8-leads')}:${ip}`).digest('hex').slice(0, 32);

function leadEmailText(lead: ReturnType<typeof toLead>): string {
  const lines: Array<[string, string | null]> = [
    ['Form', lead.source],
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Location', lead.country],
    ['Website', lead.website],
    ['Preferred slot', lead.preferredSlot],
    ['Page', lead.pageUrl],
    ['Received', lead.createdAt],
  ];
  const body = lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
  const utm = lead.utm && Object.keys(lead.utm).length ? `\n\nCampaign: ${JSON.stringify(lead.utm)}` : '';
  return `New enquiry from the EON8 website.\n\n${body}\n\nMessage:\n${lead.message || '(none)'}${utm}\n\nOpen the admin Leads tab to update its status.`;
}

async function notify(lead: ReturnType<typeof toLead>): Promise<void> {
  const { notifyEmails } = await getSetting<{ notifyEmails: string[] }>('leads');
  const fallback = env('LEAD_NOTIFY_EMAILS').split(',').map((s) => s.trim()).filter(Boolean);
  const to = notifyEmails.length ? notifyEmails : fallback;
  const result = await sendMail({
    to,
    subject: `New website lead: ${lead.name || lead.email || lead.phone} (${lead.source})`,
    text: leadEmailText(lead),
    replyTo: lead.email && EMAIL_RE.test(lead.email) ? lead.email : undefined,
  });
  const error = result.status === 'failed' ? result.error : result.status === 'skipped' ? result.reason : null;
  await query('UPDATE leads SET email_status = $1, email_error = $2 WHERE id = $3', [result.status, error, lead.id]);
  if (result.status !== 'sent') console.warn(`[leads] notification for lead ${lead.id} ${result.status}: ${error}`);
}

interface LeadFilters {
  q: string;
  status: string;
  source: string;
  from: string;
  to: string;
}

function filtersFrom(url: URL): LeadFilters {
  const p = url.searchParams;
  return { q: p.get('q') || '', status: p.get('status') || '', source: p.get('source') || '', from: p.get('from') || '', to: p.get('to') || '' };
}

function whereClause(f: LeadFilters): { sql: string; params: unknown[] } {
  const parts: string[] = [];
  const params: unknown[] = [];
  if (f.q.trim()) {
    params.push(`%${f.q.trim().toLowerCase()}%`);
    parts.push(`(lower(coalesce(name,'')) LIKE $${params.length} OR lower(coalesce(email,'')) LIKE $${params.length}
             OR coalesce(phone,'') LIKE $${params.length} OR lower(coalesce(message,'')) LIKE $${params.length})`);
  }
  if ((STATUSES as readonly string[]).includes(f.status)) {
    params.push(f.status);
    parts.push(`status = $${params.length}`);
  } else if (f.status !== 'all') {
    parts.push(`status <> 'spam'`);
  }
  if (f.source) {
    params.push(f.source);
    parts.push(`source = $${params.length}`);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(f.from)) {
    params.push(f.from);
    parts.push(`created_at >= $${params.length}::date`);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(f.to)) {
    params.push(f.to);
    parts.push(`created_at < ($${params.length}::date + 1)`);
  }
  return { sql: parts.length ? `WHERE ${parts.join(' AND ')}` : '', params };
}

/** Maps a column header from a WordPress/Flamingo export to a lead field. */
function importField(header: string): keyof Omit<ReturnType<typeof toLead>, 'id'> | 'date' | null {
  const h = header.toLowerCase().replace(/[^a-z]/g, '');
  if (/^(yourname|name|fullname|fname|firstname)$/.test(h)) return 'name';
  if (/email/.test(h)) return 'email';
  if (/(phone|mobile|tel|whatsapp|contact)/.test(h)) return 'phone';
  if (/(message|comments|details|requirement|yourmessage|description)/.test(h)) return 'message';
  if (/(country|location|city)/.test(h)) return 'country';
  if (/(website|url|site)/.test(h)) return 'website';
  if (/^(date|submitted|created|createdat|time)$/.test(h)) return 'date';
  if (/(channel|form|subject|source)/.test(h)) return 'source';
  return null;
}

export async function handleLeadsApi(req: IncomingMessage, res: ServerResponse, url: URL): Promise<boolean> {
  const method = (req.method || 'GET').toUpperCase();
  const pathname = url.pathname.replace(/\/+$/, '');

  // --- Public form submission ------------------------------------------------
  if (pathname === '/api/leads') {
    if (method !== 'POST') throw new HttpError(405, 'Use POST.');
    const ip = clientIp(req);
    const wait = submitLimiter.check(ip);
    if (wait > 0) throw new HttpError(429, `Too many submissions. Please try again in ${wait}s.`);
    submitLimiter.hit(ip);

    const body = await readJsonBody<Record<string, unknown>>(req, 64 * 1024);
    const source = clip(body.source, 100);
    if (!source) throw new HttpError(400, 'Form name (source) is required.');
    const email = clip(body.email, 200)?.toLowerCase() ?? null;
    const phone = clip(body.phone, 40);
    if (email && !EMAIL_RE.test(email)) throw new HttpError(400, 'Please enter a valid email address.');
    if (phone && !/^[\d\s()+\-.]{6,40}$/.test(phone)) throw new HttpError(400, 'Please enter a valid phone number.');
    if (!email && !phone) throw new HttpError(400, 'Please give an email address or a phone number.');

    // Hidden "hp" field: people never fill it, bots usually do.
    const isSpam = Boolean(clip(body.hp, 200));
    const utmIn = (body.utm && typeof body.utm === 'object' ? body.utm : {}) as Record<string, unknown>;
    const utm: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = clip(utmIn[k], 200);
      if (v) utm[k] = v;
    }
    const extraJson = body.extra && typeof body.extra === 'object' ? JSON.stringify(body.extra) : null;

    const { rows } = await query<LeadRow>(
      `INSERT INTO leads (source, name, email, phone, country, website, message, preferred_slot,
                          page_url, referrer, utm, extra, status, ip_hash, user_agent, email_status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
      [
        source,
        clip(body.name, 120),
        email,
        phone,
        clip(body.country, 80),
        clip(body.website, 300),
        clip(body.message, 5000),
        clip(body.preferredSlot, 120),
        clip(body.pageUrl, 500),
        clip(req.headers.referer, 500),
        Object.keys(utm).length ? JSON.stringify(utm) : null,
        extraJson && extraJson.length <= 4000 ? extraJson : null,
        isSpam ? 'spam' : 'new',
        ipHash(ip),
        clip(req.headers['user-agent'], 300),
        isSpam ? 'skipped' : 'pending',
      ]
    );
    const lead = toLead(rows[0]);
    if (!isSpam) void notify(lead).catch((err) => console.error('[leads] notify failed', err));
    sendJson(res, 201, { ok: true, id: lead.id });
    return true;
  }

  if (!pathname.startsWith('/api/admin/leads')) return false;

  // --- Admin -----------------------------------------------------------------
  const user = await requireUser(req, { roles: ['admin', 'editor'] });

  if (method === 'GET' && pathname === '/api/admin/leads') {
    const f = filtersFrom(url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const pageSize = Math.min(100, Math.max(5, Number(url.searchParams.get('pageSize')) || 25));
    const w = whereClause(f);
    const [items, total, counts, sources] = await Promise.all([
      query<LeadRow>(
        `SELECT * FROM leads ${w.sql} ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
        w.params
      ),
      query<{ count: string }>(`SELECT count(*) FROM leads ${w.sql}`, w.params),
      query<{ status: string; count: string }>('SELECT status, count(*) FROM leads GROUP BY status'),
      query<{ source: string }>('SELECT DISTINCT source FROM leads ORDER BY source'),
    ]);
    sendJson(res, 200, {
      items: items.rows.map(toLead),
      total: Number(total.rows[0].count),
      page,
      pageSize,
      counts: Object.fromEntries(counts.rows.map((r) => [r.status, Number(r.count)])),
      sources: sources.rows.map((r) => r.source),
    });
    return true;
  }

  if (method === 'GET' && pathname === '/api/admin/leads/export.csv') {
    if (user.role !== 'admin') throw new HttpError(403, 'Only admins can export leads.');
    const w = whereClause(filtersFrom(url));
    const { rows } = await query<LeadRow>(`SELECT * FROM leads ${w.sql} ORDER BY created_at DESC`, w.params);
    const csv = toCsv([
      ['ID', 'Received', 'Status', 'Form', 'Name', 'Email', 'Phone', 'Location', 'Website', 'Preferred slot', 'Message', 'Page', 'UTM', 'Notes'],
      ...rows.map((r) => [
        r.id, r.created_at.toISOString(), r.status, r.source, r.name, r.email, r.phone, r.country, r.website,
        r.preferred_slot, r.message, r.page_url, r.utm ? JSON.stringify(r.utm) : '', r.notes,
      ]),
    ]);
    await audit(user, 'export', 'leads', null, { rows: rows.length });
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="eon8-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store',
    });
    res.end(String.fromCharCode(0xfeff) + csv); // BOM so Excel reads UTF-8
    return true;
  }

  if (method === 'POST' && pathname === '/api/admin/leads/import') {
    if (user.role !== 'admin') throw new HttpError(403, 'Only admins can import leads.');
    const body = await readJsonBody<{ csv?: string; source?: string }>(req, 5 * 1024 * 1024);
    const rows = parseCsv(String(body.csv || ''));
    if (rows.length < 2) throw new HttpError(400, 'The CSV needs a header row and at least one lead.');
    const map = rows[0].map(importField);
    if (!map.includes('email') && !map.includes('phone')) {
      throw new HttpError(400, 'No email or phone column found in the CSV header.');
    }
    const defaultSource = clip(body.source, 100) || 'wordpress-import';
    let imported = 0;
    let skipped = 0;
    for (const row of rows.slice(1)) {
      const rec: Record<string, string> = {};
      row.forEach((value, i) => {
        const field = map[i];
        if (field && value.trim() && !rec[field]) rec[field] = value.trim();
      });
      const email = rec.email?.toLowerCase();
      if (!email && !rec.phone) {
        skipped += 1;
        continue;
      }
      const created = rec.date && !Number.isNaN(Date.parse(rec.date)) ? new Date(rec.date) : new Date();
      await query(
        `INSERT INTO leads (source, name, email, phone, country, website, message, status, email_status, created_at, notes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,'contacted','skipped',$8,'Imported from WordPress')`,
        [clip(rec.source, 100) || defaultSource, clip(rec.name, 120), email ? clip(email, 200) : null, clip(rec.phone, 40),
          clip(rec.country, 80), clip(rec.website, 300), clip(rec.message, 5000), created]
      );
      imported += 1;
    }
    await audit(user, 'import', 'leads', null, { imported, skipped });
    sendJson(res, 200, { imported, skipped });
    return true;
  }

  if (method === 'POST' && pathname === '/api/admin/leads/test-email') {
    if (user.role !== 'admin') throw new HttpError(403, 'Only admins can send test emails.');
    const { notifyEmails } = await getSetting<{ notifyEmails: string[] }>('leads');
    const result = await sendMail({
      to: notifyEmails,
      subject: 'EON8 website: test lead notification',
      text: `This is a test sent from the EON8 admin by ${user.email}. Lead notifications are working.`,
    });
    sendJson(res, result.status === 'sent' ? 200 : 502, result);
    return true;
  }

  const idMatch = pathname.match(/^\/api\/admin\/leads\/(\d+)(\/resend)?$/);
  if (!idMatch) throw new HttpError(404, 'Unknown leads endpoint.');
  const id = Number(idMatch[1]);

  if (method === 'POST' && idMatch[2]) {
    const { rows } = await query<LeadRow>('SELECT * FROM leads WHERE id = $1', [id]);
    if (!rows[0]) throw new HttpError(404, 'Lead not found.');
    await notify(toLead(rows[0]));
    const after = await query<LeadRow>('SELECT * FROM leads WHERE id = $1', [id]);
    sendJson(res, 200, { lead: toLead(after.rows[0]) });
    return true;
  }

  if (method === 'GET') {
    const { rows } = await query<LeadRow>('SELECT * FROM leads WHERE id = $1', [id]);
    if (!rows[0]) throw new HttpError(404, 'Lead not found.');
    sendJson(res, 200, { lead: toLead(rows[0]) });
    return true;
  }

  if (method === 'PATCH') {
    const body = await readJsonBody<{ status?: string; notes?: string }>(req);
    const sets: string[] = [];
    const params: unknown[] = [];
    if (body.status !== undefined) {
      if (!(STATUSES as readonly string[]).includes(body.status)) throw new HttpError(400, 'Unknown lead status.');
      params.push(body.status);
      sets.push(`status = $${params.length}`);
    }
    if (body.notes !== undefined) {
      params.push(clip(body.notes, 5000));
      sets.push(`notes = $${params.length}`);
    }
    if (!sets.length) throw new HttpError(400, 'Nothing to update.');
    params.push(id);
    const { rows } = await query<LeadRow>(
      `UPDATE leads SET ${sets.join(', ')}, updated_at = now() WHERE id = $${params.length} RETURNING *`,
      params
    );
    if (!rows[0]) throw new HttpError(404, 'Lead not found.');
    await audit(user, 'update', 'lead', id, { status: body.status, notesChanged: body.notes !== undefined });
    sendJson(res, 200, { lead: toLead(rows[0]) });
    return true;
  }

  if (method === 'DELETE') {
    if (user.role !== 'admin') throw new HttpError(403, 'Only admins can delete leads.');
    const { rowCount } = await query('DELETE FROM leads WHERE id = $1', [id]);
    if (!rowCount) throw new HttpError(404, 'Lead not found.');
    await audit(user, 'delete', 'lead', id);
    sendJson(res, 200, { ok: true });
    return true;
  }

  throw new HttpError(405, 'Method not allowed.');
}
