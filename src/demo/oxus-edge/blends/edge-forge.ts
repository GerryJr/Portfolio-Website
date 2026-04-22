import type { BlendMode } from "./types";

/**
 * Edge Forge — Side vignette with warm ember tint at the edges.
 * The ember warmth at the side boundaries makes adjacent sections
 * feel "welded" together. Center stays clean — hard boundary.
 */
const blend: BlendMode = {
  id: "edge-forge",
  label: "Edge Forge",
  group: "Edge Merge",
  description: "Warm ember side weld",
  css: `
/* Side vignette with ember warmth */
[data-blend="edge-forge"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background:
    linear-gradient(to right,
      rgba(200,100,58,0.05), transparent 14%,
      transparent 86%, rgba(200,100,58,0.05)),
    linear-gradient(to right,
      rgba(0,0,0,0.16), transparent 16%,
      transparent 84%, rgba(0,0,0,0.16));
}
/* Bottom blend at sides only — ember-tinted */
[data-blend="edge-forge"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 8rem;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(to bottom, transparent, var(--s-next));
  mask-image: linear-gradient(to right,
    black 0%, black 12%,
    transparent 30%, transparent 70%,
    black 88%, black 100%);
  -webkit-mask-image: linear-gradient(to right,
    black 0%, black 12%,
    transparent 30%, transparent 70%,
    black 88%, black 100%);
}`,
};

export default blend;
