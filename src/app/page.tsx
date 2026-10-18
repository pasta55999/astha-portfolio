import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ThinkingExplorer } from "@/components/ThinkingExplorer";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Marquee } from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProjectShowcase />
      <ThinkingExplorer />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
