"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { MockSiteContent } from "@/types/mock";

// ---------- 型定義 ----------

export type SectionType =
  | "header" | "hero" | "features" | "gallery" | "testimonials"
  | "pricing" | "products" | "news" | "staff" | "concept"
  | "access" | "contact" | "cta" | "footer" | "mobile";

export interface ComponentEntry {
  /** セクションタイプ */
  type: SectionType;
  /** 日本語名 */
  name: string;
  /** 遅延ロードされたコンポーネント */
  component: ComponentType<Record<string, unknown>>;
  /** MockSiteContent → コンポーネントpropsへのマッピング */
  mapProps: (content: MockSiteContent, extra: { onMenuOpen?: () => void; rightOffset?: number }) => Record<string, unknown>;
}

// ---------- ヘルパー ----------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function load(importFn: () => Promise<any>, exportName: string) {
  return dynamic(() => importFn().then(m => ({ default: m[exportName] })));
}

// ---------- レジストリ ----------

export const COMPONENT_REGISTRY: Record<string, ComponentEntry> = {
  // --- Header ---
  "header-transparent-fixed": {
    type: "header", name: "透過固定",
    component: load(() => import("./headers/transparent-fixed"), "HeaderTransparentFixed"),
    mapProps: (c, { onMenuOpen, rightOffset }) => ({ logo: c.logo, nav: c.nav, ctaText: c.cta_text, ctaUrl: c.cta_url, onMenuOpen, rightOffset }),
  },
  "header-solid-minimal": {
    type: "header", name: "ソリッドミニマル",
    component: load(() => import("./headers/solid-minimal"), "HeaderSolidMinimal"),
    mapProps: (c, { onMenuOpen, rightOffset }) => ({ logo: c.logo, nav: c.nav, onMenuOpen, rightOffset }),
  },
  "header-bold-cta": {
    type: "header", name: "CTA付き",
    component: load(() => import("./headers/bold-cta"), "HeaderBoldCta"),
    mapProps: (c, { onMenuOpen, rightOffset }) => ({ logo: c.logo, nav: c.nav, ctaText: c.cta_text, ctaUrl: c.cta_url, tel: c.tel, onMenuOpen, rightOffset }),
  },

  // --- Hero ---
  "hero-fullscreen-overlay": {
    type: "hero", name: "全画面オーバーレイ",
    component: load(() => import("./heroes/fullscreen-overlay"), "HeroFullscreenOverlay"),
    mapProps: (c) => ({ title: c.hero_title, subtitle: c.hero_subtitle, image: c.hero_image, ctaText: c.hero_cta_text, ctaUrl: c.cta_url }),
  },
  "hero-split": {
    type: "hero", name: "左右分割",
    component: load(() => import("./heroes/split"), "HeroSplit"),
    mapProps: (c) => ({ title: c.hero_title, subtitle: c.hero_subtitle, badge: c.hero_badge, image: c.hero_image, imageAlt: c.hero_image_alt, ctaText: c.hero_cta_text, ctaUrl: c.cta_url, ctaSecondary: c.hero_cta_secondary }),
  },
  "hero-gradient-bold": {
    type: "hero", name: "グラデーション",
    component: load(() => import("./heroes/gradient-bold"), "HeroGradientBold"),
    mapProps: (c) => ({ title: c.hero_title, subtitle: c.hero_subtitle, ctaText: c.hero_cta_text, ctaUrl: c.cta_url }),
  },
  "hero-minimal-text": {
    type: "hero", name: "ミニマルテキスト",
    component: load(() => import("./heroes/minimal-text"), "HeroMinimalText"),
    mapProps: (c) => ({ title: c.hero_title, subtitle: c.hero_subtitle, eyebrow: c.hero_eyebrow, ctaText: c.hero_cta_text, ctaUrl: c.cta_url }),
  },

  // --- Features ---
  "features-card-grid": {
    type: "features", name: "カードグリッド",
    component: load(() => import("./features/card-grid"), "FeaturesCardGrid"),
    mapProps: (c) => ({ title: c.features_title ?? "サービス", subtitle: c.features_subtitle, features: c.features ?? [] }),
  },
  "features-alternating": {
    type: "features", name: "画像交互",
    component: load(() => import("./features/alternating"), "FeaturesAlternating"),
    mapProps: (c) => ({ title: c.features_title ?? "サービス", subtitle: c.features_subtitle, features: c.features ?? [] }),
  },
  "features-icon-list": {
    type: "features", name: "アイコンリスト",
    component: load(() => import("./features/icon-list"), "FeaturesIconList"),
    mapProps: (c) => ({ title: c.features_title ?? "サービス", subtitle: c.features_subtitle, features: c.features ?? [] }),
  },

  // --- Gallery ---
  "gallery-masonry": {
    type: "gallery", name: "マソンリー",
    component: load(() => import("./gallery/masonry"), "GalleryMasonry"),
    mapProps: (c) => ({ title: c.gallery_title ?? "ギャラリー", items: c.gallery_items ?? [] }),
  },
  "gallery-slider": {
    type: "gallery", name: "スライダー",
    component: load(() => import("./gallery/slider"), "GallerySlider"),
    mapProps: (c) => ({ title: c.gallery_title ?? "ギャラリー", items: c.gallery_items ?? [] }),
  },

  // --- Testimonials ---
  "testimonials-cards": {
    type: "testimonials", name: "カード",
    component: load(() => import("./testimonials/cards"), "TestimonialCards"),
    mapProps: (c) => ({ title: c.testimonials_title ?? "お客様の声", subtitle: c.testimonials_subtitle, testimonials: c.testimonials ?? [] }),
  },
  "testimonials-single-quote": {
    type: "testimonials", name: "大きな引用",
    component: load(() => import("./testimonials/single-quote"), "TestimonialSingleQuote"),
    mapProps: (c) => ({ text: c.testimonials?.[0]?.text ?? "", author: c.testimonials?.[0]?.author ?? "", role: c.testimonials?.[0]?.role }),
  },

  // --- Pricing ---
  "pricing-table-style": {
    type: "pricing", name: "テーブル",
    component: load(() => import("./pricing/table-style"), "PricingTableStyle"),
    mapProps: (c) => ({ title: c.pricing_title ?? "料金表", subtitle: c.pricing_subtitle, categories: c.pricing_categories ?? [] }),
  },
  "pricing-card-style": {
    type: "pricing", name: "カード",
    component: load(() => import("./pricing/card-style"), "PricingCardStyle"),
    mapProps: (c) => ({ title: c.pricing_title ?? "料金プラン", subtitle: c.pricing_subtitle, plans: c.pricing_plans ?? [] }),
  },

  // --- Products ---
  "products-product-grid": {
    type: "products", name: "グリッド",
    component: load(() => import("./products/product-grid"), "ProductGrid"),
    mapProps: (c) => ({ title: c.products_title ?? "商品一覧", subtitle: c.products_subtitle, products: c.products ?? [] }),
  },
  "products-product-featured": {
    type: "products", name: "フィーチャー",
    component: load(() => import("./products/product-featured"), "ProductFeatured"),
    mapProps: (c) => ({ title: c.products_title ?? "商品一覧", subtitle: c.products_subtitle, products: c.products ?? [] }),
  },

  // --- News ---
  "news-card-grid": {
    type: "news", name: "カードグリッド",
    component: load(() => import("./news/card-grid"), "NewsCardGrid"),
    mapProps: (c) => ({ title: c.news_title ?? "お知らせ", subtitle: c.news_subtitle, articles: c.news_articles ?? [] }),
  },
  "news-list-style": {
    type: "news", name: "リスト",
    component: load(() => import("./news/list-style"), "NewsListStyle"),
    mapProps: (c) => ({ title: c.news_title ?? "お知らせ", subtitle: c.news_subtitle, articles: c.news_articles ?? [] }),
  },

  // --- Staff ---
  "staff-grid-cards": {
    type: "staff", name: "グリッド",
    component: load(() => import("./staff/grid-cards"), "StaffGridCards"),
    mapProps: (c) => ({ title: c.staff_title ?? "スタッフ紹介", subtitle: c.staff_subtitle, staff: c.staff ?? [] }),
  },
  "staff-horizontal": {
    type: "staff", name: "横並び",
    component: load(() => import("./staff/horizontal"), "StaffHorizontal"),
    mapProps: (c) => ({ title: c.staff_title ?? "スタッフ紹介", subtitle: c.staff_subtitle, staff: c.staff ?? [] }),
  },

  // --- Concept ---
  "concept-image-text": {
    type: "concept", name: "画像+テキスト",
    component: load(() => import("./concept/image-text"), "ConceptImageText"),
    mapProps: (c) => ({ title: c.concept_title ?? "私たちの想い", text: c.concept_text ?? "", image: c.concept_image, imagePosition: c.concept_image_position }),
  },
  "concept-fullwidth": {
    type: "concept", name: "全幅背景",
    component: load(() => import("./concept/fullwidth"), "ConceptFullwidth"),
    mapProps: (c) => ({ title: c.concept_title ?? "私たちの想い", text: c.concept_text ?? "", backgroundImage: c.concept_bg_image }),
  },

  // --- Access ---
  "access-map-with-info": {
    type: "access", name: "地図+情報",
    component: load(() => import("./access/map-with-info"), "AccessMapWithInfo"),
    mapProps: (c) => ({ title: c.access_title ?? "アクセス", mapAddress: c.map_address, address: c.address, phone: c.phone, businessHours: c.business_hours, shopName: c.access_shop_name }),
  },
  "access-map-fullwidth": {
    type: "access", name: "全幅マップ",
    component: load(() => import("./access/map-fullwidth"), "AccessMapFullwidth"),
    mapProps: (c) => ({ title: c.access_title ?? "アクセス", mapAddress: c.map_address, address: c.address, phone: c.phone, businessHours: c.business_hours, shopName: c.access_shop_name }),
  },

  // --- Contact ---
  "contact-form-simple": {
    type: "contact", name: "シンプル",
    component: load(() => import("./contact/form-simple"), "ContactFormSimple"),
    mapProps: (c) => ({ title: c.contact_title ?? "お問い合わせ", subtitle: c.contact_subtitle, submitText: c.contact_submit, fields: c.contact_fields }),
  },
  "contact-form-with-info": {
    type: "contact", name: "情報付き",
    component: load(() => import("./contact/form-with-info"), "ContactFormWithInfo"),
    mapProps: (c) => ({ title: c.contact_title ?? "お問い合わせ", subtitle: c.contact_subtitle, submitText: c.contact_submit, fields: c.contact_fields, phone: c.phone, address: c.address }),
  },

  // --- CTA ---
  "cta-banner-gradient": {
    type: "cta", name: "グラデーションバナー",
    component: load(() => import("./cta/banner-gradient"), "CtaBannerGradient"),
    mapProps: (c) => ({ title: c.cta_section_title ?? "", text: c.cta_section_text, buttonText: c.cta_section_button ?? c.hero_cta_text, buttonUrl: c.cta_url }),
  },
  "cta-card-centered": {
    type: "cta", name: "中央カード",
    component: load(() => import("./cta/card-centered"), "CtaCardCentered"),
    mapProps: (c) => ({ title: c.cta_section_title ?? "", text: c.cta_section_text, buttonText: c.cta_section_button ?? c.hero_cta_text, buttonUrl: c.cta_url }),
  },

  // --- Footer ---
  "footer-multi-column": {
    type: "footer", name: "マルチカラム",
    component: load(() => import("./footers/multi-column"), "FooterMultiColumn"),
    mapProps: (c) => ({ logo: c.logo, description: c.footer_desc, columns: c.footer_columns, copyright: c.footer_copyright, sns: c.sns }),
  },
  "footer-simple-centered": {
    type: "footer", name: "シンプル",
    component: load(() => import("./footers/simple-centered"), "FooterSimpleCentered"),
    mapProps: (c) => ({ logo: c.logo, nav: c.nav, copyright: c.footer_copyright, sns: c.sns }),
  },

  // --- オーガニック/EC系（gokokumai参考） ---
  "header-organic": {
    type: "header", name: "オーガニックEC",
    component: load(() => import("./headers/organic"), "HeaderOrganic"),
    mapProps: (c, { onMenuOpen }) => ({ logoText: c.logo, phone: c.tel, navItems: c.nav?.map(label => ({ label })), onMenuOpen }),
  },
  "hero-category-carousel": {
    type: "hero", name: "カテゴリーカルーセル",
    component: load(() => import("./heroes/category-carousel"), "HeroCategoryCarousel"),
    mapProps: (c) => ({ title: c.hero_title, categories: c.gallery_items?.map(g => ({ label: g.caption ?? "", image: g.image })) }),
  },
  "concept-fullimage": {
    type: "concept", name: "フルイメージ縦書き",
    component: load(() => import("./concept/fullimage"), "ConceptFullimage"),
    mapProps: (c) => ({ title: c.concept_title, subtitle: c.hero_eyebrow, description: c.concept_text, ctaText: c.cta_section_button, image: c.concept_bg_image }),
  },
  "products-sidebar-grid": {
    type: "products", name: "サイドバー付きグリッド",
    component: load(() => import("./products/sidebar-grid"), "ProductsSidebarGrid"),
    mapProps: (c) => ({ title: c.products_title ?? "おすすめ商品", products: c.products ?? [] }),
  },
  "testimonials-cards-review": {
    type: "testimonials", name: "レビューカード",
    component: load(() => import("./testimonials/cards-review"), "TestimonialsCardsReview"),
    mapProps: (c) => ({ title: c.testimonials_title ?? "お客様の声", reviews: c.testimonials?.map(t => ({ rating: t.stars ?? 5, text: t.text, author: t.author })) }),
  },
  "news-split": {
    type: "news", name: "左リスト+右画像",
    component: load(() => import("./news/split"), "NewsSplit"),
    mapProps: (c) => ({ title: c.news_title ?? "お知らせ", news: c.news_articles?.map(a => ({ title: a.title, date: a.date, excerpt: a.excerpt })), image: c.concept_image }),
  },
  "footer-organic": {
    type: "footer", name: "5カラムフッター",
    component: load(() => import("./footers/organic"), "FooterOrganic"),
    mapProps: (c) => ({ logoText: c.logo, address: c.address, phone: c.tel, copyright: c.footer_copyright, columns: c.footer_columns?.map(col => ({ heading: col.heading, links: col.links.map(l => ({ label: l.text, href: l.href })) })) }),
  },

  // --- Mobile Menu ---
  "mobile-menu-slide": {
    type: "mobile", name: "スライドイン",
    component: load(() => import("./mobile-menu-slide"), "MobileMenuSlide"),
    mapProps: (c, { onMenuOpen }) => ({ nav: c.nav, ctaText: c.cta_text, ctaUrl: c.cta_url, isOpen: false, onClose: onMenuOpen ?? (() => {}) }),
  },
  "mobile-menu-fullscreen": {
    type: "mobile", name: "フルスクリーン",
    component: load(() => import("./mobile-menu-fullscreen"), "MobileMenuFullscreen"),
    mapProps: (c, { onMenuOpen }) => ({ nav: c.nav, ctaText: c.cta_text, ctaUrl: c.cta_url, isOpen: false, onClose: onMenuOpen ?? (() => {}) }),
  },
};

// ---------- ユーティリティ ----------

const SECTION_LABELS: Record<string, string> = {
  header: "ヘッダー", hero: "ヒーロー", features: "サービス",
  gallery: "ギャラリー", testimonials: "お客様の声", pricing: "料金表",
  products: "商品", news: "お知らせ", staff: "スタッフ",
  concept: "コンセプト", access: "アクセス", contact: "お問い合わせ",
  cta: "CTA", footer: "フッター", mobile: "モバイルメニュー",
};

/** コンポーネントIDからセクションタイプを取得 */
export function getSectionType(id: string): SectionType {
  return COMPONENT_REGISTRY[id]?.type ?? (id.split("-")[0] as SectionType);
}

/** セクションタイプの日本語ラベル */
export function getSectionLabel(type: string): string {
  return SECTION_LABELS[type] ?? type;
}

/** 同タイプの代替コンポーネント一覧 */
export function getAlternatives(componentId: string): Array<{ id: string; name: string }> {
  const type = getSectionType(componentId);
  return Object.entries(COMPONENT_REGISTRY)
    .filter(([, entry]) => entry.type === type)
    .map(([id, entry]) => ({ id, name: entry.name }));
}
