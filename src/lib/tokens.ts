/**
 * Single source of truth for the brand palette.
 *
 * Consumed twice:
 *  - as CSS custom properties (`brandVariablesCss`) injected once in the root layout,
 *    which Tailwind's `@theme inline` block in globals.css maps onto `--color-*`
 *  - as raw hex in TS, for SVG geometry and the colour interpolation done by the
 *    scroll/pointer animations
 *
 * Roles come from the brand document: one background, one signal colour under 5%
 * of the surface, and a single blueprint grey that does the drawing.
 */
export const palette = {
  /** מנוע — the only background */
  ink: "#0C0D0E",
  /** panel surface for cards */
  panel: "#101113",
  /** תא — secondary surface */
  cell: "#14161A",

  /** faintest grid line */
  hairline: "#16191B",
  /** section divider */
  edge: "#1A1D1F",
  /** default border */
  rule: "#1E2123",
  /** emphasised border */
  frame: "#26292B",
  /** structural line */
  line: "#2A2E31",
  /** שרטוט — the blueprint line that does the work */
  blueprint: "#3A3E41",
  steel: "#4A4F53",
  steelLight: "#6E7276",

  faint: "#63696D",
  subtle: "#7E8488",
  dim: "#8A8F93",
  muted: "#A8ADB0",
  body: "#C9CCCE",
  /** אור — headings and text */
  light: "#E9E7E3",

  /** ענבר / סיגנל — the single focal point */
  amber: "#D8A24A",
  /** amber on light backgrounds */
  amberDeep: "#A6721E",
  /** אמת — verification only, never decorative */
  truth: "#7C9C9A",
} as const;

export type PaletteKey = keyof typeof palette;

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export const brandVariablesCss = `:root{${Object.entries(palette)
  .map(([key, value]) => `--brand-${kebab(key)}:${value}`)
  .join(";")}}`;
