"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"

// Simple floating particles with luxury motion
const FloatingParticles = React.memo(function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  // Pre-defined particle positions - completely deterministic
  // Reduced from 150 to 50 particles for better performance
  const positions = React.useMemo(() => {
    const pos = new Float32Array(50 * 3)
    let index = 0
    for (let x = -5; x <= 5; x += 2) {
      for (let y = -5; y <= 5; y += 2) {
        for (let z = -5; z <= 5; z += 2) {
          if (index < 50 * 3) {
            pos[index] = x + 0.1
            pos[index + 1] = y + 0.1
            pos[index + 2] = z + 0.1
            index += 3
          }
        }
      }
    }
    return pos
  }, [])

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={positions}
          itemSize={3}
          args={[new Float32Array(), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
})

// Simple ambient spheres
const AmbientSpheres = React.memo(function AmbientSpheres() {
  const spheresRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (spheresRef.current) {
      spheresRef.current.rotation.y = state.clock.elapsedTime * 0.01
      spheresRef.current.children.forEach((sphere, index) => {
        const child = sphere as THREE.Mesh
        child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2
      })
    }
  })

  // Reduced from 8 to 4 spheres for better performance
  const spherePositions: [number, number, number][] = [
    [-4, 2, -3], [3, -1, 4], [-2, 3, 2], [5, -2, -2]
  ]

  return (
    <group ref={spheresRef}>
      {spherePositions.map((position, index) => (
        <Float
          key={index}
          speed={1 + index * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh position={position} scale={0.2 + index * 0.05}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#3b82f6" : "#a855f7"}
              transparent
              opacity={0.1}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
})

// Cinematic depth layers
const DepthLayers = React.memo(function DepthLayers() {
  return (
    <group>
      {/* Middle layer - ambient spheres */}
      <AmbientSpheres />
      
      {/* Front layer - near particles */}
      <group position={[0, 0, 2]}>
        <FloatingParticles />
      </group>
    </group>
  )
})

// Mouse-responsive parallax
const ParallaxContainer = React.memo(function ParallaxContainer({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      const mouseX = (state.mouse.x * 0.5)
      const mouseY = (state.mouse.y * 0.5)
      
      groupRef.current.position.x = mouseX * 2
      groupRef.current.position.y = mouseY * 2
    }
  })

  return (
    <group ref={groupRef}>
      {children}
    </group>
  )
})

// Performance monitor
const PerformanceMonitor = React.memo(function PerformanceMonitor() {
  const { gl } = useThree()
  
  React.useEffect(() => {
    // Optimize for performance
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Set clear color to transparent
    gl.setClearColor(0x000000, 0)
  }, [gl])

  return null
})

interface HeroSceneProps {
  className?: string
  enableParallax?: boolean
}

const HeroScene = React.memo(React.forwardRef<HTMLDivElement, HeroSceneProps>(
  ({ className, enableParallax = false }, ref) => {
    return (
      <div ref={ref} className={cn("absolute inset-0", className)}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
          gl={{ alpha: true, antialias: false }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            {/* Performance optimization */}
            <PerformanceMonitor />
            
            {/* Premium cinematic lighting */}
            <ambientLight intensity={0.2} color="#1e293b" />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.5}
              color="#3b82f6"
            />
            <pointLight position={[-10, -10, -5]} intensity={0.3} color="#a855f7" />
            
            {/* Main 3D content */}
            {enableParallax ? (
              <ParallaxContainer>
                <DepthLayers />
              </ParallaxContainer>
            ) : (
              <DepthLayers />
            )}
            
            {/* Environment */}
            <Environment preset="night" background={false} />
          </Suspense>
        </Canvas>
      </div>
    )
  }
))
HeroScene.displayName = "HeroScene"

export { HeroScene }
