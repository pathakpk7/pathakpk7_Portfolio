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

interface ParallaxLayerProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  trigger?: string | HTMLElement
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  pin?: boolean
  ease?: string
  scale?: number
  rotation?: number
  opacity?: number
}

export const ParallaxLayer = React.forwardRef<HTMLDivElement, ParallaxLayerProps>(
  ({
    children,
    className,
    speed = 0.5,
    direction = "up",
    trigger,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    markers = false,
    pin = false,
    ease = "none",
    scale = 1,
    rotation = 0,
    opacity = 1,
    ...props
  }, ref) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    // Merge refs
    React.useImperativeHandle(ref, () => elementRef.current!)

    useEffect(() => {
      const element = elementRef.current
      if (!element) return

      // Calculate parallax movement based on direction
      let x = 0
      let y = 0
      const rotationValue = rotation

      switch (direction) {
        case "up":
          y = -100 * speed
          break
        case "down":
          y = 100 * speed
          break
        case "left":
          x = -100 * speed
          break
        case "right":
          x = 100 * speed
          break
      }

      // Create parallax timeline
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger || element,
          start: start,
          end: end,
          scrub: scrub,
          pin: pin,
          markers: markers,
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: ease,
        },
      })

      // Add parallax animation
      if (x !== 0 || y !== 0) {
        timeline.fromTo(
          element,
          {
            x: -x,
            y: -y,
            scale: scale,
            rotation: -rotationValue,
            opacity: opacity,
          },
          {
            x: x,
            y: y,
            scale: scale,
            rotation: rotationValue,
            opacity: opacity,
          }
        )
      } else {
        // Only scale/rotation/opacity animation
        timeline.fromTo(
          element,
          {
            scale: scale,
            rotation: -rotationValue,
            opacity: opacity,
          },
          {
            scale: scale,
            rotation: rotationValue,
            opacity: opacity,
          }
        )
      }

      timelineRef.current = timeline

      // Cleanup
      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === element || st.trigger === trigger) {
            st.kill()
          }
        })
      }
    }, [
      speed,
      direction,
      trigger,
      start,
      end,
      scrub,
      markers,
      pin,
      ease,
      scale,
      rotation,
      opacity,
    ])

    return (
      <div
        ref={elementRef}
        className={cn("parallax-layer", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ParallaxLayer.displayName = "ParallaxLayer"

// Simplified parallax components for common use cases
export const ParallaxUp = React.forwardRef<HTMLDivElement, Omit<ParallaxLayerProps, "direction">>(
  (props, ref) => {
    return <ParallaxLayer ref={ref} direction="up" {...props} />
  }
)

ParallaxUp.displayName = "ParallaxUp"

export const ParallaxDown = React.forwardRef<HTMLDivElement, Omit<ParallaxLayerProps, "direction">>(
  (props, ref) => {
    return <ParallaxLayer ref={ref} direction="down" {...props} />
  }
)

ParallaxDown.displayName = "ParallaxDown"

export const ParallaxLeft = React.forwardRef<HTMLDivElement, Omit<ParallaxLayerProps, "direction">>(
  (props, ref) => {
    return <ParallaxLayer ref={ref} direction="left" {...props} />
  }
)

ParallaxLeft.displayName = "ParallaxLeft"

export const ParallaxRight = React.forwardRef<HTMLDivElement, Omit<ParallaxLayerProps, "direction">>(
  (props, ref) => {
    return <ParallaxLayer ref={ref} direction="right" {...props} />
  }
)

ParallaxRight.displayName = "ParallaxRight"

// Hero parallax component with special settings for hero sections
export const HeroParallax = React.forwardRef<HTMLDivElement, Omit<ParallaxLayerProps, "start" | "end">>(
  ({ speed = 0.3, ...props }, ref) => {
    return (
      <ParallaxLayer
        ref={ref}
        speed={speed}
        start="top top"
        end="bottom top"
        scrub={1.5}
        {...props}
      />
    )
  }
)

HeroParallax.displayName = "HeroParallax"
