import { useParams } from "react-router-dom";
import Link from "@/demo/oxus-edge/lib/next-link";
import { products } from "@/demo/oxus-edge/data/products";
import { resolveProduct, resolveProducts } from "@/demo/oxus-edge/api/helpers";
import ProductCard from "@/demo/oxus-edge/components/ProductCard";
import ShareButton from "@/demo/oxus-edge/components/ShareButton";
import EstimatedDelivery from "@/demo/oxus-edge/components/EstimatedDelivery";
import FAQ from "@/demo/oxus-edge/components/FAQ";
import RecentlyViewed from "@/demo/oxus-edge/components/RecentlyViewed";
import ProductGallery from "./ProductGallery";
import ProductDetailClient from "./ProductDetailClient";
import ProductViewTracker from "./ProductViewTracker";
import OxusEdgeNotFound from "./OxusEdgeNotFound";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const raw = id ? products.find((p) => p.slug === id || p.id === id) : undefined;
  if (!raw) return <OxusEdgeNotFound />;
  const product = resolveProduct(raw);

  const soldOut = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const stockDot = soldOut ? "bg-danger" : lowStock ? "bg-amber" : "bg-success";
  const stockLabel = soldOut
    ? "Currently sold out"
    : lowStock
    ? `Only ${product.stock} left${product.drop ? " in this drop" : ""}`
    : `${product.stock} in stock`;

  const specs = product.specs || {};
  const specEntries = Object.entries(specs);

  return (
    <div className="bg-depth-mocha">
    <div className="mx-auto max-w-[1280px] px-6 py-8 pb-24 lg:pb-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-text-muted mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-ember transition-colors">Home</Link>
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        <Link href={product.category === "knives" ? "/knives" : product.category === "coffee" ? "/coffee" : "/accessories"} className="hover:text-ember transition-colors capitalize">{product.category === "apparel" ? "Accessories" : product.category}</Link>
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        <span className="text-text-primary">{product.name}</span>
      </nav>

      {/* Main grid: Gallery + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
        <ProductGallery product={product} />

        <div className="lg:sticky lg:top-24">
          {/* Category + Drop badge */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-[0.65rem] tracking-[0.14em] uppercase text-text-muted font-display capitalize">
              {product.category}
            </span>
            {product.drop && (
              <span className="inline-flex items-center px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.1em] uppercase bg-ember/15 text-ember border border-ember/20 rounded-none">
                Drop Item
              </span>
            )}
          </div>

          {/* Name + Share */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="font-display text-[clamp(1.3rem,3vw,1.8rem)] font-medium tracking-[0.02em] leading-snug">
              {product.name}
            </h1>
            <ShareButton name={product.name} className="shrink-0 mt-1" />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-semibold text-ember tabular-nums">${product.price}.00</span>
            {product.drop && <span className="text-[0.65rem] text-success">+ Free shipping</span>}
          </div>

          {/* Stock indicator */}
          <div className={`flex items-center gap-2.5 mb-5 px-3 py-2.5 rounded-none text-sm ${
            soldOut ? "bg-danger/10 border border-danger/15" : lowStock ? "bg-amber/10 border border-amber/15" : "bg-success/10 border border-success/15"
          }`}>
            {soldOut ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-danger shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            ) : lowStock ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-success shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            )}
            <span className={`tabular-nums ${soldOut ? "text-danger" : lowStock ? "text-amber" : "text-success"}`}>{stockLabel}</span>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-[1.7] mb-6">
            {product.description}
          </p>

          {/* Key specs preview (if knife) */}
          {specEntries.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {[["Blade Steel", specs["Blade Steel"]], ["Tang", specs["Tang"]], ["Hardness", specs["Hardness"]]].map(([label, value]) => (
                value && (
                  <div key={label} className="text-center p-2.5 bg-bg-medium rounded-none border border-border/30">
                    <div className="text-[0.65rem] tracking-[0.1em] uppercase text-text-muted font-display">{label}</div>
                    <div className="text-xs font-medium mt-0.5 leading-tight">{value}</div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Buy actions */}
          <ProductDetailClient product={product} />

          {/* Estimated delivery */}
          {!soldOut && (
            <div className="mt-5 mb-3 flex items-center gap-2 text-sm text-text-secondary">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-text-muted shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <EstimatedDelivery />
            </div>
          )}

          {/* Trust signals */}
          <div className="flex flex-col gap-2">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: product.drop ? "10-minute reservation during checkout" : "Secure checkout via Stripe" },
              { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", text: "Free shipping on orders over $250" },
              { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", text: "Handmade in the USA" },
            ].map((item, idx) => (
              <div key={item.text} className="flex items-center gap-2.5 text-xs text-text-muted p-2 bg-bg-card/50 rounded-none border border-border/20">
                <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 shrink-0 ${idx === 0 ? "text-ember/60" : "text-text-muted/60"}`} fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={item.icon} />
                </svg>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full specifications table ── */}
      {specEntries.length > 0 && (
        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-lg tracking-[0.06em] mb-6 flex items-center gap-3 sticky top-[64px] z-10 bg-bg-card">
            <span>Specifications</span>
            <span className="flex-1 h-px bg-border" />
          </h2>
          <div className="bg-bg-card border border-border rounded-none overflow-hidden">
            {specEntries.map(([key, value], i) => (
              <div
                key={key}
                className={`flex justify-between items-center px-5 py-3 text-sm ${
                  i < specEntries.length - 1 ? "border-b border-border" : ""
                } ${i % 2 === 0 ? "bg-bg-card" : "bg-bg-medium/50"}`}
              >
                <span className="text-text-muted font-display text-[0.7rem] tracking-[0.06em] uppercase">
                  {key}
                </span>
                <span className="font-medium text-right tabular-nums">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* You May Also Like */}
      {(() => {
        const related = resolveProducts(
          products
            .filter((p) => p.id !== raw.id && (p.category === raw.category || p.family === raw.family))
            .slice(0, 3)
        );
        if (related.length === 0) return null;
        return (
          <div className="mt-16">
            <h2 className="font-display text-lg tracking-[0.06em] mb-6 flex items-center gap-3">
              <span>You May Also Like</span>
              <span className="flex-1 h-px bg-border" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* FAQ */}
      <FAQ category={product.category} />

      {/* Recently viewed */}
      <RecentlyViewed excludeId={product.id} />

      {/* Track this view */}
      <ProductViewTracker productId={product.id} />

      {/* Back link */}
      <div className="mt-10">
        <Link
          href={product.category === "knives" ? "/knives" : product.category === "coffee" ? "/coffee" : "/accessories"}
          className="text-sm text-text-muted hover:text-ember transition-colors"
        >
          Back to {product.category === "knives" ? "Knives" : product.category === "coffee" ? "Coffee" : "Accessories"}
        </Link>
      </div>
    </div>

    {/* Sticky mobile CTA */}
    {!soldOut && (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-depth-roast/95 backdrop-blur-sm border-t border-white/[0.08] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-medium truncate">{product.name}</p>
          <p className="text-ember font-semibold tabular-nums">${product.price}.00</p>
        </div>
        <Link
          href="/checkout"
          className="shrink-0 px-6 py-3 bg-ember text-white font-display text-[0.7rem] font-semibold tracking-[0.1em] uppercase rounded-[2px] hover:bg-ember-light transition-all"
        >
          Buy Now
        </Link>
      </div>
    )}
    </div>
  );
}
