import { Fragment, type ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { VERTICAL_THEMES, type PricingRowItem, type VerticalTheme } from './types';

interface PricingMatrixSectionProps {
  id?: string;
  badge?: string;
  heading: ReactNode;
  subheading?: ReactNode;
  tiers: {
    name: string;
    subtitle?: string;
    price?: string;
    highlighted?: boolean;
    ctaLabel?: string;
  }[];
  rows: PricingRowItem[];
  footnote?: string;
  theme?: VerticalTheme;
  onSelectTier?: (tierName: string) => void;
}

export function PricingMatrixSection({
  id,
  badge,
  heading,
  subheading,
  tiers,
  rows,
  footnote,
  theme = 'brand',
  onSelectTier,
}: PricingMatrixSectionProps) {
  const { setContactModalOpen } = useAppStore();
  const palette = VERTICAL_THEMES[theme];
  if (!tiers.length || !rows.length) return null;

  const handleChoose = (tierName: string) => {
    if (onSelectTier) onSelectTier(tierName);
    else setContactModalOpen(true);
  };

  return (
    <section id={id} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          {badge && (
            <span className={`inline-block text-xs font-bold uppercase tracking-[0.18em] ${palette.accentText}`}>
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
            {heading}
          </h2>
          {subheading && (
            <div className="text-base sm:text-lg text-muted-foreground leading-relaxed">{subheading}</div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="md:hidden px-4 py-2 text-xs font-semibold text-muted-foreground bg-slate-50 dark:bg-slate-900/70 border-b border-border flex items-center justify-between">
            <span>Compare all plans</span>
            <span>Swipe →</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-5 px-6 text-sm sm:text-base font-heading font-bold w-[34%]">
                    Deliverables &amp; Features
                  </th>
                  {tiers.map((tier, idx) => (
                    <th
                      key={idx}
                      className={`py-5 px-5 text-center ${
                        tier.highlighted ? 'bg-[#0053C6]' : ''
                      }`}
                    >
                      <h3 className="text-base sm:text-lg font-heading font-extrabold text-white">
                        {tier.name}
                      </h3>
                      {tier.price && (
                        <div className="text-xl font-black text-[#FD5900] mt-1">{tier.price}</div>
                      )}
                      {tier.subtitle && (
                        <div className="text-xs font-medium text-slate-300 mt-0.5">
                          {tier.subtitle}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {rows.map((row, rIdx) => {
                  const prevCat = rIdx > 0 ? rows[rIdx - 1].category : undefined;
                  const showCat = Boolean(row.category && row.category !== prevCat);

                  return (
                    <Fragment key={rIdx}>
                      {showCat && (
                        <tr className="bg-slate-100 dark:bg-slate-800/90">
                          <td
                            colSpan={tiers.length + 1}
                            className="py-3 px-6 text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider text-[#0053C6] dark:text-sky-400"
                          >
                            {row.category}
                          </td>
                        </tr>
                      )}
                      <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-6 text-sm sm:text-[15px] font-medium text-foreground">
                          {row.feature}
                        </td>
                        {tiers.map((_, tIdx) => {
                          const val = row.values[tIdx];
                          return (
                            <td key={tIdx} className="py-3.5 px-5 text-center">
                              {typeof val === 'boolean' ? (
                                val ? (
                                  <span
                                    aria-label="Included"
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                  >
                                    <Check className="w-4 h-4 stroke-[2.75]" />
                                  </span>
                                ) : (
                                  <span
                                    aria-label="Not included"
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-400"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </span>
                                )
                              ) : (
                                <span className="text-sm font-semibold text-foreground">{val}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>

              <tfoot>
                <tr className="bg-slate-50 dark:bg-slate-900/70 border-t border-border">
                  <td className="py-5 px-6 text-xs sm:text-sm text-muted-foreground font-medium">
                    {footnote || 'Need a custom enterprise plan? Talk to our strategists.'}
                  </td>
                  {tiers.map((tier, idx) => (
                    <td key={idx} className="py-5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleChoose(tier.name)}
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          tier.highlighted
                            ? 'bg-[#FD5900] hover:bg-[#e55000] text-white shadow-md'
                            : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950'
                        }`}
                      >
                        {tier.ctaLabel || 'Get Quote'}
                      </button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
