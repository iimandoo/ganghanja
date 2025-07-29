import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.coolhanja.site";

  // 기본 페이지들
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // 급수별 페이지 생성 (향후 개별 페이지 추가 시)
  const levels = ["8급", "7급", "6급", "준5급", "5급", "준4급"];
  const levelRoutes = levels.map((level) => ({
    url: `${baseUrl}?level=${encodeURIComponent(level)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...levelRoutes];
}
