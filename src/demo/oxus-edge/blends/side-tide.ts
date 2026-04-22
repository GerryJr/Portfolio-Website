import type { BlendMode } from "./types";

/**
 * Side Tide — Large radial gradients from each bottom corner
 * that rise like a tide. The radials reach 50% of the section
 * height and 60% of the width. The next color rises from both
 * sides as if the section is being submerged from the edges.
 */
const blend: BlendMode = {
  id: "side-tide",
  label: "Side Tide",
  group: "Corner Blend",
  description: "Rising tide from corners",
  css: `
/* Left tide — large radial from bottom-left */
[data-blend="side-tide"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 65%;
  height: 50%;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
    ellipse 100% 100% at 0% 100%,
    var(--s-next) 0%,
    var(--s-next) 18%,
    transparent 65%);
}
/* Right tide — mirror */
[data-blend="side-tide"] section[data-section]::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 65%;
  height: 50%;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
    ellipse 100% 100% at 100% 100%,
    var(--s-next) 0%,
    var(--s-next) 18%,
    transparent 65%);
}`,
};

export default blend;
