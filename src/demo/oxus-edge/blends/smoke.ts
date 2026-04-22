import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "8",
  label: "Smoke",
  group: "Immersive",
  description: "Layered organic depth",
  css: `
[data-blend="8"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0;
  bottom: -6rem;
  height: 24rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent 0%, transparent 25%, var(--s-next) 100%);
  mask-image: linear-gradient(to right, rgba(0,0,0,0.5), black 20%, black 80%, rgba(0,0,0,0.5));
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.5), black 20%, black 80%, rgba(0,0,0,0.5));
}
[data-blend="8"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background:
    radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.12) 100%),
    linear-gradient(to right, rgba(0,0,0,0.08), transparent 15%, transparent 85%, rgba(0,0,0,0.08));
}`,
};

export default blend;
