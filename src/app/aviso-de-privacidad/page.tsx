import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ title: "Aviso de privacidad", description: `Aviso de privacidad de ${siteConfig.legalName}.`, path: "/aviso-de-privacidad" }),
  robots: { index: false, follow: true },
};

/**
 * TODO: replace with the company’s legal privacy notice reviewed by counsel
 * (Ley Federal de Protección de Datos Personales en Posesión de los Particulares).
 */
export default function PrivacyPage() {
  return (
    <article className="container-narrow prose-sm pb-24 pt-32 sm:pt-40">
      <p className="eyebrow">Legal</p>
      <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">Aviso de privacidad</h1>
      <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal-700/85">
        <p>
          {siteConfig.legalName}, con domicilio en {siteConfig.contact.address.city}, {siteConfig.contact.address.state}, es responsable del tratamiento de los datos personales que nos proporcionas a través de este sitio web.
        </p>
        <h2 className="font-serif text-2xl text-ink">Datos que recabamos</h2>
        <p>Nombre, correo electrónico, teléfono, ubicación aproximada del terreno y la información sobre tu proyecto que decidas compartir en nuestros formularios o por WhatsApp.</p>
        <h2 className="font-serif text-2xl text-ink">Finalidades</h2>
        <p>Contactarte para dar seguimiento a tu solicitud, preparar estimaciones y cotizaciones, y enviarte información sobre nuestros productos y servicios.</p>
        <h2 className="font-serif text-2xl text-ink">Derechos ARCO</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición, así como revocar tu consentimiento, escribiendo a{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="underline">
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <p className="text-xs text-stone">Última actualización: pendiente. Este texto es un borrador de referencia y debe ser revisado por un asesor legal antes de su publicación.</p>
      </div>
    </article>
  );
}
