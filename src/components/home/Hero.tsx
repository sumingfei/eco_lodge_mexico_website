import { Picture } from "@/components/ui/Picture";
import { HeaderOverlay } from "@/components/layout/header-theme";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { getStartingPricePerM2 } from "@/lib/pricing";
import { formatMXN } from "@/lib/format";

/**
 * Full-bleed hero.
 * TODO: replace /images/hero/hero-courtyard.jpg with a real company render/photo
 * (ideally a short muted video with a poster) showing a home in a Mexican landscape.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-limestone">
      <HeaderOverlay />
      <Picture
        src="/images/hero/hero-courtyard.jpg"
        alt="Casa prefabricada contemporánea con recubrimiento de madera y patio de acceso"
        fill
        priority
        fetchPriority="high"
        quality={75}
        sizes="100vw"
        className="object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/20" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" aria-hidden />

      <div className="container-wide relative pb-14 pt-40 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          <p className="eyebrow animate-fade-up text-limestone/70">Casas prefabricadas de diseño contemporáneo</p>
          <h1 className="display animate-fade-up mt-6 text-[2.75rem] text-limestone [animation-delay:120ms] sm:text-[4rem] lg:text-[5.5rem]">
            Tu casa. Mejor diseñada.
            <br />
            Mejor construida.
          </h1>
          <p className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-limestone/80 [animation-delay:240ms] sm:text-lg">
            Casas prefabricadas de diseño contemporáneo, construidas con menos desperdicio, en menos tiempo y con costos más predecibles.
          </p>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:items-center">
            <Button href="/modelos" variant="light" size="lg" icon={<ArrowRight size={18} />}>
              Explorar modelos
            </Button>
            <Button href="/cotizador" variant="outline-light" size="lg">
              Cotizar mi casa
            </Button>
          </div>
          <p className="animate-fade-up mt-8 text-sm text-limestone/60 [animation-delay:480ms]">
            Desde {formatMXN(getStartingPricePerM2())}/m² · Precio de referencia de la casa, sin terreno ni cimentación
          </p>
        </div>
      </div>
    </section>
  );
}
