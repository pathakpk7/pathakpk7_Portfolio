"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SectionWrapper } from "@/components/layout"
import { ExternalLink, Award, Cloud, Shield, Brain, Server } from "lucide-react"

const certifications = [
  {
    id: "ibm-virtual-internship",
    title: "IBM Virtual Internship",
    issuer: "IBM",
    category: "AI / ML",
    date: "2024",
    featured: true,
    description: "Worked on industry-level projects involving Generative AI and emerging technologies with real-world applications.",
    skills: ["Generative AI", "Machine Learning", "Industry Projects", "Emerging Tech"],
    icon: Brain,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_ibm-generativeai-ai-share-7377722479009755136-AtlC",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: "gemini-google-workshop",
    title: "Gemini for Google Workshop",
    issuer: "Google Cloud",
    category: "AI / ML",
    date: "2024",
    featured: false,
    description: "Google Cloud + Gemini AI Workshop focused on modern cloud-integrated AI workflows and practical implementations.",
    skills: ["Google Cloud", "Gemini AI", "Cloud Integration", "AI Workflows"],
    icon: Cloud,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_certificateearned-googlecloud-geminiai-share-7368327267246166016-39ma",
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: "microsoft-ai-skills",
    title: "Microsoft AI Skill Development",
    issuer: "Microsoft",
    category: "AI / ML",
    date: "2024",
    featured: false,
    description: "Focused on AI fundamentals, productivity tools, and practical AI applications for enterprise solutions.",
    skills: ["AI Fundamentals", "Productivity Tools", "Practical AI", "Enterprise Solutions"],
    icon: Brain,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_ai-skilldevelopment-microsoft-share-7410719942708391936-lXc6",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: "cybersecurity-awareness",
    title: "Cybersecurity Awareness & Phishing Prevention",
    issuer: "Cybersecurity Institute",
    category: "Cybersecurity",
    date: "2024",
    featured: false,
    description: "Focused on phishing attack awareness, prevention techniques, and cyber safety practices for modern organizations.",
    skills: ["Phishing Awareness", "Prevention Techniques", "Cyber Safety", "Security Practices"],
    icon: Shield,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_cybersecurity-phishingawareness-phishingprevention-share-7415117133883531266-z_ax",
    color: "from-red-500 to-orange-600"
  },
  {
    id: "aws-solutions-architecture",
    title: "AWS APAC Solutions Architecture",
    issuer: "Amazon Web Services",
    category: "Cloud",
    date: "2024",
    featured: false,
    description: "Designed scalable hosting architecture using Elastic Beanstalk and cloud solutions for enterprise applications.",
    skills: ["AWS", "Solutions Architecture", "Elastic Beanstalk", "Cloud Solutions"],
    icon: Server,
    verificationUrl: "https://www.linkedin.com/posts/prasoon7pathak07_aws-cloudcomputing-solutionsarchitecture-share-7424118542628708353-2Krd",
    color: "from-orange-500 to-yellow-600"
  }
]

const CertificationCard = React.forwardRef<HTMLDivElement, {
  certification: typeof certifications[0]
  className?: string
}>(({ certification, className }, ref) => {
  const Icon = certification.icon

  return (
    <article
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/20 bg-background/80 p-6 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10",
        className
      )}
      aria-labelledby={`${certification.id}-title`}
    >
      {certification.featured && (
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
      )}

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
              certification.featured
                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                : "border-border/20 bg-muted/20 text-muted-foreground"
            )}
          >
            {certification.category}
          </span>

          {certification.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Featured
            </span>
          )}
        </div>

        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105 bg-linear-to-br",
              certification.featured
                ? "from-cyan-500 to-violet-600 shadow-cyan-500/20"
                : certification.color
            )}
          >
            <Icon className="h-7 w-7" />
          </div>

          <div className="flex-1">
            <h3 id={`${certification.id}-title`} className="text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-cyan-300">
              {certification.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {certification.issuer} • {certification.date}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {certification.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {certification.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className={cn(
                "rounded-lg border px-2 py-1 text-xs font-medium transition-colors duration-300",
                certification.featured
                  ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-200"
                  : "border-border/10 bg-muted/20 text-muted-foreground"
              )}
            >
              {skill}
            </span>
          ))}
        </div>

        <a
          href={certification.verificationUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:ring-offset-2 focus:ring-offset-background",
            certification.featured
              ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-200 hover:-translate-y-0.5 hover:bg-cyan-500/15"
              : "border-border/20 bg-transparent text-foreground hover:-translate-y-0.5 hover:border-cyan-500/30 hover:bg-cyan-500/5"
          )}
        >
          <ExternalLink className="h-4 w-4" />
          {certification.featured ? "Explore Achievement" : "View Certificate"}
        </a>
      </div>
    </article>
  )
})

CertificationCard.displayName = "CertificationCard"

const CertificationSection = React.forwardRef<
  React.ElementRef<typeof SectionWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof SectionWrapper>, 'children'>
>(({ className, ...props }, ref) => {
  const featuredCertification = certifications.find(cert => cert.featured)
  const otherCertifications = certifications.filter(cert => !cert.featured)

  return (
    <SectionWrapper
      ref={ref}
      id="certifications"
      background="dark"
      padding="xl"
      animate={false}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_55%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Certifications</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Industry-recognized certifications and professional development validating expertise in AI, cloud computing, and cybersecurity
          </h2>
        </div>

        {featuredCertification && (
          <section className="mt-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 mx-auto flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200">
                <Award className="h-4 w-4" />
                Featured Achievement
              </div>

              <CertificationCard
                certification={featuredCertification}
                className="shadow-2xl shadow-cyan-500/10"
              />
            </div>
          </section>
        )}

        <section className="mt-16">
          <div className="grid gap-8 md:grid-cols-2">
            {otherCertifications.map(cert => (
              <CertificationCard key={cert.id} certification={cert} />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border/20 bg-background/80 p-8 text-center shadow-lg shadow-black/5 backdrop-blur-sm">
            <Award className="mx-auto h-12 w-12 text-cyan-300" />
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
              Continuous Excellence
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Committed to continuous learning and staying at the forefront of technology through professional development and industry certifications.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://linkedin.com/in/prasoon-pathak"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500/15"
              >
                <ExternalLink className="h-4 w-4" />
                LinkedIn Profile
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-border/20 bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:bg-cyan-500/5"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </SectionWrapper>
  )
})

CertificationSection.displayName = "CertificationSection"

export { CertificationSection }
