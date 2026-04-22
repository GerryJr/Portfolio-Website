import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "2",
  label: "Section Fade",
  group: "Basic",
  description: "Section-to-section gradient",
  css: `
[data-blend="2"] section[data-section] {
  background: linear-gradient(to bottom, var(--s-bg), var(--s-next)) !important;
}`,
};

export default blend;
