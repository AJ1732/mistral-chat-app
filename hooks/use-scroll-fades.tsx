"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "horizontal" | "vertical";

type Options = {
  /** pixel threshold to avoid tiny subpixel noise (default: 1) */
  threshold?: number;
  /** which axis to watch (default: horizontal) */
  direction?: Direction;
};

export function useScrollFades<T extends HTMLElement = HTMLElement>(
  options: Options = {},
) {
  const { threshold = 1, direction = "horizontal" } = options;

  // callback ref + ref.current for stable access
  const nodeRef = useRef<T | null>(null);
  const ref = useCallback((el: T | null) => {
    nodeRef.current = el;
  }, []);

  // visible flags for each side
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  // keep previous values to avoid repeated setState
  const prevStartRef = useRef<boolean>(false);
  const prevEndRef = useRef<boolean>(false);

  // rAF id to throttle scroll events
  const rafRef = useRef<number | null>(null);

  const compute = useCallback(() => {
    const el = nodeRef.current;
    if (!el) return;

    if (direction === "horizontal") {
      const left = el.scrollLeft > threshold;
      const right = el.scrollWidth - el.clientWidth - el.scrollLeft > threshold;

      if (left !== prevStartRef.current) {
        prevStartRef.current = left;
        setShowStart(left);
      }
      if (right !== prevEndRef.current) {
        prevEndRef.current = right;
        setShowEnd(right);
      }
    } else {
      const top = el.scrollTop > threshold;
      const bottom =
        el.scrollHeight - el.clientHeight - el.scrollTop > threshold;

      if (top !== prevStartRef.current) {
        prevStartRef.current = top;
        setShowStart(top);
      }
      if (bottom !== prevEndRef.current) {
        prevEndRef.current = bottom;
        setShowEnd(bottom);
      }
    }
  }, [direction, threshold]);

  // wrapper that schedules compute via requestAnimationFrame
  const scheduleCompute = useCallback(() => {
    if (rafRef.current !== null) return; // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      compute();
    });
  }, [compute]);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    // initial compute
    compute();

    // scroll listener (passive)
    el.addEventListener("scroll", scheduleCompute, { passive: true });

    // resize observer for content/size changes
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(scheduleCompute);
      ro.observe(el);
    }

    // window resize fallback
    window.addEventListener("resize", scheduleCompute);

    return () => {
      el.removeEventListener("scroll", scheduleCompute);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", scheduleCompute);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // intentionally not including compute in deps so scheduling remains stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleCompute]);

  // expose clear/refresh method
  const refresh = useCallback(() => compute(), [compute]);

  return {
    ref,
    showStart,
    showEnd,
    refresh,
  } as const;
}
