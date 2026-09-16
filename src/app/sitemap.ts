import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { models } from "@/data/models";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/modelos", priority: 0.9, changeFrequency: "weekly" },
    { path: "/cotizador", priority: 0.9, changeFrequency: "monthly" },
    { path: "/como-funciona", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sustentabilidad", priority: 0.7, changeFrequency: "monthly" },
    { path: "/diseño", priority: 0.7, changeFrequency: "monthly" },
    { path: "/desarrolladores", priority: 0.7, changeFrequency: "monthly" },
    { path: "/proyectos", priority: 0.6, changeFrequency: "monthly" },
    { path: "/preguntas-frecuentes", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contacto", priority: 0.5, changeFrequency: "yearly" },
    { path: "/aviso-de-privacidad", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({ url: `${base}${encodeURI(r.path)}`, lastModified, changeFrequency: r.changeFrequency, priority: r.priority })),
    ...models.map((m) => ({
      url: `${base}/modelos/${m.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: m.images.map((i) => `${base}${i.src}`),
    })),
  ];
}
