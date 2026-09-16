"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, projectRegions, projectRegionLabels, type Project, type ProjectRegion } from "@/data/projects";
import { Picture } from "@/components/ui/Picture";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { formatArea } from "@/lib/format";
import { fill, t } from "@/i18n";
import { useI18n } from "@/i18n/LocaleProvider";

type Filter = "Todos" | ProjectRegion;

/** Editorial project grid with region filters. */
export function ProjectGallery({ limit, className }: { limit?: number; className?: string }) {
  const { locale, dict } = useI18n();
  const g = dict.home.projects;
  const [filter, setFilter] = useState<Filter>("Todos");
  const filtered = projects.filter((p) => filter === "Todos" || p.region === filter);
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2" role="group" aria-label={g.filterAria}>
        {(["Todos", ...projectRegions] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-colors", filter === f ? "bg-ink text-limestone" : "bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink")}
          >
            {f === "Todos" ? g.all : t(projectRegionLabels[f], locale)}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(16rem,22vw)] lg:grid-cols-4 lg:grid-flow-dense">
        {visible.map((p, i) => (
          <ProjectTile key={p.slug} project={p} index={i} />
        ))}
      </ul>
      {visible.length === 0 && <p className="mt-10 text-stone">{g.empty}</p>}
    </div>
  );
}

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const { locale, dict, p } = useI18n();
  const spans: Record<NonNullable<Project["size"]>, string> = {
    large: "lg:col-span-2 lg:row-span-2",
    tall: "lg:row-span-2",
    wide: "lg:col-span-2",
  };
  const span = project.size ? spans[project.size] : "";
  const title = t(project.title, locale);

  return (
    <li className={cn("group relative overflow-hidden rounded-[1.25rem] bg-sand", span, "aspect-[4/3] lg:aspect-auto")}>
      <Link href={p("models", `/${project.model}`)} className="absolute inset-0" aria-label={fill(dict.home.projects.tileAria, { title, location: project.location, model: project.modelName })}>
        <Picture
          src={project.image}
          alt={t(project.alt, locale)}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          loading={index < 2 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge tone="light">{t(projectRegionLabels[project.region], locale)}</Badge>
          {project.status === "concept" && <Badge tone="light">{dict.common.conceptRender}</Badge>}
        </div>
        <div className="absolute inset-x-5 bottom-5 text-limestone">
          <p className="font-serif text-2xl leading-none">{title}</p>
          <p className="mt-2 text-xs text-limestone/75">
            {project.location} · {project.modelName} · {formatArea(project.areaM2)}
          </p>
        </div>
      </Link>
    </li>
  );
}
