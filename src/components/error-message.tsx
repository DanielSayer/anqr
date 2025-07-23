import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

function ErrorMessage({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="error-message"
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    />
  );
}

export { ErrorMessage };
