import { useCallback, useEffect, useRef, useState, type DragEvent } from 'react';
import {
  Check,
  Copy,
  ImagePlus,
  Link2,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { cmsProvider } from '@/lib/cms/provider';
import type { CmsMediaItem } from '@/lib/cms/types';

interface AdminMediaLibraryProps {
  mode: 'page' | 'modal';
  onSelect?: (url: string) => void;
  onClose?: () => void;
}

export function AdminMediaLibrary({ mode, onSelect, onClose }: AdminMediaLibraryProps) {
  const [items, setItems] = useState<CmsMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState('');
  const [folderFilter, setFolderFilter] = useState<'all' | 'uploaded' | 'site-library'>('all');
  const [externalUrl, setExternalUrl] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchMedia = useCallback(async (search: string) => {
    setLoading(true);
    setError(null);
    try {
      const list = await cmsProvider.listMedia(search);
      setItems(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load media library');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchMedia(query);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [query, fetchMedia]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      let lastUploaded: CmsMediaItem | null = null;
      for (const file of Array.from(files)) {
        const uploaded = await cmsProvider.uploadMedia(file);
        lastUploaded = uploaded;
        setItems((prev) => [uploaded, ...prev]);
      }
      if (mode === 'modal' && lastUploaded && onSelect) {
        onSelect(lastUploaded.url);
        onClose?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    void handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (url: string) => {
    if (!window.confirm('Delete this uploaded image permanently?')) return;
    try {
      await cmsProvider.deleteMedia(url);
      setItems((prev) => prev.filter((m) => m.url !== url));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      window.setTimeout(() => setCopiedUrl(null), 1800);
    } catch {
      // Ignore clipboard failures
    }
  };

  const visibleItems = items.filter((item) =>
    folderFilter === 'all' ? true : item.folder === folderFilter
  );

  const content = (
    <div className="space-y-6">
      {/* Header if Modal */}
      {mode === 'modal' && (
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-lg font-heading font-extrabold text-foreground">
              Select or Upload Media
            </h3>
            <p className="text-xs text-muted-foreground">
              Upload a new image or pick an existing asset from Eon8’s media library.
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300 font-medium">
          {error}
        </div>
      )}

      {/* Upload Dropzone + External URL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`lg:col-span-7 rounded-2xl border-2 border-dashed p-6 transition-all cursor-pointer flex items-center gap-4 ${
            dragOver
              ? 'border-[#FD5900] bg-[#FD5900]/8'
              : 'border-border hover:border-[#0053C6] bg-muted/35'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple={mode === 'page'}
            className="hidden"
            onChange={(e) => void handleFiles(e.target.files)}
          />
          <div className="w-12 h-12 rounded-2xl bg-[#FD5900]/12 text-[#FD5900] flex items-center justify-center shrink-0">
            {uploading ? (
              <span className="w-5 h-5 border-2 border-[#FD5900] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-heading font-bold text-foreground">
              {uploading
                ? 'Uploading image…'
                : 'Drop image here or click to upload from your computer'}
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, WEBP, GIF, AVIF up to 8 MB • Stored in /uploads/blog/
            </p>
          </div>
        </div>

        {mode === 'modal' && onSelect ? (
          <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 flex flex-col justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Link2 className="w-3.5 h-3.5 text-[#0053C6]" />
              <span>Or Use Direct Image URL</span>
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://... or /wp-content/..."
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
              />
              <button
                type="button"
                disabled={!externalUrl.trim()}
                onClick={() => {
                  onSelect(externalUrl.trim());
                  onClose?.();
                }}
                className="px-4 py-2 rounded-xl bg-[#0053C6] text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                Use URL
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 flex flex-col justify-center space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Media Overview
            </p>
            <p className="text-2xl font-heading font-extrabold text-foreground">
              {items.filter((i) => i.folder === 'uploaded').length}{' '}
              <span className="text-sm font-normal text-muted-foreground">
                custom uploads • {items.filter((i) => i.folder === 'site-library').length} indexed site assets
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="inline-flex rounded-xl bg-muted p-1 gap-1 self-start">
          {(
            [
              ['all', 'All Assets'],
              ['uploaded', 'Custom Uploads'],
              ['site-library', 'Site Media'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFolderFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                folderFilter === key
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search filename (e.g. seo, ai, erp)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-10 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#0053C6]"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-16 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-[#FD5900] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : visibleItems.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-14 text-center space-y-2">
          <ImagePlus className="w-8 h-8 text-muted-foreground mx-auto" />
          <p className="text-sm font-bold text-foreground">No matching images found</p>
          <p className="text-xs text-muted-foreground">
            Upload a new image above or clear your search filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[52vh] overflow-y-auto pr-1">
          {visibleItems.map((item) => (
            <div
              key={item.url}
              className="group relative rounded-xl border border-border bg-card overflow-hidden flex flex-col justify-between hover:border-[#FD5900] transition-all"
            >
              <div className="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {item.folder === 'uploaded' && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#FD5900] text-white text-[10px] font-bold">
                    Uploaded
                  </span>
                )}
              </div>

              <div className="p-2.5 space-y-2">
                <p className="text-[11px] font-medium text-foreground truncate" title={item.name}>
                  {item.name}
                </p>

                <div className="flex items-center gap-1.5">
                  {mode === 'modal' && onSelect ? (
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(item.url);
                        onClose?.();
                      }}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#FD5900] hover:bg-[#e55000] text-white text-[11px] font-bold cursor-pointer"
                    >
                      Select
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void handleCopy(item.url)}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-muted hover:bg-border text-foreground text-[11px] font-bold cursor-pointer"
                    >
                      {copiedUrl === item.url ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                  )}

                  {item.folder === 'uploaded' && (
                    <button
                      type="button"
                      onClick={() => void handleDelete(item.url)}
                      title="Delete uploaded image"
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (mode === 'modal') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="w-full max-w-5xl rounded-2xl bg-background border border-border shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
