import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-premium text-white shadow-glow hover:shadow-glow-strong hover:opacity-90",
        destructive:
          "bg-red-500/80 text-white shadow-sm hover:bg-red-500/90 backdrop-blur-md",
        outline:
          "border border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md",
        secondary:
          "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 backdrop-blur-md",
        ghost: "hover:bg-white/10 hover:text-white text-white/80 transition-colors",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "glass-button",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-11 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

