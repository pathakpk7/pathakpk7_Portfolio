"use client"

import * as React from "react"
import { motion, useReducedMotion, useAnimation } from "framer-motion"
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
  cinematic: 0.6,
  
  // Easing functions for premium feel
  ease: [0.25, 0.1, 0.25, 1], // Material Design ease
  easeIn: [0.42, 0, 1, 1],   // Ease in
  easeOut: [0, 0, 0.58, 1],  // Ease out
  easeInOut: [0.42, 0, 0.58, 1], // Ease in-out
  bounce: [0.68, -0.55, 0.265, 1.55], // Bounce effect
  smooth: [0.4, 0, 0.2, 1],   // Smooth cubic-bezier
  luxury: [0.25, 0.46, 0.45, 0.94], // Luxury easing
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
export const AnimatedWrapper = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  variant?: keyof typeof ANIMATION_VARIANTS
  delay?: number
  duration?: number
  easing?: number[]
  trigger?: boolean
  stagger?: number
}>(({ 
  children, 
  className, 
  variant = "fadeInUp", 
  delay = TIMING.none, 
  duration = TIMING.normal,
  easing = TIMING.ease,
  trigger = true,
  stagger = 0
}, ref) => {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && trigger) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
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
})

AnimatedWrapper.displayName = "AnimatedWrapper"

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

// Hero section animation with cinematic timing
export const HeroAnimation = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
}>(({ children, className }, ref) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn("transform-gpu", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: shouldReduceMotion ? 0 : TIMING.cinematic,
            ease: TIMING.luxury,
            delay: shouldReduceMotion ? 0 : TIMING.short,
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
})

HeroAnimation.displayName = "HeroAnimation"

// Card reveal animation with perfect timing
export const CardReveal = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  delay?: number
  index?: number
}>(({ children, className, delay = TIMING.none, index = 0 }, ref) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn("transform-gpu", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: shouldReduceMotion ? 0 : TIMING.slow,
            ease: TIMING.luxury,
            delay: shouldReduceMotion ? 0 : delay + (index * STAGGER.items),
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
})

CardReveal.displayName = "CardReveal"

// Text animation with character-level control
export const AnimatedText = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
}>(({ children, className, delay = TIMING.none, stagger = STAGGER.letters }, ref) => {
  const shouldReduceMotion = useReducedMotion()

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : TIMING.normal,
          ease: TIMING.ease,
          delay: shouldReduceMotion ? 0 : delay + (index * stagger),
        }}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))
  }

  const renderContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content === 'string') {
      return splitText(content)
    }
    
    if (React.isValidElement(content)) {
      const element = content as React.ReactElement
      if (typeof element.props.children === 'string') {
        return React.cloneElement(element, {}, splitText(element.props.children))
      }
      
      return React.cloneElement(element, {
        ...element.props,
        children: React.Children.map(element.props.children, (child) => {
          if (typeof child === 'string') {
            return splitText(child)
          }
          return child
        })
      })
    }
    
    return content
  }

  return (
    <div ref={ref} className={cn("transform-gpu", className)}>
      {renderContent(children)}
    </div>
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
    return TIMING[type] as number[]
  }

  return {
    getTiming,
    getStagger,
    getEasing,
    shouldReduceMotion,
  }
}
