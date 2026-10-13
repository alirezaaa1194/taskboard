import AppProviderComp from "../providers/general";
import { getCookie } from "../scripts/cookie";
import { ThemeType } from "../types/general";
import "./globals.css";
import localFont from "next/font/local";

export const instant = false;

const vazir = localFont({
  src: [
    { path: "./fonts/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Vazirmatn-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = ((await getCookie("theme")) || "dark") as ThemeType;
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} font-sans ${theme}`}>
      <body>
        <AppProviderComp theme={theme}>{children}</AppProviderComp>
      </body>
    </html>
  );
}
