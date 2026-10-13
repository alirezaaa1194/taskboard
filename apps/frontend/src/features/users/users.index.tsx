"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Fragment, useState } from "react";
import ConfirmDialogComp from "../../utilities/components/confirmDialog/confirmDialog.index";
import UserDialogComp, { UserFormData } from "./dialog/dialog.index";

const initialUsers: UserFormData[] = [
  { id: "1", name: "سارا محمدی", email: "sara@company.com", role: "مالک", active: true },
  { id: "2", name: "رضا کریمی", email: "reza@company.com", role: "مدیر", active: true },
  { id: "3", name: "مریم احمدی", email: "maryam@company.com", role: "عضو", active: true },
  { id: "4", name: "علی رضایی", email: "ali@company.com", role: "عضو", active: false },
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserFormData[]>(initialUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editing, setEditing] = useState<UserFormData | null>(null);

  // برای دیالوگ تایید حذف
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<UserFormData | null>(null);

  const openCreate = () => {
    setDialogMode("create");
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (user: UserFormData) => {
    setDialogMode("edit");
    setEditing(user);
    setDialogOpen(true);
  };

  const askDelete = (user: UserFormData) => {
    setPendingDelete(user);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!pendingDelete?.id) return;
    setUsers((prev) => prev.filter((u) => u.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const handleSubmit = (data: UserFormData) => {
    if (dialogMode === "create") {
      setUsers((prev) => [...prev, { ...data, id: String(Date.now()) }]);
    } else {
      setUsers((prev) => prev.map((u) => (u.id === data.id ? { ...u, ...data } : u)));
    }
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
        <input readOnly className="field ps-9" placeholder="جستجوی کاربر…" />
      </div>

      <div className="space-y-2">
        {users.map((u) => (
          <article key={u.id} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-3">
            <Menu as="div" className="relative">
              <MenuButton className="grid size-9 place-items-center rounded-md text-muted transition hover:bg-border/50 data-[open]:bg-border/50" aria-label="عملیات">
                <MoreHorizontal className="size-4" />
              </MenuButton>

              <Transition as={Fragment} enter="transition duration-150 ease-out" enterFrom="opacity-0 -translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition duration-100 ease-in" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 -translate-y-1 scale-95">
                <MenuItems className="absolute z-20 mt-1 w-40 origin-top rounded-md border border-border bg-surface p-1 shadow-md">
                  <MenuItem>
                    <button onClick={() => openEdit(u)} className="w-full rounded-md px-3 py-2 text-start text-sm data-[focus]:bg-border/50">
                      ویرایش
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={() => askDelete(u)} className="w-full rounded-md px-3 py-2 text-start text-sm text-prio-high data-[focus]:bg-prio-high/10">
                      حذف
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>

            <span className={`rounded-full px-2 py-1 text-xs ${u.active ? "bg-done/15 text-done" : "bg-prio-high/15 text-prio-high"}`}>{u.active ? "فعال" : "غیرفعال"}</span>

            <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
              <p className="truncate text-sm font-semibold">{u.name}</p>
              <p className="truncate text-xs text-muted" dir="ltr">
                {u.email}
              </p>
            </div>

            <span className="rounded-full bg-accent/10 px-2 py-1 text-xs text-accent">{u.role}</span>
          </article>
        ))}
      </div>

      <UserDialogComp open={dialogOpen} setOpen={setDialogOpen} mode={dialogMode} initial={editing} onSubmit={handleSubmit} />
      <ConfirmDialogComp open={confirmOpen} setOpen={setConfirmOpen} title="حذف کاربر" message={`آیا از حذف «${pendingDelete?.name ?? ""}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`} confirmLabel="حذف" cancelLabel="انصراف" variant="danger" onConfirm={confirmDelete} />
    </>
  );
}
