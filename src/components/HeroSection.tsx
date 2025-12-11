import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Linkedin, Instagram, Youtube, Download } from 'lucide-react';
import logo from '@/assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const name = nameRef.current;
    const subtitle = subtitleRef.current;
    
    if (!section || !name || !subtitle) return;

    // Animate name text scaling down on scroll
    gsap.to(name, {
      scale: 0.8,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300',
        scrub: 1,
      },
    });

    gsap.to(subtitle, {
      opacity: 0,
      y: -30,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: '+=100',
        end: '+=200',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hero-section"
      className="relative h-screen w-full overflow-hidden section-dark"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>
      
      {/* Logo - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 left-6 z-50"
      >
        <img src={logo} alt="UA Logo" className="h-12 w-auto invert" />
      </motion.div>
      
      {/* Social links - left side */}
      <div className="social-links-vertical hidden md:flex">
        {[
          { icon: Facebook, href: '#' },
          { icon: Linkedin, href: '#' },
          { icon: Instagram, href: '#' },
          { icon: Youtube, href: '#' },
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <social.icon className="w-4 h-4" />
          </motion.a>
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          ref={nameRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-display text-[18vw] md:text-[14vw] lg:text-[12vw] text-foreground leading-none"
        >
          <span className="block">USMAN</span>
          <span className="block">ALI</span>
        </motion.h1>
        
        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-heading text-sm md:text-base tracking-[0.3em] text-foreground-muted mt-8"
        >
          WORDPRESS DEVELOPER | FUNNEL BUILDER
          <br />
          <span className="text-accent-warm">AUTOMATION SPECIALIST</span>
        </motion.p>
        
        {/* Resume Download Button */}
        <motion.a
          href="/resume.pdf"
          download="Usman_Ali_Resume.pdf"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 inline-flex items-center gap-3 px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-heading text-sm tracking-[0.2em]"
        >
          <Download className="w-4 h-4" />
          DOWNLOAD CV
        </motion.a>
      </div>
      
      {/* Scroll indicator - circular text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 right-10 z-40"
      >
        <div className="relative w-24 h-24">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full animate-spin-slow"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="fill-foreground-muted text-[9px] uppercase tracking-[0.2em]">
              <textPath href="#circlePath">
                - Scroll to Explore - Scroll to Explore 
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-foreground"
            >
              ↓
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
