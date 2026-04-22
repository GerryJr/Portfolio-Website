import { useEffect, useState } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import ProductCard from "@/demo/oxus-edge/components/ProductCard";
import Footer from "@/demo/oxus-edge/components/Footer";
import * as api from "@/demo/oxus-edge/api";
import { resolveProducts, type ResolvedProduct } from "@/demo/oxus-edge/api/helpers";
import { LIFESTYLE_IMAGES } from "@/demo/oxus-edge/data/images";


export default function AccessoriesPage() {
  const [resolved, setResolved] = useState<ResolvedProduct[]>([]);
  const [resolvedApparel, setResolvedApparel] = useState<ResolvedProduct[]>([]);

  useEffect(() => {
    Promise.all([
      api.getProductsByCategory("accessories"),
      api.getProductsByCategory("apparel"),
    ]).then(([acc, ap]) => {
      setResolved(resolveProducts(acc));
      setResolvedApparel(resolveProducts(ap));
    });
  }, []);

  const inStock = resolved.filter((p) => p.stock > 0).length;
  const allProducts = [...resolved, ...resolvedApparel];
  const totalInStock = allProducts.filter((p) => p.stock > 0).length;
  const hasAccessories = resolved.length > 0;
  const hasApparel = resolvedApparel.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[280px] md:h-[360px] flex items-end overflow-hidden">
        <Image
          src={LIFESTYLE_IMAGES.campfireEmbers}
          alt="Campfire embers at dusk"
          fill
          priority
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-depth-mocha via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 pb-10">
          <nav className="text-xs text-white/70 mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="text-white font-medium">Accessories</span>
          </nav>
          <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium tracking-[-0.01em] text-white mb-2">
            Gear &amp; Accessories
          </h1>
          <p className="text-white/70 text-[0.9rem] max-w-lg leading-relaxed [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]">
            Sheaths, sharpening kits, apparel, and everything built for the same life as our blades.
          </p>
        </div>
      </section>

      {/* Products */}
      <div className="bg-depth-mocha">
        <div className="mx-auto max-w-[1280px] px-6 pt-10 pb-24">
          {/* Accessories section */}
          {hasAccessories && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <h2 className="font-display text-[clamp(1.1rem,2vw,1.4rem)] font-medium tracking-[0.02em]">Blade Care &amp; Sheaths</h2>
                <span className="text-text-muted text-xs tabular-nums">{resolved.length} {resolved.length === 1 ? "product" : "products"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resolved.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Apparel section */}
          {hasApparel && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <h2 className="font-display text-[clamp(1.1rem,2vw,1.4rem)] font-medium tracking-[0.02em]">Apparel</h2>
                <span className="text-text-muted text-xs tabular-nums">{resolvedApparel.length} {resolvedApparel.length === 1 ? "product" : "products"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resolvedApparel.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!hasAccessories && !hasApparel && (
            <div className="py-20 text-center">
              <p className="text-text-muted text-sm mb-3">No accessories available right now.</p>
              <Link href="/knives" className="link-wipe text-ember text-sm hover:text-ember-light transition-colors">Browse our knives</Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
