import { CheckCircle2 } from 'lucide-react';
import {
  AlternatingSplitSection,
  DiscoveryCallSection,
  FaqAccordionSection,
  FeatureGridSection,
  SmartActionButton,
  type ActionItem,
} from '@/components/sections';
import type { CryptoSectionBlock, CtaAction, RichNode } from '../types';
import { HeadingLines, RichText } from './RichText';

interface CryptoSectionRendererProps {
  section: CryptoSectionBlock;
  index?: number;
}

function mapCta(c: CtaAction): ActionItem {
  const isWhatsapp = c.kind === 'whatsapp' || /wa\.link|whatsapp/i.test(c.href);
  return {
    label: c.label,
    href: c.href,
    opensModal: c.kind === 'modal' || c.href === '#' || c.href === '#myModal',
    external: c.kind === 'external' || isWhatsapp,
    variant: isWhatsapp ? 'whatsapp' : c.variant === 'secondary' ? 'secondary' : 'primary',
  };
}

function flattenNodes(nodes: RichNode[]): string {
  return nodes
    .map((n) => (typeof n === 'string' ? n : n.br ? ' ' : n.text || ''))
    .join('')
    .trim();
}

export function CryptoSectionRenderer({ section, index = 0 }: CryptoSectionRendererProps) {
  const altSurface = index % 2 === 0 ? 'light' : 'muted';

  switch (section.type) {
    case 'viral':
      return (
        <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0e1118] via-[#261f08] to-[#523d00] text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="hidden lg:flex lg:col-span-2 flex-col items-center gap-5">
              {section.leftImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt=""
                  className="w-16 h-16 object-contain animate-float"
                />
              ))}
            </div>

            <div className="lg:col-span-8 text-center space-y-5">
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((nodes, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto"
                >
                  <RichText nodes={nodes} tone="on-dark" />
                </p>
              ))}
              {section.ctas.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                  {section.ctas.map((cta, idx) => (
                    <SmartActionButton key={idx} action={mapCta(cta)} theme="crypto" />
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:flex lg:col-span-2 flex-col items-center gap-5">
              {section.rightImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt=""
                  className="w-16 h-16 object-contain animate-bounce-slow"
                />
              ))}
            </div>
          </div>
        </section>
      );

    case 'gold-intro':
      return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1b1606] via-[#3b2c04] to-[#634800] text-white text-center">
          <div className="max-w-4xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
              <HeadingLines lines={section.headingLines} />
            </h2>
            {section.paragraphs.map((nodes, idx) => (
              <p key={idx} className="text-base sm:text-lg text-amber-50/90 leading-relaxed">
                <RichText nodes={nodes} tone="on-dark" />
              </p>
            ))}
            {section.cta && (
              <div className="pt-2">
                <SmartActionButton action={mapCta(section.cta)} theme="crypto" />
              </div>
            )}
          </div>
        </section>
      );

    case 'dark-intro-split':
      return (
        <AlternatingSplitSection
          theme="crypto"
          surface="dark"
          heading={section.heading}
          paragraphs={section.paragraphs.map((nodes, idx) => (
            <RichText key={idx} nodes={nodes} tone="on-dark" />
          ))}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          actions={section.cta ? [mapCta(section.cta)] : []}
        />
      );

    case 'card-grid':
      return (
        <FeatureGridSection
          theme="crypto"
          surface={
            /dark|black|navy/i.test(section.variantClass) ? 'dark' : altSurface
          }
          heading={<HeadingLines lines={section.headingLines} />}
          subheading={section.subheading}
          cards={section.cards.map((card) => ({
            badge: card.metricHeading,
            title: card.title,
            description:
              card.paragraphs.length > 0 ? (
                <div className="space-y-2">
                  {card.paragraphs.map((nodes, pIdx) => (
                    <p key={pIdx}>
                      <RichText nodes={nodes} />
                    </p>
                  ))}
                </div>
              ) : undefined,
            bullets: card.bullets.map(flattenNodes).filter(Boolean),
            iconSrc: card.iconImg,
            iconAlt: card.iconAlt || card.title,
          }))}
          columns={section.cards.length === 4 ? 2 : 3}
          bottomActions={section.footerCta ? [mapCta(section.footerCta)] : []}
        />
      );

    case 'cta-band':
      return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#141720] via-[#362905] to-[#614800] text-white">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
                <HeadingLines lines={section.headingLines} />
              </h2>
              {section.subtext && (
                <p className="text-base text-amber-200 font-medium">{section.subtext}</p>
              )}
            </div>
            {section.ctas.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                {section.ctas.map((cta, idx) => (
                  <SmartActionButton key={idx} action={mapCta(cta)} theme="crypto" />
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case 'specialized-3col':
      return (
        <FeatureGridSection
          theme="crypto"
          surface={altSurface}
          heading={<HeadingLines lines={section.headingLines} />}
          cards={section.columns.map((col) => ({
            title: col.title || col.iconAlt || '',
            description: (
              <div className="space-y-2">
                {col.paragraphs.map((nodes, pIdx) => (
                  <p key={pIdx}>
                    <RichText nodes={nodes} />
                  </p>
                ))}
              </div>
            ),
            iconSrc: col.iconImg,
            iconAlt: col.iconAlt || col.title,
          }))}
          columns={3}
        />
      );

    case 'service-4col':
      return (
        <FeatureGridSection
          theme="crypto"
          surface={altSurface}
          heading={<HeadingLines lines={section.headingLines} />}
          subheading={
            section.introParagraphs.length > 0 ? (
              <div className="space-y-2">
                {section.introParagraphs.map((nodes, idx) => (
                  <p key={idx}>
                    <RichText nodes={nodes} />
                  </p>
                ))}
              </div>
            ) : undefined
          }
          cards={section.items.map((item) => ({
            title: item.title,
            description: (
              <div className="space-y-2">
                {item.paragraphs.map((nodes, pIdx) => (
                  <p key={pIdx}>
                    <RichText nodes={nodes} />
                  </p>
                ))}
              </div>
            ),
            iconSrc: item.iconImg,
            iconAlt: item.iconAlt || item.title,
          }))}
          columns={2}
        />
      );

    case 'split-feature':
      return (
        <AlternatingSplitSection
          theme="crypto"
          surface={altSurface}
          reverse={Boolean(section.reverseCols)}
          heading={<HeadingLines lines={section.headingLines} />}
          subheading={section.listHeading}
          paragraphs={section.paragraphs.map((nodes, idx) => (
            <RichText key={idx} nodes={nodes} />
          ))}
          bullets={section.listItems.map(flattenNodes).filter(Boolean)}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          actions={section.cta ? [mapCta(section.cta)] : []}
        />
      );

    case 'kol-network':
      return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                Global Creator Reach
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
                {section.heading}
              </h2>
              <p className="text-base text-muted-foreground">{section.subheading}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.groups.map((grp, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-card border border-border p-6 sm:p-7 shadow-xs space-y-4"
                >
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                    {grp.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {grp.items.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>
                          <RichText nodes={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'comparison-table':
      return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
                  {section.heading}
                </h2>
              )}
              {section.intro && (
                <p className="text-base text-muted-foreground">{section.intro}</p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      {section.headers.map((h, idx) => (
                        <th
                          key={idx}
                          className="py-4 px-6 text-sm sm:text-base font-heading font-bold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {section.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-4 px-6 text-sm sm:text-[15px] ${
                              cIdx === 0
                                ? 'font-semibold text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {section.closingNote && (
              <p className="text-center text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
                {section.closingNote}
              </p>
            )}
          </div>
        </section>
      );

    case 'faq':
      return (
        <FaqAccordionSection
          theme="crypto"
          surface={altSurface}
          heading={section.heading}
          subheading={section.subheading}
          faqs={section.items.map((f) => ({
            question: f.question,
            answer: (
              <div className="space-y-3">
                {f.paragraphs.map((nodes, pIdx) => (
                  <p key={pIdx}>
                    <RichText nodes={nodes} />
                  </p>
                ))}
                {f.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1.5">
                    {f.bullets.map((b, bIdx) => (
                      <li key={bIdx}>
                        <RichText nodes={b} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ),
          }))}
        />
      );

    case 'calendly':
      return (
        <DiscoveryCallSection
          theme="crypto"
          heading={section.heading}
          subheading={section.subheading}
          callTitle="30-Min Crypto Strategy Call"
          callDescription="Schedule a 30-minute consultation with our Web3 & token growth specialists."
        />
      );

    default:
      return null;
  }
}
