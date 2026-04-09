"use client";

import { useEffect, useId, useRef, useState } from "react";

type Product = {
  name: string;
  price: string;
  image: string;
  description?: string;
  badge?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
};

export function ProductGrid({ title, subtitle, products }: Props) {
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

  const uid = `pgr${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .${uid}-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }
        .${uid}-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }
        .${uid}-imgwrap {
          overflow: hidden;
          position: relative;
        }
        .${uid}-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .${uid}-card:hover .${uid}-img {
          transform: scale(1.08);
        }
        @media (max-width: 900px) {
          .${uid}-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .${uid}-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin-left: auto !important;
            margin-right: auto !important;
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
            {products.map((product, i) => (
              <div
                key={i}
                className={`${uid}-card`}
                style={{
                  background: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-sm)",
                  textAlign: "left",
                }}
              >
                <div className={`${uid}-imgwrap`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`${uid}-img`}
                    loading="lazy"
                  />
                  {product.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "var(--color-accent)",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: "var(--radius-sm)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{ padding: "clamp(24px, 3vw, 36px)" }}>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {product.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      marginBottom: product.description ? 8 : 0,
                    }}
                  >
                    {product.price}
                  </div>
                  {product.description && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {product.description}
                    </p>
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
