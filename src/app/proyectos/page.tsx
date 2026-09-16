import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Proyectos: casas prefabricadas en desierto, costa, bosque, ciudad y campo",
  description: "Galería de proyectos y estudios conceptuales de nuestras casas prefabricadas adaptadas a los distintos paisajes de México.",
  path: "/proyectos",
  image: "/images/projects/campo-02.jpg",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Proyectos"
        title="Una casa para cada paisaje."
        intro="Los mismos modelos, resueltos de forma distinta según el clima, la luz y los materiales de cada lugar. Las imágenes marcadas como render conceptual son estudios de diseño."
        image="/images/projects/campo-02.jpg"
        alt="Casa con patio y recubrimiento de madera en un valle"
      />
      <section className="container-wide py-16 sm:py-24">
        <Reveal>
          <ProjectGallery />
        </Reveal>
        {/* TODO: when real projects exist, set status: "built" in /data/projects.ts and add photography */}
      </section>
      <section className="bg-limestone-50 py-20">
        <div className="container-narrow text-center">
          <h2 className="display text-3xl text-ink sm:text-4xl">¿Cómo se vería en tu terreno?</h2>
          <p className="mt-4 text-charcoal-700/80">Cuéntanos dónde está y qué necesitas. Te ayudamos a elegir el modelo y la orientación.</p>
          <Button href="/cotizador" className="mt-8" icon={<ArrowRight size={16} />}>
            Cotizar mi casa
          </Button>
        </div>
      </section>
    </>
  );
}
