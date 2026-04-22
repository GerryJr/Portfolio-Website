import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "13",
  label: "Ember Pulse",
  group: "Lines & Rules",
  description: "Animated breathing line",
  css: `
[data-blend="13"] section[data-section]::after {
  content: "";
  position: absolute;
  left: 10%; right: 10%; bottom: 0;
  height: 2px;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(to right,
    transparent, var(--color-ember) 30%,
    var(--color-ember-light) 50%,
    var(--color-ember) 70%, transparent);
  box-shadow:
    0 0 12px 2px rgba(200,100,58,0.2),
    0 0 40px 8px rgba(200,100,58,0.08);
  animation: ember-breathe 4s ease-in-out infinite;
}
[data-blend="13"] section[data-section]::before {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 10rem;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, transparent, var(--s-next));
}
@media (prefers-reduced-motion: reduce) {
  [data-blend="13"] section[data-section]::after {
    animation: none;
    opacity: 0.8;
  }
}`,
};

export default blend;
