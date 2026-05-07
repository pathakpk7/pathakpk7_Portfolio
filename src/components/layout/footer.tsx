"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { SOCIAL_LINKS } from "@/constants"
import { FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa"
import { SiGithub, SiLeetcode, SiInstagram, SiGeeksforgeeks } from "react-icons/si"

interface FooterProps {
  className?: string
}

// Icon mapping for social links
const ICON_MAP = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  Instagram: SiInstagram,
  LeetCode: SiLeetcode,
  GeeksforGeeks: SiGeeksforgeeks,
  Email: FaEnvelope,
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className }, ref) => {
    const currentYear = new Date().getFullYear()

    return (
      <footer
        ref={ref}
        className={cn(
          "relative overflow-hidden border-t border-border/30",
          "bg-linear-to-b from-background to-slate-950",
          className
        )}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-linear-to-br from-cyber-blue-500/20 to-cyber-purple-500/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-cyber-blue-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Brand Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-r from-cyber-blue-500 to-cyber-purple-500 rounded-lg" />
                  <div className="flex flex-col">
                    <span className="text-heading font-bold text-xl gradient-text-cyber">
                      PRASOON
                    </span>
                    <span className="text-xs text-muted-foreground tracking-wider">
                      PATHAK
                    </span>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  Cybersecurity Expert & Full Stack Developer building secure, scalable, and innovative digital solutions.
                </p>
                
                <div className="flex items-center space-x-3">
                  {SOCIAL_LINKS.map((social, index) => {
                    const IconComponent = ICON_MAP[social.name as keyof typeof ICON_MAP]
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="w-10 h-10 rounded-lg bg-background/50 border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-300"
                      >
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-heading text-lg font-semibold text-foreground">
                  Quick Links
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {["Home", "About", "Skills", "Projects", "Certifications", "Contact"].map((link, index) => (
                    <motion.a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.03 }}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-heading text-lg font-semibold text-foreground">
                  Get In Touch
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-muted-foreground text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xs">@</span>
                    </div>
                    <span>prasoon7pathak@gmail.com</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-muted-foreground text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xs">📍</span>
                    </div>
                    <span>Available Worldwide</span>
                  </div>
                </div>
                
                <Button 
                  variant="cyber" 
                  size="sm" 
                  className="hover-lift"
                  onClick={() => window.open('mailto:prasoon7pathak@gmail.com?subject=Portfolio Contact Inquiry&body=Hi Prasoon,%0D%0A%0D%0AI came across your portfolio and would like to connect with you regarding...', '_blank')}
                >
                  Send Message
                </Button>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 pt-8 border-t border-border/30"
            >
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-muted-foreground text-sm">
                  © {currentYear} Prasoon Pathak. All rights reserved.
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span className="hover:text-primary transition-colors duration-200 cursor-pointer">
                    Privacy Policy
                  </span>
                  <span className="hover:text-primary transition-colors duration-200 cursor-pointer">
                    Terms of Service
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Subtle glow effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyber-blue-500/50 to-transparent" />
      </footer>
    )
  }
)
Footer.displayName = "Footer"

export { Footer }
