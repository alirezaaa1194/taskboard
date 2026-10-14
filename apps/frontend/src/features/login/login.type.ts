import { z } from "zod";

export type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
  };
};

export const loginSchema = z.object({
  email: z.string().min(1, "ایمیل الزامی است").email("ایمیل معتبر نیست"),
  password: z.string().min(1, "رمز عبور الزامی است").min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
