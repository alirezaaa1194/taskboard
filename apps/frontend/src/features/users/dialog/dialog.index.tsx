"use client";

import { Dialog, DialogPanel, DialogTitle, Switch, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import DropdownComp from "@/utilities/components/dropdown/dropdown.index";
import { UserRoleEnum } from "@/types/general";
import { UserDialogProps, userFormSchema, ROLE_OPTIONS, type UserFormInput, type UserFormValues } from "./dialog.type";
import { useUserMutations } from "../hooks/useUserMutation";

function UserDialogComp({ open, setOpen, mode, initial = null, onSuccess }: UserDialogProps) {
  const isEdit = mode === "edit";
  const { createUser, updateUser } = useUserMutations();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInput, unknown, UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRoleEnum.MEMBER,
      isActive: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (isEdit && initial) {
        reset({
          name: initial.name,
          email: initial.email,
          password: "",
          role: initial.role,
          isActive: initial.isActive,
        });
      } else {
        reset({
          name: "",
          email: "",
          password: "",
          role: UserRoleEnum.MEMBER,
          isActive: true,
        });
      }
    }
  }, [open, isEdit, initial, reset]);

  const mutation = isEdit ? updateUser : createUser;

  const onSubmit = (values: UserFormValues) => {
    if (isEdit && initial) {
      // Only fields allowed for PATCH
      const payload = {
        name: values.name,
        role: values.role,
        isActive: values.isActive,
      };
      updateUser.mutate(
        { id: initial.id, values: payload },
        {
          onSuccess: () => {
            setOpen(false);
            onSuccess?.();
          },
        },
      );
    } else {
      createUser.mutate(values, {
        onSuccess: () => {
          setOpen(false);
          onSuccess?.();
        },
      });
    }
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
              <div className="mb-3 flex items-center justify-between">
                <DialogTitle className="font-bold">{isEdit ? "ویرایش کاربر" : "کاربر جدید"}</DialogTitle>
                <button onClick={() => setOpen(false)} aria-label="بستن" className="grid size-8 place-items-center rounded-md text-muted hover:bg-border/50">
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-muted">نام</label>
                  <input {...register("name")} className={`field ${errors.name ? "border-prio-high" : ""}`} placeholder="نام و نام خانوادگی" />
                  {errors.name && <p className="mt-1 text-xs text-prio-high">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm text-muted">ایمیل</label>
                  <input {...register("email")} className={`field ${errors.email ? "border-prio-high" : ""}`} type="email" dir="ltr" placeholder="example@company.com" disabled={isEdit} />
                  {errors.email && <p className="mt-1 text-xs text-prio-high">{errors.email.message}</p>}
                </div>

                {!isEdit && (
                  <div>
                    <label className="mb-1 block text-sm text-muted">رمز عبور</label>
                    <input {...register("password")} className={`field ${errors.password ? "border-prio-high" : ""}`} type="password" dir="ltr" placeholder="••••••••" />
                    {errors.password && <p className="mt-1 text-xs text-prio-high">{errors.password.message}</p>}
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-sm text-muted">نقش</label>
                  <Controller control={control} name="role" render={({ field }) => <DropdownComp<UserRoleEnum> value={field.value} onChange={field.onChange} options={ROLE_OPTIONS} />} />
                </div>

                <div className="flex items-center justify-between rounded-md border border-border bg-bg px-3 py-2.5">
                  <span className="text-sm">وضعیت حساب</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${control._formValues.isActive ? "text-done" : "text-prio-high"}`}>{control._formValues.isActive ? "فعال" : "غیرفعال"}</span>
                    <Controller
                      control={control}
                      name="isActive"
                      render={({ field }) => (
                        <Switch checked={field.value} onChange={field.onChange} className={`group relative inline-flex h-6 w-11 items-center rounded-full transition ${field.value ? "bg-primary" : "bg-border"}`} dir="ltr">
                          <span className={`inline-block size-4 rounded-full bg-white transition ${field.value ? "translate-x-6" : "translate-x-1"}`} />
                        </Switch>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button type="submit" disabled={mutation.isPending} className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-50">
                    {mutation.isPending ? "در حال ذخیره..." : isEdit ? "ذخیره تغییرات" : "ساخت کاربر"}
                  </button>
                  <button type="button" onClick={() => setOpen(false)} className="rounded-md px-4 py-2.5 text-sm text-muted transition hover:bg-border/50">
                    انصراف
                  </button>
                </div>
              </form>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default UserDialogComp;
