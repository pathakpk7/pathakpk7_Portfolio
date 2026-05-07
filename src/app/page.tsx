// Main portfolio page with all sections
import { HeroSection } from "@/sections/hero-section"
import { AboutSection } from "@/sections/about-section"
import { SkillsSection } from "@/sections/skills-section"
import { FeaturedProjectSection } from "@/sections/featured-project-section"
import { PersonalProjectsSection } from "@/sections/personal-projects-section"
import { CertificationSection } from "@/sections/certification-section"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Featured Project Section */}
      <FeaturedProjectSection />
      
      {/* Personal Projects Section */}
      <PersonalProjectsSection />
      
      {/* Certification Section */}
      <CertificationSection />
    </>
  );
}
