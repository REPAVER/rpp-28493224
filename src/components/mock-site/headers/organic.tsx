"use client";
import { useId, useState, type CSSProperties } from "react";

interface NavItem {
  label: string;
  href?: string;
}

interface HeaderOrganicProps {
  logoText?: string;
  logoSubText?: string;
  logoImage?: string;
  phone?: string;
  phoneNote?: string;
  searchPlaceholder?: string;
  topBarText?: string;
  topBarLinkText?: string;
  topBarLinkUrl?: string;
  navItems?: NavItem[];
  subNavItems?: Array<{ label: string; href?: string }>;
}

export function HeaderOrganic({
  logoText = "店舗名",
  logoSubText = "こだわりの商品を販売\n厳選商品のお取り寄せ",
  logoImage,
  phone = "0120-000-000",
  phoneNote = "平日9時〜18時",
  searchPlaceholder = "キーワードで検索",
  topBarText = "税込5,000円以上のご購入で",
  topBarLinkText = "送料無料",
  topBarLinkUrl = "#",
  navItems = [
    { label: "おすすめ", href: "#" },
    { label: "商品カテゴリ", href: "#" },
    { label: "ピックアップ", href: "#" },
    { label: "特集", href: "#" },
    { label: "読みもの", href: "#" },
    { label: "お店について", href: "#" },
  ],
  subNavItems = [
    { label: "メルマガ登録", href: "#" },
    { label: "カタログ請求", href: "#" },
    { label: "ご案内・サポート", href: "#" },
  ],
}: HeaderOrganicProps) {
  const uid = `ho${useId().replace(/[^a-z0-9]/gi, "")}`;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        .${uid}-topbar {
          display: flex; align-items: center; justify-content: center;
          background: var(--color-primary, #8b7355); color: #fff;
          font-size: 0.85rem; padding: 8px 16px; gap: 4px;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .${uid}-topbar a { color: #fff; text-decoration: underline; }
        .${uid}-mid {
          display: flex; align-items: center; gap: 24px;
          max-width: var(--max-width, 1200px); margin: 0 auto;
          padding: 12px clamp(16px, 4vw, 40px);
          font-family: 'Noto Sans JP', sans-serif;
          box-sizing: border-box;
        }
        .${uid}-logo-area {
          display: flex; align-items: center; gap: 16px; flex-shrink: 0;
        }
        .${uid}-logo-sub {
          font-size: 0.7rem; color: var(--color-text-muted, #888);
          white-space: pre-line; line-height: 1.5;
        }
        .${uid}-logo-name {
          font-size: 1.4rem; font-weight: 900;
          color: var(--color-text, #333);
        }
        .${uid}-phone {
          display: flex; align-items: center; gap: 8px; flex-shrink: 0;
        }
        .${uid}-phone-number {
          font-size: 1.5rem; font-weight: 700;
          color: var(--color-text, #333); letter-spacing: 0.02em;
        }
        .${uid}-phone-note {
          font-size: 0.75rem; color: var(--color-text-muted, #888);
        }
        .${uid}-search {
          flex: 1; display: flex; align-items: center;
          border: 1px solid var(--color-border, #ddd);
          border-radius: var(--radius-sm, 8px);
          padding: 8px 12px; gap: 8px;
          background: var(--color-surface, #fff);
          min-width: 0;
        }
        .${uid}-search input {
          flex: 1; border: none; outline: none; font-size: 0.9rem;
          background: transparent; color: var(--color-text, #333);
          font-family: 'Noto Sans JP', sans-serif;
          min-width: 0;
        }
        .${uid}-search input::placeholder { color: var(--color-text-muted, #aaa); }
        .${uid}-icons {
          display: flex; align-items: center; gap: 20px; flex-shrink: 0;
        }
        .${uid}-icon-btn {
          display: flex; flex-direction: column; align-items: center;
          gap: 2px; font-size: 0.7rem; color: var(--color-text-muted, #888);
          text-decoration: none; background: none; border: none; cursor: pointer;
        }
        .${uid}-icon-btn svg { width: 22px; height: 22px; }
        .${uid}-nav-wrap {
          border-top: 1px solid var(--color-border, #eee);
          border-bottom: 1px solid var(--color-border, #eee);
        }
        .${uid}-nav {
          display: flex; align-items: center; justify-content: space-between;
          max-width: var(--max-width, 1200px); margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 40px);
          font-family: 'Noto Sans JP', sans-serif;
          box-sizing: border-box;
        }
        .${uid}-nav-main { display: flex; gap: 0; flex-wrap: wrap; }
        .${uid}-nav-main a {
          display: block; padding: 14px 20px;
          font-size: 0.9rem; font-weight: 600;
          color: var(--color-text, #333); text-decoration: none;
          transition: background var(--transition, 0.3s ease);
          white-space: nowrap;
        }
        .${uid}-nav-main a:hover { background: var(--color-primary-light, #f5f0ea); }
        .${uid}-nav-sub { display: flex; gap: 0; }
        .${uid}-nav-sub a {
          display: block; padding: 14px 16px;
          font-size: 0.8rem; color: var(--color-text-muted, #888);
          text-decoration: none; white-space: nowrap;
        }
        .${uid}-burger {
          display: none; background: none; border: none; cursor: pointer;
          width: 32px; height: 32px; position: relative;
        }
        .${uid}-burger span {
          display: block; width: 24px; height: 2px;
          background: var(--color-text, #333);
          position: absolute; left: 4px; transition: var(--transition, 0.3s ease);
        }
        .${uid}-burger span:nth-child(1) { top: 8px; }
        .${uid}-burger span:nth-child(2) { top: 15px; }
        .${uid}-burger span:nth-child(3) { top: 22px; }
        @media (max-width: 768px) {
          .${uid}-mid { flex-wrap: wrap; gap: 12px; }
          .${uid}-phone { display: none; }
          .${uid}-icons { gap: 12px; }
          .${uid}-nav-wrap { display: none; }
          .${uid}-burger { display: block; }
          .${uid}-search { order: 10; width: 100%; }
        }
      `}</style>

      {/* Top Bar */}
      <div className={`${uid}-topbar`}>
        <span>{topBarText}</span>
        <a href={topBarLinkUrl}>{topBarLinkText}</a>
        <span>詳細はこちら</span>
      </div>

      {/* Middle: Logo + Phone + Search + Icons */}
      <div className={`${uid}-mid`}>
        <div className={`${uid}-logo-area`}>
          <div>
            <div className={`${uid}-logo-sub`}>{logoSubText}</div>
            {logoImage ? (
              <img src={logoImage} alt={logoText} style={{ height: 56 }} />
            ) : (
              <div className={`${uid}-logo-name`}>{logoText}</div>
            )}
          </div>
        </div>

        <div className={`${uid}-phone`}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.74-1.25a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0122 16.92z"/>
          </svg>
          <div>
            <div className={`${uid}-phone-number`}>{phone}</div>
            <div className={`${uid}-phone-note`}>{phoneNote}</div>
          </div>
        </div>

        <div className={`${uid}-search`}>
          <input type="text" placeholder={searchPlaceholder} />
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted, #888)" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>

        <div className={`${uid}-icons`}>
          <button className={`${uid}-icon-btn`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            <span>お気に入り</span>
          </button>
          <button className={`${uid}-icon-btn`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>ログイン</span>
          </button>
          <button className={`${uid}-icon-btn`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            <span>カート</span>
          </button>
          <button className={`${uid}-burger`} onClick={() => setMobileOpen(!mobileOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className={`${uid}-nav-wrap`}>
        <nav className={`${uid}-nav`}>
          <div className={`${uid}-nav-main`}>
            {navItems.map((item, i) => (
              <a key={i} href={item.href ?? "#"}>{item.label}</a>
            ))}
          </div>
          <div className={`${uid}-nav-sub`}>
            {subNavItems.map((item, i) => (
              <a key={i} href={item.href ?? "#"}>{item.label}</a>
            ))}
          </div>
        </nav>
      </div>

    </>
  );
}
