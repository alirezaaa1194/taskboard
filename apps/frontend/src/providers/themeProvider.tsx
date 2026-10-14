import { useState } from "react";
import { ThemeType } from "../types/general";
import { ThemeContext } from "../contexts/themeContext";
import { setCookie } from "../scripts/cookie";

export function ThemeProviderComp({ children, savedTheme }: { children: React.ReactNode; savedTheme: ThemeType }) {
  const [theme, setTheme] = useState<ThemeType>(savedTheme);

  const toggleTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    setCookie("theme", newTheme);
  };

  return (
    <ThemeContext value={{ theme, toggle: () => toggleTheme(theme === "dark" ? "light" : "dark") }}>
      <div className={theme}>{children}</div>
    </ThemeContext>
  );
}
