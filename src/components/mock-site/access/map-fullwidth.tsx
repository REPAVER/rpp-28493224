"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  mapAddress?: string;
  address?: string;
  phone?: string;
  businessHours?: string;
  shopName?: string;
};

export function AccessMapFullwidth({
  title,
  mapAddress,
  address,
  phone,
  businessHours,
  shopName,
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

  const mapQuery = encodeURIComponent(mapAddress || address || "");
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;

  const infoItems: Array<{
    label: string;
    value: string | undefined;
    icon: string;
  }> = [
    { label: "住所", value: address, icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" },
    { label: "電話番号", value: phone, icon: "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" },
    { label: "営業時間", value: businessHours, icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" },
  ];

  const filteredItems = infoItems.filter((item) => item.value);

  return (
    <>
      <style>{`
        .amf-wrapper {
          position: relative;
        }
        .amf-card {
          position: absolute;
          top: 50%;
          left: clamp(16px, 4vw, 40px);
          transform: translateY(-50%);
          z-index: 10;
          max-width: 380px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .amf-card {
            position: static !important;
            transform: none !important;
            max-width: 100% !important;
            margin-top: 0;
          }
        }
      `}</style>
      <section
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            textAlign: "center",
            padding: "var(--space-lg) clamp(16px, 4vw, 40px) 24px",
          }}
        >
          {title}
        </h2>
        <div className="amf-wrapper">
          <div style={{ position: "relative", width: "100%", height: 500 }}>
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: "block",
                filter: "saturate(0.7)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            />
          </div>
          <div
            className="amf-card"
            style={{
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-lg)",
              padding: "clamp(24px, 3vw, 36px)",
            }}
          >
            {shopName && (
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: "2px solid var(--color-primary)",
                }}
              >
                {shopName}
              </h3>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {filteredItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      minWidth: 36,
                      borderRadius: "50%",
                      background: "var(--color-primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="var(--color-primary)"
                    >
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--color-text-muted)",
                        marginBottom: 1,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--color-text)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
