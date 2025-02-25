import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Scene from "@/components/3d/Scene";
import RamsLayout from "@/components/layouts/RamsLayout";
import styles from "@/styles/RamsHome.module.css";
import { useCallback, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleCanvasCreated = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <RamsLayout>
      <Head>
        <title>Nesnet | 3D Next.js Framework</title>
        <meta name="description" content="Modern 3D-enabled website with React and Three.js" />
      </Head>
      
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Form Follows Function</h1>
          <p className={styles.description}>
            Less, but better – modern 3D experiences for the web with a focus on simplicity and usability.
          </p>
          <div className={styles.buttonGroup}>
            <a href="#explore" className={styles.primaryButton}>
              Explore
            </a>
            <a href="#learn" className={styles.secondaryButton}>
              Learn More
            </a>
          </div>
        </div>
      </section>
      
      <section className={styles.canvasSection} id="explore">
        <div className={styles.canvasContainer}>
          {isLoading && (
            <div className={styles.loader}>
              <div className={styles.loaderBar}></div>
            </div>
          )}
          <Canvas 
            onCreated={handleCanvasCreated} 
            shadows={false}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <Scene />
            <OrbitControls enableDamping dampingFactor={0.05} />
          </Canvas>
        </div>
      </section>
      
      <section className={styles.featuresSection} id="learn">
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" width="32" height="32">
                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            </div>
            <h3>3D Rendering</h3>
            <p>Seamless integration with Three.js and React Three Fiber for immersive 3D experiences.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" width="32" height="32">
                <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Optimal Performance</h3>
            <p>Designed with performance in mind, ensuring smooth animations and transitions.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" width="32" height="32">
                <path fill="currentColor" d="M3 3h18v18H3V3zm16 16V5H5v14h14z" />
              </svg>
            </div>
            <h3>Responsive Design</h3>
            <p>Adapts flawlessly to all screen sizes while maintaining visual integrity.</p>
          </div>
        </div>
      </section>
      
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Build Something Amazing?</h2>
          <p>Start creating your next 3D web experience with Nesnet.</p>
          <a href="/playground" className={styles.primaryButton}>
            Get Started
          </a>
        </div>
      </section>
    </RamsLayout>
  );
}