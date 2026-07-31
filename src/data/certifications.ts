import {
  BrainCircuit,
  Cloud,
  Database,
  MonitorSmartphone,
} from "lucide-react"
import { LucideIcon } from "lucide-react"


export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credentialId?: string
  description: string
  skills: string[]
  credentialUrl?: string
  icon: LucideIcon

  level?: string
  duration?: string
  credits?: string
  score?: string
}

export const certifications: Certification[] = [
  {
    id: "mongodb-document-model",
    title: "MongoDB and the Document Model",
    issuer: "MongoDB",
    date: "Jul 2026",
    credentialId: "MDBc43qbaf5q7",
    description:
      "Completed MongoDB and the Document Model certification, gaining practical knowledge of document-oriented databases, BSON documents, collections, CRUD operations, and NoSQL database design.",
    skills: [
      "MongoDB",
      "NoSQL",
      "Document Model",
      "CRUD Operations",
      "BSON",
    ],
    icon: Database,
  },

  {
    id: "mongodb-atlas",
    title: "Getting Started with MongoDB Atlas",
    issuer: "MongoDB",
    date: "Jul 2026",
    credentialId: "MDBolrl76t7bc",
    description:
      "Completed MongoDB Atlas training covering cloud database deployment, cluster creation, secure connectivity, user management, and Atlas administration.",
    skills: [
      "MongoDB Atlas",
      "Cloud Database",
      "Database Deployment",
      "Cluster Management",
    ],
    icon: Database,
  },

  {
    id: "deloitte-data-analytics",
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Deloitte × Forage",
    date: "Jul 2026",
    credentialId: "GNdgpChEtnHnho67r",
    description:
      "Completed Deloitte's Data Analytics Job Simulation involving business data analysis, dashboard creation, Excel modelling, Tableau visualizations, equality score analysis, and forensic technology concepts.",
    skills: [
      "Microsoft Excel",
      "Tableau",
      "Data Analytics",
      "Business Intelligence",
      "Data Visualization",
    ],
    credentialUrl:
      "https://www.theforage.com/",
    icon: MonitorSmartphone,
  },

  {
    id: "oracle-database-foundations",
    title: "Databases for Developers: Foundations",
    issuer: "Oracle",
    date: "Jul 2026",
    score: "97%",
    description:
      "Successfully completed Oracle's Database Foundations course with a score of 97%, covering SQL, relational database design, normalization, DDL, DML, joins, constraints, aggregate functions, and transaction management.",
    skills: [
      "SQL",
      "Oracle Database",
      "Database Design",
      "Normalization",
      "Relational Databases",
    ],
    icon: Database,
  },

  {
    id: "microsoft-ai-security",
    title: "Fundamentals of AI Security",
    issuer: "Microsoft Learn",
    date: "Jul 2026",
    description:
      "Completed Microsoft's Fundamentals of AI Security learning path covering AI security risks, responsible AI, threat mitigation, securing AI applications, and protecting intelligent systems against emerging cyber threats.",
    skills: [
      "Artificial Intelligence",
      "AI Security",
      "Cybersecurity",
      "Responsible AI",
    ],
    icon: BrainCircuit,
  },

  {
    id: "github-actions",
    title: "Automate Development Tasks by Using GitHub Actions",
    issuer: "Microsoft Learn",
    date: "Jul 2026",
    description:
      "Completed Microsoft's GitHub Actions course covering workflow automation, Continuous Integration, Continuous Deployment (CI/CD), build pipelines, testing automation, and DevOps best practices.",
    skills: [
      "GitHub Actions",
      "CI/CD",
      "Automation",
      "DevOps",
    ],
    icon: Cloud,
  },

  {
    id: "cisco-introduction-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Jul 2026",
    credentialId: "ae3d5d66-c36f-4661-a0bb-03e146d64f59",
    description:
      "Completed Cisco Networking Academy's Introduction to Cybersecurity course, learning cybersecurity fundamentals including the CIA Triad, malware, vulnerabilities, network security, cyber defense, privacy, and security best practices.",
    skills: [
      "Cybersecurity",
      "Network Security",
      "Threat Analysis",
      "Access Control",
      "Cyber Defense",
    ],
    icon: Cloud,
  },

  {
    id: "cisco-packet-tracer",
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Jul 2026",
    credentialId: "b2f600e7-0c5f-4aa8-b9b4-1b57e57c48bf",
    description:
      "Completed Cisco Networking Academy's Packet Tracer course, developing practical skills in network simulation, topology design, routing, switching, device configuration, and virtual networking environments.",
    skills: [
      "Cisco Packet Tracer",
      "Computer Networking",
      "Routing",
      "Switching",
      "Network Simulation",
    ],
    icon: Cloud,
  },
    {
    id: "aws-solutions-architecture",
    title: "AWS Solutions Architecture Job Simulation",
    issuer: "AWS × Forage",
    date: "Jan 2026",
    credentialId: "GNdgpChEtnHnho67r",
    description:
      "Completed the AWS Solutions Architecture Job Simulation, designing scalable cloud infrastructure, evaluating hosting strategies, optimizing cloud costs, and recommending architecture solutions for business requirements.",
    skills: [
      "Amazon Web Services",
      "Cloud Computing",
      "Solution Architecture",
      "Cloud Cost Management",
      "System Design",
    ],
    credentialUrl:
      "https://www.theforage.com/",
    icon: Cloud,
  },

  {
    id: "cpps",
    title: "Certified Phishing Prevention Specialist (CPPS)",
    issuer: "Hack & Fix",
    date: "Dec 2025",
    credentialId: "7527-9509-6062-7605",
    description:
      "Earned the Certified Phishing Prevention Specialist credential with practical knowledge of phishing attacks, email security, social engineering techniques, threat awareness, and organizational cyber defense strategies.",
    skills: [
      "Cybersecurity",
      "Phishing Prevention",
      "Security Awareness",
      "Social Engineering",
      "Email Security",
    ],
    icon: BrainCircuit,
  },

  {
    id: "microsoft-soar",
    title: "SOAR – AI to Aspire",
    issuer: "Microsoft × Skill India",
    date: "Nov 2025",
    credentialId: "2025090245651375-172634",
    level: "NSQF Level 4",
    duration: "15 Hours",
    credits: "0.5",
    description:
      "Successfully completed Microsoft's SOAR – AI to Aspire program focused on Artificial Intelligence, Generative AI, Responsible AI, and practical AI applications. The certification is recognized by NCVET under Skill India.",
    skills: [
      "Artificial Intelligence",
      "Generative AI",
      "Responsible AI",
      "AI Applications",
    ],
    icon: BrainCircuit,
  },

  {
    id: "ibm-generative-ai",
    title: "IBM Generative AI Virtual Internship",
    issuer: "IBM Developer Skills Network",
    date: "Sep 2025",
    credentialId: "df3cf03090654c00bc62355321ca720d",
    description:
      "Completed IBM's Generative AI Virtual Internship with hands-on experience in Large Language Models, Prompt Engineering, AI workflows, Responsible AI principles, and enterprise Generative AI applications.",
    skills: [
      "Generative AI",
      "Prompt Engineering",
      "Large Language Models",
      "Artificial Intelligence",
      "AI Workflows",
    ],
    credentialUrl:
      "https://courses.ibmmooc.skillsnetwork.site/certificates/df3cf03090654c00bc62355321ca720d",
    icon: BrainCircuit,
  },
    {
    id: "digital-application-fundamentals",
    title: "Digital Application Fundamentals (STEM)",
    issuer: "NASSCOM FutureSkills Prime",
    date: "Sep 2025",
    credentialId: "32914-1e19031a-8bc3-11f0-bdec-005056b48b54",
    description:
      "Completed the Digital Application Fundamentals (STEM) certification aligned with competency standards developed by the IT-ITeS Sector Skills Council (NASSCOM). The program covered digital technologies, STEM applications, productivity tools, digital literacy, and modern IT fundamentals.",
    skills: [
      "Information Technology",
      "Digital Literacy",
      "STEM",
      "Digital Technologies",
      "Productivity Tools",
    ],
    credentialUrl:
      "https://www.futureskillsprime.in/iDH/user/credential/view/32914-1e19031a-8bc3-11f0-bdec-005056b48b54",
    icon: MonitorSmartphone,
  },

  {
    id: "gemini-google-workspace",
    title: "Gemini for Google Workspace",
    issuer: "Google Cloud × Simplilearn SkillUP",
    date: "Aug 2025",
    credentialId: "8891190",
    description:
      "Completed the Gemini for Google Workspace program, gaining practical experience using Gemini AI across Google Docs, Sheets, Slides, Gmail, and Workspace productivity tools to improve collaboration and AI-assisted workflows.",
    skills: [
      "Gemini AI",
      "Google Workspace",
      "Artificial Intelligence",
      "Google Docs",
      "Google Sheets",
    ],
    icon: BrainCircuit,
  },
]
