import { MonoLabel } from "@/components/brand/MonoLabel";
import { SeamRule } from "@/components/brand/SeamRule";
import { Container } from "@/components/layout/Container";
import { contact } from "@/content/site";

export function Contact() {
  return (
    <Container as="section" id="contact" className="pb-28 md:pb-36">
      <div className="border border-frame bg-panel">
        <div className="relative overflow-hidden px-7 py-14 md:px-14 md:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-blueprint-grid opacity-60"
            style={{ ["--grid-size" as string]: "48px" }}
          />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="flex max-w-[46ch] flex-col gap-5">
              <MonoLabel tone="subtle" size="xs">
                GET IN TOUCH
              </MonoLabel>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.05] font-bold tracking-[-0.025em]">
                {contact.heading}
              </h2>
              <p className="text-[16px] leading-relaxed text-muted">{contact.body}</p>
            </div>

            <div className="flex w-full max-w-[560px] flex-col gap-6">
              <form
                action={`mailto:${contact.email}`}
                method="post"
                encType="text/plain"
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="contact-topic" className="sr-only">
                  מה תרצו שנצלול אליו?
                </label>
                <input
                  id="contact-topic"
                  name="body"
                  type="text"
                  placeholder="מה תרצו שנצלול אליו?"
                  className="min-w-0 flex-1 rounded-chip border border-blueprint bg-panel px-5 py-3 text-[15px] text-light outline-none transition-colors placeholder:text-faint focus:border-amber"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 rounded-chip border border-blueprint px-5 py-3 text-light transition-colors hover:border-amber"
                >
                  <span className="size-[5px] rounded-full bg-amber" />
                  <MonoLabel tone="light" size="sm">
                    שלחו לנו
                  </MonoLabel>
                </button>
              </form>
            </div>
          </div>
        </div>
        <SeamRule className="px-7 pb-10 md:px-14" segment={70} />
      </div>
    </Container>
  );
}
