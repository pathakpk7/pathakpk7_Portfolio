/* =========================================================
   ABOUT / KNOW ME DATA
   ========================================================= */

export interface AboutData {
  name: string
  role: string
  shortIntro: string
  education: string
  background: string
  focusAreas: string[]
  currentlyBuilding: string[]
  interests: string[]
  approach: string[]
}

export const aboutData: AboutData = {
  name: "Prasoon Pathak",

  role: "Computer Science Engineering Student & Developer",

  shortIntro:
    "I'm Prasoon Pathak, a Computer Science student and developer who enjoys turning ideas into practical software and continuously learning through building.",

  education:
    "Pursuing B.Tech in Computer Science Engineering at United Institute of Technology, Prayagraj.",

  background:
    "I started my engineering journey with a Diploma in Mechanical Engineering before moving into Computer Science and software development.",

  focusAreas: [
    "Full-Stack Development",
    "Artificial Intelligence",
    "Generative AI",
    "Cybersecurity",
  ],

  currentlyBuilding: [
    "Web Applications",
    "AI-powered Applications",
    "Cybersecurity Projects",
    "Developer Tools",
  ],

  interests: [
    "Software Development",
    "Artificial Intelligence",
    "Cybersecurity",
    "Problem Solving",
    "Technology",
  ],

  approach: [
    "Learn",
    "Build",
    "Experiment",
    "Improve",
  ],
}