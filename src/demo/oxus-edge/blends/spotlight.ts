import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "7",
  label: "Spotlight",
  group: "Spotlight",
  description: "Radial glow + fade",
  css: `
[data-blend="7"] section[data-section] {
  background:
    radial-gradient(ellipse 70% 55% at 50% 45%,
      rgba(255,255,255,0.03) 0%,
      transparent 60%,
      rgba(0,0,0,0.15) 100%),
    linear-gradient(to bottom, var(--s-bg), var(--s-next)) !important;
}`,
};

export default blend;
