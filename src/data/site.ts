/**
 * Global site configuration — company identity, contact channels and feature flags.
 * Everything customer-facing that identifies the company lives here.
 *
 * TODO: replace placeholder values (name, URL, phone, WhatsApp, address, socials)
 * with the real company information before launch.
 */
import type { L, Locale } from "@/i18n/config";

export const siteConfig = {
  name: "Habitar",
  legalName: "Habitar Casas Prefabricadas S.A. de C.V.", // TODO: razón social real
  tagline: { es: "Diseño que puedes habitar.", en: "Design you can live in." } satisfies L,
  description: {
    es: "Casas prefabricadas de diseño contemporáneo en México. Arquitectura, eficiencia y construcción modular para tu terreno, con costos más predecibles y menos tiempo de obra.",
    en: "Contemporary prefab homes in Mexico. Architecture, efficiency and modular construction for your land, with more predictable costs and less time on site.",
  } satisfies L,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://habitar.mx", // TODO: dominio real
  country: "MX",

  contact: {
    email: "hola@habitar.mx", // TODO
    phone: "+52 55 0000 0000", // TODO: teléfono con formato de visualización
    phoneE164: "+525500000000", // TODO: teléfono en formato internacional (para tel:)
    address: {
      street: "", // TODO
      city: "Ciudad de México",
      state: "CDMX",
      postalCode: "",
      country: "MX",
    },
    hours: { es: "Lunes a viernes, 9:00 – 18:00 h", en: "Monday to Friday, 9:00 – 18:00 (CST)" } satisfies L,
  },

  /**
   * WhatsApp is the primary conversion channel for the Mexican market.
   * Number must be in international format without "+", spaces or dashes.
   */
  whatsapp: {
    number: "525500000000", // TODO: número real de WhatsApp Business
    defaultMessage: {
      es: "Hola, estoy interesado en conocer más sobre sus casas prefabricadas.",
      en: "Hi, I'm interested in learning more about your prefab homes.",
    } satisfies L,
    modelMessage: (modelName: string, locale: Locale) =>
      locale === "en"
        ? `Hi, I'm interested in the ${modelName} model. Could you send me more information?`
        : `Hola, estoy interesado en el modelo ${modelName}. ¿Me pueden enviar más información?`,
    developerMessage: {
      es: "Hola, me interesa platicar sobre un desarrollo con varias unidades.",
      en: "Hi, I'd like to talk about a multi-unit development.",
    } satisfies L,
  },

  social: {
    instagram: "", // TODO: https://instagram.com/…
    facebook: "", // TODO
    youtube: "", // TODO
    linkedin: "", // TODO
    pinterest: "", // TODO
  },

  /** Regions where the company currently builds. Used in copy and structured data. */
  serviceArea: { es: "Toda la República Mexicana (sujeto a evaluación logística)", en: "All of Mexico (subject to logistics evaluation)" } satisfies L,

  /**
   * Feature flags for sections that depend on real company data.
   * Keep them off until the corresponding data in /data/trust.ts is real.
   */
  features: {
    showTrustSection: false,
    showTestimonials: false,
    showProjectCounts: false,
    showPartners: false,
    showFactory: false,
    showWarranty: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
