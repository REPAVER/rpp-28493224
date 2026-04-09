import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POPOPN | フレンチレストラン",
  description: "ppopoppopp",
  openGraph: { images: ["https://assets.re-paver.com/28493224-f230-4987-9f5a-f49655271c0b/1775740431534-ogp.webp"] },
  icons: { icon: "https://assets.re-paver.com/28493224-f230-4987-9f5a-f49655271c0b/1775739957691-favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
