import type { MetadataRoute } from "next";
import { ORG } from "@/lib/site";

/** All public, indexable routes. Terrarium routes are intentionally excluded. */
const ROUTES = [
  "",
  "/the-case",
  "/science",
  "/where-are-the-snails",
  "/purple-without-death",
  "/about",
  "/take-action",
  "/newsletter",
  "/merch",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${ORG.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
