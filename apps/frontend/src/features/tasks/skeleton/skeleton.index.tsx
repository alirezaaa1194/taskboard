function TasksListSkeletonComp() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-surface p-4">
          <div className="mb-3 flex items-start gap-2">
            <div className="size-8 rounded-md bg-fg/10" />
            <div className="h-5 w-40 rounded bg-fg/10" />
          </div>
          <div className="mb-4 space-y-2">
            <div className="h-3 w-full rounded bg-fg/5" />
            <div className="h-3 w-4/5 rounded bg-fg/5" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 rounded-full bg-fg/10" />
            <div className="h-6 w-14 rounded-full bg-fg/10" />
            <div className="ms-auto h-3 w-16 rounded bg-fg/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksListSkeletonComp;
