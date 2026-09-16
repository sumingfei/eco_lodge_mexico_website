import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CostComparison } from "./CostComparison";

export function CostComparisonSection() {
  return (
    <section className="bg-limestone-50 py-20 sm:py-28 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="Comparativa"
            title="Construcción tradicional vs. proceso prefabricado"
            intro="Lo que cambia cuando la casa se fabrica bajo techo: menos incertidumbre, menos desperdicio y un calendario que sí se cumple."
          />
        </Reveal>
        <Reveal className="mt-14 lg:mt-20">
          <CostComparison />
        </Reveal>
      </div>
    </section>
  );
}
