const VARIANTS = {
  copper: "bg-copper text-bg-deep",
  ember: "bg-ember text-white",
  live: "bg-danger text-white animate-pulse-live",
  upcoming: "bg-amber text-bg-deep",
  processing: "bg-ridge text-white",
  ended: "bg-text-muted/20 text-text-muted",
  "sold-out": "bg-sold-out text-text-muted",
  success: "bg-success text-white",
  outline: "border border-border-hover text-text-secondary",
} as const;

type BadgeVariant = keyof typeof VARIANTS;

export default function Badge({
  children,
  variant = "ember",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-[3px] text-[0.65rem] font-bold tracking-[0.1em] uppercase font-display rounded-none ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
