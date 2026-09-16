import { es, type Dictionary } from "./dictionaries/es";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";

export type { Dictionary };
export * from "./config";
export { href, encodedHref, switchLocalePath, routes, type RouteKey } from "./routes";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replaces {placeholders} in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => (key in values ? String(values[key]) : `{${key}}`));
}
