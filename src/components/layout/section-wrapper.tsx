"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  children: React.ReactNode
  className?: string
  background?: "default" | "gradient" | "cyber" | "minimal" | "cinematic" | "dark"
  padding?: "sm" | "md" | "lg" | "xl" | "2xl" | "none"
  animate?: boolean
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ 
    id, 
    children, 
    className, 
    background = "default", 
    padding = "lg",
    animate = true,
    delay = 0,
    direction = "up",
    ...props 
  }, ref) => {
    const backgroundClasses = {
      default: "bg-background",
      gradient: "gradient-bg-subtle",
      cyber: "gradient-bg-cyber",
      minimal: "bg-transparent",
      cinematic: "gradient-bg-cyber",
      dark: "bg-slate-950",
    }

    const paddingClasses = {
      none: "py-0",
      sm: "py-12",
      md: "py-16",
      lg: "py-20",
      xl: "py-24",
      "2xl": "py-32",
    }

    const variants = {
      up: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      },
      down: {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 }
      },
      left: {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 }
      },
      right: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 }
      }
    }

    const sectionContent = (
      <section
        id={id}
        className={cn(
          "w-full relative overflow-hidden",
          backgroundClasses[background],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {/* Subtle background gradient overlay */}
        {background === "cinematic" && (
          <div className="absolute inset-0 bg-linear-to-br from-cyber-blue-500/5 to-cyber-purple-500/5 pointer-events-none" />
        )}
        
        {children}
      </section>
    )

    if (animate) {
      return (
        <motion.section
          ref={ref}
          id={id}
          className={cn(
            "w-full relative overflow-hidden",
            backgroundClasses[background],
            paddingClasses[padding],
            className
          )}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={variants[direction]}
          transition={{ 
            duration: 0.8, 
            delay, 
            ease: [0.25, 0.1, 0.25, 1] 
          }}
          {...props}
        >
          {/* Subtle background gradient overlay */}
          {background === "cinematic" && (
            <div className="absolute inset-0 bg-linear-to-br from-cyber-blue-500/5 to-cyber-purple-500/5 pointer-events-none" />
          )}
          
          {children}
        </motion.section>
      )
    }

    return sectionContent
  }
)
SectionWrapper.displayName = "SectionWrapper"

export { SectionWrapper }
