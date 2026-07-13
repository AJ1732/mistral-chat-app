import { useEffect } from "react";

/**
 * Run an effect exactly once, on mount. The only sanctioned way for a component
 * to reach for mount-time external-system setup without calling `useEffect`
 * directly. For anything reactive, derive it, handle it in an event, or use a
 * data-fetching library instead.
 */
export function useMountEffect(effect: () => void | (() => void)) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
