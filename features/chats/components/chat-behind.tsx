"use client";
import { type LucideIcon, MessageCircle, Search, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useViewBehindContext } from "../context/view-behind";
import { ChatHistory } from "./chat-history";
import { ProfileView } from "./profile";

type ViewConfig = {
  label: string;
  icon: LucideIcon;
  component: React.ComponentType;
};

const VIEWS: Record<ViewType, ViewConfig> = {
  chats: {
    label: "chats",
    icon: User,
    component: ChatHistory,
  },
  profile: {
    label: "profile",
    icon: MessageCircle,
    component: ProfileView,
  },
};

const variants = {
  open: { scaleY: 1, scaleX: 1, height: "auto", opacity: 1, translateY: 0 },
  closed: {
    scaleY: 1,
    scaleX: 0.375,
    height: "0rem",
    opacity: 1,
    translateY: "0.75rem",
  },
};

export default function ChatBehind() {
  const {
    activeView,
    isViewOpen,
    toggleViewOpen,
    selectActiveView,
    closeView,
  } = useViewBehindContext();

  const isChats = activeView === "chats";
  const { label, icon: Icon, component: Component } = VIEWS[activeView];

  // Auto-focus the first button once it mounts (the view opens). A callback ref
  // fires exactly when the node attaches, so no effect is needed. The short
  // delay lets the open animation start first; cleanup runs on detach.
  const focusOnOpen = useCallback((node: HTMLButtonElement | null) => {
    if (!node) return;
    const timeoutId = setTimeout(() => node.focus(), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {/* Backdrop for click-outside-to-close */}
      <AnimatePresence>
        {isViewOpen && (
          <motion.div
            key="chat-behind-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            onClick={closeView}
            className="fixed inset-0 z-30 bg-transparent"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.section
        layout
        key={"chat-behind"}
        variants={variants}
        initial="closed"
        animate={isViewOpen ? "open" : "closed"}
        exit="closed"
        transition={{
          duration: 0.25,
          ease: [0.45, 0.05, 0.55, 0.95],
        }}
        className={cn(
          "relative z-40 -mx-4 -mt-3 flex origin-top flex-col overflow-hidden px-4 pt-3",
          "md:-mx-3 md:-mt-3 md:px-3 md:pt-3",
          "rounded-b-[1.5rem] md:rounded-t-[3.5rem]",
          { "shadow-2xl backdrop-blur-2xl": isViewOpen },
          { "rounded-b-[3.5rem]": !isViewOpen },
        )}
        style={{
          transformOrigin: "top",
          willChange: "transform, opacity",
        }}
      >
        <AnimatePresence mode="sync">
          {isViewOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                style={{
                  transformOrigin: "top",
                  willChange: "transform, opacity",
                }}
                className={cn(
                  "flex flex-1 flex-col drop-shadow-xl dark:bg-neutral-900",
                  "no-scrollbar mt-11 overflow-y-auto rounded-[1.125rem] border",
                )}
              >
                <Component />
              </motion.div>

              <motion.div
                key={"view-actions"}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                className={cn(
                  "inset-x-0 bottom-0 mt-3 mb-3 grid grid-cols-[auto_1fr_auto] gap-x-3 drop-shadow-xl",
                  "[&_button,&_h2]:bg-background/60! [&_button,&_h2]:rounded-full [&_button,&_h2]:backdrop-blur-3xl",
                )}
              >
                <Button
                  ref={focusOnOpen}
                  size={"icon"}
                  variant={"outline"}
                  onClick={() =>
                    selectActiveView(isChats ? "profile" : "chats")
                  }
                >
                  <Icon />
                </Button>

                <div className="mx-auto flex w-fit items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      selectActiveView(isChats ? "profile" : "chats")
                    }
                    className="grid h-9 min-w-28 cursor-pointer place-content-center border px-5 text-sm capitalize"
                  >
                    {label}
                  </button>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full"
                  >
                    <Search />
                  </Button>
                </div>

                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={toggleViewOpen}
                  className="ml-auto"
                >
                  <X />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                style={{
                  transformOrigin: "top",
                  willChange: "transform, opacity",
                }}
                className="bg-orange-accent-400 dark:bg-orange-accent-400/60 pointer-events-none absolute inset-x-0 bottom-0 -z-[1] h-40 translate-y-1/2 rounded-b-[1.125rem] blur-3xl"
              />
            </>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}
