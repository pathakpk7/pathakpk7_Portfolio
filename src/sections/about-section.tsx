"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GraduationCap,
  Settings,
  BookOpen,
  School,
  MapPin,
  Calendar,
  ChevronDown,
  User,
  Sparkles,
  Code2,
  Terminal,
} from "lucide-react"

import { Container, SectionWrapper } from "@/components/layout"
import { cn } from "@/lib/utils"
import { aboutData } from "@/data/about"

/* =========================================================
   EDUCATION DATA (ORIGINAL & AUTHENTIC)
   ========================================================= */

interface EducationItem {
  id: string
  title: string
  field: string
  institution: string
  location: string
  period: string
  score: string
  description: string
  accent: "blue" | "purple"
  icon: React.ComponentType<{ className?: string }>
}

const educationData: EducationItem[] = [
  {
    id: "btech",
    title: "B.Tech",
    field: "Computer Science Engineering",
    institution: "United Institute of Technology",
    location: "Prayagraj",
    period: "2024 – Present",
    score: "77.4%",
    description:
      "Building expertise in software development, data structures, databases, cybersecurity, AI/ML, and modern full-stack technologies.",
    accent: "purple",
    icon: GraduationCap,
  },
  {
    id: "diploma",
    title: "Diploma",
    field: "Mechanical Engineering",
    institution: "Chandauli Polytechnic",
    location: "Chandauli",
    period: "2021 – 2024",
    score: "76.5%",
    description:
      "Developed a strong engineering foundation through production, manufacturing, mechanical systems, and practical technical coursework.",
    accent: "blue",
    icon: Settings,
  },
  {
    id: "senior-secondary",
    title: "12th Grade",
    field: "Senior Secondary (PCM)",
    institution: "St. John's School",
    location: "Chandauli",
    period: "2019 – 2020",
    score: "65.4%",
    description:
      "Strong foundation in Physics, Chemistry, and Mathematics with focus on analytical thinking.",
    accent: "blue",
    icon: BookOpen,
  },
  {
    id: "secondary",
    title: "10th Grade",
    field: "Secondary School",
    institution: "St. John's School",
    location: "Chandauli",
    period: "2017 – 2018",
    score: "81.33%",
    description:
      "Academic performance with distinction in Mathematics and Computer Science fundamentals.",
    accent: "blue",
    icon: School,
  },
]

/* =========================================================
   COMPONENT
   ========================================================= */

const AboutSection = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function AboutSection({ className, ...props }, ref) {
    // Current degree (B.Tech) open by default
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
      new Set(["btech"])
    )

    const toggleExpand = (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }

    const expandAll = () => {
      setExpandedIds(new Set(educationData.map((e) => e.id)))
    }

    const collapseAll = () => {
      setExpandedIds(new Set())
    }

    const isAllExpanded = expandedIds.size === educationData.length

    return (
      <SectionWrapper
        ref={ref}
        id="about"
        className={cn("relative overflow-hidden py-20 sm:py-28", className)}
        {...props}
      >
        <Container className="relative z-10 max-w-6xl">
          {/* =================================================
              SECTION HEADER
              ================================================= */}
          <div className="mb-12 text-center sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-mono font-medium uppercase tracking-wider text-cyber-blue"
            >
              Get to know me
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              About &{" "}
              <span className="bg-linear-to-r from-cyber-blue via-indigo-400 to-cyber-purple bg-clip-text text-transparent">
                Education
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-3 text-sm text-muted-foreground sm:text-base"
            >
              My background and academic journey
            </motion.p>
          </div>

          {/* =================================================
              DUAL BENTO GRID
              Left: About Me / Background
              Right: Education Timeline with Click to Expand
              ================================================= */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
            {/* ===============================================
                LEFT: ABOUT ME CARD
                =============================================== */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-white/10 bg-[#0c121e]/80 p-6 sm:p-7 backdrop-blur-xl lg:col-span-5 lg:sticky lg:top-24 space-y-6 shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {aboutData.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {aboutData.role}
                  </p>
                </div>
              </div>

              {/* Bio paragraphs */}
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>{aboutData.shortIntro}</p>
                <p>{aboutData.background}</p>
              </div>

              {/* Focus Areas */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <p className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                  Focus Areas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {aboutData.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Currently Building */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <p className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                  Currently Building
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {aboutData.currentlyBuilding.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-cyber-blue/20 bg-cyber-blue/5 px-2.5 py-1 text-xs text-cyber-blue"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ===============================================
                RIGHT: EDUCATION TIMELINE (CLICK TO EXPAND)
                =============================================== */}
            <div className="lg:col-span-7 space-y-4">
              {/* Controls bar */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono text-muted-foreground">
                  Education History
                </span>
                <button
                  type="button"
                  onClick={isAllExpanded ? collapseAll : expandAll}
                  className="text-xs font-mono text-cyber-blue hover:text-cyber-blue/80 transition-colors"
                >
                  {isAllExpanded ? "Collapse All" : "Expand All"}
                </button>
              </div>

              {/* Timeline cards */}
              <div className="space-y-3">
                {educationData.map((item, index) => {
                  const isExpanded = expandedIds.has(item.id)
                  const Icon = item.icon
                  const isPurple = item.accent === "purple"

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      className={cn(
                        "rounded-xl border transition-all duration-200 overflow-hidden",
                        isExpanded
                          ? isPurple
                            ? "border-cyber-purple/40 bg-[#0f1726]/90"
                            : "border-cyber-blue/40 bg-[#0f1726]/90"
                          : "border-white/10 bg-[#0c121e]/60 hover:border-white/20 hover:bg-[#0c121e]/80"
                      )}
                    >
                      {/* Clickable Header */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="flex w-full items-center gap-3.5 p-4 sm:p-5 text-left select-none"
                        aria-expanded={isExpanded}
                      >
                        {/* Icon */}
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                            isExpanded
                              ? isPurple
                                ? "border-cyber-purple/40 bg-cyber-purple/15 text-cyber-purple"
                                : "border-cyber-blue/40 bg-cyber-blue/15 text-cyber-blue"
                              : "border-white/10 bg-white/5 text-muted-foreground"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Title & Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <h4 className="text-base font-semibold text-white">
                              {item.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              • {item.field}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground/80 truncate">
                            {item.institution}
                          </p>
                        </div>

                        {/* Right: Score + Chevron */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span
                              className={cn(
                                "text-sm font-semibold font-mono",
                                isPurple ? "text-cyber-purple" : "text-cyber-blue"
                              )}
                            >
                              {item.score}
                            </span>
                            <div className="text-[10px] text-muted-foreground">
                              {item.period}
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-muted-foreground"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/5 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 space-y-3">
                              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                                {item.description}
                              </p>

                              <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 pt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{item.location}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{item.period}</span>
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
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
