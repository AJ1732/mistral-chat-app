"use client";

import { useViewBehindContext } from "../context/view-behind";

export default function ChatBehindTrigger() {
  const { toggleViewOpen } = useViewBehindContext();

  return <button onClick={toggleViewOpen}>Open Top</button>;
}
