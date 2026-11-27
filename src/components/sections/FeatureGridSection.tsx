import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { SmartActionButton } from './SmartActionButton';
import {
  VERTICAL_THEMES,
  type ActionItem,
  type FeatureCardItem,
  type VerticalTheme,
} from './types';

interface FeatureGridSectionProps {
  id?: string;
  badge?: string;
  heading: ReactNode;
  subheading?: ReactNode;
  cards: FeatureCardItem[];
  columns?: 2 | 3 | 4;
  surface?: 'light' | 'muted' | 'dark';
  theme?: VerticalTheme;
  bottomActions?: ActionItem[];
  onCustomModal?: () => void;
}

export function FeatureGridSection({
  id,
  badge,
  heading,
  subheading,
  cards,
  columns = 3,
  surface = 'light',
  theme = 'brand',
  bottomActions = [],
  onCustomModal,
}: FeatureGridSectionProps) {
  const palette = VERTICAL_THEMES[theme];
  const isDark = surface === 'dark';

  const sectionBg = isDark
    ? `${palette.darkSectionBg} text-white`
    : surface === 'muted'
      ? 'bg-slate-50 dark:bg-slate-900/50 text-foreground'
      : 'bg-background text-foreground';

  const colCls =
    columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 4
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-3">
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
            <div
              className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-muted-foreground'
              }`}
            >
              {subheading}
            </div>
          )}
        </div>

        <div className={`grid ${colCls} gap-6 sm:gap-7`}>
          {cards.map((card, idx) => {
            const Icon = card.icon || Sparkles;
            return (
              <div
                key={idx}
                className={`group rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-200 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-white/[0.06] border-white/12 hover:border-white/25 hover:bg-white/[0.09]'
                    : 'bg-card border-border shadow-xs hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    {card.iconSrc ? (
                      <div
                        className={`w-13 h-13 rounded-xl flex items-center justify-center p-2.5 shrink-0 ${
                          isDark ? 'bg-white/95 shadow-sm' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        <img
                          src={card.iconSrc}
                          alt={card.iconAlt || card.title}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isDark
                            ? 'bg-[#FD5900]/20 text-[#FD5900]'
                            : `${palette.iconBg} ${palette.iconText}`
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    )}

                    {card.badge && (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          isDark
                            ? 'bg-white/10 text-slate-200'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-heading font-bold leading-snug ${
                      isDark ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {card.title}
                  </h3>

                  {card.description && (
                    <div
                      className={`text-sm sm:text-[15px] leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-muted-foreground'
                      }`}
                    >
                      {card.description}
                    </div>
                  )}

                  {card.bullets && card.bullets.length > 0 && (
                    <div className="pt-1 space-y-2">
                      {card.bulletsLabel && (
                        <p
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isDark ? 'text-slate-200' : 'text-foreground'
                          }`}
                        >
                          {card.bulletsLabel}
                        </p>
                      )}
                      <ul className="space-y-1.5">
                        {card.bullets.map((b, bIdx) => (
                          <li
                            key={bIdx}
                            className={`flex items-start gap-2 text-sm ${
                              isDark ? 'text-slate-200' : 'text-muted-foreground'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {card.href && (
                  <div className="pt-4 mt-4 border-t border-border/50">
                    {card.href.startsWith('/') ? (
                      <Link
                        to={card.href}
                        className={`inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold no-underline transition-colors ${
                          isDark
                            ? 'text-[#FD5900] hover:text-orange-300'
                            : `${palette.accentText} hover:text-[#FD5900]`
                        }`}
                      >
                        <span>{card.ctaLabel || 'Explore Service'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 min-h-[36px] py-1.5 text-sm font-bold no-underline ${
                          isDark ? 'text-[#FD5900]' : palette.accentText
                        }`}
                      >
                        <span>{card.ctaLabel || 'Learn More'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {bottomActions.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {bottomActions.map((act, i) => (
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
