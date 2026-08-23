import { PageFrame } from "@/components/layout/PageFrame";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { HoodSeam } from "@/components/sections/HoodSeam";
import { KnowledgeGraph } from "@/components/sections/graph/KnowledgeGraph";
import { MethodStage } from "@/components/sections/method/MethodStage";

export default function HomePage() {
  return (
    <PageFrame>
      <main className="overflow-x-clip">
        <Hero />
        <HoodSeam />
        <MethodStage />
        <KnowledgeGraph />
        <About />
        <Contact />
      </main>
    </PageFrame>
  );
}
