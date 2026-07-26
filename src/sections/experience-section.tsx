"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react"

import { FaLinkedin } from "react-icons/fa"

import {
  Container,
  SectionWrapper,
} from "@/components/layout"

import { cn } from "@/lib/utils"

/* =========================================================
   TYPES
   ========================================================= */

interface Experience {
  id: number
  role: string
  company: string
  type: string
  duration: string
  location: string

  status:
    | "Current"
    | "Completed"
    | "Upcoming"

  description: string
  skills: string[]
  linkedin: string

  icon: React.ComponentType<{
    className?: string
  }>
}

/* =========================================================
   EXPERIENCE DATA
   ========================================================= */

const experiences: Experience[] = [
  {
    id: 1,

    role: "Data Analytics Intern",
    company: "InternAlpha",

    type: "Internship",

    duration: "15 Aug 2026 – Present",
    location: "Remote",

    status: "Upcoming",

    description:
      "Working with real-world datasets across data analysis, visualization, preprocessing, cleaning, and analytical workflows.",

    skills: [
      "Data Analytics",
      "Data Visualization",
      "Data Cleaning",
      "Python",
      "SQL",
    ],

    linkedin:
      "https://www.linkedin.com/posts/prasoon7pathak07_internalpha-internship-dataanalytics-ugcPost-7484572440786862081-7hsb/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOxSlYBCl_5o73DVfUDEfaWc6K8IM136wY",

    icon: BriefcaseBusiness,
  },

  {
    id: 2,

    role: "Generative AI Virtual Intern",
    company: "IBM SkillsBuild",

    type: "Virtual Internship",

    duration: "Aug 2025 – 26 Sept 2025",
    location: "Remote",

    status: "Completed",

    description:
      "Completed IBM's Generative AI Virtual Internship with exposure to Generative AI, LLMs, Prompt Engineering, Responsible AI, and enterprise AI workflows.",

    skills: [
      "Generative AI",
      "LLMs",
      "Prompt Engineering",
      "Responsible AI",
      "IBM SkillsBuild",
    ],

    linkedin:
      "https://www.linkedin.com/posts/prasoon7pathak07_ibm-generativeai-ai-share-7377722479009755136-AtlC/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFOxSlYBCl_5o73DVfUDEfaWc6K8IM136wY",

    icon: BrainCircuit,
  },
]

/* =========================================================
   EXPERIENCE CARD
   ========================================================= */

interface ExperienceCardProps {
  experience: Experience
  index: number
  expanded: boolean
  onToggle: () => void
}

function ExperienceCard({
  experience,
  index,
  expanded,
  onToggle,
}: ExperienceCardProps) {
  const Icon = experience.icon

  const isCurrent =
    experience.status === "Current"

  const isUpcoming =
    experience.status === "Upcoming"

  return (
    /*
     * IMPORTANT:
     *
     * No "h-full".
     * No grid-row stretching.
     * align-self: start.
     *
     * Therefore this card changes ONLY its own height.
     */
    <motion.article
      layout="position"
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(
        "group",
        "relative",
        "self-start",
        "w-full",
        "min-w-0",
        "overflow-hidden",

        "rounded-[24px]",
        "border",

        expanded
          ? [
              "border-cyber-purple/30",
              "bg-white/[0.035]",
              "shadow-[0_20px_70px_rgba(0,0,0,0.22)]",
            ]
          : [
              "border-white/[0.08]",
              "bg-white/[0.02]",
            ],

        "transition-colors",
        "duration-300"
      )}
    >
      {/* ===================================================
          BACKGROUND GLOW
          =================================================== */}

      <AnimatePresence>
        {expanded && (
          <motion.div
            aria-hidden="true"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            transition={{
              duration: 0.4,
            }}
            className={cn(
              "pointer-events-none",
              "absolute",
              "-right-12",
              "-top-12",
              "h-48",
              "w-48",
              "rounded-full",
              "bg-cyber-purple/[0.10]",
              "blur-[75px]"
            )}
          />
        )}
      </AnimatePresence>

      {/* ===================================================
          TOP ACCENT
          =================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          scaleX: expanded ? 1 : 0,
        }}
        initial={false}
        transition={{
          duration: 0.45,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={cn(
          "absolute",
          "left-0",
          "right-0",
          "top-0",
          "h-px",
          "origin-left",
          "bg-linear-to-r",
          "from-transparent",
          "via-cyber-purple",
          "to-transparent"
        )}
      />

      {/* ===================================================
          CLICKABLE CARD HEADER
          =================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`experience-details-${experience.id}`}
        className={cn(
          "relative",
          "z-10",
          "block",
          "w-full",
          "p-5",
          "text-left",
          "sm:p-6"
        )}
      >
        {/* TOP ROW */}

        <div
          className={cn(
            "flex",
            "items-start",
            "justify-between",
            "gap-4"
          )}
        >
          {/* ICON */}

          <motion.div
            animate={
              expanded
                ? {
                    scale: 1.05,
                    rotate: [0, 3, -2, 0],
                  }
                : {
                    scale: 1,
                    rotate: 0,
                  }
            }
            transition={{
              duration: 0.4,
            }}
            className={cn(
              "relative",
              "flex",
              "h-12",
              "w-12",
              "shrink-0",
              "items-center",
              "justify-center",
              "rounded-2xl",
              "border",

              expanded
                ? [
                    "border-cyber-purple/35",
                    "bg-cyber-purple/[0.10]",
                    "text-cyber-purple",
                  ]
                : [
                    "border-white/[0.08]",
                    "bg-white/[0.035]",
                    "text-foreground/70",
                  ]
            )}
          >
            {expanded && (
              <motion.span
                aria-hidden="true"
                className={cn(
                  "absolute",
                  "inset-1",
                  "rounded-xl",
                  "bg-cyber-purple/20",
                  "blur-lg"
                )}
                animate={{
                  opacity: [0.2, 0.55, 0.2],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            <Icon
              className={cn(
                "relative",
                "z-10",
                "h-5",
                "w-5"
              )}
            />
          </motion.div>

          {/* NUMBER */}

          <span
            className={cn(
              "text-[11px]",
              "font-semibold",
              "tracking-[0.22em]",
              "text-muted-foreground/40"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* TYPE + STATUS */}

        <div
          className={cn(
            "mt-6",
            "flex",
            "flex-wrap",
            "items-center",
            "gap-2"
          )}
        >
          <span
            className={cn(
              "text-[10px]",
              "font-semibold",
              "uppercase",
              "tracking-[0.18em]",
              "text-cyber-purple"
            )}
          >
            {experience.type}
          </span>

          <span
            className={cn(
              "h-1",
              "w-1",
              "rounded-full",
              "bg-white/20"
            )}
          />

          <span
            className={cn(
              "flex",
              "items-center",
              "gap-1.5",
              "text-[10px]",
              "font-medium",

              isCurrent &&
                "text-emerald-400",

              isUpcoming &&
                "text-cyber-purple",

              !isCurrent &&
                !isUpcoming &&
                "text-muted-foreground"
            )}
          >
            {isCurrent ? (
              <>
                <span
                  className={cn(
                    "relative",
                    "flex",
                    "h-1.5",
                    "w-1.5"
                  )}
                >
                  <span
                    className={cn(
                      "absolute",
                      "inline-flex",
                      "h-full",
                      "w-full",
                      "animate-ping",
                      "rounded-full",
                      "bg-emerald-400",
                      "opacity-50"
                    )}
                  />

                  <span
                    className={cn(
                      "relative",
                      "inline-flex",
                      "h-1.5",
                      "w-1.5",
                      "rounded-full",
                      "bg-emerald-400"
                    )}
                  />
                </span>

                Current
              </>
            ) : isUpcoming ? (
              <>
                <Clock3 className="h-3 w-3" />
                Upcoming
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </>
            )}
          </span>
        </div>

        {/* ROLE */}

        <h3
          className={cn(
            "mt-3",
            "text-xl",
            "font-semibold",
            "leading-tight",
            "tracking-tight",
            "text-foreground",
            "transition-colors",
            "duration-300",
            "sm:text-2xl",

            expanded
              ? "text-cyber-purple"
              : "group-hover:text-cyber-purple"
          )}
        >
          {experience.role}
        </h3>

        {/* COMPANY */}

        <p
          className={cn(
            "mt-1.5",
            "text-sm",
            "text-muted-foreground"
          )}
        >
          {experience.company}
        </p>

        {/* OPEN / CLOSE */}

        <div
          className={cn(
            "mt-6",
            "flex",
            "items-center",
            "justify-between"
          )}
        >
          <span
            className={cn(
              "text-[11px]",
              "font-medium",
              "uppercase",
              "tracking-[0.14em]",

              expanded
                ? "text-cyber-purple"
                : "text-muted-foreground/60"
            )}
          >
            {expanded
              ? "Close"
              : "View details"}
          </span>

          <motion.span
            animate={{
              rotate: expanded
                ? 180
                : 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className={cn(
              "flex",
              "h-8",
              "w-8",
              "items-center",
              "justify-center",
              "rounded-full",
              "border",

              expanded
                ? [
                    "border-cyber-purple/30",
                    "bg-cyber-purple/[0.08]",
                    "text-cyber-purple",
                  ]
                : [
                    "border-white/[0.08]",
                    "text-muted-foreground",
                  ]
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </button>

      {/* ===================================================
          EXPANDED CONTENT

          This exists ONLY inside the selected card.
          =================================================== */}

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`experience-details-${experience.id}`}
            key={`details-${experience.id}`}
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: {
                duration: 0.42,
                ease: [0.25, 0.1, 0.25, 1],
              },

              opacity: {
                duration: 0.25,
              },
            }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "relative",
                "z-10",
                "px-5",
                "pb-6",
                "sm:px-6",
                "sm:pb-7"
              )}
            >
              {/* DIVIDER */}

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className={cn(
                  "mb-5",
                  "h-px",
                  "origin-left",
                  "bg-linear-to-r",
                  "from-cyber-purple/35",
                  "via-white/[0.07]",
                  "to-transparent"
                )}
              />

              {/* DATE + LOCATION */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.08,
                }}
                className={cn(
                  "flex",
                  "flex-wrap",
                  "gap-x-5",
                  "gap-y-3",
                  "text-xs",
                  "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex",
                    "items-center",
                    "gap-2"
                  )}
                >
                  <CalendarDays
                    className={cn(
                      "h-3.5",
                      "w-3.5",
                      "text-cyber-purple"
                    )}
                  />

                  {experience.duration}
                </span>

                <span
                  className={cn(
                    "flex",
                    "items-center",
                    "gap-2"
                  )}
                >
                  <MapPin
                    className={cn(
                      "h-3.5",
                      "w-3.5",
                      "text-cyber-purple"
                    )}
                  />

                  {experience.location}
                </span>
              </motion.div>

              {/* DESCRIPTION */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.12,
                }}
                className={cn(
                  "mt-5",
                  "text-[13px]",
                  "leading-6",
                  "text-muted-foreground"
                )}
              >
                {experience.description}
              </motion.p>

              {/* SKILLS */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.16,
                }}
                className={cn(
                  "mt-5",
                  "flex",
                  "flex-wrap",
                  "gap-2"
                )}
              >
                {experience.skills.map(
                  (skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{
                        opacity: 0,
                        scale: 0.92,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay:
                          0.18 +
                          skillIndex * 0.035,
                      }}
                      whileHover={{
                        y: -2,
                        scale: 1.025,
                      }}
                      className={cn(
                        "rounded-full",
                        "border",
                        "border-white/[0.08]",
                        "bg-white/[0.025]",
                        "px-3",
                        "py-1.5",
                        "text-[10px]",
                        "text-foreground/70",
                        "transition-colors",
                        "hover:border-cyber-purple/30",
                        "hover:text-cyber-purple"
                      )}
                    >
                      {skill}
                    </motion.span>
                  )
                )}
              </motion.div>

              {/* LINKEDIN */}

              <motion.a
                href={experience.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.22,
                }}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={cn(
                  "group/link",
                  "mt-6",
                  "inline-flex",
                  "items-center",
                  "gap-2.5",
                  "rounded-xl",
                  "border",
                  "border-cyber-purple/20",
                  "bg-cyber-purple/[0.05]",
                  "px-4",
                  "py-2.5",
                  "text-xs",
                  "font-medium",
                  "text-foreground",
                  "transition-colors",
                  "hover:border-cyber-purple/40",
                  "hover:bg-cyber-purple/[0.09]"
                )}
              >
                <FaLinkedin
                  className={cn(
                    "h-4",
                    "w-4",
                    "text-[#0A66C2]"
                  )}
                />

                <span>
                  View LinkedIn Post
                </span>

                <ArrowUpRight
                  className={cn(
                    "h-3.5",
                    "w-3.5",
                    "text-muted-foreground",
                    "transition-transform",
                    "duration-200",
                    "group-hover/link:-translate-y-0.5",
                    "group-hover/link:translate-x-0.5"
                  )}
                />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

/* =========================================================
   EXPERIENCE SECTION
   ========================================================= */

const ExperienceSection =
  React.forwardRef<
    React.ElementRef<typeof SectionWrapper>,
    Omit<
      React.ComponentPropsWithoutRef<
        typeof SectionWrapper
      >,
      "children"
    >
  >(
    (
      {
        className,
        ...props
      },
      ref
    ) => {
      /*
       * IMPORTANT:
       *
       * There is ONE shared expandedId.
       *
       * null:
       *   no card is expanded
       *
       * 1:
       *   only InternAlpha is expanded
       *
       * 2:
       *   only IBM is expanded
       *
       * It is therefore impossible for
       * both cards to be expanded together.
       */
      const [
        expandedId,
        setExpandedId,
      ] =
        React.useState<
          number | null
        >(null)

      const handleToggle = (
        id: number
      ) => {
        setExpandedId(
          (currentId) => {
            /*
             * Clicking the currently
             * expanded card closes it.
             */
            if (currentId === id) {
              return null
            }

            /*
             * Clicking another card
             * automatically replaces
             * the previous ID.
             *
             * Previous card closes.
             * New card opens.
             */
            return id
          }
        )
      }

      return (
        <SectionWrapper
          ref={ref}
          id="experience"
          className={cn(
            "relative",
            "w-full",
            "overflow-hidden",
            className
          )}
          {...props}
        >
          {/* =================================================
              AMBIENT BACKGROUND
              ================================================= */}

          <motion.div
            aria-hidden="true"
            className={cn(
              "pointer-events-none",
              "absolute",
              "left-[8%]",
              "top-[20%]",
              "h-56",
              "w-56",
              "rounded-full",
              "bg-cyber-blue/[0.035]",
              "blur-[100px]"
            )}
            animate={{
              x: [0, 25, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            aria-hidden="true"
            className={cn(
              "pointer-events-none",
              "absolute",
              "bottom-[10%]",
              "right-[8%]",
              "h-64",
              "w-64",
              "rounded-full",
              "bg-cyber-purple/[0.045]",
              "blur-[110px]"
            )}
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <Container
            size="full"
            className="relative z-10"
          >
            <div
              className={cn(
                "mx-auto",
                "w-full",
                "max-w-6xl"
              )}
            >
              {/* =============================================
                  HEADER
                  ============================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.65,
                }}
                className="mb-10 sm:mb-12"
              >
                <div
                  className={cn(
                    "flex",
                    "items-center",
                    "gap-3"
                  )}
                >
                  <motion.div
                    animate={{
                      rotate: [
                        0,
                        10,
                        -6,
                        0,
                      ],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles
                      className={cn(
                        "h-4",
                        "w-4",
                        "text-cyber-purple"
                      )}
                    />
                  </motion.div>

                  <span
                    className={cn(
                      "text-[10px]",
                      "font-semibold",
                      "uppercase",
                      "tracking-[0.25em]",
                      "text-cyber-purple",
                      "sm:text-xs"
                    )}
                  >
                    Career Journey
                  </span>
                </div>

                <div
                  className={cn(
                    "mt-3",
                    "flex",
                    "items-end",
                    "justify-between",
                    "gap-6"
                  )}
                >
                  <h2
                    className={cn(
                      "text-4xl",
                      "font-semibold",
                      "tracking-tight",
                      "text-foreground",
                      "sm:text-5xl",
                      "md:text-6xl"
                    )}
                  >
                    Experience
                  </h2>

                  <span
                    className={cn(
                      "hidden",
                      "pb-1",
                      "text-xs",
                      "text-muted-foreground",
                      "sm:block"
                    )}
                  >
                    Click a card to explore
                  </span>
                </div>

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
                    delay: 0.2,
                  }}
                  className={cn(
                    "mt-6",
                    "h-px",
                    "bg-linear-to-r",
                    "from-cyber-purple",
                    "to-transparent"
                  )}
                />
              </motion.div>

              {/* =============================================
                  EXPERIENCE CARDS

                  CRITICAL PART:

                  flex + items-start prevents the second card
                  from inheriting the expanded card's height.

                  Desktop:
                  50% / 50%

                  Mobile:
                  stacked
                  ============================================= */}

              <div
                className={cn(
                  "flex",
                  "flex-col",
                  "items-start",
                  "gap-5",

                  "lg:flex-row",
                  "lg:items-start",
                  "lg:gap-6"
                )}
              >
                {experiences.map(
                  (
                    experience,
                    index
                  ) => (
                    <div
                      key={
                        experience.id
                      }
                      className={cn(
                        "w-full",
                        "min-w-0",

                        /*
                         * Each desktop card owns
                         * exactly half the row.
                         */
                        "lg:flex-1",
                        "lg:basis-0",

                        /*
                         * This is important.
                         * Never stretch vertically.
                         */
                        "self-start"
                      )}
                    >
                      <ExperienceCard
                        experience={
                          experience
                        }
                        index={index}
                        expanded={
                          expandedId ===
                          experience.id
                        }
                        onToggle={() =>
                          handleToggle(
                            experience.id
                          )
                        }
                      />
                    </div>
                  )
                )}
              </div>

              {/* =============================================
                  MOBILE HINT
                  ============================================= */}

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
                  delay: 0.35,
                }}
                className={cn(
                  "mt-7",
                  "text-center",
                  "text-[11px]",
                  "text-muted-foreground",
                  "lg:hidden"
                )}
              >
                Tap a card to view details
              </motion.p>
            </div>
          </Container>
        </SectionWrapper>
      )
    }
  )

ExperienceSection.displayName =
  "ExperienceSection"

export { ExperienceSection }