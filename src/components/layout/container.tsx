import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "cinematic"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  centered?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", padding = "md", centered = false, ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      "2xl": "max-w-8xl",
      full: "max-w-full",
      cinematic: "max-w-9xl",
    }

    const paddingClasses = {
      none: "px-0",
      sm: "px-4 sm:px-6",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
      xl: "px-8 sm:px-12 lg:px-16",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          centered && "mx-auto",
          !centered && "ml-auto mr-auto",
          sizeClasses[size],
          paddingClasses[padding],
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }
