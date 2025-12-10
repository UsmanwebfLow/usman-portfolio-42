import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GradientFillHeadingProps {
  text: string;
  className?: string;
  startThreshold?: number;
  endThreshold?: number;
}

export default function GradientFillHeading({ 
  text, 
  className = '',
  startThreshold = 0,
  endThreshold = 100 
}: GradientFillHeadingProps) {
  const [fillPercent, setFillPercent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      
      const rect = wrapperRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate visibility percentage
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Start filling when element enters viewport
      const startFillPoint = windowHeight * 0.8;
      const endFillPoint = windowHeight * 0.2;
      
      if (elementTop <= startFillPoint && elementTop >= endFillPoint - elementHeight) {
        const progress = (startFillPoint - elementTop) / (startFillPoint - endFillPoint);
        const clampedProgress = Math.min(Math.max(progress * 100, 0), 100);
        setFillPercent(clampedProgress);
      } else if (elementTop < endFillPoint - elementHeight) {
        setFillPercent(100);
      } else {
        setFillPercent(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startThreshold, endThreshold]);

  return (
    <motion.div 
      ref={wrapperRef}
      className={`gradient-fill-wrapper ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div 
        className="gradient-fill-text text-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        style={{ backgroundSize: `${fillPercent}% 100%` }}
      >
        {text}
      </div>
      <div className="gradient-fill-outline text-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        {text}
      </div>
    </motion.div>
  );
}
