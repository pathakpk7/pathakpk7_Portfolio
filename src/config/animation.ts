export const ANIMATION_PRESETS = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  
  // Stagger animations
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
} as const

export const MOTION_CONFIG = {
  // Easing functions
  ease: {
    smooth: [0.25, 0.1, 0.25, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    sharp: [0.4, 0, 0.6, 1],
    gentle: [0.25, 0.46, 0.45, 0.94]
  },
  
  // Durations
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
    verySlow: 1.2
  },
  
  // Delays
  delay: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.4,
    veryLong: 0.6
  }
} as const

export const SCROLL_TRIGGER_CONFIG = {
  // ScrollTrigger defaults
  start: "top 80%",
  end: "bottom 20%",
  scrub: 1,
  pin: false,
  markers: false,
  
  // Advanced settings
  toggleActions: "play none none reverse",
  anticipatePin: 1,
  pinSpacing: false
} as const
