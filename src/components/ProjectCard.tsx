import { useEffect, useMemo, useRef, useState } from "react";
import { Project, ScopeType, TechIcon as TechIconType, DatabaseType, computeDuration } from "@/types/project";
import { TechIcon } from "./TechIcon";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink, Github, Calendar, Lock, ChevronDown, Clock, User, Users,
  Layers, Server, Monitor, Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type ViewMode = "stack" | "apis";

/* ── Scope theme system ──────────────────────────────────────────────── */

const scopeTheme: Record<ScopeType, {
  badge: string;
  border: string;
  gradient: string;
  imageOverlay: string;
  accentText: string;
  icon: typeof Layers;
}> = {
  "Full Stack": {
    badge: "bg-violet-500/90 text-white dark:bg-violet-500/80",
    border: "border-violet-400/40 dark:border-violet-400/30",
    gradient: "from-violet-500/8 via-transparent to-violet-500/3 dark:from-violet-500/10 dark:to-violet-500/5",
    imageOverlay: "from-violet-600/60 via-violet-600/20 to-transparent",
    accentText: "text-violet-600 dark:text-violet-400",
    icon: Layers,
  },
  "Frontend": {
    badge: "bg-sky-500/90 text-white dark:bg-sky-500/80",
    border: "border-sky-400/40 dark:border-sky-400/30",
    gradient: "from-sky-500/8 via-transparent to-sky-500/3 dark:from-sky-500/10 dark:to-sky-500/5",
    imageOverlay: "from-sky-600/60 via-sky-600/20 to-transparent",
    accentText: "text-sky-600 dark:text-sky-400",
    icon: Monitor,
  },
  "Backend": {
    badge: "bg-amber-500/90 text-white dark:bg-amber-500/80",
    border: "border-amber-400/40 dark:border-amber-400/30",
    gradient: "from-amber-500/8 via-transparent to-amber-500/3 dark:from-amber-500/10 dark:to-amber-500/5",
    imageOverlay: "from-amber-600/60 via-amber-600/20 to-transparent",
    accentText: "text-amber-600 dark:text-amber-400",
    icon: Server,
  },
  "Data": {
    badge: "bg-emerald-500/90 text-white dark:bg-emerald-500/80",
    border: "border-emerald-400/40 dark:border-emerald-400/30",
    gradient: "from-emerald-500/8 via-transparent to-emerald-500/3 dark:from-emerald-500/10 dark:to-emerald-500/5",
    imageOverlay: "from-emerald-600/60 via-emerald-600/20 to-transparent",
    accentText: "text-emerald-600 dark:text-emerald-400",
    icon: Database,
  },
};

const dbTypeColor: Record<DatabaseType, string> = {
  "Relational": "bg-blue-500/12 text-blue-700 dark:text-blue-300 border-blue-500/25",
  "Non-Relational": "bg-orange-500/12 text-orange-700 dark:text-orange-300 border-orange-500/25",
};

/* ── Component ───────────────────────────────────────────────────────── */

interface ProjectCardProps {
  project: Project;
  delay?: number;
  viewMode?: ViewMode;
}

export const ProjectCard = ({ project, delay = 0, viewMode = "stack" }: ProjectCardProps) => {
  const MAX_ICONS = 18;

  const allIcons = useMemo(() => {
    const seen = new Set(project.stackIcons.map((i) => i.name));
    const extras: TechIconType[] = [...project.apis, ...project.integrations]
      .filter((a) => a.icon || a.svgPath)
      .filter((a) => !seen.has(a.name))
      .map(({ name, icon, iconDark, invertOnDark, svgPath }) => ({ name, icon, iconDark, invertOnDark, svgPath }));
    return [...project.stackIcons, ...extras];
  }, [project]);

  const visibleIcons = allIcons.slice(0, MAX_ICONS);
  const hiddenCount = allIcons.length - MAX_ICONS;
  const clampedDelay = Math.min(delay, 0.35);
  const [isOpen, setIsOpen] = useState(false);
  const expandId = `${project.id}-expand`;
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isApiView = viewMode === "apis";
  const theme = scopeTheme[project.scopeType];
  const ScopeIcon = theme.icon;
  const duration = computeDuration(project.date);
  const TeamIcon = project.teamSize === "Solo" ? User : Users;

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
      { threshold: 0, rootMargin: "180px 0px 180px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Shared expandable section header ────────────────────────────── */
  const expandableHeader = (label: string, accentClass?: string) => (
    <div className="w-full flex items-center justify-between mb-1.5">
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] tracking-wide font-semibold uppercase ${
          accentClass ?? "bg-muted/70 text-muted-foreground"
        }`}>
          {label}
        </span>
        <span
          className={`text-[11px] font-semibold text-muted-foreground/90 tracking-wide uppercase motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out ${isOpen ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"}`}
          aria-hidden={isOpen}
        >
          See more
        </span>
      </div>
      <ChevronDown
        className={`h-4 w-4 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200 ${isOpen ? "rotate-180" : ""}`}
        aria-hidden
      />
    </div>
  );

  /* ── Stack view ──────────────────────────────────────────────────── */
  const stackContent = (
    <>
      <div className="mb-4">
        <p className="text-sm text-foreground leading-relaxed">
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted/70 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground mr-2 align-middle">
            Project:
          </span>
          {project.whatItIs}
        </p>
      </div>

      <div className="flex items-start gap-x-[1.9px] gap-y-3 mb-4 flex-wrap" role="list" aria-label="Technology stack">
        {visibleIcons.map((tech, idx) => (
          <div key={idx} role="listitem" className="flex flex-col items-center gap-1 w-14">
            <TechIcon
              name={tech.name}
              icon={tech.icon}
              iconDark={tech.iconDark}
              invertOnDark={tech.invertOnDark}
              svgPath={tech.svgPath}
              size={30}
            />
            <span className="text-[11px] text-muted-foreground text-center leading-snug">{tech.name}</span>
          </div>
        ))}
        {hiddenCount > 0 && (
          <span
            className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded self-center"
            title={allIcons.slice(MAX_ICONS).map(t => t.name).join(", ")}
          >
            +{hiddenCount}
          </span>
        )}
      </div>

      <div className="mb-4">
        {expandableHeader("Key Challenges:")}
        <div
          id={expandId}
          className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300 motion-safe:ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          aria-hidden={!isOpen}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1.5 text-sm text-foreground pt-1">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-accent mr-2 select-none">-</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm leading-relaxed text-foreground">
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted/70 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground mr-2 align-middle">
            Impact:
          </span>
          <span className="font-semibold text-accent">{project.impact}</span>
        </p>
      </div>
    </>
  );

  /* ── API view ────────────────────────────────────────────────────── */
  const hasApis = project.apis.length > 0;
  const hasIntegrations = project.integrations.length > 0;
  const hasDbs = project.databases.length > 0;

  const apiContent = (
    <>
      {hasApis && (
        <div className="mb-4">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] uppercase tracking-wide font-semibold mb-2 ${theme.accentText} bg-current/5`}>
            APIs:
          </span>
          <div className="flex items-start gap-x-[1.9px] gap-y-3 flex-wrap" role="list" aria-label="APIs used">
            {project.apis.map((api, idx) => (
              <div key={idx} role="listitem" className="flex flex-col items-center gap-1 w-14">
                <TechIcon
                  name={api.name}
                  icon={api.icon}
                  iconDark={api.iconDark}
                  invertOnDark={api.invertOnDark}
                  svgPath={api.svgPath}
                  size={30}
                />
                <span className="text-[11px] text-muted-foreground text-center leading-snug">{api.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasIntegrations && (
        <div className="mb-4">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] uppercase tracking-wide font-semibold mb-2 ${theme.accentText} bg-current/5`}>
            Integrations:
          </span>
          <div className="flex items-start gap-x-[1.9px] gap-y-3 flex-wrap" role="list" aria-label="Integrations used">
            {project.integrations.map((item, idx) => (
              <div key={idx} role="listitem" className="flex flex-col items-center gap-1 w-14">
                <TechIcon
                  name={item.name}
                  icon={item.icon}
                  iconDark={item.iconDark}
                  invertOnDark={item.invertOnDark}
                  svgPath={item.svgPath}
                  size={30}
                />
                <span className="text-[11px] text-muted-foreground text-center leading-snug">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasDbs && (
        <div className="mb-4">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] uppercase tracking-wide font-semibold mb-2 ${theme.accentText} bg-current/5`}>
            Databases:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.databases.map((db, idx) => (
              <div key={idx} className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${dbTypeColor[db.type]}`}>
                <div className="shrink-0 w-5 h-5">
                  <TechIcon
                    name={db.name}
                    icon={db.icon}
                    iconDark={db.iconDark}
                    invertOnDark={db.invertOnDark}
                    svgPath={db.svgPath}
                    size={20}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold leading-tight">{db.name}</span>
                  <span className="text-[10px] opacity-75 leading-tight">{db.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm leading-relaxed text-foreground">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] uppercase tracking-wide font-semibold mr-2 align-middle ${theme.accentText} bg-current/5`}>
            Result:
          </span>
          <span className={`font-semibold ${theme.accentText}`}>
            {project.impact}
          </span>
        </p>
      </div>

      <div className="mb-4">
        {expandableHeader("More Details:", `${theme.accentText} bg-current/5`)}
        <div
          id={`${expandId}-details`}
          className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300 motion-safe:ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          aria-hidden={!isOpen}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 pt-1">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted/70 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground mr-2 align-middle">
                  Project:
                </span>
                {project.whatItIs}
              </p>

              {hasApis && (
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted/70 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground mb-1.5">
                    What each API does:
                  </span>
                  <ul className="space-y-1.5 text-sm text-foreground pt-1">
                    {project.apis.map((api, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`mr-2 select-none ${theme.accentText}`}>&#x203A;</span>
                        <span>
                          <span className="font-semibold">{api.name}</span>
                          <span className="text-muted-foreground"> &#x2192; {api.purpose}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hasIntegrations && (
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-muted/70 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground mb-1.5">
                    What each integration does:
                  </span>
                  <ul className="space-y-1.5 text-sm text-foreground pt-1">
                    {project.integrations.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`mr-2 select-none ${theme.accentText}`}>&#x203A;</span>
                        <span>
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-muted-foreground"> &#x2192; {item.purpose}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Card
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={expandId}
      onClick={() => setIsOpen((prev) => !prev)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }}
      className={`h-full overflow-hidden shadow-md hover:shadow-2xl transform motion-safe:hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:transition-all motion-safe:duration-300 ${
        isApiView
          ? `${theme.border} bg-gradient-to-br ${theme.gradient}`
          : "border-border hover:border-accent bg-gradient-to-br from-muted/5 to-transparent"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      style={{
        transitionDelay: isVisible && clampedDelay ? `${clampedDelay}s` : "0s",
      }}
    >
      {/* ── Image ──────────────────────────────────────────────────── */}
      <div className="w-full h-48 overflow-hidden bg-muted relative">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover motion-safe:hover:scale-105 motion-safe:transition-transform motion-safe:duration-300"
          loading="lazy"
          width={1200}
          height={768}
        />
        <span
          className={`absolute inset-0 pointer-events-none motion-safe:transition-opacity motion-safe:duration-300 bg-gradient-to-b from-transparent to-black/5 ${isApiView ? "opacity-0" : "opacity-100"}`}
          aria-hidden
        />
        <span
          className={`absolute inset-0 pointer-events-none motion-safe:transition-opacity motion-safe:duration-300 bg-gradient-to-t ${theme.imageOverlay} ${isApiView ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        />
        <div
          className={`absolute bottom-3 left-3 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out ${isApiView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
        >
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ${theme.badge}`}>
            <ScopeIcon className="w-4 h-4" />
            {project.scopeType}
          </span>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 font-heading">{project.title}</h3>

        <div className={`mb-4 p-3 rounded motion-safe:transition-colors motion-safe:duration-300 ${
          isApiView
            ? `bg-gradient-to-r ${theme.gradient} border-l-4 ${theme.border}`
            : "bg-accent/5 border-l-4 border-accent"
        }`}>
          {project.employer && (
            <p className={`text-base font-semibold mb-1 motion-safe:transition-colors motion-safe:duration-300 ${isApiView ? theme.accentText : "text-accent"}`}>
              {project.employer}
            </p>
          )}
          <p className="text-base font-medium text-foreground">{project.role}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{project.date}</span>
            </span>
            {duration && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/70 text-[11px] font-semibold text-muted-foreground">
                <Clock className="w-3 h-3" />
                {duration}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/70 text-[11px] font-semibold text-muted-foreground">
              <TeamIcon className="w-3 h-3" />
              {project.teamSize}
            </span>
          </div>
        </div>

        {/* ── Crossfade between Stack ↔ API content ─────────────────── */}
        <div className="relative">
          <div
            className={`motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out ${
              isApiView
                ? "opacity-0 scale-[0.97] absolute inset-0 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
            aria-hidden={isApiView}
          >
            {stackContent}
          </div>
          <div
            className={`motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out ${
              isApiView
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[0.97] absolute inset-0 pointer-events-none"
            }`}
            aria-hidden={!isApiView}
          >
            {apiContent}
          </div>
        </div>

        {/* ── Links ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.links.live && (
            <Button
              variant="default"
              size="sm"
              className="motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lg"
              asChild
            >
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Live
              </a>
            </Button>
          )}
          {project.links.demo && (
            <Button variant="default" size="sm" asChild>
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
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
                onClick={(event) => event.stopPropagation()}
              >
                <Github className="w-4 h-4 mr-1.5" />
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
              className="bg-muted text-foreground/70 border-muted hover:bg-muted/95 disabled:opacity-80"
            >
              <Lock className="w-4 h-4 mr-1.5" />
              <span className="text-xs text-foreground/70">
                {project.links.private || "Private"}
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
