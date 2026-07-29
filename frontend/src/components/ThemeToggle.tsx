import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  /** Icon buttons on a light background (white header) vs on the always-black brand header need opposite border colours. */
  variant?: "on-light" | "on-dark";
}

export default function ThemeToggle({ variant = "on-light" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  // next-themes can't know the real theme until after hydration (it
  // reads localStorage/matchMedia client-side only) — rendering
  // before that would show the wrong icon for a flash. Mounting a
  // placeholder-sized empty button first avoids that flicker and
  // avoids a server/client mismatch warning.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const borderClass =
    variant === "on-dark"
      ? "border-white text-white hover:bg-white hover:text-black"
      : "border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black";

  if (!mounted) {
    return <div className="h-10 w-10 shrink-0" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${borderClass}`}
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}