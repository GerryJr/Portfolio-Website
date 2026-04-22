import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import Footer from "@/demo/oxus-edge/components/Footer";
import * as api from "@/demo/oxus-edge/api";
import { resolveProducts, type ResolvedProduct } from "@/demo/oxus-edge/api/helpers";
import { PRODUCT_IMAGES } from "@/demo/oxus-edge/data/images";
import type { KnifeFamily } from "@/demo/oxus-edge/data/types";
import KnivesClient from "./KnivesClient";
import OxusEdgeNotFound from "./OxusEdgeNotFound";

export default function KnifeFamilyPage() {
  const { family: familySlug } = useParams<{ family: string }>();
  const [state, setState] = useState<{
    status: "loading" | "notfound" | "ready";
    familyData?: KnifeFamily;
    resolved?: ResolvedProduct[];
  }>({ status: "loading" });

  useEffect(() => {
    if (!familySlug) {
      setState({ status: "notfound" });
      return;
    }
    api.getKnifeFamilyBySlug(familySlug).then((familyData) => {
      if (!familyData) {
        setState({ status: "notfound" });
        return;
      }
      api.getProductsByFamily(familyData.slug).then((products) => {
        setState({ status: "ready", familyData, resolved: resolveProducts(products) });
      });
    });
  }, [familySlug]);

  if (state.status === "loading") return null;
  if (state.status === "notfound") return <OxusEdgeNotFound />;

  const { familyData, resolved } = state;
  if (!familyData || !resolved) return null;
  const imgData = PRODUCT_IMAGES[familyData.imageKey];

  return (
    <>
      <div className="bg-depth-mocha">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="pt-10 pb-8">
          <nav className="text-xs text-text-muted mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-ember transition-colors">Home</Link>
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/40" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <Link href="/knives" className="hover:text-ember transition-colors">Knives</Link>
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-text-muted/40" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="text-text-primary font-medium">{familyData.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-1 aspect-[4/3] relative rounded-[2px] overflow-hidden bg-bg-medium">
              {imgData?.primary && (
                <Image src={imgData.primary} alt={familyData.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
              )}
            </div>
            <div className="lg:col-span-2 flex flex-col justify-center">
              <p className="text-ember text-[0.65rem] font-semibold tracking-[0.25em] uppercase mb-3 font-display">{familyData.tagline}</p>
              <h1 className="font-display text-[clamp(1.5rem,3vw,1.9rem)] font-medium tracking-[0.01em] mb-4">{familyData.name}</h1>
              <p className="text-text-secondary text-[0.88rem] leading-[1.7] max-w-xl">{familyData.description}</p>
            </div>
          </div>
        </div>

        <KnivesClient products={resolved} families={[]} />
      </div>
      </div>
      <Footer />
    </>
  );
}
