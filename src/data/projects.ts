export type ProjectStatus =
  | "Completed"
  | "In Development"
  | "Frontend Prototype"
  | "Prototype"
  | "Final Year Project"

export interface Project {
  id: string
  name: string
  tagline: string
  category:
    | "AI & Cybersecurity"
    | "Generative AI"
    | "Full Stack"
    | "Frontend"
    | "Game Development"
    | "Productivity"
    | "Web Application"
  status: ProjectStatus
  featured: boolean
  overview: string
  problem: string
  features: string[]
  techStack: string[]
  architecture?: string
  challenges?: {
    challenge: string
    solution: string
  }[]
  keyLearnings?: string[]
  roadmap?: string[]
  projectImpact?: string
  role?: string
  githubUrl: string
  liveUrl?: string
  screenshot?: string
  screenshots?: string[]
  frontend?: string[]
  backend?: string[]
  database?: string[]
  authentication?: string
  apis?: string[]
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
  // 1. ___________________________________________SECURENET IDS__________________________________
  {
    id: "securenet-ids",
    name: "SecureNet IDS",
    featured: true,
    status: "Final Year Project",
    category: "AI & Cybersecurity",
    tagline:
      "AI-Powered Intrusion Detection System for Real-Time Threat Detection",
    overview:
      "SecureNet IDS is my final-year project focused on building an intelligent Intrusion Detection System capable of monitoring live network traffic, extracting flow features, detecting attacks using Machine Learning models, and presenting actionable security insights through a modern dashboard. The project is currently under active development.",
    problem:
      "Traditional network monitoring tools often require multiple disconnected solutions for packet capture, threat detection, analytics, and reporting. SecureNet IDS aims to consolidate these capabilities into one intelligent platform.",
    features: [
      "Real-time packet capture",
      "Network flow feature extraction",
      "Machine Learning-based intrusion detection",
      "Threat intelligence integration",
      "Interactive security dashboard",
      "Live network monitoring",
      "Historical traffic analytics",
      "Attack classification",
      "Risk-level visualization",
      "Security event logging",
    ],
    techStack: [
      "React",
      "FastAPI",
      "Python",
      "TensorFlow",
      "Supabase",
      "PostgreSQL",
    ],
    frontend: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Chart.js",
    ],
    backend: [
      "FastAPI",
      "Python",
    ],
    database: [
      "Supabase",
      "PostgreSQL",
    ],
    aiModels: [
      "TensorFlow",
      "Scikit-Learn",
    ],
    apis: [
      "VirusTotal",
      "AbuseIPDB",
      "URLScan.io",
      "AlienVault OTX",
    ],
    role: "Full Stack Developer • AI/ML Developer",
    githubUrl: "https://github.com/pathakpk7/SecureNet_IDS.git",
    screenshot: "/projects/securenet-ids/thumbnail.png",
    screenshots: [
      "/projects/securenet-ids/dashboard.png",
      "/projects/securenet-ids/traffic.png",
      "/projects/securenet-ids/threats.png",
      "/projects/securenet-ids/analytics.png",
    ],
    roadmap: [
      "Complete backend integration",
      "Improve detection accuracy",
      "Add SIEM integration",
      "Implement SOAR workflows",
      "Deploy production version",
    ],
  },

  // 2. ___________________________________________MURDER MYSTERY GAME__________________________________
  {
    id: "murder-mystery-game",
    name: "Murder Mystery Game",
    featured: true,
    status: "Completed",
    category: "Game Development",
    tagline:
      "Interactive Detective Game with Branching Storylines & Multiple Endings",
    overview:
      "An interactive browser-based detective game where players investigate crimes, collect evidence, interrogate suspects, and solve mysteries through branching narratives. The project is currently under active development with additional gameplay, stories, and puzzles being added.",
    problem:
      "Most web-based mystery games provide linear gameplay with limited player interaction. This project aims to create a replayable detective experience with meaningful choices and multiple endings.",
    features: [
      "Interactive detective gameplay",
      "Branching storyline",
      "Evidence collection",
      "Character interactions",
      "Puzzle solving",
      "Multiple endings",
      "Dialogue-driven progression",
      "Case-based gameplay",
    ],
    techStack: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "PostgreSQL",
    ],
    frontend: [
      "React",
      "Tailwind CSS",
      "JavaScript",
    ],
    role: "Game Designer • Frontend Developer",
    githubUrl: "https://github.com/pathakpk7/Murder_Mystery_Game.git",
    liveUrl: "https://murder-mystery-game-nine.vercel.app/",
    screenshot: "/projects/murder-mystery-game/thumbnail.png",
    screenshots: [
      "/projects/murder-mystery-game/dashboard.png",
      "/projects/murder-mystery-game/story.png",
      "/projects/murder-mystery-game/gameplay.png",
      "/projects/murder-mystery-game/cases.png",
      "/projects/murder-mystery-game/suspects.png",
    ],
    roadmap: [
      "Add more cases",
      "Expand story branches",
      "Improve UI & animations",
      "Add save/load system",
      "Background music & sound effects",
    ],
  },

  // 3. ___________________________________________PROJECT 7 (DHONI 7)__________________________________
  {
    id: "dhoni-7",
    name: "Captain Cool: Decoded (Project 7)",
    featured: true,
    status: "Completed",
    category: "Web Application",
    tagline:
      "Cinematic Interactive Cricket Data Warehouse & Documentary",
    overview:
      "An interactive cricket data exploration platform and cinematic web experience decoding MS Dhoni's career across 826 matches, 776 innings, and 25,541+ deliveries verified from Cricsheet archives. Includes format-isolated analytics, head-to-head bowler dominance, a tactical simulator, and an Ask Mahi AI data intelligence assistant.",
    problem:
      "Sports statistics are often presented as dry numbers without narrative context or deep ball-by-ball situational nuance. Dhoni_7 merges verified ball-by-ball data warehousing with cinematic visual storytelling.",
    features: [
      "Verified ball-by-ball data warehouse (2004–2024)",
      "Strict format isolation (Test, ODI, T20I, IPL, CLT20)",
      "Ask Mahi AI data intelligence module",
      "Mahi Tactical Lab match-situation simulator",
      "Dual-universe UI switcher (India Blue vs CSK Yellow)",
      "Head-to-head bowler matchup analytics",
      "Career timeline & milestone breakdown",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Python",
      "Pandas",
    ],
    frontend: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    role: "Lead Developer & Data Analyst",
    githubUrl: "https://github.com/pathakpk7/Dhoni_7.git",
    liveUrl: "https://project-7-tau.vercel.app",
    screenshot: "/projects/dhoni-7/thumbnail.png",
    screenshots: [
      "/projects/dhoni-7/home.png",
      "/projects/dhoni-7/memorabilia.png",
      "/projects/dhoni-7/telemetry.png",
      "/projects/dhoni-7/helicopter-shot.png",
      "/projects/dhoni-7/storybook.png",
    ],
    roadmap: [],
  },

  // 4. ___________________________________________PLAYNED__________________________________
  {
    id: "playned",
    name: "PlayNed",
    featured: true,
    status: "Completed",
    category: "Game Development",
    tagline:
      "Modular 2D Multiplayer Gaming & Board Game Platform",
    overview:
      "PlayNed is a modern, modular 2D multiplayer gaming platform hosting casual, strategy, deduction, and board games under a unified real-time architecture. It decouples platform infrastructure (room matchmaking, player presence, WebSocket state synchronization) from deterministic game engines.",
    problem:
      "Building real-time multiplayer web and mobile games usually results in tightly coupled, monolithic server logic. PlayNed introduces a clean separation between real-time networking and pluggable deterministic game engines.",
    features: [
      "Hangman Reimagined (38,000+ words, 100 levels, Word DNA)",
      "Dots & Boxes turn-based strategy engine",
      "Real-time WebSocket room synchronization",
      "Deterministic move validation and win conditions",
      "Room creation, matchmaking, and player presence",
      "Cross-platform responsive client",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "FastAPI",
      "Python",
      "WebSockets",
      "Neon PostgreSQL",
    ],
    frontend: [
      "Flutter",
      "Dart",
    ],
    backend: [
      "FastAPI",
      "Python",
      "WebSockets",
    ],
    database: [
      "PostgreSQL",
      "Neon DB",
    ],
    role: "Full Stack Game Developer",
    githubUrl: "https://github.com/pathakpk7/PlayNed.git",
    liveUrl: "https://playned-frontend.vercel.app",
    screenshot: "/projects/playned/thumbnail.png",
    screenshots: [
      "/projects/playned/home.png",
      "/projects/playned/games.png",
      "/projects/playned/party-games.png",
      "/projects/playned/multiplayer.png",
    ],
    roadmap: [
      "Add Quoridor and Pentago game engines",
      "Global leaderboard system",
    ],
  },

  // 5. ___________________________________________VSBH CRICKET LEAGUE__________________________________
  {
    id: "vsbh-cricket-league",
    name: "VSBH Cricket League",
    featured: true,
    status: "Completed",
    category: "Full Stack",
    tagline:
      "Cricket League & Tournament Management Platform",
    overview:
      "A full-stack web application developed to manage cricket tournaments including teams, fixtures, points tables, and league information through a centralized dashboard.",
    problem:
      "Managing local cricket tournaments manually is time-consuming. This application digitizes tournament management and provides an organized interface for league administration.",
    features: [
      "Team management",
      "League dashboard",
      "Fixtures management",
      "Points table",
      "Responsive UI",
      "Tournament overview",
    ],
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
    ],
    frontend: [
      "React",
      "JavaScript",
      "CSS",
    ],
    backend: [
      "Node.js",
      "Express.js",
    ],
    database: [
      "PostgreSQL",
    ],
    role: "Full Stack Developer",
    githubUrl: "https://github.com/pathakpk7/vsbh-cricleague.git",
    liveUrl: "https://vsbh-cl.vercel.app",
    screenshot: "/projects/vsbh-cricket-league/thumbnail.png",
    screenshots: [
      "/projects/vsbh-cricket-league/dashboard.png",
      "/projects/vsbh-cricket-league/teams.png",
      "/projects/vsbh-cricket-league/fixtures.png",
    ],
    roadmap: [],
  },

  // 6. ___________________________________________PATHAK BLOG__________________________________
  {
    id: "pathak-blog",
    name: "ThePathak.tech (Pathak Blog)",
    featured: true,
    status: "Completed",
    category: "Full Stack",
    tagline:
      "Editorial Publishing Platform & Writer Studio CMS",
    overview:
      "ThePathak.tech is an independent, production-grade publishing platform and editorial CMS engineered with Next.js 15 (App Router), React 19, Prisma ORM, Neon PostgreSQL, and Tailwind CSS v4. It pairs a magazine reading experience with a desktop-class Writer Studio CMS featuring split panels, live previews, and rich-text/MDX editing.",
    problem:
      "Standard blogging platforms are either too rigid or lack integrated, desktop-class writing environments with real-time editorial tools.",
    features: [
      "Desktop-class Writer Studio CMS",
      "Draggable split-panel live preview",
      "Rich-text and MDX editing support",
      "Editorial magazine reading layout",
      "Reader engagement telemetry",
      "Activity notification system",
      "Database-backed content management",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    frontend: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
    ],
    backend: [
      "Next.js App Router",
      "Server Actions",
    ],
    database: [
      "Neon PostgreSQL",
      "Prisma ORM",
    ],
    role: "Full Stack Architect",
    githubUrl: "https://github.com/pathakpk7/pathakpk7_blog.git",
    liveUrl: "https://pathakpk7blog.vercel.app",
    screenshot: "/projects/pathak-blog/thumbnail.png",
    screenshots: [
      "/projects/pathak-blog/home.png",
      "/projects/pathak-blog/studio.png",
      "/projects/pathak-blog/folio-cover.png",
      "/projects/pathak-blog/folio-inside.png",
      "/projects/pathak-blog/notifications.png",
    ],
    roadmap: [],
  },

  // 7. ___________________________________________AI SOCIAL MEDIA POST & CAPTION GENERATOR__________________________________
  {
    id: "social-media-generator",
    name: "AI Social Media Post & Caption Generator",
    featured: true,
    status: "Completed",
    category: "Generative AI",
    tagline:
      "Generate Social Media Posts & Captions using Large Language Models",
    overview:
      "An AI-powered web application that generates engaging social media posts and captions using prompt engineering and Large Language Models to help creators produce content more efficiently.",
    problem:
      "Creating engaging social media content consistently is time-consuming. This application assists users by generating AI-powered captions and posts from simple prompts.",
    features: [
      "AI-generated captions",
      "AI-generated posts",
      "Prompt-based generation",
      "Clean web interface",
      "Fast content generation",
    ],
    techStack: [
      "React",
      "Google Gemini API",
      "Hugging Face",
    ],
    frontend: [
      "React",
    ],
    backend: [
      "Python",
    ],
    aiModels: [
      "Google Gemini",
      "Hugging Face",
    ],
    role: "AI Developer",
    githubUrl: "https://github.com/pathakpk7/Social_Media_Post_and_Caption_Generator.git",
    screenshot: "/projects/social-media-generator/thumbnail.png",
    screenshots: [
      "/projects/social-media-generator/home.png",
      "/projects/social-media-generator/output.png",
      "/projects/social-media-generator/history.png",
      "/projects/social-media-generator/generator.png",
    ],
    roadmap: [],
  },

  // 8. ___________________________________________FINDORA__________________________________
  {
    id: "findora",
    name: "Findora",
    featured: true,
    status: "Prototype",
    category: "Full Stack",
    tagline:
      "Campus Lost & Found Management Platform",
    overview:
      "Findora is a campus-focused Lost & Found platform designed to simplify reporting, discovering, and managing lost items through a centralized web application. The project is currently in the prototype stage and active development is paused.",
    problem:
      "Students often struggle to recover lost belongings due to fragmented communication channels. Findora aims to provide a single platform for reporting and finding lost items.",
    features: [
      "Lost item reporting",
      "Found item reporting",
      "Item browsing",
      "Search interface",
      "Category management",
      "Prototype responsive UI",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Prisma",
    ],
    frontend: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
    ],
    backend: [
      "NestJS (Planned)",
    ],
    database: [
      "Supabase",
      "PostgreSQL",
      "Prisma",
    ],
    role: "Full Stack Developer",
    githubUrl: "https://github.com/pathakpk7/Findora.git",
    screenshot: "/projects/findora/thumbnail.png",
    screenshots: [
      "/projects/findora/home.png",
      "/projects/findora/dashboard.png",
      "/projects/findora/report-item.png",
      "/projects/findora/auth.png",
    ],
    roadmap: [
      "Complete backend",
      "Authentication",
      "Image uploads",
      "Role-based access control",
      "Email notifications",
      "Admin dashboard",
    ],
  },

  // 9. ___________________________________________JEEVA AI__________________________________
  {
    id: "jeeva-ai",
    name: "JeevaAi",
    featured: true,
    status: "Completed",
    category: "Generative AI",
    tagline:
      "Evidence-Grounded Medical Knowledge Assistant using RAG",
    overview:
      "JeevaAi is a Generative AI medical knowledge assistant and knowledge explorer built around Retrieval-Augmented Generation (RAG). It combines dense semantic search, BM25 lexical retrieval, Reciprocal Rank Fusion, grounded LLM generation, programmatic citations, and conversational query rewriting to provide evidence-grounded educational answers from The Gale Encyclopedia of Medicine (2nd Edition).",
    problem:
      "General-purpose AI systems can produce unsupported medical answers. JeevaAi is designed to keep responses grounded in retrieved medical reference material while providing transparent citations and educational disclaimers.",
    features: [
      "Evidence-grounded RAG pipeline",
      "Hybrid semantic and BM25 search",
      "Reciprocal Rank Fusion (RRF)",
      "Medical knowledge explorer",
      "Programmatic source citations",
      "Conversational query rewriting",
      "Multi-turn conversational memory",
      "Persistent ChromaDB vector store",
      "Request ID tracing",
      "Readiness probes",
      "Docker deployment support",
      "Automated test suite",
    ],
    techStack: [
      "Python",
      "Flask",
      "LangChain",
      "OpenAI",
      "Sentence Transformers",
      "ChromaDB",
      "BM25",
      "HTML5",
      "CSS3",
      "Docker",
    ],
    frontend: [
      "HTML5",
      "CSS3",
    ],
    backend: [
      "Python",
      "Flask",
      "Waitress",
      "Gunicorn",
    ],
    database: [
      "ChromaDB",
    ],
    aiModels: [
      "OpenAI",
      "all-MiniLM-L6-v2",
    ],
    role: "Generative AI Developer",
    githubUrl: "https://github.com/pathakpk7/JeevaAi.git",
    screenshot: "/projects/jeeva-ai/thumbnail.png",
    screenshots: [
      "/projects/jeeva-ai/home.png",
      "/projects/jeeva-ai/chat.png",
      "/projects/jeeva-ai/search.png",
      "/projects/jeeva-ai/results.png",
    ],
    roadmap: [],
    projectImpact:
      "The hybrid retrieval pipeline is reported with 94.44% Recall@4, 86.11% Precision@4, and 0.9028 MRR, with 51 automated tests passing in the repository documentation.",
  },

  // 10. ___________________________________________IAIP__________________________________
  {
    id: "iaip",
    name: "IAIP",
    featured: true,
    status: "In Development",
    category: "Full Stack",
    tagline:
      "Data Analytics & Machine Learning Internship Project Portfolio",
    overview:
      "IAIP is a collection of projects completed as part of my Data Analytics Internship at Intern Alpha. The repository documents practical work in exploratory data analysis, visualization, business insights, and machine learning, including Sales Data Analysis and Customer Segmentation using K-Means clustering.",
    problem:
      "Businesses need to convert raw datasets into meaningful insights and actionable decisions. IAIP focuses on applying structured data-analysis and machine-learning workflows to real-world-style datasets.",
    features: [
      "Sales data analysis",
      "Exploratory data analysis",
      "Sales and profit trend analysis",
      "Seasonality analysis",
      "Customer segment analysis",
      "Product and category analysis",
      "Regional performance analysis",
      "Discount vs profitability analysis",
      "K-Means customer segmentation",
      "Cluster profiling",
      "Business recommendations",
      "Data visualization",
    ],
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Jupyter Notebook",
    ],
    frontend: [
      "Jupyter Notebook",
    ],
    aiModels: [
      "K-Means Clustering",
    ],
    role: "Data Analytics Intern • Data Analyst",
    githubUrl: "https://github.com/pathakpk7/IAIP.git",
    screenshot: "/projects/iaip/thumbnail.png",
    screenshots: [
      "/projects/iaip/sales-analysis.png",
      "/projects/iaip/customer-segmentation.png",
      "/projects/iaip/visualizations.png",
      "/projects/iaip/recommendations.png",
    ],
    roadmap: [
      "Complete Customer Segmentation task",
      "Add additional internship analytics projects",
      "Expand machine learning analysis",
      "Document further business insights",
    ],
    projectImpact:
      "The repository reports 9,994 retail records analyzed in the Sales Data Analysis task, with approximately $2.30M in sales, $286K in profit, and a 12.47% overall profit margin. Customer Segmentation applies K-Means to age, annual income, and spending score features.",
  },

  /* =========================================================
     NON-FEATURED PROJECTS (ROW 2)
  ========================================================= */

  // 11. ___________________________________________WEATHEROS__________________________________
  {
    id: "weatheros",
    name: "WeatherOS",
    featured: false,
    status: "Completed",
    category: "Web Application",
    tagline:
      "Modern Weather Dashboard with Real-Time Forecasts",
    overview:
      "WeatherOS is a responsive weather application that provides current weather conditions and forecasts through a clean, modern user interface using a public weather API.",
    problem:
      "Users often need a lightweight weather application that delivers essential weather information without unnecessary complexity.",
    features: [
      "Current weather",
      "Location search",
      "Temperature details",
      "Weather conditions",
      "Responsive interface",
      "Modern dashboard",
    ],
    techStack: [
      "React",
      "JavaScript",
      "OpenWeather API",
    ],
    frontend: [
      "React",
      "JavaScript",
    ],
    apis: [
      "OpenWeather API",
    ],
    role: "Frontend Developer",
    githubUrl: "https://github.com/pathakpk7/WeatherOS.git",
    screenshot: "/projects/weatheros/thumbnail.png",
    screenshots: [
      "/projects/weatheros/dashboard.png",
      "/projects/weatheros/search.png",
      "/projects/weatheros/forecast.png",
      "/projects/weatheros/hourly.png",
    ],
    roadmap: [],
  },

  // 12. ___________________________________________RE-TASK__________________________________
  {
    id: "retask",
    name: "ReTask",
    featured: false,
    status: "In Development",
    category: "Productivity",
    tagline:
      "Smart Task & Productivity Manager for Daily Workflow",
    overview:
      "ReTask is a productivity application focused on intelligent task management. It is being developed to provide recurring tasks, smart scheduling, daily planning, analytics, and productivity-focused workflows.",
    problem:
      "Most traditional to-do applications simply store tasks without helping users build consistent habits or manage recurring work efficiently.",
    features: [
      "Task management",
      "Recurring tasks",
      "Daily planner",
      "Task categories",
      "Productivity dashboard",
      "Pomodoro timer",
      "Task history",
      "Smart carry-forward (planned)",
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    frontend: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    role: "Frontend Developer",
    githubUrl: "https://github.com/pathakpk7/ReTask.git",
    screenshot: "/projects/retask/thumbnail.png",
    screenshots: [
      "/projects/retask/dashboard.png",
      "/projects/retask/tasks.png",
      "/projects/retask/analytics.png",
      "/projects/retask/planner.png",
    ],
    roadmap: [
      "Task reminders",
      "Cloud sync",
      "Calendar integration",
      "User authentication",
      "Cross-device synchronization",
    ],
  },

  // 13. ___________________________________________CURRENCY CONVERTER__________________________________
  {
    id: "currency-converter",
    name: "Currency Converter",
    featured: false,
    status: "Completed",
    category: "Web Application",
    tagline:
      "Real-Time Currency Conversion with Live Exchange Rates",
    overview:
      "A lightweight web application that converts currencies using real-time exchange rate data through an external API. The project focuses on providing a fast, responsive, and intuitive conversion experience.",
    problem:
      "Manual currency conversion is inconvenient and often inaccurate without up-to-date exchange rates. This application simplifies the process through live conversion.",
    features: [
      "Real-time currency conversion",
      "Multiple currency support",
      "Responsive interface",
      "Fast conversion",
      "User-friendly design",
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    frontend: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    role: "Frontend Developer",
    githubUrl: "https://github.com/pathakpk7/Currency_converter.git",
    screenshot: "/projects/currency-converter/thumbnail.png",
    screenshots: [
      "/projects/currency-converter/dashboard.png",
      "/projects/currency-converter/converter.png",
      "/projects/currency-converter/result.png",
      "/projects/currency-converter/history.png",
      "/projects/currency-converter/currencies.png",
    ],
    roadmap: [],
  },

  // 14. ___________________________________________ONLINE BOOK STORE__________________________________
  {
    id: "online-book-store",
    name: "Online Book Store",
    featured: false,
    status: "Frontend Prototype",
    category: "Frontend",
    tagline:
      "Responsive Online Book Shopping Interface",
    overview:
      "A frontend bookstore application developed to demonstrate catalog browsing, product search, shopping cart interaction, and a clean e-commerce user experience.",
    problem:
      "Designed as a frontend learning project to explore e-commerce layouts, responsive interfaces, and user interaction patterns.",
    features: [
      "Book catalog",
      "Search interface",
      "Book details",
      "Shopping cart UI",
      "Responsive design",
      "Category browsing",
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    frontend: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    role: "Frontend Developer",
    githubUrl: "https://github.com/pathakpk7/Online_Book_Store.git",
    screenshot: "/projects/online-book-store/thumbnail.png",
    screenshots: [
      "/projects/online-book-store/home.png",
      "/projects/online-book-store/cart.png",
      "/projects/online-book-store/catalog.png",
      "/projects/online-book-store/details.png",
    ],
    roadmap: [
      "Backend integration",
      "User authentication",
      "Wishlist",
      "Order management",
      "Payment gateway",
    ],
  },

  // 15. ___________________________________________SPOTIFY CLONE__________________________________
  {
    id: "spotify-clone",
    name: "Spotify Clone",
    featured: false,
    status: "Frontend Prototype",
    category: "Frontend",
    tagline:
      "Spotify-inspired Music Streaming Interface",
    overview:
      "A frontend recreation of Spotify's modern user interface built to practice responsive layouts, component-based architecture, and contemporary music application design. The project focuses on UI implementation rather than streaming functionality.",
    problem:
      "The project was developed to strengthen frontend development skills by recreating the interface of a widely used music streaming platform.",
    features: [
      "Spotify-inspired UI",
      "Responsive design",
      "Sidebar navigation",
      "Playlist interface",
      "Music player layout",
      "Modern component design",
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    frontend: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    role: "Frontend Developer",
    githubUrl: "https://github.com/pathakpk7/Spotify_clone.git",
    screenshot: "/projects/spotify-clone/thumbnail.png",
    screenshots: [
      "/projects/spotify-clone/home.png",
      "/projects/spotify-clone/player.png",
      "/projects/spotify-clone/playlist.png",
      "/projects/spotify-clone/search.png",
    ],
    roadmap: [
      "Spotify API integration",
      "Authentication",
      "Music playback",
      "Playlist management",
      "Search functionality",
    ],
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

export const getFeaturedProjects = () => {
  return projects.filter(
    (project) => project.featured
  )
}

export const getNonFeaturedProjects = () => {
  return projects.filter(
    (project) => !project.featured
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
