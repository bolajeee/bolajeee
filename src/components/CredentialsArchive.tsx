"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { credentials } from "@/content/portfolio";

const filters = ["All", "Software", "AI", "Professional development", "Recognition", "Food engineering"];
const featured = [
  { name: "InternPulse Cohort 6", image: "/assets/credentials/internpulse-finalist.jpg", alt: "InternPulse Cohort 6 finalist certificate" },
  { name: "ALX Back-End Web Development", image: "/assets/credentials/alx-back-end-web-development.png", alt: "ALX Back-End Web Development certificate" },
  { name: "ALX Professional Foundations", image: "/assets/credentials/alx-professional-foundations.png", alt: "ALX Professional Foundations certificate" },
  { name: "ALX AI Starter Kit", image: "/assets/credentials/alx-ai-starter-kit.png", alt: "ALX AI Starter Kit certificate" },
  { name: "ALX Virtual Assistant Programme", image: "/assets/credentials/alx-virtual-assistant-honors.png", alt: "ALX Virtual Assistant Programme certificate with honors" },
];

export default function CredentialsArchive() {
  const [filter, setFilter] = useState("All");
  const visibleCredentials = useMemo(() => filter === "All" ? credentials : credentials.filter((item) => item.category === filter), [filter]);

  return (
    <main className="site-shell">
      <section className="archive-intro">
        <p className="eyebrow">Selected recognition · learning</p>
        <h1>Proof of curiosity, practice, and progress.</h1>
        <p className="case-lede">A considered archive of software, AI, professional development, and food engineering credentials.</p>
      </section>

      <section aria-labelledby="credential-highlights">
        <h2 id="credential-highlights" className="eyebrow">Certificate highlights</h2>
        <div className="credential-gallery">
          {featured.map((item) => <figure className="credential-image" key={item.name}>
            <div><Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 90vw, 46vw" style={{ objectFit: "contain" }} /></div>
            <figcaption>{item.name}</figcaption>
          </figure>)}
        </div>
      </section>

      <section className="archive-list-section" aria-labelledby="all-credentials">
        <div className="archive-list-heading"><h2 id="all-credentials" className="eyebrow">Credential archive</h2><span className="muted">{visibleCredentials.length} entries</span></div>
        <div className="credential-filters" role="group" aria-label="Filter credentials by category">
          {filters.map((item) => <button key={item} className={`filter-button ${filter === item ? "selected" : ""}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="credentials-list">
          {visibleCredentials.map((item) => <article className="credential-row" key={item.title}>
            <time>{item.year}</time>
            <div><h3>{item.title}</h3><p>{item.detail}</p></div>
            <span className="credential-category">{item.category}</span>
          </article>)}
        </div>
      </section>
      <p className="archive-note">This collection focuses on selected learning and recognition. Academic records and personal identity documents are kept private.</p>
    </main>
  );
}
