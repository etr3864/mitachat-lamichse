"use client";

import { useRef } from "react";
import { MonoLabel } from "@/components/brand/MonoLabel";
import { GRAPH_VIEWBOX, graphNodes, nodeGeometry } from "@/content/graph";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { graphEdgePaths } from "./graph-paths";
import { useKnowledgeGraph } from "./useKnowledgeGraph";

/**
 * The vocabulary of the show as a schematic. On desktop it teaches itself:
 * dim the rest, name the links, and walk a hub until the pointer takes over.
 */
export function KnowledgeGraph() {
  const container = useRef<HTMLDivElement | null>(null);
  const scene = useRef<SVGSVGElement | null>(null);
  const reduced = useReducedMotion();

  useKnowledgeGraph(container, scene, !reduced);

  return (
    <div
      ref={container}
      className="relative h-[400px] overflow-hidden md:h-[560px] md:cursor-pointer"
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
        viewBox={`-72 -64 ${GRAPH_VIEWBOX.width + 144} ${GRAPH_VIEWBOX.height + 128}`}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="absolute inset-x-4 inset-y-10 block size-full md:inset-x-12 md:inset-y-14"
      >
        <g>
          {graphEdgePaths.map((edge, index) => (
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
            return (
              <g
                key={node.label}
                data-node={index}
                opacity={0}
                className="motion-reduce:opacity-100"
              >
                <circle
                  data-halo
                  cx={node.x}
                  cy={node.y}
                  r={17}
                  fill="none"
                  stroke="var(--color-amber)"
                  strokeWidth={0.8}
                  opacity={0}
                />
                <circle
                  data-dot
                  cx={node.x}
                  cy={node.y}
                  r={geometry.radius}
                  fill="var(--color-ink)"
                  stroke="var(--color-steel)"
                  strokeWidth={1.1}
                />
                <text
                  x={node.x}
                  y={node.y - 16}
                  textAnchor="middle"
                  fill="var(--color-faint)"
                  fontWeight={700}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: `${geometry.fontSize}px`,
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
            "linear-gradient(to bottom, var(--color-ink) 0%, transparent 10%, transparent 90%, var(--color-ink) 100%)",
        }}
      />
    </div>
  );
}
