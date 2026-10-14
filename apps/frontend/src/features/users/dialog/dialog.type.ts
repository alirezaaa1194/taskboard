import { z } from "zod";
import { UserRoleEnum, type UserType } from "@/types/general";

export interface UserDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: "create" | "edit";
  initial?: UserType | null;
  onSuccess?: () => void;
}

export const userFormSchema = z.object({
  name: z.string().min(2, "نام حداقل ۲ کاراکتر باشد").max(100),
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد").optional().or(z.literal("")),
  role: z.nativeEnum(UserRoleEnum),
  isActive: z.boolean(),
});

export type UserFormInput = z.input<typeof userFormSchema>;
export type UserFormValues = z.output<typeof userFormSchema>;

export const ROLE_OPTIONS: { value: UserRoleEnum; label: string }[] = [
  { value: UserRoleEnum.OWNER, label: "مالک" },
  { value: UserRoleEnum.MANAGER, label: "مدیر" },
  { value: UserRoleEnum.MEMBER, label: "عضو" },
];
