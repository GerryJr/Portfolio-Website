import type { BlendMode } from "./types";

/**
 * Side Pinch — Very wide corner blends that almost meet in
 * the center, leaving only a narrow gap (about 20% width)
 * where the original boundary line is visible. The sides
 * are fully blended — the center is "pinched" to hold the line.
 */
const blend: BlendMode = {
  id: "side-pinch",
  label: "Side Pinch",
  group: "Corner Blend",
  description: "Wide blend, pinched center line",
  css: `
/* Left corner: extends almost to center */
[data-blend="side-pinch"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 48%;
  height: 16rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to top right,
    var(--s-next) 0%,
    var(--s-next) 12%,
    transparent 85%);
}
/* Right corner: mirror — nearly meets the left */
[data-blend="side-pinch"] section[data-section]::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48%;
  height: 16rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to top left,
    var(--s-next) 0%,
    var(--s-next) 12%,
    transparent 85%);
}`,
};

export default blend;
