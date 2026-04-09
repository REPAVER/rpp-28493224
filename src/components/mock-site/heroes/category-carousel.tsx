"use client";
import { useId, useRef, type CSSProperties } from "react";

interface CategoryItem {
  label: string;
  image?: string;
  href?: string;
}

interface HeroCategoryCarouselProps {
  title?: string;
  categories?: CategoryItem[];
}

export function HeroCategoryCarousel({
  title = "人気のカテゴリー",
  categories = [
    { label: "おすすめ", image: "https://picsum.photos/280/320?random=20" },
    { label: "カテゴリA", image: "https://picsum.photos/280/320?random=21" },
    { label: "カテゴリB", image: "https://picsum.photos/280/320?random=22" },
    { label: "カテゴリC", image: "https://picsum.photos/280/320?random=23" },
    { label: "カテゴリD", image: "https://picsum.photos/280/320?random=24" },
    { label: "お買い得セット", image: "https://picsum.photos/280/320?random=25" },
  ],
}: HeroCategoryCarouselProps) {
  const uid = `hcc${useId().replace(/[^a-z0-9]/gi, "")}`;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 300;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .${uid}-section {
          padding: var(--space-lg, 60px) 0;
          font-family: 'Noto Sans JP', sans-serif;
          overflow: hidden;
        }
        .${uid}-container {
          max-width: var(--max-width, 1200px);
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 40px);
          box-sizing: border-box;
        }
        .${uid}-title {
          font-size: clamp(1.4rem, 3vw, 1.8rem);
          font-weight: 700;
          color: var(--color-text, #333);
          margin-bottom: 24px;
        }
        .${uid}-track-wrap {
          position: relative;
        }
        .${uid}-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 16px;
        }
        .${uid}-track::-webkit-scrollbar { display: none; }
        .${uid}-card {
          flex: 0 0 auto;
          width: clamp(180px, 20vw, 240px);
          scroll-snap-align: start;
          position: relative;
          border-radius: var(--radius-md, 16px);
          overflow: hidden;
          text-decoration: none;
          display: block;
        }
        .${uid}-card img {
          width: 100%;
          aspect-ratio: 7 / 8;
          object-fit: cover;
          display: block;
        }
        .${uid}-label {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.92);
          color: var(--color-text, #333);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 8px 24px;
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.08));
        }
        .${uid}-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: 1px solid var(--color-border, #ddd);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow: var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.1));
          transition: box-shadow var(--transition, 0.3s ease);
        }
        .${uid}-arrow:hover {
          box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.15));
        }
        .${uid}-arrow-left { left: -16px; }
        .${uid}-arrow-right { right: -16px; }
        .${uid}-progress {
          margin-top: 16px;
          height: 2px;
          background: var(--color-border, #ddd);
          border-radius: 1px;
          max-width: 70%;
        }
        @media (max-width: 768px) {
          .${uid}-card { width: 160px; }
          .${uid}-arrow { display: none; }
        }
      `}</style>

      <section className={`${uid}-section`}>
        <div className={`${uid}-container`}>
          <h2 className={`${uid}-title`}>{title}</h2>
          <div className={`${uid}-track-wrap`}>
            <button className={`${uid}-arrow ${uid}-arrow-left`} onClick={() => scroll("left")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text,#333)" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className={`${uid}-track`} ref={scrollRef}>
              {categories.map((cat, i) => (
                <a key={i} href={cat.href ?? "#"} className={`${uid}-card`}>
                  <img
                    src={cat.image ?? `https://picsum.photos/280/320?random=${20 + i}`}
                    alt={cat.label}
                  />
                  <span className={`${uid}-label`}>{cat.label}</span>
                </a>
              ))}
            </div>
            <button className={`${uid}-arrow ${uid}-arrow-right`} onClick={() => scroll("right")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text,#333)" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <div className={`${uid}-progress`} />
        </div>
      </section>
    </>
  );
}
