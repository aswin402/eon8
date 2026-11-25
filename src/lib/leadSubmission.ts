import { getSiteSettingsSnapshot } from './siteSettings';

export interface LeadSubmissionPayload {
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  website?: string;
  message?: string;
  preferredSlot?: string;
  pageUrl?: string;
  /** Hidden spam-trap field value (<SpamHoneypotField />); real visitors leave it empty. */
  honeypot?: string;
  /** Date.now() when the form was opened; used to flag bot-speed submissions. */
  formStartedAt?: number;
}

export interface LeadSubmissionResult {
  /**
   * True when the enquiry reached the server and was saved. (Kept under this
   * name so existing forms keep working; it no longer means "webhook only".)
   */
  deliveredToWebhook: boolean;
  /** True when the server saved the lead (shown in Admin > Leads). */
  storedInInbox?: boolean;
  leadId?: string | number;
  /** Message to show the visitor when the server rejected the form (validation or rate limit). */
  error?: string;
  whatsappHref: string;
  mailtoHref: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
const UTM_STORAGE_KEY = 'eon8_first_touch_utm';

/** Keeps the campaign parameters from the visitor's first page so a lead can be attributed. */
function campaignParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const fromUrl: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value.slice(0, 200);
  }
  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Record<string, string>;
    if (Object.keys(fromUrl).length) window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
  } catch {
    // Storage can be unavailable (private mode); fall back to the current URL.
  }
  return fromUrl;
}

// Capture campaign parameters on the landing page, before the visitor navigates away.
campaignParams();

export function buildLeadSummaryLinks(payload: LeadSubmissionPayload): {
  whatsappHref: string;
  mailtoHref: string;
} {
  const lines = [
    `Hi EON8 Team, I'd like to discuss a project (${payload.source}).`,
    payload.name ? `Name: ${payload.name}` : '',
    payload.email ? `Email: ${payload.email}` : '',
    payload.phone ? `Phone: ${payload.phone}` : '',
    payload.country ? `Location: ${payload.country}` : '',
    payload.website ? `Website: ${payload.website}` : '',
    payload.preferredSlot ? `Preferred Slot: ${payload.preferredSlot}` : '',
    payload.message ? `Details: ${payload.message}` : '',
    payload.pageUrl ? `Page: ${payload.pageUrl}` : '',
  ].filter(Boolean);

  const text = lines.join('\n');
  const subject = `EON8 Website Enquiry — ${payload.name || payload.source}`;
  const { contact } = getSiteSettingsSnapshot();

  return {
    whatsappHref: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`,
    mailtoHref: `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
  };
}

/**
 * Tells Google Tag Manager that a lead was saved ("generate_lead" event with the
 * form name), so conversions can be set up in GTM without code changes. No
 * personal details are sent. Does nothing when GTM is not on the page.
 */
function trackLeadConversion(source: string): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'generate_lead', lead_source: source, page_path: window.location.pathname });
}

async function postJson(url: string, body: unknown): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Saves the enquiry on the EON8 server (which emails the sales team) and, if
 * configured, also posts it to an external webhook such as a CRM. Visitors
 * always get WhatsApp/email links as a fallback.
 */
export async function submitLeadEnquiry(
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionResult> {
  const enriched: LeadSubmissionPayload = {
    ...payload,
    pageUrl:
      payload.pageUrl || (typeof window !== 'undefined' ? window.location.href : undefined),
  };
  const links = buildLeadSummaryLinks(enriched);
  const { honeypot, formStartedAt, ...lead } = enriched;
  const elapsedMs =
    typeof formStartedAt === 'number' && formStartedAt > 0 ? Date.now() - formStartedAt : undefined;

  let saved = false;
  let leadId: string | number | undefined;
  let error: string | undefined;
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, hp: honeypot || '', elapsedMs, utm: campaignParams() }),
    });
    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; id?: string | number; error?: string };
    if (response.ok && data.ok) {
      saved = true;
      leadId = data.id;
    } else if (response.status === 400 || response.status === 429) {
      error = data.error || 'Could not submit your enquiry right now. Please try again.';
    }
  } catch {
    // Network error: the visitor still gets the WhatsApp / email links below.
  }

  if (saved) trackLeadConversion(lead.source);

  const webhook = import.meta.env.VITE_LEAD_WEBHOOK_URL || '';
  if (!error && webhook && !webhook.includes('api.example.com')) {
    void postJson(webhook, { ...lead, submittedAt: new Date().toISOString() });
  }

  return { deliveredToWebhook: saved, storedInInbox: saved, leadId, error, ...links };
}
