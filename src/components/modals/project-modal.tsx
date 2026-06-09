"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, ChevronRight, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectModalProps {
  project: {
    title: string
    description: string
    fullDescription: string
    github: string
    liveDemo?: string
    backendDemo?: string
    category: string
    tech: string[]
    color: string
    overview: string
    features: string[]
    challenges: string[]
    keyLearnings: string[]
    outcome: string
  }
  isOpen: boolean
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {/* Glassmorphism Modal */}
              <div className={cn(
                "relative rounded-3xl border border-border/20",
                "bg-background/60 backdrop-blur-xl",
                "shadow-2xl shadow-black/20"
              )}>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={cn(
                    "absolute top-4 right-4 z-10",
                    "w-10 h-10 rounded-full",
                    "bg-background/80 backdrop-blur-sm",
                    "border border-border/20",
                    "flex items-center justify-center",
                    "hover:bg-background transition-colors"
                  )}
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>

                {/* Modal Content */}
                <div className="p-8 space-y-8">
                  {/* Header */}
                  <div className="space-y-4">
                    <motion.div
                      className={cn(
                        "inline-block px-4 py-2 rounded-full text-sm font-medium",
                        project.color === "cyber-blue"
                          ? "bg-cyber-blue/20 text-cyber-blue"
                          : "bg-cyber-purple/20 text-cyber-purple"
                      )}
                    >
                      {project.category}
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {project.title}
                    </h2>
                    
                    <p className="text-lg text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  {/* Overview */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <ChevronRight className={cn(
                            "w-5 h-5 mt-0.5 shrink-0",
                            project.color === "cyber-blue" ? "text-cyber-blue" : "text-cyber-purple"
                          )} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-sm font-medium border",
                            project.color === "cyber-blue"
                              ? "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20"
                              : "bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20"
                          )}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Challenges</h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className={cn(
                            "w-2 h-2 mt-2 rounded-full shrink-0",
                            project.color === "cyber-blue" ? "bg-cyber-blue" : "bg-cyber-purple"
                          )} />
                          <span className="text-muted-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Learnings */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Key Learnings</h3>
                    <ul className="space-y-2">
                      {project.keyLearnings.map((learning, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className={cn(
                            "w-2 h-2 mt-2 rounded-full shrink-0",
                            project.color === "cyber-blue" ? "bg-cyber-blue" : "bg-cyber-purple"
                          )} />
                          <span className="text-muted-foreground">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Outcome</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border/20">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center justify-center space-x-2 px-6 py-3 rounded-xl",
                        "bg-linear-to-r from-cyber-blue to-cyber-purple",
                        "text-white font-medium",
                        "hover:opacity-90 transition-opacity"
                      )}
                    >
                      <GitBranch className="w-5 h-5" />
                      <span>View GitHub</span>
                    </a>
                    
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center justify-center space-x-2 px-6 py-3 rounded-xl",
                          "bg-background/80 border border-border/20",
                          "text-foreground font-medium",
                          "hover:bg-background transition-colors"
                        )}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {project.backendDemo && (
                      <a
                        href={project.backendDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center justify-center space-x-2 px-6 py-3 rounded-xl",
                          "bg-background/80 border border-border/20",
                          "text-foreground font-medium",
                          "hover:bg-background transition-colors"
                        )}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Backend Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
