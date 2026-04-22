export interface BlendMode {
  /** Unique identifier — used as the data-blend attribute value */
  id: string;
  /** Display name in the switcher */
  label: string;
  /** Group header in the switcher panel */
  group: "Basic" | "Lines & Rules" | "Spotlight" | "Edge Merge" | "Corner Blend" | "Immersive" | "Cinematic";
  /** One-line description shown next to the label */
  description: string;
  /** Raw CSS injected when this mode is active. Must scope all rules
   *  under `[data-blend="<id>"]` to avoid leaking. */
  css: string;
}
