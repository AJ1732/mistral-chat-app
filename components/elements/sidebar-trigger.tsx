"use client";

import { SetStateAction, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  SIDEBAR_ITEM_VARIANTS,
  SIDEBAR_MENU_VARIANTS,
  SIDEBAR_VARIANTS,
} from "./variants";
// import { Input } from "../ui/input";

export default function SidebarTrigger() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  // const [isSSearchOpen, setIsSSearchOpen] = useState(false);
  // const toggleSearch = () => setIsSSearchOpen((prev) => !prev);

  return (
    <div className="relative mx-3 mb-4 flex">
      <Sidebar {...{ isSidebarOpen, setIsSidebarOpen }} />

      {/* <div className="ml-auto flex items-center gap-2">
        {isSSearchOpen && (
          <Input
            className={cn(
              "h-[2.875rem] w-0 text-xs shadow-none transition-[width] duration-300 ease-out placeholder:text-xs",
              { "w-auto": isSSearchOpen },
            )}
            placeholder="Search Chats"
          />
        )}
        {isSidebarOpen && (
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={toggleSearch}
            className={cn(
              "hover:bg-background/90 border-border z-50 mr-px mb-px size-[2.875rem] border-0 shadow-none backdrop-blur-2xl",
            )}
          >
            <Search />
          </Button>
        )}
      </div> */}

      <Button
        size={"icon"}
        variant={"outline"}
        onClick={toggleSidebar}
        className={cn(
          "hover:bg-background/90 border-border z-50 mr-px mb-px ml-auto size-[2.875rem] border-0 shadow-none backdrop-blur-2xl",
        )}
      >
        <LayoutDashboard />
      </Button>
    </div>
  );
}

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: SetStateAction<boolean>) => void;
}) {
  return (
    <motion.aside
      layout
      key={"sidebar"}
      initial={"closed"}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={SIDEBAR_VARIANTS}
      onMouseLeave={() => setIsSidebarOpen(false)}
      className={cn(
        "absolute right-0 z-50 flex origin-bottom-right flex-col overflow-hidden bg-white/50 backdrop-blur-3xl dark:!border-neutral-800 dark:bg-neutral-950",
      )}
    >
      <motion.menu
        animate={isSidebarOpen ? "open" : "closed"}
        variants={SIDEBAR_MENU_VARIANTS}
        className={cn(
          "no-scrollbar grid max-h-[calc(100dvh-16rem)] gap-px overflow-hidden overflow-y-auto",
        )}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <motion.li
            key={item}
            variants={SIDEBAR_ITEM_VARIANTS}
            className={cn(
              "flex h-12 items-center gap-2 border px-3 first:rounded-t-sm last:rounded-b-sm",
            )}
          >
            <span
              aria-hidden
              className="bg-orange-accent-500 size-1 rounded-full"
            />
            Item {item}
          </motion.li>
        ))}
      </motion.menu>
    </motion.aside>
  );
}
