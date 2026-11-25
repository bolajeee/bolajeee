"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const roles = ["Property owner", "Administrators", "Surveyor A", "Surveyor B"] as const;
type Role = (typeof roles)[number];

const steps: { status: string; text: string; actors: Role[] }[] = [
  { status: "Submitted", text: "The owner submits the property and building details and uploads documents.", actors: ["Property owner"] },
  { status: "Surveyors assigned", text: "Administrators review the request and assign two independent surveyors.", actors: ["Administrators"] },
  { status: "On site", text: "Both surveyors inspect the site and upload their reports separately.", actors: ["Surveyor A", "Surveyor B"] },
  { status: "Under review", text: "Administrators compare both reports before deciding on cover.", actors: ["Administrators"] },
  { status: "Policy issued", text: "The owner is notified and downloads the policy from their dashboard.", actors: ["Property owner"] },
];

export default function WorkflowDemo() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(!reduceMotion);
  const current = steps[step];

  useEffect(() => {
    if (!auto) return;
    const timer = setTimeout(() => setStep((s) => (s + 1) % steps.length), 2600);
    return () => clearTimeout(timer);
  }, [auto, step]);

  const go = (next: number) => { setAuto(false); setStep(Math.max(0, Math.min(steps.length - 1, next))); };

  return (
    <div className="demo demo-workflow">
      <div className="demo-stage">
        <div className="lanes">
          {roles.map((role) => {
            const active = current.actors.includes(role);
            return (
              <div key={role} className={`lane ${active ? "is-active" : ""}`}>
                <span className="lane-name">{role}</span>
                <div className="lane-track">
                  {active && (
                    <motion.div layoutId={reduceMotion ? undefined : `ticket-${current.actors.indexOf(role)}`} className="ticket" transition={{ type: "spring", stiffness: 210, damping: 24 }}>
                      <strong>Request BL-1042</strong>
                      <span>{current.status}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="demo-controls">
          <span>Step {step + 1} of {steps.length}</span>
          <div>
            <button type="button" className="demo-button" onClick={() => go(step - 1)} disabled={step === 0}>Back</button>
            <button type="button" className="demo-button" onClick={() => go(step + 1)} disabled={step === steps.length - 1}>Next step</button>
          </div>
        </div>
      </div>
      <div className="demo-panel">
        <h4>{current.status}</h4>
        <p className="demo-hint" aria-live="polite">{current.text}</p>
        <ol className="step-list">
          {steps.map((s, index) => (
            <li key={s.status} className={index === step ? "is-current" : index < step ? "is-done" : ""}>
              <button type="button" onClick={() => go(index)}>{s.status}</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
