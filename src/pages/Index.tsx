import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import WorkSection from '@/components/WorkSection';
import ToolsSection from '@/components/ToolsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Lazy load the 3D scene for better performance
const Scene3D = lazy(() => import('@/components/Scene3D'));

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
      
      // Calculate scroll progress for 3D scene
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    });

    // Animation frame for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* 3D Scene - Fixed background */}
      <Suspense fallback={null}>
        <Scene3D scrollProgress={scrollProgress} />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ToolsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress)}`}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
              filter: 'drop-shadow(0 0 6px hsl(var(--primary)))',
            }}
          />
          <text
            x="30"
            y="34"
            textAnchor="middle"
            fill="hsl(var(--foreground))"
            fontSize="12"
            fontFamily="var(--font-body)"
          >
            {Math.round(scrollProgress * 100)}%
          </text>
        </svg>
      </div>
    </>
  );
}
