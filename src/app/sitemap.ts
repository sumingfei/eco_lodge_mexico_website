import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { models } from "@/data/models";
import { encodedHref, hreflang, locales, type RouteKey } from "@/i18n";

const base = siteConfig.url;

function alternates(route: RouteKey, rest = "") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[hreflang[l]] = `${base}${encodedHref(l, route, rest)}`;
  languages["x-default"] = `${base}${encodedHref("es", route, rest)}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { route: RouteKey; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { route: "home", priority: 1, changeFrequency: "weekly" },
    { route: "models", priority: 0.9, changeFrequency: "weekly" },
    { route: "estimator", priority: 0.9, changeFrequency: "monthly" },
    { route: "process", priority: 0.8, changeFrequency: "monthly" },
    { route: "sustainability", priority: 0.7, changeFrequency: "monthly" },
    { route: "design", priority: 0.7, changeFrequency: "monthly" },
    { route: "developers", priority: 0.7, changeFrequency: "monthly" },
    { route: "projects", priority: 0.6, changeFrequency: "monthly" },
    { route: "faq", priority: 0.6, changeFrequency: "monthly" },
    { route: "contact", priority: 0.5, changeFrequency: "yearly" },
    { route: "privacy", priority: 0.2, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const r of staticRoutes) {
      entries.push({ url: `${base}${encodedHref(locale, r.route)}`, lastModified, changeFrequency: r.changeFrequency, priority: r.priority, alternates: alternates(r.route) });
    }
    for (const m of models) {
      entries.push({
        url: `${base}${encodedHref(locale, "models", `/${m.slug}`)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        images: m.images.map((i) => `${base}${i.src}`),
        alternates: alternates("models", `/${m.slug}`),
      });
    }
  }
  return entries;
}
