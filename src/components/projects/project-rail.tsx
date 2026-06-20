"use client"

import * as React from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { Project } from "@/data/projects"
import { ProjectCard } from "./project-card"

interface ProjectRailProps {
  projects: Project[]
  title: string
  onLearnMore: (project: Project) => void
  className?: string
}

const ProjectRail = React.forwardRef<HTMLDivElement, ProjectRailProps>(
  ({ projects, title, onLearnMore, className }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(true)
    const x = useMotionValue(0)
    const controls = useAnimation()

    const checkScroll = () => {
      if (containerRef.current) {
        setCanScrollLeft(containerRef.current.scrollLeft > 0)
        setCanScrollRight(
          containerRef.current.scrollLeft <
            containerRef.current.scrollWidth - containerRef.current.clientWidth
        )
      }
    }

    React.useEffect(() => {
      const container = containerRef.current
      if (container) {
        container.addEventListener("scroll", checkScroll)
        checkScroll()
        return () => container.removeEventListener("scroll", checkScroll)
      }
      return
    }, [])

    const scroll = (direction: "left" | "right") => {
      if (containerRef.current) {
        const scrollAmount = containerRef.current.clientWidth * 0.8
        containerRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth"
        })
      }
    }

    const handleDrag = (offset: number) => {
      if (containerRef.current) {
        containerRef.current.scrollLeft -= offset
      }
    }

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>

          {/* Scroll Controls - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "w-10 h-10 rounded-full border transition-all duration-300",
                "flex items-center justify-center",
                "bg-background/80 backdrop-blur-sm",
                canScrollLeft
                  ? "border-primary/50 hover:border-primary hover:bg-primary/10 cursor-pointer"
                  : "border-border/30 cursor-not-allowed opacity-50"
              )}
              whileHover={canScrollLeft ? { scale: 1.1 } : {}}
              whileTap={canScrollLeft ? { scale: 0.9 } : {}}
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "w-10 h-10 rounded-full border transition-all duration-300",
                "flex items-center justify-center",
                "bg-background/80 backdrop-blur-sm",
                canScrollRight
                  ? "border-primary/50 hover:border-primary hover:bg-primary/10 cursor-pointer"
                  : "border-border/30 cursor-not-allowed opacity-50"
              )}
              whileHover={canScrollRight ? { scale: 1.1 } : {}}
              whileTap={canScrollRight ? { scale: 0.9 } : {}}
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Project Rail */}
        <motion.div
          ref={containerRef}
          className="relative"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDrag={(event, info) => handleDrag(info.delta.x)}
          style={{ x }}
          animate={controls}
        >
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="shrink-0 snap-start"
              >
                <ProjectCard
                  project={project}
                  onLearnMore={onLearnMore}
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* Fade Gradients */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-4 w-24 bg-linear-to-r from-background to-transparent pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-4 w-24 bg-linear-to-l from-background to-transparent pointer-events-none" />
          )}
        </motion.div>
      </div>
    )
  }
)

ProjectRail.displayName = "ProjectRail"

export { ProjectRail }
