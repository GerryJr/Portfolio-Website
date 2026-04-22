// ═══════════════════════════════════════════
// IMAGE REGISTRY
// All image URLs live here. When real product photos
// are ready, swap URLs here — nothing else changes.
// ═══════════════════════════════════════════

// Site hero imagery. Three primary brand heroes live in /public/heroes/
// (production: move to CDN under the same path). The remaining stock keys are
// ambient background imagery used elsewhere on the site.
export const HERO_IMAGES = {
  // ── Brand heroes (switchable from Studio) ──
  outdoorLights: "/demo/oxus-edge/heroes/outdoor-lights.png",
  zoomedKnifeCutting: "/demo/oxus-edge/heroes/zoomed-knife-cutting.jpg",
  campfireKnife: "/demo/oxus-edge/heroes/campfire-knife.jpg",

  // ── Ambient background stock ──
  blueRidge: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=85&auto=format",
  smokyDawn: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85&auto=format",
  mountainCampfire: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1920&q=85&auto=format",
  forestTrail: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=85&auto=format",
  mountainCabin: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1920&q=85&auto=format",
  mistyMorning: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format",
};

export const LIFESTYLE_IMAGES = {
  mountainStream: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80&auto=format",
  coffeeCamp: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=1200&q=80&auto=format",
  trailHike: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80&auto=format",
  parkwayOverlook: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80&auto=format",
  campfireEmbers: "https://images.unsplash.com/photo-1497906539264-eb74442e37a9?w=1200&q=80&auto=format",
  fogTrees: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1200&q=80&auto=format",
  workshop: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1200&q=80&auto=format",
  mountainMeadow: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80&auto=format",
};

export const INSTAGRAM_IMAGES = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80&auto=format",
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&q=80&auto=format",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&auto=format",
  "https://images.unsplash.com/photo-1497906539264-eb74442e37a9?w=400&q=80&auto=format",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80&auto=format",
];

// Product image pools — each product references these by key
// When real photos arrive, just update the URL for each key
export const PRODUCT_IMAGES: Record<string, { primary: string; secondary: string }> = {
  // Knives
  "knife-damascus-1": {
    primary: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&q=80&auto=format",
  },
  "knife-tanto-1": {
    primary: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80&auto=format",
  },
  "knife-droppoint-1": {
    primary: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80&auto=format",
  },
  "knife-cleaver-1": {
    primary: "https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80&auto=format",
  },
  "knife-clip-1": {
    primary: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=600&q=80&auto=format",
  },
  "knife-chef-1": {
    primary: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?w=600&q=80&auto=format",
  },
  "knife-skinner-1": {
    primary: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format",
  },
  "knife-bowie-1": {
    primary: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=600&q=80&auto=format",
  },
  "knife-bushcraft-1": {
    primary: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80&auto=format",
  },
  "knife-fillet-1": {
    primary: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=600&q=80&auto=format",
  },
  // Accessories
  "acc-sheath-leather": {
    primary: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&q=80&auto=format",
  },
  "acc-sheath-kydex": {
    primary: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=80&auto=format",
  },
  "acc-sharpen": {
    primary: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=80&auto=format",
  },
  "acc-oil": {
    primary: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80&auto=format",
  },
  "acc-strop": {
    primary: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80&auto=format",
  },
  // Apparel
  "apparel-beanie": {
    primary: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80&auto=format",
  },
  "apparel-hoodie": {
    primary: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&auto=format",
  },
  "apparel-tee": {
    primary: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80&auto=format",
  },
  "apparel-cap": {
    primary: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80&auto=format",
  },
  "apparel-flannel": {
    primary: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80&auto=format",
  },
  // Coffee
  "coffee-dark": {
    primary: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80&auto=format",
  },
  "coffee-medium": {
    primary: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&q=80&auto=format",
  },
  "coffee-light": {
    primary: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80&auto=format",
  },
  "coffee-sampler": {
    primary: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80&auto=format",
    secondary: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80&auto=format",
  },

  // ══════════════════════════════════════════
  // Real Product Photography (local)
  // ══════════════════════════════════════════

  // Jackstone Snyder (6 color variants, 19 photos)
  "jackstone-primary":  { primary: "/demo/oxus-edge/products/jackstone/photo-01.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-02.jpg" },
  "jackstone-detail-1": { primary: "/demo/oxus-edge/products/jackstone/photo-03.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-04.jpg" },
  "jackstone-detail-2": { primary: "/demo/oxus-edge/products/jackstone/photo-05.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-06.jpg" },
  "jackstone-detail-3": { primary: "/demo/oxus-edge/products/jackstone/photo-07.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-08.jpg" },
  "jackstone-detail-4": { primary: "/demo/oxus-edge/products/jackstone/photo-09.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-10.jpg" },
  "jackstone-detail-5": { primary: "/demo/oxus-edge/products/jackstone/photo-11.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-12.jpg" },
  "jackstone-detail-6": { primary: "/demo/oxus-edge/products/jackstone/photo-13.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-14.jpg" },
  "jackstone-detail-7": { primary: "/demo/oxus-edge/products/jackstone/photo-15.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-16.jpg" },
  "jackstone-detail-8": { primary: "/demo/oxus-edge/products/jackstone/photo-17.jpg", secondary: "/demo/oxus-edge/products/jackstone/photo-18.jpg" },

  // MKC Whitetail PVD (6 color variants, ~39 photos)
  "mkc-whitetail-primary":  { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-01.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-02.jpg" },
  "mkc-whitetail-detail-1": { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-03.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-04.jpg" },
  "mkc-whitetail-detail-2": { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-05.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-06.jpg" },
  "mkc-whitetail-detail-3": { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-07.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-08.jpg" },
  "mkc-whitetail-detail-4": { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-09.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-10.jpg" },
  "mkc-whitetail-detail-5": { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-11.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-12.jpg" },
  "mkc-whitetail-detail-6": { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-13.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-14.jpg" },
  "mkc-whitetail-detail-7": { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-15.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-16.jpg" },
  "mkc-whitetail-detail-8": { primary: "/demo/oxus-edge/products/mkc-whitetail/photo-17.jpg", secondary: "/demo/oxus-edge/products/mkc-whitetail/photo-18.jpg" },

  // Redacted Coyote (4 color variants, 23 photos)
  "redacted-primary":  { primary: "/demo/oxus-edge/products/redacted/photo-02.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-04.jpg" },
  "redacted-detail-1": { primary: "/demo/oxus-edge/products/redacted/photo-05.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-06.jpg" },
  "redacted-detail-2": { primary: "/demo/oxus-edge/products/redacted/photo-07.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-08.jpg" },
  "redacted-detail-3": { primary: "/demo/oxus-edge/products/redacted/photo-09.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-10.jpg" },
  "redacted-detail-4": { primary: "/demo/oxus-edge/products/redacted/photo-11.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-12.jpg" },
  "redacted-detail-5": { primary: "/demo/oxus-edge/products/redacted/photo-13.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-14.jpg" },
  "redacted-detail-6": { primary: "/demo/oxus-edge/products/redacted/photo-15.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-16.jpg" },
  "redacted-detail-7": { primary: "/demo/oxus-edge/products/redacted/photo-17.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-18.jpg" },
  "redacted-detail-8": { primary: "/demo/oxus-edge/products/redacted/photo-19.jpg", secondary: "/demo/oxus-edge/products/redacted/photo-20.jpg" },
};
