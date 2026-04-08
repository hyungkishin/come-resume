import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/shared/ui/toast/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foliofy — AI 포트폴리오 빌더 & 이력서 폴리셔",
  description:
    "GitHub 연동하면 포트폴리오 사이트 자동 생성, 이력서 넣으면 AI가 깔끔하게 다듬어줍니다.",
  keywords: ["포트폴리오", "이력서", "AI", "개발자", "portfolio", "resume"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}<ToastContainer /></body>
    </html>
  );
}
