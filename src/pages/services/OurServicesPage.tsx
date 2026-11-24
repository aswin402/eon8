import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  AlternatingSplitSection,
  BottomCtaBanner,
  ClientLogoMarquee,
  DiscoveryCallSection,
  FaqAccordionSection,
  FeatureGridSection,
  InteractiveTabsSection,
  PageSeo,
  PricingMatrixSection,
  ProcessRoadmapSection,
  QuickCallbackBanner,
  ServiceHeroSection,
  SmartActionButton,
  StatsCounterStrip,
  TestimonialsSection,
  VERTICAL_THEMES,
} from '@/components/sections';
import { RichText } from '@/pages/crypto/components/RichText';
import { SERVICES_DATA_LOADERS } from './data';
import type { OurServiceSlug, ServicePageData } from './types';

interface OurServicesPageProps {
  slug: OurServiceSlug;
}

export default function OurServicesPage({ slug }: OurServicesPageProps) {
  const [loaded, setLoaded] = useState<{
    routeSlug: OurServiceSlug;
    data: ServicePageData;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = SERVICES_DATA_LOADERS[slug];
    if (!loader) return undefined;

    loader().then((pageData) => {
      if (!cancelled) {
        setLoaded({ routeSlug: slug, data: pageData });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const data = loaded?.routeSlug === slug ? loaded.data : null;

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#FD5900] border-t-transparent" />
      </div>
    );
  }

  const { theme, title, metaDesc, noIndex, hero, sections, disclaimer } = data;
  const palette = VERTICAL_THEMES[theme];
  const firstSplitImage = sections.find((s) => s.type === 'split' && s.imageSrc);
  const resolvedOgImage =
    hero.mediaSrc || (firstSplitImage?.type === 'split' ? firstSplitImage.imageSrc : undefined);

  return (
    <div className="bg-background text-foreground" data-page-slug={slug}>
      <PageSeo
        title={title}
        description={metaDesc}
        ogImage={resolvedOgImage}
        noIndex={noIndex}
      />

      {/* 1. Native Tailwind Hero */}
      <ServiceHeroSection
        theme={theme}
        layout={hero.layout}
        badge={hero.badge || 'EON8 Digital Excellence'}
        heading={hero.heading}
        subheading={hero.subheading}
        paragraphs={hero.paragraphs.map((nodes, idx) => (
          <RichText key={idx} nodes={nodes} tone="on-dark" />
        ))}
        bullets={hero.bullets}
        actions={hero.actions}
        mediaSrc={hero.mediaSrc}
        mediaAlt={hero.mediaAlt || hero.heading}
        formHeading={hero.formHeading || 'Request Free Quote'}
        formSubmitLabel={hero.formSubmitLabel || 'Get My Free Proposal'}
      />

      {/* 2. Semantic React Sections */}
      {sections.map((section, idx) => {
        const surface = idx % 2 === 0 ? 'light' : 'muted';

        switch (section.type) {
          case 'callback-banner':
            return (
              <QuickCallbackBanner
                key={idx}
                theme={theme}
                heading={section.heading}
                submitLabel={section.submitLabel}
              />
            );

          case 'logo-marquee':
            return (
              <ClientLogoMarquee
                key={idx}
                heading={section.heading}
                logos={section.logos}
              />
            );

          case 'stats':
            return (
              <StatsCounterStrip
                key={idx}
                theme={theme}
                heading={section.heading}
                subheading={section.subheading}
                stats={section.stats}
              />
            );

          case 'tabs':
            return (
              <InteractiveTabsSection
                key={idx}
                theme={theme}
                surface="muted"
                badge="Specialized Capabilities"
                heading={section.heading}
                subheading={section.subheading}
                tabs={section.tabs}
              />
            );

          case 'pricing-matrix':
            return (
              <PricingMatrixSection
                key={idx}
                id="package"
                theme={theme}
                badge="Transparent Pricing"
                heading={section.heading}
                subheading={section.subheading}
                tiers={section.tiers}
                rows={section.rows}
                footnote={section.footnote}
              />
            );

          case 'feature-grid':
            return (
              <FeatureGridSection
                key={idx}
                theme={theme}
                surface={idx % 3 === 1 ? 'dark' : surface}
                heading={section.heading}
                subheading={section.subheading}
                cards={section.cards}
                columns={section.columns || 3}
                bottomActions={section.actions}
              />
            );

          case 'process':
            return (
              <ProcessRoadmapSection
                key={idx}
                theme={theme}
                surface="dark"
                badge="Workflow"
                heading={section.heading}
                subheading={section.subheading}
                steps={section.steps}
                bottomActions={section.actions}
              />
            );

          case 'split': {
            const splitIndex = sections.slice(0, idx).filter((s) => s.type === 'split').length;
            const isReverse = splitIndex % 2 === 1;
            return (
              <AlternatingSplitSection
                key={idx}
                theme={theme}
                surface={surface}
                reverse={isReverse}
                heading={section.heading}
                subheading={section.subheading}
                paragraphs={section.paragraphs.map((nodes, pIdx) => (
                  <RichText key={pIdx} nodes={nodes} />
                ))}
                bullets={section.bullets}
                bulletsColumns={section.bullets && section.bullets.length >= 4 ? 2 : 1}
                imageSrc={section.imageSrc}
                imageAlt={section.imageAlt || section.heading}
                actions={section.actions}
              />
            );
          }

          case 'cta-banner':
            return (
              <section
                key={idx}
                className={`py-14 sm:py-16 px-4 sm:px-6 lg:px-8 text-white ${palette.ctaGradient}`}
              >
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
                      {section.heading}
                    </h2>
                    {section.subtext && (
                      <p className="text-base text-slate-200">{section.subtext}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                    {section.actions.map((act, aIdx) => (
                      <SmartActionButton key={aIdx} action={act} theme={theme} />
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'testimonials':
            return (
              <TestimonialsSection
                key={idx}
                theme={theme}
                heading={section.heading}
                testimonials={section.quotes.map((q) => ({
                  quote: q,
                  name: 'Verified EON8 Client',
                }))}
              />
            );

          case 'blog-links':
            return (
              <section
                key={idx}
                className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50"
              >
                <div className="max-w-7xl mx-auto space-y-8">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                      {section.heading}
                    </h2>
                    <Link
                      to="/blog"
                      className="text-sm font-bold text-[#FD5900] hover:underline inline-flex items-center gap-1 no-underline"
                    >
                      <span>View All Articles</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {section.posts.map((post) => (
                      <Link
                        key={post.href}
                        to={post.href}
                        className="group rounded-2xl bg-card border border-border p-6 shadow-xs hover:shadow-lg transition-all flex items-start gap-4 no-underline"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0053C6]/10 dark:bg-sky-500/15 text-[#0053C6] dark:text-sky-400 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-[15.5px] font-heading font-bold text-foreground group-hover:text-[#FD5900] transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground">
                            Read Article <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'faq':
            return (
              <FaqAccordionSection
                key={idx}
                theme={theme}
                surface={surface}
                heading={section.heading}
                faqs={section.faqs.map((f) => ({
                  question: f.question,
                  answer: (
                    <div className="space-y-3">
                      {f.answerParagraphs.map((nodes, pIdx) => (
                        <p key={pIdx}>
                          <RichText nodes={nodes} />
                        </p>
                      ))}
                      {f.bullets && f.bullets.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1.5">
                          {f.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ),
                }))}
              />
            );

          case 'discovery-call':
            return (
              <DiscoveryCallSection
                key={idx}
                theme={theme}
                heading={section.heading}
                subheading={section.subheading}
              />
            );

          default:
            return null;
        }
      })}

      {/* 3. Unified Bottom Consultation + Disclaimer */}
      <BottomCtaBanner
        theme={theme}
        disclaimer={disclaimer}
      />
    </div>
  );
}
