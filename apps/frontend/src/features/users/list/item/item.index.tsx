"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { MoreHorizontal } from "lucide-react";
import { Fragment, useState } from "react";
import ConfirmDialogComp from "@/utilities/components/confirmDialog/confirmDialog.index";
import { UserRoleEnum, type UserType } from "@/types/general";
import { useUserMutations } from "../../hooks/useUserMutation";
import { useUser } from "@/contexts/userContext";

const roleLabel: Record<UserRoleEnum, string> = {
  [UserRoleEnum.OWNER]: "مالک",
  [UserRoleEnum.MANAGER]: "مدیر",
  [UserRoleEnum.MEMBER]: "عضو",
};

const roleClass: Record<UserRoleEnum, string> = {
  [UserRoleEnum.OWNER]: "bg-accent/10 text-accent",
  [UserRoleEnum.MANAGER]: "bg-todo/15 text-todo",
  [UserRoleEnum.MEMBER]: "bg-border/50 text-muted",
};

function UserItemComp({ user, onEdit }: { user: UserType; onEdit: (user: UserType) => void }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { deleteUser } = useUserMutations();
  const currentUser = useUser();

  // The last active owner cannot be deleted.
  const isSelf = currentUser?.id === user.id;

  const handleDelete = () => {
    deleteUser.mutate(user.id, {
      onSuccess: () => setConfirmOpen(false),
    });
  };

  return (
    <>
      <article className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-3">
        <Menu as="div" className="relative">
          <MenuButton className="grid size-9 place-items-center rounded-md text-muted transition hover:bg-border/50 data-[open]:bg-border/50" aria-label="عملیات">
            <MoreHorizontal className="size-4" />
          </MenuButton>

          <Transition as={Fragment} enter="transition duration-150 ease-out" enterFrom="opacity-0 -translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition duration-100 ease-in" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 -translate-y-1 scale-95">
            <MenuItems anchor="bottom start" className="z-20 w-40 origin-top rounded-md border border-border bg-surface p-1 shadow-md [--anchor-gap:4px]">
              <MenuItem>
                <button onClick={() => onEdit(user)} className="w-full rounded-md px-3 py-2 text-start text-sm data-[focus]:bg-border/50">
                  ویرایش
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>

        <span className={`rounded-full px-2 py-1 text-xs ${user.isActive ? "bg-done/15 text-done" : "bg-prio-high/15 text-prio-high"}`}>{user.isActive ? "فعال" : "غیرفعال"}</span>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted" dir="ltr">
            {user.email}
          </p>
        </div>

        <span className={`rounded-full px-2 py-1 text-xs ${roleClass[user.role]}`}>{roleLabel[user.role]}</span>
      </article>

      <ConfirmDialogComp open={confirmOpen} setOpen={setConfirmOpen} title="حذف کاربر" message={`آیا از حذف «${user.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`} confirmLabel="حذف" cancelLabel="انصراف" variant="danger" onConfirm={handleDelete} />
    </>
  );
}

export default UserItemComp;
