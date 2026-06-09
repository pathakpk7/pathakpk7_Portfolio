"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { Container, SectionWrapper } from "@/components/layout"
import { HeroScene } from "@/components/3d"
import { useMousePosition } from "@/hooks"
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
    const { scrollY } = useScroll()
    const imageScale = useTransform(scrollY, [0, 500], [1, 1.05])
    const imageY = useTransform(scrollY, [0, 500], [0, -20])

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

            {/* Right Content - Immersive Profile Image */}
            <motion.div
              className="relative flex justify-center lg:justify-end items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Immersive Image Container */}
              <div className="relative w-full max-w-2xl mx-auto">
                
                {/* Layer 1: Background HUD Rings (Behind Image) */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Outer rotating ring */}
                  <motion.div
                    className="absolute w-[120%] h-[120%] left-[-10%] top-[-10%]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full rounded-full border border-cyber-blue/20" />
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyber-blue/40 rounded-full -translate-x-1/2" />
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-cyber-blue/40 rounded-full -translate-x-1/2" />
                    <div className="absolute left-0 top-1/2 w-2 h-2 bg-cyber-blue/40 rounded-full -translate-y-1/2" />
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyber-blue/40 rounded-full -translate-y-1/2" />
                  </motion.div>
                  
                  {/* Inner counter-rotating ring */}
                  <motion.div
                    className="absolute w-full h-full left-0 top-0"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full rounded-full border border-cyber-purple/15 border-dashed" />
                  </motion.div>
                  
                  {/* Pulsing holographic circles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`holo-${i}`}
                      className="absolute rounded-full border border-cyber-blue/10"
                      style={{
                        width: `${80 + i * 15}%`,
                        height: `${80 + i * 15}%`,
                        left: `${10 - i * 7.5}%`,
                        top: `${10 - i * 7.5}%`,
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>

                {/* Layer 2: Scanning Grid Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-linear-to-b from-transparent via-cyber-blue/5 to-transparent"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Layer 3: Main Image with Edge Blending */}
                <motion.div 
                  className="relative"
                  style={{
                    scale: imageScale,
                    y: imageY,
                  }}
                >
                  {/* Mouse-reactive spotlight */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-3xl"
                    style={{
                      background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                    }}
                  />
                  
                  {/* Image container with mask for edge blending */}
                  <div 
                    className="relative w-full aspect-square md:aspect-3/4 lg:aspect-square"
                    style={{
                      maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 40%, transparent 80%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 40%, transparent 80%)',
                    }}
                  >
                    <Image 
                      src="/images/profile.jpg" 
                      alt="Prasoon Pathak"
                      fill
                      className="object-cover object-center"
                      style={{
                        filter: 'brightness(1.1) contrast(1.15) saturate(1.1)',
                      }}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Edge gradient overlays for seamless blending */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Radial fade from center */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(ellipse 60% 70% at 50% 50%, transparent 30%, rgba(15, 23, 42, 0.3) 70%, rgba(15, 23, 42, 0.8) 100%)',
                      }}
                    />
                    
                    {/* Corner fog effects */}
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-linear-to-br from-cyber-blue/10 via-transparent to-transparent" />
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-cyber-purple/10 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-cyber-blue/10 via-transparent to-transparent" />
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-linear-to-tl from-cyber-purple/10 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Layer 4: Ambient Particles (Multiple Parallax Layers) */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Background particles (slow) */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`bg-particle-${i}`}
                      className="absolute w-1 h-1 bg-cyber-blue/30 rounded-full"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${15 + i * 10}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 8 + i,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  
                  {/* Mid-ground particles (medium speed) */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`mid-particle-${i}`}
                      className="absolute w-1.5 h-1.5 bg-cyber-purple/40 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${25 + i * 12}%`,
                      }}
                      animate={{
                        y: [0, -25, 0],
                        x: [0, -10, 0],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 6 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  
                  {/* Foreground particles (fast, closer to viewer) */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`fg-particle-${i}`}
                      className="absolute w-2 h-2 bg-cyan-400/50 rounded-full"
                      style={{
                        left: `${30 + i * 18}%`,
                        top: `${35 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 20, 0],
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 4 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Layer 5: Cyber Scan Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={`scan-${i}`}
                      className="absolute w-full h-px bg-cyber-blue/50"
                      style={{ top: `${i * 5}%` }}
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Layer 6: Tech Nodes (Animated HUD Elements) */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`node-${i}`}
                      className="absolute w-3 h-3 border border-cyber-blue/40 rotate-45"
                      style={{
                        left: `${15 + i * 20}%`,
                        top: `${20 + i * 18}%`,
                      }}
                      animate={{
                        rotate: [45, 135, 45],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Layer 7: Rim Lighting Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0%, rgba(59, 130, 246, 0.1) 25%, transparent 50%, rgba(147, 51, 234, 0.1) 75%, transparent 100%)',
                      animation: 'spin 10s linear infinite',
                    }}
                  />
                </div>

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
