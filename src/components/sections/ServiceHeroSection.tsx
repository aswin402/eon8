import { HERO_IMAGE_SIZES } from '@/lib/media/heroImageSizes';
import type { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { LeadCaptureCard } from './LeadCaptureCard';
import { SmartActionButton } from './SmartActionButton';
import { VERTICAL_THEMES, type ActionItem, type VerticalTheme } from './types';

interface ServiceHeroSectionProps {
  badge?: string;
  heading: ReactNode;
  subheading?: string;
  paragraphs?: ReactNode[];
  bullets?: string[];
  actions?: ActionItem[];
  theme?: VerticalTheme;
  layout?: 'split-form' | 'split-media' | 'centered';
  formHeading?: string;
  formSubmitLabel?: string;
  formShowCountry?: boolean;
  formShowWebsite?: boolean;
  mediaSrc?: string;
  mediaAlt?: string;
  customRightSlot?: ReactNode;
  onCustomModal?: () => void;
}

export function ServiceHeroSection({
  badge,
  heading,
  subheading,
  paragraphs = [],
  bullets = [],
  actions = [],
  theme = 'brand',
  layout = 'split-form',
  formHeading = 'Request Free Quote',
  formSubmitLabel = 'Get My Free Proposal',
  formShowCountry = false,
  formShowWebsite = false,
  mediaSrc,
  mediaAlt = '',
  customRightSlot,
  onCustomModal,
}: ServiceHeroSectionProps) {
  const palette = VERTICAL_THEMES[theme];

  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-white ${palette.heroBg}`}
    >
      {/* Subtle radial ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-white/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full bg-[#FD5900]/15 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {layout === 'centered' ? (
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {badge && (
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider ${palette.badgeBg} ${palette.badgeText}`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span>{badge}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.1] tracking-tight">
              {heading}
            </h1>

            {subheading && (
              <p className="text-lg sm:text-xl font-semibold text-white/95">{subheading}</p>
            )}

            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto"
              >
                {para}
              </p>
            ))}

            {bullets.length > 0 && (
              <ul className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {bullets.map((b, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {actions.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
                {actions.map((act, idx) => (
                  <SmartActionButton
                    key={idx}
                    action={act}
                    theme={theme}
                    onCustomModal={onCustomModal}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {badge && (
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider ${palette.badgeBg} ${palette.badgeText}`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span>{badge}</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-heading font-extrabold text-white leading-[1.12] tracking-tight">
                {heading}
              </h1>

              {subheading && (
                <p className="text-lg sm:text-xl font-semibold text-[#FD5900]">{subheading}</p>
              )}

              <div className="space-y-4">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="text-base sm:text-[17px] text-slate-200 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {bullets.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-[15px] font-medium text-white/95"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#FD5900] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {actions.length > 0 && (
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  {actions.map((act, idx) => (
                    <SmartActionButton
                      key={idx}
                      action={act}
                      theme={theme}
                      onCustomModal={onCustomModal}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Native Form or Local Visual */}
            <div className="lg:col-span-5">
              {customRightSlot ? (
                customRightSlot
              ) : layout === 'split-media' && mediaSrc ? (
                <div className="relative flex items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="absolute inset-4 rounded-3xl bg-white/10 blur-2xl"
                  />
                  {/* width/height let the browser keep the image's space before it loads (no jump). */}
                  <img
                    src={mediaSrc}
                    alt={mediaAlt}
                    width={HERO_IMAGE_SIZES[mediaSrc]?.[0]}
                    height={HERO_IMAGE_SIZES[mediaSrc]?.[1]}
                    fetchPriority="high"
                    className="relative z-10 w-full max-w-[480px] h-auto object-contain rounded-2xl drop-shadow-2xl animate-float"
                  />
                </div>
              ) : (
                <LeadCaptureCard
                  id="hero-lead-form"
                  heading={formHeading}
                  submitLabel={formSubmitLabel}
                  theme={theme}
                  showCountry={formShowCountry}
                  showWebsite={formShowWebsite}
                  compact
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
