import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "10",
  label: "Woven",
  group: "Immersive",
  description: "L/R interlocking blend",
  css: `
[data-blend="10"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 50%; bottom: 0;
  height: 14rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent, var(--s-next));
  mask-image: linear-gradient(to right, black, transparent);
  -webkit-mask-image: linear-gradient(to right, black, transparent);
}
[data-blend="10"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 50%; right: 0; bottom: 0;
  height: 8rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent, var(--s-next));
  mask-image: linear-gradient(to left, black, transparent);
  -webkit-mask-image: linear-gradient(to left, black, transparent);
}`,
};

export default blend;
