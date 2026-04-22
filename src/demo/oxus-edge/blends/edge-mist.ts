import type { BlendMode } from "./types";

/**
 * Edge Mist — Side vignette darkens edges of each section.
 * At section boundaries the dark edges of adjacent sections merge
 * invisibly, while the center retains a clean visible line.
 * A short gradient at the sides-only softens the edge transition.
 */
const blend: BlendMode = {
  id: "edge-mist",
  label: "Edge Mist",
  group: "Edge Merge",
  description: "Side darkness, center line",
  css: `
/* Per-section horizontal vignette — darkens left/right edges */
[data-blend="edge-mist"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.18), transparent 18%,
    transparent 82%, rgba(0,0,0,0.18));
}
/* Short bottom gradient visible ONLY at the sides */
[data-blend="edge-mist"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 6rem;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(to bottom, transparent, var(--s-next));
  mask-image: linear-gradient(to right,
    black 0%, black 15%,
    transparent 35%, transparent 65%,
    black 85%, black 100%);
  -webkit-mask-image: linear-gradient(to right,
    black 0%, black 15%,
    transparent 35%, transparent 65%,
    black 85%, black 100%);
}`,
};

export default blend;
