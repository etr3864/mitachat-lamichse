import type { Ref } from "react";
import {
  ENGINE_VIEWBOX,
  engineParts,
  type EngineFill,
  type EngineShape,
  type EngineTone,
} from "./engine-schematic";

const tones: Record<EngineTone, string> = {
  light: "var(--color-light)",
  dim: "var(--color-dim)",
  blueprint: "var(--color-blueprint)",
  steelLight: "var(--color-steel-light)",
  line: "var(--color-line)",
  amber: "var(--color-amber)",
};

const fills: Record<EngineFill, string> = {
  none: "none",
  ink: "var(--color-ink)",
  amber: "var(--color-amber)",
  dim: "var(--color-dim)",
};

function Primitive({ shape }: { shape: EngineShape }) {
  const stroke = shape.stroke ? tones[shape.stroke] : undefined;
  const strokeWidth = shape.stroke ? shape.width_ : undefined;

  switch (shape.kind) {
    case "rect":
      return (
        <rect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fills[shape.fill ?? "none"]}
        />
      );
    case "line":
      return (
        <line
          x1={shape.x1}
          y1={shape.y1}
          x2={shape.x2}
          y2={shape.y2}
          stroke={stroke}
          strokeWidth={shape.width_}
        />
      );
    case "circle":
      return (
        <circle
          cx={shape.cx}
          cy={shape.cy}
          r={shape.r}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fills[shape.fill ?? "none"]}
        />
      );
    case "path":
      return (
        <path
          d={shape.d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fills[shape.fill ?? "none"]}
        />
      );
  }
}

/**
 * Parts are grouped by `data-part` so the scroll scene can read their explode
 * vectors straight off the DOM without a second source of truth.
 */
export function EngineSchematic({ ref }: { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className="absolute top-1/2 left-1/2 w-[86vmin] -translate-x-1/2 -translate-y-1/2 md:w-[74vmin]"
    >
      <svg
        viewBox={`0 0 ${ENGINE_VIEWBOX.width} ${ENGINE_VIEWBOX.height}`}
        fill="none"
        aria-hidden="true"
        className="block h-auto w-full overflow-visible"
      >
        {engineParts.map((part) => {
          const shapes = part.shapes.map((shape, index) => (
            <Primitive key={index} shape={shape} />
          ));

          // The explode transform is written to `style`, which would replace a
          // transform attribute — so a tilted part keeps its rotation on a child.
          return (
            <g key={part.id} data-part={part.id} data-dx={part.dx} data-dy={part.dy}>
              {part.transform ? <g transform={part.transform}>{shapes}</g> : shapes}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
