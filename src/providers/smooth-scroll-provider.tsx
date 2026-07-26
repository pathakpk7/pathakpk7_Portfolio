"use client"

import * as React from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

interface LenisScrollData {
  scroll: number
  limit: number
  progress: number
  direction: number
}

interface LenisInstance {
  scrollTo: (
    value: number,
    options?: {
      offset?: number
    }
  ) => void
  on: (
    event: "scroll",
    callback: (data: LenisScrollData) => void
  ) => void
  raf: (time: number) => void
  destroy: () => void
}

interface SmoothScrollContextType {
  scrollTo: (
    element: string | HTMLElement,
    offset?: number
  ) => void
  scrollY: number
  isScrolling: boolean
  lenis: LenisInstance | null
  progress: number
  direction: "up" | "down"
}

interface SmoothScrollProviderProps {
  children: React.ReactNode
  duration?: number
  smooth?: boolean
}

const SmoothScrollContext =
  createContext<SmoothScrollContextType | undefined>(undefined)

const DEFAULT_EASING = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)

  if (!context) {
    throw new Error(
      "useSmoothScroll must be used within SmoothScrollProvider"
    )
  }

  return context
}

export function SmoothScrollProvider({
  children,
  duration = 1.2,
  smooth = true,
}: SmoothScrollProviderProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [progress, setProgress] = useState(0)
  const [direction, setDirection] =
    useState<"up" | "down">("down")
  const [lenisInstance, setLenisInstance] =
    useState<LenisInstance | null>(null)

  const lenisRef = useRef<LenisInstance | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const scrollTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!smooth) return

    let mounted = true

    const initializeLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default

        if (!mounted) return

        const lenis = new Lenis({
          duration,
          easing: DEFAULT_EASING,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        })

        lenisRef.current = lenis
        setLenisInstance(lenis as unknown as LenisInstance)

        const raf = (time: number) => {
          if (!mounted) return

          lenis.raf(time)
          rafIdRef.current = requestAnimationFrame(raf)
        }

        rafIdRef.current = requestAnimationFrame(raf)

        lenis.on("scroll", (event) => {
          if (!mounted) return

          setScrollY(event.scroll)
          setProgress(event.progress)

          setDirection(
            event.direction < 0 ? "up" : "down"
          )

          setIsScrolling(true)

          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
          }

          scrollTimeoutRef.current = setTimeout(() => {
            if (mounted) {
              setIsScrolling(false)
            }
          }, 150)
        })
      } catch (error) {
        console.warn(
          "Lenis initialization failed. Using native scrolling.",
          error
        )
      }
    }

    initializeLenis()

    return () => {
      mounted = false

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = null
      }

      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }

      setLenisInstance(null)
    }
  }, [duration, smooth])

  useEffect(() => {
    if (smooth) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      ticking = true

      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const maxScroll =
          document.documentElement.scrollHeight -
          window.innerHeight

        setDirection(
          currentY >= scrollY ? "down" : "up"
        )

        setScrollY(currentY)

        setProgress(
          maxScroll > 0
            ? Math.min(1, Math.max(0, currentY / maxScroll))
            : 0
        )

        setIsScrolling(true)

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 150)

        ticking = false
      })
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [smooth, scrollY])

  const scrollTo = useCallback(
    (element: string | HTMLElement, offset = 0) => {
      const target =
        typeof element === "string"
          ? document.querySelector<HTMLElement>(element)
          : element

      if (!target) return

      if (lenisRef.current) {
        const targetY =
          target.getBoundingClientRect().top +
          window.scrollY +
          offset

        lenisRef.current.scrollTo(targetY)
        return
      }

      const targetY =
        target.getBoundingClientRect().top +
        window.scrollY +
        offset

      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      })
    },
    []
  )

  const value = useMemo<SmoothScrollContextType>(
    () => ({
      scrollTo,
      scrollY,
      isScrolling,
      lenis: lenisInstance,
      progress,
      direction,
    }),
    [
      scrollTo,
      scrollY,
      isScrolling,
      lenisInstance,
      progress,
      direction,
    ]
  )

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  )
}