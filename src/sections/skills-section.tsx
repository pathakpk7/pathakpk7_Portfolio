"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ScrollReveal, HeroParallax } from "@/components/motion"
import { Container, SectionWrapper } from "@/components/layout"
import { cn } from "@/lib/utils"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import {
  SiC, SiCplusplus, SiOpenjdk, SiJavascript, SiPython,
  SiReact, SiHtml5, SiCss, SiNodedotjs, SiTensorflow,
  SiOpencv, SiPandas, SiScikitlearn, SiMongodb, SiMysql,
  SiSqlite, SiSupabase, SiChartdotjs, SiFirebase, SiDjango,
  SiBootstrap, SiGit,
} from "react-icons/si"

const SKILL_ICON_MAP = {
  C: SiC,
  "C++": SiCplusplus,
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  Python: SiPython,
  React: SiReact,
  HTML5: SiHtml5,
  CSS3: SiCss,
  "Node.js": SiNodedotjs,
  TensorFlow: SiTensorflow,
  OpenCV: SiOpencv,
  Pandas: SiPandas,
  "Scikit-learn": SiScikitlearn,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  "SQL Server": SiMysql,
  Supabase: SiSupabase,
  "Chart.js": SiChartdotjs,
  Firebase: SiFirebase,
  Django: SiDjango,
  Bootstrap: SiBootstrap,
  Git: SiGit,
}

const skillsCategories = [
  { title: "Programming Languages", icon: "💻", color: "cyber-blue", skills: ["C","C++","Java","JavaScript","Python"], description: "Core programming foundations" },
  { title: "Frontend Development", icon: "🎨", color: "cyber-purple", skills: ["React","HTML5","CSS3"], description: "Modern web interface development" },
  { title: "Backend Development", icon: "⚙️", color: "cyber-blue", skills: ["Node.js"], description: "Server-side architecture" },
  { title: "AI / ML", icon: "🤖", color: "cyber-purple", skills: ["TensorFlow","OpenCV","Pandas","Scikit-learn"], description: "Machine learning and AI systems" },
  { title: "Database", icon: "🗄️", color: "cyber-blue", skills: ["MongoDB","MySQL","SQLite","SQL Server","Supabase"], description: "Data storage and management" },
  { title: "Data Visualization", icon: "�", color: "cyber-purple", skills: ["Chart.js"], description: "Data visualization and analytics" },
  { title: "Backend as a Service (BaaS)", icon: "☁️", color: "cyber-blue", skills: ["Firebase"], description: "Cloud backend services" },
  { title: "Framework", icon: "🏗️", color: "cyber-purple", skills: ["Django","Bootstrap"], description: "Development frameworks" },
  { title: "Version Control", icon: "🔀", color: "cyber-blue", skills: ["Git"], description: "Code versioning and collaboration" },
]

interface SkillCategoryModuleProps {
  category: typeof skillsCategories[0]
  index: number
}

const SkillCategoryModule = React.memo(({ category, index }: SkillCategoryModuleProps) => {
  const { isMobile } = useMobileOptimization()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={cn(
        "relative group",
        "p-6 rounded-xl border border-border/20",
        "bg-background/40 backdrop-blur-sm",
        "hover:bg-background/60 transition-all duration-500",
        "hover:border-border/40 hover:shadow-xl",
        "hover:shadow-cyber-blue/5"
      )}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-linear-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5"
      )} />
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "text-3xl p-3 rounded-xl",
                "bg-linear-to-br",
                category.color === "cyber-blue" 
                  ? "from-cyber-blue/20 to-cyber-blue/10" 
                  : "from-cyber-purple/20 to-cyber-purple/10"
              )}
            >
              {category.icon}
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            className={cn(
              "text-xs font-medium px-3 py-1 rounded-full",
              category.color === "cyber-blue"
                ? "bg-cyber-blue/10 text-cyber-blue"
                : "bg-cyber-purple/10 text-cyber-purple"
            )}
          >
            {category.skills.length} skills
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className={cn(
          "grid gap-2",
          isMobile ? "grid-cols-2" : "grid-cols-3"
        )}>
          {category.skills.map((skill, skillIndex) => {
            const IconComponent = SKILL_ICON_MAP[skill as keyof typeof SKILL_ICON_MAP]
            
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.1 + skillIndex * 0.05 + 0.4,
                  duration: 0.4
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md",
                  "bg-background/60 border border-border/10",
                  "hover:bg-background/80 hover:border-border/20",
                  "transition-all duration-300 cursor-pointer"
                )}
              >
                {IconComponent && (
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={cn(
                      "text-lg",
                      category.color === "cyber-blue" 
                        ? "text-cyber-blue" 
                        : "text-cyber-purple"
                    )}
                  >
                    <IconComponent />
                  </motion.div>
                )}
                <span className="text-sm font-medium text-foreground truncate">
                  {skill}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
})

SkillCategoryModule.displayName = "SkillCategoryModule"

const SkillsSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, 'children'>
>(({ className, ...props }, ref) => {

  return (
    <SectionWrapper
      ref={ref}
      id="skills"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <HeroParallax speed={0.3} className="absolute inset-0">
        <div className="absolute top-10 left-20 w-40 h-40 bg-cyber-blue/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-cyber-purple/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-cyber-blue/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-cyber-purple/5 rounded-full blur-2xl" />
      </HeroParallax>
      
      <Container size="cinematic" className="relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
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
                CAPABILITIES
              </span>
            </motion.h2>
            
            <motion.div
              className="w-32 h-1 mx-auto bg-linear-to-r from-cyber-blue to-cyber-purple rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            
            <motion.p
              className="text-xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              A comprehensive technical ecosystem spanning from
              <motion.span className="inline-block text-cyber-blue font-medium mx-2" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                cybersecurity
              </motion.span>
              to
              <motion.span className="inline-block text-cyber-purple font-medium mx-2" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                AI/ML
              </motion.span>
              , built with precision and passion.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsCategories.map((category, index) => (
              <SkillCategoryModule key={category.title} category={category} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-center"
          >
            <ScrollReveal direction="up" delay={1.6}>
              <div className="inline-flex items-center space-x-4 px-6 py-3 rounded-full border border-border/20 bg-background/60 backdrop-blur-md">
                <span className="text-sm text-muted-foreground">
                  {skillsCategories.reduce((total, cat) => total + cat.skills.length, 0)}+ Technologies
                </span>
                <span className="text-cyber-blue">&bull;</span>
                <span className="text-sm text-muted-foreground">
                  {skillsCategories.length} Expertise Areas
                </span>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  )
})

SkillsSection.displayName = "SkillsSection"

export { SkillsSection }
