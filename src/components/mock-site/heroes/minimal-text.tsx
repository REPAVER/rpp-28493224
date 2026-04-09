"use client";

import { useState, useEffect, type CSSProperties } from "react";

interface HeroMinimalTextProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  ctaText: string;
  ctaUrl?: string;
}

export function HeroMinimalText({
  title,
  subtitle,
  eyebrow,
  ctaText,
  ctaUrl,
}: HeroMinimalTextProps) {
  const [visible, setVisible] = useState(false);
  const [arrowHover, setArrowHover] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sectionStyle: CSSProperties = {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px 24px 60px",
    fontFamily: "'Noto Sans JP', sans-serif",
    backgroundColor: "var(--color-surface, #f8f8f8)",
    textAlign: "center",
  };

  const contentStyle: CSSProperties = {
    maxWidth: 720,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  };

  const eyebrowStyle: CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: "var(--color-primary, #1a1a1a)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 16,
  };

  const titleStyle: CSSProperties = {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    color: "var(--color-text, #1a1a1a)",
    lineHeight: 1.2,
    margin: "0 0 16px",
    letterSpacing: "-0.02em",
  };

  const subtitleStyle: CSSProperties = {
    fontSize: "clamp(1rem, 1.8vw, 1.125rem)",
    fontWeight: 400,
    color: "var(--color-text-muted, #666)",
    lineHeight: 1.7,
    margin: "0 0 32px",
    maxWidth: 560,
    marginLeft: "auto",
    marginRight: "auto",
  };

  const ctaStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "16px 40px",
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    backgroundColor: "var(--color-primary, #1a1a1a)",
    borderRadius: "var(--radius-md, 8px)",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "var(--transition, all 0.2s ease)",
    boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))",
  };

  const arrowStyle: CSSProperties = {
    display: "inline-block",
    transition: "transform 0.2s ease",
    transform: arrowHover ? "translateX(4px)" : "translateX(0)",
  };

  return (
    <section style={sectionStyle}>
      <div style={contentStyle}>
        {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
        <a
          href={ctaUrl ?? "#contact"}
          style={ctaStyle}
          onMouseEnter={() => setArrowHover(true)}
          onMouseLeave={() => setArrowHover(false)}
        >
          {ctaText}
          <span style={arrowStyle}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
