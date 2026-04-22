import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "6",
  label: "Double Rule",
  group: "Lines & Rules",
  description: "Twin fading lines",
  css: `
[data-blend="6"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 12%; right: 12%; bottom: -4px;
  height: 9px;
  pointer-events: none;
  z-index: 3;
  background:
    linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent) top    / 100% 1px no-repeat,
    linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent) bottom / 100% 1px no-repeat,
    linear-gradient(to right, transparent, rgba(200,100,58,0.04), transparent) center / 100% 100% no-repeat;
}
[data-blend="6"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 10rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent 0%, transparent 40%, var(--s-next) 100%);
}`,
};

export default blend;
