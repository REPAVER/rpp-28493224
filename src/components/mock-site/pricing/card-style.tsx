"use client";

import { useEffect, useId, useRef, useState } from "react";

type Plan = {
  name: string;
  price: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
};

type Props = {
  title: string;
  subtitle?: string;
  plans: Plan[];
};

export function PricingCardStyle({ title, subtitle, plans }: Props) {
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

  const uid = `pcs${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        .${uid}-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .${uid}-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }
        .${uid}-highlighted {
          transform: scale(1.04);
          z-index: 1;
        }
        .${uid}-highlighted:hover {
          transform: scale(1.04) translateY(-4px);
        }
        @media (max-width: 900px) {
          .${uid}-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .${uid}-highlighted {
            transform: none;
          }
          .${uid}-highlighted:hover {
            transform: translateY(-4px);
          }
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
            maxWidth: "var(--max-width, 1200px)",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 900,
              color: "var(--color-text)",
              marginBottom: subtitle ? 8 : 40,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--color-text-muted)",
                marginBottom: 40,
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </p>
          )}
          <div className={`${uid}-grid`}>
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`${uid}-card ${plan.highlighted ? `${uid}-highlighted` : ""}`}
                style={{
                  background: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  padding: "clamp(24px, 3vw, 36px)",
                  boxShadow: plan.highlighted
                    ? "var(--shadow-lg)"
                    : "var(--shadow-sm)",
                  border: plan.highlighted
                    ? "2px solid var(--color-primary)"
                    : "1px solid var(--color-border)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.highlighted && (
                  <span
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--color-primary)",
                      color: "#fff",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      padding: "4px 20px",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                    }}
                  >
                    おすすめ
                  </span>
                )}
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: 12,
                    marginTop: plan.highlighted ? 8 : 0,
                  }}
                >
                  {plan.name}
                </h3>
                <div
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    fontWeight: 900,
                    color: "var(--color-primary)",
                    marginBottom: 8,
                    lineHeight: 1.2,
                  }}
                >
                  {plan.price}
                </div>
                {plan.description && (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.6,
                      marginBottom: 20,
                    }}
                  >
                    {plan.description}
                  </p>
                )}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 24px 0",
                    textAlign: "left",
                    flex: 1,
                  }}
                >
                  {plan.features.map((feat, fi) => (
                    <li
                      key={fi}
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--color-text)",
                        padding: "6px 0",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        lineHeight: 1.5,
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        style={{ flexShrink: 0, marginTop: 2 }}
                      >
                        <circle
                          cx="9"
                          cy="9"
                          r="9"
                          fill="var(--color-primary-light)"
                        />
                        <path
                          d="M5.5 9.5L7.5 11.5L12.5 6.5"
                          stroke="var(--color-primary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "14px 32px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRadius: "var(--radius-md)",
                    border: plan.highlighted
                      ? "none"
                      : "2px solid var(--color-primary)",
                    background: plan.highlighted
                      ? "var(--color-primary)"
                      : "transparent",
                    color: plan.highlighted ? "#fff" : "var(--color-primary)",
                    cursor: "pointer",
                    transition: "var(--transition)",
                  }}
                >
                  選択する
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
