"use client"

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "default" | "lg" | "xl" | "2xl";
  variant?: "circle" | "rounded" | "square";
  status?: "online" | "offline" | "away" | "busy";
  ring?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    src, 
    alt, 
    fallback, 
    size = "default", 
    variant = "circle",
    status,
    ring = false,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const sizes = {
      sm: "h-8 w-8 text-xs",
      default: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg",
      "2xl": "h-20 w-20 text-xl"
    };

    const variants = {
      circle: "rounded-full",
      rounded: "rounded-lg",
      square: "rounded-none"
    };

    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-400",
      away: "bg-yellow-500",
      busy: "bg-red-500"
    };

    const statusSizes = {
      sm: "h-2 w-2",
      default: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-4 w-4",
      "2xl": "h-5 w-5"
    };

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div 
        ref={ref}
        className={cn("relative inline-flex", className)}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden bg-gray-100 font-medium text-gray-600",
            sizes[size],
            variants[variant],
            ring && "ring-2 ring-white ring-offset-2",
            className
          )}
        >
          {src && !imageError ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : fallback ? (
            <span className="font-semibold">
              {getInitials(fallback)}
            </span>
          ) : (
            <svg
              className="h-full w-full text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>

        {status && (
          <div
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-white",
              statusColors[status],
              statusSizes[size]
            )}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    max?: number;
    spacing?: "tight" | "normal" | "loose";
  }
>(({ className, children, max = 3, spacing = "normal", ...props }, ref) => {
  const spacings = {
    tight: "-space-x-1",
    normal: "-space-x-2",
    loose: "-space-x-1"
  };

  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  return (
    <div
      ref={ref}
      className={cn("flex items-center", spacings[spacing], className)}
      {...props}
    >
      {visibleChildren}
      {remainingCount > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 ring-2 ring-white">
          +{remainingCount}
        </div>
      )}
    </div>
  );
});
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };
