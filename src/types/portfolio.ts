// Portfolio data types
export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: "cybersecurity" | "fullstack" | "ai-ml" | "cloud"
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  technologies: string[]
  date: string
}

export interface Skill {
  name: string
  category: "cybersecurity" | "fullstack" | "ai-ml" | "cloud"
  level: number // 1-5
  icon?: string
  description?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  image?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  icon?: string
  category: "professional" | "academic" | "community"
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string[]
  technologies: string[]
  type: "fulltime" | "freelance" | "contract"
}

export interface ContactInfo {
  email: string
  phone?: string
  location: string
  socialLinks: SocialLink[]
}

export interface SocialLink {
  name: string
  href: string
  icon: string
  color?: string
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
}
