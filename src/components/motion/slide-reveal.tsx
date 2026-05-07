"use client"

import * as React from "react"
import { motion, MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface SlideRevealProps extends Omit<MotionProps, "as"> {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  staggerChildren?: number
}

const SlideReveal = React.forwardRef<HTMLDivElement, SlideRevealProps>(
  ({ 
    children, 
    className, 
    delay = 0, 
    duration = 0.6,
    direction = "up",
    distance = 30,
    staggerChildren = 0.1,
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
      }
    }

    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren: delay
        }
      }
    }

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...motionProps}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={variants[direction]}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }
)
SlideReveal.displayName = "SlideReveal"

export { SlideReveal }
