"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { MoreHorizontal } from "lucide-react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmDialogComp from "@/utilities/components/confirmDialog/confirmDialog.index";
import { TaskType } from "../../../../types/general";
import { priorityClass, priorityLabel, statusClass, statusLabel } from "../../tasks.data";
import { useTaskMutations } from "../../hooks/useTaskMutation";
import Link from "next/link";

function TasksItemComp({ task, onEdit }: { task: TaskType; onEdit: (task: TaskType) => void }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { deleteTask } = useTaskMutations();
  const router = useRouter();

  const handleDelete = () => {
    deleteTask.mutate(task.id, {
      onSuccess: () => setConfirmOpen(false),
    });
  };

  return (
    <>
      <article className="rounded-lg border border-border bg-surface p-4 shadow-sm">
        <div className="mb-2 flex items-start gap-2">
          <Menu as="div" className="relative">
            <MenuButton className="grid size-8 place-items-center rounded-md text-muted transition hover:bg-border/50" aria-label="عملیات">
              <MoreHorizontal className="size-4" />
            </MenuButton>
            <Transition as={Fragment} enter="transition duration-150 ease-out" enterFrom="opacity-0 -translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition duration-100 ease-in" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 -translate-y-1 scale-95">
              <MenuItems anchor="bottom start" className="z-20 w-36 origin-top rounded-md border border-border bg-surface p-1 shadow-md [--anchor-gap:4px]">
                <MenuItem>
                  <button onClick={() => router.push(`/tasks/${task.id}`)} className="w-full rounded-md px-3 py-2 text-start text-sm data-[focus]:bg-border/50">
                    جزئیات
                  </button>
                </MenuItem>
                <MenuItem>
                  <button onClick={() => onEdit(task)} className="w-full rounded-md px-3 py-2 text-start text-sm data-[focus]:bg-border/50">
                    ویرایش
                  </button>
                </MenuItem>
                <MenuItem>
                  <button onClick={() => setConfirmOpen(true)} className="w-full rounded-md px-3 py-2 text-start text-sm text-prio-high data-[focus]:bg-prio-high/10">
                    حذف
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>

          <Link href={`/tasks/${task.id}`} className="text-start font-semibold transition hover:text-primary">
            {task.title}
          </Link>
        </div>

        <p className="mb-3 line-clamp-2 text-sm text-muted">{task.description ? "توضیحات دارد" : "بدون توضیحات"}</p>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-1 ${statusClass[task.status]}`}>{statusLabel[task.status]}</span>
          <span className={`rounded-full px-2 py-1 ${priorityClass[task.priority]}`}>{priorityLabel[task.priority]}</span>
          <span className="ms-auto text-muted">{task.dueDate ? new Date(task.dueDate).toLocaleDateString("fa-IR") : "—"}</span>
          <span className="text-muted">{task.assignee?.name ?? "بدون مسئول"}</span>
        </div>
      </article>

      <ConfirmDialogComp open={confirmOpen} setOpen={setConfirmOpen} title="حذف تسک" message={`آیا از حذف «${task.title}» مطمئن هستید؟`} confirmLabel="حذف" cancelLabel="انصراف" variant="danger" onConfirm={handleDelete} />
    </>
  );
}

export default TasksItemComp;
