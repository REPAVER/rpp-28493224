"use client";

import { useEffect, useId, useRef, useState } from "react";

type GalleryItem = {
  image: string;
  caption?: string;
};

type Props = {
  title: string;
  items: GalleryItem[];
};

export function GalleryMasonry({ title, items }: Props) {
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

  const uid = `gm${useId().replace(/[^a-z0-9]/gi, '')}`;

  return (
    <>
      <style>{`
        .${uid}-grid {
          column-count: 3;
          column-gap: 16px;
        }
        @media (max-width: 900px) {
          .${uid}-grid {
            column-count: 2;
          }
        }
        @media (max-width: 560px) {
          .${uid}-grid {
            column-count: 1;
          }
        }
        .${uid}-item {
          break-inside: avoid;
          margin-bottom: 16px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .${uid}-item img {
          display: block;
          width: 100%;
          height: auto;
          transition: transform 0.4s ease;
        }
        .${uid}-item:hover img {
          transform: scale(1.05);
        }
        .${uid}-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.6) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }
        .${uid}-item:hover .${uid}-overlay {
          opacity: 1;
        }
        .${uid}-caption {
          color: #fff;
          font-size: 0.9rem;
          font-weight: 500;
          transform: translateY(8px);
          transition: transform 0.4s ease;
        }
        .${uid}-item:hover .${uid}-caption {
          transform: translateY(0);
        }
      `}</style>
      <section
        ref={ref}
        className="fade-in"
        style={{
          padding: "var(--space-lg) clamp(16px, 4vw, 40px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            {title}
          </h2>
          <div className={`${uid}-grid`}>
            {items.map((item, i) => (
              <div key={i} className={`${uid}-item`}>
                <img src={item.image} alt={item.caption ?? `Gallery ${i + 1}`} />
                {item.caption && (
                  <div className={`${uid}-overlay`}>
                    <span className={`${uid}-caption`}>{item.caption}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
