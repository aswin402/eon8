import { useEffect, useState } from 'react';

/** Public site settings edited in Admin > Site Settings (server/settingsApi.ts). */
export interface SiteSettings {
  contact: { phone: string; whatsapp: string; email: string; address: string };
  social: { instagram: string; facebook: string; linkedin: string; x: string; youtube: string };
  branding: { headerLogo: string; headerLogoDark: string; footerLogo: string; favicon: string; shareImage: string };
}

/** Same values the site used before settings existed, shown until the API answers. */
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contact: {
    phone: '+91 90422 94007',
    whatsapp: '919042294007',
    email: 'info@eon8.com',
    address: 'Mumbai, Hyderabad, Bangalore, Chennai',
  },
  social: {
    instagram: 'https://www.instagram.com/eon8_official/',
    facebook: 'https://www.facebook.com/people/Eon8-The-Digital-Infinity/61588594388907/',
    linkedin: 'https://www.linkedin.com/company/eon-8/',
    x: 'https://x.com/eon8digital',
    youtube: 'https://www.youtube.com/@Eon8TheDigitalInfinity/videos',
  },
  branding: {
    headerLogo: '/wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.png',
    headerLogoDark: '/wp-content/uploads/2026/03/Logo_bg-1.png',
    footerLogo: '/wp-content/uploads/2026/03/Logo_bg-1.png',
    favicon: '/favicon.svg',
    shareImage: '',
  },
};

let cached: SiteSettings | null = null;
let inflight: Promise<SiteSettings> | null = null;

function fetchSiteSettings(): Promise<SiteSettings> {
  if (cached) return Promise.resolve(cached);
  inflight ??= fetch('/api/settings')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((body: { settings?: Partial<SiteSettings> }) => {
      cached = {
        contact: { ...DEFAULT_SITE_SETTINGS.contact, ...body.settings?.contact },
        social: { ...DEFAULT_SITE_SETTINGS.social, ...body.settings?.social },
        branding: { ...DEFAULT_SITE_SETTINGS.branding, ...body.settings?.branding },
      };
      return cached;
    })
    .catch(() => DEFAULT_SITE_SETTINGS)
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Settings for code outside React (lead fallback links): the loaded values or the defaults. */
export function getSiteSettingsSnapshot(): SiteSettings {
  if (!cached) void fetchSiteSettings();
  return cached ?? DEFAULT_SITE_SETTINGS;
}

export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(cached ?? DEFAULT_SITE_SETTINGS);
  useEffect(() => {
    let active = true;
    fetchSiteSettings().then((s) => {
      if (active) setSettings(s);
    });
    return () => {
      active = false;
    };
  }, []);
  return settings;
}

/** "+91 90422 94007" -> "tel:+919042294007" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
