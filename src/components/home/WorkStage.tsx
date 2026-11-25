"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { featuredProjects, type FeaturedProject } from "@/content/portfolio";
import { BrowserFrame, PhoneFrame } from "@/components/DeviceFrames";

function Composition({ project, priority = false }: { project: FeaturedProject; priority?: boolean }) {
  return (
    <div className={`composition ${project.images.mobile ? "has-phone" : ""}`}>
      <BrowserFrame src={project.images.desktop} alt={project.images.alt} url={project.images.url} priority={priority} />
      {project.images.mobile && <PhoneFrame src={project.images.mobile} alt={`${project.title} on a phone`} />}
    </div>
  );
}

function Layer({ project, index, progress }: { project: FeaturedProject; index: number; progress: MotionValue<number> }) {
  const count = featuredProjects.length;
  // Each layer wipes up over the previous one during its slice of the scroll.
  const start = (index - 0.5) / count;
  const end = index / count;
  const reveal = useTransform(progress, [start, end], [100, 0], { clamp: true });
  const clipPath = useTransform(reveal, (value) => (index === 0 ? "inset(0% 0 0 0)" : `inset(${value}% 0 0 0)`));
  const scale = useTransform(progress, [start, end + 0.15], index === 0 ? [1, 1] : [1.08, 1], { clamp: true });
  return (
    <motion.div className="stage-layer" style={{ clipPath, zIndex: index }}>
      <motion.div className="stage-layer-inner" style={{ scale }}>
        <Composition project={project} priority={index === 0} />
      </motion.div>
    </motion.div>
  );
}

export default function WorkStage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const count = featuredProjects.length;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(value * count + 0.25))));
  });

  const current = featuredProjects[active];

  const list = (
    <div className={`work-list site-shell ${reduceMotion ? "is-always" : ""}`}>
      {featuredProjects.map((project) => (
        <article key={project.slug} className="work-list-item">
          <Link href={`/work/${project.slug}`} aria-label={`Open the ${project.title} case study`}><Composition project={project} /></Link>
          <p className="stage-sector">{project.sector}, {project.year}</p>
          <h3>{project.title}</h3>
          <p className="stage-summary">{project.summary}</p>
          <Link className="text-link" href={`/work/${project.slug}`}>Read the case study <FiArrowUpRight className="arrow" /></Link>
        </article>
      ))}
    </div>
  );

  // Pinned scroll storytelling is motion the visitor didn't ask for; offer the plain list instead.
  if (reduceMotion) return list;

  return (
    <>
      <div ref={ref} className="work-stage" style={{ height: `${count * 90 + 30}vh` }}>
        <div className="stage-sticky">
          <div className="site-shell stage-grid">
            <div className="stage-copy">
              <ul className="stage-index" aria-label="Featured projects">
                {featuredProjects.map((project, index) => (
                  <li key={project.slug} className={index === active ? "is-active" : ""}>
                    <Link href={`/work/${project.slug}`} data-cursor="Read">{project.title}</Link>
                  </li>
                ))}
              </ul>
              <motion.div key={current.slug} className="stage-detail" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <p className="stage-sector">{current.sector}, {current.year}</p>
                <p className="stage-summary">{current.summary}</p>
                <Link className="text-link" href={`/work/${current.slug}`}>Read the case study <FiArrowUpRight className="arrow" /></Link>
              </motion.div>
              <div className="stage-progress" aria-hidden="true"><motion.span style={{ scaleY: scrollYProgress }} /></div>
            </div>
            <Link href={`/work/${current.slug}`} className="stage-visual" data-cursor="View" aria-label={`Open the ${current.title} case study`}>
              {featuredProjects.map((project, index) => <Layer key={project.slug} project={project} index={index} progress={scrollYProgress} />)}
            </Link>
          </div>
        </div>
      </div>

      {list}
    </>
  );
}
