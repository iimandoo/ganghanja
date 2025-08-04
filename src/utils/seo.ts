import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export function generateSEO(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://coolhanja.site";
  const defaultImage = `${baseUrl}/og-image.png`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    robots: "index, follow",
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url || baseUrl,
      siteName: "COOL한자 쿨한자 - 대한검정회 어문회 급수 한자",
      images: [
        {
          url: config.image || defaultImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: "ko_KR",
      type: config.type || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.image || defaultImage],
    },
  };
}

export function generateStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://coolhanja.site";

  return {
    "@context": "http://coolhanja.site",
    "@type": "WebApplication",
    name: "COOL한자 쿨한자 - 대한검정회 어문회 급수 한자",
    description: "대한검정회 한자능력검정시험을 위한 한자 학습 카드 게임",
    url: baseUrl,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    author: {
      "@type": "Organization",
      name: "한자능력검정시험 학습카드",
    },
    publisher: {
      "@type": "Organization",
      name: "대한검정회 어문회회",
    },
  };
}

export function generateBreadcrumbData(
  items: Array<{ name: string; url: string }>
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://coolhanja.site";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
