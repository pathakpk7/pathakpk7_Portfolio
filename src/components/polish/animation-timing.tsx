"use client"

import * as React from "react"
import { motion, useReducedMotion, Easing } from "framer-motion"
import { cn } from "@/lib/utils"

// Premium animation timing constants
export const TIMING = {
  // Duration constants (in seconds)
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  cinematic: 1.2,

  // Delay constants
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
  cinematicDelay: 0.6,

  // Easing functions for premium feel
  ease: [0.25, 0.1, 0.25, 1] as unknown as Easing[], // Material Design ease
  easeIn: [0.42, 0, 1, 1] as unknown as Easing[],   // Ease in
  easeOut: [0, 0, 0.58, 1] as unknown as Easing[],  // Ease out
  easeInOut: [0.42, 0, 0.58, 1] as unknown as Easing[], // Ease in-out
  bounce: [0.68, -0.55, 0.265, 1.55] as unknown as Easing[], // Bounce effect
  smooth: [0.4, 0, 0.2, 1] as unknown as Easing[],   // Smooth cubic-bezier
  luxury: [0.25, 0.46, 0.45, 0.94] as unknown as Easing[], // Luxury easing
}

// Stagger timing for choreographed animations
export const STAGGER = {
  children: 0.1,    // Stagger between children
  items: 0.15,      // Stagger between list items
  sections: 0.3,   // Stagger between sections
  words: 0.05,     // Stagger between words
  letters: 0.03,   // Stagger between letters
  layers: 0.2,     // Stagger between layers
}

// Animation variants with perfect timing
export const ANIMATION_VARIANTS = {
  // Fade animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  
  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  
  // Slide animations
  slideUp: {
    hidden: { y: "100%" },
    visible: { y: 0 },
  },
  
  slideDown: {
    hidden: { y: "-100%" },
    visible: { y: 0 },
  },
  
  slideLeft: {
    hidden: { x: "100%" },
    visible: { x: 0 },
  },
  
  slideRight: {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  },
  
  // Complex animations
  heroReveal: {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  
  cardReveal: {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  
  textReveal: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}

// Animated wrapper with perfect timing
export const AnimatedWrapper = ({
  children,
  className,
  variant = "fadeInUp",
  delay = TIMING.none,
  duration = TIMING.normal,
  easing = TIMING.ease,
  trigger = true,
  stagger = 0
}: {
  children: React.ReactNode
  className?: string
  variant?: keyof typeof ANIMATION_VARIANTS
  delay?: number
  duration?: number
  easing?: Easing | Easing[]
  trigger?: boolean
  stagger?: number
}) => {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && trigger) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px"
      }
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [trigger])

  const motionVariants = React.useMemo(() => ({
    ...ANIMATION_VARIANTS[variant],
    visible: {
      ...ANIMATION_VARIANTS[variant].visible,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: easing,
        staggerChildren: stagger,
      }
    }
  }), [variant, duration, delay, easing, stagger, shouldReduceMotion])

  return (
    <motion.div
      ref={elementRef}
      className={cn("transform-gpu", className)}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={motionVariants}
    >
      {children}
    </motion.div>
  )
}

// Staggered list animation
export const StaggeredList = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  itemDelay?: number
  animation?: keyof typeof ANIMATION_VARIANTS
}>(({ children, className, staggerDelay = STAGGER.children, itemDelay = STAGGER.items, animation = "fadeInUp" }, ref) => {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : staggerDelay,
        staggerChildren: shouldReduceMotion ? 0 : itemDelay,
      }
    }
  }

  const itemVariants = {
    hidden: ANIMATION_VARIANTS[animation].hidden,
    visible: {
      ...ANIMATION_VARIANTS[animation].visible,
      transition: {
        duration: shouldReduceMotion ? 0 : TIMING.normal,
        ease: TIMING.ease,
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              {child}
            </motion.div>
          )
        }
        return child
      })}
    </motion.div>
  )
})

StaggeredList.displayName = "StaggeredList"

// Text animation with character-level control
export const AnimatedText = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  ease?: Easing | Easing[]
  once?: boolean
}>(({ children, className, delay = 0, stagger = 0.1, direction = "up", ease = "easeOut", once = true }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px"
      }
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [once])

  const getDirectionOffset = () => {
    switch (direction) {
      case "up": return { y: 30 }
      case "down": return { y: -30 }
      case "left": return { x: 30 }
      case "right": return { x: -30 }
      case "fade": return {}
      default: return { y: 30 }
    }
  }

  const splitWords = (text: string) => {
    const offset = getDirectionOffset()
    return text.split(' ').map((word, index) => (
      <motion.span
        key={`${word}-${index}`}
        initial={{ ...offset, opacity: 0 }}
        animate={isVisible ? { y: 0, x: 0, opacity: 1 } : offset}
        transition={{
          duration: 0.8,
          delay: delay + (index * stagger),
          ease: ease || "easeOut",
        }}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ))
  }

  const renderContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content === 'string') {
      return splitWords(content)
    }
    
    if (React.isValidElement(content)) {
      const element = content as React.ReactElement<Record<string, unknown>>
      if (typeof element.props.children === 'string') {
        return React.cloneElement(element, {}, splitWords(element.props.children))
      }
      
      return React.cloneElement(element, {
        ...element.props,
        children: React.Children.map(element.props.children, (child) => {
          if (typeof child === 'string') {
            return splitWords(child)
          }
          return child
        })
      })
    }
    
    return content
  }

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      initial="hidden"
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: ease || "easeOut",
      }}
    >
      {renderContent(children)}
    </motion.div>
  )
})

AnimatedText.displayName = "AnimatedText"

// Hover animation with perfect timing
export const HoverAnimation = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  scale?: number
  duration?: number
  disabled?: boolean
}>(({ children, className, scale = 1.05, duration = TIMING.fast, disabled = false }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn("transform-gpu", className)}
      whileHover={!disabled ? { 
        scale,
        transition: { duration, ease: TIMING.ease }
      } : {}}
      whileTap={!disabled ? { 
        scale: scale * 0.95,
        transition: { duration: TIMING.instant, ease: TIMING.ease }
      } : {}}
    >
      {children}
    </motion.div>
  )
})

HoverAnimation.displayName = "HoverAnimation"

// Scroll-linked animation with perfect timing
export const ScrollAnimation = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  scrollY?: number
}>(({ children, className, scrollY = 0 }, ref) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn("transform-gpu", className)}
      style={{
        y: shouldReduceMotion ? 0 : scrollY * 0.5,
        opacity: shouldReduceMotion ? 1 : 1 - Math.abs(scrollY) * 0.001,
      }}
    >
      {children}
    </motion.div>
  )
})

ScrollAnimation.displayName = "ScrollAnimation"

// Animation timing hook
export const useAnimationTiming = () => {
  const shouldReduceMotion = useReducedMotion()

  const getTiming = (type: keyof typeof TIMING) => {
    return shouldReduceMotion ? 0 : TIMING[type]
  }

  const getStagger = (type: keyof typeof STAGGER) => {
    return shouldReduceMotion ? 0 : STAGGER[type]
  }

  const getEasing = (type: keyof typeof TIMING) => {
    return TIMING[type] as Easing | Easing[]
  }

  return {
    getTiming,
    getStagger,
    getEasing,
    shouldReduceMotion,
  }
}
