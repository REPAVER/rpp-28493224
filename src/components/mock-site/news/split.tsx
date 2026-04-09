"use client";
import { useId, type CSSProperties } from "react";

interface NewsItem {
  title: string;
  excerpt?: string;
  date: string;
  href?: string;
}

interface NewsSplitProps {
  title?: string;
  subtitle?: string;
  news?: NewsItem[];
  image?: string;
}

export function NewsSplit({
  title = "お知らせ",
  subtitle = "news",
  news = [
    {
      title: "ゴールデンウィーク休業のお知らせ",
      excerpt: "日頃より当店をご利用いただき誠にありがとうございます。ゴールデンウィーク期間中の休業についてご案内いたします...",
      date: "2026.03.18",
    },
    {
      title: "悪天候に伴う配送遅延の可能性について",
      excerpt: "日頃より当店をご利用いただき誠にありがとうございます。悪天候の影響により、一部地域でお届けに遅れが生じる場合がございます...",
      date: "2026.01.21",
    },
    {
      title: "年末年始休業のお知らせ",
      excerpt: "平素より当店をご利用いただき誠にありがとうございます。誠に勝手ながら、下記の期間を年末年始の休業とさせていただきます...",
      date: "2025.12.15",
    },
  ],
  image = "https://picsum.photos/700/600?random=60",
}: NewsSplitProps) {
  const uid = `ns${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-section {
          padding: var(--space-lg, 60px) 0;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .${uid}-container {
          max-width: var(--max-width, 1200px);
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 40px);
          box-sizing: border-box;
        }
        .${uid}-header {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 32px;
        }
        .${uid}-title {
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 700;
          color: var(--color-text, #333);
        }
        .${uid}-subtitle {
          font-size: 0.8rem;
          color: var(--color-text-muted, #888);
          letter-spacing: 0.1em;
        }
        .${uid}-layout {
          display: flex;
          gap: 0;
          align-items: stretch;
          min-height: 480px;
          overflow: hidden;
          border-radius: var(--radius-md, 16px);
        }
        .${uid}-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .${uid}-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 28px clamp(16px, 3vw, 24px);
          background: var(--color-surface, #fff);
          border-bottom: 1px solid var(--color-border, #eee);
          text-decoration: none;
          color: var(--color-text, #333);
          transition: background var(--transition, 0.2s ease);
          flex: 1;
        }
        .${uid}-item:first-child {
          border-radius: var(--radius-md, 16px) 0 0 0;
        }
        .${uid}-item:last-child {
          border-radius: 0 0 0 var(--radius-md, 16px);
          border-bottom: none;
        }
        .${uid}-item:hover {
          background: var(--color-primary-light, #f8f5f0);
        }
        .${uid}-item-body {
          flex: 1;
          min-width: 0;
        }
        .${uid}-item-title {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .${uid}-item-excerpt {
          font-size: 0.82rem;
          color: var(--color-text-muted, #888);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .${uid}-item-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .${uid}-item-date {
          font-size: 0.85rem;
          color: var(--color-text-muted, #888);
          white-space: nowrap;
          text-align: right;
          line-height: 1.4;
        }
        .${uid}-item-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--color-border, #ddd);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .${uid}-image {
          flex: 1;
          min-width: 0;
        }
        .${uid}-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0 var(--radius-md, 16px) var(--radius-md, 16px) 0;
          display: block;
        }
        @media (max-width: 768px) {
          .${uid}-layout {
            flex-direction: column;
            min-height: auto;
            border-radius: var(--radius-md, 16px);
          }
          .${uid}-image { height: 240px; }
          .${uid}-image img {
            border-radius: 0 0 var(--radius-md, 16px) var(--radius-md, 16px);
          }
          .${uid}-item:first-child {
            border-radius: var(--radius-md, 16px) var(--radius-md, 16px) 0 0;
          }
          .${uid}-item:last-child { border-radius: 0; }
          .${uid}-item-right { gap: 8px; }
        }
      `}</style>

      <section className={`${uid}-section`}>
        <div className={`${uid}-container`}>
          <div className={`${uid}-header`}>
            <h2 className={`${uid}-title`}>{title}</h2>
            <span className={`${uid}-subtitle`}>{subtitle}</span>
          </div>

          <div className={`${uid}-layout`}>
            <div className={`${uid}-list`}>
              {news.map((item, i) => (
                <a key={i} href={item.href ?? "#"} className={`${uid}-item`}>
                  <div className={`${uid}-item-body`}>
                    <div className={`${uid}-item-title`}>{item.title}</div>
                    {item.excerpt && (
                      <div className={`${uid}-item-excerpt`}>{item.excerpt}</div>
                    )}
                  </div>
                  <div className={`${uid}-item-right`}>
                    <div className={`${uid}-item-date`}>
                      {item.date.split(".").slice(0, 2).join(".")}<br />
                      {item.date.split(".").slice(2).join(".")}
                    </div>
                    <div className={`${uid}-item-arrow`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className={`${uid}-image`}>
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
