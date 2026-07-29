import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Wraps next-themes' provider. attribute="class" is what makes it
 * toggle the "dark" class on <html> — which is exactly what
 * tailwind.config.ts's darkMode: ["class"] is waiting for.
 * defaultTheme="system" respects the user's OS-level light/dark
 * preference on first visit rather than forcing light mode on
 * everyone; enableSystem keeps that in sync if they change their OS
 * setting while the tab is open.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}