"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container, SectionWrapper } from "@/components/layout"
import { cn } from "@/lib/utils"

// Projects data
const personalProjects = [
  {
    id: 1,
    title: "Incident Response Projects",
    description: "Built hands-on incident response projects covering phishing, malware, and network attacks.",
    fullDescription: "Performed phishing email analysis, malicious URL detection, malware analysis, IOC detection, and network traffic monitoring using Wireshark and Snort.",
    github: "https://github.com/pathakpk7/Incident-Response-Projects.git",
    category: "Cybersecurity",
    tech: ["Wireshark", "Snort", "Network Analysis", "IOC Detection"],
    color: "cyber-blue",
    featured: true
  },
  {
    id: 2,
    title: "Fake News Detector",
    description: "Developed an AI-based fake news detection system using NLP and Machine Learning.",
    fullDescription: "Built an intelligent news classifier and automated fake news prediction engine focused on identifying misleading and false news content.",
    github: "https://github.com/pathakpk7/Fake_news_Detector.git",
    category: "AI/ML",
    tech: ["Python", "NLP", "Machine Learning", "TensorFlow", "Scikit-learn"],
    color: "cyber-purple",
    featured: true
  },
  {
    id: 3,
    title: "VSBH Cricket League",
    description: "Developed a cricket league management platform for teams, matches, scores, and player registration.",
    fullDescription: "Built comprehensive tournament fixtures and updates system using HTML, CSS, and JavaScript for smooth league management.",
    github: "https://github.com/pathakpk7/vsbh-cricleague.git",
    category: "Web Development",
    tech: ["HTML", "CSS", "JavaScript", "Tournament Management"],
    color: "cyber-blue",
    featured: false
  },
  {
    id: 4,
    title: "Online Book Store",
    description: "Developed a complete online bookstore platform for browsing, searching, and purchasing books.",
    fullDescription: "Created clean and user-friendly interface for seamless book discovery and purchasing experience with advanced search capabilities.",
    github: "https://github.com/pathakpk7/Online_Book_Store.git",
    category: "Web Development",
    tech: ["HTML", "CSS", "JavaScript", "E-commerce"],
    color: "cyber-purple",
    featured: false
  },
  {
    id: 5,
    title: "Currency Converter",
    description: "Built a real-time multi-currency exchange calculator for fast and accurate currency conversion.",
    fullDescription: "Implemented real-time exchange rate API integration with responsive design for accurate and instant currency conversion.",
    github: "https://github.com/pathakpk7/Currency_converter.git",
    category: "Utility",
    tech: ["JavaScript", "API Integration", "Real-time Data"],
    color: "cyber-blue",
    featured: false
  },
  {
    id: 6,
    title: "Food Order and Delivery System",
    description: "Developed an online food ordering and delivery platform for restaurants and customers.",
    fullDescription: "Built smooth ordering experience with restaurant management, order tracking, and delivery coordination features.",
    github: "https://github.com/pathakpk7/Food-order-and-delivery.git",
    category: "Web Development",
    tech: ["HTML", "CSS", "JavaScript", "Order Management"],
    color: "cyber-purple",
    featured: false
  }
]

// Premium 3D Project Card Component
const ProjectCard = React.forwardRef<HTMLDivElement, {
  project: typeof personalProjects[0]
  index: number
  delay: number
}>(({ project, index, delay }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [showDetails, setShowDetails] = React.useState(false)
  const handleProjectClick = () => {
    window.open(project.github, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: delay + (index * 0.1), 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={cn(
        "relative group cursor-pointer",
        "transition-all duration-700 ease-out",
        isHovered ? "z-20" : "z-10"
      )}
    >
      {/* Main 3D Card */}
      <motion.div
        className={cn(
          "relative p-6 rounded-2xl border",
          "bg-linear-to-br from-background/80 to-background/40",
          "backdrop-blur-xl transition-all duration-700 ease-out",
          project.color === "cyber-blue"
            ? "border-cyber-blue/30 hover:border-cyber-blue/60"
            : "border-cyber-purple/30 hover:border-cyber-purple/60"
        )}
        whileHover={{
          scale: 1.05,
          rotateX: -5,
          rotateY: 5,
          y: -10,
          z: 50,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        {/* Premium glow effect */}
        <motion.div
          className={cn(
            "absolute -inset-4 rounded-2xl opacity-0 transition-opacity duration-700",
            project.color === "cyber-blue"
              ? "bg-linear-to-r from-cyber-blue/30 via-transparent to-cyber-purple/20"
              : "bg-linear-to-r from-cyber-purple/30 via-transparent to-cyber-blue/20"
          )}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        
        {/* Featured badge */}
        {project.featured && (
          <motion.div
            className="inline-flex px-3 py-1 rounded-full bg-linear-to-r from-cyber-blue to-cyber-purple text-white text-xs font-bold"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: delay + 0.3 }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
          >
            FEATURED
          </motion.div>
        )}
        
        <div className="relative z-10 space-y-4">
          {/* Project header */}
          <div className="space-y-2">
            <motion.div
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-medium",
                project.color === "cyber-blue"
                  ? "bg-cyber-blue/20 text-cyber-blue"
                  : "bg-cyber-purple/20 text-cyber-purple"
              )}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {project.category}
            </motion.div>
            
            <motion.h3
              className="text-xl font-bold text-foreground"
              animate={{
                x: isHovered ? 4 : 0,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              {project.title}
            </motion.h3>
          </div>
          
          {/* Project description */}
          <motion.div
            className="space-y-2"
            animate={{
              height: showDetails ? "auto" : "60px",
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              className="text-muted-foreground text-sm leading-relaxed"
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            >
              {showDetails ? project.fullDescription : project.description}
            </motion.p>
          </motion.div>
          
          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, showDetails ? project.tech.length : 3).map((tech, techIndex) => (
              <motion.div
                key={tech}
                className={cn(
                  "px-2 py-1 rounded-lg text-xs font-medium",
                  project.color === "cyber-blue"
                    ? "bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20"
                    : "bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: delay + 0.5 + (techIndex * 0.05) 
                }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
              >
                {tech}
              </motion.div>
            ))}
            {!showDetails && project.tech.length > 3 && (
              <motion.div
                className="px-2 py-1 rounded-lg text-xs font-muted-foreground"
                animate={{
                  opacity: isHovered ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              >
                +{project.tech.length - 3} more
              </motion.div>
            )}
          </div>
          
          {/* GitHub CTA */}
          <motion.div
            className="pt-2"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleProjectClick}
              className={cn(
                "w-full px-4 py-3 rounded-xl border transition-all duration-500",
                "bg-linear-to-br from-background/60 to-background/30",
                "backdrop-blur-md flex items-center justify-center space-x-2",
                project.color === "cyber-blue"
                  ? "border-cyber-blue/40 hover:border-cyber-blue/60 hover:bg-cyber-blue/10"
                  : "border-cyber-purple/40 hover:border-cyber-purple/60 hover:bg-cyber-purple/10"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-4 h-4 rounded bg-current"
                animate={{
                  rotate: isHovered ? 360 : 0,
                }}
                transition={{ duration: 0.6 }}
                style={{
                  background: project.color === "cyber-blue" ? "#3b82f6" : "#a855f7"
                }}
              />
              <motion.span
                className="text-sm font-medium"
                animate={{
                  x: isHovered ? 2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                View Project
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "absolute w-1 h-1 rounded-full",
                  project.color === "cyber-blue" ? "bg-cyber-blue" : "bg-cyber-purple"
                )}
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
      </motion.div>
      
      {/* Hidden detail reveal button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          setShowDetails(!showDetails)
        }}
        className={cn(
          "absolute bottom-2 right-2 w-8 h-8 rounded-full border transition-all duration-300",
          "bg-background/80 backdrop-blur-sm flex items-center justify-center",
          project.color === "cyber-blue"
            ? "border-cyber-blue/40 hover:border-cyber-blue/60"
            : "border-cyber-purple/40 hover:border-cyber-purple/60"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: showDetails ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-4 h-0.5 bg-current"
          style={{
            background: project.color === "cyber-blue" ? "#3b82f6" : "#a855f7"
          }}
        />
      </motion.button>
    </motion.div>
  )
})
ProjectCard.displayName = "ProjectCard"

const PersonalProjectsSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, 'children'>
>(({ className, ...props }, ref) => {

    // Separate featured and regular projects
    const featuredProjects = personalProjects.filter(p => p.featured)
    const regularProjects = personalProjects.filter(p => !p.featured)

    return (
      <SectionWrapper
        ref={ref}
        id="personal-projects"
        background="cinematic"
        padding="xl"
        className={cn("relative overflow-hidden", className)}
        {...(props as Omit<React.HTMLAttributes<HTMLElement>, 'id' | 'className'>)}
      >
        {/* Cinematic background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-cyber-blue/8 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-cyber-purple/8 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-cyber-blue/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-cyber-purple/5 rounded-full blur-2xl" />
        </div>

        <Container size="cinematic" className="relative z-10">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Premium Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center space-y-8"
            >
              <motion.h2
                className="text-5xl md:text-7xl font-black tracking-tight"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-linear-to-r from-cyber-blue via-cyber-purple to-cyber-blue bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                  PROJECT GALLERY
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
                A curated collection of
                <motion.span
                  className="inline-block text-cyber-blue font-medium mx-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  innovative projects
                </motion.span>
                showcasing expertise in
                <motion.span
                  className="inline-block text-cyber-purple font-medium mx-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  cybersecurity, AI/ML, and web development
                </motion.span>
                .
              </motion.p>
            </motion.div>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="space-y-8"
              >
                <motion.h3
                  className="text-2xl font-bold text-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Featured Projects
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      delay={1.2}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Regular Projects */}
            {regularProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="space-y-8"
              >
                <motion.h3
                  className="text-2xl font-bold text-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  More Projects
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index + featuredProjects.length}
                      delay={2}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.4 }}
              className="text-center"
            >
              <motion.div
                className="inline-flex items-center space-x-6 px-8 py-4 rounded-2xl border border-border/20 bg-background/60 backdrop-blur-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{personalProjects.length}</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </div>
                <div className="w-px h-8 bg-border/30" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{featuredProjects.length}</div>
                  <div className="text-sm text-muted-foreground">Featured</div>
                </div>
                <div className="w-px h-8 bg-border/30" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {[...new Set(personalProjects.map(p => p.category))].length}
                  </div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </SectionWrapper>
    )
  }
)
PersonalProjectsSection.displayName = "PersonalProjectsSection"

export { PersonalProjectsSection }
