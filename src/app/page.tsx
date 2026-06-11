// Main portfolio page with all sections
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ErrorBoundary, AnimationErrorBoundary } from '@/components/performance/error-boundary'

// Lazy load heavy sections for better performance
const HeroSection = dynamic(() => import('@/sections/hero-section').then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
    <ErrorBoundary>
      {/* Hero Section */}
      <AnimationErrorBoundary>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <HeroSection />
        </Suspense>
      </AnimationErrorBoundary>
      
      {/* About Section */}
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
          <AboutSection />
        </Suspense>
      </ErrorBoundary>
      
      {/* Skills Section */}
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
          <SkillsSection />
        </Suspense>
      </ErrorBoundary>
      
      {/* Featured Project Section */}
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
          <FeaturedProjectSection />
        </Suspense>
      </ErrorBoundary>
      
      {/* Personal Projects Section */}
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
          <PersonalProjectsSection />
        </Suspense>
      </ErrorBoundary>
      
      {/* Certification Section */}
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
          <CertificationSection />
        </Suspense>
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
