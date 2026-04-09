"use client";
import { useId, useState, type CSSProperties } from "react";

interface Product {
  name: string;
  price: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  href?: string;
}

interface SidebarCategory {
  icon?: string;
  label: string;
  href?: string;
  children?: Array<{ label: string; href?: string }>;
}

interface ProductsSidebarGridProps {
  title?: string;
  sidebarTitle?: string;
  sidebarCategories?: SidebarCategory[];
  products?: Product[];
}

export function ProductsSidebarGrid({
  title = "おすすめ商品",
  sidebarTitle = "商品・コンテンツを探す",
  sidebarCategories = [
    { icon: "✨", label: "おすすめ" },
    { icon: "👆", label: "ピックアップ" },
    { icon: "🏅", label: "人気ランキング" },
  ],
  products = [
    { name: "こだわり商品A 内容量300g", price: "1,200", image: "https://picsum.photos/400/400?random=40", rating: 5, reviewCount: 8 },
    { name: "人気の定番商品B 大容量サイズ", price: "1,980", image: "https://picsum.photos/400/400?random=41", rating: 4.5, reviewCount: 15 },
    { name: "産地直送 厳選素材C", price: "2,480", image: "https://picsum.photos/400/400?random=42", rating: 5, reviewCount: 11, badge: "数量限定" },
    { name: "無添加こだわり商品D", price: "980", image: "https://picsum.photos/400/400?random=43", rating: 4.5, reviewCount: 23 },
    { name: "季節限定 おすすめ商品E", price: "1,580", image: "https://picsum.photos/400/400?random=44", rating: 4.5, reviewCount: 13 },
    { name: "ギフトにも人気の商品F", price: "2,980", image: "https://picsum.photos/400/400?random=45", rating: 4.5, reviewCount: 12 },
  ],
}: ProductsSidebarGridProps) {
  const uid = `psg${useId().replace(/[^a-z0-9]/gi, "")}`;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push("★");
      } else if (i - 0.5 <= rating) {
        stars.push("★");
      } else {
        stars.push("☆");
      }
    }
    return stars.join("");
  };

  return (
    <>
      <style>{`
        .${uid}-section {
          background: var(--color-primary-light, #f8f5f0);
          padding: var(--space-lg, 60px) 0;
          font-family: 'Noto Sans JP', sans-serif;
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
          margin-bottom: 32px;
        }
        .${uid}-layout {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }
        .${uid}-sidebar {
          width: 240px;
          flex-shrink: 0;
        }
        .${uid}-sidebar-heading {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text, #333);
          padding-bottom: 12px;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--color-border, #ddd);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .${uid}-sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 0;
          font-size: 0.85rem;
          color: var(--color-text, #333);
          text-decoration: none;
          border-bottom: 1px solid var(--color-border, #eee);
          transition: color var(--transition, 0.3s ease);
        }
        .${uid}-sidebar-item:hover {
          color: var(--color-primary, #8b7355);
        }
        .${uid}-grid {
          flex: 1;
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .${uid}-card {
          background: var(--color-surface, #fff);
          border-radius: var(--radius-md, 16px);
          overflow: hidden;
          text-decoration: none;
          color: var(--color-text, #333);
          display: block;
          transition: box-shadow var(--transition, 0.3s ease);
        }
        .${uid}-card:hover {
          box-shadow: var(--shadow-hover, 0 8px 24px rgba(0,0,0,0.12));
        }
        .${uid}-card-img {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
        }
        .${uid}-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .${uid}-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: var(--color-primary, #8b7355);
          color: #fff;
          font-size: 0.65rem;
          padding: 4px 8px;
          border-radius: 4px;
          writing-mode: vertical-rl;
          letter-spacing: 0.05em;
        }
        .${uid}-card-body {
          padding: clamp(12px, 2vw, 16px) clamp(12px, 2vw, 16px) clamp(14px, 2vw, 18px);
        }
        .${uid}-card-name {
          font-size: 0.82rem;
          line-height: 1.5;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .${uid}-card-price {
          font-size: 1rem;
          font-weight: 700;
        }
        .${uid}-card-price small {
          font-size: 0.75rem;
          font-weight: 400;
        }
        .${uid}-card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
          font-size: 0.8rem;
          color: var(--color-primary, #8b7355);
        }
        .${uid}-card-rating span {
          color: var(--color-text-muted, #888);
          font-size: 0.75rem;
        }
        .${uid}-fav {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .${uid}-layout { flex-direction: column; }
          .${uid}-sidebar { width: 100%; }
          .${uid}-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <section className={`${uid}-section`}>
        <div className={`${uid}-container`}>
          <h2 className={`${uid}-title`}>{title}</h2>
          <div className={`${uid}-layout`}>
            <aside className={`${uid}-sidebar`}>
              <div className={`${uid}-sidebar-heading`}>
                {sidebarTitle}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              {sidebarCategories.map((cat, i) => (
                <a key={i} href={cat.href ?? "#"} className={`${uid}-sidebar-item`}>
                  {cat.icon && <span>{cat.icon}</span>}
                  <span>{cat.label}</span>
                </a>
              ))}
            </aside>

            <div className={`${uid}-grid`}>
              {products.map((p, i) => (
                <a key={i} href={p.href ?? "#"} className={`${uid}-card`}>
                  <div className={`${uid}-card-img`}>
                    <img src={p.image ?? `https://picsum.photos/400/400?random=${40 + i}`} alt={p.name} />
                    {p.badge && <span className={`${uid}-badge`}>{p.badge}</span>}
                    <div className={`${uid}-fav`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted,#bbb)" strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                      </svg>
                    </div>
                  </div>
                  <div className={`${uid}-card-body`}>
                    <div className={`${uid}-card-name`}>{p.name}</div>
                    <div className={`${uid}-card-price`}>{p.price}<small>円</small></div>
                    {p.rating && (
                      <div className={`${uid}-card-rating`}>
                        {renderStars(p.rating)}
                        {p.reviewCount && <span>{p.reviewCount}件</span>}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
