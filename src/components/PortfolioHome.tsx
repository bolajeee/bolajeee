"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { capabilities, contactEmail, experience, recognition, resumeUrl } from "@/content/portfolio";
import WorkStage from "@/components/home/WorkStage";
import MoreWork from "@/components/home/MoreWork";
import StackGrowth from "@/components/home/StackGrowth";
import Magnetic from "@/components/Magnetic";

const HeroField = dynamic(() => import("@/components/home/HeroField"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function PortfolioHome() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <main>
      <section className="hero" id="home">
        <HeroField />
        <div className="site-shell hero-inner">
          <h1 className="hero-title">
            <motion.span {...enter(0.1)}>I build the systems</motion.span>
            <motion.span {...enter(0.2)}>behind products</motion.span>
            <motion.span {...enter(0.3)}>people rely on.</motion.span>
          </h1>
          <motion.p className="hero-lede" {...enter(0.45)}>
            I’m Omobolaji Ibrahim, a software engineer. I take products from idea to production: the interface, the APIs and data behind it, and the infrastructure that ships and runs it.
          </motion.p>
          <motion.div className="hero-actions" {...enter(0.55)}>
            <Magnetic><a className="button-solid" href="#work">See the work <FiArrowDownRight size={17} /></a></Magnetic>
            <a className="text-link" href={resumeUrl} target="_blank" rel="noreferrer">Résumé <FiArrowUpRight className="arrow" /></a>
          </motion.div>
          <motion.p className="hero-caption" {...enter(0.8)}>
            Scattered signals, gathered into structure. Move your pointer through the field.
          </motion.p>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="site-shell section-head">
          <h2 className="section-title">Selected work</h2>
          <p>Four products I took across the stack, from the interface to where they run.</p>
        </div>
        <WorkStage />
        <div className="site-shell more-work">
          <h3 className="more-title">More work</h3>
          <MoreWork />
        </div>
      </section>

      <section className="capabilities-section">
        <div className="site-shell">
          <div className="section-head">
            <h2 className="section-title">The whole stack</h2>
            <p>Every layer a product needs, and the one I’m deepening now.</p>
          </div>
          <dl className="capability-list">
            {capabilities.map((item) => (
              <div key={item.title} className="capability-row">
                <dt>{item.title}</dt>
                <dd>
                  <p>{item.text}</p>
                  <span>{item.tools}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="growth-section">
        <div className="site-shell">
          <div className="section-head">
            <h2 className="section-title">How my stack grew</h2>
            <p>Each year added a layer. The record is in my GitHub history, from the first HTML pages to cloud services.</p>
          </div>
          <StackGrowth />
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="site-shell about-layout">
          <div>
            <h2 className="section-title">About</h2>
            <p className="about-lead">I came to software from food engineering, and I still think like a process engineer: understand the system, find where it leaks, then build the thing that fixes it.</p>
            <p className="about-text">Today I build products at Leaders Network and ship my own work in civic tech and agriculture. I’m now deepening the side many product engineers hand off, CI, containers, cloud and operations, through TS Academy’s DevOps programme.</p>
            <p className="about-links">
              <Link className="text-link" href="/engineering">Engineering and research background <FiArrowUpRight className="arrow" /></Link>
              <Link className="text-link" href="/credentials">Credentials <FiArrowUpRight className="arrow" /></Link>
            </p>
          </div>
          <div>
            <h3 className="list-title">Experience</h3>
            <ul className="experience-table">
              {experience.map((item) => (
                <li key={item.role}><span>{item.period}</span><strong>{item.role}</strong><span>{item.company}</span></li>
              ))}
            </ul>
            <h3 className="list-title">Recognition and learning</h3>
            <ul className="experience-table">
              {recognition.map((item) => (
                <li key={item.role}><span>{item.period}</span><strong>{item.role}</strong><span>{item.company}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="site-shell contact-layout">
          <h2>Have a product that needs building?</h2>
          <p>Tell me what you’re working on and what’s in the way.</p>
          <div className="contact-actions">
            <Magnetic strength={0.4}><a className="contact-button" href={`mailto:${contactEmail}`} data-cursor="Write">Email me</a></Magnetic>
            <a className="text-link" href="https://www.linkedin.com/in/bolajeee/" target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight className="arrow" /></a>
            <a className="text-link" href="https://github.com/bolajeee" target="_blank" rel="noreferrer">GitHub <FiArrowUpRight className="arrow" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
