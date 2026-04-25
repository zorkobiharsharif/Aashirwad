import type { MetadataRoute } from "next";

import { blogPostsSeed, categories, locationPages } from "@/lib/site-data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/contact", "/gallery", "/offers", "/blog", "/admin/login"];

  return [
    ...staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })),
    ...categories.map((category) => ({
      url: `${siteUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85
    })),
    ...locationPages.map((location) => ({
      url: `${siteUrl}/locations/${location.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.82
    })),
    ...blogPostsSeed.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
