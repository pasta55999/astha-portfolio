import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ThinkingExplorer } from "@/components/ThinkingExplorer";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectShowcase />
      <ThinkingExplorer />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
