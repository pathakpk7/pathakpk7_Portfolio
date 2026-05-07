"use client"

import * as React from "react"
import Head from "next/head"
import { Metadata } from "next"

// SEO metadata configuration
const SEO_CONFIG = {
  siteName: "Prasoon Pathak - Cybersecurity & Full Stack Developer",
  title: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",
  description: "Final Year Computer Science student specializing in cybersecurity, full stack development, and AI/ML. Building intelligent intrusion detection systems and secure web applications.",
  keywords: [
    "cybersecurity",
    "full stack developer",
    "AI/ML",
    "intrusion detection",
    "web development",
    "React",
    "Node.js",
    "Python",
    "TensorFlow",
    "computer science",
    "final year project",
    "portfolio",
    "Prasoon Pathak"
  ],
  author: "Prasoon Pathak",
  url: "https://prasoon-portfolio.vercel.app",
  image: "/og-image.jpg",
  twitterHandle: "@prasoonpathak",
  locale: "en_US",
  type: "website"
}

// Generate structured data for SEO
const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Prasoon Pathak",
    "jobTitle": "Computer Science Student & Developer",
    "description": "Final Year Computer Science student specializing in cybersecurity, full stack development, and AI/ML",
    "url": SEO_CONFIG.url,
    "sameAs": [
      "https://github.com/pathakpk7",
      "https://linkedin.com/in/prasoon-pathak",
      "https://twitter.com/prasoonpathak"
    ],
    "knowsAbout": [
      "Cybersecurity",
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "React",
      "Node.js",
      "Python"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University"
    },
    "worksOn": [
      {
        "@type": "SoftwareApplication",
        "name": "SecureNet IDS",
        "description": "Intelligent Intrusion Detection System",
        "url": "https://github.com/pathakpk7/SecureNet_IDS.git"
      }
    ]
  }
}

// SEO Head component
export const SEOHead = React.forwardRef<HTMLHeadElement, {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  keywords?: string[]
  noIndex?: boolean
}>(({ 
  title = SEO_CONFIG.title,
  description = SEO_CONFIG.description,
  image = SEO_CONFIG.image,
  url = SEO_CONFIG.url,
  type = SEO_CONFIG.type,
  keywords = SEO_CONFIG.keywords,
  noIndex = false
 }, ref) => {
  const structuredData = generateStructuredData()

  return (
    <Head ref={ref}>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={SEO_CONFIG.author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={SEO_CONFIG.locale} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="msapplication-TileColor" content="#1a1a1a" />
      <meta name="application-name" content={SEO_CONFIG.siteName} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://github.com" />
      <link rel="preconnect" href="https://vercel.com" />
    </Head>
  )
})

SEOHead.displayName = "SEOHead"

// Dynamic metadata generator for pages
export const generateMetadata = (overrides: Partial<Metadata> = {}): Metadata => {
  return {
    title: overrides.title || SEO_CONFIG.title,
    description: overrides.description || SEO_CONFIG.description,
    keywords: overrides.keywords || SEO_CONFIG.keywords,
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    openGraph: {
      title: overrides.title || SEO_CONFIG.title,
      description: overrides.description || SEO_CONFIG.description,
      url: overrides.url || SEO_CONFIG.url,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: overrides.image || SEO_CONFIG.image,
          width: 1200,
          height: 630,
          alt: overrides.title || SEO_CONFIG.title,
        },
      ],
      locale: SEO_CONFIG.locale,
      type: overrides.type || SEO_CONFIG.type,
    },
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: overrides.title || SEO_CONFIG.title,
      description: overrides.description || SEO_CONFIG.description,
      images: [overrides.image || SEO_CONFIG.image],
    },
    robots: {
      index: !overrides.noIndex,
      follow: !overrides.noIndex,
      googleBot: {
        index: !overrides.noIndex,
        follow: !overrides.noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },
    alternates: {
      canonical: overrides.url || SEO_CONFIG.url,
    },
    ...overrides
  }
}

// Structured data component for specific content
export const StructuredData = React.forwardRef<HTMLScriptElement, {
  type: string
  data: Record<string, any>
}>(({ type, data }, ref) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  }

  return (
    <script
      ref={ref}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
})

StructuredData.displayName = "StructuredData"

// Project structured data
export const ProjectStructuredData = React.forwardRef<HTMLScriptElement, {
  project: {
    name: string
    description: string
    url: string
    technologies: string[]
    image?: string
  }
}>(({ project }, ref) => {
  const data = {
    "@type": "SoftwareApplication",
    "name": project.name,
    "description": project.description,
    "url": project.url,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "programmingLanguage": project.technologies,
    "screenshot": project.image,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return <StructuredData ref={ref} type="SoftwareApplication" data={data} />
})

ProjectStructuredData.displayName = "ProjectStructuredData"

// Blog post structured data
export const BlogPostStructuredData = React.forwardRef<HTMLScriptElement, {
  post: {
    title: string
    description: string
    url: string
    datePublished: string
    dateModified?: string
    author: string
    image?: string
  }
}>(({ post }, ref) => {
  const data = {
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": post.url,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "image": post.image,
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": SEO_CONFIG.image
      }
    }
  }

  return <StructuredData ref={ref} type="BlogPosting" data={data} />
})

BlogPostStructuredData.displayName = "BlogPostStructuredData"

// Breadcrumb structured data
export const BreadcrumbStructuredData = React.forwardRef<HTMLScriptElement, {
  breadcrumbs: Array<{
    name: string
    url: string
  }>
}>(({ breadcrumbs }, ref) => {
  const data = {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url
    }))
  }

  return <StructuredData ref={ref} type="BreadcrumbList" data={data} />
})

BreadcrumbStructuredData.displayName = "BreadcrumbStructuredData"
