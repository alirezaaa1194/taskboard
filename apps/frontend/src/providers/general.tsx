"use client";

import { ReactNode } from "react";
import { ThemeProviderComp } from "./themeProvider";
import { ThemeType } from "../types/general";

function AppProviderComp({ children, theme }: { children: ReactNode; theme: ThemeType }) {
  return <ThemeProviderComp savedTheme={theme}>{children}</ThemeProviderComp>;
}

export default AppProviderComp;
