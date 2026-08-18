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

      {/* Top-to-bottom hold plus a centre well, so the copy never fights the plate */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--color-ink) 82%, transparent) 0%, color-mix(in srgb, var(--color-ink) 52%, transparent) 34%, color-mix(in srgb, var(--color-ink) 56%, transparent) 74%, color-mix(in srgb, var(--color-ink) 78%, transparent) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[min(720px,94vw)] -translate-x-1/2 md:w-[min(720px,54vw)]"
        style={{
          background:
            "radial-gradient(60% 52% at 50% 34%, color-mix(in srgb, var(--color-ink) 94%, transparent) 0%, color-mix(in srgb, var(--color-ink) 74%, transparent) 44%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint-columns"
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

      <div className="relative flex min-h-[100svh] flex-col items-center justify-center gap-14 px-6 pt-28 pb-32 text-center md:justify-start md:gap-[76px] md:px-10 md:pt-26">
        <LogoMark
          strataCount={5}
          className="h-[clamp(120px,27vh,250px)]"
          hollowFill="var(--color-ink)"
        />

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[clamp(30px,7vw,68px)] leading-[0.96] font-bold tracking-[-0.035em] text-balance whitespace-nowrap">
            {site.name}
          </h1>
          <div className="flex items-center justify-center gap-3.5">
            <span className="h-px w-6 bg-blueprint sm:w-10" />
            <span className="text-[13px] text-muted sm:text-[15px]">{site.tagline}</span>
            <span className="h-px w-6 bg-blueprint sm:w-10" />
          </div>
        </div>

        <p className="max-w-[44ch] text-[17px] leading-relaxed text-balance text-body md:text-[19px]">
          {site.mission}
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="size-[6px] rounded-full bg-amber" />
            <MonoLabel tone="amber">LISTEN</MonoLabel>
            <span className="size-[6px] rounded-full bg-amber" />
          </div>
          <p className="text-[17px] leading-snug text-light md:text-[19px]">
            האזינו לפודקאסט
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {platforms.map((platform) => (
              <li key={platform.id}>
                <a
                  href={platform.href || undefined}
                  aria-label={`האזינו ב${platform.label}`}
                  aria-disabled={platform.href ? undefined : true}
                  className={`inline-flex h-11 items-center gap-2.5 rounded-chip border px-3.5 pr-4 transition-colors ${
                    platform.href
                      ? "border-amber/70 text-light hover:border-amber hover:text-amber"
                      : "pointer-events-none border-blueprint text-muted"
                  }`}
                >
                  <SocialMark id={platform.id} className="size-[18px]" />
                  <span className="text-[13px]">{platform.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
