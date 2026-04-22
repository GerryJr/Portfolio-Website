import { useEffect, useState } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import Footer from "@/demo/oxus-edge/components/Footer";
import * as api from "@/demo/oxus-edge/api";
import { resolveProducts, type ResolvedProduct } from "@/demo/oxus-edge/api/helpers";
import { HERO_IMAGES } from "@/demo/oxus-edge/data/images";
import type { KnifeFamily } from "@/demo/oxus-edge/data/types";
import KnivesClient from "./KnivesClient";
import KnivesHeroBanner from "./KnivesHeroBanner";


export default function KnivesPage() {
  const [resolved, setResolved] = useState<ResolvedProduct[]>([]);
  const [families, setFamilies] = useState<KnifeFamily[]>([]);

  useEffect(() => {
    Promise.all([api.getKnives(), api.getKnifeFamilies()]).then(([allKnives, fams]) => {
      setResolved(resolveProducts(allKnives));
      setFamilies(fams);
    });
  }, []);

  return (
    <>
      {/* Hero — with integrated drop timer if applicable */}
      <section className="relative h-[320px] md:h-[400px] flex items-end overflow-hidden">
        <Image
          src={HERO_IMAGES.smokyDawn}
          alt="Mountain ridge at dawn"
          fill
          priority
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-depth-mocha via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <nav className="text-xs text-white/70 mb-4 flex items-center gap-1.5">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                <span className="text-white font-medium">Knives</span>
              </nav>
              <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium tracking-[-0.01em] text-white mb-2">
                Handforged Blades
              </h1>
              <p className="text-white/70 text-[0.9rem] max-w-lg leading-relaxed [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]">
                {resolved.length} {resolved.length === 1 ? "blade" : "blades"} across {families.length} {families.length === 1 ? "collection" : "collections"}.
              </p>
            </div>

            {/* Drop timer in hero — reads DropProvider directly */}
            <KnivesHeroBanner />
          </div>
        </div>
      </section>

      {/* Main content — sidebar filters + unified grid */}
      <div className="bg-depth-mocha">
        <div className="mx-auto max-w-[1280px] px-6 pt-10">
          <KnivesClient products={resolved} families={families} />
        </div>
      </div>
      <Footer />
    </>
  );
}
