import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "esjaythegreat",
  description: "대한민국 서울의 싱어송라이터",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
