import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ExternalLink, Lock } from "lucide-react";
import {
  type Project,
  type TechIcon as TechIconType,
  formatDateLabel,
} from "@/types/project";
import { TechIcon } from "@/components/TechIcon";
import { CloseButton } from "@/components/CloseButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SCOPE_COLORS } from "@/lib/scope";
import {
  CATEGORY_COLOR_CLASS,
  CATEGORY_LABELS,
  categorize,
} from "@/lib/tech-category";

/* ──────────────────────────────────────────────────────────────────
   DeepDiveTimeline — alternating vertical timeline with a
   "stage clear → camera dolly → near-fullscreen detail" expansion.
   Ported from handoffs/New Deepdive/deep-dive-push-aside. The page
   header magnify is opt-in via CSS that keys off `.page:has(.tl-a.is-staging)`,
   so the parent page must wrap its container in `<div className="page">`
   and the header in `<div className="page-header">`.
   ──────────────────────────────────────────────────────────────── */

interface DeepDiveTimelineProps {
  items: Project[];
}

interface OriginRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Must match the `tla-card-out` keyframe duration in index.css — controls
// how long the close animation has to play before we unmount the overlay.
const CLOSE_DURATION_MS = 440;

const dateYear = (label: string): string => {
  const head = label.split(/→|—|-/)[0]?.trim() ?? "";
  const match = head.match(/\b(20\d{2}|19\d{2})\b/);
  return match ? match[1] : (head.split(/\s+/).pop() ?? "");
};

/** Merge stack + apis + databases into a single deduped list of TechIcon objects
 *  (keeps the rich icon data — `iconUrl`, `invertOnDark`, etc. — that the bare
 *  string-list approach in the handoff threw away). */
const fullTechList = (p: Project): TechIconType[] => {
  const seen = new Set<string>();
  const out: TechIconType[] = [];
  const push = (t: TechIconType) => {
    if (seen.has(t.name)) return;
    seen.add(t.name);
    out.push(t);
  };
  p.stackIcons.forEach(push);
  p.apis.forEach((a) =>
    push({
      name: a.name,
      icon: a.icon,
      iconDark: a.iconDark,
      invertOnDark: a.invertOnDark,
      svgPath: a.svgPath,
    }),
  );
  p.databases.forEach((d) =>
    push({
      name: d.name.replace(/\s*\(.+\)/, ""),
      icon: d.icon,
      iconDark: d.iconDark,
      invertOnDark: d.invertOnDark,
      svgPath: d.svgPath,
    }),
  );
  return out;
};

/* ── Slim card (collapsed row) ────────────────────────────────────── */

interface CollapsedCardProps {
  project: Project;
  onOpen: (e: ReactMouseEvent<HTMLButtonElement>) => void;
}

const CollapsedCard = ({ project, onOpen }: CollapsedCardProps) => {
  const stack = useMemo(() => fullTechList(project), [project]);
  const subtitle = project.client || project.employer || "Independent";
  const label = project.dateLabel ?? formatDateLabel(project.date);

  return (
    <button
      type="button"
      className="tl-a-card tl-a-card--slim"
      onClick={onOpen}
      aria-label={`Open ${project.title}`}
    >
      <div className="slim-thumb">
        <img src={project.image} alt="" loading="lazy" />
      </div>
      <div className="slim-body">
        <div className="slim-meta">
          <span className="font-mono">{label}</span>
          <span aria-hidden="true">·</span>
          <span>{subtitle}</span>
        </div>
        <h3 className="slim-title">{project.title}</h3>
        <p className="slim-sub">{project.whatItIs}</p>
        <div className="slim-stack">
          {stack.slice(0, 8).map((t) => (
            <span key={t.name} className="slim-tech" title={t.name}>
              <TechIcon {...t} size={18} />
            </span>
          ))}
          {stack.length > 8 && (
            <span className="slim-more font-mono">+{stack.length - 8}</span>
          )}
        </div>
      </div>
      <div className="slim-cta">
        <span className="slim-open font-mono">Open</span>
        <span className="slim-plus" aria-hidden="true">+</span>
      </div>
    </button>
  );
};

/* ── Expanded overlay (near-fullscreen detail) ────────────────────── */

interface ExpandedOverlayProps {
  project: Project;
  side: "left" | "right";
  originRect: OriginRect | null;
  closing: boolean;
  onClose: () => void;
}

const ExpandedOverlay = ({
  project,
  side,
  originRect,
  closing,
  onClose,
}: ExpandedOverlayProps) => {
  const stack = useMemo(() => fullTechList(project), [project]);
  const grouped = useMemo(() => categorize(stack), [stack]);
  const subtitle = project.client || project.employer || "Independent";
  const label = project.dateLabel ?? formatDateLabel(project.date);
  const scopeColors = SCOPE_COLORS[project.scopeType];

  /** Compute FLIP variables from the clicked card's rect to the final overlay rect.
   *  Mirrors the CSS rule `width: min(1440px, 94vw); height: min(880px, 88vh)`. */
  const vars = useMemo<CSSProperties>(() => {
    if (!originRect || typeof window === "undefined") return {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const finalW = Math.min(1440, vw * 0.94);
    const finalH = Math.min(880, vh * 0.88);
    const finalX = (vw - finalW) / 2;
    const finalY = (vh - finalH) / 2;
    const dx = originRect.x + originRect.w / 2 - (finalX + finalW / 2);
    const dy = originRect.y + originRect.h / 2 - (finalY + finalH / 2);
    const sx = Math.max(0.12, originRect.w / finalW);
    const sy = Math.max(0.12, originRect.h / finalH);
    return {
      ["--tx" as string]: `${dx}px`,
      ["--ty" as string]: `${dy}px`,
      ["--sx" as string]: String(sx),
      ["--sy" as string]: String(sy),
    };
  }, [originRect]);

  // Focus management: move focus into the dialog on open and trap Tab within
  // it (aria-modal hides the background from assistive tech; this keeps the
  // keyboard there too). Focus is restored to the triggering card by the
  // parent's close handler.
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    node.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className={cn("tla-overlay", closing && "is-closing")}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      style={vars}
    >
      <div className={cn("tla-card", `tla-card--side-${side}`)}>
        <CloseButton
          onClick={onClose}
          className="absolute top-[18px] right-[18px] z-[4] max-[760px]:top-3 max-[760px]:right-3"
        />

        {/* LEFT pane: cinematic 21:9 banner image up top, Stack section below
            it. Acts as the visual cue — the image anchors the eye, the stack
            icons fill the rest of the column with their own visual rhythm. */}
        <aside className="exp-pane exp-pane--media">
          <div
            className="exp-media exp-media--banner stagger"
            style={{ ["--d" as string]: "120ms" }}
          >
            <img
              src={project.image}
              alt={project.title}
              decoding="async"
              loading="eager"
            />
          </div>

          <div className="exp-row stagger" style={{ ["--d" as string]: "200ms" }}>
            <span className="exp-label font-mono">
              Stack
              <span className="ml-2 opacity-60">({stack.length})</span>
            </span>
            <div className="exp-stack">
              {grouped.map(({ cat, items }) => (
                <div key={cat} className="exp-stack-row">
                  <span
                    className={cn(
                      "exp-stack-label font-mono",
                      CATEGORY_COLOR_CLASS[cat],
                    )}
                  >
                    {CATEGORY_LABELS[cat]}
                  </span>
                  <div className="exp-stack-icons">
                    {items.map((t) => (
                      <span key={t.name} className="exp-stack-cell" title={t.name}>
                        <TechIcon {...t} size={22} />
                        <span className="exp-stack-name">{t.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT pane: title and supporting copy. Title gets reserved
            padding-right via CSS so the close button can sit in the corner
            without clipping long titles. */}
        <div className="exp-pane exp-pane--body">
          <div className="exp-head stagger" style={{ ["--d" as string]: "80ms" }}>
            <div className="exp-head-meta">
              <span className="exp-eyebrow font-mono">
                <span>{label}</span>
                <span className="dot" aria-hidden="true" />
                <span>{subtitle}</span>
              </span>
            </div>
            <h2 className="exp-title">{project.title}</h2>
          </div>

          <div className="exp-row stagger" style={{ ["--d" as string]: "160ms" }}>
            <span className="exp-label font-mono">Project</span>
            <p className="exp-text">{project.recruiterSummary}</p>
          </div>

          {project.challenges.length > 0 && (
            <div
              className="exp-row stagger"
              style={{ ["--d" as string]: "240ms" }}
            >
              <span className="exp-label font-mono">Challenges</span>
              <ul className="exp-list">
                {project.challenges.slice(0, 3).map((c, i) => (
                  <li
                    key={i}
                    style={{ animationDelay: `${200 + i * 70}ms` }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.takeaway && (
            <div className="exp-row stagger" style={{ ["--d" as string]: "320ms" }}>
              <span className="exp-label font-mono">Takeaway</span>
              <p className="exp-text exp-takeaway">{project.takeaway}</p>
            </div>
          )}
        </div>

        {/* Full-width footer band spans both panes. */}
        <div className="exp-footer stagger" style={{ ["--d" as string]: "400ms" }}>
          <div className="exp-chips">
            <span
              className={cn(
                "chip font-mono inline-flex items-center gap-1.5",
                scopeColors.chip,
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", scopeColors.dot)} />
              {project.scopeType}
            </span>
            {project.role && <span className="chip font-mono">{project.role}</span>}
            <span className="chip font-mono">
              {project.teamSize === "Solo" ? "Solo build" : "Team"}
            </span>
          </div>
          <PrimaryLink project={project} />
        </div>
      </div>
    </div>
  );
};

/* ── Primary CTA (Visit / Demo / Repo / Private fallback) ─────────── */

const PrimaryLink = ({ project }: { project: Project }) => {
  const { live, demo, repo, private: priv } = project.links;
  if (live) {
    return (
      <Button asChild>
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="mr-1.5" />
          Visit site
        </a>
      </Button>
    );
  }
  if (demo) {
    return (
      <Button asChild>
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="mr-1.5" />
          View demo
        </a>
      </Button>
    );
  }
  if (repo) {
    return (
      <Button variant="secondary" asChild>
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="mr-1.5" />
          Repo
        </a>
      </Button>
    );
  }
  return (
    <Button variant="outline" disabled aria-disabled="true">
      <Lock className="mr-1.5" />
      {priv ?? "Private"}
    </Button>
  );
};

/* ── Main component ────────────────────────────────────────────────── */

export const DeepDiveTimeline = ({ items }: DeepDiveTimelineProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<OriginRect | null>(null);
  const [closing, setClosing] = useState(false);

  // The card that opened the overlay, so focus can return to it on close.
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const prevActiveRef = useRef<string | null>(null);

  const active = activeId ? items.find((p) => p.id === activeId) ?? null : null;
  const activeIdx = activeId ? items.findIndex((p) => p.id === activeId) : -1;
  const activeSide: "left" | "right" = activeIdx % 2 === 0 ? "left" : "right";

  const open = (id: string, rect: OriginRect) => {
    setOriginRect(rect);
    setActiveId(id);
    setClosing(false);
  };

  /** Open the overlay from a clicked card. The FLIP keyframe anchors at the
   *  card's current rect, so the zoom grows out of wherever the user clicked
   *  — no scroll pre-roll, no setTimeout race, just measure-and-fire. */
  const openFromButton = (id: string, button: HTMLButtonElement) => {
    // Ignore clicks while an overlay is mounted (open or mid-close); the user
    // has to wait for the close to finish before reopening. Otherwise the new
    // overlay mounts with `is-closing` styles and plays the exit keyframes.
    if (activeId || closing) return;
    triggerRef.current = button;
    const rect = button.getBoundingClientRect();
    open(id, { x: rect.left, y: rect.top, w: rect.width, h: rect.height });
  };

  const close = () => {
    setClosing(true);
    window.setTimeout(() => {
      setActiveId(null);
      setClosing(false);
      setOriginRect(null);
    }, CLOSE_DURATION_MS);
  };

  // Esc-to-close + body scroll lock while overlay is open.
  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeId]);

  // Restore focus to the triggering card once the overlay has fully closed.
  useEffect(() => {
    if (prevActiveRef.current && !activeId) {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
    prevActiveRef.current = activeId;
  }, [activeId]);

  return (
    <>
      {/* `is-staging` is dropped as soon as `closing` flips true so the
          timeline rows, page header, and vertical rail can start animating
          back in parallel with the card's zoom-out instead of waiting for
          it to finish. Without this, the user sees a ~440ms gap where the
          card is shrinking but the timeline is still empty. */}
      <div className={cn("tl-a", activeId && !closing && `is-staging side-${activeSide}`)}>
        {items.map((project, i) => {
          const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
          const label = project.dateLabel ?? formatDateLabel(project.date);
          const y = dateYear(label);
          const prevLabel =
            i > 0
              ? items[i - 1].dateLabel ?? formatDateLabel(items[i - 1].date)
              : null;
          const prevY = prevLabel ? dateYear(prevLabel) : null;
          const showYear = y !== prevY;
          const isActive = project.id === activeId;
          const isClearing = activeId !== null && !isActive;
          const distance = activeIdx >= 0 ? Math.abs(i - activeIdx) : 0;
          const clearDelay = isClearing ? Math.max(0, (distance - 1) * 70) : 0;

          return (
            <article
              key={project.id}
              className={cn(
                "tl-a-row",
                side,
                isActive && "is-active",
                isClearing && `is-clearing clear-${side}`,
                showYear ? "has-year" : "no-year",
              )}
              data-scope={project.scopeType}
              style={{ ["--clear-d" as string]: `${clearDelay}ms` }}
            >
              {showYear && <span className="tl-a-year font-mono">{y}</span>}
              <span className="tl-a-node" aria-hidden="true" />
              <CollapsedCard
                project={project}
                onOpen={(e) => openFromButton(project.id, e.currentTarget)}
              />
            </article>
          );
        })}
      </div>

      {active && (
        <ExpandedOverlay
          project={active}
          side={activeSide}
          originRect={originRect}
          closing={closing}
          onClose={close}
        />
      )}
    </>
  );
};
