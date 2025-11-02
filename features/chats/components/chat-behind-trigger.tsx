"use client";

import { MoreHorizontal } from "lucide-react";
import { useViewBehindContext } from "../context/view-behind";
import { Button } from "@/components/ui/button";

export default function ChatBehindTrigger() {
  const { isViewOpen, toggleViewOpen } = useViewBehindContext();
  if (isViewOpen) return null;
  return (
    <div className="relative h-fit bg-blue-500">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={toggleViewOpen}
        className="bg-background/70 absolute right-3 bottom-0 z-50 my-2 rounded-full text-sm shadow-xl backdrop-blur-3xl"
      >
        <MoreHorizontal />
      </Button>
    </div>
  );
}
