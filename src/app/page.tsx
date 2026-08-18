import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { HoodSeam } from "@/components/sections/HoodSeam";
import { KnowledgeGraph } from "@/components/sections/graph/KnowledgeGraph";
import { MethodStage } from "@/components/sections/method/MethodStage";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HoodSeam />
        <MethodStage />
        <KnowledgeGraph />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
