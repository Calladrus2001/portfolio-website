import { forwardRef } from "react";
import { cn } from "../../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "amber" | "emerald" | "slate" | "sky" | "red" | "outline";
  ping?: boolean;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  slate: "bg-slate-800/80 text-slate-300 border-white/10",
  sky: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  outline: "bg-transparent text-slate-400 border-white/10",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "amber", ping = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors font-mono",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {ping && (
          <span className="relative flex h-2 w-2 mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
