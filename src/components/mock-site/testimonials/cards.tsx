"use client";

import { useEffect, useId, useRef, useState } from "react";

type Testimonial = {
  text: string;
  author: string;
  role?: string;
  stars?: number;
  avatar?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
};

function Stars({ count }: { count: number }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        marginBottom: 8,
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: "1.1rem",
            color: i < count ? "#f59e0b" : "var(--color-border)",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialCards({ title, subtitle, testimonials }: Props) {
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

  const uid = `tc${useId().replace(/[^a-z0-9]/gi, '')}`;

  return (
    <>
      <style>{`
        .${uid}-card {
          background: var(--color-bg);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
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
          background: "var(--color-surface)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
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

          <div className={`${uid}-grid`}>
            {testimonials.map((t, i) => (
              <div key={i} className={`${uid}-card`}>
                {t.stars != null && <Stars count={t.stars} />}
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-text)",
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: 16,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.author}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "var(--color-primary-light)",
                        color: "var(--color-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      {t.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "var(--color-text)",
                      }}
                    >
                      {t.author}
                    </div>
                    {t.role && (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {t.role}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
