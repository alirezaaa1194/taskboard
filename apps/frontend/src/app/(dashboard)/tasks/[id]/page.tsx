import type { TaskType } from "@/types/general";
import TaskDetailPageComp from "@/features/taskDetail/taskDetail.index";
import { ServerCall } from "@/scripts/serverCall";
import { appApis } from "@/data/api";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const task = await ServerCall<TaskType>(appApis.tasks.detail(Number(id)));
    return {
      title: task.title,
      description: `جزئیات تسک ${task.title}`,
    };
  } catch {
    return {
      title: "تسک یافت نشد",
    };
  }
}

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await ServerCall<TaskType>(appApis.tasks.detail(Number(id)));

  return <TaskDetailPageComp task={task} />;
}
