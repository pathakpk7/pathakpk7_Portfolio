"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PremiumLoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: "cyber-blue" | "cyber-purple" | "white"
  text?: string
}

export const PremiumLoading = React.forwardRef<HTMLDivElement, PremiumLoadingProps>(
  ({ className, size = "md", color = "cyber-blue", text }, ref) => {
    const getSize = () => {
      switch (size) {
        case "sm":
          return "w-8 h-8"
        case "md":
          return "w-12 h-12"
        case "lg":
          return "w-16 h-16"
        default:
          return "w-12 h-12"
      }
    }

    const getColor = () => {
      switch (color) {
        case "cyber-blue":
          return "bg-cyber-blue"
        case "cyber-purple":
          return "bg-cyber-purple"
        case "white":
          return "bg-white"
        default:
          return "bg-cyber-blue"
      }
    }

    return (
      <div ref={ref} className={cn("flex flex-col items-center space-y-4", className)}>
        {/* Luxury loading animation */}
        <div className={cn("relative", getSize())}>
          {/* Outer ring */}
          <motion.div
            className={cn("absolute inset-0 rounded-full border-2", getColor(), "border-opacity-20")}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Middle ring */}
          <motion.div
            className={cn("absolute inset-2 rounded-full border-2", getColor(), "border-opacity-40")}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner ring */}
          <motion.div
            className={cn("absolute inset-4 rounded-full border-2", getColor(), "border-opacity-60")}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Center dot */}
          <motion.div
            className={cn("absolute inset-0 flex items-center justify-center")}
          >
            <motion.div
              className={cn("w-2 h-2 rounded-full", getColor())}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {text && (
          <motion.p
            className="text-sm text-muted-foreground"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }
)

PremiumLoading.displayName = "PremiumLoading"

// Button loading state
export const ButtonLoading = React.forwardRef<HTMLButtonElement, {
  children: React.ReactNode
  className?: string
  loading?: boolean
  disabled?: boolean
  color?: "cyber-blue" | "cyber-purple" | "white"
}>(({ children, className, loading = false, disabled = false, color = "cyber-blue", ...props }, ref) => {
  const getColor = () => {
    switch (color) {
      case "cyber-blue":
        return "bg-cyber-blue"
      case "cyber-purple":
        return "bg-cyber-purple"
      case "white":
        return "bg-white"
      default:
        return "bg-cyber-blue"
      }
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-6 py-3 rounded-xl border transition-all duration-300",
        "backdrop-blur-sm overflow-hidden",
        loading || disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        className
      )}
      disabled={loading || disabled}
      whileHover={!loading && !disabled ? { scale: 1.02 } : {}}
      whileTap={!loading && !disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {/* Loading overlay */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <PremiumLoading size="sm" color={color} />
        </motion.div>
      )}

      {/* Button content */}
      <motion.div
        className="relative z-10 flex items-center justify-center space-x-2"
        animate={{
          opacity: loading ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.button>
  )
})

ButtonLoading.displayName = "ButtonLoading"

// Skeleton loading component
export const SkeletonLoading = React.forwardRef<HTMLDivElement, {
  className?: string
  width?: string
  height?: string
  lines?: number
}>(({ className, width = "100%", height = "1rem", lines = 1 }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      {[...Array(lines)].map((_, i) => (
        <motion.div
          key={i}
          className="rounded-lg bg-muted/30 overflow-hidden"
          style={{ width, height }}
        >
          <motion.div
            className="h-full bg-linear-to-r from-transparent via-muted/50 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
})

SkeletonLoading.displayName = "SkeletonLoading"

// Page transition loading
export const PageTransition = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  duration?: number
}>(({ children, className, duration = 0.8 }, ref) => {
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), duration * 1000)
    return () => clearTimeout(timer)
  }, [duration])

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Loading overlay */}
      <motion.div
        className="absolute inset-0 bg-background z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: duration, ease: "easeInOut" }}
        style={{ pointerEvents: isLoading ? "auto" : "none" }}
      >
        {isLoading && <PremiumLoading size="lg" text="Loading..." />}
      </motion.div>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: duration, delay: isLoading ? 0 : 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
})

PageTransition.displayName = "PageTransition"

// Form submission loading
export const FormLoading = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  loading?: boolean
  className?: string
}>(({ children, loading = false, className }, ref) => {
  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Loading overlay */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center space-y-4">
            <PremiumLoading size="md" text="Submitting..." />
          </div>
        </motion.div>
      )}

      {/* Form content */}
      <motion.div
        animate={{
          opacity: loading ? 0.3 : 1,
          scale: loading ? 0.98 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  )
})

FormLoading.displayName = "FormLoading"
