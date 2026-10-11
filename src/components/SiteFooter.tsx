import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-row">
        <span>© {new Date().getFullYear()} Bolajeee · Built with intention.</span>
        <nav className="footer-links" aria-label="Social links">
          <Link href="/engineering">Engineering</Link>
          <Link href="/credentials">Credentials</Link>
          <a href="https://www.linkedin.com/in/bolajeee/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/bolajeee" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://x.com/_bolajeee" target="_blank" rel="noreferrer">X ↗</a>
        </nav>
      </div>
    </footer>
  );
}
