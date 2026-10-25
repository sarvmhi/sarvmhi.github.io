// All site copy lives here, so text can be edited without touching layout code.
// Text is copied from the Figma file; items marked DRAFT still need your input.

export const profile = {
  name: "Sarvin M.",
  role: "Product Designer",
  focusArea: "Human-Computer Interaction",
  badge: {
    id: "ID / SRV-01-26",
    specializations: "Complex Systems",
    focus: "B2C",
    status: "Open to Work",
    workMode: "Hybrid",
    // Put your photo in public/assets/badge/ and set the path, e.g. "/assets/badge/photo.jpg"
    photo: null as string | null,
  },
  stats: [
    { value: "4", label: "Years of Experience" },
    { value: "20", label: "Completed Projects" },
  ],
  cvFile: "/Sarvin-CV.pdf",
};

export const education = [
  {
    degree: "BSc. Computer Engineering",
    years: "2019-2024",
    school: "Shahid Beheshti University",
  },
];

// The stamp collage on the About page has one slot per issuer (see components/Certificates.tsx)
export const certificates = {
  amanj: { title: "Product Design", issuer: "Amanj Academy" },
  ibm: { title: "UI/UX Designer", issuer: "IBM" },
  adobe: { title: "Graphic Designer", issuer: "Adobe" },
  google: { title: "UX Design", issuer: "Google" },
};

export const languages = [
  { name: "English", level: "IELTS 7.0" },
  { name: "French", level: "A2" },
];

export type Tool = { name: string; logo: string | null; size?: number };

export const howIWork: {
  number: string;
  title: string;
  align: "left" | "right";
  skills: string[];
  tools: Tool[];
}[] = [
  {
    number: "01",
    title: "Discover",
    align: "left",
    skills: ["User Research (Interviews, Surveys)", "Competitive Analysis", "Personas and Journey Mapping"],
    tools: [
      { name: "Notion", logo: "/assets/tools/notion.svg" },
      { name: "Google Forms", logo: "/assets/tools/google-forms.webp" },
      { name: "NotebookLM", logo: "/assets/tools/notebooklm.svg" },
    ],
  },
  {
    number: "02",
    title: "Design",
    align: "right",
    skills: ["Information Architecture", "Wireframing and Prototyping", "Design Systems"],
    tools: [
      { name: "Figma", logo: "/assets/tools/figma.svg" },
      { name: "Illustrator", logo: "/assets/tools/illustrator.svg" },
      { name: "Photoshop", logo: "/assets/tools/photoshop.svg" },
    ],
  },
  {
    number: "03",
    title: "Validate",
    align: "left",
    skills: ["Usability Testing", "A/B Testing", "Heuristic Evaluation"],
    tools: [
      { name: "MS Clarity", logo: "/assets/tools/ms-clarity.webp" },
      { name: "Maze", logo: "/assets/tools/maze.webp" },
    ],
  },
  {
    number: "04",
    title: "Build",
    align: "right",
    skills: ["Design Handoff", "Design QA", "Documentation"],
    tools: [
      { name: "React", logo: "/assets/tools/react.svg" },
      { name: "HTML", logo: "/assets/tools/html.svg" },
      { name: "CSS", logo: "/assets/tools/css.svg", size: 26 },
    ],
  },
];

export type Job = {
  role: string;
  company: string;
  location: string;
  dates: string;
  logo: { src: string | null; width: number; height: number };
  tasks: string[];
};

export const jobs: Record<"shabakeh" | "freelance" | "filmnet", Job> = {
  shabakeh: {
    role: "UI/UX Designer",
    company: "Shabakeh Afzar",
    location: "Tehran, Iran",
    dates: "Oct 2021 - Oct 2024",
    logo: { src: "/assets/logos/shabakeh-afzar.webp", width: 75, height: 37 },
    tasks: [
      "Designed a Jira-replacing project management platform with role-based dashboards for 20 technical staff.",
      "Designed an IT support ticketing system that cut call-center volume by 26%.",
      "Redesigned the corporate website’s information architecture for clearer services and stronger lead generation.",
    ],
  },
  // NOTE: in Figma the task lists of Freelancer and Filmnet are swapped
  // (TV/streaming work sits next to Freelancer). They are matched to the right company here.
  freelance: {
    role: "Product Designer",
    company: "Freelancer",
    location: "Hybrid",
    dates: "May 2026 - Present",
    logo: { src: "/assets/logos/freelance.webp", width: 30, height: 30 },
    tasks: [
      "Designed an eyewear e-commerce site with AR virtual try-on, shifting ~30% of sales from social media to the website.",
      "Designed a pediatric booking platform for mothers of children under 5, with vaccine reminders and urgent visits.",
    ],
  },
  filmnet: {
    role: "Product Designer",
    company: "Filmnet",
    location: "Tehran, Iran",
    dates: "Aug 2025 - Jan 2026",
    logo: { src: "/assets/logos/filmnet.webp", width: 75, height: 17 },
    tasks: [
      "Established a token-based design system across TV and web apps.",
      "Redesigned TV web browsing flow: −27% rage clicks, +14% load speed.",
      "Drove +40% CTR on exclusive content via a VWO A/B test on trailer-preview banners.",
      "Shipped wireframes and hi-fi Figma prototypes to production.",
    ],
  },
};

export type Project = {
  title: string;
  field: string;
  tags: string[];
  description: string;
  // Put cover images in public/assets/projects/ and set the path here
  image: string | null;
  caseStudyUrl: string | null;
};

export const projects: Project[] = [
  {
    title: "Media Player Redesign",
    field: "Media",
    tags: ["B2C", "iOS"],
    description: "Filmnet media player, with Shabakeh Afzar. [ONE LINE: THE PROBLEM AND WHAT CHANGED]",
    image: null,
    caseStudyUrl: null,
  },
  // DRAFT: the next two are built from your Experience page text. Edit or replace them.
  {
    title: "Pediatric Booking Platform",
    field: "Health",
    tags: ["B2C", "Web"],
    description:
      "A booking platform for mothers of children under 5, with vaccine reminders and urgent visits.",
    image: null,
    caseStudyUrl: null,
  },
  {
    title: "Eyewear Store with Virtual Try-On",
    field: "E-commerce",
    tags: ["B2C", "Web"],
    description:
      "An eyewear e-commerce site with AR virtual try-on that moved ~30% of sales from social media to the website.",
    image: null,
    caseStudyUrl: null,
  },
];

// Research section: the publication card on the left, two paragraphs on the right.
// Fields in [BRACKETS] still need your text.
export const research = {
  journal: "Entertainment Computing",
  year: "2025",
  publisher: "Elsevier",
  keywords: ["Serious games", "Psychology-grounded design", "[KEYWORD]"],
  title: "[FULL PAPER TITLE]",
  authors: ["[CO-AUTHOR]", "Sarvin M.", "[CO-AUTHOR]"],
  me: "Sarvin M.",
  summary:
    "We built a serious game grounded in psychology. [ONE OR TWO LINES: WHAT IT DOES, WHO IT IS FOR, WHAT YOU FOUND]",
  // Where "View Case Study" goes (case study or the paper); the button waits until this is set
  paperUrl: null as string | null,
  // Shown under the summary by "View citation"
  citation: "[FULL CITATION, E.G. APA: AUTHORS (2025). TITLE. ENTERTAINMENT COMPUTING, VOLUME, PAGES. DOI]",
  about: [
    "[PARAGRAPH 1: WHAT YOUR RESEARCH IS ABOUT: THE QUESTION BEHIND IT, AND WHY IT MATTERS FOR PEOPLE WHO LEARN OR PLAY WITH TECHNOLOGY.]",
    "[PARAGRAPH 2: HOW YOU WORK ON IT AND WHAT YOU FOUND: THE METHODS, WHAT THE STUDY SHOWED, AND WHAT YOU WANT TO EXPLORE NEXT.]",
  ],
};

// Footer links. Set the email and Google Scholar profile; an icon without a link shows but
// doesn't go anywhere yet.
export const contact = {
  email: null as string | null, // e.g. "you@example.com"
  scholar: null as string | null, // e.g. "https://scholar.google.com/citations?user=..."
  github: "https://github.com/sarvmhi" as string | null,
};
