export const SIDEBAR_VARIANTS = {
  open: {
    width: "20rem",
    height: "auto",
    padding: "1px",
    border: "1px solid #e5e5e5",
    borderRadius: "0.5rem",
    bottom: "3.5rem",
    transition: {
      when: "afterChildren",
      duration: 0.3,
      ease: "easeOut",
      // delay: 0.8,
    },
  },
  closed: {
    width: "3rem",
    height: "3rem",
    padding: 0,
    border: "1px solid #e5e5e5",
    borderRadius: "0.5rem",
    bottom: "0rem",
    transition: { when: "beforeChildren", duration: 0.3, ease: "easeIn" },
  },
} as const;

export const SIDEBAR_LABEL_VARIANTS = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const SIDEBAR_MENU_VARIANTS = {
  open: { opacity: 1 },
  closed: { opaacity: 0 },
};

export const SIDEBAR_ITEM_VARIANTS = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween" as const,
      ease: "easeOut" as const,
      duration: 0.2,
      delay: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: 10,
    transition: {
      type: "tween" as const,
      ease: "easeIn" as const,
      duration: 0.1,
    },
  },
};
