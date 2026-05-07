"use client"

import * as React from "react"
import { motion, MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeInProps extends Omit<MotionProps, "as"> {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
}

const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ 
    children, 
    className, 
    delay = 0, 
    duration = 0.6,
    direction = "up",
    distance = 20,
    ...motionProps 
  }, ref) => {
    const variants = {
      up: {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 }
      },
      down: {
        hidden: { opacity: 0, y: -distance },
        visible: { opacity: 1, y: 0 }
      },
      left: {
        hidden: { opacity: 0, x: -distance },
        visible: { opacity: 1, x: 0 }
      },
      right: {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0 }
      },
      none: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }
    }

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={variants[direction]}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        {...motionProps}
      >
        {children}
      </motion.div>
    )
  }
)
FadeIn.displayName = "FadeIn"

export { FadeIn }
