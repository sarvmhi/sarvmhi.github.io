import type { Metadata } from "next";
import { ProjectDeck } from "@/components/ProjectDeck";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return <ProjectDeck projects={projects} />;
}
