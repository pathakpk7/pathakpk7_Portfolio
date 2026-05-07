"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RevealTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
}

const RevealText = React.forwardRef<HTMLDivElement, RevealTextProps>(
  ({ 
    children, 
    className, 
    delay = 0, 
    duration = 0.6,
    direction = "up"
  }, ref) => {
    const variants = {
      up: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      },
      down: {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 }
      },
      left: {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      },
      right: {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
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
      >
        {children}
      </motion.div>
    )
  }
)
RevealText.displayName = "RevealText"

export { RevealText }
