// ═══════════════════════════════════════════
// DATA TYPES
// These types define the shape of all data
// that would come from the real API.
// ═══════════════════════════════════════════

export type Category = "knives" | "accessories" | "apparel" | "coffee";
export type BladeType = "Damascus" | "Drop Point" | "Tanto" | "Clip Point" | "Cleaver" | "Skinner" | "Bowie" | "Bushcraft" | "Fillet" | "Chef";
export type TangType = "Full Tang" | "Full Tang, Extended" | "Full Tang, Skeletonized" | "Hidden Tang (Rat-tail)" | "Partial Tang";
export type KnifeFamilySlug = "damascus" | "ridgeline" | "heritage" | "forge" | "trail";
export type DropStatus = "live" | "upcoming" | "ended";
export type OrderStatus = "processing" | "shipped" | "delivered";

export interface KnifeFamily {
  slug: KnifeFamilySlug;
  name: string;
  tagline: string;
  description: string;
  imageKey: string;
}

export interface ProductVariant {
  id: string;
  sku?: string; // stock-keeping unit, unique per colorway
  name: string;
  color: string; // primary hex
  colorSecondary?: string; // optional second hex for two-tone swatches
  inStock: boolean;
  /** Absolute / CDN URL of the variant-specific photo. */
  imageUrl?: string;
  /** @deprecated Use imageUrl. Kept for legacy products. */
  image?: string;
}

/**
 * Image manifest for a product. Production API returns absolute CDN URLs
 * here. Consumers should always read `product.images` — never reach into
 * a lookup table or build paths from name conventions.
 */
export interface ProductImages {
  primary: string;          // hero / default shot
  secondary?: string;       // optional alternate / hover shot
  gallery?: string[];       // additional detail shots (product page)
}

export interface Product {
  id: string;
  slug: string;
  sku?: string;             // stock-keeping unit for the product line
  name: string;
  category: Category;
  family?: KnifeFamilySlug;
  bladeType?: BladeType;
  price: number;
  compareAtPrice?: number;
  stock: number;

  /** Preferred: inline image manifest. Matches what the real API returns. */
  images?: ProductImages;

  /** @deprecated Legacy pool-keyed lookup. New products should use `images` instead. */
  imageKey?: string;
  /** @deprecated Legacy gallery as array of imageKeys. Use `images.gallery` instead. */
  gallery?: string[];

  drop?: boolean;
  variants?: ProductVariant[];
  description: string;
  shortDescription?: string;
  specs?: Record<string, string>;
  createdAt: string;
  updatedAt: string;

  // ── Data-driven display flags (API-controlled) ──
  comingSoon?: boolean;     // marks a product as upcoming (not yet purchasable)
  limitedStock?: boolean;   // explicit "Limited Stock" badge toggle
  hidden?: boolean;         // if true, product is excluded from listings
  releaseAt?: string;       // ISO date for scheduled release (used for countdown)
}

export interface Drop {
  id: string;
  name: string;
  status: DropStatus;
  scheduledAt: string; // ISO date
  endedAt?: string;
  description?: string;
  products: DropLineItem[];
  totalUnits: number;
  totalSold: number;
}

export interface DropLineItem {
  productId: string;
  unitsAllocated: number;
  unitsSold: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderLineItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
}

export interface OrderLineItem {
  productId: string;
  productName: string;
  quantity: number;
  priceEach: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
}

export interface UpcomingRelease {
  id: string;
  name: string;
  scheduledAt: string; // ISO date
  description: string;
  products: UpcomingLineItem[];
}

export interface UpcomingLineItem {
  productId: string;
  productName: string;
  unitsPlanned: number;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notificationPrefs: {
    emailDropAlerts: boolean;
    smsDropAlerts: boolean;
    emailOrderUpdates: boolean;
    emailNewsletter: boolean;
  };
  createdAt: string;
}
