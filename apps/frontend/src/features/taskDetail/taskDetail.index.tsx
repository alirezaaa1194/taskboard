"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { statusLabel, statusClass, priorityLabel, priorityClass } from "../tasks/tasks.data";
import type { TaskType } from "@/types/general";
import TiptapRendererComp from "./tiptapRenderer/tiptapRenderer.index";

function TaskDetailPageComp({ task }: { task: TaskType }) {
  const router = useRouter();
  if (!task) return <p className="text-prio-high">تسک یافت نشد</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <button onClick={() => router.back()} className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowRight className="size-4" />
        بازگشت
      </button>

      <article className="rounded-lg border border-border bg-surface p-6">
        <h1 className="mb-4 text-2xl font-bold">{task.title}</h1>

        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-1 ${statusClass[task.status]}`}>{statusLabel[task.status]}</span>
          <span className={`rounded-full px-2 py-1 ${priorityClass[task.priority]}`}>{priorityLabel[task.priority]}</span>
        </div>

        <dl className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted">مسئول</dt>
            <dd className="mt-1 font-medium">{task.assignee?.name ?? "بدون مسئول"}</dd>
          </div>
          <div>
            <dt className="text-muted">تاریخ سررسید</dt>
            <dd className="mt-1 font-medium">{task.dueDate ? new Date(task.dueDate).toLocaleDateString("fa-IR") : "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">سازنده</dt>
            <dd className="mt-1 font-medium">{task.createdBy?.name}</dd>
          </div>
          <div>
            <dt className="text-muted">تاریخ ساخت</dt>
            <dd className="mt-1 font-medium">{new Date(task.createdAt).toLocaleDateString("fa-IR")}</dd>
          </div>
        </dl>

        <div>
          <h2 className="mb-2 font-semibold">توضیحات</h2>
          {task.description ? <TiptapRendererComp content={task.description} /> : <p className="text-sm text-muted">بدون توضیحات</p>}
        </div>
      </article>
    </div>
  );
}

export default TaskDetailPageComp;
