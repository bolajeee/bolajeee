export type DemoKind = "cluster" | "workflow" | "screening" | "plan";

export type FeaturedProject = {
  slug: string;
  title: string;
  sector: string;
  year: string;
  role: string;
  status: string;
  summary: string;
  problem: string;
  built: string[];
  decisions: { title: string; text: string }[];
  stack: string[];
  demo: DemoKind;
  demoTitle: string;
  demoNote: string;
  images: { desktop: string; mobile?: string; alt: string; url: string };
  links: { label: string; href: string }[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "civicai",
    title: "CivicAI",
    sector: "Civic tech, AI",
    year: "2026",
    role: "Full-stack engineering",
    status: "In development. Runs locally and in CI, not yet deployed.",
    summary:
      "Citizens report broken roads, flooding and waste from their phones. CivicAI turns overlapping reports into a ranked list of real problems for government teams.",
    problem:
      "Ten people photographing the same pothole is ten reports, but one problem. Government teams need the problem, its severity and where it is, not a feed of duplicates.",
    built: [
      "A Flutter citizen app for Android and iOS, including SOS: it finds nearby emergency facilities and texts the citizen's trusted contacts.",
      "A React and TypeScript government dashboard for reviewing clustered issues on a map.",
      "A Fastify API in TypeScript over Supabase Postgres 17, with PostGIS for location and pgvector for report embeddings.",
    ],
    decisions: [
      {
        title: "A report is an observation. A cluster is the problem.",
        text: "The data model separates what a citizen saw from the civic problem underneath it, so duplicates strengthen an issue instead of burying it.",
      },
      {
        title: "AI workers inside the API, each behind a flag",
        text: "Classification, severity, text and image embeddings, duplicate detection, clustering and priority run as background workers in the API process. Each is off by default, so there is no separate AI service to operate.",
      },
      {
        title: "Location and similarity in one database",
        text: "PostGIS answers “what is near this report?” and pgvector answers “what looks like this report?”. Both live in Postgres, so a duplicate check is one query, not two systems.",
      },
      {
        title: "Row-level security on every public table",
        text: "Access rules are enforced by the database itself through migrations, not only by the API.",
      },
    ],
    stack: ["Flutter", "React", "TypeScript", "Fastify", "Postgres", "PostGIS", "pgvector", "Supabase"],
    demo: "cluster",
    demoTitle: "Watch reports become issues",
    demoNote: "An illustration of the clustering idea with simulated reports, not live data.",
    images: { desktop: "/assets/work/civicai-desktop.webp", mobile: "/assets/work/civicai-mobile.webp", alt: "CivicAI government workspace sign-in screen", url: "https://civic-ai-cyan.vercel.app" },
    links: [{ label: "Source on GitHub", href: "https://github.com/bolajeee/Civic-ai" }],
  },
  {
    slug: "builders-liability",
    title: "Builders’ Liability",
    sector: "Insurance platform",
    year: "2025",
    role: "Full-stack engineering",
    status: "Live",
    summary:
      "A digital insurance portal for construction in the FCT. Owners request cover, two independent surveyors assess the site, and AMMC and NIA administrators issue and manage policies.",
    problem:
      "Compulsory builders’ liability cover involved property owners, surveyors and two regulators passing paperwork between them. Every hand-off was a place for a request to stall.",
    built: [
      "A Next.js 14 and TypeScript frontend with five role-based workspaces: property owner, AMMC admin, NIA admin, surveyor and super admin.",
      "A Node.js, Express and MongoDB API covering authentication, properties, policy generation, documents and notifications.",
      "Document upload and report download for survey evidence, with real-time assignment tracking.",
    ],
    decisions: [
      {
        title: "Two surveyors per request",
        text: "Each request is assigned to two independent surveyors, and the platform coordinates both reports before a policy decision, instead of trusting a single assessment.",
      },
      {
        title: "Five roles, one codebase",
        text: "Every role has its own routes and dashboard, scoped by the authenticated user, so a surveyor and a regulator see the same request through different lenses.",
      },
      {
        title: "Security at the edges",
        text: "JWT sessions, OTP email verification for sensitive changes, API-key protected routes and rate limiting on the API.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Cloudinary"],
    demo: "workflow",
    demoTitle: "Follow a request through the platform",
    demoNote: "A simplified walkthrough of the request lifecycle. Steps are condensed.",
    images: { desktop: "/assets/work/builders-desktop.webp", alt: "Builders’ Liability portal home page", url: "https://fctbuilders.gladfaith.com" },
    links: [{ label: "Visit the platform", href: "https://fctbuilders.gladfaith.com/" }],
  },
  {
    slug: "leaders-cv-checker",
    title: "Leaders CV Checker",
    sector: "Recruitment, SaaS",
    year: "2026",
    role: "Software engineering",
    status: "Live",
    summary:
      "Recruiters set the skills, experience, location and certifications a role needs, upload a batch of CVs, and see who matches, ranked by score.",
    problem:
      "Screening a stack of CVs by hand is slow and inconsistent. Recruiters needed a structured first pass they could trust, and a paid product that bills correctly every time.",
    built: [
      "Bulk PDF upload and parsing, with rule-based matching across skills, experience, location and certifications.",
      "Monthly and annual plans paid through Paystack, with upload allowances per period.",
      "A rebuilt, server-rendered landing page where only navigation and pricing ship client JavaScript.",
    ],
    decisions: [
      {
        title: "Payments that can’t activate twice",
        text: "Transactions start on the server, webhooks are trusted only after signature verification, and activation is idempotent, so a duplicate callback never grants a plan twice.",
      },
      {
        title: "Allowances that hold under concurrency",
        text: "Uploads reserve credits atomically and stay tied to the period they started in, so two batches at a month boundary can’t overspend.",
      },
      {
        title: "Tests around money and calendars",
        text: "27 tests cover leap-year and month-end anniversaries, expiry, trial fallback, concurrent batches, failed uploads and mismatched payments.",
      },
      {
        title: "Only claims the product can back",
        text: "Unverified ratings, testimonials and AI features were removed from the marketing copy. The landing page describes what the matching actually does.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Firebase", "Paystack", "PDF.js", "Cloudinary"],
    demo: "screening",
    demoTitle: "Change the role, watch the ranking",
    demoNote: "Fictional candidates. A simplified version of the matching rules.",
    images: { desktop: "/assets/work/cvchecker-desktop.webp", mobile: "/assets/work/cvchecker-mobile.webp", alt: "Leaders CV Checker landing page", url: "https://leaderscvchecker.com" },
    links: [{ label: "Visit Leaders CV Checker", href: "https://leaderscvchecker.com" }],
  },
  {
    slug: "furrow",
    title: "Furrow",
    sector: "Agritech, PWA",
    year: "2026",
    role: "Product and engineering",
    status: "Landing page live. Pilot in planning.",
    summary:
      "A home-growing companion for busy Nigerian households: a weekly plan built around the time you actually have, starting with containers you already own.",
    problem:
      "Most first harvests fail on time, not knowledge. Advice assumes a free weekend and a garden; Furrow starts from a busy week, a balcony and what is already in the house.",
    built: [
      "The product spec, feature IDs with acceptance criteria, data model and API contracts for the pilot.",
      "A responsive Next.js landing page with a pilot signup that posts to a configurable webhook.",
      "The architecture for an installable PWA on Supabase with row-level security, Paystack and web-push reminders.",
    ],
    decisions: [
      {
        title: "An installable web app, not a native one",
        text: "Households open it from a link with no app-store install. The trade-off, weaker background work and push on some browsers, is written down rather than discovered later.",
      },
      {
        title: "An assistant that only talks farming",
        text: "The planned assistant checks scope and safety before answering, is grounded in reviewed crop guides, and enforces spending caps before calling the model.",
      },
      {
        title: "No invented numbers",
        text: "No prices, yields, savings or community figures appear anywhere until the pilot measures them.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Paystack", "PWA"],
    demo: "plan",
    demoTitle: "A plan that fits your week",
    demoNote: "An illustration of the planning idea, not pilot data.",
    images: { desktop: "/assets/work/furrow-desktop.webp", mobile: "/assets/work/furrow-mobile.webp", alt: "Furrow landing page", url: "https://furrow-landing.vercel.app" },
    links: [{ label: "Visit Furrow", href: "https://furrow-landing.vercel.app" }],
  },
];

export type OtherProject = { title: string; description: string; stack: string; href?: string; image?: string; note?: string };

export const otherProjects: OtherProject[] = [
  { title: "Finance management app", description: "Authentication, budgeting, transaction tracking and data aggregation services", stack: "Node.js, Express, MongoDB", note: "Private" },
  { title: "Social platform architecture", description: "API contracts, Redis caching and WebSocket notifications for real-time updates", stack: "Node.js, Redis, WebSockets", note: "Private" },
  { title: "Segment Context Service", description: "Multi-tenant event processing with AI-generated customer personas", stack: "Python, Cloud Run, Pub/Sub, Cloud SQL, Vertex AI", note: "Private" },
  { title: "Learn Gauge", description: "Workspace for an AI STEM tutor: lessons, quizzes and progress", stack: "Next.js, TypeScript", href: "https://learn-guage.vercel.app", image: "/assets/work/learngauge-desktop.webp" },
  { title: "Revenue Assurance", description: "Reconciliation, audit trails and commission workflows", stack: "Data engineering", note: "Private" },
  { title: "Temperature’s Couture", description: "Fashion commerce storefront", stack: "Next.js, TypeScript", href: "https://munis-world.vercel.app/", image: "/assets/proj1.png" },
  { title: "Admin Management System", description: "Tasks, messages and reporting, with its own REST API", stack: "React, Node.js, Express", href: "https://admin-management-frontend.vercel.app/", image: "/assets/proj2.png" },
  { title: "Fitness Tracker API", description: "ALX capstone: activity tracking, metrics and JWT-secured access", stack: "Django REST Framework, PostgreSQL", href: "https://www.loom.com/share/6c4649e79ef048abb4314ad807e9070e?sid=4e61fae3-f5b1-4fd8-99d8-d92efc946945", image: "/assets/proj4.png" },
  { title: "Knightsbridge Gas Energy", description: "Corporate website redesign", stack: "Web design", href: "https://knightsbridgeng.com/", image: "/assets/proj-knightsbridge.svg" },
];

export const capabilities = [
  { title: "Products end to end", text: "From the schema and the API to the screen. I own features across the whole stack instead of handing them over a wall.", tools: "Next.js, React, Node.js, Fastify, Express, Python" },
  { title: "Data that stays correct", text: "Relational models, geospatial and vector search, row-level security, idempotent payments, caching and event pipelines.", tools: "Postgres, PostGIS, pgvector, MySQL, MongoDB, Redis, Pub/Sub" },
  { title: "Interfaces people enjoy", text: "Responsive, accessible UI with motion that explains what changed, on the web and on phones, shaped by a year working as a graphic designer.", tools: "TypeScript, React, Tailwind CSS, Motion, WebGL, Flutter, React Native" },
  { title: "Practical AI", text: "Classification, embeddings, duplicate detection and LLM features with scope checks, flags and cost caps.", tools: "OpenAI, Gemini, Claude, Vertex AI" },
  { title: "Working in teams", text: "Two years leading a team at Kuagi Resources, and day-to-day Agile delivery with branches, pull requests and code reviews.", tools: "GitHub, Docker, Postman, Vercel" },
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
  { period: "2025 – now", role: "Software Engineer", company: "Leaders Network" },
  { period: "2024 – 2025", role: "Graphic Designer", company: "CMX Connect Lagos" },
  { period: "2025", role: "Software Engineer, capstone", company: "ALX" },
  { period: "2025", role: "Frontend Developer", company: "InternPulse" },
  { period: "2023 – 2025", role: "Team Lead Manager", company: "Kuagi Resources" },
  { period: "2023", role: "Quality Assurance Intern", company: "OK Foods" },
];

export const recognition = [
  { period: "Now", role: "DevOps Engineering programme", company: "TS Academy" },
  { period: "2025", role: "Finalist, top 1% of Cohort 6, Frontend Development", company: "InternPulse" },
  { period: "Award", role: "Exceptional Leadership Award", company: "" },
  { period: "Award", role: "NUESA 60 most reputable", company: "NUESA" },
  { period: "2024", role: "B.Eng. Food and Bioprocess Engineering, Second Class Upper", company: "University of Ilorin" },
];

export const resumeUrl = "https://drive.google.com/file/d/1oVrM1SqjUSLeoEXaxzX-wVJs1jXSRv1D/view?usp=drive_link";
export const contactEmail = "omobolaji.alt@gmail.com";
