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

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  type?: "fade" | "slide" | "scale" | "rotate" | "wipe"
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  ease?: string
  stagger?: number
  trigger?: string | HTMLElement
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  pin?: boolean
  once?: boolean
}

export const SectionTransition = React.forwardRef<HTMLDivElement, SectionTransitionProps>(
  ({
    children,
    className,
    type = "fade",
    direction = "up",
    duration = 1,
    ease = "power3.out",
    stagger = 0.1,
    trigger,
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    markers = false,
    pin = false,
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

      // Get children for staggered animations
      const childrenElements = element.children

      // Set initial state based on transition type
      const setInitialState = (el: Element) => {
        const initialState: gsap.TweenVars = {}

        switch (type) {
          case "fade":
            initialState.opacity = 0
            break
          case "slide":
            initialState.opacity = 0
            switch (direction) {
              case "up":
                initialState.y = 100
                break
              case "down":
                initialState.y = -100
                break
              case "left":
                initialState.x = 100
                break
              case "right":
                initialState.x = -100
                break
            }
            break
          case "scale":
            initialState.opacity = 0
            initialState.scale = 0.8
            break
          case "rotate":
            initialState.opacity = 0
            initialState.rotation = direction === "up" || direction === "down" ? 15 : -15
            break
          case "wipe":
            initialState.clipPath = direction === "up" 
              ? "inset(100% 0 0 0)" 
              : direction === "down"
              ? "inset(0 0 100% 0)"
              : direction === "left"
              ? "inset(0 100% 0 0)"
              : "inset(0 0 0 100%)"
            break
        }

        gsap.set(el, initialState)
      }

      // Set animation state
      const setAnimationState = () => {
        const animationState: gsap.TweenVars = {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          clipPath: "inset(0 0 0 0)",
          duration: duration,
          ease: ease,
        }

        return animationState
      }

      // Set initial states
      Array.from(childrenElements).forEach(setInitialState)

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
            if (childrenElements.length > 1 && stagger > 0) {
              gsap.to(childrenElements, {
                ...setAnimationState(),
                stagger: stagger,
              })
            } else {
              gsap.to(childrenElements, setAnimationState())
            }
          }
        },
        onLeave: () => {
          if (!once && !scrub) {
            Array.from(childrenElements).forEach(setInitialState)
          }
        },
        onEnterBack: () => {
          if (!once && !scrub) {
            if (childrenElements.length > 1 && stagger > 0) {
              gsap.to(childrenElements, {
                ...setAnimationState(),
                stagger: stagger,
              })
            } else {
              gsap.to(childrenElements, setAnimationState())
            }
          }
        },
        onLeaveBack: () => {
          if (!once && !scrub) {
            Array.from(childrenElements).forEach(setInitialState)
          }
        },
      })

      // Handle scrub animation
      if (scrub) {
        timelineRef.current = gsap.timeline({
          scrollTrigger: scrollTrigger,
        })

        if (childrenElements.length > 1 && stagger > 0) {
          timelineRef.current
            .to(childrenElements, {
              ...setAnimationState(),
              stagger: stagger,
            })
        } else {
          timelineRef.current
            .to(childrenElements, setAnimationState())
        }
      }

      // Cleanup
      return () => {
        scrollTrigger.kill()
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
        gsap.killTweensOf(childrenElements)
      }
    }, [
      type,
      direction,
      duration,
      ease,
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
        className={cn("section-transition", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SectionTransition.displayName = "SectionTransition"

// Simplified transition components
export const FadeTransition = React.forwardRef<HTMLDivElement, Omit<SectionTransitionProps, "type">>(
  (props, ref) => {
    return <SectionTransition ref={ref} type="fade" {...props} />
  }
)

FadeTransition.displayName = "FadeTransition"

export const SlideTransition = React.forwardRef<HTMLDivElement, Omit<SectionTransitionProps, "type">>(
  (props, ref) => {
    return <SectionTransition ref={ref} type="slide" {...props} />
  }
)

SlideTransition.displayName = "SlideTransition"

export const ScaleTransition = React.forwardRef<HTMLDivElement, Omit<SectionTransitionProps, "type">>(
  (props, ref) => {
    return <SectionTransition ref={ref} type="scale" {...props} />
  }
)

ScaleTransition.displayName = "ScaleTransition"

export const RotateTransition = React.forwardRef<HTMLDivElement, Omit<SectionTransitionProps, "type">>(
  (props, ref) => {
    return <SectionTransition ref={ref} type="rotate" {...props} />
  }
)

RotateTransition.displayName = "RotateTransition"

export const WipeTransition = React.forwardRef<HTMLDivElement, Omit<SectionTransitionProps, "type">>(
  (props, ref) => {
    return <SectionTransition ref={ref} type="wipe" {...props} />
  }
)

WipeTransition.displayName = "WipeTransition"
