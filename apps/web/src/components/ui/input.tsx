import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled" | "outlined" | "ghost";
  inputSize?: "sm" | "default" | "lg";
  error?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = "text", 
    variant = "default", 
    inputSize = "default", 
    error = false,
    icon,
    iconPosition = "left",
    ...props 
  }, ref) => {
    const variants = {
      default: "border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500",
      filled: "border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500",
      outlined: "border-2 border-gray-300 bg-white focus:border-blue-500",
      ghost: "border-0 bg-transparent focus:bg-gray-50 focus:ring-2 focus:ring-blue-500"
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      default: "h-10 px-4 text-sm",
      lg: "h-12 px-4 text-base"
    };

    const errorClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

    if (icon) {
      return (
        <div className="relative">
          {iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex w-full rounded-lg font-medium transition-all duration-200",
              "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              variants[variant],
              sizes[inputSize],
              iconPosition === "left" ? "pl-10" : "pr-10",
              errorClasses,
              className
            )}
            ref={ref}
            {...props}
          />
          {iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg font-medium transition-all duration-200",
          "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          variants[variant],
          sizes[inputSize],
          errorClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
