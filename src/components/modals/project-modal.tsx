"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, ChevronRight, GitBranch, Check, Zap, Lightbulb, Trophy, Shield, Brain, Trophy as TrophyIcon, Database, Code, Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectModalProps {
  project: {
    id: number
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

  const isVritra = project.title.includes("Vritra") || project.title.includes("SQL Murder Mystery")

  const vritraFeatures = [
    { icon: <Gamepad2 className="w-5 h-5" />, text: "🕵️ Detective Simulation" },
    { icon: <Database className="w-5 h-5" />, text: "18 Interconnected Cases" },
    { icon: <Code className="w-5 h-5" />, text: "SQL-Based Investigation System" },
    { icon: <Shield className="w-5 h-5" />, text: "Evidence Locker" },
    { icon: <Brain className="w-5 h-5" />, text: "Detective Board" },
    { icon: <Database className="w-5 h-5" />, text: "Witness Database" },
    { icon: <Shield className="w-5 h-5" />, text: "Forensics Database" },
    { icon: <TrophyIcon className="w-5 h-5" />, text: "Timeline Analysis" },
    { icon: <Zap className="w-5 h-5" />, text: "Task Force Dossier" },
    { icon: <Trophy className="w-5 h-5" />, text: "XP System" },
    { icon: <TrophyIcon className="w-5 h-5" />, text: "Rank Progression" },
    { icon: <Lightbulb className="w-5 h-5" />, text: "Achievement System" },
    { icon: <Gamepad2 className="w-5 h-5" />, text: "Story-Driven Gameplay" },
    { icon: <Code className="w-5 h-5" />, text: "Node.js Backend" },
    { icon: <Code className="w-5 h-5" />, text: "Express.js API" },
    { icon: <Database className="w-5 h-5" />, text: "PostgreSQL Database" },
    { icon: <Database className="w-5 h-5" />, text: "Supabase Integration" },
    { icon: <Brain className="w-5 h-5" />, text: "Educational SQL Learning" },
    { icon: <Code className="w-5 h-5" />, text: "Full Stack Architecture" },
  ]

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
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto"
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
                    "sticky top-4 right-4 z-10 float-right",
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
                <div className="p-6 md:p-8 space-y-8">
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

                  {/* Special Hero Section for Project Vritra */}
                  {isVritra && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={cn(
                        "relative p-6 rounded-2xl border",
                        "bg-linear-to-br from-cyber-purple/10 via-background/50 to-cyber-blue/10",
                        "border-cyber-purple/30"
                      )}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/20 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyber-blue/20 rounded-full blur-3xl" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center space-x-2 mb-4">
                          <Trophy className="w-6 h-6 text-cyber-purple" />
                          <h3 className="text-xl font-bold text-foreground">Flagship Project</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {vritraFeatures.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                              className={cn(
                                "flex items-center space-x-2 p-2 rounded-lg",
                                "bg-background/60 backdrop-blur-sm",
                                "border border-cyber-purple/20",
                                "text-sm"
                              )}
                            >
                              {feature.icon}
                              <span className="text-foreground">{feature.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Project Overview */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-cyber-blue" />
                      <span>Project Overview</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                      <ExternalLink className="w-5 h-5 text-cyber-purple" />
                      <span>Project Description</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  {/* Technology Stack */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                      <Code className="w-5 h-5 text-cyber-blue" />
                      <span>Technology Stack</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-sm font-medium border",
                            project.color === "cyber-blue"
                              ? "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20"
                              : "bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20"
                          )}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                      <Check className="w-5 h-5 text-cyber-blue" />
                      <span>Key Features</span>
                    </h3>
                    <div className="grid gap-3">
                      {project.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={cn(
                            "flex items-start space-x-3 p-3 rounded-lg",
                            "bg-background/40 backdrop-blur-sm",
                            "border border-border/10",
                            "hover:border-border/20 transition-colors"
                          )}
                        >
                          <Check className={cn(
                            "w-5 h-5 mt-0.5 shrink-0",
                            project.color === "cyber-blue" ? "text-cyber-blue" : "text-cyber-purple"
                          )} />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges Solved */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-cyber-purple" />
                      <span>Challenges Solved</span>
                    </h3>
                    <div className="grid gap-3">
                      {project.challenges.map((challenge, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={cn(
                            "flex items-start space-x-3 p-3 rounded-lg",
                            "bg-background/40 backdrop-blur-sm",
                            "border border-border/10",
                            "hover:border-border/20 transition-colors"
                          )}
                        >
                          <Zap className={cn(
                            "w-5 h-5 mt-0.5 shrink-0",
                            project.color === "cyber-blue" ? "text-cyber-blue" : "text-cyber-purple"
                          )} />
                          <span className="text-muted-foreground">{challenge}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Key Learnings */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-cyber-blue" />
                      <span>Key Learnings</span>
                    </h3>
                    <div className="grid gap-3">
                      {project.keyLearnings.map((learning, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={cn(
                            "flex items-start space-x-3 p-3 rounded-lg",
                            "bg-background/40 backdrop-blur-sm",
                            "border border-border/10",
                            "hover:border-border/20 transition-colors"
                          )}
                        >
                          <Lightbulb className={cn(
                            "w-5 h-5 mt-0.5 shrink-0",
                            project.color === "cyber-blue" ? "text-cyber-blue" : "text-cyber-purple"
                          )} />
                          <span className="text-muted-foreground">{learning}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Project Outcome */}
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className={cn(
                        "p-6 rounded-2xl border",
                        "bg-linear-to-br from-cyber-blue/10 via-background/50 to-cyber-purple/10",
                        "border-cyber-blue/30"
                      )}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <Trophy className="w-6 h-6 text-cyber-blue" />
                        <h3 className="text-xl font-bold text-foreground">Project Outcome</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.outcome}
                      </p>
                    </motion.div>
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
