import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MouseEvent as ReactMouseEvent } from "react";

interface CloseButtonProps {
  onClick: (e: ReactMouseEvent<HTMLButtonElement>) => void;
  "aria-label"?: string;
  /** "md" (default, 44px) for floating overlays; "sm" (36px) for inline use
   *  inside a card header where the larger size would feel top-heavy. */
  size?: "sm" | "md";
  /** Pass-through for positioning (e.g. `absolute top-[18px] right-[18px]`)
   *  or z-index. Visual + motion tokens are baked in and shouldn't be overridden. */
  className?: string;
}

/**
 * Shared circular close affordance with a 90° rotate-on-hover. Used by the
 * project deep-dive overlay and the certifications grid so the "X to dismiss"
 * gesture feels like one component across the site — same shape, same easing,
 * same hover hint — only the size changes by context.
 */
export const CloseButton = ({
  onClick,
  "aria-label": ariaLabel = "Close",
  size = "md",
  className,
}: CloseButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={cn(
      "inline-grid place-items-center rounded-full cursor-pointer",
      "bg-card/90 border border-border text-foreground backdrop-blur-md",
      "motion-safe:transition-[transform,background-color,border-color,color] motion-safe:[transition-duration:220ms] motion-safe:[transition-timing-function:cubic-bezier(0.65,0,0.35,1)]",
      "hover:border-accent hover:text-accent motion-safe:hover:rotate-90 motion-safe:hover:scale-[1.05]",
      size === "md" && "w-11 h-11",
      size === "sm" && "w-9 h-9",
      className,
    )}
  >
    <X className={size === "md" ? "w-5 h-5" : "w-4 h-4"} />
  </button>
);
