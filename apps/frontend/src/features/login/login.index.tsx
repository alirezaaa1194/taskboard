"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button, Field, Fieldset, Input, Label } from "@headlessui/react";
import { Logo } from "@/utilities/components/logo";
import { loginUser } from "./login.script";
import { loginSchema, type LoginFormData } from "./login.type";

function LoginPageComp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/tasks";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("ورود موفق", {
        description: "به تسک‌بورد خوش آمدید",
      });
      router.push(returnTo);
      router.refresh();
    },
    onError: (error: any) => {
      // Server-side error (e.g., incorrect email/password or inactive account)
      toast.error("خطا در ورود", {
        description: error?.message ?? "مشکلی پیش آمد",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <main className="grid min-h-screen place-items-center bg-bg px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-md">
        <Fieldset className="space-y-4">
          <div className="text-center">
            <Logo className="mx-auto size-12" />
            <h1 className="mt-3 text-2xl font-bold">تسک‌بورد</h1>
            <p className="mt-1 text-sm text-muted">برای ادامه وارد شوید</p>
          </div>

          <Field>
            <Label className="mb-1 block text-sm text-muted">ایمیل</Label>
            <Input {...register("email")} className={`field ${errors.email ? "border-prio-high" : ""}`} type="email" dir="ltr" placeholder="example@company.com" />
            {errors.email && <p className="mt-1 text-xs text-prio-high">{errors.email.message}</p>}
          </Field>

          <Field>
            <Label className="mb-1 block text-sm text-muted">رمز عبور</Label>
            <Input {...register("password")} className={`field ${errors.password ? "border-prio-high" : ""}`} type="password" dir="ltr" placeholder="••••••••" />
            {errors.password && <p className="mt-1 text-xs text-prio-high">{errors.password.message}</p>}
          </Field>

          <Button type="submit" disabled={mutation.isPending} className="block w-full rounded-md bg-primary py-2.5 text-center font-semibold text-white transition hover:bg-primary-hover disabled:opacity-50">
            {mutation.isPending ? "در حال ورود..." : "ورود"}
          </Button>

          <p className="mt-2 text-center text-xs text-muted">دسترسی فقط برای کاربران مجاز</p>
        </Fieldset>
      </form>
    </main>
  );
}

export default LoginPageComp;
