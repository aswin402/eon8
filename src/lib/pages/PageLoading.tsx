/** Shown for a moment while a page checks for an edited version. */
export function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#FD5900] border-t-transparent" />
    </div>
  );
}
