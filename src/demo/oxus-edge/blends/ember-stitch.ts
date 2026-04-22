import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "4",
  label: "Ember Stitch",
  group: "Lines & Rules",
  description: "Glow line + blend",
  css: `
[data-blend="4"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 8%; right: 8%; bottom: 0;
  height: 1px;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(to right, transparent, var(--color-ember), transparent);
  box-shadow:
    0 0 8px 1px rgba(200, 100, 58, 0.2),
    0 0 24px 4px rgba(200, 100, 58, 0.08);
}
[data-blend="4"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 10rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent, var(--s-next));
}`,
};

export default blend;
