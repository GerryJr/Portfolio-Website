import type { BlendMode } from "./types";

/**
 * Side Sweep — Wider, taller corner blends (50% width, 20rem).
 * More dramatic than Side Wash — the next color sweeps further
 * in from each corner. The center gap is narrower but still
 * holds the boundary line.
 */
const blend: BlendMode = {
  id: "side-sweep",
  label: "Side Sweep",
  group: "Corner Blend",
  description: "Wide corner sweep, narrow center",
  css: `
/* Left corner: wide sweep */
[data-blend="side-sweep"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 20rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to top right,
    var(--s-next) 0%,
    var(--s-next) 5%,
    transparent 70%);
}
/* Right corner: mirror */
[data-blend="side-sweep"] section[data-section]::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 20rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to top left,
    var(--s-next) 0%,
    var(--s-next) 5%,
    transparent 70%);
}`,
};

export default blend;
