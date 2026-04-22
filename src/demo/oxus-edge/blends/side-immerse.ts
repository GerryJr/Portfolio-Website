import type { BlendMode } from "./types";

/**
 * Side Immerse — The most aggressive corner blend. Three layers:
 * 1. Section bg becomes side-only gradient (center kept flat)
 * 2. Tall corner radials from both bottom corners (65% width)
 * 3. Side vignette deepening toward bottom
 * Only a narrow center spine holds the boundary line.
 */
const blend: BlendMode = {
  id: "side-immerse",
  label: "Side Immerse",
  group: "Corner Blend",
  description: "Triple-layer maximum blend",
  css: `
/* Layer 1: Section bg gradient, but center column masked flat */
[data-blend="side-immerse"] section[data-section] {
  background:
    linear-gradient(to right,
      rgba(0,0,0,0.12), transparent 20%,
      transparent 80%, rgba(0,0,0,0.12)),
    linear-gradient(to bottom, var(--s-bg), var(--s-next)) !important;
}
/* Layer 2: Large corner radials — very strong */
[data-blend="side-immerse"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 50%;
  pointer-events: none;
  z-index: 1;
  background:
    radial-gradient(ellipse 60% 90% at 0% 100%,
      var(--s-next) 0%, transparent 55%),
    radial-gradient(ellipse 60% 90% at 100% 100%,
      var(--s-next) 0%, transparent 55%);
}
/* Layer 3: Center flat strip restoring the boundary line */
[data-blend="side-immerse"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 30%;
  right: 30%;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  background: var(--s-bg);
  mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 60%, transparent 100%);
}`,
};

export default blend;
