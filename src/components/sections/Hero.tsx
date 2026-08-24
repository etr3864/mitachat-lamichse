import { LogoMark } from "@/components/brand/LogoMark";
import { MonoLabel } from "@/components/brand/MonoLabel";
import { SocialMark } from "@/components/brand/SocialMark";
import { HeroPlate } from "@/components/sections/HeroPlate";
import { platforms, site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <HeroPlate />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint-columns opacity-40"
        style={{ ["--grid-size" as string]: "96px" }}
      />
      {/*
        The plate has to land on the page colour before the section ends, or the
        boundary reads as a cut. A near-miss is not enough: a few percent of a
        specular highlight is still visible against solid ink, so the band holds
        opaque for its last stretch.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30svh]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--color-ink) 40%, transparent) 38%, color-mix(in srgb, var(--color-ink) 82%, transparent) 68%, var(--color-ink) 90%, var(--color-ink) 100%)",
        }}
      />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-start gap-7 px-6 pt-16 pb-8 text-center md:gap-[76px] md:px-10 md:pt-26 md:pb-32">
        <div className="relative flex w-full max-w-[34rem] flex-col items-center gap-6 md:max-w-none md:gap-[76px]">
          {/* Soft spot behind lockup only — plate stays visible everywhere else */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-7 z-0 md:-inset-x-14 md:-inset-y-10"
            style={{
              background:
                "radial-gradient(ellipse 78% 72% at 50% 44%, color-mix(in srgb, var(--color-ink) 62%, transparent) 0%, color-mix(in srgb, var(--color-ink) 34%, transparent) 36%, color-mix(in srgb, var(--color-ink) 12%, transparent) 54%, transparent 68%)",
            }}
          />

          <LogoMark
            strataCount={5}
            className="relative z-[1] h-[92px] drop-shadow-[0_0_28px_color-mix(in_srgb,var(--color-ink)_72%,transparent)] md:h-[clamp(120px,27vh,250px)] [&_g:last-child]:hidden md:[&_g:last-child]:block"
            hollowFill="var(--color-ink)"
          />

          <div className="relative z-[1] flex flex-col items-center gap-2.5 md:gap-4">
            <h1 className="hero-copy-shadow text-[clamp(30px,8.4vw,38px)] leading-[1.04] font-bold tracking-[-0.035em] text-balance md:text-[clamp(30px,7vw,68px)] md:leading-[0.96] md:whitespace-nowrap">
              {site.name}
            </h1>
            <div className="flex items-center justify-center gap-3.5">
              <span className="h-px w-6 bg-blueprint sm:w-10" />
              <span className="hero-copy-shadow text-[14px] text-muted sm:text-[15px]">{site.tagline}</span>
              <span className="h-px w-6 bg-blueprint sm:w-10" />
            </div>
          </div>

          <p className="hero-copy-shadow relative z-[1] max-w-[44ch] text-[16px] leading-snug text-balance text-body md:text-[19px] md:leading-relaxed">
            {site.mission}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2.5 md:gap-4">
          <div className="flex items-center gap-3">
            <span className="size-[6px] rounded-full bg-amber" />
            <MonoLabel tone="amber">LISTEN</MonoLabel>
            <span className="hidden size-[6px] rounded-full bg-amber md:block" />
            <span className="text-[14px] leading-snug text-light md:hidden">האזינו לפודקאסט</span>
          </div>
          <p className="hidden text-[17px] leading-snug text-light md:block md:text-[19px]">
            האזינו לפודקאסט
          </p>
          <ul className="flex w-full flex-nowrap items-center justify-center gap-1.5 md:w-auto md:gap-2.5">
            {platforms.map((platform) => (
              <li key={platform.id} className="min-w-0">
                <a
                  href={platform.href || undefined}
                  aria-label={`האזינו ב${platform.label}`}
                  aria-disabled={platform.href ? undefined : true}
                  className={`inline-flex h-8 max-w-full items-center gap-1.5 rounded-chip border px-2 whitespace-nowrap transition-colors md:h-11 md:gap-2.5 md:px-3.5 md:pr-4 ${
                    platform.href
                      ? "border-amber/70 text-light hover:border-amber hover:text-amber"
                      : "pointer-events-none border-blueprint text-muted"
                  }`}
                >
                  <SocialMark id={platform.id} className="size-3.5 shrink-0 md:size-[18px]" />
                  <span className="text-[11px] md:hidden">{platform.short}</span>
                  <span className="hidden text-[13px] md:inline">{platform.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
