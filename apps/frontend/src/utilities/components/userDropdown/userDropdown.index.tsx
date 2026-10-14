"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Check, ChevronDown, User } from "lucide-react";
import { Fragment, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usersInfiniteOptions } from "../../../features/users/users.script";

interface UserDropdownProps {
  value: number | null;
  onChange: (userId: number | null) => void;
  placeholder?: string;
  includeNone?: boolean;
  noneLabel?: string;
}

export default function UserDropdownComp({ value, onChange, placeholder = "انتخاب مسئول", includeNone = true, noneLabel = "بدون مسئول" }: UserDropdownProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery(usersInfiniteOptions());

  const users = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const selectedUser = users.find((u) => u.id === value);
  const displayLabel = value === null && includeNone ? noneLabel : (selectedUser?.name ?? placeholder);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <ListboxButton className="field flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <User className="size-4 text-muted" />
            <span className="truncate">{displayLabel}</span>
          </span>
          <ChevronDown className="size-4 transition data-[open]:rotate-180" />
        </ListboxButton>

        <Transition as={Fragment} enter="transition duration-150 ease-out" enterFrom="opacity-0 -translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition duration-100 ease-in" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 -translate-y-1 scale-95">
          <ListboxOptions anchor="bottom start" className="z-30 max-h-60 w-[var(--button-width)] origin-top overflow-y-auto rounded-md border border-border bg-surface p-1 shadow-md [--anchor-gap:4px]">
            {includeNone && (
              <ListboxOption value={null} as={Fragment}>
                {({ selected }) => (
                  <li className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition data-[focus]:bg-primary/10 ${selected ? "bg-primary/10 font-medium text-primary" : ""}`}>
                    <span>{noneLabel}</span>
                    {selected && <Check className="size-4" />}
                  </li>
                )}
              </ListboxOption>
            )}

            {isPending && <li className="px-3 py-2 text-sm text-muted">در حال بارگذاری...</li>}

            {users.map((user) => (
              <ListboxOption key={user.id} value={user.id} as={Fragment}>
                {({ selected }) => (
                  <li className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition data-[focus]:bg-primary/10 ${selected ? "bg-primary/10 font-medium text-primary" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">{user.name.charAt(0)}</span>
                      <span className="truncate">{user.name}</span>
                    </div>
                    {selected && <Check className="size-4" />}
                  </li>
                )}
              </ListboxOption>
            ))}

            {/* Trigger برای infinite scroll */}
            <div ref={loadMoreRef} className="h-1" />

            {isFetchingNextPage && <li className="px-3 py-2 text-center text-xs text-muted">در حال بارگذاری...</li>}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
