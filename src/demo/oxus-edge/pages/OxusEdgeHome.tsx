import { useEffect, useState } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import ProductCard from "@/demo/oxus-edge/components/ProductCard";
import Footer from "@/demo/oxus-edge/components/Footer";
import NewsletterForm from "@/demo/oxus-edge/components/NewsletterForm";
import Testimonials from "@/demo/oxus-edge/components/Testimonials";
import * as api from "@/demo/oxus-edge/api";
import { resolveProducts, type ResolvedProduct } from "@/demo/oxus-edge/api/helpers";
import { STORE_CONFIG } from "@/demo/oxus-edge/data/config";
import { HERO_IMAGES, INSTAGRAM_IMAGES } from "@/demo/oxus-edge/data/images";
import HomeDropSection from "./HomeDropSection";

export default function HomePage() {
  const [gridKnives, setGridKnives] = useState<ResolvedProduct[]>([]);
  const [bestsellers, setBestsellers] = useState<ResolvedProduct[]>([]);

  useEffect(() => {
    Promise.all([api.getProducts(), api.getNonKnifeProducts()]).then(([allProducts, nonKnives]) => {
      const resolved = resolveProducts(allProducts);
      const knives = resolved
        .filter((p) => p.category === "knives" && !p.hidden)
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
      setGridKnives(knives.slice(0, STORE_CONFIG.maxPerSection));
      setBestsellers(
        resolveProducts(nonKnives)
          .filter((p) => !p.hidden && p.stock > 0)
          .slice(0, 3)
      );
    });
  }, []);

  return (
    <div className="page-gradient">
      {/* ── HERO ── */}
      <section className="relative h-dvh min-h-[640px] max-h-[1100px] flex items-end overflow-hidden">
        {/* Outdoor Lights — default hero, Gemini-generated outdoor scene */}
        <div className="hero-img hero-img-outdoor-lights absolute inset-0 overflow-hidden">
          <Image
            src={HERO_IMAGES.outdoorLights}
            alt="Outdoor lights at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
        </div>
        {/* Zoomed Up Knife Cutting — close-up detail shot (uses Studio framing sliders) */}
        <div className="hero-img hero-img-zoomed-knife-cutting absolute inset-0 overflow-hidden">
          <Image
            src={HERO_IMAGES.zoomedKnifeCutting}
            alt="Close-up of knife blade cutting"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={100}
          />
        </div>
        {/* Campfire Knife — mirrored + warm-side biased framing */}
        <div className="hero-img hero-img-campfire-knife absolute inset-0 overflow-hidden" style={{ transform: "scaleX(-1)" }}>
          <Image
            src={HERO_IMAGES.campfireKnife}
            alt="Knife beside a cozy campfire at a woodland campsite"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[80%_center] scale-110"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-depth-mocha via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 via-70% to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 pb-[15vh]">
          <div className="max-w-[580px]">
            <p className="text-ember text-[0.8rem] font-semibold tracking-[0.25em] uppercase mb-5 font-display">
              Forged in the Mountains
            </p>
            <h1 className="font-display text-[clamp(2.4rem,6.5vw,4.2rem)] font-medium leading-[1.03] tracking-[-0.01em] mb-6 text-white">
              Handcrafted Blades<br />
              from the <span className="text-ember">Ridgeline</span>
            </h1>
            <p className="text-white/70 text-[0.95rem] leading-[1.7] mb-10 max-w-[440px] [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]">
              Small-batch knives forged in the Appalachian tradition.
              Released through limited drops. When they sell out, they are gone.
            </p>
            <div className="flex gap-3">
              <Link href="/knives" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-ember text-white font-display text-[0.68rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-ember-light transition-all">
                Shop Knives
                <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/about" className="px-8 py-3.5 bg-white/[0.06] border border-white/[0.12] text-white font-display text-[0.68rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] hover:bg-white/[0.1] transition-all">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR KNIVES ── */}
      {gridKnives.length > 0 && (
        <section data-section className="py-24 bg-depth-mocha" style={{ '--s-bg': 'var(--color-depth-mocha)', '--s-next': 'var(--color-depth-roast)' } as React.CSSProperties}>
          <div className="s-inner mx-auto max-w-[1280px] px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-ember text-[0.75rem] font-semibold tracking-[0.25em] uppercase mb-2 font-display">Handforged Blades</p>
                <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] font-medium tracking-[0.01em]">Our Knives</h2>
              </div>
              <Link href="/knives" className="link-wipe flex items-center gap-2 text-[0.82rem] text-text-secondary hover:text-ember transition-colors font-display tracking-wide group">
                View all
                <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridKnives.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEXT DROP (separate section) — reads DropProvider directly ── */}
      <HomeDropSection />

      {/* ── BESTSELLERS (non-knife) ── */}
      <section data-section className="py-24 bg-depth-espresso" style={{ '--s-bg': 'var(--color-depth-espresso)', '--s-next': 'var(--color-depth-americano)' } as React.CSSProperties}>
        <div className="s-inner mx-auto max-w-[1280px] px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-ember text-[0.7rem] font-semibold tracking-[0.25em] uppercase mb-2 font-display">Bestsellers</p>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[0.01em]">Gear, Coffee &amp; Accessories</h2>
            </div>
            {bestsellers.length > 0 && (
              <Link href="/shop" className="link-wipe flex items-center gap-2 text-[0.82rem] text-text-secondary hover:text-ember transition-colors font-display tracking-wide group">
                View all
                <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            )}
          </div>

          {bestsellers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestsellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="group relative aspect-[3/4] rounded-[2px] overflow-hidden bg-bg-medium/40 border border-white/[0.04] flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="w-10 h-px bg-white/30 mx-auto mb-3" />
                    <p className="font-display text-[0.9rem] font-semibold tracking-[0.28em] uppercase text-white/80 block">Coming Soon</p>
                    <div className="w-10 h-px bg-white/30 mx-auto mt-3" />
                    <p className="text-text-muted text-[0.68rem] mt-4 max-w-[200px] mx-auto">
                      Accessories, coffee, and gear launching soon.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section data-section className="py-24 bg-depth-americano" style={{ '--s-bg': 'var(--color-depth-americano)', '--s-next': 'var(--color-depth-noir)' } as React.CSSProperties}>
        <div className="s-inner mx-auto max-w-[1280px] px-6">
          <div className="text-center mb-10">
            <p className="text-ember text-[0.65rem] font-semibold tracking-[0.25em] uppercase mb-2 font-display">@oxusedge</p>
            <h2 className="font-display text-[clamp(1.3rem,3vw,1.7rem)] font-medium tracking-[0.01em]">Follow the Journey</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-[3px]">
            {INSTAGRAM_IMAGES.map((src, i) => {
              const alts = ["Mountain landscape", "Knife on wood", "Trail in the Blue Ridge", "Sunrise over the mountains", "Campfire", "Mountain trail"];
              return (
                <a key={i} href="https://instagram.com/oxusedge" target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden rounded-none bg-bg-medium block" aria-label={`${alts[i] || `Oxus Edge photo ${i + 1}`} — view on Instagram`}>
                  <Image src={src} alt={alts[i] || `Oxus Edge photo ${i + 1}`} fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

      {/* ── NEVER MISS A DROP ── */}
      <section data-section className="relative py-24 overflow-hidden bg-depth-grounds" style={{ '--s-bg': 'var(--color-depth-grounds)', '--s-next': 'var(--color-depth-grounds)' } as React.CSSProperties}>
        <Image src={HERO_IMAGES.mistyMorning} alt="" fill className="object-cover opacity-[0.06]" />
        <div className="s-inner mx-auto max-w-[480px] px-6 text-center">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.1rem)] font-medium mb-4 tracking-[-0.01em]">Never Miss a Drop</h2>
          <p className="text-text-secondary text-[0.88rem] mb-8 leading-relaxed">One email when new blades drop. No spam.</p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
