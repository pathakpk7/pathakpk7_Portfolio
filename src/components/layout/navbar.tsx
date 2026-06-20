"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { NAVIGATION } from "@/constants"

interface NavbarProps {
  className?: string
  activeSection?: string
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, activeSection }, ref) => {
    const [scrolled, setScrolled] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = (scrollY / documentHeight) * 100
        setScrollProgress(progress)
        setScrolled(scrollY > 20)
      }
      
      handleScroll()
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
      return () => {
        document.body.style.overflow = 'unset'
      }
    }, [mobileMenuOpen])

    // Handle escape key to close menu
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && mobileMenuOpen) {
          setMobileMenuOpen(false)
        }
      }
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }, [mobileMenuOpen])

    const scrollToSection = (sectionId: string) => {
      if (typeof window === "undefined") return
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setMobileMenuOpen(false)
      }
    }

    const navVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 }
    }

    return (
      <>
        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/20">
          <div 
            className="h-full bg-linear-to-r from-cyber-blue-500 to-cyber-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Premium Navbar */}
        <motion.nav
          ref={ref}
          initial="hidden"
          animate="visible"
          variants={navVariants}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
            scrolled ? "glass-strong border-border/30 backdrop-blur-xl" : "bg-transparent",
            isHovered && "glass-cyber",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Premium Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-3 group"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-linear-to-r from-cyber-blue-500 to-cyber-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-linear-to-r from-cyber-blue-500 to-cyber-purple-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-heading font-bold text-xl gradient-text-cyber">
                    PRASOON
                  </span>
                  <span className="text-xs text-muted-foreground tracking-wider">
                    PATHAK
                  </span>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {Object.entries(NAVIGATION).map(([key, label], index) => (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(key)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all duration-300",
                      "hover:text-primary hover-lift",
                      activeSection === key && "text-primary"
                    )}
                  >
                    {label}
                    {activeSection === key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyber-blue-500 to-cyber-purple-500"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:hidden p-3 rounded-lg hover:bg-accent/20 transition-colors duration-200 z-50 relative flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 flex flex-col justify-center space-y-1">
                  <motion.div
                    animate={{
                      rotate: mobileMenuOpen ? 45 : 0,
                      y: mobileMenuOpen ? 8 : 0
                    }}
                    className="w-full h-0.5 bg-foreground"
                  />
                  <motion.div
                    animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                    className="w-full h-0.5 bg-foreground"
                  />
                  <motion.div
                    animate={{
                      rotate: mobileMenuOpen ? -45 : 0,
                      y: mobileMenuOpen ? -8 : 0
                    }}
                    className="w-full h-0.5 bg-foreground"
                  />
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  
                  {/* Menu Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-80 glass-strong border-border/30 overflow-hidden"
                  >
                    <div className="h-full flex flex-col">
                      {/* Menu Header */}
                      <div className="flex items-center justify-between p-6 border-b border-border/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-linear-to-r from-cyber-blue-500 to-cyber-purple-500 rounded-lg" />
                          <span className="text-heading font-bold text-lg gradient-text-cyber">
                            Menu
                          </span>
                        </div>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-2">
                        {Object.entries(NAVIGATION).map(([key, label], index) => (
                          <motion.button
                            key={key}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => scrollToSection(key)}
                            className={cn(
                              "block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-accent/20 transition-all duration-200 font-medium rounded-lg text-lg",
                              activeSection === key && "text-primary bg-primary/10"
                            )}
                          >
                            {label}
                          </motion.button>
                        ))}
                      </div>
                      
                      {/* Menu Footer */}
                      <div className="p-6 border-t border-border/20">
                        <p className="text-sm text-muted-foreground text-center">
                          © 2024 Prasoon Pathak
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </>
    )
  }
)
Navbar.displayName = "Navbar"

export { Navbar }
