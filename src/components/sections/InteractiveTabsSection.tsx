import { useState, type ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { VERTICAL_THEMES, type TabPanelItem, type VerticalTheme } from './types';

interface InteractiveTabsSectionProps {
  id?: string;
  badge?: string;
  heading: ReactNode;
  subheading?: ReactNode;
  tabs: TabPanelItem[];
  theme?: VerticalTheme;
  surface?: 'light' | 'muted';
}

export function InteractiveTabsSection({
  id,
  badge,
  heading,
  subheading,
  tabs,
  theme = 'brand',
  surface = 'muted',
}: InteractiveTabsSectionProps) {
  const palette = VERTICAL_THEMES[theme];
  const [activeId, setActiveId] = useState(tabs[0]?.id || '');
  if (!tabs.length) return null;

  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];
  const sectionBg =
    surface === 'muted'
      ? 'bg-slate-50 dark:bg-slate-900/50 text-foreground'
      : 'bg-background text-foreground';

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${sectionBg}`}>
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
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{subheading}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Vertical / Horizontal Tab Buttons */}
          <div
            role="tablist"
            aria-label="Service capabilities"
            className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar"
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-semibold text-sm sm:text-[15px] whitespace-nowrap lg:whitespace-normal transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#0053C6] text-white border-[#0053C6] shadow-md'
                      : 'bg-card hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground border-border'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div
            role="tabpanel"
            className="lg:col-span-8 rounded-2xl bg-card border border-border p-6 sm:p-8 lg:p-10 shadow-sm space-y-6"
          >
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
                {activeTab.heading}
              </h3>
              {activeTab.description && (
                <p className="text-base text-muted-foreground leading-relaxed">
                  {activeTab.description}
                </p>
              )}
            </div>

            {activeTab.subItems && activeTab.subItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {activeTab.subItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-4 bg-slate-50 dark:bg-slate-900/70 border border-border/70 space-y-1.5"
                  >
                    <h4 className="text-[15px] font-heading font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab.bullets && activeTab.bullets.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeTab.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-[#FD5900] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab.imageSrc && (
              <img
                src={activeTab.imageSrc}
                alt={activeTab.imageAlt || activeTab.heading}
                className="w-full max-h-72 object-contain rounded-xl pt-2"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
