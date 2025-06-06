"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error" | "warning" | "info";
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant = "default", 
    title,
    description,
    action,
    onClose,
    duration = 5000,
    children,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const variants = {
      default: "bg-white border-gray-200 text-gray-900",
      success: "bg-green-50 border-green-200 text-green-900",
      error: "bg-red-50 border-red-200 text-red-900", 
      warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
      info: "bg-blue-50 border-blue-200 text-blue-900"
    };

    const icons = {
      default: null,
      success: CheckCircle,
      error: AlertCircle,
      warning: AlertTriangle,
      info: Info
    };

    const iconColors = {
      default: "",
      success: "text-green-500",
      error: "text-red-500",
      warning: "text-yellow-500",
      info: "text-blue-500"
    };

    const IconComponent = icons[variant];

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full max-w-md items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300",
          "animate-in slide-in-from-right-full",
          !isVisible && "animate-out slide-out-to-right-full",
          variants[variant],
          className
        )}
        {...props}
      >
        {IconComponent && (
          <IconComponent className={cn("h-5 w-5 mt-0.5 flex-shrink-0", iconColors[variant])} />
        )}
        
        <div className="flex-1 space-y-1">
          {title && (
            <div className="font-semibold text-sm leading-none">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90 leading-relaxed">{description}</div>
          )}
          {children}
          {action && (
            <div className="mt-3">{action}</div>
          )}
        </div>

        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose(), 300);
            }}
            className={cn(
              "flex-shrink-0 rounded-full p-1 transition-colors",
              "hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = "Toast";

const ToastContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  }
>(({ className, position = "top-right", ...props }, ref) => {
  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col gap-2 pointer-events-none",
        positions[position],
        className
      )}
      {...props}
    />
  );
});
ToastContainer.displayName = "ToastContainer";

export { Toast, ToastContainer };
