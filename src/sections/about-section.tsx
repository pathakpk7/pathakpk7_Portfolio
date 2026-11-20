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
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Terminal,
  Cpu,
  ShieldCheck,
  Layers,
  Code2,
  Flame,
  Binary,
  Compass,
} from "lucide-react"

import { Container, SectionWrapper } from "@/components/layout"
import { cn } from "@/lib/utils"

/* =========================================================
   TYPES & DATA
   ========================================================= */

interface EducationMilestone {
  id: string
  stage: string
  degree: string
  field: string
  institution: string
  location: string
  period: string
  score: string
  scoreLabel: string
  statusBadge: string
  statusType: "active" | "completed"
  accent: "blue" | "purple"
  icon: React.ComponentType<{ className?: string }>
  summary: string
  coursework: string[]
  keyAchievement: string
}

const educationMilestones: EducationMilestone[] = [
  {
    id: "btech",
    stage: "STAGE 04",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    institution: "United Institute of Technology",
    location: "Prayagraj, Uttar Pradesh",
    period: "2024 – Present",
    score: "77.4%",
    scoreLabel: "Current Aggregate",
    statusBadge: "Currently Pursuing",
    statusType: "active",
    accent: "purple",
    icon: GraduationCap,
    summary:
      "Deepening computer science engineering fundamentals with an emphasis on full-stack architecture, distributed systems, artificial intelligence pipelines, and cybersecurity defensive patterns. Actively building production-grade web applications and developer tools.",
    coursework: [
      "Data Structures & Algorithms",
      "Full-Stack Web Architecture",
      "AI & Machine Learning",
      "Cybersecurity & Threat Detection",
      "Database Management & SQL",
      "Operating & Distributed Systems",
    ],
    keyAchievement:
      "Maintaining a strong 77.4% academic standing while building and deploying full-stack web and cybersecurity projects.",
  },
  {
    id: "diploma",
    stage: "STAGE 03",
    degree: "Diploma in Engineering",
    field: "Mechanical Engineering (Production)",
    institution: "Chandauli Polytechnic",
    location: "Chandauli, Uttar Pradesh",
    period: "2021 – 2024",
    score: "76.5%",
    scoreLabel: "First Class with Distinction",
    statusBadge: "Graduated with Honors",
    statusType: "completed",
    accent: "blue",
    icon: Settings,
    summary:
      "Gained comprehensive engineering discipline through physical systems, precision design, manufacturing workflows, and applied mechanics. This hands-on engineering background formed the blueprint for my transition into software systems and architecture.",
    coursework: [
      "Engineering Mechanics",
      "Manufacturing & Production Systems",
      "Industrial Automation",
      "CAD / Precision Modeling",
      "Applied Mathematics",
      "Quality Control & Systems Design",
    ],
    keyAchievement:
      "Bridged physical engineering principles with modern software paradigms, bringing unique problem-solving rigor to software design.",
  },
  {
    id: "senior-secondary",
    stage: "STAGE 02",
    degree: "12th Grade (Senior Secondary)",
    field: "Physics, Chemistry & Mathematics (PCM)",
    institution: "St. John's School",
    location: "Chandauli, Uttar Pradesh",
    period: "2019 – 2020",
    score: "65.4%",
    scoreLabel: "Board Aggregate",
    statusBadge: "Completed",
    statusType: "completed",
    accent: "blue",
    icon: BookOpen,
    summary:
      "Cultivated analytical rigor and mathematical problem-solving under an intensive science and mathematics curriculum. Built solid foundations in calculus, mechanics, and physical principles.",
    coursework: [
      "Advanced Calculus & Algebra",
      "Classical & Modern Physics",
      "Inorganic & Physical Chemistry",
      "Analytical Reasoning",
    ],
    keyAchievement:
      "Developed mathematical discipline and logical decomposition skills essential for algorithm design and computational logic.",
  },
  {
    id: "secondary",
    stage: "STAGE 01",
    degree: "10th Grade (Secondary Certificate)",
    field: "Secondary School Curriculum",
    institution: "St. John's School",
    location: "Chandauli, Uttar Pradesh",
    period: "2017 – 2018",
    score: "81.33%",
    scoreLabel: "Distinction Honors",
    statusBadge: "Distinction Honors",
    statusType: "completed",
    accent: "blue",
    icon: School,
    summary:
      "Established foundational academic excellence with distinction in Mathematics and Computer Science fundamentals, sparking an early and lifelong passion for computers and technology.",
    coursework: [
      "High School Mathematics",
      "Computer Science Fundamentals",
      "General Science & Physics",
      "Communication & Humanities",
    ],
    keyAchievement:
      "Graduated with 81.33% distinction, earning highest academic marks in Mathematics and early computing coursework.",
  },
]

const quickStats = [
  { label: "Academic Journey", value: "8+ Years", detail: "Continuous Engineering Growth" },
  { label: "Engineering Disciplines", value: "Mechanical → CS", detail: "Unique Cross-Disciplinary Edge" },
  { label: "Projects Shipped", value: "15+ Apps", detail: "Full-Stack, AI & Cyber" },
  { label: "Current Specialization", value: "B.Tech CSE", detail: "Prayagraj, UP" },
]

const corePillars = [
  { title: "Full-Stack Architecture", icon: Code2, desc: "Modern React, Next.js, Node.js & Scalable APIs" },
  { title: "AI & GenAI Integration", icon: Cpu, desc: "Gemini API, LLM orchestrations & automation" },
  { title: "Cybersecurity & Defenses", icon: ShieldCheck, desc: "Security-first mindset & threat awareness" },
  { title: "System Decomposition", icon: Layers, desc: "Mechanical precision applied to software design" },
]

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const AboutSection = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function AboutSection({ className, ...props }, ref) {
    // Keep B.Tech (index 0 in reverse-chrono) expanded by default for immediate visual richness
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
      setExpandedIds(new Set(educationMilestones.map((m) => m.id)))
    }

    const collapseAll = () => {
      setExpandedIds(new Set())
    }

    const isAllExpanded = expandedIds.size === educationMilestones.length

    return (
      <SectionWrapper
        ref={ref}
        id="about"
        className={cn("relative overflow-hidden py-24 sm:py-32", className)}
        {...props}
      >
        {/* Ambient background atmosphere */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyber-blue/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-cyber-purple/10 blur-[120px]" />

        <Container className="relative z-10 max-w-7xl">
          {/* =================================================
              SECTION HEADER
              ================================================= */}
          <div className="mb-14 text-center sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 px-4 py-1.5 text-xs font-mono tracking-wider text-cyber-blue uppercase backdrop-blur-md"
            >
              <Terminal className="h-3.5 w-3.5 animate-pulse text-cyber-blue" />
              <span>// 02. DOSSIER & ACADEMIC JOURNEY</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Engineering Mindset.{" "}
              <span className="bg-linear-to-r from-cyber-blue via-indigo-400 to-cyber-purple bg-clip-text text-transparent">
                Academic Rigor.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              From mechanical manufacturing precision to modern computer science, full-stack architecture, and cybersecurity.
            </motion.p>
          </div>

          {/* =================================================
              DUAL BENTO GRID
              Left: Developer Profile Dossier (5 cols)
              Right: Interactive Timeline with Click-to-Expand (7 cols)
              ================================================= */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* ===============================================
                LEFT COLUMN: DEVELOPER DOSSIER BENTO
                =============================================== */}
            <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-24">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1420]/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
              >
                {/* Glow accent */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyber-blue/15 blur-3xl" />

                {/* Status beacon */}
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono text-emerald-400 tracking-wide uppercase">
                      Active Scholar & Builder
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground/60">
                    ID: PP-CSE-2026
                  </span>
                </div>

                {/* Bio text */}
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Prasoon Pathak
                </h3>
                <p className="mt-1 text-sm font-medium text-cyber-blue">
                  Computer Science Student & Full-Stack Developer
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  I combine an analytical engineering background with hands-on software development. Having started in Mechanical Engineering before transitioning into Computer Science, I bring structured systems thinking, physical tolerances discipline, and algorithmic problem-solving to every piece of software I design.
                </p>

                {/* Core focus pillars */}
                <div className="mt-6 space-y-3 pt-4 border-t border-white/10">
                  <div className="text-xs font-mono tracking-wider text-muted-foreground/80 uppercase">
                    Core Technical Pillars
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {corePillars.map((pillar) => {
                      const Icon = pillar.icon
                      return (
                        <div
                          key={pillar.title}
                          className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 transition-colors hover:border-cyber-blue/30 hover:bg-white/[0.04]"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyber-blue/10 text-cyber-blue">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-medium text-slate-200">
                            {pillar.title}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Terminal approach signature */}
                <div className="mt-6 rounded-xl border border-white/10 bg-[#080d14]/90 p-3.5 font-mono text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground/60 mb-1.5 text-[11px]">
                    <Binary className="h-3.5 w-3.5 text-cyber-purple" />
                    <span>PHILOSOPHY.config</span>
                  </div>
                  <div className="text-emerald-400">
                    <span className="text-pink-400">const</span> approach = [
                    <span className="text-cyber-blue">&quot;Learn&quot;</span>,{" "}
                    <span className="text-cyber-blue">&quot;Build&quot;</span>,{" "}
                    <span className="text-cyber-blue">&quot;Experiment&quot;</span>,{" "}
                    <span className="text-cyber-blue">&quot;Improve&quot;</span>];
                  </div>
                </div>
              </motion.div>

              {/* Quick stats bento cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="grid grid-cols-2 gap-3"
              >
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-[#0d1420]/60 p-4 backdrop-blur-md transition-all hover:border-cyber-blue/20"
                  >
                    <div className="text-[11px] font-mono text-muted-foreground uppercase">
                      {stat.label}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-muted-foreground/80 mt-0.5 truncate">
                      {stat.detail}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ===============================================
                RIGHT COLUMN: INTERACTIVE MILESTONES (CLICK TO EXPAND)
                =============================================== */}
            <div className="lg:col-span-7">
              {/* Milestone controls bar */}
              <div className="mb-6 flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Compass className="h-4 w-4 text-cyber-blue" />
                  <span>Interactive Academic Chronology</span>
                </div>
                <button
                  type="button"
                  onClick={isAllExpanded ? collapseAll : expandAll}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-cyber-blue transition-colors hover:border-cyber-blue/40 hover:bg-white/10"
                >
                  {isAllExpanded ? (
                    <>
                      <ChevronUp className="h-3.5 w-3.5" />
                      <span>Collapse All</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3.5 w-3.5" />
                      <span>Expand All</span>
                    </>
                  )}
                </button>
              </div>

              {/* Connected Timeline Stack */}
              <div className="relative space-y-4">
                {/* Vertical spine line */}
                <div className="pointer-events-none absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-linear-to-b from-cyber-purple via-cyber-blue to-white/10" />

                {educationMilestones.map((milestone, index) => {
                  const isExpanded = expandedIds.has(milestone.id)
                  const Icon = milestone.icon
                  const isPurple = milestone.accent === "purple"

                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className={cn(
                        "group relative rounded-2xl border transition-all duration-300",
                        isExpanded
                          ? isPurple
                            ? "border-cyber-purple/50 bg-[#0f1726]/90 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                            : "border-cyber-blue/50 bg-[#0f1726]/90 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                          : "border-white/10 bg-[#0c131f]/70 hover:border-white/20 hover:bg-[#0f1726]/80",
                        "backdrop-blur-xl"
                      )}
                    >
                      {/* Active glow accent bar */}
                      {isExpanded && (
                        <div
                          className={cn(
                            "absolute -left-[1px] top-4 bottom-4 w-1 rounded-r-full",
                            isPurple ? "bg-cyber-purple" : "bg-cyber-blue"
                          )}
                        />
                      )}

                      {/* Header (Clickable Trigger) */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(milestone.id)}
                        className="flex w-full items-start gap-4 p-4 sm:p-6 text-left select-none"
                        aria-expanded={isExpanded}
                      >
                        {/* Timeline Node Badge / Icon */}
                        <div
                          className={cn(
                            "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300",
                            isExpanded
                              ? isPurple
                                ? "border-cyber-purple bg-cyber-purple/20 text-cyber-purple shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                                : "border-cyber-blue bg-cyber-blue/20 text-cyber-blue shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105"
                              : "border-white/15 bg-white/5 text-muted-foreground group-hover:border-white/30 group-hover:text-white"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Title & Core Meta */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                "text-[11px] font-mono font-semibold tracking-wider uppercase",
                                isPurple ? "text-cyber-purple" : "text-cyber-blue"
                              )}
                            >
                              {milestone.stage}
                            </span>
                            <span className="text-white/20">•</span>
                            <span
                              className={cn(
                                "rounded-md px-2 py-0.5 text-[10px] font-mono",
                                milestone.statusType === "active"
                                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                  : "bg-white/5 text-muted-foreground border border-white/10"
                              )}
                            >
                              {milestone.statusBadge}
                            </span>
                          </div>

                          <h4 className="mt-1 text-base font-bold text-white sm:text-lg group-hover:text-cyber-blue transition-colors">
                            {milestone.degree}
                          </h4>

                          <p className="text-xs sm:text-sm font-medium text-slate-300">
                            {milestone.field}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <School className="h-3.5 w-3.5 text-white/40" />
                              <span className="truncate">{milestone.institution}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-white/40" />
                              <span>{milestone.period}</span>
                            </span>
                          </div>
                        </div>

                        {/* Score Badge & Chevron */}
                        <div className="flex flex-col items-end gap-2.5 shrink-0">
                          <div
                            className={cn(
                              "rounded-xl border px-3 py-1.5 text-right transition-colors",
                              isPurple
                                ? "border-cyber-purple/30 bg-cyber-purple/10"
                                : "border-cyber-blue/30 bg-cyber-blue/10"
                            )}
                          >
                            <div
                              className={cn(
                                "text-sm sm:text-base font-extrabold font-mono",
                                isPurple ? "text-cyber-purple" : "text-cyber-blue"
                              )}
                            >
                              {milestone.score}
                            </div>
                            <div className="text-[9px] font-mono text-muted-foreground/80 uppercase">
                              {milestone.scoreLabel}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground/70 group-hover:text-cyber-blue transition-colors">
                            <span className="hidden sm:inline">
                              {isExpanded ? "Collapse" : "Expand"}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </div>
                        </div>
                      </button>

                      {/* Expandable Deep-Dive Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 px-4 sm:px-6 pb-6 pt-5 space-y-5">
                              {/* Narrative description */}
                              <div>
                                <div className="text-[11px] font-mono text-muted-foreground/70 uppercase tracking-wider mb-1.5">
                                  // Academic Focus & Impact
                                </div>
                                <p className="text-sm leading-relaxed text-slate-300">
                                  {milestone.summary}
                                </p>
                              </div>

                              {/* Coursework & Competencies */}
                              <div>
                                <div className="text-[11px] font-mono text-muted-foreground/70 uppercase tracking-wider mb-2">
                                  // Core Coursework & Knowledge Pillars
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.coursework.map((course) => (
                                    <span
                                      key={course}
                                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-200"
                                    >
                                      {course}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Highlight box */}
                              <div className="rounded-xl border border-white/10 bg-[#080d14]/70 p-3.5 flex items-start gap-3">
                                <Award
                                  className={cn(
                                    "h-5 w-5 shrink-0 mt-0.5",
                                    isPurple ? "text-cyber-purple" : "text-cyber-blue"
                                  )}
                                />
                                <div className="text-xs leading-relaxed text-slate-300">
                                  <span className="font-semibold text-white">
                                    Key Milestone Insight:{" "}
                                  </span>
                                  {milestone.keyAchievement}
                                </div>
                              </div>

                              {/* Footer location & stamp */}
                              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground/60 pt-2 border-t border-white/5">
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="h-3 w-3" />
                                  <span>{milestone.location}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                  <span>Verified Academic Record</span>
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
