import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";

function DropdownComp({ value, onChange, options, rounded }: { value: string; onChange: (v: string) => void; options: string[]; rounded?: boolean }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <ListboxButton className={`field flex items-center justify-between gap-2 border border-border px-3 py-2 text-sm transition data-[open]:border-primary outline-0 ${rounded ? "rounded-full bg-surface" : "dark:bg-black/40  dark:hover:bg-black/20"}`}>
          {value}
          <ChevronDown className="size-4 transition data-[open]:rotate-180" />
        </ListboxButton>

        <Transition as={Fragment} enter="transition duration-150 ease-out" enterFrom="opacity-0 -translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition duration-100 ease-in" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 -translate-y-1 scale-95">
          <ListboxOptions anchor="bottom start" className="z-20 mt-1 w-44 origin-top rounded-md border border-border bg-surface p-1 shadow-md [--anchor-gap:4px]">
            {options.map((o) => (
              <ListboxOption key={o} value={o} as={Fragment}>
                {({ selected }) => <li className={`cursor-pointer rounded-md px-3 py-2 text-sm transition data-[focus]:bg-primary/10 ${selected ? "bg-primary/10 font-medium text-primary" : ""}`}>{o}</li>}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}

export default DropdownComp;
