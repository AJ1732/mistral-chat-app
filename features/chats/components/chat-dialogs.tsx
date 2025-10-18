"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { MarkdownMessage } from "@/components/elements";
import { cn } from "@/lib/utils";

import { useChat } from "../context";

export default function ChatDialogs() {
  const {
    state: { messages },
  } = useChat();

  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <article
      ref={scrollRef}
      className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto pt-10 pb-2 md:rounded-t-[2.5rem] md:rounded-b-lg"
    >
      <ul
        role="list"
        aria-live="polite"
        className="mt-auto space-y-8 leading-[200%]"
      >
        <AnimatePresence mode="wait">
          {messages.map(({ id, text, sender, loading }) => {
            const isUser = sender === "user";
            const isAI = sender === "ai";

            return (
              <motion.li
                key={id}
                role="listitem"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className={cn(
                  "overflow-wrap-anywhere word-break-break-word flex max-w-[90%] flex-col gap-px text-pretty break-words hyphens-auto",
                  {
                    "text-orange-accent-500 dark:text-orange-accent-50 [&>div:has(small)]:text-left":
                      isAI,
                  },
                  {
                    "ml-auto text-right dark:text-zinc-300 [&>div:has(small)]:ml-auto":
                      isUser,
                  },
                )}
              >
                <div
                  className={cn(
                    "relative",
                    "prose-ul:list-disc prose-ul:ml-4 prose-ol:list-decimal prose-ol:ml-5",
                    "prose prose-sm dark:prose-invert prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-code:text-orange-500 dark:prose-code:text-orange-400 max-w-none",
                  )}
                >
                  {isAI ? (
                    <MarkdownMessage content={text} />
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="block whitespace-pre-wrap"
                    >
                      {text}
                    </motion.p>
                  )}

                  {isAI && loading && <TypingIndicator />}
                </div>

                <ChatStamp {...{ isAI, isUser }} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </article>
  );
}

function TypingIndicator() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="ml-1 inline-flex items-center gap-1"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
          className="bg-orange-accent-500 inline-block h-1.5 w-1.5 rounded-full"
        />
      ))}
    </motion.span>
  );
}

function ChatStamp({ isAI, isUser }: { isAI: boolean; isUser: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="flex items-center gap-2"
    >
      <motion.figure
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        aria-hidden="true"
        className={cn(
          "size-2",
          { "bg-orange-accent-300": isAI },
          { "bg-foreground": isUser },
        )}
      ></motion.figure>
      <small className="text-xs">{isAI ? "mistral ai" : "you"}</small>
    </motion.div>
  );
}
