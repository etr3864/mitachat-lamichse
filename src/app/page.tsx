import { PageFrame } from "@/components/layout/PageFrame";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { HoodSeam } from "@/components/sections/HoodSeam";
import { KnowledgeGraph } from "@/components/sections/graph/KnowledgeGraph";
import { MethodStage } from "@/components/sections/method/MethodStage";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <PageFrame>
      <main>
        <Hero />
        <HoodSeam />
        <MethodStage />
        <KnowledgeGraph />
        <About />
        <Contact sent={sent === "1"} />
      </main>
    </PageFrame>
  );
}
