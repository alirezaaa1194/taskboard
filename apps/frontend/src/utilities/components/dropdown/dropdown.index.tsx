"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { Fragment } from "react";

export interface DropdownOption<T> {
  value: T;
  label: string;
}

interface DropdownCompProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  rounded?: boolean;
  placeholder?: string;
}

export default function DropdownComp<T extends string | number | null | undefined>({ value, onChange, options, rounded, placeholder = "انتخاب کنید" }: DropdownCompProps<T>) {
  const selected = options.find((o) => o.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <ListboxButton className={`field flex items-center justify-between gap-2 ${rounded ? "rounded-full" : ""}`}>
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <ChevronDown className="size-4 transition data-[open]:rotate-180" />
        </ListboxButton>

        <Transition as={Fragment} enter="transition duration-150 ease-out" enterFrom="opacity-0 -translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition duration-100 ease-in" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 -translate-y-1 scale-95">
          <ListboxOptions anchor="bottom start" className="z-30 w-[var(--button-width)] origin-top rounded-md border border-border bg-surface p-1 shadow-md [--anchor-gap:4px]">
            {options.map((o, i) => (
              <ListboxOption key={String(o.value) + i} value={o.value} as={Fragment}>
                {({ selected }) => (
                  <li className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition data-[focus]:bg-primary/10 ${selected ? "bg-primary/10 font-medium text-primary" : ""}`}>
                    <span>{o.label}</span>
                    {selected && <Check className="size-4" />}
                  </li>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
