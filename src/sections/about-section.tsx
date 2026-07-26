"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  GraduationCap,
  Settings,
  School,
  MapPin,
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
  position: "top" | "bottom"
  x: number
  icon: React.ComponentType<{
    className?: string
  }>
  accent: "blue" | "purple"
}

/* =========================================================
   EDUCATION DATA
   ========================================================= */

const educationData: EducationItem[] = [
  {
    id: "secondary",
    shortTitle: "10th",
    title: "10th",
    subtitle: "Secondary School",
    institution: "St. John's School, Chandauli",
    period: "2017 – 2018",
    percentage: "81.33%",
    description:
      "Excellent academic performance with distinction in Mathematics and Computer Science fundamentals.",
    position: "bottom",
    x: 13,
    icon: School,
    accent: "blue",
  },
  {
    id: "senior-secondary",
    shortTitle: "12th",
    title: "12th",
    subtitle: "Senior Secondary",
    institution: "St. John's School, Chandauli",
    period: "2019 – 2020",
    percentage: "65.4%",
    description:
      "Strong foundation in Physics, Chemistry, and Mathematics with focus on analytical thinking.",
    position: "top",
    x: 38,
    icon: BookOpen,
    accent: "blue",
  },
  {
    id: "diploma",
    shortTitle: "Diploma",
    title: "Diploma",
    subtitle: "Mechanical Engineering",
    institution: "Chandauli Polytechnic",
    period: "2021 – 2024",
    percentage: "76.5%",
    description:
      "Developed a strong engineering foundation through production, manufacturing, mechanical systems, and practical technical coursework.",
    position: "bottom",
    x: 63,
    icon: Settings,
    accent: "purple",
  },
  {
    id: "btech",
    shortTitle: "B.Tech",
    title: "B.Tech",
    subtitle: "Computer Science Engineering",
    institution: "United Institute of Technology",
    period: "2024 – Present",
    percentage: "77.4%",
    description:
      "Building expertise in software development, data structures, databases, cybersecurity, AI/ML, and modern full-stack technologies.",
    position: "top",
    x: 87,
    icon: GraduationCap,
    accent: "purple",
  },
]

/* =========================================================
   ROAD

   Deep rounded roadmap, compressed vertically to fit
   comfortably inside a laptop viewport.
   ========================================================= */

const ROAD_PATH =
  "M 0 250 " +
  "L 70 250 " +
  "C 100 250 110 270 110 300 " +
  "L 110 345 " +
  "C 110 405 150 430 205 430 " +
  "C 260 430 300 400 300 345 " +
  "L 300 155 " +
  "C 300 100 345 75 400 75 " +
  "C 455 75 500 105 500 155 " +
  "L 500 345 " +
  "C 500 405 545 430 600 430 " +
  "C 655 430 700 400 700 345 " +
  "L 700 155 " +
  "C 700 100 745 75 800 75 " +
  "C 855 75 895 105 895 155 " +
  "L 895 205 " +
  "C 895 235 915 250 950 250 " +
  "L 1000 250"

/* =========================================================
   DETAIL POPUP
   ========================================================= */

interface DetailPopupProps {
  item: EducationItem
}

function DetailPopup({ item }: DetailPopupProps) {
  const Icon = item.icon

  /*
   * Critical positioning rule:
   *
   * TOP milestone    -> popup opens DOWN
   * BOTTOM milestone -> popup opens UP
   *
   * This means the popup uses the empty space inside
   * the roadmap instead of extending outside the section.
   */
  const opensDown = item.position === "top"

  const isBlue = item.accent === "blue"

  const accentText = isBlue
    ? "text-cyber-blue"
    : "text-cyber-purple"

  const accentBorder = isBlue
    ? "border-cyber-blue/30"
    : "border-cyber-purple/30"

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: opensDown ? -8 : 8,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: opensDown ? -5 : 5,
        scale: 0.97,
      }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(
        "absolute z-50",
        "left-1/2 -translate-x-1/2",

        // Smaller popup
        "w-[280px]",

        "rounded-2xl border",
        accentBorder,

        "bg-background/95",
        "p-4",
        "backdrop-blur-2xl",

        "shadow-[0_18px_55px_rgba(0,0,0,0.5)]",

        // OPEN TOWARD THE CENTER
        opensDown
          ? "top-[calc(100%+14px)]"
          : "bottom-[calc(100%+14px)]"
      )}
    >
      {/* Connector line */}

      <div
        className={cn(
          "absolute left-1/2",
          "-translate-x-1/2",
          "h-[14px] w-px",

          isBlue
            ? "bg-cyber-blue/60"
            : "bg-cyber-purple/60",

          opensDown
            ? "-top-[14px]"
            : "-bottom-[14px]"
        )}
      />

      {/* Connector dot */}

      <div
        className={cn(
          "absolute left-1/2",
          "-translate-x-1/2",
          "h-1.5 w-1.5 rounded-full",

          isBlue
            ? "bg-cyber-blue"
            : "bg-cyber-purple",

          opensDown
            ? "-top-[17px]"
            : "-bottom-[17px]"
        )}
      />

      {/* Header */}

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0",
            "items-center justify-center",
            "rounded-xl border",
            accentBorder,
            "bg-background/70",
            accentText
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-foreground">
                {item.title}
              </h4>

              <p
                className={cn(
                  "mt-0.5 text-[10px] font-medium",
                  accentText
                )}
              >
                {item.subtitle}
              </p>
            </div>

            {/* Result badge */}

            <span
              className={cn(
                "shrink-0",
                "rounded-full border",
                "px-2 py-1",
                "text-[9px] font-semibold",
                accentBorder,
                accentText
              )}
            >
              {item.percentage}
            </span>
          </div>
        </div>
      </div>

      {/* Institution */}

      <div className="mt-3 flex items-start gap-2">
        <MapPin
          className={cn(
            "mt-[1px] h-3.5 w-3.5 shrink-0",
            accentText
          )}
        />

        <span className="text-[11px] leading-4 text-muted-foreground">
          {item.institution}
        </span>
      </div>

      {/* Academic period */}

      <div className="mt-2.5 flex items-center justify-between gap-3">
        <span className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground/55">
          Academic Period
        </span>

        <span
          className={cn(
            "text-[10px] font-semibold",
            accentText
          )}
        >
          {item.period}
        </span>
      </div>

      {/* Separator */}

      <div
        className={cn(
          "my-3 h-px w-full",

          isBlue
            ? "bg-linear-to-r from-cyber-blue/35 via-border/20 to-transparent"
            : "bg-linear-to-r from-cyber-purple/35 via-border/20 to-transparent"
        )}
      />

      {/* Description */}

      <p className="text-[10.5px] leading-[1.55] text-muted-foreground/85">
        {item.description}
      </p>
    </motion.div>
  )
}

/* =========================================================
   DESKTOP MILESTONE
   ========================================================= */

interface DesktopMilestoneProps {
  item: EducationItem
  index: number
}

function DesktopMilestone({
  item,
  index,
}: DesktopMilestoneProps) {
  const [hovered, setHovered] =
    React.useState(false)

  const Icon = item.icon
  const isBlue = item.accent === "blue"

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.85,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.35,
      }}
      transition={{
        duration: 0.5,
        delay: 0.45 + index * 0.16,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="absolute z-30"
      style={{
        left: `${item.x}%`,

        /*
         * Cards remain outside the road's main empty area.
         * Their popups expand toward the center.
         */
        top:
          item.position === "top"
            ? "8%"
            : "69%",

        transform: "translateX(-50%)",
      }}
    >
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {/* YEAR */}

        <motion.div
          animate={{
            y: hovered
              ? item.position === "top"
                ? -2
                : 2
              : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "absolute left-1/2",
            "-translate-x-1/2",
            "whitespace-nowrap",

            "text-[10px]",
            "font-semibold",
            "tracking-wide",

            isBlue
              ? "text-cyber-blue"
              : "text-cyber-purple",

            item.position === "top"
              ? "-top-7"
              : "-bottom-7"
          )}
        >
          {item.period}
        </motion.div>

        {/* MILESTONE CARD */}

        <motion.button
          type="button"
          aria-label={`${item.title} ${item.subtitle}`}
          animate={{
            /*
             * Very small movement.
             * We don't want the card jumping around anymore.
             */
            y: hovered
              ? item.position === "top"
                ? -2
                : 2
              : 0,

            scale: hovered ? 1.025 : 1,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "relative",

            "flex",
            "w-[140px]",

            "flex-col",
            "items-center",
            "justify-center",

            "rounded-2xl border",

            "px-3",
            "py-3",

            "text-center",
            "outline-none",

            "bg-background/82",
            "backdrop-blur-xl",

            "transition-[border-color,box-shadow,background-color]",
            "duration-300",

            isBlue
              ? [
                  "border-cyber-blue/25",
                  "hover:border-cyber-blue/60",
                  "focus-visible:border-cyber-blue/60",
                  "hover:bg-cyber-blue/[0.035]",
                  "hover:shadow-[0_0_28px_rgba(59,130,246,0.15)]",
                ]
              : [
                  "border-cyber-purple/25",
                  "hover:border-cyber-purple/60",
                  "focus-visible:border-cyber-purple/60",
                  "hover:bg-cyber-purple/[0.035]",
                  "hover:shadow-[0_0_28px_rgba(168,85,247,0.15)]",
                ]
          )}
        >
          {/* ICON */}

          <motion.div
            animate={{
              scale: hovered ? 1.07 : 1,
              rotate: hovered ? 2 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className={cn(
              "mb-2",

              "flex h-8 w-8",
              "items-center justify-center",

              "rounded-full border",

              isBlue
                ? [
                    "border-cyber-blue/30",
                    "bg-cyber-blue/10",
                    "text-cyber-blue",
                  ]
                : [
                    "border-cyber-purple/30",
                    "bg-cyber-purple/10",
                    "text-cyber-purple",
                  ]
            )}
          >
            <Icon className="h-4 w-4" />
          </motion.div>

          {/* TITLE */}

          <span className="text-xs font-semibold text-foreground">
            {item.shortTitle}
          </span>

          {/* SUBTITLE */}

          <span
            className={cn(
              "mt-1",
              "max-w-[115px]",
              "text-[8.5px]",
              "leading-[13px]",

              isBlue
                ? "text-cyber-blue/90"
                : "text-cyber-purple/90"
            )}
          >
            {item.subtitle}
          </span>

          {/* HOVER INDICATOR */}

          <motion.div
            initial={false}
            animate={{
              width: hovered ? 26 : 10,
              opacity: hovered ? 1 : 0.4,
            }}
            transition={{
              duration: 0.2,
            }}
            className={cn(
              "mt-2 h-px rounded-full",

              isBlue
                ? "bg-cyber-blue"
                : "bg-cyber-purple"
            )}
          />
        </motion.button>

        {/* POPUP OPENS TOWARD ROAD INTERIOR */}

        {hovered && (
          <DetailPopup item={item} />
        )}
      </div>
    </motion.div>
  )
}

/* =========================================================
   ROAD NODE
   ========================================================= */

interface RoadNodeProps {
  item: EducationItem
  index: number
}

function RoadNode({
  item,
  index,
}: RoadNodeProps) {
  const isBlue = item.accent === "blue"

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
        delay: 0.4 + index * 0.16,
        type: "spring",
        stiffness: 180,
        damping: 15,
      }}
      className="absolute z-20"
      style={{
        left: `${item.x}%`,

        /*
         * Nodes sit closer to the path.
         */
        top:
          item.position === "top"
            ? "39%"
            : "61%",

        transform:
          "translate(-50%, -50%)",
      }}
    >
      <motion.div
        animate={{
          boxShadow: isBlue
            ? [
                "0 0 0px rgba(59,130,246,0.2)",
                "0 0 18px rgba(59,130,246,0.65)",
                "0 0 0px rgba(59,130,246,0.2)",
              ]
            : [
                "0 0 0px rgba(168,85,247,0.2)",
                "0 0 18px rgba(168,85,247,0.65)",
                "0 0 0px rgba(168,85,247,0.2)",
              ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.35,
        }}
        className={cn(
          "flex h-6 w-6",
          "items-center justify-center",

          "rounded-full border",

          "bg-background/90",

          isBlue
            ? "border-cyber-blue"
            : "border-cyber-purple"
        )}
      >
        <div
          className={cn(
            "h-2 w-2",
            "rounded-full",

            isBlue
              ? "bg-cyber-blue"
              : "bg-cyber-purple"
          )}
        />
      </motion.div>
    </motion.div>
  )
}

/* =========================================================
   DESKTOP ROADMAP
   ========================================================= */

function DesktopRoadmap() {
  return (
    <div
      className={cn(
        "relative",
        "hidden lg:block",

        /*
         * OLD: 620px
         * NEW: 500px
         */
        "h-[500px]",

        "w-full",

        /*
         * We intentionally keep this visible so internal
         * popup shadows are not clipped.
         */
        "overflow-visible"
      )}
    >
      {/* SVG ROAD */}

      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="educationRoadGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="rgb(59 130 246)"
            />

            <stop
              offset="50%"
              stopColor="rgb(139 92 246)"
            />

            <stop
              offset="100%"
              stopColor="rgb(217 70 239)"
            />
          </linearGradient>

          <filter
            id="educationRoadGlow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur
              stdDeviation="5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* OUTER GLOW */}

        <motion.path
          d={ROAD_PATH}
          fill="none"
          stroke="url(#educationRoadGradient)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.08"
          filter="url(#educationRoadGlow)"
          initial={{
            pathLength: 0,
          }}
          whileInView={{
            pathLength: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 2.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />

        {/* ROAD BODY */}

        <motion.path
          d={ROAD_PATH}
          fill="none"
          stroke="url(#educationRoadGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.48"
          initial={{
            pathLength: 0,
          }}
          whileInView={{
            pathLength: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 2.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />

        {/* INNER DARK ROAD */}

        <motion.path
          d={ROAD_PATH}
          fill="none"
          stroke="rgba(8,15,28,0.96)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            pathLength: 0,
          }}
          whileInView={{
            pathLength: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 2.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />

        {/* DASHED CENTER LINE */}

        <motion.path
          d={ROAD_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.62)"
          strokeWidth="1.3"
          strokeDasharray="8 10"
          strokeLinecap="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            pathLength: {
              duration: 2.3,
              ease: [0.25, 0.1, 0.25, 1],
            },

            opacity: {
              duration: 0.5,
              delay: 0.35,
            },
          }}
        />
      </svg>

      {/* ROAD NODES */}

      {educationData.map(
        (item, index) => (
          <RoadNode
            key={item.id}
            item={item}
            index={index}
          />
        )
      )}

      {/* MILESTONE CARDS */}

      {educationData.map(
        (item, index) => (
          <DesktopMilestone
            key={item.id}
            item={item}
            index={index}
          />
        )
      )}
    </div>
  )
}

/* =========================================================
   MOBILE ROADMAP
   ========================================================= */

function MobileRoadmap() {
  const [activeId, setActiveId] =
    React.useState<string | null>(null)

  return (
    <div className="relative lg:hidden">
      {/* Vertical timeline */}

      <motion.div
        initial={{
          scaleY: 0,
        }}
        whileInView={{
          scaleY: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          transformOrigin: "top",
        }}
        className={cn(
          "absolute",
          "bottom-5 left-[19px] top-5",
          "w-px",

          "bg-linear-to-b",
          "from-cyber-blue",
          "via-cyber-purple",
          "to-cyber-purple/20"
        )}
      />

      <div className="space-y-6">
        {educationData.map(
          (item, index) => {
            const Icon = item.icon

            const active =
              activeId === item.id

            const isBlue =
              item.accent === "blue"

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: -18,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                className="relative pl-14"
              >
                {/* NODE */}

                <div
                  className={cn(
                    "absolute left-[8px] top-4",
                    "z-10",

                    "flex h-6 w-6",
                    "items-center justify-center",

                    "rounded-full border",
                    "bg-background",

                    isBlue
                      ? "border-cyber-blue"
                      : "border-cyber-purple"
                  )}
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",

                      isBlue
                        ? "bg-cyber-blue"
                        : "bg-cyber-purple"
                    )}
                  />
                </div>

                {/* MOBILE CARD */}

                <button
                  type="button"
                  onClick={() =>
                    setActiveId(
                      active
                        ? null
                        : item.id
                    )
                  }
                  className={cn(
                    "w-full",

                    "rounded-xl border",

                    "bg-background/55",

                    "p-4",

                    "text-left",

                    "backdrop-blur-xl",

                    isBlue
                      ? "border-cyber-blue/20"
                      : "border-cyber-purple/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9",
                        "shrink-0",
                        "items-center justify-center",
                        "rounded-lg",

                        isBlue
                          ? [
                              "bg-cyber-blue/10",
                              "text-cyber-blue",
                            ]
                          : [
                              "bg-cyber-purple/10",
                              "text-cyber-purple",
                            ]
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">
                            {item.title}
                          </h3>

                          <p
                            className={cn(
                              "mt-0.5",
                              "text-[11px]",

                              isBlue
                                ? "text-cyber-blue"
                                : "text-cyber-purple"
                            )}
                          >
                            {item.subtitle}
                          </p>
                        </div>

                        <span
                          className={cn(
                            "shrink-0",
                            "text-[10px]",
                            "font-semibold",

                            isBlue
                              ? "text-cyber-blue"
                              : "text-cyber-purple"
                          )}
                        >
                          {item.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* EXPANDED MOBILE CONTENT */}

                  <motion.div
                    initial={false}
                    animate={{
                      height: active
                        ? "auto"
                        : 0,

                      opacity: active
                        ? 1
                        : 0,

                      marginTop: active
                        ? 14
                        : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/20 pt-4">
                      <div className="flex items-start gap-2">
                        <MapPin
                          className={cn(
                            "mt-0.5",
                            "h-4 w-4 shrink-0",

                            isBlue
                              ? "text-cyber-blue"
                              : "text-cyber-purple"
                          )}
                        />

                        <span className="text-xs text-muted-foreground">
                          {item.institution}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Percentage
                        </span>

                        <span
                          className={cn(
                            "text-xs font-semibold",

                            isBlue
                              ? "text-cyber-blue"
                              : "text-cyber-purple"
                          )}
                        >
                          {item.percentage}
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-5 text-muted-foreground/80">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </button>
              </motion.div>
            )
          }
        )}
      </div>
    </div>
  )
}

/* =========================================================
   ABOUT / EDUCATION SECTION
   ========================================================= */

const AboutSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<
    React.ComponentPropsWithoutRef<
      typeof SectionWrapper
    >,
    "children"
  >
>(({ className, ...props }, ref) => {
  return (
    <SectionWrapper
      ref={ref}
      id="about"
      background="cyber"

      /*
       * Reduced from xl to lg because the roadmap itself
       * is now much more compact.
       */
      padding="lg"

      className={cn(
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className={cn(
            "absolute",
            "left-[15%] top-[20%]",
            "h-64 w-64",
            "rounded-full",
            "bg-cyber-blue/[0.04]",
            "blur-[110px]"
          )}
        />

        <div
          className={cn(
            "absolute",
            "bottom-[15%] right-[15%]",
            "h-72 w-72",
            "rounded-full",
            "bg-cyber-purple/[0.05]",
            "blur-[120px]"
          )}
        />
      </div>

      <Container
        size="cinematic"
        className="relative z-10"
      >
        {/* =================================================
            HEADER
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mb-7 text-center lg:mb-0"
        >
          {/* ICON */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.45,
              delay: 0.1,
            }}
            className={cn(
              "mx-auto mb-3",

              "flex h-10 w-10",
              "items-center justify-center",

              "rounded-full border",

              "border-cyber-purple/25",
              "bg-cyber-purple/[0.06]",
              "text-cyber-purple"
            )}
          >
            <GraduationCap className="h-5 w-5" />
          </motion.div>

          {/* TITLE */}

          <motion.h2
            initial={{
              scale: 0.95,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
              delay: 0.08,
            }}
            className={cn(
              "text-3xl",
              "sm:text-4xl",
              "md:text-5xl",

              "font-black",
              "tracking-tight"
            )}
          >
            <span
              className={cn(
                "bg-linear-to-r",
                "from-foreground",
                "via-cyber-purple",
                "to-cyber-blue",

                "bg-clip-text",
                "text-transparent"
              )}
            >
              EDUCATION
            </span>
          </motion.h2>

          {/* UNDERLINE */}

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: 80,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className={cn(
              "mx-auto mt-3",

              "h-px",

              "bg-linear-to-r",
              "from-transparent",
              "via-cyber-purple",
              "to-transparent"
            )}
          />

          {/* SUBTITLE */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="mt-3 text-xs text-muted-foreground"
          >
            My academic journey
          </motion.p>
        </motion.div>

        {/* =================================================
            DESKTOP ROADMAP
            ================================================= */}

        <DesktopRoadmap />

        {/* =================================================
            MOBILE ROADMAP
            ================================================= */}

        <MobileRoadmap />

        {/* =================================================
            INTERACTION HINT
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.45,
            delay: 1,
          }}
          className="hidden justify-center lg:flex"
        >
          <div
            className={cn(
              "rounded-full border",

              "border-cyber-purple/15",
              "bg-background/30",

              "px-4 py-1.5",

              "text-[10px]",
              "text-muted-foreground",

              "backdrop-blur-lg"
            )}
          >
            Hover over a milestone to explore details
          </div>
        </motion.div>
      </Container>
    </SectionWrapper>
  )
})

AboutSection.displayName = "AboutSection"

export { AboutSection }