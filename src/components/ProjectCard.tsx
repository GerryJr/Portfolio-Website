import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Project, TechIcon as TechIconType, computeDuration } from "@/types/project";
import { TechIcon } from "./TechIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink, Github, Calendar, Lock, ChevronDown, Clock, User, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SCOPE_COLORS } from "@/lib/scope";
import {
  CATEGORY_COLOR_CLASS,
  CATEGORY_LABELS,
  categorizeProject,
  flattenProject,
} from "@/lib/tech-category";

// The Projects page toggles between an "overview" grid (these cards) and a
// "deep" timeline (<DeepDiveTimeline>); this type drives that page-level
// toggle. ProjectCard itself only ever renders the overview layout.
export type ProjectView = "overview" | "deep";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

/* ── Shared sub-components ───────────────────────────────────────────── */

const ScopeTag = ({ scope }: { scope: Project["scopeType"] }) => {
  const colors = SCOPE_COLORS[scope];
  return (
    <span
      className={cn(
        "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border",
        "font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap",
        colors.chip,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
      {scope}
    </span>
  );
};

/** Single primary CTA — picks the most-prominent available link. */
const PrimaryLink = ({ project }: { project: Project }) => {
  if (project.links.live) {
    return (
      <Button asChild>
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
          Visit site
        </a>
      </Button>
    );
  }
  if (project.links.demo) {
    return (
      <Button asChild>
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
          View demo
        </a>
      </Button>
    );
  }
  if (project.links.repo) {
    return (
      <Button variant="secondary" asChild>
        <a
          href={project.links.repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <Github className="w-3.5 h-3.5 mr-1.5" />
          Repo
        </a>
      </Button>
    );
  }
  if (project.links.private) {
    return (
      <Button
        variant="outline"
        disabled
        aria-disabled="true"
        className="bg-muted text-foreground/70 border-muted disabled:opacity-80"
      >
        <Lock className="w-3.5 h-3.5 mr-1.5" />
        {project.links.private}
      </Button>
    );
  }
  return null;
};

const EmployerBlock = ({ project }: { project: Project }) => {
  const duration = computeDuration(project.date);
  const TeamIcon = project.teamSize === "Solo" ? User : Users;
  const isCommission = !project.employer;
  const orgLabel = isCommission ? "Independent" : project.employer;

  return (
    <div className="flex flex-col gap-0.5 p-2.5 rounded-md border-l-[3px] border-accent bg-accent/5">
      <div className="text-sm font-bold tracking-[-0.01em] text-accent">{orgLabel}</div>
      <div className="text-sm font-medium text-foreground">{project.role}</div>
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 mt-1 text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 text-[13px]">
          <Calendar className="w-3 h-3" />
          {project.date}
        </span>
        {duration && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-[11px] font-semibold">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-[11px] font-semibold">
          <TeamIcon className="w-3 h-3" />
          {project.teamSize}
        </span>
      </div>
    </div>
  );
};

const InlineLabel = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <span
    className={cn(
      "inline-flex items-center mr-2 px-2 py-0.5 rounded-sm text-[11px] font-semibold uppercase tracking-wide align-middle whitespace-nowrap",
      accent ? "bg-accent/10 text-accent" : "bg-muted/70 text-muted-foreground",
    )}
  >
    {children}:
  </span>
);

/** Single tech cell — icon above name. data-flip-id lets the FLIP animation track it across layouts.
 *  Optional `meta` renders a tiny mono annotation below the name (used for DB type: REL / NON-REL). */
const TechCell = ({ tech, meta }: { tech: TechIconType; meta?: string }) => (
  <div
    data-flip-id={tech.name}
    className="flex flex-col items-center gap-1 min-w-[56px]"
  >
    <TechIcon {...tech} size={28} />
    <span className="text-[12px] text-muted-foreground text-center leading-tight max-w-[72px] break-words font-medium">
      {tech.name}
    </span>
    {meta && (
      <span className="font-mono text-[8.5px] uppercase tracking-[0.06em] text-muted-foreground/70 leading-none mt-0.5">
        {meta}
      </span>
    )}
  </div>
);

interface StackBlockProps {
  project: Project;
  grouped: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

const StackBlock = ({ project, grouped, containerRef }: StackBlockProps) => {
  const flat = useMemo(() => flattenProject(project), [project]);
  const categorized = useMemo(() => categorizeProject(project), [project]);

  return (
    <div className="py-1 border-y border-dashed border-border">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2.5">
          <InlineLabel>Made with</InlineLabel>
          <span className="relative inline-grid">
            <span
              className={cn(
                "col-start-1 row-start-1 font-mono text-[10.5px] uppercase tracking-[0.1em] font-semibold text-muted-foreground motion-safe:transition-all motion-safe:duration-300",
                grouped && "opacity-0 -translate-y-1",
              )}
            >
              See breakdown
            </span>
            <span
              className={cn(
                "col-start-1 row-start-1 font-mono text-[10.5px] uppercase tracking-[0.1em] font-semibold text-muted-foreground motion-safe:transition-all motion-safe:duration-300",
                !grouped && "opacity-0 -translate-y-1",
              )}
            >
              Categorized
            </span>
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground motion-safe:transition-transform motion-safe:duration-300",
            grouped && "rotate-180",
          )}
        />
      </div>

      {/* Container ref is on this div — FLIP reads/writes its height and child positions. */}
      <div ref={containerRef} className="pt-2 pb-1.5">
        {!grouped ? (
          <div className="flex flex-wrap gap-x-3 gap-y-3.5">
            {flat.map((t) => (
              <TechCell key={`flat-${t.name}`} tech={t} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {categorized.map(({ cat, items }) => (
              <div
                key={cat}
                className="grid grid-cols-[92px_1fr] items-center gap-2.5 py-2 [&+&]:border-t [&+&]:border-dashed [&+&]:border-border"
              >
                <div
                  className={cn(
                    "text-right pr-2 border-r border-border self-stretch flex items-center justify-end",
                    "font-mono text-[10px] uppercase tracking-[0.1em] font-bold",
                    CATEGORY_COLOR_CLASS[cat],
                  )}
                >
                  {CATEGORY_LABELS[cat]}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-3.5 items-start">
                  {items.map((t) => (
                    <TechCell key={`grp-${cat}-${t.name}`} tech={t} meta={t.meta} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CardLinks = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap gap-2 mt-auto pt-3.5">
    {project.links.live && (
      <Button size="sm" asChild>
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
          Visit site
        </a>
      </Button>
    )}
    {project.links.demo && (
      <Button size="sm" asChild>
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
          Demo
        </a>
      </Button>
    )}
    {project.links.repo && !project.links.private && (
      <Button variant="secondary" size="sm" asChild>
        <a
          href={project.links.repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <Github className="w-3.5 h-3.5 mr-1.5" />
          Repo
        </a>
      </Button>
    )}
    {project.links.private && (
      <Button
        variant="outline"
        size="sm"
        disabled
        aria-disabled="true"
        className="bg-muted text-foreground/70 border-muted disabled:opacity-80"
      >
        <Lock className="w-3.5 h-3.5 mr-1.5" />
        <span className="text-xs">{project.links.private}</span>
      </Button>
    )}
  </div>
);

/* ── Overview card (recruiter mode) ──────────────────────────────────── */

interface ViewProps {
  project: Project;
  isVisible: boolean;
}

const OverviewCard = ({ project, isVisible }: ViewProps) => {
  // Clicking the card toggles the stack-categorize view — icons reorganize
  // in flight via the FLIP animation below.
  const [expanded, setExpanded] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const firstPositionsRef = useRef<Map<string, DOMRect> | null>(null);
  const firstHeightRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const heightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Capture FIRST positions + container height BEFORE the state change so useLayoutEffect can invert. */
  const toggle = () => {
    // Cancel any in-flight cleanup so rapid clicks chain cleanly
    if (heightTimeoutRef.current) {
      clearTimeout(heightTimeoutRef.current);
      heightTimeoutRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const container = stackRef.current;
    if (container) {
      const cells = container.querySelectorAll<HTMLElement>("[data-flip-id]");
      const positions = new Map<string, DOMRect>();
      cells.forEach((el) => {
        // Capture transform-aware visual rect BEFORE clearing — handles mid-flight toggles
        positions.set(el.dataset.flipId!, el.getBoundingClientRect());
      });
      firstPositionsRef.current = positions;
      firstHeightRef.current = container.getBoundingClientRect().height;
      // Clear in-flight transitions so the next render starts clean
      cells.forEach((el) => {
        el.style.transition = "none";
        el.style.transform = "";
      });
      container.style.transition = "none";
      container.style.height = "";
      container.style.overflow = "";
    }
    setExpanded((v) => !v);
  };

  /** Apply LAST/INVERT/PLAY after React commits the new layout. */
  useLayoutEffect(() => {
    const first = firstPositionsRef.current;
    const oldHeight = firstHeightRef.current;
    const container = stackRef.current;
    if (!first || !container) return;

    // Container height crossfade
    const newHeight = container.getBoundingClientRect().height;
    if (oldHeight !== null && Math.abs(oldHeight - newHeight) > 1) {
      container.style.transition = "none";
      container.style.height = `${oldHeight}px`;
      container.style.overflow = "hidden";
      // Force layout to commit the rewound height
      void container.offsetHeight;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        container.style.transition = "height 520ms cubic-bezier(0.33,1,0.68,1)";
        container.style.height = `${newHeight}px`;
        heightTimeoutRef.current = setTimeout(() => {
          heightTimeoutRef.current = null;
          container.style.height = "";
          container.style.overflow = "";
          container.style.transition = "";
        }, 540);
      });
    }

    // FLIP each cell that exists in both layouts
    const cells = container.querySelectorAll<HTMLElement>("[data-flip-id]");
    const animating: HTMLElement[] = [];
    cells.forEach((el) => {
      el.style.transition = "none";
      el.style.transform = "";
      const newRect = el.getBoundingClientRect();
      const oldRect = first.get(el.dataset.flipId!);
      if (!oldRect) return;
      // Round to integer pixels — subpixel translate values blur SVG/raster icons
      const dx = Math.round(oldRect.left - newRect.left);
      const dy = Math.round(oldRect.top - newRect.top);
      if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        animating.push(el);
      }
    });
    if (animating.length > 0) {
      requestAnimationFrame(() => {
        animating.forEach((el) => {
          el.style.transition = "transform 520ms cubic-bezier(0.33,1,0.68,1)";
          el.style.transform = "";
        });
      });
    }

    firstPositionsRef.current = null;
    firstHeightRef.current = null;
  }, [expanded]);

  // Clean up any pending animation frames on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (heightTimeoutRef.current) clearTimeout(heightTimeoutRef.current);
    };
  }, []);

  return (
    <Card
      className={cn(
        "h-full overflow-hidden flex flex-col",
        "border-border hover:border-foreground",
        "motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200",
        "shadow-md hover:shadow-2xl motion-safe:hover:-translate-y-1",
        // Keyboard focus lands on the inner toggle button (or the action
        // links); lift the whole card when anything inside is focused so the
        // affordance matches the old whole-card focus treatment.
        "focus-within:border-foreground focus-within:shadow-2xl motion-safe:focus-within:-translate-y-1",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      )}
    >
      {/* The upper card is one toggle button that regroups the tech stack by
          category. It deliberately stops above CardLinks — a button must not
          wrap the <a> action links (invalid nested interactive content). */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        aria-label={`${project.title}, ${expanded ? "show tech stack as a flat list" : "group tech stack by category"}`}
        className="w-full text-left appearance-none bg-transparent border-0 p-0 m-0 flex flex-col flex-1 cursor-pointer focus:outline-none focus-visible:outline-none"
      >
        <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: "11 / 5" }}>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <CardContent className="p-5 pt-5 pb-0 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] m-0">{project.title}</h3>
            <ScopeTag scope={project.scopeType} />
          </div>

          <EmployerBlock project={project} />

          <p className="text-[14.5px] leading-relaxed text-foreground">
            <InlineLabel>Project</InlineLabel>
            {project.whatItIs}
          </p>

          <StackBlock project={project} grouped={expanded} containerRef={stackRef} />

          <p className="text-[14.5px] leading-relaxed font-semibold text-accent">
            <InlineLabel accent>Impact</InlineLabel>
            {project.impact}
          </p>
        </CardContent>
      </button>

      <div className="px-5 pb-5">
        <CardLinks project={project} />
      </div>
    </Card>
  );
};


/* ── Top-level component (visibility observer + view router) ─────────────
 * The Deep Dive view now lives in <DeepDiveTimeline>. ProjectCard renders
 * the Overview layout only; the optional `view` prop is kept for back-compat
 * but is otherwise inert here — callers that want the deep view should use
 * <DeepDiveTimeline> instead.
 * ──────────────────────────────────────────────────────────────────── */

export const ProjectCard = ({ project, delay = 0 }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const clampedDelay = Math.min(delay, 0.35);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "180px 0px 180px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: isVisible && clampedDelay ? `${clampedDelay}s` : "0s" }}
    >
      <OverviewCard project={project} isVisible={isVisible} />
    </div>
  );
};
