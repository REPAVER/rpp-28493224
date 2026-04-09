"use client";

import { useState, useEffect, type CSSProperties } from "react";

interface HeroSplitProps {
  title: string;
  subtitle: string;
  badge?: string;
  image?: string;
  imageAlt?: string;
  ctaText: string;
  ctaUrl?: string;
  ctaSecondary?: string;
}

export function HeroSplit({
  title,
  subtitle,
  badge,
  image,
  imageAlt,
  ctaText,
  ctaUrl,
  ctaSecondary,
}: HeroSplitProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroImage = image || "https://picsum.photos/800/600?random=2";

  return (
    <>
      <style>{`
        .mock-hero-split {
          display: flex;
          align-items: center;
          min-height: 100vh;
          max-width: var(--max-width, 1200px);
          margin: 0 auto;
          padding: 100px 48px 60px;
          gap: 48px;
          font-family: 'Noto Sans JP', sans-serif;
          background: var(--color-bg, #fff);
          overflow: hidden;
        }
        .mock-hero-split__text {
          flex: 1;
          min-width: 0;
        }
        .mock-hero-split__image {
          flex: 1;
          min-width: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .mock-hero-split__image img {
          width: 100%;
          max-width: 560px;
          height: auto;
          border-radius: var(--radius-lg, 16px);
          box-shadow: var(--shadow-lg, 0 20px 40px rgba(0,0,0,0.12));
          object-fit: cover;
          aspect-ratio: 4 / 3;
        }
        @media (max-width: 768px) {
          .mock-hero-split {
            flex-direction: column;
            padding: 96px 24px 40px;
            gap: 32px;
            min-height: auto;
            text-align: center;
          }
          .mock-hero-split__image {
            order: -1;
          }
          .mock-hero-split__actions {
            justify-content: center;
          }
        }
      `}</style>
      <section className="mock-hero-split">
        <div
          className="mock-hero-split__text"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {badge && (
            <span style={{
              display: "inline-block",
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--color-primary)",
              background: "var(--color-primary-light)",
              borderRadius: 999,
              marginBottom: 16,
            }}>
              {badge}
            </span>
          )}
          <h1 style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "var(--color-text)",
            lineHeight: 1.25,
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)",
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            margin: "0 0 32px",
          }}>
            {subtitle}
          </p>
          <div className="mock-hero-split__actions" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={ctaUrl ?? "#contact"} style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              background: "var(--color-primary)",
              borderRadius: "var(--radius-md, 8px)",
              textDecoration: "none",
              transition: "var(--transition)",
            }}>
              {ctaText}
            </a>
            {ctaSecondary && (
              <a href="#features" style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 32px",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--color-primary)",
                background: "transparent",
                border: "2px solid var(--color-primary)",
                borderRadius: "var(--radius-md, 8px)",
                textDecoration: "none",
                transition: "var(--transition)",
              }}>
                {ctaSecondary}
              </a>
            )}
          </div>
        </div>

        <div
          className="mock-hero-split__image"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <img src={heroImage} alt={imageAlt ?? title} loading="eager" />
        </div>
      </section>
    </>
  );
}
