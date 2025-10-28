import { DynamicIsland } from "@/components/elements";
import {
  ChatBehind,
  ChatBehindTrigger,
  ChatDialogs,
  Chatbox,
} from "@/features/chats/components";
import { ViewBehindProvider } from "@/features/chats/context/view-behind";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  return (
    <main className="md:content-grid relative min-h-dvh grid-rows-[1fr] place-content-start">
      <section
        className={cn(
          "absolute my-4 max-md:inset-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
          "md:max-w-wPhone md:max-h-hPhone bg-phone m-auto grid size-full grid-rows-[1fr] gap-2 p-4 md:rounded-[3.5rem] md:border md:p-3",
          "transition-colors duration-300 ease-out",
        )}
      >
        <DynamicIsland />

        <ViewBehindProvider>
          <>
            <ChatBehind />
            <ChatDialogs />
            <ChatBehindTrigger />
          </>
        </ViewBehindProvider>

        <Chatbox />
        <div
          aria-hidden
          className="mx-auto mt-2 h-4 w-8 rounded-full border bg-black"
        />
      </section>
    </main>
  );
}
