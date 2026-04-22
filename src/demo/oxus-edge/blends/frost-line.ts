import type { BlendMode } from "./types";

/**
 * Frost Line — A cool-toned separator using the ridge-mist
 * color (#7a9aaa) for contrast against the warm palette.
 * Side edges blend through darkness, center has a faint
 * blue-steel line — like frost on a blade edge.
 */
const blend: BlendMode = {
  id: "frost-line",
  label: "Frost Line",
  group: "Cinematic",
  description: "Cool steel edge divider",
  css: `
/* Side vignette */
[data-blend="frost-line"] section[data-section]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to right,
    rgba(0,0,0,0.14), transparent 15%,
    transparent 85%, rgba(0,0,0,0.14));
}
/* Frost-colored center line + side blending */
[data-blend="frost-line"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 8%; right: 8%; bottom: 0;
  height: 1px;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(to right,
    transparent,
    rgba(122,154,170,0.06) 20%,
    rgba(122,154,170,0.12) 50%,
    rgba(122,154,170,0.06) 80%,
    transparent);
  box-shadow:
    0 0 8px 2px rgba(122,154,170,0.04),
    0 0 24px 4px rgba(122,154,170,0.02);
}`,
};

export default blend;
