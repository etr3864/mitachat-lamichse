"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { MonoLabel } from "@/components/brand/MonoLabel";
import { SocialMark } from "@/components/brand/SocialMark";
import type { Host } from "@/content/hosts";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const moodStyles = {
  steel: {
    glow: "radial-gradient(90% 80% at 50% 88%, color-mix(in srgb, var(--color-steel) 28%, transparent) 0%, transparent 68%)",
    floor: "radial-gradient(ellipse 80% 100% at 50% 50%, color-mix(in srgb, var(--color-steel) 35%, transparent) 0%, transparent 72%)",
    ring: "group-hover:border-steel-light/60",
    openBorder: "border-steel-light/40",
  },
  warm: {
    glow: "radial-gradient(95% 85% at 50% 82%, color-mix(in srgb, var(--color-amber) 32%, transparent) 0%, transparent 70%)",
    floor: "radial-gradient(ellipse 80% 100% at 50% 50%, color-mix(in srgb, var(--color-amber) 40%, transparent) 0%, transparent 72%)",
    ring: "group-hover:border-amber/70",
    openBorder: "border-amber/50",
  },
} as const;

export function HostCard({ host }: { host: Host }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const panelId = useId();
  const mood = moodStyles[host.mood];
  const scale = host.portrait?.scale ?? 1;
  const wide = host.portrait?.wide ?? false;

  return (
    <article
      className={`flex flex-col border bg-panel transition-colors duration-300 ${
        open ? mood.openBorder : "border-rule"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full flex-col text-right outline-none"
      >
        <div className="relative h-[300px] overflow-hidden border-b border-rule md:h-[360px]">
          <div aria-hidden="true" className="absolute inset-0 bg-blueprint-grid opacity-40" />
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: mood.glow,
              opacity: open ? 1 : 0.72,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[12%] bottom-6 h-16 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:bottom-8 md:h-20"
            style={{ background: mood.floor }}
          />

          <div
            className={`absolute inset-x-0 bottom-0 flex h-[92%] items-end justify-center overflow-hidden transition-transform duration-500 ease-out ${
              reduced ? "" : "group-hover:-translate-y-1"
            } ${open && !reduced ? "-translate-y-2" : ""}`}
          >
            <div
              className={`flex h-full items-end justify-center ${wide ? "host-portrait-mask-wide" : "host-portrait-mask"}`}
              style={{ transform: `scale(${scale})`, transformOrigin: "50% 100%" }}
            >
              <Image
                src={host.image}
                alt={host.title}
                width={420}
                height={560}
                sizes="(max-width: 768px) 85vw, 400px"
                className="h-[min(280px,74vw)] w-auto max-w-none object-contain object-bottom drop-shadow-[0_22px_48px_rgba(0,0,0,0.6)] md:h-[min(320px,42vw)]"
                priority={host.id === "doron"}
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-panel via-panel/90 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-edge to-transparent"
          />

          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-3 border transition-colors duration-300 ${
              open ? "border-amber/35" : `border-transparent ${mood.ring}`
            }`}
          />
        </div>

        <div className="flex flex-col gap-2 p-7 text-right md:px-8">
          <MonoLabel tone="amber" size="xs">
            {host.code}
          </MonoLabel>
          <h3 className="text-[22px] font-bold">{host.title}</h3>
          <p className="text-[14px] leading-relaxed text-muted">{host.tagline}</p>
          <span className="mt-1 inline-flex items-center gap-2 text-[12px] text-faint">
            <span className={`size-1 rounded-full ${open ? "bg-amber" : "bg-blueprint"}`} />
            {open ? "סגור" : "לחצו לפרטים"}
          </span>
        </div>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-rule px-7 pt-5 pb-7 md:px-8 md:pb-8">
            <p className="mb-6 max-w-[42ch] text-[15px] leading-relaxed text-body">{host.bio}</p>
            <div className="flex flex-col gap-3">
              <MonoLabel tone="faint" size="xs">
                FOLLOW
              </MonoLabel>
              <ul className="flex flex-wrap gap-2">
                {host.socials.map((item) => (
                  <li key={item.id}>
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
