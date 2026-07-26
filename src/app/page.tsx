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

const ProjectsSection = dynamic(() => import('@/sections/projects-section').then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="min-h-20 flex items-center justify-center">Loading...</div>
})

const CertificationSection = dynamic(() => import('@/sections/certification-section').then(mod => ({ default: mod.CertificationSection })), {
  loading: () => <div className="min-h-20 flex items-center justify-center">Loading...</div>
})

const ExperienceSection = dynamic(() => import('@/sections/experience-section').then(mod => ({ default: mod.ExperienceSection })), {
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
      
      {/* Projects Section */}
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
          <ProjectsSection />
        </Suspense>
      </ErrorBoundary>

      {/* Experience Section */}
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-20 flex items-center justify-center">Loading...</div>}>
          <ExperienceSection />
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
