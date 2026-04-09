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

export function GallerySlider({ title, items }: Props) {
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

  const uid = `gs${useId().replace(/[^a-z0-9]/gi, '')}`;

  return (
    <>
      <style>{`
        .${uid}-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 8px 16px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .${uid}-track::-webkit-scrollbar {
          display: none;
        }
        .${uid}-slide {
          flex: 0 0 clamp(280px, 30vw, 400px);
          scroll-snap-align: start;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          position: relative;
          aspect-ratio: 3 / 4;
        }
        .${uid}-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .${uid}-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px 12px;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.55) 0%,
            transparent 100%
          );
          color: #fff;
          font-size: 0.9rem;
          font-weight: 500;
        }
      `}</style>
      <section
        ref={ref}
        className="fade-in"
        style={{
          padding: "var(--space-lg) 0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            textAlign: "center",
            marginBottom: 24,
            padding: "0 clamp(16px, 4vw, 40px)",
          }}
        >
          {title}
        </h2>
        <div className={`${uid}-track`}>
          {items.map((item, i) => (
            <div key={i} className={`${uid}-slide`}>
              <img src={item.image} alt={item.caption ?? `Slide ${i + 1}`} />
              {item.caption && (
                <div className={`${uid}-caption`}>{item.caption}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
