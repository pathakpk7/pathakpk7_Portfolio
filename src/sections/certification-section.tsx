"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  SectionTitle, 
  AnimatedWrapper, 
  PremiumCTA,
  GradientText,
  BodyText,
  useMobileDetection
} from "@/components/polish"
import { SectionWrapper } from "@/components/layout"
import { ExternalLink, Award, Cloud, Shield, Brain, Server, Sparkles, Verified, ChevronRight } from "lucide-react"

// Certification data with IBM as featured
const certifications = [
  {
    id: "ibm-virtual-internship",
    title: "IBM Virtual Internship",
    issuer: "IBM",
    category: "AI / ML",
    date: "2024",
    featured: true,
    description: "Worked on industry-level projects involving Generative AI and emerging technologies with real-world applications.",
    skills: ["Generative AI", "Machine Learning", "Industry Projects", "Emerging Tech"],
    icon: Brain,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_ibm-generativeai-ai-share-7377722479009755136-AtlC",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: "gemini-google-workshop",
    title: "Gemini for Google Workshop",
    issuer: "Google Cloud",
    category: "AI / ML",
    date: "2024",
    featured: false,
    description: "Google Cloud + Gemini AI Workshop focused on modern cloud-integrated AI workflows and practical implementations.",
    skills: ["Google Cloud", "Gemini AI", "Cloud Integration", "AI Workflows"],
    icon: Cloud,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_certificateearned-googlecloud-geminiai-share-7368327267246166016-39ma",
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: "microsoft-ai-skills",
    title: "Microsoft AI Skill Development",
    issuer: "Microsoft",
    category: "AI / ML",
    date: "2024",
    featured: false,
    description: "Focused on AI fundamentals, productivity tools, and practical AI applications for enterprise solutions.",
    skills: ["AI Fundamentals", "Productivity Tools", "Practical AI", "Enterprise Solutions"],
    icon: Brain,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_ai-skilldevelopment-microsoft-share-7410719942708391936-lXc6",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: "cybersecurity-awareness",
    title: "Cybersecurity Awareness & Phishing Prevention",
    issuer: "Cybersecurity Institute",
    category: "Cybersecurity",
    date: "2024",
    featured: false,
    description: "Focused on phishing attack awareness, prevention techniques, and cyber safety practices for modern organizations.",
    skills: ["Phishing Awareness", "Prevention Techniques", "Cyber Safety", "Security Practices"],
    icon: Shield,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_cybersecurity-phishingawareness-phishingprevention-share-7415117133883531266-z_ax",
    color: "from-red-500 to-orange-600"
  },
  {
    id: "aws-solutions-architecture",
    title: "AWS APAC Solutions Architecture",
    issuer: "Amazon Web Services",
    category: "Cloud",
    date: "2024",
    featured: false,
    description: "Designed scalable hosting architecture using Elastic Beanstalk and cloud solutions for enterprise applications.",
    skills: ["AWS", "Solutions Architecture", "Elastic Beanstalk", "Cloud Solutions"],
    icon: Server,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_aws-cloudcomputing-solutionsarchitecture-share-7424118542628708353-2Krd",
    color: "from-orange-500 to-yellow-600"
  }
]


// Premium certification card with 3D depth and cinematic effects
const PremiumCertificationCard = React.forwardRef<HTMLDivElement, {
  certification: typeof certifications[0]
  index: number
  className?: string
}>(({ certification, index, className }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const { isMobile } = useMobileDetection()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative group",
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={!isMobile ? {
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      {/* Featured spotlight effect for IBM */}
      {certification.featured && (
        <motion.div
          className="absolute -inset-1 bg-linear-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.05 : 1
          }}
        />
      )}

      {/* Main card with 3D depth */}
      <motion.div
        className={cn(
          "relative rounded-2xl border border-border/20 bg-background/80 backdrop-blur-xl overflow-hidden",
          "transition-all duration-500 ease-out",
          certification.featured && "ring-2 ring-cyber-blue/20 ring-offset-2 ring-offset-background",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered ? "rotateY(5deg) rotateX(-5deg)" : "rotateY(0deg) rotateX(0deg)"
        }}
      >
        {/* Glowing edge effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${certification.color.replace('from-', '').replace(' to-', ', ')}, transparent)`,
            filter: "blur(20px)",
            mixBlendMode: "screen"
          }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
        />

        {/* Card content */}
        <div className="relative p-8 space-y-6">
          {/* Category tag with glow */}
          <div className="flex items-center justify-between">
            <motion.div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border",
                certification.featured 
                  ? "bg-linear-to-r from-cyber-blue/20 to-cyber-purple/20 text-cyber-blue border-cyber-blue/30"
                  : "bg-muted/20 text-muted-foreground border-border/20"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {certification.category}
            </motion.div>
            
            {/* Verified badge for featured */}
            {certification.featured && (
              <motion.div
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Verified className="w-3 h-3" />
                <span className="text-xs font-medium">Featured</span>
              </motion.div>
            )}
          </div>

          {/* Icon and title */}
          <div className="flex items-start gap-4">
            <motion.div
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center",
                "bg-linear-to-br",
                certification.featured 
                  ? "from-cyber-blue to-cyber-purple text-white shadow-lg shadow-cyber-blue/25"
                  : `${certification.color} text-white`
              )}
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
            >
              <certification.icon className="w-7 h-7" />
            </motion.div>
            
            <div className="flex-1">
              <motion.h3
                className={cn(
                  "text-xl font-bold mb-1 transition-colors duration-300",
                  certification.featured 
                    ? "text-foreground group-hover:text-cyber-blue"
                    : "text-foreground group-hover:text-cyber-blue/80"
                )}
              >
                {certification.title}
              </motion.h3>
              <motion.p
                className="text-sm text-muted-foreground"
                animate={{ opacity: isHovered ? 0.8 : 1 }}
              >
                {certification.issuer} • {certification.date}
              </motion.p>
            </div>
          </div>

          {/* Description - always visible */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {certification.description}
            </p>
          </motion.div>

          {/* Skills - always visible */}
          <motion.div
            className="flex flex-wrap gap-2 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {certification.skills.map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                className={cn(
                  "px-2 py-1 rounded-lg text-xs font-medium border",
                  certification.featured
                    ? "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20"
                    : "bg-muted/20 text-muted-foreground border-border/10"
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: skillIndex * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          {/* Verification CTA - always visible */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <PremiumCTA
              variant={certification.featured ? "primary" : "outline"}
              size="sm"
              href={certification.verificationUrl}
              external
              className="w-full"
            >
              <ChevronRight className="w-4 h-4" />
              {certification.featured ? "Explore Achievement" : "View Certificate"}
            </PremiumCTA>
          </motion.div>
        </div>

        {/* Floating particles for featured certification */}
        {certification.featured && (
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-cyber-blue rounded-full opacity-60"
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
})

PremiumCertificationCard.displayName = "PremiumCertificationCard"

const CertificationSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, 'children'>
>(({ className, ...props }, ref) => {
  const { isMobile } = useMobileDetection()
  const featuredCertification = certifications.find(cert => cert.featured)
  const otherCertifications = certifications.filter(cert => !cert.featured)

  return (
    <SectionWrapper
      ref={ref}
      id="certifications"
      background="cyber"
      padding="xl"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background/90">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.cyber.blue/8),transparent_60%)]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => {
          // Deterministic positions based on index to prevent hydration mismatch
          const positions = [
            { left: 15, top: 25 },
            { left: 85, top: 15 },
            { left: 25, top: 75 },
            { left: 75, top: 85 },
            { left: 45, top: 35 },
            { left: 65, top: 65 }
          ]
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-60"
              style={{
                left: `${positions[i]?.left}%`,
                top: `${positions[i]?.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )
        })}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Section title */}
        <AnimatedWrapper variant="fadeInUp" delay={0.2}>
          <SectionTitle centered>
            <GradientText className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl">CERTIFICATIONS</GradientText>
            <span className="block text-base sm:text-lg font-normal text-muted-foreground mt-4 max-w-2xl mx-auto">
              Industry-recognized certifications and professional development validating expertise in AI, cloud computing, and cybersecurity
            </span>
          </SectionTitle>
        </AnimatedWrapper>

        {/* Featured IBM Certification Spotlight */}
        {featuredCertification && (
          <div className="mt-16">
            <AnimatedWrapper variant="fadeInUp" delay={0.4}>
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-4 h-4 text-cyber-blue" />
                  <span className="text-sm font-medium text-cyber-blue">Featured Achievement</span>
                </motion.div>
              </div>
            </AnimatedWrapper>
            
            <div className={cn(
              "max-w-4xl mx-auto",
              !isMobile && "scale-105"
            )}>
              <PremiumCertificationCard 
                certification={featuredCertification} 
                index={0}
                className="shadow-2xl shadow-cyber-blue/20"
              />
            </div>
          </div>
        )}

        {/* Other certifications grid */}
        <div className="mt-16">
          <AnimatedWrapper variant="fadeInUp" delay={0.6}>
            <div className={cn(
              "grid gap-8",
              "grid-cols-1 md:grid-cols-2"
            )}>
              {otherCertifications.map((cert, index) => (
                <PremiumCertificationCard
                  key={cert.id}
                  certification={cert}
                  index={index + 1}
                />
              ))}
            </div>
          </AnimatedWrapper>
        </div>

        {/* Call to Action */}
        <AnimatedWrapper variant="fadeInUp" delay={0.8} className="mt-20">
          <div className="text-center">
            <motion.div
              className="inline-flex flex-col items-center space-y-6 p-8 rounded-2xl border border-border/20 bg-background/80 backdrop-blur-xl max-w-2xl mx-auto"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Award className="w-12 h-12 text-cyber-blue" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  <GradientText>Continuous Excellence</GradientText>
                </h3>
                <BodyText className="max-w-md">
                  Committed to continuous learning and staying at the forefront of technology through professional development and industry certifications.
                </BodyText>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                <PremiumCTA variant="primary" href="https://linkedin.com/in/prasoon-pathak" external className="flex-1">
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn Profile
                </PremiumCTA>
                <PremiumCTA variant="secondary" href="#contact" className="flex-1">
                  Get In Touch
                </PremiumCTA>
              </div>
            </motion.div>
          </div>
        </AnimatedWrapper>
      </div>
    </SectionWrapper>
  )
})

CertificationSection.displayName = "CertificationSection"

export { CertificationSection }
