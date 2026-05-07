"use client"

import * as React from "react"

interface MousePosition {
  x: number
  y: number
  clientX: number
  clientY: number
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = React.useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0
  })

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.pageX,
        y: event.pageY,
        clientX: event.clientX,
        clientY: event.clientY
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return mousePosition
}
