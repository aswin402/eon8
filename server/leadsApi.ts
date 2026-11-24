import crypto from 'node:crypto';
import fs from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  atomicWriteJson,
  getClientIp,
  getEnvValue,
  readJsonBody,
  sendJson,
  verifyAdminRequest,
} from './cmsApi.ts';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'archived';

export interface StoredLead {
  id: string;
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  website?: string;
  message?: string;
  preferredSlot?: string;
  pageUrl?: string;
  status: LeadStatus;
  notes?: string;
  webhookForwarded: boolean;
  ipHash: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

interface StoredLeadsState {
  version: number;
  leads: StoredLead[];
}

const VALID_STATUSES = new Set<LeadStatus>(['new', 'contacted', 'qualified', 'won', 'archived']);
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(currentDir, '..');
const LEADS_FILE = path.join(ROOT_DIR, 'data', 'leads.json');

const MAX_LEAD_BODY_BYTES = 64 * 1024; // 64 KB
const MAX_STORED_LEADS = 5000;
const LEAD_RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LEAD_RATE_MAX = 10;
const MAX_RATE_ENTRIES = 5000;
const MIN_HUMAN_FORM_MS = 800;

const leadRateByIp = new Map<string, { count: number; resetAt: number }>();

function pruneLeadRateMap(now: number): void {
  if (leadRateByIp.size === 0) return;
  for (const [key, bucket] of leadRateByIp.entries()) {
    if (bucket.resetAt <= now) {
      leadRateByIp.delete(key);
    }
  }
  if (leadRateByIp.size >= MAX_RATE_ENTRIES) {
    const excess = leadRateByIp.size - Math.floor(MAX_RATE_ENTRIES * 0.8);
    let removed = 0;
    for (const key of leadRateByIp.keys()) {
      leadRateByIp.delete(key);
      removed += 1;
      if (removed >= excess) break;
    }
  }
}

function readLeadsState(): StoredLeadsState {
  if (fs.existsSync(LEADS_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8')) as Partial<StoredLeadsState>;
      return {
        version: parsed.version ?? 1,
        leads: Array.isArray(parsed.leads) ? parsed.leads : [],
      };
    } catch {
      // Fallback empty
    }
  }
  return { version: 1, leads: [] };
}

function writeLeadsState(state: StoredLeadsState): void {
  state.version += 1;
  if (state.leads.length > MAX_STORED_LEADS) {
    state.leads = state.leads.slice(0, MAX_STORED_LEADS);
  }
  atomicWriteJson(LEADS_FILE, state, 0o600);
}

function cleanText(value: unknown, maxLen: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.replace(/\r\n/g, '\n').trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLen);
}

function safeDecodeSegment(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

function escapeCsvCell(value: string | undefined): string {
  const raw = (value || '').replace(/\r\n/g, '\n');
  // Prevent CSV formula injection in Excel / Google Sheets
  const neutralized = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${neutralized.replace(/"/g, '""')}"`;
}

function buildLeadsCsv(leads: StoredLead[]): string {
  const headers = [
    'ID',
    'Created At',
    'Status',
    'Source',
    'Name',
    'Email',
    'Phone',
    'Country / Market',
    'Website',
    'Preferred Slot',
    'Message',
    'Page URL',
    'Notes',
    'Webhook Forwarded',
  ];
  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.createdAt,
      lead.status,
      lead.source,
      lead.name,
      lead.email,
      lead.phone,
      lead.country,
      lead.website,
      lead.preferredSlot,
      lead.message,
      lead.pageUrl,
      lead.notes,
      lead.webhookForwarded ? 'Yes' : 'No',
    ]
      .map(escapeCsvCell)
      .join(',')
  );
  return `${headers.map(escapeCsvCell).join(',')}\n${rows.join('\n')}\n`;
}

async function forwardLeadToWebhook(lead: StoredLead): Promise<boolean> {
  const webhookUrl = getEnvValue('LEAD_WEBHOOK_URL', '');
  if (!webhookUrl || !/^https?:\/\//i.test(webhookUrl) || webhookUrl.includes('example.com')) {
    return false;
  }

  const secret = getEnvValue('LEAD_WEBHOOK_SECRET', '');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'Eon8-Lead-Router/1.0',
    };
    if (secret) {
      headers.Authorization = `Bearer ${secret}`;
    }
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event: 'lead.created',
        lead: {
          id: lead.id,
          source: lead.source,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          country: lead.country,
          website: lead.website,
          preferredSlot: lead.preferredSlot,
          message: lead.message,
          pageUrl: lead.pageUrl,
          createdAt: lead.createdAt,
        },
      }),
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function summarizeLeadCounts(leads: StoredLead[]): Record<LeadStatus | 'total', number> {
  const counts: Record<LeadStatus | 'total', number> = {
    total: leads.length,
    new: 0,
    contacted: 0,
    qualified: 0,
    won: 0,
    archived: 0,
  };
  for (const lead of leads) {
    if (VALID_STATUSES.has(lead.status)) {
      counts[lead.status] += 1;
    }
  }
  return counts;
}

export async function handleLeadsApiRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<boolean> {
  const rawUrl = req.url || '';
  if (!rawUrl.startsWith('/api/leads')) {
    return false;
  }

  const parsedUrl = new URL(rawUrl, 'http://localhost');
  const pathname = parsedUrl.pathname.replace(/\/+$/, '');
  const method = (req.method || 'GET').toUpperCase();

  try {
    // 1. Public Lead Capture Endpoint (POST /api/leads)
    if (method === 'POST' && pathname === '/api/leads') {
      const ip = getClientIp(req);
      const now = Date.now();
      pruneLeadRateMap(now);
      const bucket = leadRateByIp.get(ip);
      if (bucket && bucket.resetAt > now && bucket.count >= LEAD_RATE_MAX) {
        const waitSec = Math.ceil((bucket.resetAt - now) / 1000);
        sendJson(res, 429, {
          error: `Too many enquiries submitted recently. Please wait ${waitSec}s or message us directly on WhatsApp.`,
        });
        return true;
      }

      const body = await readJsonBody<{
        source?: string;
        name?: string;
        email?: string;
        phone?: string;
        country?: string;
        website?: string;
        message?: string;
        preferredSlot?: string;
        pageUrl?: string;
        honeypot?: string;
        companyFax?: string;
        formStartedAt?: number;
      }>(req, MAX_LEAD_BODY_BYTES);

      // Silent bot trap: honeypot populated -> pretend accepted without storing or forwarding
      const trapVal = (body.honeypot || body.companyFax || '').trim();
      if (trapVal.length > 0) {
        sendJson(res, 200, {
          ok: true,
          stored: true,
          id: `lead_ok_${now.toString(36)}`,
          webhookForwarded: false,
        });
        return true;
      }

      // Silent bot trap: impossibly fast submission (< 800ms after form render)
      if (typeof body.formStartedAt === 'number' && Number.isFinite(body.formStartedAt)) {
        const elapsed = now - body.formStartedAt;
        if (elapsed >= 0 && elapsed < MIN_HUMAN_FORM_MS) {
          sendJson(res, 200, {
            ok: true,
            stored: true,
            id: `lead_ok_${now.toString(36)}`,
            webhookForwarded: false,
          });
          return true;
        }
      }

      const source = cleanText(body.source, 160) || 'Website Enquiry';
      const name = cleanText(body.name, 120);
      const email = cleanText(body.email, 160)?.toLowerCase();
      const phone = cleanText(body.phone, 48);
      const country = cleanText(body.country, 120);
      const website = cleanText(body.website, 240);
      const message = cleanText(body.message, 4000);
      const preferredSlot = cleanText(body.preferredSlot, 120);
      const pageUrl = cleanText(body.pageUrl, 500);

      if (!email && (!phone || phone.replace(/\D/g, '').length < 5)) {
        sendJson(res, 400, {
          error: 'Please provide a valid email address or phone number.',
        });
        return true;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        sendJson(res, 400, {
          error: 'Please enter a valid email address.',
        });
        return true;
      }

      const prevCount = bucket && bucket.resetAt > now ? bucket.count : 0;
      leadRateByIp.set(ip, { count: prevCount + 1, resetAt: now + LEAD_RATE_WINDOW_MS });

      const nowIso = new Date().toISOString();
      const leadId = `lead_${now.toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
      const ipHash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 12);

      const record: StoredLead = {
        id: leadId,
        source,
        name,
        email,
        phone,
        country,
        website,
        message,
        preferredSlot,
        pageUrl,
        status: 'new',
        webhookForwarded: false,
        ipHash,
        userAgent: cleanText(req.headers['user-agent'], 200),
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      const webhookForwarded = await forwardLeadToWebhook(record);
      record.webhookForwarded = webhookForwarded;

      const state = readLeadsState();
      state.leads.unshift(record);
      writeLeadsState(state);

      sendJson(res, 201, {
        ok: true,
        stored: true,
        id: record.id,
        webhookForwarded,
      });
      return true;
    }

    // All admin lead routes require authenticated admin session
    if (!verifyAdminRequest(req)) {
      sendJson(res, 401, { error: 'Authentication required. Please sign in again.' });
      return true;
    }

    // 2. Admin List & Search Leads (GET /api/leads/admin)
    if (method === 'GET' && pathname === '/api/leads/admin') {
      const state = readLeadsState();
      const statusFilter = (parsedUrl.searchParams.get('status') || 'all').toLowerCase();
      const query = (parsedUrl.searchParams.get('q') || '').trim().toLowerCase();

      const filtered = state.leads.filter((lead) => {
        if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
        if (query) {
          const haystack = [
            lead.name,
            lead.email,
            lead.phone,
            lead.source,
            lead.country,
            lead.website,
            lead.message,
            lead.pageUrl,
            lead.notes,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          return haystack.includes(query);
        }
        return true;
      });

      sendJson(res, 200, {
        leads: filtered,
        counts: summarizeLeadCounts(state.leads),
      });
      return true;
    }

    // 3. Admin Export CSV (GET /api/leads/admin/export.csv)
    if (method === 'GET' && pathname === '/api/leads/admin/export.csv') {
      const state = readLeadsState();
      const statusFilter = (parsedUrl.searchParams.get('status') || 'all').toLowerCase();
      const filtered =
        statusFilter === 'all'
          ? state.leads
          : state.leads.filter((l) => l.status === statusFilter);
      const csv = buildLeadsCsv(filtered);
      const dateStr = new Date().toISOString().slice(0, 10);
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="eon8-leads-${dateStr}.csv"`,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(csv);
      return true;
    }

    // 4. Admin Update Lead Status / Notes (PATCH /api/leads/admin/:id)
    if (method === 'PATCH' && pathname.startsWith('/api/leads/admin/')) {
      const id = safeDecodeSegment(pathname.slice('/api/leads/admin/'.length));
      if (!id) {
        sendJson(res, 400, { error: 'Invalid lead ID.' });
        return true;
      }

      const body = await readJsonBody<{ status?: string; notes?: string }>(req, 16 * 1024);
      const state = readLeadsState();
      const idx = state.leads.findIndex((l) => l.id === id);
      if (idx < 0) {
        sendJson(res, 404, { error: 'Lead not found.' });
        return true;
      }

      const current = state.leads[idx];
      let nextStatus = current.status;
      if (body.status !== undefined) {
        const candidate = body.status.toLowerCase() as LeadStatus;
        if (!VALID_STATUSES.has(candidate)) {
          sendJson(res, 400, { error: 'Invalid lead status.' });
          return true;
        }
        nextStatus = candidate;
      }

      const updated: StoredLead = {
        ...current,
        status: nextStatus,
        notes: body.notes !== undefined ? cleanText(body.notes, 2000) : current.notes,
        updatedAt: new Date().toISOString(),
      };
      state.leads[idx] = updated;
      writeLeadsState(state);

      sendJson(res, 200, { lead: updated, counts: summarizeLeadCounts(state.leads) });
      return true;
    }

    // 5. Admin Delete Lead (DELETE /api/leads/admin/:id)
    if (method === 'DELETE' && pathname.startsWith('/api/leads/admin/')) {
      const id = safeDecodeSegment(pathname.slice('/api/leads/admin/'.length));
      if (!id) {
        sendJson(res, 400, { error: 'Invalid lead ID.' });
        return true;
      }
      const state = readLeadsState();
      const before = state.leads.length;
      state.leads = state.leads.filter((l) => l.id !== id);
      if (state.leads.length !== before) {
        writeLeadsState(state);
      }
      sendJson(res, 200, { ok: true, counts: summarizeLeadCounts(state.leads) });
      return true;
    }

    sendJson(res, 404, { error: `Unknown Leads endpoint: ${method} ${pathname}` });
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    const isClientError = /Payload exceeds|Invalid JSON/i.test(message);
    sendJson(res, isClientError ? 400 : 500, { error: message });
    return true;
  }
}
