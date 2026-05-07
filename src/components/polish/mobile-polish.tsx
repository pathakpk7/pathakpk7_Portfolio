"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Mobile detection hook
export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = React.useState(false)
  const [isTablet, setIsTablet] = React.useState(false)
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsDesktop(width >= 1024)
    }

    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])

  return { isMobile, isTablet, isDesktop }
}

// Touch-friendly button component
export const TouchButton = React.forwardRef<HTMLButtonElement, {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
}>(({ children, className, variant = "primary", size = "md", disabled = false, loading = false }, ref) => {
  const { isMobile } = useMobileDetection()

  const sizeMap = {
    sm: isMobile ? "px-4 py-3 text-sm" : "px-3 py-2 text-sm",
    md: isMobile ? "px-6 py-4 text-base" : "px-4 py-3 text-base",
    lg: isMobile ? "px-8 py-5 text-lg" : "px-6 py-4 text-lg"
  }

  const variantMap = {
    primary: "bg-linear-to-r from-cyber-blue to-cyber-purple text-white border-0",
    secondary: "bg-background border border-border/20 text-foreground",
    outline: "bg-transparent border border-border/20 text-foreground"
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-xl font-medium transition-all duration-300",
        "backdrop-blur-sm",
        "touch-manipulation", // Prevents double-tap zoom
        sizeMap[size],
        variantMap[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileTap={!disabled ? { scale: isMobile ? 0.95 : 0.98 } : {}}
      disabled={disabled || loading}
    >
      {/* Touch feedback ripple */}
      <motion.div
        className="absolute inset-0 bg-white/10 opacity-0"
        whileTap={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <span className={cn("relative z-10", loading && "opacity-0")}>
        {children}
      </span>
    </motion.button>
  )
})

TouchButton.displayName = "TouchButton"

// Mobile-optimized navigation
export const MobileNav = React.forwardRef<HTMLElement, {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  onClose?: () => void
}>(({ children, className, isOpen = false, onClose }, ref) => {
  const { isMobile } = useMobileDetection()

  if (!isMobile) {
    return <nav ref={ref} className={cn("flex items-center space-x-8", className)}>{children}</nav>
  }

  return (
    <>
      {/* Mobile menu backdrop */}
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />
      
      {/* Mobile menu panel */}
      <motion.nav
        ref={ref}
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-xl border-l border-border/20 z-50 md:hidden",
          "overflow-y-auto",
          className
        )}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="p-6 space-y-6">
          {children}
        </div>
      </motion.nav>
    </>
  )
})

MobileNav.displayName = "MobileNav"

// Mobile-optimized hero section
export const MobileHero = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
}>(({ children, className }, ref) => {
  const { isMobile } = useMobileDetection()

  return (
    <div
      ref={ref}
      className={cn(
        "relative min-h-screen flex items-center justify-center px-6",
        isMobile ? "py-20" : "py-32",
        className
      )}
    >
      <div className={cn(
        "text-center max-w-4xl mx-auto",
        isMobile ? "space-y-8" : "space-y-12"
      )}>
        {children}
      </div>
    </div>
  )
})

MobileHero.displayName = "MobileHero"

// Touch-friendly card component
export const TouchCard = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  as?: "div" | "a"
}>(({ children, className, onClick, href, as = "div" }, ref) => {
  const { isMobile } = useMobileDetection()
  const Component = as

  return (
    <motion.div
      ref={ref}
      as={Component}
      href={href}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/20 bg-background/80 backdrop-blur-xl",
        "transition-all duration-300",
        isMobile ? "p-6" : "p-8",
        (onClick || href) && "cursor-pointer touch-manipulation",
        className
      )}
      whileHover={(onClick || href) ? { scale: isMobile ? 1.02 : 1.05 } : {}}
      whileTap={(onClick || href) ? { scale: isMobile ? 0.98 : 0.99 } : {}}
      onClick={onClick}
    >
      {/* Touch feedback overlay */}
      {(onClick || href) && (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-cyber-blue/10 to-cyber-purple/10 opacity-0"
          whileTap={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
})

TouchCard.displayName = "TouchCard"

// Mobile-optimized grid
export const MobileGrid = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  mobileCols?: 1 | 2
  desktopCols?: 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
}>(({ children, className, mobileCols = 1, desktopCols = 3, gap = "md" }, ref) => {
  const gapMap = {
    sm: "gap-4",
    md: "gap-6", 
    lg: "gap-8"
  }

  const mobileColsMap = {
    1: "grid-cols-1",
    2: "grid-cols-2"
  }

  const desktopColsMap = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid",
        mobileColsMap[mobileCols],
        desktopColsMap[desktopCols],
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  )
})

MobileGrid.displayName = "MobileGrid"

// Mobile-safe scroll indicator
export const MobileScrollIndicator = React.forwardRef<HTMLDivElement, {
  className?: string
}>(({ className }, ref) => {
  const { isMobile } = useMobileDetection()
  const [scrollProgress, setScrollProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isMobile) return null

  return (
    <div
      ref={ref}
      className={cn("fixed top-0 left-0 right-0 h-1 bg-background/20 z-50", className)}
    >
      <div
        className="h-full bg-linear-to-r from-cyber-blue to-cyber-purple transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
})

MobileScrollIndicator.displayName = "MobileScrollIndicator"

// Touch-friendly form inputs
export const TouchInput = React.forwardRef<HTMLInputElement, {
  className?: string
  placeholder?: string
  type?: string
  error?: boolean
}>(({ className, placeholder, type = "text", error = false }, ref) => {
  const { isMobile } = useMobileDetection()

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-xl border border-border/20 bg-background/80 backdrop-blur-sm",
        "transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 focus:border-cyber-blue",
        isMobile ? "px-4 py-4 text-base" : "px-3 py-2 text-sm",
        error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
        "placeholder:text-muted-foreground/50",
        className
      )}
      style={{ fontSize: isMobile ? "16px" : "14px" }} // Prevents zoom on iOS
    />
  )
})

TouchInput.displayName = "TouchInput"

// Mobile-safe modal
export const MobileModal = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
  className?: string
}>(({ children, isOpen = false, onClose, className }, ref) => {
  const { isMobile } = useMobileDetection()

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />
      
      {/* Modal content */}
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-4 top-1/2 -translate-y-1/2 bg-background/95 backdrop-blur-xl border border-border/20 rounded-2xl z-50",
          isMobile ? "max-h-[80vh] overflow-y-auto" : "max-w-lg mx-auto",
          className
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {children}
      </motion.div>
    </>
  )
})

MobileModal.displayName = "MobileModal"
