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
      "Real-time Network Traffic Monitoring",
      "Machine Learning-Based Threat Detection",
      "Encrypted Traffic Analysis",
      "Custom Rule Engine",
      "Threat Intelligence Integration",
      "Automated Incident Response",
      "Dashboard with Analytics",
      "Alert System with Severity Levels",
      "Historical Data Analysis",
      "Multi-Protocol Support"
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "Flask",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Wireshark"
    ],
    architecture: "Network Traffic → Packet Capture → Feature Extraction → ML Model → Threat Detection → Alert System → Dashboard",
    challenges: [
      {
        challenge: "High false positive rates in traditional IDS",
        solution: "Implemented ensemble ML models with adaptive thresholding and continuous learning"
      },
      {
        challenge: "Analyzing encrypted network traffic",
        solution: "Used statistical analysis of packet metadata and behavioral pattern recognition"
      },
      {
        challenge: "Real-time performance with large network volumes",
        solution: "Implemented distributed processing with Redis caching and optimized feature extraction"
      }
    ],
    keyLearnings: [
      "Machine Learning for Cybersecurity",
      "Network Protocol Analysis",
      "Real-time System Design",
      "Threat Intelligence Integration",
      "Security Dashboard Development",
      "Performance Optimization"
    ],
    futureRoadmap: [
      "AI-Powered Threat Prediction",
      "Cloud Deployment Support",
      "Mobile Application",
      "Integration with SIEM Systems",
      "Automated Response Playbooks",
      "Multi-tenant Architecture"
    ],
    projectImpact: "Provides organizations with a modern, AI-driven approach to network security, reducing false positives by 60% and improving threat detection accuracy.",
    role: "Full Stack Development | ML Model Training | System Architecture",
    github: "https://github.com/pathakpk7/SecureNet_IDS.git"
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
      "Yoga-Based Workout System",
      "Traditional Indian Exercise Programs",
      "Traditional Games & Activities",
      "Daily Wellness Challenges",
      "Fitness Tracking Dashboard",
      "Diet & Nutrition Guidance",
      "Health Assessment Tools",
      "Gamification System",
      "Achievement Badges",
      "Progress Analytics"
    ],
    techStack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Chart.js",
      "Lottie Animations"
    ],
    architecture: "User → React Frontend → Node.js Backend → MongoDB → Analytics Engine → Personalized Recommendations",
    challenges: [
      {
        challenge: "Making traditional wellness practices engaging for younger generations",
        solution: "Introduced gamification, achievement systems, and daily challenges"
      },
      {
        challenge: "Creating a modern experience around traditional activities",
        solution: "Designed immersive UI with interactive visualizations and progress tracking"
      },
      {
        challenge: "Maintaining user engagement",
        solution: "Implemented streak systems, rewards, and personalized recommendations"
      }
    ],
    keyLearnings: [
      "Frontend Architecture",
      "Gamification Design",
      "User Engagement Systems",
      "Health Tracking Platforms",
      "Data Visualization",
      "Team Collaboration"
    ],
    futureRoadmap: [
      "AI Fitness Coach",
      "Wearable Integration",
      "Personalized Workout Plans",
      "Community Challenges",
      "Mobile Application",
      "Multilingual Support"
    ],
    projectImpact: "Promotes healthy living by combining traditional Indian wellness practices with modern technology, making fitness more engaging and culturally relevant.",
    role: "Frontend Development | UI/UX Design | User Experience Engineering",
    github: "https://github.com/ank501/ziva.git"
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
      "Smart Search System",
      "Campus Authentication",
      "Leaderboards",
      "Gamification",
      "Reward System",
      "Community Engagement"
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "Prisma",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    futureRoadmap: [
      "QR Verification",
      "AI Item Matching",
      "Mobile Application",
      "Campus Notifications",
      "Trust-Based Reputation System"
    ],
    github: "https://github.com/pathakpk7/Findora.git"
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
      "Platform-Specific Optimization",
      "Tone Customization",
      "Batch Generation"
    ],
    techStack: [
      "React",
      "Python",
      "OpenAI API",
      "FastAPI",
      "MongoDB",
      "Tailwind CSS"
    ],
    github: "https://github.com/pathakpk7/Social_Media_Post_and_Caption_Generator.git"
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
      "Interactive Storyline",
      "Clue Discovery System",
      "Suspect Interrogation",
      "Evidence Collection",
      "Deduction Mechanics",
      "Multiple Endings"
    ],
    techStack: [
      "Python",
      "Pygame",
      "SQLite"
    ],
    github: "https://github.com/pathakpk7/Murder_Mystery_Game.git"
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
      "Tournament Scheduling",
      "Live Score Tracking",
      "Team Management",
      "Player Statistics",
      "Leaderboard",
      "Match History"
    ],
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js"
    ],
    github: "https://github.com/pathakpk7/vsbh-cricleague.git"
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
      "Music Playback",
      "Playlist Creation",
      "Search Functionality",
      "User Authentication",
      "Responsive Design",
      "Audio Controls"
    ],
    techStack: [
      "React",
      "Tailwind CSS",
      "Spotify API",
      "Firebase"
    ],
    github: "https://github.com/pathakpk7/Spotify_clone.git"
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
      "Real-Time Exchange Rates",
      "Multiple Currency Support",
      "Historical Rate Charts",
      "Offline Mode",
      "Quick Conversion"
    ],
    techStack: [
      "React",
      "Exchange Rate API",
      "Chart.js",
      "Tailwind CSS"
    ],
    github: "https://github.com/pathakpk7/Currency_converter.git"
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
      "Menu Management",
      "Order Placement",
      "Real-Time Tracking",
      "Payment Integration",
      "Delivery Coordination",
      "User Reviews"
    ],
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe API",
      "Socket.io"
    ],
    github: "https://github.com/pathakpk7/Food-order-and-delivery.git"
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
