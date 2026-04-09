"use client";
import { useId, useRef, type CSSProperties } from "react";

interface Review {
  rating: number;
  title?: string;
  text: string;
  author: string;
  productName?: string;
  productImage?: string;
}

interface TestimonialsCardsReviewProps {
  title?: string;
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
}

export function TestimonialsCardsReview({
  title = "お客様の声",
  averageRating = 4.86,
  totalReviews = 120,
  reviews = [
    {
      rating: 5,
      text: "品質がとても良く、安心して使えます。リピート購入しています。家族にも好評で、毎日の食卓に欠かせない存在になっています。",
      author: "ご購入者様",
      productName: "こだわり商品A 内容量300g",
      productImage: "https://picsum.photos/60/60?random=50",
    },
    {
      rating: 5,
      text: "素材の良さが感じられる商品です。クセがなく使いやすいので、料理の幅が広がりました。友人にもおすすめしています。",
      author: "M.T様",
      productName: "人気の定番商品B 大容量サイズ",
      productImage: "https://picsum.photos/60/60?random=51",
    },
    {
      rating: 5,
      title: "期待通りの品質",
      text: "口コミを見て購入しましたが、期待通りでした。丁寧な梱包で届き、商品の品質にも大満足です。また利用したいです。",
      author: "S.K様",
      productName: "産地直送 厳選素材C",
      productImage: "https://picsum.photos/60/60?random=52",
    },
  ],
}: TestimonialsCardsReviewProps) {
  const uid = `tc${useId().replace(/[^a-z0-9]/gi, "")}`;
  const scrollRef = useRef<HTMLDivElement>(null);

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const fontSize = size === "lg" ? "1.3rem" : "1.1rem";
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? "★" : "☆");
    }
    return (
      <span style={{ color: "var(--color-primary, #8b7355)", fontSize, letterSpacing: "2px" }}>
        {stars.join("")}
      </span>
    );
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .${uid}-section {
          padding: var(--space-lg, 60px) 0;
          font-family: 'Noto Sans JP', sans-serif;
          background: var(--color-primary-light, #f8f5f0);
          overflow: hidden;
        }
        .${uid}-container {
          max-width: var(--max-width, 1200px);
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 40px);
          box-sizing: border-box;
        }
        .${uid}-title {
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 700;
          color: var(--color-text, #333);
          margin-bottom: 16px;
        }
        .${uid}-summary {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 20px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--color-border, #ddd);
          flex-wrap: wrap;
        }
        .${uid}-avg {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-text, #333);
        }
        .${uid}-total {
          font-size: 0.85rem;
          color: var(--color-text-muted, #888);
        }
        .${uid}-track-wrap {
          position: relative;
        }
        .${uid}-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .${uid}-track::-webkit-scrollbar { display: none; }
        .${uid}-card {
          flex: 0 0 340px;
          min-width: 0;
        }
        .${uid}-card-stars {
          margin-bottom: 12px;
        }
        .${uid}-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--color-text, #333);
        }
        .${uid}-card-text {
          font-size: 0.85rem;
          line-height: 1.8;
          color: var(--color-text, #333);
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .${uid}-more {
          font-size: 0.8rem;
          color: var(--color-primary, #8b7355);
          text-decoration: none;
        }
        .${uid}-author {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-text, #333);
          margin-top: 12px;
          margin-bottom: 8px;
        }
        .${uid}-product {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .${uid}-product img {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          object-fit: cover;
        }
        .${uid}-product-name {
          font-size: 0.78rem;
          color: var(--color-text-muted, #888);
          line-height: 1.4;
        }
        .${uid}-arrows {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          gap: 8px;
        }
        .${uid}-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--color-border, #ccc);
          background: var(--color-surface, #fff);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow var(--transition, 0.3s ease);
        }
        .${uid}-arrow:hover {
          box-shadow: var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.1));
        }
        .${uid}-btn-wrap {
          text-align: center;
          margin-top: 32px;
        }
        .${uid}-btn {
          display: inline-block;
          padding: 14px 40px;
          border: 1px solid var(--color-text, #333);
          border-radius: 999px;
          color: var(--color-text, #333);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          background: transparent;
          cursor: pointer;
          transition: background var(--transition, 0.3s ease);
        }
        .${uid}-btn:hover {
          background: var(--color-surface, #fff);
        }
        @media (max-width: 768px) {
          .${uid}-card { flex: 0 0 280px; }
        }
      `}</style>

      <section className={`${uid}-section`}>
        <div className={`${uid}-container`}>
          <h2 className={`${uid}-title`}>{title}</h2>
          <div className={`${uid}-summary`}>
            <span className={`${uid}-avg`}>{averageRating}</span>
            {renderStars(Math.round(averageRating), "lg")}
            <span className={`${uid}-total`}>{totalReviews.toLocaleString()}件</span>
          </div>

          <div className={`${uid}-track-wrap`}>
            <div className={`${uid}-arrows`}>
              <button className={`${uid}-arrow`} onClick={() => scroll("left")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className={`${uid}-arrow`} onClick={() => scroll("right")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

            <div className={`${uid}-track`} ref={scrollRef}>
              {reviews.map((r, i) => (
                <div key={i} className={`${uid}-card`}>
                  <div className={`${uid}-card-stars`}>{renderStars(r.rating)}</div>
                  {r.title && <div className={`${uid}-card-title`}>{r.title}</div>}
                  <div className={`${uid}-card-text`}>{r.text}</div>
                  <a href="#" className={`${uid}-more`}>もっと見る</a>
                  <div className={`${uid}-author`}>{r.author}</div>
                  {r.productName && (
                    <div className={`${uid}-product`}>
                      <img src={r.productImage ?? `https://picsum.photos/60/60?random=${50 + i}`} alt={r.productName} />
                      <span className={`${uid}-product-name`}>{r.productName}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`${uid}-btn-wrap`}>
            <a href="#" className={`${uid}-btn`}>もっと見る</a>
          </div>
        </div>
      </section>
    </>
  );
}
