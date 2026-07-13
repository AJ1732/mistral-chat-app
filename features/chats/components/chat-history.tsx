"use client";
import { Check, MoreHorizontal, Pencil, Trash, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/provider/notifications";

const MOCK_CHAT_COUNT = 12;

export function ChatHistory() {
  const chats = Array.from({ length: MOCK_CHAT_COUNT });
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedChats, setSelectedChats] = useState<Set<number>>(new Set());
  const { addNotification } = useNotifications();

  const toggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
    setSelectedChats(new Set());
  };

  const toggleChatSelection = (index: number) => {
    setSelectedChats((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const onDeleteSelected = () => {
    if (selectedChats.size === 0) return;
    const count = selectedChats.size;
    addNotification({
      message: `Deleted ${count} ${count === 1 ? "chat" : "chats"}`,
      type: "info",
      duration: 3000,
    });
    setIsSelectMode(false);
    setSelectedChats(new Set());
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "sticky top-0 flex items-center justify-between gap-8 bg-neutral-50/70 p-3 pb-2 backdrop-blur-2xl",
          "dark:bg-neutral-900",
        )}
      >
        <p>
          {isSelectMode ? (
            <>
              You have selected{" "}
              <span className="text-orange-accent-500 font-semibold">
                {selectedChats.size}
              </span>{" "}
              {selectedChats.size === 1 ? "chat" : "chats"}
            </>
          ) : (
            <>
              You have{" "}
              <span className="text-orange-accent-500 font-semibold">
                {MOCK_CHAT_COUNT}
              </span>{" "}
              chats
            </>
          )}
        </p>
        {isSelectMode && (
          <div className="flex gap-2">
            <Button size={"icon"} variant={"ghost"} onClick={toggleSelectMode}>
              <X />
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              disabled={selectedChats.size === 0}
              onClick={onDeleteSelected}
            >
              <Trash />
            </Button>
          </div>
        )}
      </div>

      <ul role="list" aria-live="polite" className="flex flex-col">
        <AnimatePresence>
          {chats.map((_, i) => {
            const isSelected = selectedChats.has(i);
            return (
              <motion.li
                // TODO: swap index key for a stable chat id once the list is
                // backed by real data (breaks exit animations otherwise).
                key={i}
                role={isSelectMode ? "checkbox" : undefined}
                aria-checked={isSelectMode ? isSelected : undefined}
                aria-label={isSelectMode ? `Select chat ${i + 1}` : undefined}
                tabIndex={isSelectMode ? 0 : undefined}
                onClick={() => isSelectMode && toggleChatSelection(i)}
                onKeyDown={
                  isSelectMode
                    ? (e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleChatSelection(i);
                        }
                      }
                    : undefined
                }
                className={cn(
                  "grid cursor-pointer grid-cols-[1fr_auto] bg-neutral-50/80 p-3 hover:bg-orange-50/70",
                  "dark:bg-neutral-900 dark:hover:bg-orange-400/20",
                  isSelectMode &&
                    isSelected &&
                    "bg-orange-100/90 dark:bg-orange-400/30",
                  isSelectMode && "grid-cols-[auto_1fr_auto]",
                )}
              >
                {isSelectMode && (
                  <div aria-hidden="true" className="flex items-center pr-3">
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border-2 transition-colors",
                        isSelected
                          ? "border-orange-500 bg-orange-500"
                          : "border-neutral-300 dark:border-neutral-600",
                      )}
                    >
                      {isSelected && (
                        <Check
                          className="h-full w-full text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                  </div>
                )}
                <span className="line-clamp-2 text-pretty hyphens-auto">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </span>
                <ChatDropdownMenu
                  onSelectClick={toggleSelectMode}
                  isSelectMode={isSelectMode}
                />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function ChatDropdownMenu({
  onSelectClick,
  isSelectMode,
}: {
  onSelectClick: () => void;
  isSelectMode: boolean;
}) {
  const { addNotification } = useNotifications();

  const onRenameChat = () => {
    addNotification({ message: "Renamed Chat", type: "info", duration: 3000 });
  };
  const onDeleteChat = () => {
    addNotification({ message: "Delete Chat", type: "info", duration: 3000 });
  };

  if (isSelectMode) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "min-w-60 space-y-0.5 rounded-2xl bg-neutral-50/70 p-0.5 backdrop-blur-2xl",
          "[&>div]:h-10 [&>div]:cursor-pointer [&>div]:rounded-none [&>div]:bg-white/80 [&>div:first-child]:rounded-t-[0.75rem] [&>div:last-child]:rounded-b-[0.75rem]",
          "dark:bg-neutral-950/70! dark:[&>div]:bg-neutral-950/80!",
        )}
      >
        <DropdownMenuItem onSelect={onRenameChat}>
          <Pencil /> Rename
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onSelectClick}>
          <Check /> Select
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onDeleteChat}>
          <Trash /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
