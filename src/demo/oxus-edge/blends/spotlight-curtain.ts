import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "14",
  label: "Spotlight Curtain",
  group: "Spotlight",
  description: "Sides merge, center hard",
  css: `
[data-blend="14"] section[data-section] {
  background:
    radial-gradient(ellipse 70% 55% at 50% 45%,
      rgba(255,255,255,0.03) 0%, transparent 60%, rgba(0,0,0,0.15) 100%),
    linear-gradient(to bottom, var(--s-bg), var(--s-next)) !important;
}
[data-blend="14"] section[data-section]::after {
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
}`,
};

export default blend;
