"use client";

import { Dialog, DialogPanel, DialogTitle, Switch, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import DropdownComp from "../../../utilities/components/dropdown/dropdown.index";

export interface UserFormData {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  active: boolean;
}

interface UserDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: "create" | "edit";
  initial?: UserFormData | null;
  onSubmit?: (data: UserFormData) => void;
}

const ROLE_OPTIONS = ["مالک", "مدیر", "عضو"];

export default function UserDialogComp({ open, setOpen, mode, initial, onSubmit }: UserDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("عضو");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initial) {
        setName(initial.name);
        setEmail(initial.email);
        setRole(initial.role);
        setActive(initial.active);
        setPassword("");
      } else {
        setName("");
        setEmail("");
        setPassword("");
        setRole("عضو");
        setActive(true);
      }
    }
  }, [open, mode, initial]);

  const handleSubmit = () => {
    onSubmit?.({
      id: initial?.id,
      name,
      email,
      password: password || undefined,
      role,
      active,
    });
    setOpen(false);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={setOpen} className="relative z-50">
        <Transition.Child as={Fragment} enter="transition duration-200 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 grid place-items-end sm:place-items-center sm:p-4">
          <Transition.Child as={Fragment} enter="transition duration-200 ease-out" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="transition duration-150 ease-in" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface p-4 sm:max-w-lg sm:rounded-lg">
              <DialogTitle className="mb-3 font-bold">{mode === "create" ? "کاربر جدید" : "ویرایش کاربر"}</DialogTitle>

              <div className="space-y-3">
                {/* نام */}
                <div>
                  <label className="mb-1 block text-sm text-muted">نام</label>
                  <input className="field" placeholder="نام و نام خانوادگی" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                {/* ایمیل */}
                <div>
                  <label className="mb-1 block text-sm text-muted">ایمیل</label>
                  <input className="field" type="email" dir="ltr" placeholder="example@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* رمز عبور — فقط در create */}
                {mode === "create" && (
                  <div>
                    <label className="mb-1 block text-sm text-muted">رمز عبور</label>
                    <input className="field" type="password" dir="ltr" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                )}

                {/* نقش */}
                <div>
                  <label className="mb-1 block text-sm text-muted">نقش</label>
                  <DropdownComp value={role} onChange={setRole} options={ROLE_OPTIONS} />
                </div>

                {/* وضعیت فعال */}
                <div className="flex items-center justify-between rounded-md border border-border bg-bg px-3 py-2.5">
                  <span className="text-sm">وضعیت حساب</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${active ? "text-done" : "text-prio-high"}`}>{active ? "فعال" : "غیرفعال"}</span>
                    <Switch checked={active} onChange={setActive} className={`group relative inline-flex h-6 w-11 items-center rounded-full transition ${active ? "bg-primary" : "bg-border"}`} dir="ltr">
                      <span className={`inline-block size-4 rounded-full bg-white transition ${active ? "translate-x-6" : "translate-x-1"}`} />
                    </Switch>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={handleSubmit} className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover">
                  {mode === "create" ? "ساخت" : "ذخیره"}
                </button>
                <button onClick={() => setOpen(false)} className="rounded-md px-4 py-2.5 text-sm text-muted transition hover:bg-border/50">
                  انصراف
                </button>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
