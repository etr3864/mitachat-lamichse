"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { MonoLabel } from "@/components/brand/MonoLabel";
import { SeamRule } from "@/components/brand/SeamRule";
import { SocialMark } from "@/components/brand/SocialMark";
import type { Host } from "@/content/hosts";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const moodStyles = {
  steel: {
    glow: "radial-gradient(100% 90% at 50% 100%, color-mix(in srgb, var(--color-steel) 34%, transparent) 0%, transparent 62%)",
    floor: "radial-gradient(ellipse 72% 100% at 50% 50%, color-mix(in srgb, var(--color-steel-light) 28%, transparent) 0%, transparent 70%)",
    openBorder: "border-steel-light/45",
    stratum: "bg-steel-light/35",
    node: "border-steel-light/50",
  },
  warm: {
    glow: "radial-gradient(100% 92% at 50% 100%, color-mix(in srgb, var(--color-amber) 36%, transparent) 0%, transparent 64%)",
    floor: "radial-gradient(ellipse 72% 100% at 50% 50%, color-mix(in srgb, var(--color-amber) 42%, transparent) 0%, transparent 70%)",
    openBorder: "border-amber/55",
    stratum: "bg-amber/40",
    node: "border-amber/45",
  },
} as const;

function ChipCorners({ active }: { active: boolean }) {
  const edge = active
    ? "border-amber/70"
    : "border-blueprint group-hover/card:border-amber/45";
  const pos = "pointer-events-none absolute size-3 transition-colors duration-500";
  return (
    <>
      <span aria-hidden="true" className={`${pos} top-3 right-3 border-t border-r ${edge}`} />
      <span aria-hidden="true" className={`${pos} top-3 left-3 border-t border-l ${edge}`} />
      <span aria-hidden="true" className={`${pos} bottom-3 right-3 border-b border-r ${edge}`} />
      <span aria-hidden="true" className={`${pos} bottom-3 left-3 border-b border-l ${edge}`} />
    </>
  );
}

/** Always-on blueprint stage behind the cutout — strata, seams, depth marks. */
function PortraitStageBackdrop({
  code,
  mood,
}: {
  code: string;
  mood: (typeof moodStyles)[keyof typeof moodStyles];
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint-grid opacity-50"
        style={{ ["--grid-size" as string]: "40px" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint-columns opacity-[0.32]"
        style={{ ["--grid-size" as string]: "68px" }}
      />

      <LogoMark
        aria-hidden="true"
        strataCount={4}
        className="pointer-events-none absolute top-[8%] left-1/2 h-[min(148px,38%)] -translate-x-1/2 opacity-[0.07]"
      />

      <MonoLabel
        aria-hidden="true"
        tone="faint"
        size="xs"
        className="pointer-events-none absolute top-4 right-4 opacity-35"
      >
        {code}
      </MonoLabel>

      {/* Strata hairlines — the mark's horizontal language */}
      <span aria-hidden="true" className="absolute inset-x-5 top-[22%] h-px bg-blueprint/55 md:inset-x-7" />
      <span aria-hidden="true" className="absolute inset-x-5 top-[42%] h-px bg-blueprint/40 md:inset-x-7" />
      <span
        aria-hidden="true"
        className={`absolute top-[42%] right-[20%] h-px w-14 md:right-[18%] md:w-[4.5rem] ${mood.stratum}`}
        style={{ transform: "translateY(-9px) rotate(-9deg)" }}
      />
      <span aria-hidden="true" className="absolute inset-x-5 top-[62%] h-px bg-blueprint/45 md:inset-x-7" />

      {/* Leader nodes */}
      <span
        aria-hidden="true"
        className="absolute top-[42%] left-5 size-[6px] rounded-full border border-blueprint/65 bg-panel md:left-6"
      />
      <span
        aria-hidden="true"
        className={`absolute top-[62%] right-5 size-[6px] rounded-full border bg-panel md:right-6 ${mood.node}`}
      />

      {/* Depth column + crosshair */}
      <span aria-hidden="true" className="absolute inset-y-[14%] right-[11%] w-px bg-blueprint/30" />
      <span aria-hidden="true" className="absolute top-[62%] right-[11%] h-px w-5 -translate-y-1/2 bg-blueprint/35" />

      {/* Mini seam behind the figure */}
      <div aria-hidden="true" className="absolute inset-x-7 bottom-[34%] flex items-center opacity-55 md:inset-x-9">
        <span className="h-px flex-1 bg-blueprint/70" />
        <span
          className={`h-px w-10 flex-none ${mood.stratum}`}
          style={{ transform: "translateY(-6px) rotate(-9deg)" }}
        />
        <span className="h-px flex-1 bg-blueprint/70" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 58% at 50% 88%, color-mix(in srgb, var(--color-panel) 18%, transparent) 0%, transparent 72%)",
        }}
      />
    </>
  );
}

export function HostCard({ host }: { host: Host }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const panelId = useId();
  const mood = moodStyles[host.mood];
  const wide = host.portrait?.wide ?? false;

  return (
    <article
      data-open={open || undefined}
      className={`group/card flex flex-col border bg-panel transition-[border-color,box-shadow] duration-500 ${
        open ? `${mood.openBorder} shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-amber)_35%,transparent)]` : "border-rule"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full flex-col text-right outline-none"
      >
        <div className="relative h-[320px] overflow-hidden border-b border-rule md:h-[380px]">
          <PortraitStageBackdrop code={host.code} mood={mood} />
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-700 group-hover/card:opacity-100"
            style={{
              background: mood.glow,
              opacity: open ? 1 : 0.55,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[14%] bottom-5 h-14 opacity-60 blur-2xl transition-all duration-700 group-hover/card:opacity-90 group-hover/card:blur-3xl md:bottom-7 md:h-[4.5rem]"
            style={{ background: mood.floor }}
          />

          <div className="absolute inset-x-0 top-0 flex h-full flex-col items-center justify-end overflow-hidden pt-5 md:pt-6">
            <div
              className={`flex max-h-[94%] items-end justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                reduced ? "" : "group-hover/card:scale-[1.025] group-hover/card:-translate-y-1"
              } ${open && !reduced ? "scale-[1.03] -translate-y-1.5" : ""} ${
                wide ? "host-portrait-mask-wide" : "host-portrait-mask"
              }`}
            >
              <Image
                src={host.image}
                alt={host.title}
                width={420}
                height={560}
                sizes="(max-width: 768px) 85vw, 400px"
                className="h-[min(268px,68vw)] w-auto max-w-none object-contain object-bottom drop-shadow-[0_20px_44px_rgba(0,0,0,0.55)] md:h-[min(310px,36vw)]"
                priority={host.id === "doron"}
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="host-stage-floor pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
          />
          <ChipCorners active={open} />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 w-0.5 origin-top bg-amber transition-transform duration-700 ease-out motion-reduce:transition-none ${
              open ? "scale-y-100" : "scale-y-0 group-hover/card:scale-y-[0.35]"
            }`}
          />
        </div>

        <SeamRule
          segment={open ? 72 : 48}
          className={`px-7 transition-opacity duration-500 md:px-8 ${open ? "opacity-100" : "opacity-70 group-hover/card:opacity-100"}`}
        />

        <div className="flex flex-col gap-2 px-7 pt-5 pb-7 text-right md:px-8">
          <MonoLabel tone="amber" size="xs">
            {host.code}
          </MonoLabel>
          <h3 className="text-[22px] font-bold transition-colors duration-300 group-hover/card:text-light">
            {host.title}
          </h3>
          <p className="text-[14px] leading-relaxed text-muted">{host.tagline}</p>
          <span className="mt-1 inline-flex items-center gap-2 text-[12px] text-faint">
            <span
              className={`size-1 rounded-full transition-colors duration-300 ${open ? "bg-amber" : "bg-blueprint group-hover/card:bg-amber/70"}`}
            />
            {open ? "סגור" : "לחצו לפרטים"}
          </span>
        </div>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`border-t border-rule px-7 pt-5 pb-7 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:px-8 md:pb-8 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <SeamRule segment={40} className="mb-5 opacity-80" />
            <p className="mb-6 max-w-[42ch] text-[15px] leading-relaxed text-body">{host.bio}</p>
            <div className="flex flex-col gap-3">
              <MonoLabel tone="faint" size="xs">
                FOLLOW
              </MonoLabel>
              <ul className="flex flex-wrap gap-2">
                {host.socials.map((item, index) => (
                  <li
                    key={item.id}
                    className="transition-[opacity,transform] duration-500 motion-reduce:transition-none"
                    style={
                      open && !reduced
                        ? {
                            transitionDelay: `${120 + index * 55}ms`,
                            opacity: 1,
                            transform: "translateY(0)",
                          }
                        : { opacity: open ? 1 : 0, transform: open ? "none" : "translateY(6px)" }
                    }
                  >
                    <a
                      href={item.href || undefined}
                      aria-label={`${host.title} ב${item.label}`}
                      aria-disabled={item.href ? undefined : true}
                      onClick={(event) => {
                        if (!item.href) event.preventDefault();
                      }}
                      className={`inline-flex h-9 items-center gap-2 rounded-chip border px-2.5 pr-3 transition-colors ${
                        item.href
                          ? "border-blueprint text-steel-light hover:border-amber hover:text-amber"
                          : "pointer-events-none border-rule text-faint"
                      }`}
                    >
                      <SocialMark id={item.id} className="size-[16px]" />
                      <span className="text-[12px]">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
