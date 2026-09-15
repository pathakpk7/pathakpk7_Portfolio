export interface BlogPost {
  id: string
  title: string
  subtitle?: string
  description: string
  category: string
  readTime: string
  date: string
  image: string
  url: string
  featured?: boolean
  tags?: string[]
}

export const BLOG_CONFIG = {
  blogUrl: "https://pathakpk7blog.vercel.app",
  blogName: "ThePathak.tech",
  sectionTitle: "WHAT I DO WHEN I DON'T CODE",
  sectionQuote: "Because building isn't the only way I like to create.",
  sectionDescription: "Ideas, stories, experiments & things I find interesting.",
  ctaHeading: "Want to read more?",
  ctaDescription:
    "Explore in-depth technical breakdowns, creative essays, system architecture discussions, and unfiltered thoughts on my independent editorial blog.",
  ctaButtonText: "View My Blogs →",
}

export const curatedBlogPosts: BlogPost[] = [
  {
    id: "the-ai-race-how-fast-is-too-fast",
    title:
      "The AI Race Has Reached an Uncomfortable Question: How Fast Is Too Fast?",
    description:
      "Some of the people building frontier AI are now asking the industry to slow down. That doesn't mean AI development is stopping. It reveals something more interesting: the technology is advancing faster than our ability to decide how it should be controlled.",
    category: "Technology",
    readTime: "3 min read",
    date: "Sep 15, 2026",
    image:
      "https://images.unsplash.com/photo-1782330301061-8c4d49c13fcb?auto=format&fit=crop&w=1600&q=85",
    url: "https://pathakpk7blog.vercel.app/article/the-ai-race-has-reached-an-uncomfortable-question-how-fast-is-too-fast",
    featured: true,
    tags: ["AI Safety", "Frontier AI", "Governance"],
  },
  {
    id: "i-stopped-asking-ai-to-write-my-code",
    title:
      "I Stopped Asking AI to Write My Code — This Workflow Worked Better",
    description:
      "AI can write code faster than most beginners. That doesn't mean you should let it write everything. A better workflow is to make AI handle repetition while you keep control of the decisions.",
    category: "Coding",
    readTime: "3 min read",
    date: "Sep 12, 2026",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85",
    url: "https://pathakpk7blog.vercel.app/article/i-stopped-asking-ai-to-write-my-code-this-workflow-worked-better",
    featured: true,
    tags: ["Developer Workflow", "AI Coding", "Engineering"],
  },
  {
    id: "apna-dharm-nibhana-padta-hai",
    title: "अपना धर्म निभाना पड़ता है",
    description:
      "ज़िंदगी की राह आसान हो, यह ज़रूरी नहीं। ज़रूरी यह है कि कठिन राह पर भी कदम बढ़ाने का साहस बना रहे। कठिन राहों पर चलने के लिए मंज़िल से पहले हौसले की ज़रूरत होती है।",
    category: "Creative",
    readTime: "2 min read",
    date: "Sep 14, 2026",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
    url: "https://pathakpk7blog.vercel.app/article/apna-dharm-nibhana-padta-hai",
    featured: true,
    tags: ["Hindi Literature", "Philosophy", "Essays"],
  },
]
