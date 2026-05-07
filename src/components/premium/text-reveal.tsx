"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  ease?: string
  once?: boolean
}

export const TextReveal = React.forwardRef<HTMLDivElement, TextRevealProps>(
  ({ children, className, delay = 0, duration = 0.8, stagger = 0.1, direction = "up", ease = "easeOut", once = true }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const elementRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
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

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }, [once])

    const getInitialTransform = () => {
      switch (direction) {
        case "up":
          return { y: 50, opacity: 0 }
        case "down":
          return { y: -50, opacity: 0 }
        case "left":
          return { x: 50, opacity: 0 }
        case "right":
          return { x: -50, opacity: 0 }
        case "fade":
          return { opacity: 0 }
        default:
          return { y: 50, opacity: 0 }
      }
    }

    const getFinalTransform = () => {
      switch (direction) {
        case "up":
          return { y: 0, opacity: 1 }
        case "down":
          return { y: 0, opacity: 1 }
        case "left":
          return { x: 0, opacity: 1 }
        case "right":
          return { x: 0, opacity: 1 }
        case "fade":
          return { opacity: 1 }
        default:
          return { y: 0, opacity: 1 }
      }
    }

    const splitText = (text: string) => {
      return text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={getInitialTransform()}
          animate={isVisible ? getFinalTransform() : getInitialTransform()}
          transition={{
            duration: duration,
            delay: delay + (index * stagger),
            ease: ease,
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
          children: React.Children.map(element.props.children, (child, index) => {
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
      <div
        ref={elementRef}
        className={cn("overflow-hidden", className)}
      >
        {renderContent(children)}
      </div>
    )
  }
)

TextReveal.displayName = "TextReveal"

// Premium heading reveal component
export const HeadingReveal = React.forwardRef<HTMLHeadingElement, Omit<TextRevealProps, 'ref' | 'as'> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  level?: 1 | 2 | 3 | 4 | 5 | 6
}>(({ as = 'h2', level = 2, className, children, ...props }, ref) => {
  const Tag = as
  
  return (
    <Tag ref={ref} className={cn(className)}>
      <TextReveal {...props}>
        {children}
      </TextReveal>
    </Tag>
  )
})

HeadingReveal.displayName = "HeadingReveal"

// Premium paragraph reveal component
export const ParagraphReveal = React.forwardRef<HTMLParagraphElement, Omit<TextRevealProps, 'ref' | 'as'>>(
  ({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cn(className)}>
      <TextReveal {...props}>
        {children}
      </TextReveal>
    </p>
  )
})

ParagraphReveal.displayName = "ParagraphReveal"

// Premium word reveal component (for longer text)
export const WordReveal = React.forwardRef<HTMLDivElement, TextRevealProps>(
  ({ children, className, stagger = 0.2, ...props }, ref) => {
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
    }, [])

    const splitWords = (text: string) => {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: props.delay! + (index * stagger),
            ease: props.ease || "easeOut",
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
      return content
    }

    return (
      <div
        ref={elementRef}
        className={cn("overflow-hidden", className)}
      >
        {renderContent(children)}
      </div>
    )
  }
)

WordReveal.displayName = "WordReveal"
