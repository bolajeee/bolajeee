"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { featuredProjects } from "@/content/portfolio";
import PortfolioArtwork from "@/components/ProjectArtwork";

const details: Record<string, { challenge: string; focus: string; contribution: string }> = {
  "leaders-cv-checker": {
    challenge: "Recruitment teams need a practical way to move through large volumes of candidate information while keeping the review process structured.",
    focus: "The product brings bulk CV analysis and recruiter-facing screening workflows into one AI-assisted experience.",
    contribution: "I work across software engineering and product delivery, helping turn a complex review process into a tool recruiters can use with clarity.",
  },
  "builders-liability": {
    challenge: "Construction projects involve several stakeholders and insurance steps, from property information through policy administration and claims.",
    focus: "The platform connects construction-sector stakeholders with digital insurance workflows, including policy administration, property surveys, and claims handling.",
    contribution: "As technical lead, I help shape the platform and coordinate engineering work around the needs of the programme and its users.",
  },
  "revenue-assurance": {
    challenge: "Revenue and commission operations depend on reconciling information across records while keeping decisions and adjustments traceable.",
    focus: "The platform brings reconciliation, audit trails, and operational insight into a data-oriented workflow for commission intelligence.",
    contribution: "My focus is on engineering systems that make operational data easier to follow, review, and act on.",
  },
};

export default function ProjectCaseStudy({ slug }: { slug: string }) {
  const project = featuredProjects.find((item) => item.slug === slug);
  const reduceMotion = useReducedMotion();
  if (!project) return null;
  const content = details[slug];
  const next = featuredProjects[(featuredProjects.indexOf(project) + 1) % featuredProjects.length];

  return (
    <motion.main
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4, ease: "easeOut" }}
      className="site-shell"
    >
      <section className="case-hero">
        <Link className="text-link" href="/#work"><FiArrowLeft /> Back to selected work</Link>
        <p className="eyebrow" style={{ marginTop: "2.5rem" }}>{project.number} / {project.discipline}</p>
        <h1>{project.title}</h1>
        <p className="case-lede">{project.context}</p>
        <div className="case-meta">
          <div><span>Focus</span><strong>{project.discipline}</strong></div>
          <div><span>Role</span><strong>{project.role}</strong></div>
          <div><span>Project</span><strong>{project.title}</strong></div>
        </div>
      </section>

      <div className="case-art-wrap"><PortfolioArtwork kind={project.visual} /></div>

      <section className="case-body">
        <h2>The challenge</h2><p>{content.challenge}</p>
      </section>
      <section className="case-body">
        <h2>Product focus</h2><p>{content.focus}</p>
      </section>
      <section className="case-body">
        <h2>My contribution</h2><p>{content.contribution}</p>
      </section>

      {project.link && <p style={{ paddingBottom: "3rem" }}><a className="text-link" href={project.link} target="_blank" rel="noreferrer">Visit the public platform <FiArrowUpRight /></a></p>}
      <div className="case-next">
        <span className="muted">Next case study</span>
        <Link className="text-link" href={`/work/${next.slug}`}>{next.title} <FiArrowUpRight className="arrow" /></Link>
      </div>
    </motion.main>
  );
}
