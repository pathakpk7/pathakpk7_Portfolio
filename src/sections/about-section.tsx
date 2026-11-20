"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  GraduationCap,
  Settings,
  School,
  MapPin,
  Calendar,
  Award,
  Radio,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  Pause,
  Target,
  Compass,
} from "lucide-react"

import { Container, SectionWrapper } from "@/components/layout"
import { cn } from "@/lib/utils"

/* =========================================================
   TYPES
   ========================================================= */

interface EducationItem {
  id: string
  shortTitle: string
  title: string
  subtitle: string
  institution: string
  period: string
  percentage: string
  description: string
  icon: React.ComponentType<{
    className?: string
  }>
  accent: "blue" | "purple"
  stage: string
  statusBadge: string
  focusTag: string
  radius: number
  angle: number // in degrees
}

/* =========================================================
   EDUCATION DATA
   ========================================================= */

const educationData: EducationItem[] = [
  {
    id: "secondary",
    shortTitle: "10th",
    title: "10th Grade",
    subtitle: "Secondary School Certificate",
    institution: "St. John's School, Chandauli",
    period: "2017 – 2018",
    percentage: "81.33%",
    description:
      "Built initial academic rigor with distinction in Mathematics and Computer Science fundamentals, establishing a lifelong curiosity for technology.",
    icon: School,
    accent: "blue",
    stage: "01",
    statusBadge: "Foundational Honors",
    focusTag: "Math & Computing",
    radius: 78,
    angle: 215,
  },
  {
    id: "senior-secondary",
    shortTitle: "12th",
    title: "12th Grade",
    subtitle: "Senior Secondary (PCM)",
    institution: "St. John's School, Chandauli",
    period: "2019 – 2020",
    percentage: "65.4%",
    description:
      "Deepened analytical thinking and problem-solving through intensive coursework in Physics, Chemistry, and Advanced Mathematics.",
    icon: BookOpen,
    accent: "blue",
    stage: "02",
    statusBadge: "Analytical Foundation",
    focusTag: "Physics, Chem & Math",
    radius: 126,
    angle: 310,
  },
  {
    id: "diploma",
    shortTitle: "Diploma",
    title: "Diploma in Engineering",
    subtitle: "Mechanical Engineering",
    institution: "Chandauli Polytechnic",
    period: "2021 – 2024",
    percentage: "76.5%",
    description:
      "Gained hands-on engineering principles, manufacturing systems, precision design, and structured problem-solving before transitioning to computer science.",
    icon: Settings,
    accent: "purple",
    stage: "03",
    statusBadge: "Engineering Core",
    focusTag: "Systems & Mechanics",
    radius: 174,
    angle: 35,
  },
  {
    id: "btech",
    shortTitle: "B.Tech",
    title: "Bachelor of Technology",
    subtitle: "Computer Science Engineering",
    institution: "United Institute of Technology, Prayagraj",
    period: "2024 – Present",
    percentage: "77.4%",
    description:
      "Specializing in full-stack architecture, distributed systems, algorithms, AI/ML pipelines, and modern cybersecurity threat detection platforms.",
    icon: GraduationCap,
    accent: "purple",
    stage: "04",
    statusBadge: "Current Specialization",
    focusTag: "Full-Stack, AI & Cyber",
    radius: 218,
    angle: 125,
  },
]

/* =========================================================
   ORBITAL GEOMETRY CONSTANTS
   ========================================================= */

const CENTER_X = 240
const CENTER_Y = 240

function getNodeCoordinates(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CENTER_X + radius * Math.cos(rad),
    y: CENTER_Y + radius * Math.sin(rad),
  }
}

/* =========================================================
   ORBITAL CONSTELLATION RADAR COMPONENT
   ========================================================= */

interface OrbitalRadarProps {
  items: EducationItem[]
  activeIndex: number
  onSelect: (index: number) => void
  hoveredIndex: number | null
  onHover: (index: number | null) => void
}

function OrbitalRadar({
  items,
  activeIndex,
  onSelect,
  hoveredIndex,
  onHover,
}: OrbitalRadarProps) {
  const activeItem: EducationItem = items[activeIndex] ?? (items[0] as EducationItem)
  const activeCoords = getNodeCoordinates(activeItem.radius, activeItem.angle)

  // Construct constellation path connecting 1 -> 2 -> 3 -> 4
  const constellationPath = items
    .map((item, idx) => {
      const { x, y } = getNodeCoordinates(item.radius, item.angle)
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  return (
    <div className="relative mx-auto flex w-full max-w-[460px] items-center justify-center p-2 select-none sm:p-4">
      {/* Ambient background glow behind radar */}
      <div className="pointer-events-none absolute h-[340px] w-[340px] rounded-full bg-linear-to-tr from-cyber-blue/10 via-cyber-purple/10 to-transparent blur-[80px]" />

      <svg
        viewBox="0 0 480 480"
        className="relative z-10 h-auto w-full max-w-[460px] overflow-visible drop-shadow-[0_0_35px_rgba(0,0,0,0.8)]"
        aria-label="Academic Journey Orbital Constellation"
      >
        <defs>
          {/* Constellation line gradient */}
          <linearGradient
            id="constellationGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
          </linearGradient>

          {/* Active target beam gradient */}
          <linearGradient
            id="activeTargetBeam"
            x1={`${CENTER_X}`}
            y1={`${CENTER_Y}`}
            x2={`${activeCoords.x}`}
            y2={`${activeCoords.y}`}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#818cf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
          </linearGradient>

          {/* Radar sweep sector gradient */}
          <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.25" />
          </linearGradient>

          {/* Core radial glow */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#a855f7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0b111a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* =================================================
            BACKGROUND GRID & CROSSHAIRS
            ================================================= */}
        {/* Subtle grid rings */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={235}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />

        {/* Crosshair coordinate axes */}
        <line
          x1={CENTER_X}
          y1={15}
          x2={CENTER_X}
          y2={465}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <line
          x1={15}
          y1={CENTER_Y}
          x2={465}
          y2={CENTER_Y}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />

        {/* Cardinal calibration markers */}
        <text
          x={CENTER_X}
          y={26}
          textAnchor="middle"
          className="fill-muted-foreground/40 text-[9px] font-mono tracking-widest"
        >
          000° // ALPHA
        </text>
        <text
          x={460}
          y={CENTER_Y + 3}
          textAnchor="end"
          className="fill-muted-foreground/40 text-[9px] font-mono tracking-widest"
        >
          090°
        </text>
        <text
          x={CENTER_X}
          y={460}
          textAnchor="middle"
          className="fill-muted-foreground/40 text-[9px] font-mono tracking-widest"
        >
          180°
        </text>
        <text
          x={20}
          y={CENTER_Y + 3}
          textAnchor="start"
          className="fill-muted-foreground/40 text-[9px] font-mono tracking-widest"
        >
          270°
        </text>

        {/* =================================================
            CONCENTRIC ORBITAL RINGS
            ================================================= */}
        {items.map((item, idx) => {
          const isSelected = activeIndex === idx
          const isHovered = hoveredIndex === idx
          const isHighlighted = isSelected || isHovered

          return (
            <g key={`orbit-ring-${item.id}`}>
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r={item.radius}
                fill="none"
                stroke={
                  isHighlighted
                    ? item.accent === "blue"
                      ? "rgba(34,211,238,0.45)"
                      : "rgba(168,85,247,0.45)"
                    : "rgba(255,255,255,0.08)"
                }
                strokeWidth={isHighlighted ? 1.6 : 1}
                strokeDasharray={isHighlighted ? "6 4" : "3 7"}
                className="transition-all duration-300"
              />

              {/* Pulsing ring aura when selected */}
              {isSelected && (
                <motion.circle
                  cx={CENTER_X}
                  cy={CENTER_Y}
                  r={item.radius}
                  fill="none"
                  stroke={item.accent === "blue" ? "#22d3ee" : "#a855f7"}
                  strokeWidth="1"
                  animate={{
                    opacity: [0.1, 0.45, 0.1],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          )
        })}

        {/* =================================================
            ROTATING RADAR SWEEP CONE
            ================================================= */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
        >
          <path
            d={`M ${CENTER_X} ${CENTER_Y} L ${CENTER_X} 20 A 220 220 0 0 1 ${CENTER_X + 130} ${CENTER_Y - 177} Z`}
            fill="url(#radarSweepGradient)"
          />
          <line
            x1={CENTER_X}
            y1={CENTER_Y}
            x2={CENTER_X + 130}
            y2={CENTER_Y - 177}
            stroke="#22d3ee"
            strokeWidth="1.2"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
        </motion.g>

        {/* =================================================
            CONSTELLATION VECTOR LINE (CONNECTING MILESTONES)
            ================================================= */}
        <path
          d={constellationPath}
          fill="none"
          stroke="url(#constellationGradient)"
          strokeWidth="1.8"
          strokeDasharray="4 6"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />

        {/* Animated energy pulse traveling through constellation */}
        <motion.path
          d={constellationPath}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="8 60"
          animate={{
            strokeDashoffset: [-120, 120],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
          }}
          strokeOpacity="0.9"
        />

        {/* =================================================
            ACTIVE TARGETING BEAM (CORE -> ACTIVE NODE)
            ================================================= */}
        <motion.line
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`laser-to-${activeItem.id}`}
          x1={CENTER_X}
          y1={CENTER_Y}
          x2={activeCoords.x}
          y2={activeCoords.y}
          stroke="url(#activeTargetBeam)"
          strokeWidth="1.8"
          strokeDasharray="3 4"
        />

        {/* =================================================
            CENTRAL NUCLEUS (PRASOON PATHAK CORE)
            ================================================= */}
        <g>
          {/* Pulsing Core Wave */}
          <motion.circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={38}
            fill="url(#coreGlow)"
            animate={{
              r: [32, 44, 32],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Core Body */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={24}
            fill="#080e1a"
            stroke="rgba(168,85,247,0.5)"
            strokeWidth="1.5"
          />

          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={16}
            fill="#0f172a"
            stroke="rgba(34,211,238,0.7)"
            strokeWidth="1.2"
          />

          {/* Central Pulsing Beacon Dot */}
          <circle cx={CENTER_X} cy={CENTER_Y} r={4} fill="#22d3ee" />
        </g>

        {/* =================================================
            ORBITAL SATELLITE NODES
            ================================================= */}
        {items.map((item, idx) => {
          const { x, y } = getNodeCoordinates(item.radius, item.angle)
          const isSelected = activeIndex === idx
          const isHovered = hoveredIndex === idx
          const isHighlighted = isSelected || isHovered
          const isBlue = item.accent === "blue"

          return (
            <g
              key={`node-${item.id}`}
              onClick={() => onSelect(idx)}
              onMouseEnter={() => onHover(idx)}
              onMouseLeave={() => onHover(null)}
              className="cursor-pointer transition-transform duration-200"
              role="button"
              tabIndex={0}
              aria-label={`Select ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelect(idx)
                }
              }}
            >
              {/* Outer pulsing beacon if selected */}
              {isSelected && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={24}
                  fill="none"
                  stroke={isBlue ? "#22d3ee" : "#a855f7"}
                  strokeWidth="1"
                  animate={{
                    r: [16, 28, 16],
                    opacity: [0.9, 0, 0.9],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}

              {/* Node Outer Ring */}
              <circle
                cx={x}
                cy={y}
                r={isHighlighted ? 17 : 14}
                fill="#0b111a"
                stroke={
                  isHighlighted
                    ? isBlue
                      ? "#22d3ee"
                      : "#c084fc"
                    : "rgba(255,255,255,0.22)"
                }
                strokeWidth={isHighlighted ? 2 : 1.2}
                className="transition-all duration-300"
              />

              {/* Inner Circle Glow */}
              <circle
                cx={x}
                cy={y}
                r={isHighlighted ? 9 : 6}
                fill={
                  isHighlighted
                    ? isBlue
                      ? "#22d3ee"
                      : "#a855f7"
                    : "rgba(255,255,255,0.3)"
                }
                className="transition-all duration-300"
              />

              {/* Year / Phase Badge */}
              <g transform={`translate(${x}, ${y + (item.angle > 180 ? -22 : 26)})`}>
                <rect
                  x="-28"
                  y="-10"
                  width="56"
                  height="18"
                  rx="9"
                  fill="#070c14"
                  stroke={
                    isHighlighted
                      ? isBlue
                        ? "rgba(34,211,238,0.6)"
                        : "rgba(192,132,252,0.6)"
                      : "rgba(255,255,255,0.12)"
                  }
                  strokeWidth="1"
                  className="transition-all duration-200"
                />
                <text
                  x="0"
                  y="2.5"
                  textAnchor="middle"
                  className={cn(
                    "text-[9.5px] font-mono font-semibold tracking-wider",
                    isHighlighted
                      ? isBlue
                        ? "fill-cyan-300"
                        : "fill-purple-300"
                      : "fill-white/60"
                  )}
                >
                  {item.shortTitle}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* =========================================================
   TELEMETRY HUD CARD COMPONENT
   ========================================================= */

interface MilestoneHudCardProps {
  item: EducationItem
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  isPlaying: boolean
  onTogglePlay: () => void
}

function MilestoneHudCard({
  item,
  index,
  total,
  onPrev,
  onNext,
  isPlaying,
  onTogglePlay,
}: MilestoneHudCardProps) {
  const Icon = item.icon
  const isBlue = item.accent === "blue"

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/15 bg-[#0b111a]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8 lg:min-h-[460px]">
      {/* Background cyber ambient gradients */}
      <div
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[90px]",
          isBlue ? "bg-cyber-blue/15" : "bg-cyber-purple/15"
        )}
      />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/[0.02] blur-[80px]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-1 flex-col"
        >
          {/* Top HUD Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                Radar Target Locked
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider",
                  isBlue
                    ? "border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue"
                    : "border-cyber-purple/30 bg-cyber-purple/10 text-cyber-purple"
                )}
              >
                {item.statusBadge}
              </span>
              <span className="text-xs font-mono text-muted-foreground/60">
                PHASE {item.stage} / 0{total}
              </span>
            </div>
          </div>

          {/* Main Info Header */}
          <div className="mt-6 flex items-start gap-4">
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md shadow-lg",
                isBlue
                  ? "border-cyber-blue/40 bg-cyber-blue/10 text-cyber-blue shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  : "border-cyber-purple/40 bg-cyber-purple/10 text-cyber-purple shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              )}
            >
              <Icon className="h-7 w-7" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {item.title}
                </h3>

                {/* Score Lockup Badge */}
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl border px-3 py-1 backdrop-blur-sm",
                    isBlue
                      ? "border-cyber-blue/35 bg-cyber-blue/[0.08] text-cyber-blue"
                      : "border-cyber-purple/35 bg-cyber-purple/[0.08] text-cyber-purple"
                  )}
                >
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-bold font-mono">
                    {item.percentage}
                  </span>
                </div>
              </div>

              <p
                className={cn(
                  "mt-1 text-sm font-medium tracking-wide",
                  isBlue ? "text-cyan-300/90" : "text-purple-300/90"
                )}
              >
                {item.subtitle}
              </p>
            </div>
          </div>

          {/* Meta Details: Institution & Period */}
          <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <MapPin
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  isBlue ? "text-cyber-blue" : "text-cyber-purple"
                )}
              />
              <div className="min-w-0">
                <span className="block text-[9px] font-mono tracking-widest uppercase text-muted-foreground/60">
                  Institution
                </span>
                <span className="text-xs font-medium text-foreground/90 leading-snug">
                  {item.institution}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  isBlue ? "text-cyber-blue" : "text-cyber-purple"
                )}
              />
              <div className="min-w-0">
                <span className="block text-[9px] font-mono tracking-widest uppercase text-muted-foreground/60">
                  Academic Timeline
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold font-mono",
                    isBlue ? "text-cyan-300" : "text-purple-300"
                  )}
                >
                  {item.period}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5 flex-1">
            <span className="block text-[9px] font-mono tracking-widest uppercase text-muted-foreground/60 mb-1.5">
              Key Academic Impact & Curriculum
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground/90">
              {item.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation & Auto-tour Footer Controls */}
      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        {/* Auto Tour Toggle */}
        <button
          type="button"
          onClick={onTogglePlay}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-white/30 hover:text-white"
          title={isPlaying ? "Pause auto-rotation" : "Start auto-rotation tour"}
        >
          {isPlaying ? (
            <>
              <Pause className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-[11px] font-mono">Auto Tour Active</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 text-cyber-blue" />
              <span className="text-[11px] font-mono">Play Auto Tour</span>
            </>
          )}
        </button>

        {/* Phase Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous academic milestone"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 transition hover:border-cyber-blue/40 hover:bg-white/[0.08] hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next academic milestone"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 transition hover:border-cyber-purple/40 hover:bg-white/[0.08] hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   MAIN ABOUT & EDUCATION SECTION
   ========================================================= */

const AboutSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, "children">
>(({ className, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(3) // Default to latest milestone (B.Tech)
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)

  // Auto-tour rotation interval
  React.useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((curr) => (curr + 1) % educationData.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleNext = React.useCallback(() => {
    setActiveIndex((curr) => (curr + 1) % educationData.length)
  }, [])

  const handlePrev = React.useCallback(() => {
    setActiveIndex((curr) =>
      curr === 0 ? educationData.length - 1 : curr - 1
    )
  }, [])

  return (
    <SectionWrapper
      ref={ref}
      id="about"
      background="cyber"
      padding="lg"
      className={cn("relative overflow-hidden py-16 sm:py-20", className)}
      {...props}
    >
      {/* Background glow flares */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[15%] h-80 w-80 rounded-full bg-cyber-blue/[0.05] blur-[120px]" />
        <div className="absolute right-[10%] bottom-[15%] h-96 w-96 rounded-full bg-cyber-purple/[0.06] blur-[140px]" />
      </div>

      <Container size="cinematic" className="relative z-10">
        {/* =================================================
            SECTION HEADER
            ================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 text-center sm:mb-14"
        >
          {/* Header Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-cyber-purple/30 bg-cyber-purple/10 text-cyber-purple shadow-[0_0_18px_rgba(168,85,247,0.2)]"
          >
            <Target className="h-5 w-5" />
          </motion.div>

          {/* Section Title */}
          <motion.h2
            initial={{ scale: 0.96 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="bg-linear-to-r from-foreground via-cyber-purple to-cyber-blue bg-clip-text text-transparent">
              ACADEMIC CONSTELLATION
            </span>
          </motion.h2>

          {/* Section Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 88 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-3 h-px bg-linear-to-r from-transparent via-cyber-purple to-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          />

          {/* Section Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 text-xs tracking-wider text-muted-foreground uppercase sm:text-sm"
          >
            Interactive Radar Mapping My Engineering & Educational Evolution
          </motion.p>
        </motion.div>

        {/* =================================================
            STAGE SELECTOR PILLS
            ================================================= */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {educationData.map((item, idx) => {
            const isActive = activeIndex === idx
            const isBlue = item.accent === "blue"

            return (
              <button
                key={`pill-${item.id}`}
                type="button"
                onClick={() => {
                  setActiveIndex(idx)
                  setIsPlaying(false) // pause auto tour on manual select
                }}
                className={cn(
                  "relative flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-mono font-medium transition-all duration-300 backdrop-blur-md",
                  isActive
                    ? isBlue
                      ? "border-cyber-blue bg-cyber-blue/15 text-white shadow-[0_0_16px_rgba(34,211,238,0.35)]"
                      : "border-cyber-purple bg-cyber-purple/15 text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isActive
                      ? isBlue
                        ? "bg-cyber-blue"
                        : "bg-cyber-purple"
                      : "bg-muted-foreground/40"
                  )}
                />
                <span>
                  {item.stage} // {item.shortTitle}
                </span>
                {isActive && (
                  <span className="hidden sm:inline text-[10px] text-muted-foreground/80">
                    ({item.percentage})
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* =================================================
            ORBITAL COCKPIT GRID
            Left: Interactive Radar Constellation
            Right: Holographic Telemetry HUD
            ================================================= */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: Orbital Constellation Graphic */}
          <div className="flex flex-col items-center justify-center lg:col-span-6">
            <OrbitalRadar
              items={educationData}
              activeIndex={activeIndex}
              onSelect={(idx) => {
                setActiveIndex(idx)
                setIsPlaying(false)
              }}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
            />

            {/* Radar status caption */}
            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-muted-foreground/60">
              <Compass className="h-3.5 w-3.5 text-cyber-blue" />
              <span>Click any orbital node or select a stage to explore</span>
            </div>
          </div>

          {/* RIGHT: Telemetry HUD Detail Card */}
          <div className="w-full lg:col-span-6">
            <MilestoneHudCard
              item={educationData[activeIndex] ?? (educationData[0] as EducationItem)}
              index={activeIndex}
              total={educationData.length}
              onPrev={handlePrev}
              onNext={handleNext}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying((p) => !p)}
            />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
})

AboutSection.displayName = "AboutSection"

export { AboutSection }
