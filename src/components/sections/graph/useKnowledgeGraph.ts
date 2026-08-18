"use client";

import { useEffect, useRef, type RefObject } from "react";
import { GRAPH_VIEWBOX, graphNodes, nodeGeometry } from "@/content/graph";
import { useScrollDriver } from "@/hooks/useScrollDriver";
import { clamp01, ease, mixHex, progress } from "@/lib/math";
import { palette } from "@/lib/tokens";
import { crossingProgress } from "@/lib/viewport";
import { graphEdgePaths, graphNeighbours } from "./graph-paths";

/** Entrance speed, in progress per frame. */
const DRAW_RATE = 0.022;
/** How quickly hover states approach their target each frame. */
const APPROACH = 0.18;
/** Pointer reach, in schematic units. */
const MAGNET_RADIUS = 175;
const PICK_RADIUS = 150;
const SETTLED = 0.004;
const WIDE = 768;
/** After the graph has drawn, wait this long then start the idle lesson. */
const DEMO_WAIT = 900;
const DEMO_HOLD = 3400;
/** Hubs the idle tour visits — the two centres plus one downstream. */
const DEMO_HUBS = [0, 6, 9] as const;

type NodeRefs = {
  group: SVGGElement;
  dot: SVGCircleElement;
  halo: SVGCircleElement;
  label: SVGTextElement;
};

type HoverState = { active: number; neighbour: number; magnet: number };

export function useKnowledgeGraph(
  container: RefObject<HTMLDivElement | null>,
  svg: RefObject<SVGSVGElement | null>,
  enabled = true,
) {
  const cache = useRef<{ nodes: NodeRefs[]; edges: SVGPathElement[] } | null>(null);
  const drawn = useRef(0);
  const pointer = useRef({ x: -9999, y: -9999, inside: false });
  const active = useRef(-1);
  const touched = useRef(false);
  const demoSlot = useRef(0);
  const demoAt = useRef(0);
  const hover = useRef<HoverState[]>(
    graphNodes.map(() => ({ active: 0, neighbour: 0, magnet: 0 })),
  );
  const edgeHover = useRef<number[]>(graphEdgePaths.map(() => 0));

  const request = useScrollDriver(() => {
    const root = container.current;
    const scene = svg.current;
    if (!root || !scene) return;

    if (!cache.current) {
      const groups = Array.from(scene.querySelectorAll<SVGGElement>("[data-node]"));
      cache.current = {
        nodes: groups.map((group) => ({
          group,
          dot: group.querySelector("circle[data-dot]") as SVGCircleElement,
          halo: group.querySelector("circle[data-halo]") as SVGCircleElement,
          label: group.querySelector("text") as SVGTextElement,
        })),
        edges: Array.from(scene.querySelectorAll<SVGPathElement>("[data-edge]")),
      };
    }

    const { nodes, edges } = cache.current;
    let keepGoing = false;
    const wide = window.innerWidth >= WIDE;

    // The graph draws itself once, on the way in, then stays put.
    if (drawn.current < 1 && crossingProgress(root) > 0.12) {
      drawn.current = Math.min(1, drawn.current + DRAW_RATE);
      if (drawn.current >= 1) demoAt.current = performance.now() + DEMO_WAIT;
      if (drawn.current < 1) keepGoing = true;
    }

    const entrance = ease(drawn.current);

    // Desktop: until someone actually points, the graph plays the lesson itself.
    let selected = active.current;
    if (wide && !touched.current && drawn.current >= 1) {
      const now = performance.now();
      if (now >= demoAt.current) {
        if (demoAt.current > 0 && now - demoAt.current >= DEMO_HOLD) {
          demoSlot.current = (demoSlot.current + 1) % DEMO_HUBS.length;
          demoAt.current = now;
        }
        selected = DEMO_HUBS[demoSlot.current];
      }
      keepGoing = true;
    }

    const { x: px, y: py, inside } = pointer.current;
    if (inside) {
      let best = -1;
      let bestDistance = Infinity;
      graphNodes.forEach((node, index) => {
        const distance = Math.hypot(node.x - px, node.y - py);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      if (bestDistance < PICK_RADIUS) {
        active.current = best;
        selected = best;
      }
    }

    const neighbours = selected >= 0 ? graphNeighbours[selected] : [];
    const isNeighbour = new Set(neighbours);
    const teaching = selected >= 0;

    nodes.forEach((node, index) => {
      const state = hover.current[index];
      const source = graphNodes[index];
      const geometry = nodeGeometry[source.weight];

      const trigger = (graphNodes[index].x / GRAPH_VIEWBOX.width) * 0.5;
      const shown = ease(progress(entrance, trigger, trigger + 0.45));

      const distance = Math.hypot(source.x - px, source.y - py);
      const raw = inside ? clamp01(1 - distance / MAGNET_RADIUS) : 0;
      const targets = {
        active: index === selected ? 1 : 0,
        neighbour: isNeighbour.has(index) ? 1 : 0,
        magnet: ease(raw) * (index === selected ? 1 : 0.4),
      };

      for (const key of ["active", "neighbour", "magnet"] as const) {
        state[key] += (targets[key] - state[key]) * APPROACH;
        if (Math.abs(targets[key] - state[key]) > SETTLED) keepGoing = true;
      }

      const related = Math.max(state.active, state.neighbour);
      const dim = teaching ? 0.14 + related * 0.86 : 1;
      node.group.style.opacity = (shown * dim).toFixed(3);

      const pull = distance > 0.01 ? state.magnet * 14 : 0;
      const cx = source.x + ((px - source.x) / (distance || 1)) * pull;
      const cy = source.y + ((py - source.y) / (distance || 1)) * pull;

      node.dot.setAttribute("cx", cx.toFixed(2));
      node.dot.setAttribute("cy", cy.toFixed(2));
      node.dot.setAttribute(
        "r",
        (geometry.radius + state.active * 3 + state.neighbour * 1.1 + state.magnet * 1.6).toFixed(2),
      );
      node.dot.style.stroke = mixHex(
        palette.steel,
        state.neighbour > state.active ? palette.light : palette.amber,
        Math.max(state.active, state.neighbour * 0.85),
      );
      node.dot.style.fill = mixHex(palette.ink, "#1C1608", state.active);

      node.halo.setAttribute("cx", cx.toFixed(2));
      node.halo.setAttribute("cy", cy.toFixed(2));
      node.halo.setAttribute("r", (17 + state.active * 4 + state.magnet * 5).toFixed(1));
      node.halo.style.opacity = (state.active * 0.5).toFixed(3);

      node.label.setAttribute("x", cx.toFixed(2));
      node.label.setAttribute("y", (cy - 16).toFixed(2));
      node.label.style.fill = mixHex(
        palette.faint,
        state.neighbour > state.active ? palette.body : palette.light,
        related,
      );
      node.label.style.fontWeight = state.active > 0.5 ? "700" : "400";
      node.label.style.fontSize = `${(geometry.fontSize + state.active * 2.4).toFixed(2)}px`;
    });

    edges.forEach((edge, index) => {
      const { a, b } = graphEdgePaths[index];
      const target = a === selected || b === selected ? 1 : 0;
      const value = edgeHover.current[index] + (target - edgeHover.current[index]) * APPROACH;
      edgeHover.current[index] = value;
      if (Math.abs(target - value) > SETTLED) keepGoing = true;

      const trigger =
        0.06 + (Math.min(graphNodes[a].x, graphNodes[b].x) / GRAPH_VIEWBOX.width) * 0.5;
      const revealed = ease(progress(entrance, trigger, trigger + 0.4));
      edge.style.strokeDashoffset = (1 - revealed).toFixed(3);
      edge.style.stroke = mixHex(palette.frame, palette.amber, value);
      edge.style.opacity = (revealed * (teaching ? 0.07 + value * 0.93 : 0.45)).toFixed(3);
      edge.style.strokeWidth = (1 + value * 1.4).toFixed(2);
    });

    return keepGoing;
  }, enabled);

  useEffect(() => {
    const root = container.current;
    const scene = svg.current;
    if (!root || !scene || !enabled) return;

    const toLocal = (event: PointerEvent) => {
      const matrix = scene.getScreenCTM();
      if (!matrix) return null;
      const point = scene.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      return point.matrixTransform(matrix.inverse());
    };

    const onMove = (event: PointerEvent) => {
      const local = toLocal(event);
      if (!local) return;
      if (!touched.current) {
        touched.current = true;
        active.current = -1;
      }
      pointer.current = { x: local.x, y: local.y, inside: true };
      request();
    };

    const onLeave = () => {
      pointer.current.inside = false;
      request();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [container, svg, request, enabled]);
}
