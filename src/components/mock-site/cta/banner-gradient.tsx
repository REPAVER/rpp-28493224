"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  text?: string;
  buttonText: string;
  buttonUrl?: string;
};

export function CtaBannerGradient({
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
        .ctabg-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ctabg-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      <section
        ref={ref}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          padding: "var(--space-lg) clamp(16px, 4vw, 40px)",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "15%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.06)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "var(--max-width)",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: text ? 12 : 24,
            }}
          >
            {title}
          </h2>
          {text && (
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.7,
                marginBottom: 24,
                maxWidth: 600,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {text}
            </p>
          )}
          <a
            href={buttonUrl}
            className="ctabg-btn"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "var(--color-primary)",
              border: "none",
              borderRadius: 999,
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
