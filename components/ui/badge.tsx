import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-medium",
        variant === "default" &&
          "border-transparent bg-indigo-500/30 text-indigo-50",
        variant === "outline" &&
          "border-indigo-400/50 bg-indigo-500/10 text-indigo-50",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

