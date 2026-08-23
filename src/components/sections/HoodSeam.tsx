"use client";

import { useRef } from "react";
import { useNodeMap } from "@/hooks/useNodeMap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDriver } from "@/hooks/useScrollDriver";
import { ease } from "@/lib/math";
import { crossingProgress } from "@/lib/viewport";
import { palette } from "@/lib/tokens";

/**
 * The seam as a section break: one segment of the rule lifts on its hinge and
 * turns amber as it passes through the viewport. Motion happens once, on the way
 * in — no continuous pulse.
 */
export function HoodSeam() {
  const seam = useRef<HTMLDivElement | null>(null);
  const { nodes, setNode } = useNodeMap<HTMLSpanElement>();
  const reduced = useReducedMotion();

  useScrollDriver(() => {
    const root = seam.current;
    if (!root) return;

    const lifted = ease(crossingProgress(root, 0.72));
    const { hinge, amber, pivot } = nodes.current;

    if (hinge) hinge.style.transform = `rotate(${(-9 * lifted).toFixed(2)}deg)`;
    if (amber) amber.style.opacity = lifted.toFixed(3);
    if (pivot) pivot.style.borderColor = lifted > 0.15 ? palette.amber : palette.blueprint;
  }, !reduced);

  return (
    <div ref={seam} className="relative overflow-x-clip px-6 md:px-10" aria-hidden="true">
      <div className="flex h-[120px] items-center">
        <span className="h-px flex-1 bg-frame" />
        <span
          ref={setNode("hinge")}
          className="relative block h-px w-[120px] origin-[100%_50%]"
        >
          <span className="absolute inset-0 bg-blueprint" />
          <span ref={setNode("amber")} className="absolute inset-0 bg-amber opacity-0" />
          <span
            ref={setNode("pivot")}
            className="absolute top-1/2 left-full -mt-[3.5px] -ml-[3.5px] size-[7px] rounded-full border border-blueprint bg-ink"
          />
        </span>
        <span className="h-px flex-1 bg-frame" />
      </div>
    </div>
  );
}
