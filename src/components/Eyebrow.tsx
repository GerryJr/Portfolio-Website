import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "p" | "span";
}

export const Eyebrow = ({ children, className, as: Tag = "div" }: EyebrowProps) => (
  <Tag className={cn("eyebrow", className)}>{children}</Tag>
);
