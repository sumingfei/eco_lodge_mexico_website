import { siteConfig } from "@/data/site";
import { t, type Locale } from "@/i18n/config";

/** Builds a wa.me link with a URL-encoded prefilled message. */
export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function whatsappDefaultLink(locale: Locale) {
  return whatsappLink(t(siteConfig.whatsapp.defaultMessage, locale));
}

export function whatsappModelLink(modelName: string, locale: Locale) {
  return whatsappLink(siteConfig.whatsapp.modelMessage(modelName, locale));
}

export function whatsappDeveloperLink(locale: Locale) {
  return whatsappLink(t(siteConfig.whatsapp.developerMessage, locale));
}
