"use client";

import type { CSSProperties } from "react";

interface HeaderBoldCtaProps {
  logo: string;
  nav: string[];
  ctaText?: string;
  ctaUrl?: string;
  tel?: string;
  onMenuOpen: () => void;
  rightOffset?: number;
}

export function HeaderBoldCta({
  logo,
  nav,
  ctaText,
  ctaUrl,
  tel,
  onMenuOpen,
  rightOffset,
}: HeaderBoldCtaProps) {
  const headerStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: rightOffset ?? 0,
    zIndex: 1000,
    backgroundColor: "#fff",
    boxShadow: "var(--shadow-md, 0 4px 6px rgba(0,0,0,0.07))",
    padding: "0 clamp(16px, 4vw, 40px)",
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "'Noto Sans JP', sans-serif",
  };

  const logoStyle: CSSProperties = {
    fontSize: 22,
    fontWeight: 800,
    color: "var(--color-primary, #1a1a1a)",
    textDecoration: "none",
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
    fontWeight: 600,
    color: "var(--color-text, #1a1a1a)",
    textDecoration: "none",
    padding: "4px 8px",
    borderRadius: "var(--radius-sm, 4px)",
    transition: "var(--transition, all 0.2s ease)",
    whiteSpace: "nowrap",
  };

  const rightGroupStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 16,
  };

  const telStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 15,
    fontWeight: 700,
    color: "var(--color-primary, #1a1a1a)",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const ctaButtonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    backgroundColor: "var(--color-accent, #e53e3e)",
    borderRadius: 999,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "var(--transition, all 0.2s ease)",
    whiteSpace: "nowrap",
    animation: "mock-pulse-cta 2s infinite",
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
    color: "var(--color-text, #1a1a1a)",
  };

  return (
    <>
      <style>{`
        @keyframes mock-pulse-cta {
          0%, 100% { box-shadow: 0 0 0 0 var(--color-accent, rgba(229, 62, 62, 0.5)); }
          50% { box-shadow: 0 0 0 8px rgba(229, 62, 62, 0); }
        }
        @media (max-width: 767px) {
          .mock-bold-nav-desktop { display: none !important; }
          .mock-bold-right-desktop { display: none !important; }
          .mock-bold-hamburger { display: flex !important; }
        }
      `}</style>
      <header style={headerStyle}>
        <a href="#" style={logoStyle}>
          {logo}
        </a>

        <nav className="mock-bold-nav-desktop" style={{ display: "flex" }}>
          <ul style={navStyle}>
            {nav.map((item) => (
              <li key={item}>
                <a href={`#${item}`} style={navLinkStyle}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mock-bold-right-desktop" style={rightGroupStyle}>
          {tel && (
            <a href={`tel:${tel.replace(/-/g, "")}`} style={telStyle}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {tel}
            </a>
          )}

          {ctaText && (
            <a href={ctaUrl ?? "#contact"} style={ctaButtonStyle}>
              {ctaText}
            </a>
          )}
        </div>

        <button
          className="mock-bold-hamburger"
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
