import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://new-tattoos-by-jake-llewellyn-dd8a8a.duckbyte.co/sitemap.xml",
  };
}
