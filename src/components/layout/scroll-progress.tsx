"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  className?: string
  position?: "top" | "bottom"
  color?: "primary" | "cyber" | "gradient"
}

const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ className, position = "top", color = "cyber" }, ref) => {
    const [scrollProgress, setScrollProgress] = React.useState(0)

    React.useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = (scrollTop / docHeight) * 100
        setScrollProgress(scrollPercent)
      }

      window.addEventListener("scroll", handleScroll)
      handleScroll() // Initial call

      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const colorClasses = {
      primary: "bg-primary",
      cyber: "bg-gradient-to-r from-cyber-blue-500 to-cyber-purple-500",
      gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
    }

    const positionClasses = {
      top: "top-0 left-0 right-0 h-1",
      bottom: "bottom-0 left-0 right-0 h-1",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-50",
          positionClasses[position],
          className
        )}
      >
        <motion.div
          className={cn("h-full", colorClasses[color])}
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>
    )
  }
)
ScrollProgress.displayName = "ScrollProgress"

export { ScrollProgress }
