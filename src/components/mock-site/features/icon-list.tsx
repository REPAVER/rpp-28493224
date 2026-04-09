"use client";

import { useEffect, useRef, useState } from "react";

type Feature = {
  icon?: string;
  title: string;
  text: string;
};

type Props = {
  title: string;
  subtitle?: string;
  features: Feature[];
};

export function FeaturesIconList({ title, subtitle, features }: Props) {
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
        .fil-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: clamp(24px, 3vw, 36px);
          border-radius: var(--radius-md);
          transition: transform 0.3s ease;
        }
        .fil-item:hover {
          transform: translateX(4px);
        }
      `}</style>
      <section
        ref={ref}
        className="fade-in"
        style={{
          padding: "var(--space-lg) clamp(16px, 4vw, 40px)",
          background: "var(--color-surface)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: subtitle ? 8 : 0,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {features.map((feature, i) => (
              <div key={i} className="fil-item">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    minWidth: 48,
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  {feature.icon ?? "✦"}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: 8,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
