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
}

export interface LeadSubmissionResult {
  deliveredToWebhook: boolean;
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
  const endpoint =
    import.meta.env.VITE_LEAD_WEBHOOK_URL || import.meta.env.VITE_API_URL || '';

  if (endpoint && !endpoint.includes('api.example.com')) {
    try {
      const response = await fetch(endpoint, {
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
