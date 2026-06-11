// Main portfolio page with all sections
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load heavy sections for better performance
const HeroSection = dynamic(() => import('@/sections/hero-section').then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: false
})

const AboutSection = dynamic(() => import('@/sections/about-section').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-20 flex items-center justify-center">Loading...</div>
})

const SkillsSection = dynamic(() => import('@/sections/skills-section').then(mod => ({ default: mod.SkillsSection })), {
  loading: () => <div className="min-h-20 flex items-center justify-center">Loading...</div>
})

const FeaturedProjectSection = dynamic(() => import('@/sections/featured-project-section').then(mod => ({ default: mod.FeaturedProjectSection })), {
  loading: () => <div className="min-h-20 flex items-center justify-center">Loading...</div>
})

const PersonalProjectsSection = dynamic(() => import('@/sections/personal-projects-section').then(mod => ({ default: mod.PersonalProjectsSection })), {
  loading: () => <div className="min-h-20 flex items-center justify-center">Loading...</div>
})

const CertificationSection = dynamic(() => import('@/sections/certification-section').then(mod => ({ default: mod.CertificationSection })), {
  loading: () => <div className="min-h-20 flex items-center justify-center">Loading...</div>
})

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <HeroSection />
      </Suspense>
      
      {/* About Section */}
      <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
        <AboutSection />
      </Suspense>
      
      {/* Skills Section */}
      <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
        <SkillsSection />
      </Suspense>
      
      {/* Featured Project Section */}
      <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
        <FeaturedProjectSection />
      </Suspense>
      
      {/* Personal Projects Section */}
      <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
        <PersonalProjectsSection />
      </Suspense>
      
      {/* Certification Section */}
      <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
        <CertificationSection />
      </Suspense>
    </>
  );
}
