"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ClientCall } from "@/scripts/clientCall";
import { appApis } from "@/data/api";
import type { UserType } from "@/types/general";
import { UserFormValues } from "../dialog/dialog.type";

export function useUserMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const createUser = useMutation({
    mutationFn: (values: UserFormValues) =>
      ClientCall<UserType>(appApis.users.create, {
        method: "POST",
        body: values,
      }),
    onSuccess: () => {
      toast.success("کاربر ساخته شد");
      invalidate();
    },
    onError: (error: any) => {
      toast.error("خطا در ساخت کاربر", { description: error?.message });
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, values }: { id: number; values: Omit<UserFormValues, "email"> }) =>
      ClientCall<UserType>(appApis.users.update(id), {
        method: "PATCH",
        body: values,
      }),
    onSuccess: () => {
      toast.success("کاربر ویرایش شد");
      invalidate();
    },
    onError: (error: any) => {
      toast.error("خطا در ویرایش کاربر", { description: error?.message });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) =>
      ClientCall<{ message: string }>(appApis.users.remove(id), {
        method: "DELETE",
      }),
    onSuccess: () => {
      toast.success("کاربر حذف شد");
      invalidate();
    },
    onError: (error: any) => {
      toast.error("خطا در حذف کاربر", { description: error?.message });
    },
  });

  return { createUser, updateUser, deleteUser };
}
