"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProviderComp } from "./themeProvider";
import { ThemeType, UserType } from "../types/general";
import { UserProvider } from "../contexts/userContext";
import { Toaster } from "sonner";
import { getQueryClient } from "../lib/getQueryClient";

export default function GeneralProvider({ children, theme, user }: PropsWithChildren<{ theme: ThemeType; user: UserType | null }>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider user={user}>
        <ThemeProviderComp savedTheme={theme}>
          <Toaster
            position="top-center"
            dir="rtl"
            theme={theme === "dark" ? "dark" : "light"}
            toastOptions={{
              style: {
                fontFamily: "var(--font-vazir)",
              },
            }}
          />
          {children}
        </ThemeProviderComp>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
