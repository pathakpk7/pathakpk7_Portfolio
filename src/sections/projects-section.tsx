"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Container,
  SectionWrapper,
} from "@/components/layout"
import { ProjectFolderCard } from "@/components/projects/project-folder-card"
import { projects } from "@/data/projects"

/* =========================================================
   CARD DIMENSIONS
========================================================= */

const COLLAPSED_CARD_WIDTH = 440

/* =========================================================
   PROJECTS SECTION
========================================================= */

const ProjectsSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<
    React.ComponentPropsWithoutRef<
      typeof SectionWrapper
    >,
    "children"
  >
>(({ className, ...props }, ref) => {
  const scrollRef =
    React.useRef<HTMLDivElement | null>(null)

  const [activeProjectId, setActiveProjectId] =
    React.useState<string>(
      projects[0]?.id ?? ""
    )

  const [
    expandedProjectId,
    setExpandedProjectId,
  ] = React.useState<string | null>(null)

  /* =======================================================
     UPDATE ACTIVE PROJECT
  ======================================================= */

  const updateActiveProject =
    React.useCallback(() => {
      const container = scrollRef.current

      if (
        !container ||
        projects.length === 0
      ) {
        return
      }

      const cards = Array.from(
        container.querySelectorAll<HTMLElement>(
          "[data-project-folder]"
        )
      )

      if (cards.length === 0) return

      const containerRect =
        container.getBoundingClientRect()

      /* Measure distance relative to left start of container */
      const targetX = containerRect.left + 48

      let closestIndex = 0
      let closestDistance =
        Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const cardRect =
          card.getBoundingClientRect()

        const distance = Math.abs(
          cardRect.left - targetX
        )

        if (
          distance < closestDistance
        ) {
          closestDistance = distance
          closestIndex = index
        }
      })

      const closestProject =
        projects[closestIndex]

      if (!closestProject) return

      setActiveProjectId(
        (currentId) =>
          currentId ===
          closestProject.id
            ? currentId
            : closestProject.id
      )
    }, [])

  /* =======================================================
     SCROLL LISTENER
  ======================================================= */

  React.useEffect(() => {
    const container =
      scrollRef.current

    if (!container) return

    let animationFrameId:
      | number
      | null = null

    const handleScroll = () => {
      if (
        animationFrameId !== null
      ) {
        cancelAnimationFrame(
          animationFrameId
        )
      }

      animationFrameId =
        requestAnimationFrame(() => {
          updateActiveProject()
          animationFrameId = null
        })
    }

    container.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    )

    updateActiveProject()

    return () => {
      container.removeEventListener(
        "scroll",
        handleScroll
      )

      if (
        animationFrameId !== null
      ) {
        cancelAnimationFrame(
          animationFrameId
        )
      }
    }
  }, [updateActiveProject])

  /* =======================================================
     RESIZE
  ======================================================= */

  React.useEffect(() => {
    let animationFrameId:
      | number
      | null = null

    const handleResize = () => {
      if (
        animationFrameId !== null
      ) {
        cancelAnimationFrame(
          animationFrameId
        )
      }

      animationFrameId =
        requestAnimationFrame(() => {
          updateActiveProject()
          animationFrameId = null
        })
    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      )

      if (
        animationFrameId !== null
      ) {
        cancelAnimationFrame(
          animationFrameId
        )
      }
    }
  }, [updateActiveProject])

  /* =======================================================
     MOUSE WHEEL -> HORIZONTAL SCROLL
  ======================================================= */

  React.useEffect(() => {
    const container =
      scrollRef.current

    if (!container) return

    const handleWheel = (
      event: WheelEvent
    ) => {
      /*
       * When a project is expanded,
       * preserve normal page scrolling.
       */
      if (
        expandedProjectId !== null
      ) {
        return
      }

      const vertical = Math.abs(
        event.deltaY
      )

      const horizontal = Math.abs(
        event.deltaX
      )

      if (
        vertical > horizontal &&
        event.deltaY !== 0
      ) {
        event.preventDefault()

        container.scrollBy({
          left:
            event.deltaY * 0.7,
          behavior: "auto",
        })
      }
    }

    container.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      container.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [expandedProjectId])

  /* =======================================================
     CENTER PROJECT
  ======================================================= */

  const centerProject =
    React.useCallback(
      (
        projectId: string,
        behavior: ScrollBehavior =
          "smooth"
      ) => {
        const container =
          scrollRef.current

        if (!container) return

        const projectIndex =
          projects.findIndex(
            (project) =>
              project.id ===
              projectId
          )

        if (projectIndex < 0) return

        const cards = Array.from(
          container.querySelectorAll<HTMLElement>(
            "[data-project-folder]"
          )
        )

        const target =
          cards[projectIndex]

        if (!target) return

        const desiredScrollLeft =
          target.offsetLeft -
          container.offsetLeft -
          16

        container.scrollTo({
          left: Math.max(
            0,
            desiredScrollLeft
          ),
          behavior,
        })
      },
      []
    )

  /* =======================================================
     TOGGLE PROJECT
  ======================================================= */

  const toggleProject =
    React.useCallback(
      (projectId: string) => {
        setActiveProjectId(
          projectId
        )

        setExpandedProjectId(
          (currentId) =>
            currentId === projectId
              ? null
              : projectId
        )

        /*
         * First centering pass:
         * immediately after toggle.
         */
        window.setTimeout(() => {
          centerProject(projectId)
        }, 80)

        /*
         * Second pass:
         * after layout animation.
         */
        window.setTimeout(() => {
          centerProject(projectId)
        }, 480)
      },
      [centerProject]
    )

  /* =======================================================
     ESCAPE -> CLOSE
  ======================================================= */

  React.useEffect(() => {
    if (
      expandedProjectId === null
    ) {
      return
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        setExpandedProjectId(
          null
        )
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [expandedProjectId])

  /* =======================================================
     PREVIOUS / NEXT
  ======================================================= */

  const scrollProjects =
    React.useCallback(
      (
        direction:
          | "left"
          | "right"
      ) => {
        const container =
          scrollRef.current

        if (!container) return

        /*
         * When expanded, use a larger
         * scroll amount.
         */
        const scrollAmount =
          expandedProjectId
            ? Math.min(
                container.clientWidth *
                  0.82,
                850
              )
            : Math.min(
                container.clientWidth *
                  0.72,
                COLLAPSED_CARD_WIDTH +
                  30
              )

        container.scrollBy({
          left:
            direction === "right"
              ? scrollAmount
              : -scrollAmount,

          behavior: "smooth",
        })
      },
      [expandedProjectId]
    )

  /* =======================================================
     DOT NAVIGATION
  ======================================================= */

  const scrollToProject =
    React.useCallback(
      (projectId: string) => {
        setActiveProjectId(
          projectId
        )

        centerProject(projectId)
      },
      [centerProject]
    )

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (projects.length === 0) {
    return (
      <SectionWrapper
        ref={ref}
        id="projects"
        className={cn(
          "relative py-12 sm:py-14",
          className
        )}
        {...props}
      >
        <Container
          size="cinematic"
          className="relative z-10"
        >
          <div className="text-center text-muted-foreground">
            No projects available.
          </div>
        </Container>
      </SectionWrapper>
    )
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <SectionWrapper
      ref={ref}
      id="projects"
      className={cn(
        "relative overflow-hidden",
        "py-12 sm:py-14 lg:py-16",
        className
      )}
      {...props}
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* LEFT CYAN GLOW */}

        <motion.div
          animate={{
            x: [
              -20,
              25,
              -20,
            ],
            y: [
              -10,
              20,
              -10,
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[12%] top-[8%] h-[340px] w-[340px] rounded-full bg-cyber-blue/6 blur-[120px]"
        />

        {/* RIGHT PURPLE GLOW */}

        <motion.div
          animate={{
            x: [
              20,
              -25,
              20,
            ],
            y: [
              15,
              -20,
              15,
            ],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[8%] top-[28%] h-[380px] w-[380px] rounded-full bg-cyber-purple/7 blur-[130px]"
        />

        {/* CENTER AMBIENT LIGHT */}

        <div className="absolute left-1/2 top-[48%] h-[420px] w-[65%] -translate-x-1/2 rounded-full bg-cyber-blue/[0.025] blur-[150px]" />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <Container
        size="cinematic"
        className="relative z-10"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="mb-3 flex flex-col items-center text-center"
        >
          {/* ICON */}

          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: -3,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="relative mb-2 flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-cyber-purple/25 bg-background/60 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-cyber-blue/10 to-cyber-purple/10" />

            <FolderOpen className="relative z-10 h-5 w-5 text-cyber-purple" />
          </motion.div>

          {/* TITLE */}

          <motion.h2
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.08,
            }}
            className="text-3xl font-black tracking-[0.18em] text-foreground sm:text-4xl lg:text-5xl"
          >
            PROJECTS
          </motion.h2>

          {/* SUBTITLE */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="mt-1.5 text-xs tracking-wide text-muted-foreground sm:text-sm"
          >
            Selected work &amp;
            experiments.
          </motion.p>

          {/* UNDERLINE */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 90,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="mt-2 h-px bg-linear-to-r from-transparent via-cyber-purple to-transparent shadow-[0_0_12px_rgba(168,85,247,.6)]"
          />
        </motion.div>

        {/* =================================================
            CAROUSEL
        ================================================= */}

        <div className="relative mt-1">
          {/* LEFT FADE */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-14 bg-linear-to-r from-background via-background/70 to-transparent lg:block"
          />

          {/* RIGHT FADE */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-14 bg-linear-to-l from-background via-background/70 to-transparent lg:block"
          />

          {/* ===============================================
              PREVIOUS BUTTON
          =============================================== */}

          <motion.button
            type="button"
            aria-label="Previous projects"
            onClick={() =>
              scrollProjects("left")
            }
            whileHover={{
              scale: 1.08,
              x: -2,
            }}
            whileTap={{
              scale: 0.94,
            }}
            className="absolute left-1 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/40 bg-background/85 text-muted-foreground shadow-xl backdrop-blur-xl transition-colors hover:border-cyber-purple/50 hover:text-cyber-purple lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          {/* ===============================================
              NEXT BUTTON
          =============================================== */}

          <motion.button
            type="button"
            aria-label="Next projects"
            onClick={() =>
              scrollProjects("right")
            }
            whileHover={{
              scale: 1.08,
              x: 2,
            }}
            whileTap={{
              scale: 0.94,
            }}
            className="absolute right-1 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/40 bg-background/85 text-muted-foreground shadow-xl backdrop-blur-xl transition-colors hover:border-cyber-blue/50 hover:text-cyber-blue lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          {/* ===============================================
              PROJECT SCROLLER
          =============================================== */}

          <div
            ref={scrollRef}
            className="projects-scrollbar-hide flex snap-x snap-mandatory items-start gap-5 overflow-x-auto overflow-y-hidden px-5 pb-6 pt-4 sm:gap-6 sm:px-8 lg:px-12"
            style={{
              scrollbarWidth:
                "none",

              msOverflowStyle:
                "none",

              WebkitOverflowScrolling:
                "touch",
            }}
          >
            {projects.map(
              (
                project,
                index
              ) => {
                const isActive =
                  activeProjectId ===
                  project.id

                const isExpanded =
                  expandedProjectId ===
                  project.id

                const anotherProjectExpanded =
                  expandedProjectId !==
                    null &&
                  !isExpanded

                return (
                  <motion.div
                    layout
                    key={
                      project.id
                    }
                    data-project-folder="true"
                    animate={{
                      opacity:
                        anotherProjectExpanded
                          ? 0.2
                          : isActive
                            ? 1
                            : 0.68,

                      scale:
                        anotherProjectExpanded
                          ? 0.93
                          : isActive
                            ? 1
                            : 0.975,
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness:
                          220,
                        damping: 30,
                      },

                      opacity: {
                        duration: 0.25,
                      },

                      scale: {
                        duration: 0.25,
                      },
                    }}
                    className={cn(
                      "shrink-0 snap-start",

                      /*
                       * EXPANDED
                       */
                      isExpanded
                        ? [
                            "w-[94vw]",
                            "sm:w-[92vw]",
                            "lg:w-[980px]",
                            "lg:max-w-[980px]",
                          ]
                        : [
                            /*
                             * COLLAPSED
                             */
                            "w-[88vw]",
                            "sm:w-[440px]",
                            "lg:w-[440px]",
                            "lg:max-w-[440px]",
                          ]
                    )}
                  >
                    <ProjectFolderCard
                      project={
                        project
                      }
                      index={index}
                      isActive={
                        isActive
                      }
                      isExpanded={
                        isExpanded
                      }
                      onToggle={() =>
                        toggleProject(
                          project.id
                        )
                      }
                    />
                  </motion.div>
                )
              }
            )}
          </div>
        </div>

        {/* =================================================
            PROJECT INDICATORS
        ================================================= */}

        <div className="mt-1 flex items-center justify-center gap-2">
          {projects.map(
            (project) => {
              const active =
                activeProjectId ===
                project.id

              return (
                <button
                  key={
                    project.id
                  }
                  type="button"
                  aria-label={`View ${project.name}`}
                  onClick={() =>
                    scrollToProject(
                      project.id
                    )
                  }
                  className="relative flex h-5 items-center justify-center"
                >
                  <motion.span
                    animate={{
                      width: active
                        ? 24
                        : 6,

                      opacity: active
                        ? 1
                        : 0.35,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={cn(
                      "block h-1.5 rounded-full",

                      active
                        ? "bg-linear-to-r from-cyber-blue to-cyber-purple shadow-[0_0_8px_rgba(34,211,238,.45)]"
                        : "bg-muted-foreground"
                    )}
                  />
                </button>
              )
            }
          )}
        </div>

        {/* =================================================
            BROWSE HINT
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.5,
          }}
          className="mt-1 text-center text-[10px] tracking-wide text-muted-foreground/50"
        >
          Click a project to explore
          {" · "}
          drag to browse
        </motion.p>
      </Container>
    </SectionWrapper>
  )
})

ProjectsSection.displayName =
  "ProjectsSection"

export { ProjectsSection }