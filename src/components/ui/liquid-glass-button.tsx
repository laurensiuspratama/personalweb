import * as React from "react"
import { cn } from "@/lib/utils"

export interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "subtle"
  size?: "sm" | "md" | "lg"
}

export const LiquidGlassButton = React.forwardRef<
  HTMLButtonElement,
  LiquidGlassButtonProps
>(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const sizeClasses = {
    sm: "px-4 py-1.5 text-[11px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  }[size]

  return (
    <button
      ref={ref}
      className={cn(
        variant === "primary" ? "btn-liquid" : "btn-liquid-subtle",
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

LiquidGlassButton.displayName = "LiquidGlassButton"