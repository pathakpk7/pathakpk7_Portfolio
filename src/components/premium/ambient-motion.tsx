"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AmbientMotionProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  speed?: number
  particles?: number
}

export const AmbientMotion = React.forwardRef<HTMLDivElement, AmbientMotionProps>(
  ({ children, className, intensity = 0.3, speed = 1, particles = 8 }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating ambient particles */}
        {[...Array(particles)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyber-blue/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, isHovered ? 0.6 : 0.3, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
              timeScale: speed,
            }}
          />
        ))}

        {/* Ambient glow orbs */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-cyber-purple/10 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, isHovered ? 0.5 : 0.4, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            timeScale: speed,
          }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-cyber-blue/10 rounded-full blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
            opacity: [0.3, isHovered ? 0.5 : 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            timeScale: speed,
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/3 left-1/4 w-24 h-24 bg-cyber-purple/5 rounded-full blur-2xl"
          animate={{
            y: [0, -10, 0],
            x: [0, 8, 0],
            opacity: [0.2, isHovered ? 0.4 : 0.3, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            timeScale: speed,
            delay: 1,
          }}
        />

        {/* Breathing effect overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyber-blue/5 to-cyber-purple/5 opacity-0"
          animate={{
            opacity: isHovered ? [0, 0.1, 0] : [0, 0.05, 0],
            scale: isHovered ? [1, 1.02, 1] : [1, 1.01, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {children}
      </div>
    )
  }
)

AmbientMotion.displayName = "AmbientMotion"

// Floating element component for specific UI elements
export const FloatingElement = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  floatAmount?: number
  speed?: number
  delay?: number
}>(({ children, className, floatAmount = 10, speed = 1, delay = 0 }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      animate={{
        y: [0, -floatAmount, 0],
      }}
      transition={{
        duration: 3 / speed,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  )
})

FloatingElement.displayName = "FloatingElement"

// Breathing animation component
export const BreathingElement = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  intensity?: number
  speed?: number
}>(({ children, className, intensity = 0.05, speed = 1 }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      animate={{
        scale: [1, 1 + intensity, 1],
        opacity: [1, 0.95, 1],
      }}
      transition={{
        duration: 4 / speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
})

BreathingElement.displayName = "BreathingElement"

// Pulse animation component for ambient effects
export const PulseElement = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  pulseColor?: "cyber-blue" | "cyber-purple" | "white"
  intensity?: number
  speed?: number
}>(({ children, className, pulseColor = "cyber-blue", intensity = 0.3, speed = 1 }, ref) => {
  const getColor = () => {
    switch (pulseColor) {
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
      className={cn("relative", className)}
    >
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          opacity: [0, intensity, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2 / speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle, ${getColor()}${Math.floor(intensity * 255).toString(16)}, transparent)`,
          filter: "blur(20px)",
        }}
      />

      {children}
    </div>
  )
})

PulseElement.displayName = "PulseElement"
