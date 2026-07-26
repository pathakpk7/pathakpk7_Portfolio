"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useSpring } from "framer-motion"
import { Download, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { NAVIGATION, SITE_CONFIG } from "@/constants"

/* =========================================================
   TYPES
   ========================================================= */

interface NavbarProps {
  className?: string
  activeSection?: string
}

/* =========================================================
   CURSOR FOLLOWING EYES
   ========================================================= */

function CursorEyes() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const leftX = useSpring(0, {
    stiffness: 180,
    damping: 18,
    mass: 0.35,
  })

  const leftY = useSpring(0, {
    stiffness: 180,
    damping: 18,
    mass: 0.35,
  })

  const rightX = useSpring(0, {
    stiffness: 180,
    damping: 18,
    mass: 0.35,
  })

  const rightY = useSpring(0, {
    stiffness: 180,
    damping: 18,
    mass: 0.35,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!wrapperRef.current) return

      const eyes =
        wrapperRef.current.querySelectorAll<HTMLElement>(
          "[data-eye]"
        )

      eyes.forEach((eye, index) => {
        const rect = eye.getBoundingClientRect()

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = event.clientX - centerX
        const deltaY = event.clientY - centerY

        const angle = Math.atan2(deltaY, deltaX)

        /*
         * Maximum pupil travel.
         * Small enough that the pupil always stays inside.
         */
        const maxDistance = 4.5

        const x = Math.cos(angle) * maxDistance
        const y = Math.sin(angle) * maxDistance

        if (index === 0) {
          leftX.set(x)
          leftY.set(y)
        } else {
          rightX.set(x)
          rightY.set(y)
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [leftX, leftY, rightX, rightY])

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="hidden items-center gap-[7px] lg:flex"
      aria-hidden="true"
    >
      {/* LEFT EYE */}

      <motion.div
        data-eye
        whileHover={{ scale: 1.08 }}
        className={cn(
          "relative",
          "h-[21px] w-[21px]",
          "overflow-hidden",
          "rounded-full",
          "border border-white/25",
          "bg-white/[0.92]",
          "shadow-[0_0_14px_rgba(103,232,249,0.08)]"
        )}
      >
        <motion.span
          style={{
            x: leftX,
            y: leftY,
          }}
          className={cn(
            "absolute",
            "left-1/2 top-1/2",
            "h-[8px] w-[8px]",
            "-ml-[4px] -mt-[4px]",
            "rounded-full",
            "bg-[#060a12]",
            "shadow-[0_0_4px_rgba(0,0,0,0.45)]"
          )}
        >
          <span
            className={cn(
              "absolute",
              "left-[2px] top-[1px]",
              "h-[2px] w-[2px]",
              "rounded-full",
              "bg-white"
            )}
          />
        </motion.span>
      </motion.div>

      {/* RIGHT EYE */}

      <motion.div
        data-eye
        whileHover={{ scale: 1.08 }}
        className={cn(
          "relative",
          "h-[21px] w-[21px]",
          "overflow-hidden",
          "rounded-full",
          "border border-white/25",
          "bg-white/[0.92]",
          "shadow-[0_0_14px_rgba(167,139,250,0.08)]"
        )}
      >
        <motion.span
          style={{
            x: rightX,
            y: rightY,
          }}
          className={cn(
            "absolute",
            "left-1/2 top-1/2",
            "h-[8px] w-[8px]",
            "-ml-[4px] -mt-[4px]",
            "rounded-full",
            "bg-[#060a12]",
            "shadow-[0_0_4px_rgba(0,0,0,0.45)]"
          )}
        >
          <span
            className={cn(
              "absolute",
              "left-[2px] top-[1px]",
              "h-[2px] w-[2px]",
              "rounded-full",
              "bg-white"
            )}
          />
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

/* =========================================================
   NAVBAR
   ========================================================= */

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, activeSection }, ref) => {
    const [scrolled, setScrolled] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    /*
     * Local active state means clicking a link immediately
     * changes the visual state.
     *
     * If your parent provides activeSection through a
     * scroll observer, that value still takes priority.
     */
    const [clickedSection, setClickedSection] = useState("")

    const currentSection = activeSection || clickedSection

    /* =====================================================
       SCROLL
       ===================================================== */

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY

        const documentHeight =
          document.documentElement.scrollHeight -
          window.innerHeight

        const progress =
          documentHeight > 0
            ? (scrollY / documentHeight) * 100
            : 0

        setScrollProgress(
          Math.min(100, Math.max(0, progress))
        )

        setScrolled(scrollY > 30)
      }

      handleScroll()

      window.addEventListener("scroll", handleScroll, {
        passive: true,
      })

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }, [])

    /* =====================================================
       MOBILE BODY LOCK
       ===================================================== */

    useEffect(() => {
      if (!mobileMenuOpen) return

      const previousOverflow =
        document.body.style.overflow

      document.body.style.overflow = "hidden"

      return () => {
        document.body.style.overflow = previousOverflow
      }
    }, [mobileMenuOpen])

    /* =====================================================
       ESCAPE
       ===================================================== */

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setMobileMenuOpen(false)
        }
      }

      window.addEventListener("keydown", handleEscape)

      return () => {
        window.removeEventListener("keydown", handleEscape)
      }
    }, [])

    /* =====================================================
       DESKTOP RESIZE
       ===================================================== */

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setMobileMenuOpen(false)
        }
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [])

    /* =====================================================
       SECTION NAVIGATION
       ===================================================== */

    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId)

      if (!element) {
        console.warn(`Section #${sectionId} was not found.`)
        return
      }

      setClickedSection(sectionId)

      const navbarOffset = 110

      const elementPosition =
        element.getBoundingClientRect().top +
        window.scrollY

      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: "smooth",
      })

      setMobileMenuOpen(false)
    }

    const scrollToTop = () => {
      setClickedSection("")

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

      setMobileMenuOpen(false)
    }

    return (
      <>
        {/* =================================================
            TOP PROGRESS
            ================================================= */}

        <div
          aria-hidden="true"
          className={cn(
            "fixed left-0 right-0 top-0",
            "z-[100]",
            "h-[2px]"
          )}
        >
          <motion.div
            className={cn(
              "h-full",
              "bg-linear-to-r",
              "from-cyan-400",
              "via-violet-500",
              "to-cyan-400",
              "shadow-[0_0_10px_rgba(103,232,249,0.35)]"
            )}
            animate={{
              width: `${scrollProgress}%`,
            }}
            transition={{
              duration: 0.1,
            }}
          />
        </div>

        {/* =================================================
            NAVBAR WRAPPER
            ================================================= */}

        <motion.nav
          ref={ref}
          initial={{
            opacity: 0,
            y: -30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={cn(
            "fixed",
            "left-0 right-0 top-0",
            "z-[90]",
            "pointer-events-none",
            className
          )}
        >
          {/* =================================================
              FLOATING CAPSULE
              ================================================= */}

          <motion.div
            animate={{
              marginTop: scrolled ? 10 : 14,
              maxWidth: scrolled ? 1370 : 1480,
            }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(
              "pointer-events-auto",
              "relative",
              "mx-auto",
              "w-[calc(100%-24px)]",
              "sm:w-[calc(100%-40px)]",
              "lg:w-[calc(100%-64px)]"
            )}
          >
            {/* OUTER GLOW */}

            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none",
                "absolute -inset-[1px]",
                "rounded-[32px]",
                "bg-linear-to-r",
                "from-cyan-400/[0.10]",
                "via-transparent",
                "to-violet-500/[0.10]",
                "blur-[12px]",
                "transition-opacity duration-500",
                scrolled ? "opacity-80" : "opacity-50"
              )}
            />

            {/* CAPSULE */}

            <div
              className={cn(
                "relative",
                "overflow-hidden",
                "rounded-[30px]",
                "border",
                "border-white/[0.09]",
                "bg-[#070c15]/80",
                "shadow-[0_15px_50px_rgba(0,0,0,0.30)]",
                "backdrop-blur-2xl",
                "transition-all duration-500",

                scrolled &&
                  "border-white/[0.12] bg-[#070c15]/88 shadow-[0_18px_55px_rgba(0,0,0,0.38)]"
              )}
            >
              {/* TOP LIGHT */}

              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none",
                  "absolute left-[8%] right-[8%] top-0",
                  "h-px",
                  "bg-linear-to-r",
                  "from-transparent",
                  "via-white/20",
                  "to-transparent"
                )}
              />

              {/* SUBTLE CYAN LIGHT */}

              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none",
                  "absolute -left-20 top-1/2",
                  "h-28 w-56",
                  "-translate-y-1/2",
                  "rounded-full",
                  "bg-cyan-400/[0.04]",
                  "blur-[50px]"
                )}
              />

              {/* SUBTLE VIOLET LIGHT */}

              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none",
                  "absolute -right-20 top-1/2",
                  "h-28 w-56",
                  "-translate-y-1/2",
                  "rounded-full",
                  "bg-violet-500/[0.05]",
                  "blur-[50px]"
                )}
              />

              <motion.div
                animate={{
                  height: scrolled ? 64 : 72,
                }}
                transition={{
                  duration: 0.4,
                }}
                className={cn(
                  "relative z-10",
                  "grid",
                  "grid-cols-[1fr_auto]",
                  "items-center",
                  "px-5",
                  "sm:px-7",
                  "lg:grid-cols-[1fr_auto_1fr]",
                  "lg:px-8"
                )}
              >
                {/* =========================================
                    NAME — NO PP
                    ========================================= */}

                <motion.button
                  type="button"
                  onClick={scrollToTop}
                  whileHover={{
                    x: 2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  aria-label="Back to top"
                  className={cn(
                    "group/name",
                    "justify-self-start",
                    "text-left"
                  )}
                >
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-[14px]",
                        "font-black",
                        "leading-none",
                        "tracking-[0.12em]",
                        "text-foreground",
                        "sm:text-[15px]"
                      )}
                    >
                      PRASOON
                    </span>

                    <span
                      className={cn(
                        "mt-[5px]",
                        "text-[8px]",
                        "font-medium",
                        "leading-none",
                        "tracking-[0.36em]",
                        "text-muted-foreground",
                        "transition-colors duration-300",
                        "group-hover/name:text-cyan-300/80",
                        "sm:text-[9px]"
                      )}
                    >
                      PATHAK
                    </span>
                  </div>
                </motion.button>

                {/* =========================================
                    EYES
                    ========================================= */}

                <div className="hidden justify-self-center lg:block">
                  <CursorEyes />
                </div>

                {/* =========================================
                    DESKTOP NAV
                    ========================================= */}

                <div
                  className={cn(
                    "hidden",
                    "items-center",
                    "justify-self-end",
                    "gap-0.5",
                    "lg:flex"
                  )}
                >
                  {Object.entries(NAVIGATION).map(
                    ([key, label], index) => {
                      /*
                       * Resume gets its own CTA below.
                       */
                      if (key === "resume") return null

                      const isActive =
                        currentSection === key

                      return (
                        <motion.button
                          key={key}
                          type="button"
                          initial={{
                            opacity: 0,
                            y: -8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.12 + index * 0.045,
                          }}
                          onClick={() =>
                            scrollToSection(key)
                          }
                          whileTap={{
                            scale: 0.95,
                          }}
                          className={cn(
                            "group/nav",
                            "relative",
                            "isolate",
                            "flex",
                            "h-10",
                            "items-center",
                            "justify-center",
                            "overflow-hidden",
                            "rounded-full",
                            "px-3.5",
                            "text-[12px]",
                            "font-medium",
                            "tracking-[0.015em]",
                            "transition-colors",
                            "duration-300",

                            isActive
                              ? "text-cyan-100"
                              : [
                                  "text-foreground/65",
                                  "hover:text-cyan-100",
                                ]
                          )}
                        >
                          {/* ACTIVE PILL */}

                          {isActive && (
                            <motion.span
                              layoutId="navbar-active-pill"
                              className={cn(
                                "absolute inset-0",
                                "-z-10",
                                "rounded-full",
                                "border",
                                "border-cyan-400/20",
                                "bg-white/[0.055]",
                                "shadow-[inset_0_0_20px_rgba(103,232,249,0.04),0_0_18px_rgba(103,232,249,0.07)]"
                              )}
                              transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 30,
                              }}
                            />
                          )}

                          {/* HOVER GLOW */}

                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute",
                              "left-1/2 top-1/2",
                              "-z-10",
                              "h-8 w-[80%]",
                              "-translate-x-1/2",
                              "-translate-y-1/2",
                              "rounded-full",
                              "bg-cyan-400/0",
                              "blur-xl",
                              "transition-all",
                              "duration-300",
                              "group-hover/nav:bg-cyan-400/[0.10]"
                            )}
                          />

                          <span className="relative z-10">
                            {label}
                          </span>

                          {/* ACTIVE UNDERLINE */}

                          {isActive && (
                            <motion.span
                              layoutId="navbar-active-underline"
                              className={cn(
                                "absolute",
                                "bottom-[4px]",
                                "left-[28%] right-[28%]",
                                "h-[1.5px]",
                                "rounded-full",
                                "bg-linear-to-r",
                                "from-cyan-400",
                                "to-violet-400",
                                "shadow-[0_0_8px_rgba(103,232,249,0.8)]"
                              )}
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}

                          {/* HOVER UNDERLINE */}

                          {!isActive && (
                            <span
                              className={cn(
                                "absolute",
                                "bottom-[4px]",
                                "left-1/2",
                                "h-[1px] w-0",
                                "-translate-x-1/2",
                                "rounded-full",
                                "bg-cyan-300",
                                "shadow-[0_0_8px_rgba(103,232,249,0.6)]",
                                "transition-all duration-300",
                                "group-hover/nav:w-[38%]"
                              )}
                            />
                          )}
                        </motion.button>
                      )
                    }
                  )}

                  {/* =======================================
                      RESUME
                      ======================================= */}

                  <motion.a
                    href={SITE_CONFIG.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -1,
                      scale: 1.025,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className={cn(
                      "group/resume",
                      "relative",
                      "ml-2",
                      "flex",
                      "h-10",
                      "items-center",
                      "gap-2",
                      "overflow-hidden",
                      "rounded-full",
                      "border",
                      "border-violet-400/25",
                      "bg-violet-400/[0.07]",
                      "px-4",
                      "text-[12px]",
                      "font-semibold",
                      "text-foreground/90",
                      "shadow-[inset_0_0_16px_rgba(167,139,250,0.03)]",
                      "transition-all duration-300",
                      "hover:border-cyan-300/35",
                      "hover:bg-cyan-400/[0.08]",
                      "hover:text-cyan-100",
                      "hover:shadow-[0_0_22px_rgba(103,232,249,0.09)]"
                    )}
                  >
                    {/* SHIMMER */}

                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute",
                        "-left-10 top-0",
                        "h-full w-8",
                        "rotate-12",
                        "bg-white/[0.12]",
                        "blur-sm",
                        "transition-transform",
                        "duration-700",
                        "group-hover/resume:translate-x-32"
                      )}
                    />

                    <span className="relative z-10">
                      Resume
                    </span>

                    <Download
                      className={cn(
                        "relative z-10",
                        "h-3.5 w-3.5",
                        "text-violet-300",
                        "transition-colors",
                        "group-hover/resume:text-cyan-300"
                      )}
                    />
                  </motion.a>
                </div>

                {/* =========================================
                    MOBILE MENU BUTTON
                    ========================================= */}

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() =>
                    setMobileMenuOpen(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    mobileMenuOpen
                      ? "Close navigation menu"
                      : "Open navigation menu"
                  }
                  aria-expanded={mobileMenuOpen}
                  className={cn(
                    "relative",
                    "flex",
                    "h-10 w-10",
                    "items-center",
                    "justify-center",
                    "justify-self-end",
                    "rounded-full",
                    "border",
                    "border-white/[0.09]",
                    "bg-white/[0.035]",
                    "text-foreground",
                    "transition-all",
                    "duration-300",
                    "hover:border-cyan-400/25",
                    "hover:bg-cyan-400/[0.07]",
                    "hover:shadow-[0_0_18px_rgba(103,232,249,0.08)]",
                    "lg:hidden"
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{
                          opacity: 0,
                          rotate: -60,
                          scale: 0.7,
                        }}
                        animate={{
                          opacity: 1,
                          rotate: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          rotate: 60,
                          scale: 0.7,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                      >
                        <X className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{
                          opacity: 0,
                          rotate: 45,
                          scale: 0.7,
                        }}
                        animate={{
                          opacity: 1,
                          rotate: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          rotate: -45,
                          scale: 0.7,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                      >
                        <Menu className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.nav>

        {/* =================================================
            MOBILE MENU
            ================================================= */}

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* BACKDROP */}

              <motion.button
                type="button"
                aria-label="Close navigation menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.25,
                }}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "fixed inset-0",
                  "z-[75]",
                  "bg-black/55",
                  "backdrop-blur-[4px]",
                  "lg:hidden"
                )}
              />

              {/* MOBILE CAPSULE PANEL */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: -20,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -16,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.28,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={cn(
                  "fixed",
                  "left-3 right-3",
                  "top-[92px]",
                  "z-[85]",
                  "overflow-hidden",
                  "rounded-[28px]",
                  "border",
                  "border-white/[0.09]",
                  "bg-[#070c15]/95",
                  "shadow-[0_25px_80px_rgba(0,0,0,0.5)]",
                  "backdrop-blur-2xl",
                  "sm:left-5 sm:right-5",
                  "lg:hidden"
                )}
              >
                {/* MOBILE BACKGROUND GLOWS */}

                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none",
                    "absolute -left-20 top-10",
                    "h-44 w-44",
                    "rounded-full",
                    "bg-cyan-400/[0.06]",
                    "blur-[60px]"
                  )}
                />

                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none",
                    "absolute -right-20 bottom-0",
                    "h-44 w-44",
                    "rounded-full",
                    "bg-violet-500/[0.07]",
                    "blur-[60px]"
                  )}
                />

                <div
                  className={cn(
                    "relative z-10",
                    "px-4",
                    "py-5"
                  )}
                >
                  {/* MOBILE EYES */}

                  <div
                    className={cn(
                      "mb-4",
                      "flex",
                      "items-center",
                      "justify-between",
                      "border-b",
                      "border-white/[0.06]",
                      "px-2",
                      "pb-4"
                    )}
                  >
                    <div>
                      <p
                        className={cn(
                          "text-[11px]",
                          "font-bold",
                          "tracking-[0.15em]",
                          "text-foreground"
                        )}
                      >
                        PRASOON
                      </p>

                      <p
                        className={cn(
                          "mt-1",
                          "text-[8px]",
                          "tracking-[0.32em]",
                          "text-muted-foreground"
                        )}
                      >
                        PATHAK
                      </p>
                    </div>

                    <div
                      className={cn(
                        "flex",
                        "items-center",
                        "gap-[6px]"
                      )}
                      aria-hidden="true"
                    >
                      <motion.div
                        animate={{
                          scaleY: [1, 1, 0.12, 1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          times: [0, 0.45, 0.48, 0.51, 1],
                        }}
                        className={cn(
                          "relative",
                          "h-[18px] w-[18px]",
                          "rounded-full",
                          "bg-white"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute",
                            "left-[6px] top-[6px]",
                            "h-[6px] w-[6px]",
                            "rounded-full",
                            "bg-black"
                          )}
                        />
                      </motion.div>

                      <motion.div
                        animate={{
                          scaleY: [1, 1, 0.12, 1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          times: [0, 0.45, 0.48, 0.51, 1],
                        }}
                        className={cn(
                          "relative",
                          "h-[18px] w-[18px]",
                          "rounded-full",
                          "bg-white"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute",
                            "left-[6px] top-[6px]",
                            "h-[6px] w-[6px]",
                            "rounded-full",
                            "bg-black"
                          )}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* LINKS */}

                  <nav className="space-y-1">
                    {Object.entries(NAVIGATION).map(
                      ([key, label], index) => {
                        if (key === "resume") return null

                        const isActive =
                          currentSection === key

                        return (
                          <motion.button
                            key={key}
                            type="button"
                            initial={{
                              opacity: 0,
                              x: 15,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: index * 0.035,
                            }}
                            onClick={() =>
                              scrollToSection(key)
                            }
                            className={cn(
                              "relative",
                              "flex",
                              "w-full",
                              "items-center",
                              "justify-between",
                              "overflow-hidden",
                              "rounded-2xl",
                              "px-4",
                              "py-3.5",
                              "text-left",
                              "transition-all duration-300",

                              isActive
                                ? [
                                    "border",
                                    "border-cyan-400/[0.12]",
                                    "bg-cyan-400/[0.06]",
                                    "text-cyan-100",
                                    "shadow-[inset_0_0_20px_rgba(103,232,249,0.025)]",
                                  ]
                                : [
                                    "border",
                                    "border-transparent",
                                    "text-foreground/60",
                                    "hover:bg-white/[0.035]",
                                    "hover:text-foreground",
                                  ]
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <span
                                className={cn(
                                  "text-[9px]",
                                  "font-medium",
                                  isActive
                                    ? "text-cyan-300"
                                    : "text-muted-foreground/40"
                                )}
                              >
                                {String(index + 1).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              <span
                                className={cn(
                                  "text-sm",
                                  "font-medium"
                                )}
                              >
                                {label}
                              </span>
                            </div>

                            {isActive && (
                              <motion.span
                                layoutId="mobile-nav-indicator"
                                className={cn(
                                  "h-1.5 w-1.5",
                                  "rounded-full",
                                  "bg-cyan-300",
                                  "shadow-[0_0_10px_rgba(103,232,249,0.9)]"
                                )}
                              />
                            )}
                          </motion.button>
                        )
                      }
                    )}
                  </nav>

                  {/* MOBILE RESUME */}

                  <motion.a
                    href={SITE_CONFIG.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={cn(
                      "mt-4",
                      "flex",
                      "w-full",
                      "items-center",
                      "justify-between",
                      "rounded-2xl",
                      "border",
                      "border-violet-400/20",
                      "bg-violet-400/[0.06]",
                      "px-4",
                      "py-3.5",
                      "text-foreground",
                      "transition-all",
                      "hover:border-cyan-400/25",
                      "hover:bg-cyan-400/[0.07]"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm",
                        "font-semibold"
                      )}
                    >
                      Resume
                    </span>

                    <Download
                      className={cn(
                        "h-4 w-4",
                        "text-violet-300"
                      )}
                    />
                  </motion.a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }
)

Navbar.displayName = "Navbar"

export { Navbar }