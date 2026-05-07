"use client"

import * as React from "react"
import { motion, MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementProps extends Omit<MotionProps, "as"> {
  children: React.ReactNode
  className?: string
  duration?: number
  intensity?: number
  delay?: number
  hover?: boolean
}

const FloatingElement = React.forwardRef<HTMLDivElement, FloatingElementProps>(
  ({ 
    children, 
    className, 
    duration = 3,
    intensity = 10,
    delay = 0,
    hover = true,
    ...motionProps 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "inline-block",
          hover && "hover:scale-105 transition-transform duration-300",
          className
        )}
        animate={{
          y: [0, -intensity, 0],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        {...motionProps}
      >
        {children}
      </motion.div>
    )
  }
)
FloatingElement.displayName = "FloatingElement"

export { FloatingElement }
