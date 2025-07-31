import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "COOL한자 | 한자카드 | 한대한검정회 어문회 | 한자능력검정시험",
  description:
    "대한검정회와 어문회 한자능력검정시험 대비 학습 카드입니다. 8급부터 준4급까지 급수별 한자를 재미있게 학습하고 시험에 완벽 대비하세요. 한자 뜻, 음, 예문, 사자성어까지 체계적으로 익힐 수 있습니다.",
  keywords:
    "대한검정회, 어문회, 한자능력검정시험, 한자카드, 한자학습, 한자급수, 8급, 7급, 6급, 준5급, 5급, 준4급, 한자게임, 한자공부, 한자시험, 한자검정, 사자성어",
  authors: [{ name: "한자능력검정시험 학습카드" }],
  creator: "한자능력검정시험 학습카드",
  publisher: "대한검정회 한자카드",
  robots: "index, follow",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "COOL한자 | 한자카드 | 한대한검정회 어문회 | 한자능력검정시험",
    description:
      "대한검정회와 어문회 한자능력검정시험 대비 학습 카드입니다. 8급부터 준4급까지 급수별 한자를 체계적으로 학습하세요.",
    siteName: "한자능력검정시험 학습카드",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "대한검정회 한자카드 학습 게임",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "COOL한자 | 한자카드 | 한대한검정회 어문회 | 한자능력검정시험",
    description:
      "대한검정회와 어문회 한자능력검정시험 대비 학습 카드입니다. 8급부터 준4급까지 급수별 한자를 체계적으로 학습하세요.",
    images: ["/og-image.png"],
  },

  // 네이버 웹마스터도구, 구글 서치콘솔 인증 (실제 사용시 값 변경 필요)
  verification: {
    google: "google-site-verification-code",
    other: {
      "naver-site-verification": "naver-site-verification-code",
    },
  },

  // 파비콘 설정
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/favicon.ico", sizes: "180x180", type: "image/x-icon" }],
  },

  // 추가 메타태그
  other: {
    "theme-color": "#667eea",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
