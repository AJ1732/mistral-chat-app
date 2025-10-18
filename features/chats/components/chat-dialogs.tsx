"use client";
import { useEffect, useRef } from "react";

import { useChat } from "../context";
import { cn } from "@/lib/utils";

export default function ChatDialogs() {
  const {
    state: { messages },
  } = useChat();

  const scrollRef = useRef<HTMLElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <article
      ref={scrollRef}
      className="no-scrollbar -mb-2 flex min-h-0 flex-1 flex-col overflow-y-auto pt-10 pb-2 md:rounded-t-[2.5rem] md:rounded-b-lg"
    >
      <div className="mt-auto space-y-4 leading-[200%]">
        {messages.map(({ id, text, sender }) => {
          const isUser = sender === "user";
          const isAI = sender === "ai";
          return (
            <p
              key={id}
              className={cn(
                "overflow-wrap-anywhere word-break-break-word flex max-w-[90%] flex-col gap-px break-words hyphens-auto",
                {
                  "text-orange-accent-500 dark:text-orange-accent-50 [&>span:has(small)]:text-left":
                    isAI,
                },
                {
                  "mb-2 ml-auto text-right text-pretty dark:text-zinc-300 [&>span:has(small)]:ml-auto":
                    isUser,
                },
              )}
            >
              <span
                className={cn(
                  "block whitespace-pre-wrap",
                  "prose-ul:list-disc prose-ul:ml-4 prose-ol:list-decimal prose-ol:ml-5",
                )}
              >
                {text}
              </span>

              <span className="flex items-center gap-2">
                <figure
                  className={cn(
                    "size-2",
                    { "bg-orange-accent-300": isAI },
                    { "bg-foreground": isUser },
                  )}
                ></figure>
                <small className="text-xs">{isAI ? "mistral ai" : "you"}</small>
              </span>
            </p>
          );
        })}
      </div>
    </article>
  );
}
