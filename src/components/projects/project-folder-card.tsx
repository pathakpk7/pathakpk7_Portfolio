"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FolderOpen,
  Maximize2,
  X,
} from "lucide-react"
import { SiGithub } from "react-icons/si"

import { cn } from "@/lib/utils"
import type {
  Project,
  ProjectStatus,
} from "@/data/projects"

interface ProjectFolderCardProps {
  project: Project
  index: number
  isActive: boolean
  isExpanded: boolean
  onToggle: () => void
}

/* =========================================================
   STATUS
===========================================================*/
const STATUS_CONFIG: Record<
  ProjectStatus,
  {
    dot: string
    text: string
    border: string
    background: string
  }
> = {
  Completed: {
    dot: "bg-emerald-300",
    text: "text-emerald-200",
    border: "border-emerald-400/25",
    background: "bg-emerald-400/[0.07]",
  },

  "In Development": {
    dot: "bg-cyan-300",
    text: "text-cyan-200",
    border: "border-cyan-400/25",
    background: "bg-cyan-400/[0.07]",
  },

  "Frontend Prototype": {
    dot: "bg-amber-300",
    text: "text-amber-200",
    border: "border-amber-400/25",
    background: "bg-amber-400/[0.07]",
  },

  Prototype: {
    dot: "bg-violet-300",
    text: "text-violet-200",
    border: "border-violet-400/25",
    background: "bg-violet-400/[0.07]",
  },

  "Final Year Project": {
    dot: "bg-blue-300",
    text: "text-blue-200",
    border: "border-blue-400/25",
    background: "bg-blue-400/[0.07]",
  },
}



const FALLBACK_STATUS =
  STATUS_CONFIG.Completed

/* =========================================================
   HELPERS
========================================================= */

type ProjectWithScreenshots = Project & {
  screenshots?: string[]
}

function getProjectImages(
  project: Project
): string[] {
  const extended =
    project as ProjectWithScreenshots

  const images = [
    project.screenshot,
    ...(extended.screenshots ?? []),
  ].filter(
    (image): image is string =>
      typeof image === "string" &&
      image.trim().length > 0
  )

  return Array.from(new Set(images))
}

/* =========================================================
   FALLBACK PREVIEW
========================================================= */

function FallbackPreview({
  index,
}: {
  index: number
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07101a]">
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="absolute left-[8%] top-[10%] h-28 w-28 rounded-full bg-cyan-400/10 blur-[55px]" />

      <div className="absolute bottom-[5%] right-[8%] h-32 w-32 rounded-full bg-violet-500/10 blur-[60px]" />

      <div className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.07] px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/10" />

          <span className="ml-2 h-1.5 w-16 rounded-full bg-white/[0.07]" />
        </div>

        <div className="grid min-h-[100px] grid-cols-[30%_70%]">
          <div className="border-r border-white/[0.06] p-3">
            <div className="mb-3 h-2 w-10 rounded-full bg-cyan-300/25" />

            <div className="space-y-2">
              <div className="h-1.5 w-[75%] rounded-full bg-white/[0.08]" />
              <div className="h-1.5 w-[55%] rounded-full bg-white/[0.06]" />
              <div className="h-1.5 w-[68%] rounded-full bg-white/[0.05]" />
            </div>
          </div>

          <div className="p-3">
            <div className="mb-3 flex gap-2">
              <div className="h-8 flex-1 rounded-md border border-cyan-400/10 bg-cyan-400/[0.04]" />
              <div className="h-8 flex-1 rounded-md border border-violet-400/10 bg-violet-400/[0.04]" />
            </div>

            <div className="relative h-11 overflow-hidden rounded-md border border-white/[0.06] bg-white/[0.025]">
              <motion.div
                animate={{
                  x: ["-100%", "320%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.1,
                }}
                className="absolute bottom-3 h-px w-14 bg-linear-to-r from-transparent via-cyan-300 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   SCREENSHOT
========================================================= */

function Screenshot({
  src,
  projectName,
  index,
}: {
  src?: string
  projectName: string
  index: number
}) {
  if (!src) {
    return (
      <FallbackPreview index={index} />
    )
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${projectName} project preview`}
        className="h-full w-full object-cover object-top"
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10" />
    </>
  )
}

/* =========================================================
   STACKED PREVIEW
========================================================= */

function StackedPreview({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const images = getProjectImages(project)

  const main = images[0]
  const second = images[1] ?? main
  const third = images[2] ?? second

  return (
    <div className="pointer-events-none absolute inset-x-[8%] top-2 h-[185px] sm:h-[205px]">
      {/* back image */}

      <motion.div
        animate={{
          rotate: [-2.4, -1.4, -2.4],
          y: [4, 1, 4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[2%] top-[22px] h-[150px] w-[88%] overflow-hidden rounded-[18px] border border-white/15 bg-[#0b111a] opacity-45 shadow-2xl"
      >
        <Screenshot
          src={third}
          projectName={project.name}
          index={index}
        />
      </motion.div>

      {/* middle image */}

      <motion.div
        animate={{
          rotate: [1.8, 0.8, 1.8],
          y: [1, 4, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[1%] top-[12px] h-[158px] w-[90%] overflow-hidden rounded-[18px] border border-white/20 bg-[#0b111a] opacity-65 shadow-2xl"
      >
        <Screenshot
          src={second}
          projectName={project.name}
          index={index}
        />
      </motion.div>

      {/* main image */}

      <motion.div
        whileHover={{
          y: -4,
          rotateX: 2,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 20,
        }}
        className="absolute left-1/2 top-0 h-[165px] w-[88%] -translate-x-1/2 overflow-hidden rounded-[18px] border border-white/25 bg-[#0b111a] shadow-[0_20px_50px_rgba(0,0,0,.45)] sm:h-[180px]"
      >
        <Screenshot
          src={main}
          projectName={project.name}
          index={index}
        />
      </motion.div>
    </div>
  )
}

/* =========================================================
   EXPANDED SCREENSHOT (UNCROPPED FIT & LIGHTBOX)
========================================================= */

function ExpandedScreenshot({
  src,
  projectName,
  index,
}: {
  src?: string
  projectName: string
  index: number
}) {
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false)

  if (!src) {
    return <FallbackPreview index={index} />
  }

  return (
    <>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#060a12]">
        {/* Ambient Blur Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl"
        />

        {/* Uncropped Main Screenshot */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${projectName} project preview`}
          className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)]"
        />

        {/* Lightbox Trigger */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setIsLightboxOpen(true)
          }}
          title="View Full Resolution Image"
          className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-xl border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-black/80 hover:text-white"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          <span>Full Image</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl"
          onClick={(event) => {
            event.stopPropagation()
            setIsLightboxOpen(false)
          }}
        >
          <div className="relative flex max-h-[92vh] max-w-[94vw] flex-col items-center justify-center">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setIsLightboxOpen(false)
              }}
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
              aria-label="Close image lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${projectName} screenshot full resolution`}
              className="max-h-[86vh] max-w-[92vw] rounded-2xl border border-white/15 object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}

/* =========================================================
   EXPANDED GALLERY
========================================================= */

function ExpandedGallery({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const images = getProjectImages(project)

  const [activeImage, setActiveImage] =
    React.useState(0)

  const gallery =
    images.length > 0
      ? images
      : [undefined]

  const previous = () => {
    setActiveImage((current) =>
      current === 0
        ? gallery.length - 1
        : current - 1
    )
  }

  const next = () => {
    setActiveImage((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1
    )
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-[20px] border border-white/[0.12] bg-black/20 p-3">
        <div className="relative h-[250px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#070c14] sm:h-[320px] lg:h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.01,
              }}
              transition={{
                duration: 0.25,
              }}
              className="absolute inset-0"
            >
              <ExpandedScreenshot
                src={gallery[activeImage]}
                projectName={project.name}
                index={index}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                previous()
              }}
              aria-label="Previous screenshot"
              className="absolute left-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur-xl transition hover:border-violet-400/40 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                next()
              }}
              aria-label="Next screenshot"
              className="absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur-xl transition hover:border-violet-400/40 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {gallery.map((_, imageIndex) => (
            <button
              key={imageIndex}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setActiveImage(imageIndex)
              }}
              aria-label={`Screenshot ${imageIndex + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                activeImage === imageIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/25 hover:bg-white/45"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function ProjectFolderCard({
  project,
  index,
  isActive,
  isExpanded,
  onToggle,
}: ProjectFolderCardProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    React.useState(false)

  const status =
    STATUS_CONFIG[
      project.status as ProjectStatus
    ] ?? FALLBACK_STATUS

  const visibleTech =
    project.techStack.slice(0, 4)

  const features =
    project.features?.slice(0, 5) ?? []

  const stopPropagation = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation()
  }

  return (
    <motion.article
      layout
      data-project-card
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
        amount: 0.1,
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 220,
          damping: 28,
        },

        opacity: {
          duration: 0.45,
          delay: Math.min(
            index * 0.05,
            0.25
          ),
        },
      }}
      className="relative w-full"
    >
      <AnimatePresence
        initial={false}
        mode="wait"
      >
        {!isExpanded ? (
          /* =================================================
             COLLAPSED FOLDER
          ================================================= */

          <motion.button
            key="collapsed"
            layoutId={`project-${project.id}`}
            type="button"
            onClick={onToggle}
            aria-expanded="false"
            aria-label={`Open ${project.name}`}
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
            }}
            whileHover={{
              y: -7,
            }}
            whileTap={{
              scale: 0.99,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 24,
            }}
            className="group relative block min-h-[405px] w-full cursor-pointer text-left focus:outline-none"
          >
            {/* glow */}

            <motion.div
              aria-hidden="true"
              animate={{
                opacity: isActive
                  ? 0.8
                  : 0.35,
              }}
              className="pointer-events-none absolute bottom-[2%] left-1/2 h-[70%] w-[92%] -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[70px]"
            />

            {/* stacked screenshots */}

            <StackedPreview
              project={project}
              index={index}
            />

            {/* folder rear border */}

            <div className="absolute inset-x-[3%] bottom-[2px] top-[80px] rounded-[28px] border border-white/20 bg-white/[0.025]" />

            {/* =================================================
                FOLDER FRONT
            ================================================= */}

            <div
              className={cn(
                "absolute inset-x-0 bottom-0 top-[115px]",
                "overflow-hidden",
                "rounded-[28px]",
                "border",
                "bg-[#111722]/90",
                "backdrop-blur-2xl",
                "shadow-[0_30px_70px_rgba(0,0,0,.48)]",
                "transition-all duration-300",

                isActive
                  ? "border-violet-400/45 shadow-[0_30px_80px_rgba(124,58,237,.12)]"
                  : "border-white/25 group-hover:border-violet-400/35"
              )}
            >
              {/* folder tab */}

              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-[62px] w-[46%] rounded-br-[42px] border-b border-r border-white/15 bg-white/[0.035]"
              />

              {/* subtle surface gradient */}

              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/[0.045] via-transparent to-violet-500/[0.025]" />

              <div className="relative flex h-full flex-col px-7 pb-6 pt-8">
                <FolderOpen className="mb-6 h-8 w-8 text-cyan-100/80" />

                <h3 className="text-[27px] font-bold tracking-[-0.04em] text-white sm:text-[30px]">
                  {project.name}
                </h3>

                <p className="mt-1.5 line-clamp-1 text-sm leading-relaxed text-white/60">
                  {project.tagline}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {visibleTech.map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-white/65"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5",
                      status.border,
                      status.background
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        status.dot
                      )}
                    />

                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-[0.13em]",
                        status.text
                      )}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-violet-300 transition-colors group-hover:text-violet-200">
                    <span>
                      View Project
                    </span>

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* active shine */}

            <motion.div
              aria-hidden="true"
              animate={{
                opacity: isActive
                  ? 1
                  : 0.25,
              }}
              className="pointer-events-none absolute bottom-0 left-[15%] right-[15%] h-px bg-linear-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_18px_rgba(139,92,246,.8)]"
            />
          </motion.button>
        ) : (
          /* =================================================
             EXPANDED STATE
          ================================================= */

          <motion.div
            key="expanded"
            layoutId={`project-${project.id}`}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-[28px] border border-white/25 bg-[#0b111a]/98 shadow-[0_30px_100px_rgba(0,0,0,.6)] backdrop-blur-2xl"
          >
            {/* ambient glow */}

            <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-400/[0.05] blur-[100px]" />

            <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-500/[0.06] blur-[110px]" />

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="relative flex items-start justify-between gap-5 px-6 pb-5 pt-6 sm:px-8 sm:pt-7">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.035em] text-white sm:text-3xl">
                  {project.name}
                </h3>

                <p className="mt-1.5 text-sm text-white/60 sm:text-[15px]">
                  {project.tagline}
                </p>
              </div>

              <motion.button
                type="button"
                onClick={onToggle}
                aria-label={`Close ${project.name}`}
                whileHover={{
                  rotate: 90,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/75 transition hover:border-violet-400/30 hover:text-white"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* =================================================
                GALLERY
            ================================================= */}

            <div className="relative px-6 sm:px-8">
              <ExpandedGallery
                project={project}
                index={index}
              />
            </div>

            {/* =================================================
                INFORMATION
            ================================================= */}

            <div className="relative grid gap-7 px-6 pb-7 pt-7 sm:px-8 lg:grid-cols-[1.05fr_1fr_.9fr] lg:gap-0">
              {/* description */}

              <div className="lg:pr-7">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">
                  Description
                </h4>

                <p
                  className={cn(
                    "mt-3 text-[13px] leading-6 text-white/65 sm:text-sm",
                    !isDescriptionExpanded && "line-clamp-4"
                  )}
                >
                  {project.overview}
                </p>

                {/* Know More / Show Less Button */}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    setIsDescriptionExpanded((prev) => !prev)
                  }}
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.15]"
                >
                  <span>{isDescriptionExpanded ? "Show Less" : "Know More"}</span>
                  {isDescriptionExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>

                {/* Expanded Details */}
                {isDescriptionExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 space-y-4 border-t border-white/10 pt-4"
                  >
                    {project.problem && (
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                          Problem Statement
                        </h5>
                        <p className="mt-1 text-xs leading-relaxed text-white/70">
                          {project.problem}
                        </p>
                      </div>
                    )}

                    {project.architecture && (
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-300">
                          Architecture
                        </h5>
                        <p className="mt-1 text-xs leading-relaxed text-white/70">
                          {project.architecture}
                        </p>
                      </div>
                    )}

                    {project.challenges && project.challenges.length > 0 && (
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300">
                          Key Challenges &amp; Solutions
                        </h5>
                        <div className="mt-2 space-y-2">
                          {project.challenges.map((item, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                            >
                              <p className="text-xs font-semibold text-white/85">
                                Challenge: {item.challenge}
                              </p>
                              <p className="mt-1 text-xs text-white/65">
                                Solution: {item.solution}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.keyLearnings && project.keyLearnings.length > 0 && (
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                          Key Learnings
                        </h5>
                        <ul className="mt-1.5 space-y-1.5">
                          {project.keyLearnings.map((learning, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-white/70"
                            >
                              <span className="font-bold text-emerald-400">
                                •
                              </span>
                              <span>{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.projectImpact && (
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                          Project Impact
                        </h5>
                        <p className="mt-1 text-xs leading-relaxed text-white/70">
                          {project.projectImpact}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* links */}

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={
                      stopPropagation
                    }
                    className="flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.035] px-4 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/[0.07]"
                  >
                    <SiGithub className="h-4 w-4" />
                    GitHub
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={
                        stopPropagation
                      }
                      className="flex h-10 items-center gap-2 rounded-lg border border-violet-400/30 bg-violet-500/20 px-4 text-sm font-medium text-violet-100 transition hover:border-violet-400/50 hover:bg-violet-500/30"
                    >
                      Live Demo

                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* features */}

              <div className="border-white/10 lg:border-l lg:px-7">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">
                  Key Features
                </h4>

                <div className="mt-3 space-y-3">
                  {features.map(
                    (feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2.5"
                      >
                        <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500/80 text-white">
                          <Check className="h-2.5 w-2.5" />
                        </span>

                        <span className="text-[13px] leading-5 text-white/65 sm:text-sm">
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* stack */}

              <div className="border-white/10 lg:border-l lg:pl-7">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">
                  Tech Stack
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.techStack.map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-medium text-white/70"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {project.roadmap &&
project.roadmap.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-200/80">
                        Next
                      </h4>

                      <div className="mt-3 space-y-2">
                      {project.roadmap
                        .slice(0, 3)
                            .map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 text-[13px] text-white/55">
                          <ArrowRight className="mt-[2px] h-3.5 w-3.5 shrink-0 text-amber-300/70" />
                        <span>{item}</span>
                        </div>
                        ))}
                        </div>
                    </div>
                  )}
              </div>
            </div>

            {/* bottom glow */}

            <div className="pointer-events-none absolute bottom-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-violet-400/70 to-transparent shadow-[0_0_20px_rgba(139,92,246,.7)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}