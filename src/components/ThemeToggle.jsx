"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // To avoid hydration mismatch, only render after mount
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-12 h-6 bg-[#D4AF37] dark:bg-[#E50914]/20 rounded-full" />; // Skeleton
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-6 w-12 items-center rounded-full bg-[#D4AF37] dark:bg-[#E50914]/40 transition-colors focus:outline-none shadow-inner"
      aria-label="Toggle theme"
    >
      <span
        className={`${
          isDark ? "translate-x-6 bg-white dark:bg-zinc-900" : "translate-x-1 bg-white"
        } inline-flex h-4 w-4 transform items-center justify-center rounded-full transition-transform shadow-sm`}
      >
        {isDark ? (
          <Moon className="h-2.5 w-2.5 text-[#D4AF37] dark:text-[#E50914]" />
        ) : (
          <Sun className="h-2.5 w-2.5 text-[#D4AF37] dark:text-[#E50914]" />
        )}
      </span>
    </button>
  );
}
