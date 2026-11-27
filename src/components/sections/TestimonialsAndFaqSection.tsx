import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Globe,
  Mail,
  MessageCircle,
  Star,
  Video,
} from 'lucide-react';
import { SpamHoneypotField } from '@/components/ui/SpamHoneypotField';
import { submitLeadEnquiry, type LeadSubmissionResult } from '@/lib/leadSubmission';
import { LeadCaptureCard } from './LeadCaptureCard';
import { SmartActionButton } from './SmartActionButton';
import {
  VERTICAL_THEMES,
  type ActionItem,
  type FaqItem,
  type StatItem,
  type TestimonialCardItem,
  type VerticalTheme,
} from './types';

interface TestimonialsSectionProps {
  badge?: string;
  heading?: ReactNode;
  subheading?: ReactNode;
  testimonials: TestimonialCardItem[];
  videoSpotlight?: {
    heading: string;
    description: string;
    embedUrl: string;
  };
  actions?: ActionItem[];
  theme?: VerticalTheme;
  onCustomModal?: () => void;
}

export function TestimonialsSection({
  badge = 'Client Stories',
  heading = 'What Our Clients Say About EON8',
  subheading,
  testimonials,
  videoSpotlight,
  actions = [],
  theme = 'brand',
  onCustomModal,
}: TestimonialsSectionProps) {
  const palette = VERTICAL_THEMES[theme];
  if (!testimonials.length && !videoSpotlight) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 text-foreground">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          {badge && (
            <span className={`inline-block text-xs font-bold uppercase tracking-[0.18em] ${palette.accentText}`}>
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
            {heading}
          </h2>
          {subheading && (
            <div className="text-base sm:text-lg text-muted-foreground">{subheading}</div>
          )}
        </div>

        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-card border border-border p-6 sm:p-7 shadow-xs flex flex-col justify-between gap-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                    {Array.from({ length: t.rating || 5 }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed italic">
                    &ldquo;{t.quote.replace(/^["“]|["”]$/g, '')}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-3">
                    {t.avatarSrc && (
                      <img
                        src={t.avatarSrc}
                        alt={t.name || 'Client partner'}
                        className="w-11 h-11 rounded-full object-cover border border-border shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground">
                        {t.name || 'Verified Partner'}
                      </h3>
                      {t.role && (
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      )}
                    </div>
                  </div>

                  {t.caseStudyHref && (
                    <Link
                      to={t.caseStudyHref}
                      className={`inline-flex items-center gap-1 min-h-[36px] py-1.5 text-xs font-bold no-underline ${palette.accentText}`}
                    >
                      <span>{t.caseStudyLabel || 'Case Study'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {videoSpotlight && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-card border border-border p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
                {videoSpotlight.heading}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {videoSpotlight.description}
              </p>
            </div>
            <div className="lg:col-span-7 aspect-video rounded-xl overflow-hidden bg-slate-950 border border-border">
              <iframe
                src={videoSpotlight.embedUrl}
                title={videoSpotlight.heading}
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {actions.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {actions.map((act, i) => (
              <SmartActionButton
                key={i}
                action={act}
                theme={theme}
                onCustomModal={onCustomModal}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface FaqAccordionSectionProps {
  id?: string;
  badge?: string;
  heading?: ReactNode;
  subheading?: ReactNode;
  faqs: FaqItem[];
  theme?: VerticalTheme;
  surface?: 'light' | 'muted' | 'dark';
}

export function FaqAccordionSection({
  id,
  badge = 'FAQ',
  heading = 'Frequently Asked Questions',
  subheading,
  faqs,
  theme = 'brand',
  surface = 'light',
}: FaqAccordionSectionProps) {
  const palette = VERTICAL_THEMES[theme];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  if (!faqs.length) return null;

  const isDark = surface === 'dark';
  const sectionBg = isDark
    ? `${palette.darkSectionBg} text-white`
    : surface === 'muted'
      ? 'bg-slate-50 dark:bg-slate-900/50 text-foreground'
      : 'bg-background text-foreground';

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${sectionBg}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 space-y-2.5">
          {badge && (
            <span
              className={`inline-block text-xs font-bold uppercase tracking-[0.18em] ${
                isDark ? 'text-[#FD5900]' : palette.accentText
              }`}
            >
              {badge}
            </span>
          )}
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold ${
              isDark ? 'text-white' : 'text-foreground'
            }`}
          >
            {heading}
          </h2>
          {subheading && (
            <div className={isDark ? 'text-slate-300' : 'text-muted-foreground'}>{subheading}</div>
          )}
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border overflow-hidden transition-colors ${
                  isDark
                    ? 'bg-white/[0.06] border-white/12'
                    : 'bg-card border-border shadow-xs'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 sm:py-5 text-left cursor-pointer"
                >
                  <span
                    className={`text-[15.5px] sm:text-[17px] font-heading font-bold leading-snug ${
                      isDark ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#FD5900]' : 'opacity-65'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    className={`px-6 pb-5 pt-0 text-sm sm:text-[15.5px] leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-muted-foreground'
                    }`}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface DiscoveryCallSectionProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  callTitle?: string;
  callDescription?: string;
  theme?: VerticalTheme;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const SLOTS = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

export function DiscoveryCallSection({
  badge = 'Free Strategy Session',
  heading = 'Book a Free 30-Minute Consultation With Our Experts',
  subheading = 'Pick a preferred day and time slot to map out your growth roadmap with an EON8 lead strategist.',
  callTitle = '30-Min Growth & Strategy Discovery Call',
  callDescription = 'One-on-one strategy audit covering ROI opportunities, channel mix, timelines, and custom execution roadmaps.',
  theme = 'brand',
}: DiscoveryCallSectionProps) {
  const palette = VERTICAL_THEMES[theme];
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const startedAtRef = useRef<number>(0);
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingResult, setBookingResult] = useState<LeadSubmissionResult | null>(null);

  const handleBook = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@')) return;
    const result = await submitLeadEnquiry({
      source: callTitle,
      name: name.trim(),
      email: email.trim(),
      preferredSlot: `${selectedDay} at ${selectedSlot}`,
      honeypot,
      formStartedAt: startedAtRef.current,
    });
    setBookingResult(result);
    setConfirmed(true);
    setHoneypot('');
    startedAtRef.current = Date.now();
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40 text-foreground">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
          <span className={`inline-block text-xs font-bold uppercase tracking-[0.18em] ${palette.accentText}`}>
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
          {/* Left Call Info */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-900 text-white flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FD5900]">
                <Calendar className="w-4 h-4" />
                <span>EON8 Strategy Desk</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-snug">
                {callTitle}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{callDescription}</p>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 border-t border-white/15 pt-5">
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FD5900] shrink-0" />
                <span>30 min video consultation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-[#FD5900] shrink-0" />
                <span>Google Meet / Zoom link sent instantly</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#FD5900] shrink-0" />
                <span>Flexible IST / UTC / EST slots</span>
              </li>
            </ul>
          </div>

          {/* Right Slot Selector */}
          <div className="lg:col-span-7 p-6 sm:p-8">
            {confirmed ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-heading font-extrabold text-foreground">
                  {bookingResult?.deliveredToWebhook ? 'Discovery Call Requested!' : 'Slot Details Ready!'}
                </h4>
                <p className="text-sm text-muted-foreground max-w-md">
                  Preferred slot: <strong>{selectedDay} at {selectedSlot}</strong> for{' '}
                  <strong>{name}</strong> ({email}).{' '}
                  {bookingResult?.deliveredToWebhook
                    ? 'Our strategy desk will send your meeting invite shortly.'
                    : 'Confirm instantly with our strategy desk via WhatsApp or email:'}
                </p>
                {bookingResult && (
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                    <a
                      href={bookingResult.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold no-underline"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm on WhatsApp</span>
                    </a>
                    <a
                      href={bookingResult.mailtoHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold no-underline"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Confirm via Email</span>
                    </a>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(false);
                    setBookingResult(null);
                    setName('');
                    setEmail('');
                  }}
                  className="mt-2 inline-flex items-center min-h-[36px] py-1.5 text-xs font-bold text-[#0053C6] dark:text-sky-400 underline cursor-pointer"
                >
                  Schedule another time
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="relative space-y-5">
                <SpamHoneypotField id="discovery-call-fax" value={honeypot} onChange={setHoneypot} />
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Select Preferred Day
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`px-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                          selectedDay === day
                            ? 'bg-[#0053C6] text-white border-[#0053C6]'
                            : 'bg-slate-50 dark:bg-slate-800/80 text-foreground border-border hover:border-[#0053C6]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Select Time Slot
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-[#FD5900] text-white border-[#FD5900]'
                            : 'bg-slate-50 dark:bg-slate-800/80 text-foreground border-border hover:border-[#FD5900]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
                  />
                  <input
                    type="email"
                    placeholder="Work Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-xl border border-border bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full min-h-[48px] rounded-xl font-bold text-sm sm:text-[15px] px-6 py-3 transition-all cursor-pointer ${palette.primaryBtn}`}
                >
                  Confirm {selectedDay} • {selectedSlot} Slot
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface BottomCtaBannerProps {
  id?: string;
  heading?: ReactNode;
  description?: ReactNode;
  stats?: StatItem[];
  formHeading?: string;
  submitLabel?: string;
  disclaimer?: string;
  theme?: VerticalTheme;
}

const DEFAULT_BOTTOM_STATS: StatItem[] = [
  { value: '1250+', label: 'Projects Completed' },
  { value: '548+', label: 'Happy Clients' },
  { value: '12+', label: 'Years of Experience' },
  { value: '250+', label: 'Growth Specialists' },
];

export function BottomCtaBanner({
  id = 'consult-form',
  heading = 'Ready To Accelerate Your Brand Growth?',
  description = 'Partner with EON8 to launch measurable, ROI-focused campaigns engineered for sustainable market leadership.',
  stats = DEFAULT_BOTTOM_STATS,
  formHeading = 'Reach Out To Us',
  submitLabel = 'Schedule Free Consultation',
  disclaimer,
  theme = 'brand',
}: BottomCtaBannerProps) {
  const palette = VERTICAL_THEMES[theme];

  return (
    <>
      <section
        id={id}
        className={`py-16 sm:py-20 pb-24 sm:pb-28 px-4 sm:px-6 lg:px-8 text-white ${palette.heroBg}`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
              {heading}
            </h2>
            <div className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {description}
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {stats.map((st, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-xs"
                  >
                    <div className="text-2xl sm:text-3xl font-heading font-black text-[#FD5900]">
                      {st.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <LeadCaptureCard
              id="bottom-lead-form"
              heading={formHeading}
              submitLabel={submitLabel}
              theme={theme}
              compact
            />
          </div>
        </div>
      </section>

      {disclaimer && (
        <div className="bg-slate-100 dark:bg-slate-900 border-t border-border py-6 pb-20 px-4 sm:px-6 text-center">
          <p className="max-w-4xl mx-auto text-xs text-muted-foreground leading-relaxed">
            {disclaimer}
          </p>
        </div>
      )}
    </>
  );
}
