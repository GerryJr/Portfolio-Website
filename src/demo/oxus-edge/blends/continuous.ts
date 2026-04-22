import type { BlendMode } from "./types";

const blend: BlendMode = {
  id: "1",
  label: "Continuous",
  group: "Basic",
  description: "Single page gradient",
  css: `
[data-blend="1"] .page-gradient {
  background: linear-gradient(to bottom,
    var(--color-depth-mocha) 0%,
    var(--color-depth-roast) 18%,
    var(--color-depth-espresso) 36%,
    var(--color-depth-americano) 54%,
    var(--color-depth-noir) 72%,
    var(--color-depth-grounds) 88%
  );
}
[data-blend="1"] section[data-section],
[data-blend="1"] main,
[data-blend="1"] footer {
  background: transparent !important;
}`,
};

export default blend;
