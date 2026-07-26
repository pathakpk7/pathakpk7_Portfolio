"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Mail,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { SOCIAL_LINKS } from "@/constants"

import {
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
} from "react-icons/fa"

import {
  SiGithub,
  SiLeetcode,
  SiInstagram,
  SiGeeksforgeeks,
} from "react-icons/si"

/* =========================================================
   TYPES
   ========================================================= */

interface FooterProps {
  className?: string
}

/* =========================================================
   ICON MAP
   ========================================================= */

const ICON_MAP = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  Instagram: SiInstagram,
  LeetCode: SiLeetcode,
  GeeksforGeeks: SiGeeksforgeeks,
  Email: FaEnvelope,
}

/* =========================================================
   FOOTER
   ========================================================= */

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className }, ref) => {
    /*
     * Fixed year prevents SSR/client hydration differences
     * caused by evaluating dates separately.
     */
    const currentYear = 2026

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    return (
      <footer
        ref={ref}
        className={cn(
          "relative",
          "overflow-hidden",
          "border-t border-white/[0.06]",
          "bg-[#050911]",
          className
        )}
      >
        {/* =================================================
            AMBIENT BACKGROUND
            ================================================= */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {/* CENTER CYAN GLOW */}

          <motion.div
            animate={{
              x: [-30, 35, -30],
              y: [0, -20, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute",
              "left-[22%]",
              "top-[40%]",
              "h-[300px]",
              "w-[300px]",
              "rounded-full",
              "bg-cyan-400/[0.055]",
              "blur-[110px]"
            )}
          />

          {/* PURPLE GLOW */}

          <motion.div
            animate={{
              x: [25, -35, 25],
              y: [-10, 25, -10],
              scale: [1.05, 0.95, 1.05],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute",
              "right-[18%]",
              "top-[25%]",
              "h-[320px]",
              "w-[320px]",
              "rounded-full",
              "bg-violet-500/[0.055]",
              "blur-[120px]"
            )}
          />

          {/* GRID */}

          <div
            className={cn(
              "absolute inset-0",
              "opacity-[0.025]",
              "[background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]",
              "[background-size:55px_55px]"
            )}
          />

          {/* TOP FADE */}

          <div
            className={cn(
              "absolute inset-x-0 top-0",
              "h-32",
              "bg-linear-to-b",
              "from-background/50",
              "to-transparent"
            )}
          />
        </div>

        {/* =================================================
            MAIN CONTENT
            ================================================= */}

        <div
          className={cn(
            "relative z-10",
            "mx-auto",
            "max-w-[1500px]",
            "px-5",
            "pb-6",
            "pt-16",
            "sm:px-8",
            "lg:px-12",
            "lg:pt-20"
          )}
        >
          {/* =================================================
              TOP MICRO LABEL
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
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
              duration: 0.5,
            }}
            className="flex justify-center"
          >
            <div
              className={cn(
                "flex",
                "items-center",
                "gap-2.5",
                "rounded-full",
                "border",
                "border-white/[0.07]",
                "bg-white/[0.025]",
                "px-4",
                "py-2",
                "backdrop-blur-xl"
              )}
            >
              {/* STATUS DOT */}

              <span className="relative flex h-2 w-2">
                <motion.span
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "absolute",
                    "inline-flex",
                    "h-full w-full",
                    "rounded-full",
                    "bg-cyan-300"
                  )}
                />

                <span
                  className={cn(
                    "relative",
                    "inline-flex",
                    "h-2 w-2",
                    "rounded-full",
                    "bg-cyan-300",
                    "shadow-[0_0_10px_rgba(103,232,249,0.8)]"
                  )}
                />
              </span>

              <span
                className={cn(
                  "text-[9px]",
                  "font-medium",
                  "uppercase",
                  "tracking-[0.22em]",
                  "text-white/45"
                )}
              >
                Let&apos;s Connect
              </span>
            </div>
          </motion.div>

          {/* =================================================
              MASSIVE NAME
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(
              "relative",
              "mt-8",
              "flex",
              "justify-center",
              "overflow-hidden"
            )}
          >
            {/* NAME GLOW */}

            <div
              aria-hidden="true"
              className={cn(
                "absolute",
                "left-1/2",
                "top-1/2",
                "h-24",
                "w-[65%]",
                "-translate-x-1/2",
                "-translate-y-1/2",
                "rounded-full",
                "bg-cyan-400/[0.055]",
                "blur-[70px]"
              )}
            />

            <motion.h2
              whileHover={{
                letterSpacing: "0.055em",
              }}
              transition={{
                duration: 0.45,
              }}
              className={cn(
                "relative",
                "select-none",
                "whitespace-nowrap",
                "text-center",
                "text-[13vw]",
                "font-black",
                "leading-[0.85]",
                "tracking-[-0.055em]",
                "sm:text-[12vw]",
                "lg:text-[10vw]",
                "xl:text-[9vw]"
              )}
            >
              <span
                className={cn(
                  "bg-linear-to-b",
                  "from-white/[0.16]",
                  "via-white/[0.07]",
                  "to-transparent",
                  "bg-clip-text",
                  "text-transparent"
                )}
              >
                PRASOON
              </span>
            </motion.h2>
          </motion.div>

          {/* =================================================
              VISUAL DIVIDER
              ================================================= */}

          <div
            className={cn(
              "relative",
              "mx-auto",
              "mt-9",
              "h-px",
              "max-w-5xl",
              "overflow-visible",
              "bg-linear-to-r",
              "from-transparent",
              "via-white/[0.10]",
              "to-transparent"
            )}
          >
            <motion.div
              animate={{
                left: ["0%", "100%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className={cn(
                "absolute",
                "top-1/2",
                "h-px",
                "w-24",
                "-translate-y-1/2",
                "bg-linear-to-r",
                "from-transparent",
                "via-cyan-300",
                "to-transparent",
                "shadow-[0_0_12px_rgba(103,232,249,0.55)]"
              )}
            />
          </div>

          {/* =================================================
              SOCIAL ICON DOCK
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className={cn(
              "mt-8",
              "flex",
              "justify-center"
            )}
          >
            <div
              className={cn(
                "flex",
                "items-center",
                "gap-1.5",
                "rounded-[22px]",
                "border",
                "border-white/[0.07]",
                "bg-white/[0.025]",
                "p-1.5",
                "shadow-[0_15px_40px_rgba(0,0,0,0.25)]",
                "backdrop-blur-2xl",
                "sm:gap-2"
              )}
            >
              {SOCIAL_LINKS.map((social, index) => {
                const IconComponent =
                  ICON_MAP[
                    social.name as keyof typeof ICON_MAP
                  ]

                if (!IconComponent) return null

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={
                      social.name === "Email"
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      social.name === "Email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={social.name}
                    title={social.name}
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.15 + index * 0.04,
                    }}
                    whileHover={{
                      y: -4,
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
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
                      "border-transparent",
                      "text-white/45",
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

                    <IconComponent
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
              })}
            </div>
          </motion.div>

          {/* =================================================
              CONTACT BUTTON
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.25,
              duration: 0.5,
            }}
            className={cn(
              "mt-6",
              "flex",
              "justify-center"
            )}
          >
            <motion.a
              href="mailto:prasoon7pathak@gmail.com?subject=Portfolio%20Contact"
              whileHover={{
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className={cn(
                "group/contact",
                "relative",
                "flex",
                "items-center",
                "gap-3",
                "overflow-hidden",
                "rounded-full",
                "border",
                "border-white/[0.08]",
                "bg-white/[0.035]",
                "px-5",
                "py-2.5",
                "text-[11px]",
                "font-medium",
                "tracking-[0.04em]",
                "text-white/60",
                "backdrop-blur-xl",
                "transition-all",
                "duration-300",
                "hover:border-cyan-400/25",
                "hover:bg-cyan-400/[0.06]",
                "hover:text-cyan-100",
                "hover:shadow-[0_0_30px_rgba(103,232,249,0.08)]"
              )}
            >
              <Mail className="h-3.5 w-3.5" />

              <span>Say hello</span>

              <ArrowUpRight
                className={cn(
                  "h-3.5 w-3.5",
                  "transition-transform",
                  "duration-300",
                  "group-hover/contact:-translate-y-0.5",
                  "group-hover/contact:translate-x-0.5"
                )}
              />
            </motion.a>
          </motion.div>

          {/* =================================================
              BOTTOM
              ================================================= */}

          <div
            className={cn(
              "mt-10",
              "flex",
              "items-center",
              "justify-between",
              "border-t",
              "border-white/[0.05]",
              "pt-5"
            )}
          >
            <p
              className={cn(
                "text-[9px]",
                "tracking-[0.12em]",
                "text-white/25",
                "sm:text-[10px]"
              )}
            >
              © {currentYear} PRASOON PATHAK
            </p>

            {/* BACK TO TOP */}

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.92,
              }}
              aria-label="Back to top"
              title="Back to top"
              className={cn(
                "group/top",
                "relative",
                "flex",
                "h-9 w-9",
                "items-center",
                "justify-center",
                "rounded-full",
                "border",
                "border-white/[0.07]",
                "bg-white/[0.025]",
                "text-white/35",
                "transition-all",
                "duration-300",
                "hover:border-violet-400/25",
                "hover:bg-violet-400/[0.07]",
                "hover:text-violet-200",
                "hover:shadow-[0_0_20px_rgba(167,139,250,0.10)]"
              )}
            >
              <ArrowUpRight
                className={cn(
                  "h-3.5 w-3.5",
                  "-rotate-45",
                  "transition-transform",
                  "duration-300",
                  "group-hover/top:-translate-y-0.5"
                )}
              />
            </motion.button>
          </div>
        </div>

        {/* =================================================
            BOTTOM ENERGY LINE
            ================================================= */}

        <div
          aria-hidden="true"
          className={cn(
            "absolute",
            "bottom-0 left-0 right-0",
            "h-px",
            "bg-linear-to-r",
            "from-transparent",
            "via-cyan-400/40",
            "to-transparent"
          )}
        />
      </footer>
    )
  }
)

Footer.displayName = "Footer"

export { Footer }