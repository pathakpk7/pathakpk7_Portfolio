"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"

// Background mesh component
function BackgroundMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial
        color="#0f172a"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

interface BackgroundCanvasProps {
  className?: string
  intensity?: number
}

const BackgroundCanvas = React.forwardRef<HTMLDivElement, BackgroundCanvasProps>(
  ({ className, intensity = 0.3 }, ref) => {
    return (
      <div ref={ref} className={cn("absolute inset-0", className)}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          className="w-full h-full"
        >
          {/* Ambient lighting */}
          <ambientLight intensity={intensity} />
          
          {/* Background mesh */}
          <Suspense fallback={null}>
            <BackgroundMesh />
          </Suspense>
          
          {/* Environment for reflections */}
          <Environment preset="night" />
        </Canvas>
      </div>
    )
  }
)
BackgroundCanvas.displayName = "BackgroundCanvas"

export { BackgroundCanvas }
