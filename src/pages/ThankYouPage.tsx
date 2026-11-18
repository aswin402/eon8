import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PageSeo } from '@/components/sections';

const NEXT_STEPS = [
  {
    step: '01',
    title: 'Brief Review (Within 2 Hours)',
    description:
      'A senior EON8 growth strategist reviews your goals, industry benchmarks, and target channels.',
  },
  {
    step: '02',
    title: 'Discovery Call & Custom Audit',
    description:
      'We connect with you via phone, WhatsApp, or Google Meet to walk through quick wins and ROI projections.',
  },
  {
    step: '03',
    title: 'Tailored Execution Roadmap',
    description:
      'Receive a transparent scope, timeline, KPI framework, and dedicated pod structure tailored to your brand.',
  },
];

export function ThankYouPage() {
  return (
    <div className="bg-background text-foreground">
      <PageSeo
        title="Thank You | EON8 Digital Marketing & Growth Partners"
        description="Thank you for reaching out to EON8. Our growth strategists have received your enquiry and will respond within 24 hours."
      />

      {/* Hero Confirmation */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#040D21] via-[#081C42] to-[#0053C6] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[#FD5900]/20 blur-3xl"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shadow-xl">
            <CheckCircle2 className="w-11 h-11 text-emerald-400" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enquiry Received</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight text-white">
            Thank You for Connecting With <span className="text-[#FD5900]">EON8</span>!
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Your request is with our strategy desk. One of our lead digital, AI, or Web3 growth
            specialists will get back to you shortly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs sm:text-sm text-slate-200">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15">
              <Clock className="w-4 h-4 text-[#FD5900]" />
              <span>Average response under 24 hours</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Confidential Consultation</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.link/x5370e"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-sm sm:text-base shadow-lg no-underline transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat Instantly on WhatsApp</span>
            </a>

            <Link
              to="/works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm sm:text-base shadow-lg no-underline transition-all"
            >
              <span>Explore Client Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base no-underline transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 sm:py-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0053C6] dark:text-sky-400">
              Next Steps
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
              What Happens Next
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEXT_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-card border border-border p-7 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FD5900] text-white font-heading font-extrabold text-sm">
                    {item.step}
                  </span>
                  <span className="text-3xl font-heading font-black text-slate-200 dark:text-slate-800">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Direct Contact Strip */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-heading font-extrabold text-foreground">
                Need Urgent Campaign Assistance?
              </h3>
              <p className="text-sm text-muted-foreground">
                Reach our Chennai, Mumbai, Bangalore, or Hyderabad desks directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+919042294007"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-sm font-bold text-foreground hover:border-[#FD5900] no-underline"
              >
                <Phone className="w-4 h-4 text-[#FD5900]" />
                <span>+91 90422 94007</span>
              </a>
              <a
                href="mailto:info@eon8.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-sm font-bold text-foreground hover:border-[#0053C6] no-underline"
              >
                <Mail className="w-4 h-4 text-[#0053C6] dark:text-sky-400" />
                <span>info@eon8.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ThankYouPage;
