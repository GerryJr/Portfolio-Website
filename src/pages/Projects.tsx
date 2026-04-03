import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { ProjectCard, ViewMode } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { ScopeType, FilterTag } from "@/types/project";
import {
  Layers, Plug, X, SlidersHorizontal,
  Layers as FullStackIcon, Monitor, Server, Database,
} from "lucide-react";

/* ── Filter config ───────────────────────────────────────────────────── */

type FilterCategory = {
  label: string;
  options: { value: string; label: string; count: number }[];
};

const scopeIcon: Record<ScopeType, typeof Layers> = {
  "Full Stack": FullStackIcon,
  "Frontend": Monitor,
  "Backend": Server,
  "Data": Database,
};

const scopeColor: Record<ScopeType, string> = {
  "Full Stack": "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-400/30",
  "Frontend": "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-400/30",
  "Backend": "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/30",
  "Data": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/30",
};

const scopeColorActive: Record<ScopeType, string> = {
  "Full Stack": "bg-violet-500 text-white border-violet-500",
  "Frontend": "bg-sky-500 text-white border-sky-500",
  "Backend": "bg-amber-500 text-white border-amber-500",
  "Data": "bg-emerald-500 text-white border-emerald-500",
};

const allScopes: ScopeType[] = ["Full Stack", "Frontend", "Backend", "Data"];

const allFilterTags: FilterTag[] = [
  "AWS", "Google Cloud", "Cloudflare", "Supabase",
  "React", "Python", "JavaScript", "R", "Mobile",
];

/* ── Component ───────────────────────────────────────────────────────── */

const Projects = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("stack");
  const [activeScope, setActiveScope] = useState<ScopeType | null>(null);
  const [activeTags, setActiveTags] = useState<Set<FilterTag>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  /* ── Sliding indicator ─────────────────────────────────────────── */
  const toggleRef = useRef<HTMLDivElement>(null);
  const stackBtnRef = useRef<HTMLButtonElement>(null);
  const apisBtnRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});

  const updateSlider = useCallback(() => {
    const container = toggleRef.current;
    const activeBtn = viewMode === "stack" ? stackBtnRef.current : apisBtnRef.current;
    if (!container || !activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    setSliderStyle({
      width: btnRect.width,
      transform: `translateX(${btnRect.left - containerRect.left}px)`,
    });
  }, [viewMode]);

  useEffect(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);

  /* ── Compute tag counts ────────────────────────────────────────── */
  const tagCategories = useMemo<FilterCategory[]>(() => {
    const countTag = (tag: FilterTag) =>
      projects.filter((p) => p.tags.includes(tag)).length;

    const platforms = (["AWS", "Google Cloud", "Cloudflare", "Supabase"] as FilterTag[])
      .map((t) => ({ value: t, label: t, count: countTag(t) }))
      .filter((t) => t.count > 0);

    const tech = (["React", "Python", "JavaScript", "R", "Mobile"] as FilterTag[])
      .map((t) => ({ value: t, label: t, count: countTag(t) }))
      .filter((t) => t.count > 0);

    return [
      { label: "Platform", options: platforms },
      { label: "Tech", options: tech },
    ];
  }, []);

  const scopeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of allScopes) {
      counts[s] = projects.filter((p) => p.scopeType === s).length;
    }
    return counts;
  }, []);

  /* ── Filter projects ───────────────────────────────────────────── */
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeScope && p.scopeType !== activeScope) return false;
      if (activeTags.size > 0) {
        for (const tag of activeTags) {
          if (!p.tags.includes(tag)) return false;
        }
      }
      return true;
    });
  }, [activeScope, activeTags]);

  const hasFilters = activeScope !== null || activeTags.size > 0;
  const filterCount = (activeScope ? 1 : 0) + activeTags.size;

  const toggleTag = (tag: FilterTag) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearFilters = () => {
    setActiveScope(null);
    setActiveTags(new Set());
  };

  /* ── Masonry columns from filtered projects ────────────────────── */
  const columns = useMemo(() => {
    const left: typeof projects = [];
    const right: typeof projects = [];

    const estimateHeight = (project: (typeof projects)[number]) => {
      return (
        200 +
        project.challenges.length * 28 +
        project.stackIcons.length * 4 +
        project.whatItIs.length * 0.05
      );
    };

    filtered.forEach((project) => {
      const leftHeight = left.reduce((sum, p) => sum + estimateHeight(p), 0);
      const rightHeight = right.reduce((sum, p) => sum + estimateHeight(p), 0);

      if (leftHeight <= rightHeight) {
        left.push(project);
      } else {
        right.push(project);
      }
    });

    return [left, right];
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-3">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Software projects built across professional roles, academic research positions, and commissioned work.
          </p>
        </div>

        {/* ── Segmented toggle ────────────────────────────────────────── */}
        <div
          ref={toggleRef}
          className="relative inline-flex items-center rounded-xl bg-muted/80 backdrop-blur-sm p-1 shrink-0 self-start border border-border/50 shadow-sm"
          role="radiogroup"
          aria-label="Card view mode"
        >
          <div
            className="absolute top-1 left-0 h-[calc(100%-0.5rem)] rounded-lg bg-background shadow-md motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out"
            style={sliderStyle}
            aria-hidden
          />
          <button
            ref={stackBtnRef}
            role="radio"
            aria-checked={viewMode === "stack"}
            onClick={() => setViewMode("stack")}
            className={`relative z-10 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold motion-safe:transition-colors motion-safe:duration-200 ${
              viewMode === "stack" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            <Layers className="w-4 h-4" />
            Stack
          </button>
          <button
            ref={apisBtnRef}
            role="radio"
            aria-checked={viewMode === "apis"}
            onClick={() => setViewMode("apis")}
            className={`relative z-10 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold motion-safe:transition-colors motion-safe:duration-200 ${
              viewMode === "apis" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            <Plug className="w-4 h-4" />
            APIs & Scope
          </button>
        </div>
      </header>

      {/* ── Scope chips (always visible in API view — serves as legend + filter) ── */}
      <div
        className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300 motion-safe:ease-out ${
          viewMode === "apis" ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0 mb-0"
        }`}
        aria-hidden={viewMode !== "apis"}
        // @ts-expect-error -- inert keeps hidden chips out of tab order
        inert={viewMode === "apis" ? undefined : ""}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 pb-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mr-1">Scope:</span>
            {allScopes.map((scope) => {
              const isActive = activeScope === scope;
              const Icon = scopeIcon[scope];
              return (
                <button
                  key={scope}
                  onClick={() => setActiveScope(isActive ? null : scope)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all motion-safe:duration-200 cursor-pointer select-none active:scale-[0.96] ${
                    isActive ? scopeColorActive[scope] : scopeColor[scope] + " hover:opacity-80"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {scope}
                  <span className={`text-[10px] ${isActive ? "opacity-80" : "opacity-60"}`}>
                    {scopeCounts[scope]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Filter toggle button + collapsible panel ────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border motion-safe:transition-all motion-safe:duration-200 cursor-pointer select-none active:scale-[0.97] ${
              showFilters || hasFilters
                ? "bg-foreground text-background border-foreground"
                : "bg-muted/60 text-foreground/80 border-border/50 hover:border-border"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-background/20 text-[11px] font-bold">
                {filterCount}
              </span>
            )}
          </button>

          {/* Active filter summary + clear */}
          {hasFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground tabular-nums">
                {filtered.length} of {projects.length}
              </span>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground motion-safe:transition-colors motion-safe:duration-200 rounded cursor-pointer"
                aria-label="Clear all filters"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Collapsible filter panel */}
        <div
          id="filter-panel"
          role="region"
          aria-label="Project filters"
          // @ts-expect-error -- React 19 supports inert natively; older types lack it
          inert={showFilters ? undefined : ""}
          className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300 motion-safe:ease-out ${
            showFilters ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              {/* Scope filters — only inside panel when in Stack view (in API view they're above) */}
              {viewMode === "stack" && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mr-1">Scope:</span>
                  {allScopes.map((scope) => {
                    const isActive = activeScope === scope;
                    const Icon = scopeIcon[scope];
                    return (
                      <button
                        key={scope}
                        onClick={() => setActiveScope(isActive ? null : scope)}
                        aria-pressed={isActive}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all motion-safe:duration-200 cursor-pointer select-none active:scale-[0.96] ${
                          isActive ? scopeColorActive[scope] : scopeColor[scope] + " hover:opacity-80"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {scope}
                        <span className={`text-[10px] ${isActive ? "opacity-80" : "opacity-60"}`}>
                          {scopeCounts[scope]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tech/platform filters */}
              {tagCategories.map((cat) => (
                <div key={cat.label} className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mr-1">{cat.label}:</span>
                  {cat.options.map((opt) => {
                    const isActive = activeTags.has(opt.value as FilterTag);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleTag(opt.value as FilterTag)}
                        aria-pressed={isActive}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border motion-safe:transition-all motion-safe:duration-200 cursor-pointer select-none active:scale-[0.96] ${
                          isActive
                            ? "bg-foreground text-background border-foreground"
                            : "bg-muted/60 text-foreground/80 border-border/50 hover:border-border"
                        }`}
                      >
                        {opt.label}
                        <span className={`text-[10px] ${isActive ? "opacity-80" : "opacity-50"}`}>
                          {opt.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cards ────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No projects match these filters</p>
          <button onClick={clearFilters} className="text-sm text-accent hover:underline cursor-pointer">
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="md:hidden space-y-6">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} delay={idx * 0.12} viewMode={viewMode} />
            ))}
          </div>

          <div className="hidden md:flex md:gap-6 lg:gap-8 items-start">
            {columns.map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col gap-6 lg:gap-8">
                {col.map((project, projectIdx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    delay={projectIdx * 0.12 + (idx === 1 ? 0.06 : 0)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
