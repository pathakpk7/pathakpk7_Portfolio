"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { Project } from "@/data/projects"
import { FaGithub, FaArrowRight } from "react-icons/fa"

interface ProjectCardProps {
  project: Project
  onLearnMore: (project: Project) => void
  index: number
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, onLearnMore, index }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "relative group cursor-pointer",
          "w-full min-w-[320px] md:min-w-[380px] lg:min-w-[420px]",
          "h-[420px] md:h-[480px]",
          "rounded-3xl overflow-hidden",
          "transition-all duration-500 ease-out"
        )}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Glassmorphism Card */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-3xl",
            "bg-linear-to-br from-background/60 to-background/30",
            "backdrop-blur-xl",
            "border border-border/20",
            "transition-all duration-500",
            isHovered && "border-primary/40 shadow-2xl shadow-primary/20"
          )}
          animate={{
            scale: isHovered ? 1.02 : 1,
            rotateX: isHovered ? 2 : 0,
            rotateY: isHovered ? -2 : 0
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Screenshot Preview */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="relative w-full h-full bg-linear-to-br from-cyber-blue/10 to-cyber-purple/10">
            {/* Placeholder for screenshot */}
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
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {/* Category Badge */}
          <motion.div
            className="mb-4"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                project.featured
                  ? "bg-linear-to-r from-cyber-blue to-cyber-purple text-white"
                  : "bg-primary/10 text-primary border border-primary/20"
              )}
            >
              {project.featured ? "⭐ Featured" : 
               project.category === "final-year" ? "Final Year Project" :
               project.category === "group" ? "Group Project" : "Personal Project"}
            </span>
          </motion.div>

          {/* Project Name */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-foreground mb-2"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {project.name}
          </motion.h3>

          {/* Tagline */}
          <motion.p
            className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.tagline}
          </motion.p>

          {/* Tech Stack Icons (simplified) */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
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

          {/* Action Buttons */}
          <motion.div
            className="flex gap-3"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button
              variant="cyber"
              size="sm"
              className="flex-1 hover-lift"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.github, '_blank', 'noopener,noreferrer')
              }}
            >
              <FaGithub className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button
              variant="glass"
              size="sm"
              className="flex-1 hover-lift"
              onClick={(e) => {
                e.stopPropagation()
                onLearnMore(project)
              }}
            >
              Learn More
              <FaArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-linear-to-tr from-cyber-blue/20 via-transparent to-cyber-purple/20" />
          </motion.div>
        )}
      </motion.div>
    )
  }
)

ProjectCard.displayName = "ProjectCard"

export { ProjectCard }
