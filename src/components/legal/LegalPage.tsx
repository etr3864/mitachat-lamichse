import { MonoLabel } from "@/components/brand/MonoLabel";
import { PageFrame } from "@/components/layout/PageFrame";
import { legalDocs, legalNav, type LegalSlug } from "@/content/legal";

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const doc = legalDocs[slug];

  return (
    <PageFrame>
      <main className="px-6 pt-16 pb-24 md:px-10 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-[42rem]">
          <nav aria-label="מסמכים משפטיים" className="mb-10 flex flex-wrap gap-x-1 border-b border-rule">
            {legalNav.map((item) => {
              const current = item.slug === slug;
              return (
                <a
                  key={item.slug}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`-mb-px px-3 py-2 text-[12px] transition-colors ${
                    current
                      ? "border-b border-amber text-light"
                      : "border-b border-transparent text-faint hover:text-muted"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <header className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h1 className="text-[clamp(24px,4vw,32px)] font-bold tracking-[-0.02em]">{doc.title}</h1>
            <MonoLabel tone="faint" size="xs">
              {`UPDATED ${doc.updated}`}
            </MonoLabel>
          </header>

          <div className="flex flex-col gap-9">
            {doc.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-[16px] font-bold">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
    </PageFrame>
  );
}
