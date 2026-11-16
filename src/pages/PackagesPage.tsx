import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import {
  packagesData as packagesMap,
  type PackageSlug,
  type PackageCell,
} from './packagesData';
import { useAppStore } from '@/store/useAppStore';

export type { PackageSlug };

const PACKAGE_TABS: { slug: PackageSlug; label: string }[] = [
  { slug: 'seo-packages', label: 'SEO Packages' },
  { slug: 'ppc-packages', label: 'PPC Packages' },
  { slug: 'facebook-packages', label: 'Facebook Packages' },
  { slug: 'instagram-packages', label: 'Instagram Packages' },
  { slug: 'linkedin-packages', label: 'LinkedIn Packages' },
  { slug: 'twitter-packages', label: 'Twitter Packages' },
];

function getCellText(cell: PackageCell | undefined): string {
  if (!cell) return '';
  return typeof cell === 'string' ? cell : cell.text;
}

function renderCellValue(cell: PackageCell | undefined) {
  const val = getCellText(cell);
  if (val === '__CHECK__') {
    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700"
        aria-label="Included"
      >
        <Check className="w-4 h-4 stroke-[2.5]" />
      </span>
    );
  }
  if (val === '__CROSS__') {
    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-600"
        aria-label="Not included"
      >
        <X className="w-4 h-4 stroke-[2.5]" />
      </span>
    );
  }
  return <span className="font-medium text-slate-800">{val}</span>;
}

interface PackagesPageProps {
  slug: PackageSlug;
}

export function PackagesPage({ slug }: PackagesPageProps) {
  const { setContactModalOpen } = useAppStore();
  const [mobileTierIdx, setMobileTierIdx] = useState<0 | 1 | 2>(1);

  const pkg = packagesMap[slug] || packagesMap['seo-packages'];
  const mainTable = pkg.tables[0] || [];
  const noteRow = pkg.tables[1]?.[0]?.[0];
  const noteText =
    getCellText(noteRow) ||
    'Note: The charges for all paid campaigns are not included Within The Subscription.';

  const headerRow = mainTable[0] || [];
  const priceRow = mainTable[1] || [];
  const bodyRows = mainTable.slice(2);

  const serviceColTitle = getCellText(headerRow[0]) || pkg.packageTitle;
  const tiers = [0, 1, 2].map((idx) => ({
    name: getCellText(headerRow[idx + 1]) || ['Basic', 'Advance', 'Premium'][idx],
    price: getCellText(priceRow[idx]) || '',
  }));

  useEffect(() => {
    document.title = pkg.metaTitle || `${pkg.bannerTitle} - Eon8`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && pkg.metaDesc) {
      metaDesc.setAttribute('content', pkg.metaDesc);
    }
    window.scrollTo(0, 0);
  }, [pkg]);

  const scrollToPackages = () => {
    document.getElementById('packages-table')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-slate-900 font-body overflow-x-clip">
      {/* Geometric Faceted Amber-Orange Hero Banner matching live packages_view.png */}
      <header
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-5 sm:px-8 text-white overflow-hidden"
        style={{
          background:
            'linear-gradient(125deg, #f9ba3c 0%, #f58a1f 48%, #ee5b11 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(30deg, rgba(255,255,255,0.22) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.22) 87.5%), linear-gradient(150deg, rgba(255,255,255,0.22) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.22) 87.5%), linear-gradient(60deg, rgba(167,50,0,0.18) 25%, transparent 25.5%, transparent 75%, rgba(167,50,0,0.18) 75%)',
            backgroundSize: '120px 210px',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-bold text-white leading-tight drop-shadow-sm">
            {pkg.bannerTitle}
          </h1>

          <div className="space-y-4 max-w-3xl mx-auto">
            {pkg.bannerParagraphs.map((para, i) => (
              <p key={i} className="text-base sm:text-lg text-white/95 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="px-7 py-3.5 rounded bg-[#a83200] hover:bg-[#8d2a00] text-white font-semibold text-sm sm:text-base shadow-lg transition-colors cursor-pointer"
            >
              Talk With Our Experts
            </button>
            <button
              type="button"
              onClick={scrollToPackages}
              className="px-7 py-3.5 rounded bg-[#a83200] hover:bg-[#8d2a00] text-white font-semibold text-sm sm:text-base shadow-lg transition-colors cursor-pointer"
            >
              View Our Packages
            </button>
          </div>
        </div>
      </header>

      {/* Package Category Switcher Tabs */}
      <nav
        aria-label="Digital Marketing Packages"
        className="bg-slate-50 border-b border-slate-200 px-4 sm:px-8 py-4"
      >
        <div className="max-w-[1170px] mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {PACKAGE_TABS.map((tab) => {
            const active = tab.slug === slug;
            return (
              <Link
                key={tab.slug}
                to={`/${tab.slug}`}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#f58322] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#f58322] hover:text-[#f58322]'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Overview & Visual Breakdown */}
      <section className="max-w-[1170px] mx-auto px-5 sm:px-8 py-14 sm:py-20 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-snug">
              {pkg.overviewTitle}
            </h2>
            <div className="space-y-4 text-slate-700 text-[15px] sm:text-base leading-relaxed">
              {pkg.overviewParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <img
              src={pkg.visualImage}
              alt={pkg.visualTitle || pkg.bannerTitle}
              className="w-full max-w-lg rounded-2xl object-contain shadow-lg border border-slate-100 bg-white p-2"
            />
          </div>
        </div>

        {(pkg.visualTitle || pkg.visualParagraphs.length > 0) && (
          <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/70 border border-orange-200/80 p-7 sm:p-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
              {pkg.visualTitle}
            </h2>
            <div className="space-y-3 text-slate-700 text-[15px] sm:text-base leading-relaxed">
              {pkg.visualParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Packages Comparison Table */}
      <section id="packages-table" className="bg-slate-50 border-t border-slate-200 py-14 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1170px] mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-slate-900">
              {pkg.packageTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Transparent monthly retainers designed to scale traffic, qualified leads, and ROI.
            </p>
          </div>

          {/* Desktop / Tablet Full Comparison Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 shadow-lg bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#f58322] text-white">
                  <th
                    rowSpan={2}
                    className="py-4 px-5 font-heading font-bold text-base border-r border-orange-400/50 w-[40%] align-middle"
                  >
                    {serviceColTitle}
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      className="py-3.5 px-4 text-center font-heading font-bold text-base border-r last:border-r-0 border-orange-400/50 w-[20%]"
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
                <tr className="bg-[#111827] text-white">
                  {tiers.map((tier) => (
                    <th
                      key={`${tier.name}-price`}
                      className="py-3 px-4 text-center font-heading font-extrabold text-xl border-r last:border-r-0 border-slate-700"
                    >
                      {tier.price}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, idx) => {
                  if (row.length === 1) {
                    return (
                      <tr key={idx} className="bg-slate-800 text-white">
                        <th
                          colSpan={4}
                          className="py-3 px-5 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm"
                        >
                          {getCellText(row[0])}
                        </th>
                      </tr>
                    );
                  }
                  return (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white border-b border-slate-100' : 'bg-slate-50/70 border-b border-slate-100'}
                    >
                      <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">
                        {getCellText(row[0])}
                      </td>
                      {[1, 2, 3].map((colIdx) => (
                        <td
                          key={colIdx}
                          className="py-3 px-4 text-center border-r last:border-r-0 border-slate-100"
                        >
                          {renderCellValue(row[colIdx])}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr className="bg-slate-50 border-t-2 border-slate-200">
                  <td className="py-5 px-5 font-heading font-bold text-slate-900">
                    Choose Your Growth Plan
                  </td>
                  {tiers.map((tier) => (
                    <td key={`${tier.name}-cta`} className="py-5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => setContactModalOpen(true)}
                        className="px-5 py-2.5 rounded-lg bg-[#f58322] hover:bg-[#dd6e11] text-white font-semibold text-xs sm:text-sm shadow transition-colors cursor-pointer"
                      >
                        Select {tier.name}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Interactive Tier Selector Card (< md) */}
          <div className="md:hidden space-y-5">
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-200/80">
              {tiers.map((tier, idx) => {
                const active = mobileTierIdx === idx;
                return (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => setMobileTierIdx(idx as 0 | 1 | 2)}
                    className={`py-2.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                      active
                        ? 'bg-[#f58322] text-white shadow'
                        : 'text-slate-700 hover:bg-white/60'
                    }`}
                  >
                    <div className="text-xs font-bold">{tier.name}</div>
                    <div className="text-base font-heading font-extrabold">{tier.price}</div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden">
              <div className="bg-[#111827] text-white p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-orange-300 font-semibold">
                    {serviceColTitle}
                  </div>
                  <div className="text-xl font-heading font-bold">
                    {tiers[mobileTierIdx].name} Plan
                  </div>
                </div>
                <div className="text-3xl font-heading font-black text-[#f58322]">
                  {tiers[mobileTierIdx].price}
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {bodyRows.map((row, idx) => {
                  if (row.length === 1) {
                    return (
                      <div
                        key={idx}
                        className="bg-slate-800 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
                      >
                        {getCellText(row[0])}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={idx}
                      className="px-4 py-3 flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-slate-700 font-medium">{getCellText(row[0])}</span>
                      <span className="shrink-0">{renderCellValue(row[mobileTierIdx + 1])}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-[#f58322] hover:bg-[#dd6e11] text-white font-bold text-sm shadow transition-colors cursor-pointer"
                >
                  Get Started with {tiers[mobileTierIdx].name} ({tiers[mobileTierIdx].price})
                </button>
              </div>
            </div>
          </div>

          {/* Verbatim Note Banner from live tables[1] */}
          <div className="rounded-xl bg-[#f58322] text-white px-5 py-4 text-center font-semibold text-sm sm:text-base shadow">
            {noteText}
          </div>

          {/* Custom Package CTA */}
          <div className="rounded-2xl bg-[#0053c6] text-white p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-300">
                <Sparkles className="w-4 h-4" />
                <span>Custom Growth Packages Available</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Need a tailored Enterprise or Multi-Channel Strategy?
              </h3>
              <p className="text-sm sm:text-base text-blue-100 max-w-xl">
                We customize deliverables, ad budgets, and AI automation around your exact growth targets.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white font-bold text-sm sm:text-base shadow-lg transition-colors shrink-0 cursor-pointer"
            >
              <span>Talk With Our Experts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
