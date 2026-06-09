"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillModalProps {
  skill: string
  category: string
  description: string
  concepts: string[]
  whereUsed: string[]
  relatedProjects: string[]
  isOpen: boolean
  onClose: () => void
}

export const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  category,
  description,
  concepts,
  whereUsed,
  relatedProjects,
  isOpen,
  onClose
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Glassmorphism Modal */}
              <div className={cn(
                "relative rounded-3xl border border-border/20",
                "bg-background/60 backdrop-blur-xl",
                "shadow-2xl shadow-black/20"
              )}>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={cn(
                    "absolute top-4 right-4 z-10",
                    "w-10 h-10 rounded-full",
                    "bg-background/80 backdrop-blur-sm",
                    "border border-border/20",
                    "flex items-center justify-center",
                    "hover:bg-background transition-colors"
                  )}
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>

                {/* Modal Content */}
                <div className="p-8 space-y-6">
                  {/* Header */}
                  <div className="space-y-3">
                    <motion.div
                      className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-cyber-blue/20 text-cyber-blue"
                    >
                      {category}
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {skill}
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Concepts */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Key Concepts</h3>
                    <ul className="space-y-2">
                      {concepts.map((concept, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <ChevronRight className="w-5 h-5 mt-0.5 text-cyber-blue flex-shrink-0" />
                          <span className="text-muted-foreground">{concept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Where Used */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Where Used</h3>
                    <ul className="space-y-2">
                      {whereUsed.map((usage, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="w-2 h-2 mt-2 rounded-full bg-cyber-purple flex-shrink-0" />
                          <span className="text-muted-foreground">{usage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Projects */}
                  {relatedProjects.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">Related Projects</h3>
                      <div className="space-y-2">
                        {relatedProjects.map((project, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/10 hover:border-border/20 transition-colors"
                          >
                            <span className="text-foreground font-medium">{project}</span>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
