"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PerformanceMonitor } from "@react-three/drei"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

interface OptimizedSceneProps {
  children: React.ReactNode
  className?: string
  cameraPosition?: [number, number, number]
  enablePerformanceMonitor?: boolean
  maxFPS?: number
}

// Performance monitoring component
const SceneMonitor = ({ maxFPS = 60 }: { maxFPS?: number }) => {
  const { isMobile, performanceMode } = useMobileOptimization()
  
  if (!performanceMode) return null
  
  return (
    <PerformanceMonitor
      onIncline={() => console.log("Performance inclining")}
      onDecline={() => console.log("Performance declining")}
      onFallback={() => console.log("Performance fallback")}
      maxFPS={maxFPS}
    />
  )
}

// Optimized floating particles
const OptimizedParticles = React.forwardRef<THREE.Group, {
  count?: number
  color?: string
  size?: number
  speed?: number
}>(({ count = 100, color = "#3b82f6", size = 0.05, speed = 1 }, ref) => {
  const { isMobile, performanceMode } = useMobileOptimization()
  const particlesRef = React.useRef<THREE.Points>(null)
  const [positions, setPositions] = React.useFloat32Array(count * 3)
  
  React.useEffect(() => {
    // Optimize particle count based on device
    const optimizedCount = isMobile ? Math.floor(count / 3) : count
    
    for (let i = 0; i < optimizedCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10
    }
  }, [count, isMobile])

  useFrame((state, delta) => {
    if (!particlesRef.current || !performanceMode) return
    
    // Throttle animation based on performance
    const time = state.clock.getElapsedTime() * speed
    const optimizedCount = isMobile ? Math.floor(count / 3) : count
    
    for (let i = 0; i < optimizedCount; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(time + i) * 0.01
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={isMobile ? Math.floor(count / 3) : count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  )
})

OptimizedParticles.displayName = "OptimizedParticles"

// Optimized ambient geometry
const OptimizedGeometry = React.forwardRef<THREE.Group, {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}>(({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }, ref) => {
  const { isMobile, performanceMode } = useMobileOptimization()
  
  // Skip complex geometry on mobile
  if (isMobile) return null
  
  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
})

OptimizedGeometry.displayName = "OptimizedGeometry"

// Main optimized scene component
export const OptimizedScene = React.forwardRef<HTMLDivElement, OptimizedSceneProps>(
  ({ 
    children, 
    className, 
    cameraPosition = [0, 0, 5], 
    enablePerformanceMonitor = true,
    maxFPS = 60 
  }, ref) => {
    const { isMobile, performanceMode } = useMobileOptimization()
    
    // Optimize render settings based on device
    const glConfig = React.useMemo(() => ({
      antialias: !isMobile,
      alpha: false,
      powerPreference: isMobile ? "low-power" : "high-performance" as const,
      precision: isMobile ? "lowp" : "highp",
    }), [isMobile])

    // Disable shadows on mobile for performance
    const shadowsConfig = React.useMemo(() => ({
      enabled: !isMobile && performanceMode,
      type: "PCFSoft" as const,
    }), [isMobile, performanceMode])

    return (
      <div ref={ref} className={cn("w-full h-full", className)}>
        <Canvas
          gl={glConfig}
          shadows={shadowsConfig.enabled}
          camera={{ position: cameraPosition, fov: isMobile ? 60 : 50 }}
          dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
          performance={{ min: 0.5, max: 1, debounce: 200 }}
          flat={isMobile}
        >
          {enablePerformanceMonitor && <SceneMonitor maxFPS={maxFPS} />}
          
          {/* Optimized lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            castShadow={shadowsConfig.enabled}
            shadow-mapSize={isMobile ? 512 : 2048}
          />
          
          {/* Performance-optimized children */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { 
                performanceMode, 
                isMobile 
              })
            }
            return child
          })}
        </Canvas>
      </div>
    )
  }
)

OptimizedScene.displayName = "OptimizedScene"

// Lazy-loaded Three.js scene wrapper
export const LazyThreeScene = React.forwardRef<HTMLDivElement, OptimizedSceneProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const elementRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px"
        }
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }, [])

    return (
      <div ref={elementRef}>
        {isVisible ? <OptimizedScene ref={ref} {...props} /> : null}
      </div>
    )
  }
)

LazyThreeScene.displayName = "LazyThreeScene"

// Hook for Three.js performance optimization
export const useThreePerformance = () => {
  const { isMobile, performanceMode } = useMobileOptimization()
  const { gl } = useThree()

  React.useEffect(() => {
    if (!gl) return

    // Optimize renderer settings
    gl.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2))
    gl.setSize(window.innerWidth, window.innerHeight)
    
    // Handle resize
    const handleResize = () => {
      gl.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [gl, isMobile])

  return { isMobile, performanceMode }
}
