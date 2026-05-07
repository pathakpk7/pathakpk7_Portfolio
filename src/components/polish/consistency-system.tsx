"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Consistency design tokens
export const DESIGN_TOKENS = {
  // Colors - Consistent across all components
  colors: {
    primary: {
      blue: "cyber-blue",
      purple: "cyber-purple",
      gradient: "from-cyber-blue to-cyber-purple",
    },
    background: {
      default: "background",
      muted: "muted",
      card: "card",
    },
    foreground: {
      default: "foreground",
      muted: "muted-foreground",
    },
    border: {
      default: "border",
      light: "border/20",
      medium: "border/40",
    },
  },
  
  // Border radius - Consistent rounded corners
  radius: {
    sm: "rounded-lg",
    md: "rounded-xl", 
    lg: "rounded-2xl",
    full: "rounded-full",
  },
  
  // Shadows - Consistent depth perception
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    glow: "shadow-lg shadow-cyber-blue/25",
  },
  
  // Backdrop blur - Consistent glass effect
  backdrop: {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  },
}

// Consistent card component
export const ConsistentCard = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  variant?: "default" | "glass" | "elevated" | "subtle"
  padding?: "sm" | "md" | "lg"
  className?: string
}>(({ children, variant = "default", padding = "md", className }, ref) => {
  const variantStyles = {
    default: "bg-background border border-border/20",
    glass: "bg-background/80 backdrop-blur-xl border border-border/20",
    elevated: "bg-background border border-border/20 shadow-lg",
    subtle: "bg-muted/30 border border-border/10",
  }

  const paddingStyles = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8",
  }

  return (
    <div
      ref={ref}
      className={cn(
        DESIGN_TOKENS.radius.lg,
        variantStyles[variant],
        paddingStyles[padding],
        "transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  )
})

ConsistentCard.displayName = "ConsistentCard"

// Consistent button wrapper
export const ConsistentButton = React.forwardRef<HTMLButtonElement, {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
}>(({ children, variant = "primary", size = "md", className }, ref) => {
  const variantStyles = {
    primary: "bg-linear-to-r from-cyber-blue to-cyber-purple text-white border-0",
    secondary: "bg-background border border-border/20 text-foreground",
    outline: "bg-transparent border border-border/40 text-foreground",
    ghost: "bg-transparent text-cyber-blue",
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      ref={ref}
      className={cn(
        DESIGN_TOKENS.radius.md,
        variantStyles[variant],
        sizeStyles[size],
        "font-medium transition-all duration-300",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-cyber-blue/20",
        className
      )}
    >
      {children}
    </button>
  )
})

ConsistentButton.displayName = "ConsistentButton"

// Consistent heading component
export const ConsistentHeading = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  gradient?: boolean
  className?: string
}>(({ children, level, gradient = false, className }, ref) => {
  const levelStyles = {
    1: "text-4xl md:text-6xl font-bold tracking-tight",
    2: "text-3xl md:text-4xl font-semibold tracking-tight",
    3: "text-2xl md:text-3xl font-semibold tracking-normal",
    4: "text-xl md:text-2xl font-medium tracking-normal",
    5: "text-lg md:text-xl font-medium tracking-normal",
    6: "text-base md:text-lg font-medium tracking-normal",
  }

  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag
      ref={ref}
      className={cn(
        levelStyles[level],
        gradient && "bg-linear-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent",
        "text-foreground",
        className
      )}
    >
      {children}
    </Tag>
  )
})

ConsistentHeading.displayName = "ConsistentHeading"

// Consistent text component
export const ConsistentText = React.forwardRef<HTMLParagraphElement, {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  muted?: boolean
  className?: string
}>(({ children, size = "md", muted = false, className }, ref) => {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <p
      ref={ref}
      className={cn(
        sizeStyles[size],
        muted ? "text-muted-foreground" : "text-foreground",
        "leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  )
})

ConsistentText.displayName = "ConsistentText"

// Consistent icon wrapper
export const ConsistentIcon = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  variant?: "default" | "muted" | "accent"
  className?: string
}>(({ children, size = "md", variant = "default", className }, ref) => {
  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const variantStyles = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    accent: "text-cyber-blue",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  )
})

ConsistentIcon.displayName = "ConsistentIcon"

// Consistent badge component
export const ConsistentBadge = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  variant?: "default" | "accent" | "success" | "warning"
  size?: "sm" | "md"
  className?: string
}>(({ children, variant = "default", size = "md", className }, ref) => {
  const variantStyles = {
    default: "bg-muted text-muted-foreground border border-border/20",
    accent: "bg-linear-to-r from-cyber-blue to-cyber-purple text-white border-0",
    success: "bg-green-500/20 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  }

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  }

  return (
    <div
      ref={ref}
      className={cn(
        DESIGN_TOKENS.radius.full,
        variantStyles[variant],
        sizeStyles[size],
        "inline-flex items-center justify-center font-medium",
        className
      )}
    >
      {children}
    </div>
  )
})

ConsistentBadge.displayName = "ConsistentBadge"

// Consistent input component
export const ConsistentInput = React.forwardRef<HTMLInputElement, {
  className?: string
  placeholder?: string
  type?: string
  error?: boolean
}>(({ className, placeholder, type = "text", error = false }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={cn(
        DESIGN_TOKENS.radius.md,
        "w-full px-4 py-3 bg-background/80 backdrop-blur-sm",
        "border border-border/20 text-foreground placeholder-muted-foreground/50",
        "transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 focus:border-cyber-blue",
        error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
        className
      )}
    />
  )
})

ConsistentInput.displayName = "ConsistentInput"

// Consistent section wrapper
export const ConsistentSection = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  spacing?: "sm" | "md" | "lg"
  centered?: boolean
}>(({ children, className, spacing = "lg", centered = false }, ref) => {
  const spacingStyles = {
    sm: "py-12",
    md: "py-16",
    lg: "py-20",
  }

  return (
    <section
      ref={ref}
      className={cn(
        "w-full",
        spacingStyles[spacing],
        centered && "text-center",
        className
      )}
    >
      {children}
    </section>
  )
})

ConsistentSection.displayName = "ConsistentSection"

// Consistency checker hook
export const useConsistencyChecker = () => {
  const checkColorConsistency = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element)
    const color = computedStyle.color
    const backgroundColor = computedStyle.backgroundColor
    
    // Check if colors follow the design system
    const hasValidColors = color.includes('rgb') && backgroundColor.includes('rgb')
    
    return {
      hasValidColors,
      color,
      backgroundColor,
    }
  }

  const checkSpacingConsistency = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element)
    const padding = computedStyle.padding
    const margin = computedStyle.margin
    
    return {
      padding,
      margin,
      hasConsistentSpacing: padding !== '' || margin !== '',
    }
  }

  const checkTypographyConsistency = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element)
    const fontSize = computedStyle.fontSize
    const fontWeight = computedStyle.fontWeight
    const lineHeight = computedStyle.lineHeight
    
    return {
      fontSize,
      fontWeight,
      lineHeight,
      hasConsistentTypography: fontSize !== '' && fontWeight !== '',
    }
  }

  const auditElement = (element: HTMLElement) => {
    return {
      color: checkColorConsistency(element),
      spacing: checkSpacingConsistency(element),
      typography: checkTypographyConsistency(element),
    }
  }

  return {
    auditElement,
    checkColorConsistency,
    checkSpacingConsistency,
    checkTypographyConsistency,
  }
}

// Consistency provider for global settings
export const ConsistencyProvider = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
}>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("consistency-provider", className)}
      style={{
        // CSS custom properties for consistent theming
        '--color-primary': 'var(--cyber-blue)',
        '--color-secondary': 'var(--cyber-purple)',
        '--radius-sm': '0.5rem',
        '--radius-md': '0.75rem',
        '--radius-lg': '1rem',
        '--shadow-glow': '0 0 20px rgba(59, 130, 246, 0.25)',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
})

ConsistencyProvider.displayName = "ConsistencyProvider"
