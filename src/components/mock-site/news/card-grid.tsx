"use client";

import { useEffect, useId, useRef, useState } from "react";

type Article = {
  title: string;
  date: string;
  category?: string;
  excerpt: string;
  image?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  articles: Article[];
};

export function NewsCardGrid({ title, subtitle, articles }: Props) {
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

  const uid = `ncg${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .${uid}-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .${uid}-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }
        @media (max-width: 768px) {
          .${uid}-grid {
            grid-template-columns: 1fr;
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
          <div className={`${uid}-grid`}>
            {articles.map((article, i) => (
              <div key={i} className={`${uid}-card`}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={
                      article.image ??
                      `https://picsum.photos/640/360?random=${i + 1}`
                    }
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: "clamp(24px, 3vw, 36px)",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    {article.category && (
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--color-primary)",
                          background: "var(--color-primary-light)",
                          borderRadius: "var(--radius-sm)",
                          padding: "2px 10px",
                          lineHeight: 1.6,
                        }}
                      >
                        {article.category}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {article.date}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.7,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
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
