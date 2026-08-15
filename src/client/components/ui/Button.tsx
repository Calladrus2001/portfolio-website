import { forwardRef } from "react";
import { cn } from "../../../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "amber" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02]",
  amber:
    "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:scale-[1.02]",
  secondary:
    "bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold border border-white/10 hover:border-amber-500/30",
  outline:
    "bg-slate-900/80 text-amber-300 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 shadow-slate-950/50",
  ghost:
    "text-slate-400 hover:text-white hover:bg-white/10",
  danger:
    "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-semibold",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs rounded-xl gap-1.5",
  md: "px-4 py-2.5 text-xs font-semibold rounded-xl gap-2",
  lg: "px-6 py-3.5 text-sm rounded-xl gap-2",
  icon: "p-2 rounded-xl text-xs",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-sans tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
