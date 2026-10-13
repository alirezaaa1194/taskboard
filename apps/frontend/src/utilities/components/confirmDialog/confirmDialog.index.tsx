"use client";

import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { AlertTriangle } from "lucide-react";
import { Fragment } from "react";

interface ConfirmDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: "danger" | "primary";
}

export default function ConfirmDialogComp({ open, setOpen, title = "تایید عملیات", message, confirmLabel = "تایید", cancelLabel = "انصراف", onConfirm, variant = "danger" }: ConfirmDialogProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={setOpen} className="relative z-50">
        <Transition.Child as={Fragment} enter="transition duration-200 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 grid place-items-center p-4">
          <Transition.Child as={Fragment} enter="transition duration-200 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
            <DialogPanel className="w-full max-w-sm rounded-lg border border-border bg-surface p-5 shadow-lg">
              <div className="flex items-start gap-3">
                <div className={`grid size-10 shrink-0 place-items-center rounded-full ${variant === "danger" ? "bg-prio-high/15 text-prio-high" : "bg-primary/15 text-primary"}`}>
                  <AlertTriangle className="size-5" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="mb-1 font-bold">{title}</DialogTitle>
                  <p className="text-sm text-muted">{message}</p>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setOpen(false)} className="rounded-md px-4 py-2 text-sm text-muted transition hover:bg-border/50">
                  {cancelLabel}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    setOpen(false);
                  }}
                  className={`rounded-md px-4 py-2 text-sm font-semibold text-white transition ${variant === "danger" ? "bg-prio-high hover:bg-prio-high/90" : "bg-primary hover:bg-primary-hover"}`}
                >
                  {confirmLabel}
                </button>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
