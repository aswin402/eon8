import { useState } from 'react';
import { ArrowDown, ArrowUp, Copy, ImagePlus, Plus, Trash2 } from 'lucide-react';
import type { RichNode } from '@/pages/crypto/types';
import type { ArticleBlock } from '@/pages/blog/blogPostsData';
import { markupToRichNodes, richNodesToMarkup } from '@/lib/cms/richTextCodec';
import { AdminBlockEditor } from './AdminBlockEditor';
import { ui } from './adminStyles';

/**
 * Edits any page's content as a form. The shape comes from the page itself
 * (the same data the page renders), so every page template works without its
 * own editor: text, rich text, lists, buttons, images and sections.
 */

type Json = unknown;
type JsonObject = Record<string, Json>;

export interface FieldEditorContext {
  template: string;
  pickImage: (onPicked: (url: string) => void) => void;
}

const HIDDEN_KEYS = new Set(['slug', 'pageId', 'className', 'srcSet', 'sizes', 'id', 'routeSlug']);

const LABELS: Record<string, string> = {
  title: 'SEO title (browser tab and Google)',
  metaTitle: 'SEO title (browser tab and Google)',
  metaDesc: 'SEO description (Google snippet)',
  noIndex: 'Hide this page from Google (noindex)',
  theme: 'Colour theme',
  hero: 'Hero (top of the page)',
  heroBadge: 'Hero badge',
  heroHeading: 'Page heading',
  heroSubheading: 'Heading subtitle',
  heroImage: 'Hero image',
  headingLines: 'Heading lines',
  mediaSrc: 'Image',
  mediaAlt: 'Image alt text (for Google and screen readers)',
  imageSrc: 'Image',
  imageAlt: 'Image alt text',
  iconSrc: 'Icon',
  iconAlt: 'Icon alt text',
  src: 'Image',
  alt: 'Alt text',
  href: 'Link (URL or /page/)',
  opensModal: 'Opens the enquiry form',
  external: 'Opens in a new tab',
  formHeading: 'Form heading',
  formSubmitLabel: 'Form button text',
  answerParagraphs: 'Answer',
  faqs: 'Questions',
  ctaLabel: 'Button text',
  submitLabel: 'Button text',
  disclaimer: 'Footer note',
  blocks: 'Page content',
};

const ENUMS: Record<string, string[]> = {
  theme: ['brand', 'ai', 'crypto', 'nft', 'influencer'],
  layout: ['split-form', 'split-media', 'centered'],
  variant: ['primary', 'secondary', 'whatsapp', 'outline'],
  kind: ['modal', 'scroll', 'route', 'external', 'tel', 'whatsapp'],
};

const LONG_TEXT_KEYS = /^(description|subheading|subtext|intro|text|answer|quote|disclaimer|metaDesc|excerpt|body|lead|summary|heroSubheading)$/i;
const IMAGE_KEY = /(^|[a-z])(src|image|img|icon|logo|thumbnail|avatar|poster|background|photo)(Src|Url)?$/i;
const IMAGE_VALUE = /\.(png|jpe?g|webp|gif|svg|avif)(\?|#|$)/i;
const RICH_KEYS = new Set(['text', 'strong', 'em', 'accent', 'br', 'href', 'className']);

const SECTION_TEMPLATES: Record<string, { label: string; value: JsonObject }> = {
  split: { label: 'Text + image', value: { type: 'split', heading: 'New section', paragraphs: [['Write the text here.']], bullets: [], imageSrc: '', imageAlt: '' } },
  'feature-grid': { label: 'Cards grid', value: { type: 'feature-grid', heading: 'Our services', subheading: '', columns: 3, cards: [{ title: 'Card title', description: 'Short description.' }] } },
  process: { label: 'Process steps', value: { type: 'process', heading: 'How we work', steps: [{ step: '01', title: 'Step title', description: 'What happens in this step.' }] } },
  stats: { label: 'Numbers strip', value: { type: 'stats', heading: '', stats: [{ value: '100+', label: 'Happy clients' }] } },
  tabs: { label: 'Tabs', value: { type: 'tabs', heading: 'Explore', tabs: [{ id: 'tab-1', label: 'Tab 1', heading: 'Tab heading', description: 'Tab text.', bullets: [] }] } },
  faq: { label: 'FAQ', value: { type: 'faq', heading: 'Frequently Asked Questions', faqs: [{ question: 'Question?', answerParagraphs: [['Answer.']] }] } },
  'cta-banner': { label: 'Call-to-action banner', value: { type: 'cta-banner', heading: 'Ready to grow?', subtext: '', actions: [{ label: 'Get a free proposal', opensModal: true, variant: 'primary' }] } },
  'callback-banner': { label: 'Call-back form strip', value: { type: 'callback-banner', heading: 'Get a call back', submitLabel: 'Call me back' } },
  'logo-marquee': { label: 'Client logos', value: { type: 'logo-marquee', heading: 'Brands we work with', logos: [{ src: '', alt: '' }] } },
  testimonials: { label: 'Testimonials', value: { type: 'testimonials', heading: 'What clients say', quotes: ['Quote text.'] } },
  'blog-links': { label: 'Blog links', value: { type: 'blog-links', heading: 'Related articles', posts: [{ title: 'Article title', href: '/blog/' }] } },
  'pricing-matrix': { label: 'Pricing table', value: { type: 'pricing-matrix', heading: 'Packages', tiers: [{ name: 'Basic', price: '' }, { name: 'Pro', price: '', highlighted: true }], rows: [{ feature: 'Feature', values: [true, true] }] } },
  'discovery-call': { label: 'Book a call', value: { type: 'discovery-call', heading: 'Book a free discovery call', subheading: '' } },
};

/** Skeleton for a new item in an empty list, by the list's name. */
const ITEM_TEMPLATES: Record<string, Json> = {
  paragraphs: [''],
  answerParagraphs: [''],
  bullets: '',
  quotes: '',
  headingLines: '',
  actions: { label: 'Button', href: '/contact/', variant: 'primary' },
  cards: { title: '', description: '' },
  faqs: { question: '', answerParagraphs: [['']] },
  logos: { src: '', alt: '' },
  stats: { value: '', label: '' },
  steps: { title: '', description: '' },
  posts: { title: '', href: '/blog/' },
};

const humanize = (key: string) =>
  LABELS[key] ??
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());

const isObject = (v: Json): v is JsonObject => !!v && typeof v === 'object' && !Array.isArray(v);
const isRichNode = (v: Json) => typeof v === 'string' || (isObject(v) && Object.keys(v).every((k) => RICH_KEYS.has(k)));
const isRichArray = (v: Json[]) => v.length > 0 && v.every(isRichNode) && v.some((n) => typeof n !== 'string');
const looksLikeImage = (key: string, value: string) =>
  (IMAGE_KEY.test(key) && !/alt$/i.test(key)) || (IMAGE_VALUE.test(value) && !/\s/.test(value));

/** Empty copy of an item (strings cleared, lists kept to one entry) for "Add". */
function blankLike(v: Json): Json {
  if (typeof v === 'string') return '';
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return false;
  if (Array.isArray(v)) return v.length ? [blankLike(v[0])] : [];
  if (isObject(v)) {
    const out: JsonObject = {};
    for (const [k, val] of Object.entries(v)) out[k] = k === 'type' || k === 'level' ? val : blankLike(val);
    return out;
  }
  return v;
}

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

function itemSummary(v: Json, idx: number): string {
  if (typeof v === 'string') return v.slice(0, 80) || `Item ${idx + 1}`;
  if (Array.isArray(v)) return richNodesToMarkup(v as RichNode[]).slice(0, 80) || `Item ${idx + 1}`;
  if (isObject(v)) {
    const t = ['heading', 'title', 'label', 'question', 'name', 'text', 'value', 'feature', 'alt'].map((k) => v[k]).find((x) => typeof x === 'string' && x.trim());
    const type = typeof v.type === 'string' ? SECTION_TEMPLATES[v.type]?.label ?? humanize(v.type) : '';
    return [type, typeof t === 'string' ? t.slice(0, 70) : ''].filter(Boolean).join(' · ') || `Item ${idx + 1}`;
  }
  return `Item ${idx + 1}`;
}

// ---------------------------------------------------------------------------
// Leaf controls

function TextControl({ name, value, onChange }: { name: string; value: string; onChange: (v: string) => void }) {
  const long = LONG_TEXT_KEYS.test(name) || value.length > 90 || value.includes('\n');
  if (long) {
    return (
      <textarea
        className={`${ui.input} resize-y leading-relaxed`}
        rows={Math.min(8, Math.max(2, Math.ceil(value.length / 90)))}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return <input className={ui.input} value={value} onChange={(e) => onChange(e.target.value)} />;
}

function ImageControl({ value, onChange, ctx }: { value: string; onChange: (v: string) => void; ctx: FieldEditorContext }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="flex items-start gap-3">
      <div className="w-20 h-14 shrink-0 rounded-lg border border-border bg-muted/40 overflow-hidden flex items-center justify-center">
        {value && !broken ? (
          <img src={value} alt="" className="max-w-full max-h-full object-contain" onError={() => setBroken(true)} />
        ) : (
          <ImagePlus className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 space-y-2 min-w-0">
        <input
          className={ui.input}
          value={value}
          placeholder="/wp-content/uploads/... or /uploads/..."
          onChange={(e) => {
            setBroken(false);
            onChange(e.target.value);
          }}
        />
        <button
          type="button"
          className={`${ui.secondaryBtn} !py-1.5 !text-xs`}
          onClick={() =>
            ctx.pickImage((url) => {
              setBroken(false);
              onChange(url);
            })
          }
        >
          <ImagePlus className="w-3.5 h-3.5" /> Choose from media library
        </button>
      </div>
    </div>
  );
}

function RichTextControl({ nodes, onChange }: { nodes: RichNode[]; onChange: (v: RichNode[]) => void }) {
  const canonical = richNodesToMarkup(nodes);
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? canonical;
  return (
    <textarea
      className={`${ui.input} resize-y leading-relaxed`}
      rows={Math.min(8, Math.max(2, Math.ceil(text.length / 90)))}
      value={text}
      onFocus={() => setDraft(canonical)}
      onChange={(e) => {
        setDraft(e.target.value);
        onChange(markupToRichNodes(e.target.value));
      }}
      onBlur={() => setDraft(null)}
    />
  );
}

// ---------------------------------------------------------------------------
// Lists and groups

function ListControls({
  idx,
  count,
  onMove,
  onDuplicate,
  onRemove,
}: {
  idx: number;
  count: number;
  onMove: (to: number) => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-0.5 shrink-0" onClick={(e) => e.preventDefault()}>
      <button type="button" className={ui.iconBtn} title="Move up" disabled={idx === 0} onClick={() => onMove(idx - 1)}>
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
      <button type="button" className={ui.iconBtn} title="Move down" disabled={idx === count - 1} onClick={() => onMove(idx + 1)}>
        <ArrowDown className="w-3.5 h-3.5" />
      </button>
      <button type="button" className={ui.iconBtn} title="Duplicate" onClick={onDuplicate}>
        <Copy className="w-3.5 h-3.5" />
      </button>
      <button type="button" className={ui.dangerIconBtn} title="Remove" onClick={onRemove}>
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </span>
  );
}

function ArrayEditor({
  name,
  value,
  onChange,
  depth,
  ctx,
}: {
  name: string;
  value: Json[];
  onChange: (v: Json[]) => void;
  depth: number;
  ctx: FieldEditorContext;
}) {
  const [sectionType, setSectionType] = useState('split');

  // Blog-style content blocks for "Simple page".
  if (name === 'blocks' && ctx.template === 'content') {
    return (
      <AdminBlockEditor
        blocks={value as ArticleBlock[]}
        onChange={(b) => onChange(b)}
        onRequestMediaPicker={ctx.pickImage}
      />
    );
  }

  // One paragraph with bold / italic / links.
  if (isRichArray(value)) {
    return <RichTextControl nodes={value as RichNode[]} onChange={onChange} />;
  }

  const move = (from: number, to: number) => {
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };
  const setAt = (i: number, v: Json) => onChange(value.map((x, j) => (j === i ? v : x)));
  const removeAt = (i: number) => onChange(value.filter((_, j) => j !== i));
  const duplicateAt = (i: number) => onChange([...value.slice(0, i + 1), clone(value[i]), ...value.slice(i + 1)]);
  const add = () => {
    const template = value.length ? blankLike(value[value.length - 1]) : ITEM_TEMPLATES[name] ?? '';
    onChange([...value, template]);
  };

  const isSections = name === 'sections' && ctx.template === 'service';
  const simpleItems = value.every((v) => typeof v === 'string' || Array.isArray(v)) && !(value.length === 0 && isObject(ITEM_TEMPLATES[name]));

  return (
    <div className="space-y-2">
      {value.length === 0 && <p className={ui.hint}>Nothing here yet.</p>}

      {simpleItems
        ? value.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                {typeof item === 'string' ? (
                  <TextControl name={name} value={item} onChange={(v) => setAt(i, v)} />
                ) : (
                  <RichTextControl nodes={item as RichNode[]} onChange={(v) => setAt(i, v)} />
                )}
              </div>
              <ListControls idx={i} count={value.length} onMove={(to) => move(i, to)} onDuplicate={() => duplicateAt(i)} onRemove={() => removeAt(i)} />
            </div>
          ))
        : value.map((item, i) => (
            <details key={i} className="rounded-xl border border-border bg-background/60 group" open={value.length <= 2 && depth < 3}>
              <summary className="flex items-center justify-between gap-3 px-3.5 py-2.5 cursor-pointer select-none list-none">
                <span className="text-sm font-bold text-foreground truncate min-w-0">
                  <span className="text-muted-foreground mr-2">{i + 1}.</span>
                  {itemSummary(item, i)}
                </span>
                <ListControls idx={i} count={value.length} onMove={(to) => move(i, to)} onDuplicate={() => duplicateAt(i)} onRemove={() => removeAt(i)} />
              </summary>
              <div className="px-3.5 pb-3.5 pt-1 border-t border-border">
                <ValueEditor name={name} value={item} onChange={(v) => setAt(i, v)} depth={depth + 1} ctx={ctx} />
              </div>
            </details>
          ))}

      {isSections ? (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <select className={ui.select} value={sectionType} onChange={(e) => setSectionType(e.target.value)}>
            {Object.entries(SECTION_TEMPLATES).map(([type, t]) => (
              <option key={type} value={type}>
                {t.label}
              </option>
            ))}
          </select>
          <button type="button" className={`${ui.secondaryBtn} !py-2`} onClick={() => onChange([...value, clone(SECTION_TEMPLATES[sectionType].value)])}>
            <Plus className="w-4 h-4" /> Add section
          </button>
        </div>
      ) : (
        <button type="button" className={`${ui.secondaryBtn} !py-1.5 !text-xs`} onClick={add}>
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      )}
    </div>
  );
}

function ObjectEditor({ value, onChange, depth, ctx }: { value: JsonObject; onChange: (v: JsonObject) => void; depth: number; ctx: FieldEditorContext }) {
  const entries = Object.entries(value).filter(([k, v]) => !HIDDEN_KEYS.has(k) && v !== null && v !== undefined);
  const set = (k: string, v: Json) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-4 pt-2">
      {typeof value.type === 'string' && (
        <span className="inline-block px-2 py-0.5 rounded-md bg-[#0053C6]/10 text-[#0053C6] dark:text-sky-300 text-[11px] font-extrabold uppercase tracking-wider">
          {SECTION_TEMPLATES[value.type]?.label ?? humanize(value.type)}
        </span>
      )}
      {entries
        .filter(([k]) => k !== 'type')
        .map(([k, v]) => (
          <Field key={k} name={k} value={v} onChange={(nv) => set(k, nv)} depth={depth} ctx={ctx} />
        ))}
    </div>
  );
}

function Field({ name, value, onChange, depth, ctx }: { name: string; value: Json; onChange: (v: Json) => void; depth: number; ctx: FieldEditorContext }) {
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2.5 text-sm font-semibold text-foreground cursor-pointer">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 accent-[#FD5900]" />
        {humanize(name)}
      </label>
    );
  }
  const complex = Array.isArray(value) ? !isRichArray(value) && !(name === 'blocks' && ctx.template === 'content') : isObject(value);
  if (complex && depth >= 1) {
    return (
      <div className="space-y-2">
        <p className={ui.label}>{humanize(name)}</p>
        <div className="pl-3 border-l-2 border-border">
          <ValueEditor name={name} value={value} onChange={onChange} depth={depth} ctx={ctx} />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <p className={ui.label}>{humanize(name)}</p>
      <ValueEditor name={name} value={value} onChange={onChange} depth={depth} ctx={ctx} />
    </div>
  );
}

export function ValueEditor({
  name,
  value,
  onChange,
  depth,
  ctx,
}: {
  name: string;
  value: Json;
  onChange: (v: Json) => void;
  depth: number;
  ctx: FieldEditorContext;
}) {
  if (typeof value === 'string') {
    const options = ENUMS[name];
    if (options && options.includes(value)) {
      return (
        <select className={ui.select} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    }
    if (looksLikeImage(name, value)) return <ImageControl value={value} onChange={onChange} ctx={ctx} />;
    return <TextControl name={name} value={value} onChange={onChange} />;
  }
  if (typeof value === 'number') {
    if (name === 'columns') {
      return (
        <select className={ui.select} value={value} onChange={(e) => onChange(Number(e.target.value))}>
          {[2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} columns
            </option>
          ))}
        </select>
      );
    }
    return <input type="number" className={`${ui.input} max-w-40`} value={value} onChange={(e) => onChange(Number(e.target.value))} />;
  }
  if (typeof value === 'boolean') {
    return <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 accent-[#FD5900]" />;
  }
  if (Array.isArray(value)) return <ArrayEditor name={name} value={value} onChange={onChange} depth={depth} ctx={ctx} />;
  if (isObject(value)) return <ObjectEditor value={value} onChange={onChange} depth={depth + 1} ctx={ctx} />;
  return null;
}

const SEO_KEYS = ['title', 'metaTitle', 'metaDesc', 'noIndex'];

/** The whole page: SEO fields first, then each top-level part as a panel. */
export function PageFieldsEditor({ data, onChange, ctx }: { data: JsonObject; onChange: (v: JsonObject) => void; ctx: FieldEditorContext }) {
  const set = (k: string, v: Json) => onChange({ ...data, [k]: v });
  const entries = Object.entries(data).filter(([k, v]) => !HIDDEN_KEYS.has(k) && v !== null && v !== undefined);
  const seo = entries.filter(([k]) => SEO_KEYS.includes(k));
  const simple = entries.filter(([k, v]) => !SEO_KEYS.includes(k) && (typeof v !== 'object' || (Array.isArray(v) && isRichArray(v))));
  const groups = entries.filter(([k, v]) => !SEO_KEYS.includes(k) && typeof v === 'object' && !(Array.isArray(v) && isRichArray(v)));

  return (
    <div className="space-y-4">
      {(seo.length > 0 || simple.length > 0) && (
        <section className={`${ui.card} space-y-4`}>
          <h3 className="text-sm font-heading font-extrabold text-foreground">Page settings</h3>
          {[...seo, ...simple].map(([k, v]) => (
            <Field key={k} name={k} value={v} onChange={(nv) => set(k, nv)} depth={0} ctx={ctx} />
          ))}
        </section>
      )}
      {groups.map(([k, v]) => (
        <details key={k} className={`${ui.card} !p-0`} open={k === 'hero' || k === 'blocks' || groups.length <= 2}>
          <summary className="px-6 py-4 cursor-pointer select-none text-sm font-heading font-extrabold text-foreground list-none flex items-center justify-between">
            <span>{humanize(k)}</span>
            {Array.isArray(v) && <span className="text-xs font-bold text-muted-foreground">{v.length} items</span>}
          </summary>
          <div className="px-6 pb-6 border-t border-border pt-4">
            <ValueEditor name={k} value={v} onChange={(nv) => set(k, nv)} depth={0} ctx={ctx} />
          </div>
        </details>
      ))}
    </div>
  );
}
