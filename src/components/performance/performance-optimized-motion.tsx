"use client"

import * as React from "react"
import { motion, useReducedMotion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

interface PerformanceOptimizedMotionProps {
  children: React.ReactNode
  className?: string
  animate?: any
  initial?: any
  whileHover?: any
  whileTap?: any
  transition?: any
  variants?: any
  layout?: boolean
  layoutId?: string
  exit?: any
}

// Performance-aware motion component
export const PerformanceOptimizedMotion = React.forwardRef<HTMLDivElement, PerformanceOptimizedMotionProps>(
  ({ 
    children, 
    className, 
    animate, 
    initial, 
    whileHover, 
    whileTap, 
    transition, 
    variants, 
    layout, 
    layoutId, 
    exit,
    ...props 
  }, ref) => {
    const shouldReduceMotion = useReducedMotion()
    const { isMobile, performanceMode } = useMobileOptimization()

    // Disable complex animations on mobile or when performance is reduced
    const optimizedAnimate = React.useMemo(() => {
      if (!performanceMode || shouldReduceMotion) {
        return { opacity: 1 }
      }
      return animate
    }, [animate, performanceMode, shouldReduceMotion])

    const optimizedInitial = React.useMemo(() => {
      if (!performanceMode || shouldReduceMotion) {
        return { opacity: 0 }
      }
      return initial
    }, [initial, performanceMode, shouldReduceMotion])

    const optimizedWhileHover = React.useMemo(() => {
      if (!performanceMode || isMobile || shouldReduceMotion) {
        return undefined
      }
      return whileHover
    }, [whileHover, performanceMode, isMobile, shouldReduceMotion])

    const optimizedTransition = React.useMemo(() => {
      if (!performanceMode || shouldReduceMotion) {
        return { duration: 0.2 }
      }
      return transition || { duration: 0.3 }
    }, [transition, performanceMode, shouldReduceMotion])

    return (
      <motion.div
        ref={ref}
        className={cn("transform-gpu", className)}
        animate={optimizedAnimate}
        initial={optimizedInitial}
        whileHover={optimizedWhileHover}
        whileTap={optimizedWhileTap}
        transition={optimizedTransition}
        variants={variants}
        layout={layout}
        layoutId={layoutId}
        exit={exit}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

PerformanceOptimizedMotion.displayName = "PerformanceOptimizedMotion"

// GPU-optimized transform component
export const GPUTransform = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  scale?: number
  rotate?: number
  x?: number
  y?: number
  opacity?: number
  transition?: any
}>(({ 
  children, 
  className, 
  scale = 1, 
  rotate = 0, 
  x = 0, 
  y = 0, 
  opacity = 1,
  transition 
}, ref) => {
  const { performanceMode } = useMobileOptimization()

  const transform = React.useMemo(() => {
    if (!performanceMode) {
      return `translate3d(0px, 0px, 0px)`
    }
    return `translate3d(${x}px, ${y}px, 0px) scale(${scale}) rotate(${rotate}deg)`
  }, [x, y, scale, rotate, performanceMode])

  return (
    <motion.div
      ref={ref}
      className={cn("transform-gpu", className)}
      style={{ transform }}
      animate={{ opacity }}
      transition={transition || { duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
})

GPUTransform.displayName = "GPUTransform"

// Performance-safe hover component
export const SafeHover = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  scale?: number
  opacity?: number
  disabled?: boolean
}>(({ children, className, scale = 1.05, opacity = 0.8, disabled = false }, ref) => {
  const { isMobile, performanceMode } = useMobileOptimization()

  if (disabled || !performanceMode || isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={cn("transform-gpu cursor-pointer", className)}
      whileHover={{ 
        scale, 
        opacity,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: scale * 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  )
})

SafeHover.displayName = "SafeHover"

// Throttled animation component
export const ThrottledAnimation = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  trigger?: boolean
  delay?: number
}>(({ children, className, trigger = true, delay = 100 }, ref) => {
  const [shouldAnimate, setShouldAnimate] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setShouldAnimate(trigger)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [trigger, delay])

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
})

ThrottledAnimation.displayName = "ThrottledAnimation"

// Performance monitoring hook for animations
export const useAnimationPerformance = () => {
  const { isMobile, performanceMode } = useMobileOptimization()
  const frameCount = React.useRef(0)
  const lastTime = React.useRef(performance.now())

  React.useEffect(() => {
    if (!performanceMode) return

    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()
      
      if (currentTime - lastTime.current >= 1000) {
        const fps = frameCount.current
        frameCount.current = 0
        lastTime.current = currentTime
        
        // Reduce animation quality if FPS drops below threshold
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}`)
          // Could trigger performance mode reduction here
        }
      }
      
      requestAnimationFrame(measureFPS)
    }

    requestAnimationFrame(measureFPS)
  }, [performanceMode])

  return { isMobile, performanceMode }
}

// Optimized stagger animation
export const OptimizedStagger = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  staggerChildren?: number
}>(({ children, className, staggerDelay = 0.1, staggerChildren = 0.05 }, ref) => {
  const { performanceMode } = useMobileOptimization()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: performanceMode ? staggerChildren : 0,
        delayChildren: performanceMode ? staggerDelay : 0,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: performanceMode ? 0.3 : 0.1 }
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            variants: itemVariants,
            custom: index,
          })
        }
        return child
      })}
    </motion.div>
  )
})

OptimizedStagger.displayName = "OptimizedStagger"

// Lazy animation trigger
export const LazyAnimationTrigger = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}>(({ children, className, threshold = 0.1, rootMargin = "100px" }, ref) => {
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
        rootMargin,
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
  }, [threshold, rootMargin])

  return (
    <div ref={elementRef}>
      {isVisible ? (
        <motion.div
          ref={ref}
          className={className}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      ) : (
        <div ref={ref} className={className} style={{ opacity: 0 }}>
          {children}
        </div>
      )}
    </div>
  )
})

LazyAnimationTrigger.displayName = "LazyAnimationTrigger"
