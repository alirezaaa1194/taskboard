"use client";

import { Button, Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Moon, Sun, Menu as MenuIcon, X, User, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTheme } from "../../../hooks/useTheme";
import { Logo } from "../logo";
import { HeaderLinks } from "./header.data";
import { useUser } from "../../../contexts/userContext";
import { UserRoleEnum } from "../../../types/general";
import ConfirmDialogComp from "../confirmDialog/confirmDialog.index";
import { logoutUser } from "../../../lib/utils";

function LayoutHeaderComp() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const user = useUser();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("خروج موفق");
      router.push("/login");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error("خطا در خروج", {
        description: error?.message ?? "مشکلی پیش آمد",
      });
    },
  });

  const nav = HeaderLinks.filter((l) => user && l.roles.includes(user.role)).map((l) => {
    const Icon = l.icon;
    const active = path === l.href;
    return (
      <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${active ? "bg-primary/10 text-primary" : "text-muted hover:bg-border/60 hover:text-fg"}`}>
        <Icon className="size-4" />
        {l.label}
      </Link>
    );
  });

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <button className="grid size-10 place-items-center rounded-md border border-border md:hidden" onClick={() => setOpen(true)}>
            <MenuIcon className="size-5" />
          </button>

          <Link href="/tasks" className="flex items-center gap-2 font-bold">
            <Logo />
            <span className="hidden sm:inline">تسک‌بورد</span>
          </Link>

          <nav className="ms-6 hidden items-center gap-1 md:flex">{nav}</nav>

          <div className="ms-auto flex items-center gap-2">
            <Button onClick={toggle} className="grid size-10 place-items-center rounded-full border border-border" aria-label="تغییر تم">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 rounded-full border border-border py-1 pe-5 ps-1 transition hover:bg-border/40">
                <span className="grid size-8 place-items-center rounded-full bg-accent/10 text-accent">
                  <User className="size-4" />
                </span>
                <span className="hidden text-start sm:block">
                  <span className="block text-sm font-semibold leading-4">{user?.name}</span>
                  <span className="text-[11px] text-muted">{user?.role === UserRoleEnum.OWNER ? "مالک" : user?.role === UserRoleEnum.MANAGER ? "ادمین" : "کاربر"}</span>
                </span>
                <ChevronDown className="size-4 text-muted transition data-[open]:rotate-180" />
              </MenuButton>

              <Transition as={Fragment} enter="transition duration-150 ease-out" enterFrom="opacity-0 -translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition duration-100 ease-in" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 -translate-y-1 scale-95">
                <MenuItems anchor="bottom end" className="w-44 origin-top rounded-md border border-border bg-surface p-1 shadow-md [--anchor-gap:6px] z-50!">
                  <MenuItem>
                    <button onClick={() => setConfirmOpen(true)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-sm text-prio-high data-[focus]:bg-prio-high/10">
                      <LogOut className="size-4" />
                      خروج
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* Mobile Menu */}
        <Dialog open={open} onClose={setOpen} className="relative z-50 md:hidden">
          <div className="fixed inset-0 bg-black/40" />
          <DialogPanel className="fixed inset-y-0 start-0 w-72 border-s border-border bg-surface p-4">
            <div className="mb-4 flex items-center justify-end">
              <button onClick={() => setOpen(false)} aria-label="بستن">
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">{nav}</nav>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Confirm Logout Dialog */}
      <ConfirmDialogComp open={confirmOpen} setOpen={setConfirmOpen} title="خروج از حساب" message="آیا از خروج مطمئن هستید؟" confirmLabel="خروج" cancelLabel="انصراف" variant="danger" onConfirm={() => logoutMutation.mutate()} />
    </>
  );
}

export default LayoutHeaderComp;
