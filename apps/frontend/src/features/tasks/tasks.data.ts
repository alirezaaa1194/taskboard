import { TaskPriorityEnum, TaskStatusEnum } from "@/types/general";

export const statusLabel: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.TODO]: "انجام نشده",
  [TaskStatusEnum.IN_PROGRESS]: "در حال انجام",
  [TaskStatusEnum.DONE]: "انجام شده",
};

export const statusClass: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.TODO]: "bg-todo/15 text-todo",
  [TaskStatusEnum.IN_PROGRESS]: "bg-progress/15 text-progress",
  [TaskStatusEnum.DONE]: "bg-done/15 text-done",
};

export const priorityLabel: Record<TaskPriorityEnum, string> = {
  [TaskPriorityEnum.LOW]: "پایین",
  [TaskPriorityEnum.MEDIUM]: "متوسط",
  [TaskPriorityEnum.HIGH]: "بالا",
};

export const priorityClass: Record<TaskPriorityEnum, string> = {
  [TaskPriorityEnum.LOW]: "bg-prio-low/15 text-prio-low",
  [TaskPriorityEnum.MEDIUM]: "bg-prio-med/15 text-prio-med",
  [TaskPriorityEnum.HIGH]: "bg-prio-high/15 text-prio-high",
};
