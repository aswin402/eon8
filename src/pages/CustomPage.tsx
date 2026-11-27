import { useEffect, useState } from 'react';
import { PageSeo, ServiceHeroSection } from '@/components/sections';
import { ArticleBlocksRenderer } from '@/pages/blog/ArticleBlocksRenderer';
import type { ArticleBlock } from '@/pages/blog/blogPostsData';
import { ServicePageView } from '@/pages/services/OurServicesPage';
import type { ServicePageData } from '@/pages/services/types';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { loadCustomPage, type PublishedPageRef } from '@/lib/pages/pageContent';
import { PageLoading } from '@/lib/pages/PageLoading';

/** Content of a "Simple page" created in Admin > Pages. */
export interface ContentPageData {
  title: string;
  metaDesc: string;
  noIndex?: boolean;
  heroBadge?: string;
  heroHeading: string;
  heroSubheading?: string;
  heroImage?: string;
  blocks: ArticleBlock[];
}

export function ContentPageView({ data }: { data: ContentPageData }) {
  return (
    <div className="bg-background text-foreground">
      <PageSeo title={data.title} description={data.metaDesc} ogImage={data.heroImage || undefined} noIndex={data.noIndex} />
      <ServiceHeroSection
        theme="brand"
        layout={data.heroImage ? 'split-media' : 'centered'}
        badge={data.heroBadge || undefined}
        heading={data.heroHeading || data.title}
        subheading={data.heroSubheading || undefined}
        paragraphs={[]}
        bullets={[]}
        actions={[]}
        mediaSrc={data.heroImage || undefined}
        mediaAlt={data.heroHeading || data.title}
      />
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto min-w-0 break-words [overflow-wrap:anywhere] text-[17px] leading-relaxed text-foreground/90">
          <ArticleBlocksRenderer blocks={data.blocks ?? []} />
        </article>
      </section>
    </div>
  );
}

/** A page created in Admin > Pages, shown at /<slug>/. */
export function CustomPage({ page }: { page: PublishedPageRef }) {
  const [state, setState] = useState<{ key: string; data: unknown | null } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadCustomPage(page.key).then((data) => {
      if (!cancelled) setState({ key: page.key, data });
    });
    return () => {
      cancelled = true;
    };
  }, [page.key]);

  if (!state || state.key !== page.key) return <PageLoading />;
  if (!state.data) return <NotFoundPage />;
  const slug = page.key.split(':')[1] ?? '';
  if (page.template === 'service') return <ServicePageView slug={slug} data={state.data as ServicePageData} />;
  return <ContentPageView data={state.data as ContentPageData} />;
}
