"use client";

import { useEffect, useRef, useState } from "react";

// A follower ring for fine pointers. It grows over interactive elements and
// shows a short label from data-cursor. Touch and reduced-motion users keep the native cursor.
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor]");
      setHovering(Boolean(el));
      setLabel(el?.dataset.cursor ?? "");
    };
    const onLeave = () => { target.x = -100; target.y = -100; };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <div ref={ringRef} className="cursor" aria-hidden="true">
      <span className={`cursor-ring ${hovering ? "is-hovering" : ""} ${label ? "has-label" : ""}`}>{label}</span>
    </div>
  );
}
