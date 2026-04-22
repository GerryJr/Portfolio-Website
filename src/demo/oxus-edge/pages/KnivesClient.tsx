
import ProductCard from "@/demo/oxus-edge/components/ProductCard";
import KnifeFilters from "@/demo/oxus-edge/components/KnifeFilters";
import type { ResolvedProduct } from "@/demo/oxus-edge/api/helpers";
import type { KnifeFamily, KnifeFamilySlug } from "@/demo/oxus-edge/data/types";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { PRODUCT_IMAGES } from "@/demo/oxus-edge/data/images";

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
          {/* Series quick-filter chips — click to filter the grid in place */}
          {families.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
              <button
                type="button"
                onClick={() => setFamilyFilter("all")}
                className={`px-4 py-2 text-[0.68rem] font-medium tracking-[0.06em] uppercase whitespace-nowrap rounded-[2px] border transition-all font-display cursor-pointer ${
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
                    className={`px-4 py-2 text-[0.68rem] font-medium tracking-[0.06em] uppercase whitespace-nowrap rounded-[2px] border transition-all font-display cursor-pointer ${
                      active
                        ? "bg-ember/15 border-ember/40 text-ember"
                        : "bg-bg-card border-white/[0.06] text-text-muted hover:text-ember hover:border-ember/30"
                    }`}
                  >
                    {fam.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Unified grid. Closed filters → roomier 3-col at wide; open → same 3-col but narrower container. */}
          <div className={`grid gap-5 ${filtersOpen ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3"}`}>
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
