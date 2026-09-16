import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CostComparison } from "./CostComparison";
import { getI18n } from "@/i18n/server";

export async function CostComparisonSection() {
  const { dict } = await getI18n();
  return (
    <section className="bg-limestone-50 py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <SectionHeading eyebrow={dict.home.comparison.eyebrow} title={dict.home.comparison.title} intro={dict.home.comparison.intro} />
        </Reveal>
        <Reveal className="mt-14 lg:mt-20">
          <CostComparison />
        </Reveal>
      </div>
    </section>
  );
}
