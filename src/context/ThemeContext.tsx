import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");

  // تحميل الثيم من localStorage عند فتح الموقع
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    console.log('[ThemeProvider] init saved theme =', saved);
    setTheme(saved);

    const html = document.documentElement;
    if (saved === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
  }, []);

  // تحديث ال html عند تغيير الثيم
  useEffect(() => {
    const html = document.documentElement;
    console.log('[ThemeProvider] theme changed ->', theme);

    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
