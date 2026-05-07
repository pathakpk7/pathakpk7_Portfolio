"use client"

import * as React from "react"

interface ViewportSize {
  width: number
  height: number
}

interface ViewportDetection {
  size: ViewportSize
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
}

export function useViewportDetection(): ViewportDetection {
  const [size, setSize] = React.useState<ViewportSize>({
    width: 0,
    height: 0
  })

  React.useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = size.width < 768
  const isTablet = size.width >= 768 && size.width < 1024
  const isDesktop = size.width >= 1024 && size.width < 1280
  const isLargeDesktop = size.width >= 1280

  return {
    size,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop
  }
}
