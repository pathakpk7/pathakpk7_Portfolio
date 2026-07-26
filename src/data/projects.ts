export type ProjectStatus =
  | "Working Currently"
  | "Completed"
  | "Active"
  | "Open to Work"
  | "Need Future Enhancements"

export interface Project {
  id: string
  name: string
  tagline: string
  category: "final-year" | "group" | "personal"
  status: ProjectStatus
  featured: boolean

  overview: string
  problemSolved: string

  keyFeatures: string[]
  techStack: string[]

  architecture?: string

  challenges?: Array<{
    challenge: string
    solution: string
  }>

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

/* =========================================================
   PROJECTS
========================================================= */

export const projects: Project[] = [
  /* =======================================================
     1. SECURENET IDS
  ======================================================= */

  {
    id: "securenet-ids",

    name: "SecureNet IDS",

    tagline:
      "AI-Powered Real-Time Intrusion Detection System",

    category: "final-year",

    status: "Working Currently",

    featured: true,

    overview:
      "SecureNet IDS is an AI-powered Intrusion Detection System designed to capture and analyze network traffic in real time, identify malicious activity using machine learning, enrich detections using threat intelligence services, and visualize security events through an interactive monitoring dashboard.",

    problemSolved:
      "Traditional network monitoring can struggle with large traffic volumes, fragmented threat intelligence, and manual investigation. SecureNet IDS combines machine learning, real-time packet analysis, threat intelligence, and centralized security monitoring into a single platform.",

    keyFeatures: [
      "Real-Time Packet Capture",
      "ML-Based Intrusion Detection",
      "Threat Intelligence Integration",
      "IP Reputation Analysis",
      "URL Scanning",
      "Flow-Based Feature Extraction",
      "Risk Assessment Engine",
      "WebSocket Live Monitoring",
      "Security Analytics Dashboard",
      "Supabase Security Logging",
    ],

    techStack: [
      "React",
      "Vite",
      "Chart.js",
      "GSAP",
      "Python",
      "FastAPI",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "PyShark",
      "Scapy",
      "WebSockets",
      "Supabase PostgreSQL",
    ],

    frontend:
      "React, Vite, Chart.js, GSAP",

    backend:
      "Python, FastAPI, WebSockets",

    database:
      "Supabase PostgreSQL",

    apisUsed: [
      "VirusTotal API",
      "AbuseIPDB API",
      "URLScan.io API",
      "AlienVault OTX API",
      "Google Safe Browsing API",
    ],

    authentication:
      "JWT-based API Security",

    hosting:
      "Docker Containers, Nginx Reverse Proxy",

    aiModels: [
      "CICIDS2017 Machine Learning Model",
      "Scikit-Learn Random Forest",
    ],

    role:
      "Designed the security dashboard, developed FastAPI backend services, integrated threat intelligence APIs, implemented the machine-learning detection pipeline, and connected security logs with Supabase.",

    futureRoadmap: [
      "SIEM Integration",
      "LSTM-Based Threat Detection",
      "Autoencoder Anomaly Detection",
      "SOAR Integration",
      "Automatic Threat Blocking",
      "Cloud-Native Deployment",
    ],

    github:
      "https://github.com/pathakpk7/SecureNet_IDS.git",
  },

  /* =======================================================
     2. SOCIAL MEDIA GENERATOR
  ======================================================= */

  {
    id: "social-media-generator",

    name: "Social Media Post & Caption Generator",

    tagline:
      "AI-Powered Social Content Creation Assistant",

    category: "group",

    status: "Completed",

    featured: true,

    overview:
      "An AI-powered application that generates social-media captions, hashtags, and content suggestions using generative AI models.",

    problemSolved:
      "Content creators and businesses often spend significant time generating engaging captions and relevant hashtags. The application simplifies this workflow using prompt-driven AI content generation.",

    keyFeatures: [
      "AI Caption Generation",
      "Hashtag Suggestions",
      "Prompt-Based Generation",
      "Content Templates",
      "AI Content Suggestions",
    ],

    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Gradio",
      "Google Gemini API",
      "Hugging Face",
    ],

    frontend:
      "HTML, CSS, JavaScript, Gradio UI",

    backend: "Python",

    database: "None",

    aiModels: [
      "Google Gemini",
      "Hugging Face Models",
    ],

    futureRoadmap: [
      "Content Calendar",
      "Brand Voice Customization",
      "Multi-Language Support",
      "Social Platform Integrations",
    ],

    github:
      "https://github.com/pathakpk7/Social_Media_Post_and_Caption_Generator.git",
  },

  /* =======================================================
     3. MURDER MYSTERY
  ======================================================= */

  {
    id: "murder-mystery",

    name: "Murder Mystery Game",

    tagline:
      "Interactive Detective & Investigation Experience",

    category: "personal",

    status: "Active",

    featured: true,

    overview:
      "An interactive detective game where players investigate fictional crimes by collecting evidence, questioning suspects, tracking clues, and applying deductive reasoning.",

    problemSolved:
      "Creates an interactive browser-based detective experience centered around logical reasoning, evidence analysis, and investigation.",

    keyFeatures: [
      "Evidence Collection",
      "Suspect Interrogation",
      "Multiple Cases",
      "Investigation System",
      "Case Progression",
      "Detective Gameplay",
    ],

    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Supabase PostgreSQL",
      "JWT",
    ],

    frontend:
      "HTML, CSS, JavaScript",

    backend:
      "Node.js, Express.js",

    database:
      "Supabase PostgreSQL",

    authentication:
      "JWT Authentication",

    futureRoadmap: [
      "Multiplayer Investigations",
      "AI-Generated Cases",
      "Achievement System",
      "Global Leaderboards",
    ],

    github:
      "https://github.com/pathakpk7/Murder_Mystery_Game.git",
  },

  /* =======================================================
     4. VSBH CRICKET LEAGUE
  ======================================================= */

  {
    id: "vsbh-cricket",

    name: "VSBH Cricket League",

    tagline:
      "Real-Time Cricket League & Auction Platform",

    category: "personal",

    status: "Completed",

    featured: true,

    overview:
      "A cricket league management platform designed to organize teams, conduct live player auctions, manage tournament information, and provide league analytics.",

    problemSolved:
      "Simplifies cricket tournament and player-auction management by bringing bidding, team management, and league information into a centralized digital platform.",

    keyFeatures: [
      "Live Player Auction",
      "Real-Time Bidding",
      "Team Management",
      "League Dashboard",
      "Tournament Analytics",
      "Google Sheets Integration",
    ],

    techStack: [
      "React 19",
      "TypeScript",
      "React Router",
      "Context API",
      "Axios",
      "Socket.IO",
      "Node.js",
      "Express.js",
      "Supabase PostgreSQL",
    ],

    frontend:
      "React 19, TypeScript, React Router, Context API, Axios, Socket.IO Client",

    backend:
      "Node.js, Express.js, Socket.IO",

    database:
      "Supabase PostgreSQL",

    authentication:
      "Admin Authentication System",

    hosting:
      "Vercel, Render",

    futureRoadmap: [
      "Live Match Scoring",
      "Fantasy Cricket Module",
      "Mobile Application",
      "Player Performance Analytics",
    ],

    github:
      "https://github.com/pathakpk7/vsbh-cricleague.git",
  },

  /* =======================================================
     5. SPOTIFY CLONE
  ======================================================= */

  {
    id: "spotify-clone",

    name: "Spotify Clone",

    tagline:
      "Spotify-Inspired Music Streaming Interface",

    category: "personal",

    status: "Open to Work",

    featured: false,

    overview:
      "A Spotify-inspired frontend application recreating the visual experience of a modern music streaming platform.",

    problemSolved:
      "Developed to practice responsive frontend architecture, audio interfaces, playlist navigation, and recreation of a production-style user interface.",

    keyFeatures: [
      "Spotify-Inspired UI",
      "Playlist Navigation",
      "Music Controls",
      "Responsive Design",
      "Audio Interface",
    ],

    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
    ],

    frontend:
      "HTML, CSS, JavaScript",

    backend: "None",

    database: "None",

    authentication: "None",

    futureRoadmap: [
      "Spotify API Integration",
      "User Authentication",
      "Playlist Management",
      "React Migration",
    ],

    github:
      "https://github.com/pathakpk7/Spotify_clone.git",
  },

  /* =======================================================
     6. ONLINE BOOK STORE
  ======================================================= */

  {
    id: "online-book-store",

    name: "Online Book Store",

    tagline:
      "Responsive Book Shopping Experience",

    category: "personal",

    status: "Completed",

    featured: false,

    overview:
      "A responsive online bookstore interface providing book discovery, product browsing, shopping-cart interactions, login, and registration workflows.",

    problemSolved:
      "Demonstrates the core frontend experience of an e-commerce bookstore with organized catalogue browsing and cart interactions.",

    keyFeatures: [
      "Book Catalogue",
      "Shopping Cart",
      "Login",
      "Registration",
      "Contact System",
      "Product Browsing",
    ],

    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
    ],

    frontend:
      "HTML, CSS, JavaScript",

    backend: "None",

    database: "None",

    authentication:
      "Frontend Login/Register Workflow",

    futureRoadmap: [
      "Payment Gateway",
      "Backend Integration",
      "User Profiles",
      "Order Tracking",
    ],

    github:
      "https://github.com/pathakpk7/Online_Book_Store.git",
  },

  /* =======================================================
     7. CURRENCY CONVERTER
  ======================================================= */

  {
    id: "currency-converter",

    name: "Currency Converter",

    tagline:
      "Simple Real-Time Currency Conversion Tool",

    category: "personal",

    status: "Completed",

    featured: false,

    overview:
      "A responsive currency conversion application designed to calculate values between multiple currencies using exchange-rate data.",

    problemSolved:
      "Provides a straightforward interface for quickly converting values between currencies.",

    keyFeatures: [
      "Currency Conversion",
      "Multi-Currency Support",
      "Responsive UI",
      "Real-Time Calculations",
      "Exchange Rate Integration",
    ],

    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Exchange Rate API",
    ],

    frontend:
      "HTML, CSS, JavaScript",

    apisUsed: [
      "Exchange Rate API",
    ],

    futureRoadmap: [
      "Historical Exchange Rates",
      "Currency Trend Charts",
      "Favorite Currency Pairs",
    ],

    github:
      "https://github.com/pathakpk7/Currency_converter.git",
  },

  /* =======================================================
     8. FOOD ORDER & DELIVERY
  ======================================================= */

  {
    id: "food-order",

    name: "Food Order & Delivery System",

    tagline:
      "Responsive Restaurant Ordering Experience",

    category: "personal",

    status: "Need Future Enhancements",

    featured: false,

    overview:
      "A responsive food-ordering interface featuring menu browsing, cart management, dynamic price calculation, and an ordering workflow.",

    problemSolved:
      "Provides a simplified digital food-ordering experience while demonstrating cart management and dynamic frontend interactions.",

    keyFeatures: [
      "Food Menu",
      "Cart System",
      "Order Management",
      "Responsive Layout",
      "Dynamic Price Calculation",
    ],

    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
    ],

    frontend:
      "HTML, CSS, JavaScript",

    backend: "None",

    database: "None",

    authentication: "None",

    futureRoadmap: [
      "Payment Gateway",
      "Real-Time Order Tracking",
      "User Authentication",
      "Restaurant Dashboard",
      "Backend Integration",
    ],

    github:
      "https://github.com/pathakpk7/Food-order-and-delivery.git",
  },
]

/* =========================================================
   HELPERS
========================================================= */

export const getProjectsByCategory = (
  category: Project["category"]
) => {
  return projects.filter(
    (project) => project.category === category
  )
}

export const getFeaturedProject = () => {
  return projects.find(
    (project) => project.featured
  )
}

export const getProjectById = (
  id: string
) => {
  return projects.find(
    (project) => project.id === id
  )
}