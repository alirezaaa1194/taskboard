"use client";

import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import DropdownComp from "@/utilities/components/dropdown/dropdown.index";
import UserDropdownComp from "@/utilities/components/userDropdown/userDropdown.index";
import TiptapEditorComp from "./tiptapEditor/tiptapEditor.index";
import { useUser } from "@/contexts/userContext";
import { TaskPriorityEnum, TaskStatusEnum, UserRoleEnum } from "@/types/general";
import { AddTaskDialogProps, STATUS_OPTIONS, PRIORITY_OPTIONS, taskFormSchema, type TaskFormInput, type TaskFormValues } from "./addDialog.type";
import { useTaskMutations } from "../hooks/useTaskMutation";

function AddTaskDialogComp({ open, setOpen, task = null, onSuccess }: AddTaskDialogProps) {
  const isEdit = !!task;
  const user = useUser();
  const isMember = user?.role === UserRoleEnum.MEMBER;
  const { createTask, updateTask } = useTaskMutations();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInput, unknown, TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      status: TaskStatusEnum.TODO,
      priority: TaskPriorityEnum.MEDIUM,
      assigneeId: null,
      dueDate: "",
      description: null,
    },
  });

  useEffect(() => {
    if (open) {
      if (task) {
        reset({
          title: task.title,
          status: task.status,
          priority: task.priority,
          assigneeId: task.assignee?.id ?? null,
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
          description: task.description,
        });
      } else {
        reset({
          title: "",
          status: TaskStatusEnum.TODO,
          priority: TaskPriorityEnum.MEDIUM,
          assigneeId: null,
          dueDate: "",
          description: null,
        });
      }
    }
  }, [open, task, reset]);

  const mutation = isEdit ? updateTask : createTask;

  const onSubmit = (values: TaskFormValues) => {
    if (isEdit && task) {
      updateTask.mutate(
        { id: task.id, values },
        {
          onSuccess: () => {
            setOpen(false);
            onSuccess?.();
          },
        },
      );
    } else {
      createTask.mutate(values, {
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
                <DialogTitle className="font-bold">{isEdit ? "ویرایش تسک" : "تسک جدید"}</DialogTitle>
                <button onClick={() => setOpen(false)} aria-label="بستن" className="grid size-8 place-items-center rounded-md text-muted hover:bg-border/50">
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-muted">عنوان</label>
                  <input {...register("title")} className={`field ${errors.title ? "border-prio-high" : ""}`} placeholder="عنوان تسک" />
                  {errors.title && <p className="mt-1 text-xs text-prio-high">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm text-muted">وضعیت</label>
                    <Controller control={control} name="status" render={({ field }) => <DropdownComp<TaskStatusEnum> value={field.value} onChange={field.onChange} options={STATUS_OPTIONS} />} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">اولویت</label>
                    <Controller control={control} name="priority" render={({ field }) => <DropdownComp<TaskPriorityEnum> value={field.value} onChange={field.onChange} options={PRIORITY_OPTIONS} />} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm text-muted">مسئول</label>
                    <Controller control={control} name="assigneeId" render={({ field }) => <UserDropdownComp value={field.value} onChange={field.onChange} includeNone={!isMember} />} />
                    {isMember && <p className="mt-1 text-xs text-muted">فقط مدیران می‌توانند تسک را به دیگران اختصاص دهند</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">تاریخ سررسید</label>
                    <input {...register("dueDate")} type="date" className="field" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-muted">توضیحات</label>
                  <Controller control={control} name="description" render={({ field }) => <TiptapEditorComp content={field.value} onChange={field.onChange} />} />
                </div>

                <div className="mt-4 flex gap-2">
                  <button type="submit" disabled={mutation.isPending} className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-50">
                    {mutation.isPending ? "در حال ذخیره..." : isEdit ? "ذخیره تغییرات" : "ساخت تسک"}
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

export default AddTaskDialogComp;
