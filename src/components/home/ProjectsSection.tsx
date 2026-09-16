import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { ProjectGallery } from "./ProjectGallery";
import { href } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function ProjectsSection() {
  const { locale, dict } = await getI18n();
  const g = dict.home.projects;
  return (
    <section className="bg-limestone py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading eyebrow={g.eyebrow} title={g.title} intro={g.intro} />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={href(locale, "projects")} variant="outline" icon={<ArrowRight size={16} />}>
              {g.cta}
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
