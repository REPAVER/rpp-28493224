"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MockContactField } from "@/types/mock";

type Props = {
  title: string;
  subtitle?: string;
  submitText?: string;
  fields?: MockContactField[];
};

const DEFAULT_FIELDS: MockContactField[] = [
  { label: "お名前", type: "text", placeholder: "山田 太郎" },
  { label: "メールアドレス", type: "email", placeholder: "info@example.com" },
  { label: "電話番号", type: "tel", placeholder: "090-1234-5678" },
  { label: "お問い合わせ内容", type: "textarea", placeholder: "お気軽にご相談ください" },
];

export function ContactFormSimple({
  title,
  subtitle,
  submitText = "送信する",
  fields,
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
        .cfs-input:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px var(--color-primary-light) !important;
        }
        .cfs-submit {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cfs-submit:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }
      `}</style>
      <section
        ref={ref}
        style={{
          padding: "var(--space-lg) clamp(16px, 4vw, 40px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          style={{
            maxWidth: "var(--max-width)",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: subtitle ? 8 : 32,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--color-text-muted)",
                marginBottom: 32,
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: 640,
              margin: "0 auto",
              textAlign: "left",
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
                    className="cfs-input"
                    placeholder={field.placeholder}
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                ) : field.type === "select" ? (
                  <select className="cfs-input" style={inputStyle}>
                    <option value="">{field.placeholder || "選択してください"}</option>
                    {field.options?.map((opt, j) => (
                      <option key={j} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="cfs-input"
                    type={field.type}
                    placeholder={field.placeholder}
                    style={inputStyle}
                  />
                )}
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <button
                type="submit"
                className="cfs-submit"
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
      </section>
    </>
  );
}
