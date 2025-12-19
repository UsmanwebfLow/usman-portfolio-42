import { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import BentoSection from '@/components/BentoSection';
import WorkSection from '@/components/WorkSection';
import ToolsSection from '@/components/ToolsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // Reduced duration for faster scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2, // Increased multiplier for more responsive scrolling
      touchMultiplier: 2, // More responsive touch scrolling
      infinite: false,
    });

    // Expose lenis globally for use in other components
    (window as any).lenis = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      (window as any).lenis = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Entrance animation after loader
    if (containerRef.current) {
      // Initial state - hidden
      gsap.set(containerRef.current.children, { opacity: 0, y: 50 });
      
      // Staggered entrance animation
      gsap.to(containerRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5 // Delay to allow loader to finish
      });
      
      // Special animation for hero section
      const heroSection = containerRef.current.querySelector('#hero-section');
      if (heroSection) {
        gsap.fromTo(heroSection, 
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.3)", delay: 0.3 }
        );
      }
    }
  }, []);

  return (
    <div ref={containerRef}>
      <Navbar />
      
      <HeroSection id="hero-section" />
      
      <div id="scroll-container" className="relative">
        <main className="relative z-10 bg-background">
          <AboutSection />
          <ServicesSection />
          <BentoSection />
          <WorkSection />
          <ToolsSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
        </main>
      </div>

      {/* Scroll progress */}
      <div className="fixed bottom-8 left-8 z-40 hidden md:block">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="22" fill="none" stroke="hsl(0 0% 15%)" strokeWidth="1" />
          <circle
            cx="25" cy="25" r="22"
            fill="none"
            stroke="hsl(0 0% 98%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - scrollProgress)}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
          <text x="25" y="28" textAnchor="middle" fill="hsl(0 0% 98%)" fontSize="9" fontFamily="Inter">
            {Math.round(scrollProgress * 100)}%
          </text>
        </svg>
      </div>
      
      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}
