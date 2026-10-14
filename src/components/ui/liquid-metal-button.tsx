"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "subtle"
  size?: "sm" | "md" | "lg"
}

/**
 * Liquid Metal Button (@johuniq style)
 * Features an animated 360-degree conic chrome bezel, deep mercury/gunmetal
 * horizon core, and interactive pointer-tracking metallic specular reflection.
 */
export const LiquidMetalButton = React.forwardRef<
  HTMLButtonElement,
  LiquidMetalButtonProps
>(({ className, variant = "primary", size = "md", onPointerMove, children, ...props }, ref) => {
  const sizeClasses = {
    sm: "px-4 py-1.5 text-[11px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  }[size]

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100
    const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100
    e.currentTarget.style.setProperty("--lm-x", `${x.toFixed(1)}%`)
    e.currentTarget.style.setProperty("--lm-y", `${y.toFixed(1)}%`)
    onPointerMove?.(e)
  }

  return (
    <button
      ref={ref}
      onPointerMove={handlePointerMove}
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

LiquidMetalButton.displayName = "LiquidMetalButton"
export default LiquidMetalButton