import { graphEdges, graphNodes, graphPoint } from "@/content/graph";

/**
 * Edges are drawn as single quadratic curves. The bow is derived from the edge
 * index rather than randomised, so the server and client render the same path
 * and the schematic stays stable between builds.
 */
const bowFor = (index: number) => ((index % 5) - 2) * 0.055;

export type GraphEdge = {
  a: number;
  b: number;
  d: string;
};

function edgePaths(points: ReadonlyArray<{ x: number; y: number }>): GraphEdge[] {
  return graphEdges.map(([a, b], index) => {
    const from = points[a];
    const to = points[b];

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const bow = length * bowFor(index);

    const cx = (from.x + to.x) / 2 + (-dy / length) * bow;
    const cy = (from.y + to.y) / 2 + (dx / length) * bow;

    return {
      a,
      b,
      d: `M${from.x} ${from.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${to.x} ${to.y}`,
    };
  });
}

export const graphEdgePaths = edgePaths(graphNodes);
export const graphEdgePathsMobile = edgePaths(graphNodes.map((node) => graphPoint(node, true)));

/** Neighbour lists, precomputed so hover does not scan every edge each frame. */
export const graphNeighbours: number[][] = graphNodes.map(() => []);
for (const { a, b } of graphEdgePaths) {
  graphNeighbours[a].push(b);
  graphNeighbours[b].push(a);
}
