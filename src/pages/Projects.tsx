import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProjectCard, ProjectView } from "@/components/ProjectCard";
import { DeepDiveTimeline } from "@/components/DeepDiveTimeline";
import { Eyebrow } from "@/components/Eyebrow";
import { SegmentedToggle, type SegmentedToggleOption } from "@/components/SegmentedToggle";
import { projects } from "@/data/projects";
import { commissions } from "@/data/commissions";
import { ScopeType, FilterTag } from "@/types/project";
import { SCOPE_COLORS, SCOPE_ICONS, SCOPES } from "@/lib/scope";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSessionMemo } from "@/hooks/use-session-memo";
import { Check, Eye, Handshake, Layers, X, SlidersHorizontal } from "lucide-react";

/* ── Filter config ───────────────────────────────────────────────────── */

type FilterCategory = {
  label: string;
  options: { value: string; label: string; count: number }[];
};

const viewOptions: SegmentedToggleOption<ProjectView>[] = [
  { value: "overview", label: "Overview", icon: Eye },
  { value: "deep", label: "Deep Dive", icon: Layers },
];

/** Parses the end (or only) date out of a project's `date` field for sorting.
 *  Handles ranges ("Jun 2025 - Jan 2026"), open-ended ranges ("Feb 2026 -
 *  Present"), and single dates ("March 2024"). Returns 0 when the date
 *  string is unparseable so malformed entries sink to the bottom instead
 *  of throwing. */
const endDateOf = (project: { date?: string }): number => {
  const raw = project.date ?? "";
  if (!raw) return 0;
  const parts = raw.split(/\s*-\s*/);
  const end = parts[parts.length - 1].trim();
  if (end.toLowerCase() === "present") return Date.now();
  const d = new Date(end);
  return isNaN(d.getTime()) ? 0 : d.getTime();
};

/* ── Component ───────────────────────────────────────────────────────── */

const Projects = () => {
  usePageTitle("Projects");
  // View choice persists across in-app navigation but resets on hard refresh
  // — module-level memo, not sessionStorage.
  const [view, setView] = useSessionMemo<ProjectView>("projects:view", "overview");
  const [activeScope, setActiveScope] = useState<ScopeType | null>(null);
  const [activeTags, setActiveTags] = useState<Set<FilterTag>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  // Inverted semantics so the default UI state shows zero active filters:
  // commissions are *included* by default (the most complete view of work),
  // and the visitor can opt IN to a filter that removes them. Storing as
  // "exclude" instead of "include" means the filter count is naturally 0
  // until the user actively toggles it on.
  const [excludeCommissions, setExcludeCommissions] = useState(false);

  /** Source list driving every other derived state on the page. Concatenates
   *  commissions by default; drops them only when the visitor explicitly
   *  excludes them. Sorted by end-date (most recent first) so the timeline
   *  reads chronologically regardless of which array the entry came from. */
  const sourceProjects = useMemo(() => {
    const merged = excludeCommissions ? [...projects] : [...projects, ...commissions];
    return merged.sort((a, b) => endDateOf(b) - endDateOf(a));
  }, [excludeCommissions]);

  // Apply incoming filter from "Filed Under" chips on Deep Dive cards.
  // Consume the state once via navigate(..., { replace: true }) so a refresh
  // doesn't re-trigger it.
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const incoming = (location.state as { filterTag?: FilterTag } | null)?.filterTag;
    if (!incoming) return;
    setActiveTags(new Set([incoming]));
    setShowFilters(true);
    navigate(location.pathname, { replace: true, state: null });
  }, [location, navigate]);

  /* ── Compute tag counts ────────────────────────────────────────── */
  const tagCategories = useMemo<FilterCategory[]>(() => {
    const countTag = (tag: FilterTag) =>
      sourceProjects.filter((p) => p.tags.includes(tag)).length;

    const platforms = (["AWS", "Google Cloud", "Cloudflare", "Supabase"] as FilterTag[])
      .map((t) => ({ value: t, label: t, count: countTag(t) }))
      .filter((t) => t.count > 0);

    const languages = (["Python", "JavaScript / TypeScript", "R"] as FilterTag[])
      .map((t) => ({ value: t, label: t, count: countTag(t) }))
      .filter((t) => t.count > 0);

    const tech = (["React", "Mobile"] as FilterTag[])
      .map((t) => ({ value: t, label: t, count: countTag(t) }))
      .filter((t) => t.count > 0);

    return [
      { label: "Platform", options: platforms },
      { label: "Languages", options: languages },
      { label: "Tech", options: tech },
    ];
  }, [sourceProjects]);

  const scopeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of SCOPES) {
      counts[s] = sourceProjects.filter((p) => p.scopeType === s).length;
    }
    return counts;
  }, [sourceProjects]);

  // Drop scope chips that have no projects so the filter row doesn't show
  // dead options. (Tag chips already filter themselves above.)
  const visibleScopes = useMemo(
    () => SCOPES.filter((s) => scopeCounts[s] > 0),
    [scopeCounts],
  );

  /* ── Filter projects ───────────────────────────────────────────── */
  const filtered = useMemo(() => {
    return sourceProjects.filter((p) => {
      if (activeScope && p.scopeType !== activeScope) return false;
      if (activeTags.size > 0) {
        for (const tag of activeTags) {
          if (!p.tags.includes(tag)) return false;
        }
      }
      return true;
    });
  }, [sourceProjects, activeScope, activeTags]);

  const hasFilters = activeScope !== null || activeTags.size > 0 || excludeCommissions;
  const filterCount =
    (activeScope ? 1 : 0) + activeTags.size + (excludeCommissions ? 1 : 0);

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
    setExcludeCommissions(false);
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
    // `page` + `page-header` classes are picked up by the deep-dive timeline's
    // CSS rule (`:has(.tl-a.is-staging)`) to magnify-and-fade the header out of
    // frame when a project card is focused.
    <div className="page max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500">
      <header className="page-header mb-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow className="mb-3">Projects · {sourceProjects.length} total</Eyebrow>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-[-0.02em] mb-3 text-foreground">Projects</h1>
          <p className="text-lg text-muted-foreground">
            Software projects built across professional roles, academic research positions, and commissioned work.
          </p>
        </div>

        <SegmentedToggle
          value={view}
          onChange={setView}
          ariaLabel="Card view mode"
          options={viewOptions}
        />
      </header>

      {/* ── Filter toggle button + collapsible panel ──────────────────
          `page-controls` is picked up by the same `:has(.tl-a.is-staging)`
          rule that dollies the header — keeps the filter bar from floating
          mid-screen while everything else retreats. */}
      <div className="page-controls mb-8">
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
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-background text-foreground text-[11px] font-bold tabular-nums">
                {filterCount}
              </span>
            )}
          </button>

          {/* Active filter summary + clear */}
          {hasFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground tabular-nums">
                {filtered.length} of {sourceProjects.length}
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
              {/* Narrowing modifier (top of panel). Phrased as an
                  *exclusion* so the default UI state — checkbox off — looks
                  like no filter is active even though commissions are
                  fully visible in the list. Dashed bottom rule separates
                  it from the scope/tag filters below. */}
              <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-dashed border-border/60">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mr-1">Source:</span>
                <button
                  type="button"
                  onClick={() => setExcludeCommissions((v) => !v)}
                  aria-pressed={excludeCommissions}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all motion-safe:duration-200 cursor-pointer select-none active:scale-[0.96] ${
                    excludeCommissions
                      ? "bg-foreground text-background border-foreground"
                      : "bg-muted/60 text-foreground/80 border-border/50 hover:border-border"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm border motion-safe:transition-colors motion-safe:duration-200 ${
                      excludeCommissions
                        ? "bg-background text-foreground border-background"
                        : "bg-transparent text-transparent border-current/70"
                    }`}
                  >
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <Handshake className="w-3.5 h-3.5" />
                  Exclude Commission Work
                  <span className="text-[11px] font-semibold tabular-nums opacity-80">
                    −{commissions.length}
                  </span>
                </button>
              </div>

              {/* Scope filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mr-1">Scope:</span>
                {visibleScopes.map((scope) => {
                  const isActive = activeScope === scope;
                  const Icon = SCOPE_ICONS[scope];
                  const colors = SCOPE_COLORS[scope];
                  return (
                    <button
                      key={scope}
                      onClick={() => setActiveScope(isActive ? null : scope)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all motion-safe:duration-200 cursor-pointer select-none active:scale-[0.96] ${
                        isActive ? colors.active : colors.chip + " hover:opacity-80"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {scope}
                      <span className="text-[11px] font-semibold tabular-nums">
                        {scopeCounts[scope]}
                      </span>
                    </button>
                  );
                })}
              </div>

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
                        <span className="text-[11px] font-semibold tabular-nums">
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

      {/* ── Cards ──────────────────────────────────────────────────────
          Both views are keyed so React swaps them on toggle; the wrapper
          re-runs its enter animation each time, giving the crossfade + slide.
          The empty-state shares the same wrapper so it animates in identically
          if filters land on nothing. */}
      {filtered.length === 0 ? (
        <div
          key="empty"
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:ease-out text-center py-16 text-muted-foreground"
        >
          <p className="text-lg font-medium mb-2">No projects match these filters</p>
          <button onClick={clearFilters} className="text-sm text-accent hover:underline cursor-pointer">
            Clear all filters
          </button>
        </div>
      ) : view === "deep" ? (
        <div
          key="deep"
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:ease-out"
        >
          <DeepDiveTimeline items={filtered} />
        </div>
      ) : (
        <div
          key="overview"
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:ease-out"
        >
          <div className="md:hidden space-y-6">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={idx * 0.12}
              />
            ))}
          </div>

          <div className="hidden md:flex md:gap-6 lg:gap-8 items-start">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col gap-6 lg:gap-8">
                {col.map((project, projectIdx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    delay={projectIdx * 0.12 + (colIdx === 1 ? 0.06 : 0)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
