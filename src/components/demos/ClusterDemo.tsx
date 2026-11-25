"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Kind = "Pothole" | "Flooding" | "Waste" | "Streetlight";
type Report = { id: number; x: number; y: number; kind: Kind; cluster: number };
type Cluster = { id: number; x: number; y: number; kind: Kind; count: number };

const W = 600, H = 380, RADIUS = 46, LIMIT = 40;
const severity: Record<Kind, number> = { Flooding: 3, Pothole: 2, Waste: 1.5, Streetlight: 1 };
const sites: { x: number; y: number; kind: Kind }[] = [
  { x: 150, y: 120, kind: "Pothole" },
  { x: 430, y: 95, kind: "Waste" },
  { x: 360, y: 270, kind: "Flooding" },
  { x: 120, y: 290, kind: "Streetlight" },
  { x: 520, y: 300, kind: "Pothole" },
];

function gaussian() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }

export default function ClusterDemo() {
  const reduceMotion = useReducedMotion();
  const [reports, setReports] = useState<Report[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [running, setRunning] = useState(true);
  const ids = useRef(0);
  const clustersRef = useRef<Cluster[]>([]);

  const add = useCallback((x: number, y: number, kind: Kind) => {
    const id = ++ids.current;
    const current = clustersRef.current;
    const match = current.find((c) => c.kind === kind && Math.hypot(c.x - x, c.y - y) < RADIUS);
    const next = match
      ? current.map((c) => (c.id === match.id ? { ...c, count: c.count + 1, x: (c.x * c.count + x) / (c.count + 1), y: (c.y * c.count + y) / (c.count + 1) } : c))
      : [...current, { id, x, y, kind, count: 1 }];
    clustersRef.current = next;
    setClusters(next);
    setReports((rs) => [...rs, { id, x, y, kind, cluster: match ? match.id : id }]);
  }, []);

  const addRandom = useCallback(() => {
    const site = sites[Math.floor(Math.random() * sites.length)];
    const stray = Math.random() < 0.12;
    const x = stray ? 40 + Math.random() * (W - 80) : site.x + gaussian() * 34;
    const y = stray ? 40 + Math.random() * (H - 80) : site.y + gaussian() * 30;
    add(Math.max(14, Math.min(W - 14, x)), Math.max(14, Math.min(H - 14, y)), site.kind);
  }, [add]);

  const full = reports.length >= LIMIT;
  useEffect(() => {
    if (!running || full || reduceMotion) return;
    const timer = setInterval(addRandom, 650);
    return () => clearInterval(timer);
  }, [running, full, reduceMotion, addRandom]);

  const reset = () => { setReports([]); setClusters([]); clustersRef.current = []; ids.current = 0; setRunning(true); };

  const onMapClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (full) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * W;
    const y = ((event.clientY - rect.top) / rect.height) * H;
    const nearest = [...sites].sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y))[0];
    add(x, y, nearest.kind);
  };

  const ranked = [...clusters].sort((a, b) => b.count * severity[b.kind] - a.count * severity[a.kind]).slice(0, 5);

  return (
    <div className="demo demo-cluster">
      <div className="demo-stage">
        <svg viewBox={`0 0 ${W} ${H}`} className="cluster-map" onClick={onMapClick} role="img" aria-label={`Map with ${reports.length} reports grouped into ${clusters.length} issues. Click to add a report.`} data-cursor="Report">
          <g className="map-streets" aria-hidden="true">
            <path d="M0 160 C 140 140, 260 200, 600 150" /><path d="M0 330 C 200 300, 380 340, 600 260" />
            <path d="M210 0 C 230 120, 180 260, 240 380" /><path d="M470 0 C 450 140, 500 250, 440 380" />
            <path d="M60 0 L 120 380" strokeDasharray="3 6" /><path d="M0 60 L 600 90" strokeDasharray="3 6" />
          </g>
          {clusters.map((c) => (
            <motion.circle key={`c${c.id}`} className={`cluster-ring kind-${c.kind}`} initial={false} animate={{ cx: c.x, cy: c.y, r: 10 + Math.sqrt(c.count) * 8, opacity: c.count > 1 ? 1 : 0 }} transition={{ type: "spring", stiffness: 160, damping: 18 }} />
          ))}
          <AnimatePresence>
            {reports.map((r) => (
              <motion.circle key={r.id} className={`report-dot kind-${r.kind}`} cx={r.x} cy={r.y} r={3.6} initial={reduceMotion ? false : { opacity: 0, r: 12 }} animate={{ opacity: 1, r: 3.6 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} />
            ))}
          </AnimatePresence>
        </svg>
        <div className="demo-controls">
          <span>{reports.length} reports, {clusters.length} issues</span>
          <div>
            {!reduceMotion && !full && <button type="button" className="demo-button" onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Resume"}</button>}
            {reduceMotion && !full && <button type="button" className="demo-button" onClick={addRandom}>Add a report</button>}
            <button type="button" className="demo-button" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
      <div className="demo-panel">
        <h4>Priority queue</h4>
        <p className="demo-hint">Reports of the same kind within a short distance join one issue. More reports and higher severity rank it higher. Click the map to add your own.</p>
        <ol className="rank-list">
          <AnimatePresence initial={false}>
            {ranked.map((c) => (
              <motion.li key={c.id} layout={!reduceMotion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <i className={`kind-dot kind-${c.kind}`} />
                <strong>{c.kind}</strong>
                <span>{c.count} {c.count === 1 ? "report" : "reports"}</span>
              </motion.li>
            ))}
          </AnimatePresence>
          {ranked.length === 0 && <li className="rank-empty">Waiting for the first report.</li>}
        </ol>
      </div>
    </div>
  );
}
