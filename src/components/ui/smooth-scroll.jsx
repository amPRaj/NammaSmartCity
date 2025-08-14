import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';

// Lenis Smooth Scroll Provider
export const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle anchor link clicks
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element, {
            offset: -100, // Account for navbar
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }
    };

    // Add event listener
    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
};

// Smooth Scroll Container for specific sections
export const SmoothScrollContainer = ({ children, className = '' }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={className}
      style={{
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered animation component
export const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '' 
}) => {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 }
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};

// Parallax scroll effect
export const ParallaxScroll = ({ children, speed = 0.5, className = '' }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Lenis smooth scroll hook for programmatic scrolling
export const useSmoothScroll = () => {
  const scrollToElement = (elementId, offset = -100) => {
    const element = document.getElementById(elementId);
    if (element && window.lenis) {
      window.lenis.scrollTo(element, {
        offset: offset,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (element) {
      // Fallback to native smooth scroll
      const targetPosition = element.offsetTop + offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return { scrollToElement, scrollToTop };
};