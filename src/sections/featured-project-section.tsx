"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container, SectionWrapper } from "@/components/layout"
import { cn } from "@/lib/utils"

// Project data
const featuredProject = {
  title: "SecureNet IDS",
  subtitle: "Intelligent Intrusion Detection System",
  type: "Final Year Project",
  github: "https://github.com/pathakpk7/SecureNet_IDS.git",
  description: "Developed an advanced Intrusion Detection System for identifying malicious traffic, suspicious URLs, and cyber threats.",
  features: [
    "Real-time monitoring and alert visualization",
    "Integration with multiple Threat Intelligence APIs",
    "Intelligent threat analysis and pattern recognition",
    "Scalable and security-focused architecture"
  ],
  threatIntelligence: [
    "VirusTotal",
    "AbuseIPDB", 
    "URLScan.io",
    "AlienVault OTX",
    "Google Safe Browsing"
  ],
  techStack: [
    "Python", "TensorFlow", "Scikit-learn", "React", "Node.js",
    "MongoDB", "Docker", "API Integration", "Machine Learning"
  ]
}

// Premium Tech Stack Tag Component
const TechStackTag = React.forwardRef<HTMLDivElement, {
  tech: string
  index: number
  delay: number
}>(({ tech, index, delay }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay + (index * 0.08), 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative group cursor-pointer",
        "px-4 py-2 rounded-xl border",
        "bg-linear-to-br from-background/70 to-background/40",
        "backdrop-blur-md transition-all duration-500 ease-out",
        "hover:scale-110 hover:z-10",
        "border-cyber-blue/30 hover:border-cyber-blue/60 hover:shadow-cyber-blue/30"
      )}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-xl bg-linear-to-r from-cyber-blue/20 to-cyber-purple/20 opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10 flex items-center space-x-2">
        <motion.div
          className="w-6 h-6 rounded-lg bg-cyber-blue/20 text-cyber-blue flex items-center justify-center text-xs font-bold"
          animate={{
            rotate: isHovered ? [0, 10, -10, 0] : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          {tech.charAt(0)}
        </motion.div>
        
        <motion.span
          className="text-sm font-medium text-foreground"
          animate={{
            x: isHovered ? 2 : 0,
            opacity: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        >
          {tech}
        </motion.span>
      </div>
    </motion.div>
  )
})
TechStackTag.displayName = "TechStackTag"

// Premium GitHub CTA Component
const GitHubCTA = React.forwardRef<HTMLDivElement, {
  url: string
  delay: number
}>(({ url, delay }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleProjectClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      <motion.button
        onClick={handleProjectClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "relative group px-8 py-4 rounded-2xl border",
          "bg-linear-to-br from-cyber-blue/20 to-cyber-purple/20",
          "backdrop-blur-md transition-all duration-700 ease-out",
          "hover:scale-105 hover:shadow-2xl",
          "border-cyber-blue/40 hover:border-cyber-blue/60",
          "overflow-hidden"
        )}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-cyber-blue/30 to-cyber-purple/30 opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyber-blue rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
        
        <div className="relative z-10 flex items-center space-x-3">
          <motion.div
            className="w-6 h-6 bg-cyber-blue rounded-lg flex items-center justify-center"
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </motion.div>
          
          <div className="text-left">
            <motion.div
              className="text-lg font-bold text-foreground"
              animate={{ x: isHovered ? 2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Explore Repository
            </motion.div>
            <motion.div
              className="text-xs text-muted-foreground"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              View project architecture
            </motion.div>
          </div>
          
          <motion.div
            className="text-cyber-blue"
            animate={{ 
              x: isHovered ? 4 : 0,
              rotate: isHovered ? 45 : 0
            }}
            transition={{ duration: 0.4 }}
          >
            →
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  )
})
GitHubCTA.displayName = "GitHubCTA"

const FeaturedProjectSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, 'children'>
>(({ className, ...props }, ref) => {

    return (
      <SectionWrapper
        ref={ref}
        id="featured-project"
        background="cyber"
        padding="xl"
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {/* Cinematic background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-48 h-48 bg-cyber-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-cyber-purple/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-cyber-blue/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 right-1/4 w-44 h-44 bg-cyber-purple/5 rounded-full blur-2xl" />
        </div>
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/80" />

        <Container size="cinematic" className="relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Premium Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center space-y-8 mb-16"
            >
              <motion.h2
                className="text-5xl md:text-7xl font-black tracking-tight"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-linear-to-r from-cyber-blue via-cyber-purple to-cyber-blue bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                  FLAGSHIP PROJECT
                </span>
              </motion.h2>
              
              <motion.div
                className="w-40 h-1 mx-auto bg-linear-to-r from-cyber-blue to-cyber-purple rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 160 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              
              <motion.p
                className="text-xl text-muted-foreground leading-relaxed font-light max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Final Year Project showcasing advanced
                <motion.span
                  className="inline-block text-cyber-blue font-medium mx-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  cybersecurity
                </motion.span>
                expertise and
                <motion.span
                  className="inline-block text-cyber-purple font-medium mx-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  intelligent threat detection
                </motion.span>
                capabilities.
              </motion.p>
            </motion.div>

            {/* Cinematic Split-Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Project Visual */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="relative"
              >
                <div className="relative group">
                  {/* Main project card */}
                  <motion.div
                    className="relative p-8 rounded-3xl border border-cyber-blue/30 bg-linear-to-br from-background/80 to-background/40 backdrop-blur-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute -inset-4 rounded-3xl bg-linear-to-r from-cyber-blue/20 via-transparent to-cyber-purple/20 opacity-0"
                      animate={{ opacity: 0.6 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10 space-y-6">
                      {/* Project type badge */}
                      <motion.div
                        className="inline-flex px-4 py-2 rounded-full bg-cyber-blue/20 border border-cyber-blue/40"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                      >
                        <span className="text-sm font-medium text-cyber-blue">{featuredProject.type}</span>
                      </motion.div>
                      
                      {/* Project title */}
                      <motion.h3
                        className="text-3xl md:text-4xl font-bold text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                      >
                        {featuredProject.title}
                      </motion.h3>
                      
                      {/* Project subtitle */}
                      <motion.p
                        className="text-lg text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                      >
                        {featuredProject.subtitle}
                      </motion.p>
                      
                      {/* Project description */}
                      <motion.p
                        className="text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                      >
                        {featuredProject.description}
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  {/* Floating visual elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 bg-cyber-blue/20 rounded-2xl blur-xl"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-24 h-24 bg-cyber-purple/20 rounded-2xl blur-xl"
                    animate={{
                      y: [0, 10, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </div>
              </motion.div>

              {/* Right Side - Project Details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="space-y-8"
              >
                {/* Key Features */}
                <div className="space-y-4">
                  <motion.h4
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    Key Features
                  </motion.h4>
                  <div className="space-y-3">
                    {featuredProject.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 + (index * 0.1) }}
                        className="flex items-start space-x-3"
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-cyber-blue mt-2"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Threat Intelligence APIs */}
                <div className="space-y-4">
                  <motion.h4
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  >
                    Threat Intelligence APIs
                  </motion.h4>
                  <div className="grid grid-cols-2 gap-3">
                    {featuredProject.threatIntelligence.map((api, index) => (
                      <motion.div
                        key={api}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 2 + (index * 0.1) }}
                        className="px-3 py-2 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30"
                      >
                        <span className="text-sm text-cyber-purple font-medium">{api}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* GitHub CTA */}
                <GitHubCTA url={featuredProject.github} delay={2.4} />
              </motion.div>
            </div>

            {/* Tech Stack Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.6 }}
              className="mt-16 space-y-8"
            >
              <motion.h4
                className="text-2xl font-bold text-foreground text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.8 }}
              >
                Technology Stack
              </motion.h4>
              
              <div className="flex flex-wrap justify-center gap-3">
                {featuredProject.techStack.map((tech, index) => (
                  <TechStackTag
                    key={tech}
                    tech={tech}
                    index={index}
                    delay={3}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </Container>
      </SectionWrapper>
    )
  }
)
FeaturedProjectSection.displayName = "FeaturedProjectSection"

export { FeaturedProjectSection }
