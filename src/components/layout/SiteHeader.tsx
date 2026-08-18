import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { cta } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-ink/70 backdrop-blur-[14px]">
      <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-10 md:py-[18px]">
        <Link href="/#top" aria-label="לראש הדף">
          <Lockup size="md" />
        </Link>

        <Link
          href={cta.href}
          className="flex items-center gap-2.5 rounded-chip border border-blueprint px-3.5 py-2 text-light transition-colors hover:border-amber"
        >
          <span className="size-[5px] rounded-full bg-amber" />
          {cta.label}
        </Link>
      </div>
    </header>
  );
}
