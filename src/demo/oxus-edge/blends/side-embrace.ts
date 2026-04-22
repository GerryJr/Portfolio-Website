import type { BlendMode } from "./types";

/**
 * Side Embrace — A curved U-shaped blend that wraps around
 * the bottom of each section. The next color "embraces" the
 * section from below, hugging tightly at the sides and curving
 * away from the center. Uses radial masking for the curve.
 */
const blend: BlendMode = {
  id: "side-embrace",
  label: "Side Embrace",
  group: "Corner Blend",
  description: "Curved U-shaped wrap",
  css: `
/* Full-width bottom gradient with an elliptical mask that
   carves out the center, leaving a curved U shape */
[data-blend="side-embrace"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 26rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom,
    transparent 0%, var(--s-next) 100%);
  mask-image: radial-gradient(
    ellipse 35% 70% at 50% 110%,
    transparent 0%, transparent 60%,
    black 80%);
  -webkit-mask-image: radial-gradient(
    ellipse 35% 70% at 50% 110%,
    transparent 0%, transparent 60%,
    black 80%);
}
/* Side darkening that deepens toward bottom for extra immersion */
[data-blend="side-embrace"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.16), transparent 18%,
    transparent 82%, rgba(0,0,0,0.16));
  mask-image: linear-gradient(to bottom, transparent 30%, black);
  -webkit-mask-image: linear-gradient(to bottom, transparent 30%, black);
}`,
};

export default blend;
