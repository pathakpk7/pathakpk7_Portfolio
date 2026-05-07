import * as React from "react"
import { cn } from "@/lib/utils"

const PremiumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "cyber" | "luxury" | "minimal"
    hover?: boolean
  }
>(({ className, variant = "default", hover = true, ...props }, ref) => {
  const variants = {
    default: "bg-card text-card-foreground shadow-medium hover:shadow-large border border-border",
    glass: "glass hover:glass-strong border border-border/50",
    cyber: "glass-cyber hover:shadow-glow-cyber border border-cyber-blue-500/30",
    luxury: "bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xlarge hover:shadow-xxlarge border border-slate-700",
    minimal: "bg-transparent border border-border hover:border-primary/50 shadow-soft hover:shadow-medium",
  }

  const hoverStyles = hover ? "transition-all duration-300 hover-lift" : ""

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-6",
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    />
  )
})
PremiumCard.displayName = "PremiumCard"

export { PremiumCard }
