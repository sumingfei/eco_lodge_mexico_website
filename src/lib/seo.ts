import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import type { HomeModel } from "@/data/models";
import { getModelStartingPrice } from "./pricing";

const DEFAULT_OG_IMAGE = "/images/hero/hero-courtyard.jpg"; // TODO: replace with a branded OG image (1200×630)

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

/** Builds consistent metadata (canonical, OpenGraph, Twitter) for a route. */
export function buildMetadata({ title, description, path, image = DEFAULT_OG_IMAGE, type = "website" }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: image, width: 1920, height: 1280, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function absolute(path: string) {
  return new URL(path, siteConfig.url).toString();
}

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "HomeAndConstructionBusiness"],
    "@id": absolute("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absolute("/icon.svg"),
    image: absolute(DEFAULT_OG_IMAGE),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    areaServed: { "@type": "Country", name: "México" },
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

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absolute("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: siteConfig.language,
    publisher: { "@id": absolute("/#organization") },
  };
}

export function productJsonLd(model: HomeModel) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${model.name} — casa prefabricada`,
    description: model.description,
    image: model.images.map((i) => absolute(i.src)),
    brand: { "@type": "Brand", name: siteConfig.name },
    category: "Casas prefabricadas",
    url: absolute(`/modelos/${model.slug}`),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Superficie interior", value: model.areaM2, unitCode: "MTK" },
      { "@type": "PropertyValue", name: "Recámaras", value: model.bedrooms },
      { "@type": "PropertyValue", name: "Baños", value: model.bathrooms },
      { "@type": "PropertyValue", name: "Niveles", value: model.stories },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: getModelStartingPrice(model),
      priceSpecification: {
        "@type": "PriceSpecification",
        price: getModelStartingPrice(model),
        priceCurrency: "MXN",
        valueAddedTaxIncluded: false,
      },
      availability: "https://schema.org/PreOrder",
      url: absolute(`/modelos/${model.slug}`),
      seller: { "@id": absolute("/#organization") },
      description: "Precio 'desde' del modelo en nivel de acabado Esencial. No incluye terreno, cimentación ni permisos.",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListJsonLd(models: HomeModel[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Modelos de casas prefabricadas",
    itemListElement: models.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absolute(`/modelos/${m.slug}`),
      name: m.name,
    })),
  };
}
