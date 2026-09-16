# Habitar — sitio web de casas prefabricadas

Sitio de marketing y generación de leads para una empresa mexicana que diseña, fabrica e instala casas prefabricadas contemporáneas. Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4 y Framer Motion.

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

## Dónde se edita cada cosa

Todo el contenido de negocio vive en `src/data/`. Los componentes no contienen precios, teléfonos ni textos de empresa.

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
  app/                 rutas (App Router)
    page.tsx           home
    modelos/           catálogo con filtros y /modelos/[slug]
    cotizador/         estimador multi-paso + formulario de cotización formal
    como-funciona/     proceso en 12 pasos y responsabilidades
    sustentabilidad/   estrategias con diagramas SVG
    diseno/            configurador de fachada/interior (URL pública: /diseño)
    desarrolladores/   página B2B con formulario
    preguntas-frecuentes/, proyectos/, contacto/, aviso-de-privacidad/
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

Metadata por ruta con canonical, OpenGraph y Twitter (`src/lib/seo.ts`), `sitemap.xml`, `robots.txt` y JSON-LD: Organization/HomeAndConstructionBusiness + WebSite (global), ItemList (catálogo), Product + Offer + BreadcrumbList + FAQPage (modelo), FAQPage (preguntas frecuentes).
