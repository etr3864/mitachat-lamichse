/**
 * The method engine is the logo mark, extruded and machined. Scroll is the only
 * clock: nothing, a bang that assembles the parts, a teardown, then nothing
 * again. Reverse scroll puts them back.
 */
import { strata } from "@/components/brand/mark-geometry";
import { window01 } from "@/lib/math";
import { palette } from "@/lib/tokens";
import type { StageTiming } from "./method-timing";

type RGB = [number, number, number];
type V3 = [number, number, number];

const LIGHT: RGB = hex(palette.light);
const STEEL: RGB = hex(palette.steelLight);
const IRON: RGB = hex(palette.steel);
const CAST: RGB = hex(palette.blueprint);
const AMBER: RGB = hex(palette.amber);
const INK: RGB = hex(palette.ink);

const SUN: V3 = norm([0.4, 0.86, 0.32]);

type Cam = {
  cx: number;
  cy: number;
  yaw: number;
  pitch: number;
  dist: number;
  scale: number;
};

type Quad = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  z: number;
  fill: string;
  edge: string;
};

type Box = {
  cx: number;
  cy: number;
  cz: number;
  w: number;
  h: number;
  d: number;
  rx: number;
  ry: number;
  rz: number;
  albedo: RGB;
  metal: number;
  explode: V3;
  /** Piston index 0..3 — world Y is offset by the crank while assembled. */
  piston?: number;
  skipNarrow?: boolean;
};

const quads: Quad[] = [];
let boxes: Box[] | null = null;

function hex(value: string): RGB {
  return [
    parseInt(value.slice(1, 3), 16),
    parseInt(value.slice(3, 5), 16),
    parseInt(value.slice(5, 7), 16),
  ];
}

function norm(v: V3): V3 {
  const m = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / m, v[1] / m, v[2] / m];
}

function dot(a: V3, b: V3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function rotate(x: number, y: number, z: number, rx: number, ry: number, rz: number): V3 {
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x2 = x * cy + z1 * sy;
  const z2 = -x * sy + z1 * cy;
  const cz = Math.cos(rz), sz = Math.sin(rz);
  return [x2 * cz - y1 * sz, x2 * sz + y1 * cz, z2];
}

function rgb(c: RGB, a = 1) {
  return a < 1 ? `rgba(${c[0]},${c[1]},${c[2]},${a})` : `rgb(${c[0]},${c[1]},${c[2]})`;
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function shade(albedo: RGB, n: V3, metal: number, fog: number): { fill: RGB; edge: RGB } {
  const key = Math.max(0, dot(n, SUN));
  const ndotl = 0.28 + key * 0.72 + Math.max(0, n[1]) * 0.12;
  const spec = metal * Math.pow(Math.max(0, key), 12) * 48;
  const lit: RGB = [
    Math.min(255, albedo[0] * ndotl + spec),
    Math.min(255, albedo[1] * ndotl + spec),
    Math.min(255, albedo[2] * ndotl + spec),
  ];
  const fill = mix(lit, INK, fog * 0.45);
  const edge = mix(fill, LIGHT, 0.12);
  return { fill, edge };
}

function project(x: number, y: number, z: number, cam: Cam) {
  const r = rotate(x, y, z, cam.pitch, cam.yaw, 0);
  const zc = r[2] + cam.dist;
  const w = cam.dist / Math.max(40, zc);
  return {
    x: cam.cx + r[0] * w * cam.scale,
    y: cam.cy - r[1] * w * cam.scale,
    z: zc,
    n: r,
  };
}

function faceNormal(a: V3, b: V3, c: V3): V3 {
  return norm([
    (b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1]),
    (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]),
    (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]),
  ]);
}

function buildBoxes(): Box[] {
  const out: Box[] = [];
  const depths = [16, 22, 17, 13, 9];
  const hoodTilt = -0.14;

  strata.forEach((stratum, index) => {
    const cy = 33 - (stratum.y + stratum.height / 2);
    const h = Math.max(6.4, stratum.height * 3.1);
    const d = depths[index];
    const explode: V3 =
      index === 0
        ? [0.12, 1.55, 0.22]
        : index === 1
          ? [-1.05, 0.42, 0.18]
          : index === 2
            ? [1.12, 0.08, -0.12]
            : index === 3
              ? [0, -0.35, 0.08]
              : [0, -1.65, -0.1];

    stratum.bars.forEach((bar, barIndex) => {
      const cx = bar.x + bar.width / 2 - 30;
      const albedo = index === 0 ? AMBER : index >= 3 ? STEEL : LIGHT;
      const metal = index === 0 ? 0.32 : 0.18;
      const piston = index === 3 ? barIndex : undefined;
      const localExplode: V3 =
        index === 3
          ? [barIndex === 1 ? 0 : barIndex === 0 ? -1.35 : 1.35, -0.55, 0.2]
          : index === 4
            ? [barIndex === 1 ? 0 : barIndex === 0 ? -0.9 : 0.9, -1.7, -0.15]
            : explode;

      out.push({
        cx,
        cy,
        cz: 0,
        w: bar.width,
        h,
        d,
        rx: index === 0 ? hoodTilt : 0,
        ry: 0,
        rz: 0,
        albedo,
        metal,
        explode: localExplode,
        piston,
      });

      // Machined lip on the long strata — reads as a deck / head gasket.
      if (index <= 2) {
        out.push({
          cx,
          cy: cy + h / 2 + 1.1,
          cz: 0,
          w: bar.width + 1.6,
          h: 1.8,
          d: d + 2.4,
          rx: index === 0 ? hoodTilt : 0,
          ry: 0,
          rz: 0,
          albedo: index === 0 ? mix(AMBER, LIGHT, 0.15) : mix(CAST, IRON, 0.4),
          metal: 0.22,
          explode: localExplode,
        });
      }
    });

    if (stratum.node) {
      const nx = stratum.node.x - 30;
      out.push({
        cx: nx,
        cy,
        cz: d / 2 + 3.2,
        w: 6.4,
        h: 6.4,
        d: 6.4,
        rx: 0,
        ry: 0,
        rz: 0,
        albedo: index === 0 ? AMBER : STEEL,
        metal: 0.28,
        explode: index === 0 ? [1.4, 1.2, 0.6] : [index % 2 === 0 ? 1.3 : -1.3, explode[1], 0.5],
      });
    }
  });

  // Engine block hull — ties strata 1–2 into a single casting when assembled.
  out.push({
    cx: 0,
    cy: 2,
    cz: -8,
    w: 40,
    h: 14,
    d: 14,
    rx: 0,
    ry: 0,
    rz: 0,
    albedo: CAST,
    metal: 0.16,
    explode: [0, 0.05, -1.4],
  });

  // Oil pan.
  out.push({
    cx: 0,
    cy: -28,
    cz: 0,
    w: 38,
    h: 10,
    d: 16,
    rx: 0.08,
    ry: 0,
    rz: 0,
    albedo: mix(IRON, STEEL, 0.25),
    metal: 0.2,
    explode: [0, -2.1, 0.4],
  });

  // Camshaft under the hood.
  out.push({
    cx: 0,
    cy: 18,
    cz: 0,
    w: 50,
    h: 3.2,
    d: 3.2,
    rx: 0,
    ry: 0,
    rz: 0,
    albedo: STEEL,
    metal: 0.22,
    explode: [0, 1.05, 0.3],
  });

  // Crank through the bottom nodes.
  out.push({
    cx: 0,
    cy: -29.5,
    cz: 0,
    w: 28,
    h: 3.6,
    d: 3.6,
    rx: 0,
    ry: 0,
    rz: 0,
    albedo: STEEL,
    metal: 0.22,
    explode: [0, -1.85, -0.2],
  });

  // Flywheel — desktop reads this immediately as "engine".
  out.push({
    cx: 22,
    cy: -29.5,
    cz: 0,
    w: 4.2,
    h: 16,
    d: 16,
    rx: 0,
    ry: 0,
    rz: 0,
    albedo: mix(IRON, STEEL, 0.5),
    metal: 0.2,
    explode: [2.2, -1.6, 0.2],
    skipNarrow: true,
  });

  // Intake runners on the left.
  for (const y of [8, 2, -4]) {
    out.push({
      cx: -28,
      cy: y,
      cz: 4,
      w: 14,
      h: 3.4,
      d: 5,
      rx: 0,
      ry: 0.18,
      rz: 0,
      albedo: mix(STEEL, IRON, 0.3),
      metal: 0.18,
      explode: [-2.0, 0.2, 0.55],
    });
  }

  const pistonXs = [-16.5, -5.5, 5.5, 16.5];
  pistonXs.forEach((x, i) => {
    const explode: V3 = [i < 2 ? -1.05 : 1.05, 0.55 + (i % 2) * 0.2, 0.85];
    // Barrel.
    out.push({
      cx: x,
      cy: 6,
      cz: 11,
      w: 8.2,
      h: 16,
      d: 8.2,
      rx: 0,
      ry: 0.18,
      rz: 0,
      albedo: mix(STEEL, CAST, 0.35),
      metal: 0.2,
      explode,
      piston: i % 3,
    });
    // Crown.
    out.push({
      cx: x,
      cy: 15,
      cz: 11,
      w: 8.8,
      h: 2.4,
      d: 8.8,
      rx: 0,
      ry: 0.18,
      rz: 0,
      albedo: STEEL,
      metal: 0.2,
      explode,
      piston: i % 3,
    });
  });
  pistonXs.forEach((x, i) => {
    out.push({
      cx: x,
      cy: -18,
      cz: 0,
      w: 2.4,
      h: 18,
      d: 2.2,
      rx: 0,
      ry: 0,
      rz: (i - 1) * 0.08,
      albedo: STEEL,
      metal: 0.18,
      explode: [i === 1 ? 0 : i === 0 ? -1.5 : 1.5, -1.1, 0.25],
      piston: i,
    });
  });

  return out;
}

function addBox(
  box: Box,
  cam: Cam,
  spread: number,
  crush: number,
  pump: number,
  fogNear: number,
  fogFar: number,
) {
  const pistonY = box.piston === undefined ? 0 : Math.sin(pump + box.piston * (Math.PI / 2)) * 3.6;
  const cx = box.cx + box.explode[0] * spread;
  const cy = box.cy + pistonY + box.explode[1] * spread;
  const cz = box.cz + box.explode[2] * spread;
  const hw = box.w / 2;
  const hh = box.h / 2;
  const hd = (box.d / 2) * crush;

  const local: V3[] = [
    [-hw, -hh, -hd],
    [hw, -hh, -hd],
    [hw, hh, -hd],
    [-hw, hh, -hd],
    [-hw, -hh, hd],
    [hw, -hh, hd],
    [hw, hh, hd],
    [-hw, hh, hd],
  ];

  const world: V3[] = local.map((v) => {
    const r = rotate(v[0], v[1], v[2], box.rx, box.ry, box.rz);
    return [r[0] + cx, r[1] + cy, r[2] + cz];
  });

  const faces: Array<[number, number, number, number]> = [
    [0, 3, 2, 1],
    [4, 5, 6, 7],
    [0, 1, 5, 4],
    [3, 7, 6, 2],
    [0, 4, 7, 3],
    [1, 2, 6, 5],
  ];

  for (const f of faces) {
    const a = world[f[0]];
    const b = world[f[1]];
    const c = world[f[2]];
    const n = faceNormal(a, b, c);
    const pa = project(a[0], a[1], a[2], cam);
    const pb = project(b[0], b[1], b[2], cam);
    const pc = project(c[0], c[1], c[2], cam);
    const pd = project(world[f[3]][0], world[f[3]][1], world[f[3]][2], cam);
    // Screen-space winding: skip faces that point away.
    if ((pb.x - pa.x) * (pd.y - pa.y) - (pb.y - pa.y) * (pd.x - pa.x) <= 0) continue;

    const z = (pa.z + pb.z + pc.z + pd.z) / 4;
    const fog = Math.min(1, Math.max(0, (z - fogNear) / (fogFar - fogNear)));
    const lit = shade(box.albedo, n, box.metal, fog);
    quads.push({
      x0: pa.x,
      y0: pa.y,
      x1: pb.x,
      y1: pb.y,
      x2: pc.x,
      y2: pc.y,
      x3: pd.x,
      y3: pd.y,
      z,
      fill: rgb(lit.fill),
      edge: rgb(lit.edge, 0.4),
    });
  }
}

export function drawEngine(
  ctx: CanvasRenderingContext2D,
  p: number,
  timing: StageTiming,
  narrow: boolean,
  width: number,
  height: number,
) {
  boxes ??= buildBoxes();
  quads.length = 0;

  const assemble = window01(p, timing.bangStart, timing.bangLength);
  const incoming = 1 - assemble;
  const explode = window01(p, timing.explodeStart, timing.explodeLength);
  const fly = window01(p, timing.flyStart, timing.flyLength);
  const fade = window01(p, timing.dissolveStart, timing.dissolveLength);
  // Visible only once debris is already rushing in, gone again before the mark.
  const alpha = window01(p, timing.bangStart, timing.bangLength * 0.4) * (1 - fade);
  if (alpha <= 0.01) {
    ctx.clearRect(0, 0, width, height);
    return;
  }

  const bangSpread = narrow ? 98 : 112;
  const flySpread = narrow ? 64 : 76;
  const spread = incoming * incoming * bangSpread + explode * 13 + fly * flySpread;
  const crush = 0.22 + 0.78 * assemble * (1 - fly * 0.82);
  const bangEnd = timing.bangStart + timing.bangLength;
  const live = Math.min(p, timing.explodeStart);
  const pump = live > bangEnd ? (live - bangEnd) * Math.PI * 8 : 0;

  const yaw = narrow
    ? 0.32 + incoming * 0.35 + explode * 0.2
    : 0.66 + incoming * 0.28 + explode * 0.2;
  const pitch = narrow
    ? 0.4 - incoming * 0.12 - explode * 0.08
    : 0.34 - incoming * 0.1 - explode * 0.06;
  const dist = 320 + incoming * 90;
  const scale = (Math.min(width, height) / (narrow ? 48 : 66)) * (0.55 + 0.45 * assemble);
  const cam: Cam = {
    cx: width * 0.5,
    cy: height * (narrow ? 0.46 : 0.5) + explode * (narrow ? 8 : 0),
    yaw,
    pitch,
    dist,
    scale,
  };

  const fogNear = dist - 40;
  const fogFar = dist + 90;

  for (const box of boxes) {
    if (narrow && box.skipNarrow) continue;
    addBox(box, cam, spread, crush, pump, fogNear, fogFar);
  }

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.globalAlpha = alpha;

  const shadow = project(0, -34, 0, cam);
  ctx.save();
  ctx.globalAlpha = alpha * assemble * (1 - explode * 0.8) * 0.28;
  ctx.fillStyle = rgb(INK, 1);
  ctx.beginPath();
  ctx.ellipse(shadow.x, shadow.y + 18, 90 * (cam.scale / 18), 18 * (cam.scale / 18), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  quads.sort((a, b) => b.z - a.z);
  ctx.lineJoin = "miter";
  ctx.lineWidth = narrow ? 0.6 : 0.75;
  for (const q of quads) {
    ctx.beginPath();
    ctx.moveTo(q.x0, q.y0);
    ctx.lineTo(q.x1, q.y1);
    ctx.lineTo(q.x2, q.y2);
    ctx.lineTo(q.x3, q.y3);
    ctx.closePath();
    ctx.fillStyle = q.fill;
    ctx.fill();
    ctx.strokeStyle = q.edge;
    ctx.stroke();
  }

  ctx.restore();
}
