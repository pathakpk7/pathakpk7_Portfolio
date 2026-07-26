"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { HeroParallax } from "@/components/motion"
import { Container, SectionWrapper } from "@/components/layout"
import { cn } from "@/lib/utils"

import {
  SiCplusplus,
  SiOpenjdk,
  SiJavascript,
  SiPython,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
} from "react-icons/si"

import {
  Code2,
  Monitor,
  Server,
  Database,
  BrainCircuit,
  Wrench,
  Braces,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from "lucide-react"

/* =========================================================
   TYPES
   ========================================================= */

interface Skill {
  name: string
  icon: React.ComponentType<{
    className?: string
    style?: React.CSSProperties
  }>
  color: string
}

interface SkillCategory {
  id: string
  number: string
  title: string
  categoryIcon: React.ComponentType<{
    className?: string
  }>
  skills: Skill[]
}

/* =========================================================
   SKILLS DATA
   ========================================================= */

const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    number: "01",
    title: "Programming",
    categoryIcon: Code2,
    skills: [
      {
        name: "Java",
        icon: SiOpenjdk,
        color: "#ED8B00",
      },
      {
        name: "Python",
        icon: SiPython,
        color: "#3776AB",
      },
      {
        name: "C++",
        icon: SiCplusplus,
        color: "#659AD2",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "#F7DF1E",
      },
    ],
  },

  {
    id: "frontend",
    number: "02",
    title: "Frontend",
    categoryIcon: Monitor,
    skills: [
      {
        name: "React",
        icon: SiReact,
        color: "#61DAFB",
      },
      {
        name: "HTML5",
        icon: SiHtml5,
        color: "#E34F26",
      },
      {
        name: "CSS3",
        icon: SiCss,
        color: "#1572B6",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#06B6D4",
      },
    ],
  },

  {
    id: "backend",
    number: "03",
    title: "Backend",
    categoryIcon: Server,
    skills: [
      {
        name: "Spring Boot",
        icon: SiSpringboot,
        color: "#6DB33F",
      },
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#5FA04E",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "#F4F4F5",
      },
      {
        name: "REST APIs",
        icon: Braces,
        color: "#8B5CF6",
      },
    ],
  },

  {
    id: "database",
    number: "04",
    title: "Database",
    categoryIcon: Database,
    skills: [
      {
        name: "MySQL",
        icon: SiMysql,
        color: "#4479A1",
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "#4169E1",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
      },
      {
        name: "Supabase",
        icon: SiSupabase,
        color: "#3ECF8E",
      },
    ],
  },

  {
    id: "ai-data",
    number: "05",
    title: "AI / Data",
    categoryIcon: BrainCircuit,
    skills: [
      {
        name: "Scikit-learn",
        icon: SiScikitlearn,
        color: "#F7931E",
      },
      {
        name: "Pandas",
        icon: SiPandas,
        color: "#E70488",
      },
      {
        name: "NumPy",
        icon: SiNumpy,
        color: "#4DABCF",
      },
      {
        name: "TensorFlow",
        icon: SiTensorflow,
        color: "#FF6F00",
      },
    ],
  },

  {
    id: "tools",
    number: "06",
    title: "Tools & Platform",
    categoryIcon: Wrench,
    skills: [
      {
        name: "Git",
        icon: SiGit,
        color: "#F05032",
      },
      {
        name: "GitHub",
        icon: SiGithub,
        color: "#F4F4F5",
      },
      {
        name: "Docker",
        icon: SiDocker,
        color: "#2496ED",
      },
      {
        name: "Postman",
        icon: SiPostman,
        color: "#FF6C37",
      },
    ],
  },
]

/* =========================================================
   INDIVIDUAL SKILL LOGO
   ========================================================= */

interface SkillLogoProps {
  skill: Skill
  index: number
}

const SkillLogo = React.memo(function SkillLogo({
  skill,
  index,
}: SkillLogoProps) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.82,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      title={skill.name}
      aria-label={skill.name}
      role="img"
      className={cn(
        "group/skill",
        "relative",
        "flex h-[76px] w-[76px]",
        "items-center justify-center",
        "select-none",
        "cursor-default",
        "[perspective:600px]"
      )}
    >
      {/* Ambient glow */}

      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute left-1/2 top-1/2",
          "h-[58px] w-[58px]",
          "-translate-x-1/2 -translate-y-1/2",
          "rounded-[24px]",
          "opacity-[0.10]",
          "blur-[18px]",
          "transition-opacity duration-300",
          "group-hover/skill:opacity-[0.42]"
        )}
        style={{
          backgroundColor: skill.color,
        }}
        animate={{
          scale: [0.92, 1.08, 0.96, 1.04, 0.92],
          rotate: [0, 8, -5, 4, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating body */}

      <motion.div
        className={cn(
          "relative",
          "flex h-[62px] w-[62px]",
          "items-center justify-center",
          "[transform-style:preserve-3d]"
        )}
        animate={{
          y: [0, -2.5, 0, 2, 0],
          rotateX: [0, 3, 0, -2, 0],
          rotateY: [0, -4, 2, 4, 0],
        }}
        transition={{
          duration: 6 + index * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.07,
          y: -4,
          rotateX: -6,
          rotateY: 6,
          transition: {
            duration: 0.22,
            ease: "easeOut",
          },
        }}
      >
        {/* Liquid glass */}

        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute inset-[2px]",
            "overflow-hidden",
            "border border-white/[0.07]",
            "bg-white/[0.018]",
            "backdrop-blur-[2px]",
            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.10),inset_0_-8px_18px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.16)]",
            "transition-[border-color,background-color] duration-300",
            "group-hover/skill:border-white/[0.14]",
            "group-hover/skill:bg-white/[0.035]"
          )}
          animate={{
            borderRadius: [
              "42% 58% 55% 45% / 48% 44% 56% 52%",
              "54% 46% 42% 58% / 44% 56% 46% 54%",
              "47% 53% 58% 42% / 57% 43% 55% 45%",
              "58% 42% 49% 51% / 45% 55% 42% 58%",
              "42% 58% 55% 45% / 48% 44% 56% 52%",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Primary liquid mass */}

          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute",
              "h-[125%] w-[125%]",
              "rounded-full",
              "opacity-[0.13]",
              "blur-[12px]",
              "transition-opacity duration-300",
              "group-hover/skill:opacity-[0.30]"
            )}
            style={{
              background: `radial-gradient(
                circle at 35% 35%,
                ${skill.color} 0%,
                ${skill.color}99 24%,
                transparent 68%
              )`,
            }}
            animate={{
              x: ["-24%", "16%", "-5%", "-24%"],
              y: ["-18%", "8%", "20%", "-18%"],
              scale: [1, 1.15, 0.96, 1],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary liquid mass */}

          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute",
              "bottom-[-35%]",
              "right-[-28%]",
              "h-[90%] w-[90%]",
              "rounded-full",
              "opacity-[0.08]",
              "blur-[10px]",
              "transition-opacity duration-300",
              "group-hover/skill:opacity-[0.22]"
            )}
            style={{
              backgroundColor: skill.color,
            }}
            animate={{
              x: [0, -12, 4, 0],
              y: [0, -10, -2, 0],
              scale: [1, 1.18, 0.92, 1],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Reflection */}

          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute",
              "left-[13%] top-[10%]",
              "h-[28%] w-[46%]",
              "rounded-full",
              "bg-white/[0.11]",
              "blur-[5px]"
            )}
            animate={{
              x: [0, 7, -2, 0],
              opacity: [0.35, 0.65, 0.42, 0.35],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Moving highlight */}

          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute",
              "-top-[40%]",
              "h-[180%]",
              "w-[18px]",
              "rotate-[18deg]",
              "bg-linear-to-r",
              "from-transparent",
              "via-white/[0.13]",
              "to-transparent",
              "blur-[3px]"
            )}
            animate={{
              left: ["-45%", "135%"],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              repeatDelay: 1.2 + index * 0.15,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Hover ring */}

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute inset-[1px]",
            "rounded-[45%]",
            "opacity-0",
            "blur-[1px]",
            "transition-all duration-300",
            "group-hover/skill:opacity-50"
          )}
          style={{
            boxShadow: `
              0 0 10px ${skill.color}55,
              0 0 24px ${skill.color}30,
              inset 0 0 12px ${skill.color}20
            `,
          }}
        />

        {/* Technology logo */}

        <motion.div
          className={cn(
            "relative z-20",
            "flex items-center justify-center",
            "[transform:translateZ(22px)]"
          )}
          whileHover={{
            scale: 1.025,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Icon
            className={cn(
              "h-9 w-9",
              "sm:h-10 sm:w-10",
              "transition-[filter] duration-300",
              "drop-shadow-[0_3px_3px_rgba(0,0,0,0.35)]",
              "group-hover/skill:drop-shadow-[0_0_9px_currentColor]"
            )}
            style={{
              color: skill.color,
            }}
          />
        </motion.div>

        {/* Bottom reflection */}

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            "absolute",
            "bottom-[7px]",
            "left-1/2",
            "z-10",
            "h-[4px] w-[25px]",
            "-translate-x-1/2",
            "rounded-full",
            "bg-white/[0.07]",
            "blur-[3px]",
            "opacity-40",
            "transition-all duration-300",
            "group-hover/skill:w-[32px]",
            "group-hover/skill:opacity-70"
          )}
        />
      </motion.div>
    </motion.div>
  )
})

/* =========================================================
   CATEGORY MODULE
   ========================================================= */

interface SkillCategoryModuleProps {
  category: SkillCategory
  index: number
  isLast: boolean
}

const SkillCategoryModule = React.memo(
  function SkillCategoryModule({
    category,
    index,
    isLast,
  }: SkillCategoryModuleProps) {
    const CategoryIcon = category.categoryIcon

    return (
      <>
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.55,
            delay: index * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={cn(
            "skill-category",
            "relative",
            "flex-none",
            "w-[250px]",
            "sm:w-[280px]",
            "lg:w-[300px]",
            "px-6 sm:px-8",
            "py-5"
          )}
        >
          {/* Category heading */}

          <div className="mb-8 flex items-start justify-between gap-5">
            <div>
              <span
                className={cn(
                  "block",
                  "text-[11px]",
                  "font-semibold",
                  "tracking-[0.22em]",
                  "text-cyber-purple"
                )}
              >
                {category.number}
              </span>

              <h3
                className={cn(
                  "mt-3",
                  "text-sm",
                  "font-semibold",
                  "uppercase",
                  "tracking-[0.14em]",
                  "text-foreground/90"
                )}
              >
                {category.title}
              </h3>
            </div>

            <div
              className={cn(
                "flex",
                "h-10 w-10",
                "shrink-0",
                "items-center justify-center",
                "text-cyber-purple/80"
              )}
            >
              <CategoryIcon className="h-5 w-5" />
            </div>
          </div>

          {/* Skill logos */}

          <div
            className={cn(
              "grid",
              "min-h-[230px]",
              "grid-cols-2",
              "grid-rows-3",
              "place-items-center",
              "gap-x-7",
              "gap-y-1"
            )}
          >
            {category.skills.map((skill, skillIndex) => (
              <SkillLogo
                key={skill.name}
                skill={skill}
                index={skillIndex}
              />
            ))}

            <div
              aria-hidden="true"
              className="col-span-2 flex w-full items-center justify-center"
            >
              <div
                className={cn(
                  "h-px",
                  "w-12",
                  "bg-linear-to-r",
                  "from-transparent",
                  "via-cyber-purple/30",
                  "to-transparent"
                )}
              />
            </div>
          </div>
        </motion.div>

        {!isLast && (
          <div
            aria-hidden="true"
            className={cn(
              "my-7",
              "w-px",
              "flex-none",
              "self-stretch",
              "bg-linear-to-b",
              "from-transparent",
              "via-cyber-purple/30",
              "to-transparent"
            )}
          />
        )}
      </>
    )
  }
)

/* =========================================================
   SKILLS SECTION
   ========================================================= */

const SkillsSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<
    React.ComponentPropsWithoutRef<typeof SectionWrapper>,
    "children"
  >
>(({ className, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  /*
   * IMPORTANT:
   * The server and the client's first render both use:
   *
   * mounted = false
   * canScrollLeft = false
   * canScrollRight = false
   * scrollProgress = 0
   *
   * Browser measurements happen only after hydration.
   */

  const [mounted, setMounted] = React.useState(false)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)

  /* =======================================================
     MEASURE SCROLLER
     ======================================================= */

  const updateScrollState = React.useCallback(() => {
    const container = scrollContainerRef.current

    if (!container) return

    const maxScroll =
      container.scrollWidth - container.clientWidth

    const currentScroll = container.scrollLeft

    if (maxScroll <= 2) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      setScrollProgress(0)
      return
    }

    setCanScrollLeft(currentScroll > 4)

    setCanScrollRight(
      currentScroll < maxScroll - 4
    )

    setScrollProgress(
      Math.min(
        1,
        Math.max(
          0,
          currentScroll / maxScroll
        )
      )
    )
  }, [])

  /* =======================================================
     MOUNT
     ======================================================= */

  React.useEffect(() => {
    /*
     * This runs only after React has hydrated the initial HTML.
     */
    setMounted(true)
  }, [])

  /* =======================================================
     SCROLL / RESIZE LISTENERS
     ======================================================= */

  React.useEffect(() => {
    if (!mounted) return

    const container = scrollContainerRef.current

    if (!container) return

    /*
     * Wait for layout before measuring.
     */
    const frame = requestAnimationFrame(() => {
      updateScrollState()
    })

    const handleScroll = () => {
      updateScrollState()
    }

    const handleResize = () => {
      updateScrollState()
    }

    container.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    )

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      cancelAnimationFrame(frame)

      container.removeEventListener(
        "scroll",
        handleScroll
      )

      window.removeEventListener(
        "resize",
        handleResize
      )
    }
  }, [
    mounted,
    updateScrollState,
  ])

  /* =======================================================
     RESIZE OBSERVER
     ======================================================= */

  React.useEffect(() => {
    if (!mounted) return

    const container = scrollContainerRef.current

    if (!container) return

    if (typeof ResizeObserver === "undefined") {
      return
    }

    const observer = new ResizeObserver(() => {
      updateScrollState()
    })

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [
    mounted,
    updateScrollState,
  ])

  /* =======================================================
     ARROW NAVIGATION
     ======================================================= */

  const scrollSkills = React.useCallback(
    (direction: "left" | "right") => {
      const container = scrollContainerRef.current

      if (!container) return

      const amount = Math.min(
        container.clientWidth * 0.7,
        720
      )

      container.scrollBy({
        left:
          direction === "right"
            ? amount
            : -amount,
        behavior: "smooth",
      })
    },
    []
  )

  /* =======================================================
     WHEEL -> HORIZONTAL SCROLL
     ======================================================= */

  React.useEffect(() => {
    if (!mounted) return

    const container = scrollContainerRef.current

    if (!container) return

    const handleWheel = (event: WheelEvent) => {
      const maxScroll =
        container.scrollWidth - container.clientWidth

      if (maxScroll <= 0) return

      /*
       * If this is already a horizontal trackpad gesture,
       * allow the browser to handle it normally.
       */
      if (
        Math.abs(event.deltaX) >
        Math.abs(event.deltaY)
      ) {
        return
      }

      const goingRight = event.deltaY > 0
      const goingLeft = event.deltaY < 0

      const atStart = container.scrollLeft <= 1

      const atEnd =
        container.scrollLeft >= maxScroll - 1

      /*
       * Release vertical scrolling at both boundaries.
       */
      if (
        (goingLeft && atStart) ||
        (goingRight && atEnd)
      ) {
        return
      }

      event.preventDefault()

      container.scrollLeft += event.deltaY
    }

    container.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      container.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [mounted])

  return (
    <SectionWrapper
      ref={ref}
      id="skills"
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {/* ===================================================
          BACKGROUND
          =================================================== */}

      <HeroParallax
        speed={0.2}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className={cn(
            "absolute",
            "left-[12%]",
            "top-[15%]",
            "h-40 w-40",
            "rounded-full",
            "bg-cyber-blue/[0.05]",
            "blur-3xl"
          )}
        />

        <div
          className={cn(
            "absolute",
            "bottom-[10%]",
            "right-[12%]",
            "h-48 w-48",
            "rounded-full",
            "bg-cyber-purple/[0.06]",
            "blur-3xl"
          )}
        />

        <div
          className={cn(
            "absolute",
            "left-1/2",
            "top-[30%]",
            "h-56",
            "w-[55%]",
            "-translate-x-1/2",
            "rounded-full",
            "bg-cyber-purple/[0.025]",
            "blur-[100px]"
          )}
        />
      </HeroParallax>

      <Container
        size="full"
        className="relative z-10 w-full"
      >
        {/* =================================================
            HEADER
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mb-14 text-center md:mb-16"
        >
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              delay: 0.2,
            }}
            className={cn(
              "mx-auto mb-6",
              "h-2 w-2",
              "rounded-full",
              "bg-cyber-purple",
              "text-cyber-purple",
              "shadow-[0_0_18px_currentColor]"
            )}
          />

          <h2
            className={cn(
              "text-3xl",
              "sm:text-4xl",
              "md:text-5xl",
              "font-semibold",
              "tracking-[0.3em]",
              "text-foreground"
            )}
          >
            SKILLS
          </h2>

          <p
            className={cn(
              "mx-auto",
              "mt-5",
              "max-w-xl",
              "text-sm sm:text-base",
              "font-light",
              "text-muted-foreground"
            )}
          >
            Technologies &amp; tools I work with
          </p>

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: 96,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className={cn(
              "mx-auto",
              "mt-7",
              "h-px",
              "bg-linear-to-r",
              "from-transparent",
              "via-cyber-purple",
              "to-transparent"
            )}
          />
        </motion.div>

        {/* =================================================
            HORIZONTAL EXPLORER
            ================================================= */}

        <div className="relative w-full">

          {/* ===============================================
              IMPORTANT HYDRATION FIX

              These controls DO NOT exist in server HTML.
              They are introduced only after hydration.
              =============================================== */}

          {mounted && (
            <>
              {/* LEFT ARROW */}

              <motion.button
                type="button"
                aria-label="Previous skill categories"
                onClick={() => scrollSkills("left")}
                disabled={!canScrollLeft}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: canScrollLeft ? 1 : 0.2,
                }}
                whileHover={
                  canScrollLeft
                    ? {
                        scale: 1.08,
                      }
                    : undefined
                }
                whileTap={
                  canScrollLeft
                    ? {
                        scale: 0.94,
                      }
                    : undefined
                }
                className={cn(
                  "absolute",
                  "left-3 lg:left-6",
                  "top-1/2",
                  "z-30",
                  "-translate-y-1/2",
                  "hidden md:flex",
                  "h-11 w-11",
                  "items-center justify-center",
                  "rounded-full",
                  "border",
                  "border-cyber-purple/25",
                  "bg-background/75",
                  "text-cyber-purple",
                  "backdrop-blur-xl",
                  "transition-colors",
                  "hover:bg-cyber-purple/10",
                  "disabled:cursor-default"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>

              {/* RIGHT ARROW */}

              <motion.button
                type="button"
                aria-label="Next skill categories"
                onClick={() => scrollSkills("right")}
                disabled={!canScrollRight}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: canScrollRight ? 1 : 0.2,
                }}
                whileHover={
                  canScrollRight
                    ? {
                        scale: 1.08,
                      }
                    : undefined
                }
                whileTap={
                  canScrollRight
                    ? {
                        scale: 0.94,
                      }
                    : undefined
                }
                className={cn(
                  "absolute",
                  "right-3 lg:right-6",
                  "top-1/2",
                  "z-30",
                  "-translate-y-1/2",
                  "hidden md:flex",
                  "h-11 w-11",
                  "items-center justify-center",
                  "rounded-full",
                  "border",
                  "border-cyber-purple/25",
                  "bg-background/75",
                  "text-cyber-purple",
                  "backdrop-blur-xl",
                  "transition-colors",
                  "hover:bg-cyber-purple/10",
                  "disabled:cursor-default"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </>
          )}

          {/* LEFT EDGE FADE */}

          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none",
              "absolute inset-y-0 left-0",
              "z-20",
              "w-10 sm:w-16",
              "bg-linear-to-r",
              "from-background",
              "to-transparent"
            )}
          />

          {/* RIGHT EDGE FADE */}

          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none",
              "absolute inset-y-0 right-0",
              "z-20",
              "w-10 sm:w-16",
              "bg-linear-to-l",
              "from-background",
              "to-transparent"
            )}
          />

          {/* SCROLL CONTAINER */}

          <div
            ref={scrollContainerRef}
            className={cn(
              "skills-horizontal-explorer",
              "flex",
              "w-full",
              "overflow-x-auto",
              "overflow-y-hidden",
              "overscroll-x-contain",
              "touch-pan-x",
              "px-10",
              "sm:px-16",
              "md:px-20",
              "lg:px-24",
              "pb-5"
            )}
          >
            {skillCategories.map((category, index) => (
              <SkillCategoryModule
                key={category.id}
                category={category}
                index={index}
                isLast={
                  index === skillCategories.length - 1
                }
              />
            ))}

            <div
              aria-hidden="true"
              className="w-12 flex-none"
            />
          </div>
        </div>

        {/* =================================================
            SCROLL INDICATOR
            ================================================= */}

        <div className="mx-auto mt-7 max-w-5xl px-8 sm:px-12">
          <div
            className={cn(
              "relative",
              "h-[3px]",
              "overflow-hidden",
              "rounded-full",
              "bg-foreground/[0.08]"
            )}
          >
            <div
              className={cn(
                "absolute",
                "inset-y-0",
                "w-[28%]",
                "rounded-full",
                "bg-linear-to-r",
                "from-cyber-blue",
                "via-cyber-purple",
                "to-cyber-blue",
                "transition-[left]",
                "duration-150"
              )}
              style={{
                left: `${scrollProgress * 72}%`,
              }}
            />
          </div>

          <div
            className={cn(
              "mt-6",
              "flex",
              "items-center",
              "justify-center",
              "gap-3",
              "text-xs sm:text-sm",
              "text-muted-foreground"
            )}
          >
            <MoveHorizontal className="h-4 w-4 text-cyber-purple" />

            <span className="hidden sm:inline">
              Scroll horizontally to explore
            </span>

            <span className="sm:hidden">
              Swipe to explore
            </span>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
})

SkillsSection.displayName = "SkillsSection"

export { SkillsSection }