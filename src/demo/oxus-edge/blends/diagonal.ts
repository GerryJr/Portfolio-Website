import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "5",
  label: "Diagonal",
  group: "Immersive",
  description: "Angled sweep",
  css: `
[data-blend="5"] section[data-section] {
  overflow: hidden;
}
[data-blend="5"] section[data-section]::after {
  content: "";
  position: absolute;
  left: -5%; right: -5%; bottom: -1.5rem;
  height: 3rem;
  pointer-events: none;
  z-index: 2;
  background: var(--s-next);
  transform: skewY(-0.8deg);
  transform-origin: right;
}
[data-blend="5"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 8rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent, var(--s-next));
}`,
};

export default blend;
