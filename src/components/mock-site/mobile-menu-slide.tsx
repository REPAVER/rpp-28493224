"use client";

import { useEffect, type CSSProperties } from "react";

interface MobileMenuProps {
  nav: string[];
  ctaText?: string;
  ctaUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuSlide({
  nav,
  ctaText,
  ctaUrl,
  isOpen,
  onClose,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const backdropStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9998,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
  };

  const panelStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "min(320px, 85vw)",
    zIndex: 9999,
    backgroundColor: "#fff",
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Noto Sans JP', sans-serif",
  };

  const closeButtonStyle: CSSProperties = {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "var(--radius-sm, 4px)",
    color: "var(--color-text, #1a1a1a)",
    fontSize: 24,
  };

  const navListStyle: CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: "80px 24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    flex: 1,
  };

  const navLinkStyle: CSSProperties = {
    display: "block",
    padding: "16px 0",
    fontSize: 16,
    fontWeight: 500,
    color: "var(--color-text, #1a1a1a)",
    textDecoration: "none",
    borderBottom: "1px solid var(--color-border, #e5e5e5)",
    transition: "var(--transition, all 0.2s ease)",
  };

  const ctaStyle: CSSProperties = {
    display: "block",
    margin: "auto 24px 24px",
    padding: "14px 32px",
    backgroundColor: "var(--color-primary, #1a1a1a)",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "var(--radius-md, 8px)",
    border: "none",
    cursor: "pointer",
    transition: "var(--transition, all 0.2s ease)",
  };

  return (
    <>
      <div style={backdropStyle} onClick={onClose} aria-hidden="true" />
      <nav style={panelStyle} aria-label="Mobile navigation">
        <button
          style={closeButtonStyle}
          onClick={onClose}
          aria-label="Close menu"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <ul style={navListStyle}>
          {nav.map((item) => (
            <li key={item}>
              <a href={`#${item}`} style={navLinkStyle} onClick={onClose}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        {ctaText && (
          <a href={ctaUrl ?? "#contact"} style={ctaStyle} onClick={onClose}>
            {ctaText}
          </a>
        )}
      </nav>
    </>
  );
}
