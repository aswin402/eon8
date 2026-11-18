import type { RichNode } from '@/pages/crypto/types';
import type { ArticleBlock } from '@/pages/blog/blogPostsData';
import type { BlogSeoMeta } from './types';

export function slugifyText(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

export function todayIsoDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDisplayDate(dateIso: string): string {
  if (!dateIso) {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  const parts = dateIso.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) {
    return dateIso;
  }
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function richNodesToMarkup(nodes: RichNode[]): string {
  if (!nodes || nodes.length === 0) return '';
  return nodes
    .map((node) => {
      if (typeof node === 'string') return node;
      if (node.br) return '\n';
      const text = node.text ?? '';
      if (!text) return '';
      if (node.href) {
        if (node.strong) {
          return `[**${text}**](${node.href})`;
        }
        return `[${text}](${node.href})`;
      }
      if (node.strong) return `**${text}**`;
      if (node.em) return `*${text}*`;
      if (node.accent) return `==${text}==`;
      return text;
    })
    .join('');
}

const INLINE_TOKEN_REGEX =
  /(\[\*\*([^[\]]+?)\*\*\]\(([^()\s]+)\)|\[([^[\]]+?)\]\(([^()\s]+)\)|\*\*([^*]+?)\*\*|==([^=]+?)==|\*([^*\n]+?)\*)/g;

function parseSingleLineToRichNodes(line: string): RichNode[] {
  if (!line) return [];
  const result: RichNode[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(INLINE_TOKEN_REGEX)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) {
      result.push(line.slice(lastIndex, matchIndex));
    }

    if (match[2] !== undefined && match[3] !== undefined) {
      result.push({ text: match[2], href: match[3], strong: true });
    } else if (match[4] !== undefined && match[5] !== undefined) {
      result.push({ text: match[4], href: match[5] });
    } else if (match[6] !== undefined) {
      result.push({ text: match[6], strong: true });
    } else if (match[7] !== undefined) {
      result.push({ text: match[7], accent: true });
    } else if (match[8] !== undefined) {
      result.push({ text: match[8], em: true });
    }

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < line.length) {
    result.push(line.slice(lastIndex));
  }

  return result;
}

export function markupToRichNodes(markup: string): RichNode[] {
  if (!markup) return [''];
  const lines = markup.split('\n');
  const nodes: RichNode[] = [];
  lines.forEach((line, idx) => {
    if (idx > 0) {
      nodes.push({ br: true });
    }
    const parsed = parseSingleLineToRichNodes(line);
    nodes.push(...parsed);
  });
  return nodes.length > 0 ? nodes : [''];
}

export function richNodesToPlainText(nodes: RichNode[]): string {
  return nodes
    .map((node) => {
      if (typeof node === 'string') return node;
      if (node.br) return ' ';
      return node.text ?? '';
    })
    .join('');
}

export function computeWordCountAndReadTime(
  title: string,
  excerpt: string,
  blocks: ArticleBlock[]
): { words: number; readTime: string } {
  const chunks: string[] = [title, excerpt];
  for (const block of blocks) {
    switch (block.type) {
      case 'heading':
        chunks.push(block.text);
        break;
      case 'paragraph':
      case 'blockquote':
        chunks.push(richNodesToPlainText(block.content));
        break;
      case 'list':
        for (const item of block.items) {
          chunks.push(richNodesToPlainText(item));
        }
        break;
      case 'table':
        chunks.push(block.headers.join(' '));
        for (const row of block.rows) {
          chunks.push(row.join(' '));
        }
        break;
      case 'image':
        if (block.caption) chunks.push(block.caption);
        break;
      case 'cta':
        chunks.push(block.label);
        break;
    }
  }

  const combined = chunks.join(' ').trim();
  const words = combined ? combined.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.round(words / 210));
  return {
    words,
    readTime: `${minutes} min read`,
  };
}

export function articleBlocksToMarkdown(blocks: ArticleBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `${'#'.repeat(block.level)} ${block.text}`;
        case 'paragraph':
          return richNodesToMarkup(block.content);
        case 'blockquote':
          return richNodesToMarkup(block.content)
            .split('\n')
            .map((line) => `> ${line}`)
            .join('\n');
        case 'list':
          return block.items
            .map((item, i) =>
              block.ordered
                ? `${i + 1}. ${richNodesToMarkup(item)}`
                : `- ${richNodesToMarkup(item)}`
            )
            .join('\n');
        case 'image':
          return block.caption
            ? `![${block.alt}](${block.src} "${block.caption}")`
            : `![${block.alt}](${block.src})`;
        case 'table': {
          const cols = Math.max(
            block.headers.length,
            ...block.rows.map((r) => r.length),
            1
          );
          const headerCells = Array.from({ length: cols }, (_, i) => block.headers[i] ?? '');
          const divider = Array.from({ length: cols }, () => '---');
          const lines = [
            `| ${headerCells.join(' | ')} |`,
            `| ${divider.join(' | ')} |`,
            ...block.rows.map((r) => {
              const cells = Array.from({ length: cols }, (_, i) => r[i] ?? '');
              return `| ${cells.join(' | ')} |`;
            }),
          ];
          return lines.join('\n');
        }
        case 'cta':
          return `[CTA: ${block.label}](${block.href})`;
      }
    })
    .join('\n\n');
}

export function markdownToArticleBlocks(markdown: string): ArticleBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: ArticleBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Heading (#, ##, ###, ####)
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const hashes = headingMatch[1].length;
      const level: 2 | 3 | 4 = hashes <= 2 ? 2 : hashes === 3 ? 3 : 4;
      blocks.push({ type: 'heading', level, text: headingMatch[2].trim() });
      i++;
      continue;
    }

    // CTA syntax: [CTA: Label](/href)
    const ctaMatch = trimmed.match(/^\[CTA:\s*(.+?)\]\((.+?)\)$/i);
    if (ctaMatch) {
      blocks.push({ type: 'cta', label: ctaMatch[1].trim(), href: ctaMatch[2].trim() });
      i++;
      continue;
    }

    // Image syntax: ![alt](src "caption") or ![alt](src)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^\s")]+)(?:\s+"([^"]*)")?\)$/);
    if (imgMatch) {
      blocks.push({
        type: 'image',
        alt: imgMatch[1].trim() || 'Article illustration',
        src: imgMatch[2].trim(),
        caption: imgMatch[3]?.trim() || undefined,
      });
      i++;
      continue;
    }

    // Markdown table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const parseRow = (line: string) =>
        line
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((cell) => cell.trim());

      if (tableLines.length >= 1) {
        const headers = parseRow(tableLines[0]);
        const bodyStart =
          tableLines[1] && /^[\s|:-]+$/.test(tableLines[1]) ? 2 : 1;
        const rows = tableLines.slice(bodyStart).map(parseRow);
        blocks.push({ type: 'table', headers, rows });
      }
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        content: markupToRichNodes(quoteLines.join('\n')),
      });
      continue;
    }

    // Unordered list
    if (/^[-*+]\s+/.test(trimmed)) {
      const items: RichNode[][] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(markupToRichNodes(lines[i].trim().replace(/^[-*+]\s+/, '')));
        i++;
      }
      blocks.push({ type: 'list', ordered: false, items });
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: RichNode[][] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(markupToRichNodes(lines[i].trim().replace(/^\d+[.)]\s+/, '')));
        i++;
      }
      blocks.push({ type: 'list', ordered: true, items });
      continue;
    }

    // Paragraph (coalesce contiguous plain lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,4}\s+|[-*+]\s+|\d+[.)]\s+|>\s?|!\[|\[CTA:|\|)/i.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push({
      type: 'paragraph',
      content: markupToRichNodes(paraLines.join(' ')),
    });
  }

  return blocks;
}

export interface SeoCheckResult {
  id: string;
  label: string;
  passed: boolean;
  hint: string;
}

export function evaluatePostSeo(params: {
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  seo?: BlogSeoMeta;
  blocks: ArticleBlock[];
  words: number;
}): { score: number; checks: SeoCheckResult[] } {
  const effectiveTitle = (params.seo?.metaTitle || params.title).trim();
  const effectiveDesc = (params.seo?.metaDescription || params.excerpt).trim();
  const hasH2 = params.blocks.some((b) => b.type === 'heading' && b.level === 2);
  const hasLinks = params.blocks.some((b) => {
    if (b.type === 'paragraph' || b.type === 'blockquote') {
      return b.content.some((n) => typeof n !== 'string' && Boolean(n.href));
    }
    if (b.type === 'list') {
      return b.items.some((item) => item.some((n) => typeof n !== 'string' && Boolean(n.href)));
    }
    return b.type === 'cta';
  });
  const hasVisual =
    Boolean(params.thumbnail.trim()) || params.blocks.some((b) => b.type === 'image');

  const checks: SeoCheckResult[] = [
    {
      id: 'title-len',
      label: 'SEO Title length (35–65 chars)',
      passed: effectiveTitle.length >= 35 && effectiveTitle.length <= 65,
      hint: `Currently ${effectiveTitle.length} chars`,
    },
    {
      id: 'desc-len',
      label: 'Meta Description length (110–165 chars)',
      passed: effectiveDesc.length >= 110 && effectiveDesc.length <= 165,
      hint: `Currently ${effectiveDesc.length} chars`,
    },
    {
      id: 'slug-clean',
      label: 'Clean URL slug (3–75 chars, lowercase)',
      passed:
        params.slug.length >= 3 &&
        params.slug.length <= 75 &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(params.slug),
      hint: `/blog/${params.slug || '...'}`,
    },
    {
      id: 'h2-structure',
      label: 'Includes structured H2 subheadings',
      passed: hasH2,
      hint: hasH2 ? 'H2 sections detected' : 'Add at least one H2 heading block',
    },
    {
      id: 'word-depth',
      label: 'In-depth content (300+ words)',
      passed: params.words >= 300,
      hint: `${params.words} words written`,
    },
    {
      id: 'internal-links',
      label: 'Contains internal link or CTA block',
      passed: hasLinks,
      hint: hasLinks ? 'Contextual links present' : 'Add a service link or CTA button',
    },
    {
      id: 'cover-visual',
      label: 'Featured cover or article visual set',
      passed: hasVisual,
      hint: hasVisual ? 'Thumbnail/image configured' : 'Upload or pick a cover image',
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);
  return { score, checks };
}
