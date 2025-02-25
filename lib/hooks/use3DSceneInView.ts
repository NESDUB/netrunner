import { useEffect, useState } from "react";

type UseSceneInViewOptions = {
  threshold?: number;
  rootMargin?: string;
  disableOnMobile?: boolean;
};

export default function use3DSceneInView(
  ref: React.RefObject<HTMLElement>,
  options: UseSceneInViewOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    disableOnMobile = true
  } = options;
  
  const [isInView, setIsInView] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    
    // Check if device should render 3D
    const isMobile = window.innerWidth < 768 && disableOnMobile;
    const is3DDisabled = process.env.NEXT_PUBLIC_ENABLE_3D_EFFECTS === "false";
    
    if (isMobile || is3DDisabled) {
      setShouldRender(false);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        // Only render the scene once it has been in view
        if (entry.isIntersecting) {
          setShouldRender(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, rootMargin, disableOnMobile]);
  
  return { isInView, shouldRender };
}
