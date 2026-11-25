"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { featuredProjects, type DemoKind } from "@/content/portfolio";
import { BrowserFrame, PhoneFrame } from "@/components/DeviceFrames";
import ClusterDemo from "@/components/demos/ClusterDemo";
import WorkflowDemo from "@/components/demos/WorkflowDemo";
import ScreeningDemo from "@/components/demos/ScreeningDemo";
import PlanDemo from "@/components/demos/PlanDemo";

const demos: Record<DemoKind, () => React.JSX.Element> = {
  cluster: ClusterDemo,
  workflow: WorkflowDemo,
  screening: ScreeningDemo,
  plan: PlanDemo,
};

export default function ProjectCaseStudy({ slug }: { slug: string }) {
  const project = featuredProjects.find((item) => item.slug === slug)!;
  const reduceMotion = useReducedMotion();
  const showcase = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: showcase, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [80, -80]);
  const browserY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [24, -24]);

  const index = featuredProjects.indexOf(project);
  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const Demo = demos[project.demo];

  return (
    <main className="case">
      <section className="site-shell case-head">
        <Link className="text-link back-link" href="/#work"><FiArrowLeft /> All work</Link>
        <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{project.title}</motion.h1>
        <p className="case-summary">{project.summary}</p>
        <dl className="case-facts">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          <div><dt>Field</dt><dd>{project.sector}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
        </dl>
      </section>

      <div ref={showcase} className={`site-shell case-showcase ${project.images.mobile ? "has-phone" : ""}`}>
        <motion.div style={{ y: browserY }} className="case-browser">
          <BrowserFrame src={project.images.desktop} alt={project.images.alt} url={project.images.url} priority sizes="(max-width: 900px) 94vw, 76vw" />
        </motion.div>
        {project.images.mobile && (
          <motion.div style={{ y: phoneY }} className="case-phone">
            <PhoneFrame src={project.images.mobile} alt={`${project.title} on a phone`} sizes="(max-width: 900px) 40vw, 20vw" />
          </motion.div>
        )}
      </div>

      <section className="site-shell case-section">
        <h2>The problem</h2>
        <p className="case-problem">{project.problem}</p>
      </section>

      <section className="site-shell case-section">
        <h2>What I built</h2>
        <ul className="built-list">
          {project.built.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="site-shell case-section">
        <h2>Across the stack</h2>
        <dl className="layer-list">
          {project.layers.map((item) => (
            <div key={item.layer}>
              <dt>{item.layer}</dt>
              <dd>{item.tech}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="case-demo-section">
        <div className="site-shell">
          <div className="case-demo-head">
            <h2>{project.demoTitle}</h2>
            <p>{project.demoNote}</p>
          </div>
          <Demo />
        </div>
      </section>

      <section className="site-shell case-section">
        <h2>Engineering decisions</h2>
        <div className="decision-list">
          {project.decisions.map((decision) => (
            <article key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell case-section">
        <h2>Built with</h2>
        <div>
          <p className="stack-line">{project.stack.join(", ")}</p>
          <p className="case-links">
            {project.links.map((link) => (
              <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noreferrer">{link.label} <FiArrowUpRight className="arrow" /></a>
            ))}
          </p>
        </div>
      </section>

      <Link href={`/work/${next.slug}`} className="case-next" data-cursor="Next">
        <span className="site-shell">
          <span className="case-next-label">Next project</span>
          <span className="case-next-title">{next.title} <FiArrowUpRight /></span>
        </span>
      </Link>
    </main>
  );
}
