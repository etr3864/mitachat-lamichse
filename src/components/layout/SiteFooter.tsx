import { LogoMark } from "@/components/brand/LogoMark";
import { MonoLabel } from "@/components/brand/MonoLabel";
import { SocialMark } from "@/components/brand/SocialMark";
import { site, socials, type SocialId } from "@/content/site";

const listen = socials.filter((item) => item.kind === "listen");
const follow = socials.filter((item) => item.kind === "follow");

export function SiteFooter() {
  return (
    <footer className="border-t border-edge">
      <div className="flex flex-col gap-10 px-6 py-10 md:px-10 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex items-start gap-3.5">
            <LogoMark
              height={18}
              variant="bar"
              strataCount={3}
              className="mt-1 flex-none opacity-60"
            />
            <div className="flex flex-col gap-1.5">
              <span className="text-[15px] font-bold text-dim">{site.name}</span>
              <span className="text-[13px] text-faint">פודקאסט · {site.tagline}</span>
            </div>
          </div>
          <MonoLabel tone="faint" size="xs">
            {site.cadence}
          </MonoLabel>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          <SocialGroup code="LISTEN" heading="האזינו ב" items={listen} named />
          <SocialGroup code="FOLLOW" heading="עקבו ב" items={follow} />
        </div>
      </div>
    </footer>
  );
}

function SocialGroup({
  code,
  heading,
  items,
  named = false,
}: {
  code: string;
  heading: string;
  items: readonly { id: SocialId; label: string; href: string }[];
  named?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <MonoLabel tone="faint" size="xs">
          {code}
        </MonoLabel>
        <span className="text-[13px] text-subtle">{heading}</span>
      </div>
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href || undefined}
              aria-label={item.label}
              aria-disabled={item.href ? undefined : true}
              className={`inline-flex h-10 items-center gap-2.5 rounded-chip border px-2.5 transition-colors ${
                named ? "pr-3.5" : ""
              } ${
                item.href
                  ? "border-blueprint text-steel-light hover:border-amber hover:text-amber"
                  : "pointer-events-none border-rule text-faint"
              }`}
            >
              <SocialMark id={item.id} className="size-[18px]" />
              {named ? <span className="text-[13px]">{item.label}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
