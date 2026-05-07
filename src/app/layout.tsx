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

export const metadata: Metadata = {
  title: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",
  description: "Premium portfolio showcasing expertise in cybersecurity, full stack development, AI/ML, and cloud technologies.",
  keywords: ["cybersecurity", "full stack development", "AI/ML", "cloud technologies", "portfolio"],
  authors: [{ name: "Prasoon Pathak" }],
  openGraph: {
    title: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",
    description: "Premium portfolio showcasing expertise in cybersecurity, full stack development, AI/ML, and cloud technologies.",
    url: "https://prasoonpathak.com",
    siteName: "Prasoon Pathak",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prasoon Pathak Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prasoon Pathak | Cybersecurity Expert & Full Stack Developer",
    description: "Premium portfolio showcasing expertise in cybersecurity, full stack development, AI/ML, and cloud technologies.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://prasoonpathak.com"),
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
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <PageWrapper background="cinematic" showBackground={true}>
            {/* Premium Navigation */}
            <Navbar />
            
            {/* Main Content */}
            <main className="relative z-10">
              {children}
            </main>
            
            {/* Premium Footer */}
            <Footer />
          </PageWrapper>
        </Providers>
      </body>
    </html>
  );
}
