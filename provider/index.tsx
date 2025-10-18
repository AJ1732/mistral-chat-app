import { Suspense } from "react";
import { ChatProvider } from "@/features/chats/context";

import NotificationsProvider from "./notifications";
import TanstackProvider from "./tanstack";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <TanstackProvider>
        <NotificationsProvider>
          <ChatProvider>{children}</ChatProvider>
        </NotificationsProvider>
      </TanstackProvider>
    </Suspense>
  );
}
