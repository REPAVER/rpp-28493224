"use client";

import { useState } from "react";
import type { MockSiteConfig } from "@/types/mock";
import { COMPONENT_REGISTRY } from "./registry";

interface Props {
  config: MockSiteConfig;
  editable?: boolean;
  onConfigChange?: (config: MockSiteConfig) => void;
  headerRightOffset?: number;
}

export function MockSiteRenderer({ config, headerRightOffset }: Props) {
  const { components, colors, content } = config;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hasHeader = components.some(id => id.startsWith("header-"));

  // モバイルメニューのIDを特定（configに含まれていなければデフォルト）
  const mobileMenuId = components.find(id => id.startsWith("mobile-menu-"))
    ?? (hasHeader ? "mobile-menu-slide" : null);

  const cssVars = {
    "--color-primary": colors.primary,
    "--color-primary-light": colors.primary_light,
    "--color-accent": colors.accent,
    "--color-bg": colors.bg,
    "--color-surface": colors.surface,
    "--color-text": colors.text,
    "--color-text-muted": colors.text_muted,
    "--color-border": colors.border,
    "--space-xs": "8px",
    "--space-sm": "16px",
    "--space-md": "32px",
    "--space-lg": "clamp(48px, 6vw, 80px)",
    "--radius-sm": "8px",
    "--radius-md": "16px",
    "--radius-lg": "24px",
    "--shadow-sm": "0 1px 3px rgba(0,0,0,0.08)",
    "--shadow-md": "0 4px 12px rgba(0,0,0,0.1)",
    "--shadow-lg": "0 8px 30px rgba(0,0,0,0.12)",
    "--shadow-hover": "0 12px 40px rgba(0,0,0,0.15)",
    "--transition": "0.3s ease",
    "--max-width": "1200px",
  } as React.CSSProperties;

  return (
    <div style={{ ...cssVars, fontFamily: "'Noto Sans JP', sans-serif", background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      {components.map((id, i) => {
        // モバイルメニューは通常セクションとして描画しない（末尾で別途描画）
        if (id.startsWith("mobile-menu-")) return null;
        const entry = COMPONENT_REGISTRY[id];
        if (!entry) return null;
        const Comp = entry.component;
        const props = entry.mapProps(content, {
          onMenuOpen: () => setMobileMenuOpen(true),
          rightOffset: headerRightOffset,
        });
        return (
          <div key={`${id}-${i}`} id={`section-${i}`}>
            <Comp {...props} />
          </div>
        );
      })}
      {mobileMenuId && (() => {
        const entry = COMPONENT_REGISTRY[mobileMenuId];
        if (!entry) return null;
        const Comp = entry.component;
        return (
          <Comp
            nav={content.nav}
            ctaText={content.cta_text}
            ctaUrl={content.cta_url}
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
        );
      })()}
    </div>
  );
}
