"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { Project } from "@/data/projects"
import { FaGithub, FaArrowRight, FaShieldAlt, FaBrain, FaChartLine, FaLock } from "react-icons/fa"

interface FeaturedProjectShowcaseProps {
  project: Project
  onLearnMore: (project: Project) => void
  className?: string
}

const FeaturedProjectShowcase = React.forwardRef<HTMLDivElement, FeaturedProjectShowcaseProps>(
  ({ project, onLearnMore, className }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)}>
        {/* Hero-style Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl" />
          </div>

          {/* Featured Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-cyber-blue to-cyber-purple text-white font-semibold shadow-lg shadow-primary/30">
              <FaShieldAlt className="w-5 h-5" />
              ⭐ Featured Final Year Project
            </span>
          </motion.div>

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Project Name */}
              <div>
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {project.name}
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {project.tagline}
                </motion.p>
              </div>

              {/* Overview */}
              <motion.p
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {project.overview}
              </motion.p>

              {/* Key Highlights */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/20 backdrop-blur-sm">
                  <FaBrain className="w-6 h-6 text-cyber-blue" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">AI-Powered</div>
                    <div className="text-sm text-muted-foreground">ML Detection</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/20 backdrop-blur-sm">
                  <FaLock className="w-6 h-6 text-cyber-purple" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">Real-Time</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/20 backdrop-blur-sm">
                  <FaChartLine className="w-6 h-6 text-cyber-blue" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">60%</div>
                    <div className="text-sm text-muted-foreground">Less False Positives</div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button
                  variant="cyber"
                  size="lg"
                  className="hover-lift group"
                  onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
                >
                  <FaGithub className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  className="hover-lift"
                  onClick={() => onLearnMore(project)}
                >
                  Learn More
                  <FaArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative aspect-square rounded-3xl bg-linear-to-br from-background/60 to-background/30 backdrop-blur-xl border border-border/20 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-cyber-blue/10 to-cyber-purple/10"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                  {/* Icon */}
                  <motion.div
                    className="w-32 h-32 rounded-2xl bg-linear-to-r from-cyber-blue to-cyber-purple flex items-center justify-center mb-8"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaShieldAlt className="w-16 h-16 text-white" />
                  </motion.div>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-md">
                    {project.techStack.slice(0, 6).map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                        className="px-3 py-1.5 rounded-lg bg-background/50 border border-border/30 text-sm text-muted-foreground"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-tr from-cyber-blue/20 via-transparent to-cyber-purple/20" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }
)

FeaturedProjectShowcase.displayName = "FeaturedProjectShowcase"

export { FeaturedProjectShowcase }
