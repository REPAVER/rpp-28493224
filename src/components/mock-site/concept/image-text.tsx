"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  title: string;
  text: string;
  image?: string;
  imagePosition?: "left" | "right";
};

export function ConceptImageText({
  title,
  text,
  image,
  imagePosition = "left",
}: Props) {
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

  const uid = `cit${useId().replace(/[^a-z0-9]/gi, "")}`;

  const imageBlock = (
    <div
      className={`${uid}-image`}
      style={{
        flex: 4,
        minWidth: 0,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      <img
        src={image ?? "https://picsum.photos/800/600?random=50"}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          minHeight: 280,
        }}
      />
    </div>
  );

  const textBlock = (
    <div
      className={`${uid}-text`}
      style={{
        flex: 5,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 900,
          color: "var(--color-text)",
          marginBottom: 20,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "var(--color-text)",
          lineHeight: 2,
          margin: 0,
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </p>
    </div>
  );

  return (
    <>
      <style>{`
        .${uid}-layout {
          display: flex;
          gap: clamp(24px, 4vw, 48px);
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .${uid}-layout {
            flex-direction: column !important;
          }
          .${uid}-image {
            flex: 1 1 auto !important;
          }
          .${uid}-text {
            flex: 1 1 auto !important;
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
          className={`${uid}-layout`}
          style={{
            maxWidth: "var(--max-width, 1200px)",
            margin: "0 auto",
            flexDirection:
              imagePosition === "right" ? "row-reverse" : "row",
          }}
        >
          {imageBlock}
          {textBlock}
        </div>
      </section>
    </>
  );
}
