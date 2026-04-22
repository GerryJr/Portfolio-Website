import type { KnifeFamily } from "./types";

// ═══════════════════════════════════════════
// KNIFE FAMILIES
//
// Each family represents a design philosophy
// and collection of knives that share traits.
// ═══════════════════════════════════════════

export const knifeFamilies: KnifeFamily[] = [
  {
    slug: "damascus",
    name: "Damascus Collection",
    tagline: "Every pattern tells a story",
    description: "Our premium line. Hand-forged from 256-layer Damascus steel (1095/15N20), each blade carries a one-of-a-kind pattern created by the folding process. Paired with stabilized burl handles and brass hardware.",
    imageKey: "knife-damascus-1",
  },
  {
    slug: "ridgeline",
    name: "Ridgeline Series",
    tagline: "Modern field knives for real work",
    description: "Purpose-built fixed blades for everyday carry, bushcraft, and field use. Clean lines, premium steels like CPM S35VN and Magnacut, and durable synthetic handles. The knives we reach for every day.",
    imageKey: "knife-bushcraft-1",
  },
  {
    slug: "heritage",
    name: "Heritage Collection",
    tagline: "Rooted in Appalachian tradition",
    description: "Traditional blade styles passed down through generations of mountain knifemakers. Jigged bone handles, brass bolsters, hidden tangs, and hand-filed details. Made the way they were a hundred years ago.",
    imageKey: "knife-clip-1",
  },
  {
    slug: "forge",
    name: "Forge Series",
    tagline: "Built heavy, built to last",
    description: "Camp-grade tools designed for chopping, splitting, and heavy processing. Extended tangs, thick spines, and aggressive grinds. These are the knives that do the hard work so the others don't have to.",
    imageKey: "knife-cleaver-1",
  },
  {
    slug: "trail",
    name: "Trail Series",
    tagline: "From the campfire to the creek",
    description: "Versatile outdoor knives for hikers, anglers, and camp cooks. Lighter builds, practical blade profiles, and materials that handle moisture and hard use in the field.",
    imageKey: "knife-droppoint-1",
  },
];
