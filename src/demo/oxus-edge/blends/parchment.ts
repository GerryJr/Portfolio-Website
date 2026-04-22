import type { BlendMode } from "./types";

/**
 * Parchment — Inspired by the Academia/Scholarly style.
 * Heavy vignette overlay gives a worn, aged look. Sections
 * blend through overlapping darkness at the edges like pages
 * of an old book. Center shows a subtle warm crease line.
 */
const blend: BlendMode = {
  id: "parchment",
  label: "Parchment",
  group: "Cinematic",
  description: "Aged vignette + warm crease",
  css: `
/* Strong scholarly vignette — heavier than other modes */
[data-blend="parchment"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background:
    radial-gradient(ellipse 85% 80% at 50% 50%,
      transparent 40%,
      rgba(0,0,0,0.18) 100%);
}
/* Bottom blend at sides + warm crease line at center */
[data-blend="parchment"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 10rem;
  pointer-events: none;
  z-index: 2;
  background:
    linear-gradient(to right,
      transparent 35%, rgba(200,100,58,0.03) 48%,
      rgba(200,100,58,0.05) 50%,
      rgba(200,100,58,0.03) 52%, transparent 65%)
      0 100% / 100% 1px no-repeat,
    linear-gradient(to bottom, transparent, var(--s-next));
  mask-image: linear-gradient(to right,
    black 0%, black 18%,
    rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.12) 60%,
    black 82%, black 100%);
  -webkit-mask-image: linear-gradient(to right,
    black 0%, black 18%,
    rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.12) 60%,
    black 82%, black 100%);
}`,
};

export default blend;
