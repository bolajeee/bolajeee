"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Recognition", href: "/#recognition" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-shell header-row">
          <Link href="/" className="wordmark" aria-label="Bolajeee, home">bolajeee<span>.</span></Link>
          <nav className="nav-links" aria-label="Main navigation">
            {links.map((link) => <Link key={link.href} className="nav-link" href={link.href}>{link.label}</Link>)}
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              aria-label={mounted && resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {mounted && resolvedTheme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>
            <Link href="/#contact" className="header-cta">Let’s talk <FiArrowUpRight size={14} /></Link>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
            </button>
          </div>
        </div>
      </header>
      <nav id="mobile-navigation" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {links.map((link) => <Link key={link.href} href={link.href} tabIndex={menuOpen ? 0 : -1}>{link.label}</Link>)}
        <Link href="/#contact" tabIndex={menuOpen ? 0 : -1}>Contact <FiArrowUpRight size={22} /></Link>
      </nav>
    </>
  );
}
