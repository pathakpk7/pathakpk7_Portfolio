"use client"

import { CustomThemeProvider } from "./theme-provider"
import { SmoothScrollProvider } from "./smooth-scroll-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CustomThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    </CustomThemeProvider>
  )
}
