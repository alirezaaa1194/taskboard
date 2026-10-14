import { Metadata } from "next";
import LoginPageComp from "../../features/login/login.index";

export const metadata: Metadata = {
  title: "ورود | تسک‌بورد",
  description: "برای دسترسی به تسک‌بورد وارد حساب کاربری خود شوید",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginPageComp />;
}
