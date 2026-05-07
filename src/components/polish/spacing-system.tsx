"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Premium spacing constants for consistent rhythm
export const SPACING = {
  // Base spacing scale (8px base unit)
  xs: "0.5rem",    // 8px
  sm: "0.75rem",   // 12px
  md: "1rem",      // 16px
  lg: "1.25rem",   // 20px
  xl: "1.5rem",    // 24px
  "2xl": "2rem",   // 32px
  "3xl": "2.5rem", // 40px
  "4xl": "3rem",   // 48px
  "5xl": "4rem",   // 64px
  "6xl": "5rem",   // 80px
  
  // Section spacing
  section: "6rem",     // 96px - between major sections
  subsection: "3rem",  // 48px - between subsections
  content: "2rem",    // 32px - between content blocks
  element: "1rem",    // 16px - between elements
  tight: "0.5rem",    // 8px - tight spacing
  
  // Component-specific spacing
  card: "1.5rem",     // 24px - card padding
  button: "0.75rem",  // 12px - button padding
  input: "0.75rem",   // 12px - input padding
  nav: "1rem",        // 16px - nav item spacing
  hero: "4rem",       // 64px - hero section padding
  footer: "3rem",     // 48px - footer padding
}

// Spacing utility components
export const Spacer = React.forwardRef<HTMLDivElement, {
  size?: keyof typeof SPACING
  className?: string
  vertical?: boolean
  horizontal?: boolean
}>(({ size = "md", className, vertical = true, horizontal = false }, ref) => {
  const spacingClass = vertical && horizontal 
    ? `p-${size === "xs" ? "2" : size === "sm" ? "3" : size === "md" ? "4" : size === "lg" ? "5" : size === "xl" ? "6" : size === "2xl" ? "8" : size === "3xl" ? "10" : size === "4xl" ? "12" : size === "5xl" ? "16" : size === "6xl" ? "20" : "4"}`
    : vertical 
    ? `py-${size === "xs" ? "2" : size === "sm" ? "3" : size === "md" ? "4" : size === "lg" ? "5" : size === "xl" ? "6" : size === "2xl" ? "8" : size === "3xl" ? "10" : size === "4xl" ? "12" : size === "5xl" ? "16" : size === "6xl" ? "20" : "4"}`
    : horizontal 
    ? `px-${size === "xs" ? "2" : size === "sm" ? "3" : size === "md" ? "4" : size === "lg" ? "5" : size === "xl" ? "6" : size === "2xl" ? "8" : size === "3xl" ? "10" : size === "4xl" ? "12" : size === "5xl" ? "16" : size === "6xl" ? "20" : "4"}`
    : ""

  return (
    <div 
      ref={ref} 
      className={cn("w-full", spacingClass, className)}
      style={{ 
        paddingTop: vertical ? SPACING[size] : undefined,
        paddingBottom: vertical ? SPACING[size] : undefined,
        paddingLeft: horizontal ? SPACING[size] : undefined,
        paddingRight: horizontal ? SPACING[size] : undefined,
      }}
    />
  )
})

Spacer.displayName = "Spacer"

// Section wrapper with consistent spacing
export const Section = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  spacing?: "tight" | "normal" | "loose"
  id?: string
}>(({ children, className, spacing = "normal", id }, ref) => {
  const spacingMap = {
    tight: SPACING.subsection,
    normal: SPACING.section,
    loose: SPACING["5xl"]
  }

  return (
    <section
      ref={ref}
      id={id}
      className={cn("w-full", className)}
      style={{ 
        paddingTop: spacingMap[spacing],
        paddingBottom: spacingMap[spacing],
      }}
    >
      {children}
    </section>
  )
})

Section.displayName = "Section"

// Content container with breathing room
export const ContentContainer = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  centered?: boolean
}>(({ children, className, maxWidth = "xl", centered = true }, ref) => {
  const maxWidthMap = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        maxWidthMap[maxWidth],
        centered && "mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
})

ContentContainer.displayName = "ContentContainer"

// Grid system with consistent gaps
export const PremiumGrid = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: keyof typeof SPACING
  responsive?: boolean
}>(({ children, className, cols = 3, gap = "lg", responsive = true }, ref) => {
  const gapMap = {
    xs: "gap-2",
    sm: "gap-3", 
    md: "gap-4",
    lg: "gap-5",
    xl: "gap-6",
    "2xl": "gap-8",
    "3xl": "gap-10",
    "4xl": "gap-12",
    "5xl": "gap-16",
    "6xl": "gap-20"
  }

  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3", 
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  }

  const responsiveCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid",
        responsive ? responsiveCols[cols] : colsMap[cols],
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  )
})

PremiumGrid.displayName = "PremiumGrid"

// Flex container with consistent spacing
export const PremiumFlex = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  direction?: "row" | "col"
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around"
  gap?: keyof typeof SPACING
  wrap?: boolean
}>(({ children, className, direction = "row", align = "center", justify = "start", gap = "md", wrap = false }, ref) => {
  const directionMap = {
    row: "flex-row",
    col: "flex-col"
  }

  const alignMap = {
    start: "items-start",
    center: "items-center", 
    end: "items-end",
    stretch: "items-stretch"
  }

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end", 
    between: "justify-between",
    around: "justify-around"
  }

  const gapMap = {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4", 
    lg: "gap-5",
    xl: "gap-6",
    "2xl": "gap-8",
    "3xl": "gap-10",
    "4xl": "gap-12",
    "5xl": "gap-16",
    "6xl": "gap-20"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex",
        directionMap[direction],
        alignMap[align],
        justifyMap[justify],
        gapMap[gap],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </div>
  )
})

PremiumFlex.displayName = "PremiumFlex"

// Card with consistent padding and spacing
export const PremiumCard = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  padding?: keyof typeof SPACING
  spacing?: keyof typeof SPACING
}>(({ children, className, padding = "card", spacing = "element" }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border/20 bg-background/80 backdrop-blur-xl",
        className
      )}
      style={{ 
        padding: SPACING[padding],
      }}
    >
      <div className="space-y-4" style={{ gap: SPACING[spacing] }}>
        {children}
      </div>
    </div>
  )
})

PremiumCard.displayName = "PremiumCard"

// Hook for responsive spacing
export const useResponsiveSpacing = () => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getSpacing = (desktop: keyof typeof SPACING, mobile?: keyof typeof SPACING) => {
    return isMobile && mobile ? SPACING[mobile] : SPACING[desktop]
  }

  return { getSpacing, isMobile }
}
