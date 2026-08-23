import { SectionHeading } from "@/components/brand/SectionHeading";
import { Container } from "@/components/layout/Container";
import { HostCard } from "@/components/sections/HostCard";
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
          <HostCard key={host.id} host={host} />
        ))}
      </div>
    </Container>
  );
}
