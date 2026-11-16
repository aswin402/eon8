import { useEffect, useState } from 'react';
import { SERVICES_DATA_LOADERS } from './data';
import type { OurServiceSlug, ServicePageData } from './types';
import { ServicesPageShell } from './components/ServicesPageShell';
import { ServiceNodeList } from './components/ServiceNodeRenderer';

interface OurServicesPageProps {
  slug: OurServiceSlug;
}

/**
 * Pure native React TSX route component for all 37 Our Services menu pages.
 * Lazy-loads strongly typed page data per route with pure JSX components.
 */
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
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-white">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <ServicesPageShell slug={slug} title={data.title} description={data.metaDesc}>
      <ServiceNodeList nodes={data.nodes} />
    </ServicesPageShell>
  );
}
