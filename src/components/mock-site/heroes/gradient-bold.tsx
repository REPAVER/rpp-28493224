"use client";

import { useState, useEffect, type CSSProperties } from "react";

interface HeroGradientBoldProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl?: string;
}

export function HeroGradientBold({
  title,
  subtitle,
  ctaText,
  ctaUrl,
}: HeroGradientBoldProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sectionStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Noto Sans JP', sans-serif",
    background:
      "linear-gradient(135deg, var(--color-primary, #1a1a1a) 0%, var(--color-accent, #e53e3e) 100%)",
  };

  const circleBase: CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  };

  const circle1Style: CSSProperties = {
    ...circleBase,
    width: 400,
    height: 400,
    top: "-10%",
    right: "-5%",
  };

  const circle2Style: CSSProperties = {
    ...circleBase,
    width: 250,
    height: 250,
    bottom: "10%",
    left: "-3%",
  };

  const circle3Style: CSSProperties = {
    ...circleBase,
    width: 150,
    height: 150,
    top: "40%",
    right: "20%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  };

  const contentStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    maxWidth: 900,
    padding: "24px",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  };

  const titleStyle: CSSProperties = {
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.15,
    margin: "0 0 16px",
    letterSpacing: "-0.03em",
  };

  const subtitleStyle: CSSProperties = {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 1.7,
    margin: "0 0 32px",
    maxWidth: 600,
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
    color: "var(--color-primary, #1a1a1a)",
    backgroundColor: "#fff",
    borderRadius: 999,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "var(--transition, all 0.2s ease)",
    boxShadow: "var(--shadow-lg, 0 20px 40px rgba(0,0,0,0.15))",
  };

  return (
    <section style={sectionStyle}>
      {/* Decorative circles */}
      <div style={circle1Style} />
      <div style={circle2Style} />
      <div style={circle3Style} />

      <div style={contentStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
        <a href={ctaUrl ?? "#contact"} style={ctaStyle}>
          {ctaText}
        </a>
      </div>
    </section>
  );
}
