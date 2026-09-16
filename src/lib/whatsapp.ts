import { siteConfig } from "@/data/site";

/** Builds a wa.me link with a URL-encoded prefilled message. */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function whatsappModelLink(modelName: string) {
  return whatsappLink(siteConfig.whatsapp.modelMessage(modelName));
}
