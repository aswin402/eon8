import { VERTICAL_THEMES, type StatItem, type VerticalTheme } from './types';

interface ClientLogoMarqueeProps {
  heading?: string;
  logos: { src: string; alt: string }[];
}

export function ClientLogoMarquee({
  heading = 'Trusted By Industry-Leading Brands & Web3 Pioneers',
  logos,
}: ClientLogoMarqueeProps) {
  if (!logos.length) return null;
  const track = [...logos, ...logos];

  return (
    <section className="py-10 sm:py-12 border-b border-border bg-slate-50/80 dark:bg-slate-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {heading}
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max items-center gap-8 sm:gap-12 animate-marquee">
          {track.map((logo, idx) => (
            <div
              key={`${logo.src}-${idx}`}
              className="flex items-center justify-center h-16 w-36 sm:w-44 px-5 py-3 rounded-xl bg-white dark:bg-slate-100 border border-slate-200/80 shadow-xs shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.alt || 'Client brand'}
                className="max-h-10 max-w-[120px] w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatsCounterStripProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  stats: StatItem[];
  theme?: VerticalTheme;
}

export function StatsCounterStrip({
  badge,
  heading,
  subheading,
  stats,
  theme = 'brand',
}: StatsCounterStripProps) {
  const palette = VERTICAL_THEMES[theme];
  if (!stats.length) return null;

  const colCls =
    stats.length === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : stats.length >= 5
        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
        : 'grid-cols-2 lg:grid-cols-4';

  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        {(badge || heading || subheading) && (
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-2.5">
            {badge && (
              <span className={`text-xs font-bold uppercase tracking-widest ${palette.accentText}`}>
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-base text-muted-foreground leading-relaxed">{subheading}</p>
            )}
          </div>
        )}

        <div className={`grid ${colCls} gap-5 sm:gap-6`}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-card border border-border p-6 sm:p-7 text-center shadow-xs hover:shadow-md transition-shadow"
              >
                {stat.iconSrc ? (
                  <img
                    src={stat.iconSrc}
                    alt={stat.label}
                    className="w-11 h-11 mx-auto mb-3.5 object-contain"
                  />
                ) : Icon ? (
                  <div
                    className={`w-11 h-11 mx-auto mb-3.5 rounded-xl flex items-center justify-center ${palette.iconBg} ${palette.iconText}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ) : null}

                <div className={`text-3xl sm:text-4xl font-heading font-black ${palette.accentText}`}>
                  {stat.value}
                </div>
                <p className="mt-1.5 text-sm sm:text-[15px] font-semibold text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
