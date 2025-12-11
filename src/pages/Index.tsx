import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

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

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Navbar />
      
      <div id="scroll-container" className="relative">
        <HeroSection />
        
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
            strokeDasharray={`${2 * Math.PI * 22}`}
            strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollProgress)}`}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
          <text x="25" y="28" textAnchor="middle" fill="hsl(0 0% 98%)" fontSize="9" fontFamily="Inter">
            {Math.round(scrollProgress * 100)}%
          </text>
        </svg>
      </div>
      
      {/* ChatBot */}
      <ChatBot />
    </>
  );
}
