"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  author: string;
  role?: string;
};

export function TestimonialSingleQuote({ text, author, role }: Props) {
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

  return (
    <section
      ref={ref}
      className="fade-in"
      style={{
        padding: "var(--space-lg) clamp(16px, 4vw, 40px)",
        background: "var(--color-primary)",
        color: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "5rem",
            lineHeight: 1,
            opacity: 0.3,
            fontFamily: "Georgia, serif",
            marginBottom: 8,
            userSelect: "none",
          }}
        >
          &ldquo;
        </div>
        <blockquote
          style={{
            fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
            fontStyle: "italic",
            lineHeight: 1.8,
            margin: 0,
            marginBottom: 16,
          }}
        >
          {text}
        </blockquote>
        <div
          style={{
            width: 48,
            height: 2,
            background: "rgba(255, 255, 255, 0.4)",
            margin: "0 auto 16px",
          }}
        />
        <div
          style={{
            fontWeight: 700,
            fontSize: "1.05rem",
          }}
        >
          {author}
        </div>
        {role && (
          <div
            style={{
              fontSize: "0.9rem",
              opacity: 0.75,
              marginTop: 6,
            }}
          >
            {role}
          </div>
        )}
      </div>
    </section>
  );
}
