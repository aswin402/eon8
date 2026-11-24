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
  honeypot?: string;
  formStartedAt?: number;
}

export interface LeadSubmissionResult {
  deliveredToWebhook: boolean;
  storedInInbox?: boolean;
  leadId?: string;
  error?: string;
  whatsappHref: string;
  mailtoHref: string;
}

const WHATSAPP_NUMBER = '919042294007';
const SALES_EMAIL = 'info@eon8.com';

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

  return {
    whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    mailtoHref: `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
  };
}

export async function submitLeadEnquiry(
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionResult> {
  const enriched: LeadSubmissionPayload = {
    ...payload,
    pageUrl:
      payload.pageUrl || (typeof window !== 'undefined' ? window.location.href : undefined),
  };

  const links = buildLeadSummaryLinks(enriched);

  // 1. Primary delivery: built-in Eon8 Node Leads API (persists to Inbox + forwards server webhook)
  try {
    const apiRes = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...enriched,
        submittedAt: new Date().toISOString(),
      }),
    });

    const contentType = apiRes.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = (await apiRes.json()) as {
        ok?: boolean;
        stored?: boolean;
        id?: string;
        error?: string;
      };
      if (apiRes.ok && data.ok) {
        return {
          deliveredToWebhook: true,
          storedInInbox: Boolean(data.stored),
          leadId: data.id,
          ...links,
        };
      }
      if (apiRes.status === 400 || apiRes.status === 429) {
        return {
          deliveredToWebhook: false,
          storedInInbox: false,
          error: data.error || 'Could not submit enquiry right now.',
          ...links,
        };
      }
    }
  } catch {
    // Fall through to optional client webhook or instant WhatsApp/Email links
  }

  // 2. Optional client-side webhook fallback (for static previews without Node server)
  const fallbackEndpoint =
    import.meta.env.VITE_LEAD_WEBHOOK_URL || import.meta.env.VITE_API_URL || '';

  if (fallbackEndpoint && !fallbackEndpoint.includes('api.example.com')) {
    try {
      const response = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...enriched,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        return { deliveredToWebhook: true, ...links };
      }
    } catch {
      // Fall through cleanly so user still receives WhatsApp / Email / Thank-You confirmation options
    }
  }

  return { deliveredToWebhook: false, ...links };
}
