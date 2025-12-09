import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TechIconProps {
  name: string;
  svgPath?: string;
  icon?: string;
  docUrl?: string;
  size?: number;
}

export const TechIcon = ({ name, svgPath, icon, size = 22 }: TechIconProps) => {
  const iconElement = icon ? (
    <img
      src={icon}
      alt={name}
      width={size}
      height={size}
      className="text-icon-neutral hover:text-icon-hover transition-all duration-200 group-hover:scale-110"
    />
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-icon-neutral hover:text-icon-hover transition-all duration-200 group-hover:scale-110"
      aria-label={name}
      role="img"
    >
      <path d={svgPath} />
    </svg>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-block rounded">
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
