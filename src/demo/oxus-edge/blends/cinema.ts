import type { BlendMode } from "./types";

/**
 * Cinema — Inspired by Modern Dark Cinema style.
 * Cinematic letterbox-style top/bottom darkening per section
 * combined with a wide horizontal vignette. Sections feel like
 * film frames dissolving into each other. Deep, atmospheric.
 */
const blend: BlendMode = {
  id: "cinema",
  label: "Cinema",
  group: "Cinematic",
  description: "Film-frame atmospheric depth",
  css: `
/* Cinematic letterbox + side vignette per section */
[data-blend="cinema"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background:
    linear-gradient(to bottom,
      rgba(0,0,0,0.08) 0%, transparent 8%,
      transparent 88%, rgba(0,0,0,0.12) 100%),
    linear-gradient(to right,
      rgba(0,0,0,0.14), transparent 14%,
      transparent 86%, rgba(0,0,0,0.14));
}
/* Wide bottom blend with cinematic easing (slow start, fast end) */
[data-blend="cinema"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 16rem;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(to bottom,
    transparent 0%, transparent 40%,
    var(--s-next) 100%);
  mask-image: linear-gradient(to right,
    black 0%, black 20%,
    rgba(0,0,0,0.3) 42%, rgba(0,0,0,0.3) 58%,
    black 80%, black 100%);
  -webkit-mask-image: linear-gradient(to right,
    black 0%, black 20%,
    rgba(0,0,0,0.3) 42%, rgba(0,0,0,0.3) 58%,
    black 80%, black 100%);
}`,
};

export default blend;
