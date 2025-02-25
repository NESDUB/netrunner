import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./RamsMenu.module.css";

interface MenuItem {
  label: string;
  href: string;
  icon?: JSX.Element;
  subItems?: MenuItem[];
}

interface MenuComponentProps {
  items: MenuItem[];
}

const RamsMenu: React.FC<MenuComponentProps> = ({ items }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

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

  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <header 
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${hidden ? styles.hidden : ""}`}
      data-component-name="RamsMenu"
    >
      <div className={styles.menuGrid}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {/* For items with no subitems */}
            {!item.subItems ? (
              <Link 
                href={item.href} 
                className={styles.navItem}
                data-component-name="NavLink"
              >
                {item.label}
              </Link>
            ) : (
              /* For items with subitems */
              <div className={styles.navItemWithSub}>
                <button 
                  className={styles.navItemButton}
                  onClick={() => toggleSubmenu(index)}
                  aria-expanded={activeSubmenu === index}
                >
                  {item.label}
                  <svg 
                    width="10" 
                    height="10" 
                    viewBox="0 0 10 10" 
                    className={styles.chevron}
                  >
                    <path 
                      fill="currentColor" 
                      d={activeSubmenu === index 
                        ? "M2 8L5 5L8 8L9 7L5 3L1 7L2 8Z" 
                        : "M1 3L5 7L9 3L8 2L5 5L2 2L1 3Z"} 
                    />
                  </svg>
                </button>
                
                <div 
                  className={`${styles.subMenuHolder} ${activeSubmenu === index ? styles.active : ""}`}
                >
                  <ul className={styles.subMenu}>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link 
                          href={subItem.href} 
                          className={styles.subMenuItem}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        
        {/* Center logo - assuming 5-column grid and logo in the middle */}
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            NESNET
          </Link>
        </div>
      </div>
    </header>
  );
};

export default RamsMenu;