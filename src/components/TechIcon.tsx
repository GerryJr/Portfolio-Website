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
      className="w-full h-full object-contain text-icon-neutral hover:text-icon-hover transition-all duration-200 group-hover:scale-110"
    />
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full text-icon-neutral hover:text-icon-hover transition-all duration-200 group-hover:scale-110"
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
          <span
            className="inline-flex items-center justify-center rounded"
            style={containerStyle}
          >
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
