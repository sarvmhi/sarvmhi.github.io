// The site is one long page; these are its sections, top to bottom. "About Me" covers both the
// intro and the Education / How I Work part. Home and Research are in the nav but have no
// section yet.
export const SECTIONS = [
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
