"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Moon, Sun, Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { Logo } from "../logo";
import { HeaderLinks } from "./header.data";

function LayoutHeaderComp() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const nav = HeaderLinks.map((l) => {
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
          <button onClick={toggle} className="grid size-10 place-items-center rounded-md border border-border" aria-label="تغییر تم">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <span className="flex items-center gap-2 rounded-full border border-border py-1 pe-3 ps-1">
            <span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-bold text-white">س</span>
            <span className="hidden text-start sm:block">
              <span className="block text-sm font-semibold leading-4">سارا محمدی</span>
              <span className="text-[11px] text-muted">مالک</span>
            </span>
          </span>
        </div>
      </div>
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
  );
}

export default LayoutHeaderComp;
