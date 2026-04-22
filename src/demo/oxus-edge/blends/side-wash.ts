import type { BlendMode } from "./types";

/**
 * Side Wash — The next section's color washes in from
 * the bottom-left and bottom-right corners. The top is
 * fully the section's own color. The bottom-center stays
 * true — a visible boundary line. The corners blend first.
 */
const blend: BlendMode = {
  id: "side-wash",
  label: "Side Wash",
  group: "Corner Blend",
  description: "Corners wash in, center holds",
  css: `
/* Bottom-left corner: next color fades in diagonally */
[data-blend="side-wash"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40%;
  height: 14rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to top right, var(--s-next) 0%, transparent 100%);
}
/* Bottom-right corner: mirror of left */
[data-blend="side-wash"] section[data-section]::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40%;
  height: 14rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to top left, var(--s-next) 0%, transparent 100%);
}`,
};

export default blend;
