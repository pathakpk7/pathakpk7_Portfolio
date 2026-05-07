import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  badge?: string
  badgeVariant?: "default" | "cyber" | "glass" | "glow" | "success" | "warning"
  align?: "left" | "center" | "right"
  className?: string
  children?: React.ReactNode
}

const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ 
    title, 
    subtitle, 
    description, 
    badge, 
    badgeVariant = "cyber",
    align = "center", 
    className,
    children 
  }, ref) => {
    const alignmentClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }

    return (
      <div 
        ref={ref}
        className={cn(
          "space-y-4 max-w-4xl mx-auto",
          alignmentClasses[align],
          className
        )}
      >
        {badge && (
          <div className={cn(
            "inline-flex",
            align === "center" && "justify-center",
            align === "right" && "justify-end"
          )}>
            <Badge variant={badgeVariant}>{badge}</Badge>
          </div>
        )}
        
        <div className="space-y-2">
          {subtitle && (
            <p className="text-heading text-sm md:text-base font-medium text-primary uppercase tracking-wider">
              {subtitle}
            </p>
          )}
          
          <h2 className="text-heading text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-cyber">
            {title}
          </h2>
        </div>
        
        {description && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        
        {children && (
          <div className={cn(
            "pt-4",
            align === "center" && "flex justify-center",
            align === "right" && "flex justify-end"
          )}>
            {children}
          </div>
        )}
      </div>
    )
  }
)
SectionTitle.displayName = "SectionTitle"

export { SectionTitle }
