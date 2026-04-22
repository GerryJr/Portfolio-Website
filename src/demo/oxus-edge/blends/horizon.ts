import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "9",
  label: "Horizon",
  group: "Lines & Rules",
  description: "Warm halo bloom",
  css: `
[data-blend="9"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 5%; right: 5%; bottom: 0;
  height: 1px;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(to right,
    transparent, rgba(200,100,58,0.15) 15%,
    var(--color-ember) 50%,
    rgba(200,100,58,0.15) 85%, transparent);
  box-shadow:
    0 0 20px 6px rgba(200,100,58,0.08),
    0 0 60px 15px rgba(200,100,58,0.04);
}
[data-blend="9"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 14rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent 0%, transparent 30%, var(--s-next) 100%);
}`,
};

export default blend;
