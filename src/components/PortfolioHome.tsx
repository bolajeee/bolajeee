"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { contactEmail, experience, featuredProjects, otherProjects, resumeUrl } from "@/content/portfolio";
import ProjectArtwork from "@/components/ProjectArtwork";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

export default function PortfolioHome() {
  const reduceMotion = useReducedMotion();
  return (
    <main>
      <section className="hero" id="home">
        <div className="site-shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .45 }}
                className="eyebrow"
              >Software engineer · technical lead</motion.div>
              <h1>
                <motion.span className="line" initial={reduceMotion ? false : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .12 }}>Engineering ideas</motion.span>
                <motion.span className="line accent-word" initial={reduceMotion ? false : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .25 }}>into experiences.</motion.span>
              </h1>
              <motion.p className="hero-summary" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .42 }}>
                I’m Omobolaji Ibrahim — Bolajeee. I build thoughtful digital products, bringing engineering, product thinking, and a systems mindset to real-world problems.
              </motion.p>
              <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .58 }}>
                <a className="button-dark" href="#work">Explore selected work <FiArrowDownRight size={17} /></a>
                <a className="text-link" href={resumeUrl} target="_blank" rel="noreferrer">View résumé <FiArrowUpRight className="arrow" /></a>
              </motion.div>
            </div>
            <Reveal delay={.2} className="hero-note">
              <strong>Based in Nigeria.<br />Working everywhere.</strong>
              Software engineering shaped by a background in food engineering, technical leadership, and product delivery.
            </Reveal>
          </div>
          <div className="hero-foot"><span>Independent-minded engineering</span><span>Scroll to explore ↓</span></div>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="site-shell">
          <Reveal className="section-intro">
            <div><span className="eyebrow">01 / Selected work</span><h2 className="section-heading">A few problems<br />worth solving.</h2></div>
            <p>Product work shaped by people, operations, and the details that make systems useful.</p>
          </Reveal>
          <div className="feature-list">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * .07}>
                <article className="project-card">
                  <div className="project-info">
                    <div className="project-meta"><span>{project.number} / {project.discipline}</span><span>Case study</span></div>
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.short}</p>
                    </div>
                    <Link className="text-link" href={`/work/${project.slug}`}>Explore the work <FiArrowUpRight className="arrow" /></Link>
                  </div>
                  <ProjectArtwork kind={project.visual} />
                </article>
              </Reveal>
            ))}
          </div>

          <div className="more-work">
            <div className="more-work-heading"><h3>More work</h3><span className="muted">A few other builds</span></div>
            <div className="other-projects">
              {otherProjects.map((project) => (
                <a className="other-project" key={project.title} href={project.href} target="_blank" rel="noreferrer">
                  <div style={{ position: "relative", width: "100%", aspectRatio: "1.8", overflow: "hidden", borderRadius: ".55rem", marginBottom: "1rem", background: "var(--surface)" }}>
                    <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 520px) 90vw, (max-width: 800px) 44vw, 28vw" style={{ objectFit: "cover", transition: "transform .35s ease" }} />
                  </div>
                  <span>{project.description}</span><strong>{project.title} <FiArrowUpRight className="arrow" /></strong>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="site-shell about-grid">
          <Reveal><span className="eyebrow">02 / A little about me</span><h2 className="section-heading">Curious by nature.<br />An engineer by training.</h2></Reveal>
          <Reveal delay={.08} className="about-copy">
            <p>My journey began in food engineering, where I learned to look closely at systems, processes, and the details that make them work.</p>
            <p>Today, I bring that same curiosity to software: shaping digital products, solving complex problems, and working with people to turn ideas into useful experiences.</p>
            <div className="experience-list" aria-label="Selected experience">
              {experience.map((item) => <div className="experience-row" key={item.role}><time>{item.period}</time><strong>{item.role}</strong><span>{item.company}</span></div>)}
            </div>
            <div className="skills-row" aria-label="Areas of practice">
              {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "APIs", "Technical leadership", "Product delivery"].map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="recognition" className="section recognition-section">
        <div className="site-shell">
          <Reveal className="section-intro">
            <div><span className="eyebrow">03 / Selected recognition</span><h2 className="section-heading">A few milestones<br />along the way.</h2></div>
            <p>Selected software and professional development highlights. A fuller list is in the credentials archive.</p>
          </Reveal>
          <div className="recognition-grid">
            <Reveal className="recognition-card"><span className="year">2025 · INTERNPULSE</span><div><h3>Finalist — top 1% of Cohort 6</h3><p>Frontend Development · InternPulse</p></div></Reveal>
            <Reveal delay={.07} className="recognition-card"><span className="year">2025 · ALX</span><div><h3>Back-End Web Development</h3><p>Software Engineering Programme</p></div></Reveal>
            <Reveal delay={.14} className="recognition-card"><span className="year">2022 · ALX</span><div><h3>Virtual Assistant — With Honors</h3><p>Virtual Assistant Programme</p></div></Reveal>
          </div>
          <div className="recognition-footer"><span>Also: ALX Professional Foundations, AI Starter Kit, and food engineering training.</span><Link className="text-link" href="/credentials">View all credentials <FiArrowUpRight className="arrow" /></Link></div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="site-shell contact-grid">
          <div><span className="eyebrow">Have something in mind?</span><h2>Let’s build something meaningful.</h2><p>Have an idea, an opportunity, or a problem worth working through? I’d be glad to hear from you.</p></div>
          <a className="contact-button" href={`mailto:${contactEmail}`}>Get in<br />touch <FiArrowUpRight size={18} /></a>
        </div>
      </section>
    </main>
  );
}
