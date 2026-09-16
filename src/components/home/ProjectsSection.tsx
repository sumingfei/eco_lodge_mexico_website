import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { ProjectGallery } from "./ProjectGallery";

export function ProjectsSection() {
  return (
    <section className="bg-limestone py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Proyectos"
              title="Una casa para cada paisaje de México."
              intro="Desierto, costa, bosque, ciudad o campo: los mismos modelos, resueltos de forma distinta según el clima, la luz y los materiales del lugar."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/proyectos" variant="outline" icon={<ArrowRight size={16} />}>
              Ver todos los proyectos
            </Button>
          </Reveal>
        </div>
        <Reveal className="mt-14 lg:mt-20">
          <ProjectGallery limit={7} />
        </Reveal>
      </div>
    </section>
  );
}
