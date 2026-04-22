// ═══════════════════════════════════════════
// MOCK API LAYER
//
// Every function simulates an async API call.
// When the real backend is ready, replace these
// with actual fetch() calls — the signatures
// and return types stay the same.
//
// Usage in pages:
//   const products = await api.getProducts();
//   const product = await api.getProductBySlug("damascus-hunter");
// ═══════════════════════════════════════════

import { products, ALL_PRODUCTS } from "@/demo/oxus-edge/data/products";
import { drops } from "@/demo/oxus-edge/data/drops";
import { orders } from "@/demo/oxus-edge/data/orders";
import { STORE_CONFIG } from "@/demo/oxus-edge/data/config";
import { PRODUCT_IMAGES } from "@/demo/oxus-edge/data/images";
import { knifeFamilies } from "@/demo/oxus-edge/data/families";
import type { Product, Drop, Order, Category, BladeType, KnifeFamilySlug, KnifeFamily, UpcomingRelease } from "@/demo/oxus-edge/data/types";

// Simulate network latency (0ms in prod, increase for testing)
const SIMULATED_DELAY = 0;

function delay<T>(value: T): Promise<T> {
  if (SIMULATED_DELAY === 0) return Promise.resolve(value);
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY));
}

// ── Image resolution ──────────────────────

export function resolveProductImage(imageKey: string): { primary: string; secondary: string } {
  return PRODUCT_IMAGES[imageKey] ?? { primary: "", secondary: "" };
}

export function resolveGallery(keys: string[]): string[] {
  return keys.map((k) => PRODUCT_IMAGES[k]?.primary).filter(Boolean) as string[];
}

// ── Products ──────────────────────────────

export async function getProducts(): Promise<Product[]> {
  return delay([...products]);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  return delay(products.filter((p) => p.category === category));
}

export async function getProductsByBladeType(bladeType: BladeType): Promise<Product[]> {
  return delay(products.filter((p) => p.bladeType === bladeType));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return delay(products.find((p) => p.slug === slug) ?? null);
}

export async function getProductById(id: string): Promise<Product | null> {
  return delay(products.find((p) => p.id === id) ?? null);
}

export async function getKnives(): Promise<Product[]> {
  return delay(products.filter((p) => p.category === "knives"));
}

export async function getNonKnifeProducts(): Promise<Product[]> {
  return delay(products.filter((p) => p.category !== "knives"));
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  return delay(products.filter((p) => p.stock > 0).slice(0, limit));
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.toLowerCase();
  return delay(
    products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.bladeType?.toLowerCase().includes(q)
    )
  );
}

// ── Categories ───────────────────────────

export async function getActiveCategories(): Promise<Category[]> {
  const cats = new Set<Category>();
  for (const p of products) cats.add(p.category);
  return delay(Array.from(cats));
}

// ── Knife Families ───────────────────────

export async function getKnifeFamilies(): Promise<KnifeFamily[]> {
  // Only return families that have active products
  const activeFamilies = new Set<KnifeFamilySlug>();
  for (const p of products) {
    if (p.family) activeFamilies.add(p.family);
  }
  return delay(knifeFamilies.filter((f) => activeFamilies.has(f.slug)));
}

export async function getKnifeFamilyBySlug(slug: string): Promise<KnifeFamily | null> {
  return delay(knifeFamilies.find((f) => f.slug === slug) ?? null);
}

export async function getProductsByFamily(familySlug: KnifeFamilySlug): Promise<Product[]> {
  return delay(products.filter((p) => p.family === familySlug));
}

// ── Drops ─────────────────────────────────

export async function getDrops(): Promise<Drop[]> {
  return delay([...drops]);
}

export async function getActiveDrop(): Promise<Drop | null> {
  return delay(drops.find((d) => d.status === "live") ?? null);
}

export async function getUpcomingDrop(): Promise<Drop | null> {
  return delay(drops.find((d) => d.status === "upcoming") ?? null);
}

export async function getDropById(id: string): Promise<Drop | null> {
  return delay(drops.find((d) => d.id === id) ?? null);
}

// ── Upcoming releases ────────────────────
// Announced products that aren't available yet.
// These are separate from active drops.

export async function getUpcomingReleases(): Promise<UpcomingRelease[]> {
  const releases: UpcomingRelease[] = STORE_CONFIG.upcoming.map((u) => ({
    id: u.id,
    name: u.name,
    scheduledAt: u.scheduledAt,
    description: u.description,
    products: u.products.map((p) => {
      const product = ALL_PRODUCTS.find((ap) => ap.id === p.productId);
      return {
        productId: p.productId,
        productName: product?.name ?? p.productId,
        unitsPlanned: p.unitsPlanned,
      };
    }),
  }));
  return delay(releases);
}

// ── Orders ────────────────────────────────

export async function getOrders(): Promise<Order[]> {
  return delay([...orders]);
}

export async function getOrdersByCustomer(customerId: string): Promise<Order[]> {
  return delay(orders.filter((o) => o.customerId === customerId));
}

export async function getOrderById(id: string): Promise<Order | null> {
  return delay(orders.find((o) => o.id === id) ?? null);
}

// ── Stats (for admin dashboard) ───────────

export async function getDashboardStats() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const activeDrops = drops.filter((d) => d.status === "live").length;
  const upcomingDrops = drops.filter((d) => d.status === "upcoming").length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  return delay({
    totalRevenue,
    totalOrders,
    activeDrops,
    upcomingDrops,
    totalProducts,
    lowStockProducts,
  });
}

// ── Inventory ─────────────────────────────

export async function getInventory() {
  return delay(
    products.map((p) => ({
      productId: p.id,
      name: p.name,
      category: p.category,
      inStock: p.stock,
      reserved: Math.min(Math.floor(Math.random() * 3), p.stock),
      get available() { return this.inStock - this.reserved; },
      get level() { return p.stock === 0 ? 0 : Math.min(100, Math.round((p.stock / 50) * 100)); },
    }))
  );
}

// ── Cart (client-side, but API-shaped) ────

export async function getCartItems() {
  return delay(
    STORE_CONFIG.cart.map((c) => ({ productId: c.productId, quantity: c.qty }))
  );
}
