import type { ReactNode } from "react";
import { ProjectDeck } from "@/components/ProjectDeck";
import { AboutContent } from "@/components/sections/About";
import { ExperienceContent } from "@/components/sections/Experience";
import { IntroContent } from "@/components/sections/Intro";
import { ResearchContent } from "@/components/sections/Research";
import { projects } from "@/lib/content";

// One Figma frame. It keeps 74px at its top for the fixed header, so jumping to it from the nav
// shows it like its Figma frame. The side margins sit here; the content inside is laid out at
// its Figma width and then scaled down by --ui-scale to fit them (see globals.css).
function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="px-page pb-10 pt-[74px] md:pb-20">
      <div className="ui-scale mx-auto max-w-[1280px]">{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      {/* "About Me" in the nav: the intro, then Education / Certificates / How I Work */}
      <section id="about" aria-label="About me">
        <Frame>
          <IntroContent />
        </Frame>
        <Frame>
          <AboutContent />
        </Frame>
      </section>
      <section id="experience" aria-label="Experience">
        <Frame>
          <ExperienceContent />
        </Frame>
      </section>
      <section id="projects" aria-label="Projects">
        <Frame>
          <ProjectDeck projects={projects} />
        </Frame>
      </section>
      <section id="research" aria-label="Research">
        <Frame>
          <ResearchContent />
        </Frame>
      </section>
    </>
  );
}
