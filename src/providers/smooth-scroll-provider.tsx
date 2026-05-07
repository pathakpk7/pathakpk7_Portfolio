"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"

interface SmoothScrollContextType {
  scrollTo: (element: string | HTMLElement, offset?: number) => void
  scrollY: number
  isScrolling: boolean
  lenis: LenisInstance | null
  progress: number
  direction: "up" | "down"
}

// Type definition for Lenis
interface LenisInstance {
  scrollTo: (value: number) => void
  on: (event: string, callback: (data: LenisScrollData) => void) => void
  raf: (time: number) => void
  destroy: () => void
}

interface LenisScrollData {
  scroll: number
  limit: number
  progress: number
  direction: "up" | "down"
}

interface LenisOptions {
  duration: number
  easing: (t: number) => number
  direction: "vertical"
  gestureDirection: "vertical"
  smooth: boolean
  mouseMultiplier: number
  smoothTouch: boolean
  touchMultiplier: number
  infinite: boolean
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined)

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)
  if (!context) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider")
  }
  return context
}

interface SmoothScrollProviderProps {
  children: React.ReactNode
  duration?: number
  easing?: (t: number) => number
  smooth?: boolean
}

export function SmoothScrollProvider({ 
  children, 
  duration = 1.2,
  easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth = true 
}: SmoothScrollProviderProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [progress, setProgress] = useState(0)
  const [direction, setDirection] = useState<"up" | "down">("down")
  const [lenisInstance, setLenisInstance] = useState<LenisInstance | null>(null)
  const lenisRef = useRef<LenisInstance | null>(null)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (!smooth) return

    const initLenis = async () => {
      try {
        // Dynamically import Lenis to avoid SSR issues
        const Lenis = (await import("lenis")).default
        
        const lenis = new Lenis({
          duration: duration,
          easing: easing,
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: true,
          touchMultiplier: 2,
          infinite: false,
        } as LenisOptions)

        const raf = (time: number) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)

        // Update scroll state
        lenis.on("scroll", ({ scroll, progress, direction }: LenisScrollData) => {
          setScrollY(scroll)
          setProgress(progress)
          setDirection(direction)
          setIsScrolling(true)
          
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current)
          }
          
          scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false)
          }, 150)
        })

        lenisRef.current = lenis
        setLenisInstance(lenis)
      } catch {
        console.warn("Lenis not available, falling back to native scroll")
      }
    }

    initLenis()

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [duration, easing, smooth])

  // Fallback scroll listener for non-smooth mode
  useEffect(() => {
    if (smooth) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setDirection(currentScrollY > lastScrollY.current ? "down" : "up")
      setIsScrolling(true)
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 100)
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [smooth])

  // Update progress for non-smooth mode
  useEffect(() => {
    if (smooth) return

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = window.scrollY / scrollHeight
      setProgress(currentProgress)
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()
    
    return () => window.removeEventListener("scroll", updateProgress)
  }, [smooth])

  const scrollTo = (element: string | HTMLElement, offset = 0) => {
    const target = typeof element === "string" 
      ? document.querySelector(element) 
      : element
    
    if (!target) return

    const targetY = target.getBoundingClientRect().top + window.scrollY + offset

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY)
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      })
    }
  }

  const value: SmoothScrollContextType = {
    scrollTo,
    scrollY,
    isScrolling,
    lenis: lenisInstance,
    progress,
    direction
  }

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
