"use client";

import { useEffect, useId, useRef, useState } from "react";

type Article = {
  title: string;
  date: string;
  category?: string;
  excerpt: string;
};

type Props = {
  title: string;
  subtitle?: string;
  articles: Article[];
};

export function NewsListStyle({ title, subtitle, articles }: Props) {
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

  const uid = `nls${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-item {
          display: flex;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid var(--color-border);
          transition: background 0.2s ease;
        }
        .${uid}-item:last-child {
          border-bottom: none;
        }
        @media (max-width: 600px) {
          .${uid}-item {
            flex-direction: column;
            gap: 6px;
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
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            {articles.map((article, i) => (
              <div key={i} className={`${uid}-item`}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0,
                    minWidth: 160,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-text-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {article.date}
                  </span>
                  {article.category && (
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--color-primary)",
                        background: "var(--color-primary-light)",
                        borderRadius: "var(--radius-sm)",
                        padding: "2px 8px",
                        lineHeight: 1.5,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {article.category}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: 4,
                      lineHeight: 1.5,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {article.excerpt}
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
