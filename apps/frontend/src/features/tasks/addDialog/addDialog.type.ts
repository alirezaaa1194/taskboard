import { z } from "zod";
import type { JSONContent } from "@tiptap/core";
import { TaskPriorityEnum, TaskStatusEnum, type TaskType } from "@/types/general";

export type AddTaskDialogProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  task?: TaskType | null;
  onSuccess?: () => void;
};

export const taskFormSchema = z.object({
  title: z.string().min(2, "عنوان حداقل ۲ کاراکتر باشد").max(255),
  status: z.nativeEnum(TaskStatusEnum),
  priority: z.nativeEnum(TaskPriorityEnum),
  assigneeId: z.number().nullable(),
  dueDate: z.string(),
  description: z.custom<JSONContent | null>().nullable(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
export type TaskFormInput = z.input<typeof taskFormSchema>;

export const STATUS_OPTIONS: { value: TaskStatusEnum; label: string }[] = [
  { value: TaskStatusEnum.TODO, label: "انجام نشده" },
  { value: TaskStatusEnum.IN_PROGRESS, label: "در حال انجام" },
  { value: TaskStatusEnum.DONE, label: "انجام شده" },
];

export const PRIORITY_OPTIONS: { value: TaskPriorityEnum; label: string }[] = [
  { value: TaskPriorityEnum.LOW, label: "پایین" },
  { value: TaskPriorityEnum.MEDIUM, label: "متوسط" },
  { value: TaskPriorityEnum.HIGH, label: "بالا" },
];
