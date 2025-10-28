"use client";

import { createContext, useContext, useState } from "react";

interface ViewBehindContextProps {
  isViewOpen: boolean;
  openView: () => void;
  closeView: () => void;
  toggleViewOpen: () => void;
}

const ViewBehindContext = createContext<ViewBehindContextProps | null>(null);

export function ViewBehindProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isViewOpen, setisViewOpen] = useState(false);

  const openView = () => setisViewOpen(true);
  const closeView = () => setisViewOpen(false);
  const toggleViewOpen = () => setisViewOpen((prev) => !prev);

  return (
    <ViewBehindContext.Provider
      value={{ isViewOpen, openView, closeView, toggleViewOpen }}
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
