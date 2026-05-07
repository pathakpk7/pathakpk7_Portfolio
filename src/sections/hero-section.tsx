"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { Container, SectionWrapper } from "@/components/layout"
import { HeroScene } from "@/components/3d"
import { useMousePosition } from "@/hooks"
import Image from "next/image"
import { FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa"
import { SiGithub, SiLeetcode, SiInstagram, SiGeeksforgeeks } from "react-icons/si"

// Premium quotes for rotation
const PREMIUM_QUOTES = [
  "First, solve the problem. Then, write the code.",
  "Security is not a product, but a process.",
  "Stay curious. Stay dangerous.",
  "Code is like humor. When you have to explain it, it's bad.",
  "The best way to predict the future is to invent it.",
  "Simplicity is the soul of efficiency.",
  "Innovation distinguishes between a leader and a follower.",
  "Technology is best when it brings people together.",
  "The only way to do great work is to love what you do.",
  "Think different.",
  "Security is always excessive until it's not enough.",
  "Code never lies, comments sometimes do.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "First, make it work. Then, make it fast. Then, make it beautiful.",
  "The most disastrous thing that you can ever learn is your first programming language.",
]

interface HeroSectionProps {
  className?: string;
}

const HeroSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  HeroSectionProps
>(({ className }, ref) => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = React.useState(0)
    const mousePosition = useMousePosition()
    const [isHovered, setIsHovered] = React.useState(false)

    // Quote rotation effect
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % PREMIUM_QUOTES.length)
      }, 4000) // Change quote every 4 seconds

      return () => clearInterval(interval)
    }, [])

    // Calculate mouse-follow effect for luxury feel
    const mouseX = mousePosition.clientX
    const mouseY = mousePosition.clientY
    const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0
    const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0
    const moveX = (mouseX - centerX) * 0.01
    const moveY = (mouseY - centerY) * 0.01

    return (
      <SectionWrapper
        ref={ref}
        id="home"
        className={cn("min-h-screen flex items-center justify-center relative overflow-hidden", className)}
        background="cinematic"
        animate={false}
      >
        {/* 3D Background */}
        <HeroScene className="absolute inset-0" />
        
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background/40 pointer-events-none" />
        
        {/* Content */}
        <Container size="cinematic" className="relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Content - Text */}
            <motion.div 
              className="space-y-8 lg:space-y-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                transform: `translateX(${moveX}px) translateY(${moveY}px)`
              }}
            >
              {/* Luxury Name Display */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight gradient-text-cyber text-shadow-glow"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  PRASOON
                </motion.h1>
                <motion.h1 
                  className="text-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight gradient-text-cyber text-shadow-glow"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  PATHAK
                </motion.h1>
              </div>

              {/* Random Quote Rotation */}
              <div className="h-12 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-lg md:text-xl text-muted-foreground italic font-medium"
                  >
                    {PREMIUM_QUOTES[currentQuoteIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-lg md:text-xl text-foreground font-medium"
              >
                Cybersecurity Enthusiast | Full Stack Developer | AI/ML Learner
              </motion.p>

              {/* Short Intro */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed"
              >
                Motivated Computer Science Engineering student with a Diploma background in Mechanical Engineering and strong interest in Cybersecurity, Full Stack Development, AI/ML, and Cloud Technologies.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="cyber" size="lg" className="hover-lift group">
                  <span className="relative z-10">Resume Download</span>
                  <div className="absolute inset-0 bg-linear-to-br from-cyber-blue-600 to-cyber-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                
                <Button variant="glass" size="lg" className="hover-lift">
                  Contact Me
                </Button>
                
                <Button 
                  variant="minimal" 
                  size="lg" 
                  className="hover-lift"
                  onClick={() => window.open('https://github.com/pathakpk7', '_blank', 'noopener,noreferrer')}
                >
                  <SiGithub className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                
                <Button 
                  variant="minimal" 
                  size="lg" 
                  className="hover-lift"
                  onClick={() => window.open('https://linkedin.com/in/prasoon-pathak', '_blank', 'noopener,noreferrer')}
                >
                  <FaLinkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                
                <Button 
                  variant="minimal" 
                  size="lg" 
                  className="hover-lift"
                  onClick={() => window.open('https://leetcode.com/pathakpk7', '_blank', 'noopener,noreferrer')}
                >
                  <SiLeetcode className="w-4 h-4 mr-2" />
                  LeetCode
                </Button>
                
                <Button 
                  variant="minimal" 
                  size="lg" 
                  className="hover-lift"
                  onClick={() => window.open('https://twitter.com/prasoonpathak', '_blank', 'noopener,noreferrer')}
                >
                  <FaTwitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                
                <Button 
                  variant="minimal" 
                  size="lg" 
                  className="hover-lift"
                  onClick={() => window.open('https://instagram.com/prasoonpathak', '_blank', 'noopener,noreferrer')}
                >
                  <SiInstagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                
                <Button 
                  variant="minimal" 
                  size="lg" 
                  className="hover-lift"
                  onClick={() => window.open('https://geeksforgeeks.org/pathakpk7', '_blank', 'noopener,noreferrer')}
                >
                  <SiGeeksforgeeks className="w-4 h-4 mr-2" />
                  GFG
                </Button>
                
                <Button 
                  variant="minimal" 
                  size="lg" 
                  className="hover-lift"
                  onClick={() => window.open('mailto:prasoon7pathak@gmail.com', '_blank')}
                >
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Professional Image */}
            <motion.div
              className="relative flex justify-center lg:justify-end items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                transform: `translateX(${-moveX * 0.5}px) translateY(${moveY * 0.5}px)`
              }}
            >
              {/* Image Container with Cinematic Effects */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-cyber-blue-500/20 to-cyber-purple-500/20 rounded-full blur-2xl scale-110" />
                
                {/* Main Image - Cinematic Integration */}
                <motion.div
                  className="relative w-full max-w-2xl mx-auto"
                  animate={{
                    scale: isHovered ? 1.01 : 1,
                    y: isHovered ? -5 : 0,
                  }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Soft Edge Mask Container */}
                  <div className="relative">
                    {/* Primary Image with Soft Mask */}
                    <div className="relative rounded-3xl overflow-hidden">
                      <div className="absolute inset-0 rounded-3xl">
                        <Image 
                          src="/images/profile.jpg" 
                          alt="Prasoon Pathak - Professional Headshot"
                          width={800}
                          height={600}
                          className="w-full h-[500px] object-cover rounded-3xl transition-all duration-700 group-hover:scale-105"
                          style={{ 
                            mixBlendMode: 'screen',
                            opacity: 0.92,
                            filter: 'brightness(1.1) contrast(1.15) saturate(1.05)'
                          }}
                          priority
                          unoptimized
                          loading="eager"
                        />
                      </div>
                      
                      {/* Multi-Layer Cinematic Lighting */}
                      <div className="absolute inset-0 pointer-events-none rounded-3xl">
                        {/* Primary Cyber Glow */}
                        <div className="absolute inset-0 rounded-3xl">
                          <div className="absolute inset-0 rounded-3xl bg-gradient-radial from-cyber-blue/25 via-cyber-blue/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-1500" />
                        </div>
                        
                        {/* Premium Rim Lighting */}
                        <div className="absolute inset-0 rounded-3xl">
                          <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-transparent via-cyber-purple/8 to-cyber-blue/6 opacity-70 group-hover:opacity-90 transition-opacity duration-1000" />
                        </div>
                        
                        {/* Soft Edge Fade Mask */}
                        <div className="absolute inset-0 rounded-3xl">
                          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-transparent via-cyber-blue/8 to-transparent opacity-50" />
                        </div>
                        
                        {/* Ambient Light Reflection */}
                        <div className="absolute inset-0 rounded-3xl">
                          <div className="absolute top-0 left-0 w-full h-1/3 rounded-3xl bg-linear-to-b from-white/10 via-transparent to-transparent opacity-40" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Depth Environment Layer */}
                    <div className="absolute -inset-12 pointer-events-none">
                      {/* Enhanced Ambient Particles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={`particle-${i}`}
                          className="absolute w-1.5 h-1.5 bg-cyber-blue/50 rounded-full blur-sm"
                          style={{
                            left: `${10 + (i * 7)}%`,
                            top: `${15 + (i * 6)}%`,
                          }}
                          animate={{
                            opacity: [0, 0.7, 0.3],
                            scale: [1, 1.3, 0.8],
                            y: [0, -10, 5],
                          }}
                          transition={{
                            duration: 4 + (i * 0.6),
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                      
                      {/* Cyber UI Elements */}
                      <motion.div
                        className="absolute w-40 h-40 border-2 border-cyber-blue/40 rounded-full"
                        style={{
                          left: '65%',
                          top: '75%',
                        }}
                        animate={{
                          scale: [1, 1.15, 1, 1.15],
                          opacity: [0.2, 0.35, 0.2],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      <motion.div
                        className="absolute w-32 h-32 border border-cyber-purple/35 rounded-full"
                        style={{
                          left: '20%',
                          top: '65%',
                        }}
                        animate={{
                          scale: [1, 0.85, 1],
                          opacity: [0.15, 0.3, 0.15],
                          rotate: [0, -90, -180],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <motion.div
                        className="absolute w-24 h-24 border border-cyan-500/30 rounded-full"
                        style={{
                          left: '75%',
                          top: '25%',
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.1, 0.25, 0.1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* HUD Grid Lines */}
                      <div className="absolute inset-0 rounded-3xl">
                        <div className="absolute top-1/4 left-0 w-full h-px bg-cyber-blue/20" />
                        <div className="absolute top-1/2 left-0 w-full h-px bg-cyber-blue/15" />
                        <div className="absolute top-3/4 left-0 w-full h-px bg-cyber-blue/20" />
                        <div className="absolute left-1/4 top-0 w-px h-full bg-cyber-blue/15" />
                        <div className="absolute left-1/2 top-0 w-px h-full bg-cyber-blue/20" />
                        <div className="absolute left-3/4 top-0 w-px h-full bg-cyber-blue/15" />
                      </div>
                    </div>
                    
                    {/* Premium Gradient Overlay System */}
                    <div className="absolute inset-0 pointer-events-none rounded-3xl">
                      {/* Top Fade */}
                      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-background/30 via-background/10 to-transparent" />
                      
                      {/* Bottom Fade */}
                      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background/40 via-background/15 to-transparent" />
                      
                      {/* Side Fades */}
                      <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-background/25 via-background/8 to-transparent" />
                      <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-background/25 via-background/8 to-transparent" />
                      
                      {/* Corner Enhancements */}
                      <div className="absolute top-0 left-0 w-48 h-48 bg-linear-to-br from-cyber-blue/20 via-transparent to-transparent" />
                      <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-bl from-cyber-purple/15 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-cyber-blue/15 via-transparent to-transparent" />
                      <div className="absolute bottom-0 right-0 w-48 h-48 bg-linear-to-tl from-cyber-purple/20 via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyber-blue-500 rounded-full opacity-60"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 12}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Floating ambient elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyber-purple-500 rounded-full opacity-40"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </SectionWrapper>
    )
  }
)
HeroSection.displayName = "HeroSection"

export { HeroSection }
