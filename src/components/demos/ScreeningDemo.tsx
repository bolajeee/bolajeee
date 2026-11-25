"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const skills = ["React", "TypeScript", "Node.js", "SQL", "Figma"];
const locations = ["Any", "Lagos", "Abuja", "Remote"];

type Candidate = { name: string; headline: string; skills: string[]; years: number; location: string; certified: boolean };

const candidates: Candidate[] = [
  { name: "Candidate A", headline: "Frontend developer", skills: ["React", "TypeScript", "Figma"], years: 4, location: "Lagos", certified: false },
  { name: "Candidate B", headline: "Full-stack developer", skills: ["React", "Node.js", "SQL", "TypeScript"], years: 6, location: "Abuja", certified: true },
  { name: "Candidate C", headline: "Backend engineer", skills: ["Node.js", "SQL"], years: 3, location: "Remote", certified: true },
  { name: "Candidate D", headline: "Product designer", skills: ["Figma"], years: 5, location: "Lagos", certified: false },
  { name: "Candidate E", headline: "Junior developer", skills: ["React", "SQL"], years: 1, location: "Abuja", certified: false },
  { name: "Candidate F", headline: "Software engineer", skills: ["TypeScript", "Node.js", "React"], years: 2, location: "Remote", certified: true },
];

export default function ScreeningDemo() {
  const reduceMotion = useReducedMotion();
  const [required, setRequired] = useState<string[]>(["React", "TypeScript"]);
  const [minYears, setMinYears] = useState(3);
  const [location, setLocation] = useState("Any");
  const [needsCert, setNeedsCert] = useState(false);

  const toggle = (skill: string) => setRequired((r) => (r.includes(skill) ? r.filter((s) => s !== skill) : [...r, skill]));

  const scored = candidates
    .map((c) => {
      const checks = [
        ...required.map((skill) => ({ label: skill, ok: c.skills.includes(skill) })),
        { label: `${minYears}+ yrs`, ok: c.years >= minYears },
        ...(location === "Any" ? [] : [{ label: location, ok: c.location === location }]),
        ...(needsCert ? [{ label: "Certified", ok: c.certified }] : []),
      ];
      const score = Math.round((checks.filter((k) => k.ok).length / checks.length) * 100);
      return { ...c, checks, score };
    })
    .sort((a, b) => b.score - a.score || b.years - a.years);

  return (
    <div className="demo demo-screening">
      <div className="demo-panel">
        <h4>Role requirements</h4>
        <fieldset className="demo-field">
          <legend>Skills</legend>
          <div className="chip-row">
            {skills.map((skill) => (
              <button type="button" key={skill} className={`chip ${required.includes(skill) ? "is-on" : ""}`} aria-pressed={required.includes(skill)} onClick={() => toggle(skill)}>{skill}</button>
            ))}
          </div>
        </fieldset>
        <label className="demo-field">
          <span>Minimum experience: <strong>{minYears} {minYears === 1 ? "year" : "years"}</strong></span>
          <input type="range" min={0} max={8} value={minYears} onChange={(e) => setMinYears(Number(e.target.value))} />
        </label>
        <fieldset className="demo-field">
          <legend>Location</legend>
          <div className="chip-row">
            {locations.map((l) => (
              <button type="button" key={l} className={`chip ${location === l ? "is-on" : ""}`} aria-pressed={location === l} onClick={() => setLocation(l)}>{l}</button>
            ))}
          </div>
        </fieldset>
        <label className="demo-check">
          <input type="checkbox" checked={needsCert} onChange={(e) => setNeedsCert(e.target.checked)} /> Require a certification
        </label>
      </div>
      <div className="demo-stage">
        <ol className="candidate-list" aria-live="polite">
          {scored.map((c, index) => (
            <motion.li key={c.name} layout={!reduceMotion} transition={{ type: "spring", stiffness: 300, damping: 30 }} className={c.score === 100 ? "is-match" : ""}>
              <span className="candidate-rank">{index + 1}</span>
              <div className="candidate-body">
                <strong>{c.name}</strong>
                <span>{c.headline}, {c.years} {c.years === 1 ? "yr" : "yrs"}, {c.location}</span>
                <div className="check-row">
                  {c.checks.map((k) => <span key={k.label} className={k.ok ? "ok" : "miss"}>{k.ok ? "✓" : "✕"} {k.label}</span>)}
                </div>
              </div>
              <div className="candidate-score">
                <strong>{c.score}</strong>
                <div className="score-bar"><motion.i initial={false} animate={{ width: `${c.score}%` }} transition={{ duration: reduceMotion ? 0 : 0.4 }} /></div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
