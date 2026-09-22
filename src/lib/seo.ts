import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import type { HomeModel } from "@/data/models";
import { getModelStartingPrice } from "./pricing";
import { encodedHref, type RouteKey } from "@/i18n/routes";
import { fill, getDictionary, hreflang, htmlLang, locales, ogLocale, t, tl, type L, type Locale } from "@/i18n";

const DEFAULT_OG_IMAGE = "/images/hero/hero-courtyard.jpg"; // TODO: replace with a branded OG image (1200×630)

type PageMeta = {
  locale: Locale;
  route: RouteKey;
  /** Extra path after the route slug, e.g. "/casa-90". */
  rest?: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
};

/** hreflang alternates for a route (same `rest` in every locale). */
export function languageAlternates(route: RouteKey, rest = "") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[hreflang[l]] = encodedHref(l, route, rest);
  languages["x-default"] = encodedHref("es", route, rest);
  return languages;
}

/** Builds consistent metadata (canonical, hreflang, OpenGraph, Twitter) for a route. */
export function buildMetadata({ locale, route, rest = "", title, description, image = DEFAULT_OG_IMAGE, type = "website" }: PageMeta): Metadata {
  const path = encodedHref(locale, route, rest);
  return {
    title,
    description,
    alternates: { canonical: path, languages: languageAlternates(route, rest) },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      type,
      images: [{ url: image, width: 1920, height: 1280, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

function absolute(path: string) {
  return new URL(path, siteConfig.url).toString();
}

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd(locale: Locale) {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "HomeAndConstructionBusiness"],
    "@id": absolute("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absolute("/icon.svg"),
    image: absolute(DEFAULT_OG_IMAGE),
    description: t(siteConfig.description, locale),
    slogan: t(siteConfig.tagline, locale),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    areaServed: { "@type": "Country", name: dict.seo.country },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street || undefined,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.postalCode || undefined,
      addressCountry: siteConfig.contact.address.country,
    },
    priceRange: "$$",
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absolute("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: htmlLang[locale],
    publisher: { "@id": absolute("/#organization") },
  };
}

export function productJsonLd(model: HomeModel, locale: Locale) {
  const dict = getDictionary(locale);
  const url = absolute(encodedHref(locale, "models", `/${model.slug}`));
  const price = getModelStartingPrice(model);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: fill(dict.seo.productName, { name: model.name }),
    description: t(model.description, locale),
    image: model.images.map((i) => absolute(i.src)),
    brand: { "@type": "Brand", name: siteConfig.name },
    category: dict.seo.productCategory,
    url,
    additionalProperty: [
      { "@type": "PropertyValue", name: dict.seo.props.area, value: model.areaM2, unitCode: "MTK" },
      { "@type": "PropertyValue", name: dict.seo.props.bedrooms, value: model.bedrooms },
      { "@type": "PropertyValue", name: dict.seo.props.bathrooms, value: model.bathrooms },
      { "@type": "PropertyValue", name: dict.seo.props.stories, value: model.stories },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price,
      priceSpecification: { "@type": "PriceSpecification", price, priceCurrency: "MXN", valueAddedTaxIncluded: false },
      availability: "https://schema.org/PreOrder",
      url,
      seller: { "@id": absolute("/#organization") },
      description: dict.seo.offerDescription,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absolute(item.path) })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function itemListJsonLd(models: HomeModel[], locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.seo.itemList,
    itemListElement: models.map((m, i) => ({ "@type": "ListItem", position: i + 1, url: absolute(encodedHref(locale, "models", `/${m.slug}`)), name: m.name })),
  };
}

/** Resolves {q,a} pairs from bilingual FAQ items. */
export function localizeFaqs<T extends { q: L; a: L }>(items: T[], locale: Locale) {
  return items.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }));
}

export { tl };
