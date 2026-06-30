import { useMemo } from "react";
import { ExternalLink, Lock } from "lucide-react";
import { Project, groupByYear, formatDateLabel } from "@/types/project";
import { TechIcon } from "@/components/TechIcon";
import { Button } from "@/components/ui/button";

interface TimelineYearStackProps {
  items: Project[];
}

/**
 * Year-stacked vertical timeline (variant C from the projects+commissions handoff).
 * Used by the Commissions tab on /experience. The .tl-c-* classes in index.css
 * supply the structural CSS Grid + sticky positioning; everything else is Tailwind.
 */
export const TimelineYearStack = ({ items }: TimelineYearStackProps) => {
  const groups = useMemo(() => groupByYear(items), [items]);

  if (items.length === 0) {
    return <p className="text-muted-foreground italic">No commissions yet. Check back soon.</p>;
  }

  return (
    <div className="tl-c">
      {groups.map(({ year, items: yearItems }) => (
        <section key={year} className="tl-c-year">
          <div>
            <div className="tl-c-year-num">
              {year}
              <span className="sub">
                {yearItems.length} commission{yearItems.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="tl-c-list">
            {yearItems.map((p, i) => (
              <TimelineRow key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

interface TimelineRowProps {
  project: Project;
  index: number;
}

const TimelineRow = ({ project, index }: TimelineRowProps) => {
  const meta = project.dateLabel ?? formatDateLabel(project.date);
  const clientLabel = project.client ?? project.employer ?? "Private client";
  const stack = useMemo(
    () => [
      ...project.stackIcons,
      ...project.apis,
      ...project.integrations,
      ...project.databases,
    ],
    [project],
  );

  return (
    <div
      className="tl-c-row motion-safe:animate-rise-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-muted">
        <img
          src={project.thumbnail ?? project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
          <span>{meta}</span>
          <span aria-hidden="true">·</span>
          <span>{clientLabel}</span>
        </div>
        <h3 className="text-2xl font-bold tracking-[-0.02em] leading-tight m-0">{project.title}</h3>
        <p className="text-[14.5px] leading-relaxed text-muted-foreground m-0">{project.whatItIs}</p>
        <div className="flex flex-wrap gap-3 mt-1">
          {stack.slice(0, 12).map((tech, idx) => (
            <TechIcon key={`${tech.name}-${idx}`} {...tech} size={24} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 lg:items-end">
        {project.links.live ? (
          <Button asChild size="sm">
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              Visit site
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            aria-disabled="true"
            className="bg-muted text-foreground/70 border-muted disabled:opacity-80"
          >
            <Lock className="w-3.5 h-3.5 mr-1.5" />
            <span className="text-xs">{project.links.private ?? "Delivered to Client"}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
