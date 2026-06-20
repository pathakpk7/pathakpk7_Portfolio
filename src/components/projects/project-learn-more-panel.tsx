"use client"

import * as React from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { Project } from "@/data/projects"
import { FaGithub, FaTimes, FaExternalLinkAlt } from "react-icons/fa"

interface ProjectLearnMorePanelProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectLearnMorePanel = React.forwardRef<HTMLDivElement, ProjectLearnMorePanelProps>(
  ({ project, isOpen, onClose }, ref) => {
    const y = useMotionValue(0)
    const [isMobile, setIsMobile] = React.useState(false)
    const [isTablet, setIsTablet] = React.useState(false)

    React.useEffect(() => {
      const checkScreenSize = () => {
        const width = window.innerWidth
        setIsMobile(width < 768)
        setIsTablet(width >= 768 && width < 1024)
      }
      checkScreenSize()
      window.addEventListener("resize", checkScreenSize)
      return () => window.removeEventListener("resize", checkScreenSize)
    }, [])

    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "unset"
      }
      return () => {
        document.body.style.overflow = "unset"
      }
    }, [isOpen])

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          onClose()
        }
      }
      window.addEventListener("keydown", handleEscape)
      return () => window.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    const handleDragEnd = (_: unknown, info: PanInfo) => {
      if (isMobile && info.offset.y > 100) {
        onClose()
      }
    }

    const opacity = useTransform(y, [0, 300], [1, 0])
    const scale = useTransform(y, [0, 300], [1, 0.9])

    if (!project) return null

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Panel */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: isMobile ? 0 : "100%", y: isMobile ? "100%" : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: isMobile ? 0 : "100%", y: isMobile ? "100%" : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "fixed z-50",
                isMobile
                  ? "bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl"
                  : isTablet
                  ? "top-0 right-0 bottom-0 w-[70vw]"
                  : "top-0 right-0 bottom-0 w-[45vw]"
              )}
              style={{ opacity, scale }}
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              {/* Panel Content */}
              <div className="h-full bg-background/95 backdrop-blur-xl border-l border-border/20 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/20">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{project.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{project.tagline}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="hover:bg-accent/20"
                  >
                    <FaTimes className="w-5 h-5" />
                  </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Overview */}
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
                  </section>

                  {/* Problem Solved */}
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Problem Solved</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.problemSolved}</p>
                  </section>

                  {/* Key Features */}
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Tech Stack */}
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Architecture */}
                  {project.architecture && (
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Architecture</h3>
                      <div className="p-4 rounded-lg bg-accent/10 border border-border/20">
                        <p className="text-sm text-muted-foreground text-center">{project.architecture}</p>
                      </div>
                    </section>
                  )}

                  {/* Challenges & Solutions */}
                  {project.challenges && project.challenges.length > 0 && (
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Challenges & Solutions</h3>
                      <div className="space-y-4">
                        {project.challenges.map((item, index) => (
                          <div key={index} className="p-4 rounded-lg bg-accent/10 border border-border/20">
                            <p className="text-sm font-medium text-foreground mb-2">
                              Challenge: {item.challenge}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Solution: {item.solution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Key Learnings */}
                  {project.keyLearnings && project.keyLearnings.length > 0 && (
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Key Learnings</h3>
                      <ul className="space-y-2">
                        {project.keyLearnings.map((learning, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {learning}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Future Roadmap */}
                  {project.futureRoadmap && project.futureRoadmap.length > 0 && (
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Future Roadmap</h3>
                      <ul className="space-y-2">
                        {project.futureRoadmap.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Project Impact */}
                  {project.projectImpact && (
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Project Impact</h3>
                      <p className="text-muted-foreground leading-relaxed">{project.projectImpact}</p>
                    </section>
                  )}

                  {/* Role */}
                  {project.role && (
                    <section>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Role</h3>
                      <p className="text-muted-foreground">{project.role}</p>
                    </section>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/20 space-y-3">
                  <Button
                    variant="cyber"
                    size="lg"
                    className="w-full hover-lift"
                    onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
                  >
                    <FaGithub className="w-5 h-5 mr-2" />
                    View on GitHub
                  </Button>
                  {project.liveDemo && (
                    <Button
                      variant="glass"
                      size="lg"
                      className="w-full hover-lift"
                      onClick={() => window.open(project.liveDemo, '_blank', 'noopener,noreferrer')}
                    >
                      <FaExternalLinkAlt className="w-5 h-5 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
)

ProjectLearnMorePanel.displayName = "ProjectLearnMorePanel"

export { ProjectLearnMorePanel }
