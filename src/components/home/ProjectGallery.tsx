"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, projectRegions, type Project, type ProjectRegion } from "@/data/projects";
import { Picture } from "@/components/ui/Picture";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { formatArea } from "@/lib/format";

type Filter = "Todos" | ProjectRegion;

/** Editorial project grid with region filters. */
export function ProjectGallery({ limit, className }: { limit?: number; className?: string }) {
  const [filter, setFilter] = useState<Filter>("Todos");
  const filtered = projects.filter((p) => filter === "Todos" || p.region === filter);
  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por paisaje">
        {(["Todos", ...projectRegions] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === f ? "bg-ink text-limestone" : "bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(16rem,22vw)] lg:grid-cols-4 lg:grid-flow-dense">
        {visible.map((p, i) => (
          <ProjectTile key={p.slug} project={p} index={i} />
        ))}
      </ul>
      {visible.length === 0 && <p className="mt-10 text-stone">Aún no hay proyectos en esta categoría.</p>}
    </div>
  );
}

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const spans: Record<NonNullable<Project["size"]>, string> = {
    large: "lg:col-span-2 lg:row-span-2",
    tall: "lg:row-span-2",
    wide: "lg:col-span-2",
  };
  const span = project.size ? spans[project.size] : "";

  return (
    <li className={cn("group relative overflow-hidden rounded-[1.25rem] bg-sand", span, "aspect-[4/3] lg:aspect-auto")}>
      <Link href={`/modelos/${project.model.toLowerCase().replace(/\s+/g, "-")}`} className="absolute inset-0" aria-label={`${project.title}, ${project.location} — ver modelo ${project.model}`}>
        <Picture
          src={project.image}
          alt={project.alt}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          loading={index < 2 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge tone="light">{project.region}</Badge>
          {project.status === "concept" && <Badge tone="light">Render conceptual</Badge>}
        </div>
        <div className="absolute inset-x-5 bottom-5 text-limestone">
          <p className="font-serif text-2xl leading-none">{project.title}</p>
          <p className="mt-2 text-xs text-limestone/75">
            {project.location} · {project.model} · {formatArea(project.areaM2)}
          </p>
        </div>
      </Link>
    </li>
  );
}
