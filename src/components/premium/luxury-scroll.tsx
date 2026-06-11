"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface LuxuryScrollProps {
  children: React.ReactNode
  className?: string
  scrollSpeed?: number
  parallaxAmount?: number
}

export const LuxuryScroll = React.forwardRef<HTMLDivElement, LuxuryScrollProps>(
  ({ children, className, scrollSpeed = 0.5, parallaxAmount = 100 }, ref) => {
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], [0, parallaxAmount])
    const smoothY = useSpring(y, { stiffness: 100, damping: 20, mass: 1 })

    return (
      <motion.div
        ref={ref}
        className={cn("relative", className)}
        style={{ y: smoothY }}
      >
        {children}
      </motion.div>
    )
  }
)

LuxuryScroll.displayName = "LuxuryScroll"

// Scroll reveal with luxury timing
export const ScrollReveal = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
}>(({ children, className, direction = "up", delay = 0, duration = 0.8, threshold = 0.2 }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold,
        rootMargin: "-50px 0px -50px 0px"
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold])

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: 60, opacity: 0 }
      case "down":
        return { y: -60, opacity: 0 }
      case "left":
        return { x: 60, opacity: 0 }
      case "right":
        return { x: -60, opacity: 0 }
      default:
        return { y: 60, opacity: 0 }
    }
  }

  return (
    <motion.div
      ref={elementRef}
      className={cn("overflow-hidden", className)}
      initial={getInitialTransform()}
      animate={isVisible ? { x: 0, y: 0, opacity: 1 } : getInitialTransform()}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
})

ScrollReveal.displayName = "ScrollReveal"

// Scroll progress indicator
export const ScrollProgress = React.forwardRef<HTMLDivElement, {
  className?: string
  color?: "cyber-blue" | "cyber-purple" | "white"
  height?: number
}>(({ className, color = "cyber-blue", height = 2 }, ref) => {
  const { scrollYProgress } = useScroll()

  const getProgressColor = () => {
    switch (color) {
      case "cyber-blue":
        return "bg-cyber-blue"
      case "cyber-purple":
        return "bg-cyber-purple"
      case "white":
        return "bg-white"
      default:
        return "bg-cyber-blue"
    }
  }

  return (
    <motion.div
      ref={ref}
      className={cn("fixed top-0 left-0 right-0 z-50 origin-left", className)}
      style={{ height: `${height}px` }}
    >
      <motion.div
        className={cn("h-full", getProgressColor())}
        style={{ originX: 0 }}
        scaleX={scrollYProgress}
      />
    </motion.div>
  )
})

ScrollProgress.displayName = "ScrollProgress"

// Parallax layers for depth
export const ParallaxLayer = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  speed?: number
  offset?: number
}>(({ children, className, speed = 0.5, offset = 0 }, ref) => {
    const { scrollYProgress } = useScroll()
    const y = useTransform(
      scrollYProgress,
      [0, 1],
      [offset * speed, -offset * speed]
    )

    return (
      <motion.div
        ref={ref}
        className={cn("absolute inset-0", className)}
        style={{ y }}
      >
        {children}
      </motion.div>
    )
  }
)

ParallaxLayer.displayName = "ParallaxLayer"

// Smooth scroll to section
export const useSmoothScroll = () => {
  const scrollToSection = (sectionId: string, offset = 0) => {
    if (typeof window === "undefined") return
    const element = document.getElementById(sectionId)
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    }
  }

  return { scrollToSection }
}

// Scroll-based blur effect
export const ScrollBlur = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  blurAmount?: number
  scrollRange?: [number, number]
}>(({ children, className, blurAmount = 10, scrollRange = [0, 1] }, ref) => {
  const { scrollYProgress } = useScroll()
  const blur = useTransform(
    scrollYProgress,
    scrollRange,
    [0, blurAmount]
  )

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ filter: `blur(${blur}px)` }}
    >
      {children}
    </motion.div>
  )
})

ScrollBlur.displayName = "ScrollBlur"

// Scroll-triggered scale effect
export const ScrollScale = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  scaleRange?: [number, number]
  scrollRange?: [number, number]
}>(({ children, className, scaleRange = [0.8, 1], scrollRange = [0, 1] }, ref) => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(
    scrollYProgress,
    scrollRange,
    scaleRange
  )

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ scale }}
    >
      {children}
    </motion.div>
  )
})

ScrollScale.displayName = "ScrollScale"

// Scroll-based rotation effect
export const ScrollRotate = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  rotationRange?: [number, number]
  scrollRange?: [number, number]
}>(({ children, className, rotationRange = [0, 360], scrollRange = [0, 1] }, ref) => {
  const { scrollYProgress } = useScroll()
  const rotate = useTransform(
    scrollYProgress,
    scrollRange,
    rotationRange
  )

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ rotate: `${rotate}deg` }}
    >
      {children}
    </motion.div>
  )
})

ScrollRotate.displayName = "ScrollRotate"
