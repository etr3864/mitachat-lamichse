/**
 * The exploded engine drawing, generated from a handful of constants instead of
 * hand-placed nodes: change the cylinder count or the bore spacing and the whole
 * schematic follows.
 *
 * Every part carries `dx`/`dy` — its direction of travel when the assembly comes
 * apart. Multiplied by the scroll spread in useMethodStage.
 */

export const ENGINE_VIEWBOX = { width: 240, height: 190 } as const;

const BLOCK = { x: 26, y: 70, width: 188, height: 80 } as const;
const CRANK = { x: 120, y: 138, radius: 15, throw: 11 } as const;
const DECK = { y: 58, height: 10 } as const;
const CAM_Y = 52;

/** Bore centres. Adding a fifth entry redraws cams, valves, pistons and rods. */
const BORES = [56, 100, 144, 188];
/** Piston heights, i.e. where each cylinder sits in its stroke. */
const PISTON_TOPS = [76, 88, 96, 82];
const PISTON = { width: 23, height: 15 } as const;
const VALVE_OFFSET = 6.5;

type Tone = "light" | "dim" | "blueprint" | "steelLight" | "line" | "amber";
type Fill = "none" | "ink" | "amber" | "dim";

type Shape =
  | { kind: "rect"; x: number; y: number; width: number; height: number; stroke?: Tone; width_?: number; fill?: Fill }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number; stroke: Tone; width_?: number }
  | { kind: "circle"; cx: number; cy: number; r: number; stroke?: Tone; width_?: number; fill?: Fill }
  | { kind: "path"; d: string; stroke?: Tone; width_?: number; fill?: Fill };

export type EnginePart = {
  id: string;
  /** Explode direction, in schematic units per unit of spread. */
  dx: number;
  dy: number;
  transform?: string;
  shapes: Shape[];
};

export type { Shape as EngineShape, Tone as EngineTone, Fill as EngineFill };

const rect = (
  x: number,
  y: number,
  width: number,
  height: number,
  stroke?: Tone,
  width_ = 1,
  fill: Fill = "none",
): Shape => ({ kind: "rect", x, y, width, height, stroke, width_, fill });

const line = (x1: number, y1: number, x2: number, y2: number, stroke: Tone, width_ = 1): Shape => ({
  kind: "line",
  x1,
  y1,
  x2,
  y2,
  stroke,
  width_,
});

const circle = (
  cx: number,
  cy: number,
  r: number,
  stroke?: Tone,
  width_ = 1,
  fill: Fill = "none",
): Shape => ({ kind: "circle", cx, cy, r, stroke, width_, fill });

const path = (d: string, stroke?: Tone, width_ = 1, fill: Fill = "none"): Shape => ({
  kind: "path",
  d,
  stroke,
  width_,
  fill,
});

const polar = (cx: number, cy: number, radius: number, degrees: number) => {
  const radians = (degrees * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
};

const round = (value: number) => Number(value.toFixed(2));

// The four crank journals, offset so no two rods share an angle.
const JOURNAL_PHASE = 34.26;
const journal = (index: number) =>
  polar(CRANK.x, CRANK.y, CRANK.throw, JOURNAL_PHASE + index * 90);

const hood = (): EnginePart => {
  const right = BLOCK.x + BLOCK.width - 4;
  return {
    id: "hood",
    dx: 0,
    dy: -1.25,
    transform: "rotate(-6 120 26)",
    shapes: [
      path(
        `M30 22 L${right} 22 L${right} 28 L44 28 L44 33 L36 33 L36 28 L30 28 Z`,
        "light",
        1.1,
      ),
      ...Array.from({ length: 9 }, (_, i) => line(44 + i * 18, 22.8, 44 + i * 18, 27.2, "blueprint", 0.6)),
    ],
  };
};

const camshaft = (): EnginePart => ({
  id: "cams",
  dx: 0,
  dy: -0.86,
  shapes: [
    line(BLOCK.x, CAM_Y, BLOCK.x + BLOCK.width, CAM_Y, "blueprint", 0.7),
    ...BORES.flatMap((cx) => [
      circle(cx, CAM_Y, 4.6, "light", 0.9, "ink"),
      path(`M${cx - 2.6} 49 L${cx} 45.6 L${cx + 2.6} 49`, "light", 0.9, "ink"),
      circle(cx, CAM_Y, 1.2, undefined, 0, "dim"),
    ]),
  ],
});

const valveTrain = (): EnginePart => ({
  id: "valves",
  dx: 0,
  dy: -0.46,
  shapes: BORES.flatMap((cx) =>
    [cx - VALVE_OFFSET, cx + VALVE_OFFSET].flatMap((x) => [
      line(x, 59, x, 69.5, "light", 0.9),
      path(
        `M${x - 2.6} 60 L${x + 2.6} 60.9 L${x - 2.6} 62.4 L${x + 2.6} 63.9 L${x - 2.6} 65.4 L${x + 2.6} 66.9`,
        "dim",
        0.6,
      ),
      path(
        `M${x - 3.4} 69.5 L${x + 3.4} 69.5 L${x + 2} 71.4 L${x - 2} 71.4 Z`,
        "light",
        0.8,
        "ink",
      ),
    ]),
  ),
});

const deck = (): EnginePart => ({
  id: "deck",
  dx: 0,
  dy: -0.2,
  shapes: [
    rect(BLOCK.x, DECK.y, BLOCK.width, DECK.height, "light", 1),
    ...[30, 78, 122, 166, 210].map((x) =>
      circle(x, DECK.y + DECK.height / 2, 2, "dim", 0.8, "ink"),
    ),
  ],
});

const block = (): EnginePart => ({
  id: "block",
  dx: 0,
  dy: 0,
  shapes: [
    rect(BLOCK.x, BLOCK.y, BLOCK.width, BLOCK.height, "light", 1.1),
    ...BORES.map((cx) => rect(cx - 13, BLOCK.y, 26, 58, "steelLight", 0.9)),
  ],
});

const pistons = (): EnginePart => ({
  id: "pistons",
  dx: 0,
  dy: 0.3,
  shapes: BORES.flatMap((cx, index) => {
    const top = PISTON_TOPS[index];
    const left = cx - PISTON.width / 2;
    return [
      rect(left, top, PISTON.width, PISTON.height, "light", 0.9, "ink"),
      ...[2.4, 4.8, 7.2].map((offset) =>
        line(left, top + offset, left + PISTON.width, top + offset, "dim", 0.6),
      ),
      circle(cx, top + 10, 2.1, "light", 0.8, "ink"),
    ];
  }),
});

const connectingRods = (): EnginePart => ({
  id: "rods",
  dx: 0,
  dy: 0.62,
  shapes: BORES.flatMap((cx, index) => {
    const pin = PISTON_TOPS[index] + 10;
    const { x, y } = journal(index);
    return [
      line(cx - 1.8, pin, round(x - 1.8), round(y), "light", 0.9),
      line(cx + 1.8, pin, round(x + 1.8), round(y), "light", 0.9),
      circle(round(x), round(y), 2.6, "light", 0.9, "ink"),
    ];
  }),
});

const crankshaft = (): EnginePart => ({
  id: "crank",
  dx: 0,
  dy: 0.92,
  shapes: [
    circle(CRANK.x, CRANK.y, CRANK.radius, "light", 1.1, "ink"),
    circle(CRANK.x, CRANK.y, 10, "dim", 0.7),
    circle(CRANK.x, CRANK.y, 2.4, "light", 0.9),
    ...Array.from({ length: 8 }, (_, i) => {
      const inner = polar(CRANK.x, CRANK.y, 4, i * 45);
      const outer = polar(CRANK.x, CRANK.y, 10, i * 45);
      return line(round(inner.x), round(inner.y), round(outer.x), round(outer.y), "line", 0.6);
    }),
  ],
});

const oilPan = (): EnginePart => ({
  id: "pan",
  dx: 0,
  dy: 1.3,
  shapes: [
    path("M26 150 L214 150 L200 168 L40 168 Z", "light", 1),
    path("M104 168 L104 173 L116 173 L116 168", "dim", 0.8),
  ],
});

const boltRail = (id: string, x: number, dx: number): EnginePart => ({
  id,
  dx,
  dy: 0.2,
  shapes: [78, 96, 114, 132].flatMap((y) => [
    circle(x, y, 2.6, "dim", 0.8, "ink"),
    line(x - 2.4, y, x + 2.4, y, "dim", 0.7),
  ]),
});

const manifold = (): EnginePart => ({
  id: "manifold",
  dx: -1.15,
  dy: -0.5,
  shapes: [
    line(26, 76, 8, 76, "dim", 0.9),
    line(26, 88, 8, 88, "dim", 0.9),
    line(8, 72, 8, 92, "dim", 0.9),
  ],
});

/** The seam that rides on the hood — the only amber in the drawing. */
const seam = (): EnginePart => ({
  id: "seam",
  dx: 0,
  dy: -1.25,
  transform: "rotate(-6 120 26)",
  shapes: [rect(30, 23, 180, 3, undefined, 0, "amber")],
});

export const engineParts: EnginePart[] = [
  hood(),
  camshaft(),
  valveTrain(),
  deck(),
  block(),
  pistons(),
  connectingRods(),
  crankshaft(),
  oilPan(),
  boltRail("bolts-right", 222, 1.5),
  boltRail("bolts-left", 18, -1.5),
  manifold(),
  seam(),
];
