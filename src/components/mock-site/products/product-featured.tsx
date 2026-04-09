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

export function ProductFeatured({ title, subtitle, products }: Props) {
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

  const uid = `pft${useId().replace(/[^a-z0-9]/gi, "")}`;

  const featured = products[0];
  const rest = products.slice(1);

  return (
    <>
      <style>{`
        .${uid}-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 48px;
        }
        .${uid}-featured-imgwrap {
          overflow: hidden;
          border-radius: var(--radius-lg);
          position: relative;
        }
        .${uid}-featured-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .${uid}-featured-imgwrap:hover .${uid}-featured-img {
          transform: scale(1.04);
        }
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
        .${uid}-card-imgwrap {
          overflow: hidden;
          position: relative;
        }
        .${uid}-card-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .${uid}-card:hover .${uid}-card-img {
          transform: scale(1.08);
        }
        .${uid}-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--color-primary);
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          padding: 14px 32px;
          border: 2px solid var(--color-primary);
          border-radius: var(--radius-md);
          transition: background 0.3s ease, color 0.3s ease;
          cursor: pointer;
        }
        .${uid}-link:hover {
          background: var(--color-primary);
          color: #fff;
        }
        @media (max-width: 900px) {
          .${uid}-featured {
            grid-template-columns: 1fr;
            gap: 24px;
          }
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

          {/* Featured (first) product */}
          {featured && (
            <div className={`${uid}-featured`}>
              <div className={`${uid}-featured-imgwrap`}>
                <img
                  src={featured.image}
                  alt={featured.name}
                  className={`${uid}-featured-img`}
                  loading="lazy"
                />
                {featured.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "var(--color-accent)",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      padding: "6px 16px",
                      borderRadius: "var(--radius-sm)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {featured.badge}
                  </span>
                )}
              </div>
              <div style={{ textAlign: "left" }}>
                <h3
                  style={{
                    fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                    fontWeight: 800,
                    color: "var(--color-text)",
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {featured.name}
                </h3>
                <div
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 900,
                    color: "var(--color-primary)",
                    marginBottom: 16,
                  }}
                >
                  {featured.price}
                </div>
                {featured.description && (
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.8,
                      marginBottom: 24,
                    }}
                  >
                    {featured.description}
                  </p>
                )}
                <span className={`${uid}-link`}>
                  詳しく見る
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ flexShrink: 0 }}
                  >
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Remaining products in grid */}
          {rest.length > 0 && (
            <div className={`${uid}-grid`}>
              {rest.map((product, i) => (
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
                  <div className={`${uid}-card-imgwrap`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`${uid}-card-img`}
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
          )}
        </div>
      </section>
    </>
  );
}
