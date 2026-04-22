import type { BlendMode } from "./types";

/**
 * Side Cascade — The blend cascades from the far edges inward.
 * The outermost edges blend taller/earlier than areas closer
 * to center. Creates a waterfall effect where the transition
 * ripples inward. Center holds a clean line.
 */
const blend: BlendMode = {
  id: "side-cascade",
  label: "Side Cascade",
  group: "Corner Blend",
  description: "Waterfall inward from edges",
  css: `
/* Full-width bottom gradient, masked with a tapered shape:
   tall at far edges → short near center */
[data-blend="side-cascade"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent, var(--s-next));
  mask-image:
    linear-gradient(to right, black, transparent 40%),
    linear-gradient(to left, black, transparent 40%);
  -webkit-mask-image:
    linear-gradient(to right, black, transparent 40%),
    linear-gradient(to left, black, transparent 40%);
  mask-composite: add;
  -webkit-mask-composite: source-over;
}
/* Subtle side darkening only at the bottom half */
[data-blend="side-cascade"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50%;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.06), transparent 12%,
    transparent 88%, rgba(0,0,0,0.06));
  mask-image: linear-gradient(to bottom, transparent, black);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black);
}`,
};

export default blend;
