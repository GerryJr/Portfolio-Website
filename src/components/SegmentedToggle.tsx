import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SegmentedToggleOption<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
}

interface SegmentedToggleProps<T extends string> {
  options: SegmentedToggleOption<T>[];
  value: T;
  // NoInfer prevents the callback signature from widening T to `string` when
  // a useState setter (Dispatch<SetStateAction<T>>) is passed — T is inferred
  // from `options` + `value` only.
  onChange: (next: NoInfer<T>) => void;
  ariaLabel?: string;
  className?: string;
}

/**
 * Pill-shaped segmented control with a sliding indicator behind the active option.
 * Used by /projects (Overview ↔ Deep Dive) and /experience (Experience ↔ Commissions)
 * so both pages share the same toggle look, font, and animation.
 */
export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedToggleProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<T, HTMLButtonElement | null>>(new Map());
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});

  const updateSlider = useCallback(() => {
    const container = containerRef.current;
    const activeBtn = buttonRefs.current.get(value);
    if (!container || !activeBtn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    // getBoundingClientRect measures from the outer border edge, but `left: 0`
    // on an absolutely-positioned child sits at the padding edge (inside the
    // border). Subtract clientLeft so the slider doesn't drift 1px right on
    // the last option and peek past the container's rounded corner.
    setSliderStyle({
      width: btnRect.width,
      transform: `translateX(${Math.round(
        btnRect.left - containerRect.left - container.clientLeft,
      )}px)`,
    });
  }, [value]);

  // useLayoutEffect avoids the initial-paint flash where the indicator is at 0,0
  useLayoutEffect(() => {
    updateSlider();
  }, [updateSlider]);

  useEffect(() => {
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex items-center rounded-xl bg-muted/80 backdrop-blur-sm p-1 shrink-0 self-start border border-border/50 shadow-sm",
        className,
      )}
    >
      <div
        className="absolute top-1 left-0 h-[calc(100%-0.5rem)] rounded-lg bg-background shadow-md motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out"
        style={sliderStyle}
        aria-hidden
      />
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              buttonRefs.current.set(opt.value, el);
            }}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative z-10 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap",
              "motion-safe:transition-colors motion-safe:duration-200",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground/70",
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
