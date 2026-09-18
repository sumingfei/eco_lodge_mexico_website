import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { fill, htmlLang, locales, ogLocale, t } from "@/i18n";
import { getI18n } from "@/i18n/server";
import { LocaleProvider } from "@/i18n/LocaleProvider";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap", axes: ["opsz", "SOFT"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  const title = fill(dict.seo.siteTitle, { name: siteConfig.name });
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s · ${siteConfig.name}` },
    description: t(siteConfig.description, locale),
    applicationName: siteConfig.name,
    keywords: dict.seo.keywords,
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      siteName: siteConfig.name,
      title,
      description: t(siteConfig.description, locale),
      images: [{ url: "/images/hero/hero-courtyard.jpg", width: 1920, height: 1280, alt: dict.seo.ogAlt }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true, email: true },
  };
}

export const viewport: Viewport = { themeColor: "#f4efe6", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const { locale, dict } = await getI18n();
  return (
    <html lang={htmlLang[locale]} className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale} dict={dict}>
          <JsonLd data={[organizationJsonLd(locale), websiteJsonLd(locale)]} />
          <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-limestone">
            {dict.common.skipToContent}
          </a>
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </LocaleProvider>
      </body>
    </html>
  );
}
