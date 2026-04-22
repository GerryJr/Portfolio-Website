
import { useState, useMemo } from "react";
import type { ResolvedProduct } from "@/demo/oxus-edge/api/helpers";
import type { BladeType, KnifeFamily, KnifeFamilySlug } from "@/demo/oxus-edge/data/types";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export interface KnifeFilterContext {
  filtered: ResolvedProduct[];
  filtersOpen: boolean;
  familyFilter: "all" | KnifeFamilySlug;
  setFamilyFilter: (f: "all" | KnifeFamilySlug) => void;
}

interface KnifeFiltersProps {
  products: ResolvedProduct[];
  families?: KnifeFamily[];
  children: (ctx: KnifeFilterContext) => React.ReactNode;
}

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $300", min: 0, max: 299 },
  { label: "$300 - $400", min: 300, max: 400 },
  { label: "Over $400", min: 401, max: Infinity },
];

export default function KnifeFilters({ products, families, children }: KnifeFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bladeFilter, setBladeFilter] = useState<"all" | BladeType>("all");
  const [tangFilter, setTangFilter] = useState<"all" | string>("all");
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState<SortOption>("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [familyFilter, setFamilyFilter] = useState<"all" | KnifeFamilySlug>("all");

  const specs = useMemo(() => {
    const bladeTypes = new Set<string>();
    const tangTypes = new Set<string>();
    for (const k of products) {
      if (k.bladeType) bladeTypes.add(k.bladeType);
      if (k.specs?.["Tang"]) tangTypes.add(k.specs["Tang"]);
    }
    return {
      bladeTypes: Array.from(bladeTypes).sort(),
      tangTypes: Array.from(tangTypes).sort(),
    };
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (familyFilter !== "all") result = result.filter((p) => p.family === familyFilter);
    if (bladeFilter !== "all") result = result.filter((p) => p.bladeType === bladeFilter);
    if (tangFilter !== "all") result = result.filter((p) => p.specs?.["Tang"] === tangFilter);
    if (inStockOnly) result = result.filter((p) => p.stock > 0);
    const range = PRICE_RANGES[priceRange];
    if (range && range.max !== Infinity) {
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    } else if (range && range.min > 0) {
      result = result.filter((p) => p.price >= range.min);
    }
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [products, familyFilter, bladeFilter, tangFilter, priceRange, sort, inStockOnly]);

  const activeCount = [familyFilter !== "all", bladeFilter !== "all", tangFilter !== "all", priceRange !== 0, inStockOnly].filter(Boolean).length;

  const clearAll = () => {
    setFamilyFilter("all");
    setBladeFilter("all");
    setTangFilter("all");
    setPriceRange(0);
    setSort("default");
    setInStockOnly(false);
  };

  const selectClasses = "w-full bg-bg-card border border-border text-text-secondary text-[0.78rem] px-3 py-2.5 rounded-[2px] cursor-pointer focus:border-ember focus:outline-none transition-colors duration-200 ease-out appearance-none";

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Filters — horizontal on mobile, sidebar on desktop */}
      <aside
        className={`shrink-0 transition-all duration-300 ease-out overflow-hidden ${
          filtersOpen
            ? "w-full lg:w-[220px] opacity-100 max-h-[2000px]"
            : "w-full lg:w-0 opacity-0 max-h-0 lg:max-h-none"
        }`}
        aria-label="Knife filters"
      >
        <div className="w-full lg:w-[220px] pb-6 lg:pb-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-[0.75rem] tracking-[0.12em] uppercase text-text-primary">Filters</h3>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-[0.65rem] text-ember hover:text-ember-light transition-colors cursor-pointer font-medium"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>

          {/* Filter sections */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-4 lg:gap-6 lg:space-y-0">
            {/* Sort */}
            <FilterSection label="Sort By">
              <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className={selectClasses} aria-label="Sort knives">
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </FilterSection>

            {/* Series (family) */}
            {families && families.length > 1 && (
              <FilterSection label="Series">
                <select value={familyFilter} onChange={(e) => setFamilyFilter(e.target.value as "all" | KnifeFamilySlug)} className={selectClasses} aria-label="Filter by series">
                  <option value="all">All Series</option>
                  {families.map((f) => (
                    <option key={f.slug} value={f.slug}>{f.name}</option>
                  ))}
                </select>
              </FilterSection>
            )}

            {/* Blade type */}
            {specs.bladeTypes.length > 1 && (
              <FilterSection label="Blade Type">
                <select value={bladeFilter} onChange={(e) => setBladeFilter(e.target.value as "all" | BladeType)} className={selectClasses} aria-label="Filter by blade type">
                  <option value="all">All Types</option>
                  {specs.bladeTypes.map((bt) => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </FilterSection>
            )}

            {/* Tang type */}
            {specs.tangTypes.length > 1 && (
              <FilterSection label="Tang Type">
                <select value={tangFilter} onChange={(e) => setTangFilter(e.target.value)} className={selectClasses} aria-label="Filter by tang type">
                  <option value="all">All Tangs</option>
                  {specs.tangTypes.map((tt) => (
                    <option key={tt} value={tt}>{tt}</option>
                  ))}
                </select>
              </FilterSection>
            )}

            {/* Price range */}
            <FilterSection label="Price">
              <select value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className={selectClasses} aria-label="Filter by price range">
                {PRICE_RANGES.map((r, i) => (
                  <option key={i} value={i}>{r.label}</option>
                ))}
              </select>
            </FilterSection>

            {/* In stock */}
            <FilterSection label="Availability">
              <label className="flex items-center gap-2.5 text-[0.78rem] text-text-secondary cursor-pointer select-none py-1">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-ember w-4 h-4 rounded-none cursor-pointer"
                />
                In stock only
              </label>
            </FilterSection>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {/* Toolbar — toggle filters + result count */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-[0.75rem] text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            aria-label={filtersOpen ? "Hide filters" : "Show filters"}
            aria-expanded={filtersOpen}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            {filtersOpen ? "Hide Filters" : "Show Filters"}
            {activeCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-ember/15 text-ember text-[0.65rem] font-bold rounded-[2px] tabular-nums">{activeCount}</span>
            )}
          </button>
          <p className="text-text-muted text-[0.75rem] tabular-nums" aria-live="polite" aria-atomic="true">
            {filtered.length} {filtered.length === 1 ? "knife" : "knives"}
            {filtered.length < products.length ? ` of ${products.length}` : ""}
          </p>
        </div>

        {/* Filtered content */}
        {filtered.length > 0 ? (
          children({ filtered, filtersOpen, familyFilter, setFamilyFilter })
        ) : (
          <div className="py-20 text-center">
            <p className="text-text-muted text-sm mb-4">No knives match these filters.</p>
            <button
              onClick={clearAll}
              className="text-sm text-ember hover:text-ember-light cursor-pointer transition-colors font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.65rem] font-display tracking-[0.12em] uppercase text-text-muted mb-2">{label}</p>
      {children}
    </div>
  );
}
