import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kellyfashion.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kellyfashion.com/products",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://kellyfashion.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
