"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  text?: string;
  buttonText: string;
  buttonUrl?: string;
};

export function CtaCardCentered({
  title,
  text,
  buttonText,
  buttonUrl = "#",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .ctacc-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ctacc-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }
      `}</style>
      <section
        ref={ref}
        style={{
          padding: "var(--space-lg) clamp(16px, 4vw, 40px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            background: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(32px, 5vw, 64px)",
            boxShadow: "var(--shadow-md)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: text ? 12 : 24,
            }}
          >
            {title}
          </h2>
          {text && (
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                marginBottom: 24,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {text}
            </p>
          )}
          <a
            href={buttonUrl}
            className="ctacc-btn"
            style={{
              display: "inline-block",
              background: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-md)",
              padding: "16px 48px",
              fontSize: "1.05rem",
              fontWeight: 700,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {buttonText}
          </a>
        </div>
      </section>
    </>
  );
}
