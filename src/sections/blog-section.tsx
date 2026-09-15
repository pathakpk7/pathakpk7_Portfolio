"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock3,
  ExternalLink,
  Feather,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Container, SectionWrapper } from "@/components/layout"
import { curatedBlogPosts, BLOG_CONFIG, type BlogPost } from "@/data/blogs"

/* =========================================================
   BLOG POST CARD
   ========================================================= */

interface BlogCardProps {
  post: BlogPost
  index: number
}

function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 28,
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
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -6,
      }}
      className={cn(
        "group relative flex flex-col h-full",
        "rounded-[26px] overflow-hidden",
        "border border-white/[0.08]",
        "bg-[#070c15]/80 backdrop-blur-xl",
        "shadow-[0_15px_40px_rgba(0,0,0,0.3)]",
        "transition-all duration-400",
        "hover:border-cyan-400/30 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)]"
      )}
    >
      {/* CARD TOP LIGHT ACCENT */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px",
          "bg-linear-to-r from-transparent via-cyan-400/30 to-transparent",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        )}
      />

      {/* AMBIENT CORNER GLOW */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full",
          "bg-cyan-500/[0.08] blur-[45px]",
          "transition-opacity duration-300 group-hover:opacity-100"
        )}
      />

      {/* POST IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.02]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            "group-hover:scale-105"
          )}
          unoptimized
        />

        {/* GRADIENT OVERLAY */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#070c15] via-[#070c15]/40 to-transparent"
        />

        {/* TOP BADGES */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-10">
          <span
            className={cn(
              "px-3 py-1 rounded-full",
              "text-[10px] font-semibold tracking-wider uppercase",
              "bg-[#070c15]/80 backdrop-blur-md",
              "border border-cyan-400/25 text-cyan-300",
              "shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            )}
          >
            {post.category}
          </span>

          <span
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full",
              "text-[10px] font-medium",
              "bg-[#070c15]/75 backdrop-blur-md",
              "border border-white/10 text-muted-foreground"
            )}
          >
            <Clock3 className="h-3 w-3 text-cyan-400" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="relative flex-1 flex flex-col justify-between p-6 sm:p-7">
        <div className="space-y-3">
          {/* DATE */}
          <p className="text-[11px] font-mono tracking-widest text-muted-foreground/60">
            {post.date}
          </p>

          {/* TITLE */}
          <h3
            className={cn(
              "text-lg sm:text-xl font-bold leading-snug tracking-tight text-foreground",
              "line-clamp-2 transition-colors duration-200",
              "group-hover:text-cyan-200"
            )}
          >
            {post.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-xs sm:text-[13px] leading-relaxed text-muted-foreground line-clamp-3">
            {post.description}
          </p>
        </div>

        {/* CTA BUTTON */}
        <div className="pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/btn inline-flex items-center gap-2",
              "text-xs font-semibold text-cyan-400 transition-all duration-300",
              "hover:text-cyan-200 hover:gap-3"
            )}
          >
            <span>Know More</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>

          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open article: ${post.title}`}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              "border border-white/10 bg-white/[0.03] text-muted-foreground",
              "transition-all duration-300",
              "hover:border-cyan-400/40 hover:bg-cyan-400/[0.1] hover:text-cyan-300"
            )}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

/* =========================================================
   BLOG SECTION
   ========================================================= */

export const BlogSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, "children">
>(({ className, ...props }, ref) => {
  return (
    <SectionWrapper
      ref={ref}
      id="blogs"
      className={cn(
        "relative overflow-hidden",
        "py-16 sm:py-20 lg:py-24",
        className
      )}
      {...props}
    >
      {/* ===================================================
          BACKGROUND AMBIENCE
          =================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* TOP PURPLE / CYAN GLOW */}
        <motion.div
          animate={{
            x: [-15, 20, -15],
            y: [-10, 15, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[15%] top-[10%] h-[350px] w-[350px] rounded-full bg-cyan-500/[0.05] blur-[130px]"
        />

        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [15, -15, 15],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[10%] top-[30%] h-[380px] w-[380px] rounded-full bg-violet-600/[0.06] blur-[140px]"
        />

        <div className="absolute left-1/2 bottom-[10%] h-[300px] w-[60%] -translate-x-1/2 rounded-full bg-cyan-400/[0.03] blur-[140px]" />
      </div>

      {/* ===================================================
          CONTENT
          =================================================== */}
      <Container size="cinematic" className="relative z-10">
        {/* HEADER */}
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 sm:mb-16 flex flex-col items-center text-center"
        >
          {/* ICON BADGE */}
          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: 3,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="relative mb-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/30 bg-background/60 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.15)]"
          >
            <div className="absolute inset-0 bg-linear-to-br from-cyan-400/15 to-violet-500/15" />
            <Feather className="relative z-10 h-5 w-5 text-cyan-400" />
          </motion.div>

          {/* MAIN TITLE */}
          <motion.h2
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.08,
            }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-[0.14em] text-foreground uppercase"
          >
            {BLOG_CONFIG.sectionTitle}
          </motion.h2>

          {/* QUOTE SUBTITLE */}
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
              duration: 0.6,
              delay: 0.15,
            }}
            className="mt-3 text-sm sm:text-base italic font-light tracking-wide text-cyan-300/90 max-w-xl"
          >
            &ldquo;{BLOG_CONFIG.sectionQuote}&rdquo;
          </motion.p>

          {/* SUBTEXT */}
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
              duration: 0.6,
              delay: 0.2,
            }}
            className="mt-1 text-xs sm:text-sm text-muted-foreground tracking-wide max-w-lg"
          >
            {BLOG_CONFIG.sectionDescription}
          </motion.p>

          {/* GLOWING UNDERLINE */}
          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 100,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="mt-4 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          />
        </motion.div>

        {/* =================================================
            3-CARD GRID
            ================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {curatedBlogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* =================================================
            BOTTOM CTA / VIEW ALL BLOGS
            ================================================= */}
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 sm:mt-16 flex flex-col items-center text-center"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-muted-foreground/70 mb-2">
            {BLOG_CONFIG.ctaHeading}
          </p>

          <motion.a
            href={BLOG_CONFIG.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.035,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className={cn(
              "group relative isolate inline-flex items-center gap-3",
              "rounded-full px-7 sm:px-9 py-3.5 sm:py-4",
              "border border-cyan-400/35 bg-cyan-500/[0.08]",
              "text-xs sm:text-sm font-bold tracking-[0.08em] text-cyan-100",
              "shadow-[0_0_25px_rgba(6,182,212,0.15),inset_0_0_20px_rgba(6,182,212,0.06)]",
              "backdrop-blur-xl transition-all duration-300",
              "hover:border-cyan-300 hover:bg-cyan-400/[0.15] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]"
            )}
          >
            {/* HOVER SHIMMER */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-12 top-0 h-full w-10 rotate-12",
                "bg-white/[0.15] blur-sm transition-transform duration-700",
                "group-hover:translate-x-64"
              )}
            />

            <BookOpen className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:scale-110" />
            <span>{BLOG_CONFIG.ctaButtonText}</span>
            <ExternalLink className="h-3.5 w-3.5 text-cyan-300/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </motion.div>
      </Container>
    </SectionWrapper>
  )
})

BlogSection.displayName = "BlogSection"
