import type { BlendMode } from "./types";

/**
 * Edge Whisper — The most subtle edge variant. Barely-there
 * side darkening + a very short, low-opacity bottom gradient.
 * The boundary is visible but just slightly softened. Maximum restraint.
 */
const blend: BlendMode = {
  id: "edge-whisper",
  label: "Edge Whisper",
  group: "Edge Merge",
  description: "Minimal subtle side blend",
  css: `
/* Very gentle side darkening */
[data-blend="edge-whisper"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.08), transparent 12%,
    transparent 88%, rgba(0,0,0,0.08));
}
/* Extremely short, faint gradient at sides only */
[data-blend="edge-whisper"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 3rem;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(to bottom, transparent, var(--s-next));
  opacity: 0.6;
  mask-image: linear-gradient(to right,
    black 0%, black 10%,
    transparent 30%, transparent 70%,
    black 90%, black 100%);
  -webkit-mask-image: linear-gradient(to right,
    black 0%, black 10%,
    transparent 30%, transparent 70%,
    black 90%, black 100%);
}`,
};

export default blend;
