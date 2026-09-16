import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { href } from "@/i18n";
import { getI18n } from "@/i18n/server";

export default async function NotFound() {
  const { locale, dict } = await getI18n();
  return (
    <section className="container-narrow flex min-h-[70svh] flex-col items-start justify-center pb-24 pt-32">
      <p className="eyebrow">{dict.notFound.eyebrow}</p>
      <h1 className="display mt-4 text-4xl text-ink sm:text-6xl">{dict.notFound.title}</h1>
      <p className="mt-5 max-w-md text-charcoal-700/80">{dict.notFound.text}</p>
      <div className="mt-8 flex gap-3">
        <Button href={href(locale, "home")} icon={<ArrowRight size={16} />}>
          {dict.notFound.home}
        </Button>
        <Button href={href(locale, "models")} variant="outline">
          {dict.common.viewModels}
        </Button>
      </div>
    </section>
  );
}
