import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "12",
  label: "Dissolve",
  group: "Immersive",
  description: "Cinematic band dither",
  css: `
[data-blend="12"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 12rem;
  pointer-events: none;
  z-index: 1;
  background: repeating-linear-gradient(to bottom,
    var(--s-next) 0px, var(--s-next) 1px,
    transparent 1px, transparent 6px);
  mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
}
[data-blend="12"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 12rem;
  pointer-events: none;
  z-index: 1;
  background: repeating-linear-gradient(to bottom,
    var(--s-next) 0px, var(--s-next) 1px,
    transparent 1px, transparent 3px);
  mask-image: linear-gradient(to bottom, transparent 40%, black 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 40%, black 100%);
  opacity: 0.7;
}`,
};

export default blend;
