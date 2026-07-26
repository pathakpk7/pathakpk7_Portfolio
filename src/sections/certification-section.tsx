"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Award,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Cloud,
  ExternalLink,
  Fingerprint,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { FaLinkedin } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { SectionWrapper } from "@/components/layout"

/* =========================================================
   TYPES
   ========================================================= */

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credentialId: string
  level?: string
  duration?: string
  credits?: string
  description: string
  skills: string[]
  credentialUrl?: string
  icon: React.ComponentType<{
    className?: string
  }>
}

/* =========================================================
   CERTIFICATION DATA
   ========================================================= */

const certifications: Certification[] = [
  {
    id: "digital-application-fundamentals",
    title: "Digital Application Fundamentals (STEM)",
    issuer: "NASSCOM / FutureSkills Prime",
    date: "Sep 2025",
    credentialId:
      "32914-1e19031a-8bc3-11f0-bdec-005056b48b54",
    description:
      "Completed Digital Application Fundamentals (STEM), aligned with competency standards developed by the IT-ITeS Sector Skills Council NASSCOM.",
    skills: [
      "Digital Literacy",
      "Information Technology",
      "Digital Transformation",
    ],
    credentialUrl:
      "https://www.futureskillsprime.in/iDH/user/credential/view/32914-1e19031a-8bc3-11f0-bdec-005056b48b54?utm_source=chatgpt.com",
    icon: MonitorSmartphone,
  },

  {
    id: "ibm-generative-ai",
    title: "Generative AI Virtual Internship",
    issuer: "IBM",
    date: "Sep 2025",
    credentialId:
      "df3cf03090654c00bc62355321ca720d",
    description:
      "Completed IBM's Generative AI Virtual Internship with practical exposure to Generative AI, Prompt Engineering, Responsible AI and enterprise AI workflows.",
    skills: [
      "Generative AI",
      "Prompt Engineering",
      "Artificial Intelligence",
    ],
    credentialUrl:
      "https://courses.ibmmooc.skillsnetwork.site/certificates/df3cf03090654c00bc62355321ca720d?utm_source=chatgpt.com",
    icon: BrainCircuit,
  },

  {
    id: "microsoft-soar",
    title: "SOAR – AI to Aspire",
    issuer: "Microsoft",
    date: "Nov 2025",
    credentialId:
      "2025090245651375-172634",
    level: "NSQF Level 4",
    duration: "15 Hours",
    credits: "0.5",
    description:
      "Earned the SOAR – AI to Aspire Certificate for Skill Competency, supported by Microsoft and recognized by NCVET.",
    skills: [
      "Artificial Intelligence",
      "Generative AI",
      "Responsible AI",
    ],
    icon: BrainCircuit,
  },

  {
    id: "cpps",
    title: "Certified Phishing Prevention Specialist",
    issuer: "Hack & Fix",
    date: "Dec 2025",
    credentialId:
      "7527-9509-6062-7605",
    description:
      "Earned the CPPS credential with a focus on phishing prevention, security awareness and protection against social engineering threats.",
    skills: [
      "Cybersecurity",
      "Phishing",
      "Security Awareness",
    ],
    icon: ShieldCheck,
  },

  {
    id: "aws-solutions-architecture",
    title: "AWS Solutions Architecture Job Simulation",
    issuer: "Forage",
    date: "Jan 2026",
    credentialId:
      "GNdgpChEtnHnho67r",
    description:
      "Completed the AWS Solutions Architecture Job Simulation, gaining practical experience designing a simple and scalable hosting architecture.",
    skills: [
      "Amazon Web Services",
      "Solution Architecture",
      "Cloud Computing",
    ],
    credentialUrl:
      "https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_GNdgpChEtnHnho67r_1767903302247_completion_certificate.pdf?utm_source=chatgpt.com",
    icon: Cloud,
  },

  {
    id: "cisco-packet-tracer",
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Jul 2026",
    credentialId:
      "b2f600e7-0c5f-4aa8-b9b4-1b57e57c48bf",
    description:
      "Completed Cisco Networking Academy's Packet Tracer course, developing foundational skills in network simulation, topology design and device configuration.",
    skills: [
      "Cisco Packet Tracer",
      "Computer Networking",
      "Network Configuration",
    ],
    icon: Network,
  },
]

/* =========================================================
   CERTIFICATION CARD
   ========================================================= */

interface CertificationCardProps {
  certification: Certification
  index: number
  expanded: boolean
  onToggle: () => void
}

function CertificationCard({
  certification,
  index,
  expanded,
  onToggle,
}: CertificationCardProps) {
  const Icon = certification.icon

  return (
    <motion.article
      layout
      transition={{
        layout: {
          duration: 0.35,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
      className={cn(
        "group relative self-start shrink-0 overflow-hidden",
        "w-[270px] sm:w-[300px] lg:w-[320px]",
        "rounded-[24px] border",
        "transition-colors duration-300",

        expanded
          ? [
              "border-cyan-400/35",
              "bg-white/[0.05]",
              "shadow-[0_22px_70px_rgba(34,211,238,0.10)]",
            ]
          : [
              "border-white/[0.08]",
              "bg-white/[0.025]",
              "hover:border-cyan-400/25",
              "hover:bg-white/[0.04]",
            ]
      )}
    >
      {/* EXPANDED GLOW */}

      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={cn(
                "pointer-events-none absolute -right-20 -top-20",
                "h-52 w-52 rounded-full",
                "bg-cyan-400/[0.10] blur-[85px]"
              )}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "pointer-events-none absolute -bottom-20 -left-20",
                "h-48 w-48 rounded-full",
                "bg-violet-500/[0.08] blur-[90px]"
              )}
            />
          </>
        )}
      </AnimatePresence>

      {/* ACTIVE TOP LINE */}

      <motion.div
        initial={false}
        animate={{
          scaleX: expanded ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className={cn(
          "absolute left-0 right-0 top-0",
          "h-px origin-left",
          "bg-linear-to-r",
          "from-transparent via-cyan-400 to-transparent"
        )}
      />

      {/* =====================================================
          CARD HEADER / CLICK TARGET
          ===================================================== */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onToggle()
        }}
        aria-expanded={expanded}
        aria-label={
          expanded
            ? `Close ${certification.title}`
            : `Open ${certification.title}`
        }
        className={cn(
          "relative z-10 block w-full",
          "p-5 text-left sm:p-6",
          "cursor-pointer"
        )}
      >
        {/* ICON + NUMBER */}

        <div className="flex items-start justify-between gap-4">
          <motion.div
            animate={
              expanded
                ? {
                    scale: 1.06,
                    rotate: [0, 4, -3, 0],
                  }
                : {
                    scale: 1,
                    rotate: 0,
                  }
            }
            whileHover={{
              scale: 1.08,
              y: -2,
            }}
            transition={{
              duration: 0.35,
            }}
            className={cn(
              "relative flex h-12 w-12 shrink-0",
              "items-center justify-center",
              "rounded-2xl border",

              expanded
                ? [
                    "border-cyan-400/35",
                    "bg-cyan-400/[0.10]",
                    "text-cyan-300",
                  ]
                : [
                    "border-white/[0.08]",
                    "bg-white/[0.04]",
                    "text-foreground/70",
                  ]
            )}
          >
            {expanded && (
              <motion.span
                aria-hidden="true"
                className={cn(
                  "absolute inset-1 rounded-xl",
                  "bg-cyan-400/20 blur-xl"
                )}
                animate={{
                  opacity: [0.15, 0.6, 0.15],
                  scale: [0.85, 1.15, 0.85],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            <Icon className="relative z-10 h-5 w-5" />
          </motion.div>

          <span
            className={cn(
              "text-[10px] font-semibold",
              "tracking-[0.22em]",
              "text-muted-foreground/35"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* DATE */}

        <div
          className={cn(
            "mt-5 flex items-center gap-2",
            "text-[10px] font-semibold uppercase",
            "tracking-[0.18em]",
            "text-cyan-300/80"
          )}
        >
          <CalendarDays className="h-3 w-3" />
          {certification.date}
        </div>

        {/* TITLE */}

        <h3
          className={cn(
            "mt-3 min-h-[52px]",
            "text-lg font-semibold leading-snug",
            "tracking-tight transition-colors duration-300",

            expanded
              ? "text-cyan-200"
              : "text-foreground group-hover:text-cyan-200"
          )}
        >
          {certification.title}
        </h3>

        {/* ISSUER */}

        <p className="mt-2 truncate text-sm text-muted-foreground">
          {certification.issuer}
        </p>

        {/* OPEN / CLOSE */}

        <div className="mt-6 flex items-center justify-between">
          <span
            className={cn(
              "text-[10px] font-medium uppercase",
              "tracking-[0.15em]",

              expanded
                ? "text-cyan-300"
                : "text-muted-foreground/55"
            )}
          >
            {expanded ? "Close details" : "Explore"}
          </span>

          <motion.span
            animate={{
              rotate: expanded ? 180 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className={cn(
              "flex h-8 w-8",
              "items-center justify-center",
              "rounded-full border",

              expanded
                ? [
                    "border-cyan-400/30",
                    "bg-cyan-400/[0.08]",
                    "text-cyan-300",
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

      {/* =====================================================
          EXPANDED CONTENT
          ===================================================== */}

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
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
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              },
              opacity: {
                duration: 0.22,
              },
            }}
            className="overflow-hidden"
          >
            <div className="relative z-10 px-5 pb-6 sm:px-6 sm:pb-7">
              {/* DIVIDER */}

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.35,
                }}
                className={cn(
                  "mb-5 h-px origin-left",
                  "bg-linear-to-r",
                  "from-cyan-400/40 via-white/[0.07] to-transparent"
                )}
              />

              {/* CREDENTIAL ID */}

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
                  delay: 0.06,
                }}
                className="flex min-w-0 items-start gap-2"
              >
                <Fingerprint
                  className={cn(
                    "mt-0.5 h-3.5 w-3.5",
                    "shrink-0 text-cyan-300"
                  )}
                />

                <div className="min-w-0">
                  <span
                    className={cn(
                      "text-[10px] uppercase",
                      "tracking-[0.12em]",
                      "text-foreground/50"
                    )}
                  >
                    Credential ID
                  </span>

                  <p
                    className={cn(
                      "mt-1 break-all",
                      "text-[10px] leading-4",
                      "text-muted-foreground"
                    )}
                  >
                    {certification.credentialId}
                  </p>
                </div>
              </motion.div>

              {/* OPTIONAL INFORMATION */}

              {(certification.level ||
                certification.duration ||
                certification.credits) && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.09,
                  }}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {certification.level && (
                    <span
                      className={cn(
                        "rounded-full border",
                        "border-violet-400/20",
                        "bg-violet-400/[0.06]",
                        "px-2.5 py-1",
                        "text-[9px] text-violet-200"
                      )}
                    >
                      {certification.level}
                    </span>
                  )}

                  {certification.duration && (
                    <span
                      className={cn(
                        "rounded-full border",
                        "border-white/[0.08]",
                        "bg-white/[0.025]",
                        "px-2.5 py-1",
                        "text-[9px] text-muted-foreground"
                      )}
                    >
                      {certification.duration}
                    </span>
                  )}

                  {certification.credits && (
                    <span
                      className={cn(
                        "rounded-full border",
                        "border-white/[0.08]",
                        "bg-white/[0.025]",
                        "px-2.5 py-1",
                        "text-[9px] text-muted-foreground"
                      )}
                    >
                      {certification.credits} Credits
                    </span>
                  )}
                </motion.div>
              )}

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
                  delay: 0.1,
                }}
                className={cn(
                  "mt-5 text-[12px]",
                  "leading-5 text-muted-foreground"
                )}
              >
                {certification.description}
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
                  delay: 0.14,
                }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {certification.skills.map((skill, skillIndex) => (
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
                      delay: 0.15 + skillIndex * 0.03,
                    }}
                    whileHover={{
                      y: -2,
                      scale: 1.02,
                    }}
                    className={cn(
                      "rounded-full border",
                      "border-white/[0.08]",
                      "bg-white/[0.025]",
                      "px-2.5 py-1",
                      "text-[9px] text-foreground/70",
                      "transition-colors",
                      "hover:border-cyan-400/30",
                      "hover:text-cyan-200"
                    )}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* VERIFIED */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.17,
                }}
                className={cn(
                  "mt-5 flex items-center gap-2",
                  "text-[9px] text-emerald-300/80"
                )}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Credential information
              </motion.div>

              {/* VIEW CREDENTIAL */}

              {certification.credentialUrl ? (
                <motion.a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(event) => {
                    /*
                     * Prevent carousel drag capture from
                     * interfering with this link.
                     */
                    event.stopPropagation()
                  }}
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={cn(
                    "group/link mt-5",
                    "inline-flex items-center gap-2",
                    "rounded-xl border",
                    "border-cyan-400/25",
                    "bg-cyan-400/[0.06]",
                    "px-3.5 py-2.5",
                    "text-[11px] font-medium",
                    "text-cyan-100",
                    "transition-colors",
                    "hover:border-cyan-400/45",
                    "hover:bg-cyan-400/[0.10]"
                  )}
                >
                  <Award className="h-3.5 w-3.5 text-cyan-300" />

                  View Credential

                  <ExternalLink
                    className={cn(
                      "h-3 w-3 transition-transform",
                      "group-hover/link:translate-x-0.5",
                      "group-hover/link:-translate-y-0.5"
                    )}
                  />
                </motion.a>
              ) : (
                <motion.a
                  href="https://www.linkedin.com/in/prasoon7pathak07/details/certifications/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(event) => {
                    event.stopPropagation()
                  }}
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={cn(
                    "group/link mt-5",
                    "inline-flex items-center gap-2",
                    "rounded-xl border",
                    "border-white/[0.12]",
                    "bg-white/[0.04]",
                    "px-3.5 py-2.5",
                    "text-[11px] font-medium",
                    "text-foreground/80",
                    "transition-colors",
                    "hover:border-cyan-400/30",
                    "hover:bg-cyan-400/[0.08]",
                    "hover:text-cyan-100"
                  )}
                >
                  <FaLinkedin
                    className={cn(
                      "h-3.5 w-3.5",
                      "text-[#0A66C2]"
                    )}
                  />

                  View on LinkedIn

                  <ExternalLink
                    className={cn(
                      "h-3 w-3 transition-transform",
                      "group-hover/link:translate-x-0.5",
                      "group-hover/link:-translate-y-0.5"
                    )}
                  />
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

/* =========================================================
   INFINITE CAROUSEL
   ========================================================= */

interface InfiniteCarouselProps {
  expandedId: string | null
  onToggle: (id: string) => void
}

function InfiniteCarousel({
  expandedId,
  onToggle,
}: InfiniteCarouselProps) {
  const viewportRef =
    React.useRef<HTMLDivElement>(null)

  const firstSetRef =
    React.useRef<HTMLDivElement>(null)

  const animationFrameRef =
    React.useRef<number | null>(null)

  /*
   * IMPORTANT:
   *
   * Pointer down does NOT immediately mean dragging.
   * Dragging starts only after DRAG_THRESHOLD is crossed.
   */
  const isPointerDownRef =
    React.useRef(false)

  const isDraggingRef =
    React.useRef(false)

  const isHoveredRef =
    React.useRef(false)

  const dragStartXRef =
    React.useRef(0)

  const dragStartScrollRef =
    React.useRef(0)

  const suppressClickRef =
    React.useRef(false)

  const DRAG_THRESHOLD = 8

  /* =========================================================
     NORMALIZE INFINITE SCROLL
     ========================================================= */

  const normalizeScroll =
    React.useCallback(() => {
      const viewport =
        viewportRef.current

      const firstSet =
        firstSetRef.current

      if (!viewport || !firstSet) {
        return
      }

      const setWidth =
        firstSet.offsetWidth

      if (setWidth <= 0) {
        return
      }

      /*
       * If we travel too far left,
       * jump forward exactly one copy.
       */
      if (
        viewport.scrollLeft <
        setWidth * 0.35
      ) {
        viewport.scrollLeft +=
          setWidth
      }

      /*
       * If we travel too far right,
       * jump backwards exactly one copy.
       */
      if (
        viewport.scrollLeft >
        setWidth * 1.65
      ) {
        viewport.scrollLeft -=
          setWidth
      }
    }, [])

  /* =========================================================
     INITIAL CAROUSEL POSITION
     ========================================================= */

  React.useEffect(() => {
    const viewport =
      viewportRef.current

    const firstSet =
      firstSetRef.current

    if (!viewport || !firstSet) {
      return
    }

    let frameOne = 0
    let frameTwo = 0

    /*
     * Two RAFs ensure layout width has been calculated
     * before positioning the carousel.
     */
    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        const setWidth =
          firstSet.offsetWidth

        if (setWidth > 0) {
          viewport.scrollLeft =
            setWidth
        }
      })
    })

    return () => {
      cancelAnimationFrame(frameOne)
      cancelAnimationFrame(frameTwo)
    }
  }, [])

  /* =========================================================
     AUTO SCROLL
     ========================================================= */

  React.useEffect(() => {
    let previousTime:
      number | null = null

    const animate = (
      time: number
    ) => {
      const viewport =
        viewportRef.current

      if (viewport) {
        if (previousTime === null) {
          previousTime = time
        }

        const delta =
          Math.min(
            time - previousTime,
            32
          )

        previousTime = time

        /*
         * Pause when:
         *
         * 1. User is hovering
         * 2. User is actually dragging
         * 3. Any certification is expanded
         */
        const shouldPause =
          isHoveredRef.current ||
          isDraggingRef.current ||
          expandedId !== null

        if (!shouldPause) {
          viewport.scrollLeft +=
            delta * 0.022

          normalizeScroll()
        }
      }

      animationFrameRef.current =
        requestAnimationFrame(
          animate
        )
    }

    animationFrameRef.current =
      requestAnimationFrame(
        animate
      )

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        )
      }
    }
  }, [
    expandedId,
    normalizeScroll,
  ])

  /* =========================================================
     WHEEL / TRACKPAD SCROLL
     ========================================================= */

  React.useEffect(() => {
    const viewport =
      viewportRef.current

    if (!viewport) {
      return
    }

    const handleWheel = (
      event: WheelEvent
    ) => {
      if (
        Math.abs(event.deltaX) < 1 &&
        Math.abs(event.deltaY) < 1
      ) {
        return
      }

      const movement =
        Math.abs(event.deltaX) >
        Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY

      viewport.scrollLeft +=
        movement

      normalizeScroll()

      event.preventDefault()
    }

    viewport.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      viewport.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [normalizeScroll])

  /* =========================================================
     POINTER DOWN
     ========================================================= */

  const handlePointerDown = (
    event:
      React.PointerEvent<HTMLDivElement>
  ) => {
    /*
     * Only handle primary mouse button.
     */
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return
    }

    const viewport =
      viewportRef.current

    if (!viewport) {
      return
    }

    /*
     * IMPORTANT:
     *
     * We are NOT dragging yet.
     *
     * A normal click starts here too.
     */
    isPointerDownRef.current = true
    isDraggingRef.current = false
    suppressClickRef.current = false

    dragStartXRef.current =
      event.clientX

    dragStartScrollRef.current =
      viewport.scrollLeft
  }

  /* =========================================================
     POINTER MOVE
     ========================================================= */

  const handlePointerMove = (
    event:
      React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isPointerDownRef.current) {
      return
    }

    const viewport =
      viewportRef.current

    if (!viewport) {
      return
    }

    const deltaX =
      event.clientX -
      dragStartXRef.current

    /*
     * Normal clicks often move 1-5 pixels.
     *
     * Do absolutely nothing until movement
     * exceeds our threshold.
     */
    if (
      !isDraggingRef.current &&
      Math.abs(deltaX) <
        DRAG_THRESHOLD
    ) {
      return
    }

    /*
     * NOW this interaction becomes a drag.
     */
    if (!isDraggingRef.current) {
      isDraggingRef.current = true
      suppressClickRef.current = true

      /*
       * Capture only after actual drag begins.
       *
       * This is the major fix compared with
       * the previous implementation.
       */
      try {
        viewport.setPointerCapture(
          event.pointerId
        )
      } catch {
        // Pointer capture is optional.
      }
    }

    viewport.scrollLeft =
      dragStartScrollRef.current -
      deltaX

    normalizeScroll()
  }

  /* =========================================================
     POINTER FINISH
     ========================================================= */

  const finishPointerInteraction = (
    event:
      React.PointerEvent<HTMLDivElement>
  ) => {
    const viewport =
      viewportRef.current

    const wasDragging =
      isDraggingRef.current

    isPointerDownRef.current = false
    isDraggingRef.current = false

    if (
      viewport &&
      viewport.hasPointerCapture?.(
        event.pointerId
      )
    ) {
      try {
        viewport.releasePointerCapture(
          event.pointerId
        )
      } catch {
        // Ignore unsupported capture release.
      }
    }

    normalizeScroll()

    /*
     * Browser fires click AFTER pointerup.
     *
     * Therefore keep suppressClick=true for
     * one event-loop tick after a real drag.
     */
    if (wasDragging) {
      window.setTimeout(() => {
        suppressClickRef.current =
          false
      }, 0)
    } else {
      suppressClickRef.current =
        false
    }
  }

  /* =========================================================
     CARD CLICK
     ========================================================= */

  const handleCardToggle = (
    id: string
  ) => {
    /*
     * Suppress ONLY the synthetic click generated
     * immediately after a genuine drag.
     */
    if (suppressClickRef.current) {
      return
    }

    /*
     * Normal click reaches the parent state.
     */
    onToggle(id)
  }

  /* =========================================================
     RENDER DUPLICATED SET
     ========================================================= */

  const renderSet = (
    setIndex: number,
    attachRef = false
  ) => (
    <div
      ref={
        attachRef
          ? firstSetRef
          : undefined
      }
      aria-hidden={
        setIndex === 1
          ? undefined
          : true
      }
      className={cn(
        "flex shrink-0 items-start",
        "gap-4 pr-4",
        "sm:gap-5 sm:pr-5"
      )}
    >
      {certifications.map(
        (
          certification,
          index
        ) => (
          <CertificationCard
            key={`${setIndex}-${certification.id}`}
            certification={
              certification
            }
            index={index}
            expanded={
              expandedId ===
              certification.id
            }
            onToggle={() =>
              handleCardToggle(
                certification.id
              )
            }
          />
        )
      )}
    </div>
  )

  return (
    <div className="relative">
      {/* LEFT FADE */}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute bottom-0 left-0 top-0",
          "z-20 w-8",
          "bg-linear-to-r",
          "from-background to-transparent",
          "sm:w-16 lg:w-24"
        )}
      />

      {/* RIGHT FADE */}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute bottom-0 right-0 top-0",
          "z-20 w-8",
          "bg-linear-to-l",
          "from-background to-transparent",
          "sm:w-16 lg:w-24"
        )}
      />

      {/* =====================================================
          SCROLL VIEWPORT
          ===================================================== */}

      <div
        ref={viewportRef}

        onMouseEnter={() => {
          isHoveredRef.current = true
        }}

        onMouseLeave={() => {
          /*
           * Do NOT cancel pointer/drag state here.
           * Pointer events handle that themselves.
           */
          isHoveredRef.current = false
        }}

        onPointerDown={
          handlePointerDown
        }

        onPointerMove={
          handlePointerMove
        }

        onPointerUp={
          finishPointerInteraction
        }

        onPointerCancel={
          finishPointerInteraction
        }

        onScroll={
          normalizeScroll
        }

        className={cn(
          "relative w-full",
          "overflow-x-scroll",
          "overflow-y-hidden",

          "select-none",

          "cursor-grab",
          "active:cursor-grabbing",

          /*
           * Keep normal vertical page scrolling
           * available on touch devices while also
           * allowing horizontal interaction.
           */
          "touch-pan-y",

          "[scrollbar-width:none]",
          "[-ms-overflow-style:none]",
          "[&::-webkit-scrollbar]:hidden"
        )}
      >
        {/* INFINITE TRACK */}

        <div
          className={cn(
            "flex w-max items-start",
            "py-4"
          )}
        >
          {renderSet(0, true)}
          {renderSet(1)}
          {renderSet(2)}
        </div>
      </div>

      {/* INTERACTION HINT */}

      <div
        className={cn(
          "mt-3 flex items-center",
          "justify-center gap-3"
        )}
      >
        <span
          className={cn(
            "h-px w-8",
            "bg-linear-to-r",
            "from-transparent to-white/10"
          )}
        />

        <span
          className={cn(
            "text-[9px] uppercase",
            "tracking-[0.18em]",
            "text-muted-foreground/45"
          )}
        >
          Drag or scroll to explore
        </span>

        <span
          className={cn(
            "h-px w-8",
            "bg-linear-to-l",
            "from-transparent to-white/10"
          )}
        />
      </div>
    </div>
  )
}

/* =========================================================
   CERTIFICATION SECTION
   ========================================================= */

const CertificationSection =
  React.forwardRef<
    React.ElementRef<
      typeof SectionWrapper
    >,
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
       * SINGLE SOURCE OF TRUTH.
       *
       * null:
       * nothing expanded
       *
       * certification ID:
       * exactly that certification is expanded
       */
      const [
        expandedId,
        setExpandedId,
      ] =
        React.useState<
          string | null
        >(null)

      const handleToggle =
        React.useCallback(
          (id: string) => {
            setExpandedId(
              (current) =>
                current === id
                  ? null
                  : id
            )
          },
          []
        )

      return (
        <SectionWrapper
          ref={ref}
          id="certifications"
          background="dark"
          padding="xl"
          animate={false}
          className={cn(
            "relative w-full overflow-hidden",
            className
          )}
          {...props}
        >
          {/* =================================================
              BACKGROUND
              ================================================= */}

          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0",
              "bg-[radial-gradient(circle_at_15%_30%,rgba(34,211,238,0.055),transparent_30%),radial-gradient(circle_at_85%_65%,rgba(139,92,246,0.055),transparent_32%)]"
            )}
          />

          <motion.div
            aria-hidden="true"
            animate={{
              x: [0, 30, 0],
              y: [0, -18, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "pointer-events-none absolute",
              "left-[8%] top-[15%]",
              "h-64 w-64 rounded-full",
              "bg-cyan-400/[0.025]",
              "blur-[110px]"
            )}
          />

          <motion.div
            aria-hidden="true"
            animate={{
              x: [0, -25, 0],
              y: [0, 18, 0],
            }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "pointer-events-none absolute",
              "bottom-[10%] right-[5%]",
              "h-72 w-72 rounded-full",
              "bg-violet-500/[0.035]",
              "blur-[120px]"
            )}
          />

          {/* =================================================
              HEADER
              ================================================= */}

          <div
            className={cn(
              "relative z-10",
              "mx-auto w-full max-w-7xl",
              "px-5 sm:px-6 lg:px-8"
            )}
          >
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
              className="mb-7 sm:mb-8"
            >
              {/* EYEBROW */}

              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [
                      0,
                      12,
                      -8,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                </motion.div>

                <span
                  className={cn(
                    "text-[10px] font-semibold",
                    "uppercase tracking-[0.25em]",
                    "text-cyan-300 sm:text-xs"
                  )}
                >
                  Credentials & Learning
                </span>
              </div>

              {/* TITLE */}

              <div
                className={cn(
                  "mt-3 flex items-end",
                  "justify-between gap-6"
                )}
              >
                <h2
                  className={cn(
                    "text-4xl font-semibold",
                    "tracking-tight text-foreground",
                    "sm:text-5xl md:text-6xl"
                  )}
                >
                  Certifications
                </h2>

                <div
                  className={cn(
                    "hidden items-center gap-2",
                    "pb-1 text-xs",
                    "text-muted-foreground",
                    "sm:flex"
                  )}
                >
                  <Award className="h-3.5 w-3.5 text-cyan-300" />

                  {certifications.length} credentials
                </div>
              </div>

              {/* LINE */}

              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 100,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                }}
                className={cn(
                  "mt-5 h-px",
                  "bg-linear-to-r",
                  "from-cyan-400",
                  "via-violet-400/60",
                  "to-transparent"
                )}
              />
            </motion.div>
          </div>

          {/* =================================================
              INFINITE CAROUSEL
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="relative z-10"
          >
            <InfiniteCarousel
              expandedId={
                expandedId
              }
              onToggle={
                handleToggle
              }
            />
          </motion.div>
        </SectionWrapper>
      )
    }
  )

CertificationSection.displayName =
  "CertificationSection"

export { CertificationSection }