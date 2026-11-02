// The site is one long page; these are its sections, top to bottom. "About Me" covers both the
// intro and the Education / How I Work part.
export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
