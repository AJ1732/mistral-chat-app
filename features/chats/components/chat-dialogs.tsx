"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { MarkdownMessage } from "@/components/elements";
import { cn } from "@/lib/utils";

import { useChat } from "../context";
import { useViewBehindContext } from "../context/view-behind";

const variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "100%", borderTopRadius: "2.875rem" },
  shrink: { opacity: 1, height: "5rem" },
};

export default function ChatDialogs() {
  const {
    state: { messages },
  } = useChat();
  const { isViewOpen, closeView } = useViewBehindContext();

  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      key={"chat-dialogs"}
      variants={variants}
      initial={"initial"}
      animate={isViewOpen ? "shrink" : "animate"}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={closeView}
      className={cn(
        "no-scrollbar relative z-0 flex-1 overflow-y-auto pb-2",
        !isViewOpen && "md:rounded-t-[2.875rem]",
      )}
    >
      <article
        ref={scrollRef}
        className={cn(
          "flex flex-col transition-[padding]",
          !isViewOpen && "pt-10 md:rounded-t-[2.5rem]",
        )}
      >
        <ul
          role="list"
          aria-live="polite"
          className="mt-auto space-y-8 leading-[200%]"
        >
          <AnimatePresence mode="popLayout">
            {messages.map(({ id, text, sender, loading }) => {
              const isUser = sender === "user";
              const isAI = sender === "ai";
              return (
                <motion.li
                  key={id}
                  role="list-item"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className={cn(
                    "overflow-wrap-anywhere flex max-w-[90%] flex-col text-pretty break-words hyphens-auto",
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem et
          sed nisi! Ad neque recusandae rerum ducimus labore consequuntur
          voluptas tenetur dolorum atque aspernatur culpa mollitia, molestias
          asperiores rem totam laboriosam voluptate dolor eum porro.
          Reprehenderit odio culpa quod voluptatum enim, natus soluta dolor
          cumque voluptas iure aliquam sapiente, possimus illum sunt cum saepe
          ipsum rem voluptatibus optio esse modi. Expedita cumque molestiae
          vitae veritatis, aliquid et inventore facilis voluptatem commodi
          blanditiis. Dolorem corporis nobis possimus sit odit ex nam culpa fuga
          asperiores impedit velit voluptatum unde, facere at maxime illum quam
          commodi ipsa suscipit quasi quae animi perferendis laudantium quod?
          Voluptatem sapiente itaque autem quis aperiam, labore suscipit dicta,
          unde mollitia, similique eligendi aliquam qui corporis culpa ipsum!
          Sunt consectetur pariatur eos, sapiente, vel sit consequuntur ab non
          quos dolores obcaecati reprehenderit dicta dolore maxime laboriosam
          deserunt nostrum accusamus ullam voluptas ipsam quisquam ipsum ratione
          repellendus! Ipsa labore obcaecati itaque repellendus consequatur,
          voluptates assumenda ipsam vel delectus iste est quia! Ipsam,
          inventore! Vero repellat distinctio quisquam a neque delectus magnam
          magni, consectetur dolor laborum qui est cupiditate dignissimos
          dolores asperiores officia itaque molestiae eum cum totam quis
          similique? Esse, ipsum illo velit quam sit doloremque provident
          repellendus harum nemo
        </p>
      </article>
    </motion.div>
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
