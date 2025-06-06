import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "glow";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, children, disabled, ...props }, ref) => {
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md",
      destructive: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md",
      outline: "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
      ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
      link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
      gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 shadow-lg hover:shadow-xl",
      glow: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl"
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 py-1 text-xs",
      lg: "h-12 px-6 py-3 text-base",
      xl: "h-14 px-8 py-4 text-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold",
          "ring-offset-white transition-all duration-200 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "transform active:scale-95",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
