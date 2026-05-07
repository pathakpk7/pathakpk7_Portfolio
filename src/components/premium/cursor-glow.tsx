"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CursorGlowProps {
  children: React.ReactNode
  className?: string
  glowColor?: "cyber-blue" | "cyber-purple" | "white"
  intensity?: number
}

export const CursorGlow = React.forwardRef<HTMLDivElement, CursorGlowProps>(
  ({ children, className, glowColor = "cyber-blue", intensity = 0.5 }) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return

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
    }, [])

    const getGlowColor = () => {
      switch (glowColor) {
        case "cyber-blue":
          return "from-cyber-blue/40 to-transparent"
        case "cyber-purple":
          return "from-cyber-purple/40 to-transparent"
        case "white":
          return "from-white/20 to-transparent"
        default:
          return "from-cyber-blue/40 to-transparent"
      }
    }

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cursor glow effect */}
        <motion.div
          className="pointer-events-none absolute -inset-20"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, transparent, transparent)`,
          }}
          animate={{
            opacity: isHovered ? intensity : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-r",
              getGlowColor()
            )}
            style={{
              filter: 'blur(40px)',
            }}
          />
        </motion.div>

        {/* Spotlight effect */}
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            background: `radial-gradient(circle 100px at center, ${glowColor === 'cyber-blue' ? '#3b82f6' : glowColor === 'cyber-purple' ? '#a855f7' : '#ffffff'}10, transparent)`,
            filter: 'blur(60px)',
          }}
          animate={{
            opacity: isHovered ? intensity * 0.8 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        />

        {/* Ambient cursor presence */}
        <motion.div
          className="pointer-events-none absolute w-2 h-2 rounded-full"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4,
            backgroundColor: glowColor === 'cyber-blue' ? '#3b82f6' : glowColor === 'cyber-purple' ? '#a855f7' : '#ffffff',
            boxShadow: `0 0 20px ${glowColor === 'cyber-blue' ? '#3b82f6' : glowColor === 'cyber-purple' ? '#a855f7' : '#ffffff'}`,
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        />

        {children}
      </div>
    )
  }
)

CursorGlow.displayName = "CursorGlow"
