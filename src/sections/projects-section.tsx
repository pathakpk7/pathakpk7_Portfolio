"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Container, SectionWrapper } from "@/components/layout"
import { ProjectRail } from "@/components/projects/project-rail"
import { FeaturedProjectShowcase } from "@/components/projects/featured-project-showcase"
import { ProjectLearnMorePanel } from "@/components/projects/project-learn-more-panel"
import { projects, getFeaturedProject, getProjectsByCategory } from "@/data/projects"
import type { Project } from "@/data/projects"

const ProjectsSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, "children">
>(({ className, ...props }, ref) => {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [isPanelOpen, setIsPanelOpen] = React.useState(false)

  const featuredProject = getFeaturedProject()
  const groupProjects = getProjectsByCategory("group")
  const personalProjects = getProjectsByCategory("personal")

  const handleLearnMore = (project: Project) => {
    setSelectedProject(project)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setSelectedProject(null)
  }

  return (
    <SectionWrapper
      ref={ref}
      id="projects"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl" />
      </div>

      <Container size="cinematic" className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center space-y-8 mb-16"
        >
          <motion.h2
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-linear-to-r from-cyber-blue via-cyber-purple to-cyber-blue bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
              PROJECTS
            </span>
          </motion.h2>

          <motion.div
            className="w-40 h-1 mx-auto bg-linear-to-r from-cyber-blue to-cyber-purple rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />

          <motion.p
            className="text-xl text-muted-foreground leading-relaxed font-light max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            A showcase of innovative projects spanning cybersecurity, AI/ML, web development, and more.
          </motion.p>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-24">
            <FeaturedProjectShowcase
              project={featuredProject}
              onLearnMore={handleLearnMore}
            />
          </div>
        )}

        {/* Group Projects */}
        {groupProjects.length > 0 && (
          <div className="mb-24">
            <ProjectRail
              projects={groupProjects}
              title="Group Projects"
              onLearnMore={handleLearnMore}
            />
          </div>
        )}

        {/* Personal Projects */}
        {personalProjects.length > 0 && (
          <div className="mb-24">
            <ProjectRail
              projects={personalProjects}
              title="Personal Projects"
              onLearnMore={handleLearnMore}
            />
          </div>
        )}

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center space-x-8 px-8 py-4 rounded-2xl border border-border/20 bg-background/60 backdrop-blur-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="w-px h-8 bg-border/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{featuredProject ? 1 : 0}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="w-px h-8 bg-border/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{groupProjects.length}</div>
              <div className="text-sm text-muted-foreground">Group</div>
            </div>
            <div className="w-px h-8 bg-border/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{personalProjects.length}</div>
              <div className="text-sm text-muted-foreground">Personal</div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Learn More Panel */}
      <ProjectLearnMorePanel
        project={selectedProject}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </SectionWrapper>
  )
})

ProjectsSection.displayName = "ProjectsSection"

export { ProjectsSection }
