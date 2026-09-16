import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { href } from "@/i18n";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return buildMetadata({ locale, route: "projects", title: dict.projectsPage.metaTitle, description: dict.projectsPage.metaDescription, image: "/images/projects/campo-02.jpg" });
}

export default async function ProjectsPage() {
  const { locale, dict } = await getI18n();
  const pp = dict.projectsPage;
  return (
    <>
      <PageHero compact eyebrow={pp.eyebrow} title={pp.title} intro={pp.intro} image="/images/projects/campo-02.jpg" alt={pp.alt} />
      <section className="container-wide py-16 sm:py-24">
        <Reveal>
          <ProjectGallery />
        </Reveal>
        {/* TODO: when real projects exist, set status: "built" in /data/projects.ts and add photography */}
      </section>
      <section className="bg-limestone-50 py-20">
        <div className="container-narrow text-center">
          <h2 className="display text-3xl text-ink sm:text-4xl">{pp.ctaTitle}</h2>
          <p className="mt-4 text-charcoal-700/80">{pp.ctaText}</p>
          <Button href={href(locale, "estimator")} className="mt-8" icon={<ArrowRight size={16} />}>
            {dict.common.quoteMyHome}
          </Button>
        </div>
      </section>
    </>
  );
}
