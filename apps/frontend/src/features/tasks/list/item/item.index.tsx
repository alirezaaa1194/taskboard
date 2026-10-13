"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { MoreHorizontal } from "lucide-react";
import { Fragment } from "react";

function TasksItemComp() {
  return (
    <article className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="mb-2 flex items-start gap-2">
        <Menu as="div" className="relative">
          <MenuButton className="grid size-8 place-items-center rounded-md text-muted transition hover:bg-border/50" aria-label="عملیات">
            <MoreHorizontal className="size-4" />
          </MenuButton>
          <Transition as={Fragment} enter="transition duration-150 ease-out" enterFrom="opacity-0 -translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition duration-100 ease-in" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 -translate-y-1 scale-95">
            <MenuItems className="absolute z-20 mt-1 w-36 origin-top rounded-md border border-border bg-surface p-1 shadow-md">
              <MenuItem>
                <button className="w-full rounded-md px-3 py-2 text-start text-sm data-[focus]:bg-border/50">جزئیات</button>
              </MenuItem>
              <MenuItem>
                <button className="w-full rounded-md px-3 py-2 text-start text-sm data-[focus]:bg-border/50">ویرایش</button>
              </MenuItem>
              <MenuItem>
                <button className="w-full rounded-md px-3 py-2 text-start text-sm text-prio-high data-[focus]:bg-prio-high/10">حذف</button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
        <h2 className="font-semibold">رفع باگ ورود</h2>
      </div>
      <p className="mb-3 text-sm text-muted">رفع باگ ورود بعد از تغییرات امنیتی.</p>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-todo/15 px-2 py-1 text-todo">انجام نشده</span>
        <span className="rounded-full bg-prio-high/15 px-2 py-1 text-prio-high">بالا</span>
        <span className="ms-auto text-muted">۲۶ مهر</span>
        <span className="text-muted">رضا کریمی</span>
      </div>
    </article>
  );
}

export default TasksItemComp;
