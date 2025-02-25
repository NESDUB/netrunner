import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./RamsLayout.module.css";

// Dynamically import DevTools with no SSR
const DevTools = dynamic(
  () => process.env.NODE_ENV === "development" 
    ? import("@/components/dev/DevTools") 
    : Promise.resolve(() => null),
  { ssr: false }
);

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function RamsLayout({ children }: MainLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      // Add subtle styling when not at top
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  return (
    <div className={styles.container}>
      <header 
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${hidden ? styles.hidden : ""}`}
        data-component-name="Header"
      >
        <div className={styles.headerGrid}>
          <Link href="/playground" className={styles.navItem} data-component-name="NavLink">
            Playground
          </Link>
          
          <Link href="/design" className={styles.navItem} data-component-name="NavLink">
            Design
          </Link>
          
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo} data-component-name="Logo">
              Nesnet
            </Link>
          </div>
          
          <Link href="/about" className={styles.navItem} data-component-name="NavLink">
            About
          </Link>
          
          <Link href="/contact" className={styles.navItem} data-component-name="NavLink">
            Contact
          </Link>
        </div>
      </header>
      
      <main className={styles.main} data-component-name="MainContent">
        {children}
      </main>
      
      <footer className={styles.footer} data-component-name="Footer">
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <h4>Nesnet</h4>
              <p>Modern 3D-enabled website with React and Three.js</p>
            </div>
            
            <div className={styles.footerCol}>
              <h4>Links</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/playground">Playground</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerCol}>
              <h4>Connect</h4>
              <ul>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              </ul>
            </div>
            
            <div className={styles.footerCol}>
              <h4>Tech</h4>
              <ul>
                <li>Next.js</li>
                <li>React</li>
                <li>Three.js</li>
                <li>TypeScript</li>
              </ul>
            </div>
            
            <div className={styles.footerCol}>
              <p>&copy; {new Date().getFullYear()} Nesnet</p>
            </div>
          </div>
        </div>
      </footer>

      {/* DevTools will only be included in development builds */}
      <DevTools />
    </div>
  );
}