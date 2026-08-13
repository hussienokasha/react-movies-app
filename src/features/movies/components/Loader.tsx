export function Loader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </div>
  );
}