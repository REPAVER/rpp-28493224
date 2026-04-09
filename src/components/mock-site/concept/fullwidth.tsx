"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  title: string;
  text: string;
  backgroundImage?: string;
};

export function ConceptFullwidth({ title, text, backgroundImage }: Props) {
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

  const uid = `cfw${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-section {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .${uid}-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          z-index: 1;
        }
        .${uid}-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
          text-align: center;
          padding: clamp(40px, 6vw, 80px) clamp(16px, 4vw, 40px);
        }
      `}</style>
      <section
        ref={ref}
        className={`${uid}-section`}
        style={{
          backgroundImage: `url(${backgroundImage ?? "https://picsum.photos/1600/900?random=60"})`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className={`${uid}-overlay`} />
        <div className={`${uid}-content`}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: 24,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 2,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            {text}
          </p>
        </div>
      </section>
    </>
  );
}
