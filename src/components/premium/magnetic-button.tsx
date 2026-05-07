"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "luxury"
  size?: "sm" | "md" | "lg"
  magnetStrength?: number
  disabled?: boolean
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, variant = "primary", size = "md", magnetStrength = 0.3, disabled = false, ...props }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = React.useState(false)
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || disabled) return

      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = (e.clientX - centerX) * magnetStrength
      const y = (e.clientY - centerY) * magnetStrength

      setMousePosition({ x, y })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
      setIsHovered(false)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return "bg-linear-to-r from-cyber-blue to-cyber-purple text-white border-cyber-blue/50"
        case "secondary":
          return "bg-background/80 backdrop-blur-md text-foreground border-cyber-blue/30 hover:border-cyber-blue/50"
        case "luxury":
          return "bg-linear-to-br from-cyber-blue/20 to-cyber-purple/20 text-cyber-blue border-cyber-blue/40"
        default:
          return "bg-linear-to-r from-cyber-blue to-cyber-purple text-white border-cyber-blue/50"
      }
    }

    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return "px-4 py-2 text-sm"
        case "md":
          return "px-6 py-3 text-base"
        case "lg":
          return "px-8 py-4 text-lg"
        default:
          return "px-6 py-3 text-base"
      }
    }

    return (
      <motion.button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden rounded-xl border transition-all duration-300 ease-out",
          "backdrop-blur-sm shadow-lg hover:shadow-2xl",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          getVariantStyles(),
          getSizeStyles(),
          className
        )}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        disabled={disabled}
        {...props}
      >
        {/* Premium glow effect */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-cyber-blue/30 to-cyber-purple/30 opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles on hover */}
        {isHovered && !disabled && (
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 10 - 5, 0],
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
        
        {/* Button content */}
        <motion.div
          className="relative z-10 flex items-center justify-center space-x-2"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {children}
        </motion.div>

        {/* Subtle depth shadow */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-black/20 opacity-0"
          animate={{
            opacity: isHovered ? 0.1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </motion.button>
    )
  }
)

MagneticButton.displayName = "MagneticButton"
