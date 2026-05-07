import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "8rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Premium Dark Theme Color System
      colors: {
        // Base dark theme colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Premium neutral palette
        slate: {
          50: "hsl(210, 40%, 98%)",
          100: "hsl(210, 40%, 96%)",
          150: "hsl(210, 30%, 93%)",
          200: "hsl(210, 30%, 88%)",
          250: "hsl(210, 25%, 83%)",
          300: "hsl(210, 25%, 78%)",
          350: "hsl(210, 20%, 73%)",
          400: "hsl(210, 20%, 63%)",
          450: "hsl(210, 18%, 53%)",
          500: "hsl(210, 18%, 43%)",
          550: "hsl(210, 16%, 33%)",
          600: "hsl(210, 16%, 23%)",
          650: "hsl(210, 15%, 18%)",
          700: "hsl(210, 15%, 13%)",
          750: "hsl(210, 12%, 10%)",
          800: "hsl(210, 12%, 8%)",
          850: "hsl(210, 10%, 6%)",
          900: "hsl(210, 10%, 4%)",
          950: "hsl(210, 8%, 2%)",
        },
        
        // Cyber accent colors
        cyber: {
          blue: {
            50: "hsl(200, 90%, 97%)",
            100: "hsl(200, 85%, 94%)",
            200: "hsl(200, 80%, 88%)",
            300: "hsl(200, 75%, 82%)",
            400: "hsl(200, 70%, 70%)",
            500: "hsl(200, 65%, 55%)",
            600: "hsl(200, 60%, 45%)",
            700: "hsl(200, 55%, 35%)",
            800: "hsl(200, 50%, 25%)",
            900: "hsl(200, 45%, 15%)",
            950: "hsl(200, 40%, 8%)",
          },
          cyan: {
            50: "hsl(185, 90%, 97%)",
            100: "hsl(185, 85%, 94%)",
            200: "hsl(185, 80%, 88%)",
            300: "hsl(185, 75%, 82%)",
            400: "hsl(185, 70%, 70%)",
            500: "hsl(185, 65%, 55%)",
            600: "hsl(185, 60%, 45%)",
            700: "hsl(185, 55%, 35%)",
            800: "hsl(185, 50%, 25%)",
            900: "hsl(185, 45%, 15%)",
            950: "hsl(185, 40%, 8%)",
          },
          purple: {
            50: "hsl(260, 90%, 97%)",
            100: "hsl(260, 85%, 94%)",
            200: "hsl(260, 80%, 88%)",
            300: "hsl(260, 75%, 82%)",
            400: "hsl(260, 70%, 70%)",
            500: "hsl(260, 65%, 55%)",
            600: "hsl(260, 60%, 45%)",
            700: "hsl(260, 55%, 35%)",
            800: "hsl(260, 50%, 25%)",
            900: "hsl(260, 45%, 15%)",
            950: "hsl(260, 40%, 8%)",
          },
        },
        
        // Semantic colors for components
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      
      // Premium typography system
      fontFamily: {
        // Luxury font pairing
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        
        // Fallbacks
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      
      // Enhanced font sizes for luxury typography
      fontSize: {
        "xs": ["0.75rem", { lineHeight: "1rem" }],
        "sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "base": ["1rem", { lineHeight: "1.5rem" }],
        "lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
        "display": ["10rem", { lineHeight: "1" }],
      },
      
      // Premium spacing system
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },
      
      // Luxury border radius system
      borderRadius: {
        "none": "0",
        "xs": "0.125rem",
        "sm": "0.25rem",
        "DEFAULT": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "full": "9999px",
      },
      
      // Premium shadow system for cinematic depth
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "large": "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 25px -5px rgba(0, 0, 0, 0.1)",
        "xlarge": "0 20px 60px -15px rgba(0, 0, 0, 0.2), 0 10px 40px -10px rgba(0, 0, 0, 0.15)",
        "xxlarge": "0 25px 80px -20px rgba(0, 0, 0, 0.25), 0 20px 60px -15px rgba(0, 0, 0, 0.2)",
        
        // Cyber glow shadows
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)",
        "glow-purple": "0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)",
        
        // Inner shadows for depth
        "inner-soft": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "inner-medium": "inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)",
        "inner-large": "inset 0 8px 16px 0 rgba(0, 0, 0, 0.15)",
        
        // Cinematic shadows
        "cinematic": "0 0 100px -20px rgba(0, 0, 0, 0.3), 0 0 40px -10px rgba(0, 0, 0, 0.2)",
        "cinematic-blue": "0 0 60px -15px rgba(59, 130, 246, 0.4), 0 0 120px -30px rgba(59, 130, 246, 0.2)",
      },
      
      // Premium blur system
      backdropBlur: {
        "xs": "2px",
        "sm": "4px",
        "DEFAULT": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      
      // Premium animation system
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      
      // Premium transition system
      transitionProperty: {
        "colors": "color, background-color, border-color, text-decoration-color, fill, stroke",
        "opacity": "opacity",
        "shadow": "box-shadow",
        "transform": "transform",
        "size": "width, height, max-width, max-height, min-width, min-height",
        "position": "left, right, top, bottom",
        "font": "font-size, font-weight, line-height",
      },
      
      transitionDuration: {
        "DEFAULT": "300ms",
        "fast": "150ms",
        "slow": "600ms",
        "slower": "900ms",
      },
      
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "premium-in": "cubic-bezier(0.4, 0, 1, 1)",
        "premium-out": "cubic-bezier(0, 0, 0.2, 1)",
        "premium-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      
      // Premium gradients
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-cyber": "linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(147, 51, 234) 100%)",
        "gradient-cyber-alt": "linear-gradient(135deg, rgb(6, 182, 212) 0%, rgb(59, 130, 246) 100%)",
        "gradient-dark": "linear-gradient(135deg, rgb(17, 24, 39) 0%, rgb(0, 0, 0) 100%)",
        "gradient-subtle": "linear-gradient(135deg, rgb(31, 41, 55) 0%, rgb(17, 24, 39) 100%)",
      },
    },
  },
  plugins: [],
}

export default config
