import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Scene() {
  const sphere1Ref = useRef<Mesh>(null);
  const sphere2Ref = useRef<Mesh>(null);
  const sphere3Ref = useRef<Mesh>(null);
  
  // Simplified animation with more subtle, controlled movement
  useFrame((state) => {
    // Very subtle rotation only, no positional changes
    if (sphere1Ref.current) {
      sphere1Ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    if (sphere2Ref.current) {
      sphere2Ref.current.rotation.y = state.clock.elapsedTime * 0.07;
    }
    
    if (sphere3Ref.current) {
      sphere3Ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      {/* Clean, soft lighting for matte finish */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 10]} intensity={0.6} />
      
      {/* Proportional spheres with Golden Ratio relationship */}
      <mesh ref={sphere1Ref} position={[-2.618, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#000000" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh ref={sphere2Ref} position={[0, 0, 0]}>
        <sphereGeometry args={[1.618, 64, 64]} />
        <meshStandardMaterial 
          color="#000000" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      <mesh ref={sphere3Ref} position={[2.618, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#000000" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
    </>
  );
}