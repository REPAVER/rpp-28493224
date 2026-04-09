"use client";

import { useEffect, type CSSProperties } from "react";

interface MobileMenuFullscreenProps {
  nav: string[];
  ctaText?: string;
  ctaUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuFullscreen({
  nav,
  ctaText,
  ctaUrl,
  isOpen,
  onClose,
}: MobileMenuFullscreenProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--color-primary, #1a1a2e)",
    color: "#fff",
    fontFamily: "'Noto Sans JP', sans-serif",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "opacity 0.4s ease, visibility 0.4s ease",
  };

  const closeStyle: CSSProperties = {
    position: "absolute",
    top: 20,
    right: 20,
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: 28,
  };

  const navStyle: CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  };

  const linkStyle: CSSProperties = {
    display: "block",
    padding: "12px 24px",
    fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
    fontWeight: 700,
    color: "#fff",
    textDecoration: "none",
    opacity: 0.85,
    transition: "opacity 0.2s",
    letterSpacing: "0.02em",
  };

  const ctaStyle: CSSProperties = {
    display: "inline-block",
    marginTop: 32,
    padding: "14px 40px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 999,
    textDecoration: "none",
    transition: "background 0.2s",
  };

  return (
    <div style={overlayStyle}>
      <button style={closeStyle} onClick={onClose} aria-label="メニューを閉じる">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <ul style={navStyle}>
        {nav.map(item => (
          <li key={item}>
            <a href={`#${item}`} style={linkStyle} onClick={onClose}>{item}</a>
          </li>
        ))}
      </ul>
      {ctaText && (
        <a href={ctaUrl ?? "#contact"} style={ctaStyle} onClick={onClose}>{ctaText}</a>
      )}
    </div>
  );
}
