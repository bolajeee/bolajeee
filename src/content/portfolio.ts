export type FeaturedProject = {
  slug: string;
  number: string;
  discipline: string;
  title: string;
  short: string;
  context: string;
  role: string;
  visual: "screening" | "insurance" | "revenue";
  link?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "leaders-cv-checker",
    number: "01",
    discipline: "AI · Full-stack",
    title: "Leaders CV Checker",
    short: "A clearer way to review candidates at scale.",
    context:
      "An AI-assisted recruitment product centered on bulk CV analysis and structured screening workflows for recruiters.",
    role: "Software engineering",
    visual: "screening",
  },
  {
    slug: "builders-liability",
    number: "02",
    discipline: "Insurance · Platform",
    title: "Builders’ Liability Insurance Platform",
    short: "Insurance workflows built around the realities of construction.",
    context:
      "A digital platform connecting insurance workflows with construction-sector stakeholders, including policy and claims operations.",
    role: "Technical leadership",
    visual: "insurance",
    link: "https://fctbuilders.gladfaith.com/",
  },
  {
    slug: "revenue-assurance",
    number: "03",
    discipline: "Data · Engineering",
    title: "Revenue Assurance & Commission Intelligence",
    short: "Making complex financial operations easier to understand.",
    context:
      "A data-oriented platform concept for reconciliation, audit trails, operational insight, and commission workflows.",
    role: "Software engineering",
    visual: "revenue",
  },
];

export const otherProjects = [
  {
    title: "Temperature’s Couture",
    description: "Fashion commerce experience",
    image: "/assets/proj1.png",
    href: "https://munis-world.vercel.app/",
  },
  {
    title: "Admin Management System",
    description: "Tasks, messages, and reporting",
    image: "/assets/proj2.png",
    href: "https://admin-management-frontend.vercel.app/",
  },
  {
    title: "AI Summarizer",
    description: "Article summarization tool",
    image: "/assets/proj3.png",
    href: "https://ai-summarizer-sable-six.vercel.app/",
  },
  {
    title: "Fitness Tracker API",
    description: "Django REST API · walkthrough",
    image: "/assets/proj4.png",
    href: "https://www.loom.com/share/6c4649e79ef048abb4314ad807e9070e?sid=4e61fae3-f5b1-4fd8-99d8-d92efc946945",
  },
  {
    title: "Knightsbridge Gas Energy",
    description: "Corporate website redesign",
    image: "/assets/proj-knightsbridge.svg",
    href: "https://knightsbridgeng.com/",
  },
];

export const credentials = [
  { title: "InternPulse Cohort 6 — Finalist, top 1%", detail: "Frontend Development · InternPulse", year: "2025", category: "Recognition" },
  { title: "Back-End Web Development", detail: "ALX Software Engineering Programme", year: "2025", category: "Software" },
  { title: "Professional Foundations", detail: "ALX", year: "2025", category: "Professional development" },
  { title: "AI Starter Kit", detail: "ALX", year: "2025", category: "AI" },
  { title: "Virtual Assistant Programme — With Honors", detail: "ALX", year: "2022", category: "Professional development" },
  { title: "AI for Beginners", detail: "HP LIFE", year: "—", category: "AI" },
  { title: "Project Management Course", detail: "FoodTech course", year: "—", category: "Professional development" },
  { title: "Design of Experiments", detail: "Nestlé FoodTech", year: "—", category: "Food engineering" },
  { title: "Consumer Understanding", detail: "Nestlé FoodTech", year: "—", category: "Food engineering" },
  { title: "Food Product Development", detail: "Nestlé FoodTech", year: "—", category: "Food engineering" },
  { title: "Side Hustle Certificate", detail: "Side Hustle", year: "—", category: "Professional development" },
];

export const experience = [
  { period: "2025 — now", role: "Technical Lead · Builders’ Liability Insurance Platform", company: "Kuagi Resources" },
  { period: "2024 — now", role: "Senior Software Engineer", company: "Leaders Network" },
  { period: "2022 — 2024", role: "Business Management Team Lead", company: "Kuagi Resources" },
  { period: "2023", role: "Quality Assurance", company: "OK Foods" },
];

export const resumeUrl = "https://drive.google.com/file/d/1oVrM1SqjUSLeoEXaxzX-wVJs1jXSRv1D/view?usp=drive_link";
export const contactEmail = "ibrahimomobolaji1999@gmail.com";
