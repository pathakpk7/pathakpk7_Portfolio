"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
  fallback?: React.ReactNode
}

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ 
    src, 
    alt, 
    width, 
    height, 
    className, 
    priority = false, 
    quality = 75, 
    placeholder = "blur", 
    blurDataURL,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    fill = false,
    style,
    onLoad,
    onError,
    fallback,
    ...props 
  }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)

    const handleLoad = () => {
      setIsLoading(false)
      onLoad?.()
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      onError?.()
    }

    // Generate blur data URL for placeholder
    const generateBlurDataURL = (width: number, height: number) => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#1a1a1a'
        ctx.fillRect(0, 0, width, height)
        return canvas.toDataURL()
      }
      return undefined
    }

    const defaultBlurDataURL = blurDataURL || generateBlurDataURL(32, 32)

    if (hasError && fallback) {
      return <>{fallback}</>
    }

    return (
      <div className={cn("relative overflow-hidden", className)} style={style}>
        <Image
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          sizes={sizes}
          className={cn(
            "transition-all duration-500 ease-out",
            isLoading ? "scale-110 blur-2xl opacity-0" : "scale-100 blur-0 opacity-100"
          )}
          onLoadingComplete={handleLoad}
          onError={handleError}
          {...(fill ? {} : { width, height })}
          {...props}
        />
        
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-muted/20 animate-pulse rounded-lg" />
        )}
      </div>
    )
  }
)

OptimizedImage.displayName = "OptimizedImage"

// Lazy loaded image component for below-the-fold content
export const LazyImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <OptimizedImage
          ref={ref}
          {...props}
          className={cn("transition-all duration-700 ease-out", className)}
        />
      </div>
    )
  }
)

LazyImage.displayName = "LazyImage"

// Profile image component with specific optimizations
export const ProfileImage = React.forwardRef<HTMLImageElement, {
  src: string
  alt: string
  size?: number
  className?: string
}>(({ src, alt, size = 120, className }, ref) => {
  return (
    <OptimizedImage
      ref={ref}
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={true}
      quality={90}
      className={cn("rounded-full object-cover", className)}
      sizes={`${size}px`}
      style={{
        width: size,
        height: size,
      }}
    />
  )
})

ProfileImage.displayName = "ProfileImage"

// Project thumbnail component
export const ProjectThumbnail = React.forwardRef<HTMLImageElement, {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}>(({ src, alt, width = 400, height = 250, className }, ref) => {
  return (
    <OptimizedImage
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={false}
      quality={80}
      className={cn("rounded-xl object-cover", className)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
    />
  )
})

ProjectThumbnail.displayName = "ProjectThumbnail"

// Hero image component with highest priority
export const HeroImage = React.forwardRef<HTMLImageElement, {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}>(({ src, alt, width = 1920, height = 1080, className }, ref) => {
  return (
    <OptimizedImage
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={true}
      quality={85}
      className={cn("object-cover", className)}
      sizes="100vw"
    />
  )
})

HeroImage.displayName = "HeroImage"
