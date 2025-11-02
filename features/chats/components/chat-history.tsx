"use client";
import { AnimatePresence, motion } from "motion/react";

export function ChatHistory() {
  return (
    <ul role="list" aria-live="polite" className="flex flex-col gap-8">
      <AnimatePresence>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.li key={i} className="">
            {i} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic,
            enim.
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
