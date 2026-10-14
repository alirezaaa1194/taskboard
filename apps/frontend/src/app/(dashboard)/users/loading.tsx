export default function UsersPageSkeletonComp() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="h-7 w-24 rounded-md bg-fg/10" />
        <div className="h-10 w-32 rounded-full bg-fg/10 sm:ms-auto" />
      </div>

      <div className="mb-4 h-11 w-full rounded-md bg-fg/10" />

      <div className="space-y-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-3">
            <div className="size-9 rounded-md bg-fg/10" />
            <div className="h-6 w-14 rounded-full bg-fg/10" />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <div className="h-4 w-32 rounded bg-fg/10" />
              <div className="h-3 w-44 rounded bg-fg/5" />
            </div>
            <div className="h-6 w-14 rounded-full bg-fg/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
