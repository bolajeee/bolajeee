"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Task = { name: string; minutes: number; days: number[]; priority: number };

function buildPlan(budget: number, away: boolean): { tasks: Task[]; skipped: string[] } {
  const pool: Task[] = [
    away
      ? { name: "Set up wick watering", minutes: 25, days: [0], priority: 1 }
      : { name: "Water the pots", minutes: 8, days: [0, 2, 4, 6], priority: 1 },
    { name: "Check soil and leaves", minutes: 6, days: away ? [0] : [1, 5], priority: 2 },
    { name: "Feed with compost tea", minutes: 15, days: [5], priority: 3 },
    { name: "Thin the seedlings", minutes: 20, days: [6], priority: 4 },
    { name: "Look for pests", minutes: 10, days: [3], priority: 5 },
    { name: "Harvest outer leaves", minutes: 15, days: [6], priority: 6 },
  ];
  const tasks: Task[] = [];
  const skipped: string[] = [];
  let used = 0;
  for (const task of pool.sort((a, b) => a.priority - b.priority)) {
    const cost = task.minutes * task.days.length;
    if (used + cost <= budget) { tasks.push(task); used += cost; } else skipped.push(task.name);
  }
  return { tasks, skipped };
}

export default function PlanDemo() {
  const reduceMotion = useReducedMotion();
  const [minutes, setMinutes] = useState(60);
  const [away, setAway] = useState(false);
  const { tasks, skipped } = buildPlan(minutes, away);
  const used = tasks.reduce((sum, t) => sum + t.minutes * t.days.length, 0);
  const label = minutes < 60 ? `${minutes} minutes` : `${minutes / 60} ${minutes === 60 ? "hour" : "hours"}`;

  return (
    <div className="demo demo-plan">
      <div className="demo-panel">
        <h4>Your week</h4>
        <label className="demo-field">
          <span>Time you can give: <strong>{label}</strong></span>
          <input type="range" min={30} max={180} step={30} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
        </label>
        <label className="demo-check">
          <input type="checkbox" checked={away} onChange={(e) => setAway(e.target.checked)} /> I’m away this week
        </label>
        <p className="demo-hint" aria-live="polite">
          This plan uses {used} of your {minutes} minutes.
          {skipped.length > 0 && <> Left out to fit your time: {skipped.join(", ").toLowerCase()}.</>}
        </p>
      </div>
      <div className="demo-stage">
        <div className="week-grid">
          {days.map((day, index) => (
            <div key={day} className="week-day">
              <span className="week-label">{day}</span>
              <AnimatePresence initial={false} mode="popLayout">
                {tasks.filter((t) => t.days.includes(index)).map((t) => (
                  <motion.div key={t.name} layout={!reduceMotion} className={`week-task p${t.priority}`} initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                    <strong>{t.name}</strong>
                    <span>{t.minutes} min</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
