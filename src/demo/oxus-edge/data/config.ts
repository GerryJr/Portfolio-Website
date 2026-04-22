// ═══════════════════════════════════════════
// STORE CONFIGURATION
//
// This is the single control panel for what
// the store displays. Change these values to
// test different scenarios.
// ═══════════════════════════════════════════

import type { DropStatus } from "./types";

export const STORE_CONFIG = {
  // ── Catalog visibility ─────────────────
  //   -1 = show all, 0 = hide, N = first N items
  catalog: {
    knives: 3,
    accessories: 0,
    apparel: 0,
    coffee: 0,
  },

  // ── Stock override ─────────────────────
  //   null = use each product's own stock
  stockOverride: null as number | null,

  // ── Max items per section on homepage ──
  maxPerSection: 6,

  // ── Active drops ───────────────────────
  drops: [
    {
      id: "d-001",
      name: "Jackstone Snyder Drop",
      status: "live" as DropStatus,
      scheduledAt: "2026-04-17T12:00:00-05:00",
      description: "Our first PVD-coated drop point. Six handle colorways, limited run.",
      products: [
        { productId: "k-100", unitsAllocated: 60, unitsSold: 23 },
      ],
    },
  ] as {
    id: string;
    name: string;
    status: DropStatus;
    scheduledAt: string;
    endedAt?: string;
    description: string;
    products: { productId: string; unitsAllocated: number; unitsSold: number }[];
  }[],

  // ── Upcoming releases ──────────────────
  upcoming: [
    {
      id: "u-002",
      name: "Redacted Coyote Drop",
      scheduledAt: "2026-05-03T12:00:00-05:00",
      description: "The Redacted Coyote — our tactical clip-point fixed blade in four two-tone colorways. Limited run — first come, first served.",
      products: [
        { productId: "k-102", unitsPlanned: 100 },
      ],
    },
  ],

  // ── Cart ────────────────────────────────
  cart: [] as { productId: string; name: string; variant: string; price: number; qty: number }[],
};
