import type { Drop } from "./types";
import { STORE_CONFIG } from "./config";

// ═══════════════════════════════════════════
// DROPS
//
// Generated from STORE_CONFIG.drops.
// Each drop is a batch of products released at
// the same time — limited supply, not limited
// time. Products stay available until sold out.
//
// To change drops, edit config.ts.
// ═══════════════════════════════════════════

function buildDrops(): Drop[] {
  return STORE_CONFIG.drops.map((d) => {
    const totalUnits = d.products.reduce((sum, p) => sum + p.unitsAllocated, 0);
    const totalSold = d.products.reduce((sum, p) => sum + p.unitsSold, 0);

    return {
      id: d.id,
      name: d.name,
      status: d.status,
      scheduledAt: d.scheduledAt,
      endedAt: d.status === "ended" ? d.scheduledAt : undefined,
      description: d.description,
      products: d.products.map((p) => ({
        productId: p.productId,
        unitsAllocated: p.unitsAllocated,
        unitsSold: p.unitsSold,
      })),
      totalUnits,
      totalSold,
    };
  });
}

export const drops: Drop[] = buildDrops();
