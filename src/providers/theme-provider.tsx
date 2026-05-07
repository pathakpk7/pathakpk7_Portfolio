"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

export function CustomThemeProvider({ children, ...props }: React.ComponentPropsWithoutRef<typeof ThemeProvider>) {
  return (
    <ThemeProvider {...props} suppressHydrationWarning>
      {children}
    </ThemeProvider>
  )
}
