import type { ReactNode } from 'react';
import { SmartActionButton } from './SmartActionButton';
import {
  VERTICAL_THEMES,
  type ActionItem,
  type ProcessStepItem,
  type VerticalTheme,
} from './types';

interface ProcessRoadmapSectionProps {
  id?: string;
  badge?: string;
  heading: ReactNode;
  subheading?: ReactNode;
  steps: ProcessStepItem[];
  variant?: 'grid' | 'timeline';
  surface?: 'light' | 'muted' | 'dark';
  theme?: VerticalTheme;
  bottomActions?: ActionItem[];
  onCustomModal?: () => void;
}

export function ProcessRoadmapSection({
  id,
  badge,
  heading,
  subheading,
  steps,
  variant = 'grid',
  surface = 'dark',
  theme = 'brand',
  bottomActions = [],
  onCustomModal,
}: ProcessRoadmapSectionProps) {
  const palette = VERTICAL_THEMES[theme];
  const isDark = surface === 'dark';

  const sectionBg = isDark
    ? `${palette.darkSectionBg} text-white`
    : surface === 'muted'
      ? 'bg-slate-50 dark:bg-slate-900/50 text-foreground'
      : 'bg-background text-foreground';

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
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

        {variant === 'timeline' ? (
          <div className="relative max-w-4xl mx-auto">
            <div
              aria-hidden="true"
              className={`hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 ${
                isDark ? 'bg-white/15' : 'bg-border'
              }`}
            />
            <div className="space-y-6 md:space-y-8">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                const num = step.step || String(idx + 1).padStart(2, '0');
                return (
                  <div
                    key={idx}
                    className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center`}
                  >
                    <div
                      className={`${
                        isEven ? 'md:text-right md:pr-6' : 'md:col-start-2 md:pl-6'
                      }`}
                    >
                      <div
                        className={`rounded-2xl p-6 border ${
                          isDark
                            ? 'bg-white/[0.06] border-white/12'
                            : 'bg-card border-border shadow-sm'
                        }`}
                      >
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FD5900] mb-2">
                          <span>Step {num}</span>
                        </div>
                        <h3
                          className={`text-lg sm:text-xl font-heading font-bold mb-2 ${
                            isDark ? 'text-white' : 'text-foreground'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm sm:text-[15px] leading-relaxed ${
                            isDark ? 'text-slate-300' : 'text-muted-foreground'
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FD5900] text-white font-heading font-extrabold text-sm items-center justify-center shadow-lg">
                      {num}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, idx) => {
              const num = step.step || String(idx + 1).padStart(2, '0');
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className={`relative rounded-2xl p-6 sm:p-7 border transition-all ${
                    isDark
                      ? 'bg-white/[0.06] border-white/12 hover:bg-white/[0.1]'
                      : 'bg-card border-border shadow-xs hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {step.iconSrc ? (
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 ${
                          isDark ? 'bg-white/95' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        <img
                          src={step.iconSrc}
                          alt={step.title}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                    ) : Icon ? (
                      <div className="w-12 h-12 rounded-xl bg-[#FD5900]/20 text-[#FD5900] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                    ) : (
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FD5900] text-white font-heading font-extrabold text-sm">
                        {num}
                      </span>
                    )}
                    <span
                      className={`text-3xl font-heading font-black ${
                        isDark ? 'text-white/15' : 'text-slate-200 dark:text-slate-800'
                      }`}
                    >
                      {num}
                    </span>
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-heading font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-[15px] leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-muted-foreground'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

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
