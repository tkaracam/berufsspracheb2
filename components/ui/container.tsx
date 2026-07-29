import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "small" | "large" | "full";
}

const sizeMap = {
  small: "max-w-3xl",
  default: "max-w-6xl",
  large: "max-w-7xl",
  full: "max-w-none",
};

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
