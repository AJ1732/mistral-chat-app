"use client";

import { createContext, useContext, useState } from "react";


interface ViewBehindContextProps {
  isViewOpen: boolean;
  activeView: ViewType;
  openView: () => void;
  closeView: () => void;
  toggleViewOpen: () => void;
  selectActiveView: (view: ViewType) => void;
}

const ViewBehindContext = createContext<ViewBehindContextProps | null>(null);

export function ViewBehindProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isViewOpen, setisViewOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>("chats");

  const openView = () => setisViewOpen(true);
  const closeView = () => setisViewOpen(false);
  const toggleViewOpen = () => setisViewOpen((prev) => !prev);
  const selectActiveView = (view: ViewType) => setActiveView(view);

  return (
    <ViewBehindContext.Provider
      value={{
        isViewOpen,
        activeView,
        openView,
        closeView,
        toggleViewOpen,
        selectActiveView,
      }}
    >
      {children}
    </ViewBehindContext.Provider>
  );
}

export const useViewBehindContext = () => {
  const context = useContext(ViewBehindContext);
  if (!context) {
    throw new Error(
      "useViewBehindContext must be used within ViewBehindProvider",
    );
  }
  return context;
};
