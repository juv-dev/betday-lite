export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-9 w-48 animate-pulse rounded-lg bg-surface-hover" />
        <div className="mt-2 h-5 w-72 animate-pulse rounded bg-surface-hover" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-surface" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-surface" />
        ))}
      </div>
    </div>
  );
}
