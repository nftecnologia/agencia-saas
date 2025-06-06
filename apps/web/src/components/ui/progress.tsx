"use client"

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error" | "gradient";
  size?: "sm" | "default" | "lg";
  showValue?: boolean;
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    variant = "default", 
    size = "default",
    showValue = false,
    animated = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variants = {
      default: "bg-blue-600",
      success: "bg-green-600",
      warning: "bg-yellow-500",
      error: "bg-red-600",
      gradient: "bg-gradient-to-r from-blue-600 to-purple-600"
    };

    const sizes = {
      sm: "h-2",
      default: "h-3",
      lg: "h-4"
    };

    return (
      <div className="w-full space-y-2">
        {showValue && (
          <div className="flex justify-between items-center text-sm font-medium text-gray-700">
            <span>Progresso</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            "w-full bg-gray-200 rounded-full overflow-hidden",
            sizes[size],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "h-full transition-all duration-500 ease-out rounded-full",
              variants[variant],
              animated && "bg-stripes"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
