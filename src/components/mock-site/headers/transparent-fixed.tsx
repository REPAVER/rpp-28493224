"use client";

import { useState, useEffect, type CSSProperties } from "react";

interface HeaderTransparentFixedProps {
  logo: string;
  nav: string[];
  ctaText?: string;
  ctaUrl?: string;
  onMenuOpen: () => void;
  rightOffset?: number;
}

export function HeaderTransparentFixed({
  logo,
  nav,
  ctaText,
  ctaUrl,
  onMenuOpen,
  rightOffset,
}: HeaderTransparentFixedProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: rightOffset ?? 0,
    zIndex: 1000,
    padding: "0 clamp(16px, 4vw, 40px)",
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "'Noto Sans JP', sans-serif",
    backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
    boxShadow: scrolled ? "var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))" : "none",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
  };

  const logoStyle: CSSProperties = {
    fontSize: 20,
    fontWeight: 700,
    color: scrolled ? "var(--color-primary, #1a1a1a)" : "#fff",
    textDecoration: "none",
    transition: "color 0.3s ease",
    whiteSpace: "nowrap",
  };

  const navStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 24,
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const navLinkStyle: CSSProperties = {
    fontSize: 14,
    fontWeight: 500,
    color: scrolled ? "var(--color-text, #1a1a1a)" : "#fff",
    textDecoration: "none",
    padding: "4px 8px",
    borderRadius: "var(--radius-sm, 4px)",
    transition: "var(--transition, all 0.2s ease)",
    whiteSpace: "nowrap",
  };

  const ctaButtonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 700,
    color: scrolled ? "#fff" : "var(--color-primary, #1a1a1a)",
    backgroundColor: scrolled ? "var(--color-primary, #1a1a1a)" : "#fff",
    borderRadius: "var(--radius-md, 8px)",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "var(--transition, all 0.2s ease)",
    whiteSpace: "nowrap",
  };

  const hamburgerStyle: CSSProperties = {
    display: "none",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: scrolled ? "var(--color-text, #1a1a1a)" : "#fff",
    transition: "color 0.3s ease",
  };

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .mock-header-nav-desktop { display: none !important; }
          .mock-header-cta-desktop { display: none !important; }
          .mock-header-hamburger { display: flex !important; }
        }
      `}</style>
      <header style={headerStyle}>
        <a href="#" style={logoStyle}>
          {logo}
        </a>

        <nav
          className="mock-header-nav-desktop"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <ul style={navStyle}>
            {nav.map((item) => (
              <li key={item}>
                <a href={`#${item}`} style={navLinkStyle}>
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {ctaText && (
            <a
              href={ctaUrl ?? "#contact"}
              style={ctaButtonStyle}
              className="mock-header-cta-desktop"
            >
              {ctaText}
            </a>
          )}
        </nav>

        <button
          className="mock-header-hamburger"
          style={hamburgerStyle}
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>
    </>
  );
}
