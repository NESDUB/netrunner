import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Scene() {
  const boxRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);
  
  // Animation loop
  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 0.5;
      boxRef.current.rotation.y += delta * 0.2;
    }
    
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2;
      sphereRef.current.position.y = Math.cos(state.clock.elapsedTime) * 0.3 + 1;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
      
      {/* Objects */}
      <mesh ref={boxRef} castShadow receiveShadow position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1E88E5" roughness={0.5} metalness={0.2} />
      </mesh>
      
      <mesh ref={sphereRef} castShadow position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#E91E63" roughness={0.3} metalness={0.4} />
      </mesh>
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f5f5f5" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}
