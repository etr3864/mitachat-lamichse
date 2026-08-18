/**
 * The knowledge-graph separator: the vocabulary the podcast keeps returning to.
 * Coordinates live in the 1210 × 420 schematic space defined by GRAPH_VIEWBOX.
 * `weight` only changes dot size and label size — never colour.
 */
export type GraphNode = {
  label: string;
  x: number;
  y: number;
  weight: "hub" | "node" | "leaf";
};

export const GRAPH_VIEWBOX = { width: 1210, height: 420 } as const;

/** Portrait schematic: the left-to-right story turns into a top-to-bottom walk. */
export const GRAPH_VIEWBOX_MOBILE = { width: 400, height: 1120 } as const;

export const GRAPH_WIDE = 768;

export function graphPoint(node: GraphNode, mobile: boolean) {
  if (!mobile) return { x: node.x, y: node.y };
  const padX = 36;
  const padY = 64;
  return {
    x: padX + (node.y / GRAPH_VIEWBOX.height) * (GRAPH_VIEWBOX_MOBILE.width - padX * 2),
    y: padY + (node.x / GRAPH_VIEWBOX.width) * (GRAPH_VIEWBOX_MOBILE.height - padY * 2),
  };
}

export const graphNodes: GraphNode[] = [
  { label: "מודל בסיס", x: 120, y: 210, weight: "hub" },
  { label: "נתוני אימון", x: 250, y: 96, weight: "node" },
  { label: "טוקניזציה", x: 268, y: 320, weight: "node" },
  { label: "אמבדינגס", x: 400, y: 190, weight: "node" },
  { label: "חלון הקשר", x: 520, y: 84, weight: "node" },
  { label: "פיין־טיונינג", x: 548, y: 300, weight: "node" },
  { label: "RAG", x: 664, y: 178, weight: "hub" },
  { label: "הזיות", x: 700, y: 356, weight: "node" },
  { label: "סוכנים", x: 800, y: 96, weight: "node" },
  { label: "הסקה", x: 840, y: 250, weight: "node" },
  { label: "עלות אסימונים", x: 962, y: 150, weight: "node" },
  { label: "בנצ׳מרקים", x: 985, y: 330, weight: "node" },
  { label: "קוונטיזציה", x: 1090, y: 220, weight: "node" },
  { label: "פרומפטינג", x: 176, y: 108, weight: "leaf" },
  { label: "שרשרת חשיבה", x: 372, y: 366, weight: "leaf" },
  { label: "וקטור־סטור", x: 590, y: 196, weight: "leaf" },
  { label: "חלון זיכרון", x: 742, y: 272, weight: "leaf" },
  { label: "קריאות כלים", x: 884, y: 372, weight: "leaf" },
  { label: "לטנציה", x: 1084, y: 92, weight: "leaf" },
  { label: "דיסטילציה", x: 1152, y: 312, weight: "leaf" },
];

/** Index pairs into `graphNodes`. */
export const graphEdges: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [5, 7],
  [6, 7],
  [6, 8],
  [6, 9],
  [7, 9],
  [8, 10],
  [9, 10],
  [9, 11],
  [9, 12],
  [10, 12],
  [11, 12],
  [13, 0],
  [13, 1],
  [13, 3],
  [13, 4],
  [14, 2],
  [14, 5],
  [14, 7],
  [15, 3],
  [15, 6],
  [15, 9],
  [16, 4],
  [16, 6],
  [16, 9],
  [16, 17],
  [17, 8],
  [17, 9],
  [17, 11],
  [18, 9],
  [18, 10],
  [18, 12],
  [19, 5],
  [19, 11],
  [19, 12],
];

export const nodeGeometry = {
  hub: { radius: 6, fontSize: 13 },
  node: { radius: 4.6, fontSize: 13 },
  leaf: { radius: 4.2, fontSize: 12.5 },
} as const satisfies Record<GraphNode["weight"], { radius: number; fontSize: number }>;
