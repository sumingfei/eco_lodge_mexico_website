# Habitar — sitio web de casas prefabricadas

Sitio de marketing y generación de leads para una empresa mexicana que diseña, fabrica e instala casas prefabricadas contemporáneas. Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4 y Framer Motion. Bilingüe: español (por defecto) e inglés.

## Despliegue

El sitio se despliega en Cloudflare Workers mediante el adaptador OpenNext (`wrangler.jsonc`, `open-next.config.ts`). Cada push a `main` dispara un build en Cloudflare (Workers Builds); comando de build `npx opennextjs-cloudflare build`, despliegue `npx wrangler deploy`.

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción (incluye verificación de tipos)
npm run start
npm run lint
node scripts/generate-image-manifest.mjs   # regenera tamaños + blur placeholders tras cambiar fotos
```

Copia `.env.example` a `.env.local` y ajusta `NEXT_PUBLIC_SITE_URL` y `LEAD_WEBHOOK_URL`.

## Idiomas

- Español es el idioma por defecto y vive en la raíz: `/models`, `/estimator`, `/design`…
- Inglés vive bajo `/en/` con los mismos slugs: `/en/models`, `/en/estimator`, `/en/design`…
- Los slugs antiguos en español (`/modelos`, `/como-funciona`, `/diseño`…) redirigen a los actuales (`legacy` en `routes.ts`).
- `src/i18n/routes.ts` es la tabla de rutas (slug público por idioma + carpeta interna en inglés bajo `app/[locale]/`). `src/proxy.ts` reescribe las URLs públicas a `app/[locale]/…` y redirige las rutas internas a su URL canónica.
- Textos de interfaz: `src/i18n/dictionaries/es.ts` (define el tipo) y `en.ts` (debe tener la misma forma; TypeScript falla si falta una clave).
- Contenido de negocio en `src/data/*`: cada campo de texto es `{ es: "…", en: "…" }`. Para añadir un idioma: agrégalo a `locales` en `src/i18n/config.ts`, crea su diccionario, añade su slug en `routes.ts` y completa los campos `L` en los datos.
- El selector de idioma (`components/layout/LanguageSwitcher.tsx`) enlaza a la misma página en el otro idioma; cada página emite `hreflang` y el sitemap incluye ambos idiomas.

## Dónde se edita cada cosa

Todo el contenido de negocio vive en `src/data/`. Los componentes no contienen precios, teléfonos ni textos de empresa. Los textos de interfaz viven en `src/i18n/dictionaries/`.

| Quiero cambiar… | Archivo |
| --- | --- |
| Nombre, razón social, dominio, correo, teléfono, dirección, redes, **número de WhatsApp** y mensajes prellenados, banderas de secciones de confianza | `src/data/site.ts` |
| Precio por m² por nivel de acabado, costo de preparación de terreno, precios de sistemas opcionales, rangos del cotizador, redondeo, rango ± de la estimación, claims de la comparativa | `src/data/pricing.ts` |
| Modelos de casa (nombre, m², recámaras, baños, niveles, dimensiones, semanas, imágenes, planta, características, acabados, mejoras, FAQ) | `src/data/models.ts` |
| Factor logístico por estado (usado en el cotizador) | `src/data/locations.ts` |
| Preguntas frecuentes | `src/data/faqs.ts` |
| Opciones de fachada e interiores (página Diseño) | `src/data/finishes.ts` |
| Estrategias y secciones de sustentabilidad | `src/data/sustainability.ts` |
| Pasos del proceso (home y página completa), responsabilidades, calendario comparativo | `src/data/process.ts` |
| Propuesta de valor, áreas de personalización, criterios de la comparativa | `src/data/features.ts` |
| Galería de proyectos (marcados como `concept` o `built`) | `src/data/projects.ts` |
| Contenido para desarrolladores | `src/data/developers.ts` |
| Testimonios, proyectos entregados, credenciales, garantía, planta, aliados (vacíos y ocultos hasta tener datos reales) | `src/data/trust.ts` + banderas en `site.ts` |
| Navegación principal y del pie | `src/data/navigation.ts` |

El precio “desde” de cada modelo se calcula como `m² × precio por m² del acabado inicial` (`pricing.startingPriceFinish`), salvo que el modelo defina `priceFromOverride`.

## Estructura

```
src/
  proxy.ts             enrutamiento por idioma (rewrites/redirects)
  i18n/                config, tabla de rutas, diccionarios es/en, provider cliente, helpers de servidor
  app/
    [locale]/          todas las páginas (layout raíz con <html lang>)
      page.tsx         home
      models/          catálogo con filtros y models/[slug]
      estimator/       estimador multi-paso + formulario de cotización formal
      how-it-works/    proceso en 12 pasos y responsabilidades
      sustainability/  estrategias con diagramas SVG
      design/          configurador de fachada/interior
      developers/      página B2B con formulario
      faq/, projects/, contact/, privacy-notice/, [...rest]/ (404 localizado)
    api/lead/          endpoint que recibe leads y los reenvía a LEAD_WEBHOOK_URL
    sitemap.ts, robots.ts, icon.svg
  components/
    ui/                Button, SectionHeading, Reveal, Picture, Accordion, Badge, Icons
    layout/            Header (+ menú móvil), Footer, Logo, WhatsAppButton, header-theme
    home/              secciones de la portada
    models/            ModelCard, ModelsExplorer (filtros), ModelGallery, FloorPlan (SVG desde datos), ModelStickyCta
    calculator/        Estimator, EstimateResult, LeadForm
    design/            Configurator
    diagrams/          diagramas de sustentabilidad (SVG puro)
    sections/          PageHero, TimelineComparison
    seo/               JsonLd
  data/                configuración y contenido (ver tabla)
  lib/                 estimator.ts (cálculo puro), pricing.ts, seo.ts (metadata + JSON-LD), whatsapp.ts, format.ts, images.ts
public/images/         fotografía placeholder organizada por uso (hero, models, projects, interiors, landscapes, sections)
scripts/               generate-image-manifest.mjs
```

## Imágenes

Las fotos actuales son placeholders (Unsplash) organizadas por uso. Para sustituirlas conserva los nombres de archivo (o actualiza las rutas en `src/data/*.ts`) y ejecuta `node scripts/generate-image-manifest.mjs` para regenerar `src/data/images.generated.ts` (tamaños y blur placeholders). Busca `TODO` en el código para ver qué imágenes conviene reemplazar primero.

## Leads

Los formularios (cotizador, contacto, desarrolladores) hacen `POST /api/lead`. Si `LEAD_WEBHOOK_URL` está definido, el JSON se reenvía ahí (CRM, Zapier, Make, Slack…); si no, se registra en la consola del servidor. Incluye validación básica y un honeypot.

## SEO

Metadata por ruta con canonical, `hreflang` (es-MX, en, x-default), OpenGraph y Twitter (`src/lib/seo.ts`), `sitemap.xml` con ambos idiomas, `robots.txt` y JSON-LD: Organization/HomeAndConstructionBusiness + WebSite (global), ItemList (catálogo), Product + Offer + BreadcrumbList + FAQPage (modelo), FAQPage (preguntas frecuentes).
