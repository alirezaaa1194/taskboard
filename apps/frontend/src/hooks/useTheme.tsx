import { use } from "react";
import { ThemeContext } from "../contexts/themeContext";

export function useTheme() {
  const ctx = use(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
