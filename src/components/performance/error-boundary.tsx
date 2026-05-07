"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  className?: string
}

// Error Boundary Component
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error} 
          reset={this.reset}
          className={this.props.className}
        />
      )
    }

    return this.props.children
  }
}

// Default error fallback component
const DefaultErrorFallback = React.forwardRef<HTMLDivElement, {
  error?: Error
  reset: () => void
  className?: string
}>(({ error, reset, className }, ref) => {
  return (
    <div 
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] p-8 rounded-2xl border border-border/20 bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground">
          Something went wrong
        </h3>
        
        <p className="text-sm text-muted-foreground max-w-md">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
})

DefaultErrorFallback.displayName = "DefaultErrorFallback"

// Async Error Boundary for promises
export const AsyncErrorBoundary = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
  onError?: (error: Error) => void
  className?: string
}>(({ children, fallback, onError, className }, ref) => {
  const [error, setError] = React.useState<Error | null>(null)

  const reset = () => {
    setError(null)
  }

  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = new Error(event.reason)
      setError(error)
      onError?.(error)
      event.preventDefault()
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection)
  }, [onError])

  if (error) {
    const FallbackComponent = fallback || DefaultErrorFallback
    return (
      <FallbackComponent 
        error={error} 
        reset={reset}
        className={className}
      />
    )
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
})

AsyncErrorBoundary.displayName = "AsyncErrorBoundary"

// Image error boundary
export const ImageErrorBoundary = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error) => void
  className?: string
}>(({ children, fallback, onError, className }, ref) => {
  const [hasError, setHasError] = React.useState(false)

  const handleError = (error: Error) => {
    setHasError(true)
    onError?.(error)
  }

  if (hasError) {
    const fallbackContent = fallback || (
      <div className="w-full h-full bg-muted/20 rounded-lg flex items-center justify-center">
        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
    
    return (
      <div ref={ref} className={className}>
        {fallbackContent}
      </div>
    )
  }

  return (
    <ErrorBoundary
      fallback={DefaultErrorFallback}
      onError={handleError}
      className={className}
    >
      {children}
    </ErrorBoundary>
  )
})

ImageErrorBoundary.displayName = "ImageErrorBoundary"

// Animation error boundary
export const AnimationErrorBoundary = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error) => void
  className?: string
}>(({ children, fallback, onError, className }, ref) => {
  const [hasError, setHasError] = React.useState(false)

  const handleError = (error: Error) => {
    setHasError(true)
    onError?.(error)
  }

  if (hasError) {
    const fallbackContent = fallback || (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
    
    return fallbackContent
  }

  return (
    <ErrorBoundary
      fallback={DefaultErrorFallback}
      onError={handleError}
      className={className}
    >
      {children}
    </ErrorBoundary>
  )
})

AnimationErrorBoundary.displayName = "AnimationErrorBoundary"

// Network error boundary
export const NetworkErrorBoundary = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode
  fallback?: React.ReactNode
  retryCount?: number
  onRetry?: () => void
  className?: string
}>(({ children, fallback, retryCount = 3, onRetry, className }, ref) => {
  const [error, setError] = React.useState<Error | null>(null)
  const [retries, setRetries] = React.useState(0)

  const handleRetry = () => {
    if (retries < retryCount) {
      setRetries(retries + 1)
      setError(null)
      onRetry?.()
    }
  }

  const handleError = (error: Error) => {
    setError(error)
  }

  if (error) {
    const fallbackContent = fallback || (
      <div 
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center min-h-[200px] p-8 rounded-2xl border border-border/20 bg-background/80 backdrop-blur-sm",
          className
        )}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground">
            Network Error
          </h3>
          
          <p className="text-sm text-muted-foreground max-w-md">
            {error.message || "Unable to connect. Please check your internet connection."}
          </p>
          
          {retries < retryCount && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Retry ({retryCount - retries} attempts left)
            </button>
          )}
        </div>
      </div>
    )
    
    return fallbackContent
  }

  return (
    <ErrorBoundary
      fallback={DefaultErrorFallback}
      onError={handleError}
      className={className}
    >
      {children}
    </ErrorBoundary>
  )
})

NetworkErrorBoundary.displayName = "NetworkErrorBoundary"

// Error monitoring hook
export const useErrorMonitoring = () => {
  const [errors, setErrors] = React.useState<Array<{ error: Error; timestamp: number }>>([])

  const addError = React.useCallback((error: Error) => {
    const timestamp = Date.now()
    setErrors(prev => [...prev, { error, timestamp }])
    
    // Log to monitoring service
    console.error('Error monitored:', error)
    
    // Clean old errors (keep last 10)
    setTimeout(() => {
      setErrors(prev => prev.slice(-10))
    }, 1000)
  }, [])

  const clearErrors = React.useCallback(() => {
    setErrors([])
  }, [])

  return {
    errors,
    addError,
    clearErrors,
    hasErrors: errors.length > 0
  }
}
