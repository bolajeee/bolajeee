"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { otherProjects } from "@/content/portfolio";

export default function MoreWork() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 28 });
  const y = useSpring(rawY, { stiffness: 260, damping: 28 });
  const preview = otherProjects.find((p) => p.title === hovered)?.image;

  return (
    <div
      className="more-index"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        rawX.set(event.clientX - rect.left);
        rawY.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul>
        {otherProjects.map((project) => {
          const row = (
            <>
              <strong>{project.title}</strong>
              <span className="more-desc">{project.description}</span>
              <span className="more-stack">{project.stack}</span>
              <span className="more-go">{project.href ? <FiArrowUpRight /> : project.note}</span>
            </>
          );
          return (
            <li key={project.title} onPointerEnter={() => setHovered(project.title)}>
              {project.href
                ? <a className="more-row" href={project.href} target="_blank" rel="noreferrer" data-cursor={project.image ? "Open" : undefined}>{row}</a>
                : <div className="more-row is-private">{row}</div>}
            </li>
          );
        })}
      </ul>
      {!reduceMotion && (
        <motion.div className="more-preview" style={{ x, y }} aria-hidden="true">
          <AnimatePresence>
            {preview && (
              <motion.div key={preview} className="more-preview-card" initial={{ opacity: 0, scale: 0.85, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }}>
                <Image src={preview} alt="" fill sizes="320px" style={{ objectFit: "cover", objectPosition: "top" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
