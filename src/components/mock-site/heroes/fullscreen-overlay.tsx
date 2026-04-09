"use client";

import { useState, useEffect, type CSSProperties } from "react";

interface HeroFullscreenOverlayProps {
  title: string;
  subtitle: string;
  image?: string;
  ctaText: string;
  ctaUrl?: string;
}

export function HeroFullscreenOverlay({
  title,
  subtitle,
  image,
  ctaText,
  ctaUrl,
}: HeroFullscreenOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const bgImage = image || "https://picsum.photos/1920/1080?random=1";

  const sectionStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Noto Sans JP', sans-serif",
  };

  const bgStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const overlayStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)",
  };

  const contentStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    maxWidth: 800,
    padding: "24px",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  };

  const titleStyle: CSSProperties = {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.2,
    margin: "0 0 16px",
    letterSpacing: "-0.02em",
  };

  const subtitleStyle: CSSProperties = {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.85)",
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
    color: "#fff",
    backgroundColor: "var(--color-primary, #1a1a1a)",
    borderRadius: "var(--radius-md, 8px)",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "var(--transition, all 0.2s ease)",
    boxShadow: "var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))",
  };

  return (
    <section style={sectionStyle}>
      <div style={bgStyle} />
      <div style={overlayStyle} />
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
