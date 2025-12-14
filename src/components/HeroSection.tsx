import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;

    gsap.to(content, {
      opacity: 0,
      y: -50,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Usman_Ali_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      ref={sectionRef}
      id="hero-section"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background - Fixed position */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>
      
      {/* Main content - Left aligned */}
      <div 
        ref={contentRef}
        className="relative z-30 h-full flex flex-col items-start justify-center text-left px-6 md:px-12 lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-heading text-xs md:text-sm tracking-[0.4em] text-foreground-muted mb-4 block">
            CREATIVE DEVELOPER
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-display text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] text-foreground leading-[0.85] tracking-tight"
        >
          <span className="block">USMAN</span>
          <span className="block text-accent">ALI</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-body text-sm md:text-base text-foreground-muted mt-6 max-w-md"
        >
          WordPress Developer • Funnel Builder • Automation Expert
        </motion.p>
        
        {/* Resume Download Button */}
        <motion.button
          onClick={handleDownloadCV}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 text-heading text-xs md:text-sm tracking-[0.15em] font-medium"
        >
          <Download className="w-4 h-4" />
          DOWNLOAD CV
        </motion.button>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center"
      >
        <span className="text-[10px] tracking-[0.3em] text-foreground-muted mb-2">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-foreground-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
