"use client";

import { Button, Field, Fieldset, Input, Label } from "@headlessui/react";
import Link from "next/link";
import { Logo } from "../../utilities/components/logo";

function LoginPageComp() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-4">
      <form className="w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-md">
        <Fieldset className="space-y-4">
          <div className="text-center">
            <Logo className="mx-auto size-12" />
            <h1 className="mt-3 text-2xl font-bold">تسک‌بورد</h1>
            <p className="mt-1 text-sm text-muted">برای ادامه وارد شوید</p>
          </div>

          <Field>
            <Label className="mb-1 block text-sm text-muted">ایمیل</Label>
            <Input className="field" type="email" defaultValue="sara@company.com" readOnly />
          </Field>

          <Field>
            <Label className="mb-1 block text-sm text-muted">رمز عبور</Label>
            <Input className="field" type="password" defaultValue="owner123" readOnly />
          </Field>
          <Link href="/tasks">
            <Button className="block w-full rounded-md bg-primary py-2.5 text-center font-semibold text-white transition hover:bg-primary-hover">ورود</Button>
          </Link>

          <p className="text-center text-xs text-muted mt-2">دسترسی فقط برای کاربران مجاز</p>
        </Fieldset>
      </form>
    </main>
  );
}

export default LoginPageComp;
