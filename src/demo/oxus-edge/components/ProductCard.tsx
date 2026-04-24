
import { useState, useEffect } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { useToast } from "@/demo/oxus-edge/components/Toast";
import type { ResolvedProduct } from "@/demo/oxus-edge/api/helpers";

function swatchBackground(color: string, secondary?: string) {
  if (!secondary || secondary.toLowerCase() === color.toLowerCase()) return color;
  return `linear-gradient(135deg, ${color} 0 50%, ${secondary} 50% 100%)`;
}

function formatReleaseShort(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface ProductCardProps {
  product: ResolvedProduct;
  category?: { name: string; slug: string } | null;
  onCategoryClick?: (slug: string) => void;
}

export default function ProductCard({ product, category, onCategoryClick }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { showToast } = useToast();

  const soldOut = product.stock === 0;

  const releasePassed = mounted && product.releaseAt
    ? new Date(product.releaseAt).getTime() <= Date.now()
    : false;
  const comingSoon = !!product.comingSoon && !releasePassed;

  const limitedStock = !!product.limitedStock && !soldOut && !comingSoon;
  const hasVariants = product.variants && product.variants.length > 1;
  const currentVariant = product.variants?.[selectedVariant];
  const displayImage = product.img;
  const hasHoverImage = !!product.imgHover && !soldOut && !comingSoon;
  const releaseLabel = formatReleaseShort(product.releaseAt);

  return (
    <div className="group/card flex gap-4 sm:block sm:gap-0">
      {/* Image — horizontal thumbnail on mobile, full-width on desktop */}
      <Link
        href={`/product/${product.id}`}
        className="block shrink-0 w-36 sm:w-full self-start"
      >
        <div className="group/img aspect-square sm:aspect-[3/4] relative overflow-hidden bg-bg-medium">
          {!imgLoaded && <div className="absolute inset-0 img-skeleton" />}
          <Image
            key={displayImage}
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 33vw, 25vw"
            onLoad={() => setImgLoaded(true)}
            className={`object-cover transition-all duration-500 ease-out ${
              hasHoverImage ? "group-hover/img:opacity-0" : ""
            } ${!imgLoaded ? "opacity-0" : ""} ${soldOut && !comingSoon ? "grayscale saturate-[0.3]" : ""}`}
          />
          {hasHoverImage && (
            <Image
              src={product.imgHover}
              alt={`${product.name} — alternate view`}
              fill
              sizes="(max-width: 640px) 144px, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover/img:opacity-100"
            />
          )}

          {/* Sold Out overlay */}
          {soldOut && !comingSoon && (
            <div className="absolute inset-0 bg-bg-deep/40 flex items-center justify-center">
              <span className="font-display text-[0.62rem] sm:text-sm font-semibold tracking-[0.18em] uppercase text-white/90">
                Sold Out
              </span>
            </div>
          )}

          {/* Coming Soon overlay */}
          {comingSoon && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 flex items-center justify-center">
              <div className="text-center px-1">
                <div className="w-6 sm:w-10 h-px bg-white/50 mx-auto mb-2 sm:mb-3" />
                <span className="font-display text-[0.6rem] sm:text-[0.95rem] font-semibold tracking-[0.18em] sm:tracking-[0.3em] uppercase text-white block leading-tight">
                  Coming Soon
                </span>
                {releaseLabel && (
                  <span className="hidden sm:block mt-2 text-[0.62rem] tracking-[0.2em] uppercase text-white/70 font-display tabular-nums">
                    Drops {releaseLabel}
                  </span>
                )}
                <div className="w-6 sm:w-10 h-px bg-white/50 mx-auto mt-2 sm:mt-3" />
              </div>
            </div>
          )}

          {/* Top-left badge — desktop only; mobile promotes to inline row below */}
          {comingSoon ? (
            <div className="hidden sm:block absolute top-3.5 left-3.5">
              <span className="px-2.5 py-1 text-[0.62rem] font-display font-semibold tracking-[0.12em] uppercase bg-ember/90 backdrop-blur-sm text-white rounded-[2px]">
                Upcoming
              </span>
            </div>
          ) : limitedStock ? (
            <div className="hidden sm:block absolute top-3.5 left-3.5">
              <span className="px-2.5 py-1 text-[0.62rem] font-display font-semibold tracking-[0.12em] uppercase bg-black/60 backdrop-blur-sm text-white/90 rounded-[2px]">
                Limited — {product.stock} left
              </span>
            </div>
          ) : null}

          {/* Quick Add — desktop only (hover trigger; no hover on touch) */}
          {!soldOut && !comingSoon && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                showToast(`${product.name} added to cart!`);
              }}
              className="hidden sm:block absolute bottom-3 left-3 right-3 py-2.5 bg-bg-deep/85 backdrop-blur-sm border border-white/10 text-white text-[0.68rem] font-display font-semibold tracking-[0.1em] uppercase text-center rounded-[2px] opacity-0 translate-y-2 group-hover/img:opacity-100 group-hover/img:translate-y-0 transition-all duration-200 cursor-pointer hover:bg-ember hover:border-ember"
            >
              Quick Add
            </button>
          )}
        </div>
      </Link>

      {/* Details — right column on mobile, below image on desktop */}
      <div className="flex-1 min-w-0 flex flex-col sm:block">
        {/* Title + mobile-only badge row */}
        <Link href={`/product/${product.id}`} className="block relative pt-0 sm:pt-4">
          <span className="hidden sm:block absolute top-0 left-0 right-0 h-px bg-ember scale-x-0 origin-right group-hover/card:scale-x-100 group-hover/card:origin-left transition-transform duration-[350ms]" style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
          <h3 className="font-display text-[0.88rem] sm:text-[0.9rem] font-medium tracking-[0.02em] leading-snug group-hover/card:text-ember transition-colors duration-200">
            {product.name}
          </h3>
          {/* Mobile-only badge row */}
          <div className="sm:hidden flex flex-wrap items-center gap-1.5 mt-1">
            {comingSoon && (
              <span className="inline-flex items-center px-1.5 py-0.5 text-[0.55rem] font-display font-semibold tracking-[0.1em] uppercase bg-ember/15 text-ember border border-ember/25 rounded-[2px]">
                Upcoming
              </span>
            )}
            {limitedStock && (
              <span className="inline-flex items-center px-1.5 py-0.5 text-[0.55rem] font-display font-semibold tracking-[0.1em] uppercase bg-white/10 text-white/80 rounded-[2px]">
                {product.stock} left
              </span>
            )}
          </div>
        </Link>

        {/* Category chip */}
        {category && (
          <div className="mt-1">
            {onCategoryClick ? (
              <button
                type="button"
                onClick={() => onCategoryClick(category.slug)}
                className="inline-flex items-center gap-1 text-[0.6rem] sm:text-[0.62rem] font-display tracking-[0.14em] uppercase text-text-muted hover:text-ember transition-colors cursor-pointer"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-text-muted/60 group-hover/card:bg-ember transition-colors" />
                {category.name}
              </button>
            ) : (
              <Link
                href={`/knives/${category.slug}`}
                className="inline-flex items-center gap-1 text-[0.6rem] sm:text-[0.62rem] font-display tracking-[0.14em] uppercase text-text-muted hover:text-ember transition-colors"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-text-muted/60" />
                {category.name}
              </Link>
            )}
          </div>
        )}

        {/* Price + swatches — stacked on mobile (no flex-wrap games), horizontal on desktop */}
        <div className="pt-1.5 pb-2 mt-auto sm:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-3 gap-2">
            <div className="flex items-baseline gap-3">
              <span className={`text-[0.95rem] font-semibold tabular-nums ${soldOut && !comingSoon ? "text-text-muted line-through" : "text-ember"}`}>
                ${product.price}.00
              </span>
              {comingSoon && releaseLabel && (
                <span className="text-[0.62rem] text-text-muted tabular-nums uppercase tracking-[0.1em] font-display">
                  Drops {releaseLabel}
                </span>
              )}
            </div>

            {hasVariants && (
              <div className="flex items-center gap-1.5 flex-wrap" role="radiogroup" aria-label="Handle color">
                {product.variants!.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={i === selectedVariant}
                    aria-label={`${v.name}${v.inStock ? "" : " — unavailable"}`}
                    onClick={() => v.inStock && setSelectedVariant(i)}
                    title={v.inStock ? v.name : `${v.name} — unavailable`}
                    className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      v.inStock ? "cursor-pointer hover:scale-110" : "cursor-not-allowed opacity-60"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[1.5px] transition-all duration-200 ${
                        i === selectedVariant && v.inStock
                          ? "border-ember ring-2 ring-ember/35 shadow-[0_0_8px_rgba(200,100,58,0.3)]"
                          : "border-white/30"
                      }`}
                      style={{ background: swatchBackground(v.color, v.colorSecondary) }}
                    />
                    {!v.inStock && (
                      <span
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        aria-hidden="true"
                      >
                        <span className="block w-6 sm:w-7 h-[1.5px] bg-white/70 rotate-45" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected variant name */}
          {hasVariants && currentVariant && (
            <p className="text-[0.68rem] text-text-muted mt-1.5">
              <span className="text-text-secondary">{currentVariant.name}</span>
              {!currentVariant.inStock && (
                <span className="text-danger/80 ml-1">— unavailable</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
