"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDown, Download, UserRound, X } from "lucide-react"

import {
  FaLinkedinIn as LinkedinIcon,
  FaGithub as GitHub,
  FaInstagram as Instagram,
} from "react-icons/fa"

import {
  SiGeeksforgeeks as GeeksforGeeksIcon,
  SiLeetcode as LeetCodeIcon,
} from "react-icons/si"

import { cn } from "@/lib/utils"
import { Container, SectionWrapper } from "@/components/layout"

import { aboutData } from "@/data/about"
/* =========================================================
   DATA  ---CHANGE THESE LINKS TO YOUR OWN SOCIAL LINKS ---
   ========================================================= */

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/pathakpk7",
    icon: GitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/prasoon7pathak07/",
    icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_.prasoon_._._/",
    icon: Instagram,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/pathakMahi/",
    icon: LeetCodeIcon,
  },
  {
    name: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/profile/prasoon7pathak",
    icon: GeeksforGeeksIcon,
  },
]

/* =========================================================
   ANIMATION
   ========================================================= */

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.75,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

/* =========================================================
   SOCIAL ICON
   ========================================================= */

interface SocialIconProps {
  name: string
  href: string
  icon: React.ComponentType<{
    className?: string
  }>
}

function SocialIcon({
  name,
  href,
  icon: Icon,
}: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      title={name}
      whileHover={{
        y: -4,
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      transition={{
        duration: 0.22,
      }}
      className={cn(
        "group/social",
        "relative",
        "flex",
        "h-10 w-10",
        "items-center",
        "justify-center",
        "overflow-hidden",
        "rounded-2xl",
        "border",
        "border-white/[0.07]",
        "bg-white/[0.025]",
        "text-white/45",
        "backdrop-blur-xl",
        "transition-all",
        "duration-300",

        "hover:border-cyan-400/20",
        "hover:bg-cyan-400/[0.065]",
        "hover:text-cyan-200",
        "hover:shadow-[0_0_22px_rgba(103,232,249,0.10)]",

        "sm:h-11 sm:w-11"
      )}
    >
      {/* ICON GLOW */}

      <span
        aria-hidden="true"
        className={cn(
          "absolute",
          "h-6 w-6",
          "rounded-full",
          "bg-cyan-300/0",
          "blur-lg",
          "transition-colors",
          "duration-300",
          "group-hover/social:bg-cyan-300/20"
        )}
      />

      <Icon
        className={cn(
          "relative z-10",
          "h-[17px] w-[17px]",
          "transition-transform",
          "duration-300",
          "group-hover/social:scale-110"
        )}
      />
    </motion.a>
  )
}

/* =========================================================
   PROFILE VISUAL
   ========================================================= */

function ProfileVisual() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 55,
        scale: 0.93,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        duration: 1.1,
        delay: 0.18,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(
        "relative",
        "flex",
        "h-full w-full",
        "items-center",
        "justify-end"
      )}
    >
      {/* =====================================================
          LARGE AMBIENT CYAN GLOW
          ===================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "pointer-events-none",
          "absolute",
          "right-[0%]",
          "top-1/2",
          "h-[72%]",
          "w-[88%]",
          "-translate-y-1/2",
          "rounded-full",
          "bg-cyan-400/[0.10]",
          "blur-[90px]",
          "lg:blur-[120px]"
        )}
      />

      {/* =====================================================
          PURPLE GLOW
          ===================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -18, 0],
          y: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "pointer-events-none",
          "absolute",
          "bottom-[12%]",
          "right-[5%]",
          "h-[42%]",
          "w-[50%]",
          "rounded-full",
          "bg-violet-500/[0.10]",
          "blur-[90px]"
        )}
      />

      {/* =====================================================
          OUTER ORBIT
          ===================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
        }}
        className={cn(
          "pointer-events-none",
          "absolute",
          "right-[-2%]",
          "top-1/2",
          "aspect-square",
          "w-[105%]",
          "max-w-[610px]",
          "-translate-y-1/2",
          "rounded-full",
          "border",
          "border-cyan-400/[0.10]"
        )}
      >
        <span
          className={cn(
            "absolute",
            "left-1/2",
            "top-[-4px]",
            "h-2 w-2",
            "-translate-x-1/2",
            "rounded-full",
            "bg-cyan-300",
            "shadow-[0_0_16px_rgba(103,232,249,0.9)]"
          )}
        />
      </motion.div>

      {/* =====================================================
          SECOND ORBIT
          ===================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 43,
          repeat: Infinity,
          ease: "linear",
        }}
        className={cn(
          "pointer-events-none",
          "absolute",
          "right-[5%]",
          "top-1/2",
          "aspect-square",
          "w-[88%]",
          "max-w-[525px]",
          "-translate-y-1/2",
          "rounded-full",
          "border",
          "border-violet-400/[0.08]"
        )}
      >
        <span
          className={cn(
            "absolute",
            "bottom-[13%]",
            "left-[7%]",
            "h-1.5 w-1.5",
            "rounded-full",
            "bg-violet-300",
            "shadow-[0_0_14px_rgba(196,181,253,0.85)]"
          )}
        />
      </motion.div>

      {/* =====================================================
          PROFILE
          ===================================================== */}

      <motion.div
        whileHover={{
          scale: 1.018,
        }}
        transition={{
          duration: 0.45,
        }}
        className={cn(
          "relative z-10",

          /*
           * Larger than previous version.
           */

          "aspect-[4/5]",
          "w-[105%]",
          "max-w-[510px]",

          "sm:w-[100%]",
          "md:w-[96%]",
          "lg:w-[94%]",
          "xl:max-w-[560px]"
        )}
      >
        {/* IMAGE HALO */}

        <motion.div
          aria-hidden="true"
          animate={{
            opacity: [0.16, 0.3, 0.16],
            scale: [0.96, 1.04, 0.96],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute",
            "inset-[10%]",
            "rounded-[45%]",
            "bg-cyan-400/[0.14]",
            "blur-[55px]"
          )}
        />

        {/* IMAGE */}

        <div
          className={cn(
            "relative",
            "h-full w-full",
            "overflow-hidden"
          )}
        >
          <Image
            src="/profile.png"
            alt="Prasoon Pathak"
            fill
            priority
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 48vw, 560px"
            className={cn(
              "object-contain",
              "object-bottom",
              "drop-shadow-[0_28px_50px_rgba(0,0,0,0.50)]"
            )}
          />

          {/* LOWER FADE */}

          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none",
              "absolute",
              "bottom-0 left-0 right-0",
              "h-[18%]",
              "bg-linear-to-t",
              "from-background",
              "via-background/25",
              "to-transparent"
            )}
          />
        </div>

        {/* ===================================================
            FLOATING PARTICLES
            =================================================== */}

        <motion.span
          aria-hidden="true"
          animate={{
            y: [0, -12, 0],
            x: [0, 4, 0],
            opacity: [0.3, 0.85, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute",
            "right-[4%]",
            "top-[22%]",
            "h-1.5 w-1.5",
            "rounded-full",
            "bg-cyan-300",
            "shadow-[0_0_16px_rgba(103,232,249,0.9)]"
          )}
        />

        <motion.span
          aria-hidden="true"
          animate={{
            y: [0, 10, 0],
            x: [0, -5, 0],
            opacity: [0.25, 0.7, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className={cn(
            "absolute",
            "left-[4%]",
            "top-[42%]",
            "h-1.5 w-1.5",
            "rounded-full",
            "bg-violet-300",
            "shadow-[0_0_14px_rgba(196,181,253,0.9)]"
          )}
        />
      </motion.div>
    </motion.div>
  )
}

/* =========================================================
   HERO
   ========================================================= */

const HeroSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<
    React.ComponentPropsWithoutRef<typeof SectionWrapper>,
    "children"
  >
>(({ className, ...props }, ref) => {
  const [isKnowMeOpen, setIsKnowMeOpen] = React.useState(false)

  const scrollToAbout = () => {
    const aboutSection =
      document.getElementById("about")

    if (!aboutSection) return

    aboutSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <SectionWrapper
      ref={ref}
      id="home"
      animate={false}
      className={cn(
        "relative",
        "min-h-[100svh]",
        "w-full",
        "overflow-hidden",

        /*
         * Reduced top spacing.
         * Content begins much closer to floating navbar.
         */

        "pt-[72px]",
        "sm:pt-[74px]",
        "lg:pt-[76px]",

        className
      )}
      {...props}
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* GRID */}

        <div
          className={cn(
            "absolute inset-0",
            "opacity-[0.022]",
            "[background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)]",
            "[background-size:56px_56px]",
            "[mask-image:linear-gradient(to_bottom,black_5%,black_70%,transparent_100%)]"
          )}
        />

        {/* CYAN FIELD */}

        <motion.div
          animate={{
            x: [-20, 25, -20],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute",
            "left-[46%]",
            "top-[35%]",
            "h-[520px]",
            "w-[520px]",
            "rounded-full",
            "bg-cyan-400/[0.035]",
            "blur-[140px]"
          )}
        />

        {/* PURPLE FIELD */}

        <motion.div
          animate={{
            x: [20, -25, 20],
            y: [-10, 20, -10],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute",
            "-left-[8%]",
            "top-[20%]",
            "h-[420px]",
            "w-[420px]",
            "rounded-full",
            "bg-violet-500/[0.035]",
            "blur-[130px]"
          )}
        />

        {/* BOTTOM FADE */}

        <div
          className={cn(
            "absolute",
            "bottom-0 left-0 right-0",
            "h-36",
            "bg-linear-to-t",
            "from-background",
            "to-transparent"
          )}
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <Container
        size="cinematic"
        className={cn(
          "relative z-10",

          /*
           * We subtract navbar space instead of creating
           * another full 100vh content block.
           */

          "flex",
          "min-h-[calc(100svh-76px)]",
          "items-center"
        )}
      >
        <div
          className={cn(
            "grid",
            "w-full",
            "grid-cols-[55%_45%]",
            "items-center",
            "gap-0",

            "sm:grid-cols-[53%_47%]",
            "md:grid-cols-[51%_49%]",

            "lg:grid-cols-[48%_52%]",
            "lg:gap-4",

            "xl:grid-cols-[47%_53%]"
          )}
        >
          {/* =================================================
              LEFT
              ================================================= */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "relative z-20",
              "flex",
              "flex-col",
              "items-start",
              "justify-center",

              /*
               * Significantly less vertical padding than
               * previous hero.
               */

              "py-5",
              "sm:py-7",
              "lg:py-8"
            )}
          >
            {/* =================================================
                MICRO INTRO
                ================================================= */}

            <motion.div
              variants={itemVariants}
              className="mb-3"
            >
              <div
                className={cn(
                  "flex",
                  "items-center",
                  "gap-2.5"
                )}
              >
                <span className="relative flex h-2 w-2">
                  <motion.span
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className={cn(
                      "absolute",
                      "h-full w-full",
                      "rounded-full",
                      "bg-cyan-300"
                    )}
                  />

                  <span
                    className={cn(
                      "relative",
                      "h-2 w-2",
                      "rounded-full",
                      "bg-cyan-300",
                      "shadow-[0_0_10px_rgba(103,232,249,0.85)]"
                    )}
                  />
                </span>

                <span
                  className={cn(
                    "text-[8px]",
                    "font-medium",
                    "uppercase",
                    "tracking-[0.24em]",
                    "text-white/40",

                    "sm:text-[9px]",
                    "md:text-[10px]"
                  )}
                >
                  Hello, I&apos;m
                </span>
              </div>
            </motion.div>

            {/* =================================================
                MASSIVE FOOTER-STYLE NAME
                ================================================= */}

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              {/* NAME GLOW */}

              <motion.div
                aria-hidden="true"
                animate={{
                  opacity: [0.08, 0.18, 0.08],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={cn(
                  "pointer-events-none",
                  "absolute",
                  "left-[35%]",
                  "top-1/2",
                  "h-[80%]",
                  "w-[80%]",
                  "-translate-x-1/2",
                  "-translate-y-1/2",
                  "rounded-full",
                  "bg-cyan-300",
                  "blur-[75px]"
                )}
              />

              <motion.h1
                className={cn(
                  "relative",
                  "select-none",
                  "font-black",
                  "uppercase",
                  "leading-[0.79]",
                  "tracking-[-0.06em]",

                  "text-[clamp(2.45rem,10.5vw,4.3rem)]",
                  "sm:text-[clamp(3.6rem,9vw,5.8rem)]",
                  "md:text-[clamp(4.6rem,8vw,7.3rem)]",
                  "lg:text-[clamp(5.4rem,7.2vw,8.8rem)]"
                )}
              >
                {/* PRASOON */}

                <span
                  className={cn(
                    "block",
                    "bg-linear-to-b",
                    "from-white/[0.96]",
                    "via-cyan-100/[0.88]",
                    "to-cyan-300/[0.58]",
                    "bg-clip-text",
                    "text-transparent",
                    "drop-shadow-[0_0_18px_rgba(103,232,249,0.12)]"
                  )}
                >
                  PRASOON
                </span>

                {/* PATHAK */}

                <span
                  className={cn(
                    "block",
                    "bg-linear-to-r",
                    "from-cyan-300",
                    "via-cyan-100",
                    "to-violet-300",
                    "bg-clip-text",
                    "text-transparent",
                    "drop-shadow-[0_0_24px_rgba(103,232,249,0.16)]"
                  )}
                >
                  PATHAK
                </span>
              </motion.h1>
            </motion.div>

            {/* =================================================
                ANIMATED ENERGY LINE
                ================================================= */}

            <motion.div
              variants={itemVariants}
              className={cn(
                "relative",
                "mt-5",
                "h-px",
                "w-[88%]",
                "max-w-[520px]",
                "overflow-visible",
                "bg-linear-to-r",
                "from-cyan-400/5",
                "via-white/[0.13]",
                "to-transparent"
              )}
            >
              <motion.div
                animate={{
                  left: ["-15%", "100%"],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={cn(
                  "absolute",
                  "top-1/2",
                  "h-px",
                  "w-20",
                  "-translate-y-1/2",
                  "bg-linear-to-r",
                  "from-transparent",
                  "via-cyan-300",
                  "to-transparent",
                  "shadow-[0_0_12px_rgba(103,232,249,0.75)]"
                )}
              />
            </motion.div>

            {/* =================================================
                TAGLINE
                ================================================= */}

            <motion.p
              variants={itemVariants}
              className={cn(
                "mt-5",
                "max-w-[270px]",
                "text-[11px]",
                "font-medium",
                "leading-[1.65]",
                "tracking-[-0.01em]",
                "text-white/55",

                "sm:max-w-[390px]",
                "sm:text-sm",

                "md:max-w-[500px]",
                "md:text-base",

                "lg:max-w-[560px]",
                "lg:text-[17px]"
              )}
            >
              Shaping Ideas through{" "}
              <span className="text-cyan-200">
                Logic
              </span>
              ,{" "}
              <span className="text-violet-200">
                Intelligence
              </span>{" "}
              &amp; Innovation.
            </motion.p>

            {/* =================================================
                CONTROLS
                ================================================= */}

            <motion.div
              variants={itemVariants}
              className={cn(
                "mt-6",
                "flex",
                "flex-wrap",
                "items-center",
                "gap-3"
              )}
            >
              {/* RESUME */}

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -3,
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className={cn(
                  "group/resume",
                  "relative",
                  "flex",
                  "h-10",
                  "items-center",
                  "gap-2.5",
                  "overflow-hidden",
                  "rounded-full",
                  "border",
                  "border-cyan-400/20",
                  "bg-cyan-400/[0.055]",
                  "px-4",
                  "text-[10px]",
                  "font-semibold",
                  "tracking-[0.06em]",
                  "text-cyan-100",
                  "backdrop-blur-xl",
                  "transition-all",
                  "duration-300",

                  "hover:border-cyan-300/35",
                  "hover:bg-cyan-400/[0.09]",
                  "hover:shadow-[0_0_25px_rgba(103,232,249,0.10)]",

                  "sm:h-11",
                  "sm:px-5",
                  "sm:text-xs"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute",
                    "-left-8",
                    "top-0",
                    "h-full",
                    "w-6",
                    "rotate-12",
                    "bg-white/[0.12]",
                    "blur-sm",
                    "transition-transform",
                    "duration-700",
                    "group-hover/resume:translate-x-32"
                  )}
                />

                <span className="relative z-10">
                  Resume
                </span>

                <Download
                  className={cn(
                    "relative z-10",
                    "h-3.5 w-3.5",
                    "transition-transform",
                    "duration-300",
                    "group-hover/resume:translate-y-0.5"
                  )}
                />
              </motion.a>

              {/* =================================================
                  KNOW ME
                  ================================================= */}

              <motion.button
                type="button"
                onClick={() => setIsKnowMeOpen((open) => !open)}
                aria-expanded={isKnowMeOpen}
                aria-controls="know-me-card"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "group/knowme",
                  "relative",
                  "flex h-10 items-center gap-2.5",
                  "rounded-full border border-white/[0.08]",
                  "bg-white/[0.025] px-4",
                  "text-[10px] font-semibold tracking-[0.06em] text-white/75",
                  "backdrop-blur-xl",
                  "transition-all duration-300",
                  "hover:border-cyan-300/25 hover:bg-cyan-400/[0.06] hover:text-cyan-100",
                  "sm:h-11 sm:px-5 sm:text-xs"
                )}
              >
                <UserRound className="h-3.5 w-3.5 text-cyan-300/80" />
                <span>{isKnowMeOpen ? "Close" : "Know Me"}</span>
                <motion.span
                  animate={{ rotate: isKnowMeOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-cyan-300/70"
                >
                  ↓
                </motion.span>
              </motion.button>

              {/* =================================================
                  FLOATING SOCIAL DOCK
                  ================================================= */}

              <div
                className={cn(
                  "flex",
                  "items-center",
                  "gap-1",
                  "rounded-[20px]",
                  "border",
                  "border-white/[0.06]",
                  "bg-white/[0.018]",
                  "p-1",
                  "shadow-[0_12px_35px_rgba(0,0,0,0.20)]",
                  "backdrop-blur-2xl"
                )}
              >
                {socialLinks.map((social) => (
                  <SocialIcon
                    key={social.name}
                    {...social}
                  />
                ))}
              </div>
            </motion.div>

              {/* =================================================
                  KNOW ME CARD
                  ================================================= */}

<AnimatePresence initial={false}>
  {isKnowMeOpen && (
    <>
      {/* =================================================
          MOBILE — COMPACT KNOW ME CARD
          ================================================= */}

      <motion.div
        id="know-me-card"
        initial={{
          opacity: 0,
          height: 0,
          y: -8,
        }}
        animate={{
          opacity: 1,
          height: "auto",
          y: 0,
        }}
        exit={{
          opacity: 0,
          height: 0,
          y: -8,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="w-full overflow-hidden sm:hidden"
      >
        <div
          className={cn(
            "mt-3",
            "rounded-2xl",
            "border border-white/[0.08]",
            "bg-white/[0.025]",
            "p-3.5",
            "shadow-[0_16px_45px_rgba(0,0,0,0.22)]",
            "backdrop-blur-2xl"
          )}
        >
          {/* HEADER */}

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[8px]",
                  "font-semibold",
                  "uppercase",
                  "tracking-[0.22em]",
                  "text-cyan-300/70"
                )}
              >
                A little about me
              </p>

              <h3 className="mt-1 text-sm font-semibold text-white">
                {aboutData.name}
              </h3>

              <p className="mt-0.5 text-[9px] text-white/40">
                CSE Student &amp; Developer
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsKnowMeOpen(false)}
              aria-label="Close Know Me card"
              className={cn(
                "shrink-0",
                "rounded-full",
                "p-1",
                "text-white/35",
                "transition-colors",
                "hover:bg-white/[0.06]",
                "hover:text-white/80"
              )}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* SHORT INTRO */}

          <p
            className={cn(
              "mt-3",
              "text-[10px]",
              "leading-[1.6]",
              "text-white/55"
            )}
          >
            {aboutData.shortIntro}
          </p>

          {/* FOCUS */}

          <div className="mt-3">
            <p
              className={cn(
                "text-[7px]",
                "font-semibold",
                "uppercase",
                "tracking-[0.2em]",
                "text-white/30"
              )}
            >
              Focus
            </p>

            <div className="mt-1.5 flex flex-wrap gap-1">
              {aboutData.focusAreas.map((item) => (
                <span
                  key={item}
                  className={cn(
                    "rounded-full",
                    "border border-cyan-300/10",
                    "bg-cyan-300/[0.04]",
                    "px-2",
                    "py-0.5",
                    "text-[8px]",
                    "text-cyan-100/65"
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CURRENTLY BUILDING */}

          <div className="mt-3 border-t border-white/[0.06] pt-2.5">
            <p
              className={cn(
                "text-[7px]",
                "font-semibold",
                "uppercase",
                "tracking-[0.2em]",
                "text-white/30"
              )}
            >
              Currently
            </p>

            <p
              className={cn(
                "mt-1",
                "text-[9px]",
                "leading-[1.5]",
                "text-white/50"
              )}
            >
              Building web applications, AI-powered applications &amp;
              cybersecurity projects.
            </p>
          </div>
        </div>
      </motion.div>
      {/* =================================================
    TABLET / DESKTOP — FULL KNOW ME CARD
    ================================================= */}

<motion.div
  initial={{
    opacity: 0,
    height: 0,
    y: -8,
  }}
  animate={{
    opacity: 1,
    height: "auto",
    y: 0,
  }}
  exit={{
    opacity: 0,
    height: 0,
    y: -8,
  }}
  transition={{
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1],
  }}
  className="hidden w-full max-w-[560px] overflow-hidden sm:block"
>
  <div
    className={cn(
      "mt-4",
      "rounded-3xl",
      "border border-white/[0.08]",
      "bg-white/[0.025]",
      "p-4",
      "shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
      "backdrop-blur-2xl",
      "sm:p-5"
    )}
  >
    {/* HEADER */}

    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p
          className={cn(
            "text-[9px]",
            "font-semibold",
            "uppercase",
            "tracking-[0.24em]",
            "text-cyan-300/70"
          )}
        >
          A little about me
        </p>

        <h3 className="mt-1.5 text-base font-semibold text-white sm:text-lg">
          {aboutData.name}
        </h3>

        <p className="mt-1 text-[10px] text-white/40 sm:text-xs">
          {aboutData.role}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsKnowMeOpen(false)}
        aria-label="Close Know Me card"
        className={cn(
          "shrink-0",
          "rounded-full",
          "p-1.5",
          "text-white/35",
          "transition-colors",
          "hover:bg-white/[0.06]",
          "hover:text-white/80"
        )}
      >
        <X className="h-4 w-4" />
      </button>
    </div>

    {/* INTRODUCTION */}

    <p
      className={cn(
        "mt-4",
        "max-w-[520px]",
        "text-[11px]",
        "leading-[1.7]",
        "text-white/60",
        "sm:text-sm"
      )}
    >
      {aboutData.shortIntro}
    </p>

    {/* EDUCATION + BACKGROUND */}

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div
        className={cn(
          "rounded-2xl",
          "border border-white/[0.06]",
          "bg-black/10",
          "p-3"
        )}
      >
        <p
          className={cn(
            "text-[8px]",
            "font-semibold",
            "uppercase",
            "tracking-[0.2em]",
            "text-white/30"
          )}
        >
          Education
        </p>

        <p className="mt-1.5 text-[10px] leading-[1.6] text-white/55 sm:text-xs">
          {aboutData.education}
        </p>
      </div>

      <div
        className={cn(
          "rounded-2xl",
          "border border-white/[0.06]",
          "bg-black/10",
          "p-3"
        )}
      >
        <p
          className={cn(
            "text-[8px]",
            "font-semibold",
            "uppercase",
            "tracking-[0.2em]",
            "text-white/30"
          )}
        >
          Background
        </p>

        <p className="mt-1.5 text-[10px] leading-[1.6] text-white/55 sm:text-xs">
          {aboutData.background}
        </p>
      </div>
    </div>

    {/* FOCUS AREAS */}

    <div className="mt-4">
      <p
        className={cn(
          "text-[8px]",
          "font-semibold",
          "uppercase",
          "tracking-[0.2em]",
          "text-white/30"
        )}
      >
        Focus Areas
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {aboutData.focusAreas.map((item) => (
          <span
            key={item}
            className={cn(
              "rounded-full",
              "border border-cyan-300/10",
              "bg-cyan-300/[0.04]",
              "px-2.5",
              "py-1",
              "text-[9px]",
              "text-cyan-100/65",
              "sm:text-[10px]"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>

    {/* CURRENTLY BUILDING */}

    <div className="mt-4">
      <p
        className={cn(
          "text-[8px]",
          "font-semibold",
          "uppercase",
          "tracking-[0.2em]",
          "text-white/30"
        )}
      >
        Currently Building
      </p>

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
        {aboutData.currentlyBuilding.map((item) => (
          <span
            key={item}
            className="text-[10px] text-white/50 sm:text-xs"
          >
            • {item}
          </span>
        ))}
      </div>
    </div>

    {/* APPROACH */}

    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
      <span
        className={cn(
          "text-[8px]",
          "font-semibold",
          "uppercase",
          "tracking-[0.2em]",
          "text-white/30"
        )}
      >
        My approach
      </span>

      {aboutData.approach.map((item, index) => (
        <React.Fragment key={item}>
          {index > 0 && (
            <span className="text-cyan-300/30">
              →
            </span>
          )}

          <span className="text-[10px] font-medium text-white/60 sm:text-xs">
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  </div>
</motion.div>

      </>
    )}
</AnimatePresence>

            </motion.div>

          {/* =================================================
              RIGHT — ALWAYS RIGHT
              ================================================= */}

          <div
            className={cn(
              "relative",

              /*
               * Bigger portrait while preserving two-column
               * layout even on small screens.
               */

              "h-[63svh]",
              "min-h-[400px]",

              "sm:h-[72svh]",
              "sm:min-h-[500px]",

              "md:h-[79svh]",
              "md:min-h-[560px]",

              "lg:h-[84svh]",
              "lg:min-h-[630px]"
            )}
          >
            <ProfileVisual />
          </div>
        </div>
      </Container>

      {/* =====================================================
          EXPLORE
          ===================================================== */}

      <motion.button
        type="button"
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.25,
          duration: 0.6,
        }}
        className={cn(
          "absolute",
          "bottom-4",
          "left-1/2",
          "z-30",
          "-translate-x-1/2",
          "hidden",
          "flex-col",
          "items-center",
          "gap-1.5",
          "text-white/25",
          "transition-colors",
          "duration-300",
          "hover:text-cyan-300",
          "sm:flex"
        )}
      >
        <span
          className={cn(
            "text-[8px]",
            "font-medium",
            "uppercase",
            "tracking-[0.22em]"
          )}
        >
          Explore
        </span>

        <motion.span
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.button>

      {/* =====================================================
          BOTTOM ENERGY LINE
          ===================================================== */}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none",
          "absolute",
          "bottom-0",
          "left-0 right-0",
          "h-px",
          "bg-linear-to-r",
          "from-transparent",
          "via-cyan-400/30",
          "to-transparent"
        )}
      />
    </SectionWrapper>
  )
})

HeroSection.displayName = "HeroSection"

export { HeroSection }