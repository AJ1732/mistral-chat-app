"use client";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Search, User, X, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ChatHistory } from "./chat-history";
import { useViewBehindContext } from "../context/view-behind";
import { ProfileView } from "./profile";

type ViewConfig = {
  label: string;
  icon: LucideIcon;
  component: React.ComponentType<any>;
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
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

export default function ChatBehind() {
  const { activeView, isViewOpen, toggleViewOpen, selectActiveView } =
    useViewBehindContext();

  const isChats = activeView === "chats";
  const { label, icon: Icon, component: Component } = VIEWS[activeView];

  return (
    <motion.section
      layout
      key={"chat-behind"}
      variants={variants}
      initial="closed"
      animate={isViewOpen ? "open" : "closed"}
      exit="closed"
      transition={{ duration: 0.25 }}
      className={cn(
        "relative z-40 -mx-4 flex h-full flex-col overflow-hidden px-4 backdrop-blur-2xl md:-mx-3 md:px-3",
        "rounded-b-[1.125rem] md:rounded-t-[2.875rem]",
      )}
      style={{ willChange: "height, opacity" }}
    >
      <div
        className={cn(
          "flex flex-1 flex-col bg-neutral-50 drop-shadow-xl dark:bg-neutral-900",
          "no-scrollbar mt-11 max-h-[calc((59.5rem*0.75)-2.25rem)] min-h-[calc((30rem*0.75)-2.25rem)] overflow-y-auto rounded-[1.125rem] border p-3",
        )}
      >
        {/* <Component /> */}
      </div>
      <AnimatePresence>
        {isViewOpen && (
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            exit={{ y: -12, opacity: 0, transition: { duration: 0.1 } }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 22,
              duration: 0.3,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className={cn(
              "inset-x-0 bottom-0 mt-3 mb-3 grid grid-cols-[auto_1fr_auto] gap-x-3 drop-shadow-xl",
              "[&_button,&_h2]:bg-background/60 [&_button,&_h2]:rounded-full [&_button,&_h2]:backdrop-blur-3xl",
            )}
          >
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => selectActiveView(isChats ? "profile" : "chats")}
            >
              <Icon />
            </Button>

            <div className="mx-auto flex w-fit items-center justify-center gap-2">
              <h2 className="grid h-9 min-w-28 place-content-center border px-5 text-sm capitalize">
                {label}
              </h2>
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
        )}
      </AnimatePresence>
      {isViewOpen && (
        <div className="bg-orange-accent-400 pointer-events-none absolute inset-x-0 bottom-0 -z-[1] h-40 translate-y-1/2 rounded-b-[1.125rem] blur-3xl" />
      )}
    </motion.section>
  );
}
