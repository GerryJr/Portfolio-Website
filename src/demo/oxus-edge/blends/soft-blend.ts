import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "3",
  label: "Soft Blend",
  group: "Basic",
  description: "Tall bottom blend",
  css: `
[data-blend="3"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 12rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent, var(--s-next));
}`,
};

export default blend;
