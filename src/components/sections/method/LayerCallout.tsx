import type { Ref } from "react";
import type { MethodLayer } from "@/content/method";
import { MonoLabel } from "@/components/brand/MonoLabel";

/**
 * One layer of the method, parked on the mark's stratum. Position, side and
 * leader length are written by useMethodStage.
 */
export function LayerCallout({
  layer,
  rootRef,
  rowRef,
  leaderRef,
}: {
  layer: MethodLayer;
  rootRef: Ref<HTMLDivElement>;
  rowRef: Ref<HTMLDivElement>;
  leaderRef: Ref<HTMLSpanElement>;
}) {
  return (
    <div
      ref={rootRef}
      className="absolute top-1/2 left-1/2 w-[min(300px,72vw)] -translate-x-1/2 -translate-y-1/2 opacity-0 md:w-[min(300px,32vw)]"
    >
      {/* Narrow stacks every callout in one spot, with no room for a side leader.
          This tick reaches back up to the mark so the pairing stays legible. */}
      <span
        aria-hidden="true"
        className="mx-auto mb-2.5 block h-7 w-px bg-blueprint md:hidden"
      />
      <div ref={rowRef} className="flex items-center">
        <div className="flex flex-1 flex-col gap-[7px]">
          <span className="flex items-baseline gap-2">
            <MonoLabel tone="amber" size="xs">
              {layer.code}
            </MonoLabel>
            <span className="text-[19px] leading-tight font-bold">{layer.title}</span>
          </span>
          <span className="text-[13.5px] leading-relaxed text-muted">{layer.body}</span>
        </div>
        <span ref={leaderRef} className="h-px w-0 flex-none bg-blueprint" />
      </div>
    </div>
  );
}
