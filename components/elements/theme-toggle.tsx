"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export const toggleVariant = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.8, filter: "blur(4px)" },
};

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!theme) return null;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className={cn(
        "dark:border-border grid size-8 place-content-center rounded-full border border-neutral-300 bg-zinc-200/80 backdrop-blur-3xl dark:bg-zinc-800/80",
        className,
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key={"moon"}
            variants={toggleVariant}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            transition={{ duration: 0.1 }}
          >
            <Moon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key={"sun"}
            variants={toggleVariant}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            transition={{ duration: 0.1 }}
          >
            <Sun size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
