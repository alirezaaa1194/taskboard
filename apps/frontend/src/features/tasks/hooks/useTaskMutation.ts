"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ClientCall } from "@/scripts/clientCall";
import type { TaskType } from "@/types/general";
import type { TaskFormValues } from "../addDialog/addDialog.type";
import { appApis } from "../../../data/api";

export function useTaskMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const createTask = useMutation({
    mutationFn: (values: TaskFormValues) => ClientCall<TaskType>(appApis.tasks.create, { method: "POST", body: values }),
    onSuccess: () => {
      toast.success("تسک ساخته شد");
      invalidate();
    },
    onError: (error: any) => {
      toast.error("خطا در ساخت تسک", { description: error?.message });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, values }: { id: number; values: TaskFormValues }) => ClientCall<TaskType>(`/todos/${id}`, { method: "PATCH", body: values }),
    onSuccess: () => {
      toast.success("تسک ویرایش شد");
      invalidate();
    },
    onError: (error: any) => {
      toast.error("خطا در ویرایش", { description: error?.message });
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: number) => ClientCall<{ message: string }>(`/todos/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("تسک حذف شد");
      invalidate();
    },
    onError: (error: any) => {
      toast.error("خطا در حذف", { description: error?.message });
    },
  });

  return { createTask, updateTask, deleteTask };
}
