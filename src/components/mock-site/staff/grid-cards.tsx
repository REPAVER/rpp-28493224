"use client";

import { useEffect, useId, useRef, useState } from "react";

type StaffMember = {
  name: string;
  role: string;
  image?: string;
  description?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  staff: StaffMember[];
};

export function StaffGridCards({ title, subtitle, staff }: Props) {
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

  const uid = `sgc${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .${uid}-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: clamp(24px, 3vw, 36px);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .${uid}-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }
        @media (max-width: 1024px) {
          .${uid}-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
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
            {staff.map((member, i) => (
              <div key={i} className={`${uid}-card`}>
                <img
                  src={
                    member.image ??
                    `https://picsum.photos/300/300?random=${i + 10}`
                  }
                  alt={member.name}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "0 auto 16px",
                    display: "block",
                    aspectRatio: "1 / 1",
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: 4,
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                    marginBottom: member.description ? 12 : 0,
                    lineHeight: 1.5,
                  }}
                >
                  {member.role}
                </p>
                {member.description && (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {member.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
