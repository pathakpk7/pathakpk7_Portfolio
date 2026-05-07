"use client"

import * as React from "react"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "fade"
  delay?: number
  duration?: number
  ease?: string
  distance?: number
  opacity?: number
  scale?: number
  stagger?: number
  trigger?: string | HTMLElement
  start?: string
  end?: string
  scrub?: boolean
  pin?: boolean
  markers?: boolean
  once?: boolean
}

export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({
    children,
    className,
    direction = "up",
    delay = 0,
    duration = 1,
    ease = "power3.out",
    distance = 50,
    opacity = 0,
    scale = 1,
    stagger = 0,
    trigger,
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    pin = false,
    markers = false,
    once = true,
    ...props
  }, ref) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    // Merge refs
    React.useImperativeHandle(ref, () => elementRef.current!)

    useEffect(() => {
      const element = elementRef.current
      if (!element) return

      // Set initial state
      const initialState: gsap.TweenVars = {
        opacity: opacity,
        scale: scale,
      }

      // Add direction-based transforms
      switch (direction) {
        case "up":
          initialState.y = distance
          break
        case "down":
          initialState.y = -distance
          break
        case "left":
          initialState.x = distance
          break
        case "right":
          initialState.x = -distance
          break
        case "fade":
          // Only opacity, no transform
          break
      }

      // Set initial state immediately
      gsap.set(element, initialState)

      // Create animation
      const animation: gsap.TweenVars = {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: duration,
        ease: ease,
        delay: delay,
      }

      // Create ScrollTrigger
      const scrollTrigger = ScrollTrigger.create({
        trigger: trigger || element,
        start: start,
        end: end,
        scrub: scrub,
        pin: pin,
        markers: markers,
        once: once,
        onEnter: () => {
          if (!scrub) {
            gsap.to(element, animation)
          }
        },
        onLeave: () => {
          if (!once && !scrub) {
            gsap.to(element, initialState)
          }
        },
        onEnterBack: () => {
          if (!once && !scrub) {
            gsap.to(element, animation)
          }
        },
        onLeaveBack: () => {
          if (!once && !scrub) {
            gsap.to(element, initialState)
          }
        },
      })

      // Handle scrub animation
      if (scrub) {
        timelineRef.current = gsap.timeline({
          scrollTrigger: scrollTrigger,
        })

        timelineRef.current
          .fromTo(element, initialState, animation)
      }

      // Cleanup
      return () => {
        scrollTrigger.kill()
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
        gsap.killTweensOf(element)
      }
    }, [
      direction,
      delay,
      duration,
      ease,
      distance,
      opacity,
      scale,
      stagger,
      trigger,
      start,
      end,
      scrub,
      pin,
      markers,
      once,
    ])

    return (
      <div
        ref={elementRef}
        className={cn("scroll-reveal", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ScrollReveal.displayName = "ScrollReveal"

// Fade in component (simplified version)
export const FadeIn = React.forwardRef<HTMLDivElement, Omit<ScrollRevealProps, "direction">>(
  (props, ref) => {
    return <ScrollReveal ref={ref} direction="fade" {...props} />
  }
)

FadeIn.displayName = "FadeIn"

// Slide up component
export const SlideUp = React.forwardRef<HTMLDivElement, Omit<ScrollRevealProps, "direction">>(
  (props, ref) => {
    return <ScrollReveal ref={ref} direction="up" {...props} />
  }
)

SlideUp.displayName = "SlideUp"

// Slide down component
export const SlideDown = React.forwardRef<HTMLDivElement, Omit<ScrollRevealProps, "direction">>(
  (props, ref) => {
    return <ScrollReveal ref={ref} direction="down" {...props} />
  }
)

SlideDown.displayName = "SlideDown"

// Slide left component
export const SlideLeft = React.forwardRef<HTMLDivElement, Omit<ScrollRevealProps, "direction">>(
  (props, ref) => {
    return <ScrollReveal ref={ref} direction="left" {...props} />
  }
)

SlideLeft.displayName = "SlideLeft"

// Slide right component
export const SlideRight = React.forwardRef<HTMLDivElement, Omit<ScrollRevealProps, "direction">>(
  (props, ref) => {
    return <ScrollReveal ref={ref} direction="right" {...props} />
  }
)

SlideRight.displayName = "SlideRight"
