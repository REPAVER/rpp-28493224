"use client";

import type { CSSProperties } from "react";

interface HeaderSolidMinimalProps {
  logo: string;
  nav: string[];
  onMenuOpen: () => void;
  rightOffset?: number;
}

export function HeaderSolidMinimal({
  logo,
  nav,
  onMenuOpen,
}: HeaderSolidMinimalProps) {
  const headerStyle: CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "#fff",
    borderBottom: "1px solid var(--color-border, #e5e5e5)",
    padding: "0 clamp(16px, 4vw, 40px)",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "'Noto Sans JP', sans-serif",
  };

  const logoStyle: CSSProperties = {
    fontSize: 18,
    fontWeight: 700,
    color: "var(--color-text, #1a1a1a)",
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
    fontWeight: 500,
    color: "var(--color-text, #1a1a1a)",
    textDecoration: "none",
    padding: "4px 8px",
    borderRadius: "var(--radius-sm, 4px)",
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
    color: "var(--color-text, #1a1a1a)",
  };

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .mock-solid-nav-desktop { display: none !important; }
          .mock-solid-hamburger { display: flex !important; }
        }
      `}</style>
      <header style={headerStyle}>
        <a href="#" style={logoStyle}>
          {logo}
        </a>

        <nav className="mock-solid-nav-desktop" style={{ display: "flex" }}>
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

        <button
          className="mock-solid-hamburger"
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
