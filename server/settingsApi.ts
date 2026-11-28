import type { IncomingMessage, ServerResponse } from 'node:http';
import { audit, requireUser } from './lib/auth.ts';
import { query } from './lib/db.ts';
import { HttpError, readJsonBody, sendJson } from './lib/http.ts';

type Validator = (input: Record<string, unknown>) => Record<string, unknown>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const httpsUrl = (v: unknown, field: string) => {
  const s = text(v, 500);
  if (s && !/^https:\/\/[^\s]+$/i.test(s)) throw new HttpError(400, `${field} must be an https:// link.`);
  return s;
};
/** A site image: a path on this site (/wp-content/uploads/..., /uploads/...) or an https:// link. */
const imagePath = (v: unknown, field: string, required: boolean) => {
  const s = text(v, 500);
  if (!s) {
    if (required) throw new HttpError(400, `${field} is required.`);
    return s;
  }
  if (!/^(\/[^\s]*|https:\/\/[^\s]+)$/i.test(s) || s.startsWith('//')) {
    throw new HttpError(400, `${field} must be a path like /wp-content/uploads/... or an https:// link.`);
  }
  if (!/\.(png|jpe?g|webp|gif|svg|avif|ico)(\?.*)?$/i.test(s)) throw new HttpError(400, `${field} must be an image file.`);
  return s;
};

const list = (v: unknown) =>
  (Array.isArray(v) ? v : String(v ?? '').split(/[\n,;]+/))
    .map((x) => String(x).trim())
    .filter(Boolean);

interface SettingDef {
  /** Whether visitors' browsers may read it (contact details, tracking IDs). */
  public: boolean;
  defaults: Record<string, unknown>;
  validate: Validator;
}

/** Defaults match what the site hard-codes today, so nothing changes until an admin edits them. */
export const SETTINGS: Record<string, SettingDef> = {
  contact: {
    public: true,
    defaults: {
      phone: '+91 90422 94007',
      whatsapp: '919042294007',
      email: 'info@eon8.com',
      address: 'Mumbai, Hyderabad, Bangalore, Chennai',
    },
    validate: (i) => {
      const email = text(i.email, 200);
      if (email && !EMAIL_RE.test(email)) throw new HttpError(400, 'Contact email is not valid.');
      const whatsapp = text(i.whatsapp, 20).replace(/[^\d]/g, '');
      return { phone: text(i.phone, 40), whatsapp, email, address: text(i.address, 300) };
    },
  },
  social: {
    public: true,
    defaults: {
      instagram: 'https://www.instagram.com/eon8_official/',
      facebook: 'https://www.facebook.com/people/Eon8-The-Digital-Infinity/61588594388907/',
      linkedin: 'https://www.linkedin.com/company/eon-8/',
      x: 'https://x.com/eon8digital',
      youtube: 'https://www.youtube.com/@Eon8TheDigitalInfinity/videos',
    },
    validate: (i) => ({
      instagram: httpsUrl(i.instagram, 'Instagram'),
      facebook: httpsUrl(i.facebook, 'Facebook'),
      linkedin: httpsUrl(i.linkedin, 'LinkedIn'),
      x: httpsUrl(i.x, 'X'),
      youtube: httpsUrl(i.youtube, 'YouTube'),
    }),
  },
  branding: {
    public: true,
    defaults: {
      headerLogo: '/wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.png',
      headerLogoDark: '/wp-content/uploads/2026/03/Logo_bg-1.png',
      footerLogo: '/wp-content/uploads/2026/03/Logo_bg-1.png',
      favicon: '/favicon.svg',
      shareImage: '',
    },
    validate: (i) => ({
      headerLogo: imagePath(i.headerLogo, 'Header logo', true),
      headerLogoDark: imagePath(i.headerLogoDark, 'Header logo (dark mode)', true),
      footerLogo: imagePath(i.footerLogo, 'Footer logo', true),
      favicon: imagePath(i.favicon, 'Favicon', true),
      shareImage: imagePath(i.shareImage, 'Default share image', false),
    }),
  },
  leads: {
    public: false,
    defaults: { notifyEmails: [] as string[] },
    validate: (i) => {
      const notifyEmails = list(i.notifyEmails).map((e) => e.toLowerCase());
      const bad = notifyEmails.find((e) => !EMAIL_RE.test(e));
      if (bad) throw new HttpError(400, `"${bad}" is not a valid email address.`);
      if (notifyEmails.length > 20) throw new HttpError(400, 'Use at most 20 lead recipients.');
      return { notifyEmails: [...new Set(notifyEmails)] };
    },
  },
  tracking: {
    public: true,
    defaults: {
      gtmId: '',
      googleAdsIds: [] as string[],
      googleSiteVerification: '',
      facebookDomainVerification: '',
      tawkPropertyId: '',
      tawkWidgetId: '',
    },
    validate: (i) => {
      const gtmId = text(i.gtmId, 20).toUpperCase();
      if (gtmId && !/^GTM-[A-Z0-9]{4,12}$/.test(gtmId)) throw new HttpError(400, 'GTM ID looks like GTM-XXXXXXX.');
      const googleAdsIds = list(i.googleAdsIds).map((x) => x.toUpperCase());
      const badAds = googleAdsIds.find((x) => !/^AW-\d{6,14}$/.test(x));
      if (badAds) throw new HttpError(400, `"${badAds}" is not a Google Ads ID (AW-1234567890).`);
      const token = (v: unknown, field: string) => {
        const s = text(v, 120);
        if (s && !/^[A-Za-z0-9_-]+$/.test(s)) throw new HttpError(400, `${field} contains invalid characters.`);
        return s;
      };
      return {
        gtmId,
        googleAdsIds,
        googleSiteVerification: token(i.googleSiteVerification, 'Google verification code'),
        facebookDomainVerification: token(i.facebookDomainVerification, 'Facebook verification code'),
        // Tawk.to live chat: Dashboard > Administration > Chat Widget shows https://embed.tawk.to/<property>/<widget>.
        tawkPropertyId: token(i.tawkPropertyId, 'Tawk.to property ID'),
        tawkWidgetId: token(i.tawkWidgetId, 'Tawk.to widget ID'),
      };
    },
  },
};

export async function getSetting<T extends Record<string, unknown>>(key: string): Promise<T> {
  const def = SETTINGS[key];
  const { rows } = await query<{ value: Record<string, unknown> }>('SELECT value FROM site_settings WHERE key = $1', [key]);
  return { ...def.defaults, ...(rows[0]?.value ?? {}) } as T;
}

export async function getPublicSettings(): Promise<Record<string, Record<string, unknown>>> {
  const out: Record<string, Record<string, unknown>> = {};
  for (const [key, def] of Object.entries(SETTINGS)) {
    if (def.public) out[key] = await getSetting(key);
  }
  return out;
}

export async function handleSettingsApi(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
): Promise<boolean> {
  const method = (req.method || 'GET').toUpperCase();
  const pathname = url.pathname.replace(/\/+$/, '');

  if (method === 'GET' && pathname === '/api/settings') {
    sendJson(res, 200, { settings: await getPublicSettings() }, { 'Cache-Control': 'public, max-age=60' });
    return true;
  }

  if (!pathname.startsWith('/api/admin/settings')) return false;
  const user = await requireUser(req, { roles: ['admin'] });

  if (method === 'GET' && pathname === '/api/admin/settings') {
    const settings: Record<string, unknown> = {};
    for (const key of Object.keys(SETTINGS)) settings[key] = await getSetting(key);
    sendJson(res, 200, { settings });
    return true;
  }

  if (method === 'PUT' && pathname.startsWith('/api/admin/settings/')) {
    const key = pathname.slice('/api/admin/settings/'.length);
    const def = SETTINGS[key];
    if (!def) throw new HttpError(404, `Unknown settings group "${key}".`);
    const body = await readJsonBody<Record<string, unknown>>(req);
    const value = def.validate(body);
    await query(
      `INSERT INTO site_settings (key, value, updated_at, updated_by) VALUES ($1, $2, now(), $3)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now(), updated_by = EXCLUDED.updated_by`,
      [key, JSON.stringify(value), user.id]
    );
    await audit(user, 'update', 'settings', key, key === 'leads' ? { count: (value.notifyEmails as string[]).length } : value);
    sendJson(res, 200, { key, value });
    return true;
  }

  throw new HttpError(404, 'Unknown settings endpoint.');
}
