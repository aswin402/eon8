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
  /** Hidden honeypot field value; real visitors leave it empty. */
  hp?: string;
}

export interface LeadSubmissionResult {
  /**
   * True when the enquiry reached the server and was saved. (Kept under this
   * name so existing forms keep working; it no longer means "webhook only".)
   */
  deliveredToWebhook: boolean;
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

// Remember the form that was just submitted so its hidden spam-trap field
// (<LeadHoneypot />) can be read without changing each form's submit code.
let lastSubmittedForm: HTMLFormElement | null = null;
if (typeof document !== 'undefined') {
  document.addEventListener(
    'submit',
    (event) => {
      if (event.target instanceof HTMLFormElement) lastSubmittedForm = event.target;
    },
    true
  );
}

function honeypotValue(): string {
  const field = lastSubmittedForm?.elements.namedItem('hp');
  return field instanceof HTMLInputElement ? field.value : '';
}

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

  const saved = await postJson('/api/leads', {
    ...enriched,
    hp: enriched.hp ?? honeypotValue(),
    utm: campaignParams(),
  });

  const webhook = import.meta.env.VITE_LEAD_WEBHOOK_URL || '';
  if (webhook && !webhook.includes('api.example.com')) {
    void postJson(webhook, { ...enriched, hp: undefined, submittedAt: new Date().toISOString() });
  }

  return { deliveredToWebhook: saved, ...links };
}
