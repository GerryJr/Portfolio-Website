import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Award, Clock, ExternalLink, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { CloseButton } from "@/components/CloseButton";
import type { Certification } from "@/types/certification";
import { cn } from "@/lib/utils";

interface CertificationsGridProps {
  items: Certification[];
}

/**
 * Cert grid with a row-anchored "feature panel" expansion — the same mirror
 * mechanic as /animation-test.html variant #03 (Pure Simple).
 *
 * Layout: cards are grouped into pairs, each pair rendered as its own 2-col
 * grid. When a card opens, its row's `grid-template-columns` animates from
 * `1fr 1fr` to either `1fr 0fr` (left-side open) or `0fr 1fr` (right-side
 * open), and the row's `gap` collapses to 0. The opened card's outer edge
 * is held in place by the grid's bounds, so:
 *
 *   • LEFT cards grow rightward (anchored at the row's left edge).
 *   • RIGHT cards grow leftward (anchored at the row's right edge).
 *
 * The non-opened sibling fades to opacity 0 as its column shrinks. No FLIP,
 * no order swap, no transform-origin tricks — the mirror is built into the
 * layout. Timings match animation-test.html variant #03 "Pure Simple":
 *   • Row width + gap, card opacity, preview height: 350ms cubic-bezier(0.42,0,0.58,1)
 *   • Preview content fade + slide:                  280ms same curve, 80ms delay
 *   • Footer (staged across open/close):             180ms emph-accel on open,
 *                                                    200ms decel + 220ms delay on close
 *
 * Mobile (<md): grid stays at 1 column. Opening a card just expands its
 * height; the mirror logic is a no-op since there's no horizontal partner.
 *
 * Esc, the X button, or clicking the open card again collapses it.
 */
export const CertificationsGrid = ({ items }: CertificationsGridProps) => {
  const { resolvedTheme, systemTheme } = useTheme();
  const isDark =
    (resolvedTheme === "system" ? systemTheme : resolvedTheme) === "dark";

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  // Preload each preview image after the page is interactive so the inline
  // preview is decoded and ready in the image cache by the time anyone
  // clicks. The PNG previews have known dimensions at parse time, so the
  // card's open animation can never trigger a layout shift.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const urls = items.map((c) => c.previewImage).filter((u): u is string => !!u);
    if (urls.length === 0) return;
    const links: HTMLLinkElement[] = [];
    const preload = () => {
      urls.forEach((href) => {
        if (document.head.querySelector(`link[rel="preload"][href="${href}"]`)) return;
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = href;
        document.head.appendChild(link);
        links.push(link);
      });
    };
    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    });
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (ric.requestIdleCallback) {
      idleId = ric.requestIdleCallback(preload, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(preload, 900);
    }
    return () => {
      if (idleId !== null) ric.cancelIdleCallback?.(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      links.forEach((l) => l.remove());
    };
  }, [items]);

  // Esc closes the expanded card.
  useEffect(() => {
    if (expandedIdx === null) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setExpandedIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedIdx]);

  const toggle = useCallback((idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  }, []);

  // Pair items into rows for the per-row mirror.
  const rows: Array<{
    left: Certification;
    right?: Certification;
    leftIdx: number;
    rightIdx: number;
  }> = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push({
      left: items[i],
      right: items[i + 1],
      leftIdx: i,
      rightIdx: i + 1,
    });
  }

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {rows.map((row, rowIdx) => {
        const leftOpen = expandedIdx === row.leftIdx;
        const rightOpen = row.right !== undefined && expandedIdx === row.rightIdx;

        return (
          <div
            key={rowIdx}
            className={cn(
              // Mirror mechanic: each row is its own 2-col grid. Animating
              // `grid-template-columns` + `gap` is what produces the
              // anchored expansion — the open card's outer edge is held by
              // the row's bounds while the opposite edge sweeps inward.
              //
              // CRITICAL: base track list must be `1fr 1fr`, NOT the default
              // `md:grid-cols-2` which expands to `repeat(2, minmax(0, 1fr))`.
              // `grid-template-columns` only interpolates between structurally
              // identical track lists — `minmax(0, 1fr)` and plain `1fr` are
              // NOT compatible track types, so transitioning from the
              // `repeat()` form to `1fr 0fr` makes the browser SNAP instead
              // of animating. Using `[1fr_1fr]` here means all three states
              // (closed, left-open, right-open) share the same flat
              // `<flex>` track structure and interpolate correctly.
              "grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-start",
              "motion-safe:transition-[grid-template-columns,gap] motion-safe:[transition-duration:350ms] motion-safe:[transition-timing-function:cubic-bezier(0.42,0,0.58,1)]",
              // `md:!` overrides the base `md:grid-cols-[1fr_1fr]` + `gap-6`
              // so the closed → open template swap always wins regardless of
              // class output order.
              leftOpen && "md:!grid-cols-[1fr_0fr] md:!gap-0",
              rightOpen && "md:!grid-cols-[0fr_1fr] md:!gap-0",
            )}
          >
            <CertCard
              cert={row.left}
              isDark={isDark}
              isExpanded={leftOpen}
              isSiblingExpanded={rightOpen}
              onToggle={() => toggle(row.leftIdx)}
            />
            {row.right && (
              <CertCard
                cert={row.right}
                isDark={isDark}
                isExpanded={rightOpen}
                isSiblingExpanded={leftOpen}
                onToggle={() => toggle(row.rightIdx)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ── Single card ──────────────────────────────────────────────────────── */

interface CertCardProps {
  cert: Certification;
  isDark: boolean;
  isExpanded: boolean;
  /** The OTHER card in this row is the one currently expanded. This card
   *  fades out + ignores pointer events while its grid column shrinks to
   *  0fr at md+. On mobile (1-col grid) this is a no-op visually. */
  isSiblingExpanded: boolean;
  onToggle: () => void;
}

const CertCard = ({
  cert,
  isDark,
  isExpanded,
  isSiblingExpanded,
  onToggle,
}: CertCardProps) => {
  const iconSrc = isDark && cert.iconDark ? cert.iconDark : cert.icon;
  const isUpcoming = cert.status === "upcoming";
  const canExpand = !isUpcoming && !!cert.previewImage;
  const exportHref = !isUpcoming ? (cert.pdfUrl ?? cert.verifyUrl) : undefined;
  const isPdf = !isUpcoming && !!cert.pdfUrl;

  const interactive = canExpand && !isSiblingExpanded;

  // Icon + title + key points. Rendered as the toggle button's content when
  // the card is expandable, or inline (no button) otherwise.
  const header = (
    <>
      {iconSrc ? (
        <img
          src={iconSrc}
          alt={`${cert.title} logo`}
          className={cn(
            "shrink-0 w-20 h-20 object-contain",
            cert.invertOnDark && "dark:invert dark:brightness-200",
          )}
          loading="lazy"
        />
      ) : (
        <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
          <Award className="h-6 w-6 text-accent" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-3">
          <h3 className="text-lg font-semibold text-foreground leading-snug">{cert.title}</h3>
          <span className="text-muted-foreground font-light text-sm whitespace-nowrap">{cert.date}</span>
        </div>
        <ul className="space-y-2 text-base text-foreground">
          {cert.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 text-accent select-none">–</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        // `min-w-0` + `overflow-hidden` let the card collapse cleanly with
        // its grid column when its sibling is the one expanding. Without
        // min-w-0 the card's content min-content size becomes the floor
        // and the column can't reach 0fr.
        "group relative bg-card border border-border rounded-lg shadow-sm flex flex-col w-full min-w-0 overflow-hidden",
        "motion-safe:transition-[box-shadow,border-color,opacity] motion-safe:[transition-duration:350ms] motion-safe:[transition-timing-function:cubic-bezier(0.42,0,0.58,1)]",
        // Lift on hover or when the inner toggle button takes keyboard focus.
        interactive && !isExpanded && "hover:shadow-lg hover:border-accent/40 focus-within:shadow-lg focus-within:border-accent/40",
        isExpanded && "shadow-2xl border-accent/40 ring-1 ring-accent/30",
        // Sibling-of-open card: fade out at md+ while the row's grid
        // collapses this column. Stays visible on mobile (single column).
        isSiblingExpanded && "md:opacity-0 md:pointer-events-none",
      )}
    >
      <div className="p-6 flex items-start gap-4 flex-1">
        {/* The icon + title block is the toggle button, kept separate from the
            CloseButton and the preview's action links so a button never wraps
            other interactive elements (invalid nested interactive content). */}
        {canExpand ? (
          <button
            type="button"
            onClick={interactive ? onToggle : undefined}
            disabled={!interactive}
            aria-expanded={isExpanded}
            aria-label={`${cert.title} certificate, ${isExpanded ? "hide" : "show"} preview`}
            className="flex items-start gap-4 flex-1 min-w-0 text-left appearance-none bg-transparent border-0 p-0 m-0 cursor-pointer focus:outline-none focus-visible:outline-none disabled:cursor-default"
          >
            {header}
          </button>
        ) : (
          header
        )}

        {/* Close affordance — only visible on the open card. Shared with the
            project deep-dive overlay (see [[components/CloseButton.tsx]]) so
            the dismiss gesture feels like one component across the site. */}
        {isExpanded && (
          <CloseButton
            size="sm"
            aria-label="Close preview"
            onClick={onToggle}
            className="shrink-0"
          />
        )}
      </div>

      {/* Compact footer (hint / verify-only button / scheduled badge).
          Always mounted; the grid-rows trick handles the height. Footer
          uses asymmetric staging matching animation-test.html .cert-footer
          regardless of variant — the choreography is part of the shape,
          not the variant tokens:
            OPEN  → 180ms emphasized-accelerate. Footer gets out of the
                    way fast so the preview can drop in below.
            CLOSE → 200ms decelerate with a 220ms delay. Footer is the
                    LAST thing to come back, after the preview has
                    retracted and the height has collapsed. */}
      <div
        aria-hidden={isExpanded}
        // @ts-expect-error -- React 19 supports inert natively; older types lack it
        inert={isExpanded ? "" : undefined}
        className={cn(
          "grid",
          isExpanded
            ? "grid-rows-[0fr] opacity-0 motion-safe:transition-[grid-template-rows,opacity] motion-safe:[transition-duration:180ms] motion-safe:[transition-timing-function:cubic-bezier(0.3,0,0.8,0.15)]"
            : "grid-rows-[1fr] opacity-100 motion-safe:transition-[grid-template-rows,opacity] motion-safe:[transition-duration:200ms] motion-safe:[transition-delay:220ms] motion-safe:[transition-timing-function:cubic-bezier(0,0,0.2,1)]",
        )}
      >
        <div className="overflow-hidden">
          {(isUpcoming || (exportHref && !canExpand)) && (
            <div className="px-6 pb-5 pt-4 mt-1 flex items-center justify-end border-t border-border">
              {isUpcoming ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground font-mono text-[11px] uppercase tracking-[0.06em]">
                  <Clock className="w-3 h-3" />
                  In Progress
                </span>
              ) : (
                <Button variant="secondary" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                  <a
                    href={exportHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cert.title}, ${isPdf ? "view certificate" : "verify online"}`}
                  >
                    <ExternalLink />
                    {isPdf ? "View certificate" : "Verify online"}
                  </a>
                </Button>
              )}
            </div>
          )}
          {canExpand && (
            <div className="px-6 pb-5 pt-4 mt-1 flex items-center justify-end border-t border-border">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.08em] text-muted-foreground motion-safe:transition-colors motion-safe:duration-200 group-hover:text-accent">
                <FileText className="w-3.5 h-3.5" />
                Click to preview
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Inline preview — static page-1 PNG of the PDF.
          The PNG has known intrinsic dimensions so the browser reserves
          the box at parse time. It's pre-decoded into the image cache via
          the preload effect above, so the reveal is purely the card's
          open animation clipping a pre-painted bitmap. No async paint,
          no jump, no skeleton crossfade fighting the open. */}
      {cert.previewImage && (
        <div
          aria-hidden={!isExpanded}
          // @ts-expect-error -- React 19 supports inert natively; older types lack it
          inert={isExpanded ? undefined : ""}
          className={cn(
            "grid motion-safe:transition-[grid-template-rows] motion-safe:[transition-duration:350ms] motion-safe:[transition-timing-function:cubic-bezier(0.42,0,0.58,1)]",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-hidden">
            {/* 80ms transition-delay is applied unconditionally so the
                content reveal stays staggered behind the height grow on BOTH
                open and close — matches the test page where the delay lives
                on the CSS rule itself, not on a state-conditional class. */}
            <div
              className={cn(
                "px-6 pb-6 pt-1 motion-safe:transition-[opacity,transform] motion-safe:[transition-duration:280ms] motion-safe:[transition-timing-function:cubic-bezier(0.42,0,0.58,1)] motion-safe:[transition-delay:80ms]",
                isExpanded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1",
              )}
            >
              {/* Height matches animation-test.html Pure Simple variant so the
                  vertical sweep distance during open is the same — at the same
                  350ms, more pixels per ms feels faster. */}
              <div className="relative w-full overflow-hidden rounded-md border border-border bg-muted h-[clamp(280px,42vh,420px)]">
                <img
                  src={cert.previewImage}
                  alt={`${cert.title} certificate preview`}
                  className="absolute inset-0 w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                {cert.pdfUrl && (
                  <Button variant="secondary" size="sm" asChild>
                    <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Open in new tab
                    </a>
                  </Button>
                )}
                {cert.verifyUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                      Verify online
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
