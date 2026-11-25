"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { stackLayers, trajectory } from "@/content/portfolio";

// The layer each period started is "new"; later periods keep it filled. Infrastructure is
// still being deepened, so its cell in the last column is marked as in progress.
function cellState(layer: (typeof stackLayers)[number], column: number) {
  const startedAt = trajectory.findIndex((t) => t.added.includes(layer));
  if (startedAt === -1 || column < startedAt) return "empty";
  if (layer === "Infrastructure" && column === trajectory.length - 1) return "growing";
  return column === startedAt ? "new" : "filled";
}

export default function StackGrowth() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="growth">
      <div className="growth-scroll">
        <motion.div
          className="growth-grid"
          style={{ "--cols": trajectory.length } as React.CSSProperties}
          initial={reduceMotion ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.45 }}
          onPointerLeave={() => setActive(null)}
          role="table"
          aria-label="Which layers of the stack I worked in, by year"
        >
          <div role="row" className="growth-row growth-head">
            <span role="columnheader" />
            {trajectory.map((t, column) => (
              <span role="columnheader" key={t.period} className={active === column ? "is-active" : ""} onPointerEnter={() => setActive(column)}>{t.period}</span>
            ))}
          </div>
          {stackLayers.map((layer, row) => (
            <div role="row" className="growth-row" key={layer}>
              <span role="rowheader" className="growth-layer">{layer}</span>
              {trajectory.map((t, column) => {
                const state = cellState(layer, column);
                return (
                  <span role="cell" key={t.period} className={`growth-cell ${active === column ? "is-active" : ""}`} onPointerEnter={() => setActive(column)}>
                    {state !== "empty" && (
                      <motion.i
                        className={`growth-fill is-${state}`}
                        variants={{ hidden: { scaleX: 0, opacity: 0 }, shown: { scaleX: 1, opacity: 1 } }}
                        transition={{ duration: 0.45, delay: column * 0.16 + row * 0.03, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="sr-only">{state === "empty" ? "Not yet" : state === "growing" ? "Deepening now" : "Working in it"}</span>
                  </span>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
      <p className="growth-key" aria-hidden="true">
        <span><i className="growth-fill is-new" /> Started</span>
        <span><i className="growth-fill is-filled" /> Kept using</span>
        <span><i className="growth-fill is-growing" /> Deepening now</span>
      </p>
      <ul className="experience-table growth-list">
        {trajectory.map((t, column) => (
          <li key={t.period} className={active === column ? "is-active" : ""} onPointerEnter={() => setActive(column)} onPointerLeave={() => setActive(null)}>
            <span>{t.period}</span>
            <strong>{t.title}</strong>
            <span className="growth-detail">{t.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
