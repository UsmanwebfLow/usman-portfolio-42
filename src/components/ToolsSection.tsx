import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';

const tools = [
  { img: 'https://i.postimg.cc/x1zcCtYB/figma.png', quote: 'Creating clean and precise UI prototypes for Figma projects', author: '— Figma' },
  { img: 'https://i.postimg.cc/B6V02fBF/gohighlevel.png', quote: 'Building efficient funnels and automated workflows', author: '— GoHighLevel' },
  { img: 'https://i.postimg.cc/rwMwVcn1/wordpress.png', quote: 'Developing custom WordPress websites with performance in mind', author: '— WordPress' },
  { img: 'https://i.postimg.cc/LXfcggh2/click-funnel.png', quote: 'Structuring complete online courses with smooth integration', author: '— Teachable' },
  { img: 'https://i.postimg.cc/vBFQKsVd/js.png', quote: 'Creating interactive and responsive UI elements', author: '— JavaScript' },
  { img: 'https://i.postimg.cc/WzYCQGHm/html.png', quote: 'Writing semantic and clean HTML for modern web projects', author: '— HTML' },
  { img: 'https://i.postimg.cc/HxwBwwms/css.png', quote: 'Designing polished layouts and animations', author: '— CSS' },
  { img: 'https://i.postimg.cc/G3zjbhmd/n8n.png', quote: 'Automating workflows efficiently to save time', author: '— n8n' },
];

export default function ToolsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      const scrolled = windowHeight - rect.top;
      const totalScroll = windowHeight + sectionHeight;
      const progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      
      setScrollProgress(progress);
      setRotation(progress * 360);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTool = tools[activeIndex];
  
  const getPosition = (index: number) => {
    const angle = (index / tools.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 40;
    return {
      left: `${50 + radius * Math.cos(angle)}%`,
      top: `${50 + radius * Math.sin(angle)}%`,
    };
  };

  return (
    <section 
      ref={sectionRef}
      id="tools"
      className="relative py-32 px-6 section-darker"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
          >
            EXPERTISE
          </motion.span>
          <GradientFillHeading text="TOOLS I USE" />
        </div>
        
        <div className="relative flex justify-center items-center min-h-[500px]">
          {/* Progress ring SVG */}
          <svg
            className="absolute w-[80%] max-w-[600px] aspect-square"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(0 0% 15%)" strokeWidth="0.3" />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="hsl(0 0% 98%)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - scrollProgress)}`}
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            />
          </svg>
          
          {/* Rotating ring */}
          <div 
            className="relative w-[70%] max-w-[550px] aspect-square"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {tools.map((tool, index) => {
              const pos = getPosition(index);
              return (
                <motion.button
                  key={index}
                  className={`tools-ring-item w-[13%] max-w-[80px] aspect-square ${activeIndex === index ? 'active' : ''}`}
                  style={{
                    ...pos,
                    transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                  }}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.15 }}
                >
                  <img src={tool.img} alt={tool.author} className="w-full h-full object-contain" />
                </motion.button>
              );
            })}
          </div>
          
          {/* Center content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-[35%] z-10">
            <motion.p
              key={activeTool.quote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-foreground text-sm md:text-base leading-relaxed mb-3"
            >
              "{activeTool.quote}"
            </motion.p>
            <motion.span
              key={activeTool.author}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-foreground-soft text-xs tracking-wider"
            >
              {activeTool.author}
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
