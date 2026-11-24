import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, MessageCircle, PhoneCall, Send, ShieldCheck } from 'lucide-react';
import { submitLeadEnquiry, type LeadSubmissionResult } from '@/lib/leadSubmission';
import { VERTICAL_THEMES, type VerticalTheme } from './types';
import { LeadHoneypot } from '@/components/LeadHoneypot';

interface LeadCaptureCardProps {
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  theme?: VerticalTheme;
  showCountry?: boolean;
  showWebsite?: boolean;
  showMessage?: boolean;
  showMathChallenge?: boolean;
  compact?: boolean;
  id?: string;
}

const DIAL_CODES = [
  { label: '🇮🇳 +91', value: '+91' },
  { label: '🇺🇸 +1', value: '+1' },
  { label: '🇬🇧 +44', value: '+44' },
  { label: '🇦🇪 +971', value: '+971' },
  { label: '🇸🇬 +65', value: '+65' },
  { label: '🇦🇺 +61', value: '+61' },
];

export function LeadCaptureCard({
  heading = 'Request Free Quote',
  subheading,
  submitLabel = 'Submit Enquiry',
  theme = 'brand',
  showCountry = false,
  showWebsite = false,
  showMessage = true,
  showMathChallenge = false,
  compact = false,
  id,
}: LeadCaptureCardProps) {
  const palette = VERTICAL_THEMES[theme];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dialCode, setDialCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [mathAnswer, setMathAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    text: string;
    result?: LeadSubmissionResult;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || phone.trim().length < 5) {
      setFeedback({
        ok: false,
        text: 'Please enter your name, a valid email address, and phone number.',
      });
      return;
    }
    if (showMathChallenge && mathAnswer.trim() !== '16') {
      setFeedback({
        ok: false,
        text: 'Please enter the correct security answer (12 + 4 = 16).',
      });
      return;
    }

    setSubmitting(true);
    const result = await submitLeadEnquiry({
      source: heading,
      name: name.trim(),
      email: email.trim(),
      phone: `${dialCode} ${phone.trim()}`,
      country: country.trim() || undefined,
      website: website.trim() || undefined,
      message: message.trim() || undefined,
    });
    setSubmitting(false);

    setFeedback({
      ok: true,
      text: result.deliveredToWebhook
        ? 'Thank you! Our strategy specialists have received your enquiry and will reach out within 24 hours.'
        : 'Enquiry prepared! Connect instantly with our strategy desk via WhatsApp or email below.',
      result,
    });
    setName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setWebsite('');
    setMessage('');
    setMathAnswer('');
  };

  const inputCls =
    'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 px-4 py-3 text-[14.5px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0053C6] dark:focus:ring-sky-400 transition-all';

  return (
    <div
      id={id}
      className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      }`}
    >
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          {heading}
        </h3>
        {subheading && (
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{subheading}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        <LeadHoneypot />
        <div>
          <label className="sr-only" htmlFor={`${id || 'lead'}-name`}>
            Full Name
          </label>
          <input
            id={`${id || 'lead'}-name`}
            name="fname"
            type="text"
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            required
          />
        </div>

        <div>
          <label className="sr-only" htmlFor={`${id || 'lead'}-email`}>
            Work Email
          </label>
          <input
            id={`${id || 'lead'}-email`}
            name="email"
            type="email"
            placeholder="Business Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            required
          />
        </div>

        <div className="grid grid-cols-[106px_1fr] gap-2.5">
          <select
            aria-label="Country dial code"
            value={dialCode}
            onChange={(e) => setDialCode(e.target.value)}
            className={inputCls}
          >
            {DIAL_CODES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <input
            name="phone"
            type="tel"
            placeholder="Mobile / WhatsApp *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
            required
          />
        </div>

        {showCountry && (
          <input
            name="country"
            type="text"
            placeholder="Country / City"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={inputCls}
          />
        )}

        {showWebsite && (
          <input
            name="website"
            type="url"
            placeholder="Website or Project URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={inputCls}
          />
        )}

        {showMessage && (
          <textarea
            name="your-message"
            rows={compact ? 2 : 3}
            placeholder="Tell us about your goals or project..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputCls} resize-none`}
          />
        )}

        {showMathChallenge && (
          <div>
            <label
              htmlFor={`${id || 'lead'}-math`}
              className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1"
            >
              Security Check: 12 + 4 = ?
            </label>
            <input
              id={`${id || 'lead'}-math`}
              type="text"
              inputMode="numeric"
              placeholder="Enter 16"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              className={inputCls}
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full min-h-[48px] rounded-xl font-bold text-[15px] px-6 py-3 inline-flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer disabled:opacity-60 ${palette.primaryBtn}`}
        >
          <span>{submitting ? 'Submitting...' : submitLabel}</span>
          <Send className="w-4 h-4" />
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>100% Confidential • Response under 24 hrs</span>
        </p>

        {feedback && (
          <div
            role="status"
            className={`rounded-xl px-4 py-3 text-sm font-medium space-y-2.5 ${
              feedback.ok
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
            }`}
          >
            <div className="flex items-start gap-2">
              {feedback.ok && <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />}
              <span>{feedback.text}</span>
            </div>

            {feedback.ok && feedback.result && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={feedback.result.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold no-underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send on WhatsApp</span>
                </a>
                <a
                  href={feedback.result.mailtoHref}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold no-underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send via Email</span>
                </a>
                <Link
                  to="/thank-you"
                  className="inline-flex items-center px-2.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-200 underline"
                >
                  Next Steps →
                </Link>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

interface QuickCallbackBannerProps {
  heading?: string;
  submitLabel?: string;
  theme?: VerticalTheme;
}

export function QuickCallbackBanner({
  heading = 'Get a 5-Minute Instant Callback From Our Growth Specialists',
  submitLabel = 'Call Me Back',
  theme = 'brand',
}: QuickCallbackBannerProps) {
  const palette = VERTICAL_THEMES[theme];
  const [phone, setPhone] = useState('');
  const [callbackResult, setCallbackResult] = useState<LeadSubmissionResult | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 5) return;
    const result = await submitLeadEnquiry({
      source: '5-Minute Callback Request',
      phone: phone.trim(),
    });
    setCallbackResult(result);
    setPhone('');
  };

  return (
    <section className={`py-7 px-4 sm:px-6 ${palette.ctaGradient} text-white`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3.5 text-center lg:text-left">
          <div className="hidden sm:flex w-11 h-11 rounded-xl bg-white/15 items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-heading font-bold text-white leading-snug">
            {heading}
          </h2>
        </div>

        {callbackResult ? (
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-sm font-semibold text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>
              {callbackResult.deliveredToWebhook
                ? 'Callback requested! Expect our call shortly.'
                : 'Number noted — ping us on WhatsApp for an instant callback:'}
            </span>
            <a
              href={callbackResult.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold no-underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Now</span>
            </a>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
          >
            <LeadHoneypot />
            <input
              type="tel"
              placeholder="Enter Mobile / WhatsApp Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="flex-1 min-h-[46px] rounded-xl bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm whitespace-nowrap transition-colors shadow-md cursor-pointer"
            >
              {submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
