import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, CircleAlert, ImagePlus, Mail } from 'lucide-react';
import { adminFetch, jsonBody, type SystemStatus } from '@/lib/admin/adminApi';
import { AdminMediaLibrary } from './AdminMediaModal';
import { ui } from './adminStyles';

type Group = 'branding' | 'contact' | 'social' | 'leads' | 'tracking';
type Values = Record<string, string | boolean>;

const FIELDS: Record<Group, { title: string; hint: string; fields: Array<{ key: string; label: string; placeholder?: string; multiline?: boolean; image?: boolean }> }> = {
  branding: {
    title: 'Logos & favicon',
    hint: 'Pick from the media library (the same /wp-content/uploads files as the WordPress site) or upload a new image.',
    fields: [
      { key: 'headerLogo', label: 'Header logo', image: true },
      { key: 'headerLogoDark', label: 'Header logo in dark mode (light text)', image: true },
      { key: 'footerLogo', label: 'Footer logo', image: true },
      { key: 'favicon', label: 'Browser tab icon (favicon)', image: true },
      { key: 'shareImage', label: 'Default share image (used when a page has none)', image: true },
    ],
  },
  contact: {
    title: 'Contact details',
    hint: 'Shown in the footer, contact page and WhatsApp/email buttons.',
    fields: [
      { key: 'phone', label: 'Phone', placeholder: '+91 90422 94007' },
      { key: 'whatsapp', label: 'WhatsApp number (digits with country code)', placeholder: '919042294007' },
      { key: 'email', label: 'Public email', placeholder: 'info@eon8.com' },
      { key: 'address', label: 'Office locations', placeholder: 'Mumbai, Hyderabad, Bangalore, Chennai' },
    ],
  },
  social: {
    title: 'Social links',
    hint: 'Full https:// links. Leave empty to hide an icon.',
    fields: [
      { key: 'instagram', label: 'Instagram' },
      { key: 'facebook', label: 'Facebook' },
      { key: 'linkedin', label: 'LinkedIn' },
      { key: 'x', label: 'X (Twitter)' },
      { key: 'youtube', label: 'YouTube' },
    ],
  },
  leads: {
    title: 'Lead notifications',
    hint: 'Every website enquiry is emailed to these addresses. One per line.',
    fields: [{ key: 'notifyEmails', label: 'Recipients', placeholder: 'sales@company.com', multiline: true }],
  },
  tracking: {
    title: 'Tracking & verification',
    hint: 'Added to every public page by the server (not to the admin). Leave empty on staging so test visits are not counted.',
    fields: [
      { key: 'gtmId', label: 'Google Tag Manager ID', placeholder: 'GTM-XXXXXXX' },
      { key: 'googleAdsIds', label: 'Google Ads IDs (one per line)', placeholder: 'AW-1234567890', multiline: true },
      { key: 'googleSiteVerification', label: 'Google site verification code' },
      { key: 'facebookDomainVerification', label: 'Facebook domain verification code' },
      { key: 'tawkPropertyId', label: 'Tawk.to live chat: property ID (leave empty to hide the chat)', placeholder: '6346b10737898912e96e3af1' },
      { key: 'tawkWidgetId', label: 'Tawk.to live chat: widget ID', placeholder: 'default' },
    ],
  },
};

const toForm = (value: Record<string, unknown>): Values =>
  Object.fromEntries(Object.entries(value).map(([k, v]) => [k, Array.isArray(v) ? v.join('\n') : typeof v === 'boolean' ? v : String(v ?? '')]));

export function AdminSiteSettingsView() {
  const [forms, setForms] = useState<Partial<Record<Group, Values>>>({});
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState<Group | 'test' | null>(null);
  const [picker, setPicker] = useState<((url: string) => void) | null>(null);

  const load = useCallback(async () => {
    try {
      const [s, sys] = await Promise.all([
        adminFetch<{ settings: Record<Group, Record<string, unknown>> }>('/api/admin/settings'),
        adminFetch<SystemStatus>('/api/admin/system'),
      ]);
      setForms(Object.fromEntries(Object.entries(s.settings).map(([k, v]) => [k, toForm(v)])) as Record<Group, Values>);
      setStatus(sys);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(t);
  }, [load]);

  const save = async (group: Group, e: FormEvent) => {
    e.preventDefault();
    setBusy(group);
    setError('');
    setNotice('');
    try {
      const res = await adminFetch<{ value: Record<string, unknown> }>(`/api/admin/settings/${group}`, {
        method: 'PUT',
        body: jsonBody(forms[group]),
      });
      setForms((f) => ({ ...f, [group]: toForm(res.value) }));
      setNotice(`${FIELDS[group].title} saved.`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const testEmail = async () => {
    setBusy('test');
    setError('');
    setNotice('');
    try {
      await adminFetch('/api/admin/leads/test-email', { method: 'POST', body: '{}' });
      setNotice('Test email sent to the saved recipients.');
    } catch (err) {
      setError(`Test email not sent: ${(err as Error).message}`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      {error && <div className={ui.error}>{error}</div>}
      {notice && <div className={ui.notice} role="status">{notice}</div>}

      {status && (
        <div className={`${ui.card} grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm`}>
          <StatusItem ok={status.database === 'connected'} label="Database" value={status.database} />
          <StatusItem ok={status.mailConfigured} label="Email (SMTP)" value={status.mailConfigured ? 'configured' : 'not configured: leads are saved but not emailed'} />
          <StatusItem
            ok={status.leadEncryption === 'on'}
            label="Lead encryption"
            value={status.leadEncryption === 'on' ? 'on: lead details are encrypted at rest' : 'off: set DATA_ENCRYPTION_KEY on the server'}
          />
          <StatusItem ok label="Leads saved" value={String(status.counts.leads ?? 0)} />
          <StatusItem ok={(status.counts.failedLeadEmails30d ?? 0) === 0} label="Failed lead emails (30 days)" value={String(status.counts.failedLeadEmails30d ?? 0)} />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {(Object.keys(FIELDS) as Group[]).map((group) => (
          <form key={group} onSubmit={(e) => void save(group, e)} className={`${ui.card} space-y-4`}>
            <div>
              <p className="text-base font-heading font-extrabold text-foreground">{FIELDS[group].title}</p>
              <p className={ui.hint}>{FIELDS[group].hint}</p>
            </div>
            {FIELDS[group].fields.map((f) => {
              const id = `set-${group}-${f.key}`;
              const value = String(forms[group]?.[f.key] ?? '');
              const onChange = (v: string) => setForms((all) => ({ ...all, [group]: { ...all[group], [f.key]: v } }));
              return (
                <div key={f.key} className="space-y-1.5">
                  <label htmlFor={id} className={ui.label}>{f.label}</label>
                  {f.image ? (
                    <div className="flex items-start gap-3">
                      <div className="w-24 h-14 shrink-0 rounded-lg border border-border bg-muted/40 overflow-hidden flex items-center justify-center">
                        {value ? <img src={value} alt="" className="max-w-full max-h-full object-contain" /> : <ImagePlus className="w-5 h-5 text-muted-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <input id={id} className={ui.input} value={value} onChange={(e) => onChange(e.target.value)} />
                        <button type="button" className={`${ui.secondaryBtn} !py-1.5 !text-xs`} onClick={() => setPicker(() => onChange)}>
                          <ImagePlus className="w-3.5 h-3.5" /> Choose from media library
                        </button>
                      </div>
                    </div>
                  ) : f.multiline ? (
                    <textarea id={id} rows={3} className={ui.input} placeholder={f.placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
                  ) : (
                    <input id={id} className={ui.input} placeholder={f.placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
                  )}
                </div>
              );
            })}
            <div className="flex flex-wrap gap-2">
              <button type="submit" disabled={busy !== null || !forms[group]} className={ui.primaryBtn}>
                {busy === group ? 'Saving…' : 'Save'}
              </button>
              {group === 'leads' && (
                <button type="button" disabled={busy !== null} className={ui.secondaryBtn} onClick={() => void testEmail()}>
                  <Mail className="w-4 h-4" /> Send test email
                </button>
              )}
            </div>
          </form>
        ))}
      </div>

      {picker && (
        <AdminMediaLibrary
          mode="modal"
          onSelect={(url) => {
            picker(url);
            setPicker(null);
          }}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  );
}

function StatusItem({ ok, label, value }: { ok: boolean; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      {ok ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> : <CircleAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
