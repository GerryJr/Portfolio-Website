import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "15",
  label: "Spotlight Seam",
  group: "Spotlight",
  description: "Sides merge, center line",
  css: `
[data-blend="15"] section[data-section] {
  background:
    radial-gradient(ellipse 70% 55% at 50% 45%,
      rgba(255,255,255,0.03) 0%, transparent 60%, rgba(0,0,0,0.15) 100%),
    linear-gradient(to bottom, var(--s-bg), var(--s-next)) !important;
}
[data-blend="15"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 12rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent, var(--s-next));
  mask-image: linear-gradient(to right,
    black 0%, black 18%, transparent 35%, transparent 65%, black 82%, black 100%);
  -webkit-mask-image: linear-gradient(to right,
    black 0%, black 18%, transparent 35%, transparent 65%, black 82%, black 100%);
}
[data-blend="15"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 20%; right: 20%; bottom: 0;
  height: 1px;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(to right,
    transparent, rgba(200,100,58,0.08) 20%,
    rgba(255,255,255,0.06) 50%,
    rgba(200,100,58,0.08) 80%, transparent);
  box-shadow: 0 0 10px 2px rgba(200,100,58,0.04);
}`,
};

export default blend;
