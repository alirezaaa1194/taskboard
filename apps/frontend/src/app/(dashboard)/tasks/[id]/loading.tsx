export default function TaskDetailSkeletonComp() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse">
      <div className="mb-4 h-5 w-20 rounded bg-fg/10" />

      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="mb-4 h-8 w-2/3 rounded bg-fg/10" />

        <div className="mb-6 flex gap-2">
          <div className="h-6 w-20 rounded-full bg-fg/10" />
          <div className="h-6 w-16 rounded-full bg-fg/10" />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i}>
              <div className="h-3 w-16 rounded bg-fg/5" />
              <div className="mt-2 h-4 w-28 rounded bg-fg/10" />
            </div>
          ))}
        </div>

        <div className="mb-3 h-5 w-24 rounded bg-fg/10" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-fg/5" />
          <div className="h-3 w-full rounded bg-fg/5" />
          <div className="h-3 w-4/5 rounded bg-fg/5" />
        </div>
      </div>
    </div>
  );
}
