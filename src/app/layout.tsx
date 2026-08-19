import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Navbar, Footer, PageWrapper } from "@/components/layout";

// Premium font pairing for luxury typography
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://prasoonpathak7.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",
    template: "%s | Prasoon Pathak",
  },

  description:
    "Prasoon Pathak is a Cybersecurity Enthusiast and Full Stack Developer building modern web applications, AI/ML systems, cybersecurity solutions, and cloud technologies.",

  keywords: [
    "Prasoon Pathak",
    "Prasoon Pathak portfolio",
    "Cybersecurity Expert",
    "Cybersecurity Developer",
    "Full Stack Developer",
    "Full Stack Web Developer",
    "AI/ML Developer",
    "Software Developer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Java Developer",
    "Cloud Developer",
    "Cybersecurity",
    "Artificial Intelligence",
    "Machine Learning",
    "Portfolio",
  ],

  authors: [
    {
      name: "Prasoon Pathak",
      url: siteUrl,
    },
  ],

  creator: "Prasoon Pathak",
  publisher: "Prasoon Pathak",

  applicationName: "Prasoon Pathak Portfolio",

  category: "technology",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Prasoon Pathak",

    title: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",

    description:
      "Explore the portfolio of Prasoon Pathak — Cybersecurity Expert and Full Stack Developer building modern web applications, AI/ML systems, cybersecurity solutions, and cloud technologies.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prasoon Pathak — Cybersecurity Expert & Full Stack Developer",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",

    description:
      "Cybersecurity Expert and Full Stack Developer building modern web applications, AI/ML systems, cybersecurity solutions, and cloud technologies.",

    images: ["/og-image.jpg"],
    creator: "@panditpk7",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <Providers>
          <PageWrapper>
            {/* Premium Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="relative z-10">{children}</main>

            {/* Premium Footer */}
            <Footer />
          </PageWrapper>
        </Providers>
      </body>
    </html>
  );
}