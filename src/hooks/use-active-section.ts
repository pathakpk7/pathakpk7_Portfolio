"use client"

import * as React from "react"
import { useSmoothScroll } from "@/providers/smooth-scroll-provider"

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = React.useState<string>("")
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const { progress: smoothScrollProgress } = useSmoothScroll()

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0
      }
    )

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) => observer.unobserve(element))
    }
  }, [sectionIds])

  // Update scroll progress from smooth scroll provider
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setScrollProgress(smoothScrollProgress)
    }, 0)
    
    return () => clearTimeout(timer)
  }, [smoothScrollProgress])

  return { activeSection, scrollProgress }
}

// Hook for smooth scrolling to sections
export function useSmoothScrollTo() {
  const { scrollTo } = useSmoothScroll()

  const scrollToSection = React.useCallback((sectionId: string, offset = 0) => {
    const element = document.getElementById(sectionId)
    if (element) {
      scrollTo(element, offset)
    }
  }, [scrollTo])

  return scrollToSection
}

// Hook for scroll-based animations
export function useScrollAnimation() {
  const { scrollY, direction, progress } = useSmoothScroll()

  return {
    scrollY,
    direction,
    progress,
    isScrollingUp: direction === "up",
    isScrollingDown: direction === "down",
    scrollPercentage: Math.round(progress * 100),
  }
}
