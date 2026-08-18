import type { CSSProperties, Ref, SVGProps } from "react";
import { markVariants, markViewBox, stratumCentre, type MarkVariant } from "./mark-geometry";

type Tone = "dark" | "light";

const tones: Record<Tone, { accent: string; base: string; hollow: string }> = {
  dark: {
    accent: "var(--color-amber)",
    base: "var(--color-light)",
    hollow: "var(--color-ink)",
  },
  light: {
    accent: "var(--color-amber-deep)",
    base: "var(--color-cell)",
    hollow: "var(--color-light)",
  },
};

export type LogoMarkProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "ref"> & {
  /** `stack` for display sizes, `bar` for the lockup and anything under 44px. */
  variant?: MarkVariant;
  /** How many strata survive: 5 at display size, 4 from ~104px, 3 from ~44px. */
  strataCount?: 3 | 4 | 5;
  tone?: Tone;
  /** Background the hollow nodes are punched out of. */
  hollowFill?: string;
  /** Per-stratum group refs, for the assembly animation. */
  stratumRef?: (index: number) => Ref<SVGGElement>;
};

export function LogoMark({
  variant = "stack",
  strataCount = 5,
  tone = "dark",
  hollowFill,
  stratumRef,
  style,
  ...props
}: LogoMarkProps) {
  const spec = markVariants[variant];
  const colors = tones[tone];
  const hollow = hollowFill ?? colors.hollow;
  const visible = spec.strata.slice(0, strataCount);

  return (
    <svg
      viewBox={markViewBox(variant, strataCount)}
      fill="none"
      aria-hidden="true"
      style={{ display: "block", overflow: "visible", ...style } as CSSProperties}
      {...props}
    >
      {visible.map((stratum, index) => {
        const fill = stratum.lifted ? colors.accent : colors.base;
        const centre = stratumCentre(index, variant);

        return (
          <g
            key={stratum.y}
            ref={stratumRef?.(index)}
            transform={
              stratum.lifted ? `rotate(${spec.lift} ${spec.pivotX} ${centre})` : undefined
            }
          >
            {stratum.bars.map((barShape) => (
              <rect
                key={barShape.x}
                x={barShape.x}
                y={stratum.y}
                width={barShape.width}
                height={stratum.height}
                fill={fill}
                fillOpacity={stratum.opacity}
              />
            ))}
            {/* The node stays a solid hole so it reads as punched out, not tinted. */}
            {stratum.node ? (
              <circle
                cx={stratum.node.x}
                cy={centre}
                r={stratum.node.radius}
                fill={hollow}
                stroke={fill}
                strokeOpacity={stratum.opacity}
                strokeWidth={1.2}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
