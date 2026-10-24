import type { ReactNode } from "react";
import { ProjectDeck } from "@/components/ProjectDeck";
import { AboutContent } from "@/components/sections/About";
import { ExperienceContent } from "@/components/sections/Experience";
import { HomeContent } from "@/components/sections/Home";
import { projects } from "@/lib/content";
import type { SectionId } from "@/lib/sections";

// Each section keeps 74px at its top for the fixed header, so jumping to it from the nav
// shows it like its Figma frame. The side margins sit on the section; the content inside is
// laid out at its Figma width and then scaled down by --ui-scale to fit them (see globals.css).
function Section({ id, label, children }: { id: SectionId; label: string; children: ReactNode }) {
  return (
    <section id={id} aria-label={label} className="px-page pt-[74px]">
      <div className="ui-scale mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Section id="home" label="Home">
        <HomeContent />
      </Section>
      <Section id="about" label="About me">
        <AboutContent />
      </Section>
      <Section id="experience" label="Experience">
        <ExperienceContent />
      </Section>
      <Section id="projects" label="Projects">
        <ProjectDeck projects={projects} />
      </Section>
    </>
  );
}
