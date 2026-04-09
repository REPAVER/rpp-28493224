"use client";
import { useId, type CSSProperties } from "react";

interface ConceptFullimageProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  image?: string;
}

export function ConceptFullimage({
  title = "私たちは\nお客様と\n産地を繋ぐ\nこだわりの\n専門店です",
  subtitle = "about our shop",
  description = "全国各地を巡って出会った選りすぐりの逸品を取り揃えています。四季折々の旬を味わっていただける商品は、安心・安全な国内産のみを厳選。ご家庭の食卓にも、贈り物としても、暮らしを豊かに彩る上質な商品をお届けしています。",
  ctaText = "私たちについて",
  ctaUrl = "#",
  image = "https://picsum.photos/1400/800?random=30",
}: ConceptFullimageProps) {
  const uid = `cfi${useId().replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <style>{`
        .${uid}-section {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          font-family: 'Noto Sans JP', sans-serif;
          overflow: hidden;
        }
        .${uid}-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .${uid}-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .${uid}-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.35) 0%,
            rgba(0,0,0,0.1) 40%,
            rgba(0,0,0,0.0) 60%
          );
        }
        .${uid}-content {
          position: relative;
          z-index: 1;
          max-width: var(--max-width, 1200px);
          margin: 0 auto;
          width: 100%;
          padding: clamp(60px, 10vw, 120px) clamp(16px, 4vw, 40px);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          box-sizing: border-box;
        }
        .${uid}-left {
          max-width: 480px;
          color: #fff;
        }
        .${uid}-desc {
          font-size: 0.95rem;
          line-height: 2;
          margin-bottom: 32px;
        }
        .${uid}-cta {
          display: inline-block;
          padding: 14px 32px;
          background: rgba(255,255,255,0.95);
          color: var(--color-text, #333);
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 999px;
          text-decoration: none;
          transition: background var(--transition, 0.3s ease);
        }
        .${uid}-cta:hover {
          background: #fff;
        }
        .${uid}-right {
          display: flex;
          align-items: flex-end;
          gap: 12px;
        }
        .${uid}-subtitle {
          writing-mode: vertical-rl;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
        }
        .${uid}-vertical-title {
          writing-mode: vertical-rl;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.08em;
          line-height: 1.6;
          white-space: pre-line;
        }
        @media (max-width: 768px) {
          .${uid}-section { min-height: 100vh; }
          .${uid}-content {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-end;
          }
          .${uid}-right {
            position: absolute;
            top: clamp(60px, 10vw, 120px);
            right: clamp(16px, 4vw, 40px);
          }
          .${uid}-vertical-title {
            font-size: clamp(1.4rem, 5vw, 2rem);
          }
        }
      `}</style>

      <section className={`${uid}-section`}>
        <div className={`${uid}-bg`}>
          <img src={image} alt="" />
        </div>
        <div className={`${uid}-content`}>
          <div className={`${uid}-left`}>
            <p className={`${uid}-desc`}>{description}</p>
            <a href={ctaUrl} className={`${uid}-cta`}>{ctaText}</a>
          </div>
          <div className={`${uid}-right`}>
            <span className={`${uid}-subtitle`}>{subtitle}</span>
            <div className={`${uid}-vertical-title`}>{title}</div>
          </div>
        </div>
      </section>
    </>
  );
}
