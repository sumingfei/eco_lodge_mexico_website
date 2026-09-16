import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="container-narrow flex min-h-[70svh] flex-col items-start justify-center pb-24 pt-32">
      <p className="eyebrow">Error 404</p>
      <h1 className="display mt-4 text-4xl text-ink sm:text-6xl">Esta página no está construida.</h1>
      <p className="mt-5 max-w-md text-charcoal-700/80">Puede que el enlace haya cambiado. Vuelve al inicio o explora los modelos.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/" icon={<ArrowRight size={16} />}>
          Ir al inicio
        </Button>
        <Button href="/modelos" variant="outline">
          Ver modelos
        </Button>
      </div>
    </section>
  );
}
