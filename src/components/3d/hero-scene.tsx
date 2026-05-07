"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"

// Simple floating particles with luxury motion
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  // Pre-defined particle positions - completely deterministic
  const positions = React.useMemo(() => {
    const pos = new Float32Array(150 * 3)
    let index = 0
    for (let x = -7; x <= 7; x += 2) {
      for (let y = -7; y <= 7; y += 2) {
        for (let z = -7; z <= 7; z += 2) {
          if (index < 150 * 3) {
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
          count={150}
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
}

// Simple ambient spheres
function AmbientSpheres() {
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

  // Pre-defined sphere positions
  const spherePositions: [number, number, number][] = [
    [-4, 2, -3], [3, -1, 4], [-2, 3, 2], [5, -2, -2],
    [-3, -3, 3], [2, 4, -4], [-5, 1, 1], [4, -4, -1]
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
}

// Cinematic depth layers
function DepthLayers() {
  return (
    <group>
      {/* Back layer - distant particles */}
      <group position={[0, 0, -5]}>
        <FloatingParticles />
      </group>
      
      {/* Middle layer - ambient spheres */}
      <AmbientSpheres />
      
      {/* Front layer - near particles */}
      <group position={[0, 0, 2]}>
        <FloatingParticles />
      </group>
    </group>
  )
}

// Mouse-responsive parallax
function ParallaxContainer({ children }: { children: React.ReactNode }) {
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
}

// Performance monitor
function PerformanceMonitor() {
  const { gl } = useThree()
  
  React.useEffect(() => {
    // Optimize for performance
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Set clear color to transparent
    gl.setClearColor(0x000000, 0)
  }, [gl])

  return null
}

interface HeroSceneProps {
  className?: string
  enableParallax?: boolean
}

const HeroScene = React.forwardRef<HTMLDivElement, HeroSceneProps>(
  ({ className, enableParallax = true }, ref) => {
    return (
      <div ref={ref} className={cn("absolute inset-0", className)}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
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
)
HeroScene.displayName = "HeroScene"

export { HeroScene }
