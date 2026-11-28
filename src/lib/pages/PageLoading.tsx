/**
 * Shown for a moment while a page loads its content. Full screen height, so the footer stays
 * below the fold until the content arrives (otherwise it jumps away: layout shift).
 */
export function PageLoading() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-background">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#FD5900] border-t-transparent" />
    </div>
  );
}
