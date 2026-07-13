import { type RefObject, useEffect } from "react";

/**
 * Keep a scroll container pinned to the bottom whenever `watch` changes
 * (e.g. new/streamed chat messages). Encapsulating the DOM side effect in a
 * custom hook keeps components free of direct `useEffect` calls.
 */
export function useAutoScroll(
  ref: RefObject<HTMLElement | null>,
  watch: unknown,
) {
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [ref, watch]);
}
