"use client";
import { MessageSquareText, MousePointerClick } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/features/theme/components";
import { useNotifications } from "@/provider/notifications";
import { cn } from "@/lib/utils";

export default function DynamicIsland() {
  const [expand, setExpand] = useState(false);
  const { notification } = useNotifications();

  const isInfo = notification?.type === "info";
  const isError = notification?.type === "error";
  const isLoading = notification?.type === "loading";

  useEffect(() => {
    if (notification) setExpand(true);
    else setExpand(false);
  }, [notification]);

  return (
    <section className="fixed inset-x-0 top-4 flex w-full justify-center gap-3 md:top-3">
      {/* ISLAND TOGGLE */}
      <motion.button
        variants={ICON_VARIANTS}
        initial="initial"
        animate={isError ? "vibrate" : "initial"}
        onClick={() => setExpand((prev) => !prev)}
        className={cn(
          "bg-orange-accent-500/90 grid size-8 place-content-center rounded-full border text-xs font-bold text-zinc-200 backdrop-blur-3xl transition-colors duration-300 ease-in-out",
          { "bg-red-500 text-white": isError },
        )}
      >
        {isError ? "!" : <MousePointerClick size={16} />}
      </motion.button>

      {/* ISLAND */}
      <motion.div
        variants={VARIANTS}
        initial={"closed"}
        animate={expand ? "open" : "closed"}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={cn(
          "justfy-center dark:border-border flex size-full items-center rounded-[1.75rem] border-[0.5px] border-neutral-400 bg-black/70 px-4 py-3 text-sm text-zinc-50 drop-shadow-2xl backdrop-blur-3xl transition-colors duration-300 ease-in dark:bg-black/50",
          { "border-destructive dark:border-destructive/50": isError },
        )}
      >
        <AnimatePresence mode="wait">
          {expand && (
            <motion.div
              variants={CHILD_VARIANTS}
              initial="closed"
              animate="open"
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.3,
              }}
              className={cn(
                "origin-op grid size-full items-center gap-2 text-center",
                { "grid-rows-[2.25rem_1fr]": isLoading },
              )}
            >
              {isLoading && (
                <motion.figure
                  className={cn(
                    "bg-orange-accent-500 mx-auto h-3 rounded-full",
                  )}
                  variants={LOOP_VARIANTS}
                  animate={"loop"}
                  transition={{
                    type: "tween",
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2.4,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              )}
              <p>{notification?.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ThemeToggle />
    </section>
  );
}

const VARIANTS: Variants = {
  open: {
    width: "16rem",
    height: "6rem",
  },
  closed: {
    width: "9rem",
    height: "2rem",
  },
};

const ICON_VARIANTS: Variants = {
  initial: { x: 0 },
  vibrate: {
    // Phone vibration -> faster, smaller movements
    // x: [0, -2, 2, -2, 2, -1, 1, -1, 1, 0],
    // x: [0, -2, 2, 0, -2, 2, 0, -1, 1, 0],
    x: [0, -3, 3, -2, 2, -3, 3, -1, 1, 0],
    y: [0, -2, 2, 0, -2, 2, 0, -1, 1, 0],
    transition: {
      x: {
        duration: 0.2,
        repeat: 2, // Vibrate 3 times total
        ease: "linear",
      },
    },
  },
};

const CHILD_VARIANTS: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    x: 0,
  },
  closed: {
    opacity: 0,
    scale: 0.9,
    x: -5,
  },
};

const LOOP_VARIANTS: Variants = {
  static: {
    width: "2rem",
    height: "2rem",
  },
  loop: {
    width: ["0.75rem", "1.5rem", "2rem", "1.5rem", "0.75rem"],
    height: ["0.75rem", "1.5rem", "0.75rem", "1.5rem", "0.75rem"],
  },
};
