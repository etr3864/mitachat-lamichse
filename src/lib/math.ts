export const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

/** smoothstep — the only easing used across the site */
export const ease = (t: number) => {
  const k = clamp01(t);
  return k * k * (3 - 2 * k);
};

/** Maps `value` from [start, end] onto 0..1, clamped. */
export const progress = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start || 1));

/** Eased 0..1 window, the shape every reveal in this project uses. */
export const window01 = (value: number, start: number, length: number) =>
  ease(progress(value, start, start + length));

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const parseHex = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

export const mixHex = (from: string, to: string, t: number) => {
  const k = clamp01(t);
  const a = parseHex(from);
  const b = parseHex(to);
  return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], k))).join(",")})`;
};

export const round = (value: number, decimals = 2) => Number(value.toFixed(decimals));

export const degToRad = (deg: number) => (deg * Math.PI) / 180;
