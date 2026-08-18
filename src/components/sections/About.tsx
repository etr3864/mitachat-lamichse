import { MonoLabel } from "@/components/brand/MonoLabel";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { Container } from "@/components/layout/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { about, hosts } from "@/content/hosts";

export function About() {
  return (
    <Container as="section" id="about" className="pt-20 pb-28 md:pt-28 md:pb-36">
      <SectionHeading code={about.code} heading={about.heading} label={about.label} />

      <p className="mb-16 max-w-[40ch] text-[21px] leading-snug tracking-[-0.01em] text-pretty md:mb-18 md:text-[26px] md:leading-[1.45]">
        {about.body}
      </p>

      <div className="grid gap-7 md:grid-cols-2">
        {hosts.map((host) => (
          <article key={host.id} className="flex flex-col border border-rule bg-panel">
            <div className="h-[260px] border-b border-rule md:h-[300px]">
              <MediaSlot
                src={host.image}
                alt={host.title}
                brief={host.imageBrief}
                code={host.code}
              />
            </div>
            <div className="flex flex-col gap-2.5 p-7 md:px-8">
              <MonoLabel tone="amber" size="xs">
                {host.code}
              </MonoLabel>
              <h3 className="text-[22px] font-bold">{host.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
