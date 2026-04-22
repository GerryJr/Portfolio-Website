// ═══════════════════════════════════════════
// ASSET URL BUILDER
//
// Single source of truth for how images resolve.
// In production, set NEXT_PUBLIC_ASSET_BASE_URL to
// your CDN / S3 bucket base (e.g.
//   https://cdn.oxusedge.com
// or
//   https://oxus-edge-assets.s3.amazonaws.com
// ). The frontend never hard-codes hosts — every
// asset URL is built via `cdnUrl()` or resolved
// from a Product's `images` field (already absolute
// URLs when returned by a real API).
//
// When the real backend is wired up:
//   1. Upload the files under /public/products to S3
//      using the same relative path structure.
//   2. Set NEXT_PUBLIC_ASSET_BASE_URL to the bucket
//      or CDN host.
//   3. The API starts returning fully qualified URLs
//      directly on Product.images, so `cdnUrl()`
//      is only used for the remaining site assets
//      (hero / lifestyle / instagram).
// ═══════════════════════════════════════════

export const ASSET_BASE_URL = "/demo/oxus-edge";

/** Build a fully qualified asset URL. Passes http(s) URLs through unchanged. */
export function cdnUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return ASSET_BASE_URL + path;
  return ASSET_BASE_URL + "/" + path;
}

// Production layout: /products/{productId}/{subpath}
// Mock layout (legacy): /products/{brand-folder}/{subpath}
// This map lets callers use the product ID — which is what the real
// API returns — while continuing to hit the existing on-disk folders.
// Remove this map once assets are re-uploaded under {productId} paths.
const PRODUCT_ASSET_FOLDER: Record<string, string> = {
  "k-100": "jackstone",
  "k-101": "mkc-whitetail",
  "k-102": "redacted",
};

/** Build an asset URL for a product image keyed by its productId. */
export function productAssetUrl(productId: string, subpath: string): string {
  const folder = PRODUCT_ASSET_FOLDER[productId] ?? productId;
  const clean = subpath.startsWith("/") ? subpath.slice(1) : subpath;
  return cdnUrl(`/products/${folder}/${clean}`);
}
