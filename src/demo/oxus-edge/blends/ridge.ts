import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "11",
  label: "Ridge",
  group: "Immersive",
  description: "Mountain silhouette",
  css: `
[data-blend="11"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 4rem;
  pointer-events: none;
  z-index: 2;
  background: var(--s-next);
  clip-path: polygon(
    0% 70%,   3% 55%,  6% 62%,  9% 48%,  12% 56%, 15% 42%,
    18% 52%,  21% 38%, 24% 48%, 27% 35%, 30% 45%, 33% 32%,
    36% 42%,  39% 50%, 42% 38%, 45% 46%, 48% 34%, 51% 44%,
    54% 30%,  57% 40%, 60% 48%, 63% 36%, 66% 44%, 69% 32%,
    72% 42%,  75% 50%, 78% 38%, 81% 46%, 84% 34%, 87% 44%,
    90% 52%,  93% 40%, 96% 50%, 100% 42%,
    100% 100%, 0% 100%
  );
}
[data-blend="11"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 10rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent 0%, var(--s-next) 100%);
  opacity: 0.5;
}`,
};

export default blend;
