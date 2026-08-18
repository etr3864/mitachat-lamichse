"use client";

import { useRef } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { MonoLabel } from "@/components/brand/MonoLabel";
import { methodIntro, methodLayers } from "@/content/method";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EngineObject } from "./EngineObject";
import { LayerCallout } from "./LayerCallout";
import { useMethodStage } from "./useMethodStage";

export function MethodStage() {
  const stage = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const setNode = useMethodStage(stage, !reduced);

  return (
    <section
      id="method"
      ref={stage}
      aria-label={methodIntro.heading}
      className="relative h-[800vh] motion-reduce:h-auto md:h-[760vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 40%, var(--color-cell) 0%, var(--color-ink) 62%)",
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint-grid opacity-50" />

        <EngineObject stage={stage} enabled={!reduced} />

        <div
          ref={setNode("mark")}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          <LogoMark
            strataCount={5}
            hollowFill="var(--color-panel)"
            stratumRef={(index) => setNode(`stratum-${index}`)}
            className="h-[34vmin] max-h-[220px] md:h-[26vmin]"
          />
        </div>

        <div
          ref={setNode("ring")}
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-[78vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-rule opacity-0"
        />

        {methodLayers.map((layer, index) => (
          <LayerCallout
            key={layer.code}
            layer={layer}
            rootRef={setNode(`callout-${index}`)}
            rowRef={setNode(`row-${index}`)}
            leaderRef={setNode(`leader-${index}`)}
          />
        ))}

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-edge">
          <div ref={setNode("bar")} className="h-0.5 w-0 bg-amber" />
        </div>
      </div>

      <StaticMethod />
    </section>
  );
}

/** Reduced-motion fallback: the same five layers, without the scroll scene. */
function StaticMethod() {
  return (
    <div className="hidden px-6 py-24 motion-reduce:block md:px-10">
      <div className="mb-14 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-rule pb-4">
        <MonoLabel tone="amber">{methodIntro.code}</MonoLabel>
        <h2 className="text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em]">
          {methodIntro.heading}
        </h2>
      </div>
      <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-20">
        <LogoMark strataCount={5} className="h-[220px] flex-none" />
        <ol className="flex flex-col gap-8">
          {methodLayers.map((layer) => (
            <li key={layer.code} className="flex max-w-[52ch] flex-col gap-2">
              <span className="flex items-baseline gap-2">
                <MonoLabel tone="amber" size="xs">
                  {layer.code}
                </MonoLabel>
                <span className="text-[19px] font-bold">{layer.title}</span>
              </span>
              <span className="text-[15px] leading-relaxed text-muted">{layer.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
