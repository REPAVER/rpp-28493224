"use client";

import { useEffect, useId, useRef, useState } from "react";

type Feature = {
  title: string;
  text: string;
  image?: string;
  label?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  features: Feature[];
};

export function FeaturesAlternating({ title, subtitle, features }: Props) {
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

  const uid = `fa${useId().replace(/[^a-z0-9]/gi, '')}`;

  return (
    <>
      <style>{`
        .${uid}-row {
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 48px);
        }
        .${uid}-row:nth-child(even) {
          flex-direction: row-reverse;
        }
        .${uid}-img {
          flex: 1;
          min-width: 0;
        }
        .${uid}-content {
          flex: 1;
          min-width: 0;
        }
        @media (max-width: 768px) {
          .${uid}-row,
          .${uid}-row:nth-child(even) {
            flex-direction: column;
          }
          .${uid}-img {
            order: -1;
          }
        }
      `}</style>
      <section
        ref={ref}
        className="fade-in"
        style={{
          padding: "var(--space-lg) clamp(16px, 4vw, 40px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
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
              gap: "clamp(24px, 4vw, 48px)",
            }}
          >
            {features.map((feature, i) => (
              <div key={i} className={`${uid}-row`}>
                <div className={`${uid}-content`}>
                  {feature.label && (
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--color-primary)",
                        marginBottom: 8,
                        display: "block",
                      }}
                    >
                      {feature.label}
                    </span>
                  )}
                  <h3
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: 12,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {feature.text}
                  </p>
                </div>
                <div className={`${uid}-img`}>
                  {feature.image ? (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-md)",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "4 / 3",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--color-primary-light)",
                        boxShadow: "var(--shadow-md)",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
