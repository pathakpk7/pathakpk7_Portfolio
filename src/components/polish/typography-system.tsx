"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Premium typography scale with consistent rhythm
export const TYPOGRAPHY = {
  // Font sizes with perfect mathematical scale (1.25 ratio)
  xs: "0.75rem",     // 12px
  sm: "0.875rem",    // 14px  
  base: "1rem",      // 16px
  lg: "1.25rem",     // 20px
  xl: "1.5625rem",   // 25px
  "2xl": "1.953rem", // 31.25px
  "3xl": "2.441rem", // 39.06px
  "4xl": "3.052rem", // 48.83px
  "5xl": "3.815rem", // 61.04px
  "6xl": "4.768rem", // 76.29px
} as const

// Font weights for premium hierarchy
export const FONT_WEIGHTS = {
  thin: "100",
  light: "300", 
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const

// Line heights for optimal readability
export const LINE_HEIGHTS = {
  tight: "1.25",
  snug: "1.375", 
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const

// Letter spacing for premium feel
export const LETTER_SPACING = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const

// Typography components with perfect hierarchy
export const Heading1 = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  className?: string
  weight?: keyof typeof FONT_WEIGHTS
  tracking?: keyof typeof LETTER_SPACING
  gradient?: boolean
}>(({ children, className, weight = "bold", tracking = "tight", gradient = false }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20",
        gradient 
          ? "bg-linear-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent"
          : "text-foreground",
        "text-4xl md:text-5xl lg:text-6xl",
        `font-${weight}`,
        `tracking-${tracking}`,
        "leading-tight",
        className
      )}
      style={{
        fontSize: TYPOGRAPHY["6xl"],
        fontWeight: FONT_WEIGHTS[weight],
        letterSpacing: LETTER_SPACING[tracking],
        lineHeight: LINE_HEIGHTS.tight,
      }}
    >
      {children}
    </h1>
  )
})

Heading1.displayName = "Heading1"

export const Heading2 = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  className?: string
  weight?: keyof typeof FONT_WEIGHTS
  tracking?: keyof typeof LETTER_SPACING
  gradient?: boolean
}>(({ children, className, weight = "semibold", tracking = "tight", gradient = false }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "scroll-m-20",
        gradient 
          ? "bg-linear-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent"
          : "text-foreground",
        "text-3xl md:text-4xl",
        `font-${weight}`,
        `tracking-${tracking}`,
        "leading-tight",
        className
      )}
      style={{
        fontSize: TYPOGRAPHY["4xl"],
        fontWeight: FONT_WEIGHTS[weight],
        letterSpacing: LETTER_SPACING[tracking],
        lineHeight: LINE_HEIGHTS.tight,
      }}
    >
      {children}
    </h2>
  )
})

Heading2.displayName = "Heading2"

export const Heading3 = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  className?: string
  weight?: keyof typeof FONT_WEIGHTS
  tracking?: keyof typeof LETTER_SPACING
}>(({ children, className, weight = "semibold", tracking = "normal" }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "scroll-m-20 text-foreground",
        "text-2xl md:text-3xl",
        `font-${weight}`,
        `tracking-${tracking}`,
        "leading-snug",
        className
      )}
      style={{
        fontSize: TYPOGRAPHY["3xl"],
        fontWeight: FONT_WEIGHTS[weight],
        letterSpacing: LETTER_SPACING[tracking],
        lineHeight: LINE_HEIGHTS.snug,
      }}
    >
      {children}
    </h3>
  )
})

Heading3.displayName = "Heading3"

export const Heading4 = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  className?: string
  weight?: keyof typeof FONT_WEIGHTS
  tracking?: keyof typeof LETTER_SPACING
}>(({ children, className, weight = "medium", tracking = "normal" }, ref) => {
  return (
    <h4
      ref={ref}
      className={cn(
        "scroll-m-20 text-foreground",
        "text-xl md:text-2xl",
        `font-${weight}`,
        `tracking-${tracking}`,
        "leading-snug",
        className
      )}
      style={{
        fontSize: TYPOGRAPHY["2xl"],
        fontWeight: FONT_WEIGHTS[weight],
        letterSpacing: LETTER_SPACING[tracking],
        lineHeight: LINE_HEIGHTS.snug,
      }}
    >
      {children}
    </h4>
  )
})

Heading4.displayName = "Heading4"

export const Heading5 = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  className?: string
  weight?: keyof typeof FONT_WEIGHTS
  tracking?: keyof typeof LETTER_SPACING
}>(({ children, className, weight = "medium", tracking = "normal" }, ref) => {
  return (
    <h5
      ref={ref}
      className={cn(
        "scroll-m-20 text-foreground",
        "text-lg md:text-xl",
        `font-${weight}`,
        `tracking-${tracking}`,
        "leading-normal",
        className
      )}
      style={{
        fontSize: TYPOGRAPHY.xl,
        fontWeight: FONT_WEIGHTS[weight],
        letterSpacing: LETTER_SPACING[tracking],
        lineHeight: LINE_HEIGHTS.normal,
      }}
    >
      {children}
    </h5>
  )
})

Heading5.displayName = "Heading5"

export const Heading6 = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  className?: string
  weight?: keyof typeof FONT_WEIGHTS
  tracking?: keyof typeof LETTER_SPACING
}>(({ children, className, weight = "medium", tracking = "normal" }, ref) => {
  return (
    <h6
      ref={ref}
      className={cn(
        "scroll-m-20 text-foreground",
        "text-base md:text-lg",
        `font-${weight}`,
        `tracking-${tracking}`,
        "leading-normal",
        className
      )}
      style={{
        fontSize: TYPOGRAPHY.lg,
        fontWeight: FONT_WEIGHTS[weight],
        letterSpacing: LETTER_SPACING[tracking],
        lineHeight: LINE_HEIGHTS.normal,
      }}
    >
      {children}
    </h6>
  )
})

Heading6.displayName = "Heading6"

// Body text components
export const BodyText = React.forwardRef<HTMLParagraphElement, {
  children: React.ReactNode
  className?: string
  size?: keyof typeof TYPOGRAPHY
  weight?: keyof typeof FONT_WEIGHTS
  tracking?: keyof typeof LETTER_SPACING
  leading?: keyof typeof LINE_HEIGHTS
}>(({ children, className, size = "base", weight = "normal", tracking = "normal", leading = "normal" }, ref) => {
  const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl"
  }

  const leadingMap = {
    tight: "leading-tight",
    snug: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose"
  }

  return (
    <p
      ref={ref}
      className={cn(
        "text-muted-foreground",
        sizeMap[size],
        `font-${weight}`,
        `tracking-${tracking}`,
        leadingMap[leading],
        className
      )}
      style={{
        fontSize: TYPOGRAPHY[size],
        fontWeight: FONT_WEIGHTS[weight],
        letterSpacing: LETTER_SPACING[tracking],
        lineHeight: LINE_HEIGHTS[leading],
      }}
    >
      {children}
    </p>
  )
})

BodyText.displayName = "BodyText"

// Hero text with special treatment
export const HeroText = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  className?: string
  subtitle?: string
}>(({ children, className, subtitle }, ref) => {
  return (
    <div ref={ref} className={cn("text-center space-y-6", className)}>
      <h1
        className="scroll-m-20 bg-linear-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent font-bold tracking-tight leading-tight"
        style={{
          fontSize: TYPOGRAPHY["6xl"],
          fontWeight: FONT_WEIGHTS.bold,
          letterSpacing: LETTER_SPACING.tight,
          lineHeight: LINE_HEIGHTS.tight,
        }}
      >
        {children}
      </h1>
      {subtitle && (
        <p
          className="text-xl md:text-2xl text-muted-foreground font-normal tracking-normal leading-relaxed max-w-3xl mx-auto"
          style={{
            fontSize: TYPOGRAPHY.xl,
            fontWeight: FONT_WEIGHTS.normal,
            letterSpacing: LETTER_SPACING.normal,
            lineHeight: LINE_HEIGHTS.relaxed,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
})

HeroText.displayName = "HeroText"

// Section title with consistent styling
export const SectionTitle = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  className?: string
  subtitle?: string
  centered?: boolean
}>(({ children, className, subtitle, centered = false }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-4", centered && "text-center", className)}>
      <h2
        className="scroll-m-20 bg-linear-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent font-semibold tracking-tight leading-tight"
        style={{
          fontSize: TYPOGRAPHY["4xl"],
          fontWeight: FONT_WEIGHTS.semibold,
          letterSpacing: LETTER_SPACING.tight,
          lineHeight: LINE_HEIGHTS.tight,
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className="text-lg text-muted-foreground font-normal tracking-normal leading-relaxed max-w-2xl"
          style={{
            fontSize: TYPOGRAPHY.lg,
            fontWeight: FONT_WEIGHTS.normal,
            letterSpacing: LETTER_SPACING.normal,
            lineHeight: LINE_HEIGHTS.relaxed,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
})

SectionTitle.displayName = "SectionTitle"

// Text with gradient effect
export const GradientText = React.forwardRef<HTMLSpanElement, {
  children: React.ReactNode
  className?: string
  from?: string
  to?: string
}>(({ children, className, from = "cyber-blue", to = "cyber-purple" }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("bg-linear-to-r bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(to right, var(--color-${from}), var(--color-${to}))`,
      }}
    >
      {children}
    </span>
  )
})

GradientText.displayName = "GradientText"

// Typography utility hook
export const useTypography = () => {
  const getTypography = (element: string) => {
    const base = {
      fontSize: TYPOGRAPHY.base,
      fontWeight: FONT_WEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal,
      lineHeight: LINE_HEIGHTS.normal,
    }

    switch (element) {
      case "h1":
        return {
          ...base,
          fontSize: TYPOGRAPHY["6xl"],
          fontWeight: FONT_WEIGHTS.bold,
          letterSpacing: LETTER_SPACING.tight,
          lineHeight: LINE_HEIGHTS.tight,
        }
      case "h2":
        return {
          ...base,
          fontSize: TYPOGRAPHY["4xl"],
          fontWeight: FONT_WEIGHTS.semibold,
          letterSpacing: LETTER_SPACING.tight,
          lineHeight: LINE_HEIGHTS.tight,
        }
      case "h3":
        return {
          ...base,
          fontSize: TYPOGRAPHY["3xl"],
          fontWeight: FONT_WEIGHTS.semibold,
          letterSpacing: LETTER_SPACING.normal,
          lineHeight: LINE_HEIGHTS.snug,
        }
      case "body":
        return {
          ...base,
          fontSize: TYPOGRAPHY.base,
          fontWeight: FONT_WEIGHTS.normal,
          letterSpacing: LETTER_SPACING.normal,
          lineHeight: LINE_HEIGHTS.normal,
        }
      case "caption":
        return {
          ...base,
          fontSize: TYPOGRAPHY.sm,
          fontWeight: FONT_WEIGHTS.normal,
          letterSpacing: LETTER_SPACING.wide,
          lineHeight: LINE_HEIGHTS.normal,
        }
      default:
        return base
    }
  }

  return { getTypography }
}
