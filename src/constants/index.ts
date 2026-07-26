export const SITE_CONFIG = {
  name: "Prasoon Pathak",
  title: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",
  description:
    "Portfolio showcasing expertise in cybersecurity, full stack development, AI/ML, data analytics, and cloud technologies.",
  url: "https://pathakpk7portfolio.vercel.app",
  ogImage: "/og-image.jpg",

  links: {
    github: "https://github.com/pathakpk7",
    linkedin: "https://www.linkedin.com/in/prasoon7pathak07/",
    twitter: "https://twitter.com/panditpk7",
    instagram: "https://www.instagram.com/_.prasoon_._._/",
    leetcode: "https://leetcode.com/u/pathakMahi/",
    geeksforgeeks:
      "https://www.geeksforgeeks.org/profile/prasoon7pathak",
    email: "prasoon7pathak@gmail.com",

    /*
     * IMPORTANT:
     * Put your resume PDF inside:
     *
     * public/resume.pdf
     *
     * The navbar Resume button will use this path.
     */
    resume: "/resume.pdf",
  },
}

/* =========================================================
   NAVIGATION
   ---------------------------------------------------------
   These keys MUST exactly match section IDs.

   about          -> id="about"
   skills         -> id="skills"
   projects       -> id="projects"
   experience     -> id="experience"
   certifications -> id="certifications"

   Resume is intentionally NOT here because it is a file,
   not a page section.
   ========================================================= */

export const NAVIGATION = {
  about: "About",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  certifications: "Certifications",
} as const

/* =========================================================
   SKILLS
   ========================================================= */

export const SKILLS = {
  cybersecurity: [
    "Penetration Testing",
    "Security Auditing",
    "Risk Assessment",
    "Incident Response",
    "Compliance Management",
  ],

  fullstack: [
    "React/Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
  ],

  ai_ml: [
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "TensorFlow",
    "PyTorch",
  ],

  cloud: [
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Terraform",
  ],
}

/* =========================================================
   SOCIAL LINKS
   ========================================================= */

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: SITE_CONFIG.links.github,
    icon: "Github",
  },

  {
    name: "LinkedIn",
    href: SITE_CONFIG.links.linkedin,
    icon: "Linkedin",
  },

  {
    name: "Twitter",
    href: SITE_CONFIG.links.twitter,
    icon: "Twitter",
  },

  {
    name: "Instagram",
    href: SITE_CONFIG.links.instagram,
    icon: "Instagram",
  },

  {
    name: "LeetCode",
    href: SITE_CONFIG.links.leetcode,
    icon: "Code2",
  },

  {
    name: "GeeksforGeeks",
    href: SITE_CONFIG.links.geeksforgeeks,
    icon: "Terminal",
  },

  {
    name: "Email",
    href: `mailto:${SITE_CONFIG.links.email}`,
    icon: "Mail",
  },
]

/* =========================================================
   ACTIVE PROFILES
   ========================================================= */

export const ACTIVE_PROFILES = [
  {
    name: "GitHub",
    username: "pathakpk7",
    href: SITE_CONFIG.links.github,
    color: "cyber-blue",
    description: "Open source projects & contributions",
  },

  {
    name: "Twitter (X)",
    username: "panditpk7",
    href: SITE_CONFIG.links.twitter,
    color: "cyber-purple",
    description: "Tech insights & updates",
  },

  {
    name: "LinkedIn",
    username: "prasoon7pathak07",
    href: SITE_CONFIG.links.linkedin,
    color: "cyber-blue",
    description: "Professional network & achievements",
  },

  {
    name: "Instagram",
    username: "_.prasoon_._._",
    href: SITE_CONFIG.links.instagram,
    color: "cyber-purple",
    description: "Personal moments & creativity",
  },

  {
    name: "LeetCode",
    username: "pathakMahi",
    href: SITE_CONFIG.links.leetcode,
    color: "cyber-blue",
    description: "Problem solving & algorithms",
  },

  {
    name: "GeeksforGeeks",
    username: "prasoon7pathak",
    href: SITE_CONFIG.links.geeksforgeeks,
    color: "cyber-purple",
    description: "Coding practice & tutorials",
  },
]

/* =========================================================
   ANIMATION
   ========================================================= */

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },

  ease: {
    default: [0.25, 0.1, 0.25, 1],
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
    inOut: [0.4, 0, 0.2, 1],
  },
} as const

/* =========================================================
   BREAKPOINTS
   ========================================================= */

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const