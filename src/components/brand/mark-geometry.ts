/**
 * The mark: one full stratum at the surface, and beneath it strata that keep
 * breaking apart — a whole line, a shorter line, three segments, three nodes.
 * Depth is expressed by fading alone (100%, 55%, 34%, 20%), never by colour.
 *
 * A hollow node sits at the end of each stratum and swaps sides every layer.
 * That zigzag is the descent itself.
 *
 * Two variants, both from the brand document:
 *  - `stack` is the display mark, up to five strata, drawn with hairline bars
 *  - `bar`   is the lockup mark, three strata, bars thickened so it survives
 *            at 44px and inside a 26px header
 */
export type Stratum = {
  y: number;
  height: number;
  /** Fill opacity — the only thing that encodes depth. */
  opacity: number;
  bars: ReadonlyArray<{ x: number; width: number }>;
  node?: { x: number; radius: number };
  /** The top stratum is the lifted hood, tilted and carrying the signal colour. */
  lifted?: boolean;
};

export type MarkVariant = "stack" | "bar";

type VariantSpec = {
  viewBox: { x: number; y: number; width: number; height: number };
  /** Tilt of the lifted stratum, in degrees. */
  lift: number;
  /** Horizontal centre used as the rotation pivot. */
  pivotX: number;
  strata: readonly Stratum[];
};

const stack: VariantSpec = {
  viewBox: { x: 0, y: 0, width: 60, height: 66 },
  lift: -5,
  pivotX: 30,
  strata: [
    {
      y: 8,
      height: 3,
      opacity: 1,
      bars: [{ x: 4, width: 52 }],
      node: { x: 56, radius: 2.5 },
      lifted: true,
    },
    {
      y: 24,
      height: 3,
      opacity: 1,
      bars: [{ x: 4, width: 52 }],
      node: { x: 4, radius: 2.5 },
    },
    {
      y: 38,
      height: 3,
      opacity: 0.55,
      bars: [{ x: 11, width: 38 }],
      node: { x: 49, radius: 2.3 },
    },
    {
      y: 52,
      height: 3,
      opacity: 0.34,
      bars: [
        { x: 13.5, width: 9 },
        { x: 25.5, width: 9 },
        { x: 37.5, width: 9 },
      ],
      node: { x: 13.5, radius: 2.1 },
    },
    {
      y: 62,
      height: 3.4,
      opacity: 0.2,
      bars: [
        { x: 22, width: 3.4 },
        { x: 28.3, width: 3.4 },
        { x: 34.6, width: 3.4 },
      ],
    },
  ],
};

const bar: VariantSpec = {
  viewBox: { x: 6.4, y: 7, width: 27.2, height: 19 },
  lift: -8,
  pivotX: 20,
  strata: [
    {
      y: 9.2,
      height: 3.2,
      opacity: 1,
      bars: [{ x: 7, width: 26 }],
      node: { x: 33, radius: 2.1 },
      lifted: true,
    },
    {
      y: 17.6,
      height: 3.2,
      opacity: 1,
      bars: [{ x: 7, width: 26 }],
      node: { x: 7, radius: 2.2 },
    },
    {
      y: 23.6,
      height: 3.2,
      opacity: 0.55,
      bars: [{ x: 11, width: 18 }],
      node: { x: 29, radius: 2 },
    },
  ],
};

export const markVariants: Record<MarkVariant, VariantSpec> = { stack, bar };

export const strata = stack.strata;

/**
 * Clear space and scaling: below 104px the fifth stratum is dropped, below 44px
 * the lockup mark takes over with three strata.
 */
export const markViewBox = (variant: MarkVariant, count: number) => {
  const spec = markVariants[variant];
  const visible = spec.strata.slice(0, count);
  const bottom = visible.reduce((max, stratum) => {
    const barBottom = stratum.y + stratum.height;
    const nodeBottom = stratum.node ? stratum.y + stratum.height / 2 + stratum.node.radius : 0;
    return Math.max(max, barBottom, nodeBottom);
  }, 0);
  const height = Math.max(spec.viewBox.height, Math.ceil(bottom) - spec.viewBox.y);
  return `${spec.viewBox.x} ${spec.viewBox.y} ${spec.viewBox.width} ${height}`;
};

/** Height of the stack variant's viewBox — the scale reference for callouts. */
export const STACK_VIEW_HEIGHT = stack.viewBox.height;

export const stratumCentre = (index: number, variant: MarkVariant = "stack") => {
  const stratum = markVariants[variant].strata[index];
  return stratum.y + stratum.height / 2;
};

/**
 * The transform a stratum carries before any animation is applied. The assembly
 * scene prepends this so writing a translate does not drop the hood's tilt.
 */
export const stratumBaseTransform = (index: number, variant: MarkVariant = "stack") => {
  const spec = markVariants[variant];
  return spec.strata[index].lifted
    ? `rotate(${spec.lift} ${spec.pivotX} ${stratumCentre(index, variant)})`
    : "";
};
