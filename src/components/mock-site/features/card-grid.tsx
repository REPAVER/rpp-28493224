"use client";

import { useEffect, useId, useRef, useState } from "react";

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

export function FeaturesCardGrid({ title, subtitle, features }: Props) {
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

  const uid = `fcg${useId().replace(/[^a-z0-9]/gi, '')}`;

  return (
    <>
      <style>{`
        .${uid}-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .${uid}-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }
        .${uid}-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .${uid}-grid {
            grid-template-columns: 1fr;
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
        <div
          style={{
            maxWidth: "var(--max-width)",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: subtitle ? 8 : 32,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--color-text-muted)",
                marginBottom: 32,
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </p>
          )}
          <div className={`${uid}-grid`}>
            {features.map((feature, i) => (
              <div
                key={i}
                className={`${uid}-card`}
                style={{
                  background: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  padding: "clamp(24px, 3vw, 36px)",
                  boxShadow: "var(--shadow-sm)",
                  textAlign: "left",
                }}
              >
                {feature.icon && (
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md)",
                      background: "var(--color-primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      marginBottom: 12,
                    }}
                  >
                    {feature.icon}
                  </div>
                )}
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
