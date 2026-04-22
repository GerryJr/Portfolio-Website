import type { BlendMode } from "./types";

/**
 * Side Flood — Maximum side coverage. Each side's blend zone
 * reaches 48% of the viewport width and stands 30rem tall.
 * Only a narrow 4% center strip holds the original boundary.
 * The next color floods in from both edges like rising water.
 */
const blend: BlendMode = {
  id: "side-flood",
  label: "Side Flood",
  group: "Corner Blend",
  description: "Massive side flood, thin center line",
  css: `
[data-blend="side-flood"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 48%;
  height: 30rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to top right,
    var(--s-next) 0%,
    var(--s-next) 15%,
    transparent 75%);
}
[data-blend="side-flood"] section[data-section]::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48%;
  height: 30rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to top left,
    var(--s-next) 0%,
    var(--s-next) 15%,
    transparent 75%);
}`,
};

export default blend;
