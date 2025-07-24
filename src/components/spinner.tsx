import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

function Spinner({
  className,
  role = "status",
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin",
        className
      )}
      role={role}
      {...props}
    />
  );
}

export { Spinner };
