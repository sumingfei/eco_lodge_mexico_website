export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

/** Spanish is the default locale and lives at the root (no URL prefix). */
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = { es: "Español", en: "English" };
export const htmlLang: Record<Locale, string> = { es: "es-MX", en: "en" };
export const ogLocale: Record<Locale, string> = { es: "es_MX", en: "en_US" };
/** hreflang values used in <link rel="alternate"> and the sitemap. */
export const hreflang: Record<Locale, string> = { es: "es-MX", en: "en" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A piece of text in every supported language. */
export type L = Record<Locale, string>;

/** Resolves a localized string (plain strings pass through untouched). */
export function t(value: L | string, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

/** Resolves a list of localized strings. */
export function tl(values: (L | string)[], locale: Locale): string[] {
  return values.map((v) => t(v, locale));
}
