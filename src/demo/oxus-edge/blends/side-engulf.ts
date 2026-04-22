import type { BlendMode } from "./types";

/**
 * Side Engulf — Multi-layered: a very tall bottom gradient
 * at the sides (28rem) PLUS a full-height side vignette that
 * deepens toward the bottom. The two layers stack for extra depth.
 * The sides feel engulfed by the next section's color.
 */
const blend: BlendMode = {
  id: "side-engulf",
  label: "Side Engulf",
  group: "Corner Blend",
  description: "Double-layer deep side blend",
  css: `
/* Layer 1: Full-height side vignette that gets stronger toward bottom */
[data-blend="side-engulf"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.22), transparent 22%,
    transparent 78%, rgba(0,0,0,0.22));
  mask-image: linear-gradient(to bottom, transparent 20%, black 80%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 20%, black 80%);
}
/* Layer 2: Tall bottom gradient, masked to sides only */
[data-blend="side-engulf"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 28rem;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(to bottom, transparent 0%, var(--s-next) 100%);
  mask-image:
    linear-gradient(to right, black, transparent 45%),
    linear-gradient(to left, black, transparent 45%);
  -webkit-mask-image:
    linear-gradient(to right, black, transparent 45%),
    linear-gradient(to left, black, transparent 45%);
  mask-composite: add;
  -webkit-mask-composite: source-over;
}`,
};

export default blend;
