"use client";

import { useEffect, useRef } from "react";

/**
 * Frame callback. Return `true` to ask for another frame — that is how the
 * settling animations (pointer magnetism, entrance draws) keep running after
 * scrolling has stopped.
 */
export type FrameCallback = () => boolean | void;

/**
 * Drives imperative DOM writes from scroll and resize, coalesced into one rAF
 * per frame. Sections animate by mutating refs instead of re-rendering, which
 * keeps the sticky scroll scenes smooth.
 */
export function useScrollDriver(onFrame: FrameCallback, enabled = true) {
  const frameRef = useRef<number | null>(null);
  const callbackRef = useRef(onFrame);
  callbackRef.current = onFrame;

  const requestRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      frameRef.current = null;
      if (callbackRef.current() === true) request();
    };

    const request = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = request;

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [enabled]);

  /** Kick a frame from outside the scroll loop (pointer events, timers). */
  return useRef((() => requestRef.current()) as () => void).current;
}
