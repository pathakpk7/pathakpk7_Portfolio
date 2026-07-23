"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { Project } from "@/data/projects"
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from "react-icons/fa"

interface ExpandableCardProps {
  project: Project
  isExpanded: boolean
  onToggle: () => void
  index: number
}

const ExpandableCard = React.forwardRef<HTMLDivElement, ExpandableCardProps>(
  ({ project, isExpanded, onToggle, index }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    
    React.useEffect(() => {
      console.log('ExpandableCard isExpanded changed for', project.id, ':', isExpanded)
    }, [isExpanded, project.id])

    const handleCardClick = (e: React.MouseEvent) => {
      // Prevent click if clicking on GitHub button or external link
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest('a[href]')) {
        return
      }
      console.log('Card clicked, toggling expansion for:', project.id)
      onToggle()
    }

    const getCategoryBadge = () => {
      if (project.featured) {
        return "⭐ Featured Final Year Project"
      }
      switch (project.category) {
        case "final-year":
          return "Final Year Project"
        case "group":
          return "Group Project"
        case "personal":
          return "Personal Project"
        default:
          return "Project"
      }
    }

    const getCategoryColor = () => {
      if (project.featured) {
        return "bg-linear-to-r from-cyber-blue to-cyber-purple text-white"
      }
      return "bg-primary/10 text-primary border border-primary/20"
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        layout
        className={cn(
          "w-full rounded-3xl",
          "bg-linear-to-br from-background/60 to-background/30",
          "backdrop-blur-xl border border-border/20",
          "transition-all duration-500",
          isHovered && "border-primary/40 shadow-2xl shadow-primary/20"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onToggle()
          }
        }}
      >
        {/* Collapsed State Content */}
        <motion.div
          layout
          className="p-6 md:p-8 cursor-pointer"
        >
          {/* Screenshot Preview / Placeholder */}
          <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden mb-6 bg-linear-to-br from-cyber-blue/10 to-cyber-purple/10">
            {project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={`${project.name} screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-6xl md:text-8xl opacity-20"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 5 : 0
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {project.category === "final-year" ? "🔒" : 
                   project.category === "group" ? "👥" : "💻"}
                </motion.div>
              </div>
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
          </div>

          {/* Category Badge */}
          <motion.div
            className="mb-3"
            layout
          >
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                getCategoryColor()
              )}
            >
              {getCategoryBadge()}
            </span>
          </motion.div>

          {/* Project Name */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-foreground mb-2"
            layout
          >
            {project.name}
          </motion.h3>

          {/* Tagline */}
          <motion.p
            className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2"
            layout
          >
            {project.tagline}
          </motion.p>

          {/* Tech Stack Preview */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            layout
          >
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-md bg-background/50 border border-border/30 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 rounded-md bg-background/50 border border-border/30 text-xs text-muted-foreground">
                +{project.techStack.length - 4}
              </span>
            )}
          </motion.div>

          {/* GitHub Button */}
          <motion.div
            className="flex items-center justify-between"
            layout
          >
            <Button
              variant="cyber"
              size="sm"
              className="hover-lift"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.github, '_blank', 'noopener,noreferrer')
              }}
            >
              <FaGithub className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground"
            >
              <FaChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Expanded State Content */}
        <AnimatePresence>
          {isExpanded && (
              <motion.div
                key="expanded-content"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="border-t border-border/20"
              >
                <div className="p-6 md:p-8 space-y-6">
                {/* Overview */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.overview}</p>
                </motion.section>

                {/* Problem Solved */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">Problem Solved</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.problemSolved}</p>
                </motion.section>

                {/* Key Features */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {project.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.section>

                {/* Tech Stack */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">Tech Stack</h4>
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
                </motion.section>

                {/* Architecture */}
                {project.architecture && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2">Architecture</h4>
                    <div className="p-4 rounded-lg bg-accent/10 border border-border/20">
                      <p className="text-sm text-muted-foreground text-center">{project.architecture}</p>
                    </div>
                  </motion.section>
                )}

                {/* Challenges & Solutions */}
                {project.challenges && project.challenges.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2">Challenges & Solutions</h4>
                    <div className="space-y-3">
                      {project.challenges.map((item, index) => (
                        <div key={index} className="p-4 rounded-lg bg-accent/10 border border-border/20">
                          <p className="text-sm font-medium text-foreground mb-1">
                            Challenge: {item.challenge}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Solution: {item.solution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Key Learnings */}
                {project.keyLearnings && project.keyLearnings.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2">Key Learnings</h4>
                    <ul className="space-y-1">
                      {project.keyLearnings.map((learning, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {learning}
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )}

                {/* Future Roadmap */}
                {project.futureRoadmap && project.futureRoadmap.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2">Future Roadmap</h4>
                    <ul className="space-y-1">
                      {project.futureRoadmap.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )}

                {/* Role */}
                {project.role && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2">Role</h4>
                    <p className="text-sm text-muted-foreground">{project.role}</p>
                  </motion.section>
                )}

                {/* Team Size */}
                {project.teamSize && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2">Team Size</h4>
                    <p className="text-sm text-muted-foreground">{project.teamSize}</p>
                  </motion.section>
                )}

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-wrap gap-3 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="cyber"
                    size="lg"
                    className="hover-lift"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(project.github, '_blank', 'noopener,noreferrer')
                    }}
                  >
                    <FaGithub className="w-5 h-5 mr-2" />
                    View on GitHub
                  </Button>
                  {project.liveDemo && (
                    <Button
                      variant="glass"
                      size="lg"
                      className="hover-lift"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.liveDemo, '_blank', 'noopener,noreferrer')
                      }}
                    >
                      <FaExternalLinkAlt className="w-5 h-5 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
)

ExpandableCard.displayName = "ExpandableCard"

export { ExpandableCard }
