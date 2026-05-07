"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/motion"
import { Container, SectionWrapper } from "@/components/layout"
import { cn } from "@/lib/utils"

// Premium Education Card Component
const EducationCard = React.forwardRef<HTMLDivElement, {
  degree: string
  institution: string
  period: string
  delay: number
  reverse?: boolean
  percentage?: string
  additionalInfo?: string
}>(({ degree, institution, period, delay, reverse = false, percentage, additionalInfo }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: delay * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative group cursor-pointer",
        "p-8 rounded-2xl border border-border/20",
        "bg-linear-to-br from-background/80 to-background/40",
        "backdrop-blur-xl",
        "transition-all duration-700 ease-out",
        "hover:scale-[1.02] hover:border-cyber-blue/30",
        "hover:shadow-2xl hover:shadow-cyber-blue/20"
      )}
    >
      {/* Subtle glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700",
        "bg-linear-to-br from-cyber-blue/10 to-cyber-purple/10",
        isHovered && "opacity-100"
      )} />
      
      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold text-foreground"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {degree}
          </motion.div>
          <motion.div
            className="px-3 py-1 rounded-full bg-linear-to-r from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-medium text-cyber-blue">{period}</span>
          </motion.div>
        </div>
        
        <motion.div
          className="text-lg text-muted-foreground"
          animate={{ 
            y: isHovered ? -2 : 0,
            opacity: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          {institution}
        </motion.div>
        
        {percentage && (
          <motion.div
            className="text-sm font-medium text-cyber-blue"
            animate={{ 
              y: isHovered ? -1 : 0,
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
          >
            📊 {percentage}
          </motion.div>
        )}
        
        {/* Hidden detail revealed on hover */}
        <motion.div
          className="text-sm text-muted-foreground/70 italic"
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {additionalInfo || "Building foundation for advanced technical expertise"}
        </motion.div>
      </div>
    </motion.div>
  )
})
EducationCard.displayName = "EducationCard"

// Premium Focus Area Tag Component
const FocusAreaTag = React.forwardRef<HTMLDivElement, {
  title: string
  icon: string
  delay: number
  index: number
}>(({ title, icon, delay, index }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay + (index * 0.1), 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative group cursor-pointer",
        "px-6 py-3 rounded-full border",
        "bg-linear-to-r from-background/60 to-background/40",
        "backdrop-blur-md border-cyber-blue/20",
        "transition-all duration-500 ease-out",
        "hover:scale-110 hover:border-cyber-blue/50",
        "hover:shadow-lg hover:shadow-cyber-blue/30"
      )}
    >
      {/* Floating particle effect */}
      <motion.div
        className="absolute -inset-1 rounded-full bg-linear-to-r from-cyber-blue/20 to-cyber-purple/20 opacity-0"
        animate={{
          opacity: isHovered ? [0, 0.5, 0] : 0,
          scale: isHovered ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10 flex items-center space-x-2">
        <motion.span
          className="text-lg"
          animate={{ 
            rotate: isHovered ? [0, 10, -10, 0] : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.span>
        <motion.span
          className="text-sm font-medium text-foreground"
          animate={{ 
            x: isHovered ? 2 : 0,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.span>
      </div>
    </motion.div>
  )
})
FocusAreaTag.displayName = "FocusAreaTag"

const AboutSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, 'children'>
>(({ className, ...props }, ref) => {

    return (
      <SectionWrapper
        ref={ref}
        id="about"
        background="cyber"
        padding="xl"
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {/* Cinematic background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyber-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyber-purple/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyber-blue/5 rounded-full blur-2xl" />
        </div>

        <Container size="cinematic" className="relative z-10">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Premium Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center space-y-6"
            >
              <motion.h2
                className="text-5xl md:text-7xl font-black tracking-tight"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-linear-to-r from-cyber-blue via-cyber-purple to-cyber-blue bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                  IDENTITY
                </span>
              </motion.h2>
              <motion.div
                className="w-32 h-1 mx-auto bg-linear-to-r from-cyber-blue to-cyber-purple rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </motion.div>

            {/* Identity Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-12"
            >
              <ScrollReveal direction="up" delay={0.8}>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto text-center">
                  Motivated Computer Science Engineering student with a Diploma background in Mechanical Engineering and strong interest in building
                  <motion.span
                    className="inline-block text-cyber-blue font-medium mx-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    secure
                  </motion.span>
                  ,
                  <motion.span
                    className="inline-block text-cyber-purple font-medium mx-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    scalable
                  </motion.span>
                  , and impactful real-world technology solutions.
                </p>
              </ScrollReveal>
            </motion.div>

            {/* Education Section - Luxury Timeline */}
            <div className="space-y-8">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-3xl font-bold text-foreground"
              >
                Education
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EducationCard
                  degree="B.Tech in Computer Science Engineering"
                  institution="United Institute of Technology"
                  period="2024 – Present"
                  delay={1}
                  percentage="77.4%"
                />
                <EducationCard
                  degree="Diploma in Mechanical Engineering"
                  institution="Chandauli Polytechnic"
                  period="2021 – 2024"
                  delay={2}
                  reverse
                  percentage="76.5%"
                />
                <EducationCard
                  degree="Class 12 - Intermediate"
                  institution="St. John's School, Chandauli"
                  period="2019 – 2020"
                  delay={3}
                  percentage="65.4%"
                  additionalInfo="Strong foundation in Physics, Chemistry, and Mathematics with focus on analytical thinking"
                />
                <EducationCard
                  degree="Class 10 - High School"
                  institution="St. John's School, Chandauli"
                  period="2017 – 2018"
                  delay={4}
                  reverse
                  percentage="81.33%"
                  additionalInfo="Excellent academic performance with distinction in Mathematics and Computer Science fundamentals"
                />
              </div>
            </div>

            {/* Focus Areas - Interactive Floating Tags */}
            <div className="space-y-8">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-3xl font-bold text-foreground"
              >
                Focus Areas
              </motion.h3>
              
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { title: "Cybersecurity", icon: "🔒", delay: 1.6 },
                  { title: "Threat Intelligence", icon: "🛡️", delay: 1.7 },
                  { title: "Full Stack Development", icon: "💻", delay: 1.8 },
                  { title: "AI/ML", icon: "🤖", delay: 1.9 },
                  { title: "Cloud Security", icon: "☁️", delay: 2.0 },
                ].map((area, index) => (
                  <FocusAreaTag
                    key={area.title}
                    title={area.title}
                    icon={area.icon}
                    delay={area.delay}
                    index={index}
                  />
                ))}
              </div>
            </div>

          </div>
        </Container>
      </SectionWrapper>
    )
  }
)
AboutSection.displayName = "AboutSection"

export { AboutSection }
