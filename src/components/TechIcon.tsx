import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TechIconProps {
  name: string;
  svgPath?: string;
  icon?: string;
  iconDark?: string;
  invertOnDark?: boolean;
  docUrl?: string;
  size?: number;
}

export const TechIcon = ({ name, svgPath, icon, iconDark, invertOnDark, size = 22 }: TechIconProps) => {
  const { resolvedTheme, systemTheme } = useTheme();
  const effectiveTheme = resolvedTheme === "system" ? systemTheme : resolvedTheme;
  const useDarkIcon = effectiveTheme === "dark";

  const chosenIcon = useDarkIcon && iconDark ? iconDark : icon;
  const iconClass =
    "w-full h-full object-contain text-icon-neutral hover:text-icon-hover transition-all duration-200 group-hover:scale-110" +
    (invertOnDark ? " dark:invert dark:brightness-200" : "");

  const iconElement = chosenIcon ? (
    <img src={chosenIcon} alt={name} className={iconClass} />
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass}
      aria-label={name}
      role="img"
    >
      <path d={svgPath} />
    </svg>
  );

  const containerStyle = { width: size, height: size };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center justify-center rounded" style={containerStyle}>
            {iconElement}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
