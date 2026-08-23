import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { cta } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-ink/70 backdrop-blur-[14px]">
      <div className="flex min-w-0 items-center justify-between gap-3 px-6 py-4 md:gap-6 md:px-10 md:py-[18px]">
        <Link href="/#top" aria-label="לראש הדף" className="min-w-0 shrink">
          <Lockup size="md" />
        </Link>

        <Link
          href={cta.href}
          className="flex shrink-0 items-center gap-2.5 rounded-chip border border-blueprint px-3.5 py-2 text-light transition-colors hover:border-amber"
        >
          <span className="size-[5px] rounded-full bg-amber" />
          {cta.label}
        </Link>
      </div>
    </header>
  );
}
