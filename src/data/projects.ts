export interface Project {
  id: string
  name: string
  tagline: string
  category: "final-year" | "group" | "personal"
  featured: boolean
  overview: string
  problemSolved: string
  keyFeatures: string[]
  techStack: string[]
  architecture?: string
  challenges?: Array<{ challenge: string; solution: string }>
  keyLearnings?: string[]
  futureRoadmap?: string[]
  projectImpact?: string
  role?: string
  github: string
  liveDemo?: string
  screenshot?: string
  frontend?: string
  backend?: string
  database?: string
  authentication?: string
  apisUsed?: string[]
  hosting?: string
  orm?: string
  storage?: string
  aiModels?: string[]
  teamSize?: string
}

export const projects: Project[] = [
  {
    id: "securenet-ids",
    name: "SecureNet IDS",
    tagline: "Advanced Intrusion Detection System for Network Security",
    category: "final-year",
    featured: true,
    overview: "SecureNet IDS is an advanced Intrusion Detection System designed to detect and prevent cyber threats in real-time. The system uses machine learning algorithms to analyze network traffic patterns and identify suspicious activities, providing organizations with comprehensive security monitoring and threat prevention capabilities.",
    problemSolved: "Traditional IDS solutions often generate high false positive rates, struggle with encrypted traffic analysis, and lack real-time threat intelligence. SecureNet IDS addresses these challenges through AI-powered analysis, encrypted traffic inspection, and continuous threat intelligence updates.",
    keyFeatures: [
      "Real-Time Packet Analysis",
      "Threat Intelligence Integration",
      "IP Reputation Analysis",
      "URL Scanning",
      "Risk Assessment Engine",
      "Security Dashboard",
      "WebSocket Live Monitoring",
      "Threat Investigation System"
    ],
    techStack: [
      "React",
      "Vite",
      "Chart.js",
      "React ChartJS 2",
      "GSAP",
      "Python",
      "FastAPI",
      "WebSockets",
      "Supabase PostgreSQL"
    ],
    frontend: "React, Vite, Chart.js, React ChartJS 2, GSAP",
    backend: "Python, FastAPI, WebSockets",
    database: "Supabase PostgreSQL",
    apisUsed: [
      "VirusTotal API",
      "AbuseIPDB API",
      "URLScan API",
      "AlienVault OTX API",
      "Google Safe Browsing API"
    ],
    authentication: "JWT-based API Security",
    hosting: "Docker Containers, Nginx Reverse Proxy",
    role: "Designed frontend dashboard, Integrated threat intelligence feeds, Built FastAPI backend services, Developed machine learning detection pipeline, Implemented Supabase database integration",
    futureRoadmap: [
      "SIEM Integration",
      "LSTM-Based Threat Detection",
      "Cloud-Native Deployment",
      "Distributed Monitoring Nodes"
    ],
    github: "https://github.com/pathakpk7/SecureNet_IDS.git",
    screenshot: undefined
  },
  {
    id: "ziva",
    name: "Ziva",
    tagline: "Reviving India's Traditional Fitness Heritage Through Technology",
    category: "group",
    featured: false,
    overview: "Ziva is a wellness and fitness platform designed to reconnect users with India's traditional health practices. The platform combines yoga, physical exercises, traditional games, wellness tracking, diet guidance, and personalized health insights to encourage a healthier and more balanced lifestyle.",
    problemSolved: "Modern lifestyles promote sedentary habits, stress, poor fitness routines, and unhealthy living. Traditional Indian wellness practices offer effective solutions but are often difficult to discover, track, and adopt consistently. Ziva bridges this gap through a modern digital platform.",
    keyFeatures: [
      "Yoga Programs",
      "Traditional Fitness Workouts",
      "Wellness Tracking",
      "Diet Guidance",
      "Traditional Indian Games",
      "Achievement System",
      "Progress Analytics Dashboard"
    ],
    techStack: [
      "React",
      "JavaScript",
      "Framer Motion",
      "React Router",
      "Axios",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Passport.js",
      "Google OAuth"
    ],
    frontend: "React, JavaScript, Framer Motion, React Router, Axios",
    backend: "Node.js, Express.js",
    database: "MongoDB",
    authentication: "JWT, Passport.js, Google OAuth",
    role: "Frontend Lead - Developed core UI components, Built fitness tracking interfaces, Implemented animations and user interactions, Integrated backend APIs",
    teamSize: "5 Developers",
    futureRoadmap: [
      "AI Wellness Coach",
      "Community Challenges",
      "Mobile Application",
      "Smart Wearable Integration"
    ],
    github: "https://github.com/ank501/ziva.git",
    screenshot: undefined
  },
  {
    id: "findora",
    name: "Findora",
    tagline: "Gamified Campus Lost & Found Platform",
    category: "group",
    featured: false,
    overview: "Findora is a community-driven Lost & Found platform designed for college campuses. It helps students recover lost belongings efficiently while encouraging participation through gamification and leaderboard-based rewards.",
    problemSolved: "Lost items often remain unrecovered because of fragmented communication channels and low engagement.",
    keyFeatures: [
      "Lost Item Reporting",
      "Found Item Submission",
      "Smart Search",
      "Leaderboards",
      "Trust Score System",
      "Campus Verification",
      "Role-Based Access Control"
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "React Hook Form",
      "Zod",
      "NestJS",
      "Supabase PostgreSQL",
      "Prisma",
      "Cloudinary"
    ],
    frontend: "Next.js, React, TypeScript, Tailwind CSS, Zustand, React Hook Form, Zod",
    backend: "NestJS, TypeScript",
    database: "Supabase PostgreSQL",
    authentication: "JWT Authentication, Passport.js",
    orm: "Prisma",
    storage: "Cloudinary",
    role: "Full Stack Developer - Designed database schema, Implemented authentication, Developed frontend UI, Built backend APIs, Integrated Cloudinary uploads",
    futureRoadmap: [
      "AI Item Matching",
      "QR Verification",
      "Mobile Application",
      "Push Notifications"
    ],
    github: "https://github.com/pathakpk7/Findora.git",
    screenshot: undefined
  },
  {
    id: "social-media-generator",
    name: "Social Media Post & Caption Generator",
    tagline: "AI Content Creation Assistant",
    category: "group",
    featured: false,
    overview: "AI-powered platform that generates captions, hashtags, and social media content suggestions for creators and businesses.",
    problemSolved: "Content creators struggle with generating engaging captions and hashtags consistently. This tool automates the process using AI.",
    keyFeatures: [
      "AI Caption Generation",
      "Hashtag Suggestions",
      "Content Templates",
      "AI Content Creation",
      "Prompt-Based Content Generation"
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Gradio UI",
      "Python",
      "Google Gemini API",
      "Hugging Face Models"
    ],
    frontend: "HTML, CSS, JavaScript, Gradio UI",
    backend: "Python",
    database: "None",
    aiModels: [
      "Google Gemini API",
      "Hugging Face Models"
    ],
    futureRoadmap: [
      "Content Calendar",
      "Brand Voice Customization",
      "Multi-Language Support",
      "Social Platform Integrations"
    ],
    github: "https://github.com/pathakpk7/Social_Media_Post_and_Caption_Generator.git",
    screenshot: undefined
  },
  {
    id: "murder-mystery",
    name: "Murder Mystery Game",
    tagline: "Interactive Detective Game Experience",
    category: "personal",
    featured: false,
    overview: "An interactive murder mystery game where players solve crimes through clue gathering, suspect interviews, and deductive reasoning.",
    problemSolved: "Created an engaging gaming experience that tests logical thinking and detective skills.",
    keyFeatures: [
      "Evidence Collection",
      "Suspect Interrogation",
      "Multiple Cases",
      "Investigation System",
      "Case Progression Tracking",
      "Detective Gameplay"
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Supabase PostgreSQL",
      "JWT Authentication"
    ],
    frontend: "HTML, CSS, JavaScript",
    backend: "Node.js, Express.js",
    database: "Supabase PostgreSQL",
    authentication: "JWT Authentication",
    futureRoadmap: [
      "Multiplayer Investigations",
      "AI Generated Cases",
      "Achievement System",
      "Global Leaderboards"
    ],
    github: "https://github.com/pathakpk7/Murder_Mystery_Game.git",
    screenshot: undefined
  },
  {
    id: "vsbh-cricket",
    name: "VSBH Cricket League",
    tagline: "Cricket Tournament Management System",
    category: "personal",
    featured: false,
    overview: "A comprehensive cricket league management system for organizing tournaments, tracking scores, and managing teams.",
    problemSolved: "Simplified cricket tournament organization with automated score tracking and team management.",
    keyFeatures: [
      "Live Player Auction",
      "Real-Time Bidding",
      "Team Management",
      "League Dashboard",
      "Tournament Analytics",
      "Google Sheets Integration"
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "React Router",
      "Context API",
      "Axios",
      "Socket.IO Client",
      "Node.js",
      "Express.js",
      "Socket.IO",
      "Supabase PostgreSQL"
    ],
    frontend: "React 19, TypeScript, React Router, Context API, Axios, Socket.IO Client",
    backend: "Node.js, Express.js, Socket.IO",
    database: "Supabase PostgreSQL",
    authentication: "Admin Authentication System",
    hosting: "Frontend: Vercel, Backend: Render",
    futureRoadmap: [
      "Live Match Scoring",
      "Fantasy Cricket Module",
      "Mobile Application",
      "Player Performance Analytics"
    ],
    github: "https://github.com/pathakpk7/vsbh-cricleague.git",
    screenshot: undefined
  },
  {
    id: "spotify-clone",
    name: "Spotify Clone",
    tagline: "Music Streaming Platform Replica",
    category: "personal",
    featured: false,
    overview: "A Spotify-inspired music streaming application with playlist management, music playback, and user authentication.",
    problemSolved: "Demonstrated frontend development skills by recreating a popular music streaming platform.",
    keyFeatures: [
      "Spotify-Inspired UI",
      "Playlist Navigation",
      "Music Controls",
      "Responsive Design",
      "Audio Interface"
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    frontend: "HTML, CSS, JavaScript",
    backend: "None",
    database: "None",
    authentication: "None",
    apisUsed: ["None"],
    futureRoadmap: [
      "Spotify API Integration",
      "User Authentication",
      "Playlist Management",
      "React Migration"
    ],
    github: "https://github.com/pathakpk7/Spotify_clone.git",
    screenshot: undefined
  },
  {
    id: "online-book-store",
    name: "Online Book Store",
    tagline: "E-Commerce Book Platform",
    category: "personal",
    featured: false,
    overview: "A complete e-commerce platform for books with shopping cart, user authentication, and product browsing capabilities.",
    problemSolved: "Created a functional e-commerce experience for book sales with cart management and user accounts.",
    keyFeatures: [
      "Book Catalogue",
      "Shopping Cart",
      "Login",
      "Registration",
      "Contact System",
      "Product Browsing"
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    frontend: "HTML, CSS, JavaScript",
    backend: "None",
    database: "None",
    authentication: "Frontend Login/Register Workflow",
    futureRoadmap: [
      "Payment Gateway",
      "Backend Integration",
      "User Profiles",
      "Order Tracking"
    ],
    github: "https://github.com/pathakpk7/Online_Book_Store.git",
    screenshot: undefined
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    tagline: "Real-Time Currency Exchange Rates",
    category: "personal",
    featured: false,
    overview: "A currency converter application that provides real-time exchange rates between multiple currencies.",
    problemSolved: "Simplified currency conversion with up-to-date exchange rates for travelers and businesses.",
    keyFeatures: [
      "Currency Conversion",
      "Multi-Currency Support",
      "Responsive UI",
      "Real-Time Calculations"
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Exchange Rate API"
    ],
    frontend: "HTML, CSS, JavaScript",
    apisUsed: ["Exchange Rate API (if configured)"],
    futureRoadmap: [
      "Historical Exchange Rates",
      "Currency Trend Charts",
      "Favorite Currency Pairs"
    ],
    github: "https://github.com/pathakpk7/Currency_converter.git",
    screenshot: undefined
  },
  {
    id: "food-order",
    name: "Food Order & Delivery System",
    tagline: "Restaurant Food Delivery Platform",
    category: "personal",
    featured: false,
    overview: "A complete food ordering and delivery system for restaurants with menu management, order tracking, and delivery coordination.",
    problemSolved: "Streamlined the food ordering process for restaurants and customers with real-time order tracking.",
    keyFeatures: [
      "Food Menu",
      "Cart System",
      "Order Management",
      "Responsive Layout",
      "Dynamic Price Calculation"
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    frontend: "HTML, CSS, JavaScript",
    backend: "None",
    database: "None",
    authentication: "None",
    futureRoadmap: [
      "Payment Gateway",
      "Order Tracking",
      "User Authentication",
      "Restaurant Dashboard"
    ],
    github: "https://github.com/pathakpk7/Food-order-and-delivery.git",
    screenshot: undefined
  }
]

export const getProjectsByCategory = (category: Project["category"]) => {
  return projects.filter(p => p.category === category)
}

export const getFeaturedProject = () => {
  return projects.find(p => p.featured)
}

export const getProjectById = (id: string) => {
  return projects.find(p => p.id === id)
}
