import Link from "next/link";
import { FiArrowDownRight, FiArrowUpRight, FiExternalLink } from "react-icons/fi";

const findings = [
  { label: "Moisture content", value: "3.78–6.03", unit: "%" },
  { label: "Protein content", value: "13.54–22.98", unit: "%" },
  { label: "Expansion ratio", value: "1.80–2.29", unit: "ratio" },
  { label: "DPPH activity", value: "55.33–64.89", unit: "%" },
];

const training = [
  "Design of Experiments",
  "Food Product Development",
  "Consumer Understanding",
  "Project Management",
];

const researchDirections = [
  { number: "01", title: "Process monitoring", text: "Explore how data from production processes can help make changing conditions easier to observe." },
  { number: "02", title: "Predictive quality", text: "Investigate computational methods that could help anticipate quality outcomes from process inputs." },
  { number: "03", title: "Operational decisions", text: "Build decision-support tools that connect engineering evidence to day-to-day industrial choices." },
  { number: "04", title: "Process efficiency", text: "Study opportunities to improve production efficiency and resource use through data and optimization." },
];

export default function EngineeringPage() {
  return (
    <main className="engineering-page">
      <section className="engineering-hero">
        <div className="site-shell">
          <p className="eyebrow">Engineering / Research / Innovation</p>
          <h1>Engineering better food systems through science, data & technology.</h1>
          <p className="engineering-lede">My work and interests span food process engineering, quality assurance, experimental research, and computational approaches to industrial decision-making.</p>
          <div className="engineering-tags"><span>Food processing</span><span>Process optimization</span><span>Computational methods</span></div>
          <div className="engineering-credential"><span>B.Eng. Food Engineering</span><span>University of Ilorin</span><span>2024 · Second Class Upper</span></div>
          <a className="engineering-scroll" href="#research">Explore the research <FiArrowDownRight /></a>
        </div>
      </section>

      <section id="research" className="engineering-section research-section">
        <div className="site-shell">
          <div className="engineering-section-intro">
            <p className="eyebrow">Featured research · 2023–2024</p>
            <span className="research-status">Conference paper · 2025</span>
          </div>
          <div className="research-heading-grid">
            <h2>Development of 3G Rice-Soy Snacks</h2>
            <p>Investigating how extrusion and frying conditions shape the physical, chemical, and thermal properties of third-generation rice-soy snacks.</p>
          </div>

          <div className="research-model" aria-label="Study process from variables through methods to measured properties">
            <div className="research-model-step"><span>01 / Process inputs</span><strong>Feed moisture<br />Die-head temperature<br />Frying time</strong></div>
            <div className="research-model-arrow" aria-hidden="true">→</div>
            <div className="research-model-step"><span>02 / Experimental design</span><strong>Taguchi design<br />Response Surface<br />Methodology</strong></div>
            <div className="research-model-arrow" aria-hidden="true">→</div>
            <div className="research-model-step"><span>03 / Evaluation</span><strong>Physical<br />Chemical<br />Thermal properties</strong></div>
          </div>

          <div className="findings-heading"><div><p className="eyebrow">Selected findings</p><p>Observed ranges reported in the ASABE abstract.</p></div><a href="https://elibrary.asabe.org/abstract.asp?aid=55351" target="_blank" rel="noreferrer" className="text-link">Read the abstract <FiExternalLink /></a></div>
          <div className="finding-grid">
            {findings.map((finding) => <article className="finding-card" key={finding.label}>
              <span>{finding.label}</span><strong>{finding.value}</strong><small>{finding.unit}</small>
              <div className="finding-range" aria-hidden="true"><i /></div>
            </article>)}
          </div>

          <div className="research-reading">
            <h3>What the process variables showed</h3>
            <p>The study reports that feed moisture, die-head temperature, and frying time influenced the measured properties. Higher feed moisture increased moisture retention, while higher die temperature and frying time reduced it. Lower feed moisture and higher die temperature improved water absorption capacity and expansion; higher feed moisture and frying time increased bulk density.</p>
          </div>
          <div className="publication-citation">
            <span className="eyebrow">Publication</span>
            <p>Sanusi, M. S., Bello, A. B., Salako, M. A., <strong>Ibrahim, O. I.</strong>, Olaniran, T. B., &amp; Sunmonu, M. O. (2025). “Development of 3G Rice-Soy Snacks: Effects of Extrusion and Frying Conditions on Physical, Chemical, and Thermal Properties.” <em>2025 ASABE Annual International Meeting</em>, 2500092.</p>
            <a href="https://doi.org/10.13031/aim.202500092" target="_blank" rel="noreferrer">doi:10.13031/aim.202500092 <FiArrowUpRight /></a>
          </div>
        </div>
      </section>

      <section className="engineering-section foundation-section">
        <div className="site-shell foundation-grid">
          <div><p className="eyebrow">Academic foundation</p><h2>Learning to understand a process from the inside out.</h2></div>
          <div className="foundation-copy">
            <p className="foundation-degree">Bachelor of Engineering<br /><strong>Food Engineering</strong></p>
            <p>University of Ilorin · 2018–2024 · Second Class Upper Honours</p>
            <div className="coursework-list"><span>Food process engineering</span><span>Quality control & assurance</span><span>Food safety & HACCP</span><span>Heat & mass transfer</span><span>Statistics & data analysis</span><span>Thermodynamics</span></div>
          </div>
        </div>
      </section>

      <section className="engineering-section practice-section">
        <div className="site-shell">
          <p className="eyebrow">Applied experience</p>
          <h2 className="engineering-subtitle">From the lab to production.</h2>
          <div className="practice-grid">
            <article className="practice-card"><span>University of Ilorin · Food Engineering Plant</span><h3>Food processing practice</h3><p>Hands-on processing experience during my engineering studies, connecting process principles with production work in the university food engineering plant.</p></article>
            <article className="practice-card"><span>OK Foods · Industrial attachment</span><h3>Quality assurance</h3><p>Practical quality assurance experience spanning inspection, good manufacturing practices, food safety, and quality control in an industrial setting.</p></article>
          </div>
        </div>
      </section>

      <section className="engineering-section training-section">
        <div className="site-shell training-grid">
          <div><p className="eyebrow">Technical development</p><h2>Learning that supports better experiments and products.</h2></div>
          <div className="training-list">{training.map((course, index) => <div key={course}><span>0{index + 1}</span><strong>{course}</strong><span>Nestlé FoodTech</span></div>)}</div>
        </div>
      </section>

      <section className="engineering-section future-section">
        <div className="site-shell">
          <p className="eyebrow">Where I want to take this</p>
          <div className="future-heading"><h2>Computational thinking for real-world processes.</h2><p>These are future research interests: directions where my software engineering practice can contribute to food and industrial systems.</p></div>
          <div className="direction-grid">{researchDirections.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="engineering-contact">
        <div className="site-shell engineering-contact-row"><div><p className="eyebrow">Research & engineering enquiries</p><h2>Interested in food systems, data, or process engineering?</h2></div><a className="button-dark" href="mailto:ibrahimomobolaji1999@gmail.com">Get in touch <FiArrowUpRight /></a></div>
      </section>
      <div className="site-shell engineering-back"><Link className="text-link" href="/#about">Back to the main portfolio <FiArrowUpRight /></Link></div>
    </main>
  );
}
