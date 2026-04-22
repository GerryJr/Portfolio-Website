// Helpers to bridge API data → component props.
// These reshape the raw Product into the `ResolvedProduct` that UI
// components consume. This layer is where "how storage looks" meets
// "how the UI expects to read things."
//
// Two product shapes are supported simultaneously:
//   1. Production shape — product carries its own `images` + variant.imageUrl.
//      This is what the real API will return. Nothing needs to be looked up.
//   2. Legacy shape — product references `imageKey` + `gallery: string[]`,
//      and variants use `image`. Falls back to the PRODUCT_IMAGES table.
//
// New products must use shape #1.

import { PRODUCT_IMAGES } from "@/demo/oxus-edge/data/images";
import type { Product, KnifeFamilySlug, ProductVariant } from "@/demo/oxus-edge/data/types";

export interface ResolvedProduct {
  id: string;
  sku?: string;
  slug: string;
  name: string;
  category: Product["category"];
  family?: KnifeFamilySlug;
  bladeType?: Product["bladeType"];
  price: number;
  stock: number;
  drop?: boolean;
  variants?: ProductVariant[];
  /** Primary product image URL. */
  img: string;
  /** Alternate / hover image URL (may be empty if the product has no secondary). */
  imgHover: string;
  /** Ordered array of additional image URLs for the PDP. */
  gallery: string[];
  description: string;
  shortDescription?: string;
  specs?: Record<string, string>;
  comingSoon?: boolean;
  limitedStock?: boolean;
  hidden?: boolean;
  releaseAt?: string;
  createdAt: string;
}

function resolveImages(p: Product): { primary: string; secondary: string; gallery: string[] } {
  // Preferred: inline `images` on the product (production shape).
  if (p.images) {
    return {
      primary: p.images.primary ?? "",
      secondary: p.images.secondary ?? "",
      gallery: p.images.gallery ?? [],
    };
  }
  // Legacy: imageKey + gallery[] of imageKeys.
  const main = p.imageKey ? PRODUCT_IMAGES[p.imageKey] : undefined;
  const galleryKeys = p.gallery ?? (p.imageKey ? [p.imageKey] : []);
  return {
    primary: main?.primary ?? "",
    secondary: main?.secondary ?? "",
    gallery: galleryKeys.map((k) => PRODUCT_IMAGES[k]?.primary).filter(Boolean) as string[],
  };
}

function normalizeVariants(p: Product): ProductVariant[] | undefined {
  if (!p.variants) return undefined;
  // Unify `imageUrl` (new) with legacy `image` so downstream components
  // read a single field regardless of product vintage.
  const normalized = p.variants.map((v) => ({
    ...v,
    imageUrl: v.imageUrl ?? v.image,
    image: v.imageUrl ?? v.image, // keep alias populated for any legacy consumer
  }));
  // Coming-soon products haven't launched yet — per-variant inStock flags
  // are meaningless. Normalize to true so no unavailable swatch shows.
  return p.comingSoon ? normalized.map((v) => ({ ...v, inStock: true })) : normalized;
}

export function resolveProduct(p: Product): ResolvedProduct {
  const images = resolveImages(p);
  return {
    id: p.id,
    sku: p.sku,
    slug: p.slug,
    name: p.name,
    category: p.category,
    family: p.family,
    bladeType: p.bladeType,
    price: p.price,
    stock: p.stock,
    drop: p.drop,
    variants: normalizeVariants(p),
    img: images.primary,
    imgHover: images.secondary,
    gallery: images.gallery,
    description: p.description,
    shortDescription: p.shortDescription,
    specs: p.specs,
    comingSoon: p.comingSoon,
    limitedStock: p.limitedStock,
    hidden: p.hidden,
    releaseAt: p.releaseAt,
    createdAt: p.createdAt,
  };
}

export function resolveProducts(products: Product[]): ResolvedProduct[] {
  return products.map(resolveProduct);
}
