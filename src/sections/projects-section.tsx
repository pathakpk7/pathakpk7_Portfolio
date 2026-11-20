"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Sparkles,
  Layers,
  RotateCw,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Container,
  SectionWrapper,
} from "@/components/layout"
import { ProjectFolderCard } from "@/components/projects/project-folder-card"
import {
  projects,
  type Project,
} from "@/data/projects"

/* =========================================================
   CARD DIMENSIONS
========================================================= */

const COLLAPSED_CARD_WIDTH = 440

/* =========================================================
   CAROUSEL END SPACER (SPACING BETWEEN LAST AND FIRST ITEM)
========================================================= */

function CarouselEndSpacer({ label = "End of List" }: { label?: string }) {
  return (
    <div
      data-carousel-spacer="true"
      className="shrink-0 snap-start flex items-center justify-center w-36 sm:w-52 py-4 self-stretch select-none"
    >
      <div className="relative flex flex-col items-center justify-center gap-2.5 w-full h-[65%] min-h-[220px] rounded-[24px] border border-dashed border-white/20 bg-white/[0.025] p-5 text-center backdrop-blur-md transition-colors hover:border-cyber-purple/40 hover:bg-white/[0.04]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyber-purple/35 bg-cyber-purple/10 text-cyber-purple shadow-[0_0_14px_rgba(168,85,247,0.25)]">
          <RotateCw className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <span className="block text-[11px] font-mono font-bold tracking-widest uppercase text-foreground/90">
            {label}
          </span>
          <span className="block text-[10px] tracking-wide text-muted-foreground/60">
            Looping to start
          </span>
        </div>
        <div className="flex items-center gap-1.5 opacity-50 mt-1">
          <span className="h-1 w-1 rounded-full bg-cyber-blue" />
          <span className="h-1 w-4 rounded-full bg-linear-to-r from-cyber-blue to-cyber-purple" />
          <span className="h-1 w-1 rounded-full bg-cyber-purple" />
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   PROJECT ROW COMPONENT
========================================================= */

interface ProjectRowProps {
  title: string
  subtitle: string
  badgeText: string
  badgeClass: string
  dotClass: string
  icon: React.ReactNode
  projects: Project[]
  expandedProjectId: string | null
  onToggleProject: (projectId: string) => void
}

function ProjectRow({
  title,
  subtitle,
  badgeText,
  badgeClass,
  dotClass,
  icon,
  projects: rowProjects,
  expandedProjectId,
  onToggleProject,
}: ProjectRowProps) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null)

  const [activeProjectId, setActiveProjectId] = React.useState<string>(
    rowProjects[0]?.id ?? ""
  )

  /* Measure the exact pixel width of one complete set including the spacer */
  const getCycleWidth = React.useCallback(() => {
    const container = scrollRef.current
    if (!container) return 0

    const firstCardSet0 = container.querySelector<HTMLElement>(
      "[data-card-index='0'][data-set-index='0']"
    )
    const firstCardSet1 = container.querySelector<HTMLElement>(
      "[data-card-index='0'][data-set-index='1']"
    )
    if (firstCardSet0 && firstCardSet1) {
      return firstCardSet1.offsetLeft - firstCardSet0.offsetLeft
    }
    return 0
  }, [])

  /* Update active project based on horizontal scroll */
  const updateActiveProject = React.useCallback(() => {
    const container = scrollRef.current
    if (!container || rowProjects.length === 0) return

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-project-folder]")
    )
    if (cards.length === 0) return

    const containerRect = container.getBoundingClientRect()
    const targetX = containerRect.left + 48

    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect()
      const distance = Math.abs(cardRect.left - targetX)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    const closestCard = cards[closestIndex]
    const projectId = closestCard?.getAttribute("data-project-id")
    if (projectId) {
      setActiveProjectId((currentId) =>
        currentId === projectId ? currentId : projectId
      )
    }
  }, [rowProjects])

  /* Ensure the first project is ALWAYS shown at the start initially */
  React.useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    container.scrollLeft = 0
    setActiveProjectId(rowProjects[0]?.id ?? "")
  }, [rowProjects])

  /* Scroll listener: update active dot & perform infinite loop wrapping */
  React.useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let animationFrameId: number | null = null

    const handleScroll = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      animationFrameId = requestAnimationFrame(() => {
        if (expandedProjectId === null) {
          const cycleWidth = getCycleWidth()
          if (cycleWidth > 0 && container.scrollLeft >= cycleWidth) {
            container.scrollLeft -= cycleWidth
          }
        }
        updateActiveProject()
        animationFrameId = null
      })
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    updateActiveProject()

    return () => {
      container.removeEventListener("scroll", handleScroll)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [expandedProjectId, getCycleWidth, updateActiveProject])

  /* Resize listener */
  React.useEffect(() => {
    let animationFrameId: number | null = null

    const handleResize = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      animationFrameId = requestAnimationFrame(() => {
        updateActiveProject()
        animationFrameId = null
      })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [updateActiveProject])

  /* Center project */
  const centerProject = React.useCallback(
    (projectId: string, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current
      if (!container) return

      const target =
        container.querySelector<HTMLElement>(
          `[data-project-id='${projectId}'][data-set-index='0']`
        ) ??
        container.querySelector<HTMLElement>(
          `[data-project-id='${projectId}']`
        )

      if (!target) return

      const desiredScrollLeft =
        target.offsetLeft - container.offsetLeft - 16

      container.scrollTo({
        left: Math.max(0, desiredScrollLeft),
        behavior,
      })
    },
    []
  )

  const handleCardToggle = React.useCallback(
    (projectId: string) => {
      setActiveProjectId(projectId)
      onToggleProject(projectId)

      window.setTimeout(() => {
        centerProject(projectId)
      }, 80)

      window.setTimeout(() => {
        centerProject(projectId)
      }, 480)
    },
    [centerProject, onToggleProject]
  )

  /* Previous / Next buttons with infinite horizontal scroll wrapping */
  const scrollProjects = React.useCallback(
    (direction: "left" | "right") => {
      const container = scrollRef.current
      if (!container) return

      const cycleWidth = getCycleWidth()
      const scrollAmount = expandedProjectId
        ? Math.min(container.clientWidth * 0.82, 850)
        : Math.min(container.clientWidth * 0.72, COLLAPSED_CARD_WIDTH + 30)

      if (direction === "left") {
        if (cycleWidth > 0 && container.scrollLeft < scrollAmount) {
          // Wrap forward by cycleWidth before scrolling left so it seamlessly loops to the end!
          container.scrollLeft += cycleWidth
        }
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        })
      } else {
        if (cycleWidth > 0 && container.scrollLeft >= cycleWidth) {
          container.scrollLeft -= cycleWidth
        }
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        })
      }
    },
    [expandedProjectId, getCycleWidth]
  )

  const scrollToProject = React.useCallback(
    (projectId: string) => {
      setActiveProjectId(projectId)
      centerProject(projectId)
    },
    [centerProject]
  )

  if (rowProjects.length === 0) return null

  return (
    <div className="relative mb-12 last:mb-0">
      {/* ===================================================
          ROW HEADER
      =================================================== */}
      <div className="mb-3 flex items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-7 items-center gap-1.5 rounded-full border px-3 py-0.5 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md",
              badgeClass
            )}
          >
            {icon}
            <span className={cn("h-1.5 w-1.5 rounded-full", dotClass)} />
            {badgeText}
          </div>
          <span className="hidden text-xs text-muted-foreground/70 sm:inline">
            {subtitle}
          </span>
        </div>

        <div className="text-xs font-mono tracking-wider text-muted-foreground/60">
          {rowProjects.length} {rowProjects.length === 1 ? "Project" : "Projects"}
        </div>
      </div>

      {/* ===================================================
          ROW CAROUSEL
      =================================================== */}
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

        {/* PREVIOUS BUTTON */}
        <motion.button
          type="button"
          aria-label={`Previous in ${title}`}
          onClick={() => scrollProjects("left")}
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

        {/* NEXT BUTTON */}
        <motion.button
          type="button"
          aria-label={`Next in ${title}`}
          onClick={() => scrollProjects("right")}
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

        {/* SCROLLER */}
        <div
          ref={scrollRef}
          className="projects-scrollbar-hide flex snap-x snap-mandatory items-start gap-5 overflow-x-auto overflow-y-hidden px-5 pb-6 pt-4 sm:gap-6 sm:px-8 lg:px-12"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[0, 1].map((setIndex) => (
            <React.Fragment key={`set-${setIndex}`}>
              {rowProjects.map((project, index) => {
                const isActive = activeProjectId === project.id
                const isExpanded = expandedProjectId === project.id
                const anotherProjectExpanded =
                  expandedProjectId !== null && !isExpanded

                return (
                  <motion.div
                    key={`${project.id}-set-${setIndex}`}
                    data-project-folder="true"
                    data-project-id={project.id}
                    data-card-index={index}
                    data-set-index={setIndex}
                    animate={{
                      opacity: anotherProjectExpanded
                        ? 0.2
                        : isActive
                          ? 1
                          : 0.72,
                      scale: anotherProjectExpanded
                        ? 0.94
                        : 1,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.25,
                      },
                      scale: {
                        duration: 0.25,
                      },
                    }}
                    className={cn(
                      "shrink-0 snap-start transition-all",
                      isExpanded
                        ? [
                            "w-[94vw]",
                            "sm:w-[92vw]",
                            "lg:w-[980px]",
                            "lg:max-w-[980px]",
                            "relative z-50",
                          ]
                        : [
                            "w-[88vw]",
                            "sm:w-[440px]",
                            "lg:w-[440px]",
                            "lg:max-w-[440px]",
                            "relative z-10",
                          ]
                    )}
                  >
                    <ProjectFolderCard
                      project={project}
                      index={index}
                      isActive={isActive}
                      isExpanded={isExpanded}
                      onToggle={() => handleCardToggle(project.id)}
                      layoutIdPrefix={`set-${setIndex}`}
                    />
                  </motion.div>
                )
              })}

              {/* END SPACER BETWEEN SETS (LET USER KNOW ABOUT END OF COLLECTION) */}
              <CarouselEndSpacer label={title} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ROW INDICATORS */}
      <div className="mt-1 flex items-center justify-center gap-2">
        {rowProjects.map((project) => {
          const active = activeProjectId === project.id

          return (
            <button
              key={project.id}
              type="button"
              aria-label={`View ${project.name}`}
              onClick={() => scrollToProject(project.id)}
              className="relative flex h-5 items-center justify-center"
            >
              <motion.span
                animate={{
                  width: active ? 24 : 6,
                  opacity: active ? 1 : 0.35,
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
        })}
      </div>
    </div>
  )
}

/* =========================================================
   PROJECTS SECTION
========================================================= */

const ProjectsSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<
    React.ComponentPropsWithoutRef<typeof SectionWrapper>,
    "children"
  >
>(({ className, ...props }, ref) => {
  const [expandedProjectId, setExpandedProjectId] = React.useState<
    string | null
  >(null)

  /* Split into Featured and Non-Featured (Row 1 & Row 2) */
  const featuredProjects = React.useMemo(
    () => projects.filter((project) => project.featured),
    []
  )

  const nonFeaturedProjects = React.useMemo(
    () => projects.filter((project) => !project.featured),
    []
  )

  /* Close expanded project on Escape */
  React.useEffect(() => {
    if (expandedProjectId === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedProjectId(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [expandedProjectId])

  /* Close expanded project when clicking anywhere outside */
  React.useEffect(() => {
    if (expandedProjectId === null) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      // Do not close if clicking inside the expanded project card or an image lightbox
      if (
        target.closest("[data-project-expanded='true']") ||
        target.closest("[data-lightbox='true']")
      ) {
        return
      }

      setExpandedProjectId(null)
    }

    const timer = setTimeout(() => {
      document.addEventListener("pointerdown", handleClickOutside)
    }, 60)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("pointerdown", handleClickOutside)
    }
  }, [expandedProjectId])

  const toggleProject = React.useCallback((projectId: string) => {
    setExpandedProjectId((currentId) =>
      currentId === projectId ? null : projectId
    )
  }, [])

  /* Empty state */
  if (projects.length === 0) {
    return (
      <SectionWrapper
        ref={ref}
        id="projects"
        className={cn("relative py-12 sm:py-14", className)}
        {...props}
      >
        <Container size="cinematic" className="relative z-10">
          <div className="text-center text-muted-foreground">
            No projects available.
          </div>
        </Container>
      </SectionWrapper>
    )
  }

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
          CLICK-OUTSIDE BACKDROP OVERLAY
      =================================================== */}
      <AnimatePresence>
        {expandedProjectId !== null && (
          <motion.div
            key="projects-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpandedProjectId(null)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] cursor-pointer"
            aria-label="Click anywhere outside to minimize open project"
            title="Click outside to minimize"
          />
        )}
      </AnimatePresence>
      {/* ===================================================
          BACKGROUND GLOWS
      =================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          animate={{
            x: [-20, 25, -20],
            y: [-10, 20, -10],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[12%] top-[8%] h-[340px] w-[340px] rounded-full bg-cyber-blue/6 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [20, -25, 20],
            y: [15, -20, 15],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[8%] top-[28%] h-[380px] w-[380px] rounded-full bg-cyber-purple/7 blur-[130px]"
        />

        <div className="absolute left-1/2 top-[48%] h-[420px] w-[65%] -translate-x-1/2 rounded-full bg-cyber-blue/[0.025] blur-[150px]" />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}
      <Container size="cinematic" className="relative z-10">
        {/* =================================================
            SECTION HEADER
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
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 flex flex-col items-center text-center"
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
            Selected work &amp; experiments.
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
            ROW 1: FEATURED PROJECTS
        ================================================= */}
        <ProjectRow
          title="Featured Projects"
          subtitle="Flagship systems, live architectures & major milestones"
          badgeText="Featured Work"
          badgeClass="border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue shadow-[0_0_12px_rgba(34,211,238,0.12)]"
          dotClass="bg-cyber-blue animate-pulse"
          icon={<Sparkles className="h-3.5 w-3.5 text-cyber-blue" />}
          projects={featuredProjects}
          expandedProjectId={expandedProjectId}
          onToggleProject={toggleProject}
        />

        {/* =================================================
            ROW 2: OTHER PROJECTS & PROTOTYPES
        ================================================= */}
        {nonFeaturedProjects.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border/15">
            <ProjectRow
              title="Other Projects & Prototypes"
              subtitle="Utilities, experimental prototypes & learning builds"
              badgeText="Other Projects & Prototypes"
              badgeClass="border-cyber-purple/30 bg-cyber-purple/10 text-cyber-purple shadow-[0_0_12px_rgba(168,85,247,0.12)]"
              dotClass="bg-cyber-purple"
              icon={<Layers className="h-3.5 w-3.5 text-cyber-purple" />}
              projects={nonFeaturedProjects}
              expandedProjectId={expandedProjectId}
              onToggleProject={toggleProject}
            />
          </div>
        )}

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
          className="mt-6 text-center text-[10px] tracking-wide text-muted-foreground/50"
        >
          Click any project folder to explore details · drag or use arrows to browse rows
        </motion.p>
      </Container>
    </SectionWrapper>
  )
})

ProjectsSection.displayName = "ProjectsSection"

export { ProjectsSection }
