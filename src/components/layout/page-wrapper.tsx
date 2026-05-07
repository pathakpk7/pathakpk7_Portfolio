"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  background?: "default" | "cinematic" | "dark" | "gradient"
  showBackground?: boolean
}

const PageWrapper = React.forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ children, className, background = "default", showBackground = true, ...props }, ref) => {
    // Fixed particle positions to avoid hydration mismatch
    const particlePositions = [
      { x: 10, y: 15 }, { x: 25, y: 8 }, { x: 40, y: 25 }, { x: 55, y: 12 }, { x: 70, y: 30 },
      { x: 85, y: 5 }, { x: 15, y: 45 }, { x: 30, y: 35 }, { x: 45, y: 50 }, { x: 60, y: 40 },
      { x: 75, y: 55 }, { x: 90, y: 35 }, { x: 5, y: 65 }, { x: 20, y: 75 }, { x: 35, y: 60 },
      { x: 50, y: 70 }, { x: 65, y: 80 }, { x: 80, y: 65 }, { x: 95, y: 85 }, { x: 12, y: 90 }
    ]

    const backgroundClasses = {
      default: "bg-background",
      cinematic: "bg-slate-950",
      dark: "bg-black",
      gradient: "gradient-bg-cyber",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen relative overflow-x-hidden",
          showBackground && backgroundClasses[background],
          className
        )}
        {...props}
      >
        {/* Cinematic background elements */}
        {showBackground && background === "cinematic" && (
          <>
            {/* Subtle gradient overlay */}
            <div className="fixed inset-0 bg-linear-to-br from-cyber-blue-500/5 via-transparent to-cyber-purple-500/5 pointer-events-none" />
            
            {/* Ambient glow effects */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-cyber-blue-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyber-purple-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
            
            {/* Grid pattern overlay */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[50px_50px]" />
            </div>
          </>
        )}

        {/* Main content with motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10"
        >
          {children}
        </motion.div>

        {/* Floating particles background (optional) */}
        {showBackground && background === "cinematic" && (
          <div className="fixed inset-0 pointer-events-none">
            {particlePositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyber-blue-500 rounded-full opacity-30"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 10 + (i % 10) * 2,
                  repeat: Infinity,
                  delay: (i % 5) * 1,
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
PageWrapper.displayName = "PageWrapper"

export { PageWrapper }
