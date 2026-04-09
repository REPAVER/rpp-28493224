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

export function AccessMapWithInfo({
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

  return (
    <>
      <style>{`
        .amwi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: start;
        }
        @media (max-width: 768px) {
          .amwi-grid {
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
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            {title}
          </h2>
          <div className="amwi-grid">
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <iframe
                src={mapSrc}
                width="100%"
                height="400"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </div>
            <div style={{ padding: "8px 0" }}>
              {shopName && (
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: 16,
                  }}
                >
                  {shopName}
                </h3>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {infoItems
                  .filter((item) => item.value)
                  .map((item, i) => (
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
                          width: 44,
                          height: 44,
                          minWidth: 44,
                          borderRadius: "50%",
                          background: "var(--color-primary-light)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
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
                            marginBottom: 2,
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
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
