// The site is one long page; these are its sections, top to bottom.
export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
