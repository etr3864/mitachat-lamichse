"use client";

import { type RefObject } from "react";
import { STACK_VIEW_HEIGHT, stratumBaseTransform } from "@/components/brand/mark-geometry";
import { methodLayers } from "@/content/method";
import { useNodeMap } from "@/hooks/useNodeMap";
import { useScrollDriver } from "@/hooks/useScrollDriver";
import { clamp01, progress, window01 } from "@/lib/math";
import { palette } from "@/lib/tokens";
import { stickyProgress } from "@/lib/viewport";
import {
  CALLOUT_GAP,
  NARROW_BREAKPOINT,
  NARROW_TIMING,
  WIDE_TIMING,
} from "./method-timing";

const MARK_VIEW_HEIGHT = STACK_VIEW_HEIGHT;

/**
 * Drives the second half of the scene: the mark rebuilds one stratum at a time
 * with a callout on each layer. The engine itself is posed by EngineObject from
 * the same scroll progress — this hook never writes to it.
 *
 * Centring stays in the markup, on the `translate` property. This hook only ever
 * writes `transform`, and the browser composes the two.
 */
export function useMethodStage(stage: RefObject<HTMLElement | null>, enabled = true) {
  const { nodes, setNode } = useNodeMap<HTMLElement | SVGElement>();

  useScrollDriver(() => {
    const root = stage.current;
    if (!root) return;

    const p = stickyProgress(root);
    const narrow = window.innerWidth < NARROW_BREAKPOINT;
    const timing = narrow ? NARROW_TIMING : WIDE_TIMING;
    const map = nodes.current;

    const ring = map.ring;
    if (ring) {
      const revealed = window01(p, timing.ringStart, timing.ringLength);
      ring.style.opacity = (revealed * 0.7).toFixed(3);
      ring.style.transform = `rotate(${(p * 34).toFixed(2)}deg) scale(${(0.9 + 0.1 * revealed).toFixed(3)})`;
    }

    const assembled = window01(p, timing.markStart, timing.markLength);
    const mark = map.mark;
    if (mark) {
      mark.style.opacity = assembled.toFixed(3);
      mark.style.transform = `scale(${(0.9 + 0.1 * assembled).toFixed(3)})`;
    }

    const markBox = mark?.getBoundingClientRect() ?? { width: 160, height: 200 };
    const markScale = markBox.height / MARK_VIEW_HEIGHT;

    methodLayers.forEach((layer, index) => {
      const start = timing.layerStarts[index];
      const side = index % 2 === 0 ? 1 : -1;

      const local = progress(p, start - 0.02, start + 0.1);
      const last = index === timing.layerStarts.length - 1;
      const outro = last
        ? 0
        : progress(p, start + timing.layerHold, start + timing.layerHold + timing.layerOut);
      const visible = clamp01(local / 0.35) * (1 - outro);

      const stratum = map[`stratum-${index}`];
      if (stratum) {
        const arrived = window01(p, start, timing.layerIn);
        const slide = (side * 30 * (1 - arrived)).toFixed(2);
        stratum.setAttribute(
          "transform",
          `${stratumBaseTransform(index)} translate(${slide} 0)`.trim(),
        );
        stratum.style.opacity = arrived.toFixed(3);
        stratum.style.filter = narrow && visible < 0.5 ? "brightness(0.38)" : "";
      }

      const callout = map[`callout-${index}`];
      if (!callout) return;

      const width = callout.getBoundingClientRect().width || 300;
      const x = narrow ? 0 : side * (markBox.width / 2 + CALLOUT_GAP + width / 2);
      const drift = narrow ? 0 : side * (1 - local) * 26;
      const offsetY = narrow
        ? markBox.height / 2 + 56
        : (layer.markY - MARK_VIEW_HEIGHT / 2) * markScale;

      const row = map[`row-${index}`];
      if (row) {
        row.style.flexDirection = narrow || side === 1 ? "row" : "row-reverse";
        row.style.textAlign = narrow || side === 1 ? "right" : "left";
      }

      const leader = map[`leader-${index}`];
      if (leader) {
        leader.style.width = narrow
          ? "0px"
          : `${(CALLOUT_GAP * clamp01(local / 0.6)).toFixed(1)}px`;
        leader.style.backgroundColor = visible > 0.6 ? palette.steelLight : palette.blueprint;
      }

      callout.style.opacity = visible.toFixed(3);
      callout.style.transform = `translate(${(x + drift).toFixed(1)}px, ${offsetY.toFixed(1)}px)`;
    });

    const bar = map.bar;
    if (bar) bar.style.width = `${(p * 100).toFixed(2)}%`;
  }, enabled);

  return setNode;
}
