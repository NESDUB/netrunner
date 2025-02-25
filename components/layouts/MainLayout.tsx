import React from "react";
import styles from "@/styles/MainLayout.module.css";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>
            Next 3D
          </a>
          <ul className={styles.menu}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <main className={styles.main}>{children}</main>
      
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} {PROJECT_NAME}. Built with Next.js, React, and Three.js</p>
      </footer>
    </div>
  );
}
