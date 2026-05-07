// Performance Optimization + Production Stability Components

// Image optimization system
export { 
  OptimizedImage, 
  LazyImage, 
  ProfileImage, 
  ProjectThumbnail, 
  HeroImage 
} from './optimized-image'

// Three.js performance optimization
export { 
  OptimizedScene, 
  LazyThreeScene, 
  OptimizedParticles, 
  OptimizedGeometry,
  useThreePerformance 
} from './optimized-three-scene'

// Animation performance optimization
export { 
  PerformanceOptimizedMotion, 
  GPUTransform, 
  SafeHover, 
  ThrottledAnimation, 
  useAnimationPerformance,
  OptimizedStagger,
  LazyAnimationTrigger 
} from './performance-optimized-motion'

// SEO optimization system
export { 
  SEOHead, 
  generateMetadata, 
  StructuredData, 
  ProjectStructuredData, 
  BlogPostStructuredData, 
  BreadcrumbStructuredData 
} from './seo-optimization'

// Error handling and stability layer
export { 
  ErrorBoundary, 
  AsyncErrorBoundary, 
  ImageErrorBoundary, 
  AnimationErrorBoundary, 
  NetworkErrorBoundary,
  useErrorMonitoring 
} from './error-boundary'
