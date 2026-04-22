import type { Product } from "./types";
import { STORE_CONFIG } from "./config";
import { productAssetUrl } from "@/demo/oxus-edge/lib/assets";

// ── Image manifest helper ─────────────────────────────
// A real API would return absolute CDN URLs directly on the Product.
// We build them here from productId + filename so that the mock data
// mirrors the production response shape exactly.
function mkImages(
  productId: string,
  files: { primary: string; secondary?: string; gallery?: string[] }
): { primary: string; secondary?: string; gallery?: string[] } {
  return {
    primary: productAssetUrl(productId, files.primary),
    secondary: files.secondary ? productAssetUrl(productId, files.secondary) : undefined,
    gallery: files.gallery?.map((f) => productAssetUrl(productId, f)),
  };
}

// ═══════════════════════════════════════════
// PRODUCT CATALOG
//
// ALL_PRODUCTS is the full "database." The exported
// `products` array is filtered by STORE_CONFIG.
// ═══════════════════════════════════════════

const ALL_PRODUCTS: Product[] = [
  // ══════════════════════════════════════════════
  // PRODUCTION-SHAPED PRODUCTS
  // These three carry the full production data model:
  //   - sku on product + each variant
  //   - images: { primary, secondary, gallery } with CDN-resolved URLs
  //   - variants[].imageUrl (no legacy `image` alias)
  //   - no imageKey / gallery string-array indirection
  // When the real API comes online, replace the mock objects with
  // `await fetch('/api/products/{id}')` responses and the consumers
  // downstream do not change.
  // ══════════════════════════════════════════════
  {
    id: "k-100",
    sku: "MKC-JS-PVD-001",
    slug: "jackstone-snyder-pvd",
    name: "Jackstone Snyder PVD",
    category: "knives", family: "ridgeline", bladeType: "Drop Point",
    price: 425, stock: 12,
    drop: true, limitedStock: true,
    images: mkImages("k-100", {
      primary: "photo-04.jpg",
      secondary: "photo-06.jpg",
      gallery: ["photo-03.jpg", "photo-04.jpg", "photo-05.jpg", "photo-06.jpg", "photo-07.jpg", "photo-08.jpg", "photo-09.jpg", "photo-10.jpg", "photo-11.jpg"],
    }),
    variants: [
      { id: "v-jk-black",      sku: "MKC-JS-PVD-BLK",    name: "Black",         color: "#1a1512",                              inStock: true,  imageUrl: productAssetUrl("k-100", "color-black.jpg") },
      { id: "v-jk-grey",       sku: "MKC-JS-PVD-GRY",    name: "Grey",          color: "#6a6560",                              inStock: true,  imageUrl: productAssetUrl("k-100", "color-grey.jpg") },
      { id: "v-jk-olive",      sku: "MKC-JS-PVD-OLV",    name: "Olive",         color: "#5e5a3a",                              inStock: true,  imageUrl: productAssetUrl("k-100", "color-olive.jpg") },
      { id: "v-jk-tan-blk",    sku: "MKC-JS-PVD-TNB",    name: "Tan / Black",   color: "#8a6a3a", colorSecondary: "#1a1512",   inStock: true,  imageUrl: productAssetUrl("k-100", "color-tan-black.jpg") },
      { id: "v-jk-green-blk",  sku: "MKC-JS-PVD-GNB",    name: "Green / Black", color: "#2e3a2e", colorSecondary: "#1a1512",   inStock: true,  imageUrl: productAssetUrl("k-100", "color-green-black.jpg") },
      { id: "v-jk-orange-blk", sku: "MKC-JS-PVD-ORB",    name: "Orange / Black", color: "#a84a1f", colorSecondary: "#1a1512",  inStock: false, imageUrl: productAssetUrl("k-100", "color-orange-black.jpg") },
    ],
    description: "The Snyder is a tough PVD-coated drop point built for heavy field use. The corrosion-resistant black PVD finish pairs with a textured polymer handle engineered for grip in wet conditions. Available in six handle colorways.",
    shortDescription: "PVD drop point, polymer handle, 6 colors",
    specs: { "Blade Length": '4.25"', "Overall Length": '9.0"', "Blade Steel": "CPM MagnaCut", "Blade Thickness": '0.17"', "Blade Grind": "Flat", "Blade Finish": "Black PVD", "Tang": "Full Tang", "Handle Material": "Textured Polymer", "Handle Fasteners": "Stainless Steel Bolts", "Hardness": "60-62 HRC", "Weight": "6.8 oz", "Sheath": "Kydex (included)", "Made In": "USA" },
    createdAt: "2026-04-17T00:00:00Z",
    updatedAt: "2026-04-17T00:00:00Z",
  },
  {
    id: "k-101",
    sku: "MKC-WT-PVD-001",
    slug: "whitetail-pvd",
    name: "Whitetail PVD",
    category: "knives", family: "trail", bladeType: "Drop Point",
    price: 395, stock: 0,
    drop: true,
    images: mkImages("k-101", {
      primary: "photo-06.jpg",
      secondary: "photo-02.jpg",
      gallery: ["photo-03.jpg", "photo-04.jpg", "photo-05.jpg", "photo-06.jpg", "photo-07.jpg", "photo-08.jpg", "photo-09.jpg", "photo-10.jpg", "photo-11.jpg"],
    }),
    variants: [
      { id: "v-wt-black",      sku: "MKC-WT-PVD-BLK",    name: "Black",         color: "#1a1512",                              inStock: true,  imageUrl: productAssetUrl("k-101", "color-black.jpg") },
      { id: "v-wt-grey",       sku: "MKC-WT-PVD-GRY",    name: "Grey",          color: "#6a6560",                              inStock: true,  imageUrl: productAssetUrl("k-101", "color-grey.jpg") },
      { id: "v-wt-olive",      sku: "MKC-WT-PVD-OLV",    name: "Olive",         color: "#5e5a3a",                              inStock: true,  imageUrl: productAssetUrl("k-101", "color-olive.jpg") },
      { id: "v-wt-tan-blk",    sku: "MKC-WT-PVD-TNB",    name: "Tan / Black",   color: "#8a6a3a", colorSecondary: "#1a1512",   inStock: true,  imageUrl: productAssetUrl("k-101", "color-tan-black.jpg") },
      { id: "v-wt-green-blk",  sku: "MKC-WT-PVD-GNB",    name: "Green / Black", color: "#2e3a2e", colorSecondary: "#1a1512",   inStock: false, imageUrl: productAssetUrl("k-101", "color-green-black.jpg") },
      { id: "v-wt-orange-blk", sku: "MKC-WT-PVD-ORB",    name: "Orange / Black", color: "#a84a1f", colorSecondary: "#1a1512",  inStock: true,  imageUrl: productAssetUrl("k-101", "color-orange-black.jpg") },
    ],
    description: "The Whitetail is our dedicated hunting blade. A deep-bellied drop point with a durable PVD finish, designed for the full workflow from field dressing to finishing. The handle slabs are hand-shaped to sit naturally under gloved hands.",
    shortDescription: "Hunting drop point, PVD finish, 6 colors",
    specs: { "Blade Length": '3.75"', "Overall Length": '8.25"', "Blade Steel": "CPM S35VN", "Blade Thickness": '0.15"', "Blade Grind": "High Flat", "Blade Finish": "Black PVD", "Tang": "Full Tang", "Handle Material": "G10 Textured", "Handle Fasteners": "Stainless Steel Bolts", "Hardness": "59-61 HRC", "Weight": "5.9 oz", "Sheath": "Kydex w/ Tek-Lok (included)", "Made In": "USA" },
    createdAt: "2026-04-17T00:00:00Z",
    updatedAt: "2026-04-17T00:00:00Z",
  },
  {
    id: "k-102",
    sku: "MKC-RD-COY-001",
    slug: "redacted-coyote",
    name: "Redacted Coyote",
    category: "knives", family: "forge", bladeType: "Clip Point",
    price: 485, stock: 0,
    drop: true,
    comingSoon: true, releaseAt: "2026-05-03T12:00:00-05:00",
    images: mkImages("k-102", {
      primary: "photo-06.jpg",
      secondary: "photo-04.jpg",
      gallery: ["photo-05.jpg", "photo-06.jpg", "photo-07.jpg", "photo-08.jpg", "photo-09.jpg", "photo-10.jpg", "photo-11.jpg", "photo-12.jpg", "photo-13.jpg"],
    }),
    variants: [
      { id: "v-rd-blk-blk", sku: "MKC-RD-COY-BBK", name: "Black / Black",   color: "#151515",                              inStock: true, imageUrl: productAssetUrl("k-102", "color-blk-blk.png") },
      { id: "v-rd-blk-coy", sku: "MKC-RD-COY-BCY", name: "Black / Coyote",  color: "#1a1512", colorSecondary: "#4a3e26",   inStock: true, imageUrl: productAssetUrl("k-102", "color-blk-coy.png") },
      { id: "v-rd-blk-od",  sku: "MKC-RD-COY-BOD", name: "Black / OD",      color: "#1a1512", colorSecondary: "#2e3528",   inStock: true, imageUrl: productAssetUrl("k-102", "color-blk-od.png") },
      { id: "v-rd-coy-od",  sku: "MKC-RD-COY-COD", name: "Coyote / OD",     color: "#5e5030", colorSecondary: "#2e3528",   inStock: true, imageUrl: productAssetUrl("k-102", "color-coy-od.png") },
    ],
    description: "The Redacted is our tactical-leaning fixed blade. A clip point profile optimized for utility and piercing work, paired with a ruggedized two-tone handle. Low-reflection PVD finish and a MOLLE-compatible Kydex sheath make it ready for demanding use.",
    shortDescription: "Tactical clip point, two-tone handle, 4 colors",
    specs: { "Blade Length": '4.0"', "Overall Length": '8.75"', "Blade Steel": "CPM 3V", "Blade Thickness": '0.18"', "Blade Grind": "Saber Flat", "Blade Finish": "Black PVD (non-reflective)", "Tang": "Full Tang (skeletonized)", "Handle Material": "G10 (two-tone)", "Handle Fasteners": "Stainless Steel Bolts", "Hardness": "58-60 HRC", "Weight": "7.2 oz", "Sheath": "Kydex w/ MOLLE clips (included)", "Made In": "USA" },
    createdAt: "2026-04-17T00:00:00Z",
    updatedAt: "2026-04-17T00:00:00Z",
  },

  // ── KNIVES: Damascus Collection ────────
  {
    id: "k-001", slug: "damascus-hunter", name: "Damascus Hunter", category: "knives", family: "damascus", bladeType: "Damascus", price: 349, stock: 0, drop: true,
    imageKey: "knife-damascus-1",
    gallery: ["knife-damascus-1", "knife-tanto-1", "knife-droppoint-1", "knife-cleaver-1"],
    variants: [
      { id: "v-walnut", name: "Walnut Burl", color: "#5c3a1e", inStock: true },
      { id: "v-ebony", name: "Ebony", color: "#1a1512", inStock: true },
      { id: "v-olive", name: "Olive Wood", color: "#6b5c3e", inStock: true },
    ],
    description: "Hand-forged from 256-layer Damascus steel with a walnut burl handle and brass pins. Each blade is individually tempered and sharpened to a razor edge. The Damascus pattern is unique to every blade.",
    shortDescription: "256-layer Damascus, walnut burl handle",
    specs: { "Blade Length": '4.5"', "Overall Length": '9.25"', "Blade Steel": "Damascus (1095/15N20)", "Blade Thickness": '0.18"', "Blade Grind": "Flat", "Tang": "Full Tang", "Handle Material": "Stabilized Walnut Burl", "Handle Fasteners": "Brass Pins", "Hardness": "58-60 HRC", "Weight": "7.8 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-01-15", updatedAt: "2026-04-01",
  },
  {
    id: "k-015", slug: "damascus-tanto", name: "Damascus Tanto", category: "knives", family: "damascus", bladeType: "Tanto", price: 389, stock: 0, drop: false,
    imageKey: "knife-tanto-1",
    gallery: ["knife-tanto-1", "knife-damascus-1"],
    variants: [
      { id: "v-walnut", name: "Walnut Burl", color: "#5c3a1e", inStock: false },
      { id: "v-micarta", name: "Canvas Micarta", color: "#4a4535", inStock: false },
    ],
    description: "The Damascus Tanto pairs our signature 256-layer steel with a reinforced chisel-ground tanto point. The geometric blade profile is designed for piercing and fine detail work, with the visual depth of hand-forged Damascus.",
    shortDescription: "256-layer Damascus, chisel-ground tanto",
    specs: { "Blade Length": '4.75"', "Overall Length": '9.5"', "Blade Steel": "Damascus (1095/15N20)", "Blade Thickness": '0.19"', "Blade Grind": "Chisel", "Tang": "Full Tang", "Handle Material": "Stabilized Walnut Burl", "Handle Fasteners": "Brass Pins", "Hardness": "58-60 HRC", "Weight": "8.1 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-03-01", updatedAt: "2026-04-01",
  },
  {
    id: "k-016", slug: "damascus-skinner", name: "Damascus Skinner", category: "knives", family: "damascus", bladeType: "Skinner", price: 369, stock: 3, drop: true,
    imageKey: "knife-skinner-1",
    gallery: ["knife-skinner-1", "knife-damascus-1"],
    description: "A dedicated skinning blade in Damascus steel. The upswept edge glides through field processing with control, while the layered steel pattern makes each blade a collector-grade piece as well as a working tool.",
    shortDescription: "256-layer Damascus, upswept skinner",
    specs: { "Blade Length": '3.75"', "Overall Length": '8.0"', "Blade Steel": "Damascus (1095/15N20)", "Blade Thickness": '0.14"', "Blade Grind": "Convex", "Tang": "Full Tang", "Handle Material": "Stabilized Buckeye Burl", "Handle Fasteners": "Brass Pins", "Hardness": "58-60 HRC", "Weight": "5.4 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-03-10", updatedAt: "2026-04-01",
  },

  // ── KNIVES: Ridgeline Series ───────────
  {
    id: "k-002", slug: "ridgeline-tanto", name: "Ridgeline Tanto", category: "knives", family: "ridgeline", bladeType: "Tanto", price: 399, stock: 8, drop: true,
    imageKey: "knife-tanto-1",
    gallery: ["knife-tanto-1", "knife-damascus-1", "knife-droppoint-1"],
    description: "Japanese-inspired tanto blade with G10 handle scales and a hand-ground edge. The chisel grind is designed for piercing and fine work, while the reinforced tip handles prying without rolling.",
    shortDescription: "CPM S35VN tanto, G10 scales",
    specs: { "Blade Length": '5.0"', "Overall Length": '10.5"', "Blade Steel": "CPM S35VN", "Blade Thickness": '0.19"', "Blade Grind": "Chisel", "Tang": "Full Tang", "Handle Material": "G10 (Black)", "Handle Fasteners": "Stainless Steel Bolts", "Hardness": "59-61 HRC", "Weight": "8.4 oz", "Sheath": "Kydex (included)", "Made In": "USA" },
    createdAt: "2026-01-15", updatedAt: "2026-04-01",
  },
  {
    id: "k-009", slug: "ridgeline-bushcraft", name: "Ridgeline Bushcraft", category: "knives", family: "ridgeline", bladeType: "Bushcraft", price: 329, stock: 12, drop: true,
    imageKey: "knife-bushcraft-1",
    gallery: ["knife-bushcraft-1", "knife-droppoint-1", "knife-bowie-1"],
    description: "Scandi-ground bushcraft blade designed for wood processing, fire prep, and shelter building. The 90-degree spine throws sparks from a ferro rod with ease.",
    shortDescription: "CPM 3V, canvas Micarta handle",
    specs: { "Blade Length": '4.25"', "Overall Length": '9.0"', "Blade Steel": "CPM 3V", "Blade Thickness": '0.16"', "Blade Grind": "Scandi", "Tang": "Full Tang", "Handle Material": "Canvas Micarta (Natural)", "Handle Fasteners": "Stainless Steel Bolts", "Hardness": "60-62 HRC", "Weight": "7.2 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-03-05", updatedAt: "2026-04-01",
  },
  {
    id: "k-011", slug: "ridgeline-edc", name: "Ridgeline EDC", category: "knives", family: "ridgeline", bladeType: "Drop Point", price: 239, stock: 22,
    imageKey: "knife-droppoint-1",
    description: "Compact everyday carry fixed blade. Small enough for a belt, capable enough for real work. The perfect knife for those who want a fixed blade they can carry daily.",
    shortDescription: "Magnacut steel, G10 scales",
    specs: { "Blade Length": '3.0"', "Overall Length": '6.75"', "Blade Steel": "Magnacut", "Blade Thickness": '0.12"', "Blade Grind": "Flat", "Tang": "Full Tang", "Handle Material": "G10 (Dark Earth)", "Handle Fasteners": "Torx Bolts", "Hardness": "62-64 HRC", "Weight": "3.8 oz", "Sheath": "Kydex (included)", "Made In": "USA" },
    createdAt: "2026-03-15", updatedAt: "2026-04-01",
  },
  {
    id: "k-017", slug: "ridgeline-drop-point", name: "Ridgeline Drop Point", category: "knives", family: "ridgeline", bladeType: "Drop Point", price: 309, stock: 10, drop: true,
    imageKey: "knife-droppoint-1",
    gallery: ["knife-droppoint-1", "knife-bushcraft-1"],
    description: "The all-rounder of the Ridgeline line. A classic drop point profile in CPM S35VN with a flat grind that slices effortlessly. G10 scales, stainless hardware, and a Kydex sheath make this a no-fuss field knife.",
    shortDescription: "CPM S35VN drop point, G10 scales",
    specs: { "Blade Length": '4.0"', "Overall Length": '8.75"', "Blade Steel": "CPM S35VN", "Blade Thickness": '0.15"', "Blade Grind": "Flat", "Tang": "Full Tang", "Handle Material": "G10 (OD Green)", "Handle Fasteners": "Stainless Steel Bolts", "Hardness": "59-61 HRC", "Weight": "6.5 oz", "Sheath": "Kydex (included)", "Made In": "USA" },
    createdAt: "2026-03-20", updatedAt: "2026-04-01",
  },

  // ── KNIVES: Heritage Collection ────────
  {
    id: "k-005", slug: "trapper-clip-point", name: "Trapper Clip Point", category: "knives", family: "heritage", bladeType: "Clip Point", price: 279, stock: 2, drop: true,
    imageKey: "knife-clip-1",
    gallery: ["knife-clip-1", "knife-skinner-1", "knife-damascus-1"],
    description: "Traditional clip point with brass bolsters and bone scales. A working trapper's blade with roots in Appalachian knifemaking tradition. The clip point excels at detail work.",
    shortDescription: "440C stainless, jigged bone handle",
    specs: { "Blade Length": '3.75"', "Overall Length": '8.0"', "Blade Steel": "440C Stainless", "Blade Thickness": '0.14"', "Blade Grind": "Hollow", "Tang": "Hidden Tang (Rat-tail)", "Handle Material": "Jigged Bone", "Handle Fasteners": "Brass Bolsters & Pins", "Hardness": "56-58 HRC", "Weight": "5.2 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-02-05", updatedAt: "2026-04-01",
  },
  {
    id: "k-007", slug: "fireside-skinner", name: "Fireside Skinner", category: "knives", family: "heritage", bladeType: "Skinner", price: 319, stock: 0, drop: true,
    imageKey: "knife-skinner-1",
    gallery: ["knife-skinner-1", "knife-clip-1", "knife-damascus-1"],
    description: "Curved skinning blade optimized for field processing. The upswept edge profile glides under hide without puncturing, while the finger choil gives precise control.",
    shortDescription: "Damascus, buckeye burl handle",
    specs: { "Blade Length": '3.5"', "Overall Length": '7.75"', "Blade Steel": "Damascus (1095/15N20)", "Blade Thickness": '0.13"', "Blade Grind": "Convex", "Tang": "Full Tang, Skeletonized", "Handle Material": "Stabilized Buckeye Burl", "Handle Fasteners": "Brass Pins", "Hardness": "58-60 HRC", "Weight": "4.8 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2025-09-15", updatedAt: "2026-04-01",
  },
  {
    id: "k-013", slug: "heritage-clip", name: "Heritage Clip", category: "knives", family: "heritage", bladeType: "Clip Point", price: 299, stock: 0, drop: true,
    imageKey: "knife-clip-1",
    description: "Traditional Appalachian clip point with hand-filed jimping and a stag handle. A tribute to the mountain knifemakers who came before us.",
    shortDescription: "1084 carbon, stag handle",
    specs: { "Blade Length": '4.0"', "Overall Length": '8.5"', "Blade Steel": "1084 High Carbon", "Blade Thickness": '0.15"', "Blade Grind": "Hollow", "Tang": "Hidden Tang (Rat-tail)", "Handle Material": "Natural Stag", "Handle Fasteners": "Brass Bolsters", "Hardness": "57-59 HRC", "Weight": "5.8 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2025-10-01", updatedAt: "2026-04-01",
  },

  // ── KNIVES: Forge Series ───────────────
  {
    id: "k-004", slug: "oxus-cleaver", name: "Oxus Cleaver", category: "knives", family: "forge", bladeType: "Cleaver", price: 429, stock: 10, drop: true,
    imageKey: "knife-cleaver-1",
    gallery: ["knife-cleaver-1", "knife-bowie-1", "knife-damascus-1"],
    description: "Heavy-duty camp cleaver with full tang construction. The wide blade profile excels at chopping, splitting kindling, and breaking down large cuts. A beast with surprising finesse.",
    shortDescription: "5160 spring steel, Micarta handle",
    specs: { "Blade Length": '6.5"', "Overall Length": '12.0"', "Blade Steel": "5160 Spring Steel", "Blade Thickness": '0.25"', "Blade Grind": "Flat", "Tang": "Full Tang, Extended", "Handle Material": "Micarta (OD Green)", "Handle Fasteners": "Stainless Steel Bolts", "Hardness": "56-58 HRC", "Weight": "14.2 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-02-01", updatedAt: "2026-04-01",
  },
  {
    id: "k-008", slug: "summit-bowie", name: "Summit Bowie", category: "knives", family: "forge", bladeType: "Bowie", price: 449, stock: 5, drop: true,
    imageKey: "knife-bowie-1",
    gallery: ["knife-bowie-1", "knife-damascus-1", "knife-cleaver-1"],
    description: "Full-size bowie knife with a clip point and hand-forged guard. Built for hard camp work and self-reliance in the backcountry. The kind of blade that gets passed down.",
    shortDescription: "1095 carbon, rosewood with brass guard",
    specs: { "Blade Length": '8.0"', "Overall Length": '13.5"', "Blade Steel": "1095 High Carbon", "Blade Thickness": '0.22"', "Blade Grind": "Flat", "Tang": "Full Tang", "Handle Material": "Rosewood", "Handle Fasteners": "Brass Guard & Pins", "Hardness": "57-59 HRC", "Weight": "12.6 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-03-01", updatedAt: "2026-04-01",
  },
  {
    id: "k-012", slug: "forge-tanto", name: "Forge Tanto", category: "knives", family: "forge", bladeType: "Tanto", price: 369, stock: 6, drop: true,
    imageKey: "knife-tanto-1",
    description: "A heavier tanto built for hard use. The reinforced tip geometry and thick spine make this blade a workhorse for batoning, prying, and breaking through tough materials.",
    shortDescription: "CPM 4V, Micarta scales",
    specs: { "Blade Length": '5.5"', "Overall Length": '11.0"', "Blade Steel": "CPM 4V", "Blade Thickness": '0.20"', "Blade Grind": "Chisel", "Tang": "Full Tang", "Handle Material": "Micarta (Black)", "Handle Fasteners": "Stainless Steel Bolts", "Hardness": "60-62 HRC", "Weight": "9.8 oz", "Sheath": "Kydex (included)", "Made In": "USA" },
    createdAt: "2026-03-20", updatedAt: "2026-04-01",
  },

  // ── KNIVES: Trail Series ───────────────
  {
    id: "k-003", slug: "timber-drop-point", name: "Timber Drop Point", category: "knives", family: "trail", bladeType: "Drop Point", price: 289, stock: 15, drop: true,
    imageKey: "knife-droppoint-1",
    gallery: ["knife-droppoint-1", "knife-damascus-1", "knife-bowie-1"],
    description: "Classic drop point in 1095 high carbon steel. Full tang with stabilized curly maple scales. The workhorse of the lineup — a straightforward blade that does everything well.",
    shortDescription: "1095 carbon, curly maple handle",
    specs: { "Blade Length": '4.0"', "Overall Length": '8.75"', "Blade Steel": "1095 High Carbon", "Blade Thickness": '0.16"', "Blade Grind": "Convex", "Tang": "Full Tang", "Handle Material": "Stabilized Curly Maple", "Handle Fasteners": "Brass Pins", "Hardness": "57-59 HRC", "Weight": "6.9 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-01-20", updatedAt: "2026-04-01",
  },
  {
    id: "k-006", slug: "camp-chef", name: "Camp Chef", category: "knives", family: "trail", bladeType: "Chef", price: 389, stock: 7, drop: true,
    imageKey: "knife-chef-1",
    gallery: ["knife-chef-1", "knife-cleaver-1", "knife-damascus-1"],
    description: "Large kitchen-style blade built for camp cooking. Whether slicing onions at the fire pit or filleting trout streamside, the Camp Chef handles food prep with confidence.",
    shortDescription: "1084 carbon, walnut with brass rivets",
    specs: { "Blade Length": '7.0"', "Overall Length": '12.5"', "Blade Steel": "1084 High Carbon", "Blade Thickness": '0.10"', "Blade Grind": "Convex", "Tang": "Full Tang", "Handle Material": "Walnut with Brass Rivets", "Handle Fasteners": "Brass Rivets", "Hardness": "58-60 HRC", "Weight": "9.6 oz", "Sheath": "Canvas Roll (included)", "Made In": "USA" },
    createdAt: "2026-02-10", updatedAt: "2026-04-01",
  },
  {
    id: "k-010", slug: "creek-fillet", name: "Creek Fillet", category: "knives", family: "trail", bladeType: "Fillet", price: 259, stock: 18, drop: false,
    imageKey: "knife-fillet-1",
    gallery: ["knife-fillet-1", "knife-chef-1"],
    description: "Flexible fillet knife for trout, bass, and panfish. The thin, flexible blade follows the contour of the fish for clean, waste-free fillets every time.",
    shortDescription: "440C stainless, cork & rubber handle",
    specs: { "Blade Length": '6.0"', "Overall Length": '11.0"', "Blade Steel": "440C Stainless", "Blade Thickness": '0.06"', "Blade Grind": "Flat (Flexible)", "Tang": "Full Tang", "Handle Material": "Cork & Rubber Composite", "Handle Fasteners": "Stainless Rivets", "Hardness": "55-57 HRC", "Weight": "4.1 oz", "Sheath": "Plastic (included)", "Made In": "USA" },
    createdAt: "2026-03-10", updatedAt: "2026-04-01",
  },
  {
    id: "k-014", slug: "trail-companion", name: "Trail Companion", category: "knives", family: "trail", bladeType: "Drop Point", price: 269, stock: 20,
    imageKey: "knife-droppoint-1",
    description: "A mid-size drop point designed to be the one knife you take on every hike. Handles everything from food prep to feather sticks without complaint.",
    shortDescription: "1095 carbon, walnut scales",
    specs: { "Blade Length": '3.75"', "Overall Length": '8.25"', "Blade Steel": "1095 High Carbon", "Blade Thickness": '0.14"', "Blade Grind": "Convex", "Tang": "Full Tang", "Handle Material": "Stabilized Walnut", "Handle Fasteners": "Brass Pins", "Hardness": "57-59 HRC", "Weight": "6.2 oz", "Sheath": "Leather (included)", "Made In": "USA" },
    createdAt: "2026-03-25", updatedAt: "2026-04-01",
  },

  // ── ACCESSORIES ────────────────────────
  {
    id: "a-001", slug: "leather-belt-sheath", name: "Leather Belt Sheath", category: "accessories", price: 59, stock: 42,
    imageKey: "acc-sheath-leather", description: "Full-grain leather sheath with snap closure and belt loop. Fits most fixed blades under 5 inches.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "a-002", slug: "premium-sharpening-kit", name: "Premium Sharpening Kit", category: "accessories", price: 45, stock: 18,
    imageKey: "acc-sharpen", description: "Diamond stone and leather strop combo kit with honing compound. Everything you need to maintain a razor edge.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "a-003", slug: "knife-care-oil", name: "Knife Care Oil", category: "accessories", price: 12, stock: 67,
    imageKey: "acc-oil", description: "Food-safe mineral oil for blade maintenance. Prevents rust and keeps handles conditioned. 4 oz bottle.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "a-004", slug: "kydex-sheath", name: "Kydex Sheath", category: "accessories", price: 39, stock: 28,
    imageKey: "acc-sheath-kydex", description: "Custom-molded Kydex sheath with adjustable belt clip. Secure retention and silent draw.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "a-005", slug: "leather-strop", name: "Leather Strop", category: "accessories", price: 28, stock: 34,
    imageKey: "acc-strop", description: "Double-sided paddle strop with green and white compound. Maintains a mirror polish between sharpenings.",
    createdAt: "2026-02-01", updatedAt: "2026-04-01",
  },
  {
    id: "a-006", slug: "field-sharpener", name: "Field Sharpener", category: "accessories", price: 22, stock: 50,
    imageKey: "acc-sharpen", description: "Compact diamond rod sharpener for the trail. Fits in your pocket. Restores a working edge in under a minute.",
    createdAt: "2026-02-01", updatedAt: "2026-04-01",
  },

  // ── APPAREL ────────────────────────────
  {
    id: "ap-001", slug: "oxus-edge-beanie", name: "Oxus Edge Beanie", category: "apparel", price: 34, stock: 0,
    imageKey: "apparel-beanie", description: "Knit beanie with embroidered Oxus Edge shield logo. One size fits most. 100% merino wool.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "ap-002", slug: "oxus-edge-hoodie", name: "Oxus Edge Hoodie", category: "apparel", price: 68, stock: 23,
    imageKey: "apparel-hoodie", description: "Heavyweight pullover hoodie with screen-printed logo. 80/20 cotton-poly blend. Runs true to size.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "ap-003", slug: "workshop-tee", name: "Workshop Tee", category: "apparel", price: 28, stock: 35,
    imageKey: "apparel-tee", description: "Comfort-fit tee with forge workshop graphic. 100% combed ring-spun cotton. Pre-shrunk.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "ap-004", slug: "snapback-cap", name: "Snapback Cap", category: "apparel", price: 32, stock: 19,
    imageKey: "apparel-cap", description: "Structured snapback with leather Oxus Edge patch. Adjustable snap closure. One size fits most.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "ap-005", slug: "ridge-flannel", name: "Ridge Flannel", category: "apparel", price: 78, stock: 14,
    imageKey: "apparel-flannel", description: "Heavyweight flannel shirt in earth-tone plaid. Double-needle stitching throughout. Perfect for the workshop or the trail.",
    createdAt: "2026-03-01", updatedAt: "2026-04-01",
  },

  // ── COFFEE ─────────────────────────────
  {
    id: "c-001", slug: "basecamp-dark-roast", name: "Basecamp Dark Roast", category: "coffee", price: 18, stock: 54,
    imageKey: "coffee-dark", description: "Bold, smoky dark roast sourced from Colombian highlands. 12 oz whole bean. Roasted in small batches by friends in Asheville.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "c-002", slug: "fireside-blend", name: "Fireside Blend", category: "coffee", price: 18, stock: 31,
    imageKey: "coffee-medium", description: "Medium roast with notes of chocolate and hazelnut. Perfect for cold mornings on the ridge. 12 oz whole bean.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "c-003", slug: "summit-single-origin", name: "Summit Single Origin", category: "coffee", price: 22, stock: 12,
    imageKey: "coffee-light", description: "Light roast Ethiopian single origin with berry and citrus notes. For those who like their coffee bright. 12 oz whole bean.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "c-004", slug: "trail-mix-sampler", name: "Trail Mix Sampler", category: "coffee", price: 28, stock: 8,
    imageKey: "coffee-sampler", description: "Three 4oz bags: Dark, Medium, and Light roast. Perfect for gifting or trying all three profiles.",
    createdAt: "2026-01-01", updatedAt: "2026-04-01",
  },
  {
    id: "c-005", slug: "cold-brew-concentrate", name: "Cold Brew Concentrate", category: "coffee", price: 16, stock: 40,
    imageKey: "coffee-dark", description: "Ready-to-dilute cold brew concentrate. Makes 8 servings. Dark roast base with smooth, low-acid finish.",
    createdAt: "2026-02-15", updatedAt: "2026-04-01",
  },
  {
    id: "c-006", slug: "camp-pour-over-kit", name: "Camp Pour-Over Kit", category: "coffee", price: 35, stock: 15,
    imageKey: "coffee-sampler", description: "Stainless steel pour-over dripper + 50 paper filters. Packs flat. Makes great coffee anywhere with just hot water.",
    createdAt: "2026-03-01", updatedAt: "2026-04-01",
  },
];

// ── Apply config to build the active catalog ──

function applyConfig(allProducts: Product[]): Product[] {
  const { catalog, stockOverride } = STORE_CONFIG;
  const result: Product[] = [];
  const categories = ["knives", "accessories", "apparel", "coffee"] as const;

  for (const cat of categories) {
    const limit = catalog[cat];
    if (limit === 0) continue;

    const catProducts = allProducts.filter((p) => p.category === cat);
    const sliced = limit === -1 ? catProducts : catProducts.slice(0, limit);

    for (const p of sliced) {
      result.push({
        ...p,
        stock: stockOverride !== null ? stockOverride : p.stock,
        drop: STORE_CONFIG.drops.some((d) =>
          d.products.some((dp) => dp.productId === p.id)
        ) || p.drop,
      });
    }
  }

  return result;
}

export { ALL_PRODUCTS };
export const products: Product[] = applyConfig(ALL_PRODUCTS);
