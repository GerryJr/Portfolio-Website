import type { BlendMode } from "./types";

/**
 * Side Breathe — The section background is a vertical gradient
 * from current to next color across its full height, but the
 * center 30% is masked back to the solid original color.
 * The side columns breathe naturally from one color to the next.
 * The center holds firm. Softer than Side Drape, wider blend.
 */
const blend: BlendMode = {
  id: "side-breathe",
  label: "Side Breathe",
  group: "Corner Blend",
  description: "Side columns fade, center holds",
  css: `
/* Full section gradient */
[data-blend="side-breathe"] section[data-section] {
  background: linear-gradient(to bottom,
    var(--s-bg) 0%, var(--s-next) 100%) !important;
}
/* Center column: original color restored, fading out toward bottom */
[data-blend="side-breathe"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 20%;
  right: 20%;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  background: var(--s-bg);
  mask-image:
    linear-gradient(to right,
      transparent 0%, black 12%, black 88%, transparent 100%),
    linear-gradient(to bottom,
      black 0%, black 40%, transparent 90%);
  -webkit-mask-image:
    linear-gradient(to right,
      transparent 0%, black 12%, black 88%, transparent 100%),
    linear-gradient(to bottom,
      black 0%, black 40%, transparent 90%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
}
/* Subtle extra darkening at far edges for depth */
[data-blend="side-breathe"] section[data-section]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.08), transparent 10%,
    transparent 90%, rgba(0,0,0,0.08));
}`,
};

export default blend;
