import { useRef, useState } from 'react';
import {
  AlignLeft,
  ArrowDown,
  ArrowUp,
  Bold,
  Copy,
  FileCode2,
  Heading2,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  MousePointerClick,
  Plus,
  Quote,
  Table as TableIcon,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import type { RichNode } from '@/pages/crypto/types';
import type { ArticleBlock } from '@/pages/blog/blogPostsData';
import { cmsProvider } from '@/lib/cms/provider';
import {
  articleBlocksToMarkdown,
  markdownToArticleBlocks,
  markupToRichNodes,
  richNodesToMarkup,
} from '@/lib/cms/richTextCodec';

interface RichMarkupEditorProps {
  nodes: RichNode[];
  onChange: (nodes: RichNode[]) => void;
  placeholder?: string;
  rows?: number;
  singleLine?: boolean;
}

function RichMarkupEditor({
  nodes,
  onChange,
  placeholder,
  rows = 3,
  singleLine = false,
}: RichMarkupEditorProps) {
  const canonical = richNodesToMarkup(nodes);
  const [draft, setDraft] = useState(canonical);
  const [focused, setFocused] = useState(false);
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('/contact');
  const [linkText, setLinkText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const activeText = focused ? draft : canonical;

  const commitText = (next: string) => {
    const val = singleLine ? next.replace(/\n/g, ' ') : next;
    setDraft(val);
    onChange(markupToRichNodes(val));
  };

  const wrapSelection = (prefix: string, suffix: string, defaultLabel: string) => {
    const el = inputRef.current;
    const base = activeText;
    if (!el) {
      commitText(`${base}${prefix}${defaultLabel}${suffix}`);
      return;
    }
    const start = el.selectionStart ?? base.length;
    const end = el.selectionEnd ?? base.length;
    const selected = base.slice(start, end) || defaultLabel;
    const next = `${base.slice(0, start)}${prefix}${selected}${suffix}${base.slice(end)}`;
    setFocused(true);
    commitText(next);
    window.requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    });
  };

  const openLinkHelper = () => {
    const el = inputRef.current;
    if (el) {
      const selected = activeText.slice(el.selectionStart, el.selectionEnd);
      setLinkText(selected || 'Learn more');
    } else {
      setLinkText('Learn more');
    }
    setLinkPopoverOpen(true);
  };

  const applyLink = () => {
    const anchor = linkText.trim() || 'Link';
    const href = linkUrl.trim() || '/contact';
    const el = inputRef.current;
    const token = `[${anchor}](${href})`;
    if (el) {
      const start = el.selectionStart ?? activeText.length;
      const end = el.selectionEnd ?? activeText.length;
      const next = `${activeText.slice(0, start)}${token}${activeText.slice(end)}`;
      commitText(next);
    } else {
      commitText(`${activeText} ${token}`.trim());
    }
    setLinkPopoverOpen(false);
  };

  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden focus-within:border-[#0053C6] focus-within:ring-2 focus-within:ring-[#0053C6]/20 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 bg-muted/50 border-b border-border text-xs">
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Bold (**text**)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => wrapSelection('**', '**', 'bold text')}
            className="p-1.5 rounded-md hover:bg-card text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Italic (*text*)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => wrapSelection('*', '*', 'italic text')}
            className="p-1.5 rounded-md hover:bg-card text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Orange Highlight (==text==)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => wrapSelection('==', '==', 'highlighted')}
            className="p-1.5 rounded-md hover:bg-card text-muted-foreground hover:text-[#FD5900] cursor-pointer"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Insert Link ([text](/url))"
            onMouseDown={(e) => e.preventDefault()}
            onClick={openLinkHelper}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-card text-muted-foreground hover:text-[#0053C6] font-semibold cursor-pointer"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Link</span>
          </button>
        </div>
        <span className="text-[10px] text-muted-foreground hidden sm:inline">
          Supports **bold**, *italic*, ==accent==, [link](/url)
        </span>
      </div>

      {linkPopoverOpen && (
        <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border-b border-border flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Anchor text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground flex-1 min-w-[130px]"
          />
          <input
            type="text"
            placeholder="/service-slug or https://..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground flex-1 min-w-[160px]"
          />
          <button
            type="button"
            onClick={applyLink}
            className="px-3 py-1.5 rounded-lg bg-[#0053C6] text-white text-xs font-bold cursor-pointer"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={() => setLinkPopoverOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <textarea
        ref={inputRef}
        rows={singleLine ? 1 : rows}
        placeholder={placeholder}
        value={activeText}
        onFocus={() => {
          setDraft(canonical);
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
          setDraft(richNodesToMarkup(markupToRichNodes(activeText)));
        }}
        onChange={(e) => commitText(e.target.value)}
        className="w-full px-3.5 py-2.5 text-sm text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none resize-y leading-relaxed"
      />
    </div>
  );
}

interface AdminBlockEditorProps {
  blocks: ArticleBlock[];
  onChange: (blocks: ArticleBlock[]) => void;
  onRequestMediaPicker: (onPicked: (url: string) => void) => void;
}

const BLOCK_TYPES_PALETTE: Array<{
  type: ArticleBlock['type'] | 'numbered-list';
  label: string;
  icon: typeof Heading2;
}> = [
  { type: 'heading', label: 'Heading', icon: Heading2 },
  { type: 'paragraph', label: 'Paragraph', icon: AlignLeft },
  { type: 'list', label: 'Bullets', icon: List },
  { type: 'numbered-list', label: 'Numbered', icon: ListOrdered },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'blockquote', label: 'Quote', icon: Quote },
  { type: 'table', label: 'Table', icon: TableIcon },
  { type: 'cta', label: 'CTA Button', icon: MousePointerClick },
];

function createDefaultBlock(kind: ArticleBlock['type'] | 'numbered-list'): ArticleBlock {
  switch (kind) {
    case 'heading':
      return { type: 'heading', level: 2, text: '' };
    case 'paragraph':
      return { type: 'paragraph', content: [''] };
    case 'list':
      return { type: 'list', ordered: false, items: [['']] };
    case 'numbered-list':
      return { type: 'list', ordered: true, items: [['']] };
    case 'image':
      return { type: 'image', src: '', alt: '', caption: '' };
    case 'blockquote':
      return { type: 'blockquote', content: [''] };
    case 'table':
      return {
        type: 'table',
        headers: ['Feature', 'Details'],
        rows: [
          ['Item 1', 'Description'],
          ['Item 2', 'Description'],
        ],
      };
    case 'cta':
      return { type: 'cta', label: 'Book a Strategy Call', href: '/contact' };
  }
}

export function AdminBlockEditor({
  blocks,
  onChange,
  onRequestMediaPicker,
}: AdminBlockEditorProps) {
  const [markdownModalOpen, setMarkdownModalOpen] = useState(false);
  const [markdownBuffer, setMarkdownBuffer] = useState('');
  const [markdownMode, setMarkdownMode] = useState<'replace' | 'append'>('append');
  const [uploadingBlockIdx, setUploadingBlockIdx] = useState<number | null>(null);

  const updateBlock = (index: number, nextBlock: ArticleBlock) => {
    const next = [...blocks];
    next[index] = nextBlock;
    onChange(next);
  };

  const insertBlockAt = (
    insertIndex: number,
    kind: ArticleBlock['type'] | 'numbered-list'
  ) => {
    const next = [...blocks];
    next.splice(insertIndex, 0, createDefaultBlock(kind));
    onChange(next);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  };

  const duplicateBlock = (index: number) => {
    const next = [...blocks];
    next.splice(index + 1, 0, structuredClone(blocks[index]));
    onChange(next);
  };

  const removeBlock = (index: number) => {
    const next = blocks.filter((_, idx) => idx !== index);
    onChange(next.length > 0 ? next : [{ type: 'paragraph', content: [''] }]);
  };

  const handleInlineImageUpload = async (blockIdx: number, file: File | undefined) => {
    if (!file) return;
    setUploadingBlockIdx(blockIdx);
    try {
      const uploaded = await cmsProvider.uploadMedia(file);
      const current = blocks[blockIdx];
      if (current?.type === 'image') {
        updateBlock(blockIdx, {
          ...current,
          src: uploaded.url,
          alt: current.alt || file.name.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' '),
        });
      }
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setUploadingBlockIdx(null);
    }
  };

  const openMarkdownModal = () => {
    setMarkdownBuffer(articleBlocksToMarkdown(blocks));
    setMarkdownMode('replace');
    setMarkdownModalOpen(true);
  };

  const applyMarkdownImport = () => {
    const parsed = markdownToArticleBlocks(markdownBuffer);
    if (parsed.length === 0) {
      setMarkdownModalOpen(false);
      return;
    }
    if (markdownMode === 'replace') {
      onChange(parsed);
    } else {
      onChange([...blocks, ...parsed]);
    }
    setMarkdownModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Content Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
            Article Content Blocks ({blocks.length})
          </h3>
        </div>
        <button
          type="button"
          onClick={openMarkdownModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:border-[#0053C6] text-xs font-bold text-foreground transition-colors cursor-pointer"
        >
          <FileCode2 className="w-3.5 h-3.5 text-[#0053C6]" />
          <span>Markdown Import / Export</span>
        </button>
      </div>

      {/* Blocks Stack */}
      <div className="space-y-4">
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
          >
            {/* Block Chrome Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border/70">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-muted text-[11px] font-extrabold text-muted-foreground flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-foreground">
                  {block.type === 'list'
                    ? block.ordered
                      ? 'Numbered List'
                      : 'Bullet List'
                    : block.type}
                </span>

                {block.type === 'heading' && (
                  <div className="inline-flex rounded-lg bg-muted p-0.5 ml-2">
                    {([2, 3, 4] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => updateBlock(idx, { ...block, level: lvl })}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold cursor-pointer ${
                          block.level === lvl
                            ? 'bg-[#0053C6] text-white'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        H{lvl}
                      </button>
                    ))}
                  </div>
                )}

                {block.type === 'list' && (
                  <button
                    type="button"
                    onClick={() =>
                      updateBlock(idx, { ...block, ordered: !block.ordered })
                    }
                    className="ml-2 px-2.5 py-0.5 rounded-lg bg-muted hover:bg-border text-[11px] font-bold text-foreground cursor-pointer"
                  >
                    Switch to {block.ordered ? 'Bullets' : 'Numbered'}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveBlock(idx, -1)}
                  title="Move block up"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === blocks.length - 1}
                  onClick={() => moveBlock(idx, 1)}
                  title="Move block down"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => duplicateBlock(idx)}
                  title="Duplicate block"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(idx)}
                  title="Delete block"
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Block Body Editor */}
            {block.type === 'heading' && (
              <input
                type="text"
                placeholder={`Enter H${block.level} subheading...`}
                value={block.text}
                onChange={(e) => updateBlock(idx, { ...block, text: e.target.value })}
                className={`w-full rounded-xl border border-border bg-background px-4 py-2.5 font-heading font-extrabold text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6] ${
                  block.level === 2
                    ? 'text-lg sm:text-xl'
                    : block.level === 3
                      ? 'text-base sm:text-lg'
                      : 'text-sm sm:text-base'
                }`}
              />
            )}

            {block.type === 'paragraph' && (
              <RichMarkupEditor
                nodes={block.content}
                onChange={(content) => updateBlock(idx, { ...block, content })}
                placeholder="Write paragraph content..."
                rows={4}
              />
            )}

            {block.type === 'blockquote' && (
              <div className="border-l-4 border-[#FD5900] pl-3">
                <RichMarkupEditor
                  nodes={block.content}
                  onChange={(content) => updateBlock(idx, { ...block, content })}
                  placeholder="Enter key takeaway or pull-quote..."
                  rows={3}
                />
              </div>
            )}

            {block.type === 'list' && (
              <div className="space-y-2.5">
                {block.items.map((itemNodes, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-2">
                    <span className="mt-3 w-6 text-xs font-bold text-muted-foreground text-right shrink-0">
                      {block.ordered ? `${itemIdx + 1}.` : '•'}
                    </span>
                    <div className="flex-1">
                      <RichMarkupEditor
                        nodes={itemNodes}
                        onChange={(nextNodes) => {
                          const nextItems = [...block.items];
                          nextItems[itemIdx] = nextNodes;
                          updateBlock(idx, { ...block, items: nextItems });
                        }}
                        placeholder={`List item ${itemIdx + 1}...`}
                        singleLine
                      />
                    </div>
                    <button
                      type="button"
                      disabled={block.items.length <= 1}
                      onClick={() => {
                        const nextItems = block.items.filter((_, i) => i !== itemIdx);
                        updateBlock(idx, { ...block, items: nextItems });
                      }}
                      className="mt-2.5 p-1.5 rounded-lg text-muted-foreground hover:text-red-500 disabled:opacity-30 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateBlock(idx, { ...block, items: [...block.items, ['']] })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-border text-xs font-bold text-foreground cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add List Item</span>
                </button>
              </div>
            )}

            {block.type === 'image' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-5">
                  {block.src ? (
                    <div className="relative rounded-xl overflow-hidden border border-border bg-slate-900 aspect-[16/10]">
                      <img
                        src={block.src}
                        alt={block.alt || 'Preview'}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => updateBlock(idx, { ...block, src: '' })}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-white hover:bg-red-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 aspect-[16/10] flex flex-col items-center justify-center p-4 text-center gap-2">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">No image selected</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    <label className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white text-xs font-bold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>
                        {uploadingBlockIdx === idx ? 'Uploading…' : 'Upload File'}
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                        className="hidden"
                        onChange={(e) =>
                          void handleInlineImageUpload(idx, e.target.files?.[0])
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        onRequestMediaPicker((url) =>
                          updateBlock(idx, { ...block, src: url })
                        )
                      }
                      className="flex-1 px-3 py-2 rounded-xl border border-border bg-background hover:border-[#0053C6] text-xs font-bold text-foreground cursor-pointer"
                    >
                      Media Library
                    </button>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="/uploads/blog/... or https://..."
                      value={block.src}
                      onChange={(e) =>
                        updateBlock(idx, { ...block, src: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      SEO Alt Text
                    </label>
                    <input
                      type="text"
                      placeholder="Describe the visual for accessibility & Google Images..."
                      value={block.alt}
                      onChange={(e) =>
                        updateBlock(idx, { ...block, alt: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Optional Caption
                    </label>
                    <input
                      type="text"
                      placeholder="Optional caption shown below the image..."
                      value={block.caption || ''}
                      onChange={(e) =>
                        updateBlock(idx, {
                          ...block,
                          caption: e.target.value || undefined,
                        })
                      }
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {block.type === 'table' && (
              <div className="space-y-3 overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr>
                      {block.headers.map((header, colIdx) => (
                        <th key={colIdx} className="p-1 bg-slate-900 first:rounded-tl-xl last:rounded-tr-xl">
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={header}
                              placeholder={`Column ${colIdx + 1}`}
                              onChange={(e) => {
                                const nextHeaders = [...block.headers];
                                nextHeaders[colIdx] = e.target.value;
                                updateBlock(idx, { ...block, headers: nextHeaders });
                              }}
                              className="w-full bg-slate-800 text-white font-bold px-2.5 py-1.5 rounded-lg focus:outline-none"
                            />
                            {block.headers.length > 1 && (
                              <button
                                type="button"
                                title="Remove column"
                                onClick={() => {
                                  const nextHeaders = block.headers.filter(
                                    (_, i) => i !== colIdx
                                  );
                                  const nextRows = block.rows.map((r) =>
                                    r.filter((_, i) => i !== colIdx)
                                  );
                                  updateBlock(idx, {
                                    ...block,
                                    headers: nextHeaders,
                                    rows: nextRows,
                                  });
                                }}
                                className="p-1 text-slate-400 hover:text-red-400 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {block.headers.map((_, colIdx) => (
                          <td key={colIdx} className="p-1 border-b border-border">
                            <input
                              type="text"
                              value={row[colIdx] ?? ''}
                              placeholder="Cell value..."
                              onChange={(e) => {
                                const nextRows = block.rows.map((r, rI) => {
                                  if (rI !== rowIdx) return r;
                                  const copy = Array.from(
                                    { length: block.headers.length },
                                    (__, cI) => r[cI] ?? ''
                                  );
                                  copy[colIdx] = e.target.value;
                                  return copy;
                                });
                                updateBlock(idx, { ...block, rows: nextRows });
                              }}
                              className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-foreground"
                            />
                          </td>
                        ))}
                        <td className="p-1 text-center">
                          {block.rows.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const nextRows = block.rows.filter((_, i) => i !== rowIdx);
                                updateBlock(idx, { ...block, rows: nextRows });
                              }}
                              className="p-1 text-muted-foreground hover:text-red-500 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateBlock(idx, {
                        ...block,
                        rows: [
                          ...block.rows,
                          Array.from({ length: block.headers.length }, () => ''),
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted hover:bg-border text-xs font-bold text-foreground cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Row</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateBlock(idx, {
                        ...block,
                        headers: [...block.headers, `Column ${block.headers.length + 1}`],
                        rows: block.rows.map((r) => [...r, '']),
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted hover:bg-border text-xs font-bold text-foreground cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Column</span>
                  </button>
                </div>
              </div>
            )}

            {block.type === 'cta' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={block.label}
                    placeholder="Get a Free Consultation"
                    onChange={(e) =>
                      updateBlock(idx, { ...block, label: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Destination URL / Route
                  </label>
                  <input
                    type="text"
                    value={block.href}
                    placeholder="/contact or #lead-capture or https://..."
                    onChange={(e) =>
                      updateBlock(idx, { ...block, href: e.target.value })
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground"
                  />
                </div>
              </div>
            )}

            {/* Quick Insert Below Row */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
                + Insert below:
              </span>
              {BLOCK_TYPES_PALETTE.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => insertBlockAt(idx + 1, item.type)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-muted/70 hover:bg-[#0053C6] hover:text-white text-[11px] font-semibold text-muted-foreground transition-colors cursor-pointer"
                  >
                    <Icon className="w-3 h-3" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Add Block Palette */}
      <div className="rounded-2xl border-2 border-dashed border-border p-4 bg-muted/25">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 text-center">
          Append New Content Block
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {BLOCK_TYPES_PALETTE.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => insertBlockAt(blocks.length, item.type)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card hover:border-[#FD5900] hover:text-[#FD5900] text-xs font-bold text-foreground shadow-2xs transition-all cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Markdown Import / Export Modal */}
      {markdownModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-background border border-border shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-heading font-extrabold text-foreground">
                  Markdown Article Importer &amp; Exporter
                </h3>
                <p className="text-xs text-muted-foreground">
                  Paste Markdown (`## Heading`, `- bullets`, `1. numbered`, `&gt; quote`,
                  `![alt](url)`, `| Table |`, `[CTA: Label](/contact)`) to convert directly into Eon8 blocks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMarkdownModalOpen(false)}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="inline-flex rounded-xl bg-muted p-1 gap-1">
              <button
                type="button"
                onClick={() => setMarkdownMode('replace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  markdownMode === 'replace'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground'
                }`}
              >
                Replace Existing Blocks
              </button>
              <button
                type="button"
                onClick={() => {
                  if (markdownMode === 'replace') setMarkdownBuffer('');
                  setMarkdownMode('append');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  markdownMode === 'append'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground'
                }`}
              >
                Append to Bottom
              </button>
            </div>

            <textarea
              rows={14}
              value={markdownBuffer}
              onChange={(e) => setMarkdownBuffer(e.target.value)}
              placeholder="## Subheading&#10;&#10;Paste your Markdown draft here..."
              className="w-full rounded-xl border border-border bg-card p-4 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setMarkdownModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-foreground cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyMarkdownImport}
                className="px-5 py-2 rounded-xl bg-[#FD5900] hover:bg-[#e55000] text-white text-xs font-bold cursor-pointer"
              >
                Apply to Block Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
