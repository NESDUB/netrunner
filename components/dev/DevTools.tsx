import { useState, useEffect } from 'react';
import styles from '@/styles/DevTools.module.css';

export default function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [packageName, setPackageName] = useState('');
  const [componentCount, setComponentCount] = useState<Record<string, number>>({});
  const [performanceMetrics, setPerformanceMetrics] = useState({
    memory: 0,
    fps: 0,
    loadTime: 0
  });
  
  useEffect(() => {
    // Simulate performance metrics
    const interval = setInterval(() => {
      setPerformanceMetrics({
        memory: Math.round(performance?.memory?.usedJSHeapSize / 1048576) || 0,
        fps: Math.round(60 - Math.random() * 10),
        loadTime: performance.now() / 1000
      });
    }, 1000);
    
    // Setup component hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      const componentName = element.dataset.componentName;
      if (componentName) {
        setHoveredComponent(componentName);
        element.classList.add(styles.highlighted);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (element.dataset.componentName) {
        element.classList.remove(styles.highlighted);
      }
    };
    
    // Add component analysis
    const analyzeComponents = () => {
      const components: Record<string, number> = {};
      document.querySelectorAll('[data-component-name]').forEach(element => {
        const name = element.getAttribute('data-component-name');
        if (name) {
          components[name] = (components[name] || 0) + 1;
        }
      });
      setComponentCount(components);
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    analyzeComponents();
    const observer = new MutationObserver(analyzeComponents);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      observer.disconnect();
    };
  }, []);
  
  const handleInstallPackage = () => {
    if (packageName.trim()) {
      const command = `npm install ${packageName.trim()}`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(command)
        .then(() => {
          alert(`Command copied to clipboard: ${command}`);
        })
        .catch(err => {
          console.error('Failed to copy command:', err);
          alert(`Run this command in your terminal: ${command}`);
        });
        
      setPackageName('');
    }
  };
  
  return (
    <div className={styles.devTools}>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close DevTools' : 'DevTools'}
      </button>
      
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.section}>
            <h3>Performance</h3>
            <div className={styles.metrics}>
              <div>Memory: {performanceMetrics.memory} MB</div>
              <div>FPS: {performanceMetrics.fps}</div>
              <div>Load Time: {performanceMetrics.loadTime.toFixed(2)}s</div>
            </div>
          </div>
          
          <div className={styles.section}>
            <h3>Components</h3>
            <div className={styles.componentInfo}>
              {hoveredComponent ? (
                <div>Inspecting: {hoveredComponent}</div>
              ) : (
                <div>Hover over a component to inspect</div>
              )}
            </div>
          </div>
          
          <div className={styles.section}>
            <h3>Component Tree</h3>
            <div className={styles.componentTree}>
              {Object.entries(componentCount).map(([name, count]) => (
                <div key={name} className={styles.componentItem}>
                  <span>{name}</span>
                  <span className={styles.componentCount}>{count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.section}>
            <h3>Package Installer</h3>
            <div className={styles.packageInstaller}>
              <input 
                type="text" 
                placeholder="Package name" 
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInstallPackage()}
              />
              <button onClick={handleInstallPackage}>Install</button>
              <small>* Copies npm command to clipboard</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}