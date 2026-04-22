import type { BlendMode } from "./types";

/**
 * Side Drape — The section background itself becomes a gradient
 * (current → next color), but ONLY at the side columns. The center
 * ~30% keeps the flat original color. Pseudo-elements add extra
 * depth with bottom corner radials. The sides drape smoothly
 * from one section to the next.
 */
const blend: BlendMode = {
  id: "side-drape",
  label: "Side Drape",
  group: "Corner Blend",
  description: "Full-height side gradient, flat center",
  css: `
/* Override section bg with a gradient, then mask center to stay flat */
[data-blend="side-drape"] section[data-section] {
  background: linear-gradient(to bottom, var(--s-bg), var(--s-next)) !important;
}
/* Center strip: restores original flat color over the gradient */
[data-blend="side-drape"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 25%;
  right: 25%;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  background: var(--s-bg);
  mask-image: linear-gradient(to bottom, black 0%, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 70%, transparent 100%);
}
/* Soft feather edges where the center strip meets the gradient sides */
[data-blend="side-drape"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 15%;
  right: 15%;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  background: var(--s-bg);
  mask-image:
    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
    linear-gradient(to bottom, black 0%, black 50%, transparent 100%);
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
    linear-gradient(to bottom, black 0%, black 50%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
}`,
};

export default blend;
