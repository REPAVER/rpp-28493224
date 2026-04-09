"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MockContactField } from "@/types/mock";

type Props = {
  title: string;
  subtitle?: string;
  submitText?: string;
  fields?: MockContactField[];
  phone?: string;
  address?: string;
};

const DEFAULT_FIELDS: MockContactField[] = [
  { label: "お名前", type: "text", placeholder: "山田 太郎" },
  { label: "メールアドレス", type: "email", placeholder: "info@example.com" },
  { label: "電話番号", type: "tel", placeholder: "090-1234-5678" },
  { label: "お問い合わせ内容", type: "textarea", placeholder: "お気軽にご相談ください" },
];

const INFO_ITEMS = [
  {
    key: "phone" as const,
    label: "お電話",
    icon: "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z",
  },
  {
    key: "email" as const,
    label: "メール",
    icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  },
  {
    key: "address" as const,
    label: "所在地",
    icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z",
  },
];

export function ContactFormWithInfo({
  title,
  subtitle,
  submitText = "送信する",
  fields,
  phone,
  address,
}: Props) {
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert("これはデモサイトのため、実際には送信されません。");
  }, []);

  const formFields = fields && fields.length > 0 ? fields : DEFAULT_FIELDS;
  const infoValues: Record<string, string | undefined> = {
    phone,
    email: undefined,
    address,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-bg)",
    color: "var(--color-text)",
    outline: "none",
    transition: "var(--transition)",
    boxSizing: "border-box",
  };

  return (
    <>
      <style>{`
        .cfwi-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: clamp(24px, 4vw, 48px);
          align-items: start;
        }
        .cfwi-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px var(--color-primary-light) !important;
        }
        .cfwi-submit {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cfwi-submit:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }
        @media (max-width: 768px) {
          .cfwi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <section
        ref={ref}
        style={{
          padding: "var(--space-lg) clamp(16px, 4vw, 40px)",
          background: "var(--color-surface)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          style={{
            maxWidth: "var(--max-width)",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: subtitle ? 8 : 0,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          <div className="cfwi-grid">
            <div
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                padding: "clamp(24px, 3vw, 36px)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {formFields.map((field, i) => (
                  <div key={i}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--color-text)",
                        marginBottom: 6,
                      }}
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        className="cfwi-input"
                        placeholder={field.placeholder}
                        rows={5}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    ) : field.type === "select" ? (
                      <select className="cfwi-input" style={inputStyle}>
                        <option value="">
                          {field.placeholder || "選択してください"}
                        </option>
                        {field.options?.map((opt, j) => (
                          <option key={j} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="cfwi-input"
                        type={field.type}
                        placeholder={field.placeholder}
                        style={inputStyle}
                      />
                    )}
                  </div>
                ))}
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <button
                    type="submit"
                    className="cfwi-submit"
                    style={{
                      background: "var(--color-primary)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 48px",
                      fontSize: "1rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {submitText}
                  </button>
                </div>
              </form>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {INFO_ITEMS.map((item) => {
                const value = infoValues[item.key];
                return (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      background: "#fff",
                      borderRadius: "var(--radius-lg)",
                      padding: "clamp(24px, 3vw, 36px)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        minWidth: 48,
                        borderRadius: "50%",
                        background: "var(--color-primary-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="var(--color-primary)"
                      >
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--color-text-muted)",
                          marginBottom: 4,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          color: "var(--color-text)",
                          lineHeight: 1.7,
                        }}
                      >
                        {value || "-"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
