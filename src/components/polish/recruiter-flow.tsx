"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Recruiter journey stages
export const RECRUITER_STAGES = {
  1: "First Impression - Hero Section",
  2: "Featured Project - Credibility Check", 
  3: "Skills Assessment - Technical Fit",
  4: "GitHub Profile - Code Quality",
  5: "Certifications - Validation",
  6: "Contact - Next Steps"
}

// Recruiter flow analytics hook
export const useRecruiterAnalytics = () => {
  const [stage, setStage] = React.useState(1)
  const [timeInStage, setTimeInStage] = React.useState(0)
  const [totalTime, setTotalTime] = React.useState(0)
  const stageStartTime = React.useRef<number>(0)

  React.useEffect(() => {
    // Initialize start time on mount
    if (stageStartTime.current === 0) {
      stageStartTime.current = Date.now()
    }

    const interval = setInterval(() => {
      setTimeInStage(Date.now() - stageStartTime.current)
      setTotalTime(Date.now() - stageStartTime.current)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const advanceStage = (newStage: number) => {
    setStage(newStage)
    stageStartTime.current = Date.now()
    setTimeInStage(0)
    
    // Log for analytics
    console.log(`Recruiter advanced to stage ${newStage}: ${RECRUITER_STAGES[newStage as keyof typeof RECRUITER_STAGES]}`)
  }

  return {
    currentStage: stage,
    timeInStage,
    totalTime,
    advanceStage,
    stageProgress: (stage / Object.keys(RECRUITER_STAGES).length) * 100
  }
}

// Confidence score calculator
export const useConfidenceScore = () => {
  const [score, setScore] = React.useState(0)
  const [factors, setFactors] = React.useState<string[]>([])

  const addConfidenceFactor = (factor: string, weight: number) => {
    setScore(prev => Math.min(100, prev + weight))
    setFactors(prev => [...prev, factor])
  }

  const removeConfidenceFactor = (factor: string, weight: number) => {
    setScore(prev => Math.max(0, prev - weight))
    setFactors(prev => prev.filter(f => f !== factor))
  }

  return {
    score,
    factors,
    addConfidenceFactor,
    removeConfidenceFactor,
    confidence: score >= 80 ? "high" : score >= 60 ? "medium" : "low"
  }
}

// Credibility signals component
export const CredibilitySignals = React.forwardRef<HTMLDivElement, {
  className?: string
}>(({ className }, ref) => {
  const signals = [
    { name: "GitHub Activity", status: "active", impact: 20 },
    { name: "Recent Projects", status: "active", impact: 15 },
    { name: "Technical Skills", status: "active", impact: 15 },
    { name: "Certifications", status: "active", impact: 10 },
    { name: "Professional Layout", status: "active", impact: 10 },
  ]

  return (
    <div
      ref={ref}
      className={cn(
        "fixed top-4 right-4 z-40 p-4 rounded-xl border border-border/20 bg-background/80 backdrop-blur-xl",
        "max-w-xs space-y-2",
        className
      )}
    >
      <h4 className="text-sm font-semibold text-foreground mb-3">Credibility Signals</h4>
      {signals.map((signal, index) => (
        <motion.div
          key={signal.name}
          className="flex items-center justify-between text-xs"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="text-muted-foreground">{signal.name}</span>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              signal.status === "active" ? "bg-green-500" : "bg-muted"
            )} />
            <span className="text-cyber-blue">+{signal.impact}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
})

CredibilitySignals.displayName = "CredibilitySignals"

// Progress indicator for recruiter journey
export const RecruiterProgress = React.forwardRef<HTMLDivElement, {
  currentStage: number
  className?: string
}>(({ currentStage, className }, ref) => {
  const stages = Object.keys(RECRUITER_STAGES).length
  const progress = (currentStage / stages) * 100

  return (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-4 left-4 right-4 z-40 p-4 rounded-xl border border-border/20 bg-background/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Portfolio Journey</span>
        <span className="text-xs text-muted-foreground">{currentStage}/{stages}</span>
      </div>
      <div className="w-full bg-muted/20 rounded-full h-2">
        <motion.div
          className="bg-linear-to-r from-cyber-blue to-cyber-purple h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        {RECRUITER_STAGES[currentStage as keyof typeof RECRUITER_STAGES]}
      </div>
    </div>
  )
})

RecruiterProgress.displayName = "RecruiterProgress"

// Smart scroll navigation for recruiter flow
export const SmartScrollNav = React.forwardRef<HTMLDivElement, {
  className?: string
}>(({ className }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [currentSection, setCurrentSection] = React.useState("hero")

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 500)

      // Determine current section
      const sections = ["hero", "featured", "skills", "projects", "certifications", "contact"]
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (current) {
        setCurrentSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const sections = [
    { id: "hero", label: "Introduction", icon: "👤" },
    { id: "featured", label: "Featured Project", icon: "🚀" },
    { id: "skills", label: "Skills", icon: "💻" },
    { id: "projects", label: "All Projects", icon: "📁" },
    { id: "certifications", label: "Certifications", icon: "🏆" },
    { id: "contact", label: "Contact", icon: "📧" },
  ]

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-xl border border-border/20 bg-background/80 backdrop-blur-xl",
        "space-y-2",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
        className
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.3 }}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center text-lg transition-all duration-200",
            "hover:bg-muted/20 hover:scale-110",
            currentSection === section.id 
              ? "bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30" 
              : "text-muted-foreground"
          )}
          title={section.label}
        >
          {section.icon}
        </button>
      ))}
    </motion.div>
  )
})

SmartScrollNav.displayName = "SmartScrollNav"

// Trust builder component
export const TrustBuilder = React.forwardRef<HTMLDivElement, {
  className?: string
}>(({ className }, ref) => {
  const [visibleSignals, setVisibleSignals] = React.useState<string[]>([])

  React.useEffect(() => {
    const signals = [
      { id: "github", text: "Active GitHub Profile", delay: 1000 },
      { id: "projects", text: "10+ Completed Projects", delay: 2000 },
      { id: "skills", text: "15+ Technical Skills", delay: 3000 },
      { id: "certifications", text: "Industry Certifications", delay: 4000 },
      { id: "experience", text: "Real-world Experience", delay: 5000 },
    ]

    signals.forEach(signal => {
      setTimeout(() => {
        setVisibleSignals(prev => [...prev, signal.id])
      }, signal.delay)
    })
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "fixed top-20 right-4 z-40 p-4 rounded-xl border border-border/20 bg-background/80 backdrop-blur-xl",
        "max-w-xs space-y-3",
        className
      )}
    >
      <h4 className="text-sm font-semibold text-foreground mb-3">Trust Signals</h4>
      <div className="space-y-2">
        {[
          { id: "github", text: "Active GitHub Profile", icon: "🔥" },
          { id: "projects", text: "10+ Completed Projects", icon: "📁" },
          { id: "skills", text: "15+ Technical Skills", icon: "💻" },
          { id: "certifications", text: "Industry Certifications", icon: "🏆" },
          { id: "experience", text: "Real-world Experience", icon: "🚀" },
        ].map((signal) => (
          <motion.div
            key={signal.id}
            className={cn(
              "flex items-center gap-2 text-xs p-2 rounded-lg",
              visibleSignals.includes(signal.id) 
                ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                : "bg-muted/10 text-muted-foreground"
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: visibleSignals.includes(signal.id) ? 1 : 0,
              scale: visibleSignals.includes(signal.id) ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          >
            <span>{signal.icon}</span>
            <span>{signal.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
})

TrustBuilder.displayName = "TrustBuilder"

// Conversion optimizer for contact CTA
export const ContactOptimizer = React.forwardRef<HTMLDivElement, {
  className?: string
}>(({ className }, ref) => {
  const [urgency, setUrgency] = React.useState(0)
  const [showPrompt, setShowPrompt] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setUrgency(prev => Math.min(100, prev + 1))
    }, 1000)

    // Show prompt after 30 seconds
    setTimeout(() => {
      setShowPrompt(true)
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-4 left-4 z-40 p-4 rounded-xl border border-border/20 bg-background/80 backdrop-blur-xl",
        "max-w-xs",
        className
      )}
    >
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Ready to Connect?</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Let&apos;s discuss how I can contribute to your team
          </p>
        </div>
        
        {showPrompt && (
          <motion.div
            className="p-3 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs text-cyber-blue font-medium">
              💡 Tip: Mention my SecureNet IDS project in your message
            </p>
          </motion.div>
        )}
        
        <div className="w-full bg-muted/20 rounded-full h-2">
          <div 
            className="bg-linear-to-r from-cyber-blue to-cyber-purple h-2 rounded-full transition-all duration-1000"
            style={{ width: `${urgency}%` }}
          />
        </div>
      </div>
    </div>
  )
})

ContactOptimizer.displayName = "ContactOptimizer"

// Recruiter flow wrapper
export const RecruiterFlowProvider = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  className?: string
}>(({ children, className }, ref) => {
  const { currentStage, advanceStage } = useRecruiterAnalytics()
  const { addConfidenceFactor } = useConfidenceScore()

  // Auto-advance based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollY / maxScroll
      
      // Advance stages based on scroll progress
      if (scrollProgress > 0.8 && currentStage < 6) {
        advanceStage(6)
        addConfidenceFactor("Completed portfolio review", 20)
      } else if (scrollProgress > 0.6 && currentStage < 5) {
        advanceStage(5)
        addConfidenceFactor("Reviewed certifications", 15)
      } else if (scrollProgress > 0.4 && currentStage < 4) {
        advanceStage(4)
        addConfidenceFactor("Checked GitHub profile", 20)
      } else if (scrollProgress > 0.3 && currentStage < 3) {
        advanceStage(3)
        addConfidenceFactor("Assessed technical skills", 15)
      } else if (scrollProgress > 0.15 && currentStage < 2) {
        advanceStage(2)
        addConfidenceFactor("Viewed featured project", 20)
      } else if (scrollProgress > 0 && currentStage < 1) {
        advanceStage(1)
        addConfidenceFactor("Positive first impression", 25)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentStage, advanceStage, addConfidenceFactor])

  return (
    <div ref={ref} className={cn("recruiter-flow-provider", className)}>
      {children}
      
      {/* Recruiter UI elements */}
      <RecruiterProgress currentStage={currentStage} />
      <SmartScrollNav />
      <CredibilitySignals />
      <TrustBuilder />
      <ContactOptimizer />
    </div>
  )
})

RecruiterFlowProvider.displayName = "RecruiterFlowProvider"
