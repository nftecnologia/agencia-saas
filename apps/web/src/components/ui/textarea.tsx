import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "filled" | "outlined" | "ghost";
  textareaSize?: "sm" | "default" | "lg";
  error?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant = "default", 
    textareaSize = "default", 
    error = false,
    resize = "vertical",
    ...props 
  }, ref) => {
    const variants = {
      default: "border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500",
      filled: "border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500",
      outlined: "border-2 border-gray-300 bg-white focus:border-blue-500",
      ghost: "border-0 bg-transparent focus:bg-gray-50 focus:ring-2 focus:ring-blue-500"
    };

    const sizes = {
      sm: "min-h-[80px] px-3 py-2 text-sm",
      default: "min-h-[100px] px-4 py-3 text-sm",
      lg: "min-h-[120px] px-4 py-3 text-base"
    };

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x", 
      both: "resize"
    };

    const errorClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

    return (
      <textarea
        className={cn(
          "flex w-full rounded-lg font-medium transition-all duration-200",
          "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variants[variant],
          sizes[textareaSize],
          resizeClasses[resize],
          errorClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
