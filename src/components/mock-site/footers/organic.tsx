"use client";
import { useId, type CSSProperties } from "react";

interface FooterColumn {
  heading: string;
  links: Array<{ label: string; href?: string }>;
}

interface FooterOrganicProps {
  columns?: FooterColumn[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterCtaText?: string;
  newsletterCtaUrl?: string;
  snsTitle?: string;
  snsDescription?: string;
  snsLinks?: Array<{ platform: "x" | "facebook" | "instagram"; href?: string }>;
  tagline?: string;
  logoText?: string;
  logoImage?: string;
  address?: string;
  phone?: string;
  phoneLabel?: string;
  hours?: string;
  fax?: string;
  email?: string;
  copyright?: string;
  legalLinks?: Array<{ label: string; href?: string }>;
}

export function FooterOrganic({
  columns = [
    {
      heading: "商品一覧",
      links: [
        { label: "カテゴリ一覧" },
        { label: "おすすめ" },
        { label: "カテゴリA" },
        { label: "カテゴリB" },
        { label: "カテゴリC" },
        { label: "カテゴリD" },
        { label: "お買い得セット" },
      ],
    },
    {
      heading: "お店について",
      links: [
        { label: "お店についてトップ" },
        { label: "私たちのこだわり" },
        { label: "会社情報" },
        { label: "採用情報" },
      ],
    },
    {
      heading: "読みもの・特集",
      links: [
        { label: "ピックアップ一覧" },
        { label: "読みもの一覧" },
        { label: "レシピ一覧" },
      ],
    },
    {
      heading: "ご案内・サポート",
      links: [
        { label: "お問い合わせ" },
        { label: "カタログ請求" },
        { label: "法人のお客様向け" },
        { label: "よくあるご質問" },
        { label: "ご利用ガイド" },
        { label: "実店舗のご案内" },
        { label: "取扱店一覧" },
      ],
    },
  ],
  newsletterTitle = "最新情報をお届け",
  newsletterDescription = "メールマガジン会員になると、新着商品や季節限定商品のご案内など、毎日の暮らしを楽しむ様々な情報をお届けします。",
  newsletterCtaText = "メルマガ会員登録へ",
  newsletterCtaUrl = "#",
  snsTitle = "公式SNS",
  snsDescription = "各SNSでも最新情報をお届けしています",
  snsLinks = [
    { platform: "x" },
    { platform: "facebook" },
    { platform: "instagram" },
  ],
  tagline = "お客様の笑顔のために。",
  logoText = "店舗名",
  logoImage,
  address = "〒100-0001 東京都千代田区1-1-1",
  phone = "0120-000-000",
  phoneLabel = "フリーダイヤル",
  hours = "受付時間 平日 9:00-18:00",
  fax = "FAX:03-0000-0000",
  email = "info@example.com",
  copyright = "© Sample Shop Inc. All rights reserved.",
  legalLinks = [
    { label: "特定商取引法に基づく表記" },
    { label: "プライバシーポリシー" },
  ],
}: FooterOrganicProps) {
  const uid = `fo${useId().replace(/[^a-z0-9]/gi, "")}`;

  const renderSnsIcon = (platform: string) => {
    switch (platform) {
      case "x":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case "facebook":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case "instagram":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        );
    }
  };

  return (
    <>
      <style>{`
        .${uid}-footer {
          background: var(--color-surface, #fff);
          font-family: 'Noto Sans JP', sans-serif;
          border-top: 1px solid var(--color-border, #eee);
        }
        .${uid}-container {
          max-width: var(--max-width, 1200px);
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 40px);
          box-sizing: border-box;
        }
        .${uid}-cols {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 32px;
          padding: 48px 0 40px;
        }
        .${uid}-col-heading {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text, #333);
          margin-bottom: 16px;
        }
        .${uid}-col-link {
          display: block;
          font-size: 0.8rem;
          color: var(--color-text-muted, #888);
          text-decoration: none;
          padding: 4px 0;
          line-height: 1.8;
          transition: color var(--transition, 0.3s ease);
        }
        .${uid}-col-link:hover {
          color: var(--color-text, #333);
        }
        .${uid}-newsletter-heading {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text, #333);
          margin-bottom: 4px;
        }
        .${uid}-newsletter-sub {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text, #333);
          margin-bottom: 12px;
        }
        .${uid}-newsletter-desc {
          font-size: 0.75rem;
          color: var(--color-text-muted, #888);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .${uid}-newsletter-cta {
          display: inline-block;
          padding: 10px 24px;
          background: var(--color-text, #333);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: 999px;
          text-decoration: none;
          transition: opacity var(--transition, 0.3s ease);
        }
        .${uid}-newsletter-cta:hover {
          opacity: 0.85;
        }
        .${uid}-newsletter-detail {
          display: inline-block;
          margin-left: 16px;
          font-size: 0.8rem;
          color: var(--color-text-muted, #888);
          text-decoration: none;
        }
        .${uid}-sns-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-text, #333);
          margin-top: 24px;
          margin-bottom: 4px;
        }
        .${uid}-sns-desc {
          font-size: 0.75rem;
          color: var(--color-text-muted, #888);
          margin-bottom: 12px;
        }
        .${uid}-sns-icons {
          display: flex;
          gap: 16px;
        }
        .${uid}-sns-icons a {
          color: var(--color-text, #333);
          text-decoration: none;
        }
        .${uid}-divider {
          border: none;
          border-top: 1px solid var(--color-border, #eee);
          margin: 0;
        }
        .${uid}-tagline-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
        }
        .${uid}-tagline {
          font-size: 0.9rem;
          color: var(--color-text, #333);
          font-weight: 500;
        }
        .${uid}-scroll-top {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--color-border, #ddd);
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: pointer;
          transition: box-shadow var(--transition, 0.3s ease);
        }
        .${uid}-scroll-top:hover {
          box-shadow: var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.1));
        }
        .${uid}-bottom {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px 0 40px;
          gap: 24px;
        }
        .${uid}-logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .${uid}-logo-text {
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--color-text, #333);
        }
        .${uid}-contact-info {
          text-align: right;
          font-size: 0.82rem;
          color: var(--color-text, #333);
          line-height: 1.7;
        }
        .${uid}-contact-info a {
          color: var(--color-text, #333);
          text-decoration: underline;
        }
        .${uid}-legal {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-top: 1px solid var(--color-border, #eee);
          font-size: 0.75rem;
          color: var(--color-text-muted, #888);
        }
        .${uid}-legal-links {
          display: flex;
          gap: 24px;
        }
        .${uid}-legal-links a {
          color: var(--color-text-muted, #888);
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .${uid}-cols {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .${uid}-bottom {
            flex-direction: column;
          }
          .${uid}-contact-info {
            text-align: left;
          }
          .${uid}-legal {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
        }
      `}</style>

      <footer className={`${uid}-footer`}>
        <div className={`${uid}-container`}>
          {/* Column Links */}
          <div className={`${uid}-cols`}>
            {columns.map((col, i) => (
              <div key={i}>
                <div className={`${uid}-col-heading`}>{col.heading}</div>
                {col.links.map((link, j) => (
                  <a key={j} href={link.href ?? "#"} className={`${uid}-col-link`}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}

            {/* Newsletter + SNS column */}
            <div>
              <div className={`${uid}-newsletter-heading`}>{newsletterTitle}</div>
              <div className={`${uid}-newsletter-sub`}>メールマガジン登録</div>
              <div className={`${uid}-newsletter-desc`}>{newsletterDescription}</div>
              <a href={newsletterCtaUrl} className={`${uid}-newsletter-cta`}>
                {newsletterCtaText}
              </a>
              <a href="#" className={`${uid}-newsletter-detail`}>詳しく見る →</a>

              <div className={`${uid}-sns-title`}>{snsTitle}</div>
              <div className={`${uid}-sns-desc`}>{snsDescription}</div>
              <div className={`${uid}-sns-icons`}>
                {snsLinks.map((sns, i) => (
                  <a key={i} href={sns.href ?? "#"}>
                    {renderSnsIcon(sns.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <hr className={`${uid}-divider`} />

          {/* Tagline + Scroll top */}
          <div className={`${uid}-tagline-row`}>
            <span className={`${uid}-tagline`}>{tagline}</span>
            <button
              className={`${uid}-scroll-top`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
            </button>
          </div>

          <hr className={`${uid}-divider`} />

          {/* Bottom: Logo + Contact */}
          <div className={`${uid}-bottom`}>
            <div className={`${uid}-logo-area`}>
              {logoImage ? (
                <img src={logoImage} alt={logoText} style={{ height: 48 }} />
              ) : (
                <span className={`${uid}-logo-text`}>{logoText}</span>
              )}
            </div>
            <div className={`${uid}-contact-info`}>
              <div>{address} <a href="#">地図</a></div>
              <div>{phoneLabel}：<a href={`tel:${phone.replace(/-/g, "")}`}>{phone}</a></div>
              <div>{hours}</div>
              <div>{fax}</div>
              <div>E-mail：<a href={`mailto:${email}`}>{email}</a></div>
            </div>
          </div>

          {/* Legal */}
          <div className={`${uid}-legal`}>
            <span>{copyright}</span>
            <div className={`${uid}-legal-links`}>
              {legalLinks.map((link, i) => (
                <a key={i} href={link.href ?? "#"}>{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
