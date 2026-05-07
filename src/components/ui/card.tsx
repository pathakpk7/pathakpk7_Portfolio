import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "cyber" | "luxury" | "minimal" | "glow"
    hover?: boolean
  }
>(({ className, variant = "default", hover = true, ...props }, ref) => {
  const variants = {
    default: "bg-card text-card-foreground shadow-medium hover:shadow-large border border-border",
    glass: "glass hover:glass-strong border border-border/50",
    cyber: "glass-cyber hover:shadow-glow-cyber border border-cyber-blue-500/30",
    luxury: "bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xlarge hover:shadow-xxlarge border border-slate-700",
    minimal: "bg-transparent border border-border hover:border-primary/50 shadow-soft hover:shadow-medium",
    glow: "bg-card text-card-foreground shadow-glow-cyber hover:shadow-glow-cyber-intense border border-primary/30",
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
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-heading text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
