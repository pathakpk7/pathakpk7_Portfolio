"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Premium CTA variants for different contexts
export const CTA_VARIANTS = {
  // Primary CTA - Most important actions
  primary: {
    className: "bg-linear-to-r from-cyber-blue to-cyber-purple text-white border-0 shadow-lg shadow-cyber-blue/25",
    hover: { scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" },
    tap: { scale: 0.98 },
  },
  
  // Secondary CTA - Supporting actions
  secondary: {
    className: "bg-background border border-border/20 text-foreground backdrop-blur-sm",
    hover: { scale: 1.02, borderColor: "rgba(59, 130, 246, 0.5)" },
    tap: { scale: 0.98 },
  },
  
  // Outline CTA - Subtle actions
  outline: {
    className: "bg-transparent border border-border/40 text-foreground",
    hover: { scale: 1.02, borderColor: "rgba(59, 130, 246, 0.6)", backgroundColor: "rgba(59, 130, 246, 0.05)" },
    tap: { scale: 0.98 },
  },
  
  // Ghost CTA - Minimal actions
  ghost: {
    className: "bg-transparent text-cyber-blue",
    hover: { scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" },
    tap: { scale: 0.98 },
  },
  
  // Success CTA - Positive actions
  success: {
    className: "bg-linear-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/25",
    hover: { scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" },
    tap: { scale: 0.98 },
  },
}

// Premium CTA button component
export const PremiumCTA = React.forwardRef<HTMLButtonElement, {
  children: React.ReactNode
  variant?: keyof typeof CTA_VARIANTS
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  loading?: boolean
  disabled?: boolean
  href?: string
  external?: boolean
  className?: string
  onClick?: () => void
}>(({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon, 
  iconPosition = "left", 
  loading = false, 
  disabled = false,
  href,
  external = false,
  className,
  onClick
}, ref) => {
  const sizeMap = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const Component = href ? "a" : "button"
  const variantConfig = CTA_VARIANTS[variant]

  return (
    <motion.div
      whileHover={!disabled && !loading ? variantConfig.hover : {}}
      whileTap={!disabled && !loading ? variantConfig.tap : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Component
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(
          "relative overflow-hidden rounded-xl font-medium transition-all duration-300",
          "inline-flex items-center justify-center gap-2",
          "focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 focus:ring-offset-2 focus:ring-offset-background",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeMap[size],
          variantConfig.className,
          className
        )}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Icon */}
        {icon && iconPosition === "left" && (
          <span className={cn("transition-transform duration-300", loading && "opacity-0")}>
            {icon}
          </span>
        )}
        
        {/* Text */}
        <span className={cn("relative z-10 transition-opacity duration-300", loading && "opacity-0")}>
          {children}
        </span>
        
        {/* Icon */}
        {icon && iconPosition === "right" && (
          <span className={cn("transition-transform duration-300", loading && "opacity-0")}>
            {icon}
          </span>
        )}
        
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent opacity-0"
          whileHover={{ opacity: 1, x: "100%" }}
          transition={{ duration: 0.6 }}
          style={{ width: "200%" }}
        />
      </Component>
    </motion.div>
  )
})

PremiumCTA.displayName = "PremiumCTA"

// Resume download CTA with special treatment
export const ResumeCTA = React.forwardRef<HTMLButtonElement, {
  className?: string
}>(({ className }, ref) => {
  const [isDownloading, setIsDownloading] = React.useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsDownloading(false)
  }

  return (
    <PremiumCTA
      ref={ref}
      variant="primary"
      size="lg"
      loading={isDownloading}
      onClick={handleDownload}
      className={cn("shadow-cyber-blue/25", className)}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {isDownloading ? "Downloading..." : "Download Resume"}
    </PremiumCTA>
  )
})

ResumeCTA.displayName = "ResumeCTA"

// Contact CTA with email integration
export const ContactCTA = React.forwardRef<HTMLButtonElement, {
  email?: string
  className?: string
}>(({ email = "prasoon@example.com", className }, ref) => {
  const handleContact = () => {
    window.location.href = `mailto:${email}`
  }

  return (
    <PremiumCTA
      ref={ref}
      variant="secondary"
      size="lg"
      onClick={handleContact}
      className={className}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      Get In Touch
    </PremiumCTA>
  )
})

ContactCTA.displayName = "ContactCTA"

// Social media CTAs
export const SocialCTA = React.forwardRef<HTMLButtonElement, {
  platform: "github" | "linkedin" | "leetcode" | "twitter"
  username: string
  className?: string
}>(({ platform, username, className }, ref) => {
  const configs = {
    github: {
      url: `https://github.com/${username}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      variant: "outline" as const,
    },
    linkedin: {
      url: `https://linkedin.com/in/${username}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      variant: "outline" as const,
    },
    leetcode: {
      url: `https://leetcode.com/${username}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.41 21L8.29 15.88l1.42-1.42 3.7 3.7 7-7L21.83 13l-8.42 8zM13.41 10.17l-3.7-3.7-1.42 1.41L13.41 12l7-7-1.41-1.42-7.59 7.59z"/>
        </svg>
      ),
      variant: "outline" as const,
    },
    twitter: {
      url: `https://twitter.com/${username}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      variant: "outline" as const,
    },
  }

  const config = configs[platform]

  return (
    <PremiumCTA
      ref={ref}
      variant={config.variant}
      size="md"
      href={config.url}
      external
      className={className}
    >
      {config.icon}
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </PremiumCTA>
  )
})

SocialCTA.displayName = "SocialCTA"

// Project CTA with GitHub integration
export const ProjectCTA = React.forwardRef<HTMLButtonElement, {
  githubUrl: string
  liveUrl?: string
  className?: string
}>(({ githubUrl, liveUrl, className }, ref) => {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <PremiumCTA
        variant="primary"
        size="md"
        href={githubUrl}
        external
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        View Code
      </PremiumCTA>
      
      {liveUrl && (
        <PremiumCTA
          variant="secondary"
          size="md"
          href={liveUrl}
          external
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live Demo
        </PremiumCTA>
      )}
    </div>
  )
})

ProjectCTA.displayName = "ProjectCTA"

// CTA group component
export const CTAGroup = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  direction?: "row" | "column"
  spacing?: "sm" | "md" | "lg"
}>(({ children, className, direction = "row", spacing = "md" }, ref) => {
  const spacingMap = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4"
  }

  const directionMap = {
    row: "flex-row",
    column: "flex-col"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex",
        directionMap[direction],
        spacingMap[spacing],
        "flex-wrap",
        className
      )}
    >
      {children}
    </div>
  )
})

CTAGroup.displayName = "CTAGroup"

// CTA section wrapper
export const CTASection = React.forwardRef<HTMLDivElement, {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  centered?: boolean
}>(({ title, description, children, className, centered = true }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border/20 bg-background/80 backdrop-blur-xl p-8",
        centered && "text-center",
        className
      )}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
})

CTASection.displayName = "CTASection"
