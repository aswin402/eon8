/** Small typed client for the admin endpoints in server/*Api.ts (cookie session). */
export async function adminFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const res = await fetch(url, { ...init, headers, credentials: 'include' });
  const type = res.headers.get('content-type') || '';
  if (!type.includes('application/json')) {
    throw new Error(
      res.ok ? 'Unexpected response from the server.' : `The server returned an error (${res.status}).`
    );
  }
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status}).`);
  return data;
}

export const jsonBody = (body: unknown): RequestInit['body'] => JSON.stringify(body);

export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface Lead {
  id: number;
  source: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  website: string | null;
  message: string | null;
  preferredSlot: string | null;
  pageUrl: string | null;
  referrer: string | null;
  utm: Record<string, string> | null;
  extra: Record<string, unknown> | null;
  status: LeadStatus;
  notes: string | null;
  emailStatus: 'pending' | 'sent' | 'failed' | 'skipped';
  emailError: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadList {
  items: Lead[];
  total: number;
  page: number;
  pageSize: number;
  counts: Partial<Record<LeadStatus, number>>;
  sources: string[];
}

export interface RedirectRule {
  id: number;
  sourcePath: string;
  target: string;
  statusCode: 301 | 302 | 307 | 308 | 410;
  isActive: boolean;
  hits: number;
  lastHitAt: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PageSeoOverride {
  path: string;
  title: string | null;
  description: string | null;
  ogImage: string | null;
  canonical: string | null;
  noindex: boolean;
  schemaJson: unknown;
  updatedAt: string;
}

export interface AdminUserRecord {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuditEntry {
  id: number;
  userEmail: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  detail: unknown;
  createdAt: string;
}

export interface SystemStatus {
  database: string;
  mailConfigured: boolean;
  /** Whether lead personal data is encrypted at rest (DATA_ENCRYPTION_KEY). */
  leadEncryption?: 'on' | 'off';
  counts: Record<string, number>;
}

export const formatDateTime = (iso: string | null | undefined): string =>
  iso
    ? new Date(iso).toLocaleString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

/** A random temporary password that passes the server's password rules. */
export function generateTempPassword(): string {
  const sets = ['abcdefghijkmnpqrstuvwxyz', 'ABCDEFGHJKLMNPQRSTUVWXYZ', '23456789', '!@#$%*?'];
  const all = sets.join('');
  const pick = (chars: string) => chars[crypto.getRandomValues(new Uint32Array(1))[0] % chars.length];
  const chars = [...sets.map(pick), ...Array.from({ length: 12 }, () => pick(all))];
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}
