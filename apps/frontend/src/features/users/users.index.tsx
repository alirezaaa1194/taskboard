"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import UserDialogComp from "./dialog/dialog.index";
import UsersListComp from "./list/list.index";
import type { UserType } from "@/types/general";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { UsersFiltersType } from "./users.script";

export default function UsersPageComp() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  const filters: UsersFiltersType = {
    search: debouncedSearch || undefined,
  };

  const openCreate = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const openEdit = (user: UserType) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <h1 className="text-xl font-bold">کاربران</h1>
        <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover sm:ms-auto">
          <Plus className="size-4" /> کاربر جدید
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="field ps-9" placeholder="جستجوی کاربر…" />
      </div>
      <UsersListComp filters={filters} onEdit={openEdit} />
      <UserDialogComp open={dialogOpen} setOpen={setDialogOpen} mode={editingUser ? "edit" : "create"} initial={editingUser} />
    </>
  );
}
