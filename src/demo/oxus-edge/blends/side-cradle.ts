import type { BlendMode } from "./types";

/**
 * Side Cradle — The next color rises from the bottom corners
 * using radial gradients, creating a soft curved "cradle"
 * shape. More organic than the linear corner washes.
 * Center stays sharp.
 */
const blend: BlendMode = {
  id: "side-cradle",
  label: "Side Cradle",
  group: "Corner Blend",
  description: "Curved corner rise, organic",
  css: `
/* Left corner: radial gradient from bottom-left */
[data-blend="side-cradle"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 55%;
  height: 18rem;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
    ellipse 100% 100% at 0% 100%,
    var(--s-next) 0%,
    var(--s-next) 10%,
    transparent 60%
  );
}
/* Right corner: radial gradient from bottom-right */
[data-blend="side-cradle"] section[data-section]::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 55%;
  height: 18rem;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
    ellipse 100% 100% at 100% 100%,
    var(--s-next) 0%,
    var(--s-next) 10%,
    transparent 60%
  );
}`,
};

export default blend;
