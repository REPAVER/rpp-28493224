"use client";

import { useEffect, useId, useRef, useState } from "react";

type PricingItem = {
  name: string;
  price: string;
  description?: string;
};

type PricingCategory = {
  name: string;
  items: PricingItem[];
};

type Props = {
  title: string;
  subtitle?: string;
  categories: PricingCategory[];
};

export function PricingTableStyle({ title, subtitle, categories }: Props) {
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

  const uid = `pts${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-item {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding: 14px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .${uid}-item:last-child {
          border-bottom: none;
        }
        .${uid}-dots {
          flex: 1;
          border-bottom: 2px dotted var(--color-border);
          min-width: 40px;
          position: relative;
          top: -4px;
        }
        .${uid}-cat:nth-child(even) {
          background: var(--color-surface);
          border-radius: var(--radius-md);
        }
        @media (max-width: 600px) {
          .${uid}-item {
            flex-wrap: wrap;
            gap: 4px;
          }
          .${uid}-dots {
            display: none;
          }
          .${uid}-price {
            width: 100%;
            text-align: right;
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
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {categories.map((cat, ci) => (
              <div
                key={ci}
                className={`${uid}-cat`}
                style={{
                  padding: "clamp(24px, 3vw, 36px)",
                  marginBottom: ci < categories.length - 1 ? 16 : 0,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    marginBottom: 16,
                    textAlign: "left",
                    borderLeft: "4px solid var(--color-primary)",
                    paddingLeft: 12,
                  }}
                >
                  {cat.name}
                </h3>
                <div>
                  {cat.items.map((item, ii) => (
                    <div key={ii}>
                      <div className={`${uid}-item`}>
                        <span
                          style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "var(--color-text)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </span>
                        <span className={`${uid}-dots`} />
                        <span
                          className={`${uid}-price`}
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--color-primary)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.price}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "var(--color-text-muted)",
                            lineHeight: 1.6,
                            margin: "0 0 4px 0",
                            textAlign: "left",
                            paddingLeft: 4,
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
