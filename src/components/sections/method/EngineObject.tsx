"use client";

import { useRef, type RefObject } from "react";
import { useScrollDriver } from "@/hooks/useScrollDriver";
import { stickyProgress } from "@/lib/viewport";
import { drawEngine } from "./engine-object";
import { NARROW_BREAKPOINT, NARROW_TIMING, WIDE_TIMING } from "./method-timing";

/**
 * Full-viewport canvas for the method engine. Scroll poses it; the canvas never
 * plays. Centring lives in CSS so the hook that drives the mark never has to
 * know this element exists.
 */
export function EngineObject({
  stage,
  enabled = true,
}: {
  stage: RefObject<HTMLElement | null>;
  enabled?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const size = useRef({ w: 0, h: 0, dpr: 1 });

  useScrollDriver(() => {
    const canvas = canvasRef.current;
    const root = stage.current;
    if (!canvas || !root) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w !== size.current.w || h !== size.current.h || dpr !== size.current.dpr) {
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      size.current = { w, h, dpr };
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const narrow = window.innerWidth < NARROW_BREAKPOINT;
    drawEngine(ctx, stickyProgress(root), narrow ? NARROW_TIMING : WIDE_TIMING, narrow, w, h);
  }, enabled);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
