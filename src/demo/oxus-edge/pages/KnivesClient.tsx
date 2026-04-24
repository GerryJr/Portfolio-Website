
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/demo/oxus-edge/components/ProductCard";
import KnifeFilters from "@/demo/oxus-edge/components/KnifeFilters";
import type { ResolvedProduct } from "@/demo/oxus-edge/api/helpers";
import type { KnifeFamily, KnifeFamilySlug } from "@/demo/oxus-edge/data/types";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { PRODUCT_IMAGES } from "@/demo/oxus-edge/data/images";

/**
 * Horizontal chip scroller with left/right arrow affordances + edge fades.
 * Arrows appear only when there's offscreen content in that direction.
 *
 * Measurement runs on mount, scroll, resize, after fonts load, and via a
 * ResizeObserver on the inner content wrapper so arrows react to late-loading
 * data / late-loading fonts that grow child widths.
 */
function ChipScroller({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el) return;

    const update = () => {
      setCanLeft(el.scrollLeft > 2);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };

    // Initial measurement — defer past first paint so layout is final.
    const raf = requestAnimationFrame(update);

    // Re-measure when fonts finish loading (widths change).
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(update).catch(() => {});
    }

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Watch inner content for size changes (e.g. async data load).
    let ro: ResizeObserver | undefined;
    if (content && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(content);
    }

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [children]);

  const scrollBy = (dx: number) => {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className="relative mb-6">
      <div
        ref={scrollerRef}
        className="chip-scroller flex gap-2 overflow-x-auto pb-1 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <div ref={contentRef} className="flex gap-2">
          {children}
        </div>
      </div>

      {/* Left edge fade — use bg-deep for contrast against the page's depth-mocha */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg-deep via-bg-deep/80 to-transparent transition-opacity duration-200 ${canLeft ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      />
      <button
        type="button"
        onClick={() => scrollBy(-200)}
        aria-label="Scroll filters left"
        tabIndex={canLeft ? 0 : -1}
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-bg-elevated/95 backdrop-blur-sm border border-ember/30 text-text-primary hover:text-ember hover:border-ember/70 transition-[opacity,color,border-color] duration-150 cursor-pointer shadow-lg ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right edge fade + arrow */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg-deep via-bg-deep/80 to-transparent transition-opacity duration-200 ${canRight ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      />
      <button
        type="button"
        onClick={() => scrollBy(200)}
        aria-label="Scroll filters right"
        tabIndex={canRight ? 0 : -1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-bg-elevated/95 backdrop-blur-sm border border-ember/30 text-text-primary hover:text-ember hover:border-ember/70 transition-[opacity,color,border-color] duration-150 cursor-pointer shadow-lg ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

interface KnivesClientProps {
  products: ResolvedProduct[];
  families: KnifeFamily[];
}

export default function KnivesClient({ products, families }: KnivesClientProps) {
  const familyMap = new Map<KnifeFamilySlug, KnifeFamily>(families.map((f) => [f.slug, f]));

  return (
    <KnifeFilters products={products} families={families}>
      {({ filtered, filtersOpen, familyFilter, setFamilyFilter }) => (
        <div className="pb-24">
          {/* Series quick-filter chips — horizontally scrollable with arrow affordance */}
          {families.length > 1 && (
            <ChipScroller>
              <button
                type="button"
                onClick={() => setFamilyFilter("all")}
                className={`px-4 py-2 text-[0.68rem] font-medium tracking-[0.06em] uppercase whitespace-nowrap rounded-[2px] border transition-all font-display cursor-pointer shrink-0 ${
                  familyFilter === "all"
                    ? "bg-ember/15 border-ember/40 text-ember"
                    : "bg-bg-card border-white/[0.06] text-text-muted hover:text-ember hover:border-ember/30"
                }`}
              >
                All Series
              </button>
              {families.map((fam) => {
                const active = familyFilter === fam.slug;
                return (
                  <button
                    key={fam.slug}
                    type="button"
                    onClick={() => setFamilyFilter(active ? "all" : fam.slug)}
                    className={`px-4 py-2 text-[0.68rem] font-medium tracking-[0.06em] uppercase whitespace-nowrap rounded-[2px] border transition-all font-display cursor-pointer shrink-0 ${
                      active
                        ? "bg-ember/15 border-ember/40 text-ember"
                        : "bg-bg-card border-white/[0.06] text-text-muted hover:text-ember hover:border-ember/30"
                    }`}
                  >
                    {fam.name}
                  </button>
                );
              })}
            </ChipScroller>
          )}

          {/* Unified grid. 1-col on mobile so cards have room for swatches + price row; 2-col from sm; 3-col at wide. */}
          <div className={`grid gap-5 ${filtersOpen ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}>
            {filtered.map((p) => {
              const fam = p.family ? familyMap.get(p.family) : null;
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  category={fam ? { name: fam.name, slug: fam.slug } : null}
                  onCategoryClick={(slug) => setFamilyFilter(slug as KnifeFamilySlug)}
                />
              );
            })}
          </div>

          {/* Series reference block — informational, does not group the grid above */}
          {families.length > 0 && (
            <div className="mt-20 pt-10 border-t border-border/50">
              <div className="mb-8">
                <p className="text-ember text-[0.65rem] font-semibold tracking-[0.25em] uppercase mb-2 font-display">Collections</p>
                <h2 className="font-display text-[clamp(1.3rem,2.5vw,1.8rem)] font-medium tracking-[0.01em]">Explore by Series</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {families.map((fam) => {
                  const imgData = PRODUCT_IMAGES[fam.imageKey];
                  const count = products.filter((p) => p.family === fam.slug).length;
                  const active = familyFilter === fam.slug;
                  return (
                    <button
                      key={fam.slug}
                      type="button"
                      onClick={() => setFamilyFilter(active ? "all" : fam.slug)}
                      className={`group text-left flex items-center gap-4 p-4 rounded-[2px] border transition-all cursor-pointer ${
                        active
                          ? "bg-ember/[0.06] border-ember/30"
                          : "bg-bg-card/60 border-white/[0.06] hover:border-ember/30 hover:bg-bg-card"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-[2px] overflow-hidden relative shrink-0 bg-bg-medium">
                        {imgData?.primary && (
                          <Image src={imgData.primary} alt="" fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-display text-[0.82rem] tracking-[0.03em] truncate transition-colors ${active ? "text-ember" : "group-hover:text-ember"}`}>
                            {fam.name}
                          </h3>
                          <span className="text-[0.6rem] text-text-muted tabular-nums shrink-0">{count}</span>
                        </div>
                        <p className="text-text-muted text-[0.68rem] truncate">{fam.tagline}</p>
                      </div>
                      <Link
                        href={`/knives/${fam.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 text-text-muted hover:text-ember transition-colors"
                        aria-label={`${fam.name} series page`}
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </Link>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </KnifeFilters>
  );
}
