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

export function StaffHorizontal({ title, subtitle, staff }: Props) {
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

  const uid = `sh${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-row {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          padding: clamp(24px, 3vw, 36px);
        }
        @media (max-width: 600px) {
          .${uid}-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
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
          <div>
            {staff.map((member, i) => (
              <div
                key={i}
                className={`${uid}-row`}
                style={{
                  background:
                    i % 2 === 0
                      ? "var(--color-surface)"
                      : "var(--color-bg)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <img
                  src={
                    member.image ??
                    `https://picsum.photos/300/300?random=${i + 20}`
                  }
                  alt={member.name}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "var(--radius-md)",
                    objectFit: "cover",
                    flexShrink: 0,
                    aspectRatio: "1 / 1",
                  }}
                />
                <div style={{ textAlign: "left", flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                      marginBottom: 4,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
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
                        fontSize: "0.95rem",
                        color: "var(--color-text)",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {member.description}
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
