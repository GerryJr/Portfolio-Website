import type { BlendMode } from "./types";

/**
 * Edge Shadow — Each section casts a large downward box-shadow
 * that darkens the top of the next section, strongest at the
 * viewport edges. Combined with a per-section side vignette.
 * The shadow blends the edges naturally while center stays clean.
 */
const blend: BlendMode = {
  id: "edge-shadow",
  label: "Edge Shadow",
  group: "Edge Merge",
  description: "Cast shadow + side dark",
  css: `
/* Side vignette for the section itself */
[data-blend="edge-shadow"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.14), transparent 16%,
    transparent 84%, rgba(0,0,0,0.14));
}
/* A "shadow" overlay at the bottom that fades into the next section,
   masked to be stronger at edges, weaker at center */
[data-blend="edge-shadow"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -3rem;
  height: 10rem;
  pointer-events: none;
  z-index: 2;
  background:
    radial-gradient(ellipse 100% 100% at 50% 0%,
      rgba(0,0,0,0.25) 0%, transparent 70%);
  mask-image: linear-gradient(to right,
    black 0%, black 20%,
    rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%,
    black 80%, black 100%);
  -webkit-mask-image: linear-gradient(to right,
    black 0%, black 20%,
    rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%,
    black 80%, black 100%);
}`,
};

export default blend;
