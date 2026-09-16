import { locale as rootLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "./index";

/** Current locale from the [locale] root segment (server components only). */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  if (!value || !isLocale(value)) notFound();
  return value;
}

/** Locale + dictionary in one call for server components. */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, dict: getDictionary(locale) };
}
