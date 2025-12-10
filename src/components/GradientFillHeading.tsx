import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GradientFillHeadingProps {
  text: string;
  className?: string;
}

export default function GradientFillHeading({ 
  text, 
  className = '',
}: GradientFillHeadingProps) {
  const [fillPercent, setFillPercent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      
      const rect = wrapperRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startFillPoint = windowHeight * 0.8;
      const endFillPoint = windowHeight * 0.2;
      
      if (rect.top <= startFillPoint && rect.top >= endFillPoint - rect.height) {
        const progress = (startFillPoint - rect.top) / (startFillPoint - endFillPoint);
        const clampedProgress = Math.min(Math.max(progress * 100, 0), 100);
        setFillPercent(clampedProgress);
      } else if (rect.top < endFillPoint - rect.height) {
        setFillPercent(100);
      } else {
        setFillPercent(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className="gradient-fill-text text-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wider"
        style={{ backgroundSize: `${fillPercent}% 100%` }}
      >
        {text}
      </div>
      <div className="gradient-fill-outline text-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wider">
        {text}
      </div>
    </motion.div>
  );
}
