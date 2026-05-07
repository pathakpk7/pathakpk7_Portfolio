"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LayeredCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  shadowIntensity?: number
  liftAmount?: number
  tiltAmount?: number
  glowColor?: "cyber-blue" | "cyber-purple" | "white"
  enabled?: boolean
}

export const LayeredCard = React.forwardRef<HTMLDivElement, LayeredCardProps>(
  ({ children, className, shadowIntensity = 0.3, liftAmount = 8, tiltAmount = 5, glowColor = "cyber-blue", enabled = true, ...props }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = React.useState(false)
    const cardRef = React.useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !enabled) return

      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = ((e.clientX - centerX) / rect.width) * tiltAmount
      const y = ((e.clientY - centerY) / rect.height) * tiltAmount

      setMousePosition({ x, y })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
      setIsHovered(false)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const getGlowColor = () => {
      switch (glowColor) {
        case "cyber-blue":
          return "from-cyber-blue/40 to-cyber-purple/20"
        case "cyber-purple":
          return "from-cyber-purple/40 to-cyber-blue/20"
        case "white":
          return "from-white/20 to-transparent"
        default:
          return "from-cyber-blue/40 to-cyber-purple/20"
      }
    }

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {/* Shadow layers */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            transform: `
              translateX(${isHovered ? mousePosition.x * 2 : 0}px) 
              translateY(${isHovered ? mousePosition.y * 2 : 0}px)
              scale(${isHovered ? 1.02 : 1})
            `,
            opacity: isHovered ? shadowIntensity * 0.3 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            transform: `
              translateX(${isHovered ? mousePosition.x * 1.5 : 0}px) 
              translateY(${isHovered ? mousePosition.y * 1.5 : 0}px)
              scale(${isHovered ? 1.015 : 1})
            `,
            opacity: isHovered ? shadowIntensity * 0.5 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 60%)",
            filter: "blur(15px)",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            transform: `
              translateX(${isHovered ? mousePosition.x : 0}px) 
              translateY(${isHovered ? mousePosition.y : 0}px)
              scale(${isHovered ? 1.01 : 1})
            `,
            opacity: isHovered ? shadowIntensity * 0.7 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.2) 0%, transparent 50%)",
            filter: "blur(10px)",
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          animate={{
            opacity: isHovered ? shadowIntensity : 0,
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
          style={{
            background: `linear-gradient(135deg, ${glowColor === 'cyber-blue' ? '#3b82f6' : glowColor === 'cyber-purple' ? '#a855f7' : '#ffffff'}20, transparent)`,
            filter: "blur(30px)",
          }}
        />

        {/* Main card */}
        <motion.div
          ref={cardRef}
          className="relative rounded-2xl bg-background/80 backdrop-blur-xl border border-border/20 overflow-hidden"
          animate={{
            transform: `
              perspective(1000px)
              rotateX(${-mousePosition.y}deg) 
              rotateY(${mousePosition.x}deg)
              translateZ(${isHovered ? liftAmount : 0}px)
            `,
            boxShadow: isHovered 
              ? `0 ${20 + liftAmount}px ${40}px rgba(0,0,0,${shadowIntensity})`
              : `0 4px 6px rgba(0,0,0,0.1)`,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Inner glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0"
            animate={{
              opacity: isHovered ? 0.1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
            style={{
              background: `linear-gradient(135deg, ${glowColor === 'cyber-blue' ? '#3b82f6' : glowColor === 'cyber-purple' ? '#a855f7' : '#ffffff'}10, transparent)`,
            }}
          />

          {children}
        </motion.div>

        {/* Floating particles on hover */}
        {isHovered && enabled && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "absolute w-1 h-1 rounded-full",
                  glowColor === "cyber-blue" ? "bg-cyber-blue" : glowColor === "cyber-purple" ? "bg-cyber-purple" : "bg-white"
                )}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

LayeredCard.displayName = "LayeredCard"

// Premium hover depth component for specific use cases
export const HoverDepth = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  depth?: number
  intensity?: number
}>(({ children, className, depth = 10, intensity = 0.5 }, ref) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = ((e.clientX - centerX) / rect.width) * depth
    const y = ((e.clientY - centerY) / rect.height) * depth

    setMousePosition({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      animate={{
        transform: `
          perspective(1000px)
          rotateX(${-mousePosition.y}deg) 
          rotateY(${mousePosition.x}deg)
          translateZ(${isHovered ? depth : 0}px)
        `,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  )
})

HoverDepth.displayName = "HoverDepth"
