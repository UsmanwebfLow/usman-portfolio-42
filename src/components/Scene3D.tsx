import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedSphereProps {
  scrollProgress: number;
}

function AnimatedSphere({ scrollProgress }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Complex movement based on scroll
    const t = state.clock.getElapsedTime();
    
    // Position changes based on scroll progress
    const xPos = Math.sin(scrollProgress * Math.PI * 2) * 2;
    const yPos = Math.cos(scrollProgress * Math.PI) * 1.5 - scrollProgress * 3;
    const zPos = -2 + Math.sin(scrollProgress * Math.PI) * 2;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, xPos, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, yPos, 0.05);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, zPos, 0.05);
    
    // Rotation
    meshRef.current.rotation.x = t * 0.2 + scrollProgress * Math.PI;
    meshRef.current.rotation.y = t * 0.3 + scrollProgress * Math.PI * 0.5;
    
    // Scale based on section
    const scale = 1 + Math.sin(scrollProgress * Math.PI * 3) * 0.3;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.05));
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;
  
  const positions = useRef(new Float32Array(particleCount * 3));
  
  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02 + scrollProgress * 0.5;
    pointsRef.current.rotation.x = scrollProgress * 0.3;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d4ff"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GlowRing({ scrollProgress }: { scrollProgress: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.5) * 0.2;
    ringRef.current.rotation.z = t * 0.3 + scrollProgress * Math.PI;
    
    const scale = 2 + scrollProgress * 0.5;
    ringRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -3]}>
      <torusGeometry args={[2, 0.02, 16, 100]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
    </mesh>
  );
}

interface Scene3DProps {
  scrollProgress: number;
}

export default function Scene3D({ scrollProgress }: Scene3DProps) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#00d4ff"
        />
        
        <AnimatedSphere scrollProgress={scrollProgress} />
        <ParticleField scrollProgress={scrollProgress} />
        <GlowRing scrollProgress={scrollProgress} />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
