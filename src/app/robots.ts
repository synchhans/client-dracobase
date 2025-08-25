import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/master", "/dosen", "/pengamat", "/workspace"],
    },
    sitemap: "https://dracobase.my.id/sitemap.xml",
    host: "https://dracobase.my.id",
  };
}
