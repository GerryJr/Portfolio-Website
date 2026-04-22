
import { useState, useEffect } from "react";
import Link from "@/demo/oxus-edge/lib/next-link";
import Image from "@/demo/oxus-edge/lib/next-image";
import { products } from "@/demo/oxus-edge/data/products";
import { resolveProduct } from "@/demo/oxus-edge/api/helpers";

const STORAGE_KEY = "oxus-recently-viewed";
const MAX_ITEMS = 4;

/** Call this from product pages to track views */
export function trackView(productId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const filtered = ids.filter((id) => id !== productId);
    filtered.unshift(productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS + 1)));
  } catch { /* ignore */ }
}

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [items, setItems] = useState<ReturnType<typeof resolveProduct>[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const ids: string[] = JSON.parse(raw);
      const resolved = ids
        .filter((id) => id !== excludeId)
        .slice(0, MAX_ITEMS)
        .map((id) => products.find((p) => p.id === id || p.slug === id))
        .filter(Boolean)
        .map((p) => resolveProduct(p!));
      setItems(resolved);
    } catch { /* ignore */ }
  }, [excludeId]);

  if (items.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="font-display text-lg tracking-[0.06em] mb-6 flex items-center gap-3">
        <span>Recently Viewed</span>
        <span className="flex-1 h-px bg-border" />
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="group shrink-0 w-[160px]"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-bg-medium rounded-[2px]">
              <Image src={p.img} alt={p.name} fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <p className="mt-2 text-sm font-medium truncate group-hover:text-ember transition-colors">{p.name}</p>
            <p className="text-sm text-ember font-semibold tabular-nums">${p.price}.00</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
