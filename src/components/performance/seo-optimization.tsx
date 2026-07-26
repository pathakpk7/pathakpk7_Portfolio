"use client"

import * as React from "react"
import Head from "next/head"
import Script from "next/script"
import type { Metadata } from "next"

/* =========================================================
   SEO CONFIG
========================================================= */

const SEO_CONFIG = {
  siteName: "Prasoon Pathak | Portfolio",

  title:
    "Prasoon Pathak |",

  description:
    "Portfolio of Prasoon Pathak, a Computer Science Engineering student building projects across software development, data analytics, cybersecurity, AI/ML, and modern web technologies.",

  keywords: [
    "Prasoon Pathak",
    "software developer",
    "full stack developer",
    "data analytics",
    "cybersecurity",
    "artificial intelligence",
    "machine learning",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
    "FastAPI",
    "intrusion detection system",
    "SecureNet IDS",
    "web development",
    "computer science",
    "portfolio",
  ],

  author: "Prasoon Pathak",

  url: "https://prasoon-portfolio.vercel.app",

  image: "/og-image.jpg",

  locale: "en_US",

  type: "website",
} as const

/* =========================================================
   PROFILE LINKS
========================================================= */

const PROFILE_LINKS = {
  github: "https://github.com/pathakpk7",

  linkedin:
    "https://www.linkedin.com/in/prasoon7pathak07/",

  twitter:
    "https://twitter.com/panditpk7",

  leetcode:
    "https://leetcode.com/u/pathakMahi/",

  geeksForGeeks:
    "https://www.geeksforgeeks.org/profile/prasoon7pathak",
} as const

/* =========================================================
   PERSON STRUCTURED DATA
========================================================= */

const generateStructuredData = () => ({
  "@context": "https://schema.org",

  "@type": "Person",

  name: "Prasoon Pathak",

  url: SEO_CONFIG.url,

  image: `${SEO_CONFIG.url}${SEO_CONFIG.image}`,

  description: SEO_CONFIG.description,

  jobTitle: "Computer Science Engineering Student",

  sameAs: [
    PROFILE_LINKS.github,
    PROFILE_LINKS.linkedin,
    PROFILE_LINKS.twitter,
    PROFILE_LINKS.leetcode,
    PROFILE_LINKS.geeksForGeeks,
  ],

  knowsAbout: [
    "Software Development",
    "Full Stack Development",
    "Data Analytics",
    "Cybersecurity",
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
    "FastAPI",
  ],

  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "United Institute of Technology",
    },
    {
      "@type": "EducationalOrganization",
      name: "Chandauli Polytechnic",
    },
  ],

  worksOn: [
    {
      "@type": "SoftwareApplication",

      name: "SecureNet IDS",

      description:
        "AI-powered intrusion detection system for real-time network monitoring, machine-learning-based attack detection, threat intelligence enrichment, and security analytics.",

      url: "https://github.com/pathakpk7/SecureNet_IDS",
    },
  ],
})

/* =========================================================
   SAFE JSON-LD SERIALIZATION
========================================================= */

function serializeJsonLd(
  data: Record<string, unknown>
) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  )
}

/* =========================================================
   SEO HEAD
========================================================= */

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  keywords?: readonly string[]
  noIndex?: boolean
}

export function SEOHead({
  title = SEO_CONFIG.title,
  description = SEO_CONFIG.description,
  image = SEO_CONFIG.image,
  url = SEO_CONFIG.url,
  type = SEO_CONFIG.type,
  keywords = SEO_CONFIG.keywords,
  noIndex = false,
}: SEOHeadProps) {
  const structuredData =
    generateStructuredData()

  const absoluteImage =
    image.startsWith("http")
      ? image
      : `${SEO_CONFIG.url}${image}`

  return (
    <>
      {/* ===================================================
          STANDARD HEAD METADATA
      =================================================== */}

      <Head>
        <title>{title}</title>

        <meta
          name="description"
          content={description}
        />

        <meta
          name="keywords"
          content={keywords.join(", ")}
        />

        <meta
          name="author"
          content={SEO_CONFIG.author}
        />

        <meta
          name="robots"
          content={
            noIndex
              ? "noindex, nofollow"
              : "index, follow"
          }
        />

        {/* Open Graph */}

        <meta
          property="og:title"
          content={title}
        />

        <meta
          property="og:description"
          content={description}
        />

        <meta
          property="og:image"
          content={absoluteImage}
        />

        <meta
          property="og:image:width"
          content="1200"
        />

        <meta
          property="og:image:height"
          content="630"
        />

        <meta
          property="og:image:alt"
          content={title}
        />

        <meta
          property="og:url"
          content={url}
        />

        <meta
          property="og:type"
          content={type}
        />

        <meta
          property="og:site_name"
          content={SEO_CONFIG.siteName}
        />

        <meta
          property="og:locale"
          content={SEO_CONFIG.locale}
        />

        {/* Twitter / X */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:creator"
          content="@panditpk7"
        />

        <meta
          name="twitter:title"
          content={title}
        />

        <meta
          name="twitter:description"
          content={description}
        />

        <meta
          name="twitter:image"
          content={absoluteImage}
        />

        <meta
          name="twitter:image:alt"
          content={title}
        />

        {/* Browser */}

        <meta
          name="theme-color"
          content="#050810"
        />

        <meta
          name="application-name"
          content={SEO_CONFIG.siteName}
        />

        {/* Canonical */}

        <link
          rel="canonical"
          href={url}
        />

        {/* Connections */}

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>

      {/* ===================================================
          JSON-LD

          IMPORTANT:
          Next.js Script is used instead of a raw <script>.
      =================================================== */}

      <Script
        id="person-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              structuredData
            ),
        }}
      />
    </>
  )
}

/* =========================================================
   METADATA GENERATOR

   NOTE:
   This function should only be consumed from server-side
   Next.js metadata files/components.
========================================================= */

export function generateMetadata(
  overrides: Partial<Metadata> = {}
): Metadata {
  const defaultMetadata: Metadata = {
    metadataBase: new URL(
      SEO_CONFIG.url
    ),

    title: SEO_CONFIG.title,

    description:
      SEO_CONFIG.description,

    keywords: [
      ...SEO_CONFIG.keywords,
    ],

    authors: [
      {
        name: SEO_CONFIG.author,
      },
    ],

    creator: SEO_CONFIG.author,

    openGraph: {
      title: SEO_CONFIG.title,

      description:
        SEO_CONFIG.description,

      url: SEO_CONFIG.url,

      siteName:
        SEO_CONFIG.siteName,

      images: [
        {
          url: SEO_CONFIG.image,

          width: 1200,

          height: 630,

          alt: SEO_CONFIG.title,
        },
      ],

      locale: SEO_CONFIG.locale,

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      creator: "@panditpk7",

      title: SEO_CONFIG.title,

      description:
        SEO_CONFIG.description,

      images: [
        SEO_CONFIG.image,
      ],
    },

    robots: {
      index: true,

      follow: true,

      googleBot: {
        index: true,

        follow: true,

        "max-video-preview": -1,

        "max-image-preview":
          "large",

        "max-snippet": -1,
      },
    },

    alternates: {
      canonical:
        SEO_CONFIG.url,
    },
  }

  return {
    ...defaultMetadata,
    ...overrides,
  }
}

/* =========================================================
   GENERIC STRUCTURED DATA
========================================================= */

interface StructuredDataProps {
  id?: string
  type: string
  data: Record<string, unknown>
}

export function StructuredData({
  id,
  type,
  data,
}: StructuredDataProps) {
  const structuredData = {
    "@context":
      "https://schema.org",

    "@type": type,

    ...data,
  }

  const scriptId =
    id ??
    `structured-data-${type
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )}`

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html:
          serializeJsonLd(
            structuredData
          ),
      }}
    />
  )
}

/* =========================================================
   PROJECT STRUCTURED DATA
========================================================= */

interface ProjectStructuredDataProps {
  project: {
    name: string
    description: string
    url: string
    technologies: string[]
    image?: string
  }
}

export function ProjectStructuredData({
  project,
}: ProjectStructuredDataProps) {
  const data: Record<
    string,
    unknown
  > = {
    name: project.name,

    description:
      project.description,

    url: project.url,

    applicationCategory:
      "DeveloperApplication",

    operatingSystem: "Any",

    programmingLanguage:
      project.technologies,

    offers: {
      "@type": "Offer",

      price: "0",

      priceCurrency: "USD",
    },
  }

  if (project.image) {
    data.screenshot =
      project.image
  }

  return (
    <StructuredData
      id={`project-${project.name
        .toLowerCase()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )}`}
      type="SoftwareApplication"
      data={data}
    />
  )
}

/* =========================================================
   BLOG STRUCTURED DATA
========================================================= */

interface BlogPostStructuredDataProps {
  post: {
    title: string
    description: string
    url: string
    datePublished: string
    dateModified?: string
    author: string
    image?: string
  }
}

export function BlogPostStructuredData({
  post,
}: BlogPostStructuredDataProps) {
  const data: Record<
    string,
    unknown
  > = {
    headline: post.title,

    description:
      post.description,

    url: post.url,

    datePublished:
      post.datePublished,

    dateModified:
      post.dateModified ??
      post.datePublished,

    author: {
      "@type": "Person",

      name: post.author,
    },

    publisher: {
      "@type":
        "Organization",

      name:
        SEO_CONFIG.siteName,

      logo: {
        "@type":
          "ImageObject",

        url: `${SEO_CONFIG.url}${SEO_CONFIG.image}`,
      },
    },
  }

  if (post.image) {
    data.image = post.image
  }

  return (
    <StructuredData
      id={`blog-${post.title
        .toLowerCase()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )}`}
      type="BlogPosting"
      data={data}
    />
  )
}

/* =========================================================
   BREADCRUMB STRUCTURED DATA
========================================================= */

interface BreadcrumbStructuredDataProps {
  breadcrumbs: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData({
  breadcrumbs,
}: BreadcrumbStructuredDataProps) {
  const data = {
    itemListElement:
      breadcrumbs.map(
        (
          breadcrumb,
          index
        ) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name:
            breadcrumb.name,

          item:
            breadcrumb.url,
        })
      ),
  }

  return (
    <StructuredData
      id="breadcrumb-structured-data"
      type="BreadcrumbList"
      data={data}
    />
  )
}