export const SITE_CONFIG = {
  name: "Prasoon Pathak",
  title: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",
  description: "Premium portfolio showcasing expertise in cybersecurity, full stack development, AI/ML, and cloud technologies.",
  url: "https://prasoonpathak.com",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/pathakpk7",
    linkedin: "https://www.linkedin.com/in/prasoon7pathak07/",
    twitter: "https://twitter.com/panditpk7",
    instagram: "https://www.instagram.com/_.prasoon_._._/",
    leetcode: "https://leetcode.com/u/pathakMahi/",
    geeksforgeeks: "https://www.geeksforgeeks.org/profile/prasoon7pathak",
    email: "contact@prasoonpathak.com"
  }
}

export const NAVIGATION = {
  home: "Home",
  about: "About", 
  skills: "Skills",
  "featured-project": "Featured Project",
  "personal-projects": "Personal Projects",
  certifications: "Certifications"
}

export const SKILLS = {
  cybersecurity: [
    "Penetration Testing",
    "Security Auditing",
    "Risk Assessment",
    "Incident Response",
    "Compliance Management"
  ],
  fullstack: [
    "React/Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB"
  ],
  ai_ml: [
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "TensorFlow",
    "PyTorch"
  ],
  cloud: [
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Terraform"
  ]
}

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: SITE_CONFIG.links.github,
    icon: "Github"
  },
  {
    name: "LinkedIn",
    href: SITE_CONFIG.links.linkedin,
    icon: "Linkedin"
  },
  {
    name: "Twitter",
    href: SITE_CONFIG.links.twitter,
    icon: "Twitter"
  },
  {
    name: "Instagram",
    href: SITE_CONFIG.links.instagram,
    icon: "Instagram"
  },
  {
    name: "LeetCode",
    href: SITE_CONFIG.links.leetcode,
    icon: "Code2"
  },
  {
    name: "GeeksforGeeks",
    href: SITE_CONFIG.links.geeksforgeeks,
    icon: "Terminal"
  },
  {
    name: "Email",
    href: `mailto:${SITE_CONFIG.links.email}`,
    icon: "Mail"
  }
]

export const ACTIVE_PROFILES = [
  {
    name: "GitHub",
    username: "pathakpk7",
    href: "https://github.com/pathakpk7",
    color: "cyber-blue",
    description: "Open source projects & contributions"
  },
  {
    name: "Twitter (X)",
    username: "panditpk7",
    href: "https://twitter.com/panditpk7",
    color: "cyber-purple",
    description: "Tech insights & updates"
  },
  {
    name: "LinkedIn",
    username: "prasoon7pathak07",
    href: "https://www.linkedin.com/in/prasoon7pathak07/",
    color: "cyber-blue",
    description: "Professional network & achievements"
  },
  {
    name: "Instagram",
    username: "_.prasoon_._._",
    href: "https://www.instagram.com/_.prasoon_._._/",
    color: "cyber-purple",
    description: "Personal moments & creativity"
  },
  {
    name: "LeetCode",
    username: "pathakmahi",
    href: "https://leetcode.com/u/pathakMahi/",
    color: "cyber-blue",
    description: "Problem solving & algorithms"
  },
  {
    name: "GeeksforGeeks",
    username: "prasoon7pathak",
    href: "https://www.geeksforgeeks.org/profile/prasoon7pathak",
    color: "cyber-purple",
    description: "Coding practice & tutorials"
  }
]

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5
  },
  ease: {
    default: [0.25, 0.1, 0.25, 1],
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
    inOut: [0.4, 0, 0.2, 1]
  }
} as const

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
} as const
