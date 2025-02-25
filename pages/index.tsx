import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Scene from "@/components/3d/Scene";
import Layout from "@/components/layouts/MainLayout";
import styles from "@/styles/Home.module.css";
import { useCallback, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleCanvasCreated = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Next.js 3D Starter</title>
        <meta name="description" content="Next.js 3D application with Three.js" />
      </Head>
      
      <section className={styles.hero}>
        <h1 className={styles.title}>Next.js 3D Starter</h1>
        <p className={styles.description}>
          Modern 3D-enabled website with React and Three.js
        </p>
      </section>
      
      <div className={styles.canvas}>
        {isLoading && <div className={styles.loader}>Loading 3D Scene...</div>}
        <Canvas onCreated={handleCanvasCreated} shadows>
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <Scene />
          <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
      </div>
    </Layout>
  );
}
