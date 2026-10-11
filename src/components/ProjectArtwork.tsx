import type { CSSProperties } from "react";

type ArtworkKind = "screening" | "insurance" | "revenue";

export default function ProjectArtwork({ kind }: { kind: ArtworkKind }) {
  if (kind === "screening") return (
    <div className="project-art" aria-label="Conceptual illustration of a candidate screening workflow">
      <div className="art-content">
        <span className="art-label">People · signals · decisions</span>
        <div className="art-title">A clearer<br />candidate picture.</div>
        <div className="art-route"><span>CV</span><span>→</span><span>Review</span><span>→</span><span>Shortlist</span></div>
      </div>
      <span className="visual-note">Conceptual visual · not a product screenshot</span>
    </div>
  );
  if (kind === "insurance") return (
    <div className="project-art" aria-label="Conceptual illustration of connected construction insurance workflows">
      <div className="art-content">
        <span className="art-label">Built environment · risk · cover</span>
        <div className="art-title">Cover the<br />work in motion.</div>
        <div className="art-blocks"><span>PROPERTY</span><span>POLICY</span><span>CLAIMS</span></div>
      </div>
      <span className="visual-note">Conceptual visual · not a product screenshot</span>
    </div>
  );
  return (
    <div className="project-art" aria-label="Conceptual illustration of revenue reconciliation and commission flows">
      <div className="art-content">
        <span className="art-label">Reconcile · understand · act</span>
        <div className="art-title">From ledger<br />to clarity.</div>
        <div className="art-lines" aria-hidden="true">
          {["34%", "63%", "48%", "82%", "57%", "100%", "73%"].map((height, index) => <i key={index} style={{ "--bar": height } as CSSProperties} />)}
        </div>
      </div>
      <span className="visual-note">Conceptual visual · not a product screenshot</span>
    </div>
  );
}
