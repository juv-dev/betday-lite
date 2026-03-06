export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-56 animate-pulse rounded-lg bg-surface-hover" />
      <div className="space-y-4 pl-10 md:pl-16">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-16 animate-pulse rounded-lg bg-surface-hover" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-52 animate-pulse rounded-2xl bg-surface" />
              <div className="h-52 animate-pulse rounded-2xl bg-surface" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
