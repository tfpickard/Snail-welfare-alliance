import type { MetadataRoute } from "next";
import { ORG } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Game + API surfaces aren't useful to crawlers.
      disallow: ["/api/", "/terrarium/"],
    },
    sitemap: `${ORG.url}/sitemap.xml`,
  };
}
