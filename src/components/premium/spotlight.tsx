"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  children: React.ReactNode
  className?: string
  color?: "cyber-blue" | "cyber-purple" | "white"
  intensity?: number
  size?: number
  followCursor?: boolean
}

export const Spotlight = React.forwardRef<HTMLDivElement, SpotlightProps>(
  ({ children, className, color = "cyber-blue", intensity = 0.3, size = 400, followCursor = true }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !followCursor) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setMousePosition({ x, y })
      }

      const container = containerRef.current
      if (container) {
        container.addEventListener('mousemove', handleMouseMove)
        return () => container.removeEventListener('mousemove', handleMouseMove)
      }
    }, [followCursor])

    const getSpotlightColor = () => {
      switch (color) {
        case "cyber-blue":
          return "#3b82f6"
        case "cyber-purple":
          return "#a855f7"
        case "white":
          return "#ffffff"
        default:
          return "#3b82f6"
      }
    }

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main spotlight effect */}
        <motion.div
          className="pointer-events-none absolute"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: mousePosition.x - size / 2,
            top: mousePosition.y - size / 2,
            background: `radial-gradient(circle ${size/2}px at center, ${getSpotlightColor()}${Math.floor(intensity * 255).toString(16)}, transparent)`,
            filter: 'blur(60px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        />

        {/* Secondary spotlight */}
        <motion.div
          className="pointer-events-none absolute"
          style={{
            width: `${size * 0.6}px`,
            height: `${size * 0.6}px`,
            left: mousePosition.x - (size * 0.3),
            top: mousePosition.y - (size * 0.3),
            background: `radial-gradient(circle ${size * 0.3}px at center, ${getSpotlightColor()}${Math.floor(intensity * 0.5 * 255).toString(16)}, transparent)`,
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.1
          }}
        />

        {/* Ambient glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={{
            opacity: isHovered ? intensity * 0.2 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
          style={{
            background: `linear-gradient(135deg, ${getSpotlightColor()}20, transparent)`,
            filter: 'blur(80px)',
          }}
        />

        {children}
      </div>
    )
  }
)

Spotlight.displayName = "Spotlight"

// Spotlight transition component for section reveals
export const SpotlightTransition = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
}>(({ children, className, direction = "left", delay = 0, duration = 1.2 }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -100px 0px"
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  const getSpotlightAnimation = () => {
    switch (direction) {
      case "left":
        return {
          initial: { clipPath: "inset(0 100% 0 0)" },
          animate: { clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }
        }
      case "right":
        return {
          initial: { clipPath: "inset(0 0 0 100%)" },
          animate: { clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }
        }
      case "up":
        return {
          initial: { clipPath: "inset(100% 0 0 0)" },
          animate: { clipPath: isVisible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }
        }
      case "down":
        return {
          initial: { clipPath: "inset(0 0 100% 0)" },
          animate: { clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }
        }
      default:
        return {
          initial: { clipPath: "inset(0 100% 0 0)" },
          animate: { clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }
        }
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Spotlight overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={getSpotlightAnimation().initial}
        animate={getSpotlightAnimation().animate}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  )
})

SpotlightTransition.displayName = "SpotlightTransition"

// Interactive lighting component for ambient effects
export const InteractiveLighting = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  lightColor?: "cyber-blue" | "cyber-purple" | "white"
  intensity?: number
}>(({ children, className, lightColor = "cyber-blue", intensity = 0.2 }, ref) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const getLightColor = () => {
    switch (lightColor) {
      case "cyber-blue":
        return "rgba(59, 130, 246,"
      case "cyber-purple":
        return "rgba(168, 85, 247,"
      case "white":
        return "rgba(255, 255, 255,"
      default:
        return "rgba(59, 130, 246,"
    }
  }

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient lighting layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, ${getLightColor()}${Math.floor(intensity * 255).toString(16)}, transparent)`,
          opacity: isHovered ? 1 : 0.3,
          transition: 'opacity 0.4s ease-out',
        }}
      />

      {/* Secondary ambient layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, ${getLightColor()}${Math.floor(intensity * 0.5 * 255).toString(16)}, transparent)`,
          opacity: isHovered ? 0.8 : 0.2,
          transition: 'opacity 0.6s ease-out',
        }}
      />

      {children}
    </div>
  )
})

InteractiveLighting.displayName = "InteractiveLighting"
