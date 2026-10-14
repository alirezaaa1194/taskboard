import { getCurrentUser } from "../lib/serverOnly";
import GeneralProvider from "../providers/generalProvider";
import { getCookie } from "../scripts/cookie";
import { ThemeType } from "../types/general";
import "./globals.css";
import localFont from "next/font/local";

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

export const instant = false;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = ((await getCookie("theme")) || "dark") as ThemeType;
  const user = await getCurrentUser();

  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} font-sans ${theme}`}>
      <body>
        <GeneralProvider user={user} theme={theme}>
          {children}
        </GeneralProvider>
      </body>
    </html>
  );
}
