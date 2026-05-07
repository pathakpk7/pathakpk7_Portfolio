"use client"

import * as React from "react"

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = React.useState(false)
  const [isTablet, setIsTablet] = React.useState(false)
  const [isDesktop, setIsDesktop] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const [performanceMode, setPerformanceMode] = React.useState<"high" | "medium" | "low">("high")

  React.useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsDesktop(width >= 1024)
    }

    const checkPerformance = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      setReducedMotion(prefersReducedMotion)

      // Determine performance mode based on device capabilities
      const connection = (navigator as unknown as { connection?: { effectiveType: string } }).connection
      const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      
      if (isMobile || isSlowConnection || isLowEndDevice || prefersReducedMotion) {
        setPerformanceMode("low")
      } else if (isTablet) {
        setPerformanceMode("medium")
      } else {
        setPerformanceMode("high")
      }
    }

    checkDevice()
    checkPerformance()

    // Listen for resize events
    window.addEventListener("resize", checkDevice)
    
    // Listen for connection changes
    const navConnection = (navigator as unknown as { connection?: { addEventListener?: (event: string, fn: () => void) => void; removeEventListener?: (event: string, fn: () => void) => void } }).connection
    if (navConnection?.addEventListener) {
      navConnection.addEventListener('change', checkPerformance)
    }

    return () => {
      window.removeEventListener("resize", checkDevice)
      if (navConnection?.removeEventListener) {
        navConnection.removeEventListener('change', checkPerformance)
      }
    }
  }, [isMobile, isTablet])

  return {
    isMobile,
    isTablet,
    isDesktop,
    reducedMotion,
    performanceMode,
    shouldOptimize: isMobile || reducedMotion || performanceMode === "low",
    animationDuration: performanceMode === "low" ? 0.3 : performanceMode === "medium" ? 0.6 : 1,
    parallaxSpeed: performanceMode === "low" ? 0.1 : performanceMode === "medium" ? 0.3 : 0.5,
    particleCount: performanceMode === "low" ? 50 : performanceMode === "medium" ? 100 : 150,
  }
}

// Hook for optimized animation settings
export function useOptimizedAnimation() {
  const { isMobile, reducedMotion, performanceMode, shouldOptimize } = useMobileOptimization()

  const getAnimationSettings = React.useCallback((baseSettings: {
    duration?: number
    delay?: number
    ease?: string
    stagger?: number
  }) => {
    const multiplier = performanceMode === "low" ? 0.3 : performanceMode === "medium" ? 0.6 : 1
    
    return {
      duration: (baseSettings.duration || 1) * multiplier,
      delay: (baseSettings.delay || 0) * multiplier,
      ease: baseSettings.ease || "power3.out",
      stagger: shouldOptimize ? 0 : (baseSettings.stagger || 0.1) * multiplier,
    }
  }, [performanceMode, shouldOptimize])

  const shouldDisableAnimation = React.useCallback(() => {
    return reducedMotion || performanceMode === "low"
  }, [reducedMotion, performanceMode])

  return {
    isMobile,
    reducedMotion,
    performanceMode,
    shouldOptimize,
    getAnimationSettings,
    shouldDisableAnimation,
  }
}

// Hook for scroll-based performance optimization
export function useScrollOptimization() {
  const { isMobile, performanceMode } = useMobileOptimization()
  const [scrollY, setScrollY] = React.useState(0)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolling(true)
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    // Use passive listeners for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  const shouldUpdateParallax = React.useCallback(() => {
    if (performanceMode === "low") return false
    if (isMobile && performanceMode === "medium") return Math.random() > 0.5
    return true
  }, [isMobile, performanceMode])

  return {
    scrollY,
    isScrolling,
    shouldUpdateParallax,
    throttleMs: performanceMode === "low" ? 100 : performanceMode === "medium" ? 50 : 16,
  }
}
