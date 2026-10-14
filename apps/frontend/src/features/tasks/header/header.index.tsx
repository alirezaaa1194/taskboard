"use client";

import { Plus, Search } from "lucide-react";

function TasksPageHeaderComp({ onCreate, search, onSearchChange }: { onCreate: () => void; search: string; onSearchChange: (value: string) => void }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <button onClick={onCreate} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover">
        <Plus className="size-4" /> تسک جدید
      </button>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="جست‌وجو" className="field ps-9" />
      </div>
    </div>
  );
}

export default TasksPageHeaderComp;
