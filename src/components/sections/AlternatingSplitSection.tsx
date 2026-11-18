import type { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SmartActionButton } from './SmartActionButton';
import { VERTICAL_THEMES, type ActionItem, type VerticalTheme } from './types';

interface AlternatingSplitSectionProps {
  id?: string;
  badge?: string;
  heading: ReactNode;
  subheading?: string;
  paragraphs?: ReactNode[];
  bullets?: string[];
  bulletsColumns?: 1 | 2;
  metrics?: { value: string; label: string }[];
  imageSrc?: string;
  imageAlt?: string;
  customMedia?: ReactNode;
  reverse?: boolean;
  surface?: 'light' | 'muted' | 'dark';
  theme?: VerticalTheme;
  actions?: ActionItem[];
  onCustomModal?: () => void;
}

export function AlternatingSplitSection({
  id,
  badge,
  heading,
  subheading,
  paragraphs = [],
  bullets = [],
  bulletsColumns = 1,
  metrics = [],
  imageSrc,
  imageAlt = '',
  customMedia,
  reverse = false,
  surface = 'light',
  theme = 'brand',
  actions = [],
  onCustomModal,
}: AlternatingSplitSectionProps) {
  const palette = VERTICAL_THEMES[theme];
  const isDark = surface === 'dark';

  const sectionBg = isDark
    ? `${palette.darkSectionBg} text-white`
    : surface === 'muted'
      ? 'bg-slate-50 dark:bg-slate-900/50 text-foreground'
      : 'bg-background text-foreground';

  const hasMedia = Boolean(imageSrc || customMedia);

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={
            hasMedia
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center'
              : 'max-w-4xl mx-auto text-center'
          }
        >
          {/* Copy Column */}
          <div
            className={`${hasMedia ? 'lg:col-span-6' : ''} space-y-5 ${
              hasMedia && reverse ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
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
              className={`text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold leading-tight ${
                isDark ? 'text-white' : 'text-foreground'
              }`}
            >
              {heading}
            </h2>

            {subheading && (
              <p
                className={`text-lg font-semibold ${
                  isDark ? 'text-orange-400' : palette.accentText
                }`}
              >
                {subheading}
              </p>
            )}

            <div className="space-y-4">
              {paragraphs.map((p, idx) => (
                <div
                  key={idx}
                  className={`text-base sm:text-[16.5px] leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-muted-foreground'
                  }`}
                >
                  {p}
                </div>
              ))}
            </div>

            {bullets.length > 0 && (
              <ul
                className={`grid gap-3 pt-1 text-left ${
                  bulletsColumns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {bullets.map((b, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2.5 text-[15px] font-medium ${
                      isDark ? 'text-slate-100' : 'text-foreground'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FD5900] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-4 border ${
                      isDark
                        ? 'bg-white/8 border-white/15'
                        : 'bg-card border-border shadow-xs'
                    }`}
                  >
                    <div className="text-2xl font-heading font-black text-[#FD5900]">
                      {m.value}
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-medium mt-1 ${
                        isDark ? 'text-slate-300' : 'text-muted-foreground'
                      }`}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {actions.length > 0 && (
              <div
                className={`flex flex-wrap items-center gap-3.5 pt-3 ${
                  !hasMedia ? 'justify-center' : ''
                }`}
              >
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

          {/* Media Column */}
          {hasMedia && (
            <div
              className={`lg:col-span-6 flex items-center justify-center ${
                reverse ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              {customMedia ? (
                customMedia
              ) : (
                <div className="w-full rounded-2xl overflow-hidden border border-border/60 bg-slate-100 dark:bg-slate-800/60 shadow-xl p-3 sm:p-4">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full max-h-[460px] object-contain rounded-xl mx-auto"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
