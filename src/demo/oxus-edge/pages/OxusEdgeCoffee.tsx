import { useEffect, useState } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import ProductCard from "@/demo/oxus-edge/components/ProductCard";
import Footer from "@/demo/oxus-edge/components/Footer";
import * as api from "@/demo/oxus-edge/api";
import { resolveProducts, type ResolvedProduct } from "@/demo/oxus-edge/api/helpers";
import { LIFESTYLE_IMAGES } from "@/demo/oxus-edge/data/images";


export default function CoffeePage() {
  const [resolved, setResolved] = useState<ResolvedProduct[]>([]);

  useEffect(() => {
    api.getProductsByCategory("coffee").then((p) => setResolved(resolveProducts(p)));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[280px] md:h-[360px] flex items-end overflow-hidden">
        <Image
          src={LIFESTYLE_IMAGES.coffeeCamp}
          alt="Camp coffee in the mountains"
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
            <span className="text-white font-medium">Coffee</span>
          </nav>
          <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium tracking-[-0.01em] text-white mb-2">
            Small-Batch Coffee
          </h1>
          <p className="text-white/70 text-[0.9rem] max-w-lg leading-relaxed [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]">
            Roasted by friends in the Appalachian highlands. The same mountains that forge our blades, roast our beans.
          </p>
        </div>
      </section>

      {/* Products */}
      <div className="bg-depth-mocha">
        <div className="mx-auto max-w-[1280px] px-6 pt-10 pb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-text-muted text-xs font-display tracking-wide tabular-nums">
              {resolved.length} {resolved.length === 1 ? "roast" : "roasts"}
            </span>
          </div>

          {resolved.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolved.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-text-muted text-sm mb-3">No coffee available right now.</p>
              <Link href="/knives" className="link-wipe text-ember text-sm hover:text-ember-light transition-colors">Browse our knives</Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
