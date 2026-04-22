import type { BlendMode } from "./types";

/**
 * Edge Drift — Asymmetric blending. Left side has a tall blend
 * zone (16rem), right side a shorter one (6rem). Creates visual
 * drift where the left transitions first. Center maintains the line.
 */
const blend: BlendMode = {
  id: "edge-drift",
  label: "Edge Drift",
  group: "Edge Merge",
  description: "Asymmetric L/R blend",
  css: `
/* Side vignette — slightly stronger on left */
[data-blend="edge-drift"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.2), transparent 20%,
    transparent 85%, rgba(0,0,0,0.12));
}
/* Tall left blend + short right blend, center gap */
[data-blend="edge-drift"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 16rem;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(to bottom, transparent, var(--s-next));
  mask-image: linear-gradient(to right,
    black 0%, black 10%,
    transparent 28%, transparent 72%,
    rgba(0,0,0,0.6) 88%, rgba(0,0,0,0.6) 100%);
  -webkit-mask-image: linear-gradient(to right,
    black 0%, black 10%,
    transparent 28%, transparent 72%,
    rgba(0,0,0,0.6) 88%, rgba(0,0,0,0.6) 100%);
}`,
};

export default blend;
