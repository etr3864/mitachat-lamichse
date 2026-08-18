"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { MonoLabel } from "@/components/brand/MonoLabel";
import {
  GRAPH_VIEWBOX,
  GRAPH_VIEWBOX_MOBILE,
  GRAPH_WIDE,
  graphNodes,
  graphPoint,
  nodeGeometry,
} from "@/content/graph";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { graphEdgePaths, graphEdgePathsMobile } from "./graph-paths";
import { useKnowledgeGraph } from "./useKnowledgeGraph";

function useWideLayout() {
  const [wide, setWide] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia(`(min-width: ${GRAPH_WIDE}px)`);
    const sync = () => setWide(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return wide;
}

/**
 * The vocabulary of the show as a schematic. Desktop teaches with hover.
 * Mobile turns the map on its side and fills it as you walk down the page.
 */
export function KnowledgeGraph() {
  const container = useRef<HTMLDivElement | null>(null);
  const scene = useRef<SVGSVGElement | null>(null);
  const reduced = useReducedMotion();
  const wide = useWideLayout();
  const mobile = !wide;
  const box = mobile ? GRAPH_VIEWBOX_MOBILE : GRAPH_VIEWBOX;
  const paths = mobile ? graphEdgePathsMobile : graphEdgePaths;

  useKnowledgeGraph(container, scene, !reduced, wide);

  return (
    <div
      ref={container}
      className="relative h-[1240px] overflow-hidden md:h-[560px] md:cursor-pointer"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "radial-gradient(70% 130% at 50% 50%, var(--color-panel) 0%, var(--color-ink) 72%)",
        }}
      />

      <svg
        ref={scene}
        viewBox={
          mobile
            ? `-16 -24 ${box.width + 32} ${box.height + 48}`
            : `-72 -64 ${box.width + 144} ${box.height + 128}`
        }
        fill="none"
        preserveAspectRatio={mobile ? "xMidYMin meet" : "xMidYMid meet"}
        aria-hidden="true"
        className="absolute inset-x-3 top-14 bottom-6 block size-full md:inset-x-12 md:inset-y-14"
      >
        <g>
          {paths.map((edge, index) => (
            <path
              key={index}
              data-edge
              d={edge.d}
              stroke="var(--color-frame)"
              strokeWidth={1}
              fill="none"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1}
              className="motion-reduce:[stroke-dashoffset:0]"
            />
          ))}
        </g>

        <g>
          {graphNodes.map((node, index) => {
            const geometry = nodeGeometry[node.weight];
            const point = graphPoint(node, mobile);
            return (
              <g
                key={node.label}
                data-node={index}
                opacity={0}
                className="motion-reduce:opacity-100"
              >
                <circle
                  data-halo
                  cx={point.x}
                  cy={point.y}
                  r={17}
                  fill="none"
                  stroke="var(--color-amber)"
                  strokeWidth={0.8}
                  opacity={0}
                />
                <circle
                  data-dot
                  cx={point.x}
                  cy={point.y}
                  r={geometry.radius}
                  fill="var(--color-ink)"
                  stroke="var(--color-steel)"
                  strokeWidth={1.1}
                />
                <text
                  x={point.x}
                  y={point.y - (mobile ? 18 : 16)}
                  textAnchor="middle"
                  fill="var(--color-faint)"
                  fontWeight={700}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: `${geometry.fontSize * (mobile ? 1.18 : 1)}px`,
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="pointer-events-none absolute top-6 right-6 z-10 flex items-center gap-2.5 md:right-10">
        <MonoLabel tone="faint" size="xs">
          KNOWLEDGE GRAPH
        </MonoLabel>
        <span className="size-1 rounded-full bg-amber" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-ink) 0%, transparent 8%, transparent 92%, var(--color-ink) 100%)",
        }}
      />
    </div>
  );
}
