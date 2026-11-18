import { Target } from 'lucide-react';
import {
  AlternatingSplitSection,
  ClientLogoMarquee,
  DiscoveryCallSection,
  FaqAccordionSection,
  FeatureGridSection,
  PricingMatrixSection,
  ProcessRoadmapSection,
  SmartActionButton,
  TestimonialsSection,
  type ActionItem,
} from '@/components/sections';
import { HeadingLines, RichText } from '../../crypto/components/RichText';
import type { NftCtaButton, NftSectionBlock, RichNode } from '../types';

interface NftSectionRendererProps {
  sections: NftSectionBlock[];
  onOpenModal: () => void;
}

function mapNftBtn(btn: NftCtaButton): ActionItem {
  const isWhatsapp = /wa\.link|whatsapp/i.test(btn.href);
  return {
    label: btn.label,
    href: btn.href,
    opensModal: Boolean(btn.opensModal || btn.href === '#' || btn.href === '#myModal'),
    external: Boolean(btn.isExternal || isWhatsapp),
    variant: isWhatsapp ? 'whatsapp' : 'primary',
  };
}

function flattenNodes(nodes: RichNode[]): string {
  return nodes
    .map((n) => (typeof n === 'string' ? n : n.br ? ' ' : n.text || ''))
    .join('')
    .trim();
}

export function NftSectionRenderer({ sections, onOpenModal }: NftSectionRendererProps) {
  return (
    <>
      {sections.map((section, idx) => {
        const altSurface = idx % 2 === 0 ? 'light' : 'muted';

        switch (section.kind) {
          case 'intro-centered':
            return (
              <AlternatingSplitSection
                key={idx}
                theme="nft"
                surface={altSurface}
                heading={section.heading}
                paragraphs={section.paragraphs.map((nodes, pIdx) => (
                  <RichText key={pIdx} nodes={nodes} />
                ))}
                actions={(section.buttons || []).map(mapNftBtn)}
                onCustomModal={onOpenModal}
              />
            );

          case 'viral-hero':
            if (section.layout === 'floating-center') {
              return (
                <section
                  key={idx}
                  className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#120829] via-[#2e1065] to-[#701a75] text-white"
                >
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="hidden lg:flex lg:col-span-2 flex-col items-center gap-5">
                      {section.sideLeftImages?.map((im, i) => (
                        <img
                          key={i}
                          src={im.src}
                          alt={im.alt}
                          className="w-16 h-16 object-contain animate-float"
                        />
                      ))}
                    </div>

                    <div className="lg:col-span-8 text-center space-y-5">
                      {(section.badge || section.subtitle) && (
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-300">
                          {section.badge || section.subtitle}
                        </span>
                      )}
                      <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
                        {section.headingBrLines?.length
                          ? section.headingBrLines.join(' ')
                          : section.heading}
                      </h2>
                      {section.paragraphs.map((nodes, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto"
                        >
                          <RichText nodes={nodes} tone="on-dark" />
                        </p>
                      ))}
                      {section.buttons && section.buttons.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                          {section.buttons.map((btn, bIdx) => (
                            <SmartActionButton
                              key={bIdx}
                              action={mapNftBtn(btn)}
                              theme="nft"
                              onCustomModal={onOpenModal}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="hidden lg:flex lg:col-span-2 flex-col items-center gap-5">
                      {section.sideRightImages?.map((im, i) => (
                        <img
                          key={i}
                          src={im.src}
                          alt={im.alt}
                          className="w-16 h-16 object-contain animate-bounce-slow"
                        />
                      ))}
                    </div>
                  </div>
                </section>
              );
            }

            return (
              <AlternatingSplitSection
                key={idx}
                theme="nft"
                surface="dark"
                badge={section.subtitle || section.badge}
                heading={
                  section.headingBrLines?.length
                    ? section.headingBrLines.join(' ')
                    : section.heading
                }
                paragraphs={section.paragraphs.map((nodes, pIdx) => (
                  <RichText key={pIdx} nodes={nodes} tone="on-dark" />
                ))}
                imageSrc={section.image?.src}
                imageAlt={section.image?.alt || section.heading}
                actions={(section.buttons || []).map(mapNftBtn)}
                onCustomModal={onOpenModal}
              />
            );

          case 'strategy-split':
            return (
              <section
                key={idx}
                id={section.sectionId}
                className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2e1065] via-[#581c87] to-[#9d174d] text-white"
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-pink-200">
                      Strategic Pillars
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
                      <HeadingLines lines={section.headingLines} />
                    </h2>
                    <p className="text-base sm:text-lg text-pink-100/90 leading-relaxed">
                      {section.subheading}
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs p-6 space-y-1.5"
                      >
                        <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-[15px] text-pink-100/90 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'themed-card-grid':
            return (
              <FeatureGridSection
                key={idx}
                theme="nft"
                surface={/dark|black/i.test(section.sectionClass) ? 'dark' : altSurface}
                badge={section.badge}
                heading={
                  section.headingHighlight
                    ? `${section.heading} ${section.headingHighlight}`
                    : section.heading || 'Core NFT & Web3 Capabilities'
                }
                subheading={section.subheading}
                cards={section.cards.map((c) => ({
                  badge: c.tag,
                  title: c.title,
                  description:
                    c.paragraphs.length > 0 ? (
                      <div className="space-y-2">
                        {c.paragraphs.map((nodes, pIdx) => (
                          <p key={pIdx}>
                            <RichText nodes={nodes} />
                          </p>
                        ))}
                      </div>
                    ) : undefined,
                  iconSrc: c.iconImg?.src,
                  iconAlt: c.iconImg?.alt || c.title,
                  href: c.button && !c.button.opensModal ? c.button.href : undefined,
                  ctaLabel: c.button?.label,
                }))}
                columns={section.cards.length === 4 ? 2 : 3}
                onCustomModal={onOpenModal}
              />
            );

          case 'nft-overview':
            return (
              <FeatureGridSection
                key={idx}
                theme="nft"
                surface={altSurface}
                heading={section.heading}
                subheading={section.subheading}
                cards={section.items.map((item) => ({
                  icon: item.useTargetSvg ? Target : undefined,
                  iconSrc: item.useTargetSvg ? undefined : item.iconSrc || undefined,
                  iconAlt: item.iconAlt || item.title,
                  title: item.title,
                  description: item.description,
                }))}
                columns={section.items.length === 4 ? 2 : 3}
              />
            );

          case 'nova-steps':
            return (
              <ProcessRoadmapSection
                key={idx}
                theme="nft"
                surface="muted"
                heading={section.heading}
                subheading={section.subheading}
                steps={section.steps.map((s) => ({
                  step: s.number,
                  title: s.title,
                  description: s.description,
                }))}
              />
            );

          case 'timeline-roadmap':
            return (
              <ProcessRoadmapSection
                key={idx}
                theme="nft"
                surface={altSurface}
                variant="timeline"
                badge="Step-by-Step Roadmap"
                heading={section.heading}
                subheading={section.subheading}
                steps={section.steps.map((s, sIdx) => ({
                  step: String(sIdx + 1).padStart(2, '0'),
                  title: s.title,
                  description: s.description,
                  iconSrc: s.iconSrc,
                }))}
                bottomActions={(section.buttons || []).map(mapNftBtn)}
                onCustomModal={onOpenModal}
              />
            );

          case 'evolution-cards':
            return (
              <FeatureGridSection
                key={idx}
                theme="nft"
                surface={altSurface}
                heading={section.heading}
                cards={section.cards.map((c) => ({
                  title: c.title,
                  description: c.description,
                  iconSrc: c.iconSrc,
                  iconAlt: c.iconAlt,
                }))}
                columns={section.cards.length === 4 ? 2 : 3}
              />
            );

          case 'pr-white-editorial':
            return (
              <AlternatingSplitSection
                key={idx}
                theme="nft"
                surface={altSurface}
                subheading={section.subheading}
                heading={`${section.headingPrefix} ${section.headingAccent}`.trim()}
                paragraphs={section.paragraphs.map((nodes, pIdx) => (
                  <RichText key={pIdx} nodes={nodes} />
                ))}
                imageSrc={section.image?.src}
                imageAlt={section.image?.alt || section.headingPrefix}
              />
            );

          case 'spectacular-split':
            return (
              <AlternatingSplitSection
                key={idx}
                theme="nft"
                surface={altSurface}
                reverse={section.imageOnRight === false}
                heading={section.heading}
                subheading={section.subheadings?.[0]}
                paragraphs={section.paragraphs.map((nodes, pIdx) => (
                  <RichText key={pIdx} nodes={nodes} />
                ))}
                bullets={[
                  ...(section.checklistColumns ? section.checklistColumns.flat() : []),
                  ...(section.bullets ? section.bullets.map(flattenNodes).filter(Boolean) : []),
                ]}
                bulletsColumns={section.checklistColumns ? 2 : 1}
                imageSrc={section.image?.src}
                imageAlt={section.image?.alt || section.heading}
                actions={(section.buttons || []).map(mapNftBtn)}
                onCustomModal={onOpenModal}
              />
            );

          case 'service-cards':
            return (
              <FeatureGridSection
                key={idx}
                theme="nft"
                surface={altSurface}
                heading={section.heading}
                subheading={
                  section.subheading ||
                  (section.paragraphs?.length ? (
                    <div className="space-y-2">
                      {section.paragraphs.map((nodes, pIdx) => (
                        <p key={pIdx}>
                          <RichText nodes={nodes} />
                        </p>
                      ))}
                    </div>
                  ) : undefined)
                }
                cards={section.cards.map((c) => ({
                  title: c.title,
                  description: (
                    <div className="space-y-2">
                      {c.paragraphs.map((nodes, pIdx) => (
                        <p key={pIdx}>
                          <RichText nodes={nodes} />
                        </p>
                      ))}
                    </div>
                  ),
                  iconSrc: c.iconImg?.src,
                  iconAlt: c.iconImg?.alt || c.title,
                }))}
                columns={section.cards.length === 4 ? 2 : 3}
                bottomActions={(section.buttons || []).map(mapNftBtn)}
                onCustomModal={onOpenModal}
              />
            );

          case 'editorial-copy':
            return (
              <AlternatingSplitSection
                key={idx}
                theme="nft"
                surface={altSurface}
                heading={section.heading}
                subheading={section.subheading}
                paragraphs={section.paragraphs.map((nodes, pIdx) => (
                  <RichText key={pIdx} nodes={nodes} />
                ))}
                bullets={section.checklistColumns ? section.checklistColumns.flat() : []}
                bulletsColumns={2}
                imageSrc={section.image?.src}
                imageAlt={section.image?.alt || section.heading}
                actions={(section.buttons || []).map(mapNftBtn)}
                onCustomModal={onOpenModal}
              />
            );

          case 'cta-band':
            return (
              <section
                key={idx}
                className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2e1065] via-[#6b21a8] to-[#be185d] text-white"
              >
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className={section.image ? 'lg:col-span-7 space-y-4' : 'lg:col-span-12 text-center space-y-4'}>
                    <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
                      {section.heading}{' '}
                      {section.headingAccent && (
                        <span className="text-[#FD5900]">{section.headingAccent}</span>
                      )}
                    </h2>
                    {section.subtext && (
                      <p className="text-base text-fuchsia-100 leading-relaxed">{section.subtext}</p>
                    )}
                    <div
                      className={`flex flex-wrap items-center gap-3.5 pt-1 ${
                        section.image ? '' : 'justify-center'
                      }`}
                    >
                      {section.buttons.map((btn, bIdx) => (
                        <SmartActionButton
                          key={bIdx}
                          action={mapNftBtn(btn)}
                          theme="nft"
                          onCustomModal={onOpenModal}
                        />
                      ))}
                    </div>
                  </div>
                  {section.image && (
                    <div className="lg:col-span-5 flex justify-center">
                      <img
                        src={section.image.src}
                        alt={section.image.alt || section.heading}
                        className="max-h-56 w-auto object-contain drop-shadow-xl"
                      />
                    </div>
                  )}
                </div>
              </section>
            );

          case 'testimonials-slider':
            return (
              <TestimonialsSection
                key={idx}
                theme="nft"
                heading={section.heading}
                subheading={section.subheading}
                testimonials={section.cards.map((c) => ({
                  name: c.name || 'Web3 Project Founder',
                  avatarSrc: c.avatarSrc,
                  rating: c.stars || 5,
                  quote: c.quote,
                  caseStudyHref:
                    c.button && c.button.href.startsWith('/') ? c.button.href : undefined,
                  caseStudyLabel: c.button?.label,
                }))}
                videoSpotlight={
                  section.videoFeature
                    ? {
                        heading: section.videoFeature.heading,
                        description: section.videoFeature.description,
                        embedUrl: section.videoFeature.videoSrc,
                      }
                    : undefined
                }
                actions={section.ctaButtons.map(mapNftBtn)}
                onCustomModal={onOpenModal}
              />
            );

          case 'video-feature':
            return (
              <TestimonialsSection
                key={idx}
                theme="nft"
                heading={section.heading}
                testimonials={[]}
                videoSpotlight={{
                  heading: section.heading,
                  description: section.description,
                  embedUrl: section.videoSrc,
                }}
              />
            );

          case 'image-banner':
            return (
              <section key={idx} className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-center">
                <div className="max-w-5xl mx-auto space-y-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
                    {section.heading}
                  </h2>
                  <img
                    src={section.image.src}
                    alt={section.image.alt || section.heading}
                    className="w-full h-auto rounded-2xl border border-border shadow-md mx-auto"
                  />
                </div>
              </section>
            );

          case 'discord-cards':
            return (
              <FeatureGridSection
                key={idx}
                id={section.sectionId}
                theme="nft"
                surface={altSurface}
                badge="Web3 Verticals"
                heading={section.heading}
                cards={section.cards.map((c) => ({
                  title: c.title,
                  description: c.description,
                  iconSrc: c.iconImg.src,
                  iconAlt: c.iconImg.alt || c.title,
                }))}
                columns={3}
              />
            );

          case 'package-table': {
            const tierHeadCells = section.mainRows[0]?.cells.slice(1) || [];
            const priceRowCells =
              section.mainRows[1]?.isHeader && section.mainRows[1].cells.length === tierHeadCells.length
                ? section.mainRows[1].cells
                : [];
            const tiers = tierHeadCells.map((c, tIdx) => ({
              name: c.text || `Tier ${tIdx + 1}`,
              price: priceRowCells[tIdx]?.text,
              highlighted: tIdx === 1,
            }));

            const ADVANCE_ONLY = /paid content|paid advertising|influencer|video marketing|email marketing/i;
            const PREMIUM_ONLY = /bounty|airdrop|paid pr/i;

            const dataRows = section.mainRows.slice(priceRowCells.length ? 2 : 1).map((row) => {
              const feat = row.cells[0]?.text || '';
              if (row.cells.length > 1) {
                return {
                  feature: feat,
                  values: row.cells.slice(1).map((cell) => {
                    if (cell.icon === 'check') return true;
                    if (cell.icon === 'times') return false;
                    return cell.text || true;
                  }),
                };
              }
              if (PREMIUM_ONLY.test(feat)) {
                return { feature: feat, values: [false, false, true] };
              }
              if (ADVANCE_ONLY.test(feat)) {
                return { feature: feat, values: [false, true, true] };
              }
              return { feature: feat, values: [true, true, true] };
            });

            return (
              <PricingMatrixSection
                key={idx}
                id={section.sectionId || 'package'}
                theme="nft"
                badge="Transparent Web3 Packages"
                heading={section.heading}
                tiers={tiers}
                rows={dataRows}
                footnote={section.noteText}
                onSelectTier={() => onOpenModal()}
              />
            );
          }

          case 'extra-slider':
            return (
              <ClientLogoMarquee
                key={idx}
                heading={section.heading || 'Influencers & Partners'}
                logos={section.logos.map((l) => ({ src: l.src, alt: l.name }))}
              />
            );

          case 'faq':
            return (
              <FaqAccordionSection
                key={idx}
                theme="nft"
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
                key={idx}
                theme="nft"
                heading={section.heading}
                subheading={section.subheading}
                callTitle={section.callTitle || '30-Min NFT & Web3 Discovery Call'}
                callDescription={
                  section.callDescription ||
                  'Schedule a consultation with our NFT & Discord community specialists.'
                }
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
